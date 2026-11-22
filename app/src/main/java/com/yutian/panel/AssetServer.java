package com.yutian.panel;

import android.content.res.AssetManager;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 把 APK 里的 assets/panel 目录通过本机回环 HTTP 暴露出来。
 *
 * 为什么不直接用 file:// 或 WebViewAssetLoader：
 * 面板是 PWA，依赖 fetch、localStorage 和同源相对路径，file:// 会被 CORS 拦掉；
 * 起一个 127.0.0.1 的只读 HTTP 服务最稳，也不引入任何第三方依赖。
 */
final class AssetServer {

    private static final String BRIDGE_JS =
            "(function(){try{var N=window.ZeehoNative;if(!N)return;"
            + "function mk(n,b){return function(){var a=Array.prototype.slice.call(arguments);"
            + "try{return b?N.callBool(n,JSON.stringify(a)):N.call(n,JSON.stringify(a));}catch(e){return '';}};}"
            + "var names=['amapIdentity','appLogSession','appVersion','applyPanelUpdate',"
            + "'autoTask','autoTaskScope','background','batteryHistory',"
            + "'batteryOcvHistoryVersion','batterySpan','beginAppLog',"
            + "'beginAppUpdate','beginBatteryHistory','beginBatteryOcvHistory',"
            + "'beginBatterySpan','beginCacheManagement','beginChargeHistory',"
            + "'beginClearChargeHistory','beginDiagStore','beginGpsSpeed',"
            + "'beginImageExport','beginInductiveSession','beginKeepaliveSave',"
            + "'beginNearbyVehicle','beginPageSync','beginPageUpdate',"
            + "'beginPanelLine','beginRideRecording','beginWallpaperTransfer',"
            + "'beginWallpaperTransferLocal','beginWidgetPreview','btDebugClear',"
            + "'btDebugCommands','btDebugFrames','btDebugSend',"
            + "'cancelAe4ControllerWrite','cancelInductiveSession',"
            + "'cancelNearbyVehicle','cancelPanelLine','cancelWallpaperTransfer',"
            + "'captureDiag','captureStatus','chargeLog','checkAppUpdate',"
            + "'checkPageUpdate','checkRootSupervisor','clearCapture',"
            + "'clearCaptureDiag','clearNotifyLog','copyCaptureDiag',"
            + "'detachRideRecording','downloadAppUpdate','dynamicColors',"
            + "'endGpsSpeed','imageExportInfo','inductiveCapabilities',"
            + "'inductiveSessionAction','insets','keepaliveModuleInfo',"
            + "'keepaliveStatus','launchOfficialApp','marketRouteControl',"
            + "'nearbyForeground','notifyGroups','notifyLog','openBtDebug',"
            + "'openInductive','openMeterOta','openOfficialApp','openRecovery',"
            + "'openSettings','openWallpaperTransfer','pageReady','pageReadyV2',"
            + "'panelLineInfo','panelLineVersion','pendingPrize',"
            + "'pollAe4ControllerWrite','pollAppLog','pollAppUpdate',"
            + "'pollBatteryHistory','pollBatteryOcvHistory','pollBatterySpan',"
            + "'pollCacheManagement','pollChargeHistory','pollDiagStore',"
            + "'pollGpsSpeed','pollImageExport','pollInductiveSession',"
            + "'pollKeepaliveSave','pollPageSync','pollPageUpdate','pollPanelLine',"
            + "'pollRideRecording','pollWallpaperTransfer','pollWidgetCar',"
            + "'pollWidgetPreview','prizeCelebrated','refreshBatteryDisplay',"
            + "'releaseTrustVersion','requestAddWidget','requestNearbyPermission',"
            + "'requestNotifications','resetWidgetSettings',"
            + "'resignedUpdateException','restartBackground','restartPage',"
            + "'rideRecordingAction','rootSupervisorStatus','setAutoTask',"
            + "'setAutoTaskScope','setBackground','setDark','setInductiveTheme',"
            + "'setKeepScreenOn','setRootSupervisorEnabled','setThemeColors',"
            + "'setWidgetSetting','setWidgetSettingFor','setWidgetStats',"
            + "'setWidgetStatsForSize','startCapture','stopCapture','storeAll',"
            + "'storeBootstrap','storeCommit','storeCommitBegin','storeCommitPoll',"
            + "'storePut','storeRemove','storeVersion','syncSession',"
            + "'syncSessionV2','syncWidgetCar','taskAccountParamsVersion',"
            + "'updateStatus','wallpaperLocalCapabilities','widgetAddStatus',"
            + "'widgetSettings','widgetSettingsFor','widgetSettingsForSize',"
            + "'requestResignedUpdateException'];"

            + "var boolNames={background:1};"
            + "var s={};for(var i=0;i<names.length;i++){s[names[i]]=mk(names[i],boolNames[names[i]]);}"

            + "window.ZeehoShell=s;"
            + "window.ZeehoShellTxn={version:1,beginRequest:function(){return '1';},pollRequests:function(){return '[]';}};"
            + "var castNames=['version','capabilities','available','getStatus','getDiagnostics','pair','start','stop','requestProjection','forgetProfile','setTier'];"
            + "var c={};for(var j=0;j<castNames.length;j++){c[castNames[j]]=mk('cast.'+castNames[j]);}"
            + "c.version=function(){return '1';};"
            + "window.ZeehoCast=c;"
            + "}catch(e){}})();";

    private final AssetManager assets;
    private final String root;
    private final ExecutorService pool = Executors.newFixedThreadPool(4);

    private ServerSocket serverSocket;
    private int port;

    /** 固定回环端口：localStorage 是按 origin 存的，端口一变登录态就丢。 */
    private static final int PREFERRED_PORT = 18765;
    private volatile boolean running;
    private byte[] cachedIndex;

    AssetServer(AssetManager assets, String root) {
        this.assets = assets;
        this.root = root;
    }

    int getPort() {
        return port;
    }

    void start() throws IOException {
        InetAddress loopback = InetAddress.getByName("127.0.0.1");
        try {
            serverSocket = new ServerSocket(PREFERRED_PORT, 50, loopback);
        } catch (IOException busy) {
            // 极少数情况下端口被占用，退回随机端口；正常启动始终是固定 origin。
            serverSocket = new ServerSocket(0, 50, loopback);
        }
        port = serverSocket.getLocalPort();
        running = true;
        Thread accept = new Thread(() -> {
            while (running) {
                try {
                    Socket socket = serverSocket.accept();
                    pool.execute(() -> handle(socket));
                } catch (IOException e) {
                    if (running) {
                        // 单次 accept 失败不该把整条服务线程带走
                        continue;
                    }
                    break;
                }
            }
        }, "yutian-asset-server");
        accept.setDaemon(true);
        accept.start();
    }

    void stop() {
        running = false;
        try {
            if (serverSocket != null) {
                serverSocket.close();
            }
        } catch (IOException ignored) {
        }
        pool.shutdownNow();
    }

    private void handle(Socket socket) {
        try (Socket s = socket) {
            s.setSoTimeout(15000);
            InputStream in = new BufferedInputStream(s.getInputStream());
            OutputStream out = new BufferedOutputStream(s.getOutputStream());

            String requestLine = readLine(in);
            if (requestLine == null || requestLine.isEmpty()) {
                return;
            }
            String[] parts = requestLine.split(" ");
            String method = parts.length > 0 ? parts[0] : "GET";
            String rawPath = parts.length > 1 ? parts[1] : "/";

            Map<String, String> headers = new HashMap<>();
            String line;
            while ((line = readLine(in)) != null && !line.isEmpty()) {
                int colon = line.indexOf(':');
                if (colon > 0) {
                    headers.put(line.substring(0, colon).trim().toLowerCase(Locale.ROOT),
                            line.substring(colon + 1).trim());
                }
            }

            String path = rawPath;
            int query = path.indexOf('?');
            if (query >= 0) {
                path = path.substring(0, query);
            }
            int hash = path.indexOf('#');
            if (hash >= 0) {
                path = path.substring(0, hash);
            }
            path = URLDecoder.decode(path, "UTF-8");
            if (path.isEmpty() || path.equals("/")) {
                path = "/index.html";
            }
            while (path.startsWith("/")) {
                path = path.substring(1);
            }
            if (path.contains("..")) {
                writeStatus(out, "403 Forbidden", "text/plain; charset=utf-8", "403");
                return;
            }

            byte[] body;
            boolean injected = false;
            try {
                if (path.equals("index.html")) {
                    body = loadIndex();
                    injected = true;
                } else {
                    body = readAll(assets.open(root + "/" + path));
                }
            } catch (IOException notFound) {
                writeStatus(out, "404 Not Found", "text/plain; charset=utf-8", "404 " + path);
                return;
            }

            String mime = mimeOf(path);
            long total = body.length;
            long start = 0;
            long end = total - 1;
            boolean partial = false;
            String range = headers.get("range");
            if (range != null && range.startsWith("bytes=")) {
                String spec = range.substring(6).trim();
                int dash = spec.indexOf('-');
                if (dash >= 0) {
                    try {
                        String a = spec.substring(0, dash).trim();
                        String b = spec.substring(dash + 1).trim();
                        if (!a.isEmpty()) {
                            start = Long.parseLong(a);
                        }
                        if (!b.isEmpty()) {
                            end = Math.min(Long.parseLong(b), total - 1);
                        }
                        if (start < 0) {
                            start = 0;
                        }
                        if (end >= total) {
                            end = total - 1;
                        }
                        if (start <= end) {
                            partial = true;
                        }
                    } catch (NumberFormatException ignored) {
                    }
                }
            }

            StringBuilder head = new StringBuilder();
            if (partial) {
                head.append("HTTP/1.1 206 Partial Content\r\n");
                head.append("Content-Range: bytes ").append(start).append('-').append(end)
                        .append('/').append(total).append("\r\n");
            } else {
                head.append("HTTP/1.1 200 OK\r\n");
                start = 0;
                end = total - 1;
            }
            head.append("Content-Type: ").append(mime).append("\r\n");
            head.append("Content-Length: ").append(end - start + 1).append("\r\n");
            head.append("Accept-Ranges: bytes\r\n");
            head.append("Access-Control-Allow-Origin: *\r\n");
            head.append(injected || mime.startsWith("text/") || mime.contains("json")
                    ? "Cache-Control: no-store\r\n" : "Cache-Control: public, max-age=86400\r\n");
            head.append("Connection: close\r\n\r\n");
            out.write(head.toString().getBytes(StandardCharsets.UTF_8));

            if (!"HEAD".equalsIgnoreCase(method)) {
                out.write(body, (int) start, (int) (end - start + 1));
            }
            out.flush();
        } catch (Exception ignored) {
            // 客户端提前断开、WebView 取消请求都很正常，不需要上报
        }
    }

    private byte[] loadIndex() throws IOException {
        if (cachedIndex == null) {
            byte[] raw = readAll(assets.open(root + "/index.html"));
            String html = new String(raw, StandardCharsets.UTF_8);
            String script = "<script>" + BRIDGE_JS + "</script>";
            // 必须插在任何业务脚本之前，又不能让 charset 声明被挤出前 1024 字节，
            // 所以挂在 viewport 后面；没有 viewport 才退回 <head>。
            int anchor = html.indexOf("<meta name=\"viewport\"");
            if (anchor >= 0) {
                int end = html.indexOf('>', anchor);
                if (end >= 0) {
                    html = html.substring(0, end + 1) + script + html.substring(end + 1);
                } else {
                    anchor = -1;
                }
            }
            if (anchor < 0) {
                int head = html.indexOf("<head>");
                if (head >= 0) {
                    html = html.substring(0, head + 6) + script + html.substring(head + 6);
                } else {
                    html = script + html;
                }
            }
            cachedIndex = html.getBytes(StandardCharsets.UTF_8);
        }
        return cachedIndex;
    }

    private static byte[] readAll(InputStream in) throws IOException {
        try (InputStream input = in) {
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            byte[] chunk = new byte[16 * 1024];
            int read;
            while ((read = input.read(chunk)) != -1) {
                buffer.write(chunk, 0, read);
            }
            return buffer.toByteArray();
        }
    }

    private static String readLine(InputStream in) throws IOException {
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = in.read()) != -1) {
            if (c == '\n') {
                break;
            }
            if (c != '\r') {
                sb.append((char) c);
            }
        }
        return c == -1 && sb.length() == 0 ? null : sb.toString();
    }

    private static void writeStatus(OutputStream out, String status, String mime, String body)
            throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        String head = "HTTP/1.1 " + status + "\r\n"
                + "Content-Type: " + mime + "\r\n"
                + "Content-Length: " + bytes.length + "\r\n"
                + "Connection: close\r\n\r\n";
        out.write(head.getBytes(StandardCharsets.UTF_8));
        out.write(bytes);
        out.flush();
    }

    private static String mimeOf(String path) {
        String lower = path.toLowerCase(Locale.ROOT);
        if (lower.endsWith(".html") || lower.endsWith(".htm")) {
            return "text/html; charset=utf-8";
        }
        if (lower.endsWith(".js") || lower.endsWith(".mjs")) {
            return "application/javascript; charset=utf-8";
        }
        if (lower.endsWith(".json") || lower.endsWith(".webmanifest")) {
            return "application/json; charset=utf-8";
        }
        if (lower.endsWith(".css")) {
            return "text/css; charset=utf-8";
        }
        if (lower.endsWith(".svg")) {
            return "image/svg+xml";
        }
        if (lower.endsWith(".png")) {
            return "image/png";
        }
        if (lower.endsWith(".webp")) {
            return "image/webp";
        }
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {
            return "image/jpeg";
        }
        if (lower.endsWith(".glb")) {
            return "model/gltf-binary";
        }
        if (lower.endsWith(".gltf")) {
            return "model/gltf+json";
        }
        if (lower.endsWith(".woff2")) {
            return "font/woff2";
        }
        if (lower.endsWith(".woff")) {
            return "font/woff";
        }
        if (lower.endsWith(".ttf")) {
            return "font/ttf";
        }
        if (lower.endsWith(".txt") || lower.endsWith(".md")) {
            return "text/plain; charset=utf-8";
        }
        if (lower.endsWith(".ico")) {
            return "image/x-icon";
        }
        return "application/octet-stream";
    }
}

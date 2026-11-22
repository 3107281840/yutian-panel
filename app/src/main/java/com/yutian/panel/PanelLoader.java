package com.yutian.panel;

import android.content.Context;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

/**
 * 从 GitHub 拉取面板首页，并在 <head> 最前面注入原生桥脚本。
 *
 * 面板自己的平台闸门在 <head> 里的内联脚本中执行，必须在它之前把
 * ZeehoShell / ZeehoShellTxn 准备好，否则会被当成普通浏览器跳到下载页。
 * 因此这里拦下主文档请求，取回 HTML 后注入 BridgeScript 再交给 WebView；
 * 其余资源（车模、图片、JSON）仍由 WebView 直接从同一个源加载，保持同源。
 */
final class PanelLoader {

    private static final int CONNECT_TIMEOUT = 8000;
    private static final int READ_TIMEOUT = 30000;

    private PanelLoader() {
    }

    static byte[] loadIndex(Context context, String url) {
        File dir = new File(context.getCacheDir(), "panel-index");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        String key = sha1(url);
        File rawFile = new File(dir, key + ".html");
        File etagFile = new File(dir, key + ".etag");

        String etag = readSmall(etagFile);
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setConnectTimeout(CONNECT_TIMEOUT);
            connection.setReadTimeout(READ_TIMEOUT);
            connection.setInstanceFollowRedirects(true);
            connection.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 "
                            + "(KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36 yutian-panel");
            connection.setRequestProperty("Accept", "text/html,application/xhtml+xml");
            connection.setRequestProperty("Accept-Encoding", "identity");
            connection.setRequestProperty("Cache-Control", "no-cache");
            if (etag != null && !etag.isEmpty()) {
                connection.setRequestProperty("If-None-Match", etag);
            }

            int code = connection.getResponseCode();
            if (code == HttpURLConnection.HTTP_NOT_MODIFIED && rawFile.isFile()) {
                return inject(readFile(rawFile));
            }
            if (code == HttpURLConnection.HTTP_OK) {
                byte[] body = readAll(connection.getInputStream());
                // 只缓存原始 HTML，注入每次现做，桥脚本更新后不用等缓存过期。
                writeFile(rawFile, body);
                String newEtag = connection.getHeaderField("ETag");
                writeFile(etagFile, newEtag == null ? new byte[0]
                        : newEtag.getBytes(StandardCharsets.UTF_8));
                return inject(body);
            }
        } catch (Throwable ignored) {
            // 网络失败时退回本地缓存，至少让面板有机会启动。
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
        if (rawFile.isFile()) {
            try {
                return inject(readFile(rawFile));
            } catch (Throwable ignored) {
                // fall through
            }
        }
        return null;
    }

    /** 在 <head ...> 之后插入桥脚本；找不到 head 就插在 <html ...> 之后。 */
    static byte[] inject(byte[] html) {
        if (html == null || html.length == 0) {
            return html;
        }
        int insertAt = tagEnd(html, "<head");
        if (insertAt < 0) {
            insertAt = tagEnd(html, "<html");
        }
        if (insertAt < 0) {
            insertAt = 0;
        }
        byte[] script = ("<script>" + BridgeScript.JS + "</script>")
                .getBytes(StandardCharsets.UTF_8);
        byte[] out = new byte[html.length + script.length];
        System.arraycopy(html, 0, out, 0, insertAt);
        System.arraycopy(script, 0, out, insertAt, script.length);
        System.arraycopy(html, insertAt, out, insertAt + script.length, html.length - insertAt);
        return out;
    }

    private static int tagEnd(byte[] data, String tag) {
        int limit = Math.min(data.length, 8192);
        for (int i = 0; i + tag.length() < limit; i++) {
            boolean match = true;
            for (int j = 0; j < tag.length(); j++) {
                char c = (char) (data[i + j] & 0xff);
                char t = tag.charAt(j);
                if (c == t || (t >= 'a' && t <= 'z' && c == t - 32)) {
                    continue;
                }
                match = false;
                break;
            }
            if (match) {
                for (int k = i + tag.length(); k < limit; k++) {
                    if (data[k] == '>') {
                        return k + 1;
                    }
                }
            }
        }
        return -1;
    }

    private static byte[] readAll(InputStream in) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream(5 * 1024 * 1024);
        byte[] buffer = new byte[128 * 1024];
        int read;
        while ((read = in.read(buffer)) > 0) {
            out.write(buffer, 0, read);
        }
        try {
            in.close();
        } catch (Throwable ignored) {
        }
        return out.toByteArray();
    }

    private static byte[] readFile(File file) throws Exception {
        try (InputStream in = new FileInputStream(file)) {
            return readAll(in);
        }
    }

    private static void writeFile(File file, byte[] data) {
        File temp = new File(file.getParentFile(), file.getName() + ".tmp");
        try (FileOutputStream out = new FileOutputStream(temp)) {
            out.write(data);
        } catch (Throwable ignored) {
            return;
        }
        if (!temp.renameTo(file)) {
            temp.delete();
        }
    }

    private static String readSmall(File file) {
        if (!file.isFile() || file.length() > 4096) {
            return null;
        }
        try (InputStream in = new FileInputStream(file)) {
            byte[] data = readAll(in);
            return new String(data, StandardCharsets.UTF_8);
        } catch (Throwable ignored) {
            return null;
        }
    }

    private static String sha1(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder out = new StringBuilder();
            for (byte b : hash) {
                out.append(String.format("%02x", b & 0xff));
            }
            return out.toString();
        } catch (Throwable ignored) {
            return Integer.toHexString(value.hashCode());
        }
    }
}

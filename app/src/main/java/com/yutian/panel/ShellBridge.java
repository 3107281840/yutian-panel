package com.yutian.panel;

import android.Manifest;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * 网页与原生的接口。
 *
 * 分三层：
 * 1. 真实现：主题、剪贴板、分享、震动、GPS 速度、图片导出、应用日志、通知渠道、前后台状态；
 * 2. 有壳无实现：原版 App 里存在、但依赖车机/蓝牙/root 的能力（感应钥匙、壁纸、投屏、仪表 OTA、
 *    小组件、骑行记录等），统一返回 {"ok":false,"error":"unsupported"}，让面板明确降级，
 *    而不是假装成功；
 * 3. 未知方法：返回空串，保持和原壳一致的容错行为。
 */
public final class ShellBridge {

    /** 原版 ShellBridge 的全部 142 个 JS 接口名，用于区分「有壳无实现」和「根本不认识」。 */
    private static final String[] KNOWN_NAMES = {
            "amapIdentity", "appLogSession", "appVersion", "applyPanelUpdate", "autoTask",
            "autoTaskScope", "background", "batteryHistory", "batteryOcvHistoryVersion",
            "batterySpan", "beginAppLog", "beginAppUpdate", "beginBatteryHistory",
            "beginBatteryOcvHistory", "beginBatterySpan", "beginCacheManagement",
            "beginChargeHistory", "beginClearChargeHistory", "beginDiagStore", "beginGpsSpeed",
            "beginImageExport", "beginInductiveSession", "beginKeepaliveSave",
            "beginNearbyVehicle", "beginPageSync", "beginPageUpdate", "beginPanelLine",
            "beginRideRecording", "beginWallpaperTransfer", "beginWallpaperTransferLocal",
            "beginWidgetPreview", "btDebugClear", "btDebugCommands", "btDebugFrames",
            "btDebugSend", "cancelAe4ControllerWrite", "cancelInductiveSession",
            "cancelNearbyVehicle", "cancelPanelLine", "cancelWallpaperTransfer", "captureDiag",
            "captureStatus", "chargeLog", "checkAppUpdate", "checkPageUpdate",
            "checkRootSupervisor", "clearCapture", "clearCaptureDiag", "clearNotifyLog",
            "copyCaptureDiag", "detachRideRecording", "downloadAppUpdate", "dynamicColors",
            "endGpsSpeed", "imageExportInfo", "inductiveCapabilities", "inductiveSessionAction",
            "insets", "keepaliveModuleInfo", "keepaliveStatus", "launchOfficialApp",
            "marketRouteControl", "nearbyForeground", "notifyGroups", "notifyLog", "openBtDebug",
            "openInductive", "openMeterOta", "openOfficialApp", "openRecovery", "openSettings",
            "openWallpaperTransfer", "pageReady", "pageReadyV2", "panelLineInfo",
            "panelLineVersion", "pendingPrize", "pollAe4ControllerWrite", "pollAppLog",
            "pollAppUpdate", "pollBatteryHistory", "pollBatteryOcvHistory", "pollBatterySpan",
            "pollCacheManagement", "pollChargeHistory", "pollDiagStore", "pollGpsSpeed",
            "pollImageExport", "pollInductiveSession", "pollKeepaliveSave", "pollPageSync",
            "pollPageUpdate", "pollPanelLine", "pollRideRecording", "pollWallpaperTransfer",
            "pollWidgetCar", "pollWidgetPreview", "prizeCelebrated", "refreshBatteryDisplay",
            "releaseTrustVersion", "requestAddWidget", "requestNearbyPermission",
            "requestNotifications", "requestResignedUpdateException", "resetWidgetSettings",
            "resignedUpdateException", "restartBackground", "restartPage", "rideRecordingAction",
            "rootSupervisorStatus", "setAutoTask", "setAutoTaskScope", "setBackground", "setDark",
            "setInductiveTheme", "setKeepScreenOn", "setRootSupervisorEnabled", "setThemeColors",
            "setWidgetSetting", "setWidgetSettingFor", "setWidgetStats", "setWidgetStatsForSize",
            "startCapture", "stopCapture", "storeAll", "storeBootstrap", "storeCommit",
            "storeCommitBegin", "storeCommitPoll", "storePut", "storeRemove", "storeVersion",
            "syncSession", "syncSessionV2", "syncWidgetCar", "taskAccountParamsVersion",
            "updateStatus", "wallpaperLocalCapabilities", "widgetAddStatus", "widgetSettings",
            "widgetSettingsFor", "widgetSettingsForSize"
    };

    private final MainActivity activity;
    private final android.webkit.WebView webView;

    private LocationManager locationManager;
    private LocationListener locationListener;
    private Location lastLocation;
    private long gpsStartedAt;
    private boolean gpsRunning;

    private File logFile;

    ShellBridge(MainActivity activity, android.webkit.WebView webView) {
        this.activity = activity;
        this.webView = webView;
    }

    // ---------------------------------------------------------------- 入口

    @JavascriptInterface
    public String call(String method, String argsJson) throws JSONException {
        if (method == null) {
            return "";
        }
        JSONArray args = parseArgs(argsJson);

        switch (method) {
            case "dynamicColors":
                // 不伪造 Material You 调色板：面板会退回自己的主题色
                return "{\"available\":false}";

            case "setThemeColors": {
                boolean dark = args.optBoolean(0, true);
                String color = args.optString(1, "#0A0A0C");
                activity.applyThemeColors(dark, color);
                return "";
            }

            case "setDark": {
                boolean dark = args.optBoolean(0, true);
                activity.applyThemeColors(dark, dark ? "#0A0A0C" : "#F7F2FA");
                return "";
            }

            case "setKeepScreenOn": {
                boolean keep = args.optBoolean(0, false);
                activity.runOnUiThread(() -> {
                    if (keep) {
                        activity.getWindow().addFlags(
                                android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                    } else {
                        activity.getWindow().clearFlags(
                                android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                    }
                });
                return "";
            }

            case "toast": {
                String text = args.optString(0, "");
                activity.runOnUiThread(() ->
                        Toast.makeText(activity, text, Toast.LENGTH_SHORT).show());
                return "";
            }

            case "share": {
                String text = args.optString(0, "");
                String title = args.optString(1, "分享");
                Intent send = new Intent(Intent.ACTION_SEND);
                send.setType("text/plain");
                send.putExtra(Intent.EXTRA_TEXT, text);
                activity.runOnUiThread(() ->
                        activity.startActivity(Intent.createChooser(send, title)));
                return "";
            }

            case "openUrl":
            case "openBrowser": {
                String url = args.optString(0, "");
                activity.runOnUiThread(() -> activity.openExternalUrl(url));
                return "";
            }

            case "openSettings": {
                activity.runOnUiThread(activity::openAppSettings);
                return "";
            }

            case "copyText": {
                String text = args.optString(0, "");
                ClipboardManager manager =
                        (ClipboardManager) activity.getSystemService(Context.CLIPBOARD_SERVICE);
                if (manager != null) {
                    manager.setPrimaryClip(ClipData.newPlainText("panel", text));
                }
                return "";
            }

            case "pasteText": {
                ClipboardManager manager =
                        (ClipboardManager) activity.getSystemService(Context.CLIPBOARD_SERVICE);
                if (manager == null || !manager.hasPrimaryClip()
                        || manager.getPrimaryClip() == null
                        || manager.getPrimaryClip().getItemCount() == 0) {
                    return "";
                }
                CharSequence text = manager.getPrimaryClip().getItemAt(0).coerceToText(activity);
                return text == null ? "" : text.toString();
            }

            case "vibrate": {
                int ms = Math.max(1, Math.min(args.optInt(0, 20), 2000));
                Vibrator vibrator = (Vibrator) activity.getSystemService(Context.VIBRATOR_SERVICE);
                if (vibrator != null && vibrator.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        vibrator.vibrate(VibrationEffect.createOneShot(ms,
                                VibrationEffect.DEFAULT_AMPLITUDE));
                    } else {
                        vibrator.vibrate(ms);
                    }
                }
                return "";
            }

            case "appVersion":
            case "appVersionName":
                return BuildConfig.VERSION_NAME;

            case "appVersionCode":
                return String.valueOf(BuildConfig.VERSION_CODE);

            case "packageName":
                return activity.getPackageName();

            case "accountId":
                // 面板的账号体系在网页里，原生壳不持有登录态
                return "";

            case "exitApp": {
                activity.runOnUiThread(() -> {
                    if (webView != null) {
                        webView.loadUrl("about:blank");
                    }
                    activity.finish();
                });
                return "";
            }

            // ------------------------------------------------ 新增：前后台

            case "background":
                return activity.isInBackground() ? "true" : "false";

            case "backgroundStatus":
                return okObject()
                        .put("background", activity.isInBackground())
                        .put("since", activity.backgroundSince())
                        .toString();

            // ------------------------------------------------ 新增：GPS 速度

            case "beginGpsSpeed":
                return beginGps();

            case "pollGpsSpeed":
                return pollGps();

            case "endGpsSpeed":
                return endGps();

            // ------------------------------------------------ 新增：图片导出

            case "imageExport":
                return exportImage(args.optString(0, ""), args.optString(1, "panel.png"));

            // ------------------------------------------------ 新增：应用日志

            case "beginAppLog":
                return beginAppLog(args.optString(0, "session"));

            case "endAppLog":
                return endAppLog();

            case "appLogSession":
                return appLogSession();

            // ------------------------------------------------ 新增：通知渠道

            case "notifyGroups":
                return notifyGroups();

            case "setNotifyGroup":
                return setNotifyGroup(args.optString(0, ""), args.optBoolean(1, false));

            default:
                if (isKnown(method)) {
                    return unsupported(method);
                }
                return "";
        }
    }

    /** 供 JS 侧 boolean 返回值使用（background 等方法原版返回的是布尔）。 */
    @JavascriptInterface
    public boolean callBool(String method, String argsJson) {
        if ("background".equals(method)) {
            return activity.isInBackground();
        }
        return false;
    }

    // ---------------------------------------------------------------- GPS

    private String beginGps() throws JSONException {
        if (activity.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            activity.requestLocationPermission();
            return errObject("permission_denied").toString();
        }
        if (gpsRunning) {
            return okObject().put("handle", "gps-1").put("already", true).toString();
        }
        locationManager = (LocationManager) activity.getSystemService(Context.LOCATION_SERVICE);
        if (locationManager == null) {
            return errObject("no_location_service").toString();
        }
        locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                lastLocation = location;
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {
            }

            @Override
            public void onProviderEnabled(String provider) {
            }

            @Override
            public void onProviderDisabled(String provider) {
            }
        };
        try {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 0f,
                    locationListener, activity.getMainLooper());
        } catch (Exception ignored) {
        }
        try {
            locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 2000, 0f,
                    locationListener, activity.getMainLooper());
        } catch (Exception ignored) {
        }
        gpsRunning = true;
        gpsStartedAt = System.currentTimeMillis();
        return okObject().put("handle", "gps-1").toString();
    }

    private String pollGps() throws JSONException {
        if (!gpsRunning) {
            return errObject("not_started").toString();
        }
        JSONObject out = okObject().put("handle", "gps-1");
        if (lastLocation == null) {
            return out.put("waiting", true).toString();
        }
        out.put("speed", lastLocation.getSpeed())
                .put("lat", lastLocation.getLatitude())
                .put("lng", lastLocation.getLongitude())
                .put("accuracy", lastLocation.getAccuracy())
                .put("altitude", lastLocation.getAltitude())
                .put("ts", lastLocation.getTime())
                .put("elapsed", System.currentTimeMillis() - gpsStartedAt);
        return out.toString();
    }

    private String endGps() throws JSONException {
        if (locationManager != null && locationListener != null) {
            try {
                locationManager.removeUpdates(locationListener);
            } catch (Exception ignored) {
            }
        }
        locationManager = null;
        locationListener = null;
        lastLocation = null;
        gpsRunning = false;
        return okObject().toString();
    }

    // ---------------------------------------------------------------- 图片导出

    private String exportImage(String dataUrl, String name) throws JSONException {
        if (dataUrl == null || dataUrl.isEmpty()) {
            return errObject("empty").toString();
        }
        String base64 = dataUrl;
        int comma = base64.indexOf(',');
        if (base64.startsWith("data:") && comma > 0) {
            base64 = base64.substring(comma + 1);
        }
        byte[] bytes;
        try {
            bytes = Base64.decode(base64, Base64.DEFAULT);
        } catch (Exception e) {
            return errObject("bad_base64").toString();
        }
        String safeName = name == null || name.isEmpty() ? "panel.png" : name.replaceAll(
                "[^A-Za-z0-9._-]", "_");
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentValues values = new ContentValues();
                values.put(MediaStore.Images.Media.DISPLAY_NAME, safeName);
                values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
                values.put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/YutianPanel");
                Uri uri = activity.getContentResolver()
                        .insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                if (uri == null) {
                    return errObject("insert_failed").toString();
                }
                OutputStream os = activity.getContentResolver().openOutputStream(uri);
                if (os == null) {
                    return errObject("open_failed").toString();
                }
                os.write(bytes);
                os.close();
                return okObject().put("uri", uri.toString()).put("bytes", bytes.length).toString();
            }
            File dir = new File(Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_PICTURES), "YutianPanel");
            if (!dir.exists() && !dir.mkdirs()) {
                return errObject("mkdir_failed").toString();
            }
            File file = new File(dir, safeName);
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(bytes);
            fos.close();
            return okObject().put("path", file.getAbsolutePath())
                    .put("bytes", bytes.length).toString();
        } catch (Exception e) {
            return errObject("io_error").put("message", String.valueOf(e.getMessage())).toString();
        }
    }

    // ---------------------------------------------------------------- 日志

    private File logFile() {
        if (logFile == null) {
            File dir = activity.getExternalFilesDir(null);
            if (dir == null) {
                dir = activity.getFilesDir();
            }
            logFile = new File(dir, "panel.log");
        }
        return logFile;
    }

    private String beginAppLog(String tag) throws JSONException {
        try {
            String line = "\n=== session start " + tag + " "
                    + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US).format(new Date())
                    + " ===\n";
            FileOutputStream fos = new FileOutputStream(logFile(), true);
            fos.write(line.getBytes());
            fos.close();
            return okObject().put("path", logFile().getAbsolutePath()).toString();
        } catch (Exception e) {
            return errObject("io_error").toString();
        }
    }

    private String endAppLog() throws JSONException {
        return appLogSession();
    }

    private String appLogSession() throws JSONException {
        File f = logFile();
        return okObject()
                .put("path", f.getAbsolutePath())
                .put("exists", f.exists())
                .put("size", f.exists() ? f.length() : 0)
                .toString();
    }

    // ---------------------------------------------------------------- 通知渠道

    private String notifyGroups() throws JSONException {
        android.app.NotificationManager nm =
                (android.app.NotificationManager) activity.getSystemService(
                        Context.NOTIFICATION_SERVICE);
        JSONArray groups = new JSONArray();
        if (nm != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            for (android.app.NotificationChannel channel : nm.getNotificationChannels()) {
                JSONObject item = new JSONObject();
                try {
                    item.put("id", channel.getId());
                    item.put("name", channel.getName());
                    item.put("on", nm.getNotificationChannel(channel.getId())
                            .getImportance() != android.app.NotificationManager.IMPORTANCE_NONE);
                } catch (Exception ignored) {
                }
                groups.put(item);
            }
        }
        return okObject().put("groups", groups).toString();
    }

    private String setNotifyGroup(String id, boolean on) throws JSONException {
        if (id == null || id.isEmpty()) {
            return errObject("empty_id").toString();
        }
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return errObject("unsupported_api").toString();
        }
        android.app.NotificationManager nm =
                (android.app.NotificationManager) activity.getSystemService(
                        Context.NOTIFICATION_SERVICE);
        if (nm == null) {
            return errObject("no_service").toString();
        }
        if (on) {
            android.app.NotificationChannel channel = new android.app.NotificationChannel(
                    id, id, android.app.NotificationManager.IMPORTANCE_DEFAULT);
            nm.createNotificationChannel(channel);
        } else {
            nm.deleteNotificationChannel(id);
        }
        return okObject().toString();
    }

    // ---------------------------------------------------------------- 工具

    private static JSONArray parseArgs(String argsJson) {
        try {
            return new JSONArray(argsJson == null || argsJson.isEmpty() ? "[]" : argsJson);
        } catch (Exception e) {
            return new JSONArray();
        }
    }

    private static boolean isKnown(String method) {
        for (String name : KNOWN_NAMES) {
            if (name.equals(method)) {
                return true;
            }
        }
        return false;
    }

    private static JSONObject okObject() {
        JSONObject o = new JSONObject();
        try {
            o.put("ok", true);
        } catch (Exception ignored) {
        }
        return o;
    }

    private static JSONObject errObject(String error) {
        JSONObject o = new JSONObject();
        try {
            o.put("ok", false);
            o.put("error", error);
        } catch (Exception ignored) {
        }
        return o;
    }

    private static String unsupported(String method) {
        JSONObject o = errObject("unsupported");
        try {
            o.put("method", method);
            o.put("message", "当前壳未实现该能力");
        } catch (Exception ignored) {
        }
        return o.toString();
    }
}

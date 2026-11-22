package com.yutian.panel;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * 从自己的 GitHub Releases 拉新版本。
 *
 * 约定：tag 形如 v1.2.3；Release 里带一个 .apk 资产。
 * 没有 Release、没网、被墙都只是静默跳过，绝不影响面板启动。
 */
final class UpdateChecker {

    private static volatile boolean checked = false;

    private UpdateChecker() {
    }

    static void maybeCheck(Activity activity) {
        if (checked) {
            return;
        }
        checked = true;
        Thread thread = new Thread(() -> {
            try {
                JSONObject release = fetchLatestRelease();
                if (release == null) {
                    return;
                }
                String tag = release.optString("tag_name", "");
                String notes = release.optString("body", "");
                if (compareVersion(tag, BuildConfig.VERSION_NAME) <= 0) {
                    return;
                }
                JSONArray assets = release.optJSONArray("assets");
                String apkUrl = null;
                long size = 0;
                if (assets != null) {
                    for (int i = 0; i < assets.length(); i++) {
                        JSONObject asset = assets.optJSONObject(i);
                        if (asset == null) {
                            continue;
                        }
                        String name = asset.optString("name", "");
                        if (name.toLowerCase(Locale.ROOT).endsWith(".apk")) {
                            apkUrl = asset.optString("browser_download_url", "");
                            size = asset.optLong("size", 0);
                            break;
                        }
                    }
                }
                if (apkUrl == null || apkUrl.isEmpty()) {
                    return;
                }
                final String url = apkUrl;
                final String version = tag;
                final String body = notes;
                final long bytes = size;
                activity.runOnUiThread(() ->
                        showDialog(activity, version, body, bytes, url));
            } catch (Exception ignored) {
                // 离线 / 限流 / 仓库还没建好，都不提示
            }
        }, "yutian-update-check");
        thread.setDaemon(true);
        thread.start();
    }

    private static JSONObject fetchLatestRelease() throws Exception {
        URL url = new URL("https://api.github.com/repos/"
                + BuildConfig.GH_OWNER + "/" + BuildConfig.GH_REPO + "/releases/latest");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(8000);
        connection.setReadTimeout(8000);
        connection.setRequestProperty("Accept", "application/vnd.github+json");
        connection.setRequestProperty("User-Agent", "YutianPanel/" + BuildConfig.VERSION_NAME);
        try {
            if (connection.getResponseCode() != 200) {
                return null;
            }
            try (InputStream in = new BufferedInputStream(connection.getInputStream())) {
                StringBuilder sb = new StringBuilder();
                byte[] buffer = new byte[4096];
                int read;
                while ((read = in.read(buffer)) != -1) {
                    sb.append(new String(buffer, 0, read, StandardCharsets.UTF_8));
                }
                return new JSONObject(sb.toString());
            }
        } finally {
            connection.disconnect();
        }
    }

    private static void showDialog(Activity activity, String version, String notes,
                                   long size, String url) {
        if (activity.isFinishing()) {
            return;
        }
        StringBuilder message = new StringBuilder();
        if (notes != null && !notes.trim().isEmpty()) {
            String text = notes.trim();
            message.append(text.length() > 800 ? text.substring(0, 800) + "…" : text);
            message.append("\n\n");
        }
        if (size > 0) {
            message.append("安装包 ").append(String.format(Locale.CHINA, "%.1f MB",
                    size / 1024.0 / 1024.0));
        }
        new AlertDialog.Builder(activity)
                .setTitle("发现新版本 " + version)
                .setMessage(message.toString().trim())
                .setPositiveButton("下载更新", (dialog, which) -> download(activity, url, version))
                .setNegativeButton("以后再说", null)
                .show();
    }

    private static void download(Activity activity, String url, String version) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                && !activity.getPackageManager().canRequestPackageInstalls()) {
            new AlertDialog.Builder(activity)
                    .setTitle("需要安装权限")
                    .setMessage("系统限制了「安装未知应用」。请允许雨天面板安装应用后，再回来点一次下载。")
                    .setPositiveButton("去设置", (dialog, which) -> {
                        Intent intent = new Intent(
                                android.provider.Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                                Uri.parse("package:" + activity.getPackageName()));
                        try {
                            activity.startActivity(intent);
                        } catch (Exception ignored) {
                            activity.startActivity(new Intent(
                                    android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                                    Uri.parse("package:" + activity.getPackageName())));
                        }
                    })
                    .setNegativeButton("取消", null)
                    .show();
            return;
        }
        try {
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
            request.setTitle("雨天面板 " + version);
            request.setDescription("正在下载新版本");
            request.setMimeType("application/vnd.android.package-archive");
            request.setNotificationVisibility(
                    DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS,
                    "yutian-panel-" + version + ".apk");
            DownloadManager manager =
                    (DownloadManager) activity.getSystemService(Activity.DOWNLOAD_SERVICE);
            if (manager != null) {
                manager.enqueue(request);
                Toast.makeText(activity, "开始下载，完成后在通知栏点击安装", Toast.LENGTH_LONG).show();
            }
        } catch (Exception e) {
            Toast.makeText(activity, "下载失败：" + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private static int compareVersion(String left, String right) {
        int[] a = numbers(left);
        int[] b = numbers(right);
        int max = Math.max(a.length, b.length);
        for (int i = 0; i < max; i++) {
            int x = i < a.length ? a[i] : 0;
            int y = i < b.length ? b[i] : 0;
            if (x != y) {
                return x > y ? 1 : -1;
            }
        }
        return 0;
    }

    private static int[] numbers(String version) {
        if (version == null) {
            return new int[0];
        }
        String cleaned = version.trim().replaceAll("[^0-9.]", "");
        if (cleaned.isEmpty()) {
            return new int[0];
        }
        String[] parts = cleaned.split("\\.");
        int[] out = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            try {
                out[i] = Integer.parseInt(parts[i]);
            } catch (NumberFormatException e) {
                out[i] = 0;
            }
        }
        return out;
    }
}

package com.yutian.panel;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import org.json.JSONArray;

/**
 * 网页与原生的最小接口。
 *
 * 只暴露网页真的会调、而且有明确语义的方法；没实现的能力（蓝牙钥匙、投屏、
 * 车机壁纸、桌面小组件、仪表 OTA）干脆不出现，面板会按「当前 App 未提供所需能力」
 * 自己降级，不会出现网页以为成功、原生其实没做的情况。
 */
public final class ShellBridge {

    private final MainActivity activity;
    private final WebView webView;

    ShellBridge(MainActivity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
    }

    @JavascriptInterface
    public String call(String method, String argsJson) {
        if (method == null) {
            return "";
        }
        JSONArray args;
        try {
            args = new JSONArray(argsJson == null || argsJson.isEmpty() ? "[]" : argsJson);
        } catch (Exception e) {
            args = new JSONArray();
        }

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

            default:
                return "";
        }
    }
}

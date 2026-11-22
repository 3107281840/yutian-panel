package com.yutian.panel;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.io.ByteArrayInputStream;
import java.util.Locale;

/**
 * 雨天面板：一个只做壳的原生容器。
 *
 * 面板网页不再打进 APK，而是每次从自己的 GitHub 仓库拉取：
 * GitHub Pages 优先，jsDelivr 和 ghproxy 兜底。
 * 原生侧只保留系统能力（主题、常亮、分享、剪贴板、下载、更新），
 * 车辆数据、账号、3D 模型仍走网页自己的逻辑。
 */
public class MainActivity extends Activity {

    private static final int REQ_FILE_CHOOSER = 1001;
    private static final int REQ_GEO_PERMISSION = 1002;

    /** 国内可解析的 jsDelivr 镜像（主线路）。 */
    private static final String PANEL_MIRROR =
            "https://cdn.jsdmirror.com/gh/3107281840/yutian-panel@main/panel/index.html";
    /** GitHub Pages。 */
    private static final String PANEL_PAGES =
            "https://3107281840.github.io/yutian-panel/panel/index.html";
    /** jsDelivr gcore 节点。 */
    private static final String PANEL_GCORE =
            "https://gcore.jsdelivr.net/gh/3107281840/yutian-panel@main/panel/index.html";
    /** jsDelivr Fastly 节点，最后兜底（较慢）。 */
    private static final String PANEL_FASTLY =
            "https://fastly.jsdelivr.net/gh/3107281840/yutian-panel@main/panel/index.html";

    private static final String[] PANEL_URLS = {
            PANEL_MIRROR, PANEL_PAGES, PANEL_GCORE, PANEL_FASTLY};

    private volatile boolean inBackground;
    private volatile long backgroundSince;
    private volatile boolean switching;

    private WebView webView;
    private FrameLayout root;
    private LinearLayout errorView;
    private TextView errorText;
    private String pageUrl = PANEL_URLS[0];
    private int sourceIndex = 0;

    private ValueCallback<Uri[]> fileCallback;
    private GeolocationPermissions.Callback geoCallback;
    private String geoOrigin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.parseColor("#0A0A0C"));
        getWindow().setNavigationBarColor(Color.parseColor("#0A0A0C"));

        root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#0A0A0C"));
        webView = new WebView(this);
        root.addView(webView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        buildErrorView();
        setContentView(root);

        configureWebView();
        loadSource(0);

        UpdateChecker.maybeCheck(this);
    }

    private void buildErrorView() {
        errorView = new LinearLayout(this);
        errorView.setOrientation(LinearLayout.VERTICAL);
        errorView.setGravity(Gravity.CENTER);
        errorView.setBackgroundColor(Color.parseColor("#0A0A0C"));
        errorView.setPadding(48, 48, 48, 48);
        errorView.setVisibility(View.GONE);

        TextView title = new TextView(this);
        title.setText("面板加载失败");
        title.setTextColor(Color.WHITE);
        title.setTextSize(20);
        title.setGravity(Gravity.CENTER);
        errorView.addView(title);

        errorText = new TextView(this);
        errorText.setText("请检查网络后重试。\n面板从 GitHub 在线拉取，首次打开需要联网。");
        errorText.setTextColor(Color.parseColor("#B8B8C0"));
        errorText.setTextSize(14);
        errorText.setGravity(Gravity.CENTER);
        errorText.setPadding(0, 18, 0, 28);
        errorView.addView(errorText);

        Button retry = new Button(this);
        retry.setText("重试");
        retry.setOnClickListener(v -> loadSource(0));
        errorView.addView(retry);

        root.addView(errorView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

    private void loadSource(int index) {
        if (index >= PANEL_URLS.length) {
            showError();
            return;
        }
        sourceIndex = index;
        pageUrl = PANEL_URLS[index];
        switching = false;
        errorView.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
        webView.loadUrl(pageUrl);
    }

    private void nextSource() {
        if (switching) {
            return;
        }
        switching = true;
        runOnUiThread(() -> {
            switching = false;
            if (sourceIndex + 1 < PANEL_URLS.length) {
                loadSource(sourceIndex + 1);
            } else {
                showError();
            }
        });
    }

    private void showError() {
        runOnUiThread(() -> {
            errorText.setText("三条线路都没有连上。\n请检查网络或代理后重试。");
            errorView.setVisibility(View.VISIBLE);
            webView.setVisibility(View.GONE);
        });
    }

    @SuppressWarnings("SetJavaScriptEnabled")
    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        webView.addJavascriptInterface(new ShellBridge(this, webView), "ZeehoNative");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                try {
                    if (request.isForMainFrame()
                            && pageUrl != null
                            && pageUrl.equals(request.getUrl().toString())) {
                        byte[] html = PanelLoader.loadIndex(MainActivity.this, pageUrl);
                        if (html != null) {
                            return new WebResourceResponse("text/html", "UTF-8",
                                    new ByteArrayInputStream(html));
                        }
                    }
                } catch (Throwable ignored) {
                }
                return null;
            }

            @Override
            public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
                if (url != null && url.contains("download.html")
                        && sourceIndex < PANEL_URLS.length) {
                    // 桥注入失败时面板会把自己当成普通浏览器跳到下载页，这里直接换下一条线路。
                    nextSource();
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (errorView != null && errorView.getVisibility() == View.VISIBLE) {
                    errorView.setVisibility(View.GONE);
                    webView.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request,
                                        WebResourceError error) {
                if (request != null && request.isForMainFrame()) {
                    nextSource();
                }
            }

            @Override
            public void onReceivedHttpError(WebView view, WebResourceRequest request,
                                            WebResourceResponse response) {
                if (request != null && request.isForMainFrame()
                        && response != null && response.getStatusCode() >= 400) {
                    nextSource();
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUri(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUri(Uri.parse(url));
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                                             FileChooserParams params) {
                if (fileCallback != null) {
                    fileCallback.onReceiveValue(null);
                }
                fileCallback = callback;

                Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("*/*");
                if (params != null && params.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE) {
                    intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                }
                try {
                    startActivityForResult(Intent.createChooser(intent, "选择文件"), REQ_FILE_CHOOSER);
                    return true;
                } catch (ActivityNotFoundException e) {
                    fileCallback = null;
                    return false;
                }
            }

            @Override
            public void onGeolocationPermissionsShowPrompt(String origin,
                                                           GeolocationPermissions.Callback callback) {
                if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)
                        == PackageManager.PERMISSION_GRANTED) {
                    callback.invoke(origin, true, false);
                    return;
                }
                geoCallback = callback;
                geoOrigin = origin;
                requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        REQ_GEO_PERMISSION);
            }

            @Override
            public void onPermissionRequest(PermissionRequest request) {
                // 面板不需要摄像头/麦克风；直接拒绝，避免网页弹出无意义的授权
                request.deny();
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                        .setMessage(message)
                        .setPositiveButton("知道了", (dialog, which) -> result.confirm())
                        .setCancelable(false)
                        .show();
                return true;
            }

            @Override
            public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                        .setMessage(message)
                        .setPositiveButton("确定", (dialog, which) -> result.confirm())
                        .setNegativeButton("取消", (dialog, which) -> result.cancel())
                        .setCancelable(false)
                        .show();
                return true;
            }
        });

        webView.setDownloadListener((url, userAgent, contentDisposition, mimeType, contentLength) -> {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                Toast.makeText(this, "暂不支持该类型的下载", Toast.LENGTH_SHORT).show();
                return;
            }
            try {
                DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
                request.addRequestHeader("User-Agent", userAgent);
                request.setMimeType(mimeType);
                request.setNotificationVisibility(
                        DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS,
                        URLUtil.guessFileName(url, contentDisposition, mimeType));
                DownloadManager manager = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
                if (manager != null) {
                    manager.enqueue(request);
                    Toast.makeText(this, "已开始下载", Toast.LENGTH_SHORT).show();
                }
            } catch (Exception e) {
                Toast.makeText(this, "下载失败：" + e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    /** 面板内部的页面留在 WebView，外链交给系统浏览器。 */
    private boolean handleUri(Uri uri) {
        if (uri == null) {
            return true;
        }
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase(Locale.ROOT);
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase(Locale.ROOT);

        if ("http".equals(scheme) || "https".equals(scheme)) {
            if (host.equals("3107281840.github.io")
                    || host.endsWith("jsdelivr.net")
                    || host.endsWith("ghproxy.net")
                    || host.endsWith("githubusercontent.com")
                    || host.endsWith("zeehoev.com")
                    || host.endsWith("cfmoto.com")
                    || host.endsWith("aliyuncs.com")) {
                return false;
            }
            openExternal(uri);
            return true;
        }
        if ("tel".equals(scheme) || "mailto".equals(scheme) || "sms".equals(scheme)) {
            openExternal(uri);
            return true;
        }
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (Exception ignored) {
            Toast.makeText(this, "没有可以打开该链接的应用", Toast.LENGTH_SHORT).show();
        }
        return true;
    }

    void openExternal(Uri uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (Exception ignored) {
            Toast.makeText(this, "没有可以打开该链接的应用", Toast.LENGTH_SHORT).show();
        }
    }

    void openExternalUrl(String url) {
        if (url == null) {
            return;
        }
        String lower = url.trim().toLowerCase(Locale.ROOT);
        if (!lower.startsWith("http://") && !lower.startsWith("https://")) {
            return;
        }
        openExternal(Uri.parse(url.trim()));
    }

    void openAppSettings() {
        try {
            Intent intent = new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                    Uri.parse("package:" + getPackageName()));
            startActivity(intent);
        } catch (Exception ignored) {
        }
    }

    void applyThemeColors(boolean dark, String colorText) {
        int color;
        try {
            color = Color.parseColor(colorText == null ? "#0A0A0C" : colorText.trim());
        } catch (Exception e) {
            color = Color.parseColor("#0A0A0C");
        }
        final int applied = color;
        runOnUiThread(() -> {
            getWindow().setStatusBarColor(applied);
            getWindow().setNavigationBarColor(applied);
            View decor = getWindow().getDecorView();
            int flags = decor.getSystemUiVisibility();
            if (dark) {
                flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            } else {
                flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            }
            decor.setSystemUiVisibility(flags);
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQ_FILE_CHOOSER) {
            if (fileCallback == null) {
                return;
            }
            Uri[] results = null;
            if (resultCode == RESULT_OK && data != null) {
                if (data.getClipData() != null) {
                    ClipData clip = data.getClipData();
                    results = new Uri[clip.getItemCount()];
                    for (int i = 0; i < clip.getItemCount(); i++) {
                        results[i] = clip.getItemAt(i).getUri();
                    }
                } else if (data.getData() != null) {
                    results = new Uri[]{data.getData()};
                }
            }
            fileCallback.onReceiveValue(results);
            fileCallback = null;
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (requestCode == REQ_GEO_PERMISSION && geoCallback != null) {
            boolean granted = grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED;
            geoCallback.invoke(geoOrigin, granted, false);
            geoCallback = null;
            geoOrigin = null;
            return;
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    boolean isInBackground() {
        return inBackground;
    }

    long backgroundSince() {
        return backgroundSince;
    }

    void requestLocationPermission() {
        if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    REQ_GEO_PERMISSION);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        inBackground = false;
    }

    @Override
    protected void onPause() {
        super.onPause();
        inBackground = true;
        backgroundSince = System.currentTimeMillis();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.loadUrl("about:blank");
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}

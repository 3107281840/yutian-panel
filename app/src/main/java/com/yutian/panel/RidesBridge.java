package com.yutian.panel;

import android.webkit.JavascriptInterface;

import org.json.JSONObject;

/** 独立骑行轨迹页的桥：只暴露签名、token 和关闭，不把 HTTP 阻塞在 JS 线程里。 */
public final class RidesBridge {

    private final MainActivity activity;

    RidesBridge(MainActivity activity) {
        this.activity = activity;
    }

    @JavascriptInterface
    public String sign(String body) {
        String[] signed = ZeehoApi.sign(body == null ? "{}" : body);
        try {
            JSONObject out = new JSONObject();
            out.put("param", signed[0]);
            out.put("sign", signed[1]);
            return out.toString();
        } catch (Throwable ignored) {
            return "{\"param\":\"\",\"sign\":\"\"}";
        }
    }

    @JavascriptInterface
    public String token() {
        try {
            return activity.getSharedPreferences("zeeho_store", 0)
                    .getString("zeeho.token", "");
        } catch (Throwable ignored) {
            return "";
        }
    }

    @JavascriptInterface
    public void close() {
        activity.runOnUiThread(activity::closeRides);
    }
}

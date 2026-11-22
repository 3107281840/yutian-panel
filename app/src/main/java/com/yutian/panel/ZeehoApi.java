package com.yutian.panel;

import java.security.MessageDigest;
import java.util.UUID;

/** 极核云端接口签名：SHA1 后 MD5，Bearer token 鉴权。 */
final class ZeehoApi {

    static final String HOST = "https://tapi.zeehoev.com";
    static final String APP_ID = "AiTXmBrm";
    static final String SECRET = "70c2c7458ab88ca9504ad0521f170075bc91f2f7";

    private ZeehoApi() {
    }

    static String[] sign(String body) {
        String nonce = UUID.randomUUID().toString();
        String ts = String.valueOf(System.currentTimeMillis());
        String param = "appId=" + APP_ID + "&nonce=" + nonce + "&timestamp=" + ts;
        String sign = hex("MD5", hex("SHA-1", (body == null ? "{}" : body) + param + SECRET));
        return new String[]{param, sign};
    }

    private static String hex(String alg, String value) {
        try {
            MessageDigest md = MessageDigest.getInstance(alg);
            byte[] digest = md.digest(value.getBytes("UTF-8"));
            StringBuilder out = new StringBuilder();
            for (byte b : digest) {
                out.append(String.format("%02x", b & 0xff));
            }
            return out.toString();
        } catch (Throwable ignored) {
            return "";
        }
    }
}

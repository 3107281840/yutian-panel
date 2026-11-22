(() => {
  (v1 => {
    if (window.LAZY_FEATURE) {
      window.LAZY_FEATURE.register(window, "CAST", v1);
    } else {
      v1();
    }
  })(() => {
    window.CAST = (() => {
      'use strict';

      const v2 = {
        data: 10920,
        media: 10921,
        control: 10922,
        status: 10930
      };
      const v3 = "192.168.0.1";
      const v4 = {
        ping: 1879048192,
        pong: 1879048193,
        ack: 65536,
        ackReply: 65537,
        infoA: 67280,
        infoAReply: 67281,
        infoB: 131072,
        infoBReply: 131073,
        clientInfoRequest: 65552,
        clientInfo: 65553,
        serialCheck: 66528,
        serialAck: 66529,
        serialResult: 131520,
        runningLog: 67456,
        runningLogAck: 67457,
        startSignal: 196640,
        unsupported: -2147483632
      };
      const v5 = {
        request: 1879048208,
        response: 1879048209
      };
      const v6 = {
        configure: 16,
        configureAck: 17,
        heartbeatA: 48,
        heartbeatAReply: 49,
        heartbeatB: 64,
        heartbeatBReply: 65,
        viewConfig: 96,
        viewConfigReply: 97,
        start: 112,
        startAck: 113,
        pullFrame: 114
      };
      const v7 = {
        controlHeader: 16,
        controlMax: 262144,
        mediaHeader: 8,
        mediaBodyMax: 65535,
        qrMaxChars: 4096
      };
      const v8 = Uint8Array.of(138, 19, 0, 0, 1, 0, 0, 0);
      const v9 = {
        viewAreaConfig: {
          state: 0
        },
        supportFunction: 0
      };
      const v10 = {
        version: 1,
        mode: "9"
      };
      const v11 = {
        width: 1024,
        height: 600,
        fps: 0,
        encoder: 2,
        bitrate: 2097152,
        extended: false
      };
      const v12 = 5;
      const v13 = {
        elapsedMs: 15000,
        sentFrames: 150
      };
      const v14 = ["performance", "bitrate-safe", "compatibility", "balanced", "resolution-safe", "decoder-safe"];
      const v15 = 2;
      const v16 = {
        "3.0": 256,
        "3.1": 512,
        "4.0": 2048,
        "5.0": 16384
      };
      const v17 = {
        idle: "idle",
        provisioning: "provisioning",
        handshaking: "handshaking",
        ready: "ready",
        casting: "casting",
        adapting: "adapting",
        stopping: "stopping",
        failed: "failed",
        unavailable: "unavailable"
      };
      const v18 = {
        idle: 0,
        provisioning: 1,
        handshaking: 2,
        ready: 3,
        adapting: 4,
        casting: 5
      };
      function v19(v71, v72) {
        if (!v72 || v72 === v71) {
          return true;
        }
        if (v72 === "unavailable") {
          return false;
        }
        if (v72 === "failed" || v72 === "stopping" || v72 === "idle") {
          return v71 !== "unavailable";
        }
        if (v71 === "unavailable") {
          return false;
        }
        if (v71 === "failed") {
          return v72 === "provisioning";
        }
        if (v72 === "adapting") {
          return v71 === "casting" || v71 === "adapting";
        }
        const v73 = v18[v71];
        const v74 = v18[v72];
        if (v73 == null || v74 == null) {
          return false;
        }
        return v74 >= v73;
      }
      const v20 = {
        idle: "idle",
        connecting: "provisioning",
        provisioning: "provisioning",
        "hotspot-monitor": "provisioning",
        handshaking: "handshaking",
        ready: "ready",
        casting: "casting",
        adapting: "adapting",
        stopping: "stopping",
        stopped: "idle",
        saved: "idle",
        "waiting-projection": "provisioning",
        failed: "failed",
        unavailable: "unavailable"
      };
      function v21(v75) {
        if (!v75) {
          return null;
        }
        const v76 = String(v75).trim().toLowerCase();
        return v20[v76] || null;
      }
      const v22 = {
        qr_input_invalid: "二维码内容为空或过长",
        qr_version_invalid: "二维码版本号不是数字",
        qr_version_unsupported: "二维码版本不受支持（只支持 v=1）",
        connection_mode_unsupported: "二维码连接模式不受支持（需要 action=9）",
        pairing_field_missing: "二维码缺少必填字段",
        model_id_invalid: "二维码里的车型不合法",
        network_name_invalid: "二维码里的 Wi-Fi 名称不合法",
        network_credential_invalid: "二维码里的 Wi-Fi 密码不合法（8~63 位）",
        device_address_missing: "二维码缺少车机 P2P 地址",
        device_address_invalid: "车机 P2P 地址格式不对",
        serial_invalid: "二维码里的 SN 过长",
        qr_invalid: "无法识别的投屏二维码",
        native_bridge_missing: "当前环境没有投屏原生桥，需在极核面板 App 内使用",
        bridge_method_missing: "原生桥版本过旧，缺少所需方法",
        bridge_timeout: "原生桥无响应",
        wifi_permission_denied: "缺少 Wi-Fi / 附近设备权限",
        wifi_disabled: "Wi-Fi 未开启",
        wifi_direct_unsupported: "本机不支持 Wi-Fi Direct",
        hotspot_active: "手机热点已开启，请先关闭",
        projection_permission_required: "需要先授权屏幕录制",
        vehicle_status_unavailable: "车机没有响应（检查车机是否停在投屏页）",
        vehicle_status_rejected: "车机拒绝了握手",
        vehicle_disconnected: "车机断开连接",
        listener_port_unavailable: "端口 10920~10922 被占用",
        encoder_unavailable: "本机没有可用的 H.264 编码器",
        media_incompatible_after_fallback: "车机解码不兼容，已降档仍失败",
        unsupported_frame_format: "数据帧格式不受支持",
        p2p_connect_failed: "Wi-Fi Direct 连接车机失败",
        p2p_timeout: "Wi-Fi Direct 组网超时",
        session_active: "已有投屏会话在进行",
        security_error: "系统拒绝该操作",
        bridge_bad_json: "原生桥返回的数据无法解析",
        capture_source_unsupported: "只支持投屏手机整屏（不支持主题渲染）",
        internal_error: "投屏内部错误",
        media_config_invalid: "车机下发的采集配置不合法",
        projection_stopped: "屏幕录制被系统或用户停止",
        projection_unavailable: "系统没有可用的屏幕录制能力",
        vehicle_not_found: "附近没有找到车机的 Wi-Fi Direct 设备，请把车机停在投屏页再扫码",
        wifi_direct_disabled: "Wi-Fi Direct 已被系统关闭",
        cast_app_group_unavailable: "App 数据共享没有配置好，当前安装包无法投屏，请换用官方安装包",
        broadcast_extension_missing: "当前安装包缺少屏幕广播组件，无法投屏，请换用官方安装包",
        local_network_usage_description_missing: "当前安装包缺少本地网络权限说明，无法连接车机，请换用官方安装包",
        local_network_permission_denied: "iOS 未授权本地网络访问；请在系统设置中允许本 App 访问本地网络后重试",
        system_broadcast_picker_required: "请在弹出的系统面板里选择「极核面板」开始录屏",
        cast_selection_timeout: "等待你确认录屏超时了，请重新点开始投屏",
        cast_selection_expired: "上一次录屏授权已过期，请重新点开始投屏",
        cast_presenter_unavailable: "暂时打不开录屏授权面板，请回到投屏页重试",
        cast_attempt_required: "请重新点一次开始投屏",
        projection_cancelled: "你取消了录屏授权",
        cast_cancelled: "投屏已取消",
        wifi_required: "手机没有可用的 Wi-Fi，请先在设置里打开无线局域网",
        wifi_disconnected: "手机和车机的 Wi-Fi 断开了，请重新连接车机",
        wifi_profile_invalid: "还没有车机的 Wi-Fi 信息，请先扫码或读取车辆资料",
        user_denied: "你拒绝了加入车机 Wi-Fi，允许后才能投屏",
        wifi_apply_failed: "系统没能加入车机 Wi-Fi。请确认车机停在投屏页，并允许 App 添加 Wi-Fi 网络",
        join_timeout: "连接车机 Wi-Fi 超时，请把车机停在投屏页后重试",
        join_not_verified: "已请求加入车机 Wi-Fi，但没确认连上，请稍后重试",
        foreground_or_wifi_busy: "App 不在前台或 Wi-Fi 正在切换，请回到投屏页重试",
        route_not_verified: "尚未能验证当前车机 Wi-Fi 路径；请确认车机热点已开启、手机已连接，并重试。此结果不一定表示热点 SSID 错误",
        route_unavailable: "找不到通往车机的网络路径；请确认已连接车机 Wi-Fi、车机热点已开启后重试",
        route_lost: "和车机的网络路径断了，请重新连接车机",
        route_unverified: "车机网络路径未确认；当前 Wi-Fi 名称、局域网地址或目标路径有一项无法验证",
        ssid_or_local_route_unverified: "尚不能确认当前 Wi-Fi 名称或车机的本地路由，请检查系统 Wi-Fi 权限、热点与 VPN 后重试",
        ambiguous_wifi_path: "检测到多个网络出口，无法安全选择车机路径；请暂时关闭 VPN 后重试",
        wifi_route_not_exclusive: "网络同时经过多个出口，无法确认车机的直连 Wi-Fi 路径；请暂时关闭 VPN 后重试",
        wifi_path_unavailable: "当前没有可用的 Wi-Fi 网络接口；请打开无线局域网并连接车机热点",
        wifi_interface_changed: "车机 Wi-Fi 接口在验证期间发生变化，请重新连接车机热点后重试",
        wifi_path_failed: "车机 Wi-Fi 路径发生错误，请重新连接车机热点后重试",
        local_endpoint_unverified: "无法确认连接使用了车机 Wi-Fi 的本地地址，请重新连接车机热点后重试",
        source_ip_unverified: "无法确认手机在车机 Wi-Fi 上的本地地址，请检查热点连接后重试",
        source_ip_changed: "手机的车机 Wi-Fi 本地地址已变化，请重新检查连接",
        cast_route_unverified: "无法验证投屏目标的直连网络路径；请检查车机热点和网络接口后重试",
        cast_source_unverified: "无法确定连接车机所用的 Wi-Fi 本地地址，请重连车机热点后重试",
        cast_interface_changed: "车机 Wi-Fi 网络接口发生变化，请重新连接热点后重试",
        cast_route_local_endpoint_unverified: "无法确认投屏使用了目标 Wi-Fi 本地地址；请重连车机热点并检查 VPN 设置",
        cast_source_changed: "投屏期间手机的 Wi-Fi 本地地址变化，请重连热点后重试",
        cast_route_lost: "投屏网络路径已断开，请重新连接车机热点后重试",
        cast_socket_failed: "无法连接投屏服务，请确认车机停在投屏页后重试",
        source_ip_unavailable: "系统当前没有可用的车机 Wi-Fi 本地地址，请重新连接车机热点",
        vehicle_port_unreachable: "无法访问车机服务，请确认车机停在对应页面且热点已开启",
        vehicle_port_refused: "车机当前未接受网络连接，请确认车机停在壁纸或投屏页面",
        vehicle_port_timeout: "等待车机网络服务响应超时，请确认车机已准备好后重试",
        ssid_timeout: "读取当前 Wi-Fi 名称超时，请重试",
        ssid_unknown: "读不到当前 Wi-Fi 名称。请检查 Wi-Fi 信息权限与定位服务；手动连接不一定能让 App 读取 SSID",
        stale_wifi_context: "页面或车辆已经变了，请重新进入投屏页",
        wifi_context_required: "页面缺少必要的车辆信息，请重新进入投屏页",
        hardware_encoder_unavailable: "本机暂时拿不到硬件编码器，无法投屏",
        hardware_encoder_required: "本机只能用硬件编码投屏，当前不可用",
        encoder_prepare_failed: "编码器初始化失败，请重试",
        encoder_configuration_rejected: "编码器参数不被系统接受，请换个画质档位重试",
        encoder_pixel_pool_unavailable: "编码器拿不到画面缓冲，请重试",
        capture_dimensions_unsupported: "当前屏幕尺寸不被编码器支持",
        encoder_output_failed: "编码器输出失败，请重试",
        encoder_encode_failed: "画面编码失败，请换个画质档位重试",
        cast_session_active: "已有投屏会话在进行，请先停止它",
        cast_session_revoked: "投屏会话已失效，请重新开始",
        cast_host_recreated: "App 页面重建过，请在系统录屏面板里停止后重新开始",
        broadcast_heartbeat_timeout: "屏幕广播没有心跳，车机端可能已停止，请重新开始",
        cast_heartbeat_write_failed: "和车机的连接心跳写入失败，请重试",
        cast_session_pending: "上一次投屏正在收尾，请稍等一下",
        stale_cast_session: "这次投屏会话已经变了，请在系统录屏面板里停止后重新开始",
        cast_internal_error: "投屏内部错误",
        cast_service_closed: "投屏服务已关闭，请重新进入投屏页",
        cast_metadata_provider_changed: "页面身份已变化，请重新进入投屏页",
        authorized_vehicle_required: "请先选择并登录车辆后再投屏",
        authorized_scope_required: "页面身份校验失败，请重新进入投屏页",
        native_capability_unavailable: "当前 App 没有提供这项原生能力，请更新到最新版本",
        unavailable: "当前 App 没有提供这项原生能力，请更新到最新版本",
        unsupported: "当前 App 没有提供这项原生能力，请更新到最新版本",
        stale_session: "页面或车辆已经变了，请重新进入投屏页",
        stale_navigation: "页面已经变了，请重新进入投屏页",
        foreground_required: "请保持面板在前台再点一次",
        native_pending: "上一次投屏正在处理中，请稍候",
        cast_recipe_required: "还没有车机的投屏资料，请先扫码或读取车辆资料",
        cast_tier_invalid: "这个画质档位车机不支持，请换一个",
        native_crypto_failed: "本机加密计算失败，请重试"
      };
      function v23(v77, v78 = "operation_failed") {
        const v79 = [v77?.reason, v77?.error?.code, v77?.error, v77?.code, v77];
        for (const v80 of v79) {
          const v81 = typeof v80 === "string" ? v80.trim() : "";
          if (/^[a-z][a-z0-9_]{0,79}$/.test(v81)) {
            return v81;
          }
        }
        if (/^[a-z][a-z0-9_]{0,79}$/.test(v78)) {
          return v78;
        } else {
          return "operation_failed";
        }
      }
      function v24(v82, v83 = "无法确认车机 Wi-Fi 连接，请检查热点和网络路径后重试") {
        const v84 = v23(v82, "");
        if (v84) {
          return v22[v84] || v83;
        } else {
          return v83;
        }
      }
      function v25(v85, v86) {
        const v87 = v23(v85, "");
        if (!v87) {
          return v86 || "";
        }
        return v22[v87] || v86 || String(v87);
      }
      function v26({
        profile: v88,
        host: v89,
        ui: v90,
        isCurrent = () => true,
        key = "ios-vehicle-wifi-guide",
        afterCheck: v91
      } = {}) {
        if (!v88 || !v90?.sheet) {
          return null;
        }
        const v92 = typeof window.MODEL?.esc === "function" ? window.MODEL.esc : v96 => String(v96 ?? "").replace(/[&<>"']/g, v97 => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "\"": "&quot;",
          "'": "&#39;"
        })[v97]);
        const v93 = String(v88.ssid || "").trim();
        const v94 = String(v88.password || "");
        if (!v93) {
          return null;
        }
        let v95 = null;
        v95 = v90.sheet(v89, {
          key: key,
          center: true,
          closeMode: "current",
          title: "连接车机 Wi-Fi",
          sub: "iOS 不提供从 App 直接打开无线局域网设置的入口",
          body: "<ol class=\"wall-guide-steps\">\n        <li>打开 iPhone「设置」→「无线局域网」。</li>\n        <li>等待车机热点出现，再选择 <b class=\"selectable\">" + v92(v93) + "</b>；车机需停在壁纸或投屏页面。</li>\n        <li>" + (v94 ? "按需输入密码 <b class=\"selectable\">" + v92(v94) + "</b>。" : "如系统询问密码，请查看车机页面或已保存的连接资料。") + "</li>\n        <li>返回本 App，点「检查连接」。App 会重新核对 Wi-Fi 路径，不会沿用旧连接。</li>\n      </ol>\n      <p class=\"card-sub\">手动连上热点不代表 App 一定能读取 SSID。遇到名称不可读、路由或 VPN 校验失败时，写入与投屏会保持关闭；请按提示检查权限和网络。</p>\n      " + (v94 ? "<div class=\"cast-actions-stack\"><button class=\"btn block primary\" type=\"button\" data-ios-wifi-copy>复制 Wi-Fi 密码</button></div>" : "") + "\n      <div class=\"cast-actions-stack\"><button class=\"btn block\" type=\"button\" data-ios-wifi-check>返回并检查连接</button><button class=\"btn block text\" type=\"button\" data-ios-wifi-close>知道了</button></div>",
          onMount(v98) {
            v98.querySelector("[data-ios-wifi-copy]")?.addEventListener("click", () => {
              if (isCurrent() && v94) {
                v90.copy?.(v94, v89, "Wi-Fi 密码");
              }
            });
            v98.querySelector("[data-ios-wifi-check]")?.addEventListener("click", () => {
              if (!isCurrent()) {
                return;
              }
              v90.closeSheet?.(v95);
              if (isCurrent()) {
                v91?.();
              }
            });
            v98.querySelector("[data-ios-wifi-close]")?.addEventListener("click", () => v90.closeSheet?.(v95));
          }
        });
      }
      const v27 = /(pwd|password|passwd|ssid|p2p_?mac|^mac$|serial|^sn$|huid|token|secret|pubkey|encryptedhuid|envinfo|encryptinfo|encryptvalue|^key$|^iv$)/i;
      function v28(v99, v100 = 4) {
        const v101 = v99 == null ? "" : String(v99);
        if (!v101) {
          return "";
        }
        if (v101.length <= v100) {
          return "*".repeat(v101.length);
        }
        return "*".repeat(v101.length - v100) + v101.slice(-v100);
      }
      function v29(v102) {
        const v103 = v102 == null ? "" : String(v102).trim();
        if (!v103) {
          return "";
        }
        if (v103.length < 5) {
          return "--";
        }
        return "**:**:**:" + v103.slice(-5);
      }
      function v30(v104) {
        if (Array.isArray(v104)) {
          return v104.map(v106 => v30(v106));
        }
        if (!v104 || typeof v104 !== "object") {
          return v104;
        }
        const v105 = {};
        for (const [v107, v108] of Object.entries(v104)) {
          if (v27.test(v107)) {
            v105[v107] = typeof v108 === "string" || typeof v108 === "number" ? v28(v108) : "[REDACTED]";
          } else if (v108 && typeof v108 === "object") {
            v105[v107] = v30(v108);
          } else {
            v105[v107] = v108;
          }
        }
        return v105;
      }
      function v31(v109) {
        try {
          return decodeURIComponent(v109.replace(/\+/g, " "));
        } catch {
          return v109;
        }
      }
      function v32(v110, ...v111) {
        for (const v112 of v111) {
          const v113 = v110.get(v112);
          if (v113 != null && v113 !== "") {
            return v113;
          }
        }
        return "";
      }
      function v33(v114, v115 = {}) {
        return v35(v114, v115?.requireMac !== false);
      }
      function v34(v116) {
        return v35(v116, false);
      }
      function v35(v117, v118) {
        const v119 = [];
        const v120 = v117 == null ? "" : String(v117);
        const v121 = v120.trim();
        const v122 = v121.length > 0 && v121.length <= v7.qrMaxChars;
        const v123 = {
          qrInputWithinLimit: v122,
          pairingVersionPresent: false,
          connectionModePresent: false,
          modelIdPresent: false,
          networkNamePresent: false,
          networkCredentialPresent: false,
          deviceAddressPresent: false,
          serialPresent: false
        };
        if (!v122) {
          return {
            ok: false,
            profile: null,
            fields: v123,
            errors: [{
              code: "qr_input_invalid",
              message: v25("qr_input_invalid")
            }]
          };
        }
        const v124 = v121.includes("?") ? v121.slice(v121.indexOf("?") + 1) : v121;
        const v125 = new Map();
        for (const v138 of v124.split(/[&;\n]/)) {
          const v139 = v138.indexOf("=");
          if (v139 <= 0) {
            continue;
          }
          const v140 = v31(v138.slice(0, v139)).trim().toLowerCase();
          const v141 = v31(v138.slice(v139 + 1)).trim();
          if (v140 && v141) {
            v125.set(v140, v141);
          }
        }
        const v126 = v32(v125, "v", "version", "ver");
        const v127 = v32(v125, "action", "mode");
        const v128 = v32(v125, "modelid", "model_id", "channel");
        const v129 = v32(v125, "ssid");
        const v130 = v32(v125, "pwd", "password");
        const v131 = v32(v125, "mac", "p2pmac", "p2p_mac");
        const v132 = v32(v125, "sn", "serial");
        v123.pairingVersionPresent = Boolean(v126);
        v123.connectionModePresent = Boolean(v127);
        v123.modelIdPresent = Boolean(v128);
        v123.networkNamePresent = Boolean(v129);
        v123.networkCredentialPresent = Boolean(v130);
        v123.deviceAddressPresent = Boolean(v131);
        v123.serialPresent = Boolean(v132);
        let v133 = v10.version;
        if (v126) {
          v133 = Number.parseInt(v126, 10);
          if (!Number.isFinite(v133)) {
            v119.push({
              code: "qr_version_invalid",
              message: v25("qr_version_invalid")
            });
          } else if (v133 !== v10.version) {
            v119.push({
              code: "qr_version_unsupported",
              message: v25("qr_version_unsupported")
            });
          }
        }
        if (v127 !== v10.mode) {
          v119.push({
            code: "connection_mode_unsupported",
            message: v25("connection_mode_unsupported")
          });
        }
        if (!v128 || !v129 || !v130 || v118 && !v131) {
          v119.push({
            code: "pairing_field_missing",
            message: v25("pairing_field_missing")
          });
        }
        if (v128 && !/^[A-Za-z0-9_.-]{1,64}$/.test(v128)) {
          v119.push({
            code: "model_id_invalid",
            message: v25("model_id_invalid")
          });
        }
        if (v129 && (v129.length > 32 || v129.includes("\0"))) {
          v119.push({
            code: "network_name_invalid",
            message: v25("network_name_invalid")
          });
        }
        if (v130 && (v130.length < 8 || v130.length > 63)) {
          v119.push({
            code: "network_credential_invalid",
            message: v25("network_credential_invalid")
          });
        }
        let v134 = "";
        if (v131) {
          const v142 = v131.replace(/-/g, ":").toUpperCase();
          if (/^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$/.test(v142)) {
            v134 = v142;
          } else {
            v119.push({
              code: "device_address_invalid",
              message: v25("device_address_invalid")
            });
          }
        }
        if (v132.length > 128) {
          v119.push({
            code: "serial_invalid",
            message: v25("serial_invalid")
          });
        }
        const v135 = new Set();
        const v136 = v119.filter(v143 => v135.has(v143.code) ? false : v135.add(v143.code));
        const v137 = v136.length ? null : {
          version: v133,
          mode: v127,
          modelId: v128,
          ssid: v129,
          password: v130,
          p2pMac: v134,
          serial: v132
        };
        return {
          ok: v136.length === 0,
          profile: v137,
          fields: v123,
          errors: v136
        };
      }
      function v36(v144) {
        if (!v144) {
          return [];
        }
        return [{
          key: "车型",
          value: v144.modelId || "—"
        }, {
          key: "车机网络",
          value: v144.ssid ? v28(v144.ssid, 3) : "—"
        }, {
          key: "车机地址",
          value: v29(v144.p2pMac)
        }, {
          key: "SN",
          value: v144.serial ? v28(v144.serial, 4) : "—"
        }];
      }
      function v37(v145) {
        if (v145 instanceof Uint8Array) {
          return v145;
        }
        if (v145 instanceof ArrayBuffer) {
          return new Uint8Array(v145);
        }
        if (ArrayBuffer.isView(v145)) {
          return new Uint8Array(v145.buffer, v145.byteOffset, v145.byteLength);
        }
        if (Array.isArray(v145)) {
          return Uint8Array.from(v145);
        }
        throw new TypeError("需要 Uint8Array / ArrayBuffer / number[]");
      }
      function v38(v146) {
        if (v146 == null) {
          return new Uint8Array(0);
        }
        if (typeof v146 === "string") {
          return new TextEncoder().encode(v146);
        }
        return v37(v146);
      }
      function v39({
        type: v147,
        code = 0,
        body: v148
      } = {}) {
        const v149 = v38(v148);
        const v150 = v7.controlHeader + v149.length;
        if (!Number.isInteger(v147)) {
          throw new TypeError("控制帧 type 必须是整数");
        }
        if (v150 > v7.controlMax) {
          throw new RangeError("控制帧过长");
        }
        const v151 = new Uint8Array(v150);
        const v152 = new DataView(v151.buffer);
        v152.setInt32(0, v147 | 0, true);
        v152.setUint32(4, v150, true);
        v152.setInt32(8, v150 ^ (v147 | 0) | 0, true);
        v152.setInt32(12, code | 0, true);
        v151.set(v149, v7.controlHeader);
        return v151;
      }
      function v40(v153) {
        const v154 = v37(v153);
        if (v154.length < v7.controlHeader) {
          throw new RangeError("Truncated frame header.");
        }
        const v155 = new DataView(v154.buffer, v154.byteOffset, v154.byteLength);
        const v156 = v155.getInt32(0, true);
        const v157 = v155.getUint32(4, true);
        const v158 = v155.getInt32(8, true);
        const v159 = v155.getInt32(12, true);
        if (v157 < v7.controlHeader || v157 > v7.controlMax) {
          throw new RangeError("Invalid control frame length.");
        }
        if ((v157 ^ v156 | 0) !== v158) {
          throw new Error("Invalid control frame checksum.");
        }
        const v160 = v154.length >= v157 ? v154.subarray(v7.controlHeader, v157) : null;
        return {
          type: v156,
          code: v159,
          length: v157,
          body: v160,
          bodyLength: v157 - v7.controlHeader
        };
      }
      function v41({
        command: v161,
        serial = 0,
        body: v162
      } = {}) {
        const v163 = v38(v162);
        if (!Number.isInteger(v161) || v161 < 0 || v161 > 65535) {
          throw new RangeError("Media command out of range.");
        }
        if (v163.length > v7.mediaBodyMax) {
          throw new RangeError("Media body is too large.");
        }
        const v164 = new Uint8Array(v7.mediaHeader + v163.length);
        const v165 = new DataView(v164.buffer);
        v165.setUint16(0, v161, true);
        v165.setUint16(2, v163.length, true);
        v165.setInt32(4, serial | 0, true);
        v164.set(v163, v7.mediaHeader);
        return v164;
      }
      function v42(v166) {
        const v167 = v37(v166);
        if (v167.length < v7.mediaHeader) {
          throw new RangeError("Truncated frame header.");
        }
        const v168 = new DataView(v167.buffer, v167.byteOffset, v167.byteLength);
        const v169 = v168.getUint16(0, true);
        const v170 = v168.getUint16(2, true);
        const v171 = v168.getInt32(4, true);
        const v172 = v167.length >= v7.mediaHeader + v170 ? v167.subarray(v7.mediaHeader, v7.mediaHeader + v170) : null;
        return {
          command: v169,
          serial: v171,
          length: v170,
          body: v172
        };
      }
      function v43(v173) {
        const v174 = v37(v173);
        if (v174.length < 30) {
          throw new RangeError("Capture configuration is too short.");
        }
        const v175 = new DataView(v174.buffer, v174.byteOffset, v174.byteLength);
        const v176 = v175.getUint16(0, true);
        const v177 = v175.getUint16(2, true);
        if (v176 < 16 || v177 < 16) {
          throw new RangeError("Invalid capture dimensions.");
        }
        return {
          width: v176,
          height: v177,
          fps: v175.getInt32(4, true),
          encoder: v175.getInt32(8, true) || 2,
          bitrate: v175.getInt32(20, true),
          extended: v174[29] !== 0,
          reserved: {
            r12: v175.getInt32(12, true),
            r16: v175.getInt32(16, true),
            r24: v175.getInt32(24, true),
            r28: v174[28]
          }
        };
      }
      function v44({
        width: v178,
        height: v179,
        fps = 30,
        encoder = 2,
        bitrate = 2097152,
        extended = false
      } = {}) {
        if (v178 < 16 || v179 < 16) {
          throw new RangeError("Invalid capture dimensions.");
        }
        const v180 = new Uint8Array(30);
        const v181 = new DataView(v180.buffer);
        v181.setUint16(0, v178, true);
        v181.setUint16(2, v179, true);
        v181.setInt32(4, fps, true);
        v181.setInt32(8, encoder, true);
        v181.setInt32(20, bitrate, true);
        v180[29] = extended ? 1 : 0;
        return v180;
      }
      function v45({
        codec = v15,
        width: v182,
        height: v183,
        extended = false
      } = {}) {
        const v184 = new Uint8Array(9);
        const v185 = new DataView(v184.buffer);
        v185.setInt32(0, codec | 0, true);
        v185.setUint16(4, v182, true);
        v185.setUint16(6, v183, true);
        v184[8] = extended ? 1 : 0;
        return v184;
      }
      function v46(v186) {
        const v187 = v37(v186);
        if (v187.length < 9) {
          throw new RangeError("Encoder reply is too short.");
        }
        const v188 = new DataView(v187.buffer, v187.byteOffset, v187.byteLength);
        return {
          codec: v188.getInt32(0, true),
          width: v188.getUint16(4, true),
          height: v188.getUint16(6, true),
          extended: v187[8] !== 0
        };
      }
      function v47({
        frame: v189,
        index = 0,
        extended = false
      } = {}) {
        const v190 = v189 == null ? new Uint8Array(0) : v37(v189);
        const v191 = Boolean(extended) && v190.length > 0;
        const v192 = v191 ? 8 : 4;
        const v193 = v190.length + (v191 ? 4 : 0);
        const v194 = new Uint8Array(v192 + v190.length);
        const v195 = new DataView(v194.buffer);
        v195.setInt32(0, v193, true);
        if (v191) {
          v195.setInt32(4, index | 0, true);
        }
        if (v190.length) {
          v194.set(v190, v192);
        }
        return v194;
      }
      function v48(v196, {
        extended = false
      } = {}) {
        const v197 = v37(v196);
        if (v197.length < 4) {
          throw new RangeError("Truncated frame packet.");
        }
        const v198 = new DataView(v197.buffer, v197.byteOffset, v197.byteLength);
        const v199 = v198.getInt32(0, true);
        if (v199 < 0 || v199 > 33554432) {
          throw new RangeError("Invalid frame length.");
        }
        if (v199 === 0) {
          return {
            length: 0,
            index: null,
            frame: new Uint8Array(0)
          };
        }
        if (!extended) {
          if (v197.length < 4 + v199) {
            throw new RangeError("Truncated frame body.");
          }
          return {
            length: v199,
            index: null,
            frame: v197.subarray(4, 4 + v199)
          };
        }
        const v200 = v199 - 4;
        if (v200 < 0 || v197.length < 4 + v199) {
          throw new RangeError("Truncated frame body.");
        }
        return {
          length: v199,
          index: v198.getInt32(4, true),
          frame: v197.subarray(8, 8 + v200)
        };
      }
      function v49(v201) {
        const v202 = v37(v201);
        const v203 = [];
        for (let v204 = 0; v204 + 3 < v202.length; v204 += 1) {
          if (v202[v204] === 0 && v202[v204 + 1] === 0) {
            if (v202[v204 + 2] === 1) {
              v203.push({
                start: v204,
                header: 3
              });
              v204 += 2;
            } else if (v204 + 4 < v202.length && v202[v204 + 2] === 0 && v202[v204 + 3] === 1) {
              v203.push({
                start: v204,
                header: 4
              });
              v204 += 3;
            }
          }
        }
        return v203.map(v205 => ({
          type: v202[v205.start + v205.header] & 31,
          start: v205.start,
          payloadStart: v205.start + v205.header
        }));
      }
      function v50(v206) {
        const v207 = new Set(v49(v206).map(v208 => v208.type));
        return v207.has(7) && v207.has(8);
      }
      function v51(v209) {
        return v49(v209).some(v210 => v210.type === 5);
      }
      function v52(v211) {
        return Math.max(16, v211 & -16);
      }
      function v53(v212, v213) {
        return Math.ceil(v212 / 16) * Math.ceil(v213 / 16);
      }
      function v54(v214, v215, v216) {
        const v217 = v53(v214, v215);
        const v218 = v217 * v216;
        const v219 = [{
          id: 1,
          name: "1.0",
          maxMacroblocks: 99,
          maxLoad: 1485
        }, {
          id: 4,
          name: "1.1",
          maxMacroblocks: 396,
          maxLoad: 3000
        }, {
          id: 8,
          name: "1.2",
          maxMacroblocks: 396,
          maxLoad: 6000
        }, {
          id: 16,
          name: "1.3",
          maxMacroblocks: 396,
          maxLoad: 11880
        }, {
          id: 64,
          name: "2.1",
          maxMacroblocks: 792,
          maxLoad: 19800
        }, {
          id: 128,
          name: "2.2",
          maxMacroblocks: 1620,
          maxLoad: 20250
        }, {
          id: 256,
          name: "3.0",
          maxMacroblocks: 1620,
          maxLoad: 40500
        }, {
          id: 512,
          name: "3.1",
          maxMacroblocks: 3600,
          maxLoad: 108000
        }, {
          id: 1024,
          name: "3.2",
          maxMacroblocks: 5120,
          maxLoad: 216000
        }, {
          id: 2048,
          name: "4.0",
          maxMacroblocks: 8192,
          maxLoad: 245760
        }, {
          id: 8192,
          name: "4.2",
          maxMacroblocks: 8704,
          maxLoad: 522240
        }, {
          id: 16384,
          name: "5.0",
          maxMacroblocks: 22080,
          maxLoad: 589824
        }, {
          id: 32768,
          name: "5.1",
          maxMacroblocks: 36864,
          maxLoad: 983040
        }, {
          id: 65536,
          name: "5.2",
          maxMacroblocks: 36864,
          maxLoad: 2073600
        }];
        for (const v220 of v219) {
          if (v217 <= v220.maxMacroblocks && v218 <= v220.maxLoad) {
            return v220;
          }
        }
        return v219[v219.length - 1];
      }
      function v55(v221) {
        if (v221 >= 256000 && v221 <= 8000000) {
          return Math.min(2097152, v221);
        } else {
          return 2097152;
        }
      }
      function v56(v222, {
        tier = "performance",
        chipset = "generic"
      } = {}) {
        const v223 = v52(Math.max(16, v222.width));
        const v224 = v52(Math.max(16, v222.height));
        const v225 = v222.encoder || v15;
        const v226 = v222.fps > 0 ? v222.fps : 30;
        const v227 = v222.bitrate > 0 ? v222.bitrate : 2097152;
        const v228 = Boolean(v222.extended);
        const v229 = {
          tier: tier,
          width: v223,
          height: v224,
          encoder: v225,
          codec: v225,
          extended: v228,
          profile: null
        };
        const v230 = {
          id: v16["3.1"],
          name: "3.1"
        };
        const v231 = {
          id: v16["3.0"],
          name: "3.0"
        };
        if (tier === "performance") {
          return {
            ...v229,
            fps: 30,
            bitrate: chipset === "s905l3ab" ? v55(v227) : 2621440,
            level: v230
          };
        }
        if (tier === "bitrate-safe") {
          return {
            ...v229,
            fps: 30,
            bitrate: v55(v227),
            level: v230
          };
        }
        if (tier === "compatibility") {
          const v235 = v226 >= 15 ? Math.min(24, v226) : 24;
          return {
            ...v229,
            fps: v235,
            bitrate: v55(v227),
            level: v54(v223, v224, v235),
            profile: "baseline"
          };
        }
        if (tier === "balanced") {
          return {
            ...v229,
            fps: 20,
            bitrate: 1572864,
            level: v230
          };
        }
        const v232 = Math.min(1, Math.min(800 / v223, 480 / v224));
        let v233 = v52(Math.max(16, Math.floor(v223 * v232)));
        let v234 = v52(Math.max(16, Math.floor(v224 * v232)));
        while (v53(v233, v234) > 1620 && v233 > 16 && v234 > 16) {
          if (v233 >= v234) {
            v233 -= 16;
          } else {
            v234 -= 16;
          }
        }
        return {
          ...v229,
          width: v233,
          height: v234,
          fps: tier === "resolution-safe" ? 20 : 15,
          bitrate: tier === "resolution-safe" ? 1572864 : 1048576,
          level: v231
        };
      }
      function v57(v236) {
        const v237 = v14.indexOf(v236);
        if (v237 < 0 || v237 + 1 >= v14.length) {
          return null;
        }
        return v14[v237 + 1];
      }
      function v58({
        tier: v238,
        retries = 0,
        elapsedMs = 0,
        sentFrames = 0,
        stopped = false
      } = {}) {
        if (stopped) {
          return false;
        }
        if (!v57(v238)) {
          return false;
        }
        if (retries >= v12) {
          return false;
        }
        return elapsedMs >= 0 && elapsedMs < v13.elapsedMs && sentFrames > 0;
      }
      function v59({
        elapsedMs = 0,
        sentFrames = 0,
        stopped = false
      } = {}) {
        if (stopped) {
          return false;
        }
        return elapsedMs >= v13.elapsedMs && sentFrames >= v13.sentFrames;
      }
      function v60(v239) {
        const v240 = Number(v239) || 0;
        if (v240 < 1024) {
          return v240 + " B";
        }
        if (v240 < 1048576) {
          return (v240 / 1024).toFixed(1) + " KB";
        }
        if (v240 < 1073741824) {
          return (v240 / 1024 / 1024).toFixed(1) + " MB";
        }
        return (v240 / 1024 / 1024 / 1024).toFixed(2) + " GB";
      }
      function v61(v241) {
        const v242 = Math.max(0, Math.round((Number(v241) || 0) / 1000));
        const v243 = Math.floor(v242 / 60);
        const v244 = v242 % 60;
        if (!v243) {
          return v244 + "s";
        }
        return v243 + "m" + String(v244).padStart(2, "0") + "s";
      }
      function v62(v245, v246 = 2000) {
        if (!Array.isArray(v245) || v245.length < 2) {
          return 0;
        }
        const v247 = v245[v245.length - 1];
        const v248 = Math.max(v245[0], v247 - v246);
        const v249 = v245.filter(v251 => v251 >= v248).length;
        const v250 = v247 - v248;
        if (v250 <= 0) {
          return 0;
        }
        return Math.round((v249 - 1) * 1000 * 10 / v250) / 10;
      }
      const v63 = "ZeehoCast";
      const v64 = "__zeehoCastEvent";
      const v65 = "zeeho-cast-event";
      function v66(v252) {
        const v253 = v252 || (typeof globalThis !== "undefined" ? globalThis : null);
        if (!v253 || v253.PLATFORM?.preview?.() === true) {
          return null;
        }
        const v254 = v253.NativeShell?.readZeehoCast?.() || v253[v63];
        if (!v254 || typeof v254 !== "object") {
          return null;
        }
        return v254;
      }
      function v67(v255) {
        if (v255 == null) {
          return {};
        }
        if (typeof v255 === "object") {
          return v255;
        }
        try {
          return JSON.parse(String(v255));
        } catch {
          return {
            ok: false,
            error: "bridge_bad_json",
            raw: String(v255)
          };
        }
      }
      function v68({
        bridge = null,
        now = () => Date.now(),
        emit = null
      } = {}) {
        const v256 = {
          phase: bridge ? v17.idle : v17.unavailable,
          reason: bridge ? "" : "native_bridge_missing",
          profile: null,
          savedProfile: null,
          sessionActive: false,
          projectionReady: false,
          projectionPending: false,
          startedAt: 0,
          casting: false,
          vehicleConnected: false,
          wifiConnected: false,
          environmentError: null,
          tier: "performance",
          retries: 0,
          stats: {
            sentFrames: 0,
            sentBytes: 0,
            keyframes: 0,
            fps: 0,
            emptyPulls: 0
          },
          encoder: null,
          p2p: null,
          diagnostics: []
        };
        const v257 = new Set();
        function v258(v276, v277) {
          const v278 = {
            type: v276,
            at: now(),
            payload: v277 == null ? {} : v277
          };
          v256.diagnostics.push({
            type: v276,
            at: v278.at,
            payload: v30(v278.payload)
          });
          if (v256.diagnostics.length > 200) {
            v256.diagnostics.splice(0, v256.diagnostics.length - 200);
          }
          if (typeof emit === "function") {
            try {
              emit(v278);
            } catch {}
          }
          for (const v279 of v257) {
            try {
              v279(v278);
            } catch {}
          }
        }
        function v259(v280) {
          return v19(v256.phase, v280);
        }
        function v260(v281, v282) {
          if (!v281 || v281 === v256.phase) {
            if (v282 !== undefined) {
              v256.reason = v282 || "";
            }
            return v256.phase;
          }
          if (!v259(v281)) {
            v258("phase-rejected", {
              from: v256.phase,
              to: v281,
              reason: v282 || ""
            });
            return v256.phase;
          }
          const v283 = v256.phase;
          const v284 = v18[v283];
          const v285 = v18[v281];
          if (v284 != null && v285 != null && v285 > v284 + 1) {
            v258("phase-jump", {
              from: v283,
              to: v281,
              skipped: v285 - v284 - 1
            });
          }
          v256.phase = v281;
          v256.reason = v282 || "";
          if (v281 === v17.casting) {
            v256.startedAt = now();
            v256.casting = true;
          }
          if (v281 === v17.idle || v281 === v17.failed) {
            v256.casting = false;
            if (v281 === v17.idle) {
              v256.startedAt = 0;
            }
          }
          v258("phase", {
            from: v283,
            to: v281,
            reason: v256.reason
          });
          return v281;
        }
        const v261 = (v286, v287) => v286 && typeof v286.then === "function" ? v286.then(v287) : v287(v286);
        let v262 = 0;
        let v263 = null;
        function v264(v288, v289) {
          if (!bridge) {
            return {
              ok: false,
              error: "native_bridge_missing"
            };
          }
          const v290 = bridge[v288];
          if (typeof v290 !== "function") {
            return {
              ok: false,
              error: "bridge_method_missing",
              method: v288
            };
          }
          const v291 = v293 => {
            const v294 = v67(v293);
            if (!v294 || typeof v294 !== "object" || v294.pending === true || v294.queued === true || v294.submitted === true) {
              return {
                ok: false,
                error: "bridge_pending",
                detail: v294
              };
            }
            if (v294.ok === false || v294.accepted === false) {
              return {
                ok: false,
                error: v294.error || "bridge_error",
                detail: v294
              };
            }
            return {
              ok: true,
              data: v294
            };
          };
          const v292 = v295 => {
            const v296 = String(v295?.code || v295?.error || v295?.cause?.code || "").trim();
            if (/^[a-z][a-z0-9_]{0,79}$/.test(v296)) {
              return {
                ok: false,
                error: v296
              };
            }
            return {
              ok: false,
              error: "bridge_timeout"
            };
          };
          try {
            const v297 = v289 === undefined ? v290.call(bridge) : v290.call(bridge, v289);
            if (v297 && typeof v297.then === "function") {
              return v297.then(v291).catch(v292);
            } else {
              return v291(v297);
            }
          } catch (v298) {
            return v292(v298);
          }
        }
        function v265(v299) {
          v256.profile = v299 || null;
          v258("profile", {
            profile: v299 ? {
              modelId: v299.modelId,
              p2pMac: v299.p2pMac
            } : null
          });
          return v256.profile;
        }
        function v266(v300) {
          const v301 = typeof v300 === "string" ? v33(v300) : {
            ok: Boolean(v300),
            profile: v300 || null,
            errors: []
          };
          if (!v301.ok || !v301.profile) {
            const v303 = v301.errors && v301.errors[0];
            const v304 = v303 ? v303.code : "qr_invalid";
            v260(v17.failed, v304);
            return {
              ok: false,
              error: v304,
              message: v25(v304)
            };
          }
          const v302 = v262;
          return v261(v264("pair", JSON.stringify(v301.profile)), v305 => {
            if (v302 !== v262) {
              return {
                ok: false,
                error: "stale_session"
              };
            }
            if (!v305.ok) {
              return v305;
            }
            v256.profile = v301.profile;
            v256.savedProfile = v305.data?.profile || null;
            v258("paired", {
              modelId: v301.profile.modelId,
              p2pMac: v301.profile.p2pMac
            });
            return {
              ok: true,
              profile: v301.profile
            };
          });
        }
        function v267(v306 = {}) {
          if (!bridge) {
            v256.phase = v17.unavailable;
            v256.reason = "native_bridge_missing";
            return {
              ok: false,
              error: "native_bridge_missing",
              message: v25("native_bridge_missing")
            };
          }
          const v307 = v262;
          return v261(v271(), () => {
            if (v307 !== v262) {
              return {
                ok: false,
                error: "stale_session"
              };
            }
            if (v256.sessionActive || ["provisioning", "handshaking", "ready", "casting", "adapting", "stopping"].includes(v256.phase)) {
              return {
                ok: false,
                error: "session_active",
                message: v25("session_active")
              };
            }
            if (!v256.profile && !v256.savedProfile && !v256.wifiConnected) {
              return {
                ok: false,
                error: "qr_invalid",
                message: "还没有可用的投屏二维码"
              };
            }
            v256.retries = 0;
            const v308 = {
              ...v306,
              frameFormat: v306.frameFormat === "extended" ? "extended" : "traditional"
            };
            if (v14.includes(v306.tier)) {
              v308.tier = v306.tier;
            } else {
              delete v308.tier;
            }
            if (v256.profile) {
              v308.profile = v256.profile;
            } else {
              delete v308.profile;
            }
            return v261(v264("start", JSON.stringify(v308)), v309 => {
              if (v307 !== v262) {
                return {
                  ok: false,
                  error: "stale_session"
                };
              }
              if (!v309.ok) {
                v271();
                return v309;
              }
              v272(v309.data);
              return {
                ok: true,
                data: v309.data
              };
            });
          });
        }
        function v268() {
          if (!bridge) {
            return {
              ok: true,
              skipped: true
            };
          }
          v262++;
          return v261(v264("stop"), v310 => {
            if (v310.ok) {
              v256.projectionPending = false;
              v272(v310.data);
            }
            return v261(v271(), () => {
              if (!v310.ok) {
                v258("stop-error", {
                  error: v310.error
                });
              }
              return v310;
            });
          });
        }
        function v269() {
          if (!bridge) {
            v265(null);
            v256.savedProfile = null;
            return {
              ok: true,
              local: true
            };
          }
          const v311 = ++v262;
          return v261(v264("forgetProfile"), v312 => {
            if (v311 !== v262) {
              return {
                ok: false,
                error: "stale_session"
              };
            }
            if (v312.ok) {
              v265(null);
              v256.savedProfile = null;
              v272(v312.data);
            }
            return v261(v271(), () => v312);
          });
        }
        function v270() {
          if (!bridge) {
            return {
              ok: false,
              error: "native_bridge_missing"
            };
          }
          const v313 = v262;
          return v261(v264("requestProjection"), v314 => {
            if (v313 !== v262) {
              return {
                ok: false,
                error: "stale_session"
              };
            }
            if (v314.ok) {
              v272(v314.data);
              v256.projectionPending = v314.data.projectionReady !== true && (v314.data.projectionPending === true || v314.data.requested === true);
            }
            v258("projection", {
              ok: v314.ok,
              error: v314.error || ""
            });
            return v314;
          });
        }
        function v271() {
          if (!bridge) {
            return null;
          }
          if (v263) {
            return v263;
          }
          const v315 = v262;
          const v316 = v261(v264("getStatus"), v317 => {
            if (v315 !== v262) {
              return null;
            }
            if (!v317.ok) {
              v256.vehicleConnected = false;
              v256.wifiConnected = false;
              v256.casting = false;
              v256.environmentError = v317.error || "bridge_error";
              return null;
            }
            v272(v317.data);
            return v317.data;
          });
          if (v316 && typeof v316.then === "function") {
            v263 = v316.finally(() => {
              v263 = null;
            });
            return v263;
          }
          return v316;
        }
        function v272(v318) {
          const v319 = v67(v318);
          if (!v319 || typeof v319 !== "object") {
            return v256;
          }
          if (typeof v319.sessionActive === "boolean") {
            v256.sessionActive = v319.sessionActive;
          } else if (v319.phase) {
            v256.sessionActive = ["provisioning", "handshaking", "ready", "casting", "adapting", "stopping"].includes(v21(v319.phase));
          }
          if (typeof v319.projectionReady === "boolean") {
            v256.projectionReady = v319.projectionReady;
          }
          if (typeof v319.projectionPending === "boolean") {
            v256.projectionPending = v319.projectionPending;
          }
          if (typeof v319.wifiConnected === "boolean") {
            v256.wifiConnected = v319.wifiConnected;
          }
          if ("environmentError" in v319) {
            v256.environmentError = v319.environmentError || null;
          }
          if (v319.projectionReady === true) {
            v256.projectionPending = false;
          }
          if ("savedProfile" in v319) {
            v256.savedProfile = v319.savedProfile || null;
          }
          if (v319.phase) {
            const v320 = v21(v319.phase);
            if (v320 && v320 !== v256.phase && bridge) {
              const v321 = v256.phase;
              v256.phase = v320;
              v256.reason = v319.reason || "";
              if (v320 === "casting" && !v256.startedAt) {
                v256.startedAt = now();
              }
              if (v320 === "idle") {
                v256.startedAt = 0;
              }
              v256.casting = typeof v319.casting === "boolean" ? v319.casting : v320 === "casting";
              v258("phase", {
                from: v321,
                to: v320,
                reason: v256.reason
              });
            } else if (v320) {
              v260(v320, v319.reason);
            } else {
              v258("phase-unknown", {
                phase: String(v319.phase)
              });
            }
          }
          if (typeof v319.vehicleConnected === "boolean") {
            v256.vehicleConnected = v319.vehicleConnected;
          }
          if (v319.captureSource) {
            v256.captureSource = v319.captureSource;
          }
          if (v319.frameFormat) {
            v256.frameFormat = v319.frameFormat;
          }
          if (v319.compatibilityTier) {
            v256.tier = v319.compatibilityTier;
          }
          if (Number.isFinite(Number(v319.compatibilityRetryCount))) {
            v256.retries = Number(v319.compatibilityRetryCount);
          }
          if (v319.encoder) {
            v256.encoder = v319.encoder;
          }
          if (v319.p2p) {
            v256.p2p = v319.p2p;
          }
          if (v319.stats) {
            v256.stats = {
              sentFrames: Number(v319.stats.sentFrames) || 0,
              sentBytes: Number(v319.stats.sentBytes) || 0,
              keyframes: Number(v319.stats.keyframes) || 0,
              fps: Number(v319.stats.fps) || 0,
              emptyPulls: Number(v319.stats.emptyPulls) || 0
            };
          }
          if (typeof v319.casting === "boolean") {
            v256.casting = v319.casting;
          }
          return v256;
        }
        function v273(v322) {
          const v323 = v67(v322);
          if (!v323 || typeof v323 !== "object") {
            return v256;
          }
          const v324 = v323.type || v323.event || "status";
          if (v324 === "status" || v324 === "phase") {
            v272(v323.status || v323);
            v258("status", {
              phase: v256.phase,
              projectionReady: v256.projectionReady,
              projectionPending: v256.projectionPending,
              sessionActive: v256.sessionActive
            });
          } else if (v324 === "diagnostic") {
            v258("diagnostic", v323.payload || v323);
          } else if (v324 === "error") {
            v260(v17.failed, v323.error || v323.reason || "bridge_error");
            v258("error", v323);
          } else {
            v258(v324, v323.payload || v323);
          }
          if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof CustomEvent !== "undefined") {
            try {
              window.dispatchEvent(new CustomEvent(v65, {
                detail: v323
              }));
            } catch {}
          }
          return v256;
        }
        function v274(v325) {
          if (typeof v325 !== "function") {
            return () => {};
          }
          v257.add(v325);
          return () => v257.delete(v325);
        }
        function v275(v326 = 50) {
          const v327 = v256.diagnostics.slice(-v326);
          return v261(v264("getDiagnostics", String(v326)), v328 => ({
            local: v327,
            remote: v328.ok ? v328.data : [],
            bridgeAvailable: Boolean(bridge)
          }));
        }
        return {
          state: v256,
          get phase() {
            return v256.phase;
          },
          setProfile: v265,
          start: v267,
          stop: v268,
          pair: v266,
          forgetProfile: v269,
          requestProjection: v270,
          refresh: v271,
          applyStatus: v272,
          handleEvent: v273,
          subscribe: v274,
          getDiagnostics: v275,
          isAvailable: () => Boolean(bridge)
        };
      }
      function v69(v329, v330) {
        const v331 = v330 || (typeof window !== "undefined" ? window : null);
        if (!v331 || !v329) {
          return false;
        }
        v331[v64] = v332 => v329.handleEvent(v332);
        return true;
      }
      function v70() {
        const v333 = {
          width: 1024,
          height: 600,
          fps: 30,
          encoder: 2,
          bitrate: 2097152,
          extended: true
        };
        const v334 = v44(v333);
        const v335 = v43(v334);
        const v336 = v56(v335, {
          tier: "compatibility"
        });
        const v337 = v45({
          width: v336.width,
          height: v336.height,
          extended: v336.extended
        });
        const v338 = v39({
          type: v4.clientInfoRequest,
          body: "{\"HUID\":\"x\"}"
        });
        const v339 = v41({
          command: v6.configure,
          serial: 7,
          body: v334
        });
        return {
          ok: v46(v337).width === v336.width && v40(v338).type === v4.clientInfoRequest && v42(v339).command === v6.configure,
          plan: v336,
          ports: v2
        };
      }
      return {
        canCastTransition: v19,
        normalizeCastPhase: v21,
        nativeReason: v23,
        vehicleWifiErrorText: v24,
        showIOSWifiGuide: v26,
        castErrorText: v25,
        maskSecret: v28,
        maskP2pMac: v29,
        redactDiagnostic: v30,
        parsePairingPayload: v33,
        parseWallpaperPairing: v34,
        summarizePairing: v36,
        encodeControlFrame: v39,
        decodeControlFrame: v40,
        encodeMediaFrame: v41,
        decodeMediaFrame: v42,
        parseCaptureConfig: v43,
        buildCaptureConfig: v44,
        buildEncoderReply: v45,
        parseEncoderReply: v46,
        encodeFramePacket: v47,
        decodeFramePacket: v48,
        splitAnnexB: v49,
        hasParameterSets: v50,
        isKeyframe: v51,
        pickAvcLevel: v54,
        planCapture: v56,
        nextTier: v57,
        shouldDowngrade: v58,
        shouldLearnTier: v59,
        formatCastBytes: v60,
        formatCastDuration: v61,
        estimateFps: v62,
        detectCastBridge: v66,
        createCastClient: v68,
        installCastEventSink: v69,
        castSelfTest: v70,
        CAST_PORTS: v2,
        CAST_FALLBACK_HOST: v3,
        CAST_CONTROL_IDS: v4,
        CAST_STATUS_PROBE: v5,
        CAST_MEDIA_CMDS: v6,
        CAST_LIMITS: v7,
        CAST_HEARTBEAT_REPLY: v8,
        CAST_VIEW_CONFIG_REPLY: v9,
        CAST_PAIRING_SCHEMA: v10,
        CAST_DEFAULT_CAPTURE: v11,
        CAST_MAX_RETRIES: v12,
        CAST_LEARN_THRESHOLD: v13,
        CAST_TIERS: v14,
        CAST_AVC_CODEC: v15,
        CAST_LEVEL_IDS: v16,
        CAST_PHASES: v17,
        CAST_PHASE_RANK: v18,
        CAST_PHASE_ALIASES: v20,
        CAST_ERROR_TEXT: v22,
        CAST_BRIDGE_GLOBAL: v63,
        CAST_EVENT_SINK: v64,
        CAST_EVENT_NAME: v65
      };
    })();
  });
  (v340 => {
    if (window.LAZY_FEATURE) {
      window.LAZY_FEATURE.register(window, "MEDIA", v340);
    } else {
      v340();
    }
  })(() => {
    window.MEDIA = (() => {
      'use strict';

      function v341(v411) {
        if (v411 == null) {
          return "";
        }
        if (typeof v411 === "string") {
          return v411.trim();
        }
        if (typeof v411 === "number") {
          if (Number.isFinite(v411)) {
            return String(v411);
          } else {
            return "";
          }
        }
        if (typeof v411 === "boolean") {
          return String(v411);
        }
        return "";
      }
      function v342(v412) {
        if (v412 == null) {
          return null;
        }
        if (typeof v412 === "number") {
          if (Number.isFinite(v412)) {
            return v412;
          } else {
            return null;
          }
        }
        if (typeof v412 !== "string") {
          return null;
        }
        const v413 = v412.replace(/[^\d.+-]/g, "");
        if (!v413) {
          return null;
        }
        const v414 = Number(v413);
        if (Number.isFinite(v414)) {
          return v414;
        } else {
          return null;
        }
      }
      function v343(v415) {
        const v416 = v342(v415);
        if (v416 == null) {
          return 0;
        }
        return Math.min(100, Math.max(0, Math.round(v416 * 10) / 10));
      }
      function v344(v417, v418, v419) {
        const v420 = v342(v417);
        if (v420 == null) {
          if (v418 <= 0 && v419 >= 0) {
            return 0;
          } else {
            return v418;
          }
        }
        return Math.min(v419, Math.max(v418, v420));
      }
      const v345 = new Set(["1", "true", "yes", "y", "on", "use", "using", "used", "enable", "enabled"]);
      function v346(v421) {
        if (v421 === true) {
          return true;
        }
        if (v421 === false || v421 == null) {
          return false;
        }
        if (typeof v421 === "number") {
          return v421 === 1;
        }
        return v345.has(v341(v421).toLowerCase());
      }
      function v347(v422) {
        if (v422 === true || v422 === false) {
          return v422;
        }
        if (typeof v422 === "number") {
          if (v422 === 1) {
            return true;
          }
          if (v422 === 0) {
            return false;
          }
          return null;
        }
        if (typeof v422 === "string") {
          const v423 = v422.trim().toLowerCase();
          if (["true", "1", "y", "yes", "on"].includes(v423)) {
            return true;
          }
          if (["false", "0", "n", "no", "off"].includes(v423)) {
            return false;
          }
        }
        return null;
      }
      function v348(v424) {
        if (!v424 || typeof v424 !== "object") {
          return {};
        }
        const v425 = v424.data;
        if (v425 && typeof v425 === "object") {
          return v425;
        }
        return v424;
      }
      function v349(v426) {
        const v427 = v341(v426);
        if (!v427) {
          return "";
        }
        const v428 = v427.split(/[?#]/)[0];
        const v429 = v428.split("/").filter(Boolean);
        if (v429.length) {
          return v429[v429.length - 1];
        } else {
          return v428;
        }
      }
      function v350(v430) {
        const v431 = v341(v430);
        if (!v431) {
          return "";
        }
        return v431.split(/[?#]/)[0];
      }
      function v351(v432) {
        if (v432 == null) {
          return null;
        }
        if (typeof v432 === "object") {
          return v432;
        }
        if (typeof v432 !== "string") {
          return null;
        }
        const v433 = v432.trim();
        if (!v433) {
          return null;
        }
        try {
          return JSON.parse(v433);
        } catch {
          return null;
        }
      }
      function v352(v434) {
        let v435 = v351(v434);
        for (let v436 = 0; v436 < 3 && typeof v435 === "string"; v436 += 1) {
          v435 = v351(v435);
        }
        return v435;
      }
      const v353 = /\.(?:png|jpe?g|webp|gif|bmp|avif)(?:[?#]|$)/i;
      const v354 = /(thumb|small|mini|preview|low|compress|cover|blur)/i;
      const v355 = ["imageurl", "imgurl", "picurl", "wallpaperurl", "image", "img", "pic", "src", "fileurl", "originurl", "bigurl", "url"];
      const v356 = ["width", "imagewidth", "wallpaperwidth", "resolutionwidth", "imgwidth", "picwidth", "w"];
      const v357 = ["height", "imageheight", "wallpaperheight", "resolutionheight", "imgheight", "picheight", "h"];
      const v358 = ["resolution", "wallpaperresolution", "imageresolution", "pixels", "displayresolution"];
      function v359(v437) {
        const v438 = v341(v437);
        if (!v438) {
          return false;
        }
        if (/^data:image\//i.test(v438)) {
          return true;
        }
        if (!/^(?:https?:)?\/\//i.test(v438) && !v438.startsWith("/") && !/^images?\//i.test(v438)) {
          return false;
        }
        return v353.test(v438) || /(?:oss|aliyuncs|image|img|pic|cdn|wallpaper)/i.test(v438);
      }
      function v360(v439, v440, v441 = 0) {
        if (v439 == null || v441 > 8) {
          return v440;
        }
        if (Array.isArray(v439)) {
          for (const v442 of v439) {
            v360(v442, v440, v441 + 1);
          }
          return v440;
        }
        if (typeof v439 !== "object") {
          return v440;
        }
        for (const [v443, v444] of Object.entries(v439)) {
          if (v444 == null) {
            continue;
          }
          if (typeof v444 === "string" || typeof v444 === "number") {
            const v445 = v341(v444);
            if (v445) {
              v440.push({
                key: v443,
                value: v445
              });
            }
          } else if (typeof v444 === "object") {
            v360(v444, v440, v441 + 1);
          }
        }
        return v440;
      }
      function v361(v446) {
        const v447 = [];
        const v448 = v446 && typeof v446 === "object" ? v446 : {};
        for (const [v450, v451] of Object.entries(v448)) {
          if (v450 === "wallpaperContent" || v450 === "raw") {
            continue;
          }
          if (typeof v451 === "string" || typeof v451 === "number") {
            const v452 = v341(v451);
            if (v452) {
              v447.push({
                key: v450,
                value: v452
              });
            }
          }
        }
        const v449 = v352(v448.wallpaperContent);
        if (v449 && typeof v449 === "object") {
          v360(v449, v447);
        } else if (typeof v448.wallpaperContent === "string" && v359(v448.wallpaperContent)) {
          v447.push({
            key: "wallpaperContent",
            value: v448.wallpaperContent.trim()
          });
        }
        return v447;
      }
      function v362(v453) {
        const v454 = v453.key.toLowerCase();
        const v455 = v355.indexOf(v454);
        if (v455 === -1) {
          return v355.length;
        } else {
          return v455;
        }
      }
      function v363(v456) {
        const v457 = v456.filter(v462 => v359(v462.value));
        if (!v457.length) {
          return {
            imageUrl: "",
            thumbUrl: ""
          };
        }
        const v458 = [...v457].sort((v463, v464) => v362(v463) - v362(v464));
        const v459 = v458.find(v465 => v354.test(v465.key));
        const v460 = v458.find(v466 => !v354.test(v466.key)) || v458[0];
        const v461 = v460?.value || "";
        return {
          imageUrl: v461,
          thumbUrl: v459?.value || v461
        };
      }
      function v364(v467, v468 = null) {
        const v469 = v481 => {
          if (v468) {
            v468.reason = v481;
          }
          return null;
        };
        const v470 = v467?.raw && typeof v467.raw === "object" ? v467.raw : v467;
        if (!v470 || typeof v470 !== "object") {
          return v469("未读取到壁纸详情");
        }
        const v471 = v470.wallpaperContentZip;
        let v472 = v471;
        if (typeof v472 === "string") {
          v472 = v352(v472) || v472;
        }
        if (Array.isArray(v472)) {
          if (v472.length !== 1) {
            return v469("壁纸详情包含多个或空的原始包");
          }
          v472 = v472[0];
        }
        if (typeof v472 === "string") {
          v472 = {
            url: v472
          };
        }
        if (!v472 || typeof v472 !== "object") {
          if (v471 != null) {
            return v469("原始壁纸包格式无法识别");
          }
          v472 = v470;
        }
        const v473 = v482 => typeof v482 === "string" || typeof v482 === "number" && Number.isFinite(v482) ? String(v482).trim() : "";
        const v474 = v473(v472.wallpaperNum ?? v470.wallpaperNum ?? v470.wallpaperNo);
        const v475 = v473(v472.displayWallpaperSet ?? v470.displayWallpaperSet);
        if (!v474) {
          return v469("壁纸详情缺少车机壁纸编号，请刷新详情后重试");
        }
        if (!v475) {
          return v469("壁纸详情缺少车机显示设置，请刷新详情后重试");
        }
        const v476 = v341(v472.url ?? v472.fileUrl);
        if (v476) {
          try {
            const v483 = new URL(v476);
            const v484 = ["oss-cfmoto-private.zeehoev.com", "zeeho-user.oss-cn-hangzhou.aliyuncs.com"];
            if (v483.protocol !== "https:" || !v484.includes(v483.hostname) || v483.username || v483.password || v483.port && v483.port !== "443" || !v483.pathname.toLowerCase().endsWith(".zip") || v483.hash) {
              return v469("壁纸包下载地址不受支持，请更新 App 或选择官方原始 ZIP");
            }
          } catch {
            return v469("壁纸包下载地址格式错误");
          }
        }
        const v477 = v341(v472.fileName);
        if (v477 && (!/^[^/\\\u0000-\u001f\u007f]+\.zip$/i.test(v477) || v477 === ".zip")) {
          return v469("壁纸包文件名无效");
        }
        const v478 = v472.fileSize;
        const v479 = typeof v478 === "number" ? v478 : typeof v478 === "string" && /^\d+$/.test(v478) ? Number(v478) : null;
        if (v478 != null && (!Number.isSafeInteger(v479) || v479 <= 0 || v479 > 16777216)) {
          return v469("壁纸包大小无效或超过 16 MB");
        }
        const v480 = v341(v472.md5);
        if (v480 && !/^[a-f0-9]{32}$/i.test(v480)) {
          return v469("壁纸包校验值格式错误");
        }
        return {
          url: v476,
          fileName: v477,
          wallpaperNum: v474,
          displayWallpaperSet: v475,
          ...(v479 > 0 ? {
            fileSize: v479
          } : {}),
          ...(v480 ? {
            md5: v480
          } : {})
        };
      }
      function v365(v485) {
        const v486 = v489 => {
          for (const v490 of v489) {
            const v491 = v485.find(v493 => v493.key.toLowerCase() === v490);
            const v492 = v342(v491?.value);
            if (v492 != null && v492 > 0) {
              return v492;
            }
          }
          return null;
        };
        const v487 = v486(v356);
        const v488 = v486(v357);
        if (v487 && v488) {
          return {
            width: v487,
            height: v488
          };
        }
        for (const v494 of v485) {
          if (!v358.includes(v494.key.toLowerCase())) {
            continue;
          }
          const v495 = v494.value.match(/^(\d+)\s*[x*×]\s*(\d+)$/i);
          if (!v495) {
            continue;
          }
          const v496 = v342(v495[1]);
          const v497 = v342(v495[2]);
          if (v496 && v497) {
            return {
              width: v496,
              height: v497
            };
          }
        }
        return null;
      }
      function v366(v498, v499) {
        const v500 = v367(v498, ["mmiSubjectConfigId", "subjectConfigId", "configId", "themeId", "subjectId"]);
        if (v500) {
          return v500;
        }
        const v501 = ["mmisubjectconfigid", "subjectconfigid", "configid", "themeid", "subjectid"];
        const v502 = v499.find(v503 => v501.includes(v503.key.toLowerCase()));
        return v502?.value || "";
      }
      function v367(v504, v505) {
        for (const v506 of v505) {
          const v507 = v341(v504?.[v506]);
          if (v507) {
            return v507;
          }
        }
        return "";
      }
      const v368 = 1;
      const v369 = 2;
      function v370(v508) {
        const v509 = v342(v508?.state ?? v508?.auditState ?? v508?.reviewState ?? v508?.status);
        if (v509 === v368) {
          return "approved";
        }
        if (v509 === v369) {
          return "rejected";
        }
        return "unknown";
      }
      function v371(v510) {
        if (!v510 || typeof v510 !== "object" || Array.isArray(v510)) {
          return null;
        }
        const v511 = v361(v510);
        const v512 = v377(v510);
        const v513 = v375(v510, v511, v512);
        const v514 = v365(v511);
        const v515 = v341(v510.id ?? v510.wallpaperId ?? v510.wallpaperID);
        const v516 = v341(v510.wallpaperName ?? v510.name ?? v510.title);
        const v517 = v366(v510, v511);
        if (!v515 && !v516 && !v513.imageUrl) {
          return null;
        }
        const v518 = v370(v510);
        return {
          id: v515,
          name: v516,
          inUse: v346(v510.useState ?? v510.isUse ?? v510.using),
          configId: v517,
          imageUrl: v513.imageUrl,
          thumbUrl: v513.thumbUrl,
          resolution: v514,
          raw: v510,
          audit: v518,
          rejected: v518 === "rejected",
          rejectReason: v341(v510.reason ?? v510.rejectReason ?? v510.auditReason),
          usable: Boolean(v515) && Boolean(v513.imageUrl || v513.thumbUrl)
        };
      }
      function v372(v519) {
        const v520 = v348(v519);
        const v521 = Array.isArray(v520) ? v520 : v402(v520);
        const v522 = v521.map(v371).filter(Boolean);
        const v523 = v342(v520?.total) ?? v522.length;
        const v524 = v342(v520?.pageNum ?? v520?.page) ?? 1;
        const v525 = v342(v520?.pageSize ?? v520?.size) ?? v522.length;
        return {
          total: v523,
          pageNum: v524,
          pageSize: v525,
          hasMore: v524 * v525 < v523,
          list: v522
        };
      }
      function v373(v526) {
        const v527 = v348(v526);
        const v528 = v527?.wallpaper ?? v527?.detail ?? v527;
        return v371(v528);
      }
      function v374(v529) {
        const v530 = v348(v529);
        const v531 = v352(v530?.subjectWallpaperConfig);
        const v532 = Array.isArray(v531) ? v531.map((v533, v534) => {
          if (!v533 || typeof v533 !== "object") {
            return null;
          }
          return {
            name: v341(v533.name ?? v533.subjectName ?? v533.title ?? v533.wallpaperName) || "内置壁纸 " + (v534 + 1),
            type: v341(v533.type ?? v533.subjectType),
            url: v341(v533.url ?? v533.imageUrl ?? v533.picUrl ?? v533.wallpaperUrl),
            subjectUrl: v341(v533.subjectUrl ?? v533.subjectLink ?? v533.jumpUrl ?? v533.link)
          };
        }).filter(Boolean) : [];
        return {
          supported: v530?.supportCustomWallpaper == null ? null : v346(v530.supportCustomWallpaper),
          vehicleType: v341(v530?.vehicleType),
          vin: v341(v530?.vinNo),
          width: v342(v530?.wallpaperResolutionWidth),
          height: v342(v530?.wallpaperResolutionHeight),
          builtin: v532,
          theme: {
            shop: v341(v530?.themeShopFlag),
            fresh: v341(v530?.themeShopNewFlag),
            rgb: v341(v530?.appThemeRgb),
            chargeRgb: v341(v530?.appChargeRgb)
          }
        };
      }
      function v375(v535, v536, v537 = v377(v535)) {
        if (!v537.items.length) {
          return v363(v536);
        }
        const v538 = v361({
          ...v535,
          wallpaperContent: null,
          content: null,
          wallpaperContentJson: null
        });
        const v539 = v538.find(v541 => v354.test(v541.key) && v359(v541.value));
        const v540 = v537.main?.url || v363(v538).imageUrl;
        return {
          imageUrl: v540,
          thumbUrl: v539?.value || v540
        };
      }
      function v376(v542) {
        if (!v542 || typeof v542 !== "object") {
          return {
            imageUrl: "",
            thumbUrl: ""
          };
        }
        const v543 = v542.raw && typeof v542.raw === "object" ? v542.raw : v542;
        const v544 = v375(v543, v361(v543));
        const v545 = v544.imageUrl || v341(v542.imageUrl);
        const v546 = v544.thumbUrl || v544.imageUrl || v341(v542.thumbUrl) || v545;
        return {
          imageUrl: v545,
          thumbUrl: v546
        };
      }
      function v377(v547) {
        const v548 = v547 && typeof v547 === "object" ? v547.raw && typeof v547.raw === "object" ? v547.raw : v547 : {};
        const v549 = v548?.wallpaperContent ?? v548?.content ?? v548?.wallpaperContentJson;
        const v550 = typeof v549 === "string" ? v352(v549) : v549;
        let v551 = [];
        if (Array.isArray(v550)) {
          v551 = v550;
        } else if (v550 && typeof v550 === "object") {
          const v558 = v550.items || v550.list || v550.wallpapers || v550.wallpaperContent;
          v551 = Array.isArray(v558) ? v558 : [v550];
        }
        const v552 = v551.map((v559, v560) => {
          if (!v559 || typeof v559 !== "object") {
            return null;
          }
          const v561 = v341(v559.url ?? v559.imageUrl ?? v559.picUrl ?? v559.wallpaperUrl);
          const v562 = v341(v559.subjectUrl);
          const v563 = v341(v559.type ?? v559.areaType ?? v559.serviceAreaType);
          const v564 = v561 || v562;
          if (v564) {
            return {
              index: v560,
              type: v563,
              url: v564,
              subjectUrl: v562
            };
          } else {
            return null;
          }
        }).filter(Boolean);
        const v553 = v565 => v565.type === "1" || /speed|card/i.test(v565.type);
        const v554 = v566 => v566.type === "2" || /^(main|full|screen)$/i.test(v566.type);
        const v555 = v552.filter(v567 => v567.type !== "");
        let v556 = null;
        let v557 = null;
        if (v555.length) {
          v556 = v555.find(v554) || null;
          v557 = v555.find(v553) || null;
        } else if (v552.length) {
          v556 = v552[0];
          v557 = v552[1] || null;
        } else {
          const v568 = v363(v361({
            ...v548,
            wallpaperContent: null
          })).imageUrl || (v359(v549) ? v341(v549) : "");
          if (v568) {
            v556 = {
              url: v568,
              subjectUrl: "",
              type: "2"
            };
          }
        }
        return {
          main: v556 ? {
            url: v556.url,
            subjectUrl: v556.subjectUrl,
            type: v556.type || "2"
          } : null,
          speedCard: v557 ? {
            url: v557.url,
            subjectUrl: v557.subjectUrl,
            type: v557.type || "1"
          } : null,
          items: v552
        };
      }
      function v378(v569 = {}) {
        const {
          mainUrl = "",
          speedCardUrl = ""
        } = v569 || {};
        const v570 = [];
        if (mainUrl) {
          v570.push({
            type: "2",
            url: mainUrl,
            subjectUrl: mainUrl
          });
        }
        if (speedCardUrl) {
          v570.push({
            type: "1",
            url: speedCardUrl,
            subjectUrl: speedCardUrl
          });
        }
        return JSON.stringify(v570);
      }
      const v379 = 1;
      const v380 = 8;
      function v381(v571, v572, v573, v574) {
        const v575 = v342(v571);
        const v576 = v342(v572);
        const v577 = v342(v573);
        const v578 = v342(v574);
        if (!(v575 > 0) || !(v576 > 0) || !(v577 > 0) || !(v578 > 0)) {
          return 1;
        }
        return Math.max(v577 / v575, v578 / v576);
      }
      function v382(v579, v580 = v380) {
        const v581 = v342(v579);
        const v582 = v342(v580);
        const v583 = v582 != null && v582 > v379 ? v582 : v380;
        if (v581 == null) {
          return v379;
        }
        return Math.min(v583, Math.max(v379, v581));
      }
      function v383(v584 = {}) {
        const v585 = v342(v584?.imgW) || 0;
        const v586 = v342(v584?.imgH) || 0;
        const v587 = v342(v584?.boxW) || 0;
        const v588 = v342(v584?.boxH) || 0;
        const v589 = v382(v584?.zoom, v584?.maxZoom);
        const v590 = v585 > 0 && v586 > 0 && v587 > 0 && v588 > 0;
        const v591 = v587 > 0 ? v587 : 1;
        const v592 = v588 > 0 ? v588 : 1;
        const v593 = v590 ? v381(v585, v586, v587, v588) * v589 : 1;
        const v594 = v590 ? v585 * v593 : v591;
        const v595 = v590 ? v586 * v593 : v592;
        const v596 = Math.max(0, (v594 - v591) / 2);
        const v597 = Math.max(0, (v595 - v592) / 2);
        const v598 = v344(v342(v584?.panX), -v596, v596);
        const v599 = v344(v342(v584?.panY), -v597, v597);
        return {
          ready: v590,
          zoom: v589,
          scale: v593,
          boxW: v591,
          boxH: v592,
          imgW: v590 ? v585 : 0,
          imgH: v590 ? v586 : 0,
          drawW: v594,
          drawH: v595,
          panX: v598,
          panY: v599,
          maxPanX: v596,
          maxPanY: v597,
          offsetX: (v591 - v594) / 2 + v598,
          offsetY: (v592 - v595) / 2 + v599
        };
      }
      function v384(v600) {
        const v601 = v342(v600?.boxW) || 1;
        const v602 = v342(v600?.boxH) || 1;
        const v603 = v342(v600?.drawW);
        const v604 = v342(v600?.drawH);
        const v605 = (v606, v607) => Number((v606 / v607 * 100).toFixed(4)) + "%";
        return {
          left: v605(v342(v600?.offsetX) || 0, v601),
          top: v605(v342(v600?.offsetY) || 0, v602),
          width: v605(v603 > 0 ? v603 : v601, v601),
          height: v605(v604 > 0 ? v604 : v602, v602)
        };
      }
      function v385(v608, v609, v610, v611) {
        const v612 = Math.abs(v342(v610) || 0);
        const v613 = Math.abs(v342(v611) || 0);
        return {
          panX: v344(v342(v608), -v612, v612),
          panY: v344(v342(v609), -v613, v613)
        };
      }
      function v386(v614 = {}) {
        const v615 = v342(v614?.mainW) || 0;
        const v616 = v342(v614?.mainH) || 0;
        const v617 = v342(v614?.speedW) || 0;
        const v618 = v342(v614?.speedH) || 0;
        const v619 = v615 > 0 && v616 > 0;
        const v620 = v619 && v617 > 0 && v618 > 0;
        const v621 = v620 ? (v615 - v617) / 2 : 0;
        const v622 = v620 ? v387({
          w: v615,
          h: v616,
          model: v614.model
        }) : null;
        const v623 = !v620 ? 0 : v622 ? v622.top + (v622.h - v618) / 2 : (v616 - v618) / 2;
        return {
          ready: v619,
          mainW: v619 ? v615 : 0,
          mainH: v619 ? v616 : 0,
          ratio: v619 ? v615 / v616 : 0,
          hasSpeed: v620,
          speed: v620 ? {
            w: v617,
            h: v618,
            left: v621,
            top: v623,
            leftPct: v621 / v615 * 100,
            topPct: v623 / v616 * 100,
            widthPct: v617 / v615 * 100,
            heightPct: v618 / v616 * 100,
            clipped: v617 > v615 || v618 > v616
          } : null
        };
      }
      function v387(v624) {
        const v625 = v342(v624?.w);
        const v626 = v342(v624?.h);
        if (!v625 || !v626 || v625 <= 0 || v626 <= 0) {
          return null;
        }
        const v627 = v625 === 1024 && v626 === 600;
        const v628 = v625 === 800 && v626 === 480;
        if (!v627 && !v628) {
          const v637 = Math.min(v625 / 1024, v626 / 600);
          const v638 = v637 * 307;
          const v639 = v637 * 460;
          return {
            w: v638,
            h: v639,
            left: (v625 - v638) / 2,
            top: (v626 - v639) / 2,
            leftPct: Number(((v625 - v638) / 2 / v625 * 100).toFixed(4)),
            topPct: Number(((v626 - v639) / 2 / v626 * 100).toFixed(4)),
            widthPct: Number((v638 / v625 * 100).toFixed(4)),
            heightPct: Number((v639 / v626 * 100).toFixed(4))
          };
        }
        const v629 = String(v624.model || "").toUpperCase().replace(/\s+/g, "");
        const v630 = /^(?:AE6(?:(?:20)?26年?款|MY(?:20)?26)?$|AE3)/.test(v629);
        const v631 = /^AE4MAX(?:MY(?:20)?\d{2}|(?:20)?\d{2}年?款)?$/.test(v629);
        const v632 = v628 ? 800 / 1024 : 1;
        const v633 = (v630 ? 354 : 307) * v632;
        const v634 = (v630 ? 506 : 460) * v632;
        const v635 = (v625 - v633) / 2;
        const v636 = (v630 ? 44 : v631 ? 56 : 60) * v632;
        return {
          w: v633,
          h: v634,
          left: v635,
          top: v636,
          leftPct: Number(((v625 - v633) / 2 / v625 * 100).toFixed(4)),
          topPct: Number((v636 / v626 * 100).toFixed(4)),
          widthPct: Number((v633 / v625 * 100).toFixed(4)),
          heightPct: Number((v634 / v626 * 100).toFixed(4))
        };
      }
      function v388(v640) {
        const v641 = v348(v640);
        const v642 = v341(v641?.status ?? v641?.state ?? v641?.progressStatus);
        const v643 = v642.toLowerCase();
        const v644 = v343(v641?.percent ?? v641?.progress ?? v641?.rate ?? v641?.schedule);
        const v645 = v347(v641?.success ?? v641?.succeeded);
        const v646 = v645 === false || v347(v641?.failed) === true || ["fail", "failed", "failure", "error", "cancel", "canceled", "cancelled"].includes(v643);
        const v647 = !v646 && (v645 === true || ["success", "succeed", "succeeded", "ok"].includes(v643));
        const v648 = v646 || v647 || v347(v641?.done) === true || v347(v641?.finish) === true || v390(v642) || v644 >= 100;
        return {
          status: v642,
          percent: v644,
          done: v648,
          success: v647,
          failed: v646,
          outcome: v646 ? "failed" : v647 ? "success" : v648 ? "unknown" : "pending",
          message: v367(v641, ["message", "msg", "desc", "describe", "errDesc", "tips"])
        };
      }
      const v389 = new Set(["done", "finish", "finished", "complete", "completed", "end", "ended"]);
      function v390(v649) {
        return v389.has(v341(v649).toLowerCase());
      }
      function v391(v650, v651) {
        return {
          wallpaperId: v341(v650),
          vinNo: v341(v651)
        };
      }
      function v392(v652) {
        return v391(0, v652);
      }
      function v393(v653) {
        const v654 = typeof v653 === "string" ? v653 : v341(v653);
        if (!v654) {
          return "";
        }
        if (!/pwd=/i.test(v654)) {
          return v654;
        }
        return v654.replace(/([?&]pwd=)[^&#]*/gi, "$1***").replace(/^pwd=[^&#]*/i, "pwd=***");
      }
      const v394 = /^(?:sign|signature|security-token|x-oss-signature|x-oss-credential|x-oss-security-token|ossaccesskeyid|accesskeyid|expires|x-amz-signature|x-amz-credential|x-amz-security-token|awsaccesskeyid|token|pwd|password)$/i;
      function v395(v655) {
        return v394.test(String(v655 || "").trim());
      }
      function v396(v656) {
        const v657 = typeof v656 === "string" ? v656 : v341(v656);
        if (!v657) {
          return "";
        }
        if (!v657.includes("?")) {
          return v657;
        }
        const v658 = v657.indexOf("#");
        const v659 = v658 === -1 ? "" : v657.slice(v658);
        const v660 = v658 === -1 ? v657 : v657.slice(0, v658);
        try {
          const v661 = new URL(v660);
          let v662 = false;
          for (const v663 of [...v661.searchParams.keys()]) {
            if (!v395(v663)) {
              continue;
            }
            v661.searchParams.set(v663, "***");
            v662 = true;
          }
          if (v662) {
            return "" + v661.toString() + v659;
          } else {
            return v660 + v659;
          }
        } catch {
          const v664 = v660.replace(/([?&])([^=&#]+)=([^&#]*)/g, (v665, v666, v667) => v395(v667) ? "" + v666 + v667 + "=***" : v665);
          return "" + v664 + v659;
        }
      }
      function v397(v668) {
        const v669 = v342(v668);
        if (v669 == null || v669 < 0) {
          return "";
        }
        const v670 = ["B", "KB", "MB", "GB", "TB", "PB"];
        let v671 = v669;
        let v672 = 0;
        while (v671 >= 1024 && v672 < v670.length - 1) {
          v671 /= 1024;
          v672 += 1;
        }
        if (v672 === 0) {
          return Math.round(v671) + " B";
        }
        const v673 = Math.round(v671 * 10) / 10;
        return (Number.isInteger(v673) ? v673 : v673.toFixed(1)) + " " + v670[v672];
      }
      function v398(v674) {
        if (!v674 || typeof v674 !== "object" || Array.isArray(v674)) {
          return null;
        }
        let v675 = v674;
        if (!v367(v674, ["fileName", "fileUrl"]) && v674.fileInfo && typeof v674.fileInfo === "object") {
          v675 = v674.fileInfo;
        }
        const v676 = v367(v675, ["fileName", "filename", "firmwareName", "name"]);
        const v677 = v367(v675, ["fileUrl", "fileURL", "url", "downloadUrl", "fileDownloadUrl"]);
        if (!v676 && !v677) {
          return null;
        }
        const v678 = v342(v675.fileSize ?? v675.size ?? v675.fileLength);
        return {
          name: v349(v676) || v676,
          size: v678 != null && v678 >= 0 ? v678 : null,
          sizeText: v678 != null && v678 >= 0 ? v397(v678) : "",
          url: v677,
          maskedUrl: v396(v677),
          firmwareId: v367(v675, ["firmwareId", "firmwareID", "fwId"]),
          sign: v367(v675, ["sign", "fileSign", "checksum"]),
          bucket: v367(v675, ["fileBucket", "bucket", "ossBucket"])
        };
      }
      function v399(v679) {
        const v680 = [v679?.fileInfo, v679?.otaFileInfo];
        if (Array.isArray(v679?.fileInfoList) && v679.fileInfoList.length) {
          v680.push(v679.fileInfoList[0]);
        }
        if (Array.isArray(v679?.fileInfo) && v679.fileInfo.length) {
          v680.push(v679.fileInfo[0]);
        }
        for (const v681 of v680) {
          const v682 = v398(v681);
          if (v682) {
            return v682;
          }
        }
        return null;
      }
      function v400(v683) {
        const v684 = v683 && typeof v683 === "object" && Object.prototype.hasOwnProperty.call(v683, "data") ? v683.data : v683;
        const v685 = v684 && typeof v684 === "object" && !Array.isArray(v684) ? v684 : {};
        const v686 = Object.keys(v685).length > 0;
        const v687 = v367(v685, ["wifiAddress", "wifiUrl", "wifiAddressUrl"]);
        const v688 = v399(v685);
        const v689 = [];
        if (v688) {
          v689.push("fileUrl 是 OSS 预签名直链，带时效；界面请用 maskedUrl，原文只在 url 字段");
        } else {
          v689.push(v686 ? "服务端当前没有下发 OTA 包" : "没有读到固件信息");
        }
        if (v687) {
          v689.push("wifiAddress 含 Wi-Fi 密码，wifi.masked 已打码");
        }
        if (!v367(v685, ["recordId", "recordID"])) {
          v689.push("没有 recordId，无法查询下发/升级进度");
        }
        return {
          present: v686,
          upgradeStatus: v367(v685, ["upgradeStatus", "status"]),
          recordId: v367(v685, ["recordId", "recordID"]),
          softwareVersion: v367(v685, ["softwareVersion", "currentVersion"]),
          appVersion: v367(v685, ["appVersion"]),
          otaVersion: v367(v685, ["otaVersion", "targetVersion"]),
          wifi: v687 ? {
            masked: v393(v687),
            url: v687
          } : null,
          file: v688,
          notes: v689
        };
      }
      function v401(v690, v691 = {}) {
        const v692 = v348(v690);
        const v693 = v347(v690) ?? v347(typeof v690 === "object" ? v690?.data : null) ?? v347(v692?.hasUpdate) ?? v347(v692?.needUpdate) ?? v347(v692?.checkResult) ?? v347(v692?.result) ?? v347(v692?.versionFlag);
        return {
          hasUpdate: v693,
          known: v693 !== null,
          currentVersion: v367(v691, ["currentVersion", "current", "softwareVersion"]),
          targetVersion: v367(v691, ["targetVersion", "target", "otaVersion"]),
          raw: v690
        };
      }
      function v402(v694) {
        if (Array.isArray(v694)) {
          return v694;
        }
        if (!v694 || typeof v694 !== "object") {
          return [];
        }
        for (const v695 of ["list", "records", "rows", "items", "recordList", "otaList", "data"]) {
          if (Array.isArray(v694[v695])) {
            return v694[v695];
          }
        }
        return [];
      }
      const v403 = {
        0: "待升级",
        1: "下载中",
        2: "升级中",
        3: "升级成功",
        4: "升级失败",
        "-1": "未知",
        success: "升级成功",
        succeed: "升级成功",
        done: "升级成功",
        finish: "升级成功",
        finished: "升级成功",
        fail: "升级失败",
        failed: "升级失败",
        error: "升级失败",
        running: "升级中",
        upgrading: "升级中",
        downloading: "下载中",
        waiting: "待升级",
        cancel: "已取消",
        canceled: "已取消",
        cancelled: "已取消"
      };
      function v404(v696) {
        const v697 = v341(v696);
        if (!v697) {
          return "未知";
        }
        return v403[v697.toLowerCase()] || "状态 " + v697;
      }
      function v405(v698) {
        if (!v698 || typeof v698 !== "object" || Array.isArray(v698)) {
          return null;
        }
        let v699 = v398(v698.fileInfo ?? v698.file ?? v698.otaFileInfo);
        if (!v699 && v367(v698, ["fileName", "fileUrl"])) {
          v699 = v398(v698);
        }
        if (!v699) {
          const v703 = v410(v698);
          v699 = v703.length ? v703[0] : null;
        }
        const v700 = v367(v698, ["status", "upgradeStatus", "state"]);
        const v701 = v367(v698, ["id", "recordId", "taskId", "otaId", "upgradeRecordId"]);
        const v702 = v367(v698, ["version", "softwareVersion", "targetVersion", "otaVersion"]);
        if (!v701 && !v702 && !v700 && !v699) {
          return null;
        }
        return {
          id: v701,
          version: v702,
          status: v700,
          statusText: v404(v700),
          percent: v343(v698.percent ?? v698.progress ?? v698.rate ?? v698.schedule),
          createdAt: v367(v698, ["createTime", "createdAt", "gmtCreate", "createDate"]),
          updatedAt: v367(v698, ["updateTime", "updatedAt", "gmtModified", "finishTime"]),
          file: v699,
          raw: v698
        };
      }
      function v406(v704) {
        const v705 = v348(v704);
        const v706 = v402(v705).map(v405).filter(Boolean);
        if (!v706.length) {
          const v708 = v405(v705);
          if (v708) {
            v706.push(v708);
          }
        }
        const v707 = v342(v705?.total) ?? v706.length;
        return {
          total: v707,
          items: v706
        };
      }
      function v407(v709) {
        return v406(v709);
      }
      function v408(v710) {
        return v406(v710);
      }
      function v409(v711) {
        const v712 = v348(v711);
        const v713 = v367(v712, ["status", "upgradeStatus", "state"]);
        const v714 = v343(v712?.percent ?? v712?.progress ?? v712?.rate ?? v712?.schedule);
        const v715 = v367(v712, ["errCode", "errorCode"]);
        const v716 = v367(v712, ["errDesc", "errorDesc", "errorMessage"]);
        const v717 = v347(v712?.done) === true || v347(v712?.finish) === true || v390(v713) || v714 >= 100;
        return {
          status: v713,
          percent: v714,
          done: v717,
          message: v367(v712, ["message", "msg", "desc", "describe", "errDesc", "tips"]),
          errCode: v715,
          errDesc: v716
        };
      }
      function v410(v718) {
        const v719 = [];
        const v720 = new Set();
        const v721 = new Set();
        const v722 = (v723, v724) => {
          if (v723 == null || typeof v723 !== "object" || v724 > 20) {
            return;
          }
          if (v721.has(v723)) {
            return;
          }
          v721.add(v723);
          if (Array.isArray(v723)) {
            for (const v727 of v723) {
              v722(v727, v724 + 1);
            }
            return;
          }
          const v725 = v367(v723, ["fileName", "filename"]);
          const v726 = v367(v723, ["fileUrl", "fileURL"]);
          if (v725 && v726) {
            const v728 = v398(v723);
            if (v728) {
              const v729 = v728.firmwareId ? "fw:" + v728.firmwareId : "path:" + v728.name + "|" + v350(v728.url);
              if (!v720.has(v729)) {
                v720.add(v729);
                v719.push(v728);
              }
            }
          }
          for (const v730 of Object.values(v723)) {
            if (v730 && typeof v730 === "object") {
              v722(v730, v724 + 1);
            }
          }
        };
        v722(v718, 0);
        return v719;
      }
      return {
        parseJsonField: v351,
        normalizeWallpaperPage: v372,
        normalizeWallpaperDetail: v373,
        wallpaperAuditState: v370,
        WALLPAPER_STATE_APPROVED: v368,
        WALLPAPER_STATE_REJECTED: v369,
        wallpapersFromHome: v374,
        wallpaperImages: v376,
        wallpaperTransferSpec: v364,
        parseWallpaperAreas: v377,
        buildWallpaperContent: v378,
        wallpaperCoverScale: v381,
        clampWallpaperZoom: v382,
        wallpaperFitTransform: v383,
        wallpaperLayerStyle: v384,
        clampWallpaperPan: v385,
        wallpaperSpeedCardBox: v387,
        wallpaperCompositeGeometry: v386,
        normalizeProgress: v388,
        buildUseWallpaperBody: v391,
        buildRestoreWallpaperBody: v392,
        maskWifiAddress: v393,
        maskSignedUrl: v396,
        formatBytes: v397,
        normalizeOtaFile: v398,
        normalizeOtaInfo: v400,
        normalizeCheckVersion: v401,
        normalizeOtaList: v407,
        normalizeOtaRecord: v408,
        normalizeOtaStatus: v409,
        findOtaFiles: v410,
        WALLPAPER_ZOOM_MIN: v379,
        WALLPAPER_ZOOM_MAX: v380
      };
    })();
  });
  (v731 => {
    const v732 = typeof window === "object" ? window : globalThis;
    if (v732.LAZY_FEATURE) {
      v732.LAZY_FEATURE.register(v732, "WALLMARKET", v731);
    } else {
      v731();
    }
  })(() => {
    const v733 = 4194304;
    const v734 = 16777216;
    const v735 = ["main", "speed"];
    const v736 = Object.freeze({
      animals: "动物",
      cars: "汽车",
      motorcycles: "摩托",
      anime: "二次元",
      women: "美女",
      men: "帅哥",
      scenery: "风景",
      technology: "科技",
      abstract: "抽象",
      other: "其他"
    });
    const v737 = Object.freeze(["AE5", "AE5I", "AE5IPRO"]);
    const v738 = Object.freeze({
      AE5: "AE5",
      AE5I: "AE5i",
      AE5IPRO: "AE5i Pro",
      AE7: "AE7",
      AE626款: "AE6（26款）",
      AE4PROMY25: "AE4 Pro MY25",
      AE4MAXMY25: "AE4 Max MY25",
      "AE4PRO2+": "AE4 Pro2+",
      AE4MAX2: "AE4 Max2",
      "AE4MAX2+": "AE4 Max2+",
      "AE4IPRO+": "AE4i Pro+",
      EZ4PRO: "EZ4 Pro",
      EZ4MAX: "EZ4 Max",
      EZ4MAXLI: "EZ4 Max Li"
    });
    function v739(v755) {
      const v756 = v755?.compatibleModels;
      if (v756 === undefined) {
        return [...v737];
      }
      if (Array.isArray(v756) && v756.length > 0 && v756.length <= v737.length && new Set(v756).size === v756.length && v756.every(v757 => v737.includes(v757))) {
        return [...v756];
      } else {
        return [];
      }
    }
    function v740(v758) {
      const v759 = v758?.canvas?.w ?? v758?.width;
      const v760 = v758?.canvas?.h ?? v758?.height;
      if ((v759 !== undefined || v760 !== undefined) && (v759 !== 1024 || v760 !== 600)) {
        return [];
      }
      if (v739(v758).length) {
        return Object.keys(v738);
      } else {
        return [];
      }
    }
    function v741(v761) {
      return v740(v761).map(v762 => v738[v762]).join(" / ") || "车型待确认";
    }
    function v742(v763) {
      const v764 = () => {
        throw new Error("壁纸方案格式或合成位置无效");
      };
      const v765 = (v770, v771, v772) => typeof v770 === "number" && Number.isFinite(v770) && v770 >= v771 && v770 <= v772;
      const v766 = v773 => typeof v773 === "number" && Number.isFinite(v773) && v773 > 0 && v773 <= 4096 && (Math.round(v773 * 1000) === v773 * 1000 || Math.round(v773 * 1048576) === v773 * 1048576);
      if (v763?.previews !== undefined && (v763.previews !== "webp" || v763.v < 2)) {
        v764();
      }
      if (!v763 || ![1, 2, 3].includes(v763.v) || typeof v763.name !== "string" || !v763.name.trim() || v763.name.length > 24 || /[\u0000-\u001f]/.test(v763.name)) {
        v764();
      }
      if (!v739(v763).length) {
        v764();
      }
      const v767 = v763.canvas;
      const v768 = v763.speedBox;
      if (!v767 || !v766(v767.w) || !v766(v767.h) || !v768 || !v766(v768.w) || !v766(v768.h) || !v765(v768.left, -4096, 4096) || !v765(v768.top, -4096, 4096)) {
        v764();
      }
      if (!Array.isArray(v763.layers) || v763.layers.length < 1 || v763.layers.length > 2) {
        v764();
      }
      const v769 = v763.layers.map((v774, v775) => {
        if (!v774 || v774.key !== v735[v775] || !v766(v774.width) || !v766(v774.height) || !v765(v774.zoom, 1, 128) || !v765(v774.panX, -1000000, 1000000) || !v765(v774.panY, -1000000, 1000000)) {
          v764();
        }
        if (v763.v >= 2 && v774.source !== v774.key && (v774.key !== "speed" || v774.source !== "main")) {
          v764();
        }
        return {
          key: v774.key,
          width: v774.width,
          height: v774.height,
          zoom: v774.zoom,
          panX: v774.panX,
          panY: v774.panY,
          ...(v763.v >= 2 ? {
            source: v774.source
          } : {})
        };
      });
      if (v769[1]?.source === "main" && (v769[1].width !== v769[0].width || v769[1].height !== v769[0].height)) {
        v764();
      }
      if (JSON.stringify(v763.order) !== JSON.stringify(v769.map(v776 => v776.key))) {
        v764();
      }
      return {
        v: v763.v,
        ...(v763.compatibleModels !== undefined ? {
          compatibleModels: v739(v763)
        } : {}),
        ...(v763.previews ? {
          previews: v763.previews
        } : {}),
        name: v763.name.trim(),
        canvas: {
          w: v767.w,
          h: v767.h
        },
        speedBox: {
          w: v768.w,
          h: v768.h,
          left: v768.left,
          top: v768.top
        },
        layers: v769,
        order: v769.map(v777 => v777.key)
      };
    }
    const v743 = (v778, v779) => v779 + "-source." + (v778.v >= 3 ? "png" : "jpg");
    function v744(v780) {
      if (v780.v >= 2) {
        return [...new Set(v780.layers.map(v781 => v743(v780, v781.source))), ...(v780.previews === "webp" ? ["thumb.webp", ...v780.layers.map(v782 => v782.key + "-preview.webp")] : [])];
      }
      return ["main-source.jpg", "main.jpg", ...(v780.layers.length === 2 ? ["speed-source.jpg", "speed.jpg"] : []), "composite.jpg", "thumb.jpg"];
    }
    const v745 = new Map();
    async function v746(v783, v784 = {}) {
      const v785 = v753.DIAG;
      let v786 = {};
      let v787 = "";
      let v788 = "应用";
      try {
        v786 = v785?.capture?.() || {};
        const v794 = v753.ACC?.active?.();
        v787 = String(v794?.id || "");
        v788 = String(v794?.label || v794?.uid || "应用");
      } catch {}
      const v789 = new URL(v783);
      const v790 = Date.now();
      const v791 = "market-" + Date.now().toString(36) + "-" + ++v747;
      const v792 = {
        host: v789.host,
        path: v789.pathname,
        method: v784.method || "GET"
      };
      const v793 = (v795, v796, v797 = {}) => {
        try {
          v785?.event?.("壁纸市场网络请求", {
            ...v786,
            account: v788,
            accountId: v787,
            category: "network",
            source: "wallpaper-market",
            phase: v795,
            kind: v796,
            runId: v791,
            extra: {
              ...v792,
              ...v797
            }
          });
        } catch {}
      };
      v793("start", "info");
      try {
        const v798 = await fetch(v783, v784);
        v793("headers", v798.ok ? "ok" : "warn", {
          status: v798.status,
          headersMs: Date.now() - v790,
          cfRay: v798.headers?.get?.("cf-ray") || "",
          contentType: v798.headers?.get?.("content-type") || ""
        });
        return v798;
      } catch (v799) {
        v793("failed", v784.signal?.aborted ? "warn" : "err", {
          durationMs: Date.now() - v790,
          aborted: v784.signal?.aborted === true,
          error: v799?.name || "Error"
        });
        throw v799;
      }
    }
    let v747 = 0;
    function v748(v800, v801, v802) {
      const v803 = v800 + "\n" + v801;
      const v804 = v745.get(v803);
      if (v804 && v804.expiresAt > Date.now() + 30000) {
        return v804.promise;
      }
      const v805 = {
        expiresAt: Infinity
      };
      v805.promise = (async () => {
        const v806 = await v746(v800 + "/session", {
          method: "POST",
          credentials: "omit",
          referrerPolicy: "no-referrer",
          headers: {
            Authorization: "Bearer " + v801
          },
          signal: v802
        });
        const v807 = await v806.json().catch(() => ({}));
        if (!v806.ok || typeof v807.token !== "string") {
          throw new Error(v807.error || "极核账号验证失败");
        }
        v805.expiresAt = Number(v807.expiresAt) || Date.now() + 1800000;
        return {
          token: v807.token,
          expiresAt: v805.expiresAt,
          admin: v807.admin === true
        };
      })().catch(v808 => {
        if (v745.get(v803) === v805) {
          v745.delete(v803);
        }
        throw v808;
      });
      if (v745.size >= 8) {
        v745.delete(v745.keys().next().value);
      }
      v745.set(v803, v805);
      return v805.promise;
    }
    function v749(v809, v810) {
      v745.delete(v809 + "\n" + v810);
    }
    const v750 = new Map();
    function v751(v811, v812, v813, v814) {
      const v815 = "zeeho.wallmarket.config.v1:" + encodeURIComponent(v811) + ":" + v812;
      const v816 = Math.floor((Date.now() + 28800000) / 86400000);
      const v817 = v750.get(v815);
      if (v817?.day === v816) {
        return v817.promise;
      }
      const v818 = v820 => typeof v820?.siteKey === "string" && typeof v820?.localTest === "boolean";
      const v819 = {
        day: v816
      };
      v819.promise = (async () => {
        let v821;
        try {
          v821 = v813?.getJson?.(v815);
        } catch {}
        if (v821?.day === v816 && v818(v821.config)) {
          return v821.config;
        }
        const v822 = new AbortController();
        const v823 = () => v822.abort();
        const v824 = setTimeout(v823, 60000);
        v814?.addEventListener("abort", v823, {
          once: true
        });
        if (v814?.aborted) {
          v823();
        }
        try {
          const v825 = await v746(v811 + "/config", {
            credentials: "omit",
            referrerPolicy: "no-referrer",
            signal: v822.signal
          });
          if (!v825.ok) {
            throw new Error("壁纸市场配置读取失败，请稍后再试");
          }
          const v826 = await v825.json();
          if (!v818(v826)) {
            throw new Error("壁纸市场配置格式无效");
          }
          const v827 = {
            siteKey: v826.siteKey,
            localTest: v826.localTest
          };
          if (v816 === Math.floor((Date.now() + 28800000) / 86400000)) {
            try {
              v813?.setJson?.(v815, {
                day: v816,
                config: v827
              });
            } catch {}
          }
          return v827;
        } finally {
          clearTimeout(v824);
          v814?.removeEventListener("abort", v823);
        }
      })().catch(v828 => {
        if (v750.get(v815) === v819) {
          v750.delete(v815);
        }
        throw v828;
      });
      if (v750.size >= 8) {
        v750.delete(v750.keys().next().value);
      }
      v750.set(v815, v819);
      return v819.promise;
    }
    const v752 = "https://zeeho.wintsa123.top";
    const v753 = typeof window === "object" ? window : globalThis;
    function v754(v829) {
      const v830 = v829?.get?.("zeeho.wallmarket.url") || v753.WALLMARKET?.base || v752;
      if (!v830) {
        throw new Error("壁纸市场尚未开放");
      }
      const v831 = new URL(v830);
      if (v831.username || v831.password || v831.protocol !== "https:" && (v831.protocol !== "http:" || !["localhost", "127.0.0.1"].includes(v831.hostname))) {
        throw new Error("壁纸市场地址无效");
      }
      return v831.origin + v831.pathname.replace(/\/$/, "");
    }
    v753.WALLMARKET = {
      validate: v742,
      compatibleModels: v739,
      applicableModels: v740,
      compatibilityLabel: v741,
      files: v744,
      sourceFile: v743,
      categories: v736,
      MAX_FILE: v733,
      MAX_BODY: v734,
      session: v748,
      forgetSession: v749,
      config: v751,
      resolveBase: v754,
      fetch: v746,
      base: v752
    };
  });
  window.DIAG = (() => {
    const v832 = "zeeho.diag.v1";
    const v833 = () => window.__zeehoWebPreview === true;
    const v834 = () => !v833() && typeof window.ZeehoShell?.beginAppLog === "function" && typeof window.ZeehoShell?.pollAppLog === "function" && typeof window.ZeehoShell?.appLogSession === "function";
    const v835 = v834() ? 6000 : 1200;
    const v836 = 259200000;
    const v837 = 600000;
    const v838 = v834() ? 4194304 : 716800;
    const v839 = /token/i;
    const v840 = v913 => v839.test(String(v913 || "").replace(/[^a-zA-Z0-9]/g, ""));
    const v841 = "[token 已隐藏]";
    const v842 = "access[_-]?token|refresh[_-]?token|token(?:info)?|id[_-]?token";
    const v843 = "(?:\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|[^\\s<>&,;\\[\\]]+)";
    const v844 = new RegExp("([\"']?\\b(?:" + v842 + ")[\"']?\\s*[:=]\\s*)(" + v843 + ")", "gi");
    const v845 = new RegExp("^(?:" + v842 + "|InvalidTokenException|error_description)$", "i");
    let v846 = [];
    let v847 = false;
    let v848 = 0;
    let v849 = 0;
    const v850 = new Set();
    const v851 = () => {
      if (v833()) {
        return false;
      }
      try {
        return v834() || !!window.Store && window.Store.isNative() && (window.Store.canCommit() || window.Store.canCommitAsync?.());
      } catch {
        return false;
      }
    };
    const v852 = "page-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    let v853 = {
      sessionId: v852,
      generation: 1,
      at: Date.now()
    };
    try {
      if (v834()) {
        const v914 = JSON.parse(window.ZeehoShell.appLogSession());
        if (typeof v914.sessionId === "string" && Number.isSafeInteger(v914.generation)) {
          v853 = v914;
        }
      }
    } catch {}
    const v854 = () => ({
      sessionId: v853.sessionId,
      generation: v853.generation,
      at: Date.now()
    });
    const v855 = () => ({
      ...v853
    });
    const v856 = new Map();
    let v857 = null;
    let v858 = 0;
    let v859 = null;
    let v860 = false;
    let v861 = "";
    let v862 = false;
    function v863(v915) {
      return String(v915 || "").replace(/([?&#;])([^\s=&#;[\]]{1,100})=([^&#\s[\]]*)/g, (v916, v917, v918, v919) => {
        let v920 = v918;
        try {
          v920 = decodeURIComponent(v918.replace(/\+/g, " "));
        } catch {}
        if (!v919) {
          return v916;
        }
        return "" + v917 + v918 + "=" + (v840(v920) ? v841 : v919);
      });
    }
    function v864(v921) {
      const v922 = [];
      const v923 = new Map();
      let v924 = 0;
      while ((v924 = v921.indexOf("<", v924)) >= 0) {
        let v927 = v924 + 1;
        while (v927 < v921.length && v921[v927] !== "<" && v921[v927] !== ">") {
          v927++;
        }
        if (v927 === v921.length) {
          break;
        }
        if (v921[v927] === "<") {
          v924 = v927;
          continue;
        }
        const v928 = v921.slice(v924, v927 + 1);
        const v929 = /^<(\/?)([A-Za-z_][\w.:-]*)/.exec(v928);
        const v930 = v924;
        v924 = v927 + 1;
        if (!v929) {
          continue;
        }
        const v931 = v929[2].split(":").pop();
        if (!v845.test(v931)) {
          continue;
        }
        const v932 = {
          start: v930,
          end: v924,
          name: v931,
          close: null
        };
        const v933 = v931.toLowerCase();
        const v934 = v923.get(v933) || [];
        if (v929[1]) {
          const v935 = v934.pop();
          if (v935) {
            v935.close = v932;
          }
        } else if (!/\/\s*>$/.test(v928)) {
          v934.push(v932);
          v922.push(v932);
        }
        v923.set(v933, v934);
      }
      const v925 = [];
      let v926 = 0;
      for (const v936 of v922) {
        if (v936.start < v926) {
          continue;
        }
        v925.push(v921.slice(v926, v936.start));
        if (v936.close) {
          v925.push("<" + v936.name + ">" + v841 + "</" + v936.name + ">");
          v926 = v936.close.end;
        } else {
          const v937 = v921.indexOf("<", v936.end);
          v925.push(v921.slice(v936.start, v936.end), v841);
          v926 = v937 < 0 ? v921.length : v937;
        }
      }
      v925.push(v921.slice(v926));
      return v925.join("");
    }
    function v865(v938) {
      const v939 = String(v938 == null ? "" : v938);
      v844.lastIndex = 0;
      return v863(v864(v939)).replace(v844, (v940, v941, v942) => "" + v941 + (v942[0] === "\"" || v942[0] === "'" ? v942[0] : "") + v841 + (v942[0] === "\"" || v942[0] === "'" ? v942[0] : "")).replace(/\b(Bearer)\s+[^\s<>\u005b\u005d"',;]+/gi, "$1 " + v841).replace(/\b(invalid_token)\s+[^\s<>\u005b\u005d"',;}]+/gi, "$1 " + v841);
    }
    function v866(v943, v944 = 0) {
      if (v943 == null) {
        return v943;
      }
      if (v944 > 32) {
        return v943;
      }
      if (Array.isArray(v943)) {
        return v943.map(v945 => v866(v945, v944 + 1));
      }
      if (typeof v943 === "object") {
        const v946 = {};
        for (const [v947, v948] of Object.entries(v943)) {
          v946[v947] = v840(v947) ? "[token 已隐藏]" : v866(v948, v944 + 1);
        }
        return v946;
      }
      if (typeof v943 === "string") {
        return v865(v943);
      } else {
        return v943;
      }
    }
    function v867(v949) {
      if (v949 == null) {
        return "";
      }
      if (typeof v949 === "string") {
        try {
          return JSON.stringify(v866(JSON.parse(v949)), null, 2);
        } catch {
          return v865(v949);
        }
      }
      try {
        return JSON.stringify(v866(v949), null, 2);
      } catch {
        return "[正文无法序列化]";
      }
    }
    const v868 = /^(authorization|proxy-authorization)$/i;
    const v869 = v950 => v868.test(String(v950 == null ? "" : v950).trim()) || v840(v950);
    function v870(v951) {
      if (!v951 || typeof v951 !== "object") {
        return "";
      }
      const v952 = [];
      for (const [v953, v954] of Object.entries(v951)) {
        const v955 = String(v953 == null ? "" : v953).replace(/[\r\n]+/g, " ").trim();
        if (!v955) {
          continue;
        }
        const v956 = v954 == null ? "" : String(v954);
        v952.push(v955 + ": " + (v869(v955) ? "[token 已隐藏]" : v865(v956)));
      }
      return v952.join("\n");
    }
    function v871(v957 = "") {
      try {
        const v958 = window.ACC;
        if (v958?.avail?.() && v958.ready?.()) {
          const v959 = v958.labelOf?.(v958.active()) || v958.activeId?.();
          if (v959) {
            return String(v959);
          }
        }
      } catch {}
      return String(v957 || "");
    }
    const v872 = {
      set_property: "改车辆设置",
      set_property2: "改车辆设置",
      set_sound_size: "改音量",
      set_lowpower: "改低电量提醒",
      set_charge_power: "改充电功率上限",
      set_motoPlay: "改投屏开关",
      car_horn: "寻车指令",
      car_ctrl_v2: "高声寻车指令",
      car_cmd: "车控指令",
      net_unlock: "云解锁指令",
      auth_captcha: "登录：获取验证码图",
      auth_sms: "登录：发送短信",
      auth_login: "登录：换取 token",
      h5_signin: "每日签到",
      h5_signin_info: "读取签到明细",
      h5_signin_supplement: "领取连签盲盒",
      h5_prizes_detail: "读取盲盒奖品记录"
    };
    const v873 = v960 => {
      if (v872[v960]) {
        return v872[v960];
      }
      const v961 = window.ZEEHO_EP?.list || [];
      const v962 = v961.find(v964 => v964.id === v960 || v964.path === v960 || v964.path && String(v960 || "").endsWith(v964.path));
      const v963 = String(v962?.label || v960 || "接口").replace(/^[^：]{0,4}：/, "").replace(/（[^）]*）/g, "").replace(/\([^)]*\)/g, "").trim();
      return v963 || String(v960 || "接口");
    };
    const v874 = new WeakMap();
    const v875 = new Map();
    let v876 = false;
    let v877 = 0;
    let v878 = 0;
    let v879 = null;
    let v880 = null;
    let v881 = false;
    let v882 = "";
    const v883 = () => !v833() && typeof window.ZeehoShell?.beginDiagStore === "function" && typeof window.ZeehoShell?.pollDiagStore === "function";
    const v884 = v965 => {
      let v966 = 0;
      for (let v967 = 0; v967 < v965.length; v967++) {
        const v968 = v965.charCodeAt(v967);
        if (v968 < 128) {
          v966++;
        } else if (v968 < 2048) {
          v966 += 2;
        } else if (v968 >= 55296 && v968 <= 56319 && v967 + 1 < v965.length && v965.charCodeAt(v967 + 1) >= 56320 && v965.charCodeAt(v967 + 1) <= 57343) {
          v966 += 4;
          v967++;
        } else {
          v966 += 3;
        }
      }
      return v966;
    };
    const v885 = v969 => {
      if (!v874.has(v969)) {
        v874.set(v969, v884(JSON.stringify(v969)));
      }
      return v874.get(v969);
    };
    function v886(v970) {
      const v971 = Date.now() - v836;
      const v972 = v970.filter(v974 => v974 && typeof v974 === "object" && Number.isFinite(Number(v974.at)) && Number(v974.at) > v971).slice(0, v835);
      let v973 = 2 + Math.max(0, v972.length - 1);
      for (const v975 of v972) {
        v973 += v885(v975);
      }
      while (v972.length > 1 && v973 > v838) {
        v973 -= v885(v972.pop()) + 1;
      }
      return v972;
    }
    function v887() {
      v850.forEach(v976 => {
        try {
          v976();
        } catch {}
      });
    }
    function v888(v977, v978 = "") {
      if (v833()) {
        return Promise.reject(new Error("日志原生存储 unavailable：UI 预览仅使用内存。"));
      }
      return new Promise((v979, v980) => {
        let v981;
        const v982 = v834();
        try {
          v981 = v982 ? window.ZeehoShell.beginAppLog(v977, v978 || "{}") : window.ZeehoShell.beginDiagStore(v977, v978);
        } catch {
          v980(new Error("日志存储无法启动"));
          return;
        }
        if (typeof v981 !== "string" || !v981) {
          v980(new Error("日志存储繁忙，请稍后重试"));
          return;
        }
        const v983 = Date.now() + (v977 === "export" ? 120000 : 30000);
        const v984 = () => {
          try {
            const v985 = JSON.parse(v982 ? window.ZeehoShell.pollAppLog(v981) : window.ZeehoShell.pollDiagStore(v981));
            if (v985.ticket !== v981) {
              throw new Error("日志存储回执不匹配");
            }
            if (v985.done) {
              if (v985.ok !== true) {
                const v986 = new Error(["stale_generation", "generation_mismatch"].includes(v985.error) ? "日志已重新开始，旧记录未写入" : v985.error === "export_cancelled" ? "已取消导出" : "日志操作失败，结果未确认");
                v986.code = v985.error;
                throw v986;
              }
              v979(v985.json || (v982 ? "{}" : "[]"));
              return;
            }
            if (Date.now() >= v983) {
              throw new Error("日志操作超时，请稍后重试");
            }
            setTimeout(v984, 100);
          } catch (v987) {
            v980(v987);
          }
        };
        setTimeout(v984, 0);
      });
    }
    function v889(v988, v989) {
      if (v878 !== v989) {
        return;
      }
      const v990 = JSON.parse(v988 || "[]");
      if (!Array.isArray(v990)) {
        throw new Error("日志存储格式错误，原记录未覆盖");
      }
      const v991 = v990.filter(v993 => v993 && typeof v993 === "object").map(v994 => v866(v994));
      const v992 = new Set(v846.map(v995 => v995.id));
      v846 = v886([...v846, ...v991.filter(v996 => !v992.has(v996.id))].sort((v997, v998) => Number(v998.at) - Number(v997.at)));
      if (JSON.stringify(v990) !== JSON.stringify(v991)) {
        v876 = true;
        v877++;
        v895();
      }
      v875.clear();
    }
    function v890(v999) {
      if (!v999 || typeof v999.sessionId !== "string" || !Number.isSafeInteger(v999.generation)) {
        return;
      }
      if (v999.generation !== v853.generation || v999.sessionId !== v853.sessionId) {
        v846 = [];
        v856.clear();
        v875.clear();
        v858 = 0;
        v877++;
        v878++;
      }
      v853 = {
        sessionId: v999.sessionId,
        generation: v999.generation,
        at: Number(v999.at) || v853.at
      };
      if (v999.stats) {
        v857 = v999.stats;
      }
    }
    function v891(v1000) {
      const v1001 = new Map(v846.map(v1002 => [v1002.id, v1002]));
      for (const v1003 of v1000) {
        if (!v1003 || typeof v1003.id !== "string" || !Number.isFinite(Number(v1003.at))) {
          continue;
        }
        if (!v856.has(v1003.id)) {
          v1001.set(v1003.id, {
            ...v866(v1003)
          });
        }
      }
      v846 = v886([...v1001.values()].sort((v1004, v1005) => Number(v1005.at) - Number(v1004.at)));
    }
    async function v892(v1006 = false) {
      let v1007 = "";
      let v1008 = 0;
      let v1009 = 0;
      let v1010 = false;
      let v1011 = v1006 || !v858 ? null : v858;
      let v1012 = null;
      let v1013 = v878;
      let v1014 = v1011 == null;
      const v1015 = v1014;
      const v1016 = v878;
      const v1017 = v846;
      if (v1006) {
        v846 = v846.filter(v1018 => v856.has(v1018.id));
      }
      try {
        do {
          v1010 = false;
          const v1019 = {
            after: v1007,
            limit: v1011 == null && !v1007 ? 60 : 200,
            ...(v1011 == null ? {} : {
              sinceRevision: v1011
            })
          };
          const v1020 = await v888("read", JSON.stringify(v1019));
          if (v878 !== v1013) {
            return;
          }
          const v1021 = JSON.parse(v1020);
          if (!Array.isArray(v1021.entries)) {
            throw new Error("应用日志返回格式无法识别");
          }
          const v1022 = v1021.generation !== v853.generation || v1021.sessionId !== v853.sessionId;
          v890(v1021);
          v1013 = v878;
          if (v1021.resetRequired || v1022 && v1011 != null) {
            if (++v1009 > 3) {
              throw new Error("日志持续变化，请稍后重新读取");
            }
            v846 = v846.filter(v1024 => v856.has(v1024.id));
            v1011 = null;
            v1007 = "";
            v1012 = null;
            v858 = 0;
            v1010 = true;
            continue;
          }
          if (Number.isSafeInteger(v1021.revision)) {
            v1012 = v1012 == null ? v1021.revision : Math.min(v1012, v1021.revision);
          }
          v891(v1021.entries);
          v857 = v1021.stats || v857;
          const v1023 = typeof v1021.nextAfter === "string" ? v1021.nextAfter : "";
          if (v1023 && (v1023 === v1007 || !v1021.entries.length)) {
            throw new Error("应用日志分页未推进");
          }
          v1007 = v1023;
          if (++v1008 > v835 + 1) {
            throw new Error("应用日志分页超过上限，请重新打开");
          }
          if (v1015) {
            v887();
          }
          if (v1014 && v1007 && v1008 === 1) {
            v1014 = false;
            v1011 = null;
          }
        } while (v1007 || v1010);
        if (v1012 != null) {
          v858 = v1012;
        }
        v882 = "";
        v887();
      } catch (v1025) {
        if (v878 === v1016) {
          const v1026 = new Set(v846.map(v1027 => v1027.id));
          v846 = v886([...v846, ...v1017.filter(v1028 => !v1026.has(v1028.id))].sort((v1029, v1030) => Number(v1030.at) - Number(v1029.at)));
        }
        throw v1025;
      }
    }
    function v893() {
      if (v847) {
        return v879;
      }
      v847 = true;
      if (!v851()) {
        return null;
      }
      const v1031 = v878;
      if (v834()) {
        v879 = v892(true).catch(v1032 => {
          v882 = v1032.message;
        }).finally(() => {
          v879 = null;
          v887();
        });
        return v879;
      }
      if (v883()) {
        v879 = v888("read").then(v1033 => v889(v1033, v1031)).catch(v1034 => {
          v882 = v1034.message;
        }).finally(() => {
          v879 = null;
          v887();
        });
        return v879;
      }
      try {
        v889(window.Store.get(v832) || "[]", v1031);
      } catch {
        v882 = "日志读取失败，原记录未覆盖";
      }
      return null;
    }
    async function v894() {
      v848 = 0;
      if (!v851() || !v876 || v881 || v880) {
        return;
      }
      if (!v834()) {
        v893();
        if (v879) {
          await v879;
        }
      }
      if (v882 || v881 || v880) {
        return;
      }
      const v1035 = v878;
      const v1036 = v877;
      v846 = v886(v846);
      if (v834()) {
        const v1038 = [];
        let v1039 = 128;
        for (const v1040 of v856.values()) {
          const v1041 = v885(v1040) + 1;
          if (v1038.length && v1039 + v1041 > 204800 || v1038.length >= 100) {
            break;
          }
          v1038.push(v1040);
          v1039 += v1041;
        }
        if (!v1038.length) {
          v876 = false;
          return;
        }
        v880 = v888("append", JSON.stringify({
          generation: v853.generation,
          entries: v1038
        })).then(v1042 => {
          if (v878 !== v1035) {
            return;
          }
          const v1043 = JSON.parse(v1042);
          v890(v1043);
          for (const v1044 of v1038) {
            if (v856.get(v1044.id) === v1044) {
              v856.delete(v1044.id);
            }
          }
          v876 = v856.size > 0;
        }).catch(v1045 => {
          v882 = v1045.message;
          if (["stale_generation", "generation_mismatch"].includes(v1045.code)) {
            v904(true).catch(() => {});
          }
        }).finally(() => {
          v880 = null;
          if (v876 && !v881 && !v882) {
            v895();
          }
          v887();
        });
        await v880;
        return;
      }
      const v1037 = JSON.stringify(v846);
      if (!v883()) {
        v880 = window.Store.commitAsync({
          puts: {
            [v832]: v1037
          }
        }).then(v1046 => {
          if (v1046 === true && v878 === v1035 && v877 === v1036) {
            v876 = false;
          } else if (v1046 !== true && v878 === v1035 && v877 === v1036) {
            v882 = "日志保存失败，原记录仍在";
          }
        }).catch(v1047 => {
          v882 = v1047.message;
        }).finally(() => {
          v880 = null;
          if (v876 && !v881 && !v882) {
            v895();
          }
          v887();
        });
        await v880;
        return;
      }
      v880 = v888("write", v1037).then(async () => {
        if (v878 !== v1035) {
          return;
        }
        if (v877 === v1036) {
          v876 = false;
        }
        if ((await window.Store.commitAsync({
          removes: [v832]
        })) === false) {
          v882 = "旧日志副本未能清理";
        }
      }).catch(v1048 => {
        v882 = v1048.message;
      }).finally(() => {
        v880 = null;
        if (v876 && !v881 && !v882) {
          v895();
        }
      });
      await v880;
    }
    function v895() {
      if (!v851() || v848 || v881) {
        return;
      }
      v848 = setTimeout(v894, 2500);
    }
    function v896() {
      if (v848) {
        clearTimeout(v848);
      }
      v848 = 0;
      if (v876) {
        v894();
      }
    }
    try {
      window.addEventListener("pagehide", v896);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          v896();
        }
      });
    } catch {}
    function v897(v1049) {
      v846.unshift(v1049);
      if (v846.length > v835) {
        v846.length = v835;
      }
      if (v834()) {
        v856.set(v1049.id, v1049);
        while (v856.size > v835) {
          v856.delete(v856.keys().next().value);
        }
      }
      v876 = true;
      v877++;
      v895();
      v887();
      return v1049;
    }
    function v898({
      id: v1050,
      req = {},
      res = {},
      at = Date.now(),
      source = ""
    }) {
      const v1051 = Date.now();
      if (v881 || req.generation != null && req.generation !== v853.generation) {
        return null;
      }
      const v1052 = Number.isFinite(res.sampleAt) ? res.sampleAt : v1051;
      const v1053 = res.ok === true;
      const v1054 = res.http == null ? null : Number.isFinite(Number(res.http)) ? Number(res.http) : null;
      const v1055 = res.code == null ? "" : String(res.code);
      const v1056 = Math.max(0, Math.round(Number.isFinite(Number(res.ms)) ? Number(res.ms) : v1051 - at));
      const v1057 = String(req.method || "GET").toUpperCase();
      const v1058 = v865(req.account ?? v871());
      const v1059 = v865(req.accountId || "");
      const v1060 = req.noncurrent === true;
      const v1061 = v863(req.url);
      const v1062 = v867(req.body);
      const v1063 = v870(req.headers);
      const v1064 = v867(res.raw !== undefined ? res.raw : res.data);
      const v1065 = !v834() && v1053 && !res.stale && v1057 === "GET" ? JSON.stringify([v1050, v1058, v1059, v1060, v1057, v1061, v1054, v1055, v1062, v1064, v853.sessionId]) : "";
      const v1066 = v1065 && v875.get(v1065);
      if (v1066 && v846.includes(v1066) && v1051 - Number(v1066.firstAt ?? v1066.at) < v837) {
        v1066.n = (Number(v1066.n) || 1) + 1;
        v1066.at = Number(at) || v1051;
        v1066.responseAt = v1052;
        v1066.durMs = v1056;
        v1066.durSum = (Number(v1066.durSum) || 0) + v1056;
        v1066.durMax = Math.max(Number(v1066.durMax) || 0, v1056);
        v874.delete(v1066);
        v846.splice(v846.indexOf(v1066), 1);
        v846.unshift(v1066);
        v876 = true;
        v877++;
        v895();
        v887();
        return v1066;
      }
      const v1067 = req.sent === true || !!req.url;
      const v1068 = res.transport || (v1054 != null ? "http" : v1067 && source !== "demo" ? "failed" : "not_sent");
      const v1069 = res.business || (res.already === true ? "already" : v1053 ? "ok" : res.stale && (!v1055 || v1055 === "10000") ? v1055 === "10000" ? "ok" : "unknown" : "failed");
      const v1070 = v897({
        id: "r" + v852 + "-" + ++v849,
        kind: "request",
        category: "network",
        api: String(v1050 || ""),
        title: v873(v1050),
        method: v1057,
        url: v1061,
        reqBody: v1062,
        reqHeaders: v1063,
        status: v1054,
        code: v1055,
        message: v865(res.message || res.err || ""),
        ok: v1053,
        httpOk: v1054 != null && v1054 >= 200 && v1054 < 300,
        transport: v1068,
        business: v1069,
        disposition: res.stale === true ? "discarded" : "adopted",
        stale: res.stale === true,
        demo: String(source || res.source || "") === "demo",
        durMs: v1056,
        durSum: v1056,
        durMax: v1056,
        at: Number(at) || v1051,
        firstAt: v1051,
        responseAt: v1052,
        account: v1058,
        accountId: v1059,
        noncurrent: v1060,
        respBody: v1064,
        producer: "web",
        source: req.origin || source || "direct",
        channel: req.channel === "native" ? "native" : "web",
        sessionId: req.sessionId || v853.sessionId,
        generation: req.generation ?? v853.generation,
        runId: v865(req.runId || "")
      });
      if (v1065) {
        if (v875.size >= v835) {
          v875.clear();
        }
        v875.set(v1065, v1070);
      }
      return v1070;
    }
    function v899(v1071, {
      detail = "",
      kind = "info",
      extra = null,
      account = "",
      accountId = "",
      category = "action",
      phase = "",
      source = "foreground",
      runId = "",
      divider = false,
      sessionId = v853.sessionId,
      generation = v853.generation
    } = {}) {
      if (v881 || generation !== v853.generation) {
        return null;
      }
      return v897({
        id: "e" + v852 + "-" + ++v849,
        kind: "event",
        title: v865(v1071 || "事件"),
        detail: v865(detail || ""),
        level: String(kind || "info"),
        extra: extra == null ? "" : v867(extra),
        at: Date.now(),
        account: v865(account || v871()),
        accountId: v865(accountId),
        category: category,
        phase: phase,
        source: source,
        runId: v865(runId),
        divider: divider,
        producer: "web",
        sessionId: sessionId,
        generation: generation
      });
    }
    function v900() {
      if (v862) {
        return;
      }
      v862 = true;
      v899(v834() ? "面板页面启动" : "页面启动", {
        category: "lifecycle",
        phase: "start",
        divider: !v834(),
        account: "应用",
        detail: v834() ? "前台页面已启动，后台事件共享本次 APP 启动分段" : "本次页面打开期间开始记录应用日志"
      });
    }
    const v901 = (v1072 = {}) => {
      v893();
      v846 = v886(v846);
      return v846.filter(v1073 => {
        if (v1072.currentSession && v1073.sessionId !== v853.sessionId) {
          return false;
        }
        if (v1072.accountId && v1073.accountId !== v1072.accountId) {
          return false;
        }
        if (v1072.category && v1073.category !== v1072.category) {
          return false;
        }
        if (v1072.networkOnly && (v1073.kind !== "request" || v1073.demo || v1073.transport === "not_sent")) {
          return false;
        }
        return true;
      }).slice();
    };
    const v902 = () => v846.length;
    async function v903() {
      v893();
      if (v879) {
        await v879;
      }
      if (v882) {
        throw new Error(v882);
      }
      return v901();
    }
    function v904(v1074 = false) {
      if (!v834()) {
        return v903();
      }
      if (v859) {
        return v859;
      }
      v859 = (async () => {
        if (!v847) {
          await v903();
        } else {
          await v892(v1074);
        }
        return v901();
      })().catch(v1075 => {
        v882 = v1075.message;
        throw v1075;
      }).finally(() => {
        v859 = null;
        v887();
      });
      return v859;
    }
    async function v905() {
      if (v881 || v860) {
        return false;
      }
      if (v848) {
        clearTimeout(v848);
      }
      v848 = 0;
      v881 = true;
      v887();
      const v1076 = ++v878;
      try {
        if (v880) {
          await v880;
        }
        let v1077 = null;
        if (v851()) {
          if (v834()) {
            v1077 = JSON.parse(await v888("clear"));
          } else if (v883()) {
            await v888("clear");
          }
          if (!v834() && (await window.Store.commitAsync({
            removes: [v832]
          })) === false) {
            throw new Error("日志清理失败，原记录仍在");
          }
        }
        if (v878 === v1076) {
          v846 = [];
          v856.clear();
          v858 = 0;
          v847 = true;
          v876 = false;
          v877++;
          v875.clear();
          v882 = "";
          if (v1077) {
            if (typeof v1077.sessionId === "string" && Number.isSafeInteger(v1077.generation)) {
              v853 = {
                ...v853,
                sessionId: v1077.sessionId,
                generation: v1077.generation
              };
            }
            if (v1077.stats) {
              v857 = v1077.stats;
            }
          } else {
            v853.generation++;
          }
          v887();
        }
        return true;
      } catch (v1078) {
        v882 = v1078.message;
        return false;
      } finally {
        v881 = false;
        v887();
        if (v834() && !v882) {
          v904(true).catch(() => {});
        } else if (v862 && !v882) {
          v899("日志重新开始", {
            category: "lifecycle",
            phase: "start",
            divider: true,
            account: "应用"
          });
        }
      }
    }
    const v906 = v1079 => ({
      start: "开始",
      progress: "进行中",
      end: "结束",
      accepted: "已接受",
      submitted: "已提交系统",
      requested: "发起请求",
      dispatched: "已交给原生",
      failed: "失败",
      skipped: "已跳过",
      stopped: "已停止",
      reset: "重新开始",
      restart: "重新开始",
      attempt: "尝试发送",
      complete: "完成",
      headers: "已收到响应头",
      dispatch: "请求已发出",
      drop: "容量已达上限",
      detected: "检测到状态",
      sample: "记录采样",
      saved: "已保存",
      blocked: "被阻止",
      suppressed: "未发送",
      cancelled: "已取消",
      discarded: "已丢弃"
    })[v1079] || v1079 || "";
    const v907 = v1080 => ({
      network: "网络",
      lifecycle: "启动与运行",
      task: "任务",
      action: "用户操作",
      settings: "设置变更",
      background: "后台",
      notification: "通知",
      battery: "电量记录",
      charge: "充电状态"
    })[v1080] || "事件";
    const v908 = v1081 => {
      const v1082 = new Date(Number(v1081));
      return v1082.getFullYear() + "-" + String(v1082.getMonth() + 1).padStart(2, "0") + "-" + String(v1082.getDate()).padStart(2, "0") + " " + (String(v1082.getHours()).padStart(2, "0") + ":" + String(v1082.getMinutes()).padStart(2, "0") + ":" + String(v1082.getSeconds()).padStart(2, "0"));
    };
    function v909() {
      const v1083 = v901().slice().reverse();
      const v1084 = ["极核面板 · 应用日志", "导出时间：" + v908(Date.now()), "记录数：" + v1083.length, v911().retention, ""];
      for (const v1085 of v1083) {
        v1084.push((v1085.divider ? "========== " : "") + "[" + v908(v1085.at) + "] [" + v907(v1085.category) + "] " + (v1085.title || "事件") + (v1085.divider ? " ==========" : ""), "发起账号：" + (v1085.account || (v1085.accountId ? v1085.accountId : "应用／未知账号")) + "；来源：" + (v1085.source || v1085.producer || "未知") + "；启动分段：" + (v1085.sessionId || "旧版记录"));
        if (v1085.runId) {
          v1084.push("任务：" + v1085.runId + "；阶段：" + v906(v1085.phase));
        }
        if (v1085.kind === "request") {
          v1084.push("方式：" + (v1085.method || "GET") + "；地址：" + (v1085.url || "未发出"), "HTTP：" + (v1085.status ?? "无响应") + "；业务：" + (v1085.business || (v1085.ok ? "ok" : "failed")) + "；响应采用：" + (v1085.stale || v1085.disposition === "discarded" ? "已丢弃" : "已采用") + "；用时：" + (v1085.durMs || 0) + " ms");
          if (v1085.code) {
            v1084.push("业务码：" + v1085.code);
          }
          if (v1085.message) {
            v1084.push("说明：" + v1085.message);
          }
          if (v1085.reqHeaders) {
            v1084.push("请求头：\n" + v1085.reqHeaders);
          }
          if (v1085.reqBody) {
            v1084.push("请求体：\n" + v1085.reqBody);
          }
          if (v1085.respBody) {
            v1084.push("响应体：\n" + v1085.respBody);
          }
        } else {
          if (v1085.phase) {
            v1084.push("阶段：" + v906(v1085.phase));
          }
          if (v1085.detail) {
            v1084.push(v1085.detail);
          }
          if (v1085.extra) {
            v1084.push("附加数据：" + v1085.extra);
          }
        }
        if (v1085.stripped) {
          v1084.push("正文已按容量上限精简");
        }
        v1084.push("");
      }
      return v1084.map(v1086 => v865(v1086)).join("\n");
    }
    async function v910() {
      if (v860 || v881) {
        throw new Error("日志正在导出或清理，请稍后");
      }
      v860 = true;
      v861 = "";
      v887();
      try {
        await v903();
        if (v834()) {
          if (v848) {
            clearTimeout(v848);
          }
          v848 = 0;
          if (v880) {
            await v880;
          }
          while (v856.size && !v882) {
            await v894();
          }
          if (v882) {
            throw new Error(v882);
          }
          const v1092 = JSON.parse(await v888("export", "{}"));
          if (!v1092.filename || !v1092.uri && !v1092.path) {
            throw new Error("日志导出回执无法识别");
          }
          return v1092;
        }
        const v1087 = new Date(Date.now());
        const v1088 = v1093 => String(v1093).padStart(2, "0");
        const v1089 = "" + v1087.getFullYear() + v1088(v1087.getMonth() + 1) + v1088(v1087.getDate()) + "-" + v1088(v1087.getHours()) + v1088(v1087.getMinutes()) + v1088(v1087.getSeconds()) + "-" + String(v1087.getMilliseconds()).padStart(3, "0") + ".txt";
        if (!v833() && (window.IOSBR?.has?.("file.share") || window.IOSBR?.has?.("file.save"))) {
          const v1094 = v909();
          const v1095 = new TextEncoder().encode(v1094);
          let v1096 = "";
          for (let v1098 = 0; v1098 < v1095.length; v1098 += 32768) {
            v1096 += String.fromCharCode(...v1095.subarray(v1098, v1098 + 32768));
          }
          const v1097 = await window.IOSBR.call(window.IOSBR.has("file.share") ? "file.share" : "file.save", {
            name: v1089,
            mime: "text/plain",
            bodyB64: btoa(v1096)
          });
          if (v1097?.status === "canceled") {
            return {
              filename: v1089,
              canceled: true
            };
          }
          if (v1097?.ok === false || !["shared", "saved"].includes(v1097?.status)) {
            throw new Error(v1097?.error?.message || "没有收到 iOS 导出确认");
          }
          return {
            ...v1097,
            filename: v1089,
            ok: true,
            nativeConfirmed: true,
            userSelected: true
          };
        }
        if (typeof Blob !== "function" || typeof URL?.createObjectURL !== "function") {
          throw new Error("当前浏览器不支持文件导出");
        }
        const v1090 = URL.createObjectURL(new Blob([v909()], {
          type: "text/plain;charset=utf-8"
        }));
        const v1091 = document.createElement("a");
        try {
          v1091.href = v1090;
          v1091.download = v1089;
          v1091.click();
        } finally {
          setTimeout(() => URL.revokeObjectURL(v1090), 30000);
        }
        return {
          filename: v1089,
          downloadStarted: true,
          userSelected: true,
          path: "浏览器下载目录"
        };
      } catch (v1099) {
        v861 = v1099.message;
        throw v1099;
      } finally {
        v860 = false;
        v887();
      }
    }
    function v911() {
      return {
        ...(v857 || {}),
        count: v846.length,
        bytes: 2 + Math.max(0, v846.length - 1) + v846.reduce((v1100, v1101) => v1100 + v885(v1101), 0),
        storage: v834() ? "App 应用日志" : v851() ? "App 私有空间" : "页面内存",
        loading: !!v879,
        error: v882,
        clearing: v881,
        exporting: v860,
        lastExportError: v861,
        maxEntries: v835,
        maxBytes: v838,
        maxAgeMs: v836,
        retention: v834() ? "保留最近三天内的记录，上限 6000 条／4 MiB；超量精简或淘汰，账号和设置不受影响" : "最多三天内、1200 条、700 KiB；重复请求可能合并，超量先精简正文再淘汰，非全量保留"
      };
    }
    const v912 = v1102 => {
      if (typeof v1102 === "function") {
        v850.add(v1102);
      }
      return () => v850.delete(v1102);
    };
    return {
      request: v898,
      event: v899,
      list: v901,
      clear: v905,
      onChange: v912,
      count: v902,
      stats: v911,
      ready: v903,
      refresh: v904,
      capture: v854,
      currentSession: v855,
      startSession: v900,
      exportText: v909,
      exportLogs: v910,
      phaseText: v906,
      categoryText: v907,
      shortLabel: v873,
      KEY: v832,
      MAX_AGE_MS: v836,
      MAX_ENTRIES: v835,
      scrubUrl: v863,
      sanitize: v865
    };
  })();
  window.ACC = (() => {
    const v1103 = window.Store;
    const v1104 = "zeeho.accounts.v1";
    const v1105 = "zeeho.session.cleared.v1";
    const v1106 = "zeeho.profile.v1";
    const v1107 = 20;
    let v1108 = {
      v: 1,
      active: "",
      mode: "separate",
      rev: 0,
      accounts: []
    };
    let v1109 = false;
    let v1110 = "";
    let v1111 = null;
    let v1112 = Promise.resolve();
    function v1113(v1158) {
      const v1159 = v1112.then(v1158, v1158);
      v1112 = v1159.then(() => undefined, () => undefined);
      return v1159;
    }
    const v1114 = v1160 => JSON.parse(JSON.stringify(v1160));
    const v1115 = v1161 => String(v1161 || "").trim().replace(/^bearer\s+/i, "");
    const v1116 = v1162 => (Array.isArray(v1162) ? v1162 : []).filter(v1163 => v1163 && typeof v1163.vin === "string" && v1163.vin).map(({
      raw: v1164,
      ownerAcc: v1165,
      ownerLabel: v1166,
      isOwner: v1167,
      ...v1168
    }) => v1168);
    const v1117 = () => (!!v1103?.canCommit?.() || !!v1103?.canCommitAsync?.()) && !v1110;
    const v1118 = (v1169, v1170) => v1169 && typeof v1169.then === "function" ? v1169.then(v1170) : v1170(v1169);
    const v1119 = () => v1117() ? v1108.accounts.map(v1114) : [];
    const v1120 = v1171 => v1119().find(v1172 => v1172.id === v1171) || null;
    const v1121 = () => v1117() ? v1108.active : "";
    const v1122 = () => v1120(v1121());
    const v1123 = () => v1117() ? v1108.mode : "separate";
    const v1124 = () => v1109 && v1117() ? v1108.rev + "|" + v1108.mode + "|" + v1108.active : "";
    const v1125 = () => v1119().length;
    let v1126 = 0;
    function v1127(v1173 = null, v1174 = "待验证账号") {
      let v1175 = String(v1173?.label || (v1173 ? v1143(v1173) : v1174));
      if (v1173?.token) {
        v1175 = v1175.split(String(v1173.token)).join("[已隐藏凭据]");
      }
      return Object.freeze({
        id: String(v1173?.id || ""),
        label: v1175
      });
    }
    function v1128(v1176 = null, v1177 = "account", v1178 = null) {
      let v1179 = v1178 || {};
      try {
        if (!v1178) {
          v1179 = window.DIAG?.capture?.() || {};
        }
      } catch {}
      const v1180 = v1127(v1176);
      return {
        ...v1179,
        account: v1178?.account || v1180.label,
        accountId: v1178?.accountId ?? v1180.id,
        source: "web",
        runId: v1177 + "-" + Date.now().toString(36) + "-" + ++v1126
      };
    }
    function v1129(v1181, v1182, v1183 = {}) {
      try {
        window.DIAG?.event?.(v1181, {
          category: "action",
          phase: "end",
          kind: "info",
          ...v1182,
          ...v1183
        });
      } catch {}
    }
    function v1130(v1184) {
      if (!v1184 || v1184.v !== 1 || !Array.isArray(v1184.accounts) || v1184.accounts.length > v1107) {
        throw new Error("invalid_accounts");
      }
      const {
        primary: v1185,
        ...v1186
      } = v1184;
      const v1187 = new Set();
      const v1188 = v1184.accounts.map(v1189 => {
        if (!v1189 || typeof v1189.id !== "string" || !/^[A-Za-z0-9_-]{1,80}$/.test(v1189.id) || v1187.has(v1189.id) || !v1115(v1189.token)) {
          throw new Error("invalid_account");
        }
        v1187.add(v1189.id);
        return {
          ...v1189,
          token: v1115(v1189.token),
          uid: String(v1189.uid || ""),
          bindingUid: String(v1189.bindingUid || ""),
          label: String(v1189.label || "").slice(0, 80),
          vin: String(v1189.vin || ""),
          vehicles: v1116(v1189.vehicles),
          credentialRev: Math.max(1, Number(v1189.credentialRev) || 1),
          noSign: !!v1189.noSign,
          invalidAt: Number(v1189.invalidAt) || 0
        };
      });
      return {
        ...v1186,
        accounts: v1188,
        active: v1187.has(v1184.active) ? v1184.active : v1188[0]?.id || "",
        aggregateVin: String(v1184.aggregateVin || ""),
        legacyClosed: !!v1184.legacyClosed,
        mode: v1184.mode === "aggregate" ? "aggregate" : "separate",
        rev: Number(v1184.rev) || 0
      };
    }
    function v1131(v1190, v1191 = {}) {
      if (v1103.requiresAsync?.()) {
        return v1132(v1190, v1191);
      }
      const v1192 = v1130({
        ...v1190,
        rev: v1108.rev + 1
      });
      const v1193 = v1192.accounts.find(v1196 => v1196.id === v1192.active);
      const v1194 = {
        ...v1191.puts,
        [v1104]: JSON.stringify(v1192)
      };
      const v1195 = [...(v1191.removes || [])];
      if (v1192.legacyClosed) {
        v1194[v1105] = "1";
      }
      if (v1193) {
        v1194["zeeho.token"] = v1193.token;
      } else {
        v1195.push("zeeho.token");
      }
      if (!v1103.commit({
        puts: v1194,
        removes: v1195
      })) {
        return false;
      }
      v1108 = v1192;
      return true;
    }
    async function v1132(v1197, v1198 = {}) {
      const v1199 = v1108;
      const v1200 = v1130({
        ...v1197,
        rev: v1199.rev + 1
      });
      const v1201 = v1200.accounts.find(v1205 => v1205.id === v1200.active);
      const v1202 = {
        ...v1198.puts,
        [v1104]: JSON.stringify(v1200)
      };
      const v1203 = [...(v1198.removes || [])];
      if (v1200.legacyClosed) {
        v1202[v1105] = "1";
      }
      if (v1201) {
        v1202["zeeho.token"] = v1201.token;
      } else {
        v1203.push("zeeho.token");
      }
      const v1204 = await v1103.commitAsync({
        puts: v1202,
        removes: v1203
      });
      if (!v1204 || v1108 !== v1199) {
        return false;
      }
      v1108 = v1200;
      return true;
    }
    function v1133(v1206, v1207, v1208, v1209 = false) {
      if (v1103.requiresAsync?.() && !v1209) {
        return v1113(() => v1133(v1206, v1207, v1208, true));
      }
      const v1210 = v1116(v1207);
      const v1211 = v1120(v1206);
      if (!v1211) {
        return null;
      }
      const v1212 = v1208 === undefined ? v1211.vin : String(v1208 || "");
      const v1213 = v1210.some(v1217 => v1217.vin === v1212) ? v1212 : v1210[0]?.vin || "";
      const v1214 = {
        vehicles: v1210,
        vin: v1213,
        ...(v1213 !== v1211.vin ? {
          bindingUid: ""
        } : {})
      };
      if (!v1117() || !v1103.canCommitAsync?.()) {
        return v1134(v1206, v1214);
      }
      const v1215 = v1114(v1108);
      const v1216 = v1215.accounts.find(v1218 => v1218.id === v1206);
      if (!v1216) {
        return null;
      }
      Object.assign(v1216, v1214);
      if (JSON.stringify(v1215) === JSON.stringify(v1108)) {
        return v1120(v1206);
      }
      return v1132(v1215).then(v1219 => v1219 ? v1120(v1206) : null).catch(() => null);
    }
    function v1134(v1220, v1221, v1222 = null, v1223 = false) {
      if (v1103.requiresAsync?.() && !v1223) {
        return v1113(() => v1134(v1220, v1221, v1222, true));
      }
      if (!v1117()) {
        return null;
      }
      const v1224 = v1114(v1108);
      const v1225 = v1224.accounts.find(v1232 => v1232.id === v1220);
      if (!v1225) {
        return null;
      }
      const v1226 = {
        ...v1221
      };
      if ("token" in v1226) {
        v1226.token = v1115(v1226.token);
      }
      if ("uid" in v1226) {
        v1226.uid = String(v1226.uid || "");
      }
      if ("vehicles" in v1226) {
        v1226.vehicles = v1116(v1226.vehicles);
      }
      delete v1226.id;
      delete v1226.credentialRev;
      const v1227 = "token" in v1226 && v1226.token !== v1225.token || "uid" in v1226 && v1226.uid !== v1225.uid;
      if (v1227 && v1224.accounts.some(v1233 => v1233.id !== v1220 && ("token" in v1226 && v1233.token === v1226.token || "uid" in v1226 && v1226.uid && v1233.uid === v1226.uid))) {
        return null;
      }
      if (v1227) {
        v1225.credentialRev++;
      }
      const v1228 = ["token", "uid", "label", "noSign"].filter(v1234 => v1234 in v1226 && v1226[v1234] !== v1225[v1234]);
      const v1229 = "invalidAt" in v1226 && !!v1226.invalidAt !== !!v1225.invalidAt;
      const v1230 = v1228.length || v1229 ? v1128(v1225, "account", v1222) : null;
      const v1231 = {
        changed: v1228.filter(v1235 => v1235 !== "token"),
        credentialsChanged: v1227,
        ...(v1228.includes("label") ? {
          labelChanged: true,
          labelLength: String(v1226.label || "").length
        } : {}),
        ...(v1228.includes("noSign") ? {
          participates: !v1226.noSign
        } : {})
      };
      Object.assign(v1225, v1226);
      if (!v1225.token) {
        return null;
      }
      if (JSON.stringify(v1224) === JSON.stringify(v1108)) {
        return v1120(v1220);
      }
      return v1118(v1131(v1224), v1236 => {
        if (v1228.length) {
          v1129(v1236 ? "账号资料已保存" : "账号资料保存失败", v1230, {
            category: "settings",
            phase: v1236 ? "end" : "failed",
            kind: v1236 ? "ok" : "err",
            extra: v1231
          });
        }
        if (v1229) {
          v1129(v1236 ? v1225.invalidAt ? "账号登录态标记失效" : "账号登录态失效标记已解除" : "账号登录态标记保存失败", v1230, {
            category: "lifecycle",
            phase: v1236 ? "end" : "failed",
            kind: v1236 ? v1225.invalidAt ? "warn" : "ok" : "err"
          });
        }
        if (v1236) {
          return v1120(v1220);
        } else {
          return null;
        }
      });
    }
    const v1135 = v1237 => v1134(v1121(), v1237);
    function v1136({
      vin: v1238,
      vehicles: v1239,
      uid: v1240,
      bindingUid: v1241,
      authPromptedFor: v1242,
      aggregateVin: v1243
    } = {}, {
      async = false,
      queued = false,
      captured = null
    } = {}) {
      if (v1103.requiresAsync?.() && !queued) {
        const v1249 = v1140(v1121());
        return v1113(() => v1136({
          vin: v1238,
          vehicles: v1239,
          uid: v1240,
          bindingUid: v1241,
          authPromptedFor: v1242,
          aggregateVin: v1243
        }, {
          async: true,
          queued: true,
          captured: v1249
        }));
      }
      if (v1103.requiresAsync?.() && (!captured || !v1141(captured) || v1108.active !== captured.id)) {
        return null;
      }
      const v1244 = {};
      if (v1238 !== undefined) {
        v1244.vin = String(v1238 || "");
      }
      if (v1239 !== undefined) {
        v1244.vehicles = v1116(v1239);
      }
      if (v1240 !== undefined) {
        v1244.uid = String(v1240 || "");
      }
      if (v1241 !== undefined) {
        v1244.bindingUid = String(v1241 || "");
      }
      if (v1242 !== undefined) {
        v1244.authPromptedFor = String(v1242 || "");
      }
      const v1245 = v1114(v1108);
      const v1246 = v1245.accounts.find(v1250 => v1250.id === (v1103.requiresAsync?.() ? captured.id : v1108.active));
      if (!v1246) {
        return null;
      }
      const v1247 = v1244.uid !== undefined && v1244.uid !== v1246.uid;
      const v1248 = v1247 ? v1128(v1246, "account-identity") : null;
      if (v1247) {
        if (v1244.uid && v1245.accounts.some(v1251 => v1251.id !== v1246.id && v1251.uid === v1244.uid)) {
          return null;
        }
        v1246.credentialRev++;
      }
      Object.assign(v1246, v1244);
      if (v1243 !== undefined) {
        v1245.aggregateVin = String(v1243 || "");
      }
      if (JSON.stringify(v1245) === JSON.stringify(v1108)) {
        return v1120(v1246.id);
      }
      if (async && !v1247 && v1103.canCommitAsync?.()) {
        return v1132(v1245).then(v1252 => v1252 ? v1120(v1246.id) : null).catch(() => null);
      }
      return v1118(v1131(v1245), v1253 => {
        if (v1247) {
          v1129(v1253 ? "账号标识已保存" : "账号标识保存失败", v1248, {
            category: "settings",
            kind: v1253 ? "ok" : "err",
            extra: {
              identityChanged: true
            }
          });
        }
        if (v1253) {
          return v1120(v1246.id);
        } else {
          return null;
        }
      });
    }
    const v1137 = () => v1117() ? String(v1108.aggregateVin || "") : "";
    function v1138(v1254, v1255 = false) {
      if (v1103.requiresAsync?.() && !v1255) {
        return v1113(() => v1138(v1254, true));
      }
      const v1256 = v1120(v1254);
      if (!v1256) {
        return false;
      }
      if (v1254 === v1108.active) {
        return true;
      }
      const v1257 = v1128(v1256);
      const v1258 = v1108.active;
      return v1118(v1131({
        ...v1108,
        active: v1254
      }), v1259 => {
        v1129(v1259 ? "当前账号已切换" : "账号切换保存失败", v1257, {
          phase: v1259 ? "end" : "failed",
          kind: v1259 ? "ok" : "err",
          extra: {
            previousId: v1258
          }
        });
        return v1259;
      });
    }
    const v1139 = (v1260, v1261 = false) => {
      if (v1103.requiresAsync?.() && !v1261) {
        return v1113(() => v1139(v1260, true));
      }
      if (!["separate", "aggregate"].includes(v1260) || !v1117()) {
        return false;
      }
      if (v1260 === v1108.mode) {
        return true;
      }
      const v1262 = v1128(v1122());
      const v1263 = v1108.mode;
      return v1118(v1131({
        ...v1108,
        mode: v1260
      }), v1264 => {
        v1129(v1264 ? "账号展示模式已保存" : "账号展示模式保存失败", v1262, {
          category: "settings",
          phase: v1264 ? "end" : "failed",
          kind: v1264 ? "ok" : "err",
          extra: {
            previous: v1263,
            value: v1260
          }
        });
        return v1264;
      });
    };
    const v1140 = v1265 => {
      const v1266 = v1120(v1265);
      if (v1266) {
        return Object.freeze({
          ...v1266,
          label: v1127(v1266).label
        });
      } else {
        return null;
      }
    };
    const v1141 = v1267 => {
      const v1268 = v1267 && v1120(v1267.id);
      return !!v1268 && v1268.token === v1267.token && v1268.uid === v1267.uid && v1268.credentialRev === v1267.credentialRev;
    };
    const v1142 = v1269 => {
      const v1270 = String(v1269 || "");
      if (v1270) {
        if (v1270.length > 6) {
          return v1270.slice(0, 4) + "…" + v1270.slice(-2);
        } else {
          return v1270;
        }
      } else {
        return "";
      }
    };
    function v1143(v1271) {
      if (!v1271) {
        return "";
      }
      return v1271.label || v1142(v1271.uid) || "账号 " + (Math.max(0, v1108.accounts.findIndex(v1272 => v1272.id === v1271.id)) + 1);
    }
    async function v1144(v1273, v1274 = () => true, v1275 = null, v1276 = null) {
      const v1277 = v1127(v1275);
      const v1278 = v1128(v1277, "account-verify", v1276);
      v1129("账号验证开始", v1278, {
        phase: "start"
      });
      try {
        const v1279 = await window.API.call("vehicle_list", {}, {
          token: v1115(v1273),
          force: true,
          latch: false,
          scope: v1277,
          logScope: v1278,
          runId: v1278.runId,
          isLatest: v1274
        });
        const v1280 = !!v1279.stale || !v1274();
        const v1281 = v1279.ok && Array.isArray(v1279.data);
        v1129(v1280 ? "账号验证结果已丢弃" : v1281 ? "账号验证通过" : "账号验证失败", v1278, {
          phase: v1280 ? "cancelled" : "end",
          kind: v1280 ? "warn" : v1281 ? "ok" : "err",
          extra: {
            accepted: !v1280 && !!v1281,
            vehicles: v1281 ? v1279.data.length : 0
          }
        });
        return v1279;
      } catch (v1282) {
        v1129("账号验证异常", v1278, {
          phase: "failed",
          kind: "err"
        });
        throw v1282;
      }
    }
    async function v1145({
      token: v1283,
      uid = "",
      label = ""
    } = {}, v1284 = {}) {
      if (v1103.requiresAsync?.() && !v1284.queued) {
        return v1113(() => v1145({
          token: v1283,
          uid: uid,
          label: label
        }, {
          ...v1284,
          queued: true
        }));
      }
      v1283 = v1115(v1283);
      const v1285 = v1127({
        label: String(label || "").trim().slice(0, 80) || "待验证账号",
        token: v1283
      });
      const v1286 = v1128(v1285, "account-add");
      v1129("账号添加开始", v1286, {
        phase: "start"
      });
      const v1287 = (v1293, v1294 = "") => {
        v1129(v1293.stale ? "账号添加结果已丢弃" : v1293.ok ? v1293.existing ? "账号已存在，未重复添加" : "账号已添加" : "账号未添加", {
          ...v1286,
          accountId: String(v1293.account?.id || v1286.accountId || "")
        }, {
          phase: v1293.stale ? "cancelled" : "end",
          kind: v1293.stale ? "warn" : v1293.ok ? "ok" : "err",
          extra: {
            existing: !!v1293.existing,
            reason: v1294
          }
        });
        return v1293;
      };
      if (!v1117()) {
        return v1287({
          ok: false,
          err: v1110 || "请更新 App 后使用多账号。"
        }, "storage_unavailable");
      }
      if (!v1283) {
        return v1287({
          ok: false,
          err: "请填写 token。"
        }, "missing_credentials");
      }
      const v1288 = v1119().find(v1295 => v1295.token === v1283);
      if (v1288) {
        return v1287({
          ok: true,
          account: v1288,
          existing: true
        });
      }
      if (v1125() >= v1107) {
        return v1287({
          ok: false,
          err: "最多保存 " + v1107 + " 个账号。"
        }, "account_limit");
      }
      let v1289;
      try {
        v1289 = v1284.verified || (await v1144(v1283, v1284.isLatest, v1285, v1286));
      } catch (v1296) {
        v1129("账号添加验证异常", v1286, {
          phase: "failed",
          kind: "err"
        });
        throw v1296;
      }
      if (v1284.isLatest && !v1284.isLatest()) {
        return v1287({
          ok: false,
          stale: true
        });
      }
      if (!v1289.ok || !Array.isArray(v1289.data)) {
        return v1287({
          ok: false,
          err: window.API.isAuthError(v1289.http, v1289.code, v1289.message) ? "token 无效或已过期。" : v1289.message || "车辆列表未能验证，请重试。"
        }, "verification_failed");
      }
      const v1290 = v1119().find(v1297 => v1297.token === v1283 || uid && v1297.uid === String(uid));
      if (v1290) {
        return v1287({
          ok: true,
          account: v1290,
          existing: true
        });
      }
      if (v1125() >= v1107) {
        return v1287({
          ok: false,
          err: "最多保存 " + v1107 + " 个账号。"
        }, "account_limit");
      }
      const v1291 = v1114(v1108);
      const v1292 = {
        id: "a_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10),
        token: v1283,
        uid: String(uid || ""),
        bindingUid: "",
        label: String(label || "").trim().slice(0, 80),
        vin: "",
        vehicles: v1116(window.MODEL.vehicles(v1289)),
        credentialRev: 1,
        addedAt: Date.now(),
        invalidAt: 0,
        invalidMsg: "",
        noSign: false
      };
      v1292.vin = v1292.vehicles[0]?.vin || "";
      v1291.accounts.push(v1292);
      if (!v1291.active) {
        v1291.active = v1292.id;
      }
      if (!(await v1131(v1291))) {
        return v1287({
          ok: false,
          err: "账号未能保存，请检查 App 存储后重试。"
        }, "storage_failed");
      }
      return v1287({
        ok: true,
        account: v1120(v1292.id)
      });
    }
    function v1146(v1298) {
      const v1299 = [...new Set([...v1103.keys().filter(v1301 => v1301.endsWith("@" + v1298)), ...["zeeho.homecache.v1", "zeeho.chg.v1", "zeeho.chg.clear.v2", "zeeho.cap.v1", "zeeho.lastcharge.dismiss.v1"].map(v1302 => v1103.ns(v1302, v1298))])];
      const v1300 = v1120(v1298)?.uid;
      if (v1300) {
        v1299.push(v1103.ns(v1106, v1298) + "@" + v1300);
      }
      return v1299;
    }
    function v1147(v1303, v1304 = false) {
      if (v1103.requiresAsync?.() && !v1304) {
        return v1113(() => v1147(v1303, true));
      }
      if (!v1120(v1303)) {
        return {
          ok: false
        };
      }
      const v1305 = v1114(v1108);
      const v1306 = v1305.accounts.find(v1310 => v1310.id === v1303);
      const v1307 = v1108.active === v1303;
      v1305.accounts = v1305.accounts.filter(v1311 => v1311.id !== v1303);
      if (v1307) {
        v1305.active = v1305.accounts[0]?.id || "";
      }
      const v1308 = v1146(v1306.id);
      v1305.legacyClosed = true;
      if (!v1305.accounts.length) {
        v1305.aggregateVin = "";
        v1308.push("zeeho.session.v1");
      }
      const v1309 = v1128(v1306, "account-delete");
      return v1118(v1131(v1305, {
        removes: v1308
      }), v1312 => {
        if (!v1312) {
          v1129("账号删除保存失败", v1309, {
            phase: "failed",
            kind: "err"
          });
          return {
            ok: false
          };
        }
        v1129("账号已删除", v1309, {
          kind: "ok",
          extra: {
            wasActive: v1307,
            switchedTo: v1305.active,
            emptied: !v1305.accounts.length
          }
        });
        return {
          ok: true,
          wasActive: v1307,
          switchedTo: v1305.active,
          emptied: !v1305.accounts.length
        };
      });
    }
    function v1148(v1313 = false) {
      if (v1103.requiresAsync?.() && !v1313) {
        return v1113(() => v1148(true));
      }
      if (!v1117()) {
        return false;
      }
      const v1314 = v1128(v1122(), "account-clear");
      const v1315 = v1108.accounts.length;
      const v1316 = new Set(v1108.accounts.map(v1317 => v1317.id));
      return v1118(v1131({
        v: 1,
        active: "",
        mode: "separate",
        rev: v1108.rev,
        accounts: [],
        aggregateVin: "",
        legacyClosed: true
      }, {
        removes: ["zeeho.session.v1", ...[...v1316].flatMap(v1146)]
      }), v1318 => {
        v1129(v1318 ? "账号池已清空" : "账号池清空失败", v1314, {
          kind: v1318 ? "ok" : "err",
          phase: v1318 ? "end" : "failed",
          extra: {
            count: v1315
          }
        });
        return v1318;
      });
    }
    function v1149(v1319, v1320) {
      const v1321 = v1319.vehicles.find(v1322 => v1322.vin === v1320);
      if (v1321 && v1321.shared) {
        return 1;
      } else {
        return 0;
      }
    }
    function v1150(v1323) {
      let v1324 = null;
      let v1325 = 2;
      for (const v1326 of v1119()) {
        if (!v1326.vehicles.some(v1328 => v1328.vin === v1323)) {
          continue;
        }
        const v1327 = v1149(v1326, v1323);
        if (v1327 < v1325) {
          v1324 = v1326;
          v1325 = v1327;
        }
      }
      return v1324;
    }
    function v1151() {
      const v1329 = new Set();
      const v1330 = [];
      const v1331 = v1119();
      for (const v1332 of new Set(v1331.flatMap(v1333 => v1333.vehicles.map(v1334 => v1334.vin)))) {
        let v1335 = null;
        let v1336 = 2;
        for (const v1337 of v1331) {
          const v1338 = v1337.vehicles.find(v1340 => v1340.vin === v1332);
          if (!v1338) {
            continue;
          }
          const v1339 = v1338.shared ? 1 : 0;
          if (v1339 < v1336) {
            v1335 = {
              account: v1337,
              vehicle: v1338
            };
            v1336 = v1339;
          }
        }
        if (!v1335 || v1329.has(v1332)) {
          continue;
        }
        v1329.add(v1332);
        v1330.push({
          ...v1335.vehicle,
          ownerAcc: v1335.account.id,
          ownerLabel: v1143(v1335.account),
          isOwner: v1336 === 0
        });
      }
      return v1330;
    }
    function v1152() {
      if (!v1117()) {
        return Promise.resolve(false);
      }
      if (v1111) {
        return v1111;
      }
      const v1341 = v1119().filter(v1343 => v1343.id !== v1108.active && !v1343.invalidAt).map(v1344 => v1140(v1344.id));
      const v1342 = v1128(v1122(), "account-refresh");
      v1129("其他账号车辆验证开始", v1342, {
        phase: "start",
        extra: {
          accounts: v1341.length
        }
      });
      v1111 = (async () => {
        let v1345 = false;
        for (const v1346 of v1341) {
          if (!v1141(v1346)) {
            continue;
          }
          const v1347 = {
            ...v1342,
            account: v1346.label,
            accountId: v1346.id
          };
          const v1348 = await v1144(v1346.token, () => v1141(v1346), v1346, v1347);
          if (!v1141(v1346) || v1348.stale) {
            continue;
          }
          if (v1348.ok && Array.isArray(v1348.data)) {
            const v1349 = v1116(window.MODEL.vehicles(v1348));
            const v1350 = v1120(v1346.id);
            if (JSON.stringify(v1349) !== JSON.stringify(v1350.vehicles)) {
              v1345 = !!(await v1134(v1346.id, {
                vehicles: v1349,
                vin: v1349.some(v1351 => v1351.vin === v1350.vin) ? v1350.vin : v1349[0]?.vin || ""
              }, v1347)) || v1345;
            }
          } else if (window.API.isAuthError(v1348.http, v1348.code, v1348.message)) {
            v1345 = !!(await v1134(v1346.id, {
              invalidAt: Date.now(),
              invalidMsg: "token 已失效"
            }, v1347)) || v1345;
          }
        }
        v1129("其他账号车辆验证结束", v1342, {
          phase: "end",
          extra: {
            changed: v1345,
            accounts: v1341.length
          }
        });
        return v1345;
      })().catch(v1352 => {
        v1129("其他账号车辆验证异常", v1342, {
          phase: "failed",
          kind: "err"
        });
        throw v1352;
      }).finally(() => {
        v1111 = null;
      });
      return v1111;
    }
    function v1153(v1353, v1354, v1355, v1356) {
      if (!window.MODEL.validSignDay(v1356) || v1356 > window.MODEL.beijingDay()) {
        return null;
      }
      const v1357 = v1120(v1353);
      if (!v1357 || window.MODEL.validSignDay(v1357.signDate) && v1357.signDate > v1356) {
        return null;
      }
      return v1134(v1353, {
        signDate: v1356,
        signOk: !!v1354,
        signMsg: String(v1355 || "").slice(0, 100)
      });
    }
    const v1154 = (v1358, v1359, v1360 = null) => v1134(v1358, {
      invalidAt: Date.now(),
      invalidMsg: String(v1359 || "token 已失效").slice(0, 100)
    }, v1360);
    const v1155 = v1361 => v1134(v1361, {
      invalidAt: 0,
      invalidMsg: ""
    });
    function v1156(v1362 = {}) {
      if (!v1103.canCommit() && !v1103.canCommitAsync?.() || v1108.legacyClosed || v1103.get(v1105) === "1" || Date.now() >= new Date("2026-12-01T00:00:00+08:00").getTime()) {
        return;
      }
      const v1363 = v1114(v1108);
      const v1364 = {};
      const v1365 = [];
      const v1366 = {};
      const v1367 = v1115(v1103.get("zeeho.token") || v1103.legacyGet("zeeho.token"));
      if (!v1363.accounts.length && v1367) {
        v1363.accounts.push({
          id: "a1",
          token: v1367,
          uid: String(v1362.profileUid || ""),
          bindingUid: String(v1362.bindingUid || ""),
          label: "",
          vin: String(v1362.vin || ""),
          vehicles: v1116(v1362.vehicles),
          credentialRev: 1,
          addedAt: Date.now(),
          invalidAt: 0,
          noSign: false
        });
        v1363.active = "a1";
      }
      const v1368 = v1363.accounts.find(v1373 => v1373.id === "a1") || (v1363.accounts.length === 1 ? v1363.accounts[0] : null);
      const v1369 = ["zeeho.chg.v1", "zeeho.chgstop.v1", "zeeho.msgread.v1", "zeeho.lastcharge.dismiss.v1", "zeeho.tasks", "zeeho.prize.v1", "zeeho.homecache.v1"];
      function v1370(v1374, v1375, v1376) {
        if (v1375 === null || !v1376) {
          return false;
        }
        const v1377 = v1103.ns(v1374.split("@")[0], v1376.id);
        if (v1377 === v1374) {
          return true;
        }
        if (v1103.get(v1377) !== null || v1364[v1377] !== undefined) {
          return true;
        }
        if (v1374.split("@")[0] === "zeeho.homecache.v1") {
          try {
            const v1378 = JSON.parse(v1375);
            if (v1378 && v1378.home) {
              v1375 = JSON.stringify({
                ...v1378,
                v: 2,
                acc: v1376.id
              });
            }
          } catch {
            return false;
          }
        }
        if (v1374.split("@")[0] === "zeeho.chgstop.v1") {
          try {
            const v1379 = JSON.parse(v1375);
            if (v1379 && v1379.at) {
              v1375 = JSON.stringify({
                ...v1379,
                vin: v1379.vin || v1376.vin
              });
            }
          } catch {
            return false;
          }
        }
        v1364[v1377] = v1375;
        return true;
      }
      for (const v1380 of v1363.accounts) {
        for (const v1381 of v1369) {
          if (!v1380.uid) {
            continue;
          }
          const v1382 = v1381 + "@" + v1380.uid;
          if (v1382 === v1103.ns(v1381, v1380.id)) {
            continue;
          }
          const v1383 = v1363.accounts.filter(v1385 => v1385.uid === v1380.uid);
          if (v1383.length !== 1) {
            continue;
          }
          const v1384 = v1103.get(v1382);
          if (v1384 !== null && v1370(v1382, v1384, v1380)) {
            v1365.push(v1382);
          }
        }
      }
      for (const v1386 of v1369) {
        const v1387 = v1103.get(v1386);
        if (v1387 !== null && v1370(v1386, v1387, v1368)) {
          v1365.push(v1386);
        }
        const v1388 = v1103.legacyGet(v1386);
        let v1389 = v1368;
        const v1390 = v1115(v1103.legacyGet("zeeho.token"));
        if (v1390) {
          v1389 = v1363.accounts.find(v1391 => v1391.token === v1390) || null;
        }
        if (v1388 !== null && v1370(v1386, v1388, v1389)) {
          v1366[v1386] = v1388;
        }
      }
      const v1371 = v1103.legacyGet("zeeho.token");
      if (v1371 !== null && v1363.accounts.some(v1392 => v1392.token === v1115(v1371))) {
        v1366["zeeho.token"] = v1371;
      }
      const v1372 = JSON.stringify(v1363) !== JSON.stringify(v1108) || Object.keys(v1364).length || v1365.length || Object.keys(v1366).length;
      if (v1372) {
        return v1118(v1131(v1363, {
          puts: v1364,
          removes: v1365
        }), v1393 => {
          if (!v1393) {
            throw new Error("migration_failed");
          }
          v1103.finishMigration(v1366);
        });
      }
      v1103.finishMigration(v1366);
    }
    function v1157(v1394) {
      v1109 = false;
      v1110 = "";
      if (!v1103?.canCommit?.() && !v1103?.canCommitAsync?.()) {
        v1109 = true;
        return;
      }
      try {
        const v1395 = v1103.get(v1104);
        v1108 = v1395 === null ? {
          v: 1,
          active: "",
          mode: "separate",
          rev: 0,
          accounts: []
        } : v1130(JSON.parse(v1395));
        const v1396 = v1156(v1394);
        if (v1396 && typeof v1396.then === "function") {
          return v1396.catch(() => {
            v1110 = "账号数据未能读取或迁移，请重启 App 后重试；旧数据没有被删除。";
          }).finally(() => {
            v1109 = true;
          });
        }
      } catch {
        v1110 = "账号数据未能读取或迁移，请重启 App 后重试；旧数据没有被删除。";
      }
      v1109 = true;
    }
    return {
      KEY: v1104,
      init: v1157,
      avail: v1117,
      ready: () => v1109,
      error: () => v1110,
      list: v1119,
      count: v1125,
      active: v1122,
      activeId: v1121,
      byId: v1120,
      mode: v1123,
      aggregateVin: v1137,
      rev: () => v1108.rev,
      sig: v1124,
      snapshot: v1140,
      current: v1141,
      labelOf: v1143,
      maskId: v1142,
      update: v1134,
      updateActive: v1135,
      setMode: v1139,
      setActive: v1138,
      addToken: v1145,
      remove: v1147,
      clearAll: v1148,
      scratch: v1136,
      cacheVehicles: v1133,
      verify: v1144,
      mergedVehicles: v1151,
      ownerOfVin: v1150,
      refreshOthers: v1152,
      recordSign: v1153,
      markInvalid: v1154,
      clearInvalid: v1155
    };
  })();
  window.loadPanelMap = function () {
    if (window.L) {
      return window.L;
    }
    window.__panelPublicDependencies[1].call(this);
    return window.L;
  };
})();
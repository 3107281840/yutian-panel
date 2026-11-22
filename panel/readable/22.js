(() => {
  (() => {
    const v1 = window.APP;
    const v2 = v1.state;
    const v3 = v1.$;
    const v4 = v1.phone;
    const v5 = v1.scroll;
    const v6 = window.MODEL;
    const v7 = window.UI;
    const v8 = window.ZEEHO_THEME;
    const v9 = v6.esc;
    const v10 = window.API;
    const v11 = window.CHG;
    const v12 = window.TASKS;
    const v13 = () => window.PLATFORM?.preview?.() === true;
    const v14 = () => v1.inShell() ? "APP 设置" : "账号设置";
    const v15 = {
      step: "phone",
      phone: "",
      code: "",
      captcha: null,
      busy: false,
      err: "",
      tip: "",
      t0: 0,
      lastTrack: null
    };
    let v16 = {
      mode: "auto",
      targetId: ""
    };
    let v17 = "token";
    let v18 = {
      token: ""
    };
    let v19 = false;
    let v20 = 0;
    function v21(v119 = {}) {
      while (v7.currentSheet("debug") && v7.currentSheet() !== v7.currentSheet("debug")) {
        v7.back();
      }
      const v120 = v7.currentSheet("debug");
      if (v120) {
        v7.closeSheet(v120);
      }
      if (v71() && !v7.currentSheet("accounts")) {
        v117();
      }
      const v121 = v71() ? window.ACC.byId(v119.targetId || window.ACC.activeId()) : null;
      v16 = {
        mode: v119.mode || "auto",
        targetId: v119.targetId || v121?.id || ""
      };
      v17 = "token";
      v18 = {
        token: v16.mode === "add" ? "" : v121?.token || v10.token || v10.loadToken() || ""
      };
      v19 = false;
      v20++;
      Object.assign(v15, {
        step: "phone",
        phone: "",
        code: "",
        captcha: null,
        busy: false,
        err: "",
        tip: "",
        lastTrack: null
      });
      v70();
    }
    const v22 = () => {
      const v122 = v20;
      return {
        ...v16,
        isLatest: () => v122 === v20,
        onCommitted: () => {
          if (v122 === v20) {
            v19 = true;
          }
        }
      };
    };
    const v23 = () => !v1.isIOS?.() && v1.inShell() && typeof window.ZeehoShell?.startCapture === "function";
    function v24() {
      if (v17 !== "token") {
        return;
      }
      if (v3("tokenInput")) {
        v18.token = v3("tokenInput").value;
      }
    }
    function v25(v123) {
      if (!["token", "phone"].includes(v123)) {
        return;
      }
      if (v15.busy) {
        v7.toast(v4(), "请等待当前登录请求结束");
        return;
      }
      const v124 = v3("tokenInput");
      if (v124) {
        v18.token = v124.value;
      }
      if (v3("phoneInput")) {
        v15.phone = v3("phoneInput").value;
      }
      if (v3("codeInput")) {
        v15.code = v3("codeInput").value;
      }
      if (v17 === v123) {
        return;
      }
      v17 = v123;
      v20++;
      v70();
    }
    const v26 = {
      timer: null,
      st: null,
      guideShown: false,
      successShown: false,
      manualShown: false,
      busy: false,
      startedAt: 0
    };
    const v27 = 720;
    const v28 = 360;
    const v29 = 110;
    const v30 = "86";
    const v31 = "strip";
    function v32(v125) {
      return new Promise(v126 => {
        const v127 = new Image();
        v127.onload = () => {
          try {
            const v128 = document.createElement("canvas");
            v128.width = v127.naturalWidth;
            v128.height = v127.naturalHeight;
            const v129 = v128.getContext("2d");
            v129.drawImage(v127, 0, 0);
            const v130 = v129.getImageData(0, 0, v128.width, v128.height).data;
            let v131 = 1000000000;
            let v132 = 1000000000;
            let v133 = -1;
            let v134 = -1;
            for (let v135 = 0; v135 < v128.height; v135++) {
              for (let v136 = 0; v136 < v128.width; v136++) {
                if (v130[(v135 * v128.width + v136) * 4 + 3] > 16) {
                  if (v136 < v131) {
                    v131 = v136;
                  }
                  if (v136 > v133) {
                    v133 = v136;
                  }
                  if (v135 < v132) {
                    v132 = v135;
                  }
                  if (v135 > v134) {
                    v134 = v135;
                  }
                }
              }
            }
            v126(v133 < 0 ? null : {
              x: v131,
              y: v132,
              imgW: v128.width
            });
          } catch {
            v126(null);
          }
        };
        v127.onerror = () => v126(null);
        v127.src = v125;
      });
    }
    async function v33(v137) {
      const v138 = v137.querySelector("#capWrap");
      const v139 = v137.querySelector("#capStage");
      const v140 = v137.querySelector("#capPiece");
      const v141 = v137.querySelector("#capBarFill");
      const v142 = v137.querySelector("#capBarTxt");
      if (!v138 || !v139 || !v140 || !v15.captcha) {
        return;
      }
      const v143 = v20;
      const v144 = await v32(v15.captcha.sliderImage);
      if (!v138.isConnected || v143 !== v20) {
        return;
      }
      const v145 = Math.min(1, (v138.clientWidth || 320) / v27);
      v139.style.transform = "scale(" + v145 + ")";
      v138.style.height = Math.round(v28 * v145) + "px";
      const v146 = v144 ? v144.x : 0;
      const v147 = v144 ? v144.y : 0;
      const v148 = v144 ? v144.imgW : v29;
      const v149 = Math.max(0, v27 - v148);
      let v150 = 0;
      let v151 = 0;
      let v152 = false;
      let v153 = 0;
      let v154 = [];
      let v155 = 0;
      const v156 = () => {
        v140.style.left = v150 + "px";
        if (v141) {
          v141.style.width = (v149 ? v150 / v149 * 100 : 0) + "%";
        }
      };
      const v157 = v161 => {
        if (v142) {
          v142.textContent = v161;
        }
      };
      const v158 = v162 => {
        const v163 = v139.getBoundingClientRect();
        return (v162 - v163.left) / v145;
      };
      const v159 = v164 => v154.push({
        t: Math.round(performance.now() - v153),
        type: v164,
        x: Math.round(v31 === "piece" ? v150 + v146 : v150),
        y: Math.round(v147)
      });
      v156();
      const v160 = async () => {
        if (v143 !== v20 || !v138.isConnected) {
          return;
        }
        v15.busy = true;
        v157("正在校验…");
        const v165 = {
          bgImageWidth: v27,
          bgImageHeight: v28,
          sliderImageWidth: v15.captcha.sliderImageWidth ?? v29,
          sliderImageHeight: v15.captcha.sliderImageHeight ?? v28,
          startSlidingTime: String(v15.t0 || Date.now()),
          endSlidingTime: String(Date.now()),
          trackList: v154
        };
        v15.lastTrack = v165;
        const v166 = await v10.callPublic("auth_sms", {}, {
          isLatest: () => v143 === v20,
          body: {
            areaCode: v30,
            phone: v15.phone,
            imageCaptchaId: v15.captcha.imageCaptchaId,
            imageCaptchaTrackBO: v165
          }
        });
        if (v143 !== v20) {
          return;
        }
        v15.busy = false;
        if (v166.ok) {
          v15.step = "code";
          v15.err = "";
          v15.tip = "验证码已发到 " + v15.phone;
          v70();
          return;
        }
        v15.err = "滑动没通过：" + (v166.message || v166.code || v166.err || "服务端没给原因");
        await v34(v15.err);
      };
      v138.addEventListener("pointerdown", v167 => {
        if (v152 || v15.busy) {
          return;
        }
        v152 = true;
        v153 = performance.now();
        v155 = v153;
        v154 = [];
        v151 = v158(v167.clientX) - v150;
        v15.t0 = Date.now();
        v159("down");
        v157("拖到缺口处，松手提交");
        try {
          v138.setPointerCapture(v167.pointerId);
        } catch {}
        v167.preventDefault();
      });
      v138.addEventListener("pointermove", v168 => {
        if (!v152) {
          return;
        }
        v150 = Math.max(0, Math.min(v149, v158(v168.clientX) - v151));
        v156();
        const v169 = performance.now();
        if (v169 - v155 > 16) {
          v155 = v169;
          v159("move");
        }
        v168.preventDefault();
      });
      v138.addEventListener("pointerup", v170 => {
        if (!v152) {
          return;
        }
        v152 = false;
        v150 = Math.max(0, Math.min(v149, v158(v170.clientX) - v151));
        v156();
        v159("up");
        v160();
      });
      v138.addEventListener("pointercancel", () => {
        v152 = false;
      });
    }
    async function v34(v171 = "") {
      if (v13()) {
        return window.PLATFORM.unavailable("手机号登录");
      }
      if (v15.busy) {
        return;
      }
      const v172 = v20;
      v15.busy = true;
      v15.tip = "";
      v15.err = v171;
      v15.captcha = null;
      if (v15.step !== "slide") {
        v70();
      }
      const v173 = await v10.callPublic("auth_captcha", {}, {
        body: {
          phone: v15.phone
        },
        isLatest: () => v172 === v20
      });
      if (v172 !== v20) {
        return;
      }
      v15.busy = false;
      if (!v173.ok || !v173.data?.backgroundImage || !v173.data?.sliderImage) {
        v15.step = "phone";
        v15.err = "取图形验证码失败：" + (v173.message || v173.err || "响应里没有图片");
      } else {
        v15.captcha = v173.data;
        v15.step = "slide";
      }
      v70();
    }
    async function v35() {
      if (v13()) {
        return window.PLATFORM.unavailable("手机号登录");
      }
      if (v15.busy) {
        return;
      }
      const v174 = v20;
      v15.busy = true;
      v15.err = "";
      v70();
      const v175 = v2.data.home?.loc;
      const v176 = !!v175?.has && v175.lat != null && v175.lng != null;
      const v177 = await v10.callPublic("auth_login", {}, {
        clientAuth: true,
        appLike: true,
        isLatest: () => v174 === v20,
        body: {
          phone: v15.phone,
          authCode: v15.code,
          province: "",
          city: "",
          latitude: v176 ? String(v175.lat) : "",
          longitude: v176 ? String(v175.lng) : "",
          referralCode: ""
        }
      });
      if (v174 !== v20) {
        return;
      }
      v15.busy = false;
      const v178 = v177.data || {};
      const v179 = String(v178.tokenInfo?.access_token || v178.access_token || v178.token || "").replace(/^bearer\s+/i, "");
      if (!v177.ok || !v179) {
        v15.err = v177.ok ? "登录返回里没有 token：" + JSON.stringify(v178).slice(0, 240) : "登录失败：" + (v177.message || v177.code || v177.err || "服务端没给原因");
        v70();
        return;
      }
      const v180 = /^\d{5,24}$/.test(String(v178.id || "")) ? String(v178.id) : "";
      const v181 = {
        ...v22(),
        isLatest: () => v174 === v20
      };
      const v182 = await v1.applyAccountCredentials(v179, {
        ...v181,
        uid: v180
      });
      if (v182) {
        Object.assign(v15, {
          step: "phone",
          phone: "",
          code: "",
          captcha: null,
          err: "",
          tip: "",
          lastTrack: null
        });
      }
    }
    const v36 = {
      timer: null,
      st: null,
      parsed: null,
      launchPending: false,
      manualNotified: false,
      els: null,
      dirty: false,
      pending: null,
      errNotified: false
    };
    function v37() {
      if (v13()) {
        return {};
      }
      try {
        return JSON.parse(window.ZeehoShell?.captureStatus?.() || "{}");
      } catch {
        return {};
      }
    }
    function v38() {
      return "\n      <div class=\"note\">\n        " + v7.icon("alert", 18) + "\n        <div>抓取原理：极核的签到页加载失败时，失败地址里就带着 token。抓取期间 VPN 会短暂接管全部网络（只解析极核的签到请求），结束或确认后自动恢复。</div>\n      </div>\n\n      <div class=\"card mt12\">\n        <b>1. 打开极核 App，进入「我的」</b>\n        <div class=\"field mt12\"><button class=\"btn tonal block\" id=\"cpOpen\">打开极核 App</button></div>\n      </div>\n\n      <div class=\"card mt12\">\n        <div style=\"display:flex;align-items:center;justify-content:space-between;gap:8px\">\n          <b>2. 开 VPN，在极核里点「签到」</b>\n          <span class=\"chip\" id=\"cpVpn\"><span class=\"dot\"></span>VPN 未开启</span>\n        </div>\n        <div class=\"card-sub mt8\">停在出现的「网页无法打开」页面，长按复制里面的地址。</div>\n        <div class=\"note bad mt8 hidden\" id=\"cpErr\"></div>\n        <div class=\"field mt12\"><button class=\"btn tonal block\" id=\"cpStart\">开启 VPN 并打开极核 App</button></div>\n      </div>\n\n      <div class=\"card mt12\">\n        <b>3. 粘贴地址</b>\n        <div class=\"mt12\"><textarea id=\"cpPaste\" class=\"pastebox\" rows=\"3\" spellcheck=\"false\"\n          placeholder=\"粘贴完整地址，或只粘贴 token\"></textarea></div>\n        <div class=\"card-sub mt8\" id=\"cpParse\">还没有识别到 token</div>\n        <button class=\"btn text block hidden mt8\" id=\"cpUseNew\"></button>\n      </div>\n\n      <div class=\"card mt12\">\n        <button class=\"btn block\" id=\"cpConfirm\" disabled>确认并验证 token</button>\n        <div class=\"card-sub mt8\" id=\"cpHint\">确认后会关闭 VPN，并验证 token 是否有效。</div>\n      </div>";
    }
    function v39() {
      if (v13()) {
        return v7.sheet(v4(), {
          key: "capturepage",
          threeQuarter: true,
          title: "抓取 token（VPN）",
          sub: "UI 测试预览",
          body: "<div class=\"card-sub\">" + v9(window.PLATFORM.message("VPN 抓取")) + "</div>" + v38(),
          onMount(v183) {
            v183.querySelectorAll("button").forEach(v184 => {
              v184.disabled = false;
              v184.addEventListener("click", () => window.PLATFORM.unavailable("VPN 抓取"));
            });
          }
        });
      }
      if (v1.isIOS?.()) {
        return window.PLATFORM.unavailable("VPN 抓取");
      }
      if (!v1.inShell() || typeof window.ZeehoShell?.startCapture !== "function") {
        v7.toast(v4(), "请先把几何面板 App 更新到 1.5.8 或更高版本", 3000);
        return;
      }
      v36.launchPending = false;
      v36.manualNotified = false;
      v36.parsed = null;
      v24();
      if (v7.currentSheet("debug")) {
        v70();
      }
      v7.sheet(v4(), {
        key: "capturepage",
        threeQuarter: true,
        title: "抓取 token",
        sub: "免 root · 不装证书",
        body: v38(),
        onMount: v40,
        onDismiss: () => {
          v41();
          v36.els = null;
          v36.parsed = null;
          v36.launchPending = false;
          try {
            window.ZeehoShell?.stopCapture?.();
          } catch {}
        }
      });
    }
    function v40() {
      const v185 = v187 => document.getElementById(v187);
      const v186 = {
        vpn: v185("cpVpn"),
        state: null,
        start: v185("cpStart"),
        open: v185("cpOpen"),
        paste: v185("cpPaste"),
        parse: v185("cpParse"),
        confirm: v185("cpConfirm"),
        hint: v185("cpHint"),
        err: v185("cpErr"),
        useNew: v185("cpUseNew")
      };
      if (!v186.start) {
        return;
      }
      v36.els = v186;
      v36.dirty = false;
      v36.pending = null;
      v36.errNotified = false;
      v186.open?.addEventListener("click", v43);
      v186.start.addEventListener("click", v44);
      v186.paste.addEventListener("input", () => {
        v36.dirty = true;
        v45();
      });
      v186.confirm.addEventListener("click", v46);
      v186.useNew?.addEventListener("click", () => {
        if (!v36.pending || !v186.paste) {
          return;
        }
        v186.paste.value = v36.pending;
        v36.pending = null;
        v36.dirty = false;
        v186.useNew.classList.add("hidden");
        v45();
      });
      v45();
      v42();
      v41();
      v36.timer = setInterval(() => {
        if (!document.getElementById("cpStart")) {
          v41();
          return;
        }
        v42();
      }, 900);
    }
    function v41() {
      if (v36.timer) {
        clearInterval(v36.timer);
        v36.timer = null;
      }
    }
    function v42() {
      const v188 = v36.els;
      if (!v188 || !document.getElementById("cpStart")) {
        return;
      }
      const v189 = v37();
      v36.st = v189;
      const v190 = v189.state || "idle";
      const v191 = v190 === "vpn" || v190 === "ready" || v190 === "waiting";
      const v192 = v190 === "manual" || v190 === "success";
      v188.vpn.className = v191 ? "chip ok" : v192 ? "chip warn" : "chip";
      v188.vpn.innerHTML = "<span class=\"dot\"></span>" + (v190 === "vpn" ? "等待授权" : v190 === "ready" ? "VPN 已授权" : v190 === "waiting" ? "VPN 已开启" : v192 ? "抓取结束，VPN 正在关闭" : "VPN 未开启");
      v188.start.disabled = v190 === "vpn";
      v188.start.textContent = v190 === "vpn" ? "请在系统弹窗里允许 VPN" : v190 === "ready" || v190 === "waiting" ? "打开极核 App，点「签到」" : v190 === "manual" || v190 === "success" || v190 === "error" || v190 === "denied" ? "重新抓取" : "开启 VPN 并打开极核 App";
      const v193 = v190 === "error" || v190 === "denied";
      if (v188.err) {
        if (v193) {
          v188.err.textContent = v189.error || (v190 === "denied" ? "你拒绝了 VPN 授权" : "抓取失败");
          v188.err.classList.remove("hidden");
        } else {
          v188.err.classList.add("hidden");
        }
      }
      if (v193 && !v36.errNotified) {
        v36.errNotified = true;
        v7.toast(v4(), v189.error || (v190 === "denied" ? "你拒绝了 VPN 授权" : "抓取失败"), 3200);
      } else if (!v193) {
        v36.errNotified = false;
      }
      if (v190 === "ready" && v36.launchPending) {
        v36.launchPending = false;
        try {
          window.ZeehoShell.launchOfficialApp();
        } catch {}
        v7.toast(v4(), "已打开极核，请点「签到」", 3200);
      }
      if (v190 === "manual" && !v36.manualNotified) {
        v36.manualNotified = true;
        v7.toast(v4(), "签到页已出现错误，请复制错误页里的地址", 3200);
        setTimeout(() => {
          if (v36.els?.paste) {
            v36.els.paste.focus();
          }
        }, 250);
      }
      if (v190 === "success" && v189.token) {
        if (!v36.dirty || !v188.paste || !v188.paste.value.trim()) {
          if (v188.paste && v188.paste.value !== v189.token) {
            v188.paste.value = v189.token;
            v36.pending = null;
            v36.dirty = false;
            v188.useNew?.classList.add("hidden");
            v45();
          }
        } else if (v188.paste.value.trim() !== v189.token && v36.pending !== v189.token) {
          v36.pending = v189.token;
          if (v188.useNew) {
            v188.useNew.textContent = "使用新抓到的 token（尾号 " + v189.token.slice(-4) + "）";
            v188.useNew.classList.remove("hidden");
          }
          v7.toast(v4(), "已抓到新 token，可点「使用新抓到的 token」替换", 3200);
        }
      }
    }
    function v43() {
      if (typeof window.ZeehoShell?.openOfficialApp !== "function") {
        v7.toast(v4(), "请先把几何面板 App 更新到 1.5.11", 3000);
        return;
      }
      try {
        window.ZeehoShell.openOfficialApp();
        v7.toast(v4(), "已打开极核，请进入「我的」后返回面板", 3200);
      } catch {
        v7.toast(v4(), "无法打开极核 App", 3000);
      }
    }
    function v44() {
      const v194 = v37();
      const v195 = v194.state || "idle";
      v36.manualNotified = false;
      if (v195 === "vpn") {
        v7.toast(v4(), "请先在系统弹窗里允许 VPN", 3000);
        return;
      }
      if (v195 === "ready" || v195 === "waiting") {
        v36.launchPending = false;
        try {
          window.ZeehoShell.launchOfficialApp();
        } catch {}
        v7.toast(v4(), "已打开极核，请点「签到」", 3200);
        return;
      }
      v36.errNotified = false;
      if (v36.els?.err) {
        v36.els.err.classList.add("hidden");
      }
      v36.launchPending = true;
      if (v36.els) {
        v36.els.start.disabled = true;
      }
      try {
        window.ZeehoShell.startCapture();
      } catch {
        v36.launchPending = false;
        if (v36.els) {
          v36.els.start.disabled = false;
        }
      }
    }
    function v45() {
      const v196 = v36.els;
      if (!v196 || !v196.paste) {
        return;
      }
      const v197 = v57(v196.paste.value);
      v36.parsed = v197;
      v196.confirm.disabled = !v197;
      v196.parse.textContent = v197 ? "已识别 token · 尾号 " + v197.token.slice(-4) : v196.paste.value.trim() ? "没有识别到 token，请检查粘贴内容" : "还没有识别到 token";
      v196.parse.style.color = v197 ? "var(--c-success)" : "";
    }
    async function v46() {
      const v198 = v36.parsed || v57(v36.els?.paste?.value || "");
      if (!v198) {
        v7.toast(v4(), "没有找到 token", 2600);
        return;
      }
      const v199 = v36.els;
      if (!v199) {
        return;
      }
      const v200 = v22();
      const v201 = v20;
      v199.confirm.disabled = true;
      v199.confirm.textContent = "验证中…";
      v199.hint.textContent = "正在验证 token…";
      v199.hint.style.color = "";
      try {
        window.ZeehoShell.stopCapture?.();
      } catch {}
      const v202 = await v1.applyAccountCredentials(v198.token, {
        ...v200,
        isLatest: () => v201 === v20 && (v19 || v36.els === v199)
      });
      if (v202) {
        try {
          window.ZeehoShell.clearCapture?.();
        } catch {}
      } else if (v36.els === v199) {
        v199.confirm.disabled = false;
        v199.confirm.textContent = "确认并验证 token";
        v199.hint.textContent = "未保存，原账号保持不变。";
      }
    }
    function v47(v203) {
      const v204 = v203?.state || "idle";
      if (v204 === "vpn") {
        return "正在请求 VPN 授权…";
      }
      if (v204 === "ready") {
        return "准备打开极核 App";
      }
      if (v204 === "waiting") {
        return "正在等待签到页…";
      }
      if (v204 === "success") {
        return "已解析登录信息";
      }
      if (v204 === "manual") {
        return "已触发错误页，等待粘贴地址";
      }
      if (v204 === "denied") {
        return "VPN 授权被拒绝";
      }
      if (v204 === "error") {
        return v203.error || "没有等到签到页";
      }
      return "未开始";
    }
    function v48(v205) {
      const v206 = v3("capStatus");
      if (v206) {
        v206.textContent = v47(v205);
      }
    }
    function v49() {
      if (v26.timer) {
        clearInterval(v26.timer);
        v26.timer = null;
      }
    }
    function v50() {
      v7.sheet(v4(), {
        key: "captureguide",
        title: "抓取登录信息",
        sub: "下一步：打开极核 App",
        body: "\n        <div class=\"note info\">" + v7.icon("info", 18) + "<div>\n          <b>打开极核后点「我的」→「签到」。</b><br>\n          签到页会显示一次<b>「网页无法打开」</b>，这是预期的；请长按复制错误页里的地址，再回面板粘贴。\n        </div></div>\n        <div class=\"card-sub mt12\">这一步只是让签到页短暂失败一次，不会修改账号；VPN 会在错误页出现后自动关闭。</div>\n        <div class=\"field mt12\"><button class=\"btn block\" data-act=\"capturelaunch\">打开极核 App</button></div>\n        <div class=\"field\"><button class=\"btn text block\" data-act=\"capturecancel\">取消</button></div>"
      });
    }
    function v51() {
      v7.sheet(v4(), {
        key: "capturemanual",
        title: "复制签到页地址",
        sub: "免 root / 免证书",
        body: "\n        <div class=\"note info\">" + v7.icon("info", 18) + "<div>\n          极核里点「我的」→「签到」后，页面会显示<b>「网页无法打开」</b>。<br>\n          长按错误页里的网址复制（里面带 token），回到这里粘贴；也可以只粘贴 token。\n        </div></div>\n        <div class=\"field mt12\"><textarea id=\"capPaste\" class=\"diagbox\" rows=\"4\"\n          placeholder=\"粘贴错误页里的完整 URL，或只粘贴 token\"\n          style=\"width:100%;box-sizing:border-box;resize:vertical\"></textarea></div>\n        <div class=\"field mt12\"><button class=\"btn block\" data-act=\"capturepaste\">解析并登录</button></div>\n        <div class=\"field\"><button class=\"btn text block\" data-act=\"captureclip\">从剪贴板粘贴</button></div>\n        <div class=\"field\"><button class=\"btn text block\" data-act=\"captureclose\">关闭</button></div>"
      });
    }
    const v52 = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
    const v53 = /[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}/gi;
    const v54 = /^[A-Za-z0-9._~+/=-]{12,4096}$/;
    function v55(v207, {
      loose = false
    } = {}) {
      let v208 = String(v207 || "").trim();
      try {
        v208 = decodeURIComponent(v208);
      } catch {}
      v208 = v208.replace(/^bearer\s+/i, "").trim();
      v208 = v208.replace(/^["'`]+|["'`,;<>)\]]+$/g, "").trim();
      if (v52.test(v208)) {
        return v208;
      }
      if (loose && v54.test(v208)) {
        return v208;
      } else {
        return "";
      }
    }
    function v56(v209) {
      const v210 = String(v209 || "").trim();
      if (!v210) {
        return null;
      }
      const v211 = "[\"'`]?\\s*[:=]\\s*[\"'`]?\\s*";
      const v212 = "([^\\s\"'`&,;}\\]>#]+)";
      const v213 = v221 => {
        const v222 = v210.match(v221);
        if (v222) {
          return v55(v222[1], {
            loose: true
          });
        } else {
          return "";
        }
      };
      const v214 = v213(new RegExp("access[_-]?token" + v211 + v212, "i"));
      if (v214) {
        return {
          token: v214
        };
      }
      const v215 = v213(new RegExp("(?:^|[^A-Za-z0-9_])token" + v211 + v212, "i"));
      if (v215) {
        return {
          token: v215
        };
      }
      const v216 = v213(new RegExp("authorization" + v211 + "(?:bearer\\s+)?[\"'`]?\\s*" + v212, "i"));
      if (v216) {
        return {
          token: v216
        };
      }
      const v217 = v213(new RegExp("\\bbearer\\s+" + v212, "i"));
      if (v217) {
        return {
          token: v217
        };
      }
      const v218 = v210 && !/[\s=:&,;{}"'`]/.test(v210);
      const v219 = v218 ? v55(v210, {
        loose: true
      }) : "";
      if (v219) {
        return {
          token: v219
        };
      }
      const v220 = [...new Set(v210.match(v53) || [])];
      if (v220.length === 1 && !new RegExp("refresh[_-]?token" + v211 + v220[0], "i").test(v210)) {
        return {
          token: v220[0]
        };
      }
      return null;
    }
    function v57(v223) {
      return v56(v223);
    }
    async function v58() {
      if (v13()) {
        return window.PLATFORM.unavailable("读取账号凭据");
      }
      try {
        const v224 = await navigator.clipboard.readText();
        const v225 = v3("capPaste");
        if (v225 && v224) {
          v225.value = v224;
          v7.toast(v4(), "已粘贴，点「解析并登录」");
        } else {
          v7.toast(v4(), "剪贴板是空的", 2600);
        }
      } catch {
        v7.toast(v4(), "浏览器不放行剪贴板，请长按输入框手动粘贴", 3200);
      }
    }
    function v59() {
      const v226 = v3("capPaste");
      const v227 = v57(v226 ? v226.value : "");
      if (!v227) {
        v7.toast(v4(), "没有找到 token，请粘贴完整 URL 或 token", 3200);
        return;
      }
      v26.st = {
        state: "success",
        token: v227.token,
        at: Date.now()
      };
      v26.successShown = true;
      v26.manualShown = true;
      v7.closeSheet();
      v63();
    }
    function v60(v228) {
      v7.sheet(v4(), {
        key: "capturesuccess",
        title: "已抓取登录信息",
        body: "\n        <div class=\"note info\">" + v7.icon("check", 18) + "<div>\n          已拿到 token。使用后会替换当前登录信息并重新拉取车辆。\n        </div></div>\n        <div class=\"field mt12\"><button class=\"btn block\" data-act=\"captureuse\">使用并刷新</button></div>\n        <div class=\"field\"><button class=\"btn text block\" data-act=\"capturecopy\">复制 token</button></div>\n        <div class=\"field\"><button class=\"btn text block\" data-act=\"capturediscard\">忽略这次抓取</button></div>"
      });
    }
    function v61() {
      const v229 = window.ZeehoShell;
      if (!v1.inShell() || !v229 || typeof v229.captureStatus !== "function") {
        return;
      }
      let v230;
      try {
        v230 = JSON.parse(v229.captureStatus() || "{}");
      } catch {
        return;
      }
      v26.st = v230;
      v48(v230);
      const v231 = v230.state || "idle";
      if ((v231 === "vpn" || v231 === "waiting") && v26.startedAt && Date.now() - v26.startedAt > 150000) {
        v26.busy = false;
        v49();
        const v232 = {
          state: "error",
          error: "抓取超时，请重试"
        };
        v26.st = v232;
        v48(v232);
        v7.toast(v4(), "抓取超时，请重试", 3200);
        return;
      }
      if ((v231 === "ready" || v231 === "waiting") && !v26.guideShown) {
        v26.guideShown = true;
        v50();
      }
      if (v231 === "success" && !v26.successShown) {
        v26.successShown = true;
        v49();
        v60(v230);
      }
      if (v231 === "manual" && !v26.manualShown) {
        v26.manualShown = true;
        v26.busy = false;
        v49();
        v51();
      }
      if (v231 === "error" || v231 === "denied") {
        v26.busy = false;
        v49();
        const v233 = v230.error || (v231 === "denied" ? "VPN 授权被拒绝" : "抓取失败");
        if (document.querySelector("[data-act=\"capturestart\"]")) {
          v7.sheet(v4(), {
            key: "captureerr",
            title: "自动抓取失败",
            body: "<div class=\"note bad\">" + v7.icon("alert", 18) + "<div>" + v9(v233) + "</div></div>\n            <div class=\"card-sub mt8\">没有等到签到页。请确认在极核里点「我的」→「签到」，并停留在出现的页面上；也可以看诊断日志再重试。</div>\n            <div class=\"field mt12\"><button class=\"btn block\" data-act=\"capturestart\">重试</button></div>\n            <div class=\"field\"><button class=\"btn text block\" data-act=\"capturestop\">停止并恢复网络</button></div>\n            <div class=\"field\"><button class=\"btn text block\" data-act=\"capturediag\">诊断日志</button></div>\n            <div class=\"field\"><button class=\"btn text block\" data-act=\"captureclose\">关闭</button></div>"
          });
        } else {
          v7.toast(v4(), v233, 3200);
        }
      }
    }
    function v62() {
      v49();
      v26.timer = setInterval(v61, 900);
      v61();
    }
    async function v63() {
      if (v13()) {
        return window.PLATFORM.unavailable("真实账号导入");
      }
      const v234 = v26.st;
      if (!v234?.token) {
        return;
      }
      v26.busy = true;
      const v235 = v22();
      const v236 = await v1.applyAccountCredentials(v234.token, v235);
      if (v236) {
        try {
          window.ZeehoShell?.clearCapture?.();
        } catch {}
        v26.st = null;
        v48(null);
        v26.successShown = true;
      }
      v26.busy = false;
    }
    async function v64() {
      if (v13()) {
        return window.PLATFORM.unavailable("复制账号凭据");
      }
      const v237 = v26.st?.token || "";
      if (!v237) {
        return;
      }
      let v238 = false;
      try {
        await navigator.clipboard.writeText(v237);
        v238 = true;
      } catch {
        try {
          const v239 = document.createElement("textarea");
          v239.value = v237;
          v239.style.position = "fixed";
          v239.style.opacity = "0";
          document.body.appendChild(v239);
          v239.select();
          v238 = document.execCommand("copy");
          v239.remove();
        } catch {}
      }
      v7.toast(v4(), v238 ? "token 已复制" : "复制失败，请长按输入框手动复制");
    }
    function v65() {
      try {
        window.ZeehoShell?.clearCapture?.();
      } catch {}
      v26.st = null;
      v48(null);
      v26.successShown = true;
      v26.guideShown = false;
      v49();
      v7.closeSheet();
      v7.toast(v4(), "已忽略这次抓取");
    }
    function v66() {
      let v240 = "";
      try {
        v240 = window.ZeehoShell && typeof window.ZeehoShell.captureDiag === "function" ? String(window.ZeehoShell.captureDiag() || "") : "";
      } catch (v241) {
        v240 = "读取日志失败：" + v241;
      }
      if (!v240.trim()) {
        v240 = "（还没有日志）先点「开启自动抓取」，按指引进入极核「我的 → 签到」；失败后再回来查看。";
      }
      v7.sheet(v4(), {
        key: "capturediag",
        title: "抓取诊断日志",
        sub: "只在本机；复制后发给开发者",
        body: "<pre class=\"diagbox\">" + v9(v240) + "</pre>\n        <div class=\"field mt12\"><button class=\"btn block\" data-act=\"capturediagcopy\">复制全部</button></div>\n        <div class=\"field\"><button class=\"btn text block\" data-act=\"capturediagclear\">清空日志</button></div>"
      });
    }
    function v67() {
      try {
        if (window.ZeehoShell && typeof window.ZeehoShell.copyCaptureDiag === "function") {
          window.ZeehoShell.copyCaptureDiag();
        } else {
          v7.toast(v4(), "当前壳版本不支持复制，请截图这段日志", 3000);
        }
      } catch {
        v7.toast(v4(), "复制失败，请截图这段日志", 3000);
      }
    }
    function v68() {
      try {
        window.ZeehoShell?.clearCaptureDiag?.();
      } catch {}
      v7.closeSheet();
      v7.toast(v4(), "诊断日志已清空");
    }
    function v69() {}
    function v70() {
      const v242 = v71() ? window.ACC.byId(v16.targetId) : null;
      const v243 = v16.mode === "add";
      const v244 = v18.token;
      const v245 = v243 ? "选择一种方式添加账号" : v242 ? window.ACC.labelOf(v242) : "保存当前账号的登录信息";
      const v246 = v15;
      const v247 = (v256, v257, v258) => "<div class=\"note " + v256 + " mt8\">" + v7.icon(v257, 16) + "<div>" + v258 + "</div></div>";
      let v248;
      if (v246.step === "slide" && v246.captcha) {
        v248 = "\n        <div class=\"card-sub mt8\">按住拼块拖到缺口处，<b>松手就提交</b>。</div>\n        <div class=\"cap-wrap\" id=\"capWrap\">\n          <div class=\"cap-stage\" id=\"capStage\">\n            <img class=\"cap-bg\" src=\"" + v9(v246.captcha.backgroundImage) + "\" alt=\"\">\n            <img class=\"cap-piece\" id=\"capPiece\" src=\"" + v9(v246.captcha.sliderImage) + "\" alt=\"\">\n          </div>\n        </div>\n        <div class=\"cap-bar\"><span class=\"cap-bar-fill\" id=\"capBarFill\"></span><span class=\"cap-bar-txt\" id=\"capBarTxt\">按住拼块并拖动</span></div>\n        <div class=\"field mt12\"><button class=\"btn text block\" data-act=\"loginback\">换个手机号 / 重新获取</button></div>";
      } else if (v246.step === "code") {
        v248 = "\n        <div class=\"field mt8\">\n          <input id=\"codeInput\" type=\"tel\" inputmode=\"numeric\" maxlength=\"6\" placeholder=\"短信验证码\"\n                 autocomplete=\"one-time-code\" spellcheck=\"false\" value=\"" + v9(v246.code) + "\">\n        </div>\n        <div class=\"field mt8\"><button class=\"btn block\" data-act=\"loginok\">" + (v246.busy ? "登录中…" : "登录") + "</button></div>\n        <div class=\"field mt12\"><button class=\"btn text block\" data-act=\"loginback\">没收到？重新获取</button></div>";
      } else {
        v248 = "\n        <div class=\"field mt8\">\n          <input id=\"phoneInput\" type=\"tel\" inputmode=\"numeric\" maxlength=\"11\" placeholder=\"手机号\"\n                 autocomplete=\"tel\" spellcheck=\"false\" value=\"" + v9(v246.phone) + "\">\n        </div>\n        <div class=\"field mt8\"><button class=\"btn block\" data-act=\"sendcode\"" + (v246.busy ? " disabled" : "") + ">" + (v246.busy ? v7.spinner("正在取验证码…") : "获取验证码") + "</button></div>";
      }
      const v249 = v246.err && v246.lastTrack?.trackList?.length ? "<details class=\"lg-more\"><summary>看这次提交的轨迹（对不上时把它发我）</summary>\n           <div class=\"code\">" + v9(JSON.stringify({
        ...v246.lastTrack,
        trackList: [...v246.lastTrack.trackList.slice(0, 6), "…共 " + v246.lastTrack.trackList.length + " 个点"]
      }, null, 1)) + "</div>\n         </details>" : "";
      const v250 = "\n      " + v247("", "alert", "手机号登录会使<b>极核官方 App 的原会话失效</b>。") + "\n      " + (v246.err ? v247("bad", "alert", v9(v246.err)) : "") + "\n      " + (v246.tip ? v247("info", "check", v9(v246.tip)) : "") + "\n      " + v248 + "\n      " + v249;
      const v251 = "\n      <div class=\"card-sub mt12\">粘贴已有 token，复用登录信息。</div>\n      <div class=\"field\">\n        <input id=\"tokenInput\" type=\"text\" placeholder=\"粘贴 token\" autocomplete=\"off\" autocapitalize=\"off\" autocorrect=\"off\" spellcheck=\"false\" value=\"" + v9(v244) + "\"" + (v246.busy ? " disabled" : "") + ">\n      </div>\n      <div class=\"field mt12\">\n        <button class=\"btn block\" data-act=\"savetoken\"" + (v246.busy ? " disabled" : "") + ">" + (v246.busy ? v7.spinner("正在验证 token…") : v243 ? "添加账号" : "保存登录信息") + "</button>\n      </div>\n      " + (v246.busy ? "<div class=\"card-sub mt8\" role=\"status\">正在连接极核，读取账号信息…</div>" : "") + "\n      " + (window.PLATFORM.visible("android") ? "<div class=\"field\"><button class=\"btn tonal block\" data-act=\"capturepage\">抓取 token（VPN）</button></div>" : "");
      const v252 = [["token", "token 登录"], ["phone", "手机号登录"]];
      const v253 = "<div class=\"credential-tabs\" role=\"tablist\" aria-label=\"登录方式\">" + v252.map(([v259, v260]) => "<button class=\"credential-tab" + (v259 === v17 ? " on" : "") + "\" type=\"button\" role=\"tab\"\n        id=\"credTab-" + v259 + "\" aria-selected=\"" + (v259 === v17) + "\" aria-controls=\"credPanel\"\n        data-act=\"credentialmethod\" data-v=\"" + v259 + "\"" + (v246.busy ? " disabled" : "") + ">" + v260 + "</button>").join("") + "</div>";
      const v254 = v17 === "phone" ? v250 : v251;
      const v255 = v20;
      v7.sheet(v4(), {
        key: "debug",
        threeQuarter: true,
        title: v243 ? "添加账号" : v71() ? "更新登录信息" : v14(),
        sub: v245,
        body: v253 + "<div id=\"credPanel\" role=\"tabpanel\" aria-labelledby=\"credTab-" + v17 + "\">" + v254 + "</div>",
        onMount: v261 => {
          v77(v261);
          if (v17 === "phone" && v15.step === "slide") {
            v33(v261);
          }
        },
        onDismiss: () => {
          if (v255 !== v20 || v19) {
            return;
          }
          v20++;
          v15.busy = false;
        }
      });
    }
    const v71 = () => !!v1.inShell() && !!window.ACC?.avail?.() && !!window.ACC?.ready?.();
    const v72 = () => v6.beijingDay();
    function v73(v262) {
      const v263 = window.ACC;
      const v264 = [];
      v264.push(v262.uid ? v263.maskId(v262.uid) : "待识别");
      if (v262.invalidAt) {
        v264.push("token 已失效");
      } else if (v262.signDate === v72()) {
        v264.push(v262.signOk === false ? "今日签到失败" + (v262.signMsg ? "：" + v262.signMsg : "") : "今日已签");
      } else if (v262.signDate) {
        v264.push("上次签到 " + v262.signDate);
      }
      const v265 = (v262.vehicles || []).length;
      if (v265) {
        v264.push(v265 + " 台车");
      }
      return v264.join(" · ");
    }
    function v74() {
      const v266 = window.ACC;
      const v267 = v266.activeId();
      return v266.list().map(v268 => "\n      <div class=\"sheet-item" + (v268.id === v267 ? " sel" : "") + "\">\n        <button class=\"acc-select\" data-act=\"accswitch\" data-id=\"" + v9(v268.id) + "\" aria-pressed=\"" + (v268.id === v267) + "\" title=\"切换到 " + v9(v266.labelOf(v268)) + "\">\n          <span class=\"ico\">" + v9((v266.labelOf(v268) || "?").slice(0, 1)) + "</span>\n          <span class=\"acc-text\"><span class=\"t\">" + v9(v266.labelOf(v268)) + (v268.invalidAt ? v7.chip("已失效", "bad", {
        nodot: true
      }) : "") + "</span>\n          <span class=\"s\">" + v9(v73(v268)) + "</span></span>\n          " + (v268.id === v267 ? "<span class=\"tail\">" + v7.icon("check", 18) + "</span>" : "") + "\n        </button>\n        <button class=\"iconbtn\" data-act=\"accdetail\" data-id=\"" + v9(v268.id) + "\" title=\"" + v9(v266.labelOf(v268)) + "的账号详情\" aria-label=\"" + v9(v266.labelOf(v268)) + "的账号详情\">" + v7.icon("more", 18) + "</button>\n      </div>").join("");
    }
    function v75() {
      if (!v71()) {
        return;
      }
      const v269 = window.ACC.mode();
      const v270 = [["separate", "分离显示", "每个账号一个页面，各自看自己的车"], ["aggregate", "聚合显示", "所有账号共用同一份车辆列表，换账号只换「我的」页面的用户"]].map(([v271, v272, v273]) => "<button class=\"pick-row" + (v269 === v271 ? " on" : "") + "\" data-act=\"accmode\" data-v=\"" + v271 + "\" aria-pressed=\"" + (v269 === v271) + "\">\n      <span class=\"pr-main\"><b>" + v272 + "</b><i>" + v273 + "</i></span>" + (v269 === v271 ? v7.icon("check", 18) : "") + "</button>").join("");
      v7.sheet(v4(), {
        key: "accmode",
        title: "车辆显示",
        body: v270 + "\n      <div class=\"card-sub mt12\">聚合模式下选到别的账号的车，车辆数据会自动改用那台车主人的登录信息取。</div>"
      });
    }
    const v76 = new WeakSet();
    function v77(v274) {
      if (!v274 || typeof v274.addEventListener !== "function" || v76.has(v274)) {
        return;
      }
      v76.add(v274);
      v274.addEventListener("click", v275 => {
        const v276 = v275.target?.closest?.("[data-txnact]");
        if (!v276 || v276.disabled) {
          return;
        }
        if (v276.dataset.txnact === "panellinerow") {
          v111();
        } else if (v276.dataset.txnact === "marketlinerow") {
          v104();
        } else if (v276.dataset.txnact === "recovery") {
          v1.shell.openRecovery();
        } else if (v276.dataset.txnact === "panelline") {
          v115(v276.dataset.v);
        } else if (v276.dataset.txnact === "panellinecancel") {
          v116();
        } else if (v276.dataset.txnact === "mapprovider") {
          v83(v276.dataset.v);
        }
      });
    }
    let v78 = null;
    function v79() {
      if (v2.tile === "tianditu") {
        return "天地图";
      } else {
        return "高德地图";
      }
    }
    function v80() {
      return "<button class=\"account-setting-row\" data-act=\"mapprovidersheet\"><span>地图</span><span class=\"muted\">" + v79() + "</span>" + v7.icon("right", 18) + "</button>";
    }
    function v81(v277) {
      return [["amap", "高德地图"], ["tianditu", "天地图"]].map(([v278, v279]) => "\n      <button type=\"button\" class=\"pick-row" + (v2.tile === v278 ? " on" : "") + "\" data-txnact=\"mapprovider\" data-v=\"" + v278 + "\" aria-pressed=\"" + (v2.tile === v278) + "\"" + (v277.busy ? " disabled" : "") + ">\n        <span class=\"pr-main\"><b>" + v279 + "</b>" + (v278 === "amap" ? "<i>默认地图</i>" : "") + "</span>" + (v2.tile === v278 ? v7.icon("check", 18) : "") + "</button>").join("") + (v1.nearbyPermissionAvailable?.() ? "<div class=\"mt12\"><button type=\"button\" class=\"btn tonal block\" data-act=\"nearbypermission\">附近车辆蓝牙权限</button></div>" : "");
    }
    function v82() {
      if (v78 && v7.sheetAlive(v78.handle)) {
        return;
      }
      const v280 = {
        handle: null,
        parent: v7.currentSheet("accounts"),
        busy: false
      };
      v78 = v280;
      v280.handle = v7.sheet(v4(), {
        key: "map-provider",
        title: "地图",
        body: v81(v280),
        onMount: v77,
        onDismiss: () => {
          if (v78 === v280) {
            v78 = null;
          }
        }
      });
    }
    async function v83(v281) {
      const v282 = v78;
      if (!v282 || !v7.sheetAlive(v282.handle) || v7.currentSheet() !== v282.handle || v282.busy || !["tianditu", "amap"].includes(v281)) {
        return;
      }
      v282.busy = true;
      v7.updateSheet(v282.handle, {
        body: v81(v282)
      });
      let v283 = false;
      try {
        v283 = await v1.setMapProvider(v281);
      } catch {
        v7.toast(v4(), "地图偏好未能保存，请重试");
      }
      v282.busy = false;
      if (v283 !== true) {
        if (v7.sheetAlive(v282.handle)) {
          v7.updateSheet(v282.handle, {
            body: v81(v282)
          });
        }
        return;
      }
      if (v7.sheetAlive(v282.parent) && v7.currentSheet("accounts") === v282.parent) {
        v117();
      }
      if (v7.sheetAlive(v282.handle)) {
        v7.closeSheet(v282.handle);
      }
    }
    const v84 = [["github", "GitHub 线路", "网页产物托管在 GitHub Pages"], ["cf", "Cloudflare 线路", "网页产物托管在 Cloudflare Worker"]];
    const v85 = "请更新 App 后使用 Cloudflare 线路";
    let v86 = null;
    let v87 = null;
    let v88 = null;
    const v89 = v284 => v84.find(([v285]) => v285 === v284)?.[1] || (v90() ? "读取中…" : "GitHub 线路");
    const v90 = () => !window.PLATFORM?.preview?.() && !window.ZeehoShell && (v1.isIOS?.() || window.IOSBR?.available?.() === true);
    const v91 = () => ["panelLineVersion", "panelLineInfo", "beginPanelLine"].every(v286 => window.IOSBR?.has?.(v286) === true);
    function v92() {
      if (v90()) {
        return v91();
      }
      const v287 = window.ZeehoShell;
      if (!v1.inShell() || !["panelLineVersion", "panelLineInfo", "beginPanelLine", "pollPanelLine", "cancelPanelLine"].every(v288 => typeof v287?.[v288] === "function")) {
        return false;
      }
      try {
        return Number(v287.panelLineVersion()) === 1;
      } catch {
        return false;
      }
    }
    function v93() {
      if (v90()) {
        const v289 = v1.shell?.ios?.info?.();
        const v290 = v289?.panelLine;
        const v291 = typeof v290 === "string" ? {
          version: 1,
          line: v290,
          busy: false,
          chosen: v289?.panelLineChosen === true
        } : v290 && typeof v289?.panelLineChosen === "boolean" ? {
          ...v290,
          chosen: v289.panelLineChosen
        } : v290;
        const v292 = v87 || v291;
        if (v292 && v84.some(([v293]) => v292.line === v293)) {
          return v292;
        } else {
          return null;
        }
      }
      try {
        const v294 = JSON.parse(window.ZeehoShell?.panelLineInfo?.() || "{}");
        if (v294.version === 1 && v84.some(([v295]) => v294.line === v295)) {
          return v294;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    }
    function v94() {
      const v296 = v93();
      if (!v296) {
        return false;
      }
      return v296.chosen !== false;
    }
    function v95(v297) {
      if (!v90() || !v84.some(([v299]) => v299 === v297)) {
        return false;
      }
      const v298 = v87;
      v87 = v298 && v298.chosen !== undefined ? {
        version: 1,
        line: v297,
        busy: false,
        chosen: v298.chosen
      } : {
        version: 1,
        line: v297,
        busy: false
      };
      return true;
    }
    async function v96() {
      if (!v90() || !v91()) {
        return null;
      }
      if (v88) {
        return v88;
      }
      const v300 = v1.shell?.ios?.pageCapture?.();
      let v301;
      v301 = (async () => {
        try {
          const v302 = await window.IOSBR.call("panelLineInfo", {});
          const v303 = typeof v302 === "string" ? JSON.parse(v302) : v302;
          if (v300 && !v1.shell.ios.pageCurrent(v300)) {
            return null;
          }
          if (v303 && v303.version === 1 && v84.some(([v304]) => v303.line === v304)) {
            const v305 = v1.shell?.ios?.updateLine?.() || v93()?.line;
            v87 = v303;
            if (v305 && v305 !== v303.line) {
              v1.shell?.ios?.invalidateUpdates?.(v303.line);
            }
            return v303;
          }
        } catch {} finally {
          if (v88 === v301) {
            v88 = null;
          }
        }
        return null;
      })();
      v88 = v301;
      return v301;
    }
    function v97(v306 = "data-txnact") {
      if (!v1.inShell()) {
        return "";
      }
      const v307 = v306 === "data-act" ? "data-act" : "data-txnact";
      return "<button class=\"account-setting-row\" " + v307 + "=\"panellinerow\"><span>面板线路</span><span class=\"muted\">" + v89(v93()?.line) + "</span>" + v7.icon("right", 18) + "</button>";
    }
    function v98(v308 = "data-txnact") {
      const v309 = v1.shell?.availableRecovery?.();
      if (!v309 && (!v1.inShell() || !v1.isIOS?.() || !!window.PLATFORM?.preview?.())) {
        return "";
      }
      const v310 = v308 === "data-act" ? "data-act" : "data-txnact";
      return "<button class=\"account-setting-row\" " + v310 + "=\"recovery\"" + (v309 ? "" : " disabled aria-disabled=\"true\" title=\"请自签安装新版 iOS App 后使用欢迎与恢复\"") + "><span>欢迎与恢复</span>" + (v309 ? v7.icon("right", 18) : "<span class=\"muted\">请更新 App（自签安装）</span>") + "</button>";
    }
    const v99 = () => !v13() && !v1.isIOS?.() && typeof window.ZeehoShell?.marketRouteControl === "function";
    let v100 = null;
    function v101(v311 = "info", v312 = "") {
      if (!v99()) {
        return null;
      }
      try {
        const v313 = new URL(document.location.href).searchParams.get("_shellNav") || "";
        const v314 = JSON.parse(window.ZeehoShell.marketRouteControl(v313, v311, v312));
        if (v314?.ready === true) {
          return v314;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    }
    function v102() {
      if (!v1.inShell()) {
        return "";
      }
      return "<button class=\"account-setting-row\" data-txnact=\"marketlinerow\"><span>壁纸市场线路</span>" + v7.icon("right", 18) + "</button>";
    }
    function v103(v315) {
      const v316 = v315.info;
      if (!v315.available) {
        return "<div class=\"note info\">" + (v1.isIOS?.() ? "当前使用系统线路，暂不支持手动选址和 TCP 测速。" : "请更新 App 后使用线路选择和测速。") + "</div>";
      }
      if (!v316) {
        return "<div class=\"note info\" role=\"status\">无法读取线路状态，请关闭后重试。</div>";
      }
      const v317 = Array.isArray(v316.candidates) ? v316.candidates : [];
      const v318 = v322 => v322?.latencyMs >= 0 ? v322.latencyMs + " ms" : "连接失败";
      const v319 = v317.find(v323 => v323.ip === v316.selectedIp);
      const v320 = !v316.online ? "当前无网络" : v316.selectedIp ? "当前地址：" + v316.selectedIp + " · " + (v319 ? v318(v319) : "待测速") : "当前使用系统默认线路";
      const v321 = [["auto", "自动选择", "按 TCP 测速结果选址"], ["system", "系统默认", "由系统 DNS 与网络栈选址，延迟不单独计量"], ...v317.map(v324 => [v324.ip, (v324.ip.includes(":") ? "IPv6" : "IPv4") + " · " + v318(v324), v324.ip])];
      if (!["auto", "system"].includes(v316.preference) && !v317.some(v325 => v325.ip === v316.preference)) {
        v321.push([v316.preference, "已保存的手动线路 · 待测速", v316.preference]);
      }
      return "<div class=\"card-sub\" role=\"status\" aria-live=\"polite\" style=\"overflow-wrap:anywhere\">" + v9(v320) + "</div>\n      " + v321.map(([v326, v327, v328]) => "<button class=\"pick-row" + (v316.preference === v326 ? " on" : "") + "\" data-market-line=\"select\" data-v=\"" + v9(v326) + "\" aria-pressed=\"" + (v316.preference === v326) + "\"" + (v316.busy || !["auto", "system"].includes(v326) && !v317.some(v329 => v329.ip === v326 && v329.latencyMs >= 0) ? " disabled" : "") + ">\n        <span class=\"pr-main\"><b>" + v9(v327) + "</b><i style=\"overflow-wrap:anywhere\">" + v9(v328) + "</i></span>" + (v316.preference === v326 ? v7.icon("check", 18) : "") + "</button>").join("") + "\n      <div class=\"field mt12\"><button class=\"btn tonal block\" data-market-line=\"measure\"" + (v316.busy || !v316.online ? " disabled" : "") + ">" + (v316.busy ? "正在测速…" : "手动测速") + "</button></div>\n      " + (v316.busy ? v7.spinner("正在解析并测试 TCP 延迟…") : "") + "\n      <p class=\"card-sub\">" + (v316.measuredAt ? "上次测速：" + v9(new Date(v316.measuredAt).toLocaleTimeString("zh-CN")) + "。" : "") + "延迟为 TCP 连接耗时，仅供选路参考；测速不调用市场业务接口。写入及上传仍使用系统线路。</p>\n      " + (v315.message ? "<div class=\"card-sub\" role=\"status\">" + v9(v315.message) + "</div>" : "");
    }
    function v104() {
      if (v100 && v7.sheetAlive(v100.handle)) {
        return;
      }
      const v330 = {
        available: v99(),
        info: v101(),
        handle: null,
        timer: null,
        message: ""
      };
      const v331 = new WeakSet();
      v100 = v330;
      const v332 = () => v100 === v330 && v7.sheetAlive(v330.handle);
      const v333 = () => {
        if (v332()) {
          v7.updateSheet(v330.handle, {
            body: v103(v330)
          });
        }
      };
      const v334 = () => {
        if (!v332() || !v330.available || v330.timer != null) {
          return;
        }
        v330.timer = setTimeout(() => {
          v330.timer = null;
          if (!v332()) {
            return;
          }
          v330.info = v101();
          v333();
          v334();
        }, v330.info?.busy ? 500 : 2000);
      };
      v330.handle = v7.sheet(v4(), {
        key: "marketline",
        title: "壁纸市场线路",
        sub: "读取与图片访问 · 连接延迟",
        body: v103(v330),
        onMount: v335 => {
          if (v331.has(v335)) {
            return;
          }
          v331.add(v335);
          v335.addEventListener("click", v336 => {
            const v337 = v336.target?.closest?.("[data-market-line]");
            if (!v337 || v337.disabled || !v332()) {
              return;
            }
            const v338 = v101(v337.dataset.marketLine, v337.dataset.v || "");
            if (v338) {
              v330.info = v338;
              v330.message = "";
            } else {
              v330.info = v101();
              v330.message = "操作未确认，请重试";
            }
            v333();
            v334();
          });
        },
        onDismiss: () => {
          if (v330.timer != null) {
            clearTimeout(v330.timer);
          }
          if (v100 === v330) {
            v100 = null;
          }
        }
      });
      v334();
    }
    const v105 = v339 => v86 === v339 && v7.sheetAlive(v339.handle) && (!v339.iosScope || v1.shell?.ios?.pageCurrent?.(v339.iosScope, true));
    function v106(v340) {
      const v341 = v84.map(([v342, v343, v344]) => "<button class=\"pick-row" + (v340.info?.line === v342 ? " on" : "") + "\" data-txnact=\"panelline\" data-v=\"" + v342 + "\" aria-pressed=\"" + (v340.info?.line === v342) + "\"" + (v340.busy || !v340.available ? " disabled" : "") + ">\n      <span class=\"pr-main\"><b>" + v343 + (v340.updateCheck ? "检查更新" : "") + "</b><i>" + v344 + "</i></span>" + (v340.info?.line === v342 ? v7.icon("check", 18) : "") + "</button>").join("");
      return "" + v341 + (v340.busy ? "<div class=\"mt12\">" + v7.spinner(v340.job ? "正在切换线路…" : "线路切换中，请稍候") + "</div>" : "") + "\n      " + (v340.message ? "<div class=\"card-sub mt12\" role=\"status\" aria-live=\"polite\">" + v9(v340.message) + "</div>" : "") + "\n      " + (v340.job ? "<div class=\"field mt12\"><button class=\"btn text block\" data-txnact=\"panellinecancel\">取消</button></div>" : "");
    }
    function v107(v345) {
      if (v105(v345)) {
        v7.updateSheet(v345.handle, {
          body: v106(v345)
        });
      }
    }
    function v108(v346) {
      if (v7.sheetAlive(v346.parent) && v7.currentSheet("accounts") === v346.parent) {
        v117();
      }
    }
    function v109(v347) {
      if (v347?.timer != null) {
        clearTimeout(v347.timer);
      }
      if (v347) {
        v347.timer = null;
      }
    }
    function v110(v348) {
      if (v90()) {
        return;
      }
      if (!v105(v348) || v348.job || !v348.busy || v348.timer != null) {
        return;
      }
      v348.timer = setTimeout(() => {
        v348.timer = null;
        if (!v105(v348) || v348.job) {
          return;
        }
        const v349 = v93();
        if (!v105(v348) || v348.job) {
          return;
        }
        if (v349) {
          v348.info = v349;
          v348.busy = v349.busy === true;
        }
        v107(v348);
        v110(v348);
      }, 500);
    }
    function v111({
      updateCheck = false,
      updateTarget = "panel"
    } = {}) {
      if (!v1.inShell()) {
        return;
      }
      if (v86 && v105(v86)) {
        return;
      }
      const v350 = v92();
      const v351 = v93();
      let v352 = "";
      try {
        v352 = new URL(document.location.href).searchParams.get("_shellNav") || "";
      } catch {}
      const v353 = {
        handle: null,
        parent: v7.currentSheet("accounts"),
        info: v351 || (v90() ? {} : {
          line: "github"
        }),
        available: v350 && !!v351,
        navigationId: v352,
        busy: v351?.busy === true,
        job: null,
        timer: null,
        updateCheck: updateCheck,
        updateTarget: updateTarget,
        iosScope: v90() ? v1.shell?.ios?.pageCapture?.() : null,
        message: !v350 ? v85 : !v351 ? "无法读取面板线路，请重试" : ""
      };
      v86 = v353;
      v353.handle = v7.sheet(v4(), {
        key: "panelline",
        title: updateCheck ? "选择更新线路" : "面板线路",
        sub: updateCheck ? "选一次即可，之后检查更新直接用这条线路" : "切换后，下次更新从所选线路下载",
        body: v106(v353),
        onMount: v77,
        onDismiss: () => {
          if (v86 !== v353) {
            return;
          }
          v86 = null;
          if (v353.timer != null) {
            clearTimeout(v353.timer);
          }
          const v354 = v353.job;
          v109(v354);
          if (v354?.ticket) {
            try {
              window.ZeehoShell?.cancelPanelLine?.(v354.ticket);
            } catch {}
          }
        }
      });
      v110(v353);
      if (v90() && !v351) {
        v96().then(v355 => {
          if (!v355 || !v105(v353)) {
            return;
          }
          v353.info = v355;
          v353.available = true;
          v353.busy = v355.busy === true;
          v353.message = "";
          v107(v353);
        });
      }
    }
    function v112(v356, v357, v358) {
      if (!v105(v356) || v356.job !== v357) {
        return;
      }
      v109(v357);
      v356.job = null;
      const v359 = v93();
      if (!v105(v356)) {
        return;
      }
      if (v359) {
        v356.info = v359;
      }
      if (v356.updateCheck && v358.ok === true) {
        if (!v359 || v359.line !== v357.line || v359.busy === true) {
          v358 = {
            error: "更新通道未确认，请重新选择"
          };
        } else {
          v7.closeSheet(v356.handle);
          if (v356.updateTarget === "app") {
            return v1.shell?.checkAppManual(true);
          } else {
            return v1.shell?.checkPageManual(true);
          }
        }
      }
      v356.busy = v359?.busy === true;
      v356.message = v358.ok === true ? "" : String(v358.error || "线路切换失败，请重试");
      v107(v356);
      v108(v356);
      v110(v356);
    }
    function v113(v360, v361) {
      v109(v361);
      const v362 = v93();
      if (!v105(v360) || v360.job !== v361) {
        return;
      }
      if (v362) {
        v360.info = v362;
      }
      v360.busy = v362?.busy !== false;
      if (!v360.busy) {
        v360.job = null;
      }
      v360.message = v360.busy ? "切换结果待确认，请重新打开 App 查看" : "切换已结束，请查看当前线路";
      v107(v360);
      v108(v360);
    }
    function v114(v363, v364) {
      if (!v105(v363) || v363.job !== v364) {
        return;
      }
      let v365;
      try {
        v365 = JSON.parse(window.ZeehoShell.pollPanelLine(v364.ticket) || "{}");
      } catch {
        v365 = null;
      }
      if (!v105(v363) || v363.job !== v364) {
        return;
      }
      const v366 = v365 && v365.ticket === v364.ticket;
      if (v366 && v365.done === true) {
        v112(v363, v364, v365);
        return;
      }
      if (v364.waitUntil) {
        if (Date.now() >= v364.waitUntil) {
          v113(v363, v364);
          return;
        }
      } else if (!v366 || Date.now() >= v364.deadline) {
        let v367 = false;
        try {
          v367 = window.ZeehoShell.cancelPanelLine(v364.ticket) === true;
        } catch {}
        if (!v105(v363) || v363.job !== v364) {
          return;
        }
        if (v367) {
          v112(v363, v364, {
            error: v366 ? "线路切换超时，请重试" : "线路切换结果未确认，请重试"
          });
          return;
        }
        v364.waitUntil = Date.now() + 30000;
        v363.message = "正在完成切换，请稍候";
        v107(v363);
      }
      v364.timer = setTimeout(() => {
        v364.timer = null;
        v114(v363, v364);
      }, 250);
    }
    function v115(v368) {
      const v369 = v86;
      if (!v369 || !v105(v369) || v369.busy || !v84.some(([v372]) => v372 === v368)) {
        return;
      }
      if (!v92()) {
        v369.available = false;
        v369.message = v85;
        v107(v369);
        return;
      }
      if (!v369.navigationId) {
        v369.message = "请重新打开 App 后再试";
        v107(v369);
        return;
      }
      const v370 = {
        line: v368,
        ticket: "",
        timer: null,
        deadline: Date.now() + 120000
      };
      v369.job = v370;
      v369.busy = true;
      v369.message = "";
      v107(v369);
      if (v90()) {
        window.IOSBR.call("beginPanelLine", JSON.stringify({
          line: v368,
          navigationId: v369.navigationId
        })).then(async v373 => {
          if (!v105(v369) || v369.job !== v370) {
            return;
          }
          if (v373?.ok !== true) {
            v112(v369, v370, {
              error: String(v373?.error?.message || v373?.error || "线路切换未能开始，请重试")
            });
            return;
          }
          v1.shell?.ios?.invalidateUpdates?.(v368);
          v369.iosScope = v1.shell?.ios?.pageCapture?.();
          v87 = {
            version: 1,
            line: v368,
            busy: false,
            chosen: true
          };
          const v374 = await v96();
          if (!v105(v369) || v369.job !== v370) {
            return;
          }
          if (v374) {
            v87 = v374;
          }
          v112(v369, v370, v373);
        }, v375 => {
          if (!v105(v369) || v369.job !== v370) {
            return;
          }
          v112(v369, v370, {
            error: String(v375?.message || "线路切换未能开始，请重试")
          });
        });
        return;
      }
      let v371;
      try {
        v371 = JSON.parse(window.ZeehoShell.beginPanelLine(JSON.stringify({
          line: v368,
          navigationId: v369.navigationId
        })) || "{}");
      } catch {
        v371 = {
          done: true,
          error: "线路切换未能开始，请重试"
        };
      }
      if (typeof v371?.ticket === "string") {
        v370.ticket = v371.ticket;
      }
      if (!v105(v369) || v369.job !== v370) {
        if (v370.ticket) {
          try {
            window.ZeehoShell?.cancelPanelLine?.(v370.ticket);
          } catch {}
        }
        return;
      }
      if (v371?.done === true) {
        v112(v369, v370, v371);
        return;
      }
      if (!v370.ticket) {
        v112(v369, v370, {
          error: v371?.error || "线路切换未能开始，请重试"
        });
        return;
      }
      v370.timer = setTimeout(() => {
        v370.timer = null;
        v114(v369, v370);
      }, 250);
    }
    function v116() {
      const v376 = v86;
      const v377 = v376?.job;
      if (!v376 || !v105(v376) || !v377?.ticket) {
        return;
      }
      let v378 = false;
      try {
        v378 = window.ZeehoShell.cancelPanelLine(v377.ticket) === true;
      } catch {}
      if (!v105(v376) || v376.job !== v377) {
        return;
      }
      if (!v378) {
        v376.message = "正在完成切换，请稍候";
        v107(v376);
        return;
      }
      v112(v376, v377, {
        error: "已取消"
      });
    }
    function v117() {
      if (!v71()) {
        v21();
        return;
      }
      const v379 = window.ACC;
      v7.sheet(v4(), {
        key: "accounts",
        threeQuarter: true,
        title: v14(),
        sub: v379.count() + " 个账号 · 当前 " + (v379.labelOf(v379.active()) || "无"),
        onMount: v77,
        body: "<div class=\"account-list\">" + (v74() || "<div class=\"muted\">还没有账号，添加后即可查看车辆。</div>") + "</div>\n        <div class=\"field mt12\"><button class=\"btn block\" data-act=\"accadd\">＋ 添加账号</button></div>\n        <div class=\"app-settings-list mt16\"><button class=\"account-setting-row\" data-act=\"accmodesheet\"><span>车辆显示</span><span class=\"muted\">" + (v379.mode() === "aggregate" ? "聚合" : "分离") + "</span>" + v7.icon("right", 18) + "</button>\n        " + v97() + "\n        " + v102() + "\n        " + v80() + "\n        " + v98() + "</div>\n        <div class=\"card-sub mt12\">切换后，通知、小组件和后台任务跟随当前账号。</div>"
      });
    }
    function v118(v380) {
      if (!v71()) {
        return;
      }
      const v381 = window.ACC;
      const v382 = v381.byId(v380);
      if (!v382) {
        return;
      }
      const v383 = v382.id === v381.activeId();
      const v384 = String(v382.token || "");
      const v385 = v384 ? v384.slice(0, 8) + "…" + v384.slice(-4) : "—";
      const v386 = String(v382.uid || "");
      const v387 = "\n      <div class=\"card\">\n        " + v7.kv("显示名", v381.labelOf(v382)) + "\n        " + v7.kv("账号 ID", v386 || "待识别", {
        mono: true,
        copy: v386 || undefined,
        copyTitle: "复制账号 ID"
      }) + "\n        " + v7.kv("token", v385, {
        mono: true,
        copyId: v382.id,
        copyAct: "copyacctoken",
        copy: v384 ? {
          act: "copytoken",
          title: "复制 token"
        } : undefined
      }) + "\n        " + v7.kv("登录状态", v382.invalidAt ? "已失效（" + new Date(v382.invalidAt).toLocaleString() + "）" : "已登录") + "\n        " + v7.kv("车辆", (v382.vehicles || []).length + " 台" + (v382.vin ? "（当前 " + v382.vin.slice(-6) + "）" : "")) + "\n        " + v7.kv("加入时间", new Date(v382.addedAt || Date.now()).toLocaleString()) + "\n        " + (v382.signDate === v72() ? v7.kv("今日签到", v382.signOk === false ? "失败" + (v382.signMsg ? "：" + v382.signMsg : "") : "已签") : "") + "\n      </div>\n      " + (v383 ? "<div class=\"note info mt12\">" + v7.icon("info", 18) + "<div>这是当前账号。切到别的账号后，通知、小组件和后台任务都会跟着过去。</div></div>" : "") + "\n      <div class=\"field mt12\"><button class=\"btn block\" data-act=\"accswitch\" data-id=\"" + v9(v382.id) + "\"" + (v383 ? " disabled" : "") + ">" + (v383 ? "当前账号" : "切换到这个账号") + "</button></div>\n      <div class=\"field\"><button class=\"btn tonal block\" data-act=\"accupdatetoken\" data-id=\"" + v9(v382.id) + "\">" + v7.icon("refresh", 18) + "<span>更新登录信息</span></button></div>\n      <div class=\"task-row mt12\"><div class=\"task-main\"><div class=\"task-name\">参与批量签到</div>\n        <div class=\"task-sub\">「全部账号签到」运行时关掉的账号会被跳过</div></div>\n        <div class=\"task-tail\"><button class=\"switch" + (v382.noSign ? "" : " on") + "\" data-act=\"accsigntoggle\" data-id=\"" + v9(v382.id) + "\" role=\"switch\" aria-checked=\"" + !v382.noSign + "\" aria-label=\"参与批量签到\"></button></div></div>\n      <div class=\"field mt12\"><button class=\"btn text block\" data-act=\"accdel\" data-id=\"" + v9(v382.id) + "\">删除这个账号</button></div>\n      <div style=\"height:8px\"></div>";
      v7.sheet(v4(), {
        key: "accdetail",
        title: "账号详情",
        sub: v381.labelOf(v382),
        body: v387
      });
    }
    window.APP.auth = {
      debugSheet: v70,
      capPoll: v61,
      capMaybeOffer: v69,
      settingsTitle: v14,
      accountsSheet: v117,
      accountDetailSheet: v118,
      accountModeSheet: v75,
      openCredentialEditor: v21,
      credentialOptions: v22,
      setCredentialMethod: v25,
      txnDelegate: v77,
      mapProviderSheet: v82,
      panelLineEntryRow: v97,
      panelLineSelSheet: v111,
      panelLineAvailable: v92,
      panelLineChosen: v94,
      recoveryEntryRow: v98,
      panelLineCachedInfo: v93,
      acceptIOSPanelLine: v95,
      login: v15,
      CAP: v26,
      fetchCaptcha: v34,
      submitLogin: v35,
      capturePageOpen: v39,
      syncCredentialDraft: v24,
      parseTokenText: v56,
      capApply: v63,
      capClipboard: v58,
      capCopy: v64,
      capDiscard: v65,
      capPasteApply: v59,
      capStartPoll: v62,
      capStopPoll: v49,
      capDiagSheet: v66,
      capDiagCopy: v67,
      capDiagClear: v68
    };
  })();
  (() => {
    const v388 = window.APP;
    const v389 = v388.state;
    const v390 = v388.$;
    const v391 = v388.phone;
    const v392 = v388.scroll;
    const v393 = window.MODEL;
    const v394 = window.UI;
    const v395 = window.ZEEHO_THEME;
    const v396 = v393.esc;
    const v397 = window.API;
    const v398 = window.CHG;
    const v399 = window.TASKS;
    const v400 = v388.APP_VER;
    const v401 = () => window.PLATFORM?.preview?.() === true;
    let v402 = 0;
    function v403(v591, v592 = null) {
      let v593 = {};
      let v594 = v592;
      try {
        v593 = window.DIAG?.capture?.() || {};
      } catch {}
      try {
        if (!v594) {
          v594 = window.ACC?.active?.();
        }
      } catch {}
      let v595 = String(v594?.label || v594 && window.ACC?.labelOf?.(v594) || v389.profileUid || "");
      if (v594?.token) {
        v595 = v595.split(String(v594.token)).join("[已隐藏凭据]");
      }
      return {
        ...v593,
        source: "web",
        account: v595 || "应用",
        accountId: String(v594?.id || ""),
        runId: v591 + "-" + Date.now().toString(36) + "-" + ++v402
      };
    }
    function v404(v596, v597, v598 = {}) {
      try {
        window.DIAG?.event?.(v596, {
          category: "background",
          phase: "requested",
          kind: "info",
          ...v597,
          ...v598
        });
      } catch {}
    }
    const v405 = v599 => !v401() && window.NativeShell?.has?.(v599) === true;
    async function v406(v600, v601 = []) {
      if (!v405(v600)) {
        throw new Error("unsupported");
      }
      const v602 = v388.context();
      if (v388.isIOS?.()) {
        await v577();
      }
      if (!v388.current(v602)) {
        throw new Error("stale_session");
      }
      const v603 = await Promise.resolve(window.NativeShell.call(v600, v601));
      if (!v388.current(v602)) {
        throw new Error("stale_session");
      }
      const v604 = v552(v603);
      if (v603 === false || v604?.ok === false || v604?.accepted === false || v604?.canceled === true || v604?.pending === true || v604?.queued === true || v604?.submitted === true) {
        throw Object.assign(new Error("native_rejected"), {
          value: v604
        });
      }
      return v603;
    }
    function v407(v605, v606, v607 = [], {
      category = "background",
      extra = null,
      owner = null
    } = {}) {
      if (!v405(v606)) {
        return window.PLATFORM.unavailable(v605, "compat." + v606);
      }
      const v608 = v403(v606, owner);
      v404(v605, v608, {
        category: category,
        extra: extra
      });
      const v609 = () => {
        v404(v605 + "未能提交", v608, {
          category: category,
          phase: "failed",
          kind: "err",
          extra: extra
        });
        return false;
      };
      const v610 = v611 => {
        const v612 = v552(v611);
        if (v611 === false || v612?.ok === false || v612?.accepted === false || v388.isIOS?.() && v611 !== true && v612?.ok !== true && v612?.accepted !== true) {
          return v609();
        }
        v404(v605 + "已交原生处理", v608, {
          category: category,
          phase: "dispatched",
          extra: extra
        });
        return true;
      };
      try {
        if (v388.isIOS?.()) {
          return Promise.resolve(v406(v606, v607)).then(v610, v609);
        }
        return v610(window.NativeShell.shell()[v606](...v607));
      } catch {
        return v609();
      }
    }
    const v408 = (() => {
      try {
        return new URL(document.location.href).searchParams.get("_shellNav") || "";
      } catch {
        return "";
      }
    })();
    function v409() {
      if (v388.isIOS?.()) {
        return v388.inShell() && !v401() && window.IOSBR?.has?.("app.recovery") === true;
      }
      return !v388.isIOS?.() && v388.inShell() && typeof window.ZeehoShell?.openRecovery === "function";
    }
    function v410() {
      if (v388.isIOS?.()) {
        return v545();
      }
      let v613 = false;
      try {
        const v614 = new URL(document.location.href).searchParams.get("_shellNav") || "";
        v613 = v409() && !!v408 && v614 === v408 && window.ZeehoShell.openRecovery(v408) === true;
      } catch {}
      if (v613) {
        v388.suspendAccountRestore?.();
      } else {
        v394.toast(v391(), "无法打开欢迎与恢复，请重新打开 App 后再试");
      }
      return v613;
    }
    function v411(v615) {
      return v407("请求修改后台同步", "setBackground", [!!v615], {
        extra: {
          enabled: !!v615
        }
      });
    }
    function v412() {
      return v407("请求重新拉起后台同步", "restartBackground");
    }
    function v413(v616) {
      if (!["notifications", "battery", "autostart", "app", "exactalarm"].includes(v616)) {
        return false;
      }
      return v407("请求打开系统设置", "openSettings", [v616], {
        category: v616 === "notifications" ? "notification" : "background",
        extra: {
          page: v616
        }
      });
    }
    function v414() {
      return false;
    }
    function v415() {
      if (v388.isIOS?.()) {
        v542("在 App 内下载更新");
        return false;
      }
      return v407("请求下载软件更新", "downloadAppUpdate", [], {
        category: "action"
      });
    }
    async function v416(v617, v618 = []) {
      try {
        const v619 = await Promise.resolve(v406(v617, v618));
        const v620 = v552(v619);
        if (v620?.pending === true || v620?.queued === true || v620?.submitted === true || v620?.canceled === true || v620?.ok === false || v620?.accepted === false) {
          throw new Error("unconfirmed");
        }
        if (v388.isIOS?.() && v619 !== true && v620?.ok !== true && v620?.accepted !== true) {
          throw new Error("unconfirmed");
        }
        return v620 || v619;
      } catch {
        return false;
      }
    }
    const v417 = v621 => v416("refreshWidget", [Number(v621)]);
    const v418 = () => v416("refreshWidgets");
    const v419 = v622 => v416(v405("pinWidget") ? "pinWidget" : "requestAddWidget", v622 ? [v622] : []);
    const v420 = () => v416("widgetAddStatus");
    const v421 = () => v416("liveUpdateStatus");
    const v422 = v623 => v416("liveUpdateStart", v623 ? [JSON.stringify(v623)] : []);
    const v423 = v624 => v416("liveUpdateUpdate", v624 ? [JSON.stringify(v624)] : []);
    const v424 = v625 => v416("liveUpdateEnd", v625 ? [JSON.stringify(v625)] : []);
    const v425 = v626 => v416("syncStatus", [typeof v626 === "string" ? v626 : JSON.stringify(v626)]);
    function v426() {
      if (v397.source === "demo" || v397.authFailed) {
        return false;
      }
      return !!v397.token || !!v397.loadToken();
    }
    function v427() {
      if (!v426()) {
        return null;
      }
      const v627 = v389.data.service?.serviceRechargeVehicleList?.[0];
      if (!v627) {
        return null;
      }
      const v628 = v388.daysLeft(v627.rechargeEndDate);
      const v629 = v627.rechargeEndDate ? v628 !== "—" && v628 > 0 : v393.on(v627.serviceRechargeStatus);
      return {
        svc: v627,
        left: v628,
        active: v629,
        endDate: v627.rechargeEndDate || v627.rechargeEndTime || "",
        endTime: v627.rechargeEndTime || v627.rechargeEndDate || ""
      };
    }
    function v428(v630, v631, v632 = {}) {
      const v633 = v389.data.user;
      return "<div class=\"idrow\">\n      <span class=\"idrow-avatar\">\n        " + v394.icon("user", 26) + "\n        " + (v633?.avatar ? "<img src=\"" + v396(v633.avatar) + "\" alt=\"\" onerror=\"this.remove()\">" : "") + "\n      </span>\n      <div class=\"idrow-main\">\n        <div class=\"idrow-nick\">" + v396(v630) + "</div>\n        " + (v631 ? "<div class=\"idrow-sub\">" + v396(v631) + "</div>" : "") + "\n      </div>\n      " + (v632.tasks ? "<button class=\"btn tonal small idrow-tasks\" data-act=\"tasks\"><span>任务</span></button>" : "") + "\n    </div>";
    }
    function v429() {
      const v634 = v389.data.user;
      return v634?.sign || (v634?.showId ? "极核号 " + v634.showId : "");
    }
    function v430() {
      return "<span class=\"svip-crown\" aria-hidden=\"true\">" + v394.icon("crown", 108) + "</span>";
    }
    function v431(v635) {
      return "<div class=\"svip-top\" data-act=\"svipsheet\" title=\"智能服务有效至 " + v396(v635.endDate) + " · 点开看详情\">\n      <span class=\"svip-badge\">" + v394.icon("crown", 13) + "<b>智能服务</b></span>\n      <span class=\"svip-left\">剩 " + v635.left + " 天 · " + v396(v635.endDate) + "</span>\n    </div>";
    }
    function v432() {
      const v636 = v427();
      if (!v636 || !v636.active) {
        return;
      }
      const v637 = v636.svc;
      const v638 = v389.data.user?.nick;
      const v639 = v389.data.user?.ok ? v429() : "";
      v394.sheet(v391(), {
        key: "svip",
        title: "智能服务",
        sub: "智能服务有效 · 剩 " + v636.left + " 天",
        body: "\n        <div class=\"svip-panel\">\n          " + v430() + "\n          " + v431(v636) + "\n          <div class=\"svip-name\">SVIP" + (v638 ? "：" + v396(v638) : "") + "</div>\n          " + (v639 ? "<div class=\"svip-sub\">" + v396(v639) + "</div>" : "") + "\n        </div>\n        <div class=\"mt16\">\n          " + v394.kv("服务状态", "智能服务有效期内") + "\n          " + v394.kv("到期时间", v637.rechargeEndTime || v637.rechargeEndDate || "—") + "\n          " + v394.kv("剩余天数", v636.left + " 天") + "\n          " + v394.kv("激活日期", v637.activationDate || "—") + "\n          " + v394.kv("车辆", v637.vehicleName || v389.data.home?.name || "—") + "\n          " + v394.kv("原始状态位", String(v637.serviceRechargeStatus ?? "—"), {
          raw: "serviceRechargeStatus"
        }) + "\n        </div>\n        <div class=\"card-sub mt12\">会员按「智能服务是否过期」判定：到期时间在今天之后就是有效。\n          原始状态位在有效期内也一直是 \"0\"，不能当布尔用，所以只看到期时间。</div>\n        <div style=\"height:8px\"></div>"
      });
    }
    async function v433(v640, v641) {
      if (v401()) {
        return [];
      }
      const v642 = window.ZeehoShell;
      if (!v642 || typeof v642.beginBatterySpan !== "function" || typeof v642.pollBatterySpan !== "function") {
        return [];
      }
      const v643 = v388.context();
      let v644;
      try {
        v644 = v642.beginBatterySpan(v640, v641);
      } catch {
        return [];
      }
      if (!v644) {
        return [];
      }
      const v645 = Date.now() + 12000;
      while (Date.now() < v645 && v388.current(v643)) {
        await new Promise(v646 => setTimeout(v646, 100));
        try {
          const v647 = JSON.parse(v642.pollBatterySpan(v644) || "{}");
          if (v647.ticket !== v644 || !v647.done) {
            continue;
          }
          if (!v647.ok || !v388.current(v643)) {
            return [];
          }
          const v648 = JSON.parse(v647.json || "{}");
          if (v648.ok && Array.isArray(v648.points)) {
            return v648.points.slice(0, 8192);
          } else {
            return [];
          }
        } catch {
          return [];
        }
      }
      return [];
    }
    v388.batterySpanAsync = v433;
    const v434 = [["24h", "24 小时"], ["3d", "3 天"], ["7d", "7 天"], ["30d", "1 个月"]];
    const v435 = new Map();
    const v436 = 900000;
    const v437 = 600000;
    const v438 = new Map();
    function v439(v649 = "") {
      if (v649) {
        for (const [v650, v651] of v438) {
          if (v651.vin === v649) {
            v438.delete(v650);
          }
        }
      } else {
        v438.clear();
      }
      if (!v649 || v440?.vin === v649) {
        v440 = null;
        clearTimeout(v441);
        v441 = 0;
      }
    }
    let v440 = null;
    let v441 = 0;
    function v442(v652) {
      if (!v652 || !Array.isArray(v652.samples)) {
        return v652;
      }
      const v653 = v652.samples.map(v654 => Array.isArray(v654) ? {
        t: Number(v654[0]),
        soc: Number(v654[1]),
        v: Number(v654[2]),
        a: Number(v654[3]),
        state: Number(v654[4]),
        pwr: Number(v654[5])
      } : v654).filter(v655 => v655 && Number.isFinite(v655.t) && Number.isFinite(v655.soc) && Number.isFinite(v655.v));
      return {
        ...v652,
        truncated: v652.truncated === true || v652.metadata?.truncated === true,
        points: v653
      };
    }
    function v443(v656) {
      const v657 = v394.currentSheet?.("battdetail");
      if (v657 && v394.sheetAlive(v657) && v388.current(v656)) {
        v388.batterydetail?.batteryDetailSheet?.({
          handle: v657,
          scope: v656
        });
      }
    }
    function v444(v658, v659) {
      if (v440 !== v658) {
        return;
      }
      v440 = null;
      clearTimeout(v441);
      v441 = 0;
      if (!v388.current(v658.scope)) {
        return;
      }
      v438.set(v658.key, {
        key: v658.key,
        vin: v658.vin,
        scope: v658.scope,
        at: Date.now(),
        data: v659
      });
      while (v438.size > 12) {
        v438.delete(v438.keys().next().value);
      }
      v443(v658.scope);
    }
    function v445() {
      if (v401()) {
        return {
          data: null,
          unavailable: true
        };
      }
      const v660 = v388.context();
      if (!v660?.vin || !v660.token || v660.source === "demo") {
        return {
          data: null,
          unavailable: true
        };
      }
      if (v440 && !v388.current(v440.scope)) {
        v440 = null;
        clearTimeout(v441);
        v441 = 0;
      }
      const v661 = String(v660.owner?.id || window.ACC?.activeId?.() || "single");
      const v662 = String(v660.owner?.uid || v660.uid || "");
      const v663 = String(v660.vin);
      const v664 = JSON.stringify([window.ACC?.activeId?.() || "single", v661, v662, v663]);
      const v665 = v438.get(v664);
      const v666 = v665 && v388.current(v665.scope) ? v665 : null;
      if (v666 && Date.now() - v666.at < 60000) {
        return v666;
      }
      if (window.IOSBR?.has?.("history.ocv")) {
        if (!v440) {
          const v668 = {
            key: v664,
            vin: v663,
            scope: v660
          };
          v440 = v668;
          (async () => {
            try {
              const v669 = await v577();
              if (v440 !== v668 || !v388.current(v660) || v669.accountId !== v661 || v669.vin !== v663) {
                return;
              }
              const v670 = await v571("history.ocv", {
                accountId: v661,
                vin: v663,
                ownerUid: v662,
                scope: v669
              });
              const v671 = v670.report || v670;
              const v672 = v671.metadata;
              if (v440 !== v668 || !v388.current(v660)) {
                return;
              }
              if (v671.ok !== true || v671.vin !== v663 || v672?.accountId !== v661 || v672?.vin !== v663 || Number(v672.generation) !== v669.epoch || v672.frame !== v669.frame || !Array.isArray(v671.samples) || v671.samples.length > 6000) {
                throw new Error("history_invalid_receipt");
              }
              v444(v668, v442(v671));
            } catch (v673) {
              v444(v668, {
                degraded: true,
                message: v673?.message || "本机历史读取失败，请稍后重试。"
              });
            } finally {
              if (v440 === v668) {
                v440 = null;
                v443(v660);
              }
            }
          })();
        }
        return {
          key: v664,
          data: v666?.data || null,
          pending: true
        };
      }
      const v667 = window.ZeehoShell;
      if (!v388.inShell() || !v667 || typeof v388.syncNative !== "function" || typeof v667.batteryOcvHistoryVersion !== "function" || typeof v667.beginBatteryOcvHistory !== "function" || typeof v667.pollBatteryOcvHistory !== "function") {
        return {
          data: null,
          unavailable: true
        };
      }
      try {
        if (Number(v667.batteryOcvHistoryVersion()) !== 1) {
          return {
            data: null,
            unavailable: true
          };
        }
      } catch {
        return {
          data: null,
          unavailable: true
        };
      }
      if (!v440) {
        const v674 = {
          key: v664,
          vin: v663,
          scope: v660,
          identity: {
            vin: v663,
            ownerId: v661,
            ownerUid: v662
          }
        };
        v440 = v674;
        (async () => {
          try {
            const v675 = Number(await v388.syncNative());
            if (v440 !== v674 || !v388.current(v660)) {
              return;
            }
            if (!Number.isSafeInteger(v675) || v675 <= 0) {
              throw new Error("stale_session");
            }
            v674.sessionId = v675;
            const v676 = v667.beginBatteryOcvHistory(JSON.stringify({
              ...v674.identity,
              sessionId: v675
            }));
            if (typeof v676 !== "string" || !v676) {
              throw new Error("history_busy");
            }
            v674.ticket = v676;
            v446(v674);
          } catch {
            v444(v674, {
              degraded: true,
              message: "本机历史读取暂不可用，请稍后重试。"
            });
          } finally {
            if (v440 === v674 && !v674.ticket) {
              v440 = null;
              v443(v660);
            }
          }
        })();
      }
      return {
        key: v664,
        data: v666?.data || null,
        pending: true
      };
    }
    function v446(v677) {
      const v678 = window.ZeehoShell;
      const v679 = Date.now() + 12000;
      const v680 = () => v444(v677, {
        degraded: true,
        message: "本机历史读取失败，请稍后重试。"
      });
      const v681 = () => {
        v441 = 0;
        if (v440 !== v677 || !v388.current(v677.scope)) {
          return;
        }
        let v682;
        try {
          v682 = JSON.parse(v678.pollBatteryOcvHistory(v677.ticket) || "{}");
        } catch {
          v682 = null;
        }
        if (!v388.current(v677.scope)) {
          return;
        }
        if (v682 && v682.ticket !== v677.ticket) {
          v680();
          return;
        }
        if (v682?.done === true) {
          let v683 = null;
          try {
            if (v682.ok === true) {
              v683 = JSON.parse(v682.json || "{}");
            }
          } catch {}
          const v684 = v677.identity;
          const v685 = v683?.metadata;
          if (v683?.ok !== true || v683.vin !== v684.vin || v683.ownerId !== v684.ownerId || v683.ownerUid !== v684.ownerUid || v685?.vin !== v684.vin || v685.ownerId !== v684.ownerId || v685.ownerUid !== v684.ownerUid || v685.frame !== v677.sessionId || v685.sessionId !== v677.sessionId || v685.scopeVerified !== true || !Array.isArray(v683.samples) || v683.samples.length > 6000) {
            v680();
            return;
          }
          v444(v677, v442(v683));
          return;
        }
        if (Date.now() > v679) {
          v444(v677, {
            degraded: true,
            message: "本机历史读取超时，请稍后重试。"
          });
          return;
        }
        v441 = setTimeout(v681, 100);
      };
      v441 = setTimeout(v681, 0);
    }
    function v447(v686) {
      let v687;
      try {
        v687 = v388.context();
      } catch {
        return null;
      }
      if (!v687?.vin || v687.source === "demo") {
        return null;
      }
      const v688 = v689 => {
        const v690 = v435.get(v689);
        if (!v690 || v690.pending || Date.now() - v690.at > v436 || v690.data?.degraded) {
          return null;
        }
        if (v690.scope && !v388.current(v690.scope)) {
          return null;
        }
        if (Array.isArray(v690.data?.rangePoints) && v690.data.rangePoints.length) {
          return v690;
        } else {
          return null;
        }
      };
      for (const v691 of [v687.vin + "|30d", v687.vin + "|7d", v687.vin + "|3d", v687.vin + "|24h"]) {
        const v692 = v688(v691);
        if (!v692) {
          continue;
        }
        try {
          const v693 = window.CHG.remainingRange(v692.data.rangePoints, v686);
          if (v693 !== null) {
            return v693;
          }
        } catch {}
      }
      return null;
    }
    let v448 = 0;
    function v449() {
      const v694 = window.ZeehoShell;
      if (!v694 || typeof v694.beginBatteryHistory !== "function" || v451) {
        return;
      }
      let v695;
      try {
        v695 = v388.context();
      } catch {
        return;
      }
      if (!v695?.vin || v695.source === "demo" || Date.now() - v448 < v437) {
        return;
      }
      const v696 = v695.vin + "|30d";
      const v697 = v435.get(v696);
      if (v697 && Date.now() - v697.at < v437) {
        return;
      }
      v448 = Date.now();
      setTimeout(() => {
        try {
          v450("30d");
        } catch {}
      }, 0);
    }
    function v450(v698 = v389.battRange) {
      if (v401()) {
        return {
          data: null,
          unavailable: true
        };
      }
      if (window.IOSBR?.has?.("history.battery")) {
        const v705 = v389.vin + "|" + v698;
        const v706 = v435.get(v705);
        const v707 = v388.context();
        if (v706 && Date.now() - v706.at < 60000) {
          return v706;
        }
        if (!v451 && v707.vin && v707.source !== "demo") {
          const v708 = {
            key: v705,
            range: v698,
            scope: v707
          };
          v451 = v708;
          (async () => {
            try {
              const v709 = await v577();
              const v710 = v707.owner || window.ACC?.active?.();
              const v711 = await v571("history.battery", {
                accountId: v710?.id,
                vin: v707.vin,
                ownerUid: v710?.uid || "",
                scope: v709,
                range: v698
              });
              const v712 = v711.report || v711;
              const v713 = v712.metadata;
              if (v451 !== v708 || !v388.current(v707) || v713?.accountId !== v710?.id || v713?.vin !== v707.vin || Number(v713.generation) !== v709.epoch || v713.frame !== v709.frame || !Array.isArray(v712.points)) {
                return;
              }
              const v714 = {
                key: v705,
                scope: v707,
                at: Date.now(),
                data: {
                  ...v712,
                  points: v712.points.map(v715 => ({
                    ...v715,
                    st: v715.state ?? v715.st
                  }))
                }
              };
              v435.set(v705, v714);
              v388.mem.battCache = v714;
            } catch (v716) {
              const v717 = v716?.code === "unsupported" || v716?.method === "history.battery" || /尚未同步|超时|取消|超时/.test(String(v716?.message || ""));
              if (v388.current(v707) && !v717) {
                v435.set(v705, {
                  key: v705,
                  at: Date.now(),
                  data: {
                    degraded: true,
                    message: v716.message
                  }
                });
              }
            } finally {
              if (v451 === v708) {
                v451 = null;
                v388.render({
                  keepScroll: true
                });
                if (v394.currentSheet?.("batt")) {
                  v517();
                }
              }
            }
          })();
        }
        return {
          key: v705,
          data: v706?.data || null,
          pending: true
        };
      }
      const v699 = window.ZeehoShell;
      if (!v388.inShell() || !v699 || typeof v699.batteryHistory !== "function" && typeof v699.beginBatteryHistory !== "function") {
        return null;
      }
      const v700 = v389.vin + "|" + v698;
      const v701 = Date.now();
      const v702 = v435.get(v700);
      if (v702 && v701 - v702.at < 60000) {
        return v702;
      }
      if (typeof v699.beginBatteryHistory === "function") {
        if (v451) {
          return {
            key: v700,
            data: v702?.data || null,
            pending: true
          };
        }
        const v718 = {
          key: v700,
          range: v698,
          at: v701,
          scope: v388.context()
        };
        v451 = v718;
        try {
          v699.beginBatteryHistory(v698);
          v453(v718);
        } catch {
          v451 = null;
          return {
            key: v700,
            data: v702?.data || null
          };
        }
        return {
          key: v700,
          data: v702?.data || null,
          pending: true
        };
      }
      let v703 = null;
      try {
        v703 = JSON.parse(v699.batteryHistory(v698) || "{}");
      } catch (v719) {
        console.warn("batteryHistory failed", v719);
      }
      const v704 = {
        key: v700,
        at: v701,
        data: v703
      };
      v435.set(v700, v704);
      v388.mem.battCache = v704;
      return v704;
    }
    let v451 = null;
    let v452 = 0;
    function v453(v720) {
      const v721 = window.ZeehoShell;
      const v722 = Date.now() + 6000;
      const v723 = () => {
        v452 = 0;
        if (v451 !== v720 || !v388.current(v720.scope)) {
          return;
        }
        let v724 = false;
        let v725 = "";
        try {
          const v726 = JSON.parse(v721.pollBatteryHistory() || "{}");
          v724 = !!v726.done;
          v725 = v726.json || "";
        } catch {
          v724 = false;
        }
        if (v724) {
          let v727 = null;
          try {
            v727 = JSON.parse(v725 || "{}");
          } catch {
            v727 = null;
          }
          const v728 = {
            key: v720.key,
            scope: v720.scope,
            at: Date.now(),
            data: v727
          };
          v435.set(v720.key, v728);
          v388.mem.battCache = v728;
          v451 = null;
          v388.render({
            keepScroll: true
          });
          const v729 = v394.currentSheet?.("battdetail");
          if (v729 && v394.sheetAlive(v729)) {
            v388.batterydetail?.batteryDetailSheet?.({
              handle: v729,
              scope: v720.scope
            });
          }
          if (document.querySelector(".sheet.show [data-act=\"battr\"]")) {
            v517();
          }
          return;
        }
        if (Date.now() > v722) {
          v451 = null;
          return;
        }
        v452 = setTimeout(v723, 100);
      };
      v452 = setTimeout(v723, 100);
    }
    function v454() {
      return (v434.find(v730 => v730[0] === v389.battRange) || v434[0])[1];
    }
    function v455(v731, v732) {
      const v733 = new Date(v731);
      const v734 = v735 => String(v735).padStart(2, "0");
      if (v732 === "24h") {
        return v734(v733.getHours()) + ":" + v734(v733.getMinutes());
      } else {
        return v734(v733.getMonth() + 1) + "-" + v734(v733.getDate());
      }
    }
    const v456 = 18000000;
    const v457 = {
      idle: 300000,
      powered: 60000,
      charging: 150000
    };
    const v458 = 90000;
    const v459 = v736 => {
      const v737 = v736?.state ?? v736?.st;
      if (v737 === null || v737 === undefined || v737 === "") {
        return NaN;
      } else {
        return Number(v737);
      }
    };
    const v460 = v738 => v459(v738) === 1 || v459(v738) === 2 ? "charging" : Number(v738.pwr) === 1 ? "powered" : "idle";
    const v461 = v739 => v457[v460(v739)];
    function v462(v740, v741) {
      if (v741) {
        return "<div class=\"batt-wrap\"><div class=\"sk\" style=\"height:152px;border-radius:12px\"></div></div>";
      }
      if (v740?.degraded) {
        const v784 = v740.degraded === "legacy_key_unavailable";
        const v785 = Number(v740.archived) || 0;
        return "<div class=\"note warn batt-degraded\">\n        " + v394.icon("alert", 18) + "\n        <div class=\"grow\">\n          <b>" + (v784 ? "这批历史暂时读不出来" : "历史文件读取出错") + "</b>\n          <div class=\"batt-degraded-tip\">" + (v784 ? "旧记录是加密存的，当前系统里那把密钥已经不可用（常见于装了 Keystore 拦截/伪装类模块后配置变动）。数据本体还在" + (v785 ? "，已归档 " + v785 + " 份" : "") + "，没有删除。" : "文件可能已被截断或损坏，未删除。" + (v740.message ? "（" + v396(String(v740.message)) + "）" : "")) + "</div>\n        </div>\n      </div>";
      }
      const v742 = (v740?.points || []).filter(v786 => v786 && v786.t && v786.soc !== null && v786.soc !== undefined);
      if (v742.length < 2) {
        return "<div class=\"chg-empty\">" + (v740?.count ? "采样还不够画出曲线" : "还没有电量记录") + "</div>";
      }
      const v743 = 320;
      const v744 = 152;
      const v745 = 36;
      const v746 = 10;
      const v747 = 12;
      const v748 = 24;
      const v749 = v743 - v745 - v746;
      const v750 = v744 - v747 - v748;
      const v751 = Number(v740.from) || v742[0].t;
      const v752 = Math.max(v751 + 1, Number(v740.to) || v742[v742.length - 1].t);
      const v753 = v752 - v751;
      const v754 = Math.min(...v742.map(v787 => Number(v787.soc)));
      const v755 = Math.max(...v742.map(v788 => Number(v788.soc)));
      let v756 = 0;
      let v757 = 100;
      if (v755 - v754 < 20) {
        const v789 = (v755 + v754) / 2;
        v756 = Math.max(0, v789 - 6);
        v757 = Math.min(106, v756 + 12);
        v756 = Math.max(0, v757 - 12);
      }
      const v758 = v790 => v745 + Math.max(0, Math.min(1, (v790 - v751) / v753)) * v749;
      const v759 = v791 => v747 + (1 - (Math.max(v756, Math.min(v757, v791)) - v756) / (v757 - v756)) * v750;
      const v760 = [v756, (v756 + v757) / 2, v757].map(v792 => "\n      <line class=\"g\" x1=\"" + v745 + "\" y1=\"" + v759(v792).toFixed(1) + "\" x2=\"" + (v743 - v746) + "\" y2=\"" + v759(v792).toFixed(1) + "\"/>\n      <text x=\"" + (v745 - 6) + "\" y=\"" + (v759(v792) + 3.2).toFixed(1) + "\" text-anchor=\"end\">" + Math.round(v792) + "%</text>").join("");
      const v761 = {
        "24h": 300000,
        "3d": 900000,
        "7d": 1800000,
        "30d": 7200000
      };
      const v762 = () => (v761[v389.battRange] || v761["24h"]) * 1.5;
      const v763 = (v793, v794) => {
        const v795 = v794.t - v793.t;
        if (v795 <= 0) {
          return false;
        }
        const v796 = Math.min(v461(v793), v461(v794));
        const v797 = v796 >= v457.idle ? v458 : v458 / 3;
        return v795 > Math.max(v796 * 3 + v797, v762());
      };
      const v764 = {
        charge: "var(--c-success)",
        discharge: "var(--c-warning)",
        idle: "var(--md-sys-color-outline)"
      };
      const v765 = 0.5;
      const v766 = v798 => {
        const v799 = v798[0];
        const v800 = v798[v798.length - 1];
        const v801 = Number(v800.soc) - Number(v799.soc);
        if (v801 >= v765) {
          return "charge";
        }
        if (v801 <= -v765) {
          return "discharge";
        }
        return "idle";
      };
      const v767 = (v802, v803) => "M" + v758(v802.t).toFixed(1) + " " + v759(v802.soc).toFixed(1) + " L" + v758(v803.t).toFixed(1) + " " + v759(v803.soc).toFixed(1);
      const v768 = {
        charge: [],
        discharge: [],
        idle: []
      };
      const v769 = [];
      const v770 = [];
      let v771 = null;
      for (let v804 = 0; v804 < v742.length; v804++) {
        const v805 = v742[v804];
        const v806 = v742[v804 - 1];
        if (!v806) {
          v771 = [v805];
          v770.push(v771);
          continue;
        }
        const v807 = v805.t - v806.t;
        if (v807 <= 0) {
          v771 = [v805];
          v770.push(v771);
          continue;
        }
        if (v807 > v456 || v763(v806, v805)) {
          v769.push(v767(v806, v805));
          v771 = [v805];
          v770.push(v771);
          continue;
        }
        v771.push(v805);
      }
      const v772 = 5;
      const v773 = 1200000;
      const v774 = v808 => {
        const v809 = Math.floor(v772 / 2);
        return v808.map((v810, v811) => {
          let v812 = 0;
          let v813 = 0;
          for (let v814 = -v809; v814 <= v809; v814++) {
            const v815 = v808[v811 + v814];
            if (v815 && Number.isFinite(Number(v815.soc))) {
              v812 += Number(v815.soc);
              v813++;
            }
          }
          if (v813) {
            return v812 / v813;
          } else {
            return Number(v810.soc);
          }
        });
      };
      const v775 = v816 => {
        if (v816.length < 2) {
          return [];
        }
        const v817 = v774(v816);
        const v818 = v824 => Math.sign(v817[v824] - v817[v824 - 1]);
        const v819 = [];
        let v820 = 0;
        let v821 = 0;
        for (let v825 = 1; v825 < v816.length; v825++) {
          const v826 = v818(v825);
          if (v826 === 0) {
            continue;
          }
          if (v821 === 0) {
            v821 = v826;
            continue;
          }
          if (v826 !== v821) {
            v819.push([v820, v825]);
            v820 = v825;
            v821 = v826;
          }
        }
        v819.push([v820, v816.length - 1]);
        const v822 = [];
        for (const v827 of v819) {
          const v828 = v816[v827[1]].t - v816[v827[0]].t;
          if (v822.length && v828 < v773) {
            v822[v822.length - 1][1] = v827[1];
            continue;
          }
          v822.push([...v827]);
        }
        if (v822.length > 1) {
          const v829 = v822[0];
          if (v816[v829[1]].t - v816[v829[0]].t < v773) {
            v822[1][0] = v829[0];
            v822.shift();
          }
        }
        const v823 = [];
        for (const [v830, v831] of v822) {
          if (v831 <= v830) {
            continue;
          }
          const v832 = v766([v816[v830], v816[v831]]);
          const v833 = v823[v823.length - 1];
          if (v833 && v833.kind === v832) {
            v833.to = v831;
          } else {
            v823.push({
              from: v830,
              to: v831,
              kind: v832
            });
          }
        }
        return v823;
      };
      const v776 = (v834, v835, v836) => {
        const v837 = globalThis.CHARTPATH;
        if (v837) {
          return v837.path(v834, v835, v836, v839 => v758(v839.t), v840 => v759(v840.soc));
        }
        const v838 = [];
        for (let v841 = v835; v841 <= v836; v841++) {
          if (!v834[v841]) {
            continue;
          }
          v838.push("" + (v838.length ? "L" : "M") + v758(v834[v841].t).toFixed(1) + " " + v759(v834[v841].soc).toFixed(1));
        }
        return v838.join(" ");
      };
      const v777 = [];
      for (const v842 of v770) {
        if (v842.gap) {
          continue;
        }
        if (v842.length < 2) {
          v777.push("<circle class=\"pt-idle\" cx=\"" + v758(v842[0].t).toFixed(1) + "\" cy=\"" + v759(v842[0].soc).toFixed(1) + "\" r=\"2.2\"/>");
          continue;
        }
        for (const v843 of v775(v842)) {
          const v844 = v776(v842, v843.from, v843.to);
          if (v844) {
            v768[v843.kind].push(v844);
          }
        }
      }
      const v778 = Object.keys(v764).map(v845 => "" + (v768[v845].length ? "<path class=\"line " + v845 + "\" style=\"--c-chg:" + v764[v845] + "\" d=\"" + v768[v845].join(" ") + "\"/>" : "")).join("") + (v769.length ? "<path class=\"line idle dashed\" style=\"--c-chg:" + v764.idle + "\" d=\"" + v769.join(" ") + "\"/>" : "") + v777.join("");
      const v779 = v742[v742.length - 1];
      const v780 = v770.filter(v846 => !v846.gap && v846.length >= 2).pop();
      const v781 = v780 ? v775(v780) : [];
      const v782 = v780 && v780[v780.length - 1] === v779 && v781.length ? v781[v781.length - 1].kind : "idle";
      const v783 = v742.map(v847 => ({
        t: v847.t,
        soc: Number(v847.soc),
        st: Number.isFinite(v459(v847)) ? v459(v847) : 0,
        ...(Number.isFinite(Number(v847.pwr)) ? {
          pwr: Number(v847.pwr)
        } : {}),
        ...(v847.odo != null && Number.isFinite(Number(v847.odo)) ? {
          odo: Number(v847.odo)
        } : {})
      }));
      return "<div class=\"batt-wrap\" data-batt='" + v396(JSON.stringify(v783)) + "' data-time=\"" + v751 + " " + v752 + "\" data-vb=\"" + v743 + " " + v744 + "\" data-box=\"" + v745 + " " + v747 + " " + v749 + " " + v750 + "\" data-ybox=\"" + v756 + " " + v757 + "\">\n      <svg class=\"chg-svg batt-svg\" viewBox=\"0 0 " + v743 + " " + v744 + "\" role=\"img\"\n        style=\"--c-chg:" + v764[v782] + "\"\n        aria-label=\"最近" + v396(v454()) + "电量曲线\">\n        " + v760 + "\n        " + v778 + "\n        <text x=\"" + v745 + "\" y=\"" + (v744 - 8) + "\" text-anchor=\"start\">" + v396(v455(v751, v389.battRange)) + "</text>\n        <text x=\"" + (v743 - v746) + "\" y=\"" + (v744 - 8) + "\" text-anchor=\"end\">" + v396(v455(v752, v389.battRange)) + "</text>\n        <line class=\"probe-v\" x1=\"0\" y1=\"" + v747 + "\" x2=\"0\" y2=\"" + (v747 + v750) + "\" style=\"opacity:0\"/>\n        <circle class=\"probe-d\" cx=\"0\" cy=\"0\" r=\"4\" style=\"opacity:0\"/>\n      </svg>\n      <div class=\"probe-tip\" hidden></div>\n      <div class=\"chg-legend batt-legend\"><span class=\"lg\"><i style=\"background:var(--c-success)\"></i>充电</span><span class=\"lg\"><i style=\"background:var(--c-warning)\"></i>放电</span><span class=\"lg\"><i style=\"background:var(--md-sys-color-outline)\"></i>静置（虚线＝后台未记录）</span></div>\n    </div>";
    }
    function v463(v848 = v391(), v849 = () => true) {
      const v850 = v848?.querySelector?.(".batt-wrap");
      const v851 = v850 && v850.querySelector("svg");
      if (!v850 || !v851) {
        return;
      }
      let v852 = [];
      try {
        v852 = JSON.parse(v850.dataset.batt || "[]");
      } catch {
        v852 = [];
      }
      if (!v852.length) {
        return;
      }
      const [v853, v854] = String(v850.dataset.vb || "320 152").split(" ").map(Number);
      const [v855, v856, v857, v858] = String(v850.dataset.box || "36 12 274 116").split(" ").map(Number);
      const v859 = v851.querySelector(".probe-v");
      const v860 = v851.querySelector(".probe-d");
      const v861 = v850.querySelector(".probe-tip");
      const [v862, v863] = String(v850.dataset.time || v852[0].t + " " + v852[v852.length - 1].t).split(" ").map(Number);
      const v864 = v871 => v855 + Math.max(0, Math.min(1, (v871 - v862) / Math.max(1, v863 - v862))) * v857;
      const v865 = v872 => {
        const v873 = new Date(v872);
        const v874 = v875 => String(v875).padStart(2, "0");
        if (v389.battRange === "24h") {
          return v874(v873.getHours()) + ":" + v874(v873.getMinutes());
        } else {
          return v874(v873.getMonth() + 1) + "-" + v874(v873.getDate()) + " " + v874(v873.getHours()) + ":" + v874(v873.getMinutes());
        }
      };
      const v866 = v876 => {
        let v877 = v852[0];
        for (const v878 of v852) {
          if (Math.abs(v878.t - v876) < Math.abs(v877.t - v876)) {
            v877 = v878;
          }
        }
        return v877;
      };
      let v867 = 0;
      const v868 = () => {
        v859.style.opacity = "0";
        v860.style.opacity = "0";
        v861.hidden = true;
      };
      const v869 = (v879, v880) => {
        if (!v849()) {
          return v868();
        }
        const v881 = v851.getBoundingClientRect();
        if (!v881.width) {
          return;
        }
        const v882 = (v879 - v881.left) / v881.width * v853;
        const v883 = Math.max(0, Math.min(1, (v882 - v855) / v857));
        const v884 = v862 + v883 * (v863 - v862);
        const v885 = v866(v884);
        const [v886, v887] = (v850.dataset.ybox || "0 100").split(" ").map(Number);
        const v888 = v856 + (1 - (Math.max(v886, Math.min(v887, v885.soc)) - v886) / (v887 - v886 || 1)) * v858;
        v859.setAttribute("x1", v864(v885.t).toFixed(1));
        v859.setAttribute("x2", v864(v885.t).toFixed(1));
        v859.style.opacity = "1";
        v860.setAttribute("cx", v864(v885.t).toFixed(1));
        v860.setAttribute("cy", v888.toFixed(1));
        v860.style.opacity = "1";
        const v889 = v881.left + v864(v885.t) / v853 * v881.width;
        v861.hidden = false;
        const v890 = [v885.pwr === 1 ? "整车开机" : v885.pwr === 0 ? "已锁车" : "", v885.odo != null && Number.isFinite(Number(v885.odo)) ? (Number(v885.odo) / 1000).toFixed(1) + " km" : ""].filter(Boolean).join(" · ");
        v861.textContent = v865(v885.t) + " · " + v885.soc + "%" + (v885.st === 1 ? " · 充电中" : v885.st === 2 ? " · 已充满" : "") + (v890 ? " · " + v890 : "");
        const v891 = v861.offsetWidth || 90;
        const v892 = Math.max(4, Math.min(v881.width - v891 - 4, v889 - v881.left - v891 / 2));
        v861.style.left = v892 + "px";
        v861.style.top = Math.max(2, v888 / v854 * v881.height - 30) + "px";
      };
      const v870 = () => {
        clearTimeout(v867);
        v867 = setTimeout(v868, 1500);
      };
      v851.style.touchAction = "pan-y";
      v851.addEventListener("pointerdown", v893 => {
        clearTimeout(v867);
        try {
          v851.setPointerCapture(v893.pointerId);
        } catch {}
        v869(v893.clientX, v893.clientY);
      });
      v851.addEventListener("pointermove", v894 => {
        if (v894.buttons === 0 && v894.pointerType === "mouse") {
          return;
        }
        v869(v894.clientX, v894.clientY);
      });
      v851.addEventListener("mousemove", v895 => {
        clearTimeout(v867);
        v869(v895.clientX, v895.clientY);
      });
      v851.addEventListener("mouseleave", () => {
        clearTimeout(v867);
        v868();
      });
      v851.addEventListener("pointerup", v870);
      v851.addEventListener("pointercancel", () => {
        clearTimeout(v867);
        v868();
      });
    }
    function v464(v896 = {}, v897 = false) {
      return "<div class=\"batt-summary" + (v897 ? " batt-summary-card" : "") + "\">\n      " + v394.stat("最高电量", v896.socMax ?? "—", "%", "", {
        fit: true
      }) + "\n      " + v394.stat("最低电量", v896.socMin ?? "—", "%", "", {
        fit: true
      }) + "\n      " + v394.stat("充电量", v896.chargeKwh ?? "—", "kWh", "", {
        fit: true
      }) + "\n      " + v394.stat("充电时长", v393.minutes(v896.chargeMin), "", "", {
        fit: true
      }) + "\n    </div>";
    }
    function v465() {
      if (v388.isIOS?.() || !v401() && !v388.inShell()) {
        return "";
      }
      if (!v389.vin) {
        return "";
      }
      const v898 = v389.data.home || {};
      const v899 = v398?.capacity?.(v389.vin);
      const v900 = window.CAPBOOK?.nominal?.(v389.vin, v898.type);
      const v901 = v398?.lastSession?.(v389.vin);
      const v902 = v388.batterydetail?.healthPair?.(v899, v900) || "";
      const v903 = v913 => v913 === null || v913 === undefined || v913 === "" || !Number.isFinite(Number(v913)) ? null : Number(v913);
      const v904 = [];
      const v905 = v903(v901?.e);
      if (v905) {
        v904.push({
          k: "上次充电",
          v: v393.relTime(v905),
          u: ""
        });
      }
      const v906 = v903(v901?.durMin);
      if (v906 > 0) {
        const v914 = v903(v901?.soc0);
        const v915 = v903(v901?.soc1);
        const v916 = v914 !== null && v915 !== null && v914 >= 0 && v915 <= 100 && v915 > v914 ? Math.round(v915 - v914) : null;
        const v917 = v916 !== null ? " · " + v916 + "%" : "";
        const v918 = Number((v906 / 60).toFixed(1));
        v904.push({
          k: "充电时长",
          v: v918 + "小时" + v917,
          u: ""
        });
      }
      const v907 = v901 ? v398?.usageOf?.(v901, v898, v389.data.battery || {}) : null;
      const v908 = v903(v907?.per10);
      const v909 = v908 !== null && v908 > 0 ? v908 * 10 : null;
      if (v909 !== null && v909 > 0) {
        v904.push({
          k: "满电续航",
          v: "约 " + Math.round(v909),
          u: "km"
        });
      }
      const v910 = v900?.src === "manual" ? v903(v900.ah) : null;
      const v911 = v903(v899?.ah);
      if (v909 !== null && v909 > 0 && v910 !== null && v910 > 0) {
        const v919 = v909 / v910;
        const v920 = v911 !== null && v911 > 0 && v911 < v910;
        const v921 = v920 ? [v919, v909 / v911] : [v919];
        const v922 = v921.length === 2 ? Math.min(...v921).toFixed(1) + "–" + Math.max(...v921).toFixed(1) : v919.toFixed(1);
        v904.push({
          k: "预估能耗",
          v: v922,
          u: "km/Ah"
        });
      }
      const v912 = v902 || v904.length ? "<div class=\"batt-summary batt-summary-card\">" + v902 + v904.map(v923 => v394.stat(v923.k, v923.v, v923.u, "", {
        fit: true
      })).join("") + "</div>" : "";
      return v394.card(v394.cardHead("电池信息", "", "<button class=\"btn text sm\" data-act=\"battdetail\">查看详情</button>", "battery") + v912, "battery-info-card");
    }
    function v466() {
      return v465();
    }
    function v467() {
      if (!v388.inShell() || !window.ZeehoShell || typeof window.ZeehoShell.backgroundStatus !== "function") {
        return null;
      }
      const v924 = Date.now();
      if (v388.mem.bgCache && v924 - v388.mem.bgCacheAt < 30000) {
        return v388.mem.bgCache;
      }
      try {
        const v925 = JSON.parse(window.ZeehoShell.backgroundStatus() || "{}");
        if (!v925 || typeof v925 !== "object" || Array.isArray(v925)) {
          throw new Error("invalid background status");
        }
        const v926 = typeof v925.foreground === "boolean" || typeof v925.serviceRunning === "boolean";
        const v927 = typeof v925.vehicleAuthFailed === "boolean" || typeof v925.accountAuthFailed === "boolean";
        v388.mem.bgCache = {
          ...v925,
          rootEnhance: v480(v925.rootEnhance)
        };
        if (v926) {
          v388.mem.bgCache.foreground = typeof v925.foreground === "boolean" ? v925.foreground : !!v925.service;
          v388.mem.bgCache.service = v388.mem.bgCache.foreground;
          v388.mem.bgCache.serviceRunning = typeof v925.serviceRunning === "boolean" ? v925.serviceRunning : v388.mem.bgCache.foreground || !!v925.service;
        }
        if (v927) {
          v388.mem.bgCache.vehicleAuthFailed = !!v925.vehicleAuthFailed;
          v388.mem.bgCache.accountAuthFailed = !!v925.accountAuthFailed;
          v388.mem.bgCache.authFailed = !!v925.vehicleAuthFailed || !!v925.accountAuthFailed;
        }
      } catch {
        v388.mem.bgCache = null;
      }
      v388.mem.bgCacheAt = v924;
      return v388.mem.bgCache;
    }
    function v468(v928) {
      const v929 = v928 && v928.rootEnhance;
      return v479() && !!v929 && v929.supported === true && v929.mode === "supervisor" && v929.enabled !== false && v929.rootGranted === true && v929.running === true && v929.active === true && v929.state === "running";
    }
    function v469(v930) {
      if (!v930 || !v930.enabled || v930.configured === false || v930.authFailed) {
        return null;
      }
      const v931 = typeof v930.foreground === "boolean" || typeof v930.serviceRunning === "boolean";
      const v932 = v931 ? !!v930.foreground || !!v930.serviceRunning : !!v930.service;
      const v933 = v468(v930);
      const v934 = v933 ? "增强保活运行中，正在守护后台同步" : "后台同步运行中";
      if (v932) {
        return {
          ok: true,
          degraded: false,
          modern: v931,
          enhance: v933,
          tone: "ok",
          label: v933 ? "增强保活中" : "运行中",
          desc: v934
        };
      }
      if (v930.job) {
        return {
          ok: false,
          degraded: true,
          modern: v931,
          enhance: v933,
          tone: "",
          label: "等待更新",
          desc: "已安排后台更新，系统可能延后"
        };
      }
      return {
        ok: false,
        degraded: false,
        modern: v931,
        enhance: v933,
        tone: "warn",
        label: "需检查",
        desc: "点开检查异常"
      };
    }
    const v470 = {};
    const v471 = {
      enabled: false,
      time: "09:00",
      background: true,
      alertsLow: false,
      alertsOffline: false,
      alertsTire: false,
      lastAt: 0,
      lastResult: ""
    };
    function v472() {
      if (v401()) {
        return null;
      }
      if (!window.ZeehoShell || typeof window.ZeehoShell.autoTask !== "function") {
        return null;
      }
      try {
        const v935 = JSON.parse(window.ZeehoShell.autoTask() || "{}");
        Object.assign(v471, v935);
        v471.time = /^\d{2}:\d{2}$/.test(v471.time || "") ? v471.time : "09:00";
      } catch {}
      try {
        v471.background = !!window.ZeehoShell.background();
      } catch {
        v471.background = true;
      }
      return v471;
    }
    function v473(v936 = {}) {
      if (v401()) {
        return window.PLATFORM.unavailable("每日后台任务");
      }
      const v937 = v471.postContent;
      Object.assign(v471, v936);
      const v938 = {};
      for (const v941 of ["enabled", "time", "postContent", "deleteAfterPost", "gapMs", "alertsLow", "alertsOffline", "alertsTire"]) {
        if (Object.prototype.hasOwnProperty.call(v936, v941)) {
          v938[v941] = v936[v941];
        }
      }
      const v939 = v403("automatic-settings");
      const v940 = {};
      for (const [v942, v943] of Object.entries(v938)) {
        if (v942 === "postContent") {
          Object.assign(v940, {
            postContentChanged: v937 !== v943,
            postContentLength: typeof v943 === "string" ? v943.length : 0,
            usesDefaultContent: !v943
          });
        } else if (typeof v943 === "boolean" || v942 === "gapMs" && Number.isFinite(Number(v943)) || v942 === "time" && /^\d{2}:\d{2}$/.test(String(v943))) {
          v940[v942] = v943;
        }
      }
      v404("请求保存自动任务偏好", v939, {
        category: "settings",
        extra: v940
      });
      try {
        window.ZeehoShell?.setAutoTask?.(JSON.stringify(v938));
      } catch {
        v404("自动任务偏好未能提交", v939, {
          category: "settings",
          phase: "failed",
          kind: "err",
          extra: v940
        });
      }
    }
    function v474() {
      if (v401()) {
        return false;
      }
      return typeof window.ZeehoShell?.autoTaskScope === "function" && typeof window.ZeehoShell?.setAutoTaskScope === "function";
    }
    function v475(v944) {
      if (!v474() || !v944) {
        return null;
      }
      try {
        const v945 = JSON.parse(window.ZeehoShell.autoTaskScope(v944) || "{}");
        if (!v945 || typeof v945 !== "object") {
          return null;
        }
        return {
          sign: v945.sign !== false,
          tasks: v945.tasks !== false
        };
      } catch {
        return null;
      }
    }
    function v476(v946, v947) {
      if (!v474() || !v946 || !v947) {
        return false;
      }
      const v948 = window.ACC?.snapshot?.(v946) || {
        id: v946,
        label: v946
      };
      const v949 = v403("automatic-scope", v948);
      const v950 = {
        sign: !!v947.sign,
        tasks: !!v947.tasks
      };
      v404("请求保存账号自动范围", v949, {
        category: "settings",
        extra: v950
      });
      try {
        window.ZeehoShell.setAutoTaskScope(JSON.stringify({
          accountId: v946,
          sign: !!v947.sign,
          tasks: !!v947.tasks
        }));
        return true;
      } catch {
        v404("账号自动范围未能提交", v949, {
          category: "settings",
          phase: "failed",
          kind: "err",
          extra: v950
        });
        return false;
      }
    }
    const v477 = {
      at: 0
    };
    function v478() {
      if (!v388.inShell() || !window.ZeehoShell || typeof window.ZeehoShell.restartBackground !== "function") {
        return false;
      }
      if (typeof document !== "undefined" && document.hidden) {
        return false;
      }
      const v951 = Date.now();
      if (v477.at && v951 - v477.at < 60000) {
        return false;
      }
      const v952 = v467();
      if (!v952 || !v952.enabled || v952.configured === false || v952.authFailed) {
        return false;
      }
      const v953 = typeof v952.foreground === "boolean" || typeof v952.serviceRunning === "boolean";
      const v954 = v953 ? !!v952.foreground || !!v952.serviceRunning : !!v952.service;
      if (v954) {
        return false;
      }
      v477.at = v951;
      if (!v412()) {
        return false;
      }
      v388.mem.bgCache = null;
      v404("应用在前台，后台同步没在运行，已自动拉起", v403("auto-revive"), {
        category: "background"
      });
      return true;
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        return;
      }
      v490();
      v491();
      v478();
      if (v479()) {
        v486();
      } else {
        v510({
          quiet: true
        });
      }
    });
    function v479() {
      const v955 = window.ZeehoShell;
      return !v401() && typeof v955?.rootSupervisorStatus === "function" && typeof v955?.setRootSupervisorEnabled === "function" && typeof v955?.checkRootSupervisor === "function";
    }
    function v480(v956 = null) {
      if (!v479()) {
        return null;
      }
      try {
        const v957 = JSON.parse(window.ZeehoShell.rootSupervisorStatus() || "{}");
        if (v957 && typeof v957 === "object" && !Array.isArray(v957) && v957.supported === true && v957.mode === "supervisor") {
          return v957;
        }
      } catch {}
      if (v956?.supported === true && v956.mode === "supervisor") {
        return v956;
      } else {
        return null;
      }
    }
    function v481() {
      return v467()?.rootEnhance || null;
    }
    function v482(v958) {
      if (!v479()) {
        return {
          label: "需更新 App",
          desc: "更新App后可使用增强保活"
        };
      }
      if (!v958) {
        return {
          label: "状态未读取",
          desc: "暂时没有读到增强保活状态，请重新检查。"
        };
      }
      if (v958.enabled === false || v958.state === "disabled") {
        return {
          label: "已停用",
          desc: "已停用可选增强，常规后台同步仍按原设置工作。"
        };
      }
      if (v958.state === "checking") {
        return {
          label: "正在检查",
          desc: "正在静默检查已授予的 root 权限，请稍后重新检查。"
        };
      }
      if (v958.reason === "legacy_module") {
        return {
          label: "需处理旧模块",
          desc: "检测到旧保活模块，请在 root 管理器中停用或移除旧模块后重新检查。"
        };
      }
      if (v958.reason === "unsupported_manager") {
        return {
          label: "当前环境不支持",
          desc: "当前 root 管理器暂不支持静默检测，增强保活暂不可用。"
        };
      }
      if (v958.reason === "not_granted" || v958.state === "unavailable") {
        return {
          label: "等待 root 授权",
          desc: "尚未验证到可用的 root 授权，请在 root 管理器中为本应用直接授权后重新检查。"
        };
      }
      if (v958.reason === "background_disabled") {
        return {
          label: "已暂停",
          desc: "后台同步未开启，增强保活已暂停。开启后台同步后会自动检查恢复。"
        };
      }
      if (v958.reason === "unconfigured") {
        return {
          label: "等待配置",
          desc: "请先登录并选择车辆，配置就绪后会自动检查恢复。"
        };
      }
      if (v958.state === "failed" || v958.reason === "start_failed") {
        return {
          label: "启动未成功",
          desc: "增强保活尚未启动成功，请稍后重新检查。"
        };
      }
      if (v958.rootGranted === true && v958.running === true && v958.active === true && v958.state === "running") {
        return {
          label: "运行中",
          desc: "增强保活正在守护后台同步；系统策略和网络仍可能延后更新。"
        };
      }
      if (v958.state === "paused") {
        return {
          label: "已暂停",
          desc: "当前监控条件未就绪，增强保活已暂停；App 启动或唤醒后会再次检查。"
        };
      }
      return {
        label: "等待恢复",
        desc: "增强保活尚未确认运行，请重新检查。"
      };
    }
    function v483(v959, v960) {
      const v961 = v482(v959);
      const v962 = v960 && v479();
      return "<p>在 root 管理器中为本应用授予 root 后自动启用</p>\n      <p class=\"bg-guide-detected\"><span>" + v396(v961.label) + " · " + v396(v961.desc) + "</span></p>\n      <p class=\"bg-guide-hint\">这是可选增强，只守护后台同步，不迁移电量或充电记录。App 启动或唤醒时也会检查并恢复监督器。</p>\n      <p class=\"bg-guide-hint\">重新启动手机后，需要等待 App 再次启动或唤醒，增强保活才会恢复。</p>\n      <div class=\"bg-guide-actions\">" + v504("bgrootcheck", "重新检查", v962) + (v962 && v959 ? "<button class=\"btn text\" data-act=\"bgroottoggle\" data-v=\"" + (v959.enabled === false ? "1" : "0") + "\">" + (v959.enabled === false ? "恢复可选增强" : "停用可选增强") + "</button>" : "") + "</div>";
    }
    function v484({
      handle = null
    } = {}) {
      if (handle && !v394.sheetAlive(handle)) {
        return false;
      }
      v490();
      return v394.sheet(v391(), {
        key: "bgroot",
        title: "增强保活",
        sub: "可选 · 需已授予 root",
        body: "<div class=\"bg-guide-step-body\">" + v483(v481(), !v401()) + "</div>"
      });
    }
    function v485() {
      const v963 = v394.currentSheet("bgroot");
      const v964 = v499.handle;
      const v965 = () => {
        v490();
        v388.render?.({
          keepScroll: true
        });
        if (v394.sheetAlive(v964) && v499.handle === v964) {
          v511({
            handle: v964
          });
        }
        if (v394.sheetAlive(v963) && v394.currentSheet("bgroot") === v963) {
          v484({
            handle: v963
          });
        }
      };
      v965();
      for (const v966 of [600, 1800, 4000]) {
        setTimeout(() => {
          if (!document.hidden && (v394.sheetAlive(v964) && v499.handle === v964 || v394.sheetAlive(v963) && v394.currentSheet("bgroot") === v963)) {
            v965();
          }
        }, v966);
      }
    }
    function v486() {
      if (!v479()) {
        return false;
      }
      try {
        window.ZeehoShell.checkRootSupervisor();
      } catch {
        v394.toast(v391(), "未能提交检查，请稍后重试");
        return false;
      }
      v485();
      return true;
    }
    function v487(v967) {
      if (!v479() || !["1", "0"].includes(v967)) {
        return false;
      }
      try {
        window.ZeehoShell.setRootSupervisorEnabled(v967);
      } catch {
        v394.toast(v391(), "偏好未能保存，请稍后重试");
        return false;
      }
      v485();
      return true;
    }
    function v488(v968) {
      const v969 = v394.currentSheet("bgstatus");
      setTimeout(() => {
        v388.mem.bgCache = null;
        const v970 = v467();
        v388.render({
          keepScroll: true
        });
        if (v394.sheetAlive(v969)) {
          v511({
            handle: v969
          });
        }
        const v971 = !v970?.enabled ? "后台尚未运行，请查看运行状态" : typeof v970.foreground !== "boolean" ? v970.service ? "后台服务已拉起，旧版无法确认前台保障" : v970.job ? "已安排周期任务，后台服务未运行" : "后台尚未运行，请查看运行状态" : v970.foreground ? v968 : v970.serviceRunning ? "后台服务存活，但无前台保障，请查看运行状态" : v970.job ? "已安排周期任务，后台服务未运行" : "后台尚未运行，请查看运行状态";
        v394.toast(v391(), v971);
      }, 900);
    }
    const v489 = {
      at: 0,
      data: null
    };
    function v490() {
      v388.mem.bgCache = null;
      v388.mem.bgCacheAt = 0;
    }
    function v491() {
      v489.at = 0;
    }
    let v492 = null;
    let v493 = null;
    function v494(v972) {
      if (!v405("notifyGroups")) {
        return null;
      }
      if (v388.isIOS?.() && v493 && !v388.current(v493)) {
        v489.data = null;
        v489.at = 0;
        v493 = null;
        v492 = null;
      }
      const v973 = Date.now();
      if (!v972 && v489.at && v973 - v489.at < 30000) {
        return v489.data;
      }
      if (v388.isIOS?.()) {
        if (!v492) {
          const v975 = {
            scope: v388.context(),
            handle: v394.currentSheet?.("bgnotifysheet")
          };
          v492 = v975;
          v493 = v975.scope;
          v406("notifyGroups").then(v976 => {
            if (v492 !== v975 || !v388.current(v975.scope)) {
              return;
            }
            const v977 = v552(v976);
            v489.data = v977?.ok === true && Array.isArray(v977.groups) ? v977 : null;
            v489.at = Date.now();
          }).catch(() => {
            if (v492 === v975 && v388.current(v975.scope)) {
              v489.data = null;
              v489.at = Date.now();
            }
          }).finally(() => {
            if (v492 !== v975) {
              return;
            }
            v492 = null;
            if (v388.current(v975.scope)) {
              v388.render?.({
                keepScroll: true
              });
              if (v394.sheetAlive(v975.handle) && v394.currentSheet("bgnotifysheet") === v975.handle) {
                v515(false);
              }
            }
          });
        }
        return v489.data;
      }
      let v974 = null;
      try {
        v974 = v552(window.NativeShell.shell().notifyGroups());
      } catch {
        v974 = null;
      }
      v489.at = v973;
      v489.data = v974?.ok === true ? v974 : null;
      return v489.data;
    }
    async function v495(v978, v979) {
      if (v401()) {
        return window.PLATFORM.unavailable("后台通知设置");
      }
      if (!v496.some(v984 => v984[0] === v978)) {
        return false;
      }
      const v980 = v489.data?.groups?.find(v985 => v985.id === v978);
      if (v388.isIOS?.() && (!v980 || v980.supported !== true)) {
        v394.toast(v391(), "当前系统未映射这个通知渠道，未修改设置");
        return false;
      }
      const v981 = v388.context();
      const v982 = v394.currentSheet?.("bgnotifysheet");
      const v983 = await Promise.resolve(v407("请求修改通知分组", "setNotifyGroup", [v978, v979 ? "1" : "0"], {
        category: "notification",
        extra: {
          group: v978,
          enabled: !!v979
        }
      }));
      if (!v388.current(v981)) {
        return false;
      }
      v489.at = 0;
      v492 = null;
      if (v983 && v388.isIOS?.()) {
        v489.data = null;
      }
      if (!v983) {
        v394.toast(v391(), "通知设置未确认，请重试");
      }
      if (v394.sheetAlive(v982) && v394.currentSheet("bgnotifysheet") === v982) {
        v515();
      }
      return v983;
    }
    const v496 = [["service", "后台常驻通知", "未挂桌面小组件时用于建立前台保障的低优先级通知；关闭后退出前台保障，服务存活时仍轮询，但更易被系统结束，周期任务保留作兜底"], ["message", "官方消息提醒", "未读消息数变多或来了新消息时提醒（轮询发现）"], ["charge_start", "开始充电", "检测到插枪开始充电时提醒一次"], ["charge_progress", "充电中进度", "充电期间挂着的一条进度通知（电量百分比与剩余时间）"], ["charge_full", "充满电提醒", "服务端明确报告「已充满」时提醒一次；不会仅凭电量 100% 推断充满"], ["charge_stop", "充电中途停止", "没充满就拔枪 / 停止充电时提醒一次"], ["task", "每日任务结果", "每日自动任务执行完成后告知成功或失败"], ["low", "低电量提醒", "电量 ≤20% 且没在充电时提醒一次"], ["offline", "车辆离线提醒", "车辆从在线变成离线时提醒一次"], ["tire", "胎压异常提醒", "胎压过低或车机报异常时提醒一次（15 分钟兜底任务里检查）"], ["auth", "登录态失效", "token 过期或被顶号时提醒重新登录"], ["capture", "登录态抓取", "抓取 token 的等待 / 成功 / 失败通知"], ["action", "快捷方式动作结果", "桌面快捷方式执行车控后的结果提示"]];
    function v497(v986, v987, v988, v989, v990) {
      return "<button class=\"kv-tap bg-entry\" data-act=\"" + v986 + "\" title=\"" + v396(v988) + "\">\n      <span class=\"bg-entry-ico\">" + v394.icon(v987, 20) + "</span>\n      <span class=\"bg-entry-main\">\n        <span class=\"bg-entry-title\">" + v396(v988) + "</span>\n        <span class=\"bg-entry-desc\">" + v396(v989) + "</span>\n      </span>\n      <span class=\"bg-entry-tail\">" + (v990 ? v990 : "") + v394.icon("right", 18) + "</span>\n    </button>";
    }
    const v498 = [{
      id: "xiaomi",
      name: "小米 / Redmi / POCO",
      system: "HyperOS / MIUI",
      power: ["设置 → 应用设置 → 应用管理 → {app} → 省电策略，选择「无限制」。", "也可在「手机管家 / 安全中心」的电池设置中找到应用省电策略。"],
      start: ["设置 → 应用设置 → 应用管理 → {app}，打开「自启动 / 后台自启动」。", "旧版入口：手机管家 / 安全中心 → 应用管理或权限 → 自启动管理。"],
      recent: ["在最近任务中下拉「{app}」卡片，或长按卡片后点锁图标。", "看到卡片上出现小锁，就能减少「一键清理」误关；没有锁定功能时可跳过。"]
    }, {
      id: "huawei",
      name: "华为",
      system: "EMUI / 兼容 Android 的 HarmonyOS",
      power: ["设置 → 应用 → 应用管理 → {app} → 电池，允许后台活动；有「电池优化」时选择「不允许优化」。", "再完成下一步「应用启动管理」，它也会影响锁屏后的运行。"],
      start: ["设置 → 电池 → 应用启动管理 → {app}，关闭「自动管理」。", "在手动管理里打开「允许自启动」「允许关联启动」「允许后台活动」三项。"],
      recent: ["在最近任务中下拉「{app}」卡片，出现小锁后不要再上划移除。", "菜单随系统版本变化；没有锁定功能时可跳过。"],
      note: "仅适用于能安装 Android APK 的系统；HarmonyOS NEXT 等原生鸿蒙不适用。"
    }, {
      id: "honor",
      name: "荣耀",
      system: "MagicOS",
      power: ["设置 → 应用 → 应用管理 → {app} → 电池，允许后台活动。", "如果有「电池优化」，将本应用设为「不允许优化」；名称以本机为准。"],
      start: ["在设置里搜索「应用启动管理」，或到手机管家中找「启动管理」。", "找到「{app}」，改为手动管理，并打开自启动、关联启动和后台活动。"],
      recent: ["打开最近任务，尝试下拉或长按「{app}」卡片，选择锁定。", "不同 MagicOS 版本入口可能不同；没有锁定功能时可跳过。"]
    }, {
      id: "oppo",
      name: "OPPO",
      system: "ColorOS",
      power: ["长按桌面「{app}」图标 → 应用信息 → 耗电管理 / 电池。", "允许「后台活动 / 后台运行」；如果有「优化电池使用」，选择「不优化」。"],
      start: ["设置 → 应用 → 自启动，或手机管家 → 应用管理 → 自启动管理。", "找到「{app}」并允许自启动；应用信息页中有该开关时也可以直接打开。"],
      recent: ["在最近任务中点「{app}」卡片上的更多菜单，选择「锁定」；部分版本可下拉卡片锁定。", "没有锁定入口时可跳过，不要为本应用关闭全局安全保护。"]
    }, {
      id: "oneplus",
      name: "一加",
      system: "ColorOS / OxygenOS",
      power: ["长按桌面「{app}」图标 → 应用信息 → 电池 / 耗电管理，允许后台活动或选「不优化」。", "旧 OxygenOS：设置 → 电池 → 电池优化 → 所有应用 → {app} → 不优化。"],
      start: ["ColorOS：设置 → 应用 → 自启动，找到「{app}」并允许。", "部分 OxygenOS 没有独立自启动开关；按本机应用信息页核对，没有该项可跳过。"],
      recent: ["在最近任务中点「{app}」卡片的更多菜单，或长按卡片，找「锁定」。", "没有锁定功能时可跳过；系统升级后如果又断记录，请重新核对省电设置。"]
    }, {
      id: "realme",
      name: "realme",
      system: "realme UI",
      power: ["设置 → 电池 → 更多设置 / 省电设置 → 应用电池管理 → {app}。", "允许后台活动；有「优化电池使用」时选「不优化」。若应用被冻结，将它移出「应用速冻」。"],
      start: ["在「应用电池管理」中允许「自动启动 / 自启动」。", "也可在设置 → 应用 → 自启动管理里找到「{app}」。"],
      recent: ["打开最近任务，在「{app}」卡片的更多菜单中找「锁定」，部分版本可下拉卡片。", "没有该功能时可跳过；不要上划移除本应用。"]
    }, {
      id: "vivo",
      name: "vivo / iQOO",
      system: "OriginOS / Funtouch OS",
      power: ["设置 → 电池 → 后台耗电管理 / 后台高耗电 → {app}。", "选择「允许后台高耗电 / 允许后台运行」；这会增加一些手机耗电。"],
      start: ["i 管家 → 应用管理 → 权限管理 → 自启动，允许「{app}」。", "部分版本入口：设置 → 应用与权限 / 更多设置 → 权限管理 → 自启动。"],
      recent: ["在最近任务中下拉「{app}」卡片，或打开卡片菜单选择锁定。", "看到锁图标后再返回桌面；没有锁定功能时可跳过。"]
    }, {
      id: "meizu",
      name: "魅族",
      system: "Flyme",
      power: ["在手机管家 / 电池管理里找到「{app}」，允许后台运行或加入受保护应用。", "旧版有「锁屏后保持运行」时打开；新版请按本机电池管理菜单核对。"],
      start: ["手机管家 → 权限管理 → 后台管理 / 自启动，允许「{app}」。", "若入口不同，在系统设置中搜索「自启动」或「后台管理」。"],
      recent: ["打开最近任务，若「{app}」卡片菜单提供锁定，就把它锁住。", "Flyme 不同版本可能没有此项，没有时可跳过，不影响前两步设置。"]
    }, {
      id: "samsung",
      name: "三星",
      system: "One UI",
      power: ["设置 → 应用程序 → {app} → 电池，选择「不受限制」。", "设置 → 电池 → 后台使用限制，将本应用移出「休眠 / 深度休眠应用」；有「从不休眠」名单时可加入。"],
      start: ["One UI 通常没有独立自启动开关；重点核对上一项电池与休眠名单。", "若本机另有应用启动限制，允许「{app}」在后台活动。"],
      recent: ["在最近任务中点「{app}」顶部图标，若有「保持打开」就选择它。", "部分新版本已移除此功能，没有时可跳过。"],
      optionalStart: true
    }, {
      id: "generic",
      name: "其他 / 原生 Android",
      system: "通用设置方法",
      power: ["长按桌面「{app}」图标 → 应用信息 → 电池 / 应用电池用量。", "允许后台使用，选择「不受限制 / 不优化」；找不到时在设置里搜索「电池优化」。"],
      start: ["原生 Android 通常没有独立自启动开关。国产系统可在设置里搜索「自启动 / 启动管理」。", "如果找到「{app}」，允许自启动和后台活动；没有这类设置时可跳过。"],
      recent: ["打开最近任务，若本机提供「锁定 / 保持打开」，可为「{app}」启用。", "原生 Android 通常没有此功能，没有时可跳过；平时不要主动上划移除本应用。"],
      optionalStart: true,
      optionalRecent: true
    }];
    const v499 = {
      brand: "",
      confirmed: Object.create(null),
      open: Object.create(null),
      extra: false,
      handle: null
    };
    function v500(v991) {
      const v992 = (String(v991?.brand || "") + " " + String(v991?.manufacturer || "")).toLowerCase();
      if (/honor/.test(v992)) {
        return "honor";
      }
      if (/huawei/.test(v992)) {
        return "huawei";
      }
      if (/xiaomi|redmi|poco/.test(v992)) {
        return "xiaomi";
      }
      if (/oneplus|one plus/.test(v992)) {
        return "oneplus";
      }
      if (/realme/.test(v992)) {
        return "realme";
      }
      if (/oppo/.test(v992)) {
        return "oppo";
      }
      if (/vivo|iqoo/.test(v992)) {
        return "vivo";
      }
      if (/meizu/.test(v992)) {
        return "meizu";
      }
      if (/samsung/.test(v992)) {
        return "samsung";
      }
      return "generic";
    }
    function v501(v993) {
      return v498.find(v994 => v994.id === (v499.brand || v500(v993))) || v498[v498.length - 1];
    }
    function v502(v995, v996) {
      const v997 = v998 => v499.confirmed[v996.id + ":" + v998] === true;
      return [{
        id: "notify",
        title: "允许通知",
        why: "让充电提醒、任务结果能显示出来",
        done: v995?.notifications === true,
        label: v995?.notifications === true ? "已允许" : v995?.notifications === false ? "待设置" : "未读取",
        source: "系统检测"
      }, {
        id: "power",
        title: "允许后台用电",
        why: "减少锁屏后停止采样或延迟更新",
        done: v995?.batteryIgnoring === true && v997("power"),
        label: v997("power") ? v995?.batteryIgnoring === true ? "你已确认" : "系统待设置" : "待核对",
        source: "含手动确认"
      }, {
        id: "start",
        title: "允许自启动",
        why: "让系统允许应用在后台继续工作",
        done: v997("start") || !!v996.optionalStart,
        label: v997("start") ? "你已确认" : v996.optionalStart ? "按需查看" : "待核对",
        source: "手动核对"
      }, {
        id: "recent",
        title: "最近任务中锁定",
        why: "减少一键清理时误关本应用",
        done: v997("recent") || !!v996.optionalRecent,
        label: v997("recent") ? "你已确认" : v996.optionalRecent ? "按需查看" : "待核对",
        source: "手动核对"
      }];
    }
    function v503(v999) {
      if (!v999 || typeof v999.enabled !== "boolean") {
        return ["状态暂时没有读到", "请重新检查；下面的设置方法仍可参考。"];
      }
      if (v999.configured === false) {
        return ["先登录并选择车辆", "在「登录与账号」保存登录信息，再从顶部选择车辆。后台保护只设置本手机，不会替你登录。"];
      }
      if (v999.vehicleAuthFailed && v999.accountAuthFailed) {
        return ["登录信息已失效", "车辆更新和账号任务都已暂停，请更新对应账号的登录信息。"];
      }
      if (v999.vehicleAuthFailed) {
        return ["车辆登录信息已失效", "车况、充电和电量记录暂停；消息与账号任务另按各自登录状态处理。"];
      }
      if (v999.accountAuthFailed || v999.authFailed) {
        return ["账号登录信息已失效", "消息与账号任务可能暂停；车辆更新按车辆账号的登录状态处理。"];
      }
      if (v999.enabled === false) {
        return ["后台同步未开启", "开启后才能在离开面板时更新车况、记录电量和检查消息。"];
      }
      if (v999.foreground === true || v999.serviceRunning === true || typeof v999.foreground !== "boolean" && v999.service === true) {
        return ["后台同步正在工作", "当前正在运行不等于锁屏后一直运行，请继续核对下面的后台保护。"];
      }
      return ["后台正在等待恢复", "回到面板后会自动拉起已开启的后台同步；系统仍可能延后更新。"];
    }
    function v504(v1000, v1001, v1002, v1003 = true) {
      return "<button class=\"btn" + (v1003 ? " tonal" : " text") + "\" data-act=\"" + v1000 + "\"" + (v1002 ? "" : " disabled") + ">" + v396(v1001) + "</button>";
    }
    function v505(v1004, v1005, v1006) {
      const v1007 = v499.confirmed[v1004.id + ":" + v1005] === true;
      return "<button class=\"bg-guide-confirm" + (v1007 ? " checked" : "") + "\" id=\"bg-guide-confirm-" + v1005 + "\" data-act=\"bgconfirm\" data-k=\"" + v1005 + "\" data-id=\"" + v1005 + "\"\n      role=\"checkbox\" aria-checked=\"" + v1007 + "\"" + (v1006 ? "" : " disabled") + ">\n      <span class=\"bg-guide-check\" aria-hidden=\"true\">" + (v1007 ? v394.icon("check", 16) : "") + "</span>\n      <span>" + (v1007 ? "已由你确认 · 点击撤销" : "我已设置好，或本机没有这项") + "</span>\n    </button>";
    }
    function v506(v1008, v1009, v1010, v1011, v1012) {
      const v1013 = v1015 => "<ol>" + v1015.map(v1016 => "<li>" + v396(v1016.replaceAll("{app}", v1012)) + "</li>").join("") + "</ol>";
      const v1014 = (v1017, v1018) => v504(v1017 === "battery" ? "bgbattery" : v1017 === "autostart" ? "bgautostart" : "bgappsettings", v1018, v1011);
      if (v1008.id === "notify") {
        return v1013(["点「通知设置」，打开「允许通知」。", "按需允许充电、任务结果等通知类别；总开关打开不代表每一类都已打开。", "回到面板的「消息通知设置」，打开你想收到的提醒。"]) + "<div class=\"bg-guide-actions\">" + v504("bgopennotify", "通知设置", v1011) + v504("bgnotifysettings", "面板通知分类", v1011, false) + "</div>";
      }
      if (v1008.id === "power") {
        const v1019 = v1009?.batteryIgnoring === true ? "系统电池优化：已允许不优化" : v1009?.batteryIgnoring === false ? "系统电池优化：还未允许不优化" : "系统电池优化：暂未读取";
        return "<p class=\"bg-guide-detected\">" + v394.icon(v1009?.batteryIgnoring === true ? "check" : "info", 16) + "<span>" + v1019 + " · 系统检测</span></p>\n        <p>先点下面的系统省电入口允许本应用，再按手机品牌核对：</p>" + v1013(v1010.power) + "\n        <div class=\"bg-guide-actions\">" + v1014("battery", v1009?.batteryIgnoring ? "查看系统省电设置" : "解除系统省电限制") + v1014("app", "应用信息") + "</div>\n        <p class=\"bg-guide-hint\">系统检测不能确认厂商的「无限制 / 后台高耗电」开关，请你按上面的路径核对。只放宽本应用，不用关闭全局省电或安全保护。</p>\n        " + v505(v1010, "power", v1011);
      }
      if (v1008.id === "start") {
        return v1013(v1010.start) + "\n      <div class=\"bg-guide-actions\">" + v1014("autostart", "自启动设置") + v1014("app", "应用信息") + "</div>\n      <p class=\"bg-guide-hint\">快捷入口可能打开应用信息页；若没有自启动开关，按上面的路径手动找。App 无法自动读取这项设置。</p>\n      " + v505(v1010, "start", v1011);
      }
      return v1013(["从屏幕底部上滑并停顿，或点最近任务键，找到「{app}」卡片。", ...v1010.recent]) + "<p class=\"bg-guide-hint\">需要你在最近任务界面操作，不能一键锁定。锁定只是减少误清理，不保证永远运行。</p>\n      " + v505(v1010, "recent", v1011);
    }
    function v507(v1020) {
      if (!v498.some(v1022 => v1022.id === v1020)) {
        return false;
      }
      const v1021 = v499.handle;
      if (!v394.sheetAlive(v1021)) {
        return false;
      }
      v499.brand = v1020;
      v499.open = Object.create(null);
      return v511({
        handle: v1021
      });
    }
    function v508(v1023) {
      if (!["power", "start", "recent", "exact"].includes(v1023) || v401() || !window.PLATFORM.has("android", "backgroundStatus")) {
        return false;
      }
      const v1024 = v499.handle;
      if (!v394.sheetAlive(v1024)) {
        return false;
      }
      const v1025 = v501(v467()).id + ":" + v1023;
      v499.confirmed[v1025] = v499.confirmed[v1025] !== true;
      return v511({
        handle: v1024
      });
    }
    async function v509(v1026) {
      if (!(await Promise.resolve(v413(v1026)))) {
        v394.toast(v391(), "无法打开系统设置，请按指引中的路径手动设置");
        return false;
      }
      v490();
      return true;
    }
    function v510({
      quiet = false
    } = {}) {
      const v1027 = v499.handle;
      if (!v394.sheetAlive(v1027)) {
        return false;
      }
      v490();
      const v1028 = v511({
        handle: v1027
      });
      if (!quiet) {
        if (v479()) {
          v486();
        }
        v388.render?.({
          keepScroll: true
        });
        v394.toast(v391(), "已重新读取可检测的状态；自启动与最近任务锁定仍需你手动核对");
      }
      return v1028;
    }
    function v511({
      handle = null
    } = {}) {
      if (handle && (!v394.sheetAlive(handle) || handle !== v499.handle)) {
        return false;
      }
      v490();
      const v1029 = !v401() && window.PLATFORM.has("android", "backgroundStatus");
      const v1030 = v1029 ? v467() : null;
      const v1031 = v501(v1030);
      const v1032 = v502(v1030, v1031);
      const v1033 = String(v1030?.appLabel || "几何面板").slice(0, 60);
      const v1034 = v1032.find(v1054 => !v1054.done);
      if (!Object.keys(v499.open).length) {
        v499.open[v1034?.id || "notify"] = true;
      }
      const v1035 = v1029 ? v503(v1030) : ["请在 Android App 中设置", "这里仅展示设置方法；浏览器和 iOS 无法检查或修改 Android 的后台保护。"];
      const v1036 = v1030?.configured === false || v1030?.authFailed || v1030?.vehicleAuthFailed || v1030?.accountAuthFailed;
      const v1037 = !v1029 || !v1030 || typeof v1030.enabled !== "boolean" || v1036 || v1030.enabled === false ? v1035[0] : v1034 ? "继续设置：" + v1034.title : "指引已核对，继续观察后台更新";
      const v1038 = !v1029 || !v1030 || typeof v1030.enabled !== "boolean" || v1036 || v1030.enabled === false ? v1035[1] : v1034 ? "通知和系统省电可自动检查；自启动、厂商省电和锁卡需要你手动核对。" : "含你手动确认的记录，不代表永久保活。若锁屏后仍断记录，请重新核对本机设置。";
      const v1039 = v1029 && v1036 ? v504("debug", "登录与账号", true) : v1029 && v1030?.enabled === false ? v504("bgenable", "开启后台同步", !v1036) : "";
      const v1040 = v1032.length - (v1031.optionalStart ? 1 : 0) - (v1031.optionalRecent ? 1 : 0);
      const v1041 = v1032.filter(v1055 => v1055.done && (v1055.id !== "start" || !v1031.optionalStart) && (v1055.id !== "recent" || !v1031.optionalRecent)).length;
      const v1042 = !!v1030?.brand || !!v1030?.manufacturer;
      const v1043 = v499.brand ? "手动选择 · 仅改变指引内容" : v1042 ? "已按手机品牌选择 · 不符时可切换" : "未识别手机品牌，请手动选择";
      const v1044 = v498.map(v1056 => "<option value=\"" + v1056.id + "\"" + (v1056.id === v1031.id ? " selected" : "") + ">" + v396(v1056.name) + "</option>").join("");
      const v1045 = v1032.map((v1057, v1058) => "<details class=\"bg-guide-step\" data-bg-step=\"" + v1057.id + "\"" + (v499.open[v1057.id] ? " open" : "") + ">\n      <summary id=\"bg-guide-step-" + v1057.id + "\" tabindex=\"0\"><span class=\"bg-guide-num\" aria-hidden=\"true\">" + (v1058 + 1) + "</span>\n        <span class=\"bg-guide-step-title\"><strong>" + v396(v1057.title) + "</strong><span>" + v396(v1057.why) + "</span></span>\n        <span class=\"bg-guide-state" + (v1057.done ? " done" : "") + "\">" + v396(v1057.label) + "</span>" + v394.icon("down", 18) + "</summary>\n      <div class=\"bg-guide-step-body\">" + v506(v1057, v1030, v1031, v1029, v1033) + "</div>\n    </details>").join("");
      const v1046 = v1030?.rootEnhance;
      const v1047 = v482(v1046);
      const v1048 = "<details class=\"bg-guide-step\" data-bg-step=\"root\"" + (v499.open.root ? " open" : "") + ">\n      <summary id=\"bg-guide-step-root\" tabindex=\"0\"><span class=\"bg-guide-num\" aria-hidden=\"true\">+</span>\n        <span class=\"bg-guide-step-title\"><strong>增强保活</strong><span>可选 · 在 root 管理器中授权后自动启用</span></span>\n        <span class=\"bg-guide-state" + (v468(v1030) ? " done" : "") + "\">" + v396(v1047.label) + "</span>" + v394.icon("down", 18) + "</summary>\n      <div class=\"bg-guide-step-body\">" + v483(v1046, v1029) + "</div>\n    </details>";
      const v1049 = Number(v1030?.lastPoll) || 0;
      const v1050 = Number(v1030?.updatedAt) || 0;
      const v1051 = [["后台同步", v1035[0]], ["后台上次检查", v1049 ? v393.relTime(v1049) : "还没有记录"], ["数据上次同步", v1050 ? v393.relTime(v1050) : "还没有记录"], ["系统通知权限", v1030?.notifications === true ? "已允许（不含各类别开关）" : v1030?.notifications === false ? "未允许" : "未读取"], ["系统电池优化", v1030?.batteryIgnoring === true ? "已允许不优化" : v1030?.batteryIgnoring === false ? "还未豁免" : "未读取"], ["精确闹钟权限", v1030?.exactAlarm === true ? "已允许（定时任务可穿 Doze 准时执行）" : v1030?.exactAlarm === false ? "未允许（定时任务可能被推迟）" : "未读取"]].map(([v1059, v1060]) => "<div class=\"kv\"><span class=\"k\">" + v396(v1059) + "</span><span class=\"v\">" + v396(v1060) + "</span></div>").join("");
      const v1052 = "<div class=\"bg-guide\">\n      <section class=\"bg-guide-overview\" aria-label=\"下一步建议\">\n        <span class=\"bg-guide-kicker\">让锁屏后的电量记录与提醒更稳定</span>\n        <h2>" + v396(v1037) + "</h2><p>" + v396(v1038) + "</p>" + v1039 + "\n        " + (v1029 && v1030 ? "<div class=\"bg-guide-progress\"><progress value=\"" + v1041 + "\" max=\"" + v1040 + "\" aria-label=\"必要设置的核对进度\"></progress><span>" + v1041 + " / " + v1040 + " 项已核对</span></div>" : "") + "\n      </section>\n      <section class=\"bg-guide-device\" aria-label=\"手机系统\">\n        <div><label for=\"bgGuideBrand\">手机品牌</label><span>" + v396(v1043) + "</span></div>\n        <select id=\"bgGuideBrand\" aria-label=\"手机品牌\" onchange=\"window.APP.shell.setBgGuideBrand(this.value)\">" + v1044 + "</select>\n        <p>" + v396(v1031.system) + " · 在系统设置中找 <strong>" + v396(v1033) + "</strong></p>\n        " + (v1031.note ? "<p class=\"bg-guide-hint\">" + v396(v1031.note) + "</p>" : "") + "\n      </section>\n      <p class=\"bg-guide-path-note\">按顺序设置，点开每项查看方法。不同系统版本菜单会变，找不到时可在设置中搜索关键词。</p>\n      <div class=\"bg-guide-steps\">" + v1045 + v1048 + "</div>\n      <p class=\"bg-guide-hint\">「你已确认」只是本次页面的手动记录，不是系统检测；重启面板后需重新核对。</p>\n      <section class=\"bg-guide-review\" aria-label=\"设置后的检查\">\n        <h3>设置好后这样确认</h3>\n        <p>回到面板点「重新检查」。保持联网，锁屏几分钟后再看看电量历史是否继续记录；不是收到一条通知就代表长期稳定。</p>\n        <div class=\"bg-guide-actions\">" + v504("bgrefresh", "重新检查", v1029) + v504("bgappsettings", "打开应用信息", v1029, false) + "</div>\n        <p class=\"bg-guide-hint\">保护后台会增加一些手机耗电。重启手机、系统升级后若记录中断，请重查；强行停止 App 后需重新打开。</p>\n      </section>\n      <details class=\"bg-guide-extra\" data-bg-extra" + (v499.extra ? " open" : "") + ">\n        <summary id=\"bg-guide-extra\" tabindex=\"0\"><span>运行详情与高级选项</span>" + v394.icon("down", 18) + "</summary>\n        <div>" + v1051 + "<p class=\"bg-guide-hint\">" + v396(v1035[1]) + "</p>\n          <p class=\"bg-guide-hint\">挂桌面小组件或关闭常驻通知会减少后台保护。系统安排的周期更新也可能延后，不是实时推送。</p>\n          <div class=\"bg-guide-actions\">" + v504("bgexactalarm", "闹钟和提醒设置", v1029, false) + "</div>\n          <p class=\"bg-guide-hint\">精确闹钟用于每日自动任务，与可选增强保活分别管理。</p>\n        </div>\n      </details>\n    </div>";
      let v1053;
      v1053 = v394.sheet(v391(), {
        key: "bgstatus",
        title: "后台保护指引",
        sub: "按手机系统，一步步设置",
        className: "bg-guide-sheet",
        body: v1052,
        onMount(v1061) {
          v1061.querySelectorAll("[data-bg-step]").forEach(v1063 => v1063.addEventListener("toggle", () => {
            if (v1063.isConnected && v499.handle === v1053) {
              v499.open[v1063.dataset.bgStep] = v1063.open;
            }
          }));
          const v1062 = v1061.querySelector("[data-bg-extra]");
          v1062?.addEventListener("toggle", () => {
            if (v1062.isConnected && v499.handle === v1053) {
              v499.extra = v1062.open;
            }
          });
        },
        onDismiss() {
          if (v499.handle === v1053) {
            v499.handle = null;
          }
        }
      });
      v499.handle = v1053;
      return v1053;
    }
    function v512() {
      const v1064 = v401() ? {
        ...v471,
        enabled: false,
        background: false,
        lastAt: 0
      } : v472();
      if (!v1064) {
        v394.sheet(v391(), {
          key: "bgtasksheet",
          title: "每日任务设置",
          sub: "",
          body: "<div class=\"note info\">当前 App 版本不支持自动任务。</div>"
        });
        return;
      }
      const v1065 = (v1067, v1068, v1069, v1070) => "\n      <div class=\"task-row\" data-act=\"autotoggle\" data-k=\"" + v1067 + "\" data-v=\"" + (v1070 ? 1 : 0) + "\" style=\"cursor:pointer\">\n        <div class=\"task-main\">\n          <div class=\"task-name\">" + v396(v1068) + "</div>\n          " + (v1069 ? "<div class=\"task-sub\">" + v396(v1069) + "</div>" : "") + "\n        </div>\n        <div class=\"task-tail\"><span class=\"switch" + (v1070 ? " on" : "") + "\" role=\"switch\" aria-checked=\"" + v1070 + "\"></span></div>\n      </div>";
      const v1066 = (v401() ? "<div class=\"card-sub\">" + v396(window.PLATFORM.message("每日后台任务")) + "</div>" : "") + "\n      " + v1065("enabled", "自动执行任务", "每天 " + v1064.time + " 自动签到并完成可执行任务；参与的全部账号各跑一次、各自一条通知", v1064.enabled) + "\n      <div class=\"field mt8\">\n        <label class=\"card-sub\">每日执行时间</label>\n        <input id=\"bgAutoTime\" type=\"time\" value=\"" + v396(v1064.time) + "\" onchange=\"window.APP.patchAutoTime(this.value)\">\n      </div>\n      " + v513() + "\n      <div class=\"section-title mt16\"><span>后台</span><span class=\"line\"></span></div>\n      " + v1065("background", "后台同步", "未挂小组件且常驻通知开启时可建立前台保障；挂小组件或关闭常驻通知会退出前台保障，周期任务保留作兜底", v1064.background) + "\n      " + (v1064.lastAt ? "<div class=\"card-sub mt12\">上次执行：" + v396(new Date(v1064.lastAt).toLocaleString()) + (v1064.lastResult ? " · " + v396(v1064.lastResult) : "") + "</div>" : "") + "\n      <div class=\"card-sub mt12\">没有推送服务，任务与提醒都靠本机轮询；周期任务受系统配额、Doze 与网络影响，可能延后执行，不保证每天准时或每 15 分钟准点运行。强行停止 App 后须重新打开。</div>\n      <div style=\"height:6px\"></div>";
      v394.sheet(v391(), {
        key: "bgtasksheet",
        title: "每日任务设置",
        sub: "自动签到 · 后台同步",
        body: v1066
      });
    }
    function v513() {
      if (!v474()) {
        return "";
      }
      const v1071 = window.ACC?.avail?.() && window.ACC.ready?.() ? window.ACC.list() : [];
      if (!v1071.length) {
        return "";
      }
      const v1072 = v1071.map(v1073 => {
        const v1074 = v475(v1073.id);
        if (!v1074) {
          return "";
        }
        const v1075 = window.ACC.labelOf(v1073);
        const v1076 = v1074.sign && v1074.tasks;
        return "<div class=\"task-row\" style=\"align-items:flex-start\">\n        <div class=\"task-main\">\n          <div class=\"task-name\">" + v396(v1075) + "</div>\n          <div class=\"task-sub\">" + (v1076 ? "签到 + 积分任务" : v1074.sign ? "仅签到" : v1074.tasks ? "仅积分任务" : "不参与自动任务") + "</div>\n        </div>\n        <div class=\"task-tail auto-scope\">\n          <button class=\"chip-btn" + (v1074.sign ? " on" : "") + "\" data-act=\"autoscopetoggle\" data-id=\"" + v396(v1073.id) + "\" data-k=\"sign\" role=\"switch\" aria-checked=\"" + v1074.sign + "\" title=\"自动签到\">签到</button>\n          <button class=\"chip-btn" + (v1074.tasks ? " on" : "") + "\" data-act=\"autoscopetoggle\" data-id=\"" + v396(v1073.id) + "\" data-k=\"tasks\" role=\"switch\" aria-checked=\"" + v1074.tasks + "\" title=\"自动完成积分任务\">任务</button>\n        </div>\n      </div>";
      }).join("");
      if (!v1072) {
        return "";
      }
      return "<div class=\"section-title mt16\"><span>各账号自动范围</span><span class=\"line\"></span></div>\n      <div class=\"card-sub\">关掉「签到」或「任务」只影响该账号的自动执行，手动任务不受影响；两项都关的账号当天不跑。</div>\n      " + v1072;
    }
    function v514(v1077, v1078) {
      const v1079 = v475(v1077);
      if (!v1079 || !["sign", "tasks"].includes(v1078)) {
        return false;
      }
      const v1080 = {
        ...v1079,
        [v1078]: !v1079[v1078]
      };
      if (!v476(v1077, v1080)) {
        v394.toast(v391(), "自动范围未能保存，请重试");
        return false;
      }
      if (v394.sheetAlive(v394.currentSheet("bgtasksheet"))) {
        v512();
      }
      return true;
    }
    function v515(v1081 = true) {
      const v1082 = v494(v1081);
      const v1083 = !!v492;
      const v1084 = new Map((v1082?.groups || []).map(v1090 => [v1090.id, !!v1090.on]));
      const v1085 = v1082?.allowed;
      const v1086 = !!v467() && !!v467().widgetBound;
      const v1087 = v496.map(([v1091, v1092, v1093]) => {
        if (v1091 === "service" && v1086) {
          return "<div class=\"task-row\" style=\"opacity:.55\">\n          <div class=\"task-main\">\n            <div class=\"task-name\">" + v396(v1092) + "</div>\n            <div class=\"task-sub\">已挂桌面小组件：常驻通知不发，同时退出前台保障；系统更容易结束服务，周期任务也可能延后。小组件仅展示最近采样，不保证实时更新。</div>\n          </div>\n          <div class=\"task-tail\">" + v394.chip("已屏蔽", "") + "</div>\n        </div>";
        }
        const v1094 = v1082?.groups?.find(v1097 => v1097.id === v1091);
        const v1095 = v388.isIOS?.() && v1094?.supported !== true;
        if (v1095) {
          return "";
        }
        const v1096 = v1084.has(v1091) ? v1084.get(v1091) : false;
        return "<div class=\"task-row\" " + (v1083 ? "aria-disabled=\"true\"" : "data-act=\"notifytoggle\" data-k=\"" + v1091 + "\" data-v=\"" + (v1096 ? 1 : 0) + "\"") + " style=\"cursor:pointer\">\n        <div class=\"task-main\">\n          <div class=\"task-name\">" + v396(v1092) + "</div>\n          <div class=\"task-sub\">" + v396(v1095 ? "当前 iOS 系统尚未映射这个通知渠道，不会提交操作" : v388.isIOS?.() && v1091 === "charge_progress" ? "由系统实时活动显示充电进度；系统决定刷新时机，不代表后台持续轮询" : v1093) + "</div>\n        </div>\n        <div class=\"task-tail\"><span class=\"switch" + (v1096 ? " on" : "") + (v1095 || v1083 ? " disabled" : "") + "\" role=\"switch\" aria-checked=\"" + v1096 + "\"></span></div>\n      </div>";
      }).join("");
      const v1088 = "" + (v401() ? "<div class=\"card-sub\">" + v396(window.PLATFORM.message("后台通知")) + "</div>" : "") + (v1085 === false ? "<div class=\"note bad\">" + v394.icon("alert", 18) + "<div>系统通知权限未允许，下面这些开关即使打开也不会响。<button class=\"btn text sm\" data-act=\"bgopennotify\">去开启</button></div></div>" : v1085 === undefined ? "<div class=\"card-sub\" role=\"status\">通知权限与分组状态尚未读取。</div>" : "") + "\n      <div class=\"card-sub\">" + (v388.isIOS?.() ? "按真实系统能力控制：已映射的分组调用系统实时活动，未映射渠道不提交。iOS 系统决定展示与更新预算，不保证后台持续采样或通知送达。" : "按类控制。没有推送服务，通知靠本机轮询发现；后台服务按车况调频——充电时约 2.5 分钟一轮、整车开机约 1 分钟、静置 5 分钟（省电优先）。退出前台保障后更易被系统结束，约 15 分钟的周期任务保留作兜底但可能延后执行，快速状态变化可能错过。总权限与分组允许也不保证各渠道、响铃或横幅已开启。") + "</div>\n      <div class=\"task-row\" data-act=\"marketreplynotify\" style=\"cursor:pointer\"><div class=\"task-main\"><div class=\"task-name\">壁纸评论回复提醒</div><div class=\"task-sub\">打开应用时检查回复并显示消息红点</div></div><div class=\"task-tail\"><span class=\"switch" + (v388.media?.replyAlertsEnabled() ? " on" : "") + "\" role=\"switch\" aria-checked=\"" + !!v388.media?.replyAlertsEnabled() + "\"></span></div></div>\n      " + (v1082 || v401() ? v1087 : v1083 ? "<div class=\"chg-empty\" role=\"status\">正在读取通知分组…</div>" : "<div class=\"chg-empty\">通知分组 unavailable：当前 App 未提供分组开关或读取失败。</div>") + "\n      <div class=\"card-sub mt12\">通知提交结果和失败原因统一记录在「应用日志」，提交成功不代表用户已收到。</div>\n      <div style=\"height:6px\"></div>";
      const v1089 = v394.sheet(v391(), {
        key: "bgnotifysheet",
        title: "消息通知设置",
        sub: v388.isIOS?.() ? "按类开关 · 真实系统能力" : "按类开关 · 全部本机轮询",
        body: v1088
      });
      if (v492 && !v492.handle) {
        v492.handle = v1089;
      }
      return v1089;
    }
    function v516() {
      return v388.gestures?.rawSheet?.();
    }
    function v517() {
      const v1098 = v450();
      const v1099 = v1098?.data || {};
      const v1100 = v1099.summary || {};
      const v1101 = v434.map(([v1102, v1103]) => "<button class=\"seg-btn" + (v389.battRange === v1102 ? " on" : "") + "\" data-act=\"battr\" data-v=\"" + v1102 + "\"\n        aria-pressed=\"" + (v389.battRange === v1102) + "\">" + v1103 + "</button>").join("");
      v394.sheet(v391(), {
        key: "batt",
        title: "电量历史",
        half: true,
        headActions: "<button class=\"iconbtn\" data-act=\"battrefresh\" title=\"刷新\">" + v394.icon("refresh", 20) + "</button>",
        body: "<div class=\"seg-tabs\" role=\"group\" aria-label=\"时间范围\">" + v1101 + "</div>\n        " + (v401() ? "<div class=\"card-sub\">" + v396(window.PLATFORM.message("后台连续电量采样")) + "</div>" : v388.isIOS?.() ? "<div class=\"card-sub\">只保留真实前台采样；未提供后台连续采样。</div>" : "") + "\n        " + v462(v1099, v1098?.pending) + "\n        " + v464(v1100) + "\n        <div style=\"height:6px\"></div>"
      });
      v463();
      v394.fitText(document.querySelector(".sheet.show"));
    }
    function v518() {
      v388.mem.battCache = null;
      v517();
    }
    const v519 = {
      app: null,
      panel: null,
      at: 0
    };
    const v520 = "请自行获取新版 iOS App 并自签覆盖安装后使用";
    let v521 = 0;
    let v522 = true;
    let v523 = false;
    let v524 = "";
    let v525 = "";
    let v526 = null;
    let v527 = null;
    let v528 = 0;
    let v529 = null;
    let v530 = null;
    let v531 = null;
    let v532 = null;
    let v533 = null;
    const v534 = v1104 => {
      const v1105 = typeof v1104 === "string" ? v1104 : v1104?.line;
      if (v1105 === "github" || v1105 === "cf") {
        return v1105;
      } else {
        return "";
      }
    };
    const v535 = () => {
      const v1106 = window.IOSBR?.bootstrap?.();
      return JSON.stringify([v1106?.nonce || "", v1106?.generation ?? "", v1106?.navId || ""]);
    };
    const v536 = () => {
      const v1107 = v535();
      if (v525 !== v1107) {
        v540();
      }
      return {
        stamp: v1107,
        epoch: v521,
        accountGen: v397.accountGen,
        accountId: window.ACC?.activeId?.() || ""
      };
    };
    const v537 = (v1108, v1109 = false) => !!v1108 && v388.inShell() && !v401() && !document.hidden && v522 && !v523 && v1108.epoch === v521 && v1108.stamp === v535() && window.IOSBR?.isCurrent?.() !== false && (!v1109 || v1108.accountGen === v397.accountGen && v1108.accountId === (window.ACC?.activeId?.() || ""));
    const v538 = () => v524 || v534(v388.auth?.panelLineCachedInfo?.()) || v534(v388.shell?.ios?.info?.()?.panelLine);
    const v539 = v1110 => !!v1110 && !v1110.closed && v537(v1110.scope, true) && v394.sheetAlive(v1110.handle) && (v1110.which === "app" ? v529 === v1110 : v530 === v1110) && (!v1110.line || v538() === v1110.line);
    function v540(v1111 = "") {
      v528++;
      v524 = v534(v1111);
      v525 = v535();
      v388.auth?.acceptIOSPanelLine?.(v524);
      v533 = null;
      v527 = null;
      v519.app = {
        state: "idle"
      };
      v519.panel = {
        state: "idle"
      };
      v519.at = 0;
    }
    function v541() {
      try {
        v388._render?.patchRel?.();
      } catch {}
    }
    function v542(v1112) {
      if (v401()) {
        return window.PLATFORM?.unavailable?.(v1112);
      }
      if (!document.hidden && v522 && !v523) {
        v394.toast(v391(), "当前 iOS App 不支持" + v1112 + "，" + v520, 3200);
      }
      return false;
    }
    function v543(v1113) {
      return String(v1113?.value?.error?.message || v1113?.message || "原生操作未完成，请重试");
    }
    function v544(v1114) {
      if (v1114?.ok !== true) {
        throw new Error("原生未确认操作成功，请重试");
      }
      return v1114;
    }
    async function v545() {
      if (!v409()) {
        return v542("欢迎与恢复");
      }
      if (v532) {
        return false;
      }
      const v1115 = {
        scope: v536(),
        handle: v394.currentSheet?.()
      };
      const v1116 = () => v532 === v1115 && v537(v1115.scope, true) && (!v1115.handle || v394.sheetAlive(v1115.handle));
      if (!v537(v1115.scope, true)) {
        return false;
      }
      v532 = v1115;
      try {
        v544(await v571("app.recovery", {}));
        if (!v1116()) {
          return false;
        }
        v388.suspendAccountRestore?.();
        return true;
      } catch (v1117) {
        if (v1116()) {
          v394.toast(v391(), "无法打开欢迎与恢复：" + v543(v1117), 3200);
        }
        return false;
      } finally {
        if (v532 === v1115) {
          v532 = null;
        }
      }
    }
    function v546(v1118 = false) {
      if (!v388.inShell() || !v565("update.status") || document.hidden || !v522 || v523) {
        return Promise.resolve(null);
      }
      const v1119 = v535();
      if (v525 !== v1119) {
        v540();
      }
      if (v526) {
        return v526;
      }
      const v1120 = Date.now();
      if (!v1118 && v527 !== null && v1120 - v527 < 2000) {
        return Promise.resolve(v519);
      }
      v527 = v1120;
      const v1121 = v536();
      const v1122 = v528;
      const v1123 = v538();
      let v1124;
      let v1125 = false;
      v1124 = (async () => {
        try {
          let v1126;
          try {
            v1126 = v544(await v571("update.status", {
              current: v558()
            }));
          } catch (v1128) {
            if (String(v1128?.value?.error?.code || v1128?.code || "") !== "invalid_args") {
              throw v1128;
            }
            v1126 = v544(await v571("update.status", {}));
          }
          if (!v537(v1121) || v1122 !== v528) {
            return null;
          }
          const v1127 = v534(v1126.line);
          if (!v1127) {
            throw new Error("无法读取更新线路");
          }
          if (v1123 && v1127 !== v1123) {
            v540(v1127);
            return null;
          }
          v524 = v1127;
          v388.auth?.acceptIOSPanelLine?.(v1127);
          for (const v1129 of ["app", "panel"]) {
            if (v1129 === "app" ? v529?.busy && v539(v529) : v530?.busy && v539(v530)) {
              continue;
            }
            const v1130 = v552(v1126[v1129]);
            v519[v1129] = v1130 && ["idle", "checking", "update", "latest", "ready", "error"].includes(v1130.state) ? v1129 === "panel" ? v560(v1130) : v1130 : {
              state: "error"
            };
          }
          v519.at = Date.now();
          v1125 = true;
          return v519;
        } catch (v1131) {
          if (!v537(v1121) || v1122 !== v528) {
            return null;
          }
          v519.app = {
            state: "error"
          };
          v519.panel = {
            state: "error"
          };
          v519.at = Date.now();
          v1125 = true;
          return null;
        } finally {
          if (v526 === v1124) {
            v526 = null;
          }
          if (v1125) {
            v541();
          }
        }
      })();
      v526 = v1124;
      return v1124;
    }
    function v547(v1132) {
      if (!v388.inShell() || !v565("update.status")) {
        return null;
      }
      if (!v519.app) {
        v519.app = {
          state: "idle"
        };
      }
      if (!v519.panel) {
        v519.panel = {
          state: "idle"
        };
      }
      v546(v1132 === true);
      return v519;
    }
    function v548(v1133, v1134 = "") {
      const v1135 = v1133 ? v394.kv("当前版本", (v1133.currentName || "—") + " (" + (v1133.currentCode ?? "—") + ")") + v394.kv("最新版本", (v1133.latestName || "—") + " (" + (v1133.latestCode ?? "—") + ")") + (v1133.hasUpdate && v1133.notes ? "<div class=\"card-sub mt12 notes-pre\">" + v396(v1133.notes) + "</div>" : "") : "";
      const v1136 = v1134 ? "<div class=\"note bad\" role=\"status\">" + v396(v1134) + "</div>" : "<div class=\"note info\">" + v394.icon(v1133?.hasUpdate ? "info" : "check", 18) + "<div>" + (v1133?.hasUpdate ? "发现新版本。App 内不提供下载，请自行从外部获取新版本并自签覆盖安装。" : "已经是最新版本。") + "</div></div>";
      return v1136 + v1135;
    }
    function v549(v1137, v1138 = "") {
      return (v1138 ? "<div class=\"note bad\" role=\"status\">" + v396(v1138) + "</div>" : "<div class=\"note info\">" + v394.icon(v1137?.hasUpdate ? "info" : "check", 18) + "<div>" + (v1137?.hasUpdate ? "发现新面板，更新成功后 App 会自动重载页面；失败仍保留旧面板。" : "已经是最新面板。") + "</div></div>") + v394.kv("当前面板", "V" + v400) + v394.kv("当前构建", v1137?.current || v558() || "—") + (v1137 ? v394.kv("最新构建", v1137.remote || "—") : "") + (v1137?.hasUpdate ? "<div class=\"field mt16\"><button class=\"btn block\" data-act=\"panelupdate\">更新并重启</button></div>" : "");
    }
    async function v550(v1139) {
      const v1140 = v1139 === "app" ? "update.check" : "panel.check";
      const v1141 = v1139 === "app" ? "iOS App 更新" : "面板更新";
      if (!v388.inShell() || !v565(v1140)) {
        return v542(v1141);
      }
      const v1142 = v1139 === "app" ? v529 : v530;
      if (v1142?.busy && v539(v1142)) {
        return false;
      }
      if (v1142) {
        v1142.closed = true;
      }
      if (v1139 !== "app") {
        v533 = null;
      }
      const v1143 = {
        which: v1139,
        scope: v536(),
        line: "",
        handle: null,
        busy: true,
        closed: false,
        result: null
      };
      if (!v537(v1143.scope, true)) {
        return false;
      }
      if (v1139 === "app") {
        v529 = v1143;
      } else {
        v530 = v1143;
      }
      v1143.handle = v394.sheet(v391(), {
        key: v1139 === "app" ? "updatecheck" : "pagecheck",
        title: v1141,
        sub: "正在检查…",
        body: v394.spinner(v1139 === "app" ? "正在向服务器查询最新 iOS 版本…" : "正在向服务器查询最新面板…", {
          block: true
        }),
        onDismiss: () => {
          v1143.closed = true;
          if (v533?.job === v1143) {
            v533 = null;
          }
        }
      });
      v519[v1139] = {
        state: "checking"
      };
      v541();
      try {
        if (!v538()) {
          await v546(true);
        }
        if (!v539(v1143)) {
          return false;
        }
        v1143.line = v538();
        if (!v1143.line) {
          throw new Error("无法读取更新线路，请重新打开 App 后重试");
        }
        v528++;
        let v1144 = v544(await v571(v1140, v1139 === "app" ? {} : {
          current: v558()
        }));
        if (!v539(v1143) || v534(v1144.line) !== v1143.line) {
          return false;
        }
        if (typeof v1144.hasUpdate !== "boolean") {
          throw new Error("更新检查结果无效，请重试");
        }
        if (v1139 === "panel") {
          v1144 = v561(v1144);
        }
        if (v1139 === "app" && (typeof v1144.latestName !== "string" || !v1144.latestName.trim() || !Number.isSafeInteger(Number(v1144.latestCode)) || Number(v1144.latestCode) <= 0 || !/^[1-9][0-9]*$/.test(String(v1144.latestCode)))) {
          throw new Error("iOS 版本信息无效，请重试");
        }
        v1143.result = v1144;
        v1143.busy = false;
        v528++;
        v519[v1139] = {
          ...v1144,
          state: v1144.hasUpdate ? "update" : "latest"
        };
        v519.at = Date.now();
        if (v1144.hasUpdate && v1139 !== "app") {
          v533 = {
            job: v1143,
            line: v1144.line
          };
        }
        v394.updateSheet(v1143.handle, {
          sub: "检查完成",
          body: v1139 === "app" ? v548(v1144) : v549(v1144)
        });
        v541();
        return true;
      } catch (v1145) {
        if (!v539(v1143)) {
          return false;
        }
        v1143.busy = false;
        v528++;
        v519[v1139] = {
          state: "error"
        };
        v519.at = Date.now();
        v394.updateSheet(v1143.handle, {
          sub: "检查失败",
          body: v1139 === "app" ? v548(null, "检查失败：" + v543(v1145)) : v549(null, "检查失败：" + v543(v1145))
        });
        v541();
        return false;
      } finally {
        v1143.busy = false;
      }
    }
    async function v551() {
      if (!v388.inShell() || !v565("panel.update")) {
        return v542("面板更新");
      }
      const v1146 = v533;
      const v1147 = v538();
      if (!v1147 || (!v1146 || !v539(v1146.job) || v1146.line !== v1147) && v519.panel?.state !== "ready") {
        if (!document.hidden && v522 && !v523) {
          v394.toast(v391(), "请先检查面板更新，再选择更新并重启", 3000);
        }
        return false;
      }
      if (v531?.busy && v537(v531.scope, true) && v394.sheetAlive(v531.handle)) {
        return false;
      }
      if (v531) {
        v531.closed = true;
      }
      const v1148 = {
        scope: v536(),
        line: v1147,
        handle: null,
        busy: true,
        closed: false
      };
      if (!v537(v1148.scope, true)) {
        return false;
      }
      v531 = v1148;
      const v1149 = () => v531 === v1148 && !v1148.closed && v537(v1148.scope, true) && v538() === v1148.line && v394.sheetAlive(v1148.handle);
      v1148.handle = v394.sheet(v391(), {
        key: "panelupdate",
        title: "面板更新",
        sub: "正在更新并重启…",
        body: "<div class=\"update-progress\"><i></i></div><div class=\"card-sub mt12\">App 正在下载并初始化新面板；成功后自动重载，失败保留旧面板。</div>",
        onDismiss: () => {
          v1148.closed = true;
        }
      });
      try {
        v544(await v571("panel.update", {
          line: v1148.line
        }));
        if (!v1149()) {
          return false;
        }
        v394.updateSheet(v1148.handle, {
          sub: "更新完成",
          body: "<div class=\"note info\">新面板已准备完成，正在由 App 重载…</div>"
        });
        v388.suspendAccountRestore?.();
        return true;
      } catch (v1150) {
        if (v1149()) {
          v394.updateSheet(v1148.handle, {
            sub: "更新未完成",
            body: v549(v1146?.job.result, "更新未完成：" + v543(v1150) + "。旧面板仍保留。")
          });
        }
        return false;
      } finally {
        v1148.busy = false;
      }
    }
    function v552(v1151) {
      if (!v1151) {
        return null;
      }
      if (typeof v1151 !== "string") {
        return v1151;
      }
      try {
        return JSON.parse(v1151);
      } catch {
        return null;
      }
    }
    function v553(v1152) {
      if (v388.isIOS?.()) {
        return v547(v1152);
      }
      const v1153 = window.ZeehoShell;
      if (!v388.inShell() || !v1153 || typeof v1153.updateStatus !== "function") {
        return null;
      }
      const v1154 = Date.now();
      const v1155 = v519.app?.state === "checking" || v519.panel?.state === "checking";
      if (!v1152 && !v1155 && v519.at && v1154 - v519.at < 2000) {
        return v519;
      }
      try {
        const v1156 = JSON.parse(v1153.updateStatus() || "{}");
        v519.app = v552(v1156.app);
        v519.panel = v552(v1156.panel);
        v519.at = v1154;
      } catch {
        return null;
      }
      return v519;
    }
    function v554(v1157) {
      const v1158 = String(v1157?.state || "");
      const v1159 = v1158 === "ready" ? String(v1157?.pending || "") : v1158 === "update" ? String(v1157?.remote || "") : "";
      const v1160 = v558();
      return !!v1159 && !!v1160 && v1159 === v1160;
    }
    function v555(v1161) {
      const v1162 = v553();
      if (!v1162) {
        return "";
      }
      const v1163 = v1162[v1161];
      if (!v1163) {
        return "";
      }
      const v1164 = String(v1163.state || "");
      if (!v1164 || v1164 === "idle") {
        return v394.chip("未检查", "", {
          nodot: true,
          title: v388.isIOS?.() ? "原生尚未检查；可点版本行手动检查（不提供后台定时轮询）" : "后台还没检查过（省电模式下可能不会自动检查）"
        });
      }
      if (v1164 === "checking") {
        return v394.chip("检查中", "info", {
          pulse: true,
          title: "正在查询最新版本"
        });
      }
      if (v1164 === "update") {
        if (v1161 === "panel" && v554(v1163)) {
          return v394.chip("已是最新版", "ok", {
            nodot: true
          });
        }
        return v394.chip("有更新", "warn", {
          title: v1161 === "app" ? "发现新版本 App" : "发现新面板"
        });
      }
      if (v1164 === "ready") {
        if (v1161 === "panel" && v554(v1163)) {
          return v394.chip("已是最新版", "ok", {
            nodot: true
          });
        }
        return v394.chip("待重启", "accent", {
          pulse: true,
          title: "新面板已下载完成，重启后生效"
        });
      }
      if (v1164 === "error") {
        return v394.chip("检查失败", "bad", {
          nodot: true,
          title: "上次检查失败，点击版本行重试"
        });
      }
      if (v1164 === "latest") {
        return v394.chip("已是最新版", "ok", {
          nodot: true
        });
      }
      return v394.chip("未检查", "", {
        nodot: true
      });
    }
    function v556() {
      const v1165 = v553();
      const v1166 = v1165 && v1165.panel;
      if (!v1166 || String(v1166.state || "") !== "ready") {
        return "";
      }
      if (v554(v1166)) {
        return "";
      }
      const v1167 = String(v1166.pending || "");
      return "<div class=\"panel-banner\" data-act=\"panelrestart\">\n      " + v394.icon("download", 18) + "\n      <div class=\"grow\">新面板已下载完成（" + v396(v1167 || "新版本") + "），重启后生效。</div>\n      <button data-act=\"panelrestart\">重启面板</button>\n    </div>";
    }
    function v557(v1168 = false) {
      if (v401()) {
        return window.PLATFORM.unavailable("App 更新检查");
      }
      if (!v1168 && v388.auth?.panelLineAvailable?.() && !v388.auth?.panelLineChosen?.()) {
        const v1173 = v394.currentSheet?.("updatecheck");
        if (v1173) {
          v394.closeSheet(v1173);
        }
        return v388.auth.panelLineSelSheet({
          updateCheck: true,
          updateTarget: "app"
        });
      }
      if (v388.isIOS?.()) {
        return v550("app");
      }
      if (!v388.inShell() || !window.ZeehoShell || (typeof window.ZeehoShell.beginAppUpdate !== "function" || typeof window.ZeehoShell.pollAppUpdate !== "function") && typeof window.ZeehoShell.checkAppUpdate !== "function") {
        v394.toast(v391(), "当前 App 版本不支持手动检查", 2600);
        return;
      }
      const v1169 = v403("app-update-check");
      v404("请求检查软件更新", v1169, {
        category: "action"
      });
      const v1170 = v394.sheet(v391(), {
        key: "updatecheck",
        title: "软件更新",
        sub: "正在检查…",
        body: v394.spinner("正在向服务器查询最新版本…", {
          block: true
        })
      });
      const v1171 = Date.now() + 45000;
      const v1172 = v1174 => {
        if (!v394.sheetAlive(v1170)) {
          return;
        }
        let v1175;
        if (!v1174.ok) {
          v1175 = "<div class=\"note bad\">" + v394.icon("alert", 18) + "<div>检查失败：" + v396(v1174.error || "网络不可用") + "</div></div>";
        } else {
          const v1177 = (v1174.currentName || "—") + " (" + (v1174.currentCode ?? "—") + ")";
          const v1178 = (v1174.latestName || "—") + " (" + (v1174.latestCode ?? "—") + ")";
          const v1179 = v1174.hasUpdate ? "<div class=\"note info\">" + v394.icon("info", 18) + "<div>发现新版本，下载后由系统安装器覆盖安装。</div></div>" : "<div class=\"note info\">" + v394.icon("check", 18) + "<div>已经是最新版本。</div></div>";
          v1175 = v1179 + v394.kv("当前版本", v1177) + v394.kv("最新版本", v1178) + (v1174.hasUpdate && v1174.notes ? "<div class=\"card-sub mt12 notes-pre\">" + v396(v1174.notes) + "</div>" : "");
        }
        const v1176 = v1174.ok && v1174.hasUpdate ? "<div class=\"field mt16\"><button class=\"btn block\" data-act=\"appdownload\">下载更新</button></div>" : "";
        v394.updateSheet(v1170, {
          key: "updatecheck",
          title: "软件更新",
          sub: "检查完成",
          body: v1175 + v1176 + (v388.auth?.panelLineAvailable?.() ? "<div class=\"field mt12\"><button class=\"btn tonal block\" data-act=\"updline\" data-v=\"app\">更换更新线路</button></div>" : "")
        });
      };
      if (typeof window.ZeehoShell.beginAppUpdate === "function" && typeof window.ZeehoShell.pollAppUpdate === "function") {
        try {
          window.ZeehoShell.beginAppUpdate();
        } catch {
          v1172({
            ok: false,
            error: "无法开始检查，请重试"
          });
          return;
        }
        const v1180 = () => {
          if (!v394.sheetAlive(v1170)) {
            return;
          }
          if (Date.now() > v1171) {
            v1172({
              ok: false,
              error: "检查超时，请重试"
            });
            return;
          }
          let v1181;
          try {
            v1181 = JSON.parse(window.ZeehoShell.pollAppUpdate() || "{}");
          } catch {
            v1181 = {
              done: false
            };
          }
          if (!v1181.done) {
            setTimeout(v1180, 300);
            return;
          }
          let v1182 = {};
          try {
            v1182 = JSON.parse(v1181.json || "{}");
          } catch {
            v1182 = {
              ok: false,
              error: "结果解析失败"
            };
          }
          v1172(v1182);
        };
        setTimeout(v1180, 300);
        return;
      }
      setTimeout(() => {
        let v1183 = {};
        try {
          v1183 = JSON.parse(window.ZeehoShell.checkAppUpdate() || "{}");
        } catch (v1184) {
          v1183 = {
            ok: false,
            error: String(v1184)
          };
        }
        v1172(v1183);
      }, 80);
    }
    function v558() {
      return (document.querySelector("meta[name=build]")?.getAttribute("content") || "").trim();
    }
    function v559(v1185, v1186) {
      const v1187 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      if (!v1187.test(v1185)) {
        return false;
      }
      if (!v1187.test(v1186)) {
        return true;
      }
      return v1185 > v1186;
    }
    function v560(v1188) {
      if (!["ready", "update", "latest"].includes(v1188.state)) {
        return v1188;
      }
      const v1189 = String(v1188.state === "ready" ? v1188.pending || "" : v1188.remote || "");
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(v1189)) {
        return v1188;
      }
      const v1190 = v561({
        ...v1188,
        remote: v1189
      });
      return {
        ...v1190,
        state: v1190.hasUpdate ? v1188.state === "ready" ? "ready" : "update" : "latest"
      };
    }
    function v561(v1191) {
      const v1192 = v558();
      const v1193 = String(v1191.remote || "");
      const v1194 = v1195 => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(v1195);
      return {
        ...v1191,
        current: v388.isIOS?.() || v1194(v1192) ? v1192 : v1191.current,
        hasUpdate: v1194(v1193) && (v388.isIOS?.() || v1194(v1192)) ? v559(v1193, v1192) : !!v1191.hasUpdate
      };
    }
    function v562(v1196 = false) {
      if (v401()) {
        return window.PLATFORM.unavailable("面板更新检查");
      }
      if (!v1196 && v388.auth?.panelLineAvailable?.() && !v388.auth?.panelLineChosen?.()) {
        const v1202 = v394.currentSheet?.("pagecheck");
        if (v1202) {
          v394.closeSheet(v1202);
        }
        return v388.auth.panelLineSelSheet({
          updateCheck: true
        });
      }
      if (v388.isIOS?.()) {
        return v550("panel");
      }
      const v1197 = v403("panel-update-check");
      v404("请求检查面板更新", v1197, {
        category: "action"
      });
      const v1198 = v394.sheet(v391(), {
        key: "pagecheck",
        title: "面板更新",
        sub: "正在检查…",
        body: v394.spinner("正在向服务器查询最新面板…", {
          block: true
        })
      });
      const v1199 = Date.now() + 20000;
      const v1200 = v1203 => {
        if (!v394.sheetAlive(v1198)) {
          return;
        }
        const v1204 = v1203.current || v558() || "—";
        const v1205 = v1203.latest || "";
        let v1206;
        if (v1203.error) {
          v1206 = "<div class=\"note bad\">" + v394.icon("alert", 18) + "<div>检查失败：" + v396(v1203.error) + "</div></div>";
        } else if (v1203.hasUpdate) {
          v1206 = "<div class=\"note info\">" + v394.icon("info", 18) + "<div>发现新面板，点击更新后会下载并自动重启页面。</div></div>" + v394.kv("当前面板", "V" + v400) + v394.kv("当前构建", v1204) + v394.kv("最新构建", v1205 || "—");
        } else {
          v1206 = "<div class=\"note info\">" + v394.icon("check", 18) + "<div>已经是最新面板。</div></div>" + v394.kv("当前面板", "V" + v400) + v394.kv("当前构建", v1204);
        }
        const v1207 = v1203.hasUpdate ? "<div class=\"field mt16\"><button class=\"btn block\" data-act=\"panelupdate\">更新并重启</button></div>" : "";
        const v1208 = v388.auth?.panelLineAvailable?.() ? "<div class=\"field mt12\"><button class=\"btn tonal block\" data-act=\"updline\" data-v=\"panel\">更换更新线路</button></div>" : "";
        v394.updateSheet(v1198, {
          key: "pagecheck",
          title: "面板更新",
          sub: v1203.error ? "检查失败" : "检查完成",
          body: v1206 + v1207 + v1208
        });
      };
      const v1201 = window.ZeehoShell;
      if (v388.inShell() && v1201 && typeof v1201.beginPageUpdate === "function" && typeof v1201.pollPageUpdate === "function") {
        try {
          v1201.beginPageUpdate();
        } catch {
          v1200({
            error: "无法开始检查，请重试"
          });
          return;
        }
        const v1209 = () => {
          if (!v394.sheetAlive(v1198)) {
            return;
          }
          if (Date.now() > v1199) {
            v1200({
              error: "检查超时，请重试"
            });
            return;
          }
          let v1210;
          try {
            v1210 = JSON.parse(v1201.pollPageUpdate() || "{}");
          } catch {
            v1210 = {
              done: false
            };
          }
          if (!v1210.done) {
            setTimeout(v1209, 300);
            return;
          }
          let v1211 = {};
          try {
            v1211 = JSON.parse(v1210.json || "{}");
          } catch {
            v1211 = {
              error: "结果解析失败"
            };
          }
          v1200(v1211.ok ? {
            ...v561(v1211),
            latest: v1211.remote
          } : {
            error: v1211.error || "网络不可用"
          });
        };
        setTimeout(v1209, 300);
        return;
      }
      if (v388.inShell() && v1201 && typeof v1201.checkPageUpdate === "function") {
        setTimeout(() => {
          let v1212 = {};
          try {
            v1212 = JSON.parse(v1201.checkPageUpdate() || "{}");
          } catch (v1213) {
            v1212 = {
              ok: false,
              error: String(v1213)
            };
          }
          v1200(v1212.ok ? {
            ...v561(v1212),
            latest: v1212.remote
          } : {
            error: v1212.error || "网络不可用"
          });
        }, 80);
        return;
      }
      if (v388.inShell()) {
        v1200({
          error: "当前 App 不支持面板检查，请更新 App 后重试。"
        });
        return;
      }
      fetch("version.json?t=" + Date.now(), {
        cache: "no-store"
      }).then(v1214 => {
        if (!v1214.ok) {
          throw new Error("HTTP " + v1214.status);
        }
        return v1214.json();
      }).then(v1215 => {
        const v1216 = v558();
        const v1217 = v1215 && v1215.build;
        v404("面板版本检查结束", v1197, {
          category: "action",
          phase: "end",
          kind: "ok",
          extra: {
            hasUpdate: v559(v1217, v1216)
          }
        });
        v1200({
          current: v1216,
          latest: v1217,
          hasUpdate: v559(String(v1217 || ""), v1216)
        });
      }).catch(v1218 => {
        v404("面板版本检查失败", v1197, {
          category: "action",
          phase: "end",
          kind: "err"
        });
        v1200({
          error: v1218.message || String(v1218)
        });
      });
    }
    async function v563() {
      if (v388.isIOS?.()) {
        return v551();
      }
      const v1219 = v403("panel-update");
      v404("请求更新并重启面板", v1219, {
        category: "action"
      });
      const v1220 = v394.sheet(v391(), {
        key: "panelupdate",
        title: "面板更新",
        sub: "正在更新并重启…",
        body: "<div class=\"update-progress\"><i></i></div>\n        <div class=\"card-sub mt12\">正在检查并下载最新面板，完成后会自动重启页面。</div>"
      });
      const v1221 = v1223 => {
        if (v394.sheetAlive(v1220)) {
          v394.updateSheet(v1220, {
            sub: "更新未完成",
            body: "<div class=\"note bad\" role=\"status\">" + v396(v1223?.message || "更新未完成，请稍后重试。") + "</div>"
          });
        }
        v404("面板更新未完成", v1219, {
          category: "action",
          phase: "failed",
          kind: "err"
        });
      };
      const v1222 = window.ZeehoShell;
      if (v388.inShell()) {
        if (typeof v1222?.restartPage !== "function") {
          v1221(new Error("当前 App 不支持面板更新，请更新 App 后重试。"));
          return;
        }
        try {
          v1222.restartPage();
        } catch (v1224) {
          v1221(v1224);
        }
        return;
      }
      try {
        if (!v394.sheetAlive(v1220)) {
          return;
        }
        const v1225 = new URL(location.href);
        v1225.searchParams.set("b", String(Date.now()));
        location.replace(v1225.href);
      } catch (v1226) {
        v1221(v1226);
      }
    }
    function v564() {
      v451 = null;
      clearTimeout(v452);
      v452 = 0;
      v439();
    }
    const v565 = v1227 => !v401() && window.IOSBR?.has?.(v1227) === true;
    const v566 = {
      info: null,
      device: null
    };
    const v567 = new Set(["user_cancelled", "operation_cancelled", "confirmation_timeout"]);
    const v568 = {
      permission_denied: "系统权限被拒绝，请在系统设置里允许后重试",
      permission_required: "需要系统权限才能继续，请在弹出的提示里允许",
      restricted: "系统限制了这项权限（如家长控制），请在系统设置里检查",
      location_services_disabled: "请先打开手机的系统定位服务",
      bluetooth_disabled: "请打开手机蓝牙后重试",
      powered_off: "请打开手机蓝牙后重试",
      bluetooth_unavailable: "这台设备不支持蓝牙",
      not_authorised: "请允许本 App 使用蓝牙（可在系统设置里修改）",
      not_authorized: "请允许本 App 使用蓝牙（可在系统设置里修改）",
      background_interrupted: "App 已切到后台，操作中断；回到面板后再试一次",
      foreground_required: "请先回到面板再操作",
      application_backgrounded: "切到后台时请求已取消，回到面板后再试一次",
      stale_ticket: "这次骑行票据已失效，记录已结束",
      stale_session: "车辆会话已变化，请重新打开设备页",
      stale_navigation: "页面已经切换，请重新打开设备页",
      authorized_vehicle_required: "请先同步车辆后再试",
      untrusted_document: "当前页面未获原生信任，请重新打开 App",
      user_action_required: "需要你在系统弹窗里确认后才能继续",
      confirmation_unavailable: "现在无法显示系统确认框，请稍后重试",
      confirmation_timeout: "确认框等待超时，请重新操作",
      operation_timeout: "原生操作超时，请重试",
      timeout: "原生请求超时，请重试",
      operation_busy: "上一个蓝牙操作还没完成，请稍候",
      queue_full: "蓝牙请求过多，请稍候",
      pending_limit: "原生请求较多，请稍后重试",
      pending_bytes_limit: "原生请求数据较多，请稍后重试",
      file_limit: "文件内容无效或超过限制",
      request_too_large: "请求内容过大，已被原生拒绝",
      invalid_args: "请求参数无效",
      invalid_envelope: "请求格式无效",
      invalid_method: "请求方法无效",
      unsupported: "当前 iOS App 未提供此能力",
      unsupported_method: "当前 iOS App 未提供此能力",
      reply_unavailable: "当前 iOS App 未提供异步回执桥",
      not_connected: "蓝牙未连接，请先连接车辆",
      unknown_identifier: "当前连接的不是这台设备，请重新扫描",
      characteristic_unavailable: "没有找到仪表特征，请重新连接",
      read_not_supported: "这个特征不支持读取",
      no_cached_value: "还没收到仪表的通知数据，请稍后再读",
      write_characteristic_unavailable: "当前设备没有可写的仪表特征，请重新连接",
      read_only_command_required: "只允许读取仪表数据，这次请求没有被接受",
      write_response_required: "这次写入需要设备回执，当前不支持",
      protocol_encode_failed: "仪表指令编码失败，请重新连接",
      scan_busy: "正在扫描蓝牙，请稍候",
      connect_timeout: "连接蓝牙超时，请靠近车辆后重试",
      discovery_timeout: "读取蓝牙服务超时，请重试",
      subscription_timeout: "订阅仪表通知超时，请重试",
      write_timeout: "写入仪表超时，请重试",
      invalid_write_length: "这次写入超出了设备允许的长度",
      restored_requires_confirmation: "系统恢复了上一次的蓝牙连接，需要你重新确认",
      invalid_timeout: "扫描时长无效",
      unsupported_service_filter: "当前设备不支持指定的服务",
      no_fix: "还没拿到定位，请到开阔处稍候",
      location_failed: "暂时拿不到定位，请稍后重试",
      invalid_fix: "这次定位精度太差，已被丢弃",
      recording_busy: "已有一条骑行记录在进行，请先结束它",
      recording_id_required: "缺少骑行记录编号",
      invalid_recording_id: "骑行记录编号无效",
      invalid_action: "不支持的骑行操作",
      retry_unavailable: "这条记录现在不能重试保存",
      save_busy: "这条记录正在保存，请稍候",
      save_failed: "骑行记录保存失败，可以点「重试保存」",
      save_write_failed: "骑行记录保存失败，可以点「重试保存」",
      pending_save_limit: "待保存的骑行记录太多，请先处理本机记录",
      no_samples: "本次没有采集到数据",
      no_data_source: "没有可用的数据来源，请开启 GPS 或先连接蓝牙",
      record_limit_reached: "骑行记录已达到上限，已自动结束",
      records_parse_limit: "本机骑行记录没能全部读取，请稍后重试",
      records_read_failed: "本机骑行记录读取失败，请稍后重试"
    };
    const v569 = v1228 => String(v1228?.error?.code || v1228?.reason || v1228?.code || v1228?.recordsError || "");
    const v570 = v1229 => v1229 ? v568[v1229] || "原生操作失败（" + v1229 + "）" : "原生操作失败";
    async function v571(v1230, v1231 = {}) {
      if (!v565(v1230)) {
        throw Object.assign(new Error("当前 iOS App 未提供此能力"), {
          code: "unsupported",
          method: v1230,
          value: null
        });
      }
      let v1232;
      try {
        v1232 = await window.IOSBR.call(v1230, v1231);
      } catch (v1233) {
        const v1234 = String(v1233?.code || "");
        throw Object.assign(new Error(v568[v1234] || v1233?.message || "原生操作失败"), {
          code: v1234,
          method: v1230,
          value: null
        });
      }
      if (v1232?.ok === false) {
        const v1235 = v569(v1232);
        if (v567.has(v1235)) {
          return {
            canceled: true
          };
        }
        throw Object.assign(new Error(v570(v1235)), {
          code: v1235,
          method: v1230,
          value: v1232
        });
      }
      return v1232;
    }
    const v572 = v1236 => v1236?.canceled === true || v1236?.status === "canceled" || v1236?.status === "cancelled";
    const v573 = {
      idle: "未开始",
      waiting: "等待数据",
      recording: "记录中",
      paused: "已暂停",
      gap: "采样中断",
      interrupted: "已中断",
      saving: "正在保存",
      save_failed: "保存失败",
      completed: "已保存",
      not_recorded: "未记录到数据",
      permission_required: "需要定位权限",
      error: "记录不可用"
    };
    const v574 = (v1237, v1238 = "等待数据") => v573[v1237] || (typeof v1237 === "string" && v1237 ? "状态未知" : v1238);
    let v575 = null;
    async function v576() {
      if (!v565("app.info")) {
        return null;
      }
      if (v575) {
        return v575;
      }
      const v1239 = v536();
      let v1240;
      v1240 = (async () => {
        try {
          const v1241 = await v571("app.info", {});
          if (!v537(v1239)) {
            return null;
          }
          v566.info = v1241;
          if (!v524) {
            v524 = v534(v1241?.panelLine);
          }
          v541();
          return v1241;
        } catch {
          return null;
        } finally {
          if (v575 === v1240) {
            v575 = null;
          }
        }
      })();
      v575 = v1240;
      return v1240;
    }
    async function v577() {
      const v1242 = await v388.syncIOSSession?.();
      if (!v1242 || v1242.ok !== true || !v1242.navId || !v1242.frame || !Number.isSafeInteger(v1242.epoch) || !Number.isSafeInteger(v1242.generation) || !v1242.accountId || !v1242.vin) {
        throw new Error("车辆尚未同步，请重试");
      }
      return v1242;
    }
    const v578 = v1243 => typeof v1243 === "number" && Number.isFinite(v1243) ? v1243 : null;
    const v579 = v1244 => v566.device === v1244 && !v1244.closed && window.IOSBR?.available?.() && v388.current(v1244.context) && v394.sheetAlive(v1244.handle);
    function v580(v1245) {
      const v1246 = v1245.ride?.gps || v1245.gps || {};
      const v1247 = v1245.ble || {};
      const v1248 = v1245.ride?.telemetry || v1247.telemetry || {};
      const v1249 = v1245.ride || {};
      const v1250 = v578(v1246.speedKph);
      const v1251 = [["电量", "socPercent", "%"], ["电压", "voltageV", "V"], ["温度", "tempC", "℃"]];
      const v1252 = Array.isArray(v1247.devices) ? v1247.devices.slice(0, 24) : [];
      const v1253 = v394.kv("功率", "需 F3 帧，当前固件未开放");
      const v1254 = typeof v1246.permission === "string" ? v1246.permission : "";
      const v1255 = v1254 === "denied" || v1254 === "restricted" || v1246.state === "permission_required" || v1246.reason === "permission_denied";
      const v1256 = !v1255 && (v1246.reducedAccuracy === true || v1246.accuracyAuthorization === "reduced");
      const v1257 = v578((v1249.orphans || v1245.orphans)?.count);
      const v1258 = v578((v1249.orphans || v1245.orphans)?.latestAt);
      const v1259 = v1249.recordState || v1249.state || (v1249.saved === true ? "completed" : "");
      const v1260 = v1249.recordState === "save_failed" || v1249.retryAvailable === true;
      const v1261 = (v1262, v1263, v1264, v1265 = false) => v1264 ? "<button class=\"btn tonal\" data-ios-device=\"" + v1262 + "\" " + (v1245.busy || v1265 ? "disabled" : "") + ">" + v1263 + "</button>" : "";
      return "<div class=\"inductive-page\"><div class=\"card\">\n      " + v394.kv("GPS速度", v1250 === null ? "—" : v1250.toFixed(1) + " km/h") + "\n      " + v1251.map(([v1266, v1267, v1268]) => v394.kv(v1266, v578(v1248[v1267]) === null ? "—" : v1248[v1267] + " " + v1268)).join("") + "\n      " + v1253 + "\n      " + (v1255 ? "<p class=\"note bad\">没有定位权限（" + (v1254 === "restricted" ? "系统限制" : "已拒绝") + "），GPS 速度与轨迹无法记录。</p>\n        " + (v565("app.settings") ? "<div class=\"field\"><button class=\"btn tonal\" data-ios-device=\"settings\">打开系统设置</button></div>" : "") : "") + "\n      " + (v1256 ? "<p class=\"note\">当前是近似定位，轨迹精度受限；可在系统设置里改为精确位置。</p>" : "") + "\n      " + v394.kv("蓝牙", v1247.connected === true ? "已连接 · 只读仪表" : v1247.scanning ? "正在扫描" : "未连接") + "\n      " + (v1247.id ? v394.kv("设备 UUID", v1247.id, {
        mono: true,
        stack: true
      }) : "") + "\n      " + (v1249.id ? v394.kv("骑行记录", v574(v1259) + " · " + (v1249.samples ?? 0) + " 个真实采样") : "") + "\n      " + (v1249.summary ? "<p class=\"card-sub\">" + v396(v1249.summary) + "</p>" : "") + "\n      " + (v1257 !== null && v1257 > 0 ? "<p class=\"note\">有 " + v1257 + " 段骑行未正常结束" + (v1258 === null ? "" : "（最近 " + v396(new Date(v1258).toLocaleString()) + "）") + "，本版本不会自动续记。</p>" : "") + "\n      <p class=\"card-sub\">设备使用 iOS UUID，不是车机 MAC；蓝牙连接不代表完成感应钥匙认证。骑行只记录已收到的 GPS / 蓝牙采样；本版本只在前台记录，切到后台可能中断。</p>\n      <div class=\"field\">" + v1261("gps", v1245.gpsOn ? "停止GPS" : "开启GPS", v565("gps.begin") && v565("gps.end") && v565("gps.poll")) + "\n        " + v1261("scan", "扫描蓝牙", v565("ble.scan")) + v1261("disconnect", "断开蓝牙", v565("ble.disconnect"), !v1247.connected) + "\n        " + v1261("read", v1245.reading ? "停止读取" : "读取仪表数据", v565("ble.write"), !v1247.connected) + "\n        " + v1261("ride", !v1260 && v1249.id && v1249.saved !== true ? "结束并保存骑行" : "开始骑行记录", v565("ride.begin") && v565("ride.poll") && v565("ride.end")) + "\n        " + (v1260 ? v1261("retry", "重试保存", v565("ride.action"), !v1249.id || v1245.busy) : "") + "\n        " + v1261("records", "本机骑行记录", v565("ride.list")) + "\n        " + (v1255 ? "" : v1261("settings", "系统权限", v565("app.settings"))) + "</div>\n      " + v1252.map(v1269 => "<button class=\"sheet-item\" data-ios-device=\"connect\" data-id=\"" + v396(v1269.id || "") + "\"\n        " + (v1245.busy || !v565("ble.connect") ? "disabled" : "") + "><span><b>" + v396(v1269.name || "蓝牙设备") + "</b>\n        <small class=\"card-sub\" style=\"display:block;overflow-wrap:anywhere\">" + v396(v1269.id || "") + (v578(v1269.rssi) === null ? "" : " · " + v1269.rssi + " dBm") + "</small></span></button>").join("") + "\n      " + (v1245.records ? "<div class=\"mt12\">" + (v1245.recordsPartial ? "<p class=\"note\">" + (v1245.recordsPartial.count > 0 ? "有 " + v1245.recordsPartial.count + " 条记录无法读取" : "部分记录无法读取") + (v1245.recordsPartial.error ? "（" + v396(v570(v1245.recordsPartial.error)) + "）" : "") + "</p>" : "") + "\n        " + (v1245.records.slice(0, 12).map(v1270 => v394.kv(new Date(v1270.startedAt).toLocaleString(), (v1270.samples ?? v1270.recordedSamples ?? 0) + " 个采样 · " + v574(v1270.state, "已保存"))).join("") || "<p class=\"muted\">还没有本机骑行记录</p>") + "</div>" : "") + "\n      " + (v1245.error ? "<p class=\"note bad\" role=\"alert\">" + v396(v1245.error) + "</p>" : "") + "\n      " + (v1245.busy ? "<p role=\"status\">正在等待原生回执…</p>" : "") + "</div></div>";
    }
    function v581(v1271) {
      if (!v579(v1271)) {
        return;
      }
      v394.updateSheet(v1271.handle, {
        body: v580(v1271),
        onMount: v1272 => {
          v1272.querySelectorAll("[data-ios-device]").forEach(v1273 => v1273.addEventListener("click", () => void v586(v1271, v1273.dataset.iosDevice, v1273.dataset.id)));
        }
      });
    }
    const v582 = v1274 => v1274 === "stale_ticket" || v1274 === "stale_session" || v1274 === "stale_navigation";
    const v583 = v1275 => v1275.gpsOn || v1275.ble?.connected === true || !!v1275.ride?.id && v1275.ride.saved !== true && v1275.ride.recordState !== "save_failed";
    async function v584(v1276) {
      if (!v579(v1276) || document.hidden || v1276.busy || v1276.polling) {
        return;
      }
      v1276.polling = true;
      try {
        if (v1276.ride?.id && v1276.ride.saved !== true && v1276.ride.recordState !== "save_failed" && v565("ride.poll")) {
          v1276.ride = await v571("ride.poll", {
            id: v1276.ride.id,
            scope: v1276.scope
          });
        } else if (v1276.gpsOn && v565("gps.poll")) {
          const v1277 = await v571("gps.poll", {});
          if (!v572(v1277)) {
            v1276.gps = v1277;
            v1276.gpsOn = v1277.enabled === true;
          }
        }
        if (v1276.ble?.connected && v565("ble.poll")) {
          const v1278 = await v571("ble.poll", {
            id: v1276.ble.id,
            scope: v1276.scope
          });
          if (!v572(v1278)) {
            v1276.ble = v1278;
            if (v1278?.connected !== true) {
              v1276.reading = false;
            }
          }
        }
        if (!v579(v1276)) {
          return;
        }
        v581(v1276);
      } catch (v1279) {
        if (v579(v1276)) {
          v1276.error = v1279?.message || "原生操作失败";
          if (v582(v1279?.code)) {
            v1276.ride = null;
            if (v1279.code !== "stale_ticket") {
              v1276.gpsOn = false;
              v1276.gps = null;
            }
          }
          v581(v1276);
        }
      } finally {
        v1276.polling = false;
        if (v579(v1276) && !document.hidden && v583(v1276)) {
          v1276.timer = setTimeout(() => {
            v1276.timer = 0;
            v584(v1276);
          }, 1000);
        }
      }
    }
    function v585(v1280) {
      return new Promise(v1281 => {
        let v1282 = false;
        let v1283;
        const v1284 = v1285 => {
          if (!v1282) {
            v1282 = true;
            v1281(v1285);
          }
        };
        v1283 = v394.sheet(v388.phone(), {
          key: "ios-ble-read-confirm",
          title: "读取仪表数据",
          center: true,
          body: "<p>仅请求当前已连接设备的仪表采样，不开锁、不配对。</p><button class=\"btn block\" data-ios-confirm>确认读取</button>",
          onDismiss: () => v1284(false),
          onMount: v1286 => v1286.querySelector("[data-ios-confirm]").addEventListener("click", () => {
            v1284(v579(v1280));
            v394.closeSheet(v1283);
          })
        });
      });
    }
    async function v586(v1287, v1288, v1289 = "") {
      if (!v579(v1287) || v1287.busy) {
        return false;
      }
      v1287.busy = true;
      v1287.error = "";
      clearTimeout(v1287.timer);
      v1287.timer = 0;
      v581(v1287);
      try {
        if (v1288 === "settings") {
          await v571("app.settings", {});
          return true;
        }
        if (v1288 === "gps") {
          if (v1287.gpsOn) {
            await v571("gps.end", {
              ticket: v1287.gpsTicket
            });
            v1287.gpsOn = false;
            v1287.gps = null;
          } else {
            const v1290 = await v571("gps.begin", {
              confirmed: true,
              requestPermission: true
            });
            if (v572(v1290)) {
              return false;
            }
            v1287.gps = v1290;
            v1287.gpsTicket = v1290.ticket;
            v1287.gpsOn = v1290.accepted === true || v1290.enabled === true;
          }
        } else {
          v1287.scope = await v577();
          if (!v579(v1287)) {
            return false;
          }
          if (v1288 === "scan") {
            v1287.ble = await v571("ble.scan", {
              scope: v1287.scope,
              timeoutMs: 10000,
              confirmed: true
            });
          } else if (v1288 === "connect") {
            if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v1289)) {
              throw new Error("设备 UUID 无效");
            }
            v1287.ble = await v571("ble.connect", {
              id: v1289,
              scope: v1287.scope,
              confirmed: true
            });
            v1287.reading = false;
          } else if (v1288 === "disconnect") {
            v1287.ble = await v571("ble.disconnect", {
              id: v1287.ble?.id,
              scope: v1287.scope
            });
            v1287.reading = false;
          } else if (v1288 === "read") {
            if (v1287.reading) {
              const v1291 = await v571("ble.write", {
                id: v1287.ble?.id,
                scope: v1287.scope,
                command: 124,
                payloadHex: "",
                confirmed: true
              });
              if (!v572(v1291)) {
                v1287.reading = false;
              }
            } else {
              if (!(await v585(v1287))) {
                return false;
              }
              const v1292 = await v571("ble.write", {
                id: v1287.ble?.id,
                scope: v1287.scope,
                command: 124,
                payloadHex: "0801",
                confirmed: true
              });
              if (v572(v1292)) {
                return false;
              }
              v1287.reading = true;
            }
            if (v565("ble.poll")) {
              v1287.ble = await v571("ble.poll", {
                id: v1287.ble?.id,
                scope: v1287.scope
              });
            }
          } else if (v1288 === "ride") {
            const v1293 = !!v1287.ride?.id && v1287.ride.saved !== true && v1287.ride.recordState !== "save_failed";
            const v1294 = await v571(v1293 ? "ride.end" : "ride.begin", v1293 ? {
              id: v1287.ride.id,
              scope: v1287.scope,
              confirmed: true
            } : {
              vin: v1287.context.vin,
              scope: v1287.scope,
              gps: true,
              confirmed: true,
              backgroundRecording: false
            });
            if (v572(v1294)) {
              return false;
            }
            v1287.ride = v1294;
            if (v1293 && v1294.saved !== true) {
              v1287.ride = {
                ...v1294,
                id: v1294.id || v1287.ride?.id || ""
              };
              if (v1287.ride.recordState !== "save_failed" && v1294.retryAvailable !== true) {
                throw new Error("骑行保存尚未确认，请稍后再试");
              }
              v1287.error = "骑行记录没能保存，可以点「重试保存」";
            }
          } else if (v1288 === "retry") {
            if (!v1287.ride?.id) {
              throw new Error("没有可重试保存的骑行记录");
            }
            const v1295 = await v571("ride.action", {
              action: "retry",
              id: v1287.ride.id,
              scope: v1287.scope
            });
            if (!v572(v1295)) {
              v1287.ride = {
                ...v1287.ride,
                ...v1295,
                recordState: v1295.recordState || v1287.ride.recordState
              };
              if (v1287.ride.saved !== true && v1287.ride.recordState === "save_failed") {
                v1287.error = "骑行记录仍然保存失败，请检查设备剩余空间";
              } else if (v1287.ride.saved === true) {
                v1287.error = "";
              }
            }
          } else if (v1288 === "records") {
            const v1296 = await v571("ride.list", {
              scope: v1287.scope
            });
            v1287.records = Array.isArray(v1296.records) ? v1296.records : [];
            v1287.recordsPartial = v1296.partial === true && v1296.recordsError ? {
              count: Math.max(0, (v578(v1296.storage?.files) ?? v1287.records.length) - v1287.records.length),
              error: String(v1296.recordsError)
            } : null;
          }
        }
        return true;
      } catch (v1297) {
        if (v579(v1287)) {
          v1287.error = v1297?.message || "原生操作失败";
          if (v1288 === "gps") {
            if (v1297?.value && typeof v1297.value.permission === "string") {
              v1287.gps = v1297.value;
            } else if (v1297?.code === "permission_denied") {
              v1287.gps = {
                ...(v1287.gps || {}),
                permission: "denied"
              };
            } else if (v1297?.code === "restricted") {
              v1287.gps = {
                ...(v1287.gps || {}),
                permission: "restricted"
              };
            }
          }
          if (v1288 === "ride" && v1297?.value?.id && typeof v1297.value === "object") {
            v1287.ride = {
              ...v1297.value,
              id: String(v1297.value.id)
            };
          }
          if (v582(v1297?.code)) {
            clearTimeout(v1287.timer);
            v1287.timer = 0;
            v1287.ride = null;
            if (v1297.code !== "stale_ticket") {
              v1287.gpsOn = false;
              v1287.gps = null;
            }
          }
        }
        return false;
      } finally {
        v1287.busy = false;
        if (v579(v1287)) {
          v581(v1287);
          v584(v1287);
        }
      }
    }
    function v587(v1298) {
      if (!v1298 || v1298.closed) {
        return;
      }
      v1298.closed = true;
      clearTimeout(v1298.timer);
      if (v566.device === v1298) {
        v566.device = null;
      }
      if (v1298.gpsOn && v565("gps.end")) {
        v571("gps.end", {
          ticket: v1298.gpsTicket
        }).catch(() => {});
      }
      if (v1298.reading && v565("ble.write") && v1298.ble?.connected) {
        v571("ble.write", {
          id: v1298.ble.id,
          scope: v1298.scope,
          command: 124,
          payloadHex: "",
          confirmed: true
        }).catch(() => {});
      }
      if (!v1298.ride?.id || v1298.ride.saved === true) {
        if (v1298.ble?.connected && v565("ble.disconnect")) {
          v571("ble.disconnect", {
            id: v1298.ble.id
          }).catch(() => {});
        }
      }
      if (v565("ble.stopScan")) {
        v571("ble.stopScan", {}).catch(() => {});
      }
    }
    async function v588() {
      if (!window.IOSBR?.available?.() || document.hidden || v397.source === "demo" || v388.isSharedCar?.()) {
        return false;
      }
      if (v566.device && v579(v566.device)) {
        return true;
      }
      const v1299 = {
        context: v388.context(),
        scope: null,
        handle: null,
        closed: false,
        busy: true,
        polling: false,
        timer: 0,
        gps: null,
        gpsOn: false,
        gpsTicket: "",
        ble: null,
        ride: null,
        records: null,
        reading: false,
        recordsPartial: null,
        error: ""
      };
      v566.device = v1299;
      v1299.handle = v394.sheet(v388.phone(), {
        key: "inductive-user",
        title: "孪生仪表 · iOS",
        full: true,
        closeMode: "current",
        className: "inductive-page",
        body: "<p role=\"status\">正在同步车辆…</p>",
        onDismiss: () => v587(v1299)
      });
      try {
        v1299.scope = await v577();
        if (v565("ble.status")) {
          v1299.ble = await v571("ble.status", {});
        }
        if (v565("ride.poll")) {
          const v1300 = await v571("ride.poll", {
            scope: v1299.scope
          });
          v1299.orphans = v572(v1300) ? null : v1300?.orphans || null;
          if (v1300?.id) {
            v1299.ride = v1300;
          } else if (v1300?.gps && typeof v1300.gps === "object" && !v1299.gps) {
            v1299.gps = v1300.gps;
          }
        }
      } catch (v1301) {
        v1299.error = v1301?.message || "原生操作失败";
        if (v582(v1301?.code)) {
          v1299.ride = null;
          v1299.gpsOn = false;
          v1299.gps = null;
        }
      } finally {
        v1299.busy = false;
        v581(v1299);
        v584(v1299);
      }
      return v579(v1299);
    }
    function v589(v1302) {
      if (!v388.isIOS?.()) {
        return;
      }
      if (v1302 === "background" || v1302 === "navigation" || v1302 === "closed") {
        v521++;
        v522 = false;
        if (v1302 !== "background") {
          v523 = true;
        }
        v540(v524);
      } else if (v1302 === "foreground") {
        v522 = true;
        v546(true);
      }
    }
    try {
      document.addEventListener("visibilitychange", () => v589(document.hidden ? "background" : "foreground"));
      window.addEventListener("zeehoios:lifecycle", v1303 => v589(v1303?.detail?.kind));
      window.addEventListener("pagehide", () => v589("closed"));
      window.addEventListener("beforeunload", () => v589("closed"));
      window.addEventListener("zeehoios:bridge-ready", () => {
        if (v525 !== v535()) {
          v540();
        }
        v546(true);
      });
    } catch {}
    const v590 = {
      call: v571,
      has: v565,
      info: () => v566.info,
      refreshInfo: v576,
      updateLine: v538,
      invalidateUpdates: v540,
      refreshUpdateStatus: v546,
      pageCapture: v536,
      pageCurrent: v537,
      openDevice: v588,
      closeDevice: () => {
        const v1304 = v566.device;
        if (!v1304) {
          return false;
        }
        v587(v1304);
        if (v394.sheetAlive(v1304.handle)) {
          v394.closeSheet(v1304.handle);
        }
        return true;
      },
      deviceAction: v586,
      state: v566
    };
    try {
      document.addEventListener("visibilitychange", () => {
        const v1305 = v566.device;
        if (document.hidden) {
          if (v1305) {
            clearTimeout(v1305.timer);
            v1305.timer = 0;
          }
        } else if (v1305 && v579(v1305)) {
          v584(v1305);
        }
      });
      window.addEventListener("zeehoios:lifecycle", v1306 => {
        const v1307 = v566.device;
        const v1308 = v1306?.detail?.kind;
        if (!v1307 || v1307.closed) {
          return;
        }
        if (v1308 === "navigation" || v1308 === "closed" || v1308 === "background") {
          clearTimeout(v1307.timer);
          v1307.timer = 0;
        }
        if (v1308 === "foreground" && v579(v1307)) {
          v584(v1307);
        }
      });
    } catch {}
    window.APP.shell = {
      ios: v590,
      battReq: v451,
      battPollTimer: v452,
      remainingRange: v447,
      primeRangeHistory: v449,
      battHistoryCard: v466,
      BATT_RANGES: v434,
      BATT_PER_RANGE: v435,
      BATT_OCV_PER_VIN: v438,
      clearBattOcv: v439,
      stopBattPoll: v564,
      battSummary: v464,
      battChart: v462,
      loadBattOcv: v445,
      loadBattHistory: v450,
      openBattHistory: v518,
      renderBattSheet: v517,
      mountBattTouch: v463,
      AUTO: v471,
      NOTIFY_CACHE: v489,
      NOTIFY_GROUPS: v496,
      bgEntryRow: v497,
      bgNotifySheet: v515,
      notifyHistorySheet: v516,
      availableRecovery: v409,
      openRecovery: v410,
      setBackground: v411,
      restartBackground: v412,
      openShellSettings: v413,
      downloadAppUpdate: v415,
      releaseTrustSupported: v414,
      refreshWidget: v417,
      refreshWidgets: v418,
      pinWidget: v419,
      requestAddWidget: v419,
      widgetAddStatus: v420,
      liveUpdateStatus: v421,
      liveUpdateStart: v422,
      liveUpdateUpdate: v423,
      liveUpdateEnd: v424,
      syncStatus: v425,
      bgStatus: v467,
      bgVerdict: v469,
      bgStatusSheet: v511,
      setBgGuideBrand: v507,
      confirmBgGuide: v508,
      openBgGuideSettings: v509,
      refreshBgGuide: v510,
      bgTaskSheet: v512,
      checkAppManual: v557,
      checkPageManual: v562,
      idRow: v428,
      idSub: v429,
      notifyGroups: v494,
      invalidateBgCache: v490,
      invalidateNotify: v491,
      panelBanner: v556,
      pushAuto: v473,
      readAuto: v472,
      autoScopeSupported: v474,
      readAutoScope: v475,
      toggleAutoScope: v514,
      refreshBgAfterAction: v488,
      autoReviveBackground: v478,
      rootEnhanceSupported: v479,
      rootEnhanceSheet: v484,
      checkRootEnhance: v486,
      setRootEnhanceEnabled: v487,
      rootEnhanceStatus: v481,
      restartPanel: v563,
      setNotifyGroup: v495,
      svip: v427,
      svipDecor: v430,
      svipSheet: v432,
      svipTop: v431,
      updateChip: v555,
      updateStatus: v553
    };
  })();
  (() => {
    const v1309 = window.APP;
    const v1310 = window.UI;
    const v1311 = window.MODEL;
    const v1312 = window.PLATFORM;
    const v1313 = {
      status: null,
      error: "",
      pending: false,
      handle: null,
      seq: 0,
      snapshotKey: "",
      snapshotRequest: null,
      queued: null,
      latest: null,
      consentRequired: null
    };
    const v1314 = ["system.surfaces.status", "system.snapshot", "liveActivity.start", "liveActivity.update", "liveActivity.end", "widgets.reload"];
    const v1315 = v1342 => v1312.has("ios", v1342);
    const v1316 = v1343 => !!v1343 && v1309.current(v1343) && !document.hidden && !v1312.preview() && window.API.source !== "demo" && !!v1343.token && !v1309.isSharedCar?.();
    const v1317 = v1344 => typeof v1344 === "number" && Number.isFinite(v1344) ? v1344 : null;
    const v1318 = v1345 => Number.isSafeInteger(v1345) && v1345 > 0 ? v1345 : null;
    const v1319 = v1346 => {
      const v1347 = v1317(v1346);
      if (v1347 !== null && v1347 >= 0 && v1347 <= 100) {
        return v1347;
      } else {
        return null;
      }
    };
    const v1320 = v1348 => String(v1348?.error?.message || v1348?.error?.code || v1348?.message || "系统展示 unavailable：原生未确认结果。");
    const v1321 = () => v1313.consentRequired === true || v1313.status?.snapshot?.consentRequired === true;
    function v1322(v1349) {
      v1313.status = v1349;
      if (typeof v1349?.snapshot?.consentRequired === "boolean") {
        v1313.consentRequired = v1349.snapshot.consentRequired;
      }
    }
    async function v1323(v1350, v1351 = {}) {
      if (!v1315(v1350)) {
        throw new Error(v1312.message("iOS 系统展示"));
      }
      const v1352 = await window.IOSBR.call(v1350, v1351);
      if (!v1352 || typeof v1352 !== "object" || Array.isArray(v1352) || v1352.ok !== true) {
        const v1353 = new Error(v1320(v1352));
        v1353.code = String(v1352?.error?.code || v1352?.code || "native_rejected");
        throw v1353;
      }
      return v1352;
    }
    function v1324() {
      v1309.state.systemSurfaces = v1313.status;
      if (v1313.handle && v1310.sheetAlive(v1313.handle)) {
        v1310.updateSheet(v1313.handle, v1331());
      }
      if (v1309.state.tab === "me") {
        v1309.render?.({
          keepScroll: true
        });
      }
    }
    async function v1325() {
      if (v1312.preview()) {
        v1313.status = null;
        v1313.error = v1312.message("iOS 系统展示");
        v1324();
        return false;
      }
      if (!v1315("system.surfaces.status")) {
        v1313.status = null;
        v1313.error = v1312.message("iOS 系统展示");
        v1324();
        return false;
      }
      const v1354 = v1309.context();
      const v1355 = ++v1313.seq;
      v1313.status = null;
      v1313.pending = true;
      v1324();
      try {
        const v1356 = await v1323("system.surfaces.status");
        if (v1355 !== v1313.seq || !v1309.current(v1354) || document.hidden) {
          return false;
        }
        if (typeof v1356.supported !== "boolean" || typeof v1356.enabled !== "boolean" || !v1356.liveActivities || !v1356.widgets) {
          throw new Error("系统展示状态 unavailable：原生字段不完整。");
        }
        v1322(v1356);
        v1313.error = "";
        return true;
      } catch (v1357) {
        if (v1355 === v1313.seq && v1309.current(v1354)) {
          v1313.status = null;
          v1313.error = v1357.message;
        }
        return false;
      } finally {
        if (v1355 === v1313.seq) {
          v1313.pending = false;
          v1324();
        }
      }
    }
    const v1326 = (v1358, v1359 = false) => !v1358 || v1358.supported !== true ? "unavailable" : v1358.enabled !== true ? "未启用" : v1359 ? v1358.running === true ? "运行中" : "未启动" : "已启用";
    const v1327 = v1360 => {
      if (!v1360 || v1360.supported !== true) {
        return "共享区不可用";
      }
      if (v1360.snapshotReadReason) {
        return "共享数据读取失败 · " + v1311.esc(v1360.snapshotReadReason);
      }
      if (v1360.executionState === "disabled") {
        return "未启用";
      }
      if (v1360.configurations?.queried === true && v1360.configurations.installedCount === 0) {
        return "尚未添加到桌面";
      }
      if (v1360.executionState === "timeline_delivered") {
        return "扩展已读取数据并提交时间线 · 桌面显示由系统决定";
      }
      if (v1360.executionState === "timeline_without_current_vehicle") {
        const v1361 = v1360.execution?.timelineReady?.reason;
        return "扩展已提交时间线 · 未取得当前车辆数据" + (v1361 ? " · " + v1311.esc(v1361) : "");
      }
      if (v1360.executionState === "timeline_in_progress") {
        return "扩展已开始读取 · 尚未收到时间线交付回执";
      }
      if (v1360.executionState === "snapshot_only") {
        return "扩展已收到预览请求 · 尚未收到桌面时间线请求";
      }
      if (v1360.executionState === "awaiting_timeline") {
        return "扩展已启动 · 尚未收到预览或时间线请求";
      }
      if (v1360.snapshotReadable !== true && v1360.enabled !== true) {
        return "等待宿主同步车辆数据";
      }
      return "宿主数据已准备 · 尚未收到扩展回执";
    };
    const v1328 = (v1362, v1363) => "<button class=\"btn tonal sm\" type=\"button\" data-system-surface=\"" + v1362 + "\">" + v1363 + "</button>";
    function v1329() {
      const v1364 = v1313.status;
      const v1365 = v1312.preview();
      const v1366 = v1365 ? v1319(v1309.state.data.battery?.soc ?? v1309.state.data.home?.soc) : null;
      const v1367 = v1365 ? "<div class=\"stat-grid\">" + v1310.stat("示例电量", v1366 ?? "—", "%") + v1310.stat("示例状态", v1309.state.data.home?.charge?.text || "—", "") + "</div>" : "";
      const v1368 = v1370 => v1370?.reason && v1370.reason !== "available" ? " · " + v1311.esc(v1370.reason) : "";
      const v1369 = !v1365 && v1364?.snapshot?.capturedAt ? "<div class=\"card-sub\">最近前台快照 " + v1311.esc(new Date(v1364.snapshot.capturedAt).toLocaleString()) + (v1364.snapshot.stale === true ? " · 已过期" : "") + "</div>" : "";
      return v1310.card(v1310.cardHead("Live Activities / Dynamic Island", "前台更新 · 展示位置由系统决定", "", "battery") + ("<div class=\"card-sub\">" + (v1365 ? "合成 UI 示意 · 原生操作 unavailable" : v1326(v1364?.liveActivities, true) + v1368(v1364?.liveActivities)) + "</div>") + v1367 + ("<div class=\"field\">" + v1328("start", "开始活动") + v1328("update", "更新活动") + v1328("end", "结束活动") + "</div>")) + v1310.card(v1310.cardHead("WidgetKit", "桌面小组件 · 最近前台快照", "", "chip") + ("<div class=\"card-sub\">" + (v1365 ? "合成 UI 示意 · 原生操作 unavailable" : v1327(v1364?.widgets) + v1368(v1364?.widgets)) + "</div>") + v1369 + v1367 + ("<div class=\"field\">" + v1328("widgets", "刷新小组件") + "</div>"));
    }
    function v1330() {
      if (!v1312.visible("ios")) {
        return "";
      }
      return v1310.card(v1310.cardHead("系统展示", "Live Activities · Dynamic Island · WidgetKit", "", "chip") + "<button class=\"btn tonal block\" data-act=\"systemsurfaces\">管理系统展示</button>");
    }
    function v1331() {
      return {
        key: "system-surfaces",
        full: true,
        title: "系统展示",
        sub: "Live Activities · WidgetKit",
        body: "<div class=\"field\">" + v1328("enable", "启用 iOS 系统显示") + v1328("disable", "关闭系统显示") + "</div>" + v1329() + (v1321() ? "<div class=\"card-sub\">尚未授权，请主动启用系统显示。</div>" : "") + (v1313.status?.snapshot?.reason ? "<div class=\"card-sub\">原生记录：" + v1311.esc(v1313.status.snapshot.reason) + "</div>" : "") + (v1313.error ? "<div class=\"card-sub\" role=\"status\">" + v1311.esc(v1313.error) + "</div>" : "") + ("<div class=\"field\">" + v1328("status", v1313.pending ? "读取状态中…" : "读取真实状态") + "</div>"),
        onMount(v1371) {
          v1371.querySelectorAll("[data-system-surface]").forEach(v1372 => v1372.addEventListener("click", () => v1333(v1372.dataset.systemSurface)));
        },
        onDismiss() {
          v1313.handle = null;
        }
      };
    }
    function v1332() {
      if (!v1312.visible("ios")) {
        return v1312.unavailable("iOS 系统展示");
      }
      v1313.handle = v1310.sheet(v1309.phone(), v1331());
      if (!v1312.preview()) {
        v1325();
      }
      return v1313.handle;
    }
    async function v1333(v1373) {
      if (v1312.preview()) {
        return v1312.unavailable("iOS 系统展示");
      }
      if (v1373 === "status") {
        return v1325();
      }
      const v1374 = {
        enable: "system.snapshot",
        disable: "system.snapshot",
        start: "liveActivity.start",
        update: "liveActivity.update",
        end: "liveActivity.end",
        widgets: "widgets.reload"
      }[v1373];
      if (!v1374 || !v1315(v1374)) {
        return v1312.unavailable("iOS 系统展示");
      }
      const v1375 = v1309.context();
      if (!v1316(v1375)) {
        return v1312.unavailable("当前车辆的系统展示");
      }
      if (v1373 === "update" && v1313.status?.liveActivities?.running !== true) {
        v1310.toast(v1309.phone(), "Live Activities unavailable：没有已启动的活动。");
        return false;
      }
      v1313.pending = true;
      v1324();
      try {
        const v1376 = await v1309.syncIOSSession?.();
        const v1377 = v1375.owner || window.ACC?.active?.();
        if (!v1316(v1375) || !v1377?.id || typeof v1376?.epochString !== "string") {
          throw new Error("系统展示 unavailable：当前车辆范围尚未确认。");
        }
        const v1378 = {
          accountId: v1377.id,
          vin: v1375.vin,
          generation: v1376.epochString
        };
        if (v1373 === "enable" || v1373 === "disable") {
          const v1379 = v1313.latest;
          if (!v1379 || !v1316(v1379.scope) || v1379.payload.generation !== v1378.generation) {
            throw new Error("系统展示 unavailable：请先刷新真实车况，再启用系统显示。");
          }
          const v1380 = await v1323(v1374, {
            ...v1379.payload,
            enable: v1373 === "enable"
          });
          if (!v1316(v1375)) {
            return false;
          }
          if (v1380.surfaces && typeof v1380.surfaces === "object") {
            v1322(v1380.surfaces);
          }
        } else {
          if (v1373 === "start") {
            v1378.kind = v1313.status?.liveActivities?.kind === "ride" ? "ride" : v1309.state.data.home?.charge?.charging === true ? "charging" : "vehicle";
          } else if ((v1373 === "update" || v1373 === "end") && typeof v1313.status?.liveActivities?.id === "string") {
            v1378.id = v1313.status.liveActivities.id;
          }
          await v1323(v1374, v1378);
        }
        if (!v1316(v1375)) {
          return false;
        }
        await v1325();
        return true;
      } catch (v1381) {
        if (v1316(v1375)) {
          v1313.error = v1381.message;
          v1310.toast(v1309.phone(), v1313.error);
        }
        return false;
      } finally {
        v1313.pending = false;
        v1324();
      }
    }
    function v1334({
      scope: v1382,
      nativeScope: v1383,
      home = {},
      battery = {},
      vehicleFresh = false,
      batteryFresh = false
    }) {
      if (!v1316(v1382) || !v1315("system.snapshot") || typeof v1383?.epochString !== "string") {
        return null;
      }
      const v1384 = v1382.owner || window.ACC?.active?.();
      if (!v1384?.id || !v1382.vin) {
        return null;
      }
      const v1385 = vehicleFresh ? v1318(home.sampleAt) : null;
      const v1386 = batteryFresh ? v1318(battery.sampleAt) : null;
      if (!v1385 && !v1386) {
        return null;
      }
      const v1387 = battery.raw || {};
      const v1388 = home.raw || {};
      const v1389 = v1386 ? v1319(battery.soc) : v1385 ? v1319(home.soc) : null;
      const v1390 = v1386 && typeof v1387.chargeState === "string" && v1387.chargeState.trim() ? v1387.chargeState.trim() : v1385 && typeof v1388.chargeState === "string" ? v1388.chargeState.trim() : "";
      const v1391 = v1390 === "1" ? true : v1390 === "" || v1390 == null ? null : false;
      const v1392 = v1391 === null ? null : v1386 && typeof v1387.chargeState === "string" && v1387.chargeState.trim() ? v1386 : v1385;
      const v1393 = v1385 ? v1319(home.charge?.progress) : null;
      const v1394 = {
        accountId: v1384.id,
        vin: v1382.vin,
        generation: v1383.epochString,
        source: "foreground",
        capturedAt: Math.max(v1385 || 0, v1386 || 0),
        dualDisplay: window.CAPBOOK?.scale?.(v1382.vin) === 2,
        socPercent: v1389,
        socUpdatedAt: v1389 === null ? null : v1386 || v1385,
        charging: v1391,
        chargingUpdatedAt: v1392,
        chargeProgressPercent: v1393,
        chargeProgressUpdatedAt: v1393 === null ? null : v1385
      };
      if (v1385 && typeof home.type === "string" && home.type.trim() && home.type.length <= 40 && !home.type.includes("://") && !home.type.includes("@") && !home.type.includes(v1382.vin) && !/[\u0000-\u001f\u007f]/.test(home.type)) {
        v1394.name = home.type;
      }
      const v1395 = typeof (home.scalePic || home.pic) === "string" ? String(home.scalePic || home.pic).trim() : "";
      if (v1395 && v1395.length <= 2048 && /^https:\/\/[^\s]+$/i.test(v1395) && !/[\u0000-\u001f\u007f]/.test(v1395)) {
        v1394.artUrl = v1395;
      }
      const v1396 = v1335({
        home: home,
        homeAt: v1385,
        battery: battery,
        batteryAt: v1386,
        scope: v1382,
        capturedLimit: v1394.capturedAt
      });
      if (v1396) {
        Object.assign(v1394, v1396.fields);
        if (v1396.statsUpdatedAt) {
          v1394.statsUpdatedAt = Math.min(v1396.statsUpdatedAt, v1394.capturedAt);
        }
      }
      return v1394;
    }
    function v1335({
      home: v1397,
      homeAt: v1398,
      battery: v1399,
      batteryAt: v1400,
      scope: v1401,
      capturedLimit = 0
    }) {
      const v1402 = v1423 => {
        if (typeof v1423 === "number") {
          if (Number.isFinite(v1423)) {
            return v1423;
          } else {
            return null;
          }
        }
        if (typeof v1423 !== "string" || !v1423.trim()) {
          return null;
        }
        const v1424 = Number(v1423);
        if (Number.isFinite(v1424)) {
          return v1424;
        } else {
          return null;
        }
      };
      const v1403 = (v1425, v1426) => v1425 && Object.prototype.hasOwnProperty.call(v1425, v1426);
      const v1404 = Date.now();
      const v1405 = (v1427, v1428) => {
        const v1429 = v1318(v1427);
        if (v1428 && v1429 && v1429 <= v1404 + 30000 && v1404 - v1429 < 1800000) {
          return v1429;
        } else {
          return null;
        }
      };
      const v1406 = {};
      let v1407 = null;
      let v1408 = 0;
      const v1409 = (v1430, v1431, v1432, v1433) => {
        if (capturedLimit > 0 && v1433 > capturedLimit) {
          return;
        }
        if (v1433 && v1432 && v1431 !== null) {
          v1406[v1430] = v1431;
          v1407 = v1407 === null ? v1433 : Math.min(v1407, v1433);
          v1408 = Math.max(v1408, v1433);
        }
      };
      const v1410 = v1405(v1398, !!v1398);
      const v1411 = v1405(v1400, !!v1400);
      const v1412 = v1397?.raw || {};
      if (v1410) {
        if (typeof v1397.headLock === "boolean") {
          v1409("lockState", v1397.headLock ? 1 : 0, true, v1410);
        }
        if (typeof v1397.seatLock === "boolean") {
          v1409("seatState", v1397.seatLock ? 1 : 0, true, v1410);
        }
        if (typeof v1397.online === "boolean") {
          v1409("online", v1397.online ? 1 : 0, true, v1410);
        } else if (typeof v1397.onlineStatus === "number") {
          v1409("online", v1397.onlineStatus === 1 ? 1 : v1397.onlineStatus === 0 ? 0 : null, true, v1410);
        }
        const v1434 = v1403(v1412, "totalRideMile") ? v1412.totalRideMile : v1403(v1412, "totalMile") ? v1412.totalMile : null;
        const v1435 = v1403(v1412, "hmiRidableMile") ? v1412.hmiRidableMile : v1403(v1412, "range") ? v1412.range : null;
        const v1436 = v1402(v1434);
        const v1437 = v1402(v1435);
        v1409("totalMileKm", v1436, v1436 !== null && v1436 >= 0, v1410);
        v1409("rangeKm", v1437, v1437 !== null && v1437 >= 0, v1410);
      }
      const v1413 = window.APP?.state?.data || {};
      const v1414 = v1413.rideHome || {};
      const v1415 = v1405(v1414.sampleAt, v1414.ok === true);
      if (v1415) {
        const v1438 = v1402(v1414.todayMile);
        const v1439 = v1402(v1414.lastMile);
        const v1440 = v1402(v1414.lastMinutes);
        v1409("todayMileKm", v1438, v1438 !== null && v1438 >= 0, v1415);
        v1409("lastMileKm", v1439, v1439 !== null && v1439 >= 0, v1415);
        v1409("lastRideMinutes", v1440, v1440 !== null && v1440 >= 0, v1415);
      }
      const v1416 = v1413.user || {};
      const v1417 = v1405(v1416.sampleAt, v1416.statsOk === true);
      if (v1417) {
        const v1441 = v1402(v1416.score);
        v1409("integral", v1441, v1441 !== null && v1441 >= 0, v1417);
      }
      const v1418 = v1413.messages || {};
      const v1419 = v1405(v1418.sampleAt, v1418.ok === true);
      if (v1419) {
        const v1442 = v1402(v1403(v1418, "rawNoRead") ? v1418.rawNoRead : v1418.noRead);
        v1409("unread", v1442 === null ? null : Math.round(v1442), v1442 !== null && v1442 >= 0, v1419);
      }
      const v1420 = v1399?.raw || {};
      if (v1411) {
        const v1443 = v1402(v1420.voltage) ?? v1402(v1420.bmsVoltage);
        const v1444 = v1443 !== null && v1443 > 0 && v1443 <= 200 ? v1443 : null;
        v1409("voltage", v1444, v1444 !== null, v1411);
        const v1445 = v1402(v1420.current);
        const v1446 = v1402(v1420.power);
        const v1447 = v1445 === null && v1446 === null ? null : v1402(window.MODEL?.currentAmp?.(v1444, v1445, v1446));
        if (v1447 !== null && Math.abs(v1447) <= 500) {
          v1409("current", v1447, true, v1411);
        }
        const v1448 = v1446 === null && v1447 === null ? null : v1402(window.MODEL?.powerWatt?.(v1444, v1447, v1446));
        if (v1448 !== null && Math.abs(v1448) <= 30000) {
          v1409("power", v1448, true, v1411);
        }
      }
      const v1421 = v1413.tires || {};
      const v1422 = v1405(v1421.sampleAt, v1421.ok === true);
      if (v1422) {
        try {
          const v1449 = Array.isArray(v1421.wheels) ? v1421.wheels : [];
          for (const v1450 of v1449) {
            if (!v1450 || typeof v1450 !== "object") {
              continue;
            }
            const v1451 = v1402(v1450.pressure);
            const v1452 = v1402(v1450.temp);
            if (v1450.pos === "前轮") {
              if (v1451 !== null && v1451 > 0 && v1451 <= 20) {
                v1409("tireFrontBar", v1451, true, v1422);
              }
              if (v1452 !== null && v1452 >= -60 && v1452 <= 200) {
                v1409("tireFrontTemp", v1452, true, v1422);
              }
            } else if (v1450.pos === "后轮") {
              if (v1451 !== null && v1451 > 0 && v1451 <= 20) {
                v1409("tireRearBar", v1451, true, v1422);
              }
              if (v1452 !== null && v1452 >= -60 && v1452 <= 200) {
                v1409("tireRearTemp", v1452, true, v1422);
              }
            }
          }
        } catch {}
      }
      if (v1407 === null) {
        return null;
      }
      v1406.statsUpdatedAt = v1407;
      return {
        fields: v1406,
        latestAt: v1408
      };
    }
    async function v1336(v1453) {
      v1313.snapshotRequest = v1453;
      try {
        if (!v1316(v1453.scope)) {
          return false;
        }
        const v1454 = await v1323("system.snapshot", v1453.payload);
        if (!v1316(v1453.scope)) {
          return false;
        }
        v1313.snapshotKey = v1453.key;
        v1313.error = "";
        v1313.consentRequired = false;
        if (v1454.surfaces && typeof v1454.surfaces === "object") {
          v1322(v1454.surfaces);
          v1324();
        }
        return true;
      } catch (v1455) {
        const v1456 = String(v1455?.code || "snapshot_failed");
        const v1457 = String(v1455?.message || "");
        if (v1316(v1453.scope)) {
          const v1458 = v1456 === "snapshot_consent_required" && v1313.consentRequired !== false && v1313.status?.snapshot?.consentRequired !== false;
          if (v1458) {
            v1313.consentRequired = true;
            v1313.error = "";
          } else {
            v1313.error = v1457 && v1457 !== v1456 ? v1456 + "：" + v1457 : v1456;
          }
          try {
            window.DIAG?.event?.(v1458 ? "iOS 系统快照等待授权" : "iOS 系统快照写入失败", {
              category: "action",
              phase: v1458 ? "skipped" : "failed",
              kind: v1458 ? "info" : "err",
              detail: v1458 ? "snapshot_consent_required：尚未授权系统显示，普通前台采样已跳过。" : v1313.error
            });
          } catch {}
          v1324();
        }
        return false;
      } finally {
        if (v1313.snapshotRequest === v1453) {
          v1313.snapshotRequest = null;
        }
        const v1459 = v1313.queued;
        v1313.queued = null;
        if (v1459 && v1316(v1459.scope) && !v1321()) {
          v1336(v1459);
        }
      }
    }
    function v1337(v1460) {
      const v1461 = v1334(v1460);
      if (!v1461) {
        return false;
      }
      const v1462 = JSON.stringify(v1461);
      if (v1462 === v1313.snapshotKey || v1462 === v1313.snapshotRequest?.key || v1462 === v1313.queued?.key) {
        return false;
      }
      const v1463 = {
        scope: v1460.scope,
        payload: v1461,
        key: v1462
      };
      v1313.latest = v1463;
      if (v1321()) {
        return false;
      }
      if (v1313.snapshotRequest) {
        v1313.queued = v1463;
      } else {
        v1336(v1463);
      }
      return true;
    }
    async function v1338(v1464, v1465, v1466) {
      if (!v1316(v1464) || !v1315("system.displayPreference") || typeof v1465?.epochString !== "string") {
        return false;
      }
      const v1467 = v1464.owner || window.ACC?.active?.();
      if (!v1467?.id || !v1464.vin || typeof v1466 !== "boolean") {
        return false;
      }
      try {
        await v1323("system.displayPreference", {
          accountId: v1467.id,
          vin: v1464.vin,
          generation: v1465.epochString,
          dualDisplay: v1466
        });
        if (!v1316(v1464)) {
          return false;
        }
        v1313.snapshotKey = "";
        if (v1313.latest?.payload) {
          const v1468 = {
            ...v1313.latest.payload,
            dualDisplay: v1466
          };
          const v1469 = JSON.stringify(v1468);
          const v1470 = {
            scope: v1464,
            payload: v1468,
            key: v1469
          };
          v1313.latest = v1470;
          if (v1313.snapshotRequest) {
            v1313.queued = v1470;
          } else if (!v1321()) {
            v1336(v1470);
          }
        }
        return true;
      } catch {
        return false;
      }
    }
    function v1339() {
      v1313.seq++;
      v1313.status = null;
      v1313.latest = null;
      v1313.queued = null;
      v1313.snapshotKey = "";
      v1313.consentRequired = null;
      v1309.state.systemSurfaces = null;
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        v1339();
      } else if (v1313.handle && v1310.sheetAlive(v1313.handle) && !v1312.preview()) {
        v1325();
      }
    });
    const v1340 = new Set();
    async function v1341(v1471) {
      const v1472 = String(v1471?.action || "");
      const v1473 = {
        unlock: "lockOn",
        lock: "lockOff",
        horn: "search",
        seat: "cushion"
      }[v1472];
      const v1474 = String(v1471?.id || "").toLowerCase();
      if (!v1473 || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(v1474) || typeof v1471.ownerID !== "string" || !v1471.ownerID || typeof v1471.frame !== "string" || !v1471.frame || !Number.isSafeInteger(v1471.generation) || !Number.isSafeInteger(v1471.epoch)) {
        return;
      }
      const v1475 = () => Number.isSafeInteger(v1471.createdAt) && v1471.createdAt > 0 && Date.now() >= v1471.createdAt && Date.now() - v1471.createdAt <= 60000;
      const v1476 = v1309.context();
      const v1477 = v1476.owner || window.ACC?.active?.();
      const v1478 = window.IOSBR?.bootstrap?.()?.navId;
      if (!v1475() || v1340.has(v1474) || !v1316(v1476) || !window.IOSBR?.isCurrent?.() || v1471.navId !== v1478) {
        return;
      }
      v1340.add(v1474);
      if (v1340.size > 128) {
        v1340.delete(v1340.values().next().value);
      }
      const v1479 = await v1309.syncIOSSession?.();
      if (!v1316(v1476) || !v1475() || !window.IOSBR?.isCurrent?.() || window.IOSBR?.bootstrap?.()?.navId !== v1478 || v1479?.widgetOwnerID !== v1471.ownerID || v1479.navId !== v1471.navId || v1479.generation !== v1471.generation || v1479.epoch !== v1471.epoch || v1479.frame !== v1471.frame || v1479.accountId !== v1477?.id || v1479.vin !== v1476.vin) {
        return;
      }
      const v1480 = v1309.gestures?.sendSteps;
      if (typeof v1480 !== "function") {
        return;
      }
      await v1480(v1473, v1476);
    }
    window.addEventListener("zeehoios:widget-command", v1481 => {
      v1341(v1481?.detail).catch(() => {});
    });
    window.addEventListener("pagehide", v1339);
    v1309.systemSurfaces = Object.freeze({
      methods: v1314,
      available: v1315,
      card: v1330,
      open: v1332,
      refresh: v1325,
      action: v1333,
      accept: v1337,
      setDualDisplay: v1338,
      reset: v1339,
      state: v1313
    });
  })();
  (() => {
    const v1482 = window.APP;
    const v1483 = window.PLATFORM;
    const v1484 = v1505 => v1483.has("ios", v1505);
    const v1485 = () => v1484("background.status");
    const v1486 = () => !document.hidden && !v1483.preview() && window.IOSBR?.available?.() === true;
    async function v1487(v1506, v1507) {
      if (!v1484(v1506)) {
        throw new Error("native_unavailable");
      }
      const v1508 = v1507 === undefined ? await window.IOSBR.call(v1506) : await window.IOSBR.call(v1506, v1507);
      if (!v1508 || typeof v1508 !== "object" || Array.isArray(v1508) || v1508.ok !== true) {
        throw new Error("native_rejected");
      }
      return v1508;
    }
    let v1488 = 0;
    async function v1489() {
      if (!v1485()) {
        return false;
      }
      const v1509 = ++v1488;
      try {
        const v1510 = await v1487("background.status");
        if (v1509 !== v1488) {
          return false;
        }
        v1482.state.background = v1510;
        return true;
      } catch {
        return false;
      }
    }
    const v1490 = [2000, 10000, 30000];
    let v1491 = 0;
    let v1492 = "";
    let v1493 = null;
    let v1494 = 0;
    let v1495 = null;
    let v1496 = false;
    function v1497() {
      if (!v1486() || !v1484("background.credential.sync")) {
        return null;
      }
      const v1511 = v1482.context?.();
      const v1512 = v1511?.owner || window.ACC?.active?.();
      if (!v1511?.vin || !v1511.token || v1511.source === "demo" || !v1512?.id || !v1512.token || v1512.invalidAt || !v1482.current?.(v1511)) {
        return null;
      }
      return {
        scope: v1511,
        owner: v1512,
        foreground: v1491
      };
    }
    function v1498(v1513) {
      return !!v1513 && v1486() && v1513.foreground === v1491 && v1484("background.credential.sync") && v1482.current?.(v1513.scope) && (!window.ACC?.byId || (() => {
        const v1514 = window.ACC.byId(v1513.owner.id);
        return !!v1514 && !v1514.invalidAt && v1514.token === v1513.owner.token && v1514.uid === v1513.owner.uid && v1514.credentialRev === v1513.owner.credentialRev;
      })());
    }
    function v1499(v1515, v1516) {
      clearTimeout(v1494);
      v1494 = 0;
      const v1517 = v1490[v1516.failures++];
      v1516.retryAt = v1517 === undefined ? Infinity : Date.now() + v1517;
      if (v1517 !== undefined) {
        v1494 = setTimeout(() => {
          v1494 = 0;
          if (v1493 === v1516 && v1498(v1515)) {
            v1501();
          }
        }, v1517);
      }
    }
    async function v1500() {
      const v1518 = v1497();
      if (!v1518) {
        return false;
      }
      const {
        scope: v1519,
        owner: v1520
      } = v1518;
      const v1521 = await v1482.syncIOSSession?.();
      const v1522 = v1482.getNativeUiContext?.();
      const v1523 = () => v1498(v1518) && v1522?.scope === v1521 && v1522.isCurrent?.() === true;
      if (!v1521 || !v1523() || v1521.accountId !== v1520.id || v1521.vin !== v1519.vin) {
        return false;
      }
      const v1524 = JSON.stringify([v1518.foreground, v1520.id, v1519.vin, v1520.token, v1520.uid || "", v1520.credentialRev || 0, v1521.navId, v1521.generation, v1521.epoch, v1521.frame]);
      if (v1524 === v1492) {
        return true;
      }
      if (v1493?.key !== v1524) {
        clearTimeout(v1494);
        v1494 = 0;
        v1493 = {
          key: v1524,
          failures: 0,
          retryAt: 0
        };
      }
      const v1525 = v1493;
      if (Date.now() < v1525.retryAt) {
        return false;
      }
      try {
        const v1526 = String(v1520.uid || (await v1482.resolveAccountUidFor?.(v1520.id)) || "").trim();
        if (!v1523()) {
          return false;
        }
        const v1527 = window.ZEEHO_SIGN;
        if (typeof v1527?.exportBackgroundKeys !== "function") {
          throw new Error("background_keys_unavailable");
        }
        let v1528 = false;
        await v1527.exportBackgroundKeys(async v1529 => {
          if (!v1523()) {
            return;
          }
          await v1487("background.credential.sync", {
            accountId: v1520.id,
            vin: v1519.vin,
            token: v1520.token,
            signinToken: v1520.token,
            uid: v1526,
            scope: v1521,
            appId: v1529.appId,
            appSecret: v1529.appSecret,
            h5AppId: v1529.h5AppId,
            h5Secret: v1529.h5Secret
          });
          v1528 = true;
        });
        if (!v1528 || !v1523()) {
          return false;
        }
        if (!v1526) {
          v1499(v1518, v1525);
          return true;
        }
        v1492 = v1524;
        clearTimeout(v1494);
        v1494 = 0;
        v1493 = null;
        return true;
      } catch {
        if (v1523() && v1493 === v1525) {
          v1499(v1518, v1525);
        }
        return false;
      }
    }
    function v1501() {
      if (!v1497()) {
        return Promise.resolve(false);
      }
      if (v1495) {
        v1496 = true;
        return v1495;
      }
      const v1530 = Promise.resolve().then(v1500).catch(() => false).finally(() => {
        if (v1495 !== v1530) {
          return;
        }
        v1495 = null;
        if (v1496) {
          v1496 = false;
          v1501();
        }
      });
      v1495 = v1530;
      return v1530;
    }
    function v1502() {
      v1491++;
      v1492 = "";
      v1493 = null;
      clearTimeout(v1494);
      v1494 = 0;
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        v1502();
      } else {
        v1501();
      }
    });
    window.addEventListener("pagehide", v1502);
    window.addEventListener("pageshow", () => {
      v1501();
    });
    let v1503 = false;
    async function v1504() {
      if (v1503 || !v1485() || document.hidden || v1483.preview()) {
        return;
      }
      const v1531 = v1482.context();
      if (!v1531?.vin || !v1482.current?.(v1531)) {
        return;
      }
      v1503 = true;
      try {
        await v1501();
        if (document.hidden || !v1482.current?.(v1531)) {
          return;
        }
        const v1532 = await v1487("background.samples.take");
        if (Number(v1532.count) > 0) {
          await v1482.ingestBackgroundSamples?.(v1532.samples, {
            silent: true
          });
        }
      } catch {} finally {
        v1503 = false;
      }
    }
    window.OSBackground = {
      supported: v1485,
      refresh: v1489,
      autoMerge: v1504,
      ensureCredential: v1501
    };
  })();
  (() => {
    const v1533 = window.APP;
    const v1534 = v1533.state;
    const v1535 = v1533.phone;
    const v1536 = window.MODEL;
    const v1537 = window.UI;
    const v1538 = v1536.esc;
    const v1539 = window.API;
    const v1540 = window.CHG;
    const v1541 = window.CAPBOOK;
    const v1542 = (v1567, v1568 = 0, v1569 = Number.MAX_SAFE_INTEGER) => typeof v1567 === "number" && Number.isFinite(v1567) && v1567 >= v1568 && v1567 <= v1569 ? v1567 : null;
    const v1543 = (v1570, v1571 = 1) => v1570 > 0 && v1570 < 10 ** -v1571 ? "<" + 10 ** -v1571 : String(Number(v1570.toFixed(v1571)));
    const v1544 = v1572 => {
      const v1573 = v1572?.curveRepair;
      if (v1573?.version === 1 && v1542(v1573.estimatedMin) > 0 && Array.isArray(v1573.repairs) && v1573.repairs.length > 0 && v1573.repairs.every(v1575 => v1575?.method === "local-linear" && ["from", "to", "minutes", "estimatedAh", "lowerAh", "upperAh"].every(v1576 => v1542(v1575[v1576]) !== null) && v1575.from > 0 && v1575.to > v1575.from && v1575.minutes > 0 && v1575.estimatedAh > 0 && v1575.lowerAh <= v1575.estimatedAh && v1575.estimatedAh <= v1575.upperAh)) {
        return true;
      }
      if (!Array.isArray(v1572?.health?.repairs) || !v1572.health.repairs.length) {
        return false;
      }
      const v1574 = v1540.healthOf?.(v1572);
      return v1542(v1574?.estimatedMin) > 0 && Array.isArray(v1574?.repairs) && v1574.repairs.length > 0;
    };
    const v1545 = v1577 => {
      const v1578 = v1577?.energyRepair;
      if (v1578?.version === 1 && v1542(v1578.estimatedMin) > 0 && v1542(v1578.totalKwh) !== null) {
        return v1578;
      } else {
        return null;
      }
    };
    const v1546 = v1579 => {
      const v1580 = v1545(v1579);
      const v1581 = v1580 ? v1580.totalKwh : v1542(v1579?.kwh);
      return (v1580 ? "合计" : "实测") + " " + v1538(v1581 === null ? "—" : v1543(v1581, 3)) + " kWh";
    };
    const v1547 = v1582 => {
      if (v1545(v1582)) {
        return "<div class=\"capbook-sub\">含缺口补算，非全程实测</div>";
      }
      if (v1544(v1582)) {
        return "<div class=\"capbook-sub\">含补算参考，记录电量不含补算</div>";
      } else {
        return "";
      }
    };
    function v1548(v1583) {
      if (!v1533.current(v1583)) {
        return "";
      }
      const v1584 = v1534.data.home || {};
      if (v1584.vin !== v1583.vin || !v1584.charge?.charging) {
        return "";
      }
      const v1585 = v1540.log(v1583.vin);
      const v1586 = v1585.currentMeta;
      const v1587 = v1586?.summary && typeof v1586.summary === "object" && !Array.isArray(v1586.summary) ? v1586.summary : null;
      if (!v1587 && !v1585.pts?.length) {
        return "";
      }
      const v1588 = v1587 ? {
        ...v1587,
        curveRepair: v1586.curveRepair ?? v1587.curveRepair
      } : v1540.summarize(v1585.pts);
      if (!v1588) {
        return "";
      }
      const v1589 = v1587 ? v1542(v1588.s) : v1540.startedAt(v1585.pts) || v1585.pts[0].t;
      const v1590 = v1587 ? v1542(v1588.e, 1, Date.now()) : null;
      const v1591 = v1587 ? v1590 !== null ? "统计截至 " + v1549(v1590) + " " + v1540.fmtTime(v1590) + "，不代表最新整段" : "统计截止时间未知，不代表最新整段" : "";
      const v1592 = (v1588.soc0 ?? "—") + "% → " + (v1588.soc1 ?? "—") + "%";
      return "<section class=\"card capbook-row charge-record-card capbook-live\">\n      <div class=\"capbook-main\">\n        <div class=\"capbook-date\">" + (v1589 > 0 ? v1538(v1549(v1589)) + " " + v1538(v1540.fmtTime(v1589)) + " 起" : "开始时间未知") + "</div>\n        <div class=\"capbook-soc\">" + v1538(v1592) + " · " + v1546(v1588) + "</div>\n        <div class=\"capbook-sub\">" + (v1587 ? "记录时长" : "已充") + " " + v1538(v1536.minutes(v1588.durMin)) + "</div>\n        " + (v1591 ? "<div class=\"capbook-sub\">" + v1538(v1591) + "</div>" : "") + "\n        " + v1547(v1588) + "\n      </div>\n      <span class=\"chip ok\">充电中</span>\n    </section>";
    }
    function v1549(v1593) {
      const v1594 = new Date(v1593);
      return v1594.getMonth() + 1 + "-" + String(v1594.getDate()).padStart(2, "0");
    }
    const v1550 = v1595 => v1595?.id || (v1595 ? v1595.s + "|" + v1595.e : "");
    function v1551(v1596, v1597) {
      return "<section class=\"card capbook-row charge-record-card\" data-act=\"battsession\" data-i=\"" + v1597 + "\" title=\"查看这场充电的曲线\">\n      <div class=\"capbook-main\">\n        <div class=\"capbook-date\">" + v1538(v1549(v1596.s)) + " " + v1538(v1540.fmtTime(v1596.s)) + "</div>\n        <div class=\"capbook-soc\">" + v1538(v1533.chg.chgSocLine(v1596)) + " · " + v1546(v1596) + "</div>\n        <div class=\"capbook-sub\">" + v1538(v1536.minutes(v1596.durMin)) + "</div>\n        " + v1547(v1596) + "\n      </div>\n      <button class=\"iconbtn sm\" data-act=\"chghidesession\" data-key=\"" + v1538(v1550(v1596)) + "\" title=\"从列表移除这条\" aria-label=\"从列表移除这条充电记录\">" + v1537.icon("trash", 18) + "</button>\n      " + v1537.icon("right", 18) + "\n    </section>";
    }
    function v1552(v1598) {
      switch (v1598) {
        case "ok":
          return "已用于估算";
        case "soc-small":
          return "电量变化较小，暂未用于估算";
        case "gap":
          return "记录有缺失，暂未用于估算";
        case "no-soc":
          return "未读到电量，暂未用于估算";
        case "no-rise":
          return "电量未上涨，暂未用于估算";
        default:
          return "记录不足，暂未用于估算";
      }
    }
    function v1553(v1599) {
      const v1600 = typeof v1599 === "number" && Number.isFinite(v1599) && v1599 > 0 && v1599 <= 100 ? v1599 : null;
      if (v1600 === null) {
        return "<div class=\"soh-ring soh-none\" role=\"img\" aria-label=\"暂无法估算\"><span>—</span></div>";
      }
      const v1601 = Math.round(v1600 / 100 * 360);
      const v1602 = "约" + Math.round(v1600) + "%";
      return "<div class=\"soh-ring\" role=\"img\" aria-label=\"健康估算 " + v1602 + "\"\n      style=\"background:conic-gradient(var(--md-sys-color-primary) " + v1601 + "deg, var(--bg-inset) " + v1601 + "deg 360deg)\">\n      <i>" + v1602 + "</i>\n    </div>";
    }
    function v1554(v1603) {
      v1603 = v1603.filter(v1632 => /^\d{4}-(0[1-9]|1[0-2])$/.test(v1632?.month) && Number.isFinite(v1632.ah) && v1632.ah > 0).sort((v1633, v1634) => v1633.month.localeCompare(v1634.month));
      if (!v1603.length) {
        return "";
      }
      const v1604 = v1635 => Date.UTC(Number(v1635.slice(0, 4)), Number(v1635.slice(5, 7)) - 1, 1);
      const v1605 = v1603.map(v1636 => v1604(v1636.month));
      const v1606 = v1603.map(v1637 => v1637.ah);
      const v1607 = Math.min(...v1606);
      const v1608 = Math.max(...v1606);
      const v1609 = Math.max(0.02, (v1608 - v1607) * 0.2);
      const v1610 = v1607 - v1609;
      const v1611 = v1608 + v1609;
      const v1612 = 320;
      const v1613 = 64;
      const v1614 = 6;
      const v1615 = 6;
      const v1616 = 8;
      const v1617 = 16;
      const v1618 = v1612 - v1614 - v1615;
      const v1619 = v1613 - v1616 - v1617;
      const v1620 = v1638 => v1614 + (v1603.length === 1 || v1605[v1605.length - 1] === v1605[0] ? v1618 / 2 : (v1605[v1638] - v1605[0]) / (v1605[v1605.length - 1] - v1605[0]) * v1618);
      const v1621 = v1639 => v1616 + (1 - (v1639 - v1610) / Math.max(0.000001, v1611 - v1610)) * v1619;
      const v1622 = v1640 => v1620(v1640).toFixed(1) + " " + v1621(v1603[v1640].ah).toFixed(1);
      const v1623 = v1641 => Number(v1641.slice(0, 4)) * 12 + Number(v1641.slice(5, 7)) - 1;
      const v1624 = [];
      const v1625 = [];
      for (let v1642 = 1; v1642 < v1603.length; v1642++) {
        const v1643 = "M" + v1622(v1642 - 1) + " L" + v1622(v1642);
        (v1623(v1603[v1642].month) - v1623(v1603[v1642 - 1].month) === 1 ? v1624 : v1625).push(v1643);
      }
      const v1626 = (v1624.length ? "<path class=\"line\" d=\"" + v1624.join(" ") + "\"/>" : "") + (v1625.length ? "<path class=\"gap-line\" d=\"" + v1625.join(" ") + "\"><title>缺月连接，仅示意，不补算</title></path>" : "");
      const v1627 = v1603.map((v1644, v1645) => {
        const v1646 = v1645 ? (v1620(v1645 - 1) + v1620(v1645)) / 2 : v1614;
        const v1647 = v1645 === v1603.length - 1 ? v1612 - v1615 : (v1620(v1645) + v1620(v1645 + 1)) / 2;
        return "<rect class=\"hit\" data-x=\"" + v1620(v1645).toFixed(1) + "\" data-y=\"" + v1621(v1644.ah).toFixed(1) + "\" x=\"" + v1646.toFixed(1) + "\" y=\"" + v1616 + "\" width=\"" + (v1647 - v1646).toFixed(1) + "\" height=\"" + v1619 + "\" fill=\"transparent\" pointer-events=\"all\"><title>" + v1538(v1644.month) + " · " + v1538(String(v1644.ah)) + " Ah · " + v1538(String(v1644.n)) + " 场</title></rect>";
      }).join("");
      const v1628 = 26;
      const v1629 = v1603.length - 1;
      const v1630 = Math.max(1, Math.ceil(v1603.length * v1628 / v1618));
      const v1631 = v1603.map((v1648, v1649) => {
        if (v1649 !== 0 && v1649 !== v1629 && (v1649 % v1630 !== 0 || v1620(v1649) - v1620(0) < v1628 * 1.5 || v1620(v1629) - v1620(v1649) < v1628 * 1.5)) {
          return "";
        }
        const v1650 = v1629 === 0 ? "middle" : v1649 === 0 ? "start" : v1649 === v1629 ? "end" : "middle";
        return "<text x=\"" + v1620(v1649).toFixed(1) + "\" y=\"" + (v1613 - 3) + "\" text-anchor=\"" + v1650 + "\">" + v1538(v1648.month.slice(2)) + "</text>";
      }).join("");
      return "<div class=\"capbook-trend-wrap\" style=\"position:relative\"><svg class=\"capbook-trend\" viewBox=\"0 0 " + v1612 + " " + v1613 + "\" role=\"img\" aria-label=\"按月充电容量参考，单位Ah\">\n      " + v1626 + v1631 + v1627 + "\n      <circle class=\"probe-d\" cx=\"0\" cy=\"0\" r=\"3.2\" style=\"opacity:0\"/>\n    </svg><div class=\"probe-tip\" hidden></div></div>";
    }
    function v1555(v1651, v1652) {
      const v1653 = v1651.querySelector(".capbook-trend");
      if (!v1653) {
        return;
      }
      const v1654 = [...v1653.querySelectorAll(".hit")];
      const v1655 = v1653.querySelector(".probe-d");
      const v1656 = v1653.parentElement.querySelector(".probe-tip");
      if (!v1654.length || !v1655 || !v1656) {
        return;
      }
      const v1657 = () => {
        v1655.style.opacity = "0";
        v1656.hidden = true;
      };
      const v1658 = v1659 => {
        if (!v1652()) {
          v1657();
          return;
        }
        const v1660 = v1653.getBoundingClientRect();
        if (!v1660.width) {
          return;
        }
        const v1661 = (v1659.clientX - v1660.left) / v1660.width * 320;
        const v1662 = v1654.reduce((v1664, v1665) => Math.abs(Number(v1665.dataset.x) - v1661) < Math.abs(Number(v1664.dataset.x) - v1661) ? v1665 : v1664);
        v1655.setAttribute("cx", v1662.dataset.x);
        v1655.setAttribute("cy", v1662.dataset.y);
        v1655.style.opacity = "1";
        v1656.textContent = v1662.querySelector("title").textContent;
        v1656.hidden = false;
        const v1663 = v1656.offsetWidth || 90;
        v1656.style.left = Math.max(4, Math.min(v1660.width - v1663 - 4, Number(v1662.dataset.x) / 320 * v1660.width - v1663 / 2)) + "px";
        v1656.style.top = Math.max(2, Number(v1662.dataset.y) / 64 * v1660.height - 30) + "px";
      };
      v1653.style.touchAction = "pan-y";
      v1653.addEventListener("pointerdown", v1666 => {
        try {
          v1653.setPointerCapture(v1666.pointerId);
        } catch {}
        v1658(v1666);
      });
      v1653.addEventListener("pointermove", v1667 => {
        if (v1667.pointerType === "mouse" || v1667.buttons) {
          v1658(v1667);
        }
      });
      v1653.addEventListener("mousemove", v1658);
      v1653.addEventListener("pointerup", v1657);
      v1653.addEventListener("pointercancel", v1657);
      v1653.addEventListener("mouseleave", v1657);
      v1653.addEventListener("pointerleave", v1657);
    }
    function v1556(v1668) {
      if (v1668 === "static") {
        return "静置推断";
      } else if (v1668 === "low-load") {
        return "低负载参考";
      } else if (v1668 === "mixed") {
        return "静置 + 动态";
      } else {
        return "动态参考";
      }
    }
    function v1557(v1669) {
      const v1670 = Array.isArray(v1669?.curve) ? v1669.curve.filter(v1692 => Number.isFinite(v1692?.fitV ?? v1692?.v) && Number.isFinite(v1692?.soc)) : [];
      if (v1670.length < 2) {
        return "<div class=\"chg-empty\">有效电压点还不够画出曲线</div>";
      }
      const v1671 = 320;
      const v1672 = 178;
      const v1673 = 44;
      const v1674 = 12;
      const v1675 = 12;
      const v1676 = 30;
      const v1677 = v1671 - v1673 - v1674;
      const v1678 = v1672 - v1675 - v1676;
      const v1679 = v1670.map(v1693 => v1693.fitV ?? v1693.v);
      const v1680 = Math.min(...v1679);
      const v1681 = Math.max(...v1679);
      const v1682 = Math.max(0.5, (v1681 - v1680) * 0.12);
      const v1683 = v1680 - v1682;
      const v1684 = v1681 + v1682;
      const v1685 = v1694 => v1673 + (v1694 - v1683) / Math.max(0.001, v1684 - v1683) * v1677;
      const v1686 = v1695 => v1675 + (1 - v1695 / 100) * v1678;
      const v1687 = (() => {
        const v1696 = v1670.map(v1700 => [v1685(v1700.fitV ?? v1700.v), v1686(v1700.soc)]);
        if (v1696.length < 2) {
          return "";
        }
        const v1697 = v1701 => (Math.round(v1701 * 10) / 10).toFixed(1);
        if (v1696.length === 2) {
          return "M" + v1697(v1696[0][0]) + " " + v1697(v1696[0][1]) + " L" + v1697(v1696[1][0]) + " " + v1697(v1696[1][1]);
        }
        const v1698 = 1 / 6;
        let v1699 = "M" + v1697(v1696[0][0]) + " " + v1697(v1696[0][1]);
        for (let v1702 = 0; v1702 < v1696.length - 1; v1702++) {
          const v1703 = v1696[v1702 - 1] || v1696[v1702];
          const v1704 = v1696[v1702];
          const v1705 = v1696[v1702 + 1];
          const v1706 = v1696[v1702 + 2] || v1696[v1702 + 1];
          const v1707 = Math.min(v1704[0], v1705[0]);
          const v1708 = Math.max(v1704[0], v1705[0]);
          const v1709 = Math.min(v1704[1], v1705[1]);
          const v1710 = Math.max(v1704[1], v1705[1]);
          let v1711 = Math.max(v1707, Math.min(v1708, v1704[0] + (v1705[0] - v1703[0]) * v1698));
          let v1712 = Math.max(v1707, Math.min(v1708, v1705[0] - (v1706[0] - v1704[0]) * v1698));
          let v1713 = Math.max(v1709, Math.min(v1710, v1704[1] + (v1705[1] - v1703[1]) * v1698));
          let v1714 = Math.max(v1709, Math.min(v1710, v1705[1] - (v1706[1] - v1704[1]) * v1698));
          const v1715 = v1705[0] - v1704[0];
          const v1716 = v1705[1] - v1704[1];
          const v1717 = Math.abs((v1711 - v1704[0]) * v1716 - (v1713 - v1704[1]) * v1715) < 0.000001 && Math.abs((v1712 - v1704[0]) * v1716 - (v1714 - v1704[1]) * v1715) < 0.000001;
          if (!v1717) {
            const v1718 = (v1711 - v1704[0]) * v1715 + (v1713 - v1704[1]) * v1716;
            const v1719 = (v1712 - v1705[0]) * v1715 + (v1714 - v1705[1]) * v1716;
            if (v1718 < 0 || v1719 > 0) {
              v1711 = v1704[0] + v1715 / 3;
              v1713 = v1704[1] + v1716 / 3;
              v1712 = v1705[0] - v1715 / 3;
              v1714 = v1705[1] - v1716 / 3;
            }
          }
          v1699 += " C" + v1697(v1711) + " " + v1697(v1713) + " " + v1697(v1712) + " " + v1697(v1714) + " " + v1697(v1696[v1702 + 1][0]) + " " + v1697(v1696[v1702 + 1][1]);
        }
        return v1699;
      })();
      const v1688 = v1687;
      const v1689 = [0, 50, 100].map(v1720 => "<line class=\"g\" x1=\"" + v1673 + "\" y1=\"" + v1686(v1720).toFixed(1) + "\" x2=\"" + (v1671 - v1674) + "\" y2=\"" + v1686(v1720).toFixed(1) + "\"/><text x=\"" + (v1673 - 6) + "\" y=\"" + (v1686(v1720) + 3.2).toFixed(1) + "\" text-anchor=\"end\">" + v1720 + "%</text>").join("");
      const v1690 = v1670.map((v1721, v1722) => "<circle class=\"ocv-dot " + (v1721.source === "static" ? "static" : "dynamic") + "\" data-i=\"" + v1722 + "\" cx=\"" + v1685(v1721.fitV ?? v1721.v).toFixed(1) + "\" cy=\"" + v1686(v1721.soc).toFixed(1) + "\" r=\"3\"/>").join("");
      const v1691 = v1670.map(v1723 => ({
        soc: v1723.soc,
        v: v1723.fitV ?? v1723.v,
        cellV: v1723.fitCellV ?? v1723.cellV,
        source: v1723.source,
        n: v1723.n,
        staticN: v1723.staticN,
        dynamicN: v1723.dynamicN
      }));
      return "<div class=\"ocv-wrap\" data-ocv='" + v1538(JSON.stringify(v1691)) + "' data-vb=\"" + v1671 + " " + v1672 + "\" data-box=\"" + v1673 + " " + v1675 + " " + v1677 + " " + v1678 + "\" data-xbox=\"" + v1683 + " " + v1684 + "\">\n      <svg class=\"ocv-svg\" viewBox=\"0 0 " + v1671 + " " + v1672 + "\" role=\"img\" aria-label=\"电量 OCV 估算曲线\">\n        " + v1689 + "<path class=\"ocv-line\" d=\"" + v1688 + "\"/>" + v1690 + "\n        <text x=\"" + v1673 + "\" y=\"" + (v1672 - 8) + "\" text-anchor=\"start\">" + v1683.toFixed(1) + " V</text>\n        <text x=\"" + (v1671 - v1674) + "\" y=\"" + (v1672 - 8) + "\" text-anchor=\"end\">" + v1684.toFixed(1) + " V</text>\n        <line class=\"probe-v\" x1=\"0\" y1=\"" + v1675 + "\" x2=\"0\" y2=\"" + (v1675 + v1678) + "\" style=\"opacity:0\"/><circle class=\"probe-d\" cx=\"0\" cy=\"0\" r=\"4\" style=\"opacity:0\"/>\n      </svg><div class=\"probe-tip\" hidden></div>\n      <div class=\"ocv-legend\"><span><i class=\"static\"></i>静置推断</span><span><i class=\"dynamic\"></i>动态参考</span></div>\n    </div>";
    }
    function v1558(v1724, v1725) {
      const v1726 = v1724.querySelector(".ocv-wrap");
      const v1727 = v1726?.querySelector(".ocv-svg");
      if (!v1726 || !v1727) {
        return;
      }
      let v1728 = [];
      try {
        v1728 = JSON.parse(v1726.dataset.ocv || "[]");
      } catch {
        return;
      }
      if (!v1728.length) {
        return;
      }
      const [v1729, v1730] = v1726.dataset.vb.split(" ").map(Number);
      const [v1731, v1732, v1733, v1734] = v1726.dataset.box.split(" ").map(Number);
      const [v1735, v1736] = v1726.dataset.xbox.split(" ").map(Number);
      const v1737 = v1727.querySelector(".probe-v");
      const v1738 = v1727.querySelector(".probe-d");
      const v1739 = v1726.querySelector(".probe-tip");
      const v1740 = () => {
        v1737.style.opacity = "0";
        v1738.style.opacity = "0";
        v1739.hidden = true;
      };
      const v1741 = v1742 => {
        if (!v1725()) {
          return v1740();
        }
        const v1743 = v1727.getBoundingClientRect();
        if (!v1743.width) {
          return;
        }
        const v1744 = Math.max(v1731, Math.min(v1731 + v1733, (v1742 - v1743.left) / v1743.width * v1729));
        const v1745 = v1735 + (v1744 - v1731) / v1733 * (v1736 - v1735);
        const v1746 = v1728.reduce((v1750, v1751) => Math.abs(v1751.v - v1745) < Math.abs(v1750.v - v1745) ? v1751 : v1750, v1728[0]);
        const v1747 = v1731 + (v1746.v - v1735) / Math.max(0.001, v1736 - v1735) * v1733;
        const v1748 = v1732 + (1 - v1746.soc / 100) * v1734;
        v1737.setAttribute("x1", v1747.toFixed(1));
        v1737.setAttribute("x2", v1747.toFixed(1));
        v1737.style.opacity = "1";
        v1738.setAttribute("cx", v1747.toFixed(1));
        v1738.setAttribute("cy", v1748.toFixed(1));
        v1738.style.opacity = "1";
        v1739.textContent = v1746.soc + "% · " + v1746.v.toFixed(1) + " V" + (Number.isFinite(v1746.cellV) ? " · " + v1746.cellV.toFixed(3) + " V/串" : "") + " · " + v1556(v1746.source) + " · " + v1746.n + " 点";
        v1739.hidden = false;
        const v1749 = v1739.offsetWidth || 120;
        v1739.style.left = Math.max(4, Math.min(v1743.width - v1749 - 4, v1747 / v1729 * v1743.width - v1749 / 2)) + "px";
        v1739.style.top = Math.max(2, v1748 / v1730 * v1743.height - 30) + "px";
      };
      v1727.style.touchAction = "pan-y";
      v1727.addEventListener("pointerdown", v1752 => {
        try {
          v1727.setPointerCapture(v1752.pointerId);
        } catch {}
        v1741(v1752.clientX);
      });
      v1727.addEventListener("pointermove", v1753 => {
        if (v1753.buttons || v1753.pointerType === "mouse") {
          v1741(v1753.clientX);
        }
      });
      v1727.addEventListener("mousemove", v1754 => v1741(v1754.clientX));
      v1727.addEventListener("pointerup", () => setTimeout(v1740, 1500));
      v1727.addEventListener("pointercancel", v1740);
      v1727.addEventListener("mouseleave", v1740);
    }
    function v1559(v1755, v1756) {
      if (v1533.isIOS?.()) {
        return "";
      }
      const v1757 = Number.isInteger(v1756?.series) && v1756.series > 0 ? v1756.series : null;
      const v1758 = v1539.source === "demo" ? {
        data: window.OCV?.demo?.(v1757) || null
      } : v1533.shell?.loadBattOcv?.() || {
        data: null,
        unavailable: true
      };
      const v1759 = v1758.data;
      const v1760 = !!v1759?.degraded || !!v1759?.metadata?.degraded;
      const v1761 = v1759?.truncated === true || v1759?.metadata?.truncated === true;
      const v1762 = v1539.source === "demo" ? v1759 : v1759?.points ? window.OCV?.estimate?.(v1759.points, v1757, {
        truncated: v1761,
        degraded: v1760
      }) || null : null;
      const v1763 = !v1762 && v1758.pending;
      const v1764 = v1762 ? v1762.status : v1763 ? "正在读取电压历史…" : v1758.unavailable ? "需要 App 电量历史" : v1760 ? "历史采样读取受限" : "还没有足够样本";
      const v1765 = v1759?.metadata?.sampling === "foreground-only" || v1759?.metadata?.backgroundPolling === false;
      const v1766 = !v1757 ? "填写电芯串数可显示单体电压。" : !v1762 && v1765 ? "需要在不同电量时打开 App 积累电压点。" : !v1762 ? "继续积累不同电量下的电压点。" : "";
      const v1767 = v1760 ? v1759?.message || "部分历史读不出来，曲线仅作参考。" : v1761 ? "点数较多已抽样，曲线仅作参考。" : "";
      return "<section class=\"card mt12 ocv-card\">\n      " + v1537.cardHead("电池 OCV 估算", "电量 ↔ 总电压 · 近 31 天采样", "", "chart") + "\n      " + (v1763 ? "<div class=\"batt-wrap mt12\"><div class=\"sk\" style=\"height:178px;border-radius:12px\"></div></div>" : v1762 ? v1557(v1762) : "<div class=\"chg-empty mt12\">" + v1538(v1764) + "</div>") + "\n      " + (v1762 ? "<div class=\"ocv-meta\"><span>" + v1538(v1764) + "</span><span>" + v1762.staticPoints + " 静置 · " + v1762.dynamicPoints + " 动态</span></div>" : "") + "\n      " + (v1767 ? "<div class=\"card-sub mt8\" role=\"status\">" + v1538(v1767) + "</div>" : "") + "\n      " + (v1766 ? "<div class=\"card-sub mt8\">" + v1538(v1766) + "</div>" : "") + "\n    </section>";
    }
    const v1560 = new WeakMap();
    function v1561({
      handle: v1768,
      scope = v1533.context()
    } = {}) {
      if (!v1533.current(scope) || v1768 !== undefined && !v1537.sheetAlive(v1768)) {
        return null;
      }
      let v1769 = v1768 ?? v1537.currentSheet?.("battdetail");
      let v1770 = v1769 && v1560.get(v1769);
      if (v1770 && (!v1533.current(v1770.scope) || v1770.disposed)) {
        return null;
      }
      if (!v1770) {
        v1770 = {
          scope: scope,
          disposed: false
        };
      }
      const v1771 = v1534.data.home || {};
      const v1772 = v1534.vehicles.find(v1789 => v1789.vin === scope.vin);
      const v1773 = v1540.history(scope.vin);
      const v1774 = v1540.capacity(scope.vin);
      const v1775 = v1541.nominal(scope.vin, v1772?.type || v1771.type);
      const v1776 = v1533.mem?.chargeHistoryState?.vin === scope.vin ? v1533.mem.chargeHistoryState : {};
      const v1777 = !!v1776.pending || !!v1776.clearing;
      const v1778 = v1776.error || (v1776.clearing ? "正在清理充电记录…" : v1776.pending ? "正在读取后台记录…" : "");
      const v1779 = typeof v1533.chg.historyNotice === "function" ? v1533.chg.historyNotice(scope) : v1778 ? "<div class=\"card-sub mt8\" role=\"status\">" + v1538(v1778) + "</div>" : "";
      const v1780 = "<section class=\"card\">\n      " + v1537.cardHead("电池健康", "根据历史充电记录推测得出，结果仅供参考", "", "battery") + "\n      " + v1565(v1774, v1775) + "\n    </section>";
      const v1781 = v1559(scope, v1775);
      const v1782 = (() => {
        const v1790 = v1533.shell?.BATT_RANGES || [["24h", "24小时"], ["3d", "3天"], ["7d", "7天"], ["30d", "30天"]];
        const v1791 = v1533.shell?.loadBattHistory?.(v1534.battRange) || null;
        const v1792 = v1791?.data || {};
        const v1793 = v1790.map(([v1795, v1796]) => "<button class=\"seg-btn" + (v1534.battRange === v1795 ? " on" : "") + "\" data-act=\"battdetailrange\" data-v=\"" + v1795 + "\" aria-pressed=\"" + (v1534.battRange === v1795) + "\">" + v1796 + "</button>").join("");
        const v1794 = v1533.shell?.battChart?.(v1792, v1791?.pending) || "<div class=\"chg-empty\">当前客户端没有电量历史</div>";
        return "<section class=\"card mt12 battery-detail-history\" data-battery-history-section>\n        " + v1537.cardHead("电量历史", "充电、放电与静置采样", "", "chart") + "\n        <div class=\"seg-tabs\" role=\"group\" aria-label=\"电量历史范围\">" + v1793 + "</div>\n        " + v1794 + "\n      </section>";
      })();
      const v1783 = v1773.map((v1797, v1798) => v1551(v1797, v1798)).join("");
      const v1784 = Number(v1540.hiddenCount?.(scope.vin)) || 0;
      const v1785 = "<section class=\"mt12 battery-detail-charge\">\n      " + v1537.cardHead("充电记录", "最近 " + v1773.length + " 次", "", "plug") + "\n      <div class=\"charge-record-list\">\n        " + v1548(scope) + "\n        " + (v1783 || (v1777 ? "" : "<div class=\"chg-empty\">" + (v1776.error ? "充电记录暂不可用" : "还没有已结束的充电记录") + "</div>")) + "\n      </div>\n      <div class=\"battery-detail-charge-actions\">\n        " + (v1773.length ? "<button class=\"btn tonal sm\" data-act=\"chghistclear\"" + (v1777 ? " disabled" : "") + ">清空充电记录</button>" : "") + "\n        " + (v1784 ? "<button class=\"btn tonal sm\" data-act=\"chghidden\">已隐藏的记录（" + v1784 + "条）</button>" : "") + "\n      </div>\n    </section>";
      const v1786 = v1539.source === "demo" ? "<div class=\"note info mb12\">" + v1537.icon("info", 18) + "<div>当前为演示数据，不代表真实电池状况。</div></div>" : "";
      const v1787 = () => !v1770.disposed && v1533.current(v1770.scope) && v1533.current(scope) && v1537.sheetAlive(v1769);
      const v1788 = {
        key: "battdetail",
        full: true,
        title: "电池详情",
        sub: v1772?.name || v1771.name || "当前车辆",
        headActions: "<button class=\"iconbtn\" data-act=\"battnominal\" title=\"电池设置\" aria-label=\"电池设置\">" + v1537.icon("gear", 20) + "</button>",
        body: "" + v1786 + v1779 + v1780 + v1782 + v1781 + v1785 + "<div style=\"height:8px\"></div>",
        onMount: v1799 => {
          if (v1770.disposed || !v1533.current(v1770.scope) || !v1533.current(scope)) {
            return;
          }
          v1558(v1799, v1787);
          const v1800 = v1799.querySelector("[data-battery-history-section]");
          if (v1800 && v1770.chartNode !== v1800) {
            v1770.chartNode = v1800;
            v1562(v1800, v1787);
          }
        },
        onDismiss: () => {
          v1770.disposed = true;
          v1770.chartNode = null;
          if (v1769) {
            v1560.delete(v1769);
          }
        }
      };
      if (v1769) {
        if (!v1537.sheetAlive(v1769) || !v1537.updateSheet(v1769, v1788)) {
          return null;
        }
      } else {
        v1769 = v1537.sheet(v1535(), v1788);
      }
      if (!v1769) {
        return null;
      }
      v1560.set(v1769, v1770);
      v1533.chg.registerLive?.("battdetail", v1769, scope);
      return v1769;
    }
    function v1562(v1801, v1802) {
      if (typeof v1533.shell?.mountBattTouch === "function") {
        v1533.shell.mountBattTouch(v1801, v1802);
        return;
      }
    }
    function v1563(v1803) {
      if (!v1803?.length) {
        return "积累充电记录后再查看。";
      }
      const v1804 = v1803.map(v1805 => v1805.health?.why || v1805.capWhy);
      if (v1804.some(v1806 => v1806 === "gap")) {
        return "记录有缺失，暂不估算。";
      }
      if (v1804.every(v1807 => v1807 === "soc-small")) {
        return "电量变化较小，暂不估算。";
      }
      if (v1804.some(v1808 => v1808 === "no-soc")) {
        return "缺少电量读数，等待后续记录。";
      }
      return "记录不足，继续正常使用后再查看。";
    }
    function v1564(v1809) {
      v1533.chg.chargeSessionSheet(v1809);
    }
    function v1565(v1810, v1811, {
      wrap = true
    } = {}) {
      const v1812 = v1541.healthEstimate?.(v1810, v1811);
      const v1813 = v1812?.reason === "estimate" && Number.isFinite(v1812.percent) ? Math.round(v1812.percent * 10) / 10 + "%" : "—";
      const v1814 = Number.isFinite(v1810?.ah) && v1810.ah > 0 ? v1810.ah : null;
      const v1815 = v1537.stat("健康度", v1813, "", "", {
        fit: true
      }) + v1537.stat("预估容量", v1814 ?? "—", v1814 === null ? "" : "Ah", "", {
        fit: true
      });
      if (wrap) {
        return "<div class=\"batt-summary batt-summary-card battery-health-summary\">" + v1815 + "</div>";
      } else {
        return v1815;
      }
    }
    function v1566(v1816, v1817) {
      if (v1817?.src !== "manual") {
        return "";
      }
      const v1818 = v1541.healthEstimate?.(v1816, v1817);
      const v1819 = v1818?.reason === "estimate" && Number.isFinite(v1818.percent) ? v1818.percent : null;
      const v1820 = typeof v1816?.ah === "number" && Number.isFinite(v1816.ah) && v1816.ah > 0 ? v1816.ah : null;
      if (v1819 === null || v1820 === null) {
        return "";
      }
      return v1565(v1816, v1817, {
        wrap: false
      });
    }
    window.APP.batterydetail = {
      healthSummary: v1565,
      healthPair: v1566,
      batteryDetailSheet: v1561,
      sessionSheet: v1564,
      capWhyShort: v1552,
      chgDay: v1549,
      sohRing: v1553,
      trendChart: v1554,
      liveRow: v1548,
      sessionRow: v1551,
      capGapText: v1563
    };
  })();
})();
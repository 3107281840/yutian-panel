(() => {
  window.UIDQR = (() => {
    'use strict';

    function v1(v5) {
      const v6 = String(v5 || "").trim();
      if (!v6) {
        return null;
      }
      const v7 = v6.includes("?") ? v6.slice(v6.indexOf("?") + 1).split("#")[0] : v6;
      let v8 = "";
      try {
        const v10 = new URLSearchParams(v7);
        v8 = v10.get("userId") || v10.get("user_id") || v10.get("uid") || "";
      } catch {
        const v11 = v7.match(/(?:user_?id|uid)=([^&#\s]+)/i);
        if (v11) {
          v8 = v11[1];
        }
      }
      const v9 = v2(v8);
      if (v9) {
        return {
          uid: v9,
          source: "query"
        };
      }
      if (/^\d{5,24}$/.test(v6)) {
        return {
          uid: v6,
          source: "plain"
        };
      }
      return null;
    }
    function v2(v12) {
      let v13 = String(v12 || "").trim();
      if (!v13) {
        return "";
      }
      try {
        v13 = decodeURIComponent(v13);
      } catch {}
      v13 = v13.trim();
      if (!v13) {
        return "";
      }
      if (/^[A-Za-z0-9+/]+={0,2}$/.test(v13)) {
        try {
          const v14 = atob(v13);
          if (/^\d{5,24}$/.test(v14)) {
            return v14;
          }
        } catch {}
      }
      if (/^\d{5,24}$/.test(v13)) {
        return v13;
      } else {
        return "";
      }
    }
    function v3(v15) {
      if (!v15) {
        return Promise.resolve("");
      }
      const v16 = window.jsQR;
      if (!v16) {
        return Promise.reject(new Error("解码库未就绪"));
      }
      return v4(v15).then(v17 => new Promise((v18, v19) => {
        const v20 = new Image();
        v20.onload = () => {
          try {
            const v21 = 1500;
            const v22 = Math.min(1, v21 / Math.max(v20.width, v20.height));
            const v23 = Math.max(64, Math.round(v20.width * v22));
            const v24 = Math.max(64, Math.round(v20.height * v22));
            const v25 = document.createElement("canvas");
            v25.width = v23;
            v25.height = v24;
            const v26 = v25.getContext("2d", {
              willReadFrequently: true
            });
            for (const v27 of [v22, v22 * 0.6, Math.min(2.5, v22 * 1.6)]) {
              const v28 = Math.max(64, Math.round(v20.width * v27));
              const v29 = Math.max(64, Math.round(v20.height * v27));
              v25.width = v28;
              v25.height = v29;
              v26.drawImage(v20, 0, 0, v28, v29);
              const v30 = v26.getImageData(0, 0, v28, v29);
              const v31 = v16(v30.data, v28, v29);
              if (v31 && v31.data) {
                v18(v31.data);
                return;
              }
            }
            v18("");
          } catch (v32) {
            v19(v32);
          }
        };
        v20.onerror = () => v19(new Error("图片读不出来"));
        v20.src = v17;
      }));
    }
    function v4(v33) {
      return new Promise((v34, v35) => {
        const v36 = new FileReader();
        v36.onload = () => v34(String(v36.result || ""));
        v36.onerror = () => v35(new Error("图片读不出来"));
        v36.readAsDataURL(v33);
      });
    }
    return {
      extract: v1,
      decodeUserId: v2,
      decodeImage: v3
    };
  })();
  window.API = {
    _source: "demo",
    get source() {
      if (this.isPreview()) {
        return "demo";
      } else {
        return this._source;
      }
    },
    set source(v37) {
      this._source = this.isPreview() ? "demo" : v37;
    },
    isPreview() {
      return window.__zeehoWebPreview === true || window.Store?.isPreview?.() === true;
    },
    forcePreview() {
      this.token = "";
      this._source = "demo";
      this.authFailed = null;
      this.gen++;
      this.accountGen++;
      this._inflight.clear();
      return "demo";
    },
    previewFailure(v38 = "此操作") {
      return {
        ok: false,
        source: "demo",
        unavailable: true,
        code: "unavailable",
        data: null,
        message: window.PLATFORM?.message?.(v38) || v38 + " unavailable：纯 UI 测试预览不会执行真实操作。"
      };
    },
    transport: "native",
    ready: false,
    token: "",
    gen: 0,
    accountGen: 0,
    lastRaw: {},
    _inflight: new Map(),
    _retired: false,
    isCurrent() {
      return !this._retired && (this.isPreview() || !window.IOSBR?.candidate?.() || window.IOSBR.isCurrent()) && (!!window.ZeehoShell || window.IOSBR?.available?.() || !window.__zeehoMigrationQuiet && !window.__zeehoMigration) && window.APP?.domainMigration?.canPersist?.() !== false;
    },
    retire() {
      if (this._retired) {
        return;
      }
      this._retired = true;
      this.gen++;
      this.accountGen++;
      this._inflight.clear();
    },
    retiredError() {
      const v39 = new Error("当前页面已退出，停止旧请求");
      v39.name = "TaskCancelled";
      return v39;
    },
    onSourceChange: null,
    authFailed: null,
    onAuthFail: null,
    vehicleToken: null,
    onOwnerAuthFail: null,
    async fetchT(v40, v41 = {}, v42 = null) {
      if (!this.isCurrent()) {
        throw this.retiredError();
      }
      if (this.isPreview()) {
        const v47 = new Error(this.previewFailure("业务请求").message);
        v47.name = "TxnError";
        v47.txnErr = "unavailable";
        throw v47;
      }
      const v43 = 20000;
      if (!window.TXN?.available?.()) {
        const v48 = new Error("原生请求能力 unavailable，请在支持请求桥的 Android / iOS App 中使用");
        v48.name = "TxnError";
        v48.txnErr = "bridge";
        throw v48;
      }
      this.transport = "native";
      const v44 = await window.TXN.send({
        url: v40,
        method: v41.method || "GET",
        headers: v41.headers || {},
        body: v41.body === undefined ? null : v41.body,
        timeoutMs: v43,
        signal: v41.signal
      });
      if (!this.isCurrent()) {
        throw this.retiredError();
      }
      if (v44.http === 0) {
        const v49 = new Error(v44.message || v44.err || "App 代发失败");
        v49.name = v44.err === "timeout" ? "TimeoutError" : "TxnError";
        v49.txnErr = v44.err;
        throw v49;
      }
      const v45 = {
        http: v44.http,
        status: v44.http,
        ok: v44.http >= 200 && v44.http < 300,
        text: async () => v44.text,
        body: v44.text
      };
      const v46 = v42 ? await v42(v45) : v45;
      if (!this.isCurrent()) {
        throw this.retiredError();
      }
      return v46;
    },
    demoForced() {
      if (this.isPreview()) {
        return true;
      }
      try {
        return localStorage.getItem("zeeho.demo") === "1";
      } catch {
        return false;
      }
    },
    async init(v50) {
      if (!this.isCurrent()) {
        return this.source;
      }
      if (this.isPreview()) {
        this.token = "";
        this.source = "demo";
        this.ready = true;
        return "demo";
      }
      const v51 = window.ACC?.avail?.() && window.ACC.ready?.() ? window.ACC.active() : null;
      this.token = v51 ? v51.token : this.loadToken();
      if (v50) {
        this.source = v50;
      } else if (this.demoForced() && !v51) {
        this.source = "demo";
      } else {
        this.source = this.token ? "direct" : "demo";
      }
      this.ready = true;
      return this.source;
    },
    loadToken() {
      if (this.isPreview()) {
        return "";
      }
      try {
        return (window.Store ? window.Store.get("zeeho.token") : localStorage.getItem("zeeho.token")) || "";
      } catch {
        return "";
      }
    },
    saveToken(v52, {
      persist = true
    } = {}) {
      if (!this.isCurrent()) {
        throw this.retiredError();
      }
      if (this.isPreview()) {
        this.token = "";
        this.source = "demo";
        window.PLATFORM?.unavailable?.("保存登录凭据");
        const v54 = new Error(this.previewFailure("保存登录凭据").message);
        v54.code = "unavailable";
        throw v54;
      }
      const v53 = String(v52 || "").trim().replace(/^bearer\s+/i, "");
      if (persist && window.Store && window.Store.requiresAsync?.()) {
        const v55 = {
          gen: this.gen,
          accountGen: this.accountGen,
          source: this.source,
          token: this.token
        };
        return window.Store.commitAsync(v53 ? {
          puts: {
            "zeeho.token": v53
          }
        } : {
          puts: {
            "zeeho.session.cleared.v1": "1"
          },
          removes: ["zeeho.token", "zeeho.session.v1"]
        }).then(v56 => {
          if (!v56) {
            throw new Error("登录凭据未能保存，请检查存储后重试。");
          }
          if (!this.isCurrent()) {
            throw this.retiredError();
          }
          if (this.gen !== v55.gen || this.accountGen !== v55.accountGen || this.source !== v55.source || this.token !== v55.token) {
            throw this.retiredError();
          }
          return this.saveToken(v53, {
            persist: false
          });
        });
      }
      if (persist && window.Store) {
        const v57 = window.Store.commit(v53 ? {
          puts: {
            "zeeho.token": v53
          }
        } : {
          puts: {
            "zeeho.session.cleared.v1": "1"
          },
          removes: ["zeeho.token", "zeeho.session.v1"]
        });
        if (!v57) {
          throw new Error("登录凭据未能保存，请检查存储后重试。");
        }
      } else if (persist) {
        if (window.IOSBR?.candidate?.()) {
          throw new Error("iOS 私有存储不可用，凭据未保存。");
        }
        if (v53) {
          localStorage.setItem("zeeho.token", v53);
        } else {
          localStorage.removeItem("zeeho.token");
        }
      }
      this.authFailed = null;
      this.gen++;
      this.accountGen++;
      this._inflight.clear();
      this.token = v53;
      this.source = v53 ? "direct" : "demo";
      if (v53) {
        try {
          localStorage.removeItem("zeeho.demo");
        } catch {}
      }
      return v53;
    },
    async setSource(v58) {
      if (!this.isCurrent()) {
        return;
      }
      this.source = this.isPreview() ? "demo" : v58;
      v58 = this.source;
      this.ready = true;
      this.gen++;
      this.accountGen++;
      this._inflight.clear();
      if (this.onSourceChange) {
        this.onSourceChange(v58);
      }
    },
    setTransport(v59) {
      if (!this.isCurrent()) {
        return this.transport;
      }
      this.transport = "native";
      return this.transport;
    },
    ep(v60) {
      return window.ZEEHO_EP.list.find(v61 => v61.id === v60) || null;
    },
    diagScope(v62 = null, {
      publicRequest = false,
      explicit = false
    } = {}) {
      if (publicRequest) {
        return {
          account: "预登录",
          accountId: "",
          noncurrent: false
        };
      }
      try {
        const v63 = window.ACC;
        if (v63?.avail?.() && v63.ready?.()) {
          const v64 = v62 ? v63.byId?.(v62.id) || v62 : explicit ? null : v63.active();
          const v65 = String(v62?.id ?? v64?.id ?? "");
          return {
            account: String(v62?.label || v64 && v63.labelOf?.(v64) || v65 || "指定账号（未标识）"),
            accountId: v65,
            noncurrent: v65 ? v65 !== v63.activeId?.() : explicit
          };
        }
      } catch {}
      return {
        account: String(v62?.label || v62?.uid || (explicit ? "指定账号（未标识）" : window.APP?.state?.profileUid) || ""),
        accountId: String(v62?.id || ""),
        noncurrent: explicit
      };
    },
    rec(v66, v67, v68, v69, v70 = null) {
      try {
        const v71 = v70 ? {
          ...v67,
          http: v70.http,
          raw: v70.body,
          sampleAt: v70.responseAt,
          ms: v70.responseAt - v68
        } : v67;
        if (v70 && v67.stale && v67.business == null) {
          let v72 = null;
          try {
            if (typeof v70.body === "string" && v70.body.length <= 131072) {
              v72 = JSON.parse(v70.body);
            }
          } catch {}
          v71.code = v72?.code;
          v71.business = v72?.code == null ? "unknown" : v70.http >= 200 && v70.http < 400 && v72.code === "10000" ? "ok" : "failed";
        }
        window.DIAG?.request({
          id: v66.id,
          req: {
            method: v66.method,
            url: v66.url,
            body: v66.body,
            headers: v66.headers,
            account: v66.account,
            accountId: v66.accountId,
            noncurrent: v66.noncurrent,
            sessionId: v66.sessionId,
            generation: v66.generation,
            runId: v66.runId,
            origin: v66.origin,
            sent: v66.sent,
            channel: v66.channel
          },
          res: v71,
          at: v68,
          source: v69 || v67?.source
        });
      } catch {}
      return v67;
    },
    async fetchDiag(v73, v74, v75 = {}, {
      scope = null,
      isLatest = null,
      business = "api",
      bodySummary = undefined,
      runId = "",
      logScope = null
    } = {}) {
      if (!this.isCurrent()) {
        throw this.retiredError();
      }
      const v76 = Date.now();
      const v77 = {
        id: v73,
        url: v74,
        method: v75.method || "GET",
        body: bodySummary ?? v75.body ?? null,
        headers: v75.headers,
        channel: this.transport,
        ...this.diagScope(scope),
        ...(logScope || window.DIAG?.capture?.()),
        runId: runId || scope?.runId || "",
        sent: true
      };
      const v78 = () => {
        try {
          return !this.isCurrent() || !!isLatest && !isLatest();
        } catch {
          return true;
        }
      };
      let v79 = null;
      let v80 = null;
      try {
        v79 = await this.fetchT(v74, v75, async v88 => {
          v80 = v88.status;
          const v89 = await v88.text();
          return {
            http: v88.status,
            body: v89,
            responseAt: Date.now()
          };
        });
      } catch (v90) {
        this.rec(v77, {
          ok: false,
          http: v80,
          business: "unknown",
          transport: "failed",
          err: v90?.name === "TimeoutError" ? "请求超时（20s）" : String(v90?.message || v90),
          stale: v78(),
          ms: Date.now() - v76,
          sampleAt: Date.now()
        }, v76, "direct");
        throw v90;
      }
      if (!this.isCurrent()) {
        throw this.retiredError();
      }
      let v81 = null;
      try {
        if (v79.body.length <= 131072) {
          v81 = JSON.parse(v79.body);
        }
      } catch {}
      const v82 = v79.http === 200 && !!v81 && String(v81.code) === "10000";
      const v83 = v79.http === 430 || String(v81?.code) === "30121";
      const v84 = v73 === "h5_signin" && v79.http === 200 && !v83 && !!v81 && (String(v81.code) === "repeatedly_operation" || /已签|重复|repeatedly/i.test(String(v81.message || "")));
      const v85 = /^h5_signin_(lottery|supplement)$/.test(v73) && v79.http === 200 && !v83 && !!v81 && (String(v81.code) === "repeatedly_operation" || /已领|已抽|已领取|重复|repeatedly/i.test(String(v81.message || "")));
      const v86 = v84 || v85;
      const v87 = business === "http" ? v79.http >= 200 && v79.http < 300 : v82 || v86;
      this.rec(v77, {
        ok: v87,
        already: v86,
        business: v86 ? "already" : v87 ? "ok" : v81 ? "failed" : "unknown",
        code: v81?.code,
        message: v81?.message,
        stale: v78(),
        ms: v79.responseAt - v76
      }, v76, "direct", v79);
      return {
        status: v79.http,
        text: v79.body
      };
    },
    VEHICLE_EP: new Set(["vehicle_home", "vehicle_props", "battery_info", "tire_monitor", "tire_stats_24h", "tire_stats_7d", "vehicle_set_items", "vehicle_set_info", "vcu_lock_status", "ride_home", "ride_month", "ride_track", "analyse", "service_recharge", "ota_records", "wallpaper_page", "wallpaper_count", "wallpaper_detail", "wallpaper_vehicle", "wallpaper_use", "wallpaper_progress", "wallpaper_delete", "wallpaper_save", "theme_list", "ota_info", "ota_content", "ota_check_version", "ota_status", "ota_list", "ota_redpoint", "ota_upstatus", "car_horn", "car_ctrl_v2", "car_cmd", "net_unlock", "set_motoPlay", "set_property", "set_property2", "set_sound_size", "set_lowpower", "charge_power_options", "set_charge_power", "custom_audio_list", "custom_audio_add", "custom_audio_delete"]),
    ownerTokenFor(v91, v92 = {}) {
      if (typeof this.vehicleToken !== "function" || !v92.vin) {
        return "";
      }
      if (!this.VEHICLE_EP.has(v91)) {
        return "";
      }
      return String(this.vehicleToken(v92.vin) || "");
    },
    resolve(v93, v94 = {}) {
      const v95 = this.ep(v93);
      if (!v95) {
        return null;
      }
      const v96 = {
        "{vin}": v94.vin || "",
        "{uid}": v94.uid === undefined || v94.uid === null ? "" : String(v94.uid),
        "{carUid}": v94.carUid === undefined || v94.carUid === null ? "" : String(v94.carUid),
        "{postId}": v94.postId === undefined || v94.postId === null ? "" : String(v94.postId),
        "{integralId}": v94.integralId === undefined || v94.integralId === null ? "" : String(v94.integralId),
        "{cursor}": v94.cursor === undefined || v94.cursor === null ? "" : String(v94.cursor),
        "{month_dot}": v94.month || "",
        "{month_dash}": (v94.month || "").replace(".", "-"),
        "{date}": v94.date || "",
        "{date_dash}": (v94.date || "").replace(/\./g, "-"),
        "{wallpaperId}": v94.wallpaperId === undefined || v94.wallpaperId === null ? "" : String(v94.wallpaperId),
        "{recordId}": v94.recordId === undefined || v94.recordId === null ? "" : String(v94.recordId)
      };
      const v97 = v99 => String(v99).replace(/\{(vin|uid|carUid|postId|integralId|cursor|month_dot|month_dash|date|date_dash|wallpaperId|recordId)\}/g, v100 => v96[v100] ?? v100);
      const v98 = {};
      for (const [v101, v102] of Object.entries(v95.query || {})) {
        const v103 = v102 !== "" && !/\{[^}]+\}/.test(String(v102)) && v94[v101] !== undefined && v94[v101] !== null && v94[v101] !== "";
        const v104 = v97(v103 ? v94[v101] : v102);
        if (v104 !== "") {
          v98[v101] = v104;
        }
      }
      return {
        tag: v95.tag,
        path: v97(v95.path),
        query: v98,
        label: v95.label,
        method: v95.method || "GET"
      };
    },
    tireSensorType(v105, v106, v107) {
      if (!v107 || !v105?.ok || v105.data?.vinNo !== v107 || !v106?.ok || !Array.isArray(v106.data)) {
        return "";
      }
      const v108 = v110 => v106.data.some(v111 => v111?.functionCode === v110 && v111.isSupport === true);
      if (v108("TIRE_MONITORING_INTERNAL")) {
        return "INTERNAL";
      }
      if (v108("TIRE_MONITORING")) {
        return "EXTERNAL";
      }
      const v109 = v105.data.builtInTirePressure;
      if (v109 === true) {
        return "INTERNAL";
      } else if (v109 === false) {
        return "EXTERNAL";
      } else {
        return "";
      }
    },
    async tireSensorFor(v112, v113 = {}) {
      if (this.source === "demo" && !Object.hasOwn(v113, "token") && !this.ownerTokenFor("tire_monitor", v112)) {
        return {
          sensorType: "EXTERNAL"
        };
      }
      const [v114, v115] = await Promise.all([this.call("vehicle_home", v112, v113), this.call("vehicle_set_items", v112, v113)]);
      const v116 = [v114, v115].find(v117 => v117?.stale) || [v114, v115].find(v118 => !v118?.ok) || null;
      return {
        sensorType: this.tireSensorType(v114, v115, v112.vin),
        error: v116
      };
    },
    async call(v119, v120 = {}, v121 = {}) {
      v120 = {
        ...v120
      };
      const v122 = Date.now();
      if (!this.isCurrent()) {
        return this.stale(this.source, v122);
      }
      const v123 = this.isPreview();
      if (v123) {
        const v145 = String(v121.method || this.ep(v119)?.method || "GET").toUpperCase();
        if (Object.prototype.hasOwnProperty.call(v121, "token") || v121.body !== undefined || v145 !== "GET" || /^(?:auth_|h5_|car_|net_unlock|set_|msg_(?:read|del)|wallpaper_(?:use|delete|save)|signin_(?:post|get)|prize_(?:lottery|take))/.test(v119)) {
          return this.previewFailure("真实账号或车辆操作");
        }
      }
      const v124 = Object.prototype.hasOwnProperty.call(v121, "token");
      const v125 = v123 || v124 ? "" : this.ownerTokenFor(v119, v120);
      const v126 = v124 || !!v125;
      const v127 = v124 ? v121.token : v125 || this.token;
      const v128 = v125 && window.ACC?.ready?.() && window.ACC?.avail?.() ? window.ACC.ownerOfVin(v120.vin) : null;
      const v129 = v128 ? window.ACC.snapshot(v128.id) : null;
      const v130 = () => !v129 || window.ACC.current(v129) && window.ACC.ownerOfVin(v120.vin)?.id === v129.id && v129.token === v125;
      const v131 = v124 ? undefined : this.gen;
      const v132 = v123 ? "demo" : v126 ? "direct" : this.source;
      const v133 = () => this.isCurrent() && (v131 === undefined || v131 === this.gen) && v130() && (!v121.isLatest || v121.isLatest());
      const v134 = {
        id: v119,
        method: "",
        body: v121.body === undefined ? null : v121.body,
        url: "",
        channel: this.transport,
        ...this.diagScope(v121.scope || v129, {
          explicit: v124
        }),
        ...(v121.logScope || window.DIAG?.capture?.()),
        runId: v121.runId || v121.scope?.runId || "",
        origin: v121.logSource || "foreground"
      };
      let v135 = null;
      let v136 = null;
      const v137 = v146 => this.rec(v134, v146, v122, v132, v135);
      const v138 = v147 => v137(this.fail(v119, v147, {
        own: v126,
        source: v132
      }));
      if (!v133()) {
        return v137(this.stale(v132, v122));
      }
      if (this.authFailed && !v121.force && !v126 && v132 !== "demo") {
        return v138("登录态已失效（" + (this.authFailed.http || 401) + "），已停止请求");
      }
      const v139 = this.ep(v119);
      const v140 = v121.body !== undefined ? JSON.stringify(v121.body) : null;
      const v141 = v121.method || v139?.method || "GET";
      v134.method = v141;
      v134.body = v121.bodySummary === undefined ? v140 : v121.bodySummary;
      if (v132 === "direct") {
        const v148 = String(v127 || "").trim().replace(/^bearer\s+/i, "");
        if (!v148) {
          return v138("直连模式需要 token：右上角齿轮里粘贴一个");
        }
        const v149 = ["tire_monitor", "tire_stats_24h", "tire_stats_7d"].includes(v119);
        if (v149) {
          if (!v120.vin) {
            return v138("缺少车辆信息，暂不能读取胎压");
          }
          v121 = {
            ...v121,
            batch: v121.batch || "b" + ++this._batchSeq,
            batchReads: v121.batchReads || new Map()
          };
          const {
            sensorType: v151,
            error: v152
          } = await this.tireSensorFor(v120, {
            ...v121,
            isLatest: v133
          });
          if (!v133()) {
            return v137(this.stale(v132, v122));
          }
          if (v152) {
            const v153 = {
              ...this.fail(v119, v152.message, {
                own: v126,
                source: v132
              }),
              http: v152.http,
              code: v152.code,
              err: v152.err,
              stale: v152.stale
            };
            if (!v126) {
              this.lastRaw[v119] = v153;
            }
            return v137(v153);
          }
          if (!v151) {
            return v138("暂未确认这辆车的胎压类型，请稍后重试");
          }
          v120 = {
            ...v120,
            sensorType: v151
          };
        }
        const v150 = this.resolve(v119, v120);
        if (!v150) {
          return v138("没有这个接口：" + v119);
        }
        if (!v133()) {
          return v137(this.stale(v132, v122));
        }
        if (this.authFailed && !v121.force && !v126) {
          return v138("登录态已失效，已停止请求");
        }
        try {
          const v154 = window.ZEEHO_SIGN.toQuery(v150.query);
          const v155 = window.ZEEHO_SIGN.baseFor(v150.tag) + v150.path + (v154 ? "?" + v154 : "");
          v134.url = v155;
          v134.headers = window.ZEEHO_SIGN.buildHeaders(v150.tag, v150.query, v140, v141, v148, {
            appLike: !!v121.appLike
          });
          v134.sent = true;
          const v156 = v121.scopeId !== undefined ? String(v121.scopeId) : (v134.accountId || "") + "\0" + (v134.account || "");
          const v157 = !v121.noCoalesce && v121.batch ? v121.batch + "\0" + v141 + "\0" + v155 + "\0" + (v140 || "") + "\0" + v148.slice(-16) + "\0" + v156 : "";
          const v158 = v141 === "GET" && ["vehicle_home", "vehicle_set_items"].includes(v119) ? v121.batchReads : null;
          const v159 = v157 ? v158?.get(v157) || this._inflight.get(v157) : null;
          let v160;
          if (v159) {
            if (v158) {
              v158.set(v157, v159);
            }
            v136 = v159.http;
            v160 = await v159.promise;
          } else {
            const v162 = this.fetchT(v155, {
              method: v141,
              headers: v134.headers,
              body: v140 || undefined
            }, async v163 => {
              v136 = v163.status;
              if (v157) {
                const v164 = this._inflight.get(v157);
                if (v164) {
                  v164.http = v163.status;
                }
              }
              return {
                http: v163.status,
                body: await v163.text(),
                url: v155,
                responseAt: Date.now()
              };
            });
            if (!v157) {
              v160 = await v162;
            } else {
              const v165 = {
                http: null,
                promise: null
              };
              v165.promise = v162.then(v167 => v167, v168 => {
                throw v168;
              });
              this._inflight.set(v157, v165);
              if (v158) {
                v158.set(v157, v165);
              }
              const v166 = () => {
                if (this._inflight.get(v157) === v165) {
                  this._inflight.delete(v157);
                }
              };
              v165.promise.then(v166, v166);
              v160 = await v165.promise;
            }
          }
          v135 = v160;
          const v161 = this.finish(v119, v160, v122, v132, {
            gen: v131,
            isLatest: v133,
            latch: v126 ? false : v121.latch,
            own: v124,
            scopedOwner: !!v125,
            ownerScope: v129,
            vin: v120.vin
          });
          if (v149 && v161.ok) {
            v161.sensorType = v150.query.sensorType;
          }
          return v137(v161);
        } catch (v169) {
          if (v136 != null) {
            const v170 = !v133() ? this.stale(v132, v122) : this.fail(v119, v169?.name === "TimeoutError" ? "直连超时（20s 没响应）" : "直连失败：" + v169.message + "（网络或 CORS）", {
              own: v126,
              source: v132
            });
            this.rec(v134, {
              ...v170,
              http: v136,
              transport: "failed",
              business: "unknown",
              err: v169?.name === "TimeoutError" ? "响应正文读取超时" : String(v169?.message || v169)
            }, v122, v132);
            return v170;
          }
          if (!v133()) {
            const v171 = this.stale(v132, v122);
            this.rec(v134, {
              ...v171,
              err: v169?.name === "TimeoutError" ? "请求超时（20s）" : String(v169?.message || v169)
            }, v122, v132);
            return v171;
          }
          if (v169 && v169.name === "TimeoutError") {
            return v138("直连超时（20s 没响应）");
          }
          return v138("直连失败：" + v169.message + "（网络或 CORS）");
        }
      }
      if (v132 === "demo" && window.ZEEHO_MOCK_READY) {
        await window.ZEEHO_MOCK_READY().catch(() => null);
      }
      await new Promise(v172 => setTimeout(v172, 90 + Math.random() * 120));
      if (!v133()) {
        return v137(this.stale(v132, v122));
      }
      if (v140 && v121.mockField) {
        const v173 = this.mockInfo(v120.vin);
        if (!v173) {
          return v138("演示样例里没有 vehicle_set_info，改不了");
        }
        if (v121.mockField.includes(".")) {
          const [v175, v176] = v121.mockField.split(".");
          if (!v173[v175] || !(v176 in v173[v175])) {
            return v138("演示样例里没有 " + v121.mockField + " 这个字段（没改动）");
          }
          v173[v175][v176] = v121.value;
        } else {
          if (!(v121.mockField in v173)) {
            return v138("演示样例里没有 " + v121.mockField + " 这个字段（没改动）");
          }
          v173[v121.mockField] = v121.value;
        }
        const v174 = {
          ok: true,
          source: "demo",
          code: "10000",
          message: "操作成功（演示数据已改，刷新页面还原）",
          data: true,
          raw: {
            code: "10000"
          },
          ms: Date.now() - v122,
          http: 200
        };
        this.lastRaw[v119] = v174;
        return v137(v174);
      }
      const v142 = this.mock(v119, v120.vin);
      if (!v142) {
        return v138("演示数据里没有这个接口");
      }
      const v143 = this.demoScope(v119, v120, v142.data);
      const v144 = {
        ok: v142.ok,
        code: v142.code,
        message: v142.message,
        data: v143,
        raw: v143 === v142.data ? v142.raw : {
          code: v142.code,
          message: v142.message,
          data: v143
        },
        source: "demo",
        ms: Date.now() - v122,
        http: 200
      };
      this.lastRaw[v119] = v144;
      return v137(v144);
    },
    publicDiagBody(v177) {
      const v178 = {
        bodyOmitted: true
      };
      try {
        if (!v177 || typeof v177 !== "object" || Array.isArray(v177)) {
          return v178;
        }
        v178.phoneProvided = v177.phone != null && v177.phone !== "";
        v178.verificationProvided = v177.authCode != null && v177.authCode !== "";
        v178.captchaProvided = v177.imageCaptchaId != null && v177.imageCaptchaId !== "";
        v178.locationProvided = v177.latitude != null && v177.latitude !== "" && v177.longitude != null && v177.longitude !== "";
        if (typeof v177.areaCode === "string" && /^\+?\d{1,4}$/.test(v177.areaCode)) {
          v178.areaCode = v177.areaCode;
        }
        const v179 = v177.imageCaptchaTrackBO;
        if (v179 && typeof v179 === "object" && !Array.isArray(v179)) {
          const v180 = {};
          for (const v181 of ["bgImageWidth", "bgImageHeight", "sliderImageWidth", "sliderImageHeight"]) {
            if (Number.isSafeInteger(v179[v181]) && v179[v181] > 0 && v179[v181] <= 4096) {
              v180[v181] = v179[v181];
            }
          }
          if (Object.keys(v180).length) {
            v178.captchaSize = v180;
          }
          if (Array.isArray(v179.trackList)) {
            v178.trackPointCount = Math.min(4096, v179.trackList.length);
          }
        }
      } catch {}
      return v178;
    },
    async callPublic(v182, v183 = {}, v184 = {}) {
      const v185 = Date.now();
      if (this.isPreview()) {
        return this.previewFailure("账号登录");
      }
      if (!this.isCurrent()) {
        return this.stale("direct", v185);
      }
      const v186 = this.gen;
      const v187 = () => this.isCurrent() && v186 === this.gen && (!v184.isLatest || v184.isLatest());
      const v188 = this.ep(v182);
      const v189 = v184.body !== undefined ? JSON.stringify(v184.body) : null;
      const v190 = v184.method || v188?.method || "GET";
      const v191 = this.resolve(v182, v183);
      const v192 = {
        id: v182,
        method: v190,
        body: this.publicDiagBody(v184.body),
        url: "",
        channel: this.transport,
        ...this.diagScope(null, {
          publicRequest: true
        }),
        ...window.DIAG?.capture?.()
      };
      let v193 = null;
      let v194 = null;
      const v195 = v196 => this.rec(v192, v196, v185, "direct", v193);
      if (!v187()) {
        return v195(this.stale("direct", v185));
      }
      if (!v191) {
        return v195(this.fail(v182, "没有这个接口：" + v182));
      }
      try {
        const v197 = window.ZEEHO_SIGN.toQuery(v191.query);
        const v198 = window.ZEEHO_SIGN.baseFor(v191.tag) + v191.path + (v197 ? "?" + v197 : "");
        v192.url = v198;
        const v199 = window.ZEEHO_SIGN.buildHeaders(v191.tag, v191.query, v189, v190, "", {
          appLike: !!v184.appLike
        });
        if (v184.clientAuth) {
          v199.Authorization = window.ZEEHO_SIGN.APP_BASIC_AUTH;
        }
        const v200 = v193 = await this.fetchT(v198, {
          method: v190,
          headers: v199,
          body: v189 || undefined
        }, async v201 => {
          v194 = v201.status;
          return {
            http: v201.status,
            body: await v201.text(),
            url: v198,
            responseAt: Date.now()
          };
        });
        return v195(this.finish(v182, v200, v185, "direct", {
          latch: false,
          gen: v186,
          isLatest: v187
        }));
      } catch (v202) {
        if (v194 != null) {
          const v203 = !v187() ? this.stale("direct", v185) : this.fail(v182, v202?.name === "TimeoutError" ? "登录请求超时（20s 没响应）" : "登录响应读取失败");
          this.rec(v192, {
            ...v203,
            http: v194,
            transport: "failed",
            business: "unknown",
            err: v202?.name === "TimeoutError" ? "响应正文读取超时" : String(v202?.message || v202)
          }, v185, "direct");
          return v203;
        }
        if (!v187()) {
          const v204 = this.stale("direct", v185);
          this.rec(v192, {
            ...v204,
            err: v202?.name === "TimeoutError" ? "请求超时（20s）" : String(v202?.message || v202)
          }, v185, "direct");
          return v204;
        }
        if (v202 && v202.name === "TimeoutError") {
          return v195(this.fail(v182, "登录请求超时（20s 没响应）"));
        }
        return v195(this.fail(v182, "登录请求发不出去：" + v202.message + "（网络或 CORS）"));
      }
    },
    finish(v205, v206, v207, v208, v209 = {}) {
      if (!this.isCurrent() || v209.gen !== undefined && v209.gen !== this.gen || v209.isLatest && !v209.isLatest()) {
        return this.stale(v208, v207);
      }
      const v210 = !v209.own && v209.latch !== false;
      let v211 = null;
      try {
        v211 = JSON.parse(v206.body);
      } catch {}
      const v212 = v206.http >= 200 && v206.http < 400;
      const v213 = v212 && !!v211 && v211.code === "10000";
      const v214 = !v213 && this.isAuthError(v206.http, v211 ? v211.code : null, v206.body);
      let v215;
      if (v214) {
        v215 = "HTTP " + (v206.http || 401) + "（服务端拒绝了这次登录态）";
      } else if (v211) {
        v215 = v211.message;
      } else if (v212) {
        v215 = "响应不是 JSON（网关或维护页？）：" + (v206.body || "").slice(0, 160);
      } else {
        v215 = (v206.body || "").slice(0, 200);
      }
      const v216 = {
        ok: v213,
        source: v208,
        http: v206.http,
        code: v211 ? v211.code : null,
        message: v215,
        data: v211 ? v211.data : null,
        raw: v211 || v206.body,
        ms: v206.ms ?? Date.now() - v207,
        requestAt: v207,
        sampleAt: Date.now()
      };
      if (!v209.own) {
        this.lastRaw[v205] = v216;
      }
      if (v210 && v214) {
        this.markAuthFail(v216);
      }
      if (v214 && v209.scopedOwner) {
        try {
          this.onOwnerAuthFail?.(v209.vin || "", v209.ownerScope);
        } catch {}
      }
      return v216;
    },
    isAuthError(v217, v218, v219) {
      if (v217 === 401) {
        return true;
      }
      return /invalid_token|invalidToken|InvalidTokenException|登录已过期|登录失效|请重新登录|未登录|token.{0,8}(过期|失效|无效|错误)/i.test((v218 || "") + " " + (v219 || ""));
    },
    markAuthFail(v220) {
      if (!this.isCurrent() || this.authFailed) {
        return;
      }
      this.authFailed = {
        http: v220.http,
        code: v220.code,
        message: v220.message || ""
      };
      if (this.onAuthFail) {
        try {
          this.onAuthFail(this.authFailed);
        } catch {}
      }
    },
    clearAuthFail() {
      if (!this.isCurrent()) {
        return false;
      }
      const v221 = this.authFailed;
      this.authFailed = null;
      return !!v221;
    },
    mockVariant(v222) {
      const v223 = String(v222 || "").trim();
      if (v223) {
        return window.ZEEHO_MOCK?.vehicleVariants?.[v223] || null;
      } else {
        return null;
      }
    },
    mockInfo(v224) {
      const v225 = this.mockVariant(v224);
      return (v225?.vehicle_set_info || window.ZEEHO_MOCK?.vehicle_set_info)?.data || null;
    },
    mock(v226, v227) {
      const v228 = this.mockVariant(v227);
      let v229 = v228 && v228[v226] || (window.ZEEHO_MOCK || {})[v226];
      if (!v229) {
        return null;
      }
      if (this.isPreview()) {
        v229 = JSON.parse(JSON.stringify(v229, (v230, v231) => typeof v231 === "string" && /^https?:\/\//i.test(v231) ? "" : v231));
      }
      return {
        ok: v229.code === "10000",
        code: v229.code,
        message: v229.message,
        data: v229.data,
        raw: v229
      };
    },
    demoScope(v232, v233, v234) {
      const v235 = window.ZEEHO_MOCK || {};
      const v236 = v235.ride_month?.data?.rideRecordList || [];
      const v237 = v236.length ? String(v236[0].date || "").slice(0, 7) : "";
      if (!v237) {
        return v234;
      }
      const v238 = (v233.month || v237).slice(0, 7);
      if (v232 === "ride_month") {
        if (v238 === v237) {
          return v234;
        } else {
          return {
            ...v234,
            rideRecordList: []
          };
        }
      }
      if (v232 === "analyse") {
        if (v238 === v237) {
          return v234;
        } else {
          return {
            ...v234,
            rideMonth: v238.replace(".", ""),
            rideMileage: 0,
            ridingTimeUnitMinute: 0,
            maxSpeed: 0,
            accelerationTimes: 0,
            brakesTimes: 0,
            bendingTimes: 0,
            extremeSpeedNumber: 0,
            longDrive: 0
          };
        }
      }
      if (v232 === "ride_track") {
        const v239 = new Set((v235.ride_track?.data || []).map(v241 => String(v241.dayTime || "")));
        const v240 = String(v233.date || "").replace(/-/g, ".");
        if (v240 && !v239.has(v240)) {
          return [];
        } else {
          return v234;
        }
      }
      return v234;
    },
    offline() {
      try {
        return navigator.onLine === false;
      } catch {
        return false;
      }
    },
    stale(v242 = this.source, v243 = Date.now()) {
      return {
        ok: false,
        source: v242,
        code: null,
        message: "已切换上下文，忽略旧响应",
        data: null,
        err: "stale",
        ms: Date.now() - v243,
        stale: true
      };
    },
    fail(v244, v245, v246 = {}) {
      if (!this.isCurrent()) {
        return this.stale(v246.source || this.source);
      }
      let v247 = v245;
      if (this.offline()) {
        v247 = "手机好像没有网络。连接网络后会自动重试，先看上次成功加载的数据。";
      } else if (/Failed to fetch|NetworkError|网络连接丢失|ERR_INTERNET|ERR_ACCESS_DENIED/i.test(String(v245))) {
        v247 = "网络请求发不出去（设备连着网但出口不通，或服务暂不可达）";
      }
      const v248 = {
        ok: false,
        source: v246.source || this.source,
        code: null,
        message: v247,
        data: null,
        err: v247,
        offline: this.offline()
      };
      if (!v246.own) {
        this.lastRaw[v244] = v248;
      }
      return v248;
    },
    async all(v249, v250 = {}, v251 = {}) {
      const v252 = v251.batch || "b" + ++this._batchSeq;
      const v253 = v251.batchReads || new Map();
      const v254 = await Promise.all(v249.map(async v255 => [v255, await this.call(v255, v250, {
        ...v251,
        batch: v252,
        batchReads: v253,
        isLatest: () => (!v251.isLatest || v251.isLatest()) && (!v251.isLatestFor || v251.isLatestFor(v255))
      })]));
      return Object.fromEntries(v254);
    },
    _batchSeq: 0
  };
  window.AMAP_ADDRESS = (() => {
    const v256 = "https://dualstack-arestapi.amap.com/v3/geocode/regeo";
    const v257 = 1800000;
    const v258 = 300000;
    const v259 = 60000;
    const v260 = 20;
    const v261 = new Map();
    const v262 = new Map();
    let v263 = null;
    let v264 = null;
    let v265 = 0;
    let v266 = null;
    const v267 = v288 => ({
      ok: false,
      reason: v288
    });
    function v268(v289) {
      const v290 = v269(v289);
      let v291 = "";
      for (const v292 of v290) {
        const v293 = v292 >= 48 && v292 <= 57 || v292 >= 65 && v292 <= 90 || v292 >= 97 && v292 <= 122 || v292 === 45 || v292 === 46 || v292 === 95 || v292 === 42;
        if (v292 === 32) {
          v291 += "+";
        } else if (v293) {
          v291 += String.fromCharCode(v292);
        } else {
          v291 += "%" + (v292 < 16 ? "0" : "") + v292.toString(16).toUpperCase();
        }
      }
      return v291;
    }
    function v269(v294) {
      const v295 = String(v294);
      const v296 = [];
      for (let v297 = 0; v297 < v295.length; v297++) {
        let v298 = v295.charCodeAt(v297);
        if (v298 >= 55296 && v298 <= 56319 && v297 + 1 < v295.length) {
          const v299 = v295.charCodeAt(v297 + 1);
          if (v299 >= 56320 && v299 <= 57343) {
            v298 = 65536 + (v298 - 55296 << 10) + (v299 - 56320);
            v297++;
          }
        }
        if (v298 < 128) {
          v296.push(v298);
        } else if (v298 < 2048) {
          v296.push(v298 >> 6 | 192, v298 & 63 | 128);
        } else if (v298 < 65536) {
          v296.push(v298 >> 12 | 224, v298 >> 6 & 63 | 128, v298 & 63 | 128);
        } else {
          v296.push(v298 >> 18 | 240, v298 >> 12 & 63 | 128, v298 >> 6 & 63 | 128, v298 & 63 | 128);
        }
      }
      return new Uint8Array(v296);
    }
    const v270 = v300 => Array.from(v300, v301 => v301.toString(16).padStart(2, "0")).join("");
    const v271 = [];
    for (let v302 = 0; v302 < 64; v302++) {
      v271[v302] = Math.floor(Math.abs(Math.sin(v302 + 1)) * 4294967296);
    }
    const v272 = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
    function v273(v303) {
      const v304 = v303.length * 8;
      const v305 = Math.ceil((v303.length + 9) / 64) * 64;
      const v306 = new Uint8Array(v305);
      v306.set(v303);
      v306[v303.length] = 128;
      const v307 = new DataView(v306.buffer);
      v307.setUint32(v305 - 8, v304 >>> 0, true);
      v307.setUint32(v305 - 4, Math.floor(v304 / 4294967296), true);
      let v308 = 1732584193;
      let v309 = 4023233417;
      let v310 = 2562383102;
      let v311 = 271733878;
      const v312 = new Array(16);
      for (let v315 = 0; v315 < v305; v315 += 64) {
        for (let v320 = 0; v320 < 16; v320++) {
          v312[v320] = v307.getUint32(v315 + v320 * 4, true);
        }
        let v316 = v308;
        let v317 = v309;
        let v318 = v310;
        let v319 = v311;
        for (let v321 = 0; v321 < 64; v321++) {
          let v322;
          let v323;
          if (v321 < 16) {
            v322 = v317 & v318 | ~v317 & v319;
            v323 = v321;
          } else if (v321 < 32) {
            v322 = v319 & v317 | ~v319 & v318;
            v323 = (v321 * 5 + 1) % 16;
          } else if (v321 < 48) {
            v322 = v317 ^ v318 ^ v319;
            v323 = (v321 * 3 + 5) % 16;
          } else {
            v322 = v318 ^ (v317 | ~v319);
            v323 = v321 * 7 % 16;
          }
          v322 = v322 + v316 + v271[v321] + v312[v323] >>> 0;
          v316 = v319;
          v319 = v318;
          v318 = v317;
          v317 = v317 + (v322 << v272[v321] | v322 >>> 32 - v272[v321]) >>> 0;
        }
        v308 = v308 + v316 >>> 0;
        v309 = v309 + v317 >>> 0;
        v310 = v310 + v318 >>> 0;
        v311 = v311 + v319 >>> 0;
      }
      const v313 = new Uint8Array(16);
      const v314 = new DataView(v313.buffer);
      v314.setUint32(0, v308, true);
      v314.setUint32(4, v309, true);
      v314.setUint32(8, v310, true);
      v314.setUint32(12, v311, true);
      return v313;
    }
    function v274(v324) {
      if (!v266) {
        const v325 = window.ZEEHO_SIGN;
        try {
          if (v325 && typeof v325.md5Hex === "function" && v325.md5Hex("") === "d41d8cd98f00b204e9800998ecf8427e" && v325.md5Hex("中文") === "a7bac2239fcdcb3a067903d8077c4a07") {
            v266 = v326 => v325.md5Hex(v326);
          }
        } catch {}
        if (!v266) {
          v266 = v327 => v270(v273(v269(v327)));
        }
      }
      return v266(v324);
    }
    function v275(v328, v329) {
      if (typeof v328 !== "number" || typeof v329 !== "number") {
        return "";
      }
      if (!Number.isFinite(v328) || !Number.isFinite(v329)) {
        return "";
      }
      if (Math.abs(v328) > 180 || Math.abs(v329) > 85.05112878) {
        return "";
      }
      return v328.toFixed(6) + "," + v329.toFixed(6);
    }
    function v276(v330, v331, v332) {
      return String(v330 || "") + "|" + Math.round(v331 * 10000) + "|" + Math.round(v332 * 10000);
    }
    function v277(v333, v334) {
      if (v261.has(v333)) {
        v261.delete(v333);
      }
      v261.set(v333, v334);
      while (v261.size > v260) {
        v261.delete(v261.keys().next().value);
      }
    }
    function v278(v335) {
      return String(v335 || "").split("&").filter(Boolean).sort().map(v336 => {
        const v337 = v336.replace(/\+/g, " ");
        try {
          return decodeURIComponent(v337);
        } catch {
          return v337;
        }
      }).join("&");
    }
    function v279(v338) {
      const v339 = String(Math.floor(Number(v338)));
      if (v339.length < 2) {
        return v339;
      } else {
        return v339.slice(0, -2) + "1" + v339.slice(-1);
      }
    }
    function v280(v340) {
      const v341 = typeof v340 === "string" ? JSON.parse(v340) : v340;
      const v342 = typeof v341?.key === "string" ? v341.key.trim() : "";
      const v343 = typeof v341?.identity === "string" ? v341.identity.trim() : "";
      if (v341?.ok === true && v342 && v343) {
        return {
          ok: true,
          key: v342,
          identity: v343
        };
      }
      const v344 = ["not_installed", "no_key", "no_identity", "unavailable"].includes(v341?.error) ? v341.error : "unavailable";
      return v267(v344);
    }
    function v281(v345) {
      if (v263 && v345 - v263.at < v259) {
        return v263.value;
      }
      if (v264) {
        return v264;
      }
      const v346 = v265;
      const v347 = window.IOSBR;
      try {
        if (v347?.has?.("app.amapIdentity") || v347?.candidate?.()) {
          const v350 = Promise.resolve(v347.ready).then(() => {
            if (v346 !== v265 || !v282()) {
              return v267("cancelled");
            }
            if (!v347.has("app.amapIdentity")) {
              return v267("unavailable");
            }
            return v347.call("app.amapIdentity").then(v280);
          }).catch(() => v267("unavailable")).then(v351 => {
            if (v346 !== v265 || !v282()) {
              return v267("cancelled");
            }
            v263 = {
              at: Date.now(),
              value: v351
            };
            return v351;
          }).finally(() => {
            if (v264 === v350) {
              v264 = null;
            }
          });
          v264 = v350;
          return v350;
        }
        const v348 = window.ZeehoShell;
        const v349 = v280(v348?.amapIdentity?.());
        v263 = {
          at: v345,
          value: v349
        };
        return v349;
      } catch {
        const v352 = v267("unavailable");
        v263 = {
          at: v345,
          value: v352
        };
        return v352;
      }
    }
    function v282() {
      return window.API?.isCurrent?.() !== false && (!window.IOSBR?.candidate?.() || window.IOSBR?.isCurrent?.() !== false);
    }
    function v283(v353, v354, v355, v356) {
      if (!v355 || v355.ok !== true || !v355.key || !v355.identity) {
        return "";
      }
      const v357 = v275(v353, v354);
      if (!v357) {
        return "";
      }
      const v358 = ["output=json", "location=" + v268(v357), "mode=distance", "extensions=base", "radius=200", "coordsys=autonavi", "key=" + v268(v355.key), "language=zh-CN"].join("&");
      const v359 = v279(v356);
      const v360 = v274(v355.identity + ":" + v359.slice(0, -3) + ":" + v278(v358));
      return v256 + "?" + v358 + "&ts=" + v359 + "&scode=" + v360;
    }
    function v284(v361) {
      if (!v361 || typeof v361 !== "object") {
        return v267("bridge");
      }
      if (v361.http === 0) {
        return v267(v361.err === "timeout" ? "timeout" : "network");
      }
      if (v361.http !== 200) {
        return v267("http_" + String(v361.http));
      }
      let v362;
      try {
        v362 = JSON.parse(v361.text);
      } catch {
        return v267("bad_json");
      }
      if (!v362 || String(v362.status) !== "1" || String(v362.infocode) !== "10000") {
        const v365 = v362 && v362.infocode !== undefined && v362.infocode !== null ? String(v362.infocode) : "";
        return v267(v365 ? "amap_" + v365 : "amap_error");
      }
      const v363 = v362.regeocode && v362.regeocode.formatted_address;
      const v364 = typeof v363 === "string" ? v363.trim() : "";
      if (v364) {
        return {
          ok: true,
          address: v364
        };
      } else {
        return v267("no_address");
      }
    }
    function v285(v366) {
      const v367 = window.TXN;
      if (!v367 || typeof v367.send !== "function") {
        return Promise.resolve(v267("bridge"));
      }
      if (typeof v367.available === "function") {
        try {
          if (!v367.available()) {
            return Promise.resolve(v267("bridge"));
          }
        } catch {
          return Promise.resolve(v267("bridge"));
        }
      }
      let v368;
      try {
        v368 = v367.send({
          url: v366,
          method: "GET",
          headers: {},
          body: null
        });
      } catch {
        return Promise.resolve(v267("bridge"));
      }
      return Promise.resolve(v368).then(v284, () => v267("bridge"));
    }
    function v286(v369) {
      const {
        vin = "",
        lng: v370,
        lat: v371,
        online = true
      } = v369 || {};
      if (!v275(v370, v371)) {
        return Promise.resolve(v267("no_location"));
      }
      if (online === false) {
        return Promise.resolve(v267("offline"));
      }
      if (!v282()) {
        return Promise.resolve(v267("cancelled"));
      }
      const v372 = v265;
      const v373 = v276(vin, v370, v371);
      const v374 = v262.get(v373);
      if (v374) {
        return v374;
      }
      const v375 = v379 => {
        if (v372 !== v265 || !v282()) {
          return v267("cancelled");
        }
        if (v379.ok !== true) {
          return v267(v379.reason);
        }
        const v380 = Date.now();
        const v381 = v261.get(v373);
        if (v381 && v381.address && v380 - v381.at < v257) {
          return {
            ok: true,
            address: v381.address
          };
        }
        if (v381 && v381.failedAt && v380 - v381.failedAt < v258) {
          return v267("throttled");
        }
        return v285(v283(v370, v371, v379, v380)).then(v382 => {
          if (v372 !== v265 || !v282()) {
            return v267("cancelled");
          }
          if (v382.ok) {
            v277(v373, {
              address: v382.address,
              at: Date.now()
            });
          } else {
            v277(v373, {
              failedAt: Date.now()
            });
          }
          return v382;
        });
      };
      const v376 = v281(Date.now());
      const v377 = typeof v376?.then === "function" ? v376.then(v375) : v375(v376);
      const v378 = Promise.resolve(v377).catch(() => v267("exception")).finally(() => {
        if (v262.get(v373) === v378) {
          v262.delete(v373);
        }
      });
      v262.set(v373, v378);
      return v378;
    }
    function v287() {
      v265++;
      v261.clear();
      v262.clear();
      v263 = null;
      v264 = null;
    }
    return {
      forVehicle: v286,
      buildUrl: v283,
      clear: v287,
      _canonicalOf: v278,
      _amapTs: v279,
      _locationText: v275,
      _cacheSize: () => v261.size,
      _md5Hex: v274
    };
  })();
  window.AmapAddress = window.AMAP_ADDRESS;
  window.TXN = (() => {
    const v383 = 120;
    const v384 = 12000;
    const v385 = new Map();
    let v386 = 0;
    let v387 = null;
    let v388 = 0;
    let v389 = 0;
    let v390 = 0;
    const v391 = v417 => String(v417 && v417.message ? v417.message : v417);
    const v392 = () => window.API?.isCurrent?.() !== false;
    const v393 = v418 => v398("cancelled", window.API?.retiredError?.().message || "当前页面已退出，停止旧请求", Date.now() - v418);
    function v394() {
      const v419 = window.ZeehoShellTxn;
      if (v419 && typeof v419.beginRequest === "function" && typeof v419.pollRequests === "function") {
        return v419;
      } else {
        return null;
      }
    }
    const v395 = () => window.IOSBR?.has?.("txn.request") ? window.IOSBR : null;
    function v396(v420, v421) {
      if (v421?.ios && typeof window.IOSBR?.cancel === "function") {
        window.IOSBR.cancel(v420).catch(() => {});
      } else if (v421?.ios && window.IOSBR?.has?.("txn.cancel")) {
        window.IOSBR.call("txn.cancel", {
          id: v420
        }).catch(() => {});
      } else {
        try {
          window.ZeehoShellTxn?.cancelRequest?.(v420);
        } catch {}
      }
    }
    function v397(v422) {
      if (v422.timer !== null) {
        clearTimeout(v422.timer);
      }
      v422.signal?.removeEventListener?.("abort", v422.abort);
    }
    function v398(v423, v424, v425) {
      v389++;
      return {
        http: 0,
        text: "",
        err: v423,
        message: v424,
        ms: v425 || 0,
        at: Date.now()
      };
    }
    function v399(v426) {
      let v427 = "";
      const v428 = 32768;
      for (let v429 = 0; v429 < v426.length; v429 += v428) {
        v427 += String.fromCharCode.apply(null, v426.subarray(v429, v429 + v428));
      }
      return btoa(v427);
    }
    function v400(v430) {
      if (typeof TextEncoder === "function") {
        return v399(new TextEncoder().encode(v430));
      }
      return btoa(unescape(encodeURIComponent(v430)));
    }
    function v401(v431) {
      if (typeof v431 !== "string" || v431.length > Math.ceil(20971520 / 3) * 4 || v431.length % 4 || !/^[a-z0-9+/]*={0,2}$/i.test(v431)) {
        throw new Error("App 代发返回了无效二进制正文");
      }
      const v432 = atob(v431);
      const v433 = new Uint8Array(v432.length);
      if (v433.length > 20971520) {
        throw new Error("App 代发响应超出大小限制");
      }
      for (let v434 = 0; v434 < v432.length; v434++) {
        v433[v434] = v432.charCodeAt(v434);
      }
      return v433;
    }
    function v402(v435) {
      if (!v435) {
        return "";
      }
      try {
        const v436 = atob(v435);
        const v437 = new Uint8Array(v436.length);
        for (let v438 = 0; v438 < v436.length; v438++) {
          v437[v438] = v436.charCodeAt(v438);
        }
        if (typeof TextDecoder === "function") {
          return new TextDecoder().decode(v437);
        } else {
          return v436;
        }
      } catch {
        return "";
      }
    }
    function v403(v439, v440, v441) {
      const v442 = Date.now() - v440;
      try {
        const v443 = {
          http: Number(v439.http) || 0,
          text: v441 ? "" : v402(v439.bodyB64),
          ms: v442,
          at: Number(v439.at) || Date.now(),
          truncated: !!v439.truncated
        };
        if (v441) {
          v443.bytes = v401(v439.bodyB64);
        }
        for (const v444 of ["location", "finalUrl"]) {
          if (typeof v439[v444] === "string" && v439[v444].length <= 4096) {
            v443[v444] = v439[v444];
          }
        }
        return v443;
      } catch (v445) {
        return v398("bridge", v391(v445), v442);
      }
    }
    const v404 = v446 => v446.replace(/["\r\n]/g, v447 => v447 === "\"" ? "%22" : v447 === "\r" ? "%0D" : "%0A");
    async function v405(v448) {
      const v449 = "----zeehotxn" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      const v450 = new TextEncoder();
      const v451 = [];
      const v452 = v456 => v451.push(v450.encode(v456));
      for (const [v457, v458] of v448.entries()) {
        v452("--" + v449 + "\r\n");
        if (typeof v458 === "string") {
          v452("Content-Disposition: form-data; name=\"" + v404(v457) + "\"\r\n\r\n");
          v452(v458 + "\r\n");
        } else {
          const v459 = v404(typeof v458.name === "string" && v458.name ? v458.name : "blob");
          const v460 = typeof v458.type === "string" && v458.type ? v458.type : "application/octet-stream";
          v452("Content-Disposition: form-data; name=\"" + v404(v457) + "\"; filename=\"" + v459 + "\"\r\n");
          v452("Content-Type: " + v460 + "\r\n\r\n");
          if (typeof v458.arrayBuffer !== "function") {
            throw new Error("文件字段无法读取内容");
          }
          v451.push(new Uint8Array(await v458.arrayBuffer()));
          v452("\r\n");
        }
      }
      v452("--" + v449 + "--\r\n");
      let v453 = 0;
      for (const v461 of v451) {
        v453 += v461.length;
      }
      const v454 = new Uint8Array(v453);
      let v455 = 0;
      for (const v462 of v451) {
        v454.set(v462, v455);
        v455 += v462.length;
      }
      return {
        bytes: v454,
        boundary: v449
      };
    }
    function v406(v463) {
      const v464 = {};
      if (!v463 || typeof v463 !== "object") {
        return v464;
      }
      for (const [v465, v466] of Object.entries(v463)) {
        if (typeof v465 === "string" && v465 && v466 !== null && v466 !== undefined) {
          v464[v465] = String(v466);
        }
      }
      return v464;
    }
    const v407 = v467 => {
      for (const v468 of Object.keys(v467)) {
        if (v468.toLowerCase() === "content-type") {
          delete v467[v468];
        }
      }
      return v467;
    };
    async function v408(v469) {
      if (!v469 || typeof v469 !== "object") {
        throw new Error("desc 必须是对象");
      }
      const v470 = String(v469.url || "");
      if (!/^https?:\/\//i.test(v470)) {
        throw new Error("url 缺失或不是 http(s) 地址");
      }
      const v471 = String(v469.method || "GET").toUpperCase();
      const v472 = Number(v469.timeoutMs) > 0 ? Number(v469.timeoutMs) : v384;
      if (v469.responseType !== undefined && !["text", "bytes"].includes(v469.responseType)) {
        throw new Error("响应类型不受支持");
      }
      if (v469.followRedirects !== undefined && typeof v469.followRedirects !== "boolean") {
        throw new Error("跳转选项无效");
      }
      const v473 = v469.followRedirects === true ? {
        followRedirects: true
      } : {};
      const v474 = v406(v469.headers);
      const v475 = v469.body;
      if (v475 === null || v475 === undefined) {
        return {
          url: v470,
          method: v471,
          headers: v474,
          bodyB64: null,
          timeoutMs: v472,
          ...v473
        };
      }
      if (typeof v475 === "string") {
        return {
          url: v470,
          method: v471,
          headers: v474,
          bodyB64: v400(v475),
          timeoutMs: v472,
          ...v473
        };
      }
      if (typeof FormData === "function" && v475 instanceof FormData) {
        const v476 = await v405(v475);
        const v477 = v407(v406(v474));
        v477["Content-Type"] = "multipart/form-data; boundary=" + v476.boundary;
        return {
          url: v470,
          method: v471,
          headers: v477,
          bodyB64: v399(v476.bytes),
          timeoutMs: v472,
          ...v473
        };
      }
      throw new Error("body 只支持 string / FormData / null");
    }
    function v409() {
      if (v387 !== null) {
        clearInterval(v387);
        v387 = null;
      }
    }
    function v410() {
      if (v387 !== null && v385.size === 0) {
        v409();
      }
    }
    function v411(v478) {
      const v479 = v385.get(v478);
      if (!v479) {
        return;
      }
      v385.delete(v478);
      v397(v479);
    }
    function v412() {
      if (v385.size === 0) {
        v409();
        return;
      }
      const v480 = v394();
      if (!v480) {
        v409();
        return;
      }
      let v481 = null;
      try {
        v481 = v480.pollRequests();
      } catch {
        v409();
        return;
      }
      let v482 = null;
      try {
        v482 = typeof v481 === "string" ? JSON.parse(v481) : null;
      } catch {
        v482 = null;
      }
      if (!Array.isArray(v482)) {
        v409();
        return;
      }
      for (const v483 of v482) {
        if (!v483 || typeof v483 !== "object" || typeof v483.id !== "string") {
          continue;
        }
        const v484 = v385.get(v483.id);
        if (!v484) {
          continue;
        }
        v385.delete(v483.id);
        v397(v484);
        const v485 = Date.now() - v484.startedAt;
        if (v483.err) {
          v484.resolve(v398(String(v483.err), String(v483.message || ""), v485));
        } else {
          v484.resolve(v403(v483, v484.startedAt, v484.binary));
        }
      }
      v410();
    }
    function v413() {
      if (v387 === null) {
        v387 = setInterval(v412, v383);
      }
    }
    function v414(v486, v487, v488, v489) {
      const v490 = v395();
      const v491 = "txn-" + ++v386;
      if (!v490) {
        return Promise.resolve(v398("bridge", "iOS App 代发能力不可用", Date.now() - v488));
      }
      if (v487?.aborted) {
        return Promise.resolve(v398("cancelled", "请求已取消", Date.now() - v488));
      }
      const v492 = Math.min(60000, Math.max(10000, v486.timeoutMs));
      return new Promise(v493 => {
        const v494 = {
          resolve: v493,
          startedAt: v488,
          ios: true,
          signal: v487,
          timer: null,
          abort: null
        };
        const v495 = v496 => {
          if (v385.get(v491) !== v494) {
            return;
          }
          v411(v491);
          v493(v496);
        };
        v494.abort = () => {
          v396(v491, v494);
          v495(v398("cancelled", "请求已取消", Date.now() - v488));
        };
        v494.timer = setTimeout(() => {
          v396(v491, v494);
          v495(v398("timeout", "App 代发超时（" + v492 + "ms 没等到结果）", Date.now() - v488));
        }, v492);
        v385.set(v491, v494);
        v487?.addEventListener?.("abort", v494.abort, {
          once: true
        });
        if (v487?.aborted) {
          v494.abort();
          return;
        }
        v388++;
        v490.call("txn.request", {
          id: v491,
          ...v486,
          timeoutMs: v492
        }).then(v497 => {
          if (v385.get(v491) !== v494) {
            return;
          }
          if (!v392() || !v490.available()) {
            v495(v393(v488));
            return;
          }
          const v498 = Date.now() - v488;
          if (v497?.ok === false && v497.error) {
            v495(v398(String(v497.error.code || "bridge"), String(v497.error.message || ""), v498));
            return;
          }
          if (!v497 || v497.id !== v491 || !Number.isInteger(v497.http) || v497.http < 0 || v497.http > 599 || typeof v497.bodyB64 !== "string" && (!v497.err || v497.bodyB64 !== null) || !Number.isFinite(v497.at) || v497.at <= 0 || typeof v497.truncated !== "boolean") {
            v495(v398("bridge", "iOS App 代发返回了无效回执", v498));
            return;
          }
          if (v497.err) {
            v495({
              ...v398(String(v497.err), String(v497.message || ""), v498),
              at: v497.at,
              truncated: v497.truncated
            });
          } else {
            v495(v403(v497, v488, v489));
          }
        }, v499 => {
          v495(v398(String(v499?.error?.code || v499?.code || v499?.err || "bridge"), String(v499?.error?.message || v499?.message || v499), Date.now() - v488));
        });
      });
    }
    async function v415(v500) {
      const v501 = Date.now();
      let v502;
      try {
        v502 = await v408(v500);
      } catch (v506) {
        return v398("bridge", "TXN.send：" + v391(v506), Date.now() - v501);
      }
      if (!v392()) {
        return v393(v501);
      }
      if (v500.signal?.aborted) {
        return v398("cancelled", "请求已取消", Date.now() - v501);
      }
      const v503 = v394();
      const v504 = v500.responseType === "bytes";
      if (!v503 && v395()) {
        return v414(v502, v500.signal, v501, v504);
      }
      if (!v503) {
        return v398("bridge", "App 代发桥不可用，请更新 App", Date.now() - v501);
      }
      const v505 = "txn-" + ++v386;
      return new Promise(v507 => {
        const v508 = setTimeout(() => {
          const v511 = v385.get(v505);
          if (!v511) {
            return;
          }
          v396(v505, v511);
          v411(v505);
          v511.resolve(v398("timeout", "App 代发超时（" + v502.timeoutMs + "ms 没等到结果）", Date.now() - v501));
          v410();
        }, v502.timeoutMs);
        const v509 = {
          resolve: v507,
          timer: v508,
          startedAt: v501,
          signal: v500.signal,
          abort: null,
          binary: v504
        };
        v509.abort = () => {
          if (v385.get(v505) !== v509) {
            return;
          }
          v396(v505, v509);
          v411(v505);
          v410();
          v507(v398("cancelled", "请求已取消", Date.now() - v501));
        };
        v385.set(v505, v509);
        v509.signal?.addEventListener?.("abort", v509.abort, {
          once: true
        });
        if (v509.signal?.aborted) {
          v509.abort();
          return;
        }
        let v510 = null;
        try {
          v510 = v503.beginRequest(JSON.stringify({
            id: v505,
            url: v502.url,
            method: v502.method,
            headers: v502.headers,
            bodyB64: v502.bodyB64,
            timeoutMs: v502.timeoutMs,
            ...(v502.followRedirects ? {
              followRedirects: true
            } : {})
          }));
        } catch (v512) {
          v411(v505);
          v410();
          return v507(v398("bridge", "App 代发桥调用异常：" + v391(v512), Date.now() - v501));
        }
        if (v510 !== "true") {
          v411(v505);
          v410();
          return v507(v398(v510 === "false" ? "rejected" : "bridge", "App 未受理（" + (v510 === "false" ? "参数或白名单被拒" : "返回 " + String(v510)) + "）", Date.now() - v501));
        }
        v388++;
        v413();
      });
    }
    function v416(v513) {
      try {
        return v415(v513).catch(v514 => v398("bridge", "TXN.send 内部错误：" + v391(v514), 0));
      } catch (v515) {
        return Promise.resolve(v398("bridge", "TXN.send 内部错误：" + v391(v515), 0));
      }
    }
    try {
      window.addEventListener("pagehide", () => {
        for (const [v516, v517] of v385) {
          v396(v516, v517);
          v411(v516);
          v517.resolve(v393(v517.startedAt));
        }
        v409();
      });
    } catch {}
    return {
      available: () => !!v394() || !!v395(),
      send: v416,
      stats: () => ({
        pending: v385.size,
        sent: v388,
        failed: v389,
        degraded: v390
      }),
      onDegrade: null
    };
  })();
  (() => {
    const v518 = typeof window === "undefined" ? globalThis : window;
    const v519 = v561 => {
      const v562 = new Error(v561);
      v562.code = v561;
      throw v562;
    };
    const v520 = v563 => v563 instanceof Uint8Array ? v563 : v519("wire_bytes");
    const v521 = (v564, v565, v566) => Number.isSafeInteger(v564) && v564 >= v565 && v564 <= v566 ? v564 : v519("wire_integer");
    function v522(...v567) {
      v567.forEach(v520);
      const v568 = new Uint8Array(v567.reduce((v570, v571) => v570 + v571.length, 0));
      let v569 = 0;
      for (const v572 of v567) {
        v568.set(v572, v569);
        v569 += v572.length;
      }
      return v568;
    }
    const v523 = v573 => new TextDecoder("utf-8", {
      fatal: true
    }).decode(v520(v573));
    const v524 = v574 => new TextEncoder().encode(String(v574));
    const v525 = () => v518.crypto?.randomUUID?.() ?? "u-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
    function v526(v575, v576 = 240) {
      if (typeof v575 !== "string" || !/^(?:[0-9a-fA-F]{2})+$/.test(v575) || v575.length > v576 * 2) {
        v519("wire_hex");
      }
      return Uint8Array.from(v575.match(/../g), v577 => parseInt(v577, 16));
    }
    function v527(v578) {
      v520(v578);
      let v579 = "";
      for (let v580 = 0; v580 < v578.length; v580 += 8192) {
        v579 += String.fromCharCode(...v578.subarray(v580, v580 + 8192));
      }
      return v518.btoa(v579);
    }
    function v528(v581, v582 = 65536) {
      if (typeof v581 !== "string" || v581.length > Math.ceil(v582 / 3) * 4 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(v581)) {
        v519("wire_base64");
      }
      const v583 = v518.atob(v581);
      if (v583.length > v582) {
        v519("wire_base64");
      }
      const v584 = Uint8Array.from(v583, v585 => v585.charCodeAt(0));
      if (v527(v584) !== v581) {
        v519("wire_base64");
      }
      return v584;
    }
    function v529(v586) {
      let v587 = BigInt(v521(v586, 0, Number.MAX_SAFE_INTEGER));
      const v588 = [];
      do {
        v588.push(Number(v587 & 0x7fn) | (v587 > 0x7fn ? 128 : 0));
        v587 >>= 0x7n;
      } while (v587);
      return Uint8Array.from(v588);
    }
    const v530 = (v589, v590) => v522(v529(v521(v589, 1, 32) * 8), v529(v590));
    const v531 = (v591, v592) => v522(v529(v521(v591, 1, 32) * 8 + 2), v529(v520(v592).length), v592);
    function v532(v593) {
      v520(v593);
      if (v593.length > 240) {
        v519("protobuf_size");
      }
      const v594 = new Map();
      let v595 = 0;
      const v596 = v598 => {
        if (v595 + v598 > v593.length) {
          v519("protobuf_truncated");
        }
      };
      const v597 = () => {
        let v599 = 0x0n;
        for (let v600 = 0; v600 < 10; v600++) {
          v596(1);
          const v601 = v593[v595++];
          if (v600 === 9 && v601 & 254) {
            v519("protobuf_varint");
          }
          v599 |= BigInt(v601 & 127) << BigInt(v600 * 7);
          if (!(v601 & 128)) {
            return v599;
          }
        }
        v519("protobuf_varint");
      };
      while (v595 < v593.length) {
        const v602 = v597();
        const v603 = Number(v602 >> 0x3n);
        const v604 = Number(v602 & 0x7n);
        if (v602 > 0x7fffffffn || v603 < 1 || v594.size >= 64 || v594.has(v603)) {
          v519("protobuf_tag_or_duplicate");
        }
        let v605;
        if (v604 === 0) {
          v605 = v597();
        } else if (v604 === 2) {
          const v606 = v597();
          if (v606 > 0xf0n) {
            v519("protobuf_size");
          }
          v596(Number(v606));
          v605 = v593.slice(v595, v595 + Number(v606));
          v595 += Number(v606);
        } else if (v604 === 1 || v604 === 5) {
          const v607 = v604 === 1 ? 8 : 4;
          v596(v607);
          v605 = v593.slice(v595, v595 + v607);
          v595 += v607;
        } else {
          v519("protobuf_wire");
        }
        v594.set(v603, {
          wire: v604,
          value: v605
        });
      }
      return v594;
    }
    const v533 = (v608, v609, v610 = null) => {
      const v611 = v608.get(v609);
      if (v611?.wire === 0 && v611.value <= BigInt(Number.MAX_SAFE_INTEGER)) {
        return Number(v611.value);
      } else {
        return v610;
      }
    };
    const v534 = (v612, v613) => v612.get(v613)?.wire === 2 ? v612.get(v613).value.slice() : v519("protobuf_bytes_required");
    const v535 = (v614, v615) => v521(v614, 0, 255) + v520(v615).length + v615.reduce((v616, v617) => v616 + v617, 0) & 255;
    function v536(v618, v619 = new Uint8Array()) {
      if (v520(v619).length > 240) {
        v519("ble_payload_size");
      }
      return v522(Uint8Array.of(171, 205, v521(v618, 0, 255), v619.length, 0), v619, Uint8Array.of(v535(v618, v619), 207));
    }
    class v620 {
      constructor() {
        this.pending = new Uint8Array();
        this.rejected = 0;
        this.skipped = 0;
      }
      clear() {
        this.pending.fill(0);
        this.pending = new Uint8Array();
      }
      feed(v621) {
        v520(v621);
        if (v621.length + this.pending.length > 2048) {
          this.clear();
          this.rejected++;
          v519("ble_stream_overflow");
        }
        const v622 = v522(this.pending, v621);
        const v623 = [];
        let v624 = 0;
        while (v622.length - v624 >= 2) {
          if (v622[v624] !== 171 || v622[v624 + 1] !== 205) {
            v624++;
            this.skipped++;
            continue;
          }
          if (v622.length - v624 < 5) {
            break;
          }
          const v625 = v622[v624 + 3] | v622[v624 + 4] << 8;
          const v626 = v625 + 7;
          if (v625 > 240) {
            v624++;
            this.rejected++;
            continue;
          }
          if (v622.length - v624 < v626) {
            break;
          }
          const v627 = v622[v624 + 2];
          const v628 = v622.slice(v624 + 5, v624 + 5 + v625);
          if (v622[v624 + v626 - 1] !== 207 || v535(v627, v628) !== v622[v624 + v626 - 2]) {
            v624++;
            this.rejected++;
            continue;
          }
          v623.push({
            command: v627,
            payload: v628
          });
          v624 += v626;
        }
        this.clear();
        this.pending = v622.slice(v624);
        return v623;
      }
    }
    function v538(v629) {
      if (!v629 || typeof v629.key !== "string") {
        v519("auth_material");
      }
      const v630 = v524(v629.key);
      const v631 = v526(v629.encryptValue, 64);
      if (![16, 24, 32].includes(v630.length) || v631.length !== 64) {
        v630.fill(0);
        v631.fill(0);
        v519("auth_material");
      }
      return {
        key: v630,
        encrypted: v631
      };
    }
    function v539(v632, v633, v634) {
      const v635 = [v632, v633];
      const v636 = [];
      const v637 = [];
      const v638 = v632?.encryptInfo || v633?.encryptInfo;
      const v639 = v538(v638);
      v639.key.fill(0);
      v639.encrypted.fill(0);
      if (typeof v638.iv !== "string" || !v638.iv || v524(v638.iv).length > 4096) {
        v519("renewal_material");
      }
      if (!v635.some(v640 => typeof v640?.bluetoothAddress === "string" && v640.bluetoothAddress)) {
        v519("renewal_material");
      }
      for (const v641 of v635) {
        if (!v641 || typeof v641 !== "object" || Array.isArray(v641)) {
          v519("renewal_snapshot");
        }
        const v642 = [];
        const v643 = [];
        for (const v645 of ["vin", "vinNo"]) {
          if (v641[v645] == null) {
            continue;
          }
          if (v641[v645] !== v634) {
            v519("owner_unverified");
          }
          v642.push({
            path: ["data", v645],
            equals: v634,
            type: "string"
          });
        }
        if (v641 === v632 && !v642.length) {
          v519("owner_unverified");
        }
        const v644 = [["bluetoothAddress"], ...["key", "iv", "encryptValue"].map(v646 => ["encryptInfo", v646])];
        for (const v647 of v644) {
          const v648 = v647.reduce((v651, v652) => v651?.[v652], v641);
          if (v648 == null) {
            if (v641.encryptInfo && v647.length === 2) {
              v519("renewal_material");
            }
            continue;
          }
          if (typeof v648 !== "string" || !v648 || v524(v648).length > 4096) {
            v519("renewal_material");
          }
          let v649 = v636.indexOf(v648);
          if (v649 < 0) {
            v649 = v636.length;
            v636.push(v648);
          }
          const v650 = ["data", ...v647];
          v643.push(v650);
          v642.push({
            path: v650,
            baselineIndex: v649,
            type: "string"
          });
        }
        v637.push({
          validation: v642,
          materialPaths: v643
        });
      }
      if (v636.length > 10) {
        v519("renewal_limit");
      }
      return {
        baselines: v636,
        requests: v637
      };
    }
    function v540(v653) {
      const v654 = v653?.requests?.findIndex(v658 => v658.materialPaths.some(v659 => v659.join(".") === "data.encryptInfo.key"));
      if (!Number.isSafeInteger(v654) || v654 < 0) {
        v519("renewal_material");
      }
      const v655 = {
        magicHex: "abcd",
        commandOffset: 2,
        lengthOffset: 3,
        lengthBytes: 2,
        lengthEndian: "little",
        payloadOffset: 5,
        checksum: "sum8",
        checksumInput: ["command", "lengthLow", "lengthHigh", "payload"],
        tailHex: "cf",
        maxPayload: 240
      };
      const v656 = (v660, v661) => ({
        op: "write",
        operationId: v525(),
        command: v660,
        frame: {
          ...v655
        },
        parts: v661
      });
      const v657 = (v662, v663, v664 = {}) => ({
        op: "wait",
        command: v662,
        frame: {
          ...v655
        },
        slot: v663,
        timeoutMs: 10000,
        ...v664
      });
      return {
        version: 1,
        timeoutMs: 15000,
        retries: 0,
        materials: [{
          slot: "key",
          requestIndex: v654,
          path: ["data", "encryptInfo", "key"],
          type: "string"
        }, {
          slot: "encryptedHex",
          requestIndex: v654,
          path: ["data", "encryptInfo", "encryptValue"],
          type: "string"
        }],
        steps: [{
          op: "hexUTF8",
          from: "encryptedHex",
          to: "encrypted"
        }, {
          op: "bytesPB",
          from: "encrypted",
          field: 1,
          to: "authPayload"
        }, v656(90, [{
          slot: "authPayload"
        }]), v657(91, "challenge"), {
          op: "protobufExtract",
          from: "challenge",
          field: 1,
          to: "cipherHex",
          kind: "bytes",
          requirePresent: true
        }, {
          op: "hexUTF8",
          from: "cipherHex",
          to: "cipher"
        }, {
          op: "aes",
          from: "cipher",
          keySlot: "key",
          to: "plain",
          mode: "decrypt_ecb_pkcs7",
          outputUTF8: {
            minBytes: 1,
            maxBytes: 128,
            noControls: true
          }
        }, {
          op: "bytesPB",
          from: "plain",
          field: 1,
          to: "responsePayload"
        }, v656(92, [{
          slot: "responsePayload"
        }]), v657(93, "result"), {
          op: "protobufExtract",
          from: "result",
          field: 1,
          to: "status",
          kind: "varint",
          requirePresent: true
        }, {
          op: "checkEqual",
          left: {
            slot: "status"
          },
          right: {
            hex: "00"
          }
        }, v656(124, [{
          hex: "0801"
        }]), v657(252, "periodAck", {
          payloadValidation: {
            kind: "empty"
          }
        }), v656(114, [{
          hex: "0801"
        }]), v657(242, "dashAck", {
          optional: true,
          payloadValidation: {
            kind: "emptyOrVarint",
            field: 1,
            values: [0, 1]
          }
        })]
      };
    }
    function v541({
      vin: v665,
      baseline: v666,
      baselineHandles: v667,
      signerHandle: v668,
      signerSpec: v669,
      handshakeRecipe: v670
    }) {
      if (!/^[A-Za-z0-9_-]{1,64}$/.test(v665) || !v666 || v666.requests?.length !== 2 || !Array.isArray(v667) || v667.length !== v666.baselines.length || ![v668, ...v667].every(v672 => typeof v672 === "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v672)) || v669?.nonceMode !== "timestampRandom" || v669.transform !== "sha1HexThenMd5Hex" || v670?.version !== 1) {
        v519("renewal_recipe");
      }
      const v671 = ["/v1.0/app/cfmotoserverapp/vehicleHomePageV2/", "/v1.0/app/cfmotoserverapp/vehicleSet/vehicleSetInfo/"];
      return {
        version: 1,
        intervalMs: 240000,
        validityMs: 300000,
        reauthenticationRecipe: v670,
        requests: v666.requests.map((v673, v674) => ({
          url: "https://tapi.zeehoev.com" + v671[v674] + v665,
          method: "GET",
          query: [],
          sign: {
            ...v669,
            suffixSecretHandle: v668
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept-Language": "zh-CN",
            interfaceversion: "2",
            "cfmoto-x-sign-type": "0"
          },
          validation: [{
            path: ["code"],
            equalsAny: [10000, "10000"],
            type: "numberOrString"
          }, ...v673.validation.map(({
            baselineIndex: v675,
            ...v676
          }) => v675 == null ? v676 : {
            ...v676,
            equals: {
              secretBaselineRef: v667[v675]
            }
          })],
          materialPaths: v673.materialPaths.map(v677 => [...v677])
        }))
      };
    }
    function v542(v678) {
      const v679 = v532(v678);
      const v680 = v534(v679, 1);
      let v681;
      try {
        v681 = v526(v523(v680), 128);
      } finally {
        v680.fill(0);
      }
      if (!v681.length || v681.length % 16) {
        v519("auth_challenge");
      }
      return v681;
    }
    function v543(v682) {
      if (!v520(v682).length || v682.length > 128) {
        v519("auth_plaintext");
      }
      const v683 = v523(v682);
      if (/[\u0000-\u001f\u007f-\u009f]/.test(v683)) {
        v519("auth_plaintext");
      }
      return v531(1, v682);
    }
    function v544(v684) {
      if (v533(v532(v684), 1) !== 0) {
        v519("auth_rejected");
      }
      return true;
    }
    function v545(v685) {
      if (v520(v685).length) {
        v519("bind_ack_invalid");
      }
      return true;
    }
    function v546(v686) {
      const v687 = v686.length === 1 ? v686[0] : v533(v532(v686), 1);
      if (v687 !== 1) {
        v519("broadcast_rejected");
      }
      return true;
    }
    function v547(v688, v689 = 1) {
      const v690 = v532(v688);
      if (v533(v690, 1) !== v689) {
        v519("pair_status_invalid");
      }
      const v691 = v690.has(2) ? v533(v690, 2) : 0;
      if (![0, 1, 2].includes(v691)) {
        v519("pair_status_invalid");
      }
      return {
        registered: v691 === 0,
        result: v691
      };
    }
    function v548(v692, v693, v694) {
      v521(v694, 1, Number.MAX_SAFE_INTEGER);
      const v695 = v532(v693);
      const v696 = {};
      const v697 = {};
      const v698 = (v700, v701) => {
        v696[v700] = v701;
        v697[v700] = v694;
      };
      const v699 = (v702, v703, v704) => {
        const v705 = v533(v695, v702);
        if (v705 !== null && v705 <= v704) {
          v698(v703, v705);
        }
      };
      if (v692 === 253) {
        const v706 = v533(v695, 2);
        if (v706 !== null && v706 <= 200) {
          v698("socPercent", v706 / 2);
        }
        for (const [v708, v709, v710, v711] of [[5, "voltageV", 0, 200], [6, "tempC", -50, 150]]) {
          const v712 = v695.get(v708);
          if (v712?.wire !== 5) {
            continue;
          }
          const v713 = new DataView(v712.value.buffer, v712.value.byteOffset, 4).getFloat32(0, true);
          if (Number.isFinite(v713) && v713 >= v710 && v713 <= v711) {
            v698(v709, v713);
          }
        }
        const v707 = v695.get(9);
        if (v707?.wire === 2 && v707.value.length && v707.value.length <= 512) {
          const v714 = new TextDecoder("utf-8", {
            fatal: false
          }).decode(v707.value);
          if (/^[\x20-\x7e]*$/.test(v714)) {
            const v715 = [];
            for (const v716 of v714.matchAll(/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g)) {
              const v717 = Number(v716[0]);
              if (Number.isFinite(v717) && v717 >= 100 && v717 <= 400) {
                v715.push(v717);
              }
              if (v715.length === 2) {
                break;
              }
            }
            if (v715.length === 2) {
              v698("tireKpaA", v715[0]);
              v698("tireKpaB", v715[1]);
            }
          }
        }
      } else if (v692 === 243) {
        v699(1, "speedKph", 300);
        v699(2, "powerRaw", 100000);
        for (const [v719, v720] of [[3, "odometerRaw"], [4, "socRaw"], [5, "modeRaw"], [6, "lightRaw"]]) {
          v699(v719, v720, 4294967295);
        }
        if (Object.hasOwn(v696, "powerRaw")) {
          v698("powerDeltaRaw", v696.powerRaw - 1500);
        }
        if (Object.hasOwn(v696, "modeRaw")) {
          v698("gearCode", (v696.modeRaw & 15) <= 3 ? v696.modeRaw & 15 : null);
        }
        const v718 = [2, 3, 4, 5].every(v721 => v695.has(v721)) && [...v695].every(([v722, v723]) => v722 >= 1 && v722 <= 6 && v723.wire === 0 && v533(v695, v722) !== null && v533(v695, v722) <= (v722 === 1 ? 300 : v722 === 2 ? 100000 : 4294967295));
        if (!v695.has(1) && v718) {
          v698("speedKph", 0);
        }
      } else {
        v519("telemetry_command");
      }
      return {
        values: v696,
        times: v697,
        unitsVerified: false
      };
    }
    const v549 = Object.freeze({
      INFO: 268435523,
      SLICE: 268435524,
      COMPLETE: 268435525,
      INFO_ACK: 2147483715,
      COMPLETE_ACK: 2147483717,
      VERIFY: 268435526
    });
    const v550 = Object.freeze({
      VERSION: 268435457,
      LOG: 268435458,
      START: 268435459,
      PREPARE: 268435460,
      PROGRESS: 268435461,
      VERIFY: 268435462,
      END: 268435463
    });
    function v551(v724, v725 = new Uint8Array(), v726 = 1, v727 = "wallpaper") {
      v520(v725);
      if (v725.length > 65536) {
        v519("lan_payload_size");
      }
      const v728 = new Uint8Array(10);
      const v729 = new DataView(v728.buffer);
      if (v727 === "wallpaper") {
        v728[0] = 1;
        v728[1] = v521(v726, 0, 2);
      } else if (v727 !== "ota") {
        v519("lan_family");
      }
      v729.setUint32(2, v521(v724, 0, 4294967295), false);
      v729.setUint32(6, v725.length, false);
      return v522(v728, v725);
    }
    function v552(v730, v731 = "wallpaper") {
      if (v520(v730).length !== 10 || (v731 === "wallpaper" ? v730[0] !== 1 : v730[0] !== 0 || v730[1] !== 0)) {
        v519("lan_header");
      }
      const v732 = new DataView(v730.buffer, v730.byteOffset, v730.byteLength);
      const v733 = v732.getUint32(6, false);
      if (v733 > 65536) {
        v519("lan_length");
      }
      return {
        property: v732.getUint32(2, false),
        control: v730[1],
        length: v733
      };
    }
    function v553(v734) {
      if (typeof v734 !== "string" || v524(v734).length > 262144) {
        v519("json_size");
      }
      let v735 = 0;
      const v736 = () => {
        while (/[\x20\t\r\n]/.test(v734[v735] || "\0")) {
          v735++;
        }
      };
      const v737 = () => {
        const v739 = v735;
        if (v734[v735++] !== "\"") {
          v519("json_string");
        }
        while (v735 < v734.length) {
          const v740 = v734[v735++];
          if (v740 === "\"") {
            try {
              return JSON.parse(v734.slice(v739, v735));
            } catch {
              v519("json_string");
            }
          }
          if (v740.charCodeAt(0) < 32) {
            v519("json_string");
          }
          if (v740 === "\\") {
            const v741 = v734[v735++];
            if (!"\"\\/bfnrtu".includes(v741 || "\0")) {
              v519("json_escape");
            }
            if (v741 === "u") {
              if (!/^[0-9a-fA-F]{4}$/.test(v734.slice(v735, v735 + 4))) {
                v519("json_escape");
              }
              v735 += 4;
            }
          }
        }
        v519("json_truncated");
      };
      const v738 = v742 => {
        if (v742 > 32) {
          v519("json_depth");
        }
        v736();
        const v743 = v734[v735];
        if (v743 === "\"") {
          v737();
          return;
        }
        if (v743 === "{") {
          v735++;
          v736();
          const v745 = new Set();
          if (v734[v735] === "}") {
            v735++;
            return;
          }
          while (true) {
            v736();
            const v746 = v737();
            if (v745.has(v746)) {
              v519("json_duplicate");
            }
            v745.add(v746);
            v736();
            if (v734[v735++] !== ":") {
              v519("json_colon");
            }
            v738(v742 + 1);
            v736();
            if (v734[v735] === "}") {
              v735++;
              return;
            }
            if (v734[v735++] !== ",") {
              v519("json_separator");
            }
          }
        }
        if (v743 === "[") {
          v735++;
          v736();
          if (v734[v735] === "]") {
            v735++;
            return;
          }
          while (true) {
            v738(v742 + 1);
            v736();
            if (v734[v735] === "]") {
              v735++;
              return;
            }
            if (v734[v735++] !== ",") {
              v519("json_separator");
            }
          }
        }
        const v744 = /^(?:true|false|null|-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)/.exec(v734.slice(v735));
        if (!v744) {
          v519("json_value");
        }
        v735 += v744[0].length;
      };
      v738(0);
      v736();
      if (v735 !== v734.length) {
        v519("json_trailing");
      }
      try {
        return JSON.parse(v734);
      } catch {
        v519("json_invalid");
      }
    }
    function v554(v747, v748) {
      if (v747.property !== v748 || v747.control !== 2 || !v747.body.length) {
        v519("wallpaper_ack_header");
      }
      let v749;
      try {
        v749 = v553(v523(v747.body));
      } catch {
        v519("wallpaper_ack_json");
      }
      if (!v749 || Array.isArray(v749) || v749.code !== "1") {
        v519("wallpaper_ack_code");
      }
      return true;
    }
    function v555(v750) {
      return typeof v750 === "string" && v524(v750).length <= 255 && /\.zip$/i.test(v750) && !v750.startsWith(".") && !/[\/\\:\u0000-\u001f\u007f-\u009f]/.test(v750) && !v750.endsWith(" ");
    }
    function v556(v751, v752) {
      if (!v751 || !v555(v751.fileName) || !/^[a-f0-9]{32}$/.test(v751.md5)) {
        v519("wallpaper_metadata");
      }
      return v524(JSON.stringify({
        fileName: v751.fileName,
        fileSize: v521(v751.fileSize, 1, 268435456),
        md5: v751.md5,
        wallpaperNum: String(v521(Number(v752), 1, 10)),
        displayWallpaperSet: "1"
      }));
    }
    class v753 {
      constructor(v754, v755 = () => {}) {
        this.read = v754;
        this.guard = v755;
        this.pending = new Uint8Array();
      }
      async exact(v756) {
        v521(v756, 0, 262144);
        const v757 = new Uint8Array(v756);
        let v758 = 0;
        while (v758 < v756) {
          this.guard();
          if (!this.pending.length) {
            this.pending = v520(await this.read(Math.min(65536, v756 - v758)));
            this.guard();
            if (!this.pending.length) {
              v519("wire_eof");
            }
            if (this.pending.length > 65536) {
              v519("wire_read_overflow");
            }
          }
          const v759 = Math.min(v756 - v758, this.pending.length);
          v757.set(this.pending.subarray(0, v759), v758);
          v758 += v759;
          this.pending = this.pending.slice(v759);
        }
        this.guard();
        return v757;
      }
      async lan(v760 = "wallpaper") {
        const v761 = v552(await this.exact(10), v760);
        return {
          ...v761,
          body: await this.exact(v761.length)
        };
      }
    }
    function v558(v762, v763 = new Uint8Array()) {
      v520(v763);
      const v764 = v763.length + 16;
      if (v764 > 262144) {
        v519("cast_control_length");
      }
      const v765 = new Uint8Array(v764);
      const v766 = new DataView(v765.buffer);
      v766.setUint32(0, v521(v762, 0, 4294967295), true);
      v766.setUint32(4, v764, true);
      v766.setUint32(8, (v762 ^ v764) >>> 0, true);
      v765.set(v763, 16);
      return v765;
    }
    function v559(v767, v768, v769 = new Uint8Array()) {
      v520(v769);
      if (v769.length > 65535) {
        v519("cast_media_length");
      }
      const v770 = new Uint8Array(v769.length + 8);
      const v771 = new DataView(v770.buffer);
      v771.setUint16(0, v521(v767, 0, 65535), true);
      v771.setUint16(2, v769.length, true);
      v771.setUint32(4, v521(v768, 0, 4294967295), true);
      v770.set(v769, 8);
      return v770;
    }
    function v560() {
      const v772 = {
        pxcVersion: "1.0.2",
        phoneUUID: "${uuid}",
        phoneBrand: "${brand}",
        phoneModel: "${model}",
        phoneOsVersion: "${osVersion}",
        phoneOs: "${os}",
        package: "${package}",
        packageName: "${package}",
        versionCode: 1,
        token: 0,
        pubkey: "${publicKey}",
        encryptedHUID: "${signature}",
        bluetoothName: "ZEEHO VehicleCast",
        supportH264IFrame: true,
        supportScreenTouch: false,
        supportHID: false,
        supportFunction: 0,
        appVersionFingerPrint: "iOS ReplayKit"
      };
      const v773 = (v775, v776) => ({
        request: v775,
        action: "reply",
        replies: [{
          type: v776
        }]
      });
      const v774 = (v777, v778, v779, v780, v781, v782, v783, v784 = {}) => ({
        id: v777,
        fps: v778,
        bitrate: v779,
        requestedBitrate: false,
        widthLimit: v780,
        heightLimit: v781,
        maxMacroblocks: v782,
        compatibilityFPS: false,
        level: v783,
        ...v784
      });
      return {
        version: 1,
        ports: {
          data: 10920,
          media: 10921,
          control: 10922,
          probe: 10930
        },
        probe: {
          requestType: 1879048208,
          responseType: 1879048209,
          requestJSON: JSON.stringify({
            phoneType: "${os}",
            packageName: "${package}"
          }),
          statusKey: "status"
        },
        control: [v773(1879048192, 1879048193), v773(65536, 65537), v773(67280, 67281), v773(131072, 131073), {
          request: 65552,
          action: "rsa",
          inputKeys: ["HUID", "huid"],
          replies: [{
            type: 65553,
            json: JSON.stringify(v772)
          }]
        }, {
          request: 66528,
          action: "echo",
          defaults: {
            sn: "",
            client_set: "vehicle_cast"
          },
          replies: [{
            type: 66529
          }, {
            type: 131520,
            json: JSON.stringify({
              isOk: true,
              errCode: 0,
              errMsg: "",
              id: "${input:sn}",
              sn: "${input:sn}",
              client_set: "${input:client_set}"
            })
          }]
        }, v773(67456, 67457), {
          request: 196640,
          action: "ignore",
          replies: []
        }, {
          request: 2147483664,
          action: "ignore",
          replies: []
        }],
        media: [{
          request: 16,
          action: "configure",
          reply: 17
        }, {
          request: 112,
          action: "start",
          reply: 113
        }, {
          request: 48,
          action: "reply",
          reply: 49,
          bodyBase64: "ihMAAAEAAAA="
        }, {
          request: 64,
          action: "reply",
          reply: 65
        }, {
          request: 96,
          action: "reply",
          reply: 97,
          bodyBase64: v527(v524("{\"viewAreaConfig\":{\"state\":0},\"supportFunction\":0}"))
        }],
        capture: {
          minBytes: 30,
          widthOffset: 0,
          heightOffset: 2,
          fpsOffset: 4,
          codecOffset: 8,
          bitrateOffset: 20,
          extendedOffset: 29,
          zeroCodec: 2
        },
        captureAck: {
          size: 9,
          codecOffset: 0,
          widthOffset: 4,
          heightOffset: 6,
          extendedOffset: 8
        },
        fallback: {
          width: 1024,
          height: 600,
          fps: 0,
          codec: 2,
          bitrate: 2097152,
          extended: false
        },
        tiers: [v774("performance", 30, 2621440, 1920, 1088, 3600, "3.1"), v774("bitrate-safe", 30, 2097152, 1920, 1088, 3600, "3.1", {
          requestedBitrate: true
        }), v774("compatibility", 24, 2097152, 1920, 1088, 8160, "auto", {
          requestedBitrate: true,
          compatibilityFPS: true
        }), v774("balanced", 20, 1572864, 1920, 1088, 3600, "3.1"), v774("resolution-safe", 20, 1572864, 800, 480, 1620, "3.0"), v774("decoder-safe", 15, 1048576, 800, 480, 1620, "3.0")],
        pullCommand: 114
      };
    }
    v518.VehicleWire = Object.freeze({
      bytes: v520,
      int: v521,
      join: v522,
      utf8: v524,
      text: v523,
      fromHex: v526,
      base64: v527,
      unbase64: v528,
      intField: v530,
      bytesField: v531,
      protobuf: v532,
      number: v533,
      fieldBytes: v534,
      bleFrame: v536,
      BLEStream: v537,
      authMaterial: v538,
      renewalBaseline: v539,
      renewalRecipe: v541,
      renewalHandshakeRecipe: v540,
      challengeCipher: v542,
      challengeResponse: v543,
      authResult: v544,
      bindResult: v545,
      broadcastResult: v546,
      pairResult: v547,
      telemetry: v548,
      wallpaper: v549,
      ota: v550,
      lanFrame: v551,
      lanHeader: v552,
      strictJSON: v553,
      wallpaperACK: v554,
      wallpaperInfo: v556,
      safeFileName: v555,
      ExactReader: v557,
      castControl: v558,
      castMedia: v559,
      castRecipe: v560
    });
  })();
  (() => {
    const v785 = typeof window === "undefined" ? globalThis : window;
    const v786 = ["navId", "frame", "epoch", "generation", "accountId", "vin"];
    const v787 = 536870912;
    const v788 = ["network.open", "network.read", "network.write", "network.poll", "network.close"];
    const v789 = ["blob.pick", "blob.poll", "blob.read", "blob.release"];
    const v790 = ["ble.open", "ble.exchange", "ble.poll", "ble.close", "ble.scan", "ble.identity", "ble.systemPairing", "crypto.aes.decrypt", "ui.confirm"];
    const v791 = ["ble.scan", "ble.stopScan", "ble.diagnostic.open", "ble.diagnostic.poll", "ble.diagnostic.close", "ble.status", "ui.confirm"];
    const v792 = "0000B555-D6D8-C7EC-BDF0-EAB1BFC6BCBC";
    const v793 = v811 => {
      throw Object.assign(new Error(v811), {
        code: v811
      });
    };
    const v794 = v812 => /^[a-z][a-z0-9_]{0,79}$/.test(v812?.code || "") ? v812.code : "operation_failed";
    const v795 = (v813, v814) => !!v813 && !!v814 && v786.every(v815 => v813[v815] === v814[v815]);
    const v796 = v816 => {
      if (typeof v816 === "string") {
        try {
          v816 = JSON.parse(v816);
        } catch {
          v793("invalid_json");
        }
      }
      if (!v816 || typeof v816 !== "object" || Array.isArray(v816)) {
        v793("invalid_arguments");
      }
      return v816;
    };
    const v797 = (v817, v818, v819, v820, v821, v822 = 0, v823 = 6000, v824 = "", v825 = "", v826 = [], v827 = []) => Object.freeze({
      opcode: v817,
      name: v818,
      label: v819,
      schema: v820,
      risk: v821,
      expected: v822,
      timeoutMs: v823,
      warning: v824,
      hex: v825,
      fields: Object.freeze(v826),
      presets: Object.freeze(v827),
      sendable: true
    });
    const v798 = (v828, v829, v830, v831) => Object.freeze({
      opcode: v828,
      name: v829,
      label: v830,
      schema: v831,
      risk: "safe",
      expected: 0,
      timeoutMs: 0,
      warning: "",
      hex: "",
      fields: Object.freeze([]),
      presets: Object.freeze([]),
      sendable: false
    });
    const v799 = (v832, v833, v834, v835, v836 = "", v837 = 0, v838 = 0) => Object.freeze({
      number: v832,
      name: v833,
      label: v834,
      type: v835,
      initial: v836,
      min: v837,
      max: v838
    });
    const v800 = (v839, v840, v841, v842 = 0, v843 = Number.MAX_SAFE_INTEGER, v844) => v799(v839, v840, v841, "number", v844 === undefined ? String(v842) : String(v844), v842, v843);
    const v801 = (v845, v846, v847, v848 = false) => v799(v845, v846, v847, "bool", v848 ? "1" : "0", 0, 1);
    const v802 = (v849, v850, v851) => v799(v849, v850, v851, "bytes");
    const v803 = (v852, v853, v854) => v799(v852, v853, v854, "text");
    const v804 = (v855, v856) => Object.freeze([v855, v856]);
    const v805 = v857 => ({
      number_format: "要填十进制整数",
      number_range: "超出这条命令允许的范围",
      bool_value: "只能填 0 或 1",
      bytes_odd: "十六进制要成对，字符数为奇数",
      bytes_format: "只能是 0-9a-f 组成的偶数个字符",
      protobuf_size: "整包超过 240 字节上限，删掉一些内容再试"
    })[v857] || "";
    function v806(v858, v859, v860) {
      for (const v861 of String(v858 || "").split(";")) {
        const v862 = v861.indexOf("=");
        if (v862 <= 0) {
          continue;
        }
        const v863 = Number(v861.slice(0, v862).trim());
        let v864 = v861.slice(v862 + 1).trim();
        if (!v859.some(v865 => v865.number === v863)) {
          continue;
        }
        if (v864 === "@now") {
          v864 = String(Math.floor(Date.now() / 1000));
        } else if (v864.startsWith("@bytes:")) {
          const v866 = Number(v864.slice("@bytes:".length));
          v864 = String(String(v860[v866] ?? "").replace(/\s/g, "").length / 2);
        }
        v860[v863] = v864;
      }
    }
    const v807 = Object.freeze([v797(10, "operate_4g", "4G 远程车控透传", "Operate4g{command,body,msg_id}", "danger", 138, 10000, "command 是云端 32 位业务码，车辆会原样执行。错误命令会造成不可撤销的未预期车控。", "", [v800(1, "command", "云端 32 位业务码，如 0x10000036=268435510"), v800(2, "body", "指令内容（数值体）"), v800(3, "msg_id", "指令唯一标识，一般填当前秒级时间戳")], [v804("填入当前时间戳", "3=@now")]), v797(12, "operate_4g_complex", "4G 远程车控（字符串体）", "Operate4gComplex{command,msg_id,body}", "danger", 140, 10000, "body 进入车辆执行链，命令与 body 的配对关系未经实车验证，误发后果无法预判。", "", [v800(1, "command", "云端 32 位业务码"), v800(2, "msg_id", "指令唯一标识，一般填当前秒级时间戳"), v803(3, "body", "指令内容（字符串原文）")], [v804("填入当前时间戳", "2=@now")]), v797(19, "send_sound_file", "音效文件原始调试", "SendSoundFile{file_size,number,body}", "danger", 147, 15000, "会写车机持久存储，错误或不完整文件会使提示音/报警音异常。大包分片未实捕验证，本工具不提供完整音效上传。", "", [v800(1, "file_size", "文件字节数（不分片，只发单帧）"), v800(2, "number", "音效编号，对应车机音效矩阵"), v802(3, "body", "文件内容，十六进制")], [v804("按 body 回填 file_size", "1=@bytes:3")]), v798(24, "ble_rssi_result", "BLE RSSI 上报", "BleRssiResult{ble1_rssi,ble2_rssi}"), v798(25, "ble_mmi_rssi_result", "MMI RSSI 上报", "(no_schema)"), v797(90, "auth_package", "认证包原始重放", "AuthPackage{Info}", "caution", 91, 10000, "重放会使本轮认证进入未知分支，本工具不会把重放回执当成重新认证。", "", [v802(1, "Info", "认证包字节；只能重放真实物料，不要手编")]), v798(91, "tbox_num", "车端随机数", "TboxRandomNum{codec}"), v797(92, "random_num", "随机数应答原始重放", "RandomNum{sn}", "caution", 93, 10000, "重放会改变本轮认证状态，本工具不会把重放回执当成重新认证。", "", [v803(1, "sn", "解密后的随机数字符串")]), v798(93, "tbox_auth_result", "认证结果", "TboxAuthResult{result}"), v797(101, "theme", "主题切换", "Theme{themes}", "caution", 0, 3000, "", "", [v800(1, "themes", "主题编号；proto 没有枚举，取值域未实测")]), v797(103, "lock_control", "锁车/开锁", "Lock{type,state}", "danger", 231, 8000, "会真的锁车或开锁，骑行中误发可能锁住车轮。组合未经实车验证。LockState：1=开锁，2=锁车，0=未使用；与实时 headLockState 方向相反。LockType：1整车、2坐垫、3双撑、4储物箱、5边箱、6尾箱。", "", [v800(1, "type", "1整车 2坐垫 3双撑 4储物箱 5边箱 6尾箱", 0, 6), v800(2, "state", "1=开锁 2=锁车 0=未使用（与实时页方向相反）", 0, 2)], [v804("整车锁 · 锁车", "1=1;2=2"), v804("整车锁 · 开锁", "1=1;2=1"), v804("坐垫锁 · 开锁", "1=2;2=1"), v804("储物箱 · 开锁", "1=4;2=1")]), v797(104, "preference", "偏好设置（最高限速）", "Preference{maximum_speed_limit}", "caution", 0, 3000, "写车辆持久限速。proto 注释为 60–120；没有回执，本工具不声称内容已校验或设置已生效。", "", [v800(1, "maximum_speed_limit", "最高限速；proto 注释 60-120，本表不代校验")]), v797(105, "display_units", "显示单位与语言", "Display{distance,temperature,time,language_type}", "safe", 0, 3000, "", "", [v800(1, "distance", "0不使用 1千米 2英里", 0, 2), v800(2, "temperature", "0不使用 1摄氏度 2华氏度", 0, 2), v800(3, "time", "0不使用 1十二小时 2二十四小时", 0, 2), v800(4, "language_type", "0不使用 1中文 2英文", 0, 2)], [v804("公制 · 中文", "1=1;2=1;3=2;4=1"), v804("英制 · 英文", "1=2;2=2;3=1;4=2")]), v797(106, "find_car", "找车闪灯鸣笛", "FindCar{headlight,doubleflash,loudspeaker}", "safe", 234, 6000, "", "", [v801(1, "headlight_status", "大灯"), v801(2, "doubleflash_status", "双闪"), v801(3, "loudspeaker_status", "鸣笛")], [v804("只鸣笛", "3=1"), v804("只双闪", "2=1"), v804("全部打开", "1=1;2=1;3=1"), v804("全部关闭", "")]), v797(107, "light_control", "灯光控制", "LightControl{lowBeamLamp,highBeamLamp,rightBlinkerStatus,leftBlinkerStatus}", "safe", 235, 6000, "近光/远光的取值语义**未验证**：proto 的 LightType 只定义转向灯 1右开/2右关/3左开/4左关，套到近光/远光是推断。转向灯四条安全；近光/远光只能算探测，发完请自己看车。填 0 等于\"不编码\"，整帧可能变空包。", "", [v800(2, "lowBeamLamp", "近光灯；取值语义未证（试探用 1=开 2=关）", 0, 4), v800(3, "highBeamLamp", "远光灯；取值语义未证（试探用 1=开 2=关）", 0, 4), v800(4, "rightBlinkerStatus", "右转向；1开 2关", 0, 4), v800(5, "leftBlinkerStatus", "左转向；3开 4关", 0, 4)], [v804("右转向 · 开", "4=1"), v804("右转向 · 关", "4=2"), v804("左转向 · 开", "5=3"), v804("左转向 · 关", "5=4"), v804("近光 · 试探开(1)", "2=1"), v804("近光 · 试探关(2)", "2=2"), v804("远光 · 试探开(1)", "3=1"), v804("远光 · 试探关(2)", "3=2")]), v797(108, "keep_auth", "保活心跳", "Heartbeat{ping}", "safe", 0, 3000, "", "", [v800(1, "ping", "Heartbeat 与 108 的映射未证，取值域未知")]), v797(113, "charge_opt", "充电电流设置", "ChargeSetting{charge_power}", "danger", 241, 8000, "直接改变充电电流/功率。与电池或充电器能力不匹配会过流发热并损伤设备，充电中误发尤其危险。", "", [v800(1, "charge_power", "0关 1=350 2=450 3=550 4=650 5=750 6=1900", 0, 6)], [v804("关闭（0）", "1=0"), v804("350（1）", "1=1"), v804("450（2）", "1=2"), v804("550（3）", "1=3"), v804("650（4）", "1=4"), v804("750（5）", "1=5"), v804("1900（6）", "1=6")]), v797(114, "open_virtual", "孪生仪表开关", "HandlerStatus{control_on,deviceType}", "caution", 242, 6000, "", "", [v801(1, "control_on", "开启孪生仪表", true), v800(2, "deviceType", "0手机虚拟仪表 1运动相机", 0, 1)], [v804("开启（虚拟仪表）", "1=1"), v804("关闭", "1=0")]), v798(253, "ble_period_info", "周期上报", "BlePeriodResult{headLock,soc,soe,range,voltage,temp,soh,fireVoltage}"), v798(246, "ride_mode", "骑行模式周期上报（车→App）", "DrivingMode{driving_mode}"), v797(118, "change_mode", "骑行模式切换", "DrivingMode{driving_mode}", "caution", 0, 6000, "", "", [v800(1, "driving_mode", "骑行模式编号；proto 没有枚举，取值域未实测。0=助力推行，不是\"不改\"", 1, 3)], [v804("1", "1=1"), v804("2", "1=2"), v804("3", "1=3")]), v797(119, "ltk_bind", "设备绑定（8 字节）", "LTKBindDevice{device_id}", "danger", 247, 8000, "写车辆持久配对记录并占用槽位，8 字节必须与云端 uniqueIdentify 一致。错误需要人工删记录/重新配对；F7 仅是接收回执，不证明持久登记成功。", "", [v802(1, "device_id", "恰好 8 字节；必须与云端 uniqueIdentify 一致")]), v797(120, "change_broadcast_type", "广播类型切换", "ChangeBroadcastType{broadcast_type}", "caution", 248, 6000, "", "", [v800(1, "broadcast_type", "1普通广播 2HID广播", 1, 2, 2)], [v804("普通广播（1）", "1=1"), v804("HID 广播（2）", "1=2")]), v797(124, "open_period_report", "周期上报开关", "OpenBlePeriodReport{prop_cyc_report}", "caution", 252, 6000, "", "", [v800(1, "prop_cyc_report", "0关 1开", 0, 1, 1)], [v804("开启（1）", "1=1"), v804("关闭（0）", "1=0")]), v798(126, "nfc_write_result", "NFC 写入结果", "(no_schema)"), v797(127, "query_pair_status", "配对状态查询", "QueryPairStatus{ble_type,device_id}", "caution", 255, 6000, "", "", [v800(1, "ble_type", "1=BLE1 2=BLE2", 1, 2), v802(2, "device_id", "8 字节手机标识；本工具不展示本机值")])]);
    function v808(v867, v868, v869) {
      let v870 = new Uint8Array(0);
      for (let v871 = 0; v871 < v868.length; v871++) {
        const v872 = v868[v871];
        const v873 = String(v869[v871] ?? "").trim();
        if (!v873) {
          continue;
        }
        if (v872.type === "bool") {
          if (v873 !== "0" && v873 !== "1") {
            v793("debug_field:bool_value");
          }
          if (v873 === "0") {
            continue;
          }
          v870 = v867.join(v870, v867.intField(v872.number, 1));
        } else if (v872.type === "number") {
          if (!/^\d+$/.test(v873)) {
            v793("debug_field:number_format");
          }
          const v874 = Number(v873);
          if (!Number.isSafeInteger(v874)) {
            v793("debug_field:number_format");
          }
          if (v874 < v872.min || v874 > v872.max) {
            v793("debug_field:number_range");
          }
          if (v874 === 0) {
            continue;
          }
          v870 = v867.join(v870, v867.intField(v872.number, v874));
        } else if (v872.type === "bytes") {
          const v875 = v873.replace(/\s/g, "");
          if (v875.length % 2) {
            v793("debug_field:bytes_odd");
          }
          v870 = v867.join(v870, v867.bytesField(v872.number, v867.fromHex(v875, 240)));
        } else {
          v870 = v867.join(v870, v867.bytesField(v872.number, v867.utf8(v873)));
        }
      }
      return v870;
    }
    function v809(v876 = {}) {
      const v877 = v876.wire || v785.VehicleWire;
      const v878 = () => v876.bridge || v785.IOSBR;
      const v879 = () => v876.now?.() ?? Date.now();
      const v880 = v938 => v876.delay ? v876.delay(v938) : new Promise(v939 => v785.setTimeout(v939, v938));
      const v881 = new Map();
      let v882 = v876.core || null;
      const v883 = () => v876.ui || v785.UI || v785.APPUI;
      const v884 = () => typeof v883()?.sheet === "function" && (v876.host || v785.APP?.phone);
      const v885 = () => v882?.available?.() === true;
      function v886(v940) {
        if (v940 === "openMeterOta" || /^meterOta\.(pick|version|push|status|cancel)$/.test(v940)) {
          return [...v788, ...v789, "wifi.status", "wifi.isJoined", "wifi.join", "ui.confirm", "app.keepScreenOn"];
        }
        if (v940 === "openBtDebug" || /^btDebug\.(commands|connect|send|status|close)$/.test(v940)) {
          return v790;
        }
        if (v940 === "btDebug.diagnostics") {
          return ["ble.status", "ble.services", "ui.confirm"];
        }
        if (/^btDebug\.diagnostics(Scan|Connect|Poll|Close)$/.test(v940)) {
          return v791;
        }
        if (v940 === "openInductive") {
          return v790;
        }
        return null;
      }
      function v887(v941) {
        const v942 = v886(v941);
        if (!v877 || !v942 || v878()?.available?.() !== true || v942.some(v943 => v878()?.has?.(v943) !== true)) {
          return false;
        }
        if (["openMeterOta", "openBtDebug"].includes(v941) && !v884()) {
          return false;
        }
        if (v941 === "openInductive") {
          return v885() && (typeof v876.openInductive === "function" || v785.APP?.inductiveUi?.available?.("pair2") === true && typeof v785.APP.inductiveUi.openPair === "function");
        }
        if (/^btDebug\.diagnostics(Scan|Connect|Poll|Close)$/.test(v941)) {
          return typeof v882?.withDiagnostic === "function";
        }
        if (/^btDebug\./.test(v941) && v941 !== "btDebug.diagnostics" || v941 === "openBtDebug") {
          return v885() && typeof v882?.withSession === "function" && typeof v882?.poll === "function";
        }
        return true;
      }
      function v888(v944) {
        if (!v944?.scope || v944.navId !== v944.scope.navId || v944.isCurrent?.() !== true || v786.some(v945 => v944.scope[v945] == null) || !v944.scope.vin || !v944.scope.accountId || typeof v944.scope.frame !== "string" || !v944.scope.frame || !Number.isSafeInteger(v944.scope.epoch) || v944.scope.epoch < 0 || !Number.isSafeInteger(v944.scope.generation) || v944.scope.generation < 0) {
          v793("stale_session");
        }
        return {
          context: v944,
          scope: Object.freeze(Object.fromEntries(v786.map(v946 => [v946, v944.scope[v946]]))),
          navId: v944.navId,
          cancelled: false
        };
      }
      function v889(v947, v948 = true) {
        if (v947.cancelled) {
          v793("cancelled");
        }
        if (!v795(v947.context.scope, v947.scope) || v947.context.navId !== v947.navId || v947.context.isCurrent?.() !== true || v878()?.available?.() !== true || v878()?.isCurrent?.() === false) {
          v793("stale_session");
        }
        const v949 = v876.contextProvider?.();
        if (v949 && (!v795(v949.scope, v947.scope) || v949.navId !== v947.navId)) {
          v793("stale_session");
        }
        if (v948 && (v876.foreground ? v876.foreground() !== true : v785.document?.hidden === true)) {
          v793("foreground_required");
        }
        if (v947.deadline && v879() >= v947.deadline) {
          v793("timeout");
        }
      }
      const v890 = v950 => ({
        navigationId: v950.navId,
        epoch: v950.scope.epoch,
        frame: v950.scope.frame
      });
      async function v891(v951, v952, v953, v954 = false, v955 = null) {
        if (!v954) {
          v889(v951);
        }
        if (v878()?.has?.(v952) !== true) {
          v793("unavailable");
        }
        let v956;
        try {
          v956 = await v878().call(v952, v953);
        } catch (v957) {
          if (v954) {
            return null;
          }
          throw Object.assign(new Error(v794(v957)), {
            code: v794(v957)
          });
        }
        if (!v954) {
          try {
            v889(v951);
          } catch (v958) {
            if (v955) {
              await v955(v956);
            }
            throw v958;
          }
          if (v956?.ok === false) {
            v793(v956.error?.code || v956.reason || "native_failed");
          }
        }
        return v956;
      }
      async function v892(v959, v960, v961, v962) {
        const v963 = v796(await v891(v959, "ui.confirm", {
          ...v890(v959),
          operation: v960,
          title: v961,
          message: v962
        }));
        if (v963.confirmed !== true || v963.operation !== v960 || !v795(v963.scope, v959.scope)) {
          v793("user_cancelled");
        }
      }
      function v893(v964, v965) {
        if ([...v881.values()].some(v967 => v967.kind === v964 && !v967.cancelled)) {
          v793("session_busy");
        }
        const v966 = {
          ...v888(v965),
          kind: v964,
          ticket: v785.crypto?.randomUUID?.() || "u-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10),
          busy: false,
          state: "ready",
          stage: "ready",
          reason: "",
          progress: 0,
          started: false,
          sent: 0,
          op: 0
        };
        v889(v966);
        v881.set(v966.ticket, v966);
        return v966;
      }
      function v894(v968) {
        return {
          ok: true,
          ticket: v968.ticket,
          state: v968.state,
          stage: v968.stage,
          busy: v968.busy,
          reason: v968.reason,
          progress: v968.progress,
          sent: v968.sent,
          file: v968.file ? {
            name: v968.file.name,
            fileSize: v968.file.fileSize,
            md5: v968.file.md5
          } : null,
          version: v968.version || "",
          targetVersion: v968.spec?.targetVersion || "",
          type: v968.spec?.type || "",
          started: v968.started,
          resultUnknown: v968.started && v968.state !== "verify_response",
          verifyResponse: v968.verifyResponse || "",
          upgradeSuccessVerified: false,
          firmwareSignatureVerified: false,
          hardwareCompatibilityVerified: false,
          authenticated: v968.facts?.authenticated === true,
          systemBondState: v968.facts?.systemBondState || "unknown_os_managed",
          telemetry: {
            ...v968.facts?.telemetry
          },
          telemetryTimes: {
            ...v968.facts?.telemetryTimes
          },
          lastResponse: v968.lastResponse || null,
          diagnostic: v968.diagnostic || null,
          devices: v968.devices || []
        };
      }
      const v895 = v969 => {
        v969.render?.(v894(v969));
        v876.onProgress?.(v894(v969));
      };
      async function v896(v970, v971, v972) {
        v889(v970);
        if (v970.busy) {
          v793("busy");
        }
        const v973 = ++v970.op;
        v970.busy = true;
        v970.stage = v971;
        v970.reason = "";
        v895(v970);
        try {
          const v974 = await v972();
          v889(v970);
          return v974;
        } catch (v975) {
          if (!v970.cancelled && v970.op === v973) {
            v970.state = "error";
            v970.reason = v970.started ? "result_unknown" : v794(v975);
          }
          throw v975;
        } finally {
          if (v970.op === v973) {
            v970.busy = false;
            v970.stage = v970.state;
            v895(v970);
          }
        }
      }
      function v897(v976) {
        if (!v976.length) {
          return {};
        }
        if (v976.length !== 1) {
          v793("invalid_arguments");
        }
        return v796(v976[0]);
      }
      function v898(v977, v978, v979) {
        const v980 = v881.get(v977.ticket);
        if (!v980 || v980.kind !== v979 || !v795(v980.scope, v978?.scope) || v978.navId !== v980.navId) {
          v793("stale_ticket");
        }
        v889(v980);
        return v980;
      }
      async function v899(v981) {
        const v982 = v981.socket;
        v981.socket = null;
        v981.reader = null;
        if (v982) {
          await v891(v981, "network.close", {
            ...v890(v981),
            ticket: v982
          }, true);
        }
      }
      async function v900(v983) {
        const v984 = v983.file?.ticket || v983.blob;
        v983.file = null;
        v983.blob = null;
        if (v984) {
          await v891(v983, "blob.release", {
            ...v890(v983),
            ticket: v984
          }, true);
        }
      }
      async function v901(v985, v986) {
        if (v878()?.has?.("app.keepScreenOn")) {
          await v891(v985, "app.keepScreenOn", {
            ...v890(v985),
            on: v986
          }, !v986);
        }
      }
      async function v902(v987) {
        if (v987.diagnosticId) {
          const v988 = v987.diagnosticId;
          v987.diagnosticId = null;
          await v891(v987, "ble.diagnostic.close", {
            navId: v987.navId,
            vin: v987.scope.vin,
            frame: v987.scope.frame,
            leaseId: v987.diagnosticTicket
          }, true).catch(() => {});
          v987.diagnosticTicket = null;
        }
        if (v987.diagnosticLocked) {
          await v891(v987, "ble.stopScan", {
            ...v890(v987)
          }, true).catch(() => {});
        }
        v987.finishDiagnostic?.();
        if (v987.diagnosticWork) {
          await v987.diagnosticWork;
        }
        v987.diagnostic = null;
        v987.devices = [];
      }
      async function v903(v989) {
        if (v989.cancelled) {
          return;
        }
        v989.cancelled = true;
        v989.op++;
        v989.busy = false;
        v989.state = v989.started ? "result_unknown" : "cancelled";
        v989.finishSession?.();
        await Promise.all([v899(v989), v900(v989), v902(v989), v989.handle ? v882.cancel(v989.handle) : null, v989.kind === "ota" ? v901(v989, false) : null]);
        v989.handle = null;
        v989.facts = null;
        v989.otaPassword = "";
        v895(v989);
        v881.delete(v989.ticket);
      }
      async function v904(v990, v991 = false) {
        if (v990.started && !v991) {
          await v892(v990, "meter_ota_interrupt", "中断升级传输？", "升级请求已发出，关闭连接不能撤回刷写，结果可能未知。请保持车辆供电、观察仪表，确认结果前不要直接重试。");
        }
        await v903(v990);
        return {
          ok: true,
          ticket: v990.ticket,
          cancelled: true,
          started: v990.started,
          resultUnknown: v990.started
        };
      }
      async function v905(v992) {
        if (v992.started) {
          v793("result_requires_inspection");
        }
        await v899(v992);
        await v900(v992);
        v992.version = "";
        v992.spec = null;
        v992.state = "reading_file";
        v895(v992);
        let v993 = v796(await v891(v992, "blob.pick", {
          ...v890(v992),
          mime: ["application/octet-stream"],
          extensions: ["bin"],
          maxBytes: v787
        }, false, v995 => v995?.ticket ? v891(v992, "blob.release", {
          ...v890(v992),
          ticket: v995.ticket
        }, true) : null));
        if (typeof v993.ticket !== "string" || !v993.ticket) {
          v793("file_ticket_invalid");
        }
        v992.blob = v993.ticket;
        const v994 = v879() + 900000;
        while (v993.ready !== true) {
          if (v993.error) {
            v793(v993.error.code || "file_failed");
          }
          if (v993.busy !== true || v879() >= v994) {
            v793("file_timeout");
          }
          await v880(150);
          v889(v992);
          v993 = v796(await v891(v992, "blob.poll", {
            ...v890(v992),
            ticket: v992.blob
          }));
          if (v993.ticket !== v992.blob) {
            v793("stale_file");
          }
        }
        if (v993.error || typeof v993.name !== "string" || v993.name.length > 200 || !/\.bin$/i.test(v993.name) || /[/\\\u0000-\u001f\u007f-\u009f]/.test(v993.name) || !/^[a-f0-9]{32}$/.test(v993.md5) || !Number.isSafeInteger(v993.fileSize) || v993.fileSize < 1 || v993.fileSize > v787) {
          v793("firmware_metadata");
        }
        v992.file = Object.freeze({
          ticket: v993.ticket,
          name: v993.name,
          fileSize: v993.fileSize,
          md5: v993.md5,
          pickedAt: v879()
        });
        v992.state = "file_ready";
        v895(v992);
        return v894(v992);
      }
      function v906(v996) {
        if (typeof v996.ssid !== "string" || !/^ZEEHO-[^\u0000-\u001f\u007f]{1,26}$/.test(v996.ssid) || v877.utf8(v996.ssid).length > 32 || v996.carIp && v996.carIp !== "192.168.0.1") {
          v793("wifi_profile_invalid");
        }
        if (v996.type !== "gemini" || v996.hardware !== "AE5I_Gemini_5inch") {
          v793("hardware_confirmation_required");
        }
        if (typeof v996.targetVersion !== "string" || !v996.targetVersion.trim() || v877.utf8(v996.targetVersion).length > 128 || /[\u0000-\u001f\u007f-\u009f]/.test(v996.targetVersion)) {
          v793("target_version_required");
        }
        return Object.freeze({
          ssid: v996.ssid,
          carIp: "192.168.0.1",
          type: "gemini",
          targetVersion: v996.targetVersion.trim()
        });
      }
      function v907(v997, v998) {
        const v999 = v796(v998);
        if (v999.ticket !== v997.socket || v999.targetVerified !== true || v999.connected !== true || v999.ssid !== v997.spec.ssid || v999.ip !== v997.spec.carIp || v999.port !== 10086 || v999.connectionMode !== "wifi") {
          v793("route_not_verified");
        }
      }
      async function v908(v1000, v1001 = v1000.otaPassword || "") {
        await v891(v1000, "wifi.status", {
          ...v890(v1000),
          ssid: v1000.spec.ssid,
          carIp: v1000.spec.carIp
        });
        let v1002 = v796(await v891(v1000, "wifi.isJoined", {
          ...v890(v1000),
          ssid: v1000.spec.ssid,
          carIp: v1000.spec.carIp
        }));
        if (v1002.targetVerified !== true) {
          v1002 = v796(await v891(v1000, "wifi.join", {
            ...v890(v1000),
            ssid: v1000.spec.ssid,
            password: v1001,
            carIp: v1000.spec.carIp,
            joinOnce: false
          }));
        }
        if (v1002.targetVerified !== true) {
          v793("route_not_verified");
        }
        const v1003 = v796(await v891(v1000, "network.open", {
          ...v890(v1000),
          ssid: v1000.spec.ssid,
          carIp: v1000.spec.carIp,
          port: 10086
        }, false, v1004 => v1004?.ticket ? v891(v1000, "network.close", {
          ...v890(v1000),
          ticket: v1004.ticket
        }, true) : null));
        if (typeof v1003.ticket !== "string" || !v1003.ticket) {
          v793("socket_ticket_invalid");
        }
        v1000.socket = v1003.ticket;
        v907(v1000, v1003);
        v1000.reader = new v877.ExactReader(async v1005 => {
          const v1006 = v1000.readDeadline - v879();
          if (v1006 <= 0) {
            v793("response_timeout");
          }
          const v1007 = v796(await v910(v1000, "network.read", {
            ...v890(v1000),
            ticket: v1000.socket,
            length: v1005
          }, Math.min(60000, v1006)));
          if (v1007.ticket !== v1000.socket || v1007.length !== v1005) {
            v793("short_read");
          }
          const v1008 = v877.unbase64(v1007.base64, 65536);
          if (v1008.length !== v1005) {
            v793("short_read");
          }
          return v1008;
        }, () => v889(v1000));
      }
      async function v909(v1009) {
        await v911(v1009, v877.ota.VERSION);
        const v1010 = await v912(v1009, v877.ota.VERSION, 5000);
        let v1011;
        try {
          v1011 = v877.text(v1010).trim();
        } finally {
          v1010.fill(0);
        }
        if (!v1011 || v1011.length > 2048 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/.test(v1011)) {
          v793("ota_version_invalid");
        }
        v1009.readDeadline = 0;
        return v1011;
      }
      async function v910(v1012, v1013, v1014, v1015) {
        v889(v1012);
        let v1016;
        try {
          return await Promise.race([v891(v1012, v1013, {
            ...v1014,
            timeoutMs: v1015
          }), new Promise((v1017, v1018) => {
            v1016 = v785.setTimeout(() => {
              v899(v1012).catch(() => {});
              v1018(Object.assign(new Error("timeout"), {
                code: "timeout"
              }));
            }, v1015);
          })]);
        } finally {
          v785.clearTimeout(v1016);
        }
      }
      async function v911(v1019, v1020, v1021 = new Uint8Array()) {
        const v1022 = v877.lanFrame(v1020, v1021, 0, "ota");
        try {
          const v1023 = v796(await v910(v1019, "network.write", {
            ...v890(v1019),
            ticket: v1019.socket,
            base64: v877.base64(v1022)
          }, 20000));
          if (v1023.ticket !== v1019.socket || v1023.written !== v1022.length) {
            v793("short_write");
          }
        } finally {
          v1022.fill(0);
        }
      }
      async function v912(v1024, v1025, v1026) {
        const v1027 = v879() + v1026;
        v1024.readDeadline = v1027;
        for (let v1028 = 0; v1028 < 1024; v1028++) {
          v889(v1024);
          if (v879() >= v1027) {
            v793("response_timeout");
          }
          const v1029 = await v1024.reader.lan("ota");
          if (v1029.property === v1025) {
            return v1029.body;
          }
          v1029.body.fill(0);
          if (v1029.property !== v877.ota.LOG) {
            v793("ota_response_order");
          }
        }
        v793("ota_log_overflow");
      }
      async function v913(v1030, v1031) {
        if (!v1030.file) {
          v793("file_required");
        }
        if (v1030.started) {
          v793("result_requires_inspection");
        }
        await v899(v1030);
        v1030.spec = v906(v1031);
        v1030.otaPassword = typeof v1031.password === "string" ? v1031.password : "";
        v1030.version = "";
        v1030.state = "reading_version";
        v895(v1030);
        const v1032 = v1030.file;
        if (v879() - v1032.pickedAt >= 840000) {
          await v900(v1030);
          v793("file_expired");
        }
        await v892(v1030, "meter_ota_version", "确认读取当前仪表版本", "热点：" + v1030.spec.ssid + "\n绑定面板车辆：" + v1030.scope.vin + "\n文件：" + v1032.name + "\n" + v1032.fileSize + " 字节 · MD5 " + v1032.md5 + "\n目标版本（你填写）：" + v1030.spec.targetVersion + "\n类型：AE5I · 5 寸 Gemini\n\n当前热点可能不属于所选车辆。版本读取和 MD5 不证明硬件适配、文件真实性或签名。此步骤只读取版本，不发升级请求。");
        try {
          await v908(v1030);
          v1030.version = await v909(v1030);
          await v899(v1030);
          v1030.state = "version_ready";
          v895(v1030);
          return v894(v1030);
        } catch (v1033) {
          await v899(v1030);
          throw v1033;
        }
      }
      function v914(v1034) {
        if (!v1034.length) {
          return "（空响应）";
        }
        try {
          const v1035 = v877.text(v1034);
          if (!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/.test(v1035)) {
            return v1035.slice(0, 2048);
          }
        } catch {}
        return "HEX: " + Array.from(v1034.subarray(0, 256), v1036 => v1036.toString(16).padStart(2, "0")).join("");
      }
      async function v915(v1037) {
        if (!v1037.file || !v1037.version || v1037.socket || v1037.state !== "version_ready" || v1037.started) {
          v793("version_read_required");
        }
        const v1038 = v1037.file;
        if (v879() - v1038.pickedAt >= 840000) {
          await v900(v1037);
          v793("file_expired");
        }
        const v1039 = v1037.version;
        await v892(v1037, "meter_ota_start", "确认 OTA_START：向当前仪表刷写", "热点：" + v1037.spec.ssid + "\n绑定面板车辆：" + v1037.scope.vin + "\n仪表原版本：" + v1039.slice(0, 256) + "\n目标版本（你填写，未验证）：" + v1037.spec.targetVersion + "\n文件：" + v1038.name + "\n" + v1038.fileSize + " 字节 · MD5 " + v1038.md5 + "\n类型：AE5I · 5 寸 Gemini\n\n我已核对这是自己的匹配仪表和升级包。工具没有验签或确认硬件兼容。错误文件、断电、离页或断网可能变砖，START 发出后无法撤回。保持本页、车辆供电和 Wi-Fi，收到 VERIFY 也不代表升级成功。");
        if (v879() - v1038.pickedAt >= 840000) {
          await v900(v1037);
          v793("file_expired");
        }
        const v1040 = v796(await v891(v1037, "blob.poll", {
          ...v890(v1037),
          ticket: v1038.ticket
        }));
        if (v1040.ready !== true || v1040.ticket !== v1038.ticket || v1040.name !== v1038.name || v1040.fileSize !== v1038.fileSize || v1040.md5 !== v1038.md5) {
          v793("stale_file");
        }
        await v908(v1037);
        const v1041 = await v909(v1037);
        if (v1041 !== v1039) {
          await v899(v1037);
          v793("ota_version_changed");
        }
        v907(v1037, await v891(v1037, "network.poll", {
          ...v890(v1037),
          ticket: v1037.socket
        }));
        await v901(v1037, true);
        try {
          v889(v1037);
          v1037.started = true;
          v1037.state = "transferring";
          v895(v1037);
          await v911(v1037, v877.ota.START, v877.utf8(JSON.stringify({
            size: v1038.fileSize,
            md5: v1038.md5,
            name: v1038.name,
            type: "gemini"
          })));
          const v1042 = await v912(v1037, v877.ota.PREPARE, 15000);
          v1042.fill(0);
          for (let v1044 = 0; v1044 < v1038.fileSize;) {
            v889(v1037);
            const v1045 = Math.min(65536, v1038.fileSize - v1044);
            const v1046 = v796(await v891(v1037, "blob.read", {
              ...v890(v1037),
              ticket: v1038.ticket,
              offset: v1044,
              length: v1045
            }));
            if (v1046.ticket !== v1038.ticket || v1046.length !== v1045 || v1046.eof !== (v1044 + v1045 === v1038.fileSize)) {
              v793("firmware_size_changed");
            }
            const v1047 = v877.unbase64(v1046.base64, 65536);
            if (v1047.length !== v1045) {
              v793("firmware_size_changed");
            }
            try {
              for (let v1048 = 0; v1048 < v1047.length; v1048 += 4096) {
                const v1049 = v1047.subarray(v1048, Math.min(v1048 + 4096, v1047.length));
                await v911(v1037, v877.ota.PROGRESS, v1049);
                v1037.sent += v1049.length;
                const v1050 = Math.floor(v1037.sent * 100 / v1038.fileSize);
                if (v1037.progress !== v1050) {
                  v1037.progress = v1050;
                  v895(v1037);
                }
              }
            } finally {
              v1047.fill(0);
            }
            v1044 += v1045;
          }
          if (v1037.sent !== v1038.fileSize) {
            v793("firmware_size_changed");
          }
          v1037.state = "waiting_verify";
          v895(v1037);
          await v911(v1037, v877.ota.END);
          const v1043 = await v912(v1037, v877.ota.VERIFY, 60000);
          try {
            v1037.verifyResponse = v914(v1043);
          } finally {
            v1043.fill(0);
          }
          v1037.state = "verify_response";
          v895(v1037);
          return v894(v1037);
        } finally {
          await v899(v1037);
          await v901(v1037, false);
        }
      }
      function v916(v1051, v1052) {
        const v1053 = v917(v1051, v1052);
        if (v1053) {
          return v877.fromHex(v1053, 240);
        } else {
          return new Uint8Array();
        }
      }
      function v917(v1054, v1055) {
        let v1056 = v1054.hex ?? "";
        if (Array.isArray(v1054.fields) && v1055.fields?.length) {
          if (v1054.fields.length !== v1055.fields.length) {
            v793("debug_field:count");
          }
          v1056 = Array.from(v808(v877, v1055.fields, v1054.fields), v1059 => v1059.toString(16).padStart(2, "0")).join("");
        }
        if (typeof v1056 !== "string") {
          v793("debug_payload");
        }
        const v1057 = v1056.replace(/\s/g, "");
        const v1058 = v1057 ? v877.fromHex(v1057, 240) : new Uint8Array();
        if (v1055.opcode === 113 && v1058.length && (v1058.length < 2 || v1058[0] !== 8 || v1058[1] > 6)) {
          v793("charge_power_range");
        }
        if (v1055.opcode === 119 && (v1058.length !== 10 || v1058[0] !== 10 || v1058[1] !== 8)) {
          v793("bind_device_id_shape");
        }
        if (v1055.opcode === 118) {
          if (!v1058.length) {
            v793("driving_mode_required");
          }
          if (v1058[0] !== 8 || v1058.length !== 2) {
            v793("driving_mode_format");
          }
          if (v1058[1] > 3) {
            v793("driving_mode_range");
          }
        }
        if ((v1055.opcode === 106 || v1055.opcode === 107 || v1055.opcode === 103) && !v1058.length) {
          v793("payload_all_default");
        }
        return v1057;
      }
      function v918(v1060) {
        const v1061 = v1060?.telemetry?.speedKph;
        const v1062 = v1060?.telemetryTimes?.speedKph;
        if (typeof v1061 !== "number" || !Number.isFinite(v1061) || v1061 < 0) {
          v793("vehicle_speed_unknown");
        }
        if (!Number.isSafeInteger(v1062) || v1062 <= 0 || v1062 > v879() || v879() - v1062 > 5000) {
          v793("vehicle_speed_stale");
        }
        if (v1061 > 3) {
          v793("vehicle_moving");
        }
      }
      function v919(v1063, v1064) {
        if (!v1063.handle || v1064?.authenticated !== true || v1064.connected !== true || v1064.generation !== v1063.handle.generation) {
          v793("protocol_unverified");
        }
      }
      async function v920(v1065) {
        const v1066 = v1065.handle;
        if (!v1066) {
          v793("connect_first");
        }
        const v1067 = v796(await v882.poll(v1066));
        v889(v1065);
        const v1068 = typeof v1066.snapshot === "function" ? v796(v1066.snapshot()) : v1067;
        if (v1065.handle !== v1066) {
          v793("stale_tool_session");
        }
        return {
          ...v1067,
          ...v1068,
          telemetry: {
            ...v1068.telemetry
          },
          telemetryTimes: {
            ...v1068.telemetryTimes
          }
        };
      }
      async function v921(v1069, v1070 = {}) {
        if (v1069.handle || v1069.sessionWork || v1069.diagnosticWork || v1069.diagnosticLocked) {
          v793("session_busy");
        }
        if (v1070?.webUi !== true) {
          await v892(v1069, "bt_debug_connect", "连接本人车辆的调试会话", "此工具使用当前账号与车辆的已验证 BLE1 认证，不从系统配对状态推断协议认证。连接本身不授权任何危险指令。每条命令都需要再次确认。");
        }
        let v1071;
        let v1072;
        const v1073 = new Promise((v1074, v1075) => {
          v1071 = v1074;
          v1072 = v1075;
        });
        v1069.sessionWork = v882.withSession(v1069.context, "telemetry", async v1076 => {
          v1069.handle = v1076;
          try {
            v889(v1069);
            v1069.facts = await v920(v1069);
            v889(v1069);
            v919(v1069, v1069.facts);
            v1069.state = "connected";
            v895(v1069);
            v1071(v894(v1069));
            await new Promise(v1077 => {
              v1069.finishSession = v1077;
              if (v1069.cancelled) {
                v1077();
              }
            });
          } catch (v1078) {
            v1072(v1078);
            throw v1078;
          } finally {
            v1069.handle = null;
            v1069.finishSession = null;
          }
        }).catch(v1079 => {
          v1072(v1079);
          if (!v1069.cancelled) {
            v1069.reason = v794(v1079);
            v1069.state = "error";
            v895(v1069);
          }
        }).finally(() => {
          v1069.sessionWork = null;
        });
        return v1073;
      }
      async function v922(v1080, v1081) {
        const v1082 = v877.int(Number(v1081.opcode), 0, 255);
        let v1083 = v807.find(v1086 => v1086.opcode === v1082);
        if (v1083 && !v1083.sendable) {
          v793("receive_only_opcode");
        }
        if (!v1083) {
          v1083 = v797(v1082, "unknown", "未知 opcode 原始探测", "(no_schema)", "danger", v877.int(Number(v1081.expected ?? 0), 0, 255), 6000, "未知命令风险不可预判，只允许人工原始探测；没有协议或功能完成证明。");
        }
        const v1084 = v916(v1081, v1083);
        const v1085 = v877.int(Number(v1081.timeoutMs ?? v1083.timeoutMs), 1, 60000);
        try {
          if (!v1080.handle) {
            v793("connect_first");
          }
          v1080.facts = await v920(v1080);
          v889(v1080);
          v919(v1080, v1080.facts);
          if (v1083.risk === "danger") {
            v918(v1080.facts);
          }
          if (v1081?.webUi !== true) {
            const v1088 = v917(v1081, v1083);
            await v892(v1080, "bt_debug_" + v1082, "确认发送 " + v1083.label + " (" + v1082 + ")", v1083.schema + "\n载荷：" + v1084.length + " 字节\nHEX：" + (v1088.slice(0, 480) || "（空载荷）") + "\n" + (v1083.warning || "会向当前车辆发送原始蓝牙指令。") + "\n\n此确认仅授权这一条指令，不会自动重发；写完成或 ACK 不保证车辆状态已生效。");
          }
          v1080.facts = await v920(v1080);
          v889(v1080);
          v919(v1080, v1080.facts);
          if (v1083.risk === "danger") {
            v918(v1080.facts);
          }
          if (typeof v1080.handle.exchangeRaw !== "function") {
            v793("raw_transport_unavailable");
          }
          const v1087 = await v1080.handle.exchangeRaw(v1082, v1084, {
            expected: v1083.expected,
            timeoutMs: v1085
          });
          v889(v1080);
          if (v1083.expected) {
            if (v1087?.command !== v1083.expected || !(v1087.payload instanceof Uint8Array)) {
              v793("debug_ack_invalid");
            }
            try {
              v1080.lastResponse = {
                opcode: v1087.command,
                hex: Array.from(v1087.payload, v1089 => v1089.toString(16).padStart(2, "0")).join(""),
                received: true,
                vehicleEffectVerified: false
              };
            } finally {
              v1087.payload.fill(0);
            }
          } else {
            v1080.lastResponse = {
              opcode: v1082,
              received: false,
              transportOnly: true,
              vehicleEffectVerified: false
            };
          }
          if ([90, 92].includes(v1082)) {
            v1080.finishSession?.();
            await v882.cancel(v1080.handle);
            v1080.handle = null;
            v1080.facts = null;
            v1080.state = "reauthentication_required";
          } else {
            v1080.state = "connected";
          }
          v895(v1080);
          return v894(v1080);
        } finally {
          v1084.fill(0);
        }
      }
      async function v923(v1090) {
        await v892(v1090, "ble2_diagnostics", "只读 BLE2 诊断", "仅读取当前连接状态和 GATT 服务列表，不发送认证、导航、音效或车控。B360 独立协议尚未闭环，系统配对不代表协议认证。");
        const v1091 = v796(await v891(v1090, "ble.status", {
          ...v890(v1090)
        }));
        let v1092 = [];
        if (v1091.connected === true && v1091.role === 2 && typeof v1091.id === "string") {
          const v1093 = v796(await v891(v1090, "ble.services", {
            ...v890(v1090),
            id: v1091.id
          }));
          v1092 = v1093.services || [];
        }
        return {
          ok: true,
          readOnly: true,
          connected: v1091.connected === true && v1091.role === 2,
          role: 2,
          services: v1092,
          systemBondState: "unknown_os_managed",
          protocolVerified: false,
          navigationSupported: false,
          soundUploadSupported: false,
          authenticationSupported: false,
          connectionSelectionSupported: false,
          reason: v1091.role === 2 && v1091.connected ? "read_only_service_diagnostic" : "ble2_select_in_native_diagnostics"
        };
      }
      async function v924(v1094) {
        if (v1094.handle || v1094.sessionWork) {
          v793("session_busy");
        }
        if (v1094.diagnosticLocked) {
          return;
        }
        if (v1094.diagnosticWork) {
          v793("session_busy");
        }
        let v1095;
        let v1096;
        const v1097 = new Promise((v1098, v1099) => {
          v1095 = v1098;
          v1096 = v1099;
        });
        v1094.diagnosticWork = v882.withDiagnostic(v1094.context, async () => {
          v1094.diagnosticLocked = true;
          try {
            v889(v1094);
            v1095();
            await new Promise(v1100 => {
              v1094.finishDiagnostic = v1100;
              if (v1094.cancelled) {
                v1100();
              }
            });
          } catch (v1101) {
            v1096(v1101);
            throw v1101;
          } finally {
            v1094.diagnosticLocked = false;
            v1094.finishDiagnostic = null;
          }
        }).catch(v1102 => {
          v1096(v1102);
          if (!v1094.cancelled) {
            v1094.reason = v794(v1102);
            v895(v1094);
          }
        }).finally(() => {
          v1094.diagnosticWork = null;
        });
        await v1097;
      }
      async function v925(v1103) {
        await v892(v1103, "ble2_diagnostic_scan", "扫描只读 BLE2 服务", "只扫描明确的 BLE2 诊断服务。iOS 设备 ID 是 CoreBluetooth UUID，不是车辆 MAC，也不证明它属于面板中所选 VIN。随后请明确选择自己的设备。");
        await v924(v1103);
        const v1104 = v796(await v891(v1103, "ble.status", {
          ...v890(v1103)
        }));
        if (v1104.diagnosticReady !== true || v1104.role2ReadOnly !== true) {
          v793("diagnostic_unavailable");
        }
        if (v1104.connected === true) {
          v793("session_busy");
        }
        const v1105 = v796(await v891(v1103, "ble.scan", {
          ...v890(v1103),
          confirmed: true,
          timeoutMs: 8000,
          services: [v792]
        }));
        v1103.devices = (v1105.devices || []).filter(v1106 => typeof v1106.id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v1106.id) && v1106.connectable !== false && v1106.roles?.includes(2)).slice(0, 40).map(v1107 => ({
          id: v1107.id,
          name: typeof v1107.name === "string" ? v1107.name.slice(0, 80) : "",
          rssi: Number.isFinite(v1107.rssi) ? v1107.rssi : null
        }));
        v1103.deviceScanAt = v879();
        v1103.state = "diagnostic_select";
        v895(v1103);
        return v894(v1103);
      }
      const v926 = v1108 => ({
        navId: v1108.navId,
        vin: v1108.scope.vin,
        frame: v1108.scope.frame,
        leaseId: v1108.diagnosticTicket
      });
      function v927(v1109, v1110) {
        if (typeof v1110.generation !== "string" || typeof v1110.id !== "string" || v1110.id.toLowerCase() !== v1109.diagnosticId?.toLowerCase() || v1110.leaseId !== v1109.diagnosticTicket || v1110.readOnly !== true || v1110.diagnosticOnly !== true || v1110.canWrite !== false || v1110.authenticated !== false || v1110.role !== 2 || v1110.connected !== true || v1110.generation !== v1109.diagnosticGeneration) {
          v793("stale_diagnostic");
        }
        return {
          ok: true,
          readOnly: true,
          connected: true,
          role: 2,
          services: v1110.services || [],
          rssi: Number.isFinite(v1110.rssi) ? v1110.rssi : null,
          rssiAt: Number.isSafeInteger(v1110.rssiAt) ? v1110.rssiAt : null,
          systemBondState: "unknown_os_managed",
          protocolVerified: false,
          navigationSupported: false,
          soundUploadSupported: false,
          authenticationSupported: false,
          connectionSelectionSupported: true,
          reason: "read_only_service_diagnostic"
        };
      }
      async function v928(v1111, v1112) {
        if (!v1111.diagnosticLocked || v1111.handle || v1111.diagnosticId) {
          v793("session_busy");
        }
        if (typeof v1112.id !== "string" || !v1111.devices?.some(v1114 => v1114.id.toLowerCase() === v1112.id.toLowerCase()) || v879() < v1111.deviceScanAt || v879() - v1111.deviceScanAt > 60000) {
          v793("diagnostic_selection_required");
        }
        await v892(v1111, "ble2_diagnostic_connect", "确认连接所选只读 BLE2 设备", "设备 ID：" + v1112.id + "\n面板车辆：" + v1111.scope.vin + "\n\n我已确认该设备属于自己的车辆。只发现服务与属性，不发送认证、导航、音效或车控。系统配对与服务可见都不代表协议认证。");
        const v1113 = v796(await v891(v1111, "ble.diagnostic.open", {
          navId: v1111.navId,
          vin: v1111.scope.vin,
          frame: v1111.scope.frame,
          id: v1112.id,
          service: v792
        }, false, v1115 => v1115?.leaseId ? v891(v1111, "ble.diagnostic.close", {
          navId: v1111.navId,
          vin: v1111.scope.vin,
          frame: v1111.scope.frame,
          leaseId: v1115.leaseId
        }, true) : null));
        if (typeof v1113.leaseId !== "string" || !v1113.leaseId || typeof v1113.generation !== "string" || !v1113.generation) {
          v793("diagnostic_receipt_invalid");
        }
        v1111.diagnosticId = v1112.id;
        v1111.diagnosticTicket = v1113.leaseId;
        v1111.diagnosticGeneration = v1113.generation;
        v1111.diagnostic = v927(v1111, v1113);
        v1111.state = "diagnostic_connected";
        v895(v1111);
        return v894(v1111);
      }
      async function v929(v1116) {
        if (!v1116.diagnosticId || !v1116.diagnosticLocked) {
          v793("diagnostic_connect_first");
        }
        v1116.diagnostic = v927(v1116, v796(await v891(v1116, "ble.diagnostic.poll", v926(v1116))));
        v895(v1116);
        return v894(v1116);
      }
      const v930 = v1117 => v785.MODEL?.esc?.(String(v1117)) ?? String(v1117).replace(/[&<>"']/g, v1118 => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      })[v1118]);
      const v931 = v1119 => ({
        ready: "等待操作",
        reading_file: "正在复制文件并流式计算 MD5",
        file_ready: "文件已就绪，请核对热点及目标版本",
        reading_version: "正在连接并读取仪表版本",
        version_ready: "已读取当前版本，请再次确认后推送",
        transferring: "正在传输",
        waiting_verify: "传输结束，等待仪表校验原响应",
        connected: "蓝牙已连接并完成本会话认证",
        diagnostic_select: "已扫描，请明确选择自己的 BLE2 设备",
        diagnostic_connected: "已连接只读 BLE2 诊断，不具备认证或导航功能",
        reauthentication_required: "原始认证重放后已断开，请重新连接",
        cancelled: "已取消，未发送升级请求",
        error: "操作已停止",
        result_unknown: "请求已发出，结果未知，勿直接重试"
      })[v1119] || v1119;
      const v932 = v1120 => ({
        user_cancelled: "你已取消确认",
        firmware_metadata: "请选择有效的本地 .bin（1 字节至 512 MiB）",
        unavailable: "所需原生能力尚未全部可用",
        stale_session: "车辆或页面已改变，旧操作已停止",
        stale_ticket: "旧票据已失效，请重新打开工具",
        route_not_verified: "无法验证当前仪表热点，请核对准确 SSID、供电与 Wi-Fi 连接",
        hardware_confirmation_required: "请先核对 AE5I · 5 寸 Gemini 硬件",
        target_version_required: "请填写升级包说明中的目标版本，工具不替你判断",
        file_required: "请先选择本地 .bin 文件",
        version_read_required: "请先读取当前仪表版本，不能跳过二次确认",
        file_timeout: "文件复制或摘要计算超时",
        connect_first: "请先连接本人车辆的调试会话",
        protocol_unverified: "没有本会话协议认证证明，拒绝发送",
        vehicle_speed_unknown: "无法确认当前车速，拒绝危险指令",
        vehicle_speed_stale: "车速超过 5 秒或时间在未来，拒绝危险指令",
        vehicle_moving: "车辆速度高于 3 km/h，拒绝危险指令",
        charge_power_range: "充电功率只允许已知枚举 0–6",
        payload_all_default: "所有字段都是默认值（0），整帧会变成空消息，车不知道该做什么，所以没有发送。请至少填一个非零字段。",
        driving_mode_required: "driving_mode 不能留空：空消息等于 0（助力推行），不是“不改”。请填 1–3。",
        driving_mode_range: "driving_mode 只允许 1–3（0 会让车进助力推行）。",
        driving_mode_format: "driving_mode 要填一个整数。",
        bind_device_id_required: "绑定标识不能留空，必须是 8 字节。",
        bind_device_id_shape: "绑定标识必须是 field1 的恰好 8 字节",
        receive_only_opcode: "这项是车到 App 的上报，不能发送",
        diagnostic_selection_required: "请从 60 秒内的扫描列表明确选择自己的设备",
        diagnostic_connect_first: "请先连接只读诊断设备",
        stale_diagnostic: "诊断票据或连接代际已改变，旧响应已拒绝",
        diagnostic_receipt_invalid: "原生未返回有效只读诊断票据",
        session_busy: "已有同类会话，请先关闭它",
        result_unknown: "升级请求已发出，结果未知。保持供电，检查仪表，勿直接重试。",
        timeout: "操作超时，连接已停止",
        response_timeout: "仪表应答超时，连接已停止",
        ota_response_order: "仪表应答顺序异常，已停止传输"
      })[v1120] || "操作已停止（" + v1120 + "）";
      async function v933(v1121) {
        if (v1121.cancelled) {
          return;
        }
        if (v1121.started && v1121.context.isCurrent?.() === true && v785.document?.hidden !== true) {
          try {
            await v904(v1121);
          } catch (v1122) {
            if (v1121.context.isCurrent?.() === true && !v1121.cancelled && v785.document?.hidden !== true) {
              v1121.reason = v794(v1122);
              v934(v1121);
            } else {
              await v903(v1121);
            }
          }
        } else {
          await v903(v1121);
        }
      }
      function v934(v1123) {
        const v1124 = v1123.kind === "ota";
        const v1125 = (v1129, v1130, v1131 = "", v1132 = "text") => "<label>" + v930(v1130) + "<input type=\"" + v1132 + "\" class=\"form-control\" data-tool-input=\"" + v1129 + "\" value=\"" + v930(v1131) + "\"></label>";
        const v1126 = (v1133, v1134) => "<button type=\"button\" class=\"btn\" data-tool-action=\"" + v1133 + "\">" + v1134 + "</button>";
        const v1127 = v1124 ? "<section class=\"card\"><p>仅适用于 AE5I · 5 寸 Sunplus Gemini，不适用于 AE3 或其它仪表。</p>\n        <p>选择自己核对来源的本地 .bin。保持车辆供电和本页打开。此工具不下载、提取或验签固件。</p>\n        " + v1125("ssid", "仪表热点（请准确填写 ZEEHO-xxxx）") + v1125("password", "热点密码（已在系统连接可留空）", "", "password") + v1125("targetVersion", "目标版本（升级包说明，工具无法验证）") + "\n        <label><input type=\"checkbox\" data-tool-input=\"hardware\"> 我已核对自己的 AE5I · 5 寸 Gemini 仪表与升级包</label>\n        <div class=\"actions\">" + v1126("pick", "选择本地 .bin") + v1126("version", "连接热点并确认读取版本") + v1126("push", "再次确认并推送") + "</div>\n        <pre data-tool-file>尚未选择文件</pre><progress data-tool-progress max=\"100\" value=\"0\" aria-label=\"固件传输进度\"></progress>\n        <pre data-tool-version></pre><p data-tool-status role=\"status\" aria-live=\"polite\"></p>\n        <p>版本查询和 MD5 不验证真实性或硬件适配。VERIFY 只展示原响应，不代表刷写成功。START 发出后的断线结果可能未知，检查仪表前不要直接重试。</p></section>" : "<section class=\"card\"><p>BLE1 原始调试：每条发送单独确认。危险指令仅接受本会话 5 秒内非未来的 F3 速度 ≤ 3 km/h；系统配对不算协议认证。</p>\n        <div class=\"actions\">" + v1126("connect", "连接并认证本人车辆") + v1126("poll", "刷新遥测") + v1126("disconnect", "断开 BLE1 会话") + v1126("diagnostics", "只读 BLE2 状态") + "</div>\n        <details><summary>BLE2 只读服务诊断（不认证、不写入）</summary><div class=\"actions\">" + v1126("diagnosticsScan", "扫描 BLE2 诊断服务") + v1126("diagnosticsConnect", "确认连接选中设备") + v1126("diagnosticsPoll", "刷新诊断") + v1126("diagnosticsClose", "断开诊断") + "</div>\n        <label>明确选择自己的 CoreBluetooth 设备<select class=\"form-control\" data-tool-device><option value=\"\">请先扫描，不自动选择设备</option></select></label><p>设备 ID 不是 MAC，也不证明归属所选车辆。只发现 B555 服务与属性，不订阅未知 B360 通道。</p><pre data-tool-diagnostic></pre></details>\n        <label>命令<select class=\"form-control\" data-tool-command>" + v807.map(v1135 => "<option value=\"" + v1135.opcode + "\">" + v930(v1135.opcode + " · " + v1135.label + (v1135.sendable ? "" : "（仅接收）")) + "</option>").join("") + "<option value=\"custom\">未知 opcode（危险原始探测）</option></select></label>\n        " + v1125("opcode", "自定义 opcode（0–255）") + v1125("expected", "自定义预期回执（0=只等写完成）", "0") + "\n        <p data-tool-schema></p>\n        <div data-tool-form></div>\n        <div data-tool-presets class=\"actions\"></div>\n        " + v1125("hex", "原始 payload HEX（最多 240 字节）") + "\n        <p data-tool-preview class=\"muted\"></p>\n        " + v1126("send", "确认发送这一条") + "<pre data-tool-facts></pre><p data-tool-status role=\"status\" aria-live=\"polite\"></p>\n        <p>BLE2/B360 未验证认证和导航；19 音效只有原始小帧调试，未知分包不提供文件上传。ACK 不证明持久登记或实际动作成功。</p></section>";
        const v1128 = v883();
        v1123.page = v1128.sheet(v876.host?.() || v785.APP.phone(), {
          key: "ios-vehicle-tools-" + v1123.ticket,
          title: v1124 ? "AE5I 仪表 Wi-Fi OTA" : "蓝牙原始调试台",
          full: true,
          page: true,
          closeMode: "current",
          body: v1127 + ("<div class=\"actions\">" + v1126("close", "取消 / 返回") + "</div>"),
          onDismiss: () => {
            v933(v1123).catch(() => {});
          },
          onMount(v1136) {
            v1123.root = v1136;
            v1123.render = v1138 => {
              if (v1123.cancelled || v1123.context.isCurrent?.() !== true) {
                return;
              }
              v1136.querySelectorAll("[data-tool-action]").forEach(v1140 => {
                v1140.disabled = v1138.busy && v1140.dataset.toolAction !== "close";
              });
              const v1139 = v1136.querySelector("[data-tool-status]");
              v1139.textContent = v1138.reason ? v932(v1138.reason) : v1138.state === "verify_response" ? "已收到校验原响应，不代表升级成功。\n" + v1138.verifyResponse : v1138.started ? "升级请求已发出 · " + v1138.progress + "% · " + v931(v1138.state) + "。断线不能撤回刷写，结果可能未知。" : v931(v1138.state);
              if (v1124) {
                v1136.querySelector("[data-tool-file]").textContent = v1138.file ? v1138.file.name + "\n" + v1138.file.fileSize + " 字节\nMD5: " + v1138.file.md5 + "（不是验签）" : "尚未选择文件";
                v1136.querySelector("[data-tool-progress]").value = v1138.progress;
                v1136.querySelector("[data-tool-version]").textContent = v1138.version ? "仪表返回版本：" + v1138.version : "";
                for (const v1141 of ["ssid", "password", "targetVersion", "hardware"]) {
                  v1136.querySelector("[data-tool-input=\"" + v1141 + "\"]").disabled = v1138.busy || v1138.started;
                }
              } else {
                v1136.querySelector("[data-tool-facts]").textContent = JSON.stringify({
                  authenticated: v1138.authenticated,
                  systemBondState: v1138.systemBondState,
                  telemetry: v1138.telemetry,
                  telemetryTimes: v1138.telemetryTimes,
                  response: v1138.lastResponse
                }, null, 2);
                const v1142 = v807.find(v1145 => String(v1145.opcode) === v1136.querySelector("[data-tool-command]").value);
                v1136.querySelector("[data-tool-action=\"send\"]").disabled = v1138.busy || v1142?.sendable === false || !!v1123.diagnosticLocked;
                v1136.querySelector("[data-tool-action=\"connect\"]").disabled = v1138.busy || !!v1123.diagnosticLocked;
                const v1143 = v1136.querySelector("[data-tool-device]");
                const v1144 = JSON.stringify(v1138.devices);
                if (v1143.dataset.key !== v1144) {
                  const v1146 = v1143.value;
                  v1143.dataset.key = v1144;
                  v1143.innerHTML = "<option value=\"\">请明确选择自己的设备</option>" + v1138.devices.map(v1147 => "<option value=\"" + v930(v1147.id) + "\">" + v930((v1147.name || "未命名设备") + " · " + v1147.id + (v1147.rssi !== null ? " · " + v1147.rssi + " dBm" : "")) + "</option>").join("");
                  if (v1138.devices.some(v1148 => v1148.id === v1146)) {
                    v1143.value = v1146;
                  }
                }
                v1136.querySelector("[data-tool-diagnostic]").textContent = v1138.diagnostic ? JSON.stringify(v1138.diagnostic, null, 2) : "";
                for (const v1149 of ["diagnosticsScan", "diagnosticsConnect", "diagnosticsPoll", "diagnosticsClose"]) {
                  v1136.querySelector("[data-tool-action=\"" + v1149 + "\"]").disabled = v1138.busy || !v887("btDebug." + v1149);
                }
              }
            };
            const v1137 = v1150 => v1136.querySelector("[data-tool-input=\"" + v1150 + "\"]").value;
            if (!v1124) {
              const v1151 = v1136.querySelector("[data-tool-command]");
              const v1152 = v1136.querySelector("[data-tool-form]");
              const v1153 = v1136.querySelector("[data-tool-presets]");
              const v1154 = v1136.querySelector("[data-tool-preview]");
              const v1155 = v1136.querySelector("[data-tool-input=\"hex\"]");
              let v1156 = {};
              const v1157 = () => {
                const v1160 = v807.find(v1161 => String(v1161.opcode) === v1151.value);
                if (!v1160 || !v1160.fields.length) {
                  v1154.textContent = "";
                  return;
                }
                try {
                  const v1162 = v808(v877, v1160.fields, v1160.fields.map(v1163 => v1156[v1163.number] ?? v1163.initial));
                  v1154.textContent = v1162.length ? "将发送 " + v1162.length + " 字节：" + Array.from(v1162, v1164 => v1164.toString(16).padStart(2, "0")).join("") : "将发送 0 字节（空载荷）";
                  v1154.dataset.bad = "";
                } catch (v1165) {
                  const [v1166, v1167] = String(v1165?.code || "").split(":");
                  v1154.textContent = "参数不合法：" + (v805(v1167) || v1166);
                  v1154.dataset.bad = "1";
                }
              };
              const v1158 = () => {
                const v1168 = v807.find(v1169 => String(v1169.opcode) === v1151.value);
                v1156 = {};
                v1152.innerHTML = "";
                v1153.innerHTML = "";
                v1155.closest("label").style.display = "";
                if (!v1168) {
                  v1157();
                  return;
                }
                if (!v1168.fields.length) {
                  v1157();
                  return;
                }
                v1155.closest("label").style.display = "none";
                for (const v1170 of v1168.fields) {
                  v1156[v1170.number] = v1170.initial;
                  const v1171 = v785.document.createElement("label");
                  v1171.textContent = v1170.name + " · " + v1170.label;
                  const v1172 = v785.document.createElement("input");
                  v1172.type = "text";
                  v1172.className = "form-control";
                  v1172.dataset.toolField = String(v1170.number);
                  v1172.value = v1170.initial;
                  if (v1170.type === "number") {
                    v1172.inputMode = "numeric";
                    v1172.pattern = "[0-9]*";
                  }
                  v1172.addEventListener("input", () => {
                    v1156[v1170.number] = v1172.value;
                    v1157();
                  });
                  v1171.appendChild(v1172);
                  v1152.appendChild(v1171);
                }
                for (const [v1173, v1174] of v1168.presets) {
                  const v1175 = v785.document.createElement("button");
                  v1175.type = "button";
                  v1175.className = "btn";
                  v1175.textContent = v1173;
                  v1175.addEventListener("click", () => {
                    v806(v1174, v1168.fields, v1156);
                    for (const v1176 of v1168.fields) {
                      const v1177 = v1152.querySelector("[data-tool-field=\"" + v1176.number + "\"]");
                      if (v1177) {
                        v1177.value = v1156[v1176.number] ?? "";
                      }
                    }
                    v1157();
                  });
                  v1153.appendChild(v1175);
                }
                v1157();
              };
              const v1159 = () => {
                const v1178 = v807.find(v1179 => String(v1179.opcode) === v1151.value);
                v1136.querySelector("[data-tool-schema]").textContent = v1178 ? v1178.schema + "\n" + (v1178.warning || "") : "未知风险，默认按危险指令处理。";
                v1136.querySelector("[data-tool-action=\"send\"]").disabled = v1178?.sendable === false;
                v1158();
              };
              v1151.addEventListener("change", v1159);
              v1159();
              v1123.debugForm = () => {
                const v1180 = v807.find(v1181 => String(v1181.opcode) === v1151.value);
                if (!v1180 || !v1180.fields.length) {
                  return null;
                }
                return v1180.fields.map(v1182 => v1156[v1182.number] ?? v1182.initial);
              };
              v1123.debugCustom = () => v1151.value === "custom";
            }
            v1136.querySelectorAll("[data-tool-action]").forEach(v1183 => v1183.addEventListener("click", async () => {
              const v1184 = v1183.dataset.toolAction;
              try {
                if (v1184 === "close") {
                  await v904(v1123);
                  v1128.closeSheet(v1123.page);
                  return;
                }
                if (v1184 === "disconnect") {
                  v1123.finishSession?.();
                  if (v1123.handle) {
                    await v882.cancel(v1123.handle);
                  }
                  if (v1123.sessionWork) {
                    await v1123.sessionWork;
                  }
                  v1123.handle = null;
                  v1123.facts = null;
                  v1123.state = "ready";
                  v895(v1123);
                  return;
                }
                const v1185 = v1124 ? "meterOta." + v1184 : "btDebug." + (v1184 === "poll" ? "status" : v1184);
                const v1186 = {
                  ticket: v1123.ticket
                };
                if (v1124 && v1184 === "version") {
                  Object.assign(v1186, {
                    ssid: v1137("ssid"),
                    password: v1137("password"),
                    targetVersion: v1137("targetVersion"),
                    hardware: v1136.querySelector("[data-tool-input=\"hardware\"]").checked ? "AE5I_Gemini_5inch" : "",
                    type: "gemini"
                  });
                }
                if (!v1124 && v1184 === "send") {
                  const v1188 = v1123.debugForm?.();
                  Object.assign(v1186, {
                    opcode: v1123.debugCustom() ? v1137("opcode") : v1136.querySelector("[data-tool-command]").value,
                    expected: v1137("expected")
                  });
                  if (v1188) {
                    v1186.fields = v1188;
                  } else {
                    v1186.hex = v1137("hex");
                  }
                }
                if (!v1124 && v1184 === "diagnosticsConnect") {
                  v1186.id = v1136.querySelector("[data-tool-device]").value;
                }
                const v1187 = await v936(v1185, [v1186], v1123.context);
                if (v1184 === "diagnostics" && !v1123.cancelled) {
                  v1136.querySelector("[data-tool-facts]").textContent = JSON.stringify(v1187, null, 2);
                }
              } catch (v1189) {
                if (!v1123.cancelled) {
                  v1123.reason = v1123.started ? "result_unknown" : v794(v1189);
                  v895(v1123);
                }
              }
            }));
            v895(v1123);
          }
        });
        return v894(v1123);
      }
      function v935(v1190, v1191, v1192) {
        if (v1190 === "openMeterOta") {
          if (v1191.length && (v1191.length !== 1 || v1191[0] !== v1192.navId)) {
            v793("stale_navigation");
          }
        } else if (v1191.length && (v1191.length !== 3 || v1191[0] !== v1192.scope.vin || v1191[1] !== v1192.scope.frame || v1191[2] !== v1192.navId)) {
          v793("stale_navigation");
        }
      }
      async function v936(v1193, v1194 = [], v1195) {
        if (!Array.isArray(v1194) || !v887(v1193)) {
          v793("unavailable");
        }
        if (v1193.startsWith("open")) {
          const v1199 = v888(v1195);
          v889(v1199);
          v935(v1193, v1194, v1195);
          if (v1193 === "openInductive") {
            await (v876.openInductive ? v876.openInductive(v1195) : v785.APP.inductiveUi.openPair());
            v889(v1199);
            return {
              ok: true,
              opened: true,
              mode: "pair2"
            };
          }
          const v1200 = v893(v1193 === "openMeterOta" ? "ota" : "debug", v1195);
          if (v1193 === "openBtDebug") {
            const v1201 = v894(v1200);
            v1201.opened = true;
            return v1201;
          }
          return v934(v1200);
        }
        const v1196 = v897(v1194);
        if (v1193 === "btDebug.commands") {
          v889(v888(v1195));
          return {
            ok: true,
            commands: v807
          };
        }
        if (v1193 === "btDebug.diagnostics") {
          return v923(v888(v1195));
        }
        let v1197;
        if (v1193 === "meterOta.pick" && !v1196.ticket) {
          v1197 = v893("ota", v1195);
        } else if (["btDebug.connect", "btDebug.diagnosticsScan"].includes(v1193) && !v1196.ticket) {
          v1197 = v893("debug", v1195);
        } else {
          v1197 = v898(v1196, v1195, v1193.startsWith("meterOta.") ? "ota" : "debug");
        }
        if (v1193.endsWith(".cancel") || v1193 === "btDebug.close") {
          return v904(v1197);
        }
        if (v1193 === "btDebug.diagnosticsClose") {
          await v902(v1197);
          v1197.state = "ready";
          v895(v1197);
          return v894(v1197);
        }
        if (v1193.endsWith(".status")) {
          if (v1197.handle && !v1197.busy) {
            v1197.facts = await v920(v1197);
            v889(v1197);
            v895(v1197);
          }
          return v894(v1197);
        }
        const v1198 = v1193 === "meterOta.pick" ? () => v905(v1197) : v1193 === "meterOta.version" ? () => v913(v1197, v1196) : v1193 === "meterOta.push" ? () => v915(v1197) : v1193 === "btDebug.connect" ? () => v921(v1197, v1196) : v1193 === "btDebug.send" ? () => v922(v1197, v1196) : v1193 === "btDebug.diagnosticsScan" ? () => v925(v1197) : v1193 === "btDebug.diagnosticsConnect" ? () => v928(v1197, v1196) : v1193 === "btDebug.diagnosticsPoll" ? () => v929(v1197) : null;
        if (!v1198) {
          v793("unavailable");
        }
        try {
          await v896(v1197, v1193.split(".")[1], v1198);
          return v894(v1197);
        } catch (v1202) {
          if (v1197.kind === "ota") {
            await v899(v1197);
            if (!v1197.file) {
              await v900(v1197);
            }
          }
          if (/^btDebug\.diagnostics(Scan|Connect|Poll)$/.test(v1193) && v1202.code !== "diagnostic_selection_required" && v1202.code !== "session_busy") {
            await v902(v1197);
          }
          throw v1202;
        }
      }
      const v937 = () => Promise.all([...v881.values()].map(v1203 => v904(v1203, true)));
      return Object.freeze({
        has: v887,
        requiredMethods: v886,
        call: v936,
        configureCore: v1204 => {
          v882 = v1204;
        },
        dispose: v937
      });
    }
    const v810 = v809();
    v785.IOSVehicleTools = Object.freeze({
      ...v810,
      create: v809
    });
    v785.addEventListener?.("pagehide", () => {
      v810.dispose().catch(() => {});
    });
    v785.document?.addEventListener?.("visibilitychange", () => {
      if (v785.document.hidden) {
        v810.dispose().catch(() => {});
      }
    });
  })();
  (() => {
    const v1205 = typeof window === "undefined" ? globalThis : window;
    const v1206 = v1205.VehicleWire;
    const v1207 = v1225 => Object.assign(new Error(v1225), {
      code: v1225
    });
    const v1208 = v1226 => {
      throw v1207(v1226);
    };
    const v1209 = v1227 => {
      if (typeof v1227 === "string") {
        try {
          v1227 = JSON.parse(v1227);
        } catch {
          v1208("invalid_json");
        }
      }
      if (!v1227 || typeof v1227 !== "object" || Array.isArray(v1227)) {
        v1208("invalid_object");
      }
      return v1227;
    };
    const v1210 = v1228 => typeof v1228 === "string" && /^[a-z][a-z0-9_]{0,79}$/.test(v1228) ? v1228 : "";
    function v1211(v1229, v1230 = "operation_failed") {
      if (typeof v1229 === "string") {
        if (v1210(v1229)) {
          return v1229;
        }
        if (v1229.length <= 2048 && v1229.startsWith("{")) {
          try {
            return v1211(JSON.parse(v1229), v1230);
          } catch {}
        }
        return v1230;
      }
      return [v1229?.code, v1229?.reason, v1229?.err, v1229?.error?.code, v1229?.error?.reason, v1229?.error, v1229?.message].map(v1210).find(Boolean) || v1230;
    }
    const v1212 = v1231 => v1211(v1231);
    const v1213 = ["navId", "frame", "epoch", "generation", "accountId", "vin"];
    const v1214 = (v1232, v1233) => !!v1232 && !!v1233 && v1213.every(v1234 => v1232[v1234] === v1233[v1234]);
    const v1215 = () => v1205.crypto?.randomUUID?.() ?? "u-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
    const v1216 = (v1235, v1236) => typeof v1235 === "string" && typeof v1236 === "string" && v1235.toLowerCase() === v1236.toLowerCase();
    const v1217 = v1237 => JSON.stringify(v1237);
    const v1218 = ["ble.open", "ble.exchange", "ble.poll", "ble.close", "crypto.aes.decrypt"];
    const v1219 = ["network.open", "network.read", "network.write", "network.poll", "network.close"];
    const v1220 = ["asset.poll", "asset.read", "asset.cancel"];
    const v1221 = ["secret.import", "secret.release", "session.renew.prepare", "session.renew.poll", "session.renew.cancel"];
    const v1222 = {
      beginRideRecording: "beginRideRecording",
      restoreRideRecording: "pollRideRecording",
      pollRideRecording: "pollRideRecording",
      rideRecordingAction: "rideRecordingAction",
      detachRideRecording: "detachRideRecording",
      listRideRecordings: "listRideRecords",
      readRideRecording: "readRideRecord",
      deleteRideRecording: "deleteRideRecord",
      exportRideRecording: "exportRideRecord",
      listRideRecords: "listRideRecords",
      readRideRecord: "readRideRecord",
      deleteRideRecord: "deleteRideRecord",
      exportRideRecord: "exportRideRecord",
      beginGpsSpeed: "beginGpsSpeed",
      pollGpsSpeed: "pollGpsSpeed",
      endGpsSpeed: "endGpsSpeed",
      setKeepScreenOn: "setKeepScreenOn"
    };
    function v1223(v1238 = {}) {
      const v1239 = () => v1238.bridge || v1205.IOSBR;
      const v1240 = () => v1238.now?.() ?? Date.now();
      const v1241 = v1312 => v1238.delay ? v1238.delay(v1312) : new Promise(v1313 => v1205.setTimeout(v1313, v1312));
      const v1242 = new Map();
      const v1243 = new Map();
      const v1244 = new Map();
      let v1245 = null;
      let v1246 = null;
      let v1247 = null;
      let v1248 = null;
      let v1249 = null;
      let v1250 = false;
      let v1251 = v1238.contextProvider || null;
      const v1252 = {
        beginAe4ControllerWrite: "ble.controller.begin",
        pollAe4ControllerWrite: "ble.controller.poll",
        selectAe4ControllerWrite: "ble.controller.select",
        cancelAe4ControllerWrite: "ble.controller.cancel"
      };
      async function v1253(v1314, v1315, v1316) {
        const v1317 = {
          ...v1256(v1316),
          cancelled: false
        };
        const v1318 = {
          navId: v1317.navId,
          vin: v1317.scope.vin,
          frame: v1317.scope.frame,
          epoch: v1317.scope.epoch,
          generation: v1317.scope.generation,
          accountId: v1317.scope.accountId
        };
        const v1319 = v1314 === "beginAe4ControllerWrite";
        const v1320 = v1314 === "cancelAe4ControllerWrite";
        if (v1315[0] !== v1317.navId) {
          v1208("stale_navigation");
        }
        if (v1319) {
          if (v1315.length !== 6 || v1315[1] !== v1317.scope.vin || String(v1315[2]) !== v1317.scope.frame) {
            v1208("invalid_arguments");
          }
          const v1322 = v1315[3];
          const v1323 = v1315[4];
          const v1324 = typeof v1315[5] === "string" ? v1315[5].trim().toUpperCase().replace(/\s+/g, "") : "";
          if (!["AE4MAX2+", "AE4SE+"].includes(v1324)) {
            v1208("unsupported_model");
          }
          if (!Number.isInteger(v1322) || v1322 < 0 || v1322 > 2 || !Number.isInteger(v1323) || v1323 < 0 || v1323 > 8) {
            v1208("invalid_settings");
          }
          Object.assign(v1318, {
            model: v1324,
            voltageIndex: v1322,
            currentIndex: v1323
          });
        } else {
          if (v1315.length !== (v1314 === "selectAe4ControllerWrite" ? 3 : 2) || typeof v1315[1] !== "string" || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v1315[1])) {
            v1208("stale_ticket");
          }
          v1318.ticket = v1315[1];
          if (v1314 === "selectAe4ControllerWrite") {
            if (typeof v1315[2] !== "string" || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v1315[2])) {
              v1208("invalid_device");
            }
            v1318.id = v1315[2];
          }
        }
        const v1321 = await v1260(v1317, v1252[v1314], [v1318], {
          cleanup: v1320,
          allowFailure: true,
          authorization: false,
          late: v1319 ? v1325 => typeof v1325?.ticket === "string" ? v1260(v1317, "ble.controller.cancel", [{
            navId: v1318.navId,
            vin: v1318.vin,
            frame: v1318.frame,
            epoch: v1318.epoch,
            generation: v1318.generation,
            accountId: v1318.accountId,
            ticket: v1325.ticket
          }], {
            cleanup: true
          }) : null : null
        });
        return v1217({
          ...v1209(v1321 || {
            ok: false,
            reason: "operation_cancelled"
          }),
          vehicleActionConfirmed: false
        });
      }
      function v1254(v1326) {
        if (v1252[v1326]) {
          if (v1326 === "beginAe4ControllerWrite") {
            return ["ble.controller.begin", "ble.controller.poll", "ble.controller.select", "ble.controller.cancel"];
          } else {
            return [v1252[v1326]];
          }
        }
        if (["inductiveCapabilities", "beginInductiveSession", "pollInductiveSession", "inductiveSessionAction"].includes(v1326)) {
          return [...v1218, ...(v1238.selectPeripheral ? [] : ["ble.scan"]), "ui.confirm", "ble.identity", "ble.systemPairing"];
        }
        if (v1326 === "cancelInductiveSession") {
          return ["ble.close"];
        }
        if (/^beginWallpaperTransfer/.test(v1326)) {
          return [...v1219, ...v1220, "wifi.join", "ui.confirm", v1326.endsWith("Local") ? "asset.zip.build.begin" : "asset.download.begin"];
        }
        if (["wallpaperLocalCapabilities", "pollWallpaperTransfer", "wallpaperTransferAction"].includes(v1326)) {
          return [...v1219, ...v1220, "wifi.join", "wifi.status", "asset.download.begin", "asset.zip.build.begin", "ui.confirm"];
        }
        if (v1326 === "cancelWallpaperTransfer") {
          return ["network.close", "asset.cancel"];
        }
        if (v1222[v1326]) {
          return ["compat.call", "compat." + v1222[v1326], ...(["beginRideRecording", "restoreRideRecording", "pollRideRecording", "rideRecordingAction"].includes(v1326) ? v1218 : []), ...(v1326 === "beginRideRecording" ? v1238.selectPeripheral ? [] : ["ble.scan"] : [])];
        }
        const v1327 = {
          "cast.version": ["cast.version"],
          "cast.capabilities": ["cast.capabilities"],
          "cast.available": ["cast.capabilities"],
          "cast.getStatus": ["cast.status"],
          "cast.getDiagnostics": ["cast.diagnostics"],
          "cast.pair": ["cast.pair", "wifi.join"],
          "cast.start": ["cast.start", "cast.stop", "cast.status", "cast.capabilities", "wifi.join"],
          "cast.stop": ["cast.stop"],
          "cast.requestProjection": ["cast.requestProjection"],
          "cast.forgetProfile": ["cast.forgetProfile"],
          "cast.setTier": ["cast.setTier"]
        };
        if (v1327[v1326]) {
          return v1327[v1326];
        }
        return v1310()?.requiredMethods?.(v1326) || null;
      }
      function v1255(v1328) {
        const v1329 = v1254(v1328);
        if (!v1206 || !v1329 || v1239()?.available?.() !== true || v1329.some(v1330 => v1239()?.has?.(v1330) !== true)) {
          return false;
        }
        if (/Inductive/.test(v1328) || ["beginRideRecording", "restoreRideRecording", "rideRecordingAction"].includes(v1328)) {
          if (!v1238.cloud && (!v1205.API?.fetchT || !v1205.ZEEHO_SIGN?.buildHeaders || !v1205.ACC?.byId)) {
            return false;
          }
        }
        if (v1328 === "cast.start" && v1248?.recipeVersion !== 1) {
          return false;
        }
        if (v1328 === "cast.start" && v1248?.available !== true) {
          return false;
        }
        if (v1205.IOSVehicleTools?.requiredMethods?.(v1328)) {
          return v1205.IOSVehicleTools.has?.(v1328) === true;
        }
        return true;
      }
      function v1256(v1331) {
        if (!v1331?.scope || !v1331.navId || v1331.navId !== v1331.scope.navId || v1331.scope.frame !== (v1331.frame ?? v1331.scope.frame) || !v1331.scope.accountId || !v1331.scope.vin || v1331.vin != null && v1331.vin !== v1331.scope.vin || !Number.isSafeInteger(v1331.scope.epoch) || !Number.isSafeInteger(v1331.scope.generation) || v1331.scope.epoch < 0 || v1331.scope.generation < 0) {
          v1208("stale_session");
        }
        const v1332 = Object.freeze(Object.fromEntries(v1213.map(v1333 => [v1333, v1331.scope[v1333]])));
        if (typeof v1332.frame !== "string" || !v1332.frame || typeof v1332.vin !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(v1332.vin)) {
          v1208("stale_session");
        }
        return {
          context: v1331,
          scope: v1332,
          navId: v1331.navId
        };
      }
      function v1257(v1334, v1335 = true, v1336 = true) {
        if (v1334.cancelled || v1334.abort?.signal.aborted) {
          v1208("cancelled");
        }
        if (v1334.context.isCurrent?.() !== true || !v1214(v1334.context.scope, v1334.scope) || v1334.context.navId !== v1334.navId || v1239()?.available?.() !== true || v1239()?.isCurrent?.() === false) {
          v1208("stale_session");
        }
        const v1337 = v1251?.();
        if (v1337 && (!v1214(v1337.scope, v1334.scope) || v1337.navId !== v1334.navId)) {
          v1208("stale_session");
        }
        if (v1238.isCurrent && v1238.isCurrent(v1334.scope) !== true) {
          v1208("stale_session");
        }
        if (v1335 && (v1238.foreground ? v1238.foreground() !== true : v1205.document?.hidden === true)) {
          v1208("foreground_required");
        }
        if (v1334.deadline && v1240() >= v1334.deadline) {
          v1208("timeout");
        }
        if (v1336 && v1334.authorizedUntil && v1240() >= v1334.authorizedUntil) {
          v1208("refresh_required");
        }
      }
      function v1258(v1338) {
        return {
          navigationId: v1338.navId,
          epoch: v1338.scope.epoch,
          frame: v1338.scope.frame
        };
      }
      function v1259(v1339) {
        return {
          leaseId: v1339.lease.leaseId,
          navId: v1339.navId,
          vin: v1339.scope.vin,
          frame: v1339.scope.frame
        };
      }
      async function v1260(v1340, v1341, v1342, {
        cleanup = false,
        late = null,
        allowFailure = false,
        authorization = true
      } = {}) {
        if (!cleanup) {
          v1257(v1340, true, authorization);
        }
        if (v1239()?.has?.(v1341) !== true) {
          v1208("unavailable");
        }
        let v1343;
        try {
          v1343 = await v1239().call(v1341, ...v1342);
        } catch (v1344) {
          if (cleanup) {
            return null;
          }
          throw v1207(v1212(v1344));
        }
        if (!cleanup) {
          try {
            v1257(v1340, true, authorization);
          } catch (v1345) {
            if (late) {
              await late(v1343);
            }
            throw v1345;
          }
        }
        if (!cleanup && !allowFailure && v1343 && typeof v1343 === "object" && v1343.ok === false) {
          v1208(v1211(v1343, "native_failed"));
        }
        return v1343;
      }
      function v1261(v1346, v1347) {
        const v1348 = {
          ...v1256(v1347),
          kind: v1346,
          ticket: v1215(),
          op: 0,
          cancelled: false,
          abort: new AbortController(),
          busy: false,
          state: "initializing",
          stage: "initializing",
          reason: "",
          logs: [],
          telemetry: {},
          telemetryTimes: {},
          authenticated: false,
          connected: false,
          systemBondState: "unknown_os_managed",
          steps: {},
          cloudWriteAttempted: false
        };
        v1257(v1348);
        v1242.set(v1348.ticket, v1348);
        return v1348;
      }
      function v1262(v1349, v1350) {
        if (!/^[a-z][a-z0-9_]{0,79}$/.test(v1350)) {
          return;
        }
        v1349.logs.push({
          at: v1240(),
          text: v1350,
          level: v1350.endsWith("failed") ? "error" : "info"
        });
        if (v1349.logs.length > 80) {
          v1349.logs.shift();
        }
      }
      function v1263(v1351, v1352, v1353, v1354 = 120) {
        v1257(v1351);
        if (v1351.busy) {
          v1208("busy");
        }
        const v1355 = ++v1351.op;
        v1351.busy = true;
        v1351.stage = v1352;
        v1351.state = "running";
        v1351.reason = "";
        v1351.deadline = v1240() + v1354 * 1000;
        v1262(v1351, v1352);
        v1351.work = Promise.resolve().then(async () => {
          v1257(v1351);
          await v1353();
          v1257(v1351);
        }).then(() => {
          if (v1351.cancelled || v1351.op !== v1355) {
            return;
          }
          v1351.busy = false;
          v1351.deadline = 0;
          if (v1351.state === "running") {
            v1351.state = "ready";
          }
          v1351.stage = v1351.state;
        }, async v1356 => {
          if (v1351.cancelled || v1351.op !== v1355) {
            return;
          }
          v1351.busy = false;
          v1351.deadline = 0;
          v1351.state = "error";
          v1351.stage = "error";
          v1351.reason = v1351.requestWritten ? "result_unknown" : v1212(v1356);
          v1262(v1351, v1351.reason);
          if (v1351.kind === "ble") {
            v1351.authenticated = false;
            v1351.connected = false;
            await v1271(v1351);
          }
          if (v1351.socket) {
            await v1272(v1351);
            v1351.route = null;
          }
        });
        return {
          ticket: v1351.ticket,
          accepted: true,
          ok: true,
          busy: true
        };
      }
      function v1264() {
        return v1239() === v1205.IOSBR && v1239()?.available?.() === true && v1239()?.isCurrent?.() === true && [...v1221, "ble.renew.prepare", "ui.confirm"].every(v1357 => v1239().has?.(v1357) === true) && typeof v1205.ZEEHO_SIGN?.createNativeSigner === "function" && typeof v1206.renewalHandshakeRecipe === "function";
      }
      async function v1265(v1358) {
        const v1359 = v1358.renewal;
        v1358.renewal = null;
        if (!v1359) {
          return;
        }
        try {
          await v1260(v1358, "session.renew.cancel", [{
            ...v1258(v1358),
            recordingId: v1359.recordingId
          }], {
            cleanup: true
          });
        } catch {}
        await Promise.all([...v1359.handles].map(async v1360 => {
          try {
            await v1260(v1358, "secret.release", [{
              ...v1258(v1358),
              handle: v1360
            }], {
              cleanup: true
            });
          } catch {}
        }));
        v1359.handles.clear();
        v1359.supported = false;
      }
      async function v1266(v1361, v1362) {
        v1257(v1361, true, false);
        const v1363 = await v1276(v1361, false);
        v1257(v1361, true, false);
        if (v1362.accountId !== v1361.scope.accountId || v1363.accountId !== v1362.accountId || v1363.uid !== v1362.uid || v1363.token !== v1362.token || v1363.credentialRev !== v1362.credentialRev || typeof v1362.token !== "string" || !v1362.token || typeof v1362.uid !== "string" || !v1362.uid || !Number.isSafeInteger(v1362.credentialRev) || v1362.credentialRev < 1) {
          v1208("stale_session");
        }
        if (!v1238.credentials && v1205.ACC.current?.({
          id: v1362.accountId,
          token: v1362.token,
          uid: v1362.uid,
          credentialRev: v1362.credentialRev
        }) !== true) {
          v1208("stale_session");
        }
      }
      async function v1267(v1364, v1365, v1366, v1367, v1368) {
        await v1266(v1364, v1366);
        const v1369 = typeof v1368 === "string" ? v1206.utf8(v1368) : v1206.bytes(v1368);
        if (!v1369.length || v1369.length >= 32768 || v1365.handles.size >= 12) {
          v1369.fill(0);
          v1208("secret_limit");
        }
        const v1370 = {
          ...v1258(v1364),
          importBase64: v1206.base64(v1369),
          type: "string",
          purpose: v1367,
          ttlMs: 300000
        };
        try {
          const v1371 = await v1260(v1364, "secret.import", [v1370], {
            late: v1373 => {
              const v1374 = typeof v1373 === "string" ? v1373 : v1373?.handle;
              if (v1374) {
                return v1260(v1364, "secret.release", [{
                  ...v1258(v1364),
                  handle: v1374
                }], {
                  cleanup: true
                });
              } else {
                return null;
              }
            }
          });
          const v1372 = typeof v1371 === "string" ? v1371 : v1371?.handle;
          if (typeof v1372 !== "string" || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v1372)) {
            v1208("secret_receipt_invalid");
          }
          v1365.handles.add(v1372);
          await v1266(v1364, v1366);
          return v1372;
        } finally {
          v1370.importBase64 = "";
          v1369.fill(0);
        }
      }
      function v1268(v1375, v1376) {
        const v1377 = v1375.renewal;
        const v1378 = v1209(v1376);
        if (!v1377 || !v1216(v1378.recordingId, v1377.recordingId) || !v1377.confirmed) {
          v1208("renewal_receipt_invalid");
        }
        if (v1378.scope && !v1214(v1378.scope, v1375.scope)) {
          v1208("stale_session");
        }
        v1377.supported = v1378.backgroundAuthRenewalSupported === true && v1378.active === true && v1378.attachedNative === true && v1378.consented === true && v1378.recipeComplete === true;
        const v1379 = v1378.authorizationRemainingMs;
        const v1380 = v1377.supported && v1378.authorizationFresh === true && v1378.canAcceptTelemetry === true && v1378.nativeAuthenticated === true && Number.isSafeInteger(v1379) && v1379 > 0 && v1379 <= 300000;
        if (v1380 && !v1216(v1378.connectionGeneration, v1375.lease?.generation)) {
          v1208("stale_callback");
        }
        if (v1380) {
          v1375.authorizedUntil = v1240() + v1379;
          v1375.authenticated = true;
          v1375.renewalFresh = true;
        } else {
          v1375.renewalFresh = false;
          v1375.authenticated = false;
          v1375.telemetry = {};
          v1375.telemetryTimes = {};
        }
        return {
          backgroundAuthRenewalSupported: v1377.supported,
          authorizationFresh: v1380,
          renewalState: /^[a-z][a-z0-9_]{0,79}$/.test(v1378.state || "") ? v1378.state : "unknown",
          authenticated: v1380 && v1375.connected,
          connected: v1380 && v1375.connected
        };
      }
      async function v1269(v1381, v1382) {
        if (!v1264() || !v1381.renewalBaseline || !v1381.authenticated || !v1381.lease) {
          return false;
        }
        await v1265(v1381);
        const v1383 = {
          recordingId: v1382.recordingId,
          handles: new Set(),
          supported: false,
          confirmed: false
        };
        v1381.renewal = v1383;
        try {
          v1257(v1381);
          const v1384 = v1381.authCredential;
          if (!v1384) {
            v1208("stale_session");
          }
          await v1266(v1381, v1384);
          const v1385 = await v1275(v1381, "session_renewal", "确认后台骑行认证续期", "仅为当前录制短期保留云签名与车辆认证物料。系统将核验车主与物料，停止录制后释放；不会持久保存这些秘密。");
          await v1266(v1381, v1384);
          v1383.confirmed = true;
          const v1386 = await v1205.ZEEHO_SIGN.createNativeSigner({
            bridge: v1239(),
            scope: v1381.scope,
            confirmation: v1385,
            isCurrent: () => {
              try {
                v1257(v1381);
                return true;
              } catch {
                return false;
              }
            },
            importNativeSecret: v1393 => v1267(v1381, v1383, v1384, "signer", v1393)
          });
          const v1387 = await v1267(v1381, v1383, v1384, "token", v1384.token);
          const v1388 = [];
          for (const v1394 of v1381.renewalBaseline.baselines) {
            v1388.push(await v1267(v1381, v1383, v1384, "baseline", v1394));
          }
          const v1389 = v1206.renewalHandshakeRecipe(v1381.renewalBaseline);
          const v1390 = v1206.renewalRecipe({
            vin: v1381.scope.vin,
            baseline: v1381.renewalBaseline,
            baselineHandles: v1388,
            signerHandle: v1386.handle,
            signerSpec: v1386.signerSpec,
            handshakeRecipe: v1389
          });
          const v1391 = v1209(await v1260(v1381, "ble.renew.prepare", [{
            ...v1259(v1381),
            generation: v1381.lease.generation,
            recordingId: v1382.recordingId,
            recipe: v1389
          }]));
          if (v1391.ok !== true || v1391.prepared !== true || v1391.leaseId !== v1381.lease.leaseId || !v1216(v1391.generation, v1381.lease.generation) || !v1216(v1391.recordingId, v1382.recordingId)) {
            v1208("renewal_recipe_invalid");
          }
          v1383.serviceAttempted = true;
          const v1392 = v1209(await v1260(v1381, "session.renew.prepare", [{
            ...v1258(v1381),
            recordingId: v1382.recordingId,
            signerHandle: v1386.handle,
            tokenHandle: v1387,
            recipe: v1390
          }]));
          if (v1392.ok !== true || !v1216(v1392.recordingId, v1382.recordingId)) {
            v1208("renewal_receipt_invalid");
          }
          v1268(v1381, await v1260(v1381, "session.renew.poll", [{
            ...v1258(v1381),
            recordingId: v1382.recordingId
          }], {
            authorization: false
          }));
          if (v1383.supported) {
            v1381.renewalBaseline = null;
            v1381.material = null;
          }
          return v1383.supported;
        } catch (v1395) {
          if (v1383.serviceAttempted) {
            v1381.authenticated = false;
            v1381.telemetry = {};
            v1381.telemetryTimes = {};
          }
          await v1265(v1381);
          v1262(v1381, v1212(v1395));
          return false;
        }
      }
      async function v1270(v1396) {
        if (!v1396.renewal) {
          return {
            backgroundAuthRenewalSupported: false
          };
        }
        v1257(v1396, true, false);
        try {
          await v1266(v1396, v1396.authCredential);
          return v1268(v1396, await v1260(v1396, "session.renew.poll", [{
            ...v1258(v1396),
            recordingId: v1396.renewal.recordingId
          }], {
            authorization: false
          }));
        } catch (v1397) {
          v1396.authenticated = false;
          v1396.telemetry = {};
          v1396.telemetryTimes = {};
          await v1265(v1396);
          throw v1397;
        }
      }
      async function v1271(v1398) {
        await v1265(v1398);
        const v1399 = v1398.lease;
        v1398.lease = null;
        v1398.stream?.clear();
        v1398.telemetry = {};
        v1398.telemetryTimes = {};
        if (v1399) {
          await v1260(v1398, "ble.close", [{
            leaseId: v1399.leaseId,
            navId: v1398.navId,
            vin: v1398.scope.vin,
            frame: v1398.scope.frame
          }], {
            cleanup: true
          });
        }
      }
      async function v1272(v1400) {
        const v1401 = v1400.socket;
        v1400.socket = null;
        if (v1401) {
          await v1260(v1400, "network.close", [{
            ...v1258(v1400),
            ticket: v1401
          }], {
            cleanup: true
          });
        }
      }
      async function v1273(v1402) {
        if (!v1402 || v1402.cancelled) {
          return false;
        }
        v1402.cancelled = true;
        v1402.op++;
        v1402.abort.abort();
        v1402.busy = false;
        v1402.state = "cancelled";
        v1402.authenticated = false;
        v1402.connected = false;
        v1242.delete(v1402.ticket);
        if (v1245 === v1402) {
          v1245 = null;
        }
        if (v1246 === v1402) {
          v1246 = null;
        }
        await Promise.all([v1271(v1402), v1272(v1402), v1402.asset ? v1260(v1402, "asset.cancel", [{
          ...v1258(v1402),
          ticket: v1402.asset
        }], {
          cleanup: true
        }) : null]);
        v1402.asset = null;
        v1402.material = null;
        v1402.authCredential = null;
        v1402.renewalBaseline = null;
        return true;
      }
      function v1274(v1403, v1404, v1405, v1406 = false) {
        if (v1403.length < 2 || v1403[0] !== v1404.navId) {
          v1208("stale_navigation");
        }
        const v1407 = v1242.get(v1403[1]);
        if (!v1407 || v1407.kind !== v1405 || !v1214(v1407.scope, v1404.scope)) {
          v1208("stale_ticket");
        }
        if (!v1406) {
          v1257(v1407, true, false);
        }
        return v1407;
      }
      async function v1275(v1408, v1409, v1410, v1411) {
        const v1412 = v1209(await v1260(v1408, "ui.confirm", [{
          ...v1258(v1408),
          operation: v1409,
          title: v1410,
          message: v1411
        }]));
        if (v1412.confirmed !== true || v1412.operation !== v1409 || !v1214(v1412.scope, v1408.scope)) {
          v1208("user_cancelled");
        }
        return v1412;
      }
      async function v1276(v1413, v1414 = true) {
        v1257(v1413, true, v1414);
        if (v1238.credentials) {
          return v1238.credentials(v1413.scope);
        }
        const v1415 = v1205.ACC.byId(v1413.scope.accountId);
        const v1416 = v1205.APP?.context?.();
        if (!v1415 || !v1415.token || v1415.invalidAt || v1416?.vin !== v1413.scope.vin || v1416.owner && v1416.owner.id !== v1415.id) {
          v1208("owner_unverified");
        }
        return {
          accountId: v1415.id,
          uid: String(v1415.uid || ""),
          token: v1415.token,
          credentialRev: v1415.credentialRev
        };
      }
      async function v1277(v1417, v1418, v1419 = null) {
        v1257(v1417);
        if (v1238.cloud) {
          const v1432 = await v1238.cloud(v1418, v1419, {
            scope: v1417.scope,
            signal: v1417.abort.signal,
            isCurrent: () => {
              try {
                v1257(v1417);
                return true;
              } catch {
                return false;
              }
            }
          });
          v1257(v1417);
          return v1432;
        }
        const v1420 = await v1276(v1417);
        v1257(v1417);
        const v1421 = {
          home: "/v1.0/app/cfmotoserverapp/vehicleHomePageV2/" + v1417.scope.vin,
          settings: "/v1.0/app/cfmotoserverapp/vehicleSet/vehicleSetInfo/" + v1417.scope.vin,
          functions: "/v1.0/app/cfmotoserverapp/vehicleSet/items",
          setting: "/v1.0/app/cfmotoserverapp/app/inductiveUnlock/airLock/setting",
          save: "/v1.0/app/cfmotoserverapp/app/inductiveUnlock/airLock/save"
        };
        if (!v1421[v1418]) {
          v1208("cloud_endpoint");
        }
        const v1422 = v1419 === null ? "GET" : "POST";
        const v1423 = v1418 === "functions" ? {
          homepageInvoke: 1,
          vinNo: v1417.scope.vin
        } : {};
        const v1424 = v1419 === null ? null : v1217(v1419);
        const v1425 = v1205.ZEEHO_SIGN.toQuery(v1423);
        const v1426 = v1205.ZEEHO_SIGN.buildHeaders("app", v1423, v1424, v1422, v1420.token);
        let v1427;
        try {
          v1427 = await v1205.API.fetchT(v1205.ZEEHO_SIGN.BASE + v1421[v1418] + (v1425 ? "?" + v1425 : ""), {
            method: v1422,
            headers: v1426,
            body: v1424 ?? undefined,
            signal: v1417.abort.signal
          }, async v1433 => ({
            http: v1433.status,
            text: await v1433.text()
          }));
        } catch {
          v1257(v1417);
          v1208("cloud_" + v1418 + "_transport_failure_http_0");
        }
        v1257(v1417);
        const v1428 = await v1276(v1417);
        if (v1428.accountId !== v1420.accountId || v1428.token !== v1420.token || v1428.uid !== v1420.uid || v1428.credentialRev !== v1420.credentialRev) {
          v1208("stale_session");
        }
        const v1429 = Number.isInteger(v1427.http) && v1427.http >= 100 && v1427.http <= 599 ? v1427.http : 0;
        const v1430 = (v1434, v1435 = "") => v1208("cloud_" + v1418 + "_" + v1434 + "_http_" + v1429 + (/^-?\d{1,10}$/.test(String(v1435)) ? "_code_" + String(v1435).replace("-", "m") : ""));
        if (v1429 === 401) {
          v1430("auth_rejected");
        }
        if (v1429 < 200 || v1429 >= 300) {
          v1430("http_failure");
        }
        if (v1427.text.length > 262144) {
          v1430("response_too_large");
        }
        let v1431;
        try {
          v1431 = v1206.strictJSON(v1427.text);
        } catch {
          v1430("invalid_json");
        }
        if (String(v1431?.code) !== "10000") {
          v1430("business_failure", v1431?.code);
        }
        return v1431.data;
      }
      async function v1278(v1436) {
        v1436.authorizedUntil = 0;
        v1436.authenticated = false;
        await v1271(v1436);
        const v1437 = await v1276(v1436);
        const v1438 = v1209(await v1277(v1436, "home"));
        const v1439 = v1209(await v1277(v1436, "settings"));
        const v1440 = await v1277(v1436, "functions");
        const v1441 = await v1276(v1436);
        v1257(v1436);
        if (["accountId", "uid", "token", "credentialRev"].some(v1445 => v1437[v1445] !== v1441[v1445])) {
          v1208("stale_session");
        }
        v1436.authCredential = Object.freeze({
          ...v1441
        });
        if (![v1438.vinNo, v1438.vin].some(v1446 => v1446 === v1436.scope.vin) || [v1438, v1439].some(v1447 => ["vin", "vinNo"].some(v1448 => v1447[v1448] != null && v1447[v1448] !== v1436.scope.vin))) {
          v1208("owner_unverified");
        }
        const v1442 = (v1449, v1450) => [true, 1, "1", "true"].includes(v1449?.[v1450]);
        const v1443 = v1442(v1438, "inductiveUnlocking3Flag") || v1442(v1439, "inductiveUnlocking3Flag") || Array.isArray(v1440) && v1440.some(v1451 => v1451.functionCode === "INDUCTIVE_UNLOCKING_3" && v1442(v1451, "isSupport"));
        v1436.supported2 = !v1443 && (v1442(v1438, "inductiveUnlocking2") || Array.isArray(v1440) && v1440.some(v1452 => v1452.functionCode === "INDUCTIVE_UNLOCKING_2" && v1442(v1452, "isSupport")));
        v1436.home = {
          broadcastType: v1438.broadcastType,
          vehicleName: v1438.vehicleName || ""
        };
        v1436.material = v1438.encryptInfo || v1439.encryptInfo;
        const v1444 = v1206.authMaterial(v1436.material);
        v1444.key.fill(0);
        v1444.encrypted.fill(0);
        v1436.renewalBaseline = null;
        if (v1264()) {
          try {
            v1436.renewalBaseline = v1206.renewalBaseline(v1438, v1439, v1436.scope.vin);
          } catch {
            v1262(v1436, "renewal_material_unavailable");
          }
        }
        v1436.enabled = v1442(v1439, "inductiveUnlocking2") || v1442(v1438, "inductiveUnlocking2");
        v1436.authorizedUntil = v1240() + 300000;
        v1436.canReadVehicle = true;
        v1436.state = "ready";
      }
      function v1279(v1453, v1454) {
        if (v1454.generation && !v1216(v1454.generation, v1453.lease.generation)) {
          v1208("stale_callback");
        }
        if (v1454.cursorReset === true) {
          if (!Number.isSafeInteger(v1454.windowResetSeq) || v1454.windowResetSeq < v1453.notifySeq || !["recording_handoff", "lease_opened"].includes(v1454.windowResetReason)) {
            v1208("cursor_reset_invalid");
          }
          v1453.stream.clear();
          v1453.notifySeq = v1454.windowResetSeq;
        }
        if (Number.isSafeInteger(v1454.gapCount) ? v1454.gapCount > 0 : v1454.unreadDropped > 0 || Number.isSafeInteger(v1454.windowStart) && v1454.windowStart > v1453.notifySeq + 1) {
          v1208("notification_overflow");
        }
        const v1455 = [];
        for (const v1456 of v1454.notifications || []) {
          if (!v1216(v1456.generation, v1453.lease.generation) || !v1216(v1456.characteristic, v1453.notifyCharacteristic)) {
            v1208("stale_callback");
          }
          if (!Number.isSafeInteger(v1456.seq) || v1456.seq <= v1453.notifySeq) {
            continue;
          }
          if (!Number.isSafeInteger(v1456.at) || v1456.at <= 0 || v1456.at > v1240() + 1000) {
            v1208("sample_timestamp_invalid");
          }
          v1453.notifySeq = v1456.seq;
          const v1457 = v1206.unbase64(v1456.valueB64, 2048);
          const v1458 = v1453.stream.feed(v1457);
          v1457.fill(0);
          for (const v1459 of v1458) {
            if ([243, 253].includes(v1459.command) && v1453.authenticated) {
              const v1460 = v1206.telemetry(v1459.command, v1459.payload, v1206.int(v1456.at, 1, Number.MAX_SAFE_INTEGER));
              Object.assign(v1453.telemetry, v1460.values);
              Object.assign(v1453.telemetryTimes, v1460.times);
              if (v1459.command === 243) {
                v1453.dashConfirmed = true;
              }
              if (v1459.command === 253) {
                v1453.periodConfirmed = true;
              }
            }
            v1455.push(v1459);
          }
        }
        return v1455;
      }
      async function v1280(v1461, v1462, v1463, v1464, v1465 = false, v1466 = 10000) {
        v1206.int(v1466, 1000, 15000);
        v1257(v1461);
        if (!v1461.lease) {
          v1208("not_connected");
        }
        const v1467 = v1215();
        const v1468 = v1461.notifySeq;
        const v1469 = v1206.bleFrame(v1462, v1463);
        let v1470;
        try {
          v1470 = v1209(await v1260(v1461, "ble.exchange", [{
            ...v1259(v1461),
            operationId: v1467,
            valueB64: v1206.base64(v1469),
            waitForNotify: false,
            timeoutMs: v1466
          }]));
        } finally {
          v1469.fill(0);
          v1463.fill(0);
        }
        if (v1470.operationId !== v1467 || v1470.leaseId !== v1461.lease.leaseId || !v1216(v1470.generation, v1461.lease.generation)) {
          v1208("stale_callback");
        }
        if (v1464 === undefined || v1464 === null || v1464 === 0) {
          v1279(v1461, v1470).forEach(v1472 => v1472.payload.fill(0));
          return {
            transportOnly: true,
            acknowledgement: "gatt_only",
            vehicleActionConfirmed: false,
            operationId: v1467,
            generation: v1461.lease.generation,
            bytes: v1470.bytes,
            chunks: v1470.chunks
          };
        }
        const v1471 = Math.min(v1240() + v1466, v1461.authorizedUntil || Infinity);
        for (let v1473 = 0; v1473 < 320; v1473++) {
          v1257(v1461);
          const v1474 = v1279(v1461, v1470);
          const v1475 = v1474.find(v1476 => v1476.command === v1464 && v1461.notifySeq > v1468);
          if (v1475) {
            for (const v1477 of v1474) {
              if (v1477 !== v1475) {
                v1477.payload.fill(0);
              }
            }
            return v1475;
          }
          v1474.forEach(v1478 => v1478.payload.fill(0));
          if (v1240() >= v1471) {
            if (v1465) {
              return null;
            }
            v1208("notification_timeout");
          }
          await v1241(50);
          v1257(v1461);
          v1470 = v1209(await v1260(v1461, "ble.poll", [{
            ...v1259(v1461),
            afterSeq: v1461.notifySeq
          }]));
        }
        if (v1465) {
          return null;
        }
        v1208("notification_timeout");
      }
      async function v1281(v1479) {
        v1257(v1479);
        if (v1238.selectPeripheral) {
          const v1482 = await v1238.selectPeripheral({
            scope: v1479.scope,
            signal: v1479.abort.signal
          });
          v1257(v1479);
          return v1482;
        }
        const v1480 = v1209(await v1260(v1479, "ble.scan", [{
          confirmed: true,
          timeoutMs: 8000,
          roles: [1]
        }]));
        const v1481 = (v1480.devices || []).filter(v1483 => typeof v1483.id === "string" && v1483.connectable !== false && v1483.roles?.includes(1));
        if (v1481.length !== 1) {
          v1208(v1481.length ? "ambiguous_peripheral" : "vehicle_not_found");
        }
        return v1481[0].id;
      }
      async function v1282(v1484, v1485 = false) {
        v1257(v1484);
        if (!v1484.authorizedUntil || !v1484.canReadVehicle) {
          v1208("refresh_required");
        }
        await v1271(v1484);
        v1484.telemetry = {};
        v1484.telemetryTimes = {};
        v1484.connected = false;
        const v1486 = await v1281(v1484);
        v1257(v1484);
        const v1487 = "0000B354-D6D8-C7EC-BDF0-EAB1BFC6BCBC";
        const v1488 = "0000B356-D6D8-C7EC-BDF0-EAB1BFC6BCBC";
        v1484.notifyCharacteristic = "0000B357-D6D8-C7EC-BDF0-EAB1BFC6BCBC";
        const v1489 = v1209(await v1260(v1484, "ble.open", [{
          navId: v1484.navId,
          vin: v1484.scope.vin,
          frame: v1484.scope.frame,
          id: v1486,
          service: v1487,
          writeCharacteristic: v1488,
          notifyCharacteristic: v1484.notifyCharacteristic,
          purpose: v1485 ? "provisioning" : "telemetry"
        }], {
          late: v1491 => v1491?.leaseId ? v1260(v1484, "ble.close", [{
            leaseId: v1491.leaseId,
            navId: v1484.navId,
            vin: v1484.scope.vin,
            frame: v1484.scope.frame
          }], {
            cleanup: true
          }) : null
        }));
        if (!v1489.leaseId || !v1489.generation || v1489.connected !== true || v1489.identifierKind !== "corebluetooth_uuid") {
          v1208("ble_open_invalid");
        }
        v1484.lease = v1489;
        v1484.notifySeq = v1489.notifySeq || 0;
        v1484.stream = new v1206.BLEStream();
        v1484.connected = true;
        v1484.stage = "authenticating";
        const v1490 = v1206.authMaterial(v1484.material);
        try {
          const v1492 = await v1280(v1484, 90, v1206.bytesField(1, v1490.encrypted), 91);
          let v1493;
          let v1494;
          try {
            v1493 = v1206.challengeCipher(v1492.payload);
            const v1495 = v1209(await v1260(v1484, "crypto.aes.decrypt", [{
              ...v1258(v1484),
              keyB64: v1206.base64(v1490.key),
              cipherB64: v1206.base64(v1493),
              mode: "ecb",
              padding: "pkcs7"
            }]));
            v1494 = v1206.unbase64(v1495.plainB64, 128);
            const v1496 = await v1280(v1484, 92, v1206.challengeResponse(v1494), 93);
            try {
              const v1497 = v1206.number(v1206.protobuf(v1496.payload), 1);
              if (v1497 !== 0) {
                v1208("ble_auth_rejected_status_" + (Number.isSafeInteger(v1497) && v1497 >= 0 ? v1497 : "unknown"));
              }
              v1206.authResult(v1496.payload);
            } finally {
              v1496.payload.fill(0);
            }
          } finally {
            v1492.payload.fill(0);
            v1493?.fill(0);
            v1494?.fill(0);
          }
        } finally {
          v1490.encrypted.fill(0);
          v1490.key.fill(0);
        }
        v1257(v1484);
        v1484.authenticated = true;
        v1484.state = "ready";
      }
      async function v1283(v1498) {
        if (!v1498.authenticated) {
          v1208("not_authenticated");
        }
        v1498.stage = "telemetry";
        const v1499 = await v1280(v1498, 124, v1206.intField(1, 1), 252, true);
        if (v1499) {
          if (v1499.payload.length) {
            v1499.payload.fill(0);
            v1208("subscription_ack_invalid");
          }
          v1498.periodConfirmed = true;
        }
        v1498.periodRequested = true;
        const v1500 = await v1280(v1498, 114, v1206.intField(1, 1), 242, true);
        if (v1500) {
          try {
            if (v1500.payload.length && ![0, 1].includes(v1206.number(v1206.protobuf(v1500.payload), 1))) {
              v1208("dash_ack_invalid");
            }
            v1498.dashConfirmed = true;
          } finally {
            v1500.payload.fill(0);
          }
        }
        v1498.dashRequested = true;
        v1498.state = "ready";
      }
      async function v1284(v1501) {
        if (v1501.mode === "twin") {
          v1208("read_only");
        }
        if (!v1501.supported2) {
          v1208("unsupported_2");
        }
        if (v1501.steps.cloud === true) {
          await v1282(v1501, true);
          await v1285(v1501);
          return;
        }
        await v1275(v1501, "vehicle_provision", "确认配准感应钥匙", "此操作会写入车辆并登记当前手机钥匙。请靠近车辆，按系统提示确认配对；不会自动重试。");
        if (!v1501.enabled) {
          await v1277(v1501, "setting", {
            inductiveUnlockType: "",
            openStatus: 1,
            uniqueIdentify: "",
            vinNo: v1501.scope.vin
          });
          v1501.enabled = true;
        }
        await v1282(v1501, true);
        const v1502 = v1209(await v1260(v1501, "ble.identity", [v1259(v1501)]));
        const v1503 = v1206.unbase64(v1502.identityB64, 8);
        if (v1503.length !== 8) {
          v1503.fill(0);
          v1208("identity_invalid");
        }
        try {
          const v1504 = await v1280(v1501, 119, v1206.bytesField(1, v1503), 247);
          try {
            v1206.bindResult(v1504.payload);
            v1501.steps.bind = true;
          } finally {
            v1504.payload.fill(0);
          }
          if (String(v1501.home.broadcastType) !== "1") {
            const v1507 = await v1280(v1501, 120, v1206.intField(1, 2), 248);
            try {
              v1206.broadcastResult(v1507.payload);
            } finally {
              v1507.payload.fill(0);
            }
          }
          const v1505 = v1209(await v1260(v1501, "ble.systemPairing", [v1259(v1501)]));
          v1501.systemBondState = "unknown_os_managed";
          v1501.systemPairingApproved = v1505.approved === true;
          v1501.systemPairingAccessObserved = v1505.accessObserved === true;
          v1501.systemPairingManualRequired = v1505.manualRequired === true;
          if (v1505.approved !== true || v1505.osManaged !== true || v1505.manualRequired === true) {
            v1208("system_pairing_required");
          }
          await v1275(v1501, "vehicle_cloud_register", "确认系统配对已完成", "请确认已经按 iOS 的系统配对提示完成操作。系统不提供 bond 状态查询；继续会单次登记云端钥匙。");
          const v1506 = [...v1503].map(v1508 => v1508.toString(16).padStart(2, "0")).join("");
          v1501.cloudWriteAttempted = true;
          await v1277(v1501, "save", {
            inductiveUnlockType: "2.0",
            openStatus: 1,
            uniqueIdentify: v1506,
            vinNo: v1501.scope.vin
          });
          v1501.steps.cloud = true;
          await v1285(v1501, v1503);
        } finally {
          v1503.fill(0);
        }
      }
      async function v1285(v1509, v1510 = null) {
        const v1511 = v1510 == null;
        let v1512 = v1510;
        try {
          if (!v1512) {
            const v1515 = v1209(await v1260(v1509, "ble.identity", [v1259(v1509)]));
            v1512 = v1206.unbase64(v1515.identityB64, 8);
          }
          if (v1512.length !== 8) {
            v1208("identity_invalid");
          }
          const v1513 = await v1280(v1509, 127, v1206.join(v1206.intField(1, 1), v1206.bytesField(2, v1512)), 255, true, 6000);
          let v1514;
          if (!v1513) {
            v1514 = {
              state: "unconfirmed",
              registered: false
            };
          } else {
            try {
              const v1516 = v1206.pairResult(v1513.payload, 1);
              v1514 = {
                state: v1516.registered ? "confirmed" : v1516.result === 1 ? "not_registered" : "sync_failed",
                registered: v1516.registered
              };
            } catch {
              v1509.queryState = "invalid";
              v1509.steps.query = false;
              v1509.incomplete = true;
              v1208("pair_status_invalid");
            } finally {
              v1513.payload.fill(0);
            }
          }
          v1509.queryState = v1514.state;
          v1509.steps.query = v1514.registered;
          v1509.incomplete = !v1514.registered;
          if (v1514.state === "not_registered") {
            v1208("vehicle_not_registered");
          }
          if (v1514.state === "sync_failed") {
            v1208("pair_sync_failed");
          }
          v1509.state = "ready";
        } finally {
          if (v1511) {
            v1512?.fill?.(0);
          }
        }
      }
      function v1286(v1517) {
        const v1518 = v1517.authenticated && v1517.connected && v1517.authorizedUntil > v1240();
        const v1519 = v1517.queryState === "confirmed";
        const v1520 = v1517.steps.cloud === true;
        const v1521 = v1520 && v1519 && !["error", "cancelled"].includes(v1517.state);
        return {
          ok: v1517.state !== "error",
          ticket: v1517.ticket,
          state: v1517.state,
          stage: v1517.stage,
          reason: v1517.reason,
          busy: v1517.busy,
          supported2: v1517.supported2 ?? null,
          canReadVehicle: v1517.canReadVehicle === true,
          canConnect: v1517.canReadVehicle === true,
          connected: v1518,
          authenticated: v1518,
          paired: false,
          systemBondState: "unknown_os_managed",
          systemPairingApproved: v1517.systemPairingApproved === true,
          systemPairingAccessObserved: v1517.systemPairingAccessObserved === true,
          systemPairingManualRequired: v1517.systemPairingManualRequired === true,
          pairAvailable: v1517.mode === "pair2" && v1517.supported2 === true && !v1517.busy && v1518,
          finished: v1521,
          provisioned: v1520,
          registrationVerified: v1519,
          incomplete: !v1521,
          queryState: v1517.queryState || "",
          queryPending: v1517.queryState === "unconfirmed",
          bindAcknowledged: v1517.steps.bind === true,
          cloudRegistered: v1520,
          backgroundAuthRenewalSupported: v1517.renewal?.supported === true,
          steps: ["bond", "bind", "cloud", "query"].map(v1522 => ({
            id: v1522,
            done: v1522 !== "bond" && v1517.steps[v1522] === true
          })),
          telemetry: v1518 ? {
            ...v1517.telemetry
          } : {},
          telemetryTimes: v1518 ? {
            ...v1517.telemetryTimes
          } : {},
          permissionGranted: v1517.connected,
          bluetoothEnabled: v1517.connected,
          dashConfirmed: v1517.dashConfirmed === true,
          periodConfirmed: v1517.periodConfirmed === true,
          authorizationFresh: v1517.authorizedUntil > v1240()
        };
      }
      function v1287(v1523, v1524) {
        if (v1523.length !== 4 || v1523[0] !== v1524.navId || v1523[1] !== v1524.scope.vin || v1523[2] !== v1524.scope.frame || !["pair2", "twin"].includes(v1523[3])) {
          v1208("invalid_arguments");
        }
        if (v1245 && !v1245.cancelled) {
          v1208("session_busy");
        }
        const v1525 = v1261("ble", v1524);
        v1525.mode = v1523[3];
        v1245 = v1525;
        v1263(v1525, "refresh", async () => {
          await v1278(v1525);
          if (v1525.mode === "pair2" && !v1525.supported2) {
            v1208("unsupported_2");
          }
          await v1282(v1525);
          if (v1525.mode === "twin") {
            await v1283(v1525);
          }
        });
        return v1525;
      }
      async function v1288(v1526, v1527 = false) {
        if (v1526.renewal && !v1527) {
          await v1270(v1526);
        }
        v1257(v1526);
        if (!v1526.busy && v1526.lease) {
          const v1528 = v1209(await v1260(v1526, "ble.poll", [{
            ...v1259(v1526),
            afterSeq: v1526.notifySeq
          }]));
          v1279(v1526, v1528).forEach(v1529 => v1529.payload.fill(0));
        }
        return v1286(v1526);
      }
      function v1289(v1530, v1531) {
        const v1532 = v1209(v1530);
        if (v1532.fileName && !v1206.safeFileName(v1532.fileName) || !/^(?:[1-9]|10)$/.test(String(v1532.wallpaperNum)) || v1532.displayWallpaperSet == null || String(v1532.displayWallpaperSet).trim() === "") {
          v1208("wallpaper_spec");
        }
        const v1533 = "192.168.0.1";
        const v1534 = v1238.parsePairing?.(v1532.wifiAddress) || v1205.CAST?.parseWallpaperPairing?.(v1532.wifiAddress);
        if (!v1534?.ok || !v1534.profile?.ssid) {
          v1208("wifi_profile_invalid");
        }
        const v1535 = {
          ...v1532,
          carIp: v1533,
          wallpaperNum: String(v1532.wallpaperNum),
          displayWallpaperSet: "1",
          profile: v1534.profile
        };
        if (v1531) {
          if (!v1206.safeFileName(v1532.fileName)) {
            v1208("wallpaper_filename");
          }
          for (const v1536 of ["mainWidth", "mainHeight", "speedWidth", "speedHeight"]) {
            v1206.int(v1532[v1536], 0, 8192);
          }
          if (!v1532.mainWidth !== !v1532.mainHeight || !v1532.speedWidth !== !v1532.speedHeight || !v1532.mainWidth && !v1532.speedWidth) {
            v1208("wallpaper_slots");
          }
        }
        return v1535;
      }
      async function v1290(v1537) {
        for (let v1538 = 0; v1538 < 600; v1538++) {
          v1257(v1537);
          const v1539 = v1209(await v1260(v1537, "asset.poll", [{
            ...v1258(v1537),
            ticket: v1537.asset
          }]));
          if (v1539.ticket !== v1537.asset) {
            v1208("stale_asset");
          }
          v1537.downloadProgress = v1539.progress || 0;
          if (v1539.ready === true) {
            v1206.wallpaperInfo(v1539, v1537.spec.wallpaperNum);
            if (v1537.spec.fileSize != null && v1537.spec.fileSize !== v1539.fileSize || v1537.spec.md5 && v1537.spec.md5.toLowerCase() !== v1539.md5) {
              v1208("package_changed");
            }
            v1537.package = {
              fileName: v1539.fileName,
              fileSize: v1539.fileSize,
              md5: v1539.md5
            };
            v1537.downloadProgress = 100;
            return;
          }
          if (v1539.error || v1539.busy === false) {
            v1208("asset_failed");
          }
          await v1241(200);
        }
        v1208("timeout");
      }
      async function v1291(v1540, v1541 = 10950) {
        const v1542 = v1209(await v1260(v1540, "network.open", [{
          ...v1258(v1540),
          ssid: v1540.spec.profile.ssid,
          carIp: v1540.spec.carIp,
          port: v1541,
          confirmed: true
        }], {
          late: v1543 => v1543?.ticket ? v1260(v1540, "network.close", [{
            ...v1258(v1540),
            ticket: v1543.ticket
          }], {
            cleanup: true
          }) : null
        }));
        if (!v1542.ticket || v1542.targetVerified !== true || v1542.targetJoined !== true || v1542.connectionMode !== "wifi") {
          v1208("route_not_verified");
        }
        v1540.socket = v1542.ticket;
        v1540.route = v1542;
        v1540.verifiedAt = v1240();
        return new v1206.ExactReader(async v1544 => {
          const v1545 = v1209(await v1260(v1540, "network.read", [{
            ...v1258(v1540),
            ticket: v1540.socket,
            length: v1544
          }]));
          const v1546 = v1206.unbase64(v1545.base64, 65536);
          if (v1545.ticket !== v1540.socket || v1545.length !== v1546.length) {
            v1208("socket_read_invalid");
          }
          return v1546;
        }, () => v1257(v1540));
      }
      async function v1292(v1547, v1548) {
        for (let v1549 = 0; v1549 < v1548.length; v1549 += 65536) {
          v1257(v1547);
          const v1550 = v1548.subarray(v1549, v1549 + 65536);
          v1547.requestWritten = true;
          const v1551 = v1209(await v1260(v1547, "network.write", [{
            ...v1258(v1547),
            ticket: v1547.socket,
            base64: v1206.base64(v1550)
          }]));
          if (v1551.ticket !== v1547.socket || v1551.written !== v1550.length) {
            v1208("socket_short_write");
          }
        }
      }
      async function v1293(v1552) {
        if (!v1552.package || v1552.local && !v1552.preparationConfirmed) {
          v1208("preparation_not_confirmed");
        }
        const v1553 = v1552.package;
        await v1290(v1552);
        if (v1553.md5 !== v1552.package.md5 || v1553.fileSize !== v1552.package.fileSize) {
          v1208("package_changed");
        }
        const v1554 = await v1291(v1552);
        v1552.sendProgress = 0;
        try {
          await v1292(v1552, v1206.lanFrame(v1206.wallpaper.INFO, v1206.wallpaperInfo(v1552.package, v1552.spec.wallpaperNum)));
          v1552.stage = "waiting_info_ack";
          v1206.wallpaperACK(await v1554.lan(), v1206.wallpaper.INFO_ACK);
          for (let v1555 = 0; v1555 < v1552.package.fileSize;) {
            v1257(v1552);
            const v1556 = Math.min(65536, v1552.package.fileSize - v1555);
            const v1557 = v1209(await v1260(v1552, "asset.read", [{
              ...v1258(v1552),
              ticket: v1552.asset,
              offset: v1555,
              length: v1556
            }]));
            const v1558 = v1206.unbase64(v1557.base64, 65536);
            if (v1557.length !== v1556 || v1558.length !== v1556) {
              v1208("asset_short_read");
            }
            await v1292(v1552, v1206.lanFrame(v1206.wallpaper.SLICE, v1558, 0));
            v1558.fill(0);
            v1555 += v1556;
            v1552.stage = "sending";
            v1552.sendProgress = Math.min(99, Math.floor(v1555 * 100 / v1552.package.fileSize));
          }
          await v1292(v1552, v1206.lanFrame(v1206.wallpaper.COMPLETE));
          v1552.stage = "waiting_complete_ack";
          v1206.wallpaperACK(await v1554.lan(), v1206.wallpaper.COMPLETE_ACK);
          v1552.stage = "waiting_verification";
          v1206.wallpaperACK(await v1554.lan(), v1206.wallpaper.VERIFY);
          v1552.remoteVerified = true;
          v1552.sendProgress = 100;
          v1552.state = "done";
        } finally {
          await v1272(v1552);
        }
      }
      function v1294(v1559) {
        const v1560 = v1559.route?.targetVerified === true && v1559.route?.targetJoined === true && v1559.route?.ssid === v1559.spec.profile.ssid && v1240() - v1559.verifiedAt >= 0 && v1240() - v1559.verifiedAt <= 3500 && (!v1559.route.scope || v1214(v1559.route.scope, v1559.scope)) && (!v1559.route.metadata || v1214(v1559.route.metadata, v1559.scope)) && v1559.context.isCurrent?.() === true;
        return {
          ticket: v1559.ticket,
          scope: {
            ...v1559.scope
          },
          status: v1559.state,
          stage: v1559.stage,
          busy: v1559.busy,
          error: v1559.reason,
          connected: v1560,
          targetVerified: v1560,
          targetJoined: v1560,
          connecting: v1559.busy && v1559.stage === "connect",
          autoAvailable: true,
          standardAP: true,
          p2pSupported: false,
          legacyAPAvailability: "unknown",
          connectionMode: v1560 ? "wifi" : "",
          wifiSsid: v1560 ? v1559.route.ssid : "",
          local: v1559.local,
          preparationConfirmed: v1559.preparationConfirmed === true,
          packageReady: !!v1559.package,
          downloadProgress: v1559.downloadProgress || 0,
          sendProgress: v1559.sendProgress || 0,
          fileName: v1559.package?.fileName || v1559.spec.fileName,
          fileSize: v1559.package?.fileSize || 0,
          md5: v1559.package?.md5 || "",
          canApply: v1560 && !!v1559.package && !v1559.busy && (!v1559.local || v1559.preparationConfirmed),
          remoteVerified: v1559.remoteVerified === true,
          screenUpdated: null,
          logs: v1559.logs.slice()
        };
      }
      function v1295(v1561, v1562, v1563) {
        if (v1561.length !== (v1563 ? 6 : 4) || v1561[0] !== v1562.navId || v1561[1] !== v1562.scope.vin || v1561[2] !== v1562.scope.frame) {
          v1208("invalid_arguments");
        }
        if (v1246 && !v1246.cancelled) {
          v1208("session_busy");
        }
        const v1564 = v1289(v1561[3], v1563);
        const v1565 = v1261("wallpaper", v1562);
        v1565.spec = v1564;
        v1565.local = v1563;
        v1246 = v1565;
        if (v1563) {
          v1263(v1565, "prepare", async () => {
            const v1566 = v1209(await v1260(v1565, "asset.zip.build.begin", [{
              ...v1258(v1565),
              fileName: v1564.fileName,
              mainWidth: v1564.mainWidth,
              mainHeight: v1564.mainHeight,
              speedWidth: v1564.speedWidth,
              speedHeight: v1564.speedHeight
            }, v1561[4], v1561[5]], {
              late: v1567 => v1567?.ticket ? v1260(v1565, "asset.cancel", [{
                ...v1258(v1565),
                ticket: v1567.ticket
              }], {
                cleanup: true
              }) : null
            }));
            if (!v1566.ticket) {
              v1208("asset_begin_invalid");
            }
            v1565.asset = v1566.ticket;
            await v1290(v1565);
            v1565.state = "prepared";
            v1262(v1565, "prepared");
          });
        } else {
          v1565.state = "ready";
          v1565.stage = "ready";
        }
        return v1565.ticket;
      }
      async function v1296(v1568, v1569) {
        const v1570 = v1242.get(v1568[1]);
        const v1571 = ["navId", "frame", "epoch", "accountId", "vin"];
        if (!v1570 || v1570.kind !== "wallpaper" || v1568[0] !== v1569.navId || v1571.some(v1573 => v1570.scope[v1573] !== v1569.scope?.[v1573])) {
          v1208("stale_ticket");
        }
        if (v1214(v1570.scope, v1569.scope) && v1570.context.isCurrent?.() === true) {
          return;
        }
        const v1572 = {
          ...v1256(v1569),
          cancelled: false
        };
        v1257(v1572);
        if (v1572.scope.generation < v1570.scope.generation || v1570.busy || v1570.socket || !v1570.package || !v1570.asset) {
          v1208("stale_session");
        }
        Object.assign(v1570, v1572);
        v1570.route = null;
        v1570.verifiedAt = 0;
        v1570.deadline = 0;
        try {
          await v1290(v1570);
        } catch (v1574) {
          await v1273(v1570);
          throw v1574;
        }
      }
      async function v1297(v1575, v1576) {
        if (v1575.busy) {
          v1208("busy");
        }
        if (v1576 === "confirm-preparation") {
          return v1263(v1575, v1576, async () => {
            if (!v1575.local || !v1575.package) {
              v1208("package_not_ready");
            }
            await v1275(v1575, "wallpaper_prepare", "确认本地实验包", "此包仅在本机生成，不代表云审核通过。确认准备后可连接车机；传输确认不等于屏幕已经更新。");
            v1575.preparationConfirmed = true;
            v1575.state = "prepared";
          });
        }
        if (v1575.local && !v1575.preparationConfirmed) {
          v1208("preparation_not_confirmed");
        }
        if (v1576 === "download") {
          return v1263(v1575, v1576, async () => {
            if (v1575.local) {
              v1208("download_unavailable");
            }
            if (typeof v1575.spec.url !== "string" || !v1575.spec.url.startsWith("https://")) {
              v1208("download_unavailable");
            }
            const v1577 = v1575.asset;
            v1575.asset = null;
            v1575.package = null;
            if (v1577) {
              await v1260(v1575, "asset.cancel", [{
                ...v1258(v1575),
                ticket: v1577
              }], {
                cleanup: true
              });
            }
            v1257(v1575);
            const v1578 = v1209(await v1260(v1575, "asset.download.begin", [{
              ...v1258(v1575),
              url: v1575.spec.url,
              fileName: v1575.spec.fileName,
              ...(v1575.spec.fileSize != null ? {
                fileSize: v1575.spec.fileSize
              } : {}),
              ...(v1575.spec.md5 ? {
                md5: v1575.spec.md5
              } : {})
            }], {
              late: v1579 => v1579?.ticket ? v1260(v1575, "asset.cancel", [{
                ...v1258(v1575),
                ticket: v1579.ticket
              }], {
                cleanup: true
              }) : null
            }));
            if (!v1578.ticket) {
              v1208("asset_begin_invalid");
            }
            v1575.asset = v1578.ticket;
            await v1290(v1575);
            v1575.state = "downloaded";
          });
        }
        if (v1576 === "apply") {
          return v1263(v1575, v1576, () => v1293(v1575));
        }
        if (["connect", "check"].includes(v1576)) {
          return v1263(v1575, v1576, async () => {
            if (v1576 === "connect") {
              const v1580 = v1209(await v1260(v1575, "wifi.join", [{
                ...v1258(v1575),
                ssid: v1575.spec.profile.ssid,
                password: v1575.spec.profile.password || "",
                carIp: v1575.spec.carIp,
                joinOnce: false
              }]));
              if (v1580.targetVerified !== true) {
                v1208("route_not_verified");
              }
            }
            await v1291(v1575);
            await v1272(v1575);
            v1575.state = "ready";
          }, 45);
        }
        v1208("unavailable");
      }
      function v1298(v1581) {
        return v1581?.ok === true && typeof v1581.ticket === "string" && v1581.ticket.length > 0 && v1581.ticket.length <= 128 && typeof v1581.recordingId === "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v1581.recordingId);
      }
      function v1299(v1582) {
        const v1583 = {};
        const v1584 = {};
        const v1585 = {
          speedKph: [0, 400],
          socPercent: [0, 100],
          voltageV: [0, 200],
          tempC: [-50, 150],
          headLockState: [0, 2],
          socRaw: [0, 4294967295],
          powerRaw: [0, 100000],
          powerDeltaRaw: [-1500, 98500],
          odometerRaw: [0, 4294967295],
          modeRaw: [0, 4294967295],
          lightRaw: [0, 4294967295],
          gearCode: [0, 3]
        };
        for (const [v1586, [v1587, v1588]] of Object.entries(v1585)) {
          const v1589 = v1582.telemetry?.[v1586];
          const v1590 = v1582.telemetryTimes?.[v1586];
          if (!Number.isSafeInteger(v1590) || v1590 <= 0 || v1590 > v1240() + 1000 || v1240() - v1590 >= 10000) {
            continue;
          }
          if ((typeof v1589 !== "number" || !Number.isFinite(v1589) || !(v1589 >= v1587) || !(v1589 <= v1588)) && (v1586 !== "gearCode" || v1589 !== null)) {
            continue;
          }
          v1583[v1586] = v1589;
          v1584[v1586] = v1590;
        }
        return {
          telemetry: v1583,
          telemetryTimes: v1584
        };
      }
      function v1300(v1591, v1592, v1593) {
        if (!v1298(v1592) || !v1214(v1593.scope, v1591.scope) || !v1216(v1592.recordingId, v1593.recordingId)) {
          v1208("recording_receipt_invalid");
        }
        v1257(v1593, true, false);
        if (v1592.metadata && !v1214(v1592.metadata, v1593.scope)) {
          v1208("stale_session");
        }
        const v1594 = v1216(v1592.connectionGeneration, v1593.lease?.generation);
        const v1595 = v1594 && v1592.nativeAuthenticated === true && v1592.authorizationFresh === true && v1592.canAcceptTelemetry === true && (!v1593.renewal || v1593.renewalFresh === true);
        const v1596 = v1593.authenticated && v1593.authorizedUntil > v1240() && !v1593.renewal?.serviceAttempted;
        const v1597 = v1592.connected === true && (v1595 || v1596 && v1594 && v1592.canObserveTelemetry === true);
        return {
          ...v1592,
          backgroundAuthRenewalSupported: v1593.renewal?.supported === true,
          authenticated: v1597,
          connected: v1592.connected === true,
          authorizationFresh: v1597,
          ...(v1597 ? v1299(v1592) : {
            telemetry: {},
            telemetryTimes: {}
          })
        };
      }
      async function v1301(v1598, v1599, v1600) {
        const v1601 = v1209(v1599);
        const v1602 = v1244.get(v1600);
        const v1603 = {
          ...v1601,
          backgroundAuthRenewalSupported: false,
          authenticated: false,
          authorizationFresh: false,
          telemetry: {},
          telemetryTimes: {}
        };
        if (!v1298(v1601)) {
          return v1603;
        }
        if (v1602 && (!v1214(v1602.scope, v1598.scope) || !v1216(v1602.recordingId, v1601.recordingId))) {
          v1208("recording_receipt_invalid");
        }
        const v1604 = {
          ...v1256(v1598),
          cancelled: false
        };
        v1257(v1604, true, false);
        if (v1601.metadata && !v1214(v1601.metadata, v1604.scope)) {
          v1208("stale_session");
        }
        if (v1601.scope && !v1214(v1601.scope, v1604.scope)) {
          v1208("stale_session");
        }
        v1244.set(v1601.ticket, Object.freeze({
          ...v1604,
          recordingId: v1601.recordingId
        }));
        if (!v1264()) {
          return v1603;
        }
        try {
          const v1605 = v1209(await v1260(v1604, "session.renew.poll", [{
            ...v1258(v1604),
            recordingId: v1601.recordingId
          }], {
            authorization: false
          }));
          if (!v1216(v1605.recordingId, v1601.recordingId)) {
            v1208("renewal_receipt_invalid");
          }
          if (v1605.scope && !v1214(v1605.scope, v1604.scope)) {
            v1208("stale_session");
          }
          const v1606 = v1605.backgroundAuthRenewalSupported === true && v1605.active === true && v1605.attachedNative === true && v1605.consented === true && v1605.recipeComplete === true;
          const v1607 = v1606 && v1605.authorizationFresh === true && v1605.nativeAuthenticated === true && v1605.canAcceptTelemetry === true && Number.isSafeInteger(v1605.authorizationRemainingMs) && v1605.authorizationRemainingMs > 0 && v1605.authorizationRemainingMs <= 300000 && v1601.nativeAuthenticated === true && v1601.authorizationFresh === true && v1601.canAcceptTelemetry === true && v1216(v1605.connectionGeneration, v1601.connectionGeneration);
          return {
            ...v1601,
            backgroundAuthRenewalSupported: v1606,
            authorizationFresh: v1607,
            authenticated: v1607 && v1601.authenticated === true,
            connected: v1601.connected === true,
            ...(v1607 && v1601.connected === true ? v1299(v1601) : {
              telemetry: {},
              telemetryTimes: {}
            })
          };
        } catch (v1608) {
          if (["stale_session", "stale_navigation", "renewal_receipt_invalid"].includes(v1212(v1608))) {
            throw v1608;
          }
          return v1603;
        }
      }
      async function v1302(v1609, v1610, v1611, v1612 = {}) {
        const v1613 = {
          ...v1256(v1609),
          cancelled: false
        };
        if (!v1612.cleanup) {
          v1257(v1613, !["detachRideRecording", "rideRecordingAction"].includes(v1610));
        }
        return v1260(v1613, "compat.call", [{
          method: v1610,
          args: v1611,
          scope: v1613.scope,
          navId: v1613.navId
        }], v1612);
      }
      async function v1303(v1614, v1615, v1616) {
        await v1302(v1614, "rideRecordingAction", [v1614.navId, v1615.lease?.leaseId || "", "cancel_begin"], {
          cleanup: true
        });
        let v1617 = await v1302(v1614, "pollRideRecording", [v1614.navId, ""], {
          cleanup: true
        });
        if (typeof v1617 === "string") {
          try {
            v1617 = JSON.parse(v1617);
          } catch {
            v1617 = null;
          }
        }
        if (v1298(v1617) && v1617.sourceLeaseId === v1615.lease?.leaseId && v1216(v1617.sourceConnectionGeneration, v1615.lease?.generation) && (!v1617.metadata || v1214(v1617.metadata, v1615.scope)) && (!v1617.scope || v1214(v1617.scope, v1615.scope)) && (!v1616?.recordingId || v1216(v1616.recordingId, v1617.recordingId))) {
          await v1302(v1614, "rideRecordingAction", [v1614.navId, v1617.ticket, "stop"], {
            cleanup: true
          });
        }
        await v1273(v1615).catch(() => {});
      }
      async function v1304(v1618, v1619) {
        if (v1250) {
          v1208("recording_busy");
        }
        v1250 = true;
        let v1620 = null;
        try {
          const v1621 = v1209(await v1302(v1618, "pollRideRecording", [v1618.navId, v1619[1]], {
            allowFailure: true
          }));
          if (!v1298(v1621)) {
            v1208(v1211(v1621, "stale_ticket"));
          }
          if (["completed", "interrupted", "save_failed", "ending"].includes(v1621.recordState)) {
            return v1302(v1618, "rideRecordingAction", v1619, {
              allowFailure: true
            });
          }
          if (!["waiting", "recording", "gap"].includes(v1621.recordState) || v1621.busy === true) {
            v1208("retry_unavailable");
          }
          const v1622 = v1243.get(v1619[1]);
          if (v1622 && (!v1214(v1622.scope, v1618.scope) || !v1216(v1622.recordingId, v1621.recordingId))) {
            v1208("stale_session");
          }
          if (v1245 && v1245 !== v1622 && !v1245.cancelled) {
            v1208("session_busy");
          }
          const v1623 = v1209(await v1302(v1618, "rideRecordingAction", [v1618.navId, v1621.ticket, "pause"], {
            allowFailure: true
          }));
          if (v1623.ok !== true || v1623.accepted !== true || !v1216(v1623.recordingId, v1621.recordingId)) {
            v1208(v1211(v1623, "retry_unavailable"));
          }
          if (v1622) {
            await v1273(v1622);
          }
          v1243.delete(v1619[1]);
          v1244.delete(v1619[1]);
          if (v1622) {
            await v1241(5100);
          }
          v1620 = v1287([v1618.navId, v1618.scope.vin, v1618.scope.frame, "twin"], v1618);
          await v1620.work;
          v1257(v1620);
          if (!v1620.authenticated || !v1620.dashRequested || !v1620.periodRequested) {
            v1208(v1620.reason || "not_authenticated");
          }
          const v1624 = v1209(await v1302(v1618, "pollRideRecording", [v1618.navId, v1621.ticket], {
            allowFailure: true
          }));
          if (!v1298(v1624) || !v1216(v1624.recordingId, v1621.recordingId) || !["waiting", "recording", "gap"].includes(v1624.recordState)) {
            v1208("stale_ticket");
          }
          const v1625 = v1209(await v1302(v1618, "rideRecordingAction", [v1618.navId, v1621.ticket, "resume"], {
            allowFailure: true
          }));
          if (!v1298(v1625) || v1625.accepted !== true || !v1216(v1625.recordingId, v1621.recordingId)) {
            v1208(v1211(v1625, "recording_receipt_invalid"));
          }
          v1620.recordingId = v1621.recordingId;
          v1243.set(v1625.ticket, v1620);
          await v1269(v1620, v1625);
          const v1626 = v1209(await v1302(v1618, "pollRideRecording", [v1618.navId, v1625.ticket], {
            allowFailure: true
          }));
          return {
            ...v1300(v1618, v1298(v1626) ? v1626 : v1625, v1620),
            accepted: true
          };
        } catch (v1627) {
          if (v1620 && !v1620.recordingId) {
            await v1273(v1620).catch(() => {});
          }
          throw v1627;
        } finally {
          v1250 = false;
        }
      }
      async function v1305(v1628, v1629, v1630) {
        const v1631 = v1222[v1628];
        if (v1628 === "rideRecordingAction" && v1629[2] === "retry" && v1629[1]) {
          return v1304(v1630, v1629);
        }
        if (v1628 === "beginRideRecording") {
          if (v1629.length !== 4 || v1629[0] !== v1630.navId || v1629[1] !== v1630.scope.vin || v1629[2] !== v1630.scope.frame || typeof v1629[3] !== "boolean") {
            v1208("invalid_arguments");
          }
          if (v1250) {
            v1208("recording_busy");
          }
          v1250 = true;
          let v1634 = null;
          let v1635 = false;
          let v1636 = null;
          try {
            const v1637 = v1209(await v1302(v1630, "pollRideRecording", [v1630.navId, ""]));
            if (v1298(v1637)) {
              const v1639 = v1243.get(v1637.ticket);
              return {
                ...(await (v1639 && v1214(v1639.scope, v1630.scope) && v1639.context.isCurrent?.() === true ? v1300(v1630, v1637, v1639) : v1301(v1630, v1637, v1637.ticket))),
                accepted: true
              };
            }
            if (v1637.state !== "idle" || v1637.ticket || v1637.recordingId) {
              v1208("recording_busy");
            }
            if (v1245 && !v1245.cancelled && (!v1214(v1245.scope, v1630.scope) || v1245.mode !== "twin" || v1245.recordingId)) {
              v1208("session_busy");
            }
            v1634 = v1245;
            if (v1634 && !v1634.recordingId && (v1634.cancelled || v1634.state === "error" || v1634.state === "cancelled")) {
              await v1273(v1634).catch(() => {});
              v1634 = null;
            }
            if (!v1634 || !v1214(v1634.scope, v1630.scope)) {
              v1634 = v1287([v1629[0], v1629[1], v1629[2], "twin"], v1630);
            }
            if (v1634.recordingId || v1634.mode !== "twin") {
              v1208("session_busy");
            }
            await v1634.work;
            v1257(v1634);
            if (!v1634.authenticated || !v1634.dashRequested || !v1634.periodRequested) {
              v1208(v1634.reason || "not_authenticated");
            }
            v1635 = true;
            v1636 = v1209(await v1302(v1630, v1631, v1629, {
              allowFailure: true
            }));
            if (v1636.ok === false) {
              v1208(v1211(v1636, "native_failed"));
            }
            if (!v1298(v1636) || v1636.accepted !== true || v1636.pending === true || v1636.queued === true || v1636.submitted === true || !["waiting", "recording", "gap"].includes(v1636.recordState)) {
              v1208("recording_receipt_invalid");
            }
            v1634.recordingId = v1636.recordingId;
            v1243.set(v1636.ticket, v1634);
            await v1269(v1634, v1636);
            const v1638 = v1209(await v1302(v1630, "pollRideRecording", [v1630.navId, v1636.ticket], {
              allowFailure: true
            }));
            return {
              ...v1300(v1630, v1298(v1638) ? v1638 : v1636, v1634),
              accepted: true
            };
          } catch (v1640) {
            if (v1634) {
              if (v1635) {
                await v1303(v1630, v1634, v1636).catch(() => v1273(v1634).catch(() => {}));
                if (v1636?.ticket) {
                  v1243.delete(v1636.ticket);
                }
              } else if (!v1634.recordingId) {
                await v1273(v1634).catch(() => {});
              }
            }
            throw v1640;
          } finally {
            v1250 = false;
          }
        }
        const v1632 = v1243.get(v1629[1]);
        if (v1632 && !v1214(v1632.scope, v1630.scope) && v1628 !== "detachRideRecording") {
          v1208("stale_session");
        }
        const v1633 = await v1302(v1630, v1631, v1629, {
          allowFailure: v1628 === "rideRecordingAction"
        });
        if (v1628 === "rideRecordingAction" && v1629[2] === "stop") {
          const v1641 = v1209(v1633);
          const v1642 = ["ending", "completed", "interrupted", "save_failed"].includes(v1641.recordState);
          if ((v1641.ok !== true || v1641.accepted !== true) && !v1642) {
            return v1633;
          }
          if (v1632 && v1641.recordingId && !v1216(v1641.recordingId, v1632.recordingId)) {
            v1208("recording_receipt_invalid");
          }
          if (v1632) {
            await v1273(v1632);
            v1243.delete(v1629[1]);
          }
          const v1643 = v1244.get(v1629[1]);
          if (v1643) {
            try {
              await v1260(v1643, "session.renew.cancel", [{
                ...v1258(v1643),
                recordingId: v1643.recordingId
              }], {
                cleanup: true
              });
            } catch {}
            v1244.delete(v1629[1]);
          }
          return v1633;
        }
        if (["restoreRideRecording", "pollRideRecording"].includes(v1628) && v1632 && v1632.context.isCurrent?.() === true) {
          if (v1632.renewal) {
            await v1270(v1632);
          }
          return v1300(v1630, v1209(v1633), v1632);
        }
        if (["restoreRideRecording", "pollRideRecording"].includes(v1628)) {
          return v1301(v1630, v1633, v1629[1]);
        }
        return v1633;
      }
      async function v1306(v1644, v1645, v1646) {
        const v1647 = v1644.replace(/^cast\./, "");
        const v1648 = v1646 ? {
          ...v1256(v1646),
          cancelled: false
        } : null;
        const v1649 = (v1651, v1652 = {}, v1653 = {}) => v1648 ? v1260(v1648, v1651, [{
          ...v1258(v1648),
          scope: v1648.scope,
          ...v1652
        }], v1653) : v1239().call(v1651, v1652);
        if (["capabilities", "available"].includes(v1647)) {
          const v1654 = v1209(await v1649("cast.capabilities"));
          v1248 = {
            ...v1654
          };
          if (v1647 === "available") {
            return v1654.available === true && v1654.recipeVersion === 1;
          } else {
            return {
              ...v1654,
              available: v1654.available === true && v1654.recipeVersion === 1,
              wifiJoinSupported: v1239()?.has?.("wifi.join") === true,
              backgroundAuthRenewalSupported: false
            };
          }
        }
        if (v1647 === "version") {
          return v1649("cast.version");
        }
        if (v1647 === "pair") {
          const v1655 = v1209(v1645[0]);
          if (!v1655.ssid) {
            v1208("wifi_profile_invalid");
          }
          v1247 = v1655;
          return v1649("cast.pair", {
            ...v1258(v1648),
            targetIP: "192.168.0.1",
            recipe: v1206.castRecipe()
          });
        }
        if (v1647 === "start") {
          if (v1248?.recipeVersion !== 1) {
            v1208("unavailable");
          }
          const v1656 = v1645.length ? v1209(v1645[0]) : {};
          const v1657 = v1656.profile || v1247;
          if (!v1657?.ssid) {
            v1208("wifi_profile_invalid");
          }
          const v1658 = v1209(await v1260(v1648, "wifi.join", [{
            ...v1258(v1648),
            ssid: v1657.ssid,
            password: v1657.password || "",
            carIp: "192.168.0.1",
            joinOnce: false
          }]));
          if (v1658.targetVerified !== true) {
            v1208("route_not_verified");
          }
          const v1659 = v1215();
          v1249 = {
            ...v1648,
            attemptId: v1659,
            sessionId: null
          };
          const v1660 = await v1649("cast.start", {
            ...v1258(v1648),
            scope: v1648.scope,
            targetIP: v1658.ip || "192.168.0.1",
            recipe: v1206.castRecipe(),
            attemptId: v1659,
            settings: {
              ...v1656,
              profile: undefined,
              captureSource: v1656.captureSource || "screen",
              frameFormat: v1656.frameFormat || "traditional"
            }
          }, {
            late: v1661 => v1661?.sessionId || v1661?.ticket ? v1260(v1648, "cast.stop", [{
              ...v1258(v1648),
              scope: v1648.scope,
              expectedSessionId: v1661.sessionId || v1661.ticket
            }], {
              cleanup: true
            }) : null
          });
          if (v1660?.ok !== false && v1249?.attemptId === v1659) {
            v1249.sessionId = v1660.sessionId || v1660.ticket || null;
          }
          return v1660;
        }
        if (v1647 === "stop") {
          const v1662 = v1645[0] && typeof v1645[0] === "object" ? v1645[0].expectedSessionId || v1645[0].ticket : null;
          const v1663 = ["navId", "frame", "epoch", "accountId", "vin"];
          if (!v1249 || !v1648 || v1663.some(v1666 => v1249.scope[v1666] !== v1648.scope[v1666]) || v1662 && v1662 !== v1249.sessionId) {
            v1208("stale_cast_session");
          }
          const v1664 = v1249;
          if (!v1664.sessionId) {
            v1208("cast_session_pending");
          }
          const v1665 = await v1260(v1664, "cast.stop", [{
            ...v1258(v1664),
            scope: v1664.scope,
            expectedSessionId: v1664.sessionId,
            attemptId: v1664.attemptId
          }], {
            cleanup: true
          });
          if (v1665?.ok !== true || v1665.accepted !== true || v1665.stoppedSessionId !== v1664.sessionId) {
            v1208(v1665?.reason || v1665?.error || "cast_stop_unconfirmed");
          }
          if (v1249 === v1664) {
            v1249 = null;
          }
          return v1665;
        }
        if (v1647 === "forgetProfile") {
          v1247 = null;
        }
        const v1650 = {
          getStatus: "cast.status",
          getDiagnostics: "cast.diagnostics",
          stop: "cast.stop",
          requestProjection: "cast.requestProjection",
          forgetProfile: "cast.forgetProfile",
          setTier: "cast.setTier"
        };
        if (!v1650[v1647]) {
          v1208("unavailable");
        }
        return v1649(v1650[v1647], v1647 === "setTier" ? {
          tier: v1645[0]
        } : v1647 === "getDiagnostics" ? {
          limit: v1645[0] ?? 50
        } : v1647 === "requestProjection" ? {
          attemptId: v1215()
        } : v1647 === "forgetProfile" && v1249?.sessionId ? {
          expectedSessionId: v1249.sessionId
        } : {});
      }
      const v1307 = new Map();
      const v1308 = Object.freeze({
        has: v1667 => v1255(v1667),
        available: () => v1255("beginInductiveSession"),
        withDiagnostic: async (v1668, v1669) => {
          if (typeof v1669 !== "function") {
            v1208("invalid_tool_session");
          }
          if (v1245 && !v1245.cancelled) {
            v1208("session_busy");
          }
          const v1670 = v1261("diagnostic", v1668);
          v1245 = v1670;
          try {
            v1257(v1670);
            return await v1669(Object.freeze({
              ticket: v1670.ticket,
              scope: v1670.scope,
              isCurrent: () => {
                try {
                  v1257(v1670);
                  return true;
                } catch {
                  return false;
                }
              }
            }));
          } finally {
            await v1273(v1670);
          }
        },
        withSession: async (v1671, v1672, v1673) => {
          if (!["telemetry", "provisioning"].includes(v1672) || typeof v1673 !== "function") {
            v1208("invalid_tool_session");
          }
          if (v1245 && !v1245.cancelled) {
            v1208("session_busy");
          }
          const v1674 = v1261("ble", v1671);
          v1245 = v1674;
          v1674.mode = v1672 === "telemetry" ? "twin" : "pair2";
          try {
            await v1278(v1674);
            await v1282(v1674, v1672 === "provisioning");
            await v1283(v1674);
            const v1675 = Object.freeze({
              ticket: v1674.ticket,
              leaseId: v1674.lease.leaseId,
              generation: v1674.lease.generation,
              snapshot: () => {
                v1257(v1674);
                return {
                  ...v1286(v1674),
                  protocolVerified: v1674.authenticated,
                  generation: v1674.lease?.generation || "",
                  backgroundAuthRenewalSupported: false
                };
              },
              exchangeRaw: async (v1676, v1677, v1678 = {}) => {
                v1257(v1674);
                await v1275(v1674, "vehicle_debug_command", "确认发送蓝牙调试指令", "此指令可能改变车辆状态，只执行一次。车辆必须停稳；收发回执不代表动作成功。");
                if (![90, 92, 114, 124, 127].includes(v1676)) {
                  const v1679 = v1674.telemetry.speedKph;
                  const v1680 = v1674.telemetryTimes.speedKph;
                  if (!Number.isFinite(v1679) || !Number.isSafeInteger(v1680) || v1680 > v1240() || v1240() - v1680 > 5000 || v1679 >= 3) {
                    v1208("stationary_required");
                  }
                }
                return v1280(v1674, v1676, v1677, v1678.expected, v1678.soft === true, v1678.timeoutMs ?? 10000);
              }
            });
            v1307.set(v1675, v1674);
            return await v1673(v1675);
          } finally {
            await v1273(v1674);
            for (const [v1681, v1682] of v1307) {
              if (v1682 === v1674) {
                v1307.delete(v1681);
              }
            }
          }
        },
        exchange: async (v1683, v1684, v1685, v1686, v1687 = false) => {
          const v1688 = v1307.get(v1683);
          if (!v1688) {
            v1208("stale_tool_session");
          }
          v1257(v1688);
          return v1280(v1688, v1684, v1685, v1686, v1687);
        },
        poll: async v1689 => {
          const v1690 = v1307.get(v1689);
          if (!v1690) {
            v1208("stale_tool_session");
          }
          return v1288(v1690);
        },
        cancel: async v1691 => {
          const v1692 = v1307.get(v1691);
          v1307.delete(v1691);
          return v1273(v1692);
        }
      });
      let v1309 = null;
      function v1310() {
        const v1693 = v1205.IOSVehicleTools;
        if (v1693 && v1693 !== v1309) {
          v1693.configureCore?.(v1308);
          v1309 = v1693;
        }
        return v1693;
      }
      async function v1311(v1694, v1695 = [], v1696 = undefined) {
        if (!Array.isArray(v1695) || !v1255(v1694)) {
          v1208("unavailable");
        }
        v1696 ||= v1251?.();
        if (v1694.startsWith("cast.")) {
          return v1306(v1694, v1695, v1696);
        }
        if (["beginAe4ControllerWrite", "pollAe4ControllerWrite", "selectAe4ControllerWrite", "cancelAe4ControllerWrite"].includes(v1694)) {
          return v1253(v1694, v1695, v1696);
        }
        if (v1694 === "inductiveCapabilities") {
          return v1217({
            version: 2,
            supported2: true,
            readOnly: true,
            systemBondState: "unknown_os_managed",
            authorizationWindowMs: 300000
          });
        }
        if (v1694 === "wallpaperLocalCapabilities") {
          return v1217({
            version: 2,
            singleImage: true,
            displayWallpaperSet: "1",
            numberMin: 1,
            numberMax: 10,
            standardAP: true,
            p2pSupported: false
          });
        }
        if (!v1696) {
          v1208("stale_session");
        }
        if (v1222[v1694]) {
          return v1305(v1694, v1695, v1696);
        }
        if (v1310()?.has?.(v1694) === true) {
          return v1310().call(v1694, v1695, v1696);
        }
        if (v1694 === "beginInductiveSession") {
          const v1701 = v1287(v1695, v1696);
          return v1217(v1286(v1701));
        }
        if (v1694 === "beginWallpaperTransfer" || v1694 === "beginWallpaperTransferLocal") {
          return v1295(v1695, v1696, v1694.endsWith("Local"));
        }
        const v1697 = /wallpaper/i.test(v1694) ? "wallpaper" : "ble";
        if (/^cancel/.test(v1694)) {
          if (v1695[1] === "") {
            const v1702 = v1697 === "ble" ? v1245 : v1246;
            if (v1702 && v1695[0] === v1702.navId && v1214(v1702.scope, v1696.scope)) {
              return v1273(v1702);
            } else {
              return false;
            }
          }
          return v1273(v1274(v1695, v1696, v1697, true));
        }
        if (v1697 === "wallpaper") {
          await v1296(v1695, v1696);
        }
        const v1698 = v1694 === "inductiveSessionAction" && ["cancel", "disconnect"].includes(v1695[2]);
        const v1699 = v1694 === "inductiveSessionAction" && ["refresh", "retry"].includes(v1695[2]);
        const v1700 = v1274(v1695, v1696, v1697, v1698 || v1699);
        if (v1699) {
          v1257(v1700, true, false);
          v1700.authorizedUntil = 0;
          v1700.authenticated = false;
          v1700.connected = false;
        }
        if (v1694 === "pollInductiveSession") {
          return v1217(await v1288(v1700));
        }
        if (v1694 === "inductiveSessionAction") {
          const v1703 = v1695[2];
          if (["cancel", "disconnect"].includes(v1703)) {
            return v1217({
              ticket: v1700.ticket,
              accepted: await v1273(v1700)
            });
          }
          const v1704 = ["refresh", "retry"].includes(v1703) ? async () => {
            await v1278(v1700);
            await v1282(v1700);
            if (v1700.mode === "twin") {
              await v1283(v1700);
            }
          } : v1703 === "pair" ? () => v1284(v1700) : ["start", "connect"].includes(v1703) ? async () => {
            if (!v1700.authenticated) {
              await v1282(v1700);
            }
            if (v1700.mode === "twin" || v1703 === "start") {
              await v1283(v1700);
            }
          } : null;
          if (!v1704) {
            v1208("unavailable");
          }
          return v1217(v1263(v1700, v1703, v1704, v1703 === "pair" ? 240 : 120));
        }
        if (v1694 === "pollWallpaperTransfer") {
          if (!v1700.busy && v1700.route && v1240() - v1700.verifiedAt >= 1500) {
            const v1705 = v1209(await v1260(v1700, "wifi.status", [{
              ...v1258(v1700),
              ssid: v1700.spec.profile.ssid,
              password: v1700.spec.profile.password || "",
              carIp: v1700.spec.carIp
            }], {
              allowFailure: true
            }));
            v1700.route = v1705.targetVerified === true ? v1705 : null;
            v1700.verifiedAt = v1240();
          }
          return v1217(v1294(v1700));
        }
        if (v1694 === "wallpaperTransferAction") {
          return v1217(await v1297(v1700, v1695[2]));
        }
        v1208("unavailable");
      }
      return Object.freeze({
        has: v1255,
        requiredMethods: v1254,
        call: v1311,
        configureContext: v1706 => {
          v1251 = v1706;
        },
        dispose: () => Promise.all([...v1242.values()].map(v1273))
      });
    }
    const v1224 = v1223();
    v1205.IOSVehicleDriver = Object.freeze({
      ...v1224,
      create: v1223
    });
  })();
  (() => {
    const v1707 = window;
    const v1708 = ["inductiveCapabilities", "beginInductiveSession", "pollInductiveSession", "inductiveSessionAction", "cancelInductiveSession", "beginAe4ControllerWrite", "pollAe4ControllerWrite", "selectAe4ControllerWrite", "cancelAe4ControllerWrite", "beginWallpaperTransfer", "beginWallpaperTransferLocal", "wallpaperLocalCapabilities", "pollWallpaperTransfer", "wallpaperTransferAction", "cancelWallpaperTransfer", "beginRideRecording", "restoreRideRecording", "pollRideRecording", "rideRecordingAction", "detachRideRecording", "listRideRecordings", "readRideRecording", "deleteRideRecording", "exportRideRecording", "listRideRecords", "readRideRecord", "deleteRideRecord", "exportRideRecord", "beginGpsSpeed", "pollGpsSpeed", "endGpsSpeed", "setKeepScreenOn", "notifyGroups", "setNotifyGroup", "widgetSettings", "widgetSettingsFor", "widgetSettingsForSize", "setWidgetSetting", "setWidgetSettingFor", "resetWidgetSettings", "refreshWidget", "refreshWidgets", "pinWidget", "requestAddWidget", "widgetAddStatus", "liveUpdateStatus", "liveUpdateStart", "liveUpdateUpdate", "liveUpdateEnd", "channelsStatus", "syncStatus", "openSettings", "openMeterOta", "openBtDebug", "openInductive", "meterOta.pick", "meterOta.version", "meterOta.push", "meterOta.cancel", "meterOta.status", "btDebug.commands", "btDebug.send", "btDebug.diagnostics"];
    const v1709 = ["version", "capabilities", "available", "getStatus", "getDiagnostics", "pair", "start", "stop", "requestProjection", "forgetProfile", "setTier"];
    const v1710 = new Map();
    const v1711 = new Map();
    const v1712 = new Map();
    let v1713 = () => null;
    let v1714 = null;
    let v1715 = 0;
    const v1716 = () => v1707.__zeehoWebPreview === true || v1707.PLATFORM?.preview?.() === true;
    const v1717 = () => !v1716() && v1707.IOSBR?.available?.() === true;
    const v1718 = v1738 => typeof v1738 === "string" ? JSON.parse(v1738) : v1738;
    const v1719 = v1739 => /Ae4ControllerWrite$/.test(v1739) ? "ae4-controller" : /wallpaper/i.test(v1739) ? "wallpaper" : /inductive/i.test(v1739) ? "inductive" : /ride/i.test(v1739) ? "ride" : /gps/i.test(v1739) ? "gps" : v1739.startsWith("cast.") ? "cast" : v1739;
    const v1720 = (v1740, v1741) => /^(cancelAe4ControllerWrite|cancelInductiveSession|cancelWallpaperTransfer|detachRideRecording|endGpsSpeed|cast.stop)$/.test(v1740) || v1740 === "rideRecordingAction" && v1741[2] === "stop";
    const v1721 = v1742 => /Capabilities$/.test(v1742) || ["cast.version", "cast.capabilities", "cast.available", "cast.getDiagnostics"].includes(v1742);
    const v1722 = v1743 => !!v1743 && v1743.isCurrent?.() !== false && !!v1743.navId && !!v1743.vin && typeof v1743.frame === "string" && !!v1743.frame && Number.isSafeInteger(v1743.scope?.epoch) && Number.isSafeInteger(v1743.scope?.generation) && v1743.scope.frame === v1743.frame && v1743.scope.navId === v1743.navId && v1743.scope.vin === v1743.vin && typeof v1743.scope.accountId === "string" && !!v1743.scope.accountId;
    const v1723 = v1744 => v1744 ? JSON.stringify([v1744.navId, v1744.vin, v1744.frame, v1744.scope?.epoch, v1744.scope?.generation, v1744.scope?.accountId]) : "";
    function v1724(v1745) {
      const v1746 = v1707.IOSVehicleDriver;
      if (!v1746 || typeof v1746.call !== "function" || v1746.has?.(v1745) !== true) {
        return false;
      }
      const v1747 = v1746.requiredMethods?.(v1745);
      return Array.isArray(v1747) && v1747.length > 0 && v1747.every(v1748 => v1707.IOSBR.has?.(v1748) === true);
    }
    function v1725(v1749, v1750, v1751) {
      const v1752 = {
        ...(v1751 || {}),
        scope: v1751?.scope || null,
        navId: v1751?.navId || ""
      };
      if (v1724(v1749)) {
        return v1707.IOSVehicleDriver.call(v1749, v1750, v1751 ? v1752 : undefined);
      } else {
        return v1707.IOSBR.call("compat.call", {
          method: v1749,
          args: v1750,
          scope: v1752.scope,
          navId: v1752.navId
        });
      }
    }
    function v1726(v1753) {
      if (v1716()) {
        return false;
      }
      if (v1717()) {
        if (v1707.IOSVehicleDriver?.requiredMethods?.(v1753)) {
          return v1724(v1753);
        }
        return v1707.IOSBR.has?.("compat.call") === true && v1707.IOSBR.has?.("compat." + v1753) === true;
      }
      const v1754 = v1753.startsWith("cast.") ? v1707.ZeehoCast : v1707.ZeehoShell;
      return typeof v1754?.[v1753.replace(/^cast\./, "")] === "function";
    }
    function v1727(v1755, v1756, v1757) {
      const v1758 = v1723(v1756) + "|" + v1719(v1755);
      v1711.set(v1758, (v1711.get(v1758) || 0) + 1);
      if (v1717() && v1726(v1755)) {
        try {
          return Promise.resolve(v1725(v1755, v1757, v1756));
        } catch (v1759) {
          return Promise.reject(v1759);
        }
      }
      return Promise.reject(new Error("native_capability_unavailable"));
    }
    function v1728(v1760) {
      if (typeof v1760 === "string") {
        const v1761 = v1760.trim();
        if (!v1761.startsWith("{")) {
          if (v1761.length <= 256) {
            return v1761;
          } else {
            return "";
          }
        }
        try {
          v1760 = JSON.parse(v1761);
        } catch {
          return "";
        }
      }
      if (typeof v1760?.ticket === "string" && v1760.ticket.length <= 256) {
        return v1760.ticket;
      } else {
        return "";
      }
    }
    function v1729(v1762, v1763, v1764, v1765) {
      const v1766 = v1728(v1764);
      if (/^beginWallpaper/.test(v1762)) {
        if (v1766) {
          return v1727("cancelWallpaperTransfer", v1763, [v1763.navId, v1766]);
        } else {
          return Promise.resolve(null);
        }
      }
      if (v1762 === "beginAe4ControllerWrite") {
        if (v1766) {
          return v1727("cancelAe4ControllerWrite", v1763, [v1763.navId, v1766]);
        } else {
          return Promise.resolve(null);
        }
      }
      if (v1762 === "beginInductiveSession") {
        if (v1766) {
          return v1727("cancelInductiveSession", v1763, [v1763.navId, v1766]);
        } else {
          return Promise.resolve(null);
        }
      }
      if (v1762 === "beginRideRecording") {
        if (v1766) {
          return v1727("rideRecordingAction", v1763, [v1763.navId, v1766, "stop"]);
        } else {
          return Promise.resolve(null);
        }
      }
      if (v1762 === "beginGpsSpeed") {
        return v1727("endGpsSpeed", v1763, [v1763.navId]);
      }
      if (v1762 === "cast.start" || v1762 === "cast.requestProjection") {
        let v1767;
        try {
          v1767 = v1718(v1764);
        } catch {
          v1767 = null;
        }
        const v1768 = typeof v1767?.sessionId === "string" ? v1767.sessionId : typeof v1767?.ticket === "string" ? v1767.ticket : "";
        if (v1768) {
          return v1727("cast.stop", v1763, [{
            expectedSessionId: v1768
          }]);
        }
        const v1769 = typeof v1767?.attemptId === "string" ? v1767.attemptId : "";
        if (v1769) {
          return v1727("cast.stop", v1763, [{
            attemptId: v1769
          }]);
        }
        if (v1765 !== v1715) {
          return Promise.resolve(null);
        }
        return v1727("cast.stop", v1763, []);
      }
      return Promise.resolve(null);
    }
    async function v1730(v1770, v1771 = [], v1772 = undefined) {
      if (!Array.isArray(v1771) || !v1726(v1770)) {
        throw new Error("native_capability_unavailable");
      }
      if (!v1717()) {
        const v1779 = v1770.startsWith("cast.") ? v1707.ZeehoCast : v1707.ZeehoShell;
        return v1779[v1770.replace(/^cast\./, "")](...v1771);
      }
      const v1773 = v1770 === "cast.stop" ? v1714 || (v1772 === undefined ? v1713() : v1772) : v1772 === undefined ? v1713() : v1772;
      const v1774 = v1723(v1773) + "|" + v1719(v1770);
      if (v1720(v1770, v1771)) {
        const v1780 = v1770 === "cast.stop" ? ++v1715 : v1715;
        const v1781 = await v1727(v1770, v1773, v1771);
        if (v1770 === "cast.stop" && v1714 === v1773 && v1780 === v1715) {
          let v1782;
          try {
            v1782 = v1718(v1781);
          } catch {
            v1782 = null;
          }
          const v1783 = v1771[0]?.expectedSessionId || v1771[0]?.ticket;
          if (v1782?.ok === true && v1782.accepted === true && typeof v1782.stoppedSessionId === "string" && v1782.stoppedSessionId && (!v1783 || v1783 === v1782.stoppedSessionId)) {
            v1714 = null;
          }
        }
        return v1781;
      }
      if (!v1721(v1770) && !v1722(v1773)) {
        throw new Error("stale_session");
      }
      const v1775 = v1770 === "cast.start" || v1770 === "cast.requestProjection" ? ++v1715 : v1715;
      if (v1770 === "cast.start" || v1770 === "cast.requestProjection") {
        v1714 = v1773;
      }
      const v1776 = v1711.get(v1774) || 0;
      const v1777 = await v1725(v1770, v1771, v1773);
      if (!v1721(v1770) && !v1722(v1773) || v1776 !== (v1711.get(v1774) || 0) || !v1717() || (v1770 === "cast.start" || v1770 === "cast.requestProjection") && v1775 !== v1715) {
        await v1729(v1770, v1773, v1777, v1775).catch(() => {});
        throw new Error("stale_session");
      }
      let v1778;
      try {
        v1778 = v1718(v1777);
      } catch {
        v1778 = null;
      }
      if (v1778 && (v1778.pending === true || v1778.queued === true || v1778.submitted === true || ["queued", "submitted", "pending"].includes(v1778.status))) {
        throw new Error("native_pending");
      }
      if (v1721(v1770) || v1770 === "cast.getStatus") {
        if (v1778 && typeof v1778 === "object") {
          v1710.set(v1770, {
            value: v1778,
            at: Date.now(),
            key: v1723(v1773)
          });
        }
      }
      return v1777;
    }
    function v1731(v1784, v1785 = "", v1786 = undefined) {
      const v1787 = {};
      for (const v1788 of v1784) {
        Object.defineProperty(v1787, v1788, {
          enumerable: true,
          get: () => v1726(v1785 + v1788) ? (...v1789) => v1730(v1785 + v1788, v1789, v1786) : undefined
        });
      }
      return Object.freeze(v1787);
    }
    const v1732 = v1731(v1708);
    const v1733 = v1731(v1709, "cast.");
    function v1734(v1790) {
      if (v1716()) {
        return null;
      }
      if (!v1717()) {
        return v1707.ZeehoShell || null;
      }
      if (v1790) {
        return v1731(v1708, "", v1790);
      } else {
        return v1732;
      }
    }
    function v1735(v1791) {
      if (v1716()) {
        return null;
      }
      if (!v1717()) {
        return v1707.ZeehoCast || null;
      }
      if (v1726("cast.getStatus")) {
        if (v1791) {
          return v1731(v1709, "cast.", v1791);
        } else {
          return v1733;
        }
      } else {
        return null;
      }
    }
    function v1736(v1792, v1793 = 5000) {
      const v1794 = v1710.get(v1792);
      if (!v1794 || !v1726(v1792)) {
        return null;
      }
      const v1795 = Date.now() - v1794.at > v1793 || !v1721(v1792) && v1794.key !== v1723(v1713());
      if (v1795) {
        return {
          ...v1794.value,
          stale: true,
          connected: false,
          vehicleConnected: false,
          wifiConnected: false,
          casting: false
        };
      } else {
        return {
          ...v1794.value,
          stale: false
        };
      }
    }
    function v1737(v1796) {
      if (v1712.has(v1796)) {
        return v1712.get(v1796);
      }
      const v1797 = v1730(v1796).catch(() => {}).finally(() => {
        if (v1712.get(v1796) === v1797) {
          v1712.delete(v1796);
        }
      });
      v1712.set(v1796, v1797);
      return v1797;
    }
    v1707.NativeShell = Object.freeze({
      has: v1726,
      call: v1730,
      shell: v1734,
      cast: v1735,
      cached: v1736,
      prime: v1737,
      configureContext: v1798 => {
        v1713 = typeof v1798 === "function" ? v1798 : () => null;
      },
      readZeehoCast: () => v1735(),
      capabilities: () => v1717() ? v1707.IOSBR.capabilities().filter(v1799 => v1799.startsWith("compat.")) : [],
      revoke: (v1800, v1801 = [], v1802 = v1713()) => v1727(v1800, v1802, v1801)
    });
  })();
})();
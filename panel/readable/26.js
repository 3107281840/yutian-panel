(() => {
  (v1 => {
    const v2 = window.APP;
    const v3 = window.LAZY_FEATURE;
    let v4;
    const v5 = () => v1(v7 => {
      v4 = v7;
    });
    if (v3) {
      v3.register(v2, "media", v5);
    } else {
      v5();
    }
    const v6 = () => {
      const v8 = (v3 ? v3.peek(v2, "media") : v2.media) || (v2.featuresEnabled() && /^#\/(wallpapers|wallpaper-market)$/.test(window.location?.hash) ? v2.media : null);
      v8?.syncRoute();
    };
    window.addEventListener?.("online", () => {
      if (!v2.featuresEnabled()) {
        return;
      }
      v2.media;
      v4?.();
    });
    window.addEventListener?.("popstate", v6);
    window.addEventListener?.("hashchange", v6);
  })(v9 => {
    const v10 = window.APP;
    const v11 = v10.phone;
    const v12 = window.MODEL;
    const v13 = window.UI;
    const v14 = v12.esc;
    const v15 = window.API;
    const v16 = window.MEDIA;
    const v17 = {
      walls: [],
      wallsMeta: null,
      wallsCount: null,
      wallsTotal: 0,
      wallsError: "",
      wallsErrorCode: "",
      wallsLoading: false,
      wallsRefreshing: false,
      wallsReady: false,
      wallsAt: 0,
      wallsSeq: 0,
      wallsPage: 0,
      wallsMore: false,
      wallConnection: null,
      progressTimer: null,
      progressRecordId: "",
      progressText: "",
      progressPercent: 0,
      progressSeq: 0,
      progressLog: null,
      ota: null,
      otaFiles: [],
      otaError: "",
      otaContentError: "",
      otaLoading: false,
      otaSeq: 0,
      checkSeq: 0,
      checkBusy: false,
      editor: null,
      scope: null,
      gen: 0,
      wallsHandle: null,
      otaHandle: null,
      writeBusy: false
    };
    const v18 = new Set();
    const v19 = {
      walls: "#/wallpapers",
      market: "#/wallpaper-market"
    };
    let v20 = false;
    let v21 = null;
    let v22 = 0;
    const v23 = {
      walls: 0,
      market: 0
    };
    function v24(v210) {
      v22++;
      v21 ||= v10.settings.captureMeterReturn();
      const v211 = window.location;
      const v212 = window.history;
      if (!v211 || !v212 || v211.hash === v19[v210]) {
        return;
      }
      const v213 = Object.values(v19).includes(v211.hash) ? "replaceState" : "pushState";
      v212[v213]({
        ...v212.state,
        panelWallpaper: true
      }, "", v19[v210]);
    }
    function v25() {
      if (v20) {
        return;
      }
      const v214 = v21;
      v21 = null;
      v214?.();
      const v215 = window.location;
      const v216 = window.history;
      if (!v215 || !Object.values(v19).includes(v215.hash)) {
        return;
      }
      if (v216.state?.panelWallpaper) {
        const v217 = ++v22;
        Promise.resolve().then(() => {
          if (v217 === v22) {
            v216.back();
          }
        });
      } else {
        v216.replaceState(v216.state, "", v215.pathname + v215.search);
      }
    }
    function v26() {
      const v218 = window.location?.hash;
      if (!v28()) {
        return;
      }
      if (v218 === v19.walls) {
        if (!v13.currentSheet("walls")) {
          v86();
        }
      } else if (v218 === v19.market) {
        if (!v13.currentSheet("wall-market")) {
          v196();
        }
      } else if (v13.currentSheet("walls") || v13.currentSheet("wall-market")) {
        (window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v10, "wallpaperExperiment") : v10.wallpaperExperiment)?.close();
        for (const v219 of [...v18].reverse()) {
          v13.closeSheet(v219);
        }
      }
    }
    const v27 = () => window.PLATFORM?.preview?.() === true;
    const v28 = () => v10.featuresEnabled();
    function v29(v220) {
      const v221 = (v226, v227) => "<button class=\"btn tonal\" type=\"button\" data-media-preview=\"" + v226 + "\">" + v227 + "</button>";
      const v222 = "<div class=\"card-sub\">UI 测试预览 · 使用已有合成示例，不访问真实账号、官方接口或车机。</div>";
      const v223 = "<div class=\"field\">" + v221("walls", "车机壁纸") + v221("market", "壁纸市场") + "</div>";
      const v224 = {
        walls: v223 + v222 + ("<div class=\"wall-actions\">" + v221("editor", "新建壁纸") + v221("unavailable", "恢复默认") + "</div>") + "<div class=\"wall-grid\"><button class=\"wall-item\" data-media-preview=\"detail\"><span class=\"wall-thumb\"><span class=\"wall-ph\">合成 UI 示意</span></span><span class=\"wall-nm\">壁纸示例</span></button></div>" + ("<div class=\"field\">" + v221("transfer", "车机 Wi-Fi 直传") + v221("experiment", "实验性壁纸", true) + v221("unavailable", "重新读取") + "</div>"),
        market: v223 + v222 + ("<div class=\"wall-market-toolbar\">" + ["热门", "最新", ...Object.values(window.WALLMARKET?.categories || {})].map(v228 => v221("filter", v228)).join("") + "</div>") + ("<div class=\"field\">" + v221("filter", "我的收藏") + v221("detail", "查看壁纸示例") + v221("unavailable", "上传市场") + v221("unavailable", "加载更多") + "</div>"),
        detail: v222 + ("<div class=\"wall-thumb\"><span class=\"wall-ph\">整屏 / 速度卡合成 UI 示意</span></div><div class=\"wall-actions-stack\">" + v221("transfer", "应用到车机") + v221("editor", "编辑壁纸") + v221("unavailable", "收藏") + v221("unavailable", "下载原图") + v221("unavailable", "删除壁纸") + "</div>"),
        editor: v222 + "<div class=\"field\"><label>壁纸名称<input type=\"text\" placeholder=\"壁纸名称\" autocomplete=\"off\"></label></div>" + ("<div class=\"wall-thumb\"><span class=\"wall-ph\">本地制作 UI 示意</span></div><div class=\"field\">" + ["选择整屏图片", "选择速度卡图片", "裁切预览", "恢复取景", "上移", "下移", "左移", "右移", "放大", "缩小"].map(v229 => v221("unavailable", v229)).join("") + "</div>") + ("<div class=\"field\"><label>缩放<input type=\"range\" min=\"1\" max=\"3\" step=\"0.1\" value=\"1\"></label></div><div class=\"field\">" + v221("unavailable", "上传并保存") + v221("unavailable", "导出图片") + "</div>"),
        experiment: v222 + ("<div class=\"field\"><label>壁纸编号<select>" + Array.from({
          length: 10
        }, (v230, v231) => "<option>" + (v231 + 1) + "</option>").join("") + "</select></label></div>") + ("<div class=\"field\">" + v221("editor", "选择整屏图片") + v221("editor", "选择速度卡图片") + v221("unavailable", "准备本地包") + v221("transfer", "本地直传") + "</div>"),
        ota: v222 + ("<div class=\"wall-sub\">AE5I 本地固件升级</div><div class=\"field\">" + v221("unavailable", "打开 AE5I Wi-Fi OTA") + "</div>") + ("<div class=\"wall-sub\">在线固件信息</div>" + v13.kv("当前版本", "示例 · 不代表车辆版本") + v13.kv("更新状态", "UI 示意")) + ("<div class=\"wall-actions-stack\">" + v221("unavailable", "检查更新") + v221("unavailable", "重新读取") + v221("unavailable", "显示下载地址") + "</div>")
      };
      if (v220 === "transfer") {
        return v10.walltransfer.openPreview();
      }
      const v225 = {
        walls: "车机壁纸",
        market: "壁纸市场",
        detail: "壁纸详情",
        editor: "新建壁纸",
        experiment: "实验性壁纸",
        ota: "仪表固件"
      }[v220];
      return v13.sheet(v11(), {
        key: "media-preview-" + v220,
        title: v225,
        full: true,
        sub: "UI 测试预览",
        className: "wall-page",
        body: v224[v220] || v222,
        onMount(v232) {
          v232.querySelectorAll("[data-media-preview]").forEach(v233 => v233.addEventListener("click", () => {
            const v234 = v233.dataset.mediaPreview;
            if (v234 === "filter") {
              v233.setAttribute("aria-pressed", v233.getAttribute("aria-pressed") !== "true");
              return;
            }
            if (v224[v234] || v234 === "transfer") {
              v29(v234);
            } else {
              window.PLATFORM.unavailable("壁纸 / 固件操作");
            }
          }));
        }
      });
    }
    const v30 = () => v10.inShell?.() === true;
    const v31 = v235 => String(v10.vehicleToken?.(v235) || v15.vehicleToken?.(v235) || v15.token || "");
    let v32 = 0;
    function v33(v236) {
      let v237 = v236.owner;
      try {
        if (!v237) {
          v237 = window.ACC?.active?.();
        }
      } catch {}
      let v238 = String(v237?.label || v237 && window.ACC?.labelOf?.(v237) || v236.uid || "");
      if (v237?.token) {
        v238 = v238.split(String(v237.token)).join("[已隐藏凭据]");
      }
      return Object.freeze({
        id: String(v237?.id || ""),
        label: v238
      });
    }
    function v34(v239, v240) {
      let v241 = {};
      try {
        v241 = window.DIAG?.capture?.() || {};
      } catch {}
      return {
        ...v241,
        account: v239?.actor?.label || "未标识账号",
        accountId: v239?.actor?.id || "",
        source: "web",
        runId: v240 + "-" + Date.now().toString(36) + "-" + ++v32
      };
    }
    function v35(v242, v243, v244 = {}) {
      try {
        window.DIAG?.event?.(v242, {
          category: "action",
          phase: "progress",
          kind: "info",
          ...v243,
          ...v244
        });
      } catch {}
    }
    const v36 = () => {
      const v245 = v10.context();
      return Object.freeze({
        ...v245,
        owner: v245.owner ? Object.freeze({
          ...v245.owner
        }) : null,
        actor: v33(v245),
        vin: String(v245.vin || "").trim(),
        mediaGen: v17.gen,
        accountGen: v15.accountGen,
        requestToken: v31(v245.vin)
      });
    };
    const v37 = v246 => v28() && !!v246 && v246.mediaGen === v17.gen && v10.current(v246) && v246.accountGen === v15.accountGen && v246.requestToken === v31(v246.vin);
    const v38 = v247 => !!v247 && v13.sheetAlive(v247);
    const v39 = (v248, v249) => v249() && !v248?.stale;
    const v40 = (v250, v251 = "未知错误") => String(v250?.message || v250?.code || v251);
    const v41 = (v252, v253, v254, v255, v256 = null) => {
      let v257 = v15;
      if (v254?.privateResult || v252 === "vehicle_home" && v53()) {
        v257 = Object.create(v15);
        v257.finish = (v258, v259, v260, v261, v262) => v15.finish.call(v257, v258, v259, v260, v261, {
          ...v262,
          own: true
        });
        v257.fail = (v263, v264, v265) => v15.fail.call(v257, v263, v264, {
          ...v265,
          own: true
        });
        v257.rec = (v266, v267) => {
          v35("壁纸直连请求结束", v256, {
            phase: "end",
            extra: {
              stage: v252,
              accepted: !!v267.ok,
              stale: !!v267.stale,
              wifiAddressPresent: typeof v267.data?.wifiAddress === "string" && !!v267.data.wifiAddress.trim(),
              carIpPresent: v267.data?.mmiWifiIp != null && v267.data.mmiWifiIp !== ""
            }
          });
          return v267;
        };
      }
      return v257.call(v252, {
        vin: v253.vin,
        ...v254?.ctx
      }, {
        ...v254,
        scope: v253.actor,
        logScope: v256,
        runId: v256?.runId,
        isLatest: v255
      }).catch(v268 => ({
        ok: false,
        message: v257 === v15 ? v268.message : "壁纸请求未完成，请稍后重试"
      }));
    };
    function v42(v269) {
      if (!v28()) {
        return null;
      }
      const v270 = v269.page && v13.currentSheet(v269.key === "walls" ? "wall-market" : "walls");
      let v271;
      const v272 = v269.onDismiss;
      v271 = v13.sheet(v11(), {
        closeMode: "current",
        className: "wall-page",
        ...v269,
        onDismiss: () => {
          v18.delete(v271);
          v272?.();
        }
      });
      v18.add(v271);
      if (v270) {
        v20 = true;
        try {
          v13.closeSheet(v270);
        } finally {
          v20 = false;
        }
      }
      return v271;
    }
    function v43(v273) {
      if (v273) {
        try {
          URL.revokeObjectURL(v273);
        } catch {}
      }
    }
    function v44(v274) {
      if (!v274 || v274.closed) {
        return;
      }
      v274.closed = true;
      v274.serial++;
      v274.decodeSeq++;
      v274.detach?.();
      v274.detach = null;
      v274.experimental?.onDismiss?.();
      for (const v276 of [...v274.decodeJobs]) {
        v276();
      }
      const v275 = new Set([...Object.values(v274.layers), ...Object.values(v274.previewDraft?.layers || {})].map(v277 => v277.url));
      for (const v278 of v275) {
        v43(v278);
      }
      if (v17.editor === v274) {
        v17.editor = null;
      }
    }
    function v45() {
      v17.gen++;
      v17.wallsSeq++;
      v17.otaSeq++;
      v17.checkSeq++;
      v76.transition = null;
      v76.snapshots = {};
      v23.walls = v23.market = 0;
      v171(v140);
      v141 = null;
      v140 = null;
      try {
        const v280 = window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(window, "WALLMARKET") : window.WALLMARKET;
        v280?.forgetSession(v280.resolveBase(window.Store), String(v15.token || ""));
      } catch {}
      v161?.controller.abort();
      v112(false);
      (window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v10, "wallpaperExperiment") : v10.wallpaperExperiment)?.close();
      v44(v17.editor);
      const v279 = !!v13.currentSheet("walls") || !!v13.currentSheet("wall-market");
      v20 = true;
      try {
        for (const v281 of [...v18].reverse()) {
          v13.closeSheet(v281);
        }
      } finally {
        v20 = false;
      }
      if (v279) {
        v25();
      }
      v18.clear();
      Object.assign(v17, {
        scope: null,
        walls: [],
        wallsMeta: null,
        wallsCount: null,
        wallsTotal: 0,
        wallsError: "",
        wallsErrorCode: "",
        wallsLoading: false,
        wallsRefreshing: false,
        wallsReady: false,
        wallsAt: 0,
        wallsPage: 0,
        wallsMore: false,
        wallsHandle: null,
        wallConnection: null,
        ota: null,
        otaFiles: [],
        otaError: "",
        otaContentError: "",
        otaLoading: false,
        otaHandle: null,
        checkBusy: false
      });
      v60.length = 0;
    }
    function v46() {
      if (!v37(v17.scope)) {
        v45();
        v17.scope = v36();
      }
      return v17.scope;
    }
    const v47 = v282 => v17.editor === v282 && !v282.closed && v37(v282.scope) && v38(v282.handle) && (!v282.experimental?.isCurrent || v282.experimental.isCurrent());
    function v48(v283, v284, v285) {
      if (!v37(v284)) {
        return false;
      }
      const v286 = v283?.vinNo === v284.vin && ["online", "1", "true"].includes(String(v283.onlineStatus).toLowerCase());
      if (v285 >= (v17.wallConnection?.at || 0)) {
        v17.wallConnection = {
          at: v285,
          online: v286
        };
        v56();
      }
      return v286;
    }
    function v49() {
      const v287 = v10.state.data?.home;
      if (v287?.vin === v17.scope?.vin && v287.sampleAt && !v10.state.dataCached) {
        v48(v287.raw, v17.scope, v287.requestAt || v287.sampleAt);
      }
    }
    function v50() {
      const v288 = v17.scope;
      const v289 = v10.state.data?.home;
      const v290 = v289 && (v289.vin || v289.raw?.vinNo) === v288?.vin ? v289 : null;
      const v291 = v17.wallsMeta;
      const v292 = v290?.raw || {};
      const v293 = v291 && v288 && v291.vin === v288.vin ? {
        vehicleType: v291.vehicleType,
        supportCustomWallpaper: v291.supported,
        wallpaperResolutionWidth: v291.width,
        wallpaperResolutionHeight: v291.height
      } : {};
      const v294 = v290?.sampleAt > v291?.at;
      const v295 = v294 ? v292 : v293;
      const v296 = v294 ? v293 : v292;
      const v297 = {
        ...v296,
        ...v295
      };
      v297.vehicleType = [v295.vehicleType, v296.vehicleType, v290?.type].find(v298 => typeof v298 === "string" && v298.trim()) || v288?.vin && v10.state.vehicles?.find(v299 => v299.vin === v288.vin)?.type;
      for (const v300 of ["supportCustomWallpaper", "wallpaperResolutionWidth", "wallpaperResolutionHeight"]) {
        v297[v300] = v295[v300] ?? v296[v300];
      }
      return v12.instrumentCapabilities({
        homeRaw: v297,
        home: v290,
        caps: v290 ? v10.state.data?.caps : null
      });
    }
    function v51(v301 = null, v302 = true) {
      if (!v37(v17.scope)) {
        return "车辆或账号已变更，请重新进入";
      }
      if (!v17.scope.vin) {
        return "还没读到车辆 VIN，稍后再试";
      }
      const v303 = v50();
      if (v303.supported === false && v303.reason) {
        return v303.reason;
      }
      const v304 = !!v303.width && !!v303.height;
      if (v302 && v301 && v304 && (v301.canvas?.w !== v303.width || v301.canvas?.h !== v303.height)) {
        return "壁纸方案尺寸与当前车机不同";
      }
      return "";
    }
    const v52 = () => {
      const v305 = v10.state.data?.home;
      return (v305?.vin || v305?.raw?.vinNo) === v17.scope?.vin && v12.instrumentCapabilities({
        home: v305
      }).ota;
    };
    const v53 = () => v10.wallpaperTransferSupported?.() === true;
    const v54 = () => window.PLATFORM?.unavailableBadge?.("compat.beginWallpaperTransfer") || "";
    function v55(v306) {
      const v307 = v51(null, false);
      if (v307) {
        return v307;
      }
      const v308 = v17.walls.find(v309 => v309.id === v306?.id) || v306;
      if (v308?.rejected) {
        if (v308.rejectReason) {
          return "审核未通过：" + v308.rejectReason;
        } else {
          return "审核未通过，不能应用到车机";
        }
      }
      if (v308?.usable === false) {
        return "图片信息不完整，暂时不能应用";
      }
      if (!v10.inShell()) {
        if (v17.wallConnection?.online === true) {
          return "";
        } else {
          return "请先启动车辆并联网";
        }
      }
      if (v53()) {
        return "";
      }
      if (v10.isIOS?.()) {
        return window.PLATFORM.message("应用车机壁纸", "compat.beginWallpaperTransfer");
      } else {
        return "请更新 App，使用页面内的车机 Wi-Fi 应用流程";
      }
    }
    function v56(v310 = v11()) {
      for (const v311 of v310?.querySelectorAll?.("[data-act=\"wallapply\"]") || []) {
        const v312 = v17.walls.find(v314 => v314.id === v311.dataset.id);
        const v313 = v55(v312);
        v311.disabled = !v312 || !!v313 || v17.writeBusy;
        v311.innerHTML = "" + (v17.writeBusy ? "准备应用…" : v312?.inUse ? "重新应用到车机" : "应用到车机") + v54();
      }
      for (const v315 of v310?.querySelectorAll?.("[data-act=\"wallrestore\"]") || []) {
        v315.disabled = v17.writeBusy || v50().supported !== true;
      }
    }
    async function v57(v316, v317, v318) {
      const v319 = Date.now();
      const v320 = await v41("vehicle_home", v316, {}, v317, v318);
      if (!v39(v320, v317)) {
        return false;
      }
      const v321 = v48(v320.ok ? v320.data : null, v316, v319);
      if (!v320.ok || v320.data?.vinNo !== v316.vin) {
        throw new Error("无法确认车辆在线，请刷新后重试");
      }
      v17.wallsMeta = {
        ...v16.wallpapersFromHome({
          data: v320.data
        }),
        at: v319
      };
      const v322 = v51(null, false);
      if (v322) {
        throw new Error(v322);
      }
      if (!v321 || !v17.wallConnection?.online) {
        throw new Error("车辆离线，请启动车辆并联网后重试");
      }
      return true;
    }
    const v58 = new Set();
    const v59 = new Set();
    const v60 = [];
    async function v61(v323, v324, v325) {
      try {
        const v326 = await v41("wallpaper_detail", v323, {
          ctx: {
            wallpaperId: String(v324)
          },
          privateResult: true
        }, () => true, v325);
        if (v326?.ok) {
          return v16.normalizeWallpaperDetail({
            data: v326.data
          })?.rejectReason || "";
        } else {
          return "";
        }
      } catch {
        return "";
      }
    }
    async function v62(v327, v328, v329) {
      const v330 = String(v328 || "");
      if (!v330) {
        return {
          state: "unknown",
          reason: ""
        };
      }
      const v331 = await v41("wallpaper_page", v327, {
        ctx: {
          pageNum: "1"
        }
      }, () => true, v329);
      if (!v331?.ok) {
        return {
          state: "unknown",
          reason: ""
        };
      }
      const v332 = (v16.normalizeWallpaperPage({
        data: v331.data
      }).list || []).find(v333 => String(v333.id) === v330);
      if (!v332) {
        return {
          state: "unknown",
          reason: ""
        };
      }
      if (v332.audit === "approved") {
        return {
          state: "approved",
          reason: ""
        };
      }
      if (v332.audit === "rejected") {
        return {
          state: "rejected",
          reason: v332.rejectReason || (await v61(v327, v330, v329))
        };
      }
      return {
        state: "unknown",
        reason: ""
      };
    }
    async function v63(v334, v335, v336) {
      const v337 = String(v335.id || "");
      if (!v337 || v58.has(v337) || v59.has(v337)) {
        return false;
      }
      v58.add(v337);
      try {
        try {
          await v164(v337);
        } catch {}
        const v338 = v335.rejectReason || (await v61(v334, v337, v336));
        const v339 = await v41("wallpaper_delete", v334, {
          ctx: {
            wallpaperId: v337
          },
          method: "DELETE"
        }, () => true, v336);
        if (v339?.ok) {
          v59.add(v337);
        }
        v35("审核未通过壁纸清理", v336, {
          phase: v339?.ok ? "accepted" : "failed",
          kind: v339?.ok ? "ok" : "err",
          detail: "审核未通过，已从账号删除",
          extra: {
            wallpaperId: v337,
            deleted: !!v339?.ok
          }
        });
        v60.push({
          name: v335.name || "未命名壁纸",
          reason: v338,
          deleted: !!v339?.ok
        });
        return !!v339?.ok;
      } catch {
        return false;
      } finally {
        v58.delete(v337);
      }
    }
    async function v64(v340, v341, v342) {
      const v343 = (v341 || []).filter(v344 => v344?.id && v344.rejected && !v59.has(String(v344.id)));
      if (!v343.length) {
        return new Set();
      }
      await Promise.all(v343.map(v345 => v63(v340, v345, v342)));
      return new Set(v343.map(v346 => String(v346.id)));
    }
    function v65() {
      if (!v60.length) {
        return;
      }
      const v347 = v60.splice(0, v60.length);
      const v348 = v347.filter(v352 => !v352.deleted);
      const v349 = v347.filter(v353 => v353.deleted);
      const v350 = v354 => "「" + v354.name + "」" + (v354.reason ? "：" + v354.reason : "");
      const v351 = [];
      if (v349.length) {
        v351.push("审核未通过，已删除 " + v349.map(v350).join("；"));
      }
      if (v348.length) {
        v351.push("审核未通过但删除失败 " + v348.map(v350).join("；") + "，请下拉刷新重试");
      }
      v13.toast(v11(), v351.join("。"), 8000);
    }
    async function v66(v355, {
      more = false,
      logScope = null,
      cached = false,
      refresh = false
    } = {}) {
      if (!v28()) {
        return false;
      }
      v355 ||= v46();
      if (!v355.vin || !v37(v355) || more && v17.wallsLoading) {
        return false;
      }
      if (cached && (v17.wallsLoading || v17.wallsReady && Date.now() - v17.wallsAt < 60000)) {
        return true;
      }
      const v356 = ++v17.wallsSeq;
      const v357 = more ? v17.wallsPage + 1 : 1;
      const v358 = Date.now();
      const v359 = () => v37(v355) && v356 === v17.wallsSeq;
      v17.wallsLoading = true;
      v17.wallsRefreshing = refresh;
      v17.wallsError = "";
      v17.wallsErrorCode = "";
      v75();
      const v360 = logScope || v34(v355, "wallpaper-read");
      v35("壁纸列表读取开始", v360, {
        phase: "start",
        extra: {
          page: v357,
          more: more
        }
      });
      const [v361, v362, v363] = await Promise.all([v41("wallpaper_page", v355, {
        ctx: {
          pageNum: String(v357)
        }
      }, v359, v360), more ? null : v41("wallpaper_count", v355, {}, v359, v360), more ? null : v41("vehicle_home", v355, {}, v359, v360)]);
      const v364 = v39(v361, v359) && !v362?.stale && !v363?.stale;
      v35("壁纸列表读取结束", v360, {
        phase: "end",
        kind: v361.ok ? "ok" : "err",
        extra: {
          page: v357,
          resultOk: !!v361.ok,
          adopted: !!v364
        }
      });
      if (!v364) {
        if (v356 === v17.wallsSeq) {
          v17.wallsLoading = false;
          v17.wallsRefreshing = false;
          v75();
        }
        return false;
      }
      v17.wallsLoading = false;
      v17.wallsRefreshing = false;
      if (!more) {
        if (v358 >= (v17.wallsMeta?.at || 0)) {
          v17.wallsMeta = v363?.ok && v363.data?.vinNo === v355.vin ? {
            ...v16.wallpapersFromHome({
              data: v363.data
            }),
            at: v358
          } : null;
        }
        v48(v363?.ok ? v363.data : null, v355, v358);
        const v365 = v362?.ok && (typeof v362.data === "number" || typeof v362.data === "string") && String(v362.data).trim() !== "" ? Number(v362.data) : NaN;
        v17.wallsCount = Number.isFinite(v365) && v365 >= 0 ? v365 : null;
      }
      if (!v361.ok) {
        if (!more && !v17.wallsReady) {
          v17.walls = [];
          v17.wallsTotal = 0;
          v17.wallsMore = false;
        }
        v17.wallsErrorCode = String(v361.code ?? "");
        v17.wallsError = v40(v361, "壁纸列表读取失败");
      } else {
        const v366 = v16.normalizeWallpaperPage({
          data: v361.data
        });
        const v367 = (v366.list || []).map(v371 => ({
          ...v371,
          scope: v355
        }));
        const v368 = await v64(v355, v367, v360);
        const v369 = v367.filter(v372 => !v368.has(String(v372.id)));
        const v370 = new Set(more ? v17.walls.map(v373 => v373.id) : []);
        v17.walls = [...(more ? v17.walls : []), ...v369.filter(v374 => !v370.has(v374.id) && v370.add(v374.id))];
        v17.wallsTotal = Math.max(0, v366.total - v368.size);
        v17.wallsPage = v357;
        v17.wallsMore = v366.hasMore && (v369.length > 0 || v368.size > 0);
        v17.wallsReady = true;
        if (!more) {
          v17.wallsAt = Date.now();
        }
        if (v13.currentSheet("walls")) {
          v71(v369.map(v375 => v72(v375.thumbUrl || v375.imageUrl)));
        }
        v65();
      }
      v75();
      return !!v361.ok;
    }
    let v67 = null;
    const v68 = new Set();
    function v69(v376, v377 = () => true) {
      for (const v378 of v68) {
        if (v378.isConnected === false) {
          v67?.unobserve(v378);
          v68.delete(v378);
        }
      }
      if (!v67 && typeof IntersectionObserver === "function") {
        v67 = new IntersectionObserver((v379, v380) => {
          for (const v381 of v379) {
            if (v381.isIntersecting) {
              v380.unobserve(v381.target);
              v68.delete(v381.target);
              v381.target.dispatchEvent(new Event("market-load"));
            }
          }
        }, {
          rootMargin: "400px"
        });
      }
      for (const v382 of new Set([...(v376?.querySelectorAll?.("img[data-wall-image]") || []), ...(v376?.querySelectorAll?.("img[data-market-image]") || [])])) {
        const v383 = v382.parentElement;
        const v384 = v383?.querySelector("[data-image-error]");
        const v385 = v387 => {
          if (!v377()) {
            return;
          }
          v383?.classList.remove("sk");
          v383?.removeAttribute("aria-busy");
          v382.hidden = !v387;
          if (v387) {
            v382.setAttribute("data-image-ready", "");
          } else {
            v382.removeAttribute("data-image-ready");
          }
          if (v384) {
            v384.hidden = v387;
          }
        };
        v382.addEventListener("load", () => v385(true));
        v382.addEventListener("error", () => {
          const v388 = v382.getAttribute("data-wall-fallback");
          if (v388 && v377()) {
            v382.removeAttribute("data-wall-fallback");
            v382.src = v388;
          } else {
            v385(false);
          }
        });
        if (v382.complete && v382.getAttribute("src")) {
          v385(v382.naturalWidth > 0);
        } else {
          v382.removeAttribute("data-image-ready");
          v382.hidden = false;
          v383?.classList.add("sk");
          v383?.setAttribute("aria-busy", "true");
          if (v384) {
            v384.hidden = true;
          }
        }
        const v386 = v382.getAttribute("data-market-image");
        if (v386 && !v382.getAttribute("src")) {
          const v389 = v382.dataset.marketPlan ? JSON.parse(v382.dataset.marketPlan) : null;
          const v390 = () => {
            if (v377()) {
              v177(v386, v389).then(v391 => {
                if (v377() && v382.isConnected !== false) {
                  v382.src = v391;
                }
              }).catch(() => {
                if (v377() && v382.isConnected !== false) {
                  if (v389 || v172(v386)) {
                    v385(false);
                  } else {
                    v382.src = v386;
                  }
                }
              });
            }
          };
          if (v67 && (v389?.key === "thumbnail" || /\/thumb\.webp(?:[?]|$)/.test(v386))) {
            v382.addEventListener("market-load", v390, {
              once: true
            });
            v68.add(v382);
            v67.observe(v382);
          } else {
            v390();
          }
        }
      }
    }
    function v70() {
      return "<div class=\"wall-grid wall-skeleton\" role=\"status\" aria-label=\"正在加载壁纸\" aria-busy=\"true\">" + Array.from({
        length: 6
      }, () => "<div class=\"wall-item\" aria-hidden=\"true\"><span class=\"wall-thumb sk\"></span><span class=\"wall-nm sk\"></span></div>").join("") + "</div>";
    }
    function v71(v392) {
      for (const v393 of new Set(v392.filter(Boolean).slice(0, 6))) {
        const v394 = new Image();
        v394.referrerPolicy = "no-referrer";
        v394.decoding = "async";
        v394.src = v393;
      }
    }
    function v72(v395) {
      try {
        const v396 = new URL(v395);
        if (v396.protocol === "https:" && v396.hostname === "zeeho-user.oss-cn-hangzhou.aliyuncs.com" && v396.pathname.startsWith("/wallpaper/") && !v396.search) {
          v396.searchParams.set("x-oss-process", "image/resize,w_320");
          return v396.href;
        }
      } catch {}
      return v395;
    }
    function v73() {
      const v397 = v17.wallsMeta || {};
      const v398 = [...v17.walls].sort((v403, v404) => Number(!!v404.inUse) - Number(!!v403.inUse));
      const v399 = v51();
      const v400 = v17.wallsErrorCode === "40005" && v80();
      const v401 = v398.map((v405, v406) => {
        const v407 = v405.thumbUrl || v405.imageUrl;
        const v408 = v72(v407);
        return "<button class=\"wall-item" + (v405.inUse ? " on" : "") + "\" type=\"button\" data-act=\"wallopen\" data-id=\"" + v14(v405.id) + "\">\n        <span class=\"wall-thumb" + (v408 ? " sk" : "") + "\">" + (v408 ? "<img data-wall-image src=\"" + v14(v408) + "\"" + (v408 !== v407 ? " data-wall-fallback=\"" + v14(v407) + "\"" : "") + " alt=\"" + v14(v405.name) + "\" loading=\"" + (v406 < 6 ? "eager" : "lazy") + "\" decoding=\"async\" referrerpolicy=\"no-referrer\"><span class=\"wall-ph\" data-image-error hidden>预览加载失败</span>" : "<span class=\"wall-ph\">暂无预览</span>") + "</span>\n        <span class=\"wall-nm\">" + v14(v405.name || "未命名壁纸") + "</span>" + (v405.inUse ? "<span class=\"wall-tag\">使用中</span>" : "") + "</button>";
      }).join("");
      const v402 = (v397.builtin || []).map(v409 => "<div class=\"wall-item ro\"><span class=\"wall-thumb" + (v409.url ? " sk" : "") + "\">" + (v409.url ? "<img data-wall-image src=\"" + v14(v409.url) + "\" alt=\"" + v14(v409.name) + "\" loading=\"lazy\" referrerpolicy=\"no-referrer\"><span class=\"wall-ph\" data-image-error hidden>预览加载失败</span>" : "<span class=\"wall-ph\">暂无预览</span>") + "</span><span class=\"wall-nm\">" + v14(v409.name) + "</span></div>").join("");
      return v77(v17.wallsLoading && v17.wallsRefreshing) + "\n      <div class=\"wall-actions wall-list-actions\"><button class=\"btn primary\" type=\"button\" data-act=\"wallnew\"" + (v399 ? " disabled" : "") + ">" + v13.icon("camera", 20) + "<span>新建壁纸</span></button>\n        <button class=\"btn primary\" type=\"button\" data-act=\"wallrestore\"" + (v17.writeBusy ? " disabled" : "") + ">" + v13.icon("refresh", 20) + "<span>恢复默认</span></button>\n      </div>\n      " + (v17.wallsError ? "<div class=\"wall-empty\">" + (v400 ? "官方壁纸列表拒绝了当前共享账号的请求（40005）" : v14(v17.wallsError)) + (v400 && !v399 && v10.wallpaperLocalTransferSupported?.() ? "<button class=\"btn tonal block mt12\" type=\"button\" data-act=\"wallexperiment\">打开实验性壁纸，直连车机</button>" : "") + "</div>" : !v398.length && v17.wallsReady ? "<div class=\"wall-empty\">还没有自定义壁纸，点「新建壁纸」选择图片</div>" : "") + "\n      " + (!v17.wallsReady && !v17.wallsError ? v70() : v398.length ? "<div class=\"wall-grid\">" + v401 + "</div>" : "") + "\n      " + (v17.wallsMore ? "<button class=\"btn block mt12\" type=\"button\" data-act=\"wallmore\"" + (v17.wallsLoading ? " disabled" : "") + ">加载更多</button>" : "") + "\n      " + (v398.length && v402 ? "<details class=\"wall-advanced mt12\"><summary>内置壁纸</summary><div class=\"wall-grid\">" + v402 + "</div></details>" : "") + "\n      " + v74();
    }
    function v74() {
      if (!v17.progressRecordId) {
        return "";
      }
      return "<div class=\"wall-progress\"><div class=\"wall-progress-text\">下发进度：" + v14(v17.progressText || "结果未知") + "</div><div class=\"wall-progress-bar\"><i style=\"width:" + v17.progressPercent + "%\"></i></div></div>";
    }
    function v75(v410 = v17.wallsHandle) {
      if (!v37(v17.scope) || !v38(v410)) {
        return;
      }
      v13.updateSheet(v410, {
        body: v73(),
        onMount: v85
      });
    }
    const v76 = {
      id: "wall",
      label: "壁纸页面",
      items: [["walls", "车机壁纸"], ["market", "壁纸市场"]],
      scroll: v23,
      transition: null,
      preview(v411) {
        let v412 = null;
        if (v411 === "market") {
          try {
            v412 = v185();
          } catch {}
        }
        return {
          html: v411 === "walls" ? v73() : v187({
            items: v412?.data.items || [],
            next: v412?.data.next,
            ready: !!v412,
            busy: false,
            refreshing: false,
            filter: v179(),
            error: ""
          }),
          scrollTop: v412?.scrollTop ?? v23[v411]
        };
      },
      bindPreview: v413 => v69(v413, () => v413.isConnected !== false)
    };
    const v77 = v414 => "<div class=\"wall-refresh" + (v414 ? " loading" : "") + "\" data-wall-refresh role=\"status\" aria-live=\"polite\"><span class=\"wall-refresh-content\"><span class=\"loading-ring\" aria-hidden=\"true\"></span><span data-wall-refresh-text>" + (v414 ? "正在刷新…" : "") + "</span></span></div>";
    const v78 = () => "<button type=\"button\" class=\"iconbtn\" data-wall-experiment aria-label=\"实验性壁纸操作\" title=\"实验性壁纸操作\">" + v13.icon("flask", 20) + "</button>";
    function v79(v415) {
      v415.querySelector("[data-wall-experiment]")?.addEventListener("click", () => v81());
    }
    function v80() {
      const v416 = v10.state.data?.home?.raw;
      return v10.isSharedCar?.() === true || v416?.vinNo === v17.scope?.vin && ["1", "true"].includes(String(v416?.isShared));
    }
    function v81() {
      if (window.PLATFORM.preview()) {
        return v29("experiment");
      }
      if (!v28()) {
        return null;
      }
      const v417 = v46();
      if (!v417.vin) {
        v13.toast(v11(), "还没读到车辆 VIN，稍后再试", 3000);
        return null;
      }
      const v418 = v34(v417, "wallpaper-experiment");
      const v419 = (v421, v422, v423) => v35("实验性壁纸", v418, {
        source: "wallpaper-experiment",
        phase: v422,
        kind: v422 === "failed" ? "err" : "info",
        extra: {
          stage: v421,
          ...v423
        }
      });
      const v420 = v51();
      if (v420) {
        v419("open", "failed", {
          shared: v80(),
          supported: v50().supported
        });
        return v13.toast(v11(), v420, 3600);
      }
      return v10.wallpaperExperiment?.open(v417, v419, v80());
    }
    async function v82(v424, v425, v426) {
      const v427 = Date.now();
      const v428 = await v41("vehicle_home", v424, {
        privateResult: true
      }, v425);
      const v429 = v428.data?.vinNo === v424.vin;
      const v430 = v39(v428, v425) && v428.ok && v429;
      v426?.("vehicle-home", v430 ? "end" : "failed", {
        matched: v429,
        stale: !v39(v428, v425),
        code: /^\d{1,8}$/.test(v428.code) ? String(v428.code) : ""
      });
      if (!v430) {
        throw new Error("无法读取当前车辆的壁纸信息，请刷新车况后重试");
      }
      if (v427 >= (v17.wallsMeta?.at || 0)) {
        v17.wallsMeta = {
          ...v16.wallpapersFromHome({
            data: v428.data
          }),
          at: v427
        };
      }
      const v431 = v51();
      if (v431) {
        throw new Error(v431);
      }
      return v428.data;
    }
    async function v83(v432, v433, v434) {
      if (!v37(v432) || !v433()) {
        throw new Error("车辆或账号已变更");
      }
      const v435 = v50();
      if (!v435.width || !v435.height) {
        await v82(v432, v433, v434);
      }
    }
    async function v84(v436, v437, v438) {
      if (!v37(v436) || !v437()) {
        throw new Error("车辆或账号已变更");
      }
      const v439 = v51();
      if (v439) {
        throw new Error(v439);
      }
      let v440 = v10.state.data?.home?.raw;
      const v441 = v440?.vinNo !== v436.vin || !v440?.wifiAddress;
      if (v441) {
        v440 = await v82(v436, v437, v438);
      }
      const v442 = typeof v440.wifiAddress === "string" ? v440.wifiAddress : "";
      const v443 = window.CAST?.parseWallpaperPairing?.(v442);
      const v444 = v440.mmiWifiIp ?? "";
      const v445 = v444 === "" || v444 === "192.168.0.1";
      v438?.("pairing", v443?.ok && v445 ? "end" : "failed", {
        refreshed: v441,
        parsed: v443?.ok === true,
        fields: v443?.fields,
        errors: v443?.errors?.map(v446 => v446.code),
        ipPresent: v444 !== "",
        ipSupported: v445
      });
      if (!v443?.ok) {
        throw new Error("车机 Wi-Fi 连接信息不完整，请刷新车况");
      }
      if (!v445) {
        throw new Error("当前车机地址尚未适配实验传输");
      }
      return {
        wifiAddress: v442,
        carIp: v444
      };
    }
    function v85(v447) {
      v79(v447);
      const v448 = v447.querySelector(".wall-list-actions");
      if (v448) {
        v447.appendChild(v448);
      }
      v13.bindPageTabs(v447, "walls", v76, {
        switchSection: v196,
        refresh: () => v66(null, {
          refresh: true
        }),
        busy: v17.wallsLoading
      });
      v69(v447);
      v56(v447);
      for (const v449 of v447?.querySelectorAll?.("[data-act]") || []) {
        const v450 = {
          wallopen: () => v104(v449.dataset.id),
          wallnew: () => v115(),
          wallmore: () => v66(v46(), {
            more: true
          }),
          wallrestore: v110,
          wallexperiment: v81
        };
        if (v450[v449.dataset.act]) {
          v449.addEventListener("click", v450[v449.dataset.act]);
        }
      }
    }
    function v86() {
      if (window.PLATFORM.preview()) {
        return v29("walls");
      }
      if (!v28()) {
        return null;
      }
      const v451 = v46();
      if (!v451.vin) {
        v13.toast(v11(), "还没读到车辆 VIN，稍后再试", 3000);
        return null;
      }
      const v452 = v10.state.data?.home;
      if ((v452?.vin || v452?.raw?.vinNo) === v451.vin && v50().supported === false) {
        v13.toast(v11(), "当前车辆不支持自定义壁纸", 3000);
        return null;
      }
      v24("walls");
      v170();
      if (v38(v17.wallsHandle)) {
        v75();
        return v451;
      }
      v17.wallsHandle = v42({
        key: "walls",
        full: true,
        page: true,
        title: "车机壁纸",
        headActions: v78(),
        body: v73(),
        onMount: v85,
        onDismiss: () => {
          v17.wallsHandle = null;
          v112(false);
          v25();
        }
      });
      v66(v451, {
        cached: true
      });
      v186().catch(() => {});
      return v451;
    }
    const v87 = (v453, v454) => v16.wallpaperCompositeGeometry({
      mainW: v453?.w,
      mainH: v453?.h,
      speedW: v454?.w,
      speedH: v454?.h,
      model: v50().model
    });
    function v88(v455) {
      return "--wall-composite-width:min(" + v455.ratio * 220 + "px, " + v455.ratio * 28 + "vh);aspect-ratio:" + v455.mainW + "/" + v455.mainH;
    }
    const v89 = 10;
    const v90 = "<rect class=\"wall-speed-card-shape\" width=\"307\" height=\"460\" rx=\"24\" fill=\"#11112d\" fill-opacity=\".48\"/>";
    const v91 = "<path d=\"m35 50 9-20m35 20-9-20m-13-2v9m0 9v9\" stroke=\"#fff\" stroke-width=\"4\" fill=\"none\"/>\n          <text x=\"93\" y=\"49\" font-size=\"23\" font-weight=\"700\">STREET</text>\n          <text x=\"153.5\" y=\"266\" text-anchor=\"middle\" font-size=\"190\" font-weight=\"700\">0</text>\n          <text x=\"153.5\" y=\"354\" text-anchor=\"middle\" font-size=\"32\">km/h</text>";
    const v92 = v456 => {
      const v457 = v456.leftPct / 100 * 1024;
      const v458 = v456.topPct / 100 * 600;
      const v459 = v456.widthPct / 100 * 1024;
      const v460 = v456.heightPct / 100 * 600;
      return {
        x: v457,
        y: v458,
        w: v459,
        h: v460,
        cx: v457 + v459 / 2,
        cy: v458 + v460 / 2
      };
    };
    const v93 = v461 => Number(v461.toFixed(4));
    function v94(v462, v463 = 0) {
      const {
        cx: v464,
        cy: v465,
        w: v466,
        h: v467
      } = v92(v462);
      return "translate(" + v93(v464) + " " + v93(v465) + ")" + (v463 ? " rotate(" + v463 + ")" : "") + " scale(" + v93(v466 / 307) + " " + v93(v467 / 460) + ") translate(-153.5 -230)";
    }
    const v95 = (v468, v469 = 0, v470 = "") => "<g class=\"wall-speed-card-" + (v469 ? "back" : "front") + "\" transform=\"" + v94(v468, v469) + "\">" + v90 + v470 + "</g>";
    let v96 = 0;
    function v97(v471) {
      const v472 = "wall-speed-mask-" + ++v96;
      const v473 = "<defs><mask id=\"" + v472 + "\" maskUnits=\"userSpaceOnUse\" maskContentUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"1024\" height=\"600\" style=\"mask-type:luminance\">" + ("<rect width=\"1024\" height=\"600\" fill=\"#fff\"/><g data-speed-mask-front transform=\"" + v94(v471) + "\">") + "<rect width=\"307\" height=\"460\" rx=\"24\" fill=\"#000\"/></g></mask></defs>";
      return {
        id: v472,
        defs: v473
      };
    }
    const v98 = (v474, v475 = false) => {
      const {
        id: v476,
        defs: v477
      } = v97(v474);
      return v477 + "<g mask=\"url(#" + v476 + ")\">" + v95(v474, v89) + "</g>" + v95(v474, 0, v475 ? v91.replace("STREET", "SPORT") : v91);
    };
    function v99(v478 = v16.wallpaperSpeedCardBox({
      w: 1024,
      h: 600,
      model: v50().model
    })) {
      const v479 = /^AE6(?:(?:20)?26年?款|MY(?:20)?26)?$/.test(v50().model);
      const v480 = "<g data-ae6-bluetooth transform=\"translate(112 225)\"><path d=\"M0 0 44 38 18 60V-24L44-3 0 36m55-32q12 16 0 32\" fill=\"none\" stroke=\"#37efb1\" stroke-width=\"8\" stroke-linecap=\"round\"/><text x=\"-42\" y=\"140\" font-size=\"18\">未连接蓝牙手机</text><text x=\"-38\" y=\"172\" font-size=\"18\">按「SET」连接</text></g>";
      const v481 = [["单次里程", "999.9km"], ["单次电耗", "99.9Wh"], ["平均电耗", "99.9Wh/km"], ["总里程", "999999km"]];
      return "<svg class=\"wall-meter-preview\" viewBox=\"0 0 1024 600\" preserveAspectRatio=\"none\" aria-hidden=\"true\" focusable=\"false\" fill=\"#fff\" font-family=\"Arial, sans-serif\">\n      " + (v479 ? v480 : v481.map(([v482, v483], v484) => "<g transform=\"translate(74 " + (165 + v484 * 80) + ")\"><text fill=\"#aaa\" font-size=\"22\">" + v482 + "</text><text y=\"32\" font-size=\"26\" font-weight=\"700\">" + v483 + "</text></g>").join("")) + "\n      <g fill=\"currentColor\">\n        <path d=\"M18 165h9l5 12-6 5q7 12 18 16l5-6 12 4v10q-1 4-7 3-31-5-38-35-1-7 2-9z\"/>\n        <path d=\"M25 224h30v31h-5v-23H31v27h-6z\"/><ellipse cx=\"22\" cy=\"259\" rx=\"10\" ry=\"9\"/><ellipse cx=\"46\" cy=\"255\" rx=\"10\" ry=\"9\"/>\n        <path d=\"M12 287h51v29H12z\" fill=\"#e5ff00\"/><path d=\"M21 295h32m-32 13h32m-9-21-22 29\" fill=\"none\" stroke=\"#717900\" stroke-width=\"4\"/>\n        <path d=\"m24 344 21 0 12 20-12 20H24l-12-20z\"/><path d=\"m29 354 10 20\" stroke=\"#666\" stroke-width=\"4\"/>\n        <path d=\"M23 421a16 16 0 0 1 31-3 13 13 0 0 1-2 26H24a12 12 0 0 1-1-23z\"/><path d=\"M34 418v11h-6l10 11 10-11h-6v-11z\" fill=\"#666\"/>\n      </g>\n      <g class=\"wall-meter-main\">\n        <path d=\"M625 165 1024 112v339l-399-53z\" fill=\"#ddd\" fill-opacity=\".25\"/>\n        <text x=\"815\" y=\"390\" font-size=\"255\" font-weight=\"700\" fill=\"#222\" fill-opacity=\".65\">P</text></g>\n      <g class=\"wall-meter-speed\">\n        " + v98(v478, v479) + (v479 ? "<g data-ae6-cruise fill=\"#27ef51\"><circle cx=\"447\" cy=\"" + (v478.topPct * 6 + v478.heightPct * 6 - 72) + "\" r=\"14\" fill=\"none\" stroke=\"#27ef51\" stroke-width=\"4\"/><text x=\"480\" y=\"" + (v478.topPct * 6 + v478.heightPct * 6 - 65) + "\" font-size=\"20\" fill=\"#fff\">100km/h</text></g>" : "") + "\n        <path d=\"M765 362 772 338 781 352 791 326 800 330 810 305 822 313 835 289 849 294 860 270 871 279 884 263 898 277 912 268 927 286 943 280 960 287 979 276V390H765Z\" fill=\"#00ed95\" fill-opacity=\".2\"/>\n        <path d=\"M755 324h237\" fill=\"none\" stroke=\"#ccc\" stroke-opacity=\".5\" stroke-width=\"3\" stroke-dasharray=\"8 7\"/>\n        <path d=\"m765 362 7-24 9 14 10-26 9 4 10-25 12 8 13-24 14 5 11-24 11 9 13-16 14 14 14-9 15 18 16-6 17 7 19-11\" fill=\"none\" stroke=\"#00ed95\" stroke-width=\"4\"/>\n        <circle cx=\"979\" cy=\"276\" r=\"9\" fill=\"#000\" stroke=\"#777\" stroke-width=\"3\"/><circle cx=\"979\" cy=\"276\" r=\"5\" fill=\"#75ffda\"/>\n        <text x=\"838\" y=\"419\" font-size=\"36\" fill=\"#00ed95\">0.0<tspan font-size=\"22\">kW</tspan></text>\n        <text x=\"18\" y=\"535\" font-size=\"18\">按「SET」查看详情</text>\n      </g>\n      <path d=\"M2 563h40l-9 8H14v4h15l-7 7H14v4h5l-8 8H2zm306 0h-12l-31 31h43v-8h-25l5-5h20v-7h-13l5-5h8z\" fill=\"#defff6\"/>\n      <path d=\"m48 565-28 29h239l29-29z\" fill=\"#56dabb\" stroke=\"#d1fff2\" stroke-width=\"2\"/>\n      <path d=\"M48 565h239l-8 8H40zm-18 19h239l-10 10H20z\" fill=\"#b8ffe6\" fill-opacity=\".35\"/>\n      <path d=\"m165 565-29 29\" stroke=\"#c3ffed\" stroke-opacity=\".65\" stroke-width=\"2\"/>\n      <rect x=\"317\" y=\"560\" width=\"88\" height=\"33\" rx=\"16\" fill=\"#00341a\"/>\n      <path d=\"m335 565-11 15h7l-3 9 13-15h-8z\" fill=\"#00ed95\"/>\n      <g font-size=\"28\"><text x=\"344\" y=\"585\" font-size=\"24\" font-weight=\"700\" fill=\"#00ed95\">100%</text><text x=\"414\" y=\"585\">140km</text>\n        <text class=\"" + (v479 ? "" : "wall-meter-main") + "\" x=\"555\" y=\"585\">ODO:999999km</text>\n        <text x=\"848\" y=\"585\">12°C</text><text x=\"1008\" y=\"585\" text-anchor=\"end\">12:45</text></g>\n      <g fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linecap=\"round\"><circle cx=\"817\" cy=\"575\" r=\"10\"/>\n        <path d=\"M817 554v4m0 34v4m-21-21h4m34 0h4m-36-15 3 3m24 24 3 3m-30 0 3-3m24-24 3-3\"/></g>\n    </svg>";
    }
    const v100 = v485 => ({
      w: v485?.mainW || Number(v17.wallsMeta?.width) || 1024,
      h: v485?.mainH || Number(v17.wallsMeta?.height) || 600
    });
    function v101(v486 = {}, v487 = null, v488 = false) {
      const v489 = !!v487?.ready && (!!v486.main?.url || !!v486.speed?.url);
      const v490 = (v497, v498 = v486[v497], v499 = false) => {
        const v500 = v498?.fit ? v16.wallpaperLayerStyle(v498.fit) : {
          left: "0%",
          top: "0%",
          width: "100%",
          height: "100%"
        };
        const v501 = v499 ? "" : v498?.plan ? " data-market-image=\"" + v14(v498.url) + "\" data-market-plan=\"" + v14(JSON.stringify(v498.plan)) + "\"" : v498?.url ? " src=\"" + v14(v498.url) + "\"" : "";
        return "<span class=\"wall-composite-crop\" data-composite-crop=\"" + v497 + "\" style=\"left:" + v500.left + ";top:" + v500.top + ";width:" + v500.width + ";height:" + v500.height + "\"><img data-composite-image=\"" + v497 + "\"" + v501 + " alt=\"\" draggable=\"false\" referrerpolicy=\"no-referrer\"></span>";
      };
      const v491 = v487?.speed;
      const v492 = v491 || v16.wallpaperSpeedCardBox({
        ...v100(v487),
        model: v50().model
      });
      if (!v492) {
        return "<div class=\"wall-empty\" aria-hidden=\"true\"></div>";
      }
      const v493 = v92(v492);
      const {
        id: v494,
        defs: v495
      } = v97(v492);
      const v496 = !!v489 && !!v491 && !!v486.speed?.url;
      return "<div class=\"wall-area\"><div class=\"wall-area-label\">拼合效果 · 仪表示意</div><div class=\"wall-composite\" data-composite-stage data-meter-speed=\"" + v496 + "\" data-meter-speed-image=\"" + (v496 && !v488) + "\"" + (v489 ? " style=\"" + v88(v487) + "\"" : " hidden") + ">\n      <div class=\"wall-composite-main\">" + v490("main") + "</div>\n      <svg class=\"wall-composite-speed-back\" data-composite-speed-back viewBox=\"0 0 1024 600\" preserveAspectRatio=\"none\" aria-hidden=\"true\"" + (v496 ? "" : " hidden") + ">" + v495 + "<g mask=\"url(#" + v494 + ")\"><g data-speed-back-rotate transform=\"rotate(" + v89 + " " + v93(v493.cx) + " " + v93(v493.cy) + ")\"><foreignObject data-speed-back-box x=\"" + v93(v493.x) + "\" y=\"" + v93(v493.y) + "\" width=\"" + v93(v493.w) + "\" height=\"" + v93(v493.h) + "\"><div xmlns=\"http://www.w3.org/1999/xhtml\" class=\"wall-speed-back-frame\">" + v490("speed-back", v486.speed, true) + "</div></foreignObject></g></g></svg>\n      <div class=\"wall-composite-speed\" data-composite-speed" + (v496 ? " style=\"left:" + v491.leftPct + "%;top:" + v491.topPct + "%;width:" + v491.widthPct + "%;height:" + v491.heightPct + "%\"" : " hidden") + ">" + v490("speed") + "</div>" + v99(v491 || undefined) + (v488 ? "<button class=\"wall-preview-loading\" type=\"button\" data-composite-loading aria-label=\"取消预览加载\"><span data-composite-loading-content>" + v13.spinner("加载中…") + "</span></button>" : "") + "</div>\n      <div class=\"wall-empty\" data-composite-hint" + (v489 ? " hidden" : "") + ">" + (v486.main?.url || v486.speed?.url ? "图片加载中…" : "先添加整屏图片") + "</div></div>";
    }
    function v102(v502, v503 = null, v504 = false) {
      if (!v503 && v51()) {
        return "<div class=\"wall-editor-grid\">" + [["整屏原图", v502.main], ["速度卡原图", v502.speedCard]].filter(([, v508]) => v508?.url).map(([v509, v510]) => "<div class=\"wall-thumb-btn wall-detail-preview\" data-detail-preview role=\"button\" tabindex=\"0\" aria-label=\"全屏预览" + v509 + "\"><img data-wall-image src=\"" + v14(v510.url) + "\" alt=\"" + v509 + "\" referrerpolicy=\"no-referrer\"><span class=\"wall-thumb-tag\">" + v509 + "</span></div>").join("") + "</div><div class=\"card-sub\">" + v14(v51()) + "</div>";
      }
      if (v504) {
        return "<div class=\"wall-editor-grid wall-detail-skeleton\">" + ["整屏", "速度卡"].map(v511 => "<div class=\"wall-thumb-btn wall-detail-preview\"><span class=\"wall-thumb-box sk\" style=\"aspect-ratio:" + v503.mainW + "/" + v503.mainH + "\" aria-hidden=\"true\"></span><span class=\"wall-thumb-tag\">" + v511 + "</span></div>").join("") + "</div>";
      }
      const v505 = !v502.main?.url && !!v502.speedCard?.url;
      const v506 = v505 ? v502.speedCard : v502.main;
      const v507 = v505 ? "speed" : "main";
      return "<div class=\"wall-editor-grid\">\n      <div class=\"wall-thumb-btn wall-detail-preview\" data-detail-preview role=\"button\" tabindex=\"0\" aria-label=\"全屏预览整屏\"><span class=\"wall-thumb-box" + (v506?.url ? " sk" : "") + "\" data-detail-main" + (v503 ? " style=\"aspect-ratio:" + v503.mainW + "/" + v503.mainH + "\"" : "") + ">" + (v506?.url ? "<img data-wall-image data-detail-image=\"" + v507 + "\"" + (v505 ? " class=\"wall-speed-original\"" : "") + " " + (v506.plan ? "data-market-image=\"" + v14(v506.url) + "\" data-market-plan=\"" + v14(JSON.stringify(v506.plan)) + "\"" : "src=\"" + v14(v506.url) + "\"") + " alt=\"" + (v505 ? "速度卡" : "整屏") + "\" referrerpolicy=\"no-referrer\"><span class=\"wall-ph\" data-image-error hidden>图片没加载出来，请稍后重试</span>" + (v505 ? "" : v99()) : "<span class=\"wall-ph\">还没有这张图片</span>") + "</span><span class=\"wall-thumb-tag\">" + (v505 ? "速度卡原图" : "整屏") + "</span></div>\n      <div class=\"wall-thumb-btn wall-detail-preview\" data-detail-preview role=\"button\" tabindex=\"0\" aria-label=\"全屏预览速度卡\">" + v101({
        main: v502.main,
        speed: v502.speedCard
      }, v503, !!v503 || v505) + "<span class=\"wall-thumb-tag\">" + (v505 ? "速度卡叠放" : "速度卡") + "</span></div>\n      </div>";
    }
    function v103(v512, v513 = null) {
      return v102(v16.parseWallpaperAreas(v512), v513) + "\n      <div class=\"wall-actions wall-detail-actions\"><button class=\"btn block primary\" type=\"button\" data-act=\"wallapply\" data-id=\"" + v14(v512.id) + "\"" + (v55(v512) ? " disabled" : "") + ">" + (v512.inUse ? "使用中" : "应用到车机") + "</button>\n      <button class=\"btn block\" type=\"button\" data-act=\"walldel\">删除壁纸</button></div>";
    }
    function v104(v514) {
      if (window.PLATFORM.preview()) {
        return v29("detail");
      }
      if (!v28()) {
        return null;
      }
      const v515 = v17.walls.find(v520 => String(v520.id) === String(v514));
      if (!v515 || !v37(v515.scope)) {
        return;
      }
      if (v515.rejected) {
        v13.toast(v11(), v55(v515), 4200);
        v63(v515.scope, v515, null);
        return null;
      }
      const v516 = {
        root: null,
        mount: 0,
        closed: false
      };
      const v517 = v16.parseWallpaperAreas(v515);
      const v518 = v100();
      const v519 = !v51() && !v517.main?.url && v517.speedCard?.url ? {
        geo: {
          ready: true,
          mainW: v518.w,
          mainH: v518.h,
          ratio: v518.w / v518.h,
          speed: v16.wallpaperSpeedCardBox({
            ...v518,
            model: v50().model
          })
        },
        canceled: false
      } : null;
      return v42({
        key: "wall-detail",
        full: true,
        title: v515.name || "未命名壁纸",
        body: v103(v515, v519?.geo),
        headActions: v515.inUse ? "<span class=\"wall-in-use\" role=\"img\" aria-label=\"使用中\" title=\"使用中\">" + v13.icon("check", 24) + "</span>" : "",
        onDismiss: () => {
          v516.closed = true;
          v516.mount++;
          v516.root = null;
        },
        onMount: v521 => {
          v521.appendChild(v521.querySelector(".wall-detail-actions"));
          const v522 = v13.currentSheet("wall-detail");
          const v523 = ++v516.mount;
          v516.root = v521;
          const v524 = () => !v516.closed && v37(v515.scope) && v38(v522) && v13.currentSheet() === v522 && v516.mount === v523 && v516.root === v521 && v521.isConnected !== false;
          v69(v521, v524);
          v49();
          v56(v521);
          v105(v521, v524, null, v519);
          v188(v521, v524, v515.name || "壁纸预览");
          v521.querySelector("[data-act=\"wallapply\"]")?.addEventListener("click", () => {
            if (v524()) {
              v108(v515);
            }
          });
          v521.querySelector("[data-act=\"walldel\"]")?.addEventListener("click", () => {
            if (v524()) {
              v109(v515);
            }
          });
        }
      });
    }
    function v105(v525, v526, v527 = null, v528 = null) {
      const v529 = v525.querySelector("[data-detail-image=\"main\"]");
      const v530 = v525.querySelector("[data-detail-image=\"speed\"]");
      const v531 = v525.querySelector("[data-composite-image=\"speed\"]");
      const v532 = v525.querySelector("[data-composite-image=\"speed-back\"]");
      const v533 = v525.querySelector("[data-composite-stage]");
      const v534 = v525.querySelector("[data-composite-hint]");
      if (!v533) {
        return;
      }
      const v535 = v525.querySelector("[data-composite-image=\"main\"]");
      const v536 = v525.querySelector("[data-composite-loading]");
      const v537 = v525.querySelector("[data-composite-speed]");
      const v538 = v525.querySelector("[data-composite-speed-back]");
      const v539 = v545 => v545 && !v545.hidden && v545.naturalWidth > 0 && v545.naturalHeight > 0 ? {
        w: v545.naturalWidth,
        h: v545.naturalHeight
      } : null;
      const v540 = v100(v528?.geo);
      const v541 = v546 => v546 && (v546.getAttribute("src") || v546.dataset.marketImage) && !v546.hidden && !v539(v546);
      let v542 = false;
      const v543 = () => {
        if (!v526()) {
          return;
        }
        const v547 = v87(v529 ? v539(v529) : v530 ? v540 : null, v539(v531));
        if (!v529 && !v547.hasSpeed) {
          v547.ready = false;
        }
        const v548 = v528 && (!v547.ready || v528.canceled) ? v528.geo : v547;
        if (v548.hasSpeed && v527) {
          v548.speed = v527;
        }
        const v549 = !!v547.ready && !!v547.hasSpeed && !v528?.canceled;
        const v550 = !v529 && !v530;
        const v551 = v530 && v531.hidden;
        v533.hidden = !v548.ready;
        v534.hidden = v548.ready && !v551 && !v528?.canceled;
        if (!v548.ready || v551 || v528?.canceled) {
          v534.textContent = v528?.canceled ? "已取消预览加载" : v550 ? "没有可预览的图片" : v529 ? v529.hidden ? "整屏图片没加载出来，暂时无法拼合" : "图片加载中…" : v551 ? "速度卡图片没加载出来，暂时无法预览" : "图片加载中…";
        }
        v537.hidden = !v549;
        v538.setAttribute("hidden", "");
        v533.setAttribute("data-meter-speed", String(v549 || !!v528?.geo.speed));
        v533.setAttribute("data-meter-speed-image", String(v549));
        if (v548.ready) {
          v525.querySelector("[data-detail-main]").style.aspectRatio = v548.mainW + "/" + v548.mainH;
          v533.style.cssText = v88(v548);
        }
        if (v539(v529) && !v528?.canceled) {
          v535.src = v529.currentSrc || v529.src;
        }
        if (v549) {
          const v552 = v527 || v548.speed;
          Object.assign(v537.style, {
            left: v552.leftPct + "%",
            top: v552.topPct + "%",
            width: v552.widthPct + "%",
            height: v552.heightPct + "%"
          });
          const v553 = v92(v552);
          const v554 = v531.currentSrc || v531.getAttribute("src");
          const v555 = v538.querySelector("[data-speed-back-box]");
          v555.setAttribute("x", String(v93(v553.x)));
          v555.setAttribute("y", String(v93(v553.y)));
          v555.setAttribute("width", String(v93(v553.w)));
          v555.setAttribute("height", String(v93(v553.h)));
          v538.querySelector("[data-speed-back-rotate]").setAttribute("transform", "rotate(" + v89 + " " + v93(v553.cx) + " " + v93(v553.cy) + ")");
          v538.querySelector("[data-speed-mask-front]").setAttribute("transform", v94(v552));
          v525.querySelector("[data-composite-crop=\"speed-back\"]").style.cssText = v525.querySelector("[data-composite-crop=\"speed\"]").style.cssText;
          if (v554 && v532.getAttribute("src") !== v554) {
            v532.removeAttribute("data-image-ready");
            v532.src = v554;
          }
          v538.removeAttribute("hidden");
        } else {
          v532.removeAttribute("src");
          v532.removeAttribute("data-image-ready");
        }
        v542 = !v528?.canceled && [v529, v530, v531].some(v541);
        if (v536) {
          v536.hidden = !v542;
        }
        if (v542) {
          v533.setAttribute("aria-busy", "true");
        } else {
          v533.removeAttribute("aria-busy");
        }
        if (v536 && !v548.ready && v542) {
          v533.setAttribute("hidden", "");
        }
      };
      for (const v556 of [v535, v531, v532].filter(Boolean)) {
        v556.addEventListener("load", () => {
          if (v526() && !v528?.canceled) {
            v556.setAttribute("data-image-ready", "");
          }
        });
        if (v556.complete && v556.naturalWidth) {
          v556.setAttribute("data-image-ready", "");
        }
      }
      for (const v557 of [v529, v530, v531].filter(Boolean)) {
        v557.addEventListener("load", v543);
        v557.addEventListener("error", () => {
          if (v526()) {
            v557.hidden = true;
            v543();
          }
        });
      }
      const v544 = () => {
        for (const v558 of [v535, v531, v532].filter(Boolean)) {
          v558.removeAttribute("src");
          v558.removeAttribute("data-image-ready");
        }
      };
      if (v528?.canceled) {
        v544();
      }
      if (v528) {
        (v525.closest(".sheet") || v525).addEventListener("click", v559 => {
          const v560 = v559.target.closest("[data-composite-loading]");
          if (!v542 || !v526() || !v560 && v559.target.closest("[data-back], [data-detail-preview]")) {
            return;
          }
          v528.canceled = true;
          v544();
          v543();
        });
      }
      v543();
    }
    function v106({
      title: v561,
      sub = "",
      body = "",
      actionLabel = "执行",
      needCheck = true,
      scope = v46(),
      run: v562,
      onDismiss: v563,
      exclusive = true,
      action = v561,
      metadata = {}
    }) {
      let v564;
      let v565 = false;
      let v566 = false;
      let v567 = false;
      const v568 = () => {
        if (!v567) {
          v567 = true;
          v563?.();
        }
      };
      const v569 = () => !v566 && v37(scope) && v38(v564);
      v564 = v42({
        key: "",
        center: true,
        title: v561,
        sub: sub,
        body: (body ? "<div class=\"wall-confirm-copy\">" + v14(body) + "</div>" : "") + "\n        " + (needCheck ? "<label class=\"wall-check\"><input type=\"checkbox\" data-act=\"ck\"><span>我确认对当前车辆执行这项操作</span></label>" : "") + "\n        <div class=\"wall-actions-stack\"><button class=\"btn block primary\" type=\"button\" data-act=\"ok\"" + (needCheck ? " disabled" : "") + ">" + v14(actionLabel) + "</button></div>",
        onDismiss: () => {
          v566 = true;
          if (!v565) {
            v568();
          }
        },
        onMount: v570 => {
          const v571 = v570.querySelector("[data-act=\"ok\"]");
          const v572 = v570.querySelector("[data-act=\"ck\"]");
          v572?.addEventListener("change", () => {
            if (v571) {
              v571.disabled = v565 || !v572.checked;
            }
          });
          v571?.addEventListener("click", async () => {
            if (v565 || v571.disabled || !v569() || exclusive && v17.writeBusy) {
              return;
            }
            v565 = true;
            if (exclusive) {
              v17.writeBusy = true;
            }
            v571.disabled = true;
            if (v572) {
              v572.disabled = true;
            }
            v571.textContent = "执行中…";
            const v573 = v34(scope, "media-operation");
            v35(action, v573, {
              phase: "start",
              extra: metadata
            });
            let v574 = false;
            let v575 = false;
            try {
              await v562(v569, v564, v573);
              v575 = v569();
              if (v575) {
                v13.closeSheet(v564);
              }
            } catch (v576) {
              v574 = true;
              v35(action + "未完成", v573, {
                phase: "failed",
                kind: "err",
                extra: metadata
              });
              if (v569()) {
                v571.textContent = actionLabel;
                v13.toast(v11(), "未完成：" + v576.message, 4200);
              }
            } finally {
              if (!v574) {
                v35(action + "流程结束", v573, {
                  phase: v575 ? "end" : "cancelled",
                  kind: v575 ? "info" : "warn",
                  detail: "流程结束不代替接口接受或车机确认结果",
                  extra: metadata
                });
              }
              v565 = false;
              if (exclusive) {
                v17.writeBusy = false;
              }
              v56();
              if (v566) {
                v568();
              }
              if (v569()) {
                if (v572) {
                  v572.disabled = false;
                }
                v571.disabled = needCheck && !v572?.checked;
              }
            }
          });
        }
      });
      return v564;
    }
    function v107(v577) {
      if (v577?.scope && v37(v577.scope)) {
        return v577.scope;
      } else {
        return null;
      }
    }
    function v108(v578) {
      if (!v28()) {
        return;
      }
      const v579 = v107(v578);
      if (!v579) {
        return;
      }
      const v580 = v55(v578);
      if (v580) {
        return v13.toast(v11(), v580, 3600);
      }
      if (v53()) {
        const v581 = v34(v579, "wallpaper-lan");
        const v582 = v17.wallsHandle;
        const v583 = v13.currentSheet("wall-detail");
        const v584 = () => v37(v579) && v17.wallsHandle === v582 && v38(v582) && v38(v583) && v13.currentSheet("wall-detail") === v583;
        if (v17.writeBusy) {
          return;
        }
        v17.writeBusy = true;
        v56();
        (async () => {
          try {
            const [v585, v586] = await Promise.all([v41("wallpaper_detail", v579, {
              ctx: {
                wallpaperId: v578.id
              },
              privateResult: true
            }, v584, v581), v41("vehicle_home", v579, {
              privateResult: true
            }, v584, v581)]);
            if (!v39(v585, v584) || !v39(v586, v584)) {
              return;
            }
            if (!v585.ok) {
              throw new Error("无法读取原始壁纸包，请刷新后重试");
            }
            if (!v586.ok || v586.data?.vinNo !== v579.vin) {
              throw new Error("无法确认当前车辆连接信息，请刷新后重试");
            }
            v17.wallsMeta = {
              ...v16.wallpapersFromHome({
                data: v586.data
              }),
              at: Date.now()
            };
            const v587 = v51(null, false);
            if (v587) {
              throw new Error(v587);
            }
            const v588 = typeof v586.data.wifiAddress === "string" ? v586.data.wifiAddress : "";
            const v589 = window.CAST?.parseWallpaperPairing?.(v588);
            v35("壁纸直连目标检查", v581, {
              extra: {
                stage: "pairing",
                wifiAddressPresent: !!v588.trim(),
                ...(v589?.fields || {}),
                targetValid: v589?.ok === true
              }
            });
            if (!v589?.ok) {
              throw new Error("车机 Wi-Fi 连接信息不完整或无效，请刷新后重试");
            }
            const v590 = v586.data.mmiWifiIp ?? "";
            const v591 = typeof v590 === "string" && /^(?:\d{1,3}\.){3}\d{1,3}$/.test(v590) ? v590.split(".").map(Number) : [];
            if (v590 !== "" && (v591.length !== 4 || v591.some(v596 => v596 > 255) || v591[0] !== 10 && (v591[0] !== 172 || !(v591[1] >= 16) || !(v591[1] <= 31)) && (v591[0] !== 192 || v591[1] !== 168))) {
              throw new Error("车机 Wi-Fi 地址无效，请刷新后重试");
            }
            const v592 = v16.normalizeWallpaperDetail({
              data: v585.data
            });
            const v593 = v592?.resolution && v51({
              canvas: {
                w: v592.resolution.width,
                h: v592.resolution.height
              }
            }, false);
            if (v593) {
              throw new Error(v593);
            }
            const v594 = {};
            const v595 = v16.wallpaperTransferSpec(v592 || v578, v594);
            if (!v595) {
              v35("壁纸原包检查未通过", v581, {
                phase: "failed",
                kind: "err",
                detail: v594.reason || "原始壁纸包信息不完整"
              });
              throw new Error(v594.reason || "原始壁纸包信息不完整，请刷新详情后重试");
            }
            if (v592 && v592.id !== String(v578.id)) {
              throw new Error("壁纸详情不匹配，请刷新列表后重试");
            }
            if (!v584()) {
              return;
            }
            if (typeof v10.walltransfer?.open !== "function") {
              throw new Error("应用页面尚未就绪，请更新面板后重试");
            }
            if (v10.walltransfer.open({
              ...v595,
              wifiAddress: v588,
              carIp: v590
            }, v579, v578) !== false) {
              v35("打开壁纸直连页", v581, {
                phase: "accepted",
                detail: "连接与发送在当前页面另行确认"
              });
            }
          } catch (v597) {
            if (v584()) {
              v13.toast(v11(), v597.message, 4200);
            }
          } finally {
            v17.writeBusy = false;
            v56();
          }
        })();
        return;
      }
      if (!v10.inShell()) {
        const v598 = v16.buildUseWallpaperBody(v578.id, v579.vin);
        if (v17.writeBusy) {
          return;
        }
        v106({
          title: "应用车机壁纸",
          sub: "通过云端下发 · 需要车机在线",
          scope: v579,
          actionLabel: "应用到车机",
          body: "将「" + (v578.name || "未命名壁纸") + "」应用到当前车辆？",
          run: async (v599, v600, v601) => {
            if (!(await v57(v579, v599, v601))) {
              return;
            }
            const v602 = await v41("wallpaper_use", v579, {
              body: v598
            }, v599, v601);
            if (!v39(v602, v599)) {
              return;
            }
            if (!v602.ok) {
              throw new Error(v40(v602, "应用失败"));
            }
            const v603 = v602.data && typeof v602.data === "object" ? v602.data.recordId || v602.data.id : ["string", "number"].includes(typeof v602.data) ? v602.data : "";
            v13.toast(v11(), "已提交壁纸下发，等待车机确认", 3200);
            v13.closeSheet(v13.currentSheet("wall-detail"));
            if (v603) {
              v111(String(v603), v579, v601);
            } else {
              v66(v579, {
                logScope: v601
              });
            }
          }
        });
        return;
      }
      v13.toast(v11(), "请更新 App，使用页面内的车机 Wi-Fi 应用流程", 3600);
    }
    function v109(v604) {
      if (!v28()) {
        return;
      }
      const v605 = v107(v604);
      if (!v605) {
        return;
      }
      const v606 = v13.currentSheet("wall-detail");
      v106({
        title: "删除壁纸",
        sub: "删除后无法恢复",
        scope: v605,
        needCheck: false,
        body: "删除「" + (v604.name || "未命名壁纸") + "」？",
        run: async (v607, v608, v609) => {
          const v610 = await v41("wallpaper_delete", v605, {
            ctx: {
              wallpaperId: v604.id
            },
            method: "DELETE"
          }, v607, v609);
          v35("壁纸删除接受结果", v609, {
            phase: "accepted",
            kind: v610.ok ? "ok" : "err",
            extra: {
              accepted: !!v610.ok
            }
          });
          if (!v39(v610, v607)) {
            return;
          }
          if (!v610.ok) {
            throw new Error(v40(v610, "删除失败"));
          }
          let v611 = "已删除";
          try {
            const v612 = await v168(v604.id);
            if (v612 === "expired") {
              v611 += "；市场作品过天后无法撤回，如需下架请留言联系我们";
            } else if (v612 === "queued") {
              v611 += "；已加入撤回队列，稍后自动重试";
            }
          } catch {
            v611 += "；市场同步失败，请检查网络和本地存储";
          }
          if (!v607()) {
            return;
          }
          v13.toast(v11(), v611, 3200);
          v13.closeSheet(v606);
          await v66(v605, {
            logScope: v609
          });
        }
      });
    }
    function v110() {
      if (!v28()) {
        return;
      }
      const v613 = v46();
      if (!v613.vin) {
        return v13.toast(v11(), "还没读到车辆 VIN，稍后再试", 3000);
      }
      if (v50().supported !== true) {
        return v13.toast(v11(), "当前车辆未确认支持自定义壁纸", 3000);
      }
      if (v17.writeBusy) {
        return v13.toast(v11(), "上一项操作还在执行，请稍候", 2600);
      }
      const v614 = v16.buildRestoreWallpaperBody(v613.vin);
      v106({
        title: "恢复默认壁纸",
        sub: "不影响已上传的壁纸",
        scope: v613,
        body: "车机仪表会切回内置壁纸。你自己上传的壁纸不会被删除，之后还能重新应用。",
        metadata: {
          restore: true
        },
        run: async (v615, v616, v617) => {
          if (v50().supported !== true) {
            throw new Error("当前车辆未确认支持自定义壁纸");
          }
          const v618 = await v41("wallpaper_use", v613, {
            body: v614
          }, v615, v617);
          v35("壁纸恢复默认接受结果", v617, {
            phase: "accepted",
            kind: v618.ok ? "ok" : "err",
            detail: "服务端接受不代表车机已切回默认壁纸",
            extra: {
              accepted: !!v618.ok,
              adopted: v39(v618, v615)
            }
          });
          if (!v39(v618, v615)) {
            return;
          }
          if (!v618.ok) {
            throw new Error(v40(v618, "恢复默认失败"));
          }
          const v619 = typeof v618.data === "object" ? v618.data?.recordId || v618.data?.id : v618.data;
          v13.toast(v11(), "已提交恢复默认，车机在线时会切回内置壁纸", 3200);
          if (v619) {
            v111(String(v619), v613, v617);
          } else {
            v66(v613, {
              logScope: v617
            });
          }
        }
      });
    }
    function v111(v620, v621, v622 = null) {
      v112(false);
      const v623 = v17.wallsHandle;
      const v624 = ++v17.progressSeq;
      if (!v37(v621) || !v38(v623)) {
        return;
      }
      const v625 = v622 || v34(v621, "wallpaper-progress");
      const v626 = v17.progressLog = {
        diag: v625,
        done: false,
        last: ""
      };
      v35("壁纸车机进度查询开始", v625, {
        phase: "start"
      });
      const v627 = () => v37(v621) && v38(v623) && v624 === v17.progressSeq;
      v17.progressRecordId = v620;
      v17.progressText = "等待车机返回结果…";
      v75(v623);
      let v628 = 0;
      let v629 = false;
      v17.progressTimer = setInterval(async () => {
        if (v624 !== v17.progressSeq) {
          return;
        }
        if (!v37(v621) || !v38(v623)) {
          return v112(false);
        }
        if (v629) {
          return;
        }
        v629 = true;
        v628++;
        const v630 = await v41("wallpaper_progress", v621, {
          ctx: {
            recordId: v620
          }
        }, v627, v625);
        v629 = false;
        if (!v39(v630, v627)) {
          return;
        }
        const v631 = v630.ok ? v16.normalizeProgress({
          data: v630.data
        }) : null;
        v17.progressPercent = v631?.percent || 0;
        const v632 = v631?.success ? "下发成功" : v631?.failed ? "下发失败" : v631?.done ? "流程已结束，结果未知" : "等待车机确认";
        const v633 = JSON.stringify([v631?.percent, v631?.success, v631?.failed, v631?.done, !!v630.ok]);
        if (v633 !== v626.last || v631?.done || v628 >= 20) {
          v626.last = v633;
          v35("壁纸车机进度", v625, {
            phase: v631?.done || v628 >= 20 ? "end" : "progress",
            kind: v631?.success ? "ok" : v631?.failed ? "err" : v628 >= 20 ? "warn" : "info",
            detail: v631?.done || v628 >= 20 ? v632 : "等待车机确认",
            extra: {
              percent: v631?.percent ?? null,
              success: !!v631?.success,
              failed: !!v631?.failed,
              done: !!v631?.done,
              queries: v628,
              timedOut: v628 >= 20 && !v631?.done
            }
          });
        }
        v17.progressText = "" + (v631 ? v631.percent + "% · " + v632 : "结果未知，暂未读到进度") + (v631?.message ? " · " + v631.message : "");
        if (v631?.done || v628 >= 20) {
          v626.done = true;
          clearInterval(v17.progressTimer);
          v17.progressTimer = null;
          if (!v631?.done) {
            v17.progressText += " · 已停止查询，请稍后刷新";
          }
          if (v631?.success) {
            v13.toast(v11(), "壁纸下发成功", 2400);
            v66(v621, {
              logScope: v625
            });
          }
        }
        v75(v623);
      }, 1500);
    }
    function v112(v634 = true) {
      if (v17.progressLog && !v17.progressLog.done) {
        v35("壁纸车机进度查询已停止", v17.progressLog.diag, {
          phase: "stopped",
          kind: "warn",
          detail: "只停止查询，已提交的下发不撤回"
        });
        v17.progressLog.done = true;
      }
      v17.progressSeq++;
      clearInterval(v17.progressTimer);
      Object.assign(v17, {
        progressTimer: null,
        progressRecordId: "",
        progressPercent: 0,
        progressText: "",
        progressLog: null
      });
      if (v634) {
        v75();
      }
    }
    const v113 = "共享车辆无法保存到我的壁纸，请切换到自有车辆";
    const v114 = () => ({
      file: null,
      img: null,
      url: "",
      zoom: 1,
      panX: 0,
      panY: 0
    });
    function v115(v635 = null, v636 = null) {
      if (window.PLATFORM.preview()) {
        return v29("editor");
      }
      if (!v28()) {
        return null;
      }
      const v637 = v46();
      if (v17.writeBusy) {
        return v13.toast(v11(), "上一项操作还在执行，请稍候", 2600);
      }
      if (v17.editor && v47(v17.editor)) {
        return;
      }
      const v638 = v51(v635);
      if (v638) {
        return v13.toast(v11(), v638, 3600);
      }
      if (!v636 && v143()) {
        return v13.toast(v11(), v113, 3600);
      }
      const v639 = v50();
      const v640 = !!v639.width && !!v639.height;
      if (v636 && !v640) {
        throw new Error("尚未读到当前仪表的壁纸尺寸，请刷新车况后重试");
      }
      const v641 = v635?.canvas.w || (v640 ? v639.width : 1024);
      const v642 = v635?.canvas.h || (v640 ? v639.height : 600);
      const v643 = v635?.speedBox || v16.wallpaperSpeedCardBox({
        w: v641,
        h: v642,
        model: v639.model
      });
      if (!v643) {
        v13.toast(v11(), "当前仪表分辨率暂不支持制作速度卡，请稍后重试", 3600);
        return null;
      }
      if (v635) {
        Object.assign(v643, {
          leftPct: v643.left / v641 * 100,
          topPct: v643.top / v642 * 100,
          widthPct: v643.w / v641 * 100,
          heightPct: v643.h / v642 * 100
        });
      }
      const v644 = v17.editor = {
        scope: v637,
        handle: null,
        previewHandle: null,
        view: "list",
        editing: "main",
        name: "",
        box: {
          main: {
            w: v641,
            h: v642
          },
          speed: {
            w: v643.w,
            h: v643.h
          }
        },
        geo: v643,
        layers: {
          main: v114(),
          speed: v114()
        },
        returnTarget: {
          walls: v38(v17.wallsHandle) ? v17.wallsHandle : null,
          layers: []
        },
        pending: "main",
        moveStep: 1,
        zoomStep: 1,
        serial: 0,
        decodeSeq: 0,
        decodeJobs: new Set(),
        busy: false,
        status: "",
        closed: false,
        detach: null,
        uploadTask: null,
        marketShared: !!v635,
        experimental: v636
      };
      if (v635) {
        v644.name = v635.name;
      }
      v644.dismiss = () => {
        if (v38(v644.nameHandle)) {
          v13.closeSheet(v644.nameHandle);
        }
        if (v38(v644.previewHandle)) {
          v13.closeSheet(v644.previewHandle);
        }
        if (v644.experimental?.handle) {
          v44(v644);
        } else if (v38(v644.handle)) {
          v13.closeSheet(v644.handle);
        }
      };
      v644.prepare = () => v130(v644);
      v644.refresh = () => v124(v644);
      v644.setOutput = v645 => {
        if (!v644.experimental || !["main", "speed", "both"].includes(v645) || !v47(v644) || v644.busy || v644.decodeJobs.size || v38(v644.previewHandle)) {
          return false;
        }
        v644.experimental.output = v645;
        v126(v644);
        v124(v644);
        return true;
      };
      if (v636?.handle) {
        v644.handle = v636.handle;
        v124(v644);
      } else {
        v644.handle = v42({
          key: "wall-editor",
          full: true,
          title: v636 ? "准备本地壁纸" : "新建壁纸",
          body: v122(v644),
          onMount: v646 => v128(v646, v644),
          onDismiss: () => v44(v644)
        });
      }
      return v644;
    }
    const v116 = v647 => v647.experimental?.output === "main" ? ["main"] : v647.experimental?.output === "speed" ? ["speed"] : v647.experimental ? ["main", "speed"] : ["main", ...(v647.layers.speed.url ? ["speed"] : [])];
    function v117(v648) {
      const v649 = v116(v648).find(v650 => !v648.layers[v650].url);
      if (!v649) {
        return "";
      }
      if (!v648.experimental) {
        return "先选择一张整屏图片";
      }
      return "请先选择" + (v649 === "main" ? "整屏" : "速度卡") + "图片";
    }
    const v118 = () => /^(?:AE4MAX(?:MY(?:20)?\d{2}|(?:20)?\d{2}年?款)?$|AE6(?:(?:20)?26年?款|MY(?:20)?26)?$|AE3)/.test(v50().model) ? 1 : 1.01;
    const v119 = (v651, v652) => v652 === "speed" ? v16.WALLPAPER_ZOOM_MAX * v118() * Math.max(1, v16.wallpaperCoverScale(v651.layers.speed.img?.naturalWidth, v651.layers.speed.img?.naturalHeight, v651.box.main.w, v651.box.main.h) / v16.wallpaperCoverScale(v651.layers.speed.img?.naturalWidth, v651.layers.speed.img?.naturalHeight, v651.box.speed.w, v651.box.speed.h)) : v16.WALLPAPER_ZOOM_MAX;
    const v120 = (v653, v654) => v16.wallpaperFitTransform({
      imgW: v653.layers[v654].img?.naturalWidth || 0,
      imgH: v653.layers[v654].img?.naturalHeight || 0,
      boxW: v653.box[v654].w,
      boxH: v653.box[v654].h,
      zoom: v653.layers[v654].zoom,
      maxZoom: v119(v653, v654),
      panX: v653.layers[v654].panX,
      panY: v653.layers[v654].panY
    });
    function v121(v655) {
      if (!v47(v655) || v655.busy || v655.decodeJobs.size || !v655.layers.main.url) {
        return;
      }
      const v656 = v655.layers.main;
      const v657 = v120(v655, "main");
      const v658 = URL.createObjectURL(v656.file);
      v127(v655, "speed", {
        ...v114(),
        file: v656.file,
        img: v656.img,
        url: v658,
        zoom: v657.scale * v118() / v16.wallpaperCoverScale(v657.imgW, v657.imgH, v655.box.speed.w, v655.box.speed.h),
        panX: (v657.panX + (v655.box.main.w - v655.box.speed.w) / 2 - v655.geo.left) * v118(),
        panY: (v657.panY + (v655.box.main.h - v655.box.speed.h) / 2 - v655.geo.top) * v118()
      });
      v126(v655);
      return true;
    }
    function v122(v659) {
      const v660 = (v662, v663) => {
        const v664 = v659.layers[v662];
        const v665 = v664.url ? v659.box[v662] : v659.box.main;
        const v666 = v16.wallpaperLayerStyle(v120(v659, v662));
        const v667 = v664.url ? "<span class=\"wall-thumb-crop\" style=\"left:" + v666.left + ";top:" + v666.top + ";width:" + v666.width + ";height:" + v666.height + "\"><img src=\"" + v14(v664.url) + "\" alt=\"" + v663 + "\" draggable=\"false\"></span>" : "<span class=\"wall-thumb-hint\">" + v13.icon("camera", 22) + "<span>选择图片</span></span>";
        const v668 = v662 === "speed" && v664.url ? v101({
          main: {
            url: v659.layers.main.url,
            fit: v120(v659, "main")
          },
          speed: {
            url: v664.url,
            fit: v120(v659, "speed")
          }
        }, v152(v659)) : "<span class=\"wall-thumb-box\" style=\"aspect-ratio:" + v665.w + "/" + v665.h + "\">" + v667 + (v664.url && v662 === "main" ? v99() : "") + "</span>";
        const v669 = v659.busy || v659.experimental && !v116(v659).includes(v662);
        return "<div><button class=\"wall-thumb-btn\" type=\"button\" data-act=\"pick\" data-area=\"" + v662 + "\"" + (v669 ? " disabled" : "") + ">" + v668 + "<span class=\"wall-thumb-tag\">" + v663 + (v664.url ? " · 调整画面" : " · 选择图片") + "</span></button></div>";
      };
      const v661 = v659.experimental?.handle;
      return (v659.experimental && !v661 ? "<div class=\"note bad wall-exp-editor-warning\">" + v13.icon("alert", 18) + "<div>该操作极为风险 请谨慎操作</div></div><div class=\"card-sub\">仅在本机准备所选范围，不上传云端。</div>" : "") + "<div class=\"wall-editor-grid\">" + v660("main", "整屏") + v660("speed", "速度卡") + "</div>\n      " + v123(v659) + "<input data-act=\"file\" type=\"file\" accept=\"image/*\" hidden>\n      <div class=\"wall-actions-stack wall-editor-actions\"><button class=\"btn block\" type=\"button\" data-act=\"align\"" + (v659.busy || v659.experimental && !v116(v659).includes("speed") || !v659.layers.main.url || v659.decodeJobs.size ? " disabled" : "") + ">速度卡一键对齐整屏</button>\n      " + (v661 ? "" : "<button class=\"btn block primary\" type=\"button\" data-act=\"save\"" + (v659.busy ? " disabled" : "") + ">" + (v659.busy ? "正在处理…" : v659.experimental ? "完成制作，生成本地包" : "保存") + "</button>") + "</div>";
    }
    function v123(v670) {
      const v671 = v670.status;
      return "<div class=\"wall-confirm-copy mt12\" data-editor-status role=\"status\" aria-live=\"polite\"" + (v671 ? "" : " hidden") + ">" + v14(v671) + "</div>";
    }
    function v124(v672) {
      if (!v47(v672)) {
        return;
      }
      if (v672.experimental?.handle) {
        const v673 = v672.experimental.root?.();
        if (v673) {
          v673.innerHTML = v122(v672);
          v128(v673, v672);
        }
        v672.experimental.onChange?.();
        return;
      }
      v13.updateSheet(v672.handle, {
        body: v122(v672),
        onMount: v674 => v128(v674, v672)
      });
    }
    function v125(v675, v676) {
      v675.status = v676;
      if (!v47(v675) || v13.currentSheet() !== v675.handle) {
        return;
      }
      const v677 = v11()?.querySelector("[data-editor-status]");
      if (v677) {
        v677.textContent = v676;
        v677.hidden = !v676;
      }
    }
    function v126(v678) {
      v678.serial++;
      v678.uploadTask = null;
      v125(v678, "");
    }
    function v127(v679, v680, v681) {
      if (v679.layers[v680].url !== v679.previewDraft?.layers[v680].url) {
        v43(v679.layers[v680].url);
      }
      v679.layers[v680] = v681;
    }
    function v128(v682, v683) {
      v682.appendChild(v682.querySelector(".wall-editor-actions"));
      const v684 = v682.querySelector("[data-act=\"file\"]");
      for (const v685 of v682.querySelectorAll("[data-act=\"pick\"]")) {
        v685.addEventListener("click", () => {
          if (v683.busy || !v47(v683)) {
            return;
          }
          const v686 = v685.dataset.area;
          if (!v683.layers[v686]) {
            return;
          }
          if (v683.layers[v686].url) {
            return v136(v683, v686);
          }
          v683.pending = v686;
          v684?.click();
        });
      }
      v129(v684, v683);
      for (const v687 of v682.querySelectorAll("[data-composite-stage]")) {
        const v688 = v687.querySelector("[data-composite-image=\"speed\"]");
        const v689 = v687.querySelector("[data-composite-image=\"speed-back\"]");
        const v690 = () => {
          if (v47(v683) && v687.isConnected !== false && v688.naturalWidth) {
            v689.src = v688.currentSrc || v688.src;
          }
        };
        v688.addEventListener("load", v690);
        if (v688.complete) {
          v690();
        }
      }
      v682.querySelector("[data-act=\"align\"]")?.addEventListener("click", () => {
        if (v13.currentSheet() !== v683.handle) {
          return;
        }
        if (v121(v683)) {
          v124(v683);
        }
      });
      v682.querySelector("[data-act=\"save\"]")?.addEventListener("click", () => v130(v683));
    }
    function v129(v691, v692) {
      v691?.addEventListener("change", async () => {
        const v693 = v691.files?.[0];
        const v694 = v692.pending;
        v691.value = "";
        if (!v693 || v692.busy || !v47(v692)) {
          return;
        }
        if (!/^image\//.test(v693.type || "")) {
          return v13.toast(v11(), "请选择图片文件", 2400);
        }
        const v695 = ++v692.decodeSeq;
        const v696 = v692.previewHandle;
        const v697 = v13.currentSheet() === v696 && v692.editing === v694;
        const v698 = v692.previewDraft;
        const v699 = () => v47(v692) && v695 === v692.decodeSeq && (!v697 || v692.previewDraft === v698);
        v125(v692, "正在读取" + (v694 === "main" ? "整屏" : "速度卡") + "图片…");
        try {
          const {
            img: v700,
            url: v701
          } = await v138(v693, v692.decodeJobs);
          if (!v699()) {
            v43(v701);
            return;
          }
          const v702 = {
            ...v114(),
            file: v693,
            img: v700,
            url: v701
          };
          v127(v692, v694, v702);
          if (!v697 && v692.previewDraft) {
            v43(v692.previewDraft.layers[v694].url);
            v692.previewDraft.layers[v694] = {
              ...v702
            };
            v692.previewDraft.uploadTask = null;
            v692.previewDraft.status = "";
          }
          v126(v692);
          v124(v692);
          if (v697 && v13.currentSheet() === v696 && v692.editing === v694) {
            v135(v692, v694);
          } else if (v13.currentSheet() === v692.handle) {
            v136(v692, v694);
          }
        } catch (v703) {
          if (v699()) {
            v125(v692, "读图失败：" + v703.message);
            v13.toast(v11(), v692.status, 3200);
          }
        }
      });
    }
    function v130(v704) {
      if (!v47(v704) || v704.busy || v17.writeBusy || v13.currentSheet() !== v704.handle) {
        return;
      }
      if (v704.decodeJobs.size) {
        return v13.toast(v11(), "图片正在读取，请稍后再保存", 2400);
      }
      const v705 = v117(v704);
      if (v705) {
        return v13.toast(v11(), v705, 2400);
      }
      if (!v704.scope.vin) {
        return v13.toast(v11(), "还没读到车辆 VIN", 2400);
      }
      const v706 = v704.name || (v704.layers.main.file || v704.layers.speed.file)?.name?.replace(/\.[^.]+$/, "") || "壁纸";
      const v707 = String(v10.state?.profileUid || v704.scope.uid || "").trim();
      const v708 = v707 ? "zeeho.wallmarket.upload:" + v707 : null;
      let v709 = true;
      try {
        if (v708) {
          v709 = localStorage.getItem(v708) !== "false";
        }
      } catch {}
      let v710;
      v710 = v42({
        key: "wall-save-name",
        center: true,
        title: v704.experimental ? "命名本地壁纸" : "保存壁纸",
        body: "<div class=\"field wall-input-field\"><label for=\"we-name\">壁纸名称</label><input id=\"we-name\" maxlength=\"24\" value=\"" + v14(v706.slice(0, 24)) + "\" placeholder=\"例如：夜景\"></div>\n        " + (v704.experimental ? "" : v158(v704) ? "<label class=\"wall-check\"><input type=\"checkbox\" data-act=\"share-market\"" + (v709 ? " checked" : "") + "><span>允许分享到市场</span></label>" : "") + "\n        <button class=\"btn block primary mt12\" type=\"button\" data-act=\"confirm-save\">" + (v704.experimental ? "生成本地包" : "保存") + "</button>",
        onMount: v711 => {
          const v712 = v711.querySelector("[data-act=\"share-market\"]");
          v712?.addEventListener("change", () => {
            if (!v47(v704) || v13.currentSheet() !== v710 || !v708) {
              return;
            }
            try {
              localStorage.setItem(v708, String(v712.checked));
            } catch {}
          });
          v711.querySelector("[data-act=\"confirm-save\"]").addEventListener("click", () => {
            if (!v47(v704) || !v38(v710) || v704.busy) {
              return;
            }
            const v713 = v711.querySelector("#we-name").value.trim().slice(0, 24);
            if (!v713) {
              return v13.toast(v11(), "请输入壁纸名称", 2400);
            }
            if (v713 !== v704.name) {
              v704.name = v713;
              v126(v704);
            }
            v704.shareToMarket = v712?.checked === true;
            v13.closeSheet(v710);
            return v132(v704);
          });
        }
      });
      v704.nameHandle = v710;
    }
    function v131(v714) {
      if (!v47(v714) || !v714.uploadTask?.uploadedId || v13.currentSheet() !== v714.handle) {
        return;
      }
      const v715 = v714.returnTarget;
      for (const v716 of v715.layers) {
        if (v38(v716) && v18.has(v716)) {
          v13.closeSheet(v716);
        }
      }
      if (v38(v715.walls)) {
        v13.closeSheet(v714.handle);
      } else if (!v38(v17.wallsHandle)) {
        v86();
        if (v38(v17.wallsHandle)) {
          v13.closeSheet(v714.handle);
        }
      }
    }
    async function v132(v717) {
      if (!v47(v717) || v717.busy || v17.writeBusy) {
        return;
      }
      const v718 = v51({
        canvas: v717.box.main,
        speedBox: v717.geo
      });
      if (v718) {
        return v13.toast(v11(), v718, 3600);
      }
      if (v717.decodeJobs.size) {
        return v13.toast(v11(), "图片正在读取，请稍后再保存", 2400);
      }
      const v719 = v117(v717);
      if (v719) {
        return v13.toast(v11(), v719, 2400);
      }
      if (!v717.scope.vin) {
        return v13.toast(v11(), "还没读到车辆 VIN", 2400);
      }
      v717.busy = true;
      const v720 = v717.serial;
      const v721 = () => v47(v717) && v717.serial === v720;
      v125(v717, "正在处理" + (v116(v717)[0] === "speed" ? "速度卡" : "整屏") + "图片…");
      v124(v717);
      const v722 = v34(v717.scope, "wallpaper-export");
      v35("壁纸图片导出开始", v722, {
        phase: "start",
        extra: {
          uploadNext: !v717.experimental,
          images: v116(v717).length
        }
      });
      let v723 = false;
      try {
        const v724 = v116(v717);
        const v725 = v724.includes("main") ? await v139(v717, "main") : null;
        if (!v721()) {
          return;
        }
        if (v724.includes("speed")) {
          v125(v717, "正在处理速度卡图片…");
        }
        const v726 = v724.includes("speed") ? await v139(v717, "speed") : null;
        if (!v721()) {
          return;
        }
        if (v724.includes("main") && !v725 || v724.includes("speed") && !v726) {
          throw new Error("所选图片导出失败");
        }
        v723 = true;
        v35("壁纸图片导出完成", v722, {
          phase: "end",
          kind: "ok",
          extra: {
            images: v724.length,
            bytes: (v725?.size || 0) + (v726?.size || 0),
            uploadNext: !v717.experimental
          }
        });
        const v727 = (v717.layers.main.file || v717.layers.speed.file)?.name?.replace(/\.[^.]+$/, "") || "壁纸";
        const v728 = v717.uploadTask || {
          scope: v717.scope,
          mainFile: v725,
          speedFile: v726,
          canvas: v717.box.main,
          speedBox: v717.geo,
          name: (v717.name.trim() || v727).slice(0, 24),
          first: null,
          second: null,
          blocked: "",
          resultText: "",
          inFlight: false
        };
        v717.uploadTask = v728;
        if (v717.experimental) {
          v125(v717, "");
          await v717.experimental.onPrepared({
            mainFile: v725,
            speedFile: v726,
            name: v728.name,
            box: v717.box
          }, v721);
          if (v721() && !v717.experimental.handle) {
            v13.closeSheet(v717.handle);
          }
          return;
        }
        if (v717.shareToMarket === false) {
          v728.marketSnapshot = null;
          v728.marketQueueError = false;
        }
        if (v717.shareToMarket && v158(v717) && !v728.marketUpload && !v728.uploadedId) {
          try {
            const v729 = v146();
            const v730 = v150();
            v728.marketSnapshot = {
              account: v729.uid + "@" + v730,
              data: v154(v717, v728)
            };
          } catch {
            v728.marketQueueError = true;
          }
        }
        if (!v721()) {
          return;
        }
        v125(v717, "正在保存壁纸…");
        await v203(v728, v721);
        if (v721() && v728.uploadedId) {
          v131(v717);
        }
      } catch (v731) {
        v35(v717.experimental ? "壁纸本地准备失败" : v723 ? "壁纸上传失败" : "壁纸图片导出失败", v722, {
          phase: "failed",
          kind: "err"
        });
        v723 = true;
        if (v721()) {
          v13.toast(v11(), (v717.experimental ? "准备" : "保存") + "失败：" + v731.message, 3200);
        }
      } finally {
        if (!v723 && !v721()) {
          v35("壁纸图片导出结果已丢弃", v722, {
            phase: "cancelled",
            kind: "warn"
          });
        }
        v717.busy = false;
        if (v47(v717)) {
          v125(v717, "");
          v124(v717);
        }
      }
    }
    function v133(v732, v733) {
      const v734 = v737 => "<div class=\"wall-layer\" data-act=\"layer" + v737 + "\"><img data-act=\"img" + v737 + "\" alt=\"\" draggable=\"false\"></div>" + (v733 === v737 ? "<div class=\"wall-crop\"><div class=\"wall-layer\" data-act=\"crop" + v737 + "\"><img data-act=\"cropimg" + v737 + "\" alt=\"\" draggable=\"false\"></div></div>" : "");
      const v735 = (v732.experimental ? v116(v732) : ["main", "speed"]).map(v738 => "<button class=\"btn sm" + (v738 === v733 ? " primary" : "") + "\" type=\"button\" data-act=\"tab\" data-area=\"" + v738 + "\" aria-pressed=\"" + (v738 === v733) + "\">" + (v738 === "main" ? "整屏" : "速度卡") + "</button>").join("");
      const v736 = (v739, v740, v741, v742, v743) => "<div class=\"field wall-step\"><label for=\"wall-" + v739 + "-step\">" + v740 + " " + v741 + "</label>\n      <input id=\"wall-" + v739 + "-step\" data-act=\"" + v739 + "-step\" type=\"number\" inputmode=\"decimal\" min=\"0.1\" max=\"" + v743 + "\" step=\"0.1\" value=\"" + v742 + "\" aria-label=\"" + v740 + "步进（" + v741 + "）\">\n      <div class=\"wall-step-actions\"><button class=\"btn\" type=\"button\" data-step-delta=\"1\" aria-label=\"增大" + v740 + "步进\">＋</button><button class=\"btn\" type=\"button\" data-step-delta=\"-1\" aria-label=\"减小" + v740 + "步进\">−</button></div></div>";
      return "<div class=\"wall-actions\" role=\"group\" aria-label=\"选择调整区域\">" + v735 + "</div><div class=\"card-sub\">拖动调整 · 双指缩放</div>\n      <div class=\"wall-framing-workspace\"><div class=\"wall-stage\" data-act=\"stage\" data-editing=\"" + v733 + "\" data-meter-speed=\"" + (v733 === "speed") + "\" style=\"aspect-ratio:" + v732.box.main.w + "/" + v732.box.main.h + "\">\n      <div class=\"wall-area-main" + (v733 === "speed" ? " background" : "") + "\" data-act=\"areamain\">" + v734("main") + "</div>\n      <div class=\"wall-area-speed\" data-act=\"areaspeed\" style=\"left:" + v732.geo.leftPct + "%;top:" + v732.geo.topPct + "%;width:" + v732.geo.widthPct + "%;height:" + v732.geo.heightPct + "%\"" + (v733 === "speed" ? "" : " hidden") + ">" + v734("speed") + "</div>" + v99(v732.geo) + "</div></div>\n      " + (v732.layers[v733].url ? "" : "<div class=\"wall-empty\">选择图片后调整这一层的画面</div>") + "\n      <div class=\"wall-gamepad\">\n        <div class=\"wall-dpad\" role=\"group\" aria-label=\"移动图片\">\n          " + [["up", "↑", "向上"], ["left", "←", "向左"], ["right", "→", "向右"], ["down", "↓", "向下"]].map(([v744, v745, v746]) => "<button class=\"btn wall-pad-key wall-pad-" + v744 + "\" type=\"button\" data-adjust=\"" + v744 + "\" aria-label=\"" + v746 + "\"" + (v732.layers[v733].url ? "" : " disabled") + ">" + v745 + "</button>").join("") + "\n          <span class=\"wall-pad-center\" aria-hidden=\"true\"></span>\n        </div>\n        <button class=\"btn wall-pad-key wall-reset\" type=\"button\" data-act=\"reset-frame\" aria-label=\"恢复初始位置和大小\" title=\"恢复初始位置和大小\"" + (v732.layers[v733].url ? "" : " disabled") + ">" + v13.icon("refresh", 20) + "</button>\n        <div class=\"wall-zoom-controls\" role=\"group\" aria-label=\"缩放图片\">\n          <div class=\"wall-steps\">" + v736("move", "移动", "px", v732.moveStep, 1000) + v736("zoom", "缩放", "%", v732.zoomStep, 100) + "</div>\n          <div class=\"wall-zoom-buttons\"><button class=\"btn wall-pad-key\" type=\"button\" data-adjust=\"in\" aria-label=\"放大\"" + (v732.layers[v733].url ? "" : " disabled") + ">＋</button><button class=\"btn wall-pad-key\" type=\"button\" data-adjust=\"out\" aria-label=\"缩小\"" + (v732.layers[v733].url ? "" : " disabled") + ">−</button></div>\n        </div>\n      </div>\n      <div class=\"wall-actions-stack wall-framing-actions\"><button class=\"btn block\" type=\"button\" data-act=\"replace\" data-area=\"" + v733 + "\">" + (v732.layers[v733].url ? "重新选择图片" : "选择图片") + "</button>\n      " + (v733 === "speed" ? "<button class=\"btn block\" type=\"button\" data-act=\"align\"" + (v732.layers.main.url ? "" : " disabled") + ">速度卡一键对齐整屏" + (v732.layers.main.file && v732.layers.speed.file !== v732.layers.main.file ? " (使用整屏同一张图片)" : "") + "</button>" : "") + "\n      <input data-act=\"file\" type=\"file\" accept=\"image/*\" hidden>\n      <button class=\"btn block primary\" type=\"button\" data-act=\"done\">完成调整，返回新建</button></div>";
    }
    const v134 = v747 => v747 === "speed" ? "调整速度卡" : "调整整屏壁纸";
    function v135(v748, v749) {
      if (!v47(v748) || v748.busy || !v748.layers[v749] || !v38(v748.previewHandle)) {
        return;
      }
      v748.editing = v749;
      v13.updateSheet(v748.previewHandle, {
        title: v134(v749),
        body: v133(v748, v749),
        onMount: v750 => {
          v748.detach?.();
          v137(v750, v748, v749);
        }
      });
    }
    function v136(v751, v752) {
      if (!v47(v751) || v751.busy || !v751.layers[v752]?.url) {
        return;
      }
      if (v38(v751.previewHandle)) {
        return v135(v751, v752);
      }
      const v753 = v751.previewDraft = {
        layers: v751.layers,
        uploadTask: v751.uploadTask,
        status: v751.status,
        confirmed: false
      };
      v751.layers = {
        main: {
          ...v751.layers.main
        },
        speed: {
          ...v751.layers.speed
        }
      };
      v751.editing = v752;
      v751.view = "preview";
      v751.previewHandle = v42({
        key: "wall-framing",
        full: true,
        title: v134(v752),
        sub: "",
        body: v133(v751, v752),
        onMount: v754 => {
          v751.detach?.();
          v137(v754, v751, v752);
        },
        onDismiss: () => {
          v751.detach?.();
          v751.detach = null;
          v751.previewHandle = null;
          v751.view = "list";
          v751.previewDraft = null;
          if (v751.closed) {
            return;
          }
          const v755 = v753.confirmed ? v753.layers : v751.layers;
          if (!v753.confirmed) {
            v751.layers = v753.layers;
            v751.uploadTask = v753.uploadTask;
            v751.status = v753.status;
          }
          for (const v756 of ["main", "speed"]) {
            if (v755[v756].url !== v751.layers[v756].url) {
              v43(v755[v756].url);
            }
          }
          v124(v751);
        }
      });
    }
    function v137(v757, v758, v759) {
      v757.appendChild(v757.querySelector(".wall-framing-actions"));
      const v760 = v757.querySelector("[data-act=\"stage\"]");
      const v761 = v757.querySelector("[data-act=\"" + (v759 === "speed" ? "areaspeed" : "areamain") + "\"]");
      const v762 = () => {
        for (const v780 of ["main", "speed"]) {
          const v781 = v758.layers[v780];
          const v782 = v120(v758, v780);
          const v783 = v16.wallpaperLayerStyle(v782);
          v781.zoom = v782.zoom;
          v781.panX = v782.panX;
          v781.panY = v782.panY;
          const v784 = v757.querySelector("[data-act=\"layer" + v780 + "\"]");
          const v785 = v757.querySelector("[data-act=\"img" + v780 + "\"]");
          if (v784) {
            Object.assign(v784.style, v783);
            v784.hidden = !v781.url;
          }
          if (v785 && v781.url) {
            v785.src = v781.url;
          }
          const v786 = v757.querySelector("[data-act=\"crop" + v780 + "\"]");
          const v787 = v757.querySelector("[data-act=\"cropimg" + v780 + "\"]");
          if (v786) {
            Object.assign(v786.style, v783);
            v786.hidden = !v781.url;
          }
          if (v787 && v781.url) {
            v787.src = v781.url;
          }
        }
      };
      const v763 = () => v47(v758) && !v758.busy && v758.editing === v759 && v13.currentSheet() === v758.previewHandle && v757.isConnected !== false;
      const v764 = new Map();
      let v765 = null;
      let v766 = null;
      const v767 = () => {
        v126(v758);
        v762();
      };
      for (const [v788, v789] of [["move-step", "moveStep"], ["zoom-step", "zoomStep"]]) {
        const v790 = v757.querySelector("[data-act=\"" + v788 + "\"]");
        const v791 = () => {
          if (!v763()) {
            return;
          }
          const v792 = Number(v790.value);
          if (Number.isFinite(v792) && v792 >= Number(v790.getAttribute("min")) && v792 <= Number(v790.getAttribute("max"))) {
            v758[v789] = v792;
          }
          v790.value = String(v758[v789]);
        };
        v790.addEventListener("change", v791);
        v790.closest(".wall-step").querySelectorAll("[data-step-delta]").forEach(v793 => {
          v793.addEventListener("pointerdown", v794 => v794.preventDefault());
          v793.addEventListener("click", () => {
            if (!v763()) {
              return;
            }
            v791();
            v758[v789] = Math.min(Number(v790.getAttribute("max")), Math.max(Number(v790.getAttribute("min")), Math.round((v758[v789] + Number(v793.dataset.stepDelta) * Number(v790.getAttribute("step"))) * 10000000000) / 10000000000));
            v790.value = String(v758[v789]);
            v790.focus();
          });
        });
      }
      const v768 = v795 => {
        if (!v763() || !v758.layers[v759].url) {
          return;
        }
        const v796 = v758.layers[v759];
        if (v795 === "in" || v795 === "out") {
          v796.zoom = v16.clampWallpaperZoom(v796.zoom + (v795 === "in" ? 1 : -1) * v758.zoomStep / 100, v119(v758, v759));
        } else {
          const v797 = v120(v758, v759);
          Object.assign(v796, v16.clampWallpaperPan(v796.panX + (v795 === "right" ? v758.moveStep : v795 === "left" ? -v758.moveStep : 0), v796.panY + (v795 === "down" ? v758.moveStep : v795 === "up" ? -v758.moveStep : 0), v797.maxPanX, v797.maxPanY));
        }
        v767();
      };
      let v769 = null;
      let v770 = null;
      const v771 = () => {
        clearInterval(v769);
        v769 = null;
        v770?.classList.remove("holding");
        v770 = null;
      };
      const v772 = v757.querySelectorAll("[data-adjust]");
      v772.forEach(v798 => {
        v798.addEventListener("pointerdown", v799 => {
          if (v799.button !== 0 || !v763() || !v758.layers[v759].url) {
            return;
          }
          v771();
          v770 = v798;
          v798.classList.add("holding");
          v798.focus();
          try {
            v798.setPointerCapture(v799.pointerId);
          } catch {}
          v768(v798.dataset.adjust);
          let v800 = 0;
          v769 = setInterval(() => {
            if (!v763()) {
              return v771();
            }
            if (++v800 >= 4) {
              v768(v798.dataset.adjust);
            }
          }, 100);
          v799.preventDefault();
        });
        for (const v801 of ["pointerup", "pointercancel", "lostpointercapture", "blur"]) {
          v798.addEventListener(v801, v771);
        }
        v798.addEventListener("click", v802 => {
          if (v802.detail === 0 && !v802.pointerType) {
            v768(v798.dataset.adjust);
          }
        });
      });
      document.addEventListener("visibilitychange", v771);
      const v773 = v803 => {
        if (!v763() || !v758.layers[v759].url) {
          return;
        }
        const v804 = v758.layers[v759];
        v764.set(v803.pointerId, {
          x: v803.clientX,
          y: v803.clientY
        });
        if (v764.size === 1) {
          const v805 = v761?.getBoundingClientRect?.() || {};
          v765 = {
            id: v803.pointerId,
            x: v803.clientX,
            y: v803.clientY,
            panX: v804.panX,
            panY: v804.panY,
            kx: v805.width / v758.box[v759].w || 1,
            ky: v805.height / v758.box[v759].h || 1
          };
          try {
            v760?.setPointerCapture?.(v803.pointerId);
          } catch {}
        }
        if (v764.size === 2) {
          const [v806, v807] = [...v764.values()];
          v766 = {
            dist: Math.max(1, Math.hypot(v806.x - v807.x, v806.y - v807.y)),
            zoom: v804.zoom
          };
          v765 = null;
        }
        v803.preventDefault?.();
      };
      const v774 = v808 => {
        if (!v764.has(v808.pointerId) || !v763()) {
          return;
        }
        v764.set(v808.pointerId, {
          x: v808.clientX,
          y: v808.clientY
        });
        const v809 = v758.layers[v759];
        if (v764.size >= 2 && v766) {
          const [v810, v811] = [...v764.values()];
          v809.zoom = v16.clampWallpaperZoom(v766.zoom * Math.hypot(v810.x - v811.x, v810.y - v811.y) / v766.dist, v119(v758, v759));
          v767();
        } else if (v765?.id === v808.pointerId) {
          const v812 = v120(v758, v759);
          const v813 = v16.clampWallpaperPan(v765.panX + (v808.clientX - v765.x) / v765.kx, v765.panY + (v808.clientY - v765.y) / v765.ky, v812.maxPanX, v812.maxPanY);
          Object.assign(v809, v813);
          v767();
        }
      };
      const v775 = v814 => {
        v764.delete(v814.pointerId);
        if (v765?.id === v814.pointerId) {
          v765 = null;
        }
        if (v764.size < 2) {
          v766 = null;
        }
        try {
          v760?.releasePointerCapture?.(v814.pointerId);
        } catch {}
      };
      const v776 = v815 => {
        if (!v763() || !v758.layers[v759].url) {
          return;
        }
        v815.preventDefault?.();
        v758.layers[v759].zoom = v16.clampWallpaperZoom(v758.layers[v759].zoom * Math.exp(-v815.deltaY * 0.0015), v119(v758, v759));
        v767();
      };
      const v777 = v816 => {
        if (!v763() || !v758.layers[v759].url) {
          return;
        }
        v816.preventDefault?.();
        Object.assign(v758.layers[v759], {
          zoom: 1,
          panX: 0,
          panY: 0
        });
        v767();
      };
      v757.querySelector("[data-act=\"reset-frame\"]").addEventListener("click", v777);
      const v778 = {
        pointerdown: v773,
        pointermove: v774,
        pointerup: v775,
        pointercancel: v775,
        wheel: v776,
        dblclick: v777
      };
      for (const [v817, v818] of Object.entries(v778)) {
        v760?.addEventListener(v817, v818, v817 === "wheel" ? {
          passive: false
        } : undefined);
      }
      const v779 = v757.querySelector("[data-act=\"file\"]");
      v129(v779, v758);
      v757.querySelectorAll("[data-act=\"tab\"]").forEach(v819 => v819.addEventListener("click", () => {
        if (v763()) {
          v135(v758, v819.dataset.area);
        }
      }));
      v757.querySelector("[data-act=\"replace\"]")?.addEventListener("click", () => {
        if (!v763()) {
          return;
        }
        v758.pending = v759;
        v779?.click();
      });
      v757.querySelector("[data-act=\"done\"]")?.addEventListener("click", () => {
        if (v763()) {
          v758.previewDraft.confirmed = true;
          v13.closeSheet(v758.previewHandle);
        }
      });
      v757.querySelector("[data-act=\"align\"]")?.addEventListener("click", () => {
        if (!v763() || !v121(v758)) {
          return;
        }
        const v820 = v757.querySelector("[data-act=\"align\"]");
        if (v820) {
          v820.textContent = "速度卡一键对齐整屏";
        }
        v762();
      });
      v758.detach = () => {
        v771();
        document.removeEventListener("visibilitychange", v771);
        for (const [v821, v822] of Object.entries(v778)) {
          v760?.removeEventListener(v821, v822);
        }
      };
      v762();
    }
    function v138(v823, v824) {
      return new Promise((v825, v826) => {
        const v827 = URL.createObjectURL(v823);
        const v828 = new Image();
        let v829 = false;
        const v830 = v832 => {
          if (v829) {
            return;
          }
          v829 = true;
          v824.delete(v831);
          v828.onload = null;
          v828.onerror = null;
          if (v832) {
            v43(v827);
            v826(v832);
          } else {
            v825({
              img: v828,
              url: v827
            });
          }
        };
        const v831 = () => {
          v830(new Error("图片读取已停止"));
          v828.src = "";
        };
        v824.add(v831);
        v828.onload = () => v830();
        v828.onerror = () => v830(new Error("图片无法读取，请换 jpg/png 试试"));
        v828.src = v827;
      });
    }
    async function v139(v833, v834, v835 = "image/png") {
      const v836 = v833.layers[v834];
      if (!v836.img || !v836.url) {
        return null;
      }
      const v837 = v833.box[v834];
      const v838 = v120(v833, v834);
      const v839 = document.createElement("canvas");
      v839.width = Math.max(1, Math.round(v837.w));
      v839.height = Math.max(1, Math.round(v837.h));
      const v840 = v839.width;
      const v841 = v839.height;
      const v842 = v839.getContext("2d");
      if (!v842) {
        throw new Error("暂时无法导出图片");
      }
      v842.fillStyle = "#000";
      v842.fillRect(0, 0, v840, v841);
      v842.imageSmoothingEnabled = true;
      v842.imageSmoothingQuality = "high";
      v842.drawImage(v836.img, v838.offsetX, v838.offsetY, v838.drawW, v838.drawH);
      try {
        const v843 = await new Promise(v845 => v839.toBlob(v845, v835, 0.92));
        if (!v843) {
          throw new Error("浏览器未能导出图片");
        }
        const v844 = String(v833.name || v836.file?.name || "wallpaper").replace(/\.[^.]+$/, "").slice(0, 24);
        return new File([v843], v844 + "-" + v834 + "-" + v840 + "x" + v841 + "." + (v835 === "image/png" ? "png" : "jpg"), {
          type: v835
        });
      } finally {
        v839.width = 0;
        v839.height = 0;
      }
    }
    let v140 = null;
    let v141 = null;
    let v142 = null;
    const v143 = () => v10.isSharedCar?.() === true;
    const v144 = v846 => new Promise((v847, v848) => {
      const v849 = new FileReader();
      v849.onload = () => v847(typeof v849.result === "string" && v849.result.startsWith("data:image/png;base64,") ? v849.result : "");
      v849.onerror = () => v848(new Error("本机图片读取失败"));
      v849.readAsDataURL(v846);
    });
    const v145 = () => {
      const v850 = new Uint8Array(1);
      do {
        window.crypto.getRandomValues(v850);
      } while (v850[0] >= 250);
      return String(v850[0] % 10 + 1);
    };
    function v146() {
      const v851 = String(v10.state?.profileUid || v10.context()?.uid || "").trim();
      const v852 = String(v15.token || "");
      if (v15.source !== "direct" || !/^\d{1,24}$/.test(v851) || !v852) {
        throw new Error("请先登录并补全极核号，才可使用壁纸市场");
      }
      return {
        uid: v851,
        token: v852
      };
    }
    const v147 = new Intl.NumberFormat("zh-CN", {
      notation: "compact",
      maximumFractionDigits: 1
    });
    const v148 = v853 => v147.format(Math.max(0, Number(v853) || 0));
    const v149 = (v854, v855 = {}, v856 = false, v857 = false) => [["download", v857 ? "直接应用到车机" : "下载并保存方案", v854.downloads, v13.icon("download", 16)], ["favorite", v855.favorited ? "取消收藏" : "收藏", v854.favorites_count, v13.icon("heart", 16)], ["dislike", v855.disliked ? "取消差评" : "差评", v854.dislikes_count, "🖤"]].map(([v858, v859, v860, v861]) => "<button class=\"wall-market-heart" + (v858 === "dislike" ? " wall-market-dislike" : "") + "\" type=\"button\" data-market-action=\"" + v858 + "\" aria-label=\"" + v859 + " " + (Number(v860) || 0) + "\" title=\"" + v859 + " · " + (Number(v860) || 0) + "\"" + (v858 === "download" ? "" : " aria-pressed=\"" + !!v855[v858 === "favorite" ? "favorited" : "disliked"] + "\"" + (v856 ? "" : " disabled")) + ">" + v861 + "<span>" + v148(v860) + "</span></button>").join("");
    const v150 = () => window.WALLMARKET.resolveBase(window.Store);
    async function v151(v862, v863 = {}) {
      if (v27()) {
        throw new Error(window.PLATFORM.message("壁纸市场网络"));
      }
      const v864 = v146();
      const v865 = v150();
      if (!v140 || v140.uid !== v864.uid || v140.token !== v864.token || v140.base !== v865) {
        v171(v140);
        v140 = {
          ...v864,
          base: v865,
          entries: new Map(),
          views: new Map(),
          favorites: new Map(),
          favoriteJobs: new Map(),
          images: new Map(),
          imageBytes: 0,
          withdrawn: new Set(),
          comments: new Map(),
          commentListeners: new Set(),
          admin: false
        };
      }
      const v866 = v140;
      const v867 = v866.entries;
      const v868 = v34(v36(), "market");
      const v869 = Date.now();
      const v870 = {
        method: v863.method || "GET",
        host: new URL(v865).host,
        path: v862.split("?")[0]
      };
      const v871 = (!v863.method || v863.method === "GET") && /^\/(?:me\/favorites|wallpapers(?:\/[a-f0-9]{64}(?:\/favorite)?)?)(?:\?|$)/.test(v862);
      const v872 = v867.get(v862);
      if (v871 && v863.cache !== "reload" && !v863.signal?.aborted && v872?.expiresAt > Date.now()) {
        v35("壁纸市场命中列表缓存", v868, {
          category: "network",
          phase: "cache",
          extra: v870
        });
        return new Response(v872.body, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      const v873 = new AbortController();
      const v874 = v873.signal;
      const v875 = () => v873.abort();
      let v876 = false;
      let v877 = "session";
      const v878 = setTimeout(() => {
        v876 = true;
        v875();
      }, 60000);
      v863.signal?.addEventListener("abort", v875, {
        once: true
      });
      if (v863.signal?.aborted) {
        v875();
      }
      try {
        const v879 = (v885, v886) => window.WALLMARKET.fetch(v865 + v885, {
          ...v886,
          credentials: "omit",
          referrerPolicy: "no-referrer",
          signal: v874
        });
        const v880 = () => {
          const v887 = v146();
          return v887.uid === v864.uid && v887.token === v864.token && v865 === v150();
        };
        const v881 = await window.WALLMARKET.session(v865, v864.token, v874);
        if (!v880()) {
          throw new Error("账号已切换，请重新打开壁纸市场");
        }
        v866.admin = v881.admin;
        const v882 = new Headers(v863.headers);
        v882.set("X-Market-Token", v881.token);
        const v883 = v871 && v863.cache === "reload" ? v862 + (v862.includes("?") ? "&" : "?") + "refresh=1" : v862;
        v877 = "request";
        const v884 = await v879(v883, {
          ...v863,
          headers: v882
        });
        v877 = "body";
        if (!v880()) {
          throw new Error("账号已切换，请重新打开壁纸市场");
        }
        if (!v884.ok) {
          if (v884.status === 401) {
            window.WALLMARKET.forgetSession(v865, v864.token);
          }
          const v888 = await v884.json().catch(() => ({}));
          throw Object.assign(new Error(v888.error || "壁纸市场请求失败，请稍后再试"), {
            status: v884.status
          });
        }
        if (v871) {
          const v889 = await v884.clone().text();
          if (v880() && v140 === v866 && v866.entries === v867) {
            if (v867.size >= 64) {
              v867.delete(v867.keys().next().value);
            }
            v867.set(v862, {
              body: v889,
              expiresAt: Date.now() + 60000
            });
          }
        } else if (v140 === v866 && (v863.method && v863.method !== "GET" || /[?&]download=1(?:&|$)/.test(v862))) {
          v866.entries = new Map();
        }
        v35("壁纸市场请求返回", v868, {
          category: "network",
          phase: "end",
          kind: "ok",
          extra: {
            ...v870,
            status: v884.status,
            durationMs: Date.now() - v869
          }
        });
        return v884;
      } catch (v890) {
        v35("壁纸市场请求失败", v868, {
          category: "network",
          phase: "failed",
          kind: v874.aborted ? "warn" : "err",
          extra: {
            ...v870,
            stage: v877,
            status: v890.status || 0,
            durationMs: Date.now() - v869,
            timedOut: v876,
            aborted: v874.aborted,
            error: v890.name || "Error"
          }
        });
        throw v890;
      } finally {
        clearTimeout(v878);
        v863.signal?.removeEventListener("abort", v875);
      }
    }
    function v152(v891) {
      const v892 = v87(v891.box.main, v891.layers.speed.url ? v891.box.speed : null);
      if (v892.speed) {
        v892.speed = {
          ...v892.speed,
          ...v891.geo
        };
      }
      return v892;
    }
    const v153 = (v893, v894 = "image/jpeg", v895 = 0.92) => new Promise((v896, v897) => v893.toBlob(v898 => v898 ? v896(v898) : v897(new Error("图片导出失败")), v894, v895));
    function v154(v899, v900) {
      const v901 = ["main", "speed"].filter(v904 => v899.layers[v904].url).map(v905 => {
        const v906 = v899.box[v905];
        return {
          key: v905,
          width: v906.w,
          height: v906.h,
          zoom: 1,
          panX: 0,
          panY: 0,
          source: v905
        };
      });
      const v902 = window.WALLMARKET.validate({
        v: 3,
        compatibleModels: window.WALLMARKET.compatibleModels(),
        name: v900.name,
        canvas: v899.box.main,
        speedBox: v899.geo,
        layers: v901,
        order: v901.map(v907 => v907.key)
      });
      let v903 = String(v10.state.data?.user?.avatar || "").trim();
      try {
        const v908 = new URL(v903);
        if (!["http:", "https:"].includes(v908.protocol) || v908.username || v908.password || v903.length > 2048 || /[\u0000-\u0020\u007f]/.test(v903)) {
          v903 = "";
        }
      } catch {
        v903 = "";
      }
      return {
        manifest: v902,
        authorName: String(v10.state.data?.user?.nick || "").trim().slice(0, 80),
        authorAvatar: v903,
        sources: {
          main: v900.mainFile,
          ...(v900.speedFile ? {
            speed: v900.speedFile
          } : {})
        }
      };
    }
    async function v155(v909) {
      const v910 = window.WALLMARKET;
      const v911 = v910.validate({
        ...v909.manifest,
        v: 3,
        layers: v909.manifest.layers.map(v916 => ({
          ...v916,
          source: v916.source || (v916.key === "speed" && v909.sources.speed === v909.sources.main ? "main" : v916.key)
        }))
      });
      const v912 = {};
      const v913 = new Set();
      const v914 = v910.validate({
        ...v911,
        previews: "webp",
        layers: v911.layers.map(v917 => {
          const v918 = v917.key === "main" ? v911.canvas : v911.speedBox;
          return {
            key: v917.key,
            source: v917.key,
            width: v918.w,
            height: v918.h,
            zoom: 1,
            panX: 0,
            panY: 0
          };
        })
      });
      for (const v919 of v911.layers) {
        v912[v910.sourceFile(v914, v919.key)] = await v174({
          manifest: v911,
          key: v919.key
        }, async v920 => v909.sources[v920], v913);
      }
      for (const v921 of ["thumbnail", ...v914.order]) {
        const v922 = await v174({
          manifest: v914,
          key: v921,
          preview: true
        }, v923 => v912[v910.sourceFile(v914, v923)], v913);
        if (v922.type !== "image/webp") {
          throw new Error("当前浏览器无法生成 WebP 预览，请更新浏览器");
        }
        v912[v921 === "thumbnail" ? "thumb.webp" : v921 + "-preview.webp"] = v922;
      }
      const v915 = Object.values(v912).map(v924 => v924?.size || 0);
      if (v915.some(v925 => !v925 || v925 > v910.MAX_FILE) || v915.reduce((v926, v927) => v926 + v927, 0) > v910.MAX_BODY - 65536) {
        throw new Error("裁剪后每张图片限 4MB，整套壁纸限 16MB，请降低导出尺寸");
      }
      return {
        manifest: v914,
        files: v912,
        authorName: v909.authorName || "",
        authorAvatar: v909.authorAvatar || "",
        cropped: true
      };
    }
    let v156;
    async function v157() {
      if (window.turnstile) {
        return window.turnstile;
      }
      if (!v156) {
        v156 = new Promise((v928, v929) => {
          const v930 = document.createElement("script");
          v930.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          const v931 = setTimeout(() => v930.onerror(), 15000);
          v930.onload = () => {
            clearTimeout(v931);
            v928(window.turnstile);
          };
          v930.onerror = () => {
            clearTimeout(v931);
            v930.remove();
            v156 = null;
            v929(new Error("人机验证加载失败，请重新打开"));
          };
          document.head.appendChild(v930);
        });
      }
      return v156;
    }
    function v158(v932) {
      if (v932.marketShared || v932.experimental) {
        return false;
      }
      try {
        v146();
        v150();
        return true;
      } catch {
        return false;
      }
    }
    const v159 = v933 => new Date(v933 + 28800000).toISOString().slice(0, 10);
    let v160;
    let v161 = null;
    async function v162(v934, v935) {
      if (!v160) {
        v160 = new Promise((v937, v938) => {
          if (!window.indexedDB) {
            v938(new Error("无法保存后台上传任务"));
            return;
          }
          const v939 = window.indexedDB.open("zeeho-wallmarket-uploads", 1);
          v939.onupgradeneeded = () => v939.result.createObjectStore("uploads", {
            keyPath: "id"
          }).createIndex("account", "account");
          v939.onsuccess = () => {
            const v940 = v939.result;
            v940.onversionchange = () => {
              v940.close();
              v160 = null;
            };
            v937(v940);
          };
          v939.onerror = () => v938(v939.error);
          v939.onblocked = () => v938(new Error("后台上传记录被其他页面占用"));
        }).catch(v941 => {
          v160 = null;
          throw v941;
        });
      }
      const v936 = await v160;
      return new Promise((v942, v943) => {
        const v944 = v936.transaction("uploads", v934);
        const v945 = v935(v944.objectStore("uploads"));
        v944.oncomplete = () => v942(v945.result);
        v944.onabort = v944.onerror = () => v943(v944.error || new Error("后台上传记录保存失败"));
      });
    }
    async function v163(v946) {
      if (!v946.uploadedId) {
        return;
      }
      let v947 = v946.marketUpload;
      if (!v947) {
        const v948 = v946.marketSnapshot;
        if (!v948) {
          return;
        }
        v946.marketSnapshot = null;
        const v949 = () => crypto.randomUUID?.() ?? "u-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
        v947 = {
          id: v949(),
          account: v948.account,
          state: "pending",
          createdAt: Date.now(),
          officialId: v946.uploadedId,
          snapshot: v948.data,
          vin: String(v946.scope?.vin || "")
        };
        v946.marketUpload = v947;
      }
      v947.officialId = v946.uploadedId;
      v947.state = "pending";
      v947.auditSubmittedAt ||= Date.now();
      try {
        await v162("readwrite", v950 => v950.put(v947));
        v170();
      } catch {
        v946.marketQueueError = true;
      }
    }
    async function v164(v951) {
      const v952 = String(v951 || "");
      if (!v952) {
        return;
      }
      if (v161?.officialId === v952) {
        v161.resume = false;
        v161.controller.abort();
      }
      try {
        await v162("readwrite", v953 => {
          const v954 = v953.openCursor();
          v954.onsuccess = () => {
            const v955 = v954.result;
            if (!v955) {
              return;
            }
            if (String(v955.value.officialId) === v952) {
              v955.delete();
            }
            v955.continue();
          };
          return v954;
        });
      } catch {}
    }
    function v165(v956 = "") {
      const v957 = String(v956 || "").trim();
      if (v957 && v17.scope?.vin !== v957) {
        return null;
      }
      const v958 = v17.scope;
      if (v958 && v958.vin && v37(v958)) {
        return v958;
      } else {
        return null;
      }
    }
    async function v166(v959, v960) {
      if (!v959) {
        return "unknown";
      }
      const v961 = String(v960 || "");
      if (!v961) {
        return "unknown";
      }
      const v962 = "50";
      for (let v963 = 1; v963 <= 20; v963++) {
        const v964 = await v41("wallpaper_page", v959, {
          ctx: {
            pageNum: String(v963),
            pageSize: v962
          }
        }, () => true, null);
        if (!v964?.ok) {
          return "unknown";
        }
        const v965 = v16.normalizeWallpaperPage({
          data: v964.data
        });
        const v966 = (v965.list || []).find(v967 => String(v967.id) === v961);
        if (v966) {
          if (v966.audit === "approved") {
            return "approved";
          } else if (v966.audit === "rejected") {
            return "rejected";
          } else {
            return "pending";
          }
        }
        if (!v965.hasMore) {
          break;
        }
      }
      return "unknown";
    }
    async function v167(v968, v969, v970) {
      if (!v969()) {
        return;
      }
      const v971 = "/me/wallpapers/" + encodeURIComponent(v968.officialId) + (v968.marketId ? "?market_id=" + encodeURIComponent(v968.marketId) : "");
      const v972 = await (await v151(v971, {
        method: "DELETE",
        signal: v970
      })).json();
      if (!v969()) {
        return;
      }
      if (v972.withdrawn && v972.id) {
        v140.withdrawn.add(v972.id);
        v142?.();
      }
      await v162("readwrite", v973 => {
        const v974 = v973.index("account").openCursor(v968.account);
        v974.onsuccess = () => {
          const v975 = v974.result;
          if (!v975) {
            return;
          }
          if (String(v975.value.officialId) === v968.officialId && (v972.canceled || v975.value.id === v968.id)) {
            v975.delete();
          }
          v975.continue();
        };
        return v974;
      });
    }
    async function v168(v976) {
      let v977;
      let v978;
      try {
        v977 = v146();
        v978 = v977.uid + "@" + v150();
      } catch {
        return "noauth";
      }
      v976 = String(v976);
      let v979;
      try {
        const v982 = await v162("readonly", v983 => v983.index("account").getAll(v978));
        v979 = v982.find(v984 => !v984.withdraw && String(v984.officialId) === v976);
        if (v979 && v159(v979.createdAt) !== v159(Date.now())) {
          return "expired";
        }
      } catch {}
      const v980 = () => {
        try {
          const v985 = v146();
          return v985.token === v977.token && v985.uid + "@" + v150() === v978;
        } catch {
          return false;
        }
      };
      const v981 = {
        id: "withdraw:" + v978 + ":" + v976,
        account: v978,
        officialId: v976,
        marketId: v979?.marketId,
        withdraw: true,
        createdAt: Date.now()
      };
      try {
        await v162("readwrite", v986 => v986.put(v981));
      } catch {
        await v167(v981, v980);
        return "queued";
      }
      if (!v980()) {
        return "queued";
      }
      if (v161?.account === v978 && v161.officialId === v976) {
        v161.resume = true;
        v161.controller.abort();
      }
      v167(v981, v980).catch(() => {}).finally(() => {
        v170();
      });
      return "queued";
    }
    async function v169(v987, v988) {
      if (v987.localTest) {
        return "";
      }
      if (!v987.siteKey) {
        throw new Error("投稿功能尚未开放");
      }
      const v989 = await v157();
      if (v988.aborted) {
        throw new Error("账号已切换");
      }
      const v990 = document.createElement("div");
      v990.className = "wall-market-challenge";
      v990.innerHTML = "<div class=\"card-sub\">完成验证后将继续后台上传壁纸</div><div data-market-challenge></div>";
      v11().appendChild(v990);
      let v991;
      let v992;
      let v993;
      try {
        return await new Promise((v994, v995) => {
          const v996 = () => v995(new Error("市场验证未完成，下次打开时重试"));
          v993 = v996;
          v988.addEventListener("abort", v993, {
            once: true
          });
          v992 = setTimeout(v996, 90000);
          v991 = v989.render(v990.querySelector("[data-market-challenge]"), {
            sitekey: v987.siteKey,
            action: "publish",
            appearance: "interaction-only",
            callback: v994,
            "before-interactive-callback": () => v990.classList.add("interactive"),
            "error-callback": v996,
            "expired-callback": v996,
            "timeout-callback": v996
          });
        });
      } finally {
        clearTimeout(v992);
        v988.removeEventListener("abort", v993);
        if (v991 != null) {
          v989.remove(v991);
        }
        v990.remove();
      }
    }
    async function v170() {
      if (v27()) {
        return false;
      }
      if (!v28()) {
        return;
      }
      let v997;
      let v998;
      try {
        v997 = v146();
        v998 = v997.uid + "@" + v150();
      } catch {
        return;
      }
      if (v161) {
        if (v161.account !== v998 || v161.controller.signal.aborted) {
          v161.resume = true;
        }
        return;
      }
      const v999 = v161 = {
        account: v998,
        controller: new AbortController()
      };
      const v1000 = v999.controller.signal;
      const v1001 = () => {
        try {
          const v1003 = v146();
          return !v1000.aborted && v1003.uid + "@" + v150() === v998 && v1003.token === v997.token;
        } catch {
          return false;
        }
      };
      const v1002 = async () => {
        const v1004 = new Set();
        while (v1001()) {
          const v1005 = await v162("readonly", v1008 => v1008.index("account").getAll(v998));
          if (!v1001()) {
            return;
          }
          const v1006 = v1005.find(v1009 => !v1009.withdraw && (v1009.state === "prepared" || !v1009.officialId) && !v1004.has(v1009.id));
          if (v1006) {
            v1004.add(v1006.id);
            try {
              await v162("readwrite", v1010 => v1010.delete(v1006.id));
            } catch {}
            continue;
          }
          const v1007 = v1005.find(v1011 => v1011.withdraw && !v1004.has(v1011.id)) || v1005.find(v1012 => v1012.officialId && v1012.state !== "done" && !v1004.has(v1012.id));
          if (!v1007) {
            return;
          }
          v1004.add(v1007.id);
          v999.officialId = String(v1007.officialId);
          if (v1007.withdraw) {
            try {
              await v167(v1007, v1001, v1000);
            } catch {}
            continue;
          }
          v1007.state = "uploading";
          try {
            const v1013 = v165(v1007.vin);
            const v1014 = await v166(v1013, v1007.officialId);
            if (!v1001()) {
              return;
            }
            if (v1014 === "rejected") {
              await v162("readwrite", v1019 => v1019.delete(v1007.id));
              try {
                if (v1013) {
                  await v63(v1013, {
                    id: v1007.officialId,
                    name: "壁纸"
                  }, null);
                }
              } catch {}
              continue;
            }
            if (v1014 !== "approved") {
              v1007.state = "pending";
              v1007.auditWaitFrom ||= v1007.auditSubmittedAt || v1007.createdAt || Date.now();
              if (!v1001()) {
                return;
              }
              await v162("readwrite", v1020 => v1020.put(v1007));
              if (Date.now() - v1007.auditWaitFrom > 60000) {
                v1007.state = "failed";
                v1007.error = "官方审核结论未取到，稍后刷新重试";
                await v162("readwrite", v1021 => v1021.put(v1007));
              }
              continue;
            }
            if (v1007.bundle && !v1007.bundle.cropped) {
              const {
                manifest: v1022,
                files: v1023,
                authorName: v1024,
                authorAvatar: v1025
              } = v1007.bundle;
              v1007.snapshot = {
                manifest: v1022,
                authorName: v1024,
                authorAvatar: v1025,
                sources: Object.fromEntries(v1022.layers.map(v1026 => [v1026.key, v1023[window.WALLMARKET.sourceFile(v1022, v1026.source || v1026.key)]]))
              };
              delete v1007.bundle;
            }
            if (!v1007.bundle) {
              v1007.bundle = await v155(v1007.snapshot);
              if (!v1001()) {
                return;
              }
              delete v1007.snapshot;
              v1007.state = "pending";
              await v162("readwrite", v1027 => v1027.put(v1007));
            }
            if (!v1001()) {
              return;
            }
            const v1015 = await window.WALLMARKET.config(v150(), v146().uid, window.Store, v1000);
            if (!v1001()) {
              return;
            }
            const v1016 = await v169(v1015, v1000);
            if (!v1001()) {
              return;
            }
            const v1017 = new FormData();
            v1017.append("manifest", JSON.stringify(v1007.bundle.manifest));
            v1017.append("challenge", v1016);
            v1017.append("author_name", v1007.bundle.authorName || "");
            if (v1007.bundle.authorAvatar) {
              v1017.append("author_avatar", v1007.bundle.authorAvatar);
            }
            v1017.append("official_id", String(v1007.officialId));
            v1017.append("created_day", v159(v1007.createdAt));
            for (const [v1028, v1029] of Object.entries(v1007.bundle.files)) {
              v1017.append(v1028, v1029, v1028);
            }
            const v1018 = await (await v151("/wallpapers", {
              method: "POST",
              body: v1017,
              signal: v1000
            })).json();
            if (!v1001()) {
              return;
            }
            if (v1018.canceled) {
              await v162("readwrite", v1030 => v1030.delete(v1007.id));
              continue;
            }
            v1007.state = "done";
            v1007.marketId = v1018.id;
            delete v1007.bundle;
            delete v1007.error;
          } catch (v1031) {
            v1007.state = "failed";
            v1007.error = v1031.message;
          }
          if (!v1001()) {
            return;
          }
          await v162("readwrite", v1032 => v1032.put(v1007));
        }
      };
      try {
        if (window.navigator?.locks) {
          await window.navigator.locks.request("wallmarket:" + v998, {
            ifAvailable: true
          }, v1033 => v1033 && v1002());
        } else {
          await v1002();
        }
      } catch {} finally {
        if (v161 === v999) {
          v161 = null;
        }
        if (v999.resume) {
          v170();
        }
      }
    }
    function v171(v1034) {
      v67?.disconnect();
      v67 = null;
      v68.clear();
      for (const v1035 of v1034?.images?.values() || []) {
        v1035.controller.abort();
        v43(v1035.url);
      }
      v1034?.images?.clear();
    }
    function v172(v1036) {
      try {
        const v1037 = new URL(v1036);
        const v1038 = new URL(v150());
        if (v1037.origin === v1038.origin && /^\/wallpapers\/[a-f0-9]{64}\/(?:(?:thumb|main|speed|composite)\.jpg|(?:main|speed)-source\.(?:jpg|png)|(?:thumb|main-preview|speed-preview)\.webp)$/.test(v1037.pathname)) {
          return v1037.pathname + (/^[a-f0-9]{64}$/.test(v1037.searchParams.get("v") || "") ? "?v=" + v1037.searchParams.get("v") : "");
        } else {
          return null;
        }
      } catch {
        return null;
      }
    }
    function v173(v1039, v1040, v1041, v1042) {
      const v1043 = v1041.layers.find(v1046 => v1046.key === v1042);
      const v1044 = v1042 === "main" ? v1041.canvas : v1041.speedBox;
      if (v1040.naturalWidth !== v1043.width || v1040.naturalHeight !== v1043.height) {
        throw new Error("方案原图尺寸不一致");
      }
      const v1045 = v16.wallpaperFitTransform({
        imgW: v1043.width,
        imgH: v1043.height,
        boxW: v1044.w,
        boxH: v1044.h,
        zoom: v1043.zoom,
        maxZoom: 128,
        panX: v1043.panX,
        panY: v1043.panY
      });
      v1039.fillStyle = "#000";
      v1039.fillRect(0, 0, v1044.w, v1044.h);
      v1039.drawImage(v1040, v1045.offsetX, v1045.offsetY, v1045.drawW, v1045.drawH);
    }
    async function v174(v1047, v1048, v1049) {
      const v1050 = window.WALLMARKET.validate(v1047.manifest);
      const v1051 = v1047.key === "thumbnail";
      const v1052 = v1051 || v1047.key === "composite";
      const v1053 = v1052 || v1047.key === "main" ? v1050.canvas : v1050.speedBox;
      const v1054 = document.createElement("canvas");
      const v1055 = v1051 || v1047.preview ? Math.min(320 / v1053.w, 320 / v1053.h, 1) : 1;
      v1054.width = Math.max(1, Math.round(v1053.w * v1055));
      v1054.height = Math.max(1, Math.round(v1053.h * v1055));
      const v1056 = new Map();
      try {
        const v1057 = v1054.getContext("2d");
        if (!v1057) {
          throw new Error("暂时无法导出图片");
        }
        v1057.scale(v1054.width / v1053.w, v1054.height / v1053.h);
        v1057.imageSmoothingEnabled = true;
        v1057.imageSmoothingQuality = "high";
        for (const v1058 of v1052 ? v1050.order : [v1047.key]) {
          const v1059 = v1050.layers.find(v1062 => v1062.key === v1058);
          const v1060 = v1059.source;
          if (!v1056.has(v1060)) {
            v1056.set(v1060, await v138(await v1048(v1060), v1049));
          }
          const v1061 = v1052 && v1058 === "speed" ? v1050.speedBox : {
            ...v1053,
            left: 0,
            top: 0
          };
          v1057.save();
          v1057.translate(v1061.left, v1061.top);
          v1057.beginPath();
          v1057.rect(0, 0, v1061.w, v1061.h);
          v1057.clip();
          v173(v1057, v1056.get(v1060).img, v1050, v1058);
          v1057.restore();
        }
        return await v153(v1054, v1051 || v1047.preview ? "image/webp" : "image/png", v1051 || v1047.preview ? 0.78 : 0.92);
      } finally {
        for (const v1063 of v1056.values()) {
          v43(v1063.url);
        }
        v1054.width = 0;
        v1054.height = 0;
      }
    }
    let v175;
    async function v176(v1064, v1065 = null) {
      try {
        if (!window.indexedDB) {
          return null;
        }
        v175 ||= new Promise(v1067 => {
          const v1068 = window.indexedDB.open("zeeho-wallmarket-images", 1);
          v1068.onupgradeneeded = () => v1068.result.createObjectStore("images", {
            keyPath: "key"
          });
          v1068.onerror = v1068.onblocked = () => v1067(null);
          v1068.onsuccess = () => {
            v1068.result.onversionchange = () => {
              v1068.result.close();
              v175 = null;
            };
            v1067(v1068.result);
          };
        });
        const v1066 = await v175;
        if (!v1066) {
          return null;
        }
        return await new Promise((v1069, v1070) => {
          const v1071 = v1066.transaction("images", "readwrite");
          const v1072 = v1071.objectStore("images");
          let v1073 = null;
          v1071.oncomplete = () => v1069(v1073);
          v1071.onerror = v1071.onabort = () => v1070(v1071.error || new Error("图片缓存不可用"));
          if (!v1065) {
            const v1074 = v1072.get(v1064);
            v1074.onsuccess = () => {
              if (v1074.result) {
                v1073 = v1074.result.blob;
                v1072.put({
                  ...v1074.result,
                  usedAt: Date.now()
                });
              }
            };
          } else {
            v1072.put({
              key: v1064,
              blob: v1065,
              size: v1065.size,
              usedAt: Date.now()
            });
            const v1075 = v1072.getAll();
            v1075.onsuccess = () => {
              const v1076 = v1075.result.sort((v1079, v1080) => v1079.usedAt - v1080.usedAt);
              let v1077 = v1076.reduce((v1081, v1082) => v1081 + v1082.size, 0);
              let v1078 = v1076.length;
              for (const v1083 of v1076) {
                if (v1078 <= 512 && v1077 <= 67108864) {
                  break;
                }
                v1072.delete(v1083.key);
                v1077 -= v1083.size;
                v1078--;
              }
            };
          }
        });
      } catch {
        return null;
      }
    }
    function v177(v1084, v1085 = null, v1086 = false) {
      const v1087 = new AbortController();
      const v1088 = async v1094 => {
        const v1095 = v172(v1094);
        const v1096 = v34(v36(), "market-image");
        const v1097 = Date.now();
        let v1098 = false;
        let v1099 = false;
        try {
          const v1101 = v1095 && new URL(v1094).searchParams.get("ticket");
          const v1102 = v1101 && JSON.parse(atob(v1101.split(".")[0].replace(/-/g, "+").replace(/_/g, "/")));
          v1099 = v1102?.purpose === "asset" && Number.isSafeInteger(v1102.exp) && v1102.exp * 1000 > Date.now() + 30000;
        } catch {}
        const v1100 = setTimeout(() => {
          v1098 = true;
          v1087.abort();
        }, 60000);
        try {
          let v1103 = v1095 && !v1099 ? await v151(v1095, {
            signal: v1087.signal
          }) : await window.WALLMARKET.fetch(v1094, {
            signal: v1087.signal,
            credentials: "omit",
            referrerPolicy: "no-referrer"
          });
          if (v1099 && v1103.status === 401) {
            await v1103.body?.cancel();
            v1103 = await v151(v1095, {
              signal: v1087.signal
            });
          }
          if (!v1103.ok) {
            throw new Error("壁纸图片读取失败");
          }
          const v1104 = await v1103.blob();
          if (!v1104.type.startsWith("image/") || v1104.size > window.WALLMARKET.MAX_FILE) {
            throw new Error("壁纸图片格式无效");
          }
          return v1104;
        } catch (v1105) {
          v35("壁纸市场图片读取失败", v1096, {
            category: "network",
            phase: "failed",
            kind: v1087.signal.aborted ? "warn" : "err",
            extra: {
              path: new URL(v1094).pathname,
              durationMs: Date.now() - v1097,
              timedOut: v1098,
              aborted: v1087.signal.aborted,
              error: v1105.name || "Error"
            }
          });
          throw v1105;
        } finally {
          clearTimeout(v1100);
        }
      };
      const v1089 = v140;
      const v1090 = v172(v1084);
      const v1091 = v1090 && v1090 + (v1085 ? "/" + v1085.key : "");
      if (!v1091 || !v1089) {
        if (v1086) {
          return v1088(v1084);
        } else {
          return Promise.resolve(v1084);
        }
      }
      const v1092 = v1089.images.get(v1091);
      if (v1092) {
        v1089.images.delete(v1091);
        v1089.images.set(v1091, v1092);
        if (v1086) {
          return v1092.promise.then(() => v1092.blob);
        } else {
          return v1092.promise;
        }
      }
      const v1093 = {
        controller: v1087,
        url: "",
        size: 0
      };
      v1089.images.set(v1091, v1093);
      v1093.promise = (async () => {
        const v1106 = new Set();
        v1093.controller.signal.addEventListener("abort", () => {
          for (const v1112 of v1106) {
            v1112();
          }
        }, {
          once: true
        });
        const v1107 = () => {
          if (v140 !== v1089 || v1087.signal.aborted) {
            throw new Error("账号已切换");
          }
          if (v1085 && v1085.key !== "preview") {
            return v174(v1085, v1113 => v177(v1113 === "main" ? v1085.images.main : v1085.images.speed, null, true), v1106);
          } else {
            return v1088(v1084);
          }
        };
        const v1108 = /[?]v=[a-f0-9]{64}/.test(v1090) ? JSON.stringify([v1089.uid, v1089.base, v1091]) : null;
        const v1109 = v1108 ? await v176(v1108) : null;
        if (v140 !== v1089 || v1087.signal.aborted) {
          throw new Error("账号已切换");
        }
        let v1110;
        if (v1109) {
          v1110 = Promise.resolve(v1109);
        } else if (v1085?.key === "thumbnail" || /\.webp(?:[?]|$)/.test(v1090)) {
          const v1114 = /\.webp(?:[?]|$)/.test(v1090);
          const v1115 = v1114 ? "webpJobs" : "thumbnailJobs";
          v1089[v1115] ||= Array.from({
            length: v1114 ? 4 : 2
          }, () => Promise.resolve());
          v1110 = v1089[v1115].shift().then(v1107);
          v1089[v1115].push(v1110.catch(() => {}));
        } else {
          v1110 = v1107();
        }
        const v1111 = await v1110;
        if (v140 !== v1089 || v1093.controller.signal.aborted) {
          throw new Error("账号已切换");
        }
        if (!v1109 && v1108) {
          await v176(v1108, v1111);
        }
        if (v140 !== v1089 || v1093.controller.signal.aborted) {
          throw new Error("账号已切换");
        }
        v1093.blob = v1111;
        v1093.url = URL.createObjectURL(v1111);
        v1093.size = v1111.size;
        v1089.imageBytes += v1111.size;
        for (const [v1116, v1117] of v1089.images) {
          if (v1089.images.size <= 64 && v1089.imageBytes <= 8388608) {
            break;
          }
          if (v1117 === v1093 || !v1117.url) {
            continue;
          }
          v1117.controller.abort();
          v43(v1117.url);
          v1089.imageBytes -= v1117.size;
          v1089.images.delete(v1116);
        }
        return v1093.url;
      })().catch(v1118 => {
        if (v1089.images.get(v1091) === v1093) {
          v1089.images.delete(v1091);
        }
        throw v1118;
      });
      if (v1086) {
        return v1093.promise.then(() => v1093.blob);
      } else {
        return v1093.promise;
      }
    }
    function v178(v1119, v1120 = null) {
      const v1121 = v172(v1119);
      const v1122 = v1121 && v140?.images.get(v1121 + (v1120 ? "/" + v1120.key : ""))?.url;
      return v1122 || (v1121 ? "" : v1119);
    }
    function v179() {
      let v1123 = window.Store?.get("zeeho.wallmarket.filter");
      if (v1123 === "favorites") {
        v1123 = window.Store?.get("zeeho.wallmarket.returnFilter");
      }
      if (["hot", "latest", ...Object.keys(window.WALLMARKET.categories)].includes(v1123)) {
        return v1123;
      } else {
        return "hot";
      }
    }
    const v180 = new Set();
    function v181(v1124, v1125) {
      v180.add(v1124);
      v1125.addEventListener("abort", () => v180.delete(v1124), {
        once: true
      });
    }
    function v182(v1126, v1127) {
      v140.favorites.set(v1126, v1127);
      for (const v1128 of v140.views.values()) {
        for (const v1129 of v1128.data.items) {
          if (v1129.id === v1126) {
            v1129.favorites_count = v1127.favorites_count;
            v1129.dislikes_count = v1127.dislikes_count;
          }
        }
      }
      for (const v1130 of v180) {
        v1130(v1126, v1127);
      }
    }
    function v183(v1131, v1132, v1133 = false) {
      const v1134 = v140;
      const v1135 = v1134.favoriteJobs;
      v146();
      const v1136 = v1134.favorites.get(v1131) || v1132;
      const v1137 = v1133 ? v1136.disliked ? 0 : -1 : v1136.favorited ? 0 : 1;
      let v1138 = v1135.get(v1131);
      if (v1138) {
        v1138.desired = v1137;
      } else {
        v1138 = {
          desired: v1137,
          confirmed: v1136
        };
        v1135.set(v1131, v1138);
      }
      v182(v1131, {
        favorited: v1137 === 1,
        disliked: v1137 === -1,
        favorites_count: Math.max(0, Number(v1136.favorites_count || 0) + Number(v1137 === 1) - Number(!!v1136.favorited)),
        dislikes_count: Math.max(0, Number(v1136.dislikes_count || 0) + Number(v1137 === -1) - Number(!!v1136.disliked))
      });
      if (v1138.running) {
        return;
      }
      v1138.running = true;
      const v1139 = () => {
        try {
          const v1140 = v146();
          return v140 === v1134 && v1140.uid === v1134.uid && v1140.token === v1134.token && v150() === v1134.base;
        } catch {
          return false;
        }
      };
      (async () => {
        try {
          while (v1139()) {
            const v1141 = v1138.desired;
            let v1142;
            for (let v1143 = 0;; v1143++) {
              try {
                if (!v1139()) {
                  return;
                }
                const v1144 = v1141 === -1 || v1141 === 0 && v1138.confirmed.disliked ? "dislike" : "favorite";
                v1142 = await (await v151("/wallpapers/" + v1131 + "/" + v1144, {
                  method: v1141 ? "PUT" : "DELETE"
                })).json();
                break;
              } catch (v1145) {
                if (!v1139()) {
                  return;
                }
                if (v1143 >= 2 || v1145.status && v1145.status < 500 && ![408, 429].includes(v1145.status)) {
                  throw v1145;
                }
                await new Promise(v1146 => setTimeout(v1146, 2 ** v1143 * 500));
              }
            }
            if (!v1139()) {
              return;
            }
            v1138.confirmed = v1142;
            if (v1138.desired !== v1141) {
              continue;
            }
            v182(v1131, v1142);
            return;
          }
        } catch (v1147) {
          if (!v1139()) {
            return;
          }
          let v1148 = v1138.confirmed;
          try {
            v1148 = await (await v151("/wallpapers/" + v1131 + "/favorite", {
              cache: "reload"
            })).json();
          } catch {}
          if (v1139()) {
            v182(v1131, v1148);
            v13.toast(v11(), "收藏同步失败，已校正状态：" + v1147.message, 4000);
          }
        } finally {
          v1135.delete(v1131);
          if (v1139()) {
            v1134.entries = new Map();
            const v1149 = v1134.views.get("favorites");
            if (v1149) {
              v1149.expiresAt = 0;
            }
          }
        }
      })();
    }
    function v184(v1150 = v179()) {
      if (v1150 === "favorites") {
        return "/me/favorites";
      }
      if (v1150 === "latest") {
        return "/wallpapers";
      }
      return "/wallpapers?" + (v1150 === "hot" ? "sort=hot" : "sort=hot&category=" + encodeURIComponent(v1150));
    }
    function v185(v1151 = v179()) {
      const v1152 = v146();
      const v1153 = v150();
      if (v140?.uid !== v1152.uid || v140?.token !== v1152.token || v140?.base !== v1153) {
        return null;
      }
      const v1154 = v140.views.get(v1151);
      if (v1154) {
        return {
          ...v1154,
          expiresAt: v1154.entries === v140.entries ? v1154.expiresAt : 0
        };
      }
      const v1155 = v140.entries.get(v184(v1151));
      if (v1155) {
        return {
          data: JSON.parse(v1155.body),
          expiresAt: v1155.expiresAt
        };
      } else {
        return null;
      }
    }
    async function v186(v1156 = v179()) {
      const v1157 = v185(v1156);
      if (v1157?.expiresAt > Date.now()) {
        return v1157.data;
      }
      const v1158 = v146();
      const v1159 = v150();
      if (v141?.filter === v1156 && v141?.uid === v1158.uid && v141?.token === v1158.token && v141?.base === v1159 && v141?.entries === v140?.entries) {
        return v141.promise;
      }
      const v1160 = {
        ...v1158,
        base: v1159,
        filter: v1156
      };
      v141 = v1160;
      v1160.promise = v151(v184(v1156)).then(v1161 => v1161.json()).then(v1162 => {
        if (v141 === v1160 && v140?.entries === v1160.entries) {
          for (const v1163 of v1162.items.slice(0, 6)) {
            if (v172(v1163.thumbnail)) {
              v177(v1163.thumbnail, v1163.thumbnail_format !== "webp" && v1163.manifest?.v >= 2 ? {
                manifest: v1163.manifest,
                images: v1163.images,
                key: "thumbnail"
              } : null).catch(() => {});
            } else {
              v71([v1163.thumbnail]);
            }
          }
        }
        return v1162;
      }).finally(() => {
        if (v141 === v1160) {
          v141 = null;
        }
      });
      v1160.entries = v140?.entries;
      return v1160.promise;
    }
    function v187(v1164) {
      if (v1164.filter === "favorites") {
        v1164.items = [...new Map([...[...(v140?.views.values() || [])].flatMap(v1166 => v1166.data.items).filter(v1167 => v140.favorites.get(v1167.id)?.favorited), ...v1164.items].map(v1168 => [v1168.id, v1168])).values()];
      }
      const v1165 = v1164.items.filter(v1169 => !v140?.withdrawn.has(v1169.id) && (v1164.filter !== "favorites" || v140?.favorites.get(v1169.id)?.favorited !== false));
      return v77(v1164.busy && v1164.refreshing) + "<div class=\"wall-market-toolbar\" role=\"group\" aria-label=\"壁纸筛选\" aria-busy=\"" + v1164.busy + "\"" + (v1164.filter === "favorites" ? " hidden" : "") + ">\n      " + [["hot", "热门"], ["latest", "最新"], ...Object.entries(window.WALLMARKET.categories)].map(([v1170, v1171]) => "<button class=\"btn sm\" type=\"button\" data-act=\"market-filter\" data-market-filter=\"" + v1170 + "\" aria-pressed=\"" + (v1164.filter === v1170) + "\">" + v1171 + "</button>").join("") + "</div>\n      " + (v1164.error ? "<div class=\"wall-empty\">" + v14(v1164.error) + "</div>" : "") + "\n      " + (!v1164.ready && !v1164.error && !v1165.length ? v70() : v1164.ready && !v1165.length && !v1164.error ? "<div class=\"wall-empty\">" + (v1164.filter === "favorites" ? "还没有收藏，点击壁纸旁的爱心收藏喜欢的作品吧" : v1164.filter === "latest" || v1164.filter === "hot" ? "还没有共享壁纸，去新建壁纸并发布第一套吧" : "这个分类还没有壁纸，稍后再来看看吧") + "</div>" : "") + "\n      <div class=\"wall-grid\" data-market-grid>" + v1165.map(v1172 => {
        const v1173 = v1172.thumbnail_format !== "webp" && v1172.manifest?.v >= 2 ? {
          manifest: v1172.manifest,
          images: v1172.images,
          key: "thumbnail"
        } : null;
        const v1174 = v178(v1172.thumbnail, v1173);
        const v1175 = v140?.favorites.get(v1172.id) || v1172;
        const v1176 = v1175?.favorited ?? v1164.filter === "favorites";
        return "<div class=\"wall-item wall-market-card\" data-market-card data-id=\"" + v14(v1172.id) + "\">\n        <button class=\"wall-item wall-market-open\" type=\"button\" data-act=\"detail\" data-id=\"" + v14(v1172.id) + "\" aria-haspopup=\"dialog\">\n        <span class=\"wall-thumb sk\"><img data-wall-image data-market-image=\"" + v14(v1172.thumbnail) + "\"" + (v1173 ? " data-market-plan=\"" + v14(JSON.stringify(v1173)) + "\"" : "") + " " + (v1174 ? "src=\"" + v14(v1174) + "\"" : "") + " alt=\"" + v14(v1172.name) + "\" decoding=\"async\" referrerpolicy=\"no-referrer\"><span data-image-error hidden>预览加载失败</span></span>\n        <span class=\"wall-nm\">" + v14(v1172.name) + "</span></button>\n        <div class=\"wall-market-stats card-sub\"><button class=\"wall-market-heart\" type=\"button\" data-act=\"card-download\" aria-label=\"下载 " + (Number(v1172.downloads) || 0) + "\" title=\"下载 " + (Number(v1172.downloads) || 0) + "\">" + v13.icon("download", 14) + "<span>" + v148(v1172.downloads) + "</span></button><button class=\"wall-market-heart\" type=\"button\" data-act=\"card-favorite\" aria-label=\"" + (v1176 ? "取消收藏" : "收藏") + " " + v14(v1172.name) + "\" title=\"收藏 " + (Number(v1175?.favorites_count ?? v1172.favorites_count) || 0) + "\" aria-pressed=\"" + v1176 + "\">" + v13.icon("heart", 16) + " <span data-market-favorite-label>" + v148(v1175?.favorites_count ?? v1172.favorites_count) + "</span></button><button class=\"wall-market-heart wall-market-dislike\" type=\"button\" data-act=\"card-dislike\" aria-label=\"" + (v1175?.disliked ? "取消差评" : "差评") + " " + v14(v1172.name) + "\" title=\"差评 " + (Number(v1175?.dislikes_count ?? v1172.dislikes_count) || 0) + "\" aria-pressed=\"" + !!v1175?.disliked + "\">🖤 <span data-market-dislike-label>" + v148(v1175?.dislikes_count ?? v1172.dislikes_count) + "</span></button></div></div>";
      }).join("") + (v1164.filter === "favorites" && v1165.length && (!v1164.ready || v1164.busy) && !v1164.error ? "<div class=\"wall-item wall-market-loading\" role=\"status\" aria-label=\"正在加载收藏\" aria-busy=\"true\"><span class=\"wall-thumb sk\"></span><span class=\"wall-nm sk\"></span></div>" : "") + "</div>\n      " + (v1164.next ? "<button class=\"btn block mt12\" type=\"button\" data-act=\"more\"" + (v1164.busy ? " disabled" : "") + ">加载更多</button>" : "");
    }
    function v188(v1177, v1178, v1179) {
      v1177.querySelectorAll("[data-detail-preview]").forEach(v1180 => {
        const v1181 = () => {
          if (!v1178()) {
            return;
          }
          const v1182 = v1180.querySelector("[data-detail-main], [data-composite-stage], img");
          if (!v1182 || v1182.hidden || v1182.getAttribute("aria-busy") === "true" || ![...v1182.querySelectorAll("img"), ...(v1182.matches("img") ? [v1182] : [])].some(v1184 => !v1184.hidden && v1184.complete && v1184.naturalWidth)) {
            return;
          }
          const v1183 = v1182.getBoundingClientRect();
          v189({
            name: v1179
          }, v1182, v1183.width / Math.max(1, v1183.height));
        };
        v1180.addEventListener("click", v1185 => {
          if (!v1185.target.closest("[data-composite-loading]")) {
            v1185.stopPropagation();
            v1181();
          }
        });
        v1180.addEventListener("keydown", v1186 => {
          if (v1186.key === "Enter" || v1186.key === " ") {
            v1186.preventDefault();
            v1181();
          }
        });
      });
    }
    function v189(v1187, v1188, v1189 = 0) {
      let v1190;
      let v1191 = "";
      let v1192 = 1;
      let v1193 = 0;
      let v1194 = 0;
      let v1195 = null;
      let v1196 = null;
      const v1197 = new Map();
      v1190 = v42({
        key: "market-image",
        full: true,
        title: v1187.name,
        className: "wall-page wall-image-viewer",
        body: "<div class=\"wall-image-stage\" data-image-stage><img alt=\"" + v14(v1187.name) + "\" draggable=\"false\"></div>",
        onMount: v1198 => {
          const v1199 = v1198.querySelector("[data-image-stage]");
          const v1200 = v1199.querySelector("img");
          let v1201 = v1200;
          if (v1189) {
            v1201 = v1188.cloneNode(true);
            v1201.classList.add("wall-preview-zoom");
            v1201.style.width = "min(100%, " + v1189 * 70 + "vh)";
            v1200.replaceWith(v1201);
          } else {
            v1200.src = v1188.currentSrc || v1188.src;
          }
          if (!v1189 && v1187.manifest?.v >= 2 && v1187.images?.main) {
            const v1204 = new Set();
            v174({
              manifest: v1187.manifest,
              key: "composite"
            }, v1205 => v177(v1187.images[v1205], null, true), v1204).then(v1206 => {
              if (!v38(v1190)) {
                return;
              }
              const v1207 = URL.createObjectURL(v1206);
              v1200.src = v1191 = v1207;
            }).catch(() => {});
          } else if (!v1189) {
            v151("/wallpapers/" + v1187.id).then(v1208 => v1208.json()).then(v1209 => v1209.preview && v177(v1209.preview)).then(v1210 => {
              if (v1210 && v38(v1190) && v1200.isConnected) {
                v1200.src = v1210;
              }
            }).catch(() => {});
          }
          const v1202 = () => {
            v1201.style.transform = "translate(" + v1193 + "px, " + v1194 + "px) scale(" + v1192 + ")";
          };
          const v1203 = () => {
            const v1211 = [...v1197.values()];
            if (v1211.length >= 2) {
              v1195 = {
                distance: Math.max(1, Math.hypot(v1211[0].x - v1211[1].x, v1211[0].y - v1211[1].y)),
                scale: v1192
              };
              v1196 = null;
            } else {
              v1195 = null;
              v1196 = v1211.length ? {
                ...v1211[0],
                x0: v1193,
                y0: v1194
              } : null;
            }
          };
          v1199.addEventListener("pointerdown", v1212 => {
            if (v1212.button !== 0) {
              return;
            }
            v1197.set(v1212.pointerId, {
              x: v1212.clientX,
              y: v1212.clientY
            });
            v1199.setPointerCapture?.(v1212.pointerId);
            v1203();
            v1212.preventDefault();
          });
          v1199.addEventListener("pointermove", v1213 => {
            if (!v1197.has(v1213.pointerId)) {
              return;
            }
            v1197.set(v1213.pointerId, {
              x: v1213.clientX,
              y: v1213.clientY
            });
            const v1214 = [...v1197.values()];
            if (v1214.length >= 2 && v1195) {
              v1192 = Math.min(8, Math.max(1, v1195.scale * Math.hypot(v1214[0].x - v1214[1].x, v1214[0].y - v1214[1].y) / v1195.distance));
            } else if (v1196) {
              v1193 = v1196.x0 + v1213.clientX - v1196.x;
              v1194 = v1196.y0 + v1213.clientY - v1196.y;
            }
            v1202();
          });
          for (const v1215 of ["pointerup", "pointercancel"]) {
            v1199.addEventListener(v1215, v1216 => {
              v1197.delete(v1216.pointerId);
              v1203();
            });
          }
          v1199.addEventListener("wheel", v1217 => {
            v1217.preventDefault();
            v1192 = Math.min(8, Math.max(1, v1192 * Math.exp(-v1217.deltaY * 0.0015)));
            v1202();
          }, {
            passive: false
          });
          v1199.addEventListener("dblclick", () => {
            v1193 = v1194 = 0;
            v1192 = 1;
            v1202();
          });
        },
        onDismiss: () => v43(v1191)
      });
    }
    let v190 = 0;
    let v191 = null;
    const v192 = () => Store.get("zeeho.market-replies-alerts") !== "0";
    async function v193(v1218 = false) {
      if (v27() || !v28() || !v1218 && Date.now() - v190 < 60000) {
        return;
      }
      if (v191) {
        return v191;
      }
      const v1219 = v36();
      v190 = Date.now();
      v191 = (async () => {
        try {
          const v1220 = await (await v151("/me/replies")).json();
          if (!v37(v1219)) {
            return;
          }
          v10.state.data.marketReplies = v1220;
          v10.render?.({
            keepScroll: true
          });
        } catch {} finally {
          v191 = null;
        }
      })();
      return v191;
    }
    async function v194(v1221) {
      const v1222 = v10.state.data.marketReplies;
      const v1223 = v1222?.items?.find(v1225 => String(v1225.id) === String(v1221));
      if (!v1223) {
        return;
      }
      const v1224 = v36();
      try {
        await v151("/me/replies/read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: v1223.id
          })
        });
        if (!v37(v1224)) {
          return;
        }
        if (!v1223.read_at) {
          v1222.unread = Math.max(0, v1222.unread - 1);
        }
        v1223.read_at = new Date().toISOString();
        v10.render?.({
          keepScroll: true
        });
      } catch {}
      if (v37(v1224)) {
        v200(v1223.wallpaper_id);
      }
    }
    function v195(v1226 = "") {
      const v1227 = new AbortController();
      let v1228;
      let v1229;
      let v1230;
      let v1231 = [];
      let v1232 = null;
      let v1233 = false;
      const v1234 = () => "/users/" + v1230.id + "/wallpapers?type=published";
      const v1235 = () => {
        if (!v1229?.isConnected || !v1230) {
          return;
        }
        const v1237 = v1230.avatar_url || (v1230.self ? v10.state.data?.user?.avatar : "") || "";
        v1229.querySelector("[data-profile-header]").innerHTML = "<span class=\"wall-profile-avatar\">" + v13.icon("user", 28) + (v1237 ? "<img src=\"" + v14(v1237) + "\" alt=\"\" referrerpolicy=\"no-referrer\" onerror=\"this.remove()\">" : "") + "</span><strong>" + v14(v1230.name || "车友") + "</strong><span class=\"wall-profile-stats\">" + (Number(v1230.followers) || 0) + " 关注者 · " + (Number(v1230.likes) || 0) + " 获赞</span>" + (v1230.self ? "" : "<button class=\"btn sm\" type=\"button\" data-profile-follow aria-pressed=\"" + v1230.following + "\">" + (v1230.following ? "已关注" : "关注") + "</button>");
        const v1238 = v1229.querySelector("[data-profile-list]");
        v1238.innerHTML = v1231.length ? v1231.map(v1239 => "<button class=\"wall-item\" type=\"button\" data-profile-item=\"" + v14(v1239.id) + "\"><span class=\"wall-thumb\"><img data-wall-image data-market-image=\"" + v14(v1239.thumbnail) + "\" " + (v1239.thumbnail_format !== "webp" && v1239.manifest?.v >= 2 ? "data-market-plan=\"" + v14(JSON.stringify({
          manifest: v1239.manifest,
          images: v1239.images,
          key: "thumbnail"
        })) + "\"" : "") + " alt=\"" + v14(v1239.name) + "\"></span><span class=\"wall-nm\">" + v14(v1239.name) + "</span></button>").join("") : "<div class=\"wall-empty\">暂无作品</div>";
        v69(v1238, () => v38(v1228));
        v1238.querySelectorAll("[data-profile-item]").forEach(v1240 => v1240.addEventListener("click", () => {
          const v1241 = v13.currentSheet("market-detail");
          if (v1241) {
            v13.closeSheet(v1241);
          }
          v200(v1240.dataset.profileItem);
        }));
        v1229.querySelector("[data-profile-more]").hidden = !v1232;
        v1229.querySelector("[data-profile-follow]")?.addEventListener("click", async v1242 => {
          const v1243 = v1242.currentTarget;
          v1243.disabled = true;
          try {
            const v1244 = await (await v151("/users/" + v1230.id + "/follow", {
              method: v1230.following ? "DELETE" : "PUT",
              signal: v1227.signal
            })).json();
            v1230.followers = Math.max(0, v1230.followers + (v1244.following ? 1 : -1));
            v1230.following = v1244.following;
            v140?.views.clear();
            v1235();
          } catch (v1245) {
            if (!v1227.signal.aborted) {
              v13.toast(v11(), v1245.message, 3000);
            }
          } finally {
            v1243.disabled = false;
          }
        });
      };
      const v1236 = async v1246 => {
        if (v1233 || !v1230) {
          return;
        }
        v1233 = true;
        try {
          const v1247 = await (await v151(v1234() + (v1246 ? "&before=" + encodeURIComponent(v1232) : ""), {
            signal: v1227.signal
          })).json();
          if (!v38(v1228)) {
            return;
          }
          v1231 = v1246 ? [...v1231, ...v1247.items] : v1247.items;
          v1232 = v1247.next;
          v1235();
        } catch (v1248) {
          if (!v1227.signal.aborted) {
            v13.toast(v11(), v1248.message, 3000);
          }
        } finally {
          v1233 = false;
        }
      };
      v1228 = v42({
        key: "market-profile",
        full: true,
        title: "个人主页",
        body: "<div class=\"wall-profile-header\" data-profile-header></div><div class=\"wall-grid\" data-profile-list></div><button class=\"btn block mt12\" type=\"button\" data-profile-more hidden>加载更多</button>",
        onMount: v1249 => {
          v1229 = v1249;
          v1229.querySelector("[data-profile-more]").addEventListener("click", () => v1236(true));
          v1235();
        },
        onDismiss: () => v1227.abort()
      });
      (async () => {
        try {
          v1230 = await (await v151(v1226 ? "/users/" + v1226 : "/me/profile", {
            signal: v1227.signal
          })).json();
          if (v38(v1228)) {
            v1235();
            await v1236(false);
          }
        } catch (v1250) {
          if (!v1227.signal.aborted) {
            v13.toast(v11(), v1250.message, 3000);
          }
        }
      })();
    }
    function v196() {
      if (window.PLATFORM.preview()) {
        return v29("market");
      }
      if (!v28()) {
        return;
      }
      try {
        v146();
        v150();
      } catch (v1270) {
        return v13.toast(v11(), v1270.message, 3000);
      }
      v46();
      v24("market");
      v170();
      if (v13.currentSheet("wall-market")) {
        return;
      }
      const v1251 = v46();
      const v1252 = v179();
      const v1253 = v185(v1252);
      const v1254 = {
        items: v1253?.data.items || [],
        next: v1253?.data.next || null,
        ready: !!v1253,
        busy: false,
        refreshing: false,
        error: "",
        filter: v1252,
        filterScroll: 0,
        scrollTop: v1253?.scrollTop || 0
      };
      const v1255 = new AbortController();
      let v1256;
      let v1257 = 0;
      let v1258 = null;
      let v1259 = null;
      const v1260 = () => {
        clearTimeout(v1258);
        v1258 = null;
      };
      const v1261 = () => v37(v1251) && v38(v1256);
      const v1262 = async (v1271, v1272 = false) => {
        if (v1254.busy || !v1261()) {
          return;
        }
        const v1273 = ++v1257;
        const v1274 = v1254.filter;
        const v1275 = () => v1261() && v1273 === v1257;
        v1254.busy = true;
        v1254.refreshing = v1272;
        v1254.error = "";
        v1269();
        try {
          const v1276 = v184(v1274);
          const v1277 = !v1271 && !v1272 ? await v186(v1274) : await (await v151(v1276 + (v1271 ? (v1276.includes("?") ? "&" : "?") + "before=" + encodeURIComponent(v1254.next) : ""), {
            signal: v1255.signal,
            cache: v1272 ? "reload" : "default"
          })).json();
          if (!v1275()) {
            return;
          }
          v1254.items = v1271 ? [...new Map([...v1254.items, ...v1277.items].map(v1278 => [v1278.id, v1278])).values()] : v1277.items;
          v1254.next = v1277.next;
          v1254.ready = true;
          v140.views.set(v1254.filter, {
            data: {
              items: v1254.items,
              next: v1254.next
            },
            expiresAt: Date.now() + 60000,
            entries: v140.entries,
            scrollTop: v1254.scrollTop
          });
        } catch (v1279) {
          if (v1275()) {
            v1254.error = v1279.message;
          }
        } finally {
          if (v1275()) {
            v1254.busy = false;
            v1254.refreshing = false;
            v1269();
          }
        }
      };
      const v1263 = v1280 => {
        if (v1280 === v1254.filter || !v1261()) {
          return;
        }
        v1257++;
        v1254.busy = false;
        v1254.refreshing = false;
        v1254.filter = v1280;
        if (v1280 !== "favorites") {
          window.Store?.set?.("zeeho.wallmarket.filter", v1280);
        }
        const v1281 = v185(v1280);
        v1254.items = v1281?.data.items || [];
        v1254.next = v1281?.data.next || null;
        v1254.ready = !!v1281;
        v1254.error = "";
        v1254.scrollTop = v1281?.scrollTop || 0;
        v1269();
        if (!v1281 || v1281.expiresAt <= Date.now()) {
          v1262(false);
        }
      };
      const v1264 = new WeakSet();
      let v1265 = null;
      let v1266 = "";
      const v1267 = v1282 => {
        for (const v1283 of v1282.querySelectorAll("[data-market-card]")) {
          const v1284 = v1283.querySelector("[data-act=\"detail\"]");
          const v1285 = v1283.dataset.id;
          const v1286 = v140.favorites.get(v1285);
          if (v1286 && v1254.filter === "favorites" && !v1286.favorited) {
            v1283.remove();
            continue;
          }
          if (v1286) {
            for (const v1296 of v1283.querySelectorAll("[data-act=\"card-favorite\"]")) {
              v1296.setAttribute("aria-pressed", String(v1286.favorited));
              v1296.setAttribute("aria-label", (v1286.favorited ? "取消收藏" : "收藏") + " " + (v1254.items.find(v1297 => v1297.id === v1285)?.name || ""));
              v1296.title = "收藏 " + (Number(v1286.favorites_count) || 0);
              v1296.querySelector("[data-market-favorite-label]").textContent = v148(v1286.favorites_count);
            }
          }
          const v1287 = v1283.querySelector("[data-act=\"card-dislike\"]");
          if (v1286 && v1287) {
            v1287.setAttribute("aria-pressed", String(!!v1286.disliked));
            v1287.setAttribute("aria-label", v1286.disliked ? "取消差评" : "差评");
            v1287.title = "差评 " + (Number(v1286.dislikes_count) || 0);
            v1287.querySelector("[data-market-dislike-label]").textContent = v148(v1286.dislikes_count);
          }
          if (v1264.has(v1283)) {
            continue;
          }
          v1264.add(v1283);
          let v1288 = null;
          let v1289 = false;
          let v1290;
          let v1291;
          let v1292;
          const v1293 = v1298 => {
            if (!v1261() || v1298.isConnected === false) {
              return;
            }
            const v1299 = v1254.items.find(v1300 => v1300.id === v1285);
            v183(v1285, {
              favorited: v1299?.favorited ?? v1254.filter === "favorites",
              disliked: !!v1299?.disliked,
              favorites_count: v1299?.favorites_count || 0,
              dislikes_count: v1299?.dislikes_count || 0
            });
          };
          const v1294 = () => {
            v1260();
            if (!v1261() || v1283.isConnected === false || v13.currentSheet() !== v1256) {
              return;
            }
            v1289 = true;
            const v1301 = v1283.getBoundingClientRect();
            const v1302 = v1254.items.find(v1307 => v1307.id === v1285);
            const v1303 = v1283.querySelector("img");
            const v1304 = v1303?.outerHTML || "";
            const v1305 = v140.favorites.get(v1285)?.favorited ?? v1254.filter === "favorites";
            const v1306 = !!v1282.animate && !matchMedia("(prefers-reduced-motion: reduce)").matches;
            v1290 = v42({
              key: "wall-market-card",
              title: v1302.name,
              center: true,
              className: "wall-market-modal",
              body: "<button class=\"wall-thumb wall-market-modal-preview\" type=\"button\" data-act=\"preview-image\" aria-label=\"全屏查看图片\">" + v1304 + "</button><div class=\"wall-market-modal-actions\"><button class=\"btn primary block\" type=\"button\" data-act=\"card-apply\">应用</button><button class=\"btn block\" type=\"button\" data-act=\"card-menu-favorite\" aria-label=\"" + (v1305 ? "取消收藏" : "收藏") + "\" aria-pressed=\"" + v1305 + "\">" + v13.icon("heart", 18) + " <span data-market-favorite-label>" + (v1305 ? "取消收藏" : "收藏") + "</span></button></div>",
              onMount: v1308 => {
                v1291 = v1308;
                v1259 = {
                  id: v1285,
                  root: v1308
                };
                v69(v1308, v1261);
                v1308.querySelector("[data-back]")?.remove();
                v1308.querySelector("[data-act=\"preview-image\"]").addEventListener("click", () => v189(v1302, v1308.querySelector("img")));
                v1308.querySelector("[data-act=\"card-apply\"]").addEventListener("click", () => {
                  if (!v1261() || v13.currentSheet() !== v1290) {
                    return;
                  }
                  v13.closeSheet(v1290);
                  v200(v1285, true);
                });
                const v1309 = v1308.querySelector("[data-act=\"card-menu-favorite\"]");
                v1309.addEventListener("click", () => v1293(v1309));
                if (v1306) {
                  const v1310 = v1308.getBoundingClientRect();
                  const v1311 = "translate(-50%, -50%) translate(" + (v1301.left + v1301.width / 2 - v1310.left - v1310.width / 2) + "px, " + (v1301.top + v1301.height / 2 - v1310.top - v1310.height / 2) + "px) scale(" + v1301.width / v1310.width + ", " + v1301.height / v1310.height + ")";
                  v1292 = v1308.animate([{
                    transform: v1311,
                    opacity: 0.6
                  }, {
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 1
                  }], {
                    duration: 280,
                    easing: "cubic-bezier(.2,0,0,1)"
                  });
                }
              },
              onDismiss: () => {
                if (v1259?.handle === v1290) {
                  v1259 = null;
                }
                v1292?.cancel();
                if (!v1306 || !v1261() || !v1291?.cloneNode) {
                  return;
                }
                const v1312 = v1291.getBoundingClientRect();
                const v1313 = v1291.cloneNode(true);
                v1313.setAttribute("aria-hidden", "true");
                v1313.setAttribute("inert", "");
                v1313.removeAttribute("aria-modal");
                for (const v1315 of v1313.querySelectorAll("[id]")) {
                  v1315.removeAttribute("id");
                }
                Object.assign(v1313.style, {
                  position: "fixed",
                  left: v1312.left + "px",
                  top: v1312.top + "px",
                  width: v1312.width + "px",
                  height: v1312.height + "px",
                  maxHeight: "none",
                  margin: "0",
                  transform: "none",
                  transition: "none",
                  pointerEvents: "none",
                  zIndex: "100"
                });
                document.body.appendChild(v1313);
                const v1314 = v1313.animate([{
                  transform: "none",
                  opacity: 1
                }, {
                  transform: "translate(" + (v1301.left + v1301.width / 2 - v1312.left - v1312.width / 2) + "px, " + (v1301.top + v1301.height / 2 - v1312.top - v1312.height / 2) + "px) scale(" + v1301.width / v1312.width + ", " + v1301.height / v1312.height + ")",
                  opacity: 0
                }], {
                  duration: 200,
                  easing: "cubic-bezier(.4,0,1,1)",
                  fill: "forwards"
                });
                v1314.finished.then(() => v1313.remove(), () => v1313.remove());
              }
            });
            v1259.handle = v1290;
          };
          v1284.addEventListener("pointerdown", v1316 => {
            if (v1316.button !== 0 || v1316.isPrimary === false) {
              return;
            }
            v1260();
            v1289 = false;
            v1288 = {
              x: v1316.clientX,
              y: v1316.clientY,
              id: v1316.pointerId
            };
            v1258 = setTimeout(v1294, 480);
          });
          v1284.addEventListener("pointermove", v1317 => {
            if (v1288 && (v1317.pointerId !== v1288.id || Math.hypot(v1317.clientX - v1288.x, v1317.clientY - v1288.y) > 10)) {
              v1260();
              v1288 = null;
            }
          });
          for (const v1318 of ["pointerup", "pointercancel", "pointerleave"]) {
            v1284.addEventListener(v1318, () => {
              v1260();
              v1288 = null;
            });
          }
          v1284.addEventListener("contextmenu", v1319 => {
            v1319.preventDefault();
            v1294();
          });
          v1284.addEventListener("keydown", v1320 => {
            if (v1320.key === "ContextMenu" || v1320.key === "F10" && v1320.shiftKey) {
              v1320.preventDefault();
              v1294();
              v1291?.querySelector("[data-act=\"card-apply\"]").focus?.();
            }
          });
          v1284.addEventListener("click", () => {
            if (!v1261() || v1283.isConnected === false) {
              return;
            }
            if (v1289) {
              v1289 = false;
              return;
            }
            if (v13.currentSheet() === v1256) {
              v200(v1285);
            }
          });
          v1283.querySelector("[data-act=\"card-download\"]").addEventListener("click", () => {
            if (v1261()) {
              v200(v1285);
            }
          });
          const v1295 = v1283.querySelector("[data-act=\"card-favorite\"]");
          v1295.addEventListener("click", () => v1293(v1295));
          v1287.addEventListener("click", () => {
            if (!v1261()) {
              return;
            }
            const v1321 = v1254.items.find(v1322 => v1322.id === v1285);
            v183(v1285, {
              favorited: v1321?.favorited ?? v1254.filter === "favorites",
              disliked: !!v1321?.disliked,
              favorites_count: v1321?.favorites_count || 0,
              dislikes_count: v1321?.dislikes_count || 0
            }, true);
          });
        }
        if (v1254.filter === "favorites" && v1254.ready && !v1282.querySelector("[data-market-card], .wall-empty")) {
          const v1323 = document.createElement("div");
          v1323.className = "wall-empty";
          v1323.textContent = "还没有收藏，点击壁纸旁的爱心收藏喜欢的作品吧";
          v1282.querySelector(".wall-grid").appendChild(v1323);
        }
      };
      const v1268 = v1324 => {
        const v1325 = document.createElement("div");
        v1325.innerHTML = v187(v1254);
        const v1326 = v1324.querySelector("[data-market-grid]");
        const v1327 = v1325.querySelector("[data-market-grid]");
        const v1328 = new Set([...v1327.querySelectorAll("[data-market-card]")].map(v1331 => v1331.dataset.id));
        for (const v1332 of [...v1326.children]) {
          if (!v1328.has(v1332.dataset.id)) {
            v1332.remove();
          }
        }
        const v1329 = new Set([...v1326.querySelectorAll("[data-market-card]")].map(v1333 => v1333.dataset.id));
        for (const v1334 of [...v1327.children]) {
          if (!v1329.has(v1334.dataset.id)) {
            v1326.appendChild(v1334);
            v69(v1334, v1261);
          }
        }
        v1324.querySelector(".wall-market-toolbar").setAttribute("aria-busy", String(v1254.busy));
        const v1330 = v1324.querySelector("[data-wall-refresh]");
        v1330.classList.toggle("loading", v1254.busy && v1254.refreshing);
        v1330.querySelector("[data-wall-refresh-text]").textContent = v1254.busy && v1254.refreshing ? "正在刷新…" : "";
        for (const v1335 of v1324.querySelectorAll(".wall-empty, .wall-skeleton, [data-act=\"more\"]")) {
          v1335.remove();
        }
        for (const v1336 of v1325.querySelectorAll(".wall-empty, .wall-skeleton, [data-act=\"more\"]")) {
          v1326.parentElement.appendChild(v1336);
        }
        v1324.querySelector("[data-act=\"more\"]")?.addEventListener("click", () => v1262(true));
        v1267(v1324);
      };
      const v1269 = () => {
        v1260();
        if (v1254.filter === "favorites" && v1266 === v1254.filter && v13.currentSheet() === v1256 && v1265?.querySelector("[data-market-grid]")?.isConnected) {
          v1268(v1265);
          return;
        }
        const v1337 = document.activeElement?.dataset?.marketFilter;
        v13.updateSheet(v1256, {
          body: v187(v1254),
          headActions: "<button type=\"button\" class=\"iconbtn wall-market-favorites\" data-act=\"market-favorites\" aria-label=\"我的收藏\" title=\"我的收藏\" aria-pressed=\"" + (v1254.filter === "favorites") + "\">" + v13.icon("heart", 20) + "</button>",
          onMount: v1338 => {
            if (!v1261()) {
              return;
            }
            v1265 = v1338;
            v1266 = v1254.filter;
            if (v1254.filter === "favorites") {
              v1338.querySelector(".sheet-body").innerHTML = v187(v1254);
            }
            const v1339 = v1338.querySelector(".sheet-body");
            if (v1339) {
              v1339.scrollTop = v1254.scrollTop;
              const v1343 = document.createElement("button");
              v1343.type = "button";
              v1343.className = "wall-market-top";
              v1343.hidden = true;
              v1343.setAttribute("aria-label", "回到顶部");
              v1343.innerHTML = "↑";
              v1338.appendChild(v1343);
              let v1344 = v1339.scrollTop;
              let v1345 = false;
              v1343.addEventListener("click", () => {
                v1345 = true;
                v1343.hidden = true;
                v1339.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              });
              v1339.addEventListener("pointerdown", () => {
                v1345 = false;
              });
              v1339.addEventListener("scroll", () => {
                const v1346 = v1339.scrollTop;
                if (v1346 <= 0) {
                  v1345 = false;
                }
                if (v1345 || v1346 <= 0 || v1346 > v1344) {
                  v1343.hidden = true;
                } else if (v1346 < v1344) {
                  v1343.hidden = false;
                }
                v1344 = v1254.scrollTop = v1346;
                const v1347 = v140?.views.get(v1254.filter);
                if (v1347) {
                  v1347.scrollTop = v1254.scrollTop;
                }
              });
            }
            v13.bindPageTabs(v1338, "market", v76, {
              switchSection: v86,
              refresh: () => v1262(false, true),
              busy: () => v1254.busy
            });
            v1338.querySelector("[data-act=\"market-favorites\"]").addEventListener("click", () => v1263(v1254.filter === "favorites" ? v179() : "favorites"));
            v69(v1338, v1261);
            const v1340 = v1338.querySelector(".wall-market-toolbar");
            v1340.scrollLeft = v1254.filterScroll;
            v1340.addEventListener("scroll", () => {
              v1254.filterScroll = v1340.scrollLeft;
            });
            let v1341 = null;
            let v1342 = false;
            v1340.addEventListener("pointerdown", v1348 => {
              v1342 = false;
              if (v1348.pointerType !== "mouse" || v1348.button !== 0) {
                return;
              }
              v1341 = {
                x: v1348.clientX,
                scroll: v1340.scrollLeft,
                id: v1348.pointerId
              };
            });
            v1340.addEventListener("pointermove", v1349 => {
              if (!v1341 || v1341.id !== v1349.pointerId) {
                return;
              }
              const v1350 = v1349.clientX - v1341.x;
              if (Math.abs(v1350) > 6) {
                v1342 = true;
                v1340.setPointerCapture?.(v1349.pointerId);
              }
              if (v1342) {
                v1349.preventDefault();
                v1340.scrollLeft = v1341.scroll - v1350;
                v1254.filterScroll = v1340.scrollLeft;
              }
            });
            for (const v1351 of ["pointerup", "pointercancel", "lostpointercapture"]) {
              v1340.addEventListener(v1351, () => {
                v1341 = null;
              });
            }
            v1340.addEventListener("pointerleave", () => {
              if (!v1342) {
                v1341 = null;
              }
            });
            v1340.addEventListener("keydown", () => {
              v1342 = false;
            });
            v1340.addEventListener("click", v1352 => {
              if (v1342) {
                v1352.preventDefault();
                v1352.stopImmediatePropagation();
                v1342 = false;
              }
            }, true);
            if (v1337) {
              v1340.querySelector("[data-market-filter=\"" + v1337 + "\"]")?.focus({
                preventScroll: true
              });
            }
            for (const v1353 of v1340.querySelectorAll("[data-market-filter]")) {
              v1353.addEventListener("click", () => v1263(v1353.dataset.marketFilter));
            }
            v1338.querySelector("[data-act=\"more\"]")?.addEventListener("click", () => v1262(true));
            v1267(v1338);
          }
        });
      };
      v1256 = v42({
        key: "wall-market",
        full: true,
        page: true,
        title: "壁纸市场",
        sub: "",
        body: "",
        onDismiss: () => {
          v1260();
          if (v142 === v1269) {
            v142 = null;
          }
          v1255.abort();
          v25();
        }
      });
      v181((v1354, v1355) => {
        if (!v1261()) {
          return;
        }
        if (v1259?.id === v1354 && v13.currentSheet() === v1259.handle) {
          const v1356 = v1259.root.querySelector("[data-act=\"card-menu-favorite\"]");
          v1356.setAttribute("aria-pressed", String(v1355.favorited));
          v1356.setAttribute("aria-label", v1355.favorited ? "取消收藏" : "收藏");
          v1356.querySelector("[data-market-favorite-label]").textContent = v1355.favorited ? "取消收藏" : "收藏";
        } else if (v13.currentSheet() === v1256) {
          v1269();
        }
      }, v1255.signal);
      v142 = v1269;
      v1269();
      if (!v1253 || v1253.expiresAt <= Date.now()) {
        v1262(false);
      }
      v66(v1251, {
        cached: true
      });
    }
    async function v197(v1357, v1358, v1359, v1360 = null) {
      if (typeof v1357 !== "string" || v1357.length > Math.ceil(window.WALLMARKET.MAX_FILE / 3) * 4) {
        throw new Error("方案图片过大或格式无效");
      }
      const v1361 = new Blob([Uint8Array.from(atob(v1357), v1364 => v1364.charCodeAt(0))], {
        type: v1360?.v >= 3 ? "image/png" : "image/jpeg"
      });
      if (v1360?.v >= 2) {
        return new File([await v174({
          manifest: v1360,
          key: v1358
        }, async () => v1361, v1359)], v1358 + ".png", {
          type: "image/png"
        });
      }
      const v1362 = await v138(v1361, v1359);
      const v1363 = document.createElement("canvas");
      try {
        const {
          naturalWidth: v1365,
          naturalHeight: v1366
        } = v1362.img;
        if (!v1365 || !v1366 || v1365 > 4096 || v1366 > 4096) {
          throw new Error("方案图片尺寸无效");
        }
        v1363.width = v1365;
        v1363.height = v1366;
        const v1367 = v1363.getContext("2d");
        if (!v1367) {
          throw new Error("暂时无法导出图片");
        }
        v1367.drawImage(v1362.img, 0, 0);
        return new File([await v153(v1363, "image/png")], v1358 + ".png", {
          type: "image/png"
        });
      } finally {
        v43(v1362.url);
        v1363.width = 0;
        v1363.height = 0;
      }
    }
    async function v198(v1368, v1369, v1370) {
      const v1371 = await v138(v1368, v1370);
      const v1372 = document.createElement("canvas");
      try {
        v1372.width = Math.round(v1369.w);
        v1372.height = Math.round(v1369.h);
        const v1373 = v1372.getContext("2d");
        if (!v1373) {
          throw new Error("暂时无法导出图片");
        }
        const v1374 = v16.wallpaperFitTransform({
          imgW: v1371.img.naturalWidth,
          imgH: v1371.img.naturalHeight,
          boxW: v1372.width,
          boxH: v1372.height,
          zoom: 1,
          panX: 0,
          panY: 0
        });
        v1373.imageSmoothingEnabled = true;
        v1373.imageSmoothingQuality = "high";
        v1373.drawImage(v1371.img, v1374.offsetX, v1374.offsetY, v1374.drawW, v1374.drawH);
        return new File([await v153(v1372, "image/png")], v1368.name, {
          type: "image/png"
        });
      } finally {
        v43(v1371.url);
        v1372.width = 0;
        v1372.height = 0;
      }
    }
    async function v199(v1375, v1376, v1377, v1378) {
      if (v10.wallpaperLocalTransferSupported?.() !== true) {
        throw new Error("请更新 App 后使用车机直连下发");
      }
      if (typeof v10.walltransfer?.open !== "function") {
        throw new Error("应用页面尚未就绪，请更新面板后重试");
      }
      const v1379 = await v10.media.wallpaperExperimentSpec(v1376, v1377);
      if (!v1377()) {
        return;
      }
      const v1380 = v50();
      if (!(v1380.width > 0) || !(v1380.height > 0)) {
        throw new Error("还没读到仪表分辨率，请刷新车况后重试");
      }
      const v1381 = {
        w: v1380.width,
        h: v1380.height
      };
      const v1382 = v16.wallpaperSpeedCardBox({
        ...v1381,
        model: v1380.model
      });
      if (!v1382) {
        throw new Error("无法计算仪表速度卡尺寸，请刷新车况后重试");
      }
      let v1383 = v1375.mainFile;
      if (Math.round(v1375.canvas.w) !== v1381.w || Math.round(v1375.canvas.h) !== v1381.h) {
        v1383 = await v198(v1383, v1381, v1378);
      }
      let v1384 = v1375.speedFile;
      if (v1384 && (Math.round(v1375.speedBox.w) !== Math.round(v1382.w) || Math.round(v1375.speedBox.h) !== Math.round(v1382.h))) {
        v1384 = await v198(v1384, v1382, v1378);
      }
      if (!v1377()) {
        return;
      }
      const v1385 = v1383 ? await v144(v1383) : "";
      const v1386 = v1384 ? await v144(v1384) : "";
      if (!v1377()) {
        return;
      }
      if (!v1385 && !v1386) {
        throw new Error("方案图片不完整，无法下发到车机");
      }
      const v1387 = {
        ...v1379,
        fileName: "local-wallpaper.zip",
        wallpaperNum: v145(),
        displayWallpaperSet: "1",
        mainWidth: v1385 ? v1381.w : 0,
        mainHeight: v1385 ? v1381.h : 0,
        speedWidth: v1386 ? Math.round(v1382.w) : 0,
        speedHeight: v1386 ? Math.round(v1382.h) : 0
      };
      v10.walltransfer.open(v1387, v1376, {
        name: v1375.name
      }, {
        main: v1385,
        speed: v1386
      });
    }
    async function v200(v1388, v1389 = false) {
      if (v13.currentSheet("market-detail")) {
        return;
      }
      const v1390 = v46();
      const v1391 = new AbortController();
      let v1392;
      let v1393 = false;
      let v1394 = null;
      let v1395 = false;
      const v1396 = {
        root: null,
        mount: 0,
        ready: false,
        requested: false,
        comments: null,
        commentNext: null,
        replyNext: {},
        commentRequest: null,
        commentDraft: "",
        replyTo: "",
        task: null,
        saving: null
      };
      const v1397 = new Set();
      const v1398 = [...(v140?.views.values() || [])].flatMap(v1400 => v1400.data.items).find(v1401 => v1401.id === v1388);
      const v1399 = v1398?.manifest?.canvas || {
        w: 1024,
        h: 600
      };
      v1392 = v42({
        key: "market-detail",
        full: true,
        title: "壁纸详情",
        body: "<div data-market-detail-loading role=\"status\" aria-label=\"正在加载详情\" aria-busy=\"true\">" + v102({}, {
          mainW: v1399.w,
          mainH: v1399.h
        }, true) + "</div>",
        onDismiss: () => {
          v1391.abort();
          if (v1396.saving) {
            v13.closeSheet(v1396.saving);
          }
          for (const v1402 of v1397) {
            v1402();
          }
          v1396.mount++;
          v1396.root = null;
        }
      });
      try {
        const v1403 = await (await v151("/wallpapers/" + v1388, {
          signal: v1391.signal
        })).json();
        if (!v37(v1390) || !v38(v1392) || v1391.signal.aborted) {
          return;
        }
        const v1404 = v140;
        const v1405 = window.WALLMARKET.validate(v1403.manifest);
        const {
          w: v1406,
          h: v1407
        } = v1405.canvas;
        const v1408 = v1405.speedBox;
        const v1409 = {
          ready: true,
          mainW: v1406,
          mainH: v1407,
          ratio: v1406 / v1407,
          speed: v1405.layers.length === 2 ? {
            leftPct: v1408.left / v1406 * 100,
            topPct: v1408.top / v1407 * 100,
            widthPct: v1408.w / v1406 * 100,
            heightPct: v1408.h / v1407 * 100
          } : null
        };
        const v1410 = {
          geo: v1409,
          canceled: false
        };
        const v1411 = v1412 => v1403.previews ? {
          url: v1403.previews[v1412],
          plan: {
            key: "preview"
          }
        } : {
          url: v1403.images[v1412],
          ...(v1405.v >= 2 ? {
            plan: {
              manifest: v1405,
              images: v1403.images,
              key: v1412
            }
          } : {})
        };
        v13.updateSheet(v1392, {
          title: v1405.name,
          headActions: v140?.admin ? "<button class=\"iconbtn\" type=\"button\" data-act=\"admin-delete\" aria-label=\"删除作品\" title=\"删除作品\">" + v13.icon("trash", 20) + "</button>" : "",
          body: v102({
            main: v1411("main"),
            speedCard: v1409.speed ? v1411("speed") : null
          }, v1409) + "\n          <div class=\"card-sub\">作者：" + (v1403.author_id ? "<button class=\"wall-author-link\" type=\"button\" data-market-author>" + v14(v1403.author_name || "未署名车友") + "</button>" : v14(v1403.author_name || "未署名车友")) + "</div>\n          <div class=\"wall-market-stats card-sub\" data-market-stats>" + v149(v1403, {}, false, v143()) + "</div>\n          <section class=\"wall-market-comments\" aria-label=\"壁纸评论\"><header class=\"wall-comment-heading\"><h3>车友评论</h3><span class=\"card-sub\">交流灵感，友善发言</span></header>\n          <form data-comment-form class=\"wall-comment-composer\"><div class=\"wall-comment-reply\" data-comment-reply hidden><span data-comment-reply-name></span><button type=\"button\" data-reply-cancel aria-label=\"取消回复\">×</button></div><textarea class=\"field\" aria-label=\"评论内容\" aria-describedby=\"wall-comment-count\" placeholder=\"聊聊使用感受，或给作者一点建议…\" maxlength=\"500\" required></textarea><div class=\"wall-comment-tools\"><button class=\"iconbtn\" type=\"button\" data-emoji-toggle aria-label=\"选择表情\" aria-expanded=\"false\">😀</button><span class=\"card-sub\" id=\"wall-comment-count\" data-comment-count>0 / 500</span><button class=\"btn primary\" type=\"submit\" disabled>发表评论</button></div><div class=\"wall-comment-emoji\" data-emoji-panel hidden>" + ["😀", "😂", "🥰", "😍", "🤔", "😎", "😭", "👍", "👏", "❤️", "🔥", "🎉"].map(v1413 => "<button type=\"button\" data-emoji=\"" + v1413 + "\" aria-label=\"插入 " + v1413 + "\">" + v1413 + "</button>").join("") + "</div></form><p class=\"wall-comment-status\" data-comment-status role=\"status\" aria-live=\"polite\"></p>\n          <div data-comment-pending aria-live=\"polite\"></div><div data-market-comments aria-busy=\"true\"><p class=\"wall-comment-empty\" role=\"status\">正在加载评论…</p></div>\n          <button class=\"btn block\" type=\"button\" data-comments-more hidden>加载更多评论</button></section>\n          <div class=\"wall-actions wall-detail-actions\"><button class=\"btn block primary\" type=\"button\" data-act=\"save-plan\">保存方案</button>\n          <button class=\"btn block\" type=\"button\" data-act=\"favorite\" disabled>收藏壁纸</button>\n          </div>\n          " + (v143() ? "<p class=\"card-sub\" data-direct-hint>当前车辆是别人分享给我的，没有云端保存权限；应用时改为本机打包，直接连车机下发。</p>" : ""),
          onDismiss: () => {
            v1391.abort();
            if (v1396.saving) {
              v13.closeSheet(v1396.saving);
            }
            for (const v1414 of v1397) {
              v1414();
            }
            v1396.mount++;
            v1396.root = null;
          },
          onMount: v1415 => {
            v1392 ||= v13.currentSheet("market-detail");
            const v1416 = v1415.querySelector(".sheet-body");
            const v1417 = ++v1396.mount;
            const v1418 = v1416.querySelector(".wall-detail-actions");
            v1415.appendChild(v1418);
            v1396.root = v1416;
            const v1419 = () => v37(v1390) && v38(v1392) && !v1391.signal.aborted;
            const v1420 = () => v1419() && v13.currentSheet() === v1392 && v1396.mount === v1417 && v1396.root === v1416 && v1416.isConnected !== false && v1415.querySelector(".sheet-body") === v1416;
            v69(v1416, v1420);
            v105(v1416, v1420, v1409.speed, v1410);
            v188(v1416, v1420, v1405.name);
            v1416.querySelector("[data-market-author]")?.addEventListener("click", () => v195(v1403.author_id));
            const v1421 = () => {
              const v1444 = v140?.favorites.get(v1388);
              if (v1444) {
                v1394 = v1444.favorited;
                v1403.favorites_count = v1444.favorites_count;
                v1403.dislikes_count = v1444.dislikes_count;
              }
              const v1445 = v1396.root;
              if (!v1419() || v13.currentSheet() !== v1392 || !v1445 || v1445.isConnected === false || v1415.querySelector(".sheet-body") !== v1445) {
                return;
              }
              const v1446 = v1415.querySelector(".wall-detail-actions");
              for (const v1452 of v1415.querySelectorAll(".wall-detail-actions button, .head-actions [data-act=\"admin-delete\"]")) {
                v1452.disabled = v1393;
              }
              const v1447 = v1446.querySelector("[data-act=\"favorite\"]");
              v1447.textContent = v1394 === null ? v1396.ready ? "重新读取收藏" : "正在读取收藏…" : v1394 ? "取消收藏" : "收藏壁纸";
              v1447.disabled = v1393 || !v1396.ready;
              const v1448 = v1446.querySelector("[data-act=\"save-plan\"]");
              const v1449 = v143();
              v1448.disabled = !!v51() || v1393 || !!v1396.task?.uploadedId || !!v1396.task?.resultText?.includes("请刷新列表确认");
              v1448.textContent = v1396.task?.uploadedId ? "已保存方案" : v1449 ? v1393 ? "准备本地包…" : "直接应用到车机" : v1389 ? "应用到车机" : "保存方案";
              const v1450 = v1445.querySelector("[data-market-stats]");
              const v1451 = v1450.contains(document.activeElement) ? document.activeElement?.dataset.marketAction : null;
              v1450.innerHTML = v149(v1403, v1444, v1396.ready && !v1393, v1449);
              v1450.querySelector("[data-market-action=\"download\"]").disabled = v1448.disabled;
              if (v1451) {
                v1450.querySelector("[data-market-action=\"" + v1451 + "\"]")?.focus({
                  preventScroll: true
                });
              }
              v1448.title = v51() || "";
            };
            v1416.querySelector("[data-market-stats]").addEventListener("click", v1453 => {
              const v1454 = v1453.target.closest("[data-market-action]");
              if (!v1454 || v1454.disabled || v1393 || !v1420()) {
                return;
              }
              const v1455 = v1454.dataset.marketAction;
              if (v1455 === "download") {
                v1418.querySelector("[data-act=\"save-plan\"]").click();
              } else if (v1455 === "favorite") {
                v1418.querySelector("[data-act=\"favorite\"]").click();
              } else if (v1394 !== null) {
                v183(v1388, v140.favorites.get(v1388), true);
              }
            });
            let v1422 = v1396.commentNext;
            let v1423 = false;
            const v1424 = v1404;
            const v1425 = v1424.comments.get(v1388) || [];
            v1424.comments.set(v1388, v1425);
            const v1426 = v1416.querySelector("[data-market-comments]");
            const v1427 = v1416.querySelector("[data-comments-more]");
            const v1428 = v1416.querySelector("[data-comment-form]");
            const v1429 = v1428.querySelector("textarea");
            const v1430 = v1428.querySelector("[type=\"submit\"]");
            const v1431 = v1416.querySelector("[data-comment-status]");
            const v1432 = v1416.querySelector("[data-comment-reply]");
            const v1433 = v1416.querySelector("[data-comment-reply-name]");
            const v1434 = v1416.querySelector("[data-emoji-toggle]");
            const v1435 = v1416.querySelector("[data-emoji-panel]");
            v1429.value = v1396.commentDraft;
            let v1436 = v1396.replyTo;
            if (v1436) {
              v1433.textContent = "回复 @" + v1436.name;
              v1432.hidden = false;
            }
            const v1437 = () => {
              v1436 = v1396.replyTo = "";
              v1432.hidden = true;
              v1433.textContent = "";
              v1438();
            };
            v1416.querySelector("[data-reply-cancel]").addEventListener("click", v1437);
            v1434.addEventListener("click", () => {
              v1435.hidden = !v1435.hidden;
              v1434.setAttribute("aria-expanded", String(!v1435.hidden));
            });
            v1435.addEventListener("click", v1456 => {
              const v1457 = v1456.target.closest("[data-emoji]")?.dataset.emoji;
              if (!v1457) {
                return;
              }
              const v1458 = v1429.selectionStart ?? v1429.value.length;
              const v1459 = v1429.selectionEnd ?? v1458;
              if (v1429.value.length - (v1459 - v1458) + v1457.length > 500) {
                return;
              }
              v1429.value = v1429.value.slice(0, v1458) + v1457 + v1429.value.slice(v1459);
              v1396.commentDraft = v1429.value;
              v1429.focus();
              v1429.setSelectionRange(v1458 + v1457.length, v1458 + v1457.length);
              v1438();
            });
            v1416.addEventListener("click", v1460 => {
              const v1461 = v1460.target.closest("[data-comment-profile]");
              if (v1461 && v1420()) {
                v195(v1461.dataset.commentProfile);
                return;
              }
              const v1462 = v1460.target.closest("[data-comment-more-root]");
              if (v1462 && v1420()) {
                const v1464 = v1462.dataset.commentMoreRoot;
                const v1465 = v1396.replyNext[v1464];
                v1462.disabled = true;
                v151("/wallpapers/" + v1388 + "/comments?root=" + encodeURIComponent(v1464) + "&after=" + encodeURIComponent(v1465), {
                  signal: v1391.signal
                }).then(v1466 => v1466.json()).then(v1467 => {
                  v1396.comments.push(...v1467.items);
                  v1396.replyNext[v1464] = v1467.reply_next?.[v1464] || null;
                  v1440();
                }).catch(v1468 => {
                  if (v1420()) {
                    v1462.disabled = false;
                    v13.toast(v11(), v1468.message, 3000);
                  }
                });
                return;
              }
              const v1463 = v1460.target.closest("[data-comment-reply-id]");
              if (!v1463 || !v1420()) {
                return;
              }
              v1436 = v1396.replyTo = {
                id: Number(v1463.dataset.commentReplyId),
                name: v1463.dataset.replyAuthorName,
                root: Number(v1463.dataset.commentRoot)
              };
              v1433.textContent = "回复 @" + v1436.name;
              v1432.hidden = false;
              v1438();
              v1429.focus();
            });
            const v1438 = () => {
              v1416.querySelector("[data-comment-count]").textContent = v1429.value.length + " / 500";
              v1430.disabled = v1423 || !v1429.value.trim() || v1429.value.length > 500;
            };
            v1429.addEventListener("input", () => {
              v1396.commentDraft = v1429.value;
              v1438();
            });
            v1438();
            const v1439 = (v1469, v1470 = "") => {
              const v1471 = new Date(v1469.created_at);
              const v1472 = !Number.isNaN(v1471.getTime());
              const v1473 = v1469.author_name || "车友";
              const v1474 = v1469.author_id ? " data-comment-profile=\"" + v14(v1469.author_id) + "\"" : "";
              const v1475 = v1469.parent_id && [...(v1396.comments || []), ...v1425.map(v1476 => v1476.item)].find(v1477 => v1477.id === v1469.parent_id);
              return "<article class=\"wall-market-comment\"" + (v1470 ? " data-comment-job" : "") + "><button class=\"wall-comment-avatar\" type=\"button\"" + v1474 + " aria-label=\"查看 " + v14(v1473) + " 的主页\">" + v14(Array.from(v1473)[0]) + (v1469.avatar_url ? "<img src=\"" + v14(v1469.avatar_url) + "\" alt=\"\" referrerpolicy=\"no-referrer\" onerror=\"this.remove()\">" : "") + "</button><div class=\"wall-comment-content\"><header><button class=\"wall-comment-author\" type=\"button\"" + v1474 + ">" + v14(v1473) + "</button><time" + (v1472 ? " datetime=\"" + v14(v1471.toISOString()) + "\"" : "") + ">" + v14(v1472 ? v1471.toLocaleString("zh-CN", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) : v1469.created_at) + "</time>" + (v1470 ? "<span class=\"wall-comment-send-state\">" + v14(v1470) + "</span>" : "") + "</header><p>" + (v1475 && v1469.parent_id !== v1469.root_id ? "<span class=\"wall-comment-target\">回复 @" + v14(v1475.author_name || "车友") + "：</span>" : "") + v14(v1469.content) + " " + (v1469.id ? "<button class=\"wall-comment-reply-button\" type=\"button\" data-comment-reply-id=\"" + v1469.id + "\" data-comment-root=\"" + (v1469.root_id || v1469.id) + "\" data-reply-author-name=\"" + v14(v1473) + "\" aria-label=\"回复 " + v14(v1473) + "\">回复</button>" : "") + "</p></div></article>";
            };
            const v1440 = () => {
              if (!v1420()) {
                return;
              }
              const v1478 = v1425.map(v1481 => ({
                ...v1481.item,
                sendState: v1481.state === "pending" ? "发送中…" : v1481.state === "failed" ? "发送结果未确认，请核对后重试；内容已保留" : "已发表"
              }));
              const v1479 = [...v1478, ...(v1396.comments || [])];
              const v1480 = v1479.filter(v1482 => !v1482.root_id);
              v1426.innerHTML = v1480.map(v1483 => v1439(v1483, v1483.sendState) + ("<div class=\"wall-comment-thread\">" + v1479.filter(v1484 => v1484.root_id === v1483.id).sort((v1485, v1486) => (v1485.id || Infinity) - (v1486.id || Infinity)).map(v1487 => v1439(v1487, v1487.sendState)).join("") + (v1396.replyNext[v1483.id] ? "<button class=\"btn text sm\" type=\"button\" data-comment-more-root=\"" + v1483.id + "\">加载更多回复</button>" : "") + "</div>")).join("");
              v1429.placeholder = v1479.length ? "聊聊使用感受，或给作者一点建议…" : "还没有评论，来分享第一条使用感受吧";
              v1422 = v1396.commentNext;
              v1427.hidden = !v1422;
            };
            const v1441 = v1440;
            v1424.commentListeners.add(v1441);
            v1391.signal.addEventListener("abort", () => v1424.commentListeners.delete(v1441), {
              once: true
            });
            const v1442 = () => {
              for (const v1488 of v1424.commentListeners) {
                v1488();
              }
            };
            async function v1443(v1489 = false) {
              if (v1423) {
                return;
              }
              v1423 = true;
              v1427.disabled = true;
              v1427.textContent = "正在加载…";
              v1426.setAttribute("aria-busy", "true");
              v1438();
              try {
                if (!v1396.commentRequest) {
                  const v1490 = v1489 ? v1396.commentNext : null;
                  v1396.commentRequest = v151("/wallpapers/" + v1388 + "/comments" + (v1490 ? "?before=" + encodeURIComponent(v1490) : ""), {
                    signal: v1391.signal
                  }).then(v1491 => v1491.json()).then(v1492 => {
                    v1396.comments = v1490 ? [...v1396.comments, ...v1492.items] : v1492.items;
                    v1396.commentNext = v1492.next;
                    v1396.replyNext = v1490 ? {
                      ...v1396.replyNext,
                      ...v1492.reply_next
                    } : v1492.reply_next || {};
                    for (let v1493 = v1425.length - 1; v1493 >= 0; v1493--) {
                      if (v1425[v1493].state === "sent" && v1492.items.some(v1494 => v1494.id === v1425[v1493].item.id)) {
                        v1425.splice(v1493, 1);
                      }
                    }
                  }).finally(() => {
                    v1396.commentRequest = null;
                  });
                }
                await v1396.commentRequest;
                if (v1420()) {
                  v1440();
                }
              } catch (v1495) {
                if (v1420()) {
                  v1431.textContent = "评论加载失败：" + v1495.message;
                  if (!v1489) {
                    v1426.innerHTML = "";
                  }
                  v1427.hidden = !v1422;
                }
              } finally {
                v1423 = false;
                v1427.disabled = false;
                v1427.textContent = "加载更多评论";
                v1426.setAttribute("aria-busy", "false");
                v1438();
              }
            }
            v1427.addEventListener("click", () => {
              v1431.textContent = "";
              v1443(!!v1422);
            });
            v1428.addEventListener("submit", v1496 => {
              v1496.preventDefault();
              if (!v1420()) {
                return;
              }
              const v1497 = v1429.value.trim();
              const v1498 = v1497;
              const v1499 = v1436;
              if (v1423 || !v1497 || v1498.length > 500) {
                return;
              }
              const v1500 = {
                state: "pending",
                item: {
                  content: v1498,
                  root_id: v1499?.root || null,
                  parent_id: v1499?.id || null,
                  author_name: String(v10.state.data?.user?.nick || "车友").slice(0, 80),
                  created_at: new Date().toISOString()
                }
              };
              v1425.unshift(v1500);
              v1429.value = v1396.commentDraft = "";
              v1437();
              v1435.hidden = true;
              v1434.setAttribute("aria-expanded", "false");
              v1431.textContent = "";
              v1438();
              v1442();
              v151("/wallpapers/" + v1388 + "/comments", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  content: v1498,
                  author_name: v1500.item.author_name,
                  ...(v1499 ? {
                    parent_id: v1499.id
                  } : {})
                })
              }).then(v1501 => v1501.json()).then(v1502 => {
                v1500.item = {
                  ...v1500.item,
                  ...v1502
                };
                v1500.state = "sent";
                v1442();
              }).catch(v1503 => {
                v1500.state = "failed";
                v1442();
                if (v140 === v1424) {
                  v13.toast(v11(), "评论发送失败，内容已保留：" + v1503.message, 4000);
                }
              });
            });
            if (v1396.comments) {
              v1440();
            }
            if (v1396.commentRequest || !v1396.comments) {
              v1443();
            }
            v181(v1421, v1391.signal);
            v1421();
            if (!v1396.requested) {
              v1396.requested = true;
              v151("/wallpapers/" + v1388 + "/favorite", {
                signal: v1391.signal
              }).then(v1504 => v1504.json()).then(v1505 => {
                if (!v1419()) {
                  return;
                }
                if (!v140.favorites.has(v1388)) {
                  v182(v1388, v1505);
                }
                v1396.ready = true;
                v1421();
              }).catch(v1506 => {
                if (v1419()) {
                  v1396.ready = true;
                  v13.toast(v11(), "收藏状态读取失败：" + v1506.message, 4000);
                  v1421();
                }
              });
            }
            for (const v1507 of v1415.querySelectorAll(".wall-detail-actions [data-act], .head-actions [data-act=\"admin-delete\"]")) {
              v1507.addEventListener("click", async () => {
                if (v1393 || !v1420()) {
                  return;
                }
                if (v1507.dataset.act === "favorite" && v1394 !== null) {
                  v183(v1388, v140.favorites.get(v1388));
                  return;
                }
                v1393 = true;
                for (const v1516 of v1415.querySelectorAll(".wall-detail-actions button, .head-actions [data-act=\"admin-delete\"]")) {
                  v1516.disabled = true;
                }
                const v1508 = v1507.dataset.act;
                let v1509;
                let v1510;
                let v1511 = false;
                const v1512 = new AbortController();
                const v1513 = () => v1419() && !v1511;
                const v1514 = (v1517 = 0, v1518 = "") => "<div class=\"wall-save-status\" role=\"status\" aria-live=\"polite\"" + (v1517 < 2 && !v1518 ? " aria-busy=\"true\"" : "") + ">\n              " + (v1518 ? "<div class=\"wall-save-error\">" + v13.icon("alert", 48) + "<p>" + v14(v1518) + "</p></div><p class=\"muted\">点击外部关闭</p>" : v1517 === 2 ? "<div class=\"wall-save-success\">" + v13.icon("check", 64) + "</div><p class=\"wall-save-title\">保存成功</p>" : "<p class=\"wall-save-title\">保存中…</p><div class=\"wall-save-steps\">" + ["下载壁纸", "上传到 ZEEHO 官方"].map((v1519, v1520) => "<div class=\"wall-save-step" + (v1520 < v1517 ? " is-done" : v1520 === v1517 ? " is-active" : "") + "\"><div>" + v14(v1519) + (v1520 < v1517 ? v13.icon("check", 16) : "") + "</div>\n                    <div class=\"wall-save-track\" role=\"progressbar\" aria-label=\"" + v14(v1519) + "\" aria-valuemin=\"0\" aria-valuemax=\"100\"" + (v1520 === v1517 ? "" : " aria-valuenow=\"" + (v1520 < v1517 ? 100 : 0) + "\"") + "><span></span></div></div>").join("") + "</div>") + "</div>";
                const v1515 = v1508 === "save-plan" && !!v1390.vin && v143();
                v1421();
                if (v1508 === "save-plan" && !v1515) {
                  v1509 = v1396.saving = v42({
                    key: "wall-save-progress",
                    center: true,
                    className: "wall-page wall-save-progress",
                    title: "保存方案",
                    closeMode: "none",
                    body: v1514(),
                    onDismiss: () => {
                      clearTimeout(v1510);
                      v1511 = true;
                      v1512.abort();
                      for (const v1521 of v1397) {
                        v1521();
                      }
                      v1396.saving = null;
                    }
                  });
                }
                try {
                  if (v1508 === "admin-delete") {
                    if (!v140?.admin) {
                      throw new Error("只有超管可以删除市场资源");
                    }
                    const v1522 = await new Promise(v1524 => {
                      let v1525;
                      let v1526 = false;
                      v1525 = v42({
                        key: "wall-admin-delete",
                        center: true,
                        title: "删除作品",
                        body: "<div class=\"wall-confirm-copy\">删除「" + v14(v1405.name) + "」后所有车友都看不到了，无法恢复。</div>\n                      <div class=\"wall-actions-stack\"><button class=\"btn block\" type=\"button\" data-act=\"cancel\">取消</button>\n                      <button class=\"btn block primary\" type=\"button\" data-act=\"confirm\">确认删除</button></div>",
                        onDismiss: () => v1524(v1526),
                        onMount: v1527 => {
                          v1527.querySelector("[data-act=\"cancel\"]").addEventListener("click", () => v13.closeSheet(v1525));
                          v1527.querySelector("[data-act=\"confirm\"]").addEventListener("click", () => {
                            v1526 = true;
                            v13.closeSheet(v1525);
                          });
                        }
                      });
                    });
                    if (!v1522) {
                      v1393 = false;
                      v1421();
                      return;
                    }
                    const v1523 = v140;
                    v1523.withdrawn.add(v1388);
                    v1523.entries = new Map();
                    if (v1419()) {
                      v13.closeSheet(v1392);
                      v142?.();
                    }
                    v151("/wallpapers/" + v1388, {
                      method: "DELETE"
                    }).then(() => {
                      if (v140 === v1523) {
                        v13.toast(v11(), "作品已删除", 2600);
                      }
                    }).catch(async v1528 => {
                      if (v140 !== v1523) {
                        return;
                      }
                      let v1529 = false;
                      if (!v1528.status || v1528.status >= 500 || v1528.status === 408) {
                        try {
                          await v151("/wallpapers/" + v1388 + "/comments");
                        } catch (v1530) {
                          v1529 = v1530.status === 404;
                        }
                      }
                      if (v140 !== v1523) {
                        return;
                      }
                      if (!v1529) {
                        v1523.withdrawn.delete(v1388);
                      }
                      v1523.entries = new Map();
                      v142?.();
                      v13.toast(v11(), v1529 ? "作品已删除" : "删除未确认，已恢复显示：" + v1528.message, 4000);
                    });
                    return;
                  }
                  if (v1508 === "favorite") {
                    v146();
                    const v1531 = v1394 === null ? "GET" : v1394 ? "DELETE" : "PUT";
                    const v1532 = await (await v151("/wallpapers/" + v1388 + "/favorite", {
                      method: v1531,
                      signal: v1391.signal
                    })).json();
                    if (v1419()) {
                      v1394 = v1532.favorited;
                      v1403.favorites_count = v1532.favorites_count;
                      v182(v1388, v1532);
                      v1396.ready = true;
                      v1421();
                    }
                  } else if (v1508 === "save-plan") {
                    if (!v1390.vin) {
                      throw new Error("请先选择车辆，再保存方案");
                    }
                    if (v17.writeBusy) {
                      throw new Error("正在保存其他壁纸，请稍后再试");
                    }
                    if (!v1396.task) {
                      const v1533 = v1405.previews ? null : await (await v151("/wallpapers/" + v1388 + "/bundle?download=1", {
                        signal: v1512.signal
                      })).json();
                      if (!v1513()) {
                        return;
                      }
                      const v1534 = window.WALLMARKET.validate(v1533?.manifest || v1405);
                      const v1535 = v51();
                      if (v1535) {
                        throw new Error(v1535);
                      }
                      const v1536 = v50();
                      const v1537 = v1536.width && v1536.height ? {
                        w: v1536.width,
                        h: v1536.height
                      } : v1534.canvas;
                      const v1538 = v1536.width && v1536.height ? v16.wallpaperSpeedCardBox({
                        ...v1537,
                        model: v1536.model
                      }) || v1534.speedBox : v1534.speedBox;
                      let v1539 = !v1533 ? new File([await v174({
                        manifest: v1534,
                        key: "main"
                      }, v1541 => v177(v1403.images[v1541], null, true), v1397)], "main.png", {
                        type: "image/png"
                      }) : await v197(v1533.files?.[v1534.v >= 2 ? window.WALLMARKET.sourceFile(v1534, "main") : "main.jpg"], "main", v1397, v1534);
                      if (!v1513()) {
                        return;
                      }
                      let v1540 = v1534.layers.length === 2 ? !v1533 ? new File([await v174({
                        manifest: v1534,
                        key: "speed"
                      }, v1542 => v177(v1403.images[v1542], null, true), v1397)], "speed.png", {
                        type: "image/png"
                      }) : await v197(v1533.files?.[v1534.v >= 2 ? window.WALLMARKET.sourceFile(v1534, v1534.layers[1].source) : "speed.jpg"], "speed", v1397, v1534) : null;
                      if (!v1513()) {
                        return;
                      }
                      if (v1534.canvas.w !== v1537.w || v1534.canvas.h !== v1537.h) {
                        v1539 = await v198(v1539, v1537, v1397);
                      }
                      if (v1540 && (Math.round(v1534.speedBox.w) !== Math.round(v1538.w) || Math.round(v1534.speedBox.h) !== Math.round(v1538.h))) {
                        v1540 = await v198(v1540, v1538, v1397);
                      }
                      if (!v1513()) {
                        return;
                      }
                      if (!v1533) {
                        await v151("/wallpapers/" + v1388 + "/download", {
                          method: "POST",
                          signal: v1512.signal
                        });
                      }
                      if (!v1513()) {
                        return;
                      }
                      v1396.task = {
                        scope: v1390,
                        name: v1534.name,
                        mainFile: v1539,
                        speedFile: v1540,
                        canvas: v1537,
                        speedBox: v1538,
                        silent: true,
                        fromMarket: true
                      };
                    }
                    if (v1515) {
                      await v199(v1396.task, v1390, v1513, v1397);
                      return;
                    }
                    if (v1513() && v38(v1509)) {
                      v13.updateSheet(v1509, {
                        body: v1514(1)
                      });
                    }
                    v1396.task.signal = v1512.signal;
                    await v203(v1396.task, v1513);
                    if (v1513() && !v1396.task.uploadedId) {
                      throw new Error("正在保存其他壁纸，请稍后再试");
                    }
                    if (v1389 && v1513() && v1396.task.uploadedId) {
                      const v1543 = v17.walls.find(v1544 => String(v1544.id) === v1396.task.uploadedId);
                      if (!v1543) {
                        throw new Error("方案已保存，请在车机壁纸列表刷新后应用");
                      }
                      v86();
                      v104(v1543.id);
                      v108(v1543);
                    }
                  }
                  if (v1509 && v1513() && v38(v1509)) {
                    v13.updateSheet(v1509, {
                      body: v1514(2)
                    });
                    v1510 = setTimeout(() => {
                      if (v1513() && v38(v1509)) {
                        v13.closeSheet(v1509);
                      }
                    }, 800);
                  }
                } catch (v1545) {
                  if (v1509 && v1513() && v38(v1509)) {
                    v13.updateSheet(v1509, {
                      closeMode: "current",
                      body: v1514(0, v1545.message || "保存失败，请稍后重试")
                    });
                  } else if (!v1509 && v1419()) {
                    v13.toast(v11(), v1545.message || "操作失败，请稍后重试", 4000);
                  }
                } finally {
                  v1393 = false;
                  v1421();
                }
              });
            }
            if (v1389 && !v1395) {
              v1395 = true;
              v1418.querySelector("[data-act=\"save-plan\"]").click();
            }
          }
        });
      } catch (v1546) {
        if (v37(v1390) && v38(v1392) && !v1391.signal.aborted) {
          v13.updateSheet(v1392, {
            body: "<div class=\"wall-empty\" role=\"status\">" + v14(v1546.message) + "</div>"
          });
        }
      }
    }
    const v201 = "2";
    const v202 = "1";
    async function v203(v1547, v1548) {
      const v1549 = v51(v1547.fromMarket ? null : v1547);
      if (v1549) {
        throw new Error(v1549);
      }
      if (v143()) {
        throw new Error(v113);
      }
      const v1550 = v1547.scope;
      const v1551 = v15.ep("wallpaper_save");
      if (!v1551) {
        throw new Error("暂时无法上传壁纸");
      }
      const v1552 = {
        vinNo: v1550.vin
      };
      const v1553 = window.ZEEHO_SIGN.toQuery(v1552);
      const v1554 = window.ZEEHO_SIGN.baseFor(v1551.tag) + v1551.path + (v1553 ? "?" + v1553 : "");
      if (!v1548() || v17.writeBusy) {
        return;
      }
      const v1555 = v34(v1550, "wallpaper-upload");
      v17.writeBusy = true;
      try {
        if (v1547.uploadedId) {
          await v66(v1550, {
            logScope: v1555
          });
          return;
        }
        const v1556 = v1550.requestToken.trim().replace(/^bearer\s+/i, "");
        if (!v1556) {
          throw new Error("登录信息不可用，请重新登录");
        }
        if (!v1548()) {
          return;
        }
        const v1557 = new FormData();
        v1557.append("wallpaperName", v1547.name);
        v1557.append("files", v1547.mainFile, v1547.mainFile.name);
        v1557.append("types", v201);
        if (v1547.speedFile) {
          v1557.append("files", v1547.speedFile, v1547.speedFile.name);
          v1557.append("types", v202);
        }
        const v1558 = window.ZEEHO_SIGN.buildHeaders(v1551.tag, v1552, "", "POST", v1556, {
          appLike: false
        }) || {};
        delete v1558["Content-Type"];
        delete v1558["content-type"];
        const v1559 = {
          multipart: true,
          images: v1547.speedFile ? 2 : 1,
          fileBytes: v1547.mainFile.size + (v1547.speedFile?.size || 0),
          fileTypes: [v1547.mainFile, v1547.speedFile].filter(Boolean).map(v1567 => v1567.type),
          nameLength: v1547.name.length
        };
        v35("壁纸上传开始", v1555, {
          phase: "start",
          extra: v1559
        });
        let v1560;
        let v1561;
        v1547.inFlight = true;
        try {
          v1560 = await v15.fetchDiag("wallpaper_save", v1554, {
            method: "POST",
            headers: v1558,
            body: v1557,
            cache: "no-store",
            ...(v1547.signal ? {
              signal: v1547.signal
            } : {})
          }, {
            scope: v1550.actor,
            logScope: v1555,
            runId: v1555?.runId,
            bodySummary: v1559,
            isLatest: v1548
          });
          try {
            v1561 = JSON.parse(v1560.text);
          } catch {}
        } catch {
          v35("壁纸上传结果未知", v1555, {
            phase: "end",
            kind: "err",
            extra: {
              ...v1559,
              accepted: false,
              uncertain: true
            }
          });
          v1547.resultText = "上传结果未知，请刷新列表确认，暂不重复上传。";
          throw new Error(v1547.resultText);
        } finally {
          v1547.inFlight = false;
        }
        const v1562 = v1561 && typeof v1561 === "object" && ["string", "number"].includes(typeof v1561.code);
        const v1563 = v1560.status >= 200 && v1560.status < 300;
        const v1564 = v1563 && v1562 && String(v1561.code) === "10000";
        v35("壁纸上传结果", v1555, {
          phase: "end",
          kind: v1564 ? "ok" : "err",
          extra: {
            ...v1559,
            accepted: v1564,
            uncertain: !v1563 || !v1562,
            http: v1560.status,
            adopted: v1548()
          }
        });
        if (!v1563 || !v1562) {
          v1547.resultText = "上传结果未知，请刷新列表确认，暂不重复上传。";
          throw new Error(v1547.resultText);
        }
        if (!v1564) {
          v1547.resultText = "上传失败：" + v40(v1561, "服务器未接受上传") + "。";
          throw new Error(v1547.resultText);
        }
        const v1565 = v1561.data === null || v1561.data === undefined ? "" : String(v1561.data).trim();
        if (!/^\d+$/.test(v1565)) {
          v1547.resultText = "上传接口已成功，但没返回壁纸 id。请刷新列表确认。";
          throw new Error(v1547.resultText);
        }
        v1547.uploadedId = v1565;
        const v1566 = await v62(v1550, v1565, v1555);
        if (v1566.state === "rejected") {
          v1547.resultText = v1566.reason ? "审核不通过：" + v1566.reason : "审核不通过";
        } else {
          v163(v1547).catch(() => {
            v1547.marketQueueError = true;
          });
          v1547.resultText = "已保存到我的壁纸。";
        }
        if (!v1548()) {
          return;
        }
        if (!v1547.silent) {
          if (v1566.state === "rejected") {
            v13.toast(v11(), v1547.resultText, 6000);
          } else {
            v13.toast(v11(), "上传成功，已保存到我的壁纸", 2800);
          }
        }
        await v66(v1550, {
          logScope: v1555
        });
      } finally {
        v35("上传壁纸流程结束", v1555, {
          phase: v1548() ? "end" : "cancelled",
          detail: "流程结束不代替服务端上传结果",
          extra: {
            images: v1547.speedFile ? 2 : 1
          }
        });
        v17.writeBusy = false;
        v56();
      }
    }
    const v204 = v1568 => {
      const v1569 = String(v1568 ?? "").toLowerCase();
      return {
        success: "升级成功",
        succeeded: "升级成功",
        failed: "升级失败",
        error: "升级失败",
        downloading: "下载中",
        upgrading: "升级中",
        waiting: "等待升级",
        canceled: "已取消",
        cancelled: "已取消"
      }[v1569] || "状态未知";
    };
    async function v205(v1570) {
      if (!v28()) {
        return false;
      }
      v1570 ||= v46();
      if (!v52()) {
        return false;
      }
      const v1571 = v17.otaHandle;
      if (!v1570.vin || !v37(v1570) || !v38(v1571)) {
        return false;
      }
      const v1572 = ++v17.otaSeq;
      v17.checkSeq++;
      v17.checkBusy = false;
      const v1573 = () => v37(v1570) && v52() && v38(v1571) && v1572 === v17.otaSeq;
      v17.otaLoading = true;
      v17.otaError = "";
      v17.otaContentError = "";
      v17.ota = null;
      v17.otaFiles = [];
      v207(v1571);
      const v1574 = v34(v1570, "ota-read");
      v35("仪表固件读取开始", v1574, {
        phase: "start"
      });
      const [v1575, v1576] = await Promise.all(["ota_info", "ota_content"].map(v1577 => v41(v1577, v1570, {}, v1573, v1574)));
      v35("仪表固件读取结束", v1574, {
        phase: "end",
        kind: v1575.ok && v1576.ok ? "ok" : "err",
        extra: {
          resultOk: !!v1575.ok,
          contentOk: !!v1576.ok,
          adopted: v39(v1575, v1573) && v39(v1576, v1573),
          readOnly: true
        }
      });
      if (!v39(v1575, v1573) || !v39(v1576, v1573)) {
        return false;
      }
      v17.otaLoading = false;
      if (!v1575.ok) {
        v17.otaError = v40(v1575, "固件信息读取失败");
      } else {
        v17.ota = v16.normalizeOtaInfo({
          data: v1575.data
        });
        if (v17.ota.file) {
          v17.otaFiles.push({
            ...v17.ota.file,
            source: "仪表 OTA"
          });
        }
      }
      if (!v1576.ok) {
        v17.otaContentError = v40(v1576, "官方 OTA 内容读取失败");
      } else {
        for (const v1578 of v16.findOtaFiles({
          fileInfoList: v1576.data?.fileInfoList
        })) {
          if (!v17.otaFiles.some(v1579 => v1579.url === v1578.url && v1579.name === v1578.name)) {
            v17.otaFiles.push({
              ...v1578,
              source: "官方 OTA 内容（请核对适用部件）"
            });
          }
        }
      }
      v207(v1571);
      return !!v1575.ok && !!v1576.ok;
    }
    function v206() {
      const v1580 = v17.ota;
      let v1581;
      if (v17.otaLoading) {
        v1581 = "<div class=\"wall-empty\">正在读取固件信息…</div>";
      } else if (v17.otaError) {
        v1581 = "<div class=\"wall-empty\">读取失败：" + v14(v17.otaError) + "</div>";
      } else if (!v1580?.present) {
        v1581 = "<div class=\"wall-empty\">没有读到固件信息：服务端未返回仪表 OTA 任务，暂时不能判断更新状态</div>";
      } else {
        v1581 = "" + v13.kv("当前车机版本", v1580.softwareVersion || "暂未读到") + (v1580.otaVersion ? v13.kv("服务端目标版本", v1580.otaVersion) : "") + "\n      " + v13.kv("升级状态", v204(v1580.upgradeStatus)) + v13.kv("仪表下发包", v1580.file ? "已下发，见下方包列表" : "当前没有下发包");
      }
      const v1582 = v17.otaFiles.map((v1586, v1587) => v13.kv(v1586.source, "" + (v1586.name || "未命名安装包") + (v1586.sizeText ? " · " + v1586.sizeText : "")) + "\n      " + (v1586.url ? "<div class=\"wall-actions-stack\"><button class=\"btn block\" type=\"button\" data-act=\"otacopy\" data-file=\"" + v1587 + "\">复制打码地址</button><button class=\"btn block\" type=\"button\" data-act=\"otareveal\" data-file=\"" + v1587 + "\">显示完整下载地址</button></div><div class=\"wall-raw mono\">" + v14(v1586.maskedUrl || v16.maskSignedUrl(v1586.url)) + "</div>" : "")).join("");
      const v1583 = !v17.otaLoading && !v17.otaError && v1580?.present && !!v1580.softwareVersion && !v17.checkBusy;
      const v1584 = v52() && window.NativeShell?.has("openMeterOta") === true;
      const v1585 = "<div class=\"wall-sub\">AE5I 本地固件升级</div><div class=\"card-sub\">仅 AE5I · 5 寸 Sunplus Gemini 仪表。准备匹配的 .bin 文件，连接仪表 Wi-Fi 后推送。</div>\n      <button class=\"btn block mt12\" type=\"button\" data-act=\"otalocal\"" + (v1584 ? "" : " disabled") + ">打开 AE5I Wi-Fi OTA</button>\n      " + (v1584 ? "" : "<div class=\"card-sub\">本地 OTA unavailable：" + window.PLATFORM.message("本地 OTA", "compat.openMeterOta") + "</div>");
      return v1585 + "\n      <div class=\"wall-sub mt12\">在线固件信息</div>" + v1581 + v1582 + "\n      " + (!v17.otaLoading ? "<div class=\"card-sub\">" + (v17.otaContentError ? "官方 OTA 内容读取失败：" + v14(v17.otaContentError) : "官方 OTA 内容查询完成" + (v17.otaFiles.some(v1588 => v1588.source !== "仪表 OTA") ? "" : "，未返回额外安装包")) + "。未返回包不代表已是最新。</div>" : "") + "\n      <div class=\"wall-actions-stack\"><button class=\"btn block primary\" type=\"button\" data-act=\"otacheck\"" + (v1583 ? "" : " disabled") + ">" + (v17.checkBusy ? "正在检查…" : "检查更新") + "</button>\n      <button class=\"btn block\" type=\"button\" data-act=\"otareload\"" + (v17.otaLoading ? " disabled" : "") + ">重新读取</button></div>\n      " + (!v17.otaLoading && !v17.otaError && v1580?.present && !v1580.softwareVersion ? "<div class=\"card-sub\">缺少当前已安装版本，暂时不能检查更新。</div>" : "") + "\n      <div class=\"note info mt12\">" + v13.icon("info", 18) + "<div>在线区域只读取固件信息和检查更新，不会触发车辆升级。本地推送需在升级页另行确认；不支持从仪表提取固件。</div></div>";
    }
    function v207(v1589 = v17.otaHandle) {
      const v1590 = v17.scope;
      if (!v37(v1590) || !v38(v1589)) {
        return;
      }
      const v1591 = v17.otaFiles;
      const v1592 = () => v37(v1590) && v38(v1589) && v17.otaFiles === v1591;
      v13.updateSheet(v1589, {
        body: v206(),
        onMount: v1593 => {
          v1593.querySelector("[data-act=\"otalocal\"]")?.addEventListener("click", async () => {
            if (!v52() || !v37(v1590) || !v38(v1589) || !window.NativeShell?.has("openMeterOta")) {
              return;
            }
            try {
              if (v10.isIOS?.()) {
                await v10.syncIOSSession?.();
              }
              if (!v1592()) {
                return;
              }
              const v1594 = v10.isIOS?.() ? v10.getNativeUiContext?.() : null;
              const v1595 = v1594?.navId || new URL(window.location.href).searchParams.get("_shellNav") || "";
              if (!v1595) {
                throw new Error("missing navigation");
              }
              const v1596 = await window.NativeShell.call("openMeterOta", [v1595], v1594 || undefined);
              if (v10.isIOS?.() && v1596?.ok !== true) {
                throw new Error("native_rejected");
              }
            } catch {
              if (v1592()) {
                v13.toast(v11(), "无法打开仪表升级页，请更新 App 后重新进入", 3600);
              }
            }
          });
          v1593.querySelector("[data-act=\"otacheck\"]")?.addEventListener("click", v209);
          v1593.querySelector("[data-act=\"otareload\"]")?.addEventListener("click", () => v205(v1590));
          v1593.querySelectorAll("[data-act=\"otacopy\"]").forEach(v1597 => v1597.addEventListener("click", async () => {
            const v1598 = v1591[Number(v1597.dataset.file)];
            if (!v1598?.url || !v1592()) {
              return;
            }
            try {
              await navigator.clipboard.writeText(v1598.maskedUrl || v16.maskSignedUrl(v1598.url));
              if (v1592()) {
                v13.toast(v11(), "已复制打码地址", 2400);
              }
            } catch {
              if (v1592()) {
                v13.toast(v11(), "复制失败，可长按打码地址选择", 3000);
              }
            }
          }));
          v1593.querySelectorAll("[data-act=\"otareveal\"]").forEach(v1599 => v1599.addEventListener("click", () => {
            const v1600 = v1591[Number(v1599.dataset.file)];
            if (!v1600?.url || !v1592()) {
              return;
            }
            v106({
              title: "显示完整下载地址",
              sub: "地址含临时访问凭证，请勿分享",
              scope: v1590,
              body: "确认后才显示完整地址。请注意周围环境，避免被他人看到或截图。",
              actionLabel: "确认显示",
              needCheck: false,
              exclusive: false,
              run: async (v1601, v1602) => {
                if (!v1592() || !v1601()) {
                  return;
                }
                v13.closeSheet(v1602);
                v42({
                  key: "",
                  center: true,
                  title: "完整下载地址",
                  sub: "含临时访问凭证，请勿分享",
                  body: "<div class=\"wall-raw mono\">" + v14(v1600.url) + "</div>"
                });
              }
            });
          }));
        }
      });
    }
    function v208() {
      if (window.PLATFORM.preview()) {
        return v29("ota");
      }
      if (!v28()) {
        return null;
      }
      const v1603 = v46();
      if (!v1603.vin) {
        v13.toast(v11(), "还没读到车辆 VIN，稍后再试", 3000);
        return null;
      }
      if (!v52()) {
        v13.toast(v11(), "仪表固件仅适配 AE5、AE5i 和 AE5i Pro", 3600);
        return null;
      }
      if (v38(v17.otaHandle)) {
        v207();
        return v1603;
      }
      v17.otaHandle = v42({
        key: "ota",
        full: true,
        title: "仪表固件",
        sub: v10.isIOS?.() ? "在线查询" : "在线查询 · AE5I Wi-Fi OTA",
        body: "<div class=\"wall-empty\">正在读取固件信息…</div>",
        onDismiss: () => {
          v17.otaSeq++;
          v17.checkSeq++;
          v17.otaHandle = null;
          v17.checkBusy = false;
        }
      });
      v205(v1603);
      return v1603;
    }
    async function v209() {
      if (!v28()) {
        return false;
      }
      if (!v52()) {
        return false;
      }
      const v1604 = v17.scope;
      const v1605 = v17.otaHandle;
      const v1606 = v17.ota?.softwareVersion;
      if (!v37(v1604) || !v38(v1605) || v17.otaLoading || v17.otaError || !v1606 || v17.checkBusy) {
        return;
      }
      const v1607 = ++v17.checkSeq;
      const v1608 = v17.otaSeq;
      const v1609 = () => v37(v1604) && v52() && v38(v1605) && v1607 === v17.checkSeq && v1608 === v17.otaSeq;
      v17.checkBusy = true;
      v207(v1605);
      const v1610 = v34(v1604, "ota-check");
      v35("仪表固件检查开始", v1610, {
        phase: "start",
        extra: {
          readOnly: true
        }
      });
      const v1611 = await v41("ota_check_version", v1604, {
        ctx: {
          targetVersion: v1606
        }
      }, v1609, v1610);
      v35("仪表固件检查结束", v1610, {
        phase: "end",
        kind: v1611.ok ? "ok" : "err",
        extra: {
          resultOk: !!v1611.ok,
          adopted: v39(v1611, v1609),
          readOnly: true
        }
      });
      if (!v39(v1611, v1609)) {
        return;
      }
      v17.checkBusy = false;
      v207(v1605);
      if (!v1611.ok) {
        return v13.toast(v11(), "检查失败：" + v40(v1611), 3600);
      }
      const v1612 = v16.normalizeCheckVersion({
        data: v1611.data
      }, {
        currentVersion: v1606
      });
      v35("仪表固件版本判定", v1610, {
        phase: "accepted",
        extra: {
          hasUpdate: v1612.hasUpdate ?? null,
          readOnly: true
        }
      });
      v13.toast(v11(), v1612.hasUpdate === true ? "有新版（当前 " + v1606 + "）" : v1612.hasUpdate === false ? "当前版本没有可用更新" : "检查结果未知，请稍后重试", 3000);
    }
    v10.media = {
      MEDIA: v17,
      resetContext: v45,
      refreshConnection: v49,
      syncRoute: v26,
      refreshMarketReplies: v193,
      openMarketReply: v194,
      replyAlertsEnabled: v192,
      openWallpapers: v86,
      loadWallpaper: v66,
      openWallpaper: v104,
      openEditor: v115,
      openMarket: v196,
      openWallpaperExperiment: v81,
      loadWallpaperExperimentCanvas: v83,
      wallpaperExperimentSpec: v84,
      wallpaperOperationReason: v51,
      instrumentCapabilities: v50,
      applyWallpaper: v108,
      deleteWallpaper: v109,
      restoreDefaultWallpaper: v110,
      clearProgress: v112,
      openOta: v208,
      loadOta: v205,
      checkOta: v209,
      otaStatusText: v204,
      summary: () => v37(v17.scope) ? {
        walls: v17.walls.length,
        count: v17.wallsCount,
        error: v17.wallsError,
        ota: v17.ota?.softwareVersion || ""
      } : {
        walls: 0,
        count: null,
        error: "",
        ota: ""
      }
    };
    v9(v170);
  });
  (v1613 => {
    if (window.LAZY_FEATURE) {
      window.LAZY_FEATURE.register(window.APP, "wallpaperExperiment", v1613);
    } else {
      v1613();
    }
  })(() => {
    const v1614 = window.APP;
    const v1615 = window.UI;
    const v1616 = window.API;
    const v1617 = window.MODEL.esc;
    const v1618 = 8388608;
    const v1619 = 16773120;
    const v1620 = 45000;
    const v1621 = 125000;
    const v1622 = {
      pairing: "读取车机配对信息",
      "read-images": "读取裁剪图片",
      "native-begin": "等待 App 受理本地打包",
      "native-package": "本机生成和校验壁纸包"
    };
    let v1623 = null;
    let v1624 = 0;
    const v1625 = {
      initializing: "正在准备本地包",
      prepare: "正在准备本地包",
      prepared: "本地壁纸包已准备好",
      ready: "任务就绪",
      "confirm-preparation": "确认本地包准备完成",
      connect: "正在连接车机",
      check: "检查车机连接",
      "wifi-settings": "打开 Wi-Fi 设置",
      apply: "正在下发壁纸",
      hashing: "校验本地包",
      waiting_info_ack: "等待车机接收确认",
      sending: "正在传输壁纸",
      waiting_complete_ack: "等待传输完成确认",
      waiting_verification: "等待车机校验",
      verified: "车机校验通过",
      done: "车机校验通过，请查看仪表实际显示",
      initialization_failed: "车辆信息不完整或已失效，请刷新车况",
      preparation_failed: "本地包生成失败，请检查图片后重新准备",
      preparation_not_confirmed: "请先确认准备完成",
      permission_denied: "连接权限未授权",
      connection_failed: "连接失败，请检查车机后重试",
      timeout: "操作超时",
      package_not_ready: "本地包尚未准备好",
      not_connected: "尚未连接目标车机",
      transfer_failed: "下发失败，请检查连接",
      result_unknown: "传输中断，车机结果未知，请检查仪表",
      stale_session: "车辆或账号已变更，请重新进入",
      stale_navigation: "页面已失效，请重新进入",
      worker_busy: "上一项操作还未结束",
      busy_or_initializing: "任务正在准备",
      auto_unavailable: "车辆不支持自动连接",
      ssid_unknown: "读不到当前 Wi-Fi 名称。手动连热点也不保证 App 能读取 SSID；请检查 Wi-Fi 信息权限后重试",
      ssid_timeout: "读取当前 Wi-Fi 名称超时，请稍后检查连接",
      route_not_verified: "尚未验证目标车机网络路径；请检查热点和车机页面后重试",
      route_unverified: "车机网络路径未确认；Wi-Fi 名称、本地地址或目标路径有一项无法验证",
      ssid_or_local_route_unverified: "尚不能确认 Wi-Fi 名称或车机本地路由；请检查 Wi-Fi 信息权限、热点和 VPN",
      route_unavailable: "找不到通往车机的网络路径；请连接车机热点后重试",
      wifi_path_unavailable: "没有可用的 Wi-Fi 网络接口，请连接车机热点后重试",
      wifi_route_not_exclusive: "网络出口不唯一，无法确认车机直连路径；请暂时关闭 VPN 后重试",
      ambiguous_wifi_path: "网络出口不唯一，无法确认车机直连路径；请暂时关闭 VPN 后重试",
      local_endpoint_unverified: "无法确认连接使用了车机 Wi-Fi 本地地址，请重新检查热点",
      source_ip_unverified: "无法确认手机在车机 Wi-Fi 上的本地地址，请重连热点",
      vehicle_port_unreachable: "无法访问车机服务，请确认车机停在壁纸页面且热点已开启",
      vehicle_port_refused: "车机当前未接受连接，请让车机停在壁纸页面",
      vehicle_port_timeout: "等待车机网络服务超时，请确认车机已准备好后重试"
    };
    const v1626 = v1654 => typeof v1654 === "string" && Object.hasOwn(v1625, v1654);
    const v1627 = v1655 => v1626(v1655) ? v1625[v1655] : "操作未完成，请检查后重试";
    const v1628 = ({
      error: v1656,
      status: v1657
    }) => v1656 || (/(?:_failed|_denied|_unknown)$/.test(v1657) || v1657 === "timeout" ? v1657 : "");
    const v1629 = new Set(["running", "error", "downloading", "downloaded", "busy", "invalid_ticket", "stale_ticket", "invalid_action", "wifi_settings_failed", "package_changed", "stale_asset", "asset_failed", "asset_begin_invalid", "asset_short_read", "socket_read_invalid", "socket_short_write", "unavailable", "foreground_required", "stale_context", "system_cancelled", "user_cancelled"]);
    const v1630 = v1658 => v1626(v1658) || v1629.has(v1658) ? v1658 : "";
    const v1631 = (v1659, v1660, v1661, v1662) => v1659.report?.(v1660, v1661, {
      attempt: v1659.attempt,
      ...v1662
    });
    function v1632() {
      const v1663 = new Uint8Array(1);
      do {
        crypto.getRandomValues(v1663);
      } while (v1663[0] >= 250);
      return String(v1663[0] % 10 + 1);
    }
    function v1633(v1664) {
      return !!v1664 && v1623 === v1664 && !v1664.closed && v1614.current(v1664.scope) && v1664.accountGen === v1616.accountGen && v1664.tab === v1614.state.tab && (!v1664.ticket || v1614.wallpaperTransferCurrent(v1664.ticket));
    }
    function v1634(v1665) {
      if (v1633(v1665) && (!v1665.handle || v1615.sheetAlive(v1665.handle))) {
        return true;
      }
      v1638(v1665, "no_longer_current");
      return false;
    }
    function v1635(v1666) {
      clearTimeout(v1666.timer);
      v1666.timer = 0;
      v1666.revision++;
      clearTimeout(v1666.packageTimer);
      v1666.packageTimer = 0;
      v1666.prepareStage = "";
      if (v1666.stopPreparing) {
        v1666.stopPreparing(new Error("准备已取消"));
      }
      v1666.stopPreparing = null;
      for (const v1667 of v1666.readers) {
        try {
          v1667.abort();
        } catch {}
      }
      v1666.readers.clear();
      if (v1666.ticket) {
        v1614.cancelWallpaperTransfer(v1666.ticket);
      }
      v1666.ticket = "";
      for (const v1668 of v1666.previews) {
        if (v1668) {
          URL.revokeObjectURL(v1668);
        }
      }
      v1666.previews = [];
      v1666.snapshot = {};
      v1666.profile = null;
      v1666.spec = null;
      v1666.autoAvailable = null;
      v1666.mode = "auto";
      v1666.confirmed = false;
      v1666.pending = "";
      v1666.name = "";
      v1666.num = "";
      v1666.pollError = "";
      v1666.lastSnapshot = "";
      v1666.seen.clear();
    }
    function v1636(v1669, v1670, v1671, v1672) {
      v1631(v1669, "prepare", "failed", {
        failedAt: v1670,
        code: v1671
      });
      const v1673 = v1669.num;
      v1635(v1669);
      v1669.num = v1673;
      v1669.busy = false;
      v1669.error = v1672;
      v1651(v1669);
    }
    function v1637(v1674) {
      v1674.editor?.dismiss?.();
      v1674.editor = null;
    }
    function v1638(v1675 = v1623, v1676 = "dismissed") {
      if (!v1675 || v1675.closed) {
        return;
      }
      v1631(v1675, "close", "end", {
        reason: v1676,
        hadTask: !!v1675.ticket,
        nativeStage: v1630(v1675.snapshot.stage)
      });
      v1675.closed = true;
      if (v1675.confirmHandle && v1615.sheetAlive(v1675.confirmHandle)) {
        v1615.closeSheet(v1675.confirmHandle);
      }
      v1637(v1675);
      v1635(v1675);
      window.removeEventListener("pagehide", v1675.onHide);
      if (v1623 === v1675) {
        v1623 = null;
      }
      if (v1675.handle && v1615.sheetAlive(v1675.handle)) {
        v1615.closeSheet(v1675.handle);
      }
    }
    function v1639(v1677) {
      if (!v1634(v1677)) {
        return;
      }
      if (v1677.confirmHandle && v1615.sheetAlive(v1677.confirmHandle)) {
        v1615.closeSheet(v1677.confirmHandle);
      }
      const v1678 = v1677.pending === "apply" || v1677.snapshot.status !== "done" && v1677.snapshot.operation === "apply" && (v1677.snapshot.busy || v1677.snapshot.sendProgress > 0 || v1677.snapshot.error === "result_unknown");
      v1631(v1677, "cancel-preparation", "cancelled", {
        resultUnknown: v1678,
        hadTask: !!v1677.ticket
      });
      v1637(v1677);
      v1635(v1677);
      v1677.error = v1678 ? "已停止后续发送，车机结果未知；请检查仪表" : "已取消准备";
      v1677.prepOpen = true;
      v1677.sendOpen = false;
      v1677.busy = false;
      v1646(v1677);
      v1651(v1677);
    }
    function v1640(v1679, v1680) {
      const v1681 = Array.isArray(v1680.logs) ? v1680.logs.slice(-40) : [];
      if (v1626(v1680.error) && !v1681.some(v1682 => v1682?.text === v1680.error)) {
        v1681.push({
          at: 0,
          text: v1680.error,
          level: "error"
        });
      }
      for (const v1683 of v1681) {
        if (!v1626(v1683?.text)) {
          continue;
        }
        const v1684 = Number(v1683.at) || Date.now();
        const v1685 = v1683.at + "|" + v1683.text;
        if (v1679.seen.has(v1685)) {
          continue;
        }
        v1679.seen.add(v1685);
        if (v1679.seen.size > 160) {
          v1679.seen.delete(v1679.seen.values().next().value);
        }
        v1679.logs.push({
          text: v1625[v1683.text],
          at: v1684
        });
        v1631(v1679, "native-log", v1683.level === "error" ? "failed" : "progress", {
          code: v1683.text,
          at: v1684
        });
        if (v1679.logs.length > 40) {
          v1679.logs.shift();
        }
      }
    }
    function v1641(v1686, v1687) {
      if (!v1634(v1686) || v1687?.ticket !== v1686.ticket || v1687.status === "rejected" || typeof v1687.packageReady !== "boolean" || typeof v1687.busy !== "boolean") {
        return false;
      }
      if (v1686.pollError) {
        v1631(v1686, "poll", "end", {
          recovered: true
        });
      }
      v1686.snapshot = v1687;
      v1686.pollError = "";
      if (!v1686.confirmed && v1687.preparationConfirmed === true && v1687.packageReady) {
        v1686.confirmed = true;
        v1686.prepOpen = false;
        v1686.sendOpen = true;
      }
      if (v1687.autoAvailable === false) {
        v1686.autoAvailable = false;
      }
      if (v1686.autoAvailable === false && v1686.mode === "auto") {
        v1686.mode = "manual";
      }
      v1640(v1686, v1687);
      const v1688 = {
        operation: v1630(v1687.operation),
        nativeStage: v1630(v1687.stage),
        status: v1630(v1687.status),
        error: v1630(v1687.error) || (v1687.error ? "unknown_native_error" : ""),
        busy: v1687.busy === true,
        packageReady: v1687.packageReady === true,
        confirmed: v1686.confirmed,
        packageBytes: Number.isSafeInteger(v1687.fileSize) ? v1687.fileSize : 0,
        mode: v1686.mode,
        route: ["wifi", "p2p"].includes(v1687.connectionMode) ? v1687.connectionMode : "",
        connected: v1614.walltransfer.targetConnected(v1687, v1686.profile),
        canApply: v1687.canApply === true,
        sendProgress: Math.floor(Math.min(100, Math.max(0, Number(v1687.sendProgress) || 0)) / 25) * 25
      };
      const v1689 = JSON.stringify(v1688);
      if (v1689 !== v1686.lastSnapshot) {
        v1686.lastSnapshot = v1689;
        v1631(v1686, "native-snapshot", v1688.error ? "failed" : v1688.status === "done" ? "end" : "progress", v1688);
      }
      if (v1686.prepareStage === "native-package") {
        if (v1687.packageReady && !v1687.busy) {
          clearTimeout(v1686.packageTimer);
          v1686.packageTimer = 0;
          v1686.prepareStage = "";
        } else if (!v1687.busy && !v1687.packageReady) {
          const v1690 = v1628(v1687);
          v1636(v1686, "native-package", v1630(v1690) || "package_not_ready", v1626(v1690) ? v1627(v1690) : "本机打包已中断，请重新生成");
          return true;
        }
      }
      v1651(v1686);
      return true;
    }
    function v1642(v1691) {
      clearTimeout(v1691.timer);
      if (v1633(v1691) && v1691.ticket) {
        v1691.timer = setTimeout(() => v1643(v1691), 800);
      }
    }
    async function v1643(v1692) {
      if (!v1634(v1692)) {
        return;
      }
      const v1693 = v1692.revision;
      const v1694 = v1692.ticket;
      try {
        const v1695 = await v1614.pollWallpaperTransfer(v1694);
        if (!v1634(v1692) || v1693 !== v1692.revision) {
          return;
        }
        if (!v1641(v1692, v1695)) {
          throw new Error("任务已失效，请重新准备");
        }
      } catch (v1696) {
        if (v1634(v1692) && v1693 === v1692.revision) {
          if (!v1692.pollError) {
            v1631(v1692, "poll", "failed", {
              code: "snapshot_unavailable"
            });
          }
          v1692.pollError = v1696.message || "状态读取失败";
          v1692.snapshot = {
            ...v1692.snapshot,
            connected: false,
            canApply: false
          };
          v1651(v1692);
        }
      }
      if (v1633(v1692) && v1693 === v1692.revision) {
        v1642(v1692);
      }
    }
    function v1644(v1697, v1698, v1699) {
      if (!v1697) {
        return Promise.resolve("");
      }
      return new Promise((v1700, v1701) => {
        if (v1697.type !== "image/png" || v1697.size <= 0 || v1697.size > v1618) {
          return v1701(new Error("每张 PNG 最大 8 MiB"));
        }
        const v1702 = new FileReader();
        v1698.readers.add(v1702);
        const v1703 = () => {
          v1698.readers.delete(v1702);
          v1702.onload = v1702.onerror = v1702.onabort = null;
        };
        v1702.onload = () => {
          const v1704 = v1702.result;
          v1703();
          if (!v1699() || typeof v1704 !== "string") {
            return v1701(new Error("准备已取消"));
          }
          v1700(v1704);
        };
        v1702.onerror = () => {
          v1703();
          v1701(new Error("本地图片读取失败"));
        };
        v1702.onabort = () => {
          v1703();
          v1701(new Error("准备已取消"));
        };
        v1702.readAsDataURL(v1697);
      });
    }
    async function v1645(v1705, v1706, v1707) {
      if (!v1634(v1705) || v1705.busy || v1705.confirmed || v1705.ticket) {
        return;
      }
      const {
        mainFile: v1708,
        speedFile: v1709,
        box: v1710
      } = v1706;
      v1705.attempt++;
      v1631(v1705, "prepare", "start", {
        mainBytes: v1708?.size || 0,
        speedBytes: v1709?.size || 0,
        width: v1710.main.w,
        height: v1710.main.h,
        output: v1705.output
      });
      if (!v1708 && !v1709 || (v1708?.size || 0) + (v1709?.size || 0) > v1619) {
        v1631(v1705, "validate-images", "failed");
        throw new Error(v1708 || v1709 ? "图片总大小不能超过 16 MiB" : "请至少准备一张图片");
      }
      v1705.busy = true;
      v1705.error = "";
      const v1711 = ++v1705.revision;
      const v1712 = () => v1634(v1705) && v1711 === v1705.revision && v1707();
      const v1713 = v1723 => {
        v1705.prepareStage = v1723;
        v1651(v1705);
        return v1723;
      };
      let v1714 = "";
      let v1715 = "";
      let v1716 = v1713("pairing");
      let v1717 = false;
      let v1718;
      const v1719 = new Promise((v1724, v1725) => {
        v1718 = v1725;
      });
      v1705.stopPreparing = v1718;
      const v1720 = setTimeout(() => {
        v1717 = true;
        v1718(new Error(v1622[v1716] + "超时，请重新生成"));
      }, v1620);
      const v1721 = v1726 => Promise.race([v1726, v1719]);
      const v1722 = (...v1727) => {
        if (v1712()) {
          v1631(v1705, ...v1727);
        }
      };
      try {
        if (!v1705.num) {
          v1705.num = v1632();
        }
        const v1728 = await v1721(v1614.media.wallpaperExperimentSpec(v1705.scope, v1712, v1722));
        if (!v1712()) {
          return;
        }
        v1716 = "validate-canvas";
        const v1729 = v1614.media.wallpaperOperationReason({
          canvas: v1710.main
        });
        if (v1729) {
          throw new Error(v1729);
        }
        const v1730 = window.CAST?.parseWallpaperPairing?.(v1728.wifiAddress);
        if (!v1730?.ok) {
          throw new Error(v1625.initialization_failed);
        }
        v1705.profile = v1730.profile;
        v1705.autoAvailable = v1614.isIOS?.() === true || !!v1730.profile.p2pMac;
        if (v1614.isIOS?.() === true) {
          v1705.mode = "auto";
        }
        if (!v1705.autoAvailable) {
          v1705.mode = "manual";
        }
        const v1731 = {
          ...v1728,
          fileName: "local-wallpaper.zip",
          wallpaperNum: v1705.num,
          displayWallpaperSet: "1",
          mainWidth: v1706.mainFile ? Math.round(v1706.box.main.w) : 0,
          mainHeight: v1706.mainFile ? Math.round(v1706.box.main.h) : 0,
          speedWidth: v1706.speedFile ? Math.round(v1706.box.speed.w) : 0,
          speedHeight: v1706.speedFile ? Math.round(v1706.box.speed.h) : 0
        };
        v1716 = v1713("read-images");
        v1631(v1705, v1716, "start", {
          autoAvailable: v1705.autoAvailable,
          mode: v1705.mode,
          slot: Number(v1705.num),
          mainWidth: v1731.mainWidth,
          mainHeight: v1731.mainHeight,
          speedWidth: v1731.speedWidth,
          speedHeight: v1731.speedHeight
        });
        v1714 = await v1721(v1644(v1708, v1705, v1712));
        v1715 = await v1721(v1644(v1709, v1705, v1712));
        if (!v1712()) {
          return;
        }
        v1716 = v1713("native-begin");
        v1631(v1705, v1716, "start");
        const v1732 = await v1721(Promise.resolve(v1614.beginWallpaperTransferLocal(v1731, v1714, v1715, {
          report: v1722,
          isLatest: v1712
        })).then(v1733 => {
          if (!v1712()) {
            v1614.cancelWallpaperTransfer(v1733);
            return "";
          }
          return v1733;
        }));
        if (!v1712()) {
          if (v1732) {
            v1614.cancelWallpaperTransfer(v1732);
          }
          return;
        }
        for (const v1734 of v1705.previews) {
          if (v1734) {
            URL.revokeObjectURL(v1734);
          }
        }
        v1631(v1705, v1716, "end", {
          accepted: true
        });
        v1705.ticket = v1732;
        v1705.spec = v1731;
        v1705.previews = [v1706.mainFile ? URL.createObjectURL(v1706.mainFile) : "", v1706.speedFile ? URL.createObjectURL(v1706.speedFile) : ""];
        v1705.name = v1706.name;
        v1705.prepOpen = true;
        v1705.sendOpen = false;
        v1705.snapshot = {
          ticket: v1732,
          packageReady: false,
          busy: true,
          operation: "prepare",
          status: "initializing",
          connected: false
        };
        v1713("native-package");
        v1705.packageTimer = setTimeout(() => {
          if (!v1634(v1705) || v1705.ticket !== v1732 || v1705.prepareStage !== "native-package") {
            return;
          }
          const v1735 = !!v1705.pollError || !v1705.lastSnapshot;
          v1636(v1705, "native-package", v1735 ? "snapshot_unavailable" : "timeout", v1735 ? "等待 App 返回打包状态超时，请重新生成" : "本机打包超时，请重新生成");
        }, v1621);
        v1642(v1705);
      } catch (v1736) {
        if (v1633(v1705) && v1711 === v1705.revision) {
          if (v1717) {
            v1636(v1705, v1716, "timeout", v1736.message);
          } else {
            v1705.prepareStage = "";
            v1631(v1705, "prepare", "failed", {
              failedAt: v1716
            });
            v1705.error = v1736.message || v1625.preparation_failed;
          }
          throw v1736;
        }
      } finally {
        clearTimeout(v1720);
        if (v1705.stopPreparing === v1718) {
          v1705.stopPreparing = null;
        }
        v1714 = v1715 = "";
        if (v1633(v1705) && v1711 === v1705.revision) {
          v1705.busy = false;
          v1651(v1705);
        }
      }
    }
    async function v1646(v1737) {
      if (!v1634(v1737) || v1737.editor || v1737.busy || !v1614.wallpaperLocalTransferSupported?.()) {
        return;
      }
      const v1738 = v1737.revision;
      const v1739 = () => v1633(v1737) && v1738 === v1737.revision;
      v1737.busy = true;
      v1651(v1737);
      v1631(v1737, "canvas", "start");
      try {
        await v1614.media.loadWallpaperExperimentCanvas(v1737.scope, v1739, (...v1741) => {
          if (v1739()) {
            v1631(v1737, ...v1741);
          }
        });
        if (!v1739()) {
          return;
        }
        v1737.editorRevision = v1738;
        v1737.editor = v1614.media.openEditor(null, {
          handle: v1737.handle,
          output: v1737.output,
          root: () => v1737.root?.querySelector("[data-exp-editor]"),
          isCurrent: () => v1633(v1737) && v1738 === v1737.editorRevision,
          onChange: () => {
            if (v1633(v1737)) {
              v1651(v1737);
            }
          },
          onPrepared: (v1742, v1743) => v1645(v1737, v1742, v1743),
          onDismiss: () => {
            v1737.editor = null;
          }
        });
        const v1740 = v1614.media.instrumentCapabilities();
        v1631(v1737, "canvas", v1737.editor ? "end" : "failed", {
          width: v1740.width,
          height: v1740.height,
          supported: v1740.supported,
          model: v1740.screen?.name || ""
        });
      } catch (v1744) {
        if (v1739()) {
          v1631(v1737, "canvas", "failed");
          v1737.error = v1744.message || v1625.initialization_failed;
        }
      } finally {
        if (v1739()) {
          v1737.busy = false;
          v1651(v1737);
        }
      }
    }
    function v1647(v1745) {
      if (!v1634(v1745) || v1745.busy || v1745.snapshot.busy || v1745.ticket || !v1614.wallpaperLocalTransferSupported?.()) {
        return;
      }
      if (!v1745.editor) {
        v1745.error = "";
        v1646(v1745);
        return;
      }
      v1745.editor.prepare();
    }
    async function v1648(v1746, v1747) {
      if (v1747 === "wifi-guide") {
        if (!v1634(v1746) || v1746.pending || v1746.busy || !v1746.confirmed) {
          return;
        }
        v1631(v1746, v1747, "start", {
          mode: v1746.mode
        });
        window.CAST?.showIOSWifiGuide?.({
          profile: v1746.profile,
          host: v1614.phone(),
          ui: v1615,
          isCurrent: () => v1633(v1746),
          key: "wallpaper-experiment-wifi-guide",
          afterCheck: () => v1648(v1746, "check")
        });
        return;
      }
      if (!v1634(v1746) || v1746.pending || v1746.busy || v1746.snapshot.busy || !v1746.ticket || v1747 === "connect" && v1746.autoAvailable !== true) {
        return;
      }
      if (v1747 !== "confirm-preparation" && !v1746.confirmed) {
        return;
      }
      if (v1747 === "confirm-preparation" && (v1746.pollError || v1746.snapshot.packageReady !== true)) {
        return;
      }
      if (v1747 === "apply" && (!v1614.walltransfer.targetConnected(v1746.snapshot, v1746.profile) || v1746.snapshot.packageReady !== true || v1746.snapshot.canApply !== true)) {
        return;
      }
      v1746.pending = v1747;
      v1746.error = "";
      const v1748 = ++v1746.revision;
      const v1749 = v1746.ticket;
      v1651(v1746);
      v1631(v1746, v1747, "start", {
        mode: v1746.mode
      });
      let v1750 = "bridge_error";
      try {
        const v1751 = await v1614.wallpaperTransferAction(v1749, v1747);
        if (!v1634(v1746) || v1748 !== v1746.revision) {
          return;
        }
        if (v1751?.accepted !== true || v1751.ticket !== v1749) {
          v1750 = v1630(v1751?.error) || "bridge_not_accepted";
          throw new Error(v1627(v1751?.error));
        }
        v1631(v1746, v1747, "accepted");
        await v1643(v1746);
      } catch (v1752) {
        if (v1634(v1746) && v1748 === v1746.revision) {
          v1631(v1746, v1747, "failed", {
            code: v1750
          });
          v1746.error = v1752.message || "操作失败";
        }
      } finally {
        if (v1633(v1746) && v1748 === v1746.revision) {
          v1746.pending = "";
          v1651(v1746);
          v1642(v1746);
        }
      }
    }
    function v1649(v1753) {
      if (!v1634(v1753) || !v1753.confirmed || !v1614.walltransfer.targetConnected(v1753.snapshot, v1753.profile) || v1753.snapshot.canApply !== true || v1753.snapshot.busy || v1753.pending) {
        return;
      }
      let v1754;
      const v1755 = v1753.revision;
      v1754 = v1615.sheet(v1614.phone(), {
        title: "确认下发实验壁纸",
        center: true,
        closeMode: "current",
        body: "<div class=\"note bad\">" + v1615.icon("alert", 18) + "<div>该操作极为风险 请谨慎操作</div></div>\n        <p class=\"wall-confirm-copy\">仅在停车时向当前已获授权的车辆发送；实验包未经实车验证，中断不保证撤回已发送内容。</p>\n        <label class=\"wall-exp-check\"><input type=\"checkbox\" data-exp-risk>我已了解风险，确认下发到当前车辆</label>\n        <button type=\"button\" class=\"btn block primary mt12\" data-exp-send disabled>确认下发</button>",
        onMount: v1756 => {
          const v1757 = v1756.querySelector("[data-exp-risk]");
          const v1758 = v1756.querySelector("[data-exp-send]");
          v1757.addEventListener("change", () => {
            v1758.disabled = !v1757.checked;
          });
          v1758.addEventListener("click", () => {
            if (!v1757.checked || !v1634(v1753) || v1755 !== v1753.revision || !v1753.confirmed || !v1614.walltransfer.targetConnected(v1753.snapshot, v1753.profile) || v1753.snapshot.canApply !== true || v1753.snapshot.busy || !v1615.sheetAlive(v1754)) {
              return;
            }
            v1615.closeSheet(v1754);
            v1648(v1753, "apply");
          });
        },
        onDismiss: () => {
          if (v1753.confirmHandle === v1754) {
            v1753.confirmHandle = null;
          }
        }
      });
      v1753.confirmHandle = v1754;
    }
    function v1650(v1759) {
      return "<div class=\"wall-exp-flow\">\n      <div class=\"note bad wall-exp-warning\">" + v1615.icon("alert", 20) + "<div>该操作极为风险 请谨慎操作</div></div>\n      <p class=\"card-sub wall-exp-intro\">图片仅在本机制作，不上传云端；实验包未经实车验证，请停车操作。</p>\n      " + (v1614.wallpaperLocalTransferSupported?.() ? "" : "<div class=\"note info\">请使用支持本地壁纸的新版 Android App；当前环境不能下发车机。</div>") + "\n      <details class=\"wall-exp-fold\" data-exp-fold=\"prepare\"><summary><span class=\"wall-exp-number\">1</span><span>准备壁纸<small data-exp-text=\"prepare-summary\">点击展开，制作本地壁纸</small></span>" + v1615.icon("down", 20) + "</summary>\n        <div class=\"wall-exp-content\">\n          <section class=\"wall-exp-step\"><h3>本机图片准备</h3>\n            <fieldset class=\"wall-exp-targets\" role=\"radiogroup\" aria-label=\"本地输出范围\">" + [["main", "整屏", "只准备整屏图片"], ["speed", "速度卡", "只准备速度卡图片"], ["both", "两者", "分别准备整屏与速度卡"]].map(([v1760, v1761, v1762]) => "<label class=\"wall-exp-target\"><input type=\"radio\" name=\"we-output-" + v1759.id + "\" value=\"" + v1760 + "\" data-exp-output=\"" + v1760 + "\"" + (v1760 === v1759.output ? " checked" : "") + "><span>" + v1761 + "<small>" + v1762 + "</small></span></label>").join("") + "</fieldset>\n            <div data-exp-editor></div>\n            <button type=\"button\" class=\"btn primary\" data-exp-action=\"edit\">完成图片准备，生成本地包</button>\n            <div class=\"wall-exp-previews\" data-exp-previews hidden><figure data-exp-preview=\"main\"><img data-exp-image=\"main\" alt=\"整屏壁纸预览\"><figcaption>整屏</figcaption></figure><figure data-exp-preview=\"speed\"><img data-exp-image=\"speed\" alt=\"速度卡预览\"><figcaption>速度卡</figcaption></figure></div>\n          </section>\n          <section class=\"wall-exp-step\"><h3>确认准备完成</h3><p class=\"wall-exp-status\" data-exp-text=\"package\" role=\"status\">等待准备图片</p><p class=\"card-sub tnum\" data-exp-text=\"file\"></p>\n            <button type=\"button\" class=\"btn primary\" data-exp-action=\"confirm-preparation\" disabled>确认准备完成，进入下发</button></section>\n        </div></details>\n      <details class=\"wall-exp-fold\" data-exp-fold=\"send\"><summary aria-disabled=\"true\"><span class=\"wall-exp-number\">2</span><span>下发壁纸<small data-exp-text=\"send-summary\">先确认准备完成</small></span>" + v1615.icon("down", 20) + "</summary>\n        <div class=\"wall-exp-content\">\n          <section class=\"wall-exp-step\"><h3>连接车机</h3><div class=\"wall-transfer-tabs\" role=\"tablist\" aria-label=\"实验壁纸连接方式\">\n            <button type=\"button\" role=\"tab\" data-exp-tab=\"auto\" aria-selected=\"" + (v1759.mode === "auto") + "\" aria-disabled=\"" + (v1759.autoAvailable !== true) + "\" tabindex=\"" + (v1759.mode === "auto" ? 0 : -1) + "\"" + (v1759.autoAvailable === true ? "" : " disabled") + ">自动连接</button><button type=\"button\" role=\"tab\" data-exp-tab=\"manual\" aria-selected=\"" + (v1759.mode === "manual") + "\" tabindex=\"" + (v1759.mode === "manual" ? 0 : -1) + "\">手动连接</button></div>\n            <p class=\"wall-exp-status\" data-exp-auto-unavailable" + (v1759.autoAvailable === false ? "" : " hidden") + ">车辆不支持自动连接</p>\n            <div data-exp-panel=\"auto\"" + (v1759.mode === "auto" ? "" : " hidden") + "><button type=\"button\" class=\"btn primary\" data-exp-action=\"connect\"" + (v1759.autoAvailable === true ? "" : " disabled") + ">连接车机</button></div>\n            <div data-exp-panel=\"manual\"" + (v1759.mode === "manual" ? "" : " hidden") + "><dl class=\"wall-transfer-credentials\"><div><dt>Wi-Fi 名称</dt><dd data-exp-text=\"ssid\" class=\"selectable\"></dd></div><div><dt>密码</dt><dd class=\"wall-transfer-credential-value\"><span data-exp-text=\"password\" class=\"selectable\"></span><button type=\"button\" class=\"iconbtn sm\" data-exp-copy-password aria-label=\"复制密码\" disabled>" + v1615.icon("copy", 16) + "</button></dd></div></dl>\n              <button type=\"button\" class=\"btn primary\" data-exp-action=\"" + (v1614.isIOS?.() ? "wifi-guide" : "wifi-settings") + "\">" + (v1614.isIOS?.() ? "如何连接车机 Wi-Fi" : "打开 Wi-Fi 设置") + "</button><button type=\"button\" class=\"btn text\" data-exp-action=\"check\">检查连接</button></div>\n            <p class=\"wall-exp-status\" data-exp-text=\"connection\" role=\"status\">请先确认本地包准备完成</p></section>\n          <section class=\"wall-exp-step\"><h3>下发并应用</h3><p class=\"card-sub\">本地包已准备，无需再下载。连接有效后，确认才发送。</p>\n            <button type=\"button\" class=\"btn primary\" data-exp-action=\"send\" disabled>下发壁纸</button><progress max=\"100\" value=\"0\" data-exp-progress aria-label=\"壁纸下发进度\" hidden></progress>\n            <p class=\"wall-exp-status\" data-exp-text=\"send\" role=\"status\">等待下发</p></section>\n          <section class=\"wall-exp-step\"><h3>下发日志</h3><div class=\"wall-transfer-log\" data-exp-logs role=\"log\" aria-live=\"polite\" aria-label=\"实验壁纸下发日志\"><div class=\"wall-exp-log-empty\">操作后会在这里显示连接、传输与车机校验结果</div></div></section>\n        </div></details>\n      <p class=\"wall-transfer-error\" role=\"status\" data-exp-text=\"error\"></p>\n      " + (v1614.gestures?.rawSheet ? "<button type=\"button\" class=\"btn text\" data-exp-app-log>查看并导出应用日志</button>" : "") + "\n      <button type=\"button\" class=\"btn text wall-exp-cancel\" data-exp-action=\"cancel\">取消准备</button>\n    </div>";
    }
    function v1651(v1763) {
      const v1764 = v1763.root;
      if (!v1764 || v1763.closed) {
        return;
      }
      const v1765 = v1763.snapshot;
      const v1766 = !!v1763.pending || v1763.busy || v1763.editor?.busy || v1763.editor?.decodeJobs.size > 0 || v1765.busy === true;
      const v1767 = v1766 || !!v1763.ticket || v1763.confirmed;
      const v1768 = v1763.confirmed && v1614.walltransfer.targetConnected(v1765, v1763.profile);
      const v1769 = v1628(v1765);
      const v1770 = v1769 ? v1627(v1769) : "";
      const v1771 = v1765.packageReady && v1763.prepareStage !== "native-package";
      const v1772 = (v1780, v1781) => {
        const v1782 = v1764.querySelector("[data-exp-text=\"" + v1780 + "\"]");
        if (v1782) {
          v1782.textContent = v1781;
        }
      };
      const v1773 = v1622[v1763.prepareStage];
      v1772("prepare-summary", v1763.confirmed ? "准备已确认" : v1771 ? "本地包已就绪，等待确认" : v1763.pollError || v1763.error || v1770 || (v1773 ? "正在" + v1773 + "…" : "点击展开，制作本地壁纸"));
      v1772("send-summary", v1763.confirmed ? "点击展开，连接并下发" : "先确认准备完成");
      v1772("package", v1763.pollError ? "暂时无法读取本地包状态" : v1771 ? (v1763.name || "本地壁纸") + " · 本地包已准备好" : v1763.error || v1770 || (v1773 ? "正在" + v1773 + "…" : "等待准备图片"));
      v1772("file", v1771 && v1765.fileSize ? "ZIP " + (v1765.fileSize / 1024).toFixed(1) + " KiB" : "");
      v1772("connection", !v1763.confirmed ? "请先确认本地包准备完成" : v1763.pollError ? "暂时无法读取车机连接状态" : v1768 ? "已连接目标车机" : v1765.connecting ? "正在连接车机…" : "未连接目标车机");
      v1772("send", v1765.status === "done" ? v1625.done : v1765.operation === "apply" && v1765.busy ? "正在下发 " + Math.min(100, Number(v1765.sendProgress) || 0) + "%" : v1765.operation === "apply" && v1770 ? v1770 : "等待下发");
      v1772("error", v1763.error || v1763.pollError || v1770);
      v1772("ssid", v1763.mode === "manual" ? v1763.profile?.ssid || "" : "");
      v1772("password", v1763.mode === "manual" ? v1763.profile?.password || "" : "");
      v1764.querySelector("[data-exp-copy-password]").disabled = v1763.mode !== "manual" || !v1763.profile?.password;
      for (const v1783 of v1764.querySelectorAll("[data-exp-output]")) {
        v1783.disabled = v1767;
        v1783.checked = v1783.dataset.expOutput === v1763.output;
      }
      for (const v1784 of v1764.querySelectorAll("[data-exp-editor] [data-act=\"pick\"], [data-exp-editor] [data-act=\"align\"]")) {
        v1784.disabled = v1767 || (v1784.dataset.act === "pick" ? v1763.output !== "both" && v1784.dataset.area !== v1763.output : v1763.output === "main" || !v1763.editor?.layers.main.url);
      }
      for (const v1785 of v1764.querySelectorAll("[data-exp-action]")) {
        const v1786 = v1785.dataset.expAction;
        if (v1786 === "edit") {
          v1785.textContent = v1763.editor ? "完成图片准备，生成本地包" : v1763.busy ? "正在读取仪表尺寸…" : "重新读取仪表尺寸";
        }
        v1785.disabled = v1786 === "cancel" ? false : v1786 === "edit" ? v1767 || !v1614.wallpaperLocalTransferSupported?.() : v1786 === "confirm-preparation" ? v1766 || !!v1763.pollError || !v1765.packageReady || v1763.confirmed : v1786 === "send" ? v1766 || !v1768 || !v1765.packageReady || v1765.canApply !== true : v1786 === "wifi-guide" ? v1766 || !v1763.confirmed : v1766 || !v1763.confirmed || v1786 === "connect" && v1763.autoAvailable !== true;
      }
      for (const v1787 of v1764.querySelectorAll("[data-exp-tab]")) {
        const v1788 = v1787.dataset.expTab === v1763.mode;
        v1787.disabled = v1787.dataset.expTab === "auto" && v1763.autoAvailable !== true;
        v1787.setAttribute("aria-disabled", String(v1787.disabled));
        v1787.setAttribute("aria-selected", String(v1788));
        v1787.tabIndex = v1788 ? 0 : -1;
      }
      v1764.querySelector("[data-exp-auto-unavailable]").hidden = v1763.autoAvailable !== false;
      for (const v1789 of v1764.querySelectorAll("[data-exp-panel]")) {
        v1789.hidden = v1789.dataset.expPanel !== v1763.mode;
      }
      const v1774 = v1764.querySelector("[data-exp-fold=\"prepare\"]");
      const v1775 = v1764.querySelector("[data-exp-fold=\"send\"]");
      if (v1774.open !== v1763.prepOpen) {
        v1774.open = v1763.prepOpen;
      }
      if (v1775.open !== (v1763.confirmed && v1763.sendOpen)) {
        v1775.open = v1763.confirmed && v1763.sendOpen;
      }
      v1775.querySelector("summary").setAttribute("aria-disabled", String(!v1763.confirmed));
      const v1776 = v1764.querySelector("[data-exp-previews]");
      v1776.hidden = !v1763.previews.some(Boolean);
      v1776.setAttribute("data-count", String(v1763.previews.filter(Boolean).length));
      for (const [v1790, v1791] of ["main", "speed"].entries()) {
        v1764.querySelector("[data-exp-preview=\"" + v1791 + "\"]").hidden = !v1763.previews[v1790];
        const v1792 = v1764.querySelector("[data-exp-image=\"" + v1791 + "\"]");
        if (v1763.previews[v1790]) {
          v1792.src = v1763.previews[v1790];
        } else {
          v1792.removeAttribute("src");
        }
      }
      const v1777 = v1764.querySelector("[data-exp-progress]");
      v1777.value = Math.min(100, Math.max(0, Number(v1765.sendProgress) || 0));
      v1777.hidden = v1765.operation !== "apply";
      const v1778 = v1764.querySelector("[data-exp-logs]");
      const v1779 = v1763.logs.length ? v1763.logs.slice(-40).reverse().map(v1793 => "<div class=\"wall-transfer-log-line\"><time>" + v1617(new Date(v1793.at).toLocaleTimeString([], {
        hour12: false
      })) + "</time><span>" + v1617(v1793.text) + "</span></div>").join("") : "<div class=\"wall-exp-log-empty\">操作后会在这里显示连接、传输与车机校验结果</div>";
      if (v1778.innerHTML !== v1779) {
        const v1794 = v1778.scrollTop;
        v1778.innerHTML = v1779;
        v1778.scrollTop = v1794;
      }
    }
    function v1652(v1795, v1796) {
      v1795.root = v1796.querySelector(".wall-exp-flow");
      const v1797 = v1795.root;
      const v1798 = v1797.querySelector("[data-exp-fold=\"prepare\"]");
      const v1799 = v1797.querySelector("[data-exp-fold=\"send\"]");
      v1798.addEventListener("toggle", () => {
        if (!v1633(v1795)) {
          return;
        }
        v1795.prepOpen = v1798.open;
        if (v1798.open) {
          v1795.sendOpen = false;
          v1799.open = false;
        }
      });
      v1799.querySelector("summary").addEventListener("click", v1800 => {
        if (!v1795.confirmed) {
          v1800.preventDefault();
        }
      });
      v1799.addEventListener("toggle", () => {
        if (!v1633(v1795)) {
          return;
        }
        if (!v1795.confirmed) {
          v1799.open = false;
          return;
        }
        v1795.sendOpen = v1799.open;
        if (v1799.open) {
          v1795.prepOpen = false;
          v1798.open = false;
        }
      });
      v1797.addEventListener("change", v1801 => {
        const v1802 = v1801.target.closest("[data-exp-output]");
        if (!v1802 || !v1634(v1795) || v1802.disabled || v1795.ticket || v1795.busy) {
          return;
        }
        if (v1795.editor?.setOutput(v1802.dataset.expOutput)) {
          v1795.output = v1802.dataset.expOutput;
        }
        v1651(v1795);
      });
      v1797.addEventListener("click", v1803 => {
        if (v1803.target.closest("[data-exp-app-log]") && v1634(v1795)) {
          v1614.gestures.rawSheet();
          return;
        }
        const v1804 = v1803.target.closest("[data-exp-tab]");
        if (v1804 && v1633(v1795)) {
          if (v1804.disabled || v1804.dataset.expTab === "auto" && v1795.autoAvailable !== true) {
            return;
          }
          v1795.mode = v1804.dataset.expTab;
          v1651(v1795);
          return;
        }
        const v1805 = v1803.target.closest("[data-exp-copy-password]");
        if (v1805) {
          if (v1634(v1795) && v1795.mode === "manual" && v1795.profile?.password) {
            v1615.copy(v1795.profile.password, v1614.phone(), "密码");
          }
          return;
        }
        const v1806 = v1803.target.closest("[data-exp-action]");
        if (!v1806 || v1806.disabled) {
          return;
        }
        const v1807 = v1806.dataset.expAction;
        if (v1807 === "wifi-guide") {
          v1648(v1795, v1807);
          return;
        }
        if (v1807 === "edit") {
          v1647(v1795);
        } else if (v1807 === "cancel") {
          v1639(v1795);
        } else if (v1807 === "send") {
          v1649(v1795);
        } else {
          v1648(v1795, v1807);
        }
      });
      v1797.addEventListener("keydown", v1808 => {
        const v1809 = v1808.target.closest("[data-exp-tab]");
        if (!v1809 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(v1808.key) || !v1633(v1795)) {
          return;
        }
        v1808.preventDefault();
        v1795.mode = v1795.autoAvailable !== true ? "manual" : v1808.key === "Home" ? "auto" : v1808.key === "End" ? "manual" : v1795.mode === "auto" ? "manual" : "auto";
        v1651(v1795);
        v1797.querySelector("[data-exp-tab=\"" + v1795.mode + "\"]").focus();
      });
      v1795.editor?.refresh();
      v1651(v1795);
    }
    function v1653(v1810, v1811, v1812 = false) {
      if (!v1614.featuresEnabled() || !v1810 || !v1614.current(v1810)) {
        return null;
      }
      if (v1623 && v1633(v1623)) {
        return v1623.handle;
      }
      v1638();
      const v1813 = {
        id: ++v1624,
        scope: {
          ...v1810
        },
        accountGen: v1616.accountGen,
        tab: v1614.state.tab,
        closed: false,
        handle: null,
        root: null,
        editor: null,
        editorRevision: 0,
        confirmHandle: null,
        onHide: null,
        ticket: "",
        timer: 0,
        revision: 0,
        packageTimer: 0,
        prepareStage: "",
        stopPreparing: null,
        report: v1811,
        attempt: 0,
        lastSnapshot: "",
        snapshot: {},
        previews: [],
        readers: new Set(),
        logs: [],
        seen: new Set(),
        spec: null,
        profile: null,
        autoAvailable: null,
        prepOpen: false,
        sendOpen: false,
        confirmed: false,
        busy: false,
        pending: "",
        error: "",
        pollError: "",
        name: "",
        num: "",
        output: "both",
        mode: "auto"
      };
      const v1814 = v1614.wallpaperLocalTransferSupported?.() === true;
      v1631(v1813, "open", v1814 ? "start" : "failed", {
        shared: v1812,
        platform: v1614.isIOS?.() ? "ios" : v1614.inShell?.() ? "android" : "web",
        nativeSupported: v1814
      });
      v1623 = v1813;
      v1813.onHide = () => v1638(v1813, "pagehide");
      window.addEventListener("pagehide", v1813.onHide);
      v1813.handle = v1615.sheet(v1614.phone(), {
        key: "wall-experiment",
        title: "实验性壁纸操作",
        full: true,
        page: true,
        className: "wall-page wall-experiment",
        closeMode: "current",
        body: v1650(v1813),
        onMount: v1815 => v1652(v1813, v1815),
        onDismiss: () => v1638(v1813)
      });
      v1646(v1813);
      v1651(v1813);
      return v1813.handle;
    }
    v1614.wallpaperExperiment = {
      open: v1653,
      close: v1638
    };
  });
  (() => {
    const v1816 = window.APP;
    const v1817 = window.MODEL;
    const v1818 = window.UI;
    const v1819 = window.Store;
    const v1820 = v1817.esc;
    const v1821 = "vehicle-style";
    const v1822 = "zeeho.vehicle.style.v1";
    const v1823 = "zeeho-vehicle-style";
    const v1824 = "assets";
    const v1825 = "current";
    const v1826 = ["https://cdn.jsdelivr.net/gh/lswlc33/zeeho-3d-models@main/", "https://lswlc33.github.io/zeeho-3d-models/", "https://raw.githubusercontent.com/lswlc33/zeeho-3d-models/main/", "https://ghfast.top/https://raw.githubusercontent.com/lswlc33/zeeho-3d-models/main/", "https://gh-proxy.com/https://raw.githubusercontent.com/lswlc33/zeeho-3d-models/main/"];
    const v1827 = 20971520;
    const v1828 = 62914560;
    const v1829 = 8388608;
    const v1830 = "https://docs.qq.com/form/page/DSWZQQU9XcmxjbWZD";
    const v1831 = /^#[0-9a-f]{6}$/i;
    const v1832 = /^(-?[\d.]+)(?:rad|deg)\s+([\d.]+)(?:rad|deg)/;
    const v1833 = 3;
    const v1834 = ["theta", "phi"];
    const v1835 = v1945 => v1945 * 180 / Math.PI;
    let v1836;
    let v1837;
    let v1838 = null;
    let v1839 = null;
    let v1840 = null;
    let v1841 = null;
    let v1842 = 0;
    let v1843 = 0;
    let v1844 = false;
    let v1845 = Promise.resolve();
    let v1846 = null;
    let v1847 = null;
    let v1848 = null;
    let v1849 = false;
    let v1850 = null;
    let v1851 = "";
    let v1852 = null;
    let v1853 = "";
    const v1854 = new WeakMap();
    const v1855 = {
      pic: null,
      pic3d: null
    };
    const v1856 = {
      pic: null,
      pic3d: null
    };
    const v1857 = {
      pic: "idle",
      pic3d: "idle"
    };
    const v1858 = () => window.__zeehoWebPreview === true || v1819.isPreview?.() === true;
    const v1859 = v1946 => JSON.parse(JSON.stringify(v1946));
    const v1860 = () => String(v1843).padStart(6, "0");
    const v1861 = () => v1816.phone();
    function v1862() {
      const v1947 = v1816.state || {};
      const v1948 = v1947.data?.home || null;
      return {
        vin: String(v1947.vin || v1948?.vin || ""),
        home: v1948
      };
    }
    function v1863(v1949) {
      if (!v1949 || typeof v1949 !== "object") {
        return {
          channel: "pic",
          kind: "default"
        };
      }
      const v1950 = v1949.channel === "pic3d" ? "pic3d" : "pic";
      const v1951 = ["preset", "custom"].includes(v1949.kind) ? v1949.kind : "default";
      const v1952 = {};
      if (v1950 === "pic3d") {
        for (const [v1954, v1955] of Object.entries(v1949.colors || {})) {
          if (v1831.test(String(v1955))) {
            v1952[v1954] = String(v1955).toLowerCase();
          }
        }
      }
      const v1953 = {};
      for (const v1956 of v1834) {
        const v1957 = Number(v1949.orbit?.[v1956]);
        if (Number.isFinite(v1957) && v1957 >= -360 && v1957 <= 360) {
          v1953[v1956] = Math.round(v1957 * 10) / 10;
        }
      }
      return {
        channel: v1950,
        kind: v1951,
        ...(v1951 === "preset" ? {
          presetId: String(v1949.presetId || "")
        } : {}),
        ...(v1951 === "custom" ? {
          customId: String(v1949.customId || ""),
          customName: String(v1949.customName || "")
        } : {}),
        ...(Object.keys(v1952).length ? {
          colors: v1952
        } : {}),
        ...(v1949.orbitOff === true ? {
          orbitOff: true
        } : {}),
        ...(Object.keys(v1953).length === v1834.length ? {
          orbit: v1953
        } : {})
      };
    }
    function v1864() {
      if (v1836) {
        return;
      }
      let v1958;
      try {
        v1958 = v1819.getJson(v1822, null);
      } catch {}
      v1836 = {
        vins: {}
      };
      if (v1958?.vins && typeof v1958.vins === "object") {
        for (const [v1959, v1960] of Object.entries(v1958.vins)) {
          Object.defineProperty(v1836.vins, v1959, {
            value: v1863(v1960),
            enumerable: true,
            writable: true,
            configurable: true
          });
        }
      }
    }
    function v1865(v1961) {
      v1864();
      return v1863(v1836.vins[v1961]);
    }
    const v1866 = v1962 => v1962.kind === "custom" ? v1962.customId : "" + v1962.channel + (v1962.channel === "pic3d" ? ":v2" : "") + ":" + v1962.presetId;
    const v1867 = (v1963, v1964, v1965) => JSON.stringify([v1963, v1863(v1965), v1965.kind === "default" ? v1964?.pic3d || "" : "", v1858()]);
    const v1868 = v1966 => v1841 === v1966 && v1966.epoch === v1842 && v1862().vin === v1966.vin && v1858() === v1966.preview;
    function v1869() {
      v1842++;
      if (v1847) {
        try {
          v1847.abort();
        } catch {}
      }
    }
    function v1870() {
      v1843++;
      if (v1844) {
        return;
      }
      v1844 = true;
      queueMicrotask(() => {
        v1844 = false;
        if (typeof v1816.render === "function") {
          v1816.render({
            keepScroll: true
          });
        }
        v1930();
        v1905();
      });
    }
    function v1871(v1967) {
      const v1968 = v1845.then(v1967, v1967);
      v1845 = v1968.catch(() => {});
      return v1968;
    }
    async function v1872(v1969) {
      try {
        const v1970 = typeof v1819.setJsonAsync === "function" ? await v1819.setJsonAsync(v1822, v1969) : await v1819.setJson(v1822, v1969);
        return v1970 === true;
      } catch {
        return false;
      }
    }
    function v1873() {
      if (v1858()) {
        return Promise.resolve(null);
      }
      if (!window.indexedDB) {
        return Promise.reject(new Error("本地资源存储不可用"));
      }
      if (!v1837) {
        v1837 = new Promise((v1971, v1972) => {
          const v1973 = window.indexedDB.open(v1823, 1);
          v1973.onupgradeneeded = () => {
            if (!v1973.result.objectStoreNames.contains(v1824)) {
              v1973.result.createObjectStore(v1824, {
                keyPath: "id"
              });
            }
          };
          v1973.onerror = v1973.onblocked = () => {
            v1837 = null;
            v1972(new Error("本地资源存储无法打开"));
          };
          v1973.onsuccess = () => {
            v1973.result.onversionchange = () => {
              v1973.result.close();
              v1837 = null;
            };
            v1971(v1973.result);
          };
        });
      }
      return v1837;
    }
    async function v1874(v1974) {
      if (v1858()) {
        return v1839;
      }
      if (v1838 && v1840 === false) {
        return v1838;
      }
      const v1975 = await v1873();
      return new Promise((v1976, v1977) => {
        const v1978 = v1975.transaction(v1824, "readonly");
        const v1979 = v1978.objectStore(v1824);
        const v1980 = v1979.get(v1825);
        v1980.onsuccess = () => {
          if (v1980.result?.baseBlob) {
            v1976(v1980.result);
            return;
          }
          const v1981 = v1979.get(v1974);
          v1981.onsuccess = () => v1976(v1981.result?.blob ? {
            baseId: v1974,
            baseBlob: v1981.result.blob
          } : null);
          v1981.onerror = () => v1977(new Error("本地资源读取失败"));
        };
        v1980.onerror = v1978.onabort = () => v1977(new Error("本地资源读取失败"));
      });
    }
    async function v1875(v1982, v1983, v1984 = null) {
      if (!v1868(v1983)) {
        return false;
      }
      if (v1983.preview) {
        v1839 = v1982;
        return true;
      }
      const v1985 = await v1873();
      if (!v1868(v1983)) {
        return false;
      }
      const v1986 = v1984 instanceof Set ? v1984 : null;
      const v1987 = [];
      return new Promise((v1988, v1989) => {
        const v1990 = v1985.transaction(v1824, "readwrite");
        const v1991 = v1990.objectStore(v1824);
        v1847 = v1990;
        const v1992 = v1991.openCursor();
        v1992.onsuccess = () => {
          const v1993 = v1992.result;
          if (!v1993) {
            for (const v1995 of v1987) {
              v1991.put({
                id: v1995.baseId,
                baseId: v1995.baseId,
                channel: v1995.channel,
                name: v1995.name,
                blob: v1995.baseBlob
              });
            }
            if (v1982) {
              v1991.put({
                ...v1982,
                id: v1825
              });
            }
            return;
          }
          const v1994 = v1993.key;
          if (v1994 === v1825) {
            const v1996 = v1993.value;
            if (v1986 && v1996?.baseId && v1986.has(v1996.baseId) && (!v1982 || v1996.baseId !== v1982.baseId)) {
              v1987.push(v1996);
            }
            v1993.delete();
          } else if (v1982 && (!v1986 || !v1986.has(v1994) || v1994 === v1982.baseId)) {
            v1993.delete();
          }
          v1993.continue();
        };
        v1990.oncomplete = () => {
          if (v1847 === v1990) {
            v1847 = null;
          }
          v1988(v1868(v1983));
        };
        v1990.onerror = v1990.onabort = () => {
          if (v1847 === v1990) {
            v1847 = null;
          }
          if (!v1868(v1983)) {
            v1988(false);
          } else {
            v1989(new Error("本地资源保存失败，旧文件已保留"));
          }
        };
      });
    }
    function v1876(v1997, v1998) {
      if (!v1868(v1998)) {
        return;
      }
      v1838 = v1997;
      v1840 = v1998.preview;
      if (!v1997) {
        if (v1846) {
          URL.revokeObjectURL(v1846.url);
        }
        v1846 = null;
        return;
      }
      const v1999 = v1997.variantBlob || v1997.baseBlob;
      if (v1846?.blob !== v1999) {
        const v2000 = URL.createObjectURL(v1999);
        const v2001 = v1846;
        v1846 = {
          blob: v1999,
          url: v2000,
          vin: v1998.vin,
          sig: v1998.sig,
          baseId: v1997.baseId
        };
        if (v2001) {
          URL.revokeObjectURL(v2001.url);
        }
      } else {
        v1846 = {
          ...v1846,
          vin: v1998.vin,
          sig: v1998.sig,
          baseId: v1997.baseId
        };
      }
    }
    async function v1877(v2002) {
      const v2003 = await v2002.arrayBuffer();
      const v2004 = new DataView(v2003);
      const v2005 = () => {
        throw new Error("GLB 容器不完整或格式不受支持");
      };
      if (v2003.byteLength < 20 || v2004.getUint32(0, true) !== 1179937895 || v2004.getUint32(4, true) !== 2 || v2004.getUint32(8, true) !== v2003.byteLength || v2003.byteLength % 4) {
        v2005();
      }
      let v2006 = 12;
      let v2007 = null;
      let v2008 = null;
      while (v2006 < v2003.byteLength) {
        if (v2006 + 8 > v2003.byteLength) {
          v2005();
        }
        const v2011 = v2004.getUint32(v2006, true);
        const v2012 = v2004.getUint32(v2006 + 4, true);
        if (v2011 % 4 || v2006 + 8 + v2011 > v2003.byteLength) {
          v2005();
        }
        const v2013 = new Uint8Array(v2003, v2006 + 8, v2011);
        if (v2006 === 12 && v2012 === 1313821514 && v2011) {
          try {
            v2007 = JSON.parse(new TextDecoder("utf-8", {
              fatal: true
            }).decode(v2013));
          } catch {
            v2005();
          }
        } else if (v2007 && !v2008 && v2012 === 5130562) {
          v2008 = v2013;
        } else {
          v2005();
        }
        v2006 += 8 + v2011;
      }
      if (!v2007 || typeof v2007 !== "object" || Array.isArray(v2007) || v2007.asset?.version !== "2.0") {
        v2005();
      }
      function v2009(v2014) {
        if (!v2014 || typeof v2014 !== "object") {
          return;
        }
        for (const [v2015, v2016] of Object.entries(v2014)) {
          if (v2015 === "uri" && (typeof v2016 !== "string" || !/^data:[\w.+/-]+(?:;[\w=.+-]+)*;base64,[a-z0-9+/]*={0,2}$/i.test(v2016))) {
            throw new Error("模型必须内嵌资源，不支持外部文件或网址依赖");
          }
          if (v2016 && typeof v2016 === "object") {
            v2009(v2016);
          }
        }
      }
      v2009(v2007);
      const v2010 = v2007.buffers || [];
      for (const [v2017, v2018] of v2010.entries()) {
        if (!Number.isSafeInteger(v2018.byteLength) || v2018.byteLength < 0) {
          v2005();
        }
        if (!v2018.uri && (v2017 !== 0 || !v2008 || v2018.byteLength > v2008.length || v2008.length - v2018.byteLength > 3)) {
          v2005();
        }
      }
      for (const v2019 of v2007.bufferViews || []) {
        const v2020 = v2010[v2019.buffer];
        const v2021 = v2019.byteOffset || 0;
        if (!v2020 || !Number.isSafeInteger(v2021) || v2021 < 0 || !Number.isSafeInteger(v2019.byteLength) || v2019.byteLength < 0 || v2021 + v2019.byteLength > v2020.byteLength) {
          v2005();
        }
      }
      return {
        json: v2007,
        bin: v2008
      };
    }
    function v1878(v2022) {
      const v2023 = new TextEncoder().encode(JSON.stringify(v2022.json));
      const v2024 = v2023.length + 3 & ~3;
      const v2025 = v2022.bin;
      const v2026 = new Uint8Array(20 + v2024 + (v2025 ? 8 + v2025.length : 0));
      const v2027 = new DataView(v2026.buffer);
      v2027.setUint32(0, 1179937895, true);
      v2027.setUint32(4, 2, true);
      v2027.setUint32(8, v2026.length, true);
      v2027.setUint32(12, v2024, true);
      v2027.setUint32(16, 1313821514, true);
      v2026.set(v2023, 20);
      v2026.fill(32, 20 + v2023.length, 20 + v2024);
      if (v2025) {
        v2027.setUint32(20 + v2024, v2025.length, true);
        v2027.setUint32(24 + v2024, 5130562, true);
        v2026.set(v2025, 28 + v2024);
      }
      return new Blob([v2026], {
        type: "model/gltf-binary"
      });
    }
    function v1879(v2028, v2029) {
      const v2030 = new Set();
      const v2031 = [...v2029];
      while (v2031.length) {
        const v2032 = v2031.pop();
        if (!Number.isInteger(v2032) || v2030.has(v2032) || !v2028.nodes?.[v2032]) {
          continue;
        }
        v2030.add(v2032);
        v2031.push(...(v2028.nodes[v2032].children || []));
      }
      return v2030;
    }
    function v1880(v2033, v2034) {
      const v2035 = new Set();
      for (const v2036 of v2034) {
        for (const v2037 of v2033.meshes?.[v2033.nodes[v2036].mesh]?.primitives || []) {
          if (Number.isInteger(v2037.material)) {
            v2035.add(v2037.material);
          }
        }
      }
      return v2035;
    }
    function v1881(v2038) {
      const v2039 = v2038.scenes?.[v2038.scene || 0]?.nodes || [];
      const v2040 = v1879(v2038, v2039);
      for (const v2041 of v2040) {
        const v2042 = v2038.nodes[v2041];
        if (!/^ZEEHO(?:[_. -].*)?$/i.test(v2042.name || "") || (v2042.children || []).length < 2) {
          continue;
        }
        const v2043 = v1879(v2038, v2042.children);
        const v2044 = [...v1880(v2038, v2043)].map(v2045 => v2038.materials?.[v2045]?.name || "");
        if (v2043.size >= 3 && ["A-Paint", "A-Metal", "A-ABS"].every(v2046 => v2044.some(v2047 => v2047.startsWith(v2046)))) {
          return v2043;
        }
      }
      return null;
    }
    const v1882 = new Set(["C-Plug", "C-Plug2", "C-LightPoint"]);
    function v1883(v2048) {
      if (!v1881(v2048.json)) {
        return false;
      }
      let v2049 = false;
      for (const v2050 of v2048.json.scenes || []) {
        if (Array.isArray(v2050.nodes)) {
          const v2051 = v2050.nodes.filter(v2052 => !v1882.has(v2048.json.nodes?.[v2052]?.name));
          if (v2051.length !== v2050.nodes.length) {
            v2050.nodes = v2051;
            v2049 = true;
          }
        }
      }
      return v2049;
    }
    const v1884 = v2053 => Math.min(1, Math.max(0, Number(v2053) || 0));
    const v1885 = v2054 => v2054 <= 0.04045 ? v2054 / 12.92 : ((v2054 + 0.055) / 1.055) ** 2.4;
    const v1886 = v2055 => v2055 <= 0.0031308 ? v2055 * 12.92 : v2055 ** (1 / 2.4) * 1.055 - 0.055;
    const v1887 = v2056 => "#" + (v2056 || [1, 1, 1]).slice(0, 3).map(v2057 => Math.round(v1884(v1886(v1884(v2057))) * 255).toString(16).padStart(2, "0")).join("");
    const v1888 = [[/^A-Paint(?:-|$)/, "车漆", "车身", "paint"], [/^A-ABS(?:-|$)/, "塑料外壳", "车身", "plastic"], [/^A-Metal-H-Black$/, "黑色金属件", "车身", "metal"], [/^A-Metal-L-Silver$/, "哑光银色件", "车身", "silver"], [/^A-Metal-H-Silver$/, "亮银色件", "车身", "silver"], [/^A-MH(?:-|$)/, "装饰件", "车身", "trim"], [/^A-Glass$/, "透明罩", "车身", ""], [/^T-Plate$/, "牌照饰面", "饰面", ""], [/^T-RedReflector$/, "反光片", "饰面", ""], [/^T-Screen$/, "仪表屏饰面", "饰面", ""], [/^T-Seat$/, "座垫", "饰面", ""], [/^T-Tex(?:-|$)/, "纹理饰面", "饰面", ""], [/^T-Hole$/, "孔洞饰面", "饰面", ""], [/^T-Wheel$/, "轮胎橡胶", "车轮", "wheel"], [/^T-BrakeFlange$/, "刹车盘", "车轮", "brake"], [/^L-BrakeLight(?:-|$)/, "刹车灯饰面", "车灯", ""], [/^L-HighBeam(?:-|$)/, "远光灯饰面", "车灯", ""], [/^L-LowBeam(?:-|$)/, "近光灯饰面", "车灯", ""], [/^L-TailLight(?:-|$)/, "尾灯饰面", "车灯", ""], [/^L-TurnSignal-L(?:-|$)/, "左转向灯饰面", "车灯", ""], [/^L-TurnSignal-R(?:-|$)/, "右转向灯饰面", "车灯", ""], [/^S-Shadow$/, "地面阴影", "环境", ""]];
    function v1889(v2058) {
      if (!v1881(v2058)) {
        return [];
      }
      const v2059 = (v2058.scenes?.[v2058.scene || 0]?.nodes || []).filter(v2062 => !v1882.has(v2058.nodes?.[v2062]?.name));
      const v2060 = v1880(v2058, v1879(v2058, v2059));
      const v2061 = new Map();
      for (const v2063 of [...v2060].sort((v2064, v2065) => v2064 - v2065)) {
        const v2066 = v2058.materials?.[v2063];
        if (!v2066) {
          continue;
        }
        const v2067 = String(v2066.name || "Material " + (v2063 + 1));
        const v2068 = v1888.find(v2074 => v2074[0].test(v2067));
        if (/^S-/.test(v2067) || v2067 === "T-Hole") {
          continue;
        }
        const v2069 = "mat:" + v2067;
        const v2070 = v2061.get(v2069);
        if (v2070) {
          v2070.indices.push(v2063);
          continue;
        }
        const v2071 = v2066.pbrMetallicRoughness;
        const v2072 = !Array.isArray(v2071?.baseColorFactor) && !!v2071?.baseColorTexture;
        const v2073 = v2068?.[2] === "车身" ? "核心外观" : v2068?.[2] || "其他部件";
        v2061.set(v2069, {
          key: v2069,
          name: v2067,
          index: v2063,
          indices: [v2063],
          label: v2068?.[1] || v2067,
          group: v2073,
          textureOnly: v2072,
          legacy: v2068?.[3] || "",
          cur: v1887(v2071?.baseColorFactor)
        });
      }
      return [...v2061.values()];
    }
    const v1890 = (v2075, v2076) => v2076?.[v2075.key] || (v2075.legacy ? v2076?.[v2075.legacy] : "") || "";
    function v1891(v2077, v2078, v2079) {
      if (!v1881(v2077.json)) {
        return false;
      }
      let v2080 = false;
      for (const v2081 of v2078) {
        const v2082 = v1890(v2081, v2079);
        if (!v1831.test(v2082)) {
          continue;
        }
        for (const v2083 of v2081.indices || [v2081.index]) {
          const v2084 = v2077.json.materials[v2083];
          if (v2084.name !== v2081.name) {
            continue;
          }
          const v2085 = v2084.pbrMetallicRoughness ||= {};
          const v2086 = v2085.baseColorFactor?.[3] ?? 1;
          v2085.baseColorFactor = [0, 2, 4].map(v2087 => v1885(parseInt(v2082.slice(v2087 + 1, v2087 + 3), 16) / 255)).concat(v2086);
          v2080 = true;
        }
      }
      return v2080;
    }
    async function v1892(v2088, v2089, v2090) {
      if (v2089.channel !== "pic3d") {
        return {
          variantBlob: null,
          variantSig: "",
          slots: []
        };
      }
      const v2091 = await v1877(v2088);
      const v2092 = v1889(v2091.json);
      const v2093 = v2092.map(v2096 => [v2096.key, v1890(v2096, v2089.colors)]).filter(([, v2097]) => v1831.test(v2097)).sort().map(v2098 => v2098.join("=")).join(",");
      if (v2090?.slots?.every(v2099 => Array.isArray(v2099.indices)) && v2090.variantSig === v2093 && Object.hasOwn(v2090, "variantBlob") && (!v2093 || v2090.variantBlob)) {
        return {
          variantBlob: v2090.variantBlob,
          variantSig: v2093,
          slots: v2090.slots
        };
      }
      const v2094 = v1883(v2091);
      const v2095 = v1891(v2091, v2092, v2089.colors);
      return {
        variantBlob: v2094 || v2095 ? v1878(v2091) : null,
        variantSig: v2093,
        slots: v2092
      };
    }
    async function v1893(v2100, v2101) {
      const v2102 = window.TXN;
      if (typeof v2102?.send !== "function" || !v2102.available?.()) {
        throw new Error("App 代发桥不可用，请更新 App");
      }
      const v2103 = await v2102.send({
        url: v2100,
        method: "GET",
        headers: {
          Accept: v2101 ? "application/json" : "*/*"
        },
        timeoutMs: 30000,
        responseType: "bytes",
        followRedirects: true
      });
      if (v2103.err || v2103.http < 200 || v2103.http >= 300) {
        throw new Error(v2103.message || "HTTP " + v2103.http);
      }
      if (v2103.truncated || !v2103.bytes?.byteLength) {
        throw new Error("资源响应为空或被截断");
      }
      if (v2101) {
        if (v2103.bytes.byteLength > 1048576) {
          throw new Error("资源清单超出大小限制");
        }
        return JSON.parse(new TextDecoder("utf-8", {
          fatal: true
        }).decode(v2103.bytes));
      }
      return new Blob([v2103.bytes]);
    }
    async function v1894(v2104, v2105, v2106 = null) {
      let v2107;
      const v2108 = v2105 ? [v1826[2], v1826[1], v1826[0], ...v1826.slice(3)] : v1826;
      for (const v2109 of v2108) {
        try {
          const v2110 = await v1893(v2109 + v2104, v2105);
          if (v2106) {
            return await v2106(v2110);
          } else {
            return v2110;
          }
        } catch (v2111) {
          v2107 = v2111;
        }
      }
      throw v2107 || new Error("仓库线路不可达");
    }
    async function v1895(v2112, v2113, v2114 = 0) {
      const v2115 = v2113 === "pic3d" ? v1827 : v1829;
      if (!v2112.size || v2112.size > v2115 || v2114 > 0 && v2112.size !== v2114) {
        throw new Error("资源为空、不完整或超出大小限制");
      }
      if (v2113 === "pic3d") {
        await v1877(v2112);
        return new Blob([v2112], {
          type: "model/gltf-binary"
        });
      }
      const v2116 = new Uint8Array(await v2112.slice(0, 32).arrayBuffer());
      const v2117 = new Uint8Array(await v2112.slice(-12).arrayBuffer());
      let v2118 = "";
      if (v2116.length >= 24 && v2116[0] === 137 && v2116[1] === 80 && v2116[2] === 78 && v2116[3] === 71 && v2116[4] === 13 && v2116[5] === 10 && v2116[6] === 26 && v2116[7] === 10 && v2117.length === 12 && v2117[4] === 73 && v2117[5] === 69 && v2117[6] === 78 && v2117[7] === 68) {
        v2118 = "image/png";
      } else if (v2116[0] === 255 && v2116[1] === 216 && v2116[2] === 255 && v2117[v2117.length - 2] === 255 && v2117[v2117.length - 1] === 217) {
        v2118 = "image/jpeg";
      } else if (v2116.length >= 12 && v2116[0] === 82 && v2116[1] === 73 && v2116[2] === 70 && v2116[3] === 70 && v2116[8] === 87 && v2116[9] === 69 && v2116[10] === 66 && v2116[11] === 80 && new DataView(v2116.buffer).getUint32(4, true) + 8 === v2112.size) {
        v2118 = "image/webp";
      }
      if (!v2118) {
        throw new Error("车辆立绘格式无效或文件不完整");
      }
      return new Blob([v2112], {
        type: v2118
      });
    }
    async function v1896(v2119, v2120) {
      const v2121 = typeof v2119?.source === "string" && /^https?:\/\//i.test(v2119.source.trim()) ? v2119.source.trim() : "";
      if (v2121) {
        try {
          return await v1895(await v1893(v2121, false), v2120);
        } catch {}
      }
      return v1894("models/" + v2120 + "/" + encodeURIComponent(v2119.file), false, v2122 => v1895(v2122, v2120, v2119.size));
    }
    function v1897(v2123, v2124 = false) {
      v2123 = v2123 === "pic3d" ? "pic3d" : "pic";
      if (v1856[v2123] && (!v2124 || v1857[v2123] === "loading")) {
        return v1856[v2123];
      }
      v1857[v2123] = "loading";
      v1856[v2123] = v1894("models/" + v2123 + ".json", true).then(v2125 => {
        v1855[v2123] = (Array.isArray(v2125?.items) ? v2125.items : []).filter(v2126 => v2126 && typeof v2126.file === "string" && /^[a-z0-9_. -]+$/i.test(v2126.file) && !v2126.file.includes("..")).map(v2127 => ({
          id: String(v2127.id || v2127.file.replace(/\.[a-z0-9]+$/i, "")),
          name: String(v2127.name || v2127.id || v2127.file),
          file: v2127.file,
          size: Number(v2127.size) || 0,
          note: String(v2127.note || ""),
          source: typeof v2127.source === "string" ? v2127.source.trim() : ""
        }));
        v1857[v2123] = "ready";
        return v1855[v2123];
      }).catch(() => {
        v1855[v2123] = [];
        v1857[v2123] = "error";
        return v1855[v2123];
      }).finally(() => {
        if (v1818.currentSheet?.(v1821)) {
          v1930();
        }
      });
      return v1856[v2123];
    }
    async function v1898(v2128, v2129) {
      let v2130 = v2128.mode;
      if (v2130.kind === "default") {
        return null;
      }
      const v2131 = v1866(v2130);
      let v2132 = v2129 || (await v1874(v2131));
      if (!v1868(v2128)) {
        return null;
      }
      let v2133 = v2132?.baseId === v2131 ? v2132.baseBlob : null;
      let v2134 = v2130.customName || (v2132?.baseId === v2131 ? v2132.name : "") || "";
      if (!v2133 && v2130.kind === "custom") {
        throw new Error("本机文件已缺失，请重新选择；当前车辆已回退默认立绘");
      }
      if (!v2133) {
        const v2136 = await v1897(v2130.channel);
        if (!v1868(v2128)) {
          return null;
        }
        if (v1857[v2130.channel] === "error") {
          throw new Error("预设清单不可达，请重试");
        }
        const v2137 = v2130.presetId ? v2136.find(v2139 => v2139.id === v2130.presetId) : v2136[0];
        if (!v2137) {
          throw new Error("所选预设已不存在，请重新选择");
        }
        if (!v2130.presetId) {
          v2130 = {
            channel: v2130.channel,
            kind: "preset",
            presetId: v2137.id
          };
          const v2140 = v1859(v1836);
          v2140.vins[v2128.vin] = v2130;
          const v2141 = await v1871(() => v1868(v2128) ? v1872(v2140) : false);
          if (!v1868(v2128)) {
            return null;
          }
          if (!v2141) {
            throw new Error("样式选择保存失败");
          }
          v1836 = v2140;
          v2128.mode = v2130;
          v2128.sig = v1867(v2128.vin, v2128.home, v2130);
        }
        v2134 = v2137.name;
        v2133 = await v1896(v2137, v2130.channel);
        if (!v1868(v2128)) {
          return null;
        }
        const v2138 = v2130.channel === "pic3d" ? v1827 : v1829;
        if (!v2133.size || v2133.size > v2138) {
          throw new Error("资源为空或超出大小限制");
        }
      }
      const v2135 = await v1892(v2133, v2130, v2132?.baseId === v1866(v2130) ? v2132 : null);
      if (!v1868(v2128)) {
        return null;
      }
      return {
        id: v1825,
        baseId: v1866(v2130),
        channel: v2130.channel,
        baseBlob: v2133,
        ...v2135,
        name: v2134,
        usedAt: Date.now()
      };
    }
    function v1899(v2142, v2143, v2144, v2145 = null, v2146 = null) {
      v1869();
      const v2147 = {
        vin: v2142,
        home: v2143,
        mode: v1863(v2144),
        sig: v1867(v2142, v2143, v2144),
        epoch: v1842,
        preview: v1858(),
        status: v2144.kind === "default" ? "idle" : "loading",
        error: "",
        name: v2144.customName || ""
      };
      v1841 = v2147;
      v2147.promise = Promise.resolve().then(async () => {
        if (v2145) {
          const v2150 = await v1871(() => v1868(v2147) ? v1872(v2145.next) : false);
          if (!v1868(v2147)) {
            return "default";
          }
          if (!v2150) {
            v1836 = v2145.old;
            v2147.mode = v1865(v2142);
            v2147.sig = v1867(v2142, v2143, v2147.mode);
            throw new Error("样式选择保存失败，原选择与旧文件已保留");
          }
        }
        const v2148 = await v1898(v2147, v2146);
        if (!v1868(v2147)) {
          return "default";
        }
        const v2149 = (() => {
          v1864();
          const v2151 = new Set();
          for (const v2152 of Object.values(v1836.vins)) {
            const v2153 = v1863(v2152);
            if (v2153.kind !== "default") {
              v2151.add(v1866(v2153));
            }
          }
          return v2151;
        })();
        await v1871(async () => {
          if (!v1868(v2147)) {
            return;
          }
          const v2154 = v2148 && v1838?.baseId === v2148.baseId && v1838?.baseBlob === v2148.baseBlob && v1838?.variantSig === v2148.variantSig && v1840 === v2147.preview;
          if (!v2154 && (v2147.mode.kind !== "default" || !!v2147.preview || !!window.indexedDB)) {
            if (!(await v1875(v2148, v2147, v2149))) {
              return;
            }
          }
          if (!v1868(v2147)) {
            return;
          }
          v1876(v2148, v2147);
          v2147.status = v2147.mode.kind === "default" ? "idle" : "ready";
          v2147.name = v2148?.name || "";
          v1870();
        });
        if (v1868(v2147) && v2147.status === "ready") {
          return v2147.mode.channel;
        } else {
          return "default";
        }
      }).catch(v2155 => {
        if (v1868(v2147)) {
          v2147.status = "error";
          v2147.error = String(v2155?.message || v2155);
          v1870();
        }
        return "default";
      });
      return v2147;
    }
    function v1900(v2156, v2157) {
      v1864();
      if (!v2156 || v1862().vin !== String(v2156)) {
        return null;
      }
      v2156 = String(v2156);
      const v2158 = v1865(v2156);
      const v2159 = v1867(v2156, v2157, v2158);
      if (v1841?.sig === v2159 && v1868(v1841)) {
        return v1841;
      }
      return v1899(v2156, v2157, v2158);
    }
    function v1901(v2160, v2161) {
      const v2162 = v1865(v2160);
      const v2163 = v1841?.vin === String(v2160) && v1868(v1841) && v1841.sig === v1867(String(v2160), v2161, v2162);
      const v2164 = v2163 ? v1841.status : "idle";
      const v2165 = v2163 ? v1841.error : "";
      if (v2162.kind === "default" && v2162.channel === "pic3d" && v2161?.pic3d && v2164 !== "error") {
        return {
          channel: "pic3d",
          url: String(v2161.pic3d),
          id: "official:" + v2160 + ":" + v2161.pic3d,
          status: v2165 ? "error" : "ready",
          error: v2165,
          name: v2161.typeName || v2161.name || "官方车模",
          orbit: v2162.orbit,
          orbitOff: v2162.orbitOff === true
        };
      }
      if (v2162.kind !== "default" && v2163 && v2164 === "ready" && v1846?.vin === String(v2160) && v1846.sig === v1841.sig) {
        return {
          channel: v2162.channel,
          url: v1846.url,
          id: v1838.baseId + "|" + v1838.variantSig,
          status: v2164,
          error: v2165,
          name: v1841.name,
          orbit: v2162.orbit,
          orbitOff: v2162.orbitOff === true
        };
      }
      return {
        channel: "default",
        url: "",
        id: "",
        status: v2164,
        error: v2165,
        name: v2163 ? v1841.name : ""
      };
    }
    function v1902(v2166, v2167) {
      const v2168 = v1862();
      v2166 = String(v2166 || v2168.vin || "");
      v2167 ||= v2168.home;
      if (v2166 === v2168.vin) {
        v1900(v2166, v2167);
      } else {
        return {
          channel: "default",
          url: "",
          id: "",
          status: "idle",
          error: "",
          name: ""
        };
      }
      return v1901(v2166, v2167);
    }
    function v1903(v2169) {
      const v2170 = v1862();
      const v2171 = v1900(String(v2169 || v2170.vin), v2170.home);
      if (v2171) {
        return v2171.promise;
      } else {
        return Promise.resolve("default");
      }
    }
    async function v1904(v2172) {
      const v2173 = document.createElement("img");
      const v2174 = URL.createObjectURL(v2172);
      try {
        await new Promise((v2177, v2178) => {
          v2173.onload = v2177;
          v2173.onerror = v2178;
          v2173.src = v2174;
        });
        if (!v2173.naturalWidth || !v2173.naturalHeight) {
          throw new Error("invalid_widget_image");
        }
        const v2175 = Math.min(1, 420 / v2173.naturalWidth, 280 / v2173.naturalHeight);
        const v2176 = document.createElement("canvas");
        v2176.width = Math.max(1, Math.round(v2173.naturalWidth * v2175));
        v2176.height = Math.max(1, Math.round(v2173.naturalHeight * v2175));
        v2176.getContext("2d").drawImage(v2173, 0, 0, v2176.width, v2176.height);
        return v2176.toDataURL("image/png");
      } finally {
        URL.revokeObjectURL(v2174);
      }
    }
    async function v1905() {
      if (v1858() || typeof window.ZeehoShell?.syncWidgetCar !== "function" || typeof window.ZeehoShell?.pollWidgetCar !== "function") {
        return false;
      }
      const v2179 = v1816.getNativeUiContext?.();
      const {
        vin: v2180,
        home: v2181
      } = v1862();
      if (!v2179 || v2179.vin !== v2180 || !v2179.isCurrent()) {
        return false;
      }
      const v2182 = v1900(v2180, v2181);
      if (!v2182) {
        return false;
      }
      await v2182.promise;
      const v2183 = () => v1868(v2182) && v2179.isCurrent() && v1816.getNativeUiContext?.()?.frame === v2179.frame;
      if (!v2183()) {
        return false;
      }
      const v2184 = v1901(v2180, v2181);
      const v2185 = v2184.channel === "pic" && v2184.status === "ready" ? v1846?.blob : null;
      const v2186 = JSON.stringify([v2179.navId, v2179.frame, v2180, v2185 ? v2184.id : ""]);
      if (v1853 === v2186) {
        return true;
      }
      if (v1852?.key === v2186) {
        return v1852.promise;
      }
      const v2187 = {
        key: v2186,
        promise: null
      };
      v1852 = v2187;
      v2187.promise = (async () => {
        try {
          const v2188 = v2185 ? await v1904(v2185) : "";
          if (!v2183() || v1852 !== v2187) {
            return false;
          }
          const v2189 = window.ZeehoShell.syncWidgetCar(JSON.stringify({
            navId: v2179.navId,
            vin: v2180,
            frame: v2179.frame,
            dataUrl: v2188
          }));
          if (typeof v2189 !== "string" || !v2189) {
            return false;
          }
          const v2190 = Date.now() + 10000;
          while (v2183() && v1852 === v2187 && Date.now() < v2190) {
            const v2191 = window.ZeehoShell.pollWidgetCar(v2189);
            if (v2191 === "ready") {
              v1853 = v2186;
              return true;
            }
            if (v2191 !== "pending") {
              return false;
            }
            await new Promise(v2192 => setTimeout(v2192, 100));
          }
        } catch {} finally {
          if (v1852 === v2187) {
            v1852 = null;
          }
        }
        return false;
      })();
      return v2187.promise;
    }
    function v1906(v2193 = v1862().vin) {
      const v2194 = v1865(v2193);
      if (v1841 && v1868(v1841) && v1841.vin === v2193 && v1841.status === "ready" && v1838?.baseId === v1866(v2194)) {
        return (v1838.slots || []).map(v2195 => ({
          ...v2195,
          indices: [...v2195.indices]
        }));
      } else {
        return [];
      }
    }
    const v1907 = {
      file: "AE4-MAX2plus.glb",
      name: "AE4 MAX2+"
    };
    const v1908 = {
      default: 90,
      custom: 145
    };
    let v1909 = null;
    function v1910() {
      if (!v1909) {
        v1909 = (async () => {
          const v2196 = await v1894("models/pic3d/" + v1907.file, false, v2200 => v1895(v2200, "pic3d"));
          const v2197 = await v1877(v2196);
          const v2198 = v1883(v2197);
          const v2199 = v2198 ? v1878(v2197) : v2196;
          return {
            url: URL.createObjectURL(v2199),
            alt: v1907.name + " 三维轨迹车辆",
            azimuth: v1908.default,
            target: "0m 0.55m 0m",
            distance: "2.8m",
            channel: "default"
          };
        })().catch(v2201 => {
          v1909 = null;
          throw v2201;
        });
      }
      return v1909;
    }
    async function v1911() {
      const {
        vin: v2202,
        home: v2203
      } = v1862();
      const v2204 = v1865(v2202);
      if (v2202 && v2204.channel === "pic3d" && v2204.kind !== "default") {
        try {
          await v1903(v2202);
        } catch {}
        const v2205 = v1902(v2202, v2203);
        if (v2205.channel === "pic3d" && v2205.url && v2205.status === "ready") {
          return {
            url: v2205.url,
            alt: (v2205.name || "自定义车模") + " 三维轨迹车辆",
            azimuth: v1908.custom,
            target: "0m 0.55m 0m",
            distance: "2.8m",
            channel: "custom"
          };
        }
      }
      return v1910();
    }
    function v1912(v2206, v2207, v2208 = null) {
      v1864();
      const v2209 = v1862();
      if (String(v2206) !== v2209.vin || !v2209.home) {
        return Promise.resolve(false);
      }
      const v2210 = v1859(v1836);
      const v2211 = v1863(v2207);
      v1836.vins[v2206] = v2211;
      const v2212 = {
        old: v2210,
        next: v1859(v1836)
      };
      const v2213 = v1899(String(v2206), v2209.home, v2211, v2212, v2208);
      v1870();
      return v2213.promise.then(() => v1868(v2213) && v2213.status !== "error");
    }
    function v1913(v2214, v2215) {
      const v2216 = v1865(v2214);
      const v2217 = v2215 === "pic3d" ? "pic3d" : "pic";
      if (v2216.channel === v2217) {
        return v1903(v2214);
      }
      return v1912(v2214, {
        channel: v2217,
        kind: "default"
      });
    }
    function v1914(v2218, v2219) {
      const v2220 = v1865(v2218);
      if (!["default", "preset", "custom"].includes(v2219)) {
        return Promise.resolve(false);
      }
      if (v2220.kind === v2219) {
        return v1903(v2218);
      }
      if (v2219 === "preset") {
        v1897(v2220.channel);
      }
      return v1912(v2218, {
        channel: v2220.channel,
        kind: v2219
      });
    }
    function v1915(v2221, v2222) {
      const v2223 = v1865(v2221);
      return v1912(v2221, {
        channel: v2223.channel,
        kind: "preset",
        presetId: String(v2222)
      });
    }
    function v1916(v2224, v2225, v2226) {
      const v2227 = v1865(v2224);
      const v2228 = v1906(v2224).find(v2229 => v2229.key === v2225 || v2229.legacy === v2225);
      if (v2227.channel !== "pic3d" || !v2228 || !v1831.test(v2226)) {
        return Promise.resolve(false);
      }
      return v1912(v2224, {
        ...v2227,
        colors: {
          ...(v2227.colors || {}),
          [v2228.key]: v2226.toLowerCase()
        }
      });
    }
    function v1917(v2230) {
      const v2231 = v1865(v2230);
      if (v2231.channel !== "pic3d" || !v1906(v2230).length) {
        return Promise.resolve(false);
      }
      return v1912(v2230, {
        ...v2231,
        colors: {}
      });
    }
    function v1918(v2232, v2233) {
      const v2234 = v1865(v2232);
      if (v2234.channel !== "pic3d") {
        return Promise.resolve(false);
      }
      return v1912(v2232, {
        ...v2234,
        orbitOff: v2233 === false ? undefined : false,
        orbit: v2234.orbit
      });
    }
    function v1919(v2235, v2236) {
      const v2237 = String(v2236 || "");
      const v2238 = v1832.exec(v2237);
      if (!v2238) {
        return;
      }
      const v2239 = v2237.includes("rad");
      const v2240 = Number(v2238[1]);
      const v2241 = Number(v2238[2]);
      const v2242 = {
        theta: Math.round((v2239 ? v1835(v2240) : v2240) * 10) / 10,
        phi: Math.round((v2239 ? v1835(v2241) : v2241) * 10) / 10
      };
      const v2243 = v1865(v2235);
      if (v2243.channel !== "pic3d" || v2243.orbitOff === true) {
        return;
      }
      const v2244 = v2243.orbit || {};
      if (Math.abs((v2244.theta ?? 1000000000) - v2242.theta) < v1833 && Math.abs((v2244.phi ?? 1000000000) - v2242.phi) < v1833) {
        return;
      }
      const v2245 = v1863({
        ...v2243,
        orbit: v2242
      });
      v1836.vins[v2235] = v2245;
      v1871(() => v1872(v1859(v1836)));
    }
    function v1920() {
      const {
        vin: v2246,
        home: v2247
      } = v1862();
      if (!v2246) {
        return Promise.resolve("default");
      }
      const v2248 = v1865(v2246);
      if (v2248.kind === "preset" && v1857[v2248.channel] === "error") {
        v1897(v2248.channel, true);
      }
      const v2249 = v1899(v2246, v2247, v2248);
      v1870();
      return v2249.promise;
    }
    async function v1921(v2250) {
      const {
        vin: v2251,
        home: v2252
      } = v1862();
      const v2253 = v1865(v2251);
      if (!v2251 || !v2252 || !v2250 || typeof v2250.arrayBuffer !== "function") {
        return false;
      }
      v1869();
      const v2254 = {
        vin: v2251,
        home: v2252,
        mode: v2253,
        sig: v1867(v2251, v2252, v2253),
        epoch: v1842,
        preview: v1858(),
        status: "loading",
        error: "",
        name: v2250.name || ""
      };
      v1841 = v2254;
      v2254.promise = (async () => {
        try {
          const v2255 = v2253.channel === "pic3d" ? v1828 : v1829;
          if (!v2250.size || v2250.size > v2255) {
            throw new Error("文件为空或过大，上限 " + v2255 / 1024 / 1024 + "MB");
          }
          if (v2253.channel !== "pic3d" && !/^image\/(png|jpeg|webp)$/i.test(v2250.type || "")) {
            throw new Error("请选择 PNG、JPG 或 WebP 图片");
          }
          if (v2253.channel === "pic3d") {
            await v1877(v2250);
          }
          if (!v1868(v2254)) {
            return false;
          }
          const v2256 = "custom-" + (window.crypto?.randomUUID?.() || Date.now() + "-" + Math.random().toString(16).slice(2));
          return await v1912(v2251, {
            channel: v2253.channel,
            kind: "custom",
            customId: v2256,
            customName: v2250.name || "自定义资源"
          }, {
            baseId: v2256,
            baseBlob: v2250,
            name: v2250.name || "自定义资源"
          });
        } catch (v2257) {
          if (v1868(v2254)) {
            v2254.status = "error";
            v2254.error = String(v2257?.message || v2257);
            v1870();
          }
          return false;
        }
      })();
      v1870();
      return v2254.promise;
    }
    function v1922() {
      const {
        vin: v2258
      } = v1862();
      const v2259 = v1865(v2258);
      const v2260 = document.createElement("input");
      v2260.type = "file";
      v2260.accept = v2259.channel === "pic3d" ? ".glb,model/gltf-binary" : "image/png,image/jpeg,image/webp";
      v2260.hidden = true;
      document.body.append(v2260);
      v2260.addEventListener("cancel", () => v2260.remove(), {
        once: true
      });
      v2260.onchange = () => {
        v2260.remove();
        if (v2260.files?.[0]) {
          v1921(v2260.files[0]);
        }
      };
      v2260.click();
    }
    const v1923 = (v2261, v2262) => "<button type=\"button\" class=\"btn tonal vs-button\" data-vs-act=\"" + v2261 + "\">" + v2262 + "</button>";
    function v1924(v2263, v2264, v2265, v2266, v2267) {
      return "<button type=\"button\" role=\"radio\" aria-checked=\"" + v2267 + "\" tabindex=\"" + (v2267 ? 0 : -1) + "\" class=\"vs-seg" + (v2267 ? " sel" : "") + "\" data-vs-act=\"" + v2263 + "\" data-v=\"" + v1820(v2264) + "\"><span class=\"t\">" + v2265 + "</span><span class=\"s\">" + v2266 + "</span></button>";
    }
    function v1925(v2268, v2269) {
      if (v2268.channel !== "pic3d" || v2268.kind === "default") {
        return "";
      }
      const v2270 = v1906(v2269);
      if (!v2270.length) {
        if (v1841?.status === "ready") {
          return "<div class=\"card-sub mt8\">该模型不是极核车辆模型，不支持部件改色。</div>";
        } else {
          return "";
        }
      }
      const v2271 = v2276 => v2276.map(v2277 => {
        const v2278 = v1890(v2277, v2268.colors) || v2277.cur;
        const v2279 = !!v2268.colors && !!v2268.colors[v2277.key];
        return "<div class=\"vs-color-row\"><span class=\"vs-color-label\" title=\"" + v1820(v2277.name) + "\">" + v1820(v2277.label) + (v2279 ? "<small class=\"vs-changed\"> · 已改</small>" : "") + (v2277.textureOnly ? "<small class=\"card-sub\"> · 贴图为主，改色影响有限</small>" : "") + "</span><label class=\"vs-color-dot\" style=\"--sw:" + v1820(v2278) + "\" title=\"" + v1820(v2277.name) + "\"><input type=\"color\" value=\"" + v1820(v2278) + "\" data-vs-color=\"" + v1820(v2277.key) + "\" aria-label=\"" + v1820(v2277.label + "（" + v2277.name + "）颜色") + "\"></label></div>";
      }).join("");
      const v2272 = v2270.filter(v2280 => v2280.group === "核心外观");
      const v2273 = v2270.filter(v2281 => v2281.group !== "核心外观");
      const v2274 = [...new Set(v2273.map(v2282 => v2282.group))];
      const v2275 = v2273.length ? "<details class=\"vs-more-parts\"><summary><span>更多部件 · " + v2273.length + "</span>" + v1818.icon("down", 18) + "</summary>" + v2274.map(v2283 => "<div class=\"vs-part-group\">" + v1820(v2283) + "</div>" + v2271(v2273.filter(v2284 => v2284.group === v2283))).join("") + "</details>" : "";
      return "<section class=\"card vs-paint\"><div class=\"vs-info-head\"><span class=\"card-title\">部件颜色</span><span class=\"vs-model\">仅影响面板展示</span></div>" + v2271(v2272) + v2275 + "<label class=\"vs-orbit-row\"><input type=\"checkbox\" data-vs-act=\"orbit-memory\"" + (v2268.orbitOff === true ? "" : " checked") + "><span>记住旋转角度<span class=\"card-sub\">拖动模型后，下次进入保持当前视角</span></span></label>" + (Object.keys(v2268.colors || {}).length ? "<div class=\"field\">" + v1923("resetcolor", "恢复原色") + "</div>" : "") + "<div class=\"card-sub vs-hint\">纹理部件调整的是颜色乘数，不替换贴图；车灯不会因此点亮。</div></section>";
    }
    function v1926(v2285) {
      const v2286 = v1857[v2285.channel];
      if (v2286 === "idle" || v2286 === "loading") {
        return v1818.spinner("正在读取仓库预设…");
      }
      if (v2286 === "error") {
        return "<div class=\"note bad\" role=\"status\">" + v1818.icon("alert", 18) + "<div>预设清单读取失败<div class=\"field\">" + v1923("retry-list", "重试清单") + "</div></div></div>";
      }
      const v2287 = v1855[v2285.channel] || [];
      if (!v2287.length) {
        return "<div class=\"card-sub\">仓库暂无预设。</div>";
      }
      return "<div role=\"radiogroup\" aria-label=\"仓库预设\">" + v2287.map((v2288, v2289) => {
        const v2290 = v2285.presetId === v2288.id;
        const v2291 = [v2288.note, v2288.size ? (v2288.size / 1024 / 1024).toFixed(1) + "MB" : ""].filter(Boolean).join(" · ");
        return "<button type=\"button\" class=\"sheet-item vs-preset-item" + (v2290 ? " sel" : "") + "\" role=\"radio\" aria-checked=\"" + v2290 + "\" tabindex=\"" + (v2290 || !v2285.presetId && v2289 === 0 ? 0 : -1) + "\" data-vs-act=\"preset\" data-v=\"" + v1820(v2288.id) + "\"><span class=\"ico\">" + v1818.icon(v2290 ? "check" : v2285.channel === "pic3d" ? "box" : "camera", 18) + "</span><span class=\"sheet-item-text\"><span class=\"t\">" + v1820(v2288.name) + "</span>" + (v2291 ? "<span class=\"s\">" + v1820(v2291) + "</span>" : "") + "</span></button>";
      }).join("") + "</div>";
    }
    function v1927() {
      const {
        vin: v2292,
        home: v2293
      } = v1862();
      if (!v2292 || !v2293) {
        return "<div class=\"card-sub\" role=\"status\">暂无车辆信息，加载车辆后即可设置。</div>";
      }
      const v2294 = v1865(v2292);
      const v2295 = v1901(v2292, v2293);
      const v2296 = (v2301, v2302) => "<div class=\"kv\"><span class=\"vs-kv-t\">" + v2301 + "</span><span class=\"vs-kv-v\">" + (v2302 ? "支持" : "未提供") + "</span></div>";
      const v2297 = "<div class=\"vs-seg-row\" role=\"radiogroup\" aria-label=\"样式类型\">" + v1924("channel", "pic", "静态立绘", "图片展示", v2294.channel === "pic") + v1924("channel", "pic3d", "3D 模型", "可旋转模型", v2294.channel === "pic3d") + "</div>";
      const v2298 = "<div class=\"vs-seg-row kinds\" role=\"radiogroup\" aria-label=\"来源\">" + v1924("kind", "default", "默认", "跟随官方", v2294.kind === "default") + v1924("kind", "preset", "仓库预设", "在线列表", v2294.kind === "preset") + v1924("kind", "custom", "自定义", "本机文件", v2294.kind === "custom") + "</div>";
      const v2299 = v2294.kind === "preset" ? "<div class=\"vs-preset\">" + v1926(v2294) + "</div>" : v2294.kind === "custom" ? "<div class=\"vs-custom\"><div class=\"card-sub\">" + (v2294.channel === "pic3d" ? "内嵌资源 GLB，最多 60MB" : "PNG / JPG / WebP，最多 8MB") + "；仅保留当前使用文件。</div><div class=\"field\">" + v1923("pick", v2294.customName ? "重新选择文件" : "选择文件") + "</div>" + (v2294.customName ? "<div class=\"vs-file\"><span title=\"" + v1820(v2294.customName) + "\">" + v1820(v2294.customName) + "</span>" + v1923("clearcustom", "移除") + "</div>" : "") + "</div>" : "";
      const v2300 = v2295.status === "loading" ? v1818.spinner("正在准备当前车辆样式…") : v2295.status === "error" ? "<div class=\"note bad\" role=\"status\">" + v1818.icon("alert", 18) + "<div>" + v1820(v2295.error) + "<div class=\"card-sub\">正在显示当前车辆的默认立绘。</div><div class=\"field\">" + v1923("retry-resource", "重试资源") + "</div></div></div>" : "<div class=\"card-sub\" role=\"status\">" + (v2295.status === "ready" ? v1820(v2295.name || "资源已就绪") : v2294.channel === "pic3d" && !v2293.pic3d ? "官方未提供 3D 模型，默认显示静态立绘。" : "使用当前车辆的默认立绘。") + (v1858() ? " · 预览不写入真实资源库" : "") + "</div>";
      return "<div class=\"vs-content\"><section class=\"card\"><div class=\"vs-info-head\"><span class=\"card-title\">官方车辆信息</span><span class=\"vs-model\" title=\"" + v1820(v2293.typeName || v2293.name || "") + "\">" + v1820(v2293.typeName || v2293.name || "") + "</span></div>" + v2296("静态立绘", !!v2293.pic) + v2296("3D 模型", !!v2293.pic3d) + "<div class=\"field vs-info-actions\">" + v1923("copy", v1818.icon("copy", 16) + "复制信息") + v1923("submit", v1818.icon("link", 16) + "提交反馈") + "</div><div class=\"card-sub vs-hint\">复制车型与素材地址后，可自行通过问卷反馈。</div></section><section class=\"vs-options\"><div class=\"section-title\"><span>样式类型</span><span class=\"line\"></span></div>" + v2297 + "<div class=\"section-title\"><span>资源来源</span><span class=\"line\"></span></div>" + v2298 + "<div class=\"vs-status\" aria-live=\"polite\">" + v2300 + "</div>" + v2299 + "</section>" + v1925(v2294, v2292) + "</div>";
    }
    function v1928() {
      return {
        key: v1821,
        closeMode: "current",
        title: "车辆样式",
        sub: "立绘与 3D 模型 · 面板内生效",
        className: "vehicle-style-sheet",
        body: v1927(),
        onMount: v2303 => {
          v1848 = v2303.querySelector(".sheet-body");
        },
        onDismiss: () => {
          v1848 = null;
        }
      };
    }
    function v1929() {
      v1864();
      const {
        vin: v2304,
        home: v2305
      } = v1862();
      v1902(v2304, v2305);
      v1897("pic");
      v1897("pic3d");
      return v1818.sheet(v1861(), v1928());
    }
    function v1930() {
      const v2306 = v1818.currentSheet?.(v1821);
      if (!v2306) {
        return;
      }
      const v2307 = v1865(v1862().vin);
      if (v2307.kind === "preset" && v1857[v2307.channel] === "idle") {
        v1897(v2307.channel);
      }
      v1818.updateSheet(v2306, v1928());
    }
    function v1931(v2308) {
      const {
        vin: v2309,
        home: v2310
      } = v1862();
      v1902(v2309, v2310);
      if (v2308) {
        v1848 = v2308.matches?.(".sheet-body") ? v2308 : v2308.querySelector?.(".sheet-body");
      }
      v1930();
    }
    function v1932(v2311) {
      return v2311.closest(".hero-stage") || v2311.parentElement;
    }
    function v1933(v2312) {
      const v2313 = v1865(v2312);
      if (v2313.orbitOff === true) {
        return "";
      } else {
        return v2313.orbit;
      }
    }
    function v1934(v2314) {
      const v2315 = v2314.dataset && v2314.dataset.vsVin || v2314.getAttribute?.("data-vs-vin") || "";
      const v2316 = v1933(v2315);
      if (!v2316) {
        return;
      }
      const v2317 = v2314.getAttribute("camera-orbit") || "";
      const v2318 = v1832.exec(v2317);
      const v2319 = v1832.exec(v2316.theta + "deg " + v2316.phi + "deg");
      if (v2318 && v2319 && Math.abs(Number(v2318[1]) - Number(v2319[1])) < 0.5 && Math.abs(Number(v2318[2]) - Number(v2319[2])) < 0.5) {
        return;
      }
      v2314.setAttribute("camera-orbit", v2316.theta + "deg " + v2316.phi + "deg 2.6m");
    }
    function v1935(v2320, v2321, v2322) {
      if (v2320?.classList) {
        v2320.classList.toggle("vs-model-ready", v2322);
      }
      if (v2321?.classList) {
        v2321.classList.toggle("vs-model-ready", v2322);
      }
      const v2323 = (v2321?.querySelector ? v2321.querySelector(".vs-model-fallback") : null) || (v2320?.querySelector ? v2320.querySelector(".vs-model-fallback") : null);
      if (!v2323) {
        return;
      }
      v2323.hidden = v2322;
      if (v2323.style) {
        v2323.style.display = v2322 ? "none" : "";
      }
    }
    function v1936(v2324, v2325, v2326 = "") {
      const v2327 = v1932(v2324);
      if (!v2327 && !v2324) {
        return;
      }
      const v2328 = v2325 === "ready";
      const v2329 = v2327?.querySelector?.(".vs-model-status");
      v1935(v2327, v2324, v2328);
      if (v2327) {
        v2327.classList.toggle("vs-model-error", v2325 === "error");
      }
      if (v2329) {
        v2329.hidden = v2328;
        v2329.setAttribute("role", "status");
        v2329.setAttribute("aria-live", "polite");
        v2329.innerHTML = v2328 ? "" : v2325 === "error" ? v1820(v2326 || "模型加载失败，已保留静态立绘") + "<div class=\"field\">" + v1923("retry-model", "重试模型") + "</div>" : v1818.spinner(v2326 || "3D 模型加载中…");
      }
    }
    function v1937() {
      if (v1851) {
        return Promise.reject(new Error(v1851));
      }
      if (!v1850) {
        v1850 = Promise.resolve().then(() => {
          if (typeof v1818.loadModelViewer !== "function") {
            throw new Error("3D 展示组件不可用");
          }
          return v1818.loadModelViewer();
        }).catch(v2330 => {
          v1851 = String(v2330?.message || v2330);
          v1850 = null;
          throw v2330;
        });
      }
      return v1850;
    }
    function v1938(v2331) {
      if (!v2331?.querySelectorAll) {
        return;
      }
      const v2332 = [...v2331.querySelectorAll("model-viewer.hero-3d[data-vs-model]")];
      if (v2331.matches?.("model-viewer.hero-3d[data-vs-model]")) {
        v2332.unshift(v2331);
      }
      for (const v2333 of v2332) {
        const v2334 = v2333.getAttribute("src") || "";
        let v2335 = v1854.get(v2333);
        if (v2335?.src === v2334) {
          const v2337 = v2335.state === "ready" || v2333.loaded === true;
          if (v2337 && v2335.state !== "ready") {
            v2335.state = "ready";
          }
          v1935(v1932(v2333), v2333, v2337);
          continue;
        }
        if (v2335) {
          for (const [v2338, v2339] of Object.entries(v2335.events)) {
            v2333.removeEventListener(v2338, v2339);
          }
        }
        const v2336 = () => v1854.get(v2333) === v2335 && v2333.isConnected !== false && v2333.getAttribute("src") === v2334;
        v2335 = {
          src: v2334,
          state: "loading",
          events: {}
        };
        v2335.events.load = () => {
          if (v2336()) {
            v2335.state = "ready";
            v1936(v2333, "ready");
            v1934(v2333);
          }
        };
        v2335.events.error = () => {
          if (v2336()) {
            v2335.state = "error";
            v1936(v2333, "error");
          }
        };
        v2335.events.progress = v2340 => {
          if (!v2336() || v2335.state !== "loading") {
            return;
          }
          const v2341 = Number(v2340.detail?.totalProgress);
          v1936(v2333, "loading", Number.isFinite(v2341) ? "3D 模型加载中 · " + Math.min(99, Math.max(0, Math.round(v2341 * 100))) + "%" : "3D 模型加载中…");
        };
        v2335.events["camera-change"] = () => {
          if (v2336() && v2335.state === "ready") {
            v1919(v2333.dataset?.vsVin || v2333.getAttribute("data-vs-vin") || "", v2333.getCameraOrbit?.() || v2333.getAttribute("camera-orbit"));
          }
        };
        v2335.events.pointerup = () => {
          if (!v2336() || v2333.loaded !== true) {
            return;
          }
          v1919(v2333.dataset?.vsVin || v2333.getAttribute("data-vs-vin") || "", v2333.getAttribute("camera-orbit") || "");
        };
        v1854.set(v2333, v2335);
        for (const [v2342, v2343] of Object.entries(v2335.events)) {
          v2333.addEventListener(v2342, v2343);
        }
        if (v2333.dataset) {
          v2333.dataset.vsVin = v1862().vin || "";
        }
        v1936(v2333, "loading");
        if (v2333.loaded === true) {
          v2335.events.load();
          continue;
        }
        v1937().then(() => {
          if (!v2336()) {
            return;
          }
          if (v2333.loaded === true) {
            v2335.events.load();
          }
        }).catch(() => {
          if (v2336()) {
            v2335.state = "error";
            v1936(v2333, "error", "3D 组件加载失败，已保留静态立绘");
          }
        });
      }
    }
    function v1939(v2344) {
      const v2345 = v2344.closest(".hero-stage");
      const v2346 = v2345?.querySelector("model-viewer.hero-3d[data-vs-model]");
      if (!v2346) {
        v1920();
        return;
      }
      v1851 = "";
      v1850 = null;
      const v2347 = v1854.get(v2346);
      if (v2347) {
        for (const [v2349, v2350] of Object.entries(v2347.events)) {
          v2346.removeEventListener(v2349, v2350);
        }
      }
      v1854.delete(v2346);
      const v2348 = v2346.getAttribute("src");
      v2346.removeAttribute("src");
      queueMicrotask(() => {
        if (v2346.isConnected !== false) {
          v2346.setAttribute("src", v2348);
          v1938(v2345);
        }
      });
    }
    function v1940(v2351, v2352) {
      if (v2351 === "retry-model") {
        v1939(v2352);
        return;
      }
      const {
        vin: v2353,
        home: v2354
      } = v1862();
      if (!v2353 || !v2354) {
        return;
      }
      const v2355 = v1865(v2353);
      if (v2351 === "copy") {
        v1818.copy(JSON.stringify({
          vehicleType: v2354.type || "",
          vehicleTypeName: v2354.typeName || "",
          vehiclePicUrl: v2354.pic || "",
          vehiclePic3dUrl: v2354.pic3d || ""
        }, null, 2), v1861(), "车辆信息 JSON");
      } else if (v2351 === "submit") {
        if (window.ZeehoShell && typeof window.ZeehoShell.appVersion === "function" && /Android/i.test(navigator.userAgent)) {
          window.location.href = "intent://" + v1830.slice("https://".length) + "#Intent;scheme=https;action=android.intent.action.VIEW;end";
        } else {
          const v2356 = document.createElement("a");
          v2356.href = v1830;
          v2356.target = "_blank";
          v2356.rel = "noopener";
          document.body.appendChild(v2356);
          v2356.click();
          v2356.remove();
        }
      } else if (v2351 === "channel") {
        v1913(v2353, v2352.dataset.v);
      } else if (v2351 === "kind") {
        v1914(v2353, v2352.dataset.v);
      } else if (v2351 === "preset") {
        v1915(v2353, v2352.dataset.v);
      } else if (v2351 === "retry-list") {
        v1897(v2355.channel, true);
      } else if (v2351 === "retry" || v2351 === "retry-resource") {
        v1920();
      } else if (v2351 === "pick") {
        v1922();
      } else if (v2351 === "clearcustom") {
        v1912(v2353, {
          channel: v2355.channel,
          kind: "default"
        });
      } else if (v2351 === "resetcolor") {
        v1917(v2353);
      } else if (v2351 === "orbit-memory") {
        v1918(v2353, v2352.checked);
      }
    }
    function v1941() {
      if (v1849) {
        return;
      }
      v1849 = true;
      v1864();
      document.addEventListener("click", v2357 => {
        const v2358 = v2357.target.closest?.("[data-vs-act]");
        if (v2358) {
          v1940(v2358.dataset.vsAct, v2358);
        }
      }, true);
      document.addEventListener("change", v2359 => {
        const v2360 = v2359.target.closest?.("[data-vs-color]");
        if (v2360) {
          v1916(v1862().vin, v2360.dataset.vsColor, v2360.value);
        }
      }, true);
      document.addEventListener("keydown", v2361 => {
        const v2362 = v2361.target.closest?.("[role=\"radio\"][data-vs-act]");
        if (!v2362 || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(v2361.key)) {
          return;
        }
        const v2363 = v2362.closest("[role=\"radiogroup\"]");
        const v2364 = [...v2363.querySelectorAll("[role=\"radio\"]")];
        const v2365 = v2364.indexOf(v2362);
        const v2366 = v2361.key === "ArrowLeft" || v2361.key === "ArrowUp" ? -1 : 1;
        const v2367 = v2361.key === "Home" ? v2364[0] : v2361.key === "End" ? v2364.at(-1) : v2364[(v2365 + v2366 + v2364.length) % v2364.length];
        v2361.preventDefault();
        v2367.focus();
        v2367.click();
      }, true);
    }
    const v1942 = v2368 => v1902(v2368, v1862().home).channel;
    const v1943 = v2369 => {
      const v2370 = v1902(v2369, v1862().home);
      if (v2370.channel === "pic") {
        return v2370.url;
      } else {
        return "";
      }
    };
    const v1944 = v2371 => {
      const {
        vin: v2372,
        home: v2373
      } = v1862();
      const v2374 = v1902(v2372, v2373);
      if (v2374.channel === v2371) {
        return v2374.url;
      } else {
        return "";
      }
    };
    v1816.vehicleStyle = {
      init: v1941,
      open: v1929,
      refresh: v1931,
      presentation: v1902,
      afterRender: v1938,
      applyFor: v1903,
      revision: v1860,
      activeChannel: v1942,
      heroPicOverride: v1943,
      urlFor: v1944,
      importFile: v1921,
      ensureList: v1897,
      setChannel: v1913,
      setKind: v1914,
      pickPreset: v1915,
      setColor: v1916,
      resetColors: v1917,
      retry: v1920,
      selection: v2375 => v1859(v1865(v2375 || v1862().vin)),
      slots: v1906,
      setOrbitMemory: v1918,
      _rememberOrbit: v1919,
      routeModel: v1911,
      syncWidgetCar: v1905
    };
    v1941();
  })();
  (() => {
    const v2376 = window.APP;
    const v2377 = window.Store;
    const v2378 = v2376.state;
    const v2379 = v2376.$;
    const v2380 = v2376.phone;
    const v2381 = v2376.scroll;
    const v2382 = window.MODEL;
    const v2383 = window.UI;
    const v2384 = window.ZEEHO_THEME;
    const v2385 = v2382.esc;
    const v2386 = window.API;
    const v2387 = window.CHG;
    const v2388 = window.TASKS;
    const v2389 = v2376.APP_VER;
    function v2390(v2506, v2507 = {}) {
      if (v2506 === "cushion" && v2376.hideSeatCushion()) {
        return;
      }
      const v2508 = v2376.CAR_CMDS[v2506];
      if (!v2508) {
        return;
      }
      const v2509 = v2376.context();
      const v2510 = v2378.data.home || {};
      if (v2510.vin && v2510.vin !== v2509.vin) {
        return;
      }
      const v2511 = v2378.vehicles.find(v2515 => v2515.vin === v2509.vin);
      const v2512 = v2386.source === "demo";
      const v2513 = v2510.name || v2511?.name || "当前车辆";
      const v2514 = v2512 ? "<div class=\"note\">" + v2383.icon("info", 18) + "<div>当前是<b>演示数据</b>，不会真发车控指令。</div></div>" : "";
      v2383.sheet(v2380(), {
        center: true,
        title: v2508.confirm || v2508.name + "？",
        sub: v2513,
        body: v2514 + "\n        <div id=\"cmdResult\" class=\"hidden\"></div>\n        <div class=\"field mt12\">\n          <button class=\"btn text\" data-act=\"closeSheet\">取消</button>\n          <button class=\"btn\" style=\"flex:1\" data-cmd=\"" + v2506 + "\" " + (v2512 ? "disabled" : "") + ">确认</button>\n        </div>",
        onMount: v2516 => v2516.querySelectorAll("[data-cmd]").forEach(v2517 => v2517.addEventListener("click", () => v2392(v2517.dataset.cmd, v2517, v2509, v2507)))
      });
    }
    async function v2391(v2518, v2519 = v2376.context()) {
      const v2520 = {
        ...window.DIAG?.capture?.(),
        ...v2386.diagScope?.(v2519.owner),
        category: "action",
        runId: "car-" + v2518 + "-" + Date.now().toString(36),
        source: "vehicle-control"
      };
      const v2521 = (v2524, v2525, v2526, v2527) => {
        try {
          window.DIAG?.event?.(v2524, {
            ...v2520,
            phase: v2525,
            kind: v2526,
            detail: v2527
          });
        } catch {}
      };
      let v2522 = "未确认";
      let v2523 = "warn";
      v2521("车辆操作开始", "start", "info", v2376.CAR_CMDS[v2518]?.name || v2518);
      try {
        if (!v2376.current(v2519) || v2378.data.home?.vin && v2378.data.home.vin !== v2519.vin) {
          v2522 = "车辆或账号已变化，未继续操作";
          return {
            ok: false,
            stale: true,
            scope: v2519,
            lines: []
          };
        }
        if (v2518 === "cushion" && v2376.hideSeatCushion(v2519.vin)) {
          return {
            ok: false,
            scope: v2519,
            lines: []
          };
        }
        if (v2519.source === "demo") {
          v2522 = "演示数据未下发真实指令";
          v2523 = "info";
          return {
            ok: false,
            demo: true,
            scope: v2519,
            lines: ["当前是演示数据，没有真车可发指令"]
          };
        }
        const v2528 = [];
        let v2529 = true;
        for (const v2530 of v2376.CAR_CMDS[v2518].steps(v2519)) {
          if (!v2376.current(v2519)) {
            v2522 = "车辆或账号已变化，响应不再采用";
            return {
              ok: false,
              stale: true,
              scope: v2519,
              lines: v2528
            };
          }
          let v2531 = v2530.body;
          if (v2530.lockFlag !== undefined) {
            try {
              v2531 = {
                secret: await v2376.unlockSecret(v2530.lockFlag, v2519.vin),
                vinNo: v2519.vin,
                lockFlag: v2530.lockFlag
              };
            } catch (v2534) {
              v2528.push("操作准备失败，请刷新页面后重试");
              v2529 = false;
              break;
            }
          }
          if (!v2376.current(v2519)) {
            v2522 = "车辆或账号已变化，未继续下发";
            return {
              ok: false,
              stale: true,
              scope: v2519,
              lines: v2528
            };
          }
          v2521("车辆指令下发", "progress", "info", v2530.label || v2530.ep);
          const v2532 = await v2386.call(v2530.ep, {
            vin: v2519.vin,
            uid: v2519.uid,
            month: v2519.month
          }, {
            body: v2531,
            method: v2530.method,
            scope: v2519.owner,
            logScope: v2520,
            runId: v2520.runId,
            logSource: "vehicle-control",
            isLatest: () => v2376.current(v2519)
          });
          if (!v2376.current(v2519)) {
            v2522 = "响应到达时车辆或账号已变化";
            return {
              ok: false,
              stale: true,
              scope: v2519,
              lines: v2528
            };
          }
          const v2533 = v2532.ok && v2532.data !== false;
          if (!v2533) {
            v2529 = false;
          }
          if (!v2533) {
            v2528.push(v2532.message || v2532.err || "操作未成功，请稍后重试");
          }
          v2521("车辆指令结果", "progress", v2533 ? "ok" : "err", v2533 ? "服务端已接受指令，不等于车辆已执行" : v2532.message || v2532.err || "请求失败");
          if (!v2533) {
            break;
          }
        }
        v2522 = v2529 ? "服务端已接受全部指令，实际车辆状态需回读确认" : "部分指令未下发成功";
        v2523 = v2529 ? "ok" : "err";
        return {
          ok: v2529,
          scope: v2519,
          lines: v2528
        };
      } finally {
        v2521("车辆操作结束", "end", v2523, v2522);
      }
    }
    async function v2392(v2535, v2536, v2537 = v2376.context(), v2538 = {}) {
      const v2539 = v2376.CAR_CMDS[v2535];
      if (!v2539 || v2536.disabled || !v2376.current(v2537)) {
        return;
      }
      const v2540 = v2536.textContent;
      const v2541 = v2383.currentSheet();
      v2536.disabled = true;
      v2536.textContent = "发送中…";
      const v2542 = v2400;
      try {
        const {
          ok: v2543,
          lines: v2544,
          stale: v2545
        } = await v2391(v2535, v2537);
        if (v2545 || !v2376.current(v2537)) {
          return;
        }
        if (v2543) {
          if (v2538.home) {
            v2405(v2542, v2537, v2535 === "lockOn" || v2535 === "lockOff");
          }
          if (v2541) {
            v2383.closeSheet(v2541);
          }
          v2383.toast(v2380(), v2535 === "cushion" ? "坐垫开启指令已发送" : v2539.name + "指令已发送");
          setTimeout(() => {
            if (v2376.current(v2537)) {
              v2376.load();
            }
          }, 1500);
        } else {
          const v2546 = v2536.closest(".sheet")?.querySelector("#cmdResult");
          const v2547 = v2544.join(" / ") || "操作未成功，请稍后重试";
          if (v2546) {
            v2546.className = "note mt12 bad";
            v2546.innerHTML = v2383.icon("alert", 18) + "<div>" + v2385(v2547) + "</div>";
          } else {
            v2383.toast(v2380(), v2547, 4000);
          }
        }
      } catch {
        if (v2376.current(v2537)) {
          v2383.toast(v2380(), "发送失败，请检查网络后重试");
        }
      } finally {
        v2536.disabled = false;
        v2536.textContent = v2540;
      }
    }
    const v2393 = {
      search: {
        hold: () => "searchHigh",
        tap: () => "search"
      },
      carlock: {
        hold: () => v2378.data.home?.headLock ? "lockOn" : null,
        tap: () => v2378.data.home?.headLock ? null : "lockOff"
      }
    };
    const v2394 = 1400;
    const v2395 = 10000;
    const v2396 = 15;
    const v2397 = 35;
    const v2398 = 180;
    let v2399 = 0;
    let v2400 = 0;
    let v2401 = 0;
    function v2402(v2548) {
      try {
        if (typeof navigator?.vibrate === "function") {
          navigator.vibrate(v2548);
        }
      } catch {}
    }
    function v2403() {
      v2400 += 1;
      if (v2399) {
        clearTimeout(v2399);
        v2399 = 0;
      }
      v2401 = 0;
      v2402(0);
    }
    function v2404(v2549) {
      if (v2399 || v2401 || document.hidden || !v2376.current(v2549)) {
        return;
      }
      const v2550 = ++v2400;
      v2401 = performance.now() || Number.MIN_VALUE;
      const v2551 = () => {
        if (v2550 !== v2400) {
          return;
        }
        if (document.hidden || !v2376.current(v2549)) {
          v2403();
          return;
        }
        const v2552 = Math.max(0, performance.now() - v2401);
        if (v2552 >= v2395) {
          v2399 = 0;
          return;
        }
        v2402(v2396);
        const v2553 = Math.min(1, v2552 / v2394);
        const v2554 = Math.round(300 - v2553 * 200);
        v2399 = setTimeout(() => {
          v2399 = 0;
          v2551();
        }, v2554);
      };
      v2551();
    }
    function v2405(v2555, v2556, v2557 = false) {
      if (v2555 !== v2400 || document.hidden || !v2376.current(v2556)) {
        return;
      }
      v2403();
      v2402(v2557 ? v2398 : v2397);
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        v2403();
      }
    });
    window.addEventListener("pagehide", v2403);
    let v2406 = false;
    let v2407 = 0;
    let v2408 = 0;
    let v2409 = false;
    let v2410 = null;
    const v2411 = v2558 => v2380().querySelector(".action[data-id=\"" + v2558 + "\"]");
    function v2412(v2559, v2560) {
      const v2561 = v2559?.querySelector(".ring .fg");
      if (v2561) {
        v2561.style.strokeDashoffset = String(100 - Math.max(0, Math.min(1, v2560)) * 100);
      }
    }
    function v2413(v2562) {
      if (v2406 || v2407 || v2408) {
        return;
      }
      if (v2410) {
        v2410();
      }
      const v2563 = v2376.context();
      const v2564 = v2393[v2562.dataset.id].hold();
      if (v2564 === "searchHigh" || v2564 === "lockOn") {
        v2404(v2563);
      }
      const v2565 = v2400;
      v2562.classList.add("holding");
      v2412(v2562, 0);
      const v2566 = () => v2414(v2562);
      v2562.addEventListener("pointerleave", v2566, {
        once: true
      });
      v2562.addEventListener("pointercancel", v2566, {
        once: true
      });
      v2410 = () => {
        v2562.removeEventListener("pointerleave", v2566);
        v2562.removeEventListener("pointercancel", v2566);
        v2410 = null;
      };
      const v2567 = performance.now();
      const v2568 = () => {
        const v2570 = v2564;
        v2414(v2562, {
          keepVibration: v2570 === "lockOn"
        });
        v2409 = true;
        if (v2570 && v2376.current(v2563) && v2562.isConnected !== false) {
          v2376.fireCmd(v2570, v2562, {
            home: true,
            feedbackToken: v2565
          });
        } else {
          v2403();
        }
      };
      v2408 = setTimeout(v2568, v2394);
      const v2569 = v2571 => {
        v2412(v2562, (v2571 - v2567) / v2394);
        if (v2408) {
          v2407 = requestAnimationFrame(v2569);
        }
      };
      v2407 = requestAnimationFrame(v2569);
    }
    function v2414(v2572, {
      keepVibration = false
    } = {}) {
      if (v2407) {
        cancelAnimationFrame(v2407);
        v2407 = 0;
      }
      if (v2408) {
        clearTimeout(v2408);
        v2408 = 0;
      }
      if (v2410) {
        v2410();
      }
      v2572?.classList.remove("holding");
      if (v2572) {
        v2412(v2572, 0);
      }
      if (!keepVibration) {
        v2403();
      }
    }
    async function v2415(v2573, v2574, v2575 = {}) {
      if (!v2574 || v2406) {
        if (v2575.home) {
          v2403();
        }
        return;
      }
      if (v2386.source === "demo") {
        if (v2575.home) {
          v2403();
        }
        v2383.toast(v2380(), "演示数据不会真发车控指令（齿轮里粘贴 token 后可用）", 3600);
        return;
      }
      v2406 = true;
      v2574.classList.add("sending");
      v2412(v2574, 1);
      const v2576 = v2376.context();
      if (v2575.home && v2573 === "lockOff") {
        v2404(v2576);
      }
      const v2577 = v2573 === "lockOn" && v2575.feedbackToken !== undefined ? v2575.feedbackToken : v2400;
      let v2578;
      try {
        v2578 = await v2391(v2573, v2576);
      } catch {
        v2578 = {
          ok: false,
          lines: ["发送失败，请检查网络后重试"]
        };
      } finally {
        v2406 = false;
        v2574.classList.remove("sending");
      }
      const {
        ok: v2579,
        lines: v2580,
        stale: v2581
      } = v2578;
      if (v2575.home && (v2581 || !v2579 || !v2376.current(v2576)) && v2577 === v2400) {
        v2403();
      }
      if (v2581 || !v2376.current(v2576)) {
        return;
      }
      if (v2579) {
        if (v2573 === "lockOn" || v2573 === "lockOff") {
          if (v2575.home) {
            v2405(v2577, v2576, true);
          }
          if (v2378.data.home) {
            v2378.data.home.headLock = v2573 === "lockOff";
          }
          v2376.render({
            keepScroll: true
          });
          v2383.toast(v2380(), v2573 === "lockOff" ? "已关锁" : "已开锁");
          setTimeout(() => {
            if (v2376.current(v2576)) {
              v2376.load();
            }
          }, 1500);
        } else {
          if (v2575.home) {
            v2405(v2577, v2576);
          }
          v2412(v2574, 0);
          v2383.toast(v2380(), v2573 === "searchHigh" ? "已高声寻车" : "已寻车");
        }
      } else {
        v2574.classList.add("err");
        v2412(v2574, 1);
        v2383.toast(v2380(), v2580.join(" / "), 4000);
        setTimeout(() => {
          v2574.classList.remove("err");
          v2412(v2574, 0);
        }, 1800);
      }
    }
    function v2416() {
      const v2582 = v2585 => {
        const v2586 = v2585.target.closest?.(".action[data-id]") || null;
        if (v2586 && v2393[v2586.dataset.id]) {
          return v2586;
        } else {
          return null;
        }
      };
      let v2583 = null;
      const v2584 = () => {
        if (v2583) {
          v2414(v2583);
        }
        v2583 = null;
        v2409 = false;
      };
      v2380().addEventListener("keydown", v2587 => {
        if (v2587.key !== "Enter" && v2587.key !== " ") {
          return;
        }
        const v2588 = v2582(v2587);
        if (!v2588) {
          return;
        }
        v2587.preventDefault();
        if (v2587.repeat || v2583 || v2406) {
          return;
        }
        v2583 = v2588;
        v2409 = false;
        if (v2393[v2588.dataset.id].hold()) {
          v2413(v2588);
        }
      });
      v2380().addEventListener("keyup", v2589 => {
        if (v2589.key !== "Enter" && v2589.key !== " ") {
          return;
        }
        const v2590 = v2583;
        if (!v2590) {
          return;
        }
        v2589.preventDefault();
        v2583 = null;
        if (v2582(v2589) !== v2590 || v2590.isConnected === false) {
          v2414(v2590);
          return;
        }
        if (v2409) {
          v2409 = false;
          return;
        }
        v2414(v2590);
        const v2591 = v2393[v2590.dataset.id].tap();
        if (v2591 && !v2406) {
          v2376.fireCmd(v2591, v2590, {
            home: true
          });
        }
      });
      v2380().addEventListener("focusout", v2592 => {
        if (v2592.target === v2583) {
          v2584();
        }
      });
      window.addEventListener("blur", v2584);
      v2380().addEventListener("pointerdown", v2593 => {
        const v2594 = v2582(v2593);
        if (!v2594 || v2406) {
          return;
        }
        v2409 = false;
        if (!v2393[v2594.dataset.id].hold()) {
          return;
        }
        v2593.preventDefault();
        v2413(v2594);
      });
      v2380().addEventListener("pointerup", v2595 => {
        const v2596 = v2582(v2595);
        if (!v2596) {
          return;
        }
        if (v2409) {
          v2409 = false;
          return;
        }
        if (v2406) {
          return;
        }
        v2414(v2596);
        const v2597 = v2393[v2596.dataset.id].tap();
        if (v2597 && !v2406) {
          v2376.fireCmd(v2597, v2596, {
            home: true
          });
        }
      });
    }
    const v2417 = {
      scope: null,
      ids: []
    };
    async function v2418() {
      if (!v2378.profileUid) {
        return false;
      }
      const v2598 = v2376.accountContext();
      const v2599 = v2376.claimResponses(["msg_list"]);
      const v2600 = () => v2376.accountCurrent(v2598) && v2376.responseCurrent("msg_list", v2599);
      const v2601 = await v2386.call("msg_list", {
        uid: v2598.uid
      }, {
        isLatest: v2600
      });
      if (!v2600() || v2601.stale) {
        return false;
      }
      return v2376.acceptMessages(v2601, {
        full: true
      });
    }
    function v2419({
      loading = false
    } = {}) {
      const v2602 = v2378.data.messages;
      v2424();
      const v2603 = v2602?.ok === false;
      const v2604 = v2602?.list || [];
      const v2605 = v2603 ? "<div class=\"note info\">" + v2383.icon("info", 18) + "<div>" + (v2386.source === "demo" ? "演示数据里没有消息。在齿轮里粘贴 token 就能看真车消息。" : v2385(v2386.lastRaw.msg_unread?.message || v2386.lastRaw.msg_list?.message || "消息取不到")) + "</div></div>" : "";
      const v2606 = (v2378.data.marketReplies?.items || []).map(v2610 => "<button type=\"button\" class=\"sheet-item msg-item\" data-act=\"marketreply\" data-id=\"" + v2385(v2610.id) + "\"><span class=\"ico\">" + v2383.icon("bell", 18) + (!v2610.read_at && v2376.media?.replyAlertsEnabled() ? "<i class=\"badge-dot sm\"></i>" : "") + "</span><span class=\"msg-copy\"><span class=\"t\">" + v2385(v2610.author_name) + " 回复了你的评论</span><span class=\"s msg-preview\">" + v2385(v2610.content) + "</span></span><span class=\"tail\">" + v2383.icon("right", 18) + "</span></button>").join("");
      const v2607 = v2604.map(v2611 => "\n      <button type=\"button\" class=\"sheet-item msg-item" + (v2611.unread && !v2422.has(String(v2611.id)) ? " is-unread" : "") + "\" data-act=\"msg\" data-id=\"" + v2385(v2611.id) + "\">\n        <span class=\"ico\">" + v2383.icon("bell", 18) + (v2611.unread && !v2422.has(String(v2611.id)) ? "<i class=\"badge-dot sm\"></i>" : "") + "</span>\n        <span class=\"msg-copy\"><span class=\"t\">" + v2385(v2611.title) + "</span><span class=\"s\">" + v2385(v2611.time) + "</span></span>\n        <span class=\"tail\">" + v2383.icon("right", 18) + "</span>\n      </button>").join("");
      const v2608 = (v2606 ? "<section class=\"messages-section\" aria-label=\"评论回复\"><h3 class=\"preferences-heading\">评论回复</h3><div class=\"messages-list\">" + v2606 + "</div></section>" : "") + (v2607 ? "<section class=\"messages-section\" aria-label=\"车辆消息\"><h3 class=\"preferences-heading\">车辆消息</h3><div class=\"messages-list\">" + v2607 + "</div></section>" : "");
      const v2609 = !v2603 && !!v2602 && (v2602.noRead > 0 || v2604.some(v2612 => v2612.unread && !v2422.has(String(v2612.id))));
      if (v2609) {
        v2417.scope = v2376.accountContext();
        v2417.ids = v2604.map(v2613 => String(v2613.id)).filter(Boolean);
      }
      return v2383.sheet(v2380(), {
        key: "msgs",
        title: "消息",
        sub: loading ? "正在读取消息…" : v2603 ? v2386.source === "demo" ? "演示数据里没有消息" : "消息取不到" : !v2602 ? "还没取到（要填账号 id 才查得了）" : v2602.noRead && !v2604.length ? v2602.noRead + " 条未读 · 列表暂未取到" : v2602.noRead ? v2602.noRead + " 条未读" : "最近 " + v2604.length + " 条",
        headActions: !v2602 || v2603 ? "" : "<button type=\"button\" class=\"iconbtn\" data-act=\"msgread\" title=\"一键已读\" aria-label=\"一键已读\">" + v2383.icon("checkAll", 20) + "</button>\n        <button type=\"button\" class=\"iconbtn\" data-act=\"msgclear\" title=\"一键清除\" aria-label=\"一键清除\">" + v2383.icon("trash", 20) + "</button>",
        className: "messages-sheet",
        body: "<div class=\"messages-page\">" + v2605 + (v2608 || (loading ? v2383.spinner("正在读取消息…") : !v2605 ? "<div class=\"messages-empty\">" + v2383.icon("bell", 28) + "<span>没有消息</span></div>" : "")) + "</div>",
        onDismiss: () => v2420()
      });
    }
    function v2420() {
      const v2614 = v2417.scope;
      const v2615 = v2417.ids.slice();
      v2417.scope = null;
      v2417.ids = [];
      if (!v2614 || !v2615.length) {
        return;
      }
      if (!v2376.accountCurrent(v2614)) {
        return;
      }
      v2376.claimResponses(["msg_unread", "msg_list"]);
      v2386.call("msg_read_all", {}, {
        force: true,
        isLatest: () => v2376.accountCurrent(v2614)
      }).then(async v2616 => {
        if (!v2376.accountCurrent(v2614) || !v2616.ok) {
          return;
        }
        await v2428(v2615);
        const v2617 = v2376.claimResponses(["msg_unread", "msg_list"]);
        if (v2376.messagesEpoch() !== v2617.get("messages")) {
          return;
        }
        if (v2378.data.messages) {
          v2378.data.messages.noRead = 0;
        }
        v2376.render({
          keepScroll: true
        });
      }).catch(() => {});
    }
    const v2421 = "zeeho.msgread.v1";
    let v2422 = new Set();
    let v2423 = "";
    function v2424() {
      const v2618 = window.Store.ns(v2421);
      if (v2618 !== v2423) {
        v2423 = v2618;
        try {
          v2422 = new Set(v2377.getJson(v2618, []));
        } catch {
          v2422 = new Set();
        }
      }
      return v2618;
    }
    let v2425 = Promise.resolve();
    function v2426(v2619, v2620, v2621 = false) {
      const v2622 = v2376.accountContext();
      const v2623 = async () => {
        if (!v2376.accountCurrent(v2622) || v2423 !== v2619) {
          return false;
        }
        const v2625 = await v2377.commitAsync(v2621 ? {
          removes: [v2619]
        } : {
          puts: {
            [v2619]: JSON.stringify([...v2620])
          }
        });
        if (v2625 !== true) {
          v2383.toast(v2380(), "已读标记未能保存，请重试");
          return false;
        }
        if (v2376.accountCurrent(v2622) && v2423 === v2619) {
          v2422 = v2620;
        }
        return true;
      };
      const v2624 = v2425.then(v2623, v2623).catch(() => false);
      v2425 = v2624;
      return v2624;
    }
    function v2427(v2626) {
      const v2627 = v2424();
      const v2628 = String(v2626 || "");
      if (!v2628 || v2422.has(v2628)) {
        return;
      }
      if (v2377.requiresAsync?.()) {
        const v2629 = new Set(v2422);
        v2629.add(v2628);
        return v2426(v2627, v2629.size > 500 ? new Set([...v2629].slice(-400)) : v2629);
      }
      v2422.add(v2628);
      if (v2422.size > 500) {
        v2422 = new Set([...v2422].slice(-400));
      }
      try {
        v2377.setJson(v2424(), [...v2422]);
      } catch {}
    }
    function v2428(v2630) {
      const v2631 = (v2630 || []).map(v2633 => String(v2633 || "")).filter(Boolean);
      if (!v2631.length) {
        return;
      }
      const v2632 = v2424();
      if (v2377.requiresAsync?.()) {
        const v2634 = new Set(v2422);
        for (const v2635 of v2631) {
          v2634.add(v2635);
        }
        return v2426(v2632, v2634.size > 500 ? new Set([...v2634].slice(-400)) : v2634);
      }
      for (const v2636 of v2631) {
        v2422.add(v2636);
      }
      if (v2422.size > 500) {
        v2422 = new Set([...v2422].slice(-400));
      }
      try {
        v2377.setJson(v2424(), [...v2422]);
      } catch {}
    }
    function v2429() {
      const v2637 = v2424();
      if (v2377.requiresAsync?.()) {
        return v2426(v2637, new Set(), true);
      }
      v2422 = new Set();
      try {
        v2377.remove(v2637);
      } catch {}
    }
    function v2430(v2638) {
      const v2639 = (v2378.data.messages?.list || []).find(v2641 => v2641.id === String(v2638));
      if (!v2639) {
        return;
      }
      const v2640 = v2427(v2638);
      if (v2640 && typeof v2640.then === "function") {
        v2640.then(v2642 => {
          if (v2642 && v2639.unread) {
            v2419();
          }
        });
      }
      v2383.sheet(v2380(), {
        title: v2639.title,
        sub: v2639.time,
        body: (v2639.detail ? "<div class=\"note\">" + v2383.icon("info", 18) + "<div>" + v2385(v2639.detail) + "</div></div>" : "") + "\n        <div class=\"mt12\">\n          " + (v2639.address ? v2383.kv("位置", v2639.address) : "") + "\n          " + (v2639.lat ? v2383.kv("坐标", v2639.lat + ", " + v2639.lng, {
          mono: true
        }) : "") + "\n        </div>\n        " + (v2639.thumb ? "<img src=\"" + v2385(v2639.thumb) + "\" alt=\"\" style=\"width:100%;border-radius:14px;margin-top:12px\" onerror=\"this.remove()\">" : "") + "\n        <div style=\"height:8px\"></div>"
      });
      if (v2639.unread) {
        v2419();
      }
    }
    function v2431(v2643, v2644 = {}) {
      if (v2643 === "seatlock" && v2376.hideSeatStatus() || v2643 === "cushion" && v2376.hideSeatCushion()) {
        return;
      }
      const v2645 = v2376.ACTIONS.find(v2650 => v2650.id === v2643);
      if (!v2645) {
        return;
      }
      if (v2645.more) {
        return v2433();
      }
      if (v2645.cmd) {
        return v2390(v2645.cmd, v2644);
      }
      const v2646 = v2378.data.home || {};
      const v2647 = v2645.state ? v2646[v2645.state] ? v2645.onT : v2645.offT : "";
      const v2648 = window.ZEEHO_EP.base;
      const v2649 = "curl -X " + v2645.ep.m + " '" + v2648 + v2645.ep.p + "' \\\n  -H 'Authorization: Bearer <token>' \\\n  -H 'cfmoto-x-param: appId=..&nonce=..&timestamp=..' \\\n  -H 'cfmoto-x-sign: <签名>' \\\n  -H 'cfmoto-x-sign-type: 0'" + (v2645.ep.body && v2645.ep.body.startsWith("{") ? " \\\n  -d '" + v2645.ep.body + "'" : "");
      v2383.sheet(v2380(), {
        title: v2645.t,
        sub: v2647 ? "当前状态：" + v2647 : "接口待接入",
        body: "\n        <div class=\"note\">" + v2383.icon("alert", 18) + "<div>\n          这项<b>还没接真指令</b>（云端没有对应接口，只有手机直连车机那条私有通道有）。真控制仍由宿主 App 执行。\n        </div></div>\n        <div class=\"mt16\">\n          " + v2383.kv("调用方式", v2645.ep.m) + "\n          " + v2383.kv("路径", v2645.ep.p, {
          mono: true
        }) + "\n          " + (v2645.ep.body ? v2383.kv("请求体", v2645.ep.body, {
          mono: true
        }) : "") + "\n        </div>\n        <div class=\"card-sub mt12\">" + v2385(v2645.ep.note || "") + "</div>\n        <div class=\"code\">" + v2385(v2649) + "</div>\n        <div class=\"field\">\n          <button class=\"btn tonal block\" data-act=\"copy\" data-copy=\"" + v2385(v2649) + "\" data-label=\"curl\">" + v2383.icon("copy", 18) + "<span>复制 curl</span></button>\n        </div>\n        <div style=\"height:4px\"></div>"
      });
    }
    function v2432(v2651, v2652) {
      if (v2651.id === "seatlock" && v2376.hideSeatStatus() || v2651.id === "cushion" && v2376.hideSeatCushion()) {
        return "";
      }
      if (v2651.state) {
        if (v2652[v2651.state]) {
          return v2651.onT;
        } else {
          return v2651.offT;
        }
      }
      if (v2651.id === "search") {
        if (v2652.canSearch) {
          return "支持";
        } else {
          return "不支持";
        }
      }
      if (v2651.id === "cushion") {
        if (v2652.cushionOpen) {
          return "可开启";
        } else {
          return "—";
        }
      }
      if (v2651.id === "storage") {
        if (v2652.storageOpen) {
          return "可开启";
        } else {
          return "不支持";
        }
      }
      return "接口待接入";
    }
    function v2433() {
      const v2653 = v2378.data.home || {};
      const v2654 = v2376.ACTIONS.filter(v2659 => !v2659.more && !v2659.homeOnly && (v2659.id !== "seatlock" || !v2376.hideSeatStatus()) && (v2659.id !== "cushion" || !v2376.hideSeatCushion())).map(v2660 => "\n      <div class=\"sheet-item\" data-act=\"action\" data-id=\"" + v2660.id + "\">\n        <span class=\"ico\">" + v2383.icon(v2660.icon, 18) + "</span>\n        <span><span class=\"t\">" + v2385(v2660.t) + "</span><span class=\"s\">" + v2385(v2432(v2660, v2653)) + "</span></span>\n        <span class=\"tail\">" + v2383.icon("right", 18) + "</span>\n      </div>").join("");
      const v2655 = (v2661, v2662 = 26) => v2382.s(v2661).length > v2662 ? v2382.s(v2661).slice(0, v2662) + "…" : v2382.s(v2661);
      const v2656 = (v2653.iot || []).map(v2663 => {
        const v2664 = v2663.describe ? v2663.name + "（" + v2663.describe + "）" : v2663.name;
        return "<div class=\"kv\" title=\"" + v2385(v2663.identify + " = " + v2663.value) + "\">\n        <span class=\"k\">" + v2385(v2664) + "<span class=\"raw\">" + v2385(v2663.identify) + "</span></span>\n        <span class=\"v tnum\">" + v2385(v2655(v2663.value)) + "</span>\n      </div>";
      }).join("");
      const v2657 = v2378.data.settings?.caps || [];
      const v2658 = v2657.map(v2665 => "<div class=\"kv\">\n        <span class=\"k\"><span>" + v2385(v2665.functionCode) + "</span></span>\n        <span class=\"v\">" + (v2665.isSupport === false ? "<span class=\"muted\">不支持</span>" : "<span class=\"chip ok\">支持</span>") + "</span>\n      </div>").join("");
      v2383.sheet(v2380(), {
        title: "更多",
        sub: v2376.ACTIONS.length - 1 + " 个可操作项 · " + (v2653.iot || []).length + " 项车机参数 · " + v2657.length + " 项能力",
        body: "\n        <div class=\"section-title\"><span>可操作项</span><span class=\"line\"></span></div>\n        " + v2654 + "\n        <div class=\"section-title\"><span>车机上报的参数</span><span class=\"line\"></span><span class=\"card-sub\">iotProperties</span></div>\n        <div class=\"card\">" + (v2656 || "<div class=\"muted\">这台车没上报</div>") + "</div>\n        <div class=\"section-title\"><span>车辆能力表</span><span class=\"line\"></span><span class=\"card-sub\">vehicleSet/items</span></div>\n        <div class=\"card\">" + (v2658 || "<div class=\"muted\">能力表没取到</div>") + "</div>\n        <div style=\"height:6px\"></div>"
      });
    }
    function v2434(v2666) {
      const v2667 = v2666.meta;
      if (!v2667) {
        return "";
      }
      const v2668 = !!v2666.write?.ready;
      const v2669 = v2667.codes.length ? v2667.codes.map(v2672 => v2383.kv(v2672.name, v2672.code + "（0x" + v2672.code.toString(16).toUpperCase() + "）", {
        mono: true
      })).join("") : "<div class=\"muted\">" + (v2668 ? v2666.write.kind === "commond" ? "这一项的 commond 是按行实测出来的（见上面的说明），能力表里没登记它的云端码。" : "这一项走的是专属写接口（投屏那种），不在这张能力表里。" : v2667.bleOnly ? "能力表里只登记了手机直连的码（0x24 那族）。⚠️ 这张表不完全——伴我回家 56 / 电子制动 57 / 自定义按键 142 在表里同样只有直连码，实测都有云端 commond，所以\"表里没有\"不能当\"没有通道\"。" : "能力表里没给这一项登记码（同样不能据此断定没有云端通道）。") + "</div>";
      const v2670 = v2667.cfg.length ? v2383.kv("子功能", v2667.cfg.join(" · ")) : "";
      const v2671 = v2667.restrict.length ? v2383.kv("固件门槛", v2667.restrict.map(v2673 => v2673.type + " " + v2673.version + (v2673.show === "0" ? "（这版不显示）" : "")).join(" · ")) : "";
      return "<div class=\"section-title\"><span>能力表里的服务码</span><span class=\"line\"></span><span class=\"card-sub\">vehicleSet/items</span></div>\n      <div class=\"card\">" + v2669 + "</div>\n      " + (v2670 || v2671 ? "<div class=\"card mt12\">" + v2670 + v2671 + "</div>" : "") + "\n      " + (v2667.codes.length ? "<div class=\"card-sub mt12\">⚠️ 这族是平台的<b>动作/服务码</b>，<b>不是</b> <code>propertyOne/one</code> 要发的 commond\n      （实测反证：eTCS 这里写 296，App 实际发 <b>59</b>）。能写的那几项，commond 是按行实测出来的。</div>" : "");
    }
    function v2435(v2674) {
      const v2675 = v2378.data.settings;
      const v2676 = v2675?.groups.flatMap(v2683 => v2683.rows).find(v2684 => v2684.code === v2674);
      if (!v2676 || !v2376.settings.settingVisible(v2676)) {
        return;
      }
      if (v2676.local) {
        if (v2676.code === "local_nominal_cap") {
          return v2376.settings.nominalSheet();
        } else {
          return v2376.settings.tireBandSheet();
        }
      }
      const v2677 = v2378.data.info?.data || {};
      const v2678 = v2676.keys?.length ? "<div class=\"card-sub\">字段</div><div class=\"code\">" + v2385(v2676.keys.map(v2685 => v2685 + " = " + (JSON.stringify(v2685.split(".").reduce((v2686, v2687) => v2686 == null ? v2686 : v2686[v2687], v2677)) ?? "（车机没上报这个字段）")).join("\n")) + "</div>" : "";
      const v2679 = !!v2676.write?.ready;
      const v2680 = v2676.kind === "switch" && v2676.binary;
      const v2681 = v2679 && (!!v2676.options || !!v2676.choices || !!v2676.palette?.length);
      const v2682 = v2679 ? v2680 ? "点列表里的<b>开关</b>就直接下发，写完会自动读回核对。" : v2681 ? v2676.kind === "palette" ? "点这一行的<b>当前颜色</b>打开色板，<b>选一格即下发</b>，写完自动读回核对三色。" : "点这一行的<b>当前值</b>打开选项，<b>选中即下发</b>，写完自动读回核对。" : "这一项网页上还没有对应的控件，先用官方 App 改。" : "这一项还没摸到云端指令码，网页端发不了指令（点它不会写入）。<b>用官方 App 可以改。</b>";
      v2383.sheet(v2380(), {
        title: v2676.title,
        body: "\n        <div class=\"note" + (v2679 ? " info" : "") + "\">" + v2383.icon(v2679 ? "info" : "alert", 18) + "<div>" + v2682 + "</div></div>\n        " + (v2676.state ? "<div class=\"note mt12\">" + v2383.icon("alert", 18) + "<div>" + v2385(v2676.state) + "</div></div>" : "") + "\n        " + (v2676.tip ? "<div class=\"note info mt12\">" + v2383.icon("info", 18) + "<div>" + v2385(v2676.tip) + "</div></div>" : "") + "\n        <div class=\"mt16\">\n          " + v2383.kv("当前值", v2676.display || "—") + "\n          " + (v2676.subs?.length ? v2676.subs.map(v2688 => v2383.kv(v2688.t, v2688.v)).join("") : "") + "\n        </div>\n        " + (v2676.note ? "<div class=\"card-sub mt12\">" + v2385(v2676.note) + "</div>" : "") + "\n        " + (v2676.stateMore?.length ? "<div class=\"card-sub mt12\">车机给的确认文案：" + v2385(v2676.stateMore.join(" / ")) + "</div>" : "") + "\n        " + v2436(!v2679 ? v2676.obs ? "<div class=\"card-sub\">这一项的实测观测</div>" + v2385(v2676.obs) : "<div class=\"card-sub\">这一项还没有任何实测观测（没在官方 App 里试过它）</div>" : "", v2678, v2434(v2676))
      });
    }
    function v2436(...v2689) {
      const v2690 = v2689.filter(Boolean).map(v2691 => "<div class=\"mt8\">" + v2691 + "</div>").join("");
      if (!v2690) {
        return "";
      }
      return "<details class=\"lg-more mt12\"><summary>开发者信息</summary>" + v2690 + "</details>";
    }
    const v2437 = v2692 => String(v2692).padStart(2, "0");
    const v2438 = v2693 => {
      if (v2693 == null || !Number.isFinite(Number(v2693)) || Number(v2693) <= 0) {
        return "";
      }
      const v2694 = new Date(Number(v2693));
      if (Number.isNaN(v2694.getTime())) {
        return "";
      } else {
        return v2437(v2694.getHours()) + ":" + v2437(v2694.getMinutes()) + ":" + v2437(v2694.getSeconds());
      }
    };
    const v2439 = v2695 => {
      const v2696 = v2438(v2695);
      if (!v2696) {
        return "";
      }
      const v2697 = new Date(Number(v2695));
      return v2697.getMonth() + 1 + " 月 " + v2697.getDate() + " 日 " + v2696;
    };
    const v2440 = v2698 => v2698 == null || !Number.isFinite(Number(v2698)) ? "" : Number(v2698) >= 1000 ? (Number(v2698) / 1000).toFixed(1) + " 秒" : Math.max(0, Math.round(Number(v2698))) + " ms";
    const v2441 = /("(?:\\.|[^"\\])*")(\s*:)?|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\b(?:true|false|null)\b|[{}[\],]/g;
    function v2442(v2699) {
      const v2700 = v2455(v2699);
      if (v2700.length > 524288) {
        return v2700;
      }
      try {
        JSON.parse(v2700);
      } catch {
        return v2700;
      }
      const v2701 = [];
      const v2702 = [""];
      let v2703 = 0;
      let v2704 = false;
      let v2705 = false;
      let v2706 = true;
      const v2707 = () => {
        if (v2703 > 64) {
          return false;
        }
        v2701.push("\n", v2702[v2703] ||= "  ".repeat(v2703));
        v2706 = false;
        return true;
      };
      for (let v2708 = 0; v2708 < v2700.length; v2708++) {
        const v2709 = v2700[v2708];
        if (v2704) {
          v2701.push(v2709);
          if (v2705) {
            v2705 = false;
          } else if (v2709 === "\\") {
            v2705 = true;
          } else if (v2709 === "\"") {
            v2704 = false;
          }
        } else if (v2709 === "\"") {
          v2704 = true;
          v2701.push(v2709);
        } else if (v2709 === "{" || v2709 === "[") {
          const v2710 = v2709 === "{" ? "}" : "]";
          let v2711 = v2708 + 1;
          while (/\s/.test(v2700[v2711] || "") && v2711 < v2700.length) {
            v2711++;
          }
          v2701.push(v2709);
          if (v2700[v2711] === v2710) {
            v2701.push(v2710);
            v2708 = v2711;
          } else {
            v2703++;
            if (!v2707()) {
              return v2700;
            }
          }
        } else if (v2709 === "}" || v2709 === "]") {
          v2703--;
          if (!v2707()) {
            return v2700;
          }
          v2701.push(v2709);
        } else if (v2709 === ",") {
          v2701.push(v2709);
          if (!v2707()) {
            return v2700;
          }
        } else if (v2709 === ":") {
          v2701.push(": ");
        } else if (!/\s/.test(v2709)) {
          v2701.push(v2709);
        }
      }
      if (v2706) {
        return v2700;
      }
      return v2701.join("");
    }
    function v2443(v2712) {
      const v2713 = String(v2712 == null ? "" : v2712);
      const v2714 = v2442(v2713);
      let v2715 = "";
      let v2716 = 0;
      let v2717;
      v2441.lastIndex = 0;
      while (v2717 = v2441.exec(v2714)) {
        v2715 += v2385(v2714.slice(v2716, v2717.index));
        if (v2717[1] != null) {
          v2715 += v2717[2] ? "<span class=\"j-key\">" + v2385(v2717[1]) + "</span>" + v2385(v2717[2]) : "<span class=\"j-str\">" + v2385(v2717[1]) + "</span>";
        } else if (/^-?\d/.test(v2717[0])) {
          v2715 += "<span class=\"j-num\">" + v2385(v2717[0]) + "</span>";
        } else if (/^(?:true|false|null)$/.test(v2717[0])) {
          v2715 += "<span class=\"j-lit\">" + v2385(v2717[0]) + "</span>";
        } else {
          v2715 += v2385(v2717[0]);
        }
        v2716 = v2441.lastIndex;
      }
      return v2715 + v2385(v2714.slice(v2716));
    }
    const v2444 = {
      network: "网络",
      task: "任务",
      action: "用户操作",
      settings: "设置",
      background: "后台",
      notification: "通知",
      battery: "电量",
      charge: "充电",
      lifecycle: "启动"
    };
    const v2445 = {
      start: "开始",
      progress: "进行中",
      end: "结束",
      launch: "启动",
      queued: "已排队",
      pending: "等待中",
      dispatch: "请求开始",
      headers: "已收到响应头",
      complete: "完成",
      dispatched: "已提交",
      submitted: "已提交系统",
      accepted: "已接受",
      blocked: "被阻止",
      suppressed: "未发送",
      requested: "已请求",
      success: "已完成",
      failed: "失败",
      skipped: "已跳过",
      skip: "已跳过",
      cancelled: "已取消",
      discarded: "已丢弃",
      stop: "已停止",
      stopped: "已停止",
      resume: "恢复",
      update: "更新",
      restart: "重新记录",
      created: "已创建",
      started: "已启动",
      resumed: "已回前台",
      paused: "已暂停",
      destroyed: "已结束"
    };
    const v2446 = {
      web: "网页",
      native: "原生 App",
      foreground: "前台页面",
      direct: "网页直连",
      demo: "演示",
      application: "应用",
      activity: "页面生命周期",
      task: "任务流程",
      "auto-task": "自动任务",
      "monitor-job": "后台定时检查",
      "monitor-service": "后台常驻检查",
      poller: "后台检查",
      "widget-refresh": "小组件刷新",
      "widget-image": "小组件车图",
      notification: "系统通知",
      "native-store": "本机存储",
      "pending-events": "待处理事件",
      "remote-sources": "远程素材",
      "app-update-check": "自动检查更新",
      "app-update-manual": "手动检查更新",
      "app-update-download": "应用更新下载",
      "app-update": "应用更新",
      "wallpaper-experiment": "实验性壁纸",
      wallpaper: "壁纸更新",
      avatar: "头像更新",
      "car-model": "车模更新",
      background: "后台"
    };
    const v2447 = {
      poll: "后台检查",
      "widget image": "小组件车图",
      "vehicle action": "车辆操作"
    };
    const v2448 = [["all", "全部"], ["network", "仅网络"], ["task", "任务"], ["action", "用户操作"], ["background", "后台"], ["notification", "通知"], ["battery", "电量与充电"], ["lifecycle", "启动"]];
    const v2449 = v2718 => v2718.category || (v2718.kind === "request" ? "network" : "");
    const v2450 = v2719 => v2719.account || (v2719.accountId ? "账号 " + v2719.accountId : "本机（未关联账号）");
    const v2451 = () => String(window.ACC?.activeId?.() || window.APP?.accountContext?.().accountId || "");
    const v2452 = v2720 => v2720.kind !== "request" && v2720.divider === true;
    function v2453(v2721) {
      const v2722 = v2721.source || "";
      if (v2446[v2722]) {
        return v2446[v2722];
      }
      const v2723 = v2722.replace(/-extra-vehicle$/, "");
      if (v2446[v2723]) {
        return v2446[v2723] + " · 其他车辆";
      }
      if (/[\u3400-\u9fff]/.test(v2722)) {
        return v2722;
      }
      if (v2722) {
        if (v2721.producer === "native") {
          return "原生后台";
        } else {
          return "网页流程";
        }
      } else {
        return "";
      }
    }
    function v2454(v2724) {
      if (v2452(v2724)) {
        if (v2724.phase === "restart" || v2724.title === "日志重新开始") {
          return "日志重新开始";
        } else if (v2724.producer === "native") {
          return "APP 启动";
        } else {
          return "页面启动";
        }
      }
      if (v2724.kind !== "request") {
        return v2447[v2724.title] || v2724.title || "应用事件";
      }
      if (v2724.api && (!v2724.title || v2724.title === v2724.api)) {
        return window.DIAG?.shortLabel?.(v2724.api) || v2724.api;
      }
      return v2724.title || v2724.api || "接口请求";
    }
    const v2455 = v2725 => {
      if (v2725 == null) {
        return "";
      }
      if (typeof v2725 !== "object") {
        return String(v2725);
      }
      try {
        return JSON.stringify(v2725, null, 2);
      } catch {
        return "[数据无法展示]";
      }
    };
    function v2456(v2726) {
      let v2727 = v2726.progress;
      if (v2727 == null && v2726.phase === "progress" && v2726.extra) {
        try {
          const v2731 = typeof v2726.extra === "object" ? v2726.extra : String(v2726.extra).length <= 4096 ? JSON.parse(v2726.extra) : null;
          if (v2731?.total != null) {
            v2727 = {
              current: v2731.index ?? v2731.current ?? v2731.done,
              total: v2731.total
            };
          }
        } catch {}
      }
      if (v2727 == null || v2727 === "") {
        return "";
      }
      if (typeof v2727 === "string") {
        return v2727;
      }
      if (typeof v2727 === "number") {
        if (Number.isFinite(v2727)) {
          return Math.max(0, Math.min(100, v2727)) + "%";
        } else {
          return "";
        }
      }
      const v2728 = v2727.current ?? v2727.done ?? v2727.completed;
      const v2729 = v2727.total;
      const v2730 = v2728 != null && v2729 != null && Number.isFinite(Number(v2728)) && Number.isFinite(Number(v2729)) ? v2728 + "/" + v2729 : v2727.percent != null && Number.isFinite(Number(v2727.percent)) ? Math.max(0, Math.min(100, Number(v2727.percent))) + "%" : "";
      return [v2727.label || v2727.text || "", v2730].filter(Boolean).join(" · ");
    }
    function v2457(v2732) {
      const v2733 = v2732.stale === true || v2732.disposition === "discarded";
      const v2734 = v2732.status == null || v2732.status === "" || !Number.isFinite(Number(v2732.status)) || Number(v2732.status) <= 0 ? null : Number(v2732.status);
      const v2735 = v2732.transport === "pending" || v2732.business === "pending" || v2734 == null && !v2732.transport && ["start", "progress", "pending", "queued", "dispatch", "headers"].includes(v2732.phase);
      const v2736 = v2732.demo || v2732.transport === "not_sent" ? "not_sent" : v2732.transport || (v2734 != null ? "http" : v2732.ok === false && !v2733 && !v2735 ? "failed" : "");
      const v2737 = typeof v2732.httpOk === "boolean" ? v2732.httpOk : v2734 != null ? v2734 >= 200 && v2734 < 300 : null;
      const v2738 = v2735 ? "unknown" : ["ok", "already", "failed", "unknown"].includes(v2732.business) ? v2732.business : v2732.ok === true ? "ok" : v2732.ok === false && v2736 === "http" && !v2733 ? "failed" : "unknown";
      const v2739 = !v2733 && !v2735 && (v2736 === "failed" || v2736 === "http" && v2737 === false || v2738 === "failed" || v2732.level === "err");
      return {
        discarded: v2733,
        status: v2734,
        transport: v2736,
        httpOk: v2737,
        business: v2738,
        pending: v2735,
        bad: v2739
      };
    }
    function v2458(v2740, v2741 = "", v2742 = "") {
      if (v2740) {
        return "<span class=\"app-log-status" + (v2741 ? " app-log-status-" + v2741 : "") + "\"" + (v2742 ? " data-result=\"" + v2742 + "\"" : "") + ">" + v2385(v2740) + "</span>";
      } else {
        return "";
      }
    }
    function v2459(v2743) {
      if (v2743.kind !== "request") {
        if (v2743.stale === true || v2743.disposition === "discarded") {
          return v2458("已丢弃", "", "disposition");
        }
        return v2458(v2743.level === "err" ? "失败" : v2743.level === "warn" ? "提醒" : v2743.level === "ok" ? "完成" : "", v2743.level === "err" ? "err" : v2743.level === "warn" ? "warn" : "", "event");
      }
      const v2744 = v2457(v2743);
      const v2745 = v2744.transport !== "not_sent" && v2744.status != null ? v2458("HTTP " + v2744.status, v2744.discarded ? "" : v2744.httpOk ? "ok" : "err", "http") : "";
      const v2746 = v2744.transport === "not_sent" ? v2458(v2743.demo ? "演示 · 未发送" : "未发送", "", "transport") : v2744.transport === "failed" ? v2458(v2744.status != null ? "响应读取失败" : "网络失败", v2744.discarded ? "" : "err", "transport") : v2744.pending ? v2458("等待响应", "", "transport") : "";
      const v2747 = v2744.transport === "not_sent" || v2744.pending || v2744.business === "unknown" ? "" : v2458(v2744.business === "failed" ? "业务失败" : v2744.business === "already" ? "业务已处理" : "业务成功", v2744.discarded ? "" : v2744.business === "failed" ? "err" : "ok", "business");
      const v2748 = v2458(v2744.discarded ? "已丢弃" : v2743.disposition === "adopted" ? "已采纳" : "", "", "disposition");
      return v2745 + v2746 + v2747 + v2748;
    }
    function v2460(v2749, v2750 = "") {
      const v2751 = v2749.kind === "request";
      const v2752 = v2452(v2749);
      const v2753 = v2449(v2749);
      const v2754 = v2751 ? v2457(v2749) : null;
      const v2755 = v2751 ? v2754.bad ? "error" : !v2754.discarded && v2749.level === "warn" ? "warn" : "" : v2749.stale === true || v2749.disposition === "discarded" ? "" : v2749.level === "err" ? "error" : v2749.level === "warn" ? "warn" : "";
      const v2756 = v2454(v2749);
      const v2757 = [v2439(v2749.at), v2751 ? v2440(v2749.durMs) : "", Number(v2749.n) > 1 ? "合并 " + v2749.n + " 次" : ""].filter(Boolean).join(" · ");
      const v2758 = v2749.producer ? v2446[v2749.producer] || "其他记录端" : "";
      const v2759 = [...new Set([v2444[v2753] || v2753, v2453(v2749), v2758, v2445[v2749.phase] || v2749.phase, v2456(v2749)].filter(Boolean))];
      const v2760 = Math.ceil(v2759.length / 2);
      const v2761 = v2766 => v2766.length ? "<span class=\"app-log-inline-tags\">" + v2766.map(v2767 => "<span class=\"app-log-tag\">" + v2385(v2767) + "</span>").join("") + "</span>" : "";
      const v2762 = v2751 && v2754.bad ? v2749.message : !v2751 ? v2749.detail : "";
      const v2763 = !!v2750 && v2491(v2749).content.includes(v2750);
      const v2764 = v2459(v2749);
      const v2765 = v2752 ? "play" : v2753 === "notification" ? "bell" : v2753 === "battery" || v2753 === "charge" ? "battery" : v2751 ? "db" : v2753 === "task" ? "check" : "info";
      return "<button type=\"button\" class=\"diag-row app-log-row" + (v2755 ? " app-log-" + v2755 : "") + (v2752 ? " app-log-start" : "") + "\" data-act=\"raw\" data-id=\"" + v2385(v2749.id) + "\" data-kind=\"" + (v2751 ? "request" : "event") + "\" data-category=\"" + v2385(v2753) + "\">\n      <span class=\"app-log-mark\" aria-hidden=\"true\">" + v2383.icon(v2765, 18) + "</span>\n      <span class=\"app-log-main\">\n        <span class=\"app-log-heading\"><span class=\"app-log-heading-label\">" + (v2751 ? "<b class=\"diag-method\">" + v2385(v2749.method || "GET") + "</b>" : "") + "<span class=\"app-log-title\">" + v2385(v2756) + "</span></span>" + (v2764 ? "<span class=\"app-log-results\">" + v2764 + "</span>" : "") + "</span>\n        <span class=\"app-log-account\"><span class=\"app-log-line-text\">" + v2385(v2450(v2749)) + "</span>" + v2761(v2759.slice(0, v2760)) + "</span>\n        " + (v2757 || v2759.length > v2760 ? "<span class=\"app-log-meta\"><span class=\"app-log-line-text\">" + v2385(v2757) + "</span>" + v2761(v2759.slice(v2760)) + "</span>" : "") + "\n        " + (v2763 ? "<span class=\"app-log-match\">命中请求 / 返回内容</span>" : "") + "\n        " + (v2762 ? "<span class=\"app-log-reason\">" + v2385(v2762) + "</span>" : "") + "\n      </span><span class=\"app-log-chevron\" aria-hidden=\"true\">" + v2383.icon("right", 14) + "</span>\n    </button>";
    }
    let v2461 = null;
    let v2462 = 60;
    let v2463 = null;
    let v2464 = 0;
    let v2465 = 0;
    let v2466 = false;
    let v2467 = false;
    let v2468 = null;
    let v2469 = null;
    let v2470 = 0;
    let v2471 = "";
    let v2472 = "";
    let v2473 = "";
    let v2474 = 0;
    const v2475 = () => [v2451(), v2386.accountGen];
    const v2476 = ([v2768, v2769]) => v2768 === v2451() && v2769 === v2386.accountGen;
    let v2477 = false;
    let v2478 = "";
    let v2479 = "";
    const v2480 = {
      category: "",
      networkOnly: false,
      currentSession: false,
      accountOnly: false,
      eventOnly: false,
      query: ""
    };
    const v2481 = () => !!v2461 && !!v2383.sheetAlive?.(v2461);
    const v2482 = () => v2481() && (!v2383.currentSheet || v2383.currentSheet() === v2461);
    function v2483(v2770) {
      if (v2770 && typeof v2770 === "object") {
        for (const v2771 of Object.keys(v2480)) {
          if (Object.prototype.hasOwnProperty.call(v2770, v2771)) {
            if (v2771 === "category") {
              v2480.category = ["task", "action", "settings", "background", "notification", "battery", "charge", "lifecycle", "network"].includes(v2770[v2771]) ? v2770[v2771] : "";
            } else if (v2771 === "query") {
              v2480.query = String(v2770[v2771] || "").slice(0, 200);
            } else if (v2771 in v2480) {
              v2480[v2771] = v2770[v2771] === true;
            }
          }
        }
        return;
      }
      if (v2770 === "all") {
        v2480.category = "";
        v2480.networkOnly = false;
        v2480.currentSession = false;
        v2480.eventOnly = false;
      } else if (v2770 === "network") {
        v2480.networkOnly = !v2480.networkOnly;
        if (v2480.networkOnly) {
          v2480.eventOnly = false;
        }
      } else if (v2770 === "event") {
        v2480.eventOnly = !v2480.eventOnly;
        if (v2480.eventOnly) {
          v2480.networkOnly = false;
        }
      } else if (v2770 === "session") {
        v2480.currentSession = !v2480.currentSession;
      } else if (["task", "action", "background", "notification", "battery", "lifecycle"].includes(v2770)) {
        v2480.category = v2480.category === v2770 ? "" : v2770;
      }
    }
    function v2484() {
      v2470 = 0;
      if (v2482()) {
        const v2772 = v2468?.querySelector?.(".sheet-body");
        if (v2772) {
          v2772.scrollTop = 0;
        }
      }
    }
    function v2485(v2773) {
      v2483(v2773);
      v2484();
      return v2502(60);
    }
    function v2486() {
      v2480.accountOnly = !v2480.accountOnly;
      v2484();
      return v2502(60);
    }
    function v2487(v2774) {
      if (!v2482()) {
        return null;
      }
      if (v2469) {
        clearTimeout(v2469.timer);
        v2469.timer = 0;
      }
      v2480.query = String(v2774 || "").slice(0, 200);
      const v2775 = v2469?.search;
      if (v2775 && !v2469.composing && v2775.value !== v2480.query) {
        v2775.value = v2480.query;
      }
      v2462 = 60;
      v2484();
      return v2502(60);
    }
    function v2488() {
      return {
        ...v2480
      };
    }
    const v2489 = new WeakMap();
    const v2490 = v2776 => v2776 == null ? "" : typeof v2776 === "object" ? v2455(v2776) : String(v2776);
    function v2491(v2777) {
      let v2778 = v2489.get(v2777);
      if (v2778) {
        return v2778;
      }
      const v2779 = [v2777.url, v2777.reqHeaders, v2777.reqBody, v2777.respBody].map(v2490).join(" ").toLowerCase();
      const v2780 = [v2777.title, v2777.api, v2777.method, v2777.message, v2777.code, v2777.business, v2777.transport, v2777.detail, v2777.extra, v2777.phase, v2777.progress, v2777.account, v2777.accountId, v2777.source, v2777.producer, v2777.runId, v2777.taskId].map(v2490).join(" ").toLowerCase();
      v2778 = {
        all: v2780 + " " + v2779,
        content: v2779
      };
      v2489.set(v2777, v2778);
      return v2778;
    }
    function v2492(v2781) {
      return v2491(v2781).all;
    }
    function v2493() {
      const v2782 = {};
      if (v2480.networkOnly) {
        v2782.networkOnly = true;
      }
      if (v2480.currentSession) {
        v2782.currentSession = true;
      }
      const v2783 = v2451();
      if (v2480.accountOnly) {
        v2782.accountId = v2783;
      }
      if (v2480.category && !["action", "battery"].includes(v2480.category)) {
        v2782.category = v2480.category;
      }
      let v2784 = window.DIAG?.list?.(v2782) || [];
      if (v2480.accountOnly) {
        v2784 = v2783 ? v2784.filter(v2786 => v2786.accountId === v2783) : [];
      }
      if (v2480.networkOnly) {
        v2784 = v2784.filter(v2787 => v2787.kind === "request" && !v2787.demo && v2787.transport !== "not_sent");
      }
      if (v2480.eventOnly) {
        v2784 = v2784.filter(v2788 => v2788.kind !== "request");
      }
      const v2785 = v2480.category;
      if (v2785) {
        v2784 = v2784.filter(v2789 => v2785 === "action" ? ["action", "settings"].includes(v2449(v2789)) : v2785 === "battery" ? ["battery", "charge"].includes(v2449(v2789)) : v2449(v2789) === v2785);
      }
      return v2784;
    }
    function v2494(v2790) {
      if (v2790 === "all") {
        return !v2480.category && !v2480.networkOnly && !v2480.currentSession && !v2480.eventOnly;
      } else if (v2790 === "network") {
        return v2480.networkOnly;
      } else if (v2790 === "session") {
        return v2480.currentSession;
      } else if (v2790 === "event") {
        return v2480.eventOnly;
      } else {
        return v2480.category === v2790;
      }
    }
    function v2495() {
      if (!v2481()) {
        return;
      }
      v2467 = true;
      if (v2464 || !v2482()) {
        return;
      }
      v2464 = setTimeout(() => {
        v2464 = 0;
        if (v2482()) {
          v2502(v2462);
        }
      }, 200);
    }
    function v2496(v2791) {
      if (v2465 || typeof window.DIAG?.refresh !== "function" || !v2481() || v2461 !== v2791) {
        return;
      }
      v2465 = setTimeout(() => {
        v2465 = 0;
        if (!v2481() || v2461 !== v2791) {
          return;
        }
        if (!v2482() || typeof document !== "undefined" && document.hidden) {
          v2496(v2791);
          return;
        }
        if (v2466) {
          return;
        }
        v2466 = true;
        Promise.resolve().then(() => window.DIAG.refresh()).then(() => {
          if (v2461 === v2791) {
            v2473 = "";
            v2495();
          }
        }, v2792 => {
          if (v2461 === v2791) {
            v2473 = v2792?.message || "本机日志未能刷新，请稍后重试";
            v2495();
          }
        }).finally(() => {
          v2466 = false;
          if (v2461) {
            v2496(v2461);
          }
        });
      }, 1500);
    }
    function v2497() {
      if (!v2463) {
        v2463 = window.DIAG?.onChange?.(v2495) || null;
      }
      const v2793 = v2461;
      v2495();
      Promise.resolve().then(() => window.DIAG?.ready?.()).then(() => {
        if (v2461 === v2793) {
          v2495();
        }
      }, v2794 => {
        if (v2461 === v2793) {
          v2473 = v2794?.message || "本机日志未能完整读取";
          v2495();
        }
      }).finally(() => v2496(v2793));
    }
    function v2498() {
      v2463?.();
      v2463 = null;
      clearTimeout(v2464);
      clearTimeout(v2465);
      clearTimeout(v2469?.timer);
      v2464 = 0;
      v2465 = 0;
      v2467 = false;
      v2461 = null;
      v2468 = null;
      v2469 = null;
      v2471 = "";
      v2472 = "";
      v2470 = 0;
      v2474 = 0;
    }
    function v2499() {
      const v2795 = v2468?.querySelector?.(".app-log-filter-category .app-log-filters");
      if (!v2795) {
        return;
      }
      v2795.scrollLeft = v2474;
      v2795.addEventListener("scroll", () => {
        if (v2795.isConnected !== false) {
          v2474 = v2795.scrollLeft;
        }
      }, {
        passive: true
      });
    }
    function v2500(v2796) {
      clearTimeout(v2469?.timer);
      v2468 = v2796;
      v2471 = "";
      v2472 = "";
      v2499();
      const v2797 = v2796?.querySelector?.(".sheet-body");
      if (v2797) {
        v2797.scrollTop = v2470;
        v2797.addEventListener?.("scroll", () => {
          if (v2482() && v2797.isConnected !== false) {
            v2470 = v2797.scrollTop;
          }
        }, {
          passive: true
        });
        const v2798 = v2796.querySelector?.("[data-diag-search]");
        const v2799 = v2469 = {
          handle: v2383.currentSheet?.("diag"),
          search: v2798,
          timer: 0,
          composing: false
        };
        if (v2798) {
          v2798.value = v2480.query;
          const v2800 = () => v2469 === v2799 && v2461 === v2799.handle && v2482() && v2798.isConnected !== false;
          const v2801 = () => {
            clearTimeout(v2799.timer);
            v2799.timer = 0;
            if (!v2800() || v2799.composing) {
              return;
            }
            const v2802 = v2475();
            v2799.timer = setTimeout(() => {
              v2799.timer = 0;
              if (v2800() && !v2799.composing && v2476(v2802)) {
                v2487(v2798.value);
              }
            }, 100);
          };
          v2798.addEventListener("compositionstart", () => {
            v2799.composing = true;
            clearTimeout(v2799.timer);
            v2799.timer = 0;
          });
          v2798.addEventListener("compositionend", () => {
            v2799.composing = false;
            v2801();
          });
          v2798.addEventListener("input", v2803 => {
            if (v2803.isComposing) {
              clearTimeout(v2799.timer);
              v2799.timer = 0;
              return;
            }
            v2801();
          });
          v2798.addEventListener("keydown", v2804 => {
            if (v2804.key === "Escape" && (v2799.composing || v2804.isComposing || v2798.value)) {
              v2804.stopPropagation?.();
              if (!v2799.composing && !v2804.isComposing) {
                v2804.preventDefault();
                v2487("");
              }
            }
          });
        }
      }
      v2467 = true;
      v2495();
    }
    function v2501(v2805, v2806) {
      const v2807 = v2468?.querySelector?.("[data-diag-content]");
      if (!v2807) {
        return;
      }
      const v2808 = v2468.querySelector("[data-act=\"diagsearchclear\"]");
      if (v2480.query) {
        v2808?.removeAttribute("hidden");
      } else {
        v2808?.setAttribute("hidden", "");
      }
      if (v2805 !== v2471) {
        const v2810 = typeof document !== "undefined" ? document.activeElement : null;
        const v2811 = v2807.contains?.(v2810) ? v2810?.dataset : null;
        v2474 = v2468.querySelector(".app-log-filter-category .app-log-filters")?.scrollLeft ?? v2474;
        v2807.innerHTML = v2805;
        v2499();
        if (v2811?.act) {
          const v2812 = Array.from(v2807.querySelectorAll("[data-act]")).find(v2813 => v2813.dataset.act === v2811.act && v2813.dataset.id === v2811.id && v2813.dataset.v === v2811.v);
          v2812?.focus?.({
            preventScroll: true
          });
        }
      }
      const v2809 = v2468.querySelector(".app-log-menu-items");
      if (v2809 && v2806 !== v2472) {
        v2809.innerHTML = v2806;
      }
      v2471 = v2805;
      v2472 = v2806;
    }
    function v2502(v2814 = 60, v2815) {
      if (v2815 !== undefined) {
        v2483(v2815);
        v2484();
      }
      v2462 = Math.max(60, Math.min(6000, Number(v2814) || 60));
      const v2816 = v2481();
      if (!v2816) {
        v2473 = "";
      }
      if (v2816 && v2482()) {
        v2470 = v2468?.querySelector?.(".sheet-body")?.scrollTop ?? v2470;
      }
      const v2817 = v2493();
      const v2818 = v2480.query.trim().toLocaleLowerCase();
      const v2819 = v2818 ? v2817.filter(v2835 => v2492(v2835).includes(v2818)) : v2817;
      const v2820 = window.DIAG?.stats?.() || {};
      const v2821 = Number.isFinite(Number(v2820.count)) ? Number(v2820.count) : v2819.length;
      const v2822 = v2451();
      const v2823 = !!v2480.category || v2480.networkOnly || v2480.currentSession || v2480.accountOnly || v2480.eventOnly || !!v2818;
      const v2824 = v2819.slice(0, v2462).map(v2836 => v2460(v2836, v2818)).join("");
      const v2825 = v2477 || v2820.exporting === true;
      const v2826 = v2478 || v2820.lastExportError || "";
      const v2827 = v2473 || v2820.error || "";
      const v2828 = v2448.map(([v2837, v2838]) => "<button type=\"button\" class=\"app-log-filter" + (v2494(v2837) ? " sel" : "") + "\" data-act=\"diagfilter\" data-filter=\"" + v2837 + "\" data-v=\"" + v2837 + "\" aria-pressed=\"" + v2494(v2837) + "\">" + v2385(v2838) + "</button>").join("");
      const v2829 = "";
      const v2830 = "<button type=\"button\" data-act=\"diagexport\"" + (v2825 || v2820.loading || v2820.clearing || !v2821 ? " disabled" : "") + " aria-busy=\"" + v2825 + "\">" + v2383.icon("download", 18) + "<span>" + (v2825 ? "导出中…" : "导出日志") + "</span></button>\n        <button type=\"button\" data-act=\"diagclear\"" + (v2820.loading || v2820.clearing || v2825 || !v2821 ? " disabled" : "") + " aria-busy=\"" + (v2820.clearing === true) + "\">" + v2383.icon("close", 18) + "<span>" + (v2820.clearing ? "清空中…" : "清空日志") + "</span></button>";
      const v2831 = "<details class=\"app-log-menu\" data-diag-menu>\n      <summary class=\"iconbtn\" aria-label=\"日志操作\" title=\"日志操作\">" + v2383.icon("more", 20) + "</summary>\n      <div class=\"app-log-menu-items\" role=\"group\" aria-label=\"日志操作\">" + v2830 + "</div>\n    </details>";
      const v2832 = "<div class=\"app-log-filter-groups\">\n        <div class=\"app-log-filter-group app-log-filter-category\"><span class=\"app-log-filter-label\">类别</span><div class=\"app-log-filters\" role=\"group\" aria-label=\"按类别筛选\">" + v2828 + "</div></div>\n        <div class=\"app-log-filter-group\"><span class=\"app-log-filter-label\">范围</span><div class=\"app-log-filters\" role=\"group\" aria-label=\"按范围筛选\">\n          <button type=\"button\" class=\"app-log-filter" + (v2480.currentSession ? " sel" : "") + "\" data-act=\"diagfilter\" data-filter=\"session\" data-v=\"session\" aria-pressed=\"" + v2480.currentSession + "\">仅本次启动</button>\n          <button type=\"button\" class=\"app-log-filter" + (v2480.eventOnly ? " sel" : "") + "\" data-act=\"diagfilter\" data-filter=\"event\" data-v=\"event\" aria-pressed=\"" + v2480.eventOnly + "\">仅事件</button>\n          <button type=\"button\" class=\"app-log-filter" + (v2480.accountOnly ? " sel" : "") + "\" data-act=\"diagaccountfilter\" aria-pressed=\"" + v2480.accountOnly + "\"" + (!v2822 && !v2480.accountOnly ? " disabled title=\"当前没有可筛选的账号\"" : "") + ">仅当前账号</button>\n        </div></div>\n      </div>\n      <div class=\"app-log-count\" role=\"status\">" + (v2818 ? "匹配 " + v2819.length + "/" + v2821 + " 条 · 已显示 " + Math.min(v2819.length, v2462) + " 条" : "已显示 " + Math.min(v2819.length, v2462) + "/" + v2819.length + " 条" + (v2823 ? " · 共 " + v2821 + " 条" : "")) + "</div>\n      " + (v2820.loading ? "<div class=\"app-log-notice\" role=\"status\">正在读取本机记录… 当前列表尚未完整</div>" : "") + "\n      " + (v2820.clearing ? "<div class=\"app-log-notice\" role=\"status\">正在清空全部日志，等待本机确认…</div>" : "") + "\n      " + (v2827 ? "<div class=\"app-log-notice app-log-notice-error\" role=\"alert\">" + v2385(v2827) + "</div>" : "") + "\n      " + (v2825 ? "<div class=\"app-log-notice\" role=\"status\">" + v2383.spinner("正在准备完整日志并等待导出确认…") + "</div>" : "") + "\n      " + (v2826 ? "<div class=\"app-log-notice app-log-notice-error\" role=\"alert\">导出未完成：" + v2385(v2826) + "</div>" : "") + "\n      " + (v2479 && !v2825 ? "<div class=\"app-log-notice app-log-export-receipt\" role=\"status\">" + v2385(v2479) + "</div>" : "") + "\n      <div class=\"app-log-timeline\" aria-label=\"应用日志时间线\">" + (v2824 || "<div class=\"app-log-empty\">" + (v2820.loading ? "正在读取本机记录… 当前结果可能不完整" : v2480.accountOnly && !v2822 ? "当前没有可筛选的账号" : v2823 ? "没有符合搜索或筛选条件的记录" : "还没有应用日志") + "</div>") + "</div>\n      " + (v2819.length > v2462 ? "<button type=\"button\" class=\"btn tonal block app-log-more\" data-act=\"rawmore\" data-limit=\"" + (v2462 + 60) + "\">查看更多（已显示 " + Math.min(v2819.length, v2462) + "/" + v2819.length + " 条）</button>" : "");
      const v2833 = "<div class=\"app-log-page\">\n      <label class=\"app-log-search\"><span class=\"app-log-search-label\">搜索日志</span>\n        <input type=\"search\" data-diag-search aria-label=\"搜索日志内容\" placeholder=\"搜索请求、请求体、响应体或事件\" value=\"" + v2385(v2480.query) + "\" autocomplete=\"off\" spellcheck=\"false\">\n        <button type=\"button\" class=\"app-log-search-clear\" data-act=\"diagsearchclear\" aria-label=\"清除搜索\"" + (v2480.query ? "" : " hidden") + ">清除</button>\n      </label>\n      <div data-diag-content>" + v2832 + "</div>\n    </div>";
      const v2834 = {
        key: "diag",
        title: "应用日志",
        sub: v2829,
        body: v2833,
        full: true,
        headActions: v2831,
        onMount: v2500,
        onDismiss: v2498
      };
      v2467 = false;
      if (v2816) {
        if (v2482()) {
          v2501(v2832, v2830);
        } else {
          v2467 = true;
        }
      } else {
        v2461 = v2383.sheet(v2380(), v2834);
        v2471 = v2832;
        v2472 = v2830;
        v2497();
      }
      return v2461;
    }
    async function v2503() {
      if (v2477) {
        return null;
      }
      v2477 = true;
      v2478 = "";
      v2479 = "";
      if (v2482()) {
        v2502(v2462);
      } else {
        v2495();
      }
      try {
        const v2839 = window.DIAG;
        if (!v2839 || typeof v2839.exportLogs !== "function" && typeof v2839.exportText !== "function") {
          throw new Error("当前环境暂不支持日志导出");
        }
        const v2840 = v2839.stats?.() || {};
        if (v2840.clearing) {
          throw new Error("日志正在清空，请稍后重试导出");
        }
        await v2839.ready?.();
        const v2841 = await (v2839.exportLogs ? v2839.exportLogs() : v2839.exportText());
        if (v2841?.cancelled === true || v2841?.canceled === true) {
          v2479 = "已取消导出，日志仍保留";
          return null;
        }
        const v2842 = v2841 && typeof v2841 === "object" && v2841.filename && v2841.ok !== false && (v2841.downloadStarted === true || v2841.path || v2841.uri || v2841.nativeConfirmed === true);
        if (!v2842) {
          throw new Error(v2841?.error || "没有收到导出确认，日志仍保留，请重试");
        }
        const v2843 = v2841.path || v2841.uri;
        v2479 = v2841.nativeConfirmed === true ? (v2841.status === "shared" ? "已分享" : "已保存") + "：" + v2841.filename : v2841.downloadStarted === true || !v2843 ? "已发起下载：" + v2841.filename + "（保存位置由浏览器决定）" : (v2841.userSelected === false ? "已写入本机副本" : "已导出") + "：" + v2841.filename + "\n" + v2843;
        return v2841;
      } catch (v2844) {
        v2478 = v2844?.message || "日志未能导出，请重试";
        return null;
      } finally {
        v2477 = false;
        if (v2482()) {
          v2502(v2462);
        } else {
          v2495();
        }
      }
    }
    function v2504(v2845) {
      const v2846 = (window.DIAG?.list?.() || []).find(v2867 => v2867.id === v2845);
      if (!v2846) {
        return;
      }
      if (v2482()) {
        v2470 = v2468?.querySelector?.(".sheet-body")?.scrollTop ?? v2470;
      }
      const v2847 = (v2868, v2869, v2870) => v2869 === "" || v2869 == null ? "" : v2383.kv(v2868, v2869, v2870);
      const v2848 = v2449(v2846);
      const v2849 = v2846.producer ? v2446[v2846.producer] || "其他记录端" : "";
      const v2850 = v2453(v2846);
      const v2851 = "" + v2847("账号", v2450(v2846), {
        stack: true
      }) + v2847("账号 ID", v2846.accountId, {
        mono: true,
        stack: true
      }) + "\n      " + v2847("类别", v2444[v2848] || v2848) + v2847("阶段", v2445[v2846.phase] || v2846.phase) + v2847("进度", v2456(v2846)) + "\n      " + v2847("来源", v2850, {
        stack: true
      }) + (v2850 && v2850 !== v2846.source ? v2847("来源 ID", v2846.source, {
        mono: true,
        stack: true
      }) : "") + "\n      " + v2847("记录端", v2849) + v2847("任务 ID", v2846.runId || v2846.taskId, {
        mono: true,
        stack: true
      }) + "\n      " + v2847("启动 ID", v2846.sessionId, {
        mono: true,
        stack: true
      }) + v2847("记录 ID", v2846.id, {
        mono: true,
        stack: true
      });
      const v2852 = (v2871, v2872) => "<button type=\"button\" class=\"btn tonal block\" data-act=\"copy\" data-copy=\"" + v2385(v2871) + "\" data-label=\"" + v2385(v2872) + "\">" + v2383.icon("copy", 18) + "<span>复制" + v2385(v2872) + "</span></button>";
      const v2853 = (v2873, v2874, v2875) => {
        const v2876 = String(v2875 == null ? "" : v2875).trim();
        if (!v2876) {
          return "";
        }
        const v2877 = v2874 == null ? "" : String(v2874);
        const v2878 = v2877.length > 36 ? " wide" : "";
        return "<details class=\"app-log-fold\">\n        <summary class=\"app-log-fold-head\"><span class=\"app-log-fold-mark\" aria-hidden=\"true\">" + v2383.icon("right", 14) + "</span>\n          <span class=\"app-log-fold-label\">" + v2385(v2873) + "</span>\n          " + (v2877 ? "<span class=\"app-log-fold-hint" + v2878 + "\">" + v2385(v2877) + "</span>" : "") + "</summary>\n        <div class=\"app-log-fold-body\">" + v2876 + "</div>\n      </details>";
      };
      const v2854 = (v2879, v2880, v2881, {
        json = true,
        copy = true
      } = {}) => {
        const v2882 = json ? v2442(v2881) : v2455(v2881);
        if (!v2882) {
          return "";
        }
        return v2853(v2879, v2880, "<div class=\"code app-log-code\">" + (json ? v2443(v2882) : v2385(v2882)) + "</div>" + (copy ? v2852(v2882, v2879) : ""));
      };
      const v2855 = () => {
        if (v2481()) {
          v2495();
        }
      };
      const v2856 = v2454(v2846);
      const v2857 = [v2439(v2846.at), v2450(v2846)].filter(Boolean).join(" · ");
      if (v2846.kind !== "request") {
        const v2883 = v2459(v2846);
        const v2884 = v2846.stale === true || v2846.disposition === "discarded" ? "" : v2846.level === "err" ? " app-log-notice-error" : v2846.level === "warn" ? " app-log-notice-warn" : "";
        const v2885 = v2883 || v2846.detail ? "<div class=\"app-log-summary\">" + v2883 + "\n        " + (v2846.detail ? "<div class=\"app-log-detail-note" + v2884 + "\">" + v2385(v2846.detail) + "</div>" : "") + "</div>" : "";
        const v2886 = [v2439(v2846.at), v2450(v2846)].filter(Boolean).join(" · ");
        return v2383.sheet(v2380(), {
          key: "diag-detail",
          title: v2856,
          sub: v2857,
          full: true,
          onDismiss: v2855,
          body: "<div class=\"app-log-detail\">" + v2885 + "\n          " + v2853("日志信息", v2886 || "应用事件", "<div class=\"app-log-fields\">" + v2851 + v2847("时间", v2439(v2846.at)) + "</div>") + "\n          " + v2854("附加数据", "", v2846.extra) + "</div>"
        });
      }
      const v2858 = v2457(v2846);
      const v2859 = Number(v2846.n) > 1 && Number.isFinite(Number(v2846.durSum)) ? Math.round(Number(v2846.durSum) / Number(v2846.n)) : null;
      const v2860 = v2858.pending ? "尚未判定" : v2858.business === "ok" ? "成功" : v2858.business === "already" ? "已处理" : v2858.business === "failed" ? "失败" : "尚未判定";
      const v2861 = v2858.transport === "not_sent" ? v2846.demo ? "演示，未发送" : "未发送" : v2858.transport === "failed" ? v2858.status != null ? "响应读取失败" : "网络失败" : v2858.pending ? v2858.status != null ? "已收到响应头，正在读取" : "等待响应" : v2858.status != null ? "已收到 HTTP 响应" : "";
      const v2862 = v2858.discarded ? "已丢弃（上下文已变化）" : v2846.disposition === "adopted" ? "已采纳" : "未标记";
      const v2863 = window.DIAG?.scrubUrl ? window.DIAG.scrubUrl(v2846.url) : v2846.url;
      const v2864 = v2459(v2846);
      const v2865 = v2864 || v2846.message ? "<div class=\"app-log-summary\">" + (v2864 ? "<div class=\"app-log-results\">" + v2864 + "</div>" : "") + "\n      " + (v2846.message ? "<div class=\"app-log-detail-note" + (v2858.bad ? " app-log-notice-error" : "") + "\">" + v2385(v2846.message) + "</div>" : "") + "</div>" : "";
      const v2866 = v2887 => String(v2887 || "").split("\n").filter(v2888 => v2888.trim()).length;
      return v2383.sheet(v2380(), {
        key: "diag-detail",
        title: v2856,
        sub: v2857,
        full: true,
        onDismiss: v2855,
        body: "<div class=\"app-log-detail\">" + v2865 + "\n        " + v2853("请求信息", v2863 || "未发起请求", "<div class=\"app-log-fields\">\n          " + v2847("请求方式", v2846.method, {
          mono: true
        }) + v2847("请求时刻", v2439(v2846.at)) + v2847("响应时刻", v2439(v2846.responseAt)) + "\n          " + v2847("响应耗时", v2440(v2846.durMs)) + v2847("传输结果", v2861) + "\n          " + (v2858.transport !== "not_sent" && v2858.status != null ? v2847("HTTP 状态", "HTTP " + v2858.status + (v2858.httpOk ? "（成功）" : "（失败）")) : "") + "\n          " + v2847("业务结果", v2860) + v2847("业务码", v2846.code) + v2847("采纳结果", v2862) + "\n          " + (Number(v2846.n) > 1 ? v2847("合并次数", v2846.n + " 次") : "") + "\n          " + (v2859 != null ? v2847("平均耗时", v2440(v2859)) : "") + (Number(v2846.n) > 1 && v2846.durMax != null ? v2847("最慢耗时", v2440(v2846.durMax)) : "") + "\n          " + (v2863 ? v2852(v2863, "请求地址") : "") + "\n        </div>") + "\n        " + v2853("日志信息", v2450(v2846), "<div class=\"app-log-fields\">" + v2851 + "</div>") + "\n        " + v2854("请求头", v2846.reqHeaders ? v2866(v2846.reqHeaders) + " 行" : "", v2846.reqHeaders, {
          json: false
        }) + "\n        " + v2854("请求体", "", v2846.reqBody) + "\n        " + v2854("响应体", "", v2846.respBody) + "\n        " + (v2846.stripped && !v2846.respBody ? v2853("响应体", "", "<div class=\"app-log-scope\">较早的记录已精简，正文不再保留</div>") : "") + "</div>"
      });
    }
    function v2505(v2889) {
      v2383.sheet(v2380(), {
        title: "登录态已失效",
        sub: "token 无效或已过期",
        body: "<div class=\"note bad\">" + v2383.icon("alert", 18) + "<div>" + v2385(v2376.authMsg(v2889)) + "</div></div>\n        <div class=\"field mt16\"><button class=\"btn block\" data-act=\"debug\">" + v2383.icon("gear", 18) + "<span>重新登录</span></button></div>\n        <div class=\"field mt8\"><button class=\"btn tonal block\" data-act=\"resetdemo\">" + v2383.icon("db", 18) + "<span>清除数据，回到模拟车辆</span></button></div>\n        <div class=\"field mt8\" style=\"justify-content:center\"><button class=\"btn text sm\" data-act=\"retryauth\">先重试一次</button></div>\n        <div style=\"height:8px\"></div>"
      });
    }
    window.APP.gestures = {
      carCmdSheet: v2390,
      sendCarCmd: v2392,
      sendSteps: v2391,
      runCmd: v2415,
      bindHoldGestures: v2416,
      GESTURES: v2393,
      __msgSessionForTest: () => v2417,
      get busy() {
        return v2406;
      },
      get holdTimer() {
        return v2408;
      },
      get holdRaf() {
        return v2407;
      },
      actionSheet: v2431,
      authSheet: v2505,
      clearMsgReadMarks: v2429,
      markManyRead: v2428,
      msgDetail: v2430,
      msgSheet: v2419,
      rawDetail: v2504,
      rawSheet: v2502,
      setDiagFilter: v2485,
      setDiagQuery: v2487,
      toggleDiagAccount: v2486,
      exportDiag: v2503,
      getDiagFilter: v2488,
      refreshMsgs: v2418,
      settingSheet: v2435,
      capMetaBlock: v2434,
      devFold: v2436
    };
  })();
  (() => {
    const v2890 = window.APP;
    const v2891 = window.Store;
    const v2892 = window.UI;
    const v2893 = window.MODEL.esc;
    const v2894 = "zeeho.homecache.v1";
    const v2895 = "zeeho.profile.v1";
    const v2896 = ["zeeho.chgstop.v1", "zeeho.lastcharge.dismiss.v1"];
    const v2897 = ["zeeho.tasks", "zeeho.prize.v1"];
    const v2898 = ["zeeho.accounts.v1", "zeeho.token", "zeeho.session.v1", "zeeho.session.cleared.v1", "zeeho.store.removed.v1"];
    const v2899 = ["home", "native:panelLeftovers", "native:webHttp"];
    const v2900 = ["native:pageSnapshots", "diag", "native:nativeLogs", "native:iosLogs", "charge", "native:chargeHistory", "native:batteryHistory", "native:chargeEstimate"];
    const v2901 = ["accounts", "preferences", "dashboardThemes", "tasks", "pairing", "marks", "native:activePanel", "native:iosPersonalRecords", "native:batteryArchives", "native:protected", "other"];
    const v2902 = new Set([...v2899, ...v2900]);
    const v2903 = new Set([...v2902, ...v2901].filter(v2938 => v2938.startsWith("native:")));
    const v2904 = {
      accounts: ["账号信息", "登录信息与账号资料"],
      preferences: ["显示偏好", "主题、显示与轮询设置"],
      dashboardThemes: ["自定义仪表盘", "主题包，仅在自定义仪表盘中删除"],
      tasks: ["任务设置与记账", "每日任务、去重与奖品状态"],
      pairing: ["配对资料", "车辆配对与授权信息"],
      "native:protected": ["App 设置与重要资料", "原生设置及配对资料不属于临时缓存。"],
      other: ["其他本机资料", "未识别的数据，仅查看"],
      charge: ["本地充电历史", "删除已结束的充电记录，保留进行中的充电。"],
      "native:batteryHistory": ["电量与电流历史", "删除本机采样，已有充电曲线也可能缺少数据。"],
      "native:batteryArchives": ["电量历史救援归档", "可能是恢复旧采样的唯一备份。"],
      "native:chargeHistory": ["充电记录分段", "删除本机充电分段（包括正在记录的分段），保留电量采样。"],
      "native:chargeEstimate": ["旧版充电估算记录", "新版不再写入，但可补显示旧充电曲线。"],
      diag: ["应用日志", "用于排查操作和网络问题，清理后旧日志无法找回。"],
      "native:nativeLogs": ["App 诊断日志", "用于排查 App 问题，不影响业务记录。"],
      "native:iosLogs": ["App 启动日志", "用于排查启动和页面加载异常，不包含已导出的副本。"],
      home: ["首页与头像缓存", "刷新后重新生成；离线时可能暂时看不到上次车况。"],
      "native:panelLeftovers": ["页面更新残留", "仅清理闲置更新残件，保留可用页面和正在下载的文件。"],
      "native:pageSnapshots": ["页面更新文件", "只清理闲置文件；大小包含保留的离线页面。"],
      "native:activePanel": ["离线面板", "保留应用离线启动或恢复时需要的页面。"],
      "native:webHttp": ["网络资源缓存", "图片等资源会按需下载，不删除登录信息。"],
      marks: ["已关闭的提示", "保留已关闭的充电提示和入口状态。"]
    };
    let v2905 = null;
    function v2906(v2939) {
      const v2940 = String(v2939 ?? "");
      let v2941 = 0;
      for (let v2942 = 0; v2942 < v2940.length; v2942++) {
        const v2943 = v2940.charCodeAt(v2942);
        if (v2943 < 128) {
          v2941++;
        } else if (v2943 < 2048) {
          v2941 += 2;
        } else if (v2943 >= 55296 && v2943 <= 56319 && v2942 + 1 < v2940.length && v2940.charCodeAt(v2942 + 1) >= 56320 && v2940.charCodeAt(v2942 + 1) <= 57343) {
          v2941 += 4;
          v2942++;
        } else {
          v2941 += 3;
        }
      }
      return v2941;
    }
    const v2907 = v2944 => v2944 == null ? "无法统计" : v2944 < 1024 ? v2944 + " B" : v2944 < 1048576 ? (v2944 / 1024).toFixed(1) + " KB" : (v2944 / 1048576).toFixed(2) + " MB";
    const v2908 = (v2945, v2946) => v2945 === v2946 || v2945.startsWith(v2946 + "@");
    const v2909 = v2947 => v2905 === v2947 && v2890.accountCurrent(v2947.account) && v2890.current(v2947.vehicle);
    const v2910 = v2948 => v2905 === v2948 && v2892.sheetAlive(v2948.root);
    const v2911 = v2949 => {
      if (!v2909(v2949)) {
        throw new Error("账号或车辆已变化，已中止后续清理；请重新打开缓存管理。");
      }
      if (!v2910(v2949)) {
        throw new Error("缓存管理已关闭，未继续清理其他分类。");
      }
    };
    const v2912 = () => !v2891.error?.() && (!v2891.isNative() || v2891.canCommit() || v2891.canCommitAsync?.());
    const v2913 = () => !!window.TASKS?._state?.busy;
    function v2914() {
      const v2950 = [];
      const v2951 = v2891.isPreview?.() ? "UI 预览内存（关闭即清空）" : v2891.isNative() ? "App 私有 KV" : "浏览器 localStorage";
      const v2952 = {
        home: {
          id: "home",
          title: "首页快照",
          note: "本机所有账号的首页快照与账号档案缓存；不清当前画面的车况，后续刷新会重新生成。"
        },
        charge: {
          id: "charge",
          title: "本地充电历史",
          note: "本机所有账号的已结束充电历史。删除不可恢复；未结束段及采样时间水位保留。",
          history: true
        },
        marks: {
          id: "marks",
          title: "提示状态（保护）",
          note: "充电停止提示和上次充电入口的关闭状态；清理会让已关闭的提示重新出现。",
          protected: true
        },
        accounts: {
          id: "accounts",
          title: "账号信息（保护）",
          note: "账号、登录凭据和迁移回执不可在此清理；删除账号请去管理账号。",
          protected: true
        },
        tasks: {
          id: "tasks",
          title: "任务与每日记账（保护）",
          note: "任务设置、发帖去重、盲盒日期及未庆祝奖品保留；不重置正在运行的任务。",
          protected: true
        },
        pairing: {
          id: "pairing",
          title: "配对资料（保护）",
          note: "配对与授权资料只能在对应车辆的配对管理中操作。",
          protected: true
        },
        dashboardThemes: {
          id: "dashboardThemes",
          title: "自定义仪表盘（保护）",
          note: "设备级主题包，不随账号删除或缓存清理；请在主题里的自定义仪表盘管理。",
          protected: true
        },
        other: {
          id: "other",
          title: "其他本机数据（只读）",
          note: "未识别键仅统计，不猜测归属、不删除。",
          protected: true
        }
      };
      for (const v2962 of Object.values(v2952)) {
        Object.assign(v2962, {
          bytes: 0,
          count: 0,
          storage: v2951,
          keys: []
        });
      }
      let v2953 = 0;
      let v2954 = 0;
      let v2955 = 0;
      let v2956 = true;
      let v2957 = false;
      if (v2891.error?.()) {
        v2950.push(v2891.error());
      }
      for (const v2963 of v2891.keys()) {
        if (v2963 === "zeeho.dash" || v2908(v2963, "zeeho.diag.v1")) {
          continue;
        }
        const v2964 = v2908(v2963, v2894) || v2908(v2963, v2895) ? v2952.home : v2908(v2963, "zeeho.chg.v1") ? v2952.charge : v2896.some(v2966 => v2908(v2963, v2966)) ? v2952.marks : v2898.some(v2967 => v2908(v2963, v2967)) ? v2952.accounts : v2897.some(v2968 => v2908(v2963, v2968)) ? v2952.tasks : v2963 === "zeeho.dashboard.custom.v1" ? v2952.dashboardThemes : /^zeeho\.(?:pair|pairing|inductive|vault)(?:[.@]|$)/.test(v2963) ? v2952.pairing : v2952.other;
        const v2965 = v2891.get(v2963);
        if (typeof v2965 !== "string") {
          continue;
        }
        v2964.keys.push(v2963);
        v2964.count++;
        v2964.bytes += v2906(v2965);
        if (v2964 === v2952.charge) {
          try {
            const v2969 = window.CHG.historyPlan(v2965);
            v2953 += v2969.count;
            v2954 += v2969.current;
            v2957 ||= v2969.changed === true;
            v2955 += Math.max(0, v2906(v2965) - v2906(v2969.value));
          } catch (v2970) {
            v2956 = false;
            v2950.push(v2970.message);
          }
        }
      }
      for (const v2971 of Object.values(v2952)) {
        v2971.clearable = !v2971.protected && v2912() && v2971.count > 0;
      }
      v2952.charge.records = v2953;
      v2952.charge.clearable = v2952.charge.clearable && v2956 && v2957;
      v2952.charge.note += " 共 " + v2953 + " 次历史、" + v2954 + " 个未结束段；可释放 " + v2907(v2955) + "。";
      if (v2891.error?.()) {
        for (const v2972 of Object.values(v2952)) {
          v2972.bytes = null;
        }
      }
      const v2958 = v2891.isPreview?.() || v2891.requiresAsync?.();
      let v2959 = null;
      let v2960 = false;
      try {
        v2959 = v2958 ? v2891.get("zeeho.dash") : window.localStorage.getItem("zeeho.dash");
      } catch {
        v2960 = true;
      }
      const v2961 = {
        id: "preferences",
        title: "显示偏好",
        bytes: v2960 || v2958 && v2891.error?.() ? null : v2906(v2959),
        count: v2959 === null ? 0 : 1,
        storage: v2958 ? v2951 : "浏览器 localStorage",
        clearable: false,
        note: "主题、显示及轮询偏好；旧版或浏览器副本可能还带身份，不整键删除、不覆盖。"
      };
      return {
        categories: [...Object.values(v2952), v2961],
        errors: v2950
      };
    }
    function v2915(v2973) {
      const v2974 = typeof v2973 === "string" ? JSON.parse(v2973) : v2973;
      if (!v2974 || typeof v2974 !== "object") {
        throw new Error("App 缓存管理返回格式无法识别。");
      }
      return v2974;
    }
    function v2916(v2975, v2976, v2977) {
      if (!v2975 || !Array.isArray(v2975.categories)) {
        throw new Error("App 缓存结果无法识别。");
      }
      const v2978 = v2982 => Object.prototype.hasOwnProperty.call(v2975, v2982);
      const v2979 = ["cleared", "clearErrors", "statsErrors"].some(v2978);
      if (!v2979) {
        if (!Array.isArray(v2975.errors) || v2975.errors.some(v2983 => typeof v2983 !== "string")) {
          throw new Error("App 缓存结果无法识别。");
        }
        return {
          ...v2975,
          receiptModern: false
        };
      }
      if (["cleared", "clearErrors", "statsErrors"].some(v2984 => !Array.isArray(v2975[v2984]) || v2975[v2984].some(v2985 => typeof v2985 !== "string"))) {
        throw new Error("App 缓存分阶段回执无法识别。");
      }
      const v2980 = new Set(v2975.cleared);
      const v2981 = new Set();
      if (v2980.size !== v2975.cleared.length || [...v2980].some(v2986 => !v2977.includes(v2986))) {
        throw new Error("App 清理分类回执不匹配，结果未确认。");
      }
      for (const v2987 of v2975.clearErrors) {
        const v2988 = v2987.split(":")[0];
        if (!v2977.includes(v2988) || v2980.has(v2988)) {
          throw new Error("App 清理分类回执不匹配，结果未确认。");
        }
        v2981.add(v2988);
      }
      if (v2976 === "clear" && v2977.some(v2989 => !v2980.has(v2989) && !v2981.has(v2989))) {
        throw new Error("App 清理分类回执不完整，结果未确认。");
      }
      return {
        ...v2975,
        errors: [...v2975.clearErrors, ...v2975.statsErrors],
        receiptModern: true
      };
    }
    const v2917 = () => window.IOSBR?.candidate?.() === true && !window.ZeehoShell;
    async function v2918(v2990, v2991, v2992 = []) {
      v2911(v2990);
      if (v2917()) {
        const v2999 = window.IOSBR;
        const v3000 = "cache." + v2991;
        if (!v2999.has(v3000)) {
          throw new Error("当前 App 只支持管理面板内的数据；更新后可管理系统缓存。");
        }
        const v3001 = await (v2991 === "clear" ? v2999.call(v3000, v2992) : v2999.call(v3000));
        v2911(v2990);
        if (v3001?.ok !== true) {
          throw new Error(v3001?.error?.code === "cache_busy" ? "缓存正在处理，请稍后重新统计。" : "原生缓存操作未确认，请重新统计。");
        }
        const v3002 = v2916(v3001, v2991, v2992);
        if (!v3002.receiptModern) {
          throw new Error("原生缓存回执不完整，请重新统计。");
        }
        return v3002;
      }
      const v2993 = window.ZeehoShell;
      if (typeof v2993?.beginCacheManagement !== "function" || typeof v2993?.pollCacheManagement !== "function") {
        throw new Error("更新 App 后才能统计和清理原生缓存；不会调用旧同步桥。");
      }
      v2911(v2990);
      const v2994 = v2993.beginCacheManagement(v2991, v2991 === "clear" ? JSON.stringify(v2992) : "{}");
      const v2995 = typeof v2994 === "string" && !v2994.trim().startsWith("{") ? {
        ticket: v2994
      } : typeof v2994 === "number" ? {
        ticket: v2994
      } : v2915(v2994);
      const v2996 = String(v2995.ticket ?? "");
      if (!v2996 || v2996.length > 160) {
        throw new Error(v2995.error || "App 缓存任务未能开始。");
      }
      const v2997 = Date.now() + 30000;
      let v2998 = v2995;
      while (true) {
        v2911(v2990);
        if (String(v2998.ticket) !== v2996) {
          throw new Error("App 缓存任务回执不匹配，未认定清理成功。");
        }
        if (v2998.done === true) {
          if (v2998.ok !== true) {
            throw new Error(v2998.error || "App 缓存操作失败，未认定清理成功。");
          }
          const v3003 = typeof v2998.json === "string" ? JSON.parse(v2998.json) : v2998.json;
          return v2916(v3003, v2991, v2992);
        }
        if (Date.now() >= v2997) {
          throw new Error("App 缓存操作超时，结果未确认；请重新统计。");
        }
        await new Promise(v3004 => setTimeout(v3004, 100));
        v2911(v2990);
        v2998 = v2915(v2993.pollCacheManagement(v2996));
      }
    }
    async function v2919(v3005) {
      if (!window.DIAG?.stats || !window.DIAG?.list) {
        throw new Error("诊断日志容量暂时无法统计。");
      }
      window.DIAG.list();
      let v3006 = window.DIAG.stats();
      if (v3006.loading) {
        v3006 = await new Promise((v3007, v3008) => {
          let v3009 = null;
          const v3010 = (v3013, v3014) => {
            clearTimeout(v3011);
            v3009?.();
            v3005.diagCancel = null;
            if (v3013) {
              v3008(v3013);
            } else {
              v3007(v3014);
            }
          };
          const v3011 = setTimeout(() => v3010(new Error("诊断日志统计超时，请重新统计。")), 15000);
          v3005.diagCancel = () => v3010(new Error("缓存管理已关闭。"));
          v3009 = window.DIAG.onChange?.(() => {
            const v3015 = window.DIAG.stats();
            if (!v3015.loading) {
              v3010(null, v3015);
            }
          });
          const v3012 = window.DIAG.stats();
          if (!v3012.loading) {
            v3010(null, v3012);
          }
        });
      }
      if (v3006.error) {
        throw new Error(String(v3006.error));
      }
      return v3006;
    }
    async function v2920(v3016) {
      const v3017 = v2914();
      v3016.categories = v3017.categories;
      v3016.errors = v3017.errors;
      try {
        const v3018 = await v2919(v3016);
        v2911(v3016);
        if (!v3018 || !Number.isFinite(v3018.bytes) || v3018.bytes < 0 || !Number.isFinite(v3018.count) || v3018.count < 0) {
          throw new Error("诊断日志容量暂时无法统计。");
        }
        v3016.categories.unshift({
          id: "diag",
          title: "应用日志",
          bytes: v3018.bytes,
          count: v3018.count,
          storage: String(v3018.storage || (v2891.isNative() ? "App 应用日志" : "本次页面内存")),
          clearable: v3018.count > 0 && typeof window.DIAG?.clear === "function",
          note: v2891.isNative() ? "本机全部账号的应用日志；同应用日志页面的清空按钮，不删除账号、设置或电量历史。" : "仅本次页面生命周期的日志，不操作浏览器登录数据。"
        });
      } catch (v3019) {
        if (!v2909(v3016)) {
          throw v3019;
        }
        v3016.errors.push(v3019.message);
        v3016.categories.unshift({
          id: "diag",
          title: "诊断日志",
          bytes: null,
          count: 0,
          storage: "诊断模块",
          clearable: false,
          note: v3019.message
        });
      }
      if (v2891.isNative()) {
        try {
          const v3020 = await v2918(v3016, "stats");
          v2911(v3016);
          v3016.errors.push(...v3020.errors);
          const v3021 = new Set();
          for (const v3022 of v3020.categories) {
            if (v3022.id === "personalRecords" || v3022.id === "rideRecords") {
              v3022.id = "iosPersonalRecords";
              v3022.title = "本机骑行与电池记录";
              v3022.clearable = false;
              v3022.note = "本机原始记录不是临时缓存；请在记录页面管理。";
            }
            const v3023 = "native:" + v3022?.id;
            if (!v2903.has(v3023) || v3021.has(v3023)) {
              continue;
            }
            if (v3022.id === "nativeLogs" && typeof window.ZeehoShell?.beginAppLog === "function") {
              continue;
            }
            v3021.add(v3023);
            const v3024 = Number.isSafeInteger(v3022.count) && v3022.count >= 0 ? v3022.count : 0;
            const v3025 = Number.isSafeInteger(v3022.bytes) && v3022.bytes >= 0 ? v3022.bytes : null;
            const v3026 = v3020.errors.some(v3028 => v3028.split(":")[0] === v3022.id);
            const v3027 = v2917() && v3022.id === "webHttp" && v3022.bytes === null;
            v3016.categories.push({
              id: v3023,
              nativeId: v3022.id,
              title: String(v3022.title || v3022.id),
              bytes: v3026 ? null : v3025,
              count: v3024,
              storage: "App 原生存储",
              protected: v2901.includes(v3023),
              clearable: !v3026 && v3024 > 0 && (v3025 !== null || v3027) && v3022.clearable === true && v2902.has(v3023),
              note: String(v3022.note || "")
            });
          }
        } catch (v3029) {
          if (!v2909(v3016)) {
            throw v3029;
          }
          v3016.errors.push(v3029.message);
          v3016.categories.push({
            id: "nativeUnavailable",
            title: "原生缓存",
            bytes: null,
            count: 0,
            storage: "App 原生私有空间",
            clearable: false,
            note: v3029.message
          });
        }
      }
      v2911(v3016);
      for (const v3030 of v3016.selected) {
        if (!v3016.categories.some(v3031 => v3031.id === v3030 && v3031.clearable)) {
          v3016.selected.delete(v3030);
        }
      }
      if (!v3016.defaultsApplied) {
        for (const v3032 of v3016.categories) {
          if (v2899.includes(v3032.id) && v3032.clearable) {
            v3016.selected.add(v3032.id);
          }
        }
        v3016.defaultsApplied = true;
      }
    }
    const v2921 = v3033 => v2904[v3033.id]?.[0] || v3033.title;
    const v2922 = v3034 => v2904[v3034.id]?.[1] || v3034.note;
    const v2923 = v3035 => v3035.categories.filter(v3036 => v3036.clearable && v2902.has(v3036.id) && v3035.selected.has(v3036.id));
    const v2924 = v3037 => v3037.loading || v3037.busy || !v2909(v3037);
    const v2925 = v3038 => v3038.bytes === null && v3038.id === "native:webHttp" && v3038.clearable ? v3038.count + " 个来源" : v2907(v3038.bytes);
    function v2926(v3039) {
      const v3040 = v2923(v3039).length;
      return "<div class=\"cache-actions\"><span class=\"cache-selection\" aria-live=\"polite\">" + (v3040 ? "已选 " + v3040 + " 项" : "未选择清理项") + "</span>\n      <button class=\"btn\" data-act=\"cacheconfirm\" " + (v2924(v3039) || !v3040 ? "disabled" : "") + ">" + v2892.icon("trash", 18) + "<span>清理所选</span></button></div>";
    }
    function v2927(v3041, v3042) {
      const v3043 = v3041.selected.has(v3042.id);
      const v3044 = v2901.includes(v3042.id);
      const v3045 = "<span class=\"cache-item-copy\"><b>" + v2893(v2921(v3042)) + "</b><span>" + v2893(v2922(v3042)) + "</span></span>";
      return "<div class=\"cache-item" + (v3043 ? " cache-item-selected" : "") + "\">\n      " + (v3042.clearable && v2902.has(v3042.id) ? "<button class=\"cache-pick\" role=\"checkbox\" aria-label=\"清理" + v2893(v2921(v3042)) + "\" aria-checked=\"" + v3043 + "\" data-act=\"cachepick\" data-id=\"" + v3042.id + "\" " + (v2924(v3041) ? "disabled" : "") + ">" + v3045 + "<span class=\"cache-size\">" + v2893(v2925(v3042)) + "</span><span class=\"cache-check\" aria-hidden=\"true\">" + (v3043 ? v2892.icon("check", 16) : "") + "</span></button>" : "<div class=\"cache-item-static\">" + v3045 + "<span class=\"cache-size\">" + (v3044 && v3042.bytes === null ? "保留" : v2893(v2925(v3042))) + "</span><span class=\"cache-static-icon\" aria-hidden=\"true\">" + (v3044 ? v2892.icon("lock", 16) : "") + "</span></div>") + "</div>";
    }
    function v2928(v3046) {
      const v3047 = v3053 => v3053.map(v3054 => v3046.categories.find(v3055 => v3055.id === v3054)).filter(v3056 => v3056 && (v3056.count > 0 || v3056.bytes === null)).map(v3057 => v2927(v3046, v3057)).join("");
      const v3048 = v3046.categories.reduce((v3058, v3059) => v3058 + (v3059.bytes ?? 0), 0);
      const v3049 = v3046.errors.length || v3046.categories.some(v3060 => v3060.bytes === null);
      const v3050 = v3047(v2899);
      const v3051 = v3047(v2900);
      const v3052 = v3047(v2901);
      return "<div class=\"cache-manager\" aria-busy=\"" + v3046.loading + "\">\n      <div class=\"cache-overview\"><div><span>已统计大小</span><b>" + (v3046.loading ? v2892.spinner("统计中") : v2893(v3048 || !v3049 ? v2907(v3048) : "—")) + "</b>" + (!v3046.loading && v3049 && v3048 ? "<span>另有部分数据未计入</span>" : "") + "</div>\n        <button class=\"cache-info\" data-act=\"cacherefresh\" aria-label=\"重新统计\" title=\"重新统计\" " + (v2924(v3046) ? "disabled" : "") + ">" + v2892.icon("refresh", 20) + "</button></div>\n      " + (v3046.errors.length ? "<details class=\"cache-errors\"><summary>部分数据未能统计</summary>" + [...new Set(v3046.errors)].map(v3061 => "<p>" + v2893(v3061) + "</p>").join("") + "</details>" : "") + "\n      " + (v3046.loading ? "" : "<section class=\"cache-section\" data-section=\"recommended\"><h3>建议清理</h3><p>可重新生成的缓存和不再使用的旧文件</p><div class=\"cache-items\">" + (v3050 || "<p class=\"cache-empty\">没有建议清理的项目</p>") + "</div></section>\n        " + (v3051 ? "<section class=\"cache-section\" data-section=\"optional\"><h3>按需清理</h3><p>历史记录和排查日志，默认保留</p><div class=\"cache-items\">" + v3051 + "</div></section>" : "") + "\n        <section class=\"cache-section\" data-section=\"protected\"><button class=\"cache-protected-toggle\" data-act=\"cacheprotected\" aria-expanded=\"" + v3046.showProtected + "\">" + v2892.icon("lock", 18) + "<span><b>不会清理</b><small>账号、设置、配对和重要资料</small></span>" + v2892.icon("down", 18) + "</button>" + (v3046.showProtected ? "<div class=\"cache-items\">" + v3052 + "</div>" + (v2917() ? "<p>本机骑行记录、原生电池和充电记录也会保留，请在各自的记录页面管理。</p>" : "") : "") + "</section>") + "\n      " + v2926(v3046) + "</div>";
    }
    function v2929(v3062) {
      if (v2910(v3062)) {
        v2892.updateSheet(v3062.root, {
          body: v2928(v3062)
        });
      }
    }
    function v2930(v3063) {
      const v3064 = v2905;
      const v3065 = v3064?.categories.find(v3066 => v3066.id === v3063);
      if (!v3064 || !v3065 || v2924(v3064) || !v2910(v3064)) {
        return;
      }
      v2892.sheet(v2890.phone(), {
        key: "cache-detail",
        center: true,
        title: v2921(v3065),
        body: "<div class=\"cache-detail\"><p>" + v2893(v3065.note || v2922(v3065)) + "</p><p class=\"cache-size\">" + v2893(v2925(v3065)) + "</p></div>"
      });
    }
    function v2931() {
      const v3067 = v2905;
      if (!v3067 || !v2910(v3067) || v3067.loading || v3067.busy) {
        return;
      }
      v3067.showProtected = !v3067.showProtected;
      v2929(v3067);
    }
    function v2932(v3068) {
      const v3069 = v2905;
      const v3070 = v3069?.categories.find(v3071 => v3071.id === v3068);
      if (!v3069 || v2924(v3069) || !v2902.has(v3068) || !v3070?.clearable || !v2910(v3069)) {
        return;
      }
      v3069.confirmed = null;
      if (v3069.selected.has(v3068)) {
        v3069.selected.delete(v3068);
      } else {
        v3069.selected.add(v3068);
      }
      v2929(v3069);
    }
    function v2933() {
      const v3072 = v2905;
      if (!v3072 || v3072.loading || v3072.busy || v2892.currentSheet() !== v3072.root || !v3072.selected.size || !v2910(v3072)) {
        return;
      }
      try {
        v2911(v3072);
      } catch (v3075) {
        v2892.toast(v2890.phone(), v3075.message);
        v2929(v3072);
        return;
      }
      const v3073 = v2923(v3072);
      if (!v3073.length) {
        return;
      }
      v3072.confirmed = v3073.map(v3076 => v3076.id);
      const v3074 = v3073.some(v3077 => v2900.includes(v3077.id) && v3077.id !== "native:pageSnapshots");
      v3072.confirmHandle = v2892.sheet(v2890.phone(), {
        key: "cache-confirm",
        center: true,
        title: "确认清理",
        onDismiss: () => {
          v3072.confirmed = null;
        },
        body: "<div class=\"cache-confirm\"><p>清理范围：本机所有账号，不影响云端数据。</p>" + (v3074 ? "<p class=\"cache-warning\">所选历史记录或日志删除后无法恢复。</p>" : "<p>账号、设置和离线面板不会被删除。</p>") + "\n        <ul>" + v3073.map(v3078 => "<li><b>" + v2893(v2921(v3078)) + "</b><span>" + v2893(v2922(v3078)) + "</span></li>").join("") + "</ul>\n        <div class=\"cache-confirm-actions\"><button class=\"btn tonal\" data-act=\"cacheback\">返回检查</button><button class=\"btn" + (v3074 ? " danger" : "") + "\" data-act=\"cacheclear\">确认清理</button></div></div>"
      });
    }
    async function v2934(v3079, v3080) {
      v2911(v3079);
      if (!v2912()) {
        throw new Error(v2891.error?.() || "本机存储不支持可靠清理，请更新 App。");
      }
      const v3081 = {};
      const v3082 = [];
      const v3083 = new Map();
      for (const v3084 of v2891.keys()) {
        const v3085 = v3080.includes("home") && (v2908(v3084, v2894) || v2908(v3084, v2895));
        if (v3085) {
          v3083.set(v3084, v2891.get(v3084));
          v3082.push(v3084);
        } else if (v3080.includes("charge") && v2908(v3084, "zeeho.chg.v1")) {
          const v3086 = v2891.get(v3084);
          const v3087 = window.CHG.historyPlan(v3086);
          v3083.set(v3084, v3086);
          if (v3087.changed) {
            v3081[v3084] = v3087.value;
          }
        }
      }
      v2911(v3079);
      for (const [v3088, v3089] of v3083) {
        if (v2891.get(v3088) !== v3089) {
          throw new Error("缓存已更新，未覆盖新记录；请重新统计。");
        }
      }
      if ((v3082.length || Object.keys(v3081).length) && (await v2891.commitAsync({
        puts: v3081,
        removes: v3082
      })) !== true) {
        throw new Error("未能确认保存清理结果，请重新打开缓存管理后检查。");
      }
      v2911(v3079);
      v2890.cacheResetMemory(v3080);
    }
    async function v2935() {
      const v3090 = v2905;
      if (!v3090 || v3090.busy || !v3090.confirmed?.length || v2892.currentSheet() !== v3090.confirmHandle) {
        return;
      }
      const v3091 = v2923(v3090).map(v3098 => v3098.id).filter(v3099 => v3090.confirmed.includes(v3099));
      v3090.confirmed = null;
      if (!v3091.length) {
        return;
      }
      try {
        v2911(v3090);
      } catch (v3100) {
        v2892.closeSheet(v3090.confirmHandle);
        v2892.toast(v2890.phone(), v3100.message);
        return;
      }
      v3090.busy = true;
      v2892.updateSheet(v3090.confirmHandle, {
        body: "<div class=\"note\" role=\"status\">" + v2892.spinner("正在清理所选项目…") + "</div>"
      });
      v2929(v3090);
      const v3092 = [];
      const v3093 = [];
      const v3094 = [];
      const v3095 = window.DIAG?.capture?.() || {};
      window.DIAG?.event?.("缓存清理开始", {
        ...v3095,
        category: "action",
        phase: "start",
        detail: v3091.map(v3101 => v2904[v3101]?.[0] || v3101).join("、")
      });
      const v3096 = v3091.filter(v3102 => v3102 === "home" || v3102 === "charge");
      try {
        if (v3096.length) {
          await v2934(v3090, v3096);
          v3092.push(...v3096);
        }
        if (v3091.includes("diag")) {
          v2911(v3090);
          const v3104 = await Promise.resolve(window.DIAG.clear());
          if (v3104 !== true) {
            throw new Error("应用日志清理未全部确认，请稍后重试。");
          }
          v3092.push("diag");
          v2911(v3090);
        }
        const v3103 = v3091.filter(v3105 => v3105.startsWith("native:")).map(v3106 => v3106.slice(7));
        if (v3103.length) {
          if (v2913()) {
            throw new Error("任务正在运行，未清理原生记录；请完成任务后重试。");
          }
          const v3107 = await v2918(v3090, "clear", v3103);
          let v3108;
          if (v3107.receiptModern) {
            v3108 = v3107.cleared;
            v3093.push(...v3107.clearErrors);
            v3094.push(...v3107.statsErrors);
          } else if (!v3107.errors.length) {
            v3108 = v3103;
          } else {
            v3108 = [];
            v3093.push("旧版 App 无法区分清理和统计失败，已提交结果未确认；请重新统计，不要直接重复清理。");
            v3094.push(...v3107.errors);
          }
          v2890.cacheResetMemory(v3108.map(v3109 => "native:" + v3109));
          v3092.push(...v3108.map(v3110 => "native:" + v3110));
          v2911(v3090);
        }
      } catch (v3111) {
        v3093.push(v3111.message);
      } finally {
        v3090.busy = false;
      }
      for (const v3112 of v3091) {
        v3090.selected.delete(v3112);
      }
      const v3097 = "" + (v3092.length ? "已清理：" + v3092.map(v3113 => v2904[v3113]?.[0] || v3113).join("、") + "。" : "没有已确认的清理结果。") + v3093.join("；") + (v3094.length ? " 部分容量未能重新统计。" : "");
      if (!v3091.includes("diag")) {
        window.DIAG?.event?.("缓存清理结束", {
          ...v3095,
          category: "action",
          phase: "end",
          kind: v3093.length ? "err" : "ok",
          detail: v3097
        });
      }
      if (!v2910(v3090)) {
        return;
      }
      if (v2892.sheetAlive(v3090.confirmHandle)) {
        v2892.closeSheet(v3090.confirmHandle);
      }
      v2892.toast(v2890.phone(), v3097, v3093.length || v3094.length ? 6200 : 3800);
      if (v2909(v3090)) {
        await v2936(v3090);
      } else {
        v2929(v3090);
      }
    }
    async function v2936(v3114 = v2905) {
      if (!v3114 || v3114.busy || v3114.loading || !v2910(v3114)) {
        return;
      }
      v3114.loading = true;
      v2929(v3114);
      try {
        v2911(v3114);
        await v2920(v3114);
      } catch (v3115) {
        v3114.errors.push(v3115.message);
      } finally {
        v3114.loading = false;
        v2929(v3114);
      }
    }
    function v2937() {
      if (v2905?.busy) {
        v2892.toast(v2890.phone(), "清理尚未结束，请稍后重新打开。");
        return;
      }
      const v3116 = v2905;
      if (v3116 && v2910(v3116) && v2909(v3116)) {
        v2929(v3116);
        return;
      }
      if (v3116 && v2910(v3116)) {
        v2892.closeSheet(v3116.root);
      }
      const v3117 = {
        account: v2890.accountContext(),
        vehicle: v2890.context(),
        categories: [],
        errors: [],
        selected: new Set(),
        loading: true,
        busy: false,
        confirmed: null,
        showProtected: false,
        defaultsApplied: false
      };
      v2905 = v3117;
      v3117.root = v2892.sheet(v2890.phone(), {
        key: "cache-manager",
        full: true,
        className: "cache-sheet",
        title: "缓存管理",
        body: v2928(v3117),
        onMount: v3118 => {
          const v3119 = v3118.querySelector(".cache-actions");
          if (v3119) {
            v3118.appendChild(v3119);
          }
        },
        onDismiss: () => v3117.diagCancel?.()
      });
      v3117.loading = false;
      v2936(v3117);
    }
    v2890.cache = {
      open: v2937,
      toggleProtected: v2931,
      detail: v2930,
      pick: v2932,
      confirm: v2933,
      clear: v2935,
      refresh: v2936,
      utf8: v2906,
      localStats: v2914
    };
  })();
})();
(() => {
  (() => {
    const v1 = window.APP;
    const v2 = window.Store;
    const v3 = window.MODEL;
    const v4 = window.UI;
    const v5 = window.ZEEHO_THEME;
    const v6 = v3.esc;
    const {
      APP_VER: v7,
      $: v8,
      phone: v9,
      scroll: v10
    } = v1;
    const v11 = v540 => {
      const v541 = window.APP?.auth?.parseTokenText;
      if (typeof v541 === "function") {
        return v541(v540);
      }
      const v542 = String(v540 || "").trim();
      if (!v542) {
        return null;
      }
      const v543 = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
      const v544 = v549 => {
        let v550 = String(v549 || "").trim();
        try {
          v550 = decodeURIComponent(v550);
        } catch {}
        v550 = v550.replace(/^bearer\s+/i, "").trim().replace(/^["'`]+|["'`,;<>)\]]+$/g, "").trim();
        return v550;
      };
      const v545 = "[\"'`]?\\s*[:=]\\s*[\"'`]?\\s*";
      const v546 = "([^\\s\"'`&,;}\\]>#]+)";
      for (const v551 of [new RegExp("access[_-]?token" + v545 + v546, "i"), new RegExp("(?:^|[^A-Za-z0-9_])token" + v545 + v546, "i"), new RegExp("authorization" + v545 + "(?:bearer\\s+)?[\"'`]?\\s*" + v546, "i"), new RegExp("\\bbearer\\s+" + v546, "i")]) {
        const v552 = v542.match(v551);
        const v553 = v552 && v544(v552[1]);
        if (v553) {
          return {
            token: v553
          };
        }
      }
      const v547 = v544(v542);
      if (v543.test(v547)) {
        return {
          token: v547
        };
      }
      const v548 = [...new Set(v542.match(/[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}/gi) || [])];
      if (v548.length === 1 && !new RegExp("refresh[_-]?token" + v545 + v548[0], "i").test(v542)) {
        return {
          token: v548[0]
        };
      }
      return null;
    };
    const v12 = () => window.PLATFORM?.preview?.() === true;
    const v13 = v554 => window.PLATFORM?.visible?.(v554) !== false;
    const v14 = () => v12() || v198();
    const v15 = v555 => window.PLATFORM?.unavailable?.(v555) || false;
    const v16 = v1.state;
    const v17 = () => window.API?.isCurrent?.() === false || !window.ZeehoShell && !window.IOSBR?.available?.() && (!!window.__zeehoMigrationQuiet || !!window.__zeehoMigration || v1.domainMigration?.quiet?.());
    const v18 = () => !v17() && v1.domainMigration?.canPersist?.() !== false;
    const v19 = (() => {
      try {
        return new URL(location.href).searchParams.get("_shellNav") || "";
      } catch {
        return "";
      }
    })();
    const {
      RIDE: v20,
      open: v21,
      render: v22,
      renderDay: v23,
      renderTrip: v24,
      ensureMonth: v25,
      ensureYear: v26,
      refreshRideWhenReady: v27,
      speedChart: v28
    } = v1.ride;
    const {
      chargeSheet: v29,
      chargeHistorySheet: v30,
      chargeSessionSheet: v31,
      chgRange: v32,
      chgSocLine: v33
    } = v1.chg;
    const {
      batteryDetailSheet: v34
    } = v1.batterydetail;
    const {
      openSocialDetail: v35,
      postImageSheet: v36,
      deletePostConfirmed: v37,
      loadMyPosts: v38,
      refreshSocialDetail: v39,
      switchIntegralTab: v40,
      loadPrizes: v41
    } = v1.profile;
    const {
      AUTO: v42,
      BATT_PER_RANGE: v43,
      BATT_RANGES: v44,
      NOTIFY_CACHE: v45,
      NOTIFY_GROUPS: v46,
      battHistoryCard: v47,
      battPollTimer: v48,
      battReq: v49,
      bgEntryRow: v50,
      bgNotifySheet: v51,
      notifyHistorySheet: v52,
      bgStatus: v53,
      bgStatusSheet: v54,
      bgTaskSheet: v55,
      bgVerdict: v56,
      checkAppManual: v57,
      checkPageManual: v58,
      idRow: v59,
      idSub: v60,
      loadBattHistory: v61,
      notifyGroups: v62,
      openBattHistory: v63,
      panelBanner: v64,
      pushAuto: v65,
      readAuto: v66,
      refreshBgAfterAction: v67,
      renderBattSheet: v68,
      restartPanel: v69,
      setNotifyGroup: v70,
      svip: v71,
      svipDecor: v72,
      svipSheet: v73,
      svipTop: v74,
      updateChip: v75,
      updateStatus: v76
    } = v1.shell;
    const {
      debugSheet: v77,
      capPoll: v78,
      capMaybeOffer: v79,
      settingsTitle: v80,
      accountsSheet: v81,
      accountDetailSheet: v82,
      accountModeSheet: v83,
      openCredentialEditor: v84,
      credentialOptions: v85,
      setCredentialMethod: v86,
      login: v87,
      CAP: v88,
      fetchCaptcha: v89,
      submitLogin: v90,
      capturePageOpen: v91,
      syncCredentialDraft: v92,
      capApply: v93,
      capClipboard: v94,
      capCopy: v95,
      capDiscard: v96,
      capPasteApply: v97,
      capStartPoll: v98,
      capStopPoll: v99,
      capDiagSheet: v100,
      capDiagCopy: v101,
      capDiagClear: v102
    } = v1.auth;
    const {
      carCmdSheet: v103,
      sendCarCmd: v104,
      sendSteps: v105,
      runCmd: v106,
      bindHoldGestures: v107,
      GESTURES: v108,
      actionSheet: v109,
      authSheet: v110,
      clearMsgReadMarks: v111,
      markManyRead: v112,
      msgDetail: v113,
      msgSheet: v114,
      rawDetail: v115,
      rawSheet: v116,
      setDiagFilter: v117,
      setDiagQuery: v118,
      toggleDiagAccount: v119,
      exportDiag: v120,
      refreshMsgs: v121,
      settingSheet: v122,
      devFold: v123
    } = v1.gestures;
    const {
      open: v124,
      detail: v125,
      pick: v126,
      confirm: v127,
      clear: v128,
      refresh: v129
    } = v1.cache;
    const {
      WEDIT: v130,
      widgetCfgById: v131,
      allRows: v132,
      choiceSheet: v133,
      sliderSheet: v134,
      openValueSheet: v135,
      seatHideSheet: v136,
      daysLeft: v137,
      doWrite: v138,
      doWriteVal: v139,
      drawWidgets: v140,
      inductivePlaceholderSheet: v141,
      openVehicleInfo: v142,
      openWidgetEdit: v143,
      resetWidget: v144,
      setWidget: v145,
      tireBandSheet: v146,
      toggleSheet: v147,
      viewSettings: v148,
      fillGroupRows: v149,
      nominalSheet: v150,
      widgetGone: v151,
      widgetEventScope: v152,
      pickStatSlot: v153,
      pickStatField: v154,
      pickDefaultSize: v155,
      drawWidgetEdit: v156
    } = v1.settings;
    let v157 = 0;
    const v158 = () => ({
      gen: API.accountGen,
      accountId: window.ACC?.activeId?.() || "",
      uid: v16.profileUid || "",
      source: API.source,
      token: API.token
    });
    const v159 = v556 => !v17() && v556.gen === API.accountGen && v556.accountId === (window.ACC?.activeId?.() || "") && v556.uid === (v16.profileUid || "") && v556.source === API.source && v556.token === API.token && (!v236() || !window.ACC.active() || window.ACC.active().token === v556.token);
    const v160 = v557 => {
      const v558 = v239(v557) || (v236() ? window.ACC.active() : null);
      if (v558) {
        return window.ACC.snapshot(v558.id);
      } else {
        return null;
      }
    };
    const v161 = (v559, v560) => !v559 && !v560 || !!v559 && !!v560 && v559.id === v560.id && v559.token === v560.token && v559.uid === v560.uid && v559.credentialRev === v560.credentialRev;
    const v162 = () => ({
      gen: API.gen,
      epoch: v157,
      vin: v16.vin,
      uid: v16.profileUid || "",
      source: API.source,
      token: API.token,
      month: v16.month,
      owner: v160(v16.vin)
    });
    const v163 = v561 => !v17() && v561.gen === API.gen && v561.epoch === v157 && v561.vin === v16.vin && v561.uid === (v16.profileUid || "") && v561.source === API.source && v561.token === API.token && v161(v561.owner, v160(v16.vin));
    let v164 = 0;
    const v165 = new Map();
    const v166 = v562 => ["msg_list", "msg_unread"].includes(v562) ? "messages" : ["vehicle_home", "battery_info"].includes(v562) ? "vehicleReadings" : v562;
    function v167(v563) {
      const v564 = ++v164;
      const v565 = new Map();
      for (const v566 of v563) {
        const v567 = v166(v566);
        v165.set(v567, v564);
        v565.set(v567, v564);
      }
      return v565;
    }
    const v168 = (v568, v569) => !!v569 && v165.get(v166(v568)) === v569.get(v166(v568));
    const v169 = () => v165.get("messages") || 0;
    const v170 = v570 => Number.isFinite(Number(v570?.sampleAt)) && Number(v570.sampleAt) > 0 ? Number(v570.sampleAt) : Date.now();
    const v171 = v571 => Number.isFinite(Number(v571?.requestAt)) && Number(v571.requestAt) > 0 ? Number(v571.requestAt) : 0;
    function v172(v572, {
      full = false
    } = {}) {
      if (!v572 || v572.stale) {
        return false;
      }
      const v573 = v16.data.messages || {};
      if (v572.ok) {
        const v574 = new Map((v16.data.vehicleAlerts || []).map(v575 => [v575.vin, v575]));
        for (const v576 of v3.messages(v572).list) {
          if (v576.vin && v576.eventAt && /电池.*(?:拔出|移除|取出|断开)/.test(v576.title + " " + v576.detail) && v576.eventAt > (v574.get(v576.vin)?.at || 0)) {
            v574.set(v576.vin, {
              vin: v576.vin,
              at: v576.eventAt
            });
          }
        }
        v16.data.vehicleAlerts = [...v574.values()];
      }
      v16.data.messages = v572.ok ? {
        ...v3.messages(v572),
        list: full ? v3.messages(v572).list : v573.list || [],
        rawNoRead: v572.data?.noRead,
        sampleAt: v170(v572),
        requestAt: v171(v572)
      } : {
        ...v573,
        ok: false
      };
      return !!v572.ok;
    }
    let v173 = "";
    let v174 = null;
    const v175 = "zeeho.lastcharge.dismiss.v1";
    let v176 = {};
    let v177 = "";
    function v178() {
      const v577 = v2?.ns(v175) || v175;
      if (v577 !== v177) {
        v177 = v577;
        try {
          v176 = v2.getJson(v577, {}) || {};
        } catch {
          v176 = {};
        }
      }
    }
    function v179(v578) {
      if (v578) {
        return v578.s + "|" + v578.e;
      } else {
        return "";
      }
    }
    const v180 = new Map();
    let v181 = null;
    let v182 = 0;
    function v183() {
      if (v12()) {
        return false;
      }
      const v579 = window.ZeehoShell;
      return typeof window.CHG?.mergeNativeHistory === "function" && (window.IOSBR?.has?.("history.charge") && window.IOSBR.has("history.clear") || typeof v579?.beginChargeHistory === "function" && typeof v579?.beginClearChargeHistory === "function" && typeof v579?.pollChargeHistory === "function");
    }
    function v184(v580 = v162()) {
      return {
        vin: v580.vin,
        ownerId: v580.owner?.id || window.ACC?.activeId?.() || "single",
        ownerUid: v580.owner?.uid || v580.uid || ""
      };
    }
    function v185(v581) {
      const v582 = v184(v581);
      return JSON.stringify([window.ACC?.activeId?.() || "single", v582.vin, v582.ownerId, v582.ownerUid]);
    }
    function v186() {
      v182++;
      if (v181) {
        v181.finish({
          ok: false,
          stale: true
        });
      }
      v180.clear();
      v1.mem.chargeHistoryState = null;
    }
    function v187(v583 = v162()) {
      const v584 = window.ZeehoShell;
      if (!v163(v583) || !v583.vin || v583.source === "demo" || !v583.token || v183() || typeof v584?.chargeLog !== "function") {
        return false;
      }
      const v585 = v185(v583);
      const v586 = Date.now();
      if (v586 - (v180.get(v585) || 0) < 60000) {
        return false;
      }
      try {
        const v587 = JSON.parse(v584.chargeLog() || "{}");
        if (!v163(v583) || !v587?.ok || !Array.isArray(v587.vins?.[v583.vin])) {
          return false;
        }
        window.CHG?.mergeNative?.(v583.vin, v587.vins[v583.vin]);
        v180.set(v585, v586);
        while (v180.size > 12) {
          v180.delete(v180.keys().next().value);
        }
        return true;
      } catch {
        return false;
      }
    }
    function v188({
      force = false,
      clear = false,
      frame = 0
    } = {}) {
      if (window.IOSBR?.available?.()) {
        return v339({
          force: force,
          clear: clear,
          frame: frame
        });
      }
      const v588 = v162();
      if (!v183() || !v588.vin || !v588.token || v588.source === "demo") {
        return Promise.resolve({
          ok: false,
          unavailable: true
        });
      }
      const v589 = v185(v588);
      const v590 = Date.now();
      if (v181) {
        if (v163(v181.scope) && v181.key === v589 && !clear) {
          v181.refreshAgain = v181.refreshAgain || force;
          return v181.promise;
        }
        if (v163(v181.scope) && v181.op === "clear") {
          return v181.promise;
        }
        v181.finish({
          ok: false,
          stale: true
        });
      }
      if (!clear && !force && v590 - (v180.get(v589) || 0) < 60000) {
        return Promise.resolve({
          ok: true,
          cached: true
        });
      }
      const v591 = clear ? ++v182 : v182;
      const v592 = frame || v341();
      if (v592 && typeof v592.then === "function") {
        return v592.then(v601 => {
          if (v591 !== v182 || !v163(v588) || !Number.isSafeInteger(Number(v601)) || Number(v601) <= 0) {
            return {
              ok: false,
              stale: true
            };
          }
          return v188({
            force: force,
            clear: clear,
            frame: Number(v601)
          });
        }).catch(() => ({
          ok: false,
          stale: true
        }));
      }
      const v593 = Number(v592);
      if (!v163(v588) || !Number.isSafeInteger(v593) || v593 <= 0) {
        return Promise.resolve({
          ok: false,
          stale: true
        });
      }
      const v594 = v184(v588);
      let v595;
      const v596 = {
        scope: v588,
        key: v589,
        op: clear ? "clear" : "read",
        timer: 0,
        done: false,
        refreshAgain: false,
        promise: new Promise(v602 => {
          v595 = v602;
        })
      };
      const v597 = {
        vin: v588.vin,
        pending: true,
        clearing: clear,
        error: "",
        updatedAt: 0
      };
      v1.mem.chargeHistoryState = v597;
      v181 = v596;
      v596.finish = v603 => {
        if (v596.done) {
          return;
        }
        v596.done = true;
        clearTimeout(v596.timer);
        const v604 = v181 === v596;
        if (v604) {
          v181 = null;
        }
        if (v604 && v163(v588)) {
          v597.pending = false;
          v597.clearing = false;
          if (!v603.stale) {
            v597.error = v603.message || "";
            if (v603.ok) {
              v180.set(v589, v603.mirrored === false ? 0 : Date.now());
              while (v180.size > 12) {
                v180.delete(v180.keys().next().value);
              }
              v597.updatedAt = Date.now();
              v477 = null;
              v500({
                keepScroll: true
              });
            }
            v1.chg.refreshHistory?.();
          }
        }
        v595(v603);
        if (v604 && v163(v588) && !v603.stale && v596.refreshAgain && !clear) {
          v188({
            force: true
          });
        }
      };
      let v598 = "";
      try {
        const v605 = JSON.stringify({
          ...v594,
          sessionId: v593
        });
        v598 = clear ? window.ZeehoShell.beginClearChargeHistory(v605) : window.ZeehoShell.beginChargeHistory(v605);
      } catch {}
      if (typeof v598 !== "string" || !v598) {
        v596.finish({
          ok: false,
          message: clear ? "记录未能清除，请重试。" : "后台充电记录暂不可用，请稍后重试。"
        });
        return v596.promise;
      }
      const v599 = v590 + 20000;
      const v600 = async () => {
        if (v596.done) {
          return;
        }
        if (!v163(v588)) {
          v596.finish({
            ok: false,
            stale: true
          });
          return;
        }
        let v606 = null;
        try {
          v606 = JSON.parse(window.ZeehoShell.pollChargeHistory(v598) || "{}");
        } catch {}
        if (v606?.done) {
          let v607 = null;
          try {
            v607 = JSON.parse(v606.json || "{}");
          } catch {}
          if (v606.ok !== true || v607?.ok !== true || v607.vin !== v594.vin || v607.ownerId !== v594.ownerId || v607.ownerUid !== v594.ownerUid) {
            v596.finish({
              ok: false,
              message: clear ? "清理结果尚未确认，请刷新后重试。" : "后台充电记录读取失败，请稍后重试。"
            });
            return;
          }
          const v608 = window.CHG.mergeNativeHistory(v588.vin, v607, v594.ownerId, v594.ownerUid, true);
          const v609 = (v608 && typeof v608.then === "function" ? await v608 : v608) === true;
          const v610 = () => !v596.done && v181 === v596 && v163(v588);
          if (!v610()) {
            v596.finish({
              ok: false,
              stale: true
            });
            return;
          }
          let v611 = "";
          if (v609 && !clear && v1.chargeRecovery?.recover && window.CHG.mergeRecoveredNativeHistory) {
            v477 = null;
            v500({
              keepScroll: true
            });
            v1.chg.refreshHistory?.();
            try {
              const v612 = await v1.chargeRecovery.recover(v607, {
                scope: v588,
                ownerId: v594.ownerId,
                ownerUid: v594.ownerUid,
                isCurrent: v610
              });
              if (!v610() || v612.cancelled) {
                v596.finish({
                  ok: false,
                  stale: true
                });
                return;
              }
              if (v612.candidates.length) {
                const v613 = await window.CHG.mergeRecoveredNativeHistory(v588.vin, v607, v612.candidates, v594.ownerId, v594.ownerUid, true);
                if (!v610()) {
                  v596.finish({
                    ok: false,
                    stale: true
                  });
                  return;
                }
                if (v613 !== true) {
                  v611 = "完整记录暂未保存，已保留现有记录。";
                }
              }
              if (!v611 && v612.counts.retained > 0) {
                v611 = "部分记录未能完整恢复，已有记录仍保留。";
              }
            } catch {
              v611 = "完整记录暂不可用，已保留现有记录。";
            }
          }
          if (!v610()) {
            v596.finish({
              ok: false,
              stale: true
            });
            return;
          }
          if (v609 && !clear) {
            try {
              for (const v614 of window.CHG.history(v588.vin, {
                includeHidden: true
              })) {
                if (window.CHG.healthOf?.(v614)) {
                  window.CAPBOOK?.record(v588.vin, v614);
                }
              }
            } catch {}
          }
          v596.finish({
            ok: clear || v609,
            mirrored: v609,
            message: v609 ? v611 : clear ? "原生记录已清空，页面正在重试同步。" : "后台记录已读取，页面保存失败，请重试。"
          });
          if (clear && !v609 && v163(v588)) {
            v188({
              force: true
            });
          }
          return;
        }
        if (Date.now() >= v599) {
          v596.finish({
            ok: false,
            message: clear ? "清理尚未收到回执，请先刷新记录再重试。" : "后台记录读取超时，请重试。"
          });
          return;
        }
        v596.timer = setTimeout(v600, 100);
      };
      v596.timer = setTimeout(v600, 100);
      v1.chg.refreshHistory?.();
      return v596.promise;
    }
    async function v189() {
      const v615 = v162();
      v1.shell.clearBattOcv?.(v615.vin);
      if (v190 && v163(v190)) {
        let v618 = false;
        try {
          v618 = (await window.CAPBOOK?.clear?.(v615.vin)) === true;
        } catch {}
        if (v618) {
          v190 = null;
        }
        return {
          ok: true,
          mirrored: true,
          capSaved: v618,
          message: v618 ? "" : "充电历史已清、标定台账清理未确认"
        };
      }
      const v616 = v183() ? await v188({
        force: true,
        clear: true
      }) : {
        ok: (await window.CHG?.clear(v615.vin)) === true,
        mirrored: true
      };
      if (!v616.ok || !v163(v615)) {
        return v616;
      }
      let v617 = false;
      try {
        v617 = (await window.CAPBOOK?.clear?.(v615.vin)) === true;
      } catch {}
      if (v617) {
        v190 = null;
      } else {
        v190 = v615;
      }
      if (v617) {
        return {
          ...v616,
          capSaved: true
        };
      } else {
        return {
          ...v616,
          capSaved: false,
          message: "充电历史已清、标定台账清理未确认"
        };
      }
    }
    let v190 = null;
    const v191 = v5.presets;
    let v192 = null;
    const v193 = "art/";
    const v194 = "zeeho.artmiss";
    function v195(v619) {
      try {
        return (sessionStorage.getItem(v194) || "").split(",").includes(v619);
      } catch {
        return false;
      }
    }
    function v196(v620) {
      try {
        const v621 = (sessionStorage.getItem(v194) || "").split(",").filter(Boolean);
        if (!v621.includes(v620)) {
          v621.push(v620);
          sessionStorage.setItem(v194, v621.slice(-20).join(","));
        }
      } catch {}
    }
    function v197(v622) {
      const v623 = String(v622 || "").trim().toUpperCase();
      if (!/^[A-Z0-9]{7,32}$/.test(v623)) {
        return "";
      }
      if (v195(v623)) {
        return "";
      }
      return "" + v193 + encodeURIComponent(v623);
    }
    window.__zeehoPicError = function (v624, v625, v626) {
      if (!v624?.parentNode) {
        return;
      }
      const v627 = v624.dataset.art || "";
      if (v627 && v624.dataset.artExt !== "png") {
        v624.dataset.artExt = "png";
        v624.src = v627 + ".png";
        return;
      }
      if (v627) {
        v196(String(v624.dataset.artVin || v627.split("/").pop() || "").toUpperCase());
      }
      if (v624.dataset.fb) {
        v624.src = v624.dataset.fb;
        v624.removeAttribute("data-fb");
        return;
      }
      if (v624.dataset.icon) {
        v624.outerHTML = window.UI.icon("bike", 18);
        return;
      }
      const v628 = v624.parentNode;
      v624.outerHTML = window.UI.fallbackScooter(v625 === "true" || v625 === true, Number(v626) || 0);
      v1.inductiveUi?.bindHero(v628);
    };
    function v198() {
      return !v12() && (!!window.ZeehoShell || window.IOSBR?.available?.() === true);
    }
    function v199() {
      return v14();
    }
    let v200 = false;
    function v201() {
      if (v200) {
        return;
      }
      v200 = true;
      if (v12()) {
        return;
      }
      try {
        const v629 = window.ZeehoShell;
        if (typeof v629?.pageReadyV2 === "function") {
          if (v19) {
            v629.pageReadyV2(JSON.stringify({
              navigationId: v19,
              url: location.href,
              build: (document.querySelector("meta[name=build]")?.content || "").trim()
            }));
          }
        } else {
          v629?.pageReady?.();
        }
        v309();
      } catch {}
      try {
        window.__zeehoLoadFonts?.();
      } catch {}
      v1.syncNearbyScan?.();
    }
    function v202() {
      return window.PLATFORM?.host === "ios";
    }
    function v203() {
      if (v198()) {
        return true;
      }
      if (navigator.standalone === true) {
        return true;
      }
      return ["standalone", "fullscreen", "minimal-ui"].some(v630 => matchMedia("(display-mode: " + v630 + ")").matches);
    }
    let v204 = null;
    function v205() {
      if (v204 !== null) {
        return;
      }
      if (typeof v1 === "undefined" || !v1?.shell?.ios?.refreshInfo) {
        return;
      }
      v204 = setTimeout(() => {
        v204 = null;
        try {
          Promise.resolve(v1.shell?.ios?.refreshInfo?.()).then(() => {
            if (window.IOSBR?.available?.()) {
              v206(false);
            }
          }, () => {});
        } catch {}
      }, 200);
    }
    function v206(v631) {
      const v632 = document.documentElement;
      v632.style.setProperty("--tabbar-gap-scale", v202() ? ".5" : v198() ? ".375" : "1");
      v632.style.setProperty("--tabbar-lift", window.ZeehoShell ? "6px" : "0px");
      if (window.IOSBR?.available?.()) {
        if (v631 !== false) {
          v205();
        }
        const v645 = v1.shell?.ios?.info?.()?.safeArea;
        const v646 = v651 => typeof v651 === "number" && v651 > 0 ? v651 : null;
        const v647 = v646(v645?.top);
        const v648 = v646(v645?.bottom);
        const v649 = v646(v645?.left);
        const v650 = v646(v645?.right);
        v632.style.setProperty("--sat", v647 === null ? "var(--sat-raw)" : v647 + "px");
        v632.style.setProperty("--sab", v648 === null ? "var(--sab-raw)" : v648 + "px");
        v632.style.setProperty("--sal", v649 === null ? "var(--sal-raw)" : v649 + "px");
        v632.style.setProperty("--sar", v650 === null ? "var(--sar-raw)" : v650 + "px");
        v632.style.minHeight = "";
        if (document.body) {
          document.body.style.minHeight = "";
        }
        v211(v647 ?? 0, v648 ?? 0);
        return;
      }
      if (v198()) {
        let v652 = null;
        try {
          v652 = JSON.parse(window.ZeehoShell.insets() || "{}");
        } catch {}
        if (v652 && (typeof v652.top === "number" || typeof v652.bottom === "number")) {
          const v653 = Math.max(0, Number(v652.top) || 0);
          const v654 = Math.max(0, Number(v652.bottom) || 0);
          v632.style.setProperty("--sat", v653 + "px");
          v632.style.setProperty("--sab", v654 + "px");
          if (v632.style.minHeight !== "") {
            v632.style.minHeight = "";
          }
          if (document.body && document.body.style.minHeight !== "") {
            document.body.style.minHeight = "";
          }
          v211(v653, v654);
          return;
        }
      }
      const v633 = v203();
      const v634 = Math.round(window.screen && window.screen.height || 0);
      const v635 = v633 && v634 > 0 ? v634 + "px" : "";
      if (v632.style.minHeight !== v635) {
        v632.style.minHeight = v635;
      }
      if (document.body && document.body.style.minHeight !== v635) {
        document.body.style.minHeight = v635;
      }
      const v636 = window.visualViewport;
      const v637 = Math.round(Math.max(v636 ? v636.height : 0, window.innerHeight || 0));
      const v638 = getComputedStyle(v632);
      const v639 = Math.round(parseFloat(v638.getPropertyValue("--sat-raw")) || 0);
      const v640 = Math.round(parseFloat(v638.getPropertyValue("--sab-raw")) || 0);
      const v641 = v634 > 0 ? v634 - v637 : 0;
      const v642 = v634 > 0 && v641 <= 2;
      const v643 = v634 > 0 && v639 > 0 && Math.abs(v641 - v639) <= 8;
      const v644 = v633 || v642 || v643;
      v632.style.setProperty("--sat", v633 ? "var(--sat-raw)" : v644 ? v639 + "px" : "0px");
      v632.style.setProperty("--sab", v633 ? "var(--sab-raw)" : v644 ? v640 + "px" : "0px");
      v211(v644 ? v639 : 0, v644 ? v640 : 0);
    }
    let v207 = null;
    let v208 = 0;
    let v209 = 0;
    const v210 = new Set();
    function v211(v655, v656) {
      const v657 = v655 + "/" + v656;
      if (v207 !== null && v207 !== v657 && !document.hidden && !v208) {
        v208 = requestAnimationFrame(() => {
          v208 = 0;
          if (!document.hidden) {
            v361();
          }
        });
      }
      v207 = v657;
    }
    window.addEventListener("resize", v206);
    window.addEventListener("orientationchange", v206);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", v206);
    }
    const v212 = () => {
      if (document.hidden) {
        return;
      }
      if (v208) {
        cancelAnimationFrame(v208);
      }
      v208 = 0;
      v361();
      v369(false);
      v4.fitText(v10());
      v4.fitText(document.querySelector(".sheet.show"));
    };
    window.addEventListener("resize", v212);
    window.addEventListener("orientationchange", v212);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", v212);
    }
    document.fonts?.ready?.then(v212);
    function v213() {
      if (v208) {
        cancelAnimationFrame(v208);
      }
      if (v209) {
        cancelAnimationFrame(v209);
      }
      v208 = v209 = 0;
      for (const v658 of v210) {
        clearTimeout(v658);
      }
      v210.clear();
    }
    function v214() {
      v206();
      v212();
    }
    function v215() {
      v213();
      if (document.hidden) {
        return;
      }
      v214();
      if (v198() || !v203()) {
        return;
      }
      v209 = requestAnimationFrame(() => {
        v209 = 0;
        if (!document.hidden) {
          v214();
        }
      });
      for (const v659 of [100, 350, 1000]) {
        const v660 = setTimeout(() => {
          v210.delete(v660);
          if (!document.hidden) {
            v214();
          }
        }, v659);
        v210.add(v660);
      }
    }
    v215();
    if (v202()) {
      for (const v661 of ["gesturestart", "gesturechange", "gestureend"]) {
        document.addEventListener(v661, v662 => v662.preventDefault(), {
          passive: false
        });
      }
      document.addEventListener("touchmove", v663 => {
        if (v663.touches.length > 1) {
          v663.preventDefault();
        }
      }, {
        passive: false
      });
      document.addEventListener("dblclick", v664 => v664.preventDefault(), {
        passive: false
      });
    }
    const v216 = v665 => !!v665?.closest?.("input, textarea, .code, .selectable");
    document.addEventListener("contextmenu", v666 => {
      if (v216(v666.target)) {
        return;
      }
      v666.preventDefault();
    });
    document.addEventListener("dragstart", v667 => {
      if (!v216(v667.target) && v667.target?.tagName !== "INPUT") {
        v667.preventDefault();
      }
    });
    const v217 = (document.querySelector("meta[name=build]")?.content || "").trim();
    const v218 = v668 => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(v668);
    let v219 = 0;
    async function v220() {
      if (v12()) {
        return;
      }
      if (v17()) {
        return;
      }
      if (v198()) {
        return;
      }
      if (!v218(v217)) {
        return;
      }
      if (Date.now() - v219 < 5000) {
        return;
      }
      v219 = Date.now();
      try {
        const v669 = await fetch("version.json?t=" + Date.now(), {
          cache: "no-store"
        });
        if (!v669.ok) {
          return;
        }
        const v670 = await v669.json();
        if (v17()) {
          return;
        }
        const v671 = v670 && v670.build;
        if (!v218(v671) || v671 === v217) {
          return;
        }
        if (sessionStorage.getItem("zeeho.build") === v671) {
          return;
        }
        sessionStorage.setItem("zeeho.build", v671);
        const v672 = new URL(location.href);
        v672.searchParams.set("b", String(Date.now()));
        location.replace(v672.toString());
      } catch {}
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        v213();
        return;
      }
      v215();
      v220();
    });
    window.addEventListener("pageshow", () => {
      v215();
      v220();
    });
    const v221 = v673 => {
      const v674 = typeof v673 === "string" ? v673.trim() : "";
      if (v674 && !["__proto__", "prototype", "constructor"].includes(v674)) {
        return v674;
      } else {
        return "";
      }
    };
    const v222 = ["off", "status", "cushion", "all"];
    function v223(v675) {
      const v676 = Object.create(null);
      if (!v675 || typeof v675 !== "object" || Array.isArray(v675)) {
        return v676;
      }
      for (const [v677, v678] of Object.entries(v675)) {
        const v679 = v221(v677);
        if (!v679) {
          continue;
        }
        if (v678 === true) {
          v676[v679] = "all";
        } else if (v222.includes(v678) && v678 !== "off") {
          v676[v679] = v678;
        }
      }
      return v676;
    }
    function v224(v680 = v16.vin) {
      const v681 = v221(v680);
      const v682 = v16.hideSeatStatusVins;
      if (!v681 || !Object.prototype.hasOwnProperty.call(v682 || {}, v681)) {
        return "off";
      }
      const v683 = v682[v681];
      if (v683 === true) {
        return "all";
      }
      if (v222.includes(v683)) {
        return v683;
      } else {
        return "off";
      }
    }
    const v225 = (v684 = v16.vin) => ["status", "all"].includes(v224(v684));
    const v226 = (v685 = v16.vin) => ["cushion", "all"].includes(v224(v685));
    async function v227(v686, v687) {
      const v688 = v221(v686);
      if (!v688 || v688 !== v221(v16.vin) || !v222.includes(v687)) {
        return false;
      }
      const v689 = v687;
      v16.hideSeatStatusVins = v223(v16.hideSeatStatusVins);
      if (v689 === "off") {
        delete v16.hideSeatStatusVins[v688];
      } else {
        v16.hideSeatStatusVins[v688] = v689;
      }
      if (!(await v232())) {
        return false;
      }
      v341();
      v500({
        keepScroll: true
      });
      if (v441) {
        v451();
      }
      v1.settings.refreshWidgetSheets();
      return true;
    }
    function v228() {
      if (v17()) {
        return;
      }
      let v690 = {};
      try {
        v690 = v12() || v2.requiresAsync?.() ? v2.getJson("zeeho.dash", {}) : JSON.parse(localStorage.getItem("zeeho.dash") || "{}");
        if (!v690 || typeof v690 !== "object" || Array.isArray(v690)) {
          v690 = {};
        }
        if (v2?.isNative?.()) {
          const v693 = v2.getJson("zeeho.session.v1");
          if (v2.get("zeeho.session.cleared.v1") === "1") {
            for (const v694 of ["vin", "vehicles", "vehiclesSrc", "profileUid", "authPromptedFor", "bindingUid"]) {
              delete v690[v694];
            }
          }
          if (v693 && typeof v693 === "object") {
            v690 = {
              ...v690,
              ...v693
            };
          }
        }
        Object.assign(v16, {
          theme: v690.theme,
          accent: v690.accent,
          accentV: v690.accentV,
          pollMs: v690.pollMs,
          vin: v690.vin,
          customColors: v690.customColors,
          systemColors: v690.systemColors,
          profileUid: v690.profileUid,
          themeV: v690.themeV,
          voltView: v690.voltView,
          battRange: v690.battRange,
          rideGrid2: v690.rideGrid2,
          tireBands: v690.tireBands,
          authPromptedFor: v690.authPromptedFor,
          gpsSpeed: v690.gpsSpeed === true,
          gpsOver50: v690.gpsOver50 === true
        });
      } catch {}
      v434();
      v432();
      Object.assign(v16, v1.inductiveUi?.normalizeRanges?.(v690));
      if (!(v690.rangeV >= 2)) {
        if (v16.twinSpeedMax === 80) {
          v16.twinSpeedMax = 100;
        }
        v16.twinPowerMax = 6000;
        v16.twinRegenMin = -1500;
      }
      v16.rangeV = 2;
      v16.hideSeatStatusVins = v223(v690.hideSeatStatusVins);
      if (!v16.themeV || v16.themeV < 2) {
        v16.theme = "system";
        v16.themeV = 2;
      }
      if (!v16.accentV || v16.accentV < 2) {
        v16.accent = "purple";
      }
      v16.accentV = 2;
      if (v16.theme !== "light" && v16.theme !== "dark") {
        v16.theme = "system";
      }
      Object.assign(v16, v5.normalize({
        ...v16,
        themeV: v16.themeV
      }));
      if (v16.pollMs === undefined || v16.pollMs === null) {
        v16.pollMs = 30000;
      }
      v16.tab = "home";
      v16.openGroups = {};
      if (!["24h", "3d", "7d", "30d"].includes(v16.battRange)) {
        v16.battRange = "24h";
      }
      v173 = v690.vehiclesSrc || "";
      if (Array.isArray(v690.vehicles)) {
        v16.vehicles = v690.vehicles.filter(v695 => v695 && typeof v695.vin === "string" && v695.vin).map(({
          raw: v696,
          ...v697
        }) => v697);
      }
      if (!v16.vin && v16.vehicles.length) {
        v16.vin = v16.vehicles[0].vin;
      }
      if (v2?.canCommit?.() || v2?.canCommitAsync?.()) {
        v16.legacyIdentity = {
          profileUid: String(v690.profileUid || ""),
          vin: String(v690.vin || ""),
          vehicles: Array.isArray(v690.vehicles) ? v690.vehicles : [],
          bindingUid: String(v690.bindingUid || "")
        };
      }
      if (!v16.profileUid) {
        v16.profileUid = "";
      }
      if (!v16.authPromptedFor) {
        v16.authPromptedFor = "";
      }
      const v691 = v690.voltView;
      if (v691 === "volt" || v691 === "range" || v691 === "dot") {
        v16.voltView = v691;
      } else if (v690.showVolt === false) {
        v16.voltView = "dot";
      } else {
        v16.voltView = "volt";
      }
      if (v16.rideGrid2 !== true && v16.rideGrid2 !== false) {
        v16.rideGrid2 = false;
      }
      const v692 = v690.tireLo !== undefined || v690.tireHi !== undefined ? {
        front: {
          lo: v690.tireLo,
          hi: v690.tireHi
        },
        rear: {
          lo: v690.tireLo,
          hi: v690.tireHi
        }
      } : null;
      v16.tireBands = v3.normalizeBands(v16.tireBands || v692 || {});
    }
    let v229 = Promise.resolve(true);
    let v230 = 0;
    function v231(v698, v699) {
      const v700 = v158();
      const v701 = window.ACC?.active?.();
      const v702 = v701 && v233 === v701.id && API.token === v701.token ? {
        vin: v241(v701, v16.vin) ? v16.vin : undefined,
        vehicles: v237() ? v701.vehicles : v698.vehicles,
        uid: v698.profileUid,
        bindingUid: v241(v701, v16.vin) ? v16.uid : "",
        authPromptedFor: v698.authPromptedFor,
        aggregateVin: v237() ? v16.vin : undefined
      } : null;
      const v703 = async () => {
        if (!v18() || !v159(v700)) {
          return false;
        }
        if (v701 && (!v702 || !(await window.ACC.scratch(v702, {
          async: true
        })))) {
          return false;
        }
        if (!v18() || !v159(v700)) {
          return false;
        }
        const v705 = {
          "zeeho.dash": JSON.stringify(v699)
        };
        if (!v701) {
          v705["zeeho.session.v1"] = JSON.stringify(v698);
        }
        const v706 = await v2.commitAsync({
          puts: v705
        });
        return v706 === true && v159(v700);
      };
      const v704 = v229.then(v703, v703).catch(() => false);
      v229 = v704;
      v704.then(v707 => {
        if (!v707 && !document.hidden && v159(v700) && Date.now() - v230 > 3000) {
          v230 = Date.now();
          v4.toast(v9(), "偏好未能保存，请重试");
        }
      });
      return v704;
    }
    const v232 = ({
      passive = false
    } = {}) => {
      if (!v18()) {
        return false;
      }
      if (v12()) {
        return v2.setJson("zeeho.dash", {
          theme: v16.theme,
          accent: v16.accent,
          accentV: 2,
          themeV: 2,
          pollMs: v16.pollMs,
          customColors: v16.customColors,
          systemColors: v16.systemColors,
          battRange: v16.battRange,
          voltView: v16.voltView,
          tireBands: v16.tireBands,
          rideGrid2: v16.rideGrid2,
          gpsSpeed: v16.gpsSpeed === true,
          gpsOver50: v16.gpsOver50 === true,
          rangeV: 2,
          ...v1.inductiveUi?.normalizeRanges?.(v16),
          hideSeatStatusVins: v223(v16.hideSeatStatusVins)
        });
      }
      const v708 = API.ready ? API.source === "demo" ? "demo" : "real" : v173;
      const v709 = {
        vin: v16.vin,
        vehicles: v16.vehicles.map(({
          raw: v712,
          ...v713
        }) => v713),
        vehiclesSrc: v708,
        profileUid: String(v16.profileUid || ""),
        authPromptedFor: v16.authPromptedFor || ""
      };
      if (v2.requiresAsync?.()) {
        return v231(v709, {
          theme: v16.theme,
          accent: v16.accent,
          accentV: 2,
          pollMs: v16.pollMs,
          customColors: v16.customColors,
          systemColors: v16.systemColors,
          battRange: v16.battRange,
          themeV: 2,
          voltView: v16.voltView,
          tireBands: v16.tireBands,
          rideGrid2: v16.rideGrid2,
          gpsSpeed: v16.gpsSpeed === true,
          gpsOver50: v16.gpsOver50 === true,
          rangeV: 2,
          ...v1.inductiveUi?.normalizeRanges?.(v16),
          hideSeatStatusVins: v223(v16.hideSeatStatusVins)
        });
      }
      let v710 = !v2?.isNative?.();
      if (v236()) {
        const v714 = window.ACC.active();
        const v715 = v237() ? v714?.vehicles : v16.vehicles;
        const v716 = v241(v714, v16.vin);
        const v717 = v714 && v233 === v714.id && API.token === v714.token ? window.ACC.scratch({
          vin: v716 ? v16.vin : undefined,
          vehicles: v715,
          uid: v16.profileUid,
          bindingUid: v716 ? v16.uid : "",
          authPromptedFor: v16.authPromptedFor,
          aggregateVin: v237() ? v16.vin : undefined
        }, {
          async: passive
        }) : null;
        v710 = !v714 || v717 && typeof v717.then !== "function" && !!v717;
      } else if (v2?.isNative?.() && !v2.error()) {
        if (passive && v2.canCommitAsync?.()) {
          v2.commitAsync({
            puts: {
              "zeeho.session.v1": JSON.stringify(v709)
            }
          });
        } else {
          v710 = v2.setJson("zeeho.session.v1", v709);
        }
      }
      const v711 = {
        theme: v16.theme,
        accent: v16.accent,
        accentV: 2,
        pollMs: v16.pollMs,
        customColors: v16.customColors,
        systemColors: v16.systemColors,
        battRange: v16.battRange,
        themeV: 2,
        voltView: v16.voltView,
        tireBands: v16.tireBands,
        rideGrid2: v16.rideGrid2,
        gpsSpeed: v16.gpsSpeed === true,
        gpsOver50: v16.gpsOver50 === true,
        rangeV: 2,
        ...v1.inductiveUi?.normalizeRanges?.(v16),
        hideSeatStatusVins: v223(v16.hideSeatStatusVins)
      };
      try {
        if (!v2?.isNative?.()) {
          Object.assign(v711, v709);
        } else if (!v710) {
          const v718 = JSON.parse(localStorage.getItem("zeeho.dash") || "{}");
          for (const v719 of ["vin", "vehicles", "vehiclesSrc", "profileUid", "authPromptedFor"]) {
            if (Object.prototype.hasOwnProperty.call(v718, v719)) {
              v711[v719] = v718[v719];
            }
          }
        }
        localStorage.setItem("zeeho.dash", JSON.stringify(v711));
        v1.domainMigration?.refreshBaseline?.();
      } catch {
        if (!v2?.isNative?.()) {
          return false;
        }
      }
      return v710;
    };
    let v233 = "";
    let v234 = 0;
    let v235 = 0;
    const v236 = () => !!window.ACC?.avail?.() && !!window.ACC.ready?.();
    const v237 = () => v236() && window.ACC.mode() === "aggregate";
    function v238() {
      return window.ACC.mergedVehicles().map(({
        ownerAcc: v720,
        ownerLabel: v721,
        isOwner: v722,
        ...v723
      }) => v723);
    }
    function v239(v724) {
      const v725 = !v724 ? v16.vin : v724;
      if (!v237() || !v725) {
        return null;
      }
      return window.ACC.ownerOfVin(v725);
    }
    function v240(v726) {
      const v727 = v239(v726);
      if (v727 && v727.id !== v233) {
        return v727.token;
      } else {
        return "";
      }
    }
    function v241(v728, v729) {
      if (!v728) {
        return false;
      }
      if (!v237() || !v729) {
        return true;
      }
      return window.ACC.ownerOfVin(v729)?.id === v728.id;
    }
    async function v242(v730, v731) {
      const v732 = v731 ? window.ACC.current(v731) ? window.ACC.byId(v731.id) : null : window.ACC.ownerOfVin(v730);
      if (!v732 || window.ACC.ownerOfVin(v730)?.id !== v732.id || v732.id === v233) {
        return false;
      }
      if (v732.invalidAt) {
        return false;
      }
      if (!(await window.ACC.markInvalid(v732.id, "token 已失效"))) {
        return false;
      }
      v4.toast(v9(), window.ACC.labelOf(v732) + " 的登录已失效，车辆数据可能不完整", 3600);
      return true;
    }
    function v243(v733) {
      if (!v236()) {
        return;
      }
      const v734 = window.ACC.active();
      const v735 = !v233;
      v233 = v734?.id || "";
      v16.profileUid = v734?.uid || "";
      v16.authPromptedFor = v734?.authPromptedFor || "";
      if (v733 === "real") {
        if (v237()) {
          v16.vehicles = v238();
          if (v735 && window.ACC.aggregateVin()) {
            v16.vin = window.ACC.aggregateVin();
          }
          if (!v16.vehicles.some(v736 => v736.vin === v16.vin)) {
            v16.vin = v16.vehicles[0]?.vin || "";
          }
        } else {
          v16.vehicles = v734?.vehicles || [];
          v16.vin = v734?.vin && v16.vehicles.some(v737 => v737.vin === v734.vin) ? v734.vin : v16.vehicles[0]?.vin || "";
        }
      }
      v16.uid = v241(v734, v16.vin) ? v734?.bindingUid || "" : "";
    }
    async function v244(v738, {
      vin: v739,
      force = false,
      quiet = false,
      outgoing = true
    } = {}) {
      if (v17() || !v236()) {
        return false;
      }
      const v740 = window.ACC;
      const v741 = v740.byId(v738);
      if (!v741) {
        return false;
      }
      const v742 = v237();
      const v743 = v742 ? v238() : v741.vehicles;
      const v744 = v739 !== undefined ? String(v739 || "") : v742 ? v16.vin : v741.vin;
      if (v739 !== undefined && v744 && !v743.some(v751 => v751.vin === v744)) {
        return false;
      }
      const v745 = v743.some(v752 => v752.vin === v744) ? v744 : v743[0]?.vin || "";
      const v746 = v233 === v738 && API.token === v741.token && v16.profileUid === v741.uid && v16.vin === v745;
      if (v746 && !force) {
        return true;
      }
      if (outgoing && v233 === v740.activeId() && v233 !== v738) {
        v257(true);
        if (!(await v232())) {
          v4.toast(v9(), "当前账号未能保存，暂未切换。");
          return false;
        }
      }
      if (!(await v740.setActive(v738))) {
        v4.toast(v9(), "账号未能保存，暂未切换。");
        return false;
      }
      const v747 = v745 !== v16.vin;
      const v748 = ++v234;
      v457({
        keepIdentity: true,
        keepSnapshot: true
      });
      window.TASKS?.reset?.();
      API.saveToken(v741.token, {
        persist: false
      });
      v233 = v738;
      v16.profileUid = v741.uid || "";
      v16.uid = !v747 && v741.vin === v745 && v241(v741, v745) ? v741.bindingUid || "" : "";
      v16.vehicles = v742 ? v238() : v741.vehicles;
      v16.vin = v745;
      v16.noVehicle = !v16.vehicles.length;
      v16.authPromptedFor = v741.authPromptedFor || "";
      v173 = "real";
      v16.source = API.source;
      v264();
      v292();
      if (!(await v232())) {
        v4.toast(v9(), "所选车辆未能保存，请重试");
        return false;
      }
      await v341();
      if (!quiet) {
        v4.toast(v9(), "已切换到 " + v740.labelOf(v741));
      }
      v500({
        keepScroll: true
      });
      if (v4.sheetAlive(v4.currentSheet("accounts"))) {
        v81();
      }
      const v749 = API.accountGen;
      const v750 = () => !v17() && v748 === v234 && API.accountGen === v749 && v233 === v738 && API.token === v741.token && v16.profileUid === v741.uid;
      await v299();
      if (!v750()) {
        return false;
      }
      if (!API.authFailed) {
        v516();
      }
      await v293();
      if (!v750()) {
        return false;
      }
      v500({
        keepScroll: true
      });
      return true;
    }
    function v245() {
      return new Promise(v753 => {
        let v754 = false;
        let v755;
        const v756 = v757 => {
          if (!v754) {
            v754 = true;
            v753(v757);
          }
        };
        v755 = v4.sheet(v9(), {
          key: "acccredential",
          center: true,
          title: "保存登录信息",
          body: "<div class=\"field\"><button class=\"btn block\" data-accchoice=\"add\">添加新账号</button></div>\n          <div class=\"field\"><button class=\"btn tonal block\" data-accchoice=\"update\">更新当前账号</button></div>",
          onDismiss: () => v756(""),
          onMount: v758 => {
            v758.querySelectorAll("[data-accchoice]").forEach(v759 => v759.addEventListener("click", () => {
              v756(v759.dataset.accchoice);
              v4.closeSheet(v755);
            }));
          }
        });
      });
    }
    async function v246(v760, v761) {
      const v762 = v763 => {
        const v764 = String(v763?.ps0004_01_004_VO?.id || "").trim();
        if (/^\d{5,24}$/.test(v764)) {
          return v764;
        } else {
          return "";
        }
      };
      for (const v765 of ["account_uid_like", "account_uid_favorite", "account_uid_activity"]) {
        try {
          const v766 = await API.call(v765, {}, {
            token: v760,
            force: true,
            latch: false,
            isLatest: v761
          });
          const v767 = v766?.ok ? v762(v766.data) : "";
          if (v767) {
            return v767;
          }
        } catch {}
        if (v761 && !v761()) {
          return "";
        }
      }
      return "";
    }
    async function v247(v768, v769 = {}) {
      if (v12()) {
        return v15("保存登录信息");
      }
      if (!v18()) {
        return false;
      }
      const v770 = String(v768 || "").trim().replace(/^bearer\s+/i, "");
      const v771 = ++v235;
      const v772 = () => !v17() && v771 === v235 && (!v769.isLatest || v769.isLatest());
      if (!v770) {
        v4.toast(v9(), "请填写 token；移除账号请使用账号详情里的删除。");
        return false;
      }
      if (v2?.error?.() || window.ACC?.error?.()) {
        v4.toast(v9(), v2.error() || window.ACC.error(), 4000);
        return false;
      }
      const v773 = v769.verified || (await API.call("vehicle_list", {}, {
        token: v770,
        force: true,
        latch: false,
        isLatest: v772
      }));
      if (!v772() || !v18()) {
        return false;
      }
      if (!v773.ok || !Array.isArray(v773.data)) {
        if (typeof v769.onFailure === "function") {
          v769.onFailure(v773);
        } else {
          v4.toast(v9(), API.isAuthError(v773.http, v773.code, v773.message) ? "token 无效或已过期。" : v773.message || "登录信息未能验证，请重试。", 3500);
        }
        return false;
      }
      const v774 = String(v769.uid || "").trim() || (await v246(v770, v772));
      if (!v772() || !v18()) {
        return false;
      }
      if (!v236()) {
        const v782 = v770 !== API.token;
        await API.saveToken(v770);
        v16.profileUid = v774;
        v16.authPromptedFor = "";
        v457({
          keepIdentity: !v782,
          keepSnapshot: !v782
        });
        v16.vehicles = v3.vehicles(v773);
        if (!v16.vehicles.some(v784 => v784.vin === v16.vin)) {
          v16.vin = v16.vehicles[0]?.vin || "";
        }
        v173 = "real";
        v16.source = "direct";
        if (!(await v232()) || !v772()) {
          return false;
        }
        await v341();
        v769.onCommitted?.();
        v4.closeSheet();
        v500();
        const v783 = API.accountGen;
        await v299();
        if (!v772() || API.accountGen !== v783) {
          return false;
        }
        await v293();
        if (!v772() || API.accountGen !== v783) {
          return false;
        }
        if (!API.authFailed) {
          v516();
        }
        v500({
          keepScroll: true
        });
        v769.onResult?.({
          saved: true,
          initialized: true,
          accountId: "",
          active: true
        });
        return true;
      }
      const v775 = window.ACC;
      let v776 = v769.mode || "auto";
      let v777 = v775.byId(v769.targetId || v775.activeId());
      const v778 = v775.list().find(v785 => v785.token === v770 || v774 && v785.uid === v774);
      if (v776 === "auto") {
        if (v778) {
          v776 = "update";
          v777 = v778;
        } else if (!v775.count()) {
          v776 = "add";
        } else {
          v776 = await v245();
        }
      }
      if (!v776 || !v772()) {
        return false;
      }
      const v779 = v774;
      if (v776 === "add" && v778) {
        v776 = "update";
        v777 = v778;
      }
      let v780;
      if (v776 === "update") {
        if (!v777 || !v775.byId(v777.id)) {
          v4.toast(v9(), "该账号已被移除，请重新选择。");
          return false;
        }
        const v786 = v3.vehicles(v773);
        v780 = await v775.update(v777.id, {
          token: v770,
          uid: v774,
          vehicles: v786,
          vin: v786.some(v787 => v787.vin === v777.vin) ? v777.vin : v786[0]?.vin || "",
          bindingUid: v770 === v777.token ? v777.bindingUid : "",
          invalidAt: 0,
          invalidMsg: "",
          authPromptedFor: "",
          ...(v769.label ? {
            label: v769.label
          } : {})
        });
      } else {
        const v788 = await v775.addToken({
          token: v770,
          uid: v779,
          label: v769.label || ""
        }, {
          verified: v773,
          isLatest: v772
        });
        if (!v788.ok) {
          if (!v788.stale) {
            v4.toast(v9(), v788.err || "账号未能保存。");
          }
          return false;
        }
        v780 = v788.account;
      }
      if (!v780) {
        v4.toast(v9(), "账号未能保存，请检查存储后重试。");
        return false;
      }
      v769.onCommitted?.();
      v4.closeSheet();
      const v781 = v776 === "add" || v780.id === v233 || v769.activate;
      if (v781) {
        const v789 = await v244(v780.id, {
          force: true,
          outgoing: false
        });
        v769.onResult?.({
          saved: true,
          initialized: !!v789,
          accountId: v780.id,
          active: true
        });
        return v789;
      }
      v341();
      v769.onResult?.({
        saved: true,
        initialized: false,
        accountId: v780.id,
        active: false
      });
      if (v769.urlImport) {
        v523(v780.id);
      } else {
        v4.toast(v9(), "已更新 " + v775.labelOf(v780));
      }
      v500({
        keepScroll: true
      });
      return true;
    }
    async function v248() {
      if (!v18()) {
        return;
      }
      if (v236() && !(await window.ACC.clearAll())) {
        v4.toast(v9(), "账号未能清除，请重试。");
        return;
      }
      await API.saveToken("", {
        persist: !v236()
      });
      v233 = "";
      v16.profileUid = "";
      v16.authPromptedFor = "";
      v457();
      v341();
      v232();
      v4.closeSheet();
      v299().then(() => {
        v500();
        v516();
      });
      v4.toast(v9(), "已清除登录信息，回到模拟车辆。");
    }
    async function v249(v790, v791) {
      if (!v18()) {
        return false;
      }
      const v792 = String(v791 || "").trim();
      if (v236()) {
        const v794 = window.ACC.byId(v790 || v233);
        if (!v794 || !(await window.ACC.update(v794.id, {
          uid: v792
        }))) {
          return false;
        }
        if (v794.id !== v233) {
          v341();
          v500({
            keepScroll: true
          });
          return true;
        }
        return v244(v794.id, {
          force: true,
          outgoing: false,
          quiet: true
        });
      }
      const v793 = v16.profileUid;
      v16.profileUid = v792;
      if (!(await v232())) {
        v16.profileUid = v793;
        return false;
      }
      window.TASKS?.reset?.();
      v457({
        keepIdentity: true,
        keepSnapshot: true
      });
      v341();
      await Promise.all([v299(), v293()]);
      v500({
        keepScroll: true
      });
      return true;
    }
    const v250 = "zeeho.homecache.v1";
    let v251 = 0;
    let v252 = null;
    let v253 = null;
    const v254 = /^(?:encryptInfo|encryptValue|accessToken|refreshToken|authorization|token|password|passWord|wifiPassword|wifiPwd|wifiPass|wifiKey|psk|secretKey|wifiAddress|newDid|mmiWifiIp|mmiUuid|productKey|deviceName|bmsUniqueId)$/i;
    function v255(v795) {
      if (Array.isArray(v795)) {
        return v795.map(v255);
      }
      if (!v795 || typeof v795 !== "object") {
        return v795;
      }
      const v796 = Object.create(null);
      for (const [v797, v798] of Object.entries(v795)) {
        if (!v254.test(v797) && !["__proto__", "constructor", "prototype"].includes(v797)) {
          v796[v797] = v255(v798);
        }
      }
      return v796;
    }
    function v256(v799) {
      if (!v18()) {
        v799.resolve(false);
        return;
      }
      v252 = v799;
      v2.commitAsync({
        puts: {
          [v799.key]: v799.json
        }
      }).then(v800 => {
        if (v800 === true && v163(v799.scope)) {
          v251 = v799.at;
        }
        v799.resolve(v800 === true && v163(v799.scope));
      }).catch(() => v799.resolve(false)).finally(() => {
        if (v252 === v799) {
          v252 = null;
        }
        const v801 = v253;
        v253 = null;
        if (v801) {
          if (v163(v801.scope)) {
            v256(v801);
          } else {
            v801.resolve(false);
          }
        }
      });
    }
    function v257(v802 = false) {
      if (!v18()) {
        return;
      }
      if (!v16.data.home || !v16.vin || v16.dataCached || v236() && v233 !== window.ACC.activeId()) {
        return;
      }
      const v803 = Date.now();
      if (!v802 && v803 - v251 < 120000) {
        return;
      }
      const v804 = v162();
      const v805 = v2.ns(v250);
      try {
        const v806 = v255({
          v: 2,
          at: v803,
          src: API.source,
          vin: v16.vin,
          uid: v16.uid,
          acc: window.ACC?.activeId?.() || "",
          home: v16.data.home,
          battery: v16.data.battery,
          tires: v16.data.tires,
          rideHome: v16.data.rideHome,
          rideMonth: v16.data.rideMonth,
          service: v16.data.service
        });
        if (v2.canCommitAsync?.()) {
          const v808 = JSON.stringify(v806);
          for (const v810 of [v252, v253]) {
            if (v810?.key === v805 && v810.json === v808 && v163(v810.scope)) {
              return v810.promise;
            }
          }
          const v809 = {
            key: v805,
            json: v808,
            scope: v804,
            at: v803
          };
          v809.promise = new Promise(v811 => {
            v809.resolve = v811;
          });
          if (v252) {
            if (v253) {
              v253.resolve(false);
            }
            v253 = v809;
          } else {
            v256(v809);
          }
          return v809.promise;
        }
        const v807 = v2.setJson(v805, v806);
        if (v807) {
          v251 = v803;
        }
        return v807;
      } catch {}
    }
    function v258(v812, v813 = Date.now()) {
      if (!v812) {
        return;
      }
      v812.relRefresh = v3.relTime(v812.refreshAt);
      if (v812.loc) {
        v812.loc.relTime = v3.relTime(v812.loc.time);
      }
      const v814 = v812.stale;
      if (!v814) {
        return;
      }
      const v815 = (v814.items || []).filter(v819 => Number.isFinite(Number(v819.at)) && Number(v819.at) > 0).map(v820 => ({
        ...v820,
        ageMs: Math.max(0, v813 - Number(v820.at))
      }));
      const v816 = v815.length ? v815.reduce((v821, v822) => v822.ageMs > v821.ageMs ? v822 : v821) : null;
      const v817 = Number(v816?.at ?? v814.at);
      if (!Number.isFinite(v817) || v817 <= 0) {
        v812.stale = null;
        return;
      }
      const v818 = Math.max(0, v813 - v817);
      v812.stale = {
        ...v814,
        items: v815,
        at: v817,
        ageMs: v818,
        worst: v816?.label || v814.worst,
        stale: v818 >= 1800000
      };
    }
    const v259 = v823 => !!v823 && typeof v823 === "object" && !Array.isArray(v823);
    const v260 = v824 => typeof v824 === "number" && Number.isSafeInteger(v824) && v824 > 0 && v824 <= 8640000000000000;
    function v261(v825) {
      if (!v259(v825)) {
        return false;
      }
      if (v825.freshness === undefined) {
        return true;
      }
      const v826 = v825.freshness;
      const v827 = (v828, v829) => typeof v828 === "string" && v828.length <= v829 && !!v828.trim();
      return Array.isArray(v826) && v826.length <= 64 && v826.every(v830 => v259(v830) && v827(v830.id, 128) && v827(v830.label, 128) && ["vehicle_home", "tire_monitor", "battery_info"].includes(v830.source) && ["", "missing-time", "invalid-time", "future", "missing-value"].includes(v830.reason) && (v830.at === null || v260(v830.at)));
    }
    function v262(v831) {
      if (!v261(v831) || v831.loc != null && !v259(v831.loc)) {
        return false;
      }
      const v832 = v831.stale;
      if (v832 == null) {
        return true;
      }
      return v259(v832) && v260(v832.at) && typeof v832.stale === "boolean" && Array.isArray(v832.items) && v832.items.length > 0 && v832.items.length <= 64 && v832.items.every(v833 => v259(v833) && typeof v833.identify === "string" && !!v833.identify && v833.identify.length <= 96 && typeof v833.label === "string" && !!v833.label && v833.label.length <= 128 && v260(v833.at));
    }
    function v263(v834, v835 = Date.now()) {
      const {
        home: v836,
        tires: v837
      } = v834;
      if (v836.freshness === undefined) {
        v836.freshness = (v836.stale?.items || []).map(v838 => ({
          id: "iot:" + v838.identify,
          label: v838.label,
          at: v838.at,
          reason: "",
          source: "vehicle_home"
        }));
      }
      if (v837 && v837.freshness === undefined) {
        const v839 = Array.isArray(v837.wheels) ? v837.wheels : [];
        v837.freshness = v839.slice(0, 64).filter(v840 => v259(v840) && ["前轮", "后轮"].includes(v840.pos)).map(v841 => {
          const v842 = v3.parseDeviceTime(v841.time, v835);
          const v843 = typeof v841.pressure === "number" && Number.isFinite(v841.pressure);
          const v844 = typeof v841.temp === "number" && Number.isFinite(v841.temp);
          const v845 = "" + v841.pos + (v843 && !v844 ? "胎压" : v844 && !v843 ? "胎温" : "胎压 / 胎温");
          return {
            id: "tire:" + (v841.pos === "前轮" ? "front" : "rear"),
            label: v845,
            at: v842,
            reason: !v843 && !v844 ? "missing-value" : v842 !== null ? "" : v841.time ? "invalid-time" : "missing-time",
            source: "tire_monitor"
          };
        });
      }
    }
    function v264() {
      if (v16.data.home || !v16.vin) {
        return false;
      }
      let v846 = null;
      try {
        v846 = v2.getJson(v2.ns(v250));
      } catch {
        return false;
      }
      if (!v259(v846) || v846.v !== 2 || !v262(v846.home) || !v846.vin || v846.src !== API.source || v846.vin !== v16.vin) {
        return false;
      }
      if (v846.tires != null && !v261(v846.tires) || v846.battery != null && !v261(v846.battery)) {
        return false;
      }
      if ((v846.acc || "") !== (window.ACC?.activeId?.() || "")) {
        return false;
      }
      if (!v260(v846.at) || Date.now() - v846.at > 1209600000) {
        return false;
      }
      if (v16.vehicles.length && !v16.vehicles.some(v848 => v848.vin === v16.vin)) {
        return false;
      }
      const v847 = v255(v846);
      if (JSON.stringify(v846) !== JSON.stringify(v847)) {
        try {
          v2.commitAsync({
            puts: {
              [v2.ns(v250)]: JSON.stringify(v847)
            }
          });
        } catch {}
      }
      v846 = v847;
      try {
        v263(v846);
        v258(v846.home);
      } catch {
        return false;
      }
      v16.data.home = v846.home;
      if (v846.battery) {
        v16.data.battery = v846.battery;
      }
      if (v846.uid) {
        v16.uid = v846.uid;
      }
      if (v846.tires) {
        v16.data.tires = v846.tires;
      }
      if (v846.rideHome) {
        v16.data.rideHome = v846.rideHome;
      }
      if (v846.rideMonth) {
        v16.data.rideMonth = v846.rideMonth;
      }
      if (v846.service) {
        v16.data.service = v846.service;
      }
      v16.dataCached = true;
      v16.cacheSnapshotAt = Number(v846.at);
      try {
        performance.mark("zeeho-cached-data");
      } catch {}
      return true;
    }
    function v265() {
      if (v16.theme === "light" || v16.theme === "dark") {
        return v16.theme;
      }
      if (matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      } else {
        return "dark";
      }
    }
    let v266 = "";
    let v267;
    function v268() {
      if (v17()) {
        return;
      }
      if (!v192 && v16.accent === "system") {
        const v850 = v5.readSystem();
        if (v850.available) {
          v16.systemColors = v850.colors;
        }
      }
      const v849 = JSON.stringify([v265(), v16.accent, v16.customColors, v192, v16.systemColors]);
      if (v266 && v266 !== v849) {
        document.documentElement.classList.add("theme-transition");
        clearTimeout(v267);
        v267 = setTimeout(() => document.documentElement.classList.remove("theme-transition"), 380);
      }
      v266 = v849;
      v5.apply(v192 ? {
        ...v16,
        accent: "custom",
        customColors: v192
      } : v16);
      v1.dashboardTheme?.syncMode();
      v309();
    }
    function v269() {
      if (v17()) {
        return;
      }
      if (v16.accent !== "system") {
        return;
      }
      const v851 = v5.readSystem();
      if (v851.available) {
        v16.systemColors = v851.colors;
        v232();
      }
      v268();
      if (v4.currentSheet("theme")) {
        v501();
      }
    }
    window.addEventListener("zeeho-system-colors", v269);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        v269();
      }
    });
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (v17() || v16.theme !== "system") {
        return;
      }
      v268();
      v363();
    });
    const v270 = [{
      id: "search",
      t: "寻车",
      icon: "horn",
      cmd: "search",
      ep: {
        m: "PUT/POST",
        p: "vehicleInfo/control/{vinNo} + dbpoint/send",
        note: "寻车（普通）与高声寻车，弹窗里两个都摆出来。请求形状全部来自真机抓包。"
      }
    }, {
      id: "carlock",
      t: "车辆锁",
      icon: "lock",
      cmd: "carlock",
      state: "headLock",
      homeOnly: true,
      onT: "已关锁",
      offT: "已开锁",
      ep: {
        m: "POST",
        p: "dbpoint/send + vehicleSet/network/unlock",
        note: "开锁 = ON_AND_OFF(ON) + 云解锁 lockFlag=1；关锁 = OFF + lockFlag=0。"
      }
    }, {
      id: "cushion",
      t: "打开坐垫",
      icon: "seat",
      cmd: "cushion",
      ep: {
        m: "PUT",
        p: "vehicleSet/propertyTwo/one",
        body: "{\"commond\":\"28\",\"commondParam\":\"1\",\"relatedFunctions\":null,\"vcu\":\"<VIN>\",\"version\":\"v2\"}",
        note: "2026-10-16 真机实测能开坐垫的那条。抓包里 App 并发的那条 dbpoint OPEN_CUSHION 服务端只回\"接受\"、没验过物理效果，不发。"
      }
    }, {
      id: "seatlock",
      t: "座垫锁",
      icon: "seatlock",
      state: "seatLock",
      onT: "已上锁",
      offT: "未上锁",
      ep: {
        m: "状态位",
        p: "vehicleSet/**（待抓包）",
        note: "车况字段 seatLockState：1 = 已锁。"
      }
    }, {
      id: "storage",
      t: "储物箱",
      icon: "box",
      ep: {
        m: "—",
        p: "未找到独立接口",
        note: "车况字段 openStorageBoxFlag 为 false，这台车应该是没有电控储物箱（只有座垫）。"
      }
    }, {
      id: "flash",
      t: "闪灯",
      icon: "flash",
      ep: {
        m: "云端指令",
        p: "HmModel.lightAndWhistleHigh（同族）",
        note: "与鸣笛同族的灯光指令，模块里没实测过。"
      }
    }, {
      id: "more",
      t: "更多",
      icon: "more",
      more: true
    }];
    const v271 = {
      search: {
        name: "寻车",
        confirm: "确认寻车吗？",
        steps: v852 => [v275({
          vinNo: v852.vin,
          functionCode: "LOUDLY_SEARCH_CAR",
          type: "LOW"
        }), {
          ep: "car_horn",
          method: "PUT"
        }]
      },
      searchHigh: {
        name: "高声寻车",
        confirm: "确认高声寻车吗？",
        steps: v853 => [{
          ep: "car_ctrl_v2",
          method: "POST",
          body: {
            param: "4",
            vin: v853.vin
          }
        }]
      },
      cushion: {
        name: "打开坐垫",
        confirm: "确认开启吗？",
        steps: v854 => [v276("28", "1", "打开坐垫", v854.vin)]
      },
      lockOn: {
        name: "开机（解锁）",
        steps: v855 => [v275({
          vinNo: v855.vin,
          functionCode: "ON_AND_OFF",
          type: "ON"
        }), {
          ep: "net_unlock",
          method: "POST",
          lockFlag: 1
        }]
      },
      lockOff: {
        name: "关机（锁车）",
        steps: v856 => [v275({
          vinNo: v856.vin,
          functionCode: "ON_AND_OFF",
          type: "OFF"
        }), {
          ep: "net_unlock",
          method: "POST",
          lockFlag: 0
        }]
      }
    };
    const v272 = {
      search: true,
      searchHigh: true,
      cushion: true
    };
    function v273() {
      const v857 = ["刷新列表", "管理音效", "添加你的专属音效", "音效市场", "试听示例", "停止试听", "导入音频文件", "提取视频声音", "现场录音", "开始录音", "结束录音", "保存录音", "上传音效", "删除音效"];
      return v4.sheet(v9(), {
        key: "audio-preview",
        full: true,
        title: "专属音效",
        sub: "UI 测试预览",
        body: "<div class=\"seg-tabs\"><button class=\"seg-btn on\" data-audio-ui-tab>我的音效</button><button class=\"seg-btn\" data-audio-ui-tab>音效市场</button></div>\n        <div class=\"card-sub\">合成 UI 示例 · 不读取麦克风，不上传或访问真实账号。</div>\n        <div class=\"field\"><label>音效名称<input type=\"text\" placeholder=\"为声音起个名字\" autocomplete=\"off\"></label></div>\n        <div class=\"field\"><label>声音分类<select><option>歌曲</option><option>港片台词</option><option>搞笑人声</option></select></label></div>\n        <div class=\"field\"><label>截取范围<input type=\"range\" min=\"0\" max=\"60\" value=\"15\"></label></div>\n        <div class=\"field\">" + v857.map(v858 => "<button class=\"btn tonal\" data-audio-ui-action>" + v858 + "</button>").join("") + "</div>",
        onMount(v859) {
          v859.querySelectorAll("[data-audio-ui-action]").forEach(v860 => v860.addEventListener("click", () => v15("原生录音 / 账号音效操作")));
          v859.querySelectorAll("[data-audio-ui-tab]").forEach(v861 => v861.addEventListener("click", () => v859.querySelectorAll("[data-audio-ui-tab]").forEach(v862 => v862.classList.toggle("on", v862 === v861))));
        }
      });
    }
    function v274(v863, v864, v865 = {}) {
      if (v12()) {
        return v15("车辆控制");
      }
      if (v271[v863] && v272[v863]) {
        return v103(v863, v865);
      }
      return v106(v863, v864, v865);
    }
    function v275(v866) {
      return {
        ep: "car_cmd",
        method: "POST",
        body: {
          eventId: 11631,
          param: JSON.stringify(v866),
          uuid: "",
          zeehoParamTypeBO: null
        },
        label: "dbpoint " + v866.functionCode + (v866.type ? "(" + v866.type + ")" : "")
      };
    }
    function v276(v867, v868, v869, v870) {
      return {
        ep: "set_property2",
        method: "PUT",
        body: v3.writeBody({
          kind: "commond",
          commond: v867,
          version: "v2"
        }, v868, v870),
        label: v869
      };
    }
    const v277 = "9dbc2cbf2ec327699301b495010316ec";
    const v278 = v871 => btoa(String.fromCharCode(...v871));
    async function v279(v872, v873) {
      if (v12()) {
        throw new Error(window.PLATFORM.message("车控密钥"));
      }
      const v874 = JSON.stringify({
        lockFlag: v872,
        vinNo: v873
      });
      if (v202() && window.IOSBR?.has?.("crypto.aes.encrypt") === true) {
        const v882 = v310();
        if (!v882 || typeof v882.navId !== "string" || !v882.navId || typeof v882.frame !== "string" || !v882.frame || !v882.scope || !Number.isSafeInteger(v882.scope.epoch)) {
          throw new Error("native_crypto_failed");
        }
        const v883 = new TextEncoder();
        const v884 = v883.encode(v874);
        const v885 = 16 - v884.length % 16;
        const v886 = new Uint8Array(v884.length + v885);
        v886.set(v884);
        v886.fill(v885, v884.length);
        const v887 = v883.encode(v277);
        const v888 = new Uint8Array(v886.length);
        for (let v889 = 0; v889 < v886.length; v889 += 16) {
          const v890 = await window.IOSBR.call("crypto.aes.encrypt", {
            navigationId: v882.navId,
            frame: v882.frame,
            epoch: v882.scope.epoch,
            keyB64: v278(v887),
            plainB64: v278(v886.subarray(v889, v889 + 16)),
            mode: "ecb",
            padding: "pkcs7"
          });
          if (v890?.ok === false || typeof v890?.cipherB64 !== "string") {
            throw new Error("native_crypto_failed");
          }
          v888.set(new Uint8Array(atob(v890.cipherB64).split("").map(v891 => v891.charCodeAt(0))), v889);
        }
        return v278(v888);
      }
      const v875 = new TextEncoder();
      const v876 = await crypto.subtle.importKey("raw", v875.encode(v277), {
        name: "AES-CBC"
      }, false, ["encrypt"]);
      const v877 = v875.encode(v874);
      const v878 = 16 - v877.length % 16;
      const v879 = new Uint8Array(v877.length + v878);
      v879.set(v877);
      v879.fill(v878, v877.length);
      const v880 = new Uint8Array(16);
      const v881 = new Uint8Array(v879.length);
      for (let v892 = 0; v892 < v879.length; v892 += 16) {
        const v893 = new Uint8Array(await crypto.subtle.encrypt({
          name: "AES-CBC",
          iv: v880
        }, v876, v879.subarray(v892, v892 + 16)));
        v881.set(v893.subarray(0, 16), v892);
      }
      return btoa(String.fromCharCode(...v881));
    }
    const v280 = ["search", "carlock", "cushion"];
    const v281 = ["vehicle_home", "battery_info", "tire_monitor", "ride_home", "ride_month", "analyse", "service_recharge", "vehicle_list"];
    const v282 = ["vehicle_set_items", "vehicle_set_info"];
    const v283 = ["vehicle_list", "integral_total", "signin_info", "battery_info", "analyse", "ota_records", "service_recharge"];
    const v284 = v894 => {
      const v895 = [...new Set([...({
        home: v281,
        settings: v282,
        me: v283
      }[v894] || v281), "vehicle_home", "battery_info"])];
      if (v16.profileUid) {
        v895.push("msg_unread");
      }
      return v895;
    };
    function v285() {
      const v896 = new Date();
      return v896.getFullYear() + "." + String(v896.getMonth() + 1).padStart(2, "0");
    }
    let v286 = 0;
    const v287 = "zeeho.profile.v1";
    const v288 = v897 => v2.ns(v287) + "@" + String(v897 || "");
    const v289 = 7776000000;
    function v290(v898) {
      if (!v898) {
        return null;
      }
      let v899 = null;
      try {
        v899 = v2.getJson(v288(v898));
      } catch {
        return null;
      }
      if (!v899 || v899.v !== 1 || v899.uid !== String(v898) || !v899.user || !v899.user.ok) {
        return null;
      }
      if (!v899.at || Date.now() - v899.at > v289) {
        return null;
      }
      if (v899.src !== API.source) {
        return null;
      }
      return v899.user;
    }
    function v291(v900, v901) {
      if (!v18()) {
        return false;
      }
      const v902 = String(v900 || "");
      if (!v902 || !v901?.ok) {
        return false;
      }
      try {
        if (v2.requiresAsync?.()) {
          return v2.commitAsync({
            puts: {
              [v288(v902)]: JSON.stringify({
                v: 1,
                at: Date.now(),
                uid: v902,
                src: API.source,
                user: v901
              })
            }
          });
        } else {
          return v2.setJson(v288(v902), {
            v: 1,
            at: Date.now(),
            uid: v902,
            src: API.source,
            user: v901
          });
        }
      } catch {
        return false;
      }
    }
    function v292(v903 = v16.profileUid) {
      if (v16.data.user?.ok) {
        return false;
      }
      const v904 = v290(v903);
      if (!v904) {
        return false;
      }
      v16.data.user = v904;
      return true;
    }
    async function v293() {
      if (!v18()) {
        return;
      }
      const v905 = v158();
      const v906 = v16.vin;
      const v907 = v16.month;
      const v908 = ++v286;
      const v909 = v167(["user_info", "integral_total", "signin_info"]);
      const v910 = () => v908 === v286 && v159(v905);
      if (v905.uid && v292(v905.uid) && v910()) {
        v500({
          keepScroll: true
        });
      }
      let v911 = null;
      if (v905.uid) {
        const v913 = await API.call("user_info", {
          uid: v905.uid
        }, {
          isLatest: v910
        });
        if (!v910()) {
          return;
        }
        if (v913.ok && v913.data && (v913.data.nickName || v913.data.memoName)) {
          v911 = v913;
        }
      }
      const v912 = await API.all(["integral_total", "signin_info"], {
        vin: v906,
        month: v907
      }, {
        isLatest: v910
      });
      if (!v910()) {
        return;
      }
      if (v168("integral_total", v909)) {
        v16.data.integral_total = v912.integral_total;
        v16.data.user = {
          ...v3.user(v911, v912.integral_total),
          statsOk: v912.integral_total?.ok === true,
          sampleAt: v912.integral_total?.ok === true ? v170(v912.integral_total) : 0
        };
      } else if (v911 && v168("user_info", v909)) {
        v16.data.user = {
          ...v3.user(v911, v16.data.integral_total),
          statsOk: v16.data.user?.statsOk === true,
          sampleAt: v16.data.user?.sampleAt || 0
        };
      }
      if (v168("signin_info", v909)) {
        v16.data.signin = v912.signin_info;
      }
      if (v911) {
        await v291(v905.uid, v16.data.user);
      }
      if (v911?.data?.nickName && v236() && v233 === window.ACC.activeId()) {
        await window.ACC.update(v233, {
          label: String(v911.data.nickName).slice(0, 80)
        });
      }
    }
    function v294() {
      v16.data.settings = v3.curatedSettings({
        caps: v16.data.caps,
        info: v16.data.info?.data,
        home: v16.data.home,
        homeRaw: v16.data.home?.raw,
        batteryRaw: v16.data.battery?.raw
      });
    }
    function v295() {
      if (!window.CHG || v183()) {
        return;
      }
      const v914 = v16.vin || "LZHD3M01A10000001";
      try {
        if (window.CHG.history(v914, {
          includeHidden: true
        }).length) {
          return;
        }
        const v915 = Date.now();
        const v916 = 60000;
        const v917 = [{
          from: 22,
          to: 100,
          daysAgo: 2.1
        }, {
          from: 55,
          to: 100,
          daysAgo: 4.6
        }, {
          from: 60,
          to: 68,
          daysAgo: 6.2
        }, {
          from: 30,
          to: 100,
          daysAgo: 9.4
        }];
        const v918 = [];
        for (const v921 of v917) {
          const v922 = v296(v921.from, v921.to, v915 - v921.daysAgo * 86400000);
          const v923 = Number(window.ZEEHO_MOCK?.vehicle_home?.data?.totalRideMile);
          if (Number.isFinite(v923) && v923 >= 0) {
            for (const v925 of v922) {
              v925.odo = Math.round(Math.max(0, v923 - v921.daysAgo * 20) * 1000);
            }
          }
          const v924 = window.CHG.summarize(v922, v922[v922.length - 1].t + v916);
          if (v924) {
            v918.push({
              ...v924,
              pts: v922.filter((v926, v927) => v927 % Math.max(1, Math.ceil(v922.length / 40)) === 0 || v927 === v922.length - 1)
            });
          }
        }
        const v919 = JSON.parse(v2.get(v2.ns(window.CHG.KEY)) || "{}");
        const v920 = v919[v914];
        if (v920 && (v920.clearAt || 0) > 0) {
          return;
        }
        v918.sort((v928, v929) => (v929.e ?? 0) - (v928.e ?? 0));
        v919[v914] = {
          pts: [],
          ended: true,
          at: v915,
          sessions: v918
        };
        v2.commit({
          puts: {
            [v2.ns(window.CHG.KEY)]: JSON.stringify(v919)
          }
        });
        for (const v930 of v918) {
          window.CAPBOOK?.record(v914, v930);
        }
      } catch {}
    }
    function v296(v931, v932, v933) {
      const v934 = 60000;
      const v935 = 27;
      const v936 = 2 / 60;
      const v937 = [];
      const v938 = v943 => v943 < 82 ? 8 : Math.max(0.5, (100 - v943) * 8 / 18);
      const v939 = v944 => 72 + Math.min(1, v944 / 82) * 12;
      const v940 = (v945, v946, v947) => {
        const v948 = v939(v946);
        v937.push({
          t: v945,
          soc: Math.round(v946),
          v: v948,
          a: v947,
          rawA: v947,
          w: v948 * v947,
          cf: (v945 - v933) / v934,
          temp: 29,
          sampleVersion: 2,
          state: 1,
          socSource: "battery",
          currentSource: "raw-current",
          measurementSide: "unknown",
          timeBasis: "received"
        });
      };
      let v941 = v931;
      let v942 = v933;
      v940(v942, v941, v938(v941));
      while (v941 < v932) {
        const v949 = v938(v941);
        let v950 = Math.min(v932, v941 + v949 * v936 / v935 * 100);
        for (let v952 = 0; v952 < 8; v952++) {
          v950 = Math.min(v932, v941 + (v949 + v938(v950)) / 2 * v936 / v935 * 100);
        }
        const v951 = (v950 - v941) / 100 * v935 / ((v949 + v938(v950)) / 2);
        v942 += v951 * 3600000;
        v941 = v950;
        v940(v942, v941, v938(v941));
      }
      if (v932 === 100) {
        for (let v953 = 1; v953 <= 8; v953++) {
          v942 += v934;
          v940(v942, v932, 0.3);
        }
      }
      return v937;
    }
    const v297 = new Map();
    let v298 = 0;
    function v299({
      silent: v954,
      onPrimaryReady: v955
    } = {}) {
      if (!v18()) {
        return Promise.resolve();
      }
      const v956 = v162();
      const v957 = JSON.stringify([v956.gen, v956.epoch, v956.vin, v956.uid, v956.source, v956.token, v16.tab]);
      const v958 = v297.get(v957);
      if (v958) {
        if (v955) {
          v958.then(v955, v955);
        }
        return v958;
      }
      const v959 = ++v298;
      const v960 = v303({
        silent: v954,
        seq: v959,
        scope: v956,
        onPrimaryReady: v955
      }).finally(() => {
        v955?.();
        if (v297.get(v957) === v960) {
          v297.delete(v957);
        }
      });
      v297.set(v957, v960);
      return v960;
    }
    const v300 = new Set(["vehicle_home", "battery_info", "vehicle_list", "msg_unread"]);
    function v301(v961) {
      const v962 = v961?.loc;
      if (!v962?.has || !window.AMAP_ADDRESS) {
        return;
      }
      const v963 = v961.vin || v16.vin;
      const v964 = v962.lng;
      const v965 = v962.lat;
      const v966 = v162();
      window.AMAP_ADDRESS.forVehicle({
        vin: v963,
        lng: v964,
        lat: v965,
        online: v961.online !== false
      }).then(v967 => {
        if (!v967?.ok || !v163(v966)) {
          return;
        }
        const v968 = v16.data.home;
        if (!v968 || v968.vin !== v963 || v968.loc?.lng !== v964 || v968.loc?.lat !== v965) {
          return;
        }
        if (v968.loc.address === v967.address) {
          return;
        }
        v968.loc.address = v967.address;
        v500({
          keepScroll: true
        });
      }).catch(() => {});
    }
    async function v302(v969, {
      silent = false,
      partial = false,
      firstId = "",
      final = true,
      isLatest = null,
      tickets = null,
      scope = null
    } = {}) {
      if (v17() || scope && !v163(scope)) {
        return;
      }
      const v970 = v16.data.home?.charge?.charging;
      v969 = Object.fromEntries(Object.entries(v969 || {}).filter(([v974, v975]) => v975 && !v975.stale && (!tickets || v168(v974, tickets))));
      if (v969.vehicle_list?.ok && Array.isArray(v969.vehicle_list.data)) {
        const v976 = await v459(v969.vehicle_list);
        if (v976 === "changed" || v976 === "empty") {
          v341();
          v500({
            keepScroll: true
          });
          if (v976 === "changed") {
            v299({
              silent: true
            });
          }
          return;
        }
      }
      Object.assign(v16.data, v969);
      if (v969.vehicle_home?.ok && v969.vehicle_home.data) {
        const v977 = v241(v236() ? window.ACC.active() : null, v16.vin);
        v16.uid = v977 ? v969.vehicle_home.data.bindingUserId || v16.uid : "";
        const v978 = v170(v969.vehicle_home);
        const v979 = v969.battery_info?.ok ? v969.battery_info : null;
        v16.data.home = {
          ...v3.home(v969.vehicle_home, v979?.data || null),
          sampleAt: v978,
          requestAt: v171(v969.vehicle_home)
        };
        v16.dataCached = false;
        v301(v16.data.home);
        (window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(window.APP, "media") : window.APP?.media)?.refreshConnection?.();
      }
      if (v969.tire_monitor?.ok) {
        v16.data.tires = {
          ...v3.tires(v969.tire_monitor, v16.tireBands),
          ok: true,
          sampleAt: v170(v969.tire_monitor)
        };
      } else if (v969.tire_monitor && v16.data.tires) {
        v16.data.tires = {
          ...v16.data.tires,
          ok: false
        };
      }
      if (v969.battery_info?.ok) {
        v16.data.battery = {
          ...v3.battery(v969.battery_info, v969.vehicle_home?.data?.vehicleType || v16.data.home?.vehicleType),
          sampleAt: v170(v969.battery_info),
          requestAt: v171(v969.battery_info)
        };
        if (v16.data.home && v16.data.home.vin === v16.vin && Math.abs((v16.data.home.sampleAt || 0) - v16.data.battery.sampleAt) <= 90000) {
          v16.data.home.charge = v3.chargeState(v16.data.home.raw || {}, v969.battery_info.data || {});
        }
      }
      if (v969.vehicle_home?.ok && v969.vehicle_home.data && v16.data.home?.vin === v16.vin) {
        const v980 = v174;
        const v981 = v16.data.home.charge;
        if (!v183()) {
          v187();
          window.CHG?.record(v16.vin, v16.data.home, v969.battery_info?.ok ? v969.battery_info : null);
        }
        if (v981?.known !== false && typeof v981?.charging === "boolean" && v980 === true && v981.charging === false) {
          try {
            const v982 = window.CHG?.lastSession?.(v16.vin);
            if (v982) {
              window.CAPBOOK?.record(v16.vin, v982);
            }
          } catch {}
        }
        try {
          const v983 = window.CHG?.history?.(v16.vin, {
            includeHidden: true
          }) || [];
          for (const v984 of v983) {
            if (!window.CHG?.healthOf?.(v984)) {
              continue;
            }
            window.CAPBOOK?.record(v16.vin, v984);
          }
        } catch {}
        if (v981?.known !== false && typeof v981?.charging === "boolean") {
          if (v980 === true && v981.charging === false || v981.full === true) {
            v394(v16.data.home.soc, v981.full);
          }
          v174 = v981.charging;
        }
      }
      if (v969.ride_home?.ok) {
        v16.data.rideHome = {
          ...v3.rideHome(v969.ride_home),
          ok: true,
          sampleAt: v170(v969.ride_home)
        };
      } else if (v969.ride_home && v16.data.rideHome) {
        v16.data.rideHome = {
          ...v16.data.rideHome,
          ok: false
        };
      }
      if (v969.ride_month?.ok) {
        v16.data.rideMonth = v3.rideMonth(v969.ride_month);
      }
      if (v969.analyse?.ok) {
        v16.data.analyse = v3.analyse(v969.analyse);
      }
      if (v969.service_recharge?.ok) {
        v16.data.service = v969.service_recharge.data || {};
      }
      if (v969.msg_unread) {
        v172(v969.msg_unread);
      }
      if (v969.integral_total?.ok) {
        v16.data.user = {
          ...(v16.data.user || v3.user(null, v969.integral_total)),
          score: v3.user(null, v969.integral_total).score,
          statsOk: true,
          sampleAt: v170(v969.integral_total)
        };
      } else if (v969.integral_total && v16.data.user) {
        v16.data.user = {
          ...v16.data.user,
          statsOk: false
        };
      }
      if (v969.signin_info?.ok) {
        v16.data.signin = v969.signin_info;
      }
      if (v969.vehicle_set_items?.ok) {
        v16.data.caps = v969.vehicle_set_items;
      }
      if (v969.vehicle_set_info?.ok) {
        v16.data.info = v969.vehicle_set_info;
      }
      if (v16.data.caps) {
        v294();
      }
      const v971 = firstId ? v969[firstId] : null;
      if (v971) {
        v16.lastErr = v971.ok ? "" : v971.message || "请求失败";
      }
      if (v971 && !v971.ok && !v16.data.home) {
        v264();
      }
      v16.source = API.source;
      if (!isLatest || isLatest()) {
        v16.loading = false;
      }
      if (v16.data.home) {
        window.APP?.bootProgress?.(92);
      }
      v16.lastLoad = Date.now();
      v232({
        passive: true
      });
      v257();
      try {
        v500({
          keepScroll: silent || partial
        });
      } catch (v985) {
        console.error("render failed", v985);
      }
      if (!window.__zeehoFirstData && v16.data.home) {
        window.__zeehoFirstData = 1;
        try {
          performance.mark("zeeho-first-data");
        } catch {}
      }
      const v972 = v162();
      const v973 = v341({
        vehicleFresh: !!v969.vehicle_home?.ok,
        batteryFresh: !!v969.battery_info?.ok
      });
      if (v973 && v183()) {
        if (typeof v973.then === "function") {
          v973.then(v986 => {
            if (v986 && v163(v972)) {
              return v188({
                frame: v986,
                force: v970 !== v16.data.home?.charge?.charging
              });
            }
          }).catch(() => {});
        } else {
          v188({
            frame: v973,
            force: v970 !== v16.data.home?.charge?.charging
          });
        }
      }
      if (final && (!isLatest || isLatest())) {
        v4.loadBar(false);
      }
    }
    async function v303({
      silent: v987,
      seq = 0,
      scope = v162(),
      onPrimaryReady: v988
    } = {}) {
      if (!v18()) {
        return;
      }
      const v989 = v16.tab;
      if (window.IOSBR?.has?.("sync.session") && scope.vin && scope.source !== "demo") {
        await v335();
        if (!v163(scope)) {
          return;
        }
      }
      const v990 = () => v163(scope);
      const v991 = v167([...v284(v989), "vehicle_list"]);
      const v992 = {
        batch: "b" + ++API._batchSeq,
        batchReads: new Map(),
        isLatest: v990,
        isLatestFor: v1006 => v168(v1006, v991)
      };
      const v993 = {
        scope: scope,
        requestBatch: {
          batch: v992.batch,
          batchReads: v992.batchReads
        },
        setEpochs: new Map(v282.map(v1007 => [v166(v1007), v165.get(v166(v1007))]))
      };
      const v994 = () => seq === v298;
      if (v994()) {
        v4.loadBar(true);
      }
      let v995 = false;
      const v996 = !v16.vehicles.length || !v16.vehicles.some(v1008 => v1008.vin === v16.vin);
      const v997 = v996 ? API.call("vehicle_list", {}, {
        isLatest: () => v990() && v168("vehicle_list", v991)
      }) : null;
      if (v997) {
        v995 = true;
      }
      if (!v987 && v994()) {
        v16.loading = true;
      }
      const v998 = v16.month;
      v16.month = v285();
      if (v20.month && v998 && v20.month >= v998) {
        v20.month = v16.month;
      }
      const v999 = {
        vin: v16.vin,
        uid: v16.profileUid || "",
        carUid: v16.uid,
        month: v16.month
      };
      const v1000 = v1009 => {
        if (!v168("vehicle_list", v991) || v1009?.stale) {
          return "ok";
        }
        return v459(v1009, {
          isLatest: () => v990() && v168("vehicle_list", v991)
        });
      };
      const v1001 = v284(v989);
      const v1002 = v995 ? v1001.filter(v1010 => v1010 !== "vehicle_list") : v1001;
      if (v989 === "home" && v1002.length > v300.size) {
        const v1011 = v1002.filter(v1018 => v300.has(v1018));
        const v1012 = v1002.filter(v1019 => !v300.has(v1019));
        const [v1013, v1014] = await Promise.all([API.all(v1011, v999, v992), v997]);
        if (!v990()) {
          return;
        }
        const v1015 = v1014 || v1013.vehicle_list;
        if (v1015) {
          const v1020 = v164;
          const v1021 = v158();
          const v1022 = await v1000(v1015);
          if (v1022 === "changed") {
            return v299({
              silent: true,
              onPrimaryReady: v988
            });
          }
          const v1023 = v1022 === "empty" && v159(v1021) && v164 === v1020 && v16.noVehicle && !v16.vin && !v16.vehicles.length;
          if (v1022 === "ignored" || !v1023 && (!v990() || !v168("vehicle_list", v991))) {
            return;
          }
          if (v1022 === "fail" || v1022 === "savefailed") {
            v16.lastErr = v1022 === "savefailed" ? v388 : "没取到车辆列表" + (v1015.message ? "：" + v1015.message : "");
            v16.loading = false;
            v500();
            if (v994()) {
              v4.loadBar(false);
            }
            return;
          }
          if (v1022 === "empty") {
            v16.lastErr = "";
            v16.loading = false;
            v500();
            if (v994() || v1023) {
              v4.loadBar(false);
            }
            return;
          }
        }
        const v1016 = v1012.length > 0;
        v302(v1013, {
          silent: v987,
          partial: v1016,
          firstId: v1001[0],
          final: !v1016,
          isLatest: v994,
          tickets: v991,
          scope: scope
        }).catch(v1024 => console.warn("applyLoaded failed", v1024));
        v988?.(v993);
        if (!v1016 || !v990()) {
          return;
        }
        const v1017 = await API.all(v1012, v999, v992);
        if (!v990()) {
          return;
        }
        v302(v1017, {
          silent: true,
          partial: true,
          final: true,
          isLatest: v994,
          tickets: v991,
          scope: scope
        }).catch(v1025 => console.warn("applyLoaded failed", v1025));
        return;
      }
      const [v1003, v1004] = await Promise.all([API.all(v1002, v999, v992), v997]);
      if (!v990()) {
        return;
      }
      const v1005 = v1004 || v1003.vehicle_list;
      if (v1005) {
        const v1026 = v164;
        const v1027 = v158();
        const v1028 = await v1000(v1005);
        if (v1028 === "changed") {
          return v299({
            silent: true,
            onPrimaryReady: v988
          });
        }
        const v1029 = v1028 === "empty" && v159(v1027) && v164 === v1026 && v16.noVehicle && !v16.vin && !v16.vehicles.length;
        if (v1028 === "ignored" || !v1029 && (!v990() || !v168("vehicle_list", v991))) {
          return;
        }
        if (v1028 === "fail" || v1028 === "savefailed") {
          v16.lastErr = v1028 === "savefailed" ? v388 : "没取到车辆列表" + (v1005.message ? "：" + v1005.message : "");
          v16.loading = false;
          v500();
          if (v994()) {
            v4.loadBar(false);
          }
          return;
        }
        if (v1028 === "empty") {
          v16.lastErr = "";
          v16.loading = false;
          v500();
          if (v994() || v1029) {
            v4.loadBar(false);
          }
          return;
        }
      }
      v302(v1003, {
        silent: v987,
        firstId: v1001[0],
        final: true,
        isLatest: v994,
        tickets: v991,
        scope: scope
      }).catch(v1030 => console.warn("applyLoaded failed", v1030));
      v988?.(v993);
    }
    let v304 = null;
    let v305 = "";
    let v306 = null;
    function v307(v1031, v1032, v1033) {
      const v1034 = JSON.stringify(v1032);
      if (v306?.signature === v1033 && v306.json === v1034) {
        return v306.promise;
      }
      if (v306) {
        v306.finish(0);
      }
      let v1035;
      const v1036 = {
        signature: v1033,
        json: v1034,
        timer: 0,
        done: false,
        promise: new Promise(v1040 => {
          v1035 = v1040;
        })
      };
      v306 = v1036;
      v1036.finish = v1041 => {
        if (v1036.done) {
          return;
        }
        v1036.done = true;
        clearTimeout(v1036.timer);
        if (v306 === v1036) {
          v306 = null;
        }
        v1035(v1041);
      };
      let v1037 = "";
      try {
        v1037 = v1031.beginPageSync(v1034);
      } catch {}
      if (typeof v1037 !== "string" || !v1037) {
        v1036.finish(0);
        return v1036.promise;
      }
      const v1038 = Date.now() + 30000;
      const v1039 = () => {
        if (v1036.done) {
          return;
        }
        if (v1033 !== v308()) {
          v1036.finish(0);
          return;
        }
        try {
          const v1042 = JSON.parse(v1031.pollPageSync(v1037) || "{}");
          if (v1042.ticket !== v1037) {
            v1036.finish(0);
            return;
          }
          if (v1042.done) {
            const v1043 = Number(v1042.json?.frame);
            if (v1042.ok === true && Number.isSafeInteger(v1043) && v1043 > 0) {
              if (v16.vin && v1032.session.token) {
                v304 = {
                  frame: v1043,
                  signature: v1033
                };
                v1.syncNearbyScan?.();
                v1.inductiveUi?.restoreRecording?.();
                v1.vehicleStyle?.syncWidgetCar?.();
              }
              v1036.finish(v1043);
            } else {
              v1036.finish(0);
            }
            return;
          }
        } catch {
          v1036.finish(0);
          return;
        }
        if (Date.now() >= v1038) {
          v1036.finish(0);
          return;
        }
        v1036.timer = setTimeout(v1039, 100);
      };
      v1036.timer = setTimeout(v1039, 0);
      return v1036.promise;
    }
    function v308() {
      const v1044 = v236() ? window.ACC.active() : null;
      const v1045 = v1044?.id || "single";
      const v1046 = v1047 => {
        const v1048 = v160(v1047) || v1044;
        return [v1048?.id || v1045, v1048?.token || API.token, v1048?.uid || v16.profileUid || "", v1048?.credentialRev || 0];
      };
      return JSON.stringify([API.source, API.token, v16.profileUid || "", v1045, API.accountGen, v157, String(v16.vin || "").trim(), v1046(v16.vin), v16.vehicles.map(v1049 => [v1049.vin, ...v1046(v1049.vin)])]);
    }
    function v309() {
      if (v12() || v202()) {
        return;
      }
      const v1050 = window.ZeehoShell;
      if (!v200 || !v19 || typeof v1050?.setInductiveTheme !== "function") {
        return;
      }
      try {
        const v1051 = getComputedStyle(document.documentElement);
        const v1052 = {
          page: "--bg-page",
          surface: "--bg-surface",
          inset: "--bg-inset",
          text: "--md-sys-color-on-surface",
          muted: "--md-sys-color-on-surface-variant",
          primary: "--md-sys-color-primary",
          onPrimary: "--md-sys-color-on-primary",
          primaryContainer: "--md-sys-color-primary-container",
          onPrimaryContainer: "--md-sys-color-on-primary-container",
          success: "--c-success",
          warning: "--c-warning",
          danger: "--c-danger"
        };
        const v1053 = Object.fromEntries(Object.entries(v1052).map(([v1055, v1056]) => [v1055, v1051.getPropertyValue(v1056).trim()]));
        if (!Object.values(v1053).every(v1057 => /^#[0-9a-f]{6}$/i.test(v1057))) {
          return;
        }
        const v1054 = JSON.stringify({
          navigationId: v19,
          colors: v1053
        });
        if (v1054 === v305) {
          return;
        }
        v1050.setInductiveTheme(v1054);
        v305 = v1054;
      } catch {}
    }
    function v310() {
      const v1058 = String(v16.vin || "").trim();
      const v1059 = v308();
      if (!v1058 || !API.token || API.source === "demo" || v236() && v233 !== window.ACC.activeId()) {
        return null;
      }
      if (v202()) {
        const v1061 = v330;
        if (!v1061 || v1061.signature !== v1059 || v1061.vin !== v1058) {
          return null;
        }
        const v1062 = v1061.reply;
        const v1063 = v1062.navId || window.IOSBR?.bootstrap?.()?.navId;
        if (!v1063 || !v1062.frame || !Number.isSafeInteger(v1062.epoch) || !Number.isSafeInteger(v1062.generation) || !v334(v1062)) {
          return null;
        }
        return Object.freeze({
          navId: v1063,
          vin: v1058,
          frame: v1062.frame,
          scope: v1062,
          isOwnerCurrent: () => v1059 === v308() && !!API.token && API.source !== "demo",
          vehicleName: v16.data.home?.name || v16.vehicles.find(v1064 => v1064.vin === v1058)?.name || "爱车",
          isCurrent: () => v330 === v1061 && v1059 === v308() && window.IOSBR?.available?.() === true && window.IOSBR.bootstrap()?.navId === v1063 && v334(v1062) && !!API.token && API.source !== "demo"
        });
      }
      const v1060 = v304;
      if (!v19 || !v1060 || v1060.signature !== v1059 || !Number.isSafeInteger(v1060.frame) || v1060.frame <= 0) {
        return null;
      }
      return Object.freeze({
        navId: v19,
        vin: v1058,
        frame: v1060.frame,
        vehicleName: v16.data.home?.name || v16.vehicles.find(v1065 => v1065.vin === v1058)?.name || "爱车",
        isCurrent: () => v1059 === v308() && !!API.token && API.source !== "demo" && (!v236() || v233 === window.ACC.activeId())
      });
    }
    function v311(v1066 = "pair2") {
      if (v1.inductiveUi?.available(v1066) && !v365()) {
        return v310();
      } else {
        return null;
      }
    }
    window.NativeShell?.configureContext(v310);
    v1.getNativeUiContext = v310;
    function v312() {
      return v1.inductiveUi?.openPair() || false;
    }
    async function v313() {
      if (!v314()) {
        v4.toast(v9(), "请更新 App 后使用蓝牙调试台", 3000);
        return false;
      }
      const v1067 = v202();
      const v1068 = v1067 ? v162() : null;
      if (v1067) {
        await v335();
        const v1071 = v310();
        if (!v163(v1068) || v365() || !v1071?.isCurrent()) {
          return false;
        }
        return (await v1.btDebug?.open?.()) === true;
      }
      const v1069 = String(v16.vin || "").trim();
      const v1070 = v304;
      if (!v19 || !v1069 || !API.token || API.source === "demo" || v365() || !v1070 || v1070.signature !== v308() || !Number.isSafeInteger(v1070.frame) || v1070.frame <= 0 || v236() && v233 !== window.ACC.activeId()) {
        v4.toast(v9(), "车辆状态尚未同步，请稍后重试", 3000);
        return false;
      }
      return (await v1.btDebug?.open?.()) === true;
    }
    function v314() {
      return v1.btDebug?.available?.() === true;
    }
    async function v315(v1072) {
      if (v202()) {
        const v1076 = v162();
        await v335();
        if (!v163(v1076)) {
          return false;
        }
        return v1.walltransfer?.open?.(v1072, v1076) || false;
      }
      const v1073 = window.ZeehoShell;
      const v1074 = String(v16.vin || "").trim();
      const v1075 = v304;
      if (typeof v1073?.openWallpaperTransfer !== "function" || !v19 || !v1074 || !API.token || API.source === "demo" || !v1075 || v1075.signature !== v308() || !Number.isSafeInteger(v1075.frame) || v1075.frame <= 0 || v236() && v233 !== window.ACC.activeId()) {
        v4.toast(v9(), "请更新 App，并等待当前车辆状态同步后重试", 3000);
        return false;
      }
      try {
        v1073.openWallpaperTransfer(v19, v1074, v1075.frame, JSON.stringify(v1072));
        return true;
      } catch {
        v4.toast(v9(), "无法打开车机壁纸连接页，请稍后重试", 3000);
        return false;
      }
    }
    const v316 = new Map();
    const v317 = new Set(["connect", "check", "wifi-settings", "download", "apply", "confirm-preparation"]);
    function v318() {
      const v1077 = window.NativeShell?.shell() || window.ZeehoShell;
      return ["beginWallpaperTransfer", "pollWallpaperTransfer", "wallpaperTransferAction", "cancelWallpaperTransfer"].every(v1078 => typeof v1077?.[v1078] === "function");
    }
    function v319(v1079) {
      const v1080 = v316.get(v1079);
      if (!v1080 || v1080.signature !== v308() || !API.token || API.source === "demo" || v236() && v233 !== window.ACC.activeId()) {
        return false;
      }
      if (!v202()) {
        return v1080.context.isCurrent();
      }
      const v1081 = v1080.context.scope;
      const v1082 = window.IOSBR?.bootstrap?.();
      if (!v1081 || window.IOSBR?.available?.() !== true || window.IOSBR?.isCurrent?.() === false || v1082?.navId !== v1080.navigationId || v332?.navId === v1080.navigationId && v332.epoch !== v1081.epoch) {
        return false;
      }
      const v1083 = v310();
      return !v1083 || ["navId", "frame", "epoch", "accountId", "vin"].every(v1084 => v1083.scope?.[v1084] === v1081[v1084]);
    }
    async function v320(v1085) {
      const v1086 = v316.get(v1085);
      if (!v319(v1085)) {
        throw new Error("车辆或账号已变更，请重新进入");
      }
      if (!v202() || v1086.context.isCurrent()) {
        return v1086;
      }
      await v335();
      const v1087 = v310();
      const v1088 = ["navId", "frame", "epoch", "accountId", "vin"];
      if (v316.get(v1085) !== v1086 || !v319(v1085) || !v1087?.isCurrent() || v1088.some(v1089 => v1087.scope?.[v1089] !== v1086.context.scope?.[v1089]) || v1087.scope.generation < v1086.context.scope.generation) {
        throw new Error("壁纸任务已失效，请重新进入");
      }
      v1086.context = v1087;
      v1086.shell = window.NativeShell.shell(v1087);
      return v1086;
    }
    const v321 = {
      wallpaper_spec: "壁纸信息与车机不匹配，请刷新壁纸详情后重试",
      wallpaper_filename: "壁纸包文件名无效，请刷新壁纸详情后重试",
      wallpaper_slots: "壁纸包图片槽位不完整，请刷新壁纸详情后重试",
      wifi_profile_invalid: "车机 Wi-Fi 连接信息不完整，请刷新车辆状态后重试",
      download_unavailable: "这幅壁纸没有可用的原始包下载地址，请换一幅或刷新详情",
      invalid_arguments: "页面与 App 的车辆状态不一致，请退出后重新进入",
      session_busy: "上一项车机操作还没结束，请稍候再试",
      unavailable: "App 缺少这项操作所需的原生能力，请更新到最新版本",
      stale_session: "车辆或账号已变更，请重新进入",
      stale_navigation: "页面已失效，请重新进入壁纸页",
      foreground_required: "请保持面板在前台再点一次",
      native_capability_unavailable: "App 缺少这项操作所需的原生能力，请更新到最新版本"
    };
    function v322(v1090) {
      const v1091 = String(v1090?.code || v1090?.error || v1090?.cause?.code || "").trim();
      if (v321[v1091]) {
        return v321[v1091];
      }
      const v1092 = typeof v1090?.message === "string" ? v1090.message.trim() : "";
      if (/[\u4e00-\u9fa5]/.test(v1092) && v1092.length <= 120) {
        return v1092;
      } else {
        return "";
      }
    }
    async function v323(v1093) {
      const v1094 = v162();
      if (v202()) {
        await v335();
      }
      const v1095 = v310();
      const v1096 = window.NativeShell?.shell(v1095) || window.ZeehoShell;
      if (!v318()) {
        throw new Error("请更新 App 后应用壁纸");
      }
      const v1097 = window.APP.media.wallpaperOperationReason(null, false);
      if (v1097) {
        throw new Error(v1097);
      }
      if (!v163(v1094) || !v1095?.isCurrent()) {
        throw new Error("车辆或账号状态尚未同步，请稍后重试");
      }
      const v1098 = v1095.navId;
      const v1099 = v308();
      let v1100;
      try {
        v1100 = await v1096.beginWallpaperTransfer(v1098, v1095.vin, v1095.frame, JSON.stringify(v1093));
      } catch (v1102) {
        throw new Error(v322(v1102) || "无法创建壁纸任务，请重试");
      }
      let v1101 = typeof v1100 === "string" ? v1100.trim() : v1100?.ticket || "";
      if (v1101.startsWith("{")) {
        try {
          v1101 = JSON.parse(v1101)?.ticket || "";
        } catch {
          v1101 = "";
        }
      }
      if (typeof v1101 !== "string" || !v1101 || v1101.length > 256 || v1100?.ok === false || v1100?.pending === true || v1100?.queued === true) {
        throw new Error("壁纸任务未受理，请重试");
      }
      v316.set(v1101, {
        navigationId: v1098,
        signature: v1099,
        context: v1095,
        shell: v1096
      });
      if (!v319(v1101)) {
        v329(v1101);
        throw new Error("车辆或账号已变更，请重新进入");
      }
      return v1101;
    }
    function v324() {
      const v1103 = window.NativeShell?.shell() || window.ZeehoShell;
      if (!v318() || typeof v1103?.beginWallpaperTransferLocal !== "function" || typeof v1103?.wallpaperLocalCapabilities !== "function") {
        return false;
      }
      try {
        const v1104 = v202() ? window.NativeShell.cached("wallpaperLocalCapabilities", 60000) : JSON.parse(v1103.wallpaperLocalCapabilities());
        if (v202() && (!v1104 || v1104.stale === true)) {
          window.NativeShell.prime("wallpaperLocalCapabilities");
        }
        return v1104?.version === 2 && v1104.stale !== true && v1104.singleImage === true && v1104.displayWallpaperSet === "1" && v1104.numberMin === 1 && v1104.numberMax === 10;
      } catch {
        return false;
      }
    }
    async function v325(v1105, v1106, v1107, {
      report: v1108,
      isLatest = () => true
    } = {}) {
      const v1109 = v162();
      if (v202()) {
        await v335();
      } else if (!v310() && v306?.signature === v308()) {
        v1108?.("native-session", "start", {
          waitingForReceipt: true
        });
        await v306.promise;
      }
      const v1110 = v310();
      const v1111 = window.NativeShell?.shell(v1110) || window.ZeehoShell;
      if (!v324()) {
        throw new Error("请更新 App 后使用实验性壁纸");
      }
      const v1112 = window.APP.media.wallpaperOperationReason(null, false);
      if (v1112) {
        throw new Error(v1112);
      }
      const v1113 = v163(v1109) && isLatest() && v1110?.isCurrent() === true;
      v1108?.("native-session", v1113 ? "end" : "failed");
      if (!v1113) {
        throw new Error("车辆或账号状态尚未同步，请稍后重试");
      }
      const v1114 = window.APP.media.instrumentCapabilities();
      const v1115 = window.MEDIA.wallpaperSpeedCardBox({
        w: v1114.width,
        h: v1114.height,
        model: v1114.model
      });
      const v1116 = (v1123, v1124) => typeof v1123 === "number" && Number.isFinite(v1123) && typeof v1124 === "number" && Number.isFinite(v1124) && Math.abs(v1123 - v1124) <= 0.5;
      if (v1106 && (v1105?.mainWidth !== v1114.width || v1105?.mainHeight !== v1114.height) || v1107 && (!v1115 || !v1116(v1105?.speedWidth, v1115.w) || !v1116(v1105?.speedHeight, v1115.h))) {
        throw new Error("本地图片尺寸与当前仪表不符");
      }
      const v1117 = [v1106, v1107];
      const v1118 = [["mainWidth", "mainHeight"], ["speedWidth", "speedHeight"]];
      if (!v1117.some(v1125 => v1125 !== "") || !v1117.every((v1126, v1127) => typeof v1126 === "string" && (v1126 === "" ? v1118[v1127].every(v1128 => v1105?.[v1128] === 0) : v1126.startsWith("data:image/png;base64,") && v1126.length > 22 && v1126.length <= 11184876 && v1118[v1127].every(v1129 => Number.isSafeInteger(v1105?.[v1129]) && v1105[v1129] > 0)))) {
        throw new Error("本地图片格式或大小不符合要求");
      }
      if (typeof v1105?.wallpaperNum !== "string" || !/^(?:[1-9]|10)$/.test(v1105.wallpaperNum) || v1105?.displayWallpaperSet !== "1") {
        throw new Error("本地壁纸参数不符合要求");
      }
      const v1119 = v1110.navId;
      const v1120 = v308();
      let v1121;
      try {
        v1121 = await v1111.beginWallpaperTransferLocal(v1119, v1110.vin, v1110.frame, JSON.stringify(v1105), v1106, v1107);
      } catch (v1130) {
        const v1131 = v1130?.code || v1130?.error || v1130?.cause?.code;
        const v1132 = typeof v1131 === "string" && Object.hasOwn(v321, v1131) ? v1131 : "bridge_error";
        v1108?.("native-begin", "failed", {
          code: v1132
        });
        throw new Error(v321[v1132] || "无法创建本地壁纸任务，请重试");
      }
      const v1122 = typeof v1121 === "string" ? v1121.trim() : v1121?.ticket || "";
      if (typeof v1122 !== "string" || !v1122 || v1122.length > 256 || v1121?.ok === false || v1121?.pending === true) {
        v1108?.("native-begin", "failed", {
          code: "bridge_not_accepted"
        });
        throw new Error("本地壁纸任务未受理，请重试");
      }
      v316.set(v1122, {
        navigationId: v1119,
        signature: v1120,
        context: v1110,
        shell: v1111
      });
      if (!v319(v1122)) {
        v329(v1122);
        throw new Error("车辆或账号已变更，请重新进入");
      }
      return v1122;
    }
    async function v326(v1133, v1134) {
      if (!v319(v1133)) {
        throw new Error("车辆或账号已变更，请重新进入");
      }
      let v1135;
      try {
        const v1136 = await v320(v1133);
        const v1137 = await v1134(v1136.shell, v1136.navigationId);
        v1135 = typeof v1137 === "string" ? JSON.parse(v1137) : v1137;
      } catch {
        throw new Error("壁纸任务未响应，请重试");
      }
      if (!v319(v1133) || !v1135 || v1135.ticket !== v1133) {
        throw new Error("壁纸任务已失效，请重新进入");
      }
      if (v1135.status === "done" || v1135.status === "error" || v1135.done === true || v1135.failed === true || v1135.state === "done" || v1135.state === "failed" || v1135.phase === "done" || v1135.phase === "failed") {
        const v1138 = v316.get(v1133);
        if (v1138) {
          v1138.settled = true;
        }
        if (v316.size > 32) {
          for (const [v1139, v1140] of v316) {
            if (v1140.settled) {
              v316.delete(v1139);
            }
            if (v316.size <= 16) {
              break;
            }
          }
        }
      }
      return v1135;
    }
    function v327(v1141) {
      return v326(v1141, (v1142, v1143) => v1142.pollWallpaperTransfer(v1143, v1141));
    }
    function v328(v1144, v1145) {
      if (!v317.has(v1145)) {
        throw new Error("壁纸操作无效");
      }
      const v1146 = window.APP.media.wallpaperOperationReason(null, false);
      if (v1146) {
        throw new Error(v1146);
      }
      return v326(v1144, (v1147, v1148) => v1147.wallpaperTransferAction(v1148, v1144, v1145));
    }
    function v329(v1149) {
      const v1150 = v316.get(v1149);
      if (!v1150) {
        return false;
      }
      v316.delete(v1149);
      try {
        Promise.resolve(v1150.shell?.cancelWallpaperTransfer?.(v1150.navigationId, v1149)).catch(() => {});
      } catch {}
      return true;
    }
    let v330 = null;
    let v331 = null;
    let v332 = null;
    let v333 = 0;
    function v334(v1151) {
      const v1152 = window.IOSBR?.bootstrap?.();
      const v1153 = v332?.navId === v1152?.navId ? v332 : v1152;
      return !!v1151 && (!v1153 || !Number.isSafeInteger(v1153.generation) || v1153.generation === v1151.generation) && (!v1153 || !Number.isSafeInteger(v1153.epoch) || v1153.epoch === v1151.epoch) && (!v1152?.navId || v1151.navId === v1152.navId);
    }
    window.addEventListener("zeehoios:lifecycle", v1154 => {
      const v1155 = v1154?.detail;
      if (!v1155 || v1155.navId !== window.IOSBR?.bootstrap?.()?.navId || !Number.isSafeInteger(v1155.generation) || !Number.isSafeInteger(v1155.epoch)) {
        return;
      }
      if (v332?.navId === v1155.navId && v1155.generation < v332.generation) {
        return;
      }
      const v1156 = v330 ? v1155.generation !== v330.reply.generation || v1155.epoch !== v330.reply.epoch : !v332 || v1155.generation !== v332.generation || v1155.epoch !== v332.epoch;
      v332 = {
        navId: v1155.navId,
        generation: v1155.generation,
        epoch: v1155.epoch
      };
      if (v1156 || ["background", "navigation", "closed"].includes(v1155.kind)) {
        v330 = null;
        if (v1155.kind !== "session" || !v331) {
          v333++;
          v331 = null;
        }
      }
      if (["background", "navigation", "closed"].includes(v1155.kind)) {
        v1.stopNearbyScan?.();
      }
      if (v1155.kind === "foreground") {
        v335().then(v1157 => {
          if (v1157 && v334(v1157)) {
            v1.syncNearbyScan?.();
            v1.inductiveUi?.restoreRecording?.({
              resume: true
            });
          }
        });
      }
    });
    async function v335() {
      if (v12()) {
        return null;
      }
      if (!window.IOSBR?.has?.("sync.session") || !v18()) {
        return null;
      }
      const v1158 = v162();
      const v1159 = v308();
      if (v330?.signature === v1159 && v163(v1158) && v334(v330.reply)) {
        return v330.reply;
      }
      if (v331?.signature === v1159 && v331.revision === v333) {
        return v331.promise;
      }
      const v1160 = v1158.owner || window.ACC?.active?.();
      if (!v1158.vin || !v1160?.id || !v1160.token || v1160.invalidAt || API.source === "demo") {
        return null;
      }
      const v1161 = {
        signature: v1159,
        revision: v333,
        promise: null
      };
      v1161.promise = (async () => {
        if (!(await v232({
          passive: true
        })) || !v163(v1158)) {
          return null;
        }
        const v1162 = await window.IOSBR.call("sync.session", {
          accountId: v1160.id,
          vin: v1158.vin
        });
        if (!v163(v1158) || v1159 !== v308() || v1161.revision !== v333 || v1162?.ok !== true || !v334(v1162) || v1162.accountId !== v1160.id || v1162.vin !== v1158.vin || typeof (v1162.navId || window.IOSBR.bootstrap()?.navId) !== "string" || typeof v1162.frame !== "string" || !v1162.frame || !Number.isSafeInteger(v1162.epoch) || !Number.isSafeInteger(v1162.generation)) {
          return null;
        }
        v330 = {
          signature: v1159,
          reply: Object.freeze({
            ...v1162,
            epochString: String(v1162.epoch)
          }),
          accountId: v1160.id,
          vin: v1158.vin,
          ownerUid: v1160.uid || ""
        };
        v1.syncNearbyScan?.();
        Promise.resolve().then(() => window.OSBackground?.ensureCredential?.()).catch(() => {});
        return v330.reply;
      })().catch(() => null).finally(() => {
        if (v331 === v1161) {
          v331 = null;
        }
      });
      v331 = v1161;
      return v1161.promise;
    }
    v1.syncIOSSession = v335;
    v1.resolveAccountUidFor = async v1163 => {
      const v1164 = window.ACC?.byId?.(v1163) || (window.ACC?.active?.()?.id === v1163 ? window.ACC.active() : null);
      if (!v1164?.token || v1164.invalidAt) {
        return "";
      }
      return v246(v1164.token, () => true);
    };
    function v336(v1165, v1166) {
      const v1167 = v1165.owner || window.ACC?.active?.();
      return {
        accountId: String(v1167?.id || ""),
        vin: v1165.vin,
        ownerUid: String(v1167?.uid || ""),
        scope: v1166
      };
    }
    async function v337(v1168, v1169 = {}) {
      if (v12() || !Array.isArray(v1168) || !v1168.length) {
        return 0;
      }
      if (!window.IOSBR?.has?.("history.record")) {
        return 0;
      }
      const v1170 = v1.context();
      if (!v1170?.vin || !v163(v1170)) {
        return 0;
      }
      const v1171 = await v335();
      if (!v1171 || !v163(v1170)) {
        return 0;
      }
      const v1172 = v336(v1170, v1171);
      let v1173 = 0;
      for (const v1174 of v1168) {
        if (!v163(v1170)) {
          break;
        }
        if (v1174?.charging !== true) {
          continue;
        }
        const v1175 = String(v1174?.vin || "");
        const v1176 = Number(v1174?.capturedAt);
        const v1177 = Number(v1174?.socPercent);
        if (v1175 !== v1170.vin || !Number.isSafeInteger(v1176) || v1176 <= 0) {
          continue;
        }
        if (!Number.isFinite(v1177) || v1177 < 0 || v1177 > 100) {
          continue;
        }
        const v1178 = {
          batteryFresh: true,
          batteryAt: v1176,
          vehicleFresh: false,
          vehicleAt: 0,
          sample: {
            soc: v1177,
            charging: 1,
            chargeSource: "battery",
            chargeCode: "1",
            batteryAt: v1176,
            vehicleAt: 0
          }
        };
        try {
          await window.IOSBR.call("history.record", {
            ...v1172,
            accepted: true,
            source: "battery",
            sampleAt: v1176,
            snapshot: v1178
          });
          v1173++;
        } catch {}
      }
      if (!v1169.silent && v1173 > 0) {
        v1.ride?.refreshHistory?.();
      }
      return v1173;
    }
    v1.ingestBackgroundSamples = v337;
    function v338(v1179, v1180) {
      const v1181 = v1179?.metadata;
      return v1181 && v1181.accountId === v1180.accountId && v1181.vin === v1180.vin && Number(v1181.generation) === v1180.scope.epoch && v1181.frame === v1180.scope.frame;
    }
    async function v339({
      force = false,
      clear = false,
      frame = null
    } = {}) {
      const v1182 = v162();
      const v1183 = v185(v1182);
      const v1184 = Date.now();
      if (!v1182.vin || !v1182.token || v1182.source === "demo" || !window.IOSBR?.has?.("history.charge")) {
        return {
          ok: false,
          unavailable: true
        };
      }
      if (!clear && !force && v1184 - (v180.get(v1183) || 0) < 60000) {
        return {
          ok: true,
          cached: true
        };
      }
      const v1185 = clear ? ++v182 : v182;
      const v1186 = frame && typeof frame === "object" ? frame : await v335();
      if (!v1186 || !v163(v1182) || v1185 !== v182) {
        return {
          ok: false,
          stale: true
        };
      }
      const v1187 = v336(v1182, v1186);
      const v1188 = {
        vin: v1182.vin,
        pending: true,
        clearing: clear,
        error: "",
        updatedAt: 0
      };
      v1.mem.chargeHistoryState = v1188;
      try {
        const v1189 = await window.IOSBR.call(clear ? "history.clear" : "history.charge", clear ? {
          ...v1187,
          target: "charge"
        } : v1187);
        if (!v163(v1182) || v1185 !== v182) {
          return {
            ok: false,
            stale: true
          };
        }
        const v1190 = v1189?.history || v1189;
        if (v1189?.ok === false || !v1190 || !v338(v1190, v1187) || v1190.vin !== v1187.vin || v1190.ownerId !== v1187.accountId || v1190.ownerUid !== v1187.ownerUid) {
          return {
            ok: false,
            message: v1189?.error?.message || v1189?.message || "本机充电记录读取失败，原数据保留"
          };
        }
        const v1191 = (await window.CHG.mergeNativeHistory(v1182.vin, v1190, v1187.accountId, v1187.ownerUid, true)) === true;
        if (!v163(v1182) || v1185 !== v182) {
          return {
            ok: false,
            stale: true
          };
        }
        if (v1191) {
          v180.set(v1183, v1184);
          v1188.updatedAt = v1184;
          for (const v1192 of window.CHG.history(v1182.vin, {
            includeHidden: true
          })) {
            if (window.CHG.healthOf?.(v1192)) {
              await window.CAPBOOK?.record(v1182.vin, v1192);
            }
          }
          v500({
            keepScroll: true
          });
          v1.chg.refreshHistory?.();
        }
        return {
          ok: clear || v1191,
          mirrored: v1191,
          message: v1191 ? "" : "原生记录已读取，页面保存尚未确认"
        };
      } catch (v1193) {
        return {
          ok: false,
          message: v1193?.message || String(v1193)
        };
      } finally {
        v1188.pending = false;
        v1188.clearing = false;
      }
    }
    async function v340({
      vehicleFresh = false,
      batteryFresh = false
    } = {}) {
      const v1194 = v162();
      if (!v1194.vin || v1194.source === "demo" || !v1194.token) {
        return null;
      }
      const v1195 = v16.data.home?.vin === v1194.vin ? v16.data.home : {};
      const v1196 = v16.data.battery || {};
      const v1197 = v1206 => v1206 != null && v1206 !== "" && Number.isFinite(Number(v1206)) ? Number(v1206) : null;
      const v1198 = v1207 => Number.isSafeInteger(v1207) && v1207 > 0 ? v1207 : 0;
      const v1199 = v1208 => typeof v1208 === "string" ? v1208.trim() : "";
      const v1200 = vehicleFresh ? v1198(v1195.sampleAt) : 0;
      const v1201 = batteryFresh ? v1198(v1196.sampleAt) : 0;
      const v1202 = v1200 ? v1199(v1195.raw?.chargeState) : "";
      const v1203 = {
        vehicleFresh: !!v1200,
        batteryFresh: !!v1201,
        vehicleAt: v1200,
        batteryAt: v1201,
        vehicleRequestAt: v1200 ? v1198(v1195.requestAt) : 0,
        batteryRequestAt: v1201 ? v1198(v1196.requestAt) : 0,
        vehicleChargeCode: v1202,
        vehicleCharging: v1202 && v1202 !== "-1" ? v1202 === "1" ? 1 : 0 : -1,
        lock: v1200 && typeof v1195.headLock === "boolean" ? v1195.headLock ? 1 : 0 : null,
        odo: v1200 && v1197(v1195.totalMile) !== null && v1197(v1195.totalMile) >= 0 ? Math.round(v1197(v1195.totalMile) * 1000) : null,
        chargedMin: v1200 ? v1197(v1195.charge?.chargedMin) : null
      };
      if (v1201 && v1196.raw) {
        const v1209 = v1196.raw;
        const v1210 = v1197(v1209.voltage ?? v1209.bmsVoltage);
        const v1211 = v1197(v1209.current);
        const v1212 = v1197(v1209.power);
        const v1213 = v1197(v3.currentAmp(v1210, v1211, v1212));
        const v1214 = v1199(v1209.chargeState);
        const v1215 = v1200 > 0 && Math.abs(v1200 - v1201) <= 90000;
        const v1216 = v1209.chargeState == null || typeof v1209.chargeState === "string" && !v1209.chargeState.trim();
        const v1217 = v1214 ? "battery" : v1216 && v1215 && v1202 ? "vehicle" : "unknown";
        const v1218 = v1217 === "battery" ? v1214 : v1217 === "vehicle" ? v1202 : "";
        v1203.sample = {
          soc: v1197(v1209.bmssoc ?? v1209.soc),
          voltage: v1210,
          current: v1213,
          power: v1197(v3.powerWatt(v1210, v1213, v1209.power)),
          rawCurrent: v1211,
          rawPower: v1212,
          charging: v1218 && v1218 !== "-1" ? v1218 === "1" ? 1 : 0 : -1,
          chargeSource: v1217,
          chargeCode: v1218,
          batteryAt: v1201,
          vehicleAt: v1217 === "vehicle" ? v1200 : 0,
          chargedMin: v1215 ? v1197(v1195.charge?.chargedMin) : null
        };
      }
      const v1204 = await v335();
      if (!v1204 || !v163(v1194)) {
        return null;
      }
      v1.systemSurfaces?.accept({
        scope: v1194,
        nativeScope: v1204,
        home: v1195,
        battery: v1196,
        vehicleFresh: vehicleFresh,
        batteryFresh: batteryFresh
      });
      if (!window.IOSBR.has("history.record")) {
        return v1204;
      }
      const v1205 = v336(v1194, v1204);
      try {
        if (v1203.vehicleFresh && v1202 && v1202 !== "-1") {
          await window.IOSBR.call("history.record", {
            ...v1205,
            accepted: true,
            source: "vehicle",
            sampleAt: v1200,
            snapshot: v1203
          });
        }
        if (v1203.batteryFresh && v1203.sample?.charging === 1 && v163(v1194)) {
          await window.IOSBR.call("history.record", {
            ...v1205,
            accepted: true,
            source: "battery",
            sampleAt: v1201,
            snapshot: v1203
          });
        }
      } catch {}
      if (v163(v1194)) {
        window.OSBackground?.autoMerge?.();
      }
      if (v163(v1194)) {
        return v1204;
      } else {
        return null;
      }
    }
    function v341({
      vehicleFresh = false,
      batteryFresh = false
    } = {}) {
      if (v12()) {
        return null;
      }
      if (window.IOSBR?.available?.()) {
        return v340({
          vehicleFresh: vehicleFresh,
          batteryFresh: batteryFresh
        });
      }
      v304 = null;
      const v1219 = window.ZeehoShell;
      if (!v1219 || v236() && v233 !== window.ACC.activeId()) {
        return;
      }
      try {
        const v1220 = v308();
        const v1221 = typeof v1219.syncSessionV2 === "function";
        const v1222 = typeof v1219.beginPageSync === "function" && typeof v1219.pollPageSync === "function";
        if (!API.token || API.source === "demo") {
          if (!API.token) {
            const v1251 = {
              accountId: "",
              token: "",
              uid: "",
              vin: "",
              name: "",
              vehicles: []
            };
            if (v1222) {
              return v307(v1219, {
                session: v1251,
                status: null
              }, v1220);
            }
            if (v1221) {
              v1219.syncSessionV2(JSON.stringify(v1251));
            } else {
              v1219.syncSession("", "", "", "");
            }
          }
          return;
        }
        const v1223 = v236() ? window.ACC.active() : null;
        const v1224 = v1223?.id || "single";
        const v1225 = String(v16.vin || "").trim();
        const v1226 = v160(v1225) || v1223;
        const v1227 = v1226?.id || v1224;
        const v1228 = v1226?.token || API.token;
        const v1229 = v1226 ? v1226.uid || "" : v16.profileUid || "";
        const v1230 = v16.data.home?.vin === v1225 ? v16.data.home : {};
        const v1231 = v16.data.battery || {};
        const v1232 = v16.data.messages || {};
        const v1233 = v1230.name || v16.vehicles.find(v1252 => v1252.vin === v1225)?.name || "";
        const v1234 = window.ACC;
        const v1235 = v236() && typeof v1234?.mergedVehicles === "function" ? v1234.mergedVehicles() : null;
        const v1236 = !v1235 ? v16.vehicles : v1234.mode?.() === "aggregate" ? v1235 : [...v1235.filter(v1253 => v1253.ownerAcc !== v1224 && !v16.vehicles.some(v1254 => v1254.vin === v1253.vin)), ...v16.vehicles.map(v1255 => ({
          ...v1255,
          ownerAcc: v1224
        }))];
        const v1237 = v1236.map(v1256 => {
          const v1257 = String(v1256.vin) === v1225 ? v1226 : v1235 && typeof v1234.byId === "function" ? v1234.byId(v1256.ownerAcc) : v1223;
          if (v1235 && !v1257?.token) {
            return null;
          }
          return {
            vin: v1256.vin,
            name: v1256.name || "",
            accountId: v1257?.id || v1224,
            token: v1257?.token || API.token,
            uid: v1257 ? v1257.uid || "" : v16.profileUid || ""
          };
        }).filter(Boolean);
        let v1238;
        try {
          v1238 = v2.getJson(v2.ns("zeeho.tasks", v1224), {}) || {};
        } catch {
          v1238 = {};
        }
        const v1239 = {
          postContent: typeof v1238.postContent === "string" ? v1238.postContent : "开心的一天",
          deleteAfterPost: v1238.deleteAfterPost !== false,
          gapMs: Number.isFinite(Number(v1238.gapMs)) ? Math.max(0, Math.min(60000, Number(v1238.gapMs))) : 2000
        };
        const v1240 = {
          accountId: v1224,
          token: API.token,
          uid: v16.profileUid || "",
          vin: v1225,
          name: v1233,
          vehicleAccountId: v1225 ? v1227 : "",
          vehicleToken: v1225 ? v1228 : "",
          vehicleUid: v1225 ? v1229 : "",
          vehicles: v1237,
          task: v1239
        };
        let v1241;
        if (!v1222) {
          if (v1221) {
            v1241 = v1219.syncSessionV2(JSON.stringify(v1240));
          } else {
            const v1258 = v1225 && v1227 !== v1224;
            v1241 = v1219.syncSession(API.token, v16.profileUid || "", v1258 ? "" : v1225, v1258 ? "" : v1233);
            if (v1258 || !v1225) {
              return;
            }
          }
        }
        const v1242 = v1241 != null && Number.isSafeInteger(Number(v1241)) && Number(v1241) > 0;
        if (!v1222 && v1221 && !v1242) {
          return;
        }
        if (v1242 && v1225 && v1220 === v308()) {
          v304 = {
            frame: Number(v1241),
            signature: v1220
          };
          v1.syncNearbyScan?.();
          v1.vehicleStyle?.syncWidgetCar?.();
        }
        const v1243 = v1259 => Number.isFinite(Number(v1259)) && Number(v1259) > 0 ? Number(v1259) : 0;
        const v1244 = v1243(v1230.sampleAt);
        const v1245 = v1243(v1231.sampleAt);
        const v1246 = v1243(v1232.sampleAt);
        const v1247 = {
          accountId: v1224,
          vehicleAccountId: v1225 ? v1227 : "",
          vin: v1225,
          uid: v16.profileUid || "",
          at: v1244,
          vehicleAt: v1244,
          batteryAt: v1245,
          msgAt: v1246,
          vehicleRequestAt: v1243(v1230.requestAt),
          batteryRequestAt: v1243(v1231.requestAt),
          msgRequestAt: v1243(v1232.requestAt)
        };
        if (v1241 != null && Number.isFinite(Number(v1241))) {
          v1247.sessionId = Number(v1241);
        }
        if (v1225 && (v1242 || v1222)) {
          v1247.seatHideModesVins = v223(v16.hideSeatStatusVins);
          v1247.hideSeatStatusVins = Object.fromEntries(Object.keys(v1247.seatHideModesVins).map(v1260 => [v1260, true]));
        }
        if (v1244) {
          v1247.lock = v1230.headLock ? 1 : 0;
          v1247.seat = v1230.seatLock ? 1 : 0;
          v1247.online = v1230.online ? 1 : 0;
          v1247.eta = v1230.charge?.expect || "";
          v1247.charged = v1230.charge?.chargedFor || "";
          v1247.chargedMin = v1230.charge?.chargedMin ?? -1;
          if (v1230.charge?.known !== false && v1230.charge?.charging !== undefined) {
            v1247.charging = v1230.charge.full ? 2 : v1230.charge.charging ? 1 : 0;
          }
        }
        const v1248 = v1261 => v1261 != null && v1261 !== "" && Number.isFinite(Number(v1261)) ? Number(v1261) : null;
        if (v1245 && v1231.raw) {
          const v1262 = v1231.raw;
          const v1263 = v1248(v1262.voltage ?? v1262.bmsVoltage);
          const v1264 = v3.currentAmp(v1263, v1248(v1262.current), v1248(v1262.power));
          const v1265 = v1248(v1264);
          const v1266 = v1248(v3.powerWatt(v1263, v1265, v1262.power));
          const v1267 = v1248(v1262.bmssoc ?? v1262.soc);
          const v1268 = v1285 => typeof v1285 === "number" && Number.isFinite(v1285) ? String(v1285) : typeof v1285 === "string" && v1285.trim() ? v1285.trim() : "";
          const v1269 = v1268(v1262.chargeState);
          const v1270 = v1262.chargeState == null || typeof v1262.chargeState === "string" && !v1262.chargeState.trim();
          const v1271 = v1268(v1230.raw?.chargeState);
          const v1272 = vehicleFresh && v1244 > 0 && Math.abs(v1244 - v1245) <= 90000;
          const v1273 = v1269 ? "battery" : v1270 && v1272 && v1271 ? "vehicle" : "unknown";
          const v1274 = v1273 === "battery" ? v1269 : v1273 === "vehicle" ? v1271 : "";
          const v1275 = typeof v1262.chargeStateStr === "string" && v1262.chargeStateStr.includes("充满");
          const v1276 = v1274 ? v1274 === "1" ? 1 : v1275 ? 2 : 0 : -1;
          v1247.sample = {
            soc: v1267,
            voltage: v1263,
            current: v1265,
            power: v1266,
            charging: v1276,
            chargeSource: v1273,
            chargeCode: v1274,
            vehicleAt: v1273 === "vehicle" ? v1244 : 0,
            batteryAt: v1245,
            chargedMin: v1272 ? v1230.charge?.chargedMin ?? -1 : -1
          };
          if (batteryFresh && v1276 >= 0) {
            v1247.charging = v1276;
          }
          v1247.soc = v1267;
          v1247.voltage = v1263;
          v1247.voltageText = v1263 == null ? "" : String(v1263);
          v1247.current = v1265;
          v1247.power = v1266 == null ? null : Math.abs(v1266);
          v1247.fullMin = v1230.charge?.carFull > 0 ? Math.round(v1230.charge.carFull) : -1;
          const v1277 = Array.isArray(v1262.batteryInfoList) ? v1262.batteryInfoList : [];
          let v1278 = v1248(v1262.batteryTemp);
          let v1279 = v1248(v1262.soh);
          if ((v1278 == null || v1278 === 0) && v1277.length) {
            v1278 = v1248(v1277[0]?.batteryTemp);
          }
          if ((v1279 == null || v1279 <= 0 || v1279 > 100) && v1277.length) {
            v1279 = v1248(v1277[0]?.soh);
          }
          v1247.batteryTemp = v1278 != null && v1278 !== 0 && v1278 >= -50 && v1278 <= 150 ? v1278 : null;
          v1247.soh = v1279 != null && v1279 > 0 && v1279 <= 100 ? v1279 : null;
          const v1280 = v1248(v1262.chargeCount);
          v1247.chargeCount = v1280 != null && Number.isInteger(v1280) && v1280 >= 0 ? v1280 : null;
          const v1281 = window.CHG?.lastSession?.(v1225);
          const v1282 = window.CHG?.usageOf?.(v1281, v1230, v1231) || {};
          const v1283 = v1286 => v1286 != null && Number.isFinite(Number(v1286)) ? Number(v1286) : null;
          v1247.chargeDays = v1283(v1282.days);
          v1247.chargeKm = v1283(v1282.km);
          v1247.chargeUsed = v1283(v1282.used);
          v1247.per10 = v1283(v1282.per10);
          v1247.remaining = v1283(v1.shell?.remainingRange?.(v1267));
          let v1284 = null;
          try {
            const v1287 = window.CAPBOOK?.nominal?.(v1225, v1230.type);
            if (v1287?.src === "manual") {
              v1284 = v1283(v1287.ah);
            }
          } catch {}
          v1247.perAh = v1247.per10 > 0 && v1284 > 0 ? v1247.per10 * 10 / v1284 : null;
        } else if (v1244 && v1230.soc != null) {
          v1247.soc = v1230.soc;
        }
        const v1249 = v16.data.rideHome;
        if (v1249) {
          if (v1249.todayMile != null) {
            v1247.todayMile = Math.round(Number(v1249.todayMile) * 1000);
          }
          if (v1249.lastMile != null) {
            v1247.lastRideMile = Math.round(Number(v1249.lastMile) * 1000);
          }
          if (v1249.lastMinutes != null) {
            v1247.lastRideMin = Math.round(Number(v1249.lastMinutes));
          }
        }
        for (const v1288 of v16.data.tires?.wheels || []) {
          if (v1288.pressure == null) {
            continue;
          }
          const v1289 = v1288.pos === "前轮";
          v1247[v1289 ? "tireFront" : "tireRear"] = v1288.pressure;
          if (v1288.temp != null) {
            v1247[v1289 ? "tireTempFront" : "tireTempRear"] = v1288.temp;
          }
        }
        const v1250 = v16.data.user?.score;
        if (Number.isFinite(v1250)) {
          v1247.integral = Math.round(v1250);
        }
        if (v1232.ok !== false && v1246 && v1232.noRead != null) {
          v1247.noRead = v1232.noRead;
          const v1290 = (v1232.list || []).find(v1291 => v1291.unread) || (v1232.list || [])[0];
          v1247.msgTitle = v1290?.title || "";
          v1247.msgId = v1290?.id || "";
          v1247.msgTime = v1290?.time || "";
        }
        if (v1222) {
          return v307(v1219, {
            session: v1240,
            status: v1247
          }, v1220);
        }
        v1219.syncStatus(JSON.stringify(v1247));
        if (v1242) {
          return Number(v1241);
        } else {
          return 0;
        }
      } catch {}
    }
    let v342 = 0;
    let v343 = false;
    let v344 = false;
    let v345 = null;
    let v346 = false;
    let v347 = false;
    let v348 = 0;
    let v349 = null;
    let v350 = null;
    const v351 = [{
      id: "home",
      t: "爱车",
      icon: "bike"
    }, {
      id: "settings",
      t: "车辆设置",
      icon: "gear"
    }, {
      id: "me",
      t: "我的",
      icon: "user"
    }];
    const v352 = 3000;
    const v353 = 10;
    function v354() {
      const v1292 = v8("topbar");
      if (!v1292 || typeof v1292.addEventListener !== "function" || v344) {
        return;
      }
      v344 = true;
      let v1293 = 0;
      let v1294 = 0;
      let v1295 = 0;
      let v1296 = null;
      const v1297 = () => {
        if (v1293) {
          clearTimeout(v1293);
          v1293 = 0;
        }
        v1296 = null;
      };
      v1292.addEventListener("pointerdown", v1298 => {
        v1297();
        if (v1298.isPrimary === false) {
          return;
        }
        if (v16.tab !== "settings") {
          return;
        }
        if (!v314()) {
          return;
        }
        if (v1298.target?.closest?.("button, [data-act], a, input, select, textarea")) {
          return;
        }
        v1294 = v1298.clientX || 0;
        v1295 = v1298.clientY || 0;
        v1296 = v1298.pointerId;
        v1293 = setTimeout(() => {
          v1293 = 0;
          v1296 = null;
          v507("打开蓝牙调试台", "长按顶栏「车辆设置」标题");
          v313();
        }, v352);
      }, {
        passive: true
      });
      v1292.addEventListener("pointermove", v1299 => {
        if (!v1293) {
          return;
        }
        if (v1296 !== null && v1299.pointerId !== undefined && v1299.pointerId !== v1296) {
          return;
        }
        if (Math.abs((v1299.clientX || 0) - v1294) > v353 || Math.abs((v1299.clientY || 0) - v1295) > v353) {
          v1297();
        }
      }, {
        passive: true
      });
      for (const v1300 of ["pointerup", "pointercancel", "pointerleave"]) {
        v1292.addEventListener(v1300, v1301 => {
          if (v1296 !== null && v1301.pointerId !== undefined && v1301.pointerId !== v1296) {
            return;
          }
          v1297();
        }, {
          passive: true
        });
      }
      if (typeof window.addEventListener === "function") {
        window.addEventListener("blur", v1297);
      }
    }
    function v355(v1302) {
      const v1303 = v8("tabbar");
      if (!v1303) {
        return;
      }
      const v1304 = v1302 && !v346 && !v1303.classList.contains("is-boot");
      v1303.classList.toggle("is-compact", v1304);
    }
    function v356() {
      v346 = true;
      v348 = 0;
      v347 = false;
      v355(false);
    }
    function v357(v1305, v1306) {
      const v1307 = v8("topbar");
      if (!v1307) {
        return;
      }
      const v1308 = v1306 > 0 && Math.max(0, Math.min(v1305, v1306)) > 1 && !v1307.classList.contains("is-boot");
      if (v1307.classList.contains("is-compact") !== v1308) {
        v1307.classList.toggle("is-compact", v1308);
      }
      const v1309 = v1307.querySelector(".topbar-controls");
      const v1310 = v1307.querySelector(".topbar-page-title");
      if (v1309) {
        if (v1309.hasAttribute("inert") !== v1308) {
          v1309.toggleAttribute("inert", v1308);
        }
        if (v1309.getAttribute("aria-hidden") !== String(v1308)) {
          v1309.setAttribute("aria-hidden", String(v1308));
        }
      }
      if (v1310) {
        const v1311 = v351.find(v1312 => v1312.id === v16.tab)?.t || "";
        if (v1310.textContent !== v1311) {
          v1310.textContent = v1311;
        }
        if (v1310.getAttribute("aria-hidden") !== String(!v1308)) {
          v1310.setAttribute("aria-hidden", String(!v1308));
        }
      }
      v355(v1308);
    }
    function v358() {
      if (v342) {
        cancelAnimationFrame(v342);
        v342 = 0;
      }
      const v1313 = v10();
      const v1314 = v8("topbar");
      const v1315 = v9();
      if (!v1313 || !v1314) {
        return;
      }
      const v1316 = Math.max(0, v1313.scrollTop || 0);
      const v1317 = Math.max(0, v1313.scrollHeight - v1313.clientHeight);
      const v1318 = Math.min(v1316, v1317);
      if (v347 && v349 !== null && v1318 !== v349 && v348 > 0 && Date.now() - v348 < 1500) {
        v346 = false;
      }
      v347 = false;
      v349 = v1318;
      v357(v1316, v1317);
      const v1319 = v1317 - v1316;
      const v1320 = v1319 <= 1 ? 0 : 1;
      if (v1315 && v1320 !== v345) {
        v345 = v1320;
        v1315.style.setProperty("--tabbar-veil", String(v1320));
        v1315.classList.toggle("has-tabveil", v1320 > 0);
      }
    }
    function v359() {
      if (v342) {
        return;
      }
      v342 = requestAnimationFrame(() => {
        v342 = 0;
        v358();
      });
    }
    function v360() {
      const v1321 = v10();
      if (!v1321 || typeof v1321.addEventListener !== "function" || !v8("topbar")) {
        return;
      }
      if (!v343) {
        v343 = true;
        v4.bindHorizontalPages(v1321, {
          current: () => v16.tab,
          items: v351.map(v1324 => v1324.id),
          enabled: () => v199() && !v4.currentSheet() && !window.location.hash,
          preview: v1325 => "<div class=\"page\">" + v464() + (v1325 === "home" ? v400({
            preview: true
          }) : v1325 === "settings" ? v148() : v461()) + "</div>",
          progress: v1326 => {
            const v1327 = v8("tabbar");
            const v1328 = v1327.querySelector(".tab-ind");
            const v1329 = v1326 !== null;
            v1327.classList.toggle("is-swiping", v1329);
            v1328.classList.toggle("noanim", v1329);
            if (!v1329) {
              v369(false);
              return;
            }
            v1327.querySelectorAll(".tab").forEach((v1331, v1332) => v1331.style.setProperty("--tab-active", Math.max(0, 1 - Math.abs(v1326 - v1332))));
            const v1330 = Math.sin(Math.PI * (v1326 % 1));
            v1328.style.transform = "translateX(calc(" + v1326 + " * (100% + var(--tab-gap)))) scaleX(" + (1 + v1330 * 0.16) + ") scaleY(" + (1 - v1330 * 0.06) + ")";
          },
          select: v1333 => v8("tabbar").querySelector("[data-tab=\"" + v1333 + "\"]")?.click()
        });
        v1321.addEventListener("scroll", v1334 => {
          if (v1334.isTrusted !== false && v346) {
            v347 = true;
          }
          v359();
        }, {
          passive: true
        });
        const v1322 = v1335 => {
          if (v1335.isTrusted !== false) {
            v348 = Date.now();
          }
        };
        v1321.addEventListener("wheel", v1336 => {
          if (v1336.deltaY) {
            v1322(v1336);
          }
        }, {
          passive: true
        });
        v1321.addEventListener("pointerdown", v1337 => {
          v350 = v1337.clientY;
        }, {
          passive: true
        });
        v1321.addEventListener("pointermove", v1338 => {
          if (v350 !== null && Math.abs(v1338.clientY - v350) > 2) {
            v1322(v1338);
          }
        }, {
          passive: true
        });
        for (const v1339 of ["pointerup", "pointercancel"]) {
          v1321.addEventListener(v1339, () => {
            v350 = null;
          }, {
            passive: true
          });
        }
        v1321.addEventListener("keydown", v1340 => {
          if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(v1340.key) && !v1340.target?.closest?.("input, textarea, select, [contenteditable=\"true\"]")) {
            v1322(v1340);
          }
        });
        const v1323 = v8("tabbar");
        for (const v1341 of ["pointerdown", "click", "focusin"]) {
          v1323?.addEventListener(v1341, v356);
        }
        window.addEventListener("pageshow", v359);
        window.addEventListener("resize", v359);
        if (typeof ResizeObserver === "function") {
          new ResizeObserver(v359).observe(v1321);
        }
      }
      v358();
    }
    function v361() {
      const v1342 = v8("topbar");
      if (v1342 && (v1342.firstElementChild || v1342.classList.contains("is-boot"))) {
        document.documentElement.style.setProperty("--topbar-h", v1342.offsetHeight + "px");
      }
    }
    let v362 = null;
    function v363() {
      const v1343 = v16.data.home;
      const v1344 = window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v1, "media") : v1.media;
      const v1345 = (v16.data.messages?.noRead || 0) + (v1344?.replyAlertsEnabled?.() ? v16.data.marketReplies?.unread || 0 : 0);
      const v1346 = v16.vehicles.find(v1353 => v1353.vin === v16.vin);
      const v1347 = v1343?.name || v1346?.name || "我的车";
      const v1348 = v373().staleItems.length > 0;
      const v1349 = v351.find(v1354 => v1354.id === v16.tab)?.t || "";
      const v1350 = v8("topbar").classList.contains("is-compact");
      const v1351 = [v1349, v80(), v1347, v1345, v1348, v16.loading, v16.theme, v265()].join("");
      const v1352 = v8("topbar").classList.contains("is-boot");
      if (v1352) {
        v8("topbar").classList.remove("is-boot");
        v8("topbar").removeAttribute("aria-hidden");
      }
      if (!v1352 && v1351 === v362) {
        return;
      }
      v362 = v1351;
      v8("topbar").innerHTML = "\n      <div class=\"topbar-controls\"" + (v1350 ? " inert" : "") + " aria-hidden=\"" + v1350 + "\">\n      <button class=\"vswitch\" data-act=\"vehicles\">\n        <span class=\"vtext\">\n          <span class=\"vname\">" + v6(v1347) + "</span>\n        </span>\n        " + v4.icon("down", 18) + "\n      </button>\n      <span class=\"spacer\"></span>\n      " + (v1348 ? "<button class=\"iconbtn stale-data-button\" data-act=\"staledata\" title=\"数据更新延迟\" aria-label=\"数据更新延迟\" aria-haspopup=\"dialog\">" + v4.icon("alert", 22) + "</button>" : "") + "\n      <button class=\"iconbtn\" data-act=\"messages\" aria-label=\"" + (v1345 ? "消息（" + v1345 + " 条未读）" : "消息") + "\" aria-busy=\"" + v16.loading + "\" title=\"" + (v1345 ? "消息（" + v1345 + " 条未读）" : "消息") + "\">" + (v16.loading ? "<span class=\"loading-ring\" aria-hidden=\"true\"></span>" : v4.icon("bell", 22)) + (v1345 ? "<i class=\"badge-dot\"></i>" : "") + "</button>\n      <button class=\"iconbtn\" data-act=\"theme\" title=\"主题：跟随系统 / 浅色 / 深色（当前" + (v16.theme === "system" ? "跟随系统，现在是" + (v265() === "dark" ? "深色" : "浅色") : v16.theme === "dark" ? "深色" : "浅色") + "）\">" + v4.icon(v16.theme === "system" ? "auto" : v265() === "dark" ? "sun" : "moon", 22) + "</button>\n      <button class=\"iconbtn\" data-act=\"debug\" title=\"" + v80() + "\" aria-label=\"" + v80() + "\">" + v4.icon("gear", 22) + "</button>\n      </div>\n      <div class=\"topbar-page-title\" role=\"heading\" aria-level=\"1\" aria-hidden=\"" + !v1350 + "\">" + v6(v1349) + "</div>";
      v361();
    }
    function v364() {
      return (v16.vehicles || []).find(v1355 => v1355.vin === v16.vin) || null;
    }
    const v365 = () => !!v364()?.shared;
    let v366 = "";
    let v367 = false;
    function v368() {
      const v1356 = v351;
      const v1357 = v1356.map(v1361 => v1361.id).join(",");
      const v1358 = v8("tabbar");
      const v1359 = v1358.classList.contains("is-boot");
      if (v1359) {
        v1358.classList.remove("is-boot");
        v1358.removeAttribute("aria-hidden");
      }
      const v1360 = v1357 !== v366 || v1359;
      if (v1360) {
        v366 = v1357;
        v1358.innerHTML = "<span class=\"tab-ind\" aria-hidden=\"true\"></span>" + v1356.map(v1362 => "\n      <button class=\"tab\" data-act=\"tab\" data-tab=\"" + v1362.id + "\" aria-label=\"" + v6(v1362.t) + "\">\n        <span class=\"pill\">" + v4.icon(v1362.icon, 22) + "</span><span class=\"tab-label\">" + v6(v1362.t) + "</span>\n      </button>").join("");
        v367 = false;
      }
      v1358.querySelectorAll(".tab").forEach(v1363 => v1363.classList.toggle("sel", v1363.dataset.tab === v16.tab));
      if (!v1358.classList.contains("is-swiping")) {
        v369(v367);
      }
      v367 = true;
    }
    function v369(v1364) {
      const v1365 = v8("tabbar");
      const v1366 = v1365?.querySelector(".tab-ind");
      if (!v1366) {
        return;
      }
      const v1367 = v351.findIndex(v1368 => v1368.id === v16.tab);
      if (v1367 < 0) {
        v1366.style.opacity = "0";
        return;
      }
      if (!v1364) {
        v1366.classList.add("noanim");
      }
      v1366.style.opacity = "1";
      v1366.style.transform = "translateX(calc(" + v1367 + " * (100% + var(--tab-gap))))";
      if (!v1364) {
        v1366.offsetWidth;
        v1366.classList.remove("noanim");
      }
    }
    const v370 = {
      items: [],
      staleItems: [],
      unknownItems: [],
      latestAt: null,
      nextAt: null
    };
    let v371 = null;
    let v372 = null;
    function v373(v1369 = Date.now()) {
      const {
        home: v1370,
        tires: v1371,
        battery: v1372
      } = v16.data;
      if (!v16.vin || typeof v3.dataFreshness !== "function") {
        return v370;
      }
      const v1373 = v371;
      if (v1373 && v1373.home === v1370 && v1373.tires === v1371 && v1373.battery === v1372 && v1373.homeEvidence === v1370?.freshness && v1373.tireEvidence === v1371?.freshness && v1373.batteryEvidence === v1372?.freshness && v1369 >= v1373.now && v1369 < v1373.nextAt) {
        v1373.now = v1369;
        return v1373.value;
      }
      const v1374 = v3.dataFreshness({
        home: v1370,
        tires: v1371,
        battery: v1372
      }, v1369);
      const v1375 = Number.isFinite(v1374.nextAt) && v1374.nextAt > v1369 ? v1374.nextAt : Infinity;
      v371 = {
        home: v1370,
        tires: v1371,
        battery: v1372,
        homeEvidence: v1370?.freshness,
        tireEvidence: v1371?.freshness,
        batteryEvidence: v1372?.freshness,
        now: v1369,
        value: v1374,
        nextAt: Math.min(v1375, v1369 + 60000)
      };
      return v1374;
    }
    function v374(v1376) {
      const v1377 = new Date(v1376);
      const v1378 = v1379 => String(v1379).padStart(2, "0");
      return v1377.getFullYear() + "-" + v1378(v1377.getMonth() + 1) + "-" + v1378(v1377.getDate()) + " " + v1378(v1377.getHours()) + ":" + v1378(v1377.getMinutes()) + ":" + v1378(v1377.getSeconds());
    }
    function v375(v1380, v1381) {
      const v1382 = Math.floor(Math.max(0, v1381 - v1380) / 60000);
      const v1383 = Math.floor(v1382 / 60);
      if (v1382 < 60) {
        return v1382 + " 分钟前";
      } else if (v1383 < 24) {
        return v1383 + " 小时" + (v1382 % 60 ? " " + v1382 % 60 + " 分" : "") + "前";
      } else {
        return Math.floor(v1383 / 24) + " 天" + (v1383 % 24 ? " " + v1383 % 24 + " 小时" : "") + "前";
      }
    }
    function v376(v1384, v1385, v1386) {
      const v1387 = v1384.staleItems.map(v1389 => "<li class=\"stale-data-item\" data-stale-id=\"" + v6(v1389.id) + "\">\n      <b>" + v6(v1389.label) + "</b><div class=\"stale-data-time\"><span>最后设备更新</span>\n        <time datetime=\"" + new Date(v1389.at).toISOString() + "\" data-device-at=\"" + v1389.at + "\">" + v374(v1389.at) + "</time>\n        <span class=\"stale-data-ago\">" + v375(v1389.at, v1385) + "</span></div></li>").join("");
      const v1388 = v1384.unknownItems.length ? "<details class=\"stale-data-unknown\"" + (v1386 ? " open" : "") + ">\n      <summary>时间不明（" + v1384.unknownItems.length + " 项）</summary>\n      <p class=\"stale-data-intro\">没有可核对的设备更新时间，不据此判断更新延迟。</p>\n      <ul class=\"stale-data-list\">" + v1384.unknownItems.map(v1390 => "<li class=\"stale-data-item\" data-unknown-id=\"" + v6(v1390.id) + "\">\n        <b>" + v6(v1390.label) + "</b><div class=\"stale-data-time\">最后设备更新：时间不明</div></li>").join("") + "</ul>\n    </details>" : "";
      return "<p class=\"stale-data-intro\">" + v1384.staleItems.length + " 项数据超过 30 分钟未收到设备更新。云盒可能正在待机睡眠以减少耗电，数据与状态可能不及时更新；这不代表车辆发生故障。</p>\n      <ul class=\"stale-data-list\">" + v1387 + "</ul>" + v1388;
    }
    function v377() {
      const v1391 = v372;
      v372 = null;
      if (v1391?.handle) {
        v4.closeSheet(v1391.handle);
      }
    }
    function v378(v1392 = Date.now()) {
      const v1393 = v372;
      if (!v1393) {
        return;
      }
      if (!v4.sheetAlive(v1393.handle) || !v163(v1393.scope)) {
        v377();
        return;
      }
      const v1394 = v373(v1392);
      if (!v1394.staleItems.length) {
        v377();
        return;
      }
      const v1395 = Math.floor(v1392 / 60000);
      if (v1393.report === v1394 && v1393.minute === v1395) {
        return;
      }
      v1393.report = v1394;
      v1393.minute = v1395;
      const v1396 = v376(v1394, v1392, v1393.unknownOpen);
      if (v1396 === v1393.body) {
        return;
      }
      v1393.body = v1396;
      v4.updateSheet(v1393.handle, {
        body: v1396
      });
    }
    function v379() {
      const v1397 = Date.now();
      v378(v1397);
      if (v372) {
        return v372.handle;
      }
      const v1398 = v373(v1397);
      if (!v1398.staleItems.length) {
        return null;
      }
      const v1399 = {
        scope: v162(),
        handle: null,
        report: v1398,
        minute: Math.floor(v1397 / 60000),
        unknownOpen: false
      };
      v1399.body = v376(v1398, v1397, false);
      v372 = v1399;
      v1399.handle = v4.sheet(v9(), {
        key: "stale-data",
        title: "数据更新延迟",
        sub: "设备上报时间，不是本次查询时间",
        half: true,
        closeMode: "current",
        body: v1399.body,
        onMount(v1400) {
          const v1401 = v1400.querySelector(".stale-data-unknown");
          v1401?.addEventListener("toggle", () => {
            if (v372 === v1399 && v4.sheetAlive(v1399.handle)) {
              v1399.unknownOpen = v1401.open;
            }
          });
        },
        onDismiss() {
          if (v372 === v1399) {
            v372 = null;
          }
        }
      });
      return v1399.handle;
    }
    let v380 = null;
    function v381(v1402 = Date.now()) {
      return v3.vehicleConnection({
        home: v16.data.home,
        tires: v16.data.tires,
        alerts: v16.data.vehicleAlerts,
        report: v373(v1402),
        seatHidden: v225()
      }, v1402);
    }
    function v382(v1403) {
      return "<p class=\"anomaly-intro\">共 " + v1403.length + " 项需要留意。离线、拔出电池、低电量、坐垫未锁、胎压过低都会列在这里；数据更新延迟另见顶栏的提醒。</p>\n      <ul class=\"stale-data-list\">" + v1403.map(v1404 => "<li class=\"stale-data-item\" data-anomaly-id=\"" + v6(v1404.id) + "\">\n        <b>" + v6(v1404.label) + "</b><div class=\"stale-data-time\">" + v6(v1404.detail) + "</div></li>").join("") + "</ul>";
    }
    function v383() {
      const v1405 = v380;
      v380 = null;
      if (v1405?.handle) {
        v4.closeSheet(v1405.handle);
      }
    }
    function v384(v1406 = Date.now()) {
      const v1407 = v380;
      if (!v1407) {
        return;
      }
      if (!v4.sheetAlive(v1407.handle) || !v163(v1407.scope)) {
        v383();
        return;
      }
      const v1408 = v381(v1406).items;
      if (!v1408.length) {
        v383();
        return;
      }
      const v1409 = v382(v1408);
      if (v1409 === v1407.body) {
        return;
      }
      v1407.body = v1409;
      v4.updateSheet(v1407.handle, {
        body: v1409
      });
    }
    function v385() {
      const v1410 = Date.now();
      v384(v1410);
      if (v380) {
        return v380.handle;
      }
      const v1411 = v381(v1410).items;
      if (!v1411.length) {
        return null;
      }
      const v1412 = {
        scope: v162(),
        handle: null,
        body: v382(v1411)
      };
      v380 = v1412;
      v1412.handle = v4.sheet(v9(), {
        key: "anomaly",
        title: "车辆异常",
        sub: "车辆当前状态，不是数据延迟",
        half: true,
        closeMode: "current",
        body: v1412.body,
        onDismiss() {
          if (v380 === v1412) {
            v380 = null;
          }
        }
      });
      return v1412.handle;
    }
    function v386() {
      const v1413 = Date.now();
      const v1414 = v3.vehicleConnection({
        home: v16.data.home,
        tires: v16.data.tires,
        alerts: v16.data.vehicleAlerts,
        report: v373(v1413),
        seatHidden: v225()
      }, v1413);
      const v1415 = v1414.items.length ? v1414.reason + "，点开查看明细" : v1414.reason;
      if (v1414.items.length) {
        return "<span class=\"chip warn chip-tap\" data-act=\"anomaly\" role=\"button\" tabindex=\"0\" aria-label=\"" + v6(v1415) + "\" aria-haspopup=\"dialog\" title=\"" + v6(v1415) + "\"><i class=\"dot\"></i>" + v6(v1414.label) + "</span>";
      } else {
        return v4.chip(v1414.label, v1414.tone, {
          pulse: true,
          title: v1414.reason
        });
      }
    }
    function v387() {
      const v1416 = v9()?.querySelector("[data-vehicle-connection]");
      if (v1416) {
        v1416.innerHTML = v386();
      }
      try {
        v363();
      } catch (v1417) {
        console.error("renderTop failed", v1417);
      }
      try {
        v378();
      } catch (v1418) {
        console.error("stale data sheet failed", v1418);
      }
      try {
        v384();
      } catch (v1419) {
        console.error("anomaly sheet failed", v1419);
      }
    }
    const v388 = "车辆列表已获取，但本地缓存未能保存。请稍后重试，原车辆数据已保留。";
    function v389() {
      let v1420 = "";
      if (v16.lastErr) {
        if (v16.lastErr === v388) {
          v1420 = "<div class=\"note bad\">" + v4.icon("alert", 18) + "<div>\n          <b>本地保存未完成：</b>" + v6(v16.lastErr) + "\n          <div class=\"field mt8\"><button class=\"btn text sm\" data-act=\"reload\">重新加载</button></div>\n        </div></div>";
        } else if (API.offline()) {
          v1420 = "<div class=\"note bad\">" + v4.icon("alert", 18) + "<div>\n          <b>手机没有网络</b><br>连不上极核服务。下面显示的是上一次成功加载的数据快照" + (v16.data.home?.relRefresh ? "（" + v6(v16.data.home.relRefresh) + "）" : "") + "；网络恢复后 30 秒内会自动刷新。\n        </div></div>";
        } else {
          v1420 = "<div class=\"note bad\">" + v4.icon("alert", 18) + "<div>\n          <b>数据没取到：</b>" + v6(v16.lastErr) + "<br>\n          右上角齿轮里粘贴 token 就能看真车数据。\n          <div class=\"field mt8\"><button class=\"btn text sm\" data-act=\"reload\">重新加载</button></div>\n        </div></div>";
        }
      }
      const v1421 = (v16.vehicles || []).find(v1423 => v1423.vin === v16.vin) || null;
      const v1422 = v12() ? "<div class=\"note info\">" + v4.icon("info", 18) + "<div>\n        当前是<b>UI 测试预览</b>：车名、位置、行程均为合成示例。真实账号、GPS、蓝牙与车控 unavailable。\n      </div></div>" : API.source === "demo" ? "<div class=\"note info\">" + v4.icon("info", 18) + "<div>\n        当前是<b>演示数据</b>：车名、位置、行程都是虚拟样例。在 App 账号设置中登录后可读取真实数据。\n      </div></div>" : /^MNC00000$/i.test(String(v1421?.vin || "").trim()) ? "<div class=\"note info\">" + v4.icon("info", 18) + "<div>\n        当前是<b>虚拟体验</b>：车名、位置、行程都是虚拟样例。你的账号里没有真实车辆。\n      </div></div>" : "";
      return v1420 + v1422;
    }
    function v390() {
      const v1424 = v198();
      return "<div class=\"empty-vehicle\">\n      <div class=\"ev-icon\">" + v4.icon("bike", 44) + "</div>\n      <div class=\"ev-title\">还没有绑定车辆</div>\n      <div class=\"ev-sub\">这个账号名下暂无可显示的车。在极核 App 里完成绑车后，这里会自动出现。</div>\n      <div class=\"ev-acts\">\n        <button class=\"btn block\" data-act=\"reload\">" + v4.icon("refresh", 18) + "<span>重新加载</span></button>\n        " + (v1424 ? "<button class=\"btn tonal block mt8\" data-act=\"opencfmoto\">" + v4.icon("link", 18) + "<span>去极核 App 绑车</span></button>" : "") + "\n      </div>\n      <div class=\"ev-hint\">已经绑过车？可能是刚解绑或换绑，重新加载即可同步。</div>\n    </div>";
    }
    const v391 = "zeeho.chgstop.v1";
    const v392 = 86400000;
    function v393() {
      let v1425 = null;
      try {
        v1425 = v2.getJson(v2.ns(v391));
      } catch {
        v1425 = null;
      }
      if (!v1425 || !v1425.at || v1425.vin !== v16.vin) {
        return null;
      }
      const v1426 = Date.now() - Number(v1425.at);
      const v1427 = v162().owner;
      if (v1426 < 0 || v1425.ownerId && (v1425.ownerId !== (v1427?.id || "") || v1425.ownerUid !== (v1427?.uid || ""))) {
        return null;
      }
      if (v1426 > v392 && !v1425.sessionId) {
        try {
          v2.commitAsync({
            removes: [v2.ns(v391)]
          });
        } catch {}
        return null;
      }
      return v1425;
    }
    function v394(v1428, v1429) {
      const v1430 = v393();
      const v1431 = Date.now();
      const v1432 = window.CHG?.lastSession?.(v16.vin);
      const v1433 = v162().owner;
      const v1434 = v1432 && v1431 >= v1432.e && v1431 - v1432.e <= (v1429 ? 18000000 : 900000);
      const v1435 = v1434 ? v1432.id || v1432.s + "|" + v1432.e : "";
      if (v1430 && v1435 && v1430.sessionId === v1435 && v1430.full === !!v1429) {
        return;
      }
      try {
        const v1436 = v2.ns(v391);
        const v1437 = {
          at: v1431,
          vin: v16.vin,
          soc: v1428 ?? null,
          full: !!v1429,
          sessionId: v1435,
          ownerId: v1433?.id || "",
          ownerUid: v1433?.uid || ""
        };
        if (v2.requiresAsync?.()) {
          v2.commitAsync({
            puts: {
              [v1436]: JSON.stringify(v1437)
            }
          }).then(v1438 => {
            if (v1438 !== true) {
              v4.toast(v9(), "充电结束记录未能保存，请重试");
            }
          });
        } else {
          v2.setJson(v1436, v1437);
        }
      } catch {}
    }
    function v395() {
      try {
        if (v2.requiresAsync?.()) {
          return v2.commitAsync({
            removes: [v2.ns(v391)]
          });
        } else {
          return v2.remove(v2.ns(v391));
        }
      } catch {
        return false;
      }
    }
    function v396(v1439) {
      if (v1439 === "range") {
        return {
          view: v1439,
          key: "range",
          unit: "km",
          label: "续航",
          title: "点一下收起读数",
          next: "dot"
        };
      }
      if (v1439 === "dot") {
        return {
          view: v1439,
          key: "volt",
          unit: "V",
          label: "",
          title: "点一下看电压",
          next: "volt"
        };
      }
      return {
        view: "volt",
        key: "volt",
        unit: "V",
        label: "电压",
        title: "点一下看续航",
        next: "range"
      };
    }
    function v397(v1440, v1441) {
      v1440.dataset.view = v1441.view;
      v1440.title = v1441.title;
      v1440.setAttribute("aria-label", v1441.title);
      const v1442 = v1440.closest(".dashboard-readout")?.querySelector(".dashboard-readout-label");
      if (v1442) {
        v1442.textContent = v1441.label;
        v1442.hidden = !v1441.label;
      }
    }
    function v398() {
      if (v365() || API.authFailed || API.source !== "demo" && !API.token && !API.loadToken()) {
        return {
          svc: null,
          left: "—"
        };
      }
      const v1443 = v16.data.service?.serviceRechargeVehicleList;
      if (!Array.isArray(v1443)) {
        return {
          svc: null,
          left: "—"
        };
      }
      const v1444 = String(v16.vin || v16.data.home?.vin || "").trim();
      const v1445 = v1447 => String(v1447?.vinNo || v1447?.vin || "").trim();
      const v1446 = v1443.find(v1448 => v1444 && v1445(v1448) === v1444) || (v1443.length === 1 && !v1445(v1443[0]) ? v1443[0] : null);
      return {
        svc: v1446,
        left: v1446 ? v137(v1446.rechargeEndDate || v1446.rechargeEndTime) : "—"
      };
    }
    function v399(v1449) {
      const v1450 = v1449 && Object.getOwnPropertyDescriptor(v1449, "raw")?.value;
      const v1451 = (v1453, v1454, v1455) => typeof v1454 === "boolean" && (!v1450 || v1455.includes(String(v1450[v1453] ?? "").trim().toLowerCase()));
      const v1452 = ["1", "0", "true", "false", "y", "n", "yes", "no"];
      if (v1449) {
        return {
          online: v1451("onlineStatus", v1449.online, ["online", "offline", "1", "0", "true", "false"]),
          lock: v1451("headLockState", v1449.headLock, v1452),
          seat: v1451("seatLockState", v1449.seatLock, v1452)
        };
      } else {
        return null;
      }
    }
    function v400({
      preview = false
    } = {}) {
      const v1456 = v16.data.home;
      const v1457 = v389() + v64();
      if (v16.noVehicle && !v16.loading && !v16.lastErr) {
        return v390();
      }
      if (!v1456) {
        if (API.authFailed || v16.lastErr && !v16.loading) {
          return v1457;
        } else {
          return v1457 + v462();
        }
      }
      const v1458 = v16.data.battery || {};
      const v1459 = v16.data.tires;
      const v1460 = v16.data.rideMonth;
      const v1461 = v16.data.rideHome;
      const v1462 = v16.data.analyse;
      const v1463 = v1456.soc;
      const v1464 = Object.fromEntries(v280.map(v1558 => [v1558, v1558 === "cushion" && v226() ? "" : v408(v270.find(v1559 => v1559.id === v1558), v1456)]));
      const v1465 = v280.map(v1560 => v1464[v1560]).join("");
      const v1466 = v1458.voltage ?? v1458.bmsVoltage ?? null;
      const v1467 = v1.batteryRange ? v1.batteryRange.readout(v1456, v1458) : v1456.range ?? null;
      const v1468 = v396(v16.voltView);
      const v1469 = v1468.key === "range" ? v1467 : v1466;
      const v1470 = "车辆锁 = 整车开机/关机状态：已关锁 = 关机，已开锁 = 开机";
      const v1471 = v4.chip(v1456.headLock ? "已关锁" : "已开锁", v1456.headLock ? "" : "accent", {
        title: v1470
      });
      const v1472 = v225() ? "" : v4.chip("坐垫" + (v1456.seatLock == null ? "未知" : v1456.seatLock ? "已锁" : "未锁"), v1456.seatLock == null || v1456.seatLock ? "" : "warn", {
        title: "坐垫锁 = 座垫那条锁的状态（seatLockState，1 = 已锁），与整车开关机是两回事"
      });
      const v1473 = ["<span data-vehicle-connection>" + v386() + "</span>", v1456.charge.charging ? v4.chip("充电中", "charge", {
        pulse: true
      }) : v1456.charge.full ? v4.chip("已充满", "ok", {
        pulse: true
      }) : "", v1472, "<span class=\"spacer\"></span>", v1471].filter(Boolean).join("");
      if (v468 && !preview) {
        v470 = performance.now();
        v468 = false;
      }
      const v1474 = v465 || v473();
      if (!preview) {
        v465 = false;
      }
      const v1475 = v473() ? v474() : null;
      const v1476 = !!v1459?.wheels?.length && !v466;
      if (v1459?.wheels?.length && !preview) {
        v466 = true;
      }
      const v1477 = v1474 && v1475 ? Math.round(v1475) : 0;
      const v1478 = v1.vehicleStyle ? v1.vehicleStyle.presentation(v1456.vin || v16.vin, v1456) : null;
      const v1479 = v197(v1456.vin || v16.vin);
      const v1480 = v1456.scalePic || v1456.pic || "";
      const v1481 = v1478 && v1478.channel === "pic" && v1478.url ? v1478.url : "";
      const v1482 = v1481 || (v1479 ? v1479 + ".webp" : v1480);
      const v1483 = v1481 ? "" : v1479;
      const v1484 = !!v1481 || !!v1479;
      const v1485 = v1478 && v1478.channel === "pic3d" && v1478.url ? v1478.url : "";
      const v1486 = v1478 && v1478.channel === "pic3d" ? v1478 : null;
      const v1487 = "<div class=\"hero-top\" data-dashboard-critical=\"status\">" + v1473.replace(" title=\"" + v6(v1470) + "\"", " data-dashboard-critical=\"lock-status\" title=\"" + v6(v1470) + "\"") + "</div>";
      const v1488 = "<div class=\"bignum left\" data-dashboard-critical=\"soc\">\n      <b class=\"tnum\" style=\"color:" + v1456.socColor.color + "\">" + (v1463 === null || v1463 === undefined ? "<span>—</span>" : "<span data-num=\"" + v1463 + "\" data-key=\"soc\">" + v1463 + "</span><i>%</i>") + "</b>\n    </div>";
      const v1489 = "<div class=\"bignum right volt" + (v1468.view === "dot" ? " hide" : "") + "\" data-act=\"volt\" data-view=\"" + v1468.view + "\" title=\"" + v1468.title + "\" aria-label=\"" + v1468.title + "\">\n      <b class=\"tnum vnum\">" + (v1469 === null ? "—" : "<span data-num=\"" + v1469 + "\" data-key=\"" + v1468.key + "\">" + v1469 + "</span>") + "<i>" + v1468.unit + "</i></b>\n      <span class=\"vdot\"></span>\n    </div>";
      const v1490 = "" + (v1482 ? "<img class=\"hero-pic" + (v1484 ? " hero-art" : "") + (v1474 ? " hero-in" : "") + "\"" + (v1477 ? " style=\"animation-delay:-" + v1477 + "ms\"" : "") + " src=\"" + v6(v1482) + "\" alt=\"" + v6(v1456.name) + "\" data-art=\"" + v6(v1483) + "\" data-art-ext=\"" + (v1483 ? "webp" : "") + "\"" + (v1483 && v1480 ? " data-fb=\"" + v6(v1480) + "\"" : "") + " onerror=\"window.__zeehoPicError(this, " + (v1474 ? "true" : "false") + ", " + v1477 + ")\">" : v4.fallbackScooter(v1474, v1477));
      const v1491 = "<div class=\"vs-model-fallback\">" + v1490 + "</div>";
      const v1492 = v1486 && v1486.status !== "ready" ? "<div class=\"vs-model-status\" role=\"status\">" + (v1486.status === "loading" ? v4.spinner(v1486.statusText || "正在加载车辆模型…") : v6(v1486.statusText || "模型加载失败")) + (v1486.status === "error" ? "<button type=\"button\" class=\"btn text sm\" data-vs-act=\"retry-model\">重试</button>" : "") + "</div>" : "";
      const v1493 = "\n      " + v407("前轮", v1459?.wheels?.find(v1561 => v1561.pos === "前轮"), "left", v1476) + "\n      " + v407("后轮", v1459?.wheels?.find(v1562 => v1562.pos === "后轮"), "right", v1476);
      const v1494 = v1486?.orbit ? " camera-orbit=\"" + v6(v1486.orbit.theta) + "deg " + v6(v1486.orbit.phi) + "deg 2.6m\"" : " camera-orbit=\"0deg 90deg 2.6m\"";
      const v1495 = "camera-controls touch-action=\"pan-y\" interaction-prompt=\"none\" shadow-intensity=\"1\" exposure=\"1\"" + v1494 + " camera-target=\"0m auto auto\" min-camera-orbit=\"-90deg 0deg auto\" max-camera-orbit=\"90deg 180deg auto\" interpolation-decay=\"200\" disable-tap disable-zoom disable-pan";
      const v1496 = v1485 ? "<model-viewer class=\"hero-3d" + (v1474 ? " hero-in" : "") + "\" src=\"" + v6(v1485) + "\" data-vs-model=\"" + v6(v1486.id || "") + "\" data-vs-vin=\"" + v6(v1456.vin || v16.vin || "") + "\" alt=\"" + v6(v1456.name) + " 三维车辆\" " + v1495 + " loading=\"eager\" reveal=\"auto\">" + v1491 + "</model-viewer>" + v1492 + v1493 : "" + v1490 + v1493;
      const v1497 = v4.socBar(v1463 ?? 0, v1456.socColor.color, v1456.charge.charging, v1475 === null ? false : v1475);
      const v1498 = "<div class=\"hero-meta\">\n      <span>总里程 <span class=\"tnum\" data-num=\"" + (v1456.totalMile ?? "") + "\" data-key=\"totalMile\">" + (v1456.totalMile ?? "—") + "</span> km</span><i class=\"sep\"></i>\n      " + (v1456.signal.text ? "<span>信号 " + v6(v1456.signal.text) + "</span><i class=\"sep\"></i>" : "") + "\n      <span data-rel=\"homeSync\">" + (v1456.refreshAt ? "同步于 " + v3.relTime(v1456.refreshAt) : "等车机上报") + "</span>\n    </div>";
      const v1499 = v4.card(v1487 + ("<div class=\"hero-stage\">" + v1488 + v1496 + v1489 + "</div>") + v1497 + v1498, "hero-card");
      const v1500 = window.CAPBOOK?.scale?.(v16.vin) === 2 ? 2 : 1;
      const v1501 = v1563 => v1563 != null && v1563 !== "" && Number.isFinite(Number(v1563)) ? Number(v1563) * v1500 : null;
      const v1502 = v1501(v1458.amp ?? v1456.amp ?? v1458.current ?? null);
      const v1503 = v1501(v1458.watt ?? v1456.watt ?? null);
      const v1504 = [v1458.temp, v1456.temp].find(v1564 => v1564 !== null && v1564 !== undefined && Number(v1564) !== 0);
      const v1505 = v1504 === undefined ? null : v1504;
      const v1506 = [v405("充电功率", v1503 ?? "—", "W", "", "chgPower"), v1505 !== null ? v405("电池温度", v1505, "℃", "", "chgTemp") : "", v405("充电电流", v1502 ?? "—", "A", "", "chgCurrent")].filter(Boolean);
      const v1507 = v1456.charge.charging && window.CHG ? window.CHG.fit(window.CHG.log(v16.vin).pts) : null;
      const v1508 = v1456.charge.charging ? "充电中" + (v1507?.at ? "，预计 " + window.CHG.fmtClock(v1507.at) + " 充满" : "") : v1456.charge.text;
      const v1509 = v1456.charge.chargedFor ? "已充时间 " + v1456.charge.chargedFor : "";
      const v1510 = v1456.charge.charging ? "<div data-act=\"chargesheet\" style=\"cursor:pointer\">" + v4.card(v4.cardHead(v1508, v1509, "<button class=\"iconbtn sm\" data-act=\"chargesheet\" title=\"充电曲线与预计充满时间\">" + v4.icon("right", 18) + "</button>", "bolt") + ("<div class=\"" + (v1506.length === 3 ? "grid3" : "grid2") + "\">" + v1506.join("") + "</div>")) + "</div>" : "";
      const v1511 = v202() ? null : window.CHG?.lastSession(v16.vin);
      const v1512 = v1.isIOS?.() ? "" : v1.chg.recentChargeCard(v1511, v1456, v1458, v393());
      const v1513 = v1456.loc;
      const v1514 = v365();
      const v1515 = v1514 ? "" : " sm";
      const v1516 = v1514 ? "iconbtn" : "iconbtn sm";
      const v1517 = v1513.has ? v438("home", "位置", v1514 ? 20 : 18, v1516) : "";
      const v1518 = v1513.has ? "<button class=\"" + v1516 + "\" data-act=\"navigate\" title=\"选择导航地图\" aria-label=\"选择导航地图\">" + v4.icon("nav", v1514 ? 20 : 18) + "</button>" : "";
      const v1519 = v1.dashboardTheme?.usesWidget?.("location-text") === true;
      const v1520 = v1.dashboardTheme?.usesWidget?.("location-map") === true;
      const v1521 = v1519 || v1520 ? "" : !v1513.has ? "<div class=\"mapbox" + v1515 + "\"><div class=\"mapload\">车况里没有定位</div></div>" : v16.locShown ? "<div data-act=\"bigmap\" title=\"点开大地图\" style=\"cursor:zoom-in\">" + v4.mapBox(v1513.lng, v1513.lat, {
        tile: v16.tile,
        masked: false,
        act: false,
        sm: !v1514,
        w: v9().clientWidth || 430
      }) + "</div>" : v419(v1515, v416());
      const v1522 = v1513.altitude !== null ? Math.round(v1513.altitude) + " m" : "—";
      const v1523 = v4.cardHead("车辆位置", "", v1517 + v1518, "pin");
      const v1524 = "<div class=\"loc-meta\"><span>" + v6(v1513.time || "—") + " 更新</span><span>海拔 " + v1522 + "</span></div>";
      const v1525 = v1513.lat !== null && v1513.lng !== null;
      const v1526 = v1525 ? v1513.lat.toFixed(5) + ", " + v1513.lng.toFixed(5) : "";
      const v1527 = v1525 ? "<div class=\"wide\"><span>坐标</span><b class=\"mono\" data-loc=\"coord\" data-real=\"" + v6(v1526) + "\" data-map-key=\"home\">" + (v16.locShown ? v6(v1526) : "已打码") + "</b></div>" : "";
      const v1528 = v1514 ? v4.card(v1523 + ("<div class=\"loc-row\">\n          <div>" + v1521 + "</div>\n          <div class=\"loc-meta-col\">\n            <div><span>更新</span><b>" + v6(v1513.time || "—") + "</b></div>\n            <div><span>海拔</span><b>" + v1522 + "</b></div>\n            " + v1527 + "\n          </div>\n        </div>")) : v4.card(v1523 + v1521 + v1524);
      const v1529 = v4.cardHead("最近骑行", "", "<button class=\"iconbtn" + (v1514 ? "" : " sm") + "\" data-act=\"ride\" title=\"全部记录\">" + v4.icon("right", v1514 ? 20 : 18) + "</button>", "route");
      const v1530 = "<div class=\"grid2\">\n      " + v405("今日", v1461?.todayMile ?? "—", "km", "", "todayMile") + "\n      " + v405("本月", v1456.monthMile ?? "—", "km", "", "monthMile") + "\n      " + v405("时长", v3.minutesShort(v1456.monthMinutes), "", "", "monthMinutes", {
        num: v1456.monthMinutes,
        fmt: "minutesShort"
      }) + "\n      " + v405("均速", v1456.avgSpeed ?? "—", "km/h", "", "avgSpeed") + "\n    </div>";
      const v1531 = v1460?.days?.length ? v4.bars(v1460.days, "km", v1475) : "";
      const v1532 = v1514 ? "" : "<section class=\"card ride-card\" data-act=\"ride\" title=\"查看全部记录\">" + v1529 + v1530 + (v1531 ? "<div class=\"mt8\">" + v1531 + "</div>" : "") + "</section>";
      const v1533 = "<div class=\"actions\"" + (v226() ? " data-dashboard-actions=\"two\"" : "") + ">" + v1465 + "</div>";
      const v1534 = "<div class=\"card-sub center\" data-rel=\"footer\">" + v403() + "</div>";
      const v1535 = v399(v1456);
      const v1536 = (v1565, v1566, v1567 = "", v1568 = "", v1569 = "") => "<div class=\"dashboard-status-orb" + (v1567 ? " " + v1567 : "") + "\"" + (v1568 ? " data-dashboard-critical=\"" + v1568 + "\"" : "") + (v1569 ? " title=\"" + v6(v1569) + "\"" : "") + "><span class=\"dashboard-status-icon\">" + v4.icon(v1565, 20) + "</span><span class=\"dashboard-status-label\">" + v6(v1566) + "</span></div>";
      const v1537 = v1535.online;
      const v1538 = v1535.lock;
      const v1539 = v1456.charge.known !== false && (v1456.charge.known === true || v1456.charge.charging || v1456.charge.full || !Object.getOwnPropertyDescriptor(v1456, "raw")?.value && !!v1456.charge.text);
      const v1540 = "<div class=\"dashboard-status-orbs\" data-dashboard-critical=\"status\">" + (v1536(v1538 && !v1456.headLock ? "unlock" : "lock", v1538 ? v1456.headLock ? "已关锁" : "已开锁" : "车锁未知", v1538 && !v1456.headLock ? "accent" : "", "lock-status", v1470) + (v225() ? "" : v1536("seat", !v1535.seat ? "坐垫未知" : v1456.seatLock ? "坐垫已锁" : "坐垫未锁", v1535.seat && !v1456.seatLock ? "warn" : "")) + (!v1537 || !v1456.online ? v1536("link", v1537 ? "离线" : "在线未知", v1537 ? "warn" : "") : "") + (v1539 && !v1456.charge.charging && !v1456.charge.full ? "" : v1536("bolt", v1539 ? v1456.charge.full ? "已充满" : "充电中" : "充电未知", v1539 ? "charge" : ""))) + "</div>";
      const v1541 = typeof v1463 === "number" && Number.isFinite(v1463) ? Math.min(100, Math.max(0, v1463)) : null;
      const v1542 = "<div class=\"dashboard-readout\" aria-label=\"电量\"><div class=\"dashboard-soc-ring\">\n      <svg viewBox=\"0 0 36 36\" aria-hidden=\"true\" style=\"aspect-ratio:1;transform:rotate(-90deg)\">\n        <circle class=\"dashboard-soc-track\" cx=\"18\" cy=\"18\" r=\"14\" pathLength=\"100\" fill=\"none\" stroke-width=\"4\"/>\n        <circle class=\"dashboard-soc-fill\" cx=\"18\" cy=\"18\" r=\"14\" pathLength=\"100\" fill=\"none\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-dasharray=\"" + (v1541 ?? 0) + " " + (100 - (v1541 ?? 0)) + "\" stroke=\"" + v6(v1456.socColor.color) + "\" style=\"stroke-dasharray:" + (v1541 ?? 0) + " " + (100 - (v1541 ?? 0)) + ";stroke-dashoffset:0;" + (v1541 === null || v1541 === 0 ? "visibility:hidden;" : "") + "\"/>\n      </svg><div class=\"dashboard-soc-value\">" + v1488.replace("data-key=\"soc\"", "data-key=\"soc\" data-num-static").replace("color:" + v1456.socColor.color, v1456.socColor.key === "ok" ? "color:var(--md-sys-color-on-surface)" : "color:" + v1456.socColor.color) + "</div>\n    </div></div>";
      const v1543 = v16.locShown && v1513.has ? "bigmap" : "reveal";
      const v1544 = "<div class=\"dashboard-location-text\"><div class=\"dashboard-location-name\"><span data-fit data-act=\"" + v1543 + "\" data-map-key=\"home\" role=\"button\" tabindex=\"0\"" + (v1543 === "bigmap" ? " title=\"点开大地图\" style=\"cursor:zoom-in\"" : "") + ">" + v6(v16.locShown ? v1513.address || "—" : "已隐藏位置") + "</span>" + v438("home") + "</div><div class=\"dashboard-location-time\">" + v6(v1513.time || "—") + " 更新</div></div>";
      const v1545 = v1520 && !v16.locShown && v1513.has ? v416() : null;
      const v1546 = v1520 && v16.locShown && v1513.has ? v4.mapBox(v1513.lng, v1513.lat, {
        tile: v16.tile,
        masked: false,
        act: false,
        w: v9().clientWidth || 430,
        h: v9().clientWidth || 430
      }) : "";
      const v1547 = v1520 ? "<div class=\"dashboard-location-map\">\n      <div class=\"dashboard-location-map-viewport\"" + (v1513.has ? " data-act=\"" + v1543 + "\" data-map-key=\"home\" role=\"button\" tabindex=\"0\" aria-label=\"" + (v16.locShown ? "点开大地图" : "显示车辆位置") + "\"" : "") + ">" + (v1546 || "<div class=\"mapload\">" + (v1545 ? v417(v1545, 24) : v4.icon("pin", 24)) + "</div>") + "</div>\n      <div class=\"dashboard-location-map-caption\"" + (v1513.has ? " data-act=\"" + v1543 + "\" data-map-key=\"home\" role=\"button\" tabindex=\"0\"" : "") + ">\n        <div class=\"dashboard-location-map-address\"><span" + (v1545 ? " data-nearby-title" : "") + ">" + v6(v1545?.title ?? (v1513.has ? v1513.address || "—" : "暂无车辆定位")) + "</span></div>\n        <div class=\"dashboard-location-map-label\"" + (v1545 ? " data-nearby-rssi data-fallback=\"车辆定位\"" : "") + ">" + (v1545?.signal || "车辆定位") + "</div>\n      </div>\n      " + (v1513.has ? "<div class=\"dashboard-location-map-controls\">" + v438("home") + "</div>" : "") + "\n    </div>" : "";
      const v1548 = v1514 ? "" : "<div class=\"dashboard-recent-ride\" data-act=\"ride\" role=\"button\" tabindex=\"0\" aria-label=\"查看骑行记录\">\n      <div class=\"dashboard-recent-ride-main\">\n        <div class=\"dashboard-recent-ride-head\"><span>最近骑行</span>" + v4.icon("right", 18) + "</div>\n        <div class=\"dashboard-recent-ride-value\" data-fit>" + v6(v1461?.lastMile ?? "—") + "<small>km</small></div>\n      </div>\n      <div class=\"dashboard-recent-ride-total\"><span>总里程</span><b data-fit>" + v6(v1456.totalMile ?? "—") + "<small>km</small></b></div>\n    </div>";
      const v1549 = v1514 ? "" : "<div class=\"dashboard-ride-summary\" data-act=\"ride\" title=\"查看全部记录\">" + v4.cardHead("骑行统计", "", "<button class=\"iconbtn sm\" data-act=\"ride\" title=\"全部记录\">" + v4.icon("right", 18) + "</button>", "route") + "<div class=\"grid3\">" + (v405("本月里程", v1456.monthMile ?? "—", "km", "", "monthMile") + v405("本月时长", v3.minutesShort(v1456.monthMinutes), "", "", "monthMinutes", {
        num: v1456.monthMinutes,
        fmt: "minutesShort"
      }) + v405("总里程", v1456.totalMile ?? "—", "km", "", "totalMile")) + "</div></div>";
      const v1550 = "<div class=\"dashboard-tire-readout\"><span class=\"dashboard-row-label\">胎压</span>" + ["前轮", "后轮"].map((v1570, v1571) => {
        const v1572 = v1459?.wheels?.find(v1574 => v1574.pos === v1570);
        const v1573 = v1572 && typeof v1572.pressure === "number" && Number.isFinite(v1572.pressure) ? v407(v1570, v1572, v1571 ? "right" : "left", false) : "";
        return "<div class=\"dashboard-tire-item\"><span>" + v1570 + "</span>" + (v1573 || "<span class=\"tnum\">—</span>") + "</div>";
      }).join("") + "</div>";
      const v1551 = v398();
      const v1552 = v1551.svc && v1551.left !== "—" && API.source !== "demo" ? v71() : null;
      const v1553 = v1552?.active && v1552.svc === v1551.svc ? " data-act=\"svipsheet\" role=\"button\" tabindex=\"0\"" : "";
      const v1554 = "<div class=\"dashboard-service-days\"" + v1553 + "><span class=\"dashboard-row-label\">智能服务</span><span class=\"dashboard-service-value\">" + (v1551.left === "—" ? "—" : v1551.left + " 天") + "</span></div>";
      const v1555 = {
        "vehicle-card": v1499,
        "vehicle-status": v1487,
        "status-orbs": v1540,
        "soc-ring": v1542,
        "battery-level": "<div class=\"dashboard-readout\"><span class=\"dashboard-readout-label\">电量</span>" + v1488 + "</div>",
        "battery-voltage": "<div class=\"dashboard-readout\"><span class=\"dashboard-readout-label\"" + (v1468.label ? "" : " hidden") + ">" + v1468.label + "</span>" + v1489 + "</div>",
        "vehicle-stage": "<div class=\"hero-stage dashboard-vehicle\">" + v1496 + "</div>",
        "vehicle-art": "<div class=\"hero-stage dashboard-vehicle\">" + (v1485 ? "<model-viewer class=\"hero-3d" + (v1474 ? " hero-in" : "") + "\" src=\"" + v6(v1485) + "\" data-vs-model=\"" + v6(v1486?.id || "") + "\" data-vs-vin=\"" + v6(v1456.vin || v16.vin || "") + "\" alt=\"" + v6(v1456.name) + " 三维车辆\" " + v1495 + " loading=\"eager\" reveal=\"auto\">" + v1491 + "</model-viewer>" + v1492 + v1493 : v1490) + "</div>",
        "soc-bar": v1497,
        "vehicle-meta": v1498,
        actions: v1533,
        "action-search": v1464.search,
        "action-carlock": v1464.carlock,
        "action-cushion": v1464.cushion,
        "charge-card": v1510 ? "<div data-dashboard-critical=\"charge\">" + v1510 + "</div>" : "",
        "last-charge-card": v1512,
        "location-card": v1528,
        "location-text": v1544,
        "location-map": v1547,
        "ride-summary": v1549,
        "ride-recent": v1548,
        "tire-readout": v1550,
        "service-days": v1554,
        "ride-card": v1532,
        "ride-stats": v1514 ? "" : "<div class=\"dashboard-ride-stats\" data-act=\"ride\">" + v1529 + v1530 + "</div>",
        "ride-bars": v1514 || !v1531 ? "" : "<div class=\"dashboard-chart\" data-act=\"ride\">" + v1531 + "</div>",
        footer: v1534
      };
      const v1556 = "" + v1499 + v1533 + v1555["charge-card"] + (v1514 ? v1528 : "<div class=\"duo\">" + v1528 + v1532 + "</div>") + v1512 + v1534;
      const v1557 = v1.dashboardTheme ? v1.dashboardTheme.render(v1555, v1556) : "<div class=\"dashboard\" data-dashboard-default>" + v1556 + "</div>";
      return "" + v1457 + v1557;
    }
    function v401() {
      const v1575 = v1.shell?.ios?.info?.();
      const v1576 = String(v1575?.version || "").trim();
      const v1577 = String(v1575?.build || "").trim();
      if (v1576) {
        return "" + v1576 + (v1577 ? " (" + v1577 + ")" : "");
      } else {
        return "读取中…";
      }
    }
    function v402() {
      if (v202()) {
        const v1578 = String(v1.shell?.ios?.info?.()?.version || "").trim();
        if (v1578) {
          return "iOS " + v1578;
        } else {
          return "";
        }
      }
      if (v198()) {
        try {
          const v1579 = window.ZeehoShell.appVersion?.() || "";
          const v1580 = String(v1579).split("(")[0].trim();
          if (v1580) {
            return "APP " + v1580;
          } else {
            return "";
          }
        } catch {}
      }
      return "";
    }
    function v403() {
      const v1581 = v402();
      const v1582 = v16.dataCached ? v16.cacheSnapshotAt : v16.lastLoad;
      const v1583 = v1582 > 0 ? new Date(v1582).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }) : "—";
      return (v1581 ? v1581 + " · " : "") + "V" + v7 + " · " + v1583 + " 更新" + (v16.dataCached ? " (Cache)" : "");
    }
    const v404 = v1584 => v1584 === "warn" || v1584 === "bad" ? v1584 : "";
    function v405(v1585, v1586, v1587 = "", v1588 = "", v1589 = "", v1590 = {}) {
      const v1591 = v1586 === null || v1586 === undefined || v1586 === "" || v1586 === "—";
      const v1592 = typeof v1586 === "number" ? v1586 : v1590.num;
      const v1593 = !v1591 && v1589 && typeof v1592 === "number" && Number.isFinite(v1592);
      const v1594 = v1593 ? " data-num=\"" + v1592 + "\" data-key=\"" + v6(v1589) + "\"" + (v1590.fmt ? " data-fmt=\"" + v6(v1590.fmt) + "\"" : "") : "";
      return "<div class=\"tile\">\n      <span class=\"k\">" + v6(v1585) + "</span>\n      <span class=\"v tnum\">" + (v1591 ? "—" : "<span" + v1594 + ">" + v6(v1586) + "</span>") + (!v1591 && v1587 ? "<small>" + v6(v1587) + "</small>" : "") + "</span>\n      " + (v1588 ? "<span class=\"s\">" + v6(v1588) + "</span>" : "") + "\n    </div>";
    }
    function v406(v1595, v1596 = {}) {
      const v1597 = v1595.filter(v1601 => v1601.v !== null && v1601.v !== undefined && v1601.v !== "" && v1601.v !== "—" && (!v1601.zeroNA || Number(v1601.v) !== 0));
      if (!v1597.length) {
        return "";
      }
      const v1598 = v1596.compact ? v1597.filter(v1602 => !v1602.extra) : v1597;
      const v1599 = Math.max(v1598.length, 1);
      const v1600 = v1599 === 2 || v1599 === 4 ? 2 : v1599 >= 3 ? 3 : 1;
      return "<div class=\"statgrid" + (v1596.compact ? " compact" : "") + "\" style=\"grid-template-columns:repeat(" + v1600 + ",1fr)\">" + v1597.map(v1603 => v4.stat(v1603.k, v1603.v, v1603.u || "", v1603.cls || "", v1603.opts || {}, v1603.extra ? " stat-extra" : "")).join("") + "</div>";
    }
    function v407(v1604, v1605, v1606, v1607) {
      if (!v1605 || v1605.pressure === null) {
        return "";
      }
      const v1608 = v1605.level || "ok";
      const v1609 = v1605.warnCode >= 2 ? " · 车机报警" : v1605.warnCode === 1 ? " · 车机提醒" : "";
      const v1610 = v1605.band;
      const v1611 = (v1608 === "warn" || v1608 === "bad") && v1610 ? " · 正常 " + v1610.lo.toFixed(1) + "–" + v1610.hi.toFixed(1) : "";
      const v1612 = v1604 + " " + v1605.pressure.toFixed(1) + " bar" + (v1605.temp !== null ? " · " + v1605.temp + " ℃" : "") + v1609 + v1611;
      const v1613 = v1605.time ? " data-rel=\"tireRel\" data-t=\"" + v6(v1605.time) + "\" data-tip=\"" + v6(v1612) + "\"" : "";
      const v1614 = v1605.time ? v1612 + "（" + v3.relTime(v1605.time) + "）" : v1612;
      const v1615 = v1605.temp !== null ? "<span class=\"pt tnum\">" + v1605.temp + "°</span>" : "";
      return "<div class=\"tirebub " + v1606 + " " + v1608 + (v1607 ? " in" : "") + "\"" + v1613 + " data-act=\"tirehist\" data-tire=\"" + v6(v1604) + "\" role=\"button\" tabindex=\"0\" aria-label=\"" + v6(v1614) + "，查看历史曲线\" title=\"" + v6(v1614) + "\">" + ("<span class=\"pv tnum\">" + v1605.pressure.toFixed(1) + "</span><span class=\"pu\">bar</span>") + v1615 + "</div>";
    }
    function v408(v1616, v1617) {
      if (v1616.more) {
        return "<button class=\"action\" data-act=\"action\" data-id=\"more\">\n        <span class=\"ico\">" + v4.icon("more", 20) + "</span><span class=\"lbl\">更多</span><span class=\"st\">能力表</span></button>";
      }
      if (v1616.id === "carlock" || v1616.id === "search") {
        const v1618 = v1616.id === "carlock";
        const v1619 = v1618 && !!v1617?.headLock;
        const v1620 = v1618 ? v1619 ? "unlock" : "lock" : "horn";
        const v1621 = v1618 ? v1619 ? "开锁" : "关锁" : "寻车";
        const v1622 = v1618 ? v1619 ? "长按开锁" : "点按关锁" : "点按寻车 · 长按高声寻车";
        return "<button class=\"action hold\" data-dashboard-critical=\"" + v1616.id + "\" data-act=\"action\" data-id=\"" + v1616.id + "\" title=\"" + v1622 + "\">\n        <span class=\"ico\">" + v4.icon(v1620, 18) + v409() + "</span>\n        <span class=\"lbl\">" + v1621 + "</span>\n      </button>";
      }
      return "<button class=\"action\" data-dashboard-critical=\"" + v1616.id + "\" data-act=\"action\" data-id=\"" + v1616.id + "\">\n      <span class=\"ico\">" + v4.icon(v1616.icon, 18) + "</span>\n      <span class=\"lbl\">" + v6(v1616.t) + "</span>\n    </button>";
    }
    function v409() {
      return "<svg class=\"ring\" viewBox=\"0 0 36 36\" aria-hidden=\"true\">\n      <circle class=\"bg\" cx=\"18\" cy=\"18\" r=\"15.5\"/>\n      <circle class=\"fg\" cx=\"18\" cy=\"18\" r=\"15.5\" pathLength=\"100\"/>\n    </svg>";
    }
    const v410 = 30000;
    let v411 = null;
    let v412 = 0;
    function v413() {
      if (v12()) {
        return false;
      }
      if (v202()) {
        return window.IOSBR?.has?.("ble.nearby") === true;
      }
      return ["nearbyForeground", "beginNearbyVehicle", "cancelNearbyVehicle"].every(v1623 => typeof window.ZeehoShell?.[v1623] === "function");
    }
    function v414() {
      const v1624 = v16.data.home;
      if (API.source !== "direct" || !API.token || API.authFailed || !v16.vin || v1624?.vin !== v16.vin) {
        return null;
      }
      const v1625 = typeof v1624.bt === "string" ? v1624.bt.trim().replace(/-/g, ":").toUpperCase() : "";
      const v1626 = typeof v1624.btName === "string" ? v1624.btName.trim() : "";
      const v1627 = /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/.test(v1625) && !/^(00:){5}00$|^(FF:){5}FF$/.test(v1625) ? v1625 : "";
      const v1628 = /^ZEEHO-[A-Za-z0-9]{4,32}$/i.test(v1626) ? v1626 : "";
      if (v202() ? v1628 : v1627 || v1628) {
        return {
          address: v1627,
          broadcast: v1628
        };
      } else {
        return null;
      }
    }
    function v415(v1629, v1630 = v414()) {
      return !!v1630 && v163(v1629.scope) && v1630.address === v1629.target.address && v1630.broadcast === v1629.target.broadcast;
    }
    function v416() {
      const v1631 = v411;
      const v1632 = !v16.locShown && !document.hidden && v1631?.expires > Date.now() && v415(v1631) ? v1631.rssi : null;
      if (v1632 === null) {
        return {
          icon: "eyeOff",
          title: "已隐藏位置",
          signal: ""
        };
      } else {
        return {
          icon: "radar",
          title: "车在附近",
          signal: v1632 + " dBm"
        };
      }
    }
    function v417(v1633, v1634) {
      return "<span data-nearby-icon=\"" + v1634 + "\" data-icon=\"" + v1633.icon + "\" aria-hidden=\"true\">" + v4.icon(v1633.icon, v1634) + "</span>";
    }
    function v418(v1635) {
      return "<small class=\"nearby-map-rssi\" data-nearby-rssi" + (v1635.signal ? "" : " hidden") + ">" + v1635.signal + "</small>";
    }
    function v419(v1636, v1637) {
      return "<div class=\"mapbox hidden-loc" + v1636 + "\" data-act=\"reveal\" data-map-key=\"home\" title=\"点这里显示位置\">" + v417(v1637, 22) + "<span data-nearby-title>" + v1637.title + "</span>" + v418(v1637) + "</div>";
    }
    function v420() {
      if (v16.tab !== "home" || v16.locShown) {
        return;
      }
      const v1638 = v10();
      if (!v1638) {
        return;
      }
      const v1639 = v416();
      v1638.querySelectorAll("[data-nearby-icon]").forEach(v1640 => {
        if (v1640.dataset.icon === v1639.icon) {
          return;
        }
        v1640.dataset.icon = v1639.icon;
        v1640.innerHTML = v4.icon(v1639.icon, Number(v1640.dataset.nearbyIcon));
      });
      v1638.querySelectorAll("[data-nearby-title]").forEach(v1641 => {
        v1641.textContent = v1639.title;
      });
      v1638.querySelectorAll("[data-nearby-rssi]").forEach(v1642 => {
        v1642.textContent = v1639.signal || v1642.dataset.fallback || "";
        v1642.hidden = !v1642.textContent;
      });
    }
    function v421() {
      const v1643 = v411;
      if (!v1643) {
        return;
      }
      v411 = null;
      clearTimeout(v1643.timer);
      try {
        v1643.cancel?.();
      } catch {}
      if (v1643.rssi !== null) {
        v420();
      }
    }
    function v422(v1644, v1645) {
      const v1646 = v411;
      if (!v1646?.cancel || v1644 !== v1646.id) {
        return;
      }
      clearTimeout(v1646.timer);
      v1646.cancel = null;
      if (document.hidden || !v415(v1646) || !Number.isInteger(v1645) || v1645 < -127 || v1645 > 20) {
        return;
      }
      v1646.rssi = v1645;
      v1646.expires = Date.now() + v410;
      v1646.timer = setTimeout(() => {
        v1646.expires = 0;
        v420();
      }, v410);
      v420();
    }
    function v423() {
      const v1647 = v414();
      if (v411 && (!v415(v411, v1647) || document.hidden || v17())) {
        v421();
      }
      if (!v200 || document.hidden || v17() || !v413() || !v1647 || v411) {
        return;
      }
      const v1648 = v310();
      if (!v1648?.isCurrent()) {
        return;
      }
      const v1649 = v202();
      const v1650 = {
        id: ++v412,
        scope: v162(),
        target: v1647,
        rssi: null,
        expires: 0,
        timer: 0,
        cancel: null
      };
      v411 = v1650;
      v1650.timer = setTimeout(() => {
        if (v411 !== v1650 || document.hidden || !v415(v1650) || !v1648.isCurrent()) {
          if (v411 === v1650) {
            v421();
          }
          return;
        }
        const v1651 = window.IOSBR;
        const v1652 = window.ZeehoShell;
        if (!v1649) {
          try {
            v1650.foreground = v1652.nearbyForeground(v1648.navId);
          } catch {
            v1650.foreground = 0;
          }
          if (!Number.isSafeInteger(v1650.foreground) || v1650.foreground <= 0) {
            v421();
            return;
          }
        }
        v1650.cancel = v1649 ? () => {
          v1651.call("ble.nearby.cancel", {
            requestId: v1650.id
          }).catch(() => {});
        } : () => v1652.cancelNearbyVehicle(v1648.navId, v1650.id);
        v1650.timer = setTimeout(() => {
          try {
            v1650.cancel?.();
          } catch {}
          v1650.cancel = null;
        }, 10000);
        try {
          if (v1649) {
            const {
              vin: v1653,
              frame: v1654
            } = v1648;
            v1651.call("ble.nearby", {
              vin: v1653,
              frame: v1654,
              name: v1647.broadcast,
              requestId: v1650.id
            }).then(v1655 => v422(v1650.id, v1655?.ok === true ? v1655.rssi : null), () => v422(v1650.id, null));
          } else if (v1652.beginNearbyVehicle(v1648.navId, v1648.vin, v1648.frame, v1647.address, v1647.broadcast, v1650.id) !== true) {
            v422(v1650.id, null);
          }
        } catch {
          v422(v1650.id, null);
        }
      }, 0);
    }
    function v424() {
      return v413() && (v202() ? window.IOSBR?.has?.("ble.nearby.permission") === true : typeof window.ZeehoShell?.requestNearbyPermission === "function");
    }
    async function v425() {
      if (!v424() || document.hidden || v17()) {
        return;
      }
      try {
        if (!v202()) {
          window.ZeehoShell.requestNearbyPermission(v19);
          return;
        }
        const v1656 = await window.IOSBR.call("ble.nearby.permission");
        if (v1656?.reason === "permission_denied") {
          await window.IOSBR.call("app.settings");
        } else if (v1656?.ok === true) {
          v421();
          v423();
        }
      } catch {}
    }
    Object.assign(v1, {
      syncNearbyScan: v423,
      stopNearbyScan: v421,
      nearbyResult: v422,
      nearbyPermissionAvailable: v424
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        v421();
      } else {
        v423();
      }
    });
    window.addEventListener("pagehide", v421);
    window.addEventListener("zeeho-nearby-resume", v1657 => {
      const {
        foreground: v1658,
        permission: v1659
      } = v1657.detail || {};
      if (!Number.isSafeInteger(v1658) || v1658 <= 0) {
        return;
      }
      if (v411?.foreground > v1658) {
        return;
      }
      if (v1659 === true || v411?.foreground && v411.foreground !== v1658) {
        v421();
      }
      v423();
    });
    const v426 = "zeeho.map-visibility.v1";
    const v427 = "zeeho.map-provider.v1";
    let v428 = {
      home: false,
      ride: false
    };
    let v429 = false;
    let v430 = Promise.resolve();
    let v431 = Promise.resolve();
    function v432() {
      v16.tile = v2.get(v427) === "tianditu" ? "tianditu" : "amap";
    }
    function v433(v1660) {
      if (!["tianditu", "amap"].includes(v1660)) {
        return Promise.resolve(false);
      }
      const v1661 = v431.then(async () => {
        if (!v18()) {
          return false;
        }
        if (v16.tile === v1660) {
          return true;
        }
        let v1662 = false;
        try {
          v1662 = await v2.setAsync(v427, v1660);
        } catch {}
        if (v1662 !== true) {
          v4.toast(v9(), "地图偏好未能保存，请重试");
          return false;
        }
        v16.tile = v1660;
        if (v16.tab === "home") {
          v500({
            keepScroll: true
          });
        } else if (v441) {
          v451();
        }
        if (v20.trip && v4.sheetAlive(v4.currentSheet("ride"))) {
          v24({
            asyncRefresh: true
          });
        }
        v9().querySelectorAll(".interactive-map").forEach(v1663 => {
          if (v1663.isConnected && !v441?.contains(v1663) && Array.isArray(v1663._mapInput)) {
            v4.mountMap(v1663, v1663._mapInput, v1663._mapOptions || {});
          }
        });
        return true;
      });
      v431 = v1661.catch(() => false);
      return v1661;
    }
    function v434() {
      const v1664 = v2.getJson(v426, {});
      v428 = {
        home: v1664?.home === true,
        ride: v1664?.ride === true
      };
      v16.locShown = v428.home;
      v429 = v428.ride;
      v16.mapShown = Object.create(null);
    }
    const v435 = (v1665, v1666 = "") => JSON.stringify([API.source, v16.profileUid || v16.uid || "", v16.vin, v1665, v1666]);
    const v436 = (v1667 = "home") => v1667 === "home" ? v16.locShown === true : Object.hasOwn(v16.mapShown || {}, v1667) ? v16.mapShown[v1667] === true : v429;
    function v437(v1668 = "home") {
      const v1669 = !v436(v1668);
      const v1670 = v1668 === "home" ? "home" : "ride";
      if (v1668 === "home") {
        v16.locShown = v1669;
      } else {
        if (!v16.mapShown) {
          v16.mapShown = Object.create(null);
        }
        if (v1669 === v429) {
          delete v16.mapShown[v1668];
        } else {
          v16.mapShown[v1668] = v1669;
        }
      }
      v428[v1670] = v1669;
      const v1671 = JSON.stringify(v428);
      v430 = v430.then(() => v2.setAsync(v426, v1671)).catch(() => false);
      return v1669;
    }
    function v438(v1672, v1673 = "位置", v1674 = 18, v1675 = "iconbtn sm") {
      const v1676 = v436(v1672);
      const v1677 = "" + (v1676 ? "隐藏" : "显示") + v1673;
      return "<button type=\"button\" class=\"" + v6(v1675) + "\" data-act=\"reveal\" data-map-key=\"" + v6(v1672) + "\" data-map-eye=\"" + v6(v1673) + "\" data-eye-size=\"" + v1674 + "\" title=\"" + v6(v1677) + "\" aria-label=\"" + v6(v1677) + "\" aria-pressed=\"" + v1676 + "\">" + v4.icon(v1676 ? "eyeOff" : "eye", v1674) + "</button>";
    }
    function v439(v1678) {
      const v1679 = v1680 => v1678 === undefined || (v1680.dataset.mapKey || "home") === v1678;
      v9().querySelectorAll(".mapbox[data-act=\"reveal\"]").forEach(v1681 => {
        if (!v1679(v1681)) {
          return;
        }
        const v1682 = v436(v1681.dataset.mapKey || "home");
        v1681.classList.toggle("masked", !v1682);
        v1681.querySelector(".unmask")?.classList.toggle("hidden", v1682);
        const v1683 = v1681.querySelector(".map-expand");
        if (v1683) {
          v1683.disabled = !v1682;
          v1683.hidden = !v1682;
        }
      });
      v9().querySelectorAll("[data-loc]").forEach(v1684 => {
        if (!v1679(v1684)) {
          return;
        }
        const v1685 = v436(v1684.dataset.mapKey || "home");
        v1684.textContent = v1685 ? v1684.dataset.real || "" : v1684.dataset.loc === "addr" ? "已打码 · 点轨迹图显示" : "已打码";
      });
      v9().querySelectorAll("[data-map-eye]").forEach(v1686 => {
        if (!v1679(v1686)) {
          return;
        }
        const v1687 = v436(v1686.dataset.mapKey || "home");
        const v1688 = "" + (v1687 ? "隐藏" : "显示") + (v1686.dataset.mapEye || "位置");
        v1686.innerHTML = v4.icon(v1687 ? "eyeOff" : "eye", Number(v1686.dataset.eyeSize) || 18);
        v1686.title = v1688;
        v1686.setAttribute("aria-label", v1688);
        v1686.setAttribute("aria-pressed", String(v1687));
      });
    }
    const v440 = {
      mode: "car",
      me: null,
      meAt: 0,
      err: "",
      loading: false,
      active: false
    };
    let v441 = null;
    let v442 = null;
    let v443 = 0;
    const v444 = 300000;
    const v445 = () => !!v440.me && Date.now() - v440.meAt < v444;
    function v446(v1689) {
      if (v1689) {
        v440.mode = v1689;
      }
      v440.err = "";
      if (!v441) {
        if (location.hash !== "#/map") {
          history.pushState({
            ...history.state,
            panelMap: true
          }, "", "#/map");
        }
        v440.active = true;
        v440.loading = false;
        v442 = document.activeElement;
        v441 = document.createElement("section");
        v441.id = "map-page";
        v441.className = "map-page";
        v441.setAttribute("role", "region");
        v441.setAttribute("aria-label", "位置地图");
        v441.tabIndex = -1;
        v9().appendChild(v441);
        v9().classList.add("has-map-page");
        for (const v1690 of ["topbar", "scroll", "tabbar"]) {
          if (v8(v1690)) {
            v8(v1690).inert = true;
          }
        }
        v441.focus({
          preventScroll: true
        });
      }
      v451();
      if ((v440.mode === "me" || v440.mode === "both") && !v445() && !v440.loading) {
        v449();
      }
    }
    function v447({
      navigate = true
    } = {}) {
      if (!v441) {
        return;
      }
      const v1691 = v4.currentSheet("map-navigation");
      if (v1691) {
        v4.closeSheet(v1691);
      }
      v441.querySelector(".interactive-map")?._disposeMap?.();
      v441.remove();
      v441 = null;
      v443++;
      v440.active = v440.loading = false;
      v9().classList.remove("has-map-page");
      for (const v1692 of ["topbar", "scroll", "tabbar"]) {
        if (v8(v1692)) {
          v8(v1692).inert = false;
        }
      }
      if (v442?.isConnected) {
        v442.focus({
          preventScroll: true
        });
      }
      v442 = null;
      if (navigate && location.hash === "#/map") {
        if (history.state?.panelMap) {
          history.back();
        } else {
          history.replaceState(history.state, "", location.pathname + location.search);
        }
      }
    }
    function v448() {
      if (location.hash === "#/map") {
        if (!v440.active) {
          v446();
        }
      } else {
        v447({
          navigate: false
        });
      }
    }
    function v449() {
      if (v12()) {
        return v15("真实 GPS 定位");
      }
      if (!navigator.geolocation) {
        v440.err = "这个浏览器不支持定位";
        v451();
        return;
      }
      v440.loading = true;
      v440.err = "";
      v451();
      const v1693 = v162();
      const v1694 = v441;
      const v1695 = ++v443;
      const v1696 = () => v163(v1693) && v1694 === v441 && v440.active && v1695 === v443;
      navigator.geolocation.getCurrentPosition(v1697 => {
        if (!v1696()) {
          return;
        }
        const [v1698, v1699] = v3.wgs84ToGcj02(v1697.coords.longitude, v1697.coords.latitude);
        v440.me = {
          lng: v1698,
          lat: v1699,
          acc: v1697.coords.accuracy
        };
        v440.meAt = Date.now();
        v440.loading = false;
        v451();
      }, v1700 => {
        if (!v1696()) {
          return;
        }
        v440.loading = false;
        v440.err = v1700.code === 1 ? v198() ? "没给定位权限：请在系统设置里允许「几何面板」使用位置，再回来点一次。" : "没给定位权限：点地址栏左边那个锁 → 网站设置 → 位置 → 允许，再回来点一次。" : "定位失败：" + (v1700.message || "错误码 " + v1700.code);
        v451();
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      });
    }
    function v450(v1701, v1702) {
      const v1703 = 6371000;
      const v1704 = Math.PI / 180;
      const v1705 = (v1702.lat - v1701.lat) * v1704;
      const v1706 = (v1702.lng - v1701.lng) * v1704;
      const v1707 = Math.sin(v1705 / 2) ** 2 + Math.cos(v1701.lat * v1704) * Math.cos(v1702.lat * v1704) * Math.sin(v1706 / 2) ** 2;
      return v1703 * 2 * Math.asin(Math.sqrt(v1707));
    }
    function v451() {
      if (!v441) {
        return;
      }
      const v1708 = v16.data.home?.loc;
      const v1709 = v1708?.has && Number.isFinite(v1708.lng) && Number.isFinite(v1708.lat) ? {
        lng: v1708.lng,
        lat: v1708.lat,
        kind: "car",
        label: "车辆"
      } : null;
      const v1710 = v440.me ? {
        lng: v440.me.lng,
        lat: v440.me.lat,
        kind: "me",
        label: "我"
      } : null;
      const v1711 = v440.mode;
      const v1712 = [];
      if (v1711 !== "me" && v1709) {
        v1712.push(v1709);
      }
      if (v1711 !== "car" && v1710) {
        v1712.push(v1710);
      }
      const v1713 = v1709 ? String(v1708.address || "回到车辆位置") : "—";
      const v1714 = v1709 ? v1708.lng.toFixed(6) : "—";
      const v1715 = v1709 ? v1708.lat.toFixed(6) : "—";
      const v1716 = v1710 ? Number(v440.me.lng) : NaN;
      const v1717 = v1710 ? Number(v440.me.lat) : NaN;
      const v1718 = Number.isFinite(v1716) && Number.isFinite(v1717) ? {
        lng: v1716.toFixed(6),
        lat: v1717.toFixed(6)
      } : null;
      const v1719 = () => {
        const v1729 = v1732 => {
          for (const [v1733, v1734] of v1732) {
            const v1735 = v441.querySelector(v1733);
            if (v1735 && v1735.textContent !== v1734) {
              v1735.textContent = v1734;
            }
          }
        };
        v1729([[".map-page-card[data-card=\"car\"] .map-page-address", v1713], ["[data-map-longitude]", v1714], ["[data-map-latitude]", v1715]]);
        if (v1718) {
          v1729([["[data-me-longitude]", v1718.lng], ["[data-me-latitude]", v1718.lat]]);
        }
        const v1730 = v441.querySelector(".map-page-cards");
        const v1731 = v1730 ? v1730.offsetHeight : 0;
        v441.style.setProperty("--map-location-height", (v1731 || 112) + "px");
      };
      const v1720 = JSON.stringify([v1712, v1709, v1711, v440.loading, v440.err, v16.vin, v16.tile, v226(), v1718]);
      if (v441.dataset.sig === v1720) {
        v1719();
        return;
      }
      v441.dataset.sig = v1720;
      const v1721 = document.activeElement?.dataset?.v;
      v441.querySelector(".interactive-map")?._disposeMap?.();
      const v1722 = (v1736, v1737) => "<button type=\"button\" data-act=\"mapmode\" data-v=\"" + v1736 + "\" aria-pressed=\"" + (v1711 === v1736) + "\">" + v1737 + "</button>";
      let v1723 = "";
      let v1724 = "";
      if (v1711 !== "car" && v440.loading) {
        v1724 = v4.spinner("正在定位…");
      } else if (v1711 !== "car" && v440.err) {
        v1724 = "<div class=\"note bad\">" + v4.icon("alert", 18) + "<div>" + v6(v440.err) + "</div></div>\n        <button class=\"btn tonal block mt12\" data-act=\"mapretry\">重新定位</button>";
      } else if (v1712.length) {
        if (v1712.length === 2) {
          const v1738 = v450(v1709, v1710);
          v1723 = "直线距离 " + (v1738 < 1000 ? Math.round(v1738) + " 米" : (v1738 / 1000).toFixed(1) + " 公里");
        }
      }
      const v1725 = v1709 ? "<button type=\"button\" class=\"map-page-recenter\" data-map-recenter title=\"回到车辆位置\" aria-label=\"回到车辆位置\" aria-describedby=\"map-car-address\" disabled>\n          <span class=\"map-page-address\" id=\"map-car-address\">" + v6(v1713) + "</span>\n          <span class=\"map-page-recenter-icon\" aria-hidden=\"true\">" + v4.icon("locate", 18) + "</span>\n        </button>" : "<div class=\"map-page-address\">" + v6(v1713) + "</div>";
      const v1726 = v1711 === "me" ? "" : "<section class=\"map-page-card\" data-card=\"car\" aria-label=\"当前车辆位置\">\n        <div class=\"map-page-card-icon\">" + v4.icon("pin", 24) + "</div>\n        <div class=\"map-page-card-body\">\n          <div class=\"map-page-card-label\">车辆位置</div>\n          " + v1725 + "\n          <div class=\"map-page-coordinates\"><span>经度 <b class=\"tnum\" data-map-longitude>" + v1714 + "</b></span><span>纬度 <b class=\"tnum\" data-map-latitude>" + v1715 + "</b></span></div>\n        </div>\n      </section>";
      const v1727 = v1711 === "car" ? "" : "<section class=\"map-page-card\" data-card=\"me\" aria-label=\"我的位置\">\n        <div class=\"map-page-card-icon\">" + v4.icon("nav", 24) + "</div>\n        <div class=\"map-page-card-body\">\n          <div class=\"map-page-card-label\">我的位置</div>\n          <div class=\"map-page-address\">" + (v440.loading ? "正在定位…" : v440.err ? "定位失败" : v1718 ? "本机当前位置" : "—") + "</div>\n          <div class=\"map-page-coordinates\"><span>经度 <b class=\"tnum\" data-me-longitude>" + (v1718 ? v1718.lng : "—") + "</b></span><span>纬度 <b class=\"tnum\" data-me-latitude>" + (v1718 ? v1718.lat : "—") + "</b></span></div>\n        </div>\n      </section>";
      v441.innerHTML = v4.interactiveMap() + "\n      <nav class=\"map-page-controls\" aria-label=\"地图显示\">\n        <button type=\"button\" class=\"map-page-back\" data-act=\"mapback\" aria-label=\"返回首页\">" + v4.icon("left", 20) + "</button>\n        <div class=\"map-modes\">" + v1722("car", "车辆位置") + v1722("me", "我的位置") + v1722("both", "两个都看") + "</div>\n      </nav>\n      " + (v1724 ? "<div class=\"map-page-notice\" role=\"status\">" + v1724 + "</div>" : "") + "\n      " + (v1723 ? "<p class=\"map-page-info\">" + v6(v1723) + "</p>" : "") + "\n      <div class=\"map-page-cards\">" + v1726 + v1727 + "</div>";
      v1719();
      const v1728 = v162();
      v4.mountMap(v441.querySelector(".interactive-map"), v1712, {
        recenterButton: v441.querySelector("[data-map-recenter]"),
        onCarClick: (v1739, v1740) => {
          if (v440.active && v163(v1728)) {
            v452(v1739, v1740);
          }
        }
      });
      if (v1721) {
        v441.querySelector("[data-v=\"" + v1711 + "\"]")?.focus({
          preventScroll: true
        });
      }
    }
    function v452(v1741, v1742) {
      const v1743 = v162();
      if (!v440.active || !v16.data.home?.loc?.has) {
        return;
      }
      const v1744 = [["navigate", "nav", "导航"], ["search", "horn", "鸣笛"], ["lockOn", "unlock", "开锁"], ["lockOff", "lock", "关锁"], ["cushion", "seat", "座桶"]].filter(([v1745]) => v1745 !== "cushion" || !v226());
      v1741.innerHTML = "<div class=\"map-vehicle-actions\">" + v1744.map(([v1746, v1747, v1748]) => "<button type=\"button\" data-map-action=\"" + v1746 + "\">" + v4.icon(v1747, 22) + "<span>" + v1748 + "</span></button>").join("") + "</div>";
      v1741.querySelectorAll("[data-map-action]").forEach(v1749 => v1749.addEventListener("click", () => {
        if (!v440.active || !v1741.isConnected || !v163(v1743)) {
          return;
        }
        v1742();
        if (v1749.dataset.mapAction === "navigate") {
          v453();
        } else {
          v103(v1749.dataset.mapAction);
        }
      }));
    }
    function v453(v1750 = v16.data.home?.loc) {
      if (v12()) {
        return v15("外部导航");
      }
      const v1751 = v162();
      if (!v454("amap", v1750)) {
        return;
      }
      const v1752 = {
        ...v1750
      };
      let v1753;
      v1753 = v4.sheet(v9(), {
        key: "map-navigation",
        title: "选择导航地图",
        closeMode: "current",
        className: "map-navigation-sheet",
        body: "<div class=\"map-navigation-options\">" + [["amap", "nav", "高德地图"], ["baidu", "pin", "百度地图"], ["tencent", "route", "腾讯地图"], ["google", "pin", "Google 地图"]].map(([v1754, v1755, v1756]) => "<button type=\"button\" class=\"btn tonal\" data-map-provider=\"" + v1754 + "\">" + v4.icon(v1755, 24) + "<span>" + v1756 + "</span></button>").join("") + "</div>",
        onMount: v1757 => v1757.querySelectorAll("[data-map-provider]").forEach(v1758 => v1758.addEventListener("click", () => {
          if (!v163(v1751) || !v4.sheetAlive(v1753)) {
            return;
          }
          const v1759 = v454(v1758.dataset.mapProvider, v1752);
          if (!v1759) {
            v4.toast(v9(), "暂无有效位置");
            return;
          }
          v4.closeSheet(v1753);
          v455(v1759, v1751);
        }))
      });
    }
    function v454(v1760, v1761) {
      if (!v1761?.has || !Number.isFinite(v1761.lng) || !Number.isFinite(v1761.lat) || Math.abs(v1761.lng) > 180 || Math.abs(v1761.lat) > 85.05112878) {
        return null;
      }
      const {
        lng: v1762,
        lat: v1763
      } = v1761;
      const v1764 = String(v1761.address || "").trim() || v1763.toFixed(6) + ", " + v1762.toFixed(6);
      const v1765 = encodeURIComponent(v1764);
      const v1766 = v1763 + "," + v1762;
      switch (v1760) {
        case "amap":
          return {
            app: v202() ? "iosamap://path?sourceApplication=zeeho&dname=" + v1765 + "&dlat=" + v1763 + "&dlon=" + v1762 + "&dev=0&t=0" : "androidamap://route?sourceApplication=zeeho&dname=" + v1765 + "&dlat=" + v1763 + "&dlon=" + v1762 + "&dev=0&t=0",
            web: "https://uri.amap.com/navigation?to=" + v1762 + "," + v1763 + "," + v1765 + "&mode=car&src=zeeho-dashboard&coordinate=gaode&callnative=1",
            package: "com.autonavi.minimap"
          };
        case "baidu":
          return {
            app: "baidumap://map/direction?destination=" + encodeURIComponent("latlng:" + v1766 + "|name:" + v1764) + "&mode=driving&coord_type=gcj02&src=webapp.zeeho.dashboard",
            web: "https://api.map.baidu.com/direction?origin=" + encodeURIComponent("我的位置") + "&destination=" + encodeURIComponent("latlng:" + v1766 + "|name:" + v1764) + "&mode=driving&coord_type=gcj02&output=html&src=webapp.zeeho.dashboard",
            package: "com.baidu.BaiduMap"
          };
        case "tencent":
          return {
            app: "qqmap://map/routeplan?type=drive&fromcoord=CurrentLocation&to=" + v1765 + "&tocoord=" + v1766 + "&referer=zeeho-dashboard",
            web: "https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=" + v1765 + "&tocoord=" + v1766 + "&referer=zeeho-dashboard",
            package: "com.tencent.map"
          };
        case "google":
          return {
            app: v202() ? "comgooglemaps://?daddr=" + v1766 + "&directionsmode=driving" : "google.navigation:q=" + v1766 + "&mode=d",
            web: "https://www.google.com/maps/dir/?api=1&destination=" + v1766 + "&travelmode=driving",
            package: "com.google.android.apps.maps"
          };
        default:
          return null;
      }
    }
    function v455(v1767, v1768) {
      if (v202()) {
        let v1769;
        const v1770 = () => {
          clearTimeout(v1769);
          document.removeEventListener("visibilitychange", v1771);
          window.removeEventListener("pagehide", v1770);
        };
        const v1771 = () => {
          if (document.hidden) {
            v1770();
          }
        };
        document.addEventListener("visibilitychange", v1771);
        window.addEventListener("pagehide", v1770, {
          once: true
        });
        v1769 = setTimeout(() => {
          v1770();
          if (!document.hidden && v163(v1768)) {
            v456(v1767.web);
          }
        }, 1400);
        v456(v1767.app);
      } else if (/Android/i.test(navigator.userAgent)) {
        const v1772 = v1767.app.indexOf(":");
        window.location.href = "intent:" + v1767.app.slice(v1772 + 1) + "#Intent;scheme=" + v1767.app.slice(0, v1772) + ";package=" + v1767.package + ";S.browser_fallback_url=" + encodeURIComponent(v1767.web) + ";end";
      } else {
        window.location.href = v1767.web;
      }
    }
    function v456(v1773) {
      const v1774 = document.createElement("a");
      v1774.href = v1773;
      v1774.click();
    }
    function v457({
      keepIdentity = false,
      keepSnapshot = false,
      keepAccount = false
    } = {}) {
      v1.stopNearbyScan?.();
      v1.systemSurfaces?.reset?.();
      v157++;
      v186();
      v190 = null;
      if (!keepAccount) {
        v286++;
      }
      v174 = null;
      v298++;
      v297.clear();
      for (const v1776 of v165.keys()) {
        if (!keepAccount || !["messages", "user_info", "integral_total", "signin_info"].includes(v1776)) {
          v165.delete(v1776);
        }
      }
      v16.loading = false;
      v16.noVehicle = false;
      if (v440.active) {
        v447();
      }
      v440.loading = false;
      v440.err = "";
      v440.me = null;
      v440.meAt = 0;
      v16.locShown = v428.home;
      v16.mapShown = Object.create(null);
      window.AMAP_ADDRESS?.clear?.();
      if (!keepIdentity) {
        window.TASKS?.reset?.();
        v16.vehicles = [];
        v16.vin = "";
        v16.uid = "";
      }
      const v1775 = keepAccount ? Object.fromEntries(Object.entries(v16.data).filter(([v1777]) => ["user", "signin", "messages", "vehicleAlerts", "integral_total", "signin_info", "msg_list", "msg_unread"].includes(v1777))) : {};
      v16.data = v1775;
      v16.dataCached = false;
      v16.cacheSnapshotAt = 0;
      v20.cache = {};
      v20.trips = {};
      v20.pending = {};
      v20.failed = {};
      v20.year = null;
      v20.month = "";
      v20.day = null;
      v20.trip = null;
      v20.refreshDay = "";
      v1.mem.battCache = null;
      v377();
      v383();
      v371 = null;
      v43.clear();
      v1.shell.stopBattPoll();
      v1.mem.bgCache = null;
      v1.mem.bgCacheAt = 0;
      v1.mem.widgetCfg = null;
      v1.settings.widgetCfgById.clear();
      v130.scope = null;
      v1.inductiveUi?.revoke?.();
      for (const v1778 of ["media", "audio", "cast"]) {
        (window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v1, v1778) : v1[v1778])?.resetContext?.();
      }
      v251 = 0;
      if (!keepSnapshot) {
        try {
          v2.commitAsync({
            removes: [v2.ns(v250)]
          });
        } catch {}
      }
      try {
        API.lastRaw = keepAccount ? Object.fromEntries(Object.entries(API.lastRaw).filter(([v1779]) => !API.VEHICLE_EP.has(v1779) && v1779 !== "vehicle_list")) : {};
      } catch {}
    }
    function v458(v1780, v1781 = v16.vehicles, {
      keepSnapshot = false
    } = {}) {
      const v1782 = String(v1780 || "");
      const v1783 = v1782 !== v16.vin;
      if (v1783) {
        v16.vin = v1782;
        v16.uid = "";
        v457({
          keepIdentity: true,
          keepAccount: true,
          keepSnapshot: keepSnapshot
        });
        v16.lastErr = "";
      }
      v16.vehicles = v1781;
      v16.noVehicle = !v1781.length;
      return v1783;
    }
    function v459(v1784, {
      isLatest = () => true
    } = {}) {
      if (v17() || !isLatest()) {
        return "ignored";
      }
      if (!v1784?.ok || !Array.isArray(v1784.data)) {
        return "fail";
      }
      const v1785 = v3.vehicles(v1784);
      const v1786 = API.source !== "demo" && v236() ? window.ACC.active() : null;
      const v1787 = v2.canCommitAsync?.() && !v237();
      const v1788 = v1785.some(v1792 => v1792.vin === v16.vin) ? v16.vin : v1785[0]?.vin || "";
      if (v1786) {
        if (v1787 && !window.IOSBR?.available?.()) {
          window.ACC.cacheVehicles(window.ACC.activeId(), v1785.map(({
            raw: v1793,
            ...v1794
          }) => v1794), v1788);
        } else if (window.IOSBR?.available?.()) {
          const v1795 = v162();
          return Promise.resolve(window.ACC.cacheVehicles(v1786.id, v1785.map(({
            raw: v1796,
            ...v1797
          }) => v1797), v1788)).then(v1798 => {
            if (!v163(v1795) || !isLatest()) {
              return "ignored";
            }
            if (!v1798) {
              return "savefailed";
            }
            const v1799 = v237() ? v238() : v1785;
            const v1800 = v1799.some(v1802 => v1802.vin === v16.vin) ? v16.vin : v1799[0]?.vin || "";
            const v1801 = v458(v1800, v1799, {
              keepSnapshot: true
            });
            v341();
            if (!v1799.length) {
              return "empty";
            } else if (v1801) {
              return "changed";
            } else {
              return "ok";
            }
          });
        } else if (!window.ACC.updateActive({
          vehicles: v1785.map(({
            raw: v1803,
            ...v1804
          }) => v1804)
        })) {
          return "fail";
        }
      }
      const v1789 = v237() ? v238() : v1785;
      const v1790 = v1789.some(v1805 => v1805.vin === v16.vin) ? v16.vin : v1789[0]?.vin || "";
      const v1791 = v458(v1790, v1789, {
        keepSnapshot: v1787
      });
      if (!v1789.length) {
        v16.uid = "";
      }
      if (!v1787) {
        v232();
      }
      v341();
      if (!v1789.length) {
        return "empty";
      } else if (v1791) {
        return "changed";
      } else {
        return "ok";
      }
    }
    function v460() {
      if (!v236()) {
        return false;
      }
      const v1806 = v160(v16.vin);
      const v1807 = v237() ? v238() : window.ACC.active()?.vehicles || [];
      const v1808 = v1807.some(v1810 => v1810.vin === v16.vin) ? v16.vin : v1807[0]?.vin || "";
      const v1809 = v458(v1808, v1807);
      if (!v1809 && !v161(v1806, v160(v16.vin))) {
        v457({
          keepIdentity: true,
          keepAccount: true
        });
        v16.uid = "";
      }
      v232();
      v341();
      v500({
        keepScroll: true
      });
      if (v1809) {
        v299({
          silent: true
        });
      }
      return v1809;
    }
    function v461() {
      const v1811 = v16.data.home;
      const v1812 = v16.data.analyse;
      const v1813 = v16.data.user;
      const v1814 = v71();
      const v1815 = !!v1814?.active;
      const v1816 = v12() || v1815 || v1813?.ok || !!API.token;
      const v1817 = v1816 ? v59(v1815 ? "SVIP" + (v1813?.nick ? "：" + v1813.nick : "") : v1813?.nick || "当前登录账号", v60(), {
        tasks: true
      }) : "";
      const v1818 = v1815 || v1813?.ok ? "mt16" : "mt4";
      const v1819 = (v1841, v1842, v1843, v1844 = "", v1845 = "") => "<div class=\"stat-tap\" data-act=\"socialDetail\" data-kind=\"" + v1841 + "\" title=\"点击查看明细\">" + v4.stat(v1842, v1843, v1844, v1845) + "</div>";
      const v1820 = !!v16.profileUid;
      const v1821 = (v1846, v1847, v1848, v1849 = "", v1850 = "") => v1820 ? v1819(v1846, v1847, v1848, v1849, v1850) : v4.stat(v1847, v1848, v1849, v1850);
      const v1822 = v4.card((v1815 ? v72() + v74(v1814) : "") + "\n      " + v1817 + "\n      <div class=\"grid3 " + v1818 + "\">\n        " + v1821("integral", "积分", v1813?.score ?? "—") + "\n        " + v1821("signin", "签到", v16.data.signin?.data?.signCount ?? "—", "天") + "\n        " + v1821("green", "碳贡献", v1811?.green ?? "—", "kg") + "\n      </div>\n      " + (v1813?.ok && (v1813.posts !== null || v1813.fans !== null) ? "<div class=\"grid3 mt12\">\n        " + v1821("posts", "发帖", v1813.posts ?? "—") + "\n        " + v1821("follows", "关注", v1813.follows ?? "—") + "\n        " + v1821("fans", "粉丝", v1813.fans ?? "—") + "\n      </div>" : ""), v1815 ? "member" : "");
      const v1823 = [["BMS_Firmware", "计量器"], ["ECU_Firmware", "控制器"], ["HMI_Firmware", "仪表"]].map(([v1851, v1852]) => v405(v1852, v1811?.firmware?.find(v1853 => v1853.key === v1851)?.value)).join("") + v405("OTA版本", v1811?.otaVersion);
      const v1824 = v4.sectionTitle("车辆属性") + v4.card(v4.cardHead("车辆信息", "", "", "bike") + ("<div class=\"grid2\">" + v1823 + "</div>") + v4.kv("车型", "" + (v1811?.type || "—") + (v1811?.typeName ? " / " + v1811.typeName : "")) + v4.kv("VIN", v1811?.vin || "—", {
        mono: true
      }) + v4.kv("云盒版本", v1811?.firmware?.find(v1854 => v1854.key === "TBOX_Firmware")?.value || "—") + v4.kv("激活日期", v1811?.activationDate || "—"), "vehicle-firmware");
      const v1825 = [{
        k: "月里程",
        v: v1812?.mile,
        u: "km"
      }, {
        k: "骑行时长",
        v: v3.minutes(v1812?.minutes),
        opts: {
          fit: true
        }
      }, {
        k: "最高车速",
        v: v1812?.maxSpeed,
        u: "km/h"
      }, {
        k: "急加速",
        v: v1812?.accel,
        u: "次"
      }, {
        k: "急刹车",
        v: v1812?.brakes,
        u: "次",
        extra: true
      }, {
        k: "超速",
        v: v1812?.extreme,
        u: "次",
        extra: true
      }];
      const v1826 = v1812 ? v406(v1825, {
        compact: v16.rideGrid2
      }) : "";
      const v1827 = v1826 ? v4.card(v4.cardHead("骑行分析", v1812.month ? v3.monthLabel(v1812.month.slice(0, 4) + "." + v1812.month.slice(4)) : "", "<button class=\"btn text sm\" data-act=\"ride\">查看记录</button>", "speed") + ("<div class=\"stat-tap\" data-act=\"ridegrid\" role=\"button\"\n        title=\"" + (v16.rideGrid2 ? "点击展开全部六项指标" : "点击收起急刹车/超速") + "\"\n        aria-label=\"切换骑行分析布局\">" + v1826 + "</div>")) : "";
      const v1828 = v13("android") ? (() => {
        const v1855 = v53();
        const v1856 = v56(v1855);
        const v1857 = v1856 ? v1856.ok : false;
        const v1858 = !v1855 ? "" : v1855.authFailed ? "bad" : !v1855.enabled || !v1855.configured ? "warn" : v1856.tone;
        const v1859 = v4.chip(v1856 ? v1856.label : "需检查", v1858, {
          pulse: v1857
        });
        const v1860 = v66();
        const v1861 = v1860 ? v4.chip(v1860.enabled ? "每天 " + v1860.time : "未开启", v1860.enabled ? "ok" : "") : "";
        const v1862 = v62();
        const v1863 = v1862 ? (v1862.groups || []).filter(v1865 => v1865.on).length : null;
        const v1864 = v1862 && !v1862.allowed ? v4.chip("无权限", "warn") : v1863 === null ? "" : v4.chip(v1863 + "/" + v46.length, v1863 ? "ok" : "");
        return v4.card(v4.cardHead("后台任务", "后台保护 · 每日任务 · 消息通知", "", "shield") + ("<div class=\"bg-entries\">\n            " + v50("bgcheckhint", "shield", "后台保护指引", !v1855 ? "按手机品牌，逐步设置后台保护" : v1855.authFailed ? "登录信息失效，点开查看下一步" : !v1855.configured ? "先登录并选择车辆，再设置后台保护" : !v1855.enabled ? "开启后台同步，再按品牌设置保护" : "自启动、后台用电与锁卡，点开照着设置", v1859) + "\n            " + v50("bgtasks", "timer", "每日任务设置", "自动签到与可执行任务", v1861) + "\n            " + v50("bgnotifysettings", "bell", "消息通知设置", "每类通知可单独开关", v1864) + "\n          </div>\n          " + (v1855 && !v1855.notifications ? "<div class=\"note info mt12\">" + v4.icon("info", 18) + "<div>系统通知权限还没允许，下面所有通知都不会响。</div></div>" : "")));
      })() : "";
      const v1829 = v12() ? "UI 测试预览 · 合成示例" : API.source === "direct" && v199() ? "正式版 · 真实数据" : {
        demo: "演示数据",
        direct: "真实数据 · App 代发"
      }[API.source] || API.source;
      const v1830 = API.token || API.loadToken();
      const v1831 = v202();
      const v1832 = v1831 ? v401() : v198() && typeof window.ZeehoShell?.appVersion === "function" ? String(window.ZeehoShell.appVersion() || "") : "";
      const v1833 = v1831 ? "iOS APP版本" : "软件版本";
      const v1834 = v1831 ? "checkiosupdate" : "checkapp";
      const v1835 = v1831 ? "检查 iOS App 是否有新版本（App 内不提供下载）" : "检查并下载软件更新";
      const v1836 = "V" + v7;
      const v1837 = String(v16.profileUid || "");
      const v1838 = v1837 ? v1837.slice(0, 8) + "…" : "—";
      const v1839 = v236() ? window.ACC.count() + " 个账号 · " + (window.ACC.mode() === "aggregate" ? "聚合" : "分离") + " · 当前 " + (window.ACC.labelOf(window.ACC.active()) || "—") : v1829;
      const v1840 = v4.card(v4.cardHead("登录与账号", v1839, "", "db") + v4.kv("token", v1830 ? "已保存（" + v1830.slice(0, 8) + "…）" : "还没填", v1830 ? {
        copy: {
          act: "copytoken",
          title: "复制 token"
        }
      } : {}) + v4.kv("账号 ID", v1838, v1837 ? {
        mono: true,
        copy: v1837,
        copyTitle: "复制账号 ID"
      } : {
        mono: true
      }) + (v1832 ? "<div class=\"kv-tap\"" + (v1831 ? " data-rel=\"iosAppVersion\"" : "") + " data-act=\"" + v1834 + "\" title=\"" + v1835 + "\">" + v4.kv(v1833, v1832, {
        html: v75("app"),
        trailRel: "updApp"
      }) + "</div>" : "") + ("<div class=\"kv-tap\" data-act=\"checkpage\" title=\"检查面板更新\">" + v4.kv("面板版本", v1836, {
        html: v75("panel"),
        trailRel: "updPanel"
      }) + "</div>") + ("<div class=\"field\">\n        <button class=\"btn tonal block\" data-act=\"debug\">" + v4.icon("gear", 18) + "<span>" + (v236() ? "APP设置" : "打开APP设置") + "</span></button>\n      </div>\n      <div class=\"field\">\n        <button class=\"btn tonal block\" data-act=\"cachemanager\">" + v4.icon("trash", 18) + "<span>缓存管理</span></button>\n      </div>\n      <div class=\"field\">\n        <button class=\"btn tonal block\" data-act=\"rawlist\">" + v4.icon("clock", 18) + "<span>应用日志</span></button>\n      </div>"));
      return "\n      " + v4.sectionTitle("用户属性") + v1822 + "\n      " + v1827 + "\n      " + (v1.isIOS?.() ? "" : v47()) + "\n      " + v1824 + "\n      " + (v1828 ? v4.sectionTitle("服务") + v1828 : "") + "\n      " + (v1.systemSurfaces?.card?.() || "") + "\n      " + (v12() ? v4.card(v4.cardHead("UI 测试预览", "所有控件可查看 · 无真实账号或原生操作", "", "info") + ("<div class=\"card-sub\">" + v6(window.__zeehoPreviewReason || "这里使用合成示例；原生能力缺失会明确显示 unavailable。") + "</div>")) : "") + "\n      " + (v1.profile.domainMigrationCard?.() || "") + "\n      " + v1840;
    }
    function v462() {
      const v1866 = Math.max(v486.pct, window.__zeehoBootMeterState?.pct || 0);
      const v1867 = window.__zeehoBootMeterState?.total || 10;
      return "<div class=\"boot-skeleton\" data-in-app=\"1\"" + (v1866 > 0 ? " data-prog=\"1\"" : "") + ">\n      <div class=\"bs-page\">\n        <div class=\"bs-card bs-card-hero\">\n          <div class=\"bs-row\" aria-hidden=\"true\">\n            <span class=\"sk bs-chip\"></span><span class=\"sk bs-chip\"></span>\n            <span class=\"bs-spacer\"></span><span class=\"sk bs-chip sm\"></span>\n          </div>\n          <div class=\"bs-stage\">\n            <div class=\"bs-readout\">\n              <b class=\"tnum\" aria-hidden=\"true\"><span id=\"bootsegn\">" + v1866 + "</span><i>%</i></b>\n              <div class=\"bs-kicker\" role=\"status\" aria-live=\"polite\"><span class=\"bs-pulse\" aria-hidden=\"true\"></span><span class=\"bs-kicker-t\" id=\"bootstage\">" + v6(v487()) + "</span></div>\n            </div>\n          </div>\n          <div class=\"bs-seg bs-barline\" id=\"bootseg\"" + (v1866 > 0 ? " data-on=\"1\"" : "") + " style=\"--segs:" + v1867 + ";--fill:" + v1866 + "%\" role=\"progressbar\" aria-label=\"页面加载进度\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"" + v1866 + "\" aria-valuetext=\"页面加载 " + v1866 + "%\"><i id=\"bootbar\" aria-hidden=\"true\"></i></div>\n          <div class=\"bs-row bs-meta\" aria-hidden=\"true\">\n            <span class=\"sk bs-text w40\"></span><span class=\"sk bs-text w24\"></span><span class=\"sk bs-text w24\"></span>\n          </div>\n        </div>\n        <div class=\"bs-actions\" aria-hidden=\"true\">\n          <span class=\"sk bs-action\"></span><span class=\"sk bs-action\"></span>\n          <span class=\"sk bs-action\"></span>\n        </div>\n        <div class=\"bs-duo\" aria-hidden=\"true\">\n          <div class=\"bs-card bs-card-sm\"><span class=\"sk bs-head\"></span><span class=\"sk bs-map\"></span></div>\n          <div class=\"bs-card bs-card-sm\"><span class=\"sk bs-head\"></span><span class=\"sk bs-head w50\"></span><span class=\"sk bs-map short\"></span></div>\n        </div>\n        <div class=\"bs-footer\" aria-hidden=\"true\"><span class=\"sk bs-text w50\"></span></div>\n      </div>\n    </div>";
    }
    function v463(v1868) {
      const v1869 = String(v1868?.message || v1868?.err || "");
      if (v1868?.http === 401 || /invalid_token|InvalidTokenException/i.test(v1869)) {
        return "token 无效或已过期（HTTP " + (v1868?.http || 401) + "）";
      }
      return v1869 || "token 可能已过期，重新登录极核后再试一次";
    }
    function v464() {
      const v1870 = API.authFailed;
      if (!v1870) {
        return "";
      }
      return v4.card("<div class=\"note bad\">" + v4.icon("alert", 18) + "<div>\n        <b>登录态已失效，数据取不到</b><br>" + v6(v463(v1870)) + "\n      </div></div>\n      <div class=\"card-sub mt12\">在别处重新登录会顶掉这里的登录，token 过期也会这样。换个凭据重新登录，或者回到模拟车辆。</div>\n      <div class=\"field mt12\">\n        <button class=\"btn\" style=\"flex:1\" data-act=\"debug\">重新登录</button>\n        <button class=\"btn tonal\" style=\"flex:1\" data-act=\"resetdemo\">回到模拟车辆</button>\n      </div>\n      <div class=\"field mt8\" style=\"justify-content:center\"><button class=\"btn text sm\" data-act=\"retryauth\">先重试一次</button></div>", "auth-card");
    }
    let v465 = true;
    let v466 = false;
    const v467 = ["soc", "volt", "range", "chgPower", "chgCurrent", "chgTemp", "todayMile", "monthMile", "avgSpeed", "monthMinutes"].map(v1871 => "[data-key=\"" + v1871 + "\"]").join(", ");
    let v468 = true;
    let v469 = 0;
    let v470 = 0;
    const v471 = 760;
    const v472 = 2400;
    const v473 = () => !!v470 && performance.now() - v470 < v472;
    const v474 = () => v470 ? performance.now() - v470 : 0;
    let v475 = "";
    const v476 = {
      home: 0,
      settings: 1,
      me: 2
    };
    let v477 = null;
    const v478 = v1872 => typeof v1872 === "string" ? v1872 : JSON.stringify(v1872);
    const v479 = (v1873, v1874) => v1873 ? Object.fromEntries(v1874.map(v1875 => [v1875, v1873[v1875]])) : null;
    const v480 = (v1876, v1877) => {
      if (!v1876) {
        return null;
      }
      const v1878 = v479(v1876, ["vin", "name", "type", "typeName", "plate", "pic", "pic3d", "scalePic", "soc", "temp", "socColor", "headLock", "seatLock", "online", "totalMile", "monthMile", "monthMinutes", "avgSpeed", "otaVersion", "bt", "activationDate", "firstBind", "green", "watt", "amp"]);
      v1878.charge = v479(v1876.charge, ["known", "charging", "full", "text", "chargedMin", "chargedFor"]);
      if (v1877 === "range") {
        v1878.range = v1876.range;
      }
      v1878.loc = v479(v1876.loc, ["lng", "lat", "has", "altitude", "crs", "time", "address", "parkPhoto"]);
      v1878.signal = v479(v1876.signal, ["level", "text", "dbm"]);
      v1878.firmware = v1876.firmware?.map(v1879 => v479(v1879, ["name", "value"]));
      return v1878;
    };
    const v481 = v1880 => v479(v1880, ["soc", "voltage", "bmsVoltage", "watt", "amp", "current", "score", "chargeCount", "temp"]);
    const v482 = v1881 => v1881 ? {
      groups: (v1881.groups || []).map(v1882 => ({
        ...v479(v1882, ["id", "t", "icon"]),
        rows: v1882.rows.filter(v1883 => v1.settings.settingVisible(v1883)).map(v1884 => ({
          ...v479(v1884, ["code", "title", "kind", "render", "local", "binary", "value", "display", "desc", "keys", "note"]),
          subs: v1884.subs?.map(v1885 => v479(v1885, ["t", "v"])),
          ready: v1884.write?.ready === true,
          hasChoices: !!v1884.options || !!v1884.choices
        }))
      })).filter(v1886 => v1886.rows.length)
    } : null;
    function v483() {
      v258(v16.data.home);
      v178();
      const v1887 = v16.data;
      return [v16.tab, v16.theme, v16.accent, v16.tile, v16.vin, v16.profileUid, v16.uid, v16.loading, v16.noVehicle, v16.lastErr, v1.dashboardTheme?.revision() || "", v1.vehicleStyle?.revision() || "", v16.voltView, v224(), v16.locShown, v16.battRange, v176[v16.vin] || "", v16.tab === "home" && v16.voltView === "range" ? v1.batteryRange?.readout?.(v1887.home, v1887.battery) ?? "" : "", window.CAPBOOK?.scale?.(v16.vin) || 1, v16.tab === "home" && !v202() ? (() => {
        const v1888 = window.CHG?.lastSession?.(v16.vin);
        const v1889 = v1.chg.recentChargeInfo?.(v1888, v1887.home, v1887.battery, v393());
        if (v1889) {
          return v478({
            id: v1888.id,
            s: v1888.s,
            e: v1888.e,
            soc0: v1888.soc0,
            soc1: v1888.soc1,
            durMin: v1888.durMin,
            title: v1889.title,
            kwh: v1889.kwh,
            usage: v1889.usage,
            open: v1.chg.recentChargeOpen()
          });
        } else {
          return "";
        }
      })() : "", v16.rideGrid2, v43.get(v16.vin + "|24h")?.at || "", v43.get(v16.vin + "|30d")?.at || "", v1.mem.battCache ? v1.mem.battCache.key + "@" + v1.mem.battCache.at : "", (() => {
        const v1890 = v16.tab === "me" ? v53() : null;
        const v1891 = v56(v1890);
        const v1892 = v1890 && v1890.rootEnhance && typeof v1890.rootEnhance === "object" ? v1890.rootEnhance : null;
        if (v1890) {
          return [v1890.enabled, v1890.configured, v1890.authFailed, v1890.job, v1890.notifications, v1890.batteryIgnoring, v1891 ? v1891.label + "|" + v1891.tone : "", v1892 ? [v1892.mode, v1892.enabled, v1892.rootGranted, v1892.running, v1892.active, v1892.state, v1892.reason].join("/") : "-"].join("|");
        } else {
          return "";
        }
      })(), API.source, v528(), window.ACC && typeof window.ACC.sig === "function" ? window.ACC.sig() : "", API.authFailed ? (API.authFailed.http || "") + "/" + (API.authFailed.code || "") : "", v2?.error?.() || "", window.ACC?.error?.() || "", v478(v16.tireBands), v478(v16.openGroups), v478(v16.vehicles.map(v1893 => v479(v1893, ["vin", "name", "type", "plate", "pic", "shared", "shareNick", "virtual"]))), (() => {
        if (v202()) {
          return "";
        }
        try {
          const v1894 = window.CHG?.capacity(v16.vin);
          if (v1894) {
            return v1894.version + "|" + v1894.ah + "|" + v1894.n + "|" + (v1894.solid ? 1 : 0) + "|" + v1894.source + "|" + v1894.measurementSide + "|" + v1894.estimatedMin + "|" + v1894.estimatedFraction;
          } else {
            return "";
          }
        } catch {
          return "";
        }
      })(), v478(v482(v1887.settings)), v478(v479(v1887.rideHome, ["todayMile", "lastMile", "lastMinutes", "mileages", "times"])), v478(v1887.rideMonth), v478(v479(v1887.analyse, ["month", "mile", "minutes", "maxSpeed", "accel", "brakes", "extreme"])), v478(v479(v1887.service?.serviceRechargeVehicleList?.[0], ["rechargeEndDate", "rechargeEndTime", "serviceRechargeStatus"])), v16.tab === "home" ? (() => {
        const v1895 = v398();
        return v478(v479(v1895.svc, ["vinNo", "vin", "rechargeEndDate", "rechargeEndTime"])) + "|" + v1895.left;
      })() : "", v478(v479(v1887.user, ["ok", "nick", "avatar", "showId", "posts", "follows", "fans", "sign", "score"])), v478(v479(v1887.signin?.data, ["signCount"])), v478(v1887.messages && v1887.messages.list && v1887.messages.list.length), v478(v480(v1887.home, v16.voltView)), v478(v481(v1887.battery)), v16.tab === "home" && v1.dashboardTheme?.usesWidget?.("status-orbs") ? v478(v399(v1887.home)) : "", v478(v1887.tires ? {
        wheels: v1887.tires.wheels?.map(v1896 => v479(v1896, ["pos", "pressure", "temp", "warnCode", "band", "level", "time"]))
      } : null), v478(v1887.messages && v1887.messages.noRead), (() => {
        try {
          const v1897 = v76()?.panel;
          if (v1897 && String(v1897.state || "") === "ready") {
            return "ready:" + (v1897.pending || "");
          } else {
            return "";
          }
        } catch {
          return "";
        }
      })(), new Date().toDateString()].join("");
    }
    const v484 = {
      homeSync(v1898) {
        const v1899 = v16.data.home;
        v1898.textContent = v1899?.refreshAt ? "同步于 " + v3.relTime(v1899.refreshAt) : "等车机上报";
      },
      tireRel(v1900) {
        const v1901 = v1900.dataset.t || "";
        if (!v1901) {
          return;
        }
        const v1902 = v1900.dataset.tip || "";
        v1900.title = v1902 + "（" + v3.relTime(v1901) + "）";
      },
      iosAppVersion(v1903) {
        const v1904 = v1903.querySelector(".v");
        if (v1904) {
          const v1905 = v401();
          v1904.textContent = v1905;
          v1904.title = v1905;
        }
      },
      updApp(v1906) {
        v1906.innerHTML = v75("app");
      },
      updPanel(v1907) {
        v1907.innerHTML = v75("panel");
      },
      footer(v1908) {
        v1908.textContent = v403();
      }
    };
    function v485() {
      v10().querySelectorAll("[data-rel]").forEach(v1909 => {
        const v1910 = v484[v1909.dataset.rel];
        if (v1910) {
          try {
            v1910(v1909);
          } catch {}
        }
      });
    }
    const v486 = {
      timer: 0,
      settled: false,
      pct: 0,
      stage: "正在加载"
    };
    function v487() {
      return v486.stage || "正在加载";
    }
    function v488(v1911) {
      if (v1911) {
        v486.stage = v1911;
      }
      try {
        const v1912 = document.getElementById("bootstage");
        if (v1912 && v1911 && v1912.textContent !== v1911) {
          v1912.textContent = v1911;
        }
      } catch {}
    }
    function v489(v1913) {
      if (!Number.isFinite(v1913)) {
        return;
      }
      const v1914 = Math.floor(Math.max(0, Math.min(100, v1913)) / 10) * 10;
      v486.pct = Math.max(v486.pct, window.__zeehoBootMeterState?.pct || 0, v1914);
      try {
        if (window.__zeehoBootMeter) {
          v486.pct = window.__zeehoBootMeter(v486.pct);
        } else {
          window.__zeehoBootMeterState = {
            pct: v486.pct,
            total: 10
          };
          const v1916 = document.getElementById("bootseg");
          if (v1916) {
            v1916.style.setProperty("--fill", v486.pct + "%");
            v1916.dataset.on = "1";
            v1916.setAttribute("aria-valuenow", String(v486.pct));
            v1916.setAttribute("aria-valuetext", "页面加载 " + v486.pct + "%");
          }
          const v1917 = document.getElementById("bootsegn");
          if (v1917) {
            v1917.textContent = String(v486.pct);
          }
        }
        const v1915 = document.getElementById("bootskel") || v10()?.querySelector(".boot-skeleton");
        if (v1915 && !v1915.dataset.prog) {
          v1915.dataset.prog = "1";
        }
      } catch {}
    }
    function v490(v1918) {
      if (v486.settled && v1918 !== "success") {
        return;
      }
      window.__zeehoBootState?.(v1918);
      const v1919 = document.getElementById("bootfallback");
      const v1920 = document.getElementById("bootskel");
      try {
        if (v1919) {
          v1919.dataset.state = v1918;
          const v1923 = v1919.querySelector(".bf-title");
          const v1924 = v1919.querySelector(".bf-sub");
          if (v1918 === "fail") {
            if (v1923) {
              v1923.textContent = "页面没能加载完成";
            }
            if (v1924) {
              v1924.textContent = "可能是网络中断或缓存损坏。点下面的按钮重来一次。";
            }
          } else {
            if (v1923) {
              v1923.textContent = "正在加载车辆数据…";
            }
            if (v1924) {
              v1924.textContent = "首次打开要下载并解析脚本，网速慢时可能需要几秒。";
            }
          }
        }
        const v1921 = [];
        if (v1920) {
          v1921.push(v1920);
        }
        const v1922 = v10()?.querySelector(".boot-skeleton");
        if (v1922) {
          v1921.push(v1922);
        }
        for (const v1925 of v1921) {
          v1925.dataset.state = v1918;
        }
        if (v1918 === "fail") {
          v488("加载失败");
        } else if (v1920?.dataset.prog || v1922) {
          v488("正在加载车辆数据");
        } else {
          v488("正在加载");
        }
      } catch {}
    }
    let v491 = false;
    function v492() {
      if (v491) {
        return;
      }
      v491 = true;
      try {
        const v1926 = document.getElementById("bootskel");
        if (v1926 && v1926.parentNode) {
          v1926.parentNode.removeChild(v1926);
        }
      } catch {}
      v495();
    }
    function v493() {
      const v1927 = v10();
      if (!v1927 || v1927.querySelector(".boot-skeleton")) {
        return false;
      }
      return v16.tab !== "home" || !!v16.data.home || !!API.authFailed || !v16.loading && (v16.noVehicle || !!v16.lastErr);
    }
    function v494() {
      if (v486.settled) {
        return;
      }
      v489(100);
      v486.settled = true;
      window.__zeehoBootSettled = true;
      if (v486.timer) {
        clearTimeout(v486.timer);
        v486.timer = 0;
      }
      if (window.__zeehoBootTimer) {
        clearTimeout(window.__zeehoBootTimer);
        window.__zeehoBootTimer = 0;
      }
      v490("success");
      v492();
      try {
        window.__zeehoLoadFonts?.();
      } catch {}
    }
    function v495() {
      try {
        for (const v1928 of ["topbar", "tabbar"]) {
          const v1929 = document.getElementById(v1928);
          if (!v1929) {
            continue;
          }
          if (v1929.classList.contains("is-boot")) {
            v1929.classList.remove("is-boot");
          }
          v1929.removeAttribute("aria-hidden");
        }
      } catch {}
    }
    function v496() {
      if (v486.settled) {
        return;
      }
      v490("loading");
      try {
        if (window.__zeehoBootTimer) {
          clearTimeout(window.__zeehoBootTimer);
          window.__zeehoBootTimer = 0;
        }
      } catch {}
      clearTimeout(v486.timer);
      v486.timer = setTimeout(() => {
        v486.timer = 0;
        if (v486.settled) {
          return;
        }
        v490("fail");
        console.warn("[boot] 首屏等待超时");
      }, 180000);
    }
    const v497 = v1930 => {
      if (!v1930 || v1930.tagName !== "SCRIPT" || !v1930.getAttribute?.("src")) {
        return false;
      }
      try {
        const v1931 = new URL(v1930.src, location.href);
        const v1932 = new URL(".", location.href);
        return v1931.origin === v1932.origin && v1931.pathname.startsWith(v1932.pathname + "js/");
      } catch {
        return false;
      }
    };
    try {
      window.addEventListener("error", v1933 => {
        if (v486.settled) {
          return;
        }
        if (v497(v1933 && v1933.target)) {
          v490("fail");
          return;
        }
        console.warn("[boot] 已忽略非致命错误");
      }, true);
      window.addEventListener("unhandledrejection", () => {
        if (v486.settled) {
          return;
        }
        console.warn("[boot] 已忽略未处理的 Promise");
      });
    } catch {}
    let v498 = 0;
    let v499;
    function v500({
      keepScroll: v1934
    } = {}) {
      if (v17()) {
        return;
      }
      if (v440.active) {
        v451();
      }
      v387();
      v1.inductiveUi?.restoreRecording?.();
      if (v16.tab === "settings" && Date.now() < v498) {
        clearTimeout(v499);
        v499 = setTimeout(() => v500({
          keepScroll: true
        }), v498 - Date.now() + 16);
        return;
      }
      v492();
      if (v10()) {
        v10().dataset.page = v16.tab;
      }
      v268();
      if (v16.tab === "me" && !v1.isIOS?.()) {
        try {
          v1.shell?.primeRangeHistory?.();
        } catch {}
      }
      if (v16.tab === "home" && !v202() && !document.hidden) {
        v1.shell?.primeRangeHistory?.();
      }
      v1.syncNearbyScan?.();
      const v1935 = v483();
      if (v1935 === v477 && !v465 && !v468) {
        v485();
        if (v493()) {
          v494();
        }
        return;
      }
      v477 = v1935;
      const v1936 = v475 && v475 !== v16.tab ? v476[v16.tab] > v476[v475] ? "fwd" : "back" : "";
      v475 = v16.tab;
      try {
        v368();
      } catch (v1946) {
        console.error("renderTabs failed", v1946);
      }
      const v1937 = v1934 ? v10().scrollTop : 0;
      let v1938;
      try {
        v1938 = v16.tab === "home" ? v400() : v16.tab === "settings" ? v148() : v461();
      } catch (v1947) {
        v1938 = "<div class=\"note bad\">" + v4.icon("alert", 18) + "<div>\n        渲染出错（数据里缺字段？）：" + v6(v1947 && v1947.message) + "\n        <br>切到「我的 → 登录与账号 → 看原始响应」能看到接口原始返回。\n      </div></div>";
        console.error("render failed", v1947);
      }
      const v1939 = v2?.error?.() || window.ACC?.error?.();
      const v1940 = v1939 ? v4.card("<div class=\"note bad\">" + v4.icon("alert", 18) + "<div>" + v6(v1939) + "</div></div>") : "";
      const v1941 = v16.tab === "home" ? v1.dashboardTheme?.notice() || "" : "";
      v1938 = v1940 + v464() + v1941 + v1938;
      const v1942 = v10().querySelector("model-viewer.hero-3d");
      const v1943 = v1942 ? null : v10().querySelector("img.hero-pic");
      v10().innerHTML = "<div class=\"page" + (v1936 ? " page-" + v1936 : "") + "\">" + v1938 + "</div>";
      const v1944 = v10().querySelector("model-viewer.hero-3d");
      const v1945 = v1944 ? null : v10().querySelector("img.hero-pic");
      if (v1943 && v1945 && v1943.complete && v1943.getAttribute("src") === v1945.getAttribute("src")) {
        const v1948 = v1945.classList.contains("hero-in");
        const v1949 = v1945.style.animationDelay;
        v1943.classList.remove("hero-in");
        v1943.style.animationDelay = v1948 ? v1949 : "";
        v1945.replaceWith(v1943);
        if (v1948) {
          v1943.offsetWidth;
          v1943.classList.add("hero-in");
        }
      }
      if (v1942 && v1944 && v1942.getAttribute("src") === v1944.getAttribute("src") && v1942.getAttribute("data-vs-model") === v1944.getAttribute("data-vs-model")) {
        const v1950 = v1944.classList.contains("hero-in");
        v1942.classList.remove("hero-in");
        const v1951 = v1942.classList.contains("vs-model-ready");
        v1944.replaceWith(v1942);
        if (v1951) {
          v1942.classList.add("vs-model-ready");
        }
        if (v1950 && !v1951) {
          v1942.offsetWidth;
          v1942.classList.add("hero-in");
        }
        v1.vehicleStyle?.afterRender?.(v1942.closest(".hero-stage") || v1942);
      }
      v10().scrollTop = v1937;
      v358();
      v4.fitText(v10());
      v9().scrollTop = 0;
      if (v16.tab === "home") {
        v439();
      }
      if (v16.tab === "home" && v473()) {
        v4.animNums(v10(), {
          skip: v467
        });
        v4.animNums(v10(), {
          sel: v467,
          fromZero: true,
          dur: v471,
          since: v470
        });
      } else {
        v4.animNums(v10());
      }
      if (v16.tab === "home") {
        v1.dashboardTheme?.afterRender();
        v1.inductiveUi?.bindHero(v10());
        v1.vehicleStyle?.afterRender?.(v10());
      }
      if (v493()) {
        v494();
      }
    }
    function v501() {
      const v1952 = v16.theme;
      const v1953 = matchMedia("(prefers-color-scheme: light)").matches ? "浅色" : "深色";
      const v1954 = [["system", "跟随系统", "auto"], ["light", "浅色", "sun"], ["dark", "深色", "moon"]].map(([v1960, v1961, v1962]) => "<button type=\"button\" class=\"theme-mode" + (v1952 === v1960 ? " sel" : "") + "\" data-act=\"settheme\" data-v=\"" + v1960 + "\" aria-pressed=\"" + (v1952 === v1960) + "\">" + v4.icon(v1962, 18) + "<span>" + v1961 + "</span></button>").join("");
      const v1955 = v191.map(({
        v: v1963,
        t: v1964
      }) => {
        const v1965 = v5.colors({
          ...v16,
          accent: v1963
        }, false);
        const v1966 = v1963.startsWith("multi-");
        const v1967 = v1966 ? "conic-gradient(" + v1965.primary + " 0 25%," + v1965.secondary + " 25% 50%," + v1965.tertiary + " 50% 75%," + v1965["surface-container-highest"] + " 75%)" : v1965["primary-container"];
        return "\n      <button type=\"button\" class=\"accent-sw" + (v16.accent === v1963 ? " sel" : "") + "\" data-act=\"setaccent\" data-v=\"" + v1963 + "\" aria-label=\"" + v1964 + "\" aria-pressed=\"" + (v16.accent === v1963) + "\" title=\"" + v1964 + "\" style=\"--sw-bg:" + v1967 + ";--sw-ink:" + v1965["on-primary-container"] + "\">\n        <span class=\"dot\">" + (v16.accent === v1963 ? "<span class=\"sw-check\">" + v4.icon("check", 18) + "</span>" : "") + "</span>\n        <span class=\"lb\">" + v1964 + "</span>\n      </button>";
      }).join("");
      const v1956 = v5.colors({
        ...v16,
        accent: "custom"
      }, false);
      const v1957 = "<button type=\"button\" class=\"accent-sw" + (v16.accent === "custom" ? " sel" : "") + "\" data-act=\"edittheme\" aria-label=\"编辑自定义主题\" aria-pressed=\"" + (v16.accent === "custom") + "\" style=\"--sw-bg:" + v1956["primary-container"] + ";--sw-ink:" + v1956["on-primary-container"] + "\"><span class=\"dot\">" + v4.icon("edit", 18) + "</span><span class=\"lb\">编辑</span></button>";
      const v1958 = v5.readSystem();
      const v1959 = v12() || v13("android") && (v1958.available || v16.accent === "system") ? "<button type=\"button\" class=\"accent-sw" + (v16.accent === "system" ? " sel" : "") + "\" data-act=\"systemtheme\" aria-label=\"系统配色\" aria-pressed=\"" + (v16.accent === "system") + "\" title=\"" + (v1958.available ? "跟随手机的动态调色板" : v1958.reason) + "\" " + (v1958.available || v12() ? "" : "disabled") + " style=\"--sw-bg:" + (v1958.available && v1958.colors ? v1958.colors.primaryContainer || "var(--md-sys-color-primary-container)" : "var(--md-sys-color-surface-container-highest)") + ";--sw-ink:var(--md-sys-color-on-surface)\"><span class=\"dot\">" + v4.icon("auto", 18) + "</span><span class=\"lb\">系统</span></button>" : "";
      v4.sheet(v9(), {
        key: "theme",
        title: "主题",
        sub: "深浅模式 · 主题色",
        className: "theme-sheet",
        body: "<div class=\"theme-page\">\n        <section class=\"theme-section\" aria-label=\"外观模式\"><h3 class=\"preferences-heading\">外观模式</h3><div class=\"theme-modes\" role=\"group\" aria-label=\"深浅模式\">" + v1954 + "</div>" + (v1952 === "system" ? "<p class=\"theme-mode-hint\">当前随系统使用" + v1953 + "</p>" : "") + "</section>\n        <section class=\"theme-section\" aria-label=\"主题色\"><h3 class=\"preferences-heading\">主题色</h3><div class=\"theme-palette\"><div class=\"accent-grid\">" + v1955 + v1959 + v1957 + "</div></div></section>\n        <section class=\"theme-section\" aria-label=\"个性化\"><h3 class=\"preferences-heading\">个性化</h3><div class=\"theme-cards\">\n          <button type=\"button\" class=\"theme-card\" data-act=\"dashboard-theme\"><span class=\"theme-card-icon\">" + v4.icon("edit", 20) + "</span><span class=\"theme-card-copy\"><span class=\"theme-card-title\">自定义仪表盘</span><span class=\"preferences-description\">仅更改仪表盘内容</span></span>" + v4.icon("right", 18) + "</button>\n          <button type=\"button\" class=\"theme-card\" data-act=\"vehicle-style\"><span class=\"theme-card-icon\">" + v4.icon("bike", 20) + "</span><span class=\"theme-card-copy\"><span class=\"theme-card-title\">车辆立绘 / 3D 模型</span><span class=\"preferences-description\">替换爱车页的车辆展示</span></span>" + v4.icon("right", 18) + "</button>\n        </div></section>\n      </div>"
      });
    }
    function v502() {
      if (v4.currentSheet("theme-edit")) {
        return;
      }
      v192 = v5.custom(v16.customColors);
      const v1968 = v5.colors({
        ...v16,
        accent: "custom",
        customColors: v192
      }, false);
      const v1969 = (v1971, v1972, v1973 = false) => "<div class=\"theme-color-field\"><label for=\"theme-" + v1971 + "\">" + v1972 + "</label><div class=\"theme-color-inputs\"><input type=\"color\" data-color=\"" + v1971 + "\" aria-label=\"" + v1972 + "取色器\" value=\"" + (v192[v1971] || v1968[v1971]) + "\"><input id=\"theme-" + v1971 + "\" data-hex=\"" + v1971 + "\" value=\"" + (v192[v1971] || "") + "\" placeholder=\"" + (v1973 ? "自动生成" : "#7457b8") + "\" maxlength=\"7\" autocomplete=\"off\" spellcheck=\"false\" aria-describedby=\"theme-edit-error\">" + (v1973 ? "<button type=\"button\" class=\"btn text small\" data-auto=\"" + v1971 + "\">自动</button>" : "") + "</div></div>";
      let v1970;
      v1970 = v4.sheet(v9(), {
        key: "theme-edit",
        title: "编辑主题",
        sub: "调整颜色，实时预览全局效果",
        body: "<form class=\"theme-editor\">" + v1969("primary", "主色") + "<div class=\"theme-random-row\"><button type=\"button\" class=\"btn tonal\" data-random-theme>随机</button><span class=\"theme-random-label\" aria-live=\"polite\">" + v6(v5.androidStyles.find(v1974 => v1974.id === v192.style).label) + "</span></div><details><summary>辅助颜色</summary>" + v1969("secondary", "第二强调色", true) + v1969("tertiary", "第三强调色", true) + "</details><div class=\"theme-preview\" aria-label=\"主题预览\"><span class=\"theme-preview-primary\">主色</span><span class=\"theme-preview-secondary\">辅助</span><span class=\"theme-preview-tertiary\">点缀</span></div><div id=\"theme-edit-error\" class=\"theme-edit-error\" role=\"status\" aria-live=\"polite\"></div><div class=\"theme-edit-actions\"><button type=\"button\" class=\"btn text\" data-cancel-theme>取消</button><button type=\"submit\" class=\"btn\">保存</button></div></form>",
        onDismiss: () => {
          v192 = null;
          v268();
        },
        onMount: v1975 => {
          const v1976 = v1975.querySelector(".theme-editor");
          const v1977 = v1976.querySelector("#theme-edit-error");
          const v1978 = [...v1976.querySelectorAll("[data-hex]")];
          const v1979 = () => {
            let v1981 = true;
            for (const v1982 of v1978) {
              const v1983 = v1982.value.trim();
              const v1984 = !!v5.hex(v1983) || v1982.dataset.hex !== "primary" && !v1983;
              v1982.setAttribute("aria-invalid", String(!v1984));
              v1982.setCustomValidity(v1984 ? "" : "请输入 #RRGGBB 格式的颜色");
              v1981 = v1981 && v1984;
            }
            v1977.textContent = v1981 ? "" : "请输入 #RRGGBB 格式的颜色，例如 #7457b8";
            return v1981;
          };
          const v1980 = () => {
            if (!v1979()) {
              return;
            }
            v192 = v5.custom({
              ...v192,
              ...Object.fromEntries(v1978.map(v1986 => [v1986.dataset.hex, v1986.value.trim()]))
            });
            v268();
            const v1985 = v5.colors({
              ...v16,
              accent: "custom",
              customColors: v192
            }, false);
            v1976.querySelectorAll("[data-color]").forEach(v1987 => {
              v1987.value = v192[v1987.dataset.color] || v1985[v1987.dataset.color];
            });
          };
          v1976.addEventListener("input", v1988 => {
            if (v1988.target.dataset.color) {
              v1976.querySelector("[data-hex=\"" + v1988.target.dataset.color + "\"]").value = v1988.target.value;
            }
            v1980();
          });
          v1976.querySelectorAll("[data-auto]").forEach(v1989 => v1989.addEventListener("click", () => {
            v1976.querySelector("[data-hex=\"" + v1989.dataset.auto + "\"]").value = "";
            v1980();
          }));
          v1976.querySelector("[data-random-theme]").addEventListener("click", () => {
            v192 = v5.randomCustom(v192);
            for (const v1990 of v1978) {
              v1990.value = v192[v1990.dataset.hex] || "";
            }
            v1976.querySelector(".theme-random-label").textContent = v5.androidStyles.find(v1991 => v1991.id === v192.style).label;
            v1980();
          });
          v1976.querySelector("[data-cancel-theme]").addEventListener("click", () => v4.closeSheet(v1970));
          v1976.addEventListener("submit", v1992 => {
            v1992.preventDefault();
            if (!v1979()) {
              return;
            }
            v1980();
            v16.customColors = v5.custom(v192);
            v16.accent = "custom";
            v192 = null;
            v232();
            v268();
            v501();
            v4.closeSheet(v1970);
          });
        }
      });
      v268();
    }
    function v503() {
      const v1993 = v16.data.home;
      const v1994 = v237();
      const v1995 = v1994 ? window.ACC.mergedVehicles() : v16.vehicles;
      const v1996 = v1995.map(v2000 => {
        const v2001 = v1994 && window.ACC.count() > 1 ? "<span class=\"acc-badge" + (v2000.isOwner ? " primary" : "") + "\">" + v6(v2000.ownerLabel || "其他账号") + "</span>" : "";
        return "\n      <div class=\"sheet-item" + (v2000.vin === v16.vin ? " sel" : "") + "\" data-act=\"pickvin\" data-vin=\"" + v6(v2000.vin) + "\">\n        <span class=\"sheet-item-text\">\n          <span class=\"t\">" + v6(v2000.name) + v2001 + "</span>\n          <span class=\"s\">" + v6(v2000.type) + (v2000.shared ? " · 共享（" + v6(v2000.shareNick || "他人") + "）" : "") + "</span>\n        </span>\n        <span class=\"tail\">" + (v2000.vin === v16.vin ? v4.icon("check", 20) : "") + "</span>\n      </div>";
      }).join("") || "<div class=\"muted\">车辆列表没取到</div>";
      const v1997 = (v16.vehicles.find ? v16.vehicles : v1995).find(v2002 => v2002.vin === v16.vin) || v1995.find(v2003 => v2003.vin === v16.vin);
      const v1998 = v1993 ? "\n      <div class=\"card mt16\">\n        <div class=\"card-title\">当前车辆</div>\n        " + v4.kv("车型", v1993.type || "—") + "\n        " + v4.kv("VIN", v1993.vin, {
        mono: true
      }) + "\n        " + v4.kv("在线状态", v1993.online ? "在线" : "离线") + "\n        " + (v1997?.shared ? v4.kv("共享自", v1997.shareNick || "他人") : "") + "\n      </div>" : "";
      const v1999 = v1994 ? v1995.length + " 台车 · " + window.ACC.count() + " 个账号共用一份列表" : (window.ACC.active() ? window.ACC.labelOf(window.ACC.active()) + " · " : "") + "共 " + v16.vehicles.length + " 台车";
      v4.sheet(v9(), {
        key: "vehicles",
        title: "切换车辆",
        sub: v1999,
        body: v1996 + v1998
      });
    }
    function v504(v2004 = document.body) {
      v2004.querySelectorAll("[data-act]").forEach(v2005 => {
        const v2006 = v2005.tagName;
        if (v2006 === "BUTTON" || v2006 === "A" || v2006 === "INPUT" || v2006 === "SELECT" || v2006 === "TEXTAREA") {
          return;
        }
        if (v2005.querySelector("[data-act]")) {
          return;
        }
        if (!v2005.hasAttribute("role")) {
          v2005.setAttribute("role", v2005.classList.contains("switch") ? "switch" : "button");
        }
        if (!v2005.hasAttribute("tabindex")) {
          v2005.setAttribute("tabindex", "0");
        }
        if (v2005.classList.contains("switch") && !v2005.hasAttribute("aria-checked")) {
          v2005.setAttribute("aria-checked", v2005.classList.contains("on") ? "true" : "false");
        }
        const v2007 = v2005.getAttribute("title");
        if (v2007 && !v2005.hasAttribute("aria-label")) {
          v2005.setAttribute("aria-label", v2007);
        }
      });
    }
    function v505() {
      v504();
      try {
        new MutationObserver(() => v504()).observe(document.body, {
          childList: true,
          subtree: true
        });
      } catch {}
      v9().addEventListener("keydown", v2008 => {
        if (v2008.key !== "Enter" && v2008.key !== " ") {
          return;
        }
        if (v2008.target.closest?.("input,textarea,select,[contenteditable=\"true\"]")) {
          return;
        }
        const v2009 = v2008.target.closest?.("[data-act]");
        if (!v2009) {
          return;
        }
        const v2010 = v2009.tagName;
        if (v2010 === "BUTTON" || v2010 === "A" || v2010 === "INPUT" || v2010 === "SELECT" || v2010 === "TEXTAREA") {
          return;
        }
        v2008.preventDefault();
        v2009.click();
      });
    }
    const v506 = {
      tab: "切换页面",
      batt: "查看电量历史",
      battrefresh: "刷新电量历史",
      battr: "切换电量范围",
      messages: "查看消息",
      msg: "查看消息详情",
      msgread: "标记消息已读",
      msgclear: "清理消息标记",
      theme: "打开主题设置",
      edittheme: "编辑主题",
      systemtheme: "使用系统主题",
      settheme: "修改主题模式",
      "dashboard-theme": "打开自定义仪表盘",
      "vehicle-style": "打开车辆样式设置",
      setaccent: "修改主题取色",
      volt: "切换电压/续航显示",
      "hide-seat-status": "修改坐垫状态显示",
      "seat-hide-sheet": "选择坐垫相关隐藏档位",
      "seat-hide-set": "修改坐垫相关隐藏档位",
      debug: "管理登录与账号",
      accounts: "查看账号",
      accadd: "添加账号",
      accswitch: "切换账号",
      accdetail: "查看账号详情",
      accmode: "修改账号展示模式",
      accsigntoggle: "修改账号任务参与范围",
      accupdatetoken: "更新账号凭据",
      accdel: "删除账号",
      vehicles: "查看车辆列表",
      pickvin: "切换车辆",
      action: "打开车辆操作",
      setting: "查看车辆设置",
      toggle: "修改车辆设置",
      "dowrite-val": "写入车辆设置",
      tasks: "打开任务面板",
      socialDetail: "查看账号明细",
      socialRefresh: "刷新账号明细",
      socialtab: "切换积分明细类型",
      socialprizemore: "加载更多盲盒明细",
      postDelete: "删除动态",
      chargehistory: "查看充电历史",
      chgsession: "查看充电记录",
      chghistclear: "清理充电历史",
      chghidesession: "按条隐藏/恢复充电记录",
      chghidden: "查看已隐藏的充电记录",
      battdetail: "查看电池详情",
      battsession: "查看电池充电场次曲线",
      battnominal: "打开电池设置",
      recentchargetoggle: "展开或收起最近充电",
      lastchgdismiss: "隐藏上次充电入口",
      chgstopdismiss: "关闭充电结束提示",
      chargesheet: "查看充电曲线",
      chgrefresh: "刷新充电采样",
      chgclear: "清理充电估算",
      widgets: "查看桌面组件",
      widgetedit: "编辑桌面组件",
      wreset: "重置桌面组件",
      wstatpick: "修改组件指标",
      opencfmoto: "打开极核 App",
      reload: "刷新页面",
      retryauth: "重新检查登录态",
      resetdemo: "打开清除登录确认",
      resetdemoconfirm: "清除登录并回到演示",
      bigmap: "打开地图",
      mapretry: "重试地图",
      mapmode: "切换地图显示",
      cast: "打开投屏",
      wallpaper: "打开车机壁纸",
      firmware: "打开固件页面",
      ride: "查看骑行记录",
      riderefresh: "刷新骑行记录",
      ridegrid: "切换骑行分析布局",
      btdebug: "打开蓝牙调试台",
      capturestart: "开始登录抓取",
      capturestop: "停止登录抓取",
      capturecancel: "取消登录抓取",
      capturelaunch: "打开极核进行抓取",
      captureuse: "使用抓取结果",
      capturecopy: "复制登录信息",
      capturediscard: "丢弃抓取结果",
      capturepaste: "导入登录信息",
      capturediag: "查看登录诊断",
      capturediagclear: "清空登录诊断",
      cachemanager: "打开缓存管理",
      cacheclear: "清理所选缓存",
      sendcode: "请求短信验证",
      loginok: "提交登录验证",
      savetoken: "保存登录凭据",
      copy: "复制内容",
      copyinput: "复制输入内容",
      copytoken: "复制账号凭据",
      copyacctoken: "复制账号凭据",
      staledata: "查看数据更新时间",
      anomaly: "查看车辆异常明细"
    };
    function v507(v2011, v2012) {
      try {
        const v2013 = v236() ? window.ACC.active() : null;
        const v2014 = API.diagScope?.(v2013 ? window.ACC.snapshot(v2013.id) : null) || {};
        window.DIAG?.event?.(v2011, {
          ...window.DIAG?.capture?.(),
          ...v2014,
          category: "action",
          phase: "start",
          detail: String(v2012 || "")
        });
      } catch {}
    }
    function v508(v2015) {
      const v2016 = v506[v2015];
      if (!v2016) {
        return;
      }
      try {
        const v2017 = v236() ? window.ACC.active() : null;
        const v2018 = API.diagScope?.(v2017 ? window.ACC.snapshot(v2017.id) : null) || {};
        window.DIAG?.event?.(v2016, {
          ...window.DIAG?.capture?.(),
          ...v2018,
          category: "action",
          phase: "start",
          detail: "用户发起操作；实际结果见后续操作或请求记录"
        });
      } catch {}
    }
    let v509 = false;
    function v510() {
      v360();
      if (typeof v354 === "function") {
        v354();
      }
      if (v509) {
        return;
      }
      const v2019 = v9();
      if (!v2019 || typeof v2019.addEventListener !== "function") {
        return;
      }
      v509 = true;
      v505();
      window.addEventListener("popstate", v448);
      window.addEventListener("hashchange", v448);
      v2019.addEventListener("click", async v2020 => {
        const v2021 = v2019.querySelector?.(".app-log-menu[open]");
        if (v2021 && !v2020.target.closest?.(".app-log-menu")) {
          v2021.removeAttribute("open");
        }
        const v2022 = v2020.target.closest("[data-act]");
        if (!v2022) {
          return;
        }
        const v2023 = v2022.dataset.act;
        if (v2023 === "diagexport" || v2023 === "diagclear") {
          v2022.closest?.("[data-diag-menu]")?.removeAttribute("open");
        }
        if (v2023 === "accountcopy" || v2023 === "accountpaste") {
          if (v12()) {
            return v15("账号备份与导入");
          }
          if (v17()) {
            return;
          }
          if (v2023 === "accountcopy") {
            v1.domainMigration?.copy?.();
          } else {
            v1.domainMigration?.paste?.();
          }
          return;
        }
        if (v17()) {
          return;
        }
        if (v12() && (/^(?:bg(?:enable|disable|battery|opennotify|root(?:export|check))|autotoggle|autoscopetoggle|notifytoggle|capture(?:start|stop|cancel|launch|use|copy|discard|paste|clip|diagcopy|diagclear)|copytoken|copyinput|savetoken|sendcode|loginok|account(?:copy|paste|refresh|delete|remove|switch))$/.test(v2023) || ["dowrite", "dowrite-val", "sendcmd", "cmdsend", "runsteps", "msgread", "msgclear"].includes(v2023))) {
          v15("此操作");
          return;
        }
        if (v2023 !== "tab") {
          v508(v2023);
        }
        switch (v2023) {
          case "tab":
            {
              v356();
              const v2024 = v2022.dataset.tab;
              if (v2024 === v16.tab) {
                v507("刷新当前页", "" + v16.tab);
                v299();
                break;
              }
              v507("切换页面", v16.tab + " → " + v2024);
              v16.tab = v2024;
              if (v2024 === "me") {
                v1.mem.bgCache = null;
                v1.mem.bgCacheAt = 0;
                v1.shell?.invalidateNotify?.();
              }
              if (v16.tab === "home") {
                v468 = true;
                v465 = true;
              }
              v500();
              v299();
              break;
            }
          case "batt":
            v63();
            break;
          case "battdetail":
            {
              const v2025 = v162();
              const v2026 = v34({
                scope: v2025
              });
              v188({
                force: true
              });
              if (v163(v2025)) {
                v299({
                  silent: true
                }).then(() => {
                  if (v163(v2025) && v4.sheetAlive(v2026)) {
                    v34({
                      handle: v2026,
                      scope: v2025
                    });
                  }
                });
              }
              break;
            }
          case "battdetailrange":
            {
              const v2027 = v2022.dataset.v;
              if (!v44.some(([v2029]) => v2029 === v2027) || v2027 === v16.battRange) {
                break;
              }
              const v2028 = v162();
              v16.battRange = v2027;
              v1.mem.battCache = null;
              v232();
              if (v163(v2028)) {
                const v2030 = v4.currentSheet("battdetail");
                if (v2030 && v4.sheetAlive(v2030)) {
                  v34({
                    handle: v2030,
                    scope: v2028
                  });
                }
              }
              break;
            }
          case "battsession":
            v1.batterydetail.sessionSheet(Number(v2022.dataset.i) || 0);
            break;
          case "battnominal":
            v150();
            break;
          case "bgcheckhint":
            v54();
            break;
          case "bgrefresh":
            v1.shell.refreshBgGuide();
            break;
          case "bgconfirm":
            v1.shell.confirmBgGuide(v2022.dataset.k);
            break;
          case "bgautostart":
            await Promise.resolve(v1.shell.openBgGuideSettings("autostart"));
            break;
          case "bgappsettings":
            await Promise.resolve(v1.shell.openBgGuideSettings("app"));
            break;
          case "bgtasks":
            v55();
            break;
          case "bgnotifysettings":
            v51();
            break;
          case "notifyhistory":
            v117?.("notification");
            v116();
            break;
          case "notifyhistoryclear":
            {
              let v2031 = false;
              try {
                v2031 = (await window.DIAG?.clear?.()) === true;
              } catch {}
              if (v2031) {
                v116();
              } else {
                v4.toast(v9(), "应用日志未能全部清理，请稍后重试。", 4000);
              }
              break;
            }
          case "notifytoggle":
            {
              const v2032 = v2022.dataset.k;
              const v2033 = v2022.dataset.v !== "1";
              const v2034 = v162();
              const v2035 = v4.currentSheet("bgnotifysheet");
              await Promise.resolve(v70(v2032, v2033));
              if (v163(v2034) && v4.currentSheet("bgnotifysheet") === v2035 && v4.sheetAlive(v2035)) {
                v51();
              }
              break;
            }
          case "bgopennotify":
            {
              const v2036 = v162();
              const v2037 = v4.currentSheet("bgnotifysheet");
              await Promise.resolve(v1.shell.openBgGuideSettings?.("notifications"));
              if (!v163(v2036)) {
                break;
              }
              v1.mem.bgCache = null;
              v45.at = 0;
              setTimeout(() => {
                if (v163(v2036) && v4.currentSheet("bgnotifysheet") === v2037 && v4.sheetAlive(v2037)) {
                  v51();
                }
              }, 600);
              break;
            }
          case "autotoggle":
            {
              const v2038 = v2022.dataset.k;
              const v2039 = v2022.dataset.v !== "1";
              const v2040 = v162();
              const v2041 = v4.currentSheet("bgtasksheet");
              if (v2038 === "background") {
                if ((await Promise.resolve(v1.shell.setBackground?.(v2039))) !== true || !v163(v2040)) {
                  break;
                }
                v42.background = v2039;
                v1.mem.bgCache = null;
              } else {
                v65({
                  [v2038]: v2039
                });
              }
              v500({
                keepScroll: true
              });
              {
                const v2042 = v4.currentSheet("bgtasksheet");
                if (v2042 === v2041 && v4.sheetAlive(v2042)) {
                  v55();
                }
              }
              break;
            }
          case "autoscopetoggle":
            {
              v1.shell.toggleAutoScope(v2022.dataset.id, v2022.dataset.k);
              break;
            }
          case "bgenable":
            {
              const v2043 = v162();
              const v2044 = await Promise.resolve(v1.shell.setBackground?.(true));
              if (!v163(v2043)) {
                break;
              }
              if (v2044 === true) {
                v1.mem.bgCache = null;
                v67("后台同步已开启并运行");
              } else {
                v4.toast(v9(), "后台同步未能开启，请稍后重试");
              }
              break;
            }
          case "bgbattery":
            await Promise.resolve(v1.shell.openBgGuideSettings?.("battery"));
            break;
          case "bgexactalarm":
            await Promise.resolve(v1.shell.openBgGuideSettings?.("exactalarm"));
            break;
          case "bgrootmode":
            v1.shell.rootEnhanceSheet();
            break;
          case "bgrootexport":
          case "bgrootcheck":
            v1.shell.checkRootEnhance();
            break;
          case "bgroottoggle":
            v1.shell.setRootEnhanceEnabled(v2022.dataset.v);
            break;
          case "bgrootcancel":
            v4.closeSheet();
            break;
          case "tirehist":
            v1.tirehist.openTireHistory(v2022.dataset.tire);
            break;
          case "tirer":
            {
              const v2045 = v2022.dataset.v;
              if (!v1.tirehist.RANGES.some(([v2046]) => v2046 === v2045)) {
                break;
              }
              v1.tirehist.setRange(v2045);
              break;
            }
          case "tirerefresh":
            v1.tirehist.refresh();
            break;
          case "battr":
            {
              const v2047 = v2022.dataset.v;
              if (v44.some(v2048 => v2048[0] === v2047) && v2047 !== v16.battRange) {
                v16.battRange = v2047;
                v1.mem.battCache = null;
                v232();
                if (document.querySelector(".sheet.show [data-act=\"battr\"]")) {
                  v68();
                } else {
                  v500({
                    keepScroll: true
                  });
                }
              }
              break;
            }
          case "battrefresh":
            v1.mem.battCache = null;
            v43.delete(v16.vin + "|" + v16.battRange);
            v68();
            break;
          case "checkapp":
            v57();
            break;
          case "checkiosupdate":
            await v57();
            break;
          case "updline":
            v1.auth?.panelLineSelSheet({
              updateCheck: true,
              updateTarget: v2022.dataset.v === "app" ? "app" : "panel"
            });
            break;
          case "checkpage":
            v58();
            break;
          case "panelupdate":
            v69();
            break;
          case "panelrestart":
            v69();
            break;
          case "appdownload":
            if (v202()) {
              break;
            }
            v4.closeSheet();
            await v1.shell.downloadAppUpdate?.();
            break;
          case "svipsheet":
            v73();
            break;
          case "messages":
            {
              const v2049 = v158();
              let v2050 = true;
              const v2051 = v114({
                loading: v2050
              });
              const v2052 = () => {
                if (v159(v2049) && v4.sheetAlive(v2051)) {
                  v114({
                    loading: v2050
                  });
                  v500({
                    keepScroll: true
                  });
                }
              };
              await Promise.all([v121().finally(() => {
                v2050 = false;
                v2052();
              }), Promise.resolve(v1.media?.refreshMarketReplies(true)).finally(v2052)]);
              break;
            }
          case "marketreply":
            v1.media?.openMarketReply(v2022.dataset.id);
            break;
          case "marketreplynotify":
            {
              const v2053 = v1.media?.replyAlertsEnabled();
              const v2054 = await v2.setAsync("zeeho.market-replies-alerts", v2053 ? "0" : "1");
              if (v2054) {
                v51(false);
                v500({
                  keepScroll: true
                });
              }
              break;
            }
          case "msg":
            v113(v2022.dataset.id);
            break;
          case "msgread":
            {
              const v2055 = v158();
              const v2056 = v4.currentSheet("msgs");
              v167(["msg_list", "msg_unread"]);
              const v2057 = (v16.data.messages?.list || []).map(v2059 => String(v2059.id));
              const v2058 = await API.call("msg_read_all", {}, {
                force: true,
                isLatest: () => v159(v2055)
              });
              if (!v159(v2055) || v2058.stale) {
                break;
              }
              v4.toast(v9(), v2058.ok ? "已全部标为已读" : "标为已读失败：" + (v2058.message || v2058.err || v2058.code), 3000);
              if (v2058.ok) {
                v112(v2057);
              }
              await v121();
              if (!v159(v2055)) {
                break;
              }
              v500({
                keepScroll: true
              });
              if (v4.sheetAlive(v2056)) {
                v114();
              }
              break;
            }
          case "msgclear":
            {
              if (v2022.dataset.arm !== "1") {
                v2022.dataset.arm = "1";
                v2022.classList.add("armed");
                v4.toast(v9(), "再点一次清除全部消息", 2600);
                setTimeout(() => {
                  if (v2022.dataset.arm === "1") {
                    v2022.dataset.arm = "";
                    v2022.classList.remove("armed");
                  }
                }, 3000);
                break;
              }
              v2022.dataset.arm = "";
              v2022.classList.remove("armed");
              const v2060 = v158();
              const v2061 = v4.currentSheet("msgs");
              v167(["msg_list", "msg_unread"]);
              const v2062 = await API.call("msg_del_all", {}, {
                force: true,
                isLatest: () => v159(v2060)
              });
              if (!v159(v2060) || v2062.stale) {
                break;
              }
              v4.toast(v9(), v2062.ok ? "消息已清空" : "清除失败：" + (v2062.message || v2062.err || v2062.code), 3000);
              if (v2062.ok) {
                v111();
              }
              await v121();
              if (!v159(v2060)) {
                break;
              }
              v500({
                keepScroll: true
              });
              if (v4.sheetAlive(v2061)) {
                v114();
              }
              break;
            }
          case "theme":
            v501();
            break;
          case "dashboard-theme":
            v1.dashboardTheme?.open();
            break;
          case "vehicle-style":
            v1.vehicleStyle?.open();
            break;
          case "edittheme":
            v502();
            break;
          case "systemtheme":
            {
              if (v12()) {
                v15("Android 系统配色");
                break;
              }
              const v2063 = v5.readSystem();
              if (!v2063.available) {
                break;
              }
              v16.accent = "system";
              v16.systemColors = v2063.colors;
              v232();
              v268();
              v501();
              window.DIAG?.event?.("主题设置已接受", {
                category: "settings",
                phase: "accepted",
                detail: "主题取色：跟随系统"
              });
              break;
            }
          case "settheme":
            {
              const v2064 = v2022.dataset.v;
              v16.theme = v2064 === "light" || v2064 === "dark" ? v2064 : "system";
              v232();
              window.DIAG?.event?.("主题模式已接受", {
                category: "settings",
                phase: "accepted",
                detail: v16.theme === "system" ? "跟随系统" : v16.theme === "light" ? "浅色" : "深色"
              });
              v268();
              v501();
              v363();
              break;
            }
          case "setaccent":
            {
              const v2065 = v2022.dataset.v;
              if (!v191.some(v2066 => v2066.v === v2065)) {
                break;
              }
              v16.accent = v2065;
              v16.accentV = 2;
              v232();
              window.DIAG?.event?.("主题取色已接受", {
                category: "settings",
                phase: "accepted",
                detail: String(v191.find(v2067 => v2067.v === v2065)?.n || v2065)
              });
              v268();
              v501();
              break;
            }
          case "ridegrid":
            {
              const v2068 = v2022.querySelector(".statgrid");
              if (!v2068) {
                break;
              }
              v16.rideGrid2 = !v16.rideGrid2;
              v232();
              window.DIAG?.event?.("骑行分析布局已接受", {
                category: "settings",
                phase: "accepted",
                detail: v16.rideGrid2 ? "2×2" : "3×2"
              });
              const v2069 = [...v2068.querySelectorAll(".stat")];
              const v2070 = new Map(v2069.map(v2074 => [v2074, v2074.getBoundingClientRect()]));
              const v2071 = v2069.filter(v2075 => !v16.rideGrid2 || !v2075.classList.contains("stat-extra"));
              const v2072 = Math.max(v2071.length, 1);
              const v2073 = v2072 === 2 || v2072 === 4 ? 2 : v2072 >= 3 ? 3 : 1;
              v2068.style.gridTemplateColumns = "repeat(" + v2073 + ",1fr)";
              v2068.classList.toggle("compact", v16.rideGrid2);
              v2022.title = v16.rideGrid2 ? "点击展开全部六项指标" : "点击收起急刹车/超速";
              if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
                break;
              }
              v2069.forEach(v2076 => {
                const v2077 = v2070.get(v2076);
                const v2078 = v2076.getBoundingClientRect();
                if (!v2077.width || !v2078.width) {
                  return;
                }
                const v2079 = v2077.left - v2078.left;
                const v2080 = v2077.top - v2078.top;
                if (!v2079 && !v2080) {
                  return;
                }
                v2076.animate([{
                  transform: "translate(" + v2079 + "px, " + v2080 + "px)"
                }, {
                  transform: "none"
                }], {
                  duration: 260,
                  easing: "cubic-bezier(.2,0,0,1)"
                });
              });
              break;
            }
          case "volt":
            {
              const v2081 = v396(v16.voltView);
              const v2082 = v396(v2081.next);
              v16.voltView = v2082.view;
              v232();
              window.DIAG?.event?.("读数切换已接受", {
                category: "settings",
                phase: "accepted",
                detail: v2082.label || "收起"
              });
              const v2083 = v16.data.battery || {};
              const v2084 = v16.data.home || {};
              const v2085 = v2082.key === "range" ? v1.batteryRange ? v1.batteryRange.readout(v2084, v2083) : v2084.range ?? null : v2083.voltage ?? v2083.bmsVoltage ?? null;
              const {
                key: v2086,
                unit: v2087
              } = v2082;
              const v2088 = v2022.querySelector("b.vnum");
              const v2089 = ++v469;
              const v2090 = () => {
                if (v2089 !== v469 || !v2088) {
                  return;
                }
                v2088.innerHTML = (v2085 === null ? "—" : "<span data-num=\"" + v2085 + "\" data-key=\"" + v2086 + "\">" + v2085 + "</span>") + ("<i>" + v2087 + "</i>");
                v2088.style.opacity = "";
                v2088.style.filter = "";
              };
              v397(v2022, v2082);
              if (v2081.view === "dot" || v2082.view === "dot") {
                if (v2082.view === "dot" && v2088) {
                  v2088.style.opacity = "";
                  v2088.style.filter = "";
                }
                if (v2081.view === "dot") {
                  v2090();
                }
                v2022.classList.toggle("hide", v2082.view === "dot");
              } else if (v2088) {
                v2088.style.opacity = "0";
                v2088.style.filter = "blur(3px)";
                setTimeout(v2090, 180);
              }
              break;
            }
          case "debug":
            if (v236()) {
              v81();
            } else {
              v84({
                mode: "auto"
              });
            }
            break;
          case "panellinerow":
            v1.auth.panelLineSelSheet();
            break;
          case "recovery":
            v1.shell.openRecovery();
            break;
          case "accounts":
            v81();
            break;
          case "accadd":
            v84({
              mode: "add"
            });
            break;
          case "credentialmethod":
            v86(v2022.dataset.v);
            break;
          case "accmodesheet":
            v83();
            break;
          case "accswitch":
            {
              const v2091 = await v244(v2022.dataset.id);
              if (v2091 && v4.sheetAlive(v4.currentSheet("accounts"))) {
                v81();
              }
              if (v2091 && v4.sheetAlive(v4.currentSheet("accdetail"))) {
                v82(v2022.dataset.id);
              }
              break;
            }
          case "accdetail":
            v82(v2022.dataset.id);
            break;
          case "accmode":
            {
              if (!v236()) {
                break;
              }
              if (!(await window.ACC.setMode(v2022.dataset.v === "aggregate" ? "aggregate" : "separate"))) {
                v4.toast(v9(), "显示方式未能保存，请重试。");
                break;
              }
              v16.vehicles = v237() ? v238() : window.ACC.active()?.vehicles || [];
              if (!v16.vehicles.some(v2092 => v2092.vin === v16.vin)) {
                v16.vin = v16.vehicles[0]?.vin || "";
              }
              v16.noVehicle = !v16.vehicles.length;
              v457({
                keepIdentity: true,
                keepAccount: true
              });
              v232();
              v83();
              v81();
              v500({
                keepScroll: true
              });
              v519();
              if (v237()) {
                window.ACC.refreshOthers().then(v2093 => {
                  if (v2093) {
                    v460();
                  }
                });
              }
              await v299();
              break;
            }
          case "accsigntoggle":
            {
              if (!v236()) {
                break;
              }
              const v2094 = window.ACC.byId(v2022.dataset.id);
              if (v2094) {
                if (!(await window.ACC.update(v2094.id, {
                  noSign: !v2094.noSign
                }))) {
                  v4.toast(v9(), "设置未能保存。");
                }
                v82(v2094.id);
                v81();
              }
              break;
            }
          case "accupdatetoken":
            {
              if (!v236()) {
                break;
              }
              v84({
                mode: "update",
                targetId: v2022.dataset.id
              });
              break;
            }
          case "accdel":
            {
              if (v2022.dataset.arm !== "1") {
                v2022.dataset.arm = "1";
                v2022.classList.add("armed");
                v4.toast(v9(), "再点一次删除这个账号", 2600);
                setTimeout(() => {
                  if (v2022.dataset.arm === "1") {
                    v2022.dataset.arm = "";
                    v2022.classList.remove("armed");
                  }
                }, 3000);
                break;
              }
              v2022.dataset.arm = "";
              v2022.classList.remove("armed");
              if (!v236()) {
                break;
              }
              const v2095 = await window.ACC.remove(v2022.dataset.id);
              if (!v2095.ok) {
                v4.toast(v9(), "删除未能保存，请重试。");
                break;
              }
              if (v2095.emptied) {
                API.saveToken("", {
                  persist: false
                });
                v233 = "";
                v16.profileUid = "";
                v457();
                v341();
                v232();
                v4.closeSheet();
                await v299();
                v500();
                v4.toast(v9(), "已删除最后一个账号，回到演示数据。");
                break;
              }
              if (v2095.wasActive && v2095.switchedTo) {
                await v244(v2095.switchedTo, {
                  force: true,
                  outgoing: false
                });
              } else {
                v460();
              }
              v4.closeSheet(v4.currentSheet("accdetail"));
              v81();
              v500({
                keepScroll: true
              });
              break;
            }
          case "vehicles":
            v503();
            if (v236() && window.ACC.mode() === "aggregate") {
              window.ACC.refreshOthers().then(v2096 => {
                if (v2096) {
                  v460();
                }
                if (v2096 && v4.sheetAlive(v4.currentSheet("vehicles"))) {
                  v503();
                }
              });
            }
            break;
          case "pickvin":
            {
              const v2097 = v2022.dataset.vin;
              if (v236()) {
                v4.closeSheet();
                if (v237()) {
                  if (!window.ACC.mergedVehicles().some(v2098 => v2098.vin === v2097)) {
                    break;
                  }
                  v257(true);
                  v16.vin = v2097;
                  v16.uid = "";
                  v457({
                    keepIdentity: true,
                    keepAccount: true
                  });
                  v232();
                  v341();
                  await v299();
                  if (!API.authFailed) {
                    v516();
                  }
                } else {
                  const v2099 = window.ACC.active();
                  if (!v2099) {
                    break;
                  }
                  await v244(v2099.id, {
                    vin: v2097,
                    quiet: true
                  });
                }
              } else {
                if (!v16.vehicles.some(v2100 => v2100.vin === v2097)) {
                  break;
                }
                v257(true);
                v16.vin = v2097;
                v16.uid = "";
                v457({
                  keepIdentity: true,
                  keepAccount: true
                });
                v232();
                v341();
                v4.closeSheet();
                await v299();
                if (!API.authFailed) {
                  v516();
                }
              }
              break;
            }
          case "action":
            if (v2022.dataset.id === "seatlock" && v225()) {
              break;
            }
            if (v2022.dataset.id === "cushion" && v226()) {
              break;
            }
            if (v108[v2022.dataset.id]) {
              break;
            }
            v109(v2022.dataset.id, {
              home: v2022.dataset.id === "cushion"
            });
            break;
          case "setting":
            {
              const v2101 = v132().find(v2102 => v2102.code === v2022.dataset.code);
              if (v2101 && !v1.settings.settingVisible(v2101)) {
                break;
              }
              if (v2101?.write?.ready && (v2101.options || v2101.choices || v2101.palette)) {
                v135(v2022.dataset.code);
              } else {
                v122(v2022.dataset.code);
              }
              break;
            }
          case "seat-hide-sheet":
            v2020.stopPropagation();
            if (v2022.dataset.vin && v2022.dataset.vin === String(v16.vin || "").trim()) {
              v136(v2022.dataset.vin);
            }
            break;
          case "seat-hide-set":
            {
              v2020.stopPropagation();
              const v2103 = v4.currentSheet("seat-hide");
              if ((await v227(v2022.dataset.vin, v2022.dataset.mode)) && v2103) {
                v4.closeSheet(v2103);
              }
              break;
            }
          case "hide-seat-status":
            v2020.stopPropagation();
            await v227(v2022.dataset.vin, v224(v2022.dataset.vin) === "all" ? "off" : "all");
            break;
          case "toggle":
            {
              v2020.stopPropagation();
              const v2104 = v132().find(v2105 => v2105.code === v2022.dataset.code);
              if (v2104?.write?.ready) {
                v138(v2022.dataset.code);
              } else {
                v147(v2022.dataset.code);
              }
              break;
            }
          case "dowrite-val":
            v139(v2022.dataset.code, v2022.dataset.value, v2022.dataset.label);
            break;
          case "ckmode":
            v2020.stopPropagation();
            v1.settings.toggleCkMode();
            break;
          case "closeSheet":
            v4.closeSheet();
            break;
          case "tasks":
            if (window.TASKS) {
              window.TASKS.open(v9());
            }
            break;
          case "socialDetail":
            v35(v2022.dataset.kind, v4.sheetAlive(v4.currentSheet?.("social")));
            break;
          case "socialRefresh":
            if (v2022.dataset.kind === "posts") {
              v38(true);
            } else if (v2022.dataset.kind === "integral" && v1.profile.SOCIAL.tab === "prizes") {
              v41(true);
            } else {
              v39(v2022.dataset.kind);
            }
            break;
          case "socialMore":
            v38(false);
            break;
          case "socialtab":
            v40(v2022.dataset.v);
            break;
          case "socialprizemore":
            v41(false);
            break;
          case "postDelete":
            v37(v2022.dataset.id, v2022);
            break;
          case "postImage":
            v36(v2022.dataset.src);
            break;
          case "chargehistory":
            v30();
            v188({
              force: true
            });
            break;
          case "chgsession":
            v31(Number(v2022.dataset.i) || 0);
            break;
          case "chghidesession":
            {
              const v2106 = v162();
              const v2107 = v2022.dataset.key || "";
              if (!v2107) {
                break;
              }
              const v2108 = v2022.dataset.hidden === "1";
              if (v2022.dataset.arm !== "1") {
                v2022.dataset.arm = "1";
                v2022.classList.add("armed");
                v2022.title = v2108 ? "再点一次恢复显示" : "再点一次确认移除";
                v4.toast(v9(), v2108 ? "再点一次恢复显示这条记录" : "再点一次从列表移除这条记录", 2600);
                setTimeout(() => {
                  if (v2022.dataset.arm === "1") {
                    v2022.dataset.arm = "";
                    v2022.classList.remove("armed");
                    v2022.title = v2108 ? "恢复显示" : "从列表移除这条";
                  }
                }, 3000);
                break;
              }
              v2022.dataset.arm = "";
              v2022.classList.remove("armed");
              v2022.disabled = true;
              const v2109 = await window.CHG?.setSessionHidden?.(v2106.vin, v2107, !v2108);
              if (!v163(v2106)) {
                break;
              }
              if (!v2109) {
                v2022.disabled = false;
                v4.toast(v9(), "这条记录未能保存改动，请重试");
                break;
              }
              v477 = null;
              v500({
                keepScroll: true
              });
              v1.chg.refreshHistory?.();
              v4.toast(v9(), v2108 ? "已恢复显示" : "已从列表移除", 1600);
              break;
            }
          case "chghidden":
            v1.chg.chargeHiddenSheet?.();
            break;
          case "chghist":
            v30();
            v188({
              force: true
            });
            break;
          case "chghistback":
            if (v4.currentSheet() === v4.currentSheet("chgsess") || v4.currentSheet() === v4.currentSheet("chghidden")) {
              v4.back();
            }
            v30();
            break;
          case "chghistclear":
            {
              if (v2022.dataset.arm !== "1") {
                v2022.dataset.arm = "1";
                v2022.classList.add("armed");
                v4.toast(v9(), "再点一次清空全部充电记录", 2600);
                setTimeout(() => {
                  if (v2022.dataset.arm === "1") {
                    v2022.dataset.arm = "";
                    v2022.classList.remove("armed");
                  }
                }, 3000);
                break;
              }
              v2022.dataset.arm = "";
              v2022.classList.remove("armed");
              const v2110 = v162();
              const v2111 = v4.currentSheet("chghist") || v4.currentSheet("battdetail");
              const v2112 = await v189();
              if (!v163(v2110)) {
                break;
              }
              if (!v2112.ok) {
                v4.toast(v9(), v2112.message || "记录未能清除，请重试。");
                break;
              }
              v477 = null;
              v500({
                keepScroll: true
              });
              if (v4.sheetAlive(v2111)) {
                if (v2111?.key === "battdetail") {
                  v34({
                    handle: v2111,
                    scope: v2110
                  });
                } else {
                  v1.chg.refreshHistory?.();
                }
              }
              v4.toast(v9(), v2112.message || "充电记录已清空");
              break;
            }
          case "recentchargetoggle":
            {
              if (v2022.disabled) {
                break;
              }
              v2022.disabled = true;
              const v2113 = v162();
              const v2114 = await v1.chg.toggleRecentCharge();
              v2022.disabled = false;
              if (!v2114) {
                if (v163(v2113)) {
                  v4.toast(v9(), "展开偏好未能保存，请重试");
                }
                break;
              }
              if (v163(v2113)) {
                v477 = null;
                v500({
                  keepScroll: true
                });
              }
              break;
            }
          case "lastchgdismiss":
            {
              v178();
              const v2115 = window.CHG?.lastSession(v16.vin);
              if (v2115) {
                v176[v16.vin] = v179(v2115);
                try {
                  if (!(await v2.commitAsync({
                    puts: {
                      [v2.ns(v175)]: JSON.stringify(v176)
                    }
                  }))) {
                    delete v176[v16.vin];
                    v4.toast(v9(), "隐藏记录未能保存，请重试");
                    break;
                  }
                } catch {
                  v4.toast(v9(), "隐藏记录未能保存，请重试");
                  break;
                }
                v500({
                  keepScroll: true
                });
              }
              break;
            }
          case "chgstopdismiss":
            if ((await v395()) === false) {
              v4.toast(v9(), "清理未能保存，请重试");
              break;
            }
            v477 = null;
            v500({
              keepScroll: true
            });
            break;
          case "chargesheet":
            {
              const v2116 = v162();
              const v2117 = v29({
                scope: v2116
              });
              const v2118 = v188({
                force: true
              });
              await v299({
                silent: true
              });
              await v2118;
              if (v163(v2116) && v4.sheetAlive(v2117)) {
                v29({
                  handle: v2117,
                  scope: v2116
                });
              }
              break;
            }
          case "chgrefresh":
            {
              const v2119 = v162();
              const v2120 = v4.currentSheet("charge");
              await v299({
                silent: true
              });
              if (!v163(v2119) || !v4.sheetAlive(v2120)) {
                break;
              }
              await v188({
                force: true
              });
              if (v163(v2119) && v4.sheetAlive(v2120)) {
                v29({
                  handle: v2120,
                  scope: v2119
                });
              }
              break;
            }
          case "chgclear":
            {
              if (v2022.dataset.arm !== "1") {
                v2022.dataset.arm = "1";
                v2022.classList.add("armed");
                v4.toast(v9(), "再点一次清空这台车的充电记录", 2600);
                setTimeout(() => {
                  if (v2022.dataset.arm === "1") {
                    v2022.dataset.arm = "";
                    v2022.classList.remove("armed");
                  }
                }, 3000);
                break;
              }
              v2022.dataset.arm = "";
              v2022.classList.remove("armed");
              const v2121 = v162();
              const v2122 = v4.currentSheet("charge");
              const v2123 = await v189();
              if (!v163(v2121)) {
                break;
              }
              if (!v2123.ok) {
                v4.toast(v9(), v2123.message || "记录未能清除，请重试。");
                break;
              }
              if (v4.sheetAlive(v2122)) {
                v29({
                  handle: v2122,
                  scope: v2121
                });
              }
              v4.toast(v9(), v2123.message || "充电记录已清空");
              break;
            }
          case "widgets":
            v140(true);
            break;
          case "widgetedit":
            await Promise.resolve(v143(v2022.dataset.wid));
            break;
          case "wmanager":
            v151("请在管理页重新选择小组件");
            break;
          case "wvin":
            v1.settings.pickWidgetVehicle(v2022);
            break;
          case "wvinpick":
            await Promise.resolve(v1.settings.selectWidgetVehicle(v2022));
            break;
          case "wpick":
            {
              const v2124 = v162();
              const v2125 = v4.currentSheet();
              const v2126 = await Promise.resolve(v145(v2022.dataset.key, v2022.dataset.v, v2022.dataset.wid, v152(v2022), v2022.dataset.size));
              if (v2126 === true && v163(v2124) && v4.currentSheet() === v2125) {
                v4.toast(v9(), "已保存", 1500);
              }
              break;
            }
          case "wreset":
            await Promise.resolve(v144(v2022));
            break;
          case "wdefaultsize":
            if ((await Promise.resolve(v155(v2022))) === true) {
              v4.toast(v9(), "已切换", 1500);
            }
            break;
          case "wstatslot":
            v153(v2022);
            break;
          case "wstatpick":
            v154(v2022);
            break;
          case "wstatclose":
            v130.statSlot = null;
            v156();
            break;
          case "opencfmoto":
            try {
              if (typeof window.ZeehoShell?.launchOfficialApp === "function") {
                window.ZeehoShell.launchOfficialApp();
              } else {
                v4.toast(v9(), "请在极核 App 里绑定车辆", 2600);
              }
            } catch {
              v4.toast(v9(), "打不开极核 App", 2600);
            }
            break;
          case "reload":
            location.reload();
            break;
          case "staledata":
            v379();
            break;
          case "anomaly":
            v385();
            break;
          case "retryauth":
            {
              v4.closeSheet();
              API.clearAuthFail();
              await v299();
              if (!API.authFailed) {
                v516();
              }
              break;
            }
          case "resetdemo":
            {
              if (v236() && window.ACC.count()) {
                v4.sheet(v9(), {
                  center: true,
                  key: "resetaccounts",
                  title: "移除全部账号？",
                  sub: "已保存的登录信息和本机账号记录会被移除，车辆本身不受影响。",
                  body: "<div class=\"field\"><button class=\"btn block\" data-act=\"resetdemoconfirm\">移除并回到模拟车辆</button></div>"
                });
              } else {
                v248();
              }
              break;
            }
          case "resetdemoconfirm":
            v248();
            break;
          case "reveal":
            {
              const v2127 = v2022.dataset.mapKey || "home";
              v437(v2127);
              v439(v2127);
              if (v2127 === "home" && v16.tab === "home") {
                v500({
                  keepScroll: true
                });
              }
              break;
            }
          case "bigmap":
            v446();
            break;
          case "mapback":
            v447();
            break;
          case "mapretry":
            v440.loading = false;
            v449();
            break;
          case "mapmode":
            v446(v2022.dataset.v || "car");
            break;
          case "mapprovidersheet":
            v1.auth.mapProviderSheet();
            break;
          case "nearbypermission":
            v425();
            break;
          case "group":
            {
              const v2128 = v2022.dataset.id;
              if (!v2128) {
                break;
              }
              if (v16.openGroups[v2128]) {
                delete v16.openGroups[v2128];
              } else {
                v16.openGroups[v2128] = true;
              }
              const v2129 = v16.openGroups[v2128] === true;
              const v2130 = v2022.closest(".group-card")?.querySelector(".group-reveal");
              if (v2130) {
                if (v2129) {
                  v149(v2128);
                }
                v498 = Date.now() + 280;
                v2022.classList.toggle("open", v2129);
                v2022.setAttribute("aria-expanded", String(v2129));
                v2130.classList.toggle("open", v2129);
                v2130.inert = !v2129;
                if (v2129) {
                  v2130.removeAttribute("aria-hidden");
                } else {
                  v2130.setAttribute("aria-hidden", "true");
                }
                v477 = v483();
              } else {
                v500({
                  keepScroll: true
                });
              }
              break;
            }
          case "inductive-pair2":
            v1.inductiveUi?.openPair();
            break;
          case "twin-gauge":
            if (v1.isIOS?.()) {
              v1.inductiveUi?.openTwin?.();
            }
            break;
          case "ae4-controller":
            v1.settings.ae4ControllerSheet();
            break;
          case "btdebug":
            v313();
            break;
          case "vehicle-info":
            v142();
            break;
          case "cast":
            v1.cast?.openCast();
            break;
          case "wallpaper":
            v1.media?.openWallpapers();
            break;
          case "firmware":
            v1.media?.openOta();
            break;
          case "custom-audio":
            if (v12()) {
              v273();
            } else {
              v1.audio.open();
            }
            break;
          case "ride":
            v21(v16.month);
            break;
          case "rideview":
            {
              const v2131 = v2022.dataset.v || "month";
              if (v2131 === v20.view) {
                break;
              }
              v20.view = v2131;
              v20.day = null;
              v20.trip = null;
              v22();
              v27(v1.ride.ensureView());
              break;
            }
          case "ridezero":
            v20.showZero = !v20.showZero;
            v22();
            break;
          case "rideback":
            v20.day = null;
            v20.trip = null;
            v22();
            break;
          case "month":
            {
              const v2132 = v2022.dataset.v;
              if (!v2132 || v2132 > v16.month) {
                break;
              }
              v20.month = v2132;
              v20.view = "month";
              v20.day = null;
              v20.trip = null;
              v22();
              v27(v25(v2132, {
                force: v2132 === v16.month
              }));
              break;
            }
          case "day":
            v20.day = v2022.dataset.date || "";
            v20.trip = null;
            v20.refreshDay = v20.day;
            delete v20.failed[v20.day];
            v23();
            break;
          case "riderefresh":
            {
              if (v20.day) {
                v20.refreshDay = v20.day;
                delete v20.failed[v20.day];
                v22();
              } else if (v20.view === "year") {
                v27(v26({
                  force: true
                }));
              } else {
                v27(v25(v20.month, {
                  force: true
                }));
              }
              v4.toast(v9(), "正在刷新…", 1200);
              break;
            }
          case "trip":
            v20.trip = v2022.dataset.id || "";
            v24();
            break;
          case "tripback":
            v20.trip = null;
            v23();
            break;
          case "ridemap":
            v1.ride.openMap();
            break;
          case "ridenavigate":
            v1.ride.navigate(v2022.dataset.endpoint, v2022.dataset.mapKey);
            break;
          case "navigate":
            {
              const v2133 = v16.data.home?.loc;
              if (!v2133?.has) {
                break;
              }
              v453();
              break;
            }
          case "capturepage":
            v91();
            break;
          case "capturestart":
            {
              if (!v198()) {
                break;
              }
              if (typeof window.ZeehoShell?.startCapture !== "function") {
                v4.toast(v9(), "请先把几何面板 App 更新到 1.5.3 或更高版本", 3200);
                break;
              }
              let v2134 = {};
              try {
                v2134 = JSON.parse(window.ZeehoShell.captureStatus() || "{}");
              } catch {}
              if (v2134.installed === false) {
                v4.toast(v9(), "未安装极核 App（com.cfmoto）", 3000);
                break;
              }
              v88.guideShown = false;
              v88.successShown = false;
              v88.manualShown = false;
              v88.busy = true;
              v88.startedAt = Date.now();
              try {
                window.ZeehoShell.startCapture();
              } catch {}
              v98();
              break;
            }
          case "capturestop":
          case "capturecancel":
            try {
              window.ZeehoShell.stopCapture();
            } catch {}
            v99();
            v88.guideShown = false;
            v88.busy = false;
            v4.closeSheet();
            v4.toast(v9(), "已取消抓取");
            break;
          case "capturelaunch":
            v88.startedAt = Date.now();
            try {
              window.ZeehoShell.launchOfficialApp();
            } catch {}
            v4.closeSheet();
            v4.toast(v9(), "已打开极核 App，请按指引操作", 3000);
            break;
          case "captureuse":
            v93();
            break;
          case "capturecopy":
            v95();
            break;
          case "capturediscard":
            v96();
            break;
          case "capturepaste":
            v97();
            break;
          case "captureclip":
            v94();
            break;
          case "capturediag":
            v100();
            break;
          case "capturediagcopy":
            v101();
            break;
          case "capturediagclear":
            v102();
            break;
          case "captureclose":
            v4.closeSheet();
            break;
          case "systemsurfaces":
            v1.systemSurfaces?.open();
            break;
          case "cachemanager":
            v124();
            break;
          case "cacheback":
            v4.back();
            break;
          case "cachecategory":
            v125(v2022.dataset.id);
            break;
          case "cacheprotected":
            v1.cache.toggleProtected();
            break;
          case "cachepick":
            v126(v2022.dataset.id);
            break;
          case "cacheconfirm":
            v127();
            break;
          case "cacheclear":
            await v128();
            break;
          case "cacherefresh":
            await v129();
            break;
          case "rawlist":
            v116();
            break;
          case "rawmore":
            v116(Number(v2022.dataset.limit) || 60);
            break;
          case "diagfilter":
            v117(v2022.dataset.filter);
            break;
          case "diagaccountfilter":
            v119();
            break;
          case "diagsearchclear":
            v118("");
            break;
          case "diagexport":
            await v120();
            break;
          case "raw":
            v115(v2022.dataset.id);
            break;
          case "diagclear":
            {
              let v2135 = false;
              try {
                v2135 = (await window.DIAG?.clear?.()) === true;
              } catch {}
              if (v2135) {
                v116();
              } else {
                v4.toast(v9(), "日志未能清理，原记录没有删除。", 4000);
              }
              break;
            }
          case "sendcode":
            {
              const v2136 = (v8("phoneInput")?.value || "").replace(/[^\d]/g, "");
              if (!/^1\d{10}$/.test(v2136)) {
                v4.toast(v9(), "手机号填 11 位");
                break;
              }
              v87.phone = v2136;
              await v89();
              break;
            }
          case "loginback":
            if (v87.busy) {
              break;
            }
            v87.step = "phone";
            v87.captcha = null;
            v87.code = "";
            v87.err = "";
            v87.tip = "";
            v77();
            break;
          case "loginok":
            {
              const v2137 = (v8("codeInput")?.value || "").replace(/[^\d]/g, "");
              if (v2137.length < 4) {
                v4.toast(v9(), "先填短信验证码");
                break;
              }
              v87.code = v2137;
              await v90();
              break;
            }
          case "savetoken":
            {
              if (v12()) {
                v15("保存登录信息");
                break;
              }
              const v2138 = (v8("tokenInput")?.value || "").trim();
              const v2139 = v11(v2138);
              const v2140 = v2139 ? v2139.token : "";
              const v2141 = v85();
              const v2142 = v236() ? window.ACC.byId(v2141.targetId || v233) : null;
              const v2143 = v2142?.token || API.token || API.loadToken();
              if (v2141.mode !== "add" && v2140 === v2143) {
                v4.closeSheet();
                v4.toast(v9(), "没有改动");
                break;
              }
              if (!v2140) {
                if (v2138) {
                  v4.toast(v9(), "没识别到 token：请粘贴完整地址、Bearer 头或 36 位 token 本身", 3600);
                  break;
                }
                if (v236()) {
                  v4.toast(v9(), "移除账号请使用账号详情里的删除。");
                  break;
                }
                await API.saveToken("");
                v16.profileUid = "";
                v457();
                v232();
                v341();
                v4.closeSheet();
                await v299();
                v500();
                break;
              }
              v92();
              v87.busy = true;
              v77();
              try {
                await v247(v2140, v2141);
              } finally {
                if (v87.busy) {
                  v87.busy = false;
                  if (v4.currentSheet("debug")) {
                    v77();
                  }
                }
              }
              break;
            }
          case "copy":
            v4.copy(v2022.dataset.copy || "", v9(), v2022.dataset.label || "");
            break;
          case "copyinput":
            {
              const v2144 = v8(v2022.dataset.target);
              const v2145 = (v2144?.value || "").trim();
              if (!v2145) {
                v4.toast(v9(), v2022.dataset.empty || "这里还没有内容", 2600);
                break;
              }
              await v4.copy(v2145, v9(), v2022.dataset.label || "");
              break;
            }
          case "copytoken":
          case "copyacctoken":
            {
              const v2146 = v2022.dataset.id || "";
              const v2147 = v2146 && v236() ? String(window.ACC.byId(v2146)?.token || "") : "";
              const v2148 = (v2147 || String(API.token || API.loadToken() || "")).trim();
              if (!v2148) {
                v4.toast(v9(), "还没有保存 token", 2600);
                break;
              }
              await v4.copy(v2148, v9(), "token");
              break;
            }
        }
      });
      v107();
    }
    let v511 = null;
    let v512 = -1;
    function v513() {
      if (!v198()) {
        return;
      }
      const v2149 = v76(true);
      if (!v2149) {
        return;
      }
      v10().querySelectorAll("[data-rel=\"updApp\"],[data-rel=\"updPanel\"]").forEach(v2150 => {
        const v2151 = v484[v2150.dataset.rel];
        if (v2151) {
          try {
            v2151(v2150);
          } catch {}
        }
      });
    }
    function v514() {
      clearInterval(v511);
      v512 = Math.floor(Date.now() / 60000);
      v511 = setInterval(() => {
        if (document.hidden) {
          return;
        }
        v513();
        const v2152 = Math.floor(Date.now() / 60000);
        if (v2152 !== v512) {
          v512 = v2152;
          v500({
            keepScroll: true
          });
        } else {
          v387();
        }
        v1.shell.autoReviveBackground?.();
        if (!document.hidden) {
          (window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v1, "media") : v1.media)?.refreshMarketReplies?.();
        }
      }, 3000);
    }
    let v515 = null;
    function v516() {
      if (v17()) {
        return;
      }
      clearInterval(v515);
      v514();
      (window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v1, "media") : v1.media)?.refreshMarketReplies?.();
      if (v16.pollMs > 0) {
        v515 = setInterval(() => {
          if (!document.hidden) {
            v299({
              silent: true
            });
            (window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v1, "media") : v1.media)?.refreshMarketReplies?.();
          }
        }, v16.pollMs);
      }
    }
    function v517() {
      clearInterval(v515);
      v515 = null;
      clearInterval(v511);
      v511 = null;
    }
    let v518 = null;
    function v519() {
      if (v17()) {
        return;
      }
      clearInterval(v518);
      v518 = null;
      if (!v236() || window.ACC.mode() !== "aggregate") {
        return;
      }
      v518 = setInterval(() => {
        if (document.hidden) {
          return;
        }
        window.ACC.refreshOthers().then(v2153 => {
          if (v2153) {
            v460();
          }
        });
      }, 300000);
    }
    document.addEventListener("visibilitychange", () => {
      if (v17() || document.hidden) {
        return;
      }
      v188({
        force: true
      });
      v299({
        silent: true
      });
    });
    window.addEventListener("online", () => {
      if (!v17()) {
        v299({
          silent: true
        });
      }
    });
    window.addEventListener("offline", () => {
      if (v16.lastErr || v16.data.home) {
        v500({
          keepScroll: true
        });
      }
    });
    function v520() {
      if (v12()) {
        return;
      }
      if (v198()) {
        return;
      }
      if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(v217)) {
        return;
      }
      if (!("serviceWorker" in navigator)) {
        return;
      }
      if (!/^https?:$/.test(location.protocol)) {
        return;
      }
      navigator.serviceWorker.register("sw.js", {
        scope: "./"
      }).then(() => navigator.serviceWorker.ready).then(v2154 => {
        const v2155 = [...new Set(performance.getEntriesByType("resource").map(v2156 => v2156.name))].filter(v2157 => v2157.startsWith(location.origin) && !v2157.includes("/api/"));
        v2154.active?.postMessage({
          type: "warm",
          urls: v2155
        });
      }).catch(() => {});
    }
    function v521() {
      if (v12()) {
        delete window.__zeehoUrlCreds;
        try {
          history.replaceState(null, "", v522());
        } catch {}
        return null;
      }
      if (window.__zeehoUrlCreds) {
        const v2160 = window.__zeehoUrlCreds;
        delete window.__zeehoUrlCreds;
        return v2160;
      }
      let v2158;
      try {
        v2158 = new URLSearchParams(location.search || "");
      } catch {
        return null;
      }
      const v2159 = (v2158.get("token") || "").trim().replace(/^bearer\s+/i, "");
      if (v2159) {
        return {
          token: v2159
        };
      } else {
        return null;
      }
    }
    const v522 = () => {
      const v2161 = new URL(location.href);
      for (const v2162 of ["token", "uid", "userId", "user_id"]) {
        v2161.searchParams.delete(v2162);
      }
      return v2161.toString();
    };
    function v523(v2163) {
      const v2164 = window.ACC;
      const v2165 = v2164?.byId(v2163);
      const v2166 = v2164?.byId(v233);
      if (!v2165) {
        return;
      }
      v4.sheet(v9(), {
        key: "url-credentials",
        title: "登录信息已更新",
        body: "<div class=\"field\">已更新 " + v6(v2164.labelOf(v2165)) + "，当前仍是 " + v6(v2166 ? v2164.labelOf(v2166) : "原账号") + "。</div>\n        <div class=\"field mt12\"><button class=\"btn tonal block\" data-url-switch>切换到 " + v6(v2164.labelOf(v2165)) + "</button></div>\n        <div class=\"field\"><button class=\"btn text block\" data-url-keep>继续使用当前账号</button></div>",
        onMount(v2167) {
          const v2168 = v4.currentSheet("url-credentials");
          v2167.querySelector("[data-url-keep]").addEventListener("click", () => v4.closeSheet(v2168));
          v2167.querySelector("[data-url-switch]").addEventListener("click", async v2169 => {
            v2169.currentTarget.disabled = true;
            v4.closeSheet(v2168);
            await v244(v2163);
            v519();
          });
        }
      });
    }
    let v524 = null;
    async function v525(v2170) {
      const v2171 = v524 === v2170 ? v2170 : {
        token: v2170.token
      };
      Object.assign(v2171, {
        pending: true,
        scope: v158()
      });
      v524 = v2171;
      if (!v2171.token) {
        v524 = null;
        v2171.pending = false;
        return null;
      }
      let v2172 = null;
      let v2173 = null;
      v527 = true;
      try {
        const v2174 = await v247(v2171.token, {
          mode: "auto",
          urlImport: true,
          isLatest: () => v2171.committed || v524 === v2171 && v159(v2171.scope),
          onCommitted: () => {
            v2171.committed = true;
          },
          onFailure: v2175 => {
            v2172 = v2175;
          },
          onResult: v2176 => {
            v2173 = v2176;
          }
        });
        if (v2173?.saved || v2174) {
          if (v524 === v2171) {
            v524 = null;
          }
          if (v2173?.active) {
            v516();
            v519();
          }
          return v2173;
        }
      } catch {
        v2172 = {
          message: "登录信息暂时未能验证，请重试。"
        };
      } finally {
        v527 = false;
        v2171.pending = false;
      }
      if (v524 === v2171) {
        if (v2172) {
          v526(v2172);
        } else {
          v524 = null;
        }
      }
      return v2173;
    }
    function v526(v2177) {
      const v2178 = v524;
      let v2179 = v463(v2177 || {});
      if (v2178?.token) {
        v2179 = v2179.split(v2178.token).join("[token 已隐藏]");
      }
      v2179 = window.DIAG?.sanitize?.(v2179) || v2179;
      v4.sheet(v9(), {
        key: "url-credentials",
        title: "配置失败",
        sub: [v2177?.http ? "HTTP " + v2177.http : "", v2177?.code ? "code " + v2177.code : ""].filter(Boolean).join(" · "),
        body: "<div class=\"field\">" + v6(v2179) + "</div>\n        " + (v2178 ? "<div class=\"field mt12\"><button class=\"btn tonal block\" data-url-retry>重试验证</button></div>" : "") + "\n        <div class=\"field mt12\"><button class=\"btn text block\" data-url-cancel>" + (v2178 ? "放弃本次导入" : "知道了") + "</button></div>",
        onDismiss: () => {
          if (v524 === v2178) {
            v524 = null;
          }
        },
        onMount(v2180) {
          const v2181 = v4.currentSheet("url-credentials");
          v2180.querySelector("[data-url-cancel]").addEventListener("click", () => {
            if (v524 === v2178) {
              v524 = null;
            }
            v4.closeSheet(v2181);
          });
          v2180.querySelector("[data-url-retry]")?.addEventListener("click", async v2182 => {
            if (v524 !== v2178 || v2178.pending) {
              return;
            }
            if (!v159(v2178.scope)) {
              v524 = null;
              v4.closeSheet(v2181);
              return;
            }
            v2182.currentTarget.disabled = true;
            v2182.currentTarget.textContent = "正在验证…";
            v2178.pending = true;
            const v2183 = await v525(v2178);
            if (v2183?.saved) {
              v516();
              v519();
            }
          });
        }
      });
    }
    let v527 = false;
    function v528() {
      const v2184 = API.token || API.loadToken() || "";
      if (v2184) {
        return v2184.slice(0, 8) + "…" + v2184.slice(-4);
      } else {
        return "no-token";
      }
    }
    function v529(v2185) {
      const v2186 = Number(v2185.integral);
      const v2187 = v2185.integral != null && Number.isSafeInteger(v2186) && v2186 >= 0;
      const v2188 = String(v2185.type) === "2";
      const v2189 = v2188 ? "实物奖品请在极核 App「我的 → 我的活动 → 中奖奖品」里填写收货信息。" : v2187 ? v2186 + " 积分已到账，可在「我的 → 积分」里查看。" : "盲盒已领取，接口未返回积分数量，请在极核 App「我的活动」里查看。";
      v4.sheet(v9(), {
        center: true,
        title: "🎉 恭喜中奖",
        sub: "连签盲盒",
        key: "prize",
        body: "<div style=\"text-align:center;padding:8px 0 4px\">\n          <div class=\"card-sub\">你抽到了</div>\n          <div style=\"font-size:22px;font-weight:650;margin:6px 0 2px;line-height:1.35\">" + v6(v2185.name) + "</div>\n          " + (!v2188 && v2187 ? "<div class=\"card-sub tnum\">+" + v2186 + " 积分</div>" : "") + "\n        </div>\n        <div class=\"note info mt12\">" + v4.icon("info", 18) + "<div>" + v6(v2189) + "</div></div>\n        <div class=\"field mt12\">\n          <button class=\"btn block\" data-act=\"prizeOk\">开心收下</button>\n        </div>",
        onMount: v2190 => {
          v2190.querySelector("[data-act=\"prizeOk\"]")?.addEventListener("click", () => {
            try {
              TASKS.clearPrize();
            } catch {}
            v4.back();
          });
        }
      });
      try {
        window.TASKS?.clearPrize?.();
      } catch {}
    }
    let v530 = 0;
    function v531() {
      if (v17()) {
        return;
      }
      if (API.source === "demo") {
        return;
      }
      let v2191 = null;
      try {
        v2191 = window.TASKS?.takePendingPrize?.();
      } catch {
        v2191 = null;
      }
      if (!v2191) {
        v530 = 0;
        return;
      }
      if (v9().querySelector(".sheet.show")) {
        if (v530 >= 40) {
          v530 = 0;
          return;
        }
        v530++;
        setTimeout(v531, 3000);
        return;
      }
      v530 = 0;
      v529(v2191);
    }
    let v532;
    function v533() {
      if (!v532) {
        v532 = Promise.resolve().then(v535).catch(v2192 => {
          v490("fail");
          console.error("boot failed", v2192);
        });
      }
      return v532;
    }
    function v534() {
      if (window.ZeehoShell || v2.isPreviewLocked?.()) {
        return Promise.resolve(null);
      }
      if (window.IOSBR?.candidate?.()) {
        return Promise.resolve("ready");
      }
      const v2193 = window.webkit?.messageHandlers?.zeehoIOS;
      if (location.protocol !== "zeeho-panel:" && typeof v2193?.postMessage !== "function") {
        return Promise.resolve(null);
      }
      v488("正在连接 iOS 原生服务");
      return new Promise(v2194 => {
        let v2195 = false;
        const v2196 = v2200 => {
          if (v2195) {
            return;
          }
          v2195 = true;
          clearTimeout(v2199);
          window.removeEventListener?.("zeehoios:bridge", v2197);
          window.removeEventListener?.("zeehoios:bridge-ready", v2197);
          window.removeEventListener?.("pagehide", v2198);
          window.removeEventListener?.("beforeunload", v2198);
          v2194(v2200);
        };
        const v2197 = () => {
          if (v2.isPreviewLocked?.()) {
            v2196(null);
          } else if (window.IOSBR?.candidate?.()) {
            v2196("ready");
          }
        };
        const v2198 = () => v2196("cancelled");
        const v2199 = setTimeout(() => v2196(window.IOSBR?.candidate?.() ? "ready" : "missing"), 5000);
        window.addEventListener("zeehoios:bridge", v2197);
        window.addEventListener("zeehoios:bridge-ready", v2197);
        window.addEventListener("pagehide", v2198);
        window.addEventListener("beforeunload", v2198);
        v2197();
      });
    }
    async function v535() {
      v510();
      const v2201 = await v534();
      if (v2201 === "cancelled") {
        return;
      }
      if (v2201 === "missing") {
        window.PLATFORM.enterPreview("iOS 原生服务未能及时就绪，请重新加载或导出诊断日志；真实账号未启用。");
      } else if (v2201 === "ready" && !v2.isPreviewLocked?.()) {
        const v2214 = window.IOSBR.bootstrap();
        const v2215 = v2214?.nonce;
        const v2216 = () => window.IOSBR.isCurrent() && window.IOSBR.bootstrap()?.nonce === v2215;
        const v2217 = await window.IOSBR.ready;
        if (!v2216()) {
          return;
        }
        if (!v2217) {
          window.PLATFORM.enterPreview("iOS 原生桥握手失败，已进入安全 UI 预览；真实账号与原生操作未启用。");
        } else {
          const v2218 = await (typeof v2.ready === "function" ? v2.ready() : v2.ready);
          if (!v2216()) {
            return;
          }
          if (!v2218) {
            window.PLATFORM.enterPreview("iOS 私有数据未能读取，原文件已保留；请重启或导出诊断日志。");
          } else {
            await v1.shell?.ios?.refreshInfo?.();
            if (!v2216()) {
              return;
            }
            v206(true);
          }
        }
      }
      if (!v12() && v1.domainMigration?.bootstrap?.() || v17()) {
        return;
      }
      window.DIAG?.startSession?.();
      v489(16);
      v488("正在准备");
      v228();
      v1.domainMigration?.captureBaseline?.();
      if (v17()) {
        return;
      }
      try {
        v1.dashboardTheme?.init();
      } catch (v2219) {
        console.warn("dashboard theme failed", v2219);
      }
      API.setTransport("native");
      v496();
      v510();
      API.onAuthFail = v2220 => {
        if (API.token && v236() && v233 === window.ACC.activeId()) {
          window.ACC.markInvalid(v233, "token 已失效");
        }
        v517();
        v500({
          keepScroll: true
        });
        if (v527 || v9().querySelector(".sheet.show")) {
          return;
        }
        const v2221 = v528();
        if (v16.authPromptedFor === v2221) {
          return;
        }
        v16.authPromptedFor = v2221;
        v232();
        v110(v2220);
      };
      if (!v12() && window.ACC?.init) {
        await window.ACC.init(v16.legacyIdentity || {
          profileUid: v16.profileUid,
          vin: v16.vin,
          vehicles: v16.vehicles,
          bindingUid: v16.uid
        });
      }
      delete v16.legacyIdentity;
      API.vehicleToken = v240;
      API.onOwnerAuthFail = v242;
      const v2202 = v521();
      if (v2202) {
        try {
          history.replaceState(null, "", v522());
        } catch {}
      }
      v268();
      v520();
      v16.month = v285();
      v489(34);
      v488("正在连接车辆服务");
      if (v12()) {
        API.forcePreview();
      }
      await API.init();
      if (v17()) {
        return;
      }
      v16.source = API.source;
      const v2203 = v16.source === "demo" ? "demo" : "real";
      if (v173 !== v2203) {
        v16.vehicles = [];
        v16.vin = "";
      }
      v173 = v2203;
      if (v12()) {
        if (window.ZEEHO_MOCK_READY) {
          await window.ZEEHO_MOCK_READY();
        }
        const v2222 = API.mock("vehicle_list");
        v16.vehicles = v3.vehicles(v2222 || {
          ok: false
        });
        v16.vin = v16.vehicles[0]?.vin || "";
        v16.noVehicle = !v16.vehicles.length;
        const v2223 = API.mock("vehicle_home");
        const v2224 = API.mock("battery_info");
        if (v2223?.ok) {
          v16.data.home = v3.home(v2223);
        }
        if (v2224?.ok) {
          v16.data.battery = v3.battery(v2224, v2223?.data?.vehicleType);
        }
        v16.data.caps = API.mock("vehicle_set_items");
        v16.data.info = API.mock("vehicle_set_info");
        v1.buildSettings?.();
      }
      v243(v2203);
      window.CHG?.trim?.();
      if (API.source === "demo") {
        v295();
      }
      v232({
        passive: true
      });
      v264();
      v292();
      window.APP.syncMapRoute?.();
      if (["#/wallpapers", "#/wallpaper-market"].includes(location.hash)) {
        v1.media?.syncRoute?.();
      }
      const v2204 = v162();
      const v2205 = v341();
      if (v183()) {
        Promise.resolve(v2205).then(v2225 => {
          if (v163(v2204) && (window.IOSBR?.available?.() && v2225?.frame || Number.isSafeInteger(v2225) && v2225 > 0)) {
            return v188({
              frame: v2225
            });
          }
        }).catch(() => {});
      }
      document.addEventListener("visibilitychange", () => {
        if (v17()) {
          return;
        }
        if (document.hidden) {
          v257(true);
        } else {
          v79();
          if (v88.timer) {
            v78();
          }
        }
      });
      let v2206 = false;
      if (v2202) {
        v500();
        v201();
        v2206 = true;
        v525(v2202);
      }
      v489(58);
      v488("正在读取车况");
      const v2207 = v158();
      let v2208;
      const v2209 = new Promise(v2226 => {
        v2208 = v2226;
      });
      const v2210 = v299({
        onPrimaryReady: v2208
      });
      if (!v2206) {
        v500();
        v510();
        v201();
        v79();
        v2206 = true;
      }
      const v2211 = v2209.then(() => {
        if (v159(v2207)) {
          return v293();
        }
      }).then(() => {
        if (v159(v2207)) {
          v500({
            keepScroll: true
          });
        }
      });
      const v2212 = v2209.then(async v2227 => {
        if (!v2227 || !v159(v2207) || !v163(v2227.scope)) {
          return;
        }
        const v2228 = v2227.scope;
        const v2229 = v282.filter(v2233 => v165.get(v166(v2233)) === v2227.setEpochs.get(v166(v2233)));
        if (!v2229.length) {
          return;
        }
        const v2230 = v167(v2229);
        const v2231 = () => v163(v2228);
        const v2232 = await API.all(v2229, {
          vin: v2228.vin,
          uid: v2228.uid,
          month: v2228.month
        }, {
          ...v2227.requestBatch,
          isLatest: v2231,
          isLatestFor: v2234 => v168(v2234, v2230)
        });
        if (!v2231()) {
          return;
        }
        if (v2232.vehicle_set_items?.ok && !v2232.vehicle_set_items.stale && v168("vehicle_set_items", v2230)) {
          v16.data.caps = v2232.vehicle_set_items;
        }
        if (v2232.vehicle_set_info?.ok && !v2232.vehicle_set_info.stale && v168("vehicle_set_info", v2230)) {
          v16.data.info = v2232.vehicle_set_info;
        }
        if (v16.data.caps) {
          v294();
        }
        v500({
          keepScroll: true
        });
      });
      const v2213 = Promise.all([v2211, v2212]).then(() => {
        if (v17()) {
          return;
        }
        if (location.hash === "#/audio") {
          v1.audio?.syncRoute?.();
        }
        setTimeout(v531, 400);
      }).catch(() => {});
      await v2210;
      if (v17()) {
        return;
      }
      v516();
      v519();
      await v2213;
    }
    function v536() {
      const v2235 = document.querySelector(".sheet.show");
      const v2236 = v2235 && v2235.querySelector("[data-act=\"rideview\"], [data-act=\"rideback\"], [data-act=\"tripback\"]");
      if (v2236) {
        if (v20.trip) {
          v20.trip = null;
          if (v20.day) {
            v23();
          } else {
            v22();
          }
          return "ride-trip";
        }
        if (v20.day) {
          v20.day = null;
          v20.trip = null;
          v22();
          return "ride-day";
        }
        if (v20.view === "year") {
          v20.view = "month";
          v22();
          v27(v1.ride.ensureView());
          return "ride-year";
        }
      }
      if (v1.inductiveUi?.closeTopSheet?.()) {
        return "sheet";
      }
      const v2237 = v1.inductiveUi?.back || v1.inductiveUi?.close;
      if (v2237?.()) {
        return "sheet";
      }
      if (v4.currentSheet()) {
        v4.back();
        return "sheet";
      }
      if (v440.active) {
        v447();
        return "map";
      }
      if (v16.tab !== "home") {
        const v2238 = document.querySelector(".tab[data-tab=\"home\"]");
        if (v2238) {
          v2238.click();
          return "home";
        }
      }
      return "";
    }
    const v537 = {
      tireBubble: v407,
      daysLeft: v137,
      patchRel: v485,
      REL_UPDATERS: v484,
      viewSig: v483,
      skeleton: v462,
      speedChart: v28,
      get S() {
        return v16;
      }
    };
    function v538(v2239) {
      v65({
        time: /^\d{2}:\d{2}$/.test(v2239 || "") ? v2239 : "09:00"
      });
      v1.mem.bgCache = null;
    }
    function v539(v2240 = []) {
      if (v2240.includes("home")) {
        v251 = 0;
      }
      if (v2240.includes("marks")) {
        v176 = {};
        v177 = "";
      }
      if (v2240.includes("native:batteryHistory")) {
        v1.shell.stopBattPoll();
        v43.clear();
        v1.shell.clearBattOcv?.();
        v1.mem.battCache = null;
      }
      if (v2240.includes("native:chargeHistory")) {
        v186();
        window.CHG?.invalidateNativeHistory?.();
        v188({
          force: true
        });
      }
      v477 = null;
    }
    Object.assign(window.APP, {
      init: v533,
      startBoot: v533,
      load: v299,
      render: v500,
      ACTIONS: v270,
      back: v536,
      patchAutoTime: v538,
      bootState: v490,
      cacheResetMemory: v539,
      bootProgress: v489,
      bootStage: v488,
      suspendAccountRestore: () => {
        v1.domainMigration?.suspend?.();
        v517();
        clearInterval(v518);
        v518 = null;
        v235++;
        v234++;
        if (typeof API.retire === "function") {
          API.retire();
        } else {
          API.gen++;
          API.accountGen++;
        }
      },
      refreshNativeCharge: v188,
      clearChargeHistory: v189,
      syncNative: v341,
      _render: v537,
      context: v162,
      current: v163,
      accountContext: v158,
      accountCurrent: v159,
      claimResponses: v167,
      responseCurrent: v168,
      messagesEpoch: v169,
      acceptMessages: v172,
      tile: v405,
      setMapProvider: v433,
      applyLocMask: v439,
      mapKey: v435,
      isMapShown: v436,
      toggleMapShown: v437,
      locationEye: v438,
      navigationSheet: v453,
      devFold: v123,
      loadAccount: v293,
      hydrateProfileCache: v292,
      resetAllCaches: v457,
      savePrefs: v232,
      startPoll: v516,
      inShell: v198,
      isIOS: v202,
      featuresEnabled: v199,
      featuresEnabledDisplay: v14,
      showFeature: v13,
      unavailable: v15,
      isBuildId: v218,
      BUILD: v217,
      resolvedTheme: v265,
      CAR_CMDS: v271,
      authMsg: v463,
      fireCmd: v274,
      unlockSecret: v279,
      syncMapRoute: v448,
      switchAccount: v244,
      applyAccountCredentials: v247,
      updateAccountUid: v249,
      accAvail: v236,
      startAggregatePoll: v519,
      vehicleToken: v240,
      ownerAuthFailed: v242,
      buildSettings: v294,
      noVehicleView: v390,
      skeleton: v462,
      hideSeatStatus: v225,
      hideSeatCushion: v226,
      seatHideMode: v224,
      setHideSeatMode: v227,
      isSharedCar: v365,
      openInductive: v312,
      getInductiveUiContext: v311,
      openWallpaperTransfer: v315,
      openBtDebug: v313,
      btDebugAvailable: v314,
      wallpaperTransferSupported: v318,
      wallpaperLocalTransferSupported: v324,
      wallpaperTransferCurrent: v319,
      beginWallpaperTransfer: v323,
      beginWallpaperTransferLocal: v325,
      pollWallpaperTransfer: v327,
      wallpaperTransferAction: v328,
      cancelWallpaperTransfer: v329,
      daysLeft: v1.settings.daysLeft,
      settingSheet: v1.gestures.settingSheet,
      capMetaBlock: v1.gestures.capMetaBlock
    });
  })();
  document.addEventListener("DOMContentLoaded", () => window.APP.startBoot(), {
    once: true
  });
})();
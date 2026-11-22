(() => {
  (() => {
    let v1 = null;
    let v2 = null;
    let v3 = false;
    const v4 = new Set();
    const v5 = () => {
      if (v2 || v1 || v3) {
        return v2;
      }
      v2 = Promise.resolve().then(async () => {
        if (window.location?.protocol === "zeeho-panel:") {
          const v8 = document.getElementById("zeeho-local-mock");
          if (!v8) {
            throw new Error("local_mock_missing");
          }
          return JSON.parse(v8.textContent);
        }
        const v6 = await fetch("mock.json", {
          cache: "no-store"
        });
        if (!v6.ok) {
          throw new Error("HTTP " + v6.status);
        }
        const v7 = new Uint8Array(await v6.arrayBuffer());
        return JSON.parse(new TextDecoder("utf-8", {
          fatal: true
        }).decode(v7));
      }).then(v9 => {
        v1 = v9;
        window.ZEEHO_MOCK = v9;
        v4.forEach(v10 => {
          try {
            v10(v9);
          } catch {}
        });
        return v9;
      }).catch(() => {
        v3 = true;
        window.ZEEHO_MOCK = null;
        return null;
      });
      return v2;
    };
    Object.defineProperty(window, "ZEEHO_MOCK", {
      configurable: true,
      get() {
        if (!v1 && !v3) {
          v5();
        }
        return v1;
      },
      set(v11) {
        v1 = v11 || null;
      }
    });
    window.ZEEHO_MOCK_READY = () => v5();
    window.ZEEHO_MOCK_ONLOAD = v12 => {
      v4.add(v12);
      return () => v4.delete(v12);
    };
  })();
  (function (v13) {
    "use strict";

    if (v13.LAZY_FEATURE) {
      return;
    }
    function v14(v16, v17) {
      const v18 = v16 && Object.getOwnPropertyDescriptor(v16, v17);
      if (v18 && "value" in v18) {
        return v18.value;
      } else {
        return undefined;
      }
    }
    function v15(v19, v20, v21) {
      const v22 = Object.getOwnPropertyDescriptor(v19, v20);
      if (v22 && (!("value" in v22) || v22.value !== undefined)) {
        return false;
      }
      let v23 = false;
      let v24 = false;
      let v25 = false;
      let v26;
      function v27(v29) {
        Object.defineProperty(v19, v20, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: v29
        });
        v26 = v29;
        v24 = true;
        v21 = null;
      }
      const v28 = {
        configurable: true,
        enumerable: false,
        get() {
          if (v24) {
            return v26;
          }
          if (v23) {
            throw new Error("Recursive lazy feature: " + String(v20));
          }
          v23 = true;
          v25 = false;
          v26 = undefined;
          try {
            const v30 = v21();
            if (v30 !== undefined) {
              v26 = v30;
            } else if (!v25) {
              throw new Error("Missing lazy feature export: " + String(v20));
            }
            v27(v26);
            return v26;
          } catch (v31) {
            v26 = undefined;
            v25 = false;
            Object.defineProperty(v19, v20, v28);
            throw v31;
          } finally {
            v23 = false;
          }
        },
        set(v32) {
          if (v23) {
            v26 = v32;
            v25 = true;
          } else {
            v27(v32);
          }
        }
      };
      Object.defineProperty(v19, v20, v28);
      return true;
    }
    v13.LAZY_FEATURE = {
      register: v15,
      peek: v14
    };
  })(typeof window === "undefined" ? globalThis : window);
  window.Store = (() => {
    const v33 = window.ZeehoShell;
    const v34 = window.IOSBR;
    const v35 = !!v33 && typeof v33.storeAll === "function";
    const v36 = () => !v35 && !!v34?.candidate?.();
    const v37 = () => v35 || v36();
    const v38 = () => window.__zeehoWebPreview === true || !v37();
    function v39() {
      if (!v37()) {
        return false;
      }
      if (window.__zeehoWebPreview === true && !v40) {
        delete window.__zeehoWebPreview;
        delete window.__zeehoPreviewReason;
      }
      return true;
    }
    let v40 = false;
    const v41 = new Map();
    const v42 = v90 => /^(?:zeeho\.(?:token|accounts|session|capture)|.*(?:credential|carKey))/i.test(String(v90));
    function v43() {
      v40 = true;
      window.__zeehoWebPreview = true;
      v45.clear();
      v51.clear();
      v52.clear();
      v46 = "";
      v47 = "";
      v48 = -1;
    }
    let v44 = 0;
    let v45 = new Map();
    let v46 = "";
    let v47 = "";
    let v48 = -1;
    const v49 = "zeeho.store.removed.v1";
    const v50 = "zeeho.session.cleared.v1";
    let v51 = new Set();
    const v52 = new Map();
    const v53 = new Set();
    const v54 = [];
    const v55 = 5;
    const v56 = 8388608;
    const v57 = 60000;
    const v58 = 40;
    let v59 = 0;
    let v60 = false;
    let v61 = false;
    function v62() {
      if (v61) {
        return true;
      }
      if (!v37() || v38()) {
        return false;
      }
      try {
        const v91 = v36() ? v34.bootstrap() : null;
        if (v36() && (!v91 || v91.storeReadError !== null)) {
          throw new Error(v91?.storeReadError || "invalid_store");
        }
        v44 = v36() ? 2 : typeof v33.storeVersion === "function" ? Number(v33.storeVersion()) || 0 : 1;
        if (v36() && Number.isSafeInteger(v91.storeRevision)) {
          v48 = v91.storeRevision;
        }
        const v92 = v36() ? v91.storeSnapshot : JSON.parse(typeof v33.storeBootstrap === "function" ? v33.storeBootstrap() : v33.storeAll());
        if (!v92 || typeof v92 !== "object" || Array.isArray(v92) || Object.values(v92).some(v94 => typeof v94 !== "string")) {
          throw new Error("invalid_store");
        }
        v45 = new Map(Object.entries(v92));
        const v93 = JSON.parse(v45.get(v49) || "[]");
        if (Array.isArray(v93)) {
          v51 = new Set(v93.filter(v95 => typeof v95 === "string"));
        }
        v46 = "";
        v61 = true;
        return true;
      } catch (v96) {
        v46 = v36() ? String(v96?.message || "iOS 私有数据无法读取；原文件保留，未覆盖。") : "App 私有数据暂时无法读取，请重启 App；原数据没有被覆盖。";
        return false;
      }
    }
    v62();
    function v63() {
      if (!v37()) {
        return Promise.resolve(false);
      }
      if (v35) {
        return Promise.resolve(!v46);
      }
      return v34.ready.then(v97 => {
        v39();
        v62();
        if (!v97 && !v46) {
          v46 = "iOS 原生桥握手失败；未读取网页账号，也未覆盖原文件。";
        }
        return v97 && !v46;
      });
    }
    const v64 = {
      then(v98, v99) {
        return v63().then(v98, v99);
      },
      catch(v100) {
        return v63().catch(v100);
      },
      finally(v101) {
        return v63().finally(v101);
      }
    };
    v63();
    if (typeof window.addEventListener === "function") {
      window.addEventListener("zeehoios:bridge-ready", () => {
        v39();
        v62();
      });
    }
    const v65 = (v102, v103) => Object.prototype.hasOwnProperty.call(v102, v103);
    const v66 = () => v37() && !v38();
    const v67 = () => !v38() && v35 && !v46 && v44 >= 2 && typeof v33.storeCommit === "function";
    const v68 = () => v38() ? false : v36() ? !v46 && v34.has("store.commit") : v67() && typeof v33.storeCommitBegin === "function" && typeof v33.storeCommitPoll === "function";
    const v69 = () => !v38() && v36();
    const v70 = v104 => {
      for (const v105 of v104) {
        v52.set(v105, (v52.get(v105) || 0) + 1);
      }
    };
    const v71 = v106 => {
      if (v38()) {
        if (v42(v106)) {
          return null;
        } else {
          return v41.get(String(v106)) ?? null;
        }
      }
      if (v37() && !v38()) {
        if (v46) {
          return null;
        }
        if (v45.has(v106)) {
          return v45.get(v106);
        }
        if (v51.has(v106) || v45.get(v50) === "1" && v106 === "zeeho.token") {
          return null;
        }
        if (v44 < 2) {
          try {
            return localStorage.getItem(v106);
          } catch {
            return null;
          }
        }
        return null;
      }
      try {
        return localStorage.getItem(v106);
      } catch {
        return null;
      }
    };
    function v72({
      puts = {},
      removes = []
    } = {}) {
      if (v38()) {
        if (!puts || typeof puts !== "object" || Array.isArray(puts) || !Array.isArray(removes)) {
          return false;
        }
        if (Object.keys(puts).some(v42)) {
          v47 = "UI 测试预览不接收真实账号或凭据。";
          window.PLATFORM?.unavailable?.("保存登录凭据");
          return false;
        }
        for (const [v110, v111] of Object.entries(puts)) {
          v41.set(v110, String(v111));
        }
        for (const v112 of removes) {
          v41.delete(String(v112));
        }
        v47 = "";
        return true;
      }
      if (v36()) {
        v47 = v46 || "use_async";
        return false;
      }
      if (v46 || !puts || typeof puts !== "object" || Array.isArray(puts) || !Array.isArray(removes)) {
        return false;
      }
      const v107 = Object.entries(puts).map(([v113, v114]) => [v113, String(v114)]);
      const v108 = [...new Set(removes)].filter(v115 => !v65(puts, v115));
      v70(new Set([...v107.map(([v116]) => v116), ...v108]));
      if (v67() && !v68() && v108.length === 0 && v107.length && v107.every(([v117, v118]) => v45.has(v117) && v45.get(v117) === v118)) {
        return true;
      }
      if (v37() && !v38()) {
        try {
          if (v67()) {
            if (v33.storeCommit(JSON.stringify({
              puts: Object.fromEntries(v107),
              removes: v108
            })) !== true) {
              return false;
            }
          } else {
            if (typeof v33.storePut !== "function" || v108.length && typeof v33.storeRemove !== "function") {
              return false;
            }
            const v119 = new Set(v51);
            for (const v120 of v108) {
              v119.add(v120);
            }
            for (const [v121] of v107) {
              v119.delete(v121);
            }
            v107.push([v49, JSON.stringify([...v119])]);
            for (const [v122, v123] of v107) {
              if (v33.storePut(v122, v123) === false) {
                return false;
              }
            }
            for (const v124 of v108) {
              if (v33.storeRemove(v124) === false) {
                return false;
              }
            }
            v51 = v119;
          }
          for (const [v125, v126] of v107) {
            v45.set(v125, v126);
          }
          for (const v127 of v108) {
            v45.delete(v127);
          }
          return true;
        } catch {
          return false;
        }
      }
      const v109 = new Map();
      try {
        for (const v128 of new Set([...v107.map(([v129]) => v129), ...v108])) {
          v109.set(v128, localStorage.getItem(v128));
        }
        for (const [v130, v131] of v107) {
          localStorage.setItem(v130, v131);
        }
        for (const v132 of v108) {
          localStorage.removeItem(v132);
        }
        return true;
      } catch {
        for (const [v133, v134] of v109) {
          try {
            if (v134 === null) {
              localStorage.removeItem(v133);
            } else {
              localStorage.setItem(v133, v134);
            }
          } catch {}
        }
        return false;
      }
    }
    const v73 = (v135, v136) => v72({
      puts: {
        [v135]: String(v136)
      }
    });
    const v74 = v137 => v72({
      removes: [v137]
    });
    const v75 = (v138, v139 = null) => {
      try {
        const v140 = v71(v138);
        if (v140 === null) {
          return v139;
        } else {
          return JSON.parse(v140);
        }
      } catch {
        return v139;
      }
    };
    const v76 = (v141, v142) => v73(v141, JSON.stringify(v142));
    const v77 = v143 => !v38() && [...v143.expected].every(([v144, v145]) => (v52.get(v144) || 0) === v143.versions.get(v144) && (v45.has(v144) ? v45.get(v144) : null) === v145);
    const v78 = v146 => {
      if (typeof v146 !== "string" || v146.length > 1024) {
        return null;
      }
      try {
        const v147 = JSON.parse(v146);
        if (v147 && typeof v147 === "object" && !Array.isArray(v147) && typeof v147.ticket === "string" && v147.ticket.length <= 64 && /^[a-z0-9-]*$/.test(v147.ticket) && typeof v147.done === "boolean" && typeof v147.ok === "boolean" && typeof v147.error === "string" && v147.error.length <= 128) {
          return v147;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    };
    async function v79(v148) {
      if (v36()) {
        if (!v68()) {
          return false;
        }
        const v151 = await v34.call("store.commit", {
          puts: Object.fromEntries(v148.entries),
          removes: v148.deleted
        });
        if (!v151 || v151.ok !== true || !Number.isSafeInteger(v151.revision) || v151.revision < 0 || v151.revision <= v48) {
          v47 = v151?.error?.message || v151?.error?.code || "iOS 存储未返回有效持久化回执";
          return false;
        }
        v48 = v151.revision;
        v47 = "";
        return true;
      }
      let v149 = v78(v33.storeCommitBegin(v148.text));
      if (!v149 || !v149.ticket || v149.done || v149.ok || v149.error) {
        return false;
      }
      const v150 = v149.ticket;
      while (Date.now() < v148.deadline) {
        await new Promise(v152 => setTimeout(v152, v58));
        if (Date.now() >= v148.deadline) {
          return false;
        }
        v149 = v78(v33.storeCommitPoll(v150));
        if (!v149 || v149.ticket !== v150) {
          return false;
        }
        if (v149.done) {
          return v149.ok === true && v149.error === "";
        }
        if (v149.ok || v149.error) {
          return false;
        }
      }
      return false;
    }
    async function v80() {
      if (v60) {
        return;
      }
      v60 = true;
      try {
        while (v54.length) {
          const v153 = v54.shift();
          let v154 = false;
          try {
            if (Date.now() < v153.deadline && v77(v153) && (await v79(v153)) && v77(v153)) {
              for (const [v155, v156] of v153.entries) {
                v45.set(v155, v156);
              }
              for (const v157 of v153.deleted) {
                v45.delete(v157);
              }
              v70(v153.expected.keys());
              v154 = true;
            }
          } catch (v158) {
            if (v36()) {
              v47 = v158?.error?.message || v158?.message || String(v158);
            }
          }
          v53.delete(v153);
          v59 -= v153.text.length;
          v153.text = "";
          v153.resolve(v154);
        }
      } finally {
        v60 = false;
      }
    }
    function v81(v159 = {}) {
      try {
        if (!v68()) {
          return Promise.resolve(v72(v159));
        }
        const {
          puts = {},
          removes = []
        } = v159;
        if (!puts || typeof puts !== "object" || Array.isArray(puts) || !Array.isArray(removes)) {
          return Promise.resolve(false);
        }
        const v160 = Object.entries(puts).map(([v167, v168]) => [v167, String(v168)]);
        const v161 = [...new Set(removes)].filter(v169 => !v65(puts, v169));
        if (v161.some(v170 => typeof v170 !== "string")) {
          return Promise.resolve(false);
        }
        const v162 = new Set([...v160.map(([v171]) => v171), ...v161]);
        const v163 = new Map([...v162].map(v172 => [v172, v45.has(v172) ? v45.get(v172) : null]));
        const v164 = new Map([...v162].map(v173 => [v173, v52.get(v173) || 0]));
        const v165 = JSON.stringify({
          puts: Object.fromEntries(v160),
          removes: v161,
          expected: Object.fromEntries(v163)
        });
        if (v165.length > v56) {
          return Promise.resolve(false);
        }
        for (const v174 of v53) {
          if (v174.text === v165 && v77(v174)) {
            return v174.promise;
          }
        }
        if (v53.size >= v55 || v165.length > v56 - v59) {
          return Promise.resolve(false);
        }
        const v166 = {
          text: v165,
          entries: v160,
          deleted: v161,
          expected: v163,
          versions: v164,
          deadline: Date.now() + v57
        };
        v166.promise = new Promise(v175 => {
          v166.resolve = v175;
        });
        v53.add(v166);
        v59 += v165.length;
        v54.push(v166);
        v80();
        return v166.promise;
      } catch {
        return Promise.resolve(false);
      }
    }
    const v82 = (v176, v177) => v81({
      puts: {
        [v176]: String(v177)
      }
    });
    const v83 = v178 => v81({
      removes: [v178]
    });
    const v84 = (v179, v180) => {
      try {
        return v82(v179, JSON.stringify(v180));
      } catch {
        return Promise.resolve(false);
      }
    };
    const v85 = (v181, v182) => {
      if (!v37()) {
        return v181;
      }
      const v183 = v182 === undefined ? window.ACC?.activeId?.() : v182;
      if (v183) {
        return v181 + "@" + String(v183);
      } else {
        return v181;
      }
    };
    const v86 = () => {
      if (v38()) {
        return [...v41.keys()];
      }
      if (v37()) {
        return [...v45.keys()];
      }
      try {
        return Array.from({
          length: localStorage.length
        }, (v184, v185) => localStorage.key(v185)).filter(Boolean);
      } catch {
        return [];
      }
    };
    const v87 = new Date("2026-12-01T00:00:00+08:00").getTime();
    const v88 = v186 => {
      if (v38() || !v67() || Date.now() >= v87 || v45.get(v50) === "1") {
        return null;
      }
      try {
        return localStorage.getItem(v186);
      } catch {
        return null;
      }
    };
    function v89(v187) {
      if (!v67()) {
        return false;
      }
      let v188 = true;
      for (const [v189, v190] of Object.entries(v187 || {})) {
        try {
          if (localStorage.getItem(v189) === v190) {
            localStorage.removeItem(v189);
          }
        } catch {
          v188 = false;
        }
      }
      return v188;
    }
    return {
      get: v71,
      set: v73,
      remove: v74,
      getJson: v75,
      setJson: v76,
      commit: v72,
      commitAsync: v81,
      setAsync: v82,
      removeAsync: v83,
      setJsonAsync: v84,
      ns: v85,
      keys: v86,
      isNative: v66,
      canCommit: v67,
      canCommitAsync: v68,
      requiresAsync: v69,
      ready: v64,
      isPreview: v38,
      isPreviewLocked: () => v40,
      isolatePreview: v43,
      nativeVersion: () => v38() ? 0 : v44,
      error: () => v46,
      lastError: () => v47,
      revision: () => v48,
      legacyGet: v88,
      finishMigration: v89
    };
  })();
  window.ZEEHO_EP = {
    base: "https://tapi.zeehoev.com",
    h5: "https://h5.zeehoev.com",
    list: [{
      id: "vehicle_list",
      tag: "app",
      label: "车辆列表",
      path: "/v1.0/app/cfmotoserverapp/vehicle/list"
    }, {
      id: "integral_total",
      tag: "app",
      label: "积分",
      path: "/v1.0/mine/cfmotoservermine/integral/totalIntegral"
    }, {
      id: "user_info",
      tag: "app",
      label: "用户资料",
      path: "/v1.0/mine/cfmotoservermine/setting/other/{uid}"
    }, {
      id: "signin_info",
      tag: "h5",
      label: "签到",
      path: "/cfmotoservermine/signin/info",
      query: {
        month: "{month_dash}",
        server_name: "SMART"
      }
    }, {
      id: "account_uid_like",
      tag: "app",
      label: "账号 ID",
      path: "/v1.0/mine/cfmotoservermine/mine/myLikeInfo"
    }, {
      id: "account_uid_favorite",
      tag: "app",
      label: "账号 ID（兜底）",
      path: "/v1.0/mine/cfmotoservermine/mine/myfavoriteInfo"
    }, {
      id: "account_uid_activity",
      tag: "app",
      label: "账号 ID（兜底二）",
      path: "/v1.0/mine/cfmotoservermine/mine/myActivityInfo"
    }, {
      id: "auth_captcha",
      tag: "app",
      method: "POST",
      label: "登录：图形验证码",
      path: "/v1.0/mine/cfmotoservermine/authCode/code/generate"
    }, {
      id: "auth_sms",
      tag: "app",
      method: "POST",
      label: "登录：发短信验证码",
      path: "/v1.0/mine/cfmotoservermine/authCode/V2"
    }, {
      id: "auth_login",
      tag: "app",
      method: "POST",
      label: "登录：手机号换 token",
      path: "/v1.0/mine/cfmotoservermine/user/loginByPhone"
    }, {
      id: "integral_tasks",
      tag: "app",
      label: "积分任务列表",
      path: "/v1.0/mine/cfmotoservermine/integral/getByUserId",
      query: {
        userId: "{uid}"
      }
    }, {
      id: "signin_count",
      tag: "app",
      label: "签到状态（连签天数/今日是否已签）",
      path: "/v1.0/mine/cfmotoservermine/signin/count"
    }, {
      id: "adjust_by_share",
      tag: "app",
      label: "领取分享积分",
      path: "/v1.0/mine/cfmotoservermine/integral/adjustByShare"
    }, {
      id: "post_mine",
      tag: "app",
      label: "我的动态（定位本次发帖）",
      path: "/v1.0/social/cfmotoserversocial/community/mineArticleInfo",
      query: {
        userId: "{uid}"
      }
    }, {
      id: "post_square",
      tag: "app",
      label: "广场最新动态",
      path: "/v1.0/social/cfmotoserversocial/community/qbTzInfoNewV2",
      query: {
        postModule: "1",
        slidingType: "0",
        page: "1",
        pageSize: "20"
      }
    }, {
      id: "post_publish",
      tag: "app",
      method: "POST",
      label: "发动态（完成\"每日首次发帖\"）",
      path: "/v1.0/social/cfmotoserversocial/commonArticle"
    }, {
      id: "post_like",
      tag: "app",
      method: "POST",
      label: "点赞（完成\"点赞内容\"）",
      path: "/v1.0/social/cfmotoserversocial/socialCommu/likeFavoriteInfo"
    }, {
      id: "post_share",
      tag: "app",
      method: "PUT",
      label: "分享（完成\"分享内容\"）",
      path: "/v1.0/social/cfmotoserversocial/article/share/{postId}"
    }, {
      id: "post_delete",
      tag: "app",
      method: "DELETE",
      label: "删除动态（发帖后收尾）",
      path: "/v1.0/social/cfmotoserversocial/commonArticle/deleteArticle",
      query: {
        articleId: "{postId}",
        postType: "1"
      }
    }, {
      id: "integral_detail",
      tag: "app",
      label: "积分明细",
      path: "/v1.0/mine/cfmotoservermine/integral/detail",
      query: {
        integralId: "{integralId}",
        page: "1",
        pageSize: "50",
        topIntegralDetailId: "0",
        userId: "{uid}"
      }
    }, {
      id: "mine_like",
      tag: "app",
      label: "我的点赞",
      path: "/v1.0/mine/cfmotoservermine/mine/myLikeInfo"
    }, {
      id: "mine_article",
      tag: "app",
      label: "我的文章（最新 20 条）",
      path: "/v1.0/social/cfmotoserversocial/community/mineArticleInfo",
      query: {
        userId: "{uid}"
      }
    }, {
      id: "mine_article_more",
      tag: "app",
      label: "我的文章（按 createDate 游标翻页）",
      path: "/v1.0/social/cfmotoserversocial/community/mineArticlePageSize",
      query: {
        dateTime: "{cursor}",
        userId: "{uid}"
      }
    }, {
      id: "post_detail",
      tag: "app",
      label: "动态详情",
      path: "/v1.0/social/cfmotoserversocial/article/commonArticle_v2/{postId}",
      query: {
        version: "1"
      }
    }, {
      id: "mine_fans",
      tag: "app",
      label: "我的粉丝",
      path: "/v1.0/social/cfmotoserversocial/fans/list",
      query: {
        page: "1",
        pageSize: "20",
        userId: "{uid}"
      }
    }, {
      id: "mine_follows",
      tag: "app",
      label: "我的关注",
      path: "/v1.0/social/cfmotoserversocial/follows/list",
      query: {
        page: "1",
        pageSize: "20",
        userId: "{uid}"
      }
    }, {
      id: "msg_list",
      tag: "app",
      label: "消息列表",
      path: "/v1.0/mine/cfmotoservermine/app/Message/list_v2",
      query: {
        messageKind: "3",
        page: "1",
        pageSize: "20",
        userId: "{uid}"
      }
    }, {
      id: "msg_unread",
      tag: "app",
      label: "消息未读数",
      path: "/v1.0/mine/cfmotoservermine/app/Message/list_v2",
      query: {
        messageKind: "3",
        page: "1",
        pageSize: "1",
        userId: "{uid}"
      }
    }, {
      id: "msg_read_all",
      tag: "app",
      label: "消息：一键已读",
      path: "/v1.0/mine/cfmotoservermine/app/Message/read",
      query: {
        messageKind: "3"
      }
    }, {
      id: "msg_del_all",
      tag: "app",
      label: "消息：一键清除",
      path: "/v1.0/mine/cfmotoservermine/app/Message/delete",
      query: {
        messageKind: "3"
      }
    }, {
      id: "vehicle_home",
      tag: "app",
      label: "车辆主页（车况全量）",
      path: "/v1.0/app/cfmotoserverapp/vehicleHomePageV2/{vin}"
    }, {
      id: "vehicle_props",
      tag: "app",
      label: "车辆属性",
      path: "/v1.0/app/cfmotoserverapp/carSet",
      query: {
        carUserId: "{carUid}",
        vinNo: "{vin}",
        virtualFlag: "0"
      }
    }, {
      id: "battery_info",
      tag: "app",
      label: "电池信息",
      path: "/v1.0/app/cfmotoserverapp/batteryInfo/{vin}"
    }, {
      id: "tire_monitor",
      tag: "app",
      label: "胎压监测",
      path: "/v1.0/app/cfmotoserverapp/app/vehicle/tire/monitoring",
      query: {
        sensorType: "EXTERNAL",
        vinNo: "{vin}"
      }
    }, {
      id: "tire_stats_24h",
      tag: "h5",
      label: "胎压历史（24 小时）",
      path: "/cfmotoserverapp/H5/vehicle/tire/statistics",
      query: {
        sensorType: "EXTERNAL",
        timePeriodType: "1",
        vinNo: "{vin}"
      }
    }, {
      id: "tire_stats_7d",
      tag: "h5",
      label: "胎压历史（7 天）",
      path: "/cfmotoserverapp/H5/vehicle/tire/statistics",
      query: {
        sensorType: "EXTERNAL",
        timePeriodType: "2",
        vinNo: "{vin}"
      }
    }, {
      id: "vehicle_set_items",
      tag: "app",
      label: "设置项能力表",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/items",
      query: {
        homepageInvoke: "1",
        vinNo: "{vin}"
      }
    }, {
      id: "vehicle_set_info",
      tag: "app",
      label: "设置项当前值",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/vehicleSetInfo/{vin}"
    }, {
      id: "ride_home",
      tag: "app",
      label: "最近骑行",
      path: "/v1.0/app/cfmotoserverapp/homeRideInfo",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "ride_month",
      tag: "app",
      label: "月度骑行",
      path: "/v1.0/app/cfmotoserverapp/myRideInfo",
      query: {
        month: "{month_dot}",
        vinNo: "{vin}"
      }
    }, {
      id: "ride_track",
      tag: "app",
      label: "骑行轨迹（按天，含每段行程）",
      path: "/v1.0/app/cfmotoserverapp/ridetrack_v2",
      query: {
        endDate: "",
        page: "1",
        pageSize: "20",
        startDate: "",
        startDateTime: "{date_dash}",
        startTime: "{month_dash}",
        vinNo: "{vin}"
      }
    }, {
      id: "analyse",
      tag: "app",
      label: "骑行画像",
      path: "/v1.0/app/cfmotoserverapp/analyse/analyse",
      query: {
        month: "{month_dot}",
        vinNo: "{vin}"
      }
    }, {
      id: "service_recharge",
      tag: "app",
      label: "智能服务",
      path: "/v1.0/app/cfmotoserverapp/app/service/recharge/vehicle",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "ota_records",
      tag: "app",
      label: "OTA 记录",
      path: "/v1.0/app/cfmotoserverapp/otaRecord",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "nav_addresses",
      tag: "app",
      label: "导航地址簿",
      path: "/v1.0/app/cfmotoserverapp/vehicle/navigation/address/list/0"
    }, {
      id: "wallpaper_page",
      tag: "app",
      label: "壁纸列表（分页）",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/pageVehicleWallpaper",
      query: {
        vinNo: "{vin}",
        pageNum: "1",
        pageSize: "50"
      }
    }, {
      id: "wallpaper_count",
      tag: "app",
      label: "我的壁纸数量",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/getUserWallpaperCount",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "wallpaper_detail",
      tag: "app",
      label: "壁纸详情",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/vehicleWallpaperDetail/{wallpaperId}",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "wallpaper_vehicle",
      tag: "app",
      label: "壁纸适用车型",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/getWallpaperVehicle/{wallpaperId}"
    }, {
      id: "wallpaper_use",
      tag: "app",
      method: "POST",
      label: "写：应用壁纸（下发到车机）",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/useWallpaper"
    }, {
      id: "wallpaper_progress",
      tag: "app",
      label: "壁纸下发进度",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/useWallpaperProgress/{recordId}"
    }, {
      id: "wallpaper_delete",
      tag: "app",
      method: "DELETE",
      label: "写：删除壁纸",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/deleteWallpaperV2/{wallpaperId}"
    }, {
      id: "wallpaper_save",
      tag: "app",
      method: "POST",
      label: "写：上传自定义壁纸（multipart）",
      path: "/v1.0/app/cfmotoserverapp/vehicle/wallpaper/save"
    }, {
      id: "theme_list",
      tag: "app",
      label: "车机主题列表",
      path: "/v1.0/app/cfmotoserverapp/vehicleTheme/list",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "ota_check_version",
      tag: "app",
      label: "OTA 版本比对",
      path: "/v1.0/app/cfmotoserverapp/checkVersion",
      query: {
        targetVersion: "0",
        vinNo: "{vin}"
      }
    }, {
      id: "ota_info",
      tag: "app",
      label: "仪表 OTA 信息",
      path: "/v1.0/app/cfmotoserverapp/ota/mmi/info/v2",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "ota_content",
      tag: "app",
      label: "官方 OTA 下发内容",
      path: "/v1.0/app/cfmotoserverapp/app/ota/v2/red-point/content",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "ota_status",
      tag: "app",
      label: "OTA 任务进度",
      path: "/v1.0/app/cfmotoserverapp/ota/mmi/status",
      query: {
        recordId: "{recordId}"
      }
    }, {
      id: "ota_list",
      tag: "app",
      label: "OTA 任务列表",
      path: "/v1.0/app/cfmotoserverapp/ota/list",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "ota_redpoint",
      tag: "app",
      label: "OTA 红点",
      path: "/v1.0/app/cfmotoserverapp/redPoint",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "ota_upstatus",
      tag: "app",
      label: "OTA 升级状态",
      path: "/v1.0/app/cfmotoserverapp/upstatus",
      query: {
        vinNo: "{vin}"
      }
    }, {
      id: "set_motoPlay",
      tag: "app",
      method: "PUT",
      label: "写：投屏开关",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/motoPlay/one"
    }, {
      id: "set_property",
      tag: "app",
      method: "PUT",
      label: "写：通用属性（propertyOne）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/propertyOne/one"
    }, {
      id: "set_property2",
      tag: "app",
      method: "PUT",
      label: "写：通用属性（propertyTwo）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/propertyTwo/one"
    }, {
      id: "set_sound_size",
      tag: "app",
      method: "PUT",
      label: "写：音量（soundSize）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/soundSize"
    }, {
      id: "custom_audio_list",
      tag: "app",
      label: "自定义音效列表",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/customAudio/list",
      query: {
        vinNo: "{vin}",
        settingFlag: "1",
        vehicleAction: ""
      }
    }, {
      id: "custom_audio_add",
      tag: "app",
      method: "POST",
      label: "上传自定义音效",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/customAudio/add"
    }, {
      id: "custom_audio_delete",
      tag: "app",
      method: "POST",
      label: "删除自定义音效",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/customAudio/del"
    }, {
      id: "set_lowpower",
      tag: "app",
      method: "PUT",
      label: "写：低电量提醒（lowPowerRule）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/lowPowerRule/one"
    }, {
      id: "charge_power_options",
      tag: "app",
      label: "充电功率档位（选项）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/chargePower/options",
      query: {
        flag: "0",
        vinNo: "{vin}"
      }
    }, {
      id: "set_charge_power",
      tag: "app",
      method: "PUT",
      label: "写：充电功率上限（chargePower）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/chargePower"
    }, {
      id: "car_horn",
      tag: "app",
      method: "PUT",
      label: "车控：寻车",
      path: "/v1.0/app/cfmotoserverapp/vehicleInfo/control/{vin}"
    }, {
      id: "car_ctrl_v2",
      tag: "app",
      method: "POST",
      label: "车控：高声寻车（controlV2）",
      path: "/v1.0/app/cfmotoserverapp/vehicleInfo/controlV2"
    }, {
      id: "car_cmd",
      tag: "app",
      method: "POST",
      label: "车控：下发指令（dbpoint）",
      path: "/v1.0/app/cfmotoserverapp/dbpoint/send"
    }, {
      id: "net_unlock",
      tag: "app",
      method: "POST",
      label: "车控：云解锁（一次性 AES）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/network/unlock"
    }, {
      id: "vcu_lock_status",
      tag: "app",
      label: "车辆锁状态（云端）",
      path: "/v1.0/app/cfmotoserverapp/vehicleSet/vcuLockStatus/{vin}"
    }]
  };
})();
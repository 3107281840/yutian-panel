(() => {
  (() => {
    const v1 = window.APP;
    const v2 = window.MODEL;
    const v3 = window.UI;
    const v4 = window.Store;
    const v5 = v2.esc;
    const v6 = "zeeho.dashboard.custom.v1";
    const v7 = "dashboard-theme";
    const v8 = "zeeho-dashboard-custom";
    const v9 = {
      maxPackBytes: 65536,
      maxLibraryBytes: 524288,
      maxPacks: 8
    };
    const v10 = v125 => typeof v125 === "string" && /^[a-z][a-z0-9-]{0,47}$/.test(v125);
    const v11 = () => window.DASHBOARD_THEME;
    const v12 = () => Array.isArray(v11()?.presets) ? v11().presets : [];
    const v13 = v126 => "builtin-" + v126.id;
    const v14 = v127 => v127 ? v12().find(v128 => v13(v128) === v127) : undefined;
    const v15 = Object.freeze({
      "builtin-cool-tech": "builtin-xpeng",
      "builtin-sweet-cute": "builtin-niu"
    });
    const v16 = () => ({
      schemaVersion: 1,
      activeId: "",
      packs: []
    });
    const v17 = (v129, v130) => Object.prototype.hasOwnProperty.call(v129, v130);
    const v18 = v131 => !!v131 && typeof v131 === "object" && !Array.isArray(v131);
    const v19 = (v132, v133) => v18(v132) && Object.keys(v132).every(v134 => v133.includes(v134)) && v133.every(v135 => v17(v132, v135));
    let v20 = false;
    let v21 = false;
    let v22 = null;
    let v23 = v16();
    let v24 = new Map();
    let v25 = null;
    let v26 = 0;
    let v27 = 0;
    let v28 = 0;
    let v29 = 0;
    let v30 = "";
    let v31 = "info";
    let v32 = "";
    let v33 = 0;
    let v34 = "";
    let v35 = "";
    let v36 = "";
    let v37 = "info";
    let v38 = false;
    let v39 = null;
    let v40 = 0;
    let v41 = 0;
    let v42 = null;
    let v43 = 0;
    let v44 = 0;
    let v45 = null;
    let v46 = false;
    let v47 = null;
    const v48 = [];
    let v49 = false;
    let v50 = [];
    let v51 = null;
    let v52 = [];
    let v53 = "";
    let v54 = null;
    let v55 = null;
    let v56 = new Map();
    let v57 = 0;
    let v58 = null;
    function v59(v136) {
      if (typeof TextEncoder === "function") {
        return new TextEncoder().encode(v136).byteLength;
      }
      let v137 = 0;
      for (const v138 of String(v136)) {
        const v139 = v138.codePointAt(0);
        v137 += v139 < 128 ? 1 : v139 < 2048 ? 2 : v139 < 65536 ? 3 : 4;
      }
      return v137;
    }
    function v60() {
      v26++;
    }
    function v61(v140, v141 = "info") {
      if (v30 === v140 && v31 === v141) {
        return false;
      }
      v30 = v140;
      v31 = v141;
      v60();
      return true;
    }
    function v62() {
      if (v49 || typeof v1.render !== "function") {
        return;
      }
      v49 = true;
      Promise.resolve().then(() => {
        v49 = false;
        try {
          v1.render({
            keepScroll: true
          });
        } catch {}
      });
    }
    function v63(v142) {
      const v143 = typeof document === "undefined" ? null : document;
      if (!v143?.head) {
        return v142 === "";
      }
      let v144 = v143.getElementById(v8);
      if (!v144 && !v142) {
        return true;
      }
      if (!v144) {
        v144 = v143.createElement("style");
        v144.id = v8;
        v143.head.appendChild(v144);
      }
      if (v144.textContent !== v142) {
        v144.textContent = v142;
      }
      return true;
    }
    function v64() {
      if (v54 !== null) {
        clearTimeout(v54);
      }
      v54 = null;
      v55 = null;
      v53 = "";
      v51 = null;
      v52 = [];
    }
    function v65() {
      const v145 = !!v25;
      v25 = null;
      v27++;
      v64();
      try {
        v63("");
      } catch {}
      if (v145) {
        v60();
      }
      return v145;
    }
    function v66(v146) {
      v65();
      v61(v146, "bad");
      v62();
    }
    function v67(v147) {
      try {
        if (!v147?.ok || !v10(v147.id) || typeof v147.css !== "string" || !v63(v147.css)) {
          throw new Error("unavailable");
        }
        v25 = v147;
        v27++;
        v64();
        v60();
        v61("");
        return true;
      } catch {
        v66("自定义仪表盘暂时无法显示，已使用默认布局。主题仍已保存，可稍后重新应用。");
        return false;
      }
    }
    function v68(v148, v149) {
      try {
        const v150 = v11();
        if (!v150 || typeof v150.compile !== "function") {
          return {
            ok: false,
            environment: true,
            error: {
              message: "主题引擎尚未就绪，请刷新页面后重试。"
            }
          };
        }
        const v151 = v150.compile(v148, {
          id: v149,
          document: typeof document === "undefined" ? undefined : document
        });
        if (!v151?.ok) {
          return v151 || {
            ok: false,
            environment: true,
            error: {
              message: "主题引擎未返回校验结果，请刷新页面重试。"
            }
          };
        }
        if (!v18(v151.pack) || typeof v151.css !== "string" || v151.id !== v149 || v59(JSON.stringify(v151.pack)) > v9.maxPackBytes) {
          return {
            ok: false,
            environment: true,
            error: {
              message: "主题引擎返回格式异常，请刷新页面后重试。"
            }
          };
        }
        return v151;
      } catch {
        return {
          ok: false,
          environment: true,
          error: {
            message: "主题引擎校验异常，请刷新页面后重试。"
          }
        };
      }
    }
    function v69(v152, v153) {
      if (typeof v152?.pack?.name === "string") {
        return v152.pack.name;
      } else {
        return "无法读取的主题 " + (v153 + 1);
      }
    }
    function v70(v154) {
      if (v154 === null) {
        return {
          library: v16(),
          compiled: new Map(),
          faults: new Map()
        };
      }
      if (typeof v154 !== "string" || v59(v154) > v9.maxLibraryBytes) {
        throw new Error("library");
      }
      const v155 = JSON.parse(v154);
      if (!v19(v155, ["schemaVersion", "activeId", "packs"]) || v155.schemaVersion !== 1 || typeof v155.activeId !== "string" || v155.activeId && !v10(v155.activeId) || !Array.isArray(v155.packs) || v155.packs.length > v9.maxPacks) {
        throw new Error("library");
      }
      const v156 = new Map();
      const v157 = new Map();
      const v158 = new Map();
      v155.packs.forEach((v162, v163) => {
        if (!v19(v162, ["id", "pack", "at"]) || !v10(v162?.id) || v162?.id.startsWith("builtin-") || !Number.isSafeInteger(v162.at) || v162.at < 0) {
          v158.set(v163, "主题记录格式损坏");
        }
        if (v10(v162?.id)) {
          if (v156.has(v162?.id)) {
            v158.set(v163, "主题 ID 重复");
            v158.set(v156.get(v162?.id), "主题 ID 重复");
          } else {
            v156.set(v162?.id, v163);
          }
        }
      });
      const v159 = v17(v15, v155.activeId) && v14(v15[v155.activeId]);
      if (v159) {
        v155.activeId = v13(v159);
      }
      const v160 = v156.get(v155.activeId);
      const v161 = v14(v155.activeId);
      if (v161) {
        const v164 = v68(v161.pack, v155.activeId);
        if (v164.ok) {
          v157.set(v155.activeId, v164);
        }
      } else if (v160 !== undefined && !v158.has(v160)) {
        const v165 = v155.packs[v160];
        const v166 = v68(v165.pack, v165?.id);
        if (v166.ok) {
          v157.set(v165?.id, v166);
        } else {
          v158.set(v160, v97(v166));
        }
      }
      return {
        library: v155,
        compiled: v157,
        faults: v158
      };
    }
    function v71(v167) {
      v23 = v167.library;
      v24 = v167.compiled;
      v56 = v167.faults;
      const v168 = ++v57;
      const v169 = v23;
      if (v58 !== null) {
        clearTimeout(v58);
      }
      const v170 = v169.packs.map((v172, v173) => v173);
      const v171 = () => {
        if (v168 !== v57 || v169 !== v23) {
          return;
        }
        v58 = null;
        if (v76()) {
          v58 = setTimeout(v171, 32);
          return;
        }
        const v174 = v170.shift();
        if (v174 === undefined) {
          return;
        }
        const v175 = v169.packs[v174];
        if (!v56.has(v174) && !v24.has(v175?.id)) {
          const v176 = v68(v175.pack, v175?.id);
          if (v168 !== v57 || v169 !== v23) {
            return;
          }
          if (v176.ok) {
            v24.set(v175?.id, v176);
          } else {
            v56.set(v174, v97(v176));
            const v177 = v42;
            const v178 = v43;
            const v179 = v33;
            Promise.resolve().then(() => {
              if (v168 === v57 && v178 === v43 && v179 === v33 && !v76() && v77(v177)) {
                v90(v177);
              }
            });
          }
        }
        if (v170.length) {
          v58 = setTimeout(v171, 32);
        }
      };
      v58 = setTimeout(v171, 32);
    }
    function v72(v180) {
      const v181 = v23.packs.findIndex(v184 => v184?.id === v180);
      if (v181 < 0 || v56.has(v181)) {
        return null;
      }
      const v182 = v23.packs[v181];
      const v183 = v68(v182.pack, v180);
      if (!v183.ok) {
        v56.set(v181, v97(v183));
        v24.delete(v180);
        if (v25?.id === v180) {
          v66("当前主题未通过安全校验，已恢复默认。原稿仍保留，可导出救援。");
        }
        return null;
      }
      v24.set(v180, v183);
      return v183;
    }
    function v73() {
      if (!v4 || typeof v4.get !== "function" || v4.error?.()) {
        throw new Error("read");
      }
      const v185 = v4.get(v6);
      if (v4.error?.() || v185 !== null && typeof v185 !== "string") {
        throw new Error("read");
      }
      return v185;
    }
    function v74(v186) {
      v21 = true;
      v65();
      v61(v186, "bad");
    }
    function v75() {
      if (v20) {
        return !v21;
      }
      v20 = true;
      try {
        v22 = v73();
      } catch {
        v74("自定义仪表盘数据暂时无法读取，已使用默认布局。原数据未被覆盖，请重启或刷新后重试。");
        return false;
      }
      try {
        v71(v70(v22));
        if (v23.activeId) {
          const v187 = v24.get(v23.activeId);
          if (v187) {
            v32 = v11().serialize(v187.pack);
            v34 = v14(v23.activeId) ? "" : v187.id;
            v35 = v34 ? JSON.stringify(v23.packs.find(v188 => v188?.id === v34)) : "";
            v67(v187);
          } else {
            v61("当前主题损坏或未通过安全校验，已使用默认布局。其他主题仍可使用，原稿可导出救援。", "bad");
          }
        }
        return true;
      } catch {
        v74("自定义仪表盘主题库损坏、超限或未通过安全校验，已使用默认布局。原数据已保留，不会自动覆盖。");
        return false;
      }
    }
    function v76() {
      return !!v45 || v48.length > 0;
    }
    function v77(v189) {
      return !!v189 && v42 === v189 && !v189.dismissed && !!v189.handle && (typeof v3.sheetAlive !== "function" || v3.sheetAlive(v189.handle));
    }
    function v78(v190, v191) {
      return v77(v190) && v190.mount === v191 && v190.root?.isConnected !== false;
    }
    function v79(v192) {
      return v192.id === v44 && v192.intent === v43;
    }
    function v80(v193) {
      return v193.draftVersion === v33 && v77(v42) && v42.id === v193.session && v42.handle === v193.handle;
    }
    function v81(v194, v195, v196 = "info") {
      if (v80(v194) || !v42 && v194.session === v41 && v194.draftVersion === v33) {
        v84(v195, v196);
      }
    }
    function v82() {
      return !!v39 && v39.draftVersion === v33 && v39.text === v32;
    }
    function v83() {
      v39 = null;
      v40++;
    }
    function v84(v197, v198 = "info", v199 = false) {
      v36 = v197;
      v37 = v198;
      v38 = v199;
      if (!v199) {
        v83();
      }
      v86();
    }
    function v85(v200, v201) {
      if (v201?.environment) {
        v84(v97(v201), "bad");
        return;
      }
      const v202 = v201?.error || {
        message: "主题校验失败，请检查代码。"
      };
      v39 = {
        id: ++v40,
        text: v200,
        draftVersion: v33,
        error: {
          field: typeof v202.field === "string" ? v202.field : "pack",
          line: Number.isSafeInteger(v202.line) ? v202.line : 1,
          column: Number.isSafeInteger(v202.column) ? v202.column : 1,
          message: typeof v202.message === "string" ? v202.message : "主题校验失败，请检查代码。"
        }
      };
      v84(v97(v201), "bad", true);
    }
    function v86() {
      const v203 = v42;
      if (!v77(v203) || !v203.root?.querySelector) {
        return;
      }
      const v204 = v76();
      const v205 = v203.root.querySelector("#dashboard-theme-form");
      const v206 = v203.root.querySelector("#dashboard-theme-feedback");
      const v207 = v203.root.querySelector("#dashboard-theme-code");
      if (v205) {
        v205.setAttribute("aria-busy", String(v204));
      }
      if (v206) {
        v206.className = "note " + v37;
        v206.textContent = v36;
        v206.hidden = !v36;
      }
      const v208 = v203.root.querySelector("[data-dashboard-theme-copy-error]");
      const v209 = v203.root.querySelector(".dashboard-theme-feedback-row");
      const v210 = v82() && v38;
      if (v209) {
        v209.hidden = !v36;
      }
      if (v208) {
        v208.hidden = !v210;
        v208.disabled = !!v203.repairCopyBusy;
        v208.setAttribute("aria-busy", String(!!v203.repairCopyBusy));
      }
      const v211 = v203.root.querySelector("#dashboard-theme-repair-status");
      if (v211 && !v210) {
        v211.textContent = "";
      }
      if (v207) {
        v207.setAttribute("aria-invalid", String(v38));
      }
      for (const v216 of v203.root.querySelectorAll("[data-dashboard-theme-apply], [data-dashboard-theme-load], [data-dashboard-theme-delete], [data-dashboard-theme-confirm-delete], [data-dashboard-theme-delete-bad], [data-dashboard-theme-confirm-bad], [data-dashboard-theme-preset], [data-dashboard-theme-preset-default]")) {
        v216.disabled = v21 || v204 || v216.hasAttribute("data-dashboard-theme-apply") && !v32.trim();
      }
      const v212 = v203.root.querySelector("[data-dashboard-theme-apply]");
      if (v212) {
        v212.textContent = v204 ? "保存中…" : "应用";
      }
      const v213 = v203.root.querySelector("[data-dashboard-theme-paste]");
      const v214 = v203.root.querySelector("[data-dashboard-theme-copy]");
      if (v213) {
        v213.disabled = !!v203.pasteBusy;
        v213.setAttribute("aria-busy", String(!!v203.pasteBusy));
      }
      if (v214) {
        v214.disabled = !!v203.copyBusy;
        v214.setAttribute("aria-busy", String(!!v203.copyBusy));
      }
      const v215 = v203.root.querySelector("[data-dashboard-theme-reset]");
      if (v215) {
        v215.disabled = false;
        v215.setAttribute("aria-busy", String(!!v47));
      }
    }
    function v87(v217) {
      if (!v217 || v42 !== v217 || v217.dismissed) {
        return;
      }
      const v218 = v217.root?.querySelector?.("#dashboard-theme-code");
      if (v218 && v218.value !== v32) {
        v32 = v218.value;
        v33++;
        v83();
      }
    }
    function v88(v219) {
      const v220 = v23.packs.map((v228, v229) => {
        const v230 = v69(v228, v229);
        const v231 = v56.has(v229);
        const v232 = v231 ? "已隔离 · 不会应用，可导出原稿救援" : v25?.id === v228?.id ? "当前使用" : v24.has(v228?.id) ? "已保存 · 载入后需点击应用" : "等待校验 · 载入前会严格复核";
        return "<div class=\"sheet-item\"><span class=\"ico\">" + v3.icon("edit", 18) + "</span><div><div class=\"t\">" + v5(v230) + "</div>\n        <div class=\"s\">" + v232 + "</div></div><span class=\"tail\">\n        " + (v231 ? "" : "<button type=\"button\" class=\"btn text sm\" data-dashboard-theme-load=\"" + v5(v228?.id) + "\">载入</button>") + "\n        <button type=\"button\" class=\"btn text sm\" data-dashboard-theme-export=\"" + v229 + "\">导出原稿</button>\n        <button type=\"button\" class=\"iconbtn sm\" " + (v231 ? "data-dashboard-theme-delete-bad=\"" + v229 + "\"" : "data-dashboard-theme-delete=\"" + v5(v228?.id) + "\"") + " title=\"删除主题\" aria-label=\"" + v5("删除 " + v230) + "\">" + v3.icon("del", 18) + "</button></span></div>";
      }).join("");
      const v221 = v219.confirmBad !== null ? v219.confirmBad : v23.packs.findIndex(v233 => v233?.id === v219.confirmId);
      const v222 = v221 >= 0 && v221 < v23.packs.length;
      const v223 = v222 ? "<div class=\"note bad mt12\"><div>删除「" + v5(v69(v23.packs[v221], v221)) + "」？" + (v56.has(v221) ? "这是隔离的坏包，请先导出原稿或原库救援；确认后才会移除。" : v25?.id === v23.packs[v221]?.id ? "删除后仪表盘将使用默认布局。" : "其他主题不会改变。") + "\n      <div class=\"field\"><button type=\"button\" class=\"btn text\" data-dashboard-theme-cancel-delete>取消</button>\n      <button type=\"button\" class=\"btn tonal\" " + (v219.confirmBad !== null ? "data-dashboard-theme-confirm-bad=\"" + v221 + "\"" : "data-dashboard-theme-confirm-delete=\"" + v5(v23.packs[v221]?.id) + "\"") + ">确认删除</button></div></div></div>" : "";
      const v224 = !v25 && !v23.activeId;
      const v225 = "<article class=\"dashboard-theme-preset dashboard-theme-preset-default\">\n      <div class=\"dashboard-theme-preset-art\" aria-hidden=\"true\"><span></span><i></i><b></b></div>\n      <div class=\"dashboard-theme-preset-info\"><div class=\"t\">默认</div><div class=\"s\">原生首页</div></div>\n      <button type=\"button\" class=\"btn tonal sm\" data-dashboard-theme-preset-default aria-label=\"使用默认\" aria-pressed=\"" + v224 + "\">" + (v224 ? "使用中" : "使用") + "</button>\n    </article>";
      const v226 = v12().map(v234 => "<article class=\"dashboard-theme-preset dashboard-theme-preset-" + v5(v234.id) + "\">\n      <div class=\"dashboard-theme-preset-art\" aria-hidden=\"true\"><span></span><i></i><b></b></div>\n      <div class=\"dashboard-theme-preset-info\"><div class=\"t\">" + v5(v234.title) + "</div><div class=\"s\">" + v5(v234.description) + "</div></div>\n      <button type=\"button\" class=\"btn tonal sm\" data-dashboard-theme-preset=\"" + v5(v234.id) + "\" aria-label=\"" + v5("使用" + v234.title) + "\" aria-pressed=\"" + (v25?.id === v13(v234)) + "\">" + (v25?.id === v13(v234) ? "使用中" : "使用") + "</button>\n    </article>").join("");
      const v227 = "<div class=\"section-title\"><span>预设风格</span><span class=\"line\"></span></div><div class=\"dashboard-theme-presets\">" + v225 + v226 + "</div><div class=\"card-sub\">六种内置布局，不占自存名额。</div>";
      return v227 + "<form id=\"dashboard-theme-form\" class=\"dashboard-theme-editor\" aria-busy=\"" + v76() + "\">\n      <div class=\"note info\"><div>复制提示词给 AI，再粘贴生成的主题文本；只改变本设备的仪表盘。</div></div>\n      <div class=\"field\"><button type=\"button\" class=\"btn tonal block\" data-dashboard-theme-copy>" + v3.icon("copy", 18) + "<span>复制标准提示词</span></button></div>\n      <div class=\"mt12\"><label for=\"dashboard-theme-code\" class=\"card-sub\">主题文本</label>\n      <textarea id=\"dashboard-theme-code\" data-dashboard-theme-code class=\"pastebox mt8\" rows=\"8\" spellcheck=\"false\" autocomplete=\"off\" autocapitalize=\"off\" aria-describedby=\"dashboard-theme-feedback\" aria-invalid=\"" + v38 + "\" placeholder=\"在这里粘贴 AI 生成的主题文本\">" + v5(v32) + "</textarea></div>\n      <div class=\"dashboard-theme-feedback-row\"" + (v36 ? "" : " hidden") + ">\n        <div id=\"dashboard-theme-feedback\" class=\"note " + v37 + " mt12\" role=\"status\" aria-live=\"polite\"" + (v36 ? "" : " hidden") + ">" + v5(v36) + "</div>\n        <button type=\"button\" class=\"iconbtn\" data-dashboard-theme-copy-error title=\"复制错误与修复提示词\" aria-label=\"复制错误与修复提示词\"" + (v82() && v38 ? "" : " hidden") + ">" + v3.icon("copy", 18) + "</button>\n      </div><div id=\"dashboard-theme-repair-status\" class=\"card-sub\" role=\"status\" aria-live=\"polite\"></div>\n      <div class=\"dashboard-theme-actions field\"><button type=\"button\" class=\"btn tonal\" data-dashboard-theme-paste>读取剪贴板</button><button type=\"submit\" class=\"btn\" data-dashboard-theme-apply>应用</button><button type=\"button\" class=\"btn text\" data-dashboard-theme-reset>恢复默认</button></div>\n    </form><div class=\"section-title mt16\"><span>已保存 " + v23.packs.length + "/" + v9.maxPacks + "</span><span class=\"line\"></span></div>\n    <div data-dashboard-theme-list>" + (v220 || "<div class=\"card-sub\">还没有保存的主题。应用成功后会保留在这里。</div>") + "</div>" + v223 + "\n    <div class=\"field\"><button type=\"button\" class=\"btn text\" data-dashboard-theme-export-library>导出原库救援</button></div>\n    <div data-dashboard-theme-rescue hidden><label class=\"card-sub\">救援原文（未校验，不会执行；可长按全选复制并保存）</label><textarea class=\"pastebox mt8\" rows=\"6\" readonly data-dashboard-theme-rescue-text></textarea></div>";
    }
    function v89(v235) {
      return {
        key: v7,
        closeMode: "current",
        title: "自定义仪表盘",
        sub: "本设备 · 最多保存 8 套",
        body: v88(v235),
        onDismiss: () => {
          v87(v235);
          v235.dismissed = true;
          v235.mount++;
          v235.root = null;
          if (v42 === v235) {
            v42 = null;
          }
        },
        onMount: v236 => v92(v235, v236)
      };
    }
    function v90(v237) {
      if (!v77(v237)) {
        return;
      }
      v87(v237);
      const v238 = v89(v237);
      if (typeof v3.updateSheet === "function") {
        v3.updateSheet(v237.handle, v238);
      } else {
        v237.handle = v3.sheet(v1.phone(), v238);
      }
    }
    function v91() {
      v75();
      const v239 = v3.currentSheet?.(v7);
      let v240 = v42;
      if (!v240 || v240.dismissed || !v239 || v240.handle !== v239) {
        v240 = {
          id: ++v41,
          handle: v239 || null,
          root: null,
          mount: 0,
          dismissed: false,
          pasteBusy: false,
          copyBusy: false,
          repairCopyBusy: false,
          confirmId: "",
          confirmBad: null,
          rescueText: "",
          rescueOpen: false
        };
        v42 = v240;
        if (v76()) {
          v36 = "草稿已保留；确认代码后再点击应用，或随时恢复默认。";
          v37 = "info";
        }
        if (v21) {
          v36 = "主题库暂时不可写，原数据已保留。请重启或刷新后重试。";
          v37 = "bad";
        }
      } else {
        v87(v240);
      }
      try {
        v240.handle = v3.sheet(v1.phone(), v89(v240));
        v86();
        return v240.handle;
      } catch {
        v240.dismissed = true;
        if (v42 === v240) {
          v42 = null;
        }
        v61("主题管理暂时无法打开，请刷新页面后重试。", "bad");
        v62();
        return null;
      }
    }
    function v92(v241, v242) {
      v241.root = v242;
      v241.handle = v241.handle || v3.currentSheet?.(v7);
      const v243 = ++v241.mount;
      const v244 = () => v78(v241, v243);
      const v245 = v242.querySelector("#dashboard-theme-form");
      const v246 = v242.querySelector("#dashboard-theme-code");
      if (v246) {
        v246.value = v32;
      }
      const v247 = v242.querySelector("[data-dashboard-theme-rescue]");
      const v248 = v242.querySelector("[data-dashboard-theme-rescue-text]");
      if (v247) {
        v247.hidden = !v241.rescueOpen;
      }
      if (v248) {
        v248.value = v241.rescueText;
      }
      v245?.addEventListener("input", v250 => {
        if (!v244() || v250.target !== v246) {
          return;
        }
        v32 = v246.value;
        v33++;
        v84("草稿尚未应用。");
      });
      v245?.addEventListener("submit", v251 => {
        v251.preventDefault();
        v251.stopPropagation();
        if (v244()) {
          v87(v241);
          v100(v241);
        }
      });
      const v249 = (v252, v253) => v242.querySelectorAll(v252).forEach(v254 => v254.addEventListener("click", v255 => {
        v255.preventDefault();
        v255.stopPropagation();
        if (v244() && !v254.disabled) {
          v253(v254);
        }
      }));
      v249("[data-dashboard-theme-copy]", () => {
        v93(v241, v243);
      });
      v249("[data-dashboard-theme-copy-error]", () => {
        v94(v241, v243);
      });
      v249("[data-dashboard-theme-preset]", v256 => v101(v241, v256.getAttribute("data-dashboard-theme-preset")));
      v249("[data-dashboard-theme-preset-default]", () => {
        if (v25 || v23.activeId) {
          v102(v241);
        }
      });
      v249("[data-dashboard-theme-paste]", () => {
        v95(v241, v243);
      });
      v249("[data-dashboard-theme-reset]", () => v102(v241));
      v249("[data-dashboard-theme-load]", v257 => v96(v241, v257.getAttribute("data-dashboard-theme-load")));
      v249("[data-dashboard-theme-delete]", v258 => {
        v241.confirmBad = null;
        v241.confirmId = v258.getAttribute("data-dashboard-theme-delete");
        v90(v241);
      });
      v249("[data-dashboard-theme-delete-bad]", v259 => {
        v241.confirmId = "";
        v241.confirmBad = Number(v259.getAttribute("data-dashboard-theme-delete-bad"));
        v241.confirmText = v22;
        v90(v241);
      });
      v249("[data-dashboard-theme-cancel-delete]", () => {
        v241.confirmId = "";
        v241.confirmBad = null;
        v90(v241);
      });
      v249("[data-dashboard-theme-confirm-delete]", v260 => v103(v241, v260.getAttribute("data-dashboard-theme-confirm-delete")));
      v249("[data-dashboard-theme-confirm-bad]", v261 => v105(v241, Number(v261.getAttribute("data-dashboard-theme-confirm-bad"))));
      v249("[data-dashboard-theme-export]", v262 => v104(v241, v243, Number(v262.getAttribute("data-dashboard-theme-export"))));
      v249("[data-dashboard-theme-export-library]", () => v104(v241, v243));
      v86();
    }
    async function v93(v263, v264) {
      if (v263.copyBusy) {
        return;
      }
      const v265 = v33;
      const v266 = v36;
      const v267 = v40;
      v263.copyBusy = true;
      v86();
      try {
        const v268 = v11()?.prompt(window.ZEEHO_THEME);
        if (typeof v268 !== "string" || (await v3.copy(v268, v1.phone(), "标准提示词")) === false) {
          throw new Error("copy");
        }
      } catch {
        if (v78(v263, v264) && v33 === v265 && v36 === v266 && v40 === v267) {
          v84("提示词复制失败，请再次点击复制。", "bad");
        }
      } finally {
        v263.copyBusy = false;
        if (v77(v263)) {
          v86();
        }
      }
    }
    async function v94(v269, v270) {
      const v271 = v39;
      if (v269.repairCopyBusy || !v82()) {
        return;
      }
      const v272 = () => v78(v269, v270) && v39 === v271 && v82();
      v269.repairCopyBusy = true;
      v86();
      const v273 = v274 => {
        if (v272()) {
          const v275 = v269.root.querySelector("#dashboard-theme-repair-status");
          if (v275) {
            v275.textContent = v274;
          }
        }
      };
      try {
        const v276 = v11()?.repairPrompt(v271.text, v271.error, window.ZEEHO_THEME);
        if (typeof v276 !== "string" || (await v3.copy(v276, v1.phone(), "错误与修复提示词")) === false) {
          throw new Error("copy");
        }
        v273("已复制，粘贴给 AI 修正后重新导入。");
      } catch {
        v273("复制失败，请重试；原错误和主题文本已保留。");
      } finally {
        v269.repairCopyBusy = false;
        if (v77(v269)) {
          v86();
        }
      }
    }
    async function v95(v277, v278) {
      if (v277.pasteBusy) {
        return;
      }
      const v279 = v33;
      const v280 = () => v78(v277, v278) && v279 === v33;
      const v281 = () => {
        if (!v280()) {
          return;
        }
        v84("无法读取剪贴板，请长按代码输入框，使用系统「粘贴」。现有草稿未改变。", "info");
        v277.root.querySelector("#dashboard-theme-code")?.focus?.({
          preventScroll: true
        });
      };
      const v282 = typeof navigator === "undefined" ? null : navigator;
      if (typeof v282?.clipboard?.readText !== "function") {
        v281();
        return;
      }
      v277.pasteBusy = true;
      try {
        const v283 = v282.clipboard.readText();
        v86();
        const v284 = await v283;
        if (!v280()) {
          return;
        }
        if (typeof v284 !== "string" || !v284) {
          v84("剪贴板没有文本，请手动粘贴主题代码。");
          return;
        }
        if (v59(v284) > v9.maxPackBytes) {
          v84("剪贴板文本超过 64 KiB，未覆盖现有草稿。", "bad");
          return;
        }
        v32 = v284;
        v34 = "";
        v33++;
        v277.root.querySelector("#dashboard-theme-code").value = v32;
        v84("已粘贴，尚未应用。检查文本后点击「应用」。");
      } catch {
        v281();
      } finally {
        v277.pasteBusy = false;
        if (v77(v277)) {
          v86();
        }
      }
    }
    function v96(v285, v286) {
      if (v21 || v76() || !v10(v286)) {
        return;
      }
      const v287 = v23.packs.find(v288 => v288?.id === v286);
      if (!v287 || !v72(v286)) {
        v84("这套主题已隔离，不能载入；原稿仍可导出救援。", "bad");
        v90(v285);
        return;
      }
      try {
        const v289 = v11().serialize(v287.pack);
        if (typeof v289 !== "string") {
          throw new Error("serialize");
        }
        v32 = v289;
        v34 = v286;
        v35 = JSON.stringify(v287);
        v33++;
        v285.confirmId = "";
        const v290 = v285.root?.querySelector("#dashboard-theme-code");
        if (v290) {
          v290.value = v32;
        }
        v84("已载入「" + v287.pack.name + "」，尚未应用。检查后请再点击「应用」。");
        v90(v285);
      } catch {
        v84("这套主题暂时无法载入，原数据未改变。", "bad");
      }
    }
    function v97(v291) {
      const v292 = v291?.error || {};
      let v293 = "";
      if (Number.isSafeInteger(v292.line) && v292.line > 0) {
        v293 += "第 " + v292.line + " 行";
      }
      if (Number.isSafeInteger(v292.column) && v292.column > 0) {
        v293 += (v293 ? "，" : "") + "第 " + v292.column + " 列";
      }
      const v294 = typeof v292.field === "string" ? v292.field : "";
      const v295 = typeof v292.message === "string" ? v292.message : "主题校验失败，请检查代码。";
      return "" + (v294 ? v294 + "：" : "") + (v293 ? v293 + "：" : "") + v295;
    }
    function v98() {
      let v296;
      do {
        v296 = "theme-" + Date.now().toString(36) + "-" + (++v29).toString(36);
      } while (v23.packs.some(v297 => v297?.id === v296));
      return v296;
    }
    function v99(v298, v299) {
      return {
        id: ++v44,
        intent: ++v43,
        session: v298.id,
        handle: v298.handle,
        draftVersion: v33,
        kind: v299
      };
    }
    function v100(v300) {
      if (v76()) {
        return;
      }
      if (v21) {
        v84("主题库暂时不可写，原数据已保留；请重启或刷新后重试。", "bad");
        return;
      }
      const v301 = v32;
      if (!v301.trim()) {
        v84("请先粘贴主题代码。", "info");
        return;
      }
      if (v59(v301) > v9.maxPackBytes) {
        v85(v301, {
          error: {
            field: "pack",
            line: 1,
            column: 1,
            message: "主题代码超过 64 KiB，请缩短后重试。"
          }
        });
        return;
      }
      let v302 = v10(v34) ? v34 : v98();
      let v303 = v68(v301, v302);
      if (!v303?.ok) {
        v85(v301, v303);
        return;
      }
      const v304 = v12().find(v308 => JSON.stringify(v308.pack) === JSON.stringify(v303.pack));
      if (v304) {
        v101(v300, v304.id);
        return;
      }
      const v305 = v23.packs.find((v309, v310) => v309?.id === v34 && !v56.has(v310));
      const v306 = v305 && v305.pack.name === v303.pack.name;
      if (v305 && !v306) {
        v302 = v98();
        v303 = v68(v303.pack, v302);
        if (!v303?.ok) {
          v85(v301, v303);
          return;
        }
      }
      const v307 = {
        ...v99(v300, "apply"),
        compiled: v303,
        sourceId: v306 ? v34 : "",
        sourceSnapshot: v35
      };
      v84("正在保存主题，收到成功回执后才会应用。");
      v109(v307);
    }
    function v101(v311, v312) {
      if (v21 || v76()) {
        return;
      }
      const v313 = v12().find(v315 => v315.id === v312);
      if (!v313) {
        return;
      }
      v87(v311);
      const v314 = v68(v313.pack, v13(v313));
      if (!v314.ok) {
        v84("预设主题暂时不可用，原主题未改变。", "bad");
        return;
      }
      v84("正在应用预设风格。");
      v109({
        ...v99(v311, "preset"),
        compiled: v314
      });
    }
    function v102(v316) {
      v87(v316);
      const v317 = v65();
      const v318 = v61("");
      if (v317 || v318) {
        v62();
      }
      v316.confirmId = "";
      if (v21) {
        const v320 = "已恢复默认，但本次恢复未保存：主题库暂时不可写。原数据未被覆盖，请重启或刷新后重试。";
        v43++;
        v84(v320, "bad");
        v61(v320, "bad");
        v62();
        return;
      }
      const v319 = v99(v316, "reset");
      v84("已立即恢复默认，正在保存本次恢复。");
      for (let v321 = v48.length - 1; v321 >= 0; v321--) {
        if (v48[v321].kind === "reset") {
          v48.splice(v321, 1);
        }
      }
      v47 = v319;
      v109(v319);
    }
    function v103(v322, v323) {
      if (v21 || v76() || v322.confirmId !== v323 || !v10(v323)) {
        return;
      }
      const v324 = v23.packs.findIndex(v325 => v325?.id === v323);
      if (v324 < 0 || v56.has(v324)) {
        return;
      }
      v84("正在保存删除操作，成功前保留原主题。");
      v109({
        ...v99(v322, "delete"),
        removeId: v323
      });
    }
    function v104(v326, v327, v328) {
      const v329 = v328 === undefined ? v22 : JSON.stringify(v23.packs[v328], null, 2);
      if (typeof v329 !== "string") {
        v84("暂时没有可读取的原文，请刷新后重试。", "bad");
        return;
      }
      if (v78(v326, v327)) {
        v326.rescueText = v329;
        v326.rescueOpen = true;
      }
      const v330 = v326.root?.querySelector("[data-dashboard-theme-rescue]");
      const v331 = v326.root?.querySelector("[data-dashboard-theme-rescue-text]");
      if (v330 && v331 && v78(v326, v327)) {
        v330.hidden = false;
        v331.value = v329;
      }
      try {
        const v332 = v3.copy(v329, v1.phone(), v328 === undefined ? "主题原库救援" : "主题原稿救援");
        Promise.resolve(v332).catch(() => {});
      } catch {}
    }
    function v105(v333, v334) {
      if (v21 || v76() || v333.confirmBad !== v334 || !v56.has(v334) || v333.confirmText !== v22) {
        return;
      }
      v84("正在保存移除操作，成功前保留坏包原稿。");
      v109({
        ...v99(v333, "delete"),
        removeIndex: v334,
        confirmedText: v22,
        removeId: v23.packs[v334]?.id
      });
    }
    function v106() {
      if (v21) {
        return false;
      }
      try {
        const v335 = v73();
        if (v335 !== v22) {
          const v336 = v70(v335);
          v22 = v335;
          v71(v336);
        }
        return true;
      } catch {
        v74("主题库暂时无法读取或已损坏，已使用默认布局。原数据已保留，本次操作不会覆盖它。");
        v62();
        return false;
      }
    }
    function v107(v337) {
      if (v337.kind === "reset") {
        return {
          library: {
            ...v23,
            activeId: ""
          },
          compiled: null
        };
      }
      if (v337.kind === "preset") {
        return {
          library: {
            ...v23,
            activeId: v337.compiled.id
          },
          compiled: v337.compiled
        };
      }
      if (v337.kind === "delete") {
        if (v337.removeIndex !== undefined && v337.confirmedText !== v22) {
          return {
            error: "原库已经变化，请重新检查并确认要移除的坏包。"
          };
        }
        const v346 = v23.packs.filter((v347, v348) => v337.removeIndex !== undefined ? v348 !== v337.removeIndex : v347?.id !== v337.removeId);
        return {
          library: {
            schemaVersion: 1,
            activeId: !v14(v23.activeId) && v23.activeId === v337.removeId && !v346.some(v349 => v349?.id === v337.removeId) ? "" : v23.activeId,
            packs: v346
          },
          compiled: null
        };
      }
      let v338 = v337.compiled.id;
      const v339 = v337.sourceId && v23.packs.find(v350 => v350?.id === v337.sourceId);
      if (v337.sourceId) {
        const v351 = v339 && v72(v337.sourceId);
        if (!v351 || JSON.stringify(v339) !== v337.sourceSnapshot) {
          return {
            error: "来源主题已变化或未通过安全校验，未覆盖原稿。请重新载入确认，或改名另存；当前草稿仍保留。"
          };
        }
      }
      const v340 = JSON.stringify(v337.compiled.pack);
      const v341 = v23.packs.find((v352, v353) => !v56.has(v353) && JSON.stringify(v352?.pack) === v340);
      if (v339) {
        v338 = v339.id;
      } else if (v341) {
        v338 = v341.id;
      } else if (v23.packs.some(v354 => v354?.id === v338)) {
        v338 = v98();
      }
      const v342 = v338 === v337.compiled.id ? v337.compiled : v68(v337.compiled.pack, v338);
      if (!v342?.ok) {
        return {
          error: v97(v342)
        };
      }
      const v343 = v23.packs.some(v355 => v355?.id === v338);
      if (!v343 && v23.packs.length >= v9.maxPacks) {
        return {
          error: "已经保存 8 套主题，请先删除一套再应用。草稿仍保留。"
        };
      }
      const v344 = {
        id: v338,
        pack: v342.pack,
        at: Math.max(0, Date.now())
      };
      const v345 = v343 ? v23.packs.map(v356 => v356?.id === v338 ? v344 : v356) : [...v23.packs, v344];
      return {
        library: {
          schemaVersion: 1,
          activeId: v338,
          packs: v345
        },
        compiled: v342
      };
    }
    async function v108(v357, v358) {
      try {
        if (v73() !== v358) {
          return false;
        }
        if (typeof v4.commitAsync === "function") {
          return (await v4.commitAsync({
            puts: {
              [v6]: v357
            }
          })) === true;
        }
        return typeof v4.set === "function" && v4.set(v6, v357) === true;
      } catch {
        return false;
      }
    }
    function v109(v359) {
      v48.push(v359);
      v86();
      v111();
    }
    function v110(v360, v361) {
      if (!v79(v360)) {
        return;
      }
      v81(v360, v361, "bad");
      if (v360.kind === "reset" || !v42 && v360.session === v41) {
        v61(v361, "bad");
        v62();
      }
    }
    async function v111() {
      if (v46) {
        return;
      }
      v46 = true;
      try {
        while (v48.length) {
          const v362 = v48.shift();
          v45 = v362;
          try {
            if (v362.intent !== v43) {
              continue;
            }
            if (!v106()) {
              v110(v362, v362.kind === "reset" ? "已恢复默认，但本次恢复未保存；主题库暂时不可写，原数据已保留。" : "主题库暂时不可写，本次操作未保存。原数据与草稿已保留。");
              continue;
            }
            const v363 = v107(v362);
            if (v363.error) {
              v110(v362, v363.error);
              continue;
            }
            const v364 = JSON.stringify(v363.library);
            if (v59(v364) > v9.maxLibraryBytes) {
              v110(v362, "主题库超过 512 KiB，本次操作未保存。请先删除一套主题，草稿已保留。");
              continue;
            }
            const v365 = await v108(v364, v22);
            if (!v365) {
              v110(v362, v362.kind === "reset" ? "已恢复默认，但本次恢复未保存。重新打开 App 时可能仍使用原主题，请稍后重试。" : "保存失败，本次操作未保存。原主题与输入已保留，请稍后重试。");
              continue;
            }
            const v366 = new Map(v24);
            const v367 = new Map();
            v363.library.packs.forEach((v368, v369) => {
              const v370 = v23.packs.indexOf(v368);
              if (v370 >= 0 && v56.has(v370)) {
                v367.set(v369, v56.get(v370));
              }
            });
            if (v363.compiled) {
              v366.set(v363.compiled.id, v363.compiled);
            }
            for (const v371 of v366.keys()) {
              if (!v363.library.packs.some(v372 => v372?.id === v371) && v371 !== v363.library.activeId) {
                v366.delete(v371);
              }
            }
            v71({
              library: v363.library,
              compiled: v366,
              faults: v367
            });
            v22 = v364;
            if (v25 && !v14(v25.id) && !v23.packs.some(v373 => v373?.id === v25.id)) {
              v65();
              v61("");
              v62();
            }
            if (!v79(v362)) {
              continue;
            }
            if (v362.kind === "apply" || v362.kind === "preset") {
              if (v362.session !== v41 || v362.draftVersion !== v33) {
                continue;
              }
              if (v362.kind === "apply") {
                v34 = v363.compiled.id;
                v35 = JSON.stringify(v23.packs.find(v374 => v374?.id === v34));
              }
              if (v67(v363.compiled)) {
                if (v362.kind === "preset") {
                  v32 = v11().serialize(v363.compiled.pack);
                  v34 = "";
                  v33++;
                  v362.draftVersion = v33;
                  const v375 = v42?.root?.querySelector("#dashboard-theme-code");
                  if (v375) {
                    v375.value = v32;
                  }
                }
                v81(v362, v362.kind === "preset" ? "预设风格已应用，可以继续编辑主题文本。" : "主题已保存并应用。草稿仍可继续编辑。");
                v62();
              } else {
                v81(v362, "主题已保存，但本次无法显示，已使用默认布局。", "bad");
              }
            } else if (v362.kind === "reset") {
              v61("");
              v81(v362, "已恢复默认并保存。已保存的主题仍保留。");
            } else {
              if (v80(v362)) {
                if (v34 === v362.removeId) {
                  v34 = "";
                }
                v42.confirmId = "";
                v42.confirmBad = null;
              }
              v81(v362, "主题已删除，其他主题与草稿未改变。");
            }
            if (v80(v362)) {
              v90(v42);
            }
          } catch {
            v110(v362, v362.kind === "reset" ? "已恢复默认，但本次恢复未保存，请稍后重试。" : "本次操作未保存，原主题与输入已保留，请稍后重试。");
          } finally {
            if (v47 === v362) {
              v47 = null;
            }
            v45 = null;
            v86();
          }
        }
      } finally {
        v46 = false;
        v45 = null;
        v86();
      }
    }
    function v112() {
      let v376;
      try {
        v376 = v1.resolvedTheme?.();
      } catch {}
      v376 = v376 || (typeof document === "undefined" ? "" : document.documentElement?.dataset?.theme);
      if (v376 === "light") {
        return "light";
      } else {
        return "dark";
      }
    }
    function v113(v377, v378) {
      const v379 = new Set();
      const v380 = new Set();
      const v381 = v384 => (v384 || []).forEach(v385 => {
        if (v385.widget) {
          v380.add(v385.widget);
        } else {
          v381(v385.children);
        }
      });
      v381(v25?.tree);
      const v382 = v380.size ? [...v380].map(v386 => Object.getOwnPropertyDescriptor(v377 || {}, v386)?.value) : [v378, ...Object.values(v377 || {})];
      const v383 = v382.filter(v387 => typeof v387 === "string").join("");
      for (const v388 of v383.matchAll(/\bdata-dashboard-critical\s*=\s*["']([a-z0-9_-]+)["']/g)) {
        v379.add(v388[1]);
      }
      return [...v379].sort();
    }
    function v114(v389, v390) {
      v75();
      const v391 = typeof v390 === "string" ? v390 : "";
      let v392 = v391;
      let v393 = "";
      if (v25) {
        try {
          v392 = v11().render(v25, v389 || {});
          if (typeof v392 !== "string") {
            throw new Error("render");
          }
          v393 = v25.id;
          v28++;
          v50 = v113(v389, v391);
        } catch {
          v66("自定义仪表盘显示异常，已恢复默认布局。主题包未删除，可修改后重新应用。");
          v392 = v391;
        }
      }
      return "<div class=\"dashboard\" data-mode=\"" + v5(v112()) + "\"" + (v393 ? " data-dashboard-theme=\"" + v5(v393) + "\"" : " data-dashboard-default") + ">" + v392 + "</div>";
    }
    function v115() {
      if (v30) {
        return "<div class=\"note " + v31 + "\" data-dashboard-theme-notice>" + v3.icon(v31 === "bad" ? "alert" : "info", 18) + "<div>" + v5(v30) + "</div></div>";
      } else {
        return "";
      }
    }
    function v116() {
      const v394 = typeof document === "undefined" ? null : document;
      const v395 = v1.scroll?.() || v394;
      return Array.from(v395?.querySelectorAll?.(".dashboard") || []);
    }
    function v117() {
      const v396 = v112();
      let v397 = false;
      for (const v398 of v116()) {
        if (v398.getAttribute("data-mode") !== v396) {
          v398.setAttribute("data-mode", v396);
          v397 = true;
        }
      }
      if (v397 && v25) {
        v123();
      }
    }
    function v118() {
      const v399 = typeof document === "undefined" ? null : document;
      const v400 = typeof window.getComputedStyle === "function" ? window.getComputedStyle.bind(window) : typeof getComputedStyle === "function" ? getComputedStyle : null;
      if (!v400 || !v399?.defaultView || typeof v399.elementFromPoint !== "function" || typeof v399.createRange !== "function" || typeof v399.createRange().getClientRects !== "function" || v399.hidden || !(v399.documentElement?.clientWidth > 0) || !(v399.documentElement?.clientHeight > 0)) {
        return null;
      }
      return v400;
    }
    function v119() {
      return v25 && v116().find(v401 => v401.getAttribute("data-dashboard-theme") === v25.id);
    }
    function v120(v402, v403) {
      const v404 = document.documentElement;
      const v405 = v403.map(v406 => v406.getAttribute("data-dashboard-critical")).sort();
      return [v27, v28, v402.getAttribute("data-mode"), v404.clientWidth, v404.clientHeight, v50.join(","), v405.join(",")].join("|");
    }
    function v121(v407, v408, v409, v410) {
      const v411 = v408.ownerDocument;
      const v412 = v411.createRange();
      const v413 = [v407];
      let v414 = 0;
      let v415 = 0;
      while (v413.length && v414++ < 256 && v415 < 64) {
        const v416 = v413.pop();
        if (v416.nodeType === 1) {
          if (v416.getAttribute("aria-hidden") === "true" || v416.localName === "svg") {
            continue;
          }
          v413.push(...Array.from(v416.childNodes).reverse());
          continue;
        }
        if (v416.nodeType !== 3 || !v416.textContent.trim()) {
          continue;
        }
        v412.selectNodeContents(v416);
        const v417 = Array.from(v412.getClientRects()).slice(0, 8);
        for (const v418 of v417) {
          if (v415 >= 64) {
            break;
          }
          if (v418.width <= 0 || v418.height <= 0) {
            continue;
          }
          let v419 = Math.max(v418.left, v410.left);
          let v420 = Math.min(v418.right, v410.right);
          let v421 = Math.max(v418.top, v410.top);
          let v422 = Math.min(v418.bottom, v410.bottom);
          let v423 = 1;
          for (let v428 = v416.parentElement; v428 && v428 !== v407; v428 = v428.parentElement) {
            const v429 = v409(v428);
            if (v428.hidden || v429.display === "none" || /^(hidden|collapse)$/.test(v429.visibility)) {
              return false;
            }
            const v430 = Number.parseFloat(v429.opacity);
            if (Number.isFinite(v430)) {
              v423 *= v430;
            }
            if (v423 < 0.05) {
              return false;
            }
            if (/^(hidden|clip)$/.test(v429.overflowX || v429.overflow) || /^(hidden|clip)$/.test(v429.overflowY || v429.overflow)) {
              const v431 = v428.getBoundingClientRect();
              if (/^(hidden|clip)$/.test(v429.overflowX || v429.overflow)) {
                v419 = Math.max(v419, v431.left);
                v420 = Math.min(v420, v431.right);
              }
              if (/^(hidden|clip)$/.test(v429.overflowY || v429.overflow)) {
                v421 = Math.max(v421, v431.top);
                v422 = Math.min(v422, v431.bottom);
              }
            }
          }
          const v424 = (v418.left + v418.right) / 2;
          const v425 = (v418.top + v418.bottom) / 2;
          if (v424 < v419 || v424 > v420 || v425 < v421 || v425 > v422) {
            return false;
          }
          if (v424 < 0 || v424 >= v411.documentElement.clientWidth || v425 < 0 || v425 >= v411.documentElement.clientHeight) {
            continue;
          }
          v415++;
          const v426 = v411.elementFromPoint(v424, v425);
          const v427 = v416.parentElement;
          if (v426 && v408.contains(v426) && v426 !== v427 && !v427.contains(v426) && !v426.contains(v427)) {
            return false;
          }
        }
      }
      return true;
    }
    function v122(v432, v433, v434) {
      const v435 = v432.getBoundingClientRect?.();
      const v436 = v433.getBoundingClientRect?.();
      if (!v435 || !v436 || v435.width < 1 || v435.height < 1 || v436.width < 1 || v436.height < 1) {
        return false;
      }
      let v437 = Math.max(v435.left, v436.left);
      let v438 = Math.min(v435.right, v436.right);
      let v439 = Math.max(v435.top, v436.top);
      let v440 = Math.min(v435.bottom, v436.bottom);
      let v441 = 1;
      for (let v450 = v432; v450; v450 = v450.parentElement) {
        const v451 = v434(v450);
        if (v450.hidden || v450.getAttribute?.("aria-hidden") === "true" || v451.display === "none" || v451.visibility === "hidden" || v451.visibility === "collapse") {
          return false;
        }
        const v452 = Number.parseFloat(v451.opacity);
        if (Number.isFinite(v452)) {
          v441 *= v452;
        }
        if (v441 < 0.05) {
          return false;
        }
        if (v450 !== v432) {
          const v453 = /^(hidden|clip)$/.test(v451.overflowX || v451.overflow);
          const v454 = /^(hidden|clip)$/.test(v451.overflowY || v451.overflow);
          if (v453 || v454) {
            const v455 = v450.getBoundingClientRect?.();
            if (v455) {
              if (v453) {
                v437 = Math.max(v437, v455.left);
                v438 = Math.min(v438, v455.right);
              }
              if (v454) {
                v439 = Math.max(v439, v455.top);
                v440 = Math.min(v440, v455.bottom);
              }
            }
          }
        }
        if (v450 === v433) {
          break;
        }
      }
      if (v438 - v437 < 1 || v440 - v439 < 1) {
        return false;
      }
      const v442 = v433.ownerDocument;
      const v443 = Math.max(v437, 0);
      const v444 = Math.min(v438, v442.documentElement.clientWidth);
      const v445 = Math.max(v439, 0);
      const v446 = Math.min(v440, v442.documentElement.clientHeight);
      if (v444 - v443 < 1 || v446 - v445 < 1) {
        return true;
      }
      const v447 = [[0.5, 0.5], [0.2, 0.2], [0.8, 0.2], [0.2, 0.8], [0.8, 0.8]];
      let v448 = 0;
      let v449 = 0;
      for (const [v456, v457] of v447) {
        const v458 = v442.elementFromPoint(v443 + (v444 - v443) * v456, v445 + (v446 - v445) * v457);
        if (!v458 || !v433.contains(v458)) {
          continue;
        }
        if (v432 === v458 || v432.contains(v458) || v458.contains(v432)) {
          v448++;
        } else {
          v449++;
        }
      }
      return (v448 > 0 && v448 >= v449 || v449 === 0) && v121(v432, v433, v434, {
        left: v437,
        right: v438,
        top: v439,
        bottom: v440
      });
    }
    function v123() {
      const v459 = v118();
      const v460 = v119();
      if (!v459 || !v460 || !v50.length) {
        return;
      }
      const v461 = Array.from(v460.querySelectorAll("[data-dashboard-critical]"));
      const v462 = new Set(v461.map(v465 => v465.getAttribute("data-dashboard-critical")));
      if (v50.some(v466 => !v462.has(v466))) {
        v66("自定义仪表盘缺少重要状态或操作，已恢复默认布局。主题仍已保存，请修改后重新应用。");
        return;
      }
      const v463 = v120(v460, v461);
      if (v51 === v460 && v53 === v463 && v461.length === v52.length && v461.every((v467, v468) => v467 === v52[v468]) || v55?.root === v460 && v55.signature === v463) {
        return;
      }
      if (v54 !== null) {
        clearTimeout(v54);
      }
      const v464 = v27;
      v55 = {
        root: v460,
        signature: v463
      };
      v54 = setTimeout(() => {
        v54 = null;
        v55 = null;
        if (!v25 || v27 !== v464 || v460.isConnected === false || v119() !== v460) {
          return;
        }
        const v469 = v118();
        if (!v469) {
          return;
        }
        const v470 = Array.from(v460.querySelectorAll("[data-dashboard-critical]"));
        if (v120(v460, v470) !== v463) {
          v123();
          return;
        }
        try {
          if (v470.some(v471 => !v122(v471, v460, v469))) {
            v66("自定义仪表盘遮住了重要状态或操作，已恢复默认布局。主题仍已保存，请修改后重新应用。");
          } else {
            v53 = v463;
            v51 = v460;
            v52 = v470;
          }
        } catch {}
      }, 900);
    }
    function v124(v472) {
      v75();
      const v473 = v474 => (v474 || []).some(v475 => v475.widget === v472 || v473(v475.children));
      return !!v25 && v473(v25.tree);
    }
    v1.dashboardTheme = {
      init: v75,
      open: v91,
      render: v114,
      notice: v115,
      usesWidget: v124,
      revision: () => String(v26).padStart(9, "0"),
      syncMode: v117,
      afterRender: v123
    };
  })();
  (() => {
    const v476 = window.APP;
    const v477 = v476.state;
    const v478 = v476.$;
    const v479 = v476.phone;
    const v480 = v476.scroll;
    const v481 = window.MODEL;
    const v482 = window.UI;
    const v483 = window.ZEEHO_THEME;
    const v484 = v481.esc;
    const v485 = window.API;
    const v486 = window.CHG;
    const v487 = window.TASKS;
    const v488 = {
      month: "",
      day: null,
      trip: null,
      view: "month",
      cache: {},
      trips: {},
      pending: {},
      failed: {},
      year: null,
      refreshDay: "",
      showZero: false,
      folds: {}
    };
    function v489(v530, {
      force: v531
    } = {}) {
      const v532 = v488.cache[v530];
      if (v532?.promise) {
        return v532.promise;
      }
      if (!v531 && v532?.ready && !v532.error) {
        return Promise.resolve(v532);
      }
      const v533 = v476.context();
      const v534 = {
        ...(v532?.ready ? v532 : {}),
        loading: true,
        error: ""
      };
      v488.cache[v530] = v534;
      const v535 = {
        isLatest: () => v476.current(v533) && v488.cache[v530] === v534
      };
      v534.promise = (async () => {
        try {
          const [v536, v537] = await Promise.all([v485.call("ride_month", {
            vin: v533.vin,
            month: v530
          }, v535), v485.call("analyse", {
            vin: v533.vin,
            month: v530
          }, v535)]);
          if (!v535.isLatest()) {
            return null;
          }
          if (!v536.ok) {
            throw new Error(v536.message || "本月记录取不到");
          }
          v534.ready = true;
          v534.model = v481.rideRecords(v536, v537);
          if (!v537.ok) {
            v534.error = "骑行记录已更新，部分分析暂时取不到";
          }
        } catch (v538) {
          if (v535.isLatest()) {
            v534.ready = true;
            v534.error = v538.message || "本月记录取不到";
          }
        } finally {
          if (v535.isLatest()) {
            v534.loading = false;
            delete v534.promise;
          }
        }
        if (v535.isLatest()) {
          return v534;
        } else {
          return null;
        }
      })();
      return v534.promise;
    }
    function v490(v539, v540 = v476.context(), v541 = v482.currentSheet("ride")) {
      return v539.then(() => {
        if (v476.current(v540) && v482.sheetAlive(v541) && !v488.day && !v488.trip) {
          v511();
        }
      });
    }
    function v491({
      force: v542
    } = {}) {
      if (v488.view === "year") {
        return v494({
          force: v542
        });
      } else {
        return v489(v488.month || v477.month, {
          force: v542
        });
      }
    }
    function v492(v543) {
      v488.month = v543 || v477.month;
      v488.day = null;
      v488.trip = null;
      v488.refreshDay = "";
      v511();
      const v544 = v488.view === "year" || v488.month === v477.month;
      v490(v491({
        force: v544
      }));
    }
    function v493(v545 = new Date()) {
      const v546 = new Date(v545.getFullYear(), v545.getMonth(), v545.getDate());
      const v547 = new Date(v546);
      v547.setDate(v547.getDate() - 364);
      const v548 = v550 => v550.getFullYear() + "." + String(v550.getMonth() + 1).padStart(2, "0") + "." + String(v550.getDate()).padStart(2, "0");
      const v549 = [];
      for (let v551 = new Date(v547.getFullYear(), v547.getMonth(), 1); v551 <= v546; v551.setMonth(v551.getMonth() + 1)) {
        v549.push(v548(v551).slice(0, 7));
      }
      return {
        start: v548(v547),
        end: v548(v546),
        months: v549
      };
    }
    function v494({
      force: v552
    } = {}) {
      const v553 = v493();
      if (v488.year?.promise) {
        return v488.year.promise;
      }
      if (!v552 && v488.year?.ready && !v488.year.error && v488.year.end === v553.end) {
        return Promise.resolve(v488.year);
      }
      const v554 = v488.year?.ok ? v488.year : null;
      const v555 = {
        ...(v554 || {}),
        loading: true,
        error: ""
      };
      const v556 = v476.context();
      v488.year = v555;
      const v557 = () => v476.current(v556) && v488.year === v555;
      v555.promise = (async () => {
        try {
          const v558 = await Promise.all(v553.months.map(v562 => v485.call("ride_month", {
            vin: v556.vin,
            month: v562
          }, {
            isLatest: v557
          })));
          if (!v557()) {
            return null;
          }
          if (v558.some(v563 => !v563.ok || !Array.isArray(v563.data?.rideRecordList))) {
            throw new Error("部分月份取不到，全年统计未更新");
          }
          const v559 = {};
          const v560 = [];
          let v561 = 0;
          v558.forEach((v564, v565) => {
            let v566 = 0;
            for (const v567 of v564.data.rideRecordList) {
              if (v567.date < v553.start || v567.date > v553.end) {
                continue;
              }
              const v568 = Number(v567.rideMileage);
              if (!Number.isFinite(v568) || v568 < 0) {
                continue;
              }
              v566 += v568;
              if (v568 > 0) {
                v559[v567.date] = v568;
              }
            }
            v561 += v566;
            v560.push({
              month: v553.months[v565],
              mile: v566
            });
          });
          Object.assign(v555, {
            ready: true,
            days: v559,
            per: v560,
            total: v561,
            ok: true,
            start: v553.start,
            end: v553.end
          });
        } catch (v569) {
          if (v557()) {
            Object.assign(v555, {
              ready: true,
              ok: !!v554,
              error: v569.message || "近一年记录取不到"
            });
          }
        } finally {
          if (v557()) {
            v555.loading = false;
            delete v555.promise;
          }
        }
        if (v557()) {
          return v555;
        } else {
          return null;
        }
      })();
      return v555.promise;
    }
    function v495() {
      const v570 = (v571, v572) => "<button class=\"ride-control" + (v488.view === v571 ? " ride-selected" : "") + "\" data-act=\"rideview\" data-v=\"" + v571 + "\" aria-pressed=\"" + (v488.view === v571) + "\">" + v572 + "</button>";
      return "<div class=\"ride-switch\" aria-label=\"骑行统计范围\">" + v570("month", "按月") + v570("year", "近一年") + "</div>";
    }
    const v496 = v573 => typeof v573 === "number" && Number.isFinite(v573) ? Number(v573.toFixed(1)) : v573 ?? "—";
    function v497(v574, v575, ...v576) {
      return v476.tile(v574, v496(v575), ...v576).replace("class=\"tile\"", "class=\"tile ride-metric\"");
    }
    function v498() {
      v479().querySelectorAll(".ride-fold[data-ride-fold]").forEach(v577 => {
        v488.folds[v577.dataset.rideFold] = v577.open;
      });
    }
    function v499(v578, v579, v580) {
      return "<details class=\"ride-fold\" data-ride-fold=\"" + v484(v578) + "\"" + (v488.folds[v578] ? " open" : "") + "><summary>" + v484(v579) + "</summary><div class=\"ride-fold-body\">" + v580 + "</div></details>";
    }
    function v500() {
      return (v488.trips[v488.day] || []).find(v581 => v581.id === v488.trip);
    }
    function v501(v582) {
      return v476.mapKey("ride", JSON.stringify([v488.day, v582.id]));
    }
    function v502(v583, v584, v585, v586, v587) {
      if (!v584 && !v587) {
        return "";
      }
      const v588 = v584 || "暂无地址";
      const v589 = "导航到" + v583;
      return "<span class=\"ride-address\"><span>" + v484(v583) + "</span><span data-loc=\"addr\" data-map-key=\"" + v484(v585) + "\" data-real=\"" + v484(v588) + "\">" + (v476.isMapShown(v585) ? v484(v588) : "已打码 · 点轨迹图显示") + "</span>" + (v587 ? "<button type=\"button\" class=\"iconbtn sm\" data-act=\"ridenavigate\" data-map-key=\"" + v484(v585) + "\" data-endpoint=\"" + v586 + "\" title=\"" + v484(v589) + "\" aria-label=\"" + v484(v589) + "\">" + v482.icon("nav", 18) + "</button>" : "") + "</span>";
    }
    function v503() {
      return "<div class=\"ride-toolbar\">" + v495() + "<div class=\"ride-monthactions\"><button class=\"ride-control\" data-act=\"month\" data-v=\"" + v484(v477.month) + "\">本月</button><button class=\"ride-control\" data-act=\"riderefresh\" aria-label=\"刷新骑行记录\">" + v482.icon("refresh", 18) + "</button></div></div>";
    }
    function v504(v590) {
      return "<div class=\"ride-monthbar\">\n      <button class=\"ride-control\" data-act=\"month\" data-v=\"" + v481.monthShift(v590, -1) + "\" aria-label=\"上个月\">" + v482.icon("left", 18) + "</button>\n      <h3 class=\"ride-monthlabel\">" + v484(v481.monthLabel(v590)) + "</h3>\n      <button class=\"ride-control\" data-act=\"month\" data-v=\"" + v481.monthShift(v590, 1) + "\" aria-label=\"下个月\"" + (v590 >= v477.month ? " disabled" : "") + ">" + v482.icon("right", 18) + "</button>\n    </div>";
    }
    const v505 = v591 => String(v591).padStart(2, "0");
    function v506(v592) {
      const v593 = /^(\d{4})\.(\d{2})\.(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/.exec(String(v592 || ""));
      if (v593) {
        return new Date(+v593[1], +v593[2] - 1, +v593[3], +v593[4], +v593[5], +v593[6]);
      } else {
        return null;
      }
    }
    function v507(v594, v595 = false) {
      const v596 = v595 ? [8, 20, 35] : [25, 50, 100];
      if (!(v594 > 0)) {
        return 0;
      } else if (v594 <= v596[0]) {
        return 1;
      } else if (v594 <= v596[1]) {
        return 2;
      } else if (v594 <= v596[2]) {
        return 3;
      } else {
        return 4;
      }
    }
    function v508(v597, v598) {
      const [v599, v600] = v598.split(".").map(Number);
      const v601 = new Date(v599, v600, 0).getDate();
      const v602 = new Map((v597 || []).map(v609 => [v609.date, v609]));
      const v603 = new Date();
      const v604 = v603.getFullYear() + "." + v505(v603.getMonth() + 1) + "." + v505(v603.getDate());
      const v605 = 7;
      const v606 = Math.ceil(v601 / 7);
      const v607 = new Date(v599, v600 - 1, 1).getDay();
      const v608 = [];
      for (let v610 = 0; v610 < v607; v610++) {
        v608.push("<span class=\"ride-contribution-gap\" aria-hidden=\"true\"></span>");
      }
      for (let v611 = 1; v611 <= v601; v611++) {
        const v612 = v598 + "." + v505(v611);
        const v613 = v602.get(v612);
        const v614 = v612 > v604;
        const v615 = v613 ? v613.mile.toFixed(1) + " km" + (v613.mile > 0 ? "" : " · 无骑行") : v614 ? "还没到" : "无回报记录";
        const v616 = v599 + " 年 " + v600 + " 月 " + v611 + " 日 · " + v615 + (v612 === v604 ? " · 今天" : "");
        v608.push("<span class=\"ride-contribution-dot ride-l" + v507(v613?.mile) + (v613 ? "" : " ride-no-report") + (v614 ? " ride-future" : "") + (v612 === v604 ? " ride-today" : "") + "\" title=\"" + v484(v616) + "\" aria-label=\"" + v484(v616) + "\"" + (v612 === v604 ? " aria-current=\"date\"" : "") + "></span>");
      }
      while (v608.length < v606 * v605) {
        v608.push("<span class=\"ride-contribution-gap\" aria-hidden=\"true\"></span>");
      }
      return "<div class=\"ride-contribution\" aria-label=\"" + v484(v481.monthLabel(v598)) + "骑行贡献图\"><div class=\"ride-contribution-caption\"><span>少</span><span class=\"ride-legend\"><i class=\"ride-l1\"></i><i class=\"ride-l2\"></i><i class=\"ride-l3\"></i><i class=\"ride-l4\"></i></span><span>多</span></div><div class=\"ride-contribution-grid\" style=\"--ride-cols:" + v605 + "\">" + v608.join("") + "</div></div>";
    }
    function v509(v617) {
      const v618 = new Array(24).fill(0);
      const v619 = (v620, v621, v622) => {
        const v623 = Math.max(1, v621 - v620);
        const v624 = new Date(v620);
        v624.setHours(0, 0, 0, 0);
        const v625 = v624.getTime();
        const v626 = Math.max(1, Math.ceil((v621 - v625) / 86400000));
        for (let v627 = 0; v627 < v626; v627++) {
          for (let v628 = 0; v628 < 24; v628++) {
            const v629 = v625 + v627 * 86400000 + v628 * 3600000;
            const v630 = Math.min(v629 + 3600000, v621) - Math.max(v629, v620);
            if (v630 > 0) {
              v618[v628] += v622 * (v630 / v623);
            }
          }
        }
      };
      for (const v631 of v617 || []) {
        const v632 = (v631.points || []).filter(v633 => v633.ts && v633.dist);
        if (v632.length >= 2) {
          for (const v634 of v632) {
            v618[new Date(v634.ts).getHours()] += v634.dist / 1000;
          }
        } else if (v631.mile > 0) {
          const v635 = v506(v631.start);
          const v636 = v506(v631.end);
          if (v635 && v636) {
            v619(v635, v636, v631.mile);
          }
        }
      }
      return v618;
    }
    function v510(v637) {
      return "<div class=\"ride-hours\" aria-label=\"24 小时骑行里程\">" + v637.map((v638, v639) => {
        const v640 = v639 + ":00–" + (v639 + 1) + ":00 · " + v638.toFixed(1) + " km" + (v638 > 0 ? "" : " · 无骑行");
        return "<span class=\"ride-hour ride-l" + v507(v638, true) + "\" aria-label=\"" + v484(v640) + "\" title=\"" + v484(v640) + "\"><b>" + v505(v639) + "</b><span>" + (v638 > 0 ? v638.toFixed(1) : "—") + "</span></span>";
      }).join("") + "</div><p class=\"ride-caption\">每格一小时 · km</p>";
    }
    function v511() {
      v519++;
      if (v488.trip) {
        return v527();
      }
      if (v488.day) {
        return v517();
      }
      if (v488.view === "year") {
        return v512();
      }
      v498();
      const v641 = v488.month;
      const v642 = v488.cache[v641];
      let v643;
      if (!v642 || !v642.ready) {
        v643 = "<div class=\"ride-state\" role=\"status\">正在加载本月骑行记录…</div>";
      } else if (!v642.model?.ok) {
        v643 = "<div class=\"ride-state ride-warning\" role=\"status\">这个月取不到：" + v484(v642.error || v642.model?.err || "请重试") + "<button class=\"ride-control\" data-act=\"riderefresh\">重试</button></div>";
      } else {
        const v644 = v642.model;
        const v645 = v488.showZero ? v644.rows : v644.rows.filter(v646 => v646.mile > 0);
        v643 = "<div class=\"ride-month-summary\"><div class=\"ride-hero\">\n          <div class=\"ride-hero-main\">" + v497("本月里程", v644.mile ?? "—", "km", "", "ride-" + v641 + "-mile") + "</div>\n          <div class=\"ride-secondary\">" + v497("骑行天数", v644.activeCount, "天", "", "ride-" + v641 + "-days") + v497("骑行时长", v481.minutesShort(v644.minutes)) + v497("最高车速", v644.maxSpeed ?? "—", "km/h", "", "ride-" + v641 + "-max") + "</div>\n        </div>\n        " + v508(v644.rows, v641) + "</div>\n        <div class=\"ride-section-head\"><h3>每日记录</h3><button class=\"ride-control\" data-act=\"ridezero\" aria-pressed=\"" + v488.showZero + "\">" + (v488.showZero ? "仅骑行日" : "含零里程") + " · " + (v488.showZero ? v644.activeCount : v644.rows.length) + "</button></div>" + (v645.length ? "<div class=\"ride-day-list\">" + v645.map(v515).join("") + "</div>" : "<div class=\"ride-state\">" + (v644.rows.length ? "这个月没有骑行；可切换查看全部回报日期。" : "这个月没有回报记录。") + "</div>");
      }
      if (v642?.error && v642.model?.ok) {
        v643 = "<div class=\"ride-state ride-warning\" role=\"status\">" + v484(v642.error) + "；以下保留上次数据。<button class=\"ride-control\" data-act=\"riderefresh\">重试</button></div>" + v643;
      }
      v482.sheet(v479(), {
        key: "ride",
        title: "骑行记录",
        sub: "",
        full: true,
        body: "<div class=\"ride-page\">" + v503() + v504(v641) + (v642?.loading ? "<p class=\"ride-caption\" role=\"status\">正在更新，已有数据暂时保留…</p>" : "") + v643 + "</div>"
      });
      v476.applyLocMask();
    }
    function v512() {
      v498();
      const v647 = v488.year;
      let v648;
      if (!v647 || !v647.ready) {
        v648 = "<div class=\"ride-state\" role=\"status\">正在加载近一年骑行记录…</div>";
      } else if (!v647.ok) {
        v648 = "<div class=\"ride-state ride-warning\" role=\"status\">近一年的记录取不到。<button class=\"ride-control\" data-act=\"riderefresh\">重试</button></div>";
      } else {
        const v649 = Object.keys(v647.days).length;
        v648 = "<div class=\"ride-hero\">\n          <div class=\"ride-hero-main\">" + v497("近一年里程", v647.total.toFixed(1), "km") + "</div>\n          <div class=\"ride-secondary ride-secondary-two\">" + v497("骑行天数", v649, "天") + v497("骑行日均", v649 ? (v647.total / v649).toFixed(1) : "—", "km") + "</div>\n        </div>\n        <p class=\"ride-caption\">" + v484(v647.start) + " — " + v484(v647.end) + " · 365 天 · 日均按有骑行的天数计算</p>\n        <h3 class=\"ride-section-title\">最近一年每天骑了多少</h3>\n        <div class=\"ride-year-heat\">" + v482.heatmap(v650 => v647.days[v650], {
          start: v647.start,
          end: v647.end
        }) + "</div>\n        " + v513(v647.per);
      }
      if (v647?.error && v647.ok) {
        v648 = "<div class=\"ride-state ride-warning\" role=\"status\">" + v484(v647.error) + "；以下保留上次数据。<button class=\"ride-control\" data-act=\"riderefresh\">重试</button></div>" + v648;
      }
      v482.sheet(v479(), {
        key: "ride",
        title: "骑行记录",
        sub: "",
        full: true,
        onMount: v514,
        body: "<div class=\"ride-page\"><div class=\"ride-toolbar\">" + v495() + "<button class=\"ride-control\" data-act=\"riderefresh\" aria-label=\"刷新骑行记录\">" + v482.icon("refresh", 18) + "</button></div>" + (v647?.loading ? "<p class=\"ride-caption\" role=\"status\">正在更新，已有数据暂时保留…</p>" : "") + v648 + "</div>"
      });
    }
    function v513(v651) {
      const v652 = (Array.isArray(v651) ? v651 : []).filter(v663 => typeof v663?.month === "string" && /^\d{4}\.(0[1-9]|1[0-2])$/.test(v663.month)).map(v664 => ({
        month: v664.month,
        mile: Number.isFinite(Number(v664.mile)) ? Math.max(0, Number(v664.mile)) : 0
      })).sort((v665, v666) => v665.month.localeCompare(v666.month));
      if (!v652.length) {
        return "";
      }
      const v653 = Math.max(1, ...v652.map(v667 => v667.mile));
      const v654 = v653 / 3;
      const v655 = Math.pow(10, Math.floor(Math.log10(v654)));
      const v656 = [1, 2, 5, 10].find(v668 => v668 * v655 >= v654) * v655;
      const v657 = Math.ceil(v653 / v656) * v656;
      const v658 = Number.isFinite(v657) ? v657 : v653;
      const v659 = v669 => v669.toLocaleString("zh-CN", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
      const v660 = Array.from({
        length: Math.ceil(v658 / v656) + 1
      }, (v670, v671) => {
        const v672 = Math.min(1, v671 / (v658 / v656));
        const v673 = v658 * (1 - v672);
        const v674 = Number(v673.toPrecision(10));
        return {
          value: Number.isFinite(v674) ? v674 : v673,
          pos: v672 * 100
        };
      });
      const v661 = v652[v652.length - 1];
      const v662 = [];
      v652.forEach((v675, v676) => {
        const v677 = v675.month.slice(0, 4);
        const v678 = v662[v662.length - 1];
        if (v678?.year === v677) {
          v678.count++;
        } else {
          v662.push({
            year: v677,
            start: v676 + 1,
            count: 1
          });
        }
      });
      return "<section class=\"ride-month-chart\" aria-label=\"每月里程\" style=\"--ride-month-count:" + v652.length + "\">\n      <div class=\"ride-month-head\">\n        <div class=\"ride-month-meta\"><h3>每月里程</h3><span class=\"ride-month-selected\">" + v484(v481.monthLabel(v661.month)) + "</span></div>\n        <div class=\"ride-month-value\"><b>" + v659(v661.mile) + "</b><span>km</span></div>\n      </div>\n      <div class=\"ride-month-body\">\n        <div class=\"ride-month-axis\" aria-hidden=\"true\">" + v660.map(v679 => "<span style=\"top:" + v679.pos.toFixed(3) + "%\">" + v679.value.toLocaleString("zh-CN") + "</span>").join("") + "</div>\n        <div class=\"ride-month-columns\">\n          <div class=\"ride-month-guides\" aria-hidden=\"true\">" + v660.map(v680 => "<i style=\"top:" + v680.pos.toFixed(3) + "%\"></i>").join("") + "</div>\n          <div class=\"ride-ybars\">" + v652.map((v681, v682) => "<button type=\"button\" class=\"ride-ybar" + (v681.mile > 0 ? "" : " ride-ybar-zero") + (v682 === v652.length - 1 ? " ride-ybar-active" : "") + "\"\n              data-act=\"month\" data-v=\"" + v484(v681.month) + "\" data-mile=\"" + v681.mile + "\"\n              aria-label=\"查看 " + v484(v481.monthLabel(v681.month)) + "，" + v659(v681.mile) + " km\" title=\"" + v484(v481.monthLabel(v681.month)) + " · " + v659(v681.mile) + " km\">\n            <span class=\"ride-ybar-track\" aria-hidden=\"true\"><i style=\"height:" + (v681.mile / v658 * 100).toFixed(6) + "%\"></i></span>\n            <span class=\"ride-ybar-mon\" aria-hidden=\"true\">" + Number(v681.month.slice(5)) + "</span>\n          </button>").join("") + "</div>\n          <div class=\"ride-month-years\" aria-hidden=\"true\">" + v662.map(v683 => "<span style=\"grid-column:" + v683.start + " / span " + v683.count + "\">" + v683.year + "</span>").join("") + "</div>\n        </div>\n      </div>\n    </section>";
    }
    function v514(v684 = v479()) {
      const v685 = v684.querySelector(".ride-month-chart");
      if (!v685 || v685.dataset.bound === "1") {
        return;
      }
      const v686 = [...v685.querySelectorAll(".ride-ybar")];
      const v687 = v685.querySelector(".ride-ybars");
      const v688 = v685.querySelector(".ride-month-selected");
      const v689 = v685.querySelector(".ride-month-value b");
      if (!v686.length || !v687 || !v688 || !v689) {
        return;
      }
      v685.dataset.bound = "1";
      let v690 = v686.find(v696 => v696.classList.contains("ride-ybar-active"));
      const v691 = v697 => {
        if (!v697 || v697 === v690) {
          return;
        }
        v690?.classList.remove("ride-ybar-active");
        v697.classList.add("ride-ybar-active");
        v690 = v697;
        v688.textContent = v481.monthLabel(v697.dataset.v);
        v689.textContent = Number(v697.dataset.mile).toLocaleString("zh-CN", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        });
      };
      v686.forEach(v698 => {
        v698.addEventListener("pointerenter", v699 => {
          if (v699.pointerType === "mouse") {
            v691(v698);
          }
        });
        v698.addEventListener("focus", () => v691(v698));
      });
      let v692 = null;
      let v693 = 0;
      const v694 = v700 => {
        const v701 = v687.getBoundingClientRect();
        if (v701.width > 0) {
          v691(v686[Math.max(0, Math.min(v686.length - 1, Math.floor((v700 - v701.left) / v701.width * v686.length)))]);
        }
      };
      v687.addEventListener("pointerdown", v702 => {
        if (v702.isPrimary === false || v702.pointerType === "mouse" && v702.button !== 0) {
          return;
        }
        v692 = {
          id: v702.pointerId,
          x: v702.clientX,
          y: v702.clientY,
          dragged: false
        };
        v694(v702.clientX);
      });
      v687.addEventListener("pointermove", v703 => {
        if (!v692 || v703.pointerId !== v692.id) {
          return;
        }
        const v704 = Math.abs(v703.clientX - v692.x);
        const v705 = Math.abs(v703.clientY - v692.y);
        if (!v692.dragged && v705 > 8 && v705 >= v704) {
          v692 = null;
          return;
        }
        if (!v692.dragged && v704 > 8 && v704 > v705) {
          v692.dragged = true;
          try {
            v687.setPointerCapture(v703.pointerId);
          } catch {}
        }
        if (v692?.dragged) {
          v703.preventDefault();
          v694(v703.clientX);
        }
      });
      const v695 = v706 => {
        if (!v692 || v706.pointerId !== v692.id) {
          return;
        }
        if (v692.dragged) {
          v693 = Date.now() + 300;
          try {
            v687.releasePointerCapture(v706.pointerId);
          } catch {}
        }
        v692 = null;
      };
      v687.addEventListener("pointerup", v695);
      v687.addEventListener("pointercancel", v695);
      v685.addEventListener("click", v707 => {
        if (v707.detail > 0 && Date.now() < v693) {
          v707.preventDefault();
          v707.stopPropagation();
        }
      }, true);
    }
    function v515(v708) {
      return "<button class=\"ride-day-row\" data-act=\"day\" data-date=\"" + v484(v708.date) + "\" aria-label=\"" + v484(v708.date) + " · " + v708.mile.toFixed(1) + " km\">\n      <span class=\"ride-day-info\">\n        <span class=\"ride-day-date\"><b>" + v484(v708.mmdd) + "</b><span>" + v484(v708.wd) + "</span></span>\n        <span class=\"ride-day-meta\"><span>时长 " + v484(v481.minutesShort(v708.minutes)) + "</span><span>最高 " + v484(v496(v708.maxSpeed)) + " km/h</span>" + (v708.mile > 0 ? "" : "<span class=\"ride-day-zero\">无骑行</span>") + "</span>\n      </span>\n      <span class=\"ride-day-mile\"><b>" + v708.mile.toFixed(1) + "</b><span>km</span></span>\n      <span class=\"ride-row-tail\" aria-hidden=\"true\">" + v482.icon("right", 18) + "</span>\n    </button>";
    }
    function v516(v709) {
      const v710 = v714 => (v481.s(v714).split(" ")[1] || "").slice(0, 5);
      const v711 = v710(v709.start);
      const v712 = v710(v709.end);
      const v713 = v711 && v712 ? v711 + "–" + v712 : v711 || "—";
      return "<button class=\"ride-trip-row\" data-act=\"trip\" data-id=\"" + v484(v709.id) + "\">\n      <b class=\"ride-trip-time\">" + v484(v713) + "</b>\n      <span class=\"ride-trip-meta\"><span>" + v484(v481.minutesShort(v709.minutes)) + "</span><span>最高 " + v484(v496(v709.maxSpeed)) + " km/h</span></span>\n      <span class=\"ride-trip-mile\"><b>" + v709.mile.toFixed(1) + "</b> km</span>\n      <span class=\"ride-row-tail\" aria-hidden=\"true\">" + v482.icon("right", 18) + "</span>\n    </button>";
    }
    function v517() {
      v519++;
      v498();
      const v715 = v488.month;
      const v716 = v488.cache[v715]?.model;
      const v717 = v716?.rows.find(v724 => v724.date === v488.day);
      if (!v717) {
        v488.day = null;
        return v511();
      }
      const v718 = v716.mile > 0 ? Math.round(v717.mile / v716.mile * 100) : 0;
      const v719 = v488.trips[v488.day];
      const v720 = v719 && v719.length && v719.every(v725 => v725.green !== null) ? Math.round(v719.reduce((v726, v727) => v726 + v727.green, 0) * 10) / 10 : null;
      let v721;
      if (v717.mile <= 0) {
        v721 = "<div class=\"ride-state\">这天没有骑行。</div>";
      } else if (!v719) {
        v721 = v488.failed[v488.day] ? "<div class=\"ride-state ride-warning\" role=\"status\">这天的分段行程取不到。<button class=\"ride-control\" data-act=\"riderefresh\">重试</button></div>" : "<div class=\"ride-state\" role=\"status\">正在加载分段行程…</div>";
      } else {
        v721 = v719.length ? "<div class=\"ride-trip-list\">" + v719.map(v516).join("") + "</div>" : "<div class=\"ride-state\">这天没有分段行程记录。</div>";
        if (v488.failed[v488.day]) {
          v721 = "<div class=\"ride-state ride-warning\" role=\"status\">更新失败，以下保留上次分段数据。<button class=\"ride-control\" data-act=\"riderefresh\">重试</button></div>" + v721;
        }
      }
      const v722 = v717.mile <= 0 ? "<div class=\"ride-state\">这天没有骑行。</div>" : v719?.length ? v510(v509(v719)) : "<div class=\"ride-state\">" + (v488.failed[v488.day] ? "小时分布暂时取不到，请重试。" : v719 ? "没有分段数据，暂无小时分布。" : "分段行程返回后显示小时分布。") + "</div>";
      v482.sheet(v479(), {
        key: "ride",
        title: v717.mmdd + " " + v717.wd,
        sub: "",
        full: true,
        body: "<div class=\"ride-page\">\n        <div class=\"ride-section-head\"><button class=\"ride-control ride-back\" data-act=\"rideback\">" + v482.icon("left", 16) + "<span>返回 " + v484(v481.monthLabel(v715)) + "</span></button><button class=\"ride-control\" data-act=\"riderefresh\" aria-label=\"刷新当天行程\">" + v482.icon("refresh", 18) + "</button></div>\n        <div class=\"ride-primary-grid\">\n          " + v497("里程", v717.mile, "km", "", "day-" + v488.day + "-mile") + "\n          " + v497("时长", v481.minutesShort(v717.minutes)) + "\n        </div>\n        <div class=\"ride-secondary ride-secondary-two\">\n          " + v497("最高车速", v717.maxSpeed, "km/h", "", "day-" + v488.day + "-max") + "\n          " + v497("行程段数", v717.mile <= 0 ? 0 : v719?.length ?? "—", "段") + "\n        </div>\n        <h3 class=\"ride-section-title\">行程</h3>\n        " + v721 + "\n        " + v499("day-" + v488.day + "-hours", "小时分布", v722) + "\n        " + v499("day-" + v488.day + "-more", "更多统计", "<div class=\"ride-more-grid\">\n          " + v497("占本月", v718, "%", "", "day-" + v488.day + "-share") + "\n          " + v497("急加速", v717.accel, "次", "", "day-" + v488.day + "-accel") + "\n          " + v497("急刹车", v717.brakes, "次", "", "day-" + v488.day + "-brakes") + "\n          " + v497("压弯", v717.bends, "次", "", "day-" + v488.day + "-bends") + "\n          " + v497("碳贡献", v720 ?? "—", "kg", "", "day-" + v488.day + "-green") + "\n        </div>") + "\n        </div>"
      });
      v476.applyLocMask();
      const v723 = v488.day;
      if (v717.mile > 0 && !v488.pending[v723] && !v488.failed[v723] && (v488.refreshDay === v723 || !v488.trips[v723])) {
        const v728 = v476.context();
        const v729 = {};
        const v730 = () => v476.current(v728) && v488.pending[v723] === v729;
        v488.pending[v723] = v729;
        v485.call("ride_track", {
          vin: v728.vin,
          date: v723,
          month: v715
        }, {
          isLatest: v730
        }).then(v731 => {
          if (!v730()) {
            return;
          }
          if (v731?.ok) {
            v488.trips[v723] = v481.trips(v731);
            v488.failed[v723] = false;
          } else {
            v488.failed[v723] = true;
          }
        }).catch(() => {
          if (v730()) {
            v488.failed[v723] = true;
          }
        }).finally(() => {
          if (!v730()) {
            return;
          }
          delete v488.pending[v723];
          if (v488.refreshDay === v723) {
            v488.refreshDay = "";
          }
          if (v482.sheetAlive(v482.currentSheet("ride")) && v488.day === v723 && !v488.trip) {
            v517();
          }
        });
      }
    }
    const v518 = new Map();
    let v519 = 0;
    const v520 = 60000;
    const v521 = 600000;
    const v522 = (v732, v733, v734) => JSON.stringify([v732.source, v732.uid, v732.token, v732.owner?.id, v732.owner?.uid, v732.owner?.token, v732.owner?.credentialRev, v732.vin, new Date(Date.now() + 28800000).toISOString().slice(0, 10), v733, v734]);
    function v523(v735, v736 = v476.context()) {
      const v737 = v481.parseTime(v735?.start);
      const v738 = v481.parseTime(v735?.end);
      if (!v737 || !v738 || v738 <= v737) {
        return [];
      }
      return v518.get(v522(v736, v737.getTime() - v521, v738.getTime() + v521))?.pts || [];
    }
    function v524(v739, v740, v741) {
      if (typeof v476.batterySpanAsync !== "function") {
        return Promise.resolve([]);
      }
      const v742 = v481.parseTime(v739?.start);
      const v743 = v481.parseTime(v739?.end);
      if (!v742 || !v743 || v743 <= v742) {
        return Promise.resolve([]);
      }
      const v744 = v742.getTime() - v521;
      const v745 = v743.getTime() + v521;
      const v746 = v522(v740, v744, v745);
      const v747 = v518.get(v746);
      const v748 = v519;
      const v749 = v488.day;
      const v750 = v488.trip;
      const v751 = v754 => {
        if (v748 === v519 && v476.current(v740) && v488.day === v749 && v488.trip === v750 && v482.currentSheet("ride") === v741 && v482.sheetAlive(v741)) {
          v527({
            asyncRefresh: true
          });
        }
        return v754;
      };
      if (v747?.promise) {
        return v747.promise.then(v755 => v522(v740, v744, v745) === v746 && v518.get(v746) === v747 ? v751(v755) : []);
      }
      if (v747 && Date.now() - v747.at < v520) {
        return Promise.resolve(v747.pts);
      }
      if (v518.size >= 8) {
        v518.delete(v518.keys().next().value);
      }
      const v752 = {
        pts: v747?.pts || [],
        at: 0
      };
      v518.set(v746, v752);
      const v753 = () => v476.current(v740) && v522(v740, v744, v745) === v746 && v518.get(v746) === v752;
      v752.promise = Promise.resolve().then(() => v753() ? v476.batterySpanAsync(v744, v745) : []).then(v756 => {
        if (!v753()) {
          return [];
        }
        v752.pts = (Array.isArray(v756) ? v756 : []).filter(v757 => Array.isArray(v757) && Number.isFinite(v757[0]) && Number.isFinite(v757[1]) && v757[0] >= v744 && v757[0] <= v745 && v757[1] >= 0 && v757[1] <= 100).map(v758 => ({
          t: v758[0],
          soc: v758[1]
        })).sort((v759, v760) => v759.t - v760.t);
        v752.at = Date.now();
        return v752.pts;
      }).catch(() => {
        if (v753()) {
          v752.pts = [];
          v752.at = Date.now();
        }
        return [];
      }).finally(() => {
        delete v752.promise;
      });
      return v752.promise.then(v761 => v753() ? v751(v761) : []);
    }
    function v525(v762, v763, v764, v765) {
      const v766 = (v762 || []).filter(v820 => Number.isFinite(v820.ts) && Number.isFinite(v820.speed)).sort((v821, v822) => v821.ts - v822.ts).map(v823 => ({
        t: v823.ts,
        v: Math.max(0, v823.speed),
        gap: !!v823.gap || !!v823.break
      }));
      const v767 = v766.length ? v766[0].t : 0;
      const v768 = v766.length ? v766[v766.length - 1].t : 0;
      if (v766.length < 2 || v768 <= v767) {
        return "<div class=\"speed-chart\"><div class=\"speed-cap\">速度曲线（km/h）</div>\n        <div class=\"speed-empty\">这一段没有可用的速度采样。</div></div>";
      }
      const v769 = (v765 || []).filter(v824 => Number.isFinite(v824?.t) && Number.isFinite(v824?.soc) && v824.soc >= 0 && v824.soc <= 100).sort((v825, v826) => v825.t - v826.t);
      const v770 = v769.filter(v827 => v827.t < v767).slice(-1)[0];
      const v771 = v769.find(v828 => v828.t > v768);
      const v772 = v769.filter(v829 => v829.t >= v767 && v829.t <= v768);
      const v773 = [...(v772.length && v770 ? [{
        t: v770.t,
        v: v770.soc
      }] : []), ...v772.map(v830 => ({
        t: v830.t,
        v: v830.soc,
        gap: !!v830.gap || !!v830.break
      })), ...(v772.length && v771 ? [{
        t: v771.t,
        v: v771.soc
      }] : [])];
      const v774 = v773.length >= 2 ? v773 : [];
      const v775 = v772.length >= 2 ? v772.map(v831 => ({
        t: v831.t,
        v: v831.soc,
        gap: !!v831.gap || !!v831.break
      })) : [];
      const v776 = v774.length >= 2 && v774.every(v832 => Number.isFinite(v832.v));
      const v777 = v775.length ? v775 : v774;
      const v778 = v777.length ? v777[0].v : 0;
      const v779 = v777.length ? v777[v777.length - 1].v : 0;
      const v780 = 340;
      const v781 = 150;
      const v782 = 34;
      const v783 = 42;
      const v784 = 14;
      const v785 = 24;
      const v786 = v780 - v782 - v783;
      const v787 = v781 - v784 - v785;
      const v788 = Math.max(1, Math.ceil(Math.max(Number(v764) || 0, ...v766.map(v833 => v833.v))));
      const v789 = v834 => v782 + Math.max(0, Math.min(1, (v834 - v767) / (v768 - v767))) * v786;
      const v790 = v835 => v784 + (1 - v835 / v788) * v787;
      const v791 = v836 => v788 < 10 ? v836.toFixed(1) : String(Math.round(v836));
      const v792 = v837 => String(v837).padStart(2, "0");
      const v793 = v768 - v767 < 120000;
      const v794 = v838 => {
        const v839 = new Date(v838);
        if (v793) {
          return v792(v839.getHours()) + ":" + v792(v839.getMinutes()) + ":" + v792(v839.getSeconds());
        } else {
          return v792(v839.getHours()) + ":" + v792(v839.getMinutes());
        }
      };
      const v795 = [0, v788 / 3, v788 * 2 / 3, v788];
      const v796 = v795.map(v840 => "\n      <line class=\"g\" x1=\"" + v782 + "\" y1=\"" + v790(v840).toFixed(1) + "\" x2=\"" + (v780 - v783) + "\" y2=\"" + v790(v840).toFixed(1) + "\"/>\n      <text x=\"" + (v782 - 6) + "\" y=\"" + (v790(v840) + 3.2).toFixed(1) + "\" text-anchor=\"end\">" + v791(v840) + "</text>").join("");
      const v797 = v841 => v784 + (1 - Math.max(0, Math.min(100, v841)) / 100) * v787;
      const v798 = v776 ? [100, 50, 0].map(v842 => "<text class=\"soc-ax\" x=\"" + (v780 - v783 + 6) + "\" y=\"" + (v797(v842) + 3.2).toFixed(1) + "\"\n          text-anchor=\"start\">" + v842 + "%</text>").join("") : "";
      const v799 = (v843, v844, v845) => {
        const v846 = v843.slice(1).map((v852, v853) => v852.t - v843[v853].t).filter(v854 => v854 > 0).sort((v855, v856) => v855 - v856);
        const v847 = v846[Math.floor((v846.length - 1) / 2)] || v844;
        const v848 = Math.max(v844, Math.min(v845, v847 * 3));
        const v849 = [];
        const v850 = [];
        let v851 = [];
        v843.forEach((v857, v858) => {
          const v859 = v843[v858 - 1];
          if (v859 && (v857.gap || v857.t - v859.t > v848)) {
            v849.push(v851);
            v851 = [];
            v850.push([v859.t, v857.t]);
          }
          v851.push(v857);
        });
        if (v851.length) {
          v849.push(v851);
        }
        return {
          groups: v849,
          gaps: v850
        };
      };
      const v800 = v799(v766, 30000, 120000);
      const v801 = v799(v776 ? v774 : [], 90000, 600000);
      const v802 = globalThis.CHARTPATH;
      const v803 = (v860, v861) => v860.map((v862, v863) => "" + (v863 ? "L" : "M") + v789(v862.t).toFixed(1) + " " + v861(v862.v).toFixed(1)).join(" ");
      const v804 = (v864, v865) => v802 ? v802.path(v864, 0, v864.length - 1, v866 => v789(v866.t), v867 => v865(v867.v)) : v803(v864, v865);
      const v805 = v800.groups.map(v868 => v803(v868, v790)).join(" ");
      const v806 = v801.groups.map(v869 => v804(v869, v797)).join(" ");
      const v807 = (v870, v871, v872 = false) => v870.groups.slice(1).map((v873, v874) => {
        const v875 = v870.groups[v874];
        const v876 = [v875[v875.length - 1], v873[0]];
        if (v872) {
          return v804(v876, v871);
        } else {
          return v803(v876, v871);
        }
      }).join(" ");
      const v808 = v807(v800, v790);
      const v809 = v807(v801, v797, true);
      const v810 = (v784 + v787).toFixed(1);
      const v811 = v800.groups.filter(v877 => v877.length >= 2).map(v878 => v803(v878, v790) + " L" + v789(v878[v878.length - 1].t).toFixed(1) + " " + v810 + " L" + v789(v878[0].t).toFixed(1) + " " + v810 + " Z").join(" ");
      const v812 = "sp" + String(v763).replace(/[^A-Za-z0-9_-]/g, "");
      const v813 = (v767 + v768) / 2;
      const v814 = v768 - v767 >= 1200000 ? "<text x=\"" + v789(v813).toFixed(1) + "\" y=\"" + (v781 - 7) + "\" text-anchor=\"middle\">" + v794(v813) + "</text>" : "";
      const v815 = v779 <= v778 ? "行程耗电 " + Math.round(v778 - v779) + "% （" + Math.round(v778) + "%-" + Math.round(v779) + "%）" : "电量 " + Math.round(v778) + "%→" + Math.round(v779) + "%";
      const v816 = v776 ? "<div class=\"speed-legend\">\n          <span class=\"lg lg-speed\">车速</span>\n          <span class=\"lg lg-soc\">" + v815 + "</span>\n        </div>" : "";
      const v817 = v766.map(v879 => ({
        t: v879.t,
        v: v879.v
      }));
      const v818 = v775.map(v880 => ({
        t: v880.t,
        v: v880.v
      }));
      const v819 = v484(JSON.stringify({
        x0: v767,
        x1: v768,
        pts: v817,
        soc: v818,
        vTop: v788,
        gaps: v800.gaps,
        socGaps: v801.gaps
      }));
      return "<div class=\"speed-chart speed-wrap\" data-probe=\"" + v819 + "\"\n        data-vb=\"" + v780 + " " + v781 + "\" data-box=\"" + v782 + " " + v784 + " " + v786 + " " + v787 + "\">\n      <div class=\"speed-cap\">速度曲线（km/h）" + (v776 ? " · 电量（%）" : "") + "</div>\n      <svg class=\"speed-svg\" viewBox=\"0 0 " + v780 + " " + v781 + "\" role=\"img\"\n        aria-label=\"这一段的速度曲线" + (v776 ? "，叠加同时间轴的电量曲线" : "") + "\">\n        <defs>\n          <linearGradient id=\"" + v812 + "l\" x1=\"0\" y1=\"" + (v784 + v787) + "\" x2=\"0\" y2=\"" + v784 + "\" gradientUnits=\"userSpaceOnUse\">\n            <stop offset=\"0\" style=\"stop-color:var(--c-success)\"/>\n            <stop offset=\".55\" style=\"stop-color:var(--c-success)\"/>\n            <stop offset=\"1\" style=\"stop-color:var(--c-warning)\"/>\n          </linearGradient>\n          <linearGradient id=\"" + v812 + "f\" x1=\"0\" y1=\"" + v784 + "\" x2=\"0\" y2=\"" + (v784 + v787) + "\" gradientUnits=\"userSpaceOnUse\">\n            <stop offset=\"0\" style=\"stop-color:var(--c-warning);stop-opacity:.20\"/>\n            <stop offset=\".55\" style=\"stop-color:var(--c-success);stop-opacity:.13\"/>\n            <stop offset=\"1\" style=\"stop-color:var(--c-success);stop-opacity:.03\"/>\n          </linearGradient>\n        </defs>\n        " + v796 + "\n        " + v798 + "\n        <path class=\"area\" d=\"" + v811 + "\" fill=\"url(#" + v812 + "f)\"/>\n        <path class=\"line\" d=\"" + v805 + "\" stroke=\"url(#" + v812 + "l)\"/>\n        " + (v808 ? "<path class=\"gap-line\" d=\"" + v808 + "\" stroke=\"url(#" + v812 + "l)\"/>" : "") + "\n        " + (v806 ? "<path class=\"soc-line\" d=\"" + v806 + "\"/>" : "") + "\n        " + (v809 ? "<path class=\"gap-line\" d=\"" + v809 + "\" stroke=\"var(--c-info)\"/>" : "") + "\n        " + v814 + "\n        <text x=\"" + v782 + "\" y=\"" + (v781 - 7) + "\" text-anchor=\"start\">" + v794(v767) + "</text>\n        <text x=\"" + (v780 - v783) + "\" y=\"" + (v781 - 7) + "\" text-anchor=\"end\">" + v794(v768) + "</text>\n        <line class=\"probe-v\" x1=\"0\" y1=\"" + v784 + "\" x2=\"0\" y2=\"" + (v784 + v787) + "\" style=\"opacity:0\"/>\n        <circle class=\"probe-dot\" r=\"3\" cx=\"0\" cy=\"0\" style=\"opacity:0\"/>\n      </svg>\n      <div class=\"probe-tip\" hidden></div>\n      " + v816 + "\n    </div>";
    }
    function v526(v881 = v479()) {
      const v882 = v881.querySelector(".speed-wrap");
      const v883 = v882 && v882.querySelector("svg");
      if (!v882 || !v883) {
        return;
      }
      let v884 = null;
      try {
        v884 = JSON.parse(v882.dataset.probe || "null");
      } catch {
        v884 = null;
      }
      if (!v884 || !Array.isArray(v884.pts) || v884.pts.length < 2) {
        return;
      }
      const [v885, v886] = String(v882.dataset.vb || "340 150").split(" ").map(Number);
      const [v887, v888, v889, v890] = String(v882.dataset.box || "8 14 290 112").split(" ").map(Number);
      const v891 = v883.querySelector(".probe-v");
      const v892 = v883.querySelector(".probe-dot");
      const v893 = v882.querySelector(".probe-tip");
      if (!v891 || !v892 || !v893) {
        return;
      }
      const {
        x0: v894,
        x1: v895,
        pts: v896,
        soc: v897,
        vTop: v898
      } = v884;
      const v899 = Math.max(1, v895 - v894);
      const v900 = v909 => v887 + (v909 - v894) / v899 * v889;
      const v901 = v910 => v888 + (1 - v910 / Math.max(1, v898)) * v890;
      const v902 = v911 => String(v911).padStart(2, "0");
      const v903 = v912 => {
        const v913 = new Date(v912);
        return v902(v913.getHours()) + ":" + v902(v913.getMinutes()) + ":" + v902(v913.getSeconds());
      };
      const v904 = v914 => String(Number(v914.toFixed(1)));
      const v905 = (v915, v916) => v915.reduce((v917, v918) => !v917 || Math.abs(v918.t - v916) < Math.abs(v917.t - v916) ? v918 : v917, null);
      let v906 = 0;
      const v907 = () => {
        v891.style.opacity = "0";
        v892.style.opacity = "0";
        v893.hidden = true;
      };
      const v908 = v919 => {
        const v920 = v883.getBoundingClientRect();
        if (!v920.width) {
          return;
        }
        const v921 = (v919 - v920.left) / v920.width * v885;
        const v922 = Math.max(0, Math.min(1, (v921 - v887) / Math.max(1, v889)));
        const v923 = v894 + v922 * v899;
        if ((v884.gaps || []).some(([v933, v934]) => v921 > v900(v933) + 0.06 && v921 < v900(v934) - 0.06)) {
          v907();
          return;
        }
        const v924 = v905(v896, v923);
        if (!v924) {
          return;
        }
        const v925 = v900(v924.t);
        const v926 = v901(v924.v);
        v891.setAttribute("x1", v925.toFixed(1));
        v891.setAttribute("x2", v925.toFixed(1));
        v891.style.opacity = "1";
        v892.setAttribute("cx", v925.toFixed(1));
        v892.setAttribute("cy", v926.toFixed(1));
        v892.style.opacity = "1";
        const v927 = ["<span class=\"tip-row\"><i class=\"tip-speed\"></i><b>" + v903(v924.t) + "</b> · 车速 " + v904(v924.v) + " km/h</span>"];
        if (Array.isArray(v897) && v897.length >= 2) {
          const v935 = v905(v897, v924.t);
          const v936 = v924.t < v897[0].t || v924.t > v897[v897.length - 1].t || v921 < v900(v897[0].t) - 0.06 || v921 > v900(v897[v897.length - 1].t) + 0.06 || (v884.socGaps || []).some(([v937, v938]) => v924.t > v937 && v924.t < v938 || v921 > v900(v937) + 0.06 && v921 < v900(v938) - 0.06);
          if (v935 && !v936 && Math.abs(v935.t - v924.t) <= 180000) {
            v927.push("<span class=\"tip-row\"><i class=\"tip-soc\"></i>电量 " + Math.round(v935.v) + "% · " + v903(v935.t) + "</span>");
          } else {
            v927.push("<span class=\"tip-row\"><i class=\"tip-soc\"></i>电量 该时刻无采样</span>");
          }
        }
        v893.hidden = false;
        v893.innerHTML = v927.join("");
        const v928 = v920.left + v925 / v885 * v920.width;
        const v929 = v882.getBoundingClientRect();
        const v930 = v920.left - v929.left + v887 / v885 * v920.width;
        const v931 = v920.left - v929.left + (v887 + v889) / v885 * v920.width;
        v893.style.maxWidth = v931 - v930 + "px";
        const v932 = v893.offsetWidth || 120;
        v893.style.left = Math.max(v930, Math.min(v931 - v932, v928 - v929.left - v932 / 2)) + "px";
        v893.style.top = v920.top - v929.top + v888 / v886 * v920.height + 4 + "px";
      };
      v883.style.touchAction = "pan-y";
      v883.addEventListener("pointerdown", v939 => {
        clearTimeout(v906);
        try {
          v883.setPointerCapture(v939.pointerId);
        } catch {}
        v908(v939.clientX);
      });
      v883.addEventListener("pointermove", v940 => {
        if (v940.buttons || v940.pointerType === "mouse") {
          clearTimeout(v906);
          v908(v940.clientX);
        }
      });
      v883.addEventListener("mousemove", v941 => {
        clearTimeout(v906);
        v908(v941.clientX);
      });
      v883.addEventListener("mouseleave", () => {
        clearTimeout(v906);
        v907();
      });
      v883.addEventListener("pointerup", () => {
        clearTimeout(v906);
        v906 = setTimeout(v907, 1500);
      });
      v883.addEventListener("pointercancel", () => {
        clearTimeout(v906);
        v907();
      });
    }
    function v527({
      asyncRefresh = false
    } = {}) {
      if (!asyncRefresh) {
        v519++;
      }
      v498();
      const v942 = v488.month;
      const v943 = v488.cache[v942]?.model;
      const v944 = v943?.rows.find(v962 => v962.date === v488.day);
      const v945 = v500();
      if (!v945) {
        v488.trip = null;
        return v517();
      }
      const v946 = v963 => v481.s(v963).split(" ")[1] || v481.s(v963);
      const v947 = v964 => v946(v964).slice(0, 5);
      const v948 = v965 => v481.s(v965).split(" ")[0] || "";
      const v949 = v481.s(v945.start);
      const v950 = v481.s(v945.end);
      const v951 = v948(v949) && v948(v949) === v948(v950) ? v947(v949) + "–" + v947(v950) : v949 + " – " + v950;
      const v952 = v945.points || [];
      const v953 = v501(v945);
      const v954 = v482.mapSamples(v952).length > 0;
      const v955 = v945.minutes > 0 ? v945.mile / (v945.minutes / 60) : null;
      const v956 = Math.max(1, Math.min(760, (v479().querySelector(".sheet-body")?.clientWidth || v479().clientWidth || 360) - 40));
      const v957 = v954 ? v482.mapBoxPath(v952, {
        tile: v477.tile,
        mapKey: v953,
        masked: !v476.isMapShown(v953),
        w: v956,
        h: 160
      }) : "<div class=\"note info\">" + v482.icon("info", 18) + "<div>这一段没有轨迹点。</div></div>";
      const v958 = v502("起点", v945.from, v953, "start", v954) + v502("终点", v945.to, v953, "end", v954);
      const v959 = v958 ? "<div class=\"ride-trip-locations\">" + v958 + "</div>" : "";
      const v960 = v476.context();
      const v961 = v482.sheet(v479(), {
        key: "ride",
        title: v951,
        sub: "",
        full: true,
        onMount: v966 => {
          v476.applyLocMask(v953);
          v526(v966);
        },
        body: "<div class=\"ride-page\">\n        <button class=\"ride-control ride-back\" data-act=\"tripback\">" + v482.icon("left", 16) + "<span>返回 " + v484(v944 ? v944.mmdd + " " + v944.wd : v488.day) + "</span></button>\n        <div class=\"ride-primary-grid\">\n          " + v497("里程", v945.mile.toFixed(1), "km") + "\n          " + v497("时长", v481.minutesShort(v945.minutes)) + "\n        </div>\n        <div class=\"ride-secondary ride-secondary-two\">\n          " + v497("最高车速", v945.maxSpeed, "km/h", "", "trip-" + v945.id + "-max") + "\n          " + v497("均速", v955 === null ? "—" : v955.toFixed(1), "km/h") + "\n        </div>\n        <div class=\"ride-section-head ride-track-head\"><h3>轨迹</h3>" + (v954 ? v476.locationEye(v953, "轨迹") : "") + "</div>\n        <div class=\"ride-track\">" + v957 + (v952.length >= 2 ? v525(v952, v945.id, v945.maxSpeed, v523(v945, v960)) : "") + "</div>\n        " + (window.ZeehoShell && (!window.ZeehoShell.beginBatterySpan || !window.ZeehoShell.pollBatterySpan) ? "<p class=\"ride-caption\">电量曲线不可用，请升级 App 壳后查看。</p>" : window.ZeehoShell && v523(v945, v960).length < 2 ? "<p class=\"ride-caption\">这段时间暂无足够的电量采样，电量曲线不可用。</p>" : "") + "\n        " + v959 + "\n        " + v499("trip-" + v945.id + "-more", "更多统计", "<div class=\"ride-more-grid\">\n          " + v497("急加速", v945.accel, "次", "", "trip-" + v945.id + "-accel") + "\n          " + v497("急刹车", v945.brakes, "次", "", "trip-" + v945.id + "-brakes") + "\n          " + v497("压弯", v945.bends, "次", "", "trip-" + v945.id + "-bends") + "\n          " + v497("碳贡献", v945.green ?? "—", "kg", "", "trip-" + v945.id + "-green") + "\n        </div>") + "\n        </div>"
      });
      if (v952.length >= 2) {
        v524(v945, v960, v961);
      }
    }
    function v528() {
      const v967 = v500();
      if (!v967 || !v476.isMapShown(v501(v967)) || !v482.mapSamples(v967.points).length) {
        return;
      }
      const v968 = v476.context();
      const v969 = v488.day;
      v482.sheet(v479(), {
        key: "ridemap",
        title: "轨迹地图",
        sub: "单指拖动 · 双指缩放",
        full: true,
        body: v482.interactiveMap({
          track: true
        }),
        onMount: v970 => {
          if (v476.current(v968) && v488.day === v969 && v488.trip === v967.id) {
            v482.mountMap(v970.querySelector(".interactive-map"), v967.points, {
              track: true
            });
          }
        }
      });
    }
    function v529(v971, v972) {
      const v973 = v500();
      if (!v973 || v972 !== v501(v973) || v971 !== "start" && v971 !== "end") {
        return;
      }
      const v974 = v482.mapSamples(v973.points);
      const v975 = v971 === "start" ? v974[0] : v974[v974.length - 1];
      if (!v975) {
        return;
      }
      return v476.navigationSheet({
        has: true,
        lng: v975.lng,
        lat: v975.lat,
        address: v971 === "start" ? v973.from || "起点" : v973.to || "终点"
      });
    }
    window.APP.ride = {
      RIDE: v488,
      open: v492,
      render: v511,
      renderDay: v517,
      renderTrip: v527,
      openMap: v528,
      navigate: v529,
      ensureMonth: v489,
      ensureYear: v494,
      ensureView: v491,
      refreshRideWhenReady: v490,
      yearRange: v493,
      speedChart: v525,
      tripSoc: v523,
      ensureTripSoc: v524
    };
  })();
  (() => {
    const v976 = window.APP;
    const v977 = v976.state;
    const v978 = v976.$;
    const v979 = v976.phone;
    const v980 = v976.scroll;
    const v981 = window.MODEL;
    const v982 = window.UI;
    const v983 = window.ZEEHO_THEME;
    const v984 = v981.esc;
    const v985 = window.API;
    const v986 = window.CHG;
    const v987 = window.TASKS;
    let v988 = "soc";
    const v989 = ["soc", "w", "v", "a", "temp"];
    const v990 = ["soc", "w"];
    let v991 = new Set(v990);
    function v992(v1033) {
      return v989.map(v1034 => v986.METRICS.find(v1035 => v1035.id === v1034)).filter(v1036 => v1036 && (v1033 || []).some(v1037 => {
        const v1038 = v1037?.[v1036.id];
        return v1038 !== null && v1038 !== undefined && v1038 !== "" && Number.isFinite(Number(v1038));
      }));
    }
    function v993(v1039) {
      const v1040 = v992(v1039);
      v991 = new Set([...v991].filter(v1041 => v1040.some(v1042 => v1042.id === v1041)));
      if (!v991.size && v1040.length) {
        v991.add(v1040[0].id);
      }
      return v1040;
    }
    const v994 = v1043 => v1043 !== null && v1043 !== undefined && v1043 !== "" && Number.isFinite(Number(v1043)) ? Number(v1043) : null;
    function v995(v1044, v1045 = {}) {
      try {
        const v1046 = Object.hasOwn(v1045, "curveRepair") ? v1045.curveRepair : v986.repairPlans?.(v1044);
        const v1047 = v1045.energyRepair;
        const v1048 = v1049 => v1049?.version === 1 && Array.isArray(v1049.repairs);
        if (v1048(v1047)) {
          return {
            version: 1,
            repairs: [...v1047.repairs, ...(v1048(v1046) ? v1046.repairs : [])]
          };
        }
        if (v1048(v1046)) {
          return v1046;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    }
    function v996(v1050, v1051, v1052, v1053) {
      if (!v1053 || v1051.length < 2 || !v1050.length) {
        return [];
      }
      const v1054 = v1050.map(v1061 => v994(v1061.t)).filter(v1062 => v1062 !== null);
      const v1055 = Math.min(...v1054);
      const v1056 = Math.max(...v1054);
      const v1057 = v1051[0].x;
      const v1058 = v1051[v1051.length - 1].x;
      const v1059 = v1063 => {
        const v1064 = v994(v1063?.t);
        const v1065 = v994(v1063?.[v1052]);
        const v1066 = v1051[0].basis === "charged" ? v994(v1063?.cf) : v1064 === null ? null : Math.round((v1064 - v1050[0].t) / 6000) / 10;
        if (v1064 === null || v1065 === null || !Number.isFinite(v1066) || v1064 < v1055 || v1064 > v1056 || v1066 < v1057 || v1066 > v1058) {
          return null;
        }
        if (v1051.some(v1067 => v1067.t === v1064 && (v1067.y !== v1065 || v1067.x !== v1066))) {
          return null;
        }
        return {
          t: v1064,
          x: v1066,
          y: v1065
        };
      };
      const v1060 = [];
      for (const v1068 of v1053.repairs) {
        if (v1068?.method !== "local-linear" || !Array.isArray(v1068.metrics) || !v1068.metrics.includes(v1052)) {
          continue;
        }
        const v1069 = v1059(v1068.start);
        const v1070 = v1059(v1068.end);
        if (!v1069 || !v1070 || v1069.t !== v1068.from || v1070.t !== v1068.to || v1070.t <= v1069.t || v1070.x <= v1069.x) {
          continue;
        }
        if (v1060.some(v1071 => v1069.t < v1071.right.t && v1070.t > v1071.left.t)) {
          continue;
        }
        v1060.push({
          left: v1069,
          right: v1070
        });
      }
      return v1060;
    }
    function v997(v1072, v1073 = []) {
      const v1074 = [];
      v1072.forEach((v1075, v1076) => {
        const v1077 = v1072[v1076 - 1];
        if (!v1077 || !(v1075.x > v1077.x)) {
          return;
        }
        const v1078 = v1073.filter(v1080 => v1077.x < v1080.right.x && v1075.x > v1080.left.x).sort((v1081, v1082) => v1081.left.x - v1082.left.x);
        if (!v1075.gap && v1075.t > v1077.t && !v1078.length) {
          return;
        }
        let v1079 = v1077;
        for (const v1083 of v1078) {
          if (v1083.left.x > v1079.x) {
            v1074.push({
              left: v1079,
              right: v1083.left
            });
          }
          if (v1083.right.x >= v1075.x) {
            v1079 = null;
            break;
          }
          v1079 = v1083.right;
        }
        if (v1079 && v1075.x > v1079.x) {
          v1074.push({
            left: v1079,
            right: v1075
          });
        }
      });
      return v1074;
    }
    function v998(v1084, v1085, v1086, v1087, v1088, v1089 = false) {
      return v1084.map(v1090 => "<path class=\"gap-line" + (v1089 ? " repair" : "") + "\" data-metric=\"" + v984(v1085) + "\" d=\"M" + v1087(v1090.left.x).toFixed(1) + " " + v1088(v1090.left.y).toFixed(1) + " L" + v1087(v1090.right.x).toFixed(1) + " " + v1088(v1090.right.y).toFixed(1) + "\" style=\"stroke:" + v1086 + "\"><title>" + (v1089 ? "缺测区间：趋势补算，非实测" : "缺测连接，仅示意，不补算") + "</title></path>").join("");
    }
    function v999(v1091, v1092) {
      if (!v1091.length || v1092.length < 2) {
        return "";
      }
      const v1093 = v1091.map(v1097 => [v1097.left.t, v1097.right.t]).sort((v1098, v1099) => v1098[0] - v1099[0]);
      let v1094 = -Infinity;
      let v1095 = 0;
      for (const [v1100, v1101] of v1093) {
        v1095 += Math.max(0, v1101 - Math.max(v1100, v1094));
        v1094 = Math.max(v1094, v1101);
      }
      const v1096 = Math.max(...v1092.map(v1102 => v1102.t)) - Math.min(...v1092.map(v1103 => v1103.t));
      if (!(v1096 > 0)) {
        return "";
      }
      return "<div class=\"chg-repair-note\"><i class=\"repair-key\" aria-hidden=\"true\"></i>彩色虚线仅连接缺测区间，不代表实测或自动批准补算。当前所示指标已批准的补算区间共 " + v984(v981.minutesShort(v1095 / 60000)) + "，占本图采样跨度 " + Math.round(v1095 / v1096 * 100) + "%；未批准的缺口只作缺测连接，查看时不提供读数。补算不计入实测充入电量。</div>";
    }
    function v1000(v1104) {
      const v1105 = v994(v1104?.observedMin);
      const v1106 = v994(v1104?.estimatedMin);
      const v1107 = v994(v1104?.estimatedFraction);
      if (!(v1106 > 0) || v1105 === null || v1105 < 0 || v1107 === null || v1107 <= 0 || v1107 > 1) {
        return "";
      }
      return "<div class=\"chg-repair-note\">历史记录估值，仅供参考。</div>";
    }
    function v1001(v1108, v1109 = []) {
      const v1110 = [];
      v1108.forEach((v1111, v1112) => {
        const v1113 = v1108[v1112 - 1];
        const v1114 = !v1113 || v1111.gap || v1111.t <= v1113.t || v1109.some(v1115 => v1113.x < v1115.right.x && v1111.x > v1115.left.x);
        if (v1114) {
          v1110.push([]);
        }
        v1110[v1110.length - 1].push(v1111);
      });
      return v1110;
    }
    function v1002(v1116, v1117, v1118 = {}) {
      const v1119 = window.CHG.series(v1116, v1117);
      const v1120 = window.CHG.METRICS.find(v1154 => v1154.id === v1117) || window.CHG.METRICS[0];
      if (v1119.length < 2) {
        return "<div class=\"chg-empty\">这个指标还画不出曲线（至少要有 2 条采样）</div>";
      }
      const v1121 = 320;
      const v1122 = 152;
      const v1123 = 42;
      const v1124 = 10;
      const v1125 = 12;
      const v1126 = 26;
      const v1127 = v1121 - v1123 - v1124;
      const v1128 = v1122 - v1125 - v1126;
      const v1129 = v1119[v1119.length - 1].x;
      const v1130 = v1119[v1119.length - 1];
      const v1131 = v996(v1116, v1119, v1117, v995(v1116, v1118));
      const v1132 = [...v1119.map(v1155 => v1155.y), ...v1131.flatMap(v1156 => [v1156.left.y, v1156.right.y])];
      let v1133;
      let v1134;
      if (v1117 === "soc") {
        v1134 = 100;
        v1133 = Math.max(0, Math.min(Math.floor(Math.min(...v1132) - 2), v1134 - 8));
      } else {
        const v1157 = Math.max(0.5, (Math.max(...v1132) - Math.min(...v1132)) * 0.15);
        v1133 = Math.min(...v1132) - v1157;
        v1134 = Math.max(...v1132) + v1157;
      }
      if (v1134 - v1133 < 0.000001) {
        v1134 = v1133 + 1;
      }
      const v1135 = v1119[0].x;
      const v1136 = v1129 - v1135;
      const v1137 = v1117 === "soc" && v1118.projection !== false ? window.CHG.fit(v1116) : null;
      const v1138 = v1137 && v1137.etaMin ? v1129 + v1137.etaMin : null;
      const v1139 = v1118.projection === false ? v1129 : Math.max(v1129 + Math.max(0.6, v1136 * 0.06), Math.min(v1138 || 0, v1129 + Math.max(4, v1136)));
      const v1140 = v1158 => v1123 + (v1158 - v1135) / Math.max(0.000001, v1139 - v1135) * v1127;
      const v1141 = v1159 => v1125 + (1 - (v1159 - v1133) / (v1134 - v1133)) * v1128;
      const v1142 = v1160 => v1117 === "v" || v1117 === "a" ? v1160.toFixed(1) : String(Math.round(v1160));
      const v1143 = v1138 ? (() => {
        const v1161 = Math.min(v1138, v1139);
        return {
          x: v1161,
          y: Math.min(100, v1130.y + (v1161 - v1129) / (v1138 - v1129) * (100 - v1130.y))
        };
      })() : null;
      const v1144 = [v1133, (v1133 + v1134) / 2, v1134].map(v1162 => "\n      <line class=\"g\" x1=\"" + v1123 + "\" y1=\"" + v1141(v1162).toFixed(1) + "\" x2=\"" + (v1121 - v1124) + "\" y2=\"" + v1141(v1162).toFixed(1) + "\"/>\n      <text x=\"" + (v1123 - 6) + "\" y=\"" + (v1141(v1162) + 3.2).toFixed(1) + "\" text-anchor=\"end\">" + v1142(v1162) + "</text>").join("");
      const v1145 = v1001(v1119, v1131);
      const v1146 = globalThis.CHARTPATH;
      const v1147 = v1163 => v1146 ? v1146.path(v1163, 0, v1163.length - 1, v1164 => v1140(v1164.x), v1165 => v1141(v1165.y)) : v1163.map((v1166, v1167) => "" + (v1167 ? "L" : "M") + v1140(v1166.x).toFixed(1) + " " + v1141(v1166.y).toFixed(1)).join(" ");
      const v1148 = v1145.map(v1147).join(" ");
      const v1149 = v1145.filter(v1168 => v1168.length > 1).map(v1169 => {
        const v1170 = v1147(v1169);
        if (v1170) {
          return v1170 + " L" + v1140(v1169[v1169.length - 1].x).toFixed(1) + " " + (v1125 + v1128).toFixed(1) + " L" + v1140(v1169[0].x).toFixed(1) + " " + (v1125 + v1128).toFixed(1) + " Z";
        } else {
          return "";
        }
      }).join(" ");
      const v1150 = v1119[0].basis === "charged" ? "已充" : "采样";
      const v1151 = v1143 ? "\n      <path class=\"proj\" d=\"M" + v1140(v1130.x).toFixed(1) + " " + v1141(v1130.y).toFixed(1) + " L" + v1140(v1143.x).toFixed(1) + " " + v1141(v1143.y).toFixed(1) + "\"><title>按当前增速预测，非实测</title></path>\n      " + (v1143.y >= 99.5 && v1137.at ? "<text x=\"" + (v1140(v1143.x) - 5).toFixed(1) + "\" y=\"" + (v1141(100) + 12).toFixed(1) + "\" text-anchor=\"end\">预计 " + v984(window.CHG.fmtClock(v1137.at)) + " 充满</text>" : "") : "";
      const v1152 = {
        soc: "var(--md-sys-color-primary)",
        w: "var(--c-charge)",
        v: "var(--c-success)",
        a: "var(--c-warning)",
        temp: "var(--c-danger)"
      }[v1117];
      const v1153 = {
        x0: v1135,
        x1: v1139,
        series: [{
          id: v1117,
          label: v1120.label,
          unit: v1120.unit,
          color: v1152,
          pts: v1119.map(v1171 => ({
            x: v1171.x,
            y: v1171.y,
            t: v1171.t,
            gap: !!v1171.gap,
            ny: v1141(v1171.y)
          })),
          repairs: v1131.map(v1172 => ({
            left: {
              ...v1172.left,
              ny: v1141(v1172.left.y)
            },
            right: {
              ...v1172.right,
              ny: v1141(v1172.right.y)
            }
          }))
        }]
      };
      return "<div class=\"chg-wrap\" data-probe='" + v984(JSON.stringify(v1153)) + "' data-vb=\"" + v1121 + " " + v1122 + "\" data-box=\"" + v1123 + " " + v1125 + " " + v1127 + " " + v1128 + "\">\n      <svg class=\"chg-svg\" viewBox=\"0 0 " + v1121 + " " + v1122 + "\" role=\"img\" style=\"--c-chg:" + v1152 + "\"\n        aria-label=\"充电" + v984(v1120.label) + "曲线\">\n      " + v1144 + "\n      <path class=\"area\" d=\"" + v1149 + "\"/>\n      " + v1151 + "\n      <path class=\"line\" d=\"" + v1148 + "\"/>\n      " + v998(v997(v1119, v1131), v1117, v1152, v1140, v1141) + "\n      " + v998(v1131, v1117, v1152, v1140, v1141, true) + "\n      <text x=\"" + v1123 + "\" y=\"" + (v1122 - 8) + "\" text-anchor=\"start\">" + v1150 + " " + v984(v981.minutesShort(v1135)) + "</text>\n      <text x=\"" + (v1121 - v1124) + "\" y=\"" + (v1122 - 8) + "\" text-anchor=\"end\">" + (v1138 ? "预测至" : v1150) + " " + v984(v981.minutesShort(Math.round(v1138 ? v1139 : v1129))) + "</text>\n      <line class=\"probe-v\" x1=\"0\" y1=\"" + v1125 + "\" x2=\"0\" y2=\"" + (v1125 + v1128) + "\" style=\"opacity:0\"/>\n      </svg>\n      " + v999(v1131, v1116) + "\n      <div class=\"probe-tip chg-tip\" hidden></div>\n    </div>";
    }
    function v1003(v1173, v1174 = {}) {
      const v1175 = v1173 || [];
      const v1176 = v993(v1175);
      const v1177 = v995(v1175, v1174);
      const v1178 = v1176.flatMap(v1220 => window.CHG.series(v1175, v1220.id)).filter(v1221 => Number.isFinite(v1221.x) && Number.isFinite(v1221.y)).sort((v1222, v1223) => v1222.x - v1223.x);
      if (v1175.length < 2 || !v1178.length) {
        return "<div class=\"chg-empty\">这个指标还画不出曲线（至少要有 2 条采样）</div>";
      }
      const v1179 = 320;
      const v1180 = 152;
      const v1181 = 56;
      const v1182 = 10;
      const v1183 = 12;
      const v1184 = 26;
      const v1185 = v1179 - v1181 - v1182;
      const v1186 = v1180 - v1183 - v1184;
      const v1187 = v1178[v1178.length - 1].x;
      const v1188 = v1178[0].x;
      const v1189 = v1187 - v1188;
      const v1190 = v1174.projection === false ? null : window.CHG.fit(v1175);
      const v1191 = window.CHG.series(v1175, "soc");
      const v1192 = v1191.length ? v1191[v1191.length - 1].x : v1187;
      const v1193 = v1190 && v1190.etaMin ? v1192 + v1190.etaMin : null;
      const v1194 = v1193 ? v1187 + (v1193 - v1187) : 0;
      const v1195 = v1174.projection === false ? v1187 : Math.max(v1187 + Math.max(0.6, v1189 * 0.06), Math.min(Math.max(v1194, v1193 || 0), v1187 + Math.max(4, v1189) * 1.6));
      const v1196 = v1224 => v1181 + (v1224 - v1188) / Math.max(0.000001, v1195 - v1188) * v1185;
      const v1197 = v1178[0].basis === "charged" ? "已充" : "采样";
      const v1198 = {
        soc: "var(--md-sys-color-primary)",
        w: "var(--c-charge)",
        v: "var(--c-success)",
        a: "var(--c-warning)",
        temp: "var(--c-danger)"
      };
      const v1199 = v1225 => {
        if (!(v1225 > 0)) {
          return 1;
        }
        const v1226 = Math.pow(10, Math.floor(Math.log10(v1225)));
        const v1227 = v1225 / v1226;
        const v1228 = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 6.5, 7, 8, 9, 10];
        const v1229 = v1228.find(v1232 => v1227 <= v1232 + 1e-9) || 10;
        const v1230 = v1229 * v1226;
        const v1231 = Math.pow(10, Math.max(0, Math.floor(Math.log10(v1230)) - 2));
        return Math.round(v1230 / v1231) * v1231;
      };
      const v1200 = v989.filter(v1233 => v991.has(v1233)).map(v1234 => {
        const v1235 = window.CHG.series(v1175, v1234).filter(v1243 => Number.isFinite(v1243.x) && Number.isFinite(v1243.y) && v1243.x >= v1188 && v1243.x <= v1195);
        if (!v1235.length) {
          return null;
        }
        const v1236 = window.CHG.METRICS.find(v1244 => v1244.id === v1234) || {};
        const v1237 = v996(v1175, v1235, v1234, v1177);
        const v1238 = [...v1235.map(v1245 => v1245.y), ...v1237.flatMap(v1246 => [v1246.left.y, v1246.right.y])];
        const v1239 = Math.min(...v1238);
        const v1240 = Math.max(...v1238);
        let v1241;
        let v1242;
        if (v1234 === "soc") {
          v1241 = 0;
          v1242 = 100;
        } else if (v1234 === "w" || v1234 === "a") {
          v1241 = 0;
          v1242 = v1199(v1240 * 1.05);
        } else {
          const v1247 = Math.max(v1234 === "temp" ? 2 : 1.5, (v1240 - v1239) / 2 * 1.6);
          const v1248 = (v1240 + v1239) / 2;
          v1241 = v1248 - v1247;
          v1242 = v1248 + v1247;
          if (v1234 === "v" && v1241 < 0) {
            v1242 += -v1241;
            v1241 = 0;
          }
        }
        if (v1242 - v1241 < 0.000001) {
          v1242 = v1241 + 1;
        }
        return {
          id: v1234,
          list: v1235,
          repairs: v1237,
          lo: v1241,
          hi: v1242,
          meta: v1236,
          color: v1198[v1234]
        };
      }).filter(Boolean);
      if (!v1200.length) {
        return "<div class=\"chg-empty\">所有曲线都被隐藏了，点上面的标签显示一条</div>";
      }
      const v1201 = (v1249, v1250) => v1183 + (1 - Math.max(0, Math.min(1, (v1250 - v1249.lo) / (v1249.hi - v1249.lo)))) * v1186;
      const v1202 = v1251 => v1251.id === "v" || v1251.id === "a" ? 1 : 0;
      const v1203 = v1200.find(v1252 => v1252.id === "soc") || v1200[0];
      const v1204 = v1253 => v1203.id === "soc" ? Math.round(v1253) + "%" : v1253.toFixed(v1202(v1203));
      const v1205 = [1, 0.5, 0];
      const v1206 = v1205.map(v1254 => {
        const v1255 = (v1183 + (1 - v1254) * v1186).toFixed(1);
        return "<line class=\"g\" x1=\"" + v1181 + "\" y1=\"" + v1255 + "\" x2=\"" + (v1179 - v1182) + "\" y2=\"" + v1255 + "\"/>";
      }).join("");
      const v1207 = v1205.map(v1256 => {
        const v1257 = v1203.lo + v1256 * (v1203.hi - v1203.lo);
        const v1258 = (v1183 + (1 - v1256) * v1186 + 3.2).toFixed(1);
        return "<text class=\"tick\" x=\"" + (v1181 - 5) + "\" y=\"" + v1258 + "\" text-anchor=\"end\"\n        style=\"fill:" + v1203.color + "\">" + v984(v1204(v1257)) + "</text>";
      }).join("");
      const v1208 = v1259 => {
        const v1260 = v1001(v1259.list, v1259.repairs);
        const v1261 = globalThis.CHARTPATH;
        const v1262 = v1263 => v1261 ? v1261.path(v1263, 0, v1263.length - 1, v1264 => v1196(v1264.x), v1265 => v1201(v1259, v1265.y)) : v1263.map((v1266, v1267) => "" + (v1267 ? "L" : "M") + v1196(v1266.x).toFixed(1) + " " + v1201(v1259, v1266.y).toFixed(1)).join(" ");
        return {
          line: v1260.map(v1262).join(" ")
        };
      };
      const v1209 = v1200.map(v1268 => ({
        s: v1268,
        ...v1208(v1268)
      }));
      const v1210 = v1200.find(v1269 => v1269.id === "soc");
      const v1211 = v1210 ? v1210.list[v1210.list.length - 1] : null;
      const v1212 = v1210 && v1190 && v1190.etaMin && v1211 ? (() => {
        const v1270 = v1211.x + v1190.etaMin;
        const v1271 = Math.min(v1270, v1195);
        const v1272 = v1211.y + (v1271 - v1211.x) / Math.max(0.000001, v1190.etaMin) * (100 - v1211.y);
        return {
          x: v1271,
          y: Math.max(v1211.y, Math.min(100, v1272))
        };
      })() : null;
      const v1213 = v1212 && v1210 ? Math.min(v1179 - v1182 - 3, v1196(v1212.x)) : 0;
      const v1214 = v1212 && v1210 ? Math.max(v1183 + 2, v1201(v1210, v1212.y)) : 0;
      const v1215 = Math.max(v1183 + 11, Math.min(v1183 + v1186 - 2, v1214 + 13));
      const v1216 = v1212 && v1210 ? "\n      <path class=\"fit\" d=\"M" + v1196(v1211.x).toFixed(1) + " " + v1201(v1210, v1211.y).toFixed(1) + " L" + v1213.toFixed(1) + " " + v1214.toFixed(1) + "\"><title>按当前增速预测，非实测</title></path>\n      " + (v1190.at ? "<text class=\"fitLabel\" x=\"" + Math.max(v1181 + 4, Math.min(v1179 - v1182 - 2, v1213)).toFixed(1) + "\" y=\"" + v1215.toFixed(1) + "\" text-anchor=\"end\">预计 " + v984(window.CHG.fmtClock(v1190.at)) + " 充满</text>" : "") : "";
      const v1217 = v1273 => "" + (v1273.id === "soc" ? 0 : Math.round(v1273.lo)) + (v1273.id === "soc" ? "%" : "") + "~" + Math.round(v1273.hi) + (v1273.meta.unit || "");
      const v1218 = "<div class=\"chg-legend\">" + v1200.map(v1274 => "<span class=\"lg\"><i style=\"background:" + v1274.color + "\"></i>" + v984(v1274.meta.label) + " <em>" + v984(v1217(v1274)) + "</em></span>").join("") + "</div>";
      const v1219 = {
        x0: v1188,
        x1: v1195,
        series: v1200.map(v1275 => ({
          id: v1275.id,
          label: v1275.meta.label,
          unit: v1275.meta.unit,
          color: v1275.color,
          pts: v1275.list.map(v1276 => ({
            x: v1276.x,
            y: v1276.y,
            t: v1276.t,
            gap: !!v1276.gap,
            ny: v1201(v1275, v1276.y)
          })),
          repairs: v1275.repairs.map(v1277 => ({
            left: {
              ...v1277.left,
              ny: v1201(v1275, v1277.left.y)
            },
            right: {
              ...v1277.right,
              ny: v1201(v1275, v1277.right.y)
            }
          }))
        }))
      };
      return "<div class=\"chg-wrap\" data-probe='" + v984(JSON.stringify(v1219)) + "' data-vb=\"" + v1179 + " " + v1180 + "\" data-box=\"" + v1181 + " " + v1183 + " " + v1185 + " " + v1186 + "\">\n      <svg class=\"chg-svg chg-multi\" viewBox=\"0 0 " + v1179 + " " + v1180 + "\" role=\"img\"\n        aria-label=\"充电曲线：" + v1200.map(v1278 => v984(v1278.meta.label)).join("、") + "\">\n        " + v1206 + "\n        " + v1207 + "\n        " + v1209.map(v1279 => v1279.line ? "<path class=\"line\" d=\"" + v1279.line + "\" style=\"stroke:" + v1279.s.color + "\"/>" : "").join("") + "\n        " + v1200.map(v1280 => v998(v997(v1280.list, v1280.repairs), v1280.id, v1280.color, v1196, v1281 => v1201(v1280, v1281)) + v998(v1280.repairs, v1280.id, v1280.color, v1196, v1282 => v1201(v1280, v1282), true)).join("") + "\n        " + v1216 + "\n        <text x=\"" + v1181 + "\" y=\"" + (v1180 - 8) + "\" text-anchor=\"start\">" + v1197 + " " + v984(v981.minutesShort(v1188)) + "</text>\n        <text x=\"" + (v1179 - v1182) + "\" y=\"" + (v1180 - 8) + "\" text-anchor=\"end\">" + (v1193 ? "预测至" : v1197) + " " + v984(v981.minutesShort(Math.round(v1193 ? v1195 : v1187))) + "</text>\n        <line class=\"probe-v\" x1=\"0\" y1=\"" + v1183 + "\" x2=\"0\" y2=\"" + (v1183 + v1186) + "\" style=\"opacity:0\"/>\n      </svg>\n      " + v1218 + "\n      " + v999(v1200.flatMap(v1283 => v1283.repairs), v1175) + "\n      <div class=\"probe-tip chg-tip\" hidden></div>\n    </div>";
    }
    function v1004(v1284) {
      const v1285 = new Date(v1284);
      return v1285.getMonth() + 1 + "月" + v1285.getDate() + "日";
    }
    function v1005(v1286) {
      const v1287 = new Date(v1286.s);
      const v1288 = new Date(v1286.e);
      const v1289 = v1287.toDateString() === v1288.toDateString();
      if (v1289) {
        return v1004(v1286.s) + " " + window.CHG.fmtTime(v1286.s) + "–" + window.CHG.fmtTime(v1286.e);
      } else {
        return v1004(v1286.s) + " " + window.CHG.fmtTime(v1286.s) + " – " + v1004(v1286.e) + " " + window.CHG.fmtTime(v1286.e);
      }
    }
    function v1006(v1290 = v979()) {
      const v1291 = v1290.querySelector(".chg-wrap");
      const v1292 = v1291 && v1291.querySelector("svg");
      if (!v1291 || !v1292) {
        return;
      }
      let v1293 = null;
      try {
        v1293 = JSON.parse(v1291.dataset.probe || "null");
      } catch {
        v1293 = null;
      }
      if (!v1293 || !v1293.series?.length) {
        return;
      }
      const [v1294, v1295] = String(v1291.dataset.vb || "320 152").split(" ").map(Number);
      const [v1296, v1297, v1298, v1299] = String(v1291.dataset.box || "42 12 268 114").split(" ").map(Number);
      const v1300 = v1292.querySelector(".probe-v");
      const v1301 = v1291.querySelector(".probe-tip");
      const v1302 = v1293.x0;
      const v1303 = v1293.x1;
      const v1304 = (v1311, v1312) => v1311 === "v" || v1311 === "a" ? v1312.toFixed(1) : String(Math.round(v1312));
      let v1305 = 0;
      const v1306 = [];
      const v1307 = () => {
        v1306.splice(0).forEach(v1313 => v1313.remove());
      };
      const v1308 = (v1314, v1315, v1316, v1317 = false) => {
        if (!Number.isFinite(v1315) || !Number.isFinite(v1316)) {
          return;
        }
        const v1318 = v1292.ownerDocument || window.document;
        if (!v1318?.createElementNS || !v1292.appendChild) {
          return;
        }
        const v1319 = v1318.createElementNS("http://www.w3.org/2000/svg", "circle");
        v1319.setAttribute("class", "probe-dot");
        v1319.setAttribute("data-metric", v1314.id);
        if (v1317) {
          v1319.setAttribute("data-estimated", "true");
        }
        v1319.setAttribute("cx", (v1296 + (v1315 - v1302) / Math.max(0.000001, v1303 - v1302) * v1298).toFixed(1));
        v1319.setAttribute("cy", Math.max(v1297, Math.min(v1297 + v1299, v1316)).toFixed(1));
        v1319.setAttribute("r", "3.2");
        v1319.style.fill = v1317 ? "var(--bg-inset)" : v1314.color;
        v1319.style.stroke = v1314.color;
        v1292.appendChild(v1319);
        v1306.push(v1319);
      };
      const v1309 = () => {
        v1300.style.opacity = "0";
        v1301.hidden = true;
        v1307();
      };
      const v1310 = v1320 => {
        const v1321 = v1292.getBoundingClientRect();
        if (!v1321.width) {
          return;
        }
        v1307();
        const v1322 = (v1320 - v1321.left) / v1321.width * v1294;
        const v1323 = Math.max(0, Math.min(1, (v1322 - v1296) / v1298));
        const v1324 = v1302 + v1323 * (v1303 - v1302);
        const v1325 = [];
        let v1326 = null;
        let v1327 = false;
        for (const v1331 of v1293.series) {
          const v1332 = (v1331.repairs || []).flatMap(v1338 => [v1338.left, v1338.right]).find(v1339 => Math.abs(v1339.x - v1324) < 1e-7);
          const v1333 = v1331.pts.find(v1340 => Math.abs(v1340.x - v1324) < 1e-7) || v1332;
          const v1334 = !v1333 && (v1331.repairs || []).find(v1341 => v1324 > v1341.left.x && v1324 < v1341.right.x);
          const v1335 = !v1333 && v1331.pts.some((v1342, v1343) => v1343 > 0 && (v1342.gap || v1342.t <= v1331.pts[v1343 - 1].t) && v1324 > v1331.pts[v1343 - 1].x && v1324 < v1342.x);
          if (v1334) {
            const v1344 = (v1324 - v1334.left.x) / (v1334.right.x - v1334.left.x);
            const v1345 = v1334.left.y + (v1334.right.y - v1334.left.y) * v1344;
            v1308(v1331, v1324, v1334.left.ny + (v1334.right.ny - v1334.left.ny) * v1344, true);
            v1325.push("<span class=\"tip-row\"><i style=\"background:" + v1331.color + "\"></i>" + v984(v1331.label) + " 约 <b>" + v1304(v1331.id, v1345) + "</b>" + v984(v1331.unit || "") + " · 补算，非实测</span>");
            v1327 = true;
            continue;
          }
          if (v1335) {
            v1325.push("<span class=\"tip-row\"><i style=\"background:" + v1331.color + "\"></i>" + v984(v1331.label) + " 该时刻无采样 · 未补算</span>");
            v1327 = true;
            continue;
          }
          let v1336 = v1333 || null;
          for (const v1346 of v1331.pts) {
            if (!v1336 || Math.abs(v1346.x - v1324) < Math.abs(v1336.x - v1324)) {
              v1336 = v1346;
            }
          }
          if (!v1336 || Math.abs(v1336.x - v1324) > 2.5) {
            v1325.push("<span class=\"tip-row\"><i style=\"background:" + v1331.color + "\"></i>" + v984(v1331.label) + " 该时刻无采样</span>");
            continue;
          }
          v1308(v1331, v1336.x, v1336.ny);
          if (!v1326 || Math.abs(v1336.x - v1324) < Math.abs(v1326.x - v1324)) {
            v1326 = v1336;
          }
          const v1337 = v1336.t ? " · " + window.CHG.fmtTime(v1336.t) : " · " + v981.minutesShort(v1336.x);
          v1325.push("<span class=\"tip-row\"><i style=\"background:" + v1331.color + "\"></i>" + v984(v1331.label) + " <b>" + v1304(v1331.id, v1336.y) + "</b>" + v984(v1331.unit || "") + v984(v1337) + "</span>");
        }
        const v1328 = v1327 ? v1324 : v1326?.x ?? v1324;
        v1300.setAttribute("x1", (v1296 + (v1328 - v1302) / Math.max(0.000001, v1303 - v1302) * v1298).toFixed(1));
        v1300.setAttribute("x2", v1300.getAttribute("x1"));
        v1300.style.opacity = "1";
        v1301.hidden = false;
        v1301.innerHTML = v1325.join("");
        const v1329 = v1321.left + (v1296 + (v1328 - v1302) / Math.max(0.000001, v1303 - v1302) * v1298) / v1294 * v1321.width;
        const v1330 = v1301.offsetWidth || 120;
        v1301.style.left = Math.max(2, Math.min(v1321.width - v1330 - 2, v1329 - v1321.left - v1330 / 2)) + "px";
        v1301.style.top = "2px";
      };
      v1292.style.touchAction = "pan-y";
      v1292.addEventListener("pointerdown", v1347 => {
        clearTimeout(v1305);
        try {
          v1292.setPointerCapture(v1347.pointerId);
        } catch {}
        v1310(v1347.clientX);
      });
      v1292.addEventListener("pointermove", v1348 => {
        if (v1348.buttons || v1348.pointerType === "mouse") {
          clearTimeout(v1305);
          v1310(v1348.clientX);
        }
      });
      v1292.addEventListener("mousemove", v1349 => {
        clearTimeout(v1305);
        v1310(v1349.clientX);
      });
      v1292.addEventListener("mouseleave", () => {
        clearTimeout(v1305);
        v1309();
      });
      v1292.addEventListener("pointerup", () => {
        clearTimeout(v1305);
        v1305 = setTimeout(v1309, 1500);
      });
      v1292.addEventListener("pointercancel", () => {
        clearTimeout(v1305);
        v1309();
      });
    }
    const v1007 = v1350 => (v1350.soc0 ?? "—") + "% → " + (v1350.soc1 ?? "—") + "%";
    function v1008(v1351) {
      const v1352 = v1351?.energyRepair;
      const v1353 = v994(v1352?.estimatedKwh);
      const v1354 = v994(v1352?.totalKwh);
      if (v1352?.version !== 1 || !(v994(v1352.estimatedMin) > 0) || v1353 === null || v1353 < 0 || v1354 === null || v1354 < 0) {
        return null;
      }
      return v1352;
    }
    const v1009 = v1355 => {
      const v1356 = v994(v1355);
      if (v1356 === null) {
        return "—";
      } else if (v1356 > 0 && v1356 < 0.001) {
        return "<0.001";
      } else {
        return String(Number(v1356.toFixed(3)));
      }
    };
    function v1010(v1357) {
      const v1358 = v1008(v1357);
      const v1359 = v1358 ? v1358.totalKwh : v994(v1357.kwh);
      if (v1359 === null) {
        return "";
      } else {
        return " · " + v1009(v1359) + " kWh" + (v1358 ? "（含补算）" : "（实测）");
      }
    }
    function v1011(v1360) {
      const v1361 = v1008(v1360);
      if (!v1361) {
        return "实测电量" + (v1360.coveredMin == null ? "的覆盖范围未知" : "覆盖 " + v984(v981.minutes(v1360.coveredMin))) + "，未计入缺测区间，也不含补算。";
      }
      const v1362 = v994(v1361.missingMin);
      return "电量由实测 " + v984(v1009(v1361.observedKwh)) + " kWh 与补算 " + v984(v1009(v1361.estimatedKwh)) + " kWh 合计。" + (v1362 > 0 ? "仍有 " + v984(v981.minutes(Math.round(v1362))) + " 无法补算，合计不是整次充电的完整电量。" : "已覆盖这段记录的时长，补算仍是估算。") + "补算不用于容量标定。";
    }
    function v1012(v1363, v1364, v1365) {
      return v976.batterydetail?.capWhyShort?.(v1363, v1364, v1365) || "这次记录暂未用于容量参考。";
    }
    const v1013 = v1366 => v1366?.id || (v1366 ? v1366.s + "|" + v1366.e : "");
    const v1014 = new Map();
    function v1015(v1367) {
      const v1368 = v976.mem?.chargeHistoryState;
      if (v1368?.vin === v1367.vin) {
        return v1368;
      } else {
        return {};
      }
    }
    function v1016(v1369) {
      const v1370 = v1015(v1369);
      if (v1370.error) {
        return "<div class=\"card-sub mt8\" role=\"status\">" + v984(v1370.error) + "</div>";
      }
      const v1371 = v1370.clearing ? "正在清理充电记录…" : v1370.pending ? "正在读取后台记录…" : "";
      if (v1371) {
        return "<div class=\"mt8\">" + v982.spinner(v1371) + "</div>";
      } else {
        return "";
      }
    }
    function v1017(v1372, v1373, v1374, v1375, v1376 = "") {
      if (!v976.current(v1375) || v1374 !== undefined && !v982.sheetAlive(v1374)) {
        return null;
      }
      const v1377 = v1374 === undefined ? v982.sheet(v979(), v1373) : v982.updateSheet(v1374, v1373) ? v1374 : null;
      if (v1377) {
        v1014.set(v1372, {
          handle: v1377,
          scope: v1375,
          id: v1376
        });
      }
      return v1377;
    }
    function v1018() {
      for (const [v1378, v1379] of [...v1014]) {
        if (!v976.current(v1379.scope) || !v982.sheetAlive(v1379.handle)) {
          v1014.delete(v1378);
          continue;
        }
        if (v1378 === "charge") {
          v1026({
            handle: v1379.handle,
            scope: v1379.scope
          });
        } else if (v1378 === "chghist") {
          v1020({
            handle: v1379.handle,
            scope: v1379.scope
          });
        } else if (v1378 === "chghidden") {
          v1021({
            handle: v1379.handle,
            scope: v1379.scope
          });
        } else if (v1378 === "battdetail") {
          v976.batterydetail.batteryDetailSheet({
            handle: v1379.handle,
            scope: v1379.scope
          });
        } else {
          v1023(-1, {
            handle: v1379.handle,
            scope: v1379.scope,
            id: v1379.id
          });
        }
      }
    }
    function v1019(v1380) {
      const v1381 = window.CHG.hiddenCount?.(v1380.vin) || 0;
      if (!v1381) {
        return "";
      }
      return "<button class=\"btn tonal sm\" data-act=\"chghidden\">已隐藏的记录（" + v1381 + "条）</button>";
    }
    function v1020({
      handle: v1382,
      scope = v976.context()
    } = {}) {
      if (!v976.current(scope) || v1382 !== undefined && !v982.sheetAlive(v1382)) {
        return null;
      }
      const v1383 = window.CHG.history(scope.vin);
      const v1384 = v977.vehicles.find(v1387 => v1387.vin === scope.vin);
      const v1385 = v1383.map((v1388, v1389) => "<section class=\"card charge-record-card\" data-act=\"chgsession\" data-i=\"" + v1389 + "\">\n      " + v982.cardHead(v1005(v1388), v1007(v1388) + " · " + v981.minutes(v1388.durMin) + v1010(v1388), "<button class=\"iconbtn sm\" data-act=\"chghidesession\" data-key=\"" + v984(v1013(v1388)) + "\" title=\"从列表移除这条\" aria-label=\"从列表移除这条充电记录\">" + v982.icon("trash", 18) + "</button><button class=\"iconbtn sm\" data-act=\"chgsession\" data-i=\"" + v1389 + "\" title=\"查看曲线\">" + v982.icon("right", 18) + "</button>", "bolt") + "\n    </section>").join("");
      const v1386 = v1016(scope) + "\n      <div class=\"charge-record-list\">" + (v1385 || "<div class=\"chg-empty\">还没有已结束的充电记录</div>") + "</div>\n      <div class=\"battery-detail-charge-actions\">\n        " + (v1383.length ? "<button class=\"btn tonal sm\" data-act=\"chghistclear\" " + (v1015(scope).clearing ? "disabled" : "") + ">清空充电记录</button>" : "") + "\n        " + v1019(scope) + "\n      </div>";
      return v1017("chghist", {
        key: "chghist",
        title: "充电记录",
        sub: v1384?.name || "当前车辆",
        body: v1386
      }, v1382, scope);
    }
    function v1021({
      handle: v1390,
      scope = v976.context()
    } = {}) {
      if (!v976.current(scope) || v1390 !== undefined && !v982.sheetAlive(v1390)) {
        return null;
      }
      const v1391 = window.CHG.history(scope.vin, {
        includeHidden: true
      });
      const v1392 = v1391.filter(v1396 => v1396.hidden === true);
      const v1393 = v977.vehicles.find(v1397 => v1397.vin === scope.vin);
      const v1394 = v1392.map(v1398 => "<section class=\"card charge-record-card\">\n      " + v982.cardHead(v1005(v1398), v1007(v1398) + " · " + v981.minutes(v1398.durMin) + v1010(v1398), "<button class=\"iconbtn sm\" data-act=\"chghidesession\" data-key=\"" + v984(v1013(v1398)) + "\" data-hidden=\"1\" title=\"恢复显示\" aria-label=\"恢复显示这条充电记录\">" + v982.icon("eye", 18) + "</button>", "bolt") + "\n    </section>").join("");
      const v1395 = "<div class=\"charge-record-list\">" + (v1394 || "<div class=\"chg-empty\">没有已隐藏的充电记录</div>") + "</div>\n      <div class=\"battery-detail-charge-actions\"><button class=\"btn tonal sm\" data-act=\"chghistback\">返回充电记录</button></div>";
      return v1017("chghidden", {
        key: "chghidden",
        title: "已隐藏的记录",
        sub: v1393?.name || "当前车辆",
        body: v1395
      }, v1390, scope);
    }
    function v1022(v1399) {
      return v976.batterydetail?.capGapText?.(v1399) || "还需要更多连续、有效的充电记录。";
    }
    function v1023(v1400, {
      handle: v1401,
      scope = v976.context(),
      id = ""
    } = {}) {
      if (!v976.current(scope) || v1401 !== undefined && !v982.sheetAlive(v1401)) {
        return null;
      }
      const v1402 = window.CHG.history(scope.vin);
      const v1403 = id ? v1402.find(v1407 => v1013(v1407) === id) : v1402[v1400];
      if (!v1403) {
        if (v1401 === undefined) {
          return v1020({
            scope: scope
          });
        }
        return v1017("chgsess", {
          key: "chgsess",
          title: "充电记录",
          body: "<div class=\"chg-empty\">这条记录已清理或超过保留上限</div>"
        }, v1401, scope, id);
      }
      const v1404 = v1008(v1403);
      const v1405 = [v976.tile("起始电量", v1403.soc0 ?? "—", "%"), v976.tile("结束电量", v1403.soc1 ?? "—", "%"), v976.tile(v1404 ? "充入电量（含补算）" : "实测电量", v1009(v1404 ? v1404.totalKwh : v1403.kwh), "kWh"), v976.tile("实测积分时长", v1403.coveredMin == null ? "未知" : v981.minutes(v1403.coveredMin)), ...(v1404 ? [v976.tile("实测电量", v1009(v1404.observedKwh ?? v1403.kwh), "kWh"), v976.tile("补算电量", v1009(v1404.estimatedKwh), "kWh"), v976.tile("补算时长", v981.minutes(Math.round(v1404.estimatedMin))), v976.tile("未覆盖时长", v981.minutes(Math.round(v1404.missingMin)))] : []), v976.tile("实测平均功率", v1403.avgW == null ? "—" : v1403.avgW, "W"), v976.tile("实测峰值功率", v1403.peakW == null ? "—" : v1403.peakW, "W"), v976.tile("充电时长", v981.minutes(v1403.durMin)), v976.tile("结束时间", window.CHG.fmtTime(v1403.e)), v976.tile("采样点", v1403.n ?? (v1403.pts?.length || "—"), "条")].join("");
      const v1406 = "\n      " + v1016(scope) + "\n      <div class=\"chg-hero\">\n        <div class=\"big\">" + v984(v1007(v1403)) + "</div>\n        <div class=\"s\">" + v984(v1005(v1403)) + "</div>\n      </div>\n      <div class=\"chg-chart chg-chart-block\">" + v1002(v1403.pts || [], "soc", {
        projection: false,
        curveRepair: v1403.curveRepair,
        energyRepair: v1404
      }) + "\n        <div class=\"chg-chart-note\">实线为实测，虚线为缺测，约值为补算。" + v1011(v1403) + "</div>\n      </div>\n      <div class=\"mstats chg-stat-block\">" + v1405 + "</div>\n      " + v1000(v986.healthOf?.(v1403)) + "\n      <div class=\"field mt12\"><button class=\"btn text sm\" data-act=\"chghistback\">返回列表</button></div>";
      return v1017("chgsess", {
        key: "chgsess",
        title: "充电记录",
        sub: v1005(v1403),
        body: v1406,
        onMount: v1408 => v1006(v1408)
      }, v1401, scope, v1013(v1403));
    }
    function v1024(v1409) {
      const v1410 = (v1409.pts || []).some(v1411 => v1411.curveOnly);
      return {
        ...(v1409.currentMeta || v1410 ? {
          curveRepair: v1409.currentMeta?.curveRepair ?? null
        } : {}),
        projection: !v1410
      };
    }
    function v1025(v1412, v1413 = "") {
      const v1414 = v1412.currentMeta?.summary;
      if (!v1414 || !(v994(v1414.e) > 0)) {
        return "";
      }
      const v1415 = Math.max(v994(v1412.currentMeta?.to) || 0, v994(v1412.pts?.at(-1)?.t) || 0);
      const v1416 = window.CAPBOOK?.scale?.(v1413) || 1;
      const v1417 = v994(v1414.kwh);
      const v1418 = v1417 === null ? null : v1417 * v1416;
      const v1419 = v994(v1414.coveredMin);
      const v1420 = v1004(v1414.e) + " " + v986.fmtTime(v1414.e);
      return "<div class=\"chg-repair-note\">恢复统计截至 " + v984(v1420) + " · " + (v1418 === null ? "—" : v984(String(v1418)) + " kWh") + " · " + (v1419 === null ? "—" : v984(v981.minutesShort(v1419))) + (v1415 > v1414.e ? " · 不含新增采样" : "") + "</div>";
    }
    function v1026({
      handle: v1421,
      scope = v976.context()
    } = {}) {
      if (!v976.current(scope) || v1421 !== undefined && !v982.sheetAlive(v1421)) {
        return null;
      }
      if (v1421 === undefined) {
        v991 = new Set(v990);
      }
      const v1422 = v977.data.home || {};
      const v1423 = window.CHG.log(scope.vin);
      const v1424 = v1423.pts;
      const v1425 = v1024(v1423);
      const v1426 = v1423.currentMeta?.summary;
      const v1427 = v1425.projection === false ? null : window.CHG.fit(v1424);
      const v1428 = window.CHG.series(v1424, "soc");
      const v1429 = v1424[v1424.length - 1] || null;
      const v1430 = v994(v1426?.s) || window.CHG.startedAt(v1424);
      const v1431 = v985.source === "demo";
      const v1432 = v977.vehicles.find(v1447 => v1447.vin === scope.vin);
      let v1433;
      let v1434;
      if (v1422.charge?.known === false) {
        v1433 = "当前充电状态未知";
        v1434 = "保留已有采样，重新取到状态后继续记录";
      } else if (!v1422.charge?.charging && v1422.charge?.full) {
        v1433 = "已充满";
        v1434 = v1429 ? "最后一条采样 " + window.CHG.fmtTime(v1429.t) + " · 电量 " + (v1429.soc ?? "—") + "%" : "这段没有采样";
      } else if (!v1422.charge?.charging) {
        v1433 = "现在没有在充电";
        v1434 = v1424.length ? "这段记录停在 " + window.CHG.fmtTime(v1429.t) + "（电量 " + (v1429.soc ?? "—") + "%）· 再插上充电器会自动开新的一段" : window.CHG.hasNativeHistory?.() ? "真实电池采样由 App 前后台持续记录" : "插上充电器、页面开着就会开始记录";
      } else if (v1425.projection === false) {
        v1433 = "已恢复充电记录";
        v1434 = v1426 ? "已恢复完整采样统计" : "暂不估算充满时间";
      } else if (!v1427) {
        v1433 = "样本还不够";
        v1434 = v1426 ? "统计截至 " + window.CHG.fmtTime(v1426.e) + " · 暂不估算充满时间" : "已记 " + v1424.length + " 条" + (v1428.length > 1 ? " · 跨度 " + v981.minutesShort(v1428[v1428.length - 1].x - v1428[0].x) : "") + "；至少 3 条、跨度 ≥ 4 分钟才能外推";
      } else if (v1427.stalled) {
        v1433 = "电量没在涨";
        v1434 = "近 " + v981.minutesShort(v1427.span) + " 几乎持平（" + v1427.rate.toFixed(1) + " %/小时）——充电器没插好？或者已经接近满电在涓流";
      } else if (!v1427.at) {
        v1433 = "还要 " + v981.minutes(v1427.etaMin);
        v1434 = "按当前增速 " + v1427.rate.toFixed(1) + " %/小时 算的，超过 12 小时，仅供参考";
      } else {
        v1433 = "还需 " + v981.minutes(v1427.etaMin);
        v1434 = "约 " + window.CHG.fmtClock(v1427.at) + " 充满 · 增速 " + v1427.rate.toFixed(1) + " %/小时" + ("（近 " + v981.minutesShort(v1427.span) + " " + v1427.n + " 条，" + (v1427.quality === "good" ? "样本够" : v1427.quality === "fair" ? "样本一般" : "样本少，粗估") + "）");
      }
      const v1435 = v993(v1424);
      const v1436 = v1435.map(v1448 => {
        const v1449 = v991.has(v1448.id);
        return "<button class=\"seg-btn" + (v1449 ? " on" : "") + "\" type=\"button\" aria-pressed=\"" + v1449 + "\" data-metric=\"" + v1448.id + "\" title=\"" + (v1449 ? "点击隐藏这条线" : "点击显示这条线") + "\">" + v1448.label + "</button>";
      }).join("");
      const v1437 = v1429 && v1429.cf !== null ? v981.minutesShort(v1429.cf) : v1422.charge?.chargedFor || null;
      const v1438 = v994(v1426?.sampledMin) ?? (v1428.length > 1 ? v1428[v1428.length - 1].x - v1428[0].x : null);
      const v1439 = v994(v1426?.n) ?? v994(v1423.currentMeta?.rawCount) ?? v1424.length;
      const v1440 = [...v1424].reverse().find(v1450 => v1450.ft !== null && v1450.ft !== undefined && Number(v1450.ft) > 0)?.ft;
      const v1441 = v1451 => v1451 !== null && v1451 !== undefined && v1451 !== "" && Number.isFinite(Number(v1451)) ? Number(Number(v1451).toFixed(1)) : "—";
      const v1442 = window.CAPBOOK?.scale?.(scope?.vin) === 2 ? 2 : 1;
      const v1443 = v1452 => v1452 === null || v1452 === undefined || v1452 === "" || !Number.isFinite(Number(v1452)) ? null : Number(v1452) * v1442;
      const v1444 = [v976.tile("当前电量", v1429?.soc ?? v1422.soc ?? "—", "%", "", "chgSoc"), v976.tile("充电功率", v1443(v1429?.w) === null ? "—" : Math.round(v1443(v1429?.w)), "W", "", "chgPower"), v976.tile("电压", v1441(v1429?.v), "V", "", "chgVolt"), v976.tile("电流", v1441(v1443(v1429?.a)), "A", "", "chgAmp"), v976.tile("已充电", v1437 ?? "—"), v976.tile(v1426 ? "恢复采样点" : "采样点", v1439, "条"), v976.tile(v1426 ? "恢复记录跨度" : "记录跨度", v1438 === null ? "—" : v981.minutesShort(v1438)), v976.tile("开始充电", v1430 ? window.CHG.fmtTime(v1430) : "—")].join("");
      const v1445 = "\n      " + v1016(scope) + "\n      " + (v1431 ? "<div class=\"note info\">" + v982.icon("info", 18) + "<div>当前是<b>演示数据</b>：曲线记的是这台\"模拟车\"，不是真车。</div></div>" : "") + "\n      <div class=\"chg-hero\">\n        <div class=\"big\">" + v984(v1433) + "</div>\n        <div class=\"s\">" + v984(v1434) + "</div>\n      </div>\n      <div class=\"seg-tabs\" role=\"group\" aria-label=\"显示哪些曲线\">" + v1436 + "</div>\n      <div class=\"chg-chart\" aria-label=\"充电曲线，长按查看读数\">" + v1003(v1424, v1425) + "</div>\n      <div class=\"mstats mt12 chg-live-stats\">" + v1444 + "</div>\n      " + v1025(v1423, scope.vin) + "\n      " + v976.devFold(v1440 ? "<div class=\"card-sub\">车机自报的充满时间</div>" + v984(String(v1440)) + "（单位没实证，仅供参考）" : "", v1422.charge?.expect ? "<div class=\"card-sub\">车机自报的预计充满文案</div>" + v984(v1422.charge.expect) : "") + "\n      <div class=\"field mt12\">\n        <button class=\"btn text sm\" data-act=\"chgclear\" " + (v1015(scope).clearing ? "disabled" : "") + ">清空本车充电记录</button>\n      </div>";
      const v1446 = {
        key: "charge",
        title: "充电曲线",
        sub: v1422.name || v1432?.name || "当前车辆",
        headActions: "<button class=\"iconbtn\" data-act=\"chgrefresh\" title=\"重新取一次数据\">" + v982.icon("refresh", 20) + "</button>",
        body: v1445,
        onMount: v1453 => {
          const v1454 = [...v1453.querySelectorAll("[data-metric]")];
          const v1455 = () => v1454.forEach(v1456 => {
            const v1457 = v991.has(v1456.dataset.metric);
            v1456.classList.toggle("on", v1457);
            v1456.setAttribute("aria-pressed", String(v1457));
          });
          v1454.forEach(v1458 => v1458.addEventListener("click", () => {
            if (!v976.current(scope)) {
              return;
            }
            const v1459 = window.CHG.log(scope.vin);
            const v1460 = v1459.pts;
            const v1461 = v993(v1460);
            const v1462 = v1458.dataset.metric;
            if (!v1461.some(v1464 => v1464.id === v1462)) {
              return;
            }
            if (v991.has(v1462)) {
              if (v991.size <= 1) {
                v982.toast(v979(), "至少保留一条曲线", 1800);
                v1455();
                return;
              }
              v991.delete(v1462);
            } else {
              v991.add(v1462);
            }
            v1455();
            const v1463 = v1453.querySelector(".chg-chart");
            if (v1463) {
              v1463.innerHTML = v1003(v1460, v1024(v1459));
              v1006(v1453);
            }
          }));
          v1006(v1453);
        }
      };
      return v1017("charge", v1446, v1421, scope);
    }
    function v1027(v1465, v1466, v1467, v1468 = null, v1469 = Date.now()) {
      if (v1466?.charge?.charging === true || !v1465) {
        return null;
      }
      const v1470 = v994(v1465.s);
      const v1471 = v994(v1465.e);
      if (!(v1470 > 0) || !(v1471 > v1470) || v1471 > v1469 || !(v994(v1465.n) >= 2)) {
        return null;
      }
      const v1472 = [v1465.soc0, v1465.soc1].map(v994);
      const v1473 = v1472.every(v1487 => v1487 !== null && v1487 >= 0 && v1487 <= 100) && v1472[1] > v1472[0];
      const v1474 = v1008(v1465);
      const v1475 = v994(v1465.kwh) > 0 || v994(v1474?.totalKwh) > 0;
      const v1476 = v994(v1465.avgW) > 0 || v994(v1465.peakW) > 0;
      if (!v1473 && !v1475 && !v1476) {
        return null;
      }
      const v1477 = v994(v1468?.at);
      const v1478 = v994(v1468?.soc);
      const v1479 = !!v1468 && v1477 >= v1471 && v1477 <= v1469 && (v1468.sessionId ? v1468.sessionId === (v1465.id || v1470 + "|" + v1471) : v1477 - v1471 <= 900000 && v1478 !== null && v1478 === v1472[1]);
      const v1480 = v994(v1466?.sampleAt);
      const v1481 = v1466?.charge?.full === true && v1466.charge.known !== false && v1480 !== null && v1480 >= v1471 && v1480 <= v1469 && v1480 - v1471 <= 18000000 && v1472[1] !== null && v994(v1466.soc) === v1472[1];
      const v1482 = v1479 && v1468.full === false;
      const v1483 = !v1482 && (v1481 || v1479 && v1468.full === true);
      const v1484 = v1482 ? "上次充电" : v1483 && v1469 - v1471 <= 18000000 ? "充电已完成" : v1483 || v1469 - v1471 > 18000000 ? "充电信息" : "上次充电";
      const v1485 = v1474 ? v994(v1474.totalKwh) : v994(v1465.kwh);
      const v1486 = v986.usageOf?.(v1465, v1466, v1467, v1469) || {};
      return {
        title: v1484,
        start: v1470,
        end: v1471,
        full: v1483,
        energy: v1474,
        kwh: v1485,
        usage: v1486
      };
    }
    const v1028 = "zeeho.recentcharge.expanded.v2";
    function v1029() {
      const v1488 = v976.context?.();
      const v1489 = v1488?.owner;
      return JSON.stringify([v977.vin, v1489?.id || "", v1489?.uid || ""]);
    }
    function v1030() {
      try {
        return window.Store?.getJson(window.Store.ns(v1028), {})?.[v1029()] === true;
      } catch {
        return false;
      }
    }
    async function v1031() {
      const v1490 = v976.context();
      const v1491 = v1029();
      const v1492 = window.Store.ns(v1028);
      const v1493 = window.Store.getJson(v1492, {}) || {};
      const v1494 = {
        ...v1493
      };
      delete v1494[v1491];
      v1494[v1491] = v1493[v1491] !== true;
      const v1495 = Object.entries(v1494).slice(-12);
      try {
        if (!(await window.Store.commitAsync({
          puts: {
            [v1492]: JSON.stringify(Object.fromEntries(v1495))
          }
        }))) {
          return false;
        }
        return v976.current(v1490);
      } catch {
        return false;
      }
    }
    function v1032(v1496, v1497, v1498, v1499 = null) {
      const v1500 = v1027(v1496, v1497, v1498, v1499);
      if (!v1500) {
        return "";
      }
      const v1501 = v1030();
      const v1502 = v1519 => String(Number(v1519.toFixed(1)));
      const v1503 = v976.shell?.remainingRange?.(v1498?.soc) ?? null;
      const v1504 = v994(v1498?.soc ?? v1497?.soc);
      const v1505 = v994(v1500.usage.per10);
      const v1506 = v1503 === null && v1504 !== null && v1504 > 10 && v1504 <= 100 && v1505 !== null ? Math.round((v1504 - 10) / 10 * v1505) : null;
      const v1507 = v1503 !== null ? v1503 : v1506;
      const v1508 = v1503 === null && v1506 !== null ? "剩余里程按上次充电的每 10% 行程估算。" : "";
      const v1509 = v976.batterydetail?.healthSummary?.(v986?.capacity?.(v977.vin), window.CAPBOOK?.nominal?.(v977.vin, v1497?.type || ""), {
        wrap: false
      }) || "";
      const v1510 = v1500.usage.days;
      const v1511 = v994(v1500.usage.km);
      const v1512 = [v1510 === null || v1510 === undefined ? "" : v1510 === 0 ? "不足1天" : v1510 + "天", v1511 === null ? "" : v1502(v1511) + "km"].filter(Boolean).join("·");
      const v1513 = [v1496.soc0, v1496.soc1].map(v994);
      const v1514 = v1513.every(v1520 => v1520 !== null && v1520 >= 0 && v1520 <= 100) ? v1502(v1513[0]) + "% → " + v1502(v1513[1]) + "%" : "";
      const v1515 = [v1005(v1496), v1514].filter(Boolean).join(" · ");
      const v1516 = (v1521, v1522, v1523 = "") => v982.stat(v1521, v1522, v1523, "", {
        fit: true
      });
      const v1517 = [v1500.kwh !== null && v1500.kwh >= 0 ? v1516(v1500.energy ? "充入电量（含补算）" : "实测充入电量", v1009(v1500.kwh), "kWh") : "", v994(v1496.durMin) > 0 ? v1516("充电时长", v981.minutes(v1496.durMin)) : "", v1500.usage.days !== null && v1500.usage.days !== undefined ? v1516("距上次充电", v1500.usage.days === 0 ? "不足 1 天" : v1500.usage.days + " 天") : "", v994(v1500.usage.km) !== null ? v1516("充后已行驶", v1502(v1500.usage.km), "km") : "", v994(v1500.usage.used) !== null ? v1516("充后已用电量", v1502(v1500.usage.used), "%") : "", v994(v1500.usage.per10) !== null ? v1516("每 10% 电量行驶", "约 " + v1502(v1500.usage.per10), "km") : ""].filter(Boolean);
      const v1518 = v1500.energy ? "含缺测补算，合计为估算值。" : v1500.kwh === null ? "充入电量未采集，已保留实际记录。" : "";
      return "<section class=\"card recent-charge-card\" data-recent-charge>\n      <button class=\"recent-charge-toggle\" data-act=\"recentchargetoggle\" aria-expanded=\"" + v1501 + "\" aria-controls=\"recent-charge-body\">\n        <span class=\"recent-charge-heading\"><span class=\"recent-charge-title\">" + v982.icon("bolt", 18) + "<strong>充电信息</strong></span><span class=\"card-sub\">距离上次充电" + (v1512 ? "·" + v984(v1512) : "") + "</span></span>\n        " + v982.icon("down", 20) + "\n      </button>\n      <div id=\"recent-charge-body\"" + (v1501 ? "" : " hidden") + ">\n        <div class=\"card-sub mb12\">" + v984(v1515) + "</div>\n        <div class=\"batt-summary batt-summary-card recent-charge-stats\">" + v1509 + v982.stat("预估剩余里程", v1507 === null ? "—" : "约 " + v1507, v1507 === null ? "" : "km", "", {
        fit: true
      }) + v1517.join("") + "</div>\n        " + (v1518 || v1508 ? "<div class=\"card-sub mt8\">" + v984([v1518, v1508].filter(Boolean).join(" ")) + "</div>" : "") + "\n        <div class=\"recent-charge-actions\"><button class=\"btn text sm\" data-act=\"chargehistory\">查看充电记录" + v982.icon("right", 16) + "</button></div>\n      </div>\n    </section>";
    }
    window.APP.chg = {
      recentChargeInfo: v1027,
      recentChargeCard: v1032,
      recentChargeOpen: v1030,
      toggleRecentCharge: v1031,
      chargeSheet: v1026,
      chargeHistorySheet: v1020,
      chargeHiddenSheet: v1021,
      chargeSessionSheet: v1023,
      refreshHistory: v1018,
      historyNotice: v1016,
      sessionKey: v1013,
      hiddenFoot: v1019,
      registerLive: (v1524, v1525, v1526, v1527 = "") => {
        if (v1525) {
          v1014.set(v1524, {
            handle: v1525,
            scope: v1526,
            id: v1527
          });
        }
      },
      chgRange: v1005,
      chgSocLine: v1007,
      chgEnergy: v1008,
      chgKwh: v1009,
      chgChart: v1002,
      chgMultiChart: v1003
    };
  })();
  (() => {
    const v1528 = window.APP;
    const v1529 = v1528.state;
    const v1530 = v1528.$;
    const v1531 = v1528.phone;
    const v1532 = v1528.scroll;
    const v1533 = window.MODEL;
    const v1534 = window.UI;
    const v1535 = window.ZEEHO_THEME;
    const v1536 = v1533.esc;
    const v1537 = window.API;
    const v1538 = window.CHG;
    const v1539 = window.TASKS;
    const v1540 = {
      kind: "",
      seq: 0,
      cache: {},
      loading: false,
      postCursor: "",
      postMore: false,
      tab: "integral",
      prizePage: 1,
      prizeMore: false
    };
    const v1541 = 10;
    const v1542 = "https://h5.zeehoev.com/cfmotoservermine/H5/signin/prizesDetail";
    const v1543 = {
      integral: "积分明细",
      posts: "我的发帖",
      likes: "我的点赞",
      fans: "我的粉丝",
      follows: "我的关注",
      signin: "签到情况",
      green: "碳贡献"
    };
    const v1544 = () => v1534.sheetAlive(v1534.currentSheet?.("social"));
    function v1545(v1563) {
      const v1564 = v1563.imgs || [];
      if (!v1564.length) {
        if (v1563.kind === "video" && v1563.cover) {
          return "<div class=\"post-media single\"><img src=\"" + v1536(v1563.cover) + "\" alt=\"\" loading=\"lazy\" decoding=\"async\" onerror=\"this.closest('.post-media').remove()\"><span class=\"post-play\">" + v1534.icon("play", 26) + "</span></div>";
        }
        return "";
      }
      const v1565 = v1564.length === 1 ? "single" : v1564.length === 2 ? "two" : "grid";
      const v1566 = v1564.slice(0, 9);
      return "<div class=\"post-media " + v1565 + "\">" + v1566.map((v1567, v1568) => "\n      <img src=\"" + v1536(v1567.url) + "\" alt=\"\" loading=\"lazy\" decoding=\"async\"\n        data-act=\"postImage\" data-src=\"" + v1536(v1567.url) + "\" title=\"点开看大图\"\n        onerror=\"this.classList.add('broken')\">").join("") + "\n      " + (v1564.length > 9 ? "<span class=\"post-more-n\">+" + (v1564.length - 9) + "</span>" : "") + "\n    </div>";
    }
    function v1546(v1569, v1570 = {}) {
      const v1571 = v1570.deletable && v1569.id ? "<button class=\"iconbtn sm post-del\" data-act=\"postDelete\" data-id=\"" + v1536(v1569.id) + "\"\n           title=\"删除这条动态\" aria-label=\"删除这条动态\">" + v1534.icon("trash", 17) + "</button>" : "";
      const v1572 = [v1569.time ? v1536(v1569.time) : "", v1569.showViews && v1569.views !== null ? v1569.views + " 浏览" : "", v1569.likes !== null ? v1569.likes + " 赞" : "", v1569.comments !== null ? v1569.comments + " 评论" : ""].filter(Boolean).join(" · ");
      const v1573 = v1569.topic ? "<span class=\"post-topic\">#" + v1536(v1569.topic) + "#</span>" : "";
      const v1574 = v1569.likeNote ? "<div class=\"post-quote\">我的点赞附言：" + v1536(v1569.likeNote) + "</div>" : "";
      return "<article class=\"post" + (v1570.deletable ? " mine" : "") + "\" data-post=\"" + v1536(v1569.id) + "\">\n      <div class=\"post-head\">\n        <span class=\"post-avatar\">" + v1534.icon("user", 18) + (v1569.avatar ? "<img src=\"" + v1536(v1569.avatar) + "\" alt=\"\" loading=\"lazy\" onerror=\"this.remove()\">" : "") + "</span>\n        <div class=\"post-who\">\n          <div class=\"post-nick\">" + v1536(v1569.author || "我") + "</div>\n          <div class=\"post-time\">" + v1573 + (v1572 ? "<span>" + v1572 + "</span>" : "") + "</div>\n        </div>\n        " + v1571 + "\n      </div>\n      " + (v1569.title && v1569.title !== v1569.text ? "<div class=\"post-title\">" + v1536(v1569.title) + "</div>" : "") + "\n      " + (v1569.text ? "<div class=\"post-text\">" + v1536(v1569.text) + "</div>" : "") + "\n      " + v1574 + "\n      " + v1545(v1569) + "\n    </article>";
    }
    function v1547(v1575) {
      return "<div class=\"person\">\n      <span class=\"person-avatar\">" + v1534.icon("user", 18) + (v1575.avatar ? "<img src=\"" + v1536(v1575.avatar) + "\" alt=\"\" loading=\"lazy\" onerror=\"this.remove()\">" : "") + "</span>\n      <div class=\"person-main\">\n        <div class=\"person-nick\"><span>" + v1536(v1575.nick) + "</span>" + (v1575.consultant ? "<span class=\"person-tag\">官方</span>" : "") + "</div>\n        " + (v1575.memo && v1575.memo !== v1575.nick ? "<div class=\"person-memo\">备注：" + v1536(v1575.memo) + "</div>" : "") + "\n      </div>\n    </div>";
    }
    function v1548(v1576) {
      return "<div class=\"chg-empty\">" + v1536(v1576) + "</div>";
    }
    function v1549(v1577 = "正在取数据…") {
      return v1534.spinner(v1577, {
        block: true
      });
    }
    function v1550(v1578) {
      if (!v1543[v1578]) {
        return;
      }
      v1540.kind = v1578;
      v1540.seq++;
      v1540.cache = {};
      v1540.postCursor = "";
      v1540.postMore = false;
      v1540.tab = "integral";
      v1540.prizePage = 1;
      v1540.prizeMore = false;
      if (v1578 === "signin" || v1578 === "green") {
        v1534.sheet(v1531(), {
          key: "social",
          title: v1543[v1578],
          half: true,
          body: "<div class=\"social-loading\">正在整理…</div>"
        });
        v1558(v1578);
        return;
      }
      if (!v1529.profileUid) {
        v1551(v1578);
        return;
      }
      v1534.sheet(v1531(), {
        key: "social",
        title: v1543[v1578],
        sub: "正在取…",
        half: true,
        body: "<div class=\"social-loading\">" + v1549() + "</div>",
        onMount: () => v1552(v1578)
      });
    }
    function v1551(v1579) {
      v1534.sheet(v1531(), {
        key: "social",
        title: v1543[v1579],
        sub: "账号信息暂不可用",
        half: true,
        body: "<div class=\"card-sub\">重新保存一次登录信息即可恢复。</div>"
      });
    }
    function v1552(v1580) {
      if (v1580 === "posts") {
        v1557(true);
      } else {
        v1556(v1580);
      }
    }
    async function v1553(v1581, v1582) {
      if (v1537.source === "demo") {
        if (window.ZEEHO_MOCK_READY) {
          await window.ZEEHO_MOCK_READY().catch(() => null);
        }
        if (v1582 && !v1582()) {
          return {
            ok: false,
            stale: true
          };
        }
        const v1589 = window.ZEEHO_MOCK?.prizes_detail;
        if (!v1589) {
          return {
            ok: false,
            message: "演示数据里没有盲盒明细"
          };
        }
        const v1590 = Array.isArray(v1589.data) ? v1589.data : [];
        const v1591 = (v1581 - 1) * v1541;
        return {
          ok: true,
          data: v1590.slice(v1591, v1591 + v1541)
        };
      }
      const v1583 = {
        page: String(v1581),
        pageSize: String(v1541)
      };
      const {
        headers: v1584
      } = window.ZEEHO_SIGN.buildH5BoxHeaders(v1583, v1537.token);
      const v1585 = window.ZEEHO_SIGN.toQuery(v1583);
      const v1586 = await v1537.fetchDiag("h5_prizes_detail", v1542 + "?" + v1585, {
        method: "GET",
        headers: v1584
      }, {
        isLatest: v1582
      });
      if (v1582 && !v1582()) {
        return {
          ok: false,
          stale: true
        };
      }
      let v1587 = null;
      try {
        v1587 = JSON.parse(v1586.text);
      } catch {}
      const v1588 = v1537.isAuthError(v1586.status, v1587?.code, v1587?.message);
      if (v1588) {
        return {
          ok: false,
          auth: true,
          message: "登录态已失效，请重新填 token"
        };
      }
      if (v1586.status !== 200 || !v1587) {
        return {
          ok: false,
          message: "HTTP " + v1586.status + "（网关或维护页）"
        };
      }
      if (String(v1587.code) !== "10000") {
        return {
          ok: false,
          code: v1587.code,
          message: v1587.message || "接口返回 " + v1587.code
        };
      }
      return {
        ok: true,
        data: v1587.data,
        raw: v1587
      };
    }
    async function v1554(v1592) {
      const v1593 = "integral";
      const v1594 = "prizes";
      if (v1540.loading) {
        return;
      }
      const v1595 = ++v1540.seq;
      v1540.loading = true;
      if (v1592) {
        v1540.prizePage = 1;
        v1540.prizeMore = false;
        v1540.cache.prizes = null;
      }
      if (v1592) {
        v1558(v1593);
      } else {
        const v1598 = v1531()?.querySelector("[data-act=\"socialprizemore\"]");
        if (v1598) {
          v1598.disabled = true;
          v1598.setAttribute("aria-busy", "true");
          v1598.textContent = "正在载入…";
        }
        const v1599 = v1531()?.querySelector("[data-prize-status]");
        if (v1599) {
          v1599.textContent = "正在载入更多盲盒明细";
        }
      }
      const v1596 = () => v1595 === v1540.seq && v1540.kind === v1593 && v1540.tab === v1594 && v1544();
      const v1597 = v1592 ? 1 : v1540.prizePage + 1;
      try {
        const v1600 = await v1553(v1597, v1596);
        if (!v1596()) {
          return;
        }
        if (v1600.stale) {
          return;
        }
        if (!v1600.ok) {
          v1540.loading = false;
          if (v1592 || !v1540.cache.prizes) {
            return v1558(v1593, {
              error: v1600.message || "盲盒明细没取到"
            });
          }
          v1534.toast(v1531(), "加载更多失败：" + (v1600.message || "服务端拒绝了这次请求"), 3000);
          return v1558(v1593);
        }
        const v1601 = v1533.prizeDetails(v1600, v1597, v1541);
        if (v1592) {
          v1540.cache.prizes = v1601;
        } else {
          const v1602 = v1540.cache.prizes?.rows || [];
          const v1603 = new Set(v1602.map(v1605 => v1605.id));
          const v1604 = v1602.concat(v1601.rows.filter(v1606 => v1606.id && !v1603.has(v1606.id)));
          v1540.cache.prizes = {
            ...v1601,
            rows: v1604,
            count: v1604.length
          };
        }
        v1540.prizePage = v1597;
        v1540.prizeMore = v1601.count >= v1541;
        v1540.loading = false;
        v1558(v1593);
      } catch (v1607) {
        if (!v1596()) {
          return;
        }
        v1540.loading = false;
        v1558(v1593, {
          error: "请求失败：" + v1607.message
        });
      }
    }
    function v1555(v1608) {
      if (v1608 !== "integral" && v1608 !== "prizes") {
        return;
      }
      if (v1540.kind !== "integral" || v1540.tab === v1608) {
        return;
      }
      v1540.tab = v1608;
      v1540.seq++;
      v1540.loading = false;
      v1558("integral");
      if (v1608 === "prizes" && !v1540.cache.prizes) {
        v1554(true);
      } else if (v1608 === "integral" && !v1540.cache.integral) {
        v1556("integral");
      }
    }
    async function v1556(v1609) {
      const v1610 = ++v1540.seq;
      v1540.loading = true;
      const v1611 = () => v1610 === v1540.seq && v1540.kind === v1609 && v1544();
      const v1612 = v1613 => {
        if (!v1611()) {
          return;
        }
        v1540.loading = false;
        v1558(v1609, {
          error: v1613
        });
      };
      try {
        if (v1609 === "integral") {
          const v1614 = await v1537.call("integral_total", {}, {
            isLatest: v1611
          });
          if (!v1611()) {
            return;
          }
          const v1615 = v1533.s(v1537.lastRaw.integral_total?.data?.uuid ?? v1529.data.user?.uuid);
          if (!v1615) {
            return v1612("没取到积分账户 ID（积分接口没返回 uuid）");
          }
          const v1616 = await v1537.call("integral_detail", {
            uid: v1529.profileUid,
            integralId: v1615
          }, {
            isLatest: v1611
          });
          if (!v1611()) {
            return;
          }
          if (!v1616.ok) {
            return v1612(v1616.message || "积分明细没取到");
          }
          v1540.cache.integral = v1533.integralDetails(v1616);
        } else if (v1609 === "likes") {
          const v1617 = await v1537.call("mine_like", {
            uid: v1529.profileUid
          }, {
            isLatest: v1611
          });
          if (!v1611()) {
            return;
          }
          if (!v1617.ok) {
            return v1612(v1617.message || "点赞列表没取到");
          }
          v1540.cache.likes = v1533.likeInfo(v1617);
        } else if (v1609 === "fans") {
          const v1618 = await v1537.call("mine_fans", {
            uid: v1529.profileUid
          }, {
            isLatest: v1611
          });
          if (!v1611()) {
            return;
          }
          if (!v1618.ok) {
            return v1612(v1618.message || "粉丝列表没取到");
          }
          v1540.cache.fans = v1533.fansList(v1618);
        } else if (v1609 === "follows") {
          const v1619 = await v1537.call("mine_follows", {
            uid: v1529.profileUid
          }, {
            isLatest: v1611
          });
          if (!v1611()) {
            return;
          }
          if (!v1619.ok) {
            return v1612(v1619.message || "关注列表没取到");
          }
          v1540.cache.follows = v1533.fansList(v1619);
        }
        v1540.loading = false;
        v1558(v1609);
      } catch (v1620) {
        v1612("请求失败：" + v1620.message);
      }
    }
    async function v1557(v1621) {
      const v1622 = "posts";
      const v1623 = ++v1540.seq;
      v1540.loading = true;
      const v1624 = () => v1623 === v1540.seq && v1540.kind === v1622 && v1544();
      if (v1621) {
        v1540.cache.posts = null;
        v1540.postCursor = "";
        v1540.postMore = false;
      }
      try {
        const v1625 = {
          uid: v1529.profileUid,
          cursor: v1621 ? "" : v1540.postCursor
        };
        const v1626 = await v1537.call(v1621 ? "mine_article" : "mine_article_more", v1625, {
          isLatest: v1624
        });
        if (!v1624()) {
          return;
        }
        if (!v1626.ok) {
          v1540.loading = false;
          return v1558(v1622, {
            error: v1626.message || "我的发帖没取到"
          });
        }
        const v1627 = v1533.myArticles(v1626);
        const v1628 = v1621 ? [] : v1540.cache.posts?.rows || [];
        const v1629 = new Set(v1628.map(v1631 => v1631.id));
        const v1630 = v1628.concat(v1627.rows.filter(v1632 => v1632.id && !v1629.has(v1632.id)));
        v1540.cache.posts = {
          ok: true,
          rows: v1630,
          count: v1630.length
        };
        v1540.postCursor = v1627.cursor || "";
        v1540.postMore = !!v1627.cursor && v1627.count >= 20;
        v1540.loading = false;
        v1558(v1622);
      } catch (v1633) {
        if (!v1624()) {
          return;
        }
        v1540.loading = false;
        v1558(v1622, {
          error: "请求失败：" + v1633.message
        });
      }
    }
    function v1558(v1634, v1635 = {}) {
      if (!v1534.sheetAlive(v1534.currentSheet?.("social"))) {
        return;
      }
      const v1636 = v1543[v1634] || "明细";
      let v1637 = "";
      let v1638 = "";
      if (v1635.error) {
        v1637 = "<div class=\"note warn\">" + v1534.icon("info", 18) + "<div>" + v1536(v1635.error) + "</div></div>\n        <div class=\"field mt12\"><button class=\"btn tonal block\" data-act=\"socialRefresh\" data-kind=\"" + v1634 + "\">先重试一次</button></div>";
      } else if (v1634 === "signin") {
        const v1639 = v1529.data.signin?.data || {};
        const v1640 = [...(v1639.nowSignDetailVos || [])];
        const v1641 = [...(v1639.beforeSignDetailVos || [])];
        const v1642 = [...(v1639.afterSignDetailVos || [])];
        const v1643 = [...v1641, ...v1640, ...v1642];
        v1638 = (v1639.signCount ?? "—") + " 天连签";
        const v1644 = v1643.map(v1646 => {
          const v1647 = String(v1646.createDate || "").slice(-2);
          const v1648 = v1533.signDayClass(v1646.signStatue);
          const v1649 = v1646.integralScore === null || v1646.integralScore === undefined ? "" : "+" + v1646.integralScore;
          return "<div class=\"sign-day " + v1648 + "\" title=\"" + v1536(v1646.createDate) + (v1649 ? " · " + v1649 + " 分" : "") + "\">\n          <b>" + v1536(v1647) + "</b>" + (v1649 ? "<i>" + v1536(v1649) + "</i>" : "") + "</div>";
        }).join("");
        const v1645 = "<div class=\"sign-legend\">\n        <span><i class=\"d on\"></i>已签到</span><span><i class=\"d gift\"></i>有盲盒</span>\n        <span><i class=\"d supp\"></i>可补签</span><span><i class=\"d miss\"></i>未签到</span>\n        <span><i class=\"d future\"></i>未到/未知</span></div>";
        v1637 = "<div class=\"grid2\">\n        " + v1534.stat("连签天数", v1639.signCount ?? "—", "天") + "\n        " + v1534.stat("本次得分", v1639.integral ?? "—", "分") + "\n      </div>\n      " + (v1643.length ? "<div class=\"sign-cal\">" + v1644 + "</div>" + v1645 : "<div class=\"card-sub mt12\">这个月还没有签到记录。</div>") + "\n      <div class=\"card-sub mt12\">签到入口在<b>任务面板</b>（用户属性卡右上角「任务」）。</div>";
      } else if (v1634 === "green") {
        v1637 = "<div class=\"grid2\">" + v1534.stat("碳贡献", v1529.data.home?.green ?? "—", "kg") + "</div>\n        <div class=\"card-sub mt12\">碳贡献由车况接口给出，累计自骑行里程换算。</div>";
        v1638 = "来自车况接口";
      } else if (v1634 === "integral") {
        const v1650 = "";
        if (v1540.tab === "prizes") {
          const v1651 = v1540.cache.prizes;
          if (!v1651) {
            v1637 = v1650 + v1549("正在取盲盒明细…");
          } else {
            v1638 = "共 " + v1651.count + " 条";
            const v1652 = v1651.rows.map(v1653 => "\n            <div class=\"prize-row\">\n              " + (v1653.img ? "<span class=\"prize-img\"><img src=\"" + v1536(v1653.img) + "\" alt=\"\" loading=\"lazy\" decoding=\"async\" onerror=\"this.parentNode.classList.add('broken')\"></span>" : "<span class=\"prize-img broken\">" + v1534.icon("box", 20) + "</span>") + "\n              <div class=\"prize-main\">\n                <div class=\"prize-name\">" + v1536(v1653.name) + "</div>\n                <div class=\"prize-time\">" + v1536(v1653.time) + "</div>\n              </div>\n              <span class=\"chip " + (v1653.sent ? "ok" : "info") + "\">" + (v1653.sent ? "已发放" : "已获取") + "</span>\n            </div>").join("");
            v1637 = v1650 + (v1651.rows.length ? "<div class=\"prize-list\">" + v1652 + "</div>\n               " + (v1540.prizeMore ? "<div class=\"field mt12\"><button class=\"btn tonal block\" data-act=\"socialprizemore\"\n                     aria-busy=\"" + v1540.loading + "\" " + (v1540.loading ? "disabled" : "") + ">" + (v1540.loading ? "正在载入…" : "加载更多") + "</button></div>" : "<div class=\"card-sub mt12\">已经到底了。</div>") : v1548("还没有抽到过盲盒"));
          }
        } else {
          const v1654 = v1540.cache.integral;
          if (!v1654) {
            v1637 = v1650 + v1549("正在取积分明细…");
          } else {
            v1638 = "最近 " + v1654.count + " 条 · 合计 +" + v1654.gained + " 分";
            v1637 = v1650 + ("<div class=\"card-sub\">接口只按页大小返回最新一批（" + v1654.count + " 条），不支持翻页；更早的记录请到极核 App 里看。</div>\n            <div class=\"detail-list\">" + (v1654.rows.map(v1655 => "<div class=\"detail-row\">\n              <div class=\"detail-main\"><div class=\"detail-name\">" + v1536(v1655.name) + "</div><div class=\"detail-time\">" + v1536(v1655.time) + "</div></div>\n              <div class=\"detail-val " + (v1655.score >= 0 ? "plus" : "minus") + " tnum\">" + (v1655.score >= 0 ? "+" : "") + v1655.score + "</div>\n            </div>").join("") || v1548("还没有积分明细")) + "</div>");
          }
        }
      } else if (v1634 === "likes") {
        const v1656 = v1540.cache.likes;
        if (!v1656) {
          v1637 = v1549("正在取点赞列表…");
        } else {
          v1638 = v1656.count + " 条";
          v1637 = v1656.rows.length ? "<div class=\"post-list\">" + v1656.rows.map(v1657 => v1546(v1657)).join("") + "</div>" : v1548("还没有点赞过任何动态");
        }
      } else if (v1634 === "posts") {
        const v1658 = v1540.cache.posts;
        v1638 = v1658 ? v1658.count + " 条" : "正在取…";
        if (!v1658) {
          v1637 = v1549("正在取我的发帖…");
        } else {
          v1637 = "<div class=\"card-sub\">点右上角垃圾桶可以删帖（会二次确认）。删帖是真删除，删了找不回来。</div>\n          <div class=\"post-list\">" + (v1658.rows.map(v1659 => v1546(v1659, {
            deletable: true
          })).join("") || v1548("还没有发过动态")) + "</div>\n          " + (v1540.postMore ? "<div class=\"field mt12\"><button class=\"btn tonal block\" data-act=\"socialMore\">\n            " + (v1540.loading ? "正在载入…" : "加载更早的帖子") + "</button></div>" : v1658.rows.length ? "<div class=\"card-sub mt12\">已经到底了。</div>" : "");
        }
      } else if (v1634 === "fans" || v1634 === "follows") {
        const v1660 = v1540.cache[v1634];
        if (!v1660) {
          v1637 = v1549(v1634 === "fans" ? "正在取粉丝…" : "正在取关注…");
        } else {
          v1638 = v1660.count + " 人";
          v1637 = v1660.rows.length ? "<div class=\"person-list\">" + v1660.rows.map(v1547).join("") + "</div>\n             " + (v1660.count >= 20 ? "<div class=\"card-sub mt12\">只列了前 20 位；更多请到极核 App 里看。</div>" : "") : v1548(v1634 === "fans" ? "还没有粉丝" : "还没有关注任何人");
        }
      }
      if (v1634 === "integral") {
        const v1661 = "<div class=\"seg-tabs\" role=\"tablist\" aria-label=\"积分明细类型\">\n        " + [["integral", "积分明细"], ["prizes", "盲盒明细"]].map(([v1662, v1663]) => "<button class=\"seg-btn" + (v1540.tab === v1662 ? " on" : "") + "\" type=\"button\" role=\"tab\"\n            id=\"social-tab-" + v1662 + "\" aria-controls=\"social-panel-" + v1662 + "\" tabindex=\"" + (v1540.tab === v1662 ? "0" : "-1") + "\"\n            aria-selected=\"" + (v1540.tab === v1662) + "\" data-act=\"socialtab\" data-v=\"" + v1662 + "\">" + v1663 + "</button>").join("") + "\n      </div>";
        v1637 = v1661 + ["integral", "prizes"].map(v1664 => "<div role=\"tabpanel\" id=\"social-panel-" + v1664 + "\"\n        aria-labelledby=\"social-tab-" + v1664 + "\" tabindex=\"0\" " + (v1540.tab === v1664 ? "" : "hidden") + ">" + (v1540.tab === v1664 ? v1637 : "") + "</div>").join("") + "<div class=\"card-sub\" role=\"status\" aria-live=\"polite\" data-prize-status></div>";
      }
      v1534.sheet(v1531(), {
        key: "social",
        title: v1636,
        sub: v1638,
        half: true,
        body: v1637,
        onMount(v1665) {
          v1665.querySelectorAll("[role=\"tab\"]").forEach(v1666 => v1666.addEventListener("keydown", v1667 => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(v1667.key)) {
              return;
            }
            v1667.preventDefault();
            const v1668 = v1667.key === "Home" ? "integral" : v1667.key === "End" ? "prizes" : v1666.dataset.v === "integral" ? "prizes" : "integral";
            v1555(v1668);
            queueMicrotask(() => v1531()?.querySelector("#social-tab-" + v1668)?.focus({
              preventScroll: true
            }));
          }));
        },
        headActions: v1634 === "posts" ? "<button class=\"iconbtn sm\" data-act=\"socialDetail\" data-kind=\"likes\" title=\"我的点赞\" aria-label=\"我的点赞\">" + v1534.icon("heart", 16) + "</button>\n           <button class=\"iconbtn sm\" data-act=\"socialRefresh\" data-kind=\"posts\" title=\"重新取一次\">" + v1534.icon("refresh", 16) + "</button>" : v1634 === "likes" ? "<button class=\"iconbtn sm\" data-act=\"socialRefresh\" data-kind=\"likes\" title=\"重新取一次\">" + v1534.icon("refresh", 16) + "</button>" : v1634 === "integral" ? "<button class=\"iconbtn sm\" data-act=\"socialRefresh\" data-kind=\"integral\"\n                 title=\"" + (v1540.tab === "prizes" ? "重新取盲盒明细" : "重新取积分明细") + "\">" + v1534.icon("refresh", 16) + "</button>" : ""
      });
    }
    async function v1559(v1669, v1670) {
      if (!v1669) {
        return;
      }
      if (v1670.dataset.arm !== "1") {
        v1670.dataset.arm = "1";
        v1670.classList.add("armed");
        v1670.title = "再点一次确认删除";
        v1534.toast(v1531(), "再点一次确认删除这条动态", 2600);
        setTimeout(() => {
          if (v1670.dataset.arm === "1") {
            v1670.dataset.arm = "";
            v1670.classList.remove("armed");
            v1670.title = "删除这条动态";
          }
        }, 3000);
        return;
      }
      v1670.dataset.arm = "";
      v1670.classList.remove("armed");
      v1670.disabled = true;
      const v1671 = v1540.kind;
      const v1672 = ++v1540.seq;
      try {
        const v1673 = await v1537.call("post_delete", {
          postId: v1669
        }, {
          method: "DELETE"
        });
        if (v1672 !== v1540.seq || v1540.kind !== v1671) {
          return;
        }
        if (v1673.ok) {
          const v1674 = v1540.cache[v1671];
          if (v1674?.rows) {
            v1674.rows = v1674.rows.filter(v1675 => v1675.id !== v1669);
          }
          if (v1674) {
            v1674.count = v1674.rows.length;
          }
          v1534.toast(v1531(), "已删除", 1600);
          v1558(v1671);
          setTimeout(() => {
            if (v1540.kind !== v1671) {
              return;
            }
            if (!v1534.sheetAlive(v1534.currentSheet?.("social"))) {
              return;
            }
            v1557(true);
          }, 6000);
        } else {
          v1670.disabled = false;
          v1534.toast(v1531(), "删除失败：" + (v1673.message || "服务端拒绝了这次删除"), 3200);
        }
      } catch (v1676) {
        v1670.disabled = false;
        v1534.toast(v1531(), "删除失败：" + v1676.message, 3200);
      }
    }
    function v1560() {
      const v1677 = document.querySelector(".img-lightbox");
      if (v1677) {
        v1677.remove();
      }
    }
    function v1561(v1678) {
      v1560();
      const v1679 = v1531();
      if (!v1679) {
        return;
      }
      const v1680 = document.createElement("button");
      v1680.type = "button";
      v1680.setAttribute("aria-label", "关闭大图");
      v1680.className = "img-lightbox";
      v1680.innerHTML = "<img src=\"" + v1536(v1678) + "\" alt=\"\">";
      v1680.addEventListener("click", v1681 => {
        if (v1681.target === v1680 || v1681.target.tagName === "IMG") {
          v1560();
        }
      });
      v1680.addEventListener("keydown", v1682 => {
        if (v1682.key === "Escape") {
          v1682.preventDefault();
          v1682.stopPropagation();
          v1560();
        }
      });
      v1679.appendChild(v1680);
      requestAnimationFrame(() => {
        v1680.classList.add("show");
        v1680.focus();
      });
    }
    const v1562 = () => v1528.domainMigration?.card?.() || "";
    window.APP.profile = {
      domainMigrationCard: v1562,
      openSocialDetail: v1550,
      postImageSheet: v1561,
      deletePostConfirmed: v1559,
      loadMyPosts: v1557,
      refreshSocialDetail: v1556,
      switchIntegralTab: v1555,
      loadPrizes: v1554,
      SOCIAL: v1540
    };
  })();
  (() => {
    const v1683 = window.APP;
    const v1684 = window.UI;
    const v1685 = window.MODEL;
    const v1686 = "zeeho.token";
    const v1687 = "zeeho.dash";
    const v1688 = "zeeho.demo";
    const v1689 = "zeeho.migration.revision.v1";
    const v1690 = new Set(["https://lswlc33.github.io", "https://zhb.xn--fiqz59cpva341l.top", "https://zhbw.xn--fiqz59cpva341l.top"]);
    const v1691 = () => !!window.ZeehoShell || !!window.Store?.isNative?.();
    const v1692 = () => {
      if (v1691()) {
        return false;
      }
      try {
        const v1729 = new URL(window.location.href);
        return v1690.has(v1729.origin) && v1729.pathname === (v1729.origin === "https://lswlc33.github.io" ? "/zeeho-3d-models/" : "/");
      } catch {
        return false;
      }
    };
    let v1693 = null;
    let v1694 = null;
    let v1695 = 0;
    let v1696 = false;
    const v1697 = () => !v1691() && !!window.__zeehoMigrationQuiet;
    const v1698 = () => {
      if (!v1691()) {
        window.__zeehoMigrationQuiet = true;
      }
    };
    const v1699 = (v1730, v1731) => Object.keys(v1730).every(v1732 => v1730[v1732] === v1731[v1732]);
    function v1700() {
      const v1733 = window.localStorage;
      return {
        revision: v1733.getItem(v1689),
        token: v1733.getItem(v1686),
        dash: v1733.getItem(v1687)
      };
    }
    function v1701() {
      if (!v1692() || v1697()) {
        return true;
      }
      try {
        v1693 = v1700();
        return true;
      } catch {
        v1698();
        return false;
      }
    }
    function v1702() {
      if (!v1696) {
        v1696 = true;
        window.location.reload();
      }
    }
    function v1703() {
      if (!v1692()) {
        return true;
      }
      if (v1697()) {
        return false;
      }
      try {
        const v1734 = {
          ...v1693,
          token: window.API?.ready ? window.API.token || null : v1693?.token
        };
        if (!v1693 || !v1699(v1700(), v1734)) {
          v1698();
          v1702();
          return false;
        }
        return true;
      } catch {
        v1698();
        return false;
      }
    }
    function v1704() {
      if (v1692() && !v1697()) {
        v1701();
      }
    }
    function v1705() {
      if (!v1692() || v1697() || !v1693) {
        return;
      }
      try {
        if (window.localStorage.getItem(v1689) !== v1693.revision) {
          v1698();
          v1702();
        }
      } catch {
        v1698();
      }
    }
    const v1706 = v1735 => !!v1735 && typeof v1735 === "object" && !Array.isArray(v1735);
    const v1707 = 1048576;
    const v1708 = 20;
    function v1709(v1736) {
      for (let v1737 = 0; v1737 < v1736.length; v1737++) {
        const v1738 = v1736.charCodeAt(v1737);
        if (v1738 >= 55296 && v1738 <= 56319) {
          const v1739 = v1736.charCodeAt(++v1737);
          if (!(v1739 >= 56320) || !(v1739 <= 57343)) {
            return false;
          }
        } else if (v1738 >= 56320 && v1738 <= 57343) {
          return false;
        }
      }
      return true;
    }
    function v1710(v1740, v1741 = "userid") {
      if (!v1706(v1740) || Object.getPrototypeOf(v1740) !== Object.prototype || Object.keys(v1740).length !== 2 || !Object.hasOwn(v1740, v1741) || !Object.hasOwn(v1740, "token") || typeof v1740[v1741] !== "string" || !v1740[v1741].trim() || v1740[v1741].length > 128 || !v1709(v1740[v1741]) || /[\u0000-\u001f\u007f]/.test(v1740[v1741]) || typeof v1740.token !== "string" || !v1740.token.trim() || v1740.token.length > 8192 || !v1709(v1740.token) || /[\r\n\0]/.test(v1740.token)) {
        throw Error("format");
      }
      return {
        userId: v1740[v1741],
        token: v1740.token
      };
    }
    function v1711(v1742) {
      if (typeof v1742 !== "string" || v1742.length > v1707 || new TextEncoder().encode(v1742).byteLength > v1707 || !v1709(v1742)) {
        throw Error("size");
      }
      const v1743 = JSON.parse(v1742);
      if (Array.isArray(v1743)) {
        if (!v1743.length || v1743.length > v1708) {
          throw Error("size");
        }
        return {
          ...v1710(v1743[0]),
          count: v1743.length
        };
      }
      return {
        ...v1710(v1743, "userId"),
        count: 1
      };
    }
    function v1712(v1744) {
      const v1745 = v1744 === null ? {} : JSON.parse(v1744);
      if (!v1706(v1745)) {
        throw Error("prefs");
      }
      return v1745;
    }
    function v1713() {
      const v1746 = window.localStorage;
      const v1747 = v1746.getItem(v1686);
      const v1748 = v1712(v1746.getItem(v1687));
      const v1749 = v1710({
        userid: v1748.profileUid,
        token: v1747
      });
      const v1750 = JSON.stringify([{
        token: v1749.token,
        userid: v1749.userId
      }]);
      v1711(v1750);
      return v1750;
    }
    function v1714() {
      return {
        ...v1700(),
        demo: window.localStorage.getItem(v1688)
      };
    }
    function v1715(v1751) {
      if (v1694 !== v1751) {
        return;
      }
      v1695++;
      v1751.value = null;
      v1751.before = null;
      v1751.failureImage = null;
      v1751.text = "";
      v1694 = null;
    }
    function v1716(v1752) {
      if (v1694 !== v1752) {
        return;
      }
      if (!v1752.suspended) {
        v1715(v1752);
        return;
      }
      if (v1752.restored) {
        v1715(v1752);
        v1702();
        return;
      }
      try {
        if (v1752.failureImage && v1699(v1714(), v1752.failureImage) && v1725(v1752.before)) {
          v1715(v1752);
          v1702();
          return;
        }
      } catch {}
      v1752.handle = null;
      const v1753 = v1695;
      setTimeout(() => {
        if (v1694 === v1752 && v1695 === v1753 && v1692() && v1752.href === window.location.href && v1752.tab === v1683.state?.tab) {
          v1752.rescue?.();
        }
      }, 0);
    }
    const v1717 = v1754 => v1694 === v1754 && v1754.epoch === v1695 && v1692() && v1754.href === window.location.href && v1754.tab === v1683.state?.tab && v1684.sheetAlive(v1754.handle);
    function v1718(v1755, v1756, v1757, v1758 = [], v1759 = null) {
      const v1760 = "<div class=\"field\" role=\"status\">" + v1685.esc(v1757) + "</div>" + (v1759 === null ? "" : "<div class=\"field\"><textarea data-account-text rows=\"6\" aria-label=\"账号备份内容\" spellcheck=\"false\" autocomplete=\"off\"" + (v1755.mode === "copy" ? " readonly" : "") + "></textarea></div>") + "\n      " + v1758.map((v1762, v1763) => "<div class=\"field\"><button type=\"button\" class=\"btn " + (v1763 ? "text" : "tonal") + " block\" data-account-button=\"" + v1763 + "\">" + v1685.esc(v1762.label) + "</button></div>").join("");
      const v1761 = {
        title: v1756,
        body: v1760,
        onMount(v1764) {
          v1755.root = v1764;
          if (v1759 !== null) {
            v1764.querySelector("[data-account-text]").value = v1759;
          }
          v1758.forEach((v1765, v1766) => v1764.querySelector("[data-account-button=\"" + v1766 + "\"]")?.addEventListener("click", () => {
            if (v1717(v1755)) {
              v1765.run();
            }
          }));
        }
      };
      if (v1755.handle) {
        if (v1717(v1755)) {
          v1684.updateSheet(v1755.handle, v1761);
        }
      } else {
        v1755.handle = v1684.sheet(v1683.phone(), {
          ...v1761,
          key: "account-backup",
          onDismiss: () => v1716(v1755)
        });
      }
    }
    function v1719(v1767) {
      if (!v1692() || v1697()) {
        return null;
      }
      if (v1694 && v1717(v1694)) {
        return null;
      }
      if (v1694) {
        v1715(v1694);
      }
      const v1768 = {
        mode: v1767,
        epoch: ++v1695,
        href: window.location.href,
        tab: v1683.state?.tab,
        handle: null,
        value: null,
        before: null,
        text: ""
      };
      v1694 = v1768;
      v1718(v1768, "账号备份与恢复", v1767 === "copy" ? "正在复制账号备份…" : "正在读取账号备份…", [{
        label: "取消",
        run: () => v1684.back()
      }]);
      return v1768;
    }
    function v1720(v1769) {
      v1718(v1769, "手动复制账号备份", "浏览器未完成自动复制。请选择下面全部内容，再用系统菜单复制。备份含登录凭据，请勿分享。", [{
        label: "选择全部内容",
        run: () => {
          const v1770 = v1769.root.querySelector("[data-account-text]");
          v1770?.focus();
          v1770?.select?.();
          v1770?.setSelectionRange?.(0, v1769.text.length);
        }
      }, {
        label: "关闭",
        run: () => v1684.back()
      }], v1769.text);
    }
    async function v1721() {
      const v1771 = v1719("copy");
      if (!v1771) {
        return;
      }
      try {
        v1771.text = v1713();
      } catch {
        v1718(v1771, "暂时无法备份", "账号 ID 或登录凭据缺失，或浏览器存储无法读取。没有复制任何内容。", [{
          label: "关闭",
          run: () => v1684.back()
        }]);
        return;
      }
      try {
        const v1772 = window.navigator?.clipboard;
        if (typeof v1772?.writeText !== "function") {
          throw Error("clipboard");
        }
        await v1772.writeText(v1771.text);
        if (!v1717(v1771)) {
          return;
        }
        v1684.toast(v1683.phone(), "账号备份已复制，请勿分享");
        v1684.back();
      } catch {
        if (v1717(v1771)) {
          v1720(v1771);
        }
      }
    }
    function v1722(v1773, v1774 = "浏览器未能读取剪贴板。请在下面手动粘贴账号备份。") {
      v1773.value = null;
      v1773.before = null;
      v1718(v1773, "粘贴账号备份", v1774, [{
        label: "恢复账号",
        run: () => v1723(v1773, v1773.root.querySelector("[data-account-text]")?.value || "")
      }, {
        label: "取消",
        run: () => v1684.back()
      }], "");
    }
    function v1723(v1775, v1776) {
      if (!v1717(v1775)) {
        return;
      }
      try {
        v1775.value = v1711(v1776);
        v1775.before = v1714();
        const v1777 = v1712(v1775.before.dash).profileUid;
        const v1778 = (!!v1775.before.token || !!v1777 || !!v1775.before.demo) && (v1777 !== v1775.value.userId || !!v1775.before.demo);
        v1718(v1775, "确认恢复账号", "账号 ID：" + v1775.value.userId + "。" + (v1775.value.count > 1 ? "备份含 " + v1775.value.count + " 项，本网页仅恢复首项，其余项不会恢复。" : "") + (v1778 ? "这里已有其他账号或演示身份，继续将替换当前账号。" : "继续将保存此账号。") + "不会导入设置、车辆或历史。请先关闭其他面板标签，旧版页面无法保证回写保护。", [{
          label: "恢复账号",
          run: () => v1727(v1775)
        }, {
          label: "取消",
          run: () => v1684.back()
        }]);
      } catch {
        v1722(v1775, "备份格式不支持或存储无法读取。标准格式为仅含 token、userid（字符串）两字段的数组，最多 20 项、1 MiB，本网页仅恢复首项；兼容旧 userId、token 对象。原数据未改变。");
      }
    }
    async function v1724() {
      const v1779 = v1719("paste");
      if (!v1779) {
        return;
      }
      try {
        const v1780 = window.navigator?.clipboard;
        if (typeof v1780?.readText !== "function") {
          throw Error("clipboard");
        }
        const v1781 = await v1780.readText();
        if (v1717(v1779)) {
          v1723(v1779, v1781);
        }
      } catch {
        if (v1717(v1779)) {
          v1722(v1779);
        }
      }
    }
    function v1725(v1782) {
      const v1783 = window.localStorage;
      const v1784 = [[v1686, v1782.token], [v1687, v1782.dash], [v1688, v1782.demo], [v1689, v1782.revision]];
      v1784.sort(([v1785, v1786], [v1787, v1788]) => (v1786?.length || 0) - (v1783.getItem(v1785)?.length || 0) - ((v1788?.length || 0) - (v1783.getItem(v1787)?.length || 0)));
      for (const [v1789, v1790] of v1784) {
        try {
          if (v1790 === null) {
            v1783.removeItem(v1789);
          } else {
            v1783.setItem(v1789, v1790);
          }
        } catch {}
      }
      return v1699(v1714(), v1782);
    }
    function v1726(v1791, v1792) {
      const v1793 = window.localStorage;
      const v1794 = {
        ...v1712(v1792.dash)
      };
      for (const v1796 of ["vin", "vehicles", "vehiclesSrc", "authPromptedFor", "bindingUid"]) {
        delete v1794[v1796];
      }
      v1794.profileUid = v1791.userId;
      const v1795 = JSON.stringify(v1794);
      try {
        if (!v1699(v1714(), v1792)) {
          return {
            ok: false,
            restored: true
          };
        }
        v1793.setItem(v1686, v1791.token);
        v1793.setItem(v1687, v1795);
        v1793.removeItem(v1688);
        if (!v1699(v1714(), {
          ...v1792,
          token: v1791.token,
          dash: v1795,
          demo: null
        })) {
          throw Error("receipt");
        }
        const v1797 = Date.now() + "-" + [...crypto.getRandomValues(new Uint8Array(12))].map(v1798 => v1798.toString(16).padStart(2, "0")).join("");
        v1793.setItem(v1689, v1797);
        if (!v1699(v1714(), {
          token: v1791.token,
          dash: v1795,
          demo: null,
          revision: v1797
        })) {
          throw Error("receipt");
        }
        return {
          ok: true
        };
      } catch {
        try {
          return {
            ok: false,
            restored: v1725(v1792)
          };
        } catch {
          return {
            ok: false,
            restored: false
          };
        }
      }
    }
    function v1727(v1799) {
      if (!v1717(v1799) || v1799.committing) {
        return;
      }
      try {
        if (!v1699(v1714(), v1799.before)) {
          v1799.value = null;
          v1799.before = null;
          v1718(v1799, "账号数据已变化", "确认期间本页数据已改变，未恢复账号。请重新载入本页后重试。", [{
            label: "重新载入本页",
            run: v1702
          }, {
            label: "取消",
            run: () => v1684.back()
          }]);
          return;
        }
      } catch {
        v1722(v1799, "浏览器存储无法读取，原数据未改变。");
        return;
      }
      v1799.committing = true;
      v1799.suspended = true;
      v1683.suspendAccountRestore();
      const v1800 = v1726(v1799.value, v1799.before);
      if (v1800.ok) {
        v1684.toast(v1683.phone(), "账号已恢复");
        v1715(v1799);
        v1702();
        return;
      }
      v1799.committing = false;
      v1799.restored = v1800.restored;
      try {
        v1799.failureImage = v1714();
      } catch {
        v1799.failureImage = null;
      }
      const v1801 = () => {
        if (!v1799.failureImage || !v1699(v1714(), v1799.failureImage)) {
          return false;
        }
        if (!v1725(v1799.before)) {
          v1799.failureImage = v1714();
          return false;
        }
        v1799.failureImage = v1799.before;
        return true;
      };
      v1799.rescue = () => v1718(v1799, "尚未恢复账号", v1800.restored ? "保存失败，已回读确认恢复原值。请重试或重新载入本页取消。" : "保存失败，原件仍保留在本次页面内存中。请重试恢复原值，勿直接关闭页面。", [{
        label: "重试",
        run: () => {
          try {
            if (!v1801()) {
              throw Error("rollback");
            }
            v1727(v1799);
          } catch {
            v1684.toast(v1683.phone(), "原值恢复未完成，请保留本页再重试");
          }
        }
      }, {
        label: "取消并重新载入本页",
        run: () => {
          try {
            if (v1801()) {
              v1715(v1799);
              v1702();
            } else {
              v1684.toast(v1683.phone(), "原值恢复未完成，请先重试");
            }
          } catch {
            v1684.toast(v1683.phone(), "原值恢复未完成，请先重试");
          }
        }
      }]);
      v1799.rescue();
    }
    function v1728() {
      if (!v1692()) {
        return "";
      }
      return v1684.card(v1684.cardHead("账号备份与恢复", "只包含账号 ID 和登录凭据", "<button type=\"button\" class=\"btn text sm\" data-act=\"accountcopy\">复制账号备份</button><button type=\"button\" class=\"btn text sm\" data-act=\"accountpaste\">粘贴账号备份</button>", "db"));
    }
    v1683.domainMigration = {
      card: v1728,
      copy: v1721,
      paste: v1724,
      bootstrap: () => false,
      quiet: v1697,
      suspend: v1698,
      captureBaseline: v1701,
      canPersist: v1703,
      refreshBaseline: v1704
    };
    if (v1692()) {
      v1701();
      window.addEventListener("storage", v1802 => {
        if (v1802.key === v1689) {
          v1705();
        }
      });
      window.addEventListener("pagehide", () => {
        if (v1694) {
          v1715(v1694);
        }
      });
    }
  })();
})();
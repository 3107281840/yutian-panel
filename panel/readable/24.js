(() => {
  (() => {
    const v1 = window.APP;
    const v2 = v1.state;
    const v3 = v1.phone;
    const v4 = window.MODEL;
    const v5 = window.UI;
    const v6 = v4.esc;
    const v7 = window.API;
    const v8 = [["today", "今天"], ["7d", "近 7 日"]];
    const v9 = {
      today: "tire_stats_24h",
      "7d": "tire_stats_7d"
    };
    const v10 = new Map();
    const v11 = 60000;
    const v12 = () => new Date(Date.now() + 28800000).toISOString().slice(0, 10);
    let v13 = "";
    const v14 = (v33, v34, v35 = v13) => JSON.stringify([v33.source, v33.uid, v33.token, v33.owner?.id, v33.owner?.uid, v33.owner?.token, v33.owner?.credentialRev, v33.vin, v35, v34, v12()]);
    let v15 = 0;
    const v16 = new Map();
    let v17 = "today";
    let v18 = null;
    let v19 = "";
    function v20(v36, v37) {
      const v38 = new Date(v36);
      const v39 = v40 => String(v40).padStart(2, "0");
      if (v37 === "today") {
        return v39(v38.getHours()) + ":" + v39(v38.getMinutes());
      } else {
        return v39(v38.getMonth() + 1) + "-" + v39(v38.getDate()) + " " + v39(v38.getHours()) + ":" + v39(v38.getMinutes());
      }
    }
    function v21(v41, v42, v43) {
      const v44 = new Date(v41);
      const v45 = v46 => String(v46).padStart(2, "0");
      if (v42 === "today") {
        const v47 = v45(v44.getHours()) + ":" + v45(v44.getMinutes());
        if (v43 === "end" && v47 === "00:00") {
          return "24:00";
        }
        return v47;
      }
      return v45(v44.getMonth() + 1) + "-" + v45(v44.getDate());
    }
    const v22 = v48 => v48.levels !== false;
    function v23(v49, v50 = {}) {
      const v51 = 320;
      const v52 = 132;
      const v53 = 34;
      const v54 = 10;
      const v55 = 12;
      const v56 = 22;
      const v57 = v51 - v53 - v54;
      const v58 = v52 - v55 - v56;
      let v59 = (v49 || []).filter(v97 => v97 && Number.isFinite(v97.t) && Number.isFinite(v97.v)).sort((v98, v99) => v98.t - v99.t);
      const v60 = Number.isFinite(v50.fromMs) ? v50.fromMs : v59[0]?.t;
      const v61 = Math.max(v60 + 1, Number.isFinite(v50.toMs) ? v50.toMs : v59[v59.length - 1]?.t);
      v59 = v59.filter(v100 => v100.t >= v60 && v100.t <= v61);
      if (v59.length < 2) {
        return "<div class=\"chg-empty\">这" + v6(v50.label || "条曲线") + "还画不出曲线（至少要有 2 条采样）</div>";
      }
      const v62 = v61 - v60;
      const v63 = Math.min(172800000, Math.max(28800000, Number(v50.bucketMs) * 2 || 28800000));
      const v64 = v59.map(v101 => v101.v);
      let v65 = Math.min(...v64);
      let v66 = Math.max(...v64);
      const v67 = Number.isFinite(v50.band?.lo) ? v50.band.lo : null;
      const v68 = Number.isFinite(v50.band?.hi) ? v50.band.hi : null;
      const v69 = Math.max(v66 - v65, v50.minSpan || 0.4);
      const v70 = v69 * 2.5;
      if (v22(v50)) {
        const v102 = [v67, v50.redMin].filter(v104 => Number.isFinite(v104) && v104 < v65).sort((v105, v106) => v105 - v106);
        const v103 = [v68, v50.redMax].filter(v107 => Number.isFinite(v107) && v107 > v66).sort((v108, v109) => v109 - v108);
        for (const v110 of v102) {
          if (v66 - v110 <= v70) {
            v65 = v110;
            break;
          }
        }
        for (const v111 of v103) {
          if (v111 - v65 <= v70) {
            v66 = v111;
            break;
          }
        }
      }
      const v71 = Math.max((v66 - v65) * 0.06, v50.unit === " bar" ? 0.05 : 0.5);
      const v72 = v65 - v71;
      const v73 = v66 + v71;
      const v74 = Math.max(0.000001, v73 - v72);
      const v75 = v112 => Number.isFinite(v112) && v112 >= v72 && v112 <= v73;
      const v76 = v50.decimals === undefined ? 1 : v50.decimals;
      const v77 = v113 => v53 + Math.max(0, Math.min(1, (v113 - v60) / v62)) * v57;
      const v78 = v114 => v55 + (1 - (Math.max(v72, Math.min(v73, v114)) - v72) / v74) * v58;
      const v79 = v115 => Number(v115).toFixed(v76);
      const v80 = v75(v67) && v75(v68) && v68 > v67 ? "<rect class=\"band\" x=\"" + v53 + "\" y=\"" + v78(v68).toFixed(1) + "\" width=\"" + v57 + "\"\n          height=\"" + Math.max(0, v78(v67) - v78(v68)).toFixed(1) + "\"/>" : "";
      const v81 = (v116, v117, v118) => v75(v116) ? "<line class=\"lim " + v117 + "\" x1=\"" + v53 + "\" y1=\"" + v78(v116).toFixed(1) + "\" x2=\"" + (v51 - v54) + "\" y2=\"" + v78(v116).toFixed(1) + "\"/>" + (v118 ? "<text class=\"lim-t " + v117 + "\" x=\"" + (v53 + 4) + "\" y=\"" + (v78(v116) - 2.5).toFixed(1) + "\" text-anchor=\"start\">" + v79(v116) + "</text>" : "") : "";
      const v82 = (v50.bandLines ? v81(v67, "warn", true) + v81(v68, "warn", true) : "") + v81(v50.redMin, "red", false) + v81(v50.redMax, "red", false);
      const v83 = [0, 0.5, 1].map(v119 => {
        const v120 = v72 + (v73 - v72) * v119;
        return "<line class=\"g\" x1=\"" + v53 + "\" y1=\"" + v78(v120).toFixed(1) + "\" x2=\"" + (v51 - v54) + "\" y2=\"" + v78(v120).toFixed(1) + "\"/>\n        <text x=\"" + (v53 - 5) + "\" y=\"" + (v78(v120) + 3.1).toFixed(1) + "\" text-anchor=\"end\">" + v79(v120) + "</text>";
      }).join("");
      const v84 = v121 => {
        if (Number.isFinite(v50.redMin) && v121 < v50.redMin) {
          return "bad";
        }
        if (Number.isFinite(v50.redMax) && v121 > v50.redMax) {
          return "bad";
        }
        if (v67 !== null && v68 !== null && (v121 < v67 || v121 > v68)) {
          return "warn";
        }
        return "ok";
      };
      const v85 = {
        ok: v50.color || "var(--c-success)",
        warn: "var(--c-warning)",
        bad: "var(--c-danger)"
      };
      const v86 = v22(v50);
      const v87 = globalThis.CHARTPATH;
      const v88 = new Map();
      const v89 = [];
      const v90 = [];
      let v91 = null;
      let v92 = [];
      const v93 = () => {
        if (v92.length >= 2) {
          const v122 = v88.get(v91) || [];
          v122.push(v92);
          v88.set(v91, v122);
        }
        v92 = [];
      };
      for (let v123 = 0; v123 < v59.length; v123++) {
        const v124 = v59[v123];
        if (v123 && (v124.gap || v124.break || v124.t - v59[v123 - 1].t > v63)) {
          const v126 = v59[v123 - 1];
          v93();
          v91 = null;
          v89.push([v126.t, v124.t]);
          const v127 = v86 ? v84(v124.v) : "ok";
          v90.push("<path class=\"gap-line\" style=\"--c-chg:" + (v85[v127] || v85.ok) + "\" d=\"M" + v77(v126.t).toFixed(1) + " " + v78(v126.v).toFixed(1) + " L" + v77(v124.t).toFixed(1) + " " + v78(v124.v).toFixed(1) + "\"/>");
        }
        const v125 = v86 ? v84(v124.v) : "ok";
        if (v125 !== v91 && v92.length) {
          v93();
          v91 = v125;
          v92 = [v59[v123 - 1], v124];
        } else {
          v91 = v125;
          v92.push(v124);
        }
      }
      v93();
      const v94 = v128 => v87 ? v87.path(v128, 0, v128.length - 1, v129 => v77(v129.t), v130 => v78(v130.v)) : v128.map((v131, v132) => "" + (v132 ? "L" : "M") + v77(v131.t).toFixed(1) + " " + v78(v131.v).toFixed(1)).join(" ");
      const v95 = [...v88.entries()].map(([v133, v134]) => "<path class=\"line " + v133 + "\" style=\"--c-chg:" + (v85[v133] || v85.ok) + "\" d=\"" + v134.map(v94).join(" ") + "\"/>").join("");
      const v96 = v59.map(v135 => ({
        t: v135.t,
        v: v135.v,
        s: v135.shown
      }));
      return "<div class=\"tire-wrap\" data-probe='" + v6(JSON.stringify({
        vb: [v51, v52],
        box: [v53, v55, v57, v58],
        time: [v60, v61],
        y: [v72, v73],
        unit: v50.unit || "",
        dec: v76,
        range: v17,
        pts: v96,
        gaps: v89
      })) + "'>\n      <svg class=\"chg-svg tire-svg\" viewBox=\"0 0 " + v51 + " " + v52 + "\" role=\"img\"\n        aria-label=\"" + v6(v50.label || "历史曲线") + "\">\n        " + v80 + v83 + v82 + v95 + v90.join("") + "\n        <text x=\"" + v53 + "\" y=\"" + (v52 - 6) + "\" text-anchor=\"start\">" + v6(v21(v60, v17, "start")) + "</text>\n        <text x=\"" + (v51 - v54) + "\" y=\"" + (v52 - 6) + "\" text-anchor=\"end\">" + v6(v21(v61, v17, "end")) + "</text>\n        <line class=\"probe-v\" x1=\"0\" y1=\"" + v55 + "\" x2=\"0\" y2=\"" + (v55 + v58) + "\" style=\"opacity:0\"/>\n        <circle class=\"probe-d\" cx=\"0\" cy=\"0\" r=\"4\" style=\"opacity:0\"/>\n      </svg>\n      <div class=\"probe-tip\" hidden></div>\n    </div>";
    }
    function v24(v136) {
      const v137 = [...(v136?.querySelectorAll?.(".tire-wrap") || [])];
      for (const v138 of v137) {
        if (!v138.dataset.probe || v138.dataset.probeBound) {
          continue;
        }
        const v139 = v138.querySelector("svg");
        const v140 = v138.querySelector(".probe-tip");
        if (!v139 || !v140) {
          continue;
        }
        let v141 = null;
        try {
          v141 = JSON.parse(v138.dataset.probe);
        } catch {
          continue;
        }
        const v142 = v141?.pts || [];
        if (!v142.length) {
          continue;
        }
        v138.dataset.probeBound = "1";
        const [v143, v144] = v141.vb;
        const [v145, v146, v147, v148] = v141.box;
        const [v149, v150] = v141.time;
        const v151 = v139.querySelector(".probe-v");
        const v152 = v139.querySelector(".probe-d");
        const v153 = v162 => v145 + Math.max(0, Math.min(1, (v162 - v149) / Math.max(1, v150 - v149))) * v147;
        const [v154, v155] = v141.y || [Math.min(...v142.map(v163 => v163.v)), Math.max(...v142.map(v164 => v164.v))];
        const v156 = v165 => v146 + (1 - (Math.max(v154, Math.min(v155, v165)) - v154) / Math.max(0.000001, v155 - v154)) * v148;
        const v157 = v166 => Number(v166).toFixed(v141.dec ?? 1);
        let v158 = 0;
        const v159 = () => {
          v151.style.opacity = "0";
          v152.style.opacity = "0";
          v140.hidden = true;
        };
        const v160 = v167 => {
          const v168 = v139.getBoundingClientRect();
          if (!v168.width) {
            return;
          }
          const v169 = (v167 - v168.left) / v168.width * v143;
          const v170 = Math.max(0, Math.min(1, (v169 - v145) / v147));
          const v171 = v149 + v170 * (v150 - v149);
          if (v169 < v153(v142[0].t) - 0.06 || v169 > v153(v142[v142.length - 1].t) + 0.06 || (v141.gaps || []).some(([v179, v180]) => v169 > v153(v179) + 0.06 && v169 < v153(v180) - 0.06)) {
            v159();
            return;
          }
          let v172 = v142[0];
          for (const v181 of v142) {
            if (Math.abs(v181.t - v171) < Math.abs(v172.t - v171)) {
              v172 = v181;
            }
          }
          const v173 = v153(v172.t);
          const v174 = v156(v172.v);
          v151.setAttribute("x1", v173.toFixed(1));
          v151.setAttribute("x2", v173.toFixed(1));
          v151.style.opacity = "1";
          v152.setAttribute("cx", v173.toFixed(1));
          v152.setAttribute("cy", v174.toFixed(1));
          v152.style.opacity = "1";
          v140.hidden = false;
          const v175 = v172.s ?? v172.v;
          v140.textContent = v20(v172.t, v141.range || v17) + " · " + v157(v175) + (v141.unit || "");
          const v176 = v168.left + v173 / v143 * v168.width;
          const v177 = v140.offsetWidth || 90;
          const v178 = v138.getBoundingClientRect();
          v140.style.left = Math.max(4, Math.min(v178.width - v177 - 4, v176 - v178.left - v177 / 2)) + "px";
          v140.style.top = Math.max(2, v168.top - v178.top + v174 / v144 * v168.height - (v140.offsetHeight || 26) - 6) + "px";
        };
        const v161 = () => {
          clearTimeout(v158);
          v158 = setTimeout(v159, 1500);
        };
        v139.style.touchAction = "pan-y";
        v139.addEventListener("pointerdown", v182 => {
          clearTimeout(v158);
          try {
            v139.setPointerCapture(v182.pointerId);
          } catch {}
          v160(v182.clientX);
        });
        v139.addEventListener("pointermove", v183 => {
          if (v183.buttons === 0 && v183.pointerType === "mouse") {
            return;
          }
          v160(v183.clientX);
        });
        v139.addEventListener("mousemove", v184 => {
          clearTimeout(v158);
          v160(v184.clientX);
        });
        v139.addEventListener("mouseleave", () => {
          clearTimeout(v158);
          v159();
        });
        v139.addEventListener("pointerup", v161);
        v139.addEventListener("pointercancel", () => {
          clearTimeout(v158);
          v159();
        });
      }
    }
    function v25(v185, v186) {
      const v187 = v185?.pts || [];
      if (!v187.length) {
        return "";
      }
      const v188 = v187[v187.length - 1];
      const v189 = v190 => v190 === null || v190 === undefined ? "—" : Number(v190).toFixed(1);
      return "<div class=\"tire-stats\">\n      <div class=\"tire-stat\"><span class=\"k\">最新</span><span class=\"v tnum\">" + v189(v188.shown ?? v188.v) + "<small>" + v6(v186) + "</small></span></div>\n      <div class=\"tire-stat\"><span class=\"k\">平均</span><span class=\"v tnum\">" + v189(v185.avg) + "<small>" + v6(v186) + "</small></span></div>\n      <div class=\"tire-stat\"><span class=\"k\">最高</span><span class=\"v tnum\">" + v189(v185.max) + "<small>" + v6(v186) + "</small></span></div>\n      <div class=\"tire-stat\"><span class=\"k\">最低</span><span class=\"v tnum\">" + v189(v185.min) + "<small>" + v6(v186) + "</small></span></div>\n    </div>";
    }
    function v26(v191, v192) {
      const v193 = v191.pressure;
      const v194 = v191.temp;
      const v195 = v193?.pts || [];
      const v196 = v194?.pts || [];
      const v197 = v195[v195.length - 1];
      const v198 = v196[v196.length - 1];
      const v199 = v197 ? v4.tireLevel(v197.v, v191.band?.lo ?? 1.9, v191.band?.hi ?? 2.5) : "";
      const v200 = v197 ? "<span class=\"tire-brief-p " + (v199 || "ok") + "\">" + Number(v197.shown ?? v197.v).toFixed(1) + "<i> bar</i></span>" + (v198 ? "<span class=\"tire-brief-t\">" + Math.round(v198.shown ?? v198.v) + "°</span>" : "") : "<span class=\"tire-brief-n\">这段时间没有采样</span>";
      const v201 = v191.band ? v191.band.lo.toFixed(1) + "–" + v191.band.hi.toFixed(1) : "—";
      const v202 = v195.length >= 2;
      return "<section class=\"card tire-card\">\n      <div class=\"tire-head\">\n        <span class=\"tire-head-title\">" + v6(v191.pos) + "</span>\n        <span class=\"tire-head-brief\">" + v200 + "</span>\n      </div>\n      <div class=\"tire-block\">\n        <div class=\"tire-block-head\"><span class=\"tire-block-title\">胎压</span>\n          " + (v202 ? "<span class=\"tire-bandtag\">" + v6(v201) + "</span>" : "") + "</div>\n        " + (v202 ? v23(v195, {
        label: "胎压",
        unit: " bar",
        band: v191.band,
        bandLines: true,
        redMin: v4.TIRE_RED_MIN,
        redMax: v4.TIRE_RED_MAX,
        fromMs: v192.from,
        toMs: v192.to,
        bucketMs: v192.bucketMs,
        decimals: 1,
        minSpan: 0.4
      }) + v25(v193, " bar") : "<div class=\"chg-empty\">这段时间没有胎压采样</div>") + "\n      </div>\n      <div class=\"tire-block\">\n        <div class=\"tire-block-head\"><span class=\"tire-block-title\">胎温</span></div>\n        " + (v196.length >= 2 ? v23(v196, {
        label: "胎温",
        unit: " ℃",
        band: {
          lo: v194.safeMin,
          hi: v194.safeMax
        },
        bandLines: false,
        redMin: null,
        redMax: null,
        fromMs: v192.from,
        toMs: v192.to,
        bucketMs: v192.bucketMs,
        decimals: 0,
        minSpan: 4,
        levels: false,
        color: "var(--c-info)"
      }) + v25(v194, " ℃") : "<div class=\"chg-empty\">这段时间没有胎温采样</div>") + "\n      </div>\n    </section>";
    }
    function v27(v203 = {}) {
      const v204 = v203.scope || v1.context();
      if (!v1.current(v204)) {
        return null;
      }
      const v205 = v2.data.home || {};
      const v206 = v2.vehicles.find(v218 => v218.vin === v204.vin);
      const v207 = v10.get(v14(v204, v17));
      const v208 = !v207?.hist;
      const v209 = v207?.hist?.series?.find(v219 => v219.pos === v19);
      const v210 = v8.map(([v220, v221]) => "<button class=\"seg-btn" + (v17 === v220 ? " on" : "") + "\" data-act=\"tirer\" data-v=\"" + v220 + "\"\n        aria-pressed=\"" + (v17 === v220) + "\">" + v221 + "</button>").join("");
      let v211;
      if (v207?.error) {
        v211 = "<div class=\"note warn\">" + v5.icon("alert", 18) + "<div>" + v6(v207.error) + "</div></div>\n        <div class=\"field mt12\"><button class=\"btn text sm\" data-act=\"tirerefresh\">重新加载</button></div>";
      } else if (v208) {
        v211 = v5.spinner("正在向车机取历史胎压…", {
          block: true
        });
      } else if (!v207.hist?.series?.length) {
        v211 = "<div class=\"chg-empty\">这台车这段时间没有胎压记录</div>";
      } else {
        v211 = v209 ? v26(v209, v207.hist) : "<div class=\"chg-empty\">这条轮这段时间没有采样</div>";
      }
      const v212 = v222 => (v222?.pts || []).reduce((v223, v224) => Math.max(v223, v224.t), 0);
      const v213 = v212(v209?.pressure);
      const v214 = v212(v209?.temp);
      const v215 = v225 => v225 ? v4.relTime(new Date(v225).toISOString()) : "无采样";
      const v216 = v209 ? "胎压 " + v215(v213) + " · 胎温 " + v215(v214) : v206?.name || v205.name || "当前车辆";
      const v217 = {
        key: "tirehist",
        title: "胎压历史",
        sub: v216,
        half: true,
        headActions: "<button class=\"iconbtn\" data-act=\"tirerefresh\" title=\"刷新\">" + v5.icon("refresh", 20) + "</button>",
        body: "<div class=\"seg-tabs\" role=\"group\" aria-label=\"时间范围\">" + v210 + "</div>\n        " + (v207?.pending && v207.hist ? "<p class=\"card-sub\">正在更新历史采样…</p>" : "") + v211,
        onMount: v226 => {
          const v227 = v226 || document.querySelector(".sheet.show");
          v24(v227);
          v5.fitText(v227);
        }
      };
      if (v203.handle !== undefined && v5.sheetAlive(v203.handle)) {
        v5.updateSheet(v203.handle, v217);
        v18 = v203.handle;
        return v203.handle;
      }
      return v5.sheet(v3(), v217);
    }
    async function v28(v228, v229 = false, v230 = v17, v231 = v13, v232 = {}) {
      const v233 = v14(v228, v230, v231);
      const v234 = v10.get(v233);
      if (!v229 && v234?.hist && !v234.error && Date.now() - v234.at < v11) {
        return v234;
      }
      const v235 = v16.get(v233);
      if (v235?.fresh()) {
        return v235.promise;
      }
      if (v235) {
        v16.delete(v233);
      }
      const v236 = {
        pending: true,
        hist: v234?.hist || null,
        error: "",
        at: v234?.at || 0
      };
      if (v10.size >= 16) {
        v10.delete(v10.keys().next().value);
      }
      v10.set(v233, v236);
      const v237 = () => v1.current(v228) && v14(v228, v230, v231) === v233 && v10.get(v233) === v236 && (!v232.isLatest || v232.isLatest());
      const v238 = (async () => {
        try {
          const v241 = await v7.call(v9[v230], {
            vin: v228.vin
          }, {
            ...v232,
            isLatest: v237
          });
          if (!v237()) {
            return null;
          }
          if (!v241?.ok) {
            throw new Error(v241?.message || "取胎压历史失败");
          }
          v236.hist = {
            ...v4.tireHistory(v241, v2.tireBands),
            bucketMs: (v230 === "7d" ? 86400 : 14400) * 1000
          };
          v236.at = Date.now();
          v236.error = "";
        } catch (v242) {
          if (!v237()) {
            return null;
          }
          v236.error = "取胎压历史失败：" + (v242?.message || v242);
        } finally {
          v236.pending = false;
        }
        return v236;
      })();
      const v239 = {
        promise: v238,
        fresh: v237
      };
      v16.set(v233, v239);
      const v240 = () => {
        if (v16.get(v233) === v239) {
          v16.delete(v233);
        }
      };
      v238.then(v240, v240);
      return v238;
    }
    async function v29(v243, v244 = false) {
      const v245 = v17;
      const v246 = v19;
      const v247 = v18;
      const v248 = v15;
      const v249 = () => v248 === v15 && v245 === v17 && v246 === v19 && v247 === v18 && !!v18 && v5.sheetAlive(v18) && v1.current(v243);
      const v250 = {
        batch: "b" + ++v7._batchSeq,
        batchReads: new Map(),
        isLatest: v249
      };
      const {
        sensorType: v251,
        error: v252
      } = await v7.tireSensorFor({
        vin: v243.vin
      }, v250);
      if (!v249()) {
        return;
      }
      v13 = v251;
      if (!v251) {
        v10.set(v14(v243, v245), {
          pending: false,
          hist: null,
          error: v252?.message || "暂未确认这辆车的胎压类型，请稍后重试",
          at: 0
        });
        v27({
          handle: v18,
          scope: v243
        });
        return;
      }
      v27({
        handle: v18,
        scope: v243
      });
      const v253 = await v28(v243, v244, v245, v251, v250);
      if (!v253 || !v249()) {
        return;
      }
      v27({
        handle: v18,
        scope: v243
      });
    }
    function v30(v254) {
      const v255 = v1.context();
      if (!v255.vin) {
        return;
      }
      v15++;
      v13 = "";
      v17 = "today";
      v19 = v254 === "前轮" || v254 === "后轮" ? v254 : "前轮";
      v18 = v27({
        scope: v255
      });
      v29(v255);
    }
    function v31(v256) {
      if (!v8.some(([v258]) => v258 === v256) || v256 === v17) {
        return;
      }
      v15++;
      v13 = "";
      v17 = v256;
      const v257 = v1.context();
      if (!v1.current(v257)) {
        return;
      }
      if (!v18 || !v5.sheetAlive(v18)) {
        return;
      }
      v27({
        handle: v18,
        scope: v257
      });
      v29(v257);
    }
    function v32() {
      const v259 = v1.context();
      if (!v1.current(v259)) {
        return;
      }
      if (!v18 || !v5.sheetAlive(v18)) {
        return;
      }
      v15++;
      const v260 = v14(v259, v17);
      v10.delete(v260);
      v16.delete(v260);
      v13 = "";
      v27({
        handle: v18,
        scope: v259
      });
      v29(v259, true);
    }
    window.APP.tirehist = {
      openTireHistory: v30,
      tireHistSheet: v27,
      curve: v23,
      load: v28,
      setRange: v31,
      refresh: v32,
      RANGES: v8
    };
  })();
  (() => {
    const v261 = window.APP;
    const v262 = v261.state;
    const v263 = window.Store;
    const v264 = "zeeho.battery.range.v1";
    const v265 = ["default", "custom", "estimated"];
    const v266 = v278 => v278 === null || v278 === undefined || v278 === "" || typeof v278 === "boolean" || !Number.isFinite(Number(v278)) ? null : Number(v278);
    const v267 = v279 => Math.round(v279 * 10) / 10;
    const v268 = v280 => JSON.stringify([v280?.owner?.id || "", v280?.owner?.uid || "", v280?.vin || v262.vin || ""]);
    const v269 = v281 => v263.ns(v264, v281?.owner?.id || undefined);
    const v270 = v282 => ({
      mode: v265.includes(v282?.mode) ? v282.mode : "default",
      fullKm: v266(v282?.fullKm) > 0 && v266(v282?.fullKm) <= 2000 ? v266(v282.fullKm) : null
    });
    function v271(v283 = v261.context?.()) {
      try {
        return v270(v263.getJson(v269(v283), {})?.[v268(v283)]);
      } catch {
        return v270(null);
      }
    }
    async function v272(v284, v285 = v261.context()) {
      if (!v285.vin || !v261.current(v285) || !v265.includes(v284?.mode)) {
        return false;
      }
      const v286 = v266(v284.fullKm);
      if (v284.mode === "custom" && (!(v286 > 0) || !(v286 <= 2000))) {
        return false;
      }
      try {
        const v287 = v269(v285);
        const v288 = v263.getJson(v287, {});
        if (!v288 || typeof v288 !== "object" || Array.isArray(v288) || v263.error?.()) {
          return false;
        }
        const v289 = {
          ...v288,
          [v268(v285)]: v270(v284)
        };
        return (await v263.commitAsync({
          puts: {
            [v287]: JSON.stringify(v289)
          }
        })) === true && v261.current(v285);
      } catch {
        return false;
      }
    }
    function v273(v290, v291, v292, v293 = Date.now(), v294 = null) {
      const v295 = v266(v292?.soc ?? v291?.soc);
      const v296 = v266(v291?.sampleAt);
      const v297 = v266(v292?.soc) !== null ? v266(v292?.sampleAt) : v296;
      const v298 = {
        fullKm: null,
        remainingKm: null,
        km: null,
        used: null,
        basis: "",
        reason: "no-history"
      };
      if (v295 === null || v295 < 0 || v295 > 100 || v291?.charge?.known === false || typeof v291?.charge?.charging !== "boolean") {
        return {
          ...v298,
          reason: "no-reading"
        };
      }
      if (v296 !== null && (v296 <= 0 || v296 > v293) || v297 !== null && (v297 <= 0 || v297 > v293) || v296 !== null && v297 !== null && Math.abs(v296 - v297) > 90000) {
        return {
          ...v298,
          reason: "unaligned"
        };
      }
      const v299 = (Array.isArray(v290) ? v290 : []).filter(v310 => v266(v310?.e) > 0 && v266(v310.e) <= v293 && v266(v310.s) > 0 && v266(v310.s) <= v266(v310.e)).sort((v311, v312) => v312.e - v311.e);
      const v300 = v299[0];
      if (!v300) {
        return v298;
      }
      if (v296 !== null && v296 < v300.e || v297 !== null && v297 < v300.e) {
        return {
          ...v298,
          reason: "stale"
        };
      }
      const v301 = (v313, v314, v315) => {
        if (!(v313 > 0) || !(v314 >= 5) || !(v314 <= 100)) {
          return {
            ...v298,
            reason: "insufficient",
            basis: v315
          };
        }
        const v316 = v313 / v314 * 100;
        if (!(v316 > 0) || !(v316 <= 2000)) {
          return {
            ...v298,
            reason: "invalid-distance",
            basis: v315
          };
        }
        return {
          fullKm: v267(v316),
          remainingKm: v267(v316 * v295 / 100),
          km: v267(v313),
          used: v267(v314),
          basis: v315,
          reason: ""
        };
      };
      if (v295 <= 80 && !v291.charge.charging) {
        const v317 = v266(v300.odo1);
        const v318 = v266(v291.totalMile);
        const v319 = v266(v300.odo1Soc);
        if (v317 === null || v317 < 0 || v318 === null || v318 < 0 || v318 * 1000 < v317 || v319 === null || v319 < v295 || v319 > 100) {
          return {
            ...v298,
            reason: "no-anchor"
          };
        }
        const v320 = (Math.round(v318 * 1000) - v317) / 1000;
        if (v296 !== null && v320 > 0 && (v296 <= v300.e || v320 / ((v296 - v300.e) / 3600000) > 130)) {
          return {
            ...v298,
            reason: "invalid-distance"
          };
        }
        const v321 = v301(v320, v319 - v295, "current");
        if (v321.remainingKm !== null) {
          return v321;
        }
      }
      const v302 = v291.charge.charging ? v294 : v300;
      const v303 = v291.charge.charging ? v300 : v299[1];
      if (!v302 || !v303 || v266(v302.s) < v266(v303.e)) {
        return v298;
      }
      const v304 = v266(v302.odo0);
      const v305 = v266(v303.odo1);
      const v306 = v266(v302.odo0Soc);
      const v307 = v266(v303.odo1Soc);
      if (v304 === null || v305 === null || v304 < 0 || v305 < 0 || v304 < v305 || v306 === null || v307 === null || v306 < 0 || v307 > 100 || v306 > v307) {
        return {
          ...v298,
          reason: "no-anchor",
          basis: "previous"
        };
      }
      const v308 = (v304 - v305) / 1000;
      const v309 = ((v266(v302.odo0At) ?? v302.s) - v303.e) / 3600000;
      if (v308 > 0 && (!(v309 > 0) || v308 / v309 > 130)) {
        return {
          ...v298,
          reason: "invalid-distance"
        };
      }
      return v301(v308, v307 - v306, "previous");
    }
    function v274(v322 = v262.data.home, v323 = v262.data.battery) {
      const v324 = window.CHG?.log?.(v262.vin);
      if (!v324) {
        return v273([], v322, v323);
      }
      const v325 = !v324.ended && Array.isArray(v324.pts) ? v324.pts : [];
      const v326 = v325[0];
      const v327 = v326 ? {
        s: v326.t,
        e: v325.at(-1).t,
        odo0Soc: v266(v326.soc),
        odo0: v266(v326.odo),
        odo0At: v326.t,
        ...(v324.rangeAnchor || {})
      } : null;
      const v328 = (Array.isArray(v324.sessions) ? v324.sessions : []).map(v329 => {
        const v330 = v329.pts?.[0];
        const v331 = v329.pts?.at(-1);
        return {
          ...v329,
          odo0: v329.odo0 === undefined ? v266(v330?.odo) : v329.odo0,
          odo0Soc: v329.odo0Soc === undefined ? v266(v330?.soc) : v329.odo0Soc,
          odo0At: v329.odo0At === undefined ? v266(v330?.t) : v329.odo0At,
          odo1Soc: v329.odo1Soc === undefined && v266(v331?.t) === v266(v329.e) ? v266(v331?.soc) : v329.odo1Soc
        };
      });
      return v273(v328, v322, v323, Date.now(), v327);
    }
    function v275(v332 = v262.data.home, v333 = v262.data.battery) {
      const v334 = v271();
      if (v334.mode === "default") {
        return v266(v332?.range);
      }
      const v335 = v266(v333?.soc ?? v332?.soc);
      if (v335 === null || v335 < 0 || v335 > 100) {
        return null;
      }
      if (v334.mode === "custom") {
        if (v334.fullKm === null) {
          return null;
        } else {
          return v267(v334.fullKm * v335 / 100);
        }
      }
      return v274(v332, v333).remainingKm;
    }
    function v276() {
      const v336 = v271();
      const v337 = window.MODEL.esc;
      const v338 = [["default", "APP默认续航", "网络请求"], ["custom", "自定义续航", "按电量折算"], ["estimated", "软件估算续航", "充后里程估算"]];
      return "<section class=\"battery-range-settings mt16\"><div class=\"section-title\"><span>爱车页面剩余续航展示</span><span class=\"line\"></span></div>\n      <div class=\"battery-range-choices\" role=\"radiogroup\" aria-label=\"爱车页面剩余续航展示\">" + v338.map(([v339, v340, v341]) => "<button type=\"button\" class=\"battery-range-choice" + (v336.mode === v339 ? " sel" : "") + "\" role=\"radio\" aria-checked=\"" + (v336.mode === v339) + "\" tabindex=\"" + (v336.mode === v339 ? 0 : -1) + "\" data-range-mode=\"" + v339 + "\"><span class=\"t\">" + v340 + "</span><span class=\"s\">" + v341 + "</span></button>").join("") + "</div>\n      <div class=\"mt12\" data-range-content></div>\n      <template data-range-custom><div class=\"field\"><label class=\"form-label\" for=\"batteryFullKm\">满电续航（km）</label><input class=\"form-control\" id=\"batteryFullKm\" type=\"number\" min=\"0.1\" max=\"2000\" step=\"0.1\" inputmode=\"decimal\" value=\"" + v337(v336.fullKm ?? "") + "\" placeholder=\"填写满电可行驶公里数\" aria-label=\"满电续航 km\"></div><div class=\"field mt12\"><button type=\"button\" class=\"btn tonal block\" data-range-save>保存续航设置</button></div></template>\n    </section>";
    }
    function v277(v342, v343 = v261.context()) {
      const v344 = v342.querySelector(".battery-range-settings");
      if (!v344) {
        return;
      }
      let v345 = v271(v343);
      let v346 = v345.mode;
      let v347 = false;
      const v348 = () => v261.current(v343) && v344.isConnected;
      const v349 = [...v344.querySelectorAll("[data-range-mode]")];
      const v350 = () => {
        v349.forEach(v353 => {
          const v354 = v353.dataset.rangeMode === v346;
          v353.classList.toggle("sel", v354);
          v353.setAttribute("aria-checked", String(v354));
          v353.tabIndex = v354 ? 0 : -1;
        });
        const v352 = v344.querySelector("[data-range-content]");
        if (v346 === "custom") {
          v352.innerHTML = v344.querySelector("[data-range-custom]").innerHTML;
          const v355 = v352.querySelector("input");
          v355.value = v345.fullKm ?? "";
          v352.querySelector("[data-range-save]").addEventListener("click", () => v351({
            mode: v346,
            fullKm: v355.value
          }));
        } else if (v346 === "estimated") {
          const v356 = v274();
          const v357 = v358 => v358 === null ? "暂无估值" : v358 + " km";
          v352.innerHTML = "<div class=\"card-sub\">电量高于80%时参考上一轮充后到下次充电前的里程；80%及以下优先使用本轮充后里程和耗电比例，至少消耗5%后更新。估算仅供参考。</div><div class=\"kv mt8\"><span>预估满电续航</span><b>" + v357(v356.fullKm) + "</b></div><div class=\"kv\"><span>预估剩余续航</span><b>" + v357(v356.remainingKm) + "</b></div>" + (v356.basis ? "<div class=\"card-sub mt8\">" + (v356.basis === "current" ? "本轮充后行驶" : "上一轮充后行驶") + " " + (v356.km ?? "—") + " km · 耗电 " + (v356.used ?? "—") + "%</div>" : "");
        } else {
          v352.innerHTML = "<div class=\"card-sub\">显示车辆接口返回的默认剩余续航。</div>";
        }
      };
      const v351 = async v359 => {
        if (v347 || !v348()) {
          return;
        }
        if (v359.mode === "custom" && (!(v266(v359.fullKm) > 0) || !(v266(v359.fullKm) <= 2000))) {
          window.UI.toast(v261.phone(), "满电续航需填写大于0且不超过2000的公里数");
          return;
        }
        v347 = true;
        v349.forEach(v361 => {
          v361.disabled = true;
        });
        v344.querySelectorAll("[data-range-save]").forEach(v362 => {
          v362.disabled = true;
        });
        const v360 = await v272(v359, v343);
        v347 = false;
        if (!v348()) {
          return;
        }
        v349.forEach(v363 => {
          v363.disabled = false;
        });
        v344.querySelectorAll("[data-range-save]").forEach(v364 => {
          v364.disabled = false;
        });
        if (!v360) {
          v346 = v345.mode;
          v350();
          window.UI.toast(v261.phone(), "续航设置未能保存，请重试");
          return;
        }
        v345 = v271(v343);
        v346 = v345.mode;
        v350();
        v261.render({
          keepScroll: true
        });
        window.UI.toast(v261.phone(), "续航设置已保存");
      };
      v349.forEach((v365, v366) => {
        v365.addEventListener("click", () => {
          if (v347 || !v348()) {
            return;
          }
          v346 = v365.dataset.rangeMode;
          if (v346 === "custom" && v345.fullKm === null) {
            v350();
          } else {
            v351({
              mode: v346,
              fullKm: v345.fullKm
            });
          }
        });
        v365.addEventListener("keydown", v367 => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(v367.key)) {
            return;
          }
          v367.preventDefault();
          const v368 = v367.key === "Home" ? 0 : v367.key === "End" ? v349.length - 1 : (v366 + (v367.key === "ArrowLeft" ? -1 : 1) + v349.length) % v349.length;
          v349[v368].focus();
          v349[v368].click();
        });
      });
      v350();
    }
    v261.batteryRange = {
      KEY: v264,
      preferences: v271,
      setPreferences: v272,
      estimate: v273,
      software: v274,
      readout: v275,
      settingsHtml: v276,
      mountSettings: v277
    };
  })();
  (() => {
    const v369 = window.APP;
    const v370 = v369.state;
    const v371 = v369.$;
    const v372 = v369.phone;
    const v373 = v369.scroll;
    const v374 = window.MODEL;
    const v375 = window.UI;
    const v376 = window.ZEEHO_THEME;
    const v377 = v374.esc;
    const v378 = window.API;
    const v379 = window.CHG;
    const v380 = window.TASKS;
    const v381 = v369.APP_VER;
    const v382 = () => window.PLATFORM?.preview?.() === true;
    const v383 = v512 => !v382() && window.NativeShell?.has?.(v512) === true;
    const v384 = () => v369.featuresEnabledDisplay?.() !== false;
    const v385 = () => v384() && (v382() || v383("widgetSettingsFor") || v383("widgetSettings"));
    const v386 = () => window.NativeShell?.shell?.();
    function v387(v513) {
      return window.PLATFORM?.visible?.(v513) !== false;
    }
    const v388 = "zeeho_ck_mode";
    function v389() {
      try {
        if (localStorage.getItem(v388) === "combo") {
          return "combo";
        } else {
          return "independent";
        }
      } catch {
        return "independent";
      }
    }
    function v390(v514) {
      try {
        localStorage.setItem(v388, v514 === "combo" ? "combo" : "independent");
      } catch {}
    }
    function v391(v515) {
      if (v515.code === "CUSTOM_BUTTON_COMBINATION") {
        return v389() === "combo";
      }
      if (v515.code === "CUSTOM_BUTTON_LEFT" || v515.code === "CUSTOM_BUTTON_HIGH") {
        return v389() !== "combo";
      }
      return true;
    }
    function v392() {
      v390(v389() === "combo" ? "independent" : "combo");
      v369.buildSettings?.();
      v369.render({
        keepScroll: true
      });
    }
    let v393 = 0;
    function v394() {
      if (v370.tab !== "settings") {
        return null;
      }
      const v516 = v369.context();
      const v517 = v373()?.scrollTop || 0;
      return () => {
        if (!v369.current(v516)) {
          return;
        }
        v370.tab = "settings";
        v370.openGroups.meter = true;
        v369.render({
          keepScroll: true
        });
        const v518 = v373();
        if (v518) {
          v518.scrollTop = v517;
        }
      };
    }
    function v395(v519, v520 = null, {
      vehicle = false
    } = {}) {
      let v521 = {};
      let v522 = vehicle ? v520?.owner : null;
      try {
        v521 = window.DIAG?.capture?.() || {};
      } catch {}
      try {
        if (!v522) {
          v522 = window.ACC?.active?.();
        }
      } catch {}
      let v523 = String(v522?.label || v522 && window.ACC?.labelOf?.(v522) || v520?.uid || v370.profileUid || "");
      if (v522?.token) {
        v523 = v523.split(String(v522.token)).join("[已隐藏凭据]");
      }
      return {
        ...v521,
        account: v523 || "未标识账号",
        accountId: String(v522?.id || ""),
        source: "web",
        runId: v519 + "-" + Date.now().toString(36) + "-" + ++v393
      };
    }
    function v396(v524, v525, v526 = {}) {
      try {
        window.DIAG?.event?.(v524, {
          category: "settings",
          phase: "end",
          kind: "info",
          ...v525,
          ...v526
        });
      } catch {}
    }
    const v397 = () => (v370.data.settings?.groups || []).flatMap(v527 => v527.rows);
    let v398 = 0;
    async function v399(v528 = v369.context(), v529 = null) {
      const v530 = ++v398;
      const v531 = () => v369.current(v528) && v530 === v398;
      const v532 = await v378.all(["vehicle_set_info"], {
        vin: v528.vin,
        uid: "0",
        month: v528.month
      }, {
        scope: v528.owner,
        logScope: v529,
        runId: v529?.runId,
        isLatest: v531
      });
      if (!v531() || !v532.vehicle_set_info?.ok) {
        return false;
      }
      v370.data.info = v532.vehicle_set_info;
      if (v370.data.caps) {
        v369.buildSettings();
      }
      v369.render({
        keepScroll: true
      });
      return true;
    }
    function v400(v533) {
      const v534 = v397().find(v537 => v537.code === v533);
      if (!v534) {
        return;
      }
      if (!v534.binary) {
        return v369.settingSheet(v533);
      }
      if (v534.write?.ready) {
        return v404(v533);
      }
      const v535 = v538 => v538 ? "开启" : "关闭";
      const v536 = v534.write ? v374.writeBody(v534.write, v534.value ? v534.write.off : v534.write.on, v370.vin) : null;
      v375.sheet(v372(), {
        title: v534.title,
        sub: "未适配",
        body: "\n        <div class=\"note\">" + v375.icon("alert", 18) + "<div>\n          这一项还没摸到云端指令码，网页端发不了指令（点它不会有任何写入）。<b>用官方 App 可以改。</b>\n        </div></div>\n        <div class=\"mt16\">" + v375.kv("当前状态", v535(v534.value)) + "</div>\n        " + v369.devFold(v534.obs ? "<div class=\"card-sub\">这一项的实测观测</div>" + v377(v534.obs) : "", v534.keys?.length ? "<div class=\"card-sub\">字段</div><div class=\"code\">" + v377(v534.keys.join("\n")) + "</div>" : "", v369.capMetaBlock(v534), v536 ? "<div class=\"card-sub\">将来要发的请求体</div><div class=\"code\">" + v377(JSON.stringify(v536, null, 2)) + "</div>" : "")
      });
    }
    const v401 = (v539, v540) => String(v540 || "").split(".").reduce((v541, v542) => v541 == null ? undefined : v541[v542], v539);
    const v402 = v543 => String(v543 || "").split(".").pop();
    async function v403(v544, v545, v546) {
      if (v382()) {
        return window.PLATFORM.unavailable("车辆设置");
      }
      const v547 = v369.context();
      const v548 = v395("vehicle-setting", v547, {
        vehicle: true
      });
      const v549 = v375.currentSheet();
      const v550 = v544.write;
      const v551 = v370.data.info?.data || {};
      const v552 = {
        code: String(v544.code || ""),
        ...(typeof v545 === "boolean" || /^-?\d+(?:\.\d+)?$/.test(String(v545)) ? {
          target: v545
        } : {
          targetLength: String(v545).length
        })
      };
      const v553 = v372().querySelector(".switch[data-code=\"" + v544.code + "\"]");
      v553?.classList.add("busy");
      v396("请求下发车辆设置", v548, {
        phase: "requested",
        extra: v552
      });
      let v554;
      try {
        v554 = await v378.call(v550.ep, {
          vin: v547.vin,
          uid: "0",
          month: v547.month
        }, {
          body: v374.writeBody(v550, v545, v547.vin),
          scope: v547.owner,
          logScope: v548,
          runId: v548.runId,
          isLatest: () => v369.current(v547),
          method: "PUT",
          mockField: v544.key,
          value: v545
        });
      } catch (v556) {
        v396("车辆设置请求异常", v548, {
          phase: "end",
          kind: "err",
          extra: {
            ...v552,
            accepted: false
          }
        });
        throw v556;
      } finally {
        v553?.classList.remove("busy");
      }
      const v555 = !!v554.ok && v554.data !== false;
      v396(v555 ? "车辆设置指令已接受" : "车辆设置指令未接受", v548, {
        phase: "accepted",
        kind: v555 ? "ok" : "err",
        detail: "仅记录现有接口接受判据，不代表车辆状态已改变",
        extra: {
          ...v552,
          accepted: v555,
          stale: !!v554.stale || !v369.current(v547)
        }
      });
      if (!v369.current(v547)) {
        return false;
      }
      if (v555) {
        if (v549) {
          v375.closeSheet(v549);
        }
        v375.toast(v372(), v544.title + " 指令已接受（" + v546 + "），刷新中…");
        await new Promise(v562 => setTimeout(v562, 1200));
        if (!v369.current(v547)) {
          v396("车辆设置回读已停止", v548, {
            phase: "cancelled",
            kind: "warn",
            extra: {
              ...v552,
              accepted: true
            }
          });
          return false;
        }
        const v557 = await v399(v547, v548);
        const v558 = v370.data.info?.data || {};
        const v559 = v550.verifyKeys?.length ? v374.verifyWrite(v550, v558, v545) : [];
        const v560 = v559.length > 0 && v559.every(v563 => v563.ok);
        const v561 = (v550.sideEffectKeys || []).map(v564 => [v564, v401(v551, v564), v401(v558, v564)]).filter(([, v565, v566]) => String(v565) !== String(v566));
        v396("车辆设置回读结束", v548, {
          phase: "end",
          kind: v560 ? "ok" : v557 ? "warn" : "err",
          detail: v560 ? "目标字段回读一致" : "回读未显示目标值已改变",
          extra: {
            ...v552,
            accepted: true,
            readback: !!v557,
            confirm: v560,
            mismatch: v559.filter(v567 => !v567.ok).map(v568 => v568.key).slice(0, 4),
            sideChanged: v561.map(([v569]) => v569).slice(0, 4)
          }
        });
        if (!v369.current(v547)) {
          return true;
        }
        if (v560) {
          v375.toast(v372(), "已确认：" + v544.title + " → " + v546 + "（回读一致）");
        } else if (!v559.length) {
          v375.toast(v372(), v557 ? "已按车机回报更新" : "指令已发送，暂未取到车机新状态");
        } else if (v557) {
          v375.toast(v372(), "已发送，但回读未变：" + (v559.filter(v570 => !v570.ok).map(v571 => v402(v571.key) + "=" + (v571.got === null ? "空" : v571.got)).join("、") || "目标字段"), 3600);
        } else {
          v375.toast(v372(), "指令已发送，暂未取到车机新状态");
        }
        if (v561.length) {
          v375.toast(v372(), "连带变化：" + v561.map(([v572]) => v402(v572)).join("、"), 3200);
        }
        return true;
      }
      v375.toast(v372(), v554.message || v554.err || "设置失败，请稍后重试", 3600);
      return false;
    }
    async function v404(v573) {
      const v574 = v397().find(v575 => v575.code === v573);
      if (!v574?.write) {
        return;
      }
      await v403(v574, v574.value ? v574.write.off : v574.write.on, v574.value ? "关" : "开");
    }
    async function v405(v576, v577, v578) {
      const v579 = v397().find(v580 => v580.code === v576);
      if (!v579?.write) {
        return;
      }
      await v403(v579, String(v577), v578 || String(v577));
    }
    function v406(v581) {
      const v582 = v397().find(v586 => v586.code === v581);
      if (!v582?.write?.ready) {
        return;
      }
      const v583 = v582.options ? Object.entries(v582.options).map(([v587, v588]) => ({
        value: v587,
        label: String(v588)
      })) : v582.choices || [];
      if (!v583.length) {
        return;
      }
      const v584 = String(v582.value ?? "");
      const v585 = {
        cloud: "云端已确认",
        firmware: "固件已验证",
        mcu: "官方码表"
      };
      v375.sheet(v372(), {
        title: v582.title,
        sub: "点一下就生效，写完回读核对",
        key: "choice:" + v581,
        body: (v582.write?.sideEffectKeys?.length ? "<div class=\"note\">" + v375.icon("alert", 18) + "<div>这条指令会连带改：<b>" + v582.write.sideEffectKeys.map(v402).join("、") + "</b>，发完以回读结果为准。</div></div>" : "") + "<div class=\"choice-list\" role=\"radiogroup\" aria-label=\"" + v377(v582.title) + "\">" + v583.map(v589 => {
          const v590 = String(v589.value) === v584;
          const v591 = !/^\d+$/.test(v589.label);
          const v592 = v589.tier ? "<span class=\"choice-badge " + v377(v589.tier) + "\">" + v377(v585[v589.tier] || v589.tier) + "</span>" : "";
          return "<div class=\"choice-row" + (v590 ? " on" : "") + "\" role=\"radio\" aria-checked=\"" + v590 + "\" tabindex=\"0\"\n            data-act=\"dowrite-val\" data-code=\"" + v377(v581) + "\" data-value=\"" + v377(String(v589.value)) + "\" data-label=\"" + v377(v589.label) + "\">\n          <span class=\"choice-radio\" aria-hidden=\"true\"></span>\n          <span class=\"choice-label\">" + v377(v589.label) + "</span>" + v592 + "\n          " + (v591 ? "<span class=\"choice-raw tnum\">" + v377(String(v589.value)) + "</span>" : "") + "\n        </div>";
        }).join("") + "</div>"
      });
    }
    function v407(v593) {
      const v594 = v397().find(v599 => v599.code === v593);
      if (!v594?.write?.ready || !v594.palette?.length) {
        return;
      }
      const v595 = String(v594.value ?? "");
      const v596 = v600 => v600.name ? v600.name + "（色号 " + v600.id + "）" : "色号 " + v600.id;
      const v597 = v601 => {
        const v602 = String(v601.id) === v595;
        return "<div class=\"palette-cell" + (v602 ? " on" : "") + "\" role=\"radio\" aria-checked=\"" + v602 + "\" tabindex=\"0\"\n          aria-label=\"" + v377(v596(v601)) + "\" title=\"" + v377(v596(v601)) + "\"\n          data-act=\"dowrite-val\" data-code=\"" + v377(v593) + "\" data-value=\"" + v601.id + "\" data-label=\"" + v377(v596(v601)) + "\">\n        <span class=\"palette-dot" + (v601.hex ? "" : " plain") + "\"" + (v601.hex ? " style=\"background:" + v377(v601.hex) + "\"" : "") + ">" + (v601.hex ? "" : v377(v601.id)) + "</span>\n      </div>";
      };
      const v598 = v374.lightColor(v594.value);
      v375.sheet(v372(), {
        title: v594.title,
        sub: "点色块就下发，写完回读核对",
        key: "palette:" + v593,
        threeQuarter: true,
        body: "<div class=\"palette-now\">\n          <span class=\"palette-dot" + (v598.hex ? "" : " plain") + "\"" + (v598.hex ? " style=\"background:" + v377(v598.hex) + "\"" : "") + ">" + (v598.hex ? "" : v377(v598.id ?? "")) + "</span>\n          <div class=\"palette-now-text\"><span>当前颜色</span><b>" + v377(v598.name ? v598.name + "（色号 " + v598.id + "）" : v598.label) + "</b></div>\n        </div>\n        <div class=\"palette-grid\" role=\"radiogroup\" aria-label=\"" + v377(v594.title) + "\">" + v594.palette.map(v597).join("") + "</div>\n        <p class=\"palette-tip\">对应官方 App 的「" + v377(v594.title) + "」选色页；选中即下发，写完回读本档颜色核对。</p>"
      });
    }
    function v408(v603) {
      const v604 = v397().find(v617 => v617.code === v603);
      if (!v604?.write?.ready) {
        return;
      }
      const v605 = v410(v604);
      if (!v605) {
        return;
      }
      const v606 = v369.context();
      const v607 = Number(v604.value);
      const v608 = v605.values || null;
      const v609 = v608 ? 0 : v605.min;
      const v610 = v608 ? v608.length - 1 : v605.max;
      const v611 = v608 ? 1 : v605.step;
      const v612 = v618 => {
        const v619 = Number(v618);
        let v620 = 0;
        let v621 = Infinity;
        v608.forEach((v622, v623) => {
          const v624 = Math.abs(v622 - v619);
          if (v624 < v621) {
            v621 = v624;
            v620 = v623;
          }
        });
        return v620;
      };
      const v613 = v625 => v608 ? v608[v374.clamp(Math.round(Number(v625)), 0, v608.length - 1)] : v374.clamp(v605.min + Math.round((Number(v625) - v605.min) / v605.step) * v605.step, v605.min, v605.max);
      const v614 = v608 ? v608[v612(v607)] : v613(Number.isFinite(v607) ? v607 : v605.min);
      const v615 = v608 || (() => {
        const v626 = [];
        for (let v627 = v605.min; v627 <= v605.max; v627 += v605.step) {
          v626.push(v627);
        }
        return v626;
      })();
      const v616 = (v628, v629) => v608 ? v629 / (v608.length - 1) * 100 : (v628 - v605.min) / (v605.max - v605.min) * 100;
      v375.sheet(v372(), {
        title: v604.title,
        sub: v605.unit ? "单位：" + v605.unit : "",
        key: "slider:" + v603,
        body: "<div class=\"slider-box\">\n        <div class=\"slider-read\"><b class=\"tnum\" id=\"slvOut\">" + v614 + "</b><span>" + v377(v605.unit || "") + "</span></div>\n        <div class=\"slv-track\" id=\"slvTrack\">\n          <div class=\"slv-zone\" aria-hidden=\"true\">\n            <div class=\"slv-rail\" aria-hidden=\"true\"></div>\n            <div class=\"slv-fill\" id=\"slvFill\" aria-hidden=\"true\"></div>\n            <div class=\"slv-ticks\" aria-hidden=\"true\">" + v615.map((v630, v631) => {
          const v632 = v616(v630, v631);
          return "<i style=\"left:" + v632 + "%\" data-v=\"" + v630 + "\"></i>";
        }).join("") + "</div>\n            <div class=\"slv-knob\" id=\"slvKnob\" aria-hidden=\"true\"></div>\n          </div>\n          <input class=\"mslider\" type=\"range\" id=\"slvRange\" min=\"" + v609 + "\" max=\"" + v610 + "\" step=\"" + v611 + "\"\n            value=\"" + (v608 ? v612(v607) : v614) + "\" aria-label=\"" + v377(v604.title) + "\" aria-valuetext=\"" + v614 + v377(v605.unit || "") + "\">\n        </div>\n        <div class=\"slider-scale\"><span>" + (v608 ? v608[0] : v605.min) + "</span><span>" + v377(v608 ? v605.maxLabel || String(v608[v608.length - 1]) : String(v605.max)) + "</span></div>\n      </div>",
        onMount: v633 => {
          const v634 = v375.currentSheet("slider:" + v603);
          const v635 = v633.querySelector("#slvRange");
          const v636 = v633.querySelector("#slvOut");
          const v637 = v633.querySelector(".slv-zone");
          const v638 = [...v633.querySelectorAll(".slv-ticks i")];
          const v639 = v642 => {
            const v643 = v608 ? v612(v642) / (v608.length - 1) * 100 : v374.clamp((v642 - v605.min) / (v605.max - v605.min), 0, 1) * 100;
            v637.style.setProperty("--slv-position", v643 + "%");
            v638.forEach(v644 => {
              v644.classList.toggle("on", Number(v644.dataset.v) <= v642);
              v644.classList.toggle("current", Number(v644.dataset.v) === v642);
            });
          };
          v639(Number(v635.value));
          const v640 = () => {
            const v645 = v613(v635.value);
            v635.value = String(v608 ? v612(v645) : v645);
            v636.textContent = v645;
            v635.setAttribute("aria-valuetext", v645 + (v605.unit || ""));
            v639(v645);
          };
          v635.addEventListener("input", v640);
          let v641 = false;
          v635.addEventListener("change", async () => {
            if (v641 || !v375.sheetAlive(v634)) {
              return;
            }
            if (!v369.current(v606)) {
              v375.closeSheet(v634);
              return;
            }
            const v646 = String(v613(v635.value));
            if (v646 === String(v604.value)) {
              return;
            }
            v641 = true;
            v635.disabled = true;
            try {
              const v647 = await v403(v604, v646, "" + v646 + (v605.unit || ""));
              if (!v647 && v369.current(v606) && v375.sheetAlive(v634)) {
                v635.value = String(v608 ? v612(v614) : v614);
                v640();
              }
            } catch {
              if (v369.current(v606) && v375.sheetAlive(v634)) {
                v635.value = String(v608 ? v612(v614) : v614);
                v640();
                v375.toast(v372(), "设置失败，请稍后重试", 3600);
              }
            } finally {
              v641 = false;
              v635.disabled = false;
            }
          });
        }
      });
    }
    const v409 = new Map([["soundEffectSetting.soundSize", {
      min: 0,
      max: 100,
      step: 10,
      unit: ""
    }], ["lowPower", {
      min: 10,
      max: 50,
      step: 5,
      unit: "%"
    }], ["ecoMaxSpeed", {
      values: Array.from({
        length: 15
      }, (v648, v649) => 35 + v649),
      unit: "km/h"
    }], ["streetMaxSpeed", {
      values: Array.from({
        length: 16
      }, (v650, v651) => 50 + v651),
      unit: "km/h"
    }], ["sportMaxSpeed", {
      values: [...Array.from({
        length: 17
      }, (v652, v653) => 70 + v653), 999],
      maxLabel: "无限制",
      unit: "km/h"
    }]]);
    function v410(v654) {
      return v409.get(v654?.key || v654?.keys?.[0]) || null;
    }
    function v411(v655) {
      const v656 = v397().find(v657 => v657.code === v655);
      if (!v656?.write?.ready) {
        return;
      }
      if (v656.kind === "palette" && v656.palette?.length) {
        v407(v655);
      } else if (v410(v656)) {
        v408(v655);
      } else {
        v406(v655);
      }
    }
    function v412(v658) {
      const v659 = v374.parseTime(v658);
      if (!v659) {
        return "—";
      }
      const v660 = new Date(v659.getFullYear(), v659.getMonth(), v659.getDate());
      const v661 = new Date();
      const v662 = new Date(v661.getFullYear(), v661.getMonth(), v661.getDate());
      return Math.max(0, Math.round((v660 - v662) / 86400000));
    }
    const v413 = new Map();
    const v414 = new Map();
    const v415 = new Map();
    let v416 = null;
    const v417 = v663 => typeof v663 === "string" ? JSON.parse(v663) : v663;
    function v418(v664) {
      return !!v664 && v369.current(v664);
    }
    function v419() {
      if (!v416 || !v418(v416)) {
        v413.clear();
        v414.clear();
        v415.clear();
        v369.mem.widgetCfg = null;
        v416 = v369.context();
      }
    }
    async function v420(v665, v666 = [], v667 = v369.context()) {
      if (!v383(v665) || !v418(v667)) {
        throw new Error("unsupported");
      }
      if (v369.isIOS?.()) {
        const v670 = await v369.syncIOSSession?.();
        if (v670?.ok !== true || !v670.navId || !v670.frame || !Number.isSafeInteger(v670.epoch) || !Number.isSafeInteger(v670.generation) || !v670.accountId || v670.vin !== v667.vin) {
          throw new Error("stale_session");
        }
      }
      if (!v418(v667)) {
        throw new Error("stale_session");
      }
      const v668 = await Promise.resolve(window.NativeShell.call(v665, v666));
      if (!v418(v667)) {
        throw new Error("stale_session");
      }
      const v669 = v417(v668);
      if (v668 === false || v669?.ok === false || v669?.accepted === false || v669?.canceled === true || v669?.pending === true || v669?.queued === true || v669?.submitted === true) {
        throw new Error("native_rejected");
      }
      return v669;
    }
    async function v421(v671, v672 = false, v673 = "", v674 = v369.context()) {
      if (!v369.isIOS?.()) {
        return v427(v671, v672, v673);
      }
      v419();
      v671 = Number(v671);
      const v675 = String(v673 || "").replace("×", "x");
      if (!Number.isInteger(v671) || v671 < 0 || v675 && !v426.includes(v675)) {
        return null;
      }
      const v676 = v675 ? v671 + "|" + v675 : v671;
      if (!v672 && v415.has(v676) && Date.now() - v415.get(v676) < 30000) {
        return v413.get(v676) || null;
      }
      if (v414.has(v676)) {
        return v414.get(v676).promise;
      }
      const v677 = {
        scope: v674,
        promise: null,
        manager: v375.currentSheet?.("widgets"),
        edit: v424.handle
      };
      v677.promise = (async () => {
        try {
          const v678 = v675 && v383("widgetSettingsForSize") ? "widgetSettingsForSize" : v383("widgetSettingsFor") ? "widgetSettingsFor" : v671 === 0 ? "widgetSettings" : "";
          const v679 = await v420(v678, v678 === "widgetSettingsForSize" ? [v671, v675] : v678 === "widgetSettingsFor" ? [v671] : [], v674);
          if (v414.get(v676) !== v677 || !v418(v674)) {
            return null;
          }
          if (!v679 || Array.isArray(v679) || v679.ok !== true || Number(v679.id) !== v671 || v671 > 0 && v679.bound !== true) {
            throw new Error("invalid_configuration");
          }
          v413.set(v676, v679);
          v415.set(v676, Date.now());
          if (v671 === 0 && !v675) {
            v369.mem.widgetCfg = v679;
          }
          return v679;
        } catch {
          if (v414.get(v676) === v677 && v418(v674)) {
            v413.delete(v676);
            v415.set(v676, Date.now());
            if (v671 === 0 && !v675) {
              v369.mem.widgetCfg = null;
            }
          }
          return null;
        } finally {
          if (v414.get(v676) === v677) {
            v414.delete(v676);
          }
        }
      })();
      v414.set(v676, v677);
      return v677.promise;
    }
    function v422(v680, v681) {
      v419();
      const v682 = v681 ? v680 + "|" + v681 : v680;
      if (!v414.has(v682) && (!v415.has(v682) || Date.now() - v415.get(v682) >= 30000)) {
        const v683 = v369.context();
        const v684 = v375.currentSheet?.("widgets");
        const v685 = v424.handle;
        const v686 = v421(v680, false, v681, v683);
        const v687 = v414.get(v682);
        v686.then(() => {
          if (!v418(v683)) {
            return;
          }
          v369.render?.({
            keepScroll: true
          });
          const v688 = v687?.manager || v684;
          if (v688 && v375.currentSheet("widgets") === v688 && v375.sheetAlive(v688)) {
            v458();
          }
          if (v685 && v424.handle === v685 && v375.sheetAlive(v685)) {
            v460();
          }
        });
      }
      return v413.get(v682) || null;
    }
    function v423() {
      v369.mem.widgetCfg = null;
      v413.clear();
      v415.clear();
      v414.clear();
    }
    const v424 = {
      id: null,
      scope: null,
      handle: null,
      serial: 0,
      statSlot: null,
      defaultSize: "4x4",
      previewAutoRetried: false
    };
    const v425 = {
      serial: 0,
      pick: null
    };
    const v426 = ["1x1", "2x2", "4x2", "4x4"];
    function v427(v689, v690, v691) {
      v689 = Number(v689);
      if (!v369.inShell() || !Number.isInteger(v689) || v689 < 0) {
        return null;
      }
      const v692 = v386();
      const v693 = String(v691 || "").replace("×", "x");
      if (v693 && !v426.includes(v693)) {
        return null;
      }
      if (v369.isIOS?.()) {
        return v422(v689, v693);
      }
      const v694 = (v693 === "4x2" || v693 === "4x4") && typeof v692?.widgetSettingsForSize === "function";
      if (v694) {
        const v697 = v427(v689, true);
        if (!v697 || v689 > 0 && v430(v697) !== v693) {
          return null;
        }
        try {
          const v698 = JSON.parse(v692.widgetSettingsForSize(v689, v693) || "null");
          if (!v698 || Array.isArray(v698) || typeof v698 !== "object" || v698.ok === false || Number(v698.id) !== v689 || v698.bound !== true || v430(v698) !== v693) {
            return null;
          }
          return {
            ...v697,
            ...v698
          };
        } catch {
          return null;
        }
      }
      const v695 = typeof v692?.widgetSettingsFor === "function" ? () => v692.widgetSettingsFor(v689) : v689 === 0 && typeof v692?.widgetSettings === "function" ? () => v692.widgetSettings() : null;
      if (!v695) {
        v413.delete(v689);
        return null;
      }
      if (!v690 && v413.has(v689)) {
        const v699 = v413.get(v689);
        if (v693 && v689 > 0 && v430(v699) !== v693) {
          return null;
        } else {
          return v699;
        }
      }
      let v696 = null;
      try {
        const v700 = JSON.parse(v695() || "null");
        if (v700 && !Array.isArray(v700) && typeof v700 === "object" && v700.ok !== false && (v689 === 0 ? v700.id === undefined || Number(v700.id) === 0 : Number(v700.id) === v689 && v700.bound !== false) && (!v693 || v689 === 0 || v430(v700) === v693)) {
          v696 = v700;
        }
      } catch {}
      v413.delete(v689);
      if (v696) {
        v413.set(v689, v696);
      }
      if (v689 === 0) {
        v369.mem.widgetCfg = v696;
      }
      return v696;
    }
    function v428(v701) {
      return v427(0, v701);
    }
    function v429(v702) {
      return [...new Set((Array.isArray(v702?.ids) ? v702.ids : []).map(Number).filter(v703 => Number.isInteger(v703) && v703 > 0))];
    }
    function v430(v704) {
      const v705 = String(v704?.size || "").replace("×", "x");
      if (v426.includes(v705)) {
        return v705;
      } else {
        return String(v704?.provider || "").match(/Widget(1x1|2x2|4x2|4x4)(?:\b|[A-Z_$])/)?.[1] || "";
      }
    }
    function v431() {
      const v706 = window.ACC;
      if (v706?.avail?.() && v706.ready?.()) {
        return v706.mergedVehicles();
      }
      return v370.vehicles || [];
    }
    function v432(v707) {
      const v708 = String(v707?.effectiveVin || v707?.vin || v707?.currentVin || "");
      const v709 = v707?.vehicles?.find(v713 => v713.id === v707.vehicleID);
      if (v707?.configuration === "system_widget_editor" && v709) {
        return "" + (v709.name || "车辆") + (v709.suffix ? " / 尾号 " + v709.suffix : "");
      }
      const v710 = v431().find(v714 => String(v714.vin) === v708);
      const v711 = v707?.vehicleName || v707?.name || v710?.name || "未选择车辆";
      const v712 = String(v710?.plate || v708).slice(-4);
      return "" + v711 + (v712 ? " / 尾号 " + v712 : "");
    }
    function v433(v715) {
      const v716 = v472(v715);
      const v717 = v438(v715.dataset.wid, v716, v715.dataset.size);
      if (!v717) {
        return false;
      }
      const v718 = window.ACC;
      const v719 = v717.cfg.configuration === "system_widget_editor";
      const v720 = [{
        vin: "",
        title: "跟随当前车辆",
        detail: "随 App 当前选择的车辆变化",
        key: v719 ? "vehicleID" : "vin"
      }, ...(v719 ? (v717.cfg.vehicles || []).filter(v724 => typeof v724.id === "string" && v724.id).map(v725 => ({
        vin: v725.id,
        key: "vehicleID",
        title: v725.name || "车辆",
        detail: "已同步的系统快照" + (v725.suffix ? " · 尾号 " + v725.suffix : "")
      })) : v431().filter(v726 => String(v726.vin || "").trim()).map(v727 => {
        const v728 = v727.ownerAcc ? v718?.byId?.(v727.ownerAcc) : null;
        const v729 = v728 ? v718.snapshot(v728.id) : null;
        const v730 = !!v727.ownerAcc && (!v729 || !!v728.invalidAt);
        const v731 = String(v727.plate || v727.vin).slice(-4);
        return {
          vin: String(v727.vin),
          title: v727.name || "车辆",
          owner: v729,
          unavailable: v730,
          label: v727.ownerLabel || "",
          detail: "" + (v731 ? "尾号 " + v731 : "") + (v730 ? " · 账号已失效，请重新登录" : "")
        };
      }))];
      const v721 = ++v425.serial;
      const v722 = {
        serial: v721,
        scope: v716,
        wid: v717.wid,
        edit: v424.handle,
        size: v715.dataset.size,
        choices: v720,
        handle: null
      };
      v425.pick = v722;
      v448();
      const v723 = String(v719 ? v717.cfg.vehicleID || "" : v717.cfg.vin || "");
      v722.handle = v375.sheet(v372(), {
        key: "widgetvin:" + v717.wid,
        title: "显示车辆",
        sub: v717.wid ? "只设置这个小组件，不切换 App 当前车辆" : "设置新小组件的默认车辆",
        body: "<div class=\"widget-vehicle-choices choice-list\" role=\"radiogroup\" aria-label=\"小组件显示车辆\">" + v720.map((v732, v733) => {
          const v734 = v723 === v732.vin;
          return "<div class=\"choice-row" + (v734 ? " on" : "") + "\" role=\"radio\" aria-checked=\"" + v734 + "\" aria-disabled=\"" + !!v732.unavailable + "\" tabindex=\"" + (v732.unavailable ? -1 : 0) + "\"\n            " + (v732.unavailable ? "" : "data-act=\"wvinpick\" data-wid=\"" + v717.wid + "\" data-wscope=\"" + v424.serial + "\" data-wpick=\"" + v721 + "\" data-choice=\"" + v733 + "\"") + ">\n          <span class=\"choice-radio\" aria-hidden=\"true\"></span><span class=\"choice-label\">\n            <span>" + v377(v732.title) + (v732.label ? "<span class=\"acc-badge\">" + v377(v732.label) + "</span>" : "") + "</span>\n            <span class=\"widget-note\">" + v377(v732.detail) + "</span>\n          </span></div>";
        }).join("") + "</div>" + (v720.length === 1 ? "<p class=\"widget-note\">暂无可选车辆，请先在登录与账号中添加或刷新账号。</p>" : ""),
        onDismiss: () => {
          if (v425.pick === v722) {
            v425.pick = null;
          }
        }
      });
      return true;
    }
    async function v434(v735) {
      const v736 = v425.pick;
      const v737 = v472(v735);
      const v738 = Number(v735.dataset.choice);
      if (!v736 || v737 !== v736.scope || Number(v735.dataset.wpick) !== v736.serial || v736.edit !== v424.handle || v375.currentSheet() !== v736.handle || !/^\d+$/.test(String(v735.dataset.choice || "")) || !Number.isInteger(v738)) {
        return false;
      }
      const v739 = v736.choices[v738];
      if (!v739 || v739.unavailable || !v438(v736.wid, v737, v736.size)) {
        return false;
      }
      if (v739.vin && v739.key !== "vehicleID") {
        const v740 = window.ACC;
        const v741 = v431().find(v742 => String(v742.vin) === v739.vin);
        if (!v741 || v739.owner && (!v740?.current?.(v739.owner) || v741.ownerAcc !== v739.owner.id || v740.byId(v739.owner.id)?.invalidAt)) {
          v375.toast(v372(), "车辆或账号已变化，请重新选择", 2800);
          return false;
        }
      }
      if (!(await Promise.resolve(v441(v739.key || "vin", v739.vin, v736.wid, v737, v736.size)))) {
        return false;
      }
      if (!v369.current(v737) || v425.pick !== v736 || v424.handle !== v736.edit) {
        return false;
      }
      if (v375.currentSheet() === v736.handle) {
        v375.back();
      }
      if (v425.pick === v736) {
        v425.pick = null;
      }
      v375.toast(v372(), "已保存", 1500);
      return true;
    }
    function v435(v743) {
      return v743 === true || v743 === 1 || v743 === "1" || v743 === "true";
    }
    function v436(v744, v745, v746) {
      if (!v744 || !Object.prototype.hasOwnProperty.call(v744, v745)) {
        return false;
      }
      if (v745 === "showName" || v745 === "showTime") {
        if (![true, false, 0, 1, "0", "1", "true", "false"].includes(v744[v745])) {
          return false;
        }
        return v435(v744[v745]) === v435(v746);
      }
      const v747 = v744[v745];
      if (v745 === "vin" || v745 === "vehicleID") {
        return v745 === "vehicleID" && v747 === null && v746 === "" || typeof v747 === "string" && v747 === String(v746);
      } else {
        return (typeof v747 === "number" || typeof v747 === "string" && /^-?\d+$/.test(v747)) && Number(v747) === Number(v746);
      }
    }
    function v437(v748 = "这个小组件已不在桌面，请重新选择") {
      const v749 = v424.handle;
      const v750 = v425.pick;
      v424.scope = null;
      if (v750?.edit === v749 && v375.currentSheet() === v750.handle) {
        v375.back();
      }
      v425.pick = null;
      while (v375.currentSheet() && v375.currentSheet() === v749) {
        v375.back();
      }
      v424.handle = null;
      v424.id = null;
      v375.toast(v372(), v748, 2800);
      if (v375.currentSheet("widgets")) {
        v458();
      }
    }
    function v438(v751, v752, v753) {
      const v754 = Number(v751);
      if (!Number.isInteger(v754) || v754 < 0 || v752 !== v424.scope || !v752 || !v369.current(v752) || v754 !== v424.id || !v375.sheetAlive(v424.handle)) {
        v375.toast(v372(), "编辑身份已变化，请返回管理页重新打开", 2800);
        return null;
      }
      const v755 = v428(true);
      if (!v369.current(v752) || v752 !== v424.scope) {
        return null;
      }
      if (!v755) {
        v375.toast(v372(), "读取小组件配置失败，未保存", 2800);
        return null;
      }
      if (v754 > 0 && !v429(v755).includes(v754)) {
        v437();
        return null;
      }
      if (v754 > 0 && (!v383("widgetSettingsFor") || !v383("setWidgetSettingFor"))) {
        v375.toast(v372(), "旧版壳只能编辑全局默认，请更新壳后编辑实例", 2800);
        return null;
      }
      const v756 = v754 === 0 ? v753 ? v427(0, true, v753) : v755 : (() => {
        const v757 = v430(v427(v754, true));
        return v427(v754, true, v753 || v757);
      })();
      if (!v756) {
        v375.toast(v372(), "读取小组件配置失败，未保存", 2800);
        return null;
      }
      if (v369.current(v752) && v752 === v424.scope) {
        return {
          wid: v754,
          cfg: v756
        };
      } else {
        return null;
      }
    }
    async function v439(v758, v759, v760) {
      if (!v369.isIOS?.()) {
        return v438(v758, v759, v760);
      }
      const v761 = Number(v758);
      const v762 = v424.handle;
      if (!Number.isInteger(v761) || v761 < 0 || v759 !== v424.scope || !v759 || !v369.current(v759) || v761 !== v424.id || !v375.sheetAlive(v762)) {
        return null;
      }
      const v763 = await v421(0, true, "", v759);
      if (!v763 || v759 !== v424.scope || v762 !== v424.handle || !v369.current(v759) || !v375.sheetAlive(v762)) {
        return null;
      }
      if (v761 > 0 && !v429(v763).includes(v761)) {
        return null;
      }
      const v764 = v760 ? await v421(v761, true, v760, v759) : v761 === 0 ? v763 : await v421(v761, true, "", v759);
      if (v764 && v759 === v424.scope && v762 === v424.handle && v369.current(v759) && v375.sheetAlive(v762)) {
        return {
          wid: v761,
          cfg: v764
        };
      } else {
        return null;
      }
    }
    function v440(v765) {
      const v766 = [[-1, "跟随系统"], [0, "浅色"], [1, "深色"]];
      if (v765?.configuration !== "system_widget_editor") {
        for (const v767 of [[2, "半透明白"], [3, "半透明黑"]]) {
          if (Array.isArray(v765?.supportedDarkModes) && v765.supportedDarkModes.includes(v767[0])) {
            v766.push(v767);
          }
        }
      }
      return v766;
    }
    async function v441(v768, v769, v770, v771 = v424.scope, v772) {
      const v773 = await Promise.resolve(v439(v770, v771, v772));
      if (!v773) {
        return false;
      }
      const {
        wid: v774
      } = v773;
      const v775 = v768 === "vin" || v768 === "vehicleID" ? typeof v769 === "string" : v768 === "dark" ? v440(v773.cfg).some(([v779]) => v779 === Number(v769)) : v768 === "timeMode" || v768 === "tap" ? [0, 1].includes(Number(v769)) : (v768 === "showName" || v768 === "showTime") && [true, false, 0, 1, "0", "1"].includes(v769);
      if (!v775) {
        return false;
      }
      if (v773.cfg.configuration === "system_widget_editor" && !["vin", "vehicleID", "showName", "showTime"].includes(v768)) {
        v375.toast(v372(), "这个样式由 iOS 系统小组件配置管理，未修改设置", 2800);
        return false;
      }
      const v776 = {
        [v768]: v769
      };
      const v777 = v395("widget-setting", v771);
      const v778 = {
        widgetId: v774,
        key: v768,
        ...(v768 === "vin" || v768 === "vehicleID" ? {
          valueLength: v769.length
        } : {
          value: v769
        })
      };
      v396("请求保存小组件配置", v777, {
        phase: "requested",
        extra: v778
      });
      try {
        const v780 = v383("setWidgetSettingFor") ? "setWidgetSettingFor" : v774 === 0 && v383("setWidgetSetting") ? "setWidgetSetting" : "";
        await Promise.resolve(v420(v780, v780 === "setWidgetSettingFor" ? [v774, v768, String(v769)] : [v768, String(v769)], v771));
        v423();
        const v781 = (await v439(v774, v771, v772))?.cfg;
        if (!v781 || !Object.entries(v776).every(([v782, v783]) => v436(v781, v782, v783))) {
          throw new Error("readback");
        }
        v448();
        v460();
        v458();
        v396("小组件配置回读已确认", v777, {
          kind: "ok",
          extra: {
            ...v778,
            readback: true
          }
        });
        return true;
      } catch {
        v396("小组件配置未确认保存", v777, {
          kind: "err",
          extra: {
            ...v778,
            readback: false
          }
        });
        if (!v369.current(v771) || v771 !== v424.scope) {
          return false;
        }
        v375.toast(v372(), "保存失败，配置回读未确认，请重试", 2800);
        if (v375.sheetAlive(v424.handle)) {
          v460();
        }
        return false;
      }
    }
    const v442 = {
      serial: 0,
      request: null
    };
    const v443 = 2097152;
    function v444(v784) {
      const v785 = v426.includes(v784);
      const v786 = v785 ? v784.replace("x", "×") : "尺寸未知";
      return "<span class=\"widget-native-size" + (v785 ? " widget-native-size-" + v784 : "") + "\" aria-label=\"" + v786 + "，尺寸示意，不是布局预览\">\n      " + v375.icon("chip", 18) + "<b>" + v786 + "</b><span>尺寸示意</span></span>";
    }
    function v445() {
      return v383("beginWidgetPreview") && v383("pollWidgetPreview");
    }
    function v446() {
      return "<section class=\"widget-native-preview\" aria-label=\"原生小组件预览\" aria-live=\"polite\" aria-busy=\"" + v445() + "\">\n      <div class=\"widget-native-content\"><p class=\"widget-note\">" + (v445() ? "正在加载原生预览…" : "当前版本不支持原生预览") + "</p></div>\n      <button class=\"widget-button widget-native-retry\" type=\"button\" data-widget-preview-retry hidden>重试预览</button>\n    </section>";
    }
    function v447(v787, v788) {
      return JSON.stringify([v788, v787?.id, v787?.provider, v787?.bound, v787?.vin, v787?.effectiveVin, v787?.currentVin, v787?.vehicleName, v787?.name, v787?.dark, v787?.showName, v787?.showTime, v787?.timeMode, v787?.tap, v787?.hideSeatStatus === true, v787?.hideSeatCushion === true, Array.isArray(v787?.stats) ? v787.stats.join(",") : "", v787?.statSlots, v787?.statsDefault, Array.isArray(v787?.statFields) ? v787.statFields.map(v789 => [v789?.id, v789?.title]) : [], v787?.previewRevision, v370.theme, v369.resolvedTheme()]);
    }
    function v448() {
      const v790 = v442.request;
      v442.request = null;
      v442.serial++;
      if (!v790) {
        return;
      }
      clearTimeout(v790.timer);
      v790.observer?.disconnect();
      v790.image = null;
      v790.root?.querySelector(".widget-native-content")?.replaceChildren();
    }
    function v449(v791) {
      return v442.request === v791 && v442.serial === v791.serial && v424.handle === v791.handle && v424.serial === v791.editSerial && v424.id === v791.id && v424.scope === v791.scope && v369.current(v791.scope) && v375.sheetAlive(v791.handle) && v375.currentSheet() === v791.handle && v791.root?.isConnected !== false;
    }
    function v450(v792) {
      if (!v449(v792)) {
        return false;
      }
      const v793 = v428(true);
      if (!v793 || v792.id > 0 && !v429(v793).includes(v792.id) || v792.id === 0 && v424.defaultSize !== v792.size) {
        return false;
      }
      const v794 = v427(v792.id, true, v792.size);
      return v449(v792) && !!v794 && v447(v794, v792.size) === v792.signature;
    }
    function v451(v795) {
      if (!v449(v795)) {
        return;
      }
      const v796 = v795.root.querySelector(".widget-native-content");
      const v797 = v795.root.querySelector("[data-widget-preview-retry]");
      if (!v796 || !v797) {
        return;
      }
      v795.root.setAttribute("aria-busy", String(v795.state === "loading"));
      v797.hidden = v795.state === "loading" || v795.state === "ready";
      if (v795.state === "ready") {
        const v798 = v795.image;
        const v799 = v795.root;
        v796.innerHTML = "<figure class=\"widget-native-figure\"><img class=\"widget-native-image\" src=\"data:image/png;base64," + v798.base64 + "\"\n        width=\"" + v798.width + "\" height=\"" + v798.height + "\" alt=\"" + v377(v798.caption) + "\"><figcaption class=\"widget-native-caption\">" + v377(v798.caption) + "</figcaption></figure>";
        v796.querySelector("img")?.addEventListener("error", () => {
          if (!v449(v795) || v795.root !== v799) {
            return;
          }
          v795.image = null;
          v795.state = "error";
          v795.message = "原生预览图片无法显示，请重试。";
          v451(v795);
        }, {
          once: true
        });
      } else {
        const v800 = document.createElement("p");
        v800.className = v795.state === "loading" ? "widget-note widget-loading" : "widget-note";
        v800.textContent = v795.message;
        if (v795.state === "loading") {
          v800.dataset.at = String(v795.started);
        }
        v796.replaceChildren(v800);
      }
    }
    function v452(v801) {
      const {
        base64: v802,
        width: v803,
        height: v804,
        source: v805,
        updatedAt: v806
      } = v801;
      if (v801.previewOnly !== true || !Number.isInteger(v803) || !Number.isInteger(v804) || v803 < 1 || v804 < 1 || v803 > 800 || v804 > 800 || !["sample", "snapshot"].includes(v805) || !Number.isSafeInteger(v806) || v806 < 0 || v806 > 8640000000000000 || typeof v802 !== "string" || v802.length > v443 || !v802.startsWith("iVBORw0KGgo") || v802.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(v802)) {
        throw new Error("invalid_image");
      }
      const v807 = new Date(v806);
      const v808 = v806 > 0 ? String(v807.getHours()).padStart(2, "0") + ":" + String(v807.getMinutes()).padStart(2, "0") : "";
      const v809 = (v805 === "sample" ? "原生布局 · 示例数据" : "原生布局 · 车况快照" + (v808 ? " · 更新于 " + v808 : "")) + (v801.contentExpanded === true ? "；按内容完整显示，桌面尺寸由启动器决定" : "");
      return {
        base64: v802,
        width: v803,
        height: v804,
        caption: v809
      };
    }
    function v453(v810) {
      v810.timer = setTimeout(() => {
        if (!v449(v810)) {
          if (v442.request === v810) {
            v448();
          }
          return;
        }
        if (!v450(v810)) {
          v448();
          v460();
          return;
        }
        if (v810.state === "error" && v810.message.includes("超时") && !v424.previewAutoRetried) {
          v424.previewAutoRetried = true;
          v448();
          v460();
          return;
        }
        v453(v810);
      }, 500);
    }
    async function v454(v811) {
      if (!v449(v811)) {
        if (v442.request === v811) {
          v448();
        }
        return;
      }
      try {
        if (!v445()) {
          throw new Error("unsupported");
        }
        const v812 = await Promise.resolve(v386().pollWidgetPreview(v811.ticket));
        if (!v449(v811)) {
          return;
        }
        if (typeof v812 === "string" && v812.length > v443 + 4096) {
          throw new Error("invalid_response");
        }
        const v813 = v417(v812);
        if (!v813 || v813.ticket !== v811.ticket || typeof v813.done !== "boolean") {
          throw new Error("invalidticket");
        }
        if (!v813.done) {
          if (++v811.polls >= 60 || Date.now() - v811.started >= 15000) {
            throw new Error("timeout");
          }
          v811.timer = setTimeout(() => v454(v811), 200);
          return;
        }
        if (v813.ok !== true) {
          throw new Error(v813.error === "invalidticket" ? "invalidticket" : "native_error");
        }
        const v814 = v452(v813);
        if (!v450(v811)) {
          v448();
          v460();
          return;
        }
        v811.image = v814;
        v811.state = "ready";
      } catch (v815) {
        v811.image = null;
        v811.state = "error";
        v811.message = !v445() ? "当前版本不支持原生预览" : v815.message === "timeout" ? "原生预览超时，请重试。" : "原生预览失败或已失效，请重试。";
      }
      v451(v811);
      v453(v811);
    }
    function v455(v816, v817, v818, v819, v820, v821) {
      const v822 = v816?.querySelector(".widget-native-preview");
      if (!v822 || v817 !== v424.handle || v820 !== v424.serial || v819 !== v424.scope || !v819 || !v369.current(v819) || v375.currentSheet() !== v817) {
        return;
      }
      const v823 = v821 || v430(v818) || (Number(v818?.id) === 0 ? v424.defaultSize === "4x2" ? "4x2" : "4x4" : "4x4");
      const v824 = v447(v818, v823);
      let v825 = v442.request;
      if (v825 && v825.handle === v817 && v825.editSerial === v820 && v825.scope === v819 && v825.signature === v824) {
        v825.root = v822;
      } else {
        v448();
        v825 = {
          handle: v817,
          editSerial: v820,
          id: v424.id,
          scope: v819,
          size: v823,
          signature: v824,
          root: v822,
          serial: v442.serial,
          state: "loading",
          message: "正在加载原生预览…",
          image: null,
          ticket: null,
          polls: 0,
          started: Date.now()
        };
        v442.request = v825;
        if (typeof MutationObserver === "function" && document.documentElement) {
          v825.observer = new MutationObserver(() => {
            if (!v449(v825)) {
              if (v442.request === v825) {
                v448();
              }
              return;
            }
            if (v825.signature !== v447(v818, v823) || !v369.current(v819)) {
              v448();
              v460();
            }
          });
          v825.observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-theme", "class"]
          });
        }
        if (!v445()) {
          v825.state = "error";
          v825.message = "当前版本不支持原生预览";
        } else {
          (async () => {
            try {
              const v826 = await Promise.resolve(v386().beginWidgetPreview(v825.id, v823));
              if (!v449(v825)) {
                return;
              }
              if (typeof v826 !== "string" || !/^[A-Za-z0-9._:-]{1,160}$/.test(v826)) {
                throw new Error("invalidticket");
              }
              v825.ticket = v826;
              v825.timer = setTimeout(() => v454(v825), 0);
            } catch {
              if (!v449(v825)) {
                return;
              }
              v825.state = "error";
              v825.message = "原生预览请求失败，请重试。";
              v451(v825);
            }
          })();
        }
      }
      v822.querySelector("[data-widget-preview-retry]")?.addEventListener("click", () => {
        if (!v449(v825)) {
          return;
        }
        v424.previewAutoRetried = false;
        v448();
        v460();
      });
      v451(v825);
    }
    function v456() {
      if (!v385()) {
        return "";
      }
      const v827 = v428();
      return "<div class=\"widget-entry\"><button class=\"widget-entry-button\" data-act=\"widgets\" aria-expanded=\"false\">\n      " + v375.icon("chip", 20) + "<span class=\"widget-entry-copy\"><b>桌面小组件</b><span>" + (v827 ? v827.instanceIDsSupported === false ? "系统管理 · " + (Number(v827.installedCount) || 0) + " 个桌面小组件" : "管理 " + v429(v827).length + " 个桌面实例" : v382() ? "UI 示意 · 原生配置 unavailable" : "正在读取系统配置") + "</span></span>" + v375.icon("right", 18) + "\n    </button></div>";
    }
    function v457(v828, v829, v830) {
      const v831 = v369.mem.widgetCfg?.instances?.find(v835 => Number(v835.id) === v828);
      const v832 = v831 || v427(v828, true);
      if (!v832) {
        return "<div class=\"widget-note\">实例 ID " + v828 + " 的配置暂时无法读取</div>";
      }
      const v833 = v430(v832);
      const v834 = v828 === 0 ? "全局默认" : (v833 ? v833.replace("x", "×") : "尺寸未知") + " · " + v432(v832);
      return "<button class=\"widget-instance\" data-act=\"widgetedit\" data-wid=\"" + v828 + "\">\n      " + v444(v833) + "<span class=\"widget-instance-copy\"><b>" + v377(v834) + "</b>\n      <span>" + (v828 > 0 ? (v832.vin ? "固定车辆" : "跟随当前车辆") + " · 实例 ID " + v828 : "新实例默认配置 · ID 0") + "</span></span>\n    </button>";
    }
    function v458(v836 = false) {
      if (!v385()) {
        return;
      }
      if (v382()) {
        return v375.sheet(v372(), {
          key: "widgets",
          full: true,
          title: "桌面小组件",
          sub: "UI 测试预览",
          body: "<div class=\"widget-page\"><p class=\"widget-note\">UI 尺寸示意 · 原生配置 unavailable</p>\n        <div class=\"widget-instance-list\">" + v426.map((v846, v847) => "<button class=\"widget-instance\" data-act=\"widgetedit\" data-wid=\"" + v847 + "\" data-preview-size=\"" + v846 + "\">\n          " + v444(v846) + "<span class=\"widget-instance-copy\"><b>" + v846.replace("x", "×") + " 示例</b><span>查看全部配置控件</span></span></button>").join("") + "</div></div>"
        });
      }
      const v837 = v375.currentSheet("widgets");
      if (!v836 && !v837) {
        return;
      }
      const v838 = v428(true);
      const v839 = v429(v838);
      const v840 = Number(v838?.extraLimit) || 0;
      const v841 = v838?.usedVins?.length || 0;
      const v842 = v383("widgetSettingsFor");
      const v843 = v838?.configuration === "system_widget_editor";
      const v844 = {
        key: "widgets",
        full: true,
        title: "桌面小组件",
        sub: "本地配置 · 尺寸示意不是布局预览",
        onMount: () => v448(),
        body: "<div class=\"widget-page\">\n      " + (v840 > 0 && v841 > v840 ? "<p class=\"widget-note widget-warning\">" + (v838?.extraRoundRobin === true ? "已绑定 " + v841 + " 台车，将分批刷新，更新时间可能不同。" : "已绑定 " + v841 + " 台车，超过同时显示上限（" + v840 + " 台），超出的车辆不会自动更新。请更新 App 以支持分批刷新。") + "</p>" : "") + "\n      <h3 class=\"widget-heading\">桌面实例" + (v838 ? " · " + (v843 ? Number(v838.installedCount) || 0 : v839.length) : "") + "</h3>\n      " + (!v838 ? "<p class=\"widget-note\" role=\"status\">" + (v414.size ? "正在读取系统小组件配置…" : "本地配置暂时无法读取，请更新壳或重新打开。") + "</p>" : v843 ? "<p class=\"widget-note\">iOS 不提供可编辑的数字实例 ID。每个小组件长按后选择「编辑小组件」，使用系统的匿名车辆选择器；这里编辑共同默认。</p>" : !v842 ? "<p class=\"widget-note\">旧版壳不支持实例编辑，仅可修改全局默认。</p>" : !v839.length ? "<p class=\"widget-note\">桌面尚无小组件。</p>" : "") + "\n      <div class=\"widget-instance-list\">" + (v838 ? (v842 ? v839.map((v848, v849) => v457(v848, v849, v839.length)).join("") : "") + v457(0, 0, 1) : "") + "</div>\n      <p class=\"widget-note\">" + (v843 ? "添加小组件：长按主屏幕空白处 → 添加小组件 → 几何面板。系统决定尺寸、样式与刷新预算；显示指引不代表已添加。" : "添加小组件：长按桌面空白处 → 小组件 → 几何面板。每款尺寸固定，已添加的实例不能调整大小。") + "</p>\n      <h3 class=\"widget-heading\">从桌面移除</h3><p class=\"widget-note\">长按桌面上的小组件，选择「移除」或拖到移除区域。恢复默认只清配置，不会删除桌面实例。</p>\n    </div>"
      };
      const v845 = v837 ? (v375.updateSheet(v837, v844), v837) : v375.sheet(v372(), v844);
      for (const v850 of v414.values()) {
        if (!v850.manager) {
          v850.manager = v845;
        }
      }
      return v845;
    }
    async function v459(v851) {
      if (!v385()) {
        return;
      }
      if (v382()) {
        const v857 = (v858, v859) => "<section class=\"widget-block\"><h3 class=\"widget-heading\">" + v858 + "</h3><div class=\"widget-options\">" + v859.map(v860 => "<button class=\"widget-button\" data-widget-preview>" + v860 + "</button>").join("") + "</div></section>";
        return v375.sheet(v372(), {
          key: "widgetedit:" + v851,
          full: true,
          title: "小组件配置示例",
          sub: "UI 测试预览",
          body: "<div class=\"widget-page\"><p class=\"widget-note\">" + v377(window.PLATFORM.message("桌面小组件")) + "</p>" + v857("尺寸", ["1×1", "2×2", "4×2", "4×4"]) + v857("显示车辆", ["跟随当前车辆", "示例车辆"]) + v857("主题", ["跟随系统", "浅色", "深色"]) + v857("车辆名称", ["显示", "隐藏"]) + v857("更新时间", ["显示", "隐藏"]) + v857("时间格式", ["相对时间", "时分", "时分秒"]) + v857("点击动作", ["打开面板", "车辆设置", "电量历史"]) + v857("统计位置", ["左上", "上中", "右上", "左下", "下中", "右下"]) + v857("统计数据", ["电量", "电压", "充电功率", "充电时长", "总里程", "仪表续航"]) + "<div class=\"field\"><button class=\"btn tonal block\" data-widget-preview>恢复默认</button></div></div>",
          onMount(v861) {
            v861.querySelectorAll("[data-widget-preview]").forEach(v862 => v862.addEventListener("click", () => window.PLATFORM.unavailable("桌面小组件配置")));
          }
        });
      }
      const v852 = v369.context();
      const v853 = v375.currentSheet("widgets");
      const v854 = Number(v851);
      const v855 = await Promise.resolve(v421(0, true, "", v852));
      if (!v369.current(v852) || v375.currentSheet("widgets") !== v853) {
        return;
      }
      if (!v855) {
        v375.toast(v372(), "读取小组件配置失败", 2800);
        return;
      }
      if (!Number.isInteger(v854) || v854 < 0 || v854 > 0 && !v429(v855).includes(v854)) {
        v437();
        return;
      }
      if (v854 > 0 && !v383("widgetSettingsFor")) {
        v375.toast(v372(), "旧版壳只能编辑全局默认", 2800);
        return;
      }
      const v856 = await Promise.resolve(v421(v854, true, "", v852));
      if (!v369.current(v852) || v375.currentSheet("widgets") !== v853) {
        return;
      }
      if (!v856) {
        v375.toast(v372(), "读取小组件配置失败", 2800);
        return;
      }
      if (!v375.currentSheet("widgets")) {
        v458(true);
      }
      if (v424.id === v854 && v375.sheetAlive(v424.handle)) {
        v460();
        return;
      }
      v424.id = v854;
      v424.statSlot = null;
      v424.defaultSize = "4x4";
      v424.previewAutoRetried = false;
      v424.scope = v369.context();
      v424.serial++;
      v424.handle = v375.sheet(v372(), {
        key: "widgetedit:" + v854,
        full: true,
        title: "编辑小组件",
        body: ""
      });
      v460();
    }
    function v460() {
      if (!v375.sheetAlive(v424.handle)) {
        return;
      }
      const v863 = v424.id;
      const v864 = v428(true);
      if (v864 && v863 > 0 && !v429(v864).includes(v863)) {
        v437();
        return;
      }
      const v865 = v863 > 0 ? v430(v427(v863, true)) : "";
      const v866 = v865 || (v863 === 0 ? v424.defaultSize : "");
      const v867 = !v864 ? null : v427(v863, true, v866);
      const v868 = v867?.configuration === "system_widget_editor";
      const v869 = !v424.scope || !v369.current(v424.scope);
      const v870 = "data-wid=\"" + v863 + "\" data-wscope=\"" + v424.serial + "\" data-size=\"" + (v866 || "") + "\"";
      const v871 = (v876, v877, v878, v879) => "<section class=\"widget-block\"><h3 class=\"widget-heading\">" + v877 + "</h3><div class=\"widget-options\">" + v878.map(([v880, v881]) => "<button class=\"widget-button" + (String(v879) === String(v880) ? " widget-selected" : "") + "\" data-act=\"wpick\" " + v870 + " data-key=\"" + v876 + "\" data-v=\"" + v880 + "\" aria-pressed=\"" + (String(v879) === String(v880)) + "\"" + (v868 && v876 === "dark" ? " disabled title=\"深浅色由系统管理\"" : "") + ">" + v881 + "</button>").join("") + "</div></section>";
      const v872 = v424.handle;
      const v873 = v424.scope;
      const v874 = v424.serial;
      if (v869 || !v867 || v442.request && v442.request.signature !== v447(v867, v866 || "4x2")) {
        v448();
      }
      const v875 = v863 === 0 ? "<section class=\"widget-block\"><h3 class=\"widget-heading\">编辑哪一套默认</h3><div class=\"widget-options\">\n          " + [["4x4", "4×4 底部六格"], ["4x2", "4×2 中间两格"]].map(([v882, v883]) => "<button class=\"widget-button" + (v424.defaultSize === v882 ? " widget-selected" : "") + "\" data-act=\"wdefaultsize\" " + v870 + " data-v=\"" + v882 + "\" aria-pressed=\"" + (v424.defaultSize === v882) + "\"" + (v868 ? " disabled title=\"尺寸由系统管理\"" : "") + ">" + v883 + "</button>").join("") + "\n        </div><p class=\"widget-note\">两种尺寸的默认值分开存，这块只管当前选中的那一套。</p></section>" : "";
      v375.updateSheet(v872, {
        key: "widgetedit:" + v863,
        full: true,
        title: v863 === 0 ? "编辑全局默认" : (v865 ? v865.replace("x", "×") : "尺寸未知") + " · " + v432(v867),
        onMount: v884 => {
          if (!v869 && v867) {
            v455(v884, v872, v867, v873, v874, v866);
          }
        },
        sub: "ID " + v863 + " · 仅编辑配置，不删除实例",
        body: "<div class=\"widget-page\">\n        " + (!v869 && v867 ? v446() : "") + "\n        " + (v868 ? "<p class=\"widget-note\">iOS 小组件固定显示主页当前车辆，不支持按实例切换车辆；尺寸、深浅色和数据位由系统布局管理。这里保留公共配置控件，但不提交系统不允许的样式修改。</p>" : "") + "\n        " + (v869 || !v867 ? "<p class=\"widget-note widget-warning\">" + (v869 ? "编辑身份已变化，请返回管理页重新打开。" : "配置读取失败，请返回重试。") + "</p><button class=\"widget-button\" data-act=\"wmanager\">返回管理页</button>" : "\n          " + v875 + "\n          " + (v867.followsCurrentVehicle === true ? "<div class=\"widget-vehicle\" role=\"note\"><span>显示车辆</span><b>跟随当前车辆</b></div>" : "<button class=\"widget-vehicle\" data-act=\"wvin\" " + v870 + "><span>显示车辆</span><b>" + (v867.vin || v867.vehicleID ? v377(v432(v867)) : "跟随当前车辆") + "</b>" + v375.icon("right", 18) + "</button>") + "\n          " + v871("dark", "背景样式", v440(v867), v867.dark ?? -1) + "\n          " + (v461(v867, v866) > 0 ? v470(v867) : "<p class=\"widget-footnote\">" + (v866 === "1x1" || v866 === "2x2" ? "这个尺寸没有可替换的数据位。" : "") + "</p>") + "\n          <button class=\"widget-button widget-reset\" data-act=\"wreset\" " + v870 + ">恢复默认</button>\n          <p class=\"widget-footnote\">恢复默认仅清除此" + (v863 ? "实例的覆盖配置（继承全局默认）" : "全局配置") + "，不会移除桌面小组件。删除请回桌面长按后选择「移除」。</p>") + "\n      </div>"
      });
    }
    function v461(v885, v886) {
      const v887 = Number(v885?.statSlots);
      if (v885?.configuration === "system_widget_editor" && v887 === 0) {
        return 0;
      }
      if (Number.isInteger(v887) && v887 > 0 && v887 <= 6 && v886) {
        return v887;
      }
      const v888 = String(v886 || "").replace("×", "x");
      if (v888 === "4x2") {
        return 2;
      }
      if (v888 === "4x4") {
        return 6;
      }
      if (!v888 && v424.id === 0) {
        if (v424.defaultSize === "4x2") {
          return 2;
        } else {
          return 6;
        }
      }
      return 0;
    }
    const v462 = ["左上", "上中", "右上", "左下", "下中", "右下"];
    const v463 = ["上行", "下行"];
    const v464 = [{
      title: "骑行",
      ids: ["today", "last", "duration", "total"]
    }, {
      title: "电池与充电",
      ids: ["soc", "range", "voltage", "current", "power", "chargeState", "fullAt", "charged", "batteryTemp", "soh", "chargeCount", "remaining", "per10", "perAh", "chargeDays", "chargeKm", "chargeUsed"]
    }, {
      title: "胎压与温度",
      ids: ["tireFront", "tireRear", "tirePair", "tireTempFront", "tireTempRear"]
    }, {
      title: "账号",
      ids: ["integral", "unread"]
    }];
    function v465(v889) {
      if (v889 === 2) {
        return v463;
      } else {
        return v462;
      }
    }
    function v466(v890) {
      if (v890 === 2) {
        return [0, 1];
      } else {
        return [0, 1, 2, 3, 4, 5];
      }
    }
    function v467(v891, v892) {
      const v893 = (Array.isArray(v891?.statFields) ? v891.statFields : []).filter(v896 => v896 && typeof v896.id === "string" && typeof v896.title === "string");
      const v894 = v461(v891, v892);
      const v895 = Array.isArray(v891?.stats) ? v891.stats.slice(0, v894) : [];
      return {
        fields: v893,
        slots: v894,
        current: v895
      };
    }
    function v468(v897, v898) {
      const v899 = v897.fields.find(v900 => v900 && v900.id === v898);
      if (v899) {
        return String(v899.title || v899.id);
      } else {
        return "";
      }
    }
    function v469(v901, v902) {
      const v903 = v901.current[v902];
      if (v903) {
        return v468(v901, v903) || v903;
      } else {
        return "未设置";
      }
    }
    function v470(v904) {
      const v905 = v430(v904) || (v424.id === 0 ? v424.defaultSize : "");
      const v906 = v467(v904, v905);
      if (!v906.fields.length || !v906.slots) {
        return "";
      }
      const v907 = v465(v906.slots);
      const v908 = "data-wid=\"" + v424.id + "\" data-wscope=\"" + v424.serial + "\"";
      const v909 = v424.statSlot;
      const v910 = Number.isInteger(v909) && v909 >= 0 && v909 < v906.slots;
      const v911 = v466(v906.slots).map(v918 => {
        const v919 = v469(v906, v918);
        const v920 = v910 && v909 === v918;
        return "<button type=\"button\" class=\"widget-stat-cell" + (v920 ? " widget-stat-active" : "") + "\"\n        data-act=\"wstatslot\" " + v908 + " data-slot=\"" + v918 + "\" aria-label=\"" + v907[v918] + "：" + v377(v919) + "\" aria-pressed=\"" + v920 + "\">\n        <span class=\"widget-stat-pos\">" + v907[v918] + "</span><span class=\"widget-stat-name\">" + v377(v919) + "</span></button>";
      }).join("");
      const v912 = v921 => {
        const v922 = v906.current.indexOf(v921.id);
        const v923 = v922 >= 0 && v922 !== v909;
        const v924 = v906.current[v909] === v921.id;
        return "<button type=\"button\" class=\"widget-button widget-stat-option" + (v924 ? " widget-selected" : "") + "\"\n        data-act=\"wstatpick\" " + v908 + " data-slot=\"" + v909 + "\" data-field=\"" + v377(v921.id) + "\" aria-pressed=\"" + v924 + "\">\n        <span class=\"widget-stat-opt-name\">" + v377(v921.title) + "</span>" + (v923 ? "<span class=\"widget-stat-used-tag\">与" + v907[v922] + "交换</span>" : "") + "</button>";
      };
      const v913 = new Set(v464.flatMap(v925 => v925.ids));
      const v914 = [...v464, {
        title: "其他",
        ids: v906.fields.filter(v926 => !v913.has(v926.id)).map(v927 => v927.id)
      }];
      const v915 = v914.map(v928 => {
        const v929 = v928.ids.map(v930 => v906.fields.find(v931 => v931.id === v930)).filter(Boolean);
        if (v929.length) {
          return "<section class=\"widget-stat-category\"><h4 class=\"widget-stat-cat\">" + v928.title + "</h4><div class=\"widget-options\">" + v929.map(v912).join("") + "</div></section>";
        } else {
          return "";
        }
      }).join("");
      const v916 = v906.slots === 2 ? "中间两格" : "底部六格";
      const v917 = v906.slots === 2 ? "上下两行，就是 4×2 中间那两块数据。选择另一行已有的数据会交换两行。" : "上排对应左上、上中、右上，下排对应左下、下中、右下。选择其他位置已有的数据会交换两格。";
      return "<section class=\"widget-stat-section\">\n      <h3 class=\"widget-heading\">" + v916 + "<span class=\"widget-stat-count\">" + v906.fields.length + " 项可选</span></h3>\n      <div class=\"widget-stat-grid" + (v906.slots === 2 ? " widget-stat-grid-2" : "") + "\">" + v911 + "</div>\n      " + (v910 ? "<div class=\"widget-stat-picker-wrap open\"><div class=\"widget-stat-picker\">\n        <div class=\"widget-stat-picker-head\"><span>替换" + v907[v909] + " · " + v377(v469(v906, v909)) + "</span>\n          <button type=\"button\" class=\"widget-stat-close\" data-act=\"wstatclose\" " + v908 + " aria-label=\"收起选择\">收起</button></div>\n        " + v915 + "</div></div>" : "<p class=\"widget-note\">点需要修改的位置，再选择展示的数据。</p>") + "\n      <p class=\"widget-note\">" + v917 + "</p>\n      " + (v424.id === 0 ? "<p class=\"widget-note\">这里设置 " + (v905 === "4x2" ? "4×2 两格" : "4×4 六格") + "的默认值；已有单独配置的实例不受影响。</p>" : "") + "\n    </section>";
    }
    async function v471(v932, v933 = v424.scope) {
      const v934 = v430(v427(v424.id, true)) || (v424.id === 0 ? v424.defaultSize : "");
      const v935 = await Promise.resolve(v439(v424.id, v933, v934));
      if (!v935) {
        return false;
      }
      const v936 = v386();
      const v937 = v461(v935.cfg, v934);
      const v938 = typeof v936?.setWidgetStatsForSize === "function";
      if (!v938 && typeof v936?.setWidgetStats !== "function") {
        v375.toast(v372(), "当前 App 版本不支持数据位自定义，请更新几何面板", 2800);
        return false;
      }
      const v939 = v395("widget-stats", v933);
      const v940 = {
        widgetId: v935.wid,
        size: v934,
        slots: v937,
        fields: v932.filter(v941 => typeof v941 === "string" && /^[A-Za-z][A-Za-z0-9]{0,40}$/.test(v941))
      };
      v396("请求保存小组件数据位", v939, {
        phase: "requested",
        extra: v940
      });
      try {
        if (!v369.current(v933) || v933 !== v424.scope) {
          throw new Error("stale");
        }
        const v942 = await Promise.resolve(v420(v938 ? "setWidgetStatsForSize" : "setWidgetStats", v938 ? [v935.wid, v934, v932.join(",")] : [v935.wid, v932.join(",")], v933));
        if (v942 !== true && v942?.ok !== true) {
          throw new Error("write");
        }
        v423();
        const v943 = (await v439(v935.wid, v933, v934))?.cfg;
        const v944 = Array.isArray(v932) ? v932.join(",") : "";
        const v945 = Array.isArray(v943?.stats) ? v943.stats.join(",") : "";
        if (!v943 || v945 !== v944 || Number(v943.statSlots) !== v937) {
          throw new Error("readback");
        }
        v448();
        v460();
        v396("小组件数据位回读已确认", v939, {
          kind: "ok",
          extra: {
            ...v940,
            readback: true
          }
        });
        return true;
      } catch {
        v396("小组件数据位未确认保存", v939, {
          kind: "err",
          extra: {
            ...v940,
            readback: false
          }
        });
        v375.toast(v372(), "数据位保存失败，请重试", 2800);
        return false;
      }
    }
    function v472(v946) {
      if (Number(v946.dataset.wscope) === v424.serial && Number(v946.dataset.wid) === v424.id) {
        return v424.scope;
      } else {
        return null;
      }
    }
    async function v473(v947) {
      const v948 = v472(v947);
      const v949 = await Promise.resolve(v439(v947.dataset.wid, v948, v947.dataset.size));
      if (!v949) {
        return false;
      }
      const v950 = v395("widget-reset", v948);
      const v951 = {
        widgetId: v949.wid
      };
      v396("请求恢复小组件默认配置", v950, {
        phase: "requested",
        extra: v951
      });
      try {
        const v952 = await Promise.resolve(v420("resetWidgetSettings", [v949.wid], v948));
        if (v952.ok !== true || Number(v952.id) !== v949.wid) {
          throw new Error("reset");
        }
        v423();
        const v953 = (await v439(v949.wid, v948, v947.dataset.size))?.cfg;
        const v954 = v949.wid ? await v421(0, true, "", v948) : {
          vin: "",
          dark: -1,
          showName: true,
          showTime: true,
          timeMode: 0,
          tap: 0
        };
        if (!v953 || !v954 || !["vin", "dark", "showName", "showTime", "timeMode", "tap"].every(v955 => v436(v953, v955, v954[v955]))) {
          throw new Error("readback");
        }
        v448();
        v460();
        v458();
        v375.toast(v372(), "已恢复默认，桌面实例仍保留", 2200);
        v396("小组件默认配置回读已确认", v950, {
          kind: "ok",
          extra: {
            ...v951,
            readback: true
          }
        });
        return true;
      } catch {
        v396("小组件默认配置未确认恢复", v950, {
          kind: "err",
          extra: {
            ...v951,
            readback: false
          }
        });
        if (!v369.current(v948) || v948 !== v424.scope) {
          return false;
        }
        v375.toast(v372(), "恢复默认失败，配置回读未确认", 2800);
        return false;
      }
    }
    function v474(v956) {
      const v957 = v472(v956);
      if (!v957 || v424.id !== 0) {
        return false;
      }
      const v958 = String(v956.dataset.v || "");
      if (v958 !== "4x2" && v958 !== "4x4") {
        return false;
      }
      if (v424.defaultSize === v958) {
        return true;
      }
      v424.defaultSize = v958;
      v424.statSlot = null;
      v448();
      v460();
      return true;
    }
    function v475(v959) {
      const v960 = v472(v959);
      if (!v960) {
        return false;
      }
      const v961 = Number(v959.dataset.slot);
      const v962 = v427(v424.id, true);
      const v963 = v430(v962) || (v424.id === 0 ? v424.defaultSize : "");
      const v964 = v427(v424.id, true, v963);
      if (!v964) {
        return false;
      }
      const v965 = v461(v964, v963);
      if (!Number.isInteger(v961) || v961 < 0 || v961 >= v965) {
        return false;
      }
      v424.statSlot = v424.statSlot === v961 ? null : v961;
      v460();
      return true;
    }
    function v476(v966) {
      const v967 = v472(v966);
      if (!v967) {
        return false;
      }
      const v968 = Number(v966.dataset.slot);
      const v969 = String(v966.dataset.field || "");
      const v970 = v430(v427(v424.id, true)) || (v424.id === 0 ? v424.defaultSize : "");
      const v971 = v427(v424.id, true, v970);
      if (!v971 || !v969) {
        return false;
      }
      const v972 = v467(v971, v970);
      if (!Number.isInteger(v968) || v968 < 0 || v968 >= v972.slots || v424.statSlot !== v968 || !v972.fields.some(v975 => v975.id === v969) || v972.current.length !== v972.slots) {
        return false;
      }
      const v973 = v972.current.slice();
      const v974 = v973.indexOf(v969);
      if (v974 >= 0 && v974 !== v968) {
        v973[v974] = v973[v968];
      }
      v973[v968] = v969;
      return v471(v973, v967);
    }
    function v477() {
      if (document.hidden || !v375.currentSheet("widgets") && !v375.sheetAlive(v424.handle)) {
        return;
      }
      v458();
      if (v375.sheetAlive(v424.handle)) {
        v460();
      }
    }
    document.addEventListener("visibilitychange", v477);
    function v478() {
      const v976 = v370.data.settings;
      const v977 = String(v370.vin || "").trim();
      const v978 = (v976?.groups || []).map(v983 => ({
        ...v983,
        rows: v983.rows.filter(v387).filter(v391)
      })).filter(v984 => v984.rows.length);
      const v979 = {
        code: "local_hide_seat_status",
        render: "hide-seat-status",
        title: "声明车辆无坐垫解锁能力"
      };
      const v980 = v978.map(v985 => v985.id === "key" ? {
        ...v985,
        rows: [...v985.rows, v979]
      } : v985);
      if (!v980.some(v986 => v986.id === "key")) {
        v980.unshift({
          id: "key",
          t: "解锁与钥匙",
          icon: "key",
          rows: [v979]
        });
      }
      if (!v977 && !v976 && !v370.vehicles.length && !v370.lastErr) {
        return v369.noVehicleView() + v456();
      }
      const v981 = v980.map(v987 => {
        const v988 = v370.openGroups[v987.id] === true;
        return v375.card("<button class=\"group-head" + (v988 ? " open" : "") + "\" data-act=\"group\" data-id=\"" + v377(v987.id) + "\" aria-expanded=\"" + v988 + "\">\n          <span class=\"gi\">" + v375.icon(v987.icon, 18) + "</span>\n          <span class=\"gt\">" + v377(v987.t) + "</span>\n          <span class=\"gc\">" + v987.rows.length + "</span>\n          <span class=\"gv\">" + v375.icon("down", 18) + "</span>\n        </button>" + ("<div class=\"group-reveal" + (v988 ? " open" : "") + "\"" + (v988 ? "" : " inert aria-hidden=\"true\"") + "><div class=\"group-reveal-inner\"><div class=\"group-body\" data-rows-id=\"" + v377(v987.id) + "\">" + (v988 ? v987.rows.map(v502).join("") : "") + "</div></div></div>"), "group-card");
      }).join("");
      const v982 = v369.btDebugAvailable?.() === true ? "<button type=\"button\" class=\"bt-debug-link\" data-act=\"btdebug\">开发者工具 · 蓝牙调试</button>" : "";
      return "<div class=\"vehicle-settings\">" + v375.sectionTitle("设置项") + v981 + v456() + v982 + "</div>";
    }
    function v479(v989) {
      if (!v989) {
        return false;
      }
      const v990 = String(v989);
      let v991 = null;
      for (const v997 of document.querySelectorAll(".group-body[data-rows-id]")) {
        if (v997.dataset.rowsId === v990) {
          v991 = v997;
          break;
        }
      }
      if (!v991 || v991.childElementCount) {
        return false;
      }
      const v992 = v370.data.settings;
      const v993 = (v992?.groups || []).map(v998 => ({
        ...v998,
        rows: v998.rows.filter(v387).filter(v391)
      })).filter(v999 => v999.rows.length);
      const v994 = {
        code: "local_hide_seat_status",
        render: "hide-seat-status",
        title: "声明车辆无坐垫解锁能力"
      };
      const v995 = v993.map(v1000 => v1000.id === "key" ? {
        ...v1000,
        rows: [...v1000.rows, v994]
      } : v1000);
      if (!v995.some(v1001 => v1001.id === "key")) {
        v995.unshift({
          id: "key",
          t: "解锁与钥匙",
          icon: "key",
          rows: [v994]
        });
      }
      const v996 = v995.find(v1002 => v1002.id === v989);
      if (!v996) {
        return false;
      }
      v991.innerHTML = v996.rows.map(v502).join("");
      return true;
    }
    const v480 = {
      off: "都显示",
      status: "隐藏坐垫状态",
      cushion: "隐藏开坐桶",
      all: "全部隐藏"
    };
    const v481 = ["off", "status", "cushion", "all"];
    function v482(v1003) {
      const v1004 = v369.seatHideMode?.(v1003) || "off";
      v375.sheet(v372(), {
        title: "声明车辆无坐垫解锁能力",
        sub: "只影响显示，不改车况",
        key: "seat-hide",
        body: "<div class=\"choice-list\" role=\"radiogroup\" aria-label=\"坐垫相关显示\">" + v481.map(v1005 => {
          const v1006 = v1005 === v1004;
          return "<div class=\"choice-row" + (v1006 ? " on" : "") + "\" role=\"radio\" aria-checked=\"" + v1006 + "\" tabindex=\"0\"\n            data-act=\"seat-hide-set\" data-vin=\"" + v377(v1003) + "\" data-mode=\"" + v1005 + "\">\n          <span class=\"choice-radio\" aria-hidden=\"true\"></span>\n          <span class=\"choice-label\">" + v377(v480[v1005]) + "</span>\n        </div>";
        }).join("") + "</div>"
      });
    }
    const v483 = [48, 60, 72];
    const v484 = [50, 60, 70, 80, 90, 100, 110, 120, null];
    const v485 = ["beginAe4ControllerWrite", "pollAe4ControllerWrite", "cancelAe4ControllerWrite"];
    let v486 = null;
    const v487 = () => v374.vehicleProfile({
      home: v370.data.home
    });
    const v488 = () => !v382() && v378.source !== "demo" && v374.ae4ControllerSupported({
      home: v370.data.home
    }) && v485.every(v383);
    const v489 = v1007 => {
      const v1008 = typeof v1007 === "string" ? JSON.parse(v1007) : v1007;
      if (!v1008 || typeof v1008 !== "object" || Array.isArray(v1008)) {
        throw new Error("invalid_response");
      }
      return v1008;
    };
    const v490 = v1009 => typeof v1009 === "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v1009);
    function v491(v1010) {
      return v486 === v1010 && !v1010.closed && v369.current(v1010.scope) && v370.data.home?.vin === v1010.scope.vin && v487().type === v1010.model && v488();
    }
    function v492(v1011) {
      return v491(v1011) && v375.sheetAlive(v1011.handle);
    }
    function v493(v1012, v1013 = v1012.ticket) {
      if (!v490(v1013) || !v1012.nativeScope) {
        return;
      }
      window.NativeShell.call("cancelAe4ControllerWrite", [v1012.nativeScope.navId, v1013], v1012.nativeScope).catch(() => {});
    }
    function v494(v1014) {
      if (!v492(v1014) || !v1014.el) {
        return;
      }
      const v1015 = v484[v1014.currentIndex];
      const v1016 = v1015 === null ? "原厂" : v1015 + " A";
      const v1017 = v1014.el.querySelector("[data-ae4-current]");
      v1017.value = String(v1014.currentIndex);
      v1017.disabled = v1014.pending;
      v1017.setAttribute("aria-valuetext", v1016);
      v1014.el.querySelector("[data-ae4-value]").textContent = v1016;
      v1014.el.querySelector(".slv-zone").style.setProperty("--slv-position", v1014.currentIndex * 12.5 + "%");
      v1014.el.querySelectorAll("[data-ae4-voltage]").forEach(v1019 => {
        const v1020 = Number(v1019.dataset.ae4Voltage);
        const v1021 = v1020 === v1014.voltageIndex;
        v1019.classList.toggle("on", v1021);
        v1019.setAttribute("aria-checked", String(v1021));
        v1019.tabIndex = v1020 === (v1014.voltageIndex < 0 ? 0 : v1014.voltageIndex) ? 0 : -1;
        v1019.disabled = v1014.pending;
      });
      v1014.el.querySelectorAll("[data-ae4-step]").forEach(v1022 => {
        v1022.classList.toggle("on", Number(v1022.dataset.ae4Step) === v1014.currentIndex);
        v1022.disabled = v1014.pending;
      });
      const v1018 = v1014.el.querySelector("[data-ae4-submit]");
      v1018.disabled = v1014.pending || v1014.voltageIndex < 0;
      v1018.setAttribute("aria-busy", String(v1014.pending));
      v1014.el.querySelectorAll("[data-ae4-device]").forEach(v1023 => {
        v1023.disabled = v1014.selecting;
      });
    }
    function v495(v1024, v1025 = "") {
      clearTimeout(v1024.timer);
      v493(v1024);
      v1024.ticket = "";
      v1024.pending = false;
      v1024.selecting = false;
      v1024.devicesKey = "";
      if (!v492(v1024)) {
        return;
      }
      v1024.el.querySelector("[data-ae4-devices]").hidden = true;
      v494(v1024);
      const v1026 = {
        permission_required: "允许蓝牙连接后，再点确定",
        denied: "请允许 App 使用蓝牙",
        powered_off: "请开启蓝牙",
        bluetooth_disabled: "请开启蓝牙",
        device_not_found: "未找到 cfmoto 车辆蓝牙",
        transport_busy: "蓝牙正在使用中，请稍后再试",
        unsupported_model: "当前车型不支持控制器设置",
        address_mismatch: "车辆蓝牙地址已变化，请刷新后重试",
        operation_timeout: "连接超时，请重试",
        stale_session: "车辆信息已变化，请重新打开设置"
      }[v1025] || "蓝牙写入未完成，请重试";
      v375.toast(v372(), v1026, 3000);
    }
    function v496(v1027, v1028) {
      if (v1028.ok !== true) {
        v495(v1027, v1028.reason || v1028.error?.code);
        return false;
      }
      if (v1028.state === "done" && v1028.acknowledgement === "gatt_only") {
        v1027.pending = false;
        v1027.ticket = "";
        clearTimeout(v1027.timer);
        v375.closeSheet(v1027.handle);
        v375.toast(v372(), "控制器指令已发送", 2200);
        return false;
      }
      if (v1028.done === true || !["initializing", "scanning", "connecting", "discovering", "writing", "selecting"].includes(v1028.state)) {
        v495(v1027, v1028.reason);
        return false;
      }
      const v1029 = v1027.el.querySelector("[data-ae4-devices]");
      if (v1028.state === "selecting") {
        if (!v383("selectAe4ControllerWrite") || !Array.isArray(v1028.devices)) {
          v495(v1027);
          return false;
        }
        const v1030 = v1028.devices.filter(v1032 => v490(v1032?.id) && /^cfmoto/i.test(String(v1032.name || ""))).slice(0, 8);
        if (!v1030.length) {
          v495(v1027, "device_not_found");
          return false;
        }
        const v1031 = JSON.stringify(v1030.map(v1033 => [v1033.id, v1033.name]));
        if (v1031 !== v1027.devicesKey) {
          v1029.innerHTML = v1030.map(v1034 => "<button type=\"button\" class=\"btn tonal ae4-controller-device\" data-ae4-device=\"" + v377(v1034.id) + "\">" + v377(v1034.name) + "</button>").join("");
          v1027.devicesKey = v1031;
        }
        v1029.hidden = false;
      } else {
        v1029.hidden = true;
        v1027.devicesKey = "";
      }
      v494(v1027);
      return true;
    }
    function v497(v1035) {
      clearTimeout(v1035.timer);
      v1035.timer = setTimeout(() => {
        v498(v1035);
      }, 400);
    }
    async function v498(v1036) {
      if (!v1036.pending || !v1036.ticket || v1036.selecting) {
        return;
      }
      if (!v492(v1036) || v1036.nativeScope?.isCurrent?.() !== true) {
        v493(v1036);
        return;
      }
      if (Date.now() >= v1036.deadline) {
        v495(v1036, "operation_timeout");
        return;
      }
      try {
        const v1037 = v489(await window.NativeShell.call("pollAe4ControllerWrite", [v1036.nativeScope.navId, v1036.ticket], v1036.nativeScope));
        if (!v492(v1036)) {
          v493(v1036);
          return;
        }
        if (v1037.ticket !== v1036.ticket) {
          v495(v1036, "stale_session");
          return;
        }
        if (v496(v1036, v1037)) {
          v497(v1036);
        }
      } catch {
        v495(v1036);
      }
    }
    async function v499(v1038, v1039) {
      if (!v492(v1038) || !v1038.pending || v1038.selecting || !v1038.ticket || !v490(v1039)) {
        return;
      }
      v1038.selecting = true;
      clearTimeout(v1038.timer);
      v494(v1038);
      try {
        const v1040 = v489(await window.NativeShell.call("selectAe4ControllerWrite", [v1038.nativeScope.navId, v1038.ticket, v1039], v1038.nativeScope));
        if (!v492(v1038)) {
          v493(v1038);
          return;
        }
        v1038.selecting = false;
        if (v1040.ticket !== v1038.ticket) {
          v495(v1038, "stale_session");
          return;
        }
        if (v496(v1038, v1040)) {
          v497(v1038);
        }
      } catch {
        v495(v1038);
      }
    }
    async function v500(v1041) {
      if (!v492(v1041) || v1041.pending || v1041.voltageIndex < 0) {
        return;
      }
      v1041.pending = true;
      v494(v1041);
      try {
        let v1042 = v369.getNativeUiContext?.();
        if (!v1042) {
          await Promise.resolve(v369.isIOS?.() ? v369.syncIOSSession?.() : v369.syncNative?.());
          v1042 = v369.getNativeUiContext?.();
        }
        if (!v492(v1041) || v1042?.isCurrent?.() !== true || v1042.vin !== v1041.scope.vin) {
          v495(v1041, "stale_session");
          return;
        }
        v1041.nativeScope = v1042;
        v1041.deadline = Date.now() + 70000;
        const v1043 = v370.data.home?.raw || {};
        const v1044 = v369.isIOS?.() === true;
        const v1045 = String(v1043.bluetoothAddress || v370.data.home?.bt || "").trim();
        if (!v1044 && !/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}$/i.test(v1045)) {
          v495(v1041, "address_mismatch");
          return;
        }
        const v1046 = v1044 ? [v1042.navId, v1042.vin, v1042.frame, v1041.voltageIndex, v1041.currentIndex, v1041.model] : [v1042.navId, v1042.vin, v1042.frame, v1045, JSON.stringify({
          voltageIndex: v1041.voltageIndex,
          currentIndex: v1041.currentIndex
        })];
        const v1047 = v489(await window.NativeShell.call("beginAe4ControllerWrite", v1046, v1042));
        if (v490(v1047.ticket)) {
          v1041.ticket = v1047.ticket;
        }
        if (!v492(v1041)) {
          v493(v1041);
          return;
        }
        if (v1047.ok !== true) {
          v495(v1041, v1047.reason || v1047.error?.code);
          return;
        }
        if (!v1041.ticket) {
          v495(v1041);
          return;
        }
        if (v496(v1041, v1047)) {
          v497(v1041);
        }
      } catch {
        v495(v1041);
      }
    }
    function v501() {
      if (v486 && v375.sheetAlive(v486.handle)) {
        return true;
      }
      const v1048 = v369.context();
      const v1049 = v370.data.home;
      if (!v488() || !v1048.vin || v1049?.vin !== v1048.vin) {
        return false;
      }
      const v1050 = {
        scope: v1048,
        model: v487().type,
        voltageIndex: -1,
        currentIndex: 0,
        pending: false,
        selecting: false,
        closed: false,
        ticket: "",
        timer: 0,
        devicesKey: "",
        handle: null,
        el: null,
        nativeScope: null
      };
      v486 = v1050;
      v1050.handle = v375.sheet(v372(), {
        key: "ae4-controller",
        center: true,
        closeMode: "current",
        title: "AE4 控制器设置",
        body: "<div class=\"ae4-controller-sheet\">\n        <div class=\"card-sub\">电压平台</div>\n        <div class=\"ae4-controller-voltages\" role=\"radiogroup\" aria-label=\"电压平台\">" + v483.map((v1051, v1052) => "<button type=\"button\" class=\"ae4-controller-voltage\" data-ae4-voltage=\"" + v1052 + "\" role=\"radio\" aria-checked=\"false\">" + v1051 + " V</button>").join("") + "</div>\n        <div class=\"ae4-controller-current-head\"><span>母线电流</span><strong data-ae4-value>原厂</strong></div>\n        <div class=\"slider-box ae4-controller-slider\">\n          <div class=\"slv-track\"><div class=\"slv-zone\" style=\"--slv-position:0%\">\n            <div class=\"slv-rail\"></div><div class=\"slv-fill\"></div>\n            <div class=\"slv-ticks\">" + v484.map((v1053, v1054) => "<i style=\"left:" + v1054 * 12.5 + "%\"></i>").join("") + "</div>\n            <i class=\"slv-knob\" aria-hidden=\"true\"></i>\n          </div><input class=\"mslider\" data-ae4-current type=\"range\" min=\"0\" max=\"8\" step=\"1\" value=\"0\" aria-label=\"母线电流\"></div>\n          <div class=\"ae4-controller-ticks\">" + v484.map((v1055, v1056) => "<button type=\"button\" data-ae4-step=\"" + v1056 + "\" aria-label=\"" + (v1055 === null ? "原厂电流" : v1055 + " A") + "\" style=\"left:" + v1056 * 12.5 + "%\">" + (v1055 === null ? "原厂" : v1055) + "</button>").join("") + "</div>\n        </div>\n        <div class=\"ae4-controller-devices\" data-ae4-devices hidden></div>\n        <div class=\"field mt16\"><button type=\"button\" class=\"btn text\" data-ae4-close>取消</button>\n          <button type=\"button\" class=\"btn\" data-ae4-submit style=\"flex:1\" disabled>确定</button></div>\n      </div>",
        onMount: v1057 => {
          v1050.el = v1057;
          v1050.handle = v375.currentSheet("ae4-controller");
          v1057.addEventListener("click", v1058 => {
            const v1059 = v1058.target.closest?.("button");
            if (!v1059 || v1059.disabled || !v492(v1050)) {
              return;
            }
            if (v1059.hasAttribute("data-ae4-close")) {
              v375.closeSheet(v1050.handle);
              return;
            }
            if (v1059.hasAttribute("data-ae4-submit")) {
              v500(v1050);
              return;
            }
            if (v1059.hasAttribute("data-ae4-device")) {
              v499(v1050, v1059.dataset.ae4Device);
              return;
            }
            if (v1050.pending) {
              return;
            }
            if (v1059.hasAttribute("data-ae4-voltage")) {
              v1050.voltageIndex = Number(v1059.dataset.ae4Voltage);
            }
            if (v1059.hasAttribute("data-ae4-step")) {
              v1050.currentIndex = Number(v1059.dataset.ae4Step);
            }
            v494(v1050);
          });
          v1057.querySelector("[data-ae4-current]").addEventListener("input", v1060 => {
            if (v1050.pending) {
              return;
            }
            v1050.currentIndex = Math.max(0, Math.min(8, Math.round(Number(v1060.target.value) || 0)));
            v494(v1050);
          });
          v1057.querySelector(".ae4-controller-voltages").addEventListener("keydown", v1061 => {
            if (v1050.pending || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(v1061.key)) {
              return;
            }
            const v1062 = Number(v1061.target.dataset.ae4Voltage);
            if (!Number.isInteger(v1062)) {
              return;
            }
            v1061.preventDefault();
            v1050.voltageIndex = v1061.key === "Home" ? 0 : v1061.key === "End" ? 2 : (v1062 + (v1061.key === "ArrowRight" ? 1 : 2)) % 3;
            v494(v1050);
            v1057.querySelector("[data-ae4-voltage=\"" + v1050.voltageIndex + "\"]").focus();
          });
          v494(v1050);
        },
        onDismiss: () => {
          v1050.closed = true;
          clearTimeout(v1050.timer);
          v493(v1050);
          if (v486 === v1050) {
            v486 = null;
          }
        }
      });
      return true;
    }
    function v502(v1063) {
      if (!v387(v1063)) {
        return "";
      }
      if (v1063.render === "ae4-controller") {
        return "<div class=\"kv kv-act setting-chevron\" data-act=\"ae4-controller\">\n        <span class=\"k\"><span class=\"kt\">AE4 控制器设置</span></span>\n        <span class=\"muted setting-tail\">" + v375.icon("right", 18) + "</span>\n      </div>";
      }
      if (v1063.render === "hide-seat-status") {
        const v1064 = String(v370.vin || "").trim();
        const v1065 = v369.seatHideMode?.(v1064) || "off";
        const v1066 = v480[v1065] || v480.off;
        return "<div class=\"kv kv-act setting-chevron" + (v1064 ? "" : " off") + "\" data-act=\"seat-hide-sheet\" data-vin=\"" + v377(v1064) + "\">\n        <span class=\"k\" style=\"min-width:0\">\n          <span class=\"kt\">" + v377(v1063.title) + "</span>\n          <span class=\"desc\">隐藏坐垫状态与开坐桶提示</span>\n        </span>\n        <span class=\"v setting-tail\"><span class=\"setting-value\">" + v377(v1066) + "</span>" + v375.icon("right", 16) + "</span>\n      </div>";
      }
      if (v1063.render === "info") {
        return "<div class=\"kv\">\n        <span class=\"k\" style=\"min-width:0\">\n          <span class=\"kt\">" + v377(v1063.title) + "</span>\n          <span class=\"desc\">" + v377(v1063.desc || "") + "</span>\n        </span>\n        <span class=\"v\">" + v377(v1063.display || "—") + "</span>\n      </div>";
      }
      if (v1063.render === "inductive-pair2") {
        return "<div class=\"kv kv-act setting-chevron\" data-act=\"inductive-pair2\">\n        <span class=\"k\"><span class=\"kt\">配对车辆（感应解锁2.0）</span></span>\n        <span class=\"muted setting-tail\">" + v375.icon("right", 18) + "</span>\n      </div>";
      }
      if (v1063.render === "custom-key-mode") {
        const v1067 = v389() === "combo";
        return "<div class=\"kv kv-act setting-chevron\" data-act=\"ckmode\" role=\"button\" tabindex=\"0\">\n        <span class=\"k\" style=\"min-width:0\">\n          <span class=\"kt\">" + v377(v1063.title) + "</span>\n          <span class=\"desc\">" + v377(v1063.desc || "") + "</span>\n        </span>\n        <span class=\"v tnum setting-tail\"><span class=\"setting-value\">" + (v1067 ? "组合" : "独立") + "</span>" + v375.icon("right", 16) + "</span>\n      </div>";
      }
      if (v1063.render === "twin-gauge") {
        return "<div class=\"kv kv-act setting-chevron\" data-act=\"twin-gauge\">\n        <span class=\"k\"><span class=\"kt\">设备诊断</span></span>\n        <span class=\"muted setting-tail\">" + v375.icon("right", 18) + "</span>\n      </div>";
      }
      if (v1063.render === "cast") {
        const v1068 = !!window.NativeShell?.cast?.();
        const v1069 = window.LAZY_FEATURE ? window.LAZY_FEATURE.peek(v369, "cast") : v369.cast;
        const v1070 = v1069?.summary ? v1069.summary() : {
          text: v1068 ? "未连接" : "更新 App 后使用"
        };
        return "<div class=\"kv kv-act setting-chevron\" data-act=\"cast\">\n        <span class=\"k\" style=\"min-width:0\">\n          <span class=\"kt\">" + v377(v1063.title) + "</span>\n          <span class=\"desc\">" + v377(v1068 ? v1070?.text || v1063.desc || "" : "无线连接与录屏需要当前 App 提供真实原生能力") + "</span>\n        </span>\n        <span class=\"muted setting-tail\">" + v375.icon("right", 18) + "</span>\n      </div>";
      }
      if (["wallpaper", "firmware", "custom-audio"].includes(v1063.render)) {
        const v1071 = v1063.render === "wallpaper" && window.PLATFORM?.androidAction?.(v1063) ? window.PLATFORM.unavailableBadge("beginWallpaperTransfer") : "";
        return "<div class=\"kv kv-act setting-chevron\" data-act=\"" + v377(v1063.render) + "\">\n        <span class=\"k\" style=\"min-width:0\">\n          <span class=\"kt\">" + v377(v1063.title) + v1071 + "</span>\n          <span class=\"desc\">" + v377(v1063.desc || "") + "</span>\n        </span>\n        <span class=\"muted setting-tail\">" + v375.icon("right", 18) + "</span>\n      </div>";
      }
      return v506(v1063);
    }
    function v503() {
      if (!v384() || !v382() && !v383("beginInductiveSession")) {
        return false;
      }
      return v369.inductiveUi?.openPair() || false;
    }
    function v504() {
      if (!v384()) {
        return;
      }
      const v1072 = Object.freeze({
        ...v369.context()
      });
      const v1073 = String(v1072.vin || "").trim();
      if (!v1073) {
        v375.toast(v372(), "还没读到车辆 VIN，稍后再试", 3000);
        return;
      }
      const v1074 = String(v369.vehicleToken(v1073) || v1072.token || "").trim();
      if (!v1074) {
        v375.toast(v372(), "投屏需要 token：先在调试面板粘贴 token", 3000);
        return;
      }
      if (!v369.current(v1072)) {
        v375.toast(v372(), "车辆或登录信息已变化，请重新打开投屏", 3000);
        return;
      }
      const v1075 = Object.freeze({
        token: v1074,
        vin: v1073,
        at: Date.now()
      });
      const v1076 = new URL("https://lswlc33.github.io/zeeho-3d-models/vehicle-info.html");
      v1076.searchParams.set("auto", "1");
      v1076.searchParams.set("vin", v1075.vin);
      const v1077 = location.origin === "https://lswlc33.github.io";
      if (v1077) {
        try {
          sessionStorage.setItem("zeeho.vi.handoff", JSON.stringify(v1075));
        } catch {
          v1076.hash = new URLSearchParams({
            token: v1075.token
          }).toString();
        }
      } else {
        v1076.hash = new URLSearchParams({
          token: v1075.token
        }).toString();
      }
      v396("投屏身份交接已准备", v395("cast-handoff", v1072, {
        vehicle: true
      }), {
        category: "action",
        phase: "dispatched",
        detail: "仅交接车辆凭据，不代表已开始投屏",
        extra: {
          sameOrigin: v1077
        }
      });
      location.href = v1076.href;
    }
    function v505() {
      const v1078 = window.CAPBOOK?.nominal(v370.vin, v370.data.home?.type || "");
      if (!v1078) {
        return "未填";
      }
      const v1079 = Number.isFinite(v1078.kwh) && v1078.kwh > 0 ? v1078.kwh + " kWh" : "";
      const v1080 = Number.isInteger(v1078.series) && v1078.series >= 1 && v1078.series <= 40 ? v1078.series + " 串" : "";
      const v1081 = [v1079, v1080].filter(Boolean).join(" · ");
      if (v1081) {
        return v1081 + (v1079 && v1078.src === "table" ? "（车型表）" : "");
      } else {
        return "未填";
      }
    }
    function v506(v1082) {
      const v1083 = v1082.write?.ready ? "ready" : "none";
      const v1084 = v1083 === "ready" ? "点击直接切换" : "未适配，点开看说明";
      const v1085 = !!v1082.local;
      const v1086 = v1082.kind === "action" && v1082.code !== "local_nominal_cap" || v1082.kind !== "switch" && v1082.kind !== "band" && v1082.kind !== "action" && v1082.write?.ready && (v1082.options || v1082.choices || v1082.palette);
      const v1087 = v1082.code === "local_nominal_cap" ? "<span class=\"v tnum\">" + v377(v505()) + "</span>" : "";
      const v1088 = v1082.kind === "switch" ? v1082.binary ? "<span class=\"switch" + (v1082.value ? " on" : "") + (v1083 === "ready" ? "" : " ro disabled") + "\" data-act=\"toggle\" data-code=\"" + v377(v1082.code) + "\" title=\"" + v1084 + "\"></span>" : "<span class=\"v tnum\" title=\"" + v377(v1082.display) + "\">" + v377(v1082.display) + "</span>" : v1082.kind === "band" ? "<span class=\"band-cell col\">" + [["front", "前"], ["rear", "后"]].map(([v1092, v1093]) => {
        const v1094 = v370.tireBands[v1092];
        return "<span class=\"band-line\"><i>" + v1093 + "</i>" + v508(v1094.lo, v1094.hi) + "<b class=\"tnum\">" + v1094.lo.toFixed(1) + "–" + v1094.hi.toFixed(1) + "</b></span>";
      }).join("") + "</span>" : v1082.kind === "action" ? "<span class=\"muted" + (v1086 ? " setting-tail" : "") + "\">" + (v1087 || v375.icon("right", 18)) + "</span>" : v1082.kind === "palette" ? "<span class=\"v setting-tail\" title=\"" + v377(v1082.display) + "\"><span class=\"swatch" + (v1082.color?.hex ? "" : " plain") + "\"" + (v1082.color?.hex ? " style=\"background:" + v377(v1082.color.hex) + "\"" : "") + ">" + (v1082.color?.hex ? "" : v377(v1082.color?.id ?? "")) + "</span><span class=\"setting-value\">" + v377(v1082.display) + "</span>" + v375.icon("right", 16) + "</span>" : v1086 ? "<span class=\"v tnum setting-tail\" title=\"" + v377(v1082.display) + "\"><span class=\"setting-value\">" + v377(v1082.display) + "</span>" + v375.icon("right", 16) + "</span>" : "<span class=\"v tnum\" title=\"" + v377(v1082.display) + "\">" + v377(v1082.display) + "</span>";
      const v1089 = v1082.subs?.length ? "<span class=\"raw\" style=\"opacity:.85\">" + v1082.subs.map(v1095 => v377(v1095.t) + " " + v377(v1095.v)).join(" · ") + "</span>" : "";
      const v1090 = v1082.kind === "band" ? v1082.note : v1082.desc;
      const v1091 = v1083 === "none" && v1082.kind === "switch" ? "<span class=\"chip\">未适配</span>" : "";
      return "<div class=\"kv" + (v1083 === "ready" || v1085 ? "" : " off") + (v1086 ? " setting-chevron" : "") + "\" data-act=\"setting\" data-code=\"" + v377(v1082.code) + "\" style=\"cursor:pointer\">\n      <span class=\"k\" style=\"min-width:0\">\n        <span class=\"kt\">" + v377(v1082.title) + v1091 + "</span>\n        " + (v1090 ? "<span class=\"desc\">" + v377(v1090) + "</span>" : "") + v1089 + "\n      </span>\n      " + v1088 + "\n    </div>";
    }
    const v507 = v1096 => v374.clamp((v1096 - v374.TIRE_RED_MIN) / (v374.TIRE_RED_MAX - v374.TIRE_RED_MIN), 0, 1) * 100;
    function v508(v1097, v1098) {
      return "<span class=\"band mini\" title=\"绿 = 正常 " + v1097.toFixed(1) + "–" + v1098.toFixed(1) + " bar；黄 = 超出这个区间（正好压线不算）；红 = 越过车机红线 1.5 / 3.0\">\n      <i class=\"ok\" style=\"left:" + v507(v1097) + "%;width:" + (v507(v1098) - v507(v1097)) + "%\"></i>\n    </span>";
    }
    function v509() {
      const v1099 = String(v370.vin || "").trim();
      if (!v1099) {
        v375.toast(v372(), "先选一台车");
        return;
      }
      const v1100 = window.CAPBOOK?.spec?.(v1099);
      const v1101 = v1100?.kwh ? null : window.CAPBOOK?.nominal?.(v1099, v370.data.home?.type || "");
      const v1102 = window.CAPBOOK?.series?.(v1099) ?? v1101?.series ?? v1100?.series ?? null;
      const v1103 = window.CAPBOOK?.dual?.(v1099) === true;
      v375.sheet(v372(), {
        key: "nominalcap",
        title: "电池设置",
        body: "\n        " + (v1100?.legacy ? "<div class=\"card-sub mb12\">当前是旧版填的 <b>" + v1100.kwh + " kWh</b>（没记电压/容量）。\n          重新填下面两个数会覆盖它；不填直接保存则保持不变。</div>" : "") + "\n        <!-- 垂直布局（2026-11-06 用户）：弹层宽度有限，两列各 ~180px 数字键下太挤；\n             电压、容量各占一行，看得一目了然。 -->\n        <div class=\"field\"><label class=\"form-label\" for=\"nomV\">额定电压（V）</label>\n          <input class=\"form-control\" id=\"nomV\" type=\"number\" min=\"20\" max=\"120\" step=\"0.1\" inputmode=\"decimal\"\n            placeholder=\"例：74\" value=\"" + (v1100?.v != null ? v1100.v : "") + "\" aria-label=\"额定电压 V\">\n        </div>\n        <div class=\"field mt12\"><label class=\"form-label\" for=\"nomAh\">额定容量（Ah）</label>\n          <input class=\"form-control\" id=\"nomAh\" type=\"number\" min=\"1\" max=\"200\" step=\"0.1\" inputmode=\"decimal\"\n            placeholder=\"例：27\" value=\"" + (v1100?.ah != null ? v1100.ah : "") + "\" aria-label=\"额定容量 Ah\">\n        </div>\n        <div class=\"field mt12\"><label class=\"form-label\" for=\"nomSeries\">电芯串数（可选）</label>\n          <input class=\"form-control\" id=\"nomSeries\" type=\"number\" min=\"1\" max=\"40\" step=\"1\" inputmode=\"numeric\"\n            placeholder=\"知道串数时填写\" value=\"" + (v1102 ?? "") + "\" aria-label=\"电芯串数\">\n        </div>\n        <div class=\"card-sub mt8\" id=\"nomPreview\">" + (v1100?.kwh ? "当前：" + v1100.kwh + " kWh" + (v1100.v != null ? "（" + v1100.v + "V × " + v1100.ah + "Ah）" : "（旧口径）") + (v1102 ? " · " + v1102 + " 串" : "") : v1102 ? "当前仅设置 " + v1102 + " 串" + (v1101?.v ? " · 车型额定电压 " + v1101.v + " V" : "") : "") + "</div>\n        <!-- 模拟双电（2026-11-18 用户要求）：车机只上报单组电池的电流/功率，\n             装双电包的车主看到的功率与充入电量只有真实值的一半。开启后**只在统计与\n             展示时把电流/功率/充入电量 ×2**，盘上原始采样照常记录、一个字节不改。 -->\n        <div class=\"task-row mt16\" id=\"nomDualRow\" style=\"cursor:pointer\">\n          <div class=\"task-main\">\n            <div class=\"task-name\">模拟双电</div>\n            <div class=\"task-sub\">车机只报单组电池，开启后统计与展示的电流、功率、充入电量按 2 倍计算；原始采样照常记录</div>\n          </div>\n          <div class=\"task-tail\"><span class=\"switch" + (v1103 ? " on" : "") + "\" role=\"switch\" aria-checked=\"" + v1103 + "\"></span></div>\n        </div>\n        <div class=\"field mt16\"><button class=\"btn block\" id=\"nomSave\">保存电池规格</button></div>\n        " + (v369.batteryRange?.settingsHtml?.() || "") + "\n        <div style=\"height:8px\"></div>",
        onMount: v1104 => {
          v369.batteryRange?.mountSettings?.(v1104);
          const v1105 = v1104.querySelector("#nomV");
          const v1106 = v1104.querySelector("#nomAh");
          const v1107 = v1104.querySelector("#nomSeries");
          const v1108 = v1104.querySelector("#nomPreview");
          const v1109 = v1104.querySelector("#nomDualRow");
          let v1110 = v1103;
          v1109?.addEventListener("click", async () => {
            const v1112 = !v1110;
            const v1113 = (await window.CAPBOOK?.setDual?.(v1099, v1112)) === true;
            if (!v1113) {
              v375.toast(v372(), "保存失败，存储不可用");
              return;
            }
            v1110 = v1112;
            v1109.querySelector(".switch")?.classList.toggle("on", v1112);
            v1109.querySelector("[role=\"switch\"]")?.setAttribute("aria-checked", String(v1112));
            v375.toast(v372(), v1112 ? "已开启模拟双电，统计按 2 倍计算" : "已关闭模拟双电");
            v369.render({
              keepScroll: true
            });
            Promise.resolve(v369.syncNative?.()).then(() => {
              if (!v369.isIOS?.()) {
                try {
                  window.ZeehoShell?.refreshBatteryDisplay?.();
                } catch {}
              }
            });
            if (v369.isIOS?.()) {
              const v1115 = v369.context();
              Promise.resolve(v369.syncIOSSession?.()).then(v1116 => v369.systemSurfaces?.setDualDisplay?.(v1115, v1116, v1112));
            }
            const v1114 = v375.currentSheet?.("battdetail");
            if (v1114 && v375.sheetAlive?.(v1114) && v369.batterydetail?.batteryDetailSheet) {
              v369.batterydetail.batteryDetailSheet({
                handle: v1114,
                scope: v369.context()
              });
            }
          });
          const v1111 = () => {
            const v1117 = Number(v1105.value);
            const v1118 = Number(v1106.value);
            const v1119 = Number(v1107.value);
            const v1120 = v1105.value !== "" && v1106.value !== "" && Number.isFinite(v1117) && Number.isFinite(v1118) && v1117 > 0 && v1118 > 0;
            v1108.textContent = v1120 ? "= " + Math.round(v1117 * v1118) / 1000 + " kWh" + (v1107.value !== "" && Number.isInteger(v1119) ? " · " + v1119 + " 串 · " + Math.round(v1117 / v1119 * 1000) / 1000 + " V/串" : "") : "";
          };
          v1105.addEventListener("input", v1111);
          v1106.addEventListener("input", v1111);
          v1107.addEventListener("input", v1111);
          v1104.querySelector("#nomSave").addEventListener("click", async () => {
            const v1121 = v1105.value.trim();
            const v1122 = v1106.value.trim();
            const v1123 = v1107.value.trim();
            const v1124 = v1121 === "" ? null : Number(v1121);
            const v1125 = v1122 === "" ? null : Number(v1122);
            const v1126 = v1123 === "" ? null : Number(v1123);
            if (v1123 !== "" && (!Number.isInteger(v1126) || v1126 < 1 || v1126 > 40)) {
              v375.toast(v372(), "电芯串数需填写 1–40 的整数");
              return;
            }
            const v1127 = v1121 === "" && v1122 === "";
            if (v1127 && v1123 !== "") {
              const v1130 = (await window.CAPBOOK?.setSeries?.(v1099, v1126)) === true;
              if (!v1130) {
                v375.toast(v372(), "保存失败，存储不可用");
                return;
              }
              v375.back();
              v369.render({
                keepScroll: true
              });
              const v1131 = v375.currentSheet?.("battdetail");
              if (v1131 && v375.sheetAlive?.(v1131) && v369.batterydetail?.batteryDetailSheet) {
                v369.batterydetail.batteryDetailSheet({
                  handle: v1131,
                  scope: v369.context()
                });
              }
              v375.toast(v372(), "已存电芯串数 " + v1126 + " 串");
              return;
            }
            if (v1121 === "" !== (v1122 === "")) {
              v375.toast(v372(), "电压和容量要一起填");
              return;
            }
            if (v1121 !== "" && (!Number.isFinite(v1124) || v1124 < 20 || v1124 > 120 || !Number.isFinite(v1125) || v1125 < 1 || v1125 > 200)) {
              v375.toast(v372(), "电压 20–120V、容量 1–200Ah");
              return;
            }
            if (v1127 && v1123 === "") {
              if (v1100?.legacy) {
                v375.back();
                v375.toast(v372(), "已保留原值");
                return;
              }
              const v1132 = (await window.CAPBOOK?.setSpec?.(v1099, {})) === true;
              if (!v1132) {
                v375.toast(v372(), "保存失败，存储不可用");
                return;
              }
              v375.back();
              v369.render({
                keepScroll: true
              });
              const v1133 = v375.currentSheet?.("battdetail");
              if (v1133 && v375.sheetAlive?.(v1133) && v369.batterydetail?.batteryDetailSheet) {
                v369.batterydetail.batteryDetailSheet({
                  handle: v1133,
                  scope: v369.context()
                });
              }
              v375.toast(v372(), "已清除");
              return;
            }
            const v1128 = (await window.CAPBOOK?.setSpec?.(v1099, v1127 ? {
              series: v1126
            } : {
              v: v1124,
              ah: v1125,
              series: v1126
            })) === true;
            if (!v1128) {
              v375.toast(v372(), "保存失败，存储不可用");
              return;
            }
            v375.back();
            v369.render({
              keepScroll: true
            });
            const v1129 = v375.currentSheet?.("battdetail");
            if (v1129 && v375.sheetAlive?.(v1129) && v369.batterydetail?.batteryDetailSheet) {
              v369.batterydetail.batteryDetailSheet({
                handle: v1129,
                scope: v369.context()
              });
            }
            v375.toast(v372(), v1127 ? "已存电芯串数" + (v1126 ? " " + v1126 + " 串" : "（未设置）") : "已存为 " + v1124 + "V × " + v1125 + "Ah" + (v1126 ? " · " + v1126 + " 串" : ""));
          });
        }
      });
    }
    function v510() {
      const v1134 = v374.TIRE_RED_MIN;
      const v1135 = v374.TIRE_RED_MAX;
      const v1136 = [["front", "前轮"], ["rear", "后轮"]];
      const v1137 = ([v1139, v1140]) => "\n      <div class=\"band-sec\">\n        <div class=\"band-sec-head\"><span>" + v1140 + "</span></div>\n        <div class=\"dual\" data-dual=\"" + v1139 + "\" title=\"绿 = 正常区间 · 黄 = 超出区间 · 红 = 越过红线（" + v1134.toFixed(1) + " / " + v1135.toFixed(1) + " bar 之外）\">\n          <span class=\"track\"></span>\n          <span class=\"inner\"><span class=\"zone\"></span><span class=\"band\" data-green=\"" + v1139 + "\"></span></span>\n          <input type=\"range\" data-lo=\"" + v1139 + "\" min=\"" + v1134 + "\" max=\"" + v1135 + "\" step=\"0.1\" value=\"" + v370.tireBands[v1139].lo + "\" aria-label=\"" + v1140 + "下限\">\n          <input type=\"range\" data-hi=\"" + v1139 + "\" min=\"" + v1134 + "\" max=\"" + v1135 + "\" step=\"0.1\" value=\"" + v370.tireBands[v1139].hi + "\" aria-label=\"" + v1140 + "上限\">\n        </div>\n        <div class=\"dual-read\">\n          <span>下限 <b class=\"tnum\" data-lov=\"" + v1139 + "\"></b> bar</span>\n          <span>上限 <b class=\"tnum\" data-hiv=\"" + v1139 + "\"></b> bar</span>\n        </div>\n      </div>";
      const v1138 = v1136.map(v1137).join("") + "<div class=\"field mt16\"><button class=\"btn block\" id=\"tbSave\">保存设置</button></div>\n       <div style=\"height:8px\"></div>";
      v375.sheet(v372(), {
        key: "tireband",
        title: "胎压警戒区间",
        body: v1138,
        onMount: v1141 => {
          const v1142 = {};
          v1136.forEach(([v1143]) => {
            const v1144 = v1141.querySelector("[data-lo=\"" + v1143 + "\"]");
            const v1145 = v1141.querySelector("[data-hi=\"" + v1143 + "\"]");
            const v1146 = v1141.querySelector("[data-green=\"" + v1143 + "\"]");
            const v1147 = v1141.querySelector("[data-lov=\"" + v1143 + "\"]");
            const v1148 = v1141.querySelector("[data-hiv=\"" + v1143 + "\"]");
            const v1149 = () => {
              const v1151 = Number(v1144.value);
              const v1152 = Number(v1145.value);
              v1146.style.left = v507(v1151) + "%";
              v1146.style.width = v507(v1152) - v507(v1151) + "%";
              v1147.textContent = v1151.toFixed(1);
              v1148.textContent = v1152.toFixed(1);
            };
            const v1150 = v1153 => {
              const v1154 = Number(v1144.value);
              const v1155 = Number(v1145.value);
              if (v1154 > v1155) {
                if (v1153 === "lo") {
                  v1145.value = String(v1154);
                } else {
                  v1144.value = String(v1155);
                }
              }
              v1149();
            };
            v1144.addEventListener("input", () => v1150("lo"));
            v1145.addEventListener("input", () => v1150("hi"));
            v1141.querySelector("[data-dual=\"" + v1143 + "\"]").addEventListener("pointerdown", v1156 => {
              const v1157 = v1156.currentTarget.getBoundingClientRect();
              const v1158 = 9;
              const v1159 = Math.min(1, Math.max(0, (v1156.clientX - v1157.left - v1158) / Math.max(1, v1157.width - v1158 * 2)));
              const v1160 = v1134 + v1159 * (v1135 - v1134);
              const v1161 = Math.abs(v1160 - Number(v1144.value)) <= Math.abs(v1160 - Number(v1145.value));
              v1144.style.zIndex = v1161 ? "3" : "2";
              v1145.style.zIndex = v1161 ? "2" : "3";
            });
            v1142[v1143] = {
              lo: v1144,
              hi: v1145,
              paint: v1149
            };
          });
          v1136.forEach(([v1162]) => v1142[v1162].paint());
          v1141.querySelector("#tbSave").addEventListener("click", async () => {
            const v1163 = v395("tire-band");
            const v1164 = JSON.stringify(v370.tireBands);
            v1136.forEach(([v1166]) => {
              v370.tireBands[v1166] = v374.normalizeBand({
                lo: Number(v1142[v1166].lo.value),
                hi: Number(v1142[v1166].hi.value)
              });
            });
            const v1165 = await v369.savePrefs();
            if (v1165 === false) {
              v370.tireBands = JSON.parse(v1164);
              v375.toast(v372(), "胎压警戒区间未能保存，请重试");
              return;
            }
            v396(v1165 === false ? "胎压警戒偏好未确认保存" : "胎压警戒偏好已应用", v1163, {
              kind: v1165 === false ? "warn" : "info",
              detail: "按当前内存区间应用；savePrefs 回执不证明视觉偏好已持久化",
              extra: {
                changed: v1164 !== JSON.stringify(v370.tireBands),
                frontLo: v370.tireBands.front.lo,
                frontHi: v370.tireBands.front.hi,
                rearLo: v370.tireBands.rear.lo,
                rearHi: v370.tireBands.rear.hi
              }
            });
            v511();
            v375.back();
            v375.toast(v372(), "胎压警戒区间已保存");
          });
        }
      });
    }
    function v511() {
      if (v378.lastRaw?.tire_monitor) {
        v370.data.tires = v374.tires(v378.lastRaw.tire_monitor, v370.tireBands);
      }
      v369.render({
        keepScroll: true
      });
    }
    window.APP.settings = {
      captureMeterReturn: v394,
      WEDIT: v424,
      widgetCfgById: v413,
      allRows: v397,
      choiceSheet: v406,
      sliderSheet: v408,
      openValueSheet: v411,
      seatHideSheet: v482,
      daysLeft: v412,
      doWrite: v404,
      doWriteVal: v405,
      drawWidgets: v458,
      inductivePlaceholderSheet: v503,
      openVehicleInfo: v504,
      openWidgetEdit: v459,
      resetWidget: v473,
      setWidget: v441,
      tireBandSheet: v510,
      nominalSheet: v509,
      toggleSheet: v400,
      viewSettings: v478,
      fillGroupRows: v479,
      settingVisible: v387,
      ckMode: v389,
      toggleCkMode: v392,
      widgetGone: v437,
      widgetEventScope: v472,
      refreshSetInfo: v399,
      sendWrite: v403,
      refreshWidgetSheets: v477,
      ae4ControllerSheet: v501,
      pickStatSlot: v475,
      pickStatField: v476,
      pickDefaultSize: v474,
      drawWidgetEdit: v460,
      pickWidgetVehicle: v433,
      selectWidgetVehicle: v434,
      get widgetCfg() {
        return v369.mem.widgetCfg;
      },
      set widgetCfg(v1167) {
        v369.mem.widgetCfg = v1167;
      }
    };
  })();
  (typeof window === "undefined" ? globalThis : window).LAZY_FEATURE.register(typeof window === "undefined" ? globalThis : window, "AUDIO_MARKET", () => {
    (function (v1168) {
      'use strict';

      const v1169 = [{
        id: "ring-36541",
        name: "季候风（这次季候风）",
        category: "热门歌曲",
        tags: "王菲,The Weeknd - Hong Kong (季候风)铃声 王菲 / The Weeknd",
        duration_ms: 35000,
        bytes: 560848,
        url: "https://r2.mumingji.com/ringtones/2026/11/01/b55568077fd327207d59b24b63093e94.mp3",
        source_url: "https://www.mumingji.com/yueyu/2026110636541.html",
        author: "王菲 / The Weeknd",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-836c489575924eac8855c9ea715e8402",
        name: "难办啊",
        category: "港片名句",
        tags: "乌鸦 翻桌子 古惑仔 难办啊",
        duration_ms: 3422,
        bytes: 55236,
        url: "https://ringbssdlbig.kugou.com/797f7e77516ec991fda2a0cab82a099b.mp3",
        source_url: "https://www.mumingji.com/",
        author: "老杨001（原站上传者）",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-35566",
        name: "我要验牌",
        category: "港片名句",
        tags: "我要验牌 mm铃声",
        duration_ms: 1202,
        bytes: 19709,
        url: "https://r2.mumingji.com/ringtones/2026/01/16/ee6ca7a89b233c7415f21c9918f84c11.mp3",
        source_url: "https://www.mumingji.com/funny/2026022235566.html",
        author: "mm铃声",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-28060",
        name: "约定",
        category: "粤语经典",
        tags: "约定 王菲",
        duration_ms: 26658,
        bytes: 426989,
        url: "https://r2.mumingji.com/2024/08/17/2156863689.mp3",
        source_url: "https://www.mumingji.com/effects/2024081728060.html",
        author: "王菲",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-32294",
        name: "灵感菇",
        category: "搞笑人声",
        tags: "灵感菇 mm铃声",
        duration_ms: 35000,
        bytes: 560803,
        url: "https://r2.mumingji.com/2025/03/30/3317918940.mp3",
        source_url: "https://www.mumingji.com/funny/2025033032294.html",
        author: "mm铃声",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-8f38a1a118054f0e9994a47294c4e467",
        name: "做人如果没有梦想那和咸鱼有什么分别",
        category: "港片名句",
        tags: "周星驰 少林足球 做人如果没有梦想那和咸鱼有什么分别",
        duration_ms: 3136,
        bytes: 59372,
        url: "https://ringbssdlbig.kugou.com/39735cef5e534558a65704ff2368b66e.m4a",
        source_url: "https://www.mumingji.com/",
        author: "001（原站上传者）",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-33216",
        name: "世界赠予我的",
        category: "热门歌曲",
        tags: "世界赠予我的 王菲",
        duration_ms: 36000,
        bytes: 577240,
        url: "https://r2.mumingji.com/2025/06/06/2191818116.mp3",
        source_url: "https://www.mumingji.com/effects/2025060633216.html",
        author: "王菲",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-35654",
        name: "牌没有问题",
        category: "港片名句",
        tags: "牌没有问题 mm铃声",
        duration_ms: 1646,
        bytes: 26910,
        url: "https://r2.mumingji.com/ringtones/2026/03/05/cd6d71283bfda294bbf326fc1da5add6.mp3",
        source_url: "https://www.mumingji.com/funny/2026030535654.html",
        author: "mm铃声",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-c87cc05a0c7f4cab9b58db6acbedb919",
        name: "你不要过来啊",
        category: "港片名句",
        tags: "步惊云 风云 名场面 你不要过来啊",
        duration_ms: 2691,
        bytes: 43050,
        url: "https://ringbssdlbig.kugou.com/66d297b4a667efad3031427149925681.mp3",
        source_url: "https://www.mumingji.com/",
        author: "对不起0（原站上传者）",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-16339",
        name: "如愿",
        category: "热门歌曲",
        tags: "如愿 王菲",
        duration_ms: 50364,
        bytes: 827613,
        url: "https://r2.mumingji.com/2022/02/08/3150844409.aac",
        source_url: "https://www.mumingji.com/popular/2022020816339.html",
        author: "王菲",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-26256",
        name: "因为爱情",
        category: "热门歌曲",
        tags: "因为爱情 王菲 / 陈奕迅",
        duration_ms: 48118,
        bytes: 562248,
        url: "https://r2.mumingji.com/2023/05/23/149912186.mp3",
        source_url: "https://www.mumingji.com/old/2023052326256.html",
        author: "王菲 / 陈奕迅",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-27459",
        name: "暧昧",
        category: "粤语经典",
        tags: "暧昧 王菲",
        duration_ms: 48248,
        bytes: 771970,
        url: "https://r2.mumingji.com/2024/03/16/1835460639.mp3",
        source_url: "https://www.mumingji.com/old/2024031627459.html",
        author: "王菲",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-23653",
        name: "执迷不悔",
        category: "粤语经典",
        tags: "执迷不悔(粤)下载高清 王菲",
        duration_ms: 48091,
        bytes: 556344,
        url: "https://r2.mumingji.com/2022/08/28/172605222.mp3",
        source_url: "https://www.mumingji.com/yueyu/2022082823653.html",
        author: "王菲",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-26824",
        name: "给自己的情书",
        category: "粤语经典",
        tags: "给自己的情书（粤语） 王菲",
        duration_ms: 48000,
        bytes: 557280,
        url: "https://r2.mumingji.com/2023/07/20/1480363764.mp3",
        source_url: "https://www.mumingji.com/yueyu/2023072026824.html",
        author: "王菲",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-34976",
        name: "邮差",
        category: "粤语经典",
        tags: "邮差 王菲 粤语 王菲",
        duration_ms: 38000,
        bytes: 608873,
        url: "https://r2.mumingji.com/2025/12/08/305179405.mp3",
        source_url: "https://www.mumingji.com/yueyu/2025120834976.html",
        author: "王菲",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-16571",
        name: "灰色轨迹（吉他片段）",
        category: "粤语经典",
        tags: "BEYOND - 灰色轨迹 吉他solo BEYOND",
        duration_ms: 52323,
        bytes: 621864,
        url: "https://r2.mumingji.com/2022/02/22/35715682.mp3",
        source_url: "https://www.mumingji.com/yueyu/2022022216571.html",
        author: "BEYOND",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-36398",
        name: "至少相拥没错",
        category: "粤语经典",
        tags: "MC 张天赋 - 至少相拥没错 MC 张天赋",
        duration_ms: 30000,
        bytes: 480990,
        url: "https://r2.mumingji.com/ringtones/2026/08/20/9fd3da92452f70396512b80815a01ed2.mp3",
        source_url: "https://www.mumingji.com/yueyu/2026082336398.html",
        author: "MC 张天赋",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-36309",
        name: "纷纷（R&B版）",
        category: "热门歌曲",
        tags: "纷纷 (R&B版) 落日微醺",
        duration_ms: 30000,
        bytes: 481011,
        url: "https://r2.mumingji.com/ringtones/2026/06/29/d1736e1afed592b36606357337e812de.mp3",
        source_url: "https://www.mumingji.com/yueyu/2026071236309.html",
        author: "落日微醺",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-21953",
        name: "热血燃烧",
        category: "粤语经典",
        tags: "郑伊健、陈小春 - 热血燃烧 郑伊健 / 陈小春",
        duration_ms: 60735,
        bytes: 710784,
        url: "https://r2.mumingji.com/2022/07/13/2883545667.mp3",
        source_url: "https://www.mumingji.com/yueyu/2022071321953.html",
        author: "郑伊健 / 陈小春",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-36361",
        name: "我只怨我自己",
        category: "粤语经典",
        tags: "我只怨我自己 落日微醺",
        duration_ms: 34000,
        bytes: 544952,
        url: "https://r2.mumingji.com/ringtones/2026/08/15/32cc36d3cbc52750d2494a3b41732115.mp3",
        source_url: "https://www.mumingji.com/yueyu/2026080936361.html",
        author: "落日微醺",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-31240",
        name: "THE MONSTERS 精灵啦啦操",
        category: "搞笑人声",
        tags: "THE MONSTERS精灵啦啦操 LABUBU",
        duration_ms: 26000,
        bytes: 417057,
        url: "https://r2.mumingji.com/2025/01/02/3743065050.mp3",
        source_url: "https://www.mumingji.com/funny/2025010231240.html",
        author: "LABUBU",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-36339",
        name: "伯虎说（老板不是人）",
        category: "搞笑人声",
        tags: "伯虎说（老板不是人） 从此不再辅",
        duration_ms: 42606,
        bytes: 682270,
        url: "https://r2.mumingji.com/ringtones/2026/07/23/571710cc4047ab0758997d2423a7b8d9.mp3",
        source_url: "https://www.mumingji.com/funny/2026072736339.html",
        author: "从此不再辅",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-36388",
        name: "牛马说",
        category: "搞笑人声",
        tags: "牛马说 ZitaWong",
        duration_ms: 40982,
        bytes: 655712,
        url: "https://r2.mumingji.com/ringtones/2026/07/19/5d7216b6ff3d30b4b0e72f6976cbadd9.mp3",
        source_url: "https://www.mumingji.com/funny/2026082036388.html",
        author: "ZitaWong",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-30747",
        name: "财神快来我家",
        category: "搞笑人声",
        tags: "财神快来我家 mm铃声",
        duration_ms: 22384,
        bytes: 227456,
        url: "https://r2.mumingji.com/2024/12/11/1488551162.aac",
        source_url: "https://www.mumingji.com/funny/2024121130747.html",
        author: "mm铃声",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-28173",
        name: "小黄人魔性笑声",
        category: "搞笑人声",
        tags: "小黄人版魔性笑声 小蓝",
        duration_ms: 13235,
        bytes: 135129,
        url: "https://r2.mumingji.com/2024/08/23/937709573.aac",
        source_url: "https://www.mumingji.com/funny/2024082328173.html",
        author: "小蓝",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-28330",
        name: "支付宝到账500万元",
        category: "搞笑人声",
        tags: "支付宝到账500万元 欣欣",
        duration_ms: 15418,
        bytes: 157156,
        url: "https://r2.mumingji.com/2024/08/30/1863747513.aac",
        source_url: "https://www.mumingji.com/funny/2024083028330.html",
        author: "欣欣",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-32487",
        name: "主人，那家伙又来电话了",
        category: "搞笑人声",
        tags: "主人，那家伙又来电话了 mm铃声",
        duration_ms: 15739,
        bytes: 126222,
        url: "https://r2.mumingji.com/2025/04/11/2256653057.mp3",
        source_url: "https://www.mumingji.com/funny/2025041132487.html",
        author: "mm铃声",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }, {
        id: "ring-28640",
        name: "完了，芭比Q了",
        category: "搞笑人声",
        tags: "搞笑音效：完了，芭比q了 小蓝",
        duration_ms: 12864,
        bytes: 131382,
        url: "https://r2.mumingji.com/2024/09/12/3889463260.aac",
        source_url: "https://www.mumingji.com/funny/2024091228640.html",
        author: "小蓝",
        license: "原站提供个人非商业试听与下载；版权归原权利人",
        license_url: "https://www.mumingji.com/terms.html"
      }];
      const v1170 = new Map();
      for (const v1174 of v1169) {
        v1170.set(v1174.category, (v1170.get(v1174.category) || 0) + 1);
      }
      const v1171 = [...v1170].map(([v1175, v1176]) => ({
        category: v1175,
        count: v1176
      }));
      const v1172 = new Map();
      function v1173(v1177) {
        if (!v1177 || !v1177.size) {
          return {
            items: v1169,
            categories: v1171
          };
        }
        const v1178 = [...v1177].sort();
        const v1179 = v1178.join(",");
        const v1180 = v1172.get(v1179);
        if (v1180) {
          return v1180;
        }
        const v1181 = v1169.filter(v1184 => !v1177.has(v1184.id));
        const v1182 = new Map();
        for (const v1185 of v1181) {
          v1182.set(v1185.category, (v1182.get(v1185.category) || 0) + 1);
        }
        const v1183 = {
          items: v1181,
          categories: [...v1182].map(([v1186, v1187]) => ({
            category: v1186,
            count: v1187
          }))
        };
        if (v1172.size >= 8) {
          v1172.delete(v1172.keys().next().value);
        }
        v1172.set(v1179, v1183);
        return v1183;
      }
      v1168.AUDIO_MARKET = {
        list({
          page = 1,
          category = "",
          q = "",
          exclude = null
        } = {}) {
          if (typeof q !== "string" || typeof category !== "string" || q.length > 60 || category.length > 24 || !Number.isSafeInteger(page) || page < 1 || page > 1000) {
            throw new Error("筛选参数无效");
          }
          if (exclude !== null && !(exclude instanceof Set)) {
            throw new Error("筛选参数无效");
          }
          const v1188 = q.trim().toLowerCase();
          const v1189 = v1173(exclude);
          const v1190 = v1189.items.filter(v1191 => (!category || v1191.category === category) && (v1191.name.toLowerCase().includes(v1188) || v1191.tags.toLowerCase().includes(v1188)));
          return {
            items: v1190.slice((page - 1) * 24, page * 24).map(({
              tags: v1192,
              ...v1193
            }) => ({
              ...v1193
            })),
            total: v1190.length,
            page: page,
            pageSize: 24,
            categories: v1189.categories.map(v1194 => ({
              ...v1194
            }))
          };
        }
      };
    })(typeof window === "undefined" ? globalThis : window);
  });
  window.LAZY_FEATURE.register(window, "AUDIO_CODEC", () => {
    (() => {
      const v1195 = 60;
      const v1196 = 200000;
      function v1197(v1200, v1201, v1202) {
        if (!v1200 || !Number.isFinite(v1201) || !Number.isFinite(v1202) || v1201 < 0 || v1202 > v1200.duration + 0.001 || v1202 <= v1201 || v1202 - v1201 > v1195 + 0.001) {
          throw new Error("请选择 0–60 秒的有效片段");
        }
        const v1203 = Math.min(22050, v1200.sampleRate);
        const v1204 = Math.floor((v1202 - v1201) * v1203);
        if (!v1204) {
          throw new Error("片段太短，请重新选择");
        }
        if (44 + v1204 * 2 > v1196) {
          throw new Error("音效不能超过 200KB，请缩短片段");
        }
        const v1205 = new ArrayBuffer(44 + v1204 * 2);
        const v1206 = new DataView(v1205);
        const v1207 = (v1209, v1210) => [...v1210].forEach((v1211, v1212) => v1206.setUint8(v1209 + v1212, v1211.charCodeAt(0)));
        v1207(0, "RIFF");
        v1206.setUint32(4, v1205.byteLength - 8, true);
        v1207(8, "WAVE");
        v1207(12, "fmt ");
        v1206.setUint32(16, 16, true);
        v1206.setUint16(20, 1, true);
        v1206.setUint16(22, 1, true);
        v1206.setUint32(24, v1203, true);
        v1206.setUint32(28, v1203 * 2, true);
        v1206.setUint16(32, 2, true);
        v1206.setUint16(34, 16, true);
        v1207(36, "data");
        v1206.setUint32(40, v1204 * 2, true);
        const v1208 = Array.from({
          length: v1200.numberOfChannels
        }, (v1213, v1214) => v1200.getChannelData(v1214));
        for (let v1215 = 0; v1215 < v1204; v1215++) {
          const v1216 = (v1201 + v1215 / v1203) * v1200.sampleRate;
          const v1217 = Math.floor(v1216);
          const v1218 = Math.min(v1217 + 1, v1200.length - 1);
          let v1219 = 0;
          for (const v1220 of v1208) {
            v1219 += (v1220[v1217] || 0) * (1 - v1216 + v1217) + (v1220[v1218] || 0) * (v1216 - v1217);
          }
          v1219 = Math.max(-1, Math.min(1, v1219 / v1208.length));
          v1206.setInt16(44 + v1215 * 2, Math.round(v1219 * (v1219 < 0 ? 32768 : 32767)), true);
        }
        return new Blob([v1205], {
          type: "audio/wav"
        });
      }
      function v1198(v1221, v1222 = 96) {
        const v1223 = v1221.getChannelData(0);
        const v1224 = Math.max(1, Math.floor(v1223.length / v1222));
        return Array.from({
          length: v1222
        }, (v1225, v1226) => {
          let v1227 = 0;
          for (let v1228 = v1226 * v1224; v1228 < Math.min((v1226 + 1) * v1224, v1223.length); v1228 += Math.max(1, Math.floor(v1224 / 128))) {
            v1227 = Math.max(v1227, Math.abs(v1223[v1228]));
          }
          return v1227;
        });
      }
      async function v1199(v1229, v1230, v1231, v1232) {
        if (v1232?.aborted) {
          throw new DOMException("已取消", "AbortError");
        }
        if (!v1229 || !Number.isFinite(v1230) || !Number.isFinite(v1231) || v1230 < 0 || v1231 > v1229.duration + 0.001 || v1231 <= v1230 || v1231 - v1230 > v1195 + 0.001) {
          throw new Error("请选择 0–60 秒的有效片段");
        }
        const v1233 = 44 + Math.floor((v1231 - v1230) * Math.min(22050, v1229.sampleRate)) * 2;
        if (v1233 <= v1196) {
          return v1197(v1229, v1230, v1231);
        }
        const v1234 = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!v1234 || !window.Worker) {
          throw new Error("当前浏览器不支持音效压缩，请更新浏览器或缩短片段");
        }
        const v1235 = v1196 / (v1231 - v1230) / 125 >= 96 ? 44100 : 22050;
        const v1236 = new v1234(1, Math.ceil((v1231 - v1230) * v1235), v1235);
        const v1237 = v1236.createBufferSource();
        v1237.buffer = v1229;
        v1237.connect(v1236.destination);
        v1237.start(0, v1230, v1231 - v1230);
        const v1238 = await v1236.startRendering();
        if (v1232?.aborted) {
          throw new DOMException("已取消", "AbortError");
        }
        return new Promise((v1239, v1240) => {
          const v1241 = window.__panelAudioWorkerSource;
          const v1242 = typeof v1241 === "string" && v1241 ? window.URL.createObjectURL(new Blob([v1241], {
            type: "text/javascript"
          })) : null;
          let v1243;
          try {
            v1243 = new window.Worker(v1242 || new URL("js/audio-compress-worker.js", window.document.baseURI));
          } catch (v1249) {
            if (v1242) {
              window.URL.revokeObjectURL(v1242);
            }
            v1240(v1249);
            return;
          }
          let v1244 = false;
          const v1245 = (v1250, v1251) => {
            if (v1244) {
              return;
            }
            v1244 = true;
            clearTimeout(v1247);
            v1232?.removeEventListener("abort", v1246);
            v1243.terminate();
            if (v1242) {
              window.URL.revokeObjectURL(v1242);
            }
            if (v1250) {
              v1240(v1250);
            } else {
              v1239(v1251);
            }
          };
          const v1246 = () => v1245(new DOMException("已取消", "AbortError"));
          const v1247 = setTimeout(() => v1245(new Error("音效压缩超时，请重试或缩短片段")), 60000);
          v1232?.addEventListener("abort", v1246, {
            once: true
          });
          v1243.onerror = () => v1245(new Error("无法加载音效压缩器，请刷新后重试"));
          v1243.onmessage = ({
            data: v1252
          }) => {
            if (v1252.error) {
              return v1245(new Error(v1252.error));
            }
            if (!(v1252.bytes instanceof ArrayBuffer) || !v1252.bytes.byteLength || v1252.bytes.byteLength > v1196) {
              return v1245(new Error("压缩结果超过 200KB，请缩短片段"));
            }
            v1245(null, new Blob([v1252.bytes], {
              type: "audio/mpeg"
            }));
          };
          const v1248 = v1238.getChannelData(0);
          try {
            v1243.postMessage({
              samples: v1248.buffer,
              sampleRate: v1235
            }, [v1248.buffer]);
          } catch {
            v1245(new Error("无法启动音效压缩，请重试"));
          }
        });
      }
      window.AUDIO_CODEC = {
        wav: v1197,
        compress: v1199,
        peaks: v1198,
        MAX_SECONDS: v1195,
        MAX_BYTES: v1196
      };
    })();
  });
  window.LAZY_FEATURE.register(window.APP, "audioSources", () => {
    (() => {
      const v1253 = window.APP;
      const v1254 = window.UI;
      const v1255 = window.MODEL.esc;
      const v1256 = window.document;
      const v1257 = window.navigator;
      let v1258 = null;
      let v1259 = 0;
      let v1260 = null;
      const v1261 = v1274 => v1258 === v1274 && v1274.current();
      const v1262 = (v1275, v1276) => v1261(v1275) && v1254.sheetAlive(v1276) && v1254.currentSheet() === v1276;
      const v1263 = v1277 => Math.floor(v1277 / 60) + ":" + (v1277 % 60).toFixed(1).padStart(4, "0");
      function v1264() {
        const v1278 = v1258;
        v1258 = null;
        if (!v1278) {
          return;
        }
        v1278.picker?.remove();
        for (const v1279 of [...v1278.handles].reverse()) {
          if (v1254.sheetAlive(v1279)) {
            v1254.closeSheet(v1279);
          }
        }
      }
      function v1265(v1280, v1281) {
        const v1282 = v1281.onDismiss;
        const v1283 = v1254.sheet(v1253.phone(), {
          closeMode: "current",
          full: true,
          page: true,
          className: "audio-work-page",
          ...v1281,
          onDismiss() {
            v1280.handles.delete(v1283);
            v1282?.();
          }
        });
        v1280.handles.add(v1283);
        return v1283;
      }
      function v1266(v1284, v1285) {
        if (!v1261(v1284)) {
          return;
        }
        v1264();
        if (v1284.current()) {
          v1284.ready(v1285);
        }
      }
      function v1267(v1286, v1287, v1288) {
        if (!v1262(v1286, v1288)) {
          return;
        }
        const v1289 = v1256.createElement("input");
        v1289.type = "file";
        v1289.accept = v1287 === "video" ? "video/*" : "audio/*,.wav,.mp3,.m4a,.aac,.ogg,.flac";
        v1289.setAttribute("aria-label", v1287 === "video" ? "选择视频" : "选择音频文件");
        v1289.hidden = true;
        v1256.body.append(v1289);
        const v1290 = () => {
          v1289.remove();
          v1286.picker = null;
        };
        v1286.picker?.remove();
        v1286.picker = v1289;
        v1289.addEventListener("cancel", v1290, {
          once: true
        });
        v1289.addEventListener("change", () => {
          const v1291 = v1289.files?.[0];
          v1290();
          if (!v1291 || !v1262(v1286, v1288)) {
            return;
          }
          if (!v1291.size || v1291.size > 104857600) {
            return v1254.toast(v1253.phone(), "请选择不超过 100 MB 的文件");
          }
          v1254.closeSheet(v1288);
          v1269(v1286, v1291, v1287);
        }, {
          once: true
        });
        v1289.click();
      }
      function v1268(v1292) {
        v1264();
        const v1293 = v1258 = {
          ...v1292,
          handles: new Set()
        };
        let v1294;
        v1294 = v1265(v1293, {
          key: "audio-sources",
          title: "添加专属音效",
          page: false,
          center: true,
          className: "audio-source-menu",
          body: "<div class=\"audio-source-grid\">" + [["file", "文件", "导入音频", "♪"], ["video", "视频", "提取视频声音", "▷"], ["record", "录音", "现场录制", "●"]].map(([v1295, v1296, v1297, v1298]) => "<button type=\"button\" data-source=\"" + v1295 + "\"><span class=\"audio-source-icon\" aria-hidden=\"true\">" + v1298 + "</span><strong>" + v1296 + "</strong><span class=\"muted\">" + v1297 + "</span></button>").join("") + "</div>",
          onMount: v1299 => v1299.querySelectorAll("[data-source]").forEach(v1300 => v1300.addEventListener("click", () => {
            if (!v1262(v1293, v1294)) {
              return;
            }
            const v1301 = v1300.dataset.source;
            if (v1301 === "file" || v1301 === "video") {
              v1267(v1293, v1301, v1294);
            } else if (v1301 === "record") {
              v1254.closeSheet(v1294);
              v1270(v1293);
            }
          }))
        });
      }
      function v1269(v1302, v1303, v1304 = "file") {
        if (!v1261(v1302)) {
          return;
        }
        const v1305 = window.AUDIO_CODEC;
        const v1306 = window.AudioContext || window.webkitAudioContext;
        let v1307;
        let v1308;
        let v1309;
        let v1310;
        let v1311;
        let v1312;
        let v1313;
        let v1314 = false;
        let v1315 = false;
        let v1316 = false;
        let v1317 = 0;
        let v1318 = 0;
        const v1319 = new AbortController();
        const v1320 = URL.createObjectURL(v1303);
        const v1321 = () => !v1314 && v1262(v1302, v1307);
        const v1322 = v1327 => {
          if (v1321()) {
            v1308.querySelector("[data-edit-status]").textContent = v1327;
          }
        };
        function v1323() {
          clearInterval(v1311);
          v1311 = null;
          v1312?.pause();
          if (v1321()) {
            v1308.querySelector("[data-edit-play]").textContent = "试听片段";
          }
        }
        function v1324(v1328) {
          const v1329 = Math.max(v1317, Math.min(v1318, v1328));
          v1308.querySelector("[data-seek]").value = v1329;
          v1308.querySelector("[data-current-time]").textContent = v1263(v1329);
          v1308.querySelector("[data-playhead]").style.left = v1329 * 100 / v1310.duration + "%";
          return v1329;
        }
        function v1325() {
          if (!v1321() || !v1310) {
            return;
          }
          const v1330 = v1324(v1312.currentTime);
          if (v1312.currentTime < v1317 || v1312.currentTime > v1318) {
            v1312.currentTime = v1330;
          }
          if (v1330 >= v1318) {
            v1323();
          }
        }
        function v1326() {
          v1323();
          v1308.querySelector("[data-start-time]").textContent = v1263(v1317);
          v1308.querySelector("[data-end-time]").textContent = v1263(v1318);
          const v1331 = 44 + Math.floor((v1318 - v1317) * Math.min(22050, v1310.sampleRate)) * 2;
          v1308.querySelector("[data-selection]").textContent = "已选 " + (v1318 - v1317).toFixed(1) + " 秒 · " + (v1331 > v1305.MAX_BYTES ? "导出时自动压缩至 200KB 内" : (v1331 / 1000).toFixed(1) + "KB / 200KB");
          v1308.querySelector("[data-wave]").style.setProperty("--clip-start", v1317 * 100 / v1310.duration + "%");
          v1308.querySelector("[data-wave]").style.setProperty("--clip-end", v1318 * 100 / v1310.duration + "%");
          v1308.querySelector("[data-start]").value = v1317;
          v1308.querySelector("[data-end]").value = v1318;
          const v1332 = v1308.querySelector("[data-seek]");
          v1332.min = v1317;
          v1332.max = v1318;
          v1312.currentTime = v1324(v1317);
        }
        v1307 = v1265(v1302, {
          key: "audio-editor",
          title: v1304 === "video" ? "截取视频声音" : "截取音效",
          body: "<div class=\"audio-editor\"><p class=\"audio-import-name\">" + v1255(v1303.name) + "</p>\n        " + (v1304 === "video" ? "<video controls playsinline preload=\"metadata\" class=\"audio-video\" aria-label=\"原视频预览\"></video>" : "") + "\n        <div class=\"audio-wave\" data-wave><div class=\"audio-wave-bars\" data-bars aria-hidden=\"true\"></div><span class=\"audio-playhead\" data-playhead aria-hidden=\"true\"></span><input class=\"audio-seek\" type=\"range\" data-seek min=\"0\" max=\"0\" step=\"0.01\" value=\"0\" aria-label=\"试听位置\" disabled></div>\n        <p class=\"audio-preview-time\"><output data-current-time>0:00.0</output><span>拖动波形调整试听位置</span></p>\n        <p class=\"audio-selection\" data-selection>正在读取声音…</p>\n        <label class=\"audio-trim-label\">开始 <output data-start-time>0:00.0</output><input type=\"range\" data-start min=\"0\" step=\"0.01\" aria-label=\"片段开始时间\" disabled></label>\n        <label class=\"audio-trim-label\">结束 <output data-end-time>0:00.0</output><input type=\"range\" data-end min=\"0\" step=\"0.01\" aria-label=\"片段结束时间\" disabled></label>\n        <p class=\"muted\">自由选取最多 60 秒，较大片段在 200KB 内自动选择尽可能高的音质。短片段无需有损压缩，原文件仅在本机处理。</p>\n        <div class=\"audio-editor-buttons\"><button type=\"button\" class=\"btn\" data-edit-play disabled>试听片段</button><button type=\"button\" class=\"btn primary\" data-edit-use disabled>使用这段声音</button></div>\n        <p role=\"status\" aria-live=\"polite\" data-edit-status>正在解析，请稍候…</p></div>",
          onMount: v1333 => {
            v1308 = v1333;
          },
          onDismiss: () => {
            v1314 = true;
            v1319.abort();
            v1323();
            clearTimeout(v1313);
            if (v1312) {
              v1312.onplay = v1312.onpause = v1312.ontimeupdate = v1312.onseeked = null;
              v1312.removeAttribute("src");
              v1312.load();
            }
            URL.revokeObjectURL(v1320);
            v1309?.close().catch(() => {});
          }
        });
        v1312 = v1308.querySelector("video") || v1256.createElement("audio");
        (async () => {
          try {
            if (!v1306) {
              throw new Error("当前浏览器不支持声音截取，请更新浏览器或 App");
            }
            if (v1304 !== "record") {
              const v1334 = v1312;
              await new Promise((v1335, v1336) => {
                v1313 = setTimeout(() => v1336(new Error("无法读取文件时长，请换一个音视频文件")), 15000);
                v1334.onloadedmetadata = () => {
                  clearTimeout(v1313);
                  v1335();
                };
                v1334.onerror = () => {
                  clearTimeout(v1313);
                  v1336(new Error("无法读取这个文件，请换一个格式"));
                };
                v1334.preload = "metadata";
                v1334.src = v1320;
              });
              if (!v1321()) {
                return;
              }
              if (!Number.isFinite(v1334.duration) || v1334.duration <= 0 || v1334.duration > 300) {
                throw new Error("请选择 5 分钟以内的音视频");
              }
            } else {
              v1312.src = v1320;
            }
            if (!v1321()) {
              return;
            }
            v1309 = new v1306();
            v1310 = await v1309.decodeAudioData(await v1303.arrayBuffer());
            if (!v1321()) {
              return;
            }
            if (!v1310.duration || v1310.duration > 300) {
              throw new Error("请选择 5 分钟以内的音视频");
            }
            v1318 = Math.min(v1305.MAX_SECONDS, v1310.duration);
            v1308.querySelector("[data-bars]").innerHTML = v1305.peaks(v1310).map(v1337 => "<i style=\"height:" + Math.max(4, v1337 * 100) + "%\"></i>").join("");
            for (const v1338 of v1308.querySelectorAll("input[type=range]")) {
              v1338.max = v1310.duration;
              v1338.disabled = false;
            }
            v1308.querySelector("[data-seek]").addEventListener("input", v1339 => {
              if (v1321() && !v1316) {
                v1312.currentTime = v1324(Number(v1339.target.value));
              }
            });
            v1312.onplay = () => {
              if (!v1321() || v1316) {
                v1323();
                return;
              }
              if (v1312.currentTime < v1317 || v1312.currentTime >= v1318) {
                v1312.currentTime = v1317;
              }
              clearInterval(v1311);
              v1311 = setInterval(v1325, 40);
              v1308.querySelector("[data-edit-play]").textContent = "停止试听";
            };
            v1312.onpause = () => {
              clearInterval(v1311);
              v1311 = null;
              if (v1321()) {
                v1325();
                v1308.querySelector("[data-edit-play]").textContent = "试听片段";
              }
            };
            v1312.ontimeupdate = v1312.onseeked = v1325;
            v1308.querySelector("[data-start]").addEventListener("input", v1340 => {
              v1317 = Math.min(Number(v1340.target.value), v1310.duration - Math.min(0.1, v1310.duration));
              v1318 = Math.min(v1310.duration, Math.max(v1318, v1317 + Math.min(0.1, v1310.duration)));
              if (v1318 - v1317 > v1305.MAX_SECONDS) {
                v1318 = v1317 + v1305.MAX_SECONDS;
              }
              v1326();
            });
            v1308.querySelector("[data-end]").addEventListener("input", v1341 => {
              v1318 = Math.max(Number(v1341.target.value), Math.min(0.1, v1310.duration));
              v1317 = Math.min(v1317, Math.max(0, v1318 - Math.min(0.1, v1310.duration)));
              if (v1318 - v1317 > v1305.MAX_SECONDS) {
                v1317 = v1318 - v1305.MAX_SECONDS;
              }
              v1326();
            });
            v1308.querySelector("[data-edit-play]").disabled = false;
            v1308.querySelector("[data-edit-use]").disabled = false;
            v1308.querySelector("[data-edit-play]").addEventListener("click", async () => {
              if (!v1321()) {
                return;
              }
              if (!v1312.paused) {
                v1323();
                return;
              }
              if (v1315) {
                return;
              }
              v1315 = true;
              try {
                if (v1312.currentTime >= v1318) {
                  v1312.currentTime = v1324(v1317);
                }
                await v1312.play();
                if (!v1321() || v1316) {
                  v1323();
                }
              } catch {
                v1323();
                v1322("无法播放，请再次点击试听");
              } finally {
                v1315 = false;
              }
            });
            v1308.querySelector("[data-edit-use]").addEventListener("click", async () => {
              if (!v1321() || v1316) {
                return;
              }
              v1316 = true;
              v1323();
              v1322("正在本机处理声音，请稍候…");
              for (const v1342 of v1308.querySelectorAll("input, [data-edit-use], [data-edit-play]")) {
                v1342.disabled = true;
              }
              try {
                const v1343 = await v1305.compress(v1310, v1317, v1318, v1319.signal);
                if (!v1321()) {
                  return;
                }
                const v1344 = v1343.type === "audio/mpeg" ? ".mp3" : ".wav";
                v1266(v1302, new File([v1343], v1303.name.replace(/\.[^.]+$/, "") + v1344, {
                  type: v1343.type
                }));
              } catch (v1345) {
                v1322(v1345.message);
              } finally {
                v1316 = false;
                if (v1321()) {
                  for (const v1346 of v1308.querySelectorAll("input, [data-edit-use], [data-edit-play]")) {
                    v1346.disabled = false;
                  }
                }
              }
            });
            v1326();
            v1322("声音已就绪，可以选择片段");
          } catch (v1347) {
            v1322(v1347.message || "无法解析声音，请选择 MP4（AAC）视频或 MP3/WAV 音频");
          }
        })();
      }
      function v1270(v1348) {
        let v1349;
        let v1350;
        let v1351;
        let v1352;
        let v1353;
        let v1354 = false;
        let v1355 = 0;
        let v1356 = "";
        let v1357 = "";
        let v1358 = false;
        const v1359 = String(++v1259);
        const v1360 = window.ZeehoAudio;
        const v1361 = () => !v1358 && v1262(v1348, v1349);
        const v1362 = v1368 => {
          if (v1361()) {
            v1350.querySelector("[data-record-status]").textContent = v1368;
          }
        };
        const v1363 = () => {
          if (v1356) {
            try {
              v1360.cancelAudioRecording(v1357, v1356);
            } catch {}
            v1356 = "";
          }
          if (v1260?.generation === v1359) {
            v1260 = null;
          }
        };
        const v1364 = () => {
          clearInterval(v1353);
          v1351?.getTracks().forEach(v1369 => v1369.stop());
          v1351 = null;
          v1363();
        };
        function v1365() {
          if (!v1361()) {
            return;
          }
          const v1370 = v1350.querySelector("[data-record-toggle]");
          const v1371 = v1352?.state === "recording";
          v1370.disabled = v1354;
          v1370.setAttribute("aria-busy", String(v1354));
          v1370.setAttribute("aria-label", v1371 ? "停止录音" : "开始录音");
          v1370.setAttribute("aria-pressed", String(v1371));
          v1370.innerHTML = v1371 ? "<span class=\"audio-mic-stop\" aria-hidden=\"true\"></span>" : "<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"><rect x=\"8\" y=\"2\" width=\"8\" height=\"13\" rx=\"4\"/><path d=\"M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8\"/></svg>";
          v1350.querySelector("[data-record-label]").textContent = v1354 ? "正在准备麦克风…" : v1371 ? "点击停止录音" : "点击开始录音";
        }
        function v1366() {
          if (v1352?.state === "recording") {
            v1352.stop();
          }
          v1364();
          v1365();
        }
        async function v1367(v1372 = false) {
          if (!v1361() || v1354 || v1352?.state === "recording") {
            return;
          }
          if (!v1257.mediaDevices?.getUserMedia || !window.MediaRecorder) {
            return v1362(window.isSecureContext ? "当前浏览器不支持录音，请更新 App 或浏览器" : "录音需要 HTTPS；局域网 HTTP 页面可先用文件或视频导入");
          }
          v1354 = true;
          v1365();
          v1362("正在请求麦克风权限…");
          try {
            if (v1253.inShell?.()) {
              v1357 = new URL(window.location.href).searchParams.get("_shellNav") || "";
              if (!v1360?.beginAudioRecording || !v1360?.cancelAudioRecording) {
                throw new Error("请更新安卓 App 后使用现场录音");
              }
              v1356 = String(v1360.beginAudioRecording(v1357, v1359) || "");
              if (!v1356) {
                throw new Error("录音授权未就绪，请返回后重试");
              }
            }
            v1260 = {
              ticket: v1356,
              generation: v1359,
              current: () => v1361() && v1354
            };
            const v1373 = await v1257.mediaDevices.getUserMedia({
              audio: true,
              video: false
            });
            if (!v1361()) {
              v1373.getTracks().forEach(v1377 => v1377.stop());
              return;
            }
            v1351 = v1373;
            if (v1372) {
              v1364();
              v1362("");
              return;
            }
            const v1374 = [];
            let v1375 = 0;
            const v1376 = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find(v1378 => window.MediaRecorder.isTypeSupported(v1378));
            v1352 = new window.MediaRecorder(v1351, v1376 ? {
              mimeType: v1376
            } : {});
            v1352.ondataavailable = v1379 => {
              if (v1379.data.size) {
                v1374.push(v1379.data);
                v1375 += v1379.data.size;
                if (v1375 > 10485760) {
                  v1366();
                }
              }
            };
            v1352.onerror = () => {
              v1358 = true;
              v1364();
              if (v1254.sheetAlive(v1349)) {
                v1254.closeSheet(v1349);
              }
              v1254.toast(v1253.phone(), "录音失败，请重新录制");
            };
            v1352.onstop = () => {
              v1364();
              if (!v1361()) {
                return;
              }
              if (!v1375 || v1375 > 10485760) {
                v1362("录音为空或过大，请重新录制");
                v1365();
                return;
              }
              const v1380 = v1352.mimeType;
              const v1381 = new File(v1374, "现场录音-" + new Date().toISOString().slice(11, 19).replaceAll(":", "") + "." + (v1380.includes("mp4") ? "m4a" : "webm"), {
                type: v1380
              });
              v1254.closeSheet(v1349);
              v1269(v1348, v1381, "record");
            };
            v1352.start(250);
            v1355 = Date.now();
            v1362("录制中，点击停止后可以试听和截取");
            v1353 = setInterval(() => {
              if (!v1361() || v1256.hidden) {
                v1358 = true;
                v1366();
                return;
              }
              const v1382 = (Date.now() - v1355) / 1000;
              v1350.querySelector("[data-record-time]").textContent = v1263(Math.min(60, v1382));
              if (v1382 >= 60) {
                v1366();
              }
            }, 100);
          } catch (v1383) {
            v1364();
            v1362(v1383.name === "NotAllowedError" ? "麦克风权限未开启，请在系统设置中允许后重试" : v1383.name === "NotReadableError" ? "无法启动麦克风，请更新 App，并检查系统麦克风开关及其他应用占用后重试" : v1383.message || "无法开始录音");
          } finally {
            v1354 = false;
            v1365();
          }
        }
        v1349 = v1265(v1348, {
          key: "audio-recorder",
          title: "现场录音",
          className: "audio-work-page audio-recorder-page",
          body: "<div class=\"audio-recorder\"><h2>录下你的专属声音</h2><p class=\"muted\">最多录制 60 秒，停止后可试听、截取</p><div class=\"audio-record-display\"><output class=\"audio-record-time\" data-record-time>0:00.0</output><p role=\"status\" aria-live=\"polite\" data-record-status></p></div><div class=\"audio-record-controls\"><button type=\"button\" class=\"audio-mic\" data-record-toggle aria-label=\"开始录音\" aria-pressed=\"false\"></button><p data-record-label>点击开始录音</p></div></div>",
          onMount: v1384 => {
            v1350 = v1384;
            v1350.querySelector("[data-record-toggle]").addEventListener("click", () => {
              if (v1354) {
                return;
              }
              if (v1352?.state === "recording") {
                v1366();
              } else {
                v1367();
              }
            });
          },
          onDismiss: () => {
            v1358 = true;
            v1366();
            v1364();
          }
        });
        v1365();
        v1367(true);
      }
      function v1271(v1385) {
        v1264();
        const v1386 = v1258 = {
          ...v1385,
          handles: new Set()
        };
        v1272(v1386);
      }
      function v1272(v1387) {
        const v1388 = v1387.marketState || {};
        let v1389;
        let v1390;
        let v1391 = v1388.page || 1;
        let v1392 = v1388.category || "";
        let v1393 = v1388.query || "";
        let v1394 = v1388.data;
        let v1395 = "";
        let v1396;
        let v1397 = "";
        let v1398 = "";
        let v1399;
        let v1400 = new Set();
        let v1401 = false;
        let v1402 = false;
        let v1403 = "";
        const v1404 = () => v1262(v1387, v1389);
        const v1405 = () => {
          if (v1396) {
            v1396.pause();
            v1396.removeAttribute("src");
            v1396.load();
            v1396 = null;
          }
          v1397 = "";
        };
        const v1406 = v1413 => {
          const v1414 = new URL(v1413);
          if (v1414.protocol !== "https:" || v1414.username || v1414.password) {
            throw new Error("素材地址无效");
          }
          return v1414.href;
        };
        async function v1407(v1415, v1416 = {}) {
          const v1417 = window.WALLMARKET;
          const v1418 = v1417.resolveBase(window.Store);
          const v1419 = String(window.API?.token || "");
          const v1420 = new Headers(v1416.headers);
          if (v1419) {
            v1420.set("X-Market-Token", (await v1417.session(v1418, v1419)).token);
          }
          const v1421 = await fetch(v1418 + v1415, {
            ...v1416,
            headers: v1420,
            credentials: "omit",
            referrerPolicy: "no-referrer"
          });
          if (!v1421.ok) {
            if (v1421.status === 401 && v1419) {
              v1417.forgetSession(v1418, v1419);
            }
            const v1422 = await v1421.json().catch(() => ({}));
            throw new Error(v1422.error || "市场请求失败，请稍后再试");
          }
          return v1421;
        }
        async function v1408() {
          try {
            const v1423 = window.WALLMARKET.resolveBase(window.Store);
            const v1424 = await (await fetch(v1423 + "/audio/hidden", {
              credentials: "omit",
              referrerPolicy: "no-referrer"
            })).json();
            const v1425 = Array.isArray(v1424?.ids) ? v1424.ids.filter(v1426 => typeof v1426 === "string") : null;
            if (!v1425) {
              throw new Error("下架名单格式无效");
            }
            v1400 = new Set(v1425);
            v1401 = true;
          } catch {
            v1400 = new Set();
            v1401 = false;
          }
          try {
            const v1427 = window.WALLMARKET.resolveBase(window.Store);
            const v1428 = String(window.API?.token || "");
            v1402 = !!v1428 && (await window.WALLMARKET.session(v1427, v1428)).admin === true;
          } catch {
            v1402 = false;
          }
          v1410();
        }
        function v1409() {
          if (!v1404()) {
            return;
          }
          const v1429 = v1390.contains(v1256.activeElement) ? v1256.activeElement : null;
          const v1430 = ["marketFilter", "marketPreview", "marketUse", "marketDelete"].find(v1433 => v1429?.dataset[v1433] !== undefined);
          v1390.querySelector("[data-market-retry]").hidden = !v1395 || !!v1398;
          v1390.querySelector("[data-market-status]").textContent = v1395 || (v1398 ? "正在下载声音…" : v1403 ? "正在删除…" : "共 " + (v1394?.total ?? 0) + " 个声音 · 点击播放试听");
          const v1431 = !!v1398 || !!v1403;
          const v1432 = [{
            category: "",
            label: "全部"
          }, ...(v1394?.categories || []).map(v1434 => ({
            category: v1434.category,
            label: v1434.category
          }))];
          v1390.querySelector("[data-market-category]").innerHTML = v1432.map(v1435 => "<button type=\"button\" data-market-filter=\"" + v1255(v1435.category) + "\" aria-pressed=\"" + (v1392 === v1435.category) + "\"" + (v1431 ? " disabled" : "") + ">" + v1255(v1435.label) + "</button>").join("");
          v1390.querySelector("[data-market-list]").innerHTML = (v1394?.items || []).map(v1436 => "\n        <div class=\"audio-market-item" + (v1397 === v1436.id ? " is-playing" : "") + "\">\n          <button type=\"button\" class=\"audio-market-play\" data-market-preview=\"" + v1255(v1436.id) + "\" aria-label=\"" + (v1397 === v1436.id ? "停止" : "试听") + v1255(v1436.name) + "\" aria-pressed=\"" + (v1397 === v1436.id) + "\"" + (v1431 ? " disabled" : "") + ">\n            <span aria-hidden=\"true\">" + (v1397 === v1436.id ? "■" : v1254.icon("play", 40)) + "</span>\n          </button>\n          <div class=\"audio-market-info\">\n            <strong title=\"" + v1255(v1436.name) + "\">" + v1255(v1436.name) + "</strong>\n            <div class=\"audio-market-meta\">\n              <span title=\"" + v1255(v1436.author) + " · " + v1255(v1436.category) + "\">" + v1255(v1436.author) + " · " + Math.floor(v1436.duration_ms / 60000) + ":" + String(Math.floor(v1436.duration_ms / 1000) % 60).padStart(2, "0") + "</span>\n              <a href=\"" + v1255(v1406(v1436.source_url)) + "\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"" + v1255(v1436.license) + "\" aria-label=\"" + v1255(v1436.name) + "：" + v1255(v1436.license) + "，查看来源\">来源</a>\n              " + (v1402 ? "<button type=\"button\" class=\"audio-market-delete\" data-market-delete=\"" + v1255(v1436.id) + "\" aria-label=\"删除" + v1255(v1436.name) + "\"" + (v1431 ? " disabled" : "") + ">" + (v1403 === v1436.id ? "删除中" : "删除") + "</button>" : "") + "\n            </div>\n          </div>\n          <button type=\"button\" class=\"btn audio-market-use\" data-market-use=\"" + v1255(v1436.id) + "\" aria-label=\"使用" + v1255(v1436.name) + "\"" + (v1431 ? " disabled" : "") + ">" + (v1398 === v1436.id ? "下载中" : "使用") + "</button>\n        </div>").join("") || "<p class=\"audio-empty\">" + (v1395 ? "暂时无法加载，请点击重试" : "暂无匹配声音，试试其他关键词") + "</p>";
          for (const v1437 of v1390.querySelectorAll("[data-market-search] input, [data-market-search] button")) {
            v1437.disabled = v1431;
          }
          v1390.querySelector("[data-market-prev]").disabled = v1391 <= 1 || v1431;
          v1390.querySelector("[data-market-next]").disabled = !v1394 || v1391 * v1394.pageSize >= v1394.total || v1431;
          v1390.querySelector("[data-market-page]").textContent = "第 " + v1391 + " 页";
          if (v1430) {
            [...v1390.querySelectorAll("button")].find(v1438 => !v1438.disabled && v1438.dataset[v1430] === v1429.dataset[v1430])?.focus({
              preventScroll: true
            });
          }
        }
        function v1410() {
          v1405();
          v1395 = "";
          if (!v1401) {
            v1394 = null;
            v1395 = "音效市场暂时不可用，请稍后重试";
            v1409();
            return;
          }
          try {
            const v1439 = window.AUDIO_MARKET.list({
              page: v1391,
              category: v1392,
              q: v1393,
              exclude: v1400.size ? v1400 : null
            });
            v1439.items.forEach(v1440 => {
              v1406(v1440.url);
              v1406(v1440.source_url);
            });
            v1394 = v1439;
          } catch (v1441) {
            v1394 = null;
            v1395 = v1441.message || "目录加载失败";
          }
          v1409();
        }
        function v1411() {
          if (!v1404()) {
            return;
          }
          v1410();
          v1387.mount?.(v1390, {
            refresh: v1410,
            busy: () => !!v1398
          });
          v1408();
        }
        async function v1412(v1442) {
          if (!v1402 || !v1404()) {
            return;
          }
          const v1443 = await new Promise(v1444 => {
            let v1445;
            let v1446 = false;
            v1445 = v1254.sheet(v1253.phone(), {
              key: "audio-market-delete",
              title: "删除音效",
              closeMode: "current",
              center: true,
              body: "<p>删除「" + v1255(v1442.name) + "」后所有车友都看不到了，无法恢复。</p>\n            <button type=\"button\" class=\"btn block primary\" data-delete-confirm>确认删除</button>",
              onDismiss: () => v1444(v1446),
              onMount: v1447 => v1447.querySelector("[data-delete-confirm]").addEventListener("click", () => {
                v1446 = true;
                v1254.closeSheet(v1445);
              })
            });
          });
          if (!v1443 || !v1404()) {
            return;
          }
          v1403 = v1442.id;
          v1409();
          try {
            await v1407("/audio/" + encodeURIComponent(v1442.id), {
              method: "DELETE"
            });
            v1400.add(v1442.id);
            v1254.toast(window.APP.phone(), "音效已删除", 2400);
          } catch (v1448) {
            if (v1404()) {
              v1395 = v1448.message || "删除失败，请稍后再试";
            }
          } finally {
            v1403 = "";
            if (v1404()) {
              v1410();
            }
          }
        }
        v1389 = v1265(v1387, {
          key: "audio-market",
          title: "音效市场",
          className: "audio-work-page audio-page",
          body: "<div class=\"audio-market\"><form data-market-search class=\"audio-market-filter\"><input type=\"search\" class=\"field\" aria-label=\"搜索音效\" placeholder=\"搜索歌曲、歌手或经典台词\" maxlength=\"60\" data-market-query><button type=\"submit\" class=\"btn\">搜索</button></form><div class=\"audio-market-categories\" role=\"group\" aria-label=\"音效分类\" data-market-category></div><p role=\"status\" aria-live=\"polite\" data-market-status></p><button type=\"button\" class=\"btn\" data-market-retry hidden>重试</button><div class=\"audio-card\" data-market-list></div><p class=\"audio-market-hint muted\">歌曲、台词均为短片段，可试听和截取。原站仅供个人非商业使用，详情见「来源」。</p><div class=\"audio-market-pages\"><button type=\"button\" class=\"btn\" data-market-prev>上一页</button><span data-market-page></span><button type=\"button\" class=\"btn\" data-market-next>下一页</button></div></div>",
          onMount: v1449 => {
            v1390 = v1449;
            v1390.querySelector("[data-market-query]").value = v1393;
            v1390.querySelector("[data-market-retry]").addEventListener("click", () => void v1408());
            v1390.querySelector("[data-market-search]").addEventListener("submit", v1450 => {
              v1450.preventDefault();
              v1393 = v1390.querySelector("[data-market-query]").value.trim();
              v1391 = 1;
              v1410();
            });
            v1390.querySelector("[data-market-category]").addEventListener("click", v1451 => {
              const v1452 = v1451.target.closest("[data-market-filter]");
              if (!v1452 || v1398 || v1452.dataset.marketFilter === v1392) {
                return;
              }
              v1392 = v1452.dataset.marketFilter;
              v1391 = 1;
              v1410();
            });
            v1390.querySelector("[data-market-prev]").addEventListener("click", () => {
              if (v1391 > 1) {
                v1391--;
                v1410();
              }
            });
            v1390.querySelector("[data-market-next]").addEventListener("click", () => {
              if (v1394 && v1391 * v1394.pageSize < v1394.total) {
                v1391++;
                v1410();
              }
            });
            v1390.querySelector("[data-market-list]").addEventListener("click", async v1453 => {
              const v1454 = v1453.target.closest("[data-market-preview]");
              const v1455 = v1453.target.closest("[data-market-use]");
              const v1456 = v1453.target.closest("[data-market-delete]");
              const v1457 = v1454?.dataset.marketPreview || v1455?.dataset.marketUse || v1456?.dataset.marketDelete;
              const v1458 = v1394?.items.find(v1461 => v1461.id === v1457);
              if (!v1458 || !v1404() || v1398 || v1403) {
                return;
              }
              if (v1456) {
                return v1412(v1458);
              }
              if (v1454) {
                const v1462 = v1397 === v1457;
                v1405();
                if (v1462) {
                  v1409();
                  return;
                }
                v1396 = new Audio(v1406(v1458.url));
                v1397 = v1457;
                const v1463 = v1396;
                const v1464 = v1465 => {
                  if (!v1404() || v1396 !== v1463) {
                    return;
                  }
                  v1405();
                  if (v1465) {
                    v1395 = "暂时无法试听，请稍后重试";
                  }
                  v1409();
                };
                v1463.onended = () => v1464(false);
                v1463.onerror = () => v1464(true);
                v1409();
                try {
                  await v1463.play();
                } catch {
                  v1464(true);
                }
                return;
              }
              v1405();
              v1398 = v1457;
              v1395 = "";
              v1409();
              const v1459 = v1399 = new AbortController();
              const v1460 = setTimeout(() => v1459.abort(), 30000);
              try {
                const v1466 = await fetch(v1406(v1458.url), {
                  signal: v1459.signal,
                  credentials: "omit",
                  redirect: "error"
                });
                if (!v1466.ok || !v1466.body) {
                  throw new Error("下载失败，请稍后重试");
                }
                const v1467 = v1466.body.getReader();
                const v1468 = [];
                let v1469 = 0;
                while (true) {
                  const {
                    done: v1473,
                    value: v1474
                  } = await v1467.read();
                  if (v1473) {
                    break;
                  }
                  v1469 += v1474.length;
                  if (v1469 > 10485760) {
                    await v1467.cancel();
                    throw new Error("音效超过 10 MB，请选择其他声音");
                  }
                  v1468.push(v1474);
                }
                if (!v1404()) {
                  return;
                }
                if (!v1469) {
                  throw new Error("音效文件为空");
                }
                const v1470 = new URL(v1458.url).pathname.split(".").pop().toLowerCase();
                const v1471 = {
                  mp3: "audio/mpeg",
                  wav: "audio/wav",
                  aac: "audio/aac",
                  m4a: "audio/mp4",
                  ogg: "audio/ogg"
                }[v1470];
                if (!v1471) {
                  throw new Error("不支持的音效格式");
                }
                const v1472 = new File(v1468, v1458.name + "." + v1470, {
                  type: v1471
                });
                v1254.closeSheet(v1389);
                v1269(v1387, v1472);
              } catch (v1475) {
                if (v1404()) {
                  v1395 = v1475.name === "AbortError" ? "下载超时，请重试" : v1475.message || "下载失败，请重试";
                }
              } finally {
                clearTimeout(v1460);
                v1398 = "";
                v1409();
              }
            });
            v1411();
          },
          onDismiss: () => {
            Object.assign(v1388, {
              page: v1391,
              category: v1392,
              query: v1393,
              data: v1394
            });
            v1399?.abort();
            v1405();
          }
        });
        v1411();
      }
      const v1273 = () => {
        if (v1256.hidden && v1260) {
          v1264();
        }
      };
      try {
        v1256.addEventListener("visibilitychange", v1273);
        v1253.audioSources = {
          open: v1268,
          openMarket: v1271,
          close: v1264,
          captureCurrent: (v1476, v1477) => v1260?.ticket === v1476 && v1260?.generation === v1477 && v1260.current() && !v1256.hidden
        };
      } catch (v1478) {
        v1256.removeEventListener?.("visibilitychange", v1273);
        throw v1478;
      }
    })();
  });
  if (window.LAZY_FEATURE.register(window.APP, "audio", () => {
    (() => {
      const v1479 = window.APP;
      const v1480 = window.API;
      const v1481 = window.UI;
      const v1482 = window.MODEL.esc;
      let v1483 = null;
      const v1484 = "#/audio";
      const v1485 = new Set();
      const v1486 = v1503 => String(v1479.vehicleToken?.(v1503) || v1480.token || "");
      const v1487 = v1504 => v1483 === v1504 && v1479.current(v1504.scope) && v1504.token === v1486(v1504.scope.vin) && v1481.sheetAlive(v1504.handle);
      const v1488 = v1505 => v1505.scope.vin + "\n" + v1505.token;
      const v1489 = v1506 => typeof v1506 === "string" && /^\d+$/.test(v1506) && /[1-9]/.test(v1506) || Number.isSafeInteger(v1506) && v1506 > 0;
      function v1490(v1507) {
        if (!v1507.player) {
          return;
        }
        v1507.player.pause();
        v1507.player.removeAttribute("src");
        v1507.player.load();
        v1507.player = null;
        v1507.playing = -1;
      }
      function v1491(v1508) {
        try {
          const v1509 = new URL(v1508.audioUrl);
          if (/^https?:$/.test(v1509.protocol) && !v1509.username && !v1509.password) {
            return v1509.href;
          } else {
            return "";
          }
        } catch {
          return "";
        }
      }
      async function v1492(v1510, v1511) {
        if (!v1487(v1510)) {
          return;
        }
        const v1512 = v1510.data?.audioList[v1511];
        const v1513 = v1512 && v1491(v1512);
        const v1514 = v1510.playing === v1511;
        v1490(v1510);
        if (v1514 || !v1513) {
          v1494(v1510);
          return;
        }
        const v1515 = v1510.player = new window.Audio(v1513);
        v1515.preload = "none";
        v1510.playing = v1511;
        const v1516 = v1517 => {
          if (!v1487(v1510) || v1510.player !== v1515) {
            return;
          }
          v1490(v1510);
          if (v1517) {
            v1481.toast(v1479.phone(), "暂时无法试听，请稍后重试");
          }
          v1494(v1510);
        };
        v1515.addEventListener("ended", () => v1516(false));
        v1515.addEventListener("error", () => v1516(true));
        v1494(v1510);
        try {
          await v1515.play();
        } catch {
          v1516(true);
        }
      }
      async function v1493(v1518, v1519 = true) {
        if (!v1487(v1518) || v1518.loading || v1485.has(v1488(v1518))) {
          return;
        }
        v1490(v1518);
        v1518.loading = true;
        if (v1519) {
          v1518.error = "";
        }
        v1494(v1518);
        try {
          const v1520 = await v1480.call("custom_audio_list", {
            vin: v1518.scope.vin,
            settingFlag: v1518.settingFlag
          }, {
            scope: v1518.scope.owner,
            isLatest: () => v1487(v1518)
          });
          if (!v1487(v1518) || v1520.stale) {
            return;
          }
          if (!v1520.ok) {
            throw new Error(v1520.message || "读取音效失败");
          }
          if (!Array.isArray(v1520.data?.audioList) || !Array.isArray(v1520.data?.actions)) {
            throw new Error("音效列表格式无法识别，请稍后刷新");
          }
          v1518.data = v1520.data;
        } catch (v1521) {
          if (v1487(v1518)) {
            v1518.data = null;
            v1518.error = v1521.message || "读取音效失败";
          }
        } finally {
          v1518.loading = false;
          if (v1487(v1518)) {
            v1494(v1518);
          }
        }
      }
      function v1494(v1522) {
        if (!v1487(v1522) || !v1522.root) {
          return;
        }
        const v1523 = v1522.loading || v1485.has(v1488(v1522));
        const v1524 = v1522.data?.audioList || [];
        const v1525 = v1522.error || (v1522.loading ? "正在读取音效…" : v1485.has(v1488(v1522)) ? "正在提交，请稍候…" : v1522.message || "");
        if (v1481.currentSheet() === v1522.handle) {
          const v1526 = v1522.root.ownerDocument.activeElement?.getAttribute("data-audio-preview");
          v1522.root.querySelector("[data-audio-status]").textContent = v1525;
          v1522.root.querySelector("[data-audio-count]").textContent = v1522.data ? "我的音效（" + v1524.length + "）" : "我的音效";
          v1522.root.querySelector("[data-audio-manage]").textContent = v1522.managing ? "完成" : "管理";
          v1522.root.querySelector("[data-audio-manage]").disabled = v1523 || !v1524.length;
          v1522.root.querySelector("[data-audio-actions]").hidden = !v1522.data?.actions.length;
          v1522.root.querySelector("[data-audio-actions]").innerHTML = (v1522.data?.actions || []).filter(v1527 => v1527 && typeof v1527 === "object").map(v1528 => "<button type=\"button\" class=\"audio-row audio-action\" data-audio-action>\n          <span class=\"audio-name\">" + v1482(v1528.name || "车辆动作") + "</span><span class=\"audio-value\">" + v1482(v1528.audioName || "未设置") + "</span>" + v1481.icon("right", 18) + "</button>").join("");
          v1522.root.querySelector("[data-audio-list]").innerHTML = v1524.map((v1529, v1530) => v1529 && typeof v1529 === "object" ? "<div class=\"audio-row\"><span class=\"audio-name\">" + v1482(v1529.showName || "未命名音效") + "</span>\n          " + (v1522.managing ? "<button type=\"button\" class=\"audio-link audio-delete\" data-audio-delete=\"" + v1530 + "\"" + (v1523 || !v1489(v1529.id) ? " disabled" : "") + " aria-label=\"删除" + v1482(v1529.showName || "未命名音效") + "\">删除</button>" : "<button type=\"button\" class=\"audio-link\" data-audio-preview=\"" + v1530 + "\"" + (v1523 || !v1491(v1529) ? " disabled" : "") + " aria-label=\"" + (v1522.playing === v1530 ? "停止" : "试听") + v1482(v1529.showName || "未命名音效") + "\">" + (v1522.playing === v1530 ? "停止" : "试听") + "</button>") + "</div>" : "").join("") || "<div class=\"audio-empty\">" + (v1522.loading ? "正在读取音效…" : v1522.data ? "还没有音效，添加一个专属声音吧" : "音效暂未加载，请点击右上角刷新") + "</div>";
          if (v1526 != null) {
            v1522.root.querySelector("[data-audio-preview=\"" + Number(v1526) + "\"]")?.focus({
              preventScroll: true
            });
          }
          for (const v1531 of v1522.root.querySelectorAll("[data-audio-refresh], [data-audio-add]")) {
            v1531.disabled = v1523;
          }
        }
        if (v1522.uploadRoot && v1481.sheetAlive(v1522.uploadHandle)) {
          v1522.uploadRoot.querySelector("[data-audio-status]").textContent = v1525;
          for (const v1532 of v1522.uploadRoot.querySelectorAll("input, [data-audio-upload]")) {
            v1532.disabled = v1523;
          }
        }
      }
      async function v1495(v1533, v1534) {
        if (!v1487(v1533) || v1533.loading || v1485.has(v1488(v1533)) || v1480.source !== "direct") {
          return;
        }
        const v1535 = v1488(v1533);
        v1485.add(v1535);
        v1533.error = "";
        v1533.message = "";
        v1494(v1533);
        try {
          await v1534();
          if (v1487(v1533)) {
            v1533.message = "请求已接受，请以刷新后的音效列表为准。";
          }
        } catch (v1536) {
          if (v1487(v1533)) {
            v1533.error = v1536.message || "操作结果未知，请刷新列表确认";
          }
        } finally {
          v1485.delete(v1535);
          if (v1483 && v1487(v1483) && v1488(v1483) === v1535) {
            await v1493(v1483, false);
          }
        }
      }
      function v1496(v1537) {
        if (!v1487(v1537)) {
          return;
        }
        if (!v1481.sheetAlive(v1537.uploadHandle)) {
          return;
        }
        const v1538 = v1537.uploadRoot.querySelector("[data-audio-file]").files?.[0] || v1537.uploadFile;
        const v1539 = v1537.uploadRoot.querySelector("[data-audio-name]").value.trim();
        if (!v1538 || !v1538.size || v1538.size > window.AUDIO_CODEC.MAX_BYTES || !/^audio\//i.test(v1538.type) && !/\.(wav|mp3|m4a|aac|ogg|flac)$/i.test(v1538.name)) {
          v1481.toast(v1479.phone(), "请选择不超过 200KB 的音频文件，请从“添加专属音效”导入并自动压缩");
          return;
        }
        if (!v1539 || Array.from(v1539).length > 30) {
          v1481.toast(v1479.phone(), "请填写 1–30 字的音效名称");
          return;
        }
        return v1495(v1537, async () => {
          const v1540 = v1480.ep("custom_audio_add");
          const v1541 = new FormData();
          v1541.append("file", v1538, v1538.name);
          v1541.append("vinNo", v1537.scope.vin);
          v1541.append("name", v1539);
          const v1542 = window.ZEEHO_SIGN.buildHeaders(v1540.tag, {}, "", "POST", v1537.token) || {};
          delete v1542["Content-Type"];
          delete v1542["content-type"];
          if (!v1487(v1537)) {
            return;
          }
          let v1543;
          try {
            const v1544 = await v1480.fetchDiag(v1540.id, window.ZEEHO_SIGN.baseFor(v1540.tag) + v1540.path, {
              method: "POST",
              headers: v1542,
              body: v1541,
              cache: "no-store"
            }, {
              scope: v1537.scope.owner,
              isLatest: () => v1487(v1537),
              bodySummary: {
                multipart: true,
                fileBytes: v1538.size,
                nameLength: v1539.length
              }
            });
            v1543 = JSON.parse(v1544.text);
            if (v1544.status < 200 || v1544.status >= 300) {
              throw new Error("HTTP");
            }
          } catch {
            throw new Error("上传结果未知，请刷新列表确认后再重试");
          }
          if (String(v1543?.code) !== "10000" || v1543.data === false) {
            throw new Error(v1543?.message || "服务器未接受上传");
          }
          if (v1487(v1537) && v1481.sheetAlive(v1537.uploadHandle)) {
            v1481.closeSheet(v1537.uploadHandle);
          }
        });
      }
      function v1497(v1545, v1546 = null) {
        if (!v1487(v1545) || v1545.loading || v1485.has(v1488(v1545))) {
          return;
        }
        v1490(v1545);
        v1545.error = "";
        v1545.message = "";
        v1545.uploadFile = v1546;
        v1545.uploadHandle = v1481.sheet(v1479.phone(), {
          key: "custom-audio-upload",
          title: "添加专属音效",
          closeMode: "current",
          className: "audio-upload",
          body: "<div class=\"audio-form\">\n        <label class=\"field\">音效名称<input type=\"text\" data-audio-name maxlength=\"60\" aria-label=\"音效名称\" placeholder=\"为声音起个名字，1–30 字\"></label>\n        <label class=\"audio-file\">选择音频文件<span class=\"muted\" data-audio-filename>点击选择，支持 MP3、WAV 等音频</span><input type=\"file\" data-audio-file accept=\"audio/*,.wav,.mp3,.m4a,.aac,.ogg,.flac\" aria-label=\"音频文件\"></label>\n        <p class=\"muted\" data-audio-size>文件不超过 200KB（200,000 字节）。较大文件请从“添加专属音效”导入并自动压缩。</p>\n        <button type=\"button\" class=\"btn block primary\" data-audio-upload>上传音效</button>\n        <div class=\"muted\" role=\"status\" aria-live=\"polite\" data-audio-status></div></div>",
          onMount: v1547 => {
            v1545.uploadRoot = v1547;
            if (v1546) {
              v1547.querySelector("[data-audio-name]").value = Array.from(v1546.name.replace(/\.[^.]+$/, "")).slice(0, 30).join("");
              v1547.querySelector("[data-audio-filename]").textContent = v1546.name;
              v1547.querySelector("[data-audio-size]").textContent = "文件大小 " + (v1546.size / 1000).toFixed(1) + "KB / 200KB";
            }
            v1547.querySelector("[data-audio-file]").addEventListener("change", v1548 => {
              const v1549 = v1547.querySelector("[data-audio-name]");
              v1547.querySelector("[data-audio-filename]").textContent = v1548.target.files?.[0]?.name || "点击选择，支持 MP3、WAV 等音频";
              const v1550 = v1548.target.files?.[0];
              v1547.querySelector("[data-audio-size]").textContent = v1550 ? "文件大小 " + (v1550.size / 1000).toFixed(1) + "KB / 200KB" + (v1550.size > window.AUDIO_CODEC.MAX_BYTES ? "，请重新导入并压缩" : "") : "文件不超过 200KB";
              if (!v1549.value) {
                v1549.value = Array.from((v1548.target.files?.[0]?.name || "").replace(/\.[^.]+$/, "")).slice(0, 30).join("");
              }
            });
            v1547.querySelector("[data-audio-upload]").addEventListener("click", () => v1496(v1545));
            v1494(v1545);
          },
          onDismiss: () => {
            v1545.uploadRoot = null;
            v1545.uploadFile = null;
          }
        });
      }
      function v1498(v1551, v1552) {
        if (!v1487(v1551) || !v1552 || !v1489(v1552.id) || v1485.has(v1488(v1551))) {
          return;
        }
        v1490(v1551);
        let v1553;
        v1553 = v1481.sheet(v1479.phone(), {
          key: "custom-audio-delete",
          title: "删除音效",
          closeMode: "current",
          center: true,
          body: "<p>删除「" + v1482(v1552.showName || "未命名音效") + "」？删除后无法恢复。</p>\n        <button type=\"button\" class=\"btn block primary\" data-audio-confirm>删除</button>",
          onMount: v1554 => v1554.querySelector("[data-audio-confirm]").addEventListener("click", async v1555 => {
            if (!v1481.sheetAlive(v1553) || !v1487(v1551)) {
              return;
            }
            v1555.currentTarget.disabled = true;
            await v1495(v1551, async () => {
              const v1556 = await v1480.call("custom_audio_delete", {
                vin: v1551.scope.vin
              }, {
                body: {
                  vinNo: v1551.scope.vin,
                  audioId: v1552.id,
                  cacheAudioId: ""
                },
                scope: v1551.scope.owner,
                isLatest: () => v1487(v1551) && v1481.sheetAlive(v1553)
              });
              if (v1556.stale) {
                return;
              }
              if (!v1556.ok || v1556.data === false) {
                throw new Error(v1556.message || "删除未被接受");
              }
            });
            if (v1481.sheetAlive(v1553)) {
              v1481.closeSheet(v1553);
            }
          })
        });
        v1551.confirmation = v1553;
      }
      function v1499(v1557, v1558, v1559 = "mine", v1560 = null) {
        const v1561 = v1557.navigation;
        v1481.bindPageTabs(v1558, v1559, v1561, {
          busy: v1560?.busy || (() => v1557.loading || v1485.has(v1488(v1557))),
          refresh: v1560?.refresh || (() => v1493(v1557)),
          switchSection: v1562 => {
            if (!v1487(v1557)) {
              return;
            }
            v1490(v1557);
            if (v1562 === "mine") {
              window.LAZY_FEATURE.peek(v1479, "audioSources")?.close();
              return;
            }
            v1479.audioSources.openMarket({
              current: () => v1487(v1557),
              marketState: v1557.marketState,
              ready: v1563 => v1497(v1557, v1563),
              mount: (v1564, v1565) => v1499(v1557, v1564, "market", v1565)
            });
          }
        });
        v1558.querySelector(".sheet-body").scrollTop = v1561.scroll[v1559];
      }
      function v1500() {
        window.LAZY_FEATURE.peek(v1479, "audioSources")?.close();
        if (!v1483) {
          return;
        }
        for (const v1566 of [v1483.confirmation, v1483.uploadHandle, v1483.handle]) {
          if (v1481.sheetAlive(v1566)) {
            v1481.closeSheet(v1566);
          }
        }
      }
      function v1501() {
        if (window.location?.hash === v1484) {
          if (!v1483) {
            v1502();
          }
        } else {
          v1500();
        }
      }
      function v1502() {
        const v1567 = v1479.context();
        if (!v1567.vin) {
          v1481.toast(v1479.phone(), "请先选择车辆");
          return;
        }
        if (v1480.source !== "direct" || !v1486(v1567.vin)) {
          v1481.toast(v1479.phone(), "请先登录真实账号");
          return;
        }
        const v1568 = v1479.state.data.settings?.caps?.find(v1572 => v1572.functionCode === "CUSTOM_AUDIO");
        if (!v1568 || v1568.isSupport === false || v1568.isSupportSetting === false) {
          v1481.toast(v1479.phone(), "当前车辆未开放自定义音效");
          return;
        }
        if (v1483 && v1487(v1483)) {
          return;
        }
        v1500();
        const v1569 = window.location;
        const v1570 = window.history;
        if (v1569 && v1569.hash !== v1484) {
          v1570.pushState({
            ...v1570.state,
            panelAudio: true
          }, "", v1484);
        }
        const v1571 = v1483 = {
          scope: v1567,
          token: v1486(v1567.vin),
          settingFlag: String(v1568.settingFlag ?? "1"),
          data: null,
          loading: false,
          error: "",
          message: "",
          root: null,
          handle: null,
          playing: -1,
          player: null,
          managing: false,
          marketState: {}
        };
        v1571.navigation = {
          id: "audio",
          label: "音效页面",
          items: [["mine", "我的音效"], ["market", "音效市场"]],
          scroll: {
            mine: 0,
            market: 0
          },
          transition: null,
          preview: v1573 => v1571.navigation.snapshots?.[v1573] || {
            html: "<p class=\"audio-empty\">正在加载音效…</p>"
          }
        };
        v1571.handle = v1481.sheet(v1479.phone(), {
          key: "custom-audio",
          title: "自定义音效",
          closeMode: "current",
          full: true,
          page: true,
          className: "audio-page",
          headActions: "<button type=\"button\" class=\"iconbtn\" data-audio-refresh aria-label=\"刷新音效列表\" title=\"刷新\">" + v1481.icon("refresh", 20) + "</button>",
          body: "<div class=\"audio-content\"><div class=\"audio-card\" data-audio-actions hidden></div>\n        <div class=\"audio-section-head\"><h2 data-audio-count>我的音效</h2><button type=\"button\" class=\"audio-link\" data-audio-manage>管理</button></div>\n        <div class=\"audio-card\" data-audio-list></div>\n        <button type=\"button\" class=\"audio-card audio-add\" data-audio-add><span aria-hidden=\"true\">＋</span>添加你的专属音效</button>\n        <p class=\"audio-hint\">动作音效请在官方 App 中配置</p>\n        <div class=\"audio-status\" role=\"status\" aria-live=\"polite\" data-audio-status></div></div>",
          onMount: v1574 => {
            v1571.root = v1574;
            v1494(v1571);
            v1499(v1571, v1574);
            v1574.querySelector("[data-audio-add]").addEventListener("click", () => {
              v1490(v1571);
              v1479.audioSources.open({
                current: () => v1487(v1571),
                ready: v1575 => v1497(v1571, v1575)
              });
            });
            v1574.querySelector("[data-audio-refresh]").addEventListener("click", () => v1493(v1571));
            v1574.querySelector("[data-audio-manage]").addEventListener("click", () => {
              if (!v1487(v1571)) {
                return;
              }
              v1490(v1571);
              v1571.managing = !v1571.managing;
              v1494(v1571);
            });
            v1574.querySelector("[data-audio-actions]").addEventListener("click", v1576 => {
              if (v1487(v1571) && v1576.target.closest("[data-audio-action]")) {
                v1481.toast(v1479.phone(), "请在官方 App 中配置车辆动作音效");
              }
            });
            v1574.querySelector("[data-audio-list]").addEventListener("click", v1577 => {
              const v1578 = v1577.target.closest("[data-audio-delete]");
              if (v1578 && !v1578.disabled) {
                v1498(v1571, v1571.data?.audioList[Number(v1578.dataset.audioDelete)]);
              }
              const v1579 = v1577.target.closest("[data-audio-preview]");
              if (v1579 && !v1579.disabled) {
                v1492(v1571, Number(v1579.dataset.audioPreview));
              }
            });
          },
          onDismiss: () => {
            window.LAZY_FEATURE.peek(v1479, "audioSources")?.close();
            v1490(v1571);
            if (v1483 === v1571) {
              v1483 = null;
            }
            if (v1569?.hash === v1484) {
              if (v1570.state?.panelAudio) {
                Promise.resolve().then(() => {
                  if (!v1483 && v1569.hash === v1484) {
                    v1570.back();
                  }
                });
              } else {
                v1570.replaceState(v1570.state, "", v1569.pathname + v1569.search);
              }
            }
          }
        });
        return v1493(v1571);
      }
      v1479.audio = {
        open: v1502,
        syncRoute: v1501,
        resetContext: v1500
      };
    })();
  })) {
    const syncAudioRoute = () => {
      const v1580 = window.APP;
      const v1581 = window.LAZY_FEATURE.peek(v1580, "audio");
      if (v1581) {
        v1581.syncRoute?.();
        return;
      }
      if (window.location?.hash !== "#/audio" || !window.API?.ready || window.ACC?.ready && !window.ACC.ready() || !v1580?.state?.data?.settings) {
        return;
      }
      v1580.audio.syncRoute();
    };
    window.addEventListener?.("popstate", syncAudioRoute);
    window.addEventListener?.("hashchange", syncAudioRoute);
  }
  (v1582 => {
    if (window.LAZY_FEATURE) {
      window.LAZY_FEATURE.register(window.APP, "cast", v1582);
    } else {
      v1582();
    }
  })(() => {
    const v1583 = window.APP;
    const v1584 = v1583.state;
    const v1585 = v1583.$;
    const v1586 = v1583.phone;
    const v1587 = window.MODEL;
    const v1588 = window.UI;
    const v1589 = v1587.esc;
    const v1590 = window.CAST;
    const v1591 = {
      performance: "性能 · 30fps · 2.5M",
      "bitrate-safe": "稳码率 · 30fps · 动态码率",
      compatibility: "兼容 · ≤24fps · Baseline",
      balanced: "均衡 · 20fps · 1.5M",
      "resolution-safe": "低分辨率 · ≤800×480 · 20fps",
      "decoder-safe": "解码器保底 · ≤800×480 · 15fps"
    };
    const v1592 = {
      idle: {
        text: "待连接",
        tone: ""
      },
      provisioning: {
        text: "车机联网中",
        tone: "info"
      },
      handshaking: {
        text: "握手中…",
        tone: "info"
      },
      ready: {
        text: "等待车机开始",
        tone: "info"
      },
      casting: {
        text: "投屏中",
        tone: "ok"
      },
      adapting: {
        text: "降档重试",
        tone: "warn"
      },
      stopping: {
        text: "正在停止",
        tone: "info"
      },
      failed: {
        text: "失败",
        tone: "bad"
      },
      unavailable: {
        text: "更新 App 后使用",
        tone: "warn"
      }
    };
    const v1593 = {
      inited: false,
      client: null,
      profile: null,
      stream: "",
      tickTimer: null,
      scan: null,
      lastError: "",
      tier: "auto",
      format: "traditional",
      advanced: false,
      starting: false,
      pendingStart: null,
      handle: null,
      restoreSettings: null,
      root: null,
      scanMessage: "",
      gen: 0,
      scanGen: 0,
      profileRequest: null,
      lastBody: null
    };
    const v1594 = () => window.PLATFORM?.preview?.() === true;
    const v1595 = () => v1583.featuresEnabled();
    const v1596 = () => !v1594() && v1595() && Boolean(v1590?.detectCastBridge(window));
    const v1597 = () => v1583.isIOS?.() === true && !!v1593.profile?.ssid && window.NativeShell?.has("cast.start") === true && window.IOSBR?.has("wifi.join") === true;
    const v1598 = () => v1583.isIOS?.() === true ? !!v1593.profile?.ssid && (v1593.client?.state.wifiConnected || v1597()) : !!v1593.client?.state.wifiConnected;
    const v1599 = (v1629, v1630 = v1593.gen) => v1595() && v1629 && v1593.handle === v1629 && v1630 === v1593.gen && v1588.currentSheet() === v1629 && document.hidden !== true;
    function v1600() {
      if (!v1595()) {
        return false;
      }
      if (v1596()) {
        return true;
      }
      v1588.toast(v1586(), v1583.inShell() ? "更新 App 后使用车机投屏" : "浏览器不支持录屏和车机直连，请在 App 中开始投屏", 3000);
      return false;
    }
    function v1601() {
      if (v1593.client) {
        return v1593.client;
      }
      const v1631 = v1594() ? null : v1590.detectCastBridge(window);
      v1593.client = v1590.createCastClient({
        bridge: v1631,
        emit: v1632 => {
          if (v1632?.type === "error") {
            v1593.pendingStart = null;
            v1611(v1593.handle);
          }
          if (v1632 && v1632.type === "phase") {
            v1602(v1632);
          } else if (v1632?.type === "status" && v1593.handle && document.hidden !== true) {
            v1616();
            v1611(v1593.handle);
            v1603();
          }
        }
      });
      v1590.installCastEventSink(v1593.client, window);
      v1593.inited = true;
      if (v1631) {
        Promise.resolve(v1593.client.refresh()).then(v1633 => {
          v1593.profile = v1593.client.state.profile || v1593.client.state.savedProfile;
          if (v1633 && v1633.frameFormat === "extended") {
            v1593.format = "extended";
          }
          v1611(v1593.handle);
        });
      } else {
        v1593.client.applyStatus({
          phase: "unavailable",
          reason: "native_bridge_missing"
        });
      }
      return v1593.client;
    }
    function v1602(v1634) {
      const v1635 = String(v1634?.payload?.to || "");
      if (v1635 === "failed") {
        const v1636 = String(v1634?.payload?.reason || "");
        v1593.lastError = v1636 ? v1590.castErrorText(v1636, v1636) : "投屏失败";
      } else if (v1635 === "casting" || v1635 === "idle" || v1635 === "ready") {
        v1593.lastError = "";
      }
      if (v1593.handle) {
        v1611(v1593.handle);
      }
      v1603();
    }
    function v1603() {
      const v1637 = v1593.client ? v1593.client.phase : "idle";
      const v1638 = v1593.handle;
      const v1639 = v1599(v1638) && v1637 !== "unavailable";
      if (v1639 && !v1593.tickTimer) {
        v1593.tickTimer = setInterval(async () => {
          if (!v1599(v1638)) {
            v1622();
            return v1604();
          }
          if (!v1593.client) {
            return;
          }
          await v1593.client.refresh();
          if (!v1599(v1638)) {
            return;
          }
          v1616();
          v1611(v1638);
        }, 2000);
      } else if (!v1639 && v1593.tickTimer) {
        v1604();
      }
    }
    function v1604() {
      if (v1593.tickTimer) {
        clearInterval(v1593.tickTimer);
      }
      v1593.tickTimer = null;
    }
    function v1605() {
      const v1640 = v1584.data?.settings?.groups || [];
      for (const v1641 of v1640) {
        for (const v1642 of v1641.rows || []) {
          if (v1642.code === "MOTOPLAY" || v1642.key === "motoPlay" || /motoPlay/i.test(String(v1642.code || ""))) {
            const v1643 = v1642.value;
            if (v1643 === undefined || v1643 === null || v1643 === "") {
              return null;
            }
            return v1643 !== false && v1643 !== "false" && v1643 !== "0" && v1643 !== 0;
          }
        }
      }
      return null;
    }
    function v1606() {
      const v1644 = v1593.client ? v1593.client.state : null;
      if (!v1644) {
        return "";
      }
      const v1645 = v1644.stats || {};
      if (!v1645.sentFrames) {
        return "";
      }
      return v1645.sentFrames + " 帧 · " + (v1645.fps || 0) + " fps · " + v1590.formatCastBytes(v1645.sentBytes) + " · " + v1590.formatCastDuration(v1644.startedAt ? Date.now() - v1644.startedAt : 0);
    }
    function v1607() {
      if (!v1593.profile) {
        return "";
      }
      const v1646 = v1590.summarizePairing(v1593.profile) || [];
      return v1646.map(v1647 => v1588.kv(v1647.key, v1647.value || "—", {
        mono: true
      })).join("");
    }
    async function v1608(v1648 = v1593.handle) {
      const v1649 = window.API;
      if (!v1595() || !v1599(v1648) || v1593.profile?.ssid || v1593.profileRequest || v1649?.source !== "direct" || !v1584.vin || v1593.client?.state.sessionActive || v1593.client?.state.wifiConnected && v1583.isIOS?.() !== true) {
        return;
      }
      const v1650 = v1583.context();
      const v1651 = v1593.gen;
      const v1652 = {};
      const v1653 = () => v1593.profileRequest === v1652 && v1599(v1648, v1651) && v1583.current(v1650);
      v1593.profileRequest = v1652;
      v1593.lastError = "";
      v1611(v1648);
      try {
        let v1654 = v1584.data?.home?.raw;
        let v1655 = v1583.isIOS?.() === true ? v1590.parsePairingPayload(v1654?.vinNo === v1650.vin ? v1654.wifiAddress : "", {
          requireMac: false
        }) : v1590.parsePairingPayload(v1654?.vinNo === v1650.vin ? v1654.wifiAddress : "");
        if (!v1655.ok) {
          const v1657 = await v1649.call("vehicle_home", {
            vin: v1650.vin
          }, {
            isLatest: v1653
          });
          if (!v1653() || v1657?.stale) {
            return;
          }
          if (!v1657?.ok) {
            throw new Error("vehicle_profile_unavailable");
          }
          v1654 = v1657.data;
          v1655 = v1583.isIOS?.() === true ? v1590.parsePairingPayload(v1654?.vinNo === v1650.vin ? v1654.wifiAddress : "", {
            requireMac: false
          }) : v1590.parsePairingPayload(v1654?.vinNo === v1650.vin ? v1654.wifiAddress : "");
        }
        if (!v1653() || v1593.client.state.sessionActive) {
          return;
        }
        if (!v1655.ok) {
          v1593.lastError = "当前车辆未提供可用的投屏资料，请在车机投屏页扫码或粘贴二维码。";
          return;
        }
        if (!v1596()) {
          v1593.profile = v1655.profile;
          v1593.client.setProfile(v1655.profile);
          return;
        }
        if (v1583.isIOS?.()) {
          await v1583.syncIOSSession?.();
        }
        if (!v1653()) {
          return;
        }
        const v1656 = await v1593.client.pair(v1655.profile);
        if (!v1653()) {
          return;
        }
        if (v1656.ok) {
          v1593.profile = v1655.profile;
        } else {
          v1593.lastError = v1590.castErrorText(v1656.error);
        }
      } catch {
        if (v1653() && !v1593.client.state.wifiConnected) {
          v1593.lastError = "读取车辆投屏资料失败，请重试，或使用扫码、相册选图、粘贴内容。";
        }
      } finally {
        if (v1593.profileRequest === v1652) {
          v1593.profileRequest = null;
          if (v1599(v1648)) {
            v1611(v1648);
          }
        }
      }
    }
    function v1609() {
      const v1658 = v1593.client ? v1593.client.phase : "idle";
      if (!v1596()) {
        if (v1583.inShell()) {
          return "更新 App 后使用车机投屏。";
        } else {
          return "浏览器可读取投屏资料和解析二维码；连接车机和录屏需要 App。";
        }
      }
      const v1659 = v1593.client?.state.environmentError;
      const v1660 = v1583.isIOS?.() === true && v1659 === "wifi_required" && v1597();
      if (v1659 && !v1660 && v1658 !== "casting" && v1658 !== "adapting") {
        const v1662 = v1590.castErrorText(v1659, "");
        if (v1662) {
          if (v1659 === "wifi_permission_denied") {
            return v1662 + "请在系统设置里允许后重进本页。";
          }
          if (v1659 === "ssid_unknown") {
            return v1662 + "（设置 > 隐私与安全性 > 定位服务）";
          }
          return v1662;
        }
      }
      if (v1660) {
        return "尚未加入车机热点 " + v1593.profile.ssid + "。点「连接车机 Wi-Fi 并投屏」后，iOS 会请求加入并验证目标路由。";
      }
      const v1661 = v1605();
      if (v1661 === false) {
        return "车机的「投屏（Motoplay）」是关着的。先去车辆设置里把它打开，车机才会接受投屏。";
      }
      if (v1593.pendingStart || v1593.client?.state.projectionPending) {
        return "请允许系统录制屏幕，授权后会自动连接车机。可点取消连接结束本次操作。";
      }
      if (v1593.lastError) {
        return v1593.lastError;
      }
      if (v1658 === "provisioning") {
        return "正在连接车机网络，请保持车机停在投屏页。";
      }
      if (v1658 === "handshaking") {
        return "正在验证车机投屏服务，请稍候。";
      }
      if (v1658 === "ready") {
        return "车机已连接，正在等待车机请求画面。";
      }
      if (v1658 === "adapting") {
        return "连接提前中断，正在自动降低画质并重试。";
      }
      if (v1658 === "stopping") {
        return "正在释放录屏和连接，请稍候。";
      }
      if (v1658 === "casting") {
        return "正在投屏。返回面板或关闭此页仍可继续，可在本页或通知栏停止。";
      }
      if (["idle", "failed"].includes(v1658) && !v1593.client?.state.wifiConnected && !v1597() && !v1660) {
        return "请先连接车机 Wi-Fi，连接后才能开始投屏。";
      }
      if (v1593.client?.state.wifiConnected && !v1593.profile) {
        return "已连接 Wi-Fi。开始后仍会验证车机投屏服务，请让车机停在投屏页。";
      }
      if (v1583.isIOS?.() === true && v1593.profile && !v1593.client?.state.wifiConnected) {
        return "准备连接车机热点 " + v1593.profile.ssid + "；iOS 将在开始后请求加入并验证目标路由。";
      }
      if (v1583.isIOS?.() === true && v1593.client?.state.wifiConnected && !v1593.profile) {
        return "当前已连接 Wi-Fi，但尚无已确认的车机热点资料；请先读取车辆资料或扫码，避免把画面发往其它网络。";
      }
      if (!v1593.profile && v1593.client?.state.wifiConnected) {
        return "已连接 Wi-Fi，可直接开始投屏；开始后仍须验证车机投屏服务。";
      }
      if (v1593.profileRequest) {
        return "正在读取当前车辆的投屏资料，无需重复扫码…";
      }
      if (v1658 === "failed") {
        return "上一次投屏失败了。换个档位或重扫车机上的二维码再试。";
      }
      if (!v1593.profile) {
        return "可直接读取当前车辆的投屏资料；没有资料时再扫码、选图或粘贴。蓝牙已连接不代表 Wi-Fi Direct 已建网。";
      }
      return "车机那边要先停在投屏页。点开始后手机会弹屏幕录制授权，允许了才会出画面。";
    }
    function v1610(v1663 = v1593.handle) {
      const v1664 = v1593.client ? v1593.client.phase : "idle";
      const v1665 = v1592[v1664] || {
        text: v1664,
        tone: ""
      };
      const v1666 = v1596();
      const v1667 = Boolean(v1593.profile);
      const v1668 = Boolean(v1593.client?.state.sessionActive);
      const v1669 = v1668 || v1593.client?.state.projectionPending || v1593.starting || Boolean(v1593.pendingStart);
      const v1670 = Boolean(v1593.client?.state.environmentError);
      const v1671 = v1666 && !v1670 && v1598() && !v1669 && v1605() !== false && (v1664 === "idle" || v1664 === "failed");
      const v1672 = v1666 && (v1593.pendingStart || v1668 || v1593.client?.state.projectionReady || v1593.client?.state.projectionPending || v1593.starting || !["idle", "unavailable"].includes(v1664));
      const v1673 = Boolean(v1593.scan);
      const v1674 = "<option value=\"auto\"" + (v1593.tier === "auto" ? " selected" : "") + ">自动（推荐）</option>" + v1590.CAST_TIERS.map(v1679 => "<option value=\"" + v1589(v1679) + "\"" + (v1679 === v1593.tier ? " selected" : "") + ">" + v1589(v1591[v1679] || v1679) + "</option>").join("");
      const v1675 = "<option value=\"traditional\"" + (v1593.format === "traditional" ? " selected" : "") + ">传统（每帧带长度头）</option>\n      <option value=\"extended\"" + (v1593.format === "extended" ? " selected" : "") + ">扩展（额外带帧序号）</option>";
      const v1676 = v1593.pendingStart || v1593.client?.state.projectionPending ? "等待录屏授权…" : v1668 ? v1665.text : v1664 === "failed" ? "重新连接" : v1593.client?.state.projectionReady ? "继续投屏" : v1583.isIOS?.() && !v1593.client?.state.wifiConnected && v1597() ? "连接车机 Wi-Fi 并投屏" : "开始投屏";
      const v1677 = [[v1593.client?.state.wifiConnected, v1583.isIOS?.() === true && v1593.profile ? "准备加入 " + v1593.profile.ssid : "连接车机 Wi-Fi"], [v1593.client?.state.projectionReady || v1668, "允许录屏"], [v1664 === "casting", "车机显示画面"]];
      const v1678 = "<div class=\"cast-status-card\" role=\"status\" aria-live=\"polite\">\n        " + v1588.chip(v1665.text, ("" + v1665.tone + (v1664 === "casting" ? " pulse" : "")).trim()) + "\n        <div class=\"card-sub\">" + v1589(v1609()) + "</div>\n      </div>\n      <ol class=\"cast-steps\" aria-label=\"投屏连接步骤\">" + v1677.map(([v1680, v1681]) => "<li" + (v1680 ? " class=\"done\"" : "") + ">" + v1589(v1681) + (v1680 ? " ✓" : "") + "</li>").join("") + "</ol>\n      <div class=\"cast-stream mono tnum\" data-cast-stream hidden></div>\n\n      <div class=\"cast-actions-stack\">\n        <button class=\"btn block primary\" type=\"button\" data-act=\"start\"" + (v1671 ? "" : " disabled") + ">" + v1589(v1676) + "</button>\n        " + (v1672 ? "<button class=\"btn block\" type=\"button\" data-act=\"stop\">" + (v1664 === "casting" ? "停止投屏" : "取消连接") + "</button>" : "") + "\n      </div>\n\n      <details class=\"cast-options\" data-act=\"advanced\"" + (v1593.advanced ? " open" : "") + ">\n        <summary>连接与画质设置</summary>\n        " + (v1593.profile ? "<div class=\"card-sub mt12\">已保存的车机</div><div class=\"cast-profile\">" + v1607() + "</div>" : "") + "\n        <div class=\"card-sub mt12\">当前画质：" + (v1593.tier === "auto" ? "自动（推荐）" : v1589(v1591[v1593.tier] || v1593.tier)) + "</div>\n        <div class=\"field mt12\">\n          <label>画质档位</label>\n          <select data-act=\"tier\"" + (v1666 && !v1669 ? "" : " disabled") + ">" + v1674 + "</select>\n        </div>\n        <div class=\"field\">\n          <label>帧格式</label>\n          <select data-act=\"format\"" + (v1666 && !v1669 ? "" : " disabled") + ">" + v1675 + "</select>\n        </div>\n        <div class=\"cast-scan-row\">\n          " + (!v1667 ? "<button class=\"btn sm\" type=\"button\" data-act=\"vehicle\"" + (v1593.profileRequest || v1669 ? " disabled" : "") + ">读取车辆资料</button>" : "") + "\n          <button class=\"btn sm\" type=\"button\" data-act=\"scan\"" + (v1669 ? " disabled" : "") + ">" + v1588.icon("camera", 16) + "<span>扫码</span></button>\n          <button class=\"btn sm\" type=\"button\" data-act=\"pick\"" + (v1669 ? " disabled" : "") + ">" + v1588.icon("box", 16) + "<span>相册选图</span></button>\n          <button class=\"btn sm\" type=\"button\" data-act=\"paste\"" + (v1669 ? " disabled" : "") + ">" + v1588.icon("copy", 16) + "<span>粘贴内容</span></button>\n        </div>\n        <input data-act=\"file\" type=\"file\" accept=\"image/*\" hidden>\n        <div class=\"cast-actions\">\n          <button class=\"btn sm ghost\" type=\"button\" data-act=\"diag\">诊断信息</button>\n          <button class=\"btn sm ghost\" type=\"button\" data-act=\"forget\"" + (v1593.profile && !v1669 ? "" : " disabled") + ">忘掉这个车机</button>\n        </div>\n      </details>\n\n      <div class=\"cast-camera-preview\" data-act=\"scan-preview\"" + (v1673 ? "" : " hidden") + ">\n        <div class=\"cast-camera-frame\" data-act=\"scan-frame\">\n          <div class=\"cast-camera-overlay\" aria-hidden=\"true\"></div>\n        </div>\n        <div class=\"card-sub cast-camera-status\" data-act=\"scan-status\" role=\"status\" aria-live=\"polite\">" + v1589(v1593.scanMessage) + "</div>\n      </div>\n      " + (!v1673 && v1593.scanMessage ? "<div class=\"card-sub cast-camera-status\" role=\"status\">" + v1589(v1593.scanMessage) + "</div>" : "");
      return {
        key: "cast",
        full: true,
        title: "车机投屏",
        sub: v1596() ? "Wi-Fi Direct 直连 · 本机编码" : v1583.inShell() ? "更新 App 后使用" : "二维码工具 · 连接车机需要 App",
        className: "cast-page",
        closeMode: "current",
        body: v1678,
        onMount: v1682 => v1613(v1682, v1663 || v1588.currentSheet("cast")),
        onDismiss: () => {
          if (v1663 && v1593.handle !== v1663) {
            return;
          }
          const v1683 = v1593.starting || !!v1593.pendingStart;
          v1593.gen++;
          v1593.pendingStart = null;
          v1593.profileRequest = null;
          v1593.lastBody = null;
          v1622();
          v1604();
          v1593.handle = v1593.root = null;
          if (v1593.client && !v1593.client.state.sessionActive && (v1683 || v1593.client.state.projectionPending || v1593.client.state.projectionReady)) {
            v1593.client.stop();
          }
          const v1684 = v1593.restoreSettings;
          v1593.restoreSettings = null;
          v1684?.();
        }
      };
    }
    function v1611(v1685 = v1593.handle) {
      if (!v1685 || v1593.handle !== v1685 || !v1588.sheetAlive(v1685)) {
        return;
      }
      v1593.profile = v1593.client?.state.profile || v1593.client?.state.savedProfile || v1593.profile;
      if (!v1599(v1685)) {
        v1622();
      }
      const v1686 = v1610(v1685);
      const v1687 = v1686.sub + "\0" + v1686.body;
      if (v1593.lastBody === v1687) {
        v1612();
        return;
      }
      v1593.lastBody = v1687;
      v1588.updateSheet(v1685, v1686);
      v1612();
    }
    function v1612(v1688 = v1593.root) {
      const v1689 = v1688?.querySelector?.("[data-cast-stream]");
      if (!v1689) {
        return;
      }
      v1593.stream = v1606();
      if (v1689.textContent !== v1593.stream) {
        v1689.textContent = v1593.stream;
      }
      v1689.hidden = !v1593.stream;
    }
    function v1613(v1690, v1691) {
      const v1692 = v1690?.querySelector ? v1690 : null;
      if (!v1692 || !v1691 || v1588.currentSheet() !== v1691) {
        return;
      }
      v1593.handle = v1691;
      v1593.root = v1692;
      v1612(v1692);
      v1620();
      v1603();
      v1692.querySelector("[data-act=\"advanced\"]")?.addEventListener("toggle", v1695 => {
        v1593.advanced = v1695.target.open;
      });
      const v1693 = v1692.querySelector("[data-act=\"tier\"]");
      v1693?.addEventListener("change", () => {
        v1593.tier = v1693.value;
      });
      const v1694 = v1692.querySelector("[data-act=\"format\"]");
      v1694?.addEventListener("change", () => {
        v1593.format = v1694.value;
      });
      v1692.querySelector("[data-act=\"start\"]")?.addEventListener("click", () => {
        if (v1599(v1691)) {
          v1615();
        }
      });
      v1692.querySelector("[data-act=\"vehicle\"]")?.addEventListener("click", () => v1608(v1691));
      v1692.querySelector("[data-act=\"stop\"]")?.addEventListener("click", () => {
        if (v1599(v1691)) {
          v1617();
        }
      });
      v1692.querySelector("[data-act=\"scan\"]")?.addEventListener("click", () => v1621(v1691));
      v1692.querySelector("[data-act=\"pick\"]")?.addEventListener("click", () => {
        if (!v1595() || !v1599(v1691)) {
          return;
        }
        v1622();
        v1593.gen++;
        const v1696 = v1692.querySelector("[data-act=\"file\"]");
        if (v1696) {
          v1696.value = "";
          v1696.click();
        }
      });
      v1692.querySelector("[data-act=\"file\"]")?.addEventListener("change", v1697 => {
        const v1698 = v1697.target?.files?.[0];
        if (v1698 && v1599(v1691)) {
          v1625(v1698, v1691);
        }
      });
      v1692.querySelector("[data-act=\"paste\"]")?.addEventListener("click", () => v1626(v1691));
      v1692.querySelector("[data-act=\"diag\"]")?.addEventListener("click", () => v1628(v1691));
      v1692.querySelector("[data-act=\"forget\"]")?.addEventListener("click", async () => {
        if (!v1595() || !v1599(v1691)) {
          return;
        }
        v1593.gen++;
        v1622();
        const v1699 = v1593.gen;
        const v1700 = await v1601().forgetProfile();
        if (!v1599(v1691, v1699)) {
          return;
        }
        if (v1700.ok) {
          v1593.profile = null;
        }
        v1588.toast(v1586(), v1700.ok ? "已忘掉这个车机" : v1590.castErrorText(v1700.error), 3000);
        v1611();
      });
    }
    async function v1614() {
      if (!v1595()) {
        return window.PLATFORM.unavailable("车机投屏");
      }
      const v1701 = v1583.context();
      if (v1583.isIOS?.() && !v1594()) {
        await v1583.syncIOSSession?.();
        await window.NativeShell?.prime("cast.capabilities");
        if (!v1583.current(v1701)) {
          return false;
        }
        if (v1593.client && !v1593.client.isAvailable() && v1596()) {
          v1593.client = null;
        }
      }
      if (v1594()) {
        return v1588.sheet(v1586(), {
          key: "cast",
          full: true,
          title: "车机投屏",
          sub: "UI 测试预览",
          className: "cast-page",
          body: "<div class=\"card-sub\">" + v1589(window.PLATFORM.message("Wi-Fi Direct / 录屏")) + "</div>\n        <div class=\"cast-actions-stack\"><button class=\"btn block primary\" data-cast-preview>开始投屏</button><button class=\"btn block\" data-cast-preview>停止投屏</button></div>\n        <details class=\"cast-options\" open><summary>连接与画质设置</summary>\n          <div class=\"field\"><label>画质档位</label><select>" + Object.entries(v1591).map(([v1703, v1704]) => "<option value=\"" + v1703 + "\">" + v1704 + "</option>").join("") + "</select></div>\n          <div class=\"field\"><label>帧格式</label><select><option>传统格式</option><option>扩展格式</option></select></div>\n          <div class=\"cast-scan-row\">" + ["读取车辆资料", "扫码", "相册选图", "粘贴内容", "Wi-Fi Direct", "录屏授权", "诊断信息", "忘掉这个车机"].map(v1705 => "<button class=\"btn sm\" data-cast-preview>" + v1705 + "</button>").join("") + "</div></details>",
          onMount(v1706) {
            v1706.querySelectorAll("[data-cast-preview]").forEach(v1707 => v1707.addEventListener("click", () => window.PLATFORM.unavailable("车机投屏")));
          }
        });
      }
      v1601().refresh();
      v1593.profile = v1593.client.state.profile || v1593.client.state.savedProfile || v1593.profile;
      if (!v1593.handle || !v1588.sheetAlive(v1593.handle)) {
        v1593.gen++;
        v1593.scanMessage = "";
        v1593.restoreSettings = v1583.settings.captureMeterReturn();
      }
      const v1702 = v1610(v1593.handle);
      v1593.lastBody = v1702.sub + "\0" + v1702.body;
      v1593.handle = v1588.sheet(v1586(), v1702);
      v1612();
      v1603();
      v1608(v1593.handle);
      return v1593.client;
    }
    async function v1615() {
      if (v1594()) {
        return window.PLATFORM.unavailable("录屏 / 车机投屏");
      }
      if (!v1600() || !v1599(v1593.handle)) {
        return null;
      }
      v1622();
      if (v1593.starting || v1593.pendingStart || v1593.client?.state.projectionPending || v1593.client?.state.sessionActive) {
        return;
      }
      const v1708 = v1583.context();
      if (v1583.isIOS?.()) {
        await v1583.syncIOSSession?.();
      }
      if (!v1583.current(v1708) || !v1599(v1593.handle)) {
        return null;
      }
      const v1709 = ++v1593.gen;
      const v1710 = v1593.handle;
      const v1711 = v1601();
      v1593.starting = true;
      await v1711.refresh();
      if (!v1599(v1710, v1709) || !v1583.current(v1708)) {
        v1593.starting = false;
        return null;
      }
      if (!v1598()) {
        v1593.starting = false;
        v1611();
        return v1588.toast(v1586(), "请先连接车机 Wi-Fi，连接后才能开始投屏。", 2600);
      }
      if (v1605() === false) {
        v1593.starting = false;
        return v1588.toast(v1586(), v1609(), 3000);
      }
      const v1712 = await v1711.start({
        tier: v1593.tier,
        frameFormat: v1593.format,
        captureSource: "screen"
      });
      v1593.starting = false;
      if (!v1599(v1710, v1709) || !v1583.current(v1708)) {
        return v1712;
      }
      if (v1712 && v1712.ok) {
        v1593.lastError = "";
        v1588.toast(v1586(), "正在连接车机…", 2600);
        v1603();
        return v1611();
      }
      const v1713 = String(v1712?.error || v1712?.message || "");
      if (v1713 === "projection_permission_required" || v1713 === "projection_unavailable") {
        v1593.pendingStart = {
          handle: v1593.handle,
          gen: v1593.gen,
          at: Date.now()
        };
        const v1714 = await v1711.requestProjection();
        if (!v1599(v1710, v1709) || !v1583.current(v1708)) {
          return v1714;
        }
        if (v1583.isIOS?.() && v1714?.data?.requiresStart === true && v1714.data.requested !== true) {
          v1593.pendingStart = null;
          v1593.starting = false;
          v1593.lastError = v1590.castErrorText(v1713 || "projection_unavailable");
          v1588.toast(v1586(), v1593.lastError, 4200);
        } else if (v1714 && v1714.ok) {
          v1588.toast(v1586(), "允许系统录屏后将自动连接车机", 4200);
        } else {
          v1593.pendingStart = null;
          v1588.toast(v1586(), v1590.castErrorText(v1714?.error || "projection_unavailable"), 4200);
        }
      } else {
        v1593.lastError = v1713 ? v1590.castErrorText(v1713, v1713) : "投屏启动失败";
        v1588.toast(v1586(), v1593.lastError, 3600);
      }
      v1611();
      v1603();
    }
    function v1616() {
      const v1715 = v1593.pendingStart;
      if (!v1715) {
        return;
      }
      if (v1715.gen !== v1593.gen || v1715.handle !== v1593.handle || !v1588.sheetAlive(v1715.handle)) {
        v1593.pendingStart = null;
        return;
      }
      if (!v1599(v1715.handle)) {
        return;
      }
      if (Date.now() - v1715.at > 120000) {
        v1617();
        v1593.lastError = "录屏授权等待超时，请重新连接。";
        return;
      }
      if (!v1593.client.state.projectionReady) {
        return;
      }
      v1593.pendingStart = null;
      v1615();
    }
    async function v1617() {
      if (v1594()) {
        return window.PLATFORM.unavailable("车机投屏");
      }
      if (!v1600()) {
        return null;
      }
      const v1716 = v1601();
      v1593.gen++;
      v1593.profileRequest = null;
      v1593.starting = false;
      v1593.pendingStart = null;
      v1622();
      const v1717 = v1593.gen;
      const v1718 = v1593.handle;
      const v1719 = await v1716.stop();
      if (v1717 !== v1593.gen || v1718 !== v1593.handle) {
        return v1719;
      }
      v1593.lastError = v1719.ok ? "" : v1590.castErrorText(v1719.error);
      v1588.toast(v1586(), v1719.ok ? v1716.phase === "idle" ? "已停止投屏" : "正在停止投屏" : v1593.lastError, 3000);
      v1611();
      v1603();
      return v1719;
    }
    async function v1618() {
      v1593.restoreSettings = null;
      v1593.gen++;
      v1593.profileRequest = null;
      v1593.starting = false;
      v1593.pendingStart = null;
      v1622();
      v1604();
      const v1720 = v1593.client || (v1596() ? v1601() : null);
      if (!v1720) {
        return {
          ok: true,
          skipped: true
        };
      }
      const v1721 = v1593.gen;
      const v1722 = await v1720.stop();
      if (v1721 !== v1593.gen) {
        return v1722;
      }
      v1720.setProfile(null);
      v1593.profile = v1720.state.savedProfile;
      v1593.lastError = v1722.ok ? "" : v1590.castErrorText(v1722.error);
      v1611();
      return v1722;
    }
    function v1619(v1723) {
      return v1723 && v1593.scan === v1723 && !v1723.cancelled && v1723.scanGen === v1593.scanGen && v1599(v1723.handle, v1723.gen);
    }
    function v1620() {
      const v1724 = v1593.scan;
      if (!v1724) {
        return;
      }
      if (!v1619(v1724)) {
        return v1622();
      }
      const v1725 = v1593.root?.querySelector("[data-act=\"scan-preview\"]");
      const v1726 = v1593.root?.querySelector("[data-act=\"scan-frame\"]");
      if (!v1725 || !v1726) {
        return v1622();
      }
      v1725.hidden = false;
      if (v1724.video.parentNode !== v1726) {
        v1726.prepend(v1724.video);
      }
      const v1727 = v1593.root.querySelector("[data-act=\"scan-status\"]");
      if (v1727) {
        v1727.textContent = v1593.scanMessage;
      }
    }
    function v1621(v1728) {
      if (v1594()) {
        return window.PLATFORM.unavailable("相机扫码");
      }
      if (!v1595() || !v1599(v1728)) {
        return;
      }
      if (v1593.scan && v1619(v1593.scan)) {
        return;
      }
      v1622();
      v1593.scanMessage = "正在打开摄像头，请允许相机权限…";
      const v1729 = document.createElement("video");
      v1729.className = "cast-camera-video";
      v1729.setAttribute("playsinline", "");
      v1729.setAttribute("aria-label", "车机二维码相机预览");
      v1729.muted = true;
      const v1730 = document.createElement("canvas");
      const v1731 = {
        handle: v1728,
        gen: v1593.gen,
        scanGen: v1593.scanGen,
        video: v1729,
        stream: null,
        raf: 0,
        cancelled: false,
        pending: true,
        observer: null,
        ticket: "",
        navigationId: "",
        cameraBridge: window.ZeehoCamera
      };
      v1593.scan = v1731;
      v1611(v1728);
      if (typeof MutationObserver === "function" && v1593.root) {
        v1731.observer = new MutationObserver(() => {
          if (v1593.scan === v1731 && !v1619(v1731)) {
            v1622();
          }
        });
        v1731.observer.observe(v1593.root, {
          childList: true,
          attributes: true
        });
      }
      const v1732 = v1734 => {
        if (!v1619(v1731)) {
          if (v1593.scan === v1731) {
            v1622();
          }
          return;
        }
        v1622();
        v1593.scanMessage = v1734;
        v1611(v1728);
        v1588.toast(v1586(), v1734, 3600);
      };
      if (v1583.inShell()) {
        try {
          v1731.navigationId = new URL(window.location.href).searchParams.get("_shellNav") || "";
          if (typeof v1731.cameraBridge?.beginCameraScan !== "function" || typeof v1731.cameraBridge?.cancelCameraScan !== "function") {
            return v1732("更新 App 后使用相机扫码，暂时可用「相册选图」或「粘贴内容」。");
          }
          v1731.ticket = String(v1731.cameraBridge.beginCameraScan(v1731.navigationId, String(v1731.gen)) || "");
        } catch {
          return v1732("相机扫码暂未就绪，请重试，或用「相册选图」「粘贴内容」。");
        }
        if (!v1731.ticket) {
          return v1732("相机扫码暂未就绪，请重试，或用「相册选图」「粘贴内容」。");
        }
      }
      const v1733 = v1735 => {
        for (const v1736 of v1735.getTracks()) {
          v1736.stop();
        }
      };
      if (typeof navigator.mediaDevices?.getUserMedia !== "function") {
        return v1732("当前环境暂时打不开摄像头，请用「相册选图」或「粘贴内容」。");
      }
      Promise.resolve().then(() => {
        if (!v1619(v1731)) {
          return null;
        }
        return navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment"
          },
          audio: false
        });
      }).then(async v1737 => {
        if (!v1737) {
          return;
        }
        if (!v1619(v1731)) {
          v1733(v1737);
          if (v1593.scan === v1731) {
            v1622();
          }
          return;
        }
        v1731.stream = v1737;
        v1729.srcObject = v1737;
        await v1729.play();
        if (!v1619(v1731)) {
          if (v1593.scan === v1731) {
            v1622();
          }
          return;
        }
        v1731.pending = false;
        v1593.scanMessage = "把车机二维码放进取景框，会自动识别；扫不出可用相册或粘贴。";
        v1620();
        const v1738 = v1730.getContext("2d", {
          willReadFrequently: true
        });
        const v1739 = () => {
          if (!v1619(v1731)) {
            if (v1593.scan === v1731) {
              v1622();
            }
            return;
          }
          try {
            if (v1729.readyState >= v1729.HAVE_ENOUGH_DATA) {
              const v1740 = v1729.videoWidth;
              const v1741 = v1729.videoHeight;
              if (v1740 && v1741 && v1738) {
                const v1742 = Math.min(1, 640 / v1740);
                v1730.width = Math.round(v1740 * v1742);
                v1730.height = Math.round(v1741 * v1742);
                v1738.drawImage(v1729, 0, 0, v1730.width, v1730.height);
                const v1743 = v1738.getImageData(0, 0, v1730.width, v1730.height);
                const v1744 = typeof window.jsQR === "function" ? window.jsQR(v1743.data, v1743.width, v1743.height, {
                  inversionAttempts: "dontInvert"
                }) : null;
                if (v1744?.data && v1619(v1731)) {
                  v1622();
                  v1593.scanMessage = "";
                  v1627(v1744.data, v1731.handle, v1731.gen);
                  return;
                }
              }
            }
          } catch {
            return v1732("相机画面暂时无法识别，请用「相册选图」或「粘贴内容」。");
          }
          v1731.raf = requestAnimationFrame(v1739);
        };
        v1731.raf = requestAnimationFrame(v1739);
      }).catch(v1745 => {
        const v1746 = String(v1745?.name || "");
        if (v1746 === "NotAllowedError" || v1746 === "SecurityError") {
          return v1732("未允许相机权限，请在系统设置中允许后重试，或用「相册选图」「粘贴内容」。");
        }
        v1732("打不开摄像头，请重试，或用「相册选图」「粘贴内容」。");
      });
    }
    function v1622() {
      const v1747 = v1593.scan;
      v1593.scan = null;
      v1593.scanGen++;
      if (!v1747) {
        return;
      }
      v1747.cancelled = true;
      if (v1747.ticket) {
        try {
          v1747.cameraBridge.cancelCameraScan(v1747.navigationId, v1747.ticket);
        } catch {}
        v1747.ticket = "";
      }
      v1747.observer?.disconnect();
      if (v1747.raf) {
        cancelAnimationFrame(v1747.raf);
      }
      v1747.raf = 0;
      if (v1747.stream) {
        for (const v1749 of v1747.stream.getTracks()) {
          v1749.stop();
        }
      }
      v1747.stream = null;
      v1747.video.pause();
      v1747.video.srcObject = null;
      v1747.video.removeAttribute("src");
      v1747.video.load();
      v1747.video.remove();
      const v1748 = v1593.root?.querySelector("[data-act=\"scan-preview\"]");
      if (v1748) {
        v1748.hidden = true;
      }
      v1593.scanMessage = "";
    }
    function v1623() {
      v1622();
      v1604();
    }
    async function v1624() {
      const v1750 = v1593.handle;
      const v1751 = v1593.gen;
      if (!v1595() || document.hidden === true || !v1750 || !v1588.sheetAlive(v1750) || !v1593.client) {
        return;
      }
      await v1593.client.refresh();
      v1616();
      if (v1593.handle !== v1750 || v1593.gen !== v1751 || !v1588.sheetAlive(v1750)) {
        return;
      }
      v1611(v1750);
      v1603();
    }
    document.addEventListener?.("visibilitychange", () => {
      if (document.hidden) {
        v1623();
      } else {
        v1624();
      }
    });
    window.addEventListener?.("pagehide", v1623);
    window.addEventListener?.("pageshow", v1624);
    function v1625(v1752, v1753 = v1593.handle) {
      if (!v1595() || !v1599(v1753)) {
        return Promise.resolve(null);
      }
      v1622();
      v1593.gen++;
      if (!window.UIDQR || typeof window.UIDQR.decodeImage !== "function") {
        v1588.toast(v1586(), "图片解码没就绪，刷新页面再试", 3000);
        return Promise.resolve(null);
      }
      v1588.toast(v1586(), "正在识别图片…", 1600);
      const v1754 = v1593.gen;
      return window.UIDQR.decodeImage(v1752).then(v1755 => {
        if (!v1599(v1753, v1754)) {
          return null;
        }
        if (!v1755) {
          v1588.toast(v1586(), "这张图里没找到二维码，换一张或直接粘贴内容", 3600);
          return null;
        }
        return v1627(v1755, v1753, v1754);
      }).catch(() => {
        if (!v1599(v1753, v1754)) {
          return null;
        }
        v1588.toast(v1586(), "图片读不出来，换一张或直接粘贴内容", 3200);
        return null;
      });
    }
    function v1626(v1756 = v1593.handle) {
      if (!v1595() || !v1599(v1756)) {
        return null;
      }
      v1622();
      v1593.gen++;
      let v1757 = null;
      const v1758 = v1593.gen;
      v1757 = v1588.sheet(v1586(), {
        key: "cast-paste",
        className: "cast-page",
        closeMode: "current",
        center: true,
        title: "粘贴车机二维码内容",
        sub: "车机投屏页二维码扫出来那串字符",
        body: "<div class=\"cast-paste-field\">\n          <textarea class=\"cast-textarea\" id=\"cp-text\" rows=\"4\" aria-label=\"车机二维码内容\" placeholder=\"v=1&action=9&modelid=...&ssid=...&pwd=...&mac=...&sn=...\"></textarea>\n        </div>\n        <div class=\"note info mt12\">" + v1588.icon("info", 18) + "<div>整串粘进来就行，前后有别的字也没关系，会按 <code>&amp;</code> / <code>;</code> / 换行切开找键值。</div></div>\n        <div class=\"cast-actions-stack mt12\"><button class=\"btn block primary\" type=\"button\" data-act=\"ok\">解析</button></div>",
        onMount: v1759 => {
          const v1760 = v1759?.querySelector ? v1759 : null;
          if (!v1760) {
            return;
          }
          const v1761 = v1760.querySelector("#cp-text");
          v1761?.focus?.();
          v1760.querySelector("[data-act=\"ok\"]")?.addEventListener("click", () => {
            if (!v1595() || v1593.handle !== v1756 || v1758 !== v1593.gen || v1588.currentSheet() !== v1757 || !v1588.sheetAlive(v1756)) {
              return;
            }
            const v1762 = String(v1761?.value || "").trim();
            if (!v1762) {
              return v1588.toast(v1586(), "先粘点东西进来", 2200);
            }
            v1588.closeSheet(v1757);
            v1627(v1762, v1756, v1758);
          });
        }
      });
    }
    async function v1627(v1763, v1764 = v1593.handle, v1765 = v1593.gen) {
      if (!v1595() || !v1599(v1764, v1765)) {
        return {
          ok: false,
          error: "app_only_or_page_closed"
        };
      }
      const v1766 = v1601();
      const v1767 = v1590.parsePairingPayload(v1763);
      if (!v1767.ok) {
        const v1769 = v1767.errors && v1767.errors[0];
        const v1770 = v1769 ? "" + v1590.castErrorText(v1769.code, v1769.code) + (v1769.detail ? "（" + v1769.detail + "）" : "") : "这串内容不像车机投屏二维码";
        v1588.toast(v1586(), v1770, 4200);
        return {
          ok: false,
          errors: v1767.errors
        };
      }
      if (!v1596()) {
        v1766.setProfile(v1767.profile);
        v1593.profile = v1767.profile;
        v1593.lastError = "";
        v1588.toast(v1586(), "二维码已解析；连接车机和录屏需要 App", 3000);
        v1611(v1764);
        return v1767;
      }
      if (v1583.isIOS?.()) {
        await v1583.syncIOSSession?.();
      }
      if (!v1599(v1764, v1765)) {
        return v1767;
      }
      const v1768 = await v1766.pair(v1767.profile);
      if (!v1599(v1764, v1765)) {
        return v1767;
      }
      if (!v1768.ok) {
        v1593.lastError = v1768.message || v1590.castErrorText(v1768.error);
        v1588.toast(v1586(), v1593.lastError, 4000);
      } else {
        v1593.profile = v1767.profile;
        v1588.toast(v1586(), "已保存 " + (v1767.profile.modelId || "车机") + "，点开始投屏", 2600);
      }
      v1611(v1764);
      return v1767;
    }
    async function v1628(v1771 = v1593.handle) {
      if (!v1595() || !v1599(v1771)) {
        return null;
      }
      v1622();
      v1593.gen++;
      const v1772 = v1593.gen;
      const v1773 = v1601();
      const v1774 = {
        at: new Date().toISOString(),
        app: "zeeho-panel",
        appVer: v1583.APP_VER,
        phase: v1773.phase,
        reason: v1773.state.reason || "",
        bridge: v1596(),
        bridgeVersion: await (async () => {
          try {
            return (await v1590.detectCastBridge(window)?.version?.()) ?? null;
          } catch {
            return null;
          }
        })(),
        tier: v1593.tier,
        format: v1593.format,
        profile: v1593.profile ? v1590.summarizePairing(v1593.profile) : null,
        selfTest: v1590.castSelfTest(),
        ports: v1590.CAST_PORTS,
        diagnostics: await v1773.getDiagnostics(50)
      };
      if (!v1599(v1771, v1772)) {
        return null;
      }
      const v1775 = JSON.stringify(v1590.redactDiagnostic(v1774), null, 2);
      let v1776 = null;
      v1776 = v1588.sheet(v1586(), {
        key: "cast-diag",
        className: "cast-page",
        closeMode: "current",
        full: true,
        title: "投屏诊断",
        sub: "敏感字段已打码",
        body: "<div class=\"field\"><button class=\"btn block primary\" type=\"button\" data-act=\"copy\">复制诊断信息</button></div>\n        <pre class=\"diagbox mono\">" + v1589(v1775) + "</pre>\n        <div class=\"note info mt12\">" + v1588.icon("info", 18) + "<div>协议自检（selfTest.ok）为 false 说明帧格式往返对不上，通常是代码被改坏了，不是车机的问题。</div></div>",
        onMount: v1777 => {
          const v1778 = v1777?.querySelector ? v1777 : null;
          if (!v1778) {
            return;
          }
          v1778.querySelector("[data-act=\"copy\"]")?.addEventListener("click", async () => {
            const v1779 = () => v1595() && v1593.handle === v1771 && v1772 === v1593.gen && v1588.sheetAlive(v1771) && v1588.currentSheet() === v1776;
            if (!v1779()) {
              return;
            }
            try {
              await navigator.clipboard.writeText(v1775);
              if (v1779()) {
                v1588.toast(v1586(), "已复制诊断信息", 2200);
              }
            } catch {
              if (v1779()) {
                v1588.toast(v1586(), "复制失败，长按下面的文字自己选", 3200);
              }
            }
          });
        }
      });
      return v1776;
    }
    window.APP.cast = {
      CS: v1593,
      openCast: v1614,
      startCast: v1615,
      stopCast: v1617,
      resetContext: v1618,
      handleText: v1627,
      pickImage: v1625,
      diagSheet: v1628,
      pasteSheet: v1626,
      bridgeReady: v1596,
      summary: () => {
        if (!v1595()) {
          return {
            phase: "unavailable",
            text: "",
            hidden: true
          };
        }
        if (!v1593.client) {
          return {
            phase: v1596() ? "idle" : "unavailable",
            text: v1596() ? "未连接" : "更新 App 后使用"
          };
        }
        const v1780 = v1593.client.phase;
        const v1781 = v1593.client.state.environmentError;
        if (v1781 && ["idle", "failed", "unavailable"].includes(v1780)) {
          const v1782 = v1590.castErrorText(v1781, "");
          if (v1782) {
            return {
              phase: "unavailable",
              text: v1782
            };
          }
        }
        return {
          phase: v1780,
          text: (v1592[v1780] || {}).text || v1780
        };
      }
    };
  });
  (v1783 => {
    if (window.LAZY_FEATURE) {
      window.LAZY_FEATURE.register(window.APP, "walltransfer", v1783);
    } else {
      v1783();
    }
  })(() => {
    const v1784 = window.APP;
    const v1785 = window.UI;
    const v1786 = window.MODEL.esc;
    const v1787 = 40;
    const v1788 = 800;
    const v1789 = () => v1784.isIOS?.() === true;
    let v1790 = null;
    let v1791 = 0;
    const v1792 = v1816 => Math.max(0, Math.min(100, Number(v1816) || 0));
    const v1793 = v1817 => String(v1817?.connectionMode || "").toLowerCase();
    function v1794(v1818, v1819) {
      if (v1818?.connected !== true) {
        return false;
      }
      const v1820 = v1793(v1818);
      if (v1820 === "p2p") {
        return true;
      }
      if (v1820 !== "wifi" || !v1819?.ssid) {
        return false;
      }
      if (!v1789()) {
        return v1818.wifiSsid === v1819.ssid;
      }
      if (v1818.targetVerified !== true || v1818.targetJoined !== true) {
        return false;
      }
      const v1821 = v1784.context?.();
      if (v1818.scope && v1821 && ["navId", "frame", "epoch", "accountId", "vin"].some(v1823 => v1818.scope[v1823] != null && v1818.scope[v1823] !== v1821.scope?.[v1823] && v1818.scope[v1823] !== v1821[v1823])) {
        return false;
      }
      const v1822 = String(v1818.wifiSsid || "").trim().replace(/^"(.*)"$/, "$1");
      return !v1822 || v1822 === v1819.ssid;
    }
    function v1795(v1824, v1825, v1826 = "", v1827 = false) {
      const v1828 = v1794(v1824, v1825);
      const v1829 = !!v1826 || v1824?.busy === true || v1824?.connecting === true;
      const v1830 = v1824?.packageReady === true;
      const v1831 = v1827 === true || v1824?.local === true;
      return {
        connected: v1828,
        busy: v1829,
        download: v1831 ? !v1829 && v1830 && v1824?.preparationConfirmed !== true : !v1829 && !v1830,
        apply: v1828 && !v1829 && v1830 && v1824?.canApply === true
      };
    }
    const v1796 = {
      initializing: "正在准备任务",
      ready: "任务已就绪",
      connect: "开始连接车机",
      connected: "已连接目标车机",
      check: "检查车机连接",
      "wifi-settings": "打开 Wi-Fi 设置",
      download: "开始下载主题包",
      validating: "正在校验主题包",
      downloaded: "主题包已就绪",
      apply: "开始应用壁纸",
      prepare: "正在准备本地包",
      prepared: "本地壁纸包已就绪",
      "confirm-preparation": "已确认准备完成",
      preparation_failed: "本地包生成失败，请检查图片后重试",
      preparation_not_confirmed: "请先确认准备完成",
      local_package: "本地壁纸包不完整，请重新进入",
      hashing: "校验主题包",
      waiting_info_ack: "等待车机接收确认",
      sending: "正在传输",
      waiting_complete_ack: "等待传输完成确认",
      waiting_verification: "等待车机校验",
      verified: "车机校验通过",
      done: "壁纸应用完成",
      not_connected: "尚未连接目标车机",
      permission_denied: "连接权限未授权",
      connection_failed: "连接失败，请重试",
      internet_unavailable: "没有可用互联网，请开启移动数据后重试",
      download_failed: "主题包下载失败，请重试",
      download_unavailable: "主题包下载地址不可用，请刷新壁纸详情",
      transfer_failed: "应用失败，请检查车机连接",
      result_unknown: "传输中断，车机结果未知",
      timeout: "操作超时，请重试",
      stale_session: "车辆或账号已变更，请重新进入",
      stale_navigation: "页面已失效，请重新进入",
      initialization_failed: "任务准备失败，请重新进入",
      invalid_ticket: "任务已失效，请重新进入",
      package_not_ready: "请先下载主题包",
      busy_or_initializing: "任务正在准备，请稍候",
      worker_busy: "上一项操作尚未结束，请稍候",
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
    function v1797(v1832, v1833) {
      let v1834 = String(v1796[v1833] || v1833 || "").replace(/[\r\n\t]+/g, " ");
      for (const v1835 of v1832.secrets) {
        if (v1835) {
          v1834 = v1834.split(v1835).join("[已隐藏]");
        }
      }
      return v1834.replace(/https?:\/\/\S+/gi, "[地址已隐藏]").replace(/(?:ssid|pwd|password|token|wifiAddress)\s*[:=]\s*[^\s,;]+/gi, "[凭据已隐藏]").slice(0, 220);
    }
    function v1798(v1836, v1837, v1838 = "info", v1839 = Date.now()) {
      const v1840 = v1797(v1836, v1837);
      if (!v1840) {
        return;
      }
      let v1841 = typeof v1839 === "number" ? v1839 : Date.parse(v1839);
      if (!Number.isFinite(v1841) || v1841 <= 0) {
        v1841 = Date.now();
      }
      if (v1841 < 1000000000000) {
        v1841 *= 1000;
      }
      const v1842 = ["error", "err"].includes(v1838) ? "err" : ["success", "ok"].includes(v1838) ? "ok" : "info";
      const v1843 = v1841 + "|" + v1842 + "|" + v1840;
      if (v1836.seen.has(v1843)) {
        return;
      }
      v1836.seen.add(v1843);
      if (v1836.seen.size > v1787 * 4) {
        v1836.seen.delete(v1836.seen.values().next().value);
      }
      v1836.logs.push({
        at: v1841,
        text: v1840,
        level: v1842
      });
      v1836.logs.sort((v1844, v1845) => v1845.at - v1844.at);
      v1836.logs.length = Math.min(v1836.logs.length, v1787);
    }
    function v1799(v1846) {
      return !v1846.closed && v1790 === v1846 && v1784.current(v1846.scope) && v1846.accountGen === window.API.accountGen && v1846.tab === v1784.state.tab && (!v1846.ticket || v1784.wallpaperTransferCurrent(v1846.ticket));
    }
    function v1800(v1847) {
      if (!v1799(v1847) || v1847.handle && !v1785.sheetAlive(v1847.handle)) {
        v1801(v1847);
        if (v1847.handle && v1785.sheetAlive(v1847.handle)) {
          v1785.closeSheet(v1847.handle);
        }
        return false;
      }
      return true;
    }
    function v1801(v1848) {
      if (v1848.closed) {
        return;
      }
      v1848.closed = true;
      clearTimeout(v1848.timer);
      v1848.timer = 0;
      v1848.detach?.();
      v1848.detach = null;
      window.removeEventListener("pagehide", v1848.onPageHide);
      if (v1848.ticket) {
        v1784.cancelWallpaperTransfer(v1848.ticket);
      }
      v1848.ticket = "";
      v1848.spec = null;
      v1848.profile = null;
      v1848.scope = null;
      v1848.secrets = [];
      v1848.snapshot = {};
      v1848.logs = [];
      v1848.seen.clear();
      v1848.root = null;
      if (v1790 === v1848) {
        v1790 = null;
      }
    }
    function v1802(v1849, v1850, v1851) {
      const v1852 = v1849.querySelector("[data-wt-text=\"" + v1850 + "\"]");
      if (v1852 && v1852.textContent !== v1851) {
        v1852.textContent = v1851;
      }
    }
    function v1803(v1853) {
      const v1854 = v1853.root;
      if (!v1854?.isConnected || v1853.closed) {
        return;
      }
      const v1855 = v1853.snapshot;
      const v1856 = v1795(v1853.stale ? {
        ...v1855,
        connected: false
      } : v1855, v1853.profile, v1853.pending, !!v1853.local);
      for (const v1860 of v1854.querySelectorAll("[data-wt-tab]")) {
        const v1861 = v1860.dataset.wtTab === v1853.mode;
        v1860.disabled = v1860.dataset.wtTab === "auto" && !v1853.autoAvailable;
        v1860.setAttribute("aria-disabled", String(v1860.disabled));
        v1860.setAttribute("aria-selected", String(v1861));
        v1860.tabIndex = v1861 ? 0 : -1;
      }
      v1854.querySelector("[data-wt-auto-unavailable]").hidden = v1853.autoAvailable;
      for (const v1862 of v1854.querySelectorAll("[data-wt-panel]")) {
        v1862.hidden = v1862.dataset.wtPanel !== v1853.mode;
      }
      const v1857 = v1856.connected ? "已连接目标车机" : v1855.connecting || v1853.pending === "connect" ? "正在连接…" : "未连接目标车机";
      v1802(v1854, "connection", v1857);
      v1802(v1854, "download", v1853.local ? v1855.packageReady ? v1855.preparationConfirmed ? "本地包已确认，可以继续连接车机" : "本地包已就绪，确认后才能下发" : v1855.busy || v1853.pending === "initialize" ? "正在本机准备壁纸包…" : "等待本机打包" : v1855.packageReady ? "主题包已就绪" : v1855.busy && v1855.stage === "download" || v1853.pending === "download" ? "下载中 " + Math.round(v1792(v1855.downloadProgress)) + "%" : "可先下载，再连接车机");
      v1802(v1854, "apply", v1855.status === "done" ? "车机校验通过" : v1855.busy && v1855.stage === "apply" || v1853.pending === "apply" ? "应用中 " + Math.round(v1792(v1855.sendProgress)) + "%" : "等待应用");
      v1802(v1854, "error", v1797(v1853, v1853.error || v1855.error || ""));
      for (const v1863 of v1854.querySelectorAll("[data-wt-action]")) {
        const v1864 = v1863.dataset.wtAction;
        v1863.disabled = v1864 === "download" || v1864 === "confirm-preparation" ? !v1856.download : v1864 === "apply" ? !v1856.apply : v1856.busy || v1864 === "connect" && !v1853.autoAvailable;
        if (v1864 === "connect") {
          v1863.textContent = v1855.connecting || v1853.pending === "connect" ? "连接中…" : v1856.connected ? "重新连接" : v1853.failed === "connect" ? "重试连接" : "连接车机";
        }
        if (v1864 === "download") {
          v1863.textContent = v1853.failed === "download" ? "重试下载主题包" : "下载主题包";
        }
        if (v1864 === "confirm-preparation") {
          v1863.textContent = v1855.preparationConfirmed ? "已确认准备完成" : v1853.failed === "confirm-preparation" ? "重试确认" : "确认准备完成";
        }
        if (v1864 === "apply") {
          v1863.textContent = v1853.failed === "apply" ? "重试应用" : v1853.local ? "确认并应用壁纸" : "应用壁纸";
        }
      }
      v1854.querySelector("[data-wt-copy-password]").disabled = v1853.mode !== "manual" || !v1853.profile?.password;
      for (const v1865 of ["download", "send"]) {
        const v1866 = v1854.querySelector("[data-wt-progress=\"" + v1865 + "\"]");
        if (!v1866) {
          continue;
        }
        v1866.value = v1865 === "download" && v1855.packageReady ? 100 : v1792(v1855[v1865 + "Progress"]);
        v1866.hidden = v1853.local && v1865 === "download" ? true : v1865 === "download" ? !v1855.packageReady && v1855.stage !== "download" && v1853.pending !== "download" : v1855.stage !== "apply" && v1853.pending !== "apply" && !["done", "success", "applied"].includes(v1855.status);
      }
      const v1858 = v1854.querySelector("[data-wt-logs]");
      const v1859 = v1853.logs.map(v1867 => "<div class=\"wall-transfer-log-line " + v1867.level + "\"><time>" + v1786(new Date(v1867.at).toLocaleTimeString([], {
        hour12: false
      })) + "</time><span>" + v1786(v1867.text) + "</span></div>").join("");
      if (v1858.innerHTML !== v1859) {
        v1858.innerHTML = v1859;
      }
    }
    function v1804(v1868, v1869) {
      if (!v1800(v1868) || v1869?.ticket !== v1868.ticket) {
        return false;
      }
      if (v1869.status === "rejected" || typeof v1869.connected !== "boolean" || typeof v1869.busy !== "boolean" || typeof v1869.packageReady !== "boolean") {
        return false;
      }
      const v1870 = v1868.snapshot.error;
      v1868.snapshot = v1869;
      v1868.stale = false;
      if (v1869.autoAvailable === false) {
        v1868.autoAvailable = false;
      }
      if (!v1868.autoAvailable && v1868.mode === "auto") {
        v1868.mode = "manual";
      }
      for (const v1871 of Array.isArray(v1869.logs) ? v1869.logs.slice(-v1787) : []) {
        v1798(v1868, v1871.text, v1871.level, v1871.at);
      }
      if (v1869.error) {
        const v1872 = v1869.stage || v1868.lastAction;
        if (["connect", "download", "apply"].includes(v1872)) {
          v1868.failed = v1872;
        }
        if (v1869.error !== v1870) {
          v1798(v1868, v1869.error, "err", v1869.updatedAt || Date.now());
        }
      }
      v1803(v1868);
      return true;
    }
    function v1805(v1873) {
      clearTimeout(v1873.timer);
      if (!v1873.closed) {
        v1873.timer = setTimeout(() => v1806(v1873), v1788);
      }
    }
    async function v1806(v1874) {
      if (!v1800(v1874)) {
        return;
      }
      if (v1784.isIOS?.() && document.hidden) {
        v1874.stale = true;
        v1805(v1874);
        return;
      }
      if (v1874.ticket && !v1874.pending) {
        const v1875 = v1874.revision;
        try {
          const v1876 = await v1784.pollWallpaperTransfer(v1874.ticket);
          if (v1800(v1874) && v1875 === v1874.revision) {
            if (!v1804(v1874, v1876)) {
              throw new Error("无效任务状态");
            }
            v1874.error = "";
            v1803(v1874);
          }
        } catch {
          if (v1800(v1874) && v1875 === v1874.revision) {
            v1874.stale = true;
            v1874.error = "状态读取失败，请重试";
            v1803(v1874);
          }
        }
      }
      if (v1800(v1874)) {
        v1805(v1874);
      }
    }
    async function v1807(v1877) {
      const v1878 = Date.now() + 15000;
      while (v1800(v1877)) {
        const v1879 = await v1784.pollWallpaperTransfer(v1877.ticket);
        if (!v1804(v1877, v1879)) {
          throw new Error("任务状态无效，请重新进入");
        }
        if (v1879.status !== "initializing") {
          if (v1879.error) {
            throw new Error(v1796[v1879.error] || "任务准备失败，请重新进入");
          }
          return;
        }
        if (Date.now() >= v1878) {
          throw new Error("任务准备超时，请重新进入");
        }
        await new Promise(v1880 => setTimeout(v1880, 150));
      }
    }
    function v1808(v1881) {
      if (!v1800(v1881)) {
        return Promise.resolve(false);
      }
      return new Promise(v1882 => {
        let v1883;
        let v1884 = false;
        v1883 = v1785.sheet(v1784.phone(), {
          title: "确认下发本地壁纸包",
          center: true,
          closeMode: "current",
          body: "<div class=\"note bad\">" + v1785.icon("alert", 18) + "<div>本地包编号由本机选择，未经实车充分验证；请停车操作。</div></div>\n          <label class=\"wall-exp-check\"><input type=\"checkbox\" data-wt-risk>我已了解风险，确认下发到当前车辆</label>\n          <button type=\"button\" class=\"btn block primary mt12\" data-wt-risk-send disabled>确认下发</button>",
          onMount: v1885 => {
            const v1886 = v1885.querySelector("[data-wt-risk]");
            const v1887 = v1885.querySelector("[data-wt-risk-send]");
            v1886.addEventListener("change", () => {
              v1887.disabled = !v1886.checked;
            });
            v1887.addEventListener("click", () => {
              if (!v1886.checked || !v1800(v1881)) {
                return;
              }
              v1884 = true;
              v1785.closeSheet(v1883);
            });
          },
          onDismiss: () => v1882(v1884)
        });
      });
    }
    async function v1809(v1888) {
      try {
        const v1889 = await v1784.beginWallpaperTransferLocal(v1888.spec, v1888.local.main, v1888.local.speed);
        if (!v1799(v1888)) {
          v1784.cancelWallpaperTransfer(v1889);
          return;
        }
        v1888.ticket = v1889;
        v1803(v1888);
        await v1807(v1888);
      } catch (v1890) {
        if (v1800(v1888)) {
          v1888.error = v1797(v1888, v1890.message || "本地壁纸包准备失败，请重试");
          v1798(v1888, v1888.error, "err");
        }
      } finally {
        if (v1888.pending === "initialize") {
          v1888.pending = "";
        }
        if (v1800(v1888)) {
          v1803(v1888);
          v1805(v1888);
        }
      }
    }
    async function v1810(v1891, v1892) {
      if (!v1800(v1891) || v1891.pending || v1892 === "connect" && !v1891.autoAvailable) {
        return;
      }
      if (v1892 === "wifi-guide") {
        window.CAST?.showIOSWifiGuide?.({
          profile: v1891.profile,
          host: v1784.phone(),
          ui: v1785,
          isCurrent: () => v1799(v1891),
          key: "walltransfer-wifi-guide",
          afterCheck: () => v1810(v1891, "check")
        });
        return;
      }
      const v1893 = v1795(v1891.stale ? {
        ...v1891.snapshot,
        connected: false
      } : v1891.snapshot, v1891.profile, "", !!v1891.local);
      if (v1892 === "confirm-preparation") {
        if (!v1891.local || !v1893.download) {
          return;
        }
      } else if (v1893.busy || v1892 === "download" && !v1893.download || v1892 === "apply" && !v1893.apply) {
        return;
      }
      if (v1892 === "apply" && v1891.local && !(await v1808(v1891))) {
        return;
      }
      if (!v1800(v1891)) {
        return;
      }
      v1891.revision++;
      v1891.pending = v1892;
      v1891.lastAction = v1892;
      v1891.error = "";
      v1803(v1891);
      try {
        if (!v1891.ticket) {
          const v1895 = v1891.local ? await v1784.beginWallpaperTransferLocal(v1891.spec, v1891.local.main, v1891.local.speed) : await v1784.beginWallpaperTransfer(v1891.spec);
          if (!v1799(v1891)) {
            v1784.cancelWallpaperTransfer(v1895);
            return;
          }
          v1891.ticket = v1895;
          await v1807(v1891);
        }
        if (!v1800(v1891)) {
          return;
        }
        if (v1892 === "connect" && !v1891.autoAvailable) {
          throw new Error(v1796.auto_unavailable);
        }
        const v1894 = await v1784.wallpaperTransferAction(v1891.ticket, v1892);
        if (!v1800(v1891)) {
          return;
        }
        if (v1894?.ticket !== v1891.ticket || v1894.accepted !== true || v1894.ok === false || v1894.pending === true || v1894.queued === true || v1894.submitted === true) {
          throw new Error(v1796[v1894?.error] || "操作未受理，请重试");
        }
        v1798(v1891, {
          connect: "开始连接车机",
          check: "检查目标连接",
          "wifi-settings": "已打开 Wi-Fi 设置",
          download: "开始下载主题包",
          "confirm-preparation": "已确认本地包",
          apply: "开始应用壁纸"
        }[v1892]);
        if (!v1804(v1891, await v1784.pollWallpaperTransfer(v1891.ticket))) {
          throw new Error("状态读取失败，请重试");
        }
      } catch (v1896) {
        if (v1800(v1891)) {
          v1891.failed = v1892;
          v1891.error = v1797(v1891, v1896.message || "操作失败，请重试");
          v1798(v1891, v1891.error, "err");
        }
      } finally {
        v1891.pending = "";
        if (v1800(v1891)) {
          v1803(v1891);
          v1805(v1891);
        }
      }
    }
    function v1811(v1897) {
      if (!v1800(v1897)) {
        return;
      }
      v1798(v1897, "已展示 iOS 连接车机 Wi-Fi 步骤");
      window.CAST?.showIOSWifiGuide?.({
        profile: v1897.profile,
        host: v1784.phone(),
        ui: v1785,
        isCurrent: () => v1799(v1897),
        key: "walltransfer-wifi-guide",
        afterCheck: () => v1810(v1897, "check")
      });
    }
    function v1812(v1898, v1899) {
      const v1900 = String(v1899?.thumbUrl || v1899?.imageUrl || "");
      const v1901 = /^(https?:\/\/|blob:|data:image\/)/i.test(v1900) ? v1900 : "";
      const v1902 = v1898.local ? "<p class=\"card-sub\">图片只在本机制作成壁纸包，不上传云端；包内编号由本机选择。</p>\n          <button type=\"button\" class=\"btn primary\" data-wt-action=\"confirm-preparation\" disabled>确认准备完成</button>\n          <p class=\"wall-transfer-status\" data-wt-text=\"download\">等待本机打包</p>" : "<button type=\"button\" class=\"btn primary\" data-wt-action=\"download\">下载主题包</button>\n          <progress max=\"100\" value=\"0\" aria-label=\"下载进度\" data-wt-progress=\"download\" hidden></progress>\n          <p class=\"wall-transfer-status\" data-wt-text=\"download\">等待下载</p>";
      return "<div class=\"wall-transfer-flow\">\n      <header class=\"wall-transfer-selected\">" + (v1901 ? "<img src=\"" + v1786(v1901) + "\" alt=\"\" referrerpolicy=\"no-referrer\">" : "") + "<strong>" + v1786(v1899?.name || "未命名壁纸") + "</strong></header>\n      " + (v1898.local ? "<div class=\"note info\">" + v1785.icon("alert", 18) + "<div>共享车没有云端保存权限，这里直接向车机下发本机生成的壁纸包。</div></div>" : "") + "\n      <section class=\"wall-transfer-step\"><h3><span>1</span>连接车机</h3>\n        <div class=\"wall-transfer-tabs\" role=\"tablist\" aria-label=\"连接方式\">\n          <button type=\"button\" role=\"tab\" id=\"wt-auto-" + v1898.id + "\" aria-controls=\"wt-auto-panel-" + v1898.id + "\" data-wt-tab=\"auto\" aria-selected=\"" + (v1898.mode === "auto") + "\" aria-disabled=\"" + !v1898.autoAvailable + "\" tabindex=\"" + (v1898.mode === "auto" ? 0 : -1) + "\"" + (v1898.autoAvailable ? "" : " disabled") + ">自动连接</button>\n          <button type=\"button\" role=\"tab\" id=\"wt-manual-" + v1898.id + "\" aria-controls=\"wt-manual-panel-" + v1898.id + "\" data-wt-tab=\"manual\" aria-selected=\"" + (v1898.mode === "manual") + "\" tabindex=\"" + (v1898.mode === "manual" ? 0 : -1) + "\">手动连接</button>\n        </div>\n        <p class=\"wall-transfer-status\" data-wt-auto-unavailable" + (v1898.autoAvailable ? " hidden" : "") + ">车辆不支持自动连接</p>\n        <div role=\"tabpanel\" id=\"wt-auto-panel-" + v1898.id + "\" aria-labelledby=\"wt-auto-" + v1898.id + "\" data-wt-panel=\"auto\"" + (v1898.mode === "auto" ? "" : " hidden") + "><button type=\"button\" class=\"btn primary\" data-wt-action=\"connect\"" + (v1898.autoAvailable ? "" : " disabled") + ">连接车机</button></div>\n        <div role=\"tabpanel\" id=\"wt-manual-panel-" + v1898.id + "\" aria-labelledby=\"wt-manual-" + v1898.id + "\" data-wt-panel=\"manual\"" + (v1898.mode === "manual" ? "" : " hidden") + ">\n          <dl class=\"wall-transfer-credentials\"><div><dt>Wi-Fi 名称</dt><dd class=\"selectable\">" + v1786(v1898.profile.ssid) + "</dd></div><div><dt>密码</dt><dd class=\"wall-transfer-credential-value\"><span class=\"selectable\">" + v1786(v1898.profile.password) + "</span><button type=\"button\" class=\"iconbtn sm\" data-wt-copy-password aria-label=\"复制密码\">" + v1785.icon("copy", 16) + "</button></dd></div></dl>\n          <button type=\"button\" class=\"btn primary\" data-wt-action=\"" + (v1789() ? "wifi-guide" : "wifi-settings") + "\">" + (v1789() ? "如何连接车机 Wi-Fi" : "打开 Wi-Fi 设置") + "</button>\n          <button type=\"button\" class=\"btn text\" data-wt-action=\"check\">检查连接</button>\n        </div>\n        <p class=\"wall-transfer-status\" role=\"status\" data-wt-text=\"connection\">未连接目标车机</p>\n      </section>\n      <section class=\"wall-transfer-step\"><h3><span>2</span>" + (v1898.local ? "准备本地包" : "下载主题包") + "</h3>" + v1902 + "</section>\n      <section class=\"wall-transfer-step\"><h3><span>3</span>应用壁纸</h3><button type=\"button\" class=\"btn primary\" data-wt-action=\"apply\" disabled>应用壁纸</button><progress max=\"100\" value=\"0\" aria-label=\"应用进度\" data-wt-progress=\"send\" hidden></progress><p class=\"wall-transfer-status\" data-wt-text=\"apply\">等待应用</p></section>\n      <p class=\"wall-transfer-error\" role=\"status\" data-wt-text=\"error\"></p>\n      <section class=\"wall-transfer-log-section\"><h3>任务日志</h3><div class=\"wall-transfer-log\" data-wt-logs aria-label=\"任务日志\"></div></section>\n    </div>";
    }
    function v1813(v1903, v1904) {
      const v1905 = v1904.querySelector(".wall-transfer-flow");
      v1903.detach?.();
      v1903.root = v1905;
      const v1906 = v1908 => {
        const v1909 = v1908.target.closest("[data-wt-tab]");
        if (v1909 && v1800(v1903)) {
          if (v1909.disabled || v1909.dataset.wtTab === "auto" && !v1903.autoAvailable) {
            return;
          }
          v1903.mode = v1909.dataset.wtTab;
          v1803(v1903);
          return;
        }
        const v1910 = v1908.target.closest("[data-wt-copy-password]");
        if (v1910) {
          if (v1800(v1903) && v1903.mode === "manual" && v1903.profile?.password) {
            v1785.copy(v1903.profile.password, v1784.phone(), "密码");
          }
          return;
        }
        const v1911 = v1908.target.closest("[data-wt-action]");
        if (v1911 && !v1911.disabled) {
          v1810(v1903, v1911.dataset.wtAction);
        }
      };
      const v1907 = v1912 => {
        const v1913 = v1912.target.closest("[data-wt-tab]");
        if (!v1913 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(v1912.key) || !v1800(v1903)) {
          return;
        }
        v1912.preventDefault();
        v1903.mode = !v1903.autoAvailable ? "manual" : v1912.key === "Home" ? "auto" : v1912.key === "End" ? "manual" : v1903.mode === "auto" ? "manual" : "auto";
        v1803(v1903);
        v1905.querySelector("[data-wt-tab=\"" + v1903.mode + "\"]").focus();
      };
      v1905.addEventListener("click", v1906);
      v1905.addEventListener("keydown", v1907);
      v1903.detach = () => {
        v1905.removeEventListener("click", v1906);
        v1905.removeEventListener("keydown", v1907);
      };
      v1803(v1903);
    }
    function v1814() {
      return v1785.sheet(v1784.phone(), {
        key: "walltransfer-preview",
        full: true,
        title: "壁纸应用",
        sub: "UI 测试预览",
        className: "wall-transfer",
        body: "<div class=\"card-sub\">" + v1786(window.PLATFORM.message("车机 Wi-Fi 直传")) + "</div>\n        <section class=\"wall-transfer-step\"><h3><span>1</span>连接车机</h3><div class=\"wall-transfer-tabs\" role=\"tablist\">\n          <button type=\"button\" role=\"tab\" data-wt-preview-tab=\"auto\" aria-selected=\"true\">自动连接</button>\n          <button type=\"button\" role=\"tab\" data-wt-preview-tab=\"manual\" aria-selected=\"false\">手动连接</button></div>\n          <div class=\"field\"><button class=\"btn tonal\" data-wt-preview>连接车机</button><button class=\"btn text\" data-wt-preview>检查连接</button><button class=\"btn text\" data-wt-preview>打开 Wi-Fi 设置</button></div></section>\n        <section class=\"wall-transfer-step\"><h3><span>2</span>下载主题包</h3><div class=\"field\"><button class=\"btn tonal block\" data-wt-preview>下载主题包</button></div></section>\n        <section class=\"wall-transfer-step\"><h3><span>3</span>应用壁纸</h3><div class=\"field\"><button class=\"btn tonal block\" data-wt-preview>应用壁纸</button></div></section>\n        <div class=\"card-sub\">尚未连接、下载或应用；所有状态均为 unavailable。</div>",
        onMount(v1914) {
          v1914.querySelectorAll("[data-wt-preview]").forEach(v1915 => v1915.addEventListener("click", () => window.PLATFORM.unavailable("车机 Wi-Fi 直传")));
          v1914.querySelectorAll("[data-wt-preview-tab]").forEach(v1916 => v1916.addEventListener("click", () => {
            v1914.querySelectorAll("[data-wt-preview-tab]").forEach(v1917 => v1917.setAttribute("aria-selected", v1917 === v1916));
          }));
        }
      });
    }
    function v1815(v1918, v1919, v1920, v1921 = null) {
      if (window.PLATFORM.preview()) {
        return v1814();
      }
      if (!v1784.wallpaperTransferSupported?.()) {
        return window.PLATFORM.unavailable("车机 Wi-Fi 直传", "compat.beginWallpaperTransfer");
      }
      const v1922 = v1921 && (v1921.main || v1921.speed) ? {
        main: String(v1921.main || ""),
        speed: String(v1921.speed || "")
      } : null;
      if (v1921 && !v1922) {
        v1785.toast(v1784.phone(), "本地壁纸包不完整，请重新进入", 3000);
        return false;
      }
      if (v1922 && !v1784.wallpaperLocalTransferSupported?.()) {
        return window.PLATFORM.unavailable("车机 Wi-Fi 直传", "compat.beginWallpaperTransferLocal");
      }
      const v1923 = window.CAST?.parseWallpaperPairing?.(v1918?.wifiAddress);
      if (!v1923?.ok || !v1919 || !v1784.current(v1919)) {
        v1785.toast(v1784.phone(), "车辆连接信息已失效，请重新进入", 3000);
        return false;
      }
      if (v1790) {
        v1785.closeSheet(v1790.handle);
      }
      const v1924 = !!v1923.profile.p2pMac;
      const v1925 = {
        id: ++v1791,
        scope: {
          ...v1919,
          owner: v1919.owner ? {
            ...v1919.owner
          } : null
        },
        spec: {
          ...v1918
        },
        local: v1922,
        profile: {
          ...v1923.profile
        },
        accountGen: window.API.accountGen,
        tab: v1784.state.tab,
        ticket: "",
        autoAvailable: v1924,
        mode: v1924 ? "auto" : "manual",
        snapshot: {},
        stale: false,
        revision: 0,
        pending: v1922 ? "initialize" : "",
        lastAction: "",
        failed: "",
        error: "",
        logs: [],
        seen: new Set(),
        secrets: [v1923.profile.ssid, v1923.profile.password, v1918.wifiAddress, window.API.token, v1919.token, v1919.requestToken, v1919.owner?.token],
        closed: false,
        timer: 0,
        root: null,
        handle: null,
        detach: null
      };
      v1790 = v1925;
      v1925.onPageHide = () => {
        v1801(v1925);
        if (v1785.sheetAlive(v1925.handle)) {
          v1785.closeSheet(v1925.handle);
        }
      };
      window.addEventListener("pagehide", v1925.onPageHide);
      v1798(v1925, v1922 ? "等待本机准备壁纸包" : "等待连接车机");
      v1925.handle = v1785.sheet(v1784.phone(), {
        title: "壁纸应用",
        full: true,
        closeMode: "current",
        className: "wall-transfer",
        body: v1812(v1925, v1920),
        onMount: v1926 => v1813(v1925, v1926),
        onDismiss: () => v1801(v1925)
      });
      if (v1922) {
        v1809(v1925);
      } else {
        v1805(v1925);
      }
      return v1925.handle;
    }
    v1784.walltransfer = {
      open: v1815,
      openPreview: v1814,
      targetConnected: v1794,
      controls: v1795
    };
  });
})();
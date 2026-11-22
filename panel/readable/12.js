(() => {
  window.MODEL = (() => {
    const v1 = (v120, v121 = null) => v120 === null || v120 === undefined || v120 === "" || isNaN(Number(v120)) ? v121 : Number(v120);
    const v2 = (v122, v123 = "") => v122 === null || v122 === undefined ? v123 : String(v122);
    const v3 = v124 => v124 === true || v124 === 1 || v124 === "1" || v124 === "true" || v124 === "y" || v124 === "yes";
    const v4 = v125 => v2(v125).replace(/[&<>"']/g, v126 => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[v126]);
    const v5 = (v127, v128, v129) => Math.max(v128, Math.min(v129, v127));
    function v6(v130, v131) {
      if (typeof v130 !== "number" && (typeof v130 !== "string" || !/^\d+$/.test(v130.trim()))) {
        return null;
      }
      const v132 = Number(v130);
      if (Number.isInteger(v132) && v132 >= 0 && v132 <= v131) {
        return v132;
      } else {
        return null;
      }
    }
    function v7(v133) {
      return v6(v133, 9);
    }
    const v8 = v134 => v7(v134) === 1;
    function v9(v135) {
      return v6(v135, 9);
    }
    const v10 = v136 => {
      const v137 = v9(v136);
      return v137 === 0 || v137 === 1 || v137 === 3 || v137 === 6;
    };
    const v11 = v138 => {
      const v139 = v9(v138);
      return v139 === 2 || v139 === 4;
    };
    const v12 = v140 => {
      const v141 = v9(v140);
      if (v141 === 0) {
        return "gift";
      }
      if (v141 === 4) {
        return "supp";
      }
      if (v141 === 1 || v141 === 3 || v141 === 6) {
        return "on";
      }
      if (v141 === 2) {
        return "miss";
      }
      return "future";
    };
    function v13(v142 = Date.now()) {
      if (typeof v142 !== "number" || !Number.isFinite(v142)) {
        return "";
      }
      try {
        return new Date(v142 + 28800000).toISOString().slice(0, 10);
      } catch {
        return "";
      }
    }
    function v14(v143) {
      if (typeof v143 !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v143)) {
        return false;
      }
      return v13(Date.parse(v143 + "T00:00:00+08:00")) === v143;
    }
    function v15(v144) {
      if (typeof v144 === "number" && Number.isFinite(v144)) {
        return new Date(v144);
      }
      const v145 = v2(v144).trim();
      if (!v145) {
        return null;
      }
      if (/^\d{12,13}$/.test(v145)) {
        return new Date(Number(v145));
      }
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v145)) {
        const v149 = new Date(v145.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
        if (!isNaN(v149.getTime())) {
          return v149;
        }
      }
      const v146 = v145.match(/^(\d{4})[-.](\d{1,2})[-.](\d{1,2})[ T](\d{1,2}):(\d{2})(?::(\d{2}))?/);
      if (v146) {
        return new Date(+v146[1], +v146[2] - 1, +v146[3], +v146[4], +v146[5], +(v146[6] || 0));
      }
      const v147 = v145.match(/^(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})$/);
      if (v147) {
        const v150 = new Date();
        const v151 = v153 => new Date(v153, +v147[1] - 1, +v147[2], +v147[3], +v147[4]);
        const v152 = v151(v150.getFullYear());
        if (v152 - v150 > 86400000) {
          return v151(v150.getFullYear() - 1);
        } else {
          return v152;
        }
      }
      const v148 = new Date(v145);
      if (isNaN(v148.getTime())) {
        return null;
      } else {
        return v148;
      }
    }
    const v16 = 1800000;
    const v17 = 64;
    const v18 = v154 => typeof v154 === "number" && Number.isSafeInteger(v154) && v154 > 0 && v154 <= 8640000000000000;
    function v19(v155, v156 = Date.now()) {
      if (v155 === null || v155 === undefined || typeof v155 === "string" && !v155.trim()) {
        return {
          at: null,
          reason: "missing-time"
        };
      }
      let v157 = null;
      const v158 = typeof v155 === "string" ? v155.trim() : "";
      if (typeof v155 === "number" || /^\d+(?:\.\d{1,3})?$/.test(v158)) {
        const v159 = Number(v155);
        v157 = v159 < 100000000000 ? v159 * 1000 : v159;
      } else if (typeof v155 === "string") {
        const v160 = v158.match(/^(\d{4})([-.])(\d{1,2})\2(\d{1,2})[ T](\d{1,2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:?\d{2})?$/);
        if (v160) {
          const v161 = +v160[1];
          const v162 = +v160[3];
          const v163 = +v160[4];
          const v164 = +v160[5];
          const v165 = +v160[6];
          const v166 = +(v160[7] || 0);
          const v167 = +(v160[8] || "").padEnd(3, "0");
          const v168 = Date.UTC(v161, v162 - 1, v163, v164, v165, v166, v167);
          const v169 = new Date(v168);
          const v170 = v161 >= 100 && v169.getUTCFullYear() === v161 && v169.getUTCMonth() === v162 - 1 && v169.getUTCDate() === v163 && v164 < 24 && v165 < 60 && v166 < 60;
          if (v170 && v160[9]) {
            const v171 = v160[9];
            const v172 = v171 === "Z" ? null : v171.match(/^([+-])(\d{2}):?(\d{2})$/);
            if (!v172) {
              v157 = v168;
            } else if (+v172[2] <= 14 && +v172[3] < 60 && (+v172[2] < 14 || +v172[3] === 0)) {
              v157 = v168 - (v172[1] === "+" ? 1 : -1) * (+v172[2] * 60 + +v172[3]) * 60000;
            }
          } else if (v170) {
            const v173 = new Date(v161, v162 - 1, v163, v164, v165, v166, v167);
            if (v173.getFullYear() === v161 && v173.getMonth() === v162 - 1 && v173.getDate() === v163 && v173.getHours() === v164 && v173.getMinutes() === v165 && v173.getSeconds() === v166) {
              v157 = v173.getTime();
            }
          }
        }
      }
      if (!v18(v157) || !Number.isFinite(v156)) {
        return {
          at: null,
          reason: "invalid-time"
        };
      }
      if (v157 > v156) {
        return {
          at: null,
          reason: "future"
        };
      }
      return {
        at: v157,
        reason: ""
      };
    }
    function v20(v174, v175 = Date.now()) {
      return v19(v174, v175).at;
    }
    const v21 = v176 => typeof v176 === "number" ? Number.isFinite(v176) : typeof v176 === "boolean" || typeof v176 === "string" && !!v176.trim() && !/^(?:--?|null|undefined|nan|[+-]?infinity|n\/a|未知)$/i.test(v176.trim());
    const v22 = v177 => ["missing-time", "invalid-time", "future", "missing-value"].includes(v177) ? v177 : "";
    function v23(v178, v179, v180, v181, v182, v183) {
      const v184 = v19(v180, v183);
      return {
        id: v178,
        label: v179,
        ...v184,
        reason: v21(v181) ? v184.reason : "missing-value",
        source: v182
      };
    }
    function v24(v185, v186, v187 = v17) {
      const v188 = v185.get(v186.id);
      if (!v188 && v185.size >= v187) {
        return;
      }
      if (!v188 || v186.at !== null && (v188.at === null || v186.at >= v188.at) || v186.at === null && v188.at === null) {
        v185.set(v186.id, v186);
      }
    }
    function v25(v189, v190 = Date.now()) {
      const v191 = new Map();
      for (const v197 of Array.isArray(v189) ? v189 : []) {
        if (!v197 || typeof v197.id !== "string" || !v197.id || v197.id.length > 112 || typeof v197.label !== "string" || !v197.label || v197.label.length > 64) {
          continue;
        }
        const v198 = v18(v197.at) && Number.isFinite(v190) && v197.at <= v190 ? v197.at : null;
        const v199 = v198 === null ? v18(v197.at) && v197.at > v190 ? "future" : v22(v197.reason) || (v197.at == null ? "missing-time" : "invalid-time") : v22(v197.reason);
        v24(v191, {
          id: v197.id,
          label: v197.label,
          at: v198,
          reason: v199,
          source: v2(v197.source)
        });
      }
      const v192 = [...v191.values()].slice(0, v17).map(v200 => ({
        ...v200,
        status: v200.at === null || v200.reason ? "unknown" : v190 - v200.at >= v16 ? "stale" : "fresh"
      }));
      const v193 = v192.filter(v201 => v201.status === "stale").sort((v202, v203) => v202.at - v203.at);
      const v194 = v192.filter(v204 => v204.status === "unknown");
      const v195 = v192.filter(v205 => v205.status !== "unknown");
      const v196 = v195.filter(v206 => v206.status === "fresh");
      return {
        items: v192,
        staleItems: v193,
        unknownItems: v194,
        latestAt: v195.length ? Math.max(...v195.map(v207 => v207.at)) : null,
        nextAt: v196.length ? Math.min(...v196.map(v208 => v208.at + v16)) : null
      };
    }
    function v26(v209 = {}, v210 = Date.now()) {
      const {
        home: v211,
        tires: v212,
        battery: v213
      } = v209 || {};
      const v214 = v215 => Array.isArray(v215?.freshness) ? v215.freshness : [];
      return v25([...v214(v212), ...v214(v211), ...v214(v213)], v210);
    }
    const v27 = 20;
    const v28 = 1;
    function v29({
      home: v216,
      tires: v217,
      alerts = [],
      report: v218,
      seatHidden = false
    } = {}, v219 = Date.now()) {
      const v220 = [];
      if (!v216 || typeof v216 !== "object") {
        return v220;
      }
      if (!v216.online) {
        v220.push({
          id: "offline",
          label: "车辆离线",
          detail: "车辆当前不在线，车况可能不是最新的。"
        });
      }
      const v221 = (v218?.items || []).find(v225 => v225.id === "iot:BMSSOC" && v225.status === "fresh")?.at || 0;
      const v222 = (Array.isArray(alerts) ? alerts : []).some(v226 => v226 && v226.vin === v216.vin && v226.at <= v219 && v226.at >= v221);
      if (v222) {
        v220.push({
          id: "battery-removed",
          label: "电池已拔出",
          detail: "收到电池拔出提醒，还没收到更新的电池上报。"
        });
      }
      const v223 = Number.isFinite(v216.soc) ? v216.soc : null;
      if (v223 !== null && v223 < v27 && !v216.charge?.charging) {
        v220.push({
          id: "low-soc",
          label: "电量低于 20%",
          detail: "当前电量 " + v223 + "%，请及时补能。"
        });
      }
      if (!seatHidden && v216.seatLock === false) {
        v220.push({
          id: "seat-unlocked",
          label: "坐垫未锁",
          detail: "坐垫锁处于未锁状态。"
        });
      }
      const v224 = (Array.isArray(v217?.wheels) ? v217.wheels : []).filter(v227 => Number.isFinite(v227?.pressure) && v227.pressure < v28);
      if (v224.length) {
        v220.push({
          id: "tire-low",
          label: "胎压过低",
          detail: v224.map(v228 => v228.pos + " " + v228.pressure.toFixed(1) + " bar").join("、") + "，低于 " + v28.toFixed(1) + " bar。"
        });
      }
      return v220;
    }
    function v30(v229 = {}, v230 = Date.now()) {
      const v231 = v229?.report || v26({
        home: v229?.home,
        tires: v229?.tires
      }, v230);
      const v232 = v29({
        ...v229,
        report: v231
      }, v230);
      if (v232.length) {
        return {
          label: "异常",
          tone: "warn",
          reason: v232.map(v233 => v233.label).join("、"),
          items: v232
        };
      }
      return {
        label: "在线",
        tone: "ok",
        reason: "车辆在线",
        items: v232
      };
    }
    const v31 = new Map([["HeadLockState", "车辆锁"], ["BMSSOC", "电量"], ["GSMRxLev", "信号"], ["HMIRidableMile", "剩余续航"]]);
    const v32 = new Set(["VehicleLock_S", "MCUUnlockSpdLitMode", "vehicleTypeInfo"]);
    function v33(v234) {
      const v235 = v2(v234.identify).trim();
      if (v31.has(v235)) {
        return v31.get(v235);
      }
      const v236 = v2(v234.name).trim().replace(/_GO$/, "");
      if (!v235 || v235.length > 96 || !v236 || v236.length > 64 || v32.has(v235) || /(?:_Firmware|_Info)$|config|setting|version|serial|address|threshold|limit/i.test(v235) || /版本|固件|软件|硬件|序列|编号|型号|厂商|供应商|基础信息|设置|配置|阈值|上限|限制|限速|模式|开关|使能|能力|支持|地址|钥匙|密码|激活|绑定|累计|平均|统计/.test(v236)) {
        return "";
      }
      if (/^(?:实时|当前)?(?:车速|车辆速度|行驶速度|整车速度|电量|剩余电量|SOC|电池(?:电量|温度|电压|电流|功率)|BMS(?:温度|电压|电流)|(?:前轮|后轮|前|后)?胎(?:压|温|温度)|(?:电机|控制器|环境|车机|云盒|仪表|电芯)(?:温度|电压|电流)|(?:车辆|龙头|坐垫|座垫)锁(?:状态)?|(?:车辆|云盒)?在线(?:状态)?|充电(?:状态|电流|电压|功率)|放电(?:电流|功率)|(?:GSM|GPS|4G|5G|网络|通信)?信号(?:强度|状态)?|剩余续航(?:里程)?|车辆状态|骑行状态)$/i.test(v236)) {
        return v236;
      } else {
        return "";
      }
    }
    function v34(v237, v238, v239, v240 = new Set()) {
      const v241 = [];
      for (const [v242, v243, v244 = [v242], v245 = ""] of v238) {
        if (v245 && v240.has("iot:" + v245)) {
          continue;
        }
        const v246 = v244.find(v247 => v21(v237[v247]));
        if (v246) {
          v241.push({
            id: (v239 === "vehicle_home" ? "home" : "battery") + ":" + v242,
            label: v243,
            at: null,
            reason: "missing-time",
            source: v239
          });
        }
      }
      return v241;
    }
    function v35(v248, v249) {
      const v250 = new Map();
      const v251 = new Map();
      for (const v254 of Array.isArray(v248.iotProperties) ? v248.iotProperties : []) {
        if (!v254 || typeof v254 !== "object") {
          continue;
        }
        const v255 = v33(v254);
        if (!v255) {
          continue;
        }
        const v256 = v2(v254.identify).trim();
        const v257 = v31.has(v256) ? v250 : v251;
        v24(v257, v23("iot:" + v256, v255, v254.time, v254.value, "vehicle_home", v249), v257 === v250 ? 4 : 32);
      }
      const v252 = [...v250.values(), ...v251.values()];
      v252.push(...v34(v248, [["headLockState", "车辆锁", ["headLockState"], "HeadLockState"], ["bmssoc", "电量", ["bmssoc"], "BMSSOC"], ["gsmRxLev", "信号", ["gsmRxLev", "gsmRxLevel", "gsmRxLevValue"], "GSMRxLev"], ["hmiRidableMile", "剩余续航", ["hmiRidableMile"], "HMIRidableMile"], ["seatLockState", "坐垫锁"], ["onlineStatus", "在线状态"], ["rideState", "车辆状态"], ["chargeState", "充电状态"], ["batteryTemp", "电池温度"], ["totalRideMile", "总里程"], ["voltage", "电压", ["voltage", "bmsVoltage"]], ["current", "电流"], ["batteryPower", "功率"]], "vehicle_home", new Set(v252.map(v258 => v258.id))));
      const v253 = v248.location;
      if (v253 && v21(v253.longitude) && v21(v253.latitude)) {
        v252.push(v23("home:location", "车辆位置", v253.locationTime, true, "vehicle_home", v249));
      }
      return v252;
    }
    function v36(v259, v260) {
      const v261 = new Map();
      const v262 = v263 => {
        if (typeof v263 !== "number" && typeof v263 !== "string" || !v21(v263)) {
          return null;
        }
        const v264 = v1(v263);
        if (Number.isFinite(v264)) {
          return v264;
        } else {
          return null;
        }
      };
      for (const v265 of v259) {
        if (!v265 || typeof v265 !== "object") {
          continue;
        }
        const v266 = v6(v265.sensorPosition, 2);
        if (v266 !== 1 && v266 !== 2) {
          continue;
        }
        const v267 = v266 === 1;
        const v268 = v262(v265.tirePressure);
        const v269 = v262(v265.tireTemp);
        const v270 = "" + (v267 ? "前轮" : "后轮") + (v268 !== null && v269 === null ? "胎压" : v269 !== null && v268 === null ? "胎温" : "胎压 / 胎温");
        const v271 = v23("tire:" + (v267 ? "front" : "rear"), v270, v265.reportTime, v268 !== null || v269 !== null ? true : null, "tire_monitor", v260);
        v24(v261, {
          id: v271.id,
          at: v271.at,
          row: v265,
          position: v266,
          pressure: v268,
          temp: v269,
          evidence: v271
        }, 2);
      }
      return [...v261.values()].sort((v272, v273) => v272.position - v273.position);
    }
    function v37(v274) {
      const v275 = v15(v274);
      if (!v275) {
        return v2(v274);
      }
      const v276 = Math.round((Date.now() - v275.getTime()) / 1000);
      if (v276 < 0) {
        return "刚刚";
      }
      if (v276 < 60) {
        return "刚刚";
      }
      if (v276 < 3600) {
        return Math.floor(v276 / 60) + " 分钟前";
      }
      if (v276 < 86400) {
        return Math.floor(v276 / 3600) + " 小时前";
      }
      if (v276 < 604800) {
        return Math.floor(v276 / 86400) + " 天前";
      }
      return v275.getMonth() + 1 + " 月 " + v275.getDate() + " 日";
    }
    function v38(v277) {
      const v278 = v1(v277);
      if (v278 === null) {
        return "—";
      }
      if (v278 < 60) {
        return Math.round(v278) + " 分钟";
      }
      const v279 = Math.floor(v278 / 60);
      const v280 = Math.round(v278 % 60);
      if (v280) {
        return v279 + " 小时 " + v280 + " 分";
      } else {
        return v279 + " 小时";
      }
    }
    function v39(v281) {
      const v282 = v1(v281);
      if (v282 === null) {
        return "—";
      }
      if (v282 < 60) {
        return Math.round(v282) + "m";
      }
      const v283 = Math.floor(v282 / 60);
      const v284 = Math.round(v282 % 60);
      if (v284) {
        return v283 + "h" + v284 + "m";
      } else {
        return v283 + "h";
      }
    }
    function v40(v285) {
      const v286 = v2(v285).trim();
      if (!v286 || v286 === "-" || v286 === "0.0") {
        return "";
      }
      const v287 = v286.match(/^(?:(\d+)\s*h)?\s*(\d+)\s*min$/i);
      if (v287) {
        return [v287[1] ? v287[1] + " 小时" : "", v287[2] ? v287[2] + " 分钟" : ""].filter(Boolean).join(" ");
      }
      return v286;
    }
    function v41(v288) {
      const v289 = v1(v288);
      if (v289 === null || v289 <= 0) {
        return "";
      }
      if (v289 < 60) {
        return Math.round(v289) + " 秒";
      }
      return v38(v289 / 60);
    }
    function v42(v290, v291) {
      if (v291) {
        return {
          key: "charge",
          color: "var(--c-charge)",
          text: "充电中"
        };
      }
      if (v290 === null || v290 === undefined || v290 === "") {
        return {
          key: "unknown",
          color: "var(--md-sys-color-outline)",
          text: "电量未知"
        };
      }
      const v292 = v1(v290, 0);
      if (v292 >= 30) {
        return {
          key: "ok",
          color: "var(--c-success)",
          text: "电量充足"
        };
      }
      if (v292 >= 20) {
        return {
          key: "warn",
          color: "var(--c-warning)",
          text: "建议补能"
        };
      }
      return {
        key: "bad",
        color: "var(--c-danger)",
        text: "电量告急"
      };
    }
    const v43 = {
      0: "未充电",
      1: "充电中"
    };
    function v44(v293 = {}, v294 = {}) {
      const v295 = v2(v294.chargeStateStr);
      const v296 = v2(v293.chargeState ?? v294.chargeState);
      const v297 = [v296, v295].some(v307 => v307 !== "");
      const v298 = v296 === "1";
      const v299 = !v298 && /充满/.test(v295);
      const v300 = v295 || v43[v296] || "未充电";
      const v301 = v40(v293.chargeTimeString);
      const v302 = v2(v293.chargeTimeString).match(/^(?:(\d+)\s*h)?\s*(\d+)\s*min$/i);
      const v303 = v302 ? (+v302[1] || 0) * 60 + (+v302[2] || 0) : null;
      const v304 = v2(v293.expectFullTimeDescribe);
      const v305 = v1(v304);
      const v306 = v298 && Number.isInteger(v303) && v303 > 0 && Number.isInteger(v305) && v305 > 0 ? Math.min(100, Math.round(v303 / v305 * 100)) : null;
      return {
        code: v296,
        known: v297,
        charging: v298,
        full: v299,
        text: v298 ? "充电中" : v299 ? "已充满" : v300,
        chargedFor: v301,
        chargedMin: v303,
        expect: v304,
        progress: v306,
        carFull: v1(v293.fullChargeTime, null)
      };
    }
    const v45 = Math.PI;
    const v46 = v45 * 3000 / 180;
    const v47 = 6378245;
    const v48 = 0.006693421622965943;
    const v49 = (v308, v309) => v308 < 72.004 || v308 > 137.8347 || v309 < 0.8293 || v309 > 55.8271;
    function v50(v310, v311) {
      let v312 = 300 + v310 * 2 + v311 * 0.1 + v310 * 0.1 + Math.sqrt(Math.abs(v310));
      v312 += (Math.sin(v310 * 6 * v45) * 20 + Math.sin(v310 * 2 * v45) * 20) * 2 / 3;
      v312 += (Math.sin(v310 * v45) * 20 + Math.sin(v310 / 3 * v45) * 40) * 2 / 3;
      v312 += (Math.sin(v310 / 12 * v45) * 160 + Math.sin(v310 * v45 / 30) * 320) * 2 / 3;
      return v312;
    }
    function v51(v313, v314) {
      let v315 = -100 + v313 * 2 + v314 * 3 + v314 * 0.2 * v314 + v313 * 0.1 + Math.sqrt(Math.abs(v313));
      v315 += (Math.sin(v313 * 6 * v45) * 20 + Math.sin(v313 * 2 * v45) * 20) * 2 / 3;
      v315 += (Math.sin(v314 * v45) * 20 + Math.sin(v314 / 3 * v45) * 40) * 2 / 3;
      v315 += (Math.sin(v314 / 12 * v45) * 150 + Math.sin(v314 / 30 * v45) * 300) * 2 / 3;
      return v315;
    }
    function v52(v316, v317) {
      if (v49(v316, v317)) {
        return [v316, v317];
      }
      let v318 = v316;
      let v319 = v317;
      for (let v320 = 0; v320 < 3; v320++) {
        const v321 = v51(v318 - 105, v319 - 35);
        const v322 = v50(v318 - 105, v319 - 35);
        const v323 = v319 / 180 * v45;
        let v324 = Math.sin(v323);
        v324 = 1 - v48 * v324 * v324;
        const v325 = Math.sqrt(v324);
        const v326 = v321 * 180 / (v47 * (1 - v48) / (v324 * v325) * v45);
        const v327 = v322 * 180 / (v47 / v325 * Math.cos(v323) * v45);
        v319 = v317 - v326;
        v318 = v316 - v327;
      }
      return [v318, v319];
    }
    function v53(v328, v329) {
      if (v49(v328, v329)) {
        return [v328, v329];
      }
      let v330 = v328;
      let v331 = v329;
      for (let v332 = 0; v332 < 3; v332++) {
        const [v333, v334] = v52(v330, v331);
        v330 += v328 - v333;
        v331 += v329 - v334;
      }
      return [v330, v331];
    }
    function v54(v335) {
      const v336 = Array.isArray(v335?.data) ? v335.data : [];
      return v336.map(v337 => ({
        vin: v2(v337.vinNo),
        name: v2(v337.vehicleName, "未命名车辆"),
        type: v2(v337.vehicleType),
        plate: v2(v337.licensePlate),
        pic: v2(v337.vehiclePicUrl),
        shared: v3(v337.sharedFlag),
        shareNick: v2(v337.shareNickName),
        virtual: v3(v337.virtualFlag),
        raw: v337
      }));
    }
    function v55(v338, v339 = null) {
      const v340 = v338?.data || {};
      const v341 = Date.now();
      const v342 = v35(v340, v341);
      const v343 = v44(v340, v339 || {});
      const v344 = v340.location || {};
      const v345 = v1(v344.longitude);
      const v346 = v1(v344.latitude);
      const v347 = Array.isArray(v340.iotProperties) ? v340.iotProperties : [];
      const v348 = {};
      for (const v350 of v347) {
        if (!v350 || typeof v350 !== "object") {
          continue;
        }
        v348[v2(v350.identify)] = {
          name: v2(v350.name),
          value: v2(v350.value),
          time: v1(v350.time, null),
          describe: v2(v350.describe)
        };
      }
      const v349 = ["online", "1", "true"].includes(v2(v340.onlineStatus).toLowerCase()) || v2(v340.onlineStatus) === "ONLINE";
      return {
        vin: v2(v340.vinNo),
        name: v2(v340.vehicleName, "我的车"),
        type: v2(v340.vehicleType),
        typeName: v2(v340.vehicleTypeName),
        plate: v2(v340.licensePlate),
        pic: v2(v340.vehiclePicUrl),
        pic3d: v2(v340.vehiclePic3dUrl),
        scalePic: v2(v340.vehicleScalePicUrl),
        soc: v1(v340.bmssoc, null),
        range: v1(v340.hmiRidableMile, null),
        maxRange: v1(v340.maxRangeMileage ?? v340.maxMileage, null),
        temp: v1(v340.batteryTemp, null),
        tempState: v2(v340.batteryTempState),
        padding: true,
        charge: v343,
        socColor: v42(v1(v340.bmssoc, null), v343.charging),
        headLock: v3(v340.headLockState),
        vehLock: v3((v348.VehicleLock_S || {}).value),
        seatLock: v340.seatLockState === null || v340.seatLockState === undefined || v340.seatLockState === "" ? null : v3(v340.seatLockState),
        cushionOpen: v3(v340.openCushionFlag),
        storageOpen: v3(v340.openStorageBoxFlag),
        canNetUnlock: v3(v340.supportNetworkUnlock),
        canSearch: v3(v340.loudlySearchCar),
        canUnlock: v3(v340.supportUnlock),
        hasInductive: v3(v340.hasInductiveUnlocking) || v3(v340.inductiveUnlocking2),
        online: v349,
        rideState: v2(v340.rideState),
        lastUse: v2(v340.lastUseDate),
        refreshAt: v2(v340.refreshTime),
        relRefresh: v37(v340.refreshTime),
        loc: {
          lng: v345,
          lat: v346,
          has: v345 !== null && v346 !== null,
          altitude: v1(v344.altitude),
          crs: v2(v344.coordinateSystem),
          time: v2(v344.locationTime),
          relTime: v37(v344.locationTime),
          address: v2(v340.address || v344.address || v344.addressName),
          parkPhoto: v2(v340.vehicleParkingPhoto)
        },
        signal: {
          level: v1(v340.gsmRxLevel),
          text: v2(v340.gsmRxLevValue),
          dbm: v1(v340.gsmRxLev)
        },
        totalMile: v1(v340.totalRideMile, null),
        monthMile: v1(v340.rideMileageMonth, null),
        monthMinutes: v1(v340.ridingTimeMonthUnitMinute, null),
        avgSpeed: v1(v340.avgVelocityMonth, null),
        maxMileage: v1(v340.maxMileage, null),
        otaVersion: v2(v340.otaVersion),
        iot: v347,
        iotMap: v348,
        freshness: v342,
        firmware: v347.filter(v351 => v351 && /_Firmware$/.test(v2(v351.identify))).map(v352 => ({
          name: v2(v352.name).replace(/版本号.*/, "").replace(/_GO$/, ""),
          value: v2(v352.value),
          key: v2(v352.identify)
        })),
        bt: v2(v340.bluetoothAddress),
        btName: v2(v340.multimediaBluetoothName),
        activationDate: v2(v340.activationDate),
        firstBind: v2(v340.firstBindDate || v340.bindStartTime),
        serviceEnd: v2(v340.rechargeEndDate),
        serviceStatus: v2(v340.serviceRechargeStatus),
        themeName: "",
        fate: v1(v340.fate),
        green: v1(v340.greenContribution),
        functions: Array.isArray(v340.homePagePermanentFunctionList) ? v340.homePagePermanentFunctionList : [],
        watt: v105({
          homeRaw: v340
        }).isAE7 ? v1(v340.batteryPower ?? v340.power, null) : v65(v340.voltage ?? v340.bmsVoltage, v340.current, v340.batteryPower),
        amp: v105({
          homeRaw: v340
        }).isAE7 ? v1(v340.current, null) : v67(v340.voltage ?? v340.bmsVoltage, v340.current, v340.batteryPower),
        stale: (() => {
          const v353 = [["HeadLockState", "车锁"], ["BMSSOC", "电量"], ["GSMRxLev", "信号"]];
          const v354 = [];
          for (const [v356, v357] of v353) {
            const v358 = v342.find(v359 => v359.id === "iot:" + v356);
            if (!v358 || v358.at === null || v358.reason) {
              continue;
            }
            v354.push({
              identify: v356,
              label: v357,
              at: v358.at,
              ageMs: v341 - v358.at
            });
          }
          if (!v354.length) {
            return null;
          }
          const v355 = v354.reduce((v360, v361) => v361.ageMs > v360.ageMs ? v361 : v360);
          return {
            items: v354,
            at: v355.at,
            ageMs: v355.ageMs,
            worst: v355.label,
            stale: v355.ageMs >= 1800000
          };
        })(),
        raw: v340
      };
    }
    const v56 = 1.5;
    const v57 = 3;
    const v58 = 1.9;
    const v59 = 2.5;
    function v60(v362 = {}) {
      const v363 = (v366, v367) => Math.round(v1(v366, v367) * 10) / 10;
      let v364 = v5(v363(v362.lo, v58), v56, v57);
      let v365 = v5(v363(v362.hi, v59), v56, v57);
      if (v364 > v365) {
        [v364, v365] = [v365, v364];
      }
      return {
        lo: v364,
        hi: v365
      };
    }
    function v61(v368 = {}) {
      return {
        front: v60(v368?.front),
        rear: v60(v368?.rear)
      };
    }
    function v62(v369, v370, v371) {
      if (v369 === null || v369 === undefined) {
        return "";
      }
      if (v369 < v56 || v369 > v57) {
        return "bad";
      }
      if (v369 < v370 || v369 > v371) {
        return "warn";
      }
      return "ok";
    }
    function v63(v372, v373 = {}) {
      const v374 = v372?.data || {};
      const v375 = v61(v373);
      const v376 = v36(Array.isArray(v374.realTimeData) ? v374.realTimeData : [], Date.now());
      const v377 = v376.map(({
        row: v378,
        position: v379,
        pressure: v380,
        temp: v381,
        evidence: v382
      }) => {
        const v383 = v379 === 1 ? "前轮" : "后轮";
        const v384 = v383 === "前轮" ? v375.front : v375.rear;
        return {
          pos: v383,
          pressure: v380,
          temp: v381,
          warnCode: v1(v378.warningType, 0) || 0,
          band: v384,
          level: v62(v380, v384.lo, v384.hi),
          time: v382.at === null ? "" : String(v382.at)
        };
      });
      return {
        updateTime: v2(v374.updateTime),
        relTime: v37(v374.updateTime),
        wheels: v377,
        bands: v375,
        freshness: v376.map(v385 => v385.evidence)
      };
    }
    function v64(v386, v387 = {}) {
      const v388 = v386?.data || {};
      const v389 = v61(v387);
      const v390 = v1(v388.startTime, 0) ? v1(v388.startTime) * 1000 : null;
      const v391 = v1(v388.endTime, 0) ? v1(v388.endTime) * 1000 : null;
      const v392 = Array.isArray(v388.data) ? v388.data : [];
      const v393 = v392.map(v394 => {
        const v395 = v1(v394.sensorPosition) === 1 ? "前轮" : "后轮";
        const v396 = v395 === "前轮" ? v389.front : v389.rear;
        const v397 = v398 => {
          const v399 = Array.isArray(v398?.list) ? v398.list : [];
          const v400 = new Map();
          for (const v402 of v399) {
            const v403 = v1(v402?.time);
            const v404 = v1(v402?.value);
            if (!v403 || v404 === null) {
              continue;
            }
            v400.set(v403 * 1000, {
              t: v403 * 1000,
              v: v404,
              shown: v1(v402.displayedValue)
            });
          }
          const v401 = [...v400.values()].sort((v405, v406) => v405.t - v406.t);
          return {
            pts: v401,
            max: v1(v398?.max),
            min: v1(v398?.min),
            avg: v1(v398?.avg),
            safeMin: v1(v398?.safeMin),
            safeMax: v1(v398?.safeMax)
          };
        };
        return {
          pos: v395,
          band: v396,
          pressure: v397(v394.tirePressureStat),
          temp: v397(v394.tireTempStat)
        };
      });
      v393.sort((v407, v408) => (v407.pos === "前轮" ? -1 : 1) - (v408.pos === "前轮" ? -1 : 1));
      return {
        from: v390,
        to: v391,
        series: v393,
        bands: v389
      };
    }
    function v65(v409, v410, v411) {
      const v412 = v1(v411, null);
      if (v412 !== null && Math.abs(v412) > 0) {
        return Math.round(v412);
      }
      const v413 = v1(v409, null);
      const v414 = v1(v410, null);
      if (v413 === null || v414 === null) {
        return null;
      }
      return Math.round(v413 * v414);
    }
    const v66 = 0.2;
    function v67(v415, v416, v417) {
      const v418 = v1(v416, null);
      const v419 = v1(v417, null);
      if (v419 === null || Math.abs(v419) <= 0) {
        return v418;
      }
      const v420 = v1(v415, null);
      if (v420 === null || v420 <= 0) {
        return v418;
      }
      if (v418 === null || Math.abs(v420 * v418 - v419) > Math.abs(v419) * v66) {
        return Math.round(v419 / v420 * 10) / 10;
      }
      return v418;
    }
    function v68(v421, v422 = "") {
      const v423 = v421?.data || {};
      const v424 = v105({
        homeRaw: {
          vehicleType: v422
        }
      }).isAE7;
      return {
        soc: v1(v423.bmssoc, null),
        voltage: v1(v423.voltage ?? v423.bmsVoltage, null),
        bmsVoltage: v1(v423.bmsVoltage, null),
        current: v1(v423.current, null),
        power: v1(v423.power, null),
        watt: v424 ? v1(v423.power, null) : v65(v423.voltage ?? v423.bmsVoltage, v423.current, v423.power),
        amp: v424 ? v1(v423.current, null) : v67(v423.voltage ?? v423.bmsVoltage, v423.current, v423.power),
        soh: v1(v423.soh, null),
        level: v1(v423.batteryLevel, null),
        score: v2(v423.score),
        chargeCount: v1(v423.chargeCount, null),
        useToday: v1(v423.powerUseToday, null),
        useMonth: v1(v423.powerUseMonth, null),
        chargeMonth: v1(v423.powerChargeMonth, null),
        temp: v1(v423.batteryTemp, null),
        refreshAt: v2(v423.refreshTime),
        freshness: v34(v423, [["bmssoc", "电池电量"], ["voltage", "电压", ["voltage", "bmsVoltage"]], ["current", "电流"], ["power", "功率"], ["batteryTemp", "电池温度"], ["chargeState", "充电状态"]], "battery_info"),
        raw: v423
      };
    }
    function v69(v425) {
      const v426 = v425?.data || {};
      return {
        todayMile: v1(v426.rideMileageDay, null),
        lastMile: v1(v426.lastRideMileage, null),
        lastMinutes: v1(v426.lastRidingTimeUnitMinute, null),
        mileages: (v426.mileages || []).map(v427 => v1(v427, 0)),
        times: (v426.ridingTimes || []).map(v428 => v1(v428, 0))
      };
    }
    function v70(v429) {
      const v430 = v429?.data || {};
      const v431 = (Array.isArray(v430.rideRecordList) ? v430.rideRecordList : []).map(v432 => ({
        date: v2(v432.date),
        day: v1(v2(v432.date).slice(-2), 0),
        mile: v1(v432.rideMileage, 0),
        minutes: v1(v432.ridingTimeDayUnitMinute, 0),
        maxSpeed: v1(v432.maxSpeed, 0),
        accel: v1(v432.accelerationTimesDay, 0)
      }));
      return {
        total: v1(v430.rideMileageTotal, null),
        days: v431.slice(-7),
        all: v431
      };
    }
    function v71(v433) {
      const v434 = v433?.data || {};
      return {
        month: v2(v434.rideMonth),
        mile: v1(v434.rideMileage, null),
        minutes: v1(v434.ridingTimeUnitMinute, null),
        maxSpeed: v1(v434.maxSpeed, null),
        accel: v1(v434.accelerationTimes, null),
        brakes: v1(v434.brakesTimes, null),
        bends: v1(v434.bendingTimes, null),
        extreme: v1(v434.extremeSpeedNumber, null),
        longDrive: v1(v434.longDrive, null),
        raw: v434
      };
    }
    const v72 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function v73(v435) {
      const v436 = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(v2(v435));
      if (!v436) {
        return {
          mmdd: v2(v435),
          wd: ""
        };
      }
      const v437 = new Date(+v436[1], +v436[2] - 1, +v436[3]);
      return {
        mmdd: v436[2] + "." + v436[3],
        wd: v72[v437.getDay()],
        iso: v436[1] + "-" + v436[2] + "-" + v436[3]
      };
    }
    function v74(v438, v439) {
      const v440 = v438?.data || {};
      const v441 = (Array.isArray(v440.rideRecordList) ? v440.rideRecordList : []).map(v445 => {
        const v446 = v73(v445.date);
        return {
          date: v2(v445.date),
          mmdd: v446.mmdd,
          wd: v446.wd,
          mile: v1(v445.rideMileage, 0),
          minutes: v1(v445.ridingTimeDayUnitMinute, 0),
          maxSpeed: v1(v445.maxSpeed, 0),
          accel: v1(v445.accelerationTimesDay, 0),
          brakes: v1(v445.brakesTimesDay, 0),
          bends: v1(v445.bendingTimesDay, 0)
        };
      });
      v441.sort((v447, v448) => {
        if (v447.date === v448.date) {
          return 0;
        }
        if (!v447.date) {
          return 1;
        }
        if (!v448.date) {
          return -1;
        }
        if (v447.date < v448.date) {
          return 1;
        } else {
          return -1;
        }
      });
      const v442 = v441.filter(v449 => v449.mile > 0);
      const v443 = v439?.data || {};
      const v444 = v450 => v442.reduce((v451, v452) => v451 + v452[v450], 0);
      return {
        rows: v441,
        activeCount: v442.length,
        mile: v1(v443.rideMileage) ?? v444("mile"),
        minutes: v1(v443.ridingTimeUnitMinute) ?? v444("minutes"),
        maxSpeed: v1(v443.maxSpeed) ?? (v442.length ? Math.max(...v442.map(v453 => v453.maxSpeed)) : null),
        accel: v1(v443.accelerationTimes),
        brakes: v1(v443.brakesTimes),
        bends: v1(v443.bendingTimes),
        extreme: v1(v443.extremeSpeedNumber),
        totalMile: v1(v440.rideMileageTotal),
        ok: !!v438?.ok,
        err: v438?.ok ? "" : v438?.message || v438?.err || "取不到"
      };
    }
    function v75(v454) {
      const v455 = [];
      for (const v456 of v2(v454).split("&")) {
        const v457 = v456.split(",");
        if (v457.length < 2) {
          continue;
        }
        const v458 = v1(v457[0]);
        const v459 = v1(v457[1]);
        if (v458 === null || v459 === null) {
          continue;
        }
        v455.push({
          lng: v458,
          lat: v459,
          speed: v1(v457[2]),
          ts: v1(v457[3]),
          dist: v1(v457[4])
        });
      }
      return v455;
    }
    function v76(v460) {
      const v461 = v2(v460);
      if (!v461) {
        return "";
      }
      try {
        const v462 = JSON.parse(v461);
        return v2(v462.name || v462.address);
      } catch {
        return "";
      }
    }
    function v77(v463) {
      const v464 = v463?.data;
      if (!Array.isArray(v464)) {
        return [];
      }
      const v465 = [];
      for (const v466 of v464) {
        for (const v467 of v466?.historyList || []) {
          v465.push({
            id: v2(v467.rideId),
            day: v2(v467.dayTime),
            start: v2(v467.startTime),
            end: v2(v467.endTime),
            mile: v1(v467.rideMileage, 0),
            minutes: v1(v467.ridingTimeUnitMinute, 0),
            maxSpeed: v1(v467.maxSpeed, 0),
            accel: v1(v467.accelerationTimes, 0),
            brakes: v1(v467.brakesTimes, 0),
            bends: v1(v467.bendingTimes, 0),
            green: v1(v467.greenContribution, null),
            from: v76(v467.startAddr),
            to: v76(v467.endAddr),
            thumb: v2(v467.trackThumbnails),
            odo: v1(v467.totalRideMileage),
            points: v75(v467.trajectory)
          });
        }
      }
      v465.sort((v468, v469) => {
        const v470 = v2(v468.start);
        const v471 = v2(v469.start);
        if (v470 === v471) {
          return 0;
        }
        if (!v470) {
          return 1;
        }
        if (!v471) {
          return -1;
        }
        if (v470 < v471) {
          return 1;
        } else {
          return -1;
        }
      });
      return v465;
    }
    const v78 = v472 => String(v472).padStart(2, "0");
    function v79(v473) {
      const [v474, v475] = v2(v473).split(".");
      if (v474 && v475) {
        return v474 + " 年 " + Number(v475) + " 月";
      } else {
        return v2(v473);
      }
    }
    function v80(v476, v477) {
      const [v478, v479] = v2(v476).split(".").map(Number);
      if (!v478 || !v479) {
        return v2(v476);
      }
      const v480 = new Date(v478, v479 - 1 + v477, 1);
      return v480.getFullYear() + "." + v78(v480.getMonth() + 1);
    }
    function v81(v481 = 18, v482 = null) {
      const v483 = v482 || new Date().getFullYear() + "." + v78(new Date().getMonth() + 1);
      const v484 = [];
      for (let v485 = 0; v485 < v481; v485++) {
        v484.push(v80(v483, -v485));
      }
      return v484;
    }
    function v82(v486, v487) {
      const v488 = v486?.data || {};
      const v489 = v487?.data || {};
      return {
        ok: !!v2(v488.nickName),
        nick: v2(v488.nickName || v488.memoName),
        avatar: v2(v488.avatar),
        showId: v2(v488.userShowId),
        posts: v1(v488.postsNum),
        follows: v1(v488.followersNum),
        fans: v1(v488.fansNum),
        sign: v2(v488.signature),
        score: v1(v489.integralTotal, null),
        uuid: v2(v489.uuid)
      };
    }
    const v83 = [{
      id: "ride",
      t: "骑行偏好",
      icon: "speed"
    }, {
      id: "assist",
      t: "辅助驾驶",
      icon: "radar"
    }, {
      id: "key",
      t: "解锁与钥匙",
      icon: "key"
    }, {
      id: "safety",
      t: "安防设置",
      icon: "shield"
    }, {
      id: "sensor",
      t: "便捷骑行",
      icon: "seat"
    }, {
      id: "meter",
      t: "仪表设置",
      icon: "gauge"
    }, {
      id: "sound",
      t: "音效",
      icon: "volume"
    }, {
      id: "light",
      t: "灯效设置",
      icon: "bulb"
    }, {
      id: "shortcut",
      t: "快捷方式设置",
      icon: "flash"
    }, {
      id: "battery",
      t: "电池与充电",
      icon: "battery"
    }, {
      id: "smart",
      t: "投屏与智能",
      icon: "bt"
    }, {
      id: "recorder",
      t: "记录仪设置",
      icon: "camera"
    }, {
      id: "device",
      t: "固件与设备",
      icon: "chip"
    }];
    const v84 = {
      MAXIMUM_SPEED: "设置骑行时的最高车速，让您的骑行更安全。",
      CRUISE_CONTROL_HOLD: "进入定速巡航时，拧动转把车辆加速，松开转把，车速将回到原来定速巡航速度。",
      E_TCS_TRACTION_CONTROL: "开启后，通过电控算法精确地控制车辆动力输出，防止湿滑或泥泞路面造成车辆打滑等危险情况，让车辆起步更稳定，驾驶更安全。",
      PRECISION_ENDURANCE: "开启后，将根据用户骑行习惯计算续航里程。",
      BRAKE_POWER: "开启后，刹车时会切断整车动力。",
      STEEP_SLOPE_DESCENT: "开启后车辆下坡时，将智能调节车辆速度，下坡更平稳。",
      INDUCED_VIBRATION_GO: "你可以调整车辆对震动的敏感程度，强度越高，车辆对震动越敏感。",
      AUTOMATIC_SHUTDOWN_TIMEOUT: "车辆较长时间内开机停放不使用（如忘关机）时将自动关机，防止电池耗尽或车辆被盗用。",
      EMERGENCY_BRAKE_FLASH: "开启后，车辆在紧急制动时，车身灯会快速闪烁，以提醒后方车辆驾驶员注意，降低追尾风险。",
      E_CUSHION_SENSOR: "开启后，当座垫识别到有外部压力时，车辆才可进入可骑行状态；关闭后，车辆进入可骑行状态将不再判断座垫是否有压力。",
      COME_HOME_WITH_YOU: "车辆下电之后，大灯根据设置时间延时关闭，为您提供照明。",
      KINETIC_ENERGY_RECOVERY: "开启后，将增强车辆刹车效果，提升车辆续航能力，设置强度越高则效果越明显，雨天等湿滑路面开启该功能易打滑，请调整强度，注意安全。",
      AUTOMATIC_PARKING_GO: "开启后，长捏刹车车辆将自动激活驻车功能，保持车辆静止状态。",
      INSTRUMENT_SET_CUSTOM_WALLPAPER: "仪表视界，由你定义。",
      NITRO: "开启氮气加速可短时间提高车辆性能，但开启后会降低续航，请结合实际场景使用。",
      CUSTOM_KEY_SET: "个性化自定义按键设置，快捷设置车辆。"
    };
    const v85 = [{
      label: "切换信息组",
      value: 7,
      tier: "firmware"
    }, {
      label: "Hello 音效",
      value: 1,
      tier: "cloud"
    }, {
      label: "解锁坐垫",
      value: 3,
      tier: "cloud"
    }, {
      label: "陡坡缓降",
      value: 19,
      tier: "cloud"
    }, {
      label: "媒体音量静音",
      value: 10,
      tier: "firmware"
    }, {
      label: "音量增减",
      value: 20,
      tier: "firmware"
    }, {
      label: "无操作",
      value: 31,
      tier: "cloud"
    }, {
      label: "TCS 设置",
      value: 5,
      tier: "mcu"
    }, {
      label: "车辆音效静音",
      value: 9,
      tier: "mcu"
    }, {
      label: "动能回收设置",
      value: 11,
      tier: "mcu"
    }, {
      label: "BSD 设置",
      value: 12,
      tier: "mcu"
    }, {
      label: "FCW 设置",
      value: 13,
      tier: "mcu"
    }, {
      label: "RCW 设置",
      value: 14,
      tier: "mcu"
    }, {
      label: "音乐播放",
      value: 28,
      tier: "mcu"
    }];
    const v86 = [{
      label: "媒体音量调节",
      value: 20,
      tier: "firmware"
    }, {
      label: "音乐切歌",
      value: 21,
      tier: "mcu"
    }, {
      label: "ACC 车距调节",
      value: 6,
      tier: "mcu"
    }, {
      label: "无操作",
      value: 31,
      tier: "cloud"
    }];
    function v87(v490) {
      if (!Array.isArray(v490) || !v490.length) {
        return v85;
      }
      const v491 = new Map(v85.map(v492 => [v492.value, {
        ...v492
      }]));
      for (const v493 of v490) {
        const v494 = Number(v493.commandCode ?? v493.value);
        if (!Number.isFinite(v494)) {
          continue;
        }
        const v495 = v491.get(v494);
        if (v495) {
          v495.label = v493.label || v493.commandName || v495.label;
        } else {
          v491.set(v494, {
            label: v493.label || v493.commandName || "功能 " + v494,
            value: v494,
            tier: "cloud"
          });
        }
      }
      return [...v491.values()].sort((v496, v497) => v496.value - v497.value);
    }
    const v88 = [{
      watt: 350,
      index: 1
    }, {
      watt: 450,
      index: 2
    }, {
      watt: 550,
      index: 3
    }, {
      watt: 650,
      index: 4
    }, {
      watt: 750,
      index: 5
    }, {
      watt: 1900,
      index: 6
    }];
    const v89 = [["白", "#FFFFFF"], ["红", "#EA3323"], ["琥珀", "#F7D246"], ["绿", "#7EDF42"], ["晴蓝", "#52B5F9"], ["紫", "#7616F6"], ["金", "#D09748"], ["奶油", "#F1DDA8"], ["柠檬", "#FCF350"], ["黄绿", "#D7F150"], ["橙", "#E4782F"], ["珊瑚", "#DC7882"], ["玫红", "#EA3386"], ["紫红", "#EC5BF8"], ["薄荷", "#D2F8E9"], ["雾青", "#C0E2E3"], ["青绿", "#75FBC8"], ["冰蓝", "#BDEBFB"], ["湖蓝", "#6BD6FA"], ["蓝", "#334BF3"], ["藏青", "#1A2167"], ["藕粉", "#CEABA9"], ["淡紫", "#AC9DF8"], ["蓝紫", "#6E79ED"]];
    const v90 = v89.map(([v498, v499], v500) => ({
      id: v500 + 1,
      name: v498,
      hex: v499
    }));
    function v91(v501) {
      const v502 = Number(v501);
      const v503 = Number.isFinite(v502) ? v90.find(v505 => v505.id === v502) : null;
      if (v503) {
        return {
          ...v503,
          label: v503.name || "色号 " + v503.id
        };
      }
      const v504 = v501 !== undefined && v501 !== null && v501 !== "";
      return {
        id: Number.isFinite(v502) ? v502 : null,
        name: "",
        hex: null,
        label: v504 ? "色号 " + v501 : "—"
      };
    }
    const v92 = {
      MAXIMUM_SPEED: {
        g: "ride",
        t: "最高车速限制",
        kind: "value",
        key: "maximumSpeedLimit",
        unit: "km/h",
        subs: [{
          key: "maximumSpeed",
          t: "限速档"
        }, {
          key: "topSpeed",
          t: "整车上限",
          unit: "km/h"
        }],
        obs: "实测（2026-10-15，模块日志）：在官方 App 里拨这一行时，App 发过 propertyOne commond=71 commondParam=1（两次一致，能复现）→ 云端通道是存在的，只是 71 到底改的是哪个设置还没定案，所以先不给写。"
      },
      DRIVING_MODE_SETTING: {
        g: "ride",
        t: "驾驶模式及骑行参数设置",
        kind: "select",
        key: "powerMode",
        options: {
          0: "标准",
          1: "经济",
          2: "运动"
        },
        subs: [{
          key: "ecoMaxSpeed",
          t: "ECO 极速",
          unit: "km/h"
        }, {
          key: "streetMaxSpeed",
          t: "Street 极速",
          unit: "km/h"
        }, {
          key: "sportMaxSpeed",
          t: "Sport 极速",
          unit: "km/h"
        }]
      },
      KINETIC_ENERGY_RECOVERY: {
        g: "ride",
        desc: "回收减速能量，湿滑路面慎用",
        t: "动能回收",
        kind: "select",
        key: "kineticEnergyRecovery",
        options: {
          0: "关闭",
          1: "标准",
          2: "增强"
        },
        subs: [{
          key: "energyRecoveryEco",
          t: "ECO 档回收"
        }, {
          key: "energyRecoveryStreet",
          t: "Street 档回收"
        }, {
          key: "energyRecoverySport",
          t: "Sport 档回收"
        }]
      },
      CRUISE_CONTROL_HOLD: {
        g: "ride",
        desc: "加速后松开转把，恢复巡航速度",
        t: "动态定速巡航",
        kind: "switch",
        key: "cruiseControlHold",
        subs: [{
          key: "cruiseControlFunction",
          t: "定速巡航功能"
        }, {
          key: "cruiseMode",
          t: "巡航模式"
        }, {
          key: "cruiseAcc",
          t: "巡航加速度档"
        }]
      },
      E_TCS_TRACTION_CONTROL: {
        g: "ride",
        desc: "控制动力输出，减少湿滑路面打滑",
        t: "eTCS牵引力控制系统",
        kind: "switch",
        key: "etcsTractionControl",
        subs: [{
          key: "tcsTractionControl",
          t: "TCS 开关"
        }]
      },
      LOW_BATTERY_LONG_RANGE: {
        g: "ride",
        t: "低电量长续航",
        kind: "switch",
        key: "extendedRange"
      },
      PRECISION_ENDURANCE: {
        g: "ride",
        desc: "根据骑行习惯估算续航里程",
        t: "精准续航",
        kind: "switch",
        key: "precisionEndurance",
        obs: "2026-10-25 定案：55 就是精准续航（用户真机抓包，官方 App 发 commond=55 且 version 为空串）。旧结论\"55=离车关机时长\"是拿能力表平台码对照推的，已被推翻——离车关机时长其实是 33。"
      },
      BRAKE_POWER: {
        g: "ride",
        desc: "刹车时切断动力输出",
        t: "电子制动",
        kind: "switch",
        key: "barkePower"
      },
      STEEP_SLOPE_DESCENT: {
        g: "ride",
        t: "陡坡缓降",
        kind: "switch",
        key: "steepSlopeDescent",
        obs: "实测（2026-10-15，模块日志）：手机蓝牙关着时在官方 App 里拨它，App 一个请求都没发（日志一片空）→ 倾向\"确实没有云端通道\"，但没做完（蓝牙开着会走 BLE，那条路我们看不到）。"
      },
      QUICK_RIDE: {
        g: "ride",
        t: "简易骑行",
        kind: "switch",
        key: "easyReadyGo"
      },
      CUSTOM_KEY_SET: {
        g: "shortcut",
        desc: "单键 14 项，推荐 7 切信息组",
        t: "自定义按键",
        kind: "value",
        key: "customButtonSingle",
        choices: v85,
        subs: [{
          key: "customButtonLongPress",
          t: "长按"
        }, {
          key: "customButtonLeft",
          t: "左键"
        }, {
          key: "customButtonRight",
          t: "右键"
        }, {
          key: "customButtonCombination",
          t: "组合键"
        }]
      },
      CUSTOM_BUTTON_LOW: {
        g: "shortcut",
        t: "自定义按键 · 可选功能",
        kind: "none",
        note: "能力表下发项：Hello 音效 / 陡坡缓降 / 解锁座垫 / 无操作"
      },
      INDUCTIVE_UNLOCKING_2: {
        g: "key",
        t: "感应解锁2.0",
        kind: "switch",
        key: "inductiveUnlocking2",
        subs: [{
          key: "inductiveUnlocking",
          t: "感应解锁1.0"
        }, {
          key: "inductiveDistance",
          t: "感应距离档"
        }, {
          key: "customInductiveDistance",
          t: "自定义距离"
        }, {
          key: "bluetoothStrengthMin",
          t: "蓝牙强度下限"
        }, {
          key: "bluetoothStrengthMax",
          t: "蓝牙强度上限"
        }, {
          key: "customBluetoothStrength",
          t: "自定义蓝牙强度"
        }]
      },
      INDUCED_VIBRATION_GO: {
        g: "safety",
        desc: "调整震动报警灵敏度",
        t: "震动防盗报警",
        kind: "select",
        key: "inducedVibration",
        options: {
          0: "微弱",
          1: "标准",
          2: "灵敏",
          3: "关闭"
        }
      },
      PASSWORD_UNLOCKING: {
        g: "key",
        t: "密码解锁",
        kind: "switch",
        key: "passwordUnlocking",
        subs: [{
          key: "passwordUnlockSwitch",
          t: "密码解锁开关"
        }]
      },
      CUSTOM_NFC: {
        g: "key",
        t: "NFC卡片钥匙",
        kind: "switch",
        key: "originNfc"
      },
      LOUDLY_SEARCH_CAR: {
        g: "key",
        t: "寻车鸣笛",
        kind: "switch",
        key: "loudlySearchCar",
        from: "home"
      },
      KEY_SHARE: {
        g: "key",
        t: "钥匙分享",
        kind: "action"
      },
      SHARE: {
        g: "key",
        t: "车辆分享",
        kind: "action"
      },
      AUTOMATIC_PARKING_GO: {
        g: "safety",
        desc: "长捏刹车后保持车辆静止",
        t: "自动驻车",
        kind: "switch",
        key: "automaticParking",
        obs: "2026-10-25 定案：自动驻车 = commond 51（用户真机抓包）。2026-10-15 日志里就见过 51，当时因与能力表登记的 103 对不上没敢定案——103 其实是「超时关机保护」的开关。"
      },
      AUTOMATIC_SHUTDOWN_TIMEOUT: {
        g: "safety",
        desc: "开机久停自动关机",
        t: "超时关机保护",
        kind: "select",
        key: "automaticShutdownSwitch",
        options: {
          0: "关闭",
          1: "开启"
        }
      },
      AUTO_SHUTDOWN_TIME_GO: {
        g: "safety",
        t: "离车关机",
        kind: "switch",
        key: "automaticShutdown"
      },
      EMERGENCY_BRAKE_FLASH: {
        g: "light",
        desc: "急刹时灯光闪烁提醒后车",
        t: "紧急制动提示",
        kind: "switch",
        key: "emergencyBrakeFlash"
      },
      AVOID_THEFT_SECURITY: {
        g: "safety",
        t: "防盗功能",
        kind: "switch",
        key: "automaticLock"
      },
      ELECTRONIC_FENCE: {
        g: "safety",
        t: "电子围栏",
        kind: "none",
        note: "接口没返回当前值"
      },
      E_CUSHION_SENSOR: {
        g: "sensor",
        desc: "坐垫受压后才可进入骑行状态",
        t: "座垫感应",
        kind: "switch",
        key: "cushionSensor",
        subs: [{
          key: "ecushionSensor",
          t: "电子座垫感应"
        }]
      },
      EDGE_SUPPORT_SENSING: {
        g: "sensor",
        t: "边撑感应",
        kind: "switch",
        key: "edgeSupportSensing",
        desc: "检测边撑是否收起"
      },
      SOUND_EFFECT: {
        g: "sound",
        t: "音效设置",
        kind: "switch",
        key: "soundEffectStatus",
        subs: [{
          key: "soundEffectSetting.switchAll",
          t: "总开关"
        }, {
          key: "soundEffectSetting.soundSize",
          t: "音量"
        }]
      },
      CUSTOM_AUDIO: {
        g: "sound",
        t: "自定义音效",
        kind: "action"
      },
      AUDIO_SET: {
        g: "sound",
        t: "蓝牙音乐声音通道",
        kind: "value",
        key: "mediaBluetoothMusicChannel"
      },
      INSTRUMENT_SETTING: {
        g: "meter",
        t: "仪表设置",
        kind: "value",
        key: "instrumentNavigation"
      },
      INSTRUMENT_SET: {
        g: "meter",
        t: "仪表设置项",
        kind: "switch",
        key: "instrumentGame"
      },
      INSTRUMENT_SET_CUSTOM_WALLPAPER: {
        g: "meter",
        t: "自定义壁纸",
        kind: "switch",
        key: "supportCustomWallpaper",
        from: "home"
      },
      RADAR_BLIND_MONITOR: {
        g: "assist",
        t: "BSD盲区监测",
        kind: "select",
        key: "radarBsd",
        desc: "监测车辆侧后方盲区并发出提醒",
        options: {
          0: "关闭",
          1: "标准",
          2: "灵敏"
        },
        subs: [{
          key: "radarFcw",
          t: "FCW前碰撞预警"
        }, {
          key: "radarPosition",
          t: "雷达安装位置"
        }]
      },
      ASSIST_DRIVING: {
        g: "assist",
        t: "辅助驾驶",
        kind: "switch",
        key: "driverAssistSetting.bsdSetting",
        subs: [{
          key: "driverAssistSetting.fcwSetting",
          t: "前碰撞"
        }, {
          key: "driverAssistSetting.rcwSetting",
          t: "后碰撞"
        }, {
          key: "driverAssistSetting.rearviewMirrorWarningLight",
          t: "后视镜警示灯"
        }, {
          key: "driverAssistSetting.env3dModel",
          t: "3D 环境模型"
        }, {
          key: "driverAssistSetting.laneAssist",
          t: "车道辅助"
        }]
      },
      BATTERY_INFO_AND_SETTINGS: {
        g: "battery",
        t: "电池信息与设置",
        kind: "value",
        key: "chargingPower",
        unit: "W",
        noWrite: true,
        subs: [{
          key: "batteryType",
          t: "电池类型"
        }]
      },
      BMS_VOLTAGE: {
        g: "battery",
        t: "电池电压",
        kind: "value",
        key: "bmsVoltage",
        unit: "V",
        from: "battery"
      },
      LOW_BATTERY_WARN: {
        g: "battery",
        t: "低电量提醒",
        kind: "select",
        key: "lowPower",
        options: {
          10: "10%",
          15: "15%",
          20: "20%",
          25: "25%",
          30: "30%",
          35: "35%",
          40: "40%",
          45: "45%",
          50: "50%"
        },
        subs: [{
          key: "lowPowerThreshold",
          t: "阈值"
        }, {
          key: "ultraLowBatteryReminder",
          t: "极限低电提醒"
        }]
      },
      TIRE_MONITORING: {
        g: "battery",
        t: "胎压监测",
        kind: "none",
        note: "数值来自胎压接口（外置传感器），首页「车况」卡里显示"
      },
      BATTERY_LEVEL: {
        g: "battery",
        t: "剩余电量",
        kind: "value",
        key: "batteryLevel",
        unit: "%",
        from: "battery"
      },
      MOTOPLAY: {
        g: "smart",
        t: "投屏（Motoplay）",
        kind: "switch",
        key: "motoPlay",
        subs: [{
          key: "motoPlayLinkType",
          t: "连接方式"
        }, {
          key: "motoPlayAutoNetwork",
          t: "自动联网"
        }]
      },
      SMART_PART: {
        g: "smart",
        t: "智能部件",
        kind: "none",
        from: "home",
        note: "看车况里的能力字段 isSupportSmartPart"
      },
      COME_HOME_WITH_YOU: {
        g: "light",
        desc: "关机后大灯延时熄灭",
        t: "伴我回家",
        kind: "switch",
        key: "comeHomeWithYou",
        subs: [{
          key: "comeHomeWithYouTime",
          t: "延时",
          unit: "秒"
        }]
      },
      FIRMWARE_VERSION: {
        g: "device",
        t: "固件版本",
        kind: "version",
        key: "otaVersion",
        from: "home"
      },
      ECU_FIRMWARE: {
        g: "device",
        t: "ECU 版本",
        kind: "version",
        iot: "ECU_Firmware"
      },
      HMI_FIRMWARE: {
        g: "device",
        t: "仪表版本",
        kind: "version",
        iot: "HMI_Firmware"
      },
      LABMS_FIRMWARE: {
        g: "device",
        t: "计量器",
        kind: "version",
        iot: "LABMS_Info"
      },
      BLUETOOTH_ADDRESS: {
        g: "device",
        t: "蓝牙地址",
        kind: "version",
        key: "bluetoothAddress",
        from: "home",
        mono: true
      },
      LIGHTING_EFFECT: {
        g: "light",
        models: ["AE7"],
        noWrite: true,
        t: "电机灯效",
        kind: "value",
        key: "lightEffectSetting.parkingDynamicEffect",
        subs: [{
          key: "lightEffectSetting.ecoColor",
          t: "ECO 灯色"
        }, {
          key: "lightEffectSetting.streetColor",
          t: "Street 灯色"
        }, {
          key: "lightEffectSetting.sportColor",
          t: "Sport 灯色"
        }, {
          key: "lightEffectSetting.projectionLight",
          t: "投影灯"
        }, {
          key: "lightEffectSetting.lowBeamLight",
          t: "自动近光灯"
        }, {
          key: "lightEffectSetting.positionLight",
          t: "位置灯"
        }, {
          key: "lightEffectSetting.longDistanceLighting",
          t: "远光灯"
        }, {
          key: "lightEffectSetting.pixelLight",
          t: "像素灯语"
        }],
        obs: "AE7 实测：灯色已按 App 拆成 ECO=152 / Street=153 / Sport=154 三行各自选色；156 写自动近光；驻车/骑行/充电动效 150/151/158。灯色是颜色编号（1-24），车机不回名字。"
      },
      "lightEffectSetting.parkingDynamicEffect": {
        g: "light",
        models: ["AE7"],
        t: "驻车动效",
        kind: "select",
        key: "lightEffectSetting.parkingDynamicEffect",
        options: {
          1: "关闭",
          2: "常亮",
          3: "流水",
          4: "呼吸"
        },
        desc: "驻车时电机氛围灯的动效",
        obs: "2026-11-18 App 抓包 commond 150，param 1关闭/2常亮/3流水/4呼吸；回读 parkingDynamicEffect。"
      },
      "lightEffectSetting.cyclingDynamicEffect": {
        g: "light",
        models: ["AE7"],
        t: "骑行动效",
        kind: "select",
        key: "lightEffectSetting.cyclingDynamicEffect",
        options: {
          1: "关闭",
          2: "常亮",
          3: "流水",
          4: "呼吸"
        },
        desc: "骑行时电机氛围灯的动效",
        obs: "2026-11-18 App 抓包 commond 151，param 1关闭/2常亮/3流水/4呼吸；回读 cyclingDynamicEffect。"
      },
      "lightEffectSetting.chargingDynamicEffect": {
        g: "light",
        models: ["AE7"],
        t: "充电动效",
        kind: "select",
        key: "lightEffectSetting.chargingDynamicEffect",
        options: {
          1: "关闭",
          2: "常亮",
          3: "呼吸"
        },
        desc: "充电时电机氛围灯的动效（App 无「流水」档）",
        obs: "2026-11-18 App 抓包 commond 158，param 1关闭/2常亮/3呼吸（弹窗只有三档，写 4 车机拒）；回读 chargingDynamicEffect。"
      },
      "lightEffectSetting.ecoColor": {
        g: "light",
        models: ["AE7"],
        t: "ECO 氛围灯颜色",
        kind: "palette",
        key: "lightEffectSetting.ecoColor",
        palette: v90,
        desc: "官方 App 选色页 ECO 那页的固定 24 色",
        obs: "2026-11-18 App 抓包：进 ECO 选色页选红（色号 2）确认，发 commond 152 / param 2；回读 ecoColor=2，streetColor/sportColor 不变。"
      },
      "lightEffectSetting.streetColor": {
        g: "light",
        models: ["AE7"],
        t: "STREET 氛围灯颜色",
        kind: "palette",
        key: "lightEffectSetting.streetColor",
        palette: v90,
        desc: "官方 App 选色页 STREET 那页的固定 24 色",
        obs: "2026-11-18 App 抓包：STREET 选白（色号 1）确认，发 commond 153 / param 1；回读 streetColor=1，其余两色不变。"
      },
      "lightEffectSetting.sportColor": {
        g: "light",
        models: ["AE7"],
        t: "SPORT 氛围灯颜色",
        kind: "palette",
        key: "lightEffectSetting.sportColor",
        palette: v90,
        desc: "官方 App 选色页 SPORT 那页的固定 24 色",
        obs: "2026-11-18 App 抓包：SPORT 选黄（色号 3）确认，发 commond 154 / param 3；回读 sportColor=3，其余两色不变。154 只改 Sport。"
      },
      "lightEffectSetting.lowBeamLight": {
        g: "light",
        models: ["AE7"],
        t: "自动近光灯",
        kind: "switch",
        key: "lightEffectSetting.lowBeamLight",
        desc: "开：按环境自动点灯；关：交给照明按键",
        obs: "AE7 实测：commond 156 只改 lightEffectSetting.lowBeamLight（单字段），回读即可确认。"
      },
      POWER_MODE: {
        g: "ride",
        models: ["AE7"],
        t: "双电动力模式",
        kind: "switch",
        key: "powerMode",
        desc: "安装双电池包时开启，短时间获得更高峰值速度，但会降低续航",
        obs: "2026-11-18 官方 App 抓包：commond 160，commondParam 1=开/0=关，回读 powerMode=1 开 / 0 关。此前按\"只读\"是把 powerMode 误当驾驶模式（那是 DRIVING_MODE_SETTING），已纠正。"
      },
      ecoMaxSpeed: {
        g: "ride",
        models: ["AE7"],
        t: "ECO 最高速度",
        kind: "select",
        key: "ecoMaxSpeed",
        unit: "km/h",
        options: Object.fromEntries(Array.from({
          length: 15
        }, (v506, v507) => [String(35 + v507), 35 + v507 + " km/h"])),
        desc: "经济模式的最高车速，35–49 km/h",
        obs: "2026-11-18 App 抓包：commond 63，commondParam {\"rideModel\":\"eco\",\"speed\":49}；回读 ecoMaxSpeed。同码的 param=1 是简易骑行开关，靠参数形状区分。"
      },
      streetMaxSpeed: {
        g: "ride",
        models: ["AE7"],
        t: "Street 最高速度",
        kind: "select",
        key: "streetMaxSpeed",
        unit: "km/h",
        options: Object.fromEntries(Array.from({
          length: 16
        }, (v508, v509) => [String(50 + v509), 50 + v509 + " km/h"])),
        desc: "街道模式的最高车速，50–65 km/h",
        obs: "2026-11-18 App 抓包：commond 63，commondParam {\"rideModel\":\"street\",\"speed\":N}；回读 streetMaxSpeed。下限 50，写 45 会被车机拒。"
      },
      sportMaxSpeed: {
        g: "ride",
        models: ["AE7"],
        t: "Sport 最高速度",
        kind: "select",
        key: "sportMaxSpeed",
        unit: "km/h",
        options: {
          ...Object.fromEntries(Array.from({
            length: 17
          }, (v510, v511) => [String(70 + v511), 70 + v511 + " km/h"])),
          999: "无限制"
        },
        desc: "运动模式的最高车速，70–86 km/h 或无限制",
        obs: "2026-11-18 App 抓包：commond 63，commondParam {\"rideModel\":\"sport\",\"speed\":N}；回读 sportMaxSpeed，999=无限制（App 滑块最右一格）。"
      },
      EASY_RIDE: {
        g: "sensor",
        models: ["AE7"],
        t: "简易骑行",
        kind: "switch",
        key: "easyReadyGo",
        desc: "上车即走；会联动动能回收等四项",
        obs: "AE7 实测：commond 63 开 / 62 关（commondParam=1），一次会连带改 kineticEnergyRecovery / brakePower / cruiseControlHold / steepSlopeDescent，属组合预设；发完回读 easyReadyGo 及其余四项，界面会把连带变化列出来。"
      },
      CUSTOM_BUTTON_LEFT: {
        g: "shortcut",
        models: ["AE7"],
        t: "独立按键 · 左键",
        kind: "value",
        key: "customButtonLeft",
        choices: v85,
        subs: [{
          key: "customButtonSingle",
          t: "单键"
        }, {
          key: "customButtonLongPress",
          t: "长按"
        }],
        obs: "AE7 实测：commond 136 一次把 customButtonLeft / customButtonSingle / customButtonLongPress 写成同一值——车机把左键、单键、长按当同一颗键的三个名字；回读三字段核对。"
      },
      CUSTOM_BUTTON_HIGH: {
        g: "shortcut",
        models: ["AE7"],
        t: "独立按键 · 右键",
        kind: "value",
        key: "customButtonRight",
        choices: v85,
        obs: "AE7 实测：commond 137 只改 customButtonRight（单字段、读回一致）。"
      },
      CUSTOM_BUTTON_COMBINATION: {
        g: "shortcut",
        models: ["AE7"],
        t: "组合按键",
        kind: "value",
        key: "customButtonCombination",
        choices: v86,
        desc: "两键同按触发；组合表只有 4 项",
        obs: "AE7 实测：commond 149 写组合键，同时把 passwordUnlockSwitch 与 lightEffectSetting.pixelLight 一起改成同值（探测写 7 时这两个字段也变 7，都是非法值）——所以发送前会写明连带项，发完回读组合键与这两个字段。"
      },
      CHARGING_POWER_AE8: {
        g: "battery",
        models: ["AE7"],
        t: "充电功率适配",
        kind: "select",
        key: "chargingPower",
        options: Object.fromEntries(v88.map(v512 => [String(v512.watt), v512.watt + " W"])),
        desc: "按充电桩上限调；回读核对瓦数",
        obs: "抓包 2026-11-12：GET vehicleSet/chargePower/options 回 350/450/550/650/750/1900 W（档位 1-6），vehicleSetInfo.chargingPower=1900。官方文案：「调整后的值为充电功率上限」「设置 850W 及以上功率需搭配快充充电器」「原装充电器最高仅支持 750W 以内」。写入接口没抓到过，按 options 的 key/value 形状发 PUT vehicleSet/chargePower，**是否接受以回读为准**。"
      },
      CHARGING_INFO_AE7: {
        g: "battery",
        models: ["AE7"],
        t: "充电信息",
        kind: "value",
        key: "current",
        unit: "A",
        from: "battery",
        subs: [{
          key: "voltage",
          t: "电压",
          unit: "V"
        }, {
          key: "fullChargeTime",
          t: "充满剩余",
          unit: "小时"
        }],
        obs: "AE7：电压/电流/充满剩余来自 battery_info 实时字段（voltage/current/fullChargeTime），只有读数、没有设置码。"
      }
    };
    v92.EXTENDED_RANGE = v92.LOW_BATTERY_LONG_RANGE;
    const v93 = [{
      g: "light",
      t: "灯效设置",
      kind: "switch",
      key: "lightEffectSetting.parkingDynamicEffect",
      subs: [{
        key: "lightEffectSetting.cyclingDynamicEffect",
        t: "骑行动效"
      }, {
        key: "lightEffectSetting.projectionLight",
        t: "投影灯"
      }, {
        key: "lightEffectSetting.pixelLight",
        t: "像素灯语"
      }, {
        key: "lightEffectSetting.positionLight",
        t: "位置灯"
      }, {
        key: "lightEffectSetting.lowBeamLight",
        t: "自动近光灯"
      }]
    }, {
      g: "meter",
      t: "仪表主题",
      kind: "version",
      key: "themeName"
    }, {
      g: "sound",
      t: "节日音效",
      kind: "switch",
      key: "easterEggSwitch"
    }, {
      g: "ride",
      t: "氮气加速",
      kind: "switch",
      key: "nitro"
    }, {
      g: "recorder",
      t: "行车记录仪",
      kind: "switch",
      key: "drivingRecorderSetting.privacyMode",
      subs: [{
        key: "drivingRecorderSetting.resolution",
        t: "分辨率档"
      }, {
        key: "drivingRecorderSetting.sentryMode",
        t: "哨兵模式"
      }, {
        key: "drivingRecorderSetting.impactSnapshot",
        t: "碰撞抓拍"
      }]
    }, {
      g: "safety",
      t: "撤防时段",
      kind: "version",
      key: "withdrawalStartTime",
      suffixKey: "withdrawalEndTime"
    }, {
      g: "meter",
      t: "里程单位",
      kind: "select",
      key: "mileageUnit",
      options: {
        1: "公制",
        2: "英制"
      }
    }, {
      g: "meter",
      t: "温度单位",
      kind: "select",
      key: "temperatureUnit",
      options: {
        1: "摄氏度",
        2: "华氏度"
      }
    }, {
      g: "meter",
      t: "时间格式",
      kind: "select",
      key: "timeFormat",
      options: {
        1: "12 小时制",
        2: "24 小时制"
      }
    }, {
      g: "meter",
      t: "语言",
      kind: "value",
      key: "language"
    }, {
      g: "sound",
      t: "音量",
      kind: "select",
      key: "soundEffectSetting.soundSize",
      options: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100"
      }
    }, {
      g: "light",
      t: "伴我回家时长",
      kind: "select",
      key: "comeHomeWithYouTime",
      options: {
        3: "3 秒",
        10: "10 秒",
        30: "30 秒",
        60: "60 秒",
        120: "120 秒",
        180: "180 秒"
      }
    }, {
      g: "key",
      t: "感应解锁距离",
      kind: "select",
      key: "inductiveDistance",
      options: {
        1: "更近",
        3: "默认",
        5: "更远"
      }
    }, {
      g: "safety",
      t: "离车关机时长",
      kind: "select",
      key: "leaveOffTime",
      options: {
        3: "3 秒",
        5: "5 秒",
        10: "10 秒",
        30: "30 秒",
        60: "60 秒",
        120: "120 秒",
        180: "180 秒"
      }
    }, {
      g: "safety",
      t: "超时关机时间",
      kind: "select",
      key: "automaticShutdownTimeout",
      options: {
        5: "5 分钟",
        10: "10 分钟",
        20: "20 分钟",
        30: "30 分钟",
        60: "60 分钟"
      }
    }, {
      g: "assist",
      t: "RCW 后碰撞预警",
      kind: "select",
      key: "radarRcw",
      desc: "监测后方碰撞风险并发出预警",
      options: {
        0: "关闭",
        1: "标准",
        2: "灵敏"
      }
    }];
    const v94 = {
      precisionEndurance: {
        ep: "set_property",
        kind: "commond",
        commond: "55",
        on: "1",
        off: "0",
        version: ""
      },
      motoPlay: {
        ep: "set_motoPlay",
        kind: "field",
        field: "motoPlay",
        on: 1,
        off: 0
      },
      extendedRange: {
        ep: "set_property",
        kind: "commond",
        commond: "72",
        on: "1",
        off: "0",
        version: ""
      },
      kineticEnergyRecovery: {
        ep: "set_property",
        kind: "commond",
        commond: "62",
        version: "v2"
      },
      cruiseControlHold: {
        ep: "set_property",
        kind: "commond",
        commond: "64",
        on: "1",
        off: "0",
        version: "v2"
      },
      barkePower: {
        ep: "set_property",
        kind: "commond",
        commond: "57",
        on: "1",
        off: "0",
        version: "v2"
      },
      etcsTractionControl: {
        ep: "set_property",
        kind: "commond",
        commond: "59",
        on: "1",
        off: "0",
        version: "v2"
      },
      radarBsd: {
        ep: "set_property",
        kind: "commond",
        commond: "81",
        version: "v2"
      },
      radarRcw: {
        ep: "set_property",
        kind: "commond",
        commond: "82",
        version: "v2"
      },
      automaticParking: {
        ep: "set_property",
        kind: "commond",
        commond: "51",
        on: "1",
        off: "0",
        version: "v2"
      },
      inductiveDistance: {
        ep: "set_property",
        kind: "commond",
        commond: "54",
        version: "v2"
      },
      passwordUnlocking: {
        ep: "set_property",
        kind: "commond",
        commond: "74",
        on: "1",
        off: "0",
        version: "v2"
      },
      originNfc: {
        ep: "set_property",
        kind: "commond",
        commond: "90",
        on: "1",
        off: "0",
        version: "v2"
      },
      inducedVibration: {
        ep: "set_property",
        kind: "commond",
        commond: "61",
        version: "v2"
      },
      emergencyBrakeFlash: {
        ep: "set_property",
        kind: "commond",
        commond: "107",
        on: "1",
        off: "0",
        version: "v2"
      },
      automaticShutdown: {
        ep: "set_property",
        kind: "commond",
        commond: "32",
        on: "1",
        off: "0",
        version: "v2"
      },
      leaveOffTime: {
        ep: "set_property",
        kind: "commond",
        commond: "33",
        version: "v2"
      },
      automaticShutdownSwitch: {
        ep: "set_property",
        kind: "commond",
        commond: "103",
        on: "1",
        off: "0",
        version: "v2"
      },
      automaticShutdownTimeout: {
        ep: "set_property",
        kind: "commond",
        commond: "108",
        version: "v2"
      },
      ecushionSensor: {
        ep: "set_property",
        kind: "commond",
        commond: "66",
        on: "1",
        off: "0",
        version: "v2"
      },
      cushionSensor: {
        ep: "set_property",
        kind: "commond",
        commond: "66",
        on: "1",
        off: "0",
        version: "v2"
      },
      edgeSupportSensing: {
        ep: "set_property",
        kind: "commond",
        commond: "73",
        on: "1",
        off: "0",
        version: "v2"
      },
      comeHomeWithYou: {
        ep: "set_property",
        kind: "commond",
        commond: "56",
        on: "1",
        off: "0",
        version: "v2"
      },
      comeHomeWithYouTime: {
        ep: "set_property",
        kind: "commond",
        commond: "58",
        version: "v2"
      },
      customButtonSingle: {
        ep: "set_property",
        kind: "commond",
        commond: "142",
        version: "v2",
        verifyKeys: ["customButtonSingle"]
      },
      customButtonLeft: {
        ep: "set_property",
        kind: "commond",
        commond: "136",
        version: "v2",
        verifyKeys: ["customButtonLeft", "customButtonSingle", "customButtonLongPress"]
      },
      customButtonRight: {
        ep: "set_property",
        kind: "commond",
        commond: "137",
        version: "v2",
        verifyKeys: ["customButtonRight"]
      },
      customButtonCombination: {
        ep: "set_property",
        kind: "commond",
        commond: "149",
        version: "v2",
        verifyKeys: ["customButtonCombination"],
        sideEffectKeys: ["passwordUnlockSwitch", "lightEffectSetting.pixelLight"]
      },
      "lightEffectSetting.ecoColor": {
        ep: "set_property",
        kind: "commond",
        commond: "152",
        version: "v2",
        verifyKeys: ["lightEffectSetting.ecoColor"]
      },
      "lightEffectSetting.streetColor": {
        ep: "set_property",
        kind: "commond",
        commond: "153",
        version: "v2",
        verifyKeys: ["lightEffectSetting.streetColor"]
      },
      "lightEffectSetting.sportColor": {
        ep: "set_property",
        kind: "commond",
        commond: "154",
        version: "v2",
        verifyKeys: ["lightEffectSetting.sportColor"]
      },
      "lightEffectSetting.lowBeamLight": {
        ep: "set_property",
        kind: "commond",
        commond: "156",
        on: "1",
        off: "0",
        version: "v2",
        verifyKeys: ["lightEffectSetting.lowBeamLight"]
      },
      powerMode: {
        ep: "set_property",
        kind: "commond",
        commond: "160",
        on: "1",
        off: "0",
        version: "v2",
        verifyKeys: ["powerMode"]
      },
      ecoMaxSpeed: {
        ep: "set_property",
        kind: "rideSpeed",
        commond: "63",
        rideModel: "eco",
        version: "v2",
        verifyKeys: ["ecoMaxSpeed"]
      },
      streetMaxSpeed: {
        ep: "set_property",
        kind: "rideSpeed",
        commond: "63",
        rideModel: "street",
        version: "v2",
        verifyKeys: ["streetMaxSpeed"]
      },
      sportMaxSpeed: {
        ep: "set_property",
        kind: "rideSpeed",
        commond: "63",
        rideModel: "sport",
        version: "v2",
        verifyKeys: ["sportMaxSpeed"]
      },
      "lightEffectSetting.parkingDynamicEffect": {
        ep: "set_property",
        kind: "commond",
        commond: "150",
        version: "v2",
        verifyKeys: ["lightEffectSetting.parkingDynamicEffect"]
      },
      "lightEffectSetting.cyclingDynamicEffect": {
        ep: "set_property",
        kind: "commond",
        commond: "151",
        version: "v2",
        verifyKeys: ["lightEffectSetting.cyclingDynamicEffect"]
      },
      "lightEffectSetting.chargingDynamicEffect": {
        ep: "set_property",
        kind: "commond",
        commond: "158",
        version: "v2",
        verifyKeys: ["lightEffectSetting.chargingDynamicEffect"]
      },
      easyReadyGo: {
        ep: "set_property",
        kind: "commond",
        commond: "63",
        on: "1",
        off: "1",
        version: "v2",
        commondOf: {
          1: "63",
          0: "62"
        },
        verifyKeys: ["easyReadyGo"],
        sideEffectKeys: ["kineticEnergyRecovery", "barkePower", "cruiseControlHold", "steepSlopeDescent"]
      },
      mileageUnit: {
        ep: "set_property",
        kind: "commond",
        commond: "2",
        version: "v2"
      },
      temperatureUnit: {
        ep: "set_property",
        kind: "commond",
        commond: "3",
        version: "v2"
      },
      timeFormat: {
        ep: "set_property",
        kind: "commond",
        commond: "5",
        version: "v2"
      },
      "soundEffectSetting.soundSize": {
        ep: "set_sound_size",
        kind: "soundSize"
      },
      lowPower: {
        ep: "set_lowpower",
        kind: "lowPower"
      },
      chargingPower: {
        ep: "set_charge_power",
        kind: "chargePower",
        verifyKeys: ["chargingPower"]
      }
    };
    function v95(v513, v514, v515) {
      if (v513.kind === "commond") {
        const v516 = v513.commondOf ? v513.commondOf[String(v514)] ?? v513.commond : v513.commond;
        return {
          commond: v516 ?? "<没定>",
          commondParam: String(v514),
          relatedFunctions: null,
          vcu: v515,
          version: v513.version || ""
        };
      }
      if (v513.kind === "rideSpeed") {
        const v517 = Math.round(Number(v514));
        return {
          commond: v513.commond || "63",
          commondParam: JSON.stringify({
            rideModel: v513.rideModel,
            speed: Number.isFinite(v517) ? v517 : 0
          }),
          relatedFunctions: null,
          vcu: v515,
          version: v513.version || "v2"
        };
      }
      if (v513.kind === "soundSize") {
        return {
          size: Math.max(0, Math.min(100, Number(v514) || 0)),
          vcu: v515
        };
      }
      if (v513.kind === "lowPower") {
        return {
          ruleId: "",
          value: String(v514),
          vcu: v515
        };
      }
      if (v513.kind === "chargePower") {
        const v518 = v88.find(v519 => String(v519.watt) === String(v514));
        return {
          key: String(v514),
          value: v518 ? String(v518.index) : "",
          vcu: v515
        };
      }
      return {
        vinNo: v515,
        [v513.field]: v514
      };
    }
    function v96(v520, v521, v522, v523) {
      const v524 = (v520?.verifyKeys?.length ? v520.verifyKeys : v523 || []).filter(Boolean);
      const v525 = String(v522);
      const v526 = Number(v525);
      return v524.map(v527 => {
        const v528 = v97(v521 || {}, v527);
        const v529 = v528 === undefined || v528 === null ? "" : String(v528);
        const v530 = v529 !== "" && (v529 === v525 || Number.isFinite(v526) && Number.isFinite(Number(v529)) && Number(v529) === v526);
        return {
          key: v527,
          want: v525,
          got: v529 === "" ? null : v528,
          ok: v530
        };
      });
    }
    const v97 = (v531, v532) => v532.split(".").reduce((v533, v534) => v533 == null ? undefined : v533[v534], v531);
    function v98(v535) {
      if (!v535) {
        return null;
      }
      const v536 = (v535.blueToothServiceCodeList || []).map(v540 => {
        const v541 = v1(v540.serviceCode, null);
        return {
          name: v2(v540.functionName),
          raw: v541
        };
      }).filter(v542 => v542.name && v542.raw !== null);
      const v537 = v536.filter(v543 => (v543.raw >>> 24 & 255) === 16).map(v544 => ({
        name: v544.name,
        code: v544.raw - 268435456
      }));
      const v538 = (v535.functionConfig || []).map(v545 => v2(v545.functionName)).filter(Boolean);
      let v539 = [];
      try {
        v539 = JSON.parse(v535.restrictVersion || "[]");
      } catch {}
      return {
        codes: v537,
        cfg: v538,
        bleOnly: v536.length > 0 && v537.length === 0,
        restrict: (Array.isArray(v539) ? v539 : []).map(v546 => ({
          show: v2(v546.isShow),
          version: v2(v546.version),
          type: v2(v546.versionType)
        }))
      };
    }
    function v99(v547) {
      const v548 = v2(v547).trim();
      if (!v548.startsWith("{")) {
        return v548;
      }
      try {
        const v549 = JSON.parse(v548);
        if (!v549 || typeof v549 !== "object") {
          return v548;
        }
        return Object.entries(v549).map(([v550, v551]) => v550 + " " + v2(v551).trim()).filter(v552 => !v552.endsWith(" ")).join(" · ");
      } catch {
        return v548;
      }
    }
    function v100(v553, v554, v555) {
      const v556 = v554.from === "home" ? v555.homeRaw || {} : v554.from === "battery" ? v555.batteryRaw || {} : v555.info || {};
      let v557 = v554.key ? v97(v556, v554.key) : undefined;
      if (v554.iot) {
        const v568 = (v555.home?.iotMap || {})[v554.iot];
        v557 = v568 ? v99(v568.value) : undefined;
      }
      if (v554.kind === "version" && v554.suffixKey) {
        const v569 = v2(v97(v556, v554.key));
        const v570 = v2(v97(v556, v554.suffixKey));
        v557 = v569 ? v569 + " – " + v570 : "";
      }
      const v558 = (v554.key || "").split(".")[0];
      const v559 = (v555.disabled || []).filter(v571 => v2(v571.functionName).split("_")[0] === v558);
      const v560 = v559.map(v572 => v2(v572.content)).filter(Boolean);
      const v561 = (v554.subs || []).map(v573 => {
        const v574 = v97(v556, v573.key);
        if (v574 === undefined || v574 === null || v574 === "") {
          return null;
        }
        const v575 = /^lightEffectSetting\.(eco|street|sport)Color$/.test(v573.key) ? v91(v574).name : "";
        const v576 = typeof v574 === "boolean" ? v574 ? "开" : "关" : v575 || v574;
        return {
          t: v573.t,
          v: "" + v576 + (v573.unit ? " " + v573.unit : "")
        };
      }).filter(Boolean);
      const v562 = v557 === true || v557 === false || v557 === 1 || v557 === 0 || v557 === "1" || v557 === "0";
      let v563 = "";
      const v564 = v557 === undefined || v557 === null || v557 === "";
      if (v554.kind === "switch") {
        v563 = v562 ? v3(v557) ? "已开启" : "已关闭" : v564 ? "—" : "档位 " + v557;
      } else if (v554.kind === "select") {
        v563 = v554.options?.[String(v557)] || (v557 === undefined || v557 === "" ? "—" : String(v557));
      } else if (v554.kind === "palette") {
        const v577 = v91(v557);
        v563 = v577.name ? v577.name + " · " + v577.id : v577.label;
      } else if (v554.kind === "value" || v554.kind === "version") {
        const v578 = (v554.choices || []).find(v579 => String(v579.value) === String(v557));
        v563 = v578 ? v578.label : v557 === undefined || v557 === null || v557 === "" ? "—" : "" + v557 + (v554.unit ? " " + v554.unit : "");
      } else {
        v563 = "";
      }
      const v565 = v98(v555.capByCode?.[v553]);
      const v566 = v554.noWrite ? null : v94[v554.key];
      const v567 = !!v566 && (v566.kind !== "commond" || !!v566.commond);
      return {
        code: v553 || v554.t,
        title: v554.t,
        kind: v554.kind,
        binary: v562,
        keys: [v554.key, ...(v554.subs || []).map(v580 => v580.key)].filter(Boolean),
        value: v554.kind === "switch" && v562 ? v3(v557) : v557,
        display: v563,
        subs: v561,
        note: v554.note || "",
        tip: v84[v553] || "",
        options: v554.options || null,
        choices: v554.choices || null,
        palette: v554.palette || null,
        color: v554.kind === "palette" ? v91(v557) : null,
        desc: [v554.desc || v84[v553] || v554.note || "", v567 ? "" : v560[0] || "", v567 ? "" : "未适配：云端指令码还没实测到"].filter(Boolean).join(" · "),
        state: v560[0] || "",
        stateMore: v560.slice(1),
        meta: v565,
        obs: v554.obs || "",
        mono: !!v554.mono,
        key: v554.key || "",
        write: v566 ? {
          ...v566,
          ready: v567
        } : null
      };
    }
    function v101(v581 = {}) {
      const v582 = Array.isArray(v581.caps?.data) ? v581.caps.data : [];
      const v583 = v581.homeRaw || {};
      const v584 = v581.info || {};
      if (v3(v583.inductiveUnlocking3Flag) || v3(v584.inductiveUnlocking3Flag) || v582.some(v586 => v586.functionCode === "INDUCTIVE_UNLOCKING_3" && v586.isSupport === true)) {
        return false;
      }
      const v585 = v582.find(v587 => v587.functionCode === "INDUCTIVE_UNLOCKING_2");
      if (v585?.isSupport === true) {
        return true;
      }
      if (v585?.isSupport === false) {
        return false;
      }
      return v3(v583.inductiveUnlocking2) || v3(v584.inductiveUnlocking2);
    }
    function v102(v588) {
      const v589 = v588.homeRaw || {};
      const v590 = v588.info || {};
      const v591 = v3(v589.inductiveUnlocking3Flag) || v3(v590.inductiveUnlocking3Flag);
      const v592 = v3(v589.inductiveUnlocking2) || v3(v590.inductiveUnlocking2);
      const v593 = v3(v590.inductiveUnlocking);
      const v594 = v3((v589.bleStatusVO || {}).hmiBleMacEnable) || v3((v590.bleStatusVO || {}).hmiBleMacEnable);
      if (v591 && v594) {
        return {
          level: 3,
          label: "感应解锁 3.0",
          desc: "双蓝牙感应已开启，靠近车辆即可解锁"
        };
      }
      if (v592) {
        return {
          level: 2,
          label: "感应解锁 2.0",
          desc: v594 ? "已开启；仪表蓝牙已启用" : "已开启；升级需启用仪表蓝牙"
        };
      }
      if (v593) {
        return {
          level: 1,
          label: "感应解锁 1.0",
          desc: "需保持应用运行才能感应解锁"
        };
      }
      return {
        level: 0,
        label: "未开启",
        desc: "车辆没有开启感应解锁"
      };
    }
    const v103 = [{
      models: ["AE8S+", "AE8S+MY25"],
      name: "AE8 S+ MY25",
      panel: "TFT",
      inches: 8,
      pixels: [1280, 800],
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae8_s_my25.html"
    }, {
      models: ["AE8S+", "AE8S+MY24"],
      name: "AE8 S+ MY24",
      panel: "TFT",
      inches: 5,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae8.html"
    }, {
      models: ["AE7"],
      name: "AE7",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: 191,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae7.html"
    }, {
      models: ["AE6", "AE6旧款"],
      name: "AE6 旧款",
      panel: "LCD 段码屏",
      inches: 5,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae6.html"
    }, {
      models: ["AE6", "AE626款"],
      name: "AE6 26款",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae6-26_.html"
    }, {
      models: ["AE4", "AE4旧款"],
      name: "AE4 旧款",
      panel: "LCD",
      inches: null,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae4.html"
    }, {
      models: ["AE4", "AE4MY25"],
      name: "AE4 MY25",
      panel: "LCD",
      inches: 6.2,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae4-my25.html"
    }, {
      models: ["AE4PROMY25", "AE4MAXMY25"],
      name: "AE4 Pro / Max MY25",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: 191,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae4-my25.html"
    }, {
      models: ["AE4PRO2"],
      name: "AE4 Pro2",
      panel: "TFT",
      inches: 5,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae4-my26.html"
    }, {
      models: ["AE4PRO2+", "AE4MAX2", "AE4MAX2+"],
      name: "AE4 Pro2+ / Max2 / Max2+",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: 191,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae4-my26.html"
    }, {
      models: ["AE4SE+", "AE4SE+旧款"],
      name: "AE4 SE+ 旧款",
      panel: "LCD",
      inches: null,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae4-se-.html"
    }, {
      models: ["AE4SE+", "AE4SE+升级版"],
      name: "AE4 SE+ 升级版",
      panel: "TFT",
      inches: 5,
      pixels: null,
      ppi: 186,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae4-se--_.html"
    }, {
      models: ["AE3PRO"],
      name: "AE3 Pro",
      panel: "TFT",
      inches: 5,
      pixels: null,
      ppi: 186,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae3-pro.html"
    }, {
      models: ["AE2PRO"],
      name: "AE2 Pro",
      panel: "TFT",
      inches: 5,
      pixels: null,
      ppi: 186,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae2-pro.html"
    }, {
      models: ["AE3LR"],
      name: "AE3 LR",
      panel: "原彩智慧屏",
      inches: 5,
      pixels: null,
      ppi: 186,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ae/ae3-lr.html"
    }, {
      models: ["AE3IPRO"],
      name: "AE3i Pro",
      panel: "原彩智慧屏",
      inches: 5,
      pixels: null,
      ppi: 186,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/ae/ae3i.html"
    }, {
      models: ["AE4IPRO+"],
      name: "AE4i Pro+",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: 191,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/ae/ae4i-pro-.html"
    }, {
      models: ["AE5I"],
      name: "AE5i",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: 191,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/ae/ae5i.html"
    }, {
      models: ["AE5IPRO"],
      name: "AE5i Pro",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: 191,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dqm/ae/ae5i.html"
    }, {
      models: ["AEONE"],
      name: "AE ONE",
      panel: "TFT",
      inches: 5,
      pixels: null,
      ppi: 186,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/ae/ae-one.html"
    }, {
      models: ["EZ3"],
      name: "EZ3",
      panel: "LCD",
      inches: 5,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ez/ez3.html"
    }, {
      models: ["EZ4"],
      name: "EZ4",
      panel: "LCD",
      inches: 6.2,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ez/ez4.html"
    }, {
      models: ["EZ4PRO", "EZ4MAX", "EZ4MAXLI"],
      name: "EZ4 Pro / Max / Max Li",
      panel: "TFT",
      inches: 6.2,
      pixels: null,
      ppi: 191,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/ez/ez4.html"
    }, {
      models: ["EZ1I"],
      name: "EZ1i",
      panel: "LCD",
      inches: 6.2,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/ez/ez1i.html"
    }, {
      models: ["EZ2I"],
      name: "EZ2i",
      panel: "LCD",
      inches: 6.2,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/ez/ez2i.html"
    }, {
      models: ["MO1"],
      name: "MO1",
      panel: "LCD 点阵屏",
      inches: null,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/mo/mo1.html"
    }, {
      models: ["MO1I"],
      name: "MO1i",
      panel: "LCD 点阵屏",
      inches: null,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/mo/mo1i.html"
    }, {
      models: ["MO3"],
      name: "MO3",
      panel: "LCD",
      inches: 3.6,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dqm/mo/mo3.html"
    }, {
      models: ["MO3PRO"],
      name: "MO3 Pro",
      panel: "TFT",
      inches: 5,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dm/mo/mo3-pro.html"
    }, {
      models: ["MO2I"],
      name: "MO2i",
      panel: "智慧圆屏",
      inches: null,
      pixels: null,
      ppi: null,
      source: "https://api-cn.zeehoev.com/content/zeeho/cn/products-dz/mo/mo2i.html"
    }];
    function v104(v595 = {}) {
      const v596 = v595.homeRaw || v595.home?.raw || v595.home || {};
      const v597 = v2(v596.vehicleType || v595.home?.type).trim().toUpperCase().replace(/\s+/g, "");
      const v598 = v103.filter(v609 => v609.models.includes(v597));
      const v599 = v598.length === 1 ? v598[0] : null;
      const v600 = ["AE5", "AE5I", "AE5IPRO"].includes(v597);
      let v601 = v6(v596.wallpaperResolutionWidth, 4096) || null;
      let v602 = v6(v596.wallpaperResolutionHeight, 4096) || null;
      const v603 = v610 => v610 == null || v610 === "" || v6(v610, 4096) === 0;
      if (v603(v596.wallpaperResolutionWidth) && v603(v596.wallpaperResolutionHeight)) {
        let v611 = v599;
        const v612 = /(?:MY(?:20)?(\d{2})|(?:20)?(\d{2})年?款)$/;
        const v613 = v597.replace(v612, "");
        if (v598.length === 0 && v613 === "AE5") {
          v611 = v103.find(v614 => v614.models.includes("AE5I"));
        } else if (v598.length === 0 && v613 !== v597) {
          const v615 = v618 => v618.replace(v612, (v619, v620, v621) => (v620 || v621) + "款");
          const v616 = v103.filter(v622 => v622.models.some(v623 => v615(v623) === v615(v597)));
          const v617 = v616.length ? v616 : v103.filter(v624 => v624.models.some(v625 => v625.replace(v612, "") === v613));
          if (v617.length === 1) {
            v611 = v617[0];
          }
        }
        if (v611?.panel === "TFT" && v611.inches === 6.2) {
          v601 = 1024;
          v602 = 600;
        } else if (v611?.panel === "TFT" && v611.inches === 5) {
          v601 = 800;
          v602 = 480;
        }
      }
      const v604 = Array.isArray(v595.caps?.data) ? v595.caps.data.find(v626 => v626.functionCode === "INSTRUMENT_SET_CUSTOM_WALLPAPER") : null;
      const v605 = v604?.isSupport ?? v596.supportCustomWallpaper;
      const v606 = v605 == null ? v601 && v602 ? true : null : v3(v605);
      const v607 = v601 === 1024 && v602 === 600 ? "ae5-1024x600" : v601 === 800 && v602 === 480 ? "builtin-800x480" : null;
      const v608 = v606 === false ? "当前车辆不支持自定义壁纸" : v606 === null ? "尚未读到当前车辆的壁纸能力，请刷新车况" : !v601 || !v602 ? "尚未读到车机壁纸尺寸，暂时不能制作或应用" : "";
      return {
        model: v597,
        ota: v600,
        supported: v606,
        width: v601,
        height: v602,
        layout: v607,
        reason: v608,
        screen: v599
      };
    }
    function v105(v627 = {}) {
      const v628 = v627.homeRaw || v627.home?.raw || v627.home || {};
      const v629 = v2(v628.vehicleType || v627.home?.type).trim().toUpperCase().replace(/\s+/g, "");
      const v630 = Number(v628.vehicleTypeDetailId) || 0;
      const v631 = Number(v628.vehicleKinds) || 0;
      const v632 = Number(v628.deviceType) || 0;
      const v633 = /^AE7/.test(v629) ? "AE7" : /^AE5I/.test(v629) ? "AE5I" : /^AE5/.test(v629) ? "AE5" : v629 || "UNKNOWN";
      return {
        type: v629,
        family: v633,
        detailId: v630,
        kinds: v631,
        deviceType: v632,
        isAE7: v633 === "AE7"
      };
    }
    function v106(v634 = {}) {
      return ["AE4MAX2+", "AE4SE+"].includes(v105(v634).type);
    }
    function v107(v635, v636) {
      if (!Array.isArray(v635.models) || !v635.models.length) {
        return true;
      }
      return v635.models.some(v637 => v636.family === v637 || v636.family.startsWith(v637));
    }
    function v108(v638) {
      const v639 = Array.isArray(v638.caps?.data) ? v638.caps.data : [];
      const v640 = v105(v638);
      const v641 = v83.map(v646 => ({
        ...v646,
        rows: []
      }));
      const v642 = Object.fromEntries(v641.map(v647 => [v647.id, v647]));
      let v643 = 0;
      const v644 = Object.fromEntries(v639.map(v648 => [v2(v648.functionCode), v648]));
      const v645 = {
        ...v638,
        capByCode: v644,
        disabled: Array.isArray(v638.info?.disabledContent) ? v638.info.disabledContent : []
      };
      for (const v649 of v639) {
        if (v649.isSupport === false) {
          continue;
        }
        const v650 = v2(v649.functionCode);
        let v651 = v92[v650];
        if (v651 && !v107(v651, v640)) {
          continue;
        }
        if (v650 === "E_CUSHION_SENSOR" && v638.info?.rideFunctionVOList?.some(v652 => v652.parentCode === v650 && v652.functionCode === "2.0")) {
          v651 = {
            ...v651,
            key: "ecushionSensor",
            subs: []
          };
        }
        if (!v651) {
          v642.ride.rows.push({
            code: v650,
            title: v650,
            kind: "none",
            keys: [],
            value: "",
            display: "—",
            subs: [],
            note: "能力表里有、但还没做中文映射"
          });
          continue;
        }
        v643++;
        v642[v651.g]?.rows.push(v100(v650, v651, v645));
      }
      if (v640.isAE7) {
        for (const v653 of ["CUSTOM_BUTTON_LEFT", "CUSTOM_BUTTON_COMBINATION", "lightEffectSetting.ecoColor", "lightEffectSetting.streetColor", "lightEffectSetting.sportColor", "lightEffectSetting.lowBeamLight", "lightEffectSetting.parkingDynamicEffect", "lightEffectSetting.cyclingDynamicEffect", "lightEffectSetting.chargingDynamicEffect", "ecoMaxSpeed", "streetMaxSpeed", "sportMaxSpeed", "CHARGING_INFO_AE7"]) {
          const v654 = v92[v653];
          if (v654) {
            v642[v654.g]?.rows.push(v100(v653, v654, v645));
          }
        }
      }
      for (const v655 of v93) {
        if (!v107(v655, v640)) {
          continue;
        }
        if (v655.key === "radarRcw") {
          const v656 = v644.RADAR_BLIND_MONITOR;
          const v657 = v644.RADAR_RCW;
          if (v2(v638.home?.type || v638.homeRaw?.vehicleType).trim().toUpperCase() === "AE5" || v657 && !v3(v657.isSupport)) {
            continue;
          }
          if ((!v657 || !v3(v657.isSupport)) && (!v656 || !v3(v656.isSupport) || !v656.blueToothServiceCodeList?.some(v658 => v658.functionName === "RADAR_RCW" && v658.isSupportSetting !== false))) {
            continue;
          }
        }
        v642[v655.g]?.rows.push(v100("", v655, v645));
      }
      v642.smart.rows.push({
        code: "local_tire_band",
        local: true,
        kind: "band",
        title: "胎压警戒区间",
        keys: [],
        value: "",
        display: "",
        subs: [],
        note: ""
      });
      for (const v659 of v641) {
        v659.rows.sort((v660, v661) => (v661.kind === "switch" ? 1 : 0) - (v660.kind === "switch" ? 1 : 0));
      }
      return {
        groups: v641.filter(v662 => v662.rows.length),
        caps: v639,
        known: v643,
        total: v639.length
      };
    }
    function v109(v663) {
      const v664 = v108(v663);
      const v665 = v672 => v664.groups.flatMap(v673 => v673.rows).find(v674 => v674.code === v672);
      const v666 = v102(v663);
      const v667 = v105(v663);
      const v668 = v104(v663);
      const v669 = window.PLATFORM?.preview?.();
      const v670 = v665("CUSTOM_KEY_SET");
      if (v670) {
        v670.subs = [];
      }
      const v671 = [{
        id: "key",
        t: "解锁与钥匙",
        icon: "key",
        rows: [(window.PLATFORM?.preview?.() || v101(v663) && window.NativeShell?.has?.("beginInductiveSession") === true) && {
          code: "local_inductive_pair2",
          local: true,
          appOnly: true,
          nativeCapability: "beginInductiveSession",
          render: "inductive-pair2",
          kind: "action",
          title: "配对车辆（感应解锁2.0）",
          display: "",
          desc: "",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }, window.PLATFORM?.host === "ios" && window.IOSBR?.has?.("ride.begin") === true && {
          code: "local_twin_gauge",
          local: true,
          appOnly: true,
          iosOnly: true,
          platform: "ios",
          render: "twin-gauge",
          kind: "action",
          title: "iOS 设备诊断",
          display: "",
          desc: "",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }, v665("感应解锁距离"), v665("PASSWORD_UNLOCKING"), v665("CUSTOM_NFC")].filter(Boolean)
      }, {
        id: "ride",
        t: "骑行偏好",
        icon: "speed",
        rows: [...(v667.isAE7 ? [v665("POWER_MODE"), v665("ecoMaxSpeed"), v665("streetMaxSpeed"), v665("sportMaxSpeed")] : []), !v669 && window.API?.source !== "demo" && v106(v663) && ["beginAe4ControllerWrite", "pollAe4ControllerWrite", "cancelAe4ControllerWrite"].every(v675 => window.NativeShell?.has?.(v675) === true) && {
          code: "local_ae4_controller",
          local: true,
          appOnly: true,
          nativeCapability: "beginAe4ControllerWrite",
          render: "ae4-controller",
          kind: "action",
          title: "AE4 控制器设置",
          display: "",
          desc: "",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }, v665("KINETIC_ENERGY_RECOVERY"), v665("CRUISE_CONTROL_HOLD"), v665("E_TCS_TRACTION_CONTROL"), v665("BRAKE_POWER"), v665("PRECISION_ENDURANCE"), v665("LOW_BATTERY_LONG_RANGE") || v665("EXTENDED_RANGE")].filter(Boolean)
      }, {
        id: "assist",
        t: "辅助驾驶",
        icon: "radar",
        rows: [v665("RADAR_BLIND_MONITOR"), v665("RCW 后碰撞预警"), v665("AUTOMATIC_PARKING_GO")].filter(Boolean)
      }, {
        id: "safety",
        t: "安防设置",
        icon: "shield",
        rows: [v665("INDUCED_VIBRATION_GO"), v665("AUTO_SHUTDOWN_TIME_GO"), v665("离车关机时长"), v665("AUTOMATIC_SHUTDOWN_TIMEOUT"), v665("超时关机时间")].filter(Boolean)
      }, {
        id: "sensor",
        t: "便捷骑行",
        icon: "seat",
        rows: [v665("E_CUSHION_SENSOR"), v665("EDGE_SUPPORT_SENSING"), ...(v667.isAE7 ? [v665("EASY_RIDE")] : [])].filter(Boolean)
      }, {
        id: "meter",
        t: "仪表设置",
        icon: "gauge",
        rows: [v665("里程单位"), v665("温度单位"), v665("时间格式"), {
          code: "local_cast",
          local: true,
          appOnly: true,
          nativeCapability: "cast",
          render: "cast",
          kind: "action",
          title: "车机投屏",
          display: "",
          desc: "无线直连，将手机画面投到仪表",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }, (v669 || v668.ota || v668.supported !== false) && {
          code: "local_wallpaper",
          local: true,
          appOnly: true,
          applyPlatform: "android",
          render: "wallpaper",
          kind: "action",
          title: "车机壁纸",
          display: "",
          desc: "自定义仪表壁纸，按车保存",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }, (v669 || v668.ota) && {
          code: "local_firmware",
          local: true,
          appOnly: true,
          localOTAPlatform: "android",
          render: "firmware",
          kind: "action",
          title: "仪表固件",
          display: "",
          desc: "查看固件版本并检查更新",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }].filter(Boolean)
      }, {
        id: "sound",
        t: "音效",
        icon: "volume",
        rows: [v665("音量"), v665("CUSTOM_AUDIO") && v664.caps.find(v676 => v676.functionCode === "CUSTOM_AUDIO")?.isSupportSetting !== false && {
          ...v665("CUSTOM_AUDIO"),
          render: "custom-audio",
          desc: "管理音效与车辆动作声音"
        }].filter(Boolean)
      }, {
        id: "light",
        t: "灯效设置",
        icon: "bulb",
        rows: [...(v667.isAE7 ? [v665("lightEffectSetting.ecoColor"), v665("lightEffectSetting.streetColor"), v665("lightEffectSetting.sportColor"), v665("lightEffectSetting.lowBeamLight"), v665("lightEffectSetting.parkingDynamicEffect"), v665("lightEffectSetting.cyclingDynamicEffect"), v665("lightEffectSetting.chargingDynamicEffect"), v665("LIGHTING_EFFECT")] : []), v665("COME_HOME_WITH_YOU"), v665("伴我回家时长"), v665("EMERGENCY_BRAKE_FLASH")].filter(Boolean)
      }, {
        id: "battery",
        t: "电池与充电",
        icon: "battery",
        rows: [...(v667.isAE7 ? [v665("CHARGING_POWER_AE8"), v665("CHARGING_INFO_AE7")] : []), v665("LOW_BATTERY_WARN"), {
          code: "local_nominal_cap",
          local: true,
          kind: "action",
          title: "电池规格",
          display: "",
          desc: "按电池铭牌填写额定电压和容量",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }].filter(Boolean)
      }, {
        id: "smart",
        t: "智能外设",
        icon: "bt",
        rows: [v665("local_tire_band")].filter(Boolean)
      }, {
        id: "customkey",
        t: "自定义按键",
        icon: "flash",
        rows: [...(v667.isAE7 ? [{
          code: "local_ck_mode",
          local: true,
          render: "custom-key-mode",
          kind: "action",
          title: "按键模式",
          display: "",
          desc: "独立＝左右各设一个；组合＝两键同按设一个",
          keys: [],
          subs: [],
          note: "",
          value: ""
        }, v665("CUSTOM_BUTTON_LEFT"), v665("CUSTOM_BUTTON_HIGH"), v665("CUSTOM_BUTTON_COMBINATION")] : [v670])].filter(Boolean)
      }];
      return {
        groups: v671.filter(v677 => v677.rows.length),
        caps: v664.caps,
        known: v664.known,
        total: v664.total,
        inductive: v666
      };
    }
    function v110(v678) {
      let v679 = v678;
      if (typeof v678 === "string") {
        const v681 = v678.trim();
        if (!v681 || v681 === "null") {
          return [];
        }
        try {
          v679 = JSON.parse(v681);
        } catch {
          return [];
        }
      }
      if (!Array.isArray(v679)) {
        return [];
      }
      const v680 = [];
      for (const v682 of v679) {
        if (!v682 || typeof v682 !== "object") {
          continue;
        }
        if (v682.show === false) {
          continue;
        }
        const v683 = v2(v682.url);
        if (!/^https?:\/\//i.test(v683)) {
          continue;
        }
        v680.push({
          url: v683,
          type: v2(v682.type) || "image"
        });
      }
      return v680;
    }
    function v111(v684) {
      return v2(v684).replace(/&&[a-zA-Z]+&&/g, "").trim();
    }
    function v112(v685) {
      const v686 = v2(v685.topicContent);
      if (v686) {
        return v686;
      }
      const v687 = v2(v685.topicSnapshot);
      if (v687) {
        try {
          const v688 = JSON.parse(v687);
          const v689 = Array.isArray(v688) ? v2(v688[0]?.topicContent) : v2(v688?.topicContent);
          if (v689) {
            return v689;
          }
        } catch {}
      }
      return "";
    }
    function v113(v690 = {}) {
      const v691 = v110(v690.pictureUrls ?? v690.bpictures);
      return {
        id: v2(v690.tuuid || v690.uuid || v690.postId),
        title: v2(v690.ttitle || v690.postTitle),
        text: v111(v690.tcontent ?? v690.postContent),
        topic: v112(v690),
        imgs: v691,
        cover: v2(v690.coverPictureUrl),
        author: v2(v690.nickName),
        avatar: v2(v690.avatar),
        time: v2(v690.showDate || v690.publishDate || v690.createDate),
        kind: v2(v690.types) === "2" ? "video" : "image",
        likeType: v2(v690.likeType),
        likeNote: v111(v690.likeContent),
        likes: v1(v690.likeTimes, 0),
        views: v1(v690.viewTimes, 0),
        comments: v1(v690.commentTimes, 0),
        showViews: v690.isShowViewTimes === undefined ? true : !!v1(v690.isShowViewTimes, 1),
        mine: false
      };
    }
    function v114(v692) {
      const v693 = Array.isArray(v692?.data) ? v692.data : [];
      const v694 = v693.map(v696 => ({
        id: v2(v696.integralDetailId),
        type: v2(v696.integralType),
        name: v2(v696.name, "积分变动"),
        score: v1(v696.integralScore, 0) || 0,
        time: v2(v696.myDateStr) || v2(v696.createDateStr),
        remarks: v2(v696.remarks)
      }));
      const v695 = v694.filter(v697 => v697.score > 0).reduce((v698, v699) => v698 + v699.score, 0);
      return {
        ok: v692?.ok !== false,
        rows: v694,
        gained: v695,
        count: v694.length
      };
    }
    function v115(v700) {
      const v701 = v700?.data || {};
      const v702 = v701.ps0004_01_004_VO || {};
      const v703 = Array.isArray(v701.ps0004_02_002_VO?.tzList) ? v701.ps0004_02_002_VO.tzList : [];
      return {
        ok: v700?.ok !== false,
        me: {
          nick: v2(v702.nickName),
          avatar: v2(v702.avatar),
          sign: v2(v702.signature),
          id: v2(v702.id)
        },
        rows: v703.map(v704 => v113(v704)),
        count: v703.length
      };
    }
    function v116(v705, v706 = 1, v707 = 10) {
      const v708 = v705?.data;
      const v709 = Array.isArray(v708) ? v708 : Array.isArray(v708?.list) ? v708.list : [];
      const v710 = v712 => {
        const v713 = v2(v712).split("-");
        if (v713.length === 3) {
          return v713[0] + "年" + v713[1] + "月" + v713[2] + "日";
        } else {
          return v2(v712);
        }
      };
      const v711 = v714 => /^https?:\/\//i.test(v2(v714)) ? v2(v714) : "";
      return {
        ok: v705?.ok !== false,
        rows: v709.map(v715 => ({
          id: v2(v715.uuid),
          name: v2(v715.prizesName, "盲盒奖品"),
          time: v710(v715.createDate),
          date: v2(v715.createDate),
          img: v711(v715.fileurl),
          sent: v2(v715.distribute) === "1",
          type: v2(v715.type),
          physical: v2(v715.type) === "1",
          hasAddress: v715.addressWhether === true || v715.appAddressWhether === true
        })),
        count: v709.length,
        page: Number(v706) || 1,
        pageSize: Number(v707) || 10
      };
    }
    function v117(v716) {
      const v717 = v716?.data;
      const v718 = Array.isArray(v717) ? v717 : Array.isArray(v717?.list) ? v717.list : [];
      return {
        ok: v716?.ok !== false,
        rows: v718.map(v719 => ({
          ...v113(v719),
          mine: true
        })),
        count: v718.length,
        cursor: v2(v718.length ? v718[v718.length - 1]?.createDate : "")
      };
    }
    function v118(v720) {
      const v721 = Array.isArray(v720?.data) ? v720.data : [];
      return {
        ok: v720?.ok !== false,
        rows: v721.map(v722 => ({
          id: v2(v722.fansId || v722.followerId),
          nick: v2(v722.nickName || v722.memoName, "极友"),
          avatar: v2(v722.avatar),
          level: v2(v722.level),
          memo: v2(v722.memoName),
          consultant: v2(v722.salesConsultantFlag) === "1"
        })),
        count: v721.length
      };
    }
    function v119(v723) {
      const v724 = v723?.data || {};
      const v725 = (Array.isArray(v724.messageVOList) ? v724.messageVOList : []).map(v726 => {
        let v727 = {};
        try {
          v727 = JSON.parse(v726.extra || "{}");
        } catch {}
        let v728 = v2(v727.address);
        try {
          v728 = JSON.parse(v727.address || "{}").address || v728;
        } catch {}
        let v729 = v727.carInfo;
        if (typeof v729 === "string") {
          try {
            v729 = JSON.parse(v729);
          } catch {
            v729 = null;
          }
        }
        const v730 = v2(v727.location).split(",");
        return {
          id: v2(v726.messageId),
          type: v2(v726.messageType),
          vin: v2(v726.vinNo || v727.vinNo || v729?.vinNo),
          eventAt: v20(v727.eventTime || v726.messageTime),
          title: v2(v726.content) || "消息",
          time: v2(v726.messageTime) || v2(v726.messageTimeStr),
          timeShort: v2(v726.messageTimeStr),
          unread: v2(v726.unread) === "0",
          detail: v2(v727.detail),
          address: v728,
          lat: v730[0] || "",
          lng: v730[1] || "",
          thumb: v2(v727.addressThumbnail)
        };
      });
      return {
        ok: v723?.ok !== false,
        noRead: v1(v724.noRead, 0) || 0,
        list: v725
      };
    }
    return {
      n: v1,
      s: v2,
      on: v3,
      esc: v4,
      clamp: v5,
      signStatus: v7,
      isSignedStatus: v8,
      signStatue: v9,
      isSignedStatue: v10,
      isUnsignedStatue: v11,
      signDayClass: v12,
      beijingDay: v13,
      validSignDay: v14,
      parseTime: v15,
      parseDeviceTime: v20,
      freshnessEntries: v25,
      dataFreshness: v26,
      vehicleConnection: v30,
      vehicleAnomalies: v29,
      LOW_SOC_PCT: v27,
      LOW_TIRE_BAR: v28,
      relTime: v37,
      minutes: v38,
      minutesShort: v39,
      durationText: v40,
      secText: v41,
      socLevel: v42,
      chargeState: v44,
      powerWatt: v65,
      currentAmp: v67,
      gcj02ToWgs84: v52,
      wgs84ToGcj02: v53,
      pictureList: v110,
      postText: v111,
      postTopic: v112,
      post: v113,
      integralDetails: v114,
      prizeDetails: v116,
      likeInfo: v115,
      myArticles: v117,
      fansList: v118,
      vehicles: v54,
      home: v55,
      tires: v63,
      tireHistory: v64,
      tireLevel: v62,
      normalizeBand: v60,
      normalizeBands: v61,
      TIRE_RED_MIN: v56,
      TIRE_RED_MAX: v57,
      TIRE_LO_DEFAULT: v58,
      TIRE_HI_DEFAULT: v59,
      battery: v68,
      rideHome: v69,
      rideMonth: v70,
      analyse: v71,
      user: v82,
      messages: v119,
      rideRecords: v74,
      trips: v77,
      dayInfo: v73,
      monthLabel: v79,
      monthShift: v80,
      recentMonths: v81,
      writeBody: v95,
      settings: v108,
      curatedSettings: v109,
      vehicleProfile: v105,
      ae4ControllerSupported: v106,
      verifyWrite: v96,
      writeBody: v95,
      BUTTON_ACTIONS: v85,
      COMBO_ACTIONS: v86,
      CHARGE_POWER_STEPS: v88,
      LIGHT_PALETTE: v90,
      lightColor: v91,
      instrumentCapabilities: v104,
      INSTRUMENT_SCREENS: v103,
      supportsInductive2: v101,
      GROUPS: v83
    };
  })();
  window.CHARTPATH = (() => {
    const v731 = v736 => (Math.round(v736 * 10) / 10).toFixed(1);
    const v732 = (v737, v738, v739) => Math.max(v738, Math.min(v739, v737));
    function v733(v740, v741, v742, v743, v744, v745 = {}) {
      const v746 = v745.smooth !== false;
      const v747 = Number.isFinite(v745.tension) ? v745.tension : 1 / 6;
      const v748 = [];
      for (let v750 = v741; v750 <= v742; v750++) {
        const v751 = v740[v750];
        if (!v751) {
          continue;
        }
        const v752 = v743(v751);
        const v753 = v744(v751);
        if (!Number.isFinite(v752) || !Number.isFinite(v753)) {
          continue;
        }
        v748.push([v752, v753]);
      }
      if (!v748.length) {
        return "";
      }
      if (v748.length === 1) {
        return "M" + v731(v748[0][0]) + " " + v731(v748[0][1]);
      }
      if (v748.length === 2 || !v746) {
        return "M" + v731(v748[0][0]) + " " + v731(v748[0][1]) + v748.slice(1).map(v754 => " L" + v731(v754[0]) + " " + v731(v754[1])).join("");
      }
      let v749 = "M" + v731(v748[0][0]) + " " + v731(v748[0][1]);
      for (let v755 = 0; v755 < v748.length - 1; v755++) {
        const v756 = v748[v755 - 1] || v748[v755];
        const v757 = v748[v755];
        const v758 = v748[v755 + 1];
        const v759 = v748[v755 + 2] || v748[v755 + 1];
        const v760 = Math.min(v757[0], v758[0]);
        const v761 = Math.max(v757[0], v758[0]);
        const v762 = Math.min(v757[1], v758[1]);
        const v763 = Math.max(v757[1], v758[1]);
        const v764 = v732(v757[0] + (v758[0] - v756[0]) * v747, v760, v761);
        const v765 = v732(v757[1] + (v758[1] - v756[1]) * v747, v762, v763);
        const v766 = v732(v758[0] - (v759[0] - v757[0]) * v747, v760, v761);
        const v767 = v732(v758[1] - (v759[1] - v757[1]) * v747, v762, v763);
        v749 += " C" + v731(v764) + " " + v731(v765) + " " + v731(v766) + " " + v731(v767) + " " + v731(v758[0]) + " " + v731(v758[1]);
      }
      return v749;
    }
    function v734(v768, v769, v770, v771, v772, v773, v774 = {}) {
      const v775 = v733(v768, v769, v770, v771, v772, v774);
      if (!v775) {
        return "";
      }
      const v776 = [];
      const v777 = v768[v769];
      const v778 = v768[v770];
      const v779 = v771(v777);
      const v780 = v771(v778);
      if (!Number.isFinite(v779) || !Number.isFinite(v780)) {
        return "";
      }
      v776.push(v779, v780);
      return v775 + " L" + v731(v780) + " " + v731(v773) + " L" + v731(v779) + " " + v731(v773) + " Z";
    }
    function v735(v781, v782, v783 = 5) {
      const v784 = Math.floor(Math.max(1, v783) / 2);
      return v781.map((v785, v786) => {
        let v787 = 0;
        let v788 = 0;
        for (let v790 = -v784; v790 <= v784; v790++) {
          const v791 = v781[v786 + v790];
          if (!v791) {
            continue;
          }
          const v792 = v782(v791);
          if (Number.isFinite(v792)) {
            v787 += v792;
            v788++;
          }
        }
        const v789 = v782(v781[v786]);
        if (v788) {
          return v787 / v788;
        } else if (Number.isFinite(v789)) {
          return v789;
        } else {
          return 0;
        }
      });
    }
    return {
      path: v733,
      area: v734,
      movingAverage: v735,
      fmt: v731
    };
  })();
  window.CHG = (() => {
    const v793 = window.Store;
    const v794 = v904 => v793.requiresAsync?.() ? v793.commitAsync(v904) : v793.commit(v904);
    const v795 = (v905, v906) => v905 && typeof v905.then === "function" ? v905.then(v906) : v906(v905);
    const v796 = "zeeho.chg.v1";
    const v797 = 600;
    const v798 = 2678400000;
    const v799 = (v907, v908 = Date.now()) => v907.filter(v909 => {
      const v910 = v830(v909?.e ?? v909?.at);
      return v910 !== null && v910 >= v908 - v798 && v910 <= v908;
    });
    const v800 = 12;
    const v801 = 80;
    const v802 = 20000;
    const v803 = 10800000;
    const v804 = 60;
    const v805 = 4;
    const v806 = 0.02;
    const v807 = 720;
    const v808 = "zeeho.chg.clear.v2";
    const v809 = 300000;
    const v810 = 2;
    const v811 = 1;
    const v812 = Object.freeze({
      minSoc: 20,
      maxSoc: 80,
      minDelta: 5,
      minMinutes: 10,
      minSessions: 3,
      minTotalDelta: 60,
      minSocCoverage: 30,
      stableSessions: 5,
      repairMaxMinutes: 15,
      repairMaxFraction: 0.2,
      recentDays: 90,
      recentSessions: 20
    });
    const v813 = 1;
    const v814 = Object.freeze({
      maxMinutes: 60,
      supportMaxMinutes: 6,
      clockToleranceMinutes: 2,
      powerSpread: 0.15
    });
    const v815 = ["sampleVersion", "rawA", "rawPower", "currentConflict", "currentSource", "socSource", "powerSource", "source", "timeBasis", "measurementSide", "sessionId", "segmentId", "ownerId", "ownerUid", "vin", "clearAt", "generation"];
    const v816 = new Map();
    const v817 = new Set();
    let v818 = false;
    let v819 = 0;
    function v820() {
      v819++;
      v817.clear();
      v818 = true;
      try {
        const v911 = {};
        for (const v912 of v793.keys()) {
          if (v912 !== v796 && !v912.startsWith(v796 + "@")) {
            continue;
          }
          const v913 = v793.getJson(v912, null);
          if (!v913 || typeof v913 !== "object" || Array.isArray(v913)) {
            continue;
          }
          let v914 = false;
          for (const v915 of Object.values(v913)) {
            if (v915?.nativeRevision === undefined && v915?.nativeOwnerId === undefined) {
              continue;
            }
            v915.nativeInvalidated = true;
            v914 = true;
          }
          if (v914) {
            v911[v912] = JSON.stringify(v913);
          }
        }
        return !Object.keys(v911).length || v794({
          puts: v911
        });
      } catch {
        return false;
      }
    }
    function v821(v916, v917, v918) {
      return v817.has(v825(v916, v917, v918));
    }
    const v822 = () => window.IOSBR?.has?.("history.charge") && window.IOSBR.has("history.clear") || ["beginChargeHistory", "beginClearChargeHistory", "pollChargeHistory"].every(v919 => typeof window.ZeehoShell?.[v919] === "function");
    function v823() {
      try {
        const v920 = window.APP?.context?.();
        const v921 = v920?.owner || window.ACC?.active?.();
        if (v921) {
          return {
            id: String(v921.id || ""),
            uid: String(v921.uid || "")
          };
        } else {
          return null;
        }
      } catch {
        return null;
      }
    }
    function v824() {
      try {
        return v830(v793.getJson(v793.ns(v808), {})?.at) || 0;
      } catch {
        return 0;
      }
    }
    function v825(v922, v923, v924) {
      return JSON.stringify([v793.ns(v796), v922, String(v923 || ""), String(v924 || "")]);
    }
    let v826 = "";
    function v827() {
      try {
        const v925 = String(window.APP?.context?.()?.vin || v826 || "");
        return v828(v925);
      } catch {
        return 1;
      }
    }
    function v828(v926) {
      try {
        const v927 = window.CAPBOOK?.scale;
        if (typeof v927 === "function" && v927(v926) === 2) {
          return 2;
        } else {
          return 1;
        }
      } catch {
        return 1;
      }
    }
    const v829 = [{
      id: "soc",
      label: "电量",
      unit: "%"
    }, {
      id: "w",
      label: "功率",
      unit: "W"
    }, {
      id: "v",
      label: "电压",
      unit: "V"
    }, {
      id: "a",
      label: "电流",
      unit: "A"
    }, {
      id: "temp",
      label: "温度",
      unit: "℃"
    }];
    const v830 = v928 => v928 === null || v928 === undefined || v928 === "" || !Number.isFinite(Number(v928)) ? null : Number(v928);
    const v831 = v929 => String(v929).padStart(2, "0");
    function v832(v930) {
      let v931 = {};
      let v932 = null;
      try {
        v931 = window.DIAG?.capture?.() || {};
      } catch {}
      try {
        v932 = v930 ? window.ACC?.snapshot?.(v930) : window.ACC?.active?.();
      } catch {}
      let v933 = String(v932?.label || v932 && window.ACC?.labelOf?.(v932) || (v930 ? "指定账号" : window.APP?.state?.profileUid) || "");
      if (v932?.token) {
        v933 = v933.split(String(v932.token)).join("[已隐藏凭据]");
      }
      return {
        ...v931,
        account: v933 || "未标识账号",
        accountId: String(v932?.id || v930 || ""),
        source: "web"
      };
    }
    function v833(v934, v935, v936 = {}) {
      try {
        window.DIAG?.event?.(v934, {
          category: "charge",
          phase: "accepted",
          kind: "info",
          ...v935,
          ...v936
        });
      } catch {}
    }
    function v834(v937) {
      try {
        return v937?.source !== "native" && !v793?.isNative?.() && !window.APP?.inShell?.();
      } catch {
        return false;
      }
    }
    function v835() {
      try {
        const v938 = v793.getJson(v793.ns(v796), {});
        if (v938 && typeof v938 === "object") {
          return v938;
        } else {
          return {};
        }
      } catch {
        return {};
      }
    }
    const v836 = v939 => v939.webId || "web:" + (v939.energyCurrentStart || v939.pts?.[0]?.t || v939.at || 0);
    function v837(v940, v941) {
      return !!v940.confirmed && !!v941.confirmed && !!v940.id && !!v941.id && v940.id === v941.id || !v940.confirmed && !v941.confirmed && v940.s === v941.s && v940.e === v941.e;
    }
    const v838 = (v942, v943) => Math.max(v942.s, v943.s) < Math.min(v942.e, v943.e);
    function v839(v944, v945 = []) {
      const v946 = Date.now();
      const v947 = new Date(v946);
      v947.setUTCMonth(v947.getUTCMonth() - 24);
      let v948 = Math.max(v830(v944.clearAt) || 0, v830(v944.energyFloor) || 0, v824(), v947.getTime());
      const v949 = [];
      const v950 = (Array.isArray(v944.sessions) ? v944.sessions : []).map(v951 => ({
        ...v951,
        ...(v944.nativeOwnerId !== undefined && v951.id ? {
          confirmed: true
        } : {})
      }));
      for (const v952 of [...(Array.isArray(v944.energyRows) ? v944.energyRows : []), ...v950, ...v945]) {
        const v953 = Array.isArray(v952?.pts) && v952.pts.length >= 2 && v952.n === v952.pts.length;
        if (v952?.rawStatistics !== true && !v953) {
          continue;
        }
        const v954 = v830(v952?.s);
        const v955 = v830(v952?.e);
        const v956 = v953 ? v854(v952.pts).wh / 1000 : v830(v952?.kwh);
        const v957 = v830(v952?.postClearAt) || (v952?.postClear === true ? v955 : 0);
        if (v954 === null || v955 === null || v956 === null || !(v955 >= v954) || !(v955 <= v946) || !(v956 >= 0) || !(v956 <= 100) || !(v954 > v947.getTime()) || !(v954 > v948) && !(v957 > v948)) {
          continue;
        }
        const v958 = v952.confirmed === true && typeof v952.id === "string" && !!v952.id;
        const v959 = {
          s: v954,
          e: v955,
          kwh: v956,
          rawStatistics: true,
          ...(v957 ? {
            postClearAt: v957
          } : {}),
          ...(v958 ? {
            id: v952.id,
            confirmed: true
          } : {})
        };
        const v960 = v949.find(v961 => v837(v961, v959));
        if (!v960) {
          v949.push(v959);
        } else {
          v960.s = Math.min(v960.s, v959.s);
          v960.e = Math.max(v960.e, v959.e);
          v960.kwh = Math.max(v960.kwh, v959.kwh);
          if (v957) {
            v960.postClearAt = Math.max(v960.postClearAt || 0, v957);
          }
        }
      }
      v949.sort((v962, v963) => v962.e - v963.e);
      if (v949.length > 400) {
        v948 = Math.max(v948, ...v949.slice(0, v949.length - 400).map(v964 => v964.e));
      }
      if (Array.isArray(v944.energyRows) && v944.energyRows.some(v965 => v965.rawStatistics !== true) && !v944.legacyEnergyRows) {
        v944.legacyEnergyRows = v944.energyRows.filter(v966 => v966.rawStatistics !== true);
      }
      v944.energyRows = v949.filter(v967 => v967.s > v948 || v967.postClearAt > v948);
      v944.energyFloor = v948;
    }
    function v840(v968) {
      const v969 = v968.filter(v973 => v973.confirmed);
      const v970 = v968.filter(v974 => v974.confirmed || !v969.some(v975 => v838(v975, v974))).sort((v976, v977) => v976.e - v977.e || v976.s - v977.s);
      const v971 = [0];
      const v972 = [0];
      v970.forEach((v978, v979) => {
        let v980 = 0;
        let v981 = v979;
        while (v980 < v981) {
          const v984 = v980 + v981 >> 1;
          if (v970[v984].e <= v978.s) {
            v980 = v984 + 1;
          } else {
            v981 = v984;
          }
        }
        const v982 = v971[v980] + v978.kwh;
        const v983 = v982 > v971[v979] || v982 === v971[v979] && v972[v980] + 1 > v972[v979];
        v971.push(v983 ? v982 : v971[v979]);
        v972.push(v983 ? v972[v980] + 1 : v972[v979]);
      });
      return {
        kwh: v971.at(-1),
        n: v972.at(-1)
      };
    }
    function v841(v985) {
      const v986 = v846(v985);
      const v987 = v823();
      const v988 = v816.get(v825(v985, v987?.id, v987?.uid));
      const v989 = v986 && (v986.nativeOwnerId === undefined || v986.nativeOwnerId === v987?.id && v986.nativeOwnerUid === v987?.uid);
      return Math.max(v824(), v989 ? v830(v986.clearAt) || 0 : 0, v830(v988?.clearAt) || 0);
    }
    function v842(v990) {
      if (!v990) {
        return {
          kwh: 0,
          n: 0
        };
      }
      const v991 = v847(v990);
      const v992 = v846(v990);
      if (v992?.nativeRevision !== undefined && v991.nativeRevision === undefined || v822() && v991.nativeRevision === undefined) {
        return {
          kwh: 0,
          n: 0
        };
      }
      if (v991.nativeOwnerId === undefined && v823() && !v992) {
        return {
          kwh: 0,
          n: 0
        };
      }
      const v993 = JSON.stringify([v991.energyRows, v991.energyFloor]);
      v839(v991, window.CAPBOOK?.recs?.(v990) || []);
      if (v993 !== JSON.stringify([v991.energyRows, v991.energyFloor])) {
        const v996 = v835();
        v996[v990] = v991;
        v843(v996);
      }
      const v994 = v840(v991.energyRows);
      function v995() {
        return window.CAPBOOK?.scale?.(v990) || 1;
      }
      return {
        ...v994,
        kwh: v994.kwh * v995()
      };
    }
    function v843(v997, v998 = false) {
      try {
        const v999 = Object.keys(v997);
        let v1000 = v824();
        let v1001 = false;
        if (v999.length > v800) {
          v999.sort((v1003, v1004) => (v997[v1003]?.at || 0) - (v997[v1004]?.at || 0));
          for (const v1005 of v999.slice(0, v999.length - v800)) {
            v1000 = Math.max(v1000, v830(v997[v1005]?.at) || 0, v830(v997[v1005]?.clearAt) || 0);
            delete v997[v1005];
            v1001 = true;
          }
        }
        for (const v1006 of Object.values(v997)) {
          if (Array.isArray(v1006?.pts) && v1006.pts.length > v797) {
            v1006.pts = v1006.pts.slice(-v797);
          }
          if (Array.isArray(v1006?.sessions)) {
            v1006.sessions = v799(v1006.sessions).map(v1007 => ({
              ...v1007,
              pts: Array.isArray(v1007.pts) ? v853(v1007.pts) : []
            }));
          }
          if (Array.isArray(v1006?.legacySessions)) {
            v1006.legacySessions = v799(v1006.legacySessions).map(v1008 => ({
              ...v1008,
              pts: Array.isArray(v1008.pts) ? v853(v1008.pts) : []
            }));
          }
        }
        const v1002 = {
          [v793.ns(v796)]: JSON.stringify(v997)
        };
        if (v1001) {
          v1002[v793.ns(v808)] = JSON.stringify({
            at: v1000
          });
        }
        if ((v998 || v793.requiresAsync?.()) && v793.canCommitAsync?.()) {
          return v793.commitAsync({
            puts: v1002
          });
        } else {
          return v793.commit({
            puts: v1002
          });
        }
      } catch {
        return false;
      }
    }
    const v844 = () => ({
      pts: [],
      ended: false,
      at: 0
    });
    let v845 = null;
    function v846(v1009) {
      try {
        const v1010 = v793.ns(v796);
        const v1011 = v793.get(v1010);
        if (!v845 || v845.key !== v1010 || v845.raw !== v1011) {
          v845 = null;
          const v1012 = v1011 === null ? {} : JSON.parse(v1011);
          const v1013 = v1012 && typeof v1012 === "object" ? v1012 : {};
          const v1014 = Object.keys(v1013);
          const v1015 = v1014.length === 1 ? v1014[0] : null;
          v845 = {
            key: v1010,
            raw: v1011,
            all: v1015 === null ? v1013 : null,
            singleVin: v1015,
            vin: null,
            value: null
          };
          if (v1015 !== null) {
            return v1013[v1009];
          }
        }
        if (v845.singleVin !== null) {
          if (v1009 === v845.singleVin) {
            return JSON.parse(v1011)[v1009];
          } else {
            return null;
          }
        }
        if (v845.vin !== v1009) {
          const v1016 = v845.all[v1009];
          v845.value = v1016 && Array.isArray(v1016.pts) ? JSON.stringify(v1016) : null;
          v845.vin = v1009;
        }
        if (v845.value === null) {
          return null;
        } else {
          return JSON.parse(v845.value);
        }
      } catch {
        v845 = null;
        return null;
      }
    }
    function v847(v1017) {
      if (!v1017) {
        return v844();
      }
      const v1018 = v846(v1017);
      if (!v1018 || !Array.isArray(v1018.pts)) {
        return v844();
      }
      if (v1018.nativeOwnerId !== undefined) {
        const v1021 = v823();
        if (v1021 && (v1021.id !== v1018.nativeOwnerId || v1021.uid !== v1018.nativeOwnerUid)) {
          return v844();
        }
        if ((v822() || v1018.nativeInvalidated || v818) && !v817.has(v825(v1017, v1018.nativeOwnerId, v1018.nativeOwnerUid))) {
          return v844();
        }
      }
      const v1019 = v823();
      const v1020 = v816.size ? v816.get(v825(v1017, v1019?.id || v1018.nativeOwnerId, v1019?.uid || v1018.nativeOwnerUid)) : null;
      if (v1020 && (v830(v1018.clearAt) || 0) < v1020.clearAt) {
        return {
          ...v844(),
          ended: true,
          clearAt: v1020.clearAt
        };
      }
      return v1018;
    }
    function v848(v1022) {
      if (!v1022) {
        return;
      }
      if (v822()) {
        return false;
      }
      const v1023 = v832();
      const v1024 = v835();
      const v1025 = !!v1024[v1022];
      const v1026 = v1024[v1022] || {};
      const v1027 = Math.max(Date.now(), v830(v1026.at) || 0, v830(v1026.nativeAt) || 0, v830(v1026.clearAt) || 0, v824());
      v1024[v1022] = {
        pts: [],
        sessions: [],
        ended: true,
        at: v1027,
        nativeAt: v1027,
        clearAt: v1027
      };
      return v795(v843(v1024), v1028 => {
        v833(v1028 === false ? "充电曲线清理失败" : "充电曲线已清理", v1023, {
          phase: "end",
          kind: v1028 === false ? "err" : "ok",
          extra: {
            existed: v1025,
            accepted: v1028 !== false
          }
        });
        return v1028;
      });
    }
    function v849(v1029) {
      const v1030 = v1029 === null ? {} : JSON.parse(v1029);
      if (!v1030 || typeof v1030 !== "object" || Array.isArray(v1030)) {
        throw new Error("充电账本格式无法识别，未清理。");
      }
      const v1031 = {};
      let v1032 = 0;
      let v1033 = 0;
      let v1034 = 0;
      let v1035 = false;
      for (const [v1036, v1037] of Object.entries(v1030)) {
        if (!v1037 || typeof v1037 !== "object" || Array.isArray(v1037) || v1037.pts !== undefined && !Array.isArray(v1037.pts) || v1037.sessions !== undefined && !Array.isArray(v1037.sessions) || v1037.energyRows !== undefined && !Array.isArray(v1037.energyRows)) {
          throw new Error("充电账本格式无法识别，未清理。");
        }
        v1033++;
        if (v1037.nativeRevision !== undefined || v1037.nativeOwnerId !== undefined) {
          Object.defineProperty(v1031, v1036, {
            value: v1037,
            enumerable: true,
            configurable: true
          });
          if (!v1037.ended && v1037.pts?.length) {
            v1034++;
          }
          continue;
        }
        const v1038 = v1037.sessions || [];
        v1032 += v1038.length;
        const v1039 = v1037.ended === true;
        if (!v1039 && v1037.pts?.length) {
          v1034++;
        }
        const v1040 = v1039 && !!v1037.pts?.length;
        v1035 = v1035 || v1038.length > 0 || v1040;
        const v1041 = {
          ...v1037
        };
        if (v1038.length) {
          v1041.sessions = [];
        }
        if (v1040) {
          v1041.pts = [];
        }
        if (v1038.length || v1040 || v1037.energyRows?.length) {
          v1041.energyRows = [];
          v1041.energyFloor = Math.max(Date.now(), v830(v1037.at) || 0, v830(v1037.energyFloor) || 0);
          v1041.clearAt = Math.max(v830(v1037.clearAt) || 0, v1041.energyFloor);
          if (!v1039 && v1037.pts?.length) {
            v1041.webId = v836(v1037);
            v1041.energyRetainedId = v1041.webId;
            delete v1041.energyCurrentStart;
          }
          v1035 = true;
        }
        Object.defineProperty(v1031, v1036, {
          value: v1041,
          enumerable: true,
          configurable: true
        });
      }
      return {
        count: v1032,
        vehicles: v1033,
        current: v1034,
        changed: v1035,
        value: v1035 ? JSON.stringify(v1031) : v1029
      };
    }
    function v850(v1042, v1043 = () => true) {
      try {
        if (!v1043() || v793.error?.()) {
          return false;
        }
        const v1044 = v793.ns(v796, v1042);
        const v1045 = v793.get(v1044);
        const v1046 = v849(v1045);
        if (!v1043() || v793.get(v1044) !== v1045) {
          return false;
        }
        return v795(!v1046.changed || v794({
          puts: {
            [v1044]: v1046.value
          }
        }), v1047 => {
          v833(v1047 ? "已结束充电历史已清理" : "已结束充电历史清理失败", v832(v1042), {
            phase: "end",
            kind: v1047 ? "ok" : "err",
            extra: {
              count: v1046.count,
              currentRetained: v1046.current,
              accepted: !!v1047
            }
          });
          return v1047;
        });
      } catch {
        return false;
      }
    }
    function v851(v1048, v1049) {
      const v1050 = v1049?.ok === false ? {} : v1049?.data || {};
      const v1051 = v1049?.sampleAt !== undefined ? v1049.sampleAt : v1049?.receivedAt !== undefined ? v1049.receivedAt : v1048.sampleAt !== undefined ? v1048.sampleAt : Date.now();
      const v1052 = v830(v1050.voltage ?? v1050.bmsVoltage);
      const v1053 = v830(v1050.power);
      const v1054 = v830(typeof window.MODEL?.currentAmp === "function" ? window.MODEL.currentAmp(v1052, v830(v1050.current), v1053) : v830(v1050.current));
      const v1055 = [v830(v1050.batteryTemp), v830(v1048.temp)].find(v1061 => v1061 !== null);
      const v1056 = v830(v1050.bmssoc);
      const v1057 = v830(v1048.sampleAt);
      const v1058 = v830(v1051);
      const v1059 = v1057 !== null && v1058 !== null && Math.abs(v1057 - v1058) <= 90000;
      const v1060 = typeof v1050.chargeState === "string" || typeof v1050.chargeState === "number" ? String(v1050.chargeState).trim() : "";
      return {
        t: v830(v1051),
        cf: v830(v1048.charge?.chargedMin),
        soc: v1056 !== null ? v1056 : v830(v1048.soc),
        odo: (v1059 || v1048.sampleAt === undefined) && v830(v1048.totalMile) !== null && v830(v1048.totalMile) >= 0 ? Math.round(v830(v1048.totalMile) * 1000) : null,
        sampleVersion: v810,
        rawA: v830(v1050.current),
        rawPower: v1053,
        currentConflict: v830(v1050.current) !== null && v1052 !== null && v1053 !== null && v1053 !== 0 && Math.abs(v1052 * v830(v1050.current) - v1053) > Math.abs(v1053) * 0.2,
        currentSource: v830(v1050.current) !== null ? "raw-current" : "derived-current",
        socSource: v1056 !== null ? "battery" : v1059 ? "home-aligned" : "unknown",
        timeBasis: "received",
        measurementSide: "unknown",
        state: v1060 ? v1060 === "1" ? 1 : 0 : v1059 && v1048.charge?.known !== false ? v1048.charge?.charging === true ? 1 : 0 : -1,
        v: v1052,
        a: v1054,
        w: v830(typeof window.MODEL?.powerWatt === "function" ? window.MODEL.powerWatt(v1052, v1054, v1053) : v1052 !== null && v1054 !== null ? Math.round(v1052 * v1054) : null),
        temp: v1055 === undefined ? null : v1055,
        ft: v830(v1048.charge?.carFull)
      };
    }
    function v852(v1062, v1063, v1064) {
      if (!v1062 || !v1063 || v830(v1062[v1064]) === null || v830(v1063[v1064]) === null) {
        return true;
      }
      if (typeof v1063.metricGap?.[v1064] === "boolean") {
        return v1063.metricGap[v1064];
      }
      return !!v1063.gap || !!v1063.healthGap || v830(v1063.t) <= v830(v1062.t) || v830(v1063.t) - v830(v1062.t) > v809;
    }
    function v853(v1065) {
      const v1066 = v1071 => ({
        ...v1071,
        t: v830(v1071.t),
        soc: v830(v1071.soc),
        v: v830(v1071.v),
        a: v830(v1071.a),
        w: v830(v1071.w),
        cf: v830(v1071.cf) !== null && v830(v1071.cf) >= 0 ? v830(v1071.cf) : null,
        temp: v830(v1071.temp),
        ...(v1071.metricGap ? {
          metricGap: {
            ...v1071.metricGap
          }
        } : {})
      });
      if (!v1065 || v1065.length <= v801) {
        return (v1065 || []).map(v1066);
      }
      const v1067 = new Set([0, v1065.length - 1]);
      for (let v1072 = 1; v1072 < v1065.length && v1067.size < v801 - 1; v1072++) {
        if (v829.some(v1073 => (v830(v1065[v1072 - 1][v1073.id]) !== null || v830(v1065[v1072][v1073.id]) !== null) && v852(v1065[v1072 - 1], v1065[v1072], v1073.id))) {
          if (v1067.size < v801) {
            v1067.add(v1072 - 1);
          }
          if (v1067.size < v801) {
            v1067.add(v1072);
          }
        }
      }
      const v1068 = (v1065.length - 1) / (v801 - 1);
      for (let v1074 = 0; v1074 < v801 && v1067.size < v801; v1074++) {
        v1067.add(Math.round(v1074 * v1068));
      }
      for (let v1075 = 1; v1067.size < v801 && v1075 < v1065.length - 1; v1075++) {
        v1067.add(v1075);
      }
      const v1069 = [...v1067].sort((v1076, v1077) => v1076 - v1077);
      const v1070 = [];
      for (let v1078 = 0; v1078 < v1069.length; v1078++) {
        const v1079 = v1069[v1078];
        const v1080 = v1066(v1065[v1079]);
        v1080.curveOnly = true;
        v1080.metricGap = {};
        for (const v1081 of v829) {
          let v1082 = v1078 === 0;
          for (let v1083 = v1078 ? v1069[v1078 - 1] + 1 : v1079; !v1082 && v1083 <= v1079; v1083++) {
            v1082 ||= v852(v1065[v1083 - 1], v1065[v1083], v1081.id);
          }
          v1080.metricGap[v1081.id] = v1082;
        }
        v1070.push(v1080);
      }
      return v1070;
    }
    function v854(v1084) {
      let v1085 = 0;
      let v1086 = 0;
      let v1087 = null;
      let v1088 = 0;
      const v1089 = 1;
      for (let v1090 = 1; v1090 < v1084.length; v1090++) {
        const v1091 = v1084[v1090 - 1];
        const v1092 = v1084[v1090];
        const v1093 = v830(v1091.w);
        const v1094 = v830(v1092.w);
        if (v1093 === null || v1094 === null) {
          continue;
        }
        const v1095 = (v1092.t - v1091.t) / 3600000;
        if (v1095 <= 0 || v1095 > v809 / 3600000 || v1092.gap) {
          continue;
        }
        const v1096 = Math.max(0, (v1093 + v1094) / 2) * v1089;
        v1085 += v1096 * v1095;
        v1088 += v1096 * v1095;
        v1086 += v1095 * 60;
        const v1097 = Math.max(Math.abs(v1093), Math.abs(v1094)) * v1089;
        if (v1087 === null || v1097 > v1087) {
          v1087 = v1097;
        }
      }
      return {
        wh: v1085,
        coveredMin: v1086,
        avgW: v1086 > 0 ? v1088 / (v1086 / 60) : null,
        peakW: v1087
      };
    }
    const v855 = () => ({
      version: v810,
      repairVersion: v811,
      kind: "charge-capacity-reference",
      cap: null,
      kwh: null,
      soh: null,
      usable: false,
      why: "nodata"
    });
    const v856 = v1098 => v1098 === null ? "unknown" : v1098 < 10 ? "cold" : v1098 > 40 ? "hot" : "moderate";
    function v857(v1099, v1100) {
      const v1101 = v1099?.sampleVersion === v810;
      const v1102 = v830(v1099?.rawA);
      const v1103 = 1;
      const v1104 = v1101 && v1102 !== null ? v1102 : v830(v1099?.a);
      const v1105 = v830(v1099?.w);
      return {
        index: v1100,
        t: v830(v1099?.t),
        soc: v830(v1099?.soc),
        a: v1104 === null ? null : v1104 * v1103,
        v: v830(v1099?.v),
        w: v1105 === null ? null : v1105 * v1103,
        cf: v830(v1099?.cf),
        state: v1099?.state,
        source: v1101 ? v1102 !== null ? "raw-current" : "derived-current" : "legacy-unknown",
        socSource: v1101 ? v1099.socSource : "unknown",
        temp: v830(v1099?.temp),
        valid: !!v1099 && (!v1101 || v1099.socSource === "battery" || v1099.socSource === "home-aligned") && (v1099.state === undefined && !v1101 || v1099.state === 1)
      };
    }
    const v858 = (v1106, v1107 = false) => !!v1106 && v1106.valid && v1106.t > 0 && v1106.soc !== null && v1106.soc >= (v1107 ? 0 : v812.minSoc) && v1106.soc <= (v1107 ? 100 : v812.maxSoc) && v1106.a > 0 && v1106.w > 0;
    const v859 = v1108 => ["time", "missing-readings"].includes(v1108?.gapReason);
    function v860(v1109, v1110, v1111) {
      if (v1111[v1110.index]?.healthGap || v1111[v1110.index]?.gapReason && !v859(v1111[v1110.index])) {
        return "explicit-gap";
      }
      if (v1111[v1110.index]?.gap && !v859(v1111[v1110.index])) {
        return "legacy-gap-unclassified";
      }
      if (v1109.t >= v1110.t) {
        return "time-invalid";
      }
      if (v1109.source !== v1110.source || v1109.socSource !== v1110.socSource) {
        return "source-change";
      }
      if (v1109.cf !== null && v1110.cf !== null && v1110.cf < v1109.cf) {
        return "session-reset";
      }
      for (const v1114 of ["sessionId", "segmentId", "ownerId", "ownerUid", "vin", "clearAt", "generation"]) {
        if (v1111[v1109.index]?.[v1114] !== v1111[v1110.index]?.[v1114]) {
          return "identity-or-session-change";
        }
      }
      const v1112 = v1110.soc - v1109.soc;
      const v1113 = (v1110.t - v1109.t) / 60000;
      if (v1112 < 0 || v1112 > Math.max(3, v1113 * 1.5)) {
        return "soc-jump";
      }
      return "";
    }
    function v861(v1115, v1116, v1117, v1118, v1119 = false) {
      const v1120 = v1115[v1117];
      const v1121 = v1115[v1118];
      const v1122 = (v1147, v1148) => {
        const v1149 = [v1115[v1147]];
        for (let v1150 = 1; v1150 < 32; v1150++) {
          const v1151 = v1115[v1147 + v1148 * v1150];
          const v1152 = v1149.at(-1);
          if (!v858(v1151, v1119)) {
            return null;
          }
          const v1153 = v1148 < 0 ? v1151 : v1152;
          const v1154 = v1148 < 0 ? v1152 : v1151;
          if (v1154.t <= v1153.t || v1154.t - v1153.t > v809 || v860(v1153, v1154, v1116)) {
            return null;
          }
          v1149.push(v1151);
          if (v1149.length >= 3 && Math.abs(v1151.t - v1149[0].t) >= 120000) {
            if (v1148 < 0) {
              return v1149.reverse();
            } else {
              return v1149;
            }
          }
        }
        return null;
      };
      const v1123 = v1122(v1117, -1);
      const v1124 = v1122(v1118, 1);
      if (!v1123 || !v1124) {
        return null;
      }
      const v1125 = [...v1123, ...v1124];
      const v1126 = v1123.at(-2);
      const v1127 = v1124[1];
      const v1128 = (v1121.t - v1120.t) / 60000;
      const v1129 = (v1120.t - v1123[0].t) / 60000;
      const v1130 = (v1124.at(-1).t - v1121.t) / 60000;
      if (v1128 <= 0 || v1128 > v812.repairMaxMinutes) {
        return null;
      }
      if (v1125.some(v1155 => v1155.state !== 1 || v1155.source !== v1120.source || v1155.socSource !== v1120.socSource || v1155.v === null || v1155.v <= 0 || v1116[v1155.index]?.currentConflict === true)) {
        return null;
      }
      if (v860(v1126, v1120, v1116) || v860(v1120, v1121, v1116) || v860(v1121, v1127, v1116)) {
        return null;
      }
      if (v1125.some(v1156 => v1156.cf === null) || Math.abs(v1121.cf - v1120.cf - v1128) > 2 || Math.abs(v1120.cf - v1123[0].cf - v1129) > 2 || Math.abs(v1124.at(-1).cf - v1121.cf - v1130) > 2) {
        return null;
      }
      const v1131 = v1125.every(v1157 => v1157.temp !== null);
      const v1132 = v1125.every(v1158 => v1158.temp === null);
      if (!v1131 && !v1132 || v1131 && Math.max(...v1125.map(v1159 => v1159.temp)) - Math.min(...v1125.map(v1160 => v1160.temp)) > 5) {
        return null;
      }
      for (let v1161 = v1117 + 1; v1161 < v1118; v1161++) {
        const v1162 = v1115[v1161];
        const v1163 = v1115[v1161 - 1];
        if (!v1162.valid || v1162.state !== 1 || v1162.soc === null || v1162.soc < v1120.soc || v1162.soc > v1121.soc || v1162.t <= v1163.t || v1162.cf === null || v1162.cf < v1163.cf || v1162.soc < v1163.soc || Math.abs(v1162.cf - v1120.cf - (v1162.t - v1120.t) / 60000) > 2 || v1162.a !== null && (v1162.a <= 0 || Math.abs(v1162.a - (v1120.a + (v1121.a - v1120.a) * (v1162.t - v1120.t) / (v1121.t - v1120.t))) > Math.max(v1120.a, v1121.a) * 0.15) || v1162.v !== null && (v1162.v <= 0 || Math.abs(v1162.v - (v1120.v + (v1121.v - v1120.v) * (v1162.t - v1120.t) / (v1121.t - v1120.t))) > Math.max(v1120.v, v1121.v) * 0.03) || v1162.w !== null && (v1162.w <= 0 || Math.abs(v1162.w - (v1120.w + (v1121.w - v1120.w) * (v1162.t - v1120.t) / (v1121.t - v1120.t))) > Math.max(v1120.w, v1121.w) * 0.15) || v1116[v1161]?.currentConflict || v1116[v1161]?.healthGap || v1116[v1161]?.gap && !v859(v1116[v1161]) || v1116[v1161]?.gapReason && !v859(v1116[v1161]) || v1162.socSource !== v1120.socSource || v1131 && (v1162.temp === null || Math.max(v1162.temp, ...v1125.map(v1164 => v1164.temp)) - Math.min(v1162.temp, ...v1125.map(v1165 => v1165.temp)) > 5) || v1132 && v1162.temp !== null) {
          return null;
        }
        for (const v1166 of ["sessionId", "segmentId", "ownerId", "ownerUid", "vin", "clearAt", "generation"]) {
          if (v1116[v1161]?.[v1166] !== v1116[v1117]?.[v1166]) {
            return null;
          }
        }
      }
      if (v1118 > v1117 + 1 && (v1115[v1118 - 1].soc > v1121.soc || v1115[v1118 - 1].cf > v1121.cf)) {
        return null;
      }
      const v1133 = v1125.map(v1167 => v1167.a);
      const v1134 = v875(v1133);
      const v1135 = v1125.map(v1168 => v1168.v);
      const v1136 = v1125.map(v1169 => v1169.w);
      if ((Math.max(...v1133) - Math.min(...v1133)) / v1134 > 0.15 || (Math.max(...v1136) - Math.min(...v1136)) / v875(v1136) > 0.15 || (Math.max(...v1135) - Math.min(...v1135)) / v875(v1135) > 0.03) {
        return null;
      }
      const v1137 = v1125.map(v1170 => (v1170.t - v1120.t) / 60000);
      const v1138 = v1137.reduce((v1171, v1172) => v1171 + v1172, 0) / v1137.length;
      const v1139 = v1133.reduce((v1173, v1174) => v1173 + v1174, 0) / v1133.length;
      const v1140 = v1137.reduce((v1175, v1176, v1177) => v1175 + (v1176 - v1138) * (v1133[v1177] - v1139), 0) / v1137.reduce((v1178, v1179) => v1178 + (v1179 - v1138) ** 2, 0);
      const v1141 = Math.max(...v1137.map((v1180, v1181) => Math.abs(v1133[v1181] - (v1139 + v1140 * (v1180 - v1138)))));
      if (v1141 / v1134 > 0.05) {
        return null;
      }
      const v1142 = v875([(v1120.soc - v1123[0].soc) / v1129, (v1124.at(-1).soc - v1121.soc) / v1130]);
      if (Math.abs(v1121.soc - v1120.soc - v1142 * v1128) > 2 + Math.abs(v1142 * v1128) * 0.35) {
        return null;
      }
      let v1143 = 0;
      const v1144 = v1182 => v1182.a !== null ? v1182.a : v1120.a + (v1121.a - v1120.a) * (v1182.t - v1120.t) / (v1121.t - v1120.t);
      for (let v1183 = v1117 + 1; v1183 <= v1118; v1183++) {
        v1143 += (v1144(v1115[v1183 - 1]) + v1144(v1115[v1183])) / 2 * (v1115[v1183].t - v1115[v1183 - 1].t) / 3600000;
      }
      const v1145 = Math.max(v1134 * 0.05, v1141, Math.abs(v1140) * v1128 / 2);
      const v1146 = v1115.slice(v1117, v1118 + 1).map(v1144);
      return {
        from: v1120.t,
        to: v1121.t,
        minutes: v1128,
        estimatedAh: v1143,
        lowerAh: Math.max(0, Math.min(...v1133, ...v1146) - v1145) * v1128 / 60,
        upperAh: (Math.max(...v1133, ...v1146) + v1145) * v1128 / 60,
        method: "local-linear",
        support: v1125.map(v1184 => v1184.t),
        temperatureKnown: v1131,
        currentRange: [Math.min(...v1133), Math.max(...v1133)],
        residual: v1141,
        boundKind: "local-trend-envelope-not-confidence"
      };
    }
    function v862(v1185, v1186, v1187) {
      const v1188 = v860(v1185, v1186, v1187);
      if (v1188) {
        return v1188;
      }
      if (v1185.state !== 1 || v1186.state !== 1) {
        return "unknown-or-stopped";
      }
      if (v1185.cf === null || v1186.cf === null || v1185.cf < 0 || v1186.cf < 0 || Math.abs(v1186.cf - v1185.cf - (v1186.t - v1185.t) / 60000) > v814.clockToleranceMinutes) {
        return "charge-clock";
      }
      for (const v1189 of ["sampleVersion", "currentSource", "powerSource", "source", "timeBasis", "measurementSide"]) {
        if (v1187[v1185.index]?.[v1189] !== v1187[v1186.index]?.[v1189]) {
          return "source-change";
        }
      }
      return "";
    }
    function v863(v1190, v1191) {
      if (!v858(v1190, true) || v1190.state !== 1 || v1190.cf === null || v1190.cf < 0 || !(v1190.v > 0)) {
        return false;
      }
      const v1192 = v1191[v1190.index];
      if (v1192?.currentConflict || v1192?.sampleVersion === v810 && v1192.currentSource !== undefined && v1192.currentSource !== v1190.source) {
        return false;
      }
      return Math.abs(v1190.v * v1190.a - v1190.w) <= v1190.w * 0.2;
    }
    function v864(v1193, v1194, v1195, v1196) {
      const v1197 = v1193[v1195];
      const v1198 = v1193[v1196];
      const v1199 = (v1198.t - v1197.t) / 60000;
      if (!(v1199 > 0) || !(v1199 <= v814.maxMinutes) || !v863(v1197, v1194) || !v863(v1198, v1194) || v862(v1197, v1198, v1194)) {
        return null;
      }
      const v1200 = (v1215, v1216) => {
        const v1217 = [v1193[v1215]];
        for (let v1218 = 1; v1218 < 32; v1218++) {
          const v1219 = v1193[v1215 + v1216 * v1218];
          const v1220 = v1217.at(-1);
          if (!v863(v1219, v1194)) {
            return null;
          }
          const v1221 = v1216 < 0 ? v1219 : v1220;
          const v1222 = v1216 < 0 ? v1220 : v1219;
          if (v1222.t - v1221.t > v814.supportMaxMinutes * 60000 || v862(v1221, v1222, v1194)) {
            return null;
          }
          v1217.push(v1219);
          if (v1217.length >= 3 && Math.abs(v1219.t - v1217[0].t) >= 120000) {
            if (v1216 < 0) {
              return v1217.reverse();
            } else {
              return v1217;
            }
          }
        }
        return null;
      };
      const v1201 = v1200(v1195, -1);
      const v1202 = v1200(v1196, 1);
      if (!v1201 || !v1202) {
        return null;
      }
      const v1203 = [...v1201, ...v1202];
      if (v1203.some(v1223 => !v863(v1223, v1194) || Math.abs(v1223.cf - v1197.cf - (v1223.t - v1197.t) / 60000) > v814.clockToleranceMinutes)) {
        return null;
      }
      const v1204 = v1203.map(v1224 => v1224.w);
      const v1205 = v1203.map(v1225 => v1225.a);
      const v1206 = v1203.map(v1226 => v1226.v);
      if ((Math.max(...v1204) - Math.min(...v1204)) / v875(v1204) > v814.powerSpread || (Math.max(...v1205) - Math.min(...v1205)) / v875(v1205) > 0.15 || (Math.max(...v1206) - Math.min(...v1206)) / v875(v1206) > 0.03) {
        return null;
      }
      const v1207 = (v1197.t - v1201[0].t) / 60000;
      const v1208 = (v1202.at(-1).t - v1198.t) / 60000;
      const v1209 = v875([(v1197.soc - v1201[0].soc) / v1207, (v1202.at(-1).soc - v1198.soc) / v1208]);
      if (Math.abs(v1198.soc - v1197.soc - v1209 * v1199) > 2 + Math.abs(v1209 * v1199) * 0.35) {
        return null;
      }
      const v1210 = v1227 => v1227.w !== null ? v1227.w : v1197.w + (v1198.w - v1197.w) * (v1227.t - v1197.t) / (v1198.t - v1197.t);
      for (let v1228 = v1195 + 1; v1228 < v1196; v1228++) {
        const v1229 = v1193[v1228];
        const v1230 = v1194[v1228];
        if (!v1229.valid || v1229.state !== 1 || v1229.t <= 0 || v1229.soc === null || v1229.soc < v1197.soc || v1229.soc > v1198.soc || v862(v1193[v1228 - 1], v1229, v1194) || v862(v1229, v1198, v1194) || Math.abs(v1229.cf - v1197.cf - (v1229.t - v1197.t) / 60000) > v814.clockToleranceMinutes || v1230?.currentConflict || v1229.a !== null && (v1229.a <= 0 || Math.abs(v1229.a - v1197.a) > v875(v1205) * 0.15) || v1229.v !== null && (v1229.v <= 0 || Math.abs(v1229.v - v1197.v) > v875(v1206) * 0.03) || v1229.w !== null && (v1229.w <= 0 || Math.abs(v1229.w - (v1197.w + (v1198.w - v1197.w) * (v1229.t - v1197.t) / (v1198.t - v1197.t))) > v875(v1204) * 0.15)) {
          return null;
        }
      }
      let v1211 = 0;
      let v1212 = 0;
      for (let v1231 = v1195 + 1; v1231 <= v1196; v1231++) {
        const v1232 = v1193[v1231 - 1];
        const v1233 = v1193[v1231];
        const v1234 = (v1233.t - v1232.t) / 60000;
        if (v1232.w !== null && v1233.w !== null && v1234 <= v809 / 60000 && !v1194[v1231]?.gap) {
          continue;
        }
        const v1235 = Math.max(0, (v1210(v1232) + v1210(v1233)) / 2);
        if (!Number.isFinite(v1235)) {
          return null;
        }
        v1211 += v1235 * v1234 / 60;
        v1212 += v1234;
      }
      if (!(v1212 > 0) || !Number.isFinite(v1211) || !(v1211 >= 0)) {
        return null;
      }
      const v1213 = v1236 => Object.fromEntries(["t", "cf", "soc", "v", "a", "w"].map(v1237 => [v1237, v830(v1236[v1237])]));
      const v1214 = v1194.slice(v1195 + 1, v1196 + 1).some((v1238, v1239) => v1238.t - v1194[v1195 + v1239].t > v809 || v1238.gap);
      return {
        method: "local-linear",
        from: v1197.t,
        to: v1198.t,
        minutes: v1212,
        metrics: v1214 ? ["soc", "w"] : ["w"],
        start: v1213(v1194[v1195]),
        end: v1213(v1194[v1196]),
        estimatedKwh: v1211 / 1000,
        support: v1203.map(v1240 => v1240.t)
      };
    }
    function v865(v1241) {
      const v1242 = {
        version: v813,
        kind: "session-energy-estimate",
        repairs: [],
        estimatedKwh: 0,
        estimatedMin: 0,
        caveats: ["estimate-not-for-capacity", "unobserved-changes-possible"]
      };
      if (!Array.isArray(v1241) || v1241.length < 6) {
        return v1242;
      }
      if (v1241.some(v1246 => v1246?.curveOnly)) {
        return {
          ...v1242,
          caveats: [...v1242.caveats, "downsampled-no-repair-inference"]
        };
      }
      const v1243 = v1241.map(v857);
      const v1244 = [];
      if (v1243.some((v1247, v1248) => v1247.t === null || v1247.t <= 0 || v1248 > 0 && v1247.t <= v1243[v1248 - 1].t)) {
        return {
          ...v1242,
          caveats: [...v1242.caveats, "time-invalid"]
        };
      }
      let v1245 = -1;
      for (let v1249 = 0; v1249 < v1243.length; v1249++) {
        if (!v863(v1243[v1249], v1241)) {
          continue;
        }
        if (v1245 >= 0 && (v1249 > v1245 + 1 || v1243[v1249].t - v1243[v1245].t > v809 || v1241[v1249]?.gap)) {
          const v1250 = v864(v1243, v1241, v1245, v1249);
          if (v1250) {
            v1244.push(v1250);
          }
        }
        v1245 = v1249;
      }
      return {
        ...v1242,
        repairs: v1244,
        estimatedKwh: v1244.reduce((v1251, v1252) => v1251 + v1252.estimatedKwh, 0),
        estimatedMin: v1244.reduce((v1253, v1254) => v1253 + v1254.minutes, 0),
        caveats: [...v1242.caveats, ...(v1244.length ? ["contains-estimated-gap"] : [])]
      };
    }
    function v866(v1255) {
      const v1256 = v1255.map(v1258 => v830(v1258.cf)).filter(v1259 => v1259 !== null);
      const v1257 = v1256.length ? v1256.at(-1) : null;
      if (v1257 !== null && v1257 > 0) {
        return Math.round(v1257);
      } else {
        return Math.round((v1255.at(-1).t - v1255[0].t) / 60000);
      }
    }
    function v867(v1260, v1261, v1262, v1263 = v1262) {
      const v1264 = v1260.coveredMin + v1261.estimatedMin;
      const v1265 = Math.max(0, Math.max(v1262, v1263) - v1264);
      const v1266 = v1260.coveredMin > 0 ? Math.round(v1260.wh) / 1000 : null;
      const v1267 = v1264 > 0 ? v1260.wh / 1000 + v1261.estimatedKwh : null;
      return {
        ...v1261,
        observedKwh: v1266,
        totalKwh: v1267,
        observedMin: v1260.coveredMin,
        coveredMin: v1264,
        missingMin: v1265,
        complete: v1262 > 0 && v1265 <= 0.000001,
        avgW: v1264 > 0 ? (v1260.wh + v1261.estimatedKwh * 1000) / (v1264 / 60) : null
      };
    }
    function v868(v1268) {
      if (!v1268 || v1268.version !== v813 || v1268.kind !== "session-energy-estimate" || !Array.isArray(v1268.repairs) || v1268.repairs.length > 8192) {
        return null;
      }
      const v1269 = {
        ...v1268
      };
      const v1270 = ["observedKwh", "estimatedKwh", "totalKwh", "observedMin", "estimatedMin", "coveredMin", "missingMin", "avgW"];
      for (const v1272 of v1270) {
        v1269[v1272] = v830(v1268[v1272]);
      }
      if (["estimatedKwh", "observedMin", "estimatedMin", "coveredMin", "missingMin"].some(v1273 => v1269[v1273] === null || v1269[v1273] < 0) || v1269.observedKwh !== null && v1269.observedKwh < 0 || v1269.totalKwh !== null && v1269.totalKwh < 0 || v1269.avgW !== null && v1269.avgW < 0 || !v876(v1269.coveredMin, v1269.observedMin + v1269.estimatedMin) || v1269.coveredMin > 0 && (v1269.totalKwh === null || v1269.avgW === null || Math.abs(v1269.totalKwh - ((v1269.observedKwh || 0) + v1269.estimatedKwh)) > 0.00050001 || !v876(v1269.totalKwh, v1269.avgW * v1269.coveredMin / 60 / 1000)) || typeof v1269.complete !== "boolean" || v1269.complete && v1269.missingMin > 0.000001) {
        return null;
      }
      const v1271 = [];
      for (const v1274 of v1269.repairs) {
        const v1275 = {
          ...v1274,
          ...Object.fromEntries(["from", "to", "minutes", "estimatedKwh"].map(v1276 => [v1276, v830(v1274?.[v1276])]))
        };
        if (!(v1275.from > 0) || !(v1275.to > v1275.from) || !(v1275.to <= Date.now()) || !(v1275.minutes > 0) || !((v1275.to - v1275.from) / 60000 <= v814.maxMinutes) || !(v1275.minutes <= (v1275.to - v1275.from) / 60000 + 0.000001) || v1275.estimatedKwh === null || !(v1275.estimatedKwh >= 0) || v1275.method !== "local-linear" || v1271.length && v1275.from < v1271.at(-1).to || !Array.isArray(v1275.metrics) || !v1275.metrics.length || v1275.metrics.some(v1277 => !["soc", "w"].includes(v1277)) || !Array.isArray(v1275.support) || v1275.support.length < 6 || v1275.support.length > 64 || v1275.support.some((v1278, v1279) => v830(v1278) === null || v1278 <= 0 || v1278 > Date.now() || v1279 > 0 && v1278 <= v1275.support[v1279 - 1]) || v1275.support.filter(v1280 => v1280 <= v1275.from).length < 3 || v1275.support.filter(v1281 => v1281 >= v1275.to).length < 3 || !v1275.support.includes(v1275.from) || !v1275.support.includes(v1275.to) || !v1275.start || !v1275.end || v830(v1275.start.t) !== v1275.from || v830(v1275.end.t) !== v1275.to || ["t", "cf", "soc", "v", "a", "w"].some(v1282 => v830(v1275.start[v1282]) === null || v830(v1275.end[v1282]) === null) || !(v1275.start.w > 0) || !(v1275.end.w > 0)) {
          return null;
        }
        v1271.push(v1275);
      }
      if (!v876(v1271.reduce((v1283, v1284) => v1283 + v1284.estimatedKwh, 0), v1269.estimatedKwh) || !v876(v1271.reduce((v1285, v1286) => v1285 + v1286.minutes, 0), v1269.estimatedMin)) {
        return null;
      }
      return {
        ...v1269,
        repairs: v1271,
        caveats: [...new Set([...(Array.isArray(v1269.caveats) ? v1269.caveats : []), "estimate-not-for-capacity", "unobserved-changes-possible"])]
      };
    }
    const v869 = new WeakMap();
    function v870(v1287, v1288) {
      if (!v1287) {
        return null;
      }
      const v1289 = {
        ...v1287
      };
      for (const v1290 of ["observedKwh", "estimatedKwh", "totalKwh", "avgW"]) {
        if (Number.isFinite(v1289[v1290])) {
          v1289[v1290] *= v1288;
        }
      }
      v1289.repairs = (v1287.repairs || []).map(v1291 => ({
        ...v1291,
        estimatedKwh: v1291.estimatedKwh * v1288,
        start: {
          ...v1291.start,
          a: v1291.start.a * v1288,
          w: v1291.start.w * v1288
        },
        end: {
          ...v1291.end,
          a: v1291.end.a * v1288,
          w: v1291.end.w * v1288
        }
      }));
      return v1289;
    }
    function v871(v1292) {
      if (!v1292 || typeof v1292 !== "object") {
        return null;
      }
      const v1293 = v869.get(v1292);
      if (v1293) {
        const v1296 = v1293.raw;
        const v1297 = v871(v1296);
        if (v1293.scale !== 1 && v1296 && !Array.isArray(v1296.pts)) {
          return v870(v1297, v1293.scale);
        } else {
          return v1297;
        }
      }
      const v1294 = v1292.pts;
      const v1295 = Array.isArray(v1294) && v1294.length >= 2 && v1292.curveOnly !== true && !v1294.some(v1298 => v1298?.curveOnly) && (v830(v1292.n) !== null ? v830(v1292.n) === v1294.length : v1294.length < v801) && (v830(v1292.rawCount) === null || v830(v1292.rawCount) === v1294.length) && v1292.truncated !== true;
      if (v1295 && v1294.every((v1299, v1300) => v1299 && v830(v1299.t) > 0 && (v1300 === 0 || v830(v1299.t) > v830(v1294[v1300 - 1].t)))) {
        return v867(v854(v1294), v865(v1294), (v830(v1294.at(-1).t) - v830(v1294[0].t)) / 60000, v866(v1294));
      }
      return v868(v1292.energyRepair);
    }
    function v872(v1301) {
      const v1302 = {
        version: v811,
        repairs: [],
        estimatedMin: 0,
        caveats: []
      };
      if (!Array.isArray(v1301) || v1301.length < 6) {
        return v1302;
      }
      if (v1301.some(v1309 => v1309?.curveOnly)) {
        return {
          ...v1302,
          caveats: ["downsampled-no-repair-inference"]
        };
      }
      const v1303 = v1301.map(v857);
      const v1304 = [];
      let v1305 = -1;
      const v1306 = v1310 => Object.fromEntries(["t", "cf", "soc", "v", "a", "w"].map(v1311 => [v1311, v830(v1310[v1311])]));
      for (let v1312 = 0; v1312 < v1303.length; v1312++) {
        if (!v858(v1303[v1312], true)) {
          continue;
        }
        if (v1305 >= 0 && (v1312 > v1305 + 1 || v1303[v1312].t - v1303[v1305].t > v809 || v859(v1301[v1312]))) {
          const v1313 = v861(v1303, v1301, v1305, v1312, true);
          if (v1313) {
            const v1314 = v1303[v1312].t - v1303[v1305].t > v809 && v1312 === v1305 + 1 || v1301.slice(v1305 + 1, v1312 + 1).some((v1316, v1317) => v830(v1316.t) - v830(v1301[v1305 + v1317].t) > v809);
            const v1315 = ["soc", "v", "a", "w"].filter(v1318 => (v1314 || v1301.slice(v1305 + 1, v1312).some(v1319 => v830(v1319[v1318]) === null)) && v830(v1301[v1305][v1318]) !== null && v830(v1301[v1312][v1318]) !== null && (v1318 !== "a" || v876(v830(v1301[v1305].a), v1303[v1305].a) && v876(v830(v1301[v1312].a), v1303[v1312].a)));
            if (v1315.length) {
              v1304.push({
                ...v1313,
                metrics: v1315,
                start: v1306(v1301[v1305]),
                end: v1306(v1301[v1312])
              });
            }
          }
        }
        v1305 = v1312;
      }
      const v1307 = v1304.reduce((v1320, v1321) => v1320 + v1321.minutes, 0);
      const v1308 = (v830(v1301.at(-1)?.t) - v830(v1301[0]?.t)) / 60000;
      if (!(v1308 > 0) || v1307 / v1308 > v812.repairMaxFraction) {
        return {
          ...v1302,
          caveats: ["repair-budget-exceeded"]
        };
      }
      return {
        version: v811,
        repairs: v1304,
        estimatedMin: v1307,
        caveats: v1304.length ? ["contains-estimated-gap", "repair-envelope-not-confidence"] : []
      };
    }
    function v873(v1322, v1323) {
      if (v1322.length < 2) {
        return null;
      }
      let v1324 = 0;
      for (let v1342 = 1; v1342 < v1322.length; v1342++) {
        if (v1322[v1342].soc > v1322[v1324].soc) {
          v1324 = v1342;
        }
      }
      if (!v1324) {
        return null;
      }
      const v1325 = v1322.slice(0, v1324 + 1);
      const v1326 = v1323.slice(0, v1324);
      const v1327 = v1325[0];
      const v1328 = v1325.at(-1);
      const v1329 = v1328.soc - v1327.soc;
      const v1330 = v1326.filter(v1343 => v1343.repair).map(v1344 => v1344.repair);
      const v1331 = v1345 => v1326.reduce((v1346, v1347) => v1346 + (v1347[v1345] || 0), 0);
      const v1332 = v1331("observedAh");
      const v1333 = v1330.reduce((v1348, v1349) => v1348 + v1349.estimatedAh, 0);
      const v1334 = v1331("observedMin");
      const v1335 = v1330.reduce((v1350, v1351) => v1350 + v1351.minutes, 0);
      const v1336 = v1332 + v1333;
      const v1337 = v1334 + v1335;
      const v1338 = v1332 + v1330.reduce((v1352, v1353) => v1352 + v1353.lowerAh, 0);
      const v1339 = v1332 + v1330.reduce((v1354, v1355) => v1354 + v1355.upperAh, 0);
      const v1340 = v1325.map(v1356 => v1356.temp).filter(v1357 => v1357 !== null);
      const v1341 = v1329 >= v812.minDelta && v1337 >= v812.minMinutes && v1336 > 0;
      return {
        ...v855(),
        usable: v1341,
        why: v1341 ? "ok" : "soc-small",
        ah: v1336 / (v1329 / 100),
        observedAh: v1332,
        estimatedAh: v1333,
        chargedAh: v1336,
        observedMin: v1334,
        estimatedMin: v1335,
        spanMin: v1337,
        spanCov: v1334 / v1337,
        estimatedFraction: v1335 / v1337,
        estimatedAhFraction: v1333 / v1336,
        lowerAh: v1338,
        upperAh: v1339,
        ahLower: v1338 / (v1329 / 100),
        ahUpper: v1339 / (v1329 / 100),
        repairs: v1330,
        boundKind: "local-trend-envelope-not-confidence",
        dSoc: v1329,
        s0: v1327.soc,
        s1: v1328.soc,
        ranges: [[v1327.soc, v1328.soc]],
        from: v1327.t,
        to: v1328.t,
        source: v1327.source,
        socSource: v1327.socSource,
        temperature: v856(v1340.length === v1325.length ? v875(v1340) : null),
        tempMin: v1340.length ? Math.min(...v1340) : null,
        tempMax: v1340.length ? Math.max(...v1340) : null,
        measurementSide: "unknown",
        timeBasis: "received-or-unknown",
        caveats: ["measurement-side-unknown", "soc-model-unknown", "field-time-unverified", ...(v1327.source === "raw-current" ? [] : ["current-may-be-derived"]), ...(v1340.length === v1325.length ? [] : ["temperature-unknown"]), ...(v1327.socSource === "battery" ? [] : ["soc-source-unverified"]), ...(v1330.length ? ["contains-estimated-gap", "repair-envelope-not-confidence"] : [])]
      };
    }
    function v874(v1358, v1359 = {}) {
      const v1360 = v855();
      if (!Array.isArray(v1358) || v1358.length < 3) {
        return {
          ...v1360,
          blocks: []
        };
      }
      if (v1358.some(v1377 => v1377?.curveOnly)) {
        return {
          ...v1360,
          why: "downsampled",
          blocks: []
        };
      }
      const v1361 = v1358.map(v857);
      const v1362 = [];
      const v1363 = new Set();
      let v1364 = [];
      let v1365 = [];
      let v1366 = false;
      let v1367 = Infinity;
      let v1368 = -Infinity;
      const v1369 = () => {
        const v1378 = v873(v1364, v1365);
        if (v1378) {
          v1362.push(v1378);
        }
        v1364 = [];
        v1365 = [];
        v1366 = false;
        v1367 = Infinity;
        v1368 = -Infinity;
      };
      for (let v1379 = 0; v1379 < v1361.length; v1379++) {
        const v1380 = v1361[v1379];
        const v1381 = v1361[v1379 - 1];
        if (v1381 && v1380.t !== null && v1381.t !== null && v1380.t <= v1381.t) {
          return {
            ...v1360,
            why: "time-invalid",
            blocks: v1362
          };
        }
        if (!v858(v1380) || v1358[v1379]?.currentConflict) {
          const v1383 = v1380.valid && v1380.state === 1 && v1380.t > 0 && v1380.soc >= v812.minSoc && v1380.soc <= v812.maxSoc && (v1380.a === null || v1380.a > 0) && (v1380.w === null || v1380.w > 0) && !v1358[v1379]?.currentConflict && (!v1358[v1379]?.gap || v859(v1358[v1379])) && !v1358[v1379]?.healthGap && (!v1358[v1379]?.gapReason || v859(v1358[v1379]));
          if (v1383 && v1364.length) {
            v1366 = true;
            continue;
          }
          v1369();
          v1363.add(v1358[v1379]?.currentConflict ? "current-conflict" : !v1380.valid ? "unknown-source" : v1380.a !== null && v1380.a <= 0 || v1380.w !== null && v1380.w <= 0 ? "reverse-or-zero" : v1380.soc !== null && (v1380.soc < 20 || v1380.soc > 80) ? "soc-window" : "gap");
          continue;
        }
        const v1382 = v1364.at(-1);
        if (v1382) {
          const v1384 = v860(v1382, v1380, v1358);
          const v1385 = v856(v1380.temp) !== v856(v1382.temp) || v1380.temp !== null && Math.max(v1380.temp, v1368) - Math.min(v1380.temp, v1367) > 5;
          if (v1384 || v1385) {
            v1363.add(v1384 || "temperature-change");
            v1369();
          } else {
            const v1386 = (v1380.t - v1382.t) / 60000;
            const v1387 = v1366 || v1386 > v809 / 60000 || v859(v1358[v1379]);
            const v1388 = v1387 && v1359.repair !== false ? v861(v1361, v1358, v1382.index, v1379) : null;
            if (v1387 && !v1388) {
              v1363.add("unrepaired-gap");
              v1369();
            } else {
              v1365.push(v1388 ? {
                repair: v1388
              } : {
                observedAh: (v1382.a + v1380.a) / 2 * v1386 / 60,
                observedMin: v1386
              });
            }
          }
        }
        v1364.push(v1380);
        v1366 = false;
        if (v1380.temp !== null) {
          v1367 = Math.min(v1367, v1380.temp);
          v1368 = Math.max(v1368, v1380.temp);
        }
      }
      v1369();
      if (v1359.repair !== false && v1362.some(v1389 => v1389.estimatedFraction > v812.repairMaxFraction)) {
        const v1390 = v874(v1358, {
          repair: false
        });
        return {
          ...v1390,
          caveats: [...new Set([...(v1390.caveats || []), "repair-budget-exceeded"])]
        };
      }
      const v1370 = v1362.filter(v1391 => v1391.usable);
      const v1371 = [];
      for (const v1392 of v1370) {
        let v1393 = v1371.find(v1394 => v1394.every(v1395 => v1395.source === v1392.source && v1395.socSource === v1392.socSource && v1395.temperature === v1392.temperature && (v1392.temperature === "unknown" || Math.max(v1395.tempMax, v1392.tempMax) - Math.min(v1395.tempMin, v1392.tempMin) <= 5)));
        if (!v1393) {
          v1393 = [];
          v1371.push(v1393);
        }
        v1393.push(v1392);
      }
      v1371.sort((v1396, v1397) => v1397.reduce((v1398, v1399) => v1398 + v1399.dSoc, 0) - v1396.reduce((v1400, v1401) => v1400 + v1401.dSoc, 0));
      const v1372 = v1371[0];
      if (!v1372) {
        return {
          ...v1360,
          why: [...v1363][0] || "soc-small",
          blocks: v1362,
          caveats: [...v1363]
        };
      }
      const v1373 = v1402 => v1372.reduce((v1403, v1404) => v1403 + v1404[v1402], 0);
      const v1374 = v1373("dSoc");
      const v1375 = v1373("chargedAh");
      const v1376 = v1373("spanMin");
      return {
        ...v1372[0],
        blocks: v1362,
        selectedBlocks: v1372.map(v1405 => v1405.from),
        dSoc: v1374,
        s0: Math.min(...v1372.map(v1406 => v1406.s0)),
        s1: Math.max(...v1372.map(v1407 => v1407.s1)),
        ranges: v1372.flatMap(v1408 => v1408.ranges),
        from: v1372[0].from,
        to: v1372.at(-1).to,
        ah: v1375 / (v1374 / 100),
        chargedAh: v1375,
        observedAh: v1373("observedAh"),
        estimatedAh: v1373("estimatedAh"),
        observedMin: v1373("observedMin"),
        estimatedMin: v1373("estimatedMin"),
        spanMin: v1376,
        spanCov: v1373("observedMin") / v1376,
        estimatedFraction: v1373("estimatedMin") / v1376,
        estimatedAhFraction: v1373("estimatedAh") / v1375,
        lowerAh: v1373("lowerAh"),
        upperAh: v1373("upperAh"),
        ahLower: v1373("lowerAh") / (v1374 / 100),
        ahUpper: v1373("upperAh") / (v1374 / 100),
        repairs: v1372.flatMap(v1409 => v1409.repairs),
        tempMin: v1372[0].temperature === "unknown" ? null : Math.min(...v1372.map(v1410 => v1410.tempMin)),
        tempMax: v1372[0].temperature === "unknown" ? null : Math.max(...v1372.map(v1411 => v1411.tempMax)),
        caveats: [...new Set([...v1372.flatMap(v1412 => v1412.caveats), ...v1363])]
      };
    }
    function v875(v1413) {
      const v1414 = [...v1413].sort((v1416, v1417) => v1416 - v1417);
      const v1415 = Math.floor(v1414.length / 2);
      if (v1414.length % 2) {
        return v1414[v1415];
      } else {
        return (v1414[v1415 - 1] + v1414[v1415]) / 2;
      }
    }
    const v876 = (v1418, v1419) => Number.isFinite(v1418) && Number.isFinite(v1419) && Math.abs(v1418 - v1419) <= Math.max(1, Math.abs(v1418), Math.abs(v1419)) * 0.000001;
    function v877(v1420) {
      if (!v1420 || v1420.version !== v810 || v1420.kind !== "charge-capacity-reference" || v1420.usable !== true) {
        return null;
      }
      const v1421 = {
        ...v1420
      };
      const v1422 = ["ah", "dSoc", "spanMin", "spanCov", "s0", "s1", "from", "to", "chargedAh", "tempMin", "tempMax"];
      for (const v1424 of v1422) {
        v1421[v1424] = v830(v1420[v1424]);
      }
      if (!(v1421.ah > 0) || !(v1421.dSoc >= v812.minDelta) || !(v1421.spanMin >= v812.minMinutes) || !(v1421.s0 >= 20) || !(v1421.s1 <= 80) || !(v1421.s1 > v1421.s0) || !(v1421.from > 0) || !(v1421.to > v1421.from) || !(v1421.to <= Date.now()) || !(v1421.spanMin <= (v1421.to - v1421.from) / 60000 + 0.000001) || !v876(v1421.ah * v1421.dSoc / 100, v1421.chargedAh)) {
        return null;
      }
      if (!["raw-current", "derived-current", "legacy-unknown"].includes(v1421.source) || !["unknown", "cold", "moderate", "hot"].includes(v1421.temperature)) {
        return null;
      }
      if (v1421.temperature === "unknown") {
        if (v1421.tempMin !== null || v1421.tempMax !== null) {
          return null;
        }
      } else if (v1421.tempMin === null || v1421.tempMax === null || v1421.tempMin > v1421.tempMax || v1421.tempMax - v1421.tempMin > 5 || v856(v1421.tempMin) !== v1421.temperature || v856(v1421.tempMax) !== v1421.temperature) {
        return null;
      }
      const v1423 = v1420.repairVersion === v811;
      v1421.ranges = v1423 && Array.isArray(v1420.ranges) ? v1420.ranges.map(v1425 => Array.isArray(v1425) ? v1425.map(v830) : []) : [[v1421.s0, v1421.s1]];
      if (!v1421.ranges.length || v1421.ranges.length > v797 || v1421.ranges.some(v1426 => v1426.length !== 2 || v1426[0] === null || v1426[1] === null || v1426[0] < 20 || v1426[1] > 80 || v1426[1] <= v1426[0]) || !v876(v1421.ranges.reduce((v1427, v1428) => v1427 + v1428[1] - v1428[0], 0), v1421.dSoc) || !v876(Math.min(...v1421.ranges.map(v1429 => v1429[0])), v1421.s0) || !v876(Math.max(...v1421.ranges.map(v1430 => v1430[1])), v1421.s1)) {
        return null;
      }
      if (v1423) {
        for (const v1431 of ["observedAh", "estimatedAh", "observedMin", "estimatedMin", "estimatedFraction", "estimatedAhFraction", "lowerAh", "upperAh", "ahLower", "ahUpper"]) {
          v1421[v1431] = v830(v1420[v1431]);
        }
        if ([v1421.observedAh, v1421.estimatedAh, v1421.observedMin, v1421.estimatedMin].some(v1432 => v1432 === null || v1432 < 0) || !v876(v1421.observedAh + v1421.estimatedAh, v1421.chargedAh) || !v876(v1421.observedMin + v1421.estimatedMin, v1421.spanMin) || !v876(v1421.estimatedFraction, v1421.estimatedMin / v1421.spanMin) || !v876(v1421.estimatedAhFraction, v1421.estimatedAh / v1421.chargedAh) || !v876(v1421.spanCov, v1421.observedMin / v1421.spanMin) || v1421.estimatedFraction > v812.repairMaxFraction || v1421.lowerAh < v1421.observedAh || v1421.lowerAh > v1421.chargedAh || v1421.upperAh < v1421.chargedAh || !v876(v1421.ahLower, v1421.lowerAh / (v1421.dSoc / 100)) || !v876(v1421.ahUpper, v1421.upperAh / (v1421.dSoc / 100))) {
          return null;
        }
        if (!Array.isArray(v1420.repairs) || v1420.repairs.length > v797) {
          return null;
        }
        v1421.repairs = v1420.repairs.map(v1433 => ({
          ...v1433,
          ...Object.fromEntries(["from", "to", "minutes", "estimatedAh", "lowerAh", "upperAh"].map(v1434 => [v1434, v830(v1433?.[v1434])])),
          support: Array.isArray(v1433?.support) ? v1433.support.map(v830) : []
        }));
        if (v1421.repairs.some(v1435 => ["from", "to", "minutes", "estimatedAh", "lowerAh", "upperAh"].some(v1436 => v1435[v1436] === null) || !(v1435.from >= v1421.from) || !(v1435.to <= v1421.to) || !(v1435.to > v1435.from) || !(v1435.estimatedAh > 0) || !(v1435.lowerAh >= 0) || !(v1435.lowerAh <= v1435.estimatedAh) || !(v1435.upperAh >= v1435.estimatedAh) || !(v1435.minutes <= v812.repairMaxMinutes) || !v876(v1435.minutes, (v1435.to - v1435.from) / 60000) || v1435.method !== "local-linear" || v1435.support.length < 6 || v1435.support.length > 64 || v1435.support.some((v1437, v1438) => v1437 === null || v1437 <= 0 || v1437 > Date.now() || v1438 > 0 && v1437 <= v1435.support[v1438 - 1]) || v1435.support.filter(v1439 => v1439 <= v1435.from).length < 3 || v1435.support.filter(v1440 => v1440 >= v1435.to).length < 3 || !v1435.support.includes(v1435.from) || !v1435.support.includes(v1435.to) || v1435.from - v1435.support[0] < 120000 || v1435.support.at(-1) - v1435.to < 120000) || !v876(v1421.repairs.reduce((v1441, v1442) => v1441 + v1442.estimatedAh, 0), v1421.estimatedAh) || !v876(v1421.repairs.reduce((v1443, v1444) => v1443 + v1444.minutes, 0), v1421.estimatedMin) || !v876(v1421.observedAh + v1421.repairs.reduce((v1445, v1446) => v1445 + v1446.lowerAh, 0), v1421.lowerAh) || !v876(v1421.observedAh + v1421.repairs.reduce((v1447, v1448) => v1447 + v1448.upperAh, 0), v1421.upperAh)) {
          return null;
        }
      } else {
        if (v1421.spanCov !== 1 || !v876(v1421.spanMin, (v1421.to - v1421.from) / 60000)) {
          return null;
        }
        Object.assign(v1421, {
          observedAh: v1421.chargedAh,
          estimatedAh: 0,
          observedMin: v1421.spanMin,
          estimatedMin: 0,
          estimatedFraction: 0,
          estimatedAhFraction: 0,
          lowerAh: v1421.chargedAh,
          upperAh: v1421.chargedAh,
          ahLower: v1421.ah,
          ahUpper: v1421.ah,
          repairs: []
        });
      }
      v1421.measurementSide = "unknown";
      v1421.caveats = [...new Set([...(Array.isArray(v1420.caveats) ? v1420.caveats.filter(v1449 => typeof v1449 === "string") : []), "measurement-side-unknown", "soc-model-unknown", "field-time-unverified"])];
      return v1421;
    }
    function v878(v1450) {
      if (!v1450 || typeof v1450 !== "object") {
        return null;
      }
      const v1451 = v1450.pts;
      const v1452 = Array.isArray(v1451) && v1451.length >= 3 && v1450.curveOnly !== true && (v830(v1450.n) !== null ? v830(v1450.n) === v1451.length : v1451.length < v801);
      if (v1452 && (v1450.rawStatistics !== true || v1450.health?.repairVersion !== v811)) {
        return v877(v874(v1451));
      }
      if (v1450.estimatorVersion === v810 && v1450.rawStatistics === true) {
        return v877(v1450.health);
      }
      if (v1452) {
        return v877(v874(v1451));
      } else {
        return null;
      }
    }
    function v879(v1453) {
      const v1454 = new Map();
      const v1455 = new Set();
      for (const v1457 of [...v1453].sort((v1458, v1459) => (v830(v1459.e) || 0) - (v830(v1458.e) || 0))) {
        const v1460 = v878(v1457);
        if (!v1460) {
          continue;
        }
        const v1461 = v1457.id || v1457.s + "/" + v1457.e;
        if (v1455.has(v1461)) {
          continue;
        }
        const v1462 = v1460.source + "|" + v1460.temperature + "|";
        let v1463 = [...v1454.keys()].find(v1465 => v1465.startsWith(v1462) && v1454.get(v1465).every(v1466 => v1460.temperature === "unknown" || Math.max(v1466.h.tempMax, v1460.tempMax) - Math.min(v1466.h.tempMin, v1460.tempMin) <= 5));
        if (!v1463) {
          v1463 = v1462 + v1454.size;
        }
        const v1464 = v1454.get(v1463) || [];
        if (v1464.some(v1467 => Math.max(v830(v1467.session.s) || v1467.h.from, v830(v1457.s) || v1460.from) < Math.min(v830(v1467.session.e) || v1467.h.to, v830(v1457.e) || v1460.to) + 1800000 || Math.abs((v830(v1467.session.s) || v1467.h.from) - (v830(v1457.s) || v1460.from)) < 90000 && Math.abs((v830(v1467.session.e) || v1467.h.to) - (v830(v1457.e) || v1460.to)) < 90000)) {
          continue;
        }
        v1455.add(v1461);
        v1464.push({
          session: v1457,
          h: v1460
        });
        v1454.set(v1463, v1464);
      }
      const v1456 = [];
      for (const v1468 of v1454.values()) {
        if (v1468.length < v812.minSessions) {
          continue;
        }
        const v1469 = v875(v1468.map(v1484 => v1484.h.ah));
        const v1470 = v875(v1468.map(v1485 => Math.abs(v1485.h.ah - v1469)));
        const v1471 = Math.max(v1469 * 0.15, v1470 * 4.4478);
        const v1472 = v1468.filter(v1486 => Math.abs(v1486.h.ah - v1469) <= v1471);
        const v1473 = v1472.reduce((v1487, v1488) => v1487 + v1488.h.dSoc, 0);
        const v1474 = v1472.flatMap(v1489 => v1489.h.ranges).sort((v1490, v1491) => v1490[0] - v1491[0]);
        let v1475 = 0;
        let v1476 = -Infinity;
        for (const [v1492, v1493] of v1474) {
          v1475 += Math.max(0, v1493 - Math.max(v1492, v1476));
          v1476 = Math.max(v1476, v1493);
        }
        if (v1472.length < v812.minSessions || v1473 < v812.minTotalDelta || v1475 < v812.minSocCoverage) {
          continue;
        }
        const v1477 = v875(v1472.map(v1494 => v1494.h.ah));
        const v1478 = Math.sqrt(v1472.reduce((v1495, v1496) => v1495 + (v1496.h.ah - v1477) ** 2, 0) / v1472.length) / v1477;
        const v1479 = v1472[0].h.source;
        const v1480 = v1472[0].h.temperature;
        const v1481 = v1497 => v1472.reduce((v1498, v1499) => v1498 + v1499.h[v1497], 0);
        const v1482 = v1481("estimatedAh");
        const v1483 = v1481("estimatedMin");
        v1456.push({
          version: v810,
          repairVersion: v811,
          kind: "charge-capacity-reference",
          ah: Math.round(v1477 * 100) / 100,
          observedAh: v1481("observedAh"),
          estimatedAh: v1482,
          chargedAh: v1481("chargedAh"),
          observedMin: v1481("observedMin"),
          estimatedMin: v1483,
          estimatedFraction: v1483 / v1481("spanMin"),
          estimatedAhFraction: v1482 / v1481("chargedAh"),
          lowerAh: v1481("lowerAh"),
          upperAh: v1481("upperAh"),
          ahLower: v875(v1472.map(v1500 => v1500.h.ahLower)),
          ahUpper: v875(v1472.map(v1501 => v1501.h.ahUpper)),
          repairs: v1472.flatMap(v1502 => v1502.h.repairs),
          boundKind: "local-trend-envelope-not-confidence",
          kwh: null,
          cap: null,
          soh: null,
          n: v1472.length,
          sessions: v1472.length,
          dSocSum: v1473,
          socCoverage: v1475,
          spread: v1478,
          theoRel: null,
          source: v1479,
          temperature: v1480,
          rejected: v1468.length - v1472.length,
          measurementSide: "unknown",
          solid: v1472.length >= v812.stableSessions && v1478 <= 0.08 && v1480 === "moderate" && v1483 === 0 && !v1472.some(v1503 => v1503.h.caveats.some(v1504 => ["soc-jump", "current-conflict", "identity-or-session-change"].includes(v1504))),
          caveats: [...new Set(v1472.flatMap(v1505 => v1505.h.caveats || []))]
        });
      }
      v1456.sort((v1506, v1507) => v1507.n - v1506.n || v1507.socCoverage - v1506.socCoverage || v1506.spread - v1507.spread);
      return v1456[0] || null;
    }
    function v880(v1508, v1509) {
      const v1510 = (v1508 || []).filter(v1522 => v1522 && v1522.t);
      if (v1510.length < 2) {
        return null;
      }
      const v1511 = v1510[0];
      const v1512 = v1510[v1510.length - 1];
      const v1513 = v1510.map(v1523 => v830(v1523.soc)).filter(v1524 => v1524 !== null);
      const v1514 = v854(v1510);
      const v1515 = v867(v1514, v865(v1510), (v1512.t - v1511.t) / 60000, v866(v1510));
      const v1516 = v874(v1510);
      const v1517 = v1510.map(v1525 => v830(v1525.cf)).filter(v1526 => v1526 !== null);
      const v1518 = v1517.length ? v1517[v1517.length - 1] : null;
      const v1519 = v1518 !== null && v1518 > 0 ? Math.round(v1518) : Math.round((v1512.t - v1511.t) / 60000);
      const v1520 = v1519 > 0 ? v1512.t - v1519 * 60000 : v1511.t;
      const v1521 = v830(v1511.odo) !== null && v830(v1511.odo) >= 0 ? v1511 : null;
      return {
        s: v1520,
        e: v1512.t,
        soc0: v1513.length ? v1513[0] : null,
        soc1: v1513.length ? v1513[v1513.length - 1] : null,
        odo0: v1521 ? v830(v1521.odo) : null,
        odo0At: v1521 ? v830(v1521.t) : null,
        odo0Soc: v1521 ? v830(v1521.soc) : null,
        odo1: v830(v1512.odo) !== null && v830(v1512.odo) >= 0 ? v830(v1512.odo) : null,
        odo1At: v830(v1512.odo) !== null && v830(v1512.odo) >= 0 ? v830(v1512.t) : null,
        odo1Soc: v830(v1512.odo) !== null && v830(v1512.odo) >= 0 ? v830(v1512.soc) : null,
        kwh: v1514.coveredMin > 0 ? Math.round(v1514.wh) / 1000 : null,
        avgW: v1514.avgW === null ? null : Math.round(v1514.avgW),
        peakW: v1514.peakW === null ? null : Math.round(v1514.peakW),
        coveredMin: Math.round(v1514.coveredMin * 10) / 10,
        sampledMin: Math.round((v1512.t - v1511.t) / 6000) / 10,
        coverage: v1519 > 0 ? Math.min(1, v1514.coveredMin / v1519) : null,
        curveRepair: v872(v1510),
        energyRepair: v1515,
        estimatedKwh: v1515.estimatedKwh,
        totalKwh: v1515.totalKwh,
        estimatorVersion: v810,
        rawStatistics: true,
        health: v1516 && v1516.usable ? v1516 : null,
        cap: null,
        capD: v1516 && v1516.dSoc !== undefined ? v1516.dSoc : null,
        capCov: v1516 && v1516.spanCov !== undefined ? Math.round(v1516.spanCov * 100) / 100 : null,
        capWhy: v1516 ? v1516.why : "x",
        durMin: v1519,
        cf: v1518,
        n: v1510.length,
        at: v1509 || v1512.t
      };
    }
    function v881(v1527) {
      const v1528 = v830(v1527?.t);
      const v1529 = v830(v1527?.odo);
      const v1530 = v830(v1527?.soc);
      return {
        odo0: v1529 !== null && v1529 >= 0 ? v1529 : null,
        odo0At: v1528,
        odo0Soc: v1529 !== null && v1529 >= 0 && v1530 !== null && v1530 >= 0 && v1530 <= 100 ? v1530 : null
      };
    }
    function v882(v1531, v1532) {
      const v1533 = v880(v1531.pts, v1532);
      if (!v1533) {
        return;
      }
      const v1534 = Array.isArray(v1531.sessions) ? v1531.sessions : [];
      const v1535 = v1531.energyRetainedId || (v1531.energyCurrentStart ? v836(v1531) : "");
      const v1536 = Math.max(v830(v1531.energyFloor) || 0, v830(v1531.clearAt) || 0, v824());
      const v1537 = {
        ...v1533,
        ...v1531.rangeAnchor,
        id: v836(v1531),
        confirmed: true,
        ...(v1535 === v836(v1531) && v1532 > v1536 ? {
          postClearAt: v1532
        } : {})
      };
      v839(v1531, [v1537]);
      delete v1531.energyCurrentStart;
      delete v1531.energyRetainedId;
      v1534.unshift({
        ...v1537,
        pts: v853(v1531.pts)
      });
      v1531.sessions = v799(v1534);
    }
    function v883(v1538, {
      includeHidden = false
    } = {}) {
      if (!v1538) {
        return [];
      }
      const v1539 = v847(v1538);
      if (Array.isArray(v1539.sessions)) {
        return v1539.sessions.filter(v1540 => v799([v1540]).length && (includeHidden || v1540?.hidden !== true)).map(v1541 => {
          const v1542 = v871(v1541);
          const v1543 = window.CAPBOOK?.scale?.(v1538) || 1;
          const v1544 = Array.isArray(v1541.pts) && v1541.n === v1541.pts.length;
          const v1545 = v830(v1541.kwh);
          const v1546 = v1545 !== null ? v1545 : v1544 ? v854(v1541.pts).wh / 1000 : null;
          const v1547 = v1541.rawStatistics === true || v1544;
          const v1548 = v1544 || v1541.rawStatistics === true;
          const v1549 = v1547 ? v870(v1542, v1543) : null;
          const v1550 = v1544 ? v880(v1541.pts) ?? {} : v1547 ? v1541 : {};
          const v1551 = {
            ...v1541,
            kwh: v1546 === null ? null : v1548 ? v1546 * v1543 : v1546,
            energyRepair: v1549,
            avgW: v830(v1550.avgW) === null ? null : v1550.avgW * v1543,
            peakW: v830(v1550.peakW) === null ? null : v1550.peakW * v1543,
            estimatedKwh: v1549?.estimatedKwh ?? null,
            totalKwh: v1549?.totalKwh ?? null
          };
          v869.set(v1551, {
            raw: v1547 ? v1541 : {},
            scale: v1543
          });
          return v1551;
        });
      } else {
        return [];
      }
    }
    function v884(v1552) {
      if (!v1552) {
        return 0;
      }
      const v1553 = v847(v1552);
      if (Array.isArray(v1553.sessions)) {
        return v1553.sessions.filter(v1554 => v1554?.hidden === true).length;
      } else {
        return 0;
      }
    }
    function v885(v1555, v1556, v1557, v1558 = false) {
      if (!v1555 || !v1556) {
        return false;
      }
      try {
        const v1559 = v847(v1555);
        const v1560 = Array.isArray(v1559.sessions) ? v1559.sessions : [];
        const v1561 = v1569 => v1569?.id || (v1569 ? v1569.s + "|" + v1569.e : "");
        const v1562 = v1560.findIndex(v1570 => v1561(v1570) === v1556);
        if (v1562 < 0) {
          return false;
        }
        const v1563 = v1557 === true;
        if (v1560[v1562].hidden === true === v1563) {
          return true;
        }
        const v1564 = v835();
        const v1565 = v1564[v1555];
        if (!v1565 || !Array.isArray(v1565.sessions)) {
          return false;
        }
        const v1566 = v1564[v1555].sessions.findIndex(v1571 => v1561(v1571) === v1556);
        if (v1566 < 0) {
          return false;
        }
        const v1567 = {
          ...v1564[v1555].sessions[v1566]
        };
        if (v1563) {
          v1567.hidden = true;
        } else {
          delete v1567.hidden;
        }
        v1564[v1555].sessions[v1566] = v1567;
        const v1568 = v832();
        return v795(v843(v1564, v1558), v1572 => {
          v833(v1572 === false ? "充电记录隐藏失败" : v1563 ? "充电记录已从列表隐藏" : "充电记录已恢复显示", v1568, {
            phase: "end",
            kind: v1572 === false ? "err" : "ok",
            extra: {
              accepted: v1572 !== false,
              hidden: v1563
            }
          });
          return v1572 !== false;
        });
      } catch {
        return false;
      }
    }
    function v886(v1573, v1574 = null) {
      const v1575 = v1574 || v847(v1573);
      const v1576 = v1575.nativeRevision !== undefined ? v1575 : v846(v1573);
      return (!v822() || v1575.nativeRevision !== undefined) && (v1576?.nativeRevision === undefined || v1575.nativeRevision !== undefined);
    }
    function v887(v1577) {
      if (!v1577) {
        return {
          usable: 0,
          dSocSum: 0,
          socCoverage: 0,
          recentDays: v812.recentDays
        };
      }
      const v1578 = Date.now();
      const v1579 = v883(v1577, {
        includeHidden: true
      });
      const v1580 = new Set();
      const v1581 = [];
      for (const v1585 of v1579.sort((v1586, v1587) => (v830(v1587.e) || 0) - (v830(v1586.e) || 0))) {
        const v1588 = v830(v1585?.e);
        const v1589 = v1585?.id || v1585?.s + "/" + v1585?.e;
        if (v1588 === null || v1588 <= v1578 - v812.recentDays * 86400000 || v1580.has(v1589)) {
          continue;
        }
        v1580.add(v1589);
        const v1590 = v878(v1585);
        if (v1590) {
          v1581.push(v1590);
        }
      }
      const v1582 = v1581.flatMap(v1591 => Array.isArray(v1591.ranges) ? v1591.ranges : [[v1591.s0, v1591.s1]]).filter(v1592 => Array.isArray(v1592) && Number.isFinite(v1592[0]) && Number.isFinite(v1592[1]) && v1592[1] > v1592[0]).sort((v1593, v1594) => v1593[0] - v1594[0]);
      let v1583 = 0;
      let v1584 = -Infinity;
      for (const [v1595, v1596] of v1582) {
        v1583 += Math.max(0, v1596 - Math.max(v1595, v1584));
        v1584 = Math.max(v1584, v1596);
      }
      return {
        usable: v1581.length,
        dSocSum: v1581.reduce((v1597, v1598) => v1597 + (v830(v1598.dSoc) || 0), 0),
        socCoverage: v1583,
        recentDays: v812.recentDays,
        source: [...new Set(v1581.map(v1599 => v1599.source))],
        temperature: [...new Set(v1581.map(v1600 => v1600.temperature))]
      };
    }
    let v888 = null;
    function v889(v1601) {
      if (!v1601) {
        return null;
      }
      const v1602 = v823();
      const v1603 = v793.ns(v796);
      const v1604 = Date.now();
      let v1605;
      let v1606;
      let v1607;
      try {
        v1605 = v793.get(v1603);
        v1606 = v793.get(v793.ns(window.CAPBOOK?.KEY || "zeeho.cap.v1"));
        v1607 = v793.get(v793.ns(v808));
      } catch {
        v888 = null;
        return null;
      }
      const v1608 = v825(v1601, v1602?.id, v1602?.uid);
      const v1609 = JSON.stringify([v1603, v1601, v1602?.id, v1602?.uid, window.API?.source, window.CAPBOOK?.scale?.(v1601) || 1, v810, v811, v822(), v818, v819, v817.has(v1608), v816.get(v1608)]);
      if (v888?.identity === v1609 && v888.rawText === v1605 && v888.capText === v1606 && v888.clearText === v1607 && v1604 >= v888.createdAt && v1604 < v888.expires) {
        return JSON.parse(v888.value);
      }
      const v1610 = v847(v1601);
      if (!v886(v1601, v1610)) {
        v888 = null;
        return null;
      }
      const v1611 = [...(Array.isArray(v1610.sessions) ? v1610.sessions : []), ...(window.CAPBOOK?.health?.(v1601) || [])];
      const v1612 = v1611.filter(v1617 => v830(v1617.e) > v1604 - v812.recentDays * 86400000 && v830(v1617.e) <= v1604).sort((v1618, v1619) => v830(v1619.e) - v830(v1618.e));
      const v1613 = new Set();
      const v1614 = v879(v1612.filter(v1620 => {
        const v1621 = v1620.id || v1620.s + "/" + v1620.e;
        if (v1613.has(v1621)) {
          return false;
        }
        v1613.add(v1621);
        return true;
      }).slice(0, v812.recentSessions));
      const v1615 = window.CAPBOOK?.scale?.(v1601) || 1;
      if (v1614 && v1615 !== 1) {
        for (const v1622 of ["ah", "ahLower", "ahUpper", "observedAh", "estimatedAh", "chargedAh"]) {
          if (Number.isFinite(v1614[v1622])) {
            v1614[v1622] *= v1615;
          }
        }
      }
      const v1616 = Math.min(Infinity, ...v1612.map(v1623 => v830(v1623.e) + v812.recentDays * 86400000), ...v1611.filter(v1624 => v830(v1624.e) > v1604).map(v1625 => v830(v1625.e)));
      v888 = {
        identity: v1609,
        rawText: v1605,
        capText: v1606,
        clearText: v1607,
        createdAt: v1604,
        expires: v1616,
        value: JSON.stringify(v1614)
      };
      return v1614;
    }
    function v890(v1626) {
      return v883(v1626, {
        includeHidden: true
      })[0] || null;
    }
    function v891(v1627, v1628, v1629 = Date.now()) {
      const v1630 = v830(v1628);
      const v1631 = 10;
      if (!Array.isArray(v1627) || v1630 === null || v1630 <= v1631 || v1630 > 100) {
        return null;
      }
      const v1632 = new Map();
      const v1633 = v1638 => [...v1638].sort((v1639, v1640) => v1639 - v1640)[Math.floor(v1638.length / 2)];
      for (let v1641 = 1; v1641 < v1627.length; v1641 += 2) {
        const v1642 = v1627[v1641 - 1];
        const v1643 = v1627[v1641];
        if (![v1642?.t, v1643?.t, v1642?.soc, v1643?.soc, v1642?.odo, v1643?.odo].every(Number.isFinite) || v1642.t < v1629 - v798 || v1643.t > v1629 || v1643.t <= v1642.t || v1643.t - v1642.t > 900000 || (v1642.state ?? v1642.st) !== 0 || (v1643.state ?? v1643.st) !== 0 || v1642.gap || v1643.gap || v1642.soc <= v1643.soc || v1642.soc - v1643.soc > 5 || v1643.soc < v1631 || v1642.soc > 100 || v1642.odo < 0 || v1643.odo <= v1642.odo) {
          continue;
        }
        const v1644 = Math.floor(v1643.soc / 10) * 10;
        if (v1642.soc > v1644 + 10) {
          continue;
        }
        const v1645 = (v1643.odo - v1642.odo) / 1000;
        if (v1645 / ((v1643.t - v1642.t) / 3600000) > 130) {
          continue;
        }
        const v1646 = v1632.get(v1644) || [];
        v1646.push({
          day: Math.floor(v1642.t / 86400000),
          rate: v1645 / (v1642.soc - v1643.soc)
        });
        v1632.set(v1644, v1646);
      }
      let v1634 = 0;
      const v1635 = new Set();
      for (const v1647 of v1632.values()) {
        for (const v1648 of v1647) {
          v1635.add(v1648.day);
        }
      }
      const v1636 = Math.min(3, Math.max(1, v1635.size));
      const v1637 = v1635.size >= 3 ? 6 : 4;
      for (let v1649 = v1631; v1649 < v1630; v1649 += 10) {
        const v1650 = v1632.get(v1649) || [];
        const v1651 = new Map();
        for (const v1654 of v1650) {
          const v1655 = v1651.get(v1654.day) || [];
          v1655.push(v1654.rate);
          v1651.set(v1654.day, v1655);
        }
        if (v1650.length < v1637 || v1651.size < v1636) {
          return null;
        }
        const v1652 = [...v1651.values()].map(v1633);
        const v1653 = v1633(v1652);
        if (!(v1653 > 0) || v1633(v1652.map(v1656 => Math.abs(v1656 - v1653))) / v1653 > 0.35) {
          return null;
        }
        v1652.sort((v1657, v1658) => v1657 - v1658);
        v1634 += v1652[Math.floor((v1652.length - 1) * 0.25)] * Math.min(10, v1630 - v1649);
      }
      if (Number.isFinite(v1634) && v1634 > 0) {
        return Math.round(v1634);
      } else {
        return null;
      }
    }
    function v892(v1659, v1660, v1661, v1662 = Date.now()) {
      const v1663 = v830(v1659?.e);
      const v1664 = v830(v1659?.soc1);
      const v1665 = v830(v1659?.odo1);
      const v1666 = v1663 !== null && v1663 > 0 && v1663 <= v1662;
      const v1667 = v1660?.charge?.charging === false && v1660?.charge?.known !== false;
      const v1668 = v830(v1660?.sampleAt);
      const v1669 = v830(v1661?.sampleAt);
      const v1670 = v1666 && v1667 && (v1668 === null || v1668 >= v1663);
      const v1671 = v830(v1661?.soc) !== null;
      const v1672 = v1671 ? v1669 : v1668;
      const v1673 = v1666 && v1667 && (v1672 === null || v1672 >= v1663);
      const v1674 = v830(v1671 ? v1661.soc : v1660?.soc);
      const v1675 = v830(v1660?.totalMile);
      const v1676 = v1673 && v1664 !== null && v1664 >= 0 && v1664 <= 100 && v1674 !== null && v1674 >= 0 && v1674 <= v1664 ? v1664 - v1674 : null;
      const v1677 = v1670 && v1665 !== null && v1665 >= 0 && v1675 !== null && v1675 >= 0 && v1675 * 1000 >= v1665 ? (v1675 * 1000 - v1665) / 1000 : null;
      const v1678 = v1668 === null && v1672 === null || v1668 !== null && v1672 !== null && Math.abs(v1668 - v1672) <= 90000;
      return {
        days: v1666 && v1667 ? Math.floor((v1662 - v1663) / 86400000) : null,
        km: v1677,
        used: v1676,
        per10: v1678 && v1677 !== null && v1677 > 0 && v1676 >= 5 ? v1677 / v1676 * 10 : null,
        soc1: v1666 && v1664 !== null && v1664 >= 0 && v1664 <= 100 ? v1664 : null,
        minutes: v1666 && v830(v1659?.durMin) > 0 ? v830(v1659.durMin) : null
      };
    }
    function v893(v1679, v1680, v1681) {
      if (!v1679 || !v1680) {
        return null;
      }
      if (v822()) {
        const v1694 = v847(v1679);
        return {
          logged: false,
          ended: v1694.ended,
          reset: false,
          pts: v1694.pts.length
        };
      }
      const v1682 = v835();
      let v1683 = v1682[v1679] && Array.isArray(v1682[v1679].pts) ? v1682[v1679] : {
        pts: [],
        ended: false,
        at: v824()
      };
      if (!Array.isArray(v1683.sessions)) {
        v1683.sessions = [];
      }
      const v1684 = v1683.pts;
      if (v1680.charge?.known === false || v1680.charge?.charging === undefined) {
        const v1695 = v830(v1681?.sampleAt ?? v1681?.receivedAt ?? v1680.sampleAt);
        if (v1684.length && !v1683.ended && v1695 !== null && v1695 > (v830(v1683.at) || 0)) {
          v1683.healthGapAt = Math.max(v830(v1683.healthGapAt) || 0, v1695);
          v1682[v1679] = v1683;
          v843(v1682);
        }
        return {
          logged: false,
          ended: v1683.ended,
          reset: false,
          pts: v1684.length
        };
      }
      const v1685 = !!v1680.charge.charging;
      const v1686 = v1684[v1684.length - 1];
      const v1687 = v851(v1680, v1681);
      const v1688 = Math.max(v830(v1686?.t) || 0, v830(v1683.at) || 0);
      if (v1687.t === null || v1687.t <= 0 || v1687.t <= v1688) {
        return {
          logged: false,
          ended: v1683.ended,
          reset: false,
          pts: v1684.length
        };
      }
      v1683.webId = v1684.length ? v836(v1683) : "web:" + v1687.t;
      if (!v1685) {
        if (v1684.length && !v1683.ended) {
          v1683.ended = true;
          v1683.at = v1687.t;
          v882(v1683, v1683.at);
          v1682[v1679] = v1683;
          const v1696 = v843(v1682);
          if (v834(v1681)) {
            v833(v1696 === false ? "网页充电结束记录保存失败" : "网页充电记录已结束", v832(), {
              phase: "end",
              kind: v1696 === false ? "err" : "info",
              extra: {
                points: v1684.length,
                sampleAt: v1687.t,
                accepted: v1696 !== false,
                archived: v1684.length >= 2
              }
            });
          }
          return {
            logged: false,
            ended: true,
            reset: false,
            pts: v1684.length
          };
        }
        return {
          logged: false,
          ended: v1683.ended,
          reset: false,
          pts: v1684.length
        };
      }
      let v1689 = false;
      if (v1683.ended) {
        v1689 = true;
      } else if (v1686) {
        if (v1687.soc !== null && v1686.soc !== null && v1687.soc < v1686.soc - 1) {
          v1689 = true;
        } else if (v1687.cf !== null && v1686.cf !== null && v1687.cf < v1686.cf - 1) {
          v1689 = true;
        } else if (v1687.cf === null && v1687.t - v1686.t > v803) {
          v1689 = true;
        }
      }
      if (v1689) {
        if (v1684.length && !v1683.ended) {
          v882(v1683, v1687.t);
        }
        v1683 = {
          pts: [],
          ended: false,
          at: 0,
          webId: "web:" + v1687.t,
          sessions: v1683.sessions,
          clearAt: v1683.clearAt || 0,
          nativeAt: v1683.nativeAt || 0,
          segmentAfter: v1688,
          energyRows: v1683.energyRows || [],
          energyFloor: v1683.energyFloor || 0
        };
      }
      const v1690 = !v1683.pts.length && !v1686;
      if (!v1683.rangeAnchor) {
        v1683.rangeAnchor = v881(v1683.pts[0] || v1687);
      }
      const v1691 = v1683.pts[v1683.pts.length - 1];
      if (v1691 && v830(v1683.healthGapAt) > v1691.t && v1687.t >= v830(v1683.healthGapAt)) {
        v1687.healthGap = true;
      }
      const v1692 = v1691 && !v1687.healthGap && v1687.t - v1691.t < v802 && v1691.soc === v1687.soc && v1691.v === v1687.v && v1691.a === v1687.a;
      if (!v1692) {
        v1683.pts.push(v1687);
      }
      if (v1683.pts.length > v797) {
        v1683.pts.splice(0, v1683.pts.length - v797);
      }
      v1683.ended = false;
      v1683.at = v1687.t;
      v1682[v1679] = v1683;
      const v1693 = v843(v1682);
      if (v834(v1681) && (!v1692 || v1689 || v1693 === false)) {
        v833(v1693 === false ? "网页充电采样保存失败" : v1689 ? "网页充电记录新一段" : v1690 ? "网页充电记录初始化" : "网页充电采样已接受", v832(), {
          phase: v1689 ? "reset" : v1690 ? "start" : "accepted",
          kind: v1693 === false ? "err" : "info",
          extra: {
            accepted: v1693 !== false,
            points: v1683.pts.length,
            sampleAt: v1687.t,
            soc: v1687.soc,
            voltage: v1687.v,
            current: v1687.a,
            watt: v1687.w,
            reset: v1689
          }
        });
      }
      return {
        logged: !v1692,
        ended: false,
        reset: v1689,
        pts: v1683.pts.length
      };
    }
    function v894(v1697, v1698) {
      if (v822() || !v1697 || !Array.isArray(v1698) || !v1698.length) {
        return 0;
      }
      const v1699 = v835();
      const v1700 = v1699[v1697] && Array.isArray(v1699[v1697].pts) ? v1699[v1697] : {
        pts: [],
        ended: false,
        at: 0
      };
      if (v1700.ended || v1700.nativeRevision !== undefined) {
        return 0;
      }
      const v1701 = Math.max(v830(v1700.nativeAt) || 0, v830(v1700.clearAt) || 0, v830(v1700.segmentAfter) || 0, v824());
      const v1702 = v1700.pts[0];
      const v1703 = v830(v1702?.cf);
      const v1704 = v1702 && v1703 !== null && v1703 >= 0 ? v1702.t - v1703 * 60000 : null;
      const v1705 = v1698.filter(v1708 => v1708 && v830(v1708.t) !== null && Number(v1708.t) > v1701 && Number(v1708.t) <= Date.now()).map(v1709 => ({
        t: Number(v1709.t),
        soc: v830(v1709.soc),
        v: v830(v1709.v),
        a: v830(v1709.a),
        w: v830(v1709.w),
        cf: v830(v1709.cf) !== null && v830(v1709.cf) >= 0 ? v830(v1709.cf) : null,
        temp: null
      })).filter(v1710 => v1710.t > 0 && v1710.soc !== null && v1710.v !== null && v1710.a !== null && v1710.w !== null && (!v1702 || v1710.t >= v1702.t || v1704 !== null && v1710.cf !== null && Math.abs(v1710.t - v1710.cf * 60000 - v1704) <= 90000)).sort((v1711, v1712) => v1711.t - v1712.t);
      if (!v1705.length) {
        return 0;
      }
      let v1706 = 0;
      const v1707 = [...v1700.pts];
      for (const v1713 of v1705) {
        if (v1707.some(v1714 => v1714.t === v1713.t || Math.abs(v1714.t - v1713.t) < v802 && v1714.soc === v1713.soc && v1714.v === v1713.v && v1714.a === v1713.a)) {
          continue;
        }
        v1707.push(v1713);
        v1706++;
      }
      v1707.sort((v1715, v1716) => v1715.t - v1716.t);
      v1700.pts = v1707.slice(-v797);
      v1700.at = Math.max(v830(v1700.at) || 0, v1700.pts.at(-1)?.t || 0);
      v1700.nativeAt = v1705.at(-1).t;
      v1699[v1697] = v1700;
      if (v843(v1699) === false) {
        return 0;
      } else {
        return v1706;
      }
    }
    function v895(v1717, v1718, v1719, v1720 = "", v1721 = false) {
      return v897(v1717, v1718, v1719, v1720, v1721);
    }
    function v896(v1722, v1723, v1724, v1725, v1726 = "", v1727 = false) {
      try {
        if (!v1723 || !Array.isArray(v1723.sessions) || !Array.isArray(v1724) || v1724.length > v1723.sessions.length + 1) {
          return false;
        }
        const v1728 = new Map();
        const v1729 = [v1723?.current, ...(v1723?.sessions || [])].filter(Boolean);
        for (const v1730 of v1724) {
          const v1731 = v1729.find(v1733 => v1733.id === v1730?.segmentId);
          if (!v1731 || v1728.has(v1730.segmentId) || v1730.complete !== true || v1730.vin !== v1722 || v1730.vin !== v1723.vin || v1730.ownerId !== v1723.ownerId || v1730.ownerId !== v1725 || v1730.ownerUid !== v1723.ownerUid || v1730.ownerUid !== v1726 || v1730.clearAt !== v1723.clearAt || v1730.from !== v1731.from || v1730.to !== v1731.to || !Number.isSafeInteger(v1730.from) || !Number.isSafeInteger(v1730.to) || v1730.to <= v1730.from || !Array.isArray(v1730.pts) || v1730.pts.length < 2 || v1730.pts.length > 8192 || !Number.isSafeInteger(v1731.rawCount) || v1730.pts.length !== v1731.rawCount || !Array.isArray(v1731.pts) || v1731.pts.length > v797) {
            return false;
          }
          const v1732 = new Map(v1730.pts.map(v1734 => [v1734?.t, v1734]));
          if (v1731.pts.some(v1735 => !v1732.has(v1735.t) || ["soc", "v", "a", "w", "state", "cf"].some(v1736 => v830(v1732.get(v1735.t)[v1736]) !== v830(v1735[v1736])) || v1735.healthGap && !v1732.get(v1735.t).healthGap || v1735.gap && !v1732.get(v1735.t).gap || v1735.gapReason && v1732.get(v1735.t).gapReason !== v1735.gapReason)) {
            return false;
          }
          v1728.set(v1730.segmentId, v1730);
        }
        return v897(v1722, v1723, v1725, v1726, v1727, v1728);
      } catch {
        return false;
      }
    }
    function v897(v1737, v1738, v1739, v1740 = "", v1741 = false, v1742 = new Map()) {
      const v1743 = v819;
      try {
        if (!v1737 || !v1738 || v1738.ok !== true || v1738.version !== 2 || v1738.vin !== v1737 || typeof v1738.ownerId !== "string" || !v1738.ownerId || v1738.ownerId !== String(v1739 || "") || typeof v1738.ownerUid !== "string" || v1738.ownerUid !== String(v1740 || "") || !Number.isSafeInteger(v1738.revision) || v1738.revision < 0 || !Number.isSafeInteger(v1738.clearAt) || v1738.clearAt < 0 || !Number.isSafeInteger(v1738.at) || v1738.at < 0 || !Array.isArray(v1738.sessions)) {
          return false;
        }
        const v1744 = v823();
        if (v1744 && (v1744.id !== v1738.ownerId || v1744.uid !== v1738.ownerUid)) {
          return false;
        }
        const v1745 = new Set();
        const v1746 = (v1767, v1768) => {
          if (!v1767 || typeof v1767.id !== "string" || !v1767.id || v1745.has(v1767.id) || v1767.ended !== v1768 || !Array.isArray(v1767.pts) || v1767.pts.length > v797 || v830(v1767.at) === null) {
            throw new Error("invalid_segment");
          }
          v1745.add(v1767.id);
          const v1769 = v1742.get(v1767.id);
          const v1770 = v1769 ? v1769.pts : v1767.pts;
          let v1771 = v1738.clearAt;
          const v1772 = v1770.map(v1773 => {
            if (!v1773 || !Number.isSafeInteger(v1773.t) || v1773.t <= v1771 || v1773.t > Date.now() || v830(v1773.soc) === null || v1773.soc < 0 || v1773.soc > 100 || v830(v1773.v) === null || v1773.v < 0 || v830(v1773.a) === null || v830(v1773.w) === null || v1769 && (v1773.t < v1769.from || v1773.t > v1769.to || v1773.state !== undefined && v1773.state !== 1)) {
              throw new Error("invalid_point");
            }
            v1771 = v1773.t;
            return {
              t: v1773.t,
              soc: Number(v1773.soc),
              v: Number(v1773.v),
              a: Number(v1773.a),
              w: Number(v1773.w),
              odo: v830(v1773.odo) !== null && v830(v1773.odo) >= 0 ? v830(v1773.odo) : null,
              ...Object.fromEntries(v815.filter(v1774 => v1773[v1774] !== undefined).map(v1775 => [v1775, v1773[v1775]])),
              ...(v1773.state !== undefined ? {
                state: v1773.state
              } : {}),
              ...(v1773.gapReason ? {
                gapReason: v1773.gapReason
              } : {}),
              ...(v1773.healthGap ? {
                healthGap: true
              } : {}),
              cf: v830(v1773.cf) !== null && v830(v1773.cf) >= 0 ? v830(v1773.cf) : null,
              temp: v830(v1773.temp),
              ...(v1773.gap ? {
                gap: true
              } : {})
            };
          });
          return {
            id: v1767.id,
            pts: v1772,
            at: Number(v1767.at),
            ended: v1768,
            ...(Number.isSafeInteger(v1767.from) && Number.isSafeInteger(v1767.to) ? {
              from: v1767.from,
              to: v1767.to
            } : {}),
            ...(Number.isSafeInteger(v1767.rawCount) ? {
              rawCount: v1767.rawCount,
              truncated: v1767.truncated === true
            } : {}),
            ...(v1769 ? {
              recovered: true,
              recoveredCount: v1772.length,
              truncated: false
            } : {})
          };
        };
        const v1747 = v1738.current === null ? null : v1746(v1738.current, false);
        if (v1747?.recovered) {
          v1747.summary = v880(v1747.pts, v1747.at);
          v1747.curveRepair = v1747.summary?.curveRepair;
          v1747.pts = v853(v1747.pts);
        }
        const v1748 = v1738.sessions.map(v1776 => v1746(v1776, true)).map(v1777 => ({
          ...v1777,
          ...(v880(v1777.pts, v1777.at) || {
            s: v1777.pts[0]?.t || v1777.at,
            e: v1777.pts.at(-1)?.t || v1777.at,
            n: v1777.pts.length,
            soc0: v1777.pts[0]?.soc ?? null,
            soc1: v1777.pts.at(-1)?.soc ?? null,
            kwh: null,
            avgW: null,
            peakW: null,
            coveredMin: 0,
            sampledMin: 0,
            coverage: null,
            cap: null,
            capD: null,
            capCov: null,
            capWhy: "nodata",
            durMin: 0,
            cf: null,
            at: v1777.at
          }),
          ...(v1777.pts.length === 1 ? v881(v1777.pts[0]) : {}),
          id: v1777.id,
          pts: v853(v1777.pts),
          ended: true
        }));
        const v1749 = v835();
        const v1750 = v1749[v1737];
        const v1751 = v1750?.nativeOwnerId === v1738.ownerId && v1750?.nativeOwnerUid === v1738.ownerUid;
        const v1752 = v1751 && v1738.clearAt === (v1750.clearAt || 0);
        const v1753 = v1747 && v1752 && v1750.nativeId === v1747.id ? v1750.rangeAnchor : null;
        const v1754 = v1747 ? v1753 || v881(v1747.pts[0]) : null;
        if (v1752) {
          for (const v1778 of v1748) {
            const v1779 = v1750.sessions?.find(v1781 => v1781.id === v1778.id);
            const v1780 = v1779?.odo0At !== undefined ? {
              odo0: v1779.odo0,
              odo0At: v1779.odo0At,
              odo0Soc: v1779.odo0Soc
            } : v1750.nativeId === v1778.id ? v1750.rangeAnchor : null;
            if (v1780 && (v830(v1780.odo0At) || Infinity) <= (v830(v1778.odo0At) || Infinity)) {
              Object.assign(v1778, v1780);
            }
          }
        }
        if (v1751 && v1738.clearAt === v1750.clearAt) {
          for (let v1783 = 0; v1783 < v1748.length; v1783++) {
            const v1784 = v1750.sessions?.find(v1785 => v1785.id === v1748[v1783].id && v1785.recovered && v1785.from === v1748[v1783].from && v1785.to === v1748[v1783].to);
            if (v1784 && (v1784.recoveredCount || 0) > (v1748[v1783].recoveredCount || v1748[v1783].n || 0)) {
              v1748[v1783] = v1784;
            }
          }
          const v1782 = v1750.recoveredCurrent;
          if (v1747 && v1782?.id === v1747.id && v1782.from === v1747.from && v1782.to <= v1747.to && v1782.recoveredCount > (v1747.recoveredCount || v1747.pts.length)) {
            v1747.summary = v1782.summary;
            v1747.curveRepair = v1782.curveRepair;
            v1747.recoveredPrefix = v1782;
          }
        }
        const v1755 = v825(v1737, v1738.ownerId, v1738.ownerUid);
        const v1756 = v816.get(v1755);
        if (v1738.clearAt < (v1756?.clearAt || 0) || v1738.revision < (v1756?.revision || 0) || v1751 && (v1738.revision < (v1750.nativeRevision || 0) || v1738.clearAt < (v1750.clearAt || 0))) {
          return false;
        }
        const v1757 = JSON.stringify([v1747, v1748]);
        let v1758 = 2166136261;
        let v1759 = 5381;
        for (let v1786 = 0; v1786 < v1757.length; v1786++) {
          v1758 = Math.imul(v1758 ^ v1757.charCodeAt(v1786), 16777619);
          v1759 = Math.imul(v1759, 33) ^ v1757.charCodeAt(v1786);
        }
        const v1760 = v1757.length + ":" + (v1758 >>> 0) + ":" + (v1759 >>> 0);
        if (v1751 && v1750.estimatorVersion === v810 && v1750.repairVersion === v811 && v1750.rangeAnchorVersion === 1 && v1750.healthEvidence === v1760 && !v1750.nativeInvalidated && v1738.revision === v1750.nativeRevision && v1738.clearAt === (v1750.clearAt || 0)) {
          v817.add(v1755);
          while (v817.size > v800 * 4) {
            v817.delete(v817.values().next().value);
          }
          return true;
        }
        let v1761 = [];
        if (v1738.clearAt === 0 && v1751) {
          v1761 = Array.isArray(v1750.legacySessions) ? v1750.legacySessions : [];
        } else if (v1738.clearAt === 0 && v1750 && v1750.nativeOwnerId === undefined && v1750.ownerId === v1738.ownerId && v1750.ownerUid === v1738.ownerUid) {
          v1761 = Array.isArray(v1750.sessions) ? v1750.sessions : [];
          if (v1750.pts?.length >= 2 && !v1750.ended) {
            const v1787 = v880(v1750.pts, v1750.at);
            if (v1787 && (!v1747?.pts.length || v1750.pts.at(-1).t < v1747.pts[0].t - v803)) {
              v1761 = [{
                ...v1787,
                pts: v853(v1750.pts)
              }, ...v1761];
            }
          }
        }
        const v1762 = new Map();
        if (v1751 && v1738.clearAt === (v1750.clearAt || 0)) {
          for (const v1788 of v1750.sessions || []) {
            if (v1788?.hidden === true) {
              v1762.set(v1788.id || v1788.s + "|" + v1788.e, true);
            }
          }
        }
        const v1763 = [];
        for (const v1789 of [...v1748, ...v1761]) {
          const v1790 = v1789.id || v1789.s + "|" + v1789.e;
          if (!v1763.some(v1791 => (v1791.id || v1791.s + "|" + v1791.e) === v1790)) {
            v1763.push(v1762.has(v1790) ? {
              ...v1789,
              hidden: true
            } : v1789);
          }
        }
        v1763.sort((v1792, v1793) => (v1793.e || v1793.at || 0) - (v1792.e || v1792.at || 0));
        const v1764 = v1747 || v1738.sessions[0];
        v1749[v1737] = {
          pts: v1747?.pts || v1764?.pts?.map(v1794 => ({
            ...v1794
          })) || [],
          ended: !v1747,
          at: v1738.at,
          rangeAnchor: v1754,
          rangeAnchorVersion: 1,
          estimatorVersion: v810,
          repairVersion: v811,
          healthEvidence: v1760,
          sessions: v799(v1763),
          currentMeta: v1747 ? {
            id: v1747.id,
            from: v1747.from,
            to: v1747.to,
            rawCount: v1747.rawCount,
            truncated: v1747.truncated,
            summary: v1747.summary,
            curveRepair: v1747.curveRepair
          } : null,
          recoveredCurrent: v1747?.recovered ? v1747 : v1747?.recoveredPrefix || null,
          legacySessions: v799(v1763).filter(v1795 => v1761.includes(v1795)),
          nativeRevision: v1738.revision,
          nativeOwnerId: v1738.ownerId,
          nativeOwnerUid: v1738.ownerUid,
          clearAt: v1738.clearAt,
          nativeAt: v1738.at,
          nativeId: v1747?.id || null,
          energyRows: v1751 && v1738.clearAt === (v1750.clearAt || 0) ? v1750.energyRows || [] : [],
          energyFloor: Math.max(v1738.clearAt, v1751 ? v1750.energyFloor || 0 : 0)
        };
        v839(v1749[v1737], v1763);
        if (v1738.clearAt > (v1751 ? v1750?.clearAt || 0 : 0)) {
          v816.set(v1755, {
            clearAt: v1738.clearAt,
            revision: v1738.revision
          });
          while (v816.size > v800 * 4) {
            v816.delete(v816.keys().next().value);
          }
        }
        const v1765 = v1796 => {
          if (v1796 !== true || v1743 !== v819) {
            return false;
          }
          const v1797 = v823();
          const v1798 = v816.get(v1755);
          if (v1797 && (v1797.id !== v1738.ownerId || v1797.uid !== v1738.ownerUid) || v1755 !== v825(v1737, v1738.ownerId, v1738.ownerUid) || (v1798?.clearAt || 0) > v1738.clearAt || (v1798?.revision || 0) > v1738.revision) {
            return false;
          }
          v816.delete(v1755);
          v817.add(v1755);
          while (v817.size > v800 * 4) {
            v817.delete(v817.values().next().value);
          }
          return true;
        };
        const v1766 = v843(v1749, v1741);
        if (v1766 && typeof v1766.then === "function") {
          return v1766.then(v1765).catch(() => false);
        } else {
          return v1765(v1766);
        }
      } catch {
        return false;
      }
    }
    function v898(v1799, v1800) {
      if (!v1799 || v1799.length < 2) {
        return [];
      }
      const v1801 = v1799.every(v1807 => v830(v1807.cf) !== null);
      const v1802 = v1799[0].t;
      const v1803 = v1800 === "a" || v1800 === "w" ? v827() : 1;
      const v1804 = [];
      let v1805 = true;
      let v1806 = null;
      for (const v1808 of v1799) {
        const v1809 = v830(v1808[v1800]);
        const v1810 = v1809 === null ? null : v1800 === "a" || v1800 === "w" ? v1809 * v1803 : v1809;
        if (v1810 === null) {
          v1805 = true;
          continue;
        }
        v1804.push({
          x: v1801 ? v830(v1808.cf) : Math.round((v1808.t - v1802) / 6000) / 10,
          y: v1810,
          t: v1808.t,
          gap: v1805 || (typeof v1808.metricGap?.[v1800] === "boolean" ? v1808.metricGap[v1800] : !!v1808.gap || !!v1808.healthGap || v1806 !== null && v1808.t - v1806 > v809),
          basis: v1801 ? "charged" : "sampled"
        });
        v1806 = v1808.t;
        v1805 = false;
      }
      v1804.sort((v1811, v1812) => v1811.x - v1812.x);
      return v1804;
    }
    function v899(v1813) {
      let v1814 = v898(v1813, "soc");
      if (v1814.length < 3 || Date.now() - v1814[v1814.length - 1].t > v809) {
        return null;
      }
      const v1815 = v1814.reduce((v1828, v1829, v1830) => v1829.gap ? v1830 : v1828, 0);
      v1814 = v1814.slice(v1815);
      if (v1814.length < 3) {
        return null;
      }
      const v1816 = v1814[v1814.length - 1].x;
      let v1817 = v1814.filter(v1831 => v1831.x >= v1816 - v804);
      if (v1817.length < 3) {
        v1817 = v1814;
      }
      const v1818 = v1817[v1817.length - 1].x - v1817[0].x;
      if (v1818 < v805) {
        return null;
      }
      const v1819 = v1817.length;
      const v1820 = v1817.reduce((v1832, v1833) => v1832 + v1833.x, 0) / v1819;
      const v1821 = v1817.reduce((v1834, v1835) => v1834 + v1835.y, 0) / v1819;
      let v1822 = 0;
      let v1823 = 0;
      for (const v1836 of v1817) {
        v1822 += (v1836.x - v1820) * (v1836.y - v1821);
        v1823 += (v1836.x - v1820) ** 2;
      }
      const v1824 = v1823 > 0 ? v1822 / v1823 : 0;
      const v1825 = v1817[v1819 - 1].y;
      const v1826 = Math.max(0, 100 - v1825);
      const v1827 = v1824 > v806 && v1826 > 0 ? v1826 / v1824 : null;
      return {
        n: v1819,
        span: v1818,
        soc: v1825,
        left: v1826,
        slope: v1824,
        rate: v1824 * 60,
        etaMin: v1827,
        at: v1827 !== null && v1827 <= v807 ? Date.now() + v1827 * 60000 : null,
        stalled: v1824 <= v806,
        quality: v1818 >= 15 ? "good" : v1818 >= 6 ? "fair" : "rough",
        last: v1817[v1819 - 1].t
      };
    }
    function v900(v1837) {
      const v1838 = new Date(v1837);
      const v1839 = v831(v1838.getHours()) + ":" + v831(v1838.getMinutes());
      const v1840 = new Date();
      const v1841 = new Date(v1840.getFullYear(), v1840.getMonth(), v1840.getDate() + 1);
      if (v1838 >= v1841) {
        return "明天 " + v1839;
      } else {
        return v1839;
      }
    }
    const v901 = v1842 => {
      const v1843 = new Date(v1842);
      return v831(v1843.getHours()) + ":" + v831(v1843.getMinutes());
    };
    function v902(v1844) {
      const v1845 = (v1844 || []).filter(v1847 => v830(v1847.cf) !== null);
      if (!v1845.length) {
        return null;
      }
      const v1846 = v1845[v1845.length - 1];
      return v1846.t - v830(v1846.cf) * 60000;
    }
    function v903() {
      const v1848 = v835();
      const v1849 = Object.keys(v1848).length;
      const v1850 = v1849 > v800 || Object.values(v1848).some(v1851 => v1851?.pts?.length > v797 || v1851?.sessions?.some(v1852 => !v799([v1852]).length) || v1851?.sessions?.some(v1853 => v1853.pts?.length > v801));
      return !v1850 || v843(v1848);
    }
    return {
      ENERGY_REPAIR_VERSION: v813,
      ENERGY_REPAIR_POLICY: v814,
      energyRepairPlans: v865,
      energyOf: v871,
      HEALTH_VERSION: v810,
      REPAIR_VERSION: v811,
      HEALTH_POLICY: v812,
      repairPlans: v872,
      mergeRecoveredNativeHistory: v896,
      healthOf: v878,
      aggregateHealth: v879,
      hasHealthHistory: v886,
      healthEvidence: v887,
      METRICS: v829,
      energy: v842,
      clearWatermark: v841,
      sameEnergySession: v837,
      log: v847,
      clear: v848,
      historyPlan: v849,
      clearHistory: v850,
      record: v893,
      mergeNative: v894,
      mergeNativeHistory: v895,
      hasNativeHistory: v822,
      hasValidatedHistory: v821,
      invalidateNativeHistory: v820,
      trim: v903,
      series: v898,
      fit: v899,
      startedAt: v902,
      history: v883,
      hiddenCount: v884,
      setSessionHidden: v885,
      lastSession: v890,
      remainingRange: v891,
      usageOf: v892,
      summarize: v880,
      capacity: v889,
      capacityOf: v874,
      fmtClock: v900,
      fmtTime: v901,
      KEY: v796
    };
  })();
  window.CAPBOOK = (() => {
    const v1854 = window.Store;
    const v1855 = "zeeho.cap.v1";
    const v1856 = v1883 => v1854.requiresAsync?.() ? v1854.commitAsync(v1883) : v1854.commit(v1883);
    const v1857 = 400;
    const v1858 = 24;
    const v1859 = 90000;
    const v1860 = [{
      match: /^AE8(?!\s*(?:MAX|SE))/i,
      kwh: 3726 / 1000,
      v: 69,
      ah: 54
    }, {
      match: /^AE8\s*MAX/i,
      kwh: 6660 / 1000,
      v: 74,
      ah: 90
    }, {
      match: /^AE8\s*SE/i,
      kwh: 3996 / 1000,
      v: 74,
      ah: 54
    }, {
      match: /^AE7/i,
      kwh: 3330 / 1000,
      v: 74,
      ah: 45
    }, {
      match: /^AE6\s*SE/i,
      kwh: 3996 / 1000,
      v: 74,
      ah: 54
    }, {
      match: /^AE6/i,
      kwh: 1863 / 1000,
      v: 69,
      ah: 27
    }, {
      match: /^AE4/i,
      kwh: 1998 / 1000,
      v: 74,
      ah: 27
    }, {
      match: /^AE2/i,
      kwh: 1152 / 1000,
      v: 48,
      ah: 24
    }];
    function v1861(v1884) {
      const v1885 = String(v1884 || "").trim();
      if (!v1885) {
        return null;
      }
      const v1886 = v1860.find(v1887 => v1887.match.test(v1885));
      if (v1886) {
        return Math.round(v1886.kwh * 100) / 100;
      } else {
        return null;
      }
    }
    function v1862(v1888, v1889) {
      let v1890 = null;
      try {
        const v1893 = v1854.getJson(v1855 + ".nominal", {});
        const v1894 = v1871(v1893?.[v1888 ?? ""]?.kwh);
        if (v1894 !== null && v1894 > 0) {
          v1890 = v1894;
        }
      } catch {}
      const v1891 = v1863(v1888);
      if (v1890 !== null) {
        const v1895 = v1869(v1888);
        return {
          kwh: v1890,
          src: "manual",
          v: v1895?.v ?? null,
          ah: v1895?.ah ?? null,
          series: v1891
        };
      }
      const v1892 = v1860.find(v1896 => v1896.match.test(String(v1889 || "").trim()));
      if (v1892) {
        return {
          kwh: v1861(v1889),
          src: "table",
          v: v1892.v,
          ah: v1892.ah,
          series: v1891 ?? v1892.series ?? null,
          configuration: "model-default-unverified"
        };
      } else if (v1891) {
        return {
          kwh: null,
          src: "series",
          v: null,
          ah: null,
          series: v1891
        };
      } else {
        return null;
      }
    }
    function v1863(v1897) {
      if (!v1897) {
        return null;
      }
      try {
        const v1898 = v1854.getJson(v1855 + ".series", {});
        const v1899 = v1871(v1898?.[v1897]);
        if (Number.isInteger(v1899) && v1899 >= 1 && v1899 <= 40) {
          return v1899;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    }
    function v1864(v1900, v1901) {
      if (!v1900) {
        return false;
      }
      const v1902 = v1871(v1901);
      if (v1902 !== null && (!Number.isInteger(v1902) || v1902 < 1 || v1902 > 40)) {
        return false;
      }
      try {
        const v1903 = v1854.getJson(v1855 + ".series", {}) || {};
        if (v1902 === null) {
          delete v1903[v1900];
        } else {
          v1903[v1900] = v1902;
        }
        return v1856({
          puts: {
            [v1855 + ".series"]: JSON.stringify(v1903)
          }
        });
      } catch {
        return false;
      }
    }
    function v1865(v1904) {
      if (!v1904) {
        return false;
      }
      try {
        const v1905 = v1854.getJson(v1855 + ".dual", {});
        return v1905?.[v1904] === true;
      } catch {
        return false;
      }
    }
    function v1866(v1906, v1907) {
      if (!v1906) {
        return false;
      }
      try {
        const v1908 = v1854.getJson(v1855 + ".dual", {}) || {};
        if (v1907 === true) {
          v1908[v1906] = true;
        } else {
          delete v1908[v1906];
        }
        return v1856({
          puts: {
            [v1855 + ".dual"]: JSON.stringify(v1908)
          }
        });
      } catch {
        return false;
      }
    }
    function v1867(v1909) {
      if (v1865(v1909)) {
        return 2;
      } else {
        return 1;
      }
    }
    function v1868(v1910, v1911) {
      if (!v1910) {
        return false;
      }
      try {
        const v1912 = v1854.getJson(v1855 + ".nominal", {}) || {};
        const v1913 = v1871(v1911);
        if (v1913 !== null && v1913 > 0) {
          v1912[v1910] = {
            kwh: v1913,
            at: Date.now()
          };
        } else {
          delete v1912[v1910];
        }
        return v1856({
          puts: {
            [v1855 + ".nominal"]: JSON.stringify(v1912)
          }
        });
      } catch {
        return false;
      }
    }
    function v1869(v1914) {
      if (!v1914) {
        return null;
      }
      try {
        const v1915 = v1854.getJson(v1855 + ".nominal", {});
        const v1916 = v1915?.[v1914];
        if (!v1916 || typeof v1916 !== "object") {
          return null;
        }
        const v1917 = v1871(v1916.kwh);
        if (v1917 === null || v1917 <= 0) {
          return null;
        }
        const v1918 = v1871(v1916.v);
        const v1919 = v1871(v1916.ah);
        return {
          kwh: v1917,
          v: v1918,
          ah: v1919,
          series: v1863(v1914),
          at: v1871(v1916.at),
          legacy: v1918 === null && v1919 === null
        };
      } catch {
        return null;
      }
    }
    function v1870(v1920, v1921 = {}) {
      if (!v1920) {
        return false;
      }
      const v1922 = v1921 != null && typeof v1921 === "object" && (v1921.kwh != null || v1921.v != null || v1921.ah != null);
      const v1923 = v1921 != null && typeof v1921 === "object" && Object.hasOwn(v1921, "series");
      if (v1923 && !v1922 && v1921.kwh == null && v1921.v == null && v1921.ah == null) {
        return v1864(v1920, v1921.series);
      }
      const v1924 = v1921 == null || typeof v1921 === "object" && v1921.kwh == null && v1921.v == null && v1921.ah == null && !v1923;
      try {
        const v1925 = v1854.getJson(v1855 + ".nominal", {}) || {};
        const v1926 = v1923 || v1924 ? v1854.getJson(v1855 + ".series", {}) || {} : null;
        if (v1924) {
          const v1933 = !!v1925[v1920];
          const v1934 = !!v1926?.[v1920];
          if (!v1933 && !v1934) {
            return true;
          }
          delete v1925[v1920];
          delete v1926[v1920];
          return v1856({
            puts: {
              [v1855 + ".nominal"]: JSON.stringify(v1925),
              [v1855 + ".series"]: JSON.stringify(v1926)
            }
          });
        }
        const v1927 = v1871(v1921.kwh);
        const v1928 = v1871(v1921.v);
        const v1929 = v1871(v1921.ah);
        let v1930 = null;
        if (v1927 !== null) {
          if (!(v1927 > 0) || !(v1927 <= 30)) {
            return false;
          }
          v1930 = v1927;
        } else if (v1928 !== null || v1929 !== null) {
          if (!(v1928 >= 20) || !(v1928 <= 120) || !(v1929 >= 1) || !(v1929 <= 200)) {
            return false;
          }
          v1930 = Math.round(v1928 * v1929 / 1000 * 1000) / 1000;
        } else {
          return false;
        }
        const v1931 = {
          kwh: v1930,
          at: Date.now()
        };
        if (v1927 === null) {
          v1931.v = v1928;
          v1931.ah = v1929;
        }
        v1925[v1920] = v1931;
        const v1932 = {
          [v1855 + ".nominal"]: JSON.stringify(v1925)
        };
        if (v1923) {
          const v1935 = v1871(v1921.series);
          if (v1935 !== null && (!Number.isInteger(v1935) || v1935 < 1 || v1935 > 40)) {
            return false;
          }
          if (v1935 === null) {
            delete v1926[v1920];
          } else {
            v1926[v1920] = v1935;
          }
          v1932[v1855 + ".series"] = JSON.stringify(v1926);
        }
        return v1856({
          puts: v1932
        });
      } catch {
        return false;
      }
    }
    const v1871 = v1936 => v1936 === null || v1936 === undefined || v1936 === "" || !Number.isFinite(Number(v1936)) ? null : Number(v1936);
    function v1872() {
      try {
        const v1937 = window.APP?.context?.()?.owner || window.ACC?.active?.();
        if (v1937) {
          return String(v1937.id || "");
        } else {
          return "";
        }
      } catch {
        return "";
      }
    }
    function v1873() {
      try {
        const v1938 = v1854.getJson(v1854.ns(v1855), {});
        if (v1938 && typeof v1938 === "object" && !Array.isArray(v1938)) {
          return v1938;
        } else {
          return {};
        }
      } catch {
        return {};
      }
    }
    function v1874(v1939) {
      try {
        return v1856({
          puts: {
            [v1854.ns(v1855)]: JSON.stringify(v1939)
          }
        });
      } catch {
        return false;
      }
    }
    function v1875(v1940, v1941, v1942 = Date.now()) {
      const v1943 = Array.isArray(v1940) ? v1940.filter(v1952 => v1952 && v1871(v1952.s) !== null && v1871(v1952.e) !== null) : [];
      const v1944 = v1871(v1941?.s);
      const v1945 = v1871(v1941?.e);
      if (v1944 === null || v1945 === null || v1945 < v1944) {
        return v1943;
      }
      const v1946 = window.CHG?.healthOf?.(v1941);
      const v1947 = v1943.findIndex(v1953 => v1941.id && v1953.id === v1941.id || Math.abs(v1871(v1953.s) - v1944) < v1859 && Math.abs(v1871(v1953.e) - v1945) < v1859);
      const v1948 = v1947 < 0 ? null : v1943[v1947];
      const v1949 = {
        ...(v1948 || {}),
        s: v1948?.s ?? v1944,
        e: v1948?.e ?? v1945,
        cap: v1948 ? v1948.cap : v1871(v1941.cap),
        dSoc: v1948?.dSoc ?? v1871(v1941.dSoc ?? v1941.capD),
        kwh: v1948 ? v1948.kwh : v1871(v1941.kwh),
        ...(v1941.id ? {
          id: v1941.id
        } : {})
      };
      if (v1946 || v1941.estimatorVersion === window.CHG?.HEALTH_VERSION) {
        v1949.estimatorVersion = window.CHG.HEALTH_VERSION;
        v1949.health = v1946;
        v1949.rawStatistics = !!v1946;
      }
      if (v1947 < 0) {
        v1943.push(v1949);
      } else {
        v1943[v1947] = v1949;
      }
      const v1950 = v1942 - v1858 * 31 * 86400000;
      let v1951 = v1943.filter(v1954 => v1871(v1954.e) >= v1950);
      v1951.sort((v1955, v1956) => v1871(v1955.e) - v1871(v1956.e));
      if (v1951.length > v1857) {
        v1951 = v1951.slice(v1951.length - v1857);
      }
      return v1951;
    }
    function v1876(v1957, v1958) {
      if (!v1957 || !v1958 || v1958.capWhy !== "ok" && v1958.estimatorVersion !== window.CHG?.HEALTH_VERSION && !window.CHG?.healthOf?.(v1958)) {
        return false;
      }
      const v1959 = v1873();
      const v1960 = v1959[v1957] && typeof v1959[v1957] === "object" && !Array.isArray(v1959[v1957]) ? v1959[v1957] : null;
      const v1961 = v1872();
      if (v1960 && (v1960.owner || v1961) && v1960.owner !== v1961) {
        return false;
      }
      const v1962 = v1960 || {
        recs: [],
        owner: v1961
      };
      const v1963 = Math.max(v1871(v1962.clearAt) || 0, window.CHG?.clearWatermark?.(v1957) || 0);
      if (!(v1871(v1958.s) > v1963)) {
        return false;
      }
      const v1964 = v1875(v1962.recs, v1958);
      if (JSON.stringify(v1964) === JSON.stringify(v1962.recs || [])) {
        return false;
      }
      v1962.recs = v1964;
      v1962.owner = v1872();
      v1962.at = Date.now();
      v1959[v1957] = v1962;
      return v1874(v1959);
    }
    function v1877(v1965) {
      if (!v1965) {
        return [];
      }
      const v1966 = v1873()[v1965];
      if (!v1966 || !Array.isArray(v1966.recs)) {
        return [];
      }
      const v1967 = v1966.owner;
      if ((v1967 || v1872()) && v1967 !== v1872()) {
        return [];
      }
      const v1968 = Math.max(v1871(v1966.clearAt) || 0, window.CHG?.clearWatermark?.(v1965) || 0);
      return v1966.recs.filter(v1969 => v1871(v1969.s) > v1968).map(v1970 => ({
        ...v1970
      }));
    }
    function v1878(v1971) {
      if (window.CHG?.hasHealthHistory?.(v1971) === false) {
        return [];
      }
      return v1877(v1971).filter(v1972 => window.CHG?.healthOf?.(v1972));
    }
    function v1879(v1973) {
      const v1974 = new Map();
      for (const v1975 of v1878(v1973)) {
        const v1976 = new Date(v1871(v1975.e));
        const v1977 = v1976.getFullYear() + "-" + String(v1976.getMonth() + 1).padStart(2, "0");
        const v1978 = v1974.get(v1977) || [];
        v1978.push(v1975);
        v1974.set(v1977, v1978);
      }
      return [...v1974.entries()].sort((v1979, v1980) => v1979[0].localeCompare(v1980[0])).flatMap(([v1981, v1982]) => {
        const v1983 = window.CHG?.aggregateHealth?.(v1982);
        if (v1983) {
          return [{
            ...v1983,
            ah: v1983.ah * v1867(v1973),
            month: v1981,
            cap: null
          }];
        } else {
          return [];
        }
      });
    }
    function v1880(v1984, v1985) {
      const v1986 = {
        percent: null,
        reason: "no-data",
        stable: v1984?.solid === true,
        confidence: null,
        caveats: []
      };
      if (v1984?.version !== window.CHG?.HEALTH_VERSION || v1984?.kind !== "charge-capacity-reference" || !(v1871(v1984.ah) > 0)) {
        return v1986;
      }
      const v1987 = window.CHG?.HEALTH_POLICY;
      if (!v1987 || !Number.isInteger(v1871(v1984.n)) || v1871(v1984.n) < v1987.minSessions || !(v1871(v1984.dSocSum) >= v1987.minTotalDelta) || !(v1871(v1984.socCoverage) >= v1987.minSocCoverage) || v1871(v1984.spread) === null || v1871(v1984.spread) < 0) {
        return v1986;
      }
      if (!(v1871(v1985?.ah) > 0)) {
        return {
          ...v1986,
          reason: "no-spec"
        };
      }
      const v1988 = v1871(v1984.estimatedMin);
      if (v1988 === null || v1988 < 0 || v1988 > 525600 || v1988 > 0 && (!(v1871(v1984.estimatedFraction) > 0) || v1871(v1984.estimatedFraction) > v1987.repairMaxFraction || !(v1871(v1984.estimatedAhFraction) >= 0) || !(v1871(v1984.estimatedAhFraction) <= 1) || !Array.isArray(v1984.repairs) || !v1984.repairs.length)) {
        return {
          ...v1986,
          reason: "unverified"
        };
      }
      const v1989 = v1984.ah / v1985.ah * 100;
      if (!Number.isFinite(v1989)) {
        return {
          ...v1986,
          reason: "range"
        };
      }
      const v1990 = v1988 > 0 ? ["含受限补算"] : [];
      if (v1984.source !== "raw-current") {
        v1990.push("电流来源未标为车机原始值");
      }
      if (v1984.measurementSide !== "battery") {
        v1990.push("电流测量位置未确认");
      }
      if (v1985.configuration === "model-default-unverified") {
        v1990.push("电池规格用车型默认值");
      }
      return {
        percent: v1989,
        reason: v1989 > 100 ? "range" : "estimate",
        stable: v1984?.solid === true && v1990.length === 0,
        confidence: v1990.length === 0 ? "verified" : "estimated",
        caveats: v1990
      };
    }
    function v1881(v1991) {
      if (!v1991) {
        return false;
      }
      const v1992 = v1873();
      v1992[v1991] = {
        recs: [],
        owner: v1872(),
        clearAt: Math.max(Date.now(), v1871(v1992[v1991]?.clearAt) || 0, window.CHG?.clearWatermark?.(v1991) || 0)
      };
      return v1874(v1992);
    }
    function v1882(v1993) {
      const v1994 = v1871(v1993);
      if (v1994 === null || v1994 <= 0) {
        return null;
      }
      if (v1994 >= 90) {
        return "ok";
      }
      if (v1994 >= 80) {
        return "warn";
      }
      if (v1994 >= 70) {
        return "orange";
      }
      return "bad";
    }
    return {
      KEY: v1855,
      MAX_RECS: v1857,
      MAX_MONTHS: v1858,
      NOMINAL: v1860,
      nominalKwh: v1861,
      nominal: v1862,
      series: v1863,
      setSeries: v1864,
      setNominal: v1868,
      spec: v1869,
      setSpec: v1870,
      dual: v1865,
      setDual: v1866,
      scale: v1867,
      record: v1876,
      recs: v1877,
      health: v1878,
      monthly: v1879,
      healthEstimate: v1880,
      clear: v1881,
      sohBand: v1882
    };
  })();
  window.OCV = (() => {
    const v1995 = v2009 => v2009 === null || v2009 === undefined || typeof v2009 === "boolean" || typeof v2009 === "string" && v2009.trim() === "" || !Number.isFinite(Number(v2009)) ? null : Number(v2009);
    const v1996 = (v2010, v2011, v2012) => Math.max(v2011, Math.min(v2012, v2010));
    const v1997 = (v2013, v2014 = 2) => {
      const v2015 = 10 ** v2014;
      return Math.round(v2013 * v2015) / v2015;
    };
    const v1998 = v2016 => {
      const v2017 = v2016.filter(Number.isFinite).sort((v2019, v2020) => v2019 - v2020);
      if (!v2017.length) {
        return null;
      }
      const v2018 = Math.floor(v2017.length / 2);
      if (v2017.length % 2) {
        return v2017[v2018];
      } else {
        return (v2017[v2018 - 1] + v2017[v2018]) / 2;
      }
    };
    const v1999 = v2021 => {
      const v2022 = v2021.filter(v2025 => Number.isFinite(v2025.value) && v2025.weight > 0).sort((v2026, v2027) => v2026.value - v2027.value);
      if (!v2022.length) {
        return null;
      }
      const v2023 = v2022.reduce((v2028, v2029) => v2028 + v2029.weight, 0);
      let v2024 = 0;
      for (const v2030 of v2022) {
        v2024 += v2030.weight;
        if (v2024 >= v2023 / 2) {
          return v2030.value;
        }
      }
      return v2022.at(-1).value;
    };
    const v2000 = 600000;
    const v2001 = 900000;
    const v2002 = v2031 => v2031?.truncated === true || !!v2031?.degraded;
    const v2003 = v2032 => v2032.state === 0 && v2032.pwr === 0 && v2032.a !== null && Math.abs(v2032.a) <= 0.5;
    function v2004(v2033, v2034 = 0, v2035 = {}) {
      const v2036 = v1995(v2033?.state ?? v2033?.st);
      const v2037 = v1995(v2033?.pwr ?? v2033?.powered);
      const v2038 = v1995(v2033?.a ?? v2033?.current);
      if (v2003({
        state: v2036,
        pwr: v2037,
        a: v2038
      })) {
        if (!v2002(v2035) && Number.isFinite(v2034) && v2034 >= v2000) {
          return {
            source: "static",
            label: "静置推断",
            weight: 1
          };
        }
        return {
          source: "low-load",
          label: "低负载参考",
          weight: 0.6
        };
      }
      return {
        source: "dynamic",
        label: v2036 === 1 || v2036 === 2 ? "充电动态" : "放电/动态",
        weight: 0.25
      };
    }
    function v2005(v2039, v2040 = {}) {
      const v2041 = (Array.isArray(v2039) ? v2039 : []).map((v2049, v2050) => ({
        ...v2049,
        _index: v2050,
        t: v1995(v2049?.t),
        soc: v1995(v2049?.soc),
        v: v1995(v2049?.v ?? v2049?.voltage),
        a: v1995(v2049?.a ?? v2049?.current),
        state: v1995(v2049?.state ?? v2049?.st),
        pwr: v1995(v2049?.pwr ?? v2049?.powered)
      }));
      const v2042 = Date.now();
      const v2043 = new Map();
      const v2044 = v2051 => Number.isSafeInteger(v2051.t) && v2051.t > 0 && v2051.t <= v2042;
      for (const v2052 of v2041) {
        if (v2044(v2052)) {
          v2043.set(v2052.t, (v2043.get(v2052.t) || 0) + 1);
        }
      }
      let v2045 = 0;
      let v2046 = 0;
      let v2047 = null;
      const v2048 = [];
      for (const v2053 of v2041) {
        const v2054 = v2044(v2053);
        const v2055 = v2054 && v2053.t > v2046;
        if (v2054) {
          v2046 = Math.max(v2046, v2053.t);
        }
        if (!v2054 || v2043.get(v2053.t) !== 1 || v2053.soc === null || v2053.soc < 0 || v2053.soc > 100 || v2053.v === null || v2053.v <= 0 || v2053.v > 160) {
          v2045 = 0;
          v2047 = null;
          continue;
        }
        const v2056 = v2047 ? v2053.t - v2047.t : 0;
        const v2057 = v2055 && v2047 && v2003(v2047) && v2003(v2053) && v2056 > 0 && v2056 <= v2001 && Math.abs(v2053.soc - v2047.soc) <= 1;
        v2045 = v2057 ? v2045 + v2056 : 0;
        v2048.push({
          ...v2053,
          ...v2004(v2053, v2045, v2040),
          idleMs: v2045
        });
        v2047 = v2055 ? v2053 : null;
      }
      return v2048.sort((v2058, v2059) => v2058.t - v2059.t || v2058._index - v2059._index);
    }
    function v2006(v2060) {
      const v2061 = [];
      for (const v2062 of v2060) {
        const v2063 = Number.isFinite(v2062.weight) && v2062.weight > 0 ? v2062.weight : 1;
        v2061.push({
          start: v2062.soc,
          end: v2062.soc,
          weight: v2063,
          sum: v2062.v * v2063,
          rows: [v2062]
        });
        while (v2061.length > 1) {
          const v2064 = v2061.at(-1);
          const v2065 = v2061.at(-2);
          if (v2065.sum / v2065.weight <= v2064.sum / v2064.weight) {
            break;
          }
          v2061.splice(v2061.length - 2, 2, {
            start: v2065.start,
            end: v2064.end,
            weight: v2065.weight + v2064.weight,
            sum: v2065.sum + v2064.sum,
            rows: [...v2065.rows, ...v2064.rows]
          });
        }
      }
      return v2061.flatMap(v2066 => {
        const v2067 = v1997(v2066.sum / v2066.weight, 1);
        return v2066.rows.map(v2068 => ({
          ...v2068,
          v: v2067
        }));
      });
    }
    function v2007(v2069, v2070 = null, v2071 = {}) {
      const v2072 = v2005(v2069, v2071);
      const v2073 = new Map();
      for (const v2084 of v2072) {
        const v2085 = v1996(Math.round(v2084.soc / 5) * 5, 0, 100);
        const v2086 = v2073.get(v2085) || {
          soc: v2085,
          values: [],
          staticN: 0,
          dynamicN: 0,
          lowLoadN: 0
        };
        v2086.values.push({
          value: v2084.v,
          weight: v2084.weight,
          point: v2084
        });
        if (v2084.source === "static") {
          v2086.staticN++;
        } else if (v2084.source === "low-load") {
          v2086.lowLoadN++;
        } else {
          v2086.dynamicN++;
        }
        v2073.set(v2085, v2086);
      }
      const v2074 = [...v2073.values()].sort((v2087, v2088) => v2087.soc - v2088.soc).map(v2089 => {
        const v2090 = v2089.values.map(v2095 => v2095.value);
        const v2091 = v2089.values.filter(v2096 => v2096.point.source === "static").reduce((v2097, v2098) => v2097 + v2098.weight, 0);
        const v2092 = v2089.values.filter(v2099 => v2099.point.source !== "static").reduce((v2100, v2101) => v2100 + v2101.weight, 0);
        const v2093 = v2091 > 0 && v2092 > 0 ? "mixed" : v2091 > 0 ? "static" : v2089.lowLoadN > 0 ? "low-load" : "dynamic";
        const v2094 = v1997(v1999(v2089.values), 1);
        return {
          soc: v2089.soc,
          v: v2094,
          weight: v2089.values.reduce((v2102, v2103) => v2102 + v2103.weight, 0),
          source: v2093,
          n: v2089.values.length,
          staticN: v2089.staticN,
          dynamicN: v2089.dynamicN + v2089.lowLoadN,
          spread: v1997(Math.max(...v2090) - Math.min(...v2090), 1)
        };
      }).filter(v2104 => v2104.v !== null);
      const v2075 = v2006(v2074).map((v2105, v2106) => ({
        ...v2105,
        rawV: v2074[v2106].v,
        fitV: v2105.v,
        cellV: Number.isInteger(v2070) && v2070 > 0 ? v1997(v2105.v / v2070, 3) : null,
        fitCellV: Number.isInteger(v2070) && v2070 > 0 ? v1997(v2105.v / v2070, 3) : null
      }));
      const v2076 = v2072.filter(v2107 => v2107.source === "static");
      const v2077 = v2072.filter(v2108 => v2108.source !== "static");
      const v2078 = v2074.map(v2109 => v2109.soc);
      const v2079 = v2078.length ? Math.max(...v2078) - Math.min(...v2078) : 0;
      const v2080 = v2076.length ? Math.max(...v2076.map(v2110 => v2110.soc)) - Math.min(...v2076.map(v2111 => v2111.soc)) : 0;
      const v2081 = v2002(v2071);
      const v2082 = !v2081 && v2076.length >= 8 && v2080 >= 30 && v2074.length >= 5 ? "high" : !v2081 && v2076.length >= 3 && v2080 >= 15 && v2074.length >= 3 ? "medium" : v2072.length >= 3 && v2074.length >= 2 ? "low" : "insufficient";
      const v2083 = v2082 === "high" ? "静置样本较充分" : v2082 === "medium" ? "有静置参考，仍需继续积累" : v2082 === "low" ? v2081 ? "历史采样不完整，仅作低置信度参考" : "以动态样本为主，参考性较低" : "还没有足够的电压样本";
      return {
        version: 1,
        truncated: v2071?.truncated === true,
        degraded: !!v2071?.degraded,
        points: v2072.length,
        staticPoints: v2076.length,
        dynamicPoints: v2077.length,
        curve: v2075,
        confidence: v2082,
        status: v2083,
        socSpan: v1997(v2079, 0),
        staticSocSpan: v1997(v2080, 0),
        series: Number.isInteger(v2070) && v2070 > 0 ? v2070 : null,
        from: v2072[0]?.t || null,
        to: v2072.at(-1)?.t || null
      };
    }
    function v2008(v2112 = null) {
      const v2113 = Array.from({
        length: 17
      }, (v2115, v2116) => {
        const v2117 = v2116 * 5 + 20;
        const v2118 = 72.2 + v2117 * 0.105 + (v2116 % 3 - 1) * 0.08;
        return {
          t: Date.now() - (17 - v2116) * 3600000,
          soc: v2117,
          v: v2118,
          a: 0,
          state: 0,
          pwr: 0
        };
      });
      const v2114 = v2007(v2113, v2112);
      return {
        ...v2114,
        demo: true
      };
    }
    return Object.freeze({
      estimate: v2007,
      classify: v2004,
      prepare: v2005,
      demo: v2008,
      median: v1998,
      weightedMedian: v1999
    });
  })();
  (typeof window === "undefined" ? globalThis : window).ZEEHO_SIGN = (() => {
    const v2119 = "S7qPWPU1";
    const v2120 = "c5e0da7f4da28df805694ec3dd1fc6792e9df99d";
    const v2121 = "https://tapi.zeehoev.com";
    const v2122 = "https://h5.zeehoev.com";
    const v2123 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const v2124 = new TextEncoder();
    const v2125 = v2146 => Array.from(v2146, v2147 => v2147.toString(16).padStart(2, "0")).join("");
    function v2126(v2148) {
      const v2149 = v2148.length * 8;
      const v2150 = Math.ceil((v2148.length + 9) / 64) * 64;
      const v2151 = new Uint8Array(v2150);
      v2151.set(v2148);
      v2151[v2148.length] = 128;
      const v2152 = new DataView(v2151.buffer);
      v2152.setUint32(v2150 - 8, Math.floor(v2149 / 4294967296), false);
      v2152.setUint32(v2150 - 4, v2149 >>> 0, false);
      let v2153 = 1732584193;
      let v2154 = 4023233417;
      let v2155 = 2562383102;
      let v2156 = 271733878;
      let v2157 = 3285377520;
      const v2158 = new Uint32Array(80);
      for (let v2160 = 0; v2160 < v2150; v2160 += 64) {
        for (let v2166 = 0; v2166 < 16; v2166++) {
          v2158[v2166] = v2152.getUint32(v2160 + v2166 * 4, false);
        }
        for (let v2167 = 16; v2167 < 80; v2167++) {
          const v2168 = v2158[v2167 - 3] ^ v2158[v2167 - 8] ^ v2158[v2167 - 14] ^ v2158[v2167 - 16];
          v2158[v2167] = v2168 << 1 | v2168 >>> 31;
        }
        let v2161 = v2153;
        let v2162 = v2154;
        let v2163 = v2155;
        let v2164 = v2156;
        let v2165 = v2157;
        for (let v2169 = 0; v2169 < 80; v2169++) {
          let v2170;
          let v2171;
          if (v2169 < 20) {
            v2170 = v2162 & v2163 | ~v2162 & v2164;
            v2171 = 1518500249;
          } else if (v2169 < 40) {
            v2170 = v2162 ^ v2163 ^ v2164;
            v2171 = 1859775393;
          } else if (v2169 < 60) {
            v2170 = v2162 & v2163 | v2162 & v2164 | v2163 & v2164;
            v2171 = 2400959708;
          } else {
            v2170 = v2162 ^ v2163 ^ v2164;
            v2171 = 3395469782;
          }
          const v2172 = (v2161 << 5 | v2161 >>> 27) + v2170 + v2165 + v2171 + v2158[v2169] >>> 0;
          v2165 = v2164;
          v2164 = v2163;
          v2163 = v2162 << 30 | v2162 >>> 2;
          v2162 = v2161;
          v2161 = v2172;
        }
        v2153 = v2153 + v2161 >>> 0;
        v2154 = v2154 + v2162 >>> 0;
        v2155 = v2155 + v2163 >>> 0;
        v2156 = v2156 + v2164 >>> 0;
        v2157 = v2157 + v2165 >>> 0;
      }
      const v2159 = new Uint8Array(20);
      new DataView(v2159.buffer).setUint32(0, v2153, false);
      new DataView(v2159.buffer).setUint32(4, v2154, false);
      new DataView(v2159.buffer).setUint32(8, v2155, false);
      new DataView(v2159.buffer).setUint32(12, v2156, false);
      new DataView(v2159.buffer).setUint32(16, v2157, false);
      return v2159;
    }
    const v2127 = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
    const v2128 = new Uint32Array(64);
    for (let v2173 = 0; v2173 < 64; v2173++) {
      v2128[v2173] = Math.floor(Math.abs(Math.sin(v2173 + 1)) * 4294967296);
    }
    function v2129(v2174) {
      const v2175 = v2174.length * 8;
      const v2176 = Math.ceil((v2174.length + 9) / 64) * 64;
      const v2177 = new Uint8Array(v2176);
      v2177.set(v2174);
      v2177[v2174.length] = 128;
      const v2178 = new DataView(v2177.buffer);
      v2178.setUint32(v2176 - 8, v2175 >>> 0, true);
      v2178.setUint32(v2176 - 4, Math.floor(v2175 / 4294967296), true);
      let v2179 = 1732584193;
      let v2180 = 4023233417;
      let v2181 = 2562383102;
      let v2182 = 271733878;
      const v2183 = new Uint32Array(16);
      for (let v2186 = 0; v2186 < v2176; v2186 += 64) {
        for (let v2191 = 0; v2191 < 16; v2191++) {
          v2183[v2191] = v2178.getUint32(v2186 + v2191 * 4, true);
        }
        let v2187 = v2179;
        let v2188 = v2180;
        let v2189 = v2181;
        let v2190 = v2182;
        for (let v2192 = 0; v2192 < 64; v2192++) {
          let v2193;
          let v2194;
          if (v2192 < 16) {
            v2193 = v2188 & v2189 | ~v2188 & v2190;
            v2194 = v2192;
          } else if (v2192 < 32) {
            v2193 = v2190 & v2188 | ~v2190 & v2189;
            v2194 = (v2192 * 5 + 1) % 16;
          } else if (v2192 < 48) {
            v2193 = v2188 ^ v2189 ^ v2190;
            v2194 = (v2192 * 3 + 5) % 16;
          } else {
            v2193 = v2189 ^ (v2188 | ~v2190);
            v2194 = v2192 * 7 % 16;
          }
          v2193 = v2193 + v2187 + v2128[v2192] + v2183[v2194] >>> 0;
          v2187 = v2190;
          v2190 = v2189;
          v2189 = v2188;
          v2188 = v2188 + (v2193 << v2127[v2192] | v2193 >>> 32 - v2127[v2192]) >>> 0;
        }
        v2179 = v2179 + v2187 >>> 0;
        v2180 = v2180 + v2188 >>> 0;
        v2181 = v2181 + v2189 >>> 0;
        v2182 = v2182 + v2190 >>> 0;
      }
      const v2184 = new Uint8Array(16);
      const v2185 = new DataView(v2184.buffer);
      v2185.setUint32(0, v2179, true);
      v2185.setUint32(4, v2180, true);
      v2185.setUint32(8, v2181, true);
      v2185.setUint32(12, v2182, true);
      return v2184;
    }
    const v2130 = v2195 => v2125(v2126(v2124.encode(v2195)));
    const v2131 = v2196 => v2125(v2129(v2124.encode(v2196)));
    const v2132 = v2197 => {
      if (!v2197) {
        return "";
      }
      return Object.keys(v2197).filter(v2198 => v2197[v2198] !== null && v2197[v2198] !== undefined && String(v2197[v2198]) !== "").sort().map(v2199 => v2199 + "=" + v2197[v2199]).join("&");
    };
    const v2133 = v2200 => Array.from({
      length: v2200
    }, () => v2123[Math.floor(Math.random() * v2123.length)]).join("");
    function v2134(v2201, v2202, v2203 = null, v2204 = "GET") {
      const v2205 = Date.now();
      const v2206 = v2201 === "h5" ? crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + v2133(12) : "" + v2205 + v2133(16);
      const v2207 = v2132(v2202);
      const v2208 = v2203 ?? "";
      const v2209 = v2201 === "h5" ? v2207 : v2207 + v2208;
      const v2210 = v2209 + "appId=" + v2119 + "&nonce=" + v2206 + "&timestamp=" + v2205 + v2120;
      return {
        param: "appId=" + v2119 + "&nonce=" + v2206 + "&timestamp=" + v2205,
        sign: v2131(v2130(v2210)),
        nonce: v2206,
        ts: v2205
      };
    }
    const v2135 = v2211 => v2211 === "h5" ? v2122 : v2121;
    const v2136 = "AiTXmBrm";
    const v2137 = "70c2c7458ab88ca9504ad0521f170075bc91f2f7";
    function v2138(v2212) {
      const v2213 = Date.now();
      const v2214 = crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + v2133(12);
      const v2215 = v2132(v2212);
      const v2216 = "appId=" + v2136 + "&nonce=" + v2214 + "&timestamp=" + v2213;
      return {
        param: v2216,
        sign: v2131(v2130("" + v2215 + v2216 + v2137)),
        nonce: v2214,
        ts: v2213,
        query: v2215
      };
    }
    function v2139(v2217, v2218) {
      const v2219 = v2138(v2217);
      const v2220 = {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept-Language": "zh-CN",
        interfaceversion: "2",
        "cfmoto-x-param": v2219.param,
        "cfmoto-x-sign": v2219.sign,
        "cfmoto-x-sign-type": "0"
      };
      if (v2218) {
        v2220.Authorization = "Bearer " + v2218;
      }
      return {
        headers: v2220,
        signed: v2219
      };
    }
    const v2140 = "MOBILE|Android|17|ZEEHO_APP|3.0.5|Dalvik/2.1.0 (Linux; U; Android 17; 2510DRK44C Build/CP2A.260605.016)|1156*2510|1|100|5G|xiaomi";
    const v2141 = "Basic bWNrOjEyMzQ1Ng==";
    function v2142(v2221, v2222, v2223, v2224, v2225, v2226 = {}) {
      const v2227 = v2134(v2221 === "h5" ? "h5" : "app", v2222, v2223, v2224);
      const v2228 = {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept-Language": "zh-CN",
        interfaceversion: "2",
        "cfmoto-x-param": v2227.param,
        "cfmoto-x-sign": v2227.sign,
        "cfmoto-x-sign-type": "0"
      };
      if (v2225) {
        v2228.Authorization = "Bearer " + v2225;
      }
      if (v2226.appLike) {
        Object.assign(v2228, {
          appid: v2119,
          nonce: v2227.nonce,
          signature: v2227.sign,
          timestamp: String(v2227.ts),
          "User-Agent": "okhttp/4.12.0",
          "x-app-info": v2140
        });
      }
      return v2228;
    }
    function v2143() {
      return Object.freeze({
        appId: v2119,
        nonceMode: "timestampRandom",
        transform: "sha1HexThenMd5Hex",
        paramHeader: "cfmoto-x-param",
        signHeader: "cfmoto-x-sign",
        timestampUnit: "milliseconds",
        nonceRandomLength: 16,
        nonceAlphabet: v2123,
        queryMode: "sortedRawNonEmpty"
      });
    }
    async function v2144({
      bridge: v2229,
      scope: v2230,
      confirmation: v2231,
      isCurrent: v2232,
      importNativeSecret: v2233
    } = {}) {
      const v2234 = typeof window === "undefined" ? globalThis : window;
      const v2235 = ["navId", "frame", "epoch", "generation", "accountId", "vin"];
      const v2236 = () => v2229 === v2234.IOSBR && v2229?.available?.() === true && v2229?.isCurrent?.() === true && ["secret.import", "secret.release", "session.renew.prepare", "session.renew.poll", "session.renew.cancel"].every(v2238 => v2229.has?.(v2238) === true) && v2232?.() === true;
      if (!v2230 || !v2235.every(v2239 => v2230[v2239] != null) || !Number.isSafeInteger(v2230.epoch) || v2230.epoch < 0 || v2231?.confirmed !== true || v2231.operation !== "session_renewal" || !v2235.every(v2240 => v2231.scope?.[v2240] === v2230[v2240]) || typeof v2233 !== "function" || !v2236()) {
        throw Object.assign(new Error("native_signer_unavailable"), {
          code: "native_signer_unavailable"
        });
      }
      const v2237 = v2124.encode(v2120);
      try {
        const v2241 = await v2233(v2237);
        if (typeof v2241 !== "string" || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v2241)) {
          throw Object.assign(new Error("secret_receipt_invalid"), {
            code: "secret_receipt_invalid"
          });
        }
        if (!v2236()) {
          throw Object.assign(new Error("stale_session"), {
            code: "stale_session"
          });
        }
        return {
          signerSpec: v2143(),
          handle: v2241
        };
      } finally {
        v2237.fill(0);
      }
    }
    async function v2145(v2242) {
      if (typeof v2242 !== "function") {
        throw Object.assign(new Error("background_keys_unavailable"), {
          code: "background_keys_unavailable"
        });
      }
      const v2243 = v2124.encode(v2120);
      const v2244 = v2124.encode(v2137);
      try {
        await v2242({
          appId: v2119,
          appSecret: new TextDecoder().decode(v2243),
          h5AppId: v2136,
          h5Secret: new TextDecoder().decode(v2244)
        });
      } finally {
        v2243.fill(0);
        v2244.fill(0);
      }
    }
    return {
      APP_ID: v2119,
      APP_INFO: v2140,
      APP_BASIC_AUTH: v2141,
      BASE: v2121,
      H5: v2122,
      baseFor: v2135,
      toQuery: v2132,
      sign: v2134,
      buildHeaders: v2142,
      exportSignerSpec: v2143,
      createNativeSigner: v2144,
      exportBackgroundKeys: v2145,
      H5_BOX_APP_ID: v2136,
      signH5Box: v2138,
      buildH5BoxHeaders: v2139,
      sha1Hex: v2130,
      md5Hex: v2131,
      _sha1Bytes: v2126,
      _md5Bytes: v2129
    };
  })();
  Object.defineProperty(window, "jsQR", {
    configurable: true,
    get() {
      Object.defineProperty(window, "jsQR", {
        configurable: true,
        writable: true,
        value: undefined
      });
      const v2245 = window.__panelPublicDependencies[2].call(window);
      const v2246 = typeof v2245 === "function" ? v2245 : window.jsQR;
      Object.defineProperty(window, "jsQR", {
        configurable: true,
        writable: true,
        value: v2246
      });
      return v2246;
    },
    set(v2247) {
      Object.defineProperty(window, "jsQR", {
        configurable: true,
        writable: true,
        value: v2247
      });
    }
  });
})();
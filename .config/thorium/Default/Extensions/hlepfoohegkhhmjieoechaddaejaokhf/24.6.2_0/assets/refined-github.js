/*! For license information please see refined-github.js.LICENSE.txt */
(() => {
  var __webpack_modules__ = {
    528: (__unused_webpack_module, exports) => {
      "use strict";
      ({
        value: !0
      }), exports.E = void 0;
      const t = {
        "@hourly": "0 * * * *",
        "@daily": "0 0 * * *",
        "@weekly": "0 0 * * 0",
        "@monthly": "0 0 1 * *",
        "@yearly": "0 0 1 1 *",
        "@annually": "0 0 1 1 *"
      };
      function e(r) {
        const n = r.trim().split(/\s+/);
        if (1 == n.length) return n[0] in t ? e(t[n[0]]) : void 0;
        if (5 == n.length) {
          let t;
          try {
            t = {
              minutes: s(n[0], 0, 59),
              hours: s(n[1], 0, 23),
              days: s(n[2], 1, 31),
              months: s(n[3], 1, 12, [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ]),
              weekDays: s(n[4], 0, 6, [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ])
            };
          } catch (t) {
            return;
          }
          return t;
        }
      }
      exports.E = e;
      const r = "(\\d{1,2}|[a-z]{3})", n = new RegExp(`^${r}(?:-${r})?$`, "i");
      function s(t, e, r, s = []) {
        const o = Array.from(new Set(t.split(",").flatMap((t => {
          const [o, u = "1"] = t.split("/", 2), a = parseInt(u, 10);
          if (Number.isNaN(a)) throw Error();
          if ("*" == o) return i(e, r, a);
          const c = o.match(n);
          if (!c) throw Error();
          const [l, f = (t.includes("/") ? r : void 0)] = c.slice(1).map((t => {
            if (s.includes(t)) return s.indexOf(t);
            const n = parseInt(t, 10);
            return !Number.isNaN(n) && e <= n && n <= r ? n : void 0;
          }));
          if (void 0 === l || void 0 !== f && f < l) throw Error();
          return null == f ? [ l ] : i(l, f, a);
        }))));
        return o.sort(((t, e) => t - e)), o;
      }
      function o(t) {
        return new Date(Date.UTC(t.years, t.months - 1, t.days, t.hours, t.minutes));
      }
      function i(t, e, r) {
        return Array.from({
          length: Math.floor((e - t) / r) + 1
        }).map(((e, n) => t + n * r));
      }
      e.nextDate = function(t, r = new Date) {
        const n = "string" == typeof t ? e(t) : t;
        if (void 0 === n) return;
        const s = {
          years: r.getUTCFullYear(),
          months: r.getUTCMonth() + 1,
          days: r.getUTCDate(),
          hours: r.getUTCHours(),
          minutes: r.getUTCMinutes() + 1
        }, i = Object.keys(s);
        for (let t = 1; t < i.length; t++) {
          const e = i[t];
          if (!n[e].includes(s[e])) {
            i.filter(((e, r) => r > t)).forEach((t => s[t] = n[t][0]));
            const r = n[e].find((t => t >= s[e]));
            void 0 !== r ? s[e] = r : (s[e] = n[e][0], s[i[t - 1]]++, t = "months" != e ? t - 2 : t);
          }
          "days" != e || n.weekDays.includes(o(s).getUTCDay()) || (s.days++, s.hours = n.hours[0], 
          s.minutes = n.minutes[0], t = 1);
        }
        return o(s);
      };
    },
    574: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = __webpack_require__(286);
    },
    50: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      __export(__webpack_require__(927));
      __export(__webpack_require__(308));
    },
    927: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var defaultOptions = {
        padding: !0,
        symbols: __webpack_require__(176).defaultSymbols
      };
      exports.abbreviateNumber = function(num, digit, options) {
        if (void 0 === digit) digit = 1;
        if (Array.isArray(options)) options = {
          symbols: options
        };
        var _a = Object.assign({}, defaultOptions, options), symbols = _a.symbols, padding = _a.padding, sign = Math.sign(num) >= 0;
        num = Math.abs(num);
        var tier = Math.log10(num) / 3 | 0;
        if (0 == tier) return (!sign ? "-" : "") + num.toString();
        var suffix = symbols[tier];
        if (!suffix) throw new RangeError;
        var rounded = (num / Math.pow(10, 3 * tier)).toFixed(digit);
        if (!padding) rounded = String(Number(rounded));
        return (!sign ? "-" : "") + rounded + suffix;
      };
    },
    176: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      exports.defaultSymbols = [ "", "k", "M", "G", "T", "P", "E" ];
    },
    308: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var const_1 = __webpack_require__(176), utils_1 = __webpack_require__(406);
      exports.unabbreviateNumber = function(num, symbols) {
        if (void 0 === symbols) symbols = const_1.defaultSymbols;
        var pattern = "^([+-]?([0-9]*[.])?[0-9]+)(" + ("" + symbols.join("|")) + ")$", regex = new RegExp(pattern), match = num.match(pattern) || [];
        if (regex.test(num) && match.length > 3) {
          var symbol = match[3], symbolValue = utils_1.symbolPow(symbols.indexOf(symbol));
          return Number(match[1]) * symbolValue;
        } else throw Error("This is not a valid input");
      };
    },
    406: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      exports.symbolPow = function(index) {
        if (void 0 === index) index = 0;
        return Math.pow(10, 3 * index);
      };
    },
    972: (module, exports, __webpack_require__) => {
      var __WEBPACK_AMD_DEFINE_RESULT__, LZString = function() {
        var f = String.fromCharCode, keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", baseReverseDic = {};
        function getBaseValue(alphabet, character) {
          if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for (var i = 0; i < alphabet.length; i++) baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
          return baseReverseDic[alphabet][character];
        }
        var LZString = {
          compressToBase64: function(input) {
            if (null == input) return "";
            var res = LZString._compress(input, 6, (function(a) {
              return keyStrBase64.charAt(a);
            }));
            switch (res.length % 4) {
             default:
             case 0:
              return res;

             case 1:
              return res + "===";

             case 2:
              return res + "==";

             case 3:
              return res + "=";
            }
          },
          decompressFromBase64: function(input) {
            if (null == input) return "";
            if ("" == input) return null; else return LZString._decompress(input.length, 32, (function(index) {
              return getBaseValue(keyStrBase64, input.charAt(index));
            }));
          },
          compressToUTF16: function(input) {
            if (null == input) return ""; else return LZString._compress(input, 15, (function(a) {
              return f(a + 32);
            })) + " ";
          },
          decompressFromUTF16: function(compressed) {
            if (null == compressed) return "";
            if ("" == compressed) return null; else return LZString._decompress(compressed.length, 16384, (function(index) {
              return compressed.charCodeAt(index) - 32;
            }));
          },
          compressToUint8Array: function(uncompressed) {
            for (var compressed = LZString.compress(uncompressed), buf = new Uint8Array(2 * compressed.length), i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
              var current_value = compressed.charCodeAt(i);
              buf[2 * i] = current_value >>> 8;
              buf[2 * i + 1] = current_value % 256;
            }
            return buf;
          },
          decompressFromUint8Array: function(compressed) {
            if (null == compressed) return LZString.decompress(compressed); else {
              for (var buf = new Array(compressed.length / 2), i = 0, TotalLen = buf.length; i < TotalLen; i++) buf[i] = 256 * compressed[2 * i] + compressed[2 * i + 1];
              var result = [];
              buf.forEach((function(c) {
                result.push(f(c));
              }));
              return LZString.decompress(result.join(""));
            }
          },
          compressToEncodedURIComponent: function(input) {
            if (null == input) return ""; else return LZString._compress(input, 6, (function(a) {
              return keyStrUriSafe.charAt(a);
            }));
          },
          decompressFromEncodedURIComponent: function(input) {
            if (null == input) return "";
            if ("" == input) return null;
            input = input.replace(/ /g, "+");
            return LZString._decompress(input.length, 32, (function(index) {
              return getBaseValue(keyStrUriSafe, input.charAt(index));
            }));
          },
          compress: function(uncompressed) {
            return LZString._compress(uncompressed, 16, (function(a) {
              return f(a);
            }));
          },
          _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
            if (null == uncompressed) return "";
            var i, value, ii, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0;
            for (ii = 0; ii < uncompressed.length; ii += 1) {
              context_c = uncompressed.charAt(ii);
              if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                context_dictionary[context_c] = context_dictSize++;
                context_dictionaryToCreate[context_c] = !0;
              }
              context_wc = context_w + context_c;
              if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc; else {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                  if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val <<= 1;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else context_data_position++;
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 8; i++) {
                      context_data_val = context_data_val << 1 | 1 & value;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else context_data_position++;
                      value >>= 1;
                    }
                  } else {
                    value = 1;
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1 | value;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else context_data_position++;
                      value = 0;
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 16; i++) {
                      context_data_val = context_data_val << 1 | 1 & value;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else context_data_position++;
                      value >>= 1;
                    }
                  }
                  if (0 == --context_enlargeIn) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                  }
                  delete context_dictionaryToCreate[context_w];
                } else {
                  value = context_dictionary[context_w];
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | 1 & value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else context_data_position++;
                    value >>= 1;
                  }
                }
                if (0 == --context_enlargeIn) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                context_dictionary[context_wc] = context_dictSize++;
                context_w = String(context_c);
              }
            }
            if ("" !== context_w) {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val <<= 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else context_data_position++;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | 1 & value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else context_data_position++;
                    value >>= 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else context_data_position++;
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | 1 & value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else context_data_position++;
                    value >>= 1;
                  }
                }
                if (0 == --context_enlargeIn) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | 1 & value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else context_data_position++;
                  value >>= 1;
                }
              }
              if (0 == --context_enlargeIn) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
            }
            value = 2;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | 1 & value;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else context_data_position++;
              value >>= 1;
            }
            for (;;) {
              context_data_val <<= 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data.push(getCharFromInt(context_data_val));
                break;
              } else context_data_position++;
            }
            return context_data.join("");
          },
          decompress: function(compressed) {
            if (null == compressed) return "";
            if ("" == compressed) return null; else return LZString._decompress(compressed.length, 32768, (function(index) {
              return compressed.charCodeAt(index);
            }));
          },
          _decompress: function(length, resetValue, getNextValue) {
            var i, w, bits, resb, maxpower, power, c, dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], data = {
              val: getNextValue(0),
              position: resetValue,
              index: 1
            };
            for (i = 0; i < 3; i += 1) dictionary[i] = i;
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            for (;power != maxpower; ) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (0 == data.position) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (bits) {
             case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              for (;power != maxpower; ) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (0 == data.position) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;

             case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              for (;power != maxpower; ) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (0 == data.position) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;

             case 2:
              return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            for (;;) {
              if (data.index > length) return "";
              bits = 0;
              maxpower = Math.pow(2, numBits);
              power = 1;
              for (;power != maxpower; ) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (0 == data.position) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              switch (c = bits) {
               case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                for (;power != maxpower; ) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (0 == data.position) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;

               case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                for (;power != maxpower; ) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (0 == data.position) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;

               case 2:
                return result.join("");
              }
              if (0 == enlargeIn) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }
              if (dictionary[c]) entry = dictionary[c]; else if (c === dictSize) entry = w + w.charAt(0); else return null;
              result.push(entry);
              dictionary[dictSize++] = w + entry.charAt(0);
              w = entry;
              if (0 == --enlargeIn) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }
            }
          }
        };
        return LZString;
      }();
      if (1) void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return LZString;
      }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    },
    669: function(module, exports, __webpack_require__) {
      "use strict";
      var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))((function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : new P((function(resolve) {
              resolve(result.value);
            })).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        }));
      }, __importDefault = this && this.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const p_defer_1 = __importDefault(__webpack_require__(905));
      function mapAgeCleaner(map, property = "maxAge") {
        let processingKey, processingTimer, processingDeferred;
        const cleanup = () => __awaiter(this, void 0, void 0, (function*() {
          if (void 0 !== processingKey) return;
          const setupTimer = item => __awaiter(this, void 0, void 0, (function*() {
            processingDeferred = p_defer_1.default();
            const delay = item[1][property] - Date.now();
            if (!(delay <= 0)) {
              processingKey = item[0];
              processingTimer = setTimeout((() => {
                map.delete(item[0]);
                if (processingDeferred) processingDeferred.resolve();
              }), delay);
              if ("function" == typeof processingTimer.unref) processingTimer.unref();
              return processingDeferred.promise;
            } else {
              map.delete(item[0]);
              processingDeferred.resolve();
            }
          }));
          try {
            for (const entry of map) yield setupTimer(entry);
          } catch (_a) {}
          processingKey = void 0;
        })), originalSet = map.set.bind(map);
        map.set = (key, value) => {
          if (map.has(key)) map.delete(key);
          const result = originalSet(key, value);
          if (processingKey && processingKey === key) (() => {
            processingKey = void 0;
            if (void 0 !== processingTimer) {
              clearTimeout(processingTimer);
              processingTimer = void 0;
            }
            if (void 0 !== processingDeferred) {
              processingDeferred.reject(void 0);
              processingDeferred = void 0;
            }
          })();
          cleanup();
          return result;
        };
        cleanup();
        return map;
      }
      exports.default = mapAgeCleaner;
      module.exports = mapAgeCleaner;
      module.exports.default = mapAgeCleaner;
    },
    905: module => {
      "use strict";
      module.exports = () => {
        const ret = {};
        ret.promise = new Promise(((resolve, reject) => {
          ret.resolve = resolve;
          ret.reject = reject;
        }));
        return ret;
      };
    },
    400: module => {
      "use strict";
      module.exports = string => {
        const match = string.match(/^[ \t]*(?=\S)/gm);
        if (!match) return 0; else return match.reduce(((r, a) => Math.min(r, a.length)), 1 / 0);
      };
    },
    37: (module, __unused_webpack_exports, __webpack_require__) => {
      const reservedPaths = __webpack_require__(916), patchDiffRegex = /[.](patch|diff)$/, releaseRegex = /^releases[/]tag[/]([^/]+)/, labelRegex = /^labels[/]([^/]+)/, compareRegex = /^compare[/]([^/]+)/, pullRegex = /^pull[/](?<pull>\d+)(?:[/](?<pullPage>[^/]+))?(?:[/](?<pullPartialStart>[\da-f]{40})[.][.](?<pullPartialEnd>[\da-f]{40}))?$/, issueRegex = /^issues[/](\d+)$/, commitRegex = /^commit[/]([\da-f]{40})$/, releaseArchiveRegex = /^archive[/](.+)([.]zip|[.]tar[.]gz)/, releaseDownloadRegex = /^releases[/]download[/]([^/]+)[/](.+)/, dependentsRegex = /^network[/]dependents[/]?$/, dependenciesRegex = /^network[/]dependencies[/]?$/, wikiRegex = /^wiki[/](.+)$/;
      function commentIndicator(hash) {
        if (hash.startsWith("#issue-") || hash.startsWith("#commitcomment-")) return " (comment)";
        if (hash.startsWith("#pullrequestreview-") || hash.startsWith("#discussion_r")) return " (review)"; else return "";
      }
      function joinValues(array, delimiter = "/") {
        return array.filter(Boolean).join(delimiter);
      }
      function shortenURL(href, currentUrl = "https://github.com") {
        if (!href) return;
        const currentRepo = (currentUrl = new URL(currentUrl)).pathname.slice(1).split("/", 2).join("/"), url = new URL(href), {origin, pathname, search, searchParams, hash} = url, pathnameParts = pathname.slice(1).split("/"), repoPath = pathnameParts.slice(2).join("/"), isRaw = [ "https://raw.githubusercontent.com", "https://cdn.rawgit.com", "https://rawgit.com" ].includes(origin), isRedirection = [ "https://togithub.com", "https://github-redirect.dependabot.com" ].includes(origin);
        let [user, repo, type, revision, ...filePath] = pathnameParts;
        if (isRaw) {
          [user, repo, revision, ...filePath] = pathnameParts;
          type = "raw";
        }
        revision = function(revision) {
          if (revision) {
            revision = revision.replace(patchDiffRegex, "");
            if (/^[0-9a-f]{40}$/.test(revision)) revision = revision.slice(0, 7);
            return `<code>${revision}</code>`;
          }
        }(revision);
        filePath = filePath.join("/");
        const isLocal = origin === currentUrl.origin, isThisRepo = (isLocal || isRaw || isRedirection) && currentRepo === `${user}/${repo}`, isReserved = reservedPaths.includes(user), isDependents = dependentsRegex.test(repoPath), isDependencies = dependenciesRegex.test(repoPath), [, diffOrPatch] = repoPath.match(patchDiffRegex) || [], [, release] = repoPath.match(releaseRegex) || [], [, releaseTag, releaseTagExt] = repoPath.match(releaseArchiveRegex) || [], [, downloadTag, downloadFilename] = repoPath.match(releaseDownloadRegex) || [], [, label] = repoPath.match(labelRegex) || [], [, compare] = repoPath.match(compareRegex) || [], {pull, pullPage, pullPartialStart, pullPartialEnd} = repoPath.match(pullRegex)?.groups ?? {}, [, issue] = isRedirection ? repoPath.match(issueRegex) || [] : [], [, commit] = isRedirection ? repoPath.match(commitRegex) || [] : [], [, wiki] = repoPath.match(wikiRegex) || [], isFileOrDir = revision && [ "raw", "tree", "blob", "blame", "commits" ].includes(type), repoUrl = isThisRepo ? "" : `${user}/${repo}`;
        if (isReserved || "/" === pathname || !isLocal && !isRaw && !isRedirection) return href.replace(/^https:[/][/]/, "").replace(/^www[.]/, "").replace(/[/]$/, "");
        if (user && !repo) return `@${user}${search}${hash}`;
        if (isFileOrDir) {
          const partial = `${joinValues([ joinValues([ repoUrl, revision ], "@"), filePath ], "/")}${search}${hash}`;
          if ("blob" !== type && "tree" !== type) return `${partial} (${type})`; else return partial;
        }
        if (diffOrPatch) {
          return `${joinValues([ repoUrl, revision ], "@")}.${diffOrPatch}${search}${hash}`;
        }
        if (release) {
          return `${joinValues([ repoUrl, `<code>${release}</code>` ], "@")}${search}${hash} (release)`;
        }
        if (releaseTagExt) {
          return `${joinValues([ repoUrl, `<code>${releaseTag}</code>` ], "@")}${releaseTagExt}${search}${hash}`;
        }
        if (downloadFilename) {
          return `${joinValues([ repoUrl, `<code>${downloadTag}</code>` ], "@")} ${downloadFilename}${search}${hash} (download)`;
        }
        if (label) return joinValues([ repoUrl, decodeURIComponent(label) ]) + `${search}${hash} (label)`;
        if (isDependents) return `${user}/${repo} (dependents)`;
        if (isDependencies) return `${user}/${repo} (dependencies)`;
        if (pull) {
          if ("files" === pullPage && pullPartialStart && pullPartialEnd) return `<code>${pullPartialStart.slice(0, 8)}..${pullPartialEnd.slice(0, 8)}</code> (#${pull})`;
          if (pullPage) return `${repoUrl}#${pull} (${pullPage})`;
        }
        if (compare) {
          return `${joinValues([ repoUrl, revision ], "@")}${search}${hash} (compare)`;
        }
        if (wiki) return `Wiki: ${decodeURIComponent((wiki + (hash ? " (" + hash.slice(1) + ")" : "")).replaceAll("-", " "))} (${repoUrl})`;
        if (isRedirection) {
          if (issue) return `${repoUrl}#${issue}${commentIndicator(hash)}`;
          if (pull) return `${repoUrl}#${pull}${commentIndicator(hash)}`;
          if (commit) return joinValues([ repoUrl, `<code>${commit.slice(0, 7)}</code>` ], "@") + commentIndicator(hash);
        }
        let query = searchParams.get("q") ?? "";
        if (query) {
          searchParams.delete("q");
          if (pathname.endsWith("/issues")) query = query.replace("is:issue", ""); else if (pathname.endsWith("/pulls")) query = query.replace("is:pr", "");
          query = ` (${query.replaceAll(/\s+/g, " ").trim()})`;
        }
        if ("readme-ov-file" === searchParams.get("tab")) searchParams.delete("tab");
        return pathname.replaceAll(/^[/]|[/]$/g, "") + url.search + hash + query;
      }
      module.exports = shortenURL;
      module.exports.applyToLink = function(a, currentUrl) {
        const url = a.dataset.originalHref ?? a.href;
        if ((url === a.textContent.trim() || url === `${a.textContent}/`) && !a.firstElementChild) {
          const shortened = shortenURL(url, currentUrl);
          a.innerHTML = shortened;
          return !0;
        }
        return !1;
      };
    },
    305: (__unused_webpack_module, exports) => {
      "use strict";
      const htmlEscape = string => string.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), htmlUnescape = htmlString => htmlString.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
      exports.z = (strings, ...values) => {
        if ("string" == typeof strings) return htmlEscape(strings);
        let output = strings[0];
        for (const [index, value] of values.entries()) output = output + htmlEscape(String(value)) + strings[index + 1];
        return output;
      };
      (strings, ...values) => {
        if ("string" == typeof strings) return htmlUnescape(strings);
        let output = strings[0];
        for (const [index, value] of values.entries()) output = output + htmlUnescape(String(value)) + strings[index + 1];
        return output;
      };
    },
    718: (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      globalThis.browser = __webpack_require__(131);
    },
    131: function(module, exports) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !function(global, factory) {
        if (1) __WEBPACK_AMD_DEFINE_ARRAY__ = [ module ], __WEBPACK_AMD_DEFINE_FACTORY__ = function(module) {
          "use strict";
          if (!globalThis.chrome?.runtime?.id) throw new Error("This script should only be loaded in a browser extension.");
          if (void 0 === globalThis.browser || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
            const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.", wrapAPIs = extensionAPIs => {
              const apiMetadata = {
                alarms: {
                  clear: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  clearAll: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  get: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                },
                bookmarks: {
                  create: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getChildren: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getRecent: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getSubTree: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getTree: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  move: {
                    minArgs: 2,
                    maxArgs: 2
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeTree: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  search: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2
                  }
                },
                browserAction: {
                  disable: {
                    minArgs: 0,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  enable: {
                    minArgs: 0,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  getBadgeBackgroundColor: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getBadgeText: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getPopup: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getTitle: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  openPopup: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  setBadgeBackgroundColor: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  setBadgeText: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  setIcon: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  setPopup: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  setTitle: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  }
                },
                browsingData: {
                  remove: {
                    minArgs: 2,
                    maxArgs: 2
                  },
                  removeCache: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeCookies: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeDownloads: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeFormData: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeHistory: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeLocalStorage: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removePasswords: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removePluginData: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  settings: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                },
                commands: {
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                },
                contextMenus: {
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeAll: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2
                  }
                },
                cookies: {
                  get: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getAll: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getAllCookieStores: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                devtools: {
                  inspectedWindow: {
                    eval: {
                      minArgs: 1,
                      maxArgs: 2,
                      singleCallbackArg: !1
                    }
                  },
                  panels: {
                    create: {
                      minArgs: 3,
                      maxArgs: 3,
                      singleCallbackArg: !0
                    },
                    elements: {
                      createSidebarPane: {
                        minArgs: 1,
                        maxArgs: 1
                      }
                    }
                  }
                },
                downloads: {
                  cancel: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  download: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  erase: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getFileIcon: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  open: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  pause: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeFile: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  resume: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  search: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  show: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  }
                },
                extension: {
                  isAllowedFileSchemeAccess: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  isAllowedIncognitoAccess: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                },
                history: {
                  addUrl: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  deleteAll: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  deleteRange: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  deleteUrl: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getVisits: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  search: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                i18n: {
                  detectLanguage: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getAcceptLanguages: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                },
                identity: {
                  launchWebAuthFlow: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                idle: {
                  queryState: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                management: {
                  get: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  getSelf: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  setEnabled: {
                    minArgs: 2,
                    maxArgs: 2
                  },
                  uninstallSelf: {
                    minArgs: 0,
                    maxArgs: 1
                  }
                },
                notifications: {
                  clear: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  create: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  getPermissionLevel: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2
                  }
                },
                pageAction: {
                  getPopup: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getTitle: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  hide: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  setIcon: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  setPopup: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  setTitle: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  },
                  show: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0
                  }
                },
                permissions: {
                  contains: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  request: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                runtime: {
                  getBackgroundPage: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  getPlatformInfo: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  openOptionsPage: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  requestUpdateCheck: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  sendMessage: {
                    minArgs: 1,
                    maxArgs: 3
                  },
                  sendNativeMessage: {
                    minArgs: 2,
                    maxArgs: 2
                  },
                  setUninstallURL: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                sessions: {
                  getDevices: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getRecentlyClosed: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  restore: {
                    minArgs: 0,
                    maxArgs: 1
                  }
                },
                storage: {
                  local: {
                    clear: {
                      minArgs: 0,
                      maxArgs: 0
                    },
                    get: {
                      minArgs: 0,
                      maxArgs: 1
                    },
                    getBytesInUse: {
                      minArgs: 0,
                      maxArgs: 1
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1
                    },
                    set: {
                      minArgs: 1,
                      maxArgs: 1
                    }
                  },
                  managed: {
                    get: {
                      minArgs: 0,
                      maxArgs: 1
                    },
                    getBytesInUse: {
                      minArgs: 0,
                      maxArgs: 1
                    }
                  },
                  sync: {
                    clear: {
                      minArgs: 0,
                      maxArgs: 0
                    },
                    get: {
                      minArgs: 0,
                      maxArgs: 1
                    },
                    getBytesInUse: {
                      minArgs: 0,
                      maxArgs: 1
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1
                    },
                    set: {
                      minArgs: 1,
                      maxArgs: 1
                    }
                  }
                },
                tabs: {
                  captureVisibleTab: {
                    minArgs: 0,
                    maxArgs: 2
                  },
                  create: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  detectLanguage: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  discard: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  duplicate: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  executeScript: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getCurrent: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  getZoom: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getZoomSettings: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  goBack: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  goForward: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  highlight: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  insertCSS: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  move: {
                    minArgs: 2,
                    maxArgs: 2
                  },
                  query: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  reload: {
                    minArgs: 0,
                    maxArgs: 2
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  removeCSS: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  sendMessage: {
                    minArgs: 2,
                    maxArgs: 3
                  },
                  setZoom: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  setZoomSettings: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  update: {
                    minArgs: 1,
                    maxArgs: 2
                  }
                },
                topSites: {
                  get: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                },
                webNavigation: {
                  getAllFrames: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  getFrame: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                webRequest: {
                  handlerBehaviorChanged: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                },
                windows: {
                  create: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 2
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getCurrent: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getLastFocused: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2
                  }
                }
              };
              if (0 === Object.keys(apiMetadata).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
              class DefaultWeakMap extends WeakMap {
                constructor(createItem, items = void 0) {
                  super(items);
                  this.createItem = createItem;
                }
                get(key) {
                  if (!this.has(key)) this.set(key, this.createItem(key));
                  return super.get(key);
                }
              }
              const isThenable = value => value && "object" == typeof value && "function" == typeof value.then, makeCallback = (promise, metadata) => (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) promise.reject(new Error(extensionAPIs.runtime.lastError.message)); else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && !1 !== metadata.singleCallbackArg) promise.resolve(callbackArgs[0]); else promise.resolve(callbackArgs);
              }, pluralizeArguments = numArgs => 1 == numArgs ? "argument" : "arguments", wrapAsyncFunction = (name, metadata) => function(target, ...args) {
                if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                return new Promise(((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) try {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  } catch (cbError) {
                    console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                    target[name](...args);
                    metadata.fallbackToNoCallback = !1;
                    metadata.noCallback = !0;
                    resolve();
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                }));
              }, wrapMethod = (target, method, wrapper) => new Proxy(method, {
                apply: (targetMethod, thisObj, args) => wrapper.call(thisObj, target, ...args)
              });
              let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
              const wrapObject = (target, wrappers = {}, metadata = {}) => {
                let cache = Object.create(null), handlers = {
                  has: (proxyTarget, prop) => prop in target || prop in cache,
                  get(proxyTarget, prop, receiver) {
                    if (prop in cache) return cache[prop];
                    if (!(prop in target)) return;
                    let value = target[prop];
                    if ("function" == typeof value) if ("function" == typeof wrappers[prop]) value = wrapMethod(target, target[prop], wrappers[prop]); else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else value = value.bind(target); else if ("object" == typeof value && null !== value && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) value = wrapObject(value, wrappers[prop], metadata[prop]); else if (hasOwnProperty(metadata, "*")) value = wrapObject(value, wrappers[prop], metadata["*"]); else {
                      Object.defineProperty(cache, prop, {
                        configurable: !0,
                        enumerable: !0,
                        get: () => target[prop],
                        set(value) {
                          target[prop] = value;
                        }
                      });
                      return value;
                    }
                    cache[prop] = value;
                    return value;
                  },
                  set(proxyTarget, prop, value, receiver) {
                    if (prop in cache) cache[prop] = value; else target[prop] = value;
                    return !0;
                  },
                  defineProperty: (proxyTarget, prop, desc) => Reflect.defineProperty(cache, prop, desc),
                  deleteProperty: (proxyTarget, prop) => Reflect.deleteProperty(cache, prop)
                }, proxyTarget = Object.create(target);
                return new Proxy(proxyTarget, handlers);
              }, wrapEvent = wrapperMap => ({
                addListener(target, listener, ...args) {
                  target.addListener(wrapperMap.get(listener), ...args);
                },
                hasListener: (target, listener) => target.hasListener(wrapperMap.get(listener)),
                removeListener(target, listener) {
                  target.removeListener(wrapperMap.get(listener));
                }
              }), onRequestFinishedWrappers = new DefaultWeakMap((listener => {
                if ("function" != typeof listener) return listener; else return function(req) {
                  const wrappedReq = wrapObject(req, {}, {
                    getContent: {
                      minArgs: 0,
                      maxArgs: 0
                    }
                  });
                  listener(wrappedReq);
                };
              })), onMessageWrappers = new DefaultWeakMap((listener => {
                if ("function" != typeof listener) return listener; else return function(message, sender, sendResponse) {
                  let wrappedSendResponse, result, didCallSendResponse = !1, sendResponsePromise = new Promise((resolve => {
                    wrappedSendResponse = function(response) {
                      didCallSendResponse = !0;
                      resolve(response);
                    };
                  }));
                  try {
                    result = listener(message, sender, wrappedSendResponse);
                  } catch (err) {
                    result = Promise.reject(err);
                  }
                  const isResultThenable = !0 !== result && isThenable(result);
                  if (!0 !== result && !isResultThenable && !didCallSendResponse) return !1;
                  const sendPromisedResult = promise => {
                    promise.then((msg => {
                      sendResponse(msg);
                    }), (error => {
                      let message;
                      if (error && (error instanceof Error || "string" == typeof error.message)) message = error.message; else message = "An unexpected error occurred";
                      sendResponse({
                        __mozWebExtensionPolyfillReject__: !0,
                        message
                      });
                    })).catch((err => {
                      console.error("Failed to send onMessage rejected reply", err);
                    }));
                  };
                  if (isResultThenable) sendPromisedResult(result); else sendPromisedResult(sendResponsePromise);
                  return !0;
                };
              })), wrappedSendMessageCallback = ({reject, resolve}, reply) => {
                if (extensionAPIs.runtime.lastError) if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) resolve(); else reject(new Error(extensionAPIs.runtime.lastError.message)); else if (reply && reply.__mozWebExtensionPolyfillReject__) reject(new Error(reply.message)); else resolve(reply);
              }, wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
                if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                return new Promise(((resolve, reject) => {
                  const wrappedCb = wrappedSendMessageCallback.bind(null, {
                    resolve,
                    reject
                  });
                  args.push(wrappedCb);
                  apiNamespaceObj.sendMessage(...args);
                }));
              }, staticWrappers = {
                devtools: {
                  network: {
                    onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                  }
                },
                runtime: {
                  onMessage: wrapEvent(onMessageWrappers),
                  onMessageExternal: wrapEvent(onMessageWrappers),
                  sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                    minArgs: 1,
                    maxArgs: 3
                  })
                },
                tabs: {
                  sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                    minArgs: 2,
                    maxArgs: 3
                  })
                }
              }, settingMetadata = {
                clear: {
                  minArgs: 1,
                  maxArgs: 1
                },
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              };
              apiMetadata.privacy = {
                network: {
                  "*": settingMetadata
                },
                services: {
                  "*": settingMetadata
                },
                websites: {
                  "*": settingMetadata
                }
              };
              return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
            };
            module.exports = wrapAPIs(chrome);
          } else module.exports = globalThis.browser;
        }, void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__); else ;
      }("undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self);
    },
    591: module => {
      "use strict";
      function getIndex(container, target) {
        let index = 0;
        do {
          for (;target.previousSibling; ) {
            index += target.previousSibling.textContent.length;
            target = target.previousSibling;
          }
          target = target.parentElement;
        } while (target && target !== container);
        return index;
      }
      function getNodeAtIndex(container, index) {
        let relativeIndex = index, cursor = container;
        for (;cursor && cursor.firstChild; ) {
          cursor = cursor.firstChild;
          for (;cursor && cursor.textContent.length < relativeIndex; ) {
            relativeIndex -= cursor.textContent.length;
            if (cursor.nextSibling) cursor = cursor.nextSibling;
          }
        }
        return [ cursor, relativeIndex ];
      }
      function getSmartIndexRange(node, start, end) {
        const range = document.createRange();
        range.setStart(...getNodeAtIndex(node, start));
        range.setEnd(...getNodeAtIndex(node, end));
        return range;
      }
      module.exports = function(target, source) {
        if (target.textContent !== source.textContent) throw new Error("`target` and `source` must have matching `textContent`");
        for (const child of source.querySelectorAll("*")) {
          const textIndex = getIndex(source, child), newEl = child.cloneNode(), contentsRange = getSmartIndexRange(target, textIndex, textIndex + child.textContent.length);
          newEl.append(contentsRange.extractContents());
          contentsRange.insertNode(newEl);
        }
      };
    },
    916: module => {
      "use strict";
      module.exports = JSON.parse('["300","302","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","500","501","502","503","504","505","506","507","508","509","510","511","693","694","695","900","about","access","account","admin","advisories","anonymous","any","api","apps","attributes","auth","billing","blob","blog","bounty","branches","business","businesses","c","cache","case-studies","categories","central","certification","changelog","chat","cla","cloud","codereview","collection","collections","comments","commit","commits","community","companies","compare","contact","contributing","cookbook","coupons","customer-stories","customer","customers","dashboard-feed","dashboard","dashboards","design","develop","developer","diff","discover","discussions","docs","downloads","downtime","editor","editors","edu","enterprise","events","explore","featured","features","files","fixtures","forked","garage","ghost","gist","gists","graphs","guide","guides","help","help-wanted","home","hooks","hosting","hovercards","identity","images","inbox","individual","info","integration","interfaces","introduction","invalid-email-address","investors","issues","jobs","join","journal","journals","lab","labs","languages","launch","layouts","learn","legal","library","linux","listings","lists","login","logos","logout","mac","maintenance","malware","man","marketplace","mention","mentioned","mentioning","mentions","migrating","milestones","mine","mirrors","mobile","navigation","network","new","news","none","nonprofit","nonprofits","notices","notifications","oauth","offer","open-source","organisations","organizations","orgs","pages","partners","payments","personal","plans","plugins","popular","popularity","posts","press","pricing","professional","projects","pulls","raw","readme","recommendations","redeem","releases","render","reply","repositories","resources","restore","revert","save-net-neutrality","saved","scraping","search","security","services","sessions","settings","shareholders","shop","showcases","signin","signup","site","spam","sponsors","ssh","staff","starred","stars","static","status","statuses","storage","store","stories","styleguide","subscriptions","suggest","suggestion","suggestions","support","suspended","talks","teach","teacher","teachers","teaching","team","teams","ten","terms","timeline","topic","topics","tos","tour","train","training","translations","tree","trending","updates","username","users","visualization","w","watching","wiki","windows","works-with","www0","www1","www2","www3","www4","www5","www6","www7","www8","www9"]');
    },
    286: module => {
      "use strict";
      module.exports = JSON.parse('["area","base","br","col","embed","hr","img","input","link","menuitem","meta","param","source","track","wbr"]');
    }
  }, __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }
  __webpack_require__.n = module => {
    var getter = module && module.__esModule ? () => module.default : () => module;
    __webpack_require__.d(getter, {
      a: getter
    });
    return getter;
  };
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
      enumerable: !0,
      get: definition[key]
    });
  };
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  (() => {
    "use strict";
    __webpack_require__(718);
    const reservedNames = [ "300", "302", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "500", "501", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "693", "694", "695", "900", "about", "access", "account", "admin", "advisories", "anonymous", "any", "api", "apps", "attributes", "auth", "billing", "blob", "blog", "bounty", "branches", "business", "businesses", "c", "cache", "case-studies", "categories", "central", "certification", "changelog", "chat", "cla", "cloud", "codereview", "collection", "collections", "comments", "commit", "commits", "community", "companies", "compare", "contact", "contributing", "cookbook", "coupons", "customer-stories", "customer", "customers", "dashboard-feed", "dashboard", "dashboards", "design", "develop", "developer", "diff", "discover", "discussions", "docs", "downloads", "downtime", "editor", "editors", "edu", "enterprise", "events", "explore", "featured", "features", "files", "fixtures", "forked", "garage", "ghost", "gist", "gists", "graphs", "guide", "guides", "help", "help-wanted", "home", "hooks", "hosting", "hovercards", "identity", "images", "inbox", "individual", "info", "integration", "interfaces", "introduction", "invalid-email-address", "investors", "issues", "jobs", "join", "journal", "journals", "lab", "labs", "languages", "launch", "layouts", "learn", "legal", "library", "linux", "listings", "lists", "login", "logos", "logout", "mac", "maintenance", "malware", "man", "marketplace", "mention", "mentioned", "mentioning", "mentions", "migrating", "milestones", "mine", "mirrors", "mobile", "navigation", "network", "new", "news", "none", "nonprofit", "nonprofits", "notices", "notifications", "oauth", "offer", "open-source", "organisations", "organizations", "orgs", "pages", "partners", "payments", "personal", "plans", "plugins", "popular", "popularity", "posts", "press", "pricing", "professional", "projects", "pulls", "raw", "readme", "recommendations", "redeem", "releases", "render", "reply", "repositories", "resources", "restore", "revert", "save-net-neutrality", "saved", "scraping", "search", "security", "services", "sessions", "settings", "shareholders", "shop", "showcases", "signin", "signup", "site", "spam", "sponsors", "ssh", "staff", "starred", "stars", "static", "status", "statuses", "storage", "store", "stories", "styleguide", "subscriptions", "suggest", "suggestion", "suggestions", "support", "suspended", "talks", "teach", "teacher", "teachers", "teaching", "team", "teams", "ten", "terms", "timeline", "topic", "topics", "tos", "tour", "train", "training", "translations", "tree", "trending", "updates", "username", "users", "visualization", "w", "watching", "wiki", "windows", "works-with", "www0", "www1", "www2", "www3", "www4", "www5", "www6", "www7", "www8", "www9" ], $ = selector => document.querySelector(selector), exists = selector => Boolean($(selector)), is404 = () => /^(Page|File) not found · GitHub/.test(document.title), isBlame = (url = location) => Boolean(getRepo(url)?.path.startsWith("blame/")), isCommit = (url = location) => isSingleCommit(url) || isPRCommit(url), isCommitList = (url = location) => isRepoCommitList(url) || isPRCommitList(url), isRepoCommitList = (url = location) => Boolean(getRepo(url)?.path.startsWith("commits")), isCompare = (url = location) => Boolean(getRepo(url)?.path.startsWith("compare")), isDashboard = (url = location) => !isGist(url) && /^$|^(orgs\/[^/]+\/)?dashboard(-feed)?(\/|$)/.test(getCleanPathname(url)), isEnterprise = (url = location) => "github.com" !== url.hostname && "gist.github.com" !== url.hostname, isGist = (url = location) => "string" == typeof getCleanGistPathname(url), isGlobalIssueOrPRList = (url = location) => [ "issues", "pulls" ].includes(url.pathname.split("/", 2)[1]), isGlobalSearchResults = (url = location) => "/search" === url.pathname && null !== new URLSearchParams(url.search).get("q"), isIssue = (url = location) => /^issues\/\d+/.test(getRepo(url)?.path) && "GitHub · Where software is built" !== document.title, isIssueOrPRList = (url = location) => isGlobalIssueOrPRList(url) || isRepoIssueOrPRList(url) || isMilestone(url), isConversation = (url = location) => isIssue(url) || distribution_isPRConversation(url), isMilestone = (url = location) => /^milestone\/\d+/.test(getRepo(url)?.path), isNewFile = (url = location) => Boolean(getRepo(url)?.path.startsWith("new")), isNewIssue = (url = location) => "issues/new" === getRepo(url)?.path, isNewRelease = (url = location) => "releases/new" === getRepo(url)?.path, isNotifications = (url = location) => "notifications" === getCleanPathname(url), isOrganizationProfile = () => exists('meta[name="hovercard-subject-tag"][content^="organization"]'), isOrganizationRepo = () => exists('.AppHeader-context-full [data-hovercard-type="organization"]'), isOwnUserProfile = () => getCleanPathname() === getUsername(), isProjects = (url = location) => "projects" === getRepo(url)?.path, isDiscussion = (url = location) => /^discussions\/\d+/.test(getRepo(url)?.path ?? getOrg(url)?.path), isPR = (url = location) => /^pull\/\d+/.test(getRepo(url)?.path) && !isPRConflicts(url), isPRConflicts = (url = location) => /^pull\/\d+\/conflicts/.test(getRepo(url)?.path), isPRList = (url = location) => "/pulls" === url.pathname || "pulls" === getRepo(url)?.path, isPRCommit = (url = location) => /^pull\/\d+\/commits\/[\da-f]{5,40}$/.test(getRepo(url)?.path), isPRCommit404 = () => isPRCommit() && document.title.startsWith("Commit range not found · Pull Request"), isPRFile404 = () => isPRFiles() && document.title.startsWith("Commit range not found · Pull Request"), distribution_isPRConversation = (url = location) => /^pull\/\d+$/.test(getRepo(url)?.path), isPRCommitList = (url = location) => /^pull\/\d+\/commits$/.test(getRepo(url)?.path), isPRFiles = (url = location) => /^pull\/\d+\/files/.test(getRepo(url)?.path) || isPRCommit(url), isOpenPR = () => exists("#partial-discussion-header :is(.octicon-git-pull-request, .octicon-git-pull-request-draft)"), isClosedPR = () => exists("#partial-discussion-header :is(.octicon-git-pull-request-closed, .octicon-git-merge)"), isReleases = (url = location) => "releases" === getRepo(url)?.path, isTags = (url = location) => "tags" === getRepo(url)?.path, isSingleReleaseOrTag = (url = location) => Boolean(getRepo(url)?.path.startsWith("releases/tag")), isReleasesOrTags = (url = location) => isReleases(url) || isTags(url), isDeletingFile = (url = location) => Boolean(getRepo(url)?.path.startsWith("delete")), isEditingFile = (url = location) => Boolean(getRepo(url)?.path.startsWith("edit")), isEditingRelease = (url = location) => Boolean(getRepo(url)?.path.startsWith("releases/edit")), isRepo = (url = location) => /^[^/]+\/[^/]+/.test(getCleanPathname(url)) && !reservedNames.includes(url.pathname.split("/", 2)[1]) && !isDashboard(url) && !isGist(url) && !isNewRepoTemplate(url), hasRepoHeader = (url = location) => isRepo(url) && !isRepoSearch(url), isEmptyRepoRoot = () => isRepoHome() && !exists('link[rel="canonical"]'), isEmptyRepo = () => exists('[aria-label="Cannot fork because repository is empty."]'), isPublicRepo = () => exists('meta[name="octolytics-dimension-repository_public"][content="true"]'), isArchivedRepo = () => Boolean(isRepo() && $("main > .flash-warn")?.textContent.includes("archived")), isBlank = () => exists("main .blankslate:not([hidden] .blankslate)"), isRepoTaxonomyIssueOrPRList = (url = location) => /^labels\/.+|^milestones\/\d+(?!\/edit)/.test(getRepo(url)?.path), isRepoIssueOrPRList = (url = location) => isRepoPRList(url) || isRepoIssueList(url) || isRepoTaxonomyIssueOrPRList(url), isRepoPRList = (url = location) => Boolean(getRepo(url)?.path.startsWith("pulls")), isRepoIssueList = (url = location) => /^labels\/|^issues(?!\/(\d+|new|templates)($|\/))/.test(getRepo(url)?.path), hasSearchParameter = url => "1" === new URLSearchParams(url.search).get("search"), isRepoHome = (url = location) => "" === getRepo(url)?.path && !hasSearchParameter(url), _isRepoRoot = url => {
      const repository = getRepo(url ?? location);
      if (!repository) return !1;
      if (!repository.path) return !0;
      if (url) return /^tree\/[^/]+$/.test(repository.path); else return repository.path.startsWith("tree/") && document.title.startsWith(repository.nameWithOwner) && !document.title.endsWith(repository.nameWithOwner);
    }, isRepoRoot = url => !hasSearchParameter(url ?? location) && _isRepoRoot(url), isRepoSearch = (url = location) => "search" === getRepo(url)?.path, isRepoTree = (url = location) => _isRepoRoot(url) || Boolean(getRepo(url)?.path.startsWith("tree/")), isRepoWiki = (url = location) => Boolean(getRepo(url)?.path.startsWith("wiki")), isSingleCommit = (url = location) => /^commit\/[\da-f]{5,40}$/.test(getRepo(url)?.path), isSingleFile = (url = location) => Boolean(getRepo(url)?.path.startsWith("blob/")), isRepoFile404 = (url = location) => (isSingleFile(url) || isRepoTree(url)) && document.title.startsWith("File not found"), isForkedRepo = () => exists('meta[name="octolytics-dimension-repository_is_fork"][content="true"]'), isSingleGist = (url = location) => /^[^/]+\/[\da-f]{20,32}(\/[\da-f]{40})?$/.test(getCleanGistPathname(url)), isBranches = (url = location) => Boolean(getRepo(url)?.path.startsWith("branches")), doesLookLikeAProfile = string => "string" == typeof string && string.length > 0 && !string.includes("/") && !string.includes(".") && !reservedNames.includes(string), isProfile = (url = location) => !isGist(url) && doesLookLikeAProfile(getCleanPathname(url)), isUserProfile = () => isProfile() && !isOrganizationProfile(), isUserProfileRepoTab = (url = location) => isProfile(url) && "repositories" === new URLSearchParams(url.search).get("tab"), isProfileRepoList = (url = location) => isUserProfileRepoTab(url) || "repositories" === getOrg(url)?.path, hasComments = (url = location) => isPR(url) || isIssue(url) || isCommit(url) || ((url = location) => Boolean(getOrg(url)?.path.startsWith("teams")))(url) || isSingleGist(url), hasRichTextEditor = (url = location) => hasComments(url) || isNewIssue(url) || isCompare(url) || ((url = location) => url.pathname.startsWith("/settings/replies"))(url) || ((url = location) => isEditingRelease(url) || isNewRelease(url))(url) || isDiscussion(url) || ((url = location) => "discussions/new" === getRepo(url)?.path || "discussions/new" === getOrg(url)?.path)(url), hasCode = (url = location) => hasComments(url) || isRepoTree(url) || isRepoSearch(url) || isGlobalSearchResults(url) || isSingleFile(url) || isGist(url) || isCompare(url) || ((url = location) => isRepoWiki(url) && getCleanPathname(url).split("/").slice(3, 5).includes("_compare"))(url) || isBlame(url), hasFiles = (url = location) => isCommit(url) || isCompare(url) || isPRFiles(url), isRepositoryActions = (url = location) => /^actions(\/workflows\/.+\.ya?ml)?$/.test(getRepo(url)?.path), canUserEditRepo = () => isRepo() && exists('.reponav-item[href$="/settings"], [data-tab-item$="settings-tab"]'), isNewRepoTemplate = (url = location) => Boolean("generate" === url.pathname.split("/")[3]), getUsername = () => $('meta[name="user-login"]')?.getAttribute("content"), getCleanPathname = (url = location) => url.pathname.replaceAll(/\/+/g, "/").slice(1, url.pathname.endsWith("/") ? -1 : void 0), getCleanGistPathname = (url = location) => {
      const pathname = getCleanPathname(url);
      if (url.hostname.startsWith("gist.")) return pathname;
      const [gist, ...parts] = pathname.split("/");
      return "gist" === gist ? parts.join("/") : void 0;
    }, getOrg = (url = location) => {
      const [, orgs, name, ...path] = url.pathname.split("/");
      if ("orgs" === orgs && name) return {
        name,
        path: path.join("/")
      };
    }, getRepo = url => {
      if (!url) {
        const canonical = $('[property="og:url"]');
        if (canonical) {
          const canonicalUrl = new URL(canonical.content, location.origin);
          if (getCleanPathname(canonicalUrl).toLowerCase() === getCleanPathname(location).toLowerCase()) url = canonicalUrl;
        }
      }
      if ("string" == typeof url) url = new URL(url, location.origin);
      if (!isRepo(url)) return;
      const [owner, name, ...path] = getCleanPathname(url).split("/");
      return {
        owner,
        name,
        nameWithOwner: owner + "/" + name,
        path: path.join("/")
      };
    }, utils = {
      getOrg,
      getUsername,
      getCleanPathname,
      getCleanGistPathname,
      getRepositoryInfo: getRepo
    }, svgTags = new Set([ "a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "animation", "audio", "canvas", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "handler", "hkern", "iframe", "image", "line", "linearGradient", "listener", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "prefetch", "radialGradient", "rect", "script", "set", "solidColor", "stop", "style", "svg", "switch", "symbol", "tbreak", "text", "textArea", "textPath", "title", "tref", "tspan", "unknown", "use", "video", "view", "vkern" ]);
    svgTags.delete("a");
    svgTags.delete("audio");
    svgTags.delete("canvas");
    svgTags.delete("iframe");
    svgTags.delete("script");
    svgTags.delete("video");
    const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, setCSSProps = (element, style) => {
      for (const [name, value] of Object.entries(style)) if (name.startsWith("-")) element.style.setProperty(name, value); else if ("number" == typeof value && !IS_NON_DIMENSIONAL.test(name)) element.style[name] = `${value}px`; else element.style[name] = value;
    }, create = type => {
      if ("string" == typeof type) if (svgTags.has(type)) return document.createElementNS("http://www.w3.org/2000/svg", type); else return document.createElement(type);
      if ((type => type === DocumentFragment)(type)) return document.createDocumentFragment(); else return type(type.defaultProps);
    }, setAttribute = (element, name, value) => {
      if (null != value) if (/^xlink[AHRST]/.test(name)) element.setAttributeNS("http://www.w3.org/1999/xlink", name.replace("xlink", "xlink:").toLowerCase(), value); else element.setAttribute(name, value);
    }, addChildren = (parent, children) => {
      for (const child of children) if (child instanceof Node) parent.appendChild(child); else if (Array.isArray(child)) addChildren(parent, child); else if ("boolean" != typeof child && null != child) parent.appendChild(document.createTextNode(child));
    }, booleanishAttributes = new Set([ "contentEditable", "draggable", "spellCheck", "value", "autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha" ]), h = (type, attributes, ...children) => {
      var _a;
      const element = create(type);
      addChildren(element, children);
      if (element instanceof DocumentFragment || !attributes) return element;
      for (let [name, value] of Object.entries(attributes)) {
        if ("htmlFor" === name) name = "for";
        if ("class" === name || "className" === name) {
          const existingClassname = null !== (_a = element.getAttribute("class")) && void 0 !== _a ? _a : "";
          setAttribute(element, "class", (existingClassname + " " + String(value)).trim());
        } else if ("style" === name) setCSSProps(element, value); else if (name.startsWith("on")) {
          const eventName = name.slice(2).toLowerCase().replace(/^-/, "");
          element.addEventListener(eventName, value);
        } else if ("dangerouslySetInnerHTML" === name && "__html" in value) element.innerHTML = value.__html; else if ("key" !== name && (booleanishAttributes.has(name) || !1 !== value)) setAttribute(element, name, !0 === value ? "" : value);
      }
      return element;
    }, Fragment = "function" == typeof DocumentFragment ? DocumentFragment : () => {}, createElement = h, dom_chef = {
      createElement: h,
      Fragment
    };
    function select_dom_$(selectors, baseElement) {
      if (2 !== arguments.length || baseElement) return (baseElement ?? document).querySelector(String(selectors)) ?? void 0;
    }
    class ElementNotFoundError extends Error {
      name="ElementNotFoundError";
    }
    function expectElement(selectors, baseElement) {
      if (2 === arguments.length && !baseElement) throw new ElementNotFoundError("Expected element not found because the base is specified but null");
      const element = (baseElement ?? document).querySelector(String(selectors));
      if (element) return element;
      throw new ElementNotFoundError(`Expected element not found: ${String(selectors)}`);
    }
    function lastElement(selectors, baseElement) {
      if (2 === arguments.length && !baseElement) return;
      const all = (baseElement ?? document).querySelectorAll(String(selectors));
      return all[all.length - 1];
    }
    function elementExists(selectors, baseElement) {
      if (2 === arguments.length && !baseElement) return !1; else return Boolean((baseElement ?? document).querySelector(String(selectors)));
    }
    function $$(selectors, baseElements) {
      if (2 === arguments.length && !baseElements) return [];
      if (!baseElements || "function" == typeof baseElements.querySelectorAll) {
        const elements = (baseElements ?? document).querySelectorAll(String(selectors));
        return Array.prototype.slice.call(elements);
      }
      const elements = new Set;
      for (const baseElement of baseElements) for (const element of baseElement.querySelectorAll(String(selectors))) elements.add(element);
      return [ ...elements ];
    }
    const hasLoaded = () => "interactive" === document.readyState || "complete" === document.readyState, domLoaded = new Promise((resolve => {
      if (hasLoaded()) resolve(); else document.addEventListener("DOMContentLoaded", (() => {
        resolve();
      }), {
        capture: !0,
        once: !0,
        passive: !0
      });
    })), dom_loaded = domLoaded;
    Object.defineProperty(domLoaded, "hasLoaded", {
      get: () => hasLoaded()
    });
    var min_indent = __webpack_require__(400);
    const createAbortError = () => {
      const error = new Error("Delay aborted");
      error.name = "AbortError";
      return error;
    }, clearMethods = new WeakMap;
    const delay = function({clearTimeout: defaultClear, setTimeout: defaultSet} = {}) {
      return (milliseconds, {value, signal} = {}) => {
        if (signal?.aborted) return Promise.reject(createAbortError());
        let timeoutId, settle, rejectFunction;
        const clear = defaultClear ?? clearTimeout, signalListener = () => {
          clear(timeoutId);
          rejectFunction(createAbortError());
        }, delayPromise = new Promise(((resolve, reject) => {
          settle = () => {
            (() => {
              if (signal) signal.removeEventListener("abort", signalListener);
            })();
            resolve(value);
          };
          rejectFunction = reject;
          timeoutId = (defaultSet ?? setTimeout)(settle, milliseconds);
        }));
        if (signal) signal.addEventListener("abort", signalListener, {
          once: !0
        });
        clearMethods.set(delayPromise, (() => {
          clear(timeoutId);
          timeoutId = null;
          settle();
        }));
        return delayPromise;
      };
    }(), node_modules_delay = delay;
    function callHandle(handle) {
      if ("disconnect" in handle) handle.disconnect(); else if ("abort" in handle) handle.abort(); else if ("function" == typeof handle) handle();
    }
    function onAbort(abort, ...callbacks) {
      (abort instanceof AbortController ? abort.signal : abort).addEventListener("abort", (() => {
        for (const callback of callbacks) callHandle(callback);
      }));
    }
    class ArrayMap extends Map {
      append(key, ...values) {
        if (!this.has(key)) this.set(key, []);
        this.get(key).push(...values);
      }
    }
    const chromeP = globalThis.chrome && new function NestedProxy(target) {
      return new Proxy(target, {
        get(target, prop) {
          if (target[prop]) if ("function" != typeof target[prop]) return new NestedProxy(target[prop]); else return (...arguments_) => new Promise(((resolve, reject) => {
            target[prop](...arguments_, (result => {
              if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message)); else resolve(result);
            }));
          }));
        }
      });
    }(globalThis.chrome), webext_polyfill_kinda = chromeP;
    let cache = !0;
    function isCurrentPathname(path) {
      if (!path) return !1;
      try {
        const {pathname} = new URL(path, location.origin);
        return pathname === location.pathname;
      } catch {
        return !1;
      }
    }
    function getManifest(_version) {
      return globalThis.chrome?.runtime?.getManifest?.();
    }
    function once(function_) {
      let result;
      return () => {
        if (!cache || void 0 === result) result = function_();
        return result;
      };
    }
    const isWebPage = once((() => [ "about:", "http:", "https:" ].includes(location.protocol))), isExtensionContext = once((() => "object" == typeof globalThis.chrome?.extension)), isBackgroundPage = (once((() => isExtensionContext() && isWebPage())), 
    once((() => {
      const manifest = getManifest();
      if (manifest && isCurrentPathname(manifest.background_page ?? manifest.background?.page)) return !0; else return Boolean(manifest?.background?.scripts && isCurrentPathname("/_generated_background_page.html"));
    })));
    once((() => isCurrentPathname(getManifest()?.background?.service_worker))), once((() => {
      const path = getManifest()?.options_ui?.page;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), once((() => {
      const path = getManifest()?.side_panel?.default_path;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), once((() => {
      const devtoolsPage = isExtensionContext() && chrome.devtools && getManifest()?.devtools_page;
      if ("string" != typeof devtoolsPage) return !1;
      return new URL(devtoolsPage, location.origin).pathname === location.pathname;
    }));
    const converters = {
      days: value => 864e5 * value,
      hours: value => 36e5 * value,
      minutes: value => 6e4 * value,
      seconds: value => 1e3 * value,
      milliseconds: value => value,
      microseconds: value => value / 1e3,
      nanoseconds: value => value / 1e6
    };
    function toMilliseconds(timeDescriptor) {
      let totalMilliseconds = 0;
      for (const [key, value] of Object.entries(timeDescriptor)) {
        if ("number" != typeof value) throw new TypeError(`Expected a \`number\` for key \`${key}\`, got \`${value}\` (${typeof value})`);
        const converter = converters[key];
        if (!converter) throw new Error(`Unsupported time key: ${key}`);
        totalMilliseconds += converter(value);
      }
      return totalMilliseconds;
    }
    const cacheDefault = {
      days: 30
    };
    function timeInTheFuture(time) {
      return Date.now() + toMilliseconds(time);
    }
    async function _get(key, remove) {
      const internalKey = `cache:${key}`, cachedItem = (await webext_polyfill_kinda.storage.local.get(internalKey))[internalKey];
      if (void 0 !== cachedItem) if (!(Date.now() > cachedItem.maxAge)) return cachedItem; else if (remove) await webext_polyfill_kinda.storage.local.remove(internalKey);
    }
    async function delete_(userKey) {
      const internalKey = `cache:${userKey}`;
      return webext_polyfill_kinda.storage.local.remove(internalKey);
    }
    async function deleteWithLogic(logic) {
      const wholeCache = await webext_polyfill_kinda.storage.local.get(), removableItems = [];
      for (const [key, value] of Object.entries(wholeCache)) if (key.startsWith("cache:") && (logic?.(value) ?? 1)) removableItems.push(key);
      if (removableItems.length > 0) await webext_polyfill_kinda.storage.local.remove(removableItems);
    }
    async function deleteExpired() {
      await deleteWithLogic((cachedItem => Date.now() > cachedItem.maxAge));
    }
    const legacy_cache = {
      has: async function(key) {
        return void 0 !== await _get(key, !1);
      },
      get: async function(key) {
        const cachedValue = await _get(key, !0);
        return cachedValue?.data;
      },
      set: async function(key, value, maxAge = cacheDefault) {
        if (arguments.length < 2) throw new TypeError("Expected a value as the second argument");
        if (void 0 === value) await delete_(key); else {
          const internalKey = `cache:${key}`;
          await webext_polyfill_kinda.storage.local.set({
            [internalKey]: {
              data: value,
              maxAge: timeInTheFuture(maxAge)
            }
          });
        }
        return value;
      },
      clear: async function() {
        await deleteWithLogic();
      },
      delete: delete_
    };
    !function() {
      if (isExtensionContext()) globalThis.webextStorageCache = legacy_cache;
      if (isBackgroundPage()) if (chrome.alarms) {
        chrome.alarms.create("webext-storage-cache", {
          delayInMinutes: 1,
          periodInMinutes: 1440
        });
        let lastRun = 0;
        chrome.alarms.onAlarm.addListener((alarm => {
          if ("webext-storage-cache" === alarm.name && lastRun < Date.now() - 1e3) {
            lastRun = Date.now();
            deleteExpired();
          }
        }));
      } else {
        setTimeout(deleteExpired, 6e4);
        setInterval(deleteExpired, 864e5);
      }
    }();
    const legacy = legacy_cache;
    function getUserKey(name, cacheKey, args) {
      if (!cacheKey) {
        if (0 === args.length) return name;
        cacheKey = JSON.stringify;
      }
      return `${name}:${cacheKey(args)}`;
    }
    class CachedFunction {
      name;
      options;
      maxAge;
      staleWhileRevalidate;
      get=async (...args) => {
        const getSet = async (userKey, args) => {
          const freshValue = await this.#updater(...args);
          if (void 0 === freshValue) {
            await legacy.delete(userKey);
            return;
          }
          const milliseconds = toMilliseconds(this.maxAge) + toMilliseconds(this.staleWhileRevalidate);
          return legacy.set(userKey, freshValue, {
            milliseconds
          });
        }, userKey = getUserKey(this.name, this.#cacheKey, args), cached = this.#inFlightCache.get(userKey);
        if (cached) return cached;
        const promise = (async (userKey, ...args) => {
          const cachedItem = await _get(userKey, !1);
          if (void 0 === cachedItem || this.#shouldRevalidate?.(cachedItem.data)) return getSet(userKey, args);
          if (timeInTheFuture(this.staleWhileRevalidate) > cachedItem.maxAge) setTimeout(getSet, 0, userKey, args);
          return cachedItem.data;
        })(userKey, ...args);
        this.#inFlightCache.set(userKey, promise);
        const del = () => {
          this.#inFlightCache.delete(userKey);
        };
        promise.then(del, del);
        return promise;
      };
      #updater;
      #cacheKey;
      #shouldRevalidate;
      #inFlightCache=new Map;
      constructor(name, options) {
        this.name = name;
        this.options = options;
        this.#cacheKey = options.cacheKey;
        this.#updater = options.updater;
        this.#shouldRevalidate = options.shouldRevalidate;
        this.maxAge = options.maxAge ?? {
          days: 30
        };
        this.staleWhileRevalidate = options.staleWhileRevalidate ?? {
          days: 0
        };
      }
      async getCached(...args) {
        const userKey = getUserKey(this.name, this.#cacheKey, args);
        return legacy.get(userKey);
      }
      async applyOverride(args, value) {
        if (0 === arguments.length) throw new TypeError("Expected a value to be stored");
        const userKey = getUserKey(this.name, this.#cacheKey, args);
        return legacy.set(userKey, value, this.maxAge);
      }
      async getFresh(...args) {
        if (void 0 === this.#updater) throw new TypeError("Cannot get fresh value without updater");
        const userKey = getUserKey(this.name, this.#cacheKey, args);
        return legacy.set(userKey, await this.#updater(...args));
      }
      async delete(...args) {
        const userKey = getUserKey(this.name, this.#cacheKey, args);
        return legacy.delete(userKey);
      }
      async isCached(...args) {
        return void 0 !== await this.get(...args);
      }
    }
    const globalCache = {
      clear: legacy.clear
    }, nullKey = Symbol("null");
    let keyCounter = 0;
    class ManyKeysMap extends Map {
      constructor() {
        super();
        this._objectHashes = new WeakMap;
        this._symbolHashes = new Map;
        this._publicKeys = new Map;
        const [pairs] = arguments;
        if (null != pairs) {
          if ("function" != typeof pairs[Symbol.iterator]) throw new TypeError(typeof pairs + " is not iterable (cannot read property Symbol(Symbol.iterator))");
          for (const [keys, value] of pairs) this.set(keys, value);
        }
      }
      _getPublicKeys(keys, create = !1) {
        if (!Array.isArray(keys)) throw new TypeError("The keys parameter must be an array");
        const privateKey = this._getPrivateKey(keys, create);
        let publicKey;
        if (privateKey && this._publicKeys.has(privateKey)) publicKey = this._publicKeys.get(privateKey); else if (create) {
          publicKey = [ ...keys ];
          this._publicKeys.set(privateKey, publicKey);
        }
        return {
          privateKey,
          publicKey
        };
      }
      _getPrivateKey(keys, create = !1) {
        const privateKeys = [];
        for (let key of keys) {
          if (null === key) key = nullKey;
          const hashes = "object" == typeof key || "function" == typeof key ? "_objectHashes" : "symbol" == typeof key ? "_symbolHashes" : !1;
          if (!hashes) privateKeys.push(key); else if (this[hashes].has(key)) privateKeys.push(this[hashes].get(key)); else if (create) {
            const privateKey = `@@mkm-ref-${keyCounter++}@@`;
            this[hashes].set(key, privateKey);
            privateKeys.push(privateKey);
          } else return !1;
        }
        return JSON.stringify(privateKeys);
      }
      set(keys, value) {
        const {publicKey} = this._getPublicKeys(keys, !0);
        return super.set(publicKey, value);
      }
      get(keys) {
        const {publicKey} = this._getPublicKeys(keys);
        return super.get(publicKey);
      }
      has(keys) {
        const {publicKey} = this._getPublicKeys(keys);
        return super.has(publicKey);
      }
      delete(keys) {
        const {publicKey, privateKey} = this._getPublicKeys(keys);
        return Boolean(publicKey && super.delete(publicKey) && this._publicKeys.delete(privateKey));
      }
      clear() {
        super.clear();
        this._symbolHashes.clear();
        this._publicKeys.clear();
      }
      get [Symbol.toStringTag]() {
        return "ManyKeysMap";
      }
      get size() {
        return super.size;
      }
    }
    Symbol.iterator;
    const element_ready_cache = new ManyKeysMap, isDomReady = target => [ "interactive", "complete" ].includes((target.ownerDocument ?? target).readyState);
    function elementReady(selector, {target = document, stopOnDomReady = !0, waitForChildren = !0, timeout = Number.POSITIVE_INFINITY, predicate} = {}) {
      const cacheKeys = [ selector, stopOnDomReady, timeout, waitForChildren, target ], cachedPromise = element_ready_cache.get(cacheKeys);
      if (cachedPromise) return cachedPromise;
      let rafId;
      const deferred = function() {
        const deferred = {};
        deferred.promise = new Promise(((resolve, reject) => {
          deferred.resolve = resolve;
          deferred.reject = reject;
        }));
        return deferred;
      }(), {promise} = deferred;
      element_ready_cache.set(cacheKeys, promise);
      const stop = element => {
        cancelAnimationFrame(rafId);
        element_ready_cache.delete(cacheKeys, promise);
        deferred.resolve(element);
      };
      if (timeout !== Number.POSITIVE_INFINITY) setTimeout(stop, timeout);
      !function check() {
        const element = function({target, selector, predicate} = {}) {
          if (predicate) {
            return [ ...target.querySelectorAll(selector) ].find((element => predicate(element)));
          }
          return target.querySelector(selector);
        }({
          target,
          selector,
          predicate
        });
        if (isDomReady(target) && (stopOnDomReady || element)) {
          stop(element ?? void 0);
          return;
        }
        let current = element;
        for (;current; ) {
          if (!waitForChildren || current.nextSibling) {
            stop(element);
            return;
          }
          current = current.parentElement;
        }
        rafId = requestAnimationFrame(check);
      }();
      return Object.assign(promise, {
        stop: () => stop()
      });
    }
    function pluralize(count, single, plural = function(single) {
      return single + "s";
    }(single), zero) {
      if (0 === count && zero) return zero.replace("$$", "0");
      if (1 === count) return single.replace("$$", "1"); else return plural.replace("$$", String(count));
    }
    function featureLink(id) {
      return `https://github.com/refined-github/refined-github/blob/main/source/features/${id}.tsx`;
    }
    const importedFeatures = [ "action-pr-link", "action-used-by-link", "actionable-pr-view-file", "align-issue-labels", "archive-forks-link", "avoid-accidental-submissions", "batch-mark-files-as-viewed", "bugs-tab", "ci-link", "clean-conversation-filters", "clean-conversation-headers", "clean-conversation-sidebar", "clean-pinned-issues", "clean-readme-url", "clean-repo-filelist-actions", "clean-repo-sidebar", "clean-repo-tabs", "clean-rich-text-editor", "clear-pr-merge-commit-message", "click-outside-modal", "close-as-unplanned", "close-out-of-view-modals", "closing-remarks", "collapsible-content-button", "command-palette-navigation-shortcuts", "comment-fields-keyboard-shortcuts", "comment-on-draft-pr-indicator", "comments-time-machine-links", "conflict-marker", "conversation-activity-filter", "conversation-links-on-repo-lists", "convert-pr-to-draft-improvements", "convert-release-to-draft", "copy-on-y", "create-release-shortcut", "cross-deleted-pr-branches", "deep-reblame", "default-branch-button", "dim-bots", "download-folder-button", "easy-toggle-commit-messages", "easy-toggle-files", "embed-gist-inline", "embed-gist-via-iframe", "emphasize-draft-pr-label", "esc-to-cancel", "esc-to-deselect-line", "expand-all-hidden-comments", "extend-conversation-status-filters", "extend-diff-expander", "file-age-color", "fit-textareas", "fix-no-pr-search", "github-actions-indicators", "global-conversation-list-filters", "hidden-review-comments-indicator", "hide-diff-signs", "hide-inactive-deployments", "hide-issue-list-autocomplete", "hide-low-quality-comments", "hide-navigation-hover-highlight", "hide-newsfeed-noise", "hide-user-forks", "highest-rated-comment", "highlight-collaborators-and-own-conversations", "highlight-non-default-base-branch", "html-preview-link", "improve-shortcut-help", "infinite-scroll", "jump-to-change-requested-comment", "jump-to-conversation-close-event", "keyboard-navigation", "last-notification-page-button", "link-to-changelog-file", "link-to-compare-diff", "link-to-github-io", "linkify-branch-references", "linkify-code", "linkify-commit-sha", "linkify-labels-on-dashboard", "linkify-notification-repository-header", "linkify-symbolic-links", "linkify-user-edit-history-popup", "linkify-user-labels", "linkify-user-location", "list-prs-for-branch", "list-prs-for-file", "locked-issue", "mark-merge-commits-in-list", "mark-private-orgs", "mobile-tabs", "more-conversation-filters", "more-dropdown-links", "more-file-links", "netiquette", "new-or-deleted-file", "new-repo-disable-projects-and-wikis", "no-duplicate-list-update-time", "no-unnecessary-split-diff-view", "one-click-diff-options", "one-click-pr-or-gist", "one-click-review-submission", "one-key-formatting", "open-all-conversations", "open-all-notifications", "open-issue-to-latest-comment", "pagination-hotkey", "parse-backticks", "patch-diff-links", "pinned-issues-update-time", "pr-base-commit", "pr-branch-auto-delete", "pr-commit-lines-changed", "pr-filters", "pr-first-commit-title", "pr-jump-to-first-non-viewed-file", "pr-notification-link", "prevent-comment-loss", "prevent-duplicate-pr-submission", "prevent-link-loss", "prevent-pr-merge-panel-opening", "preview-hidden-comments", "previous-next-commit-buttons", "previous-version", "profile-gists-link", "profile-hotkey", "pull-request-hotkeys", "quick-comment-edit", "quick-comment-hiding", "quick-file-edit", "quick-label-removal", "quick-mention", "quick-new-issue", "quick-repo-deletion", "quick-review", "quick-review-comment-deletion", "reactions-avatars", "release-download-count", "releases-dropdown", "releases-tab", "reload-failed-proxied-images", "repo-age", "repo-avatars", "repo-header-info", "repo-wide-file-finder", "resolve-conflicts", "restore-file", "rgh-dim-commits", "rgh-feature-descriptions", "rgh-improve-new-issue-form", "rgh-linkify-features", "rgh-linkify-yolo-issues", "rgh-netiquette", "rgh-pr-template", "rgh-welcome-issue", "same-branch-author-commits", "scrollable-areas", "select-all-notifications-shortcut", "select-notifications", "selection-in-new-tab", "shorten-links", "show-associated-branch-prs-on-fork", "show-names", "show-open-prs-of-forks", "show-user-top-repositories", "show-whitespace", "small-user-avatars", "sort-conversations-by-update-time", "status-subscription", "sticky-sidebar", "stop-redirecting-in-notification-bar", "submission-via-ctrl-enter-everywhere", "suggest-commit-title-limit", "swap-branches-on-compare", "sync-pr-commit-title", "tab-to-indent", "table-input", "tag-changes-link", "tags-on-commits-list", "toggle-everything-with-alt", "toggle-files-button", "unfinished-comments", "unreleased-commits", "unwrap-unnecessary-dropdowns", "update-pr-from-base-branch", "useful-not-found-page", "user-local-time", "user-profile-follower-badge", "vertical-front-matter", "view-last-pr-deployment", "visit-tag", "warn-pr-from-master", "warning-for-disallow-edits" ], featuresMeta = [ {
      id: "action-pr-link",
      description: "Adds a link back to the PR that ran the workflow.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/50487467/241645264-076a0137-36a2-4fd0-a66e-735ef3b3a563.png"
    }, {
      id: "action-used-by-link",
      description: "Lets you see how others are using the current Action in the Marketplace.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/258552390-7d2cd013-c167-4fe5-9731-33622b8607e9.png"
    }, {
      id: "actionable-pr-view-file",
      description: 'Points the "View file" on PRs to the branch instead of the commit, so the Edit/Delete buttons will be enabled on the "View file" page.',
      screenshot: "https://user-images.githubusercontent.com/1402241/69044026-c5b17d80-0a26-11ea-86ae-c95f89d3669a.png"
    }, {
      id: "align-issue-labels",
      description: "In conversation lists, aligns the labels to the left, below each title.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/261160640-28ae4f12-0e95-4db5-a79c-e89ae523a4d0.png"
    }, {
      id: "archive-forks-link",
      description: "Helps you find forks on archived repos.",
      screenshot: "https://user-images.githubusercontent.com/1402241/230362566-12493c80-bffe-4c7a-b9ba-4a11b1358ab0.png"
    }, {
      id: "avoid-accidental-submissions",
      description: "Disables the <kbd>enter</kbd>-to-submit shortcut in some commit/PR/issue title fields to avoid accidental submissions. Use <kbd>ctrl</kbd> <kbd>enter</kbd> instead.",
      screenshot: "https://user-images.githubusercontent.com/723651/125863341-6cf0bce0-f120-4cec-ac1f-1ce35920e7a7.gif"
    }, {
      id: "batch-mark-files-as-viewed",
      description: "Mark/unmark multiple files as “Viewed” in the PR Files tab. Click on the first checkbox you want to mark/unmark and then <code>shift</code>-click another one; all the files between the two checkboxes will be marked/unmarked as “Viewed”.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257009611-17249bee-d2e2-42ac-bdf0-ebc90029544e.gif"
    }, {
      id: "bugs-tab",
      description: 'Adds a "Bugs" tab to repos, if there are any open issues with the "bug" label.',
      screenshot: "https://user-images.githubusercontent.com/46634000/156766081-f2ea100b-a9f3-472b-bddc-a984a88ddcd3.png"
    }, {
      id: "ci-link",
      description: "Adds a build/CI status icon next to the repo’s name.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/237923995-5e14a272-0bf2-4fe4-b409-8c05378aa4fd.png"
    }, {
      id: "clean-conversation-filters",
      description: "Hides <code>Projects</code> and <code>Milestones</code> filters in conversation lists if they are empty.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/262557246-4ef1c702-eece-4701-9000-0aad21c54c1b.png"
    }, {
      id: "clean-conversation-headers",
      description: 'Removes duplicate information in the header of issues and PRs ("User wants to merge X commits from Y into Z")',
      screenshot: "https://user-images.githubusercontent.com/44045911/112314137-a34b0680-8ce3-11eb-9e0e-8afd6c8235c2.png"
    }, {
      id: "clean-conversation-sidebar",
      description: 'Hides empty sections (or just their "empty" label) in the conversation sidebar.',
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253054419-48c38c01-b1dc-42ca-9ff6-fd63392b5921.png"
    }, {
      id: "clean-pinned-issues",
      description: "Changes the layout of pinned issues from side-by-side to a standard list.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/258224321-e8ee8c70-6952-4a42-8626-6b5f31d167a3.png"
    }, {
      id: "clean-readme-url",
      description: 'Drops redundant "readme-ov-file" parameter from repo URLs.',
      screenshot: "https://github.com/refined-github/refined-github/assets/1402241/73e96411-3314-4501-a9b6-d006af6fcc47"
    }, {
      id: "clean-repo-filelist-actions",
      description: "Makes some buttons on repository lists more compact to make room for other features.",
      screenshot: "https://user-images.githubusercontent.com/1402241/108955170-52d48080-7633-11eb-8979-67e0d3a53f16.png"
    }, {
      id: "clean-repo-sidebar",
      description: "Removes unnecessary or redundant information from the repository sidebar.",
      screenshot: "https://user-images.githubusercontent.com/46634000/107955448-18694480-6f9e-11eb-8bc6-80cc90d910bc.png"
    }, {
      id: "clean-repo-tabs",
      description: 'Moves the "Security" and "Insights"  to the repository navigation dropdown. Also moves the "Projects", "Actions" and "Wiki" tabs if they\'re empty/unused.',
      screenshot: "https://user-images.githubusercontent.com/16872793/124681343-4a6c3c00-de96-11eb-9055-a8fc551e6eb8.png"
    }, {
      id: "clean-rich-text-editor",
      description: "Hides unnecessary comment field tooltips and toolbar items (each one has a keyboard shortcut.)",
      screenshot: "https://user-images.githubusercontent.com/46634000/158201651-7364aba7-f9d0-4a51-89c4-2ced0cc34e48.png"
    }, {
      id: "clear-pr-merge-commit-message",
      description: "Clears the PR merge commit message of clutter, leaving only deduplicated co-authors.",
      screenshot: "https://user-images.githubusercontent.com/1402241/79257078-62b6fc00-7e89-11ea-8798-c06f33baa94b.png"
    }, {
      id: "click-outside-modal",
      description: "Closes checks list when clicking outside of modal."
    }, {
      id: "close-as-unplanned",
      description: 'Lets you "close issue as unplanned" in one click instead of three.',
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/279745773-709cde60-c26a-4a0e-89e1-56444d25ebdf.png"
    }, {
      id: "close-out-of-view-modals",
      description: "Automatically closes dropdown menus when they’re no longer visible.",
      screenshot: "https://user-images.githubusercontent.com/1402241/37022353-531c676e-2155-11e8-96cc-80d934bb22e0.gif"
    }, {
      id: "closing-remarks",
      description: "Shows the first Git tag a merged PR was included in or suggests creating a release if not yet released.",
      screenshot: "https://user-images.githubusercontent.com/1402241/169497171-85d4a97f-413a-41b4-84ba-885dca2b51cf.png"
    }, {
      id: "collapsible-content-button",
      description: "Adds a button to insert collapsible content (via <code>&lt;details&gt;</code>).",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/260875648-bd495d27-4cd1-4190-bcc5-b8b476f07d39.png"
    }, {
      id: "command-palette-navigation-shortcuts",
      description: "Adds keyboard shortcuts to select items in command palette using <kbd>ctrl</kbd> <kbd>n</kbd> and <kbd>ctrl</kbd> <kbd>p</kbd> (macOS only)."
    }, {
      id: "comment-fields-keyboard-shortcuts",
      description: "Adds a shortcut to edit your last comment: <kbd>↑</kbd>. (Only works in the following comment field, if it’s empty.)"
    }, {
      id: "comment-on-draft-pr-indicator",
      description: "Reminds you you’re commenting on a draft PR by changing the submit button’s label.",
      screenshot: "https://user-images.githubusercontent.com/34235681/152473140-22b6eb86-3ef4-4104-af10-4a659d878f91.png"
    }, {
      id: "comments-time-machine-links",
      description: "Adds links to browse the repository and linked files at the time of each comment.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252749373-9313f1d9-3d92-44a2-a1d1-2b49a29e6a5c.png"
    }, {
      id: "conflict-marker",
      description: "Shows which PRs have conflicts in PR lists.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253128438-d67c8f49-44f1-4e15-9363-a717109fef39.png"
    }, {
      id: "conversation-activity-filter",
      description: "Lets you hide every event except comments or unresolved comments in issues and PRs.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252116522-053bce84-5c55-477b-8cc2-42a48104fb02.png"
    }, {
      id: "conversation-links-on-repo-lists",
      description: "Adds a link to the issues and pulls on the user profile repository tab and global search.",
      screenshot: "https://user-images.githubusercontent.com/16872793/78712349-82c54900-78e6-11ea-8328-3c2d39a78862.png"
    }, {
      id: "convert-pr-to-draft-improvements",
      description: 'Moves the "Convert PR to Draft" button to the mergeability box and adds visual feedback to its confirm button.',
      screenshot: "https://user-images.githubusercontent.com/1402241/95644892-885f3f80-0a7f-11eb-8428-8e0fb0c8dfa5.gif"
    }, {
      id: "convert-release-to-draft",
      description: "Adds a button to convert a release to draft.",
      screenshot: "https://user-images.githubusercontent.com/46634000/139236979-44533bfd-5c17-457d-bdc1-f9ec395f6a3a.png"
    }, {
      id: "copy-on-y",
      description: "Enhances the <kbd>y</kbd> hotkey to also copy the permalink."
    }, {
      id: "create-release-shortcut",
      description: "Adds a keyboard shortcut to create a new release while on the Releases page: <kbd>c</kbd>."
    }, {
      id: "cross-deleted-pr-branches",
      description: "Adds a line-through to the deleted branches in PRs.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/256963526-646ac7d0-3e7f-40c6-ba39-014b49bc0063.png"
    }, {
      id: "deep-reblame",
      description: "When exploring blames, <code>Alt</code>-clicking the “Reblame” buttons will extract the associated PR’s commits first, instead of treating the commit as a single change.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257035884-732ee7ff-22c5-4049-af7d-f11117d2bbe4.png"
    }, {
      id: "default-branch-button",
      description: "Adds a link to the default branch on directory listings and files.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252176294-9130783c-51aa-4df9-9c35-9b87c179199a.png"
    }, {
      id: "dim-bots",
      description: "Dims commits and PRs by bots to reduce noise.",
      screenshot: "https://user-images.githubusercontent.com/1402241/220607557-f8ea0863-f05b-48c8-a447-1fec42af0afd.gif"
    }, {
      id: "download-folder-button",
      description: "Adds a button to download entire folders, via https://download-directory.github.io.",
      screenshot: "https://user-images.githubusercontent.com/46634000/158347358-49234bb8-b9e6-41be-92ed-c0c0233cbad2.png"
    }, {
      id: "easy-toggle-commit-messages",
      description: "Enables toggling commit messages by clicking on the commit box.",
      screenshot: "https://user-images.githubusercontent.com/1402241/152121837-ca13bf8a-9b7f-4517-8e8d-b58bb135523b.gif"
    }, {
      id: "easy-toggle-files",
      description: "Enables toggling file diffs by clicking on their header bar.",
      screenshot: "https://user-images.githubusercontent.com/47531779/99855419-be173e00-2b7e-11eb-9a55-0f6251aeb0ef.gif"
    }, {
      id: "embed-gist-inline",
      description: "Embeds short gists when linked in comments on their own lines.",
      screenshot: "https://user-images.githubusercontent.com/1402241/152117903-80d784d5-4f43-4786-bc4c-d4993aec5c79.png"
    }, {
      id: "embed-gist-via-iframe",
      description: "Adds a menu item to embed a gist via <code>&lt;iframe&gt;</code>.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/258553891-a55a3bc0-f244-421b-a24c-6f1d4a92552e.png"
    }, {
      id: "emphasize-draft-pr-label",
      description: "Makes it easier to distinguish draft PR in lists.",
      screenshot: "https://user-images.githubusercontent.com/1402241/218252438-062a1ab3-4437-436d-9140-87bee23aaefb.png"
    }, {
      id: "esc-to-cancel",
      description: "Adds a shortcut to cancel editing a conversation title: <kbd>esc</kbd>.",
      screenshot: "https://user-images.githubusercontent.com/35100156/98303086-d81d2200-1fbd-11eb-8529-70d48d889bcf.gif"
    }, {
      id: "esc-to-deselect-line",
      description: "Adds a keyboard shortcut to deselect the current line: <kbd>esc</kbd>."
    }, {
      id: "expand-all-hidden-comments",
      description: 'On long conversations where GitHub hides comments under a "N hidden items. Load more...", alt-clicking it will load up to 200 comments at once instead of 60.',
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/261160123-9c4f894b-38c0-446f-af50-9beca7ff1f74.png"
    }, {
      id: "extend-conversation-status-filters",
      description: "Lets you toggle between is:open/is:closed/is:merged filters in searches.",
      screenshot: "https://user-images.githubusercontent.com/1402241/73605061-2125ed00-45cc-11ea-8cbd-41a53ae00cd3.gif"
    }, {
      id: "extend-diff-expander",
      description: "Widens the <code>Expand diff</code> button to be clickable across the screen.",
      screenshot: "https://user-images.githubusercontent.com/1402241/152118201-f25034c7-6fae-4be0-bb3f-c217647e32b7.gif"
    }, {
      id: "file-age-color",
      description: "Highlights the most-recently-modified items in file lists.",
      screenshot: "https://user-images.githubusercontent.com/1402241/218314631-1442cc89-3616-40fc-abe2-9ba3d3697b6a.png"
    }, {
      id: "fit-textareas",
      description: "Auto-resizes comment fields to fit their content and no longer show scroll bars.",
      screenshot: "https://user-images.githubusercontent.com/1402241/54336211-66fd5e00-4666-11e9-9c5e-111fccab004d.gif"
    }, {
      id: "fix-no-pr-search",
      description: "Redirect to repo issue list when the search doesn‘t include <code>is:pr</code>.",
      screenshot: "https://user-images.githubusercontent.com/46634000/286579939-50122f02-dcfd-4510-b9e1-03d9985da2cd.gif"
    }, {
      id: "github-actions-indicators",
      description: "In the workflows sidebar, shows an indicator that a workflow can be triggered manually, and its next scheduled time if relevant.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252181237-a1d809b1-e5d4-4747-9654-7dde5ab5c61a.png"
    }, {
      id: "global-conversation-list-filters",
      description: "Adds filters for conversations <em>in your repos</em> and <em>commented on by you</em> in the global conversation search.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253048449-2f7cc331-c379-4ec0-a542-441e8b4f8d79.png"
    }, {
      id: "hidden-review-comments-indicator",
      description: "Adds comment indicators when comments are hidden in PR review.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253128043-a10eaf9e-ff81-48db-b67c-ee823804c859.gif"
    }, {
      id: "hide-diff-signs",
      description: "Hides diff signs since diffs are color coded already.",
      screenshot: "https://user-images.githubusercontent.com/1402241/54807718-149cec80-4cb9-11e9-869c-e265863211e3.png"
    }, {
      id: "hide-inactive-deployments",
      description: "Hides inactive deployments in PRs."
    }, {
      id: "hide-issue-list-autocomplete",
      description: "Removes the autocomplete on search fields.",
      screenshot: "https://user-images.githubusercontent.com/1402241/42991841-1f057e4e-8c07-11e8-909c-b051db7a2a03.png"
    }, {
      id: "hide-low-quality-comments",
      description: 'Hides reaction comments ("+1", "👍", …) (except the maintainers’) but they can still be shown.',
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/258220965-4743b9b9-2aef-41b3-a905-ccf8d7beb74e.png"
    }, {
      id: "hide-navigation-hover-highlight",
      description: "Removes the file hover effect in the repo file browser."
    }, {
      id: "hide-newsfeed-noise",
      description: "Hides other inutile newsfeed events (commits, forks, new followers)."
    }, {
      id: "hide-user-forks",
      description: "Hides forks and archived repos from profiles (but they can still be shown.)",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/263195425-85cf0951-c6ed-45fe-8cfc-e447e3ed2a25.png"
    }, {
      id: "highest-rated-comment",
      description: "Highlights the most useful comment in conversations.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252763905-a0c3b074-b032-4d97-946e-328e8a6fb2da.png"
    }, {
      id: "highlight-collaborators-and-own-conversations",
      description: "Highlights conversations opened by you or the current repo’s collaborators.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252804821-a412e05c-fb76-400b-85b5-5acbda538ab2.png"
    }, {
      id: "highlight-non-default-base-branch",
      description: "Shows the base branch in PR lists if it’s not the default branch.",
      screenshot: "https://user-images.githubusercontent.com/1402241/88480306-39f4d700-cf4d-11ea-9e40-2b36d92d41aa.png"
    }, {
      id: "html-preview-link",
      description: "Adds a link to preview HTML files.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/260874191-69d386a0-7c1f-42ae-84fd-4f67f90982da.png"
    }, {
      id: "improve-shortcut-help",
      description: "Shows all of Refined GitHub’s new keyboard shortcuts in the help modal (<kbd>?</kbd> hotkey).",
      screenshot: "https://user-images.githubusercontent.com/29176678/36999174-9f07d33e-20bf-11e8-83e3-b3a9908a4b5f.png"
    }, {
      id: "infinite-scroll",
      description: "Automagically expands the newsfeed when you scroll down."
    }, {
      id: "jump-to-change-requested-comment",
      description: "Adds a link to jump to the latest changed requested comment.",
      screenshot: "https://user-images.githubusercontent.com/19198931/98718312-418b9f00-23c9-11eb-8da2-dfb616e95eb6.gif"
    }, {
      id: "jump-to-conversation-close-event",
      description: "Adds a link to jump to the latest close event of a conversation.",
      screenshot: "https://user-images.githubusercontent.com/16872793/177792713-64219754-f8df-4629-a9ec-33259307cfe7.gif"
    }, {
      id: "keyboard-navigation",
      description: "Adds shortcuts to conversations and PR file lists: <kbd>j</kbd> focuses the comment/file below; <kbd>k</kbd> focuses the comment/file above.",
      screenshot: "https://user-images.githubusercontent.com/1402241/86573176-48665900-bf74-11ea-8996-a5c46cb7bdfd.gif"
    }, {
      id: "last-notification-page-button",
      description: "Adds a link to the last page of notifications.",
      screenshot: "https://user-images.githubusercontent.com/16872793/199828181-3ff2cef3-8740-4efa-8122-8f2f222bd657.png"
    }, {
      id: "link-to-changelog-file",
      description: "Adds a button to view the changelog file from the releases page.",
      screenshot: "https://user-images.githubusercontent.com/46634000/139236982-a1bce2a2-f3aa-40a9-bca4-8756bc941210.png"
    }, {
      id: "link-to-compare-diff",
      description: 'Linkifies the "X files changed" text on compare pages to allow jumping to the diff.',
      screenshot: "https://user-images.githubusercontent.com/46634000/157072587-0335357a-18c7-44c4-ae6e-237080fb36b4.png"
    }, {
      id: "link-to-github-io",
      description: "Adds a link to visit the user’s github.io website from its repo.",
      screenshot: "https://user-images.githubusercontent.com/34235681/152473104-c4723999-9239-48fd-baee-273b01c4eb87.png"
    }, {
      id: "linkify-branch-references",
      description: 'Linkifies branch references in "Quick PR" pages.',
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/258553554-e1711be0-d5ce-4edc-aaf8-72d659c881bc.png"
    }, {
      id: "linkify-code",
      description: "Linkifies issue/PR references and URLs in code and conversation titles.",
      screenshot: "https://cloud.githubusercontent.com/assets/170270/25370217/61718820-29b3-11e7-89c5-2959eaf8cac8.png"
    }, {
      id: "linkify-commit-sha",
      description: "Adds a link to the non-PR commit when visiting a PR commit.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/261164635-b3caa3fa-3bb6-41a5-90d3-4aba84517da6.png"
    }, {
      id: "linkify-labels-on-dashboard",
      description: "Makes labels clickable on the dashboard.",
      screenshot: "https://user-images.githubusercontent.com/46634000/136909258-88031d07-6efa-4339-b436-5636e8075964.png"
    }, {
      id: "linkify-notification-repository-header",
      description: "Linkifies the header of each notification group (when grouped by repository).",
      screenshot: "https://user-images.githubusercontent.com/1402241/80849887-81531c00-8c19-11ea-8777-7294ce318630.png"
    }, {
      id: "linkify-symbolic-links",
      description: "Linkifies symbolic links files.",
      screenshot: "https://user-images.githubusercontent.com/1402241/62036664-6d0e6880-b21c-11e9-9270-4ae30cc10de2.png"
    }, {
      id: "linkify-user-edit-history-popup",
      description: "Linkifies the username in the edit history popup.",
      screenshot: "https://user-images.githubusercontent.com/1402241/88917988-9ebb7480-d260-11ea-8690-0a3440f1ebbc.png"
    }, {
      id: "linkify-user-labels",
      description: 'Links the "Contributor" and "Member" labels on comments to the author’s commits on the repo.',
      screenshot: "https://user-images.githubusercontent.com/1402241/177033344-4d4eea63-e075-4096-b2d4-f4b879f1df31.png"
    }, {
      id: "linkify-user-location",
      description: "Linkifies the user location in their hovercard and profile page.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/262554067-43bea584-cdb4-41c7-b0fa-f487e7ef8807.png"
    }, {
      id: "list-prs-for-branch",
      description: "On branch commit lists, shows the PR that touches the current branch.",
      screenshot: "https://user-images.githubusercontent.com/16872793/119760295-b8751a80-be77-11eb-87da-91d0c403bb49.png"
    }, {
      id: "list-prs-for-file",
      description: "Alerts you if the current file is altered by an open PR.",
      screenshot: "https://user-images.githubusercontent.com/1402241/234559302-b9911ac2-a1bb-4f8a-8e88-078d631cde18.png"
    }, {
      id: "locked-issue",
      description: "Show a label on locked issues and PRs.",
      screenshot: "https://user-images.githubusercontent.com/1402241/283015579-0a04becc-9bff-4aef-8770-272d6804970b.png"
    }, {
      id: "mark-merge-commits-in-list",
      description: "Marks merge commits in commit lists.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/285106996-9bdbc938-69c4-4692-8d47-11e30676de62.png"
    }, {
      id: "mark-private-orgs",
      description: "Marks private organizations on your own profile.",
      screenshot: "https://user-images.githubusercontent.com/6775216/44633467-d5dcc900-a959-11e8-9116-e6b0ffef66af.png"
    }, {
      id: "mobile-tabs",
      description: "Makes the tabs more compact on mobile so more of them can be seen.",
      screenshot: "https://user-images.githubusercontent.com/1402241/245446231-28f44b59-0151-4986-8cb9-05b5645592d8.png"
    }, {
      id: "more-conversation-filters",
      description: "Adds <code>Everything you’re involved in</code> and <code>Everything you subscribed to</code> filters in the search box dropdown.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253043952-cfb99cea-1c7b-43ad-9144-9d84bda8206f.png"
    }, {
      id: "more-dropdown-links",
      description: "Adds useful links to the repository navigation dropdown",
      screenshot: "https://user-images.githubusercontent.com/16872793/124681432-856e6f80-de96-11eb-89c9-6d78e8ae4329.png"
    }, {
      id: "more-file-links",
      description: "Adds links to view the raw version, the blame, and the history of files in PRs and commits.",
      screenshot: "https://user-images.githubusercontent.com/46634000/145016304-aec5a8b8-4cdb-48e6-936f-b214a3fb4b49.png"
    }, {
      id: "netiquette",
      description: "Adds unobtrusive netiquette reminders.",
      screenshot: "https://user-images.githubusercontent.com/1402241/226551766-0e1b6b15-65a3-427e-8bb5-9ea7873993be.png"
    }, {
      id: "new-or-deleted-file",
      description: "Indicates with an icon whether files in commits and pull requests are being added or removed.",
      screenshot: "https://user-images.githubusercontent.com/1402241/90332474-23262b00-dfb5-11ea-9a03-8fd676ea0fdd.png"
    }, {
      id: "new-repo-disable-projects-and-wikis",
      description: "Automatically disables projects and wikis when creating a repository.",
      screenshot: "https://user-images.githubusercontent.com/1402241/177040449-73fde2a5-98e2-4583-8f32-905d1c4bfd20.png"
    }, {
      id: "no-duplicate-list-update-time",
      description: "Hides the update time of conversations in lists when it matches the open/closed/merged time.",
      screenshot: "https://user-images.githubusercontent.com/1402241/111357166-ac3a3900-864e-11eb-884a-d6d6da88f7e2.png"
    }, {
      id: "no-unnecessary-split-diff-view",
      description: "Always uses unified diffs on files where split diffs aren’t useful.",
      screenshot: "https://user-images.githubusercontent.com/46634000/121495005-89af8600-c9d9-11eb-822d-77e0b987e3b1.png"
    }, {
      id: "one-click-diff-options",
      description: "Adds one-click buttons to change diff style and to ignore the whitespace and a keyboard shortcut to ignore the whitespace: <kbd>d</kbd> <kbd>w</kbd>.",
      screenshot: "https://user-images.githubusercontent.com/46634000/156766044-18c9ff50-aead-4c40-ba16-7428b3742b6c.png"
    }, {
      id: "one-click-pr-or-gist",
      description: "Lets you create draft pull requests and public gists in one click.",
      screenshot: "https://user-images.githubusercontent.com/34235681/152473201-868ad7c1-e06f-4826-b808-d90bca7f08b3.png"
    }, {
      id: "one-click-review-submission",
      description: "Simplifies the PR review form: Approve or reject reviews faster with one-click review-type buttons.",
      screenshot: "https://user-images.githubusercontent.com/1402241/236627732-df341ff7-cd98-4cd0-a579-722d1fffa5cf.png"
    }, {
      id: "one-key-formatting",
      description: "Wraps selected text when pressing one of Markdown symbols instead of replacing it: <code>[</code> `<code> </code> `<code> </code>'<code> </code>\"<code> </code><em><code> </code>~<code> </code><em>`</em></em>",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/261155564-e7aabd0e-b14b-4fe6-b379-62e7419c43f8.gif"
    }, {
      id: "open-all-conversations",
      description: "Lets you open all visible conversations at once.",
      screenshot: "https://user-images.githubusercontent.com/46634000/110980658-5face000-8366-11eb-88f9-0cc94f75ce57.gif"
    }, {
      id: "open-all-notifications",
      description: "Adds a button to open all your unread notifications at once.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257085496-17e5c6fa-6bad-443d-96d2-d97e73cd1a5e.png"
    }, {
      id: "open-issue-to-latest-comment",
      description: 'Makes the "comment" icon in issue lists link to the latest comment of the issue.',
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/261159396-0610574b-ab1f-42fb-813f-ee7310a1e5b6.png"
    }, {
      id: "pagination-hotkey",
      description: "Adds shortcuts to navigate through pages with pagination: <kbd>←</kbd> and <kbd>→</kbd>."
    }, {
      id: "parse-backticks",
      description: "GitHub renders `<code> </code>text in backticks<code> </code>` in some places but not others; this features fills in where forgotten.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/262555091-df31aa17-e7a2-4c16-91ca-fb077ba6134a.png"
    }, {
      id: "patch-diff-links",
      description: "Adds links to <code>.patch</code> and <code>.diff</code> files in commits.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257011950-51712338-ffba-4b71-ad8f-9a0f142afb85.png"
    }, {
      id: "pinned-issues-update-time",
      description: 'Replaces the "opened" time with the "updated" time on pinned issues.',
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/240707405-e416be14-5ab5-4869-b33c-f43aab7afcb6.png"
    }, {
      id: "pr-approvals-count",
      description: "Shows color-coded review counts in PR lists.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253125143-d10d95df-4a89-4692-b218-5eba5cd79906.png"
    }, {
      id: "pr-base-commit",
      description: "Shows how far behind a PR head branch is + tells you its base commit.",
      screenshot: "https://user-images.githubusercontent.com/1402241/234492651-b54bf9ba-c218-4a30-bed4-f85a7f037297.png"
    }, {
      id: "pr-branch-auto-delete",
      description: "Automatically deletes the branch right after merging a PR, if possible.",
      screenshot: "https://user-images.githubusercontent.com/1402241/177067141-eabc7494-38a2-45b5-aef9-ac33cc0da370.png"
    }, {
      id: "pr-commit-lines-changed",
      description: "Adds diff stats on PR commits.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253130044-494cd822-c460-42dc-8f65-44454a9d18e3.png"
    }, {
      id: "pr-filters",
      description: "Adds Checks and Draft PR dropdown filters in PR lists.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253068868-6afb4656-4ef5-4846-89c5-24dc6ee7f839.png"
    }, {
      id: "pr-first-commit-title",
      description: "Uses the first commit for a new PR’s title and description.",
      screenshot: "https://user-images.githubusercontent.com/16872793/87246205-ccf42400-c419-11ea-86d5-0e6570d99e6e.gif"
    }, {
      id: "pr-jump-to-first-non-viewed-file",
      description: "Jumps to first non-viewed file in a pull request when clicking on the progress bar.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257011208-764f509d-fed9-424b-84e9-c01cf2fd428b.gif"
    }, {
      id: "pr-notification-link",
      description: "Points PR notifications to the conversation tabs instead of the commits page, which may be a 404.",
      screenshot: "https://github.com/refined-github/refined-github/assets/1402241/621f6512-655e-4565-a37b-2b159ea0ffce"
    }, {
      id: "prevent-comment-loss",
      description: "While writing/editing comments, open the preview links in new tab instead of navigating away from the page.",
      screenshot: "https://user-images.githubusercontent.com/17681399/282616531-2befcabe-5c80-4b9a-bfb5-7b9917847bb5.gif"
    }, {
      id: "prevent-duplicate-pr-submission",
      description: 'Avoids creating duplicate PRs when mistakenly clicking "Create pull request" more than once.',
      screenshot: "https://user-images.githubusercontent.com/16872793/89589967-e029c200-d814-11ea-962b-3ff1f6236781.gif"
    }, {
      id: "prevent-link-loss",
      description: "Suggests fixing links that are wrongly shortened by GitHub.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/260087535-a0f19995-5f4a-44e9-87d8-cf742b9bfeed.gif"
    }, {
      id: "prevent-pr-merge-panel-opening",
      description: "Prevents the merge panel from automatically opening on every page load after it’s been opened once."
    }, {
      id: "preview-hidden-comments",
      description: "Previews hidden comments inline.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/262556553-ca04b870-9adb-4a8c-a6d0-6238863948be.png"
    }, {
      id: "previous-next-commit-buttons",
      description: "Adds duplicate commit navigation buttons at the bottom of the <code>Commits</code> tab page.",
      screenshot: "https://user-images.githubusercontent.com/24777/41755271-741773de-75a4-11e8-9181-fcc1c73df633.png"
    }, {
      id: "previous-version",
      description: "Lets you see the previous version of a file in one click.",
      screenshot: "https://user-images.githubusercontent.com/50487467/236657960-401f3cd7-cc99-494e-b522-1dca76827369.png"
    }, {
      id: "profile-gists-link",
      description: "Adds a link to the user’s public gists on their profile.",
      screenshot: "https://user-images.githubusercontent.com/44045911/87950518-f7a94100-cad9-11ea-8393-609fad70635c.png"
    }, {
      id: "profile-hotkey",
      description: "Adds a keyboard shortcut to visit your own profile: <kbd>g</kbd> <kbd>m</kbd>."
    }, {
      id: "pull-request-hotkeys",
      description: "Adds keyboard shortcuts to cycle through PR tabs: <kbd>g</kbd> <kbd>←</kbd> and <kbd>g</kbd> <kbd>→</kbd>, or <kbd>g</kbd> <kbd>1</kbd>, <kbd>g</kbd> <kbd>2</kbd>, <kbd>g</kbd> <kbd>3</kbd>, and <kbd>g</kbd> <kbd>4</kbd>.",
      screenshot: "https://user-images.githubusercontent.com/16872793/94634958-7e7b5680-029f-11eb-82ea-1f96cd11e4cd.png"
    }, {
      id: "quick-comment-edit",
      description: "Lets you edit any comment with one click instead of having to open a dropdown.",
      screenshot: "https://user-images.githubusercontent.com/46634000/162252055-54750c89-0ddc-487a-b4ad-cec6009d9870.png"
    }, {
      id: "quick-comment-hiding",
      description: "Simplifies the UI to hide comments.",
      screenshot: "https://user-images.githubusercontent.com/1402241/43039221-1ddc91f6-8d29-11e8-9ed4-93459191a510.gif"
    }, {
      id: "quick-file-edit",
      description: "Adds a button to edit files from the repo file list.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252182890-081975f4-f041-4ba5-ae48-d52cb0796543.png"
    }, {
      id: "quick-label-removal",
      description: "Adds one-click buttons to remove labels in conversations.",
      screenshot: "https://user-images.githubusercontent.com/36174850/89980178-0bc80480-dc7a-11ea-8ded-9e25f5f13d1a.gif"
    }, {
      id: "quick-mention",
      description: "Adds a button to <code>@mention</code> a user in conversations.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/261158402-5a79cc3e-4331-475f-8063-5ed81fefcf10.gif"
    }, {
      id: "quick-new-issue",
      description: "Adds a link to create issues from anywhere in a repository.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/274816033-820ec518-049d-4248-9f8a-27b9423e350b.png"
    }, {
      id: "quick-repo-deletion",
      description: "Lets you delete your repos in a click, if they have no stars, issues, or PRs.",
      screenshot: "https://user-images.githubusercontent.com/1402241/99716945-54a80a00-2a6e-11eb-9107-f3517a6ab1bc.gif"
    }, {
      id: "quick-review",
      description: "Adds quick-review buttons to the PR sidebar, automatically focuses the review textarea, and adds a keyboard shortcut to open the review popup: <kbd>v</kbd>.",
      screenshot: "https://github.com/refined-github/refined-github/assets/1402241/f11039c4-c9d1-4adc-9a65-cfe1f2027ec3"
    }, {
      id: "quick-review-comment-deletion",
      description: "Adds a button to delete review comments in one click when editing them.",
      screenshot: "https://user-images.githubusercontent.com/46634000/115445792-9fdd6900-a216-11eb-9ba3-6dab4d2f9d32.png"
    }, {
      id: "reactions-avatars",
      description: "Adds reaction avatars showing <em>who</em> reacted to a comment.",
      screenshot: "https://user-images.githubusercontent.com/1402241/236628453-8b646178-b838-44a3-9541-0a9b5f54a84a.png"
    }, {
      id: "refined-github.css",
      description: "Reduces tabs’ size to 4 spaces instead of 8 where GitHub doesn't follow the user’s preferences.",
      screenshot: "https://cloud.githubusercontent.com/assets/170270/14170088/d3be931e-f755-11e5-8edf-c5f864336382.png"
    }, {
      id: "release-download-count",
      description: "Adds a download count next to release assets.",
      screenshot: "https://user-images.githubusercontent.com/1402241/197958719-1577bc1b-1f4d-44a8-98c2-2645b7b14d31.png"
    }, {
      id: "releases-dropdown",
      description: "Adds a tags dropdown/search on tag/release pages.",
      screenshot: "https://user-images.githubusercontent.com/1402241/231678527-f0a96112-9c30-4b49-8205-efa472bd880e.png"
    }, {
      id: "releases-tab",
      description: "Adds a <code>Releases</code> tab and a keyboard shortcut: <kbd>g</kbd> <kbd>r</kbd>.",
      screenshot: "https://cloud.githubusercontent.com/assets/170270/13136797/16d3f0ea-d64f-11e5-8a45-d771c903038f.png"
    }, {
      id: "reload-failed-proxied-images",
      description: "Retries downloading images that failed downloading due to GitHub limited proxying.",
      screenshot: "https://user-images.githubusercontent.com/14858959/64068746-21991100-cc45-11e9-844e-827f5ac9b51e.png"
    }, {
      id: "repo-age",
      description: "Displays the age of the repository in the sidebar.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252176778-f8260312-d0dc-41b5-a4d1-ca680208d347.png"
    }, {
      id: "repo-avatars",
      description: "Adds the profile picture to the header of public repositories.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/255323568-aee4d90e-844e-41e8-880a-ce466826516c.png"
    }, {
      id: "repo-header-info",
      description: "Shows whether a repo is a fork and adds the number of stars to its header.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/267216946-404d79ab-46d7-4bc8-ba88-ae8f8029150d.png"
    }, {
      id: "repo-wide-file-finder",
      description: "Enables the File Finder keyboard shortcut (<kbd>t</kbd>) on entire repository."
    }, {
      id: "resolve-conflicts",
      description: "Adds one-click merge conflict fixers.",
      screenshot: "https://user-images.githubusercontent.com/1402241/54978791-45906080-4fdc-11e9-8fe1-45374f8ff636.png"
    }, {
      id: "restore-file",
      description: "Adds a button to discard all the changes to a file in a PR.",
      screenshot: "https://user-images.githubusercontent.com/1402241/236630610-e11a64f6-5e70-4353-89b8-39aae830dd16.gif"
    }, {
      id: "same-branch-author-commits",
      description: "Preserves current branch and path when viewing all commits by an author.",
      screenshot: "https://user-images.githubusercontent.com/44045911/148764372-ee443213-e61a-4227-9219-0ee54ed832e8.png"
    }, {
      id: "scrollable-areas",
      description: "Limits the height of tall code blocks and quotes."
    }, {
      id: "select-all-notifications-shortcut",
      description: "Adds a shortcut to select all visible notifications: <kbd>a</kbd>."
    }, {
      id: "select-notifications",
      description: "Select notifications by type and status.",
      screenshot: "https://user-images.githubusercontent.com/83146190/252175851-e0826d3b-1990-4bff-ba09-71892463818e.gif"
    }, {
      id: "selection-in-new-tab",
      description: "Adds a keyboard shortcut to open selection in new tab when navigating via <kbd>j</kbd> and <kbd>k</kbd>: <kbd>shift</kbd> <kbd>o</kbd>."
    }, {
      id: "shorten-links",
      description: 'Shortens URLs and repo URLs to readable references like "<em>user/repo/.file@<code>d71718d</code>".</em>',
      screenshot: "https://user-images.githubusercontent.com/1402241/27252232-8fdf8ed0-538b-11e7-8f19-12d317c9cd32.png"
    }, {
      id: "show-associated-branch-prs-on-fork",
      description: "Shows the associated pull requests on branches for forked repositories.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/260873542-2a7fc7a2-231f-4f2e-9c7e-272d894de4c6.png"
    }, {
      id: "show-names",
      description: "Adds the real name of users by their usernames.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252756294-94785dc2-423e-498c-939a-359a012036e0.png"
    }, {
      id: "show-open-prs-of-forks",
      description: "In your forked repos, shows number of your open PRs to the original repo.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252177140-94165582-628b-45b6-9a62-faf0c7fc2335.png"
    }, {
      id: "show-user-top-repositories",
      description: "Adds a link to the user’s most starred repositories.",
      screenshot: "https://user-images.githubusercontent.com/1402241/48474026-43e3ae80-e82c-11e8-93de-159ad4c6f283.png"
    }, {
      id: "show-whitespace",
      description: "Makes whitespace characters visible.",
      screenshot: "https://user-images.githubusercontent.com/1402241/61187598-f9118380-a6a5-11e9-985a-990a7f798805.png"
    }, {
      id: "small-user-avatars",
      description: "Shows a small avatar next to the username in conversation lists and mentions.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/271184107-24ec471e-54d1-434a-a5f2-615902d2cad9.png"
    }, {
      id: "sort-conversations-by-update-time",
      description: "Changes the default sort order of conversations to <code>Recently updated</code>."
    }, {
      id: "status-subscription",
      description: "Lets you subscribe to opening/closing events of issues in one click.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/238186901-cbc98b51-d173-40c6-b21e-5f0bae3d800c.png"
    }, {
      id: "sticky-conversation-list-toolbar",
      description: "Makes the conversation list’s filters toolbar sticky.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/261164103-875b70f7-5adc-4bb2-b158-8d5231d47da2.gif"
    }, {
      id: "sticky-notifications-actions",
      description: "Make the notifications action bar sticky.",
      screenshot: "https://github.com/refined-github/refined-github/assets/1402241/5b370430-2319-4c78-88e7-c2c06cd1c30f"
    }, {
      id: "sticky-sidebar",
      description: "Makes conversation sidebars and repository sidebars sticky, if they fit the viewport.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/252179311-ea6d42dc-1525-401a-bc4d-404cf8fa1785.gif"
    }, {
      id: "stop-redirecting-in-notification-bar",
      description: "Stops redirecting to notification inbox from notification bar actions while holding <kbd>Alt</kbd>.",
      screenshot: "https://user-images.githubusercontent.com/202916/80318782-c38cef80-880c-11ea-9226-72c585f42a51.png"
    }, {
      id: "submission-via-ctrl-enter-everywhere",
      description: "Enables submission via <kbd>ctrl</kbd> <kbd>enter</kbd> on every page possible."
    }, {
      id: "suggest-commit-title-limit",
      description: "Suggests limiting commit titles to 72 characters.",
      screenshot: "https://user-images.githubusercontent.com/37769974/60379478-106b3280-9a51-11e9-88b9-0e3607f214cd.gif"
    }, {
      id: "swap-branches-on-compare",
      description: "Adds a link to swap branches in the branch compare view.",
      screenshot: "https://user-images.githubusercontent.com/44045911/230370539-ebc94246-864f-48f2-85fa-7318fc1f6d71.png"
    }, {
      id: "sync-pr-commit-title",
      description: "Uses the PR’s title as the default squash commit title and updates the PR’s title to match the commit title, if changed.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257011579-25332762-b25f-407b-b6d2-bbfc13de2be7.png"
    }, {
      id: "tab-to-indent",
      description: "Enables <kbd>tab</kbd> and <kbd>shift</kbd> <kbd>tab</kbd> for indentation in comment fields.",
      screenshot: "https://user-images.githubusercontent.com/1402241/33802977-beb8497c-ddbf-11e7-899c-698d89298de4.gif"
    }, {
      id: "table-input",
      description: "Adds a button in the text editor to quickly insert a simplified HTML table.",
      screenshot: "https://user-images.githubusercontent.com/46634000/94559114-09892c00-0261-11eb-8fb0-c5a85ea76b6f.gif"
    }, {
      id: "tag-changes-link",
      description: "Adds a link to changes since last tag/release for each tag/release.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257036739-bebafb94-cb94-4053-9768-ff97306ab862.png"
    }, {
      id: "tags-on-commits-list",
      description: "Displays the corresponding tags next to commits.",
      screenshot: "https://user-images.githubusercontent.com/1402241/285106537-3c882cb2-6847-4098-9e51-cf2951dee818.png"
    }, {
      id: "toggle-everything-with-alt",
      description: "Adds a shortcut to toggle all similar items (minimized comments, deferred diffs, etc) at once: <kbd>alt</kbd> <kbd>click</kbd> on each button or checkbox.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/253063446-6f556e7d-2ac5-439d-92f0-0c6d719fc86f.gif"
    }, {
      id: "toggle-files-button",
      description: "Adds a button to toggle the repo file list.",
      screenshot: "https://github.com/refined-github/refined-github/assets/1402241/69465a92-5548-40d2-bf90-9f7834d26ef2"
    }, {
      id: "unfinished-comments",
      description: "Notifies the user of unfinished comments in hidden tabs.",
      screenshot: "https://user-images.githubusercontent.com/1402241/97792086-423d5d80-1b9f-11eb-9a3a-daf716d10b0e.gif"
    }, {
      id: "unreleased-commits",
      description: "Tells you whether you're looking at the latest version of a repository, or if there are any unreleased commits.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/267236196-8564c193-a3c7-4248-9735-54749c1990c7.png"
    }, {
      id: "unwrap-unnecessary-dropdowns",
      description: "Makes some dropdowns 1-click instead of unnecessarily 2-click.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/83146190/258554504-97d4079a-2aae-4aea-a870-653a267494a8.png"
    }, {
      id: "update-pr-from-base-branch",
      description: 'Adds an "Update branch" button to every PR. GitHub has the same feature, but it must be manually configured with protected branches.',
      screenshot: "https://user-images.githubusercontent.com/1402241/234483592-4867cb2e-21cb-436d-9ea0-aedadf834f19.png"
    }, {
      id: "useful-not-found-page",
      description: "Adds possible related pages and alternatives on 404 pages.",
      screenshot: "https://user-images.githubusercontent.com/1402241/46402857-7bdada80-c733-11e8-91a1-856573078ff5.png"
    }, {
      id: "user-local-time",
      description: "Shows the user local time in their hovercard (based on their last commit).",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/140871606/257039621-132bd789-e213-4a89-83ff-e1266215c60d.png"
    }, {
      id: "user-profile-follower-badge",
      description: "On profiles, it shows whether the user follows you.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/263206287-c8e1b94c-ec80-4394-bbb3-1cf6fb08b807.png"
    }, {
      id: "vertical-front-matter",
      description: "Shows Markdown front matter as vertical table.",
      screenshot: "https://user-images.githubusercontent.com/44045911/87251695-26069b00-c4a0-11ea-9077-53ce366490ed.png"
    }, {
      id: "view-last-pr-deployment",
      description: "Adds a link to open the latest deployment from the header of a PR.",
      screenshot: "https://user-images.githubusercontent.com/44045911/232313171-b54ac9cc-ebb1-43ef-bd41-5d81ec9f9588.png"
    }, {
      id: "visit-tag",
      description: "When navigating a repo's file on a specific tag, it adds a link to see the release/tag itself.",
      screenshot: "https://github-production-user-asset-6210df.s3.amazonaws.com/1402241/285123739-e5f4fa0a-3f48-49ef-9b87-2fd6f183c923.png"
    }, {
      id: "warn-pr-from-master",
      description: "Warns you when creating a pull request from the default branch, as it’s an anti-pattern.",
      screenshot: "https://user-images.githubusercontent.com/1402241/52543516-3ca94e00-2de5-11e9-9f80-ff8f9fe8bdc4.png"
    }, {
      id: "warning-for-disallow-edits",
      description: "Warns you when unchecking <code>Allow edits from maintainers</code>, as it’s maintainer-hostile.",
      screenshot: "https://user-images.githubusercontent.com/1402241/53151888-24101380-35ef-11e9-8d30-d6315ad97325.gif"
    } ], state = new class {
      name;
      maxAge;
      constructor(name, options = {}) {
        this.name = name;
        this.maxAge = options.maxAge ?? {
          days: 30
        };
      }
      async get() {
        return legacy.get(this.name);
      }
      async set(value) {
        if (0 === arguments.length) throw new TypeError("Expected a value to be stored");
        return legacy.set(this.name, value, this.maxAge);
      }
      async delete() {
        return legacy.delete(this.name);
      }
      async isCached() {
        return void 0 !== await this.get();
      }
    }("bisect", {
      maxAge: {
        minutes: 15
      }
    }), getMiddleStep = list => Math.floor(list.length / 2);
    async function onChoiceButtonClick({currentTarget: button}) {
      const answer = button.value, bisectedFeatures = await state.get();
      if (!(bisectedFeatures.length > 1)) {
        if ("yes" === answer) createMessageBox(dom_chef.createElement(dom_chef.Fragment, null, dom_chef.createElement("p", null, "Unable to identify feature. It might be a ", dom_chef.createElement("a", {
          href: "https://github.com/refined-github/refined-github/wiki/Undo-unwanted-styles",
          target: "_blank",
          rel: "noreferrer"
        }, "CSS-only feature"), ", a ", dom_chef.createElement("a", {
          href: "https://github.com/refined-github/refined-github/wiki/Meta-features",
          target: "_blank",
          rel: "noreferrer"
        }, "meta-feature"), ", or unrelated to Refined GitHub."), dom_chef.createElement("p", null, "Try disabling Refined GitHub to see if the change or issue is caused by the extension."))); else {
          const feature = dom_chef.createElement("a", {
            href: featureLink(bisectedFeatures[0])
          }, dom_chef.createElement("code", null, bisectedFeatures[0]));
          createMessageBox(dom_chef.createElement(dom_chef.Fragment, null, "The change or issue is caused by ", feature, "."));
        }
        await state.delete();
        window.removeEventListener("visibilitychange", hideMessage);
      } else {
        await state.set("yes" === answer ? bisectedFeatures.slice(0, getMiddleStep(bisectedFeatures)) : bisectedFeatures.slice(getMiddleStep(bisectedFeatures)));
        button.parentElement.replaceWith(dom_chef.createElement("div", {
          className: "btn",
          "aria-disabled": "true"
        }, "Reloading…"));
        location.reload();
      }
    }
    async function onEndButtonClick() {
      await state.delete();
      location.reload();
    }
    function createMessageBox(message, extraButtons) {
      select_dom_$("#rgh-bisect-dialog")?.remove();
      document.body.append(dom_chef.createElement("div", {
        id: "rgh-bisect-dialog",
        className: "Box p-3"
      }, dom_chef.createElement("p", null, message), dom_chef.createElement("div", {
        className: "d-flex flex-justify-between"
      }, dom_chef.createElement("button", {
        type: "button",
        className: "btn",
        onClick: onEndButtonClick
      }, "Exit"), extraButtons)));
    }
    async function hideMessage() {
      if (!await state.get()) createMessageBox("Process completed in another tab");
    }
    async function bisectFeatures() {
      const bisectedFeatures = await state.get();
      if (!bisectedFeatures) return;
      console.log(`Bisecting ${bisectedFeatures.length} features:\n${bisectedFeatures.join("\n")}`);
      const steps = Math.ceil(Math.log2(Math.max(bisectedFeatures.length))) + 1;
      await elementReady("body");
      createMessageBox(`Do you see the change or issue? (${pluralize(steps, "last step", "$$ steps remaining")})`, dom_chef.createElement("div", null, dom_chef.createElement("button", {
        type: "button",
        className: "btn btn-danger mr-2",
        value: "no",
        "aria-disabled": "true",
        onClick: onChoiceButtonClick
      }, "No"), dom_chef.createElement("button", {
        type: "button",
        className: "btn btn-primary",
        value: "yes",
        "aria-disabled": "true",
        onClick: onChoiceButtonClick
      }, "Yes")));
      window.addEventListener("load", (() => {
        for (const button of $$("#rgh-bisect-dialog [aria-disabled]")) button.removeAttribute("aria-disabled");
      }));
      window.addEventListener("visibilitychange", hideMessage);
      const half = getMiddleStep(bisectedFeatures), temporaryOptions = {};
      for (const feature of importedFeatures) {
        const index = bisectedFeatures.indexOf(feature);
        temporaryOptions[`feature:${feature}`] = index > -1 && index < half;
      }
      console.log(temporaryOptions);
      return temporaryOptions;
    }
    let webext_detect_page_cache = !0;
    function webext_detect_page_isCurrentPathname(path) {
      if (!path) return !1;
      try {
        const {pathname} = new URL(path, location.origin);
        return pathname === location.pathname;
      } catch {
        return !1;
      }
    }
    function webext_detect_page_getManifest(_version) {
      return globalThis.chrome?.runtime?.getManifest?.();
    }
    function webext_detect_page_once(function_) {
      let result;
      return () => {
        if (!webext_detect_page_cache || void 0 === result) result = function_();
        return result;
      };
    }
    const webext_detect_page_isWebPage = webext_detect_page_once((() => [ "about:", "http:", "https:" ].includes(location.protocol))), webext_detect_page_isExtensionContext = webext_detect_page_once((() => "object" == typeof globalThis.chrome?.extension)), webext_detect_page_isContentScript = webext_detect_page_once((() => webext_detect_page_isExtensionContext() && webext_detect_page_isWebPage())), webext_detect_page_isBackgroundPage = webext_detect_page_once((() => {
      const manifest = webext_detect_page_getManifest();
      if (manifest && webext_detect_page_isCurrentPathname(manifest.background_page ?? manifest.background?.page)) return !0; else return Boolean(manifest?.background?.scripts && webext_detect_page_isCurrentPathname("/_generated_background_page.html"));
    })), webext_detect_page_isBackgroundWorker = webext_detect_page_once((() => webext_detect_page_isCurrentPathname(webext_detect_page_getManifest()?.background?.service_worker))), webext_detect_page_isOptionsPage = (webext_detect_page_once((() => webext_detect_page_isBackgroundPage() && 2 === webext_detect_page_getManifest()?.manifest_version && !1 !== webext_detect_page_getManifest()?.background?.persistent)), 
    webext_detect_page_once((() => {
      const path = webext_detect_page_getManifest()?.options_ui?.page;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    }))), webext_detect_page_isSidePanel = webext_detect_page_once((() => {
      const path = webext_detect_page_getManifest()?.side_panel?.default_path;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), webext_detect_page_isDevToolsPage = webext_detect_page_once((() => {
      const devtoolsPage = webext_detect_page_isExtensionContext() && chrome.devtools && webext_detect_page_getManifest()?.devtools_page;
      if ("string" != typeof devtoolsPage) return !1;
      return new URL(devtoolsPage, location.origin).pathname === location.pathname;
    })), webext_detect_page_isFirefox = () => globalThis.navigator?.userAgent.includes("Firefox"), webext_detect_page_isChrome = () => globalThis.navigator?.userAgent.includes("Chrome"), webext_detect_page_isSafari = () => !webext_detect_page_isChrome() && globalThis.navigator?.userAgent.includes("Safari"), contextChecks = {
      contentScript: webext_detect_page_isContentScript,
      background: () => webext_detect_page_isBackgroundPage() || webext_detect_page_isBackgroundWorker(),
      options: webext_detect_page_isOptionsPage,
      sidePanel: webext_detect_page_isSidePanel,
      devTools: () => Boolean(globalThis.chrome?.devtools),
      devToolsPage: webext_detect_page_isDevToolsPage,
      extension: webext_detect_page_isExtensionContext,
      web: webext_detect_page_isWebPage
    };
    Object.keys(contextChecks);
    function pSomeFunction(iterable, predicate) {
      const promises = [];
      for (const item of iterable) {
        const result = predicate(item);
        if ("boolean" == typeof result) {
          if (result) return !0;
        } else promises.push(result);
      }
      if (0 === promises.length) return !1; else return async function(iterable) {
        return new Promise((resolve => {
          for (const promise of iterable) (async () => {
            if (await promise) resolve(!0);
          })();
          Promise.allSettled(iterable).then((() => {
            resolve(!1);
          }));
        }));
      }(promises);
    }
    function pEveryFunction(iterable, predicate) {
      const promises = [];
      for (const item of iterable) {
        const result = predicate(item);
        if ("boolean" == typeof result) {
          if (!result) return !1;
        } else promises.push(result);
      }
      if (0 === promises.length) return !0; else return async function(iterable) {
        const results = await Promise.all(iterable);
        return results.every(Boolean);
      }(promises);
    }
    function isFeaturePrivate(id) {
      return id.startsWith("rgh-");
    }
    webext_detect_page_isSafari() && globalThis.navigator?.userAgent.includes("Mobile");
    const copyProperty = (to, from, property, ignoreNonConfigurable) => {
      if ("length" === property || "prototype" === property) return;
      if ("arguments" === property || "caller" === property) return;
      const toDescriptor = Object.getOwnPropertyDescriptor(to, property), fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
      if (canCopyProperty(toDescriptor, fromDescriptor) || !ignoreNonConfigurable) Object.defineProperty(to, property, fromDescriptor);
    }, canCopyProperty = function(toDescriptor, fromDescriptor) {
      return void 0 === toDescriptor || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
    }, changePrototype = (to, from) => {
      const fromPrototype = Object.getPrototypeOf(from);
      if (fromPrototype !== Object.getPrototypeOf(to)) Object.setPrototypeOf(to, fromPrototype);
    }, wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`, toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), changeToString = (to, from, name) => {
      const withName = "" === name ? "" : `with ${name.trim()}() `, newToString = wrappedToString.bind(null, withName, from.toString());
      Object.defineProperty(newToString, "name", toStringName);
      Object.defineProperty(to, "toString", {
        ...toStringDescriptor,
        value: newToString
      });
    };
    var dist = __webpack_require__(669);
    const cacheStore = new WeakMap;
    function mem(fn, {cacheKey, cache = new Map, maxAge} = {}) {
      if ("number" == typeof maxAge) dist(cache);
      const memoized = function(...arguments_) {
        const key = cacheKey ? cacheKey(arguments_) : arguments_[0], cacheItem = cache.get(key);
        if (cacheItem) return cacheItem.data;
        const result = fn.apply(this, arguments_);
        cache.set(key, {
          data: result,
          maxAge: maxAge ? Date.now() + maxAge : Number.POSITIVE_INFINITY
        });
        return result;
      };
      !function(to, from, {ignoreNonConfigurable = !1} = {}) {
        const {name} = to;
        for (const property of Reflect.ownKeys(from)) copyProperty(to, from, property, ignoreNonConfigurable);
        changePrototype(to, from);
        changeToString(to, from, name);
      }(memoized, fn, {
        ignoreNonConfigurable: !0
      });
      cacheStore.set(memoized, cache);
      return memoized;
    }
    function memDecorator(options = {}) {
      const instanceMap = new WeakMap;
      return (target, propertyKey, descriptor) => {
        const input = target[propertyKey];
        if ("function" != typeof input) throw new TypeError("The decorated value must be a function");
        delete descriptor.value;
        delete descriptor.writable;
        descriptor.get = function() {
          if (!instanceMap.has(this)) {
            const value = mem(input, options);
            instanceMap.set(this, value);
            return value;
          }
          return instanceMap.get(this);
        };
      };
    }
    const patternValidationRegex = /^(https?|wss?|file|ftp|\*):\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^file:\/\/\/.*$|^resource:\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^about:/, webext_patterns_isFirefox = "object" == typeof navigator && navigator.userAgent.includes("Firefox/"), allStarsRegex = webext_patterns_isFirefox ? /^(https?|wss?):[/][/][^/]+([/].*)?$/ : /^https?:[/][/][^/]+([/].*)?$/, allUrlsRegex = /^(https?|file|ftp):[/]+/;
    function webext_patterns_patternToRegex(...matchPatterns) {
      if (0 === matchPatterns.length) return /$./;
      if (matchPatterns.includes("<all_urls>")) return allUrlsRegex;
      if (matchPatterns.includes("*://*/*")) return allStarsRegex; else return new RegExp(matchPatterns.map((x => function(matchPattern) {
        if (!patternValidationRegex.test(matchPattern)) throw new Error(matchPattern + " is an invalid pattern, it must match " + String(patternValidationRegex));
        let [, protocol, host, pathname] = matchPattern.split(/(^[^:]+:[/][/])([^/]+)?/);
        protocol = protocol.replace("*", webext_patterns_isFirefox ? "(https?|wss?)" : "https?").replace(/[/]/g, "[/]");
        host = (null != host ? host : "").replace(/^[*][.]/, "([^/]+.)*").replace(/^[*]$/, "[^/]+").replace(/[.]/g, "[.]").replace(/[*]$/g, "[^.]+");
        pathname = pathname.replace(/[/]/g, "[/]").replace(/[.]/g, "[.]").replace(/[*]/g, ".*");
        return "^" + protocol + host + "(" + pathname + ")?$";
      }(x))).join("|"));
    }
    function debounce(delay, callback, options) {
      var _ref$atBegin = (options || {}).atBegin;
      return function(delay, callback, options) {
        var timeoutID, _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = void 0 === _ref$noTrailing ? !1 : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = void 0 === _ref$noLeading ? !1 : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = void 0 === _ref$debounceMode ? void 0 : _ref$debounceMode, cancelled = !1, lastExec = 0;
        function clearExistingTimeout() {
          if (timeoutID) clearTimeout(timeoutID);
        }
        function wrapper() {
          for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) arguments_[_key] = arguments[_key];
          var self = this, elapsed = Date.now() - lastExec;
          if (!cancelled) {
            if (!noLeading && debounceMode && !timeoutID) exec();
            clearExistingTimeout();
            if (void 0 === debounceMode && elapsed > delay) if (noLeading) {
              lastExec = Date.now();
              if (!noTrailing) timeoutID = setTimeout(debounceMode ? clear : exec, delay);
            } else exec(); else if (!0 !== noTrailing) timeoutID = setTimeout(debounceMode ? clear : exec, void 0 === debounceMode ? delay - elapsed : delay);
          }
          function exec() {
            lastExec = Date.now();
            callback.apply(self, arguments_);
          }
          function clear() {
            timeoutID = void 0;
          }
        }
        wrapper.cancel = function(options) {
          var _ref2$upcomingOnly = (options || {}).upcomingOnly, upcomingOnly = void 0 === _ref2$upcomingOnly ? !1 : _ref2$upcomingOnly;
          clearExistingTimeout();
          cancelled = !upcomingOnly;
        };
        return wrapper;
      }(delay, callback, {
        debounceMode: !1 !== (void 0 === _ref$atBegin ? !1 : _ref$atBegin)
      });
    }
    let node_modules_webext_detect_page_cache = !0;
    function node_modules_webext_detect_page_isCurrentPathname(path) {
      if (!path) return !1;
      try {
        const {pathname} = new URL(path, location.origin);
        return pathname === location.pathname;
      } catch {
        return !1;
      }
    }
    function node_modules_webext_detect_page_getManifest(_version) {
      return globalThis.chrome?.runtime?.getManifest?.();
    }
    function node_modules_webext_detect_page_once(function_) {
      let result;
      return () => {
        if (!node_modules_webext_detect_page_cache || void 0 === result) result = function_();
        return result;
      };
    }
    const node_modules_webext_detect_page_isWebPage = node_modules_webext_detect_page_once((() => [ "about:", "http:", "https:" ].includes(location.protocol))), node_modules_webext_detect_page_isExtensionContext = node_modules_webext_detect_page_once((() => "object" == typeof globalThis.chrome?.extension)), node_modules_webext_detect_page_isBackground = (node_modules_webext_detect_page_once((() => node_modules_webext_detect_page_isExtensionContext() && node_modules_webext_detect_page_isWebPage())), 
    () => node_modules_webext_detect_page_isBackgroundPage() || node_modules_webext_detect_page_isBackgroundWorker()), node_modules_webext_detect_page_isBackgroundPage = node_modules_webext_detect_page_once((() => {
      const manifest = node_modules_webext_detect_page_getManifest();
      if (manifest && node_modules_webext_detect_page_isCurrentPathname(manifest.background_page ?? manifest.background?.page)) return !0; else return Boolean(manifest?.background?.scripts && node_modules_webext_detect_page_isCurrentPathname("/_generated_background_page.html"));
    })), node_modules_webext_detect_page_isBackgroundWorker = node_modules_webext_detect_page_once((() => node_modules_webext_detect_page_isCurrentPathname(node_modules_webext_detect_page_getManifest()?.background?.service_worker)));
    node_modules_webext_detect_page_once((() => {
      const path = node_modules_webext_detect_page_getManifest()?.options_ui?.page;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), node_modules_webext_detect_page_once((() => {
      const path = node_modules_webext_detect_page_getManifest()?.side_panel?.default_path;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), node_modules_webext_detect_page_once((() => {
      const devtoolsPage = node_modules_webext_detect_page_isExtensionContext() && chrome.devtools && node_modules_webext_detect_page_getManifest()?.devtools_page;
      if ("string" != typeof devtoolsPage) return !1;
      return new URL(devtoolsPage, location.origin).pathname === location.pathname;
    }));
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, classCallCheck = (function() {
      function AwaitValue(value) {
        this.value = value;
      }
      function AsyncGenerator(gen) {
        var front, back;
        function resume(key, arg) {
          try {
            var result = gen[key](arg), value = result.value;
            if (value instanceof AwaitValue) Promise.resolve(value.value).then((function(arg) {
              resume("next", arg);
            }), (function(arg) {
              resume("throw", arg);
            })); else settle(result.done ? "return" : "normal", result.value);
          } catch (err) {
            settle("throw", err);
          }
        }
        function settle(type, value) {
          switch (type) {
           case "return":
            front.resolve({
              value,
              done: !0
            });
            break;

           case "throw":
            front.reject(value);
            break;

           default:
            front.resolve({
              value,
              done: !1
            });
          }
          if (front = front.next) resume(front.key, front.arg); else back = null;
        }
        this._invoke = function(key, arg) {
          return new Promise((function(resolve, reject) {
            var request = {
              key,
              arg,
              resolve,
              reject,
              next: null
            };
            if (back) back = back.next = request; else {
              front = back = request;
              resume(key, arg);
            }
          }));
        };
        if ("function" != typeof gen.return) this.return = void 0;
      }
      if ("function" == typeof Symbol && Symbol.asyncIterator) AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
        return this;
      };
      AsyncGenerator.prototype.next = function(arg) {
        return this._invoke("next", arg);
      };
      AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke("throw", arg);
      };
      AsyncGenerator.prototype.return = function(arg) {
        return this._invoke("return", arg);
      };
    }(), function(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }), createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || !1;
          descriptor.configurable = !0;
          if ("value" in descriptor) descriptor.writable = !0;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }(), inherits = function(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }, possibleConstructorReturn = function(self, call) {
      if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return call && ("object" == typeof call || "function" == typeof call) ? call : self;
    }, TypeRegistry = function() {
      function TypeRegistry() {
        var initial = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        classCallCheck(this, TypeRegistry);
        this.registeredTypes = initial;
      }
      createClass(TypeRegistry, [ {
        key: "get",
        value: function(type) {
          if (void 0 !== this.registeredTypes[type]) return this.registeredTypes[type]; else return this.registeredTypes.default;
        }
      }, {
        key: "register",
        value: function(type, item) {
          if (void 0 === this.registeredTypes[type]) this.registeredTypes[type] = item;
        }
      }, {
        key: "registerDefault",
        value: function(item) {
          this.register("default", item);
        }
      } ]);
      return TypeRegistry;
    }(), KeyExtractors = function(_TypeRegistry) {
      inherits(KeyExtractors, _TypeRegistry);
      function KeyExtractors(options) {
        classCallCheck(this, KeyExtractors);
        var _this = possibleConstructorReturn(this, (KeyExtractors.__proto__ || Object.getPrototypeOf(KeyExtractors)).call(this, options));
        _this.registerDefault((function(el) {
          return el.getAttribute("name") || "";
        }));
        return _this;
      }
      return KeyExtractors;
    }(TypeRegistry), InputReaders = function(_TypeRegistry) {
      inherits(InputReaders, _TypeRegistry);
      function InputReaders(options) {
        classCallCheck(this, InputReaders);
        var _this = possibleConstructorReturn(this, (InputReaders.__proto__ || Object.getPrototypeOf(InputReaders)).call(this, options));
        _this.registerDefault((function(el) {
          return el.value;
        }));
        _this.register("checkbox", (function(el) {
          return null !== el.getAttribute("value") ? el.checked ? el.getAttribute("value") : null : el.checked;
        }));
        _this.register("select", (function(el) {
          return function(elem) {
            var value, option, i, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type, values = one ? null : [], max = one ? index + 1 : options.length;
            if (index < 0) i = max; else i = one ? index : 0;
            for (;i < max; i++) if (((option = options[i]).selected || i === index) && !option.disabled && (!option.parentNode.disabled || "optgroup" !== option.parentNode.tagName.toLowerCase())) {
              value = option.value;
              if (one) return value;
              values.push(value);
            }
            return values;
          }(el);
        }));
        return _this;
      }
      return InputReaders;
    }(TypeRegistry);
    var KeyAssignmentValidators = function(_TypeRegistry) {
      inherits(KeyAssignmentValidators, _TypeRegistry);
      function KeyAssignmentValidators(options) {
        classCallCheck(this, KeyAssignmentValidators);
        var _this = possibleConstructorReturn(this, (KeyAssignmentValidators.__proto__ || Object.getPrototypeOf(KeyAssignmentValidators)).call(this, options));
        _this.registerDefault((function() {
          return !0;
        }));
        _this.register("radio", (function(el) {
          return el.checked;
        }));
        return _this;
      }
      return KeyAssignmentValidators;
    }(TypeRegistry);
    function keySplitter(key) {
      var matches = key.match(/[^[\]]+/g), lastKey = void 0;
      if (key.length > 1 && key.indexOf("[]") === key.length - 2) {
        lastKey = matches.pop();
        matches.push([ lastKey ]);
      }
      return matches;
    }
    function getElementType(el) {
      var typeAttr = void 0, tagName = el.tagName, type = tagName;
      if ("input" === tagName.toLowerCase()) if (typeAttr = el.getAttribute("type")) type = typeAttr; else type = "text";
      return type.toLowerCase();
    }
    function getInputElements(element, options) {
      return Array.prototype.filter.call(element.querySelectorAll("input,select,textarea"), (function(el) {
        if ("input" === el.tagName.toLowerCase() && ("submit" === el.type || "reset" === el.type)) return !1;
        var myType = getElementType(el), identifier = options.keyExtractors.get(myType)(el), foundInInclude = -1 !== (options.include || []).indexOf(identifier), foundInExclude = -1 !== (options.exclude || []).indexOf(identifier), foundInIgnored = !1, reject = !1;
        if (options.ignoredTypes) {
          var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
          try {
            for (var _step, _iterator = options.ignoredTypes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
              var selector = _step.value;
              if (el.matches(selector)) foundInIgnored = !0;
            }
          } catch (err) {
            _didIteratorError = !0;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) _iterator.return();
            } finally {
              if (_didIteratorError) throw _iteratorError;
            }
          }
        }
        if (foundInInclude) reject = !1; else if (options.include) reject = !0; else reject = foundInExclude || foundInIgnored;
        return !reject;
      }));
    }
    function assignKeyValue(obj, keychain, value) {
      if (!keychain) return obj;
      var key = keychain.shift();
      if (!obj[key]) obj[key] = Array.isArray(key) ? [] : {};
      if (0 === keychain.length) if (!Array.isArray(obj[key])) obj[key] = value; else if (null !== value) obj[key].push(value);
      if (keychain.length > 0) assignKeyValue(obj[key], keychain, value);
      return obj;
    }
    function serialize(element) {
      var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, data = {};
      options.keySplitter = options.keySplitter || keySplitter;
      options.keyExtractors = new KeyExtractors(options.keyExtractors || {});
      options.inputReaders = new InputReaders(options.inputReaders || {});
      options.keyAssignmentValidators = new KeyAssignmentValidators(options.keyAssignmentValidators || {});
      Array.prototype.forEach.call(getInputElements(element, options), (function(el) {
        var type = getElementType(el), key = options.keyExtractors.get(type)(el), value = options.inputReaders.get(type)(el);
        if (options.keyAssignmentValidators.get(type)(el, key, value)) {
          var keychain = options.keySplitter(key);
          data = assignKeyValue(data, keychain, value);
        }
      }));
      return data;
    }
    var InputWriters = function(_TypeRegistry) {
      inherits(InputWriters, _TypeRegistry);
      function InputWriters(options) {
        classCallCheck(this, InputWriters);
        var _this = possibleConstructorReturn(this, (InputWriters.__proto__ || Object.getPrototypeOf(InputWriters)).call(this, options));
        _this.registerDefault((function(el, value) {
          el.value = value;
        }));
        _this.register("checkbox", (function(el, value) {
          if (null === value) el.indeterminate = !0; else el.checked = Array.isArray(value) ? -1 !== value.indexOf(el.value) : value;
        }));
        _this.register("radio", (function(el, value) {
          if (void 0 !== value) el.checked = el.value === value.toString();
        }));
        _this.register("select", setSelectValue);
        return _this;
      }
      return InputWriters;
    }(TypeRegistry);
    function setSelectValue(elem, value) {
      for (var optionSet, option, options = elem.options, values = function(arr) {
        var ret = [];
        if (null !== arr) if (Array.isArray(arr)) ret.push.apply(ret, arr); else ret.push(arr);
        return ret;
      }(value), i = options.length; i--; ) {
        option = options[i];
        if (values.indexOf(option.value) > -1) {
          option.setAttribute("selected", !0);
          optionSet = !0;
        }
      }
      if (!optionSet) elem.selectedIndex = -1;
    }
    function keyJoiner(parentKey, childKey) {
      return parentKey + "[" + childKey + "]";
    }
    function flattenData(data, parentKey) {
      var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, flatData = {}, keyJoiner$$ = options.keyJoiner || keyJoiner;
      for (var keyName in data) if (data.hasOwnProperty(keyName)) {
        var value = data[keyName], hash = {};
        if (parentKey) keyName = keyJoiner$$(parentKey, keyName);
        if (Array.isArray(value)) {
          hash[keyName + "[]"] = value;
          hash[keyName] = value;
        } else if ("object" === (void 0 === value ? "undefined" : _typeof(value))) hash = flattenData(value, keyName, options); else hash[keyName] = value;
        Object.assign(flatData, hash);
      }
      return flatData;
    }
    function deserialize(form, data) {
      var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, flattenedData = flattenData(data, null, options);
      options.keyExtractors = new KeyExtractors(options.keyExtractors || {});
      options.inputWriters = new InputWriters(options.inputWriters || {});
      Array.prototype.forEach.call(getInputElements(form, options), (function(el) {
        var type = getElementType(el), key = options.keyExtractors.get(type)(el);
        options.inputWriters.get(type)(el, flattenedData[key]);
      }));
    }
    var lz_string = __webpack_require__(972);
    class OnContextInvalidated {
      #timer;
      #controller=new AbortController;
      get signal() {
        if (this.#timer) return this.#controller.signal;
        this.#timer = setInterval((() => {
          if (wasContextInvalidated()) {
            this.#controller.abort();
            clearInterval(this.#timer);
          }
        }), 200);
        return this.#controller.signal;
      }
      get promise() {
        return new Promise((resolve => {
          this.addListener(resolve);
        }));
      }
      addListener(callback) {
        if (!this.signal.aborted) this.signal.addEventListener("abort", callback); else setTimeout(callback, 0);
      }
    }
    const onContextInvalidated = new OnContextInvalidated, wasContextInvalidated = () => !chrome.runtime?.id, storageKey = "__webext-events__startup", on_extension_start_event = new EventTarget;
    let hasRun = !1, hasListeners = !1;
    Object.freeze({
      addListener(callback) {
        if (hasRun) console.warn("onExtensionStart.addListener() was called after the extension started. The callback will not be called."); else {
          hasListeners = !0;
          on_extension_start_event.addEventListener("extension-start", callback);
        }
      }
    });
    setTimeout((async function() {
      hasRun = !0;
      if (!hasListeners) return;
      const storage = await chrome.storage.session.get(storageKey);
      if (!(storageKey in storage)) {
        await chrome.storage.session.set({
          [storageKey]: !0
        });
        on_extension_start_event.dispatchEvent(new Event("extension-start"));
      }
    }), 100);
    const filePickerOptions = {
      types: [ {
        accept: {
          "application/json": ".json"
        }
      } ]
    }, isModern = "function" == typeof showOpenFilePicker;
    const loadFile = isModern ? async function() {
      const [fileHandle] = await showOpenFilePicker(filePickerOptions);
      return (await fileHandle.getFile()).text();
    } : async function() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      const eventPromise = new Promise((resolve => {
        input.addEventListener("change", resolve, {
          once: !0
        });
      }));
      input.click();
      const file = (await eventPromise).target.files[0];
      if (!file) throw new Error("No file selected");
      return file.text();
    }, saveFile = isModern ? async function(text, suggestedName) {
      const fileHandle = await showSaveFilePicker({
        ...filePickerOptions,
        suggestedName
      }), writable = await fileHandle.createWritable();
      await writable.write(text);
      await writable.close();
    } : async function(text, suggestedName) {
      const url = `data:application/json;base64,${btoa(text)}`, link = document.createElement("a");
      link.download = suggestedName;
      link.href = url;
      link.click();
    }, {compressToEncodedURIComponent, decompressFromEncodedURIComponent} = lz_string;
    function alertAndThrow(message) {
      alert(message);
      throw new Error(message);
    }
    const webext_options_sync = class {
      static migrations={
        removeUnused(options, defaults) {
          for (const key of Object.keys(options)) if (!(key in defaults)) delete options[key];
        }
      };
      storageName;
      storageType;
      defaults;
      _form;
      _migrations;
      constructor({defaults = {}, storageName = "options", migrations = [], logging = !0, storageType = "sync"} = {}) {
        this.storageName = storageName;
        this.defaults = defaults;
        this.storageType = storageType;
        if (!logging) this._log = () => {};
        this._migrations = this._runMigrations(migrations);
      }
      get storage() {
        return webext_polyfill_kinda.storage[this.storageType];
      }
      async getAll() {
        await this._migrations;
        return this._getAll();
      }
      async setAll(newOptions) {
        await this._migrations;
        return this._setAll(newOptions);
      }
      async set(newOptions) {
        return this.setAll({
          ...await this.getAll(),
          ...newOptions
        });
      }
      async syncForm(form) {
        this._form = form instanceof HTMLFormElement ? form : document.querySelector(form);
        this._form.addEventListener("input", this._handleFormInput);
        this._form.addEventListener("submit", this._handleFormSubmit);
        chrome.storage.onChanged.addListener(this._handleStorageChangeOnForm);
        this._updateForm(this._form, await this.getAll());
        this._form.querySelector(".js-export")?.addEventListener("click", this.exportToFile);
        this._form.querySelector(".js-import")?.addEventListener("click", this.importFromFile);
        onContextInvalidated.addListener((() => {
          location.reload();
        }));
      }
      async stopSyncForm() {
        if (this._form) {
          this._form.removeEventListener("input", this._handleFormInput);
          this._form.removeEventListener("submit", this._handleFormSubmit);
          this._form.querySelector(".js-export")?.addEventListener("click", this.exportToFile);
          this._form.querySelector(".js-import")?.addEventListener("click", this.importFromFile);
          chrome.storage.onChanged.removeListener(this._handleStorageChangeOnForm);
          delete this._form;
        }
      }
      get _jsonIdentityHelper() {
        return "__webextOptionsSync";
      }
      importFromFile=async () => {
        const text = await loadFile();
        let options;
        try {
          options = JSON.parse(text);
        } catch {
          alertAndThrow("The file is not a valid JSON file.");
        }
        if (!(this._jsonIdentityHelper in options)) alertAndThrow("The file selected is not a valid recognized options file.");
        delete options[this._jsonIdentityHelper];
        await this.set(options);
        if (this._form) this._updateForm(this._form, options);
      };
      exportToFile=async () => {
        const extension = chrome.runtime.getManifest(), text = JSON.stringify({
          [this._jsonIdentityHelper]: extension.name,
          ...await this.getAll()
        }, null, "\t");
        await saveFile(text, extension.name + " options.json");
      };
      _log(method, ...args) {
        console[method](...args);
      }
      async _getAll() {
        const result = await this.storage.get(this.storageName);
        return this._decode(result[this.storageName]);
      }
      async _setAll(newOptions) {
        this._log("log", "Saving options", newOptions);
        await this.storage.set({
          [this.storageName]: this._encode(newOptions)
        });
      }
      _encode(options) {
        const thinnedOptions = {
          ...options
        };
        for (const [key, value] of Object.entries(thinnedOptions)) if (this.defaults[key] === value) delete thinnedOptions[key];
        this._log("log", "Without the default values", thinnedOptions);
        return compressToEncodedURIComponent(JSON.stringify(thinnedOptions));
      }
      _decode(options) {
        let decompressed = options;
        if ("string" == typeof options) decompressed = JSON.parse(decompressFromEncodedURIComponent(options));
        return {
          ...this.defaults,
          ...decompressed
        };
      }
      async _runMigrations(migrations) {
        if (0 === migrations.length || !node_modules_webext_detect_page_isBackground() || !await async function() {
          const self = await (webext_polyfill_kinda.management?.getSelf());
          if ("development" === self?.installType) return !0; else return new Promise((resolve => {
            chrome.runtime.onInstalled.addListener((() => {
              resolve(!0);
            }));
            setTimeout(resolve, 500, !1);
          }));
        }()) return;
        const options = await this._getAll(), initial = JSON.stringify(options);
        this._log("log", "Found these stored options", {
          ...options
        });
        this._log("info", "Will run", migrations.length, 1 === migrations.length ? "migration" : " migrations");
        for (const migrate of migrations) await migrate(options, this.defaults);
        if (initial !== JSON.stringify(options)) await this._setAll(options);
      }
      _handleFormInput=debounce(300, (async ({target}) => {
        const field = target;
        if (field.name) {
          await this.set(this._parseForm(field.form));
          field.form.dispatchEvent(new CustomEvent("options-sync:form-synced", {
            bubbles: !0
          }));
        }
      }));
      _handleFormSubmit(event) {
        event.preventDefault();
      }
      _updateForm(form, options) {
        const currentFormState = this._parseForm(form);
        for (const [key, value] of Object.entries(options)) if (currentFormState[key] === value) delete options[key];
        const include = Object.keys(options);
        if (include.length > 0) deserialize(form, options, {
          include
        });
      }
      _parseForm(form) {
        const include = [];
        for (const field of form.querySelectorAll("[name]")) if (field.validity.valid && !field.disabled) include.push(field.name.replace(/\[.*]/, ""));
        return serialize(form, {
          include
        });
      }
      _handleStorageChangeOnForm=(changes, areaName) => {
        if (areaName === this.storageType && this.storageName in changes && (!document.hasFocus() || !this._form.contains(document.activeElement))) this._updateForm(this._form, this._decode(changes[this.storageName].newValue));
      };
    };
    let webext_options_sync_per_domain_node_modules_webext_detect_page_cache = !0;
    function webext_options_sync_per_domain_node_modules_webext_detect_page_isCurrentPathname(path) {
      if (!path) return !1;
      try {
        const {pathname} = new URL(path, location.origin);
        return pathname === location.pathname;
      } catch {
        return !1;
      }
    }
    function webext_options_sync_per_domain_node_modules_webext_detect_page_getManifest(_version) {
      return globalThis.chrome?.runtime?.getManifest?.();
    }
    function webext_options_sync_per_domain_node_modules_webext_detect_page_once(function_) {
      let result;
      return () => {
        if (!webext_options_sync_per_domain_node_modules_webext_detect_page_cache || void 0 === result) result = function_();
        return result;
      };
    }
    const webext_options_sync_per_domain_node_modules_webext_detect_page_isWebPage = webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => [ "about:", "http:", "https:" ].includes(location.protocol))), webext_options_sync_per_domain_node_modules_webext_detect_page_isExtensionContext = webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => "object" == typeof globalThis.chrome?.extension)), webext_options_sync_per_domain_node_modules_webext_detect_page_isContentScript = webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => webext_options_sync_per_domain_node_modules_webext_detect_page_isExtensionContext() && webext_options_sync_per_domain_node_modules_webext_detect_page_isWebPage())), webext_options_sync_per_domain_node_modules_webext_detect_page_isBackgroundPage = webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => {
      const manifest = webext_options_sync_per_domain_node_modules_webext_detect_page_getManifest();
      if (manifest && webext_options_sync_per_domain_node_modules_webext_detect_page_isCurrentPathname(manifest.background_page ?? manifest.background?.page)) return !0; else return Boolean(manifest?.background?.scripts && webext_options_sync_per_domain_node_modules_webext_detect_page_isCurrentPathname("/_generated_background_page.html"));
    }));
    webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => webext_options_sync_per_domain_node_modules_webext_detect_page_isCurrentPathname(webext_options_sync_per_domain_node_modules_webext_detect_page_getManifest()?.background?.service_worker))), 
    webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => {
      const path = webext_options_sync_per_domain_node_modules_webext_detect_page_getManifest()?.options_ui?.page;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => {
      const path = webext_options_sync_per_domain_node_modules_webext_detect_page_getManifest()?.side_panel?.default_path;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), webext_options_sync_per_domain_node_modules_webext_detect_page_once((() => {
      const devtoolsPage = webext_options_sync_per_domain_node_modules_webext_detect_page_isExtensionContext() && chrome.devtools && webext_options_sync_per_domain_node_modules_webext_detect_page_getManifest()?.devtools_page;
      if ("string" != typeof devtoolsPage) return !1;
      return new URL(devtoolsPage, location.origin).pathname === location.pathname;
    }));
    function getManifestPermissionsSync() {
      return _getManifestPermissionsSync(chrome.runtime.getManifest());
    }
    function _getManifestPermissionsSync(manifest) {
      var _a, _b, _c;
      const manifestPermissions = {
        origins: [],
        permissions: []
      }, list = new Set([ ...null !== (_a = manifest.permissions) && void 0 !== _a ? _a : [], ...(null !== (_b = manifest.content_scripts) && void 0 !== _b ? _b : []).flatMap((config => {
        var _a;
        return null !== (_a = config.matches) && void 0 !== _a ? _a : [];
      })) ]);
      if (manifest.devtools_page && !(null === (_c = manifest.optional_permissions) || void 0 === _c ? void 0 : _c.includes("devtools"))) list.add("devtools");
      for (const permission of list) if (permission.includes("://")) manifestPermissions.origins.push(permission); else manifestPermissions.permissions.push(permission);
      return manifestPermissions;
    }
    const hostRegex = /:[/][/][*.]*([^/]+)/;
    function parseDomain(origin) {
      return origin.split(hostRegex)[1];
    }
    function _getAdditionalPermissions(manifestPermissions, currentPermissions, {strictOrigins = !0} = {}) {
      var _a, _b;
      const additionalPermissions = {
        origins: [],
        permissions: []
      };
      for (const origin of null !== (_a = currentPermissions.origins) && void 0 !== _a ? _a : []) if (!manifestPermissions.origins.includes(origin)) {
        if (!strictOrigins) {
          const domain = parseDomain(origin);
          if (manifestPermissions.origins.some((manifestOrigin => parseDomain(manifestOrigin) === domain))) continue;
        }
        additionalPermissions.origins.push(origin);
      }
      for (const permission of null !== (_b = currentPermissions.permissions) && void 0 !== _b ? _b : []) if (!manifestPermissions.permissions.includes(permission)) additionalPermissions.permissions.push(permission);
      return additionalPermissions;
    }
    var __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const defaultOrigins = mem((() => webext_patterns_patternToRegex(...getManifestPermissionsSync().origins)));
    function parseHost(origin) {
      return origin.includes("//") ? origin.split("/")[2].replace("*.", "") : origin;
    }
    class OptionsSyncPerDomain {
      static migrations=webext_options_sync.migrations;
      #defaultOptions;
      constructor(options) {
        this.#defaultOptions = {
          ...options,
          storageName: options.storageName ?? "options"
        };
        if (webext_options_sync_per_domain_node_modules_webext_detect_page_isBackgroundPage()) {
          if (options.migrations?.length > 0) this.getAllOrigins();
          chrome.permissions.onRemoved.addListener((({origins}) => {
            const storageKeysToRemove = (origins ?? []).filter((key => !defaultOrigins().test(key))).map((key => this.getStorageNameForOrigin(key)));
            chrome.storage.sync.remove(storageKeysToRemove);
          }));
        }
      }
      getOptionsForOrigin(origin = location.origin) {
        if (!origin.startsWith("http") || defaultOrigins().test(origin)) return new webext_options_sync(this.#defaultOptions); else return new webext_options_sync({
          ...this.#defaultOptions,
          storageName: this.getStorageNameForOrigin(origin)
        });
      }
      async getAllOrigins() {
        if (webext_options_sync_per_domain_node_modules_webext_detect_page_isContentScript()) throw new Error("This function only works on extension pages");
        const instances = new Map;
        instances.set("default", this.getOptionsForOrigin());
        const {origins} = await async function(options) {
          return new Promise((resolve => {
            chrome.permissions.getAll((currentPermissions => {
              const manifestPermissions = getManifestPermissionsSync();
              resolve(_getAdditionalPermissions(manifestPermissions, currentPermissions, options));
            }));
          }));
        }({
          strictOrigins: !1
        });
        for (const origin of origins) instances.set(parseHost(origin), this.getOptionsForOrigin(origin));
        return instances;
      }
      async syncForm(form) {
        if (webext_options_sync_per_domain_node_modules_webext_detect_page_isContentScript()) throw new Error("This function only works on extension pages");
        if ("string" == typeof form) form = document.querySelector(form);
        await this.getOptionsForOrigin().syncForm(form);
        const optionsByOrigin = await this.getAllOrigins();
        if (1 === optionsByOrigin.size) return Object.freeze({
          domainCount: 1,
          getSelectedDomain: () => "default",
          onChange() {}
        });
        const dropdown = document.createElement("select");
        dropdown.addEventListener("change", this._domainChangeHandler.bind(this));
        for (const domain of optionsByOrigin.keys()) {
          const option = document.createElement("option");
          option.value = domain;
          option.textContent = domain;
          dropdown.append(option);
        }
        const wrapper = document.createElement("p");
        wrapper.append("Domain selector: ", dropdown);
        wrapper.classList.add("OptionsSyncPerDomain-picker");
        form.prepend(wrapper, document.createElement("hr"));
        return Object.freeze({
          domainCount: optionsByOrigin.size,
          getSelectedDomain: () => dropdown.value,
          onChange(callback) {
            dropdown.addEventListener("change", (() => {
              callback(dropdown.value);
            }));
          }
        });
      }
      getStorageNameForOrigin(origin) {
        return this.#defaultOptions.storageName + "-" + parseHost(origin);
      }
      async _domainChangeHandler(event) {
        const dropdown = event.currentTarget;
        for (const [domain, options] of await this.getAllOrigins()) if (dropdown.value === domain) options.syncForm(dropdown.form); else options.stopSyncForm();
      }
    }
    __decorate([ memDecorator() ], OptionsSyncPerDomain.prototype, "getOptionsForOrigin", null);
    __decorate([ memDecorator() ], OptionsSyncPerDomain.prototype, "getAllOrigins", null);
    const defaults = Object.assign({
      actionUrl: "",
      customCSS: "",
      personalToken: "",
      logging: !1,
      logHTTP: !1
    }, Object.fromEntries(importedFeatures.map((id => [ `feature:${id}`, !0 ])))), renamedFeatures = new Map([ [ "separate-draft-pr-button", "one-click-pr-or-gist" ], [ "prevent-pr-commit-link-loss", "prevent-link-loss" ], [ "remove-projects-tab", "remove-unused-repo-tabs" ], [ "remove-unused-repo-tabs", "clean-repo-tabs" ], [ "more-dropdown", "clean-repo-tabs" ], [ "remove-diff-signs", "hide-diff-signs" ], [ "remove-label-faster", "quick-label-hiding" ], [ "edit-files-faster", "quick-file-edit" ], [ "edit-comments-faster", "quick-comment-edit" ], [ "delete-review-comments-faster", "quick-review-comment-deletion" ], [ "hide-comments-faster", "quick-comment-hiding" ], [ "faster-reviews", "quick-review" ], [ "faster-pr-diff-options", "quick-pr-diff-options" ], [ "hide-useless-comments", "hide-low-quality-comments" ], [ "hide-useless-newsfeed-events", "hide-newsfeed-noise" ], [ "hide-noisy-newsfeed-events", "hide-newsfeed-noise" ], [ "no-useless-split-diff-view", "no-unnecessary-split-diff-view" ], [ "unwrap-useless-dropdowns", "unwrap-unnecessary-dropdowns" ], [ "tag-changelog-link", "tag-changes-link" ], [ "navigate-pages-with-arrow-keys", "pagination-hotkey" ], [ "list-pr-for-branch", "list-prs-for-branch" ], [ "quick-label-hiding", "quick-label-removal" ], [ "next-scheduled-github-action", "github-actions-indicators" ], [ "raw-file-link", "more-file-links" ], [ "conversation-filters", "more-conversation-filters" ], [ "quick-pr-diff-options", "one-click-diff-options" ], [ "quick-review-buttons", "one-click-review-submission" ], [ "pull-request-hotkey", "pull-request-hotkeys" ], [ "first-published-tag-for-merged-pr", "closing-remarks" ], [ "scheduled-and-manual-workflow-indicators", "github-actions-indicators" ], [ "useful-forks", "fork-notice" ], [ "set-default-repositories-type-to-sources", "hide-user-forks" ], [ "highlight-deleted-and-added-files-in-diffs", "new-or-deleted-file" ], [ "enable-file-links-in-compare-view", "actionable-pr-view-file" ], [ "use-first-commit-message-for-new-prs", "pr-first-commit-title`" ] ]);
    function isFeatureDisabled(options, id) {
      return !1 === options[`feature:${id}`];
    }
    function getNewFeatureName(possibleFeatureName) {
      let newFeatureName = possibleFeatureName;
      for (;renamedFeatures.has(newFeatureName); ) newFeatureName = renamedFeatures.get(newFeatureName);
      return importedFeatures.includes(newFeatureName) ? newFeatureName : void 0;
    }
    const options_storage = new OptionsSyncPerDomain({
      defaults,
      migrations: [ function(options) {
        for (const [from, to] of renamedFeatures) if ("boolean" == typeof options[`feature:${from}`]) options[`feature:${to}`] = options[`feature:${from}`];
      }, OptionsSyncPerDomain.migrations.removeUnused ]
    }).getOptionsForOrigin(), splitDev = v => String(v).split("-"), splitSub = v => String(v).replace(/^[vr]/, "").replace(/([a-z]+)/gi, ".$1.").replace(/\.+/g, ".").split("."), offset = part => {
      if (isNaN(part)) return part; else return 5 + Number(part);
    }, parseSub = part => {
      if (void 0 === part) return 0;
      switch (part.toLowerCase()) {
       case "dev":
        return -5;

       case "alpha":
       case "a":
        return -4;

       case "beta":
       case "b":
        return -3;

       case "rc":
       case "c":
        return -2;

       case "pre":
        return -1;
      }
      return part;
    };
    function compareSubs(a, b) {
      for (let i = 0; i < a.length || i < b.length; i++) {
        const ai = offset(parseSub(a[i])), bi = offset(parseSub(b[i])), sort = String(ai).localeCompare(bi, "en", {
          numeric: !0
        });
        if (0 !== sort) return sort;
      }
      return 0;
    }
    function compareVersions(a, b) {
      if (a === b) return 0;
      const [aMain, aDev] = splitDev(a).map(splitSub), [bMain, bDev] = splitDev(b).map(splitSub), mainSort = compareSubs(aMain, bMain);
      if (0 !== mainSort) return mainSort;
      if (aDev && !bDev) return -1;
      if (!aDev && bDev) return 1;
      if (aDev && bDev) return compareSubs(aDev, bDev); else return 0;
    }
    const any = (raw, ...keys) => 0 === keys.length ? raw[0] : String.raw({
      raw
    }, ...keys), objectToString = Object.prototype.toString, uint8ArrayStringified = "[object Uint8Array]";
    function assertUint8Array(value) {
      if (!function(value) {
        if (!value) return !1;
        if (value.constructor === Uint8Array) return !0; else return objectToString.call(value) === uint8ArrayStringified;
      }(value)) throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof value}\``);
    }
    const cachedDecoder = new globalThis.TextDecoder;
    function assertString(value) {
      if ("string" != typeof value) throw new TypeError(`Expected \`string\`, got \`${typeof value}\``);
    }
    const cachedEncoder = new globalThis.TextEncoder;
    const MAX_BLOCK_SIZE = 65535;
    function stringToBase64(string, {urlSafe = !1} = {}) {
      assertString(string);
      return function(array, {urlSafe = !1} = {}) {
        assertUint8Array(array);
        let base64;
        if (array.length < MAX_BLOCK_SIZE) base64 = globalThis.btoa(String.fromCodePoint.apply(this, array)); else {
          base64 = "";
          for (const value of array) base64 += String.fromCodePoint(value);
          base64 = globalThis.btoa(base64);
        }
        return urlSafe ? function(base64) {
          return base64.replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
        }(base64) : base64;
      }(function(string) {
        assertString(string);
        return cachedEncoder.encode(string);
      }(string), {
        urlSafe
      });
    }
    function base64ToString(base64String) {
      assertString(base64String);
      return function(array) {
        assertUint8Array(array);
        return cachedDecoder.decode(array);
      }(function(base64String) {
        assertString(base64String);
        return Uint8Array.from(globalThis.atob(base64String.replaceAll("-", "+").replaceAll("_", "/")), (x => x.codePointAt(0)));
      }(base64String));
    }
    Array.from({
      length: 256
    }, ((_, index) => index.toString(16).padStart(2, "0")));
    var browser = __webpack_require__(131);
    const {version} = browser.runtime.getManifest();
    function isDevelopmentVersion() {
      return "0.0.0" === version;
    }
    var hotfix_browser = __webpack_require__(131);
    const {version: currentVersion} = hotfix_browser.runtime.getManifest();
    async function fetchHotfix(path) {
      const request = await fetch(`https://api.github.com/repos/refined-github/yolo/contents/${path}`), {content} = await request.json();
      if (content) return base64ToString(content).trim(); else return "";
    }
    const brokenFeatures = new CachedFunction("broken-features", {
      async updater() {
        const content = await fetchHotfix("broken-features.csv");
        if (!content) return [];
        const storage = [];
        for (const [featureID, relatedIssue, unaffectedVersion] of function(content) {
          const lines = [], [_header, ...rawLines] = content.trim().split("\n");
          for (const line of rawLines) if (line.trim()) lines.push(line.split(",").map((cell => cell.trim())));
          return lines;
        }(content)) if (featureID && relatedIssue && (!unaffectedVersion || compareVersions(unaffectedVersion, currentVersion) > 0)) storage.push([ featureID, relatedIssue, unaffectedVersion ]);
        return storage;
      },
      maxAge: {
        hours: 6
      },
      staleWhileRevalidate: {
        days: 30
      }
    });
    new CachedFunction("style-hotfixes", {
      updater: async version => fetchHotfix(`style/${version}.css`),
      maxAge: {
        hours: 6
      },
      staleWhileRevalidate: {
        days: 300
      },
      cacheKey: () => ""
    });
    async function getLocalHotfixesAsOptions() {
      const options = {};
      for (const [feature] of await async function() {
        if (isDevelopmentVersion()) return []; else return await brokenFeatures.get() ?? [];
      }()) options[`feature:${feature}`] = !1;
      return options;
    }
    async function applyStyleHotfixes(style) {
      if (!isDevelopmentVersion() && !isEnterprise() && style) document.body.prepend(dom_chef.createElement("style", null, style));
    }
    let localStrings = {};
    function _(...arguments_) {
      const original = any(...arguments_);
      return localStrings[original] ?? original;
    }
    async function preloadSyncLocalStrings() {
      if (!isDevelopmentVersion() && !isEnterprise()) localStrings = await localStringsHotfix.get() ?? {};
    }
    const localStringsHotfix = new CachedFunction("strings-hotfixes", {
      async updater() {
        const json = await fetchHotfix("strings.json");
        return json ? JSON.parse(json) : {};
      },
      maxAge: {
        hours: 6
      },
      staleWhileRevalidate: {
        days: 30
      }
    });
    var feature_manager_browser = __webpack_require__(131);
    const {version: feature_manager_version} = feature_manager_browser.runtime.getManifest(), currentFeatureControllers = new ArrayMap;
    const log = {
      info: console.log,
      http: console.log,
      error: function(url, error) {
        const id = getFeatureID(url), message = error instanceof Error ? error.message : String(error);
        if (message.includes("token")) {
          console.log("ℹ️", id, "→", message);
          return;
        }
        const searchIssueUrl = new URL("https://github.com/refined-github/refined-github/issues");
        searchIssueUrl.searchParams.set("q", `is:issue is:open label:bug ${id}`);
        const newIssueUrl = new URL("https://github.com/refined-github/refined-github/issues/new");
        newIssueUrl.searchParams.set("template", "1_bug_report.yml");
        newIssueUrl.searchParams.set("title", `\`${id}\`: ${message}`);
        newIssueUrl.searchParams.set("repro", location.href);
        newIssueUrl.searchParams.set("description", [ "```", String(error instanceof Error ? error.stack : error).trim(), "```" ].join("\n"));
        console.group(`❌ ${id}`);
        console.log(`📕 ${feature_manager_version} ${isEnterprise() ? "GHE →" : "→"}`, error);
        console.log("🔍 Search issue", searchIssueUrl.href);
        console.log("🚨 Report issue", newIssueUrl.href);
        console.groupEnd();
      }
    }, globalReady = new Promise((async resolve => {
      const [options, localHotfixes, bisectedFeatures] = await Promise.all([ options_storage.getAll(), getLocalHotfixesAsOptions(), bisectFeatures(), preloadSyncLocalStrings() ]);
      await async function(condition) {
        for (;!condition(); ) await node_modules_delay(10);
      }((() => document.body));
      if ("Server Error · GitHub" !== document.title && "Unicorn! · GitHub" !== document.title && "504 Gateway Time-out" !== document.title && "Confirm password" !== document.title && "Confirm access" !== document.title) if (!elementExists("[refined-github]")) {
        document.documentElement.setAttribute("refined-github", "");
        feature_manager_browser.runtime.sendMessage({
          getStyleHotfixes: !0
        }).then(applyStyleHotfixes);
        if (options.customCSS.trim().length > 0) document.head.append(dom_chef.createElement("style", null, options.customCSS));
        if (bisectedFeatures) Object.assign(options, bisectedFeatures); else {
          brokenFeatures.get();
          Object.assign(options, localHotfixes);
        }
        log.info = options.logging ? console.log : () => {};
        log.http = options.logHTTP ? console.log : () => {};
        if (elementExists("body.logged-out")) {
          console.warn("Refined GitHub is only expected to work when you’re logged in to GitHub. Errors will not be shown.");
          features.log.error = () => {};
        }
        resolve(options);
      } else console.warn(function(string) {
        const indent = min_indent(string);
        if (0 === indent) return string;
        const regex = new RegExp(`^[ \\t]{${indent}}`, "gm");
        return string.replace(regex, "");
      }("\n\t\t\tRefined GitHub has been loaded twice. This may be because:\n\n\t\t\t• You loaded the developer version, or\n\t\t\t• The extension just updated\n\n\t\t\tIf you see this at every load, please open an issue mentioning the browser you're using and the URL where this appears.\n\t\t"));
    }));
    async function setupPageLoad(id, config) {
      const {asLongAs, include, exclude, init, additionalListeners, onlyAdditionalListeners, shortcuts} = config;
      if (!await async function({asLongAs = [ () => !0 ], include = [ () => !0 ], exclude = [ () => !1 ]}) {
        return await pEveryFunction(asLongAs, (c => c())) && await pSomeFunction(include, (c => c())) && pEveryFunction(exclude, (async c => !await c()));
      }({
        asLongAs,
        include,
        exclude
      })) return;
      const featureController = new AbortController;
      currentFeatureControllers.append(id, featureController);
      const runFeature = async () => {
        await async function(iterable, iteratee) {
          await Promise.all([ ...iterable ].map((async item => iteratee(item))));
        }((value = init, Array.isArray(value) ? value : [ value ]), (async init2 => {
          let result;
          try {
            result = await init2(featureController.signal);
            if (!1 !== result && !isFeaturePrivate(id)) {
              log.info("✅", id);
              for (const [hotkey, description] of Object.entries(shortcuts)) shortcutMap.set(hotkey, description);
            }
          } catch (error) {
            log.error(id, error);
          }
          if (result) onAbort(featureController, result);
        }));
        var value;
      };
      if (!onlyAdditionalListeners) await runFeature();
      await dom_loaded;
      for (const listener of additionalListeners) {
        const deinit = listener(runFeature, featureController.signal);
        if (deinit && !(deinit instanceof Promise)) onAbort(featureController, deinit);
      }
    }
    const shortcutMap = new Map, getFeatureID = url => url.split("/").pop().split(".")[0];
    async function add(url, ...loaders) {
      const id = getFeatureID(url);
      if (!isFeatureDisabled(await globalReady, id) || isFeaturePrivate(id)) for (const loader of loaders) {
        const {shortcuts = {}, asLongAs, include, exclude, init, awaitDomReady = !1, deduplicate = !1, onlyAdditionalListeners = !1, additionalListeners = []} = loader;
        if (0 === include?.length) throw new Error(`${id}: \`include\` cannot be an empty array, it means "run nowhere"`);
        if (is404() && !include?.includes(is404) && !asLongAs?.includes(is404)) continue;
        const details = {
          asLongAs,
          include,
          exclude,
          init,
          additionalListeners,
          onlyAdditionalListeners,
          shortcuts
        };
        if (awaitDomReady) (async () => {
          await dom_loaded;
          await setupPageLoad(id, details);
        })(); else setupPageLoad(id, details);
        document.addEventListener("turbo:render", (() => {
          if (!deduplicate || !elementExists(deduplicate)) setupPageLoad(id, details);
        }));
      } else log.info("↩️", "Skipping", id);
    }
    document.addEventListener("turbo:render", (() => {
      for (const feature of currentFeatureControllers.values()) for (const controller of feature) controller.abort();
      currentFeatureControllers.clear();
    }));
    add("rgh-deduplicator", {
      awaitDomReady: !0,
      async init() {
        await Promise.resolve();
        select_dom_$("has-rgh")?.remove();
        select_dom_$(_`#js-repo-pjax-container, #js-pjax-container`)?.append(dom_chef.createElement("has-rgh", null));
        select_dom_$(_`turbo-frame`)?.append(dom_chef.createElement("has-rgh-inner", null));
      }
    });
    const features = {
      add,
      unload: function(featureUrl) {
        const id = getFeatureID(featureUrl);
        for (const controller of currentFeatureControllers.get(id) ?? []) controller.abort();
      },
      addCssFeature: async function(url, include) {
        const id = getFeatureID(url);
        add(id, {
          include,
          init() {
            document.documentElement.setAttribute("rgh-" + id, "");
          }
        });
      },
      log,
      shortcutMap,
      getFeatureID,
      getIdentifiers: function(url) {
        const id = getFeatureID(url);
        return {
          id,
          class: "rgh-" + id,
          selector: ".rgh-" + id
        };
      }
    }, feature_manager = features;
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/align-issue-labels.tsx", [ isIssueOrPRList ]);
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/clean-pinned-issues.tsx", [ isRepoIssueList ]);
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/hide-newsfeed-noise.tsx", [ isDashboard ]);
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/hide-diff-signs.tsx", [ hasCode, isEditingFile ]);
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/clean-rich-text-editor.tsx", [ hasRichTextEditor ]);
    const mimic_function_copyProperty = (to, from, property, ignoreNonConfigurable) => {
      if ("length" === property || "prototype" === property) return;
      if ("arguments" === property || "caller" === property) return;
      const toDescriptor = Object.getOwnPropertyDescriptor(to, property), fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
      if (mimic_function_canCopyProperty(toDescriptor, fromDescriptor) || !ignoreNonConfigurable) Object.defineProperty(to, property, fromDescriptor);
    }, mimic_function_canCopyProperty = function(toDescriptor, fromDescriptor) {
      return void 0 === toDescriptor || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
    }, mimic_function_changePrototype = (to, from) => {
      const fromPrototype = Object.getPrototypeOf(from);
      if (fromPrototype !== Object.getPrototypeOf(to)) Object.setPrototypeOf(to, fromPrototype);
    }, mimic_function_wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`, mimic_function_toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), mimic_function_toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), mimic_function_changeToString = (to, from, name) => {
      const withName = "" === name ? "" : `with ${name.trim()}() `, newToString = mimic_function_wrappedToString.bind(null, withName, from.toString());
      Object.defineProperty(newToString, "name", mimic_function_toStringName);
      Object.defineProperty(to, "toString", {
        ...mimic_function_toStringDescriptor,
        value: newToString
      });
    };
    function mimic_function_mimicFunction(to, from, {ignoreNonConfigurable = !1} = {}) {
      const {name} = to;
      for (const property of Reflect.ownKeys(from)) mimic_function_copyProperty(to, from, property, ignoreNonConfigurable);
      mimic_function_changePrototype(to, from);
      mimic_function_changeToString(to, from, name);
      return to;
    }
    const calledFunctions = new WeakMap, onetime = (function_, options = {}) => {
      if ("function" != typeof function_) throw new TypeError("Expected a function");
      let returnValue, callCount = 0;
      const functionName = function_.displayName || function_.name || "<anonymous>", onetime = function(...arguments_) {
        calledFunctions.set(onetime, ++callCount);
        if (1 === callCount) {
          returnValue = function_.apply(this, arguments_);
          function_ = void 0;
        } else if (!0 === options.throw) throw new Error(`Function \`${functionName}\` can only be called once`);
        return returnValue;
      };
      mimic_function_mimicFunction(onetime, function_);
      calledFunctions.set(onetime, callCount);
      return onetime;
    };
    onetime.callCount = function_ => {
      if (!calledFunctions.has(function_)) throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
      return calledFunctions.get(function_);
    };
    const node_modules_onetime = onetime, dist_cacheStore = new WeakMap, cacheTimerStore = new WeakMap;
    function memoize(fn, {cacheKey, cache = new Map, maxAge} = {}) {
      if (0 === maxAge) return fn;
      if ("number" == typeof maxAge) {
        const maxSetIntervalValue = 2147483647;
        if (maxAge > maxSetIntervalValue) throw new TypeError(`The \`maxAge\` option cannot exceed ${maxSetIntervalValue}.`);
        if (maxAge < 0) throw new TypeError("The `maxAge` option should not be a negative number.");
      }
      const memoized = function(...arguments_) {
        const key = cacheKey ? cacheKey(arguments_) : arguments_[0], cacheItem = cache.get(key);
        if (cacheItem) return cacheItem.data;
        const result = fn.apply(this, arguments_);
        cache.set(key, {
          data: result,
          maxAge: maxAge ? Date.now() + maxAge : Number.POSITIVE_INFINITY
        });
        if ("number" == typeof maxAge && maxAge !== Number.POSITIVE_INFINITY) {
          const timer = setTimeout((() => {
            cache.delete(key);
          }), maxAge);
          timer.unref?.();
          const timers = cacheTimerStore.get(fn) ?? new Set;
          timers.add(timer);
          cacheTimerStore.set(fn, timers);
        }
        return result;
      };
      mimic_function_mimicFunction(memoized, fn, {
        ignoreNonConfigurable: !0
      });
      dist_cacheStore.set(memoized, cache);
      return memoized;
    }
    const repoUnderlineNavUl = ".js-responsive-underlinenav ul.UnderlineNav-body", standaloneGistLinkInMarkdown = any`
	.js-comment-body p a:only-child:is(
		[href^="https://gist.github.com/"],
		[href^="${location.origin}/gist/"]
	)
`, repoUnderlineNavDropdownUl = ".js-responsive-underlinenav action-menu ul", branchSelector = '[data-hotkey="w"]', directoryListingFileIcon = [ ".react-directory-filename-column > :is(svg, img).color-fg-muted", ".js-navigation-container .octicon-file" ], openPrsListLink = any`
	.js-issue-row:has(
		.octicon-git-pull-request.color-fg-open,
		.octicon-git-pull-request-draft
	) a.js-navigation-open
`, codeSearchHeader = any`
	div:has(
		> [aria-label^="Collapse "],
		> [aria-label^="Expand "]
	)
`, github_helpers_getUsername = node_modules_onetime(utils.getUsername), {getRepositoryInfo: github_helpers_getRepo, getCleanPathname: github_helpers_getCleanPathname} = utils;
    function getConversationNumber() {
      if (isPR() || isIssue()) return Number(location.pathname.split("/")[4]);
    }
    const isMac = navigator.userAgent.includes("Macintosh");
    function buildRepoURL(...pathParts) {
      for (const part of pathParts) if ("string" == typeof part && /^\/|\/$/.test(part)) throw new TypeError("The path parts shouldn’t start or end with a slash: " + part);
      return [ location.origin, github_helpers_getRepo()?.nameWithOwner, ...pathParts ].join("/");
    }
    function getForkedRepo() {
      return select_dom_$('meta[name="octolytics-dimension-repository_parent_nwo"]')?.content;
    }
    function parseTag(tag) {
      const [, namespace = "", version = ""] = /(?:(.*)@)?([^@]+)/.exec(tag) ?? [];
      return {
        namespace,
        version
      };
    }
    function isUsernameAlreadyFullName(username, realname) {
      return (username = username.replaceAll("-", "").toLowerCase()) === (realname = realname.normalize("NFD").replaceAll(/[\u0300-\u036F\W.]/g, "").toLowerCase());
    }
    const validVersion = /^[vr]?\d+(?:\.\d+)+/, isPrerelease = /^[vr]?\d+(?:\.\d+)+(-\d)/;
    const isPermalink = memoize((async () => {
      if (/^[\da-f]{40}$/.test(location.pathname.split("/")[4])) return !0; else return elementExists(".octicon-tag", await elementReady(branchSelector));
    }), {
      cacheKey: () => location.pathname
    });
    function isRefinedGitHubRepo() {
      return location.pathname.startsWith("/refined-github/refined-github");
    }
    function isAnyRefinedGitHubRepo() {
      return /^\/refined-github\/.+/.test(location.pathname);
    }
    async function isArchivedRepoAsync() {
      await elementReady("main > div");
      return isArchivedRepo();
    }
    const userCanLikelyMergePR = () => elementExists(".discussion-sidebar-item .octicon-lock"), cacheByRepo = () => github_helpers_getRepo().nameWithOwner, isRepoCommitListRoot = () => isRepoCommitList() && document.title.startsWith("Commits"), isUrlReachable = memoize((async url => {
      const {ok} = await fetch(url, {
        method: "head"
      });
      return ok;
    }));
    function extractCurrentBranchFromBranchPicker(branchPicker) {
      return "Switch branches or tags" === branchPicker.title ? branchPicker.textContent.trim() : branchPicker.title;
    }
    function triggerRepoNavOverflow() {
      window.dispatchEvent(new Event("resize"));
    }
    function triggerActionBarOverflow(child) {
      const parent = child.closest("action-bar"), placeholder = document.createElement("div");
      parent.replaceWith(placeholder);
      placeholder.replaceWith(parent);
    }
    const settings = options_storage.getAll();
    async function getToken() {
      const {personalToken} = await settings;
      return personalToken;
    }
    async function expectToken() {
      const personalToken = await getToken();
      if (!personalToken) throw new Error("Personal token required for this feature");
      return personalToken;
    }
    async function expectTokenScope(scope) {
      const {headers} = await v3("/"), tokenScopes = await async function(headers) {
        const scopesHeader = headers.get("X-OAuth-Scopes");
        if (!scopesHeader) return [];
        const scopes = scopesHeader.split(", ");
        scopes.push("valid_token");
        if (scopes.includes("repo")) scopes.push("public_repo");
        if (scopes.includes("project")) scopes.push("read:project");
        return scopes;
      }(headers);
      if (!tokenScopes.includes(scope)) throw new Error("The token you provided does not have " + (tokenScopes.length > 0 ? `the \`${scope}\` scope. It only includes \`${tokenScopes.join(", ")}\`.` : "any scope. You can change the scope of your token at https://github.com/settings/tokens"));
    }
    const escapeKey = (...keys) => "_" + String(keys).replaceAll(/[^a-z\d]/gi, "_");
    class RefinedGitHubAPIError extends Error {
      response={};
      constructor(...messages) {
        super(messages.join("\n"));
      }
    }
    const api3 = isEnterprise() ? `${location.origin}/api/v3/` : "https://api.github.com/", api4 = isEnterprise() ? `${location.origin}/api/graphql` : "https://api.github.com/graphql", v3defaults = {
      ignoreHTTPStatus: !1,
      method: "GET",
      body: void 0,
      json: !0
    }, v4defaults = {
      allowErrors: !1
    }, v3 = memoize((async (query, options = v3defaults) => {
      const {ignoreHTTPStatus, method, body, headers, json} = {
        ...v3defaults,
        ...options
      }, personalToken = await getToken();
      if (!query.startsWith("https")) query = query.startsWith("/") ? query.slice(1) : [ "repos", github_helpers_getRepo().nameWithOwner, query ].filter(Boolean).join("/");
      const url = new URL(query, api3);
      feature_manager.log.http(url);
      const response = await fetch(url.href, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          "User-Agent": "Refined GitHub",
          Accept: "application/vnd.github.v3+json",
          ...headers,
          ...personalToken && {
            Authorization: `token ${personalToken}`
          }
        }
      }), textContent = await response.text(), apiResponse = json ? JSON.parse(textContent) : {
        textContent
      };
      if (response.ok || ignoreHTTPStatus) return Object.assign(apiResponse, {
        httpStatus: response.status,
        headers: response.headers,
        ok: response.ok
      });
      throw await getError(apiResponse);
    }), {
      cacheKey: JSON.stringify
    }), v4uncached = async (query, options = v4defaults) => {
      const personalToken = await getToken(), currentRepoIfAny = github_helpers_getRepo(), variables = {}, parameters = [];
      if ((query = query.replace("repository() {", (() => "repository(owner: $owner, name: $name) {"))).includes("$owner")) {
        variables.owner = currentRepoIfAny.owner;
        parameters.push("$owner: String!");
      }
      if (query.includes("$name")) {
        variables.name = currentRepoIfAny.name;
        parameters.push("$name: String!");
      }
      Object.assign(variables, options.variables);
      const fullQuery = /^\s*(query|mutation)/.test(query) ? query : 0 === parameters.length ? `query {${query}}` : `query (${parameters.join(",")}) {${query}}`;
      feature_manager.log.http(fullQuery);
      const response = await fetch(api4, {
        headers: {
          "User-Agent": "Refined GitHub",
          "Content-Type": "application/json",
          Authorization: `bearer ${personalToken}`
        },
        method: "POST",
        body: JSON.stringify({
          variables,
          query: fullQuery
        })
      }), apiResponse = await response.json(), {data = {}, errors = []} = apiResponse;
      if (errors.length > 0 && !options.allowErrors) throw new RefinedGitHubAPIError("GraphQL:", ...errors.map((error => error.message)));
      if (response.ok) return data;
      throw await getError(apiResponse);
    }, v4 = memoize(v4uncached, {
      cacheKey([query, options]) {
        const key = [ query, options ];
        if (query.includes("repository() {") || query.includes("owner: $owner, name: $name")) key.push(github_helpers_getRepo()?.nameWithOwner);
        return JSON.stringify(key);
      }
    });
    async function getError(apiResponse) {
      const personalToken = await getToken();
      if (apiResponse.message?.includes("API rate limit exceeded")) return new RefinedGitHubAPIError("Rate limit exceeded.", personalToken ? "It may be time for a walk! 🍃 🌞" : "Set your token in the options or take a walk! 🍃 🌞");
      if ("Bad credentials" === apiResponse.message) return new RefinedGitHubAPIError("The token seems to be incorrect or expired. Update it in the options.");
      const error = new RefinedGitHubAPIError("Unable to fetch.", personalToken ? "Ensure that your token has access to this repo." : "Maybe adding a token in the options will fix this issue.", JSON.stringify(apiResponse, null, "\t"));
      error.response = apiResponse;
      return error;
    }
    const typesWithGitRef = new Set([ "tree", "blob", "blame", "edit", "commit", "commits", "compare" ]), titleWithGitRef = / at (?<branch>[.\w-/]+)( · [\w-]+\/[\w-]+)?$/i;
    function getCurrentGitRef() {
      const picker = select_dom_$(branchSelector), refViaPicker = picker && extractCurrentBranchFromBranchPicker(picker);
      if (refViaPicker) return refViaPicker;
      const branchFromFeed = function() {
        const feedLink = isRepoCommitList() && select_dom_$('link[type="application/atom+xml"]');
        if (!feedLink) return;
        return new URL(feedLink.href).pathname.split("/").slice(4).join("/").replace(/\.atom$/, "");
      }();
      if (branchFromFeed) return branchFromFeed; else return function(pathname, title) {
        if (!pathname.startsWith("/")) throw new TypeError(`Expected pathname starting with /, got "${pathname}"`);
        const [type, gitRefIfNonSlashed] = pathname.split("/").slice(3);
        if (!type || !typesWithGitRef.has(type)) return;
        const parsedTitle = titleWithGitRef.exec(title);
        if (parsedTitle) return parsedTitle.groups.branch;
        return gitRefIfNonSlashed;
      }(location.pathname, document.title);
    }
    class GitHubFileURL {
      user="";
      repository="";
      route="";
      branch="";
      filePath="";
      internalUrl;
      constructor(url) {
        this.internalUrl = new URL(url);
        this.pathname = this.internalUrl.pathname;
      }
      toString() {
        return this.href;
      }
      assign(...replacements) {
        Object.assign(this, ...replacements);
        return this;
      }
      disambiguateReference(ambiguousReference) {
        const branch = ambiguousReference[0], filePathFromSearch = this.searchParams.getAll("path[]").join("/");
        if (filePathFromSearch) {
          this.searchParams.delete("path[]");
          return {
            branch,
            filePath: filePathFromSearch
          };
        }
        const filePath = ambiguousReference.slice(1).join("/"), currentBranch = getCurrentGitRef(), currentBranchSections = currentBranch?.split("/");
        if (!currentBranch || !currentBranchSections || 1 === ambiguousReference.length || 1 === currentBranchSections.length) return {
          branch,
          filePath
        };
        for (const [index, section] of currentBranchSections.entries()) if (ambiguousReference[index] !== section) {
          console.warn(`The supplied path (${ambiguousReference.join("/")}) is ambiguous (current reference is \`${currentBranch}\`)`);
          return {
            branch,
            filePath
          };
        }
        return {
          branch: currentBranch,
          filePath: ambiguousReference.slice(currentBranchSections.length).join("/")
        };
      }
      get pathname() {
        return `/${this.user}/${this.repository}/${this.route}/${this.branch}/${this.filePath}`.replaceAll(/((undefined)?\/)+$/g, "");
      }
      set pathname(pathname) {
        const [user, repository, route, ...ambiguousReference] = pathname.replaceAll(/^\/|\/$/g, "").split("/");
        if (isRepoRoot() || 2 === ambiguousReference.length && ambiguousReference[1].includes("%2F")) {
          const branch2 = ambiguousReference.join("/").replaceAll("%2F", "/");
          this.assign({
            user,
            repository,
            route,
            branch: branch2,
            filePath: ""
          });
          return;
        }
        const {branch, filePath} = this.disambiguateReference(ambiguousReference);
        this.assign({
          user,
          repository,
          route,
          branch,
          filePath
        });
      }
      get href() {
        this.internalUrl.pathname = this.pathname;
        return this.internalUrl.href;
      }
      set href(href) {
        this.internalUrl.href = href;
      }
      get hash() {
        return this.internalUrl.hash;
      }
      set hash(hash) {
        this.internalUrl.hash = hash;
      }
      get search() {
        return this.internalUrl.search;
      }
      set search(search) {
        this.internalUrl.search = search;
      }
      get searchParams() {
        return this.internalUrl.searchParams;
      }
    }
    const defaultBranchOfRepo = new CachedFunction("default-branch", {
      async updater(repository) {
        if (!repository) throw new Error("getDefaultBranch was called on a non-repository page");
        return (({nameWithOwner}) => Boolean(github_helpers_getRepo()?.nameWithOwner === nameWithOwner))(repository) && await async function() {
          if (![ "", "commits" ].includes(github_helpers_getRepo().path)) return;
          const element = await elementReady(branchSelector);
          if (element) return extractCurrentBranchFromBranchPicker(element);
        }() || async function(repository) {
          return (await v4("query getDefaultBranch($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tdefaultBranchRef {\n\t\t\tname\n\t\t}\n\t}\n}\n", {
            variables: {
              owner: repository.owner,
              name: repository.name
            }
          })).repository.defaultBranchRef.name;
        }(repository);
      },
      maxAge: {
        hours: 1
      },
      staleWhileRevalidate: {
        days: 20
      },
      cacheKey: ([repository]) => repository.nameWithOwner
    });
    async function getDefaultBranch() {
      return defaultBranchOfRepo.get(github_helpers_getRepo());
    }
    function getCallerID(ancestor = 1) {
      return function(string) {
        let hash = 0;
        for (const character of string) hash = (hash << 5) - hash + character.codePointAt(0);
        return String(Math.trunc(hash));
      }((stack = new Error("Get stack").stack, line = ancestor + 1, stack.replace("Error: Get stack\n", "").split("\n").at(line) ?? function(stack, line) {
        console.warn("The stack doesn’t have the line", {
          line,
          stack
        });
        return Math.random().toString(16);
      }(stack, line)));
      var stack, line;
    }
    const animation = "rgh-selector-observer", getListener = (seenMark, selector, callback, signal) => event => {
      const target = event.target;
      if (!target.classList.contains(seenMark) && target.matches(selector)) {
        target.classList.add(seenMark);
        callback(target, {
          signal
        });
      }
    }, registerAnimation = node_modules_onetime((() => {
      document.head.append(dom_chef.createElement("style", null, `@keyframes ${animation} {}`));
    }));
    function observe(selectors, listener, {signal} = {}) {
      if (signal?.aborted) return;
      const selector = String(selectors), seenMark = "rgh-seen-" + getCallerID();
      registerAnimation();
      const rule = document.createElement("style");
      if (isDevelopmentVersion()) rule.setAttribute("s", selector);
      rule.textContent = any`
		:where(${String(selector)}):not(.${seenMark}) {
			animation: 1ms ${animation};
		}
	`;
      document.body.prepend(rule);
      signal?.addEventListener("abort", (() => {
        rule.remove();
      }));
      window.addEventListener("animationstart", getListener(seenMark, selector, listener, signal), {
        signal
      });
    }
    const useful_not_found_page_namespaceObject = "query GetLatestCommitToFile(\n\t$owner: String!\n\t$name: String!\n\t$branch: String!\n\t$filePath: String!\n) {\n\trepository(owner: $owner, name: $name) {\n\t\tobject(expression: $branch) {\n\t\t\t... on Commit {\n\t\t\t\thistory(first: 1, path: $filePath) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\toid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n";
    function getType() {
      return location.pathname.split("/").pop().includes(".") ? "file" : "object";
    }
    function getStrikeThrough(text) {
      return dom_chef.createElement("del", {
        className: "color-fg-subtle"
      }, text);
    }
    async function crossIfNonExistent(anchor) {
      if (anchor instanceof HTMLAnchorElement && !await isUrlReachable(anchor.href)) anchor.replaceWith(getStrikeThrough(anchor.textContent));
    }
    function parseCurrentURL() {
      const parts = github_helpers_getCleanPathname().split("/");
      if ("blob" === parts[2]) parts[2] = "tree";
      return parts;
    }
    async function showDefaultBranchLink() {
      const urlToFileOnDefaultBranch = await async function() {
        const parsedUrl = new GitHubFileURL(location.href);
        if (!parsedUrl.branch) return;
        parsedUrl.assign({
          branch: await getDefaultBranch()
        });
        const urlOnDefault = parsedUrl.href;
        if (urlOnDefault !== location.href && await isUrlReachable(urlOnDefault)) return urlOnDefault; else return;
      }();
      if (urlToFileOnDefaultBranch) select_dom_$("main > .container-lg").before(dom_chef.createElement("p", {
        className: "container mt-4 text-center"
      }, dom_chef.createElement("a", {
        href: urlToFileOnDefaultBranch
      }, "This ", getType()), " exists on the default branch."));
    }
    async function getGitObjectHistoryLink() {
      const url = new GitHubFileURL(location.href);
      if (!url.branch || !url.filePath) return;
      const commitSha = await async function(branch, filePath) {
        const {repository} = await v4(useful_not_found_page_namespaceObject, {
          variables: {
            branch,
            filePath
          }
        }), commit = repository.object?.history.nodes[0];
        return commit?.oid;
      }(url.branch, url.filePath);
      if (!commitSha) return;
      const fileChanges = await async function(sha, filePath) {
        const commit = await v3(`commits/${sha}`);
        for (const fileInfo of commit.files) if ([ fileInfo.filename, fileInfo.previous_filename ].includes(filePath)) return {
          commit: {
            parentSha: commit.parents[0].sha,
            date: commit.commit.committer.date,
            url: commit.html_url
          },
          file: fileInfo
        };
      }(commitSha, url.filePath);
      if (!fileChanges) return;
      url.assign({
        route: "commits"
      });
      const commitHistory = dom_chef.createElement("a", {
        href: url.href
      }, "Commit history");
      url.assign({
        route: "blob",
        branch: fileChanges.commit.parentSha,
        filePath: url.filePath
      });
      const lastVersionUrl = "removed" === fileChanges.file.status ? fileChanges.file.blob_url : url.href, lastVersion = dom_chef.createElement("a", {
        href: lastVersionUrl
      }, "This ", getType()), permalink = dom_chef.createElement("a", {
        href: fileChanges.commit.url
      }, dom_chef.createElement("relative-time", {
        datetime: fileChanges.commit.date
      })), verb = "removed" === fileChanges.file.status ? "deleted" : dom_chef.createElement("a", {
        href: fileChanges.file.blob_url
      }, "moved");
      return dom_chef.createElement("p", {
        className: "container mt-4 text-center"
      }, lastVersion, " was ", verb, " (", permalink, ") - ", commitHistory, ".");
    }
    async function showGitObjectHistoryOnRepo(description) {
      const link = await getGitObjectHistoryLink();
      if (link) {
        link.className = "color-fg-muted";
        description.after(link);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/useful-not-found-page.tsx", {
      asLongAs: [ is404, () => parseCurrentURL().length > 1 ],
      awaitDomReady: !0,
      init: node_modules_onetime((async function() {
        const pathParts = parseCurrentURL(), breadcrumbs = [ ...pathParts.entries() ].reverse().map((([index, part]) => {
          if (0 === index && "orgs" === part || 2 === index && [ "tree", "blob", "edit" ].includes(part) || index === pathParts.length - 1) return getStrikeThrough(part);
          const pathname = "/" + pathParts.slice(0, index + 1).join("/"), link = dom_chef.createElement("a", {
            href: pathname
          }, part);
          crossIfNonExistent(link);
          return link;
        })).reverse().flatMap(((link, index) => [ index > 0 && " / ", link ]));
        select_dom_$("main > :first-child, #parallax_illustration").after(dom_chef.createElement("h2", {
          className: "container mt-4 text-center"
        }, breadcrumbs));
      }))
    }, {
      asLongAs: [ is404 ],
      include: [ isSingleFile, isRepoTree, isEditingFile ],
      awaitDomReady: !0,
      init: node_modules_onetime((function() {
        showDefaultBranchLink();
        !async function() {
          const link = await getGitObjectHistoryLink();
          if (link) select_dom_$("main > .container-lg").before(link);
        }();
      }))
    }, {
      include: [ isPRCommit404 ],
      init: node_modules_onetime((async function() {
        const commitUrl = location.href.replace(/pull\/\d+\/commits/, "commit");
        if (!await isUrlReachable(commitUrl)) return !1;
        (await elementReady(".blankslate p", {
          waitForChildren: !1
        })).after(dom_chef.createElement("p", null, "You can also try to ", dom_chef.createElement("a", {
          href: commitUrl
        }, "view the detached standalone commit"), "."));
      }))
    }, {
      include: [ isRepoFile404 ],
      init: function(signal) {
        observe("#repos-header-breadcrumb-wide-heading + ol a", crossIfNonExistent, {
          signal
        });
        observe('main div[data-testid="eror-404-description"]', showGitObjectHistoryOnRepo, {
          signal
        });
      }
    });
    const GitBranch = props => createElement("svg", {
      className: "octicon octicon-git-branch",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
    })), GitCompare = props => createElement("svg", {
      className: "octicon octicon-git-compare",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM6 12v-1.646a.25.25 0 0 1 .427-.177l2.396 2.396a.25.25 0 0 1 0 .354l-2.396 2.396A.25.25 0 0 1 6 15.146V13.5H5A2.5 2.5 0 0 1 2.5 11V5.372a2.25 2.25 0 1 1 1.5 0V11a1 1 0 0 0 1 1ZM4 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM12.75 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
    })), GitCommit = props => createElement("svg", {
      className: "octicon octicon-git-commit",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"
    })), PackageDependencies = props => createElement("svg", {
      className: "octicon octicon-package-dependencies",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M6.122.392a1.75 1.75 0 0 1 1.756 0l5.25 3.045c.54.313.872.89.872 1.514V7.25a.75.75 0 0 1-1.5 0V5.677L7.75 8.432v6.384a1 1 0 0 1-1.502.865L.872 12.563A1.75 1.75 0 0 1 0 11.049V4.951c0-.624.332-1.2.872-1.514ZM7.125 1.69a.248.248 0 0 0-.25 0l-4.63 2.685L7 7.133l4.755-2.758ZM1.5 11.049a.25.25 0 0 0 .125.216l4.625 2.683V8.432L1.5 5.677Zm11.672-.282L11.999 12h3.251a.75.75 0 0 1 0 1.5h-3.251l1.173 1.233a.75.75 0 1 1-1.087 1.034l-2.378-2.5a.75.75 0 0 1 0-1.034l2.378-2.5a.75.75 0 0 1 1.087 1.034Z"
    }));
    function createDropdownItem({label, href, icon: Icon, ...attributes}) {
      return dom_chef.createElement("li", {
        "data-targets": "action-list.items action-list.items",
        role: "none",
        "data-view-component": "true",
        className: "ActionListItem",
        ...attributes
      }, dom_chef.createElement("a", {
        tabIndex: -1,
        href,
        role: "menuitem",
        "data-view-component": "true",
        className: "ActionListContent ActionListContent--visual16"
      }, dom_chef.createElement("span", {
        className: "ActionListItem-visual ActionListItem-visual--leading"
      }, dom_chef.createElement(Icon, null)), dom_chef.createElement("span", {
        "data-view-component": "true",
        className: "ActionListItem-label"
      }, label)));
    }
    async function unhideOverflowDropdown() {
      const repoNavigationBar = await elementReady(".UnderlineNav-body");
      if (!elementExists(".js-responsive-underlinenav")) return !1;
      repoNavigationBar.parentElement.classList.add("rgh-has-more-dropdown");
      return !0;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/more-dropdown-links.tsx", {
      include: [ hasRepoHeader ],
      exclude: [ isEmptyRepo, () => !elementExists(".js-responsive-underlinenav") ],
      deduplicate: "has-rgh",
      awaitDomReady: !0,
      init: async function() {
        const reference = getCurrentGitRef() ?? await getDefaultBranch(), compareUrl = buildRepoURL("compare", reference), commitsUrl = buildRepoURL("commits", reference), branchesUrl = buildRepoURL("branches"), dependenciesUrl = buildRepoURL("network/dependencies");
        await unhideOverflowDropdown();
        (await elementReady(".UnderlineNav-actions ul")).append(dom_chef.createElement("li", {
          className: "dropdown-divider",
          role: "separator"
        }), createDropdownItem({
          label: "Compare",
          href: compareUrl,
          icon: GitCompare
        }), isEnterprise() ? "" : createDropdownItem({
          label: "Dependencies",
          href: dependenciesUrl,
          icon: PackageDependencies
        }), createDropdownItem({
          label: "Commits",
          href: commitsUrl,
          icon: GitCommit
        }), createDropdownItem({
          label: "Branches",
          href: branchesUrl,
          icon: GitBranch
        }));
      }
    });
    const Tag = props => createElement("svg", {
      className: "octicon octicon-tag",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    }));
    var js_abbreviation_number_dist = __webpack_require__(50);
    function abbreviateNumber(number, digits = 1) {
      return (0, js_abbreviation_number_dist.abbreviateNumber)(number, digits, {
        padding: !1
      }).toLowerCase();
    }
    let localFetch = globalThis.fetch;
    if (window.content?.fetch) !function(fetch) {
      localFetch = fetch;
    }(window.content.fetch);
    const appendBefore = (parent, before, child) => {
      if ("string" == typeof parent) parent = select_dom_$(parent);
      const beforeElement = select_dom_$(`:scope > :is(${before})`, parent);
      if (beforeElement) beforeElement.before(child); else parent.append(child);
    }, wrap = (target, wrapper) => {
      target.before(wrapper);
      wrapper.append(target);
    }, wrapAll = (wrapper, ...targets) => {
      const [first, ...rest] = targets;
      first.before(wrapper);
      wrapper.append(first, ...rest);
      return wrapper;
    }, isEditable = node => node instanceof HTMLTextAreaElement || node instanceof HTMLInputElement || node instanceof HTMLElement && node.isContentEditable, highlightTab = tabElement => {
      tabElement.classList.add("selected");
      tabElement.setAttribute("aria-current", "page");
    }, unhighlightTab = tabElement => {
      tabElement.classList.remove("selected");
      tabElement.removeAttribute("aria-current");
    }, escapeMatcher = matcher => "string" == typeof matcher ? `"${matcher}"` : String(matcher), isTextNodeContaining = (node, expectation) => {
      if (!node || !(node => node instanceof Text || [ ...node.childNodes ].every((childNode => childNode instanceof Text)))(node)) {
        console.warn("TypeError", node);
        throw new TypeError(`Expected Text node, received ${String(node?.nodeName)}`);
      }
      const content = node.textContent.trim();
      return string = content, "string" == typeof (matcher = expectation) ? matcher === string : matcher.test(string);
      var matcher, string;
    }, assertNodeContent = (node, expectation) => {
      if (isTextNodeContaining(node, expectation)) return node;
      console.warn("Error", node.parentElement);
      const content = node.textContent.trim();
      throw new Error(`Expected node matching ${escapeMatcher(expectation)}, found ${escapeMatcher(content)}`);
    }, removeTextNodeContaining = (node, expectation) => {
      assertNodeContent(node, expectation);
      node.remove();
    };
    function detachHighlightFromCodeTab(codeTab) {
      codeTab.dataset.selectedLinks = codeTab.dataset.selectedLinks.replace("repo_releases ", "");
    }
    async function getReleases() {
      const repo = github_helpers_getRepo().nameWithOwner;
      return releasesCount.get(repo);
    }
    const releasesCount = new CachedFunction("releases-count", {
      updater: async function(nameWithOwner) {
        const [owner, name] = nameWithOwner.split("/"), {repository: {releases, tags}} = await v4('query GetReleasesCount($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\treleases {\n\t\t\ttotalCount\n\t\t}\n\t\ttags: refs(refPrefix: "refs/tags/") {\n\t\t\ttotalCount\n\t\t}\n\t}\n}\n', {
          variables: {
            name,
            owner
          }
        });
        if (releases.totalCount) return [ releases.totalCount, "Releases" ];
        if (tags.totalCount) return [ tags.totalCount, "Tags" ]; else return [ 0 ];
      },
      shouldRevalidate: cachedValue => "number" == typeof cachedValue,
      maxAge: {
        hours: 1
      },
      staleWhileRevalidate: {
        days: 3
      },
      cacheKey: cacheByRepo
    });
    async function addReleasesTab(repoNavigationBar) {
      const [count, type] = await getReleases();
      if (!type) return !1;
      await elementReady(repoUnderlineNavUl);
      repoNavigationBar.append(dom_chef.createElement("li", {
        className: "d-flex"
      }, dom_chef.createElement("a", {
        href: buildRepoURL(type.toLowerCase()),
        className: "js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item rgh-releases-tab",
        "data-hotkey": "g r",
        "data-selected-links": "repo_releases",
        "data-tab-item": "rgh-releases-item",
        "data-turbo-frame": "repo-content-turbo-frame"
      }, dom_chef.createElement(Tag, {
        className: "UnderlineNav-octicon d-none d-sm-inline"
      }), dom_chef.createElement("span", {
        "data-content": type
      }, type), dom_chef.createElement("span", {
        className: "Counter",
        title: count > 999 ? String(count) : ""
      }, abbreviateNumber(count)))));
      triggerRepoNavOverflow();
    }
    async function addReleasesDropdownItem(dropdownMenu) {
      const [, type] = await getReleases();
      if (!type) {
        select_dom_$(".dropdown-divider", dropdownMenu)?.remove();
        return !1;
      }
      appendBefore(dropdownMenu, ".dropdown-divider", createDropdownItem({
        label: type,
        href: buildRepoURL(type.toLowerCase()),
        icon: Tag,
        "data-menu-item": "rgh-releases-item"
      }));
      triggerRepoNavOverflow();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/releases-tab.tsx", {
      shortcuts: {
        "g r": "Go to Releases"
      },
      include: [ hasRepoHeader ],
      init: async function(signal) {
        await expectToken();
        observe(repoUnderlineNavUl, addReleasesTab, {
          signal
        });
        observe(repoUnderlineNavDropdownUl, addReleasesDropdownItem, {
          signal
        });
        observe([ '[data-menu-item="i0code-tab"] a', "a#code-tab" ], detachHighlightFromCodeTab, {
          signal
        });
      }
    });
    function filterAlteredClicks(callback, onlyPhysical) {
      return function(event) {
        if (!((event = event.originalEvent || event) instanceof MouseEvent && event.which > 1 || event.shiftKey || event.altKey || event.metaKey || event.ctrlKey || !onlyPhysical && event.defaultPrevented)) return callback.call(this, event);
      };
    }
    const ledger = new WeakMap;
    function editLedger(wanted, baseElement, callback, setup) {
      if (!wanted && !ledger.has(baseElement)) return !1;
      const elementMap = ledger.get(baseElement) ?? new WeakMap;
      ledger.set(baseElement, elementMap);
      const setups = elementMap.get(callback) ?? new Set;
      elementMap.set(callback, setups);
      const existed = setups.has(setup);
      if (wanted) setups.add(setup); else setups.delete(setup);
      return existed && wanted;
    }
    const delegate_it_delegate = function(selector, type, callback, options = {}) {
      const {signal, base = document} = options;
      if (signal?.aborted) return;
      const {once, ...nativeListenerOptions} = options, baseElement = base instanceof Document ? base.documentElement : base, capture = Boolean("object" == typeof options ? options.capture : options), listenerFunction = event => {
        const delegateTarget = function(event, selector) {
          let target = event.target;
          if (target instanceof Text) target = target.parentElement;
          if (target instanceof Element && event.currentTarget instanceof Element) {
            const closest = target.closest(selector);
            if (closest && event.currentTarget.contains(closest)) return closest;
          }
        }(event, selector);
        if (delegateTarget) {
          const delegateEvent = Object.assign(event, {
            delegateTarget
          });
          callback.call(baseElement, delegateEvent);
          if (once) {
            baseElement.removeEventListener(type, listenerFunction, nativeListenerOptions);
            editLedger(!1, baseElement, callback, setup);
          }
        }
      }, setup = JSON.stringify({
        selector,
        type,
        capture
      });
      if (!editLedger(!0, baseElement, callback, setup)) baseElement.addEventListener(type, listenerFunction, nativeListenerOptions);
      signal?.addEventListener("abort", (() => {
        editLedger(!1, baseElement, callback, setup);
      }));
    };
    const one_event = async function(selector, type, options = {}) {
      return new Promise((resolve => {
        options.once = !0;
        if (options.signal?.aborted) resolve(void 0);
        options.signal?.addEventListener("abort", (() => {
          resolve(void 0);
        }));
        delegate_it_delegate(selector, type, resolve, options);
      }));
    };
    function onFieldKeydown(selector, callback, signal) {
      delegate_it_delegate(selector, "keydown", (event => {
        if (!elementExists(".suggester", event.delegateTarget.form) && !event.isComposing) callback(event);
      }), {
        capture: !0,
        signal
      });
    }
    function onCommentFieldKeydown(callback, signal) {
      onFieldKeydown(".js-comment-field, #commit-description-textarea, #merge_message_field", callback, signal);
    }
    function onConversationTitleFieldKeydown(callback, signal) {
      onFieldKeydown("#issue_title, #pull_request_title", callback, signal);
    }
    const eventHandler = filterAlteredClicks((event => {
      const field = event.delegateTarget;
      if ("Escape" === event.key) !function(event, targetField) {
        const cancelButton = select_dom_$("\n\t\tbutton.js-hide-inline-comment-form,\n\t\tbutton.js-comment-cancel-button\n\t", targetField.form);
        if (cancelButton) cancelButton.click(); else targetField.blur();
        event.stopImmediatePropagation();
        event.preventDefault();
      }(event, field); else if ("ArrowUp" === event.key && "" === field.value) !function(targetField) {
        const lastOwnComment = $$(".js-comment.current-user", targetField.closest([ ".js-inline-comments-container", "#discussion_bucket", "#all_commit_comments" ])).reverse().find((comment => {
          const collapsible = comment.closest("details");
          return !collapsible || collapsible.open;
        }));
        if (!lastOwnComment) return;
        const editButton = dom_chef.createElement("button", {
          hidden: !0,
          type: "button",
          className: "js-comment-edit-button"
        });
        lastOwnComment.append(editButton);
        editButton.click();
        editButton.remove();
        targetField.closest("form").querySelector("button.js-hide-inline-comment-form")?.click();
        requestAnimationFrame((() => {
          select_dom_$("textarea.js-comment-field", lastOwnComment).selectionStart = Number.MAX_SAFE_INTEGER;
        }));
      }(field);
    }));
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/comment-fields-keyboard-shortcuts.tsx", {
      shortcuts: {
        "↑": "Edit your last comment",
        esc: "Unfocuses comment field"
      },
      include: [ hasRichTextEditor ],
      init: function(signal) {
        onCommentFieldKeydown(eventHandler, signal);
      }
    });
    function isNativeField(field) {
      return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement;
    }
    function withFocus(field, callback) {
      const initialFocus = field.ownerDocument.activeElement;
      if (initialFocus === field) return callback();
      try {
        field.focus();
        return callback();
      } finally {
        field.blur();
        if (initialFocus instanceof HTMLElement) initialFocus.focus();
      }
    }
    function insertTextWhereverTheFocusIs(document, text) {
      if ("" === text) document.execCommand("delete"); else document.execCommand("insertText", !1, text);
    }
    function insertTextIntoField(field, text) {
      withFocus(field, (() => {
        insertTextWhereverTheFocusIs(field.ownerDocument, text);
      }));
    }
    function setFieldText(field, text) {
      if (isNativeField(field)) {
        field.select();
        insertTextIntoField(field, text);
      } else {
        const document = field.ownerDocument;
        withFocus(field, (() => {
          document.execCommand("selectAll", !1, text);
          insertTextWhereverTheFocusIs(document, text);
        }));
      }
    }
    function getFieldSelection(field) {
      if (isNativeField(field)) return field.value.slice(field.selectionStart, field.selectionEnd);
      const selection = field.ownerDocument.getSelection();
      if (selection && field.contains(selection.anchorNode)) return selection.toString(); else return "";
    }
    function collapseCursor(selection, range, toStart) {
      const alteredRange = range.cloneRange();
      alteredRange.collapse(toStart);
      selection.removeAllRanges();
      selection.addRange(alteredRange);
    }
    function wrapFieldSelection(field, wrap, wrapEnd = wrap) {
      if (isNativeField(field)) !function(field, wrap, wrapEnd) {
        const {selectionStart, selectionEnd} = field;
        insertTextIntoField(field, wrap + getFieldSelection(field) + wrapEnd);
        field.selectionStart = selectionStart + wrap.length;
        field.selectionEnd = selectionEnd + wrap.length;
      }(field, wrap, wrapEnd); else !function(field, before, after) {
        const selection = field.ownerDocument.getSelection(), selectionRange = selection.getRangeAt(0);
        if (after) {
          collapseCursor(selection, selectionRange, !1);
          insertTextIntoField(field, after);
        }
        if (before) {
          collapseCursor(selection, selectionRange, !0);
          insertTextIntoField(field, before);
          selectionRange.setStart(selectionRange.startContainer, selectionRange.startOffset + before.length);
        }
        if (after ?? before) {
          selection.removeAllRanges();
          selection.addRange(selectionRange);
        }
      }(field, wrap, wrapEnd);
    }
    function replaceFieldText(field, searchValue, replacer, cursor = "select") {
      if (!isNativeField(field)) throw new TypeError("replaceFieldText only supports input and textarea fields");
      let drift = 0;
      withFocus(field, (() => {
        field.value.replace(searchValue, ((...arguments_) => {
          const matchStart = drift + arguments_.at(-2), matchLength = arguments_[0].length;
          field.selectionStart = matchStart;
          field.selectionEnd = matchStart + matchLength;
          const replacement = "string" == typeof replacer ? replacer : replacer(...arguments_);
          insertTextWhereverTheFocusIs(field.ownerDocument, replacement);
          if ("select" === cursor) field.selectionStart = matchStart;
          drift += replacement.length - matchLength;
          return replacement;
        }));
      }));
    }
    const formattingCharacters = [ "`", "'", '"', "[", "(", "{", "*", "_", "~", "“", "‘" ], matchingCharacters = [ "`", "'", '"', "]", ")", "}", "*", "_", "~", "”", "’" ], quoteCharacters = new Set([ "`", "'", '"' ]);
    function one_key_formatting_eventHandler(event) {
      const field = event.delegateTarget, formattingChar = event.key;
      if (!formattingCharacters.includes(formattingChar)) return;
      const [start, end] = [ field.selectionStart, field.selectionEnd ];
      if (start === end) return;
      if (quoteCharacters.has(formattingChar) && end - start == 1 && quoteCharacters.has(field.value.at(start))) return;
      event.preventDefault();
      wrapFieldSelection(field, formattingChar, matchingCharacters[formattingCharacters.indexOf(formattingChar)]);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/one-key-formatting.tsx", {
      include: [ hasRichTextEditor, isGist, isNewFile, isEditingFile, isDeletingFile ],
      init: function(signal) {
        onCommentFieldKeydown(one_key_formatting_eventHandler, signal);
        onConversationTitleFieldKeydown(one_key_formatting_eventHandler, signal);
        !function(callback, signal) {
          onFieldKeydown("#commit-summary-input", callback, signal);
        }(one_key_formatting_eventHandler, signal);
        delegate_it_delegate('input[name="commit_title"], input[name="gist[description]"], #saved-reply-title-field', "keydown", one_key_formatting_eventHandler, {
          signal
        });
      }
    });
    function indentSelection(element) {
      const {selectionStart, selectionEnd, value} = element, selectedText = value.slice(selectionStart, selectionEnd), lineBreakCount = /\n/g.exec(selectedText)?.length;
      if (lineBreakCount > 0) {
        const firstLineStart = value.lastIndexOf("\n", selectionStart - 1) + 1, newSelection = element.value.slice(firstLineStart, selectionEnd - 1), indentedText = newSelection.replaceAll(/^|\n/g, "$&\t"), replacementsCount = indentedText.length - newSelection.length;
        element.setSelectionRange(firstLineStart, selectionEnd - 1);
        insertTextIntoField(element, indentedText);
        element.setSelectionRange(selectionStart + 1, selectionEnd + replacementsCount);
      } else insertTextIntoField(element, "\t");
    }
    function unindentSelection(element) {
      const {selectionStart, selectionEnd, value} = element, firstLineStart = value.lastIndexOf("\n", selectionStart - 1) + 1, minimumSelectionEnd = function(value, currentEnd) {
        const lastLineStart = value.lastIndexOf("\n", currentEnd - 1) + 1;
        if ("\t" !== value.charAt(lastLineStart)) return currentEnd; else return lastLineStart + 1;
      }(value, selectionEnd), newSelection = element.value.slice(firstLineStart, minimumSelectionEnd), indentedText = newSelection.replaceAll(/(^|\n)(\t| {1,2})/g, "$1"), replacementsCount = newSelection.length - indentedText.length;
      element.setSelectionRange(firstLineStart, minimumSelectionEnd);
      insertTextIntoField(element, indentedText);
      const firstLineIndentation = /\t| {1,2}/.exec(value.slice(firstLineStart, selectionStart)), difference = firstLineIndentation ? firstLineIndentation[0].length : 0, newSelectionStart = selectionStart - difference;
      element.setSelectionRange(selectionStart - difference, Math.max(newSelectionStart, selectionEnd - replacementsCount));
    }
    function tabToIndentListener(event) {
      if (event.defaultPrevented || event.metaKey || event.altKey || event.ctrlKey) return;
      const textarea = event.target;
      if ("Tab" === event.key) {
        if (event.shiftKey) unindentSelection(textarea); else indentSelection(textarea);
        event.preventDefault();
        event.stopImmediatePropagation();
      } else if ("Escape" === event.key && !event.shiftKey) {
        textarea.blur();
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
    const indent_textarea_eventHandler = tabToIndentListener;
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/tab-to-indent.tsx", {
      include: [ hasRichTextEditor ],
      init: function(signal) {
        onCommentFieldKeydown(indent_textarea_eventHandler, signal);
      }
    });
    const html = document.documentElement;
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/hide-navigation-hover-highlight.tsx", {
      init: function() {
        html.setAttribute("rgh-no-navigation-highlight", "");
        html.addEventListener("navigation:keydown", (() => {
          html.removeAttribute("rgh-no-navigation-highlight");
        }), {
          once: !0
        });
      }
    });
    function registerHotkey(hotkey, action, {signal}) {
      const element = "string" == typeof action ? dom_chef.createElement("a", {
        hidden: !0,
        href: action,
        "data-hotkey": hotkey
      }) : dom_chef.createElement("button", {
        hidden: !0,
        type: "button",
        "data-hotkey": hotkey,
        onClick: action
      });
      document.body.append(element);
      signal?.addEventListener("abort", (() => {
        element.remove();
      }));
    }
    function addHotkey(button, hotkey) {
      if (button) {
        const hotkeys = new Set(button.dataset.hotkey?.split(","));
        hotkeys.add(hotkey);
        button.dataset.hotkey = [ ...hotkeys ].join(",");
      }
    }
    var selection_in_new_tab_browser = __webpack_require__(131);
    function openInNewTab() {
      const selected = select_dom_$(".navigation-focus a.js-navigation-open[href]");
      if (selected) {
        selection_in_new_tab_browser.runtime.sendMessage({
          openUrls: [ selected.href ]
        });
        selected.closest(".unread")?.classList.replace("unread", "read");
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/selection-in-new-tab.tsx", {
      shortcuts: {
        "shift o": "Open selection in new tab"
      },
      init: node_modules_onetime((function(signal) {
        registerHotkey("O", openInNewTab, {
          signal
        });
      }))
    });
    const formSelector = [ 'form[action$="/minimize-comment"]', 'form[action$="/minimize"]' ];
    function toggleSubMenu(hideButton, show) {
      const dropdown = hideButton.closest("details");
      select_dom_$("details-menu", dropdown).classList.toggle("v-hidden", show);
      select_dom_$(formSelector, dropdown).classList.toggle("v-hidden", !show);
    }
    function resetDropdowns(event) {
      toggleSubMenu(event.delegateTarget, !1);
    }
    function showSubmenu(event) {
      !function(hideButton) {
        if (hideButton.closest(".rgh-quick-comment-hiding-details")) return;
        const detailsElement = hideButton.closest("details");
        detailsElement.classList.add("rgh-quick-comment-hiding-details");
        const comment = hideButton.closest(".unminimized-comment"), hideCommentForm = select_dom_$(formSelector, comment), newForm = hideCommentForm.cloneNode(), fields = [ ...hideCommentForm.elements ].map((field => field.cloneNode()));
        newForm.append(dom_chef.createElement("i", {
          hidden: !0
        }, fields));
        newForm.setAttribute("novalidate", "true");
        newForm.className = [ "js-comment-minimize", "dropdown-menu", "dropdown-menu-sw", "color-fg-default", "show-more-popover", "anim-scale-in" ].join(" ");
        for (const reason of $$('option:not([value=""])', hideCommentForm.elements.classifier)) newForm.append(dom_chef.createElement("button", {
          type: "submit",
          name: "classifier",
          value: reason.value,
          className: "dropdown-item btn-link",
          role: "menuitem"
        }, reason.textContent));
        newForm.addEventListener("click", (() => {
          detailsElement.open = !1;
        }));
        detailsElement.append(newForm);
      }(event.delegateTarget);
      toggleSubMenu(event.delegateTarget, !0);
      event.stopImmediatePropagation();
      event.preventDefault();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-comment-hiding.tsx", {
      include: [ hasComments ],
      init: function(signal) {
        delegate_it_delegate(".js-comment-hide-button", "click", showSubmenu, {
          capture: !0,
          signal
        });
        delegate_it_delegate(".rgh-quick-comment-hiding-details", "toggle", resetDropdowns, {
          capture: !0,
          signal
        });
      }
    });
    const Pencil = props => createElement("svg", {
      className: "octicon octicon-pencil",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"
    }));
    function addQuickEditButton(commentDropdown) {
      const commentBody = commentDropdown.closest(".js-comment");
      if (elementExists(".js-comment-update", commentBody)) {
        if (!elementExists(".rgh-quick-comment-edit-button", commentBody)) if (!elementExists(".js-pick-reaction:first-child", commentBody) || canEditEveryComment()) commentDropdown.before(dom_chef.createElement("button", {
          type: "button",
          role: "menuitem",
          className: "timeline-comment-action btn-link js-comment-edit-button rgh-quick-comment-edit-button",
          "aria-label": "Edit comment"
        }, dom_chef.createElement(Pencil, null)));
      } else console.log("Comment is not editable");
    }
    function canEditEveryComment() {
      return elementExists([ ".lock-toggle-link > .octicon-lock", '[aria-label^="You have been invited to collaborate"]', '[aria-label^="You are the owner"]', '[title^="You are a maintainer"]', '[title^="You are a collaborator"]' ]) || canUserEditRepo();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-comment-edit.tsx", {
      asLongAs: [ webext_detect_page_isChrome ],
      include: [ hasComments ],
      init: async function(signal) {
        if (await isArchivedRepoAsync()) return;
        observe((canEditEveryComment() ? "" : ".current-user") + ".js-comment.unminimized-comment .timeline-comment-actions details.position-relative", addQuickEditButton, {
          signal
        });
      }
    });
    const LinkExternal = props => createElement("svg", {
      className: "octicon octicon-link-external",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"
    })), {toString: assert_error_toString} = Object.prototype;
    function assertError(value) {
      if (!(value instanceof Error || "[object Error]" === assert_error_toString.call(value))) throw new TypeError(`Expected an \`Error\`, got \`${JSON.stringify(value)}\` (${typeof value})`);
    }
    const Check = props => createElement("svg", {
      className: "octicon octicon-check",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
    })), Stop = props => createElement("svg", {
      className: "octicon octicon-stop",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
    }));
    function ToastSpinner() {
      return dom_chef.createElement("svg", {
        className: "Toast--spinner",
        viewBox: "0 0 32 32",
        width: "18",
        height: "18"
      }, dom_chef.createElement("path", {
        fill: "#959da5",
        d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
      }), dom_chef.createElement("path", {
        fill: "#ffffff",
        d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"
      }));
    }
    async function showToast(task, {message = "Bulk actions currently being processed.", doneMessage = "Bulk action processing complete."} = {}) {
      const iconWrapper = dom_chef.createElement("span", {
        className: "Toast-icon"
      }, dom_chef.createElement(ToastSpinner, null)), messageWrapper = dom_chef.createElement("span", {
        className: "Toast-content"
      }, message), toast = dom_chef.createElement("div", {
        role: "log",
        style: {
          zIndex: 101
        },
        className: "rgh-toast position-fixed bottom-0 right-0 ml-5 mb-5 anim-fade-in fast Toast Toast--loading"
      }, iconWrapper, messageWrapper), updateToast = message2 => {
        messageWrapper.textContent = message2;
      };
      document.body.append(toast);
      await node_modules_delay(30);
      try {
        if (task instanceof Error) throw task;
        if ("function" == typeof task) await task(updateToast); else await task;
        toast.classList.replace("Toast--loading", "Toast--success");
        updateToast(doneMessage);
        iconWrapper.firstChild.replaceWith(dom_chef.createElement(Check, null));
      } catch (error) {
        assertError(error);
        toast.classList.replace("Toast--loading", "Toast--error");
        updateToast(error.message);
        iconWrapper.firstChild.replaceWith(dom_chef.createElement(Stop, null));
        throw error;
      } finally {
        requestAnimationFrame((() => {
          setTimeout((() => {
            toast.remove();
          }), 3e3);
        }));
      }
    }
    var open_tabs_browser = __webpack_require__(131);
    async function openTabs(urls) {
      if (urls.length >= 10 && !confirm(`This will open ${urls.length} new tabs. Continue?`)) return !1;
      const response = open_tabs_browser.runtime.sendMessage({
        openUrls: urls
      });
      await showToast(response, {
        message: "Opening…",
        doneMessage: pluralize(urls.length, "$$ tab") + " opened"
      });
      return !0;
    }
    const openUnread = feature_manager.getIdentifiers("open-notifications-button"), openSelected = feature_manager.getIdentifiers("open-selected-button");
    function getUnreadNotifications(container = document) {
      return $$(".notification-unread", container);
    }
    async function openNotifications(notifications, markAsDone = !1) {
      const openingTabs = openTabs(notifications.reverse().map((notification => notification.querySelector("a").href)));
      if (await openingTabs) for (const notification of notifications) if (markAsDone) notification.querySelector('[title="Done"]').click(); else notification.classList.replace("notification-unread", "notification-read");
    }
    async function openUnreadNotifications({delegateTarget, altKey}) {
      const container = delegateTarget.closest(".js-notifications-group") ?? document;
      await openNotifications(getUnreadNotifications(container), altKey);
      removeOpenUnreadButtons(container);
    }
    async function openSelectedNotifications() {
      const selectedNotifications = $$(".notifications-list-item :checked").map((checkbox => checkbox.closest(".notifications-list-item")));
      await openNotifications(selectedNotifications);
      if (!elementExists(".notification-unread")) removeOpenUnreadButtons();
    }
    function removeOpenUnreadButtons(container = document) {
      for (const button of $$(openUnread.selector, container)) button.remove();
    }
    function addSelectedButton(selectedActionsGroup) {
      const button = dom_chef.createElement("button", {
        className: "btn btn-sm mr-2 " + openSelected.class,
        type: "button"
      }, dom_chef.createElement(LinkExternal, {
        className: "mr-1"
      }), "Open");
      appendBefore(selectedActionsGroup, "details", button);
    }
    function addToRepoGroup(markReadButton) {
      if (0 !== getUnreadNotifications(markReadButton.closest(".js-notifications-group")).length) markReadButton.before(dom_chef.createElement("button", {
        type: "button",
        className: "btn btn-sm mr-2 tooltipped tooltipped-w " + openUnread.class,
        "aria-label": "Open all unread notifications from this repo"
      }, dom_chef.createElement(LinkExternal, {
        width: 16
      }), " Open unread"));
    }
    function addToMainHeader(notificationHeader) {
      if (0 !== getUnreadNotifications().length) notificationHeader.append(dom_chef.createElement("button", {
        className: "btn btn-sm ml-auto d-none " + openUnread.class,
        type: "button"
      }, dom_chef.createElement(LinkExternal, {
        className: "mr-1"
      }), "Open all unread"));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/open-all-notifications.tsx", {
      include: [ isNotifications ],
      init: function(signal) {
        delegate_it_delegate(openSelected.selector, "click", openSelectedNotifications, {
          signal
        });
        delegate_it_delegate(openUnread.selector, "click", openUnreadNotifications, {
          signal
        });
        observe(".js-check-all-container .js-bulk-action-toasts ~ div .Box-header .js-notifications-mark-selected-actions", addSelectedButton, {
          signal
        });
        observe(".js-check-all-container .js-bulk-action-toasts ~ div .Box-header", addToMainHeader, {
          signal
        });
        observe(".js-grouped-notifications-mark-all-read-button", addToRepoGroup, {
          signal
        });
      }
    });
    async function handler({key, target}) {
      if ("y" === key && !isEditable(target)) {
        const url = location.href;
        await navigator.clipboard.writeText(url);
        console.log("Copied URL to the clipboard", url);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/copy-on-y.tsx", {
      init: function(signal) {
        window.addEventListener("keyup", handler, {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/profile-hotkey.tsx", {
      shortcuts: {
        "g m": "Go to Profile"
      },
      init: node_modules_onetime((function(signal) {
        const origin = isEnterprise() ? location.origin : "https://github.com";
        registerHotkey("g m", new URL(github_helpers_getUsername(), origin).href, {
          signal
        });
      }))
    });
    const visible = new Set, observer = new IntersectionObserver((entries => {
      let lastModal;
      for (const {intersectionRatio, target: modal} of entries) {
        if (intersectionRatio > 0) visible.add(modal); else visible.delete(modal);
        lastModal = modal;
      }
      if (0 === visible.size) {
        observer.disconnect();
        lastModal.closest("details").open = !1;
      }
    }));
    let lastOpen;
    const safetySwitch = new AbortController;
    function menuActivatedHandler(event) {
      const details = event.target;
      if (!details.open && lastOpen > Date.now() - 500) {
        safetySwitch.abort();
        console.warn(`The modal was closed too quickly. Disabling ${feature_manager.getFeatureID("file:///home/runner/work/refined-github/refined-github/source/features/close-out-of-view-modals.tsx")} for this session.`);
        return;
      }
      lastOpen = Date.now();
      const modals = $$([ ":scope > details-menu", ":scope > details-dialog", ":scope > div > .dropdown-menu" ], details);
      for (const modal of modals) observer.observe(modal);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/close-out-of-view-modals.tsx", {
      init: node_modules_onetime((function() {
        delegate_it_delegate(".details-overlay", "toggle", menuActivatedHandler, {
          capture: !0,
          signal: safetySwitch.signal
        });
      }))
    });
    function improveShortcutHelp(dialog) {
      select_dom_$(".Box-body .col-5 .Box:first-child", dialog).after(dom_chef.createElement("div", {
        className: "Box Box--condensed m-4"
      }, dom_chef.createElement("div", {
        className: "Box-header"
      }, dom_chef.createElement("h2", {
        className: "Box-title"
      }, "Refined GitHub")), dom_chef.createElement("ul", null, [ ...feature_manager.shortcutMap ].sort((([, a], [, b]) => a.localeCompare(b))).map((([hotkey, description]) => dom_chef.createElement("li", {
        className: "Box-row d-flex flex-row"
      }, dom_chef.createElement("div", {
        className: "flex-auto"
      }, description), dom_chef.createElement("div", {
        className: "ml-2 no-wrap"
      }, hotkey.split(" ").map((key => dom_chef.createElement(dom_chef.Fragment, null, " ", dom_chef.createElement("kbd", null, key)))))))))));
    }
    const improve_shortcut_help_observer = new MutationObserver((([{target}]) => {
      if (target instanceof Element && !elementExists(".js-details-dialog-spinner", target)) {
        improveShortcutHelp(target);
        improve_shortcut_help_observer.disconnect();
      }
    }));
    function observeShortcutModal({key, target}) {
      if ("?" !== key || isEditable(target)) return;
      const modal = select_dom_$("body > details:not(.js-command-palette-dialog) > details-dialog");
      if (modal) improve_shortcut_help_observer.observe(modal, {
        childList: !0
      });
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/improve-shortcut-help.tsx", {
      init: node_modules_onetime((function() {
        document.body.addEventListener("keypress", observeShortcutModal);
      }))
    });
    const debounce_fn = (inputFunction, options = {}) => {
      if ("function" != typeof inputFunction) throw new TypeError(`Expected the first argument to be a function, got \`${typeof inputFunction}\``);
      const {wait = 0, maxWait = Number.POSITIVE_INFINITY, before = !1, after = !0} = options;
      if (wait < 0 || maxWait < 0) throw new RangeError("`wait` and `maxWait` must not be negative.");
      if (!before && !after) throw new Error("Both `before` and `after` are false, function wouldn't be called.");
      let timeout, maxTimeout, result;
      const debouncedFunction = function(...arguments_) {
        const context = this, maxLater = () => {
          maxTimeout = void 0;
          if (timeout) {
            clearTimeout(timeout);
            timeout = void 0;
          }
          if (after) result = inputFunction.apply(context, arguments_);
        }, shouldCallNow = before && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout((() => {
          timeout = void 0;
          if (maxTimeout) {
            clearTimeout(maxTimeout);
            maxTimeout = void 0;
          }
          if (after) result = inputFunction.apply(context, arguments_);
        }), wait);
        if (maxWait > 0 && maxWait !== Number.POSITIVE_INFINITY && !maxTimeout) maxTimeout = setTimeout(maxLater, maxWait);
        if (shouldCallNow) result = inputFunction.apply(context, arguments_);
        return result;
      };
      mimic_function_mimicFunction(debouncedFunction, inputFunction);
      debouncedFunction.cancel = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = void 0;
        }
        if (maxTimeout) {
          clearTimeout(maxTimeout);
          maxTimeout = void 0;
        }
      };
      return debouncedFunction;
    }, loadMore = debounce_fn((button => {
      button.click();
      if (!button.disabled) loadMore(button);
    }), {
      wait: 200
    }), inView = new IntersectionObserver((([{target, isIntersecting}]) => {
      if (isIntersecting) loadMore(target);
    }), {
      rootMargin: "500px"
    });
    function copyFooter(originalFooter) {
      const footer = originalFooter.cloneNode(!0);
      for (const child of footer.children) child.classList.remove("pl-lg-4", "col-xl-3");
      select_dom_$('[aria-label^="Explore"]').append(dom_chef.createElement("div", {
        className: "footer mt-4 py-4 border-top"
      }, footer));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/infinite-scroll.tsx", {
      include: [ isDashboard ],
      init: function(signal) {
        onAbort(signal, inView);
        observe(".ajax-pagination-btn", (button => {
          inView.observe(button);
        }), {
          signal
        });
        observe(".footer > .d-flex", copyFooter, {
          signal
        });
      }
    });
    var zip_text_nodes = __webpack_require__(591), zip_text_nodes_default = __webpack_require__.n(zip_text_nodes), shorten_repo_url = __webpack_require__(37), escape_goat = __webpack_require__(305);
    var html_tags_void = __webpack_require__(574);
    const _htmlEscape = string => string.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const voidHtmlTags = new Set(html_tags_void);
    function createHtmlElement({name = "div", attributes = {}, html = "", text} = {}) {
      if (html && text) throw new Error("The `html` and `text` options are mutually exclusive");
      const content = text ? function(strings, ...values) {
        if ("string" == typeof strings) return _htmlEscape(strings);
        let output = strings[0];
        for (const [index, value] of values.entries()) output = output + _htmlEscape(String(value)) + strings[index + 1];
        return output;
      }(text) : html;
      let result = `<${name}${function(attributes) {
        const handledAttributes = [];
        for (let [key, value] of Object.entries(attributes)) {
          if (!1 === value) continue;
          if (Array.isArray(value)) value = value.join(" ");
          let attribute = (0, escape_goat.z)(key);
          if (!0 !== value) attribute += `="${(0, escape_goat.z)(String(value))}"`;
          handledAttributes.push(attribute);
        }
        return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
      }(attributes)}>`;
      if (!voidHtmlTags.has(name)) result += `${content}</${name}>`;
      return result;
    }
    const linkify = (href, options) => createHtmlElement({
      name: "a",
      attributes: {
        href: "",
        ...options.attributes,
        href
      },
      text: void 0 === options.value ? href : void 0,
      html: void 0 === options.value ? void 0 : "function" == typeof options.value ? options.value(href) : options.value
    }), domify = html => document.createRange().createContextualFragment(html), isTruncated = (url, peek) => url.endsWith("...") || peek.startsWith("…"), getAsString = (string, options) => string.replace(/((?<!\+)https?:\/\/(?:www\.)?(?:[-\w.]+?[.@][a-zA-Z\d]{2,}|localhost)(?:[-\w.:%+~#*$!?&/=@]*?(?:,(?!\s))*?)*)/g, ((url, _, offset) => isTruncated(url, string.charAt(offset + url.length)) ? url : linkify(url, options))), getAsDocumentFragment = (string, options) => {
      const fragment = document.createDocumentFragment(), parts = string.split(/((?<!\+)https?:\/\/(?:www\.)?(?:[-\w.]+?[.@][a-zA-Z\d]{2,}|localhost)(?:[-\w.:%+~#*$!?&/=@]*?(?:,(?!\s))*?)*)/g);
      for (const [index, text] of parts.entries()) if (index % 2 && !isTruncated(text, parts[index + 1])) fragment.append(domify(linkify(text, options))); else if (text.length > 0) fragment.append(text);
      return fragment;
    };
    const groupedIssueRegex = new RegExp(`(${/(?:(?<![/\w-.])\w[\w-.]+?\/\w[\w-.]+?|\B)#[1-9]\d*?\b/g.source})`, "g"), issueRegexGroups = new RegExp(groupedIssueRegex.toString() + "|").exec("").length, linkify_issues_linkify = (match, options) => {
      const fullReference = match.replace(/^#/, `${options.user}/${options.repository}#`), [userRepository, issue] = fullReference.split("#"), href = `${options.baseUrl}/${userRepository}/issues/${issue}`;
      return createHtmlElement({
        name: "a",
        attributes: {
          href: "",
          ...options.attributes,
          href
        },
        text: match
      });
    }, linkify_issues_domify = html => document.createRange().createContextualFragment(html), linkify_issues_getAsString = (string, options) => string.replace(groupedIssueRegex, (match => linkify_issues_linkify(match, options))), linkify_issues_getAsDocumentFragment = (string, options) => {
      const fragment = document.createDocumentFragment(), parts = string.split(groupedIssueRegex);
      for (const [index, text] of parts.entries()) if (index % issueRegexGroups == 1) fragment.append(linkify_issues_domify(linkify_issues_linkify(text, options))); else if (index % issueRegexGroups == 0 && text.length > 0) fragment.append(text);
      return fragment;
    };
    function getTextNodes(element) {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT), nodes = [];
      let node;
      do {
        node = walker.nextNode();
        if (node) nodes.push(node);
      } while (node);
      return nodes;
    }
    const splittingRegex = /`` (.*?) ``|`([^`\n]+)`/g;
    function parseBackticks(description) {
      const fragment = new DocumentFragment;
      for (const [index, text] of (string = description, string.split(splittingRegex).filter((part => void 0 !== part))).entries()) if (index % 2 && text.length > 0) fragment.append(dom_chef.createElement("span", {
        className: "sr-only"
      }, "`"), dom_chef.createElement("code", {
        className: "rgh-parse-backticks"
      }, text.trim()), dom_chef.createElement("span", {
        className: "sr-only"
      }, "`")); else if (text.length > 0) fragment.append(text);
      var string;
      return fragment;
    }
    const linkifiedURLClass = "rgh-linkified-code", linkifiedURLSelector = ".rgh-linkified-code", codeElementsSelector = [ ".blob-code-inner:not(deferred-diff-lines.awaiting-highlight *)", ":not(.notranslate) > .notranslate" ];
    function shortenLink(link) {
      if (link.closest(String([ ...codeElementsSelector, ".comment-body" ]))?.classList.contains("comment-body")) (0, 
      shorten_repo_url.applyToLink)(link, location.href);
    }
    function dom_formatters_linkifyIssues(currentRepo, element, options = {}) {
      const linkified = function(string, options) {
        if (!(options = {
          attributes: {},
          baseUrl: "https://github.com",
          type: "string",
          ...options
        }).user || !options.repository) throw new Error("Missing required `user` and `repository` options");
        if ("string" === options.type) return linkify_issues_getAsString(string, options);
        if ("dom" === options.type) return linkify_issues_getAsDocumentFragment(string, options);
        throw new TypeError("The `type` option must be either `dom` or `string`");
      }(element.textContent, {
        user: currentRepo.owner ?? "/",
        repository: currentRepo.name ?? "/",
        type: "dom",
        baseUrl: "",
        ...options,
        attributes: {
          class: linkifiedURLClass,
          ...options.attributes
        }
      });
      if (0 !== linkified.children.length) {
        for (const link of linkified.children) {
          const issue = link.href.split("/").pop();
          link.setAttribute("class", "issue-link js-issue-link");
          link.dataset.errorText = "Failed to load title";
          link.dataset.permissionText = "Title is private";
          link.dataset.url = link.href;
          link.dataset.id = `rgh-issue-${issue}`;
          link.dataset.hovercardType = "issue";
          link.dataset.hovercardUrl = `${link.pathname}/hovercard`;
        }
        zip_text_nodes_default()(element, linkified);
      }
    }
    function linkifyURLs(element) {
      if (element.textContent.length < 15) return;
      if (elementExists(linkifiedURLSelector, element)) return $$(linkifiedURLSelector, element);
      const linkified = function(string, options) {
        if ("string" === (options = {
          attributes: {},
          type: "string",
          ...options
        }).type) return getAsString(string, options);
        if ("dom" === options.type) return getAsDocumentFragment(string, options);
        throw new TypeError("The type option must be either `dom` or `string`");
      }(element.textContent, {
        type: "dom",
        attributes: {
          rel: "noreferrer noopener",
          class: linkifiedURLClass
        }
      });
      if (0 !== linkified.children.length) zip_text_nodes_default()(element, linkified);
    }
    function dom_formatters_parseBackticks(element) {
      for (const node of getTextNodes(element)) {
        const fragment = parseBackticks(node.textContent);
        if (fragment.children.length > 0) node.replaceWith(fragment);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/shorten-links.tsx", {
      init: node_modules_onetime((function() {
        observe(`.comment-body a[href]:not(.${linkifiedURLClass})`, shortenLink);
      }))
    });
    function linkifyContent(wrapper) {
      wrapper.classList.add(linkifiedURLClass);
      const errors = linkifyURLs(wrapper);
      if (errors) {
        feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/linkify-code.tsx", "Links already exist");
        console.log(errors);
      }
      const currentRepo = isGlobalSearchResults() ? github_helpers_getRepo(wrapper.parentElement.querySelector(".blob-num a").href) : github_helpers_getRepo();
      if (currentRepo) for (const element of $$(".pl-c", wrapper)) dom_formatters_linkifyIssues(currentRepo, element);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-code.tsx", {
      include: [ hasCode ],
      init: function(signal) {
        observe(codeElementsSelector, linkifyContent, {
          signal
        });
      }
    }, {
      include: [ isPR, isIssue, isDiscussion ],
      init: function(signal) {
        const currentRepo = github_helpers_getRepo() ?? {};
        observe(".js-issue-title", (title => {
          if (!elementExists("a", title)) dom_formatters_linkifyIssues(currentRepo, title);
        }), {
          signal
        });
      }
    });
    function download_folder_button_add({parentElement: deleteDirectoryItem}) {
      const item = deleteDirectoryItem.cloneNode(!0), link = item.firstElementChild, downloadUrl = new URL("https://download-directory.github.io/");
      downloadUrl.searchParams.set("url", location.href);
      link.href = downloadUrl.href;
      link.textContent = "Download directory";
      deleteDirectoryItem.before(item);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/download-folder-button.tsx", {
      include: [ isRepoTree ],
      exclude: [ isRepoHome, isEnterprise, isRepoFile404 ],
      init: function(signal) {
        observe('a[aria-keyshortcuts="d"]', download_folder_button_add, {
          signal
        });
      }
    });
    function linkifyQuickPR(element) {
      const branchUrl = buildRepoURL("tree", element.textContent);
      element.replaceWith(dom_chef.createElement("span", {
        className: "commit-ref"
      }, dom_chef.createElement("a", {
        className: "no-underline",
        href: branchUrl,
        "data-turbo-frame": "repo-content-turbo-frame"
      }, element.textContent)));
    }
    function linkifyHovercard(hovercard) {
      const {href} = hovercard.querySelector("a.Link--primary");
      for (const reference of hovercard.querySelectorAll(".commit-ref")) {
        const url = new GitHubFileURL(href).assign({
          route: "tree",
          branch: reference.title
        }), user = reference.querySelector(".user");
        if (user) url.user = user.textContent;
        reference.replaceChildren(dom_chef.createElement("a", {
          className: "no-underline",
          href: url.href,
          "data-turbo-frame": "repo-content-turbo-frame"
        }, [ ...reference.childNodes ]));
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-branch-references.tsx", {
      include: [ (url = location) => isCompare(url) && /[?&]quick_pull=1(&|$)/.test(url.search) ],
      init: async function(signal) {
        observe(".branch-name", linkifyQuickPR, {
          signal
        });
      }
    }, {
      init: function(signal) {
        observe('[data-hydro-view*="pull-request-hovercard-hover"] ~ .d-flex.mt-2', linkifyHovercard, {
          signal
        });
      }
    });
    function isDefined(value) {
      return void 0 !== value;
    }
    function attachElement(anchor, {className = "rgh-" + getCallerID(), append, prepend, before, after, forEach, allowMissingAnchor = !1}) {
      const anchorElement = "string" == typeof anchor ? select_dom_$(anchor) : anchor;
      if (!anchorElement) {
        if (allowMissingAnchor) return [];
        throw new Error("Element not found");
      }
      if (elementExists("." + className, anchorElement.parentElement ?? anchorElement)) return [];
      const call = (position, create) => {
        const element = create(anchorElement);
        element.classList.add(className);
        if ("forEach" !== position) anchorElement[position](element);
        return element;
      };
      return [ append && call("append", append), prepend && call("prepend", prepend), before && call("before", before), after && call("after", after), forEach && call("forEach", forEach) ].filter(isDefined);
    }
    const issueListSelector = isGlobalIssueOrPRList() ? "#js-issues-toolbar div" : 'div[aria-label="Issues"][role="group"]';
    function onButtonClick(event) {
      const onlySelected = event.delegateTarget.closest(".table-list-triage");
      openTabs($$(`${issueListSelector} .js-issue-row`).filter((issue => onlySelected ? elementExists(":checked", issue) : !0)).map((issue => function(issue) {
        return issue.closest(".js-issue-row").querySelector("a.js-navigation-open").href;
      }(issue))));
    }
    async function open_all_conversations_init(signal) {
      !function(anchors, {className = "rgh-" + getCallerID(), ...options}) {
        $$(`:is(${String(anchors)}):not(.${className})`).flatMap((anchor => attachElement(anchor, {
          ...options,
          className
        })));
      }(".table-list-header-toggle:not(.states)", {
        prepend: anchor => dom_chef.createElement("button", {
          type: "button",
          className: "btn-link rgh-open-all-conversations px-2"
        }, anchor.closest(".table-list-triage") ? "Open selected" : "Open all")
      });
      delegate_it_delegate("button.rgh-open-all-conversations", "click", onButtonClick, {
        signal
      });
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/open-all-conversations.tsx", {
      asLongAs: [ async function() {
        return Boolean(await elementReady(".js-issue-row + .js-issue-row", {
          waitForChildren: !1
        }));
      } ],
      include: [ isIssueOrPRList ],
      exclude: [ isGlobalIssueOrPRList ],
      init: open_all_conversations_init
    }, {
      include: [ isGlobalIssueOrPRList ],
      init: open_all_conversations_init
    });
    const previous = [ 'a[rel="prev"]', ".paginate-container a.BtnGroup-item:first-child", ".prh-commit a.BtnGroup-item:first-child" ], next = previous.join(",").replaceAll('"prev"', '"next"').replaceAll(":first", ":last");
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pagination-hotkey.tsx", {
      shortcuts: {
        "→": "Go to the next page",
        "←": "Go to the previous page"
      },
      include: [ isIssueOrPRList, isGlobalSearchResults, (url = location) => "labels" === getRepo(url)?.path, isNotifications, isRepoCommitList, isPRCommit, (url = location) => "discussions" === getRepo(url)?.path || "discussions" === getOrg(url)?.path, isReleases, isProfileRepoList ],
      init: function(signal) {
        observe(previous, (button => {
          addHotkey(button, "ArrowLeft");
        }), {
          signal
        });
        observe(next, (button => {
          addHotkey(button, "ArrowRight");
        }), {
          signal
        });
      }
    });
    const GitPullRequest = props => createElement("svg", {
      className: "octicon octicon-git-pull-request",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"
    })), IssueOpened = props => createElement("svg", {
      className: "octicon octicon-issue-opened",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
    }), createElement("path", {
      d: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"
    }));
    function addConversationLinks(repositoryLink) {
      const repository = repositoryLink.closest("li");
      select_dom_$('[href*="issues?q=label%3A%22help+wanted"]', repository)?.remove();
      assertNodeContent(select_dom_$("relative-time", repository).previousSibling, "Updated").before(dom_chef.createElement(dom_chef.Fragment, null, dom_chef.createElement("a", {
        className: "Link--muted mr-3",
        href: repositoryLink.href + "/issues"
      }, dom_chef.createElement(IssueOpened, null)), dom_chef.createElement("a", {
        className: "Link--muted mr-3",
        href: repositoryLink.href + "/pulls"
      }, dom_chef.createElement(GitPullRequest, null))));
    }
    function addSearchConversationLinks(repositoryLink) {
      repositoryLink.closest('[data-testid="results-list"] > div').querySelector("ul > span:last-of-type").before(dom_chef.createElement(dom_chef.Fragment, null, dom_chef.createElement("span", {
        "aria-hidden": "true",
        className: "color-fg-muted mx-2"
      }, "·"), dom_chef.createElement("li", {
        className: "d-flex text-small"
      }, dom_chef.createElement("a", {
        className: "Link--muted",
        href: repositoryLink.href + "/issues"
      }, dom_chef.createElement(IssueOpened, null))), dom_chef.createElement("li", {
        className: "d-flex text-small ml-2"
      }, dom_chef.createElement("a", {
        className: "Link--muted",
        href: repositoryLink.href + "/pulls"
      }, dom_chef.createElement(GitPullRequest, null)))));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/conversation-links-on-repo-lists.tsx", {
      include: [ isUserProfileRepoTab ],
      init: function(signal) {
        observe('a[itemprop="name codeRepository"]', addConversationLinks, {
          signal
        });
      }
    }, {
      include: [ () => isGlobalSearchResults() && "repositories" === new URLSearchParams(location.search).get("type") ],
      init: function(signal) {
        observe(".search-title a", addSearchConversationLinks, {
          signal
        });
      }
    });
    const queryPartsRegExp = /(?:[^\s"]+|"[^"]*")+/g, labelLinkRegex = /^(?:\/[^/]+){2}\/labels\/([^/]+)\/?$/;
    function splitQueryString(query) {
      return query.match(queryPartsRegExp) ?? [];
    }
    class SearchQuery {
      static escapeValue(value) {
        return value.includes(" ") ? `"${value}"` : value;
      }
      static from(source) {
        if (source instanceof Location || source instanceof HTMLAnchorElement) return new SearchQuery(source.href);
        const url = new URL("https://github.com");
        for (const [name, value] of Object.entries(source)) url.searchParams.set(name, value);
        return new SearchQuery(url);
      }
      url;
      queryParts;
      constructor(url, base) {
        this.url = new URL(String(url), base);
        this.queryParts = [];
        const currentQuery = this.url.searchParams.get("q");
        if ("string" == typeof currentQuery) {
          this.queryParts = splitQueryString(currentQuery);
          return;
        }
        const labelName = labelLinkRegex.exec(this.url.pathname)?.[1];
        if (!labelName) {
          this.queryParts.push(/\/pulls\/?$/.test(this.url.pathname) ? "is:pr" : "is:issue", "is:open");
          if ("/issues" === this.url.pathname || "/pulls" === this.url.pathname) {
            if (this.url.searchParams.has("user")) this.queryParts.push("user:" + this.url.searchParams.get("user")); else this.queryParts.push("author:@me");
            this.queryParts.push("archived:false");
          }
        } else this.queryParts = [ "is:open", "label:" + SearchQuery.escapeValue(decodeURIComponent(labelName)) ];
      }
      getQueryParts() {
        return function(array, ...keywords) {
          const deduplicated = [];
          let wasKeywordFound = !1;
          for (const current of [ ...array ].reverse()) {
            const isKeyword = keywords.includes(current);
            if (!isKeyword || !wasKeywordFound) {
              deduplicated.unshift(current);
              wasKeywordFound ||= isKeyword;
            }
          }
          return deduplicated;
        }(this.queryParts, "is:issue", "is:pr");
      }
      get() {
        return this.getQueryParts().join(" ");
      }
      set(query) {
        this.queryParts = splitQueryString(query);
        return this;
      }
      get searchParams() {
        return this.url.searchParams;
      }
      get href() {
        this.url.searchParams.set("q", this.get());
        if (labelLinkRegex.test(this.url.pathname)) this.url.pathname = this.url.pathname.replace(/\/labels\/.+$/, "/issues");
        return this.url.href;
      }
      edit(callback) {
        this.queryParts = callback(this.getQueryParts());
        return this;
      }
      replace(searchValue, replaceValue) {
        this.set(this.get().replace(searchValue, replaceValue));
        return this;
      }
      remove(...queryPartsToRemove) {
        this.queryParts = this.getQueryParts().filter((queryPart => !queryPartsToRemove.includes(queryPart)));
        return this;
      }
      add(...queryPartsToAdd) {
        this.queryParts.push(...queryPartsToAdd);
        return this;
      }
      includes(...searchStrings) {
        return this.getQueryParts().some((queryPart => searchStrings.includes(queryPart)));
      }
    }
    function addLinks(container) {
      const isIssues = location.pathname.startsWith("/issues"), typeQuery = isIssues ? "is:issue" : "is:pr", typeName = isIssues ? "Issues" : "Pull Requests", links = [ [ "Involved", `${typeName} you’re involved in`, "involves:@me" ], [ "Yours", `${typeName} on your repos`, "user:@me" ] ];
      for (const [label, title, query] of links) {
        const url = new URL(isIssues ? "/issues" : "/pulls", location.origin);
        url.searchParams.set("q", `${typeQuery} is:open archived:false ${query}`);
        const link = dom_chef.createElement("a", {
          href: url.href,
          title,
          className: "subnav-item"
        }, label);
        if (SearchQuery.from(location).includes(query) && !elementExists(".subnav-links .selected")) {
          link.classList.add("selected");
          for (const otherLink of $$(".subnav-links a")) otherLink.href = SearchQuery.from(otherLink).remove(query).href;
        }
        container.append(link);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/global-conversation-list-filters.tsx", {
      include: [ isGlobalIssueOrPRList ],
      init: function(signal) {
        observe(".subnav-links", addLinks, {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/more-conversation-filters.tsx", {
      include: [ isRepoIssueOrPRList ],
      awaitDomReady: !0,
      deduplicate: "has-rgh-inner",
      init: function() {
        const sourceItem = select_dom_$("#filters-select-menu a:nth-last-child(2)"), commentsLink = sourceItem.cloneNode(!0);
        commentsLink.lastChild.textContent = "Everything you’re involved in";
        commentsLink.removeAttribute("target");
        commentsLink.href = SearchQuery.from(commentsLink).set("is:open involves:@me").href;
        commentsLink.setAttribute("aria-checked", String(commentsLink.href === location.href));
        sourceItem.after(commentsLink);
        const subscriptionsLink = select_dom_$("#filters-select-menu a:last-child").cloneNode(!0);
        subscriptionsLink.lastElementChild.textContent = "Everything you subscribed to";
        const subscriptionsUrl = new URL("https://github.com/notifications/subscriptions"), repositoryId = select_dom_$('meta[name="octolytics-dimension-repository_id"]')?.content ?? select_dom_$('input[name="repository_id"]').value;
        subscriptionsUrl.searchParams.set("repository", stringToBase64(`010:Repository${repositoryId}`));
        subscriptionsLink.href = subscriptionsUrl.href;
        commentsLink.after(subscriptionsLink);
      }
    });
    function saveOriginalHref(link) {
      link.dataset.originalHref ||= link.href;
    }
    function updateLink(link) {
      if (link.host === location.host && !link.closest(".pagination, .table-list-header-toggle")) {
        if (isIssueOrPRList(link)) {
          saveOriginalHref(link);
          const newUrl = SearchQuery.from(link).add("sort:updated-desc").href, isRelativeAttribute = link.getAttribute("href").startsWith("/");
          link.href = isRelativeAttribute ? newUrl.replace(location.origin, "") : newUrl;
        }
        if (isProjects()) {
          saveOriginalHref(link);
          const search = new URLSearchParams(link.search), query = search.get("query") ?? "is:open";
          search.set("query", `${query} sort:updated-desc`);
          link.search = search.toString();
        }
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/sort-conversations-by-update-time.tsx", {
      init: function(signal) {
        observe('\n\t\t\ta:is(\n\t\t\t\t[href*="/issues"],\n\t\t\t\t[href*="/pulls"],\n\t\t\t\t[href*="/projects"],\n\t\t\t\t[href*="/labels/"]\n\t\t\t):not(\n\t\t\t\t[href*="sort%3A"],\n\t\t\t\t.issues-reset-query\n\t\t\t)\n\t\t', updateLink, {
          signal
        });
      }
    }, {
      include: [ isRepoIssueOrPRList ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        const currentSearchURL = location.href.replace("/pulls?", "/issues?"), menu = await elementReady("#filters-select-menu"), currentFilter = select_dom_$(`a.SelectMenu-item[href="${currentSearchURL}"]`, menu);
        if (currentFilter) {
          select_dom_$('[aria-checked="true"]', menu)?.setAttribute("aria-checked", "false");
          currentFilter.setAttribute("aria-checked", "true");
        }
      }
    });
    function batchedFunction(function_, {delay} = {}) {
      if ("number" != typeof delay && void 0 !== delay) throw new TypeError(`Expected \`interval\` to be of type \`number\` but received type \`${typeof delay}\``);
      const queueCall = void 0 === delay ? async () => {} : (interval = delay, async () => new Promise((resolve => {
        setTimeout(resolve, interval);
      })));
      var interval;
      let queue = [];
      return value => {
        queue.push(value);
        if (1 === queue.length) (async () => {
          await queueCall();
          function_(queue);
          queue = [];
        })();
      };
    }
    function looseParseInt(text) {
      if (!text) return 0;
      if ("string" != typeof text) text = text.textContent;
      return Number(text.replaceAll(/\D+/g, ""));
    }
    const getLastUpdated = new CachedFunction("last-updated", {
      async updater(issueNumbers) {
        const {repository} = await v4(`\n\t\trepository() {\n\t\t\t${issueNumbers.map((number => `\n\t\t\t\t${escapeKey(number)}: issue(number: ${number}) {\n\t\t\t\t\tupdatedAt\n\t\t\t\t}\n\t\t\t`)).join("\n")}\n\t\t}\n\t`);
        return repository;
      },
      maxAge: {
        minutes: 30
      },
      cacheKey: ([issues]) => `${github_helpers_getRepo().nameWithOwner}:${String(issues)}`
    });
    function getPinnedIssueNumber(pinnedIssue) {
      return looseParseInt(select_dom_$(".opened-by", pinnedIssue).firstChild);
    }
    async function update(pinnedIssues) {
      const lastUpdated = await getLastUpdated.get(pinnedIssues.map((issue => getPinnedIssueNumber(issue))));
      for (const pinnedIssue of pinnedIssues) {
        const issueNumber = getPinnedIssueNumber(pinnedIssue), {updatedAt} = lastUpdated[escapeKey(issueNumber)], originalLine = select_dom_$(".opened-by", pinnedIssue);
        originalLine.after(dom_chef.createElement("span", {
          className: "text-small color-fg-muted"
        }, dom_chef.createElement("span", {
          className: "rgh-pinned-issue-number"
        }, "#", issueNumber), " updated ", dom_chef.createElement("relative-time", {
          datetime: updatedAt
        })));
        originalLine.hidden = !0;
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pinned-issues-update-time.tsx", {
      include: [ isRepoIssueList ],
      init: async function(signal) {
        observe(".pinned-issue-item", batchedFunction(update, {
          delay: 100
        }), {
          signal
        });
      }
    });
    const ChevronLeft = props => createElement("svg", {
      className: "octicon octicon-chevron-left",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"
    }));
    function groupButtons(buttons) {
      for (let button of buttons) {
        if (!button.matches("button, .btn")) {
          button.classList.add("BtnGroup-parent");
          button = button.querySelector(".btn");
        }
        button.classList.add("BtnGroup-item");
      }
      let group = buttons[0].closest(".BtnGroup");
      if (!group) {
        group = dom_chef.createElement("div", {
          className: "BtnGroup"
        });
        wrapAll(group, ...buttons);
      }
      return group;
    }
    async function isDefaultBranch() {
      const repo = github_helpers_getRepo();
      if (!repo) return !1;
      const [type, ...parts] = repo.path.split("/");
      if (0 === parts.length) return !0;
      if (![ "tree", "blob", "commits" ].includes(type)) return !1;
      const path = parts.join("/"), defaultBranch = await getDefaultBranch();
      return path === defaultBranch || path.startsWith(`${defaultBranch}/`);
    }
    async function default_branch_button_add(branchSelector2) {
      const url = new GitHubFileURL(location.href);
      if (isRepoRoot()) {
        url.route = "";
        url.branch = "";
      } else url.branch = await getDefaultBranch();
      const defaultLink = dom_chef.createElement("a", {
        className: "btn tooltipped tooltipped-se px-2",
        href: url.href,
        "data-turbo-frame": "repo-content-turbo-frame",
        "aria-label": "See this view on the default branch"
      }, dom_chef.createElement(ChevronLeft, null)), selectorWrapper = "SUMMARY" === branchSelector2.tagName ? branchSelector2.parentElement : branchSelector2;
      selectorWrapper.before(defaultLink);
      groupButtons([ defaultLink, selectorWrapper ]).classList.add("d-flex", "rgh-default-branch-button-group");
      if (!await isUrlReachable(url.href)) {
        defaultLink.classList.add("disabled");
        defaultLink.setAttribute("aria-label", "Object not found on the default branch");
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/default-branch-button.tsx", {
      include: [ isRepoTree, isSingleFile, isRepoCommitListRoot ],
      exclude: [ isDefaultBranch ],
      init: function(signal) {
        observe(branchSelector, default_branch_button_add, {
          signal
        });
      }
    });
    const Book = props => createElement("svg", {
      className: "octicon octicon-book",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"
    })), Diff = props => createElement("svg", {
      className: "octicon octicon-diff",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8.75 1.75V5H12a.75.75 0 0 1 0 1.5H8.75v3.25a.75.75 0 0 1-1.5 0V6.5H4A.75.75 0 0 1 4 5h3.25V1.75a.75.75 0 0 1 1.5 0ZM4 13h8a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 4 13Z"
    })), DiffModified = props => createElement("svg", {
      className: "octicon octicon-diff-modified",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1ZM2.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"
    }));
    function isHidingWhitespace() {
      return "1" === new URL(location.href).searchParams.get("w") || elementExists('button[name="w"][value="0"]:not([hidden])');
    }
    function createWhitespaceButton() {
      const url = new URL(location.href);
      if (isHidingWhitespace()) url.searchParams.delete("w"); else url.searchParams.set("w", "1");
      return dom_chef.createElement("a", {
        href: url.href,
        "data-hotkey": "d w",
        className: "tooltipped tooltipped-s btn btn-sm tooltipped " + (isHidingWhitespace() ? "color-fg-subtle" : ""),
        "aria-label": (isHidingWhitespace() ? "Show" : "Hide") + " whitespace changes"
      }, isHidingWhitespace() && dom_chef.createElement(Check, null), " No Whitespace");
    }
    function attachPRButtons(dropdownIcon) {
      const dropdown = dropdownIcon.closest("details.diffbar-item"), diffSettingsForm = select_dom_$('form[action$="/diffview"]', dropdown), isUnified = "unified" === new FormData(diffSettingsForm).get("diff"), token = select_dom_$('[name="authenticity_token"]', diffSettingsForm);
      diffSettingsForm.replaceChildren(token);
      const type = isUnified ? "split" : "unified", Icon = isUnified ? Book : Diff;
      diffSettingsForm.append(dom_chef.createElement("button", {
        className: "tooltipped tooltipped-s ml-2 btn-link Link--muted p-2",
        "aria-label": `Switch to the ${type} diff view`,
        name: "diff",
        value: type,
        type: "submit"
      }, dom_chef.createElement(Icon, {
        className: "v-align-middle"
      })));
      if (!isHidingWhitespace()) diffSettingsForm.append(dom_chef.createElement("button", {
        "data-hotkey": "d w",
        className: "tooltipped tooltipped-s btn-link Link--muted p-2",
        "aria-label": "Hide whitespace changes",
        name: "w",
        value: "1",
        type: "submit"
      }, dom_chef.createElement(DiffModified, {
        className: "v-align-middle"
      })));
      dropdown.replaceWith(diffSettingsForm);
      const prTitle = select_dom_$(".pr-toolbar .js-issue-title");
      if (prTitle && elementExists(".pr-toolbar progress-bar")) {
        prTitle.style.maxWidth = "24em";
        prTitle.title = prTitle.textContent;
      }
      removeTextNodeContaining(select_dom_$('[data-hotkey="c"] strong').previousSibling, "Changes from");
      select_dom_$(".subset-files-tab")?.classList.replace("px-sm-3", "ml-sm-2");
    }
    function attachButtons(nativeDiffButtons) {
      const anchor = nativeDiffButtons.parentElement, usesFloats = anchor?.classList.contains("float-right");
      if (usesFloats) anchor.after(dom_chef.createElement("div", {
        className: "float-right mr-3"
      }, createWhitespaceButton())); else anchor.before(createWhitespaceButton());
    }
    const shortcuts = {
      "d w": "Show/hide whitespaces in diffs"
    };
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/one-click-diff-options.tsx", {
      shortcuts,
      include: [ isPRFiles ],
      exclude: [ isPRFile404, isEnterprise ],
      init: function(signal) {
        observe(".hide-sm.hide-md details.diffbar-item svg.octicon-gear", attachPRButtons, {
          signal
        });
      }
    }, {
      shortcuts,
      include: [ isCompare ],
      init: function(signal) {
        observe('[action="/users/diffview"]', attachButtons, {
          signal
        });
      }
    });
    const ci_link_namespaceObject = "query GetChecks($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tdefaultBranchRef {\n\t\t\ttarget {\n\t\t\t\t... on Commit {\n\t\t\t\t\thistory(first: 3) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\toid\n\t\t\t\t\t\t\tstatusCheckRollup {\n\t\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n";
    async function ci_link_add(anchor) {
      const commit = await async function() {
        const {repository} = await v4(ci_link_namespaceObject);
        for (const commit of repository.defaultBranchRef.target.history.nodes) if (commit.statusCheckRollup) return commit.oid;
      }();
      if (!commit) return;
      const endpoint = buildRepoURL("commits/checks-statuses-rollups");
      anchor.parentElement.append(dom_chef.createElement("span", {
        className: "rgh-ci-link ml-1"
      }, dom_chef.createElement("batch-deferred-content", {
        hidden: !0,
        "data-url": endpoint
      }, dom_chef.createElement("input", {
        name: "oid",
        value: commit,
        "data-targets": "batch-deferred-content.inputs"
      }))));
      anchor.closest(".AppHeader-context-full")?.style.setProperty("overflow", "visible");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/ci-link.tsx", {
      include: [ hasRepoHeader ],
      init: async function(signal) {
        observe([ ".AppHeader-context-item:not([data-hovercard-type])", ".AppHeader-context-compact-mainItem > span:first-child", '[itemprop="name"]:not(.avatar ~ [itemprop])' ], ci_link_add, {
          signal
        });
      }
    });
    const ChevronDown = props => createElement("svg", {
      className: "octicon octicon-chevron-down",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"
    })), ChevronUp = props => createElement("svg", {
      className: "octicon octicon-chevron-up",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M3.22 10.53a.749.749 0 0 1 0-1.06l4.25-4.25a.749.749 0 0 1 1.06 0l4.25 4.25a.749.749 0 1 1-1.06 1.06L8 6.811 4.28 10.53a.749.749 0 0 1-1.06 0Z"
    })), ArrowUp = props => createElement("svg", {
      className: "octicon octicon-arrow-up",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M3.47 7.78a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018L9 4.81v7.44a.75.75 0 0 1-1.5 0V4.81L4.53 7.78a.75.75 0 0 1-1.06 0Z"
    })), wasHidden = new CachedFunction("toggle-files-button", {
      updater: async () => !1,
      cacheKey: cacheByRepo
    }), hiddenFilesClass = "rgh-files-hidden", toggleButtonClass = "rgh-toggle-files", noticeClass = "rgh-files-hidden-notice", noticeStyle = {
      paddingRight: "16px"
    };
    function toggle(toggle2) {
      return document.body.classList.toggle(hiddenFilesClass, toggle2);
    }
    async function toggleHandler() {
      select_dom_$(`.${noticeClass}`)?.remove();
      if (toggle()) await wasHidden.applyOverride([], !0); else await wasHidden.delete();
    }
    async function updateView(button) {
      button.closest('[class^="Box"]').append(dom_chef.createElement("button", {
        type: "button",
        className: `btn-octicon ${toggleButtonClass}`,
        "aria-label": "Toggle files section"
      }, dom_chef.createElement(ChevronDown, null), dom_chef.createElement(ChevronUp, null)));
      if (await wasHidden.getCached()) {
        toggle(!0);
        attachElement(expectElement('[aria-labelledby="folders-and-files"]'), {
          className: noticeClass,
          after: () => dom_chef.createElement("div", {
            className: "py-1 text-right text-small color-fg-subtle",
            style: noticeStyle
          }, "The file list was collapsed via Refined GitHub ", dom_chef.createElement(ArrowUp, {
            className: "v-align-middle"
          }))
        });
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/toggle-files-button.tsx", {
      include: [ isRepoTree ],
      init: async function(signal) {
        observe('[aria-label="Commit history"]', updateView, {
          signal
        });
        delegate_it_delegate(`.${toggleButtonClass}, .${noticeClass}`, "click", toggleHandler, {
          signal
        });
      }
    });
    const fieldSelector = [ "#commit-summary-input", "#merge_title_field" ].join(", ");
    function onCommitTitleUpdate(callback, signal) {
      delegate_it_delegate(fieldSelector, "change", callback, {
        signal
      });
      delegate_it_delegate(fieldSelector, "input", callback, {
        signal
      });
    }
    const prTitleFieldSelector = "input#issue_title", commitTitleFieldSelector = ".is-squashing form:not([hidden]) input#merge_title_field";
    function getCurrentCommitTitleField() {
      return select_dom_$(commitTitleFieldSelector);
    }
    function getCurrentCommitTitle() {
      return getCurrentCommitTitleField()?.value.trim();
    }
    function createCommitTitle() {
      return `${select_dom_$(prTitleFieldSelector).value.trim()} (#${getConversationNumber()})`;
    }
    function needsSubmission() {
      const currentCommitTitle = getCurrentCommitTitle();
      return Boolean(currentCommitTitle) && createCommitTitle() !== currentCommitTitle;
    }
    function getUI() {
      const cancelButton = dom_chef.createElement("button", {
        type: "button",
        className: "btn-link Link--muted text-underline rgh-sync-pr-commit-title"
      }, "Cancel");
      return select_dom_$(".rgh-sync-pr-commit-title-note") ?? dom_chef.createElement("p", {
        className: "note rgh-sync-pr-commit-title-note"
      }, "The title of this PR will be updated to match this title. ", cancelButton);
    }
    function updateUI() {
      if (needsSubmission()) getCurrentCommitTitleField().after(getUI()); else getUI().remove();
    }
    async function updatePRTitle() {
      if (!needsSubmission()) return;
      const title = (commitTitle = getCurrentCommitTitle(), pr = getConversationNumber(), 
      commitTitle.replace(new RegExp(`\\(#${pr}\\)\\s*$`), "").trim());
      var commitTitle, pr;
      await v3(`pulls/${getConversationNumber()}`, {
        method: "PATCH",
        body: {
          title
        }
      });
    }
    async function updateCommitTitle() {
      const field = getCurrentCommitTitleField();
      if (field) {
        field.value = createCommitTitle();
        field.dispatchEvent(new Event("input", {
          bubbles: !0
        }));
      }
    }
    function disableSubmission() {
      feature_manager.unload("file:///home/runner/work/refined-github/refined-github/source/features/sync-pr-commit-title.tsx");
      getUI().remove();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/sync-pr-commit-title.tsx", {
      asLongAs: [ userCanLikelyMergePR ],
      include: [ distribution_isPRConversation ],
      awaitDomReady: !0,
      init: function(signal) {
        observe(commitTitleFieldSelector, updateCommitTitle, {
          signal
        });
        observe(".gh-header-title", updateCommitTitle, {
          signal
        });
        onCommitTitleUpdate(updateUI, signal);
        delegate_it_delegate("form.js-merge-pull-request", "submit", updatePRTitle, {
          signal
        });
        delegate_it_delegate(".rgh-sync-pr-commit-title", "click", disableSubmission, {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/hide-inactive-deployments.tsx", {
      include: [ distribution_isPRConversation ],
      awaitDomReady: !0,
      init: function() {
        const deployments = $$('.js-socket-channel[data-url*="/partials/deployed_event/"]');
        deployments.pop();
        for (const deployment of deployments) if (elementExists('[title="Deployment Status Label: Inactive"]', deployment)) deployment.remove();
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pull-request-hotkeys.tsx", {
      shortcuts: {
        "g <number>": "Go to PR tab <number>",
        "g →": "Go to next PR tab",
        "g ←": "Go to previous PR tab"
      },
      include: [ isPR ],
      init: async function() {
        const tabs = $$("a.tabnav-tab", await elementReady("#partial-discussion-header + .tabnav")), lastTab = tabs.length - 1, selectedIndex = tabs.findIndex((tab => tab.classList.contains("selected")));
        for (const [index, tab] of tabs.entries()) {
          addHotkey(tab, `g ${index + 1}`);
          if (index === selectedIndex - 1 || 0 === selectedIndex && index === lastTab) addHotkey(tab, "g ArrowLeft"); else if (index === selectedIndex + 1 || selectedIndex === lastTab && 0 === index) addHotkey(tab, "g ArrowRight");
        }
      }
    });
    const FileDiff = props => createElement("svg", {
      className: "octicon octicon-file-diff",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M1 1.75C1 .784 1.784 0 2.75 0h7.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073ZM8 3.25a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0V7h-1.5a.75.75 0 0 1 0-1.5h1.5V4A.75.75 0 0 1 8 3.25Zm-3 8a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
    }));
    function replaceCheckboxes(originalSubmitButton) {
      const form = originalSubmitButton.form, actionsRow = originalSubmitButton.closest(".Overlay-footer"), formAttribute = originalSubmitButton.getAttribute("form"), radios = [ ...form.elements.namedItem("pull_request_review[event]") ];
      if (0 === radios.length) {
        feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/one-click-review-submission.tsx", "Could not find radio buttons");
        return;
      }
      if (radios.length > 1) form.prepend(dom_chef.createElement("input", {
        type: "hidden",
        name: "pull_request_review[event]",
        value: "comment"
      }));
      actionsRow.prepend(dom_chef.createElement("span", {
        className: "spacer.gif ml-auto"
      }));
      radios.reverse();
      for (const radio of radios) {
        const parent = radio.parentElement, labelElement = expectElement("label", parent), tooltip = expectElement(".FormControl-caption", parent).textContent.trim().replace(/\.$/, "");
        assertNodeContent(labelElement, /^(Approve|Request changes|Comment)$/);
        const classes = [ "btn btn-sm" ];
        if (tooltip) classes.push("tooltipped tooltipped-nw tooltipped-no-delay");
        const button = dom_chef.createElement("button", {
          type: "submit",
          name: "pull_request_review[event]",
          form: formAttribute,
          value: radio.value,
          className: classes.join(" "),
          "aria-label": tooltip,
          disabled: radio.disabled
        }, labelElement.textContent);
        if (!radio.disabled && "approve" === radio.value) button.prepend(dom_chef.createElement(Check, {
          className: "color-fg-success"
        })); else if (!radio.disabled && "reject" === radio.value) button.prepend(dom_chef.createElement(FileDiff, {
          className: "color-fg-danger"
        }));
        actionsRow.prepend(button);
      }
      const fieldset = radios[0].closest("fieldset");
      if (fieldset) fieldset.remove(); else for (const radio of radios) radio.closest(".form-checkbox").remove();
      originalSubmitButton.remove();
    }
    let lastSubmission;
    function blockDuplicateSubmissions(event) {
      if (!(lastSubmission && Date.now() - lastSubmission < 1e3)) lastSubmission = Date.now(); else {
        event.preventDefault();
        console.log("Duplicate submission prevented");
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/one-click-review-submission.tsx", {
      include: [ isPRFiles ],
      awaitDomReady: !0,
      init: function(signal) {
        observe('#review-changes-modal [type="submit"]:not([name])', replaceCheckboxes, {
          signal
        });
        delegate_it_delegate("#review-changes-modal form", "submit", blockDuplicateSubmissions, {
          signal
        });
      }
    });
    const doma = html => {
      if (null == html) return new DocumentFragment;
      const template = document.createElement("template");
      template.innerHTML = html;
      return template.content;
    };
    doma.one = html => doma(html).firstElementChild ?? void 0;
    const node_modules_doma = doma;
    var embed_gist_inline_browser = __webpack_require__(131);
    const fetchGist = memoize((async url => embed_gist_inline_browser.runtime.sendMessage({
      fetchJSON: `${url}.json`
    })));
    function embed_gist_inline_isGist(link) {
      return 1 === function(link) {
        if ("gist.github.com" === link.host) return github_helpers_getCleanPathname(link);
        if (link.host === location.host && link.pathname.startsWith("gist/")) return link.pathname.replace("/gist", "").replace(/\/$/, ""); else return;
      }(link)?.replace(/[^/]/g, "").length;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/embed-gist-inline.tsx", {
      include: [ hasComments ],
      init: function(signal) {
        observe(standaloneGistLinkInMarkdown, (link => {
          if (embed_gist_inline_isGist(link) && (link => link.textContent.trim() === link.parentElement.textContent.trim())(link)) !async function(link) {
            const info = dom_chef.createElement("em", null, " (loading)");
            link.after(info);
            try {
              const gistData = await fetchGist(link.href);
              if (gistData.div.length > 1e4) {
                info.textContent = " (too large to embed)";
                return;
              }
              const fileCount = gistData.files.length;
              if (fileCount > 1) info.textContent = ` (${fileCount} files)`; else {
                const container = dom_chef.createElement("div", null);
                container.attachShadow({
                  mode: "open"
                }).append(dom_chef.createElement("style", null, "\n\t\t\t\t\t.gist .gist-data {\n\t\t\t\t\t\tmax-height: 16em;\n\t\t\t\t\t\toverflow-y: auto;\n\t\t\t\t\t}\n\t\t\t\t"), dom_chef.createElement("link", {
                  rel: "stylesheet",
                  href: gistData.stylesheet
                }), node_modules_doma.one(gistData.div));
                link.parentElement.after(container);
                info.remove();
              }
            } catch {
              info.remove();
            }
          }(link);
        }), {
          signal
        });
      }
    });
    const X = props => createElement("svg", {
      className: "octicon octicon-x",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
    }));
    async function addNotice(message, {type = "notice", action = dom_chef.createElement("button", {
      className: "flash-close js-flash-close",
      type: "button",
      "aria-label": "Dismiss this message"
    }, dom_chef.createElement(X, null))} = {}) {
      (await elementReady("#js-flash-container")).append(dom_chef.createElement("div", {
        className: `flash flash-full flash-${type} px-4`
      }, action, dom_chef.createElement("div", null, message)));
    }
    const comments_time_machine_links_namespaceObject = "query GetCommitAtDate(\n\t$owner: String!\n\t$name: String!\n\t$branch: String!\n\t$date: GitTimestamp!\n) {\n\trepository(owner: $owner, name: $name) {\n\t\tref(qualifiedName: $branch) {\n\t\t\ttarget {\n\t\t\t\t... on Commit {\n\t\t\t\t\thistory(first: 1, until: $date) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\toid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n";
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/comments-time-machine-links.tsx", {
      include: [ hasComments ],
      exclude: [ isGist ],
      init: function(signal) {
        observe(".timeline-comment-actions > details:last-child", (menu => {
          if (menu.closest(".js-pending-review-comment")) return;
          const timestamp = menu.closest('.js-comment:not([id^="pullrequestreview-"]), .js-timeline-item').querySelector("relative-time").attributes.datetime.value;
          !function(menu, timestamp) {
            const comment = menu.closest(".js-comment"), links = $$(`\n\t\ta[href^="${location.origin}"][href*="/blob/"]:not(.${linkifiedURLClass}),\n\t\ta[href^="${location.origin}"][href*="/tree/"]:not(.${linkifiedURLClass})\n\t`, comment);
            for (const link of links) {
              const linkParts = link.pathname.split("/");
              if (/^[\da-f]{40}$/.test(linkParts[4])) continue;
              saveOriginalHref(link);
              const searchParameters = new URLSearchParams(link.search);
              searchParameters.set("rgh-link-date", timestamp);
              link.search = String(searchParameters);
            }
          }(menu, timestamp);
          !function(menu, timestamp) {
            select_dom_$(".show-more-popover", menu.parentElement).append(dom_chef.createElement("div", {
              className: "dropdown-divider"
            }), dom_chef.createElement("a", {
              href: buildRepoURL(`tree/HEAD@{${timestamp}}`),
              className: "dropdown-item btn-link " + linkifiedURLClass,
              role: "menuitem",
              title: "Browse repository like it appeared on this day"
            }, "View repo at this time"));
          }(menu, timestamp);
        }), {
          signal
        });
      }
    }, {
      asLongAs: [ () => new URLSearchParams(location.search).has("rgh-link-date") ],
      include: [ is404, isSingleFile, isRepoTree ],
      init: async function() {
        const url = new URL(location.href), date = url.searchParams.get("rgh-link-date");
        url.searchParams.delete("rgh-link-date");
        history.replaceState(history.state, document.title, url.href);
        if (is404()) {
          const pathnameParts = url.pathname.split("/");
          pathnameParts[4] = `HEAD@{${date}}`;
          url.pathname = pathnameParts.join("/");
        } else {
          if (await isPermalink()) return !1;
          const lastCommitDate = await elementReady(".Box-header relative-time", {
            waitForChildren: !1
          });
          if (lastCommitDate && date > lastCommitDate.getAttribute("datetime")) return !1;
          const parsedUrl = new GitHubFileURL(location.href);
          !async function(url, date) {
            const {repository} = await v4(comments_time_machine_links_namespaceObject, {
              variables: {
                date,
                branch: url.branch
              }
            }), [{oid}] = repository.ref.target.history.nodes;
            select_dom_$("a.rgh-link-date").pathname = url.assign({
              branch: oid
            }).pathname;
          }(parsedUrl, date);
          parsedUrl.branch = `${parsedUrl.branch}@{${date}}`;
          url.pathname = parsedUrl.pathname;
        }
        const link = dom_chef.createElement("a", {
          className: "rgh-link-date",
          href: url.href,
          "data-turbo-frame": "repo-content-turbo-frame"
        }, "view this object as it appeared at the time of the comment");
        await addNotice(dom_chef.createElement(dom_chef.Fragment, null, "You can also ", link, " (", dom_chef.createElement("relative-time", {
          datetime: date
        }), ")"));
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/hide-issue-list-autocomplete.tsx", {
      include: [ isIssueOrPRList ],
      exclude: [ isMilestone ],
      awaitDomReady: !0,
      init: function() {
        select_dom_$(".subnav-search").setAttribute("autocomplete", "off");
      }
    });
    function listener({key, target}) {
      if ("Escape" === key && /^#L|^#diff-[\da-f]+R\d+/.test(location.hash) && !isEditable(target)) {
        location.hash = "#no-line";
        history.replaceState(void 0, document.title, location.pathname);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/esc-to-deselect-line.tsx", {
      include: [ hasCode ],
      init: function(signal) {
        document.body.addEventListener("keyup", listener, {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/create-release-shortcut.tsx", {
      shortcuts: {
        c: "Create a new release"
      },
      include: [ isReleasesOrTags ],
      exclude: [ isNewRelease, isEditingRelease ],
      init: function(signal) {
        registerHotkey("c", buildRepoURL("releases/new"), {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/patch-diff-links.tsx", {
      include: [ isCommit ],
      exclude: [ isPRCommit404 ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        let commitUrl = "/" + github_helpers_getCleanPathname();
        if (isPRCommit()) commitUrl = commitUrl.replace(/\/pull\/\d+\/commits/, "/commit");
        const commitMeta = await elementReady(".commit-meta");
        commitMeta.classList.remove("no-wrap");
        commitMeta.lastElementChild.append(dom_chef.createElement("span", {
          className: "sha-block",
          "data-turbo": "false"
        }, dom_chef.createElement("a", {
          href: `${commitUrl}.patch`,
          className: "sha"
        }, "patch"), " ", dom_chef.createElement("a", {
          href: `${commitUrl}.diff`,
          className: "sha"
        }, "diff")));
      }
    });
    const selectors = [ ".BorderGrid--spacious .f4.my-3", ".js-commits-list-item pre", ".js-commit-group pre", ".release-header", ".Box-row .mb-1 a", "#pull-requests a.Link--primary", '[id^="check_suite"] a.Link--primary', '.js-socket-channel[data-url*="/header_partial"] h3', ".js-wiki-sidebar-toggle-display a", "#wiki-wrapper .gh-header-title", '#user-repositories-list [itemprop="description"]', ".js-hovercard-content > .Popover-message .Link--primary", ".search-title a", '.notification-thread-subscription [id^="subscription_link_"]' ];
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/parse-backticks.tsx", {
      init: node_modules_onetime((function() {
        observe(selectors, dom_formatters_parseBackticks);
      }))
    });
    const objectEntries = Object.entries, GitMerge = props => createElement("svg", {
      className: "octicon octicon-git-merge",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"
    })), filterMergeCommits = async commits => {
      const {repository} = await v4(`\n\t\trepository() {\n\t\t\t${commits.map((commit => `\n\t\t\t\t${escapeKey(commit)}: object(expression: "${commit}") {\n\t\t\t\t... on Commit {\n\t\t\t\t\t\tparents {\n\t\t\t\t\t\t\ttotalCount\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t`)).join("\n")}\n\t\t}\n\t`), mergeCommits = [];
      for (const [key, commit] of objectEntries(repository)) if (commit.parents.totalCount >= 2) mergeCommits.push(key.slice(1));
      return mergeCommits;
    };
    function getCommitLink(commit) {
      return select_dom_$([ "a.markdown-title", ".markdown-title a" ], commit);
    }
    function getCommitHash(commit) {
      return getCommitLink(commit).pathname.split("/").pop();
    }
    function updateCommitIcon(commit, replace) {
      if (replace) select_dom_$(".octicon-git-commit", commit).replaceWith(dom_chef.createElement(GitMerge, {
        style: {
          marginLeft: "0.5rem"
        }
      })); else getCommitLink(commit).before(dom_chef.createElement(GitMerge, {
        className: "mr-1"
      }));
    }
    async function markCommits(commits) {
      const isPRConversation = distribution_isPRConversation(), mergeCommits = await filterMergeCommits(commits.map((commit => getCommitHash(commit))));
      for (const commit of commits) if (mergeCommits.includes(getCommitHash(commit))) {
        commit.classList.add("rgh-merge-commit");
        updateCommitIcon(commit, isPRConversation);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/mark-merge-commits-in-list.tsx", {
      include: [ isCommitList, distribution_isPRConversation, isCompare ],
      init: async function(signal) {
        observe([ ".listviewitem", ".js-commits-list-item", ".js-timeline-item .TimelineItem:has(.octicon-git-commit)" ], batchedFunction(markCommits, {
          delay: 100
        }), {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/swap-branches-on-compare.tsx", {
      include: [ isCompare ],
      exclude: [ () => 2 === /\.\.+/.exec(location.pathname)?.[0].length, isBlank ],
      awaitDomReady: !0,
      deduplicate: "has-rgh",
      init: function() {
        const references = github_helpers_getRepo().path.replace("compare/", "").split("...").reverse();
        if (1 === references.length) references.unshift(select_dom_$(".branch span").textContent);
        select_dom_$(".range-editor .d-inline-block + .range-cross-repo-pair").after(dom_chef.createElement("a", {
          className: "btn btn-sm mx-2",
          href: buildRepoURL("compare/" + references.join("..."))
        }, "Swap"));
      }
    });
    function getUserAvatar(username, size) {
      const cleanName = username.replace("[bot]", ""), existingAvatar = select_dom_$(`[href="/${cleanName}" i] img`);
      if (existingAvatar) return existingAvatar.src;
      if (cleanName === username) {
        return (isEnterprise() ? `/${username}.png` : `https://avatars.githubusercontent.com/${username}`) + "?size=" + 2 * size;
      }
    }
    const avatarSize = 16;
    const viewportObserver = new IntersectionObserver((changes => {
      for (const change of changes) if (change.isIntersecting) {
        showAvatarsOn(change.target);
        viewportObserver.unobserve(change.target);
      }
    }), {
      rootMargin: "500px"
    });
    function showAvatarsOn(commentReactions) {
      const avatarLimit = 36 - 3 * $$(".social-reaction-summary-item", commentReactions).length, flatParticipants = function(table, limit = 1 / 0) {
        if (limit <= 0) return [];
        const maxColumns = Math.max(...table.map((row => row.length))), zipped = [];
        for (let col = 0; col < maxColumns; col++) for (const row of table) if (row.length > col) {
          zipped.push(row[col]);
          if (zipped.length === limit) return zipped;
        }
        return zipped;
      }($$(":scope > button.social-reaction-summary-item", commentReactions).map((button => function(button) {
        const users = button.nextElementSibling.textContent.replace(/ reacted with.*/, "").replace(/,? and /, ", ").replace(/, \d+ more/, "").split(", "), currentUser = github_helpers_getUsername(), participants = [];
        for (const username of users) {
          if (username === currentUser) continue;
          const imageUrl = getUserAvatar(username, avatarSize);
          if (imageUrl) participants.push({
            button,
            username,
            imageUrl
          });
        }
        return participants;
      }(button))), avatarLimit);
      for (const {button, username, imageUrl} of flatParticipants) button.append(dom_chef.createElement("span", {
        className: "avatar-user avatar rgh-reactions-avatar p-0 flex-self-center"
      }, dom_chef.createElement("img", {
        src: imageUrl,
        className: "d-block",
        width: avatarSize,
        height: avatarSize,
        alt: `@${username}`
      })));
    }
    function observeCommentReactions(commentReactions) {
      viewportObserver.observe(commentReactions);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/reactions-avatars.tsx", {
      include: [ hasComments, isReleasesOrTags, isSingleReleaseOrTag, isDiscussion ],
      init: function(signal) {
        observe(".has-reactions .js-comment-reactions-options", observeCommentReactions, {
          signal
        });
        onAbort(signal, viewportObserver);
      }
    });
    async function show_names_updateLink(batchedUsernameElements) {
      const myUsername = github_helpers_getUsername();
      batchedUsernameElements = batchedUsernameElements.filter((({textContent: name}) => name !== myUsername && "ghost" !== name));
      const usernames = new Set(batchedUsernameElements.map((element => element.textContent)));
      if (0 === usernames.size) return;
      const names = await v4([ ...usernames ].map((user => escapeKey(user) + `: user(login: "${user}") {name}`)).join(","));
      for (const usernameElement of batchedUsernameElements) {
        const username = usernameElement.textContent, userKey = escapeKey(username), {name} = names[userKey];
        if (!name) continue;
        if (isUsernameAlreadyFullName(username, name)) {
          usernameElement.textContent = name;
          continue;
        }
        const {parentElement} = usernameElement;
        ("STRONG" === parentElement.tagName ? parentElement : usernameElement).after(" ", dom_chef.createElement("span", {
          className: "color-fg-muted css-truncate d-inline-block"
        }, "(", dom_chef.createElement("bdo", {
          className: "css-truncate-target",
          style: {
            maxWidth: "200px"
          }
        }, name), ")"), " ");
      }
      !function(elements) {
        for (const element of elements) {
          const commentedNode = element.parentNode.nextSibling;
          if (element.closest(".timeline-comment-header") && commentedNode) removeTextNodeContaining(commentedNode, /commented|left a comment/);
        }
      }(batchedUsernameElements);
    }
    const usernameLinksSelector = [ ':is(\n\t\t.js-discussion,\n\t\t.inline-comments\n\t) a.author:not(\n\t\t[href="#"],\n\t\t[href*="/apps/"],\n\t\t[href*="/marketplace/"],\n\t\t[data-hovercard-type="organization"],\n\t\t[show_full_name="true"]\n\t)', '#dashboard a.Link--primary[data-hovercard-type="user"]:not([aria-label="card content"] *)' ];
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/show-names.tsx", {
      include: [ isDashboard, hasComments ],
      init: function(signal) {
        document.body.classList.add("rgh-show-names");
        observe(usernameLinksSelector, batchedFunction(show_names_updateLink, {
          delay: 100
        }), {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/previous-next-commit-buttons.tsx", {
      include: [ isPRCommit ],
      deduplicate: "has-rgh-inner",
      awaitDomReady: !0,
      init: function() {
        const originalPreviousNext = select_dom_$(".commit .float-right.ButtonGroup");
        if (!originalPreviousNext) return !1;
        select_dom_$("#files").after(dom_chef.createElement("div", {
          className: "d-flex flex-justify-end mb-3"
        }, originalPreviousNext.cloneNode(!0)));
      }
    });
    function expandDiff(event) {
      if (!event.target.closest(".js-expand")) select_dom_$(".js-expand", event.delegateTarget).click();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/extend-diff-expander.tsx", {
      include: [ hasFiles ],
      init: function(signal) {
        document.body.classList.add("rgh-extend-diff-expander");
        delegate_it_delegate(".diff-view .js-expandable-line", "click", expandDiff, {
          signal
        });
      }
    });
    const CodeSquare = props => createElement("svg", {
      className: "octicon octicon-code-square",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Zm7.47 3.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L10.69 8 9.22 6.53a.75.75 0 0 1 0-1.06ZM6.78 6.53 5.31 8l1.47 1.47a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-2-2a.75.75 0 0 1 0-1.06l2-2a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"
    })), gistCount = new CachedFunction("gist-count", {
      async updater(username) {
        const {user} = await v4("query getGistCount($username: String!) {\n\tuser(login: $username) {\n\t\tgists(first: 0) {\n\t\t\ttotalCount\n\t\t}\n\t}\n}\n", {
          variables: {
            username
          }
        });
        return user.gists.totalCount;
      },
      maxAge: {
        days: 1
      },
      staleWhileRevalidate: {
        days: 3
      }
    });
    async function appendTab(navigationBar) {
      const user = function() {
        const name = github_helpers_getCleanPathname();
        return {
          url: isEnterprise() ? `/gist/${name}` : `https://gist.github.com/${name}`,
          name
        };
      }(), link = dom_chef.createElement("a", {
        href: user.url,
        className: "UnderlineNav-item js-responsive-underlinenav-item",
        role: "tab",
        "aria-selected": "false",
        "data-tab-item": "rgh-gists-item"
      }, dom_chef.createElement(CodeSquare, {
        className: "UnderlineNav-octicon hide-sm"
      }), " Gists ");
      navigationBar.append(link);
      const overflowNav = expectElement(repoUnderlineNavDropdownUl);
      if (!elementExists('[data-rgh-label="Gists"]', overflowNav)) overflowNav.append(createDropdownItem({
        label: "Gists",
        href: user.url,
        icon: CodeSquare,
        "data-rgh-label": "Gists"
      }));
      const count = await gistCount.get(user.name);
      if (count > 0) link.append(dom_chef.createElement("span", {
        className: "Counter"
      }, count));
      triggerRepoNavOverflow();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/profile-gists-link.tsx", {
      include: [ isUserProfile ],
      init: async function(signal) {
        observe('nav[aria-label="User"] > ul', appendTab, {
          signal
        });
      }
    });
    function addLink(showCaseTitle) {
      const url = new URL(location.pathname, location.href);
      url.search = new URLSearchParams({
        tab: "repositories",
        sort: "stargazers"
      }).toString();
      showCaseTitle.firstChild.after(" / ", dom_chef.createElement("a", {
        href: url.href
      }, "Top repositories"));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/show-user-top-repositories.tsx", {
      include: [ () => isUserProfile() && !new URLSearchParams(location.search).has("tab") ],
      init: function(signal) {
        observe(".js-pinned-items-reorder-container h2", addLink, {
          signal
        });
      }
    });
    function addSourceTypeToLink(link) {
      const search = new URLSearchParams(link.search);
      search.set("type", "source");
      link.search = String(search);
    }
    const hide_user_forks_selectors = [ `a[href*="?tab=repositories"]:is([href^="/"], [href^="${location.origin}/"]):not([href*="&type="], .issues-reset-query)`, `a[href*="/repositories"]:is([href^="/orgs/"], [href^="${location.origin}/orgs/"]):not([href*="&type="], .issues-reset-query)` ];
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/hide-user-forks.tsx", {
      init: function() {
        observe(hide_user_forks_selectors, addSourceTypeToLink);
      }
    });
    const doesUserFollow = new CachedFunction("user-follows", {
      async updater(userA, userB) {
        const {httpStatus} = await v3(`/users/${userA}/following/${userB}`, {
          json: !1,
          ignoreHTTPStatus: !0
        });
        return 204 === httpStatus;
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/user-profile-follower-badge.tsx", {
      include: [ isUserProfile ],
      exclude: [ isOwnUserProfile, () => isUserProfile() && !exists('.UnderlineNav-item[href$="tab=stars"]') ],
      init: async function() {
        if (!await doesUserFollow.get(github_helpers_getCleanPathname(), github_helpers_getUsername())) return;
        attachElement(await elementReady('.js-profile-editable-area [href$="?tab=following"]'), {
          after: () => dom_chef.createElement("span", {
            className: "color-fg-muted"
          }, " · Follows you")
        });
      }
    });
    function isClosed(prLink) {
      return Boolean(prLink.closest(".js-issue-row").querySelector(".octicon.merged, .octicon.closed"));
    }
    async function highlight_non_default_base_branch_add(prLinks) {
      const query = `\n\t\trepository() {\n\t\t\t${prLinks.map((pr => pr.id)).map((id => `\n\t\t\t\t${id}: pullRequest(number: ${id.replaceAll(/\D/g, "")}) {\n\t\t\t\t\tbaseRef {id}\n\t\t\t\t\tbaseRefName\n\t\t\t\t}\n\t\t\t`)).join("\n")}\n\t\t}\n\t`;
      const [data, defaultBranch] = await Promise.all([ v4(query), getDefaultBranch() ]);
      for (const prLink of prLinks) {
        const pr = data.repository[prLink.id];
        if (pr.baseRefName === defaultBranch) continue;
        if ("master" === pr.baseRefName && isClosed(prLink)) continue;
        const branch = pr.baseRef && buildRepoURL("tree", pr.baseRefName);
        prLink.parentElement.querySelector(".text-small.color-fg-muted .d-none.d-md-inline-flex").append(dom_chef.createElement("span", {
          className: "issue-meta-section ml-2"
        }, dom_chef.createElement(GitPullRequest, null), " To ", dom_chef.createElement("span", {
          className: "commit-ref css-truncate user-select-contain mb-n1",
          style: branch ? {} : {
            textDecoration: "line-through"
          }
        }, dom_chef.createElement("a", {
          title: branch ? pr.baseRefName : "Deleted",
          href: branch
        }, pr.baseRefName))));
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/highlight-non-default-base-branch.tsx", {
      include: [ isRepoIssueOrPRList ],
      init: async function(signal) {
        observe('.js-issue-row .js-navigation-open[data-hovercard-type="pull_request"]', batchedFunction(highlight_non_default_base_branch_add, {
          delay: 100
        }), {
          signal
        });
      }
    });
    const EyeClosed = props => createElement("svg", {
      className: "octicon octicon-eye-closed",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M.143 2.31a.75.75 0 0 1 1.047-.167l14.5 10.5a.75.75 0 1 1-.88 1.214l-2.248-1.628C11.346 13.19 9.792 14 8 14c-1.981 0-3.67-.992-4.933-2.078C1.797 10.832.88 9.577.43 8.9a1.619 1.619 0 0 1 0-1.797c.353-.533.995-1.42 1.868-2.305L.31 3.357A.75.75 0 0 1 .143 2.31Zm1.536 5.622A.12.12 0 0 0 1.657 8c0 .021.006.045.022.068.412.621 1.242 1.75 2.366 2.717C5.175 11.758 6.527 12.5 8 12.5c1.195 0 2.31-.488 3.29-1.191L9.063 9.695A2 2 0 0 1 6.058 7.52L3.529 5.688a14.207 14.207 0 0 0-1.85 2.244ZM8 3.5c-.516 0-1.017.09-1.499.251a.75.75 0 1 1-.473-1.423A6.207 6.207 0 0 1 8 2c1.981 0 3.67.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.11.166-.248.365-.41.587a.75.75 0 1 1-1.21-.887c.148-.201.272-.382.371-.53a.119.119 0 0 0 0-.137c-.412-.621-1.242-1.75-2.366-2.717C10.825 4.242 9.473 3.5 8 3.5Z"
    })), publicOrganizationsNames = new CachedFunction("public-organizations", {
      updater: async username => (await v3(`/users/${username}/orgs`)).map((organization => organization.login)),
      maxAge: {
        hours: 6
      },
      staleWhileRevalidate: {
        days: 10
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/mark-private-orgs.tsx", {
      include: [ isOwnUserProfile ],
      deduplicate: "has-rgh",
      awaitDomReady: !0,
      init: async function() {
        const orgs = $$('a.avatar-group-item[data-hovercard-type="organization"][itemprop="follows"]');
        if (0 === orgs.length) return !1;
        const organizations = await publicOrganizationsNames.get(github_helpers_getUsername());
        for (const org of orgs) if (!organizations.includes(org.pathname.replace(/^\/(organizations\/)?/, ""))) {
          org.classList.add("rgh-private-org");
          org.append(dom_chef.createElement(EyeClosed, null));
        }
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-commit-sha.tsx", {
      include: [ isPRCommit ],
      awaitDomReady: !0,
      init: function() {
        const element = select_dom_$(".sha.user-select-contain:not(a *)");
        if (element) wrap(element, dom_chef.createElement("a", {
          href: location.pathname.replace(/pull\/\d+\/commits/, "commit")
        }));
      }
    });
    const getWarning = node_modules_onetime((() => dom_chef.createElement("div", {
      className: "flash flash-error mt-3 rgh-warning-for-disallow-edits"
    }, dom_chef.createElement("strong", null, "Note:"), " Maintainers may require changes. It’s easier and faster to allow them to make direct changes before merging.")));
    function warning_for_disallow_edits_update(checkbox) {
      if (checkbox.checked) getWarning().remove(); else attachElement(checkbox.closest("\n\t\t\t\t.timeline-comment,\n\t\t\t\t.discussion-sidebar-item > .d-inline-flex\n\t\t\t"), {
        after: getWarning
      });
    }
    function warning_for_disallow_edits_toggleHandler(event) {
      warning_for_disallow_edits_update(event.delegateTarget);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/warning-for-disallow-edits.tsx", {
      include: [ isCompare, distribution_isPRConversation ],
      awaitDomReady: !0,
      init: function(signal) {
        const checkbox = select_dom_$('input[name="collab_privs"]');
        if (!checkbox) return !1;
        warning_for_disallow_edits_update(checkbox);
        delegate_it_delegate('input[name="collab_privs"]', "change", warning_for_disallow_edits_toggleHandler, {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/warn-pr-from-master.tsx", {
      include: [ isCompare ],
      exclude: [ isBlank ],
      awaitDomReady: !0,
      deduplicate: "has-rgh",
      init: async function() {
        let defaultBranch;
        if (elementExists(".is-cross-repo")) {
          const forkedRepository = github_helpers_getRepo(select_dom_$('[title^="head: "]').textContent);
          defaultBranch = await defaultBranchOfRepo.get(forkedRepository);
        } else defaultBranch = await getDefaultBranch();
        if (!location.pathname.endsWith(":" + defaultBranch)) return !1;
        select_dom_$(".js-compare-pr").before(dom_chef.createElement("div", {
          className: "flash flash-error my-3"
        }, dom_chef.createElement("strong", null, "Note:"), " Creating a PR from the default branch is an ", dom_chef.createElement("a", {
          href: "https://blog.jasonmeridth.com/posts/do-not-issue-pull-requests-from-your-master-branch/",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "anti-pattern"), "."));
      }
    });
    function preview(hiddenCommentHeader) {
      const details = hiddenCommentHeader.closest("details");
      details.classList.add("rgh-preview-hidden-comments");
      const commentText = select_dom_$(".comment-body", details).textContent.trim();
      if (0 === commentText.length) return;
      const commentHeader = hiddenCommentHeader.textContent;
      if (/disruptive|spam/.test(commentHeader)) return;
      const reason = /duplicate|outdated|off-topic|hidden/.exec(commentHeader)?.[0];
      hiddenCommentHeader.classList.add("css-truncate", "css-truncate-overflow", "mr-2");
      hiddenCommentHeader.append(dom_chef.createElement("span", {
        className: "Details-content--open"
      }, hiddenCommentHeader.firstChild), dom_chef.createElement("span", {
        className: "Details-content--closed"
      }, reason && dom_chef.createElement("span", {
        className: "Label mr-2"
      }, (input = reason).charAt(0).toUpperCase() + input.slice(1).toLowerCase()), commentText.slice(0, 100)));
      var input;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/preview-hidden-comments.tsx", {
      include: [ hasComments ],
      init: function(signal) {
        observe(".timeline-comment-group .minimized-comment .timeline-comment-header-text", preview, {
          signal
        });
      }
    });
    function fitTextarea(textarea) {
      const positions = new Map;
      let element = textarea;
      for (;null == element ? void 0 : element.parentElement; ) {
        element = element.parentElement;
        positions.set(element, element.scrollTop);
      }
      textarea.style.height = "auto";
      const style = getComputedStyle(textarea);
      textarea.style.height = String(textarea.scrollHeight + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)) + "px";
      for (const [element, position] of positions) if (position && element.scrollTop !== position) element.scrollTop = position;
    }
    function fit_textarea_listener(event) {
      fitTextarea(event.target);
    }
    fitTextarea.watch = function(elements) {
      if ("string" == typeof elements) elements = document.querySelectorAll(elements); else if (elements instanceof HTMLTextAreaElement) elements = [ elements ];
      for (const element of elements) {
        element.addEventListener("input", fit_textarea_listener);
        if (element.form) element.form.addEventListener("reset", fit_textarea_listener);
        fitTextarea(element);
      }
    };
    const fit_textarea = fitTextarea;
    function resetListener({target}) {
      const field = target.querySelector("textarea");
      setTimeout(fit_textarea, 0, field);
    }
    function inputListener({target}) {
      fit_textarea(target);
    }
    function watchTextarea(textarea, {signal}) {
      textarea.addEventListener("input", inputListener, {
        signal
      });
      textarea.addEventListener("focus", inputListener, {
        signal
      });
      textarea.addEventListener("change", inputListener, {
        signal
      });
      textarea.form?.addEventListener("reset", resetListener, {
        signal
      });
      fit_textarea(textarea);
      textarea.classList.replace("js-size-to-fit", "rgh-fit-textareas");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/fit-textareas.tsx", {
      include: [ hasRichTextEditor ],
      exclude: [ webext_detect_page_isSafari ],
      init: function(signal) {
        observe("textarea:not(#pull_request_review_body)", watchTextarea, {
          signal
        });
      }
    });
    const FoldDown = props => createElement("svg", {
      className: "octicon octicon-fold-down",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "m8.177 14.323 2.896-2.896a.25.25 0 0 0-.177-.427H8.75V7.764a.75.75 0 1 0-1.5 0V11H5.104a.25.25 0 0 0-.177.427l2.896 2.896a.25.25 0 0 0 .354 0ZM2.25 5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 4.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 1 .75.75ZM8.25 5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 4.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 1 .75.75Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"
    }));
    function smartBlockWrap(content, field) {
      const before = field.value.slice(0, field.selectionStart), after = field.value.slice(field.selectionEnd), [whitespaceAtStart] = /\n*$/.exec(before), [whitespaceAtEnd] = /^\n*/.exec(after);
      let newlinesToAppend = "", newlinesToPrepend = "";
      if (/\S/.test(before) && whitespaceAtStart.length < 2) newlinesToPrepend = "\n".repeat(2 - whitespaceAtStart.length);
      if (/\S/.test(after) && whitespaceAtEnd.length < 2) newlinesToAppend = "\n".repeat(2 - whitespaceAtEnd.length);
      return newlinesToPrepend + content + newlinesToAppend;
    }
    function addContentToDetails({delegateTarget}) {
      const field = delegateTarget.form.querySelector("textarea.js-comment-field"), newContent = `\n\t\t<details>\n\t\t<summary>Details</summary>\n\n\t\t${field.value.slice(field.selectionStart, field.selectionEnd)}\n\n\t\t</details>\n\t`.replaceAll(/(\n|\b)\t+/g, "$1").trim();
      field.focus();
      insertTextIntoField(field, smartBlockWrap(newContent, field));
      field.setSelectionRange(field.value.lastIndexOf("</summary>", field.selectionStart) + 10 + 2, field.value.lastIndexOf("</details>", field.selectionStart) - 2);
    }
    function append(container) {
      container.append(dom_chef.createElement("button", {
        type: "button",
        className: [ "Button", "Button--iconOnly", "Button--invisible", "Button--medium", "tooltipped", "tooltipped-sw", "rgh-collapsible-content-btn" ].join(" "),
        "aria-label": "Add collapsible content",
        "data-targets": "action-bar.items"
      }, dom_chef.createElement(FoldDown, null)));
      triggerActionBarOverflow(container);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/collapsible-content-button.tsx", {
      include: [ hasRichTextEditor ],
      init: function(signal) {
        observe('[data-target="action-bar.itemContainer"]', append, {
          signal
        });
        delegate_it_delegate(".rgh-collapsible-content-btn", "click", addContentToDetails, {
          signal
        });
      }
    });
    var resolve_conflicts_browser = __webpack_require__(131);
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/resolve-conflicts.tsx", {
      include: [ isPRConflicts ],
      init: async function() {
        await elementReady(".CodeMirror", {
          stopOnDomReady: !1
        });
        document.head.append(dom_chef.createElement("script", {
          src: resolve_conflicts_browser.runtime.getURL("assets/resolve-conflicts.js")
        }));
      }
    });
    const absoluteReferenceRegex = /^(?<nameWithOwner>(?<owner>[^:]+)\/(?<name>[^:]+)):(?<branch>.+)$/;
    function parseReference(referenceElement) {
      const {title, textContent} = referenceElement;
      return function(absolute, relative) {
        const absoluteMatch = absoluteReferenceRegex.exec(absolute);
        if (!absoluteMatch) throw new TypeError(`Expected \`absolute\` to be "user/repo:branch", got "${absolute}"`);
        const {owner, name, nameWithOwner, branch} = absoluteMatch.groups, expectedRelative = [ branch, `${owner}:${branch}` ];
        if (!expectedRelative.includes(relative)) throw new TypeError(`Expected \`relative\` to be either "${expectedRelative.join('" or "')}", got "${relative}"`);
        return {
          owner,
          name,
          branch,
          nameWithOwner,
          absolute,
          relative
        };
      }(title, textContent.trim());
    }
    function getBranches() {
      return {
        get base() {
          return parseReference(select_dom_$(".base-ref"));
        },
        get head() {
          return parseReference(select_dom_$(".head-ref"));
        }
      };
    }
    function alter(viewFileLink) {
      const {nameWithOwner, branch} = getBranches().head, filePath = viewFileLink.closest("[data-path]").getAttribute("data-path");
      viewFileLink.pathname = [ nameWithOwner, "blob", branch, filePath ].join("/");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/actionable-pr-view-file.tsx", {
      include: [ isPRFiles ],
      exclude: [ isClosedPR, () => "This repository has been deleted" === select_dom_$(".head-ref").title, () => elementExists(".js-commits-filtered") && !elementExists('[aria-label="You are viewing the latest commit"]') ],
      awaitDomReady: !0,
      init: function(signal) {
        observe('.file-header:not([data-file-deleted="true"]) a.dropdown-item[data-ga-click^="View file"]', alter, {
          signal
        });
      }
    });
    function handleMenuOpening({delegateTarget: dropdown}) {
      dropdown.classList.add("rgh-more-file-links");
      const viewFile = select_dom_$('a[data-ga-click^="View file"]', dropdown), getDropdownLink = (name, route) => {
        const {href} = new GitHubFileURL(viewFile.href).assign({
          route
        });
        return dom_chef.createElement("a", {
          href,
          "data-turbo": String("raw" !== route),
          className: "pl-5 dropdown-item btn-link",
          role: "menuitem"
        }, "View ", name);
      };
      viewFile.after(getDropdownLink("raw", "raw"), getDropdownLink("blame", "blame"), getDropdownLink("history", "commits"), dom_chef.createElement("div", {
        className: "dropdown-divider",
        role: "none"
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/more-file-links.tsx", {
      include: [ hasFiles ],
      init: function(signal) {
        delegate_it_delegate(".file-header .js-file-header-dropdown:not(.rgh-more-file-links)", "toggle", handleMenuOpening, {
          capture: !0,
          signal
        });
      }
    });
    function addDropdownItem(dropdown, title, filterCategory, filterValue) {
      const filterQuery = `${filterCategory}:${filterValue}`, searchParameter = new URLSearchParams(location.search), currentQuerySegments = searchParameter.get("q")?.split(/\s+/) ?? [], isSelected = currentQuerySegments.some((segment => segment.toLowerCase() === filterQuery)), query = currentQuerySegments.filter((segment => !segment.startsWith(`${filterCategory}:`))).join(" "), search = new URLSearchParams({
        q: query + (isSelected ? "" : ` ${filterQuery}`)
      });
      dropdown.append(dom_chef.createElement("a", {
        href: `?${String(search)}`,
        className: "SelectMenu-item",
        "aria-checked": isSelected ? "true" : "false",
        role: "menuitemradio"
      }, dom_chef.createElement(Check, {
        className: "SelectMenu-icon SelectMenu-icon--check"
      }), dom_chef.createElement("span", null, title)));
    }
    function addDraftFilter(dropdown) {
      dropdown.append(dom_chef.createElement("div", {
        className: "SelectMenu-divider"
      }, "Filter by draft pull requests"));
      addDropdownItem(dropdown, "Ready for review", "draft", "false");
      addDropdownItem(dropdown, "Not ready for review (Draft PR)", "draft", "true");
    }
    const hasChecks = new CachedFunction("has-checks", {
      async updater() {
        const {repository} = await v4('query HasChecks($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\thead: object(expression: "HEAD") {\n\t\t\t... on Commit {\n\t\t\t\thistory(first: 10) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tstatusCheckRollup {\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n');
        return repository.head.history.nodes.some((commit => commit.statusCheckRollup));
      },
      maxAge: {
        days: 3
      },
      cacheKey: cacheByRepo
    });
    async function addChecksFilter(reviewsFilter) {
      if (!await hasChecks.get()) return;
      const checksFilter = reviewsFilter.cloneNode(!0);
      checksFilter.id = "";
      select_dom_$("summary", checksFilter).firstChild.textContent = "Checks ";
      select_dom_$(".SelectMenu-title", checksFilter).textContent = "Filter by checks status";
      const dropdown = select_dom_$(".SelectMenu-list", checksFilter);
      dropdown.textContent = "";
      for (const status of [ "Success", "Failure", "Pending" ]) addDropdownItem(dropdown, status, "status", status.toLowerCase());
      reviewsFilter.after(checksFilter);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pr-filters.tsx", {
      include: [ isPRList ],
      init: async function(signal) {
        observe("#reviews-select-menu", addChecksFilter, {
          signal
        });
        observe("#reviews-select-menu .SelectMenu-list", addDraftFilter, {
          signal
        });
      }
    });
    async function linkifyIcon(fileIcon) {
      const fileLink = fileIcon.closest(".react-directory-filename-column").querySelector("a.Link--primary"), url = new GitHubFileURL(fileLink.href).assign({
        route: "edit"
      });
      wrap(fileIcon, dom_chef.createElement("a", {
        href: url.href,
        className: "rgh-quick-file-edit"
      }));
      fileIcon.after(dom_chef.createElement(Pencil, null));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-file-edit.tsx", {
      include: [ isRepoTree ],
      exclude: [ isRepoFile404, isArchivedRepoAsync, isPermalink ],
      init: async function(signal) {
        observe(directoryListingFileIcon, linkifyIcon, {
          signal
        });
      }
    });
    async function getPrInfo(base, number = getConversationNumber()) {
      const {repository} = await v4uncached(`\n\t\trepository() {\n\t\t\tpullRequest(number: ${number}) {\n\t\t\t\tbaseRefOid\n\t\t\t\theadRefOid\n\t\t\t\tmergeable\n\t\t\t\tviewerCanEditFiles\n\t\t\t\theadRef {\n\t\t\t\t\tcompare(headRef: "${base}") {\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\taheadBy\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t`), {baseRefOid, headRefOid, mergeable, viewerCanEditFiles, headRef} = repository.pullRequest;
      return {
        baseRefOid,
        headRefOid,
        mergeable,
        viewerCanEditFiles,
        behindBy: headRef.compare.aheadBy,
        needsUpdate: "DIVERGED" === headRef.compare.status
      };
    }
    const canMerge = ".merge-pr > .color-fg-muted:first-child", canNativelyUpdate = ".js-update-branch-form";
    async function update_pr_from_base_branch_handler({delegateTarget: button}) {
      button.disabled = !0;
      await showToast((async () => {
        const response = await async function() {
          return v3(`pulls/${getConversationNumber()}/update-branch`, {
            method: "PUT",
            ignoreHTTPStatus: !0
          });
        }().catch((error => error));
        if (response instanceof Error || !response.ok) {
          feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/update-pr-from-base-branch.tsx", response);
          throw new Error(`Error updating the branch: ${response.message}`);
        }
      }), {
        message: "Updating branch…",
        doneMessage: "Branch updated"
      });
      button.remove();
    }
    function createButton() {
      return dom_chef.createElement("button", {
        type: "button",
        className: "btn btn-sm rgh-update-pr-from-base-branch tooltipped tooltipped-sw",
        "aria-label": "Use Refined GitHub to update the PR from the base branch"
      }, "Update branch");
    }
    async function update_pr_from_base_branch_addButton(mergeBar) {
      if (!elementExists(canMerge) || elementExists(canNativelyUpdate)) return;
      const {base} = getBranches(), prInfo = await getPrInfo(base.relative);
      if (!prInfo.needsUpdate || !prInfo.viewerCanEditFiles || "CONFLICTING" === prInfo.mergeable) return;
      const mergeabilityRow = select_dom_$(".branch-action-item:has(.merging-body)");
      if (!mergeabilityRow) mergeBar.before(function({className = "", action, icon, iconClass = "", heading, meta}) {
        return dom_chef.createElement("div", {
          className: `branch-action-item ${className}`
        }, dom_chef.createElement("div", {
          className: "branch-action-btn float-right js-immediate-updates js-needs-timeline-marker-header"
        }, action), dom_chef.createElement("div", {
          className: `branch-action-item-icon completeness-indicator ${iconClass}`
        }, icon), dom_chef.createElement("h3", {
          className: "h4 status-heading"
        }, heading), dom_chef.createElement("span", {
          className: "status-meta"
        }, meta));
      }({
        className: "rgh-update-pr-from-base-branch-row",
        action: createButton(),
        icon: dom_chef.createElement(Check, null),
        iconClass: "completeness-indicator-success",
        heading: "This branch has no conflicts with the base branch",
        meta: "Merging can be performed automatically."
      })); else mergeabilityRow.prepend(dom_chef.createElement("div", {
        className: "branch-action-btn float-right js-immediate-updates js-needs-timeline-marker-header"
      }, createButton()));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/update-pr-from-base-branch.tsx", {
      include: [ distribution_isPRConversation ],
      exclude: [ isClosedPR, () => "This repository has been deleted" === select_dom_$(".head-ref").title ],
      awaitDomReady: !0,
      init: async function(signal) {
        await expectToken();
        delegate_it_delegate(".rgh-update-pr-from-base-branch", "click", update_pr_from_base_branch_handler, {
          signal
        });
        observe(".merge-message", update_pr_from_base_branch_addButton, {
          signal
        });
      }
    });
    const fetch_dom = memoize((async function(url, selector) {
      feature_manager.log.http(url);
      const absoluteURL = new URL(url, location.origin).href, response = await fetch(absoluteURL), dom = node_modules_doma(await response.text());
      if (selector) return dom.querySelector(selector) ?? void 0; else return dom;
    }));
    async function getNextPage() {
      const nextPageLink = select_dom_$(".pagination a:last-child");
      if (nextPageLink) return fetch_dom(nextPageLink.href);
      if (isSingleReleaseOrTag()) {
        const [, tag = ""] = github_helpers_getRepo().path.split("releases/tag/", 2);
        return fetch_dom(buildRepoURL(`tags?after=${tag}`));
      }
      return new DocumentFragment;
    }
    function getPreviousTag(current, allTags) {
      let unmatchedNamespaceTag;
      for (let next = current + 1; next < allTags.length; next++) if (allTags[next].commit !== allTags[current].commit) if (!(compareVersions(allTags[current].version, allTags[next].version) < 1)) {
        if (allTags[current].namespace === allTags[next].namespace) return allTags[next].tag;
        unmatchedNamespaceTag ||= allTags[next].tag;
      }
      return unmatchedNamespaceTag;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/tag-changes-link.tsx", {
      include: [ isReleasesOrTags, isSingleReleaseOrTag ],
      exclude: [ isEmptyRepoRoot ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        document.documentElement.classList.add("rgh-tag-changes-link");
        const pages = [ document, await getNextPage() ];
        await dom_loaded;
        const allTags = $$([ ".repository-content .col-md-2", ".Box-row .commit", ".Box-body .border-md-bottom" ], pages).map((tag => function(element) {
          const {pathname: tagUrl} = new URL(select_dom_$([ 'a[href*="/tree/"]', 'a[href*="/tag/"]' ], element).href), tag = /\/(?:releases\/tag|tree)\/(.*)/.exec(tagUrl)[1];
          return {
            element,
            tag,
            commit: select_dom_$('[href*="/commit/"]', element).textContent.trim(),
            ...parseTag(decodeURIComponent(tag))
          };
        }(tag)));
        for (const [index, container] of allTags.entries()) {
          const previousTag = getPreviousTag(index, allTags);
          if (!previousTag) continue;
          const lastLinks = $$([ '.Link--muted[data-hovercard-type="commit"]', ".list-style-none > .d-inline-block:last-child" ], container.element);
          for (const lastLink of lastLinks) {
            const currentTag = allTags[index].tag, compareLink = dom_chef.createElement("a", {
              className: "Link--muted tooltipped tooltipped-n",
              "aria-label": `See commits between ${decodeURIComponent(previousTag)} and ${decodeURIComponent(currentTag)}`,
              href: buildRepoURL(`compare/${previousTag}...${currentTag}`)
            }, dom_chef.createElement(Diff, null), " ", isEnterprise() ? "Commits" : dom_chef.createElement("span", {
              className: "ml-1 wb-break-all"
            }, "Commits"));
            if (!(isEnterprise() || isTags() || isSingleReleaseOrTag() && elementExists(".release"))) {
              lastLink.parentElement.after(dom_chef.createElement("div", {
                className: "rgh-changelog-link " + (isReleases() ? "mb-md-2 mr-3 mr-md-0" : "mr-4 mb-2")
              }, compareLink));
              if (isReleases()) {
                lastLink.classList.remove("mb-2");
                lastLink.parentElement.classList.remove("mb-md-2");
              }
            } else {
              lastLink.after(dom_chef.createElement("li", {
                className: lastLink.className + " rgh-changelog-link"
              }, compareLink));
              lastLink.classList.remove("flex-auto");
            }
          }
        }
      }
    });
    const onElementRemoval = memoize((async (element, signal) => {
      if (!signal?.aborted) return new Promise((resolve => {
        const observer = new ResizeObserver((([{target}], observer2) => {
          if (!target.isConnected) {
            observer2.disconnect();
            resolve();
          }
        }));
        if (signal) signal.addEventListener("abort", (() => {
          observer.disconnect();
          resolve();
        }), {
          once: !0
        });
        observer.observe(element);
      }));
    })), on_element_removal = onElementRemoval, canEditSidebar = node_modules_onetime((() => elementExists('.discussion-sidebar-item [data-hotkey="l"]')));
    function cleanSection(selector) {
      const container = select_dom_$(`:is(form, .discussion-sidebar-item):has(${selector})`);
      if (!container) return !1;
      const heading = select_dom_$([ "details:has(> .discussion-sidebar-heading)", ".discussion-sidebar-heading" ], container);
      if (heading.closest("form, .discussion-sidebar-item").querySelector([ ".IssueLabel", '[aria-label="Select milestones"] .Progress-item', '[aria-label="Link issues"] [data-hovercard-type]', 'a[href^="https://copilot-workspace.githubnext.com"]', '[aria-label="Select projects"] .Link--primary' ])) return !1;
      const section = container.closest(".discussion-sidebar-item");
      if (canEditSidebar()) {
        (function(node) {
          const range = new Range;
          range.selectNodeContents(node.parentElement);
          range.setStartAfter(node);
          return range;
        })(heading).deleteContents();
        section.classList.add("rgh-clean-sidebar");
      } else section.remove();
      return !0;
    }
    async function cleanSidebar() {
      select_dom_$("#partial-discussion-sidebar").classList.add("rgh-clean-sidebar");
      const assignees = select_dom_$(".js-issue-assignees");
      if (0 === assignees.children.length) assignees.closest(".discussion-sidebar-item").remove(); else {
        const assignYourself = select_dom_$(".js-issue-assign-self");
        if (assignYourself) {
          removeTextNodeContaining(assignYourself.previousSibling, "No one—");
          select_dom_$('[aria-label="Select assignees"] summary').append(dom_chef.createElement("span", {
            style: {
              fontWeight: "normal"
            }
          }, " – ", assignYourself));
          assignees.closest(".discussion-sidebar-item").classList.add("rgh-clean-sidebar");
        }
      }
      if (isPR()) !async function() {
        const possibleReviewers = select_dom_$('[src$="/suggested-reviewers"]');
        if (possibleReviewers) await on_element_removal(possibleReviewers);
        const content = select_dom_$('[aria-label="Select reviewers"] > .css-truncate');
        if (!content.firstElementChild) removeTextNodeContaining(content, "No reviews");
      }();
      if (!cleanSection(".js-issue-labels") && !canEditSidebar()) select_dom_$(".discussion-sidebar-item:has(.js-issue-labels) .discussion-sidebar-heading").remove();
      const developmentHint = select_dom_$('[aria-label="Link issues"] p');
      if (developmentHint) removeTextNodeContaining(developmentHint, /No branches or pull requests|Successfully merging/);
      const createBranchLink = select_dom_$('button[data-action="click:create-branch#openDialog"]'), openWorkspaceButton = select_dom_$('a[href^="https://copilot-workspace.githubnext.com"]');
      if (createBranchLink && !openWorkspaceButton) {
        createBranchLink.classList.add("Link--muted", "Link--inTextBlock");
        select_dom_$('[aria-label="Link issues"] summary').append(dom_chef.createElement("span", {
          style: {
            fontWeight: "normal"
          }
        }, " – ", createBranchLink));
      }
      cleanSection('[aria-label="Link issues"]');
      cleanSection('[aria-label="Select projects"]');
      cleanSection('[aria-label="Select milestones"]');
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clean-conversation-sidebar.tsx", {
      include: [ isConversation ],
      awaitDomReady: !0,
      init: function(signal) {
        observe("#partial-discussion-sidebar", cleanSidebar, {
          signal
        });
      }
    });
    let sidebar;
    const onResize = debounce_fn((function() {
      if (!sidebar) return;
      const offset = (string = getComputedStyle(sidebar).getPropertyValue("--rgh-sticky-sidebar-offset"), 
      string.split("+").map((part => looseParseInt(part))).reduce(((a, b) => a + b)));
      var string;
      sidebar.classList.toggle("rgh-sticky-sidebar", window.innerWidth >= 768 && sidebar.offsetHeight + offset < window.innerHeight);
    }), {
      wait: 100
    }), sidebarObserver = new ResizeObserver(onResize);
    function toggleHoverState(event) {
      if ("mouseenter" === event.type) sidebarObserver.disconnect(); else sidebarObserver.observe(sidebar);
    }
    function trackSidebar(signal, foundSidebar) {
      sidebar = foundSidebar;
      sidebarObserver.observe(sidebar);
      onAbort(signal, sidebarObserver, (() => {
        sidebar = void 0;
      }));
      sidebar.addEventListener("mouseenter", toggleHoverState, {
        signal
      });
      sidebar.addEventListener("mouseleave", toggleHoverState, {
        signal
      });
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/sticky-sidebar.tsx", {
      include: [ isRepoRoot, isConversation ],
      exclude: [ () => screen.availWidth < 768 ],
      init: function(signal) {
        document.documentElement.setAttribute("rgh-sticky-sidebar-enabled", "");
        observe(".Layout-sidebar :is(.BorderGrid, #partial-discussion-sidebar)", trackSidebar.bind(void 0, signal), {
          signal
        });
        window.addEventListener("resize", onResize, {
          signal
        });
      }
    });
    const Download = props => createElement("svg", {
      className: "octicon octicon-download",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"
    }), createElement("path", {
      d: "M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"
    })), release_download_count_namespaceObject = "query getReleaseDownloadCount($owner: String!, $name: String!, $tag: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\trelease(tagName: $tag) {\n\t\t\treleaseAssets(first: 100) {\n\t\t\t\tnodes {\n\t\t\t\t\tname\n\t\t\t\t\tdownloadCount\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n";
    function createHeatIndexFunction(numbers) {
      const min = Math.min(...numbers), max = Math.max(...numbers);
      return value => {
        const interp = Math.max(0, Math.min(1, function(min, max, value) {
          if (min === max) return 0; else return (value - min) / (max - min);
        }(min, max, value))), floored = Math.floor(10 * interp);
        return Math.max(1, 10 - floored);
      };
    }
    function randomArrayItem(items) {
      return items.at(Math.floor(Math.random() * items.length));
    }
    async function addCounts(assetsList) {
      if (!elementExists(".octicon-package", assetsList)) return;
      const releaseName = (assetsList.closest("section") ?? assetsList.closest(".Box:not(.Box--condensed)")).querySelector(":is(.octicon-tag, .octicon-code) ~ span").textContent.trim(), assets = await async function(tag) {
        const {repository} = await v4(release_download_count_namespaceObject, {
          variables: {
            tag
          }
        }), assets = repository.release.releaseAssets.nodes;
        return Object.fromEntries(assets.map((({name, downloadCount}) => [ name, downloadCount ])));
      }(releaseName), calculateHeatIndex = createHeatIndexFunction(Object.values(assets));
      for (const assetLink of $$(".octicon-package ~ a", assetsList)) {
        const downloadCount = assets[assetLink.pathname.split("/").pop()] ?? 0, assetSize = assetLink.closest(".Box-row").querySelector(":scope > .flex-justify-end > :first-child");
        assetSize.parentElement.classList.add("rgh-release-download-count");
        const classes = new Set(assetSize.classList);
        classes.delete("text-sm-left");
        if (0 === downloadCount) classes.add("v-hidden");
        assetSize.before(dom_chef.createElement("span", {
          className: [ ...classes ].join(" ")
        }, dom_chef.createElement("span", {
          className: "d-inline-block text-right",
          title: `${downloadCount} downloads`,
          "data-rgh-heat": calculateHeatIndex(downloadCount)
        }, (0, js_abbreviation_number_dist.abbreviateNumber)(downloadCount), " ", dom_chef.createElement(Download, null))));
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/release-download-count.tsx", {
      include: [ isReleasesOrTags, isSingleReleaseOrTag ],
      init: function(signal) {
        observe(".Box-footer .Box--condensed", addCounts, {
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/open-issue-to-latest-comment.tsx", {
      include: [ isIssueOrPRList ],
      awaitDomReady: !0,
      init: function() {
        for (const link of $$('\n\t:is(.js-issue-row, .js-pinned-issue-list-item)\n\t.Link--muted:is(\n\t\ta[aria-label$="comment"],\n\t\ta[aria-label$="comments"]\n\t)\n')) link.hash = "#issue-comment-box";
      }
    });
    function preserveScroll(anchor = document.elementFromPoint(innerWidth / 2, innerHeight / 2)) {
      const originalPosition = anchor.getBoundingClientRect().top;
      return () => {
        requestAnimationFrame((() => {
          const newPosition = anchor.getBoundingClientRect().top;
          window.scrollBy(0, newPosition - originalPosition);
        }));
      };
    }
    const click_all = memoize((selector => event => {
      if (event.altKey && event.isTrusted) {
        const clickedItem = event.delegateTarget, resetScroll = preserveScroll(clickedItem.parentElement);
        !function(elementsToClick, except) {
          for (const item of $$(elementsToClick)) if (item !== except) item.click();
        }("string" == typeof selector ? selector : selector(clickedItem), clickedItem);
        resetScroll();
      }
    }));
    function minimizedCommentsSelector(clickedItem) {
      return `.minimized-comment > details${clickedItem.parentElement.open ? "[open]" : ":not([open])"} > summary`;
    }
    function resolvedCommentsSelector(clickedItem) {
      return `.js-resolvable-thread-toggler[aria-expanded="${clickedItem.getAttribute("aria-expanded")}"]:not(.d-none)`;
    }
    function markdownCommentSelector(clickedItem) {
      const {id} = clickedItem.closest(".TimelineItem-body[id]");
      return `#${id} .markdown-body details > summary`;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/toggle-everything-with-alt.tsx", {
      include: [ isConversation, hasFiles, isCommitList ],
      init: function(signal) {
        delegate_it_delegate(".minimized-comment details summary", "click", click_all(minimizedCommentsSelector), {
          signal
        });
        delegate_it_delegate(".js-file .js-diff-load", "click", click_all(".js-file .js-diff-load"), {
          signal
        });
        delegate_it_delegate(".js-file .js-resolvable-thread-toggler", "click", click_all(resolvedCommentsSelector), {
          signal
        });
        delegate_it_delegate(".js-file .js-expand-full", "click", click_all(".js-file .js-expand-full"), {
          signal
        });
        delegate_it_delegate(".js-file .js-collapse-diff", "click", click_all(".js-file .js-collapse-diff"), {
          signal
        });
        delegate_it_delegate(".TimelineItem .ellipsis-expander", "click", click_all(".TimelineItem .ellipsis-expander"), {
          signal
        });
        delegate_it_delegate(".TimelineItem-body[id] .markdown-body details > summary", "click", click_all(markdownCommentSelector), {
          signal
        });
      }
    });
    function validateInput({delegateTarget: field}) {
      field.classList.toggle("rgh-title-over-limit", field.value.length > 72);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/suggest-commit-title-limit.tsx", {
      include: [ isEditingFile, distribution_isPRConversation ],
      init: function(signal) {
        document.body.classList.add("rgh-suggest-commit-title-limit");
        onCommitTitleUpdate(validateInput, signal);
      }
    });
    const ArrowDown = props => createElement("svg", {
      className: "octicon octicon-arrow-down",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M13.03 8.22a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L3.47 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l2.97 2.97V3.75a.75.75 0 0 1 1.5 0v7.44l2.97-2.97a.75.75 0 0 1 1.06 0Z"
    })), CheckCircleFill = props => createElement("svg", {
      className: "octicon octicon-check-circle-fill",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z"
    }));
    function isLowQualityComment(text) {
      return "" === text.replaceAll(/[\s,.!?👍👎👌🙏]+|[\u{1F3FB}-\u{1F3FF}]|[+-]\d+|⬆️|ditt?o|me|too|t?here|on|same|this|issues?|please|pl[sz]|any|updates?|bump|question|solution|following/giu, "");
    }
    async function unhide(event) {
      for (const comment of $$(".rgh-hidden-comment")) comment.hidden = !1;
      await node_modules_delay(10);
      for (const similarCommentsExpandButton of $$(".rgh-hidden-comment > summary")) similarCommentsExpandButton.click();
      select_dom_$(".rgh-hidden-comment").scrollIntoView();
      event.delegateTarget.parentElement.remove();
    }
    function hideComment(comment) {
      comment.hidden = !0;
      comment.classList.add("rgh-hidden-comment");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/hide-low-quality-comments.tsx", {
      include: [ isIssue ],
      deduplicate: ".rgh-low-quality-comments-note",
      awaitDomReady: !0,
      init: function() {
        for (const similarCommentsBox of $$(".js-discussion .Details-element:not([data-body-version])")) hideComment(similarCommentsBox);
        const linkedComment = location.hash.startsWith("#issuecomment-") ? select_dom_$(`${location.hash} .comment-body > p:only-child`) : void 0;
        for (const commentText of $$(".comment-body > p:only-child")) {
          if (commentText === linkedComment) continue;
          if (!isLowQualityComment(commentText.textContent)) continue;
          if (elementExists("a", commentText)) continue;
          const comment = commentText.closest(".js-timeline-item");
          if (elementExists(".Label", comment)) continue;
          const author = select_dom_$(".author", comment).getAttribute("href"), previousComment = select_dom_$(`.js-timeline-item:not([hidden]) .unminimized-comment .author[href="${author}"]`);
          if (previousComment?.closest(".js-timeline-item") === comment) hideComment(comment);
        }
        const lowQualityCount = $$(".rgh-hidden-comment").length;
        if (lowQualityCount > 0) {
          select_dom_$(".discussion-timeline-actions").prepend(dom_chef.createElement("p", {
            className: "rgh-low-quality-comments-note"
          }, `${lowQualityCount} unhelpful comment${lowQualityCount > 1 ? "s were" : " was"} automatically hidden. `, dom_chef.createElement("button", {
            className: "btn-link text-emphasized rgh-unhide-low-quality-comments",
            type: "button"
          }, "Show")));
          delegate_it_delegate(".rgh-unhide-low-quality-comments", "click", unhide);
        }
      }
    });
    const commentSelector = ".js-timeline-item", positiveReactionsSelector = `\n\t${commentSelector} [aria-label="react with thumbs up"],\n\t${commentSelector} [aria-label="react with hooray"],\n\t${commentSelector} [aria-label="react with heart"]\n`, negativeReactionsSelector = `\n\t${commentSelector} [aria-label="react with thumbs down"]\n`, getPositiveReactions = memoize((comment => {
      const count = selectSum(positiveReactionsSelector, comment);
      if (count >= 10 && selectSum(negativeReactionsSelector, comment) < count / 2) return count;
    }));
    function selectSum(selector, container) {
      return $$(selector, container).reduce(((sum, element) => sum + looseParseInt(element)), 0);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/highest-rated-comment.tsx", {
      include: [ isIssue ],
      deduplicate: "has-rgh-inner",
      awaitDomReady: !0,
      init: function() {
        const bestComment = function() {
          let highest;
          for (const reaction of $$(positiveReactionsSelector)) {
            const comment = reaction.closest(commentSelector), positiveReactions = getPositiveReactions(comment);
            if (positiveReactions && (!highest || positiveReactions > highest.count)) highest = {
              comment,
              count: positiveReactions
            };
          }
          return highest?.comment;
        }();
        if (!bestComment) return !1;
        const commentText = select_dom_$(".comment-body > p:only-child", bestComment)?.textContent;
        if (commentText && isLowQualityComment(commentText)) return !1;
        !function(bestComment) {
          if ($$(commentSelector).indexOf(bestComment) < 3) return;
          const text = select_dom_$(".comment-body", bestComment).textContent.slice(0, 100), {hash} = select_dom_$("a.js-timestamp", bestComment), avatar = select_dom_$("img.avatar", bestComment).cloneNode();
          bestComment.parentElement.firstElementChild.after(dom_chef.createElement("a", {
            href: hash,
            className: "no-underline rounded-1 rgh-highest-rated-comment timeline-comment color-bg-subtle px-2 d-flex flex-items-center"
          }, avatar, dom_chef.createElement("h3", {
            className: "timeline-comment-header-text f5 color-fg-muted text-normal text-italic css-truncate css-truncate-overflow mr-2"
          }, dom_chef.createElement("span", {
            className: "Label mr-2"
          }, "Highest-rated"), text), dom_chef.createElement("div", {
            className: "color-fg-muted f6 no-wrap"
          }, dom_chef.createElement(ArrowDown, {
            className: "mr-1"
          }), "Jump to comment")));
        }(bestComment);
        !function(bestComment) {
          select_dom_$(".unminimized-comment", bestComment).classList.add("rgh-highest-rated-comment");
          select_dom_$(".unminimized-comment .timeline-comment-header > h3", bestComment).before(dom_chef.createElement("span", {
            className: "color-fg-success tooltipped tooltipped-s",
            "aria-label": "This comment has the most positive reactions on this issue."
          }, dom_chef.createElement(CheckCircleFill, null)));
        }(bestComment);
      }
    });
    const hasAnyProjects = new CachedFunction("has-projects", {
      async updater() {
        const activeProjectsCounter = await elementReady('[data-hotkey="g b"] .Counter');
        if (activeProjectsCounter && getCount(activeProjectsCounter) > 0) return !0;
        const isOrganization = elementExists('[rel=author][data-hovercard-type="organization"]');
        if (!activeProjectsCounter && !isOrganization) return !1;
        await expectTokenScope("read:project");
        const {repository, organization} = await v4("query HasAnyProjects($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tprojects {\n\t\t\ttotalCount\n\t\t}\n\t\tprojectsV2 {\n\t\t\ttotalCount\n\t\t}\n\t}\n\torganization(login: $owner) {\n\t\tprojects {\n\t\t\ttotalCount\n\t\t}\n\t\tprojectsV2 {\n\t\t\ttotalCount\n\t\t}\n\t}\n}\n", {
          allowErrors: !0
        });
        return Boolean(repository.projects.totalCount) || Boolean(repository.projectsV2.totalCount) || Boolean(organization?.projects?.totalCount) || Boolean(organization?.projectsV2?.totalCount);
      },
      maxAge: {
        days: 1
      },
      staleWhileRevalidate: {
        days: 20
      },
      cacheKey: cacheByRepo
    });
    function getCount(element) {
      return Number(element.textContent.trim());
    }
    async function hasConversations() {
      return Boolean(elementReady("#js-issues-toolbar", {
        waitForChildren: !1
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clean-conversation-filters.tsx", {
      asLongAs: [ hasConversations ],
      include: [ isRepoIssueOrPRList ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        if (0 === getCount(await elementReady('[data-selected-links^="repo_milestones"] .Counter'))) (await elementReady('[data-hotkey="m"]')).parentElement.remove();
      }
    }, {
      asLongAs: [ hasConversations ],
      include: [ isRepoIssueOrPRList ],
      exclude: [ async () => hasAnyProjects.get() ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        const projectsDropdown = await elementReady('[data-hotkey="p"]');
        projectsDropdown?.parentElement.remove();
      }
    });
    const tags_on_commits_list_namespaceObject = 'query GetTagsOnCommit(\n\t$owner: String!\n\t$name: String!\n\t$commit: String!\n\t$after: String\n) {\n\trepository(owner: $owner, name: $name) {\n\t\trefs(\n\t\t\tfirst: 100\n\t\t\trefPrefix: "refs/tags/"\n\t\t\torderBy: { field: TAG_COMMIT_DATE, direction: DESC }\n\t\t\tafter: $after\n\t\t) {\n\t\t\tpageInfo {\n\t\t\t\thasNextPage\n\t\t\t\tendCursor\n\t\t\t}\n\t\t\tnodes {\n\t\t\t\tname\n\t\t\t\ttarget {\n\t\t\t\t\tcommitResourcePath\n\t\t\t\t\t... on Tag {\n\t\t\t\t\t\ttagger {\n\t\t\t\t\t\t\tdate\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t... on Commit {\n\t\t\t\t\t\tcommittedDate\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tobject(expression: $commit) {\n\t\t\t... on Commit {\n\t\t\t\tcommittedDate\n\t\t\t}\n\t\t}\n\t}\n}\n', arrayUnion = (x, y) => [ ...new Set([ ...x, ...y ]) ];
    function mergeTags(oldTags, newTags) {
      const result = {
        ...oldTags
      };
      for (const commit of Object.keys(newTags)) result[commit] = result[commit] ? arrayUnion(result[commit], newTags[commit]) : newTags[commit];
      return result;
    }
    async function getTags(lastCommit, after) {
      const {repository} = await v4(tags_on_commits_list_namespaceObject, {
        variables: {
          after: after ?? null,
          commit: lastCommit
        }
      }), nodes = repository.refs.nodes;
      if (0 === nodes.length) return {};
      let tags = {};
      for (const node of nodes) {
        const commit = node.target.commitResourcePath.split("/")[4];
        tags[commit] ||= [];
        tags[commit].push(node.name);
      }
      const lastTag = nodes.at(-1).target;
      if (new Date(repository.object.committedDate) < new Date("tagger" in lastTag ? lastTag.tagger.date : lastTag.committedDate) && repository.refs.pageInfo.hasNextPage) tags = mergeTags(tags, await getTags(lastCommit, repository.refs.pageInfo.endCursor));
      return tags;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/tags-on-commits-list.tsx", {
      include: [ isRepoCommitList ],
      awaitDomReady: !0,
      deduplicate: "has-rgh-inner",
      init: async function() {
        const cacheKey = `tags:${github_helpers_getRepo().nameWithOwner}`, commitsOnPage = $$(".listviewitem"), lastCommitOnPage = getCommitHash(commitsOnPage.at(-1));
        let cached = await legacy.get(cacheKey) ?? {};
        const commitsWithNoTags = [];
        for (const commit of commitsOnPage) {
          const targetCommit = getCommitHash(commit);
          let targetTags = cached[targetCommit];
          if (!targetTags) {
            cached = mergeTags(cached, await getTags(lastCommitOnPage));
            targetTags = cached[targetCommit];
          }
          if (!targetTags) commitsWithNoTags.push(targetCommit); else if (targetTags.length > 0) {
            select_dom_$('div[data-testid="listview-item-description"]', commit).append(dom_chef.createElement("span", {
              className: "d-flex flex-items-center gap-1"
            }, dom_chef.createElement(Tag, {
              className: "ml-1"
            }), ...targetTags.map((tag => dom_chef.createElement(dom_chef.Fragment, null, " ", dom_chef.createElement("a", {
              className: "Link--muted markdown-title",
              href: buildRepoURL("releases/tag", tag)
            }, dom_chef.createElement("code", null, tag)))))));
            commit.classList.add("rgh-tagged");
          }
        }
        if (commitsWithNoTags.length > 0) for (const commit of commitsWithNoTags) cached[commit] = [];
        await legacy.set(cacheKey, cached, {
          days: 1
        });
      }
    });
    const Alert = props => createElement("svg", {
      className: "octicon octicon-alert",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    }));
    function getPRUrl(prNumber) {
      const hash = webext_detect_page_isFirefox() ? "" : `#:~:text=${new GitHubFileURL(location.href).filePath}`;
      return buildRepoURL("pull", prNumber, "files") + hash;
    }
    function getHovercardUrl(prNumber) {
      return buildRepoURL("pull", prNumber, "hovercard");
    }
    function getDropdown(prs) {
      const icon = isEditingFile() ? dom_chef.createElement(Alert, {
        className: "v-align-middle color-fg-attention"
      }) : dom_chef.createElement(GitPullRequest, {
        className: "v-align-middle"
      });
      return dom_chef.createElement("details", {
        className: "dropdown details-reset details-overlay flex-self-center rgh-list-prs-for-file"
      }, dom_chef.createElement("summary", {
        className: "btn btn-sm"
      }, icon, dom_chef.createElement("span", {
        className: "v-align-middle"
      }, " ", prs.length, " "), dom_chef.createElement("div", {
        className: "dropdown-caret"
      })), dom_chef.createElement("details-menu", {
        className: "dropdown-menu dropdown-menu-sw",
        style: {
          width: "13em"
        }
      }, dom_chef.createElement("div", {
        className: "dropdown-header"
      }, "File also being edited in"), prs.map((prNumber => dom_chef.createElement("a", {
        className: "dropdown-item",
        href: getPRUrl(prNumber),
        "data-hovercard-url": getHovercardUrl(prNumber)
      }, "#", prNumber)))));
    }
    const getPrsByFile = new CachedFunction("files-with-prs", {
      async updater() {
        const {repository} = await v4("query getPrsByFile($owner: String!, $name: String!, $defaultBranch: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tpullRequests(\n\t\t\tfirst: 25\n\t\t\tstates: OPEN\n\t\t\tbaseRefName: $defaultBranch\n\t\t\torderBy: { field: UPDATED_AT, direction: DESC }\n\t\t) {\n\t\t\tnodes {\n\t\t\t\tnumber\n\t\t\t\tfiles(first: 100) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tpath\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n", {
          variables: {
            defaultBranch: await getDefaultBranch()
          }
        }), files = {};
        for (const pr of repository.pullRequests.nodes) for (const {path} of pr.files.nodes) {
          files[path] ??= [];
          if (files[path].length < 10) files[path].push(pr.number);
        }
        return files;
      },
      maxAge: {
        hours: 2
      },
      staleWhileRevalidate: {
        days: 9
      },
      cacheKey: cacheByRepo
    });
    async function addToSingleFile(moreFileActionsDropdown) {
      const path = new GitHubFileURL(location.href).filePath, prs = (await getPrsByFile.get())[path];
      if (prs) {
        const dropdown = getDropdown(prs);
        if (!moreFileActionsDropdown.parentElement.matches(".gap-2")) dropdown.classList.add("mr-2");
        moreFileActionsDropdown.before(dropdown);
      }
    }
    async function addToEditingFile(saveButton) {
      const path = new GitHubFileURL(location.href).filePath;
      let prs = (await getPrsByFile.get())[path];
      if (!prs) return;
      const editingPRNumber = new URLSearchParams(location.search).get("pr")?.split("/").slice(-1);
      if (editingPRNumber) {
        prs = prs.filter((pr => pr !== Number(editingPRNumber)));
        if (0 === prs.length) return;
      }
      const dropdown = getDropdown(prs);
      dropdown.classList.add("mr-2");
      saveButton.parentElement.prepend(dropdown);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/list-prs-for-file.tsx", {
      include: [ isSingleFile ],
      init: function(signal) {
        observe('[aria-label="More file actions"]', addToSingleFile, {
          signal
        });
      }
    }, {
      include: [ isEditingFile ],
      awaitDomReady: !0,
      init: function(signal) {
        observe('[data-hotkey="Meta+s,Control+s"]', addToEditingFile, {
          signal
        });
      }
    });
    const Info = props => createElement("svg", {
      className: "octicon octicon-info",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
    }));
    async function onPrMerge(callback, signal) {
      await one_event(".js-merge-commit-button", "click", {
        signal
      });
      observe(".TimelineItem-badge .octicon-git-merge", callback, {
        signal
      });
    }
    const canCreateRelease = canEditEveryComment;
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pr-branch-auto-delete.tsx", {
      asLongAs: [ distribution_isPRConversation, isOpenPR, canCreateRelease ],
      additionalListeners: [ onPrMerge ],
      onlyAdditionalListeners: !0,
      init: async function() {
        const deleteButton = select_dom_$('[action$="/cleanup"] [type="submit"]');
        if (!deleteButton) return;
        deleteButton.dataset.disableWith = "Auto-deleting…";
        deleteButton.click();
        attachElement((await elementReady('[data-test-selector="head-ref-deleted-event-ref-name"]', {
          stopOnDomReady: !1
        })).closest(".TimelineItem-body"), {
          append() {
            const url = featureLink(feature_manager.getFeatureID("file:///home/runner/work/refined-github/refined-github/source/features/pr-branch-auto-delete.tsx"));
            return dom_chef.createElement("a", {
              className: "d-inline-block",
              href: url
            }, "via Refined GitHub ", dom_chef.createElement(Info, null));
          }
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-symbolic-links.tsx", {
      include: [ isSingleFile ],
      exclude: [ isRepoFile404 ],
      deduplicate: "has-rgh",
      awaitDomReady: !0,
      init: function() {
        if ("symbolic link" === select_dom_$(".file-mode")?.textContent) {
          const line = select_dom_$(".js-file-line");
          wrap(line.firstChild, dom_chef.createElement("a", {
            href: line.textContent,
            "data-turbo-frame": "repo-content-turbo-frame"
          }));
        }
      }
    });
    function showWhiteSpacesOnLine(line, shouldAvoidSurroundingSpaces = !1) {
      const textNodesOnThisLine = getTextNodes(line);
      for (const [nodeIndex, textNode] of textNodesOnThisLine.entries()) {
        let text = textNode.textContent;
        if (text.length > 1e3) continue;
        const isLeading = 0 === nodeIndex, isTrailing = nodeIndex === textNodesOnThisLine.length - 1, startingCharacterIndex = shouldAvoidSurroundingSpaces && isLeading ? 1 : 0, skipLastCharacter = shouldAvoidSurroundingSpaces && isTrailing;
        for (let index = text.length - 1 - Number(skipLastCharacter); index >= startingCharacterIndex; index--) {
          const thisCharacter = text[index], endingIndex = index;
          if (" " === thisCharacter || "\t" === thisCharacter) {
            for (;text[index - 1] === thisCharacter && index !== startingCharacterIndex; ) index--;
            if (isLeading || isTrailing || index !== endingIndex || " " !== thisCharacter) {
              if (endingIndex < text.length - 1) textNode.splitText(endingIndex + 1);
              textNode.splitText(index);
              text = textNode.textContent;
              textNode.after(dom_chef.createElement("span", {
                "data-rgh-whitespace": "\t" === thisCharacter ? "tab" : "space"
              }, textNode.nextSibling));
            }
          }
        }
      }
      return line;
    }
    const show_whitespace_viewportObserver = new IntersectionObserver((changes => {
      for (const {target: line, isIntersecting} of changes) if (isIntersecting) {
        const shouldAvoidSurroundingSpaces = Boolean(line.closest(".blob-wrapper-embedded"));
        showWhiteSpacesOnLine(line, shouldAvoidSurroundingSpaces);
        show_whitespace_viewportObserver.unobserve(line);
      }
    }));
    function showWhitespaceWhenInViewport(line) {
      show_whitespace_viewportObserver.observe(line);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/show-whitespace.tsx", {
      asLongAs: [ webext_detect_page_isChrome ],
      include: [ hasCode ],
      init: function(signal) {
        observe(`:is(${codeElementsSelector.join(",")}):not(.blob-code-hunk)`, showWhitespaceWhenInViewport, {
          signal
        });
        onAbort(signal, show_whitespace_viewportObserver);
      }
    });
    const restore_file_namespaceObject = "query getFile($owner: String!, $name: String!, $file: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tfile: object(expression: $file) {\n\t\t\t... on Blob {\n\t\t\t\tisTruncated\n\t\t\t\ttext\n\t\t\t}\n\t\t}\n\t}\n}\n";
    async function getMergeBaseReference() {
      const {base, head} = getBranches();
      return (await v3(`compare/${base.relative}...${head.relative}`)).merge_base_commit.sha;
    }
    async function getHeadReference() {
      const {base} = getBranches(), {headRefOid} = await getPrInfo(base.relative);
      return headRefOid;
    }
    async function getFile(filePath) {
      const {repository} = await v4(restore_file_namespaceObject, {
        variables: {
          file: `${await getMergeBaseReference()}:${filePath}`
        }
      });
      return repository.file;
    }
    async function handleClick(event) {
      const menuItem = event.delegateTarget;
      try {
        const [originalFileName, newFileName = originalFileName] = menuItem.closest("[data-path]").querySelector(".Link--primary").textContent.split(" → ");
        await showToast((async progress => async function(progress, originalFileName, newFileName) {
          const [headReference, file] = await Promise.all([ getHeadReference(), getFile(originalFileName) ]);
          if (file?.isTruncated) throw new Error("File too big, you’ll have to use git");
          const isNewFile = !file, isRenamed = originalFileName !== newFileName, deleteNewFile = {
            deletions: [ {
              path: newFileName
            } ]
          }, restoreOldFile = {
            additions: [ {
              path: originalFileName,
              contents: file ? base64ToString(unescape(encodeURIComponent(file.text))) : ""
            } ]
          }, fileChanges = isRenamed ? {
            ...restoreOldFile,
            ...deleteNewFile
          } : isNewFile ? deleteNewFile : restoreOldFile, {nameWithOwner, branch: prBranch} = getBranches().head;
          progress("Committing…");
          await v4("\n\t\tmutation discardChanges ($input: CreateCommitOnBranchInput!) {\n\t\t\tcreateCommitOnBranch(input: $input) {\n\t\t\t\tcommit {\n\t\t\t\t\toid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t", {
            variables: {
              input: {
                branch: {
                  repositoryNameWithOwner: nameWithOwner,
                  branchName: prBranch
                },
                expectedHeadOid: headReference,
                fileChanges,
                message: {
                  headline: `Discard changes to ${originalFileName}`
                }
              }
            }
          });
        }(progress, originalFileName, newFileName)), {
          message: "Loading info…",
          doneMessage: "Changes discarded"
        });
        menuItem.closest(".file").remove();
      } catch (error) {
        feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/restore-file.tsx", error);
      }
    }
    function restore_file_add(editFile) {
      editFile.after(dom_chef.createElement("button", {
        className: "pl-5 dropdown-item btn-link rgh-restore-file",
        role: "menuitem",
        type: "button"
      }, "Discard changes"));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/restore-file.tsx", {
      include: [ isPRFiles ],
      init: function(signal) {
        observe('.js-file-header-dropdown a[aria-label^="Change this"]', restore_file_add, {
          signal
        });
        delegate_it_delegate(".rgh-restore-file", "click", handleClick, {
          capture: !0,
          signal
        });
      }
    });
    const Comment = props => createElement("svg", {
      className: "octicon octicon-comment",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"
    }));
    function handleIndicatorClick({delegateTarget}) {
      const resetScroll = preserveScroll(delegateTarget.closest("tr").previousElementSibling);
      delegateTarget.closest(".file.js-file").querySelector("input.js-toggle-file-notes").click();
      resetScroll();
    }
    const addIndicator = memoize((commentThread => {
      const commentCount = commentThread.querySelectorAll(".review-comment.js-comment").length;
      commentThread.before(dom_chef.createElement("tr", null, dom_chef.createElement("td", {
        className: "rgh-comments-indicator blob-num",
        colSpan: 2
      }, dom_chef.createElement("button", {
        type: "button",
        className: "btn-link"
      }, dom_chef.createElement(Comment, null), dom_chef.createElement("span", null, commentCount)))));
    })), indicatorToggleObserver = new MutationObserver((mutations => {
      for (const mutation of mutations) {
        const file = mutation.target, wasVisible = mutation.oldValue.includes("show-inline-notes"), isHidden = !file.classList.contains("show-inline-notes");
        if (wasVisible && isHidden) for (const thread of $$("tr.inline-comments", file)) addIndicator(thread);
      }
    }));
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/hidden-review-comments-indicator.tsx", {
      include: [ isPRFiles ],
      init: function(signal) {
        observe(".file.js-file", (element => {
          indicatorToggleObserver.observe(element, {
            attributes: !0,
            attributeOldValue: !0,
            attributeFilter: [ "class" ]
          });
        }));
        delegate_it_delegate(".rgh-comments-indicator", "click", handleIndicatorClick, {
          signal
        });
        onAbort(signal, indicatorToggleObserver);
      }
    });
    function loadSingleImage(image) {
      var promise = new Promise((function(resolve, reject) {
        if (image.naturalWidth) resolve(image); else if (image.complete) reject(image); else {
          image.addEventListener("load", fulfill);
          image.addEventListener("error", fulfill);
        }
        function fulfill() {
          if (image.naturalWidth) resolve(image); else reject(image);
          image.removeEventListener("load", fulfill);
          image.removeEventListener("error", fulfill);
        }
      }));
      return Object.assign(promise, {
        image
      });
    }
    const image_promise = function loadImages(input, attributes) {
      if (void 0 === attributes) attributes = {};
      if (input instanceof HTMLImageElement) return loadSingleImage(input);
      if ("string" == typeof input) {
        var src = input, image_1 = new Image;
        Object.keys(attributes).forEach((function(name) {
          return image_1.setAttribute(name, attributes[name]);
        }));
        image_1.src = src;
        return loadSingleImage(image_1);
      }
      if (function(input) {
        return void 0 !== input.length;
      }(input)) {
        var reflected = [].map.call(input, (function(img) {
          return loadImages(img, attributes).catch((function(error) {
            return error;
          }));
        }));
        return Promise.all(reflected).then((function(results) {
          var loaded = results.filter((function(x) {
            return x.naturalWidth;
          }));
          if (loaded.length === results.length) return loaded; else return Promise.reject({
            loaded,
            errored: results.filter((function(x) {
              return !x.naturalWidth;
            }))
          });
        }));
      }
      return Promise.reject(new TypeError("input is not an image, a URL string, or an array of them."));
    };
    async function handleErroredImage({delegateTarget}) {
      console.log("Refined GitHub: image failed loading, will retry", delegateTarget.src);
      await node_modules_delay(5e3);
      try {
        delegateTarget.replaceWith(await image_promise(delegateTarget.cloneNode()));
      } catch {}
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/reload-failed-proxied-images.tsx", {
      init: node_modules_onetime((function(signal) {
        delegate_it_delegate('img[src^="https://camo.githubusercontent.com/"]', "error", handleErroredImage, {
          capture: !0,
          signal
        });
      }))
    });
    const collaborators = new CachedFunction("repo-collaborators", {
      updater: async () => $$(".SelectMenu-item img[alt]", await fetch_dom(buildRepoURL("issues/show_menu_content?partial=issues/filters/authors_content"))).map((avatar => avatar.alt.slice(1))),
      maxAge: {
        days: 1
      },
      staleWhileRevalidate: {
        days: 20
      },
      cacheKey: cacheByRepo
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/highlight-collaborators-and-own-conversations.tsx", {
      include: [ isRepoIssueOrPRList ],
      init: async function() {
        const list = await collaborators.get();
        observe('.js-issue-row [data-hovercard-type="user"]', (author => {
          if (list.includes(author.textContent.trim())) author.classList.add("rgh-collaborator");
        }));
      }
    }, {
      include: [ isIssueOrPRList ],
      init: function() {
        observe(`.opened-by a[title$="ed by ${CSS.escape(github_helpers_getUsername())}"]`, (author => {
          author.classList.add("rgh-collaborator");
          author.style.fontStyle = "italic";
        }));
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/embed-gist-via-iframe.tsx", {
      include: [ isSingleGist ],
      init: node_modules_onetime((async function() {
        const embedViaScript = await elementReady('.file-navigation-option button[value^="<script"]'), embedViaIframe = embedViaScript.cloneNode(!0);
        delete embedViaIframe.dataset.hydroClick;
        delete embedViaIframe.dataset.hydroClickHmac;
        embedViaIframe.setAttribute("aria-checked", "false");
        embedViaIframe.value = `<iframe src="${location.origin}${location.pathname}.pibb"></iframe>`;
        select_dom_$(".select-menu-item-heading", embedViaIframe).textContent = "Embed via <iframe>";
        select_dom_$(".description", embedViaIframe).textContent = "Embed this gist in your website via <iframe>.";
        select_dom_$(".select-menu-item-heading", embedViaScript).textContent = "Embed via <script>";
        select_dom_$(".description", embedViaScript).textContent = "Embed this gist in your website via <script>.";
        embedViaScript.after(embedViaIframe);
      }))
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/one-click-pr-or-gist.tsx", {
      include: [ isCompare, isGist ],
      exclude: [ () => elementExists('[data-show-dialog-id="drafts-upgrade-dialog"]') ],
      deduplicate: "has-rgh",
      awaitDomReady: !0,
      init: function() {
        const initialGroupedButtons = select_dom_$('.BtnGroup:has([name="draft"], [name="gist[public]"])');
        if (!initialGroupedButtons) return !1;
        for (const dropdownItem of $$(".select-menu-item", initialGroupedButtons)) {
          let title = select_dom_$(".select-menu-item-heading", dropdownItem).textContent.trim();
          const description = select_dom_$(".description", dropdownItem).textContent.trim(), radioButton = select_dom_$("input[type=radio]", dropdownItem), classList = [ "btn", "ml-2", "tooltipped", "tooltipped-s" ];
          if (/\bdraft\b/i.test(title)) title = "Create draft PR"; else classList.push("btn-primary");
          initialGroupedButtons.after(dom_chef.createElement("button", {
            "data-disable-invalid": !0,
            className: classList.join(" "),
            "aria-label": description,
            type: "submit",
            name: radioButton.name,
            value: radioButton.value
          }, title));
        }
        initialGroupedButtons.remove();
      }
    });
    const botNames = [ "actions-user", "bors", "ImgBotApp", "renovate-bot", "rust-highfive", "scala-steward", "weblate", "apps" ], commitSelectors = [ ...botNames.map((bot => `a[data-testid="avatar-icon-link"][href^="/${bot}"]`)), ...botNames.map((bot => `a[data-test-selector="commits-avatar-stack-avatar-link"][href^="/${bot}"]:only-child`)) ], prSelectors = [ ...botNames.flatMap((bot => [ `.opened-by [title$="pull requests created by ${bot}"]`, `.opened-by [title$="pull requests opened by ${bot}"]` ])), '.opened-by [href*="author%3Aapp%2F"]', '.labels [href$="label%3Abot"]' ], dimBots = feature_manager.getIdentifiers("file:///home/runner/work/refined-github/refined-github/source/features/dim-bots.tsx");
    function undimBots(event) {
      const target = event.target;
      if (target.closest("a, button, input, [tabindex]")) return;
      const resetScroll = preserveScroll(target);
      for (const bot of $$(dimBots.selector)) bot.classList.add("rgh-interacted");
      resetScroll();
    }
    function dimCommit(commit) {
      commit.closest([ ".listviewitem", ".Box-row" ]).classList.add(dimBots.class);
    }
    function dimPr(pr) {
      pr.closest(".Box-row").classList.add(dimBots.class);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/dim-bots.tsx", {
      include: [ isCommitList, isIssueOrPRList ],
      init: async function(signal) {
        observe(commitSelectors, dimCommit, {
          signal
        });
        observe(prSelectors, dimPr, {
          signal
        });
        delegate_it_delegate(dimBots.selector, "click", undimBots, {
          signal
        });
      }
    });
    async function addIcon(links) {
      const prConfigs = links.map((link => {
        const [, owner, name, , prNumber] = link.pathname.split("/");
        return {
          key: escapeKey(owner, name, prNumber),
          link,
          owner,
          name,
          number: Number(prNumber)
        };
      })), batchQuery = prConfigs.map((({key, owner, name, number}) => `\n\t\t${key}: repository(owner: "${owner}", name: "${name}") {\n\t\t\tpullRequest(number: ${number}) {\n\t\t\t\tmergeable\n\t\t\t}\n\t\t}\n\t`)).join("\n"), data = await v4(batchQuery);
      for (const pr of prConfigs) if ("CONFLICTING" === data[pr.key].pullRequest.mergeable) pr.link.after(dom_chef.createElement("a", {
        className: "rgh-conflict-marker tooltipped tooltipped-e color-fg-muted ml-2",
        "aria-label": "This PR has conflicts that must be resolved",
        href: `${pr.link.pathname}#partial-pull-merging`
      }, dom_chef.createElement(Alert, {
        className: "v-align-middle"
      })));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/conflict-marker.tsx", {
      include: [ isIssueOrPRList ],
      init: function(signal) {
        observe(openPrsListLink, batchedFunction(addIcon, {
          delay: 100
        }), {
          signal
        });
      }
    });
    function html_preview_link_add(rawButton) {
      if (isPublicRepo()) rawButton.parentElement.prepend(dom_chef.createElement("a", {
        className: "btn btn-sm BtnGroup-item",
        href: `https://refined-github-html-preview.kidonng.workers.dev${rawButton.pathname}`
      }, "Preview"));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/html-preview-link.tsx", {
      include: [ () => isSingleFile() && /\.html?$/.test(location.pathname) ],
      exclude: [ isEnterprise ],
      init: function(signal) {
        observe('a:is(#raw-url, [data-testid="raw-button"])', html_preview_link_add, {
          signal
        });
      }
    });
    function linkifyLabel(label) {
      const activity = label.closest("div:not([class])"), isPR = elementExists(".octicon-git-pull-request", activity), repository = select_dom_$('a[data-hovercard-type="repository"]', activity), url = new URL(`${repository.href}/${isPR ? "pulls" : "issues"}`), labelName = label.textContent.trim();
      url.searchParams.set("q", `is:${isPR ? "pr" : "issue"} is:open sort:updated-desc label:"${labelName}"`);
      wrap(label, dom_chef.createElement("a", {
        href: url.href
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-labels-on-dashboard.tsx", {
      include: [ isDashboard ],
      init: function(signal) {
        observe(".news :not(a) > .IssueLabel", linkifyLabel, {
          signal
        });
      }
    });
    function addLocation({nextElementSibling, nextSibling}) {
      const userLocation = nextElementSibling ?? nextSibling, locationName = userLocation.textContent.trim(), googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`;
      userLocation.before(" ");
      const link = dom_chef.createElement("a", {
        className: "Link--primary",
        href: googleMapsLink
      });
      if (userLocation.parentElement.closest(".Popover")) link.classList.add("text-underline");
      wrap(userLocation, link);
      return link;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-user-location.tsx", {
      init: function() {
        observe([ '[itemprop="homeLocation"] svg.octicon-location', '[aria-label="User location"] svg.octicon-location' ], addLocation);
      }
    });
    var n = function(n, r) {
      return r >= n ? Math.round(r / n) : 0;
    };
    function index_es(r, a) {
      a || (a = Date.now());
      var e = (a - r) / 1e3, t = n(60, e), o = n(60, t), u = n(24, o), d = n(7, u), f = n(30, u), h = n(12, f), i = h, c = "year";
      if (e <= 1) return "just now";
      h > 0 ? (i = h, c = "year") : f > 0 ? (i = f, c = "month") : d > 0 ? (i = d, c = "week") : u > 0 ? (i = u, 
      c = "day") : o > 0 ? (i = o, c = "hour") : t > 0 ? (i = t, c = "minute") : e > 0 && (i = e, 
      c = "second");
      var s = Math.round(i);
      return (1 === s ? i === o ? "an" : "a" : s) + " " + c + (s > 1 ? "s" : "") + " ago";
    }
    const Repo = props => createElement("svg", {
      className: "octicon octicon-repo",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
    })), fresh = [ "Freshly baked", "Freshly brewed", "Newly minted", "Hot off the presses", "Straight out of the oven", "Still hot", "Smells fresh", "Just a baby", "It’s my birthday", "Brand spanking new", "It’s a new world ✨", "Certified Fresh Repo™", "So it begins, the great battle of our time" ], dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const firstCommit = new CachedFunction("first-commit", {
      async updater() {
        const {repository} = await v4("query GetFirstCommit($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tdefaultBranchRef {\n\t\t\ttarget {\n\t\t\t\t... on Commit {\n\t\t\t\t\toid\n\t\t\t\t\tcommittedDate\n\t\t\t\t\tresourcePath\n\t\t\t\t\thistory {\n\t\t\t\t\t\ttotalCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n"), {oid: commitSha, history, committedDate, resourcePath} = repository.defaultBranchRef.target, commitsCount = history.totalCount;
        if (1 === commitsCount) return [ committedDate, resourcePath ]; else return async function(commitSha, commitsCount) {
          const {repository} = await v4("query GetRepoAge($owner: String!, $name: String!, $cursor: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tdefaultBranchRef {\n\t\t\ttarget {\n\t\t\t\t... on Commit {\n\t\t\t\t\thistory(first: 5, after: $cursor) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tcommittedDate\n\t\t\t\t\t\t\tresourcePath\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n", {
            variables: {
              cursor: `${commitSha} ${commitsCount - Math.min(6, commitsCount)}`
            }
          }), {committedDate, resourcePath} = repository.defaultBranchRef.target.history.nodes.reverse().find((commit => new Date(commit.committedDate).getFullYear() > 1970));
          return [ committedDate, resourcePath ];
        }(commitSha, commitsCount);
      },
      cacheKey: cacheByRepo
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/repo-age.tsx", {
      include: [ isRepoRoot ],
      exclude: [ isEmptyRepoRoot ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        const [firstCommitDate, firstCommitHref] = await firstCommit.get(), birthday = new Date(firstCommitDate), [value, unit] = index_es(birthday.getTime()).replace("just now", "1 second").replace(/^an?/, "1").split(" "), age = Date.now() - birthday.getTime() < 1e8 ? randomArrayItem(fresh) : dom_chef.createElement(dom_chef.Fragment, null, dom_chef.createElement("strong", null, value), " ", unit, " old");
        (await elementReady(".BorderGrid .octicon-repo-forked")).closest(".mt-2").append(dom_chef.createElement("h3", {
          className: "sr-only"
        }, "Repository age"), dom_chef.createElement("div", {
          className: "mt-2"
        }, dom_chef.createElement("a", {
          href: firstCommitHref,
          className: "Link--muted",
          title: `First commit dated ${dateFormatter.format(birthday)}`
        }, dom_chef.createElement(Repo, {
          className: "mr-2"
        }), " ", age)));
      }
    });
    const Clock = props => createElement("svg", {
      className: "octicon octicon-clock",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"
    }));
    async function loadCommitPatch(commitUrl) {
      const {textContent} = await v3(commitUrl, {
        json: !1,
        headers: {
          Accept: "application/vnd.github.v3.patch"
        }
      });
      return textContent;
    }
    const lastCommitDate = new CachedFunction("last-commit", {
      async updater(login) {
        for await (const page of async function*(query, options) {
          for (;;) {
            const response = await v3(query, options);
            yield response;
            const match = /<([^>]+)>; rel="next"/.exec(response.headers.get("link"));
            if (match) query = match[1]; else return;
          }
        }(`/users/${login}/events`)) for (const event of page) if ("PushEvent" === event.type) for (const commit of event.payload.commits.reverse()) {
          const response = await v3(commit.url, {
            ignoreHTTPStatus: !0
          });
          if (404 === response.httpStatus) break;
          if (!response.ok) throw await getError(response);
          if (response.author?.id !== event.actor.id) continue;
          const patch = await loadCommitPatch(commit.url);
          if (patch.startsWith(`From ${commit.sha} `)) return /^Date: (.*)$/m.exec(patch)?.[1] ?? !1;
        }
        return !1;
      },
      maxAge: {
        days: 10
      },
      staleWhileRevalidate: {
        days: 20
      }
    });
    async function display({datePromise, placeholder, container}) {
      const date = await datePromise;
      if (!date) {
        placeholder.textContent = "Timezone unknown";
        container.title = "Timezone couldn’t be determined from their last commits";
        return;
      }
      const userTime = new Date;
      userTime.setMinutes(function(date) {
        const [, hourString, minuteString] = /([-+]\d\d)(\d\d)$/.exec(date) ?? [], hours = Number.parseInt(hourString, 10), minutes = Number.parseInt(minuteString, 10);
        return 60 * hours + (hours < 0 ? -minutes : minutes);
      }(date) + userTime.getTimezoneOffset() + userTime.getMinutes());
      const timeFormatter = new Intl.DateTimeFormat(void 0, {
        hour: "numeric",
        minute: "numeric",
        weekday: userTime.getDay() === (new Date).getDay() ? void 0 : "long"
      });
      placeholder.textContent = timeFormatter.format(userTime);
      container.title = `Timezone guessed from their last commit: ${date}`;
    }
    async function insertUserLocalTime(hovercardContainer) {
      const hovercard = hovercardContainer.closest("div.Popover-message");
      if (!elementExists('[data-hydro-view*="user-hovercard-hover"]', hovercard)) return;
      if (elementExists("profile-timezone", hovercard)) return;
      const login = select_dom_$("a.Link--primary", hovercard)?.pathname.slice(1);
      if (!login || login === github_helpers_getUsername()) return;
      const datePromise = lastCommitDate.get(login);
      if (!1 === await Promise.race([ node_modules_delay(300), datePromise ])) return;
      const placeholder = dom_chef.createElement("span", {
        className: "ml-1"
      }, "Guessing local time…"), container = dom_chef.createElement("section", {
        "aria-label": "user local time",
        className: "mt-1 color-fg-muted text-small d-flex flex-items-center"
      }, dom_chef.createElement(Clock, null), " ", placeholder), hovercardHeight = hovercard.offsetHeight;
      hovercardContainer.classList.add("rgh-user-local-time-added");
      hovercardContainer.append(container);
      if (hovercard.matches(".Popover-message--bottom-right, .Popover-message--bottom-left")) {
        const diff = hovercard.offsetHeight - hovercardHeight;
        if (diff > 0) {
          const parent = hovercard.parentElement, top = Number.parseInt(parent.style.top, 10);
          parent.style.top = top - diff + "px";
        }
      }
      display({
        datePromise,
        placeholder,
        container
      });
    }
    const selector = [ ".js-hovercard-content .Popover-message div.d-flex.mt-3.overflow-hidden > div.d-flex", ".js-hovercard-content .Popover-message div.d-flex.mt-3 > div.overflow-hidden.ml-3" ];
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/user-local-time.tsx", {
      init: function(signal) {
        observe(selector, insertUserLocalTime, {
          signal
        });
      }
    });
    const Reply = props => createElement("svg", {
      className: "octicon octicon-reply",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
    })), quick_mention_fieldSelector = "textarea#new_comment_field";
    function prefixUserMention(userMention) {
      return "@" + userMention.replace("@", "").replace(/\[bot]$/, "");
    }
    function mentionUser({delegateTarget: button}) {
      const userMention = button.parentElement.querySelector("img").alt, newComment = select_dom_$(quick_mention_fieldSelector);
      newComment.focus();
      newComment.selectionStart = newComment.selectionEnd;
      const precedingCharacter = newComment.value.slice(newComment.selectionStart - 1, newComment.selectionStart);
      insertTextIntoField(newComment, `${/\s|^$/.test(precedingCharacter) ? "" : " "}${prefixUserMention(userMention)} `);
    }
    const debug = !1;
    function quick_mention_add(avatar) {
      if (debug) avatar.style.border = "solid 5px black";
      const timelineItem = avatar.closest([ ".js-comment-container", ".js-comment" ]);
      if (debug) timelineItem.style.border = "solid 5px red";
      if (!elementExists(".unminimized-comment, .js-comment-container", timelineItem)) return;
      if (debug) timelineItem.style.border = "solid 5px green";
      if (avatar.classList.contains("TimelineItem-avatar")) {
        avatar.classList.remove("TimelineItem-avatar");
        wrap(avatar, dom_chef.createElement("div", {
          className: "avatar-parent-child TimelineItem-avatar d-none d-md-block"
        }));
      }
      const userMention = select_dom_$("img", avatar).alt;
      avatar.after(dom_chef.createElement("button", {
        type: "button",
        className: "rgh-quick-mention tooltipped tooltipped-e btn-link",
        "aria-label": `Mention ${prefixUserMention(userMention)} in a new comment`
      }, dom_chef.createElement(Reply, null)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-mention.tsx", {
      include: [ isConversation ],
      init: async function(signal) {
        if (!await isArchivedRepoAsync()) {
          delegate_it_delegate("button.rgh-quick-mention", "click", mentionUser, {
            signal
          });
          observe(`\n\t\t.js-quote-selection-container:has(${quick_mention_fieldSelector})\n\t\t:is(\n\t\t\tdiv.TimelineItem-avatar > [data-hovercard-type="user"]:first-child,\n\t\t\ta.TimelineItem-avatar\n\t\t):not([href="/${github_helpers_getUsername()}"])\n\t`, quick_mention_add, {
            signal
          });
        }
      }
    });
    async function extend_conversation_status_filters_init() {
      await elementReady(".table-list-filters");
      !function() {
        if (isPRList()) for (const lastLink of $$(".table-list-header-toggle.states a:last-child")) {
          const lastLinkQuery = SearchQuery.from(lastLink);
          if (lastLinkQuery.includes("is:merged")) {
            lastLink.lastChild.textContent = lastLink.lastChild.textContent.replace("Total", "Merged");
            continue;
          }
          if (lastLinkQuery.includes("is:unmerged")) {
            lastLink.lastChild.textContent = lastLink.lastChild.textContent.replace("Total", "Unmerged");
            continue;
          }
          const mergeLink = lastLink.cloneNode(!0);
          mergeLink.textContent = "Merged";
          mergeLink.classList.toggle("selected", SearchQuery.from(location).includes("is:merged"));
          mergeLink.href = SearchQuery.from(mergeLink).replace("is:closed", "is:merged").href;
          lastLink.after(" ", mergeLink);
        }
      }();
      !function() {
        for (const link of $$(".table-list-header-toggle.states a")) {
          select_dom_$(".octicon", link)?.remove();
          if (link.classList.contains("selected")) {
            link.prepend(dom_chef.createElement(Check, null));
            link.href = SearchQuery.from(link).remove("is:open", "is:closed", "is:merged", "is:unmerged").href;
          }
        }
      }();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/extend-conversation-status-filters.tsx", {
      include: [ isRepoIssueOrPRList ],
      deduplicate: "has-rgh-inner",
      init: extend_conversation_status_filters_init
    }, {
      include: [ isGlobalIssueOrPRList ],
      deduplicate: "has-rgh",
      init: extend_conversation_status_filters_init
    });
    async function one_event_oneEvent(target, type, options = {}) {
      options.once = !0;
      return new Promise(((resolve, reject) => {
        target.addEventListener(type, resolve, options);
        options.signal?.addEventListener("abort", (() => {
          reject(options.signal.reason);
        }), {
          once: !0
        });
      }));
    }
    const paginationButtonSelector = '.ajax-pagination-form button[type="submit"]';
    async function handleAltClick({altKey, delegateTarget}) {
      if (altKey) await showToast(async function(paginationButton) {
        let wrapper = paginationButton.form.parentElement;
        const isExpandingMainThread = "js-progressive-timeline-item-container" === wrapper.id;
        for (;paginationButton; ) {
          await one_event_oneEvent(paginationButton.form, "page:loaded");
          if (isExpandingMainThread) wrapper = wrapper.lastElementChild;
          paginationButton = select_dom_$(`:scope > ${paginationButtonSelector}`, wrapper);
          paginationButton?.click();
        }
      }(delegateTarget), {
        message: "Expanding…",
        doneMessage: "Expanded"
      });
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/expand-all-hidden-comments.tsx", {
      include: [ isConversation ],
      init: function(signal) {
        delegate_it_delegate(paginationButtonSelector, "click", handleAltClick, {
          signal
        });
      }
    });
    const Bug = props => createElement("svg", {
      className: "octicon octicon-bug",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M4.72.22a.75.75 0 0 1 1.06 0l1 .999a3.488 3.488 0 0 1 2.441 0l.999-1a.748.748 0 0 1 1.265.332.75.75 0 0 1-.205.729l-.775.776c.616.63.995 1.493.995 2.444v.327c0 .1-.009.197-.025.292.408.14.764.392 1.029.722l1.968-.787a.75.75 0 0 1 .556 1.392L13 7.258V9h2.25a.75.75 0 0 1 0 1.5H13v.5c0 .409-.049.806-.141 1.186l2.17.868a.75.75 0 0 1-.557 1.392l-2.184-.873A4.997 4.997 0 0 1 8 16a4.997 4.997 0 0 1-4.288-2.427l-2.183.873a.75.75 0 0 1-.558-1.392l2.17-.868A5.036 5.036 0 0 1 3 11v-.5H.75a.75.75 0 0 1 0-1.5H3V7.258L.971 6.446a.75.75 0 0 1 .558-1.392l1.967.787c.265-.33.62-.583 1.03-.722a1.677 1.677 0 0 1-.026-.292V4.5c0-.951.38-1.814.995-2.444L4.72 1.28a.75.75 0 0 1 0-1.06Zm.53 6.28a.75.75 0 0 0-.75.75V11a3.5 3.5 0 1 0 7 0V7.25a.75.75 0 0 0-.75-.75ZM6.173 5h3.654A.172.172 0 0 0 10 4.827V4.5a2 2 0 1 0-4 0v.327c0 .096.077.173.173.173Z"
    })), supportedLabels = /^(bug|bug-?fix|confirmed-bug|(type|kind|triage)[:/]bug|(:[\w-]+:|\p{Emoji})bug)$/iu;
    function isBugLabel(label) {
      return supportedLabels.test(label.replaceAll(/\s/g, ""));
    }
    const bugs = new CachedFunction("bugs", {
      updater: async function() {
        const {repository} = await v4('query CountBugs($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tlabels(query: "bug", first: 10) {\n\t\t\tnodes {\n\t\t\t\tname\n\t\t\t\tissues(states: OPEN) {\n\t\t\t\t\ttotalCount\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n');
        for (const label of repository.labels.nodes) if ("bug" === label.name) return {
          label: "bug",
          count: label.issues.totalCount ?? 0
        };
        for (const label of repository.labels.nodes) if (isBugLabel(label.name)) return {
          label: label.name,
          count: label.issues.totalCount ?? 0
        };
        return {
          label: "",
          count: 0
        };
      },
      maxAge: {
        minutes: 30
      },
      staleWhileRevalidate: {
        days: 4
      },
      cacheKey: cacheByRepo
    });
    async function getSearchQueryBugLabel() {
      const {label} = await bugs.getCached() ?? {};
      return "label:" + SearchQuery.escapeValue(label ?? "bug");
    }
    async function isBugsListing() {
      return SearchQuery.from(location).includes(await getSearchQueryBugLabel());
    }
    function highlightBugsTab() {
      unhighlightTab(select_dom_$('.UnderlineNav-item[data-hotkey="g i"]'));
      highlightTab(select_dom_$(".rgh-bugs-tab"));
    }
    async function updateBugsTagHighlighting() {
      const {count, label} = await bugs.get();
      if (0 === count) return !1;
      if (!(isRepoTaxonomyIssueOrPRList() && location.href.endsWith("/labels/" + encodeURIComponent(label)) || isRepoIssueList() && await isBugsListing())) if (!isIssue() || !await elementReady(`#partial-discussion-sidebar .IssueLabel[data-name="${label}"]`)) return !1; else highlightBugsTab(); else {
        !async function() {
          const pinnedIssues = await elementReady(".js-pinned-issues-reorder-container", {
            waitForChildren: !1
          });
          pinnedIssues?.remove();
        }();
        highlightBugsTab();
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/bugs-tab.tsx", {
      include: [ hasRepoHeader ],
      init: async function() {
        if (!elementExists(".rgh-bugs-tab")) await async function() {
          const bugsPromise = bugs.get();
          if (!await isBugsListing()) {
            const {count} = await bugsPromise;
            if (0 === count) return !1;
          }
          const issuesTab = await elementReady('a.UnderlineNav-item[data-hotkey="g i"]', {
            waitForChildren: !1
          });
          if (!issuesTab) return !1;
          const bugsTab = issuesTab.cloneNode(!0);
          bugsTab.classList.add("rgh-bugs-tab");
          unhighlightTab(bugsTab);
          delete bugsTab.dataset.hotkey;
          delete bugsTab.dataset.selectedLinks;
          bugsTab.removeAttribute("id");
          const bugsTabTitle = select_dom_$("[data-content]", bugsTab);
          bugsTabTitle.dataset.content = "Bugs";
          bugsTabTitle.textContent = "Bugs";
          select_dom_$(".octicon", bugsTab).replaceWith(dom_chef.createElement(Bug, {
            className: "UnderlineNav-octicon d-none d-sm-inline"
          }));
          const bugsCounter = select_dom_$(".Counter", bugsTab);
          bugsCounter.textContent = "0";
          bugsCounter.title = "";
          bugsTab.href = SearchQuery.from(bugsTab).add(await getSearchQueryBugLabel()).href;
          if (issuesTab.parentElement instanceof HTMLLIElement) issuesTab.parentElement.after(dom_chef.createElement("li", {
            className: "d-inline-flex"
          }, bugsTab)); else issuesTab.after(bugsTab);
          triggerRepoNavOverflow();
          try {
            const {count: bugCount} = await bugsPromise;
            bugsCounter.textContent = abbreviateNumber(bugCount);
            bugsCounter.title = bugCount > 999 ? String(bugCount) : "";
          } catch (error) {
            bugsCounter.remove();
            throw error;
          }
        }();
        await updateBugsTagHighlighting();
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/cross-deleted-pr-branches.tsx", {
      include: [ distribution_isPRConversation ],
      deduplicate: "has-rgh-inner",
      awaitDomReady: !0,
      init: function() {
        const lastBranchAction = lastElement(".TimelineItem-body .user-select-contain.commit-ref"), headReferenceLink = select_dom_$(".head-ref a");
        if (!headReferenceLink && !lastBranchAction) return;
        if (!lastBranchAction?.closest(".TimelineItem-body").textContent.includes(" deleted ")) return !1;
        const deletedBranchName = lastBranchAction.textContent.trim(), repoRootUrl = headReferenceLink?.href.split("/", 5).join("/");
        for (const element of $$(".commit-ref")) {
          if (element.textContent.trim() === deletedBranchName) {
            element.title = "This branch has been deleted";
            if (!headReferenceLink) continue;
            if (element.classList.contains("head-ref")) select_dom_$("a", element).href = repoRootUrl; else wrap(element, dom_chef.createElement("a", {
              href: repoRootUrl
            }));
          }
        }
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/repo-wide-file-finder.tsx", {
      include: [ isRepo ],
      exclude: [ () => elementExists('[data-hotkey="t"]'), isEmptyRepo, isPRFiles, (url = location) => Boolean(getRepo(url)?.path.startsWith("find/")) ],
      init: async function(signal) {
        registerHotkey("t", buildRepoURL("tree", getCurrentGitRef() ?? await getDefaultBranch()) + "?search=1", {
          signal
        });
      }
    });
    const commitChanges = new CachedFunction("commit-changes", {
      async updater(commit) {
        const {repository} = await v4("query GetCommitChanges($owner: String!, $name: String!, $commit: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tobject(expression: $commit) {\n\t\t\t... on Commit {\n\t\t\t\tadditions\n\t\t\t\tdeletions\n\t\t\t}\n\t\t}\n\t}\n}\n", {
          variables: {
            commit
          }
        });
        return [ repository.object.additions, repository.object.deletions ];
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pr-commit-lines-changed.tsx", {
      include: [ isPRCommit ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        const commitSha = location.pathname.split("/").pop(), [additions, deletions] = await commitChanges.get(commitSha), tooltip = pluralize(additions + deletions, "1 line changed", "$$ lines changed");
        (await elementReady(".diffstat", {
          waitForChildren: !1
        })).replaceWith(dom_chef.createElement("span", {
          className: "ml-2 diffstat tooltipped tooltipped-s",
          "aria-label": tooltip
        }, dom_chef.createElement("span", {
          className: "color-fg-success"
        }, "+", additions), " ", dom_chef.createElement("span", {
          className: "color-fg-danger"
        }, "−", deletions), " ", dom_chef.createElement("span", {
          className: "diffstat-block-neutral"
        }), dom_chef.createElement("span", {
          className: "diffstat-block-neutral"
        }), dom_chef.createElement("span", {
          className: "diffstat-block-neutral"
        }), dom_chef.createElement("span", {
          className: "diffstat-block-neutral"
        }), dom_chef.createElement("span", {
          className: "diffstat-block-neutral"
        })));
      }
    });
    function getLinkCopy(count) {
      return pluralize(count, "one open pull request", "at least $$ open pull requests");
    }
    const countPRs = new CachedFunction("prs-on-forked-repo", {
      async updater(forkedRepo) {
        const {search} = await v4("query GetPRs($query: String!) {\n\tsearch(first: 100, type: ISSUE, query: $query) {\n\t\tnodes {\n\t\t\t... on PullRequest {\n\t\t\t\tnumber\n\t\t\t\theadRepository {\n\t\t\t\t\tnameWithOwner\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n", {
          variables: {
            query: `is:pr is:open archived:false repo:${forkedRepo} author:${github_helpers_getUsername()}`
          }
        }), prs = search.nodes.filter((pr => pr.headRepository.nameWithOwner === github_helpers_getRepo().nameWithOwner));
        if (1 === prs.length) return {
          count: 1,
          firstPr: prs[0].number
        }; else return {
          count: prs.length
        };
      },
      maxAge: {
        hours: 1
      },
      staleWhileRevalidate: {
        days: 2
      },
      cacheKey: ([forkedRepo]) => `${forkedRepo}:${github_helpers_getRepo().nameWithOwner}`
    });
    async function getPRs() {
      await elementReady(".UnderlineNav-body");
      if (!canUserEditRepo()) return [];
      const forkedRepo = getForkedRepo(), {count, firstPr} = await countPRs.get(forkedRepo);
      if (1 === count) return [ count, `/${forkedRepo}/pull/${firstPr}` ];
      const url = new URL(`/${forkedRepo}/pulls`, location.origin);
      url.searchParams.set("q", "is:pr is:open sort:updated-desc author:@me");
      return [ count, url.href ];
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/show-open-prs-of-forks.tsx", {
      asLongAs: [ isForkedRepo ],
      deduplicate: "has-rgh",
      init: async function() {
        const [count, url] = await getPRs();
        if (!count) return !1;
        select_dom_$(`[data-hovercard-type="repository"][href="/${getForkedRepo()}"]`).after(dom_chef.createElement(dom_chef.Fragment, null, " with ", dom_chef.createElement("a", {
          href: url,
          className: "rgh-open-prs-of-forks"
        }, getLinkCopy(count))));
      }
    }, {
      asLongAs: [ isForkedRepo ],
      include: [ (url = location) => "settings" === getRepo(url)?.path ],
      deduplicate: "has-rgh",
      init: async function() {
        const [count, url] = await getPRs();
        if (!count) return !1;
        select_dom_$('details-dialog[aria-label*="Delete"] .Box-body p:first-child').after(dom_chef.createElement("p", {
          className: "flash flash-warn"
        }, "It will also abandon ", dom_chef.createElement("a", {
          href: url
        }, "your ", getLinkCopy(count)), " in ", dom_chef.createElement("strong", null, getForkedRepo()), " and you’ll no longer be able to edit ", 1 === count ? "it" : "them", "."));
      }
    });
    const Versions = props => createElement("svg", {
      className: "octicon octicon-versions",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M7.75 14A1.75 1.75 0 0 1 6 12.25v-8.5C6 2.784 6.784 2 7.75 2h6.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14Zm-.25-1.75c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25h-6.5a.25.25 0 0 0-.25.25ZM4.9 3.508a.75.75 0 0 1-.274 1.025.249.249 0 0 0-.126.217v6.5c0 .09.048.173.126.217a.75.75 0 0 1-.752 1.298A1.75 1.75 0 0 1 3 11.25v-6.5c0-.649.353-1.214.874-1.516a.75.75 0 0 1 1.025.274ZM1.625 5.533h.001a.249.249 0 0 0-.126.217v4.5c0 .09.048.173.126.217a.75.75 0 0 1-.752 1.298A1.748 1.748 0 0 1 0 10.25v-4.5a1.748 1.748 0 0 1 .873-1.516.75.75 0 1 1 .752 1.299Z"
    })), getPullRequestBlameCommit = memoize((async (commit, prNumbers, currentFilename) => {
      const {repository} = await v4("query GetPullRequestBlameCommit(\n\t$owner: String!\n\t$name: String!\n\t$file: String!\n\t$commit: String!\n) {\n\trepository(owner: $owner, name: $name) {\n\t\tfile: object(expression: $file) {\n\t\t\tid\n\t\t}\n\t\tobject(expression: $commit) {\n\t\t\t... on Commit {\n\t\t\t\tassociatedPullRequests(last: 1) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tnumber\n\t\t\t\t\t\tmergeCommit {\n\t\t\t\t\t\t\toid\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcommits(last: 1) {\n\t\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\t\tcommit {\n\t\t\t\t\t\t\t\t\toid\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n", {
        variables: {
          commit,
          file: commit + ":" + currentFilename
        }
      }), associatedPR = repository.object.associatedPullRequests.nodes[0];
      if (!associatedPR || !prNumbers.includes(associatedPR.number) || associatedPR.mergeCommit.oid !== commit) throw new Error("The PR linked in the title didn’t create this commit");
      if (!repository.file) throw new Error("The file was renamed and Refined GitHub can’t find it");
      return associatedPR.commits.nodes[0].commit.oid;
    }));
    async function redirectToBlameCommit(event) {
      const blameElement = event.delegateTarget;
      if (blameElement instanceof HTMLAnchorElement && !event.altKey) return;
      event.preventDefault();
      blameElement.blur();
      const blameHunk = blameElement.closest(".react-blame-segment-wrapper"), prNumbers = $$(".issue-link", blameHunk).map((pr => looseParseInt(pr))), commitInfo = expectElement('span[data-hovercard-url*="/commit/"]', blameHunk).dataset.hovercardUrl, prCommit = /[/]commit[/]([0-9a-f]{40})[/]/i.exec(commitInfo)[1];
      const blameUrl = new GitHubFileURL(location.href);
      await showToast((async () => {
        blameUrl.branch = await getPullRequestBlameCommit(prCommit, prNumbers, blameUrl.filePath);
        blameUrl.hash = "L" + select_dom_$(".react-line-number", blameHunk).textContent;
        location.href = blameUrl.href;
      }), {
        message: "Fetching pull request",
        doneMessage: "Redirecting"
      });
    }
    function deep_reblame_addButton(hunk) {
      const reblameLink = select_dom_$('a[aria-labelledby^="reblame-"]', hunk);
      if (reblameLink) {
        reblameLink.setAttribute("aria-label", "View blame prior to this change. Hold `Alt` to extract commits from this PR first");
        reblameLink.classList.add("rgh-deep-reblame");
      } else select_dom_$(".timestamp-wrapper-mobile", hunk).after(dom_chef.createElement("button", {
        type: "button",
        "aria-label": "View blame prior to this change (extracts commits from this PR first)",
        className: "rgh-deep-reblame Button Button--iconOnly Button--invisible Button--small d-flex"
      }, dom_chef.createElement(Versions, null)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/deep-reblame.tsx", {
      include: [ isBlame ],
      init: function(signal) {
        delegate_it_delegate(".rgh-deep-reblame", "click", redirectToBlameCommit, {
          signal
        });
        observe('.react-blame-for-range:has([data-hovercard-type="pull_request"])', deep_reblame_addButton, {
          signal
        });
      }
    });
    const isPrAgainstDefaultBranch = async () => getBranches().base.branch === await getDefaultBranch();
    async function clear_pr_merge_commit_message_clear(messageField) {
      feature_manager.unload("file:///home/runner/work/refined-github/refined-github/source/features/clear-pr-merge-commit-message.tsx");
      const originalMessage = messageField.value, cleanedMessage = function(message, closingKeywords = !1) {
        const preservedContent = new Set;
        for (const [, author] of message.matchAll(/co-authored-by: ([^\n]+)/gi)) preservedContent.add("Co-authored-by: " + author);
        if (!closingKeywords) return [ ...preservedContent ].join("\n");
        for (const [line] of message.matchAll(/(fix(es|ed)?|close[sd]?|resolve[sd]?)([^\n]+)/gi)) if (/#\d+/.test(line) || line.includes("http")) preservedContent.add(line);
        return [ ...preservedContent ].join("\n");
      }(originalMessage, !await isPrAgainstDefaultBranch());
      if (cleanedMessage === originalMessage.trim()) return !1;
      messageField.value = cleanedMessage ? cleanedMessage + "\n" : "";
      messageField.dispatchEvent(new Event("input", {
        bubbles: !0
      }));
      messageField.after(dom_chef.createElement("div", null, dom_chef.createElement("p", {
        className: "note"
      }, "The description field was cleared by ", dom_chef.createElement("a", {
        target: "_blank",
        href: "https://github.com/refined-github/refined-github/wiki/Extended-feature-descriptions#clear-pr-merge-commit-message",
        rel: "noreferrer"
      }, "Refined GitHub"), "."), dom_chef.createElement("hr", null)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clear-pr-merge-commit-message.tsx", {
      asLongAs: [ userCanLikelyMergePR ],
      include: [ distribution_isPRConversation ],
      exclude: [ () => 1 === $$(".TimelineItem.js-commit").length ],
      awaitDomReady: !0,
      init: function(signal) {
        observe("textarea#merge_message_field", clear_pr_merge_commit_message_clear, {
          signal
        });
      }
    });
    const Search = props => createElement("svg", {
      className: "octicon octicon-search",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"
    }));
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/action-used-by-link.tsx", {
      include: [ (url = location) => url.pathname.startsWith("/marketplace/actions/") ],
      awaitDomReady: !0,
      deduplicate: "has-rgh",
      init: function() {
        const actionRepo = select_dom_$("aside a:has(.octicon-repo)").pathname.slice(1), actionURL = new URL("search", location.origin);
        actionURL.search = new URLSearchParams({
          q: `${actionRepo} path:.github/workflows/ language:YAML`,
          type: "Code",
          s: "indexed",
          o: "desc"
        }).toString();
        select_dom_$('.d-block.mb-2[href^="/contact"]').after(dom_chef.createElement("a", {
          href: actionURL.href,
          className: "d-block mb-2"
        }, dom_chef.createElement(Search, {
          width: 14,
          className: "color-fg-default mr-2"
        }), "Usage examples"));
      }
    });
    let previousFile, runningBatch = !1;
    function remember(event) {
      if (!runningBatch) previousFile = event.delegateTarget.closest(".js-file");
    }
    function isChecked(file) {
      return file.querySelector("input.js-reviewed-checkbox").checked;
    }
    const batchToggle = debounce_fn((event => {
      if (!event.shiftKey) return;
      event.stopImmediatePropagation();
      const files = $$(".js-file"), thisFile = event.delegateTarget.closest(".js-file"), isThisBeingFileChecked = !isChecked(thisFile);
      runningBatch = !0;
      const selectedFiles = function(items, previous, current) {
        const start = previous ? items.indexOf(previous) : 0, end = items.indexOf(current);
        return items.slice(Math.min(start, end), Math.max(start, end) + 1);
      }(files, previousFile, thisFile);
      for (const file of selectedFiles) if (file !== thisFile && isChecked(file) !== isThisBeingFileChecked) select_dom_$(".js-reviewed-checkbox", file).click();
      runningBatch = !1;
    }), {
      before: !0,
      after: !1
    });
    const markAsViewed = click_all((function(target) {
      return ".js-reviewed-checkbox" + (isChecked(target) ? ":not([checked])" : "[checked]");
    })), onAltClick = debounce_fn((event => {
      if (!event.altKey || !event.isTrusted) return;
      const newState = isChecked(event.delegateTarget) ? "unviewed" : "viewed";
      showToast((async () => {
        markAsViewed(event);
      }), {
        message: `Marking visible files as ${newState}`,
        doneMessage: `Files marked as ${newState}`
      });
    }), {
      before: !0,
      after: !1
    });
    function avoidSelectionOnShiftClick(event) {
      if (event.shiftKey) event.preventDefault();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/batch-mark-files-as-viewed.tsx", {
      include: [ isPRFiles ],
      init: function(signal) {
        delegate_it_delegate(".js-reviewed-toggle", "click", onAltClick, {
          signal
        });
        delegate_it_delegate(".js-reviewed-toggle", "click", batchToggle, {
          signal
        });
        delegate_it_delegate(".js-reviewed-toggle", "mousedown", avoidSelectionOnShiftClick, {
          signal
        });
        delegate_it_delegate(".js-toggle-user-reviewed-file-form", "submit", remember, {
          signal
        });
        onAbort(signal, (() => {
          previousFile = void 0;
        }));
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/unwrap-unnecessary-dropdowns.tsx", {
      include: [ isNotifications ],
      deduplicate: "has-rgh",
      init: async function() {
        await elementReady(".js-check-all-container > :first-child");
        const forms = $$('[action="/notifications/beta/update_view_preference"]');
        if (0 === forms.length) return !1;
        if (forms.length > 2) throw new Error("GitHub added new view types. This feature is obsolete.");
        const dropdown = forms[0].closest("action-menu"), desiredForm = "Date" === select_dom_$(".Button-label span:last-child", dropdown).textContent.trim() ? forms[0] : forms[1];
        !function(dropdown, form) {
          dropdown.replaceWith(form);
          form.classList.add(...dropdown.classList);
          form.classList.remove("dropdown", "details-reset", "details-overlay");
        }(dropdown, desiredForm);
        const button = select_dom_$('[type="submit"]', desiredForm);
        button.className = "btn";
        button.textContent = `Group by ${button.textContent.toLowerCase()}`;
      }
    });
    function linkify_notification_repository_header_linkify(header) {
      header.append(dom_chef.createElement("a", {
        className: "color-fg-inherit",
        href: "/" + header.textContent.trim()
      }, header.firstChild));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-notification-repository-header.tsx", {
      include: [ isNotifications ],
      init: function(signal) {
        observe(".js-notifications-group h6", linkify_notification_repository_header_linkify, {
          signal
        });
      }
    });
    function stop_redirecting_in_notification_bar_handleClick(event) {
      const redirectDisabled = event.altKey || "true" === sessionStorage.rghIsNewTab;
      event.delegateTarget.form.toggleAttribute("data-redirect-to-inbox-on-submit", !redirectDisabled);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/stop-redirecting-in-notification-bar.tsx", {
      include: [ () => location.search.startsWith("?notification_referrer_id=") || JSON.parse(sessionStorage.getItem("notification_shelf") ?? "{}").pathname === location.pathname ],
      init: function(signal) {
        sessionStorage.rghIsNewTab = 1 === history.length;
        delegate_it_delegate(".notification-shelf .js-notification-action button", "click", stop_redirecting_in_notification_bar_handleClick, {
          signal
        });
      }
    });
    function getRepoReference(currentRepo, repoNameWithOwner, delimiter = "") {
      return repoNameWithOwner === currentRepo.nameWithOwner ? "" : repoNameWithOwner + delimiter;
    }
    const escapeRegex = string => string.replaceAll(/[\\^$.*+?()[\]{}|]/g, "\\$&"), prCommitUrlRegex = new RegExp("\\b" + escapeRegex(location.origin) + /[/]([^/]+[/][^/]+)[/]pull[/](\d+)[/]commits[/]([\da-f]{7})[\da-f]{33}(?:#[\w-]+)?\b/.source, "gi"), prCompareUrlRegex = new RegExp("\\b" + escapeRegex(location.origin) + /[/]([^/]+[/][^/]+)[/]compare[/](.+)(#diff-[\da-fR-]+)/.source, "gi"), discussionUrlRegex = new RegExp("\\b" + escapeRegex(location.origin) + /[/]([^/]+[/][^/]+)[/]discussions[/](\d+)[?][^#\s]+(#[\w-]+)?\b/.source, "gi");
    function preventPrCommitLinkLoss(url, repoNameWithOwner, pr, commit, index, fullText) {
      if (")" === fullText[index + url.length]) return url; else return `[${getRepoReference(github_helpers_getRepo(), repoNameWithOwner, "@")}\`${commit}\` (#${pr})](${url})`;
    }
    function preventPrCompareLinkLoss(url, repoNameWithOwner, compare, hash, index, fullText) {
      if (")" === fullText[index + url.length]) return url; else return `[${getRepoReference(github_helpers_getRepo(), repoNameWithOwner, "@")}\`${compare}\`${hash.slice(0, 16)}](${url})`;
    }
    function preventDiscussionLinkLoss(url, repoNameWithOwner, discussion, comment, index, fullText) {
      if (")" === fullText[index + url.length]) return url; else return `[${getRepoReference(github_helpers_getRepo(), repoNameWithOwner)}#${discussion}${comment ? " (comment)" : ""}](${url})`;
    }
    const classes = "flex-shrink-0 btn btn-sm ml-sm-3 mt-2 mt-sm-n2 mb-sm-n2 mr-sm-n1 flex-self-center";
    function createBanner(props) {
      let button;
      if ("string" == typeof props.action) button = dom_chef.createElement("a", {
        href: props.action,
        className: classes
      }, props.buttonLabel); else if ("function" == typeof props.action) button = dom_chef.createElement("button", {
        type: "button",
        className: classes,
        onClick: props.action
      }, props.buttonLabel);
      return dom_chef.createElement("div", {
        className: [ "flash", ...props.classes ?? "" ].join(" ")
      }, dom_chef.createElement("div", {
        className: "d-sm-flex flex-items-center gap-2"
      }, dom_chef.createElement("div", {
        className: "d-flex flex-auto flex-self-center flex-items-center gap-2"
      }, props.icon, dom_chef.createElement("span", null, props.text)), button));
    }
    const documentation = "https://github.com/refined-github/refined-github/wiki/GitHub-markdown-linkifier-bug";
    function handleButtonClick({currentTarget: fixButton}) {
      const field = fixButton.form.querySelector("textarea.js-comment-field");
      replaceFieldText(field, prCommitUrlRegex, preventPrCommitLinkLoss);
      replaceFieldText(field, prCompareUrlRegex, preventPrCompareLinkLoss);
      replaceFieldText(field, discussionUrlRegex, preventDiscussionLinkLoss);
      fixButton.closest(".flash").remove();
    }
    function prevent_link_loss_getUI(field) {
      return select_dom_$(".rgh-prevent-link-loss-container", field.form) ?? createBanner({
        icon: dom_chef.createElement(Alert, {
          className: "m-0"
        }),
        text: dom_chef.createElement(dom_chef.Fragment, null, " Your link may be ", dom_chef.createElement("a", {
          href: documentation,
          target: "_blank",
          rel: "noopener noreferrer",
          "data-hovercard-type": "issue"
        }, "misinterpreted"), " by GitHub."),
        classes: [ "rgh-prevent-link-loss-container", "flash-warn", "my-2", "mx-2" ],
        action: handleButtonClick,
        buttonLabel: "Fix link"
      });
    }
    function prevent_link_loss_updateUI({delegateTarget: field}) {
      if ((value = field.value) !== value.replace(prCommitUrlRegex, preventPrCommitLinkLoss) || value !== value.replace(prCompareUrlRegex, preventPrCompareLinkLoss) || value !== value.replace(discussionUrlRegex, preventDiscussionLinkLoss)) select_dom_$("file-attachment .js-write-bucket", field.form).append(prevent_link_loss_getUI(field)); else prevent_link_loss_getUI(field).remove();
      var value;
    }
    const updateUIDebounced = debounce_fn(prevent_link_loss_updateUI, {
      wait: 300
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/prevent-link-loss.tsx", {
      include: [ hasRichTextEditor ],
      init: function(signal) {
        delegate_it_delegate("textarea.js-comment-field", "input", updateUIDebounced, {
          signal
        });
        delegate_it_delegate("textarea.js-comment-field", "focusin", prevent_link_loss_updateUI, {
          signal
        });
      }
    });
    function TimelineItem() {
      return dom_chef.createElement("div", {
        className: "ml-0 pl-0 ml-md-6 pl-md-3 mt-3"
      });
    }
    const closing_remarks_canCreateRelease = canEditEveryComment;
    function excludeNightliesAndJunk({textContent}) {
      return !textContent.includes("nightly") && /\d[.]\d/.test(textContent);
    }
    const firstTag = new CachedFunction("first-tag", {
      async updater(commit) {
        const tags = $$("ul.branches-tag-list a", await fetch_dom(buildRepoURL("branch_commits", commit)));
        return tags.findLast(excludeNightliesAndJunk)?.textContent ?? !1;
      },
      cacheKey: ([commit]) => [ github_helpers_getRepo().nameWithOwner, commit ].join(":")
    });
    function addExistingTagLinkToHeader(tagName, tagUrl, discussionHeader) {
      discussionHeader.parentElement.append(dom_chef.createElement("span", null, dom_chef.createElement(Tag, {
        className: "ml-2 mr-1 color-fg-muted"
      }), dom_chef.createElement("a", {
        href: tagUrl,
        className: "commit-ref",
        title: `${tagName} was the first Git tag to include this pull request`
      }, tagName)));
    }
    async function addReleaseBanner(text = "Now you can release this change") {
      const [releases] = await getReleases();
      if (0 === releases) return;
      const url = function() {
        if (closing_remarks_canCreateRelease()) if (isRefinedGitHubRepo()) return "https://github.com/refined-github/refined-github/actions/workflows/release.yml"; else return buildRepoURL("releases/new");
      }(), bannerContent = {
        icon: dom_chef.createElement(Tag, {
          className: "m-0"
        }),
        classes: [ "rgh-bg-none" ],
        text
      };
      attachElement("#issue-comment-box", {
        before: () => dom_chef.createElement(TimelineItem, null, createBanner(url ? {
          ...bannerContent,
          action: url,
          buttonLabel: "Draft a new release"
        } : bannerContent))
      });
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/closing-remarks.tsx", {
      asLongAs: [ distribution_isPRConversation, () => exists("#partial-discussion-header .octicon-git-merge") ],
      awaitDomReady: !0,
      init: async function(signal) {
        const mergeCommit = select_dom_$(`.TimelineItem.js-details-container.Details a[href^="/${github_helpers_getRepo().nameWithOwner}/commit/" i] > code`).textContent, tagName = await firstTag.get(mergeCommit);
        if (tagName) {
          const tagUrl = buildRepoURL("releases/tag", tagName);
          !function(tagName, tagUrl) {
            const linkedTag = dom_chef.createElement("a", {
              href: tagUrl,
              className: "Link--primary text-bold"
            }, tagName);
            attachElement("#issue-comment-box", {
              before: () => dom_chef.createElement(TimelineItem, null, createBanner({
                icon: dom_chef.createElement(Tag, {
                  className: "m-0"
                }),
                text: dom_chef.createElement(dom_chef.Fragment, null, "This pull request first appeared in ", linkedTag),
                classes: [ "flash-success", "rgh-bg-none" ]
              }))
            });
          }(tagName, tagUrl);
          observe("#partial-discussion-header relative-time", addExistingTagLinkToHeader.bind(null, tagName, tagUrl), {
            signal
          });
        } else addReleaseBanner("This PR’s merge commit doesn’t appear in any tags");
      }
    }, {
      asLongAs: [ distribution_isPRConversation, isOpenPR, closing_remarks_canCreateRelease ],
      additionalListeners: [ onPrMerge ],
      onlyAdditionalListeners: !0,
      awaitDomReady: !0,
      init() {
        addReleaseBanner();
      }
    });
    const GitPullRequestClosed = props => createElement("svg", {
      className: "octicon octicon-git-pull-request-closed",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 5.5a.75.75 0 0 1 .75.75v3.378a2.251 2.251 0 1 1-1.5 0V7.25a.75.75 0 0 1 .75-.75Zm-2.03-5.273a.75.75 0 0 1 1.06 0l.97.97.97-.97a.748.748 0 0 1 1.265.332.75.75 0 0 1-.205.729l-.97.97.97.97a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-.97-.97-.97.97a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l.97-.97-.97-.97a.75.75 0 0 1 0-1.06ZM2.5 3.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM3.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
    })), GitPullRequestDraft = props => createElement("svg", {
      className: "octicon octicon-git-pull-request-draft",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 14a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM2.5 3.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM3.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM14 7.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-4.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
    })), RepoForked = props => createElement("svg", {
      className: "octicon octicon-repo-forked",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
    })), pullRequestsAssociatedWithBranch = new CachedFunction("associatedBranchPullRequests", {
      async updater() {
        const {repository} = await v4('query AssociatedPullRequests($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\trefs(refPrefix: "refs/heads/", last: 100) {\n\t\t\tnodes {\n\t\t\t\tname\n\t\t\t\tassociatedPullRequests(\n\t\t\t\t\tlast: 1\n\t\t\t\t\torderBy: { field: CREATED_AT, direction: DESC }\n\t\t\t\t) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tnumber\n\t\t\t\t\t\tstate\n\t\t\t\t\t\tisDraft\n\t\t\t\t\t\turl\n\t\t\t\t\t\ttimelineItems(\n\t\t\t\t\t\t\tlast: 1\n\t\t\t\t\t\t\titemTypes: [HEAD_REF_DELETED_EVENT, HEAD_REF_RESTORED_EVENT]\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\t\t__typename\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n'), pullRequests = {};
        for (const {name, associatedPullRequests} of repository.refs.nodes) {
          const [prInfo] = associatedPullRequests.nodes, headRefWasDeleted = "HeadRefDeletedEvent" === prInfo?.timelineItems.nodes[0]?.__typename;
          if (prInfo && !headRefWasDeleted) {
            prInfo.state = prInfo.isDraft && "OPEN" === prInfo.state ? "DRAFT" : prInfo.state;
            pullRequests[name] = prInfo;
          }
        }
        return pullRequests;
      },
      maxAge: {
        hours: 1
      },
      staleWhileRevalidate: {
        days: 4
      },
      cacheKey: cacheByRepo
    }), stateIcon = {
      OPEN: GitPullRequest,
      CLOSED: GitPullRequestClosed,
      MERGED: GitMerge,
      DRAFT: GitPullRequestDraft
    };
    async function show_associated_branch_prs_on_fork_addLink(branch) {
      const prInfo = (await pullRequestsAssociatedWithBranch.get())[branch.getAttribute("title")];
      if (!prInfo) return;
      const StateIcon = stateIcon[prInfo.state] ?? (() => null), stateClassName = prInfo.state.toLowerCase(), cell = branch.closest("tr.TableRow").children.item(4);
      cell.classList.add("rgh-pr-cell");
      cell.append(dom_chef.createElement("div", {
        className: "rgh-pr-box"
      }, dom_chef.createElement("a", {
        href: prInfo.url,
        target: "_blank",
        "data-hovercard-url": prInfo.url + "/hovercard",
        "aria-label": `Link to the ${prInfo.isDraft ? "draft " : ""}pull request #${prInfo.number}`,
        className: "rgh-pr-link",
        rel: "noreferrer"
      }, dom_chef.createElement(StateIcon, {
        width: 14,
        height: 14,
        className: stateClassName
      }), dom_chef.createElement(RepoForked, {
        width: 14,
        height: 14,
        className: `mr-1 ${stateClassName}`
      }), "#", prInfo.number)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/show-associated-branch-prs-on-fork.tsx", {
      asLongAs: [ isForkedRepo ],
      include: [ isBranches ],
      init: function(signal) {
        observe("react-app[app-name=repos-branches] a[class^=BranchName-] div[title]", memoize(show_associated_branch_prs_on_fork_addLink), {
          signal
        });
      }
    });
    const emojis = [ ..."🚀✅🐿️⚡️🤌🥳🥰🤩🥸😎🤯🚢🛫🏳️🏁" ];
    async function quickApprove(event) {
      const approval = event.altKey ? "" : prompt("Approve instantly? You can add a custom message or leave empty");
      if (null === approval) return;
      const call = v3(`pulls/${getConversationNumber()}/reviews`, {
        method: "POST",
        body: {
          event: "APPROVE",
          body: approval
        }
      });
      await showToast(call, {
        message: "Approving…",
        doneMessage: `${randomArrayItem(emojis)} Approved`
      });
    }
    async function addSidebarReviewButton(reviewersSection) {
      const reviewFormUrl = new URL(location.href);
      reviewFormUrl.pathname += "/files";
      reviewFormUrl.hash = "review-changes-modal";
      await node_modules_delay(300);
      const quickReview = dom_chef.createElement("span", {
        className: "text-normal color-fg-muted"
      }, "– ", dom_chef.createElement("a", {
        href: reviewFormUrl.href,
        className: "btn-link Link--muted",
        "data-hotkey": "v",
        "data-turbo-frame": "repo-content-turbo-frame"
      }, "review now"));
      reviewersSection.append(quickReview);
      if (github_helpers_getUsername() !== expectElement(".author").textContent && !isClosedPR() && await getToken()) quickReview.append(" – ", dom_chef.createElement("button", {
        type: "button",
        className: "btn-link Link--muted rgh-quick-approve tooltipped tooltipped-nw",
        "aria-label": "Hold alt to approve without confirmation"
      }, "approve now"));
    }
    function focusReviewTextarea(event) {
      if ("newState" in event && "open" === event.newState) expectElement("textarea", event.delegateTarget).focus();
    }
    async function openReviewPopup(button) {
      await node_modules_delay(100);
      button.popoverTargetElement.showPopover();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-review.tsx", {
      include: [ distribution_isPRConversation ],
      init: async function(signal) {
        observe('[aria-label="Select reviewers"] .discussion-sidebar-heading', addSidebarReviewButton, {
          signal
        });
        delegate_it_delegate(".rgh-quick-approve", "click", quickApprove, {
          signal
        });
      }
    }, {
      shortcuts: {
        v: "Open PR review popup"
      },
      include: [ isPRFiles ],
      init: async function(signal) {
        delegate_it_delegate("#review-changes-modal", "toggle", focusReviewTextarea, {
          capture: !0,
          signal
        });
        const reviewDropdownButton = await elementReady(".js-reviews-toggle");
        if (reviewDropdownButton) reviewDropdownButton.dataset.hotkey = "v";
      }
    }, {
      asLongAs: [ () => "#review-changes-modal" === location.hash, isPRFiles ],
      init: function(signal) {
        observe('[popovertarget="review-changes-modal"]', openReviewPopup, {
          signal
        });
      }
    });
    function jumpToFirstNonViewed() {
      const firstNonViewedFile = select_dom_$('[id][data-details-container-group="file"]:not([data-file-user-viewed])');
      if (firstNonViewedFile) location.replace("#" + firstNonViewedFile.id); else window.scrollTo(window.scrollX, document.body.scrollHeight);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pr-jump-to-first-non-viewed-file.tsx", {
      include: [ isPRFiles ],
      exclude: [ isPRFile404 ],
      init: async function(signal) {
        (await elementReady(".diffbar-item progress-bar")).style.cursor = "pointer";
        delegate_it_delegate(".diffbar-item progress-bar", "click", jumpToFirstNonViewed, {
          signal
        });
      }
    });
    const isCommentGroupMinimized = comment => elementExists(".minimized-comment:not(.d-none)", comment) || Boolean(comment.closest([ ".js-resolvable-thread-contents.d-none", "details.js-resolvable-timeline-thread-container:not([open])" ]));
    function runShortcuts(event) {
      if ("j" !== event.key && "k" !== event.key || isEditable(event.target)) return;
      event.preventDefault();
      const focusedComment = select_dom_$(":target"), items = $$([ '.js-targetable-element[id^="diff-"]', ".js-minimizable-comment-group" ]).filter((element => element.classList.contains("js-minimizable-comment-group") ? !isCommentGroupMinimized(element) : !0)), direction = "j" === event.key ? 1 : -1, currentIndex = items.indexOf(focusedComment), chosenCommentIndex = Math.min(Math.max(0, currentIndex + direction), items.length - 1);
      if (currentIndex !== chosenCommentIndex) location.replace("#" + items[chosenCommentIndex].id);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/keyboard-navigation.tsx", {
      shortcuts: {
        j: "Focus the comment/file below",
        k: "Focus the comment/file above"
      },
      include: [ hasComments ],
      init: function(signal) {
        document.body.addEventListener("keypress", runShortcuts, {
          signal
        });
      }
    });
    function transpose(table) {
      const rows = $$(":scope > tbody > tr", table), headers = $$(":scope > thead th", table);
      if (headers.length <= 4 || 1 !== rows.length || headers.length !== rows[0].childElementCount) return;
      const values = [ ...rows[0].children ];
      table.replaceWith(dom_chef.createElement("table", {
        className: "rgh-vertical-front-matter-table"
      }, dom_chef.createElement("tbody", null, headers.map(((cell, index) => dom_chef.createElement("tr", null, cell, values[index]))))));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/vertical-front-matter.tsx", {
      include: [ () => isSingleFile() && /\.(mdx?|mkdn?|mdwn|mdown|markdown|litcoffee)$/.test(location.pathname) ],
      init: function(signal) {
        observe(".markdown-body > table:first-child", transpose, {
          signal
        });
      }
    });
    function getFirstCommit() {
      const titleParts = expectElement(".js-commits-list-item:first-child p").childNodes, body = select_dom_$(".js-commits-list-item:first-child .Details-content--hidden pre")?.textContent.trim() ?? void 0;
      return {
        title: [ ...titleParts ].map((node => function(node) {
          switch (node instanceof Element && node.tagName) {
           case !1:
           case "A":
            return node.textContent;

           case "CODE":
            return "`" + node.textContent + "`";
          }
        }(node))).join("").trim(),
        body
      };
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pr-first-commit-title.tsx", {
      include: [ isCompare ],
      deduplicate: "has-rgh",
      init: async function() {
        const sessionResumeId = select_dom_$('meta[name="session-resume-id"]')?.content;
        if (sessionResumeId && sessionStorage.getItem(`session-resume:${sessionResumeId}`)) return !1;
        const requestedContent = new URL(location.href).searchParams, commitCountIcon = await elementReady("div.Box.mb-3 .octicon-git-commit"), commitCount = commitCountIcon?.nextElementSibling;
        if (!commitCount || looseParseInt(commitCount) < 2 || !elementExists("#new_pull_request")) return !1;
        const firstCommit = getFirstCommit();
        if (!requestedContent.has("pull_request[title]")) setFieldText(expectElement("#pull_request_title"), firstCommit.title);
        if (firstCommit.body && !requestedContent.has("pull_request[body]")) insertTextIntoField(expectElement("#pull_request_body"), firstCommit.body);
      }
    });
    function linkify_user_edit_history_popup_linkify(avatar) {
      const userName = avatar.alt.slice(1);
      wrap(avatar.nextElementSibling, dom_chef.createElement("a", {
        className: "Link--primary",
        href: `/${userName}`
      }));
      wrap(avatar, dom_chef.createElement("a", {
        href: `/${userName}`
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-user-edit-history-popup.tsx", {
      include: [ isConversation ],
      init: function(signal) {
        observe('details-dialog .Box-header .mr-3 > img:not([alt*="[bot]"])', linkify_user_edit_history_popup_linkify, {
          signal
        });
      }
    });
    const Code = props => createElement("svg", {
      className: "octicon octicon-code",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"
    })), Plus = props => createElement("svg", {
      className: "octicon octicon-plus",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"
    }));
    function addTooltipToSummary(childElement, tooltip) {
      wrap(childElement.closest("details"), dom_chef.createElement("div", {
        className: "tooltipped tooltipped-ne",
        "aria-label": tooltip
      }));
    }
    function cleanFilelistActions(searchButton) {
      searchButton.classList.add("tooltipped", "tooltipped-ne");
      searchButton.setAttribute("aria-label", "Go to file");
      searchButton.firstChild.replaceWith(dom_chef.createElement(Search, null));
      const addFileDropdown = searchButton.nextElementSibling.querySelector(".dropdown-caret");
      if (addFileDropdown) {
        addFileDropdown.parentElement.classList.replace("d-md-flex", "d-md-block");
        assertNodeContent(addFileDropdown.previousSibling, "Add file").replaceWith(dom_chef.createElement(Plus, null));
        addTooltipToSummary(addFileDropdown, "Add file");
      }
      if (!isRepoRoot()) return;
      const codeDropdownButton = select_dom_$("get-repo summary");
      addTooltipToSummary(codeDropdownButton, "Clone, open or download");
      const label = select_dom_$(".Button-label", codeDropdownButton);
      if (!elementExists(".octicon-code", codeDropdownButton)) label.before(dom_chef.createElement("span", {
        className: "Button-visual Button-leadingVisual"
      }, dom_chef.createElement(Code, null)));
      label.remove();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clean-repo-filelist-actions.tsx", {
      include: [ isRepoTree, isSingleFile ],
      exclude: [ isRepoFile404 ],
      init: function(signal) {
        observe('.btn[data-hotkey="t"]', cleanFilelistActions, {
          signal
        });
      }
    });
    let previousSubmission = 0;
    function preventSubmit(event) {
      if (Date.now() - previousSubmission < 1e3) event.preventDefault();
      previousSubmission = Date.now();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/prevent-duplicate-pr-submission.tsx", {
      include: [ isCompare ],
      init: function(signal) {
        delegate_it_delegate("#new_pull_request", "submit", preventSubmit, {
          signal
        });
      }
    });
    const canNotEditLabels = node_modules_onetime((() => !elementExists(".label-select-menu .octicon-gear")));
    async function removeLabelButtonClickHandler(event) {
      event.preventDefault();
      const removeLabelButton = event.delegateTarget, label = removeLabelButton.closest("a");
      label.hidden = !0;
      try {
        await v3(`issues/${getConversationNumber()}/labels/${removeLabelButton.dataset.name}`, {
          method: "DELETE"
        });
      } catch (error) {
        assertError(error);
        showToast(error);
        removeLabelButton.blur();
        label.hidden = !1;
        return;
      }
      label.remove();
    }
    function addRemoveLabelButton(label) {
      label.classList.add("d-inline-flex");
      label.append(dom_chef.createElement("button", {
        type: "button",
        "aria-label": "Remove this label",
        className: "btn-link tooltipped tooltipped-nw rgh-quick-label-removal",
        "data-name": label.dataset.name
      }, dom_chef.createElement(X, null)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-label-removal.tsx", {
      include: [ isConversation ],
      exclude: [ canNotEditLabels, isArchivedRepo ],
      awaitDomReady: !0,
      init: async function(signal) {
        await expectToken();
        delegate_it_delegate(".rgh-quick-label-removal:not([disabled])", "click", removeLabelButtonClickHandler, {
          signal
        });
        observe(".js-issue-labels .IssueLabel", addRemoveLabelButton, {
          signal
        });
      }
    });
    const ArrowLeft = props => createElement("svg", {
      className: "octicon octicon-arrow-left",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"
    }));
    async function cleanIssueHeader(byline) {
      byline.classList.add("rgh-clean-conversation-headers", "rgh-clean-conversation-headers-hide-author");
      const commentCount = select_dom_$("relative-time", byline).nextSibling;
      commentCount.replaceWith(dom_chef.createElement("span", null, commentCount.textContent.replace("·", "")));
    }
    async function cleanPrHeader(byline) {
      byline.classList.add("rgh-clean-conversation-headers");
      if (distribution_isPRConversation() && select_dom_$(".author", byline).textContent === (await elementReady(".TimelineItem .author")).textContent) byline.classList.add("rgh-clean-conversation-headers-hide-author");
      const base = select_dom_$(".commit-ref", byline), baseBranchDropdown = select_dom_$(".commit-ref-dropdown", byline), arrowIcon = dom_chef.createElement(ArrowLeft, {
        className: "v-align-middle mx-1"
      });
      if (baseBranchDropdown) baseBranchDropdown.after(dom_chef.createElement("span", null, arrowIcon)); else base.nextElementSibling.replaceChildren(arrowIcon);
      const baseBranch = base.title.split(":")[1], wasDefaultBranch = isClosedPR() && "master" === baseBranch;
      if (!(baseBranch === await getDefaultBranch()) && !wasDefaultBranch) base.classList.add("rgh-clean-conversation-headers-non-default-branch");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clean-conversation-headers.tsx", {
      include: [ isIssue, isPR ],
      init: async function(signal) {
        observe(".gh-header-meta .flex-auto", isIssue() ? cleanIssueHeader : cleanPrHeader, {
          signal
        });
      }
    });
    function new_or_deleted_file_add(filename) {
      const list = select_dom_$('ul[aria-label="File Tree"]');
      if (!list && isCommit()) return;
      const fileInList = select_dom_$(`[href="${filename.hash}"]`, list);
      if (!fileInList) {
        feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/new-or-deleted-file.tsx", "Could not find file in sidebar, is the sidebar loaded?");
        feature_manager.unload("file:///home/runner/work/refined-github/refined-github/source/features/new-or-deleted-file.tsx");
        return;
      }
      const icon = select_dom_$(".octicon-diff-removed, .octicon-diff-added", fileInList)?.cloneNode(!0);
      if (icon) filename.parentElement.append(dom_chef.createElement("span", {
        className: "ml-1"
      }, icon));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/new-or-deleted-file.tsx", {
      include: [ isPRFiles, isCommit ],
      init: async function(signal) {
        observe(".file-info a.Link--primary", new_or_deleted_file_add, {
          signal
        });
      }
    });
    const getReleaseEditLinkSelector = () => `a[href^="/${github_helpers_getRepo().nameWithOwner}/releases/edit"]`;
    const confirmMessage = "The release will be effectively deleted and a new draft will be created.", confirmMessageWithReactions = "Existing user reactions will be lost.", confirmMessageQuestion = "Continue?";
    async function onConvertClick() {
      const message = elementExists(".js-reaction-group-button") ? [ confirmMessage, confirmMessageWithReactions, confirmMessageQuestion ] : [ confirmMessage, confirmMessageQuestion ];
      if (confirm(message.join(" "))) try {
        await showToast(async function() {
          const tagName = location.pathname.split("/").pop(), release = await v3(`releases/tags/${tagName}`);
          await v3(release.url, {
            method: "PATCH",
            body: {
              draft: !0
            }
          });
          select_dom_$(getReleaseEditLinkSelector()).click();
        }(), {
          message: "Converting…",
          doneMessage: "Redirecting…"
        });
      } catch (error) {
        feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/convert-release-to-draft.tsx", error);
      }
    }
    function attachButton(editButton) {
      if (!elementExists('[title="Draft"]')) editButton.before(dom_chef.createElement("button", {
        type: "button",
        className: "btn btn-sm ml-3 mr-1 rgh-convert-draft"
      }, "Convert to draft"));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/convert-release-to-draft.tsx", {
      include: [ isSingleReleaseOrTag ],
      init: async function(signal) {
        await expectToken();
        observe(getReleaseEditLinkSelector(), attachButton, {
          signal
        });
        delegate_it_delegate(".rgh-convert-draft", "click", onConvertClick, {
          signal
        });
      }
    });
    const new_repo_disable_projects_and_wikis_documentation = "https://github.com/refined-github/refined-github/wiki/Extended-feature-descriptions#new-repo-disable-projects-and-wikis";
    function setStorage() {
      if (select_dom_$("input#rgh-disable-project").checked) sessionStorage.rghNewRepo = !0;
    }
    function new_repo_disable_projects_and_wikis_add(submitButtonLine) {
      submitButtonLine.before(dom_chef.createElement("div", {
        className: "flash flash-warn py-0 ml-n3"
      }, dom_chef.createElement("div", {
        className: "form-checkbox checked"
      }, dom_chef.createElement("label", null, dom_chef.createElement("input", {
        checked: !0,
        type: "checkbox",
        id: "rgh-disable-project"
      }), " Disable Projects and Wikis"), dom_chef.createElement("span", {
        className: "note mb-2"
      }, "After creating the repository disable the projects and wiki. ", dom_chef.createElement("a", {
        href: new_repo_disable_projects_and_wikis_documentation,
        target: "_blank",
        rel: "noreferrer"
      }, "Suggestion by Refined GitHub.")))));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/new-repo-disable-projects-and-wikis.tsx", {
      include: [ (url = location) => "/new" === url.pathname || /^organizations\/[^/]+\/repositories\/new$/.test(getCleanPathname(url)), isNewRepoTemplate ],
      init: async function(signal) {
        await expectToken();
        observe("form :has(> [type=submit])", new_repo_disable_projects_and_wikis_add, {
          signal
        });
        delegate_it_delegate("#new_repository, #new_new_repository", "submit", setStorage, {
          signal
        });
      }
    }, {
      include: [ () => Boolean(sessionStorage.rghNewRepo) ],
      init: node_modules_onetime((async function() {
        delete sessionStorage.rghNewRepo;
        await v3("", {
          method: "PATCH",
          body: {
            has_projects: !1,
            has_wiki: !1
          }
        });
        await dom_loaded;
        select_dom_$('[data-menu-item$="wiki-tab"]')?.remove();
        select_dom_$('[data-menu-item$="projects-tab"]')?.remove();
        select_dom_$('li:has([data-content="Wiki"]')?.remove();
        select_dom_$('li:has([data-content="Projects"])')?.remove();
      }))
    });
    const Table = props => createElement("svg", {
      className: "octicon octicon-table",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"
    }));
    function addTable({delegateTarget: square}) {
      const field = square.form.querySelector("textarea.js-comment-field"), cursorPosition = field.selectionStart, columns = Number(square.dataset.x), rows = Number(square.dataset.y), row = 1 === columns ? "<tr><td>\n" : "<tr>\n" + " <td>\n".repeat(columns);
      field.focus();
      insertTextIntoField(field, smartBlockWrap("<table>\n" + row.repeat(rows) + "</table>", field));
      field.selectionEnd = field.value.indexOf("<td>", cursorPosition) + 4;
    }
    function table_input_append(container) {
      container.append(dom_chef.createElement("details", {
        className: [ "details-reset", "details-overlay", "flex-auto", "select-menu", "select-menu-modal-right", "hx_rsm", "ActionBar-item" ].join(" "),
        "data-targets": "action-bar.items"
      }, dom_chef.createElement("summary", {
        className: [ "Button", "Button--iconOnly", "Button--invisible", "Button--medium" ].join(" "),
        role: "button",
        "aria-label": "Add a table",
        "aria-haspopup": "menu"
      }, dom_chef.createElement("div", {
        className: "tooltipped tooltipped-sw",
        "aria-label": "Add a table"
      }, dom_chef.createElement(Table, null))), dom_chef.createElement("details-menu", {
        className: "select-menu-modal position-absolute left-0 hx_rsm-modal rgh-table-input",
        role: "menu"
      }, Array.from({
        length: 25
      }).map(((_, index) => dom_chef.createElement("button", {
        type: "button",
        role: "menuitem",
        className: "rgh-tic btn-link",
        "data-x": index % 5 + 1,
        "data-y": Math.floor(index / 5) + 1
      }, dom_chef.createElement("div", null)))))));
      triggerActionBarOverflow(container);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/table-input.tsx", {
      include: [ hasRichTextEditor ],
      init: function(signal) {
        observe('[data-target="action-bar.itemContainer"]', table_input_append, {
          signal
        });
        delegate_it_delegate(".rgh-tic", "click", addTable, {
          signal
        });
      }
    });
    const Link = props => createElement("svg", {
      className: "octicon octicon-link",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"
    }));
    function getLinkToGitHubIo(repoTitle, className) {
      return dom_chef.createElement("a", {
        href: `https://${repoTitle.textContent.trim().replace(/com$/, "io")}`,
        className
      }, dom_chef.createElement(Link, {
        className: "v-align-middle"
      }));
    }
    function addRepoListLink(repoTitle) {
      repoTitle.after(" ", getLinkToGitHubIo(repoTitle));
    }
    function addOrgRepoListLink(repoTitle) {
      repoTitle.after(getLinkToGitHubIo(repoTitle, "ml-1"));
    }
    function addRepoHeaderLink(repoTitle) {
      repoTitle.after(getLinkToGitHubIo(repoTitle, "mr-2"));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/link-to-github-io.tsx", {
      asLongAs: [ () => /\.github\.(io|com)$/.test(github_helpers_getRepo()?.name ?? "shush eslint") ],
      include: [ isRepoHome ],
      exclude: [ isEnterprise ],
      init: function(signal) {
        observe('[itemprop="name"]', addRepoHeaderLink, {
          signal
        });
      }
    }, {
      include: [ isProfileRepoList, isOrganizationProfile ],
      exclude: [ isEnterprise ],
      init: function(signal) {
        observe([ 'a[itemprop="name codeRepository"][href$=".github.com"]', 'a[itemprop="name codeRepository"][href$=".github.io"]' ], addRepoListLink, {
          signal
        });
        observe([ 'a[data-testid="listitem-title-link"][href$=".github.com"]', 'a[data-testid="listitem-title-link"][href$=".github.io"]' ], addOrgRepoListLink, {
          signal
        });
      }
    });
    const Play = props => createElement("svg", {
      className: "octicon octicon-play",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215Z"
    }));
    var index_min = __webpack_require__(528);
    function addTooltip(element, tooltip) {
      const existingTooltip = element.getAttribute("aria-label");
      if (existingTooltip) element.setAttribute("aria-label", existingTooltip + ".\n" + tooltip); else {
        element.classList.add("tooltipped", "tooltipped-s");
        element.setAttribute("aria-label", tooltip);
      }
    }
    async function getWorkflows() {
      return (await v3("actions/workflows")).workflows.map((workflow => ({
        name: workflow.path.split("/").pop(),
        isEnabled: "active" === workflow.state
      })));
    }
    async function getFilesInWorkflowPath() {
      const {repository: {workflowFiles}} = await v4('query GetWorkflows($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tworkflowFiles: object(expression: "HEAD:.github/workflows") {\n\t\t\t... on Tree {\n\t\t\t\tentries {\n\t\t\t\t\tname\n\t\t\t\t\tobject {\n\t\t\t\t\t\t... on Blob {\n\t\t\t\t\t\t\ttext\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n'), workflows = workflowFiles?.entries ?? [], result = {};
      for (const workflow of workflows) result[workflow.name] = workflow.object.text;
      return result;
    }
    const workflowDetails = new CachedFunction("workflows-details", {
      async updater() {
        const [workflows, workflowFiles] = await Promise.all([ getWorkflows(), getFilesInWorkflowPath() ]), details = {};
        for (const workflow of workflows) {
          const workflowYaml = workflowFiles[workflow.name];
          if (void 0 === workflowYaml) continue;
          const cron = /schedule[:\s-]+cron[:\s'"]+([^'"\n]+)/m.exec(workflowYaml);
          details[workflow.name] = {
            ...workflow,
            schedule: cron?.[1],
            manuallyDispatchable: workflowYaml.includes("workflow_dispatch:")
          };
        }
        return details;
      },
      maxAge: {
        days: 1
      },
      staleWhileRevalidate: {
        days: 10
      },
      cacheKey: cacheByRepo
    });
    async function addIndicators(workflowListItem) {
      if (elementExists(".octicon-stop", workflowListItem)) return;
      const workflow = (await workflowDetails.get())[workflowListItem.href.split("/").pop()];
      if (!workflow) return;
      const svgTrailer = dom_chef.createElement("div", {
        className: "ActionListItem-visual--trailing m-auto d-flex gap-2"
      });
      workflowListItem.append(svgTrailer);
      if (!workflow.isEnabled) {
        svgTrailer.append(dom_chef.createElement(Stop, {
          className: "m-auto"
        }));
        addTooltip(workflowListItem, "This workflow is not enabled");
      }
      if (workflow.manuallyDispatchable) {
        svgTrailer.append(dom_chef.createElement(Play, {
          className: "m-auto"
        }));
        addTooltip(workflowListItem, "This workflow can be triggered manually");
      }
      if (!workflow.schedule) return;
      const nextTime = index_min.E.nextDate(workflow.schedule);
      if (!nextTime) return;
      const relativeTime = dom_chef.createElement("relative-time", {
        datetime: String(nextTime)
      });
      select_dom_$(".ActionList-item-label", workflowListItem).append(dom_chef.createElement("em", null, "(", relativeTime, ")"));
      setTimeout((() => {
        addTooltip(workflowListItem, `Next run: ${relativeTime.shadowRoot.textContent}`);
      }), 500);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/github-actions-indicators.tsx", {
      asLongAs: [ isRepositoryActions, async () => Boolean(await workflowDetails.get()) ],
      init: async function(signal) {
        observe("a.ActionListContent", addIndicators, {
          signal
        });
      }
    });
    function LoadingIcon() {
      return dom_chef.createElement("img", {
        className: "rgh-loading-icon",
        src: "https://github.githubassets.com/images/spinners/octocat-spinner-128.gif",
        width: "18"
      });
    }
    function closeModal({delegateTarget: button}) {
      button.append(" ", dom_chef.createElement(LoadingIcon, {
        className: "v-align-middle"
      }));
      button.disabled = !0;
    }
    function addConvertToDraftButton(alternativeActions) {
      const existingButton = select_dom_$('[data-url$="/convert_to_draft"]');
      if (!existingButton || elementExists('[action$="/ready_for_review"]')) return;
      const convertToDraft = existingButton.closest("details").cloneNode(!0);
      select_dom_$(".Link--muted", convertToDraft).classList.remove("Link--muted");
      alternativeActions.prepend(convertToDraft);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/convert-pr-to-draft-improvements.tsx", {
      include: [ distribution_isPRConversation ],
      init: function(signal) {
        delegate_it_delegate(".js-convert-to-draft", "click", closeModal, {
          signal
        });
        observe(".alt-merge-options", addConvertToDraftButton, {
          signal
        });
      }
    });
    let documentTitle, submitting;
    function disableOnSubmit() {
      clearTimeout(submitting);
      submitting = window.setTimeout((() => {
        submitting = void 0;
      }), 2e3);
    }
    function updateDocumentTitle() {
      if (!submitting) if ("hidden" === document.visibilityState && $$('textarea:not([id^="convert-to-issue-body"])').some((textarea => textarea.value !== textarea.textContent))) {
        documentTitle = document.title;
        document.title = "✏️ Comment - " + document.title;
      } else if (documentTitle) {
        document.title = documentTitle;
        documentTitle = void 0;
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/unfinished-comments.tsx", {
      include: [ hasRichTextEditor ],
      init: function(signal) {
        delegate_it_delegate("form", "submit", disableOnSubmit, {
          capture: !0,
          signal
        });
        document.addEventListener("visibilitychange", updateDocumentTitle, {
          signal
        });
      }
    });
    function jump_to_change_requested_comment_linkify(textLine) {
      const url = select_dom_$('a.dropdown-item[href^="#pullrequestreview-"]', textLine.parentElement);
      wrap(textLine.lastChild, dom_chef.createElement("a", {
        href: url.hash
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/jump-to-change-requested-comment.tsx", {
      include: [ distribution_isPRConversation ],
      init: function(signal) {
        observe('.merge-status-item.review-item [title*="requested changes"]', jump_to_change_requested_comment_linkify, {
          signal
        });
      }
    });
    function handleEscPress(event) {
      if ("Escape" === event.key) {
        select_dom_$(".js-cancel-issue-edit").click();
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/esc-to-cancel.tsx", {
      shortcuts: {
        esc: "Cancel editing a conversation title"
      },
      include: [ isIssue, isPR ],
      init: function(signal) {
        onConversationTitleFieldKeydown(handleEscPress, signal);
      }
    });
    function toggleFile(event) {
      const elementClicked = event.target, headerBar = event.delegateTarget;
      if (elementClicked === headerBar || elementClicked.parentElement === headerBar) select_dom_$('[aria-label="Toggle diff contents"]', headerBar).dispatchEvent(new MouseEvent("click", {
        bubbles: !0,
        altKey: event.altKey
      }));
    }
    function toggleCodeSearchFile(event) {
      const elementClicked = event.target, headerBar = event.delegateTarget, toggle = select_dom_$(":scope > button", headerBar);
      if (elementClicked === headerBar || elementClicked.parentElement === headerBar && elementClicked !== toggle) toggle.dispatchEvent(new MouseEvent("click", {
        bubbles: !0,
        altKey: event.altKey
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/easy-toggle-files.tsx", {
      include: [ hasFiles, (url = location) => /^[^/]+\/[\da-f]{20,32}\/revisions$/.test(getCleanGistPathname(url)) ],
      init: function(signal) {
        delegate_it_delegate(".file-header", "click", toggleFile, {
          signal
        });
      }
    }, {
      include: [ isGlobalSearchResults ],
      init: function(signal) {
        delegate_it_delegate(codeSearchHeader, "click", toggleCodeSearchFile, {
          signal
        });
      }
    });
    const Trash = props => createElement("svg", {
      className: "octicon octicon-trash",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"
    }));
    var quick_repo_deletion_browser = __webpack_require__(131);
    function handleToggle(event) {
      if (!elementExists([ '[data-hotkey="g i"] .Counter:not([hidden])', '[data-hotkey="g p"] .Counter:not([hidden])', ".rgh-open-prs-of-forks" ]) || confirm("This repo has open issues/PRs, are you sure you want to delete everything?")) if (isForkedRepo() || confirm("⚠️ This action cannot be undone. This will permanently delete the repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations.")) setTimeout(start, 1, event.delegateTarget); else event.delegateTarget.open = !1; else event.delegateTarget.open = !1;
    }
    async function buttonTimeout(buttonContainer) {
      const abortController = new AbortController;
      document.addEventListener("click", (event => {
        event.preventDefault();
        abortController.abort();
        buttonContainer.open = !1;
      }), {
        once: !0
      });
      !async function(abortController) {
        try {
          await expectTokenScope("delete_repo");
        } catch (error) {
          assertError(error);
          abortController.abort();
          await addNotice([ "Could not delete the repository. ", parseBackticks(error.message) ], {
            type: "error",
            action: dom_chef.createElement("a", {
              className: "btn btn-sm primary flash-action",
              href: "https://github.com/settings/tokens"
            }, "Update token…")
          });
        }
      }(abortController);
      let secondsLeft = 5;
      const button = select_dom_$(".btn", buttonContainer);
      try {
        do {
          button.style.transform = `scale(${1.2 - (secondsLeft - 5) / 3})`;
          button.textContent = `Deleting repo in ${pluralize(secondsLeft, "$$ second")}. Cancel?`;
          await node_modules_delay(1e3, {
            signal: abortController.signal
          });
        } while (--secondsLeft);
      } catch {
        button.textContent = "Delete fork";
        button.style.transform = "";
      }
      return !abortController.signal.aborted;
    }
    async function start(buttonContainer) {
      if (!await buttonTimeout(buttonContainer)) return;
      select_dom_$(".btn", buttonContainer).textContent = "Deleting repo…";
      const {nameWithOwner, owner} = github_helpers_getRepo();
      try {
        await v3("/repos/" + nameWithOwner, {
          method: "DELETE",
          json: !1
        });
      } catch (error) {
        assertError(error);
        buttonContainer.closest("li").remove();
        await addNotice([ "Could not delete the repository. ", error.response?.message ?? error.message ], {
          type: "error"
        });
        throw error;
      }
      const forkSource = "/" + getForkedRepo(), restoreURL = isOrganizationRepo() ? `/organizations/${owner}/settings/deleted_repositories` : "/settings/deleted_repositories", otherForksURL = `/${owner}?tab=repositories&type=fork`;
      await addNotice(dom_chef.createElement(dom_chef.Fragment, null, dom_chef.createElement(Trash, null), " ", dom_chef.createElement("span", null, "Repository ", dom_chef.createElement("strong", null, nameWithOwner), " deleted. ", dom_chef.createElement("a", {
        href: restoreURL
      }, "Restore it"), ", ", dom_chef.createElement("a", {
        href: forkSource
      }, "visit the source repo"), ", or see ", dom_chef.createElement("a", {
        href: otherForksURL
      }, "your other forks."))), {
        action: !1
      });
      select_dom_$(".application-main").remove();
      if (document.hidden) quick_repo_deletion_browser.runtime.sendMessage({
        closeTab: !0
      });
    }
    function quick_repo_deletion_addButton(header) {
      header.prepend(dom_chef.createElement("li", null, dom_chef.createElement("details", {
        className: "details-reset details-overlay select-menu rgh-quick-repo-deletion"
      }, dom_chef.createElement("summary", {
        "aria-haspopup": "menu",
        role: "button"
      }, dom_chef.createElement("span", {
        className: "btn btn-sm btn-danger"
      }, "Delete fork")))));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-repo-deletion.tsx", {
      asLongAs: [ isRepoRoot, isForkedRepo, async function() {
        return Boolean(await elementReady('nav [data-content="Settings"]'));
      }, async function() {
        return 0 === looseParseInt(await elementReady(".starring-container .Counter"));
      } ],
      init: async function(signal) {
        await expectToken();
        observe(".pagehead-actions", quick_repo_deletion_addButton, {
          signal
        });
        delegate_it_delegate(".rgh-quick-repo-deletion[open]", "toggle", handleToggle, {
          capture: !0,
          signal
        });
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clean-repo-sidebar.tsx", {
      include: [ isRepoRoot ],
      deduplicate: "has-rgh-inner",
      init: [ async function() {
        document.documentElement.setAttribute("rgh-clean-repo-sidebar", "");
      }, async function() {
        const sidebarReleases = await elementReady('.Layout-sidebar .BorderGrid-cell h2 a[href$="/releases"]', {
          waitForChildren: !1
        });
        if (!sidebarReleases) return;
        const releasesSection = sidebarReleases.closest(".BorderGrid-cell");
        if (elementExists(".octicon-tag", releasesSection)) {
          releasesSection.classList.add("border-0", "pt-md-0");
          sidebarReleases.closest(".BorderGrid-row").previousElementSibling.firstElementChild.classList.add("border-0", "pb-0");
        } else releasesSection.hidden = !0;
      }, async function() {
        const packagesCounter = await elementReady('.Layout-sidebar .BorderGrid-cell a[href*="/packages?"] .Counter', {
          waitForChildren: !1
        });
        if (packagesCounter && "0" === packagesCounter.textContent) packagesCounter.closest(".BorderGrid-row").hidden = !0;
      }, async function() {
        await dom_loaded;
        const lastSidebarHeader = select_dom_$(".Layout-sidebar .BorderGrid-row:last-of-type h2");
        if ("Languages" === lastSidebarHeader?.textContent) lastSidebarHeader.hidden = !0;
      }, async function() {
        await dom_loaded;
        if (!canUserEditRepo()) select_dom_$(".Layout-sidebar .BorderGrid-cell > .text-italic")?.remove();
      }, async function() {
        await dom_loaded;
        const reportLink = select_dom_$('.Layout-sidebar a[href^="/contact/report-content"]')?.parentElement;
        if (reportLink) select_dom_$(".Layout-sidebar .BorderGrid-row:last-of-type .BorderGrid-cell").append(reportLink);
      } ]
    });
    const Copy = props => createElement("svg", {
      className: "octicon octicon-copy",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"
    }), createElement("path", {
      d: "M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"
    }));
    function createRghIssueLink(issueNumber) {
      const issueUrl = function(issueNumber) {
        return `https://github.com/refined-github/refined-github/issues/${issueNumber}`;
      }(issueNumber);
      return dom_chef.createElement("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        "data-hovercard-type": "issue",
        "data-hovercard-url": issueUrl + "/hovercard",
        href: issueUrl
      }, "#", issueNumber);
    }
    var open_options_browser = __webpack_require__(131);
    function openOptions(event) {
      event.preventDefault();
      open_options_browser.runtime.sendMessage({
        openOptionsPage: !0
      });
    }
    async function addDisabledBanner(infoBanner, id) {
      const reason = await async function(id) {
        const classes = [ "mb-3" ], hotfixed = (await brokenFeatures.get() ?? []).find((([feature]) => feature === id));
        if (hotfixed) {
          const [_name, issue, unaffectedVersion] = hotfixed;
          if (unaffectedVersion) return createBanner({
            text: dom_chef.createElement(dom_chef.Fragment, null, "This feature was disabled until version ", unaffectedVersion, " due to ", createRghIssueLink(issue), "."),
            classes,
            icon: dom_chef.createElement(Info, {
              className: "mr-0"
            })
          }); else return createBanner({
            text: dom_chef.createElement(dom_chef.Fragment, null, "This feature is disabled due to ", createRghIssueLink(issue), "."),
            classes: [ ...classes, "flash-warn" ],
            icon: dom_chef.createElement(Alert, {
              className: "mr-0"
            })
          });
        }
        if (isFeatureDisabled(await options_storage.getAll(), id)) return createBanner({
          text: dom_chef.createElement(dom_chef.Fragment, null, "This feature is disabled on GitHub.com ", dom_chef.createElement("button", {
            className: "btn-link",
            type: "button",
            onClick: openOptions
          }, "in your options"), "."),
          classes: [ ...classes, "flash-warn" ],
          icon: dom_chef.createElement(Alert, {
            className: "mr-0"
          })
        });
      }(id);
      if (reason) infoBanner.before(reason);
    }
    async function rgh_feature_descriptions_add(infoBanner) {
      const [, filename] = /source\/features\/([^.]+)/.exec(location.pathname) ?? [], currentFeatureName = getNewFeatureName(filename), meta = featuresMeta.find((feature => feature.id === currentFeatureName)), id = meta?.id ?? filename;
      !function(infoBanner, id, meta) {
        const isCss = location.pathname.endsWith(".css"), description = meta?.description ?? (isFeaturePrivate(id) ? 'This feature applies only to "Refined GitHub" repositories and cannot be disabled.' : isCss ? "This feature is CSS-only and cannot be disabled." : void 0), conversationsUrl = new URL("https://github.com/refined-github/refined-github/issues");
        conversationsUrl.searchParams.set("q", `sort:updated-desc is:open "${id}"`);
        const newIssueUrl = new URL("https://github.com/refined-github/refined-github/issues/new");
        newIssueUrl.searchParams.set("template", "1_bug_report.yml");
        newIssueUrl.searchParams.set("title", `\`${id}\`: `);
        newIssueUrl.searchParams.set("labels", "bug, help wanted");
        infoBanner.before(dom_chef.createElement("div", {
          className: "Box mb-3 d-inline-block width-full"
        }, dom_chef.createElement("div", {
          className: "Box-row d-flex gap-3 flex-wrap"
        }, dom_chef.createElement("div", {
          className: "rgh-feature-description d-flex flex-column gap-2"
        }, dom_chef.createElement("h3", null, dom_chef.createElement("code", null, id), dom_chef.createElement("clipboard-copy", {
          "aria-label": "Copy",
          "data-copy-feedback": "Copied!",
          value: id,
          class: "Link--onHover color-fg-muted d-inline-block ml-2",
          tabindex: "0",
          role: "button"
        }, dom_chef.createElement(Copy, {
          className: "v-align-baseline"
        }))), description && dom_chef.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: description
          },
          className: "h3"
        }), dom_chef.createElement("div", {
          className: "no-wrap"
        }, dom_chef.createElement("a", {
          href: conversationsUrl.href,
          "data-turbo-frame": "repo-content-turbo-frame"
        }, "Related issues"), " • ", dom_chef.createElement("a", {
          href: newIssueUrl.href,
          "data-turbo-frame": "repo-content-turbo-frame"
        }, "Report bug"), meta && isCss ? dom_chef.createElement(dom_chef.Fragment, null, " • ", dom_chef.createElement("a", {
          "data-turbo-frame": "repo-content-turbo-frame",
          href: location.pathname.replace(".css", ".tsx")
        }, "See .tsx file")) : void 0)), meta?.screenshot && dom_chef.createElement("a", {
          href: meta.screenshot,
          className: "flex-self-center"
        }, dom_chef.createElement("img", {
          src: meta.screenshot,
          className: "d-block border",
          style: {
            maxHeight: 100,
            maxWidth: 150
          }
        })))));
      }(infoBanner, id, meta);
      await addDisabledBanner(infoBanner, id);
    }
    const featureUrlRegex = /^([/]refined-github){2}[/]blob[/][^/]+[/]source[/]features[/][^.]+[.](tsx|css)$/;
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-feature-descriptions.tsx", {
      include: [ () => featureUrlRegex.test(location.pathname) ],
      init: function(signal) {
        observe("#repos-sticky-header", rgh_feature_descriptions_add, {
          signal
        });
      }
    });
    function addLinkToBanner(banner) {
      if (banner.lastChild.textContent.includes("repository has been archived")) banner.lastChild.after(" You can check out ", dom_chef.createElement("a", {
        href: buildRepoURL("forks")
      }, "its forks"), ".");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/archive-forks-link.tsx", {
      include: [ isRepo ],
      init: function(signal) {
        observe("#js-repo-pjax-container > .flash-warn:first-of-type", addLinkToBanner, {
          signal
        });
      }
    });
    const changelogFiles = /^(changelog|news|changes|history|release|whatsnew)(\.(mdx?|mkdn?|mdwn|mdown|markdown|litcoffee|txt|rst))?$/i;
    const changelogName = new CachedFunction("changelog", {
      async updater(nameWithOwner) {
        const [owner, name] = nameWithOwner.split("/"), {repository} = await v4('query GetFilesOnRoot($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tobject(expression: "HEAD:") {\n\t\t\t... on Tree {\n\t\t\t\tentries {\n\t\t\t\t\tname\n\t\t\t\t\ttype\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n', {
          variables: {
            name,
            owner
          }
        }), files = [];
        for (const entry of repository.object.entries) if ("blob" === entry.type) files.push(entry.name);
        return function(files) {
          return files.find((name => changelogFiles.test(name))) ?? !1;
        }(files);
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/link-to-changelog-file.tsx", {
      include: [ isReleasesOrTags ],
      exclude: [ isSingleReleaseOrTag ],
      deduplicate: "has-rgh-inner",
      init: async function() {
        const changelog = await changelogName.get(github_helpers_getRepo().nameWithOwner);
        if (!changelog) return !1;
        const changelogButton = dom_chef.createElement("a", {
          className: "tooltipped tooltipped-n btn mx-3" + (isEnterprise() ? "" : " flex-self-start"),
          "aria-label": `View the ${changelog} file`,
          href: buildRepoURL("blob", "HEAD", changelog),
          style: isEnterprise() ? {
            padding: "6px 16px"
          } : {},
          role: "button"
        }, dom_chef.createElement(Book, {
          className: "color-fg-accent mr-2"
        }), dom_chef.createElement("span", null, "Changelog")), releasesOrTagsNavbarSelector = [ 'nav[aria-label^="Releases and Tags"]', ".subnav-links" ].join(","), navbar = await elementReady(releasesOrTagsNavbarSelector, {
          waitForChildren: !1
        });
        navbar.classList.remove("flex-1");
        navbar.classList.add("d-flex");
        wrapAll(dom_chef.createElement("div", {
          className: "d-flex flex-justify-start flex-1"
        }), navbar, changelogButton);
      }
    });
    function linkifyFeature(possibleFeature) {
      const id = getNewFeatureName(possibleFeature.textContent);
      if (!id) return;
      const href = featureLink(id), possibleLink = possibleFeature.firstElementChild ?? possibleFeature;
      if (possibleLink instanceof HTMLAnchorElement) {
        possibleLink.href = href;
        possibleLink.classList.add("color-fg-accent");
      } else if (!possibleFeature.closest("a")) wrap(possibleFeature, dom_chef.createElement("a", {
        className: "color-fg-accent",
        "data-turbo-frame": "repo-content-turbo-frame",
        href
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-linkify-features.tsx", {
      asLongAs: [ isAnyRefinedGitHubRepo ],
      include: [ hasComments, isReleasesOrTags, isSingleReleaseOrTag, isCommitList, isSingleCommit, isRepoWiki, isPR, isIssue ],
      init: function(signal) {
        observe([ ".js-issue-title code", ".js-comment-body code", ".markdown-body code", ".markdown-title:not(li) code", "code .markdown-title" ], linkifyFeature, {
          signal
        });
      }
    });
    const Eye = props => createElement("svg", {
      className: "octicon octicon-eye",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"
    })), expectedDropdownWidth = 270, states = {
      default: "",
      hideEvents: "Hide events",
      hideEventsAndCollapsedComments: "Hide events and collapsed comments"
    }, dropdownClass = "rgh-conversation-activity-filter-dropdown", hiddenClassName = "rgh-conversation-activity-filtered", collapsedClassName = "rgh-conversation-activity-collapsed";
    function processItem(item) {
      if (!location.hash.startsWith("#issuecomment-") || !elementExists(location.hash, item)) if (elementExists(".js-comment[id^=pullrequestreview]", item)) !function(review) {
        const hasMainComment = elementExists(".js-comment[id^=pullrequestreview] .timeline-comment", review), unresolvedThreads = $$('.js-resolvable-timeline-thread-container[data-resolved="false"]', review), unresolvedThreadComments = $$(".timeline-comment-group:not(.minimized-comment)", review);
        if (hasMainComment || 0 !== unresolvedThreads.length && 0 !== unresolvedThreadComments.length) {
          for (const thread of unresolvedThreads) if (!unresolvedThreadComments.some((comment => thread.contains(comment)))) thread.classList.add(collapsedClassName);
        } else review.classList.add(collapsedClassName);
      }(item); else if (elementExists(".TimelineItem-badge .octicon-x", item)) !function(item) {
        item.classList.add(hiddenClassName);
        for (const {hash: staleReviewId} of $$('.TimelineItem-body > a[href^="#pullrequestreview-"]', item)) select_dom_$(staleReviewId).closest(".js-timeline-item").classList.add(collapsedClassName);
      }(item); else if (elementExists(".comment-body", item)) !function(item) {
        if (elementExists(".minimized-comment > details", item)) item.classList.add(collapsedClassName);
      }(item); else !function(item) {
        if (!isPR() || !elementExists(".TimelineItem-badge .octicon-git-commit", item)) item.classList.add(hiddenClassName);
      }(item);
    }
    async function handleSelection({target}) {
      await node_modules_delay(1);
      applyState(select_dom_$('[aria-checked="true"]', target).dataset.value);
    }
    function applyState(state) {
      const container = select_dom_$(".js-issues-results");
      container.classList.toggle("rgh-conversation-activity-is-filtered", "default" !== state);
      container.classList.toggle("rgh-conversation-activity-is-collapsed-filtered", "hideEventsAndCollapsedComments" === state);
      for (const dropdownItem of $$(`.${dropdownClass} [aria-checked="false"][data-value="${state}"]`)) dropdownItem.setAttribute("aria-checked", "true");
      for (const dropdownItem of $$(`.${dropdownClass} [aria-checked="true"]:not([data-value="${state}"])`)) dropdownItem.setAttribute("aria-checked", "false");
    }
    async function addWidget(state, anchor) {
      const position = anchor.closest("div");
      if (position.classList.contains("rgh-conversation-activity-filter")) return;
      const availableSpaceToTheLeftOfTheDropdown = position.lastElementChild.getBoundingClientRect().right - position.parentElement.getBoundingClientRect().left, alignment = 0 === availableSpaceToTheLeftOfTheDropdown || availableSpaceToTheLeftOfTheDropdown > expectedDropdownWidth ? "right-0" : "left-0";
      wrap(position, dom_chef.createElement("div", {
        className: "rgh-conversation-activity-filter-wrapper"
      }));
      position.classList.add("rgh-conversation-activity-filter");
      position.after(dom_chef.createElement("details", {
        className: `details-reset details-overlay d-inline-block ml-2 position-relative ${dropdownClass}`,
        id: "rgh-conversation-activity-filter-select-menu"
      }, dom_chef.createElement("summary", null, dom_chef.createElement(Eye, {
        className: "color-fg-muted"
      }), dom_chef.createElement(EyeClosed, {
        className: "color-fg-danger"
      }), dom_chef.createElement("div", {
        className: "dropdown-caret ml-1"
      })), dom_chef.createElement("details-menu", {
        className: `SelectMenu ${alignment}`,
        "on-details-menu-select": handleSelection
      }, dom_chef.createElement("div", {
        className: "SelectMenu-modal"
      }, dom_chef.createElement("div", {
        className: "SelectMenu-header"
      }, dom_chef.createElement("h3", {
        className: "SelectMenu-title color-fg-default"
      }, "Filter conversation activities"), dom_chef.createElement("button", {
        className: "SelectMenu-closeButton",
        type: "button",
        "data-toggle-for": "rgh-conversation-activity-filter-select-menu"
      }, dom_chef.createElement(X, null))), dom_chef.createElement("div", {
        className: "SelectMenu-list"
      }, (current = state, Object.entries(states).map((([state, label]) => dom_chef.createElement("div", {
        className: "SelectMenu-item",
        role: "menuitemradio",
        "aria-checked": state === current ? "true" : "false",
        "data-value": state
      }, dom_chef.createElement(Check, {
        className: "SelectMenu-icon SelectMenu-icon--check"
      }), label || "Show all")))))))));
      var current;
    }
    const minorFixesIssuePages = [ "https://github.com/refined-github/refined-github/issues/3686", "https://github.com/refined-github/refined-github/issues/6000", "https://github.com/refined-github/refined-github/issues/7000" ];
    function uncollapseTargetedComment() {
      if (location.hash.startsWith("#issuecomment-")) select_dom_$(`.${collapsedClassName} ${location.hash}`)?.closest(".js-timeline-item")?.classList.remove(collapsedClassName);
    }
    function switchToNextFilter() {
      switch (select_dom_$(`.${dropdownClass} [aria-checked="true"]`).dataset.value) {
       case "default":
        applyState("hideEvents");
        break;

       case "hideEvents":
        applyState("hideEventsAndCollapsedComments");
        break;

       case "hideEventsAndCollapsedComments":
        applyState("default");
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/conversation-activity-filter.tsx", {
      include: [ isConversation ],
      shortcuts: {
        h: "Cycle through conversation activity filters"
      },
      init: async function(signal) {
        const initialState = minorFixesIssuePages.some((url => location.href.startsWith(url))) ? "hideEventsAndCollapsedComments" : "default";
        observe([ "#partial-discussion-header .gh-header-meta :is(clipboard-copy, .flex-auto)", "#partial-discussion-header .gh-header-sticky :is(clipboard-copy, relative-time)" ], addWidget.bind(null, initialState), {
          signal
        });
        if ("default" !== initialState) applyState(initialState);
        window.addEventListener("hashchange", uncollapseTargetedComment, {
          signal
        });
        observe(".js-timeline-item", processItem, {
          signal
        });
        registerHotkey("h", switchToNextFilter, {
          signal
        });
      }
    });
    function selectAllNotifications() {
      select_dom_$(".js-notifications-mark-all-prompt").click();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/select-all-notifications-shortcut.tsx", {
      shortcuts: {
        a: "Select all notifications"
      },
      include: [ isNotifications ],
      exclude: [ isBlank ],
      init: function(signal) {
        registerHotkey("a", selectAllNotifications, {
          signal
        });
      }
    });
    function parseTime(element) {
      return new Date(element.getAttribute("datetime")).getTime();
    }
    function remove(issue) {
      const [stateChangeTime, updateTime] = $$("relative-time", issue);
      if (parseTime(updateTime) - parseTime(stateChangeTime) < 1e4) updateTime.parentElement.remove();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/no-duplicate-list-update-time.tsx", {
      asLongAs: [ () => location.search.includes("sort%3Aupdated-") ],
      include: [ isIssueOrPRList ],
      init: function(signal) {
        observe('.js-navigation-item[id^="issue_"]', remove, {
          signal
        });
      }
    });
    const Rocket = props => createElement("svg", {
      className: "octicon octicon-rocket",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.752 8.752 0 0 1-2.564 6.186l-.458.459c-.314.314-.641.616-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.749.749 0 0 1-1.11-.418l-.954-3.102a1.214 1.214 0 0 1-.145-.125L3.754 9.816a1.218 1.218 0 0 1-.124-.145L.528 8.717a.749.749 0 0 1-.418-1.11l1.71-2.774A1.748 1.748 0 0 1 3.31 4h3.204c.288-.338.59-.665.904-.979l.459-.458A8.749 8.749 0 0 1 14.064 0ZM8.938 3.623h-.002l-.458.458c-.76.76-1.437 1.598-2.02 2.5l-1.5 2.317 2.143 2.143 2.317-1.5c.902-.583 1.74-1.26 2.499-2.02l.459-.458a7.25 7.25 0 0 0 2.123-5.127V1.75a.25.25 0 0 0-.25-.25h-.186a7.249 7.249 0 0 0-5.125 2.123ZM3.56 14.56c-.732.732-2.334 1.045-3.005 1.148a.234.234 0 0 1-.201-.064.234.234 0 0 1-.064-.201c.103-.671.416-2.273 1.15-3.003a1.502 1.502 0 1 1 2.12 2.12Zm6.94-3.935c-.088.06-.177.118-.266.175l-2.35 1.521.548 1.783 1.949-1.2a.25.25 0 0 0 .119-.213ZM3.678 8.116 5.2 5.766c.058-.09.117-.178.176-.266H3.309a.25.25 0 0 0-.213.119l-1.2 1.95ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    }));
    function view_last_pr_deployment_addLink(header) {
      const lastDeployment = lastElement('.js-timeline-item a[title="Deployment has completed"]');
      if (lastDeployment) header.prepend(dom_chef.createElement("a", {
        className: "rgh-last-deployment btn btn-sm d-none d-md-block mr-1",
        target: "_blank",
        rel: "noopener noreferrer",
        href: lastDeployment.href
      }, dom_chef.createElement(Rocket, {
        className: "mr-1 v-align-text-top"
      }), "Latest deployment"));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/view-last-pr-deployment.tsx", {
      include: [ distribution_isPRConversation ],
      awaitDomReady: !0,
      init: function(signal) {
        observe(".gh-header-actions", view_last_pr_deployment_addLink, {
          signal
        });
      }
    });
    function onKeyDown(event) {
      const field = event.delegateTarget, form = field.form;
      if ("Enter" !== event.key || event.ctrlKey || event.metaKey || event.isComposing || elementExists([ ".suggester", ".rgh-avoid-accidental-submissions" ], form)) return;
      if (elementExists('.btn-primary[type="submit"]:disabled', form)) return;
      const spacingClasses = isNewFile() || isEditingFile() ? "my-1" : "mt-2 mb-n1", message = dom_chef.createElement("p", {
        className: "rgh-avoid-accidental-submissions " + spacingClasses
      }, "A submission via ", dom_chef.createElement("kbd", null, "enter"), " has been prevented. You can press ", dom_chef.createElement("kbd", null, "enter"), " again or use ", dom_chef.createElement("kbd", null, isMac ? "cmd" : "ctrl"), dom_chef.createElement("kbd", null, "enter"), ".");
      if (isNewFile() || isEditingFile() || distribution_isPRConversation()) field.after(message); else field.parentElement.append(message);
      event.preventDefault();
    }
    const inputElements = [ "form.new_issue input#issue_title", "input#pull_request_title", "input#commit-summary-input", "#merge_title_field" ];
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/avoid-accidental-submissions.tsx", {
      include: [ isNewIssue, isNewFile, isCompare, isEditingFile, distribution_isPRConversation ],
      init: function(signal) {
        delegate_it_delegate(inputElements.join(","), "keydown", onKeyDown, {
          signal
        });
      }
    });
    function quick_review_comment_deletion_onButtonClick({delegateTarget: button}) {
      try {
        button.closest(".js-comment").querySelector(".show-more-popover .js-comment-delete > button").click();
      } catch (error) {
        showToast(new Error("Feature broken. Please open an issue with the link found in the console"));
        feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/quick-review-comment-deletion.tsx", error.message);
      }
    }
    async function preloadDropdown({delegateTarget: button}) {
      const comment = button.closest(".js-comment");
      await async function(detailsMenu) {
        const fragment = select_dom_$(".js-comment-header-actions-deferred-include-fragment", detailsMenu);
        if (fragment) {
          detailsMenu.parentElement.dispatchEvent(new Event("mouseover"));
          await one_event_oneEvent(fragment, "load");
        }
      }(select_dom_$("details-menu.show-more-popover", comment));
    }
    function addDeleteButton(cancelButton) {
      cancelButton.after(dom_chef.createElement("button", {
        className: "btn btn-danger float-left rgh-review-comment-delete-button",
        type: "button"
      }, dom_chef.createElement(Trash, null)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-review-comment-deletion.tsx", {
      asLongAs: [ webext_detect_page_isChrome ],
      include: [ distribution_isPRConversation, isPRFiles ],
      init: function(signal) {
        delegate_it_delegate(".rgh-review-comment-delete-button", "click", quick_review_comment_deletion_onButtonClick, {
          signal
        });
        delegate_it_delegate(".rgh-quick-comment-edit-button", "click", preloadDropdown, {
          signal
        });
        observe(".review-comment .js-comment-cancel-button", addDeleteButton, {
          signal
        });
      }
    });
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/no-unnecessary-split-diff-view.tsx", [ hasFiles ]);
    const stateColorMap = {
      OPEN: "color-fg-success",
      CLOSED: "color-fg-danger",
      MERGED: "color-fg-done",
      DRAFT: ""
    };
    async function list_prs_for_branch_add(branchSelectorParent2) {
      const prInfo = (await pullRequestsAssociatedWithBranch.get())[getCurrentGitRef()];
      if (!prInfo) return;
      const StateIcon = stateIcon[prInfo.state];
      !function(branchSelectorParent, sibling) {
        const row = branchSelectorParent.closest(".position-relative");
        row.classList.add("d-flex", "flex-shrink-0", "gap-2");
        row.append(sibling);
      }(branchSelectorParent2, dom_chef.createElement("a", {
        "data-issue-and-pr-hovercards-enabled": !0,
        href: prInfo.url,
        className: "btn flex-self-center rgh-list-prs-for-branch",
        "data-hovercard-type": "pull_request",
        "data-hovercard-url": prInfo.url + "/hovercard"
      }, dom_chef.createElement(StateIcon, {
        className: stateColorMap[prInfo.state]
      }), dom_chef.createElement("span", null, " #", prInfo.number)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/list-prs-for-branch.tsx", {
      include: [ isRepoCommitListRoot ],
      exclude: [ isDefaultBranch, isPermalink ],
      init: async function(signal) {
        await expectToken();
        observe("details#branch-select-menu", list_prs_for_branch_add, {
          signal
        });
      }
    });
    function comment_on_draft_pr_indicator_addIndicator(button) {
      const preposition = button.textContent.includes("Add") ? " to " : " on ";
      button.textContent += preposition + "draft PR";
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/comment-on-draft-pr-indicator.tsx", {
      asLongAs: [ () => exists("#partial-discussion-header .octicon-git-pull-request-draft") ],
      include: [ distribution_isPRConversation, isPRFiles ],
      init: function(signal) {
        observe([ ".review-simple-reply-button", ".add-comment-label", ".start-review-label" ], comment_on_draft_pr_indicator_addIndicator, {
          signal
        });
      }
    });
    const CheckCircle = props => createElement("svg", {
      className: "octicon octicon-check-circle",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"
    })), DotFill = props => createElement("svg", {
      className: "octicon octicon-dot-fill",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
    })), Dot = props => createElement("svg", {
      className: "octicon octicon-dot",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
    })), Squirrel = props => createElement("svg", {
      className: "octicon octicon-squirrel",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M3.499.75a.75.75 0 0 1 1.5 0v.996C5.9 2.903 6.793 3.65 7.662 4.376l.24.202c-.036-.694.055-1.422.426-2.163C9.1.873 10.794-.045 12.622.26 14.408.558 16 1.94 16 4.25c0 1.278-.954 2.575-2.44 2.734l.146.508.065.22c.203.701.412 1.455.476 2.226.142 1.707-.4 3.03-1.487 3.898C11.714 14.671 10.27 15 8.75 15h-6a.75.75 0 0 1 0-1.5h1.376a4.484 4.484 0 0 1-.563-1.191 3.835 3.835 0 0 1-.05-2.063 4.647 4.647 0 0 1-2.025-.293.75.75 0 0 1 .525-1.406c1.357.507 2.376-.006 2.698-.318l.009-.01a.747.747 0 0 1 1.06 0 .748.748 0 0 1-.012 1.074c-.912.92-.992 1.835-.768 2.586.221.74.745 1.337 1.196 1.621H8.75c1.343 0 2.398-.296 3.074-.836.635-.507 1.036-1.31.928-2.602-.05-.603-.216-1.224-.422-1.93l-.064-.221c-.12-.407-.246-.84-.353-1.29a2.425 2.425 0 0 1-.507-.441 3.075 3.075 0 0 1-.633-1.248.75.75 0 0 1 1.455-.364c.046.185.144.436.31.627.146.168.353.305.712.305.738 0 1.25-.615 1.25-1.25 0-1.47-.95-2.315-2.123-2.51-1.172-.196-2.227.387-2.706 1.345-.46.92-.27 1.774.019 3.062l.042.19a.884.884 0 0 1 .01.05c.348.443.666.949.94 1.553a.75.75 0 1 1-1.365.62c-.553-1.217-1.32-1.94-2.3-2.768L6.7 5.527c-.814-.68-1.75-1.462-2.692-2.619a3.737 3.737 0 0 0-1.023.88c-.406.495-.663 1.036-.722 1.508.116.122.306.21.591.239.388.038.797-.06 1.032-.19a.75.75 0 0 1 .728 1.31c-.515.287-1.23.439-1.906.373-.682-.067-1.473-.38-1.879-1.193L.75 5.677V5.5c0-.984.48-1.94 1.077-2.664.46-.559 1.05-1.055 1.673-1.353V.75Z"
    })), XCircle = props => createElement("svg", {
      className: "octicon octicon-x-circle",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M2.344 2.343h-.001a8 8 0 0 1 11.314 11.314A8.002 8.002 0 0 1 .234 10.089a8 8 0 0 1 2.11-7.746Zm1.06 10.253a6.5 6.5 0 1 0 9.108-9.275 6.5 6.5 0 0 0-9.108 9.275ZM6.03 4.97 8 6.94l1.97-1.97a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l1.97 1.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-1.97 1.97a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L6.94 8 4.97 6.03a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018Z"
    })), prIcons = ":is(.octicon-git-pull-request, .octicon-git-pull-request-closed, .octicon-git-pull-request-draft, .octicon-git-merge)", issueIcons = ":is(.octicon-issue-opened, .octicon-issue-closed, .octicon-skip)", filters = {
      "Pull requests": prIcons,
      Issues: issueIcons,
      Others: `.notification-list-item-link .octicon:not(${prIcons}, ${issueIcons}, .octicon-bookmark)`,
      Open: ":is(.octicon-issue-opened, .octicon-git-pull-request)",
      Closed: ":is(.octicon-issue-closed, .octicon-git-pull-request-closed, .octicon-skip)",
      Draft: ".octicon-git-pull-request-draft",
      Merged: ".octicon-git-merge",
      Read: ".notification-read",
      Unread: ".notification-unread"
    };
    function resetFilters({target}) {
      select_dom_$("form#rgh-select-notifications-form").reset();
      for (const label of $$("label", target)) label.setAttribute("aria-checked", "false");
    }
    function getFiltersSelector(formData, category) {
      return formData.getAll(category).map((value => filters[value])).join(",");
    }
    function select_notifications_handleSelection({target}) {
      const selectAllCheckbox = select_dom_$('input[type="checkbox"].js-notifications-mark-all-prompt');
      if (selectAllCheckbox.checked) selectAllCheckbox.click();
      if (elementExists(":checked", target)) {
        const formData = new FormData(select_dom_$("form#rgh-select-notifications-form")), types = getFiltersSelector(formData, "Type"), statuses = getFiltersSelector(formData, "Status"), readStatus = getFiltersSelector(formData, "Read");
        for (const notification of $$(".notifications-list-item")) if (types && !elementExists(types, notification) || statuses && !elementExists(statuses, notification) || readStatus && !notification.matches(readStatus)) select_dom_$(".js-notification-bulk-action-check-item", notification).removeAttribute("data-check-all-item");
        if (elementExists(".js-notification-bulk-action-check-item[data-check-all-item]")) selectAllCheckbox.click();
      }
      for (const disabledNotificationCheckbox of $$(".js-notification-bulk-action-check-item:not([data-check-all-item])")) disabledNotificationCheckbox.setAttribute("data-check-all-item", "");
    }
    function createDropdownList(category, filters2) {
      const icons = {
        "Pull requests": dom_chef.createElement(GitPullRequest, {
          className: "color-fg-muted"
        }),
        Issues: dom_chef.createElement(IssueOpened, {
          className: "color-fg-muted"
        }),
        Open: dom_chef.createElement(CheckCircle, {
          className: "color-fg-success"
        }),
        Others: dom_chef.createElement(Squirrel, {
          className: "color-fg-muted"
        }),
        Closed: dom_chef.createElement(XCircle, {
          className: "color-fg-danger"
        }),
        Draft: dom_chef.createElement(GitPullRequestDraft, {
          className: "color-fg-subtle"
        }),
        Merged: dom_chef.createElement(GitMerge, {
          className: "color-fg-done"
        }),
        Read: dom_chef.createElement(Dot, {
          className: "color-fg-accent"
        }),
        Unread: dom_chef.createElement(DotFill, {
          className: "color-fg-accent"
        })
      };
      return dom_chef.createElement("div", {
        className: "SelectMenu-list"
      }, dom_chef.createElement("header", {
        className: "SelectMenu-header"
      }, dom_chef.createElement("span", {
        className: "SelectMenu-title"
      }, category)), filters2.map((filter => dom_chef.createElement("label", {
        className: "SelectMenu-item text-normal",
        role: "menuitemcheckbox",
        "aria-checked": "false",
        tabIndex: 0
      }, dom_chef.createElement(Check, {
        className: "octicon octicon-check SelectMenu-icon SelectMenu-icon--check mr-2",
        "aria-hidden": "true"
      }), dom_chef.createElement("div", {
        className: "SelectMenu-item-text"
      }, dom_chef.createElement("input", {
        hidden: !0,
        type: "checkbox",
        name: category,
        value: filter
      }), icons[filter], dom_chef.createElement("span", {
        className: "ml-2"
      }, filter))))));
    }
    const createDropdown = node_modules_onetime((() => dom_chef.createElement("details", {
      className: "details-reset details-overlay position-relative rgh-select-notifications mx-2",
      onToggle: resetFilters
    }, dom_chef.createElement("summary", {
      className: "h6",
      "data-hotkey": "S",
      "aria-haspopup": "menu",
      role: "button"
    }, "Select by ", dom_chef.createElement("span", {
      className: "dropdown-caret ml-1"
    })), dom_chef.createElement("details-menu", {
      className: "SelectMenu left-0",
      "aria-label": "Select by",
      role: "menu",
      "on-details-menu-selected": select_notifications_handleSelection
    }, dom_chef.createElement("div", {
      className: "SelectMenu-modal"
    }, dom_chef.createElement("form", {
      id: "rgh-select-notifications-form"
    }, createDropdownList("Type", [ "Pull requests", "Issues", "Others" ]), createDropdownList("Status", [ "Open", "Closed", "Merged", "Draft" ]), createDropdownList("Read", [ "Read", "Unread" ])))))));
    function closeDropdown() {
      select_dom_$(".rgh-select-notifications")?.removeAttribute("open");
    }
    function addDropdown(markAllPrompt) {
      markAllPrompt.closest("label").after(createDropdown());
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/select-notifications.tsx", {
      shortcuts: {
        S: 'Open the "Select by" dropdown'
      },
      include: [ isNotifications ],
      init: function(signal) {
        observe(".js-notifications-mark-all-prompt", addDropdown, {
          signal
        });
        delegate_it_delegate(".js-notifications-mark-selected-actions > *, .rgh-open-selected-button", "click", closeDropdown, {
          signal
        });
      }
    });
    async function getTabCount(tab) {
      const counter = select_dom_$(".Counter, .num", tab);
      if (!counter) return 0;
      if (!counter.firstChild) await async function(element, {filter, signal, ...options} = {}) {
        if (signal?.aborted) return []; else return new Promise((resolve => {
          const observer = new MutationObserver((changes => {
            if (!filter || filter(changes)) {
              observer.disconnect();
              resolve(changes);
            }
          }));
          observer.observe(element, options);
          signal?.addEventListener("abort", (() => {
            observer.disconnect();
            resolve([]);
          }));
        }));
      }(tab, {
        childList: !0,
        subtree: !0
      });
      return Number(counter.textContent);
    }
    function mustKeepTab(tab) {
      return tab.matches(".selected") || canUserEditRepo();
    }
    function onlyShowInDropdown(id) {
      const tabItem = select_dom_$(`[data-tab-item$="${id}"]`);
      if (!tabItem && isEnterprise()) return;
      (tabItem.closest("li") ?? tabItem.closest(".UnderlineNav-item")).classList.add("d-none");
      const menuItem = select_dom_$(`[data-menu-item$="${id}"]`);
      menuItem.removeAttribute("data-menu-item");
      menuItem.hidden = !1;
      select_dom_$(".UnderlineNav-actions ul").append(menuItem);
    }
    const wikiPageCount = new CachedFunction("wiki-page-count", {
      async updater() {
        const dom = await fetch_dom(buildRepoURL("wiki")), counter = dom.querySelector("#wiki-pages-box .Counter");
        if (counter) return looseParseInt(counter); else return dom.querySelectorAll("#wiki-content > .Box .Box-row").length;
      },
      maxAge: {
        hours: 1
      },
      staleWhileRevalidate: {
        days: 5
      },
      cacheKey: cacheByRepo
    }), workflowCount = new CachedFunction("workflows-count", {
      async updater() {
        const {repository: {workflowFiles}} = await v4('query CountWorkflows($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tworkflowFiles: object(expression: "HEAD:.github/workflows") {\n\t\t\t... on Tree {\n\t\t\t\tentries {\n\t\t\t\t\toid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n');
        return workflowFiles?.entries.length ?? 0;
      },
      maxAge: {
        days: 1
      },
      staleWhileRevalidate: {
        days: 10
      },
      cacheKey: cacheByRepo
    });
    async function updateProjectsTab() {
      const projectsTab = await elementReady('[data-hotkey="g b"]');
      if (!projectsTab || mustKeepTab(projectsTab) || await getTabCount(projectsTab) > 0) return !1;
      if (!isRepo()) {
        if (!await async function() {
          return Boolean(await elementReady('.btn-primary[href$="repositories/new"]'));
        }()) projectsTab.remove();
      } else onlyShowInDropdown("projects-tab");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clean-repo-tabs.tsx", {
      include: [ hasRepoHeader ],
      deduplicate: "has-rgh",
      init: [ async function() {
        const actionsTab = await elementReady('[data-hotkey="g a"]');
        if (!actionsTab || mustKeepTab(actionsTab) || await workflowCount.get() > 0) return !1;
        onlyShowInDropdown("actions-tab");
      }, async function() {
        const wikiTab = await elementReady('[data-hotkey="g w"]');
        if (!wikiTab || mustKeepTab(wikiTab)) return !1;
        const count = await wikiPageCount.get();
        if (count > 0) !function(tab, count) {
          const tabCounter = select_dom_$(".Counter", tab);
          tabCounter.textContent = abbreviateNumber(count);
          tabCounter.title = count > 999 ? String(count) : "";
        }(wikiTab, count); else onlyShowInDropdown("wiki-tab");
      }, updateProjectsTab ]
    }, {
      include: [ hasRepoHeader ],
      deduplicate: "has-rgh",
      init: async function() {
        if (!await unhideOverflowDropdown()) return !1;
        await elementReady(".UnderlineNav-actions ul");
        onlyShowInDropdown("security-tab");
        onlyShowInDropdown("insights-tab");
      }
    }, {
      include: [ isOrganizationProfile ],
      deduplicate: "has-rgh",
      init: updateProjectsTab
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-welcome-issue.tsx", {
      include: [ () => location.href.startsWith("https://github.com/refined-github/refined-github/issues/3543") ],
      awaitDomReady: !0,
      init: function(signal) {
        delegate_it_delegate('a[href="#rgh-linkify-welcome-issue"]', "click", openOptions, {
          signal
        });
        if (elementExists(".rgh-linkify-welcome-issue")) return;
        const [opening, closing] = $$('a[href="#rgh-linkify-welcome-issue"]');
        closing.remove();
        opening.append(opening.nextSibling);
        opening.classList.add("rgh-linkify-welcome-issue");
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/same-branch-author-commits.tsx", {
      include: [ isRepoCommitList ],
      awaitDomReady: !0,
      init: function() {
        for (const author of $$(".js-navigation-container a.commit-author")) author.pathname = location.pathname;
      }
    });
    async function sessionResumeHandler() {
      await Promise.resolve();
      const cancelMergeButton = select_dom_$(".merge-branch-form .js-details-target");
      if (cancelMergeButton) {
        cancelMergeButton.click();
        document.removeEventListener("session:resume", sessionResumeHandler);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/prevent-pr-merge-panel-opening.tsx", {
      include: [ distribution_isPRConversation ],
      init: function(signal) {
        document.addEventListener("session:resume", sessionResumeHandler, {
          signal
        });
      }
    });
    async function clearCacheHandler(event) {
      await globalCache.clear();
      const button = event.target, initialText = button.textContent;
      button.textContent = "Cache cleared!";
      button.disabled = !0;
      setTimeout((() => {
        button.textContent = initialText;
        button.disabled = !1;
      }), 2e3);
    }
    var rgh_improve_new_issue_form_browser = __webpack_require__(131);
    function rgh_improve_new_issue_form_addNotice(adjective) {
      select_dom_$("#issue_body_template_name").before(dom_chef.createElement("div", {
        className: "flash flash-warn m-2"
      }, "Your Personal Access Token is ", adjective, ". Some Refined GitHub features will not work without it. You can update it ", dom_chef.createElement("button", {
        className: "btn-link",
        type: "button",
        onClick: openOptions
      }, "in the options"), "."));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-improve-new-issue-form.tsx", {
      asLongAs: [ isRefinedGitHubRepo, isNewIssue, () => "1_bug_report.yml" === new URL(location.href).searchParams.get("template") ],
      awaitDomReady: !0,
      deduplicate: "has-rgh-inner",
      init: [ async function() {
        select_dom_$('[href="#clear-cache"]').replaceWith(dom_chef.createElement("button", {
          className: "btn",
          type: "button",
          onClick: clearCacheHandler
        }, "Clear cache"));
      }, async function() {
        try {
          await expectToken();
        } catch {
          rgh_improve_new_issue_form_addNotice("missing");
          return;
        }
        try {
          await expectTokenScope("repo");
        } catch {
          rgh_improve_new_issue_form_addNotice("invalid or expired");
        }
      }, async function() {
        const {version} = rgh_improve_new_issue_form_browser.runtime.getManifest();
        select_dom_$("input#issue_form_version").value = version;
      } ]
    });
    function toggleCommitMessage(event) {
      if (!event.target.closest("a, button, clipboard-copy, details")) if (0 === window.getSelection()?.toString().length) select_dom_$(".ellipsis-expander", event.delegateTarget)?.dispatchEvent(new MouseEvent("click", {
        bubbles: !0,
        altKey: event.altKey
      }));
    }
    const commitMessagesSelector = [ ".js-commits-list-item", ":is(.file-navigation, .js-permalink-shortcut) ~ .Box .Box-header" ].join(",");
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/easy-toggle-commit-messages.tsx", {
      include: [ isCommitList, isCompare, isRepoTree, isSingleFile ],
      exclude: [ isRepoFile404 ],
      init: function(signal) {
        delegate_it_delegate(commitMessagesSelector, "click", toggleCommitMessage, {
          signal
        });
      }
    });
    function commandPaletteKeydown(event) {
      const {key, ctrlKey, delegateTarget} = event;
      if (!ctrlKey || "n" !== key && "p" !== key) return;
      event.preventDefault();
      const targetKey = "n" === key ? "ArrowDown" : "ArrowUp";
      delegateTarget.dispatchEvent(new KeyboardEvent("keydown", {
        bubbles: !0,
        key: targetKey,
        code: targetKey
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/command-palette-navigation-shortcuts.tsx", {
      asLongAs: [ () => isMac ],
      shortcuts: {
        "ctrl n": "Select next item in command palette",
        "ctrl p": "Select previous item in command palette"
      },
      init: node_modules_onetime((function() {
        delegate_it_delegate("command-palette", "keydown", commandPaletteKeydown);
      }))
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/link-to-compare-diff.tsx", {
      include: [ isCompare ],
      exclude: [ () => elementExists(".tabnav") ],
      deduplicate: "has-rgh-inner",
      awaitDomReady: !0,
      init: function() {
        const changedFilesSummary = select_dom_$(".Box li:has(.octicon-file-diff)");
        wrapAll(dom_chef.createElement("a", {
          className: "no-underline rgh-link-to-compare-diff",
          href: "#files_bucket"
        }), ...changedFilesSummary.children);
      }
    });
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/submission-via-ctrl-enter-everywhere.tsx", {
      include: [ isNewFile, isEditingFile, isNewRelease, isEditingRelease ],
      exclude: [ isBlank ],
      awaitDomReady: !0,
      init: function() {
        select_dom_$([ "input#commit-summary-input", 'textarea[aria-label="Describe this release"]' ]).classList.add("js-quick-submit");
      }
    });
    function linkify_user_labels_linkify(label) {
      if (label.closest("a")) {
        feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/linkify-user-labels.tsx", "Already linkified, feature needs to be updated");
        return;
      }
      const url = new URL(buildRepoURL("commits"));
      url.searchParams.set("author", function(anyElementInsideComment) {
        const avatar = anyElementInsideComment.closest(".TimelineItem, .review-comment").querySelector(".TimelineItem-avatar img, img.avatar"), name = avatar.alt.replace(/^@/, "");
        if (!name.endsWith("[bot]") && avatar.closest('[href^="https://github.com/apps/"]')) return name + "[bot]"; else return name;
      }(label));
      wrap(label, dom_chef.createElement("a", {
        className: "Link--secondary",
        href: url.href
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/linkify-user-labels.tsx", {
      asLongAs: [ isRepo ],
      include: [ hasComments ],
      init: function(signal) {
        observe([ '.tooltipped[aria-label*="a member of the"]', '.tooltipped[aria-label^="This user has previously committed"]' ], linkify_user_labels_linkify, {
          signal
        });
      }
    });
    async function repo_avatars_add(ownerLabel) {
      const username = github_helpers_getRepo().owner, source = getUserAvatar(username, 16), avatar = dom_chef.createElement("img", {
        className: "avatar ml-1 mr-2",
        src: source,
        width: 16,
        height: 16,
        alt: `@${username}`
      });
      ownerLabel.classList.add("d-flex", "flex-items-center");
      ownerLabel.prepend(avatar);
      if (!ownerLabel.closest('[data-hovercard-type="organization"]')) avatar.classList.add("avatar-user");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/repo-avatars.tsx", {
      include: [ hasRepoHeader ],
      init: function(signal) {
        observe(".AppHeader-context-full li:first-child .AppHeader-context-item-label", repo_avatars_add, {
          signal
        });
      }
    });
    const closedOrMergedMarkerSelector = any`
	#partial-discussion-header :is(
		[title^="Status: Closed"],
		[title^="Status: Merged"]
	)
`;
    function getLastCloseEvent() {
      return lastElement("\n\t\t.TimelineItem-badge :is(\n\t\t\t.octicon-issue-closed,\n\t\t\t.octicon-git-merge,\n\t\t\t.octicon-git-pull-request-closed,\n\t\t\t.octicon-skip\n\t\t)\n\t").closest(".TimelineItem") ?? void 0;
    }
    function addToConversation(discussionHeader) {
      discussionHeader.style.pointerEvents = "none";
      wrap(discussionHeader, dom_chef.createElement("a", {
        "aria-label": "Scroll to most recent close event",
        className: "tooltipped tooltipped-s",
        href: "#" + getLastCloseEvent().id
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/jump-to-conversation-close-event.tsx", {
      asLongAs: [ isConversation ],
      include: [ () => exists("#partial-discussion-header :is(.octicon-issue-closed, .octicon-skip)"), isClosedPR ],
      awaitDomReady: !0,
      init: function(signal) {
        observe(closedOrMergedMarkerSelector, addToConversation, {
          signal
        });
      }
    });
    const itemsPerNotificationsPage = 25;
    function last_notification_page_button_linkify(nextButton) {
      const totalNotificationsNode = select_dom_$(".js-notifications-list-paginator-counts").lastChild;
      assertNodeContent(totalNotificationsNode, /^of \d+$/);
      const totalNotificationsNumber = looseParseInt(totalNotificationsNode), lastCursor = Math.floor((totalNotificationsNumber - 1) / itemsPerNotificationsPage) * itemsPerNotificationsPage, nextButtonSearch = new URLSearchParams(nextButton.search);
      nextButtonSearch.set("after", stringToBase64(`cursor:${lastCursor}`));
      totalNotificationsNode.replaceWith(" of ", dom_chef.createElement("a", {
        href: "?" + String(nextButtonSearch)
      }, totalNotificationsNumber));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/last-notification-page-button.tsx", {
      include: [ isNotifications ],
      init: function(signal) {
        observe('a[aria-label="Next"]', last_notification_page_button_linkify, {
          signal
        });
      }
    });
    function rgh_linkify_yolo_issues_linkify(issueCell) {
      issueCell.replaceChildren(createRghIssueLink(issueCell.textContent));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-linkify-yolo-issues.tsx", {
      asLongAs: [ function() {
        return location.pathname.startsWith("/refined-github/yolo");
      }, isSingleFile, () => location.pathname.endsWith("broken-features.csv") ],
      init: function(signal) {
        observe(":is(.js-csv-data, .react-csv-row) td:nth-child(3)", rgh_linkify_yolo_issues_linkify, {
          signal
        });
      }
    });
    function quick_new_issue_add(dropdownMenu) {
      dropdownMenu.append(dom_chef.createElement("li", {
        role: "presentation",
        "aria-hidden": "true",
        "data-view-component": "true",
        className: "ActionList-sectionDivider"
      }), dom_chef.createElement("li", {
        "data-targets": "action-list.items",
        role: "none",
        "data-view-component": "true",
        className: "ActionListItem"
      }, dom_chef.createElement("a", {
        href: buildRepoURL("issues/new/choose"),
        tabIndex: -1,
        role: "menuitem",
        "data-view-component": "true",
        className: "ActionListContent ActionListContent--visual16"
      }, dom_chef.createElement("span", {
        className: "ActionListItem-visual ActionListItem-visual--leading"
      }, dom_chef.createElement(IssueOpened, null)), dom_chef.createElement("span", {
        "data-view-component": "true",
        className: "ActionListItem-label"
      }, "New issue in ", github_helpers_getRepo()?.name))));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/quick-new-issue.tsx", {
      include: [ isRepo ],
      exclude: [ isArchivedRepoAsync ],
      init: async function(signal) {
        observe("#global-create-menu-list", quick_new_issue_add, {
          signal
        });
      }
    });
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/scrollable-areas.tsx");
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/emphasize-draft-pr-label.tsx");
    const calculateHeatIndex = createHeatIndexFunction([ 0, -2e9 ]);
    function addHeatIndex(lastUpdateElement) {
      const lastUpdate = new Date(lastUpdateElement.getAttribute("datetime") ?? lastUpdateElement.title), diff = Date.now() - lastUpdate.getTime();
      lastUpdateElement.setAttribute("data-rgh-heat", String(calculateHeatIndex(-diff)));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/file-age-color.tsx", {
      include: [ isRepoTree ],
      exclude: [ isRepoFile404 ],
      init: function(signal) {
        observe(".react-directory-commit-age > [title]", addHeatIndex, {
          signal
        });
      }
    });
    const isClosedOrMerged = () => elementExists(closedOrMergedMarkerSelector);
    function getCloseDate() {
      const datetime = select_dom_$("relative-time", getLastCloseEvent()).getAttribute("datetime");
      console.assert(datetime, "Datetime attribute missing from relative-time");
      return new Date(datetime);
    }
    const threeMonths = toMilliseconds({
      days: 90
    });
    function shouldDisplayNotice() {
      if (!isClosedOrMerged()) return !1;
      const closingDate = getCloseDate();
      return (date = closingDate, Date.now() - date.getTime()) > threeMonths;
      var date;
    }
    function getNoticeText() {
      const closingDate = getCloseDate(), ago = dom_chef.createElement("strong", null, index_es(closingDate.getTime())), newIssue = dom_chef.createElement("a", {
        href: buildRepoURL("issues/new/choose")
      }, "new issue");
      return dom_chef.createElement(dom_chef.Fragment, null, "This ", isPR() ? "PR" : "issue", " was closed ", ago, ". Please consider opening a ", newIssue, " instead of leaving a comment here.");
    }
    function addConversationBanner(newCommentField) {
      newCommentField.before(createBanner({
        icon: dom_chef.createElement(Info, {
          className: "m-0"
        }),
        classes: "p-2 my-2 mx-md-2 text-small color-fg-muted border-0".split(" "),
        text: getNoticeText()
      }));
    }
    function makeFieldKinder(field) {
      if ("Add your comment here..." === field.textContent.trim()) field.textContent = "Add your comment here, be kind..."; else if ("Leave a comment" === field.textContent.trim()) field.textContent = "Leave a comment, be kind"; else feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/netiquette.tsx", `Unexpected placeholder text: ${field.textContent}`);
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/netiquette.tsx", {
      exclude: [ isAnyRefinedGitHubRepo ],
      include: [ isConversation ],
      awaitDomReady: !0,
      init: function(signal) {
        if (!shouldDisplayNotice()) return !1;
        observe("#issuecomment-new file-attachment", addConversationBanner, {
          signal
        });
      }
    }, {
      include: [ hasComments ],
      init: function(signal) {
        observe("p.CommentBox-placeholder", makeFieldKinder, {
          signal
        });
      }
    });
    function rgh_netiquette_addConversationBanner(newCommentBox) {
      const button = dom_chef.createElement("button", {
        type: "button",
        className: "btn-link",
        onClick: () => {
          banner.remove();
          newCommentBox.hidden = !1;
        }
      }, "comment"), banner = dom_chef.createElement(TimelineItem, null, createBanner({
        classes: [ "rgh-bg-none" ],
        icon: dom_chef.createElement(Info, {
          className: "mr-1"
        }),
        text: dom_chef.createElement(dom_chef.Fragment, null, getNoticeText(), " If you want to say something helpful, you can leave a ", button, ". ", dom_chef.createElement("strong", null, "Do not"), " report issues here.")
      }));
      newCommentBox.before(banner);
      newCommentBox.hidden = !0;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-netiquette.tsx", {
      asLongAs: [ isAnyRefinedGitHubRepo ],
      include: [ isConversation ],
      awaitDomReady: !0,
      init: function(signal) {
        if (!shouldDisplayNotice()) return !1;
        observe("#issuecomment-new:has(file-attachment)", rgh_netiquette_addConversationBanner, {
          signal
        });
      }
    });
    function addAvatar(link) {
      const username = link.textContent;
      link.prepend(dom_chef.createElement("img", {
        className: "avatar avatar-user v-align-text-bottom mr-1 rgh-small-user-avatars",
        src: getUserAvatar(username, 14),
        width: 14,
        height: 14,
        loading: "lazy"
      }));
    }
    function addMentionAvatar(link) {
      assertNodeContent(link.firstChild, /^@/);
      const username = link.textContent.slice(1);
      link.prepend(dom_chef.createElement("img", {
        className: "avatar avatar-user mb-1 mr-1 rgh-small-user-avatars",
        style: {
          marginLeft: 1
        },
        src: getUserAvatar(username, 16),
        width: 16,
        height: 16,
        loading: "lazy"
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/small-user-avatars.tsx", {
      init: node_modules_onetime((function() {
        observe([ '.js-issue-row [data-hovercard-type="user"]', '.notification-thread-subscription [data-hovercard-type="user"]' ], addAvatar);
        observe('.user-mention:not(.commit-author)[data-hovercard-type="user"]', addMentionAvatar);
      }))
    });
    const releases_dropdown_getReleases = new CachedFunction("releases", {
      async updater() {
        const {repository} = await v4("query GetReleases($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\treleases(first: 100) {\n\t\t\tnodes {\n\t\t\t\ttagName\n\t\t\t}\n\t\t}\n\t}\n}\n");
        return repository.releases.nodes.map((({tagName}) => tagName));
      },
      maxAge: {
        hours: 1
      },
      staleWhileRevalidate: {
        days: 4
      },
      cacheKey: cacheByRepo
    });
    async function selectionHandler(event) {
      const field = event.delegateTarget, selectedTag = field.value, releases = await releases_dropdown_getReleases.get();
      if (!("inputType" in event) && releases.includes(selectedTag)) {
        location.href = buildRepoURL("releases/tag", encodeURIComponent(selectedTag));
        field.value = "";
      }
    }
    async function addList(searchField) {
      const releases = await releases_dropdown_getReleases.get();
      if (0 !== releases.length) {
        searchField.setAttribute("list", "rgh-releases-dropdown");
        searchField.after(dom_chef.createElement("datalist", {
          id: "rgh-releases-dropdown"
        }, releases.map((tag => dom_chef.createElement("option", {
          value: tag
        })))));
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/releases-dropdown.tsx", {
      include: [ isReleases ],
      init: async function(signal) {
        observe("input#release-filter", addList, {
          signal
        });
        delegate_it_delegate("input#release-filter", "input", selectionHandler, {
          signal
        });
      }
    });
    function getBaseCommitNotice(prInfo) {
      const {base} = getBranches(), commit = (sha = prInfo.baseRefOid, dom_chef.createElement("code", null, dom_chef.createElement("a", {
        className: "Link--secondary",
        href: buildRepoURL("commit", sha),
        "data-hovercard-type": "commit",
        "data-hovercard-url": buildRepoURL("commit", sha, "hovercard")
      }, sha.slice(0, 7))));
      var sha;
      const count = pluralize(prInfo.behindBy, "$$ commit"), countLink = dom_chef.createElement("a", {
        href: buildRepoURL("compare", `${prInfo.baseRefOid.slice(0, 8)}...${base.branch}`)
      }, count);
      return dom_chef.createElement("div", null, "It’s ", countLink, " behind (base commit: ", commit, ")");
    }
    async function addInfo(statusMeta) {
      if (!statusMeta.closest(".merge-pr.is-merging .merging-body, .merge-pr.is-merging .merge-commit-author-email-info, .merge-pr.is-merging-solo .merging-body, .merge-pr.is-merging-jump .merging-body, .merge-pr.is-merging-group .merging-body, .merge-pr.is-rebasing .rebasing-body, .merge-pr.is-squashing .squashing-body, .merge-pr.is-squashing .squash-commit-author-email-info, .merge-pr.is-merging .branch-action-state-error-if-merging .merging-body-merge-warning, .rgh-update-pr-from-base-branch-row")) return;
      const {base} = getBranches(), prInfo = await getPrInfo(base.relative);
      if (!prInfo.needsUpdate) return;
      const previousMessage = statusMeta.firstChild;
      statusMeta.prepend(getBaseCommitNotice(prInfo));
      if (isTextNodeContaining(previousMessage, "Merging can be performed automatically.")) previousMessage.remove();
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pr-base-commit.tsx", {
      include: [ distribution_isPRConversation ],
      exclude: [ isClosedPR, () => "This repository has been deleted" === select_dom_$(".head-ref").title ],
      awaitDomReady: !0,
      init: async function(signal) {
        await expectToken();
        observe(".branch-action-item .status-meta", addInfo, {
          signal
        });
      }
    });
    const undeterminableAheadBy = Number.MAX_SAFE_INTEGER, repoPublishState = new CachedFunction("tag-ahead-by", {
      async updater() {
        const {repository} = await v4('query GetPublishRepoState($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\trefs(\n\t\t\tfirst: 20\n\t\t\trefPrefix: "refs/tags/"\n\t\t\torderBy: { field: TAG_COMMIT_DATE, direction: DESC }\n\t\t) {\n\t\t\tnodes {\n\t\t\t\tname\n\t\t\t\ttag: target {\n\t\t\t\t\toid\n\t\t\t\t\t... on Tag {\n\t\t\t\t\t\tcommit: target {\n\t\t\t\t\t\t\toid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tdefaultBranchRef {\n\t\t\ttarget {\n\t\t\t\t... on Commit {\n\t\t\t\t\thistory(first: 20) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\toid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n');
        if (0 === repository.refs.nodes.length) return {
          latestTag: !1,
          aheadBy: 0
        };
        const tags = new Map;
        for (const node of repository.refs.nodes) tags.set(node.name, node.tag.commit?.oid ?? node.tag.oid);
        const latestTag = function(tags) {
          if (!tags.every((tag => validVersion.test(tag)))) return tags[0];
          let releases = tags.filter((tag => !isPrerelease.test(tag)));
          if (0 === releases.length) releases = tags;
          let latestVersion = releases[0];
          for (const release of releases) if (compareVersions(latestVersion, release) < 0) latestVersion = release;
          return latestVersion;
        }([ ...tags.keys() ]), latestTagOid = tags.get(latestTag), aheadBy = repository.defaultBranchRef.target.history.nodes.findIndex((node => node.oid === latestTagOid));
        return {
          latestTag,
          aheadBy: -1 === aheadBy ? undeterminableAheadBy : aheadBy
        };
      },
      maxAge: {
        hours: 1
      },
      staleWhileRevalidate: {
        days: 2
      },
      cacheKey: cacheByRepo
    });
    async function createLink(latestTag, aheadBy) {
      const label = `${aheadBy === undeterminableAheadBy ? "More than 20 unreleased commits" : pluralize(aheadBy, "$$ unreleased commit")}\nsince ${string = latestTag, 
      length = 30, string.length < length ? string : string.slice(0, length) + "…"}`;
      var string, length;
      return dom_chef.createElement("a", {
        className: "btn px-2 tooltipped tooltipped-se",
        href: buildRepoURL("compare", `${latestTag}...${await getDefaultBranch()}`),
        "aria-label": label
      }, dom_chef.createElement(Tag, {
        className: "v-align-middle"
      }), aheadBy === undeterminableAheadBy || dom_chef.createElement("sup", {
        className: "ml-n2"
      }, " +", aheadBy));
    }
    async function createLinkGroup(latestTag, aheadBy) {
      const link = await createLink(latestTag, aheadBy);
      if (!elementExists('nav [data-content="Settings"]')) return link; else return groupButtons([ link, dom_chef.createElement("a", {
        href: buildRepoURL("releases/new"),
        className: "btn px-2 tooltipped tooltipped-se",
        "aria-label": "Draft a new release",
        "data-turbo-frame": "repo-content-turbo-frame"
      }, dom_chef.createElement(Plus, {
        className: "v-align-middle"
      })) ]);
    }
    async function addToHome(branchSelector2) {
      const {latestTag, aheadBy} = await repoPublishState.get();
      if (!latestTag || !(aheadBy > 0)) return;
      const linkGroup = await createLinkGroup(latestTag, aheadBy);
      linkGroup.style.flexShrink = "0";
      wrapAll(dom_chef.createElement("div", {
        className: "d-flex gap-2"
      }), branchSelector2, linkGroup);
    }
    async function addToReleases(releasesFilter) {
      const {latestTag, aheadBy} = await repoPublishState.get();
      if (!latestTag || !(aheadBy > 0)) return;
      const widget = await createLink(latestTag, aheadBy), newReleaseButton = select_dom_$('nav + div a[href$="/releases/new"]');
      if (!newReleaseButton) {
        releasesFilter.form.before(widget);
        releasesFilter.form.parentElement.classList.add("d-flex", "flex-items-start");
        widget.classList.add("mr-md-0", "mr-2");
      } else {
        newReleaseButton.before(widget);
        groupButtons([ widget, newReleaseButton ]);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/unreleased-commits.tsx", {
      asLongAs: [ isDefaultBranch ],
      include: [ isRepoHome ],
      init: async function(signal) {
        await expectToken();
        observe(branchSelector, addToHome, {
          signal
        });
      }
    }, {
      include: [ () => "releases" === github_helpers_getRepo()?.path ],
      init: async function(signal) {
        await expectToken();
        observe("input#release-filter", addToReleases, {
          signal
        });
      }
    });
    const previous_version_namespaceObject = "query getPreviousCommitForFile($resource: URI!, $filePath: String!) {\n\tresource(url: $resource) {\n\t\t... on Commit {\n\t\t\thistory(path: $filePath, first: 2) {\n\t\t\t\tnodes {\n\t\t\t\t\toid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n";
    async function previous_version_add(historyButton) {
      const previousCommit = await async function(pathname) {
        const {user, repository, branch, filePath} = new GitHubFileURL(pathname), {resource} = await v4(previous_version_namespaceObject, {
          variables: {
            filePath,
            resource: `/${user}/${repository}/commit/${branch}`
          }
        });
        return resource.history.nodes[1]?.oid;
      }(location.href);
      if (!previousCommit) return;
      const url = new GitHubFileURL(location.href).assign({
        branch: previousCommit
      });
      historyButton.before(dom_chef.createElement("a", {
        href: url.href,
        className: "UnderlineNav-item tooltipped tooltipped-n ml-2",
        "aria-label": "View previous version"
      }, dom_chef.createElement(Versions, {
        className: "UnderlineNav-octicon mr-0"
      })));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/previous-version.tsx", {
      include: [ isSingleFile ],
      exclude: [ isRepoFile404 ],
      init: async function(signal) {
        observe("a.react-last-commit-history-group", previous_version_add, {
          signal
        });
      }
    });
    const Bell = props => createElement("svg", {
      className: "octicon octicon-bell",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.516 1.516 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947Zm5-3.5A3.5 3.5 0 0 0 4.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 0 0-.003.01l.001.006c0 .002.002.004.004.006l.006.004.007.001h10.964l.007-.001.006-.004.004-.006.001-.007a.017.017 0 0 0-.003-.01l-1.703-2.554a1.745 1.745 0 0 1-.294-.97V5A3.5 3.5 0 0 0 8 1.5Z"
    })), BellSlash = props => createElement("svg", {
      className: "octicon octicon-bell-slash",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "m4.182 4.31.016.011 10.104 7.316.013.01 1.375.996a.75.75 0 1 1-.88 1.214L13.626 13H2.518a1.516 1.516 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947V5.305L.31 3.357a.75.75 0 1 1 .88-1.214Zm7.373 7.19L4.5 6.391v1.556c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 0 0-.003.01c0 .005.002.009.005.012l.006.004.007.001ZM8 1.5c-.997 0-1.895.416-2.534 1.086A.75.75 0 1 1 4.38 1.55 5 5 0 0 1 13 5v2.373a.75.75 0 0 1-1.5 0V5A3.5 3.5 0 0 0 8 1.5ZM8 16a2 2 0 0 1-1.985-1.75c-.017-.137.097-.25.235-.25h3.5c.138 0 .252.113.235.25A2 2 0 0 1 8 16Z"
    })), IssueReopened = props => createElement("svg", {
      className: "octicon octicon-issue-reopened",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 0 1.492-.154 8 8 0 0 0-14.315-4.03L.427 1.927A.25.25 0 0 0 0 2.104V5.75A.25.25 0 0 0 .25 6h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.491 6.491 0 0 1 2.314-1.998ZM1.262 8.169a.75.75 0 0 0-1.22.658 8.001 8.001 0 0 0 14.315 4.03l1.216 1.216a.25.25 0 0 0 .427-.177V10.25a.25.25 0 0 0-.25-.25h-3.646a.25.25 0 0 0-.177.427l1.358 1.358a6.501 6.501 0 0 1-11.751-3.11.75.75 0 0 0-.272-.506Z"
    }), createElement("path", {
      d: "M9.06 9.06a1.5 1.5 0 1 1-2.12-2.12 1.5 1.5 0 0 1 2.12 2.12Z"
    })), disableAttributes = {
      "aria-selected": !0,
      className: "selected",
      tabIndex: -1,
      style: {
        pointerEvents: "none"
      }
    };
    function SubButton() {
      return dom_chef.createElement("button", {
        "data-disable-with": !0,
        name: "id",
        type: "submit",
        className: "btn btn-sm flex-1 BtnGroup-item tooltipped tooltipped-sw"
      });
    }
    function getReasonElement(subscriptionButton) {
      return subscriptionButton.closest(".thread-subscription-status").querySelector("p.reason");
    }
    function status_subscription_addButton(subscriptionButton) {
      const status = function(subscriptionButton) {
        const reason = getReasonElement(subscriptionButton).textContent;
        if (reason.includes("custom settings")) return "status";
        if (reason.includes("not receiving")) return "none"; else return "all";
      }(subscriptionButton), originalId = subscriptionButton.form.elements.id;
      subscriptionButton.after(dom_chef.createElement("div", {
        className: "BtnGroup d-flex width-full"
      }, dom_chef.createElement(SubButton, {
        value: "unsubscribe",
        "aria-label": "Unsubscribe",
        ..."none" === status && disableAttributes
      }, dom_chef.createElement(BellSlash, null), " None"), dom_chef.createElement(SubButton, {
        value: "subscribe",
        "aria-label": "Subscribe to all events",
        ..."all" === status && disableAttributes
      }, dom_chef.createElement(Bell, null), " All"), dom_chef.createElement(SubButton, {
        value: "subscribe_to_custom_notifications",
        "aria-label": "Subscribe just to status changes\n(closing, reopening, merging)",
        ..."status" === status && disableAttributes
      }, dom_chef.createElement(IssueReopened, null), " Status")), dom_chef.createElement("input", {
        type: "hidden",
        name: "events[]",
        value: "merged"
      }), dom_chef.createElement("input", {
        type: "hidden",
        name: "events[]",
        value: "closed"
      }), dom_chef.createElement("input", {
        type: "hidden",
        name: "events[]",
        value: "reopened"
      }));
      originalId.remove();
      subscriptionButton.hidden = !0;
      if ("all" !== status) getReasonElement(subscriptionButton).hidden = !0;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/status-subscription.tsx", {
      include: [ isConversation ],
      awaitDomReady: !0,
      init: function(signal) {
        observe("button[data-thread-subscribe-button]:not([disabled])", status_subscription_addButton, {
          signal
        });
      }
    });
    function setSearchParameter(anchorElement, name, value) {
      const parameters = new URLSearchParams(anchorElement.search);
      parameters.set(name, value);
      anchorElement.search = String(parameters);
    }
    async function addForRepositoryActions(prLink) {
      const prNumber = prLink.textContent.slice(1);
      setSearchParameter(prLink.closest(".Box-row").querySelector("a.Link--primary"), "pr", prNumber);
    }
    async function addForPR(actionLink) {
      setSearchParameter(actionLink, "pr", String(getConversationNumber()));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/action-pr-link.tsx", {
      include: [ isRepositoryActions ],
      init: async function(signal) {
        observe('div.Box-row[id^=check_suite_] a[data-hovercard-type="pull_request"]', addForRepositoryActions, {
          signal
        });
      }
    }, {
      include: [ isPR ],
      init: async function(signal) {
        observe('main [href="/apps/github-actions"] ~ div a.status-actions', addForPR, {
          signal
        });
      }
    });
    const excludePreset = /^bump |^meta|^document|^lint|^refactor|readme|dependencies|^v?\d+\.\d+\.\d+/i;
    function dim(commitTitle) {
      if (excludePreset.test(commitTitle.textContent.trim())) commitTitle.closest('[data-testid="commit-row-item"]').style.opacity = "50%";
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-dim-commits.tsx", {
      asLongAs: [ isRefinedGitHubRepo ],
      include: [ isCommitList ],
      init: function(signal) {
        observe('[data-testid="listview-item-title-container"] .markdown-title span', dim, {
          signal
        });
      }
    });
    feature_manager.addCssFeature("file:///home/runner/work/refined-github/refined-github/source/features/mobile-tabs.tsx", [ hasRepoHeader ]);
    const Lock = props => createElement("svg", {
      className: "octicon octicon-lock",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 1 0-5 0v2Z"
    })), Star = props => createElement("svg", {
      className: "octicon octicon-star",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
    })), repositoryInfo = new CachedFunction("stargazer-count", {
      async updater() {
        const {repository} = await v4("query GetRepositoryInfo($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tstargazerCount\n\t\tisFork\n\t\tisPrivate\n\t}\n}\n");
        return repository;
      },
      maxAge: {
        days: 1
      },
      staleWhileRevalidate: {
        days: 3
      },
      cacheKey: cacheByRepo
    });
    async function repo_header_info_add(repoLink) {
      const {isFork, isPrivate, stargazerCount} = await repositoryInfo.get();
      if (isPrivate && !elementExists(".octicon-lock", repoLink)) repoLink.append(dom_chef.createElement(Lock, {
        className: "ml-1",
        width: 12,
        height: 12
      }));
      if (isFork && !elementExists(".octicon-repo-forked", repoLink)) repoLink.append(dom_chef.createElement(RepoForked, {
        className: "ml-1",
        width: 12,
        height: 12
      }));
      if (stargazerCount > 1) repoLink.after(dom_chef.createElement("a", {
        href: buildRepoURL("stargazers"),
        title: `Repository starred by ${stargazerCount.toLocaleString("us")} people`,
        className: "d-flex flex-items-center flex-justify-center mr-1 gap-1 color-fg-muted"
      }, dom_chef.createElement(Star, {
        className: "ml-1",
        width: 12,
        height: 12
      }), dom_chef.createElement("span", {
        className: "f5"
      }, abbreviateNumber(stargazerCount))));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/repo-header-info.tsx", {
      include: [ hasRepoHeader ],
      init: function(signal) {
        observe(".AppHeader-context-full li:last-child a.AppHeader-context-item", repo_header_info_add, {
          signal
        });
      }
    });
    function extract(textarea) {
      replaceFieldText(textarea, /<!--(.+)-->\n/s, ((_, match) => {
        textarea.closest("tab-container").before(dom_chef.createElement("div", {
          style: {
            whiteSpace: "pre-wrap"
          },
          className: "flash mb-3 p-3"
        }, match.trim()));
        return "";
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/rgh-pr-template.tsx", {
      asLongAs: [ isRefinedGitHubRepo, isCompare ],
      init: function(signal) {
        observe("#pull_request_body", extract, {
          signal
        });
      }
    });
    const id = feature_manager.getFeatureID("file:///home/runner/work/refined-github/refined-github/source/features/close-as-unplanned.tsx"), unplannedCheckbox = 'input[name="state_reason"][value="not_planned"]';
    function close_as_unplanned_update(dropdown) {
      const form = dropdown.closest("form"), radio = expectElement(unplannedCheckbox, dropdown), mainButton = expectElement('[name="comment_and_close"]', form), icon = expectElement(".octicon-skip", dropdown), checkbox = radio.cloneNode();
      checkbox.hidden = !0;
      checkbox.type = "checkbox";
      mainButton.classList.add("tooltipped", "tooltipped-nw");
      mainButton.setAttribute("aria-label", "Done, closed, fixed, resolved");
      const unplannedButton = mainButton.cloneNode();
      unplannedButton.append(icon);
      unplannedButton.id = id;
      unplannedButton.classList.add("btn", "tooltipped", "tooltipped-nw", "mr-0");
      unplannedButton.classList.remove("js-comment-and-button");
      unplannedButton.setAttribute("aria-label", "Close as not planned.\nWon’t fix, can’t repro, duplicate, stale");
      dropdown.replaceWith(unplannedButton);
      form.append(checkbox);
    }
    function updateCheckbox({delegateTarget: button}) {
      select_dom_$(unplannedCheckbox, button.form).checked = button.id === id;
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/close-as-unplanned.tsx", {
      include: [ isIssue ],
      init: function(signal) {
        observe("close-reason-selector .select-menu", close_as_unplanned_update, {
          signal
        });
        delegate_it_delegate('[name="comment_and_close"]', "click", updateCheckbox, {
          signal
        });
      }
    });
    function LockedIndicator() {
      return dom_chef.createElement("span", {
        title: "Locked",
        className: "State d-flex flex-items-center flex-shrink-0"
      }, dom_chef.createElement(Lock, {
        className: "flex-items-center mr-1"
      }), "Locked");
    }
    function addLock(element) {
      const classes = (element.closest(".gh-header-sticky") ? "mr-2 " : "") + "mb-2 rgh-locked-issue";
      element.after(dom_chef.createElement(LockedIndicator, {
        className: classes
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/locked-issue.tsx", {
      asLongAs: [ webext_detect_page_isChrome ],
      include: [ isConversation ],
      exclude: [ isEnterprise ],
      init: function(signal) {
        observe("\n\t\t.logged-in .js-issues-results:has(.js-pick-reaction:first-child) :is(\n\t\t\t.gh-header-meta > :first-child,\n\t\t\t.gh-header-sticky .flex-row > :first-child\n\t\t)\n\t", addLock, {
          signal
        });
      }
    });
    const ArrowUpRight = props => createElement("svg", {
      className: "octicon octicon-arrow-up-right",
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      role: "img",
      "aria-hidden": "true",
      ...props
    }, createElement("path", {
      d: "M4.53 4.75A.75.75 0 0 1 5.28 4h6.01a.75.75 0 0 1 .75.75v6.01a.75.75 0 0 1-1.5 0v-4.2l-5.26 5.261a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L9.48 5.5h-4.2a.75.75 0 0 1-.75-.75Z"
    }));
    async function visit_tag_addLink(branchSelector2) {
      const tag = branchSelector2.getAttribute("aria-label")?.replace(/ tag$/, "");
      if (tag) wrapAll(dom_chef.createElement("div", {
        className: "d-flex gap-2"
      }), branchSelector2, dom_chef.createElement("a", {
        className: "btn px-2 tooltipped tooltipped-se",
        href: buildRepoURL("releases/tag", tag),
        "aria-label": "Visit tag"
      }, dom_chef.createElement(ArrowUpRight, {
        className: "v-align-middle"
      }))); else feature_manager.log.error("file:///home/runner/work/refined-github/refined-github/source/features/visit-tag.tsx", "Tag not found in DOM. The feature needs to be updated");
    }
    function replaceIcon(tagIcon) {
      tagIcon.replaceWith(dom_chef.createElement(Code, null));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/visit-tag.tsx", {
      include: [ isRepoTree, isSingleFile ],
      init: function(signal) {
        observe(`:is(${branchSelector}):has(.octicon-tag)`, visit_tag_addLink, {
          signal
        });
      }
    }, {
      include: [ isReleasesOrTags, isSingleReleaseOrTag ],
      init: function(signal) {
        observe('.Link[href*="/tree/"] svg.octicon-tag', replaceIcon, {
          signal
        });
      }
    });
    function prevent_comment_loss_openInNewTab(event) {
      event.preventDefault();
      window.open(event.delegateTarget.href, "_blank");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/prevent-comment-loss.tsx", {
      include: [ hasRichTextEditor, isEditingFile ],
      init: function(signal) {
        delegate_it_delegate([ ".js-preview-body a", ".html-blob a" ].join(", "), "click", filterAlteredClicks(prevent_comment_loss_openInNewTab), {
          signal
        });
      }
    });
    function redirectToIssues(event) {
      const form = event.delegateTarget;
      if (!new SearchQuery(form.elements["js-issues-search"].value).includes("is:pr")) form.action = form.action.replace(/\/pulls$/, "/issues");
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/fix-no-pr-search.tsx", {
      include: [ isRepoPRList ],
      init: function(signal) {
        delegate_it_delegate('form.subnav-search[action$="/pulls"]', "submit", redirectToIssues, {
          signal,
          capture: !0
        });
      }
    });
    function maybeCleanUrl(event) {
      const parsed = new URL(event?.destination.url ?? location.href);
      if ("readme-ov-file" === parsed.searchParams.get("tab")) {
        parsed.searchParams.delete("tab");
        history.replaceState(history.state, "", parsed.href);
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/clean-readme-url.tsx", {
      include: [ isRepoHome ],
      init: function(signal) {
        maybeCleanUrl();
        window.navigation?.addEventListener("navigate", maybeCleanUrl, {
          signal
        });
      }
    });
    const regex = /\/files\/[\da-f]{40}..[\da-f]{40}$/;
    function trimLink(link) {
      if (regex.test(link.pathname)) {
        link.pathname = link.pathname.replace(regex, "");
        link.hash = "#issue-comment-box";
      }
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/pr-notification-link.tsx", {
      include: [ isNotifications ],
      init: function(signal) {
        observe('[href*="/pull/"][href*="/files/"][href*=".."]', trimLink, {
          signal
        });
      }
    });
    function click_outside_modal_onButtonClick({delegateTarget: delegate2, target}) {
      if (delegate2 === target) delegate2.dispatchEvent(new KeyboardEvent("keydown", {
        bubbles: !0,
        key: "Escape",
        code: "Escape"
      }));
    }
    feature_manager.add("file:///home/runner/work/refined-github/refined-github/source/features/click-outside-modal.tsx", {
      include: [ isBranches, isRepoCommitList, isRepoTree, isSingleFile ],
      init: function(signal) {
        delegate_it_delegate('[class*="Dialog__Backdrop-"]', "click", click_outside_modal_onButtonClick, {
          signal
        });
      }
    });
  })();
})();
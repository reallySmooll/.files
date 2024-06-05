(() => {
  var __webpack_modules__ = {
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
  (() => {
    "use strict";
    const svgTags = new Set([ "a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "animation", "audio", "canvas", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "handler", "hkern", "iframe", "image", "line", "linearGradient", "listener", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "prefetch", "radialGradient", "rect", "script", "set", "solidColor", "stop", "style", "svg", "switch", "symbol", "tbreak", "text", "textArea", "textPath", "title", "tref", "tspan", "unknown", "use", "video", "view", "vkern" ]);
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
    }, dom_chef = {
      createElement: h,
      Fragment: "function" == typeof DocumentFragment ? DocumentFragment : () => {}
    }, doma = html => {
      if (null == html) return new DocumentFragment;
      const template = document.createElement("template");
      template.innerHTML = html;
      return template.content;
    };
    doma.one = html => doma(html).firstElementChild ?? void 0;
    const node_modules_doma = doma;
    function select_dom_$(selectors, baseElement) {
      if (2 !== arguments.length || baseElement) return (baseElement ?? document).querySelector(String(selectors)) ?? void 0;
    }
    function select_dom_elementExists(selectors, baseElement) {
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
    function listener(event) {
      fitTextarea(event.target);
    }
    fitTextarea.watch = function(elements) {
      if ("string" == typeof elements) elements = document.querySelectorAll(elements); else if (elements instanceof HTMLTextAreaElement) elements = [ elements ];
      for (const element of elements) {
        element.addEventListener("input", listener);
        if (element.form) element.form.addEventListener("reset", listener);
        fitTextarea(element);
      }
    };
    const fit_textarea = fitTextarea, BYTE_UNITS = [ "B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], BIBYTE_UNITS = [ "B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB" ], BIT_UNITS = [ "b", "kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit" ], BIBIT_UNITS = [ "b", "kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit" ], toLocaleString = (number, locale, options) => {
      let result = number;
      if ("string" == typeof locale || Array.isArray(locale)) result = number.toLocaleString(locale, options); else if (!0 === locale || void 0 !== options) result = number.toLocaleString(void 0, options);
      return result;
    };
    function prettyBytes(number, options) {
      if (!Number.isFinite(number)) throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`);
      const UNITS = (options = {
        bits: !1,
        binary: !1,
        space: !0,
        ...options
      }).bits ? options.binary ? BIBIT_UNITS : BIT_UNITS : options.binary ? BIBYTE_UNITS : BYTE_UNITS, separator = options.space ? " " : "";
      if (options.signed && 0 === number) return ` 0${separator}${UNITS[0]}`;
      const isNegative = number < 0, prefix = isNegative ? "-" : options.signed ? "+" : "";
      if (isNegative) number = -number;
      let localeOptions;
      if (void 0 !== options.minimumFractionDigits) localeOptions = {
        minimumFractionDigits: options.minimumFractionDigits
      };
      if (void 0 !== options.maximumFractionDigits) localeOptions = {
        maximumFractionDigits: options.maximumFractionDigits,
        ...localeOptions
      };
      if (number < 1) {
        return prefix + toLocaleString(number, options.locale, localeOptions) + separator + UNITS[0];
      }
      const exponent = Math.min(Math.floor(options.binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3), UNITS.length - 1);
      number /= (options.binary ? 1024 : 1e3) ** exponent;
      if (!localeOptions) number = number.toPrecision(3);
      return prefix + toLocaleString(Number(number), options.locale, localeOptions) + separator + UNITS[exponent];
    }
    const {toString: assert_error_toString} = Object.prototype;
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
    function enableTabToIndent(elements, signal) {
      if ("string" == typeof elements) elements = document.querySelectorAll(elements); else if (elements instanceof HTMLTextAreaElement) elements = [ elements ];
      for (const element of elements) element.addEventListener("keydown", tabToIndentListener, {
        signal
      });
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
    const isWebPage = once((() => [ "about:", "http:", "https:" ].includes(location.protocol))), isExtensionContext = once((() => "object" == typeof globalThis.chrome?.extension)), isContentScript = once((() => isExtensionContext() && isWebPage())), isBackgroundPage = once((() => {
      const manifest = getManifest();
      if (manifest && isCurrentPathname(manifest.background_page ?? manifest.background?.page)) return !0; else return Boolean(manifest?.background?.scripts && isCurrentPathname("/_generated_background_page.html"));
    })), isBackgroundWorker = once((() => isCurrentPathname(getManifest()?.background?.service_worker))), isOptionsPage = (once((() => isBackgroundPage() && 2 === getManifest()?.manifest_version && !1 !== getManifest()?.background?.persistent)), 
    once((() => {
      const path = getManifest()?.options_ui?.page;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    }))), isSidePanel = once((() => {
      const path = getManifest()?.side_panel?.default_path;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), isDevToolsPage = once((() => {
      const devtoolsPage = isExtensionContext() && chrome.devtools && getManifest()?.devtools_page;
      if ("string" != typeof devtoolsPage) return !1;
      return new URL(devtoolsPage, location.origin).pathname === location.pathname;
    })), isFirefox = () => globalThis.navigator?.userAgent.includes("Firefox"), isChrome = () => globalThis.navigator?.userAgent.includes("Chrome"), contextChecks = {
      contentScript: isContentScript,
      background: () => isBackgroundPage() || isBackgroundWorker(),
      options: isOptionsPage,
      sidePanel: isSidePanel,
      devTools: () => Boolean(globalThis.chrome?.devtools),
      devToolsPage: isDevToolsPage,
      extension: isExtensionContext,
      web: isWebPage
    };
    Object.keys(contextChecks);
    function featureLink(id) {
      return `https://github.com/refined-github/refined-github/blob/main/source/features/${id}.tsx`;
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
    const webext_detect_page_isWebPage = webext_detect_page_once((() => [ "about:", "http:", "https:" ].includes(location.protocol))), webext_detect_page_isExtensionContext = webext_detect_page_once((() => "object" == typeof globalThis.chrome?.extension)), webext_detect_page_isBackgroundPage = (webext_detect_page_once((() => webext_detect_page_isExtensionContext() && webext_detect_page_isWebPage())), 
    webext_detect_page_once((() => {
      const manifest = webext_detect_page_getManifest();
      if (manifest && webext_detect_page_isCurrentPathname(manifest.background_page ?? manifest.background?.page)) return !0; else return Boolean(manifest?.background?.scripts && webext_detect_page_isCurrentPathname("/_generated_background_page.html"));
    })));
    webext_detect_page_once((() => webext_detect_page_isCurrentPathname(webext_detect_page_getManifest()?.background?.service_worker))), 
    webext_detect_page_once((() => {
      const path = webext_detect_page_getManifest()?.options_ui?.page;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), webext_detect_page_once((() => {
      const path = webext_detect_page_getManifest()?.side_panel?.default_path;
      if ("string" != typeof path) return !1;
      return new URL(path, location.origin).pathname === location.pathname;
    })), webext_detect_page_once((() => {
      const devtoolsPage = webext_detect_page_isExtensionContext() && chrome.devtools && webext_detect_page_getManifest()?.devtools_page;
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
      if (webext_detect_page_isExtensionContext()) globalThis.webextStorageCache = legacy_cache;
      if (webext_detect_page_isBackgroundPage()) if (chrome.alarms) {
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
    };
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
    const reservedNames = [ "300", "302", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "500", "501", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "693", "694", "695", "900", "about", "access", "account", "admin", "advisories", "anonymous", "any", "api", "apps", "attributes", "auth", "billing", "blob", "blog", "bounty", "branches", "business", "businesses", "c", "cache", "case-studies", "categories", "central", "certification", "changelog", "chat", "cla", "cloud", "codereview", "collection", "collections", "comments", "commit", "commits", "community", "companies", "compare", "contact", "contributing", "cookbook", "coupons", "customer-stories", "customer", "customers", "dashboard-feed", "dashboard", "dashboards", "design", "develop", "developer", "diff", "discover", "discussions", "docs", "downloads", "downtime", "editor", "editors", "edu", "enterprise", "events", "explore", "featured", "features", "files", "fixtures", "forked", "garage", "ghost", "gist", "gists", "graphs", "guide", "guides", "help", "help-wanted", "home", "hooks", "hosting", "hovercards", "identity", "images", "inbox", "individual", "info", "integration", "interfaces", "introduction", "invalid-email-address", "investors", "issues", "jobs", "join", "journal", "journals", "lab", "labs", "languages", "launch", "layouts", "learn", "legal", "library", "linux", "listings", "lists", "login", "logos", "logout", "mac", "maintenance", "malware", "man", "marketplace", "mention", "mentioned", "mentioning", "mentions", "migrating", "milestones", "mine", "mirrors", "mobile", "navigation", "network", "new", "news", "none", "nonprofit", "nonprofits", "notices", "notifications", "oauth", "offer", "open-source", "organisations", "organizations", "orgs", "pages", "partners", "payments", "personal", "plans", "plugins", "popular", "popularity", "posts", "press", "pricing", "professional", "projects", "pulls", "raw", "readme", "recommendations", "redeem", "releases", "render", "reply", "repositories", "resources", "restore", "revert", "save-net-neutrality", "saved", "scraping", "search", "security", "services", "sessions", "settings", "shareholders", "shop", "showcases", "signin", "signup", "site", "spam", "sponsors", "ssh", "staff", "starred", "stars", "static", "status", "statuses", "storage", "store", "stories", "styleguide", "subscriptions", "suggest", "suggestion", "suggestions", "support", "suspended", "talks", "teach", "teacher", "teachers", "teaching", "team", "teams", "ten", "terms", "timeline", "topic", "topics", "tos", "tour", "train", "training", "translations", "tree", "trending", "updates", "username", "users", "visualization", "w", "watching", "wiki", "windows", "works-with", "www0", "www1", "www2", "www3", "www4", "www5", "www6", "www7", "www8", "www9" ], distribution_$ = selector => document.querySelector(selector), is404 = () => /^(Page|File) not found · GitHub/.test(document.title), isEnterprise = (url = location) => "github.com" !== url.hostname && "gist.github.com" !== url.hostname, isGist = (url = location) => "string" == typeof getCleanGistPathname(url), isRepo = (url = location) => /^[^/]+\/[^/]+/.test(getCleanPathname(url)) && !reservedNames.includes(url.pathname.split("/", 2)[1]) && !((url = location) => !isGist(url) && /^$|^(orgs\/[^/]+\/)?dashboard(-feed)?(\/|$)/.test(getCleanPathname(url)))(url) && !isGist(url) && !isNewRepoTemplate(url), isNewRepoTemplate = (url = location) => Boolean("generate" === url.pathname.split("/")[3]), getUsername = () => distribution_$('meta[name="user-login"]')?.getAttribute("content"), getCleanPathname = (url = location) => url.pathname.replaceAll(/\/+/g, "/").slice(1, url.pathname.endsWith("/") ? -1 : void 0), getCleanGistPathname = (url = location) => {
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
        const canonical = distribution_$('[property="og:url"]');
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
    }, splitDev = v => String(v).split("-"), splitSub = v => String(v).replace(/^[vr]/, "").replace(/([a-z]+)/gi, ".$1.").replace(/\.+/g, ".").split("."), offset = part => {
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
    function tiny_version_compare_compareVersions(a, b) {
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
    new globalThis.TextEncoder;
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
        }(content)) if (featureID && relatedIssue && (!unaffectedVersion || tiny_version_compare_compareVersions(unaffectedVersion, currentVersion) > 0)) storage.push([ featureID, relatedIssue, unaffectedVersion ]);
        return storage;
      },
      maxAge: {
        hours: 6
      },
      staleWhileRevalidate: {
        days: 30
      }
    }), styleHotfixes = new CachedFunction("style-hotfixes", {
      updater: async version => fetchHotfix(`style/${version}.css`),
      maxAge: {
        hours: 6
      },
      staleWhileRevalidate: {
        days: 300
      },
      cacheKey: () => ""
    });
    async function getLocalHotfixes() {
      if (isDevelopmentVersion()) return []; else return await brokenFeatures.get() ?? [];
    }
    async function getLocalHotfixesAsOptions() {
      const options = {};
      for (const [feature] of await getLocalHotfixes()) options[`feature:${feature}`] = !1;
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
    const readme_importedFeatures = [ "action-pr-link", "action-used-by-link", "actionable-pr-view-file", "align-issue-labels", "archive-forks-link", "avoid-accidental-submissions", "batch-mark-files-as-viewed", "bugs-tab", "ci-link", "clean-conversation-filters", "clean-conversation-headers", "clean-conversation-sidebar", "clean-pinned-issues", "clean-readme-url", "clean-repo-filelist-actions", "clean-repo-sidebar", "clean-repo-tabs", "clean-rich-text-editor", "clear-pr-merge-commit-message", "click-outside-modal", "close-as-unplanned", "close-out-of-view-modals", "closing-remarks", "collapsible-content-button", "command-palette-navigation-shortcuts", "comment-fields-keyboard-shortcuts", "comment-on-draft-pr-indicator", "comments-time-machine-links", "conflict-marker", "conversation-activity-filter", "conversation-links-on-repo-lists", "convert-pr-to-draft-improvements", "convert-release-to-draft", "copy-on-y", "create-release-shortcut", "cross-deleted-pr-branches", "deep-reblame", "default-branch-button", "dim-bots", "download-folder-button", "easy-toggle-commit-messages", "easy-toggle-files", "embed-gist-inline", "embed-gist-via-iframe", "emphasize-draft-pr-label", "esc-to-cancel", "esc-to-deselect-line", "expand-all-hidden-comments", "extend-conversation-status-filters", "extend-diff-expander", "file-age-color", "fit-textareas", "fix-no-pr-search", "github-actions-indicators", "global-conversation-list-filters", "hidden-review-comments-indicator", "hide-diff-signs", "hide-inactive-deployments", "hide-issue-list-autocomplete", "hide-low-quality-comments", "hide-navigation-hover-highlight", "hide-newsfeed-noise", "hide-user-forks", "highest-rated-comment", "highlight-collaborators-and-own-conversations", "highlight-non-default-base-branch", "html-preview-link", "improve-shortcut-help", "infinite-scroll", "jump-to-change-requested-comment", "jump-to-conversation-close-event", "keyboard-navigation", "last-notification-page-button", "link-to-changelog-file", "link-to-compare-diff", "link-to-github-io", "linkify-branch-references", "linkify-code", "linkify-commit-sha", "linkify-labels-on-dashboard", "linkify-notification-repository-header", "linkify-symbolic-links", "linkify-user-edit-history-popup", "linkify-user-labels", "linkify-user-location", "list-prs-for-branch", "list-prs-for-file", "locked-issue", "mark-merge-commits-in-list", "mark-private-orgs", "mobile-tabs", "more-conversation-filters", "more-dropdown-links", "more-file-links", "netiquette", "new-or-deleted-file", "new-repo-disable-projects-and-wikis", "no-duplicate-list-update-time", "no-unnecessary-split-diff-view", "one-click-diff-options", "one-click-pr-or-gist", "one-click-review-submission", "one-key-formatting", "open-all-conversations", "open-all-notifications", "open-issue-to-latest-comment", "pagination-hotkey", "parse-backticks", "patch-diff-links", "pinned-issues-update-time", "pr-base-commit", "pr-branch-auto-delete", "pr-commit-lines-changed", "pr-filters", "pr-first-commit-title", "pr-jump-to-first-non-viewed-file", "pr-notification-link", "prevent-comment-loss", "prevent-duplicate-pr-submission", "prevent-link-loss", "prevent-pr-merge-panel-opening", "preview-hidden-comments", "previous-next-commit-buttons", "previous-version", "profile-gists-link", "profile-hotkey", "pull-request-hotkeys", "quick-comment-edit", "quick-comment-hiding", "quick-file-edit", "quick-label-removal", "quick-mention", "quick-new-issue", "quick-repo-deletion", "quick-review", "quick-review-comment-deletion", "reactions-avatars", "release-download-count", "releases-dropdown", "releases-tab", "reload-failed-proxied-images", "repo-age", "repo-avatars", "repo-header-info", "repo-wide-file-finder", "resolve-conflicts", "restore-file", "rgh-dim-commits", "rgh-feature-descriptions", "rgh-improve-new-issue-form", "rgh-linkify-features", "rgh-linkify-yolo-issues", "rgh-netiquette", "rgh-pr-template", "rgh-welcome-issue", "same-branch-author-commits", "scrollable-areas", "select-all-notifications-shortcut", "select-notifications", "selection-in-new-tab", "shorten-links", "show-associated-branch-prs-on-fork", "show-names", "show-open-prs-of-forks", "show-user-top-repositories", "show-whitespace", "small-user-avatars", "sort-conversations-by-update-time", "status-subscription", "sticky-sidebar", "stop-redirecting-in-notification-bar", "submission-via-ctrl-enter-everywhere", "suggest-commit-title-limit", "swap-branches-on-compare", "sync-pr-commit-title", "tab-to-indent", "table-input", "tag-changes-link", "tags-on-commits-list", "toggle-everything-with-alt", "toggle-files-button", "unfinished-comments", "unreleased-commits", "unwrap-unnecessary-dropdowns", "update-pr-from-base-branch", "useful-not-found-page", "user-local-time", "user-profile-follower-badge", "vertical-front-matter", "view-last-pr-deployment", "visit-tag", "warn-pr-from-master", "warning-for-disallow-edits" ], featuresMeta = [ {
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
    } ];
    var used_storage_browser = __webpack_require__(131);
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
    }, Object.fromEntries(readme_importedFeatures.map((id => [ `feature:${id}`, !0 ])))), renamedFeatures = new Map([ [ "separate-draft-pr-button", "one-click-pr-or-gist" ], [ "prevent-pr-commit-link-loss", "prevent-link-loss" ], [ "remove-projects-tab", "remove-unused-repo-tabs" ], [ "remove-unused-repo-tabs", "clean-repo-tabs" ], [ "more-dropdown", "clean-repo-tabs" ], [ "remove-diff-signs", "hide-diff-signs" ], [ "remove-label-faster", "quick-label-hiding" ], [ "edit-files-faster", "quick-file-edit" ], [ "edit-comments-faster", "quick-comment-edit" ], [ "delete-review-comments-faster", "quick-review-comment-deletion" ], [ "hide-comments-faster", "quick-comment-hiding" ], [ "faster-reviews", "quick-review" ], [ "faster-pr-diff-options", "quick-pr-diff-options" ], [ "hide-useless-comments", "hide-low-quality-comments" ], [ "hide-useless-newsfeed-events", "hide-newsfeed-noise" ], [ "hide-noisy-newsfeed-events", "hide-newsfeed-noise" ], [ "no-useless-split-diff-view", "no-unnecessary-split-diff-view" ], [ "unwrap-useless-dropdowns", "unwrap-unnecessary-dropdowns" ], [ "tag-changelog-link", "tag-changes-link" ], [ "navigate-pages-with-arrow-keys", "pagination-hotkey" ], [ "list-pr-for-branch", "list-prs-for-branch" ], [ "quick-label-hiding", "quick-label-removal" ], [ "next-scheduled-github-action", "github-actions-indicators" ], [ "raw-file-link", "more-file-links" ], [ "conversation-filters", "more-conversation-filters" ], [ "quick-pr-diff-options", "one-click-diff-options" ], [ "quick-review-buttons", "one-click-review-submission" ], [ "pull-request-hotkey", "pull-request-hotkeys" ], [ "first-published-tag-for-merged-pr", "closing-remarks" ], [ "scheduled-and-manual-workflow-indicators", "github-actions-indicators" ], [ "useful-forks", "fork-notice" ], [ "set-default-repositories-type-to-sources", "hide-user-forks" ], [ "highlight-deleted-and-added-files-in-diffs", "new-or-deleted-file" ], [ "enable-file-links-in-compare-view", "actionable-pr-view-file" ], [ "use-first-commit-message-for-new-prs", "pr-first-commit-title`" ] ]);
    const perDomainOptions = new OptionsSyncPerDomain({
      defaults,
      migrations: [ function(options) {
        for (const [from, to] of renamedFeatures) if ("boolean" == typeof options[`feature:${from}`]) options[`feature:${to}`] = options[`feature:${from}`];
      }, OptionsSyncPerDomain.migrations.removeUnused ]
    }), options_storage = perDomainOptions.getOptionsForOrigin();
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
    const doesBrowserActionOpenOptions = !isChrome() && globalThis.navigator?.userAgent.includes("Safari") && globalThis.navigator?.userAgent.includes("Mobile");
    const nullKey = Symbol("null");
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
    function element_ready_elementReady(selector, {target = document, stopOnDomReady = !0, waitForChildren = !0, timeout = Number.POSITIVE_INFINITY, predicate} = {}) {
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
    const state = new class {
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
      await element_ready_elementReady("body");
      createMessageBox(`Do you see the change or issue? (${function(count, single, plural = function(single) {
        return single + "s";
      }(single), zero) {
        if (0 === count && zero) return zero.replace("$$", "0");
        if (1 === count) return single.replace("$$", "1"); else return plural.replace("$$", String(count));
      }(steps, "last step", "$$ steps remaining")})`, dom_chef.createElement("div", null, dom_chef.createElement("button", {
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
      for (const feature of readme_importedFeatures) {
        const index = bisectedFeatures.indexOf(feature);
        temporaryOptions[`feature:${feature}`] = index > -1 && index < half;
      }
      console.log(temporaryOptions);
      return temporaryOptions;
    }
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
    const dist_cacheStore = new WeakMap, cacheTimerStore = new WeakMap;
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
      if ("Server Error · GitHub" !== document.title && "Unicorn! · GitHub" !== document.title && "504 Gateway Time-out" !== document.title && "Confirm password" !== document.title && "Confirm access" !== document.title) if (!select_dom_elementExists("[refined-github]")) {
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
        if (select_dom_elementExists("body.logged-out")) {
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
      if (!function(options, id) {
        return !1 === options[`feature:${id}`];
      }(await globalReady, id) || isFeaturePrivate(id)) for (const loader of loaders) {
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
          if (!deduplicate || !select_dom_elementExists(deduplicate)) setupPageLoad(id, details);
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
    }, feature_manager = features, calledFunctions = new WeakMap, onetime = (function_, options = {}) => {
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
    const node_modules_onetime = onetime, {getRepositoryInfo: github_helpers_getRepo, getCleanPathname: github_helpers_getCleanPathname} = (any`
	.js-comment-body p a:only-child:is(
		[href^="https://gist.github.com/"],
		[href^="${location.origin}/gist/"]
	)
`, any`
	.js-issue-row:has(
		.octicon-git-pull-request.color-fg-open,
		.octicon-git-pull-request-draft
	) a.js-navigation-open
`, any`
	div:has(
		> [aria-label^="Collapse "],
		> [aria-label^="Expand "]
	)
`, node_modules_onetime(utils.getUsername), utils);
    navigator.userAgent.includes("Macintosh");
    memoize((async () => {
      if (/^[\da-f]{40}$/.test(location.pathname.split("/")[4])) return !0; else return select_dom_elementExists(".octicon-tag", await element_ready_elementReady('[data-hotkey="w"]'));
    }), {
      cacheKey: () => location.pathname
    });
    memoize((async url => {
      const {ok} = await fetch(url, {
        method: "head"
      });
      return ok;
    }));
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
    };
    memoize((async (query, options = v3defaults) => {
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
    }), memoize((async (query, options = v4defaults) => {
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
    }), {
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
    const settings = options_storage.getAll();
    async function getToken() {
      const {personalToken} = await settings;
      return personalToken;
    }
    async function parseTokenScopes(headers) {
      const scopesHeader = headers.get("X-OAuth-Scopes");
      if (!scopesHeader) return [];
      const scopes = scopesHeader.split(", ");
      scopes.push("valid_token");
      if (scopes.includes("repo")) scopes.push("public_repo");
      if (scopes.includes("project")) scopes.push("read:project");
      return scopes;
    }
    var options_browser = __webpack_require__(131);
    let syncedForm;
    const {version: options_version} = options_browser.runtime.getManifest();
    function reportStatus({tokenType, error, text, scopes}) {
      const tokenStatus = select_dom_$("#validation");
      tokenStatus.textContent = text ?? "";
      if (error) tokenStatus.dataset.validation = "invalid"; else delete tokenStatus.dataset.validation;
      for (const ulist of $$("[data-token-type]")) ulist.style.display = ulist.dataset.tokenType === tokenType ? "" : "none";
      for (const scope of $$("[data-scope]")) if (scopes) scope.dataset.validation = scopes.includes(scope.dataset.scope) ? "valid" : "invalid"; else scope.dataset.validation = "";
    }
    async function getTokenScopes(personalToken) {
      const tokenLink = select_dom_$("a#personal-token-link"), url = "github.com" === tokenLink.host ? "https://api.github.com/" : `${tokenLink.origin}/api/v3/`, response = await fetch(url, {
        cache: "no-store",
        headers: {
          "User-Agent": "Refined GitHub",
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${personalToken}`
        }
      });
      if (!response.ok) {
        const details = await response.json();
        throw new Error(details.message);
      }
      return parseTokenScopes(response.headers);
    }
    function expandTokenSection() {
      select_dom_$("details#token").open = !0;
    }
    async function updateStorageUsage(area) {
      const storage = options_browser.storage[area], used = await async function(area) {
        const storage = used_storage_browser.storage[area];
        return "getBytesInUse" in storage ? storage.getBytesInUse() : (new TextEncoder).encode(Object.entries(await storage.get()).map((([key, value]) => key + JSON.stringify(value))).join("")).length;
      }(area), available = storage.QUOTA_BYTES - used;
      for (const output of $$(`.storage-${area}`)) output.textContent = available < 1e3 ? "FULL!" : available < 1e5 ? `Only ${prettyBytes(available)} available` : `${prettyBytes(used)} used`;
    }
    async function validateToken() {
      const tokenField = select_dom_$('input[name="personalToken"]'), tokenType = tokenField.value.startsWith("github_pat_") ? "fine_grained" : "classic";
      reportStatus({
        tokenType
      });
      if (tokenField.validity.valid && 0 !== tokenField.value.length) {
        reportStatus({
          text: "Validating…",
          tokenType
        });
        try {
          const [scopes, user] = await Promise.all([ getTokenScopes(tokenField.value), getNameFromToken(tokenField.value) ]);
          reportStatus({
            tokenType,
            text: `👤 @${user}`,
            scopes
          });
        } catch (error) {
          !function(value) {
            if (!(value instanceof Error || "[object Error]" === assert_error_toString.call(value))) throw new TypeError(`Expected an \`Error\`, got \`${JSON.stringify(value)}\` (${typeof value})`);
          }(error);
          reportStatus({
            tokenType,
            error: !0,
            text: error.message
          });
          expandTokenSection();
          throw error;
        }
      } else setTimeout(expandTokenSection, 100);
    }
    async function getNameFromToken(token) {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }), userData = await response.json();
      if (!response.ok) throw new Error(userData.message);
      return userData.login;
    }
    async function findFeatureHandler(event) {
      const options = await perDomainOptions.getOptionsForOrigin().getAll(), enabledFeatures = readme_importedFeatures.filter((featureId => options["feature:" + featureId]));
      await state.set(enabledFeatures);
      const button = event.target;
      button.disabled = !0;
      setTimeout((() => {
        button.disabled = !1;
      }), 1e4);
      select_dom_$("#find-feature-message").hidden = !1;
    }
    function summaryHandler(event) {
      if (!(event.ctrlKey || event.metaKey || event.shiftKey)) {
        event.preventDefault();
        if (event.altKey) for (const screenshotLink of $$(".screenshot-link")) toggleScreenshot(screenshotLink.parentElement); else {
          toggleScreenshot(event.delegateTarget.parentElement);
        }
      }
    }
    function toggleScreenshot(feature) {
      const toggle = feature.querySelector("input.screenshot-toggle");
      toggle.checked = !toggle.checked;
      const screenshot = feature.querySelector("img.screenshot");
      screenshot.src = screenshot.dataset.src;
    }
    function featuresFilterHandler(event) {
      const keywords = event.currentTarget.value.toLowerCase().replaceAll(/\W/g, " ").split(/\s+/).filter(Boolean);
      for (const feature of $$(".feature")) feature.hidden = !keywords.every((word => feature.dataset.text.includes(word)));
    }
    function focusFirstField({delegateTarget: section}) {
      (section.scrollIntoViewIfNeeded ?? section.scrollIntoView).call(section);
      if (section.open) {
        const field = select_dom_$("input, textarea", section);
        if (field) {
          field.focus();
          if (field instanceof HTMLTextAreaElement) fit_textarea(field);
        }
      }
    }
    async function showStoredCssHotfixes() {
      const cachedCSS = await styleHotfixes.getCached(options_version);
      select_dom_$("#hotfixes-field").textContent = isDevelopmentVersion() ? "Hotfixes are not applied in the development version." : "default" !== syncedForm.getSelectedDomain() ? "Hotfixes are not applied on GitHub Enterprise." : cachedCSS ?? "No CSS found in cache.";
    }
    function enableToggleAll({currentTarget: button}) {
      button.parentElement.remove();
      for (const ui of $$(".toggle-all-features")) ui.hidden = !1;
    }
    function disableAllFeatures() {
      for (const enabledFeature of $$(".feature-checkbox:checked")) enabledFeature.click();
      select_dom_$("details#features").open = !0;
    }
    function enableAllFeatures() {
      for (const disabledFeature of $$(".feature-checkbox:not(:checked)")) disabledFeature.click();
      select_dom_$("details#features").open = !0;
    }
    async function generateDom() {
      select_dom_$(".js-features").append(...featuresMeta.filter((feature => readme_importedFeatures.includes(feature.id))).map((feature => function({id, description, screenshot}) {
        return dom_chef.createElement("div", {
          className: "feature",
          "data-text": `${id} ${description}`.toLowerCase()
        }, dom_chef.createElement("input", {
          type: "checkbox",
          name: `feature:${id}`,
          id,
          className: "feature-checkbox"
        }), dom_chef.createElement("div", {
          className: "info"
        }, dom_chef.createElement("label", {
          className: "feature-name",
          htmlFor: id
        }, id), " ", dom_chef.createElement("a", {
          href: featureLink(id),
          className: "feature-link"
        }, "source"), dom_chef.createElement("input", {
          hidden: !0,
          type: "checkbox",
          className: "screenshot-toggle"
        }), screenshot && dom_chef.createElement("a", {
          href: screenshot,
          className: "screenshot-link"
        }, "screenshot"), dom_chef.createElement("p", {
          className: "description"
        }, node_modules_doma(description)), screenshot && dom_chef.createElement("img", {
          hidden: !0,
          "data-src": screenshot,
          className: "screenshot"
        })));
      }(feature))));
      await async function() {
        for (const [feature, relatedIssue] of await getLocalHotfixes()) if (readme_importedFeatures.includes(feature)) {
          const input = select_dom_$("#" + feature);
          input.disabled = !0;
          input.removeAttribute("name");
          select_dom_$(`.feature-name[for="${feature}"]`).after(dom_chef.createElement("span", {
            className: "hotfix-notice"
          }, " (Disabled due to ", createRghIssueLink(relatedIssue), ")"));
        }
      }();
      syncedForm = await perDomainOptions.syncForm("form");
      select_dom_$("#js-failed").remove();
      !function() {
        const container = select_dom_$(".js-features");
        for (const unchecked of $$(".feature-checkbox:not(:checked)", container).reverse()) container.prepend(unchecked.closest(".feature"));
      }();
      validateToken();
      select_dom_$(".features-header").append(` (${featuresMeta.length + 25})`);
      !function() {
        if (!isChrome()) select_dom_$("a#rate-link").href = isFirefox() ? "https://addons.mozilla.org/en-US/firefox/addon/refined-github-" : "https://apps.apple.com/app/id1519867270?action=write-review";
      }();
      updateStorageUsage("local");
      updateStorageUsage("sync");
      if (doesBrowserActionOpenOptions) select_dom_$("#action").hidden = !0;
      showStoredCssHotfixes();
    }
    !async function() {
      await generateDom();
      !function() {
        syncedForm?.onChange((async domain => {
          select_dom_$("a#personal-token-link").host = "default" === domain ? "github.com" : domain;
          setTimeout(validateToken, 100);
        }));
        options_browser.permissions.onRemoved.addListener((() => {
          location.reload();
        }));
        options_browser.permissions.onAdded.addListener((() => {
          location.reload();
        }));
        options_browser.storage.onChanged.addListener(((_, areaName) => {
          updateStorageUsage(areaName);
        }));
        fit_textarea.watch("textarea");
        enableTabToIndent("textarea");
        delegate_it_delegate(".screenshot-link", "click", summaryHandler);
        delegate_it_delegate("details", "toggle", focusFirstField, {
          capture: !0
        });
        select_dom_$("#filter-features").addEventListener("input", featuresFilterHandler);
        select_dom_$("#clear-cache").addEventListener("click", clearCacheHandler);
        select_dom_$("#find-feature").addEventListener("click", findFeatureHandler);
        select_dom_$("#toggle-all-features").addEventListener("click", enableToggleAll);
        select_dom_$("#disable-all-features").addEventListener("click", disableAllFeatures);
        select_dom_$("#enable-all-features").addEventListener("click", enableAllFeatures);
        select_dom_$('[name="personalToken"]').addEventListener("input", validateToken);
      }();
    }();
  })();
})();
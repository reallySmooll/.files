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
    const patternValidationRegex = /^(https?|wss?|file|ftp|\*):\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^file:\/\/\/.*$|^resource:\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^about:/, isFirefox = "object" == typeof navigator && navigator.userAgent.includes("Firefox/"), allStarsRegex = isFirefox ? /^(https?|wss?):[/][/][^/]+([/].*)?$/ : /^https?:[/][/][^/]+([/].*)?$/, allUrlsRegex = /^(https?|file|ftp):[/]+/;
    function webext_patterns_patternToRegex(...matchPatterns) {
      if (0 === matchPatterns.length) return /$./;
      if (matchPatterns.includes("<all_urls>")) return allUrlsRegex;
      if (matchPatterns.includes("*://*/*")) return allStarsRegex; else return new RegExp(matchPatterns.map((x => function(matchPattern) {
        if (!patternValidationRegex.test(matchPattern)) throw new Error(matchPattern + " is an invalid pattern, it must match " + String(patternValidationRegex));
        let [, protocol, host, pathname] = matchPattern.split(/(^[^:]+:[/][/])([^/]+)?/);
        protocol = protocol.replace("*", isFirefox ? "(https?|wss?)" : "https?").replace(/[/]/g, "[/]");
        host = (null != host ? host : "").replace(/^[*][.]/, "([^/]+.)*").replace(/^[*]$/, "[^/]+").replace(/[.]/g, "[.]").replace(/[*]$/g, "[^.]+");
        pathname = pathname.replace(/[/]/g, "[/]").replace(/[.]/g, "[.]").replace(/[*]/g, ".*");
        return "^" + protocol + host + "(" + pathname + ")?$";
      }(x))).join("|"));
    }
    function webext_patterns_excludeDuplicatePatterns(matchPatterns) {
      if (matchPatterns.includes("<all_urls>")) return [ "<all_urls>" ];
      if (matchPatterns.includes("*://*/*")) return [ "*://*/*" ]; else return matchPatterns.filter((possibleSubset => !matchPatterns.some((possibleSuperset => possibleSubset !== possibleSuperset && webext_patterns_patternToRegex(possibleSuperset).test(possibleSubset)))));
    }
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
    async function getAdditionalPermissions(options) {
      return new Promise((resolve => {
        chrome.permissions.getAll((currentPermissions => {
          const manifestPermissions = getManifestPermissionsSync();
          resolve(_getAdditionalPermissions(manifestPermissions, currentPermissions, options));
        }));
      }));
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
    function excludeDuplicateFiles(contentScripts, {warn = !0} = {}) {
      const uniques = new Map, filterWarnAndAdd = (files, context) => {
        if (!files) return []; else return files.filter((file => {
          const differentiators = (c = context, JSON.stringify([ c.all_frames, c.exclude_matches, c.run_at ]));
          var c;
          if (uniques.has(file)) {
            if (warn && differentiators !== uniques.get(file)) console.warn(`Duplicate file in the manifest content_scripts: ${file} \nMore info: https://github.com/fregante/webext-dynamic-content-scripts/issues/62`);
            return !1;
          }
          uniques.set(file, differentiators);
          return !0;
        }));
      };
      return contentScripts.flatMap((contentScript => {
        const {matches, ...cleanContentScript} = contentScript, result = {
          ...cleanContentScript,
          js: filterWarnAndAdd(contentScript.js, contentScript),
          css: filterWarnAndAdd(contentScript.css, contentScript)
        };
        return result.css.length + result.js.length === 0 ? [] : result;
      }));
    }
    const webext_polyfill_kinda_chromeP = globalThis.chrome && new function NestedProxy(target) {
      return new Proxy(target, {
        get(target, prop) {
          if (target[prop]) if ("function" != typeof target[prop]) return new NestedProxy(target[prop]); else return (...arguments_) => new Promise(((resolve, reject) => {
            target[prop](...arguments_, (result => {
              if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message)); else resolve(result);
            }));
          }));
        }
      });
    }(globalThis.chrome), webext_polyfill_kinda = webext_polyfill_kinda_chromeP, gotScripting = Boolean(globalThis.chrome?.scripting);
    function castArray(possibleArray) {
      if (Array.isArray(possibleArray)) return possibleArray; else return [ possibleArray ];
    }
    const nativeFunction = /^function \w+\(\) {[\n\s]+\[native code][\n\s]+}/;
    async function webext_content_scripts_executeFunction(target, function_, ...args) {
      if (nativeFunction.test(String(function_))) throw new TypeError("Native functions need to be wrapped first, like `executeFunction(1, () => alert(1))`");
      const {frameId, tabId} = function(target) {
        return "object" == typeof target ? target : {
          tabId: target,
          frameId: 0
        };
      }(target);
      if (gotScripting) {
        const [injection] = await chrome.scripting.executeScript({
          target: {
            tabId,
            frameIds: [ frameId ]
          },
          func: function_,
          args
        });
        return injection?.result;
      }
      const [result] = await webext_polyfill_kinda.tabs.executeScript(tabId, {
        code: `(${function_.toString()})(...${JSON.stringify(args)})`,
        matchAboutBlank: !0,
        frameId
      });
      return result;
    }
    function arrayOrUndefined(value) {
      return void 0 === value ? void 0 : [ value ];
    }
    async function insertCSS({tabId, frameId, files, allFrames, matchAboutBlank, runAt}, {ignoreTargetErrors} = {}) {
      const everyInsertion = Promise.all(files.map((async content => {
        if ("string" == typeof content) content = {
          file: content
        };
        if (gotScripting) return chrome.scripting.insertCSS({
          target: {
            tabId,
            frameIds: arrayOrUndefined(frameId),
            allFrames: void 0 === frameId ? allFrames : void 0
          },
          files: "file" in content ? [ content.file ] : void 0,
          css: "code" in content ? content.code : void 0
        }); else return webext_polyfill_kinda.tabs.insertCSS(tabId, {
          ...content,
          matchAboutBlank,
          allFrames,
          frameId,
          runAt: runAt ?? "document_start"
        });
      })));
      if (ignoreTargetErrors) await catchTargetInjectionErrors(everyInsertion); else await everyInsertion;
    }
    async function executeScript({tabId, frameId, files, allFrames, matchAboutBlank, runAt}, {ignoreTargetErrors} = {}) {
      const normalizedFiles = files.map((file => "string" == typeof file ? {
        file
      } : file));
      if (gotScripting) {
        !function(files) {
          if (files.some((content => "code" in content))) throw new Error("chrome.scripting does not support injecting strings of `code`");
        }(normalizedFiles);
        const injection = chrome.scripting.executeScript({
          target: {
            tabId,
            frameIds: arrayOrUndefined(frameId),
            allFrames: void 0 === frameId ? allFrames : void 0
          },
          files: normalizedFiles.map((({file}) => file))
        });
        if (ignoreTargetErrors) await catchTargetInjectionErrors(injection); else await injection;
        return;
      }
      const executions = [];
      for (const content of normalizedFiles) {
        if ("code" in content) await executions.at(-1);
        executions.push(webext_polyfill_kinda.tabs.executeScript(tabId, {
          ...content,
          matchAboutBlank,
          allFrames,
          frameId,
          runAt
        }));
      }
      if (ignoreTargetErrors) await catchTargetInjectionErrors(Promise.all(executions)); else await Promise.all(executions);
    }
    async function injectContentScript(where, scripts, options = {}) {
      const targets = castArray(where);
      await Promise.all(targets.map((async target => async function({frameId, tabId, allFrames}, scripts, options = {}) {
        const injections = castArray(scripts).flatMap((script => [ insertCSS({
          tabId,
          frameId,
          allFrames,
          files: script.css ?? [],
          matchAboutBlank: script.matchAboutBlank ?? script.match_about_blank,
          runAt: script.runAt ?? script.run_at
        }, options), executeScript({
          tabId,
          frameId,
          allFrames,
          files: script.js ?? [],
          matchAboutBlank: script.matchAboutBlank ?? script.match_about_blank,
          runAt: script.runAt ?? script.run_at
        }, options) ]));
        await Promise.all(injections);
      }(function(target) {
        if ("object" == typeof target) return {
          ...target,
          allFrames: !1
        }; else return {
          tabId: target,
          frameId: void 0,
          allFrames: !0
        };
      }(target), scripts, options))));
    }
    const blockedPrefixes = [ "chrome.google.com/webstore", "chromewebstore.google.com", "accounts-static.cdn.mozilla.net", "accounts.firefox.com", "addons.cdn.mozilla.net", "addons.mozilla.org", "api.accounts.firefox.com", "content.cdn.mozilla.net", "discovery.addons.mozilla.org", "input.mozilla.org", "install.mozilla.org", "oauth.accounts.firefox.com", "profile.accounts.firefox.com", "support.mozilla.org", "sync.services.mozilla.com", "testpilot.firefox.com" ];
    function isScriptableUrl(url) {
      if (!url?.startsWith("http")) return !1;
      const cleanUrl = url.replace(/^https?:\/\//, "");
      return blockedPrefixes.every((blocked => !cleanUrl.startsWith(blocked)));
    }
    const targetErrors = /^No frame with id \d+ in tab \d+.$|^No tab with id: \d+.$|^The tab was closed.$|^The frame was removed.$/;
    async function catchTargetInjectionErrors(promise) {
      try {
        await promise;
      } catch (error) {
        if (!targetErrors.test(error?.message)) throw error;
      }
    }
    async function injectToExistingTabs(origins, scripts) {
      const excludeMatches = scripts.flatMap((script => script.matches ?? []));
      return injectContentScript(await async function(matches, excludeMatches) {
        if (0 === matches.length) return [];
        const exclude = excludeMatches ? webext_patterns_patternToRegex(...excludeMatches) : void 0;
        return (await webext_polyfill_kinda.tabs.query({
          url: matches
        })).filter((tab => tab.id && tab.url && (exclude ? !exclude.test(tab.url) : !0))).map((tab => tab.id));
      }(origins, excludeMatches), scripts, {
        ignoreTargetErrors: !0
      });
    }
    const noMatchesError = "Type error for parameter contentScriptOptions (Error processing matches: Array requires at least 1 items; you have 0) for contentScripts.register.", noPermissionError = "Permission denied to register a content script for ", gotNavigation = "object" == typeof chrome && "webNavigation" in chrome;
    async function registerContentScript(contentScriptOptions, callback) {
      const {js = [], css = [], matchAboutBlank, matches = [], excludeMatches, runAt} = contentScriptOptions;
      let {allFrames} = contentScriptOptions;
      if (gotNavigation) allFrames = !1; else if (allFrames) console.warn("`allFrames: true` requires the `webNavigation` permission to work correctly: https://github.com/fregante/content-scripts-register-polyfill#permissions");
      if (0 === matches.length) throw new Error(noMatchesError);
      await Promise.all(matches.map((async pattern => {
        if (!await webext_polyfill_kinda.permissions.contains({
          origins: [ pattern ]
        })) throw new Error(noPermissionError + pattern);
      })));
      const matchesRegex = webext_patterns_patternToRegex(...matches), excludeMatchesRegex = webext_patterns_patternToRegex(...null != excludeMatches ? excludeMatches : []), inject = async (url, tabId, frameId = 0) => {
        if (matchesRegex.test(url) && !excludeMatchesRegex.test(url) && await async function(url) {
          return webext_polyfill_kinda.permissions.contains({
            origins: [ new URL(url).origin + "/*" ]
          });
        }(url)) await injectContentScript({
          tabId,
          frameId
        }, {
          css,
          js,
          matchAboutBlank,
          runAt
        }, {
          ignoreTargetErrors: !0
        });
      }, tabListener = async (tabId, {status}, {url}) => {
        if ("loading" === status && url) inject(url, tabId);
      }, navListener = async ({tabId, frameId, url}) => {
        inject(url, tabId, frameId);
      };
      if (gotNavigation) chrome.webNavigation.onCommitted.addListener(navListener); else chrome.tabs.onUpdated.addListener(tabListener);
      const registeredContentScript = {
        async unregister() {
          if (gotNavigation) chrome.webNavigation.onCommitted.removeListener(navListener); else chrome.tabs.onUpdated.removeListener(tabListener);
        }
      };
      if ("function" == typeof callback) callback(registeredContentScript);
      return registeredContentScript;
    }
    const chromeRegister = globalThis.chrome?.scripting?.registerContentScripts, firefoxRegister = globalThis.browser?.contentScripts?.register;
    async function register_content_script_shim_registerContentScript(contentScript) {
      if (chromeRegister) {
        const id = "webext-dynamic-content-script-" + JSON.stringify(contentScript);
        try {
          await chromeRegister([ {
            ...contentScript,
            id
          } ]);
        } catch (error) {
          if (!error?.message.startsWith("Duplicate script ID")) throw error;
        }
        return {
          unregister: async () => chrome.scripting.unregisterContentScripts({
            ids: [ id ]
          })
        };
      }
      const firefoxContentScript = {
        ...contentScript,
        js: contentScript.js?.map((file => ({
          file
        }))),
        css: contentScript.css?.map((file => ({
          file
        })))
      };
      if (firefoxRegister) return firefoxRegister(firefoxContentScript); else return registerContentScript(firefoxContentScript);
    }
    const registeredScripts = new Map;
    function makePathRelative(file) {
      return new URL(file, location.origin).pathname;
    }
    async function registerOnOrigins({origins: newOrigins}) {
      const {content_scripts: rawManifest, manifest_version: manifestVersion} = chrome.runtime.getManifest();
      if (!rawManifest) throw new Error("webext-dynamic-content-scripts tried to register scripts on the new host permissions, but no content scripts were found in the manifest.");
      const cleanManifest = excludeDuplicateFiles(rawManifest, {
        warn: 2 === manifestVersion
      });
      for (const origin of newOrigins || []) for (const config of cleanManifest) {
        const registeredScript = register_content_script_shim_registerContentScript({
          js: config.js?.map((file => makePathRelative(file))),
          css: config.css?.map((file => makePathRelative(file))),
          allFrames: config.all_frames,
          matches: [ origin ],
          excludeMatches: config.matches,
          runAt: config.run_at
        });
        registeredScripts.set(origin, registeredScript);
      }
      injectToExistingTabs(newOrigins || [], cleanManifest);
    }
    function handleNewPermissions(permissions) {
      if (permissions.origins && permissions.origins.length > 0) registerOnOrigins(permissions);
    }
    async function handledDroppedPermissions({origins}) {
      if (origins && 0 !== origins.length) for (const [origin, scriptPromise] of registeredScripts) if (origins.includes(origin)) {
        (await scriptPromise).unregister();
      }
    }
    !async function() {
      chrome.permissions.onRemoved.addListener(handledDroppedPermissions);
      chrome.permissions.onAdded.addListener(handleNewPermissions);
      await registerOnOrigins(await getAdditionalPermissions({
        strictOrigins: !1
      }));
    }();
    let webext_detect_page_cache = !0;
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
        if (!webext_detect_page_cache || void 0 === result) result = function_();
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
    };
    let node_modules_webext_detect_page_cache = !0;
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
        if (!node_modules_webext_detect_page_cache || void 0 === result) result = function_();
        return result;
      };
    }
    const webext_detect_page_isWebPage = webext_detect_page_once((() => [ "about:", "http:", "https:" ].includes(location.protocol))), webext_detect_page_isExtensionContext = webext_detect_page_once((() => "object" == typeof globalThis.chrome?.extension)), webext_detect_page_isContentScript = webext_detect_page_once((() => webext_detect_page_isExtensionContext() && webext_detect_page_isWebPage())), webext_detect_page_isBackground = () => webext_detect_page_isBackgroundPage() || webext_detect_page_isBackgroundWorker(), webext_detect_page_isBackgroundPage = webext_detect_page_once((() => {
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
    })), webext_detect_page_isChrome = () => globalThis.navigator?.userAgent.includes("Chrome"), webext_detect_page_isSafari = () => !webext_detect_page_isChrome() && globalThis.navigator?.userAgent.includes("Safari"), contextChecks = {
      contentScript: webext_detect_page_isContentScript,
      background: webext_detect_page_isBackground,
      options: webext_detect_page_isOptionsPage,
      sidePanel: webext_detect_page_isSidePanel,
      devTools: () => Boolean(globalThis.chrome?.devtools),
      devToolsPage: webext_detect_page_isDevToolsPage,
      extension: webext_detect_page_isExtensionContext,
      web: webext_detect_page_isWebPage
    };
    Object.keys(contextChecks);
    const objectKeys = Object.keys;
    function normalizeManifestPermissions(manifest = chrome.runtime.getManifest()) {
      const manifestPermissions = {
        origins: [],
        permissions: []
      }, list = new Set([ ...manifest.permissions ?? [], ...manifest.host_permissions ?? [], ...(manifest.content_scripts ?? []).flatMap((config => config.matches ?? [])) ]);
      if (manifest.devtools_page && !manifest.optional_permissions?.includes("devtools")) list.add("devtools");
      for (const permission of list) if (permission.includes("://") || "<all_urls>" === permission) manifestPermissions.origins.push(permission); else manifestPermissions.permissions.push(permission);
      return function({origins, permissions}) {
        return {
          origins: origins ? webext_patterns_excludeDuplicatePatterns(origins) : [],
          permissions: permissions ? [ ...permissions ] : []
        };
      }(manifestPermissions);
    }
    function webext_tools_castTarget(target) {
      return "object" == typeof target ? target : {
        tabId: target,
        frameId: 0
      };
    }
    async function getTabUrl(target) {
      const {frameId, tabId} = webext_tools_castTarget(target);
      try {
        if (0 === frameId && "tabs" in globalThis.chrome) {
          const tab = await webext_polyfill_kinda.tabs.get(tabId);
          if (tab.url) return tab.url;
        }
        return await webext_content_scripts_executeFunction(target, (() => location.href));
      } catch {
        return;
      }
    }
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
    async function onPopupClose(watchedWindowId) {
      await async function(event, filter) {
        await new Promise((resolve => {
          const listener = (...parameters) => {
            if (!filter || filter(...parameters)) {
              resolve();
              event.removeListener(listener);
            }
          };
          event.addListener(listener);
        }));
      }(chrome.windows.onRemoved, (closedWindowId => closedWindowId === watchedWindowId));
    }
    function pageScript() {
      const button = document.querySelector("button");
      button.addEventListener("click", (_ => {
        window.close();
      }));
      window.addEventListener("blur", (_ => {
        window.close();
      }));
      window.resizeBy(0, document.body.scrollHeight - window.innerHeight);
      window.moveTo((screen.width - window.outerWidth) / 2, (screen.height - window.outerHeight) / 2);
      button.focus();
    }
    const css = "\n\t/*! https://npm.im/webext-base-css */\n\n\t/* Chrome only: -webkit-hyphens */\n\t/* Safari only: _::-webkit-full-page-media */\n\n\t/* webpackIgnore: true */\n\t@import url('chrome://global/skin/in-content/common.css') (min--moz-device-pixel-ratio:0); /* Firefox-only */\n\n\t:root {\n\t\t--background-color-for-chrome: #292a2d;\n\t\tmax-width: 700px;\n\t\tmargin: auto;\n\t}\n\n\tbody {\n\t\t--body-margin-h: 8px;\n\t\tmargin-left: var(--body-margin-h);\n\t\tmargin-right: var(--body-margin-h);\n\t}\n\n\t/* Selector matches Firefox’ */\n\tinput[type='number'],\n\tinput[type='password'],\n\tinput[type='search'],\n\tinput[type='text'],\n\tinput[type='url'],\n\tinput:not([type]),\n\ttextarea {\n\t\tdisplay: block;\n\t\tbox-sizing: border-box;\n\t\tmargin-left: 0;\n\t\twidth: 100%;\n\t\tresize: vertical;\n\t\t-moz-tab-size: 4 !important;\n\t\ttab-size: 4 !important;\n\t}\n\n\tinput[type='checkbox'] {\n\t\tvertical-align: -0.15em;\n\t}\n\n\t@supports (not (-webkit-hyphens:none)) and (not (-moz-appearance:none)) and (list-style-type:'*') {\n\t\ttextarea:focus {\n\t\t\t/* Inexplicably missing from Chrome’s input style https://github.com/chromium/chromium/blob/6bea0557fe/extensions/renderer/resources/extension.css#L287 */\n\t\t\tborder-color: #4d90fe;\n\t\t\ttransition: border-color 200ms;\n\t\t}\n\t}\n\n\thr {\n\t\tmargin-right: calc(-1 * var(--body-margin-h));\n\t\tmargin-left: calc(-1 * var(--body-margin-h));\n\t\tborder: none;\n\t\tborder-bottom: 1px solid #aaa4;\n\t}\n\n\timg {\n\t\tvertical-align: middle;\n\t}\n\n\t_::-webkit-full-page-media,\n\t_:future,\n\t:root {\n\t\tfont-family: -apple-system, BlinkMacSystemFont, sans-serif, 'Apple Color Emoji';\n\t}\n\n\t_::-webkit-full-page-media,\n\t_:future,\n\tinput[type='number'],\n\tinput[type='password'],\n\tinput[type='search'],\n\tinput[type='text'],\n\tinput[type='url'],\n\tinput:not([type]),\n\ttextarea {\n\t\tborder: solid 1px #888;\n\t\tpadding: 0.4em;\n\t\tfont: inherit;\n\t\t-webkit-appearance: none;\n\t}\n\n\t@media (prefers-color-scheme: dark) {\n\t\t:root {\n\t\t\tcolor-scheme: dark;\n\t\t\tbackground-color: var(--background-color-for-chrome);\n\t\t}\n\n\t\tbody,\n\t\th3 { /* Chrome #3 */\n\t\t\tcolor: #e8eaed;\n\t\t}\n\n\t\ta {\n\t\t\tcolor: var(--link-color, #8ab4f8);\n\t\t}\n\n\t\ta:active {\n\t\t\tcolor: var(--link-color-active, #b6d3f9);\n\t\t}\n\n\t\tinput[type='number'],\n\t\tinput[type='password'],\n\t\tinput[type='search'],\n\t\tinput[type='text'],\n\t\tinput[type='url'],\n\t\tinput:not([type]),\n\t\ttextarea {\n\t\t\tcolor: inherit;\n\t\t\tbackground-color: transparent;\n\t\t}\n\t}\n\n\t/* End webext-base-css */\n\n\tbody {\n\t\tbox-sizing: border-box;\n\t\tmin-height: 100vh;\n\t\tmargin: 0;\n\t\tpadding: 1em;\n\t\tjustify-content: center;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tfont-size: 14px;\n\t\tline-height: 1.5;\n\t\tfont-family: system, system-ui, sans-serif;\n\t}\n\n\tbutton {\n\t\tmargin-top: 1em;\n\t\tmargin-left: auto;\n\t}\n";
    function getPage(message = "") {
      return `\n\t\t<!doctype html>\n\t\t<meta charset="utf-8" />\n\t\t<title>${chrome.runtime.getManifest().name}</title>\n\t\t<style>${css}</style>\n\t\t<script defer src="alert.js"><\/script>\n\t\t<body>\n\t\t\t<main>${message}</main>\n\t\t\t<button>Ok</button>\n\t\t</body>\n\t\t<script>(${pageScript.toString()})()<\/script>\n\t`;
    }
    const webext_alert = webext_detect_page_isBackgroundWorker() || !webext_detect_page_isChrome() && webext_detect_page_isBackgroundPage() ? async function(message) {
      const popup = await chrome.windows.create({
        type: "popup",
        url: "data:text/html," + encodeURIComponent(getPage(message)),
        focused: !0,
        height: 150,
        width: 420
      });
      await onPopupClose(popup.id);
    } : alert, contextMenuId = "webext-permission-toggle:add-permission";
    let globalOptions;
    const webext_permission_toggle_chromeP = webext_detect_page_isChrome() && globalThis.chrome?.runtime?.getManifest().manifest_version < 3 ? webext_polyfill_kinda : chrome;
    async function isOriginPermanentlyAllowed(origin) {
      return webext_permission_toggle_chromeP.permissions.contains({
        origins: [ origin + "/*" ]
      });
    }
    function updateItemRaw({checked, enabled}) {
      chrome.contextMenus.update(contextMenuId, {
        checked,
        enabled
      });
    }
    async function updateItem(url) {
      if (url) if (!isScriptableUrl(url)) updateItemRaw({
        enabled: !1,
        checked: !1
      }); else {
        const {origin} = new URL(url), isDefault = function(origin, manifest = chrome.runtime.getManifest()) {
          return webext_patterns_patternToRegex(...normalizeManifestPermissions(manifest).origins).test(origin);
        }(url);
        updateItemRaw({
          enabled: !isDefault,
          checked: isDefault || await isOriginPermanentlyAllowed(origin)
        });
      } else updateItemRaw({
        enabled: !0,
        checked: !1
      });
    }
    async function handleTabActivated({tabId}) {
      updateItem(await getTabUrl(tabId) ?? "");
    }
    async function handleClick({checked, menuItemId}, tab) {
      if (menuItemId !== contextMenuId) return;
      let url;
      try {
        !function(tab) {
          if (!tab?.id) throw new Error("The browser didn't supply any information about the active tab.");
        }(tab);
        url = tab.url ?? await getTabUrl(tab.id);
        !function(url) {
          if (!url) throw new Error("The browser didn't supply the current page's URL.");
        }(url);
        !function(url) {
          if (!isScriptableUrl(url)) throw new Error(chrome.runtime.getManifest().name + " can't be enabled on this page.");
        }(url);
        const permissionExistsNow = await async function(url, request) {
          const permissionData = {
            origins: [ new URL(url).origin + "/*" ]
          };
          await webext_permission_toggle_chromeP.permissions[request ? "request" : "remove"](permissionData);
          return webext_permission_toggle_chromeP.permissions.contains(permissionData);
        }(url, checked);
        if (!(permissionExistsNow === checked)) updateItemRaw({
          checked: permissionExistsNow
        });
        if (permissionExistsNow && globalOptions.reloadOnSuccess) webext_content_scripts_executeFunction(tab.id, (message => {
          if (confirm(message)) location.reload();
        }), globalOptions.reloadOnSuccess);
      } catch (error) {
        setTimeout(updateItem, 500, url);
        if (tab?.id) try {
          await webext_content_scripts_executeFunction(tab.id, (text => {
            window.alert(text);
          }), String(error));
        } catch {
          webext_alert(String(error));
        }
        throw error;
      }
    }
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
    let webext_options_sync_node_modules_webext_detect_page_cache = !0;
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
        if (!webext_options_sync_node_modules_webext_detect_page_cache || void 0 === result) result = function_();
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
        const {origins} = await getAdditionalPermissions({
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
    }, Object.fromEntries([ "action-pr-link", "action-used-by-link", "actionable-pr-view-file", "align-issue-labels", "archive-forks-link", "avoid-accidental-submissions", "batch-mark-files-as-viewed", "bugs-tab", "ci-link", "clean-conversation-filters", "clean-conversation-headers", "clean-conversation-sidebar", "clean-pinned-issues", "clean-readme-url", "clean-repo-filelist-actions", "clean-repo-sidebar", "clean-repo-tabs", "clean-rich-text-editor", "clear-pr-merge-commit-message", "click-outside-modal", "close-as-unplanned", "close-out-of-view-modals", "closing-remarks", "collapsible-content-button", "command-palette-navigation-shortcuts", "comment-fields-keyboard-shortcuts", "comment-on-draft-pr-indicator", "comments-time-machine-links", "conflict-marker", "conversation-activity-filter", "conversation-links-on-repo-lists", "convert-pr-to-draft-improvements", "convert-release-to-draft", "copy-on-y", "create-release-shortcut", "cross-deleted-pr-branches", "deep-reblame", "default-branch-button", "dim-bots", "download-folder-button", "easy-toggle-commit-messages", "easy-toggle-files", "embed-gist-inline", "embed-gist-via-iframe", "emphasize-draft-pr-label", "esc-to-cancel", "esc-to-deselect-line", "expand-all-hidden-comments", "extend-conversation-status-filters", "extend-diff-expander", "file-age-color", "fit-textareas", "fix-no-pr-search", "github-actions-indicators", "global-conversation-list-filters", "hidden-review-comments-indicator", "hide-diff-signs", "hide-inactive-deployments", "hide-issue-list-autocomplete", "hide-low-quality-comments", "hide-navigation-hover-highlight", "hide-newsfeed-noise", "hide-user-forks", "highest-rated-comment", "highlight-collaborators-and-own-conversations", "highlight-non-default-base-branch", "html-preview-link", "improve-shortcut-help", "infinite-scroll", "jump-to-change-requested-comment", "jump-to-conversation-close-event", "keyboard-navigation", "last-notification-page-button", "link-to-changelog-file", "link-to-compare-diff", "link-to-github-io", "linkify-branch-references", "linkify-code", "linkify-commit-sha", "linkify-labels-on-dashboard", "linkify-notification-repository-header", "linkify-symbolic-links", "linkify-user-edit-history-popup", "linkify-user-labels", "linkify-user-location", "list-prs-for-branch", "list-prs-for-file", "locked-issue", "mark-merge-commits-in-list", "mark-private-orgs", "mobile-tabs", "more-conversation-filters", "more-dropdown-links", "more-file-links", "netiquette", "new-or-deleted-file", "new-repo-disable-projects-and-wikis", "no-duplicate-list-update-time", "no-unnecessary-split-diff-view", "one-click-diff-options", "one-click-pr-or-gist", "one-click-review-submission", "one-key-formatting", "open-all-conversations", "open-all-notifications", "open-issue-to-latest-comment", "pagination-hotkey", "parse-backticks", "patch-diff-links", "pinned-issues-update-time", "pr-base-commit", "pr-branch-auto-delete", "pr-commit-lines-changed", "pr-filters", "pr-first-commit-title", "pr-jump-to-first-non-viewed-file", "pr-notification-link", "prevent-comment-loss", "prevent-duplicate-pr-submission", "prevent-link-loss", "prevent-pr-merge-panel-opening", "preview-hidden-comments", "previous-next-commit-buttons", "previous-version", "profile-gists-link", "profile-hotkey", "pull-request-hotkeys", "quick-comment-edit", "quick-comment-hiding", "quick-file-edit", "quick-label-removal", "quick-mention", "quick-new-issue", "quick-repo-deletion", "quick-review", "quick-review-comment-deletion", "reactions-avatars", "release-download-count", "releases-dropdown", "releases-tab", "reload-failed-proxied-images", "repo-age", "repo-avatars", "repo-header-info", "repo-wide-file-finder", "resolve-conflicts", "restore-file", "rgh-dim-commits", "rgh-feature-descriptions", "rgh-improve-new-issue-form", "rgh-linkify-features", "rgh-linkify-yolo-issues", "rgh-netiquette", "rgh-pr-template", "rgh-welcome-issue", "same-branch-author-commits", "scrollable-areas", "select-all-notifications-shortcut", "select-notifications", "selection-in-new-tab", "shorten-links", "show-associated-branch-prs-on-fork", "show-names", "show-open-prs-of-forks", "show-user-top-repositories", "show-whitespace", "small-user-avatars", "sort-conversations-by-update-time", "status-subscription", "sticky-sidebar", "stop-redirecting-in-notification-bar", "submission-via-ctrl-enter-everywhere", "suggest-commit-title-limit", "swap-branches-on-compare", "sync-pr-commit-title", "tab-to-indent", "table-input", "tag-changes-link", "tags-on-commits-list", "toggle-everything-with-alt", "toggle-files-button", "unfinished-comments", "unreleased-commits", "unwrap-unnecessary-dropdowns", "update-pr-from-base-branch", "useful-not-found-page", "user-local-time", "user-profile-follower-badge", "vertical-front-matter", "view-last-pr-deployment", "visit-tag", "warn-pr-from-master", "warning-for-disallow-edits" ].map((id => [ `feature:${id}`, !0 ])))), renamedFeatures = new Map([ [ "separate-draft-pr-button", "one-click-pr-or-gist" ], [ "prevent-pr-commit-link-loss", "prevent-link-loss" ], [ "remove-projects-tab", "remove-unused-repo-tabs" ], [ "remove-unused-repo-tabs", "clean-repo-tabs" ], [ "more-dropdown", "clean-repo-tabs" ], [ "remove-diff-signs", "hide-diff-signs" ], [ "remove-label-faster", "quick-label-hiding" ], [ "edit-files-faster", "quick-file-edit" ], [ "edit-comments-faster", "quick-comment-edit" ], [ "delete-review-comments-faster", "quick-review-comment-deletion" ], [ "hide-comments-faster", "quick-comment-hiding" ], [ "faster-reviews", "quick-review" ], [ "faster-pr-diff-options", "quick-pr-diff-options" ], [ "hide-useless-comments", "hide-low-quality-comments" ], [ "hide-useless-newsfeed-events", "hide-newsfeed-noise" ], [ "hide-noisy-newsfeed-events", "hide-newsfeed-noise" ], [ "no-useless-split-diff-view", "no-unnecessary-split-diff-view" ], [ "unwrap-useless-dropdowns", "unwrap-unnecessary-dropdowns" ], [ "tag-changelog-link", "tag-changes-link" ], [ "navigate-pages-with-arrow-keys", "pagination-hotkey" ], [ "list-pr-for-branch", "list-prs-for-branch" ], [ "quick-label-hiding", "quick-label-removal" ], [ "next-scheduled-github-action", "github-actions-indicators" ], [ "raw-file-link", "more-file-links" ], [ "conversation-filters", "more-conversation-filters" ], [ "quick-pr-diff-options", "one-click-diff-options" ], [ "quick-review-buttons", "one-click-review-submission" ], [ "pull-request-hotkey", "pull-request-hotkeys" ], [ "first-published-tag-for-merged-pr", "closing-remarks" ], [ "scheduled-and-manual-workflow-indicators", "github-actions-indicators" ], [ "useful-forks", "fork-notice" ], [ "set-default-repositories-type-to-sources", "hide-user-forks" ], [ "highlight-deleted-and-added-files-in-diffs", "new-or-deleted-file" ], [ "enable-file-links-in-compare-view", "actionable-pr-view-file" ], [ "use-first-commit-message-for-new-prs", "pr-first-commit-title`" ] ]);
    const options_storage = new OptionsSyncPerDomain({
      defaults,
      migrations: [ function(options) {
        for (const [from, to] of renamedFeatures) if ("boolean" == typeof options[`feature:${from}`]) options[`feature:${to}`] = options[`feature:${from}`];
      }, OptionsSyncPerDomain.migrations.removeUnused ]
    }).getOptionsForOrigin();
    var browser = __webpack_require__(131);
    const {version} = browser.runtime.getManifest();
    function is_development_version_isDevelopmentVersion() {
      return "0.0.0" === version;
    }
    var used_storage_browser = __webpack_require__(131);
    async function getStorageBytesInUse(area) {
      const storage = used_storage_browser.storage[area];
      return "getBytesInUse" in storage ? storage.getBytesInUse() : (new TextEncoder).encode(Object.entries(await storage.get()).map((([key, value]) => key + JSON.stringify(value))).join("")).length;
    }
    const doesBrowserActionOpenOptions = webext_detect_page_isSafari() && globalThis.navigator?.userAgent.includes("Mobile");
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
    }, splitDev = ("function" == typeof DocumentFragment && DocumentFragment, v => String(v).split("-")), splitSub = v => String(v).replace(/^[vr]/, "").replace(/([a-z]+)/gi, ".$1.").replace(/\.+/g, ".").split("."), offset = part => {
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
    const objectToString = Object.prototype.toString, uint8ArrayStringified = "[object Uint8Array]";
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
    var hotfix_browser = __webpack_require__(131);
    const {version: currentVersion} = hotfix_browser.runtime.getManifest();
    async function fetchHotfix(path) {
      const request = await fetch(`https://api.github.com/repos/refined-github/yolo/contents/${path}`), {content} = await request.json();
      if (content) return base64ToString(content).trim(); else return "";
    }
    new CachedFunction("broken-features", {
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
    const styleHotfixes = new CachedFunction("style-hotfixes", {
      updater: async version => fetchHotfix(`style/${version}.css`),
      maxAge: {
        hours: 6
      },
      staleWhileRevalidate: {
        days: 300
      },
      cacheKey: () => ""
    });
    new CachedFunction("strings-hotfixes", {
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
    var background_browser = __webpack_require__(131);
    const {version: background_version} = background_browser.runtime.getManifest();
    !function(options) {
      if (!webext_detect_page_isBackground()) throw new Error("webext-permission-toggle can only be called from a background page");
      if (globalOptions) throw new Error("webext-permission-toggle can only be initialized once");
      const manifest = chrome.runtime.getManifest();
      if (!manifest.permissions?.includes("contextMenus")) throw new Error("webext-permission-toggle requires the `contextMenus` permission");
      if (!chrome.contextMenus) {
        console.warn("chrome.contextMenus is not available");
        return;
      }
      globalOptions = {
        title: `Enable ${manifest.name} on this domain`,
        reloadOnSuccess: !1,
        ...options
      };
      if (!0 === globalOptions.reloadOnSuccess) globalOptions.reloadOnSuccess = `Do you want to reload this page to apply ${manifest.name}?`;
      const optionalHosts = [ ...manifest.optional_permissions ?? [], ...manifest.optional_host_permissions ?? [] ].filter((permission => "<all_urls>" === permission || permission.includes("*")));
      if (0 === optionalHosts.length) throw new TypeError("webext-permission-toggle requires some wildcard hosts to be specified in `optional_permissions` (MV2) or `optional_host_permissions` (MV3)");
      chrome.contextMenus.remove(contextMenuId, (() => chrome.runtime.lastError));
      const contexts = 2 === manifest.manifest_version ? [ "page_action", "browser_action" ] : [ "action" ];
      chrome.contextMenus.create({
        id: contextMenuId,
        type: "checkbox",
        checked: !1,
        title: globalOptions.title,
        contexts,
        documentUrlPatterns: optionalHosts
      });
      chrome.contextMenus.onClicked.addListener(handleClick);
      chrome.tabs.onActivated.addListener(handleTabActivated);
      chrome.tabs.onUpdated.addListener((async (tabId, {status}, {url, active}) => {
        if (active && "complete" === status) updateItem(url ?? await getTabUrl(tabId) ?? "");
      }));
    }();
    const messageHandlers = {
      async openUrls(urls, {tab}) {
        for (const [index, url] of urls.entries()) background_browser.tabs.create({
          url,
          index: tab.index + index + 1,
          active: !1
        });
      },
      async closeTab(_, {tab}) {
        background_browser.tabs.remove(tab.id);
      },
      fetch: async url => (await fetch(url)).text(),
      fetchJSON: async url => (await fetch(url)).json(),
      openOptionsPage: async () => background_browser.runtime.openOptionsPage(),
      getStyleHotfixes: async () => styleHotfixes.get(background_version)
    };
    background_browser.runtime.onMessage.addListener(((message, sender) => {
      for (const id of objectKeys(message)) if (id in messageHandlers) return messageHandlers[id](message[id], sender);
    }));
    background_browser.browserAction.onClicked.addListener((async tab => {
      if (doesBrowserActionOpenOptions) {
        background_browser.runtime.openOptionsPage();
        return;
      }
      const {actionUrl} = await options_storage.getAll();
      background_browser.tabs.create({
        openerTabId: tab.id,
        url: actionUrl || "https://github.com"
      });
    }));
    async function isFirstInstall(suggestedReason) {
      return !(is_development_version_isDevelopmentVersion() || "install" !== suggestedReason || webext_detect_page_isSafari() && await async function() {
        return await getStorageBytesInUse("sync") > 0 || Number(await getStorageBytesInUse("local")) > 0;
      }());
    }
    background_browser.runtime.onInstalled.addListener((async ({reason}) => {
      if (await isFirstInstall(reason)) await background_browser.tabs.create({
        url: "https://github.com/refined-github/refined-github/issues/3543"
      });
      if (is_development_version_isDevelopmentVersion()) await globalCache.clear();
    }));
  })();
})();
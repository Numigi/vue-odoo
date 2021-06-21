/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/algoliasearch/dist/algoliasearch-lite.umd.js":
/*!*******************************************************************!*\
  !*** ./node_modules/algoliasearch/dist/algoliasearch-lite.umd.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! algoliasearch-lite.umd.js | 4.9.3 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
!function (e, t) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(undefined, function () {
  "use strict";
  function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
  }function t(e, t) {
    var r = Object.keys(e);if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), r.push.apply(r, n);
    }return r;
  }function r(r) {
    for (var n = 1; n < arguments.length; n++) {
      var o = null != arguments[n] ? arguments[n] : {};n % 2 ? t(Object(o), !0).forEach(function (t) {
        e(r, t, o[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : t(Object(o)).forEach(function (e) {
        Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e));
      });
    }return r;
  }function n(e, t) {
    if (null == e) return {};var r,
        n,
        o = function (e, t) {
      if (null == e) return {};var r,
          n,
          o = {},
          a = Object.keys(e);for (n = 0; n < a.length; n++) {
        r = a[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
      }return o;
    }(e, t);if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);for (n = 0; n < a.length; n++) {
        r = a[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
      }
    }return o;
  }function o(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;var r = [],
          n = !0,
          o = !1,
          a = void 0;try {
        for (var u, i = e[Symbol.iterator](); !(n = (u = i.next()).done) && (r.push(u.value), !t || r.length !== t); n = !0) {}
      } catch (e) {
        o = !0, a = e;
      } finally {
        try {
          n || null == i.return || i.return();
        } finally {
          if (o) throw a;
        }
      }return r;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }function a(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = new Array(e.length); t < e.length; t++) {
          r[t] = e[t];
        }return r;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }function u(e) {
    var t,
        r = "algoliasearch-client-js-".concat(e.key),
        n = function n() {
      return void 0 === t && (t = e.localStorage || window.localStorage), t;
    },
        a = function a() {
      return JSON.parse(n().getItem(r) || "{}");
    };return { get: function get(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function miss() {
            return Promise.resolve();
          } };return Promise.resolve().then(function () {
          var r = JSON.stringify(e),
              n = a()[r];return Promise.all([n || t(), void 0 !== n]);
        }).then(function (e) {
          var t = o(e, 2),
              n = t[0],
              a = t[1];return Promise.all([n, a || r.miss(n)]);
        }).then(function (e) {
          return o(e, 1)[0];
        });
      }, set: function set(e, t) {
        return Promise.resolve().then(function () {
          var o = a();return o[JSON.stringify(e)] = t, n().setItem(r, JSON.stringify(o)), t;
        });
      }, delete: function _delete(e) {
        return Promise.resolve().then(function () {
          var t = a();delete t[JSON.stringify(e)], n().setItem(r, JSON.stringify(t));
        });
      }, clear: function clear() {
        return Promise.resolve().then(function () {
          n().removeItem(r);
        });
      } };
  }function i(e) {
    var t = a(e.caches),
        r = t.shift();return void 0 === r ? { get: function get(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function miss() {
            return Promise.resolve();
          } },
            n = t();return n.then(function (e) {
          return Promise.all([e, r.miss(e)]);
        }).then(function (e) {
          return o(e, 1)[0];
        });
      }, set: function set(e, t) {
        return Promise.resolve(t);
      }, delete: function _delete(e) {
        return Promise.resolve();
      }, clear: function clear() {
        return Promise.resolve();
      } } : { get: function get(e, n) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function miss() {
            return Promise.resolve();
          } };return r.get(e, n, o).catch(function () {
          return i({ caches: t }).get(e, n, o);
        });
      }, set: function set(e, n) {
        return r.set(e, n).catch(function () {
          return i({ caches: t }).set(e, n);
        });
      }, delete: function _delete(e) {
        return r.delete(e).catch(function () {
          return i({ caches: t }).delete(e);
        });
      }, clear: function clear() {
        return r.clear().catch(function () {
          return i({ caches: t }).clear();
        });
      } };
  }function s() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: !0 },
        t = {};return { get: function get(r, n) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function miss() {
            return Promise.resolve();
          } },
            a = JSON.stringify(r);if (a in t) return Promise.resolve(e.serializable ? JSON.parse(t[a]) : t[a]);var u = n(),
            i = o && o.miss || function () {
          return Promise.resolve();
        };return u.then(function (e) {
          return i(e);
        }).then(function () {
          return u;
        });
      }, set: function set(r, n) {
        return t[JSON.stringify(r)] = e.serializable ? JSON.stringify(n) : n, Promise.resolve(n);
      }, delete: function _delete(e) {
        return delete t[JSON.stringify(e)], Promise.resolve();
      }, clear: function clear() {
        return t = {}, Promise.resolve();
      } };
  }function c(e) {
    for (var t = e.length - 1; t > 0; t--) {
      var r = Math.floor(Math.random() * (t + 1)),
          n = e[t];e[t] = e[r], e[r] = n;
    }return e;
  }function l(e, t) {
    return t ? (Object.keys(t).forEach(function (r) {
      e[r] = t[r](e);
    }), e) : e;
  }function f(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
      r[n - 1] = arguments[n];
    }var o = 0;return e.replace(/%s/g, function () {
      return encodeURIComponent(r[o++]);
    });
  }var h = { WithinQueryParameters: 0, WithinHeaders: 1 };function d(e, t) {
    var r = e || {},
        n = r.data || {};return Object.keys(r).forEach(function (e) {
      -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e) && (n[e] = r[e]);
    }), { data: Object.entries(n).length > 0 ? n : void 0, timeout: r.timeout || t, headers: r.headers || {}, queryParameters: r.queryParameters || {}, cacheable: r.cacheable };
  }var m = { Read: 1, Write: 2, Any: 3 },
      p = 1,
      v = 2,
      y = 3;function g(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p;return r(r({}, e), {}, { status: t, lastUpdate: Date.now() });
  }function b(e) {
    return "string" == typeof e ? { protocol: "https", url: e, accept: m.Any } : { protocol: e.protocol || "https", url: e.url, accept: e.accept || m.Any };
  }var O = "GET",
      P = "POST";function q(e, t) {
    return Promise.all(t.map(function (t) {
      return e.get(t, function () {
        return Promise.resolve(g(t));
      });
    })).then(function (e) {
      var r = e.filter(function (e) {
        return function (e) {
          return e.status === p || Date.now() - e.lastUpdate > 12e4;
        }(e);
      }),
          n = e.filter(function (e) {
        return function (e) {
          return e.status === y && Date.now() - e.lastUpdate <= 12e4;
        }(e);
      }),
          o = [].concat(a(r), a(n));return { getTimeout: function getTimeout(e, t) {
          return (0 === n.length && 0 === e ? 1 : n.length + 3 + e) * t;
        }, statelessHosts: o.length > 0 ? o.map(function (e) {
          return b(e);
        }) : t };
    });
  }function j(e, t, n, o) {
    var u = [],
        i = function (e, t) {
      if (e.method === O || void 0 === e.data && void 0 === t.data) return;var n = Array.isArray(e.data) ? e.data : r(r({}, e.data), t.data);return JSON.stringify(n);
    }(n, o),
        s = function (e, t) {
      var n = r(r({}, e.headers), t.headers),
          o = {};return Object.keys(n).forEach(function (e) {
        var t = n[e];o[e.toLowerCase()] = t;
      }), o;
    }(e, o),
        c = n.method,
        l = n.method !== O ? {} : r(r({}, n.data), o.data),
        f = r(r(r({ "x-algolia-agent": e.userAgent.value }, e.queryParameters), l), o.queryParameters),
        h = 0,
        d = function t(r, a) {
      var l = r.pop();if (void 0 === l) throw { name: "RetryError", message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.", transporterStackTrace: A(u) };var d = { data: i, headers: s, method: c, url: S(l, n.path, f), connectTimeout: a(h, e.timeouts.connect), responseTimeout: a(h, o.timeout) },
          m = function m(e) {
        var t = { request: d, response: e, host: l, triesLeft: r.length };return u.push(t), t;
      },
          p = { onSuccess: function onSuccess(e) {
          return function (e) {
            try {
              return JSON.parse(e.content);
            } catch (t) {
              throw function (e, t) {
                return { name: "DeserializationError", message: e, response: t };
              }(t.message, e);
            }
          }(e);
        }, onRetry: function onRetry(n) {
          var o = m(n);return n.isTimedOut && h++, Promise.all([e.logger.info("Retryable failure", x(o)), e.hostsCache.set(l, g(l, n.isTimedOut ? y : v))]).then(function () {
            return t(r, a);
          });
        }, onFail: function onFail(e) {
          throw m(e), function (e, t) {
            var r = e.content,
                n = e.status,
                o = r;try {
              o = JSON.parse(r).message;
            } catch (e) {}return function (e, t, r) {
              return { name: "ApiError", message: e, status: t, transporterStackTrace: r };
            }(o, n, t);
          }(e, A(u));
        } };return e.requester.send(d).then(function (e) {
        return function (e, t) {
          return function (e) {
            var t = e.status;return e.isTimedOut || function (e) {
              var t = e.isTimedOut,
                  r = e.status;return !t && 0 == ~~r;
            }(e) || 2 != ~~(t / 100) && 4 != ~~(t / 100);
          }(e) ? t.onRetry(e) : 2 == ~~(e.status / 100) ? t.onSuccess(e) : t.onFail(e);
        }(e, p);
      });
    };return q(e.hostsCache, t).then(function (e) {
      return d(a(e.statelessHosts).reverse(), e.getTimeout);
    });
  }function w(e) {
    var t = { value: "Algolia for JavaScript (".concat(e, ")"), add: function add(e) {
        var r = "; ".concat(e.segment).concat(void 0 !== e.version ? " (".concat(e.version, ")") : "");return -1 === t.value.indexOf(r) && (t.value = "".concat(t.value).concat(r)), t;
      } };return t;
  }function S(e, t, r) {
    var n = T(r),
        o = "".concat(e.protocol, "://").concat(e.url, "/").concat("/" === t.charAt(0) ? t.substr(1) : t);return n.length && (o += "?".concat(n)), o;
  }function T(e) {
    return Object.keys(e).map(function (t) {
      return f("%s=%s", t, (r = e[t], "[object Object]" === Object.prototype.toString.call(r) || "[object Array]" === Object.prototype.toString.call(r) ? JSON.stringify(e[t]) : e[t]));var r;
    }).join("&");
  }function A(e) {
    return e.map(function (e) {
      return x(e);
    });
  }function x(e) {
    var t = e.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};return r(r({}, e), {}, { request: r(r({}, e.request), {}, { headers: r(r({}, e.request.headers), t) }) });
  }var N = function N(e) {
    var t = e.appId,
        n = function (e, t, r) {
      var n = { "x-algolia-api-key": r, "x-algolia-application-id": t };return { headers: function headers() {
          return e === h.WithinHeaders ? n : {};
        }, queryParameters: function queryParameters() {
          return e === h.WithinQueryParameters ? n : {};
        } };
    }(void 0 !== e.authMode ? e.authMode : h.WithinHeaders, t, e.apiKey),
        a = function (e) {
      var t = e.hostsCache,
          r = e.logger,
          n = e.requester,
          a = e.requestsCache,
          u = e.responsesCache,
          i = e.timeouts,
          s = e.userAgent,
          c = e.hosts,
          l = e.queryParameters,
          f = { hostsCache: t, logger: r, requester: n, requestsCache: a, responsesCache: u, timeouts: i, userAgent: s, headers: e.headers, queryParameters: l, hosts: c.map(function (e) {
          return b(e);
        }), read: function read(e, t) {
          var r = d(t, f.timeouts.read),
              n = function n() {
            return j(f, f.hosts.filter(function (e) {
              return 0 != (e.accept & m.Read);
            }), e, r);
          };if (!0 !== (void 0 !== r.cacheable ? r.cacheable : e.cacheable)) return n();var a = { request: e, mappedRequestOptions: r, transporter: { queryParameters: f.queryParameters, headers: f.headers } };return f.responsesCache.get(a, function () {
            return f.requestsCache.get(a, function () {
              return f.requestsCache.set(a, n()).then(function (e) {
                return Promise.all([f.requestsCache.delete(a), e]);
              }, function (e) {
                return Promise.all([f.requestsCache.delete(a), Promise.reject(e)]);
              }).then(function (e) {
                var t = o(e, 2);t[0];return t[1];
              });
            });
          }, { miss: function miss(e) {
              return f.responsesCache.set(a, e);
            } });
        }, write: function write(e, t) {
          return j(f, f.hosts.filter(function (e) {
            return 0 != (e.accept & m.Write);
          }), e, d(t, f.timeouts.write));
        } };return f;
    }(r(r({ hosts: [{ url: "".concat(t, "-dsn.algolia.net"), accept: m.Read }, { url: "".concat(t, ".algolia.net"), accept: m.Write }].concat(c([{ url: "".concat(t, "-1.algolianet.com") }, { url: "".concat(t, "-2.algolianet.com") }, { url: "".concat(t, "-3.algolianet.com") }])) }, e), {}, { headers: r(r(r({}, n.headers()), { "content-type": "application/x-www-form-urlencoded" }), e.headers), queryParameters: r(r({}, n.queryParameters()), e.queryParameters) }));return l({ transporter: a, appId: t, addAlgoliaAgent: function addAlgoliaAgent(e, t) {
        a.userAgent.add({ segment: e, version: t });
      }, clearCache: function clearCache() {
        return Promise.all([a.requestsCache.clear(), a.responsesCache.clear()]).then(function () {});
      } }, e.methods);
  },
      C = function C(e) {
    return function (t) {
      var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = { transporter: e.transporter, appId: e.appId, indexName: t };return l(n, r.methods);
    };
  },
      k = function k(e) {
    return function (t, n) {
      var o = t.map(function (e) {
        return r(r({}, e), {}, { params: T(e.params || {}) });
      });return e.transporter.read({ method: P, path: "1/indexes/*/queries", data: { requests: o }, cacheable: !0 }, n);
    };
  },
      J = function J(e) {
    return function (t, o) {
      return Promise.all(t.map(function (t) {
        var a = t.params,
            u = a.facetName,
            i = a.facetQuery,
            s = n(a, ["facetName", "facetQuery"]);return C(e)(t.indexName, { methods: { searchForFacetValues: F } }).searchForFacetValues(u, i, r(r({}, o), s));
      }));
    };
  },
      E = function E(e) {
    return function (t, r, n) {
      return e.transporter.read({ method: P, path: f("1/answers/%s/prediction", e.indexName), data: { query: t, queryLanguages: r }, cacheable: !0 }, n);
    };
  },
      I = function I(e) {
    return function (t, r) {
      return e.transporter.read({ method: P, path: f("1/indexes/%s/query", e.indexName), data: { query: t }, cacheable: !0 }, r);
    };
  },
      F = function F(e) {
    return function (t, r, n) {
      return e.transporter.read({ method: P, path: f("1/indexes/%s/facets/%s/query", e.indexName, t), data: { facetQuery: r }, cacheable: !0 }, n);
    };
  },
      R = 1,
      D = 2,
      W = 3;function H(e, t, n) {
    var o,
        a = { appId: e, apiKey: t, timeouts: { connect: 1, read: 2, write: 30 }, requester: { send: function send(e) {
          return new Promise(function (t) {
            var r = new XMLHttpRequest();r.open(e.method, e.url, !0), Object.keys(e.headers).forEach(function (t) {
              return r.setRequestHeader(t, e.headers[t]);
            });var n,
                o = function o(e, n) {
              return setTimeout(function () {
                r.abort(), t({ status: 0, content: n, isTimedOut: !0 });
              }, 1e3 * e);
            },
                a = o(e.connectTimeout, "Connection timeout");r.onreadystatechange = function () {
              r.readyState > r.OPENED && void 0 === n && (clearTimeout(a), n = o(e.responseTimeout, "Socket timeout"));
            }, r.onerror = function () {
              0 === r.status && (clearTimeout(a), clearTimeout(n), t({ content: r.responseText || "Network request failed", status: r.status, isTimedOut: !1 }));
            }, r.onload = function () {
              clearTimeout(a), clearTimeout(n), t({ content: r.responseText, status: r.status, isTimedOut: !1 });
            }, r.send(e.data);
          });
        } }, logger: (o = W, { debug: function debug(e, t) {
          return R >= o && console.debug(e, t), Promise.resolve();
        }, info: function info(e, t) {
          return D >= o && console.info(e, t), Promise.resolve();
        }, error: function error(e, t) {
          return console.error(e, t), Promise.resolve();
        } }), responsesCache: s(), requestsCache: s({ serializable: !1 }), hostsCache: i({ caches: [u({ key: "".concat("4.9.3", "-").concat(e) }), s()] }), userAgent: w("4.9.3").add({ segment: "Browser", version: "lite" }), authMode: h.WithinQueryParameters };return N(r(r(r({}, a), n), {}, { methods: { search: k, searchForFacetValues: J, multipleQueries: k, multipleSearchForFacetValues: J, initIndex: function initIndex(e) {
          return function (t) {
            return C(e)(t, { methods: { search: I, searchForFacetValues: F, findAnswers: E } });
          };
        } } }));
  }return H.version = "4.9.3", H;
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/InstantSearch.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/InstantSearch.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lite = __webpack_require__(/*! algoliasearch/lite */ "./node_modules/algoliasearch/dist/algoliasearch-lite.umd.js");

var _lite2 = _interopRequireDefault(_lite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {},
  data: function data() {
    return {
      searchClient: (0, _lite2.default)('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5')
    };
  }
}; //
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/instantsearch.css/themes/satellite-min.css":
/*!*****************************************************************!*\
  !*** ./node_modules/instantsearch.css/themes/satellite-min.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> .ais-Breadcrumb-list,.ais-CurrentRefinements-list,.ais-HierarchicalMenu-list,.ais-Hits-list,.ais-InfiniteHits-list,.ais-InfiniteResults-list,.ais-Menu-list,.ais-NumericMenu-list,.ais-Pagination-list,.ais-RatingMenu-list,.ais-RefinementList-list,.ais-Results-list,.ais-ToggleRefinement-list{margin:0;padding:0;list-style:none}.ais-ClearRefinements-button,.ais-CurrentRefinements-delete,.ais-CurrentRefinements-reset,.ais-GeoSearch-redo,.ais-GeoSearch-reset,.ais-HierarchicalMenu-showMore,.ais-InfiniteHits-loadMore,.ais-InfiniteHits-loadPrevious,.ais-InfiniteResults-loadMore,.ais-Menu-showMore,.ais-RangeInput-submit,.ais-RefinementList-showMore,.ais-SearchBox-reset,.ais-SearchBox-submit,.ais-VoiceSearch-button{padding:0;overflow:visible;font:inherit;line-height:normal;color:inherit;background:none;border:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ais-ClearRefinements-button::-moz-focus-inner,.ais-CurrentRefinements-delete::-moz-focus-inner,.ais-CurrentRefinements-reset::-moz-focus-inner,.ais-GeoSearch-redo::-moz-focus-inner,.ais-GeoSearch-reset::-moz-focus-inner,.ais-HierarchicalMenu-showMore::-moz-focus-inner,.ais-InfiniteHits-loadMore::-moz-focus-inner,.ais-InfiniteHits-loadPrevious::-moz-focus-inner,.ais-InfiniteResults-loadMore::-moz-focus-inner,.ais-Menu-showMore::-moz-focus-inner,.ais-RangeInput-submit::-moz-focus-inner,.ais-RefinementList-showMore::-moz-focus-inner,.ais-SearchBox-reset::-moz-focus-inner,.ais-SearchBox-submit::-moz-focus-inner,.ais-VoiceSearch-button::-moz-focus-inner{padding:0;border:0}.ais-ClearRefinements-button[disabled],.ais-CurrentRefinements-delete[disabled],.ais-CurrentRefinements-reset[disabled],.ais-GeoSearch-redo[disabled],.ais-GeoSearch-reset[disabled],.ais-HierarchicalMenu-showMore[disabled],.ais-InfiniteHits-loadMore[disabled],.ais-InfiniteHits-loadPrevious[disabled],.ais-InfiniteResults-loadMore[disabled],.ais-Menu-showMore[disabled],.ais-RangeInput-submit[disabled],.ais-RefinementList-showMore[disabled],.ais-SearchBox-reset[disabled],.ais-SearchBox-submit[disabled],.ais-VoiceSearch-button[disabled]{cursor:default}.ais-HierarchicalMenu-showMore,.ais-InfiniteHits-loadMore,.ais-InfiniteHits-loadPrevious,.ais-Menu-showMore,.ais-RefinementList-showMore{overflow-anchor:none}.ais-Breadcrumb-item,.ais-Breadcrumb-list,.ais-Pagination-list,.ais-PoweredBy,.ais-RangeInput-form,.ais-RatingMenu-link{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ais-GeoSearch,.ais-GeoSearch-map{height:100%}.ais-HierarchicalMenu-list .ais-HierarchicalMenu-list{margin-left:1em}.ais-PoweredBy-logo{display:block;height:1.2em;width:auto}.ais-RatingMenu-starIcon{display:block;width:20px;height:20px}.ais-SearchBox-input::-ms-clear,.ais-SearchBox-input::-ms-reveal{display:none;width:0;height:0}.ais-SearchBox-input::-webkit-search-cancel-button,.ais-SearchBox-input::-webkit-search-decoration,.ais-SearchBox-input::-webkit-search-results-button,.ais-SearchBox-input::-webkit-search-results-decoration{display:none}.ais-RangeSlider .rheostat{overflow:visible;margin-top:40px;margin-bottom:40px}.ais-RangeSlider .rheostat-background{height:6px;top:0;width:100%}.ais-RangeSlider .rheostat-handle{margin-left:-12px;top:-7px}.ais-RangeSlider .rheostat-background{position:relative;background-color:#fff;border:1px solid #aaa}.ais-RangeSlider .rheostat-progress{position:absolute;top:1px;background-color:#333}.rheostat-handle{position:relative;z-index:1;width:20px;height:20px;background-color:#fff;border:1px solid #333;border-radius:50%;cursor:-webkit-grab;cursor:grab}.rheostat-marker{margin-left:-1px;position:absolute;width:1px;height:5px;background-color:#aaa}.rheostat-marker--large{height:9px}.rheostat-value{padding-top:15px}.rheostat-tooltip,.rheostat-value{margin-left:50%;position:absolute;text-align:center;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.rheostat-tooltip{top:-22px}[class^=ais-]{box-sizing:border-box}.ais-VoiceSearch-button:disabled,[class^=ais-][class$=\"--disabled\"],[class^=ais-][class$=\"--disabled\"] *{cursor:not-allowed}.ais-ClearRefinements-button,.ais-GeoSearch-redo,.ais-GeoSearch-reset,.ais-HierarchicalMenu-showMore,.ais-InfiniteHits-loadMore,.ais-InfiniteHits-loadPrevious,.ais-Menu-showMore,.ais-Pagination-link,.ais-RangeInput-submit,.ais-RefinementList-showMore,.ais-VoiceSearch-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;background-image:linear-gradient(-180deg,#fff,#fcfcfd);border:1px solid #d6d6e7;border-radius:3px;box-shadow:0 1px 0 0 rgba(35,38,59,.05);color:#23263b;cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-size:.875rem;font-weight:400;height:2rem;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;line-height:1.25rem;padding:0 1rem;place-items:center;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ais-GeoSearch-redo,.ais-GeoSearch-reset,.ais-HierarchicalMenu-showMore,.ais-Menu-showMore,.ais-RefinementList-showMore{height:1.5rem}.ais-HierarchicalMenu-showMore,.ais-Menu-showMore,.ais-RefinementList-showMore{margin-top:1rem}.ais-ClearRefinements-button:hover,.ais-GeoSearch-redo:hover,.ais-GeoSearch-reset:hover,.ais-HierarchicalMenu-showMore:hover,.ais-InfiniteHits-loadMore:hover,.ais-InfiniteHits-loadPrevious:hover,.ais-Menu-showMore:hover,.ais-Pagination-item:not(.ais-Pagination-item--selected):not(.ais-Pagination-item--disabled) .ais-Pagination-link:hover,.ais-RangeInput-submit:hover,.ais-RefinementList-showMore:hover,.ais-VoiceSearch-button:hover{background-image:linear-gradient(-180deg,#fff,#f5f5fa);border-color:#d6d6e7}.ais-ClearRefinements-button:focus,.ais-GeoSearch-redo:focus,.ais-GeoSearch-reset:focus,.ais-HierarchicalMenu-showMore:focus,.ais-InfiniteHits-loadMore:focus,.ais-InfiniteHits-loadPrevious:focus,.ais-Menu-showMore:focus,.ais-RangeInput-submit:focus,.ais-RefinementList-showMore:focus,.ais-VoiceSearch-button:focus{background-image:linear-gradient(-180deg,#fff,#f5f5fa);border-color:#3c4fe0;box-shadow:0 0 0 1px #3c4fe0,0 2px 0 1px rgba(35,38,59,.05);outline:medium none currentcolor}.ais-ClearRefinements-button:active,.ais-GeoSearch-redo:active,.ais-GeoSearch-reset:active,.ais-HierarchicalMenu-showMore:active,.ais-InfiniteHits-loadMore:active,.ais-InfiniteHits-loadPrevious:active,.ais-Menu-showMore:active,.ais-Pagination-item--selected .ais-Pagination-link,.ais-Pagination-link:active,.ais-RefinementList-showMore:active,.ais-VoiceSearch-button:active{border-color:#d6d6e7;box-shadow:inset 0 1px 4px 0 rgba(119,122,175,.4),inset 0 1px 1px 0 rgba(119,122,175,.4),0 1px 0 0 rgba(35,38,59,.05)}.ais-ClearRefinements-button:disabled[disabled],.ais-GeoSearch-redo--disabled,.ais-GeoSearch-reset--disabled,.ais-InfiniteHits-loadMore:disabled[disabled],.ais-InfiniteHits-loadPrevious:disabled[disabled],.ais-Pagination-item--disabled .ais-Pagination-link,.ais-VoiceSearch-button:disabled{background-image:linear-gradient(-180deg,#fff,#f5f5fa);border-color:#efeff5;box-shadow:none;color:#b6b7d5}.ais-HierarchicalMenu-showMore--disabled[disabled],.ais-Menu-showMore--disabled[disabled],.ais-RefinementList-showMore--disabled[disabled]{display:none}.ais-HierarchicalMenu-item,.ais-Menu-item,.ais-NumericMenu-label,.ais-RatingMenu-item,.ais-RefinementList-item,.ais-ToggleRefinement-label{display:block;font-size:.875rem;line-height:1.75rem}.ais-HierarchicalMenu-link,.ais-Menu-link,.ais-RatingMenu-link,.ais-RefinementList-label{-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.ais-Breadcrumb-link,.ais-HierarchicalMenu-link,.ais-Menu-link,.ais-RatingMenu-link{color:inherit;text-decoration:none}.ais-Breadcrumb-link:hover{text-decoration:underline}.ais-HierarchicalMenu-label,.ais-Menu-label,.ais-RefinementList-labelText{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ais-HierarchicalMenu-item--selected>.ais-HierarchicalMenu-link>.ais-HierarchicalMenu-label,.ais-Menu-item--selected .ais-Menu-label,.ais-RatingMenu-item--selected,.ais-RefinementList-item--selected{font-weight:600}.ais-HierarchicalMenu-count,.ais-Menu-count,.ais-RatingMenu-count,.ais-RefinementList-count,.ais-ToggleRefinement-count{background:#f5f5fa none repeat scroll 0 0;border:1px solid #b6b7d5;border-radius:99999px;color:#23263b;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-negative:0;flex-shrink:0;font-size:.75rem;font-weight:400;line-height:1rem;margin-left:.5rem;overflow:hidden;padding:0 .25rem}.ais-HierarchicalMenu-noResults,.ais-Menu-noResults,.ais-RefinementList-noResults{color:#5a5e9a;font-size:.875rem;line-height:1.25rem;margin-top:1rem}.ais-HitsPerPage-select,.ais-MenuSelect-select,.ais-SortBy-select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;background-image:url('data:image/svg+xml;utf8,<svg width=\"14\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"%23777aaf\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M13 7L7 1 1 7M1 17l6 6 6-6\"/></g></svg>'),linear-gradient(-180deg,#fff,#fcfcfd);background-position:right 1rem center,0 0;background-repeat:no-repeat;background-size:10px,auto;border:1px solid #d6d6e7;border-radius:3px;box-shadow:0 1px 0 0 rgba(35,38,59,.05);color:#23263b;cursor:pointer;font:inherit;height:2.5rem;outline:medium none currentcolor;padding:0 2.5rem 0 1rem;position:relative;width:100%}.ais-HitsPerPage-select:-moz-focusring,.ais-HitsPerPage-select::-moz-focus-inner,.ais-SortBy-select:-moz-focusring,.ais-SortBy-select::-moz-focus-inner{color:transparent;outline:medium none currentcolor}.ais-HitsPerPage-select>option:not(:checked),.ais-SortBy-select>option:not(:checked){color:#23263b}.ais-HitsPerPage-select>option:disabled,.ais-SortBy-select>option:disabled{color:#b6b7d5}.ais-HitsPerPage-select:hover,.ais-SortBy-select:hover{background-image:url('data:image/svg+xml;utf8,<svg width=\"14\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"%23777aaf\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M13 7L7 1 1 7M1 17l6 6 6-6\"/></g></svg>'),linear-gradient(-180deg,#fcfcfd,#f5f5fa);border-color:#d6d6e7}.ais-HitsPerPage-select:focus,.ais-SortBy-select:focus{background-image:url('data:image/svg+xml;utf8,<svg width=\"14\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"%23777aaf\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M13 7L7 1 1 7M1 17l6 6 6-6\"/></g></svg>'),linear-gradient(-180deg,#fff,#f5f5fa);border-color:#3c4fe0;box-shadow:0 0 0 1px #3c4fe0,0 2px 0 0 rgba(35,38,59,.05)}.ais-HitsPerPage-select:disabled,.ais-SortBy-select:disabled{background-image:url('data:image/svg+xml;utf8,<svg width=\"14\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"%23b6b7d5\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M13 7L7 1 1 7M1 17l6 6 6-6\"/></g></svg>'),linear-gradient(-180deg,#fff,#f5f5fa);border-color:#efeff5;box-shadow:none;color:#b6b7d5;cursor:not-allowed}.ais-Panel{margin-bottom:2rem}.ais-Panel-header{margin-bottom:1rem;text-transform:uppercase}.ais-Panel-footer,.ais-Panel-header{color:#5a5e9a;font-size:.75rem;font-weight:600;line-height:1rem}.ais-Panel-footer{margin-top:1rem}.ais-Panel--collapsible{position:relative}.ais-Panel--collapsible .ais-Panel-collapseButton{background:none;border:none;padding:0;position:absolute;right:0;top:0}.ais-Panel--collapsed .ais-Panel-body,.ais-Panel--collapsed .ais-Panel-footer{display:none}.ais-SearchBox-form{background-color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:.875rem;height:2.5rem;line-height:1.25rem;position:relative;width:100%}.ais-SearchBox-form:before{background:transparent url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235a5e9a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%3E%3C%2Fcircle%3E%3Cline%20x1%3D%2221%22%20y1%3D%2221%22%20x2%3D%2216.65%22%20y2%3D%2216.65%22%3E%3C%2Fline%3E%3C%2Fsvg%3E\") repeat scroll 0 0;content:\"\";height:1rem;left:1rem;margin-top:-.5rem;position:absolute;top:50%;width:1rem}.ais-SearchBox-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid #d6d6e7;border-radius:3px;box-shadow:inset 0 1px 4px 0 rgba(119,122,175,.3);caret-color:#5a5e9a;color:#23263b;-webkit-box-flex:1;-ms-flex:1 1 0%;flex:1 1 0%;font:inherit;max-width:100%;padding-left:2.5rem}.ais-SearchBox-input::-webkit-input-placeholder{color:#5a5e9a}.ais-SearchBox-input:-ms-input-placeholder{color:#5a5e9a}.ais-SearchBox-input::placeholder{color:#5a5e9a}.ais-SearchBox-input:focus{border-color:#3c4fe0;box-shadow:0 1px 0 0 rgba(35,38,59,.05);outline:medium none currentcolor}.ais-SearchBox-input:disabled{background:transparent linear-gradient(-180deg,#fff,#f5f5fa) repeat scroll 0 0;border-color:#efeff5;box-shadow:none;cursor:not-allowed}.ais-SearchBox-input:disabled::-webkit-input-placeholder{color:#b6b7d5;pointer-events:none}.ais-SearchBox-input:disabled:-ms-input-placeholder{color:#b6b7d5;pointer-events:none}.ais-SearchBox-input:disabled::placeholder{color:#b6b7d5;pointer-events:none}.ais-SearchBox-input::-webkit-search-cancel-button,.ais-SearchBox-input::-webkit-search-decoration,.ais-SearchBox-input::-webkit-search-results-button,.ais-SearchBox-input::-webkit-search-results-decoration{-webkit-appearance:none;appearance:none}.ais-SearchBox-loadingIndicator,.ais-SearchBox-reset{-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:50%;display:-webkit-box;display:-ms-flexbox;display:flex;fill:#484c7a;height:20px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:absolute;right:1rem;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:20px}.ais-SearchBox-reset:focus{background:#b6b7d5;fill:#fff;outline:0}.ais-RefinementList-searchBox .ais-SearchBox-loadingIndicator,.ais-RefinementList-searchBox .ais-SearchBox-reset{right:.5rem}.ais-SearchBox-loadingIndicator[hidden],.ais-SearchBox-reset[hidden],.ais-SearchBox-submit{display:none}.ais-Menu-searchBox,.ais-RefinementList-searchBox{margin-bottom:.5rem}.ais-Menu-searchBox .ais-SearchBox-form,.ais-RefinementList-searchBox .ais-SearchBox-form{height:2rem}.ais-Menu-searchBox .ais-SearchBox-form:before,.ais-RefinementList-searchBox .ais-SearchBox-form:before{left:.5rem}.ais-Menu-searchBox .ais-SearchBox-input,.ais-RefinementList-searchBox .ais-SearchBox-input{padding-left:2rem}.ais-VoiceSearch-button{color:#5a5e9a;height:48px;width:48px}.ais-VoiceSearch-button svg{color:currentcolor}.ais-Highlight-highlighted,.ais-Snippet-highlighted{background-color:rgba(84,104,255,.1);color:#5468ff;font-style:normal}.ais-Hits-item,.ais-InfiniteHits-item{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#fff;box-shadow:0 0 0 1px rgba(35,38,59,.05),0 1px 3px 0 rgba(35,38,59,.15);display:-webkit-box;display:-ms-flexbox;display:flex;font-size:.875rem;font-weight:400;line-height:1.25rem;padding:1.5rem}.ais-Hits-item:first-of-type,.ais-InfiniteHits-item:first-of-type{border-radius:3px 3px 0 0}.ais-Hits-item:last-of-type,.ais-InfiniteHits-item:last-of-type{border-radius:0 0 3px 3px}.ais-Hits-item:only-of-type,.ais-InfiniteHits-item:only-of-type{border-radius:3px}.ais-InfiniteHits-loadMore,.ais-InfiniteHits-loadPrevious{display:-webkit-box;display:-ms-flexbox;display:flex;margin:1rem auto}.ais-GeoSearch{position:relative}.ais-GeoSearch-control{left:3.75rem;position:absolute;top:1rem}.ais-GeoSearch-label{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#f5f5fa;border:1px solid #b6b7d5;border-radius:3px;cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-size:.875rem;line-height:1.5;min-height:1.5rem;padding:.25rem .5rem}.ais-GeoSearch-label,.ais-GeoSearch-redo,.ais-GeoSearch-reset{white-space:nowrap}.ais-GeoSearch-reset{bottom:1.25rem;left:50%;position:absolute;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.ais-GeoSearch-input,.ais-RefinementList-checkbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;background-position:50%;background-size:180%;border:1px solid currentcolor;border-radius:3px;box-shadow:inset 0 1px 4px 0 rgba(119,122,175,.4);color:#d6d6e7;cursor:inherit;height:1rem;margin:0 .5rem 0 0;min-width:1rem}.ais-GeoSearch-input:checked,.ais-RefinementList-item--selected .ais-RefinementList-checkbox{background-image:url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235468ff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E\");background-size:14px;border-color:currentcolor;box-shadow:inset 0 1px 0 0 rgba(35,38,59,.05);color:#3c4fe0}.ais-GeoSearch-input:focus,.ais-RefinementList-checkbox:focus{outline:medium none currentcolor}.ais-GeoSearch-input:checked:focus,.ais-RefinementList-item--selected .ais-RefinementList-checkbox:focus{box-shadow:inset 0 1px 0 0 rgba(35,38,59,.05),0 0 0 1px currentcolor}.ais-NumericMenu-label{-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex}.ais-NumericMenu-radio{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:#fff;border:1px solid #d6d6e7;border-radius:50%;box-shadow:inset 0 1px 4px 0 rgba(119,122,175,.3);height:16px;margin:0 .5rem 0 0;outline:0;position:relative;width:16px}.ais-NumericMenu-radio:checked,.ais-NumericMenu-radio:focus{border-color:#3c4fe0;box-shadow:0 1px 0 0 rgba(35,38,59,.05)}.ais-NumericMenu-radio:focus{box-shadow:0 0 0 1px #3c4fe0,0 1px 0 0 rgba(35,38,59,.05)}.ais-NumericMenu-radio:checked:after{background:#3c4fe0;border-radius:50%;bottom:4px;content:\"\";left:4px;position:absolute;right:4px;top:4px}.ais-HierarchicalMenu-list .ais-HierarchicalMenu-list{margin-left:1.5rem}.ais-HierarchicalMenu-link:before{background-image:url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23b6b7d5%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2218%2015%2012%209%206%2015%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E\");background-repeat:no-repeat;content:\"\";display:inline-block;height:1rem;margin-right:.5rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:1rem}.ais-HierarchicalMenu-item--selected>.ais-HierarchicalMenu-link:before{background-image:url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235468ff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E\")}.ais-RatingMenu-starIcon{margin-right:.25rem;fill:#5a5e9a;position:relative;width:16px}.ais-RatingMenu-item--disabled .ais-RatingMenu-starIcon{fill:#b6b7d5}.ais-RatingMenu-item--disabled .ais-RatingMenu-count,.ais-RatingMenu-item--disabled .ais-RatingMenu-label{color:#b6b7d5}.ais-ClearRefinements-button{width:100%}.ais-CurrentRefinements-list{display:inline-grid;gap:1rem;grid-auto-flow:column}.ais-CurrentRefinements-item{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#f5f5fa;border:1px solid #b6b7d5;border-radius:3px;display:-webkit-box;display:-ms-flexbox;display:flex;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-size:.875rem;line-height:1.5;min-height:1.5rem;padding:.05rem .5rem}.ais-CurrentRefinements-category{display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:.5rem}.ais-CurrentRefinements-delete{color:#9698c3;height:100%;margin-left:.25rem;outline-width:0}.ais-ToggleRefinement-label{-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.ais-ToggleRefinement-checkbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:rgba(65,66,71,.08);background:#f5f5fa;border-radius:9999px;box-shadow:inset 0 1px 4px 0 rgba(119,122,175,.4);height:18px;pointer-events:none;position:relative;width:32px}.ais-ToggleRefinement-checkbox:checked{background:#3c4fe0;box-shadow:inset 0 1px 4px 0 rgba(35,38,59,.1)}.ais-ToggleRefinement-checkbox:focus{outline:0}.ais-ToggleRefinement-checkbox:after{background:linear-gradient(-180deg,#fff,#f5f5fa);border-radius:9999px;box-shadow:1px 1px 1px 0 rgba(35,38,59,.05);content:\"\";height:16px;left:1px;position:absolute;top:1px;transition:all .1s ease-in-out;width:16px}.ais-ToggleRefinement-checkbox:checked:after{-webkit-transform:translateX(14px);transform:translateX(14px)}.ais-RangeInput-input{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;border:1px solid #d6d6e7;border-radius:3px;box-shadow:inset 0 1px 4px 0 rgba(119,122,175,.3);caret-color:#5a5e9a;color:#23263b;cursor:text;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:.875rem;height:2rem;line-height:1.25rem;min-width:0;overflow:hidden;padding:0 1rem;position:relative}.ais-RangeInput-input:focus{border-color:#3c4fe0;box-shadow:0 1px 0 0 rgba(35,38,59,.05);outline:0}.ais-RangeInput-separator{margin:0 .5rem}.ais-RangeInput-submit{margin-left:.5rem}.ais-RangeSlider .rheostat{margin:40px 6px}.ais-RangeSlider .rheostat-horizontal{cursor:pointer;width:calc(100% - 15px)}.ais-RangeSlider .rheostat-background{background-color:transparent;border:none;border-radius:3px;box-shadow:inset 0 1px 3px 0 rgba(0,0,0,.1),0 .5px 0 0 hsla(0,0%,100%,.05);height:4px}.ais-RangeSlider .rheostat-progress{background-color:#3c4fe0;border-radius:3px;height:4px;max-width:100%;top:0}.ais-RangeSlider .rheostat-tooltip{font-weight:700;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ais-RangeSlider .rheostat-handle{background-color:#fff;background-image:linear-gradient(-180deg,#fff,#fcfcfd);border:1px solid #d6d6e7;border-radius:2px;box-shadow:0 1px 0 0 rgba(35,38,59,.05);height:24px;margin-left:-6px;top:-11px;width:12px}.ais-RangeSlider .rheostat-handle:after,.ais-RangeSlider .rheostat-handle:before{background-color:#d6d6e7;content:\"\";height:12px;position:absolute;top:6px;width:1px}.ais-RangeSlider .rheostat-handle:before{left:4px}.ais-RangeSlider .rheostat-handle:after{right:4px}.ais-RangeSlider .rheostat-marker{background-color:#d6d6e7}.ais-Pagination-item:first-child>.ais-Pagination-link{border-radius:3px 0 0 3px}.ais-Pagination-item+.ais-Pagination-item>.ais-Pagination-link{border-radius:0;margin-left:-1px}.ais-Pagination-item:last-child>.ais-Pagination-link{border-radius:0 3px 3px 0}.ais-Pagination-item{display:inline-block}.ais-Pagination-item--selected .ais-Pagination-link{font-weight:700}.ais-Breadcrumb-link,.ais-Breadcrumb-separator{color:#5a5e9a}.ais-Breadcrumb-separator{display:-webkit-box;display:-ms-flexbox;display:flex;margin:0 .5rem}.ais-Breadcrumb-item--selected{font-weight:600}.ais-Breadcrumb-item--selected .ais-Breadcrumb-separator{font-weight:400}@media (max-width:767px){.ais-RangeInput-input,.ais-SearchBox-input{font-size:1rem}}");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js?!./src/js/InstantSearch.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib??vue-loader-options!./src/js/InstantSearch.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (31:5)\nFile was processed with these loaders:\n * ./node_modules/vue-loader/lib/index.js\nYou may need an additional loader to handle the result of these loaders.\n| \n| \n> body {\n|   font-family: sans-serif;\n|   padding: 1em;");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/InstantSearch.vue?vue&type=template&id=1208f248&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/InstantSearch.vue?vue&type=template&id=1208f248& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ais-instant-search",
    {
      attrs: {
        "search-client": _vm.searchClient,
        "index-name": "demo_ecommerce"
      }
    },
    [
      _c("ais-search-box"),
      _vm._v(" "),
      _c("ais-hits", {
        scopedSlots: _vm._u([
          {
            key: "item",
            fn: function(ref) {
              var item = ref.item
              return _c("div", {}, [_c("h2", [_vm._v(_vm._s(item.name))])])
            }
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./src/js/InstantSearch.vue":
/*!**********************************!*\
  !*** ./src/js/InstantSearch.vue ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InstantSearch_vue_vue_type_template_id_1208f248___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InstantSearch.vue?vue&type=template&id=1208f248& */ "./src/js/InstantSearch.vue?vue&type=template&id=1208f248&");
/* harmony import */ var _InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InstantSearch.vue?vue&type=script&lang=js& */ "./src/js/InstantSearch.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _InstantSearch_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InstantSearch.vue?vue&type=style&index=0&lang=css& */ "./src/js/InstantSearch.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InstantSearch_vue_vue_type_template_id_1208f248___WEBPACK_IMPORTED_MODULE_0__["render"],
  _InstantSearch_vue_vue_type_template_id_1208f248___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/InstantSearch.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/InstantSearch.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/js/InstantSearch.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--0!../../node_modules/vue-loader/lib??vue-loader-options!./InstantSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/InstantSearch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/js/InstantSearch.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************!*\
  !*** ./src/js/InstantSearch.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib??vue-loader-options!./InstantSearch.vue?vue&type=style&index=0&lang=css& */ "./node_modules/vue-loader/lib/index.js?!./src/js/InstantSearch.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/js/InstantSearch.vue?vue&type=template&id=1208f248&":
/*!*****************************************************************!*\
  !*** ./src/js/InstantSearch.vue?vue&type=template&id=1208f248& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_template_id_1208f248___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./InstantSearch.vue?vue&type=template&id=1208f248& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/InstantSearch.vue?vue&type=template&id=1208f248&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_template_id_1208f248___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InstantSearch_vue_vue_type_template_id_1208f248___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _InstantSearch = __webpack_require__(/*! ./InstantSearch.vue */ "./src/js/InstantSearch.vue");

var _InstantSearch2 = _interopRequireDefault(_InstantSearch);

__webpack_require__(/*! instantsearch.css/themes/satellite-min.css */ "./node_modules/instantsearch.css/themes/satellite-min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component("vue-instantsearch", _InstantSearch2.default);

window.vueAlgoliaSearch = { InstantSearch: _InstantSearch2.default };

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/js/main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");


/***/ })

/******/ });
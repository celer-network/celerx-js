"use strict";

function binary_to_base64(e) {
    for (
        var r = new Uint8Array(e),
            t = new Array(),
            n = 0,
            i = 0,
            a = new Array(3),
            o = new Array(4),
            d = r.length,
            c = 0; d--;

    )
        if (((a[n++] = r[c++]), 3 == n)) {
            for (
                o[0] = (252 & a[0]) >> 2,
                o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4),
                o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6),
                o[3] = 63 & a[2],
                n = 0; n < 4; n++
            )
                t += base64_chars.charAt(o[n]);
            n = 0;
        }
    if (n) {
        for (i = n; i < 3; i++) a[i] = 0;
        for (
            o[0] = (252 & a[0]) >> 2,
            o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4),
            o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6),
            o[3] = 63 & a[2],
            i = 0; i < n + 1; i++
        )
            t += base64_chars.charAt(o[i]);
        for (; n++ < 3;) t += "=";
    }
    return t;
}

function dec2hex(e) {
    for (var r = hD.substr(15 & e, 1); e > 15;)
        (e >>= 4), (r = hD.substr(15 & e, 1) + r);
    return r;
}

function base64_decode(e) {
    var r,
        t,
        n,
        i,
        a,
        o,
        d,
        c = new Array(),
        s = 0,
        u = e;
    if (
        ((e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "")),
            u != e &&
            alert(
                "Warning! Characters outside Base64 range in input string ignored."
            ),
            e.length % 4)
    )
        return alert("Error: Input length is not a multiple of 4 bytes."), "";
    for (var l = 0; s < e.length;)
        (i = keyStr.indexOf(e.charAt(s++))),
        (a = keyStr.indexOf(e.charAt(s++))),
        (o = keyStr.indexOf(e.charAt(s++))),
        (d = keyStr.indexOf(e.charAt(s++))),
        (r = (i << 2) | (a >> 4)),
        (t = ((15 & a) << 4) | (o >> 2)),
        (n = ((3 & o) << 6) | d),
        (c[l++] = r),
        64 != o && (c[l++] = t),
        64 != d && (c[l++] = n);
    return c;
}
var _typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function (e) {
        return typeof e;
    } :
    function (e) {
        return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype ?
            "symbol" :
            typeof e;
    },
    bridge = {
        default: void 0,
        call: function (e, r, t) {
            var n = "";
            if (
                ("function" == typeof r && ((t = r), (r = {})),
                    (r = {
                        data: void 0 === r ? null : r
                    }),
                    "function" == typeof t)
            ) {
                var i = "dscb" + window.dscb++;
                (window[i] = t), (r._dscbstub = i);
            }
            return (
                (r = JSON.stringify(r)),
                window._dsbridge ?
                (n = _dsbridge.call(e, r)) :
                (window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")) &&
                (n = prompt("_dsbridge=" + e, r)),
                JSON.parse(n || "{}").data
            );
        },
        register: function (e, r, t) {
            (t = t ? window._dsaf : window._dsf),
            window._dsInit ||
                ((window._dsInit = !0),
                    setTimeout(function () {
                        bridge.call("_dsb.dsinit");
                    }, 0)),
                "object" == (void 0 === r ? "undefined" : _typeof(r)) ?
                (t._obs[e] = r) :
                (t[e] = r);
        },
        registerAsyn: function (e, r) {
            this.register(e, r, !0);
        },
        hasNativeMethod: function (e, r) {
            return this.call("_dsb.hasNativeMethod", {
                name: e,
                type: r || "all"
            });
        },
        disableJavascriptDialogBlock: function (e) {
            this.call("_dsb.disableJavascriptDialogBlock", {
                disable: !1 !== e
            });
        },
    };
!(function () {
    if (!window._dsf) {
        var e,
            r = {
                _dsf: {
                    _obs: {}
                },
                _dsaf: {
                    _obs: {}
                },
                dscb: 0,
                celerx: bridge,
                close: function () {
                    bridge.call("_dsb.closePage");
                },
                _handleMessageFromNative: function (e) {
                    var r = JSON.parse(e.data),
                        t = {
                            id: e.callbackId,
                            complete: !0
                        },
                        n = this._dsf[e.method],
                        i = this._dsaf[e.method],
                        a = function (e, n) {
                            (t.data = e.apply(n, r)), bridge.call("_dsb.returnValue", t);
                        },
                        o = function (e, n) {
                            r.push(function (e, r) {
                                    (t.data = e),
                                    (t.complete = !1 !== r),
                                    bridge.call("_dsb.returnValue", t);
                                }),
                                e.apply(n, r);
                        };
                    if (n) a(n, this._dsf);
                    else if (i) o(i, this._dsaf);
                    else if (((n = e.method.split(".")), !(2 > n.length))) {
                        e = n.pop();
                        var n = n.join("."),
                            i = this._dsf._obs,
                            i = i[n] || {},
                            d = i[e];
                        d && "function" == typeof d ?
                            a(d, i) :
                            ((i = this._dsaf._obs),
                                (i = i[n] || {}),
                                (d = i[e]) && "function" == typeof d && o(d, i));
                    }
                },
            };
        for (e in r) window[e] = r[e];
        bridge.register("_hasJavascriptMethod", function (e, r) {
            return (
                (r = e.split(".")),
                2 > r.length ?
                !(!_dsf[r] && !_dsaf[r]) :
                ((e = r.pop()),
                    (r = r.join(".")),
                    (r = _dsf._obs[r] || _dsaf._obs[r]) && !!r[e])
            );
        });
    }
})();
var base64_chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    hD = "0123456789ABCDEF",
    keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _provideScore = {
        callback: function () {
            return "";
        },
    },
    _provideCurrentFrameData = {
        callback: function () {
            return "";
        },
    };
bridge.register("provideScore", function () {
        return _provideScore.callback();
    }),
    bridge.register("provideCurrentFrameData", function () {
        return _provideCurrentFrameData.callback();
    }),
    (module.exports = window["celerSDK"] = {
        onStateReceived: function (e) {
            return bridge.register("onStateReceived", function (r) {
                var t = base64_decode(r);
                return e(new Uint8Array(t));
            });
        },
        onCourtModeStarted: function (e) {
            return bridge.register("onCourtModeStarted", e);
        },
        getMatch: function () {
            var e = bridge.call("getMatch", "123");
            try {
                e = JSON.parse(e);
            } catch (e) {}
            return e;
        },
        showCourtModeDialog: function () {
            return bridge.call("showCourtModeDialog");
        },
        start: function () {
            return bridge.call("start");
        },
        sendState: function (e) {
            return bridge.call("sendState", binary_to_base64(e));
        },
        draw: function (e) {
            return bridge.call("draw", binary_to_base64(e));
        },
        win: function (e) {
            return bridge.call("win", binary_to_base64(e));
        },
        lose: function (e) {
            return bridge.call("lose", binary_to_base64(e));
        },
        surrender: function (e) {
            return bridge.call("surrender", binary_to_base64(e));
        },
        applyAction: function (e, r) {
            return bridge.call("applyAction", binary_to_base64(e), r);
        },
        getOnChainState: function (e) {
            return bridge.call("getOnChainState", "123", function (r) {
                var t = base64_decode(r);
                return e(new Uint8Array(t));
            });
        },
        getOnChainActionDeadline: function (e) {
            return bridge.call("getOnChainActionDeadline", "123", e);
        },
        getCurrentBlockNumber: function () {
            return bridge.call("getCurrentBlockNumber", "123");
        },
        finalizeOnChainGame: function (e) {
            return bridge.call("finalizeOnChainGame", "123", e);
        },
        submitScore: function (e) {
            return bridge.call("submitScore", e);
        },
        ready: function () {
            return bridge.call("ready");
        },
        onStart: function (e) {
            return bridge.register("onStart", e);
        },
        provideScore: function (e) {
            return (_provideScore = {
                callback: e
            });
        },
        provideCurrentFrameData: function (e) {
            return (_provideCurrentFrameData = {
                callback: e
            });
        },
        /** 上报游戏截屏数据 */
        didTakeSnapshot: function (e) {
            if (
                window["webkit"] &&
                window["webkit"].messageHandlers &&
                window["webkit"].messageHandlers["celerSDK"] &&
                window["webkit"].messageHandlers["celerSDK"].postMessage
            ) {
                window["webkit"].messageHandlers["celerSDK"].postMessage({
                    method: "didTakeSnapshot",
                    args: e,
                });
            } else {
                return bridge.call("didTakeSnapshot", e)
            }
        },

        /** 上报log */
        log: function (e) {
            if (
                window["webkit"] &&
                window["webkit"].messageHandlers &&
                window["webkit"].messageHandlers["celerSDK"] &&
                window.webkit.messageHandlers["celerSDK"].postMessage
            ) {
                window.webkit.messageHandlers["celerSDK"].postMessage({
                    method: "log",
                    args: e,
                });
            } else {
                return bridge.call("log", e)
            }
        },

        /** 获取当前游戏分数 */
        getGameScore: function () {
            if (
                !_provideScore ||
                !_provideScore.callback ||
                _provideScore.callback() == ""
            ) {
                return 0;
            }
            return _provideScore.callback();
        },

        /** 切换游戏截屏数据的flag */
        switchSnapShotFlag: function () {
            if (
                !_provideCurrentFrameData ||
                !_provideCurrentFrameData.callback ||
                _provideCurrentFrameData.callback() == ""
            ) {
                return 0;
            }
            return _provideCurrentFrameData.callback();
        },
    });
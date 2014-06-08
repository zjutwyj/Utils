!
    function(a, b) {
        function c(a) {
            var b = a.length,
                c = kb.type(a);
            return kb.isWindow(a) ? !1: 1 === a.nodeType && b ? !0: "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
        }
        function d(a) {
            var b = zb[a] = {};
            return kb.each(a.match(mb) || [],
                function(a, c) {
                    b[c] = !0
                }),
                b
        }
        function e(a, c, d, e) {
            if (kb.acceptData(a)) {
                var f,
                    g,
                    h = kb.expando,
                    i = a.nodeType,
                    j = i ? kb.cache: a,
                    k = i ? a[h] : a[h] && h;
                if (k && j[k] && (e || j[k].data) || d !== b || "string" != typeof c) return k || (k = i ? a[h] = bb.pop() || kb.guid++:h),
                    j[k] || (j[k] = i ? {}: {
                    toJSON: kb.noop
                }),
                    ("object" == typeof c || "function" == typeof c) && (e ? j[k] = kb.extend(j[k], c) : j[k].data = kb.extend(j[k].data, c)),
                    g = j[k],
                    e || (g.data || (g.data = {}), g = g.data),
                    d !== b && (g[kb.camelCase(c)] = d),
                        "string" == typeof c ? (f = g[c], null == f && (f = g[kb.camelCase(c)])) : f = g,
                    f
            }
        }
        function f(a, b, c) {
            if (kb.acceptData(a)) {
                var d,
                    e,
                    f = a.nodeType,
                    g = f ? kb.cache: a,
                    i = f ? a[kb.expando] : kb.expando;
                if (g[i]) {
                    if (b && (d = c ? g[i] : g[i].data)) {
                        kb.isArray(b) ? b = b.concat(kb.map(b, kb.camelCase)) : b in d ? b = [b] : (b = kb.camelCase(b), b = b in d ? [b] : b.split(" ")),
                            e = b.length;
                        for (; e--;) delete d[b[e]];
                        if (c ? !h(d) : !kb.isEmptyObject(d)) return
                    } (c || (delete g[i].data, h(g[i]))) && (f ? kb.cleanData([a], !0) : kb.support.deleteExpando || g != g.window ? delete g[i] : g[i] = null)
                }
            }
        }
        function g(a, c, d) {
            if (d === b && 1 === a.nodeType) {
                var e = "data-" + c.replace(Bb, "-$1").toLowerCase();
                if (d = a.getAttribute(e), "string" == typeof d) {
                    try {
                        d = "true" === d ? !0: "false" === d ? !1: "null" === d ? null: +d + "" === d ? +d: Ab.test(d) ? kb.parseJSON(d) : d
                    } catch(f) {}
                    kb.data(a, c, d)
                } else d = b
            }
            return d
        }
        function h(a) {
            var b;
            for (b in a) if (("data" !== b || !kb.isEmptyObject(a[b])) && "toJSON" !== b) return ! 1;
            return ! 0
        }
        function i() {
            return ! 0
        }
        function j() {
            return ! 1
        }
        function k() {
            try {
                return Y.activeElement
            } catch(a) {}
        }
        function l(a, b) {
            do a = a[b];
            while (a && 1 !== a.nodeType);
            return a
        }
        function m(a, b, c) {
            if (kb.isFunction(b)) return kb.grep(a,
                function(a, d) {
                    return !! b.call(a, d, a) !== c
                });
            if (b.nodeType) return kb.grep(a,
                function(a) {
                    return a === b !== c
                });
            if ("string" == typeof b) {
                if (Qb.test(b)) return kb.filter(b, a, c);
                b = kb.filter(b, a)
            }
            return kb.grep(a,
                function(a) {
                    return kb.inArray(a, b) >= 0 !== c
                })
        }
        function n(a) {
            var b = Ub.split("|"),
                c = a.createDocumentFragment();
            if (c.createElement) for (; b.length;) c.createElement(b.pop());
            return c
        }
        function o(a, b) {
            return kb.nodeName(a, "table") && kb.nodeName(1 === b.nodeType ? b: b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }
        function p(a) {
            return a.type = (null !== kb.find.attr(a, "type")) + "/" + a.type,
                a
        }
        function q(a) {
            var b = ec.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"),
                a
        }
        function r(a, b) {
            for (var c, d = 0; null != (c = a[d]); d++) kb._data(c, "globalEval", !b || kb._data(b[d], "globalEval"))
        }
        function s(a, b) {
            if (1 === b.nodeType && kb.hasData(a)) {
                var c,
                    d,
                    e,
                    f = kb._data(a),
                    g = kb._data(b, f),
                    h = f.events;
                if (h) {
                    delete g.handle,
                        g.events = {};
                    for (c in h) for (d = 0, e = h[c].length; e > d; d++) kb.event.add(b, c, h[c][d])
                }
                g.data && (g.data = kb.extend({},
                    g.data))
            }
        }
        function t(a, b) {
            var c,
                d,
                e;
            if (1 === b.nodeType) {
                if (c = b.nodeName.toLowerCase(), !kb.support.noCloneEvent && b[kb.expando]) {
                    e = kb._data(b);
                    for (d in e.events) kb.removeEvent(b, d, e.handle);
                    b.removeAttribute(kb.expando)
                }
                "script" === c && b.text !== a.text ? (p(b).text = a.text, q(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), kb.support.html5Clone && a.innerHTML && !kb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && bc.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected: ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
            }
        }
        function u(a, c) {
            var d,
                e,
                f = 0,
                g = typeof a.getElementsByTagName !== W ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== W ? a.querySelectorAll(c || "*") : b;
            if (!g) for (g = [], d = a.childNodes || a; null != (e = d[f]); f++) ! c || kb.nodeName(e, c) ? g.push(e) : kb.merge(g, u(e, c));
            return c === b || c && kb.nodeName(a, c) ? kb.merge([a], g) : g
        }
        function v(a) {
            bc.test(a.type) && (a.defaultChecked = a.checked)
        }
        function w(a, b) {
            if (b in a) return b;
            for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = yc.length; e--;) if (b = yc[e] + c, b in a) return b;
            return d
        }
        function x(a, b) {
            return a = b || a,
                "none" === kb.css(a, "display") || !kb.contains(a.ownerDocument, a)
        }
        function y(a, b) {
            for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g],
                d.style && (f[g] = kb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && x(d) && (f[g] = kb._data(d, "olddisplay", C(d.nodeName)))) : f[g] || (e = x(d), (c && "none" !== c || !e) && kb._data(d, "olddisplay", e ? c: kb.css(d, "display"))));
            for (g = 0; h > g; g++) d = a[g],
                d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "": "none"));
            return a
        }
        function z(a, b, c) {
            var d = rc.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }
        function A(a, b, c, d, e) {
            for (var f = c === (d ? "border": "content") ? 4: "width" === b ? 1: 0, g = 0; 4 > f; f += 2)"margin" === c && (g += kb.css(a, c + xc[f], !0, e)),
                d ? ("content" === c && (g -= kb.css(a, "padding" + xc[f], !0, e)), "margin" !== c && (g -= kb.css(a, "border" + xc[f] + "Width", !0, e))) : (g += kb.css(a, "padding" + xc[f], !0, e), "padding" !== c && (g += kb.css(a, "border" + xc[f] + "Width", !0, e)));
            return g
        }
        function B(a, b, c) {
            var d = !0,
                e = "width" === b ? a.offsetWidth: a.offsetHeight,
                f = kc(a),
                g = kb.support.boxSizing && "border-box" === kb.css(a, "boxSizing", !1, f);
            if (0 >= e || null == e) {
                if (e = lc(a, b, f), (0 > e || null == e) && (e = a.style[b]), sc.test(e)) return e;
                d = g && (kb.support.boxSizingReliable || e === a.style[b]),
                    e = parseFloat(e) || 0
            }
            return e + A(a, b, c || (g ? "border": "content"), d, f) + "px"
        }
        function C(a) {
            var b = Y,
                c = uc[a];
            return c || (c = D(a, b), "none" !== c && c || (jc = (jc || kb("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (jc[0].contentWindow || jc[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = D(a, b), jc.detach()), uc[a] = c),
                c
        }
        function D(a, b) {
            var c = kb(b.createElement(a)).appendTo(b.body),
                d = kb.css(c[0], "display");
            return c.remove(),
                d
        }
        function E(a, b, c, d) {
            var e;
            if (kb.isArray(b)) kb.each(b,
                function(b, e) {
                    c || Ac.test(a) ? d(a, e) : E(a + "[" + ("object" == typeof e ? b: "") + "]", e, c, d)
                });
            else if (c || "object" !== kb.type(b)) d(a, b);
            else for (e in b) E(a + "[" + e + "]", b[e], c, d)
        }
        function F(a) {
            return function(b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d,
                    e = 0,
                    f = b.toLowerCase().match(mb) || [];
                if (kb.isFunction(c)) for (; d = f[e++];)"+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }
        function G(a, b, c, d) {
            function e(h) {
                var i;
                return f[h] = !0,
                    kb.each(a[h] || [],
                        function(a, h) {
                            var j = h(b, c, d);
                            return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0: (b.dataTypes.unshift(j), e(j), !1)
                        }),
                    i
            }
            var f = {},
                g = a === Rc;
            return e(b.dataTypes[0]) || !f["*"] && e("*")
        }
        function H(a, c) {
            var d,
                e,
                f = kb.ajaxSettings.flatOptions || {};
            for (e in c) c[e] !== b && ((f[e] ? a: d || (d = {}))[e] = c[e]);
            return d && kb.extend(!0, a, d),
                a
        }
        function I(a, c, d) {
            for (var e, f, g, h, i = a.contents, j = a.dataTypes;
                 "*" === j[0];) j.shift(),
                f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
            if (f) for (h in i) if (i[h] && i[h].test(f)) {
                j.unshift(h);
                break
            }
            if (j[0] in d) g = j[0];
            else {
                for (h in d) {
                    if (!j[0] || a.converters[h + " " + j[0]]) {
                        g = h;
                        break
                    }
                    e || (e = h)
                }
                g = g || e
            }
            return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0
        }
        function J(a, b, c, d) {
            var e,
                f,
                g,
                h,
                i,
                j = {},
                k = a.dataTypes.slice();
            if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f;) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;
            else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                    g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                    break
                }
                if (g !== !0) if (g && a["throws"]) b = g(b);
                else try {
                        b = g(b)
                    } catch(l) {
                        return {
                            state: "parsererror",
                            error: g ? l: "No conversion from " + i + " to " + f
                        }
                    }
            }
            return {
                state: "success",
                data: b
            }
        }
        function K() {
            try {
                return new a.XMLHttpRequest
            } catch(b) {}
        }
        function L() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch(b) {}
        }
        function M() {
            return setTimeout(function() {
                $c = b
            }),
                $c = kb.now()
        }
        function N(a, b, c) {
            for (var d, e = (ed[b] || []).concat(ed["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
        }
        function O(a, b, c) {
            var d,
                e,
                f = 0,
                g = dd.length,
                h = kb.Deferred().always(function() {
                    delete i.elem
                }),
                i = function() {
                    if (e) return ! 1;
                    for (var b = $c || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]),
                            1 > f && i ? c: (h.resolveWith(a, [j]), !1)
                },
                j = h.promise({
                    elem: a,
                    props: kb.extend({},
                        b),
                    opts: kb.extend(!0, {
                            specialEasing: {}
                        },
                        c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: $c || M(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c) {
                        var d = kb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d),
                            d
                    },
                    stop: function(b) {
                        var c = 0,
                            d = b ? j.tweens.length: 0;
                        if (e) return this;
                        for (e = !0; d > c; c++) j.tweens[c].run(1);
                        return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
                            this
                    }
                }),
                k = j.props;
            for (P(k, j.opts.specialEasing); g > f; f++) if (d = dd[f].call(j, a, k, j.opts)) return d;
            return kb.map(k, N, j),
                kb.isFunction(j.opts.start) && j.opts.start.call(a, j),
                kb.fx.timer(kb.extend(i, {
                    elem: a,
                    anim: j,
                    queue: j.opts.queue
                })),
                j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }
        function P(a, b) {
            var c,
                d,
                e,
                f,
                g;
            for (c in a) if (d = kb.camelCase(c), e = b[d], f = a[c], kb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = kb.cssHooks[d], g && "expand" in g) {
                f = g.expand(f),
                    delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
        }
        function Q(a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j = this,
                k = {},
                l = a.style,
                m = a.nodeType && x(a),
                n = kb._data(a, "fxshow");
            c.queue || (h = kb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
                h.unqueued || i()
            }), h.unqueued++, j.always(function() {
                j.always(function() {
                    h.unqueued--,
                        kb.queue(a, "fx").length || h.empty.fire()
                })
            })),
                1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [l.overflow, l.overflowX, l.overflowY], "inline" === kb.css(a, "display") && "none" === kb.css(a, "float") && (kb.support.inlineBlockNeedsLayout && "inline" !== C(a.nodeName) ? l.zoom = 1: l.display = "inline-block")),
                c.overflow && (l.overflow = "hidden", kb.support.shrinkWrapBlocks || j.always(function() {
                l.overflow = c.overflow[0],
                    l.overflowX = c.overflow[1],
                    l.overflowY = c.overflow[2]
            }));
            for (d in b) if (e = b[d], ad.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (m ? "hide": "show")) continue;
                k[d] = n && n[d] || kb.style(a, d)
            }
            if (!kb.isEmptyObject(k)) {
                n ? "hidden" in n && (m = n.hidden) : n = kb._data(a, "fxshow", {}),
                    f && (n.hidden = !m),
                    m ? kb(a).show() : j.done(function() {
                        kb(a).hide()
                    }),
                    j.done(function() {
                        var b;
                        kb._removeData(a, "fxshow");
                        for (b in k) kb.style(a, b, k[b])
                    });
                for (d in k) g = N(m ? n[d] : 0, d, j),
                    d in n || (n[d] = g.start, m && (g.end = g.start, g.start = "width" === d || "height" === d ? 1: 0))
            }
        }
        function R(a, b, c, d, e) {
            return new R.prototype.init(a, b, c, d, e)
        }
        function S(a, b) {
            var c,
                d = {
                    height: a
                },
                e = 0;
            for (b = b ? 1: 0; 4 > e; e += 2 - b) c = xc[e],
                d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a),
                d
        }
        function T(a) {
            return kb.isWindow(a) ? a: 9 === a.nodeType ? a.defaultView || a.parentWindow: !1
        }
        var U,
            V,
            W = typeof b,
            X = a.location,
            Y = a.document,
            Z = Y.documentElement,
            $ = a.jQuery,
            _ = a.$,
            ab = {},
            bb = [],
            cb = "1.10.2",
            db = bb.concat,
            eb = bb.push,
            fb = bb.slice,
            gb = bb.indexOf,
            hb = ab.toString,
            ib = ab.hasOwnProperty,
            jb = cb.trim,
            kb = function(a, b) {
                return new kb.fn.init(a, b, V)
            },
            lb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            mb = /\S+/g,
            nb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ob = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            pb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            qb = /^[\],:{}\s]*$/,
            rb = /(?:^|:|,)(?:\s*\[)+/g,
            sb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            tb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            ub = /^-ms-/,
            vb = /-([\da-z])/gi,
            wb = function(a, b) {
                return b.toUpperCase()
            },
            xb = function(a) { (Y.addEventListener || "load" === a.type || "complete" === Y.readyState) && (yb(), kb.ready())
            },
            yb = function() {
                Y.addEventListener ? (Y.removeEventListener("DOMContentLoaded", xb, !1), a.removeEventListener("load", xb, !1)) : (Y.detachEvent("onreadystatechange", xb), a.detachEvent("onload", xb))
            };
        kb.fn = kb.prototype = {
            jquery: cb,
            constructor: kb,
            init: function(a, c, d) {
                var e,
                    f;
                if (!a) return this;
                if ("string" == typeof a) {
                    if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : ob.exec(a), !e || !e[1] && c) return ! c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                    if (e[1]) {
                        if (c = c instanceof kb ? c[0] : c, kb.merge(this, kb.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c: Y, !0)), pb.test(e[1]) && kb.isPlainObject(c)) for (e in c) kb.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                        return this
                    }
                    if (f = Y.getElementById(e[2]), f && f.parentNode) {
                        if (f.id !== e[2]) return d.find(a);
                        this.length = 1,
                            this[0] = f
                    }
                    return this.context = Y,
                        this.selector = a,
                        this
                }
                return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : kb.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), kb.makeArray(a, this))
            },
            selector: "",
            length: 0,
            toArray: function() {
                return fb.call(this)
            },
            get: function(a) {
                return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
            },
            pushStack: function(a) {
                var b = kb.merge(this.constructor(), a);
                return b.prevObject = this,
                    b.context = this.context,
                    b
            },
            each: function(a, b) {
                return kb.each(this, a, b)
            },
            ready: function(a) {
                return kb.ready.promise().done(a),
                    this
            },
            slice: function() {
                return this.pushStack(fb.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq( - 1)
            },
            eq: function(a) {
                var b = this.length,
                    c = +a + (0 > a ? b: 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
            },
            map: function(a) {
                return this.pushStack(kb.map(this,
                    function(b, c) {
                        return a.call(b, c, b)
                    }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: eb,
            sort: [].sort,
            splice: [].splice
        },
            kb.fn.init.prototype = kb.fn,
            kb.extend = kb.fn.extend = function() {
                var a,
                    c,
                    d,
                    e,
                    f,
                    g,
                    h = arguments[0] || {},
                    i = 1,
                    j = arguments.length,
                    k = !1;
                for ("boolean" == typeof h && (k = h, h = arguments[1] || {},
                    i = 2), "object" == typeof h || kb.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++) if (null != (f = arguments[i])) for (e in f) a = h[e],
                    d = f[e],
                    h !== d && (k && d && (kb.isPlainObject(d) || (c = kb.isArray(d))) ? (c ? (c = !1, g = a && kb.isArray(a) ? a: []) : g = a && kb.isPlainObject(a) ? a: {},
                    h[e] = kb.extend(k, g, d)) : d !== b && (h[e] = d));
                return h
            },
            kb.extend({
                expando: "jQuery" + (cb + Math.random()).replace(/\D/g, ""),
                noConflict: function(b) {
                    return a.$ === kb && (a.$ = _),
                        b && a.jQuery === kb && (a.jQuery = $),
                        kb
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? kb.readyWait++:kb.ready(!0)
                },
                ready: function(a) {
                    if (a === !0 ? !--kb.readyWait: !kb.isReady) {
                        if (!Y.body) return setTimeout(kb.ready);
                        kb.isReady = !0,
                            a !== !0 && --kb.readyWait > 0 || (U.resolveWith(Y, [kb]), kb.fn.trigger && kb(Y).trigger("ready").off("ready"))
                    }
                },
                isFunction: function(a) {
                    return "function" === kb.type(a)
                },
                isArray: Array.isArray ||
                    function(a) {
                        return "array" === kb.type(a)
                    },
                isWindow: function(a) {
                    return null != a && a == a.window
                },
                isNumeric: function(a) {
                    return ! isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function(a) {
                    return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? ab[hb.call(a)] || "object": typeof a
                },
                isPlainObject: function(a) {
                    var c;
                    if (!a || "object" !== kb.type(a) || a.nodeType || kb.isWindow(a)) return ! 1;
                    try {
                        if (a.constructor && !ib.call(a, "constructor") && !ib.call(a.constructor.prototype, "isPrototypeOf")) return ! 1
                    } catch(d) {
                        return ! 1
                    }
                    if (kb.support.ownLast) for (c in a) return ib.call(a, c);
                    for (c in a);
                    return c === b || ib.call(a, c)
                },
                isEmptyObject: function(a) {
                    var b;
                    for (b in a) return ! 1;
                    return ! 0
                },
                error: function(a) {
                    throw new Error(a)
                },
                parseHTML: function(a, b, c) {
                    if (!a || "string" != typeof a) return null;
                    "boolean" == typeof b && (c = b, b = !1),
                        b = b || Y;
                    var d = pb.exec(a),
                        e = !c && [];
                    return d ? [b.createElement(d[1])] : (d = kb.buildFragment([a], b, e), e && kb(e).remove(), kb.merge([], d.childNodes))
                },
                parseJSON: function(b) {
                    return a.JSON && a.JSON.parse ? a.JSON.parse(b) : null === b ? b: "string" == typeof b && (b = kb.trim(b), b && qb.test(b.replace(sb, "@").replace(tb, "]").replace(rb, ""))) ? new Function("return " + b)() : void kb.error("Invalid JSON: " + b)
                },
                parseXML: function(c) {
                    var d,
                        e;
                    if (!c || "string" != typeof c) return null;
                    try {
                        a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    } catch(f) {
                        d = b
                    }
                    return d && d.documentElement && !d.getElementsByTagName("parsererror").length || kb.error("Invalid XML: " + c),
                        d
                },
                noop: function() {},
                globalEval: function(b) {
                    b && kb.trim(b) && (a.execScript ||
                        function(b) {
                            a.eval.call(a, b)
                        })(b)
                },
                camelCase: function(a) {
                    return a.replace(ub, "ms-").replace(vb, wb)
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                },
                each: function(a, b, d) {
                    var e,
                        f = 0,
                        g = a.length,
                        h = c(a);
                    if (d) {
                        if (h) for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                        else for (f in a) if (e = b.apply(a[f], d), e === !1) break
                    } else if (h) for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
                    else for (f in a) if (e = b.call(a[f], f, a[f]), e === !1) break;
                    return a
                },
                trim: jb && !jb.call("﻿ ") ?
                    function(a) {
                        return null == a ? "": jb.call(a)
                    }: function(a) {
                    return null == a ? "": (a + "").replace(nb, "")
                },
                makeArray: function(a, b) {
                    var d = b || [];
                    return null != a && (c(Object(a)) ? kb.merge(d, "string" == typeof a ? [a] : a) : eb.call(d, a)),
                        d
                },
                inArray: function(a, b, c) {
                    var d;
                    if (b) {
                        if (gb) return gb.call(b, a, c);
                        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c: 0; d > c; c++) if (c in b && b[c] === a) return c
                    }
                    return - 1
                },
                merge: function(a, c) {
                    var d = c.length,
                        e = a.length,
                        f = 0;
                    if ("number" == typeof d) for (; d > f; f++) a[e++] = c[f];
                    else for (; c[f] !== b;) a[e++] = c[f++];
                    return a.length = e,
                        a
                },
                grep: function(a, b, c) {
                    var d,
                        e = [],
                        f = 0,
                        g = a.length;
                    for (c = !!c; g > f; f++) d = !!b(a[f], f),
                        c !== d && e.push(a[f]);
                    return e
                },
                map: function(a, b, d) {
                    var e,
                        f = 0,
                        g = a.length,
                        h = c(a),
                        i = [];
                    if (h) for (; g > f; f++) e = b(a[f], f, d),
                        null != e && (i[i.length] = e);
                    else for (f in a) e = b(a[f], f, d),
                        null != e && (i[i.length] = e);
                    return db.apply([], i)
                },
                guid: 1,
                proxy: function(a, c) {
                    var d,
                        e,
                        f;
                    return "string" == typeof c && (f = a[c], c = a, a = f),
                        kb.isFunction(a) ? (d = fb.call(arguments, 2), e = function() {
                            return a.apply(c || this, d.concat(fb.call(arguments)))
                        },
                            e.guid = a.guid = a.guid || kb.guid++, e) : b
                },
                access: function(a, c, d, e, f, g, h) {
                    var i = 0,
                        j = a.length,
                        k = null == d;
                    if ("object" === kb.type(d)) {
                        f = !0;
                        for (i in d) kb.access(a, c, i, d[i], !0, g, h)
                    } else if (e !== b && (f = !0, kb.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function(a, b, c) {
                        return k.call(kb(a), c)
                    })), c)) for (; j > i; i++) c(a[i], d, h ? e: e.call(a[i], i, c(a[i], d)));
                    return f ? a: k ? c.call(a) : j ? c(a[0], d) : g
                },
                now: function() {
                    return (new Date).getTime()
                },
                swap: function(a, b, c, d) {
                    var e,
                        f,
                        g = {};
                    for (f in b) g[f] = a.style[f],
                        a.style[f] = b[f];
                    e = c.apply(a, d || []);
                    for (f in b) a.style[f] = g[f];
                    return e
                }
            }),
            kb.ready.promise = function(b) {
                if (!U) if (U = kb.Deferred(), "complete" === Y.readyState) setTimeout(kb.ready);
                else if (Y.addEventListener) Y.addEventListener("DOMContentLoaded", xb, !1),
                    a.addEventListener("load", xb, !1);
                else {
                    Y.attachEvent("onreadystatechange", xb),
                        a.attachEvent("onload", xb);
                    var c = !1;
                    try {
                        c = null == a.frameElement && Y.documentElement
                    } catch(d) {}
                    c && c.doScroll && !
                        function e() {
                            if (!kb.isReady) {
                                try {
                                    c.doScroll("left")
                                } catch(a) {
                                    return setTimeout(e, 50)
                                }
                                yb(),
                                    kb.ready()
                            }
                        } ()
                }
                return U.promise(b)
            },
            kb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
                function(a, b) {
                    ab["[object " + b + "]"] = b.toLowerCase()
                }),
            V = kb(Y),
            function(a, b) {
                function c(a, b, c, d) {
                    var e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        o,
                        p;
                    if ((b ? b.ownerDocument || b: O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
                    if (1 !== (h = b.nodeType) && 9 !== h) return [];
                    if (I && !d) {
                        if (e = tb.exec(a)) if (g = e[1]) {
                            if (9 === h) {
                                if (f = b.getElementById(g), !f || !f.parentNode) return c;
                                if (f.id === g) return c.push(f),
                                    c
                            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f),
                                c
                        } else {
                            if (e[2]) return ab.apply(c, b.getElementsByTagName(a)),
                                c;
                            if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName) return ab.apply(c, b.getElementsByClassName(g)),
                                c
                        }
                        if (x.qsa && (!J || !J.test(a))) {
                            if (l = k = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                                for (j = m(a), (k = b.getAttribute("id")) ? l = k.replace(wb, "\\$&") : b.setAttribute("id", l), l = "[id='" + l + "'] ", i = j.length; i--;) j[i] = l + n(j[i]);
                                o = nb.test(a) && b.parentNode || b,
                                    p = j.join(",")
                            }
                            if (p) try {
                                return ab.apply(c, o.querySelectorAll(p)),
                                    c
                            } catch(q) {} finally {
                                k || b.removeAttribute("id")
                            }
                        }
                    }
                    return v(a.replace(jb, "$1"), b, c, d)
                }
                function d() {
                    function a(c, d) {
                        return b.push(c += " ") > z.cacheLength && delete a[b.shift()],
                            a[c] = d
                    }
                    var b = [];
                    return a
                }
                function e(a) {
                    return a[N] = !0,
                        a
                }
                function f(a) {
                    var b = G.createElement("div");
                    try {
                        return !! a(b)
                    } catch(c) {
                        return ! 1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b),
                            b = null
                    }
                }
                function g(a, b) {
                    for (var c = a.split("|"), d = a.length; d--;) z.attrHandle[c[d]] = b
                }
                function h(a, b) {
                    var c = b && a,
                        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || X) - (~a.sourceIndex || X);
                    if (d) return d;
                    if (c) for (; c = c.nextSibling;) if (c === b) return - 1;
                    return a ? 1: -1
                }
                function i(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return "input" === c && b.type === a
                    }
                }
                function j(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return ("input" === c || "button" === c) && b.type === a
                    }
                }
                function k(a) {
                    return e(function(b) {
                        return b = +b,
                            e(function(c, d) {
                                for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                            })
                    })
                }
                function l() {}
                function m(a, b) {
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k = S[a + " "];
                    if (k) return b ? 0: k.slice(0);
                    for (h = a, i = [], j = z.preFilter; h;) { (!d || (e = lb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])),
                        d = !1,
                        (e = mb.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(jb, " ")
                    }), h = h.slice(d.length));
                        for (g in z.filter) ! (e = rb[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                            value: d,
                            type: g,
                            matches: e
                        }), h = h.slice(d.length));
                        if (!d) break
                    }
                    return b ? h.length: h ? c.error(a) : S(a, i).slice(0)
                }
                function n(a) {
                    for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
                    return d
                }
                function o(a, b, c) {
                    var d = b.dir,
                        e = c && "parentNode" === d,
                        f = Q++;
                    return b.first ?
                        function(b, c, f) {
                            for (; b = b[d];) if (1 === b.nodeType || e) return a(b, c, f)
                        }: function(b, c, g) {
                        var h,
                            i,
                            j,
                            k = P + " " + f;
                        if (g) {
                            for (; b = b[d];) if ((1 === b.nodeType || e) && a(b, c, g)) return ! 0
                        } else for (; b = b[d];) if (1 === b.nodeType || e) if (j = b[N] || (b[N] = {}), (i = j[d]) && i[0] === k) {
                            if ((h = i[1]) === !0 || h === y) return h === !0
                        } else if (i = j[d] = [k], i[1] = a(b, c, g) || y, i[1] === !0) return ! 0
                    }
                }
                function p(a) {
                    return a.length > 1 ?
                        function(b, c, d) {
                            for (var e = a.length; e--;) if (!a[e](b, c, d)) return ! 1;
                            return ! 0
                        }: a[0]
                }
                function q(a, b, c, d, e) {
                    for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                    return g
                }
                function r(a, b, c, d, f, g) {
                    return d && !d[N] && (d = r(d)),
                        f && !f[N] && (f = r(f, g)),
                        e(function(e, g, h, i) {
                            var j,
                                k,
                                l,
                                m = [],
                                n = [],
                                o = g.length,
                                p = e || u(b || "*", h.nodeType ? [h] : h, []),
                                r = !a || !e && b ? p: q(p, m, a, h, i),
                                s = c ? f || (e ? a: o || d) ? [] : g: r;
                            if (c && c(r, s, h, i), d) for (j = q(s, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
                            if (e) {
                                if (f || a) {
                                    if (f) {
                                        for (j = [], k = s.length; k--;)(l = s[k]) && j.push(r[k] = l);
                                        f(null, s = [], j, i)
                                    }
                                    for (k = s.length; k--;)(l = s[k]) && (j = f ? cb.call(e, l) : m[k]) > -1 && (e[j] = !(g[j] = l))
                                }
                            } else s = q(s === g ? s.splice(o, s.length) : s),
                                f ? f(null, g, s, i) : ab.apply(g, s)
                        })
                }
                function s(a) {
                    for (var b, c, d, e = a.length, f = z.relative[a[0].type], g = f || z.relative[" "], h = f ? 1: 0, i = o(function(a) {
                            return a === b
                        },
                        g, !0), j = o(function(a) {
                            return cb.call(b, a) > -1
                        },
                        g, !0), k = [function(a, c, d) {
                        return ! f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                    }]; e > h; h++) if (c = z.relative[a[h].type]) k = [o(p(k), c)];
                    else {
                        if (c = z.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                            for (d = ++h; e > d && !z.relative[a[d].type]; d++);
                            return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
                                value: " " === a[h - 2].type ? "*": ""
                            })).replace(jb, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a))
                        }
                        k.push(c)
                    }
                    return p(k)
                }
                function t(a, b) {
                    var d = 0,
                        f = b.length > 0,
                        g = a.length > 0,
                        h = function(e, h, i, j, k) {
                            var l,
                                m,
                                n,
                                o = [],
                                p = 0,
                                r = "0",
                                s = e && [],
                                t = null != k,
                                u = D,
                                v = e || g && z.find.TAG("*", k && h.parentNode || h),
                                w = P += null == u ? 1: Math.random() || .1;
                            for (t && (D = h !== G && h, y = d); null != (l = v[r]); r++) {
                                if (g && l) {
                                    for (m = 0; n = a[m++];) if (n(l, h, i)) {
                                        j.push(l);
                                        break
                                    }
                                    t && (P = w, y = ++d)
                                }
                                f && ((l = !n && l) && p--, e && s.push(l))
                            }
                            if (p += r, f && r !== p) {
                                for (m = 0; n = b[m++];) n(s, o, h, i);
                                if (e) {
                                    if (p > 0) for (; r--;) s[r] || o[r] || (o[r] = $.call(j));
                                    o = q(o)
                                }
                                ab.apply(j, o),
                                    t && !e && o.length > 0 && p + b.length > 1 && c.uniqueSort(j)
                            }
                            return t && (P = w, D = u),
                                s
                        };
                    return f ? e(h) : h
                }
                function u(a, b, d) {
                    for (var e = 0, f = b.length; f > e; e++) c(a, b[e], d);
                    return d
                }
                function v(a, b, c, d) {
                    var e,
                        f,
                        g,
                        h,
                        i,
                        j = m(a);
                    if (!d && 1 === j.length) {
                        if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && z.relative[f[1].type]) {
                            if (b = (z.find.ID(g.matches[0].replace(xb, yb), b) || [])[0], !b) return c;
                            a = a.slice(f.shift().value.length)
                        }
                        for (e = rb.needsContext.test(a) ? 0: f.length; e--&&(g = f[e], !z.relative[h = g.type]);) if ((i = z.find[h]) && (d = i(g.matches[0].replace(xb, yb), nb.test(f[0].type) && b.parentNode || b))) {
                            if (f.splice(e, 1), a = d.length && n(f), !a) return ab.apply(c, d),
                                c;
                            break
                        }
                    }
                    return C(a, j)(d, b, !I, c, nb.test(a)),
                        c
                }
                var w,
                    x,
                    y,
                    z,
                    A,
                    B,
                    C,
                    D,
                    E,
                    F,
                    G,
                    H,
                    I,
                    J,
                    K,
                    L,
                    M,
                    N = "sizzle" + -new Date,
                    O = a.document,
                    P = 0,
                    Q = 0,
                    R = d(),
                    S = d(),
                    T = d(),
                    U = !1,
                    V = function(a, b) {
                        return a === b ? (U = !0, 0) : 0
                    },
                    W = typeof b,
                    X = 1 << 31,
                    Y = {}.hasOwnProperty,
                    Z = [],
                    $ = Z.pop,
                    _ = Z.push,
                    ab = Z.push,
                    bb = Z.slice,
                    cb = Z.indexOf ||
                        function(a) {
                            for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
                            return - 1
                        },
                    db = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    eb = "[\\x20\\t\\r\\n\\f]",
                    fb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    gb = fb.replace("w", "w#"),
                    hb = "\\[" + eb + "*(" + fb + ")" + eb + "*(?:([*^$|!~]?=)" + eb + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + gb + ")|)|)" + eb + "*\\]",
                    ib = ":(" + fb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + hb.replace(3, 8) + ")*)|.*)\\)|)",
                    jb = new RegExp("^" + eb + "+|((?:^|[^\\\\])(?:\\\\.)*)" + eb + "+$", "g"),
                    lb = new RegExp("^" + eb + "*," + eb + "*"),
                    mb = new RegExp("^" + eb + "*([>+~]|" + eb + ")" + eb + "*"),
                    nb = new RegExp(eb + "*[+~]"),
                    ob = new RegExp("=" + eb + "*([^\\]'\"]*)" + eb + "*\\]", "g"),
                    pb = new RegExp(ib),
                    qb = new RegExp("^" + gb + "$"),
                    rb = {
                        ID: new RegExp("^#(" + fb + ")"),
                        CLASS: new RegExp("^\\.(" + fb + ")"),
                        TAG: new RegExp("^(" + fb.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + hb),
                        PSEUDO: new RegExp("^" + ib),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + eb + "*(even|odd|(([+-]|)(\\d*)n|)" + eb + "*(?:([+-]|)" + eb + "*(\\d+)|))" + eb + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + db + ")$", "i"),
                        needsContext: new RegExp("^" + eb + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + eb + "*((?:-\\d)?\\d*)" + eb + "*\\)|)(?=[^-]|$)", "i")
                    },
                    sb = /^[^{]+\{\s*\[native \w/,
                    tb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ub = /^(?:input|select|textarea|button)$/i,
                    vb = /^h\d$/i,
                    wb = /'|\\/g,
                    xb = new RegExp("\\\\([\\da-f]{1,6}" + eb + "?|(" + eb + ")|.)", "ig"),
                    yb = function(a, b, c) {
                        var d = "0x" + b - 65536;
                        return d !== d || c ? b: 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                    };
                try {
                    ab.apply(Z = bb.call(O.childNodes), O.childNodes),
                        Z[O.childNodes.length].nodeType
                } catch(zb) {
                    ab = {
                        apply: Z.length ?
                            function(a, b) {
                                _.apply(a, bb.call(b))
                            }: function(a, b) {
                            for (var c = a.length, d = 0; a[c++] = b[d++];);
                            a.length = c - 1
                        }
                    }
                }
                B = c.isXML = function(a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return b ? "HTML" !== b.nodeName: !1
                },
                    x = c.support = {},
                    F = c.setDocument = function(a) {
                        var b = a ? a.ownerDocument || a: O,
                            c = b.defaultView;
                        return b !== G && 9 === b.nodeType && b.documentElement ? (G = b, H = b.documentElement, I = !B(b), c && c.attachEvent && c !== c.top && c.attachEvent("onbeforeunload",
                            function() {
                                F()
                            }), x.attributes = f(function(a) {
                            return a.className = "i",
                                !a.getAttribute("className")
                        }), x.getElementsByTagName = f(function(a) {
                            return a.appendChild(b.createComment("")),
                                !a.getElementsByTagName("*").length
                        }), x.getElementsByClassName = f(function(a) {
                            return a.innerHTML = "<div class='a'></div><div class='a i'></div>",
                                a.firstChild.className = "i",
                                2 === a.getElementsByClassName("i").length
                        }), x.getById = f(function(a) {
                            return H.appendChild(a).id = N,
                                !b.getElementsByName || !b.getElementsByName(N).length
                        }), x.getById ? (z.find.ID = function(a, b) {
                            if (typeof b.getElementById !== W && I) {
                                var c = b.getElementById(a);
                                return c && c.parentNode ? [c] : []
                            }
                        },
                            z.filter.ID = function(a) {
                                var b = a.replace(xb, yb);
                                return function(a) {
                                    return a.getAttribute("id") === b
                                }
                            }) : (delete z.find.ID, z.filter.ID = function(a) {
                            var b = a.replace(xb, yb);
                            return function(a) {
                                var c = typeof a.getAttributeNode !== W && a.getAttributeNode("id");
                                return c && c.value === b
                            }
                        }), z.find.TAG = x.getElementsByTagName ?
                            function(a, b) {
                                return typeof b.getElementsByTagName !== W ? b.getElementsByTagName(a) : void 0
                            }: function(a, b) {
                            var c,
                                d = [],
                                e = 0,
                                f = b.getElementsByTagName(a);
                            if ("*" === a) {
                                for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                                return d
                            }
                            return f
                        },
                            z.find.CLASS = x.getElementsByClassName &&
                                function(a, b) {
                                    return typeof b.getElementsByClassName !== W && I ? b.getElementsByClassName(a) : void 0
                                },
                            K = [], J = [], (x.qsa = sb.test(b.querySelectorAll)) && (f(function(a) {
                            a.innerHTML = "<select><option selected=''></option></select>",
                                a.querySelectorAll("[selected]").length || J.push("\\[" + eb + "*(?:value|" + db + ")"),
                                a.querySelectorAll(":checked").length || J.push(":checked")
                        }), f(function(a) {
                            var c = b.createElement("input");
                            c.setAttribute("type", "hidden"),
                                a.appendChild(c).setAttribute("t", ""),
                                a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + eb + "*(?:''|\"\")"),
                                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"),
                                a.querySelectorAll("*,:x"),
                                J.push(",.*:")
                        })), (x.matchesSelector = sb.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && f(function(a) {
                            x.disconnectedMatch = L.call(a, "div"),
                                L.call(a, "[s!='']:x"),
                                K.push("!=", ib)
                        }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), M = sb.test(H.contains) || H.compareDocumentPosition ?
                            function(a, b) {
                                var c = 9 === a.nodeType ? a.documentElement: a,
                                    d = b && b.parentNode;
                                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                            }: function(a, b) {
                            if (b) for (; b = b.parentNode;) if (b === a) return ! 0;
                            return ! 1
                        },
                            V = H.compareDocumentPosition ?
                                function(a, c) {
                                    if (a === c) return U = !0,
                                        0;
                                    var d = c.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(c);
                                    return d ? 1 & d || !x.sortDetached && c.compareDocumentPosition(a) === d ? a === b || M(O, a) ? -1: c === b || M(O, c) ? 1: E ? cb.call(E, a) - cb.call(E, c) : 0: 4 & d ? -1: 1: a.compareDocumentPosition ? -1: 1
                                }: function(a, c) {
                                var d,
                                    e = 0,
                                    f = a.parentNode,
                                    g = c.parentNode,
                                    i = [a],
                                    j = [c];
                                if (a === c) return U = !0,
                                    0;
                                if (!f || !g) return a === b ? -1: c === b ? 1: f ? -1: g ? 1: E ? cb.call(E, a) - cb.call(E, c) : 0;
                                if (f === g) return h(a, c);
                                for (d = a; d = d.parentNode;) i.unshift(d);
                                for (d = c; d = d.parentNode;) j.unshift(d);
                                for (; i[e] === j[e];) e++;
                                return e ? h(i[e], j[e]) : i[e] === O ? -1: j[e] === O ? 1: 0
                            },
                            b) : G
                    },
                    c.matches = function(a, b) {
                        return c(a, null, null, b)
                    },
                    c.matchesSelector = function(a, b) {
                        if ((a.ownerDocument || a) !== G && F(a), b = b.replace(ob, "='$1']"), !(!x.matchesSelector || !I || K && K.test(b) || J && J.test(b))) try {
                            var d = L.call(a, b);
                            if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                        } catch(e) {}
                        return c(b, G, null, [a]).length > 0
                    },
                    c.contains = function(a, b) {
                        return (a.ownerDocument || a) !== G && F(a),
                            M(a, b)
                    },
                    c.attr = function(a, c) { (a.ownerDocument || a) !== G && F(a);
                        var d = z.attrHandle[c.toLowerCase()],
                            e = d && Y.call(z.attrHandle, c.toLowerCase()) ? d(a, c, !I) : b;
                        return e === b ? x.attributes || !I ? a.getAttribute(c) : (e = a.getAttributeNode(c)) && e.specified ? e.value: null: e
                    },
                    c.error = function(a) {
                        throw new Error("Syntax error, unrecognized expression: " + a)
                    },
                    c.uniqueSort = function(a) {
                        var b,
                            c = [],
                            d = 0,
                            e = 0;
                        if (U = !x.detectDuplicates, E = !x.sortStable && a.slice(0), a.sort(V), U) {
                            for (; b = a[e++];) b === a[e] && (d = c.push(e));
                            for (; d--;) a.splice(c[d], 1)
                        }
                        return a
                    },
                    A = c.getText = function(a) {
                        var b,
                            c = "",
                            d = 0,
                            e = a.nodeType;
                        if (e) {
                            if (1 === e || 9 === e || 11 === e) {
                                if ("string" == typeof a.textContent) return a.textContent;
                                for (a = a.firstChild; a; a = a.nextSibling) c += A(a)
                            } else if (3 === e || 4 === e) return a.nodeValue
                        } else for (; b = a[d]; d++) c += A(b);
                        return c
                    },
                    z = c.selectors = {
                        cacheLength: 50,
                        createPseudo: e,
                        match: rb,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(a) {
                                return a[1] = a[1].replace(xb, yb),
                                    a[3] = (a[4] || a[5] || "").replace(xb, yb),
                                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                                    a.slice(0, 4)
                            },
                            CHILD: function(a) {
                                return a[1] = a[1].toLowerCase(),
                                        "nth" === a[1].slice(0, 3) ? (a[3] || c.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && c.error(a[0]),
                                    a
                            },
                            PSEUDO: function(a) {
                                var c,
                                    d = !a[5] && a[2];
                                return rb.CHILD.test(a[0]) ? null: (a[3] && a[4] !== b ? a[2] = a[4] : d && pb.test(d) && (c = m(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (a[0] = a[0].slice(0, c), a[2] = d.slice(0, c)), a.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function(a) {
                                var b = a.replace(xb, yb).toLowerCase();
                                return "*" === a ?
                                    function() {
                                        return ! 0
                                    }: function(a) {
                                    return a.nodeName && a.nodeName.toLowerCase() === b
                                }
                            },
                            CLASS: function(a) {
                                var b = R[a + " "];
                                return b || (b = new RegExp("(^|" + eb + ")" + a + "(" + eb + "|$)")) && R(a,
                                    function(a) {
                                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== W && a.getAttribute("class") || "")
                                    })
                            },
                            ATTR: function(a, b, d) {
                                return function(e) {
                                    var f = c.attr(e, a);
                                    return null == f ? "!=" === b: b ? (f += "", "=" === b ? f === d: "!=" === b ? f !== d: "^=" === b ? d && 0 === f.indexOf(d) : "*=" === b ? d && f.indexOf(d) > -1: "$=" === b ? d && f.slice( - d.length) === d: "~=" === b ? (" " + f + " ").indexOf(d) > -1: "|=" === b ? f === d || f.slice(0, d.length + 1) === d + "-": !1) : !0
                                }
                            },
                            CHILD: function(a, b, c, d, e) {
                                var f = "nth" !== a.slice(0, 3),
                                    g = "last" !== a.slice( - 4),
                                    h = "of-type" === b;
                                return 1 === d && 0 === e ?
                                    function(a) {
                                        return !! a.parentNode
                                    }: function(b, c, i) {
                                    var j,
                                        k,
                                        l,
                                        m,
                                        n,
                                        o,
                                        p = f !== g ? "nextSibling": "previousSibling",
                                        q = b.parentNode,
                                        r = h && b.nodeName.toLowerCase(),
                                        s = !i && !h;
                                    if (q) {
                                        if (f) {
                                            for (; p;) {
                                                for (l = b; l = l[p];) if (h ? l.nodeName.toLowerCase() === r: 1 === l.nodeType) return ! 1;
                                                o = p = "only" === a && !o && "nextSibling"
                                            }
                                            return ! 0
                                        }
                                        if (o = [g ? q.firstChild: q.lastChild], g && s) {
                                            for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();) if (1 === l.nodeType && ++m && l === b) {
                                                k[a] = [P, n, m];
                                                break
                                            }
                                        } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                        else for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r: 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                                        return m -= e,
                                            m === d || m % d === 0 && m / d >= 0
                                    }
                                }
                            },
                            PSEUDO: function(a, b) {
                                var d,
                                    f = z.pseudos[a] || z.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
                                return f[N] ? f(b) : f.length > 1 ? (d = [a, a, "", b], z.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function(a, c) {
                                    for (var d, e = f(a, b), g = e.length; g--;) d = cb.call(a, e[g]),
                                        a[d] = !(c[d] = e[g])
                                }) : function(a) {
                                    return f(a, 0, d)
                                }) : f
                            }
                        },
                        pseudos: {
                            not: e(function(a) {
                                var b = [],
                                    c = [],
                                    d = C(a.replace(jb, "$1"));
                                return d[N] ? e(function(a, b, c, e) {
                                    for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                                }) : function(a, e, f) {
                                    return b[0] = a,
                                        d(b, null, f, c),
                                        !c.pop()
                                }
                            }),
                            has: e(function(a) {
                                return function(b) {
                                    return c(a, b).length > 0
                                }
                            }),
                            contains: e(function(a) {
                                return function(b) {
                                    return (b.textContent || b.innerText || A(b)).indexOf(a) > -1
                                }
                            }),
                            lang: e(function(a) {
                                return qb.test(a || "") || c.error("unsupported lang: " + a),
                                    a = a.replace(xb, yb).toLowerCase(),
                                    function(b) {
                                        var c;
                                        do
                                            if (c = I ? b.lang: b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(),
                                                c === a || 0 === c.indexOf(a + "-");
                                        while ((b = b.parentNode) && 1 === b.nodeType);
                                        return ! 1
                                    }
                            }),
                            target: function(b) {
                                var c = a.location && a.location.hash;
                                return c && c.slice(1) === b.id
                            },
                            root: function(a) {
                                return a === H
                            },
                            focus: function(a) {
                                return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                            },
                            enabled: function(a) {
                                return a.disabled === !1
                            },
                            disabled: function(a) {
                                return a.disabled === !0
                            },
                            checked: function(a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && !!a.checked || "option" === b && !!a.selected
                            },
                            selected: function(a) {
                                return a.parentNode && a.parentNode.selectedIndex,
                                    a.selected === !0
                            },
                            empty: function(a) {
                                for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType) return ! 1;
                                return ! 0
                            },
                            parent: function(a) {
                                return ! z.pseudos.empty(a)
                            },
                            header: function(a) {
                                return vb.test(a.nodeName)
                            },
                            input: function(a) {
                                return ub.test(a.nodeName)
                            },
                            button: function(a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && "button" === a.type || "button" === b
                            },
                            text: function(a) {
                                var b;
                                return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                            },
                            first: k(function() {
                                return [0]
                            }),
                            last: k(function(a, b) {
                                return [b - 1]
                            }),
                            eq: k(function(a, b, c) {
                                return [0 > c ? c + b: c]
                            }),
                            even: k(function(a, b) {
                                for (var c = 0; b > c; c += 2) a.push(c);
                                return a
                            }),
                            odd: k(function(a, b) {
                                for (var c = 1; b > c; c += 2) a.push(c);
                                return a
                            }),
                            lt: k(function(a, b, c) {
                                for (var d = 0 > c ? c + b: c; --d >= 0;) a.push(d);
                                return a
                            }),
                            gt: k(function(a, b, c) {
                                for (var d = 0 > c ? c + b: c; ++d < b;) a.push(d);
                                return a
                            })
                        }
                    },
                    z.pseudos.nth = z.pseudos.eq;
                for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) z.pseudos[w] = i(w);
                for (w in {
                    submit: !0,
                    reset: !0
                }) z.pseudos[w] = j(w);
                l.prototype = z.filters = z.pseudos,
                    z.setFilters = new l,
                    C = c.compile = function(a, b) {
                        var c,
                            d = [],
                            e = [],
                            f = T[a + " "];
                        if (!f) {
                            for (b || (b = m(a)), c = b.length; c--;) f = s(b[c]),
                                f[N] ? d.push(f) : e.push(f);
                            f = T(a, t(e, d))
                        }
                        return f
                    },
                    x.sortStable = N.split("").sort(V).join("") === N,
                    x.detectDuplicates = U,
                    F(),
                    x.sortDetached = f(function(a) {
                        return 1 & a.compareDocumentPosition(G.createElement("div"))
                    }),
                    f(function(a) {
                        return a.innerHTML = "<a href='#'></a>",
                            "#" === a.firstChild.getAttribute("href")
                    }) || g("type|href|height|width",
                    function(a, b, c) {
                        return c ? void 0: a.getAttribute(b, "type" === b.toLowerCase() ? 1: 2)
                    }),
                    x.attributes && f(function(a) {
                    return a.innerHTML = "<input/>",
                        a.firstChild.setAttribute("value", ""),
                        "" === a.firstChild.getAttribute("value")
                }) || g("value",
                    function(a, b, c) {
                        return c || "input" !== a.nodeName.toLowerCase() ? void 0: a.defaultValue
                    }),
                    f(function(a) {
                        return null == a.getAttribute("disabled")
                    }) || g(db,
                    function(a, b, c) {
                        var d;
                        return c ? void 0: (d = a.getAttributeNode(b)) && d.specified ? d.value: a[b] === !0 ? b.toLowerCase() : null
                    }),
                    kb.find = c,
                    kb.expr = c.selectors,
                    kb.expr[":"] = kb.expr.pseudos,
                    kb.unique = c.uniqueSort,
                    kb.text = c.getText,
                    kb.isXMLDoc = c.isXML,
                    kb.contains = c.contains
            } (a);
        var zb = {};
        kb.Callbacks = function(a) {
            a = "string" == typeof a ? zb[a] || d(a) : kb.extend({},
                a);
            var c,
                e,
                f,
                g,
                h,
                i,
                j = [],
                k = !a.once && [],
                l = function(b) {
                    for (e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++) if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                        e = !1;
                        break
                    }
                    c = !1,
                        j && (k ? k.length && l(k.shift()) : e ? j = [] : m.disable())
                },
                m = {
                    add: function() {
                        if (j) {
                            var b = j.length; !
                                function d(b) {
                                    kb.each(b,
                                        function(b, c) {
                                            var e = kb.type(c);
                                            "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
                                        })
                                } (arguments),
                                c ? g = j.length: e && (i = b, l(e))
                        }
                        return this
                    },
                    remove: function() {
                        return j && kb.each(arguments,
                            function(a, b) {
                                for (var d; (d = kb.inArray(b, j, d)) > -1;) j.splice(d, 1),
                                    c && (g >= d && g--, h >= d && h--)
                            }),
                            this
                    },
                    has: function(a) {
                        return a ? kb.inArray(a, j) > -1: !(!j || !j.length)
                    },
                    empty: function() {
                        return j = [],
                            g = 0,
                            this
                    },
                    disable: function() {
                        return j = k = e = b,
                            this
                    },
                    disabled: function() {
                        return ! j
                    },
                    lock: function() {
                        return k = b,
                            e || m.disable(),
                            this
                    },
                    locked: function() {
                        return ! k
                    },
                    fireWith: function(a, b) {
                        return ! j || f && !k || (b = b || [], b = [a, b.slice ? b.slice() : b], c ? k.push(b) : l(b)),
                            this
                    },
                    fire: function() {
                        return m.fireWith(this, arguments),
                            this
                    },
                    fired: function() {
                        return !! f
                    }
                };
            return m
        },
            kb.extend({
                Deferred: function(a) {
                    var b = [["resolve", "done", kb.Callbacks("once memory"), "resolved"], ["reject", "fail", kb.Callbacks("once memory"), "rejected"], ["notify", "progress", kb.Callbacks("memory")]],
                        c = "pending",
                        d = {
                            state: function() {
                                return c
                            },
                            always: function() {
                                return e.done(arguments).fail(arguments),
                                    this
                            },
                            then: function() {
                                var a = arguments;
                                return kb.Deferred(function(c) {
                                    kb.each(b,
                                        function(b, f) {
                                            var g = f[0],
                                                h = kb.isFunction(a[b]) && a[b];
                                            e[f[1]](function() {
                                                var a = h && h.apply(this, arguments);
                                                a && kb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                                            })
                                        }),
                                        a = null
                                }).promise()
                            },
                            promise: function(a) {
                                return null != a ? kb.extend(a, d) : d
                            }
                        },
                        e = {};
                    return d.pipe = d.then,
                        kb.each(b,
                            function(a, f) {
                                var g = f[2],
                                    h = f[3];
                                d[f[1]] = g.add,
                                    h && g.add(function() {
                                        c = h
                                    },
                                    b[1 ^ a][2].disable, b[2][2].lock),
                                    e[f[0]] = function() {
                                        return e[f[0] + "With"](this === e ? d: this, arguments),
                                            this
                                    },
                                    e[f[0] + "With"] = g.fireWith
                            }),
                        d.promise(e),
                        a && a.call(e, e),
                        e
                },
                when: function(a) {
                    var b,
                        c,
                        d,
                        e = 0,
                        f = fb.call(arguments),
                        g = f.length,
                        h = 1 !== g || a && kb.isFunction(a.promise) ? g: 0,
                        i = 1 === h ? a: kb.Deferred(),
                        j = function(a, c, d) {
                            return function(e) {
                                c[a] = this,
                                    d[a] = arguments.length > 1 ? fb.call(arguments) : e,
                                        d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                            }
                        };
                    if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && kb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                    return h || i.resolveWith(d, f),
                        i.promise()
                }
            }),
            kb.support = function(b) {
                var c,
                    d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l = Y.createElement("div");
                if (l.setAttribute("className", "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = l.getElementsByTagName("*") || [], d = l.getElementsByTagName("a")[0], !d || !d.style || !c.length) return b;
                f = Y.createElement("select"),
                    h = f.appendChild(Y.createElement("option")),
                    e = l.getElementsByTagName("input")[0],
                    d.style.cssText = "top:1px;float:left;opacity:.5",
                    b.getSetAttribute = "t" !== l.className,
                    b.leadingWhitespace = 3 === l.firstChild.nodeType,
                    b.tbody = !l.getElementsByTagName("tbody").length,
                    b.htmlSerialize = !!l.getElementsByTagName("link").length,
                    b.style = /top/.test(d.getAttribute("style")),
                    b.hrefNormalized = "/a" === d.getAttribute("href"),
                    b.opacity = /^0.5/.test(d.style.opacity),
                    b.cssFloat = !!d.style.cssFloat,
                    b.checkOn = !!e.value,
                    b.optSelected = h.selected,
                    b.enctype = !!Y.createElement("form").enctype,
                    b.html5Clone = "<:nav></:nav>" !== Y.createElement("nav").cloneNode(!0).outerHTML,
                    b.inlineBlockNeedsLayout = !1,
                    b.shrinkWrapBlocks = !1,
                    b.pixelPosition = !1,
                    b.deleteExpando = !0,
                    b.noCloneEvent = !0,
                    b.reliableMarginRight = !0,
                    b.boxSizingReliable = !0,
                    e.checked = !0,
                    b.noCloneChecked = e.cloneNode(!0).checked,
                    f.disabled = !0,
                    b.optDisabled = !h.disabled;
                try {
                    delete l.test
                } catch(m) {
                    b.deleteExpando = !1
                }
                e = Y.createElement("input"),
                    e.setAttribute("value", ""),
                    b.input = "" === e.getAttribute("value"),
                    e.value = "t",
                    e.setAttribute("type", "radio"),
                    b.radioValue = "t" === e.value,
                    e.setAttribute("checked", "t"),
                    e.setAttribute("name", "t"),
                    g = Y.createDocumentFragment(),
                    g.appendChild(e),
                    b.appendChecked = e.checked,
                    b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked,
                    l.attachEvent && (l.attachEvent("onclick",
                    function() {
                        b.noCloneEvent = !1
                    }), l.cloneNode(!0).click());
                for (k in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) l.setAttribute(i = "on" + k, "t"),
                    b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1;
                l.style.backgroundClip = "content-box",
                    l.cloneNode(!0).style.backgroundClip = "",
                    b.clearCloneStyle = "content-box" === l.style.backgroundClip;
                for (k in kb(b)) break;
                return b.ownLast = "0" !== k,
                    kb(function() {
                        var c,
                            d,
                            e,
                            f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                            g = Y.getElementsByTagName("body")[0];
                        g && (c = Y.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(c).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = l.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", j = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", kb.swap(g, null != g.style.zoom ? {
                                zoom: 1
                            }: {},
                            function() {
                                b.boxSizing = 4 === l.offsetWidth
                            }), a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {
                            width: "4px"
                        }).width, d = l.appendChild(Y.createElement("div")), d.style.cssText = l.style.cssText = f, d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), typeof l.style.zoom !== W && (l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (g.style.zoom = 1)), g.removeChild(c), c = l = e = d = null)
                    }),
                    c = f = g = h = d = e = null,
                    b
            } ({});
        var Ab = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            Bb = /([A-Z])/g;
        kb.extend({
            cache: {},
            noData: {
                applet: !0,
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(a) {
                return a = a.nodeType ? kb.cache[a[kb.expando]] : a[kb.expando],
                    !!a && !h(a)
            },
            data: function(a, b, c) {
                return e(a, b, c)
            },
            removeData: function(a, b) {
                return f(a, b)
            },
            _data: function(a, b, c) {
                return e(a, b, c, !0)
            },
            _removeData: function(a, b) {
                return f(a, b, !0)
            },
            acceptData: function(a) {
                if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return ! 1;
                var b = a.nodeName && kb.noData[a.nodeName.toLowerCase()];
                return ! b || b !== !0 && a.getAttribute("classid") === b
            }
        }),
            kb.fn.extend({
                data: function(a, c) {
                    var d,
                        e,
                        f = null,
                        h = 0,
                        i = this[0];
                    if (a === b) {
                        if (this.length && (f = kb.data(i), 1 === i.nodeType && !kb._data(i, "parsedAttrs"))) {
                            for (d = i.attributes; h < d.length; h++) e = d[h].name,
                                0 === e.indexOf("data-") && (e = kb.camelCase(e.slice(5)), g(i, e, f[e]));
                            kb._data(i, "parsedAttrs", !0)
                        }
                        return f
                    }
                    return "object" == typeof a ? this.each(function() {
                        kb.data(this, a)
                    }) : arguments.length > 1 ? this.each(function() {
                        kb.data(this, a, c)
                    }) : i ? g(i, a, kb.data(i, a)) : null
                },
                removeData: function(a) {
                    return this.each(function() {
                        kb.removeData(this, a)
                    })
                }
            }),
            kb.extend({
                queue: function(a, b, c) {
                    var d;
                    return a ? (b = (b || "fx") + "queue", d = kb._data(a, b), c && (!d || kb.isArray(c) ? d = kb._data(a, b, kb.makeArray(c)) : d.push(c)), d || []) : void 0
                },
                dequeue: function(a, b) {
                    b = b || "fx";
                    var c = kb.queue(a, b),
                        d = c.length,
                        e = c.shift(),
                        f = kb._queueHooks(a, b),
                        g = function() {
                            kb.dequeue(a, b)
                        };
                    "inprogress" === e && (e = c.shift(), d--),
                        e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)),
                        !d && f && f.empty.fire()
                },
                _queueHooks: function(a, b) {
                    var c = b + "queueHooks";
                    return kb._data(a, c) || kb._data(a, c, {
                        empty: kb.Callbacks("once memory").add(function() {
                            kb._removeData(a, b + "queue"),
                                kb._removeData(a, c)
                        })
                    })
                }
            }),
            kb.fn.extend({
                queue: function(a, c) {
                    var d = 2;
                    return "string" != typeof a && (c = a, a = "fx", d--),
                            arguments.length < d ? kb.queue(this[0], a) : c === b ? this: this.each(function() {
                        var b = kb.queue(this, a, c);
                        kb._queueHooks(this, a),
                            "fx" === a && "inprogress" !== b[0] && kb.dequeue(this, a)
                    })
                },
                dequeue: function(a) {
                    return this.each(function() {
                        kb.dequeue(this, a)
                    })
                },
                delay: function(a, b) {
                    return a = kb.fx ? kb.fx.speeds[a] || a: a,
                        b = b || "fx",
                        this.queue(b,
                            function(b, c) {
                                var d = setTimeout(b, a);
                                c.stop = function() {
                                    clearTimeout(d)
                                }
                            })
                },
                clearQueue: function(a) {
                    return this.queue(a || "fx", [])
                },
                promise: function(a, c) {
                    var d,
                        e = 1,
                        f = kb.Deferred(),
                        g = this,
                        h = this.length,
                        i = function() {--e || f.resolveWith(g, [g])
                        };
                    for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;) d = kb._data(g[h], a + "queueHooks"),
                        d && d.empty && (e++, d.empty.add(i));
                    return i(),
                        f.promise(c)
                }
            });
        var Cb,
            Db,
            Eb = /[\t\r\n\f]/g,
            Fb = /\r/g,
            Gb = /^(?:input|select|textarea|button|object)$/i,
            Hb = /^(?:a|area)$/i,
            Ib = /^(?:checked|selected)$/i,
            Jb = kb.support.getSetAttribute,
            Kb = kb.support.input;
        kb.fn.extend({
            attr: function(a, b) {
                return kb.access(this, kb.attr, a, b, arguments.length > 1)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    kb.removeAttr(this, a)
                })
            },
            prop: function(a, b) {
                return kb.access(this, kb.prop, a, b, arguments.length > 1)
            },
            removeProp: function(a) {
                return a = kb.propFix[a] || a,
                    this.each(function() {
                        try {
                            this[a] = b,
                                delete this[a]
                        } catch(c) {}
                    })
            },
            addClass: function(a) {
                var b,
                    c,
                    d,
                    e,
                    f,
                    g = 0,
                    h = this.length,
                    i = "string" == typeof a && a;
                if (kb.isFunction(a)) return this.each(function(b) {
                    kb(this).addClass(a.call(this, b, this.className))
                });
                if (i) for (b = (a || "").match(mb) || []; h > g; g++) if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Eb, " ") : " ")) {
                    for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                    c.className = kb.trim(d)
                }
                return this
            },
            removeClass: function(a) {
                var b,
                    c,
                    d,
                    e,
                    f,
                    g = 0,
                    h = this.length,
                    i = 0 === arguments.length || "string" == typeof a && a;
                if (kb.isFunction(a)) return this.each(function(b) {
                    kb(this).removeClass(a.call(this, b, this.className))
                });
                if (i) for (b = (a || "").match(mb) || []; h > g; g++) if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Eb, " ") : "")) {
                    for (f = 0; e = b[f++];) for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                    c.className = a ? kb.trim(d) : ""
                }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(kb.isFunction(a) ?
                    function(c) {
                        kb(this).toggleClass(a.call(this, c, this.className, b), b)
                    }: function() {
                    if ("string" === c) for (var b, d = 0, e = kb(this), f = a.match(mb) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    else(c === W || "boolean" === c) && (this.className && kb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "": kb._data(this, "__className__") || "")
                })
            },
            hasClass: function(a) {
                for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Eb, " ").indexOf(b) >= 0) return ! 0;
                return ! 1
            },
            val: function(a) {
                var c,
                    d,
                    e,
                    f = this[0]; {
                    if (arguments.length) return e = kb.isFunction(a),
                        this.each(function(c) {
                            var f;
                            1 === this.nodeType && (f = e ? a.call(this, c, kb(this).val()) : a, null == f ? f = "": "number" == typeof f ? f += "": kb.isArray(f) && (f = kb.map(f,
                                function(a) {
                                    return null == a ? "": a + ""
                                })), d = kb.valHooks[this.type] || kb.valHooks[this.nodeName.toLowerCase()], d && "set" in d && d.set(this, f, "value") !== b || (this.value = f))
                        });
                    if (f) return d = kb.valHooks[f.type] || kb.valHooks[f.nodeName.toLowerCase()],
                            d && "get" in d && (c = d.get(f, "value")) !== b ? c: (c = f.value, "string" == typeof c ? c.replace(Fb, "") : null == c ? "": c)
                }
            }
        }),
            kb.extend({
                valHooks: {
                    option: {
                        get: function(a) {
                            var b = kb.find.attr(a, "value");
                            return null != b ? b: a.text
                        }
                    },
                    select: {
                        get: function(a) {
                            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null: [], h = f ? e + 1: d.length, i = 0 > e ? h: f ? e: 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (kb.support.optDisabled ? c.disabled: null !== c.getAttribute("disabled")) || c.parentNode.disabled && kb.nodeName(c.parentNode, "optgroup"))) {
                                if (b = kb(c).val(), f) return b;
                                g.push(b)
                            }
                            return g
                        },
                        set: function(a, b) {
                            for (var c, d, e = a.options, f = kb.makeArray(b), g = e.length; g--;) d = e[g],
                                (d.selected = kb.inArray(kb(d).val(), f) >= 0) && (c = !0);
                            return c || (a.selectedIndex = -1),
                                f
                        }
                    }
                },
                attr: function(a, c, d) {
                    var e,
                        f,
                        g = a.nodeType;
                    if (a && 3 !== g && 8 !== g && 2 !== g) return typeof a.getAttribute === W ? kb.prop(a, c, d) : (1 === g && kb.isXMLDoc(a) || (c = c.toLowerCase(), e = kb.attrHooks[c] || (kb.expr.match.bool.test(c) ? Db: Cb)), d === b ? e && "get" in e && null !== (f = e.get(a, c)) ? f: (f = kb.find.attr(a, c), null == f ? b: f) : null !== d ? e && "set" in e && (f = e.set(a, d, c)) !== b ? f: (a.setAttribute(c, d + ""), d) : void kb.removeAttr(a, c))
                },
                removeAttr: function(a, b) {
                    var c,
                        d,
                        e = 0,
                        f = b && b.match(mb);
                    if (f && 1 === a.nodeType) for (; c = f[e++];) d = kb.propFix[c] || c,
                        kb.expr.match.bool.test(c) ? Kb && Jb || !Ib.test(c) ? a[d] = !1: a[kb.camelCase("default-" + c)] = a[d] = !1: kb.attr(a, c, ""),
                        a.removeAttribute(Jb ? c: d)
                },
                attrHooks: {
                    type: {
                        set: function(a, b) {
                            if (!kb.support.radioValue && "radio" === b && kb.nodeName(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b),
                                    c && (a.value = c),
                                    b
                            }
                        }
                    }
                },
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(a, c, d) {
                    var e,
                        f,
                        g,
                        h = a.nodeType;
                    if (a && 3 !== h && 8 !== h && 2 !== h) return g = 1 !== h || !kb.isXMLDoc(a),
                        g && (c = kb.propFix[c] || c, f = kb.propHooks[c]),
                            d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e: a[c] = d: f && "get" in f && null !== (e = f.get(a, c)) ? e: a[c]
                },
                propHooks: {
                    tabIndex: {
                        get: function(a) {
                            var b = kb.find.attr(a, "tabindex");
                            return b ? parseInt(b, 10) : Gb.test(a.nodeName) || Hb.test(a.nodeName) && a.href ? 0: -1
                        }
                    }
                }
            }),
            Db = {
                set: function(a, b, c) {
                    return b === !1 ? kb.removeAttr(a, c) : Kb && Jb || !Ib.test(c) ? a.setAttribute(!Jb && kb.propFix[c] || c, c) : a[kb.camelCase("default-" + c)] = a[c] = !0,
                        c
                }
            },
            kb.each(kb.expr.match.bool.source.match(/\w+/g),
                function(a, c) {
                    var d = kb.expr.attrHandle[c] || kb.find.attr;
                    kb.expr.attrHandle[c] = Kb && Jb || !Ib.test(c) ?
                        function(a, c, e) {
                            var f = kb.expr.attrHandle[c],
                                g = e ? b: (kb.expr.attrHandle[c] = b) != d(a, c, e) ? c.toLowerCase() : null;
                            return kb.expr.attrHandle[c] = f,
                                g
                        }: function(a, c, d) {
                        return d ? b: a[kb.camelCase("default-" + c)] ? c.toLowerCase() : null
                    }
                }),
            Kb && Jb || (kb.attrHooks.value = {
            set: function(a, b, c) {
                return kb.nodeName(a, "input") ? void(a.defaultValue = b) : Cb && Cb.set(a, b, c)
            }
        }),
            Jb || (Cb = {
            set: function(a, c, d) {
                var e = a.getAttributeNode(d);
                return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)),
                    e.value = c += "",
                        "value" === d || c === a.getAttribute(d) ? c: b
            }
        },
            kb.expr.attrHandle.id = kb.expr.attrHandle.name = kb.expr.attrHandle.coords = function(a, c, d) {
                var e;
                return d ? b: (e = a.getAttributeNode(c)) && "" !== e.value ? e.value: null
            },
            kb.valHooks.button = {
                get: function(a, c) {
                    var d = a.getAttributeNode(c);
                    return d && d.specified ? d.value: b
                },
                set: Cb.set
            },
            kb.attrHooks.contenteditable = {
                set: function(a, b, c) {
                    Cb.set(a, "" === b ? !1: b, c)
                }
            },
            kb.each(["width", "height"],
                function(a, b) {
                    kb.attrHooks[b] = {
                        set: function(a, c) {
                            return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
                        }
                    }
                })),
            kb.support.hrefNormalized || kb.each(["href", "src"],
            function(a, b) {
                kb.propHooks[b] = {
                    get: function(a) {
                        return a.getAttribute(b, 4)
                    }
                }
            }),
            kb.support.style || (kb.attrHooks.style = {
            get: function(a) {
                return a.style.cssText || b
            },
            set: function(a, b) {
                return a.style.cssText = b + ""
            }
        }),
            kb.support.optSelected || (kb.propHooks.selected = {
            get: function(a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
                    null
            }
        }),
            kb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
                function() {
                    kb.propFix[this.toLowerCase()] = this
                }),
            kb.support.enctype || (kb.propFix.enctype = "encoding"),
            kb.each(["radio", "checkbox"],
                function() {
                    kb.valHooks[this] = {
                        set: function(a, b) {
                            return kb.isArray(b) ? a.checked = kb.inArray(kb(a).val(), b) >= 0: void 0
                        }
                    },
                        kb.support.checkOn || (kb.valHooks[this].get = function(a) {
                        return null === a.getAttribute("value") ? "on": a.value
                    })
                });
        var Lb = /^(?:input|select|textarea)$/i,
            Mb = /^key/,
            Nb = /^(?:mouse|contextmenu)|click/,
            Ob = /^(?:focusinfocus|focusoutblur)$/,
            Pb = /^([^.]*)(?:\.(.+)|)$/;
        kb.event = {
            global: {},
            add: function(a, c, d, e, f) {
                var g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q,
                    r = kb._data(a);
                if (r) {
                    for (d.handler && (j = d, d = j.handler, f = j.selector), d.guid || (d.guid = kb.guid++), (h = r.events) || (h = r.events = {}), (l = r.handle) || (l = r.handle = function(a) {
                        return typeof kb === W || a && kb.event.triggered === a.type ? b: kb.event.dispatch.apply(l.elem, arguments)
                    },
                        l.elem = a), c = (c || "").match(mb) || [""], i = c.length; i--;) g = Pb.exec(c[i]) || [],
                        o = q = g[1],
                        p = (g[2] || "").split(".").sort(),
                        o && (k = kb.event.special[o] || {},
                        o = (f ? k.delegateType: k.bindType) || o, k = kb.event.special[o] || {},
                        m = kb.extend({
                                type: o,
                                origType: q,
                                data: e,
                                handler: d,
                                guid: d.guid,
                                selector: f,
                                needsContext: f && kb.expr.match.needsContext.test(f),
                                namespace: p.join(".")
                            },
                            j), (n = h[o]) || (n = h[o] = [], n.delegateCount = 0, k.setup && k.setup.call(a, e, p, l) !== !1 || (a.addEventListener ? a.addEventListener(o, l, !1) : a.attachEvent && a.attachEvent("on" + o, l))), k.add && (k.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, m) : n.push(m), kb.event.global[o] = !0);
                    a = null
                }
            },
            remove: function(a, b, c, d, e) {
                var f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q = kb.hasData(a) && kb._data(a);
                if (q && (k = q.events)) {
                    for (b = (b || "").match(mb) || [""], j = b.length; j--;) if (h = Pb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = kb.event.special[n] || {},
                                 n = (d ? l.delegateType: l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f],
                            !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || kb.removeEvent(a, n, q.handle), delete k[n])
                    } else for (n in k) kb.event.remove(a, n + b[j], c, d, !0);
                    kb.isEmptyObject(k) && (delete q.handle, kb._removeData(a, "events"))
                }
            },
            trigger: function(c, d, e, f) {
                var g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n = [e || Y],
                    o = ib.call(c, "type") ? c.type: c,
                    p = ib.call(c, "namespace") ? c.namespace.split(".") : [];
                if (i = l = e = e || Y, 3 !== e.nodeType && 8 !== e.nodeType && !Ob.test(o + kb.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), o = p.shift(), p.sort()), h = o.indexOf(":") < 0 && "on" + o, c = c[kb.expando] ? c: new kb.Event(o, "object" == typeof c && c), c.isTrigger = f ? 2: 3, c.namespace = p.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = null == d ? [c] : kb.makeArray(d, [c]), k = kb.event.special[o] || {},
                    f || !k.trigger || k.trigger.apply(e, d) !== !1)) {
                    if (!f && !k.noBubble && !kb.isWindow(e)) {
                        for (j = k.delegateType || o, Ob.test(j + o) || (i = i.parentNode); i; i = i.parentNode) n.push(i),
                            l = i;
                        l === (e.ownerDocument || Y) && n.push(l.defaultView || l.parentWindow || a)
                    }
                    for (m = 0; (i = n[m++]) && !c.isPropagationStopped();) c.type = m > 1 ? j: k.bindType || o,
                        g = (kb._data(i, "events") || {})[c.type] && kb._data(i, "handle"),
                        g && g.apply(i, d),
                        g = h && i[h],
                        g && kb.acceptData(i) && g.apply && g.apply(i, d) === !1 && c.preventDefault();
                    if (c.type = o, !f && !c.isDefaultPrevented() && (!k._default || k._default.apply(n.pop(), d) === !1) && kb.acceptData(e) && h && e[o] && !kb.isWindow(e)) {
                        l = e[h],
                            l && (e[h] = null),
                            kb.event.triggered = o;
                        try {
                            e[o]()
                        } catch(q) {}
                        kb.event.triggered = b,
                            l && (e[h] = l)
                    }
                    return c.result
                }
            },
            dispatch: function(a) {
                a = kb.event.fix(a);
                var c,
                    d,
                    e,
                    f,
                    g,
                    h = [],
                    i = fb.call(arguments),
                    j = (kb._data(this, "events") || {})[a.type] || [],
                    k = kb.event.special[a.type] || {};
                if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                    for (h = kb.event.handlers.call(this, a, j), c = 0; (f = h[c++]) && !a.isPropagationStopped();) for (a.currentTarget = f.elem, g = 0; (e = f.handlers[g++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, d = ((kb.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), d !== b && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                    return k.postDispatch && k.postDispatch.call(this, a),
                        a.result
                }
            },
            handlers: function(a, c) {
                var d,
                    e,
                    f,
                    g,
                    h = [],
                    i = c.delegateCount,
                    j = a.target;
                if (i && j.nodeType && (!a.button || "click" !== a.type)) for (; j != this; j = j.parentNode || this) if (1 === j.nodeType && (j.disabled !== !0 || "click" !== a.type)) {
                    for (f = [], g = 0; i > g; g++) e = c[g],
                        d = e.selector + " ",
                        f[d] === b && (f[d] = e.needsContext ? kb(d, this).index(j) >= 0: kb.find(d, this, null, [j]).length),
                        f[d] && f.push(e);
                    f.length && h.push({
                        elem: j,
                        handlers: f
                    })
                }
                return i < c.length && h.push({
                    elem: this,
                    handlers: c.slice(i)
                }),
                    h
            },
            fix: function(a) {
                if (a[kb.expando]) return a;
                var b,
                    c,
                    d,
                    e = a.type,
                    f = a,
                    g = this.fixHooks[e];
                for (g || (this.fixHooks[e] = g = Nb.test(e) ? this.mouseHooks: Mb.test(e) ? this.keyHooks: {}), d = g.props ? this.props.concat(g.props) : this.props, a = new kb.Event(f), b = d.length; b--;) c = d[b],
                    a[c] = f[c];
                return a.target || (a.target = f.srcElement || Y),
                    3 === a.target.nodeType && (a.target = a.target.parentNode),
                    a.metaKey = !!a.metaKey,
                    g.filter ? g.filter(a, f) : a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(a, b) {
                    return null == a.which && (a.which = null != b.charCode ? b.charCode: b.keyCode),
                        a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(a, c) {
                    var d,
                        e,
                        f,
                        g = c.button,
                        h = c.fromElement;
                    return null == a.pageX && null != c.clientX && (e = a.target.ownerDocument || Y, f = e.documentElement, d = e.body, a.pageX = c.clientX + (f && f.scrollLeft || d && d.scrollLeft || 0) - (f && f.clientLeft || d && d.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || d && d.scrollTop || 0) - (f && f.clientTop || d && d.clientTop || 0)),
                        !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement: h),
                        a.which || g === b || (a.which = 1 & g ? 1: 2 & g ? 3: 4 & g ? 2: 0),
                        a
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== k() && this.focus) try {
                            return this.focus(),
                                !1
                        } catch(a) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === k() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return kb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    },
                    _default: function(a) {
                        return kb.nodeName(a.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(a) {
                        a.result !== b && (a.originalEvent.returnValue = a.result)
                    }
                }
            },
            simulate: function(a, b, c, d) {
                var e = kb.extend(new kb.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? kb.event.trigger(e, null, b) : kb.event.dispatch.call(b, e),
                    e.isDefaultPrevented() && c.preventDefault()
            }
        },
            kb.removeEvent = Y.removeEventListener ?
                function(a, b, c) {
                    a.removeEventListener && a.removeEventListener(b, c, !1)
                }: function(a, b, c) {
                var d = "on" + b;
                a.detachEvent && (typeof a[d] === W && (a[d] = null), a.detachEvent(d, c))
            },
            kb.Event = function(a, b) {
                return this instanceof kb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? i: j) : this.type = a, b && kb.extend(this, b), this.timeStamp = a && a.timeStamp || kb.now(), void(this[kb.expando] = !0)) : new kb.Event(a, b)
            },
            kb.Event.prototype = {
                isDefaultPrevented: j,
                isPropagationStopped: j,
                isImmediatePropagationStopped: j,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = i,
                        a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = i,
                        a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = i,
                        this.stopPropagation()
                }
            },
            kb.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                },
                function(a, b) {
                    kb.event.special[a] = {
                        delegateType: b,
                        bindType: b,
                        handle: function(a) {
                            var c,
                                d = this,
                                e = a.relatedTarget,
                                f = a.handleObj;
                            return (!e || e !== d && !kb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b),
                                c
                        }
                    }
                }),
            kb.support.submitBubbles || (kb.event.special.submit = {
            setup: function() {
                return kb.nodeName(this, "form") ? !1: void kb.event.add(this, "click._submit keypress._submit",
                    function(a) {
                        var c = a.target,
                            d = kb.nodeName(c, "input") || kb.nodeName(c, "button") ? c.form: b;
                        d && !kb._data(d, "submitBubbles") && (kb.event.add(d, "submit._submit",
                            function(a) {
                                a._submit_bubble = !0
                            }), kb._data(d, "submitBubbles", !0))
                    })
            },
            postDispatch: function(a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && kb.event.simulate("submit", this.parentNode, a, !0))
            },
            teardown: function() {
                return kb.nodeName(this, "form") ? !1: void kb.event.remove(this, "._submit")
            }
        }),
            kb.support.changeBubbles || (kb.event.special.change = {
            setup: function() {
                return Lb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (kb.event.add(this, "propertychange._change",
                    function(a) {
                        "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                    }), kb.event.add(this, "click._change",
                    function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1),
                            kb.event.simulate("change", this, a, !0)
                    })), !1) : void kb.event.add(this, "beforeactivate._change",
                    function(a) {
                        var b = a.target;
                        Lb.test(b.nodeName) && !kb._data(b, "changeBubbles") && (kb.event.add(b, "change._change",
                            function(a) { ! this.parentNode || a.isSimulated || a.isTrigger || kb.event.simulate("change", this.parentNode, a, !0)
                            }), kb._data(b, "changeBubbles", !0))
                    })
            },
            handle: function(a) {
                var b = a.target;
                return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return kb.event.remove(this, "._change"),
                    !Lb.test(this.nodeName)
            }
        }),
            kb.support.focusinBubbles || kb.each({
                focus: "focusin",
                blur: "focusout"
            },
            function(a, b) {
                var c = 0,
                    d = function(a) {
                        kb.event.simulate(b, a.target, kb.event.fix(a), !0)
                    };
                kb.event.special[b] = {
                    setup: function() {
                        0 === c++&&Y.addEventListener(a, d, !0)
                    },
                    teardown: function() {
                        0 === --c && Y.removeEventListener(a, d, !0)
                    }
                }
            }),
            kb.fn.extend({
                on: function(a, c, d, e, f) {
                    var g,
                        h;
                    if ("object" == typeof a) {
                        "string" != typeof c && (d = d || c, c = b);
                        for (g in a) this.on(g, c, d, a[g], f);
                        return this
                    }
                    if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1) e = j;
                    else if (!e) return this;
                    return 1 === f && (h = e, e = function(a) {
                        return kb().off(a),
                            h.apply(this, arguments)
                    },
                        e.guid = h.guid || (h.guid = kb.guid++)),
                        this.each(function() {
                            kb.event.add(this, a, e, d, c)
                        })
                },
                one: function(a, b, c, d) {
                    return this.on(a, b, c, d, 1)
                },
                off: function(a, c, d) {
                    var e,
                        f;
                    if (a && a.preventDefault && a.handleObj) return e = a.handleObj,
                        kb(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace: e.origType, e.selector, e.handler),
                        this;
                    if ("object" == typeof a) {
                        for (f in a) this.off(f, c, a[f]);
                        return this
                    }
                    return (c === !1 || "function" == typeof c) && (d = c, c = b),
                        d === !1 && (d = j),
                        this.each(function() {
                            kb.event.remove(this, a, d, c)
                        })
                },
                trigger: function(a, b) {
                    return this.each(function() {
                        kb.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function(a, b) {
                    var c = this[0];
                    return c ? kb.event.trigger(a, b, c, !0) : void 0
                }
            });
        var Qb = /^.[^:#\[\.,]*$/,
            Rb = /^(?:parents|prev(?:Until|All))/,
            Sb = kb.expr.match.needsContext,
            Tb = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        kb.fn.extend({
            find: function(a) {
                var b,
                    c = [],
                    d = this,
                    e = d.length;
                if ("string" != typeof a) return this.pushStack(kb(a).filter(function() {
                    for (b = 0; e > b; b++) if (kb.contains(d[b], this)) return ! 0
                }));
                for (b = 0; e > b; b++) kb.find(a, d[b], c);
                return c = this.pushStack(e > 1 ? kb.unique(c) : c),
                    c.selector = this.selector ? this.selector + " " + a: a,
                    c
            },
            has: function(a) {
                var b,
                    c = kb(a, this),
                    d = c.length;
                return this.filter(function() {
                    for (b = 0; d > b; b++) if (kb.contains(this, c[b])) return ! 0
                })
            },
            not: function(a) {
                return this.pushStack(m(this, a || [], !0))
            },
            filter: function(a) {
                return this.pushStack(m(this, a || [], !1))
            },
            is: function(a) {
                return !! m(this, "string" == typeof a && Sb.test(a) ? kb(a) : a || [], !1).length
            },
            closest: function(a, b) {
                for (var c, d = 0, e = this.length, f = [], g = Sb.test(a) || "string" != typeof a ? kb(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1: 1 === c.nodeType && kb.find.matchesSelector(c, a))) {
                    c = f.push(c);
                    break
                }
                return this.pushStack(f.length > 1 ? kb.unique(f) : f)
            },
            index: function(a) {
                return a ? "string" == typeof a ? kb.inArray(this[0], kb(a)) : kb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
            },
            add: function(a, b) {
                var c = "string" == typeof a ? kb(a, b) : kb.makeArray(a && a.nodeType ? [a] : a),
                    d = kb.merge(this.get(), c);
                return this.pushStack(kb.unique(d))
            },
            addBack: function(a) {
                return this.add(null == a ? this.prevObject: this.prevObject.filter(a))
            }
        }),
            kb.each({
                    parent: function(a) {
                        var b = a.parentNode;
                        return b && 11 !== b.nodeType ? b: null

                    },
                    parents: function(a) {
                        return kb.dir(a, "parentNode")
                    },
                    parentsUntil: function(a, b, c) {
                        return kb.dir(a, "parentNode", c)
                    },
                    next: function(a) {
                        return l(a, "nextSibling")
                    },
                    prev: function(a) {
                        return l(a, "previousSibling")
                    },
                    nextAll: function(a) {
                        return kb.dir(a, "nextSibling")
                    },
                    prevAll: function(a) {
                        return kb.dir(a, "previousSibling")
                    },
                    nextUntil: function(a, b, c) {
                        return kb.dir(a, "nextSibling", c)
                    },
                    prevUntil: function(a, b, c) {
                        return kb.dir(a, "previousSibling", c)
                    },
                    siblings: function(a) {
                        return kb.sibling((a.parentNode || {}).firstChild, a)
                    },
                    children: function(a) {
                        return kb.sibling(a.firstChild)
                    },
                    contents: function(a) {
                        return kb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document: kb.merge([], a.childNodes)
                    }
                },
                function(a, b) {
                    kb.fn[a] = function(c, d) {
                        var e = kb.map(this, b, c);
                        return "Until" !== a.slice( - 5) && (d = c),
                            d && "string" == typeof d && (e = kb.filter(d, e)),
                            this.length > 1 && (Tb[a] || (e = kb.unique(e)), Rb.test(a) && (e = e.reverse())),
                            this.pushStack(e)
                    }
                }),
            kb.extend({
                filter: function(a, b, c) {
                    var d = b[0];
                    return c && (a = ":not(" + a + ")"),
                            1 === b.length && 1 === d.nodeType ? kb.find.matchesSelector(d, a) ? [d] : [] : kb.find.matches(a, kb.grep(b,
                        function(a) {
                            return 1 === a.nodeType
                        }))
                },
                dir: function(a, c, d) {
                    for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !kb(f).is(d));) 1 === f.nodeType && e.push(f),
                        f = f[c];
                    return e
                },
                sibling: function(a, b) {
                    for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                    return c
                }
            });
        var Ub = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Vb = / jQuery\d+="(?:null|\d+)"/g,
            Wb = new RegExp("<(?:" + Ub + ")[\\s/>]", "i"),
            Xb = /^\s+/,
            Yb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Zb = /<([\w:]+)/,
            $b = /<tbody/i,
            _b = /<|&#?\w+;/,
            ac = /<(?:script|style|link)/i,
            bc = /^(?:checkbox|radio)$/i,
            cc = /checked\s*(?:[^=]|=\s*.checked.)/i,
            dc = /^$|\/(?:java|ecma)script/i,
            ec = /^true\/(.*)/,
            fc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            gc = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: kb.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            hc = n(Y),
            ic = hc.appendChild(Y.createElement("div"));
        gc.optgroup = gc.option,
            gc.tbody = gc.tfoot = gc.colgroup = gc.caption = gc.thead,
            gc.th = gc.td,
            kb.fn.extend({
                text: function(a) {
                    return kb.access(this,
                        function(a) {
                            return a === b ? kb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Y).createTextNode(a))
                        },
                        null, a, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments,
                        function(a) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var b = o(this, a);
                                b.appendChild(a)
                            }
                        })
                },
                prepend: function() {
                    return this.domManip(arguments,
                        function(a) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var b = o(this, a);
                                b.insertBefore(a, b.firstChild)
                            }
                        })
                },
                before: function() {
                    return this.domManip(arguments,
                        function(a) {
                            this.parentNode && this.parentNode.insertBefore(a, this)
                        })
                },
                after: function() {
                    return this.domManip(arguments,
                        function(a) {
                            this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                        })
                },
                remove: function(a, b) {
                    for (var c, d = a ? kb.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || kb.cleanData(u(c)),
                        c.parentNode && (b && kb.contains(c.ownerDocument, c) && r(u(c, "script")), c.parentNode.removeChild(c));
                    return this
                },
                empty: function() {
                    for (var a, b = 0; null != (a = this[b]); b++) {
                        for (1 === a.nodeType && kb.cleanData(u(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                        a.options && kb.nodeName(a, "select") && (a.options.length = 0)
                    }
                    return this
                },
                clone: function(a, b) {
                    return a = null == a ? !1: a,
                        b = null == b ? a: b,
                        this.map(function() {
                            return kb.clone(this, a, b)
                        })
                },
                html: function(a) {
                    return kb.access(this,
                        function(a) {
                            var c = this[0] || {},
                                d = 0,
                                e = this.length;
                            if (a === b) return 1 === c.nodeType ? c.innerHTML.replace(Vb, "") : b;
                            if (! ("string" != typeof a || ac.test(a) || !kb.support.htmlSerialize && Wb.test(a) || !kb.support.leadingWhitespace && Xb.test(a) || gc[(Zb.exec(a) || ["", ""])[1].toLowerCase()])) {
                                a = a.replace(Yb, "<$1></$2>");
                                try {
                                    for (; e > d; d++) c = this[d] || {},
                                        1 === c.nodeType && (kb.cleanData(u(c, !1)), c.innerHTML = a);
                                    c = 0
                                } catch(f) {}
                            }
                            c && this.empty().append(a)
                        },
                        null, a, arguments.length)
                },
                replaceWith: function() {
                    var a = kb.map(this,
                            function(a) {
                                return [a.nextSibling, a.parentNode]
                            }),
                        b = 0;
                    return this.domManip(arguments,
                        function(c) {
                            var d = a[b++],
                                e = a[b++];
                            e && (d && d.parentNode !== e && (d = this.nextSibling), kb(this).remove(), e.insertBefore(c, d))
                        },
                        !0),
                        b ? this: this.remove()
                },
                detach: function(a) {
                    return this.remove(a, !0)
                },
                domManip: function(a, b, c) {
                    a = db.apply([], a);
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j = 0,
                        k = this.length,
                        l = this,
                        m = k - 1,
                        n = a[0],
                        o = kb.isFunction(n);
                    if (o || !(1 >= k || "string" != typeof n || kb.support.checkClone) && cc.test(n)) return this.each(function(d) {
                        var e = l.eq(d);
                        o && (a[0] = n.call(this, d, e.html())),
                            e.domManip(a, b, c)
                    });
                    if (k && (i = kb.buildFragment(a, this[0].ownerDocument, !1, !c && this), d = i.firstChild, 1 === i.childNodes.length && (i = d), d)) {
                        for (g = kb.map(u(i, "script"), p), f = g.length; k > j; j++) e = i,
                            j !== m && (e = kb.clone(e, !0, !0), f && kb.merge(g, u(e, "script"))),
                            b.call(this[j], e, j);
                        if (f) for (h = g[g.length - 1].ownerDocument, kb.map(g, q), j = 0; f > j; j++) e = g[j],
                            dc.test(e.type || "") && !kb._data(e, "globalEval") && kb.contains(h, e) && (e.src ? kb._evalUrl(e.src) : kb.globalEval((e.text || e.textContent || e.innerHTML || "").replace(fc, "")));
                        i = d = null
                    }
                    return this
                }
            }),
            kb.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                },
                function(a, b) {
                    kb.fn[a] = function(a) {
                        for (var c, d = 0, e = [], f = kb(a), g = f.length - 1; g >= d; d++) c = d === g ? this: this.clone(!0),
                            kb(f[d])[b](c),
                            eb.apply(e, c.get());
                        return this.pushStack(e)
                    }
                }),
            kb.extend({
                clone: function(a, b, c) {
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i = kb.contains(a.ownerDocument, a);
                    if (kb.support.html5Clone || kb.isXMLDoc(a) || !Wb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ic.innerHTML = a.outerHTML, ic.removeChild(f = ic.firstChild)), !(kb.support.noCloneEvent && kb.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || kb.isXMLDoc(a))) for (d = u(f), h = u(a), g = 0; null != (e = h[g]); ++g) d[g] && t(e, d[g]);
                    if (b) if (c) for (h = h || u(a), d = d || u(f), g = 0; null != (e = h[g]); g++) s(e, d[g]);
                    else s(a, f);
                    return d = u(f, "script"),
                        d.length > 0 && r(d, !i && u(a, "script")),
                        d = h = e = null,
                        f
                },
                buildFragment: function(a, b, c, d) {
                    for (var e, f, g, h, i, j, k, l = a.length, m = n(b), o = [], p = 0; l > p; p++) if (f = a[p], f || 0 === f) if ("object" === kb.type(f)) kb.merge(o, f.nodeType ? [f] : f);
                    else if (_b.test(f)) {
                        for (h = h || m.appendChild(b.createElement("div")), i = (Zb.exec(f) || ["", ""])[1].toLowerCase(), k = gc[i] || gc._default, h.innerHTML = k[1] + f.replace(Yb, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild;
                        if (!kb.support.leadingWhitespace && Xb.test(f) && o.push(b.createTextNode(Xb.exec(f)[0])), !kb.support.tbody) for (f = "table" !== i || $b.test(f) ? "<table>" !== k[1] || $b.test(f) ? 0: h: h.firstChild, e = f && f.childNodes.length; e--;) kb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                        for (kb.merge(o, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                        h = m.lastChild
                    } else o.push(b.createTextNode(f));
                    for (h && m.removeChild(h), kb.support.appendChecked || kb.grep(u(o, "input"), v), p = 0; f = o[p++];) if ((!d || -1 === kb.inArray(f, d)) && (g = kb.contains(f.ownerDocument, f), h = u(m.appendChild(f), "script"), g && r(h), c)) for (e = 0; f = h[e++];) dc.test(f.type || "") && c.push(f);
                    return h = null,
                        m
                },
                cleanData: function(a, b) {
                    for (var c, d, e, f, g = 0, h = kb.expando, i = kb.cache, j = kb.support.deleteExpando, k = kb.event.special; null != (c = a[g]); g++) if ((b || kb.acceptData(c)) && (e = c[h], f = e && i[e])) {
                        if (f.events) for (d in f.events) k[d] ? kb.event.remove(c, d) : kb.removeEvent(c, d, f.handle);
                        i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== W ? c.removeAttribute(h) : c[h] = null, bb.push(e))
                    }
                },
                _evalUrl: function(a) {
                    return kb.ajax({
                        url: a,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    })
                }
            }),
            kb.fn.extend({
                wrapAll: function(a) {
                    if (kb.isFunction(a)) return this.each(function(b) {
                        kb(this).wrapAll(a.call(this, b))
                    });
                    if (this[0]) {
                        var b = kb(a, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && b.insertBefore(this[0]),
                            b.map(function() {
                                for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                                return a
                            }).append(this)
                    }
                    return this
                },
                wrapInner: function(a) {
                    return this.each(kb.isFunction(a) ?
                        function(b) {
                            kb(this).wrapInner(a.call(this, b))
                        }: function() {
                        var b = kb(this),
                            c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function(a) {
                    var b = kb.isFunction(a);
                    return this.each(function(c) {
                        kb(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        kb.nodeName(this, "body") || kb(this).replaceWith(this.childNodes)
                    }).end()
                }
            });
        var jc,
            kc,
            lc,
            mc = /alpha\([^)]*\)/i,
            nc = /opacity\s*=\s*([^)]*)/,
            oc = /^(top|right|bottom|left)$/,
            pc = /^(none|table(?!-c[ea]).+)/,
            qc = /^margin/,
            rc = new RegExp("^(" + lb + ")(.*)$", "i"),
            sc = new RegExp("^(" + lb + ")(?!px)[a-z%]+$", "i"),
            tc = new RegExp("^([+-])=(" + lb + ")", "i"),
            uc = {
                BODY: "block"
            },
            vc = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            wc = {
                letterSpacing: 0,
                fontWeight: 400
            },
            xc = ["Top", "Right", "Bottom", "Left"],
            yc = ["Webkit", "O", "Moz", "ms"];
        kb.fn.extend({
            css: function(a, c) {
                return kb.access(this,
                    function(a, c, d) {
                        var e,
                            f,
                            g = {},
                            h = 0;
                        if (kb.isArray(c)) {
                            for (f = kc(a), e = c.length; e > h; h++) g[c[h]] = kb.css(a, c[h], !1, f);
                            return g
                        }
                        return d !== b ? kb.style(a, c, d) : kb.css(a, c)
                    },
                    a, c, arguments.length > 1)
            },
            show: function() {
                return y(this, !0)
            },
            hide: function() {
                return y(this)
            },
            toggle: function(a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                    x(this) ? kb(this).show() : kb(this).hide()
                })
            }
        }),
            kb.extend({
                cssHooks: {
                    opacity: {
                        get: function(a, b) {
                            if (b) {
                                var c = lc(a, "opacity");
                                return "" === c ? "1": c
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": kb.support.cssFloat ? "cssFloat": "styleFloat"
                },
                style: function(a, c, d, e) {
                    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                        var f,
                            g,
                            h,
                            i = kb.camelCase(c),
                            j = a.style;
                        if (c = kb.cssProps[i] || (kb.cssProps[i] = w(j, i)), h = kb.cssHooks[c] || kb.cssHooks[i], d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f: j[c];
                        if (g = typeof d, "string" === g && (f = tc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(kb.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || kb.cssNumber[i] || (d += "px"), kb.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), h && "set" in h && (d = h.set(a, d, e)) === b))) try {
                            j[c] = d
                        } catch(k) {}
                    }
                },
                css: function(a, c, d, e) {
                    var f,
                        g,
                        h,
                        i = kb.camelCase(c);
                    return c = kb.cssProps[i] || (kb.cssProps[i] = w(a.style, i)),
                        h = kb.cssHooks[c] || kb.cssHooks[i],
                        h && "get" in h && (g = h.get(a, !0, d)),
                        g === b && (g = lc(a, c, e)),
                        "normal" === g && c in wc && (g = wc[c]),
                            "" === d || d ? (f = parseFloat(g), d === !0 || kb.isNumeric(f) ? f || 0: g) : g
                }
            }),
            a.getComputedStyle ? (kc = function(b) {
                return a.getComputedStyle(b, null)
            },
                lc = function(a, c, d) {
                    var e,
                        f,
                        g,
                        h = d || kc(a),
                        i = h ? h.getPropertyValue(c) || h[c] : b,
                        j = a.style;
                    return h && ("" !== i || kb.contains(a.ownerDocument, a) || (i = kb.style(a, c)), sc.test(i) && qc.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)),
                        i
                }) : Y.documentElement.currentStyle && (kc = function(a) {
                return a.currentStyle
            },
                lc = function(a, c, d) {
                    var e,
                        f,
                        g,
                        h = d || kc(a),
                        i = h ? h[c] : b,
                        j = a.style;
                    return null == i && j && j[c] && (i = j[c]),
                        sc.test(i) && !oc.test(c) && (e = j.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = "fontSize" === c ? "1em": i, i = j.pixelLeft + "px", j.left = e, g && (f.left = g)),
                            "" === i ? "auto": i
                }),
            kb.each(["height", "width"],
                function(a, b) {
                    kb.cssHooks[b] = {
                        get: function(a, c, d) {
                            return c ? 0 === a.offsetWidth && pc.test(kb.css(a, "display")) ? kb.swap(a, vc,
                                function() {
                                    return B(a, b, d)
                                }) : B(a, b, d) : void 0
                        },
                        set: function(a, c, d) {
                            var e = d && kc(a);
                            return z(a, c, d ? A(a, b, d, kb.support.boxSizing && "border-box" === kb.css(a, "boxSizing", !1, e), e) : 0)
                        }
                    }
                }),
            kb.support.opacity || (kb.cssHooks.opacity = {
            get: function(a, b) {
                return nc.test((b && a.currentStyle ? a.currentStyle.filter: a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": b ? "1": ""
            },
            set: function(a, b) {
                var c = a.style,
                    d = a.currentStyle,
                    e = kb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")": "",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1,
                    (b >= 1 || "" === b) && "" === kb.trim(f.replace(mc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = mc.test(f) ? f.replace(mc, e) : f + " " + e)
            }
        }),
            kb(function() {
                kb.support.reliableMarginRight || (kb.cssHooks.marginRight = {
                    get: function(a, b) {
                        return b ? kb.swap(a, {
                                display: "inline-block"
                            },
                            lc, [a, "marginRight"]) : void 0
                    }
                }),
                    !kb.support.pixelPosition && kb.fn.position && kb.each(["top", "left"],
                    function(a, b) {
                        kb.cssHooks[b] = {
                            get: function(a, c) {
                                return c ? (c = lc(a, b), sc.test(c) ? kb(a).position()[b] + "px": c) : void 0
                            }
                        }
                    })
            }),
            kb.expr && kb.expr.filters && (kb.expr.filters.hidden = function(a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !kb.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || kb.css(a, "display"))
        },
            kb.expr.filters.visible = function(a) {
                return ! kb.expr.filters.hidden(a)
            }),
            kb.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                },
                function(a, b) {
                    kb.cssHooks[a + b] = {
                        expand: function(c) {
                            for (var d = 0, e = {},
                                     f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + xc[d] + b] = f[d] || f[d - 2] || f[0];
                            return e
                        }
                    },
                        qc.test(a) || (kb.cssHooks[a + b].set = z)
                });
        var zc = /%20/g,
            Ac = /\[\]$/,
            Bc = /\r?\n/g,
            Cc = /^(?:submit|button|image|reset|file)$/i,
            Dc = /^(?:input|select|textarea|keygen)/i;
        kb.fn.extend({
            serialize: function() {
                return kb.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var a = kb.prop(this, "elements");
                    return a ? kb.makeArray(a) : this
                }).filter(function() {
                    var a = this.type;
                    return this.name && !kb(this).is(":disabled") && Dc.test(this.nodeName) && !Cc.test(a) && (this.checked || !bc.test(a))
                }).map(function(a, b) {
                    var c = kb(this).val();
                    return null == c ? null: kb.isArray(c) ? kb.map(c,
                        function(a) {
                            return {
                                name: b.name,
                                value: a.replace(Bc, "\r\n")
                            }
                        }) : {
                        name: b.name,
                        value: c.replace(Bc, "\r\n")
                    }
                }).get()
            }
        }),
            kb.param = function(a, c) {
                var d,
                    e = [],
                    f = function(a, b) {
                        b = kb.isFunction(b) ? b() : null == b ? "": b,
                            e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                if (c === b && (c = kb.ajaxSettings && kb.ajaxSettings.traditional), kb.isArray(a) || a.jquery && !kb.isPlainObject(a)) kb.each(a,
                    function() {
                        f(this.name, this.value)
                    });
                else for (d in a) E(d, a[d], c, f);
                return e.join("&").replace(zc, "+")
            },
            kb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
                function(a, b) {
                    kb.fn[b] = function(a, c) {
                        return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                    }
                }),
            kb.fn.extend({
                hover: function(a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                },
                bind: function(a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function(a, b) {
                    return this.off(a, null, b)
                },
                delegate: function(a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function(a, b, c) {
                    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                }
            });
        var Ec,
            Fc,
            Gc = kb.now(),
            Hc = /\?/,
            Ic = /#.*$/,
            Jc = /([?&])_=[^&]*/,
            Kc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Lc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Mc = /^(?:GET|HEAD)$/,
            Nc = /^\/\//,
            Oc = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            Pc = kb.fn.load,
            Qc = {},
            Rc = {},
            Sc = "*/".concat("*");
        try {
            Fc = X.href
        } catch(Tc) {
            Fc = Y.createElement("a"),
                Fc.href = "",
                Fc = Fc.href
        }
        Ec = Oc.exec(Fc.toLowerCase()) || [],
            kb.fn.load = function(a, c, d) {
                if ("string" != typeof a && Pc) return Pc.apply(this, arguments);
                var e,
                    f,
                    g,
                    h = this,
                    i = a.indexOf(" ");
                return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)),
                    kb.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (g = "POST"),
                    h.length > 0 && kb.ajax({
                    url: a,
                    type: g,
                    dataType: "html",
                    data: c
                }).done(function(a) {
                    f = arguments,
                        h.html(e ? kb("<div>").append(kb.parseHTML(a)).find(e) : a)
                }).complete(d &&
                    function(a, b) {
                        h.each(d, f || [a.responseText, b, a])
                    }),
                    this
            },
            kb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
                function(a, b) {
                    kb.fn[b] = function(a) {
                        return this.on(b, a)
                    }
                }),
            kb.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Fc,
                    type: "GET",
                    isLocal: Lc.test(Ec[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Sc,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": kb.parseJSON,
                        "text xml": kb.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(a, b) {
                    return b ? H(H(a, kb.ajaxSettings), b) : H(kb.ajaxSettings, a)
                },
                ajaxPrefilter: F(Qc),
                ajaxTransport: F(Rc),
                ajax: function(a, c) {
                    function d(a, c, d, e) {
                        var f,
                            l,
                            s,
                            t,
                            v,
                            x = c;
                        2 !== u && (u = 2, i && clearTimeout(i), k = b, h = e || "", w.readyState = a > 0 ? 4: 0, f = a >= 200 && 300 > a || 304 === a, d && (t = I(m, w, d)), t = J(m, t, w, f), f ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (kb.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (kb.etag[g] = v)), 204 === a || "HEAD" === m.type ? x = "nocontent": 304 === a ? x = "notmodified": (x = t.state, l = t.data, s = t.error, f = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, j && o.trigger(f ? "ajaxSuccess": "ajaxError", [w, m, f ? l: s]), q.fireWith(n, [w, x]), j && (o.trigger("ajaxComplete", [w, m]), --kb.active || kb.event.trigger("ajaxStop")))
                    }
                    "object" == typeof a && (c = a, a = b),
                        c = c || {};
                    var e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m = kb.ajaxSetup({},
                            c),
                        n = m.context || m,
                        o = m.context && (n.nodeType || n.jquery) ? kb(n) : kb.event,
                        p = kb.Deferred(),
                        q = kb.Callbacks("once memory"),
                        r = m.statusCode || {},
                        s = {},
                        t = {},
                        u = 0,
                        v = "canceled",
                        w = {
                            readyState: 0,
                            getResponseHeader: function(a) {
                                var b;
                                if (2 === u) {
                                    if (!l) for (l = {}; b = Kc.exec(h);) l[b[1].toLowerCase()] = b[2];
                                    b = l[a.toLowerCase()]
                                }
                                return null == b ? null: b
                            },
                            getAllResponseHeaders: function() {
                                return 2 === u ? h: null
                            },
                            setRequestHeader: function(a, b) {
                                var c = a.toLowerCase();
                                return u || (a = t[c] = t[c] || a, s[a] = b),
                                    this
                            },
                            overrideMimeType: function(a) {
                                return u || (m.mimeType = a),
                                    this
                            },
                            statusCode: function(a) {
                                var b;
                                if (a) if (2 > u) for (b in a) r[b] = [r[b], a[b]];
                                else w.always(a[w.status]);
                                return this
                            },
                            abort: function(a) {
                                var b = a || v;
                                return k && k.abort(b),
                                    d(0, b),
                                    this
                            }
                        };
                    if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || Fc) + "").replace(Ic, "").replace(Nc, Ec[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = kb.trim(m.dataType || "*").toLowerCase().match(mb) || [""], null == m.crossDomain && (e = Oc.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === Ec[1] && e[2] === Ec[2] && (e[3] || ("http:" === e[1] ? "80": "443")) === (Ec[3] || ("http:" === Ec[1] ? "80": "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = kb.param(m.data, m.traditional)), G(Qc, m, c, w), 2 === u) return w;
                    j = m.global,
                        j && 0 === kb.active++&&kb.event.trigger("ajaxStart"),
                        m.type = m.type.toUpperCase(),
                        m.hasContent = !Mc.test(m.type),
                        g = m.url,
                        m.hasContent || (m.data && (g = m.url += (Hc.test(g) ? "&": "?") + m.data, delete m.data), m.cache === !1 && (m.url = Jc.test(g) ? g.replace(Jc, "$1_=" + Gc++) : g + (Hc.test(g) ? "&": "?") + "_=" + Gc++)),
                        m.ifModified && (kb.lastModified[g] && w.setRequestHeader("If-Modified-Since", kb.lastModified[g]), kb.etag[g] && w.setRequestHeader("If-None-Match", kb.etag[g])),
                        (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType),
                        w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Sc + "; q=0.01": "") : m.accepts["*"]);
                    for (f in m.headers) w.setRequestHeader(f, m.headers[f]);
                    if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u)) return w.abort();
                    v = "abort";
                    for (f in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) w[f](m[f]);
                    if (k = G(Rc, m, c, w)) {
                        w.readyState = 1,
                            j && o.trigger("ajaxSend", [w, m]),
                            m.async && m.timeout > 0 && (i = setTimeout(function() {
                                w.abort("timeout")
                            },
                            m.timeout));
                        try {
                            u = 1,
                                k.send(s, d)
                        } catch(x) {
                            if (! (2 > u)) throw x;
                            d( - 1, x)
                        }
                    } else d( - 1, "No Transport");
                    return w
                },
                getJSON: function(a, b, c) {
                    return kb.get(a, b, c, "json")
                },
                getScript: function(a, c) {
                    return kb.get(a, b, c, "script")
                }
            }),
            kb.each(["get", "post"],
                function(a, c) {
                    kb[c] = function(a, d, e, f) {
                        return kb.isFunction(d) && (f = f || e, e = d, d = b),
                            kb.ajax({
                                url: a,
                                type: c,
                                dataType: f,
                                data: d,
                                success: e
                            })
                    }
                }),
            kb.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(a) {
                        return kb.globalEval(a),
                            a
                    }
                }
            }),
            kb.ajaxPrefilter("script",
                function(a) {
                    a.cache === b && (a.cache = !1),
                        a.crossDomain && (a.type = "GET", a.global = !1)
                }),
            kb.ajaxTransport("script",
                function(a) {
                    if (a.crossDomain) {
                        var c,
                            d = Y.head || kb("head")[0] || Y.documentElement;
                        return {
                            send: function(b, e) {
                                c = Y.createElement("script"),
                                    c.async = !0,
                                    a.scriptCharset && (c.charset = a.scriptCharset),
                                    c.src = a.url,
                                    c.onload = c.onreadystatechange = function(a, b) { (b || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success"))
                                    },
                                    d.insertBefore(c, d.firstChild)
                            },
                            abort: function() {
                                c && c.onload(b, !0)
                            }
                        }
                    }
                });
        var Uc = [],
            Vc = /(=)\?(?=&|$)|\?\?/;
        kb.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var a = Uc.pop() || kb.expando + "_" + Gc++;
                return this[a] = !0,
                    a
            }
        }),
            kb.ajaxPrefilter("json jsonp",
                function(c, d, e) {
                    var f,
                        g,
                        h,
                        i = c.jsonp !== !1 && (Vc.test(c.url) ? "url": "string" == typeof c.data && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Vc.test(c.data) && "data");
                    return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = kb.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(Vc, "$1" + f) : c.jsonp !== !1 && (c.url += (Hc.test(c.url) ? "&": "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
                        return h || kb.error(f + " was not called"),
                            h[0]
                    },
                        c.dataTypes[0] = "json", g = a[f], a[f] = function() {
                        h = arguments
                    },
                        e.always(function() {
                            a[f] = g,
                                c[f] && (c.jsonpCallback = d.jsonpCallback, Uc.push(f)),
                                h && kb.isFunction(g) && g(h[0]),
                                h = g = b
                        }), "script") : void 0
                });
        var Wc,
            Xc,
            Yc = 0,
            Zc = a.ActiveXObject &&
                function() {
                    var a;
                    for (a in Wc) Wc[a](b, !0)
                };
        kb.ajaxSettings.xhr = a.ActiveXObject ?
            function() {
                return ! this.isLocal && K() || L()
            }: K,
            Xc = kb.ajaxSettings.xhr(),
            kb.support.cors = !!Xc && "withCredentials" in Xc,
            Xc = kb.support.ajax = !!Xc,
            Xc && kb.ajaxTransport(function(c) {
            if (!c.crossDomain || kb.support.cors) {
                var d;
                return {
                    send: function(e, f) {
                        var g,
                            h,
                            i = c.xhr();
                        if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields) for (h in c.xhrFields) i[h] = c.xhrFields[h];
                        c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType),
                            c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (h in e) i.setRequestHeader(h, e[h])
                        } catch(j) {}
                        i.send(c.hasContent && c.data || null),
                            d = function(a, e) {
                                var h,
                                    j,
                                    k,
                                    l;
                                try {
                                    if (d && (e || 4 === i.readyState)) if (d = b, g && (i.onreadystatechange = kb.noop, Zc && delete Wc[g]), e) 4 !== i.readyState && i.abort();
                                    else {
                                        l = {},
                                            h = i.status,
                                            j = i.getAllResponseHeaders(),
                                            "string" == typeof i.responseText && (l.text = i.responseText);
                                        try {
                                            k = i.statusText
                                        } catch(m) {
                                            k = ""
                                        }
                                        h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200: 404
                                    }
                                } catch(n) {
                                    e || f( - 1, n)
                                }
                                l && f(h, k, l, j)
                            },
                            c.async ? 4 === i.readyState ? setTimeout(d) : (g = ++Yc, Zc && (Wc || (Wc = {},
                                kb(a).unload(Zc)), Wc[g] = d), i.onreadystatechange = d) : d()
                    },
                    abort: function() {
                        d && d(b, !0)
                    }
                }
            }
        });
        var $c,
            _c,
            ad = /^(?:toggle|show|hide)$/,
            bd = new RegExp("^(?:([+-])=|)(" + lb + ")([a-z%]*)$", "i"),
            cd = /queueHooks$/,
            dd = [Q],
            ed = {
                "*": [function(a, b) {
                    var c = this.createTween(a, b),
                        d = c.cur(),
                        e = bd.exec(b),
                        f = e && e[3] || (kb.cssNumber[a] ? "": "px"),
                        g = (kb.cssNumber[a] || "px" !== f && +d) && bd.exec(kb.css(c.elem, a)),
                        h = 1,
                        i = 20;
                    if (g && g[3] !== f) {
                        f = f || g[3],
                            e = e || [],
                            g = +d || 1;
                        do h = h || ".5",
                            g /= h,
                            kb.style(c.elem, a, g + f);
                        while (h !== (h = c.cur() / d) && 1 !== h && --i)
                    }
                    return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]),
                        c
                }]
            };
        kb.Animation = kb.extend(O, {
            tweener: function(a, b) {
                kb.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d],
                    ed[c] = ed[c] || [],
                    ed[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? dd.unshift(a) : dd.push(a)
            }
        }),
            kb.Tween = R,
            R.prototype = {
                constructor: R,
                init: function(a, b, c, d, e, f) {
                    this.elem = a,
                        this.prop = c,
                        this.easing = e || "swing",
                        this.options = b,
                        this.start = this.now = this.cur(),
                        this.end = d,
                        this.unit = f || (kb.cssNumber[c] ? "": "px")
                },
                cur: function() {
                    var a = R.propHooks[this.prop];
                    return a && a.get ? a.get(this) : R.propHooks._default.get(this)
                },
                run: function(a) {
                    var b,
                        c = R.propHooks[this.prop];
                    return this.pos = b = this.options.duration ? kb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a,
                        this.now = (this.end - this.start) * b + this.start,
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                            c && c.set ? c.set(this) : R.propHooks._default.set(this),
                        this
                }
            },
            R.prototype.init.prototype = R.prototype,
            R.propHooks = {
                _default: {
                    get: function(a) {
                        var b;
                        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = kb.css(a.elem, a.prop, ""), b && "auto" !== b ? b: 0) : a.elem[a.prop]
                    },
                    set: function(a) {
                        kb.fx.step[a.prop] ? kb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[kb.cssProps[a.prop]] || kb.cssHooks[a.prop]) ? kb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                    }
                }
            },
            R.propHooks.scrollTop = R.propHooks.scrollLeft = {
                set: function(a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                }
            },
            kb.each(["toggle", "show", "hide"],
                function(a, b) {
                    var c = kb.fn[b];
                    kb.fn[b] = function(a, d, e) {
                        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(S(b, !0), a, d, e)
                    }
                }),
            kb.fn.extend({
                fadeTo: function(a, b, c, d) {
                    return this.filter(x).css("opacity", 0).show().end().animate({
                            opacity: b
                        },
                        a, c, d)
                },
                animate: function(a, b, c, d) {
                    var e = kb.isEmptyObject(a),
                        f = kb.speed(b, c, d),
                        g = function() {
                            var b = O(this, kb.extend({},
                                a), f); (e || kb._data(this, "finish")) && b.stop(!0)
                        };
                    return g.finish = g,
                            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function(a, c, d) {
                    var e = function(a) {
                        var b = a.stop;
                        delete a.stop,
                            b(d)
                    };
                    return "string" != typeof a && (d = c, c = a, a = b),
                        c && a !== !1 && this.queue(a || "fx", []),
                        this.each(function() {
                            var b = !0,
                                c = null != a && a + "queueHooks",
                                f = kb.timers,
                                g = kb._data(this);
                            if (c) g[c] && g[c].stop && e(g[c]);
                            else for (c in g) g[c] && g[c].stop && cd.test(c) && e(g[c]);
                            for (c = f.length; c--;) f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), b = !1, f.splice(c, 1)); (b || !d) && kb.dequeue(this, a)
                        })
                },
                finish: function(a) {
                    return a !== !1 && (a = a || "fx"),
                        this.each(function() {
                            var b,
                                c = kb._data(this),
                                d = c[a + "queue"],
                                e = c[a + "queueHooks"],
                                f = kb.timers,
                                g = d ? d.length: 0;
                            for (c.finish = !0, kb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                            for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                            delete c.finish
                        })
                }
            }),
            kb.each({
                    slideDown: S("show"),
                    slideUp: S("hide"),
                    slideToggle: S("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                },
                function(a, b) {
                    kb.fn[a] = function(a, c, d) {
                        return this.animate(b, a, c, d)
                    }
                }),
            kb.speed = function(a, b, c) {
                var d = a && "object" == typeof a ? kb.extend({},
                    a) : {
                    complete: c || !c && b || kb.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !kb.isFunction(b) && b
                };
                return d.duration = kb.fx.off ? 0: "number" == typeof d.duration ? d.duration: d.duration in kb.fx.speeds ? kb.fx.speeds[d.duration] : kb.fx.speeds._default,
                    (null == d.queue || d.queue === !0) && (d.queue = "fx"),
                    d.old = d.complete,
                    d.complete = function() {
                        kb.isFunction(d.old) && d.old.call(this),
                            d.queue && kb.dequeue(this, d.queue)
                    },
                    d
            },
            kb.easing = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return.5 - Math.cos(a * Math.PI) / 2
                }
            },
            kb.timers = [],
            kb.fx = R.prototype.init,
            kb.fx.tick = function() {
                var a,
                    c = kb.timers,
                    d = 0;
                for ($c = kb.now(); d < c.length; d++) a = c[d],
                    a() || c[d] !== a || c.splice(d--, 1);
                c.length || kb.fx.stop(),
                    $c = b
            },
            kb.fx.timer = function(a) {
                a() && kb.timers.push(a) && kb.fx.start()
            },
            kb.fx.interval = 13,
            kb.fx.start = function() {
                _c || (_c = setInterval(kb.fx.tick, kb.fx.interval))
            },
            kb.fx.stop = function() {
                clearInterval(_c),
                    _c = null
            },
            kb.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            kb.fx.step = {},
            kb.expr && kb.expr.filters && (kb.expr.filters.animated = function(a) {
            return kb.grep(kb.timers,
                function(b) {
                    return a === b.elem
                }).length
        }),
            kb.fn.offset = function(a) {
                if (arguments.length) return a === b ? this: this.each(function(b) {
                    kb.offset.setOffset(this, a, b)
                });
                var c,
                    d,
                    e = {
                        top: 0,
                        left: 0
                    },
                    f = this[0],
                    g = f && f.ownerDocument;
                if (g) return c = g.documentElement,
                    kb.contains(c, f) ? (typeof f.getBoundingClientRect !== W && (e = f.getBoundingClientRect()), d = T(g), {
                        top: e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
                        left: e.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
                    }) : e
            },
            kb.offset = {
                setOffset: function(a, b, c) {
                    var d = kb.css(a, "position");
                    "static" === d && (a.style.position = "relative");
                    var e,
                        f,
                        g = kb(a),
                        h = g.offset(),
                        i = kb.css(a, "top"),
                        j = kb.css(a, "left"),
                        k = ("absolute" === d || "fixed" === d) && kb.inArray("auto", [i, j]) > -1,
                        l = {},
                        m = {};
                    k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0),
                        kb.isFunction(b) && (b = b.call(a, c, h)),
                        null != b.top && (l.top = b.top - h.top + e),
                        null != b.left && (l.left = b.left - h.left + f),
                            "using" in b ? b.using.call(a, l) : g.css(l)
                }
            },
            kb.fn.extend({
                position: function() {
                    if (this[0]) {
                        var a,
                            b,
                            c = {
                                top: 0,
                                left: 0
                            },
                            d = this[0];
                        return "fixed" === kb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), kb.nodeName(a[0], "html") || (c = a.offset()), c.top += kb.css(a[0], "borderTopWidth", !0), c.left += kb.css(a[0], "borderLeftWidth", !0)),
                        {
                            top: b.top - c.top - kb.css(d, "marginTop", !0),
                            left: b.left - c.left - kb.css(d, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var a = this.offsetParent || Z; a && !kb.nodeName(a, "html") && "static" === kb.css(a, "position");) a = a.offsetParent;
                        return a || Z
                    })
                }
            }),
            kb.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                },
                function(a, c) {
                    var d = /Y/.test(c);
                    kb.fn[a] = function(e) {
                        return kb.access(this,
                            function(a, e, f) {
                                var g = T(a);
                                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : void(g ? g.scrollTo(d ? kb(g).scrollLeft() : f, d ? f: kb(g).scrollTop()) : a[e] = f)
                            },
                            a, e, arguments.length, null)
                    }
                }),
            kb.each({
                    Height: "height",
                    Width: "width"
                },
                function(a, c) {
                    kb.each({
                            padding: "inner" + a,
                            content: c,
                            "": "outer" + a
                        },
                        function(d, e) {
                            kb.fn[e] = function(e, f) {
                                var g = arguments.length && (d || "boolean" != typeof e),
                                    h = d || (e === !0 || f === !0 ? "margin": "border");
                                return kb.access(this,
                                    function(c, d, e) {
                                        var f;
                                        return kb.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? kb.css(c, d, h) : kb.style(c, d, e, h)
                                    },
                                    c, g ? e: b, g, null)
                            }
                        })
                }),
            kb.fn.size = function() {
                return this.length
            },
            kb.fn.andSelf = kb.fn.addBack,
                "object" == typeof module && module && "object" == typeof module.exports ? module.exports = kb: (a.jQuery = a.$ = kb, "function" == typeof define && define.amd && define("jquery", [],
            function() {
                return kb
            }))
    } (window),
    jQuery.easing.jswing = jQuery.easing.swing,
    jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        easeOutQuart: function(a, b, c, d, e) {
            return - d * ((b = b / e - 1) * b * b * b - 1) + c
        }
    }),
    $.fn.extend({
        mousewheel: function(a) {
            return this.each(function() {
                var b = this;
                b.D = 0,
                    document.all ? b.onmousewheel = function() {
                        b.D = event.wheelDelta,
                            event.returnValue = !1,
                            a && a.call(b)
                    }: b.addEventListener("DOMMouseScroll",
                        function(c) {
                            b.D = c.detail > 0 ? -1: 1,
                                c.preventDefault(),
                                a && a.call(b)
                        },
                        !1)
            })
        }
    }),
    function(a) {
        a.loader = function(b) {
            var c = {
                    width: 42,
                    height: 42,
                    className: "loader"
                },
                d = 0,
                e = a('<img src="img/i.gif" alt="loading" />'),
                f = function() {
                    d > 11 && (d = 0),
                        e.css("background-position", "0 " + (0 - d * c.height) + "px"),
                        d++,
                        setTimeout(f, 50)
                };
            return b || (c = {
                width: 35,
                height: 35,
                className: "animate-loader"
            }),
                e.css({
                    width: c.width,
                    height: c.height
                }).addClass(c.className),
                f(),
                e
        }
    } (jQuery),
    window.Modernizr = function(a, b, c) {
        function d(a) {
            t.cssText = a
        }
        function e(a, b) {
            return d(v.join(a + ";") + (b || ""))
        }
        function f(a, b) {
            return typeof a === b
        }
        function g(a, b) {
            return !! ~ ("" + a).indexOf(b)
        }
        function h(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!g(e, "-") && t[e] !== c) return "pfx" == b ? e: !0
            }
            return ! 1
        }
        function i(a, b, d) {
            for (var e in a) {
                var g = b[a[e]];
                if (g !== c) return d === !1 ? a[e] : f(g, "function") ? g.bind(d || b) : g
            }
            return ! 1
        }
        function j(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + x.join(d + " ") + d).split(" ");
            return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + y.join(d + " ") + d).split(" "), i(e, b, c))
        }
        var k,
            l,
            m,
            n = "2.7.1",
            o = {},
            p = !0,
            q = b.documentElement,
            r = "modernizr",
            s = b.createElement(r),
            t = s.style,
            u = ":)",
            v = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            w = "Webkit Moz O ms",
            x = w.split(" "),
            y = w.toLowerCase().split(" "),
            z = {},
            A = [],
            B = A.slice,
            C = function(a, c, d, e) {
                var f,
                    g,
                    h,
                    i,
                    j = b.createElement("div"),
                    k = b.body,
                    l = k || b.createElement("body");
                if (parseInt(d, 10)) for (; d--;) h = b.createElement("div"),
                    h.id = e ? e[d] : r + (d + 1),
                    j.appendChild(h);
                return f = ["&#173;", '<style id="s', r, '">', a, "</style>"].join(""),
                    j.id = r,
                    (k ? j: l).innerHTML += f,
                    l.appendChild(j),
                    k || (l.style.background = "", l.style.overflow = "hidden", i = q.style.overflow, q.style.overflow = "hidden", q.appendChild(l)),
                    g = c(j, a),
                    k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), q.style.overflow = i),
                    !!g
            },
            D = {}.hasOwnProperty;
        m = f(D, "undefined") || f(D.call, "undefined") ?
            function(a, b) {
                return b in a && f(a.constructor.prototype[b], "undefined")

            }: function(a, b) {
            return D.call(a, b)
        },
            Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError;
            var c = B.call(arguments, 1),
                d = function() {
                    if (this instanceof d) {
                        var e = function() {};
                        e.prototype = b.prototype;
                        var f = new e,
                            g = b.apply(f, c.concat(B.call(arguments)));
                        return Object(g) === g ? g: f
                    }
                    return b.apply(a, c.concat(B.call(arguments)))
                };
            return d
        }),
            z.opacity = function() {
                return e("opacity:.55"),
                    /^0.55$/.test(t.opacity)
            },
            z.cssanimations = function() {
                return j("animationName")
            },
            z.csscolumns = function() {
                return j("columnCount")
            },
            z.csstransitions = function() {
                return j("transition")
            },
            z.generatedcontent = function() {
                var a;
                return C(["#", r, "{font:0/0 a}#", r, ':after{content:"', u, '";visibility:hidden;font:3px/1 a}'].join(""),
                    function(b) {
                        a = b.offsetHeight >= 3
                    }),
                    a
            };
        for (var E in z) m(z, E) && (l = E.toLowerCase(), o[l] = z[E](), A.push((o[l] ? "": "no-") + l));
        return o.addTest = function(a, b) {
            if ("object" == typeof a) for (var d in a) m(a, d) && o.addTest(d, a[d]);
            else {
                if (a = a.toLowerCase(), o[a] !== c) return o;
                b = "function" == typeof b ? b() : b,
                    "undefined" != typeof p && p && (q.className += " " + (b ? "": "no-") + a),
                    o[a] = b
            }
            return o
        },
            d(""),
            s = k = null,
            function(a, b) {
                function c(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>",
                        d.insertBefore(c.lastChild, d.firstChild)
                }
                function d() {
                    var a = s.elements;
                    return "string" == typeof a ? a.split(" ") : a
                }
                function e(a) {
                    var b = r[a[p]];
                    return b || (b = {},
                        q++, a[p] = q, r[q] = b),
                        b
                }
                function f(a, c, d) {
                    if (c || (c = b), k) return c.createElement(a);
                    d || (d = e(c));
                    var f;
                    return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a),
                            !f.canHaveChildren || n.test(a) || f.tagUrn ? f: d.frag.appendChild(f)
                }
                function g(a, c) {
                    if (a || (a = b), k) return a.createDocumentFragment();
                    c = c || e(a);
                    for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) f.createElement(h[g]);
                    return f
                }
                function h(a, b) {
                    b.cache || (b.cache = {},
                        b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()),
                        a.createElement = function(c) {
                            return s.shivMethods ? f(c, a, b) : b.createElem(c)
                        },
                        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g,
                            function(a) {
                                return b.createElem(a),
                                    b.frag.createElement(a),
                                    'c("' + a + '")'
                            }) + ");return n}")(s, b.frag)
                }
                function i(a) {
                    a || (a = b);
                    var d = e(a);
                    return s.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
                        k || h(a, d),
                        a
                }
                var j,
                    k,
                    l = "3.7.0",
                    m = a.html5 || {},
                    n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    p = "_html5shiv",
                    q = 0,
                    r = {}; !
                    function() {
                        try {
                            var a = b.createElement("a");
                            a.innerHTML = "<xyz></xyz>",
                                j = "hidden" in a,
                                k = 1 == a.childNodes.length ||
                                    function() {
                                        b.createElement("a");
                                        var a = b.createDocumentFragment();
                                        return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                                    } ()
                        } catch(c) {
                            j = !0,
                                k = !0
                        }
                    } ();
                var s = {
                    elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: l,
                    shivCSS: m.shivCSS !== !1,
                    supportsUnknownElements: k,
                    shivMethods: m.shivMethods !== !1,
                    type: "default",
                    shivDocument: i,
                    createElement: f,
                    createDocumentFragment: g
                };
                a.html5 = s,
                    i(b)
            } (this, b),
            o._version = n,
            o._prefixes = v,
            o._domPrefixes = y,
            o._cssomPrefixes = x,
            o.testProp = function(a) {
                return h([a])
            },
            o.testAllProps = j,
            o.testStyles = C,
            q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + A.join(" ") : ""),
            o
    } (this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" == q.call(a)
        }
        function e(a) {
            return "string" == typeof a
        }
        function f() {}
        function g(a) {
            return ! a || "loaded" == a || "complete" == a || "uninitialized" == a
        }
        function h() {
            var a = r.shift();
            s = 1,
                a ? a.t ? o(function() { ("c" == a.t ? m.injectCss: m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
                    },
                    0) : (a(), h()) : s = 0
        }
        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && o(function() {
                            v.removeChild(l)
                        },
                        50);
                    for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload()
                }
            }
            var j = j || m.errorTimeout,
                l = b.createElement(a),
                n = 0,
                q = 0,
                t = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === A[c] && (q = 1, A[c] = []),
                    "object" == a ? l.data = c: (l.src = c, l.type = a),
                l.width = l.height = "0",
                l.onerror = l.onload = l.onreadystatechange = function() {
                    k.call(this, q)
                },
                r.splice(e, 0, t),
                "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null: p), o(k, j)) : A[c].push(l))
        }
        function j(a, b, c, d, f) {
            return s = 0,
                b = b || "j",
                e(a) ? i("c" == b ? x: w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()),
                this
        }
        function k() {
            var a = m;
            return a.loader = {
                load: j,
                i: 0
            },
                a
        }
        var l,
            m,
            n = b.documentElement,
            o = a.setTimeout,
            p = b.getElementsByTagName("script")[0],
            q = {}.toString,
            r = [],
            s = 0,
            t = "MozAppearance" in n.style,
            u = t && !!b.createRange().compareNode,
            v = u ? n: p.parentNode,
            n = a.opera && "[object Opera]" == q.call(a.opera),
            n = !!b.attachEvent && !n,
            w = t ? "object": n ? "script": "img",
            x = n ? "script": w,
            y = Array.isArray ||
                function(a) {
                    return "[object Array]" == q.call(a)
                },
            z = [],
            A = {},
            B = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]),
                        a
                }
            };
        m = function(a) {
            function b(a) {
                var b,
                    c,
                    d,
                    a = a.split("!"),
                    e = z.length,
                    f = a.pop(),
                    g = a.length,
                    f = {
                        url: f,
                        origUrl: f,
                        prefixes: a
                    };
                for (c = 0; g > c; c++) d = a[c].split("="),
                    (b = B[d.shift()]) && (f = b(f, d));
                for (c = 0; e > c; c++) f = z[c](f);
                return f
            }
            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(),
                    i.bypass || (e && (e = d(e) ? e: e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0: A[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c": c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                    k(),
                        e && e(i.origUrl, h, g),
                        j && j(i.origUrl, h, g),
                        A[i.url] = 2
                })))
            }
            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a),
                                n()
                        }),
                            g(a, l, b, 0, j);
                        else if (Object(a) === a) for (i in h = function() {
                            var b,
                                c = 0;
                            for (b in a) a.hasOwnProperty(b) && c++;
                            return c
                        } (), a) a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a),
                                n()
                        }: l[i] = function(a) {
                            return function() {
                                var b = [].slice.call(arguments);
                                a && a.apply(this, b),
                                    n()
                            }
                        } (m[i])), g(a[i], l, b, i, j))
                    } else ! c && n()
                }
                var h,
                    i,
                    j = !!a.test,
                    k = a.load || a.both,
                    l = a.callback || f,
                    m = l,
                    n = a.complete || f;
                c(j ? a.yep: a.nope, !!k),
                    k && c(k)
            }
            var i,
                j,
                l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (y(a)) for (i = 0; i < a.length; i++) j = a[i],
                e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        },
            m.addPrefix = function(a, b) {
                B[a] = b
            },
            m.addFilter = function(a) {
                z.push(a)
            },
            m.errorTimeout = 1e4,
            null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function() {
                b.removeEventListener("DOMContentLoaded", l, 0),
                    b.readyState = "complete"
            },
            0)),
            a.yepnope = k(),
            a.yepnope.executeStack = h,
            a.yepnope.injectJs = function(a, c, d, e, i, j) {
                var k,
                    l,
                    n = b.createElement("script"),
                    e = e || m.errorTimeout;
                n.src = a;
                for (l in d) n.setAttribute(l, d[l]);
                c = j ? h: c || f,
                    n.onreadystatechange = n.onload = function() { ! k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null)
                    },
                    o(function() {
                            k || (k = 1, c(1))
                        },
                        e),
                    i ? n.onload() : p.parentNode.insertBefore(n, p)
            },
            a.yepnope.injectCss = function(a, c, d, e, g, i) {
                var j,
                    e = b.createElement("link"),
                    c = i ? h: c || f;
                e.href = a,
                    e.rel = "stylesheet",
                    e.type = "text/css";
                for (j in d) e.setAttribute(j, d[j]);
                g || (p.parentNode.insertBefore(e, p), o(c, 0))
            }
    } (this, document),
    Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    },
    function(a, b) {
        "use strict";
        var c = function(a) {
            return new c.Instance(a)
        };
        c.SUPPORT = "wheel",
            c.ADD_EVENT = "addEventListener",
            c.REMOVE_EVENT = "removeEventListener",
            c.PREFIX = "",
            c.READY = !1,
            c.Instance = function(a) {
                return c.READY || (c.normalise.browser(), c.READY = !0),
                    this.element = a,
                    this.handlers = [],
                    this
            },
            c.Instance.prototype = {
                wheel: function(a, b) {
                    return c.event.add(this, c.SUPPORT, a, b),
                        "DOMMouseScroll" === c.SUPPORT && c.event.add(this, "MozMousePixelScroll", a, b),
                        this
                },
                unwheel: function(a, b) {
                    return void 0 === a && (a = this.handlers.slice( - 1)[0]) && (a = a.original),
                        c.event.remove(this, c.SUPPORT, a, b),
                        "DOMMouseScroll" === c.SUPPORT && c.event.remove(this, "MozMousePixelScroll", a, b),
                        this
                }
            },
            c.event = {
                add: function(b, d, e, f) {
                    var g = e;
                    e = function(b) {
                        b || (b = a.event);
                        var d = c.normalise.event(b),
                            e = c.normalise.delta(b);
                        return g(d, e[0], e[1], e[2])
                    },
                        b.element[c.ADD_EVENT](c.PREFIX + d, e, f || !1),
                        b.handlers.push({
                            original: g,
                            normalised: e
                        })
                },
                remove: function(a, b, d, e) {
                    for (var f, g = d, h = {},
                             i = 0, j = a.handlers.length; j > i; ++i) h[a.handlers[i].original] = a.handlers[i];
                    f = h[g],
                        d = f.normalised,
                        a.element[c.REMOVE_EVENT](c.PREFIX + b, d, e || !1);
                    for (var k in a.handlers) if (a.handlers[k] == f) {
                        a.handlers.splice(k, 1);
                        break
                    }
                }
            };
        var d,
            e;
        c.normalise = {
            browser: function() {
                "onwheel" in b || b.documentMode >= 9 || (c.SUPPORT = void 0 !== b.onmousewheel ? "mousewheel": "DOMMouseScroll"),
                    a.addEventListener || (c.ADD_EVENT = "attachEvent", c.REMOVE_EVENT = "detachEvent", c.PREFIX = "on")
            },
            event: function(a) {
                var b = "wheel" === c.SUPPORT ? a: {
                    originalEvent: a,
                    target: a.target || a.srcElement,
                    type: "wheel",
                    deltaMode: "MozMousePixelScroll" === a.type ? 0: 1,
                    deltaX: 0,
                    delatZ: 0,
                    preventDefault: function() {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1
                    },
                    stopPropagation: function() {
                        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !1
                    }
                };
                return a.wheelDelta && (b.deltaY = -1 / 40 * a.wheelDelta),
                    a.wheelDeltaX && (b.deltaX = -1 / 40 * a.wheelDeltaX),
                    a.detail && (b.deltaY = a.detail),
                    b
            },
            delta: function(a) {
                var b,
                    c = 0,
                    f = 0,
                    g = 0,
                    h = 0,
                    i = 0;
                return a.deltaY && (g = -1 * a.deltaY, c = g),
                    a.deltaX && (f = a.deltaX, c = -1 * f),
                    a.wheelDelta && (c = a.wheelDelta),
                    a.wheelDeltaY && (g = a.wheelDeltaY),
                    a.wheelDeltaX && (f = -1 * a.wheelDeltaX),
                    a.detail && (c = -1 * a.detail),
                    h = Math.abs(c),
                    (!d || d > h) && (d = h),
                    i = Math.max(Math.abs(g), Math.abs(f)),
                    (!e || e > i) && (e = i),
                    b = c > 0 ? "floor": "ceil",
                    c = Math[b](c / d),
                    f = Math[b](f / e),
                    g = Math[b](g / e),
                    [c, f, g]
            }
        },
            a.Hamster = c,
            "function" == typeof a.define && a.define.amd && a.define("hamster", [],
            function() {
                return c
            })
    } (window, window.document),
    function(a, b, c) {
        "use strict";
        function d(a) {
            return function() {
                var b,
                    c,
                    d = arguments[0],
                    e = "[" + (a ? a + ":": "") + d + "] ",
                    f = arguments[1],
                    g = arguments,
                    h = function(a) {
                        return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined": "string" != typeof a ? JSON.stringify(a) : a
                    };
                for (b = e + f.replace(/\{\d+\}/g,
                    function(a) {
                        var b,
                            c = +a.slice(1, -1);
                        return c + 2 < g.length ? (b = g[c + 2], "function" == typeof b ? b.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof b ? "undefined": "string" != typeof b ? Q(b) : b) : a
                    }), b = b + "\nhttp://errors.angularjs.org/1.2.5/" + (a ? a + "/": "") + d, c = 2; c < arguments.length; c++) b = b + (2 == c ? "?": "&") + "p" + (c - 2) + "=" + encodeURIComponent(h(arguments[c]));
                return new Error(b)
            }
        }
        function e(a) {
            if (null == a || A(a)) return ! 1;
            var b = a.length;
            return 1 === a.nodeType && b ? !0: u(a) || x(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
        }
        function f(a, b, c) {
            var d;
            if (a) if (y(a)) for (d in a)"prototype" != d && "length" != d && "name" != d && a.hasOwnProperty(d) && b.call(c, a[d], d);
            else if (a.forEach && a.forEach !== f) a.forEach(b, c);
            else if (e(a)) for (d = 0; d < a.length; d++) b.call(c, a[d], d);
            else for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d);
            return a
        }
        function g(a) {
            var b = [];
            for (var c in a) a.hasOwnProperty(c) && b.push(c);
            return b.sort()
        }
        function h(a, b, c) {
            for (var d = g(a), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
            return d
        }
        function i(a) {
            return function(b, c) {
                a(c, b)
            }
        }
        function j() {
            for (var a, b = pd.length; b;) {
                if (b--, a = pd[b].charCodeAt(0), 57 == a) return pd[b] = "A",
                    pd.join("");
                if (90 != a) return pd[b] = String.fromCharCode(a + 1),
                    pd.join("");
                pd[b] = "0"
            }
            return pd.unshift("0"),
                pd.join("")
        }
        function k(a, b) {
            b ? a.$$hashKey = b: delete a.$$hashKey
        }
        function l(a) {
            var b = a.$$hashKey;
            return f(arguments,
                function(b) {
                    b !== a && f(b,
                        function(b, c) {
                            a[c] = b
                        })
                }),
                k(a, b),
                a
        }
        function m(a) {
            return parseInt(a, 10)
        }
        function n(a, b) {
            return l(new(l(function() {},
                {
                    prototype: a
                })), b)
        }
        function o() {}
        function p(a) {
            return a
        }
        function q(a) {
            return function() {
                return a
            }
        }
        function r(a) {
            return "undefined" == typeof a
        }
        function s(a) {
            return "undefined" != typeof a
        }
        function t(a) {
            return null != a && "object" == typeof a
        }
        function u(a) {
            return "string" == typeof a
        }
        function v(a) {
            return "number" == typeof a
        }
        function w(a) {
            return "[object Date]" === md.call(a)
        }
        function x(a) {
            return "[object Array]" === md.call(a)
        }
        function y(a) {
            return "function" == typeof a
        }
        function z(a) {
            return "[object RegExp]" === md.call(a)
        }
        function A(a) {
            return a && a.document && a.location && a.alert && a.setInterval
        }
        function B(a) {
            return a && a.$evalAsync && a.$watch
        }
        function C(a) {
            return "[object File]" === md.call(a)
        }
        function D(a) {
            return ! (!a || !(a.nodeName || a.on && a.find))
        }
        function E(a, b, c) {
            var d = [];
            return f(a,
                function(a, e, f) {
                    d.push(b.call(c, a, e, f))
                }),
                d
        }
        function F(a, b) {
            return - 1 != G(a, b)
        }
        function G(a, b) {
            if (a.indexOf) return a.indexOf(b);
            for (var c = 0; c < a.length; c++) if (b === a[c]) return c;
            return - 1
        }
        function H(a, b) {
            var c = G(a, b);
            return c >= 0 && a.splice(c, 1),
                b
        }
        function I(a, b) {
            if (A(a) || B(a)) throw nd("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
            if (b) {
                if (a === b) throw nd("cpi", "Can't copy! Source and destination are identical.");
                if (x(a)) {
                    b.length = 0;
                    for (var c = 0; c < a.length; c++) b.push(I(a[c]))
                } else {
                    var d = b.$$hashKey;
                    f(b,
                        function(a, c) {
                            delete b[c]
                        });
                    for (var e in a) b[e] = I(a[e]);
                    k(b, d)
                }
            } else b = a,
                a && (x(a) ? b = I(a, []) : w(a) ? b = new Date(a.getTime()) : z(a) ? b = new RegExp(a.source) : t(a) && (b = I(a, {})));
            return b
        }
        function J(a, b) {
            b = b || {};
            for (var c in a) a.hasOwnProperty(c) && "$$" !== c.substr(0, 2) && (b[c] = a[c]);
            return b
        }
        function K(a, b) {
            if (a === b) return ! 0;
            if (null === a || null === b) return ! 1;
            if (a !== a && b !== b) return ! 0;
            var d,
                e,
                f,
                g = typeof a,
                h = typeof b;
            if (g == h && "object" == g) {
                if (!x(a)) {
                    if (w(a)) return w(b) && a.getTime() == b.getTime();
                    if (z(a) && z(b)) return a.toString() == b.toString();
                    if (B(a) || B(b) || A(a) || A(b) || x(b)) return ! 1;
                    f = {};
                    for (e in a) if ("$" !== e.charAt(0) && !y(a[e])) {
                        if (!K(a[e], b[e])) return ! 1;
                        f[e] = !0
                    }
                    for (e in b) if (!f.hasOwnProperty(e) && "$" !== e.charAt(0) && b[e] !== c && !y(b[e])) return ! 1;
                    return ! 0
                }
                if (!x(b)) return ! 1;
                if ((d = a.length) == b.length) {
                    for (e = 0; d > e; e++) if (!K(a[e], b[e])) return ! 1;
                    return ! 0
                }
            }
            return ! 1
        }
        function L() {
            return b.securityPolicy && b.securityPolicy.isActive || b.querySelector && !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"))
        }
        function M(a, b, c) {
            return a.concat(kd.call(b, c))
        }
        function N(a, b) {
            return kd.call(a, b || 0)
        }
        function O(a, b) {
            var c = arguments.length > 2 ? N(arguments, 2) : [];
            return ! y(b) || b instanceof RegExp ? b: c.length ?
                function() {
                    return arguments.length ? b.apply(a, c.concat(kd.call(arguments, 0))) : b.apply(a, c)
                }: function() {
                return arguments.length ? b.apply(a, arguments) : b.call(a)
            }
        }
        function P(a, d) {
            var e = d;
            return "string" == typeof a && "$" === a.charAt(0) ? e = c: A(d) ? e = "$WINDOW": d && b === d ? e = "$DOCUMENT": B(d) && (e = "$SCOPE"),
                e
        }
        function Q(a, b) {
            return "undefined" == typeof a ? c: JSON.stringify(a, P, b ? "  ": null)
        }
        function R(a) {
            return u(a) ? JSON.parse(a) : a
        }
        function S(a) {
            if (a && 0 !== a.length) {
                var b = bd("" + a);
                a = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)
            } else a = !1;
            return a
        }
        function T(a) {
            a = gd(a).clone();
            try {
                a.empty()
            } catch(b) {}
            var c = 3,
                d = gd("<div>").append(a).html();
            try {
                return a[0].nodeType === c ? bd(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,
                    function(a, b) {
                        return "<" + bd(b)
                    })
            } catch(b) {
                return bd(d)
            }
        }
        function U(a) {
            try {
                return decodeURIComponent(a)
            } catch(b) {}
        }
        function V(a) {
            var b,
                c,
                d = {};
            return f((a || "").split("&"),
                function(a) {
                    if (a && (b = a.split("="), c = U(b[0]), s(c))) {
                        var e = s(b[1]) ? U(b[1]) : !0;
                        d[c] ? x(d[c]) ? d[c].push(e) : d[c] = [d[c], e] : d[c] = e
                    }
                }),
                d
        }
        function W(a) {
            var b = [];
            return f(a,
                function(a, c) {
                    x(a) ? f(a,
                        function(a) {
                            b.push(Y(c, !0) + (a === !0 ? "": "=" + Y(a, !0)))
                        }) : b.push(Y(c, !0) + (a === !0 ? "": "=" + Y(a, !0)))
                }),
                b.length ? b.join("&") : ""
        }
        function X(a) {
            return Y(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
        }
        function Y(a, b) {
            return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20": "+")
        }
        function Z(a, c) {
            function d(a) {
                a && h.push(a)
            }
            var e,
                g,
                h = [a],
                i = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
                j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
            f(i,
                function(c) {
                    i[c] = !0,
                        d(b.getElementById(c)),
                        c = c.replace(":", "\\:"),
                        a.querySelectorAll && (f(a.querySelectorAll("." + c), d), f(a.querySelectorAll("." + c + "\\:"), d), f(a.querySelectorAll("[" + c + "]"), d))
                }),
                f(h,
                    function(a) {
                        if (!e) {
                            var b = " " + a.className + " ",
                                c = j.exec(b);
                            c ? (e = a, g = (c[2] || "").replace(/\s+/g, ",")) : f(a.attributes,
                                function(b) { ! e && i[b.name] && (e = a, g = b.value)
                                })
                        }
                    }),
                e && c(e, g ? [g] : [])
        }
        function $(c, d) {
            var e = function() {
                    if (c = gd(c), c.injector()) {
                        var a = c[0] === b ? "document": T(c);
                        throw nd("btstrpd", "App Already Bootstrapped with this Element '{0}'", a)
                    }
                    d = d || [],
                        d.unshift(["$provide",
                            function(a) {
                                a.value("$rootElement", c)
                            }]),
                        d.unshift("ng");
                    var e = Eb(d);
                    return e.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate",
                        function(a, b, c, d) {
                            a.$apply(function() {
                                b.data("$injector", d),
                                    c(b)(a)
                            })
                        }]),
                        e
                },
                g = /^NG_DEFER_BOOTSTRAP!/;
            return a && !g.test(a.name) ? e() : (a.name = a.name.replace(g, ""), void(od.resumeBootstrap = function(a) {
                f(a,
                    function(a) {
                        d.push(a)
                    }),
                    e()
            }))
        }
        function _(a, b) {
            return b = b || "_",
                a.replace(rd,
                    function(a, c) {
                        return (c ? b: "") + a.toLowerCase()
                    })
        }
        function ab() {
            hd = a.jQuery,
                hd ? (gd = hd, l(hd.fn, {
                    scope: Bd.scope,
                    isolateScope: Bd.isolateScope,
                    controller: Bd.controller,
                    injector: Bd.injector,
                    inheritedData: Bd.inheritedData
                }), kb("remove", !0, !0, !1), kb("empty", !1, !1, !1), kb("html", !1, !1, !0)) : gd = lb,
                od.element = gd
        }
        function bb(a, b, c) {
            if (!a) throw nd("areq", "Argument '{0}' is {1}", b || "?", c || "required");
            return a
        }
        function cb(a, b, c) {
            return c && x(a) && (a = a[a.length - 1]),
                bb(y(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object": typeof a)),
                a
        }
        function db(a, b) {
            if ("hasOwnProperty" === a) throw nd("badname", "hasOwnProperty is not a valid {0} name", b)
        }
        function eb(a, b, c) {
            if (!b) return a;
            for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++) d = e[h],
                a && (a = (f = a)[d]);
            return ! c && y(a) ? O(f, a) : a
        }
        function fb(a) {
            var b = a[0],
                c = a[a.length - 1];
            if (b === c) return gd(b);
            var d = b,
                e = [d];
            do {
                if (d = d.nextSibling, !d) break;
                e.push(d)
            }
            while (d !== c);
            return gd(e)
        }
        function gb(a) {
            function b(a, b, c) {
                return a[b] || (a[b] = c())
            }
            var c = d("$injector"),
                e = d("ng"),
                f = b(a, "angular", Object);
            return f.$$minErr = f.$$minErr || d,
                b(f, "module",
                    function() {
                        var a = {};
                        return function(d, f, g) {
                            var h = function(a, b) {
                                if ("hasOwnProperty" === a) throw e("badname", "hasOwnProperty is not a valid {0} name", b)
                            };
                            return h(d, "module"),
                                f && a.hasOwnProperty(d) && (a[d] = null),
                                b(a, d,
                                    function() {
                                        function a(a, c, d) {
                                            return function() {
                                                return b[d || "push"]([a, c, arguments]),
                                                    i
                                            }
                                        }
                                        if (!f) throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
                                        var b = [],
                                            e = [],
                                            h = a("$injector", "invoke"),
                                            i = {
                                                _invokeQueue: b,
                                                _runBlocks: e,
                                                requires: f,
                                                name: d,
                                                provider: a("$provide", "provider"),
                                                factory: a("$provide", "factory"),
                                                service: a("$provide", "service"),
                                                value: a("$provide", "value"),
                                                constant: a("$provide", "constant", "unshift"),
                                                animation: a("$animateProvider", "register"),
                                                filter: a("$filterProvider", "register"),
                                                controller: a("$controllerProvider", "register"),
                                                directive: a("$compileProvider", "directive"),
                                                config: h,
                                                run: function(a) {
                                                    return e.push(a),
                                                        this
                                                }
                                            };
                                        return g && h(g),
                                            i
                                    })
                        }
                    })
        }
        function hb(b) {
            l(b, {
                bootstrap: $,
                copy: I,
                extend: l,
                equals: K,
                element: gd,
                forEach: f,
                injector: Eb,
                noop: o,
                bind: O,
                toJson: Q,
                fromJson: R,
                identity: p,
                isUndefined: r,
                isDefined: s,
                isString: u,
                isFunction: y,
                isObject: t,
                isNumber: v,
                isElement: D,
                isArray: x,
                version: sd,
                isDate: w,
                lowercase: bd,
                uppercase: cd,
                callbacks: {
                    counter: 0
                },
                $$minErr: d,
                $$csp: L
            }),
                id = gb(a);
            try {
                id("ngLocale")
            } catch(c) {
                id("ngLocale", []).provider("$locale", Zb)
            }
            id("ng", ["ngLocale"], ["$provide",
                function(a) {
                    a.provider({
                        $$sanitizeUri: vc
                    }),
                        a.provider("$compile", Kb).directive({
                            a: ie,
                            input: se,
                            textarea: se,
                            form: me,
                            script: _e,
                            select: cf,
                            style: ef,
                            option: df,
                            ngBind: Ee,
                            ngBindHtml: Ge,
                            ngBindTemplate: Fe,
                            ngClass: He,
                            ngClassEven: Je,
                            ngClassOdd: Ie,
                            ngCloak: Ke,
                            ngController: Le,
                            ngForm: ne,
                            ngHide: Ve,
                            ngIf: Ne,
                            ngInclude: Oe,
                            ngInit: Qe,
                            ngNonBindable: Re,
                            ngPluralize: Se,
                            ngRepeat: Te,
                            ngShow: Ue,
                            ngStyle: We,
                            ngSwitch: Xe,
                            ngSwitchWhen: Ye,
                            ngSwitchDefault: Ze,
                            ngOptions: bf,
                            ngTransclude: $e,
                            ngModel: ye,
                            ngList: Be,
                            ngChange: ze,
                            required: Ae,
                            ngRequired: Ae,
                            ngValue: De
                        }).directive({
                            ngInclude: Pe
                        }).directive(je).directive(Me),
                        a.provider({
                            $anchorScroll: Fb,
                            $animate: Kd,
                            $browser: Hb,
                            $cacheFactory: Ib,
                            $controller: Nb,
                            $document: Ob,
                            $exceptionHandler: Pb,
                            $filter: Gc,
                            $interpolate: Xb,
                            $interval: Yb,
                            $http: Ub,
                            $httpBackend: Vb,
                            $location: kc,
                            $log: lc,
                            $parse: rc,
                            $rootScope: uc,
                            $q: sc,
                            $sce: Ac,
                            $sceDelegate: zc,
                            $sniffer: Bc,
                            $templateCache: Jb,
                            $timeout: Cc,
                            $window: Fc
                        })
                }])
        }
        function ib() {
            return++vd
        }
        function jb(a) {
            return a.replace(yd,
                function(a, b, c, d) {
                    return d ? c.toUpperCase() : c
                }).replace(zd, "Moz$1")
        }
        function kb(a, b, c, d) {
            function e(a) {
                var e,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m = c && a ? [this.filter(a)] : [this],
                    n = b;
                if (!d || null != a) for (; m.length;) for (e = m.shift(), g = 0, h = e.length; h > g; g++) for (i = gd(e[g]), n ? i.triggerHandler("$destroy") : n = !n, j = 0, k = (l = i.children()).length; k > j; j++) m.push(hd(l[j]));
                return f.apply(this, arguments)
            }
            var f = hd.fn[a];
            f = f.$original || f,
                e.$original = f,
                hd.fn[a] = e
        }
        function lb(a) {
            if (a instanceof lb) return a;
            if (! (this instanceof lb)) {
                if (u(a) && "<" != a.charAt(0)) throw Ad("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
                return new lb(a)
            }
            if (u(a)) {
                var c = b.createElement("div");
                c.innerHTML = "<div>&#160;</div>" + a,
                    c.removeChild(c.firstChild),
                    vb(this, c.childNodes);
                var d = gd(b.createDocumentFragment());
                d.append(this)
            } else vb(this, a)
        }
        function mb(a) {
            return a.cloneNode(!0)
        }
        function nb(a) {
            pb(a);
            for (var b = 0, c = a.childNodes || []; b < c.length; b++) nb(c[b])
        }
        function ob(a, b, c, d) {
            if (s(d)) throw Ad("offargs", "jqLite#off() does not support the `selector` argument");
            var e = qb(a, "events"),
                g = qb(a, "handle");
            g && (r(b) ? f(e,
                function(b, c) {
                    xd(a, c, b),
                        delete e[c]
                }) : f(b.split(" "),
                function(b) {
                    r(c) ? (xd(a, b, e[b]), delete e[b]) : H(e[b] || [], c)
                }))
        }
        function pb(a, b) {
            var d = a[ud],
                e = td[d];
            if (e) {
                if (b) return void delete td[d].data[b];
                e.handle && (e.events.$destroy && e.handle({},
                    "$destroy"), ob(a)),
                    delete td[d],
                    a[ud] = c
            }
        }
        function qb(a, b, c) {
            var d = a[ud],
                e = td[d || -1];
            return s(c) ? (e || (a[ud] = d = ib(), e = td[d] = {}), void(e[b] = c)) : e && e[b]
        }
        function rb(a, b, c) {
            var d = qb(a, "data"),
                e = s(c),
                f = !e && s(b),
                g = f && !t(b);
            if (d || g || qb(a, "data", d = {}), e) d[b] = c;
            else {
                if (!f) return d;
                if (g) return d && d[b];
                l(d, b)
            }
        }
        function sb(a, b) {
            return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1: !1
        }
        function tb(a, b) {
            b && a.setAttribute && f(b.split(" "),
                function(b) {
                    a.setAttribute("class", qd((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + qd(b) + " ", " ")))
                })
        }
        function ub(a, b) {
            if (b && a.setAttribute) {
                var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
                f(b.split(" "),
                    function(a) {
                        a = qd(a),
                            -1 === c.indexOf(" " + a + " ") && (c += a + " ")
                    }),
                    a.setAttribute("class", qd(c))
            }
        }
        function vb(a, b) {
            if (b) {
                b = b.nodeName || !s(b.length) || A(b) ? [b] : b;
                for (var c = 0; c < b.length; c++) a.push(b[c])
            }
        }
        function wb(a, b) {
            return xb(a, "$" + (b || "ngController") + "Controller")
        }
        function xb(a, b, d) {
            a = gd(a),
                9 == a[0].nodeType && (a = a.find("html"));
            for (var e = x(b) ? b: [b]; a.length;) {
                for (var f = 0, g = e.length; g > f; f++) if ((d = a.data(e[f])) !== c) return d;
                a = a.parent()
            }
        }
        function yb(a) {
            for (var b = 0, c = a.childNodes; b < c.length; b++) nb(c[b]);
            for (; a.firstChild;) a.removeChild(a.firstChild)
        }
        function zb(a, b) {
            var c = Cd[b.toLowerCase()];
            return c && Dd[a.nodeName] && c
        }
        function Ab(a, c) {
            var d = function(d, e) {
                if (d.preventDefault || (d.preventDefault = function() {
                    d.returnValue = !1
                }), d.stopPropagation || (d.stopPropagation = function() {
                    d.cancelBubble = !0
                }), d.target || (d.target = d.srcElement || b), r(d.defaultPrevented)) {
                    var g = d.preventDefault;
                    d.preventDefault = function() {
                        d.defaultPrevented = !0,
                            g.call(d)
                    },
                        d.defaultPrevented = !1
                }
                d.isDefaultPrevented = function() {
                    return d.defaultPrevented || d.returnValue === !1
                },
                    f(c[e || d.type],
                        function(b) {
                            b.call(a, d)
                        }),
                        8 >= fd ? (d.preventDefault = null, d.stopPropagation = null, d.isDefaultPrevented = null) : (delete d.preventDefault, delete d.stopPropagation, delete d.isDefaultPrevented)
            };
            return d.elem = a,
                d
        }
        function Bb(a) {
            var b,
                d = typeof a;
            return "object" == d && null !== a ? "function" == typeof(b = a.$$hashKey) ? b = a.$$hashKey() : b === c && (b = a.$$hashKey = j()) : b = a,
                d + ":" + b
        }
        function Cb(a) {
            f(a, this.put, this)
        }
        function Db(a) {
            var b,
                c,
                d,
                e;
            return "function" == typeof a ? (b = a.$inject) || (b = [], a.length && (c = a.toString().replace(Hd, ""), d = c.match(Ed), f(d[1].split(Fd),
                function(a) {
                    a.replace(Gd,
                        function(a, c, d) {
                            b.push(d)
                        })
                })), a.$inject = b) : x(a) ? (e = a.length - 1, cb(a[e], "fn"), b = a.slice(0, e)) : cb(a, "fn", !0),
                b
        }
        function Eb(a) {
            function b(a) {
                return function(b, c) {
                    return t(b) ? void f(b, i(a)) : a(b, c)
                }
            }
            function c(a, b) {
                if (db(a, "service"), (y(b) || x(b)) && (b = v.instantiate(b)), !b.$get) throw Id("pget", "Provider '{0}' must define $get factory method.", a);
                return s[a + n] = b
            }
            function d(a, b) {
                return c(a, {
                    $get: b
                })
            }
            function e(a, b) {
                return d(a, ["$injector",
                    function(a) {
                        return a.instantiate(b)
                    }])
            }
            function g(a, b) {
                return d(a, q(b))
            }
            function h(a, b) {
                db(a, "constant"),
                    s[a] = b,
                    w[a] = b
            }
            function j(a, b) {
                var c = v.get(a + n),
                    d = c.$get;
                c.$get = function() {
                    var a = z.invoke(d, c);
                    return z.invoke(b, null, {
                        $delegate: a
                    })
                }
            }
            function k(a) {
                var b,
                    c,
                    d,
                    e,
                    g = [];
                return f(a,
                    function(a) {
                        if (!r.get(a)) {
                            r.put(a, !0);
                            try {
                                if (u(a)) for (b = id(a), g = g.concat(k(b.requires)).concat(b._runBlocks), c = b._invokeQueue, d = 0, e = c.length; e > d; d++) {
                                    var f = c[d],
                                        h = v.get(f[0]);
                                    h[f[1]].apply(h, f[2])
                                } else y(a) ? g.push(v.invoke(a)) : x(a) ? g.push(v.invoke(a)) : cb(a, "module")
                            } catch(i) {
                                throw x(a) && (a = a[a.length - 1]),
                                    i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack),
                                    Id("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, i.stack || i.message || i)
                            }
                        }
                    }),
                    g
            }
            function l(a, b) {
                function c(c) {
                    if (a.hasOwnProperty(c)) {
                        if (a[c] === m) throw Id("cdep", "Circular dependency found: {0}", p.join(" <- "));
                        return a[c]
                    }
                    try {
                        return p.unshift(c),
                            a[c] = m,
                            a[c] = b(c)
                    } finally {
                        p.shift()
                    }
                }
                function d(a, b, d) {
                    var e,
                        f,
                        g,
                        h = [],
                        i = Db(a);
                    for (f = 0, e = i.length; e > f; f++) {
                        if (g = i[f], "string" != typeof g) throw Id("itkn", "Incorrect injection token! Expected service name as string, got {0}", g);
                        h.push(d && d.hasOwnProperty(g) ? d[g] : c(g))
                    }
                    return a.$inject || (a = a[e]),
                        a.apply(b, h)
                }
                function e(a, b) {
                    var c,
                        e,
                        f = function() {};
                    return f.prototype = (x(a) ? a[a.length - 1] : a).prototype,
                        c = new f,
                        e = d(a, c, b),
                            t(e) || y(e) ? e: c
                }
                return {
                    invoke: d,
                    instantiate: e,
                    get: c,
                    annotate: Db,
                    has: function(b) {
                        return s.hasOwnProperty(b + n) || a.hasOwnProperty(b)
                    }
                }
            }
            var m = {},
                n = "Provider",
                p = [],
                r = new Cb,
                s = {
                    $provide: {
                        provider: b(c),
                        factory: b(d),
                        service: b(e),
                        value: b(g),
                        constant: b(h),
                        decorator: j
                    }
                },
                v = s.$injector = l(s,
                    function() {
                        throw Id("unpr", "Unknown provider: {0}", p.join(" <- "))
                    }),
                w = {},
                z = w.$injector = l(w,
                    function(a) {
                        var b = v.get(a + n);
                        return z.invoke(b.$get, b)
                    });
            return f(k(a),
                function(a) {
                    z.invoke(a || o)
                }),
                z
        }
        function Fb() {
            var a = !0;
            this.disableAutoScrolling = function() {
                a = !1
            },
                this.$get = ["$window", "$location", "$rootScope",
                    function(b, c, d) {
                        function e(a) {
                            var b = null;
                            return f(a,
                                function(a) {
                                    b || "a" !== bd(a.nodeName) || (b = a)
                                }),
                                b
                        }
                        function g() {
                            var a,
                                d = c.hash();
                            d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = e(h.getElementsByName(d))) ? a.scrollIntoView() : "top" === d && b.scrollTo(0, 0) : b.scrollTo(0, 0)
                        }
                        var h = b.document;
                        return a && d.$watch(function() {
                                return c.hash()
                            },
                            function() {
                                d.$evalAsync(g)
                            }),
                            g
                    }]
        }
        function Gb(a, b, d, e) {
            function g(a) {
                try {
                    a.apply(null, N(arguments, 1))
                } finally {
                    if (s--, 0 === s) for (; t.length;) try {
                        t.pop()()
                    } catch(b) {
                        d.error(b)
                    }
                }
            }
            function h(a, b) { !
                function c() {
                    f(w,
                        function(a) {
                            a()
                        }),
                        v = b(c, a)
                } ()
            }
            function i() {
                z = null,
                    x != j.url() && (x = j.url(), f(A,
                    function(a) {
                        a(j.url())
                    }))
            }
            var j = this,
                k = b[0],
                l = a.location,
                m = a.history,
                n = a.setTimeout,
                p = a.clearTimeout,
                q = {};
            j.isMock = !1;
            var s = 0,
                t = [];
            j.$$completeOutstandingRequest = g,
                j.$$incOutstandingRequestCount = function() {
                    s++
                },
                j.notifyWhenNoOutstandingRequests = function(a) {
                    f(w,
                        function(a) {
                            a()
                        }),
                            0 === s ? a() : t.push(a)
                };
            var v,
                w = [];
            j.addPollFn = function(a) {
                return r(v) && h(100, n),
                    w.push(a),
                    a
            };
            var x = l.href,
                y = b.find("base"),
                z = null;
            j.url = function(b, c) {
                if (l !== a.location && (l = a.location), b) {
                    if (x == b) return;
                    return x = b,
                        e.history ? c ? m.replaceState(null, "", b) : (m.pushState(null, "", b), y.attr("href", y.attr("href"))) : (z = b, c ? l.replace(b) : l.href = b),
                        j
                }
                return z || l.href.replace(/%27/g, "'")
            };
            var A = [],
                B = !1;
            j.onUrlChange = function(b) {
                return B || (e.history && gd(a).on("popstate", i), e.hashchange ? gd(a).on("hashchange", i) : j.addPollFn(i), B = !0),
                    A.push(b),
                    b
            },
                j.baseHref = function() {
                    var a = y.attr("href");
                    return a ? a.replace(/^https?\:\/\/[^\/]*/, "") : ""
                };
            var C = {},
                D = "",
                E = j.baseHref();
            j.cookies = function(a, b) {
                var e,
                    f,
                    g,
                    h,
                    i;
                if (!a) {
                    if (k.cookie !== D) for (D = k.cookie, f = D.split("; "), C = {},
                                                 h = 0; h < f.length; h++) g = f[h],
                        i = g.indexOf("="),
                        i > 0 && (a = unescape(g.substring(0, i)), C[a] === c && (C[a] = unescape(g.substring(i + 1))));
                    return C
                }
                b === c ? k.cookie = escape(a) + "=;path=" + E + ";expires=Thu, 01 Jan 1970 00:00:00 GMT": u(b) && (e = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + E).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
            },
                j.defer = function(a, b) {
                    var c;
                    return s++,
                        c = n(function() {
                                delete q[c],
                                    g(a)
                            },
                                b || 0),
                        q[c] = !0,
                        c
                },
                j.defer.cancel = function(a) {
                    return q[a] ? (delete q[a], p(a), g(o), !0) : !1
                }
        }
        function Hb() {
            this.$get = ["$window", "$log", "$sniffer", "$document",
                function(a, b, c, d) {
                    return new Gb(a, d, b, c)
                }]
        }
        function Ib() {
            this.$get = function() {
                function a(a, c) {
                    function e(a) {
                        a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
                    }
                    function f(a, b) {
                        a != b && (a && (a.p = b), b && (b.n = a))
                    }
                    if (a in b) throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
                    var g = 0,
                        h = l({},
                            c, {
                                id: a
                            }),
                        i = {},
                        j = c && c.capacity || Number.MAX_VALUE,
                        k = {},
                        m = null,
                        n = null;
                    return b[a] = {
                        put: function(a, b) {
                            var c = k[a] || (k[a] = {
                                key: a
                            });
                            return e(c),
                                r(b) ? void 0: (a in i || g++, i[a] = b, g > j && this.remove(n.key), b)
                        },
                        get: function(a) {
                            var b = k[a];
                            if (b) return e(b),
                                i[a]
                        },
                        remove: function(a) {
                            var b = k[a];
                            b && (b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a], delete i[a], g--)
                        },
                        removeAll: function() {
                            i = {},
                                g = 0,
                                k = {},
                                m = n = null
                        },
                        destroy: function() {
                            i = null,
                                h = null,
                                k = null,
                                delete b[a]
                        },
                        info: function() {
                            return l({},
                                h, {
                                    size: g
                                })
                        }
                    }
                }
                var b = {};
                return a.info = function() {
                    var a = {};
                    return f(b,
                        function(b, c) {
                            a[c] = b.info()
                        }),
                        a
                },
                    a.get = function(a) {
                        return b[a]
                    },
                    a
            }
        }
        function Jb() {
            this.$get = ["$cacheFactory",
                function(a) {
                    return a("templates")
                }]
        }
        function Kb(a, d) {
            var e = {},
                g = "Directive",
                h = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
                j = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
                k = /^(on[a-z]+|formaction)$/;
            this.directive = function m(b, c) {
                return db(b, "directive"),
                    u(b) ? (bb(c, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + g, ["$injector", "$exceptionHandler",
                        function(a, c) {
                            var d = [];
                            return f(e[b],
                                function(e, f) {
                                    try {
                                        var g = a.invoke(e);
                                        y(g) ? g = {
                                            compile: q(g)
                                        }: !g.compile && g.link && (g.compile = q(g.link)),
                                            g.priority = g.priority || 0,
                                            g.index = f,
                                            g.name = g.name || b,
                                            g.require = g.require || g.controller && g.name,
                                            g.restrict = g.restrict || "A",
                                            d.push(g)
                                    } catch(h) {
                                        c(h)
                                    }
                                }),
                                d
                        }])), e[b].push(c)) : f(b, i(m)),
                    this
            },
                this.aHrefSanitizationWhitelist = function(a) {
                    return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
                },
                this.imgSrcSanitizationWhitelist = function(a) {
                    return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
                },
                this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri",
                    function(a, d, i, m, o, r, s, v, w, z, A, B) {
                        function C(a, b, c, d, e) {
                            a instanceof gd || (a = gd(a)),
                                f(a,
                                    function(b, c) {
                                        3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = b = gd(b).wrap("<span></span>").parent()[0])
                                    });
                            var g = E(a, b, a, c, d, e);
                            return function(b, c, d) {
                                bb(b, "scope");
                                var e = c ? Bd.clone.call(a) : a;
                                f(d,
                                    function(a, b) {
                                        e.data("$" + b + "Controller", a)
                                    });
                                for (var h = 0, i = e.length; i > h; h++) {
                                    var j = e[h]; (1 == j.nodeType || 9 == j.nodeType) && e.eq(h).data("$scope", b)
                                }
                                return D(e, "ng-scope"),
                                    c && c(e, b),
                                    g && g(b, e, e),
                                    e
                            }
                        }
                        function D(a, b) {
                            try {
                                a.addClass(b)
                            } catch(c) {}
                        }
                        function E(a, b, d, e, f, g) {
                            function h(a, d, e, f) {
                                var g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    l,
                                    m,
                                    o,
                                    p,
                                    q = [];
                                for (m = 0, o = d.length; o > m; m++) q.push(d[m]);
                                for (m = 0, p = 0, o = n.length; o > m; p++) i = q[p],
                                    g = n[m++],
                                    h = n[m++],
                                    j = gd(i),
                                    g ? (g.scope ? (k = a.$new(), j.data("$scope", k), D(j, "ng-scope")) : k = a, l = g.transclude, l || !f && b ? g(h, k, i, e, F(a, l || b)) : g(h, k, i, e, f)) : h && h(a, i.childNodes, c, f)
                            }
                            for (var i, j, k, l, m, n = [], o = 0; o < a.length; o++) l = new $,
                                k = G(a[o], [], l, 0 === o ? e: c, f),
                                i = k.length ? L(k, a[o], l, b, d, null, [], [], g) : null,
                                j = i && i.terminal || !a[o].childNodes || !a[o].childNodes.length ? null: E(a[o].childNodes, i ? i.transclude: b),
                                n.push(i),
                                n.push(j),
                                m = m || i || j,
                                g = null;
                            return m ? h: null
                        }
                        function F(a, b) {
                            return function(c, d, e) {
                                var f = !1;
                                c || (c = a.$new(), c.$$transcluded = !0, f = !0);
                                var g = b(c, d, e);
                                return f && g.on("$destroy", O(c, c.$destroy)),
                                    g
                            }
                        }
                        function G(a, b, c, d, e) {
                            var f,
                                g,
                                i = a.nodeType,
                                k = c.$attr;
                            switch (i) {
                                case 1:
                                    P(b, Lb(jd(a).toLowerCase()), "E", d, e);
                                    for (var l, m, n, o, p, q = a.attributes, r = 0, s = q && q.length; s > r; r++) {
                                        var t = !1,
                                            v = !1;
                                        if (l = q[r], !fd || fd >= 8 || l.specified) {
                                            m = l.name,
                                                o = Lb(m),
                                                eb.test(o) && (m = _(o.substr(6), "-"));
                                            var w = o.replace(/(Start|End)$/, "");
                                            o === w + "Start" && (t = m, v = m.substr(0, m.length - 5) + "end", m = m.substr(0, m.length - 6)),
                                                n = Lb(m.toLowerCase()),
                                                k[n] = m,
                                                c[n] = p = qd(fd && "href" == m ? decodeURIComponent(a.getAttribute(m, 2)) : l.value),
                                                zb(a, n) && (c[n] = !0),
                                                X(a, b, p, n),
                                                P(b, n, "A", d, e, t, v)
                                        }
                                    }
                                    if (g = a.className, u(g) && "" !== g) for (; f = j.exec(g);) n = Lb(f[2]),
                                        P(b, n, "C", d, e) && (c[n] = qd(f[3])),
                                        g = g.substr(f.index + f[0].length);
                                    break;
                                case 3:
                                    V(b, a.nodeValue);
                                    break;
                                case 8:
                                    try {
                                        f = h.exec(a.nodeValue),
                                            f && (n = Lb(f[1]), P(b, n, "M", d, e) && (c[n] = qd(f[2])))
                                    } catch(x) {}
                            }
                            return b.sort(S),
                                b
                        }
                        function H(a, b, c) {
                            var d = [],
                                e = 0;
                            if (b && a.hasAttribute && a.hasAttribute(b)) {
                                do {
                                    if (!a) throw Ld("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
                                    1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--),
                                        d.push(a),
                                        a = a.nextSibling
                                }
                                while (e > 0)
                            } else d.push(a);
                            return gd(d)
                        }
                        function I(a, b, c) {
                            return function(d, e, f, g, h) {
                                return e = H(e[0], b, c),
                                    a(d, e, f, g, h)
                            }
                        }
                        function L(a, e, g, h, j, k, l, m, n) {
                            function o(a, b, c, d) {
                                a && (c && (a = I(a, c, d)), a.require = w.require, (O === w || w.$$isolateScope) && (a = Z(a, {
                                    isolateScope: !0
                                })), l.push(a)),
                                    b && (c && (b = I(b, c, d)), b.require = w.require, (O === w || w.$$isolateScope) && (b = Z(b, {
                                    isolateScope: !0
                                })), m.push(b))
                            }
                            function p(a, b, c) {
                                var d,
                                    e = "data",
                                    g = !1;
                                if (u(a)) {
                                    for (;
                                        "^" == (d = a.charAt(0)) || "?" == d;) a = a.substr(1),
                                        "^" == d && (e = "inheritedData"),
                                        g = g || "?" == d;
                                    if (d = null, c && "data" === e && (d = c[a]), d = d || b[e]("$" + a + "Controller"), !d && !g) throw Ld("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, z);
                                    return d
                                }
                                return x(a) && (d = [], f(a,
                                    function(a) {
                                        d.push(p(a, b, c))
                                    })),
                                    d
                            }
                            function q(a, b, h, j, k) {
                                function n(a, b) {
                                    var d;
                                    return arguments.length < 2 && (b = a, a = c),
                                        W && (d = z),
                                        k(a, b, d)
                                }
                                var o,
                                    q,
                                    t,
                                    u,
                                    v,
                                    w,
                                    x,
                                    y,
                                    z = {};
                                if (o = e === h ? g: J(g, new $(gd(h), g.$attr)), q = o.$$element, O) {
                                    var A = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
                                        B = gd(h);
                                    x = b.$new(!0),
                                            P && P === O.$$originalDirective ? B.data("$isolateScope", x) : B.data("$isolateScopeNoTemplate", x),
                                        D(B, "ng-isolate-scope"),
                                        f(O.scope,
                                            function(a, c) {
                                                var e,
                                                    f,
                                                    g,
                                                    h,
                                                    i = a.match(A) || [],
                                                    j = i[3] || c,
                                                    k = "?" == i[2],
                                                    l = i[1];
                                                switch (x.$$isolateBindings[c] = l + j, l) {
                                                    case "@":
                                                        o.$observe(j,
                                                            function(a) {
                                                                x[c] = a
                                                            }),
                                                            o.$$observers[j].$$scope = b,
                                                            o[j] && (x[c] = d(o[j])(b));
                                                        break;
                                                    case "=":
                                                        if (k && !o[j]) return;
                                                        f = r(o[j]),
                                                            h = f.literal ? K: function(a, b) {
                                                                return a === b
                                                            },
                                                            g = f.assign ||
                                                                function() {
                                                                    throw e = x[c] = f(b),
                                                                        Ld("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", o[j], O.name)
                                                                },
                                                            e = x[c] = f(b),
                                                            x.$watch(function() {
                                                                    var a = f(b);
                                                                    return h(a, x[c]) || (h(a, e) ? g(b, a = x[c]) : x[c] = a),
                                                                        e = a
                                                                },
                                                                null, f.literal);
                                                        break;
                                                    case "&":
                                                        f = r(o[j]),
                                                            x[c] = function(a) {
                                                                return f(b, a)
                                                            };
                                                        break;
                                                    default:
                                                        throw Ld("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", O.name, c, a)
                                                }
                                            })
                                }
                                for (y = k && n, L && f(L,
                                    function(a) {
                                        var c,
                                            d = {
                                                $scope: a === O || a.$$isolateScope ? x: b,
                                                $element: q,
                                                $attrs: o,
                                                $transclude: y
                                            };
                                        w = a.controller,
                                            "@" == w && (w = o[a.name]),
                                            c = s(w, d),
                                            z[a.name] = c,
                                            W || q.data("$" + a.name + "Controller", c),
                                            a.controllerAs && (d.$scope[a.controllerAs] = c)
                                    }), t = 0, u = l.length; u > t; t++) try {
                                    v = l[t],
                                        v(v.isolateScope ? x: b, q, o, v.require && p(v.require, q, z), y)
                                } catch(C) {
                                    i(C, T(q))
                                }
                                var E = b;
                                for (O && (O.template || null === O.templateUrl) && (E = x), a && a(E, h.childNodes, c, k), t = m.length - 1; t >= 0; t--) try {
                                    v = m[t],
                                        v(v.isolateScope ? x: b, q, o, v.require && p(v.require, q, z), y)
                                } catch(C) {
                                    i(C, T(q))
                                }
                            }
                            n = n || {};
                            for (var v, w, z, A, B, E, F = -Number.MAX_VALUE, L = n.controllerDirectives, O = n.newIsolateScopeDirective, P = n.templateDirective, S = n.nonTlbTranscludeDirective, V = !1, W = !1, X = g.$$element = gd(e), _ = k, ab = h, bb = 0, cb = a.length; cb > bb; bb++) {
                                w = a[bb];
                                var eb = w.$$start,
                                    fb = w.$$end;
                                if (eb && (X = H(e, eb, fb)), A = c, F > w.priority) break;
                                if ((E = w.scope) && (v = v || w, w.templateUrl || (U("new/isolated scope", O, w, X), t(E) && (O = w))), z = w.name, !w.templateUrl && w.controller && (E = w.controller, L = L || {},
                                    U("'" + z + "' controller", L[z], w, X), L[z] = w), (E = w.transclude) && (V = !0, w.$$tlb || (U("transclusion", S, w, X), S = w), "element" == E ? (W = !0, F = w.priority, A = H(e, eb, fb), X = g.$$element = gd(b.createComment(" " + z + ": " + g[z] + " ")), e = X[0], Y(j, gd(N(A)), e), ab = C(A, h, F, _ && _.name, {
                                    nonTlbTranscludeDirective: S
                                })) : (A = gd(mb(e)).contents(), X.empty(), ab = C(A, h))), w.template) if (U("template", P, w, X), P = w, E = y(w.template) ? w.template(X, g) : w.template, E = db(E), w.replace) {
                                    if (_ = w, A = gd("<div>" + qd(E) + "</div>").contents(), e = A[0], 1 != A.length || 1 !== e.nodeType) throw Ld("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", z, "");
                                    Y(j, X, e);
                                    var gb = {
                                            $attr: {}
                                        },
                                        hb = G(e, [], gb),
                                        ib = a.splice(bb + 1, a.length - (bb + 1));
                                    O && M(hb),
                                        a = a.concat(hb).concat(ib),
                                        Q(g, gb),
                                        cb = a.length
                                } else X.html(E);
                                if (w.templateUrl) U("template", P, w, X),
                                    P = w,
                                    w.replace && (_ = w),
                                    q = R(a.splice(bb, a.length - bb), X, g, j, ab, l, m, {
                                        controllerDirectives: L,
                                        newIsolateScopeDirective: O,
                                        templateDirective: P,
                                        nonTlbTranscludeDirective: S
                                    }),
                                    cb = a.length;
                                else if (w.compile) try {
                                    B = w.compile(X, g, ab),
                                        y(B) ? o(null, B, eb, fb) : B && o(B.pre, B.post, eb, fb)
                                } catch(jb) {
                                    i(jb, T(X))
                                }
                                w.terminal && (q.terminal = !0, F = Math.max(F, w.priority))
                            }
                            return q.scope = v && v.scope === !0,
                                q.transclude = V && ab,
                                q
                        }
                        function M(a) {
                            for (var b = 0, c = a.length; c > b; b++) a[b] = n(a[b], {
                                $$isolateScope: !0
                            })
                        }
                        function P(b, d, f, h, j, k, l) {
                            if (d === j) return null;
                            var m = null;
                            if (e.hasOwnProperty(d)) for (var o, p = a.get(d + g), q = 0, r = p.length; r > q; q++) try {
                                o = p[q],
                                    (h === c || h > o.priority) && -1 != o.restrict.indexOf(f) && (k && (o = n(o, {
                                    $$start: k,
                                    $$end: l
                                })), b.push(o), m = o)
                            } catch(s) {
                                i(s)
                            }
                            return m
                        }
                        function Q(a, b) {
                            var c = b.$attr,
                                d = a.$attr,
                                e = a.$$element;
                            f(a,
                                function(d, e) {
                                    "$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";": " ") + b[e]), a.$set(e, d, !0, c[e]))
                                }),
                                f(b,
                                    function(b, f) {
                                        "class" == f ? (D(e, b), a["class"] = (a["class"] ? a["class"] + " ": "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";": "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                                    })
                        }
                        function R(a, b, c, d, e, g, h, i) {
                            var j,
                                k,
                                n = [],
                                p = b[0],
                                q = a.shift(),
                                r = l({},
                                    q, {
                                        templateUrl: null,
                                        transclude: null,
                                        replace: null,
                                        $$originalDirective: q
                                    }),
                                s = y(q.templateUrl) ? q.templateUrl(b, c) : q.templateUrl;
                            return b.empty(),
                                m.get(z.getTrustedResourceUrl(s), {
                                    cache: o
                                }).success(function(l) {
                                    var m,
                                        o,
                                        u,
                                        v;
                                    if (l = db(l), q.replace) {
                                        if (u = gd("<div>" + qd(l) + "</div>").contents(), m = u[0], 1 != u.length || 1 !== m.nodeType) throw Ld("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", q.name, s);
                                        o = {
                                            $attr: {}
                                        },
                                            Y(d, b, m);
                                        var w = G(m, [], o);
                                        t(q.scope) && M(w),
                                            a = w.concat(a),
                                            Q(c, o)
                                    } else m = p,
                                        b.html(l);
                                    for (a.unshift(r), j = L(a, m, c, e, b, q, g, h, i), f(d,
                                        function(a, c) {
                                            a == m && (d[c] = b[0])
                                        }), k = E(b[0].childNodes, e); n.length;) {
                                        var x = n.shift(),
                                            y = n.shift(),
                                            z = n.shift(),
                                            A = n.shift(),
                                            B = b[0];
                                        y !== p && (B = mb(m), Y(z, gd(y), B)),
                                            v = j.transclude ? F(x, j.transclude) : A,
                                            j(k, x, B, d, v)
                                    }
                                    n = null
                                }).error(function(a, b, c, d) {
                                    throw Ld("tpload", "Failed to load template: {0}", d.url)
                                }),
                                function(a, b, c, d, e) {
                                    n ? (n.push(b), n.push(c), n.push(d), n.push(e)) : j(k, b, c, d, e)
                                }
                        }
                        function S(a, b) {
                            var c = b.priority - a.priority;
                            return 0 !== c ? c: a.name !== b.name ? a.name < b.name ? -1: 1: a.index - b.index
                        }
                        function U(a, b, c, d) {
                            if (b) throw Ld("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", b.name, c.name, a, T(d))
                        }
                        function V(a, b) {
                            var c = d(b, !0);
                            c && a.push({
                                priority: 0,
                                compile: q(function(a, b) {
                                    var d = b.parent(),
                                        e = d.data("$binding") || [];
                                    e.push(c),
                                        D(d.data("$binding", e), "ng-binding"),
                                        a.$watch(c,
                                            function(a) {
                                                b[0].nodeValue = a
                                            })
                                })
                            })
                        }
                        function W(a, b) {
                            if ("srcdoc" == b) return z.HTML;
                            var c = jd(a);
                            return "xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b) ? z.RESOURCE_URL: void 0
                        }
                        function X(a, b, c, e) {
                            var f = d(c, !0);
                            if (f) {
                                if ("multiple" === e && "SELECT" === jd(a)) throw Ld("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", T(a));
                                b.push({
                                    priority: 100,
                                    compile: function() {
                                        return {
                                            pre: function(b, c, g) {
                                                var h = g.$$observers || (g.$$observers = {});
                                                if (k.test(e)) throw Ld("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                                f = d(g[e], !0, W(a, e)),
                                                    f && (g[e] = f(b), (h[e] || (h[e] = [])).$$inter = !0, (g.$$observers && g.$$observers[e].$$scope || b).$watch(f,
                                                    function(a, b) {
                                                        "class" === e && a != b ? g.$updateClass(a, b) : g.$set(e, a)
                                                    }))
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        function Y(a, c, d) {
                            var e,
                                f,
                                g = c[0],
                                h = c.length,
                                i = g.parentNode;
                            if (a) for (e = 0, f = a.length; f > e; e++) if (a[e] == g) {
                                a[e++] = d;
                                for (var j = e, k = j + h - 1, l = a.length; l > j; j++, k++) l > k ? a[j] = a[k] : delete a[j];
                                a.length -= h - 1;
                                break
                            }
                            i && i.replaceChild(d, g);
                            var m = b.createDocumentFragment();
                            m.appendChild(g),
                                d[gd.expando] = g[gd.expando];
                            for (var n = 1, o = c.length; o > n; n++) {
                                var p = c[n];
                                gd(p).remove(),
                                    m.appendChild(p),
                                    delete c[n]
                            }
                            c[0] = d,
                                c.length = 1
                        }
                        function Z(a, b) {
                            return l(function() {
                                    return a.apply(null, arguments)
                                },
                                a, b)
                        }
                        var $ = function(a, b) {
                            this.$$element = a,
                                this.$attr = b || {}
                        };
                        $.prototype = {
                            $normalize: Lb,
                            $addClass: function(a) {
                                a && a.length > 0 && A.addClass(this.$$element, a)
                            },
                            $removeClass: function(a) {
                                a && a.length > 0 && A.removeClass(this.$$element, a)
                            },
                            $updateClass: function(a, b) {
                                this.$removeClass(Mb(b, a)),
                                    this.$addClass(Mb(a, b))
                            },
                            $set: function(a, b, d, e) {
                                var g,
                                    h = zb(this.$$element[0], a);
                                h && (this.$$element.prop(a, b), e = h),
                                    this[a] = b,
                                    e ? this.$attr[a] = e: (e = this.$attr[a], e || (this.$attr[a] = e = _(a, "-"))),
                                    g = jd(this.$$element),
                                    ("A" === g && "href" === a || "IMG" === g && "src" === a) && (this[a] = b = B(b, "src" === a)),
                                    d !== !1 && (null === b || b === c ? this.$$element.removeAttr(e) : this.$$element.attr(e, b));
                                var j = this.$$observers;
                                j && f(j[a],
                                    function(a) {
                                        try {
                                            a(b)
                                        } catch(c) {
                                            i(c)
                                        }
                                    })
                            },
                            $observe: function(a, b) {
                                var c = this,
                                    d = c.$$observers || (c.$$observers = {}),
                                    e = d[a] || (d[a] = []);
                                return e.push(b),
                                    v.$evalAsync(function() {
                                        e.$$inter || b(c[a])
                                    }),
                                    b
                            }
                        };
                        var ab = d.startSymbol(),
                            cb = d.endSymbol(),
                            db = "{{" == ab || "}}" == cb ? p: function(a) {
                                return a.replace(/\{\{/g, ab).replace(/}}/g, cb)
                            },
                            eb = /^ngAttr[A-Z]/;
                        return C
                    }]
        }
        function Lb(a) {
            return jb(a.replace(Md, ""))
        }
        function Mb(a, b) {
            var c = "",
                d = a.split(/\s+/),
                e = b.split(/\s+/);
            a: for (var f = 0; f < d.length; f++) {
                for (var g = d[f], h = 0; h < e.length; h++) if (g == e[h]) continue a;
                c += (c.length > 0 ? " ": "") + g
            }
            return c
        }
        function Nb() {
            var a = {},
                b = /^(\S+)(\s+as\s+(\w+))?$/;
            this.register = function(b, c) {
                db(b, "controller"),
                    t(b) ? l(a, b) : a[b] = c
            },
                this.$get = ["$injector", "$window",
                    function(c, e) {
                        return function(f, g) {
                            var h,
                                i,
                                j,
                                k;
                            if (u(f) && (i = f.match(b), j = i[1], k = i[3], f = a.hasOwnProperty(j) ? a[j] : eb(g.$scope, j, !0) || eb(e, j, !0), cb(f, j, !0)), h = c.instantiate(f, g), k) {
                                if (!g || "object" != typeof g.$scope) throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", j || f.name, k);
                                g.$scope[k] = h
                            }
                            return h
                        }
                    }]
        }
        function Ob() {
            this.$get = ["$window",
                function(a) {
                    return gd(a.document)
                }]
        }
        function Pb() {
            this.$get = ["$log",
                function(a) {
                    return function() {
                        a.error.apply(a, arguments)
                    }
                }]
        }
        function Qb(a) {
            var b,
                c,
                d,
                e = {};
            return a ? (f(a.split("\n"),
                function(a) {
                    d = a.indexOf(":"),
                        b = bd(qd(a.substr(0, d))),
                        c = qd(a.substr(d + 1)),
                        b && (e[b] ? e[b] += ", " + c: e[b] = c)
                }), e) : e
        }
        function Rb(a) {
            var b = t(a) ? a: c;
            return function(c) {
                return b || (b = Qb(a)),
                    c ? b[bd(c)] || null: b
            }
        }
        function Sb(a, b, c) {
            return y(c) ? c(a, b) : (f(c,
                function(c) {
                    a = c(a, b)
                }), a)
        }
        function Tb(a) {
            return a >= 200 && 300 > a
        }
        function Ub() {
            var a = /^\s*(\[|\{[^\{])/,
                b = /[\}\]]\s*$/,
                d = /^\)\]\}',?\n/,
                e = {
                    "Content-Type": "application/json;charset=utf-8"
                },
                g = this.defaults = {
                    transformResponse: [function(c) {
                        return u(c) && (c = c.replace(d, ""), a.test(c) && b.test(c) && (c = R(c))),
                            c
                    }],
                    transformRequest: [function(a) {
                        return t(a) && !C(a) ? Q(a) : a
                    }],
                    headers: {
                        common: {
                            Accept: "application/json, text/plain, */*"
                        },
                        post: e,
                        put: e,
                        patch: e
                    },
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN"
                },
                i = this.interceptors = [],
                j = this.responseInterceptors = [];
            this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector",
                function(a, b, d, e, k, m) {
                    function n(a) {
                        function d(a) {
                            var b = l({},
                                a, {
                                    data: Sb(a.data, a.headers, h.transformResponse)
                                });
                            return Tb(a.status) ? b: k.reject(b)
                        }
                        function e(a) {
                            function b(a) {
                                var b;
                                f(a,
                                    function(c, d) {
                                        y(c) && (b = c(), null != b ? a[d] = b: delete a[d])
                                    })
                            }
                            var c,
                                d,
                                e,
                                h = g.headers,
                                i = l({},
                                    a.headers);
                            h = l({},
                                h.common, h[bd(a.method)]),
                                b(h),
                                b(i);
                            a: for (c in h) {
                                d = bd(c);
                                for (e in i) if (bd(e) === d) continue a;
                                i[c] = h[c]
                            }
                            return i
                        }
                        var h = {
                                transformRequest: g.transformRequest,
                                transformResponse: g.transformResponse
                            },
                            i = e(a);
                        l(h, a),
                            h.headers = i,
                            h.method = cd(h.method);
                        var j = Ec(h.url) ? b.cookies()[h.xsrfCookieName || g.xsrfCookieName] : c;
                        j && (i[h.xsrfHeaderName || g.xsrfHeaderName] = j);
                        var m = function(a) {
                                i = a.headers;
                                var b = Sb(a.data, Rb(i), a.transformRequest);
                                return r(a.data) && f(i,
                                    function(a, b) {
                                        "content-type" === bd(b) && delete i[b]
                                    }),
                                    r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials),
                                    q(a, b, i).then(d, d)
                            },
                            n = [m, c],
                            o = k.when(h);
                        for (f(z,
                            function(a) { (a.request || a.requestError) && n.unshift(a.request, a.requestError),
                                (a.response || a.responseError) && n.push(a.response, a.responseError)
                            }); n.length;) {
                            var p = n.shift(),
                                s = n.shift();
                            o = o.then(p, s)
                        }
                        return o.success = function(a) {
                            return o.then(function(b) {
                                a(b.data, b.status, b.headers, h)
                            }),
                                o
                        },
                            o.error = function(a) {
                                return o.then(null,
                                    function(b) {
                                        a(b.data, b.status, b.headers, h)
                                    }),
                                    o
                            },
                            o
                    }
                    function o() {
                        f(arguments,
                            function(a) {
                                n[a] = function(b, c) {
                                    return n(l(c || {},
                                        {
                                            method: a,
                                            url: b
                                        }))
                                }
                            })
                    }
                    function p() {
                        f(arguments,
                            function(a) {
                                n[a] = function(b, c, d) {
                                    return n(l(d || {},
                                        {
                                            method: a,
                                            url: b,
                                            data: c
                                        }))
                                }
                            })
                    }
                    function q(b, c, d) {
                        function f(a, b, c) {
                            j && (Tb(a) ? j.put(p, [a, b, Qb(c)]) : j.remove(p)),
                                h(b, a, c),
                                e.$$phase || e.$apply()
                        }
                        function h(a, c, d) {
                            c = Math.max(c, 0),
                                (Tb(c) ? m.resolve: m.reject)({
                                    data: a,
                                    status: c,
                                    headers: Rb(d),
                                    config: b
                                })
                        }
                        function i() {
                            var a = G(n.pendingRequests, b); - 1 !== a && n.pendingRequests.splice(a, 1)
                        }
                        var j,
                            l,
                            m = k.defer(),
                            o = m.promise,
                            p = v(b.url, b.params);
                        if (n.pendingRequests.push(b), o.then(i, i), (b.cache || g.cache) && b.cache !== !1 && "GET" == b.method && (j = t(b.cache) ? b.cache: t(g.cache) ? g.cache: w), j) if (l = j.get(p), s(l)) {
                            if (l.then) return l.then(i, i),
                                l;
                            x(l) ? h(l[1], l[0], I(l[2])) : h(l, 200, {})
                        } else j.put(p, o);
                        return r(l) && a(b.method, p, c, f, d, b.timeout, b.withCredentials, b.responseType),
                            o
                    }
                    function v(a, b) {
                        if (!b) return a;
                        var c = [];
                        return h(b,
                            function(a, b) {
                                null === a || r(a) || (x(a) || (a = [a]), f(a,
                                    function(a) {
                                        t(a) && (a = Q(a)),
                                            c.push(Y(b) + "=" + Y(a))
                                    }))
                            }),
                            a + ( - 1 == a.indexOf("?") ? "?": "&") + c.join("&")
                    }
                    var w = d("$http"),
                        z = [];
                    return f(i,
                        function(a) {
                            z.unshift(u(a) ? m.get(a) : m.invoke(a))
                        }),
                        f(j,
                            function(a, b) {
                                var c = u(a) ? m.get(a) : m.invoke(a);
                                z.splice(b, 0, {
                                    response: function(a) {
                                        return c(k.when(a))
                                    },
                                    responseError: function(a) {
                                        return c(k.reject(a))
                                    }
                                })
                            }),
                        n.pendingRequests = [],
                        o("get", "delete", "head", "jsonp"),
                        p("post", "put"),
                        n.defaults = g,
                        n
                }]
        }
        function Vb() {
            this.$get = ["$browser", "$window", "$document",
                function(a, b, c) {
                    return Wb(a, Nd, a.defer, b.angular.callbacks, c[0])
                }]
        }
        function Wb(a, b, c, d, e) {
            function g(a, b) {
                var c = e.createElement("script"),
                    d = function() {
                        c.onreadystatechange = c.onload = c.onerror = null,
                            e.body.removeChild(c),
                            b && b()
                    };
                return c.type = "text/javascript",
                    c.src = a,
                        fd && 8 >= fd ? c.onreadystatechange = function() { / loaded | complete / .test(c.readyState) && d()
                }: c.onload = c.onerror = function() {
                    d()
                },
                    e.body.appendChild(c),
                    d
            }
            var h = -1;
            return function(e, i, j, k, l, m, n, p) {
                function q() {
                    t = h,
                        v && v(),
                        w && w.abort()
                }
                function r(b, d, e, f) {
                    var g = Dc(i).protocol;
                    x && c.cancel(x),
                        v = w = null,
                        d = "file" == g && 0 === d ? e ? 200: 404: d,
                        d = 1223 == d ? 204: d,
                        b(d, e, f),
                        a.$$completeOutstandingRequest(o)
                }
                var t;
                if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == bd(e)) {
                    var u = "_" + (d.counter++).toString(36);
                    d[u] = function(a) {
                        d[u].data = a
                    };
                    var v = g(i.replace("JSON_CALLBACK", "angular.callbacks." + u),
                        function() {
                            d[u].data ? r(k, 200, d[u].data) : r(k, t || -2),
                                delete d[u]
                        })
                } else {
                    var w = new b;
                    w.open(e, i, !0),
                        f(l,
                            function(a, b) {
                                s(a) && w.setRequestHeader(b, a)
                            }),
                        w.onreadystatechange = function() {
                            if (4 == w.readyState) {
                                var a = null,
                                    b = null;
                                t !== h && (a = w.getAllResponseHeaders(), b = w.responseType ? w.response: w.responseText),
                                    r(k, t || w.status, b, a)
                            }
                        },
                        n && (w.withCredentials = !0),
                        p && (w.responseType = p),
                        w.send(j || null)
                }
                if (m > 0) var x = c(q, m);
                else m && m.then && m.then(q)
            }
        }
        function Xb() {
            var a = "{{",
                b = "}}";
            this.startSymbol = function(b) {
                return b ? (a = b, this) : a
            },
                this.endSymbol = function(a) {
                    return a ? (b = a, this) : b
                },
                this.$get = ["$parse", "$exceptionHandler", "$sce",
                    function(c, d, e) {
                        function f(f, i, j) {
                            for (var k, l, m, n, o = 0, p = [], q = f.length, s = !1, t = []; q > o;) - 1 != (k = f.indexOf(a, o)) && -1 != (l = f.indexOf(b, k + g)) ? (o != k && p.push(f.substring(o, k)), p.push(m = c(n = f.substring(k + g, l))), m.exp = n, o = l + h, s = !0) : (o != q && p.push(f.substring(o)), o = q);
                            if ((q = p.length) || (p.push(""), q = 1), j && p.length > 1) throw Od("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", f);
                            return ! i || s ? (t.length = q, m = function(a) {
                                try {
                                    for (var b, c = 0, g = q; g > c; c++)"function" == typeof(b = p[c]) && (b = b(a), b = j ? e.getTrusted(j, b) : e.valueOf(b), null === b || r(b) ? b = "": "string" != typeof b && (b = Q(b))),
                                        t[c] = b;
                                    return t.join("")
                                } catch(h) {
                                    var i = Od("interr", "Can't interpolate: {0}\n{1}", f, h.toString());
                                    d(i)
                                }
                            },
                                m.exp = f, m.parts = p, m) : void 0
                        }
                        var g = a.length,
                            h = b.length;
                        return f.startSymbol = function() {
                            return a
                        },
                            f.endSymbol = function() {
                                return b
                            },
                            f
                    }]
        }
        function Yb() {
            this.$get = ["$rootScope", "$window", "$q",
                function(a, b, c) {
                    function d(d, f, g, h) {
                        var i = b.setInterval,
                            j = b.clearInterval,
                            k = c.defer(),
                            l = k.promise,
                            m = 0,
                            n = s(h) && !h;
                        return g = s(g) ? g: 0,
                            l.then(null, null, d),
                            l.$$intervalId = i(function() {
                                    k.notify(m++),
                                        g > 0 && m >= g && (k.resolve(m), j(l.$$intervalId), delete e[l.$$intervalId]),
                                        n || a.$apply()
                                },
                                f),
                            e[l.$$intervalId] = k,
                            l
                    }
                    var e = {};
                    return d.cancel = function(a) {
                        return a && a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"), clearInterval(a.$$intervalId), delete e[a.$$intervalId], !0) : !1
                    },
                        d
                }]
        }
        function Zb() {
            this.$get = function() {
                return {
                    id: "en-us",
                    NUMBER_FORMATS: {
                        DECIMAL_SEP: ".",
                        GROUP_SEP: ",",
                        PATTERNS: [{
                            minInt: 1,
                            minFrac: 0,
                            maxFrac: 3,
                            posPre: "",
                            posSuf: "",
                            negPre: "-",
                            negSuf: "",
                            gSize: 3,
                            lgSize: 3
                        },
                            {
                                minInt: 1,
                                minFrac: 2,
                                maxFrac: 2,
                                posPre: "¤",
                                posSuf: "",
                                negPre: "(¤",
                                negSuf: ")",
                                gSize: 3,
                                lgSize: 3
                            }],
                        CURRENCY_SYM: "$"
                    },
                    DATETIME_FORMATS: {
                        MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                        SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                        DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                        SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                        AMPMS: ["AM", "PM"],
                        medium: "MMM d, y h:mm:ss a",
                        "short": "M/d/yy h:mm a",
                        fullDate: "EEEE, MMMM d, y",
                        longDate: "MMMM d, y",
                        mediumDate: "MMM d, y",
                        shortDate: "M/d/yy",
                        mediumTime: "h:mm:ss a",
                        shortTime: "h:mm a"
                    },
                    pluralCat: function(a) {
                        return 1 === a ? "one": "other"
                    }
                }
            }
        }
        function $b(a) {
            for (var b = a.split("/"), c = b.length; c--;) b[c] = X(b[c]);
            return b.join("/")
        }
        function _b(a, b, c) {
            var d = Dc(a, c);
            b.$$protocol = d.protocol,
                b.$$host = d.hostname,
                b.$$port = m(d.port) || Qd[d.protocol] || null
        }
        function ac(a, b, c) {
            var d = "/" !== a.charAt(0);
            d && (a = "/" + a);
            var e = Dc(a, c);
            b.$$path = decodeURIComponent(d && "/" === e.pathname.charAt(0) ? e.pathname.substring(1) : e.pathname),
                b.$$search = V(e.search),
                b.$$hash = decodeURIComponent(e.hash),
                b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
        }
        function bc(a, b) {
            return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
        }
        function cc(a) {
            var b = a.indexOf("#");
            return - 1 == b ? a: a.substr(0, b)
        }
        function dc(a) {
            return a.substr(0, cc(a).lastIndexOf("/") + 1)
        }
        function ec(a) {
            return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
        }
        function fc(a, b) {
            this.$$html5 = !0,
                b = b || "";
            var d = dc(a);
            _b(a, this, a),
                this.$$parse = function(b) {
                    var c = bc(d, b);
                    if (!u(c)) throw Rd("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', b, d);
                    ac(c, this, a),
                        this.$$path || (this.$$path = "/"),
                        this.$$compose()
                },
                this.$$compose = function() {
                    var a = W(this.$$search),
                        b = this.$$hash ? "#" + X(this.$$hash) : "";
                    this.$$url = $b(this.$$path) + (a ? "?" + a: "") + b,
                        this.$$absUrl = d + this.$$url.substr(1)
                },
                this.$$rewrite = function(e) {
                    var f,
                        g;
                    return (f = bc(a, e)) !== c ? (g = f, (f = bc(b, f)) !== c ? d + (bc("/", f) || f) : a + g) : (f = bc(d, e)) !== c ? d + f: d == e + "/" ? d: void 0
                }
        }
        function gc(a, b) {
            var c = dc(a);
            _b(a, this, a),
                this.$$parse = function(d) {
                    function e(a, b, c) {
                        var d,
                            e = /^\/?.*?:(\/.*)/;
                        return 0 === b.indexOf(c) && (b = b.replace(c, "")),
                            e.exec(b) ? a: (d = e.exec(a), d ? d[1] : a)
                    }
                    var f = bc(a, d) || bc(c, d),
                        g = "#" == f.charAt(0) ? bc(b, f) : this.$$html5 ? f: "";
                    if (!u(g)) throw Rd("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', d, b);
                    ac(g, this, a),
                        this.$$path = e(this.$$path, g, a),
                        this.$$compose()
                },
                this.$$compose = function() {
                    var c = W(this.$$search),
                        d = this.$$hash ? "#" + X(this.$$hash) : "";
                    this.$$url = $b(this.$$path) + (c ? "?" + c: "") + d,
                        this.$$absUrl = a + (this.$$url ? b + this.$$url: "")
                },
                this.$$rewrite = function(b) {
                    return cc(a) == cc(b) ? b: void 0
                }
        }
        function hc(a, b) {
            this.$$html5 = !0,
                gc.apply(this, arguments);
            var c = dc(a);
            this.$$rewrite = function(d) {
                var e;
                return a == cc(d) ? d: (e = bc(c, d)) ? a + b + e: c === d + "/" ? c: void 0
            }
        }
        function ic(a) {
            return function() {
                return this[a]
            }
        }
        function jc(a, b) {
            return function(c) {
                return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
            }
        }
        function kc() {
            var b = "",
                c = !1;
            this.hashPrefix = function(a) {
                return s(a) ? (b = a, this) : b
            },
                this.html5Mode = function(a) {
                    return s(a) ? (c = a, this) : c
                },
                this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement",
                    function(d, e, f, g) {
                        function h(a) {
                            d.$broadcast("$locationChangeSuccess", i.absUrl(), a)
                        }
                        var i,
                            j,
                            k,
                            l = e.baseHref(),
                            m = e.url();
                        c ? (k = ec(m) + (l || "/"), j = f.history ? fc: hc) : (k = cc(m), j = gc),
                            i = new j(k, "#" + b),
                            i.$$parse(i.$$rewrite(m)),
                            g.on("click",
                                function(b) {
                                    if (!b.ctrlKey && !b.metaKey && 2 != b.which) {
                                        for (var c = gd(b.target);
                                             "a" !== bd(c[0].nodeName);) if (c[0] === g[0] || !(c = c.parent())[0]) return;
                                        var f = c.prop("href"),
                                            h = i.$$rewrite(f);
                                        f && !c.attr("target") && h && !b.isDefaultPrevented() && (b.preventDefault(), h != e.url() && (i.$$parse(h), d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                                    }
                                }),
                            i.absUrl() != m && e.url(i.absUrl(), !0),
                            e.onUrlChange(function(a) {
                                if (i.absUrl() != a) {
                                    if (d.$broadcast("$locationChangeStart", a, i.absUrl()).defaultPrevented) return void e.url(i.absUrl());
                                    d.$evalAsync(function() {
                                        var b = i.absUrl();
                                        i.$$parse(a),
                                            h(b)
                                    }),
                                        d.$$phase || d.$digest()
                                }
                            });
                        var n = 0;
                        return d.$watch(function() {
                            var a = e.url(),
                                b = i.$$replace;
                            return n && a == i.absUrl() || (n++, d.$evalAsync(function() {
                                d.$broadcast("$locationChangeStart", i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b), h(a))
                            })),
                                i.$$replace = !1,
                                n
                        }),
                            i
                    }]
        }
        function lc() {
            var a = !0,
                b = this;
            this.debugEnabled = function(b) {
                return s(b) ? (a = b, this) : a
            },
                this.$get = ["$window",
                    function(c) {
                        function d(a) {
                            return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack: a.stack: a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)),
                                a
                        }
                        function e(a) {
                            var b = c.console || {},
                                e = b[a] || b.log || o;
                            return e.apply ?
                                function() {
                                    var a = [];
                                    return f(arguments,
                                        function(b) {
                                            a.push(d(b))
                                        }),
                                        e.apply(b, a)
                                }: function(a, b) {
                                e(a, null == b ? "": b)
                            }
                        }
                        return {
                            log: e("log"),
                            info: e("info"),
                            warn: e("warn"),
                            error: e("error"),
                            debug: function() {
                                var c = e("debug");
                                return function() {
                                    a && c.apply(b, arguments)
                                }
                            } ()
                        }
                    }]
        }
        function mc(a, b) {
            if ("constructor" === a) throw Td("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', b);
            return a
        }
        function nc(a, b) {
            if (a) {
                if (a.constructor === a) throw Td("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
                if (a.document && a.location && a.alert && a.setInterval) throw Td("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
                if (a.children && (a.nodeName || a.on && a.find)) throw Td("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b)
            }
            return a
        }
        function oc(a, b, d, e, f) {
            f = f || {};
            for (var g, h = b.split("."), i = 0; h.length > 1; i++) {
                g = mc(h.shift(), e);
                var j = a[g];
                j || (j = {},
                    a[g] = j),
                    a = j,
                    a.then && f.unwrapPromises && (Sd(e), "$$v" in a || !
                    function(a) {
                        a.then(function(b) {
                            a.$$v = b
                        })
                    } (a), a.$$v === c && (a.$$v = {}), a = a.$$v)
            }
            return g = mc(h.shift(), e),
                a[g] = d,
                d
        }
        function pc(a, b, d, e, f, g, h) {
            return mc(a, g),
                mc(b, g),
                mc(d, g),
                mc(e, g),
                mc(f, g),
                h.unwrapPromises ?
                    function(h, i) {
                        var j,
                            k = i && i.hasOwnProperty(a) ? i: h;
                        return null === k || k === c ? k: (k = k[a], k && k.then && (Sd(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                            j.$$v = a
                        })), k = k.$$v), b && null !== k && k !== c ? (k = k[b], k && k.then && (Sd(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                            j.$$v = a
                        })), k = k.$$v), d && null !== k && k !== c ? (k = k[d], k && k.then && (Sd(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                            j.$$v = a
                        })), k = k.$$v), e && null !== k && k !== c ? (k = k[e], k && k.then && (Sd(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                            j.$$v = a
                        })), k = k.$$v), f && null !== k && k !== c ? (k = k[f], k && k.then && (Sd(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                            j.$$v = a
                        })), k = k.$$v), k) : k) : k) : k) : k)
                    }: function(g, h) {
                    var i = h && h.hasOwnProperty(a) ? h: g;
                    return null === i || i === c ? i: (i = i[a], b && null !== i && i !== c ? (i = i[b], d && null !== i && i !== c ? (i = i[d], e && null !== i && i !== c ? (i = i[e], f && null !== i && i !== c ? i = i[f] : i) : i) : i) : i)
                }
        }
        function qc(a, b, d) {
            if (Zd.hasOwnProperty(a)) return Zd[a];
            var e,
                g = a.split("."),
                h = g.length;
            if (b.csp) e = 6 > h ? pc(g[0], g[1], g[2], g[3], g[4], d, b) : function(a, e) {
                var f,
                    i = 0;
                do f = pc(g[i++], g[i++], g[i++], g[i++], g[i++], d, b)(a, e),
                    e = c,
                    a = f;
                while (h > i);
                return f
            };
            else {
                var i = "var l, fn, p;\n";
                f(g,
                    function(a, c) {
                        mc(a, d),
                            i += "if(s === null || s === undefined) return s;\nl=s;\ns=" + (c ? "s": '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\n' + (b.unwrapPromises ? 'if (s && s.then) {\n pw("' + d.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n': "")
                    }),
                    i += "return s;";
                var j = new Function("s", "k", "pw", i);
                j.toString = function() {
                    return i
                },
                    e = function(a, b) {
                        return j(a, b, Sd)
                    }
            }
            return "hasOwnProperty" !== a && (Zd[a] = e),
                e
        }
        function rc() {
            var a = {},
                b = {
                    csp: !1,
                    unwrapPromises: !1,
                    logPromiseWarnings: !0
                };
            this.unwrapPromises = function(a) {
                return s(a) ? (b.unwrapPromises = !!a, this) : b.unwrapPromises
            },
                this.logPromiseWarnings = function(a) {
                    return s(a) ? (b.logPromiseWarnings = a, this) : b.logPromiseWarnings
                },
                this.$get = ["$filter", "$sniffer", "$log",
                    function(c, d, e) {
                        return b.csp = d.csp,
                            Sd = function(a) {
                                b.logPromiseWarnings && !Ud.hasOwnProperty(a) && (Ud[a] = !0, e.warn("[$parse] Promise found in the expression `" + a + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
                            },
                            function(d) {
                                var e;
                                switch (typeof d) {
                                    case "string":
                                        if (a.hasOwnProperty(d)) return a[d];
                                        var f = new Xd(b),
                                            g = new Yd(f, c, b);
                                        return e = g.parse(d, !1),
                                            "hasOwnProperty" !== d && (a[d] = e),
                                            e;
                                    case "function":
                                        return d;
                                    default:
                                        return o
                                }
                            }
                    }]
        }
        function sc() {
            this.$get = ["$rootScope", "$exceptionHandler",
                function(a, b) {
                    return tc(function(b) {
                            a.$evalAsync(b)
                        },
                        b)
                }]
        }
        function tc(a, b) {
            function d(a) {
                return a
            }
            function e(a) {
                return j(a)
            }
            function g(a) {
                var b = h(),
                    c = 0,
                    d = x(a) ? [] : {};
                return f(a,
                    function(a, e) {
                        c++,
                            i(a).then(function(a) {
                                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                                },
                                function(a) {
                                    d.hasOwnProperty(e) || b.reject(a)
                                })
                    }),
                    0 === c && b.resolve(d),
                    b.promise
            }
            var h = function() {
                    var f,
                        g,
                        k = [];
                    return g = {
                        resolve: function(b) {
                            if (k) {
                                var d = k;
                                k = c,
                                    f = i(b),
                                    d.length && a(function() {
                                    for (var a, b = 0, c = d.length; c > b; b++) a = d[b],
                                        f.then(a[0], a[1], a[2])
                                })
                            }
                        },
                        reject: function(a) {
                            g.resolve(j(a))
                        },
                        notify: function(b) {
                            if (k) {
                                var c = k;
                                k.length && a(function() {
                                    for (var a, d = 0, e = c.length; e > d; d++) a = c[d],
                                        a[2](b)
                                })
                            }
                        },
                        promise: {
                            then: function(a, c, g) {
                                var i = h(),
                                    j = function(c) {
                                        try {
                                            i.resolve((y(a) ? a: d)(c))
                                        } catch(e) {
                                            i.reject(e),
                                                b(e)
                                        }
                                    },
                                    l = function(a) {
                                        try {
                                            i.resolve((y(c) ? c: e)(a))
                                        } catch(d) {
                                            i.reject(d),
                                                b(d)
                                        }
                                    },
                                    m = function(a) {
                                        try {
                                            i.notify((y(g) ? g: d)(a))
                                        } catch(c) {
                                            b(c)
                                        }
                                    };
                                return k ? k.push([j, l, m]) : f.then(j, l, m),
                                    i.promise
                            },
                            "catch": function(a) {
                                return this.then(null, a)
                            },
                            "finally": function(a) {
                                function b(a, b) {
                                    var c = h();
                                    return b ? c.resolve(a) : c.reject(a),
                                        c.promise
                                }
                                function c(c, e) {
                                    var f = null;
                                    try {
                                        f = (a || d)()
                                    } catch(g) {
                                        return b(g, !1)
                                    }
                                    return f && y(f.then) ? f.then(function() {
                                            return b(c, e)
                                        },
                                        function(a) {
                                            return b(a, !1)
                                        }) : b(c, e)
                                }
                                return this.then(function(a) {
                                        return c(a, !0)
                                    },
                                    function(a) {
                                        return c(a, !1)
                                    })
                            }
                        }
                    }
                },
                i = function(b) {
                    return b && y(b.then) ? b: {
                        then: function(c) {
                            var d = h();
                            return a(function() {
                                d.resolve(c(b))
                            }),
                                d.promise
                        }
                    }
                },
                j = function(c) {
                    return {
                        then: function(d, f) {
                            var g = h();
                            return a(function() {
                                try {
                                    g.resolve((y(f) ? f: e)(c))
                                } catch(a) {
                                    g.reject(a),
                                        b(a)
                                }
                            }),
                                g.promise
                        }
                    }
                },
                k = function(c, f, g, k) {
                    var l,
                        m = h(),
                        n = function(a) {
                            try {
                                return (y(f) ? f: d)(a)
                            } catch(c) {
                                return b(c),
                                    j(c)
                            }
                        },
                        o = function(a) {
                            try {
                                return (y(g) ? g: e)(a)
                            } catch(c) {
                                return b(c),
                                    j(c)
                            }
                        },
                        p = function(a) {
                            try {
                                return (y(k) ? k: d)(a)
                            } catch(c) {
                                b(c)
                            }
                        };
                    return a(function() {
                        i(c).then(function(a) {
                                l || (l = !0, m.resolve(i(a).then(n, o, p)))
                            },
                            function(a) {
                                l || (l = !0, m.resolve(o(a)))
                            },
                            function(a) {
                                l || m.notify(p(a))
                            })
                    }),
                        m.promise
                };
            return {
                defer: h,
                reject: j,
                when: k,
                all: g
            }
        }
        function uc() {
            var a = 10,
                b = d("$rootScope"),
                c = null;
            this.digestTtl = function(b) {
                return arguments.length && (a = b),
                    a
            },
                this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser",
                    function(d, f, g, h) {
                        function i() {
                            this.$id = j(),
                                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null,
                                this["this"] = this.$root = this,
                                this.$$destroyed = !1,
                                this.$$asyncQueue = [],
                                this.$$postDigestQueue = [],
                                this.$$listeners = {},
                                this.$$isolateBindings = {}
                        }
                        function k(a) {
                            if (p.$$phase) throw b("inprog", "{0} already in progress", p.$$phase);
                            p.$$phase = a
                        }
                        function l() {
                            p.$$phase = null
                        }
                        function m(a, b) {
                            var c = g(a);
                            return cb(c, b),
                                c
                        }
                        function n() {}
                        i.prototype = {
                            constructor: i,
                            $new: function(a) {
                                var b,
                                    c;
                                return a ? (c = new i, c.$root = this.$root, c.$$asyncQueue = this.$$asyncQueue, c.$$postDigestQueue = this.$$postDigestQueue) : (b = function() {},
                                    b.prototype = this, c = new b, c.$id = j()),
                                    c["this"] = c,
                                    c.$$listeners = {},
                                    c.$parent = this,
                                    c.$$watchers = c.$$nextSibling = c.$$childHead = c.$$childTail = null,
                                    c.$$prevSibling = this.$$childTail,
                                    this.$$childHead ? (this.$$childTail.$$nextSibling = c, this.$$childTail = c) : this.$$childHead = this.$$childTail = c,
                                    c
                            },
                            $watch: function(a, b, d) {
                                var e = this,
                                    f = m(a, "watch"),
                                    g = e.$$watchers,
                                    h = {
                                        fn: b,
                                        last: n,
                                        get: f,
                                        exp: a,
                                        eq: !!d
                                    };
                                if (c = null, !y(b)) {
                                    var i = m(b || o, "listener");
                                    h.fn = function(a, b, c) {
                                        i(c)
                                    }
                                }
                                if ("string" == typeof a && f.constant) {
                                    var j = h.fn;
                                    h.fn = function(a, b, c) {
                                        j.call(this, a, b, c),
                                            H(g, h)
                                    }
                                }
                                return g || (g = e.$$watchers = []),
                                    g.unshift(h),
                                    function() {
                                        H(g, h)
                                    }
                            },
                            $watchCollection: function(a, b) {
                                function c() {
                                    h = k(i);
                                    var a,
                                        b;
                                    if (t(h)) if (e(h)) {
                                        f !== l && (f = l, n = f.length = 0, j++),
                                            a = h.length,
                                            n !== a && (j++, f.length = n = a);
                                        for (var c = 0; a > c; c++) f[c] !== h[c] && (j++, f[c] = h[c])
                                    } else {
                                        f !== m && (f = m = {},
                                            n = 0, j++),
                                            a = 0;
                                        for (b in h) h.hasOwnProperty(b) && (a++, f.hasOwnProperty(b) ? f[b] !== h[b] && (j++, f[b] = h[b]) : (n++, f[b] = h[b], j++));
                                        if (n > a) {
                                            j++;
                                            for (b in f) f.hasOwnProperty(b) && !h.hasOwnProperty(b) && (n--, delete f[b])
                                        }
                                    } else f !== h && (f = h, j++);
                                    return j
                                }
                                function d() {
                                    b(h, f, i)
                                }
                                var f,
                                    h,
                                    i = this,
                                    j = 0,
                                    k = g(a),
                                    l = [],
                                    m = {},
                                    n = 0;
                                return this.$watch(c, d)
                            },
                            $digest: function() {
                                var d,
                                    e,
                                    g,
                                    h,
                                    i,
                                    j,
                                    m,
                                    o,
                                    p,
                                    q,
                                    r,
                                    s = this.$$asyncQueue,
                                    t = this.$$postDigestQueue,
                                    u = a,
                                    v = this,
                                    w = [];
                                k("$digest"),
                                    c = null;
                                do {
                                    for (j = !1, o = v; s.length;) {
                                        try {
                                            r = s.shift(),
                                                r.scope.$eval(r.expression)
                                        } catch(x) {
                                            l(),
                                                f(x)
                                        }
                                        c = null
                                    }
                                    a: do {
                                        if (h = o.$$watchers) for (i = h.length; i--;) try {
                                            if (d = h[i]) if ((e = d.get(o)) === (g = d.last) || (d.eq ? K(e, g) : "number" == typeof e && "number" == typeof g && isNaN(e) && isNaN(g))) {
                                                if (d === c) {
                                                    j = !1;
                                                    break a
                                                }
                                            } else j = !0,
                                                c = d,
                                                d.last = d.eq ? I(e) : e,
                                                d.fn(e, g === n ? e: g, o),
                                                5 > u && (p = 4 - u, w[p] || (w[p] = []), q = y(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, q += "; newVal: " + Q(e) + "; oldVal: " + Q(g), w[p].push(q))
                                        } catch(x) {
                                            l(),
                                                f(x)
                                        }
                                        if (! (m = o.$$childHead || o !== v && o.$$nextSibling)) for (; o !== v && !(m = o.$$nextSibling);) o = o.$parent
                                    }
                                    while (o = m);
                                    if (j && !u--) throw l(),
                                        b("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", a, Q(w))
                                }
                                while (j || s.length);
                                for (l(); t.length;) try {
                                    t.shift()()
                                } catch(x) {
                                    f(x)
                                }
                            },
                            $destroy: function() {
                                if (!this.$$destroyed) {
                                    var a = this.$parent;
                                    this.$broadcast("$destroy"),
                                        this.$$destroyed = !0,
                                        this !== p && (a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null)
                                }
                            },
                            $eval: function(a, b) {
                                return g(a)(this, b)
                            },
                            $evalAsync: function(a) {
                                p.$$phase || p.$$asyncQueue.length || h.defer(function() {
                                    p.$$asyncQueue.length && p.$digest()
                                }),
                                    this.$$asyncQueue.push({
                                        scope: this,
                                        expression: a
                                    })
                            },
                            $$postDigest: function(a) {
                                this.$$postDigestQueue.push(a)
                            },
                            $apply: function(a) {
                                try {
                                    return k("$apply"),
                                        this.$eval(a)
                                } catch(b) {
                                    f(b)
                                } finally {
                                    l();
                                    try {
                                        p.$digest()
                                    } catch(b) {
                                        throw f(b),
                                            b
                                    }
                                }
                            },
                            $on: function(a, b) {
                                var c = this.$$listeners[a];
                                return c || (this.$$listeners[a] = c = []),
                                    c.push(b),
                                    function() {
                                        c[G(c, b)] = null
                                    }
                            },
                            $emit: function(a) {
                                var b,
                                    c,
                                    d,
                                    e = [],
                                    g = this,
                                    h = !1,
                                    i = {
                                        name: a,
                                        targetScope: g,
                                        stopPropagation: function() {
                                            h = !0
                                        },
                                        preventDefault: function() {
                                            i.defaultPrevented = !0
                                        },
                                        defaultPrevented: !1
                                    },
                                    j = M([i], arguments, 1);
                                do {
                                    for (b = g.$$listeners[a] || e, i.currentScope = g, c = 0, d = b.length; d > c; c++) if (b[c]) try {
                                        b[c].apply(null, j)
                                    } catch(k) {
                                        f(k)
                                    } else b.splice(c, 1),
                                        c--,
                                        d--;
                                    if (h) return i;
                                    g = g.$parent
                                }
                                while (g);
                                return i
                            },
                            $broadcast: function(a) {
                                var b,
                                    c,
                                    d,
                                    e = this,
                                    g = e,
                                    h = e,
                                    i = {
                                        name: a,
                                        targetScope: e,
                                        preventDefault: function() {
                                            i.defaultPrevented = !0
                                        },
                                        defaultPrevented: !1
                                    },
                                    j = M([i], arguments, 1);
                                do {
                                    for (g = h, i.currentScope = g, b = g.$$listeners[a] || [], c = 0, d = b.length; d > c; c++) if (b[c]) try {
                                        b[c].apply(null, j)
                                    } catch(k) {
                                        f(k)
                                    } else b.splice(c, 1),
                                        c--,
                                        d--;
                                    if (! (h = g.$$childHead || g !== e && g.$$nextSibling)) for (; g !== e && !(h = g.$$nextSibling);) g = g.$parent
                                }
                                while (g = h);
                                return i
                            }
                        };
                        var p = new i;
                        return p
                    }]
        }
        function vc() {
            var a = /^\s*(https?|ftp|mailto|tel|file):/,
                b = /^\s*(https?|ftp|file):|data:image\//;
            this.aHrefSanitizationWhitelist = function(b) {
                return s(b) ? (a = b, this) : a
            },
                this.imgSrcSanitizationWhitelist = function(a) {
                    return s(a) ? (b = a, this) : b
                },
                this.$get = function() {
                    return function(c, d) {
                        var e,
                            f = d ? b: a;
                        return fd && !(fd >= 8) || (e = Dc(c).href, "" === e || e.match(f)) ? c: "unsafe:" + e
                    }
                }
        }
        function wc(a) {
            return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
        }
        function xc(a) {
            if ("self" === a) return a;
            if (u(a)) {
                if (a.indexOf("***") > -1) throw $d("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
                return a = wc(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"),
                    new RegExp("^" + a + "$")
            }
            if (z(a)) return new RegExp("^" + a.source + "$");
            throw $d("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
        }
        function yc(a) {
            var b = [];
            return s(a) && f(a,
                function(a) {
                    b.push(xc(a))
                }),
                b
        }
        function zc() {
            this.SCE_CONTEXTS = _d;
            var a = ["self"],
                b = [];
            this.resourceUrlWhitelist = function(b) {
                return arguments.length && (a = yc(b)),
                    a
            },
                this.resourceUrlBlacklist = function(a) {
                    return arguments.length && (b = yc(a)),
                        b
                },
                this.$get = ["$injector",
                    function(d) {
                        function e(a, b) {
                            return "self" === a ? Ec(b) : !!a.exec(b.href)
                        }
                        function f(c) {
                            var d,
                                f,
                                g = Dc(c.toString()),
                                h = !1;
                            for (d = 0, f = a.length; f > d; d++) if (e(a[d], g)) {
                                h = !0;
                                break
                            }
                            if (h) for (d = 0, f = b.length; f > d; d++) if (e(b[d], g)) {
                                h = !1;
                                break
                            }
                            return h
                        }
                        function g(a) {
                            var b = function(a) {
                                this.$$unwrapTrustedValue = function() {
                                    return a
                                }
                            };
                            return a && (b.prototype = new a),
                                b.prototype.valueOf = function() {
                                    return this.$$unwrapTrustedValue()
                                },
                                b.prototype.toString = function() {
                                    return this.$$unwrapTrustedValue().toString()
                                },
                                b
                        }
                        function h(a, b) {
                            var d = m.hasOwnProperty(a) ? m[a] : null;
                            if (!d) throw $d("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
                            if (null === b || b === c || "" === b) return b;
                            if ("string" != typeof b) throw $d("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
                            return new d(b)
                        }
                        function i(a) {
                            return a instanceof l ? a.$$unwrapTrustedValue() : a
                        }
                        function j(a, b) {
                            if (null === b || b === c || "" === b) return b;
                            var d = m.hasOwnProperty(a) ? m[a] : null;
                            if (d && b instanceof d) return b.$$unwrapTrustedValue();
                            if (a === _d.RESOURCE_URL) {
                                if (f(b)) return b;
                                throw $d("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
                            }
                            if (a === _d.HTML) return k(b);
                            throw $d("unsafe", "Attempting to use an unsafe value in a safe context.")
                        }
                        var k = function() {
                            throw $d("unsafe", "Attempting to use an unsafe value in a safe context.")
                        };
                        d.has("$sanitize") && (k = d.get("$sanitize"));
                        var l = g(),
                            m = {};
                        return m[_d.HTML] = g(l),
                            m[_d.CSS] = g(l),
                            m[_d.URL] = g(l),
                            m[_d.JS] = g(l),
                            m[_d.RESOURCE_URL] = g(m[_d.URL]),
                        {
                            trustAs: h,
                            getTrusted: j,
                            valueOf: i
                        }
                    }]
        }
        function Ac() {
            var a = !0;
            this.enabled = function(b) {
                return arguments.length && (a = !!b),
                    a
            },
                this.$get = ["$parse", "$sniffer", "$sceDelegate",
                    function(b, c, d) {
                        if (a && c.msie && c.msieDocumentMode < 8) throw $d("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
                        var e = I(_d);
                        e.isEnabled = function() {
                            return a
                        },
                            e.trustAs = d.trustAs,
                            e.getTrusted = d.getTrusted,
                            e.valueOf = d.valueOf,
                            a || (e.trustAs = e.getTrusted = function(a, b) {
                            return b
                        },
                            e.valueOf = p),
                            e.parseAs = function(a, c) {
                                var d = b(c);
                                return d.literal && d.constant ? d: function(b, c) {
                                    return e.getTrusted(a, d(b, c))
                                }
                            };
                        var g = e.parseAs,
                            h = e.getTrusted,
                            i = e.trustAs;
                        return f(_d,
                            function(a, b) {
                                var c = bd(b);
                                e[jb("parse_as_" + c)] = function(b) {
                                    return g(a, b)
                                },
                                    e[jb("get_trusted_" + c)] = function(b) {
                                        return h(a, b)
                                    },
                                    e[jb("trust_as_" + c)] = function(b) {
                                        return i(a, b)
                                    }
                            }),
                            e
                    }]
        }
        function Bc() {
            this.$get = ["$window", "$document",
                function(a, b) {
                    var c,
                        d,
                        e = {},
                        f = m((/android (\d+)/.exec(bd((a.navigator || {}).userAgent)) || [])[1]),
                        g = /Boxee/i.test((a.navigator || {}).userAgent),
                        h = b[0] || {},
                        i = h.documentMode,
                        j = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                        k = h.body && h.body.style,
                        l = !1,
                        n = !1;
                    if (k) {
                        for (var o in k) if (d = j.exec(o)) {
                            c = d[0],
                                c = c.substr(0, 1).toUpperCase() + c.substr(1);
                            break
                        }
                        c || (c = "WebkitOpacity" in k && "webkit"),
                            l = !!("transition" in k || c + "Transition" in k),
                            n = !!("animation" in k || c + "Animation" in k),
                            !f || l && n || (l = u(h.body.style.webkitTransition), n = u(h.body.style.webkitAnimation))
                    }
                    return {
                        history: !(!a.history || !a.history.pushState || 4 > f || g),
                        hashchange: "onhashchange" in a && (!i || i > 7),
                        hasEvent: function(a) {
                            if ("input" == a && 9 == fd) return ! 1;
                            if (r(e[a])) {
                                var b = h.createElement("div");
                                e[a] = "on" + a in b
                            }
                            return e[a]
                        },
                        csp: L(),
                        vendorPrefix: c,
                        transitions: l,
                        animations: n,
                        msie: fd,
                        msieDocumentMode: i
                    }
                }]
        }
        function Cc() {
            this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler",
                function(a, b, c, d) {
                    function e(e, g, h) {
                        var i,
                            j = c.defer(),
                            k = j.promise,
                            l = s(h) && !h;
                        return i = b.defer(function() {
                                try {
                                    j.resolve(e())
                                } catch(b) {
                                    j.reject(b),
                                        d(b)
                                } finally {
                                    delete f[k.$$timeoutId]
                                }
                                l || a.$apply()
                            },
                            g),
                            k.$$timeoutId = i,
                            f[i] = j,
                            k
                    }
                    var f = {};
                    return e.cancel = function(a) {
                        return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject("canceled"), delete f[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
                    },
                        e
                }]
        }
        function Dc(a) {
            var b = a;
            return fd && (ae.setAttribute("href", b), b = ae.href),
                ae.setAttribute("href", b),
            {
                href: ae.href,
                protocol: ae.protocol ? ae.protocol.replace(/:$/, "") : "",
                host: ae.host,
                search: ae.search ? ae.search.replace(/^\?/, "") : "",
                hash: ae.hash ? ae.hash.replace(/^#/, "") : "",
                hostname: ae.hostname,
                port: ae.port,
                pathname: "/" === ae.pathname.charAt(0) ? ae.pathname: "/" + ae.pathname
            }
        }
        function Ec(a) {
            var b = u(a) ? Dc(a) : a;
            return b.protocol === be.protocol && b.host === be.host
        }
        function Fc() {
            this.$get = q(a)
        }
        function Gc(a) {
            function b(d, e) {
                if (t(d)) {
                    var g = {};
                    return f(d,
                        function(a, c) {
                            g[c] = b(c, a)
                        }),
                        g
                }
                return a.factory(d + c, e)
            }
            var c = "Filter";
            this.register = b,
                this.$get = ["$injector",
                    function(a) {
                        return function(b) {
                            return a.get(b + c)
                        }
                    }],
                b("currency", Ic),
                b("date", Qc),
                b("filter", Hc),
                b("json", Rc),
                b("limitTo", Sc),
                b("lowercase", ge),
                b("number", Jc),
                b("orderBy", Tc),
                b("uppercase", he)
        }
        function Hc() {
            return function(a, b, c) {
                if (!x(a)) return a;
                var d = typeof c,
                    e = [];
                e.check = function(a) {
                    for (var b = 0; b < e.length; b++) if (!e[b](a)) return ! 1;
                    return ! 0
                },
                    "function" !== d && (c = "boolean" === d && c ?
                    function(a, b) {
                        return od.equals(a, b)
                    }: function(a, b) {
                    return b = ("" + b).toLowerCase(),
                        ("" + a).toLowerCase().indexOf(b) > -1
                });
                var f = function(a, b) {
                    if ("string" == typeof b && "!" === b.charAt(0)) return ! f(a, b.substr(1));
                    switch (typeof a) {
                        case "boolean":
                        case "number":
                        case "string":
                            return c(a, b);
                        case "object":
                            switch (typeof b) {
                                case "object":
                                    return c(a, b);
                                default:
                                    for (var d in a) if ("$" !== d.charAt(0) && f(a[d], b)) return ! 0
                            }
                            return ! 1;
                        case "array":
                            for (var e = 0; e < a.length; e++) if (f(a[e], b)) return ! 0;
                            return ! 1;
                        default:
                            return ! 1
                    }
                };
                switch (typeof b) {
                    case "boolean":
                    case "number":
                    case "string":
                        b = {
                            $: b
                        };
                    case "object":
                        for (var g in b)"$" == g ? !
                            function() {
                                if (b[g]) {
                                    var a = g;
                                    e.push(function(c) {
                                        return f(c, b[a])
                                    })
                                }
                            } () : !
                            function() {
                                if ("undefined" != typeof b[g]) {
                                    var a = g;
                                    e.push(function(c) {
                                        return f(eb(c, a), b[a])
                                    })
                                }
                            } ();
                        break;
                    case "function":
                        e.push(b);
                        break;
                    default:
                        return a
                }
                for (var h = [], i = 0; i < a.length; i++) {
                    var j = a[i];
                    e.check(j) && h.push(j)
                }
                return h
            }
        }
        function Ic(a) {
            var b = a.NUMBER_FORMATS;
            return function(a, c) {
                return r(c) && (c = b.CURRENCY_SYM),
                    Kc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c)
            }
        }
        function Jc(a) {
            var b = a.NUMBER_FORMATS;
            return function(a, c) {
                return Kc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
            }
        }
        function Kc(a, b, c, d, e) {
            if (isNaN(a) || !isFinite(a)) return "";
            var f = 0 > a;
            a = Math.abs(a);
            var g = a + "",
                h = "",
                i = [],
                j = !1;
            if ( - 1 !== g.indexOf("e")) {
                var k = g.match(/([\d\.]+)e(-?)(\d+)/);
                k && "-" == k[2] && k[3] > e + 1 ? g = "0": (h = g, j = !0)
            }
            if (j) e > 0 && a > -1 && 1 > a && (h = a.toFixed(e));
            else {
                var l = (g.split(ce)[1] || "").length;
                r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac));
                var m = Math.pow(10, e);
                a = Math.round(a * m) / m;
                var n = ("" + a).split(ce),
                    o = n[0];
                n = n[1] || "";
                var p,
                    q = 0,
                    s = b.lgSize,
                    t = b.gSize;
                if (o.length >= s + t) for (q = o.length - s, p = 0; q > p; p++)(q - p) % t === 0 && 0 !== p && (h += c),
                    h += o.charAt(p);
                for (p = q; p < o.length; p++)(o.length - p) % s === 0 && 0 !== p && (h += c),
                    h += o.charAt(p);
                for (; n.length < e;) n += "0";
                e && "0" !== e && (h += d + n.substr(0, e))
            }
            return i.push(f ? b.negPre: b.posPre),
                i.push(h),
                i.push(f ? b.negSuf: b.posSuf),
                i.join("")
        }
        function Lc(a, b, c) {
            var d = "";
            for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;) a = "0" + a;
            return c && (a = a.substr(a.length - b)),
                d + a
        }
        function Mc(a, b, c, d) {
            return c = c || 0,
                function(e) {
                    var f = e["get" + a]();
                    return (c > 0 || f > -c) && (f += c),
                        0 === f && -12 == c && (f = 12),
                        Lc(f, b, d)
                }
        }
        function Nc(a, b) {
            return function(c, d) {
                var e = c["get" + a](),
                    f = cd(b ? "SHORT" + a: a);
                return d[f][e]
            }
        }
        function Oc(a) {
            var b = -1 * a.getTimezoneOffset(),
                c = b >= 0 ? "+": "";
            return c += Lc(Math[b > 0 ? "floor": "ceil"](b / 60), 2) + Lc(Math.abs(b % 60), 2)
        }
        function Pc(a, b) {
            return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
        }
        function Qc(a) {
            function b(a) {
                var b;
                if (b = a.match(c)) {
                    var d = new Date(0),
                        e = 0,
                        f = 0,
                        g = b[8] ? d.setUTCFullYear: d.setFullYear,
                        h = b[8] ? d.setUTCHours: d.setHours;
                    b[9] && (e = m(b[9] + b[10]), f = m(b[9] + b[11])),
                        g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
                    var i = m(b[4] || 0) - e,
                        j = m(b[5] || 0) - f,
                        k = m(b[6] || 0),
                        l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                    return h.call(d, i, j, k, l),
                        d
                }
                return a
            }
            var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
            return function(c, d) {
                var e,
                    g,
                    h = "",
                    i = [];
                if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = fe.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c)) return c;
                for (; d;) g = ee.exec(d),
                    g ? (i = M(i, g, 1), d = i.pop()) : (i.push(d), d = null);
                return f(i,
                    function(b) {
                        e = de[b],
                            h += e ? e(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                    }),
                    h
            }
        }
        function Rc() {
            return function(a) {
                return Q(a, !0)
            }
        }
        function Sc() {
            return function(a, b) {
                if (!x(a) && !u(a)) return a;
                if (b = m(b), u(a)) return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
                var c,
                    d,
                    e = [];
                for (b > a.length ? b = a.length: b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++) e.push(a[c]);
                return e
            }
        }
        function Tc(a) {
            return function(b, c, d) {
                function e(a, b) {
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d](a, b);
                        if (0 !== e) return e
                    }
                    return 0
                }
                function f(a, b) {
                    return S(b) ?
                        function(b, c) {
                            return a(c, b)
                        }: a
                }
                function g(a, b) {
                    var c = typeof a,
                        d = typeof b;
                    return c == d ? ("string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0: b > a ? -1: 1) : d > c ? -1: 1
                }
                if (!x(b)) return b;
                if (!c) return b;
                c = x(c) ? c: [c],
                    c = E(c,
                        function(b) {
                            var c = !1,
                                d = b || p;
                            return u(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), d = a(b)),
                                f(function(a, b) {
                                        return g(d(a), d(b))
                                    },
                                    c)
                        });
                for (var h = [], i = 0; i < b.length; i++) h.push(b[i]);
                return h.sort(f(e, d))
            }
        }
        function Uc(a) {
            return y(a) && (a = {
                link: a
            }),
                a.restrict = a.restrict || "AC",
                q(a)
        }
        function Vc(a, b) {
            function c(b, c) {
                c = c ? "-" + _(c, "-") : "",
                    a.removeClass((b ? ue: te) + c).addClass((b ? te: ue) + c)
            }
            var d = this,
                e = a.parent().controller("form") || ke,
                g = 0,
                h = d.$error = {},
                i = [];
            d.$name = b.name || b.ngForm,
                d.$dirty = !1,
                d.$pristine = !0,
                d.$valid = !0,
                d.$invalid = !1,
                e.$addControl(d),
                a.addClass(ve),
                c(!0),
                d.$addControl = function(a) {
                    db(a.$name, "input"),
                        i.push(a),
                        a.$name && (d[a.$name] = a)
                },
                d.$removeControl = function(a) {
                    a.$name && d[a.$name] === a && delete d[a.$name],
                        f(h,
                            function(b, c) {
                                d.$setValidity(c, !0, a)
                            }),
                        H(i, a)
                },
                d.$setValidity = function(a, b, f) {
                    var i = h[a];
                    if (b) i && (H(i, f), i.length || (g--, g || (c(b), d.$valid = !0, d.$invalid = !1), h[a] = !1, c(!0, a), e.$setValidity(a, !0, d)));
                    else {
                        if (g || c(b), i) {
                            if (F(i, f)) return
                        } else h[a] = i = [],
                            g++,
                            c(!1, a),
                            e.$setValidity(a, !1, d);
                        i.push(f),
                            d.$valid = !1,
                            d.$invalid = !0
                    }
                },
                d.$setDirty = function() {
                    a.removeClass(ve).addClass(we),
                        d.$dirty = !0,
                        d.$pristine = !1,
                        e.$setDirty()
                },
                d.$setPristine = function() {
                    a.removeClass(we).addClass(ve),
                        d.$dirty = !1,
                        d.$pristine = !0,
                        f(i,
                            function(a) {
                                a.$setPristine()
                            })
                }
        }
        function Wc(a, b, e, f, g, h) {
            var i = !1;
            b.on("compositionstart",
                function() {
                    i = !0
                }),
                b.on("compositionend",
                    function() {
                        i = !1
                    });
            var j = function() {
                if (!i) {
                    var c = b.val();
                    S(e.ngTrim || "T") && (c = qd(c)),
                        f.$viewValue !== c && a.$apply(function() {
                        f.$setViewValue(c)
                    })
                }
            };
            if (g.hasEvent("input")) b.on("input", j);
            else {
                var k,
                    l = function() {
                        k || (k = h.defer(function() {
                            j(),
                                k = null
                        }))
                    };
                b.on("keydown",
                    function(a) {
                        var b = a.keyCode;
                        91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || l()
                    }),
                    g.hasEvent("paste") && b.on("paste cut", l)
            }
            b.on("change", j),
                f.$render = function() {
                    b.val(f.$isEmpty(f.$viewValue) ? "": f.$viewValue)
                };
            var n,
                o,
                p = e.ngPattern,
                q = function(a, b) {
                    return f.$isEmpty(b) || a.test(b) ? (f.$setValidity("pattern", !0), b) : (f.$setValidity("pattern", !1), c)
                };
            if (p && (o = p.match(/^\/(.*)\/([gim]*)$/), o ? (p = new RegExp(o[1], o[2]), n = function(a) {
                return q(p, a)
            }) : n = function(c) {
                var e = a.$eval(p);
                if (!e || !e.test) throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", p, e, T(b));
                return q(e, c)
            },
                f.$formatters.push(n), f.$parsers.push(n)), e.ngMinlength) {
                var r = m(e.ngMinlength),
                    s = function(a) {
                        return ! f.$isEmpty(a) && a.length < r ? (f.$setValidity("minlength", !1), c) : (f.$setValidity("minlength", !0), a)
                    };
                f.$parsers.push(s),
                    f.$formatters.push(s)
            }
            if (e.ngMaxlength) {
                var t = m(e.ngMaxlength),
                    u = function(a) {
                        return ! f.$isEmpty(a) && a.length > t ? (f.$setValidity("maxlength", !1), c) : (f.$setValidity("maxlength", !0), a)
                    };
                f.$parsers.push(u),
                    f.$formatters.push(u)
            }
        }
        function Xc(a, b, d, e, f, g) {
            if (Wc(a, b, d, e, f, g), e.$parsers.push(function(a) {
                var b = e.$isEmpty(a);
                return b || qe.test(a) ? (e.$setValidity("number", !0), "" === a ? null: b ? a: parseFloat(a)) : (e.$setValidity("number", !1), c)
            }), e.$formatters.push(function(a) {
                return e.$isEmpty(a) ? "": "" + a
            }), d.min) {
                var h = function(a) {
                    var b = parseFloat(d.min);
                    return ! e.$isEmpty(a) && b > a ? (e.$setValidity("min", !1), c) : (e.$setValidity("min", !0), a)
                };
                e.$parsers.push(h),
                    e.$formatters.push(h)
            }
            if (d.max) {
                var i = function(a) {
                    var b = parseFloat(d.max);
                    return ! e.$isEmpty(a) && a > b ? (e.$setValidity("max", !1), c) : (e.$setValidity("max", !0), a)
                };
                e.$parsers.push(i),
                    e.$formatters.push(i)
            }
            e.$formatters.push(function(a) {
                return e.$isEmpty(a) || v(a) ? (e.$setValidity("number", !0), a) : (e.$setValidity("number", !1), c)
            })
        }
        function Yc(a, b, d, e, f, g) {
            Wc(a, b, d, e, f, g);
            var h = function(a) {
                return e.$isEmpty(a) || oe.test(a) ? (e.$setValidity("url", !0), a) : (e.$setValidity("url", !1), c)
            };
            e.$formatters.push(h),
                e.$parsers.push(h)
        }
        function Zc(a, b, d, e, f, g) {
            Wc(a, b, d, e, f, g);
            var h = function(a) {
                return e.$isEmpty(a) || pe.test(a) ? (e.$setValidity("email", !0), a) : (e.$setValidity("email", !1), c)
            };
            e.$formatters.push(h),
                e.$parsers.push(h)
        }
        function $c(a, b, c, d) {
            r(c.name) && b.attr("name", j()),
                b.on("click",
                    function() {
                        b[0].checked && a.$apply(function() {
                            d.$setViewValue(c.value)
                        })
                    }),
                d.$render = function() {
                    var a = c.value;
                    b[0].checked = a == d.$viewValue
                },
                c.$observe("value", d.$render)
        }
        function _c(a, b, c, d) {
            var e = c.ngTrueValue,
                f = c.ngFalseValue;
            u(e) || (e = !0),
                u(f) || (f = !1),
                b.on("click",
                    function() {
                        a.$apply(function() {
                            d.$setViewValue(b[0].checked)
                        })
                    }),
                d.$render = function() {
                    b[0].checked = d.$viewValue
                },
                d.$isEmpty = function(a) {
                    return a !== e
                },
                d.$formatters.push(function(a) {
                    return a === e
                }),
                d.$parsers.push(function(a) {
                    return a ? e: f
                })
        }
        function ad(a, b) {
            return a = "ngClass" + a,
                function() {
                    return {
                        restrict: "AC",
                        link: function(c, d, e) {
                            function g(a) {
                                if (b === !0 || c.$index % 2 === b) {
                                    var d = h(a || "");
                                    i ? K(a, i) || e.$updateClass(d, h(i)) : e.$addClass(d)
                                }
                                i = I(a)
                            }
                            function h(a) {
                                if (x(a)) return a.join(" ");
                                if (t(a)) {
                                    var b = [];
                                    return f(a,
                                        function(a, c) {
                                            a && b.push(c)
                                        }),
                                        b.join(" ")
                                }
                                return a
                            }
                            var i;
                            c.$watch(e[a], g, !0),
                                e.$observe("class",
                                    function() {
                                        g(c.$eval(e[a]))
                                    }),
                                "ngClass" !== a && c.$watch("$index",
                                function(d, f) {
                                    var g = 1 & d;
                                    if (g !== f & 1) {
                                        var i = h(c.$eval(e[a]));
                                        g === b ? e.$addClass(i) : e.$removeClass(i)
                                    }
                                })
                        }
                    }
                }
        }
        var bd = function(a) {
                return u(a) ? a.toLowerCase() : a
            },
            cd = function(a) {
                return u(a) ? a.toUpperCase() : a
            },
            dd = function(a) {
                return u(a) ? a.replace(/[A-Z]/g,
                    function(a) {
                        return String.fromCharCode(32 | a.charCodeAt(0))
                    }) : a
            },
            ed = function(a) {
                return u(a) ? a.replace(/[a-z]/g,
                    function(a) {
                        return String.fromCharCode( - 33 & a.charCodeAt(0))
                    }) : a
            };
        "i" !== "I".toLowerCase() && (bd = dd, cd = ed);
        var fd,
            gd,
            hd,
            id,
            jd,
            kd = [].slice,
            ld = [].push,
            md = Object.prototype.toString,
            nd = d("ng"),
            od = (a.angular, a.angular || (a.angular = {})),
            pd = ["0", "0", "0"];
        fd = m((/msie (\d+)/.exec(bd(navigator.userAgent)) || [])[1]),
            isNaN(fd) && (fd = m((/trident\/.*; rv:(\d+)/.exec(bd(navigator.userAgent)) || [])[1])),
            o.$inject = [],
            p.$inject = [];
        var qd = function() {
            return String.prototype.trim ?
                function(a) {
                    return u(a) ? a.trim() : a
                }: function(a) {
                return u(a) ? a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : a
            }
        } ();
        jd = 9 > fd ?
            function(a) {
                return a = a.nodeName ? a: a[0],
                        a.scopeName && "HTML" != a.scopeName ? cd(a.scopeName + ":" + a.nodeName) : a.nodeName
            }: function(a) {
            return a.nodeName ? a.nodeName: a[0].nodeName
        };
        var rd = /[A-Z]/g,
            sd = {
                full: "1.2.5",
                major: 1,
                minor: 2,
                dot: 5,
                codeName: "singularity-expansion"
            },
            td = lb.cache = {},
            ud = lb.expando = "ng-" + (new Date).getTime(),
            vd = 1,
            wd = a.document.addEventListener ?
                function(a, b, c) {
                    a.addEventListener(b, c, !1)
                }: function(a, b, c) {
                a.attachEvent("on" + b, c)
            },
            xd = a.document.removeEventListener ?
                function(a, b, c) {
                    a.removeEventListener(b, c, !1)
                }: function(a, b, c) {
                a.detachEvent("on" + b, c)
            },
            yd = /([\:\-\_]+(.))/g,
            zd = /^moz([A-Z])/,
            Ad = d("jqLite"),
            Bd = lb.prototype = {
                ready: function(c) {
                    function d() {
                        e || (e = !0, c())
                    }
                    var e = !1;
                    "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), lb(a).on("load", d))
                },
                toString: function() {
                    var a = [];
                    return f(this,
                        function(b) {
                            a.push("" + b)
                        }),
                        "[" + a.join(", ") + "]"
                },
                eq: function(a) {
                    return gd(a >= 0 ? this[a] : this[this.length + a])
                },
                length: 0,
                push: ld,
                sort: [].sort,
                splice: [].splice
            },
            Cd = {};
        f("multiple,selected,checked,disabled,readOnly,required,open".split(","),
            function(a) {
                Cd[bd(a)] = a
            });
        var Dd = {};
        f("input,select,option,textarea,button,form,details".split(","),
            function(a) {
                Dd[cd(a)] = !0
            }),
            f({
                    data: rb,
                    inheritedData: xb,
                    scope: function(a) {
                        return gd(a).data("$scope") || xb(a.parentNode || a, ["$isolateScope", "$scope"])
                    },
                    isolateScope: function(a) {
                        return gd(a).data("$isolateScope") || gd(a).data("$isolateScopeNoTemplate")
                    },
                    controller: wb,
                    injector: function(a) {
                        return xb(a, "$injector")
                    },
                    removeAttr: function(a, b) {
                        a.removeAttribute(b)
                    },
                    hasClass: sb,
                    css: function(a, b, d) {
                        if (b = jb(b), !s(d)) {
                            var e;
                            return 8 >= fd && (e = a.currentStyle && a.currentStyle[b], "" === e && (e = "auto")),
                                e = e || a.style[b],
                                8 >= fd && (e = "" === e ? c: e),
                                e
                        }
                        a.style[b] = d
                    },
                    attr: function(a, b, d) {
                        var e = bd(b);
                        if (Cd[e]) {
                            if (!s(d)) return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e: c;
                            d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
                        } else if (s(d)) a.setAttribute(b, d);
                        else if (a.getAttribute) {
                            var f = a.getAttribute(b, 2);
                            return null === f ? c: f
                        }
                    },
                    prop: function(a, b, c) {
                        return s(c) ? void(a[b] = c) : a[b]
                    },
                    text: function() {
                        function a(a, c) {
                            var d = b[a.nodeType];
                            return r(c) ? d ? a[d] : "": void(a[d] = c)
                        }
                        var b = [];
                        return 9 > fd ? (b[1] = "innerText", b[3] = "nodeValue") : b[1] = b[3] = "textContent",
                            a.$dv = "",
                            a
                    } (),
                    val: function(a, b) {
                        if (r(b)) {
                            if ("SELECT" === jd(a) && a.multiple) {
                                var c = [];
                                return f(a.options,
                                    function(a) {
                                        a.selected && c.push(a.value || a.text)
                                    }),
                                        0 === c.length ? null: c
                            }
                            return a.value
                        }
                        a.value = b
                    },
                    html: function(a, b) {
                        if (r(b)) return a.innerHTML;
                        for (var c = 0, d = a.childNodes; c < d.length; c++) nb(d[c]);
                        a.innerHTML = b
                    },
                    empty: yb
                },
                function(a, b) {
                    lb.prototype[b] = function(b, d) {
                        var e,
                            f;
                        if (a !== yb && (2 == a.length && a !== sb && a !== wb ? b: d) === c) {
                            if (t(b)) {
                                for (e = 0; e < this.length; e++) if (a === rb) a(this[e], b);
                                else for (f in b) a(this[e], f, b[f]);
                                return this
                            }
                            for (var g = a.$dv, h = g === c ? Math.min(this.length, 1) : this.length, i = 0; h > i; i++) {
                                var j = a(this[i], b, d);
                                g = g ? g + j: j
                            }
                            return g
                        }
                        for (e = 0; e < this.length; e++) a(this[e], b, d);
                        return this
                    }
                }),
            f({
                    removeData: pb,
                    dealoc: nb,
                    on: function ff(a, c, d, e) {
                        if (s(e)) throw Ad("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
                        var g = qb(a, "events"),
                            h = qb(a, "handle");
                        g || qb(a, "events", g = {}),
                            h || qb(a, "handle", h = Ab(a, g)),
                            f(c.split(" "),
                                function(c) {
                                    var e = g[c];
                                    if (!e) {
                                        if ("mouseenter" == c || "mouseleave" == c) {
                                            var f = b.body.contains || b.body.compareDocumentPosition ?
                                                function(a, b) {
                                                    var c = 9 === a.nodeType ? a.documentElement: a,
                                                        d = b && b.parentNode;
                                                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                                                }: function(a, b) {
                                                if (b) for (; b = b.parentNode;) if (b === a) return ! 0;
                                                return ! 1
                                            };
                                            g[c] = [];
                                            var i = {
                                                mouseleave: "mouseout",
                                                mouseenter: "mouseover"
                                            };
                                            ff(a, i[c],
                                                function(a) {
                                                    var b = this,
                                                        d = a.relatedTarget; (!d || d !== b && !f(b, d)) && h(a, c)
                                                })
                                        } else wd(a, c, h),
                                            g[c] = [];
                                        e = g[c]
                                    }
                                    e.push(d)
                                })
                    },
                    off: ob,
                    replaceWith: function(a, b) {
                        var c,
                            d = a.parentNode;
                        nb(a),
                            f(new lb(b),
                                function(b) {
                                    c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a),
                                        c = b
                                })
                    },
                    children: function(a) {
                        var b = [];
                        return f(a.childNodes,
                            function(a) {
                                1 === a.nodeType && b.push(a)
                            }),
                            b
                    },
                    contents: function(a) {
                        return a.childNodes || []
                    },
                    append: function(a, b) {
                        f(new lb(b),
                            function(b) { (1 === a.nodeType || 11 === a.nodeType) && a.appendChild(b)
                            })
                    },
                    prepend: function(a, b) {
                        if (1 === a.nodeType) {
                            var c = a.firstChild;
                            f(new lb(b),
                                function(b) {
                                    a.insertBefore(b, c)
                                })
                        }
                    },
                    wrap: function(a, b) {
                        b = gd(b)[0];
                        var c = a.parentNode;
                        c && c.replaceChild(b, a),
                            b.appendChild(a)
                    },
                    remove: function(a) {
                        nb(a);
                        var b = a.parentNode;
                        b && b.removeChild(a)
                    },
                    after: function(a, b) {
                        var c = a,
                            d = a.parentNode;
                        f(new lb(b),
                            function(a) {
                                d.insertBefore(a, c.nextSibling),
                                    c = a
                            })
                    },
                    addClass: ub,
                    removeClass: tb,
                    toggleClass: function(a, b, c) {
                        r(c) && (c = !sb(a, b)),
                            (c ? ub: tb)(a, b)
                    },
                    parent: function(a) {
                        var b = a.parentNode;
                        return b && 11 !== b.nodeType ? b: null
                    },
                    next: function(a) {
                        if (a.nextElementSibling) return a.nextElementSibling;
                        for (var b = a.nextSibling; null != b && 1 !== b.nodeType;) b = b.nextSibling;
                        return b
                    },
                    find: function(a, b) {
                        return a.getElementsByTagName ? a.getElementsByTagName(b) : []
                    },
                    clone: mb,
                    triggerHandler: function(a, b, c) {
                        var d = (qb(a, "events") || {})[b];
                        c = c || [];
                        var e = [{
                            preventDefault: o,
                            stopPropagation: o
                        }];
                        f(d,
                            function(b) {
                                b.apply(a, e.concat(c))
                            })
                    }
                },
                function(a, b) {
                    lb.prototype[b] = function(b, c, d) {
                        for (var e, f = 0; f < this.length; f++) r(e) ? (e = a(this[f], b, c, d), s(e) && (e = gd(e))) : vb(e, a(this[f], b, c, d));
                        return s(e) ? e: this
                    },
                        lb.prototype.bind = lb.prototype.on,
                        lb.prototype.unbind = lb.prototype.off
                }),
            Cb.prototype = {
                put: function(a, b) {
                    this[Bb(a)] = b
                },
                get: function(a) {
                    return this[Bb(a)]
                },
                remove: function(a) {
                    var b = this[a = Bb(a)];
                    return delete this[a],
                        b
                }
            };
        var Ed = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
            Fd = /,/,
            Gd = /^\s*(_?)(\S+?)\1\s*$/,
            Hd = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
            Id = d("$injector"),
            Jd = d("$animate"),
            Kd = ["$provide",
                function(a) {
                    this.$$selectors = {},
                        this.register = function(b, c) {
                            var d = b + "-animation";
                            if (b && "." != b.charAt(0)) throw Jd("notcsel", "Expecting class selector starting with '.' got '{0}'.", b);
                            this.$$selectors[b.substr(1)] = d,
                                a.factory(d, c)
                        },
                        this.$get = ["$timeout",
                            function(a) {
                                return {
                                    enter: function(b, c, d, e) {
                                        d ? d.after(b) : (c && c[0] || (c = d.parent()), c.append(b)),
                                            e && a(e, 0, !1)
                                    },
                                    leave: function(b, c) {
                                        b.remove(),
                                            c && a(c, 0, !1)
                                    },
                                    move: function(a, b, c, d) {
                                        this.enter(a, b, c, d)
                                    },
                                    addClass: function(b, c, d) {
                                        c = u(c) ? c: x(c) ? c.join(" ") : "",
                                            f(b,
                                                function(a) {
                                                    ub(a, c)
                                                }),
                                            d && a(d, 0, !1)
                                    },
                                    removeClass: function(b, c, d) {
                                        c = u(c) ? c: x(c) ? c.join(" ") : "",
                                            f(b,
                                                function(a) {
                                                    tb(a, c)
                                                }),
                                            d && a(d, 0, !1)
                                    },
                                    enabled: o
                                }
                            }]
                }],
            Ld = d("$compile");
        Kb.$inject = ["$provide", "$$sanitizeUriProvider"];
        var Md = /^(x[\:\-_]|data[\:\-_])/i,
            Nd = a.XMLHttpRequest ||
                function() {
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                    } catch(a) {}
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                    } catch(b) {}
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP")
                    } catch(c) {}
                    throw d("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
                },
            Od = d("$interpolate"),
            Pd = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
            Qd = {
                http: 80,
                https: 443,
                ftp: 21
            },
            Rd = d("$location");
        hc.prototype = gc.prototype = fc.prototype = {
            $$html5: !1,
            $$replace: !1,
            absUrl: ic("$$absUrl"),
            url: function(a, b) {
                if (r(a)) return this.$$url;
                var c = Pd.exec(a);
                return c[1] && this.path(decodeURIComponent(c[1])),
                    (c[2] || c[1]) && this.search(c[3] || ""),
                    this.hash(c[5] || "", b),
                    this
            },
            protocol: ic("$$protocol"),
            host: ic("$$host"),
            port: ic("$$port"),
            path: jc("$$path",
                function(a) {
                    return "/" == a.charAt(0) ? a: "/" + a
                }),
            search: function(a, b) {
                switch (arguments.length) {
                    case 0:
                        return this.$$search;
                    case 1:
                        if (u(a)) this.$$search = V(a);
                        else {
                            if (!t(a)) throw Rd("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                            this.$$search = a
                        }
                        break;
                    default:
                        r(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
                }
                return this.$$compose(),
                    this
            },
            hash: jc("$$hash", p),
            replace: function() {
                return this.$$replace = !0,
                    this
            }
        };
        var Sd,
            Td = d("$parse"),
            Ud = {},
            Vd = {
                "null": function() {
                    return null
                },
                "true": function() {
                    return ! 0
                },
                "false": function() {
                    return ! 1
                },
                undefined: o,
                "+": function(a, b, d, e) {
                    return d = d(a, b),
                        e = e(a, b),
                        s(d) ? s(e) ? d + e: d: s(e) ? e: c
                },
                "-": function(a, b, c, d) {
                    return c = c(a, b),
                        d = d(a, b),
                        (s(c) ? c: 0) - (s(d) ? d: 0)
                },
                "*": function(a, b, c, d) {
                    return c(a, b) * d(a, b)
                },
                "/": function(a, b, c, d) {
                    return c(a, b) / d(a, b)
                },
                "%": function(a, b, c, d) {
                    return c(a, b) % d(a, b)
                },
                "^": function(a, b, c, d) {
                    return c(a, b) ^ d(a, b)
                },
                "=": o,
                "===": function(a, b, c, d) {
                    return c(a, b) === d(a, b)
                },
                "!==": function(a, b, c, d) {
                    return c(a, b) !== d(a, b)
                },
                "==": function(a, b, c, d) {
                    return c(a, b) == d(a, b)
                },
                "!=": function(a, b, c, d) {
                    return c(a, b) != d(a, b)
                },
                "<": function(a, b, c, d) {
                    return c(a, b) < d(a, b)
                },
                ">": function(a, b, c, d) {
                    return c(a, b) > d(a, b)
                },
                "<=": function(a, b, c, d) {
                    return c(a, b) <= d(a, b)
                },
                ">=": function(a, b, c, d) {
                    return c(a, b) >= d(a, b)
                },
                "&&": function(a, b, c, d) {
                    return c(a, b) && d(a, b)
                },
                "||": function(a, b, c, d) {
                    return c(a, b) || d(a, b)
                },
                "&": function(a, b, c, d) {
                    return c(a, b) & d(a, b)
                },
                "|": function(a, b, c, d) {
                    return d(a, b)(a, b, c(a, b))
                },
                "!": function(a, b, c) {
                    return ! c(a, b)
                }
            },
            Wd = {
                n: "\n",
                f: "\f",
                r: "\r",
                t: "	",
                v: "",
                "'": "'",
                '"': '"'
            },
            Xd = function(a) {
                this.options = a
            };
        Xd.prototype = {
            constructor: Xd,
            lex: function(a) {
                this.text = a,
                    this.index = 0,
                    this.ch = c,
                    this.lastCh = ":",
                    this.tokens = [];
                for (var b, d = []; this.index < this.text.length;) {
                    if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
                    else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
                    else if (this.isIdent(this.ch)) this.readIdent(),
                        this.was("{,") && "{" === d[0] && (b = this.tokens[this.tokens.length - 1]) && (b.json = -1 === b.text.indexOf("."));
                    else if (this.is("(){}[].,;:?")) this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        json: this.was(":[,") && this.is("{[") || this.is("}]:,")
                    }),
                        this.is("{[") && d.unshift(this.ch),
                        this.is("}]") && d.shift(),
                        this.index++;
                    else {
                        if (this.isWhitespace(this.ch)) {
                            this.index++;
                            continue
                        }
                        var e = this.ch + this.peek(),
                            f = e + this.peek(2),
                            g = Vd[this.ch],
                            h = Vd[e],
                            i = Vd[f];
                        i ? (this.tokens.push({
                            index: this.index,
                            text: f,
                            fn: i
                        }), this.index += 3) : h ? (this.tokens.push({
                            index: this.index,
                            text: e,
                            fn: h
                        }), this.index += 2) : g ? (this.tokens.push({
                            index: this.index,
                            text: this.ch,
                            fn: g,
                            json: this.was("[,:") && this.is("+-")
                        }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                    }
                    this.lastCh = this.ch
                }
                return this.tokens
            },
            is: function(a) {
                return - 1 !== a.indexOf(this.ch)
            },
            was: function(a) {
                return - 1 !== a.indexOf(this.lastCh)
            },
            peek: function(a) {
                var b = a || 1;
                return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
            },
            isNumber: function(a) {
                return a >= "0" && "9" >= a
            },
            isWhitespace: function(a) {
                return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
            },
            isIdent: function(a) {
                return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
            },
            isExpOperator: function(a) {
                return "-" === a || "+" === a || this.isNumber(a)
            },
            throwError: function(a, b, c) {
                c = c || this.index;
                var d = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]": " " + c;
                throw Td("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
            },
            readNumber: function() {
                for (var a = "", b = this.index; this.index < this.text.length;) {
                    var c = bd(this.text.charAt(this.index));
                    if ("." == c || this.isNumber(c)) a += c;
                    else {
                        var d = this.peek();
                        if ("e" == c && this.isExpOperator(d)) a += c;
                        else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c;
                        else {
                            if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
                            this.throwError("Invalid exponent")
                        }
                    }
                    this.index++
                }
                a = 1 * a,
                    this.tokens.push({
                        index: b,
                        text: a,
                        json: !0,
                        fn: function() {
                            return a
                        }
                    })
            },
            readIdent: function() {
                for (var a, b, c, d, e = this, f = "", g = this.index; this.index < this.text.length && (d = this.text.charAt(this.index), "." === d || this.isIdent(d) || this.isNumber(d));)"." === d && (a = this.index),
                    f += d,
                    this.index++;
                if (a) for (b = this.index; b < this.text.length;) {
                    if (d = this.text.charAt(b), "(" === d) {
                        c = f.substr(a - g + 1),
                            f = f.substr(0, a - g),
                            this.index = b;
                        break
                    }
                    if (!this.isWhitespace(d)) break;
                    b++
                }
                var h = {
                    index: g,
                    text: f
                };
                if (Vd.hasOwnProperty(f)) h.fn = Vd[f],
                    h.json = Vd[f];
                else {
                    var i = qc(f, this.options, this.text);
                    h.fn = l(function(a, b) {
                            return i(a, b)
                        },
                        {
                            assign: function(a, b) {
                                return oc(a, f, b, e.text, e.options)
                            }
                        })
                }
                this.tokens.push(h),
                    c && (this.tokens.push({
                    index: a,
                    text: ".",
                    json: !1
                }), this.tokens.push({
                    index: a + 1,
                    text: c,
                    json: !1
                }))
            },
            readString: function(a) {
                var b = this.index;
                this.index++;
                for (var c = "", d = a, e = !1; this.index < this.text.length;) {
                    var f = this.text.charAt(this.index);
                    if (d += f, e) {
                        if ("u" === f) {
                            var g = this.text.substring(this.index + 1, this.index + 5);
                            g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"),
                                this.index += 4,
                                c += String.fromCharCode(parseInt(g, 16))
                        } else {
                            var h = Wd[f];
                            c += h ? h: f
                        }
                        e = !1
                    } else if ("\\" === f) e = !0;
                    else {
                        if (f === a) return this.index++,
                            void this.tokens.push({
                                index: b,
                                text: d,
                                string: c,
                                json: !0,
                                fn: function() {
                                    return c
                                }
                            });
                        c += f
                    }
                    this.index++
                }
                this.throwError("Unterminated quote", b)
            }
        };
        var Yd = function(a, b, c) {
            this.lexer = a,
                this.$filter = b,
                this.options = c
        };
        Yd.ZERO = function() {
            return 0
        },
            Yd.prototype = {
                constructor: Yd,
                parse: function(a, b) {
                    this.text = a,
                        this.json = b,
                        this.tokens = this.lexer.lex(a),
                        b && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function() {
                        this.throwError("is not valid json", {
                            text: a,
                            index: 0
                        })
                    });
                    var c = b ? this.primary() : this.statements();
                    return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]),
                        c.literal = !!c.literal,
                        c.constant = !!c.constant,
                        c
                },
                primary: function() {
                    var a;
                    if (this.expect("(")) a = this.filterChain(),
                        this.consume(")");
                    else if (this.expect("[")) a = this.arrayDeclaration();
                    else if (this.expect("{")) a = this.object();
                    else {
                        var b = this.expect();
                        a = b.fn,
                            a || this.throwError("not a primary expression", b),
                            b.json && (a.constant = !0, a.literal = !0)
                    }
                    for (var c, d; c = this.expect("(", "[", ".");)"(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
                    return a
                },
                throwError: function(a, b) {
                    throw Td("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
                },
                peekToken: function() {
                    if (0 === this.tokens.length) throw Td("ueoe", "Unexpected end of expression: {0}", this.text);
                    return this.tokens[0]
                },
                peek: function(a, b, c, d) {
                    if (this.tokens.length > 0) {
                        var e = this.tokens[0],
                            f = e.text;
                        if (f === a || f === b || f === c || f === d || !a && !b && !c && !d) return e
                    }
                    return ! 1
                },
                expect: function(a, b, c, d) {
                    var e = this.peek(a, b, c, d);
                    return e ? (this.json && !e.json && this.throwError("is not valid json", e), this.tokens.shift(), e) : !1
                },
                consume: function(a) {
                    this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
                },
                unaryFn: function(a, b) {
                    return l(function(c, d) {
                            return a(c, d, b)
                        },
                        {
                            constant: b.constant
                        })
                },
                ternaryFn: function(a, b, c) {
                    return l(function(d, e) {
                            return a(d, e) ? b(d, e) : c(d, e)
                        },
                        {
                            constant: a.constant && b.constant && c.constant
                        })
                },
                binaryFn: function(a, b, c) {
                    return l(function(d, e) {
                            return b(d, e, a, c)
                        },
                        {
                            constant: a.constant && c.constant
                        })
                },
                statements: function() {
                    for (var a = [];;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function(b, c) {
                        for (var d, e = 0; e < a.length; e++) {
                            var f = a[e];
                            f && (d = f(b, c))
                        }
                        return d
                    }
                },
                filterChain: function() {
                    for (var a, b = this.expression();;) {
                        if (! (a = this.expect("|"))) return b;
                        b = this.binaryFn(b, a.fn, this.filter())
                    }
                },
                filter: function() {
                    for (var a = this.expect(), b = this.$filter(a.text), c = [];;) {
                        if (! (a = this.expect(":"))) {
                            var d = function(a, d, e) {
                                for (var f = [e], g = 0; g < c.length; g++) f.push(c[g](a, d));
                                return b.apply(a, f)
                            };
                            return function() {
                                return d
                            }
                        }
                        c.push(this.expression())
                    }
                },
                expression: function() {
                    return this.assignment()
                },
                assignment: function() {
                    var a,
                        b,
                        c = this.ternary();
                    return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(),
                        function(b, d) {
                            return c.assign(b, a(b, d), d)
                        }) : c
                },
                ternary: function() {
                    var a,
                        b,
                        c = this.logicalOR();
                    return (b = this.expect("?")) ? (a = this.ternary(), (b = this.expect(":")) ? this.ternaryFn(c, a, this.ternary()) : void this.throwError("expected :", b)) : c
                },
                logicalOR: function() {
                    for (var a, b = this.logicalAND();;) {
                        if (! (a = this.expect("||"))) return b;
                        b = this.binaryFn(b, a.fn, this.logicalAND())
                    }
                },
                logicalAND: function() {
                    var a,
                        b = this.equality();
                    return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND())),
                        b
                },
                equality: function() {
                    var a,
                        b = this.relational();
                    return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())),
                        b
                },
                relational: function() {
                    var a,
                        b = this.additive();
                    return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())),
                        b
                },
                additive: function() {
                    for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = this.binaryFn(b, a.fn, this.multiplicative());
                    return b
                },
                multiplicative: function() {
                    for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = this.binaryFn(b, a.fn, this.unary());
                    return b
                },
                unary: function() {
                    var a;
                    return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(Yd.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()

                },
                fieldAccess: function(a) {
                    var b = this,
                        c = this.expect().text,
                        d = qc(c, this.options, this.text);
                    return l(function(b, c, e) {
                            return d(e || a(b, c), c)
                        },
                        {
                            assign: function(d, e, f) {
                                return oc(a(d, f), c, e, b.text, b.options)
                            }
                        })
                },
                objectIndex: function(a) {
                    var b = this,
                        d = this.expression();
                    return this.consume("]"),
                        l(function(e, f) {
                                var g,
                                    h,
                                    i = a(e, f),
                                    j = d(e, f);
                                return i ? (g = nc(i[j], b.text), g && g.then && b.options.unwrapPromises && (h = g, "$$v" in g || (h.$$v = c, h.then(function(a) {
                                    h.$$v = a
                                })), g = g.$$v), g) : c
                            },
                            {
                                assign: function(c, e, f) {
                                    var g = d(c, f),
                                        h = nc(a(c, f), b.text);
                                    return h[g] = e
                                }
                            })
                },
                functionCall: function(a, b) {
                    var c = [];
                    if (")" !== this.peekToken().text) do c.push(this.expression());
                    while (this.expect(","));
                    this.consume(")");
                    var d = this;
                    return function(e, f) {
                        for (var g = [], h = b ? b(e, f) : e, i = 0; i < c.length; i++) g.push(c[i](e, f));
                        var j = a(e, f, h) || o;
                        nc(h, d.text),
                            nc(j, d.text);
                        var k = j.apply ? j.apply(h, g) : j(g[0], g[1], g[2], g[3], g[4]);
                        return nc(k, d.text)
                    }
                },
                arrayDeclaration: function() {
                    var a = [],
                        b = !0;
                    if ("]" !== this.peekToken().text) do {
                        var c = this.expression();
                        a.push(c),
                            c.constant || (b = !1)
                    }
                    while (this.expect(","));
                    return this.consume("]"),
                        l(function(b, c) {
                                for (var d = [], e = 0; e < a.length; e++) d.push(a[e](b, c));
                                return d
                            },
                            {
                                literal: !0,
                                constant: b
                            })
                },
                object: function() {
                    var a = [],
                        b = !0;
                    if ("}" !== this.peekToken().text) do {
                        var c = this.expect(),
                            d = c.string || c.text;
                        this.consume(":");
                        var e = this.expression();
                        a.push({
                            key: d,
                            value: e
                        }),
                            e.constant || (b = !1)
                    }
                    while (this.expect(","));
                    return this.consume("}"),
                        l(function(b, c) {
                                for (var d = {},
                                         e = 0; e < a.length; e++) {
                                    var f = a[e];
                                    d[f.key] = f.value(b, c)
                                }
                                return d
                            },
                            {
                                literal: !0,
                                constant: b
                            })
                }
            };
        var Zd = {},
            $d = d("$sce"),
            _d = {
                HTML: "html",
                CSS: "css",
                URL: "url",
                RESOURCE_URL: "resourceUrl",
                JS: "js"
            },
            ae = b.createElement("a"),
            be = Dc(a.location.href, !0);
        Gc.$inject = ["$provide"],
            Ic.$inject = ["$locale"],
            Jc.$inject = ["$locale"];
        var ce = ".",
            de = {
                yyyy: Mc("FullYear", 4),
                yy: Mc("FullYear", 2, 0, !0),
                y: Mc("FullYear", 1),
                MMMM: Nc("Month"),
                MMM: Nc("Month", !0),
                MM: Mc("Month", 2, 1),
                M: Mc("Month", 1, 1),
                dd: Mc("Date", 2),
                d: Mc("Date", 1),
                HH: Mc("Hours", 2),
                H: Mc("Hours", 1),
                hh: Mc("Hours", 2, -12),
                h: Mc("Hours", 1, -12),
                mm: Mc("Minutes", 2),
                m: Mc("Minutes", 1),
                ss: Mc("Seconds", 2),
                s: Mc("Seconds", 1),
                sss: Mc("Milliseconds", 3),
                EEEE: Nc("Day"),
                EEE: Nc("Day", !0),
                a: Pc,
                Z: Oc
            },
            ee = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
            fe = /^\-?\d+$/;
        Qc.$inject = ["$locale"];
        var ge = q(bd),
            he = q(cd);
        Tc.$inject = ["$parse"];
        var ie = q({
                restrict: "E",
                compile: function(a, c) {
                    return 8 >= fd && (c.href || c.name || c.$set("href", ""), a.append(b.createComment("IE fix"))),
                            c.href || c.name ? void 0: function(a, b) {
                        b.on("click",
                            function(a) {
                                b.attr("href") || a.preventDefault()
                            })
                    }
                }
            }),
            je = {};
        f(Cd,
            function(a, b) {
                if ("multiple" != a) {
                    var c = Lb("ng-" + b);
                    je[c] = function() {
                        return {
                            priority: 100,
                            compile: function() {
                                return function(a, d, e) {
                                    a.$watch(e[c],
                                        function(a) {
                                            e.$set(b, !!a)
                                        })
                                }
                            }
                        }
                    }
                }
            }),
            f(["src", "srcset", "href"],
                function(a) {
                    var b = Lb("ng-" + a);
                    je[b] = function() {
                        return {
                            priority: 99,
                            link: function(c, d, e) {
                                e.$observe(b,
                                    function(b) {
                                        b && (e.$set(a, b), fd && d.prop(a, e[a]))
                                    })
                            }
                        }
                    }
                });
        var ke = {
            $addControl: o,
            $removeControl: o,
            $setValidity: o,
            $setDirty: o,
            $setPristine: o
        };
        Vc.$inject = ["$element", "$attrs", "$scope"];
        var le = function(a) {
                return ["$timeout",
                    function(b) {
                        var d = {
                            name: "form",
                            restrict: a ? "EAC": "E",
                            controller: Vc,
                            compile: function() {
                                return {
                                    pre: function(a, d, e, f) {
                                        if (!e.action) {
                                            var g = function(a) {
                                                a.preventDefault ? a.preventDefault() : a.returnValue = !1
                                            };
                                            wd(d[0], "submit", g),
                                                d.on("$destroy",
                                                    function() {
                                                        b(function() {
                                                                xd(d[0], "submit", g)
                                                            },
                                                            0, !1)
                                                    })
                                        }
                                        var h = d.parent().controller("form"),
                                            i = e.name || e.ngForm;
                                        i && oc(a, i, f, i),
                                            h && d.on("$destroy",
                                            function() {
                                                h.$removeControl(f),
                                                    i && oc(a, i, c, i),
                                                    l(f, ke)
                                            })
                                    }
                                }
                            }
                        };
                        return d
                    }]
            },
            me = le(),
            ne = le(!0),
            oe = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
            pe = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
            qe = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
            re = {
                text: Wc,
                number: Xc,
                url: Yc,
                email: Zc,
                radio: $c,
                checkbox: _c,
                hidden: o,
                button: o,
                submit: o,
                reset: o
            },
            se = ["$browser", "$sniffer",
                function(a, b) {
                    return {
                        restrict: "E",
                        require: "?ngModel",
                        link: function(c, d, e, f) {
                            f && (re[bd(e.type)] || re.text)(c, d, e, f, b, a)
                        }
                    }
                }],
            te = "ng-valid",
            ue = "ng-invalid",
            ve = "ng-pristine",
            we = "ng-dirty",
            xe = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse",
                function(a, b, c, e, g) {
                    function h(a, b) {
                        b = b ? "-" + _(b, "-") : "",
                            e.removeClass((a ? ue: te) + b).addClass((a ? te: ue) + b)
                    }
                    this.$viewValue = Number.NaN,
                        this.$modelValue = Number.NaN,
                        this.$parsers = [],
                        this.$formatters = [],
                        this.$viewChangeListeners = [],
                        this.$pristine = !0,
                        this.$dirty = !1,
                        this.$valid = !0,
                        this.$invalid = !1,
                        this.$name = c.name;
                    var i = g(c.ngModel),
                        j = i.assign;
                    if (!j) throw d("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", c.ngModel, T(e));
                    this.$render = o,
                        this.$isEmpty = function(a) {
                            return r(a) || "" === a || null === a || a !== a
                        };
                    var k = e.inheritedData("$formController") || ke,
                        l = 0,
                        m = this.$error = {};
                    e.addClass(ve),
                        h(!0),
                        this.$setValidity = function(a, b) {
                            m[a] !== !b && (b ? (m[a] && l--, l || (h(!0), this.$valid = !0, this.$invalid = !1)) : (h(!1), this.$invalid = !0, this.$valid = !1, l++), m[a] = !b, h(b, a), k.$setValidity(a, b, this))
                        },
                        this.$setPristine = function() {
                            this.$dirty = !1,
                                this.$pristine = !0,
                                e.removeClass(we).addClass(ve)
                        },
                        this.$setViewValue = function(c) {
                            this.$viewValue = c,
                                this.$pristine && (this.$dirty = !0, this.$pristine = !1, e.removeClass(ve).addClass(we), k.$setDirty()),
                                f(this.$parsers,
                                    function(a) {
                                        c = a(c)
                                    }),
                                this.$modelValue !== c && (this.$modelValue = c, j(a, c), f(this.$viewChangeListeners,
                                function(a) {
                                    try {
                                        a()
                                    } catch(c) {
                                        b(c)
                                    }
                                }))
                        };
                    var n = this;
                    a.$watch(function() {
                        var b = i(a);
                        if (n.$modelValue !== b) {
                            var c = n.$formatters,
                                d = c.length;
                            for (n.$modelValue = b; d--;) b = c[d](b);
                            n.$viewValue !== b && (n.$viewValue = b, n.$render())
                        }
                        return b
                    })
                }],
            ye = function() {
                return {
                    require: ["ngModel", "^?form"],
                    controller: xe,
                    link: function(a, b, c, d) {
                        var e = d[0],
                            f = d[1] || ke;
                        f.$addControl(e),
                            a.$on("$destroy",
                                function() {
                                    f.$removeControl(e)
                                })
                    }
                }
            },
            ze = q({
                require: "ngModel",
                link: function(a, b, c, d) {
                    d.$viewChangeListeners.push(function() {
                        a.$eval(c.ngChange)
                    })
                }
            }),
            Ae = function() {
                return {
                    require: "?ngModel",
                    link: function(a, b, c, d) {
                        if (d) {
                            c.required = !0;
                            var e = function(a) {
                                return c.required && d.$isEmpty(a) ? void d.$setValidity("required", !1) : (d.$setValidity("required", !0), a)
                            };
                            d.$formatters.push(e),
                                d.$parsers.unshift(e),
                                c.$observe("required",
                                    function() {
                                        e(d.$viewValue)
                                    })
                        }
                    }
                }
            },
            Be = function() {
                return {
                    require: "ngModel",
                    link: function(a, b, d, e) {
                        var g = /\/(.*)\//.exec(d.ngList),
                            h = g && new RegExp(g[1]) || d.ngList || ",",
                            i = function(a) {
                                if (!r(a)) {
                                    var b = [];
                                    return a && f(a.split(h),
                                        function(a) {
                                            a && b.push(qd(a))
                                        }),
                                        b
                                }
                            };
                        e.$parsers.push(i),
                            e.$formatters.push(function(a) {
                                return x(a) ? a.join(", ") : c
                            }),
                            e.$isEmpty = function(a) {
                                return ! a || !a.length
                            }
                    }
                }
            },
            Ce = /^(true|false|\d+)$/,
            De = function() {
                return {
                    priority: 100,
                    compile: function(a, b) {
                        return Ce.test(b.ngValue) ?
                            function(a, b, c) {
                                c.$set("value", a.$eval(c.ngValue))
                            }: function(a, b, c) {
                            a.$watch(c.ngValue,
                                function(a) {
                                    c.$set("value", a)
                                })
                        }
                    }
                }
            },
            Ee = Uc(function(a, b, d) {
                b.addClass("ng-binding").data("$binding", d.ngBind),
                    a.$watch(d.ngBind,
                        function(a) {
                            b.text(a == c ? "": a)
                        })
            }),
            Fe = ["$interpolate",
                function(a) {
                    return function(b, c, d) {
                        var e = a(c.attr(d.$attr.ngBindTemplate));
                        c.addClass("ng-binding").data("$binding", e),
                            d.$observe("ngBindTemplate",
                                function(a) {
                                    c.text(a)
                                })
                    }
                }],
            Ge = ["$sce", "$parse",
                function(a, b) {
                    return function(c, d, e) {
                        function f() {
                            return (g(c) || "").toString()
                        }
                        d.addClass("ng-binding").data("$binding", e.ngBindHtml);
                        var g = b(e.ngBindHtml);
                        c.$watch(f,
                            function() {
                                d.html(a.getTrustedHtml(g(c)) || "")
                            })
                    }
                }],
            He = ad("", !0),
            Ie = ad("Odd", 0),
            Je = ad("Even", 1),
            Ke = Uc({
                compile: function(a, b) {
                    b.$set("ngCloak", c),
                        a.removeClass("ng-cloak")
                }
            }),
            Le = [function() {
                return {
                    scope: !0,
                    controller: "@",
                    priority: 500
                }
            }],
            Me = {};
        f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
            function(a) {
                var b = Lb("ng-" + a);
                Me[b] = ["$parse",
                    function(c) {
                        return {
                            compile: function(d, e) {
                                var f = c(e[b]);
                                return function(b, c) {
                                    c.on(bd(a),
                                        function(a) {
                                            b.$apply(function() {
                                                f(b, {
                                                    $event: a
                                                })
                                            })
                                        })
                                }
                            }
                        }
                    }]
            });
        var Ne = ["$animate",
                function(a) {
                    return {
                        transclude: "element",
                        priority: 600,
                        terminal: !0,
                        restrict: "A",
                        $$tlb: !0,
                        link: function(c, d, e, f, g) {
                            var h,
                                i;
                            c.$watch(e.ngIf,
                                function(f) {
                                    S(f) ? i || (i = c.$new(), g(i,
                                        function(c) {
                                            c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "),
                                                h = {
                                                    clone: c
                                                },
                                                a.enter(c, d.parent(), d)
                                        })) : (i && (i.$destroy(), i = null), h && (a.leave(fb(h.clone)), h = null))
                                })
                        }
                    }
                }],
            Oe = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce",
                function(a, b, c, d, e) {
                    return {
                        restrict: "ECA",
                        priority: 400,
                        terminal: !0,
                        transclude: "element",
                        controller: od.noop,
                        compile: function(f, g) {
                            var h = g.ngInclude || g.src,
                                i = g.onload || "",
                                j = g.autoscroll;
                            return function(f, g, k, l, m) {
                                var n,
                                    o,
                                    p = 0,
                                    q = function() {
                                        n && (n.$destroy(), n = null),
                                            o && (d.leave(o), o = null)
                                    };
                                f.$watch(e.parseAsResourceUrl(h),
                                    function(e) {
                                        var h = function() { ! s(j) || j && !f.$eval(j) || c()
                                            },
                                            k = ++p;
                                        e ? (a.get(e, {
                                            cache: b
                                        }).success(function(a) {
                                            if (k === p) {
                                                var b = f.$new();
                                                l.template = a;
                                                var c = m(b,
                                                    function(a) {
                                                        q(),
                                                            d.enter(a, null, g, h)
                                                    });
                                                n = b,
                                                    o = c,
                                                    n.$emit("$includeContentLoaded"),
                                                    f.$eval(i)
                                            }
                                        }).error(function() {
                                            k === p && q()
                                        }), f.$emit("$includeContentRequested")) : (q(), l.template = null)
                                    })
                            }
                        }
                    }
                }],
            Pe = ["$compile",
                function(a) {
                    return {
                        restrict: "ECA",
                        priority: -400,
                        require: "ngInclude",
                        link: function(b, c, d, e) {
                            c.html(e.template),
                                a(c.contents())(b)
                        }
                    }
                }],
            Qe = Uc({
                priority: 450,
                compile: function() {
                    return {
                        pre: function(a, b, c) {
                            a.$eval(c.ngInit)
                        }
                    }
                }
            }),
            Re = Uc({
                terminal: !0,
                priority: 1e3
            }),
            Se = ["$locale", "$interpolate",
                function(a, b) {
                    var c = /{}/g;
                    return {
                        restrict: "EA",
                        link: function(d, e, g) {
                            var h = g.count,
                                i = g.$attr.when && e.attr(g.$attr.when),
                                j = g.offset || 0,
                                k = d.$eval(i) || {},
                                l = {},
                                m = b.startSymbol(),
                                n = b.endSymbol(),
                                o = /^when(Minus)?(.+)$/;
                            f(g,
                                function(a, b) {
                                    o.test(b) && (k[bd(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
                                }),
                                f(k,
                                    function(a, d) {
                                        l[d] = b(a.replace(c, m + h + "-" + j + n))
                                    }),
                                d.$watch(function() {
                                        var b = parseFloat(d.$eval(h));
                                        return isNaN(b) ? "": (b in k || (b = a.pluralCat(b - j)), l[b](d, e, !0))
                                    },
                                    function(a) {
                                        e.text(a)
                                    })
                        }
                    }
                }],
            Te = ["$parse", "$animate",
                function(a, c) {
                    function g(a) {
                        return a.clone[0]
                    }
                    function h(a) {
                        return a.clone[a.clone.length - 1]
                    }
                    var i = "$$NG_REMOVED",
                        j = d("ngRepeat");
                    return {
                        transclude: "element",
                        priority: 1e3,
                        terminal: !0,
                        $$tlb: !0,
                        link: function(d, k, l, m, n) {
                            var o,
                                p,
                                q,
                                r,
                                s,
                                t,
                                u,
                                v,
                                w,
                                x = l.ngRepeat,
                                y = x.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
                                z = {
                                    $id: Bb
                                };
                            if (!y) throw j("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", x);
                            if (t = y[1], u = y[2], o = y[4], o ? (p = a(o), q = function(a, b, c) {
                                return w && (z[w] = a),
                                    z[v] = b,
                                    z.$index = c,
                                    p(d, z)
                            }) : (r = function(a, b) {
                                return Bb(b)
                            },
                                s = function(a) {
                                    return a
                                }), y = t.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !y) throw j("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", t);
                            v = y[3] || y[1],
                                w = y[2];
                            var A = {};
                            d.$watchCollection(u,
                                function(a) {
                                    var l,
                                        m,
                                        o,
                                        p,
                                        t,
                                        u,
                                        y,
                                        z,
                                        B,
                                        C,
                                        D,
                                        E,
                                        F = k[0],
                                        G = {},
                                        H = [];
                                    if (e(a)) C = a,
                                        B = q || r;
                                    else {
                                        B = q || s,
                                            C = [];
                                        for (u in a) a.hasOwnProperty(u) && "$" != u.charAt(0) && C.push(u);
                                        C.sort()
                                    }
                                    for (p = C.length, m = H.length = C.length, l = 0; m > l; l++) if (u = a === C ? l: C[l], y = a[u], z = B(u, y, l), db(z, "`track by` id"), A.hasOwnProperty(z)) D = A[z],
                                        delete A[z],
                                        G[z] = D,
                                        H[l] = D;
                                    else {
                                        if (G.hasOwnProperty(z)) throw f(H,
                                            function(a) {
                                                a && a.scope && (A[a.id] = a)
                                            }),
                                            j("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", x, z);
                                        H[l] = {
                                            id: z
                                        },
                                            G[z] = !1
                                    }
                                    for (u in A) A.hasOwnProperty(u) && (D = A[u], E = fb(D.clone), c.leave(E), f(E,
                                        function(a) {
                                            a[i] = !0
                                        }), D.scope.$destroy());
                                    for (l = 0, m = C.length; m > l; l++) {
                                        if (u = a === C ? l: C[l], y = a[u], D = H[l], H[l - 1] && (F = h(H[l - 1])), D.scope) {
                                            t = D.scope,
                                                o = F;
                                            do o = o.nextSibling;
                                            while (o && o[i]);
                                            g(D) != o && c.move(fb(D.clone), null, gd(F)),
                                                F = h(D)
                                        } else t = d.$new();
                                        t[v] = y,
                                            w && (t[w] = u),
                                            t.$index = l,
                                            t.$first = 0 === l,
                                            t.$last = l === p - 1,
                                            t.$middle = !(t.$first || t.$last),
                                            t.$odd = !(t.$even = 0 === (1 & l)),
                                            D.scope || n(t,
                                            function(a) {
                                                a[a.length++] = b.createComment(" end ngRepeat: " + x + " "),
                                                    c.enter(a, null, gd(F)),
                                                    F = a,
                                                    D.scope = t,
                                                    D.clone = a,
                                                    G[D.id] = D
                                            })
                                    }
                                    A = G
                                })
                        }
                    }
                }],
            Ue = ["$animate",
                function(a) {
                    return function(b, c, d) {
                        b.$watch(d.ngShow,
                            function(b) {
                                a[S(b) ? "removeClass": "addClass"](c, "ng-hide")
                            })
                    }
                }],
            Ve = ["$animate",
                function(a) {
                    return function(b, c, d) {
                        b.$watch(d.ngHide,
                            function(b) {
                                a[S(b) ? "addClass": "removeClass"](c, "ng-hide")
                            })
                    }
                }],
            We = Uc(function(a, b, c) {
                a.$watch(c.ngStyle,
                    function(a, c) {
                        c && a !== c && f(c,
                            function(a, c) {
                                b.css(c, "")
                            }),
                            a && b.css(a)
                    },
                    !0)
            }),
            Xe = ["$animate",
                function(a) {
                    return {
                        restrict: "EA",
                        require: "ngSwitch",
                        controller: ["$scope",
                            function() {
                                this.cases = {}
                            }],
                        link: function(b, c, d, e) {
                            var g,
                                h,
                                i = d.ngSwitch || d.on,
                                j = [];
                            b.$watch(i,
                                function(c) {
                                    for (var i = 0, k = j.length; k > i; i++) j[i].$destroy(),
                                        a.leave(h[i]);
                                    h = [],
                                        j = [],
                                        (g = e.cases["!" + c] || e.cases["?"]) && (b.$eval(d.change), f(g,
                                        function(c) {
                                            var d = b.$new();
                                            j.push(d),
                                                c.transclude(d,
                                                    function(b) {
                                                        var d = c.element;
                                                        h.push(b),
                                                            a.enter(b, d.parent(), d)
                                                    })
                                        }))
                                })
                        }
                    }
                }],
            Ye = Uc({
                transclude: "element",
                priority: 800,
                require: "^ngSwitch",
                compile: function(a, b) {
                    return function(a, c, d, e, f) {
                        e.cases["!" + b.ngSwitchWhen] = e.cases["!" + b.ngSwitchWhen] || [],
                            e.cases["!" + b.ngSwitchWhen].push({
                                transclude: f,
                                element: c
                            })
                    }
                }
            }),
            Ze = Uc({
                transclude: "element",
                priority: 800,
                require: "^ngSwitch",
                link: function(a, b, c, d, e) {
                    d.cases["?"] = d.cases["?"] || [],
                        d.cases["?"].push({
                            transclude: e,
                            element: b
                        })
                }
            }),
            $e = Uc({
                controller: ["$element", "$transclude",
                    function(a, b) {
                        if (!b) throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", T(a));
                        this.$transclude = b
                    }],
                link: function(a, b, c, d) {
                    d.$transclude(function(a) {
                        b.empty(),
                            b.append(a)
                    })
                }
            }),
            _e = ["$templateCache",
                function(a) {
                    return {
                        restrict: "E",
                        terminal: !0,
                        compile: function(b, c) {
                            if ("text/ng-template" == c.type) {
                                var d = c.id,
                                    e = b[0].text;
                                a.put(d, e)
                            }
                        }
                    }
                }],
            af = d("ngOptions"),
            bf = q({
                terminal: !0
            }),
            cf = ["$compile", "$parse",
                function(a, d) {
                    var e = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/,
                        h = {
                            $setViewValue: o
                        };
                    return {
                        restrict: "E",
                        require: ["select", "?ngModel"],
                        controller: ["$element", "$scope", "$attrs",
                            function(a, b, c) {
                                var d,
                                    e,
                                    f = this,
                                    g = {},
                                    i = h;
                                f.databound = c.ngModel,
                                    f.init = function(a, b, c) {
                                        i = a,
                                            d = b,
                                            e = c
                                    },
                                    f.addOption = function(b) {
                                        db(b, '"option value"'),
                                            g[b] = !0,
                                            i.$viewValue == b && (a.val(b), e.parent() && e.remove())
                                    },
                                    f.removeOption = function(a) {
                                        this.hasOption(a) && (delete g[a], i.$viewValue == a && this.renderUnknownOption(a))
                                    },
                                    f.renderUnknownOption = function(b) {
                                        var c = "? " + Bb(b) + " ?";
                                        e.val(c),
                                            a.prepend(e),
                                            a.val(c),
                                            e.prop("selected", !0)
                                    },
                                    f.hasOption = function(a) {
                                        return g.hasOwnProperty(a)
                                    },
                                    b.$on("$destroy",
                                        function() {
                                            f.renderUnknownOption = o
                                        })
                            }],
                        link: function(h, i, j, k) {
                            function l(a, b, c, d) {
                                c.$render = function() {
                                    var a = c.$viewValue;
                                    d.hasOption(a) ? (z.parent() && z.remove(), b.val(a), "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
                                },
                                    b.on("change",
                                        function() {
                                            a.$apply(function() {
                                                z.parent() && z.remove(),
                                                    c.$setViewValue(b.val())
                                            })
                                        })
                            }
                            function m(a, b, c) {
                                var d;
                                c.$render = function() {
                                    var a = new Cb(c.$viewValue);
                                    f(b.find("option"),
                                        function(b) {
                                            b.selected = s(a.get(b.value))
                                        })
                                },
                                    a.$watch(function() {
                                        K(d, c.$viewValue) || (d = I(c.$viewValue), c.$render())
                                    }),
                                    b.on("change",
                                        function() {
                                            a.$apply(function() {
                                                var a = [];
                                                f(b.find("option"),
                                                    function(b) {
                                                        b.selected && a.push(b.value)
                                                    }),
                                                    c.$setViewValue(a)
                                            })
                                        })
                            }
                            function n(b, f, h) {
                                function i() {
                                    var a,
                                        c,
                                        d,
                                        e,
                                        i,
                                        j,
                                        q,
                                        u,
                                        A,
                                        B,
                                        C,
                                        D,
                                        E,
                                        F,
                                        G,
                                        H = {
                                            "": []
                                        },
                                        I = [""],
                                        J = h.$modelValue,
                                        K = p(b) || [],
                                        L = m ? g(K) : K,
                                        M = {},
                                        N = !1;
                                    if (t) if (r && x(J)) {
                                        N = new Cb([]);
                                        for (var O = 0; O < J.length; O++) M[l] = J[O],
                                            N.put(r(b, M), J[O])
                                    } else N = new Cb(J);
                                    for (C = 0; A = L.length, A > C; C++) {
                                        if (q = C, m) {
                                            if (q = L[C], "$" === q.charAt(0)) continue;
                                            M[m] = q
                                        }
                                        if (M[l] = K[q], a = n(b, M) || "", (c = H[a]) || (c = H[a] = [], I.push(a)), t) D = s(N.remove(r ? r(b, M) : o(b, M)));
                                        else {
                                            if (r) {
                                                var P = {};
                                                P[l] = J,
                                                    D = r(b, P) === r(b, M)
                                            } else D = J === o(b, M);
                                            N = N || D
                                        }
                                        G = k(b, M),
                                            G = s(G) ? G: "",
                                            c.push({
                                                id: r ? r(b, M) : m ? L[C] : C,
                                                label: G,
                                                selected: D
                                            })
                                    }
                                    for (t || (v || null === J ? H[""].unshift({
                                        id: "",
                                        label: "",
                                        selected: !N
                                    }) : N || H[""].unshift({
                                        id: "?",
                                        label: "",
                                        selected: !0
                                    })), B = 0, u = I.length; u > B; B++) {
                                        for (a = I[B], c = H[a], z.length <= B ? (e = {
                                            element: y.clone().attr("label", a),
                                            label: c.label
                                        },
                                            i = [e], z.push(i), f.append(e.element)) : (i = z[B], e = i[0], e.label != a && e.element.attr("label", e.label = a)), E = null, C = 0, A = c.length; A > C; C++) d = c[C],
                                            (j = i[C + 1]) ? (E = j.element, j.label !== d.label && E.text(j.label = d.label), j.id !== d.id && E.val(j.id = d.id), E[0].selected !== d.selected && E.prop("selected", j.selected = d.selected)) : ("" === d.id && v ? F = v: (F = w.clone()).val(d.id).attr("selected", d.selected).text(d.label), i.push(j = {
                                                element: F,
                                                label: d.label,
                                                id: d.id,
                                                selected: d.selected
                                            }), E ? E.after(F) : e.element.append(F), E = F);
                                        for (C++; i.length > C;) i.pop().element.remove()
                                    }
                                    for (; z.length > B;) z.pop()[0].element.remove()
                                }
                                var j;
                                if (! (j = u.match(e))) throw af("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", u, T(f));
                                var k = d(j[2] || j[1]),
                                    l = j[4] || j[6],
                                    m = j[5],
                                    n = d(j[3] || ""),
                                    o = d(j[2] ? j[1] : l),
                                    p = d(j[7]),
                                    q = j[8],
                                    r = q ? d(j[8]) : null,
                                    z = [[{
                                        element: f,
                                        label: ""
                                    }]];
                                v && (a(v)(b), v.removeClass("ng-scope"), v.remove()),
                                    f.empty(),
                                    f.on("change",
                                        function() {
                                            b.$apply(function() {
                                                var a,
                                                    d,
                                                    e,
                                                    g,
                                                    i,
                                                    j,
                                                    k,
                                                    n,
                                                    q,
                                                    s = p(b) || [],
                                                    u = {};
                                                if (t) {
                                                    for (e = [], j = 0, n = z.length; n > j; j++) for (a = z[j], i = 1, k = a.length; k > i; i++) if ((g = a[i].element)[0].selected) {
                                                        if (d = g.val(), m && (u[m] = d), r) for (q = 0; q < s.length && (u[l] = s[q], r(b, u) != d); q++);
                                                        else u[l] = s[d];
                                                        e.push(o(b, u))
                                                    }
                                                } else if (d = f.val(), "?" == d) e = c;
                                                else if ("" === d) e = null;
                                                else if (r) {
                                                    for (q = 0; q < s.length; q++) if (u[l] = s[q], r(b, u) == d) {
                                                        e = o(b, u);
                                                        break
                                                    }
                                                } else u[l] = s[d],
                                                    m && (u[m] = d),
                                                    e = o(b, u);
                                                h.$setViewValue(e)
                                            })
                                        }),
                                    h.$render = i,
                                    b.$watch(i)
                            }
                            if (k[1]) {
                                for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = gd(b.createElement("option")), y = gd(b.createElement("optgroup")), z = w.clone(), A = 0, B = i.children(), C = B.length; C > A; A++) if ("" === B[A].value) {
                                    o = v = B.eq(A);
                                    break
                                }
                                if (p.init(q, v, z), t && (j.required || j.ngRequired)) {
                                    var D = function(a) {
                                        return q.$setValidity("required", !j.required || a && a.length),
                                            a
                                    };
                                    q.$parsers.push(D),
                                        q.$formatters.unshift(D),
                                        j.$observe("required",
                                            function() {
                                                D(q.$viewValue)
                                            })
                                }
                                u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
                            }
                        }
                    }
                }],
            df = ["$interpolate",
                function(a) {
                    var b = {
                        addOption: o,
                        removeOption: o
                    };
                    return {
                        restrict: "E",
                        priority: 100,
                        compile: function(c, d) {
                            if (r(d.value)) {
                                var e = a(c.text(), !0);
                                e || d.$set("value", c.text())
                            }
                            return function(a, c, d) {
                                var f = "$selectController",
                                    g = c.parent(),
                                    h = g.data(f) || g.parent().data(f);
                                h && h.databound ? c.prop("selected", !1) : h = b,
                                    e ? a.$watch(e,
                                        function(a, b) {
                                            d.$set("value", a),
                                                a !== b && h.removeOption(b),
                                                h.addOption(a)
                                        }) : h.addOption(d.value),
                                    c.on("$destroy",
                                        function() {
                                            h.removeOption(d.value)
                                        })
                            }
                        }
                    }
                }],
            ef = q({
                restrict: "E",
                terminal: !0
            });
        ab(),
            hb(od),
            gd(b).ready(function() {
                Z(b, $)
            })
    } (window, document),
    !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-start{border-spacing:1px 1px;-ms-zoom:1.0001;}.ng-animate-active{border-spacing:0px 0px;-ms-zoom:1;}</style>'),
    function(a, b) {
        "use strict";
        function c() {
            function a(a, c) {
                return b.extend(new(b.extend(function() {},
                    {
                        prototype: a
                    })), c)
            }
            function c(a, b) {
                var c = b.caseInsensitiveMatch,
                    d = {
                        originalPath: a,
                        regexp: a
                    },
                    e = d.keys = [];
                return a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g,
                    function(a, b, c, d) {
                        var f = "?" === d ? d: null,
                            g = "*" === d ? d: null;
                        return e.push({
                            name: c,
                            optional: !!f
                        }),
                            b = b || "",
                            "" + (f ? "": b) + "(?:" + (f ? b: "") + (g && "(.+?)" || "([^/]+)") + (f || "") + ")" + (f || "")
                    }).replace(/([\/$\*])/g, "\\$1"),
                    d.regexp = new RegExp("^" + a + "$", c ? "i": ""),
                    d
            }
            var d = {};
            this.when = function(a, e) {
                if (d[a] = b.extend({
                        reloadOnSearch: !0
                    },
                    e, a && c(a, e)), a) {
                    var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                    d[f] = b.extend({
                            redirectTo: a
                        },
                        c(f, e))
                }
                return this
            },
                this.otherwise = function(a) {
                    return this.when(null, a),
                        this
                },
                this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce",
                    function(c, e, f, g, h, i, j, k) {
                        function l(a, b) {
                            var c = b.keys,
                                d = {};
                            if (!b.regexp) return null;
                            var e = b.regexp.exec(a);
                            if (!e) return null;
                            for (var f = 1, g = e.length; g > f; ++f) {
                                var h = c[f - 1],
                                    i = "string" == typeof e[f] ? decodeURIComponent(e[f]) : e[f];
                                h && i && (d[h.name] = i)
                            }
                            return d
                        }
                        function m() {
                            var a = n(),
                                d = q.current;
                            a && d && a.$$route === d.$$route && b.equals(a.pathParams, d.pathParams) && !a.reloadOnSearch && !p ? (d.params = a.params, b.copy(d.params, f), c.$broadcast("$routeUpdate", d)) : (a || d) && (p = !1, c.$broadcast("$routeChangeStart", a, d), q.current = a, a && a.redirectTo && (b.isString(a.redirectTo) ? e.path(o(a.redirectTo, a.params)).search(a.params).replace() : e.url(a.redirectTo(a.pathParams, e.path(), e.search())).replace()), g.when(a).then(function() {
                                if (a) {
                                    var c,
                                        d,
                                        e = b.extend({},
                                            a.resolve);
                                    return b.forEach(e,
                                        function(a, c) {
                                            e[c] = b.isString(a) ? h.get(a) : h.invoke(a)
                                        }),
                                        b.isDefined(c = a.template) ? b.isFunction(c) && (c = c(a.params)) : b.isDefined(d = a.templateUrl) && (b.isFunction(d) && (d = d(a.params)), d = k.getTrustedResourceUrl(d), b.isDefined(d) && (a.loadedTemplateUrl = d, c = i.get(d, {
                                            cache: j
                                        }).then(function(a) {
                                            return a.data
                                        }))),
                                        b.isDefined(c) && (e.$template = c),
                                        g.all(e)
                                }
                            }).then(function(e) {
                                    a == q.current && (a && (a.locals = e, b.copy(a.params, f)), c.$broadcast("$routeChangeSuccess", a, d))
                                },
                                function(b) {
                                    a == q.current && c.$broadcast("$routeChangeError", a, d, b)
                                }))
                        }
                        function n() {
                            var c,
                                f;
                            return b.forEach(d,
                                function(d) { ! f && (c = l(e.path(), d)) && (f = a(d, {
                                    params: b.extend({},
                                        e.search(), c),
                                    pathParams: c
                                }), f.$$route = d)
                                }),
                                f || d[null] && a(d[null], {
                                params: {},
                                pathParams: {}
                            })
                        }
                        function o(a, c) {
                            var d = [];
                            return b.forEach((a || "").split(":"),
                                function(a, b) {
                                    if (0 === b) d.push(a);
                                    else {
                                        var e = a.match(/(\w+)(.*)/),
                                            f = e[1];
                                        d.push(c[f]),
                                            d.push(e[2] || ""),
                                            delete c[f]
                                    }
                                }),
                                d.join("")
                        }
                        var p = !1,
                            q = {
                                routes: d,
                                reload: function() {
                                    p = !0,
                                        c.$evalAsync(m)
                                }
                            };
                        return c.$on("$locationChangeSuccess", m),
                            q
                    }]
        }
        function d() {
            this.$get = function() {
                return {}
            }
        }
        function e(a, c, d) {
            return {
                restrict: "ECA",
                terminal: !0,
                priority: 400,
                transclude: "element",
                link: function(e, f, g, h, i) {
                    function j() {
                        l && (l.$destroy(), l = null),
                            m && (d.leave(m), m = null)
                    }
                    function k() {
                        var g = a.current && a.current.locals,
                            h = g && g.$template;
                        if (h) {
                            var k = e.$new(),
                                p = a.current,
                                q = i(k,
                                    function(a) {
                                        d.enter(a, null, m || f,
                                            function() { ! b.isDefined(n) || n && !e.$eval(n) || c()
                                            }),
                                            j()
                                    });
                            m = q,
                                l = p.scope = k,
                                l.$emit("$viewContentLoaded"),
                                l.$eval(o)
                        } else j()
                    }
                    var l,
                        m,
                        n = g.autoscroll,
                        o = g.onload || "";
                    e.$on("$routeChangeSuccess", k),
                        k()
                }
            }
        }
        function f(a, b, c) {
            return {
                restrict: "ECA",
                priority: -400,
                link: function(d, e) {
                    var f = c.current,
                        g = f.locals;
                    e.html(g.$template);
                    var h = a(e.contents());
                    if (f.controller) {
                        g.$scope = d;
                        var i = b(f.controller, g);
                        f.controllerAs && (d[f.controllerAs] = i),
                            e.data("$ngControllerController", i),
                            e.children().data("$ngControllerController", i)
                    }
                    h(d)
                }
            }
        }
        var g = b.module("ngRoute", ["ng"]).provider("$route", c);
        g.provider("$routeParams", d),
            g.directive("ngView", e),
            g.directive("ngView", f),
            e.$inject = ["$route", "$anchorScroll", "$animate"],
            f.$inject = ["$compile", "$controller", "$route"]
    } (window, window.angular),
    function(a, b, c) {
        "use strict";
        b.module("ngAnimate", ["ng"]).config(["$provide", "$animateProvider",
            function(d, e) {
                function f(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b];
                        if (c.nodeType == k) return c
                    }
                }
                function g(a, b) {
                    return f(a) == f(b)
                }
                var h = b.noop,
                    i = b.forEach,
                    j = e.$$selectors,
                    k = 1,
                    l = "$$ngAnimateState",
                    m = "ng-animate",
                    n = {
                        running: !0
                    };
                d.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement", "$timeout", "$rootScope", "$document",
                    function(a, c, d, e, k, o) {
                        function p(a) {
                            if (a) {
                                var b = [],
                                    e = {},
                                    f = a.substr(1).split("."); (d.transitions || d.animations) && f.push("");
                                for (var g = 0; g < f.length; g++) {
                                    var h = f[g],
                                        i = j[h];
                                    i && !e[h] && (b.push(c.get(i)), e[h] = !0)
                                }
                                return b
                            }
                        }
                        function q(a, b, c, d, e, g, j) {
                            function n(a) {
                                if (r(), a === !0) return void v();
                                var b = c.data(l);
                                b && (b.done = v, c.data(l, b)),
                                    o(D, "after", v)
                            }
                            function o(d, e, f) {
                                function g(a, b) {
                                    var c = b + "Complete",
                                        e = d[a];
                                    e[c] = !0,
                                        (e[j] || h)();
                                    for (var g = 0; g < d.length; g++) if (!d[g][c]) return;
                                    f()
                                }
                                var j = e + "End";
                                i(d,
                                    function(d, f) {
                                        var h = function() {
                                            g(f, e)
                                        };
                                        return "before" != e || "enter" != a && "move" != a ? void(d[e] ? d[j] = B ? d[e](c, b, h) : d[e](c, h) : h()) : void h()
                                    })
                            }
                            function q() {
                                j && k(j, 0, !1)
                            }
                            function r() {
                                r.hasBeenRun || (r.hasBeenRun = !0, g())
                            }
                            function v() {
                                if (!v.hasBeenRun) {
                                    v.hasBeenRun = !0;
                                    var a = c.data(l);
                                    a && (B ? t(c) : (a.closeAnimationTimeout = k(function() {
                                            t(c)
                                        },
                                        0, !1), c.data(l, a))),
                                        q()
                                }
                            }
                            var w = f(c);
                            if (!w) return r(),
                                void v();
                            var x = w.className,
                                y = x + " " + b,
                                z = (" " + y).replace(/\s+/g, ".");
                            d || (d = e ? e.parent() : c.parent());
                            var A = p(z),
                                B = "addClass" == a || "removeClass" == a,
                                C = c.data(l) || {};
                            if (u(c, d) || 0 === A.length) return r(),
                                void v();
                            var D = [];
                            if (C.running && B && C.structural || i(A,
                                function(d) {
                                    if (!d.allowCancel || d.allowCancel(c, a, b)) {
                                        var e,
                                            f = d[a];
                                        "leave" == a ? (e = f, f = null) : e = d["before" + a.charAt(0).toUpperCase() + a.substr(1)],
                                            D.push({
                                                before: e,
                                                after: f
                                            })
                                    }
                                }), 0 === D.length) return r(),
                                void q();
                            var E = " " + x + " ";
                            C.running && (k.cancel(C.closeAnimationTimeout), t(c), s(C.animations), C.beforeComplete ? (C.done || h)(!0) : B && !C.structural && (E = "removeClass" == C.event ? E.replace(C.className, "") : E + C.className + " "));
                            var F = " " + b + " ";
                            return "addClass" == a && E.indexOf(F) >= 0 || "removeClass" == a && -1 == E.indexOf(F) ? (r(), void q()) : (c.addClass(m), c.data(l, {
                                running: !0,
                                event: a,
                                className: b,
                                structural: !B,
                                animations: D,
                                done: n
                            }), void o(D, "before", n))
                        }
                        function r(a) {
                            var c = f(a);
                            i(c.querySelectorAll("." + m),
                                function(a) {
                                    a = b.element(a);
                                    var c = a.data(l);
                                    c && (s(c.animations), t(a))
                                })
                        }
                        function s(a) {
                            var b = !0;
                            i(a,
                                function(c) {
                                    a.beforeComplete || (c.beforeEnd || h)(b),
                                        a.afterComplete || (c.afterEnd || h)(b)
                                })
                        }
                        function t(a) {
                            g(a, e) ? n.disabled || (n.running = !1, n.structural = !1) : (a.removeClass(m), a.removeData(l))
                        }
                        function u(a, b) {
                            if (n.disabled) return ! 0;
                            if (g(a, e)) return n.disabled || n.running;
                            do {
                                if (0 === b.length) break;
                                var c = g(b, e),
                                    d = c ? n: b.data(l),
                                    f = d && ( !! d.disabled || !!d.running);
                                if (c || f) return f;
                                if (c) return ! 0
                            }
                            while (b = b.parent());
                            return ! 0
                        }
                        return e.data(l, n),
                            o.$$postDigest(function() {
                                o.$$postDigest(function() {
                                    n.running = !1
                                })
                            }),
                        {
                            enter: function(b, c, d, e) {
                                this.enabled(!1, b),
                                    a.enter(b, c, d),
                                    o.$$postDigest(function() {
                                        q("enter", "ng-enter", b, c, d, h, e)
                                    })
                            },
                            leave: function(b, c) {
                                r(b),
                                    this.enabled(!1, b),
                                    o.$$postDigest(function() {
                                        q("leave", "ng-leave", b, null, null,
                                            function() {
                                                a.leave(b)
                                            },
                                            c)
                                    })
                            },
                            move: function(b, c, d, e) {
                                r(b),
                                    this.enabled(!1, b),
                                    a.move(b, c, d),
                                    o.$$postDigest(function() {
                                        q("move", "ng-move", b, c, d, h, e)
                                    })
                            },
                            addClass: function(b, c, d) {
                                q("addClass", c, b, null, null,
                                    function() {
                                        a.addClass(b, c)
                                    },
                                    d)
                            },
                            removeClass: function(b, c, d) {
                                q("removeClass", c, b, null, null,
                                    function() {
                                        a.removeClass(b, c)
                                    },
                                    d)
                            },
                            enabled: function(a, b) {
                                switch (arguments.length) {
                                    case 2:
                                        if (a) t(b);
                                        else {
                                            var c = b.data(l) || {};
                                            c.disabled = !0,
                                                b.data(l, c)
                                        }
                                        break;
                                    case 1:
                                        n.disabled = !a;
                                        break;
                                    default:
                                        a = !n.disabled
                                }
                                return !! a
                            }
                        }
                    }]),
                    e.register("", ["$window", "$sniffer", "$timeout",
                        function(d, e, g) {
                            function j(a) {
                                R.push(a),
                                    g.cancel(F),
                                    F = g(function() {
                                            i(R,
                                                function(a) {
                                                    a()
                                                }),
                                                R = [],
                                                F = null,
                                                P = {}
                                        },
                                        10, !1)
                            }
                            function l(a, b) {
                                var c = b ? P[b] : null;
                                if (!c) {
                                    var e,
                                        f,
                                        g,
                                        h,
                                        j = 0,
                                        l = 0,
                                        n = 0,
                                        o = 0;
                                    i(a,
                                        function(a) {
                                            if (a.nodeType == k) {
                                                var b = d.getComputedStyle(a) || {};
                                                g = b[A + G],
                                                    j = Math.max(m(g), j),
                                                    h = b[A + H],
                                                    e = b[A + I],
                                                    l = Math.max(m(e), l),
                                                    f = b[C + I],
                                                    o = Math.max(m(f), o);
                                                var c = m(b[C + G]);
                                                c > 0 && (c *= parseInt(b[C + J], 10) || 1),
                                                    n = Math.max(c, n)
                                            }
                                        }),
                                        c = {
                                            total: 0,
                                            transitionPropertyStyle: h,
                                            transitionDurationStyle: g,
                                            transitionDelayStyle: e,
                                            transitionDelay: l,
                                            transitionDuration: j,
                                            animationDelayStyle: f,
                                            animationDelay: o,
                                            animationDuration: n
                                        },
                                        b && (P[b] = c)
                                }
                                return c
                            }
                            function m(a) {
                                var c = 0,
                                    d = b.isString(a) ? a.split(/\s*,\s*/) : [];
                                return i(d,
                                    function(a) {
                                        c = Math.max(parseFloat(a) || 0, c)
                                    }),
                                    c
                            }
                            function n(a) {
                                var b = a.parent(),
                                    c = b.data(K);
                                return c || (b.data(K, ++Q), c = Q),
                                    c + "-" + f(a).className
                            }
                            function o(a, b) {
                                var c = n(a),
                                    d = c + " " + b,
                                    e = {},
                                    f = P[d] ? ++P[d].total: 0;
                                if (f > 0) {
                                    var g = b + "-stagger",
                                        h = c + " " + g,
                                        j = !P[h];
                                    j && a.addClass(g),
                                        e = l(a, h),
                                        j && a.removeClass(g)
                                }
                                a.addClass(b);
                                var k = l(a, d),
                                    m = Math.max(k.transitionDuration, k.animationDuration);
                                if (0 === m) return a.removeClass(b),
                                    !1;
                                var o = "";
                                return k.transitionDuration > 0 ? (a.addClass(M), o += N + " ", p(a)) : q(a),
                                    i(b.split(" "),
                                        function(a, b) {
                                            o += (b > 0 ? " ": "") + a + "-active"
                                        }),
                                    a.data(L, {
                                        className: b,
                                        activeClassName: o,
                                        maxDuration: m,
                                        classes: b + " " + o,
                                        timings: k,
                                        stagger: e,
                                        ii: f
                                    }),
                                    !0
                            }
                            function p(a) {
                                f(a).style[A + H] = "none"
                            }
                            function q(a) {
                                f(a).style[C] = "none 0s"
                            }
                            function r(a) {
                                var b = A + H,
                                    c = f(a);
                                c.style[b] && c.style[b].length > 0 && (c.style[b] = "")
                            }
                            function s(a) {
                                var b = C,
                                    c = f(a);
                                c.style[b] && c.style[b].length > 0 && (c.style[b] = "")
                            }
                            function t(a, b, c) {
                                function d(a) {
                                    a.stopPropagation();
                                    var b = a.originalEvent || a,
                                        d = b.$manualTimeStamp || b.timeStamp || Date.now(),
                                        e = parseFloat(b.elapsedTime.toFixed(O));
                                    Math.max(d - o, 0) >= n && e >= l && c()
                                }
                                var g = a.data(L),
                                    h = f(a);
                                if ( - 1 == h.className.indexOf(b) || !g) return void c();
                                var i,
                                    j = g.timings,
                                    k = g.stagger,
                                    l = g.maxDuration,
                                    m = g.activeClassName,
                                    n = 1e3 * Math.max(j.transitionDelay, j.animationDelay),
                                    o = Date.now(),
                                    p = D + " " + B,
                                    q = g.ii,
                                    r = "",
                                    s = [];
                                if (j.transitionDuration > 0) {
                                    var t = j.transitionPropertyStyle;
                                    if ( - 1 == t.indexOf("all")) {
                                        i = !0;
                                        var v = e.msie ? "-ms-zoom": "border-spacing";
                                        r += E + "transition-property: " + t + ", " + v + "; ",
                                            r += E + "transition-duration: " + j.transitionDurationStyle + ", " + j.transitionDuration + "s; ",
                                            s.push(E + "transition-property"),
                                            s.push(E + "transition-duration")
                                    }
                                }
                                if (q > 0) {
                                    if (k.transitionDelay > 0 && 0 === k.transitionDuration) {
                                        var w = j.transitionDelayStyle;
                                        i && (w += ", " + j.transitionDelay + "s"),
                                            r += E + "transition-delay: " + u(w, k.transitionDelay, q) + "; ",
                                            s.push(E + "transition-delay")
                                    }
                                    k.animationDelay > 0 && 0 === k.animationDuration && (r += E + "animation-delay: " + u(j.animationDelayStyle, k.animationDelay, q) + "; ", s.push(E + "animation-delay"))
                                }
                                if (s.length > 0) {
                                    var x = h.getAttribute("style") || "";
                                    h.setAttribute("style", x + " " + r)
                                }
                                return a.on(p, d),
                                    a.addClass(m),
                                    function() {
                                        a.off(p, d),
                                            a.removeClass(m),
                                            y(a, b);
                                        var c = f(a);
                                        for (var e in s) c.style.removeProperty(s[e])
                                    }
                            }
                            function u(a, b, c) {
                                var d = "";
                                return i(a.split(","),
                                    function(a, e) {
                                        d += (e > 0 ? ",": "") + (c * b + parseInt(a, 10)) + "s"
                                    }),
                                    d
                            }
                            function v(a, b) {
                                return o(a, b) ?
                                    function(c) {
                                        c && y(a, b)
                                    }: void 0
                            }
                            function w(a, b, c) {
                                return a.data(L) ? t(a, b, c) : (y(a, b), void c())
                            }
                            function x(a, b, c) {
                                var d = v(a, b);
                                if (!d) return void c();
                                var e = d;
                                return j(function() {
                                    r(a),
                                        s(a),
                                        e = w(a, b, c)
                                }),
                                    function(a) { (e || h)(a)
                                    }
                            }
                            function y(a, b) {
                                a.removeClass(b),
                                    a.removeClass(M),
                                    a.removeData(L)
                            }
                            function z(a, c) {
                                var d = "";
                                return a = b.isArray(a) ? a: a.split(/\s+/),
                                    i(a,
                                        function(a, b) {
                                            a && a.length > 0 && (d += (b > 0 ? " ": "") + a + c)
                                        }),
                                    d
                            }
                            var A,
                                B,
                                C,
                                D,
                                E = "";
                            a.ontransitionend === c && a.onwebkittransitionend !== c ? (E = "-webkit-", A = "WebkitTransition", B = "webkitTransitionEnd transitionend") : (A = "transition", B = "transitionend"),
                                    a.onanimationend === c && a.onwebkitanimationend !== c ? (E = "-webkit-", C = "WebkitAnimation", D = "webkitAnimationEnd animationend") : (C = "animation", D = "animationend");
                            var F,
                                G = "Duration",
                                H = "Property",
                                I = "Delay",
                                J = "IterationCount",
                                K = "$$ngAnimateKey",
                                L = "$$ngAnimateCSS3Data",
                                M = "ng-animate-start",
                                N = "ng-animate-active",
                                O = 3,
                                P = {},
                                Q = 0,
                                R = [];
                            return {
                                allowCancel: function(a, c, d) {
                                    var e = (a.data(L) || {}).classes;
                                    if (!e || ["enter", "leave", "move"].indexOf(c) >= 0) return ! 0;
                                    var g = a.parent(),
                                        h = b.element(f(a).cloneNode());
                                    h.attr("style", "position:absolute; top:-9999px; left:-9999px"),
                                        h.removeAttr("id"),
                                        h.empty(),
                                        i(e.split(" "),
                                            function(a) {
                                                h.removeClass(a)
                                            });
                                    var j = "addClass" == c ? "-add": "-remove";
                                    h.addClass(z(d, j)),
                                        g.append(h);
                                    var k = l(h);
                                    return h.remove(),
                                        Math.max(k.transitionDuration, k.animationDuration) > 0
                                },
                                enter: function(a, b) {
                                    return x(a, "ng-enter", b)
                                },
                                leave: function(a, b) {
                                    return x(a, "ng-leave", b)
                                },
                                move: function(a, b) {
                                    return x(a, "ng-move", b)
                                },
                                beforeAddClass: function(a, b, c) {
                                    var d = v(a, z(b, "-add"));
                                    return d ? (j(function() {
                                        r(a),
                                            s(a),
                                            c()
                                    }), d) : void c()
                                },
                                addClass: function(a, b, c) {
                                    return w(a, z(b, "-add"), c)
                                },
                                beforeRemoveClass: function(a, b, c) {
                                    var d = v(a, z(b, "-remove"));
                                    return d ? (j(function() {
                                        r(a),
                                            s(a),
                                            c()
                                    }), d) : void c()
                                },
                                removeClass: function(a, b, c) {
                                    return w(a, z(b, "-remove"), c)
                                }
                            }
                        }])
            }])
    } (window, window.angular),
    function(a, b, c) {
        "use strict";
        function d(a) {
            return null != a && "" !== a && "hasOwnProperty" !== a && h.test("." + a)
        }
        function e(a, b) {
            if (!d(b)) throw g("badmember", 'Dotted member path "@{0}" is invalid.', b);
            for (var e = b.split("."), f = 0, h = e.length; h > f && a !== c; f++) {
                var i = e[f];
                a = null !== a ? a[i] : c
            }
            return a
        }
        function f(a, c) {
            c = c || {},
                b.forEach(c,
                    function(a, b) {
                        delete c[b]
                    });
            for (var d in a) a.hasOwnProperty(d) && "$$" !== d.substr(0, 2) && (c[d] = a[d]);
            return c
        }
        var g = b.$$minErr("$resource"),
            h = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
        b.module("ngResource", ["ng"]).factory("$resource", ["$http", "$q",
            function(a, d) {
                function h(a) {
                    return i(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
                }
                function i(a, b) {
                    return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20": "+")
                }
                function j(a, b) {
                    this.template = a,
                        this.defaults = b || {},
                        this.urlParams = {}
                }
                function k(h, i, r) {
                    function s(a, b) {
                        var c = {};
                        return b = o({},
                            i, b),
                            n(b,
                                function(b, d) {
                                    q(b) && (b = b()),
                                        c[d] = b && b.charAt && "@" == b.charAt(0) ? e(a, b.substr(1)) : b
                                }),
                            c
                    }
                    function t(a) {
                        return a.resource
                    }
                    function u(a) {
                        f(a || {},
                            this)
                    }
                    var v = new j(h);
                    return r = o({},
                        l, r),
                        n(r,
                            function(e, h) {
                                var i = /^(POST|PUT|PATCH)$/i.test(e.method);
                                u[h] = function(h, j, k, l) {
                                    var r,
                                        w,
                                        x,
                                        y = {};
                                    switch (arguments.length) {
                                        case 4:
                                            x = l,
                                                w = k;
                                        case 3:
                                        case 2:
                                            if (!q(j)) {
                                                y = h,
                                                    r = j,
                                                    w = k;
                                                break
                                            }
                                            if (q(h)) {
                                                w = h,
                                                    x = j;
                                                break
                                            }
                                            w = j,
                                                x = k;
                                        case 1:
                                            q(h) ? w = h: i ? r = h: y = h;
                                            break;
                                        case 0:
                                            break;
                                        default:
                                            throw g("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
                                    }
                                    var z = this instanceof u,
                                        A = z ? r: e.isArray ? [] : new u(r),
                                        B = {},
                                        C = e.interceptor && e.interceptor.response || t,
                                        D = e.interceptor && e.interceptor.responseError || c;
                                    n(e,
                                        function(a, b) {
                                            "params" != b && "isArray" != b && "interceptor" != b && (B[b] = p(a))
                                        }),
                                        i && (B.data = r),
                                        v.setUrlParams(B, o({},
                                            s(r, e.params || {}), y), e.url);
                                    var E = a(B).then(function(a) {
                                            var c = a.data,
                                                d = A.$promise;
                                            if (c) {
                                                if (b.isArray(c) !== !!e.isArray) throw g("badcfg", "Error in resource configuration. Expected response to contain an {0} but got an {1}", e.isArray ? "array": "object", b.isArray(c) ? "array": "object");
                                                e.isArray ? (A.length = 0, n(c,
                                                    function(a) {
                                                        A.push(new u(a))
                                                    })) : (f(c, A), A.$promise = d)
                                            }
                                            return A.$resolved = !0,
                                                a.resource = A,
                                                a
                                        },
                                        function(a) {
                                            return A.$resolved = !0,
                                                (x || m)(a),
                                                d.reject(a)
                                        });
                                    return E = E.then(function(a) {
                                            var b = C(a);
                                            return (w || m)(b, a.headers),
                                                b
                                        },
                                        D),
                                        z ? E: (A.$promise = E, A.$resolved = !1, A)
                                },
                                    u.prototype["$" + h] = function(a, b, c) {
                                        q(a) && (c = b, b = a, a = {});
                                        var d = u[h].call(this, a, this, b, c);
                                        return d.$promise || d
                                    }
                            }),
                        u.bind = function(a) {
                            return k(h, o({},
                                i, a), r)
                        },
                        u
                }
                var l = {
                        get: {
                            method: "GET"
                        },
                        save: {
                            method: "POST"
                        },
                        query: {
                            method: "GET",
                            isArray: !0
                        },
                        remove: {
                            method: "DELETE"
                        },
                        "delete": {
                            method: "DELETE"
                        }
                    },
                    m = b.noop,
                    n = b.forEach,
                    o = b.extend,
                    p = b.copy,
                    q = b.isFunction;
                return j.prototype = {
                    setUrlParams: function(a, c, d) {
                        var e,
                            f,
                            i = this,
                            j = d || i.template,
                            k = i.urlParams = {};
                        n(j.split(/\W/),
                            function(a) {
                                if ("hasOwnProperty" === a) throw g("badname", "hasOwnProperty is not a valid parameter name."); ! new RegExp("^\\d+$").test(a) && a && new RegExp("(^|[^\\\\]):" + a + "(\\W|$)").test(j) && (k[a] = !0)
                            }),
                            j = j.replace(/\\:/g, ":"),
                            c = c || {},
                            n(i.urlParams,
                                function(a, d) {
                                    e = c.hasOwnProperty(d) ? c[d] : i.defaults[d],
                                            b.isDefined(e) && null !== e ? (f = h(e), j = j.replace(new RegExp(":" + d + "(\\W|$)", "g"), f + "$1")) : j = j.replace(new RegExp("(/?):" + d + "(\\W|$)", "g"),
                                        function(a, b, c) {
                                            return "/" == c.charAt(0) ? c: b + c
                                        })
                                }),
                            j = j.replace(/\/+$/, ""),
                            j = j.replace(/\/\.(?=\w+($|\?))/, "."),
                            a.url = j.replace(/\/\\\./, "/."),
                            n(c,
                                function(b, c) {
                                    i.urlParams[c] || (a.params = a.params || {},
                                        a.params[c] = b)
                                })
                    }
                },
                    k
            }])
    } (window, window.angular),
    function(a, b, c) {
        "use strict";
        b.module("ngCookies", ["ng"]).factory("$cookies", ["$rootScope", "$browser",
            function(a, d) {
                function e() {
                    var a,
                        e,
                        f,
                        i;
                    for (a in h) k(g[a]) && d.cookies(a, c);
                    for (a in g) e = g[a],
                        b.isString(e) ? e !== h[a] && (d.cookies(a, e), i = !0) : b.isDefined(h[a]) ? g[a] = h[a] : delete g[a];
                    if (i) {
                        i = !1,
                            f = d.cookies();
                        for (a in g) g[a] !== f[a] && (k(f[a]) ? delete g[a] : g[a] = f[a], i = !0)
                    }
                }
                var f,
                    g = {},
                    h = {},
                    i = !1,
                    j = b.copy,
                    k = b.isUndefined;
                return d.addPollFn(function() {
                    var b = d.cookies();
                    f != b && (f = b, j(b, h), j(b, g), i && a.$apply())
                })(),
                    i = !0,
                    a.$watch(e),
                    g
            }]).factory("$cookieStore", ["$cookies",
            function(a) {
                return {
                    get: function(c) {
                        var d = a[c];
                        return d ? b.fromJson(d) : d
                    },
                    put: function(c, d) {
                        a[c] = b.toJson(d)
                    },
                    remove: function(b) {
                        delete a[b]
                    }
                }
            }])
    } (window, window.angular);
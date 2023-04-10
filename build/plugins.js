(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
}
)(this, function () {
    'use strict';
    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }
    function t(e, t) {
        if (1 !== e.nodeType)
            return [];
        var o = getComputedStyle(e, null);
        return t ? o[t] : o
    }
    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }
    function n(e) {
        if (!e)
            return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var i = t(e)
            , r = i.overflow
            , p = i.overflowX
            , s = i.overflowY;
        return /(auto|scroll)/.test(r + s + p) ? e : n(o(e))
    }
    function r(e) {
        var o = e && e.offsetParent
            , i = o && o.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : e ? e.ownerDocument.documentElement : document.documentElement
    }
    function p(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e)
    }
    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode)
    }
    function d(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType)
            return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING
            , i = o ? e : t
            , n = o ? t : e
            , a = document.createRange();
        a.setStart(i, 0),
            a.setEnd(n, 0);
        var l = a.commonAncestorContainer;
        if (e !== l && t !== l || i.contains(n))
            return p(l) ? l : r(l);
        var f = s(e);
        return f.host ? d(f.host, t) : d(e, s(t).host)
    }
    function a(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top'
            , o = 'top' === t ? 'scrollTop' : 'scrollLeft'
            , i = e.nodeName;
        if ('BODY' === i || 'HTML' === i) {
            var n = e.ownerDocument.documentElement
                , r = e.ownerDocument.scrollingElement || n;
            return r[o]
        }
        return e[o]
    }
    function l(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2]
            , i = a(t, 'top')
            , n = a(t, 'left')
            , r = o ? -1 : 1;
        return e.top += i * r,
            e.bottom += i * r,
            e.left += n * r,
            e.right += n * r,
            e
    }
    function f(e, t) {
        var o = 'x' === t ? 'Left' : 'Top'
            , i = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + i + 'Width'], 10)
    }
    function m(e, t, o, i) {
        return J(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], ie() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0)
    }
    function h() {
        var e = document.body
            , t = document.documentElement
            , o = ie() && getComputedStyle(t);
        return {
            height: m('Height', e, t, o),
            width: m('Width', e, t, o)
        }
    }
    function c(e) {
        return se({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }
    function g(e) {
        var o = {};
        if (ie())
            try {
                o = e.getBoundingClientRect();
                var i = a(e, 'top')
                    , n = a(e, 'left');
                o.top += i,
                    o.left += n,
                    o.bottom += i,
                    o.right += n
            } catch (e) { }
        else
            o = e.getBoundingClientRect();
        var r = {
            left: o.left,
            top: o.top,
            width: o.right - o.left,
            height: o.bottom - o.top
        }
            , p = 'HTML' === e.nodeName ? h() : {}
            , s = p.width || e.clientWidth || r.right - r.left
            , d = p.height || e.clientHeight || r.bottom - r.top
            , l = e.offsetWidth - s
            , m = e.offsetHeight - d;
        if (l || m) {
            var g = t(e);
            l -= f(g, 'x'),
                m -= f(g, 'y'),
                r.width -= l,
                r.height -= m
        }
        return c(r)
    }
    function u(e, o) {
        var i = ie()
            , r = 'HTML' === o.nodeName
            , p = g(e)
            , s = g(o)
            , d = n(e)
            , a = t(o)
            , f = parseFloat(a.borderTopWidth, 10)
            , m = parseFloat(a.borderLeftWidth, 10)
            , h = c({
                top: p.top - s.top - f,
                left: p.left - s.left - m,
                width: p.width,
                height: p.height
            });
        if (h.marginTop = 0,
            h.marginLeft = 0,
            !i && r) {
            var u = parseFloat(a.marginTop, 10)
                , b = parseFloat(a.marginLeft, 10);
            h.top -= f - u,
                h.bottom -= f - u,
                h.left -= m - b,
                h.right -= m - b,
                h.marginTop = u,
                h.marginLeft = b
        }
        return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (h = l(h, o)),
            h
    }
    function b(e) {
        var t = e.ownerDocument.documentElement
            , o = u(e, t)
            , i = J(t.clientWidth, window.innerWidth || 0)
            , n = J(t.clientHeight, window.innerHeight || 0)
            , r = a(t)
            , p = a(t, 'left')
            , s = {
                top: r - o.top + o.marginTop,
                left: p - o.left + o.marginLeft,
                width: i,
                height: n
            };
        return c(s)
    }
    function w(e) {
        var i = e.nodeName;
        return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || w(o(e))
    }
    function y(e, t, i, r) {
        var p = {
            top: 0,
            left: 0
        }
            , s = d(e, t);
        if ('viewport' === r)
            p = b(s);
        else {
            var a;
            'scrollParent' === r ? (a = n(o(t)),
                'BODY' === a.nodeName && (a = e.ownerDocument.documentElement)) : 'window' === r ? a = e.ownerDocument.documentElement : a = r;
            var l = u(a, s);
            if ('HTML' === a.nodeName && !w(s)) {
                var f = h()
                    , m = f.height
                    , c = f.width;
                p.top += l.top - l.marginTop,
                    p.bottom = m + l.top,
                    p.left += l.left - l.marginLeft,
                    p.right = c + l.left
            } else
                p = l
        }
        return p.left += i,
            p.top += i,
            p.right -= i,
            p.bottom -= i,
            p
    }
    function E(e) {
        var t = e.width
            , o = e.height;
        return t * o
    }
    function v(e, t, o, i, n) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto'))
            return e;
        var p = y(o, i, r, n)
            , s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            }
            , d = Object.keys(s).map(function (e) {
                return se({
                    key: e
                }, s[e], {
                    area: E(s[e])
                })
            }).sort(function (e, t) {
                return t.area - e.area
            })
            , a = d.filter(function (e) {
                var t = e.width
                    , i = e.height;
                return t >= o.clientWidth && i >= o.clientHeight
            })
            , l = 0 < a.length ? a[0].key : d[0].key
            , f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }
    function O(e, t, o) {
        var i = d(t, o);
        return u(o, i)
    }
    function L(e) {
        var t = getComputedStyle(e)
            , o = parseFloat(t.marginTop) + parseFloat(t.marginBottom)
            , i = parseFloat(t.marginLeft) + parseFloat(t.marginRight)
            , n = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + o
            };
        return n
    }
    function x(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e]
        })
    }
    function S(e, t, o) {
        o = o.split('-')[0];
        var i = L(e)
            , n = {
                width: i.width,
                height: i.height
            }
            , r = -1 !== ['right', 'left'].indexOf(o)
            , p = r ? 'top' : 'left'
            , s = r ? 'left' : 'top'
            , d = r ? 'height' : 'width'
            , a = r ? 'width' : 'height';
        return n[p] = t[p] + t[d] / 2 - i[d] / 2,
            n[s] = o === s ? t[s] - i[a] : t[x(s)],
            n
    }
    function T(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }
    function D(e, t, o) {
        if (Array.prototype.findIndex)
            return e.findIndex(function (e) {
                return e[t] === o
            });
        var i = T(e, function (e) {
            return e[t] === o
        });
        return e.indexOf(i)
    }
    function C(t, o, i) {
        var n = void 0 === i ? t : t.slice(0, D(t, 'name', i));
        return n.forEach(function (t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var i = t['function'] || t.fn;
            t.enabled && e(i) && (o.offsets.popper = c(o.offsets.popper),
                o.offsets.reference = c(o.offsets.reference),
                o = i(o, t))
        }),
            o
    }
    function N() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = O(this.state, this.popper, this.reference),
                e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding),
                e.originalPlacement = e.placement,
                e.offsets.popper = S(this.popper, e.offsets.reference, e.placement),
                e.offsets.popper.position = 'absolute',
                e = C(this.modifiers, e),
                this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0,
                    this.options.onCreate(e))
        }
    }
    function k(e, t) {
        return e.some(function (e) {
            var o = e.name
                , i = e.enabled;
            return i && o === t
        })
    }
    function W(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
            var i = t[n]
                , r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r])
                return r
        }
        return null
    }
    function P() {
        return this.state.isDestroyed = !0,
            k(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'),
                this.popper.style.left = '',
                this.popper.style.position = '',
                this.popper.style.top = '',
                this.popper.style[W('transform')] = ''),
            this.disableEventListeners(),
            this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
            this
    }
    function B(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }
    function H(e, t, o, i) {
        var r = 'BODY' === e.nodeName
            , p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, {
            passive: !0
        }),
            r || H(n(p.parentNode), t, o, i),
            i.push(p)
    }
    function A(e, t, o, i) {
        o.updateBound = i,
            B(e).addEventListener('resize', o.updateBound, {
                passive: !0
            });
        var r = n(e);
        return H(r, 'scroll', o.updateBound, o.scrollParents),
            o.scrollElement = r,
            o.eventsEnabled = !0,
            o
    }
    function I() {
        this.state.eventsEnabled || (this.state = A(this.reference, this.options, this.state, this.scheduleUpdate))
    }
    function M(e, t) {
        return B(e).removeEventListener('resize', t.updateBound),
            t.scrollParents.forEach(function (e) {
                e.removeEventListener('scroll', t.updateBound)
            }),
            t.updateBound = null,
            t.scrollParents = [],
            t.scrollElement = null,
            t.eventsEnabled = !1,
            t
    }
    function R() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
            this.state = M(this.reference, this.state))
    }
    function U(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }
    function Y(e, t) {
        Object.keys(t).forEach(function (o) {
            var i = '';
            -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && U(t[o]) && (i = 'px'),
                e.style[o] = t[o] + i
        })
    }
    function j(e, t) {
        Object.keys(t).forEach(function (o) {
            var i = t[o];
            !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }
    function F(e, t, o) {
        var i = T(e, function (e) {
            var o = e.name;
            return o === t
        })
            , n = !!i && e.some(function (e) {
                return e.name === o && e.enabled && e.order < i.order
            });
        if (!n) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return n
    }
    function K(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }
    function q(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1]
            , o = ae.indexOf(e)
            , i = ae.slice(o + 1).concat(ae.slice(0, o));
        return t ? i.reverse() : i
    }
    function V(e, t, o, i) {
        var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)
            , r = +n[1]
            , p = n[2];
        if (!r)
            return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = i;
            }
            var d = c(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? J(document.documentElement.clientHeight, window.innerHeight || 0) : J(document.documentElement.clientWidth, window.innerWidth || 0),
                a / 100 * r
        }
        return r
    }
    function z(e, t, o, i) {
        var n = [0, 0]
            , r = -1 !== ['right', 'left'].indexOf(i)
            , p = e.split(/(\+|\-)/).map(function (e) {
                return e.trim()
            })
            , s = p.indexOf(T(p, function (e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/
            , a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function (e, i) {
            var n = (1 === i ? !r : r) ? 'height' : 'width'
                , p = !1;
            return e.reduce(function (e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t,
                    p = !0,
                    e) : p ? (e[e.length - 1] += t,
                        p = !1,
                        e) : e.concat(t)
            }, []).map(function (e) {
                return V(e, n, t, o)
            })
        }),
            a.forEach(function (e, t) {
                e.forEach(function (o, i) {
                    U(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1))
                })
            }),
            n
    }
    function G(e, t) {
        var o, i = t.offset, n = e.placement, r = e.offsets, p = r.popper, s = r.reference, d = n.split('-')[0];
        return o = U(+i) ? [+i, 0] : z(i, p, s, d),
            'left' === d ? (p.top += o[0],
                p.left -= o[1]) : 'right' === d ? (p.top += o[0],
                    p.left += o[1]) : 'top' === d ? (p.left += o[0],
                        p.top -= o[1]) : 'bottom' === d && (p.left += o[0],
                            p.top += o[1]),
            e.popper = p,
            e
    }
    for (var _ = Math.min, X = Math.floor, J = Math.max, Q = 'undefined' != typeof window && 'undefined' != typeof document, Z = ['Edge', 'Trident', 'Firefox'], $ = 0, ee = 0; ee < Z.length; ee += 1)
        if (Q && 0 <= navigator.userAgent.indexOf(Z[ee])) {
            $ = 1;
            break
        }
    var i, te = Q && window.Promise, oe = te ? function (e) {
        var t = !1;
        return function () {
            t || (t = !0,
                window.Promise.resolve().then(function () {
                    t = !1,
                        e()
                }))
        }
    }
        : function (e) {
            var t = !1;
            return function () {
                t || (t = !0,
                    setTimeout(function () {
                        t = !1,
                            e()
                    }, $))
            }
        }
        , ie = function () {
            return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')),
                i
        }, ne = function (e, t) {
            if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function')
        }, re = function () {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++)
                    o = t[n],
                        o.enumerable = o.enumerable || !1,
                        o.configurable = !0,
                        'value' in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o)
            }
            return function (t, o, i) {
                return o && e(t.prototype, o),
                    i && e(t, i),
                    t
            }
        }(), pe = function (e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o,
                e
        }, se = Object.assign || function (e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var i in t = arguments[o],
                    t)
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }
        , de = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'], ae = de.slice(3), le = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        }, fe = function () {
            function t(o, i) {
                var n = this
                    , r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                ne(this, t),
                    this.scheduleUpdate = function () {
                        return requestAnimationFrame(n.update)
                    }
                    ,
                    this.update = oe(this.update.bind(this)),
                    this.options = se({}, t.Defaults, r),
                    this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    },
                    this.reference = o && o.jquery ? o[0] : o,
                    this.popper = i && i.jquery ? i[0] : i,
                    this.options.modifiers = {},
                    Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
                        n.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                    }),
                    this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
                        return se({
                            name: e
                        }, n.options.modifiers[e])
                    }).sort(function (e, t) {
                        return e.order - t.order
                    }),
                    this.modifiers.forEach(function (t) {
                        t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                    }),
                    this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(),
                    this.state.eventsEnabled = p
            }
            return re(t, [{
                key: 'update',
                value: function () {
                    return N.call(this)
                }
            }, {
                key: 'destroy',
                value: function () {
                    return P.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function () {
                    return I.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function () {
                    return R.call(this)
                }
            }]),
                t
        }();
    return fe.Utils = ('undefined' == typeof window ? global : window).PopperUtils,
        fe.placements = de,
        fe.Defaults = {
            placement: 'bottom',
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () { },
            onUpdate: function () { },
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.placement
                            , o = t.split('-')[0]
                            , i = t.split('-')[1];
                        if (i) {
                            var n = e.offsets
                                , r = n.reference
                                , p = n.popper
                                , s = -1 !== ['bottom', 'top'].indexOf(o)
                                , d = s ? 'left' : 'top'
                                , a = s ? 'width' : 'height'
                                , l = {
                                    start: pe({}, d, r[d]),
                                    end: pe({}, d, r[d] + r[a] - p[a])
                                };
                            e.offsets.popper = se({}, p, l[i])
                        }
                        return e
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: G,
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.boundariesElement || r(e.instance.popper);
                        e.instance.reference === o && (o = r(o));
                        var i = y(e.instance.popper, e.instance.reference, t.padding, o);
                        t.boundaries = i;
                        var n = t.priority
                            , p = e.offsets.popper
                            , s = {
                                primary: function (e) {
                                    var o = p[e];
                                    return p[e] < i[e] && !t.escapeWithReference && (o = J(p[e], i[e])),
                                        pe({}, e, o)
                                },
                                secondary: function (e) {
                                    var o = 'right' === e ? 'left' : 'top'
                                        , n = p[o];
                                    return p[e] > i[e] && !t.escapeWithReference && (n = _(p[o], i[e] - ('right' === e ? p.width : p.height))),
                                        pe({}, o, n)
                                }
                            };
                        return n.forEach(function (e) {
                            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                            p = se({}, p, s[t](e))
                        }),
                            e.offsets.popper = p,
                            e
                    },
                    priority: ['left', 'right', 'top', 'bottom'],
                    padding: 5,
                    boundariesElement: 'scrollParent'
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.offsets
                            , o = t.popper
                            , i = t.reference
                            , n = e.placement.split('-')[0]
                            , r = X
                            , p = -1 !== ['top', 'bottom'].indexOf(n)
                            , s = p ? 'right' : 'bottom'
                            , d = p ? 'left' : 'top'
                            , a = p ? 'width' : 'height';
                        return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]),
                            o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])),
                            e
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (e, o) {
                        var i;
                        if (!F(e.instance.modifiers, 'arrow', 'keepTogether'))
                            return e;
                        var n = o.element;
                        if ('string' == typeof n) {
                            if (n = e.instance.popper.querySelector(n),
                                !n)
                                return e;
                        } else if (!e.instance.popper.contains(n))
                            return console.warn('WARNING: `arrow.element` must be child of its popper element!'),
                                e;
                        var r = e.placement.split('-')[0]
                            , p = e.offsets
                            , s = p.popper
                            , d = p.reference
                            , a = -1 !== ['left', 'right'].indexOf(r)
                            , l = a ? 'height' : 'width'
                            , f = a ? 'Top' : 'Left'
                            , m = f.toLowerCase()
                            , h = a ? 'left' : 'top'
                            , g = a ? 'bottom' : 'right'
                            , u = L(n)[l];
                        d[g] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[g] - u)),
                            d[m] + u > s[g] && (e.offsets.popper[m] += d[m] + u - s[g]),
                            e.offsets.popper = c(e.offsets.popper);
                        var b = d[m] + d[l] / 2 - u / 2
                            , w = t(e.instance.popper)
                            , y = parseFloat(w['margin' + f], 10)
                            , E = parseFloat(w['border' + f + 'Width'], 10)
                            , v = b - e.offsets.popper[m] - y - E;
                        return v = J(_(s[l] - u, v), 0),
                            e.arrowElement = n,
                            e.offsets.arrow = (i = {},
                                pe(i, m, Math.round(v)),
                                pe(i, h, ''),
                                i),
                            e
                    },
                    element: '[x-arrow]'
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (e, t) {
                        if (k(e.instance.modifiers, 'inner'))
                            return e;
                        if (e.flipped && e.placement === e.originalPlacement)
                            return e;
                        var o = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement)
                            , i = e.placement.split('-')[0]
                            , n = x(i)
                            , r = e.placement.split('-')[1] || ''
                            , p = [];
                        switch (t.behavior) {
                            case le.FLIP:
                                p = [i, n];
                                break;
                            case le.CLOCKWISE:
                                p = q(i);
                                break;
                            case le.COUNTERCLOCKWISE:
                                p = q(i, !0);
                                break;
                            default:
                                p = t.behavior;
                        }
                        return p.forEach(function (s, d) {
                            if (i !== s || p.length === d + 1)
                                return e;
                            i = e.placement.split('-')[0],
                                n = x(i);
                            var a = e.offsets.popper
                                , l = e.offsets.reference
                                , f = X
                                , m = 'left' === i && f(a.right) > f(l.left) || 'right' === i && f(a.left) < f(l.right) || 'top' === i && f(a.bottom) > f(l.top) || 'bottom' === i && f(a.top) < f(l.bottom)
                                , h = f(a.left) < f(o.left)
                                , c = f(a.right) > f(o.right)
                                , g = f(a.top) < f(o.top)
                                , u = f(a.bottom) > f(o.bottom)
                                , b = 'left' === i && h || 'right' === i && c || 'top' === i && g || 'bottom' === i && u
                                , w = -1 !== ['top', 'bottom'].indexOf(i)
                                , y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
                            (m || b || y) && (e.flipped = !0,
                                (m || b) && (i = p[d + 1]),
                                y && (r = K(r)),
                                e.placement = i + (r ? '-' + r : ''),
                                e.offsets.popper = se({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)),
                                e = C(e.instance.modifiers, e, 'flip'))
                        }),
                            e
                    },
                    behavior: 'flip',
                    padding: 5,
                    boundariesElement: 'viewport'
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (e) {
                        var t = e.placement
                            , o = t.split('-')[0]
                            , i = e.offsets
                            , n = i.popper
                            , r = i.reference
                            , p = -1 !== ['left', 'right'].indexOf(o)
                            , s = -1 === ['top', 'left'].indexOf(o);
                        return n[p ? 'left' : 'top'] = r[o] - (s ? n[p ? 'width' : 'height'] : 0),
                            e.placement = x(t),
                            e.offsets.popper = c(n),
                            e
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (e) {
                        if (!F(e.instance.modifiers, 'hide', 'preventOverflow'))
                            return e;
                        var t = e.offsets.reference
                            , o = T(e.instance.modifiers, function (e) {
                                return 'preventOverflow' === e.name
                            }).boundaries;
                        if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                            if (!0 === e.hide)
                                return e;
                            e.hide = !0,
                                e.attributes['x-out-of-boundaries'] = ''
                        } else {
                            if (!1 === e.hide)
                                return e;
                            e.hide = !1,
                                e.attributes['x-out-of-boundaries'] = !1
                        }
                        return e
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.x
                            , i = t.y
                            , n = e.offsets.popper
                            , p = T(e.instance.modifiers, function (e) {
                                return 'applyStyle' === e.name
                            }).gpuAcceleration;
                        void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                        var s, d, a = void 0 === p ? t.gpuAcceleration : p, l = r(e.instance.popper), f = g(l), m = {
                            position: n.position
                        }, h = {
                            left: X(n.left),
                            top: X(n.top),
                            bottom: X(n.bottom),
                            right: X(n.right)
                        }, c = 'bottom' === o ? 'top' : 'bottom', u = 'right' === i ? 'left' : 'right', b = W('transform');
                        if (d = 'bottom' == c ? -f.height + h.bottom : h.top,
                            s = 'right' == u ? -f.width + h.right : h.left,
                            a && b)
                            m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)',
                                m[c] = 0,
                                m[u] = 0,
                                m.willChange = 'transform';
                        else {
                            var w = 'bottom' == c ? -1 : 1
                                , y = 'right' == u ? -1 : 1;
                            m[c] = d * w,
                                m[u] = s * y,
                                m.willChange = c + ', ' + u
                        }
                        var E = {
                            "x-placement": e.placement
                        };
                        return e.attributes = se({}, E, e.attributes),
                            e.styles = se({}, m, e.styles),
                            e.arrowStyles = se({}, e.offsets.arrow, e.arrowStyles),
                            e
                    },
                    gpuAcceleration: !0,
                    x: 'bottom',
                    y: 'right'
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (e) {
                        return Y(e.instance.popper, e.styles),
                            j(e.instance.popper, e.attributes),
                            e.arrowElement && Object.keys(e.arrowStyles).length && Y(e.arrowElement, e.arrowStyles),
                            e
                    },
                    onLoad: function (e, t, o, i, n) {
                        var r = O(n, t, e)
                            , p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                        return t.setAttribute('x-placement', p),
                            Y(t, {
                                position: 'absolute'
                            }),
                            o
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        fe
});
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, g, u) {
    "use strict";
    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value" in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
        }
    }
    function s(t, e, n) {
        return e && i(t.prototype, e),
            n && i(t, n),
            t
    }
    function l(o) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {}
                , e = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(r).filter(function (t) {
                return Object.getOwnPropertyDescriptor(r, t).enumerable
            }))),
                e.forEach(function (t) {
                    var e, n, i;
                    e = o,
                        i = r[n = t],
                        n in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                })
        }
        return o
    }
    g = g && g.hasOwnProperty("default") ? g.default : g,
        u = u && u.hasOwnProperty("default") ? u.default : u;
    var e = "transitionend";
    function n(t) {
        var e = this
            , n = !1;
        return g(this).one(_.TRANSITION_END, function () {
            n = !0
        }),
            setTimeout(function () {
                n || _.triggerTransitionEnd(e)
            }, t),
            this
    }
    var _ = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
            for (; t += ~~(1e6 * Math.random()),
                document.getElementById(t);)
                ;
            return t
        },
        getSelectorFromElement: function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function (t) {
            if (!t)
                return 0;
            var e = g(t).css("transition-duration")
                , n = g(t).css("transition-delay")
                , i = parseFloat(e)
                , o = parseFloat(n);
            return i || o ? (e = e.split(",")[0],
                n = n.split(",")[0],
                1e3 * (parseFloat(e) + parseFloat(n))) : 0
        },
        reflow: function (t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function (t) {
            g(t).trigger(e)
        },
        supportsTransitionEnd: function () {
            return Boolean(e)
        },
        isElement: function (t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function (t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i]
                        , r = e[i]
                        , s = r && _.isElement(r) ? "element" : (a = r,
                            {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(o).test(s))
                        throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                }
            var a
        },
        findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow)
                return null;
            if ("function" != typeof t.getRootNode)
                return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    g.fn.emulateTransitionEnd = n,
        g.event.special[_.TRANSITION_END] = {
            bindType: e,
            delegateType: e,
            handle: function (t) {
                if (g(t.target).is(this))
                    return t.handleObj.handler.apply(this, arguments)
            }
        };
    var o = "alert"
        , r = "bs.alert"
        , a = "." + r
        , c = g.fn[o]
        , h = {
            CLOSE: "close" + a,
            CLOSED: "closed" + a,
            CLICK_DATA_API: "click" + a + ".data-api"
        }
        , f = "alert"
        , d = "fade"
        , m = "show"
        , p = function () {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)),
                    this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }
                ,
                t.dispose = function () {
                    g.removeData(this._element, r),
                        this._element = null
                }
                ,
                t._getRootElement = function (t) {
                    var e = _.getSelectorFromElement(t)
                        , n = !1;
                    return e && (n = document.querySelector(e)),
                        n || (n = g(t).closest("." + f)[0]),
                        n
                }
                ,
                t._triggerCloseEvent = function (t) {
                    var e = g.Event(h.CLOSE);
                    return g(t).trigger(e),
                        e
                }
                ,
                t._removeElement = function (e) {
                    var n = this;
                    if (g(e).removeClass(m),
                        g(e).hasClass(d)) {
                        var t = _.getTransitionDurationFromElement(e);
                        g(e).one(_.TRANSITION_END, function (t) {
                            return n._destroyElement(e, t)
                        }).emulateTransitionEnd(t)
                    } else
                        this._destroyElement(e)
                }
                ,
                t._destroyElement = function (t) {
                    g(t).detach().trigger(h.CLOSED).remove()
                }
                ,
                i._jQueryInterface = function (n) {
                    return this.each(function () {
                        var t = g(this)
                            , e = t.data(r);
                        e || (e = new i(this),
                            t.data(r, e)),
                            "close" === n && e[n](this)
                    })
                }
                ,
                i._handleDismiss = function (e) {
                    return function (t) {
                        t && t.preventDefault(),
                            e.close(this)
                    }
                }
                ,
                s(i, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }]),
                i
        }();
    g(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p)),
        g.fn[o] = p._jQueryInterface,
        g.fn[o].Constructor = p,
        g.fn[o].noConflict = function () {
            return g.fn[o] = c,
                p._jQueryInterface
        }
        ;
    var v = "button"
        , y = "bs.button"
        , E = "." + y
        , C = ".data-api"
        , T = g.fn[v]
        , S = "active"
        , b = "btn"
        , I = "focus"
        , D = '[data-toggle^="button"]'
        , w = '[data-toggle="buttons"]'
        , A = 'input:not([type="hidden"])'
        , N = ".active"
        , O = ".btn"
        , k = {
            CLICK_DATA_API: "click" + E + C,
            FOCUS_BLUR_DATA_API: "focus" + E + C + " blur" + E + C
        }
        , P = function () {
            function n(t) {
                this._element = t
            }
            var t = n.prototype;
            return t.toggle = function () {
                var t = !0
                    , e = !0
                    , n = g(this._element).closest(w)[0];
                if (n) {
                    var i = this._element.querySelector(A);
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(S))
                                t = !1;
                            else {
                                var o = n.querySelector(N);
                                o && g(o).removeClass(S)
                            }
                        if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled"))
                                return;
                            i.checked = !this._element.classList.contains(S),
                                g(i).trigger("change")
                        }
                        i.focus(),
                            e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(S)),
                    t && g(this._element).toggleClass(S)
            }
                ,
                t.dispose = function () {
                    g.removeData(this._element, y),
                        this._element = null
                }
                ,
                n._jQueryInterface = function (e) {
                    return this.each(function () {
                        var t = g(this).data(y);
                        t || (t = new n(this),
                            g(this).data(y, t)),
                            "toggle" === e && t[e]()
                    })
                }
                ,
                s(n, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }]),
                n
        }();
    g(document).on(k.CLICK_DATA_API, D, function (t) {
        t.preventDefault();
        var e = t.target;
        g(e).hasClass(b) || (e = g(e).closest(O)),
            P._jQueryInterface.call(g(e), "toggle")
    }).on(k.FOCUS_BLUR_DATA_API, D, function (t) {
        var e = g(t.target).closest(O)[0];
        g(e).toggleClass(I, /^focus(in)?$/.test(t.type))
    }),
        g.fn[v] = P._jQueryInterface,
        g.fn[v].Constructor = P,
        g.fn[v].noConflict = function () {
            return g.fn[v] = T,
                P._jQueryInterface
        }
        ;
    var L = "carousel"
        , j = "bs.carousel"
        , H = "." + j
        , R = ".data-api"
        , x = g.fn[L]
        , F = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        }
        , U = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        }
        , W = "next"
        , q = "prev"
        , M = "left"
        , K = "right"
        , Q = {
            SLIDE: "slide" + H,
            SLID: "slid" + H,
            KEYDOWN: "keydown" + H,
            MOUSEENTER: "mouseenter" + H,
            MOUSELEAVE: "mouseleave" + H,
            TOUCHSTART: "touchstart" + H,
            TOUCHMOVE: "touchmove" + H,
            TOUCHEND: "touchend" + H,
            POINTERDOWN: "pointerdown" + H,
            POINTERUP: "pointerup" + H,
            DRAG_START: "dragstart" + H,
            LOAD_DATA_API: "load" + H + R,
            CLICK_DATA_API: "click" + H + R
        }
        , B = "carousel"
        , V = "active"
        , Y = "slide"
        , z = "carousel-item-right"
        , X = "carousel-item-left"
        , $ = "carousel-item-next"
        , G = "carousel-item-prev"
        , J = "pointer-event"
        , Z = ".active"
        , tt = ".active.carousel-item"
        , et = ".carousel-item"
        , nt = ".carousel-item img"
        , it = ".carousel-item-next, .carousel-item-prev"
        , ot = ".carousel-indicators"
        , rt = "[data-slide], [data-slide-to]"
        , st = '[data-ride="carousel"]'
        , at = {
            TOUCH: "touch",
            PEN: "pen"
        }
        , lt = function () {
            function r(t, e) {
                this._items = null,
                    this._interval = null,
                    this._activeElement = null,
                    this._isPaused = !1,
                    this._isSliding = !1,
                    this.touchTimeout = null,
                    this.touchStartX = 0,
                    this.touchDeltaX = 0,
                    this._config = this._getConfig(e),
                    this._element = t,
                    this._indicatorsElement = this._element.querySelector(ot),
                    this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints,
                    this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent),
                    this._addEventListeners()
            }
            var t = r.prototype;
            return t.next = function () {
                this._isSliding || this._slide(W)
            }
                ,
                t.nextWhenVisible = function () {
                    !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
                }
                ,
                t.prev = function () {
                    this._isSliding || this._slide(q)
                }
                ,
                t.pause = function (t) {
                    t || (this._isPaused = !0),
                        this._element.querySelector(it) && (_.triggerTransitionEnd(this._element),
                            this.cycle(!0)),
                        clearInterval(this._interval),
                        this._interval = null
                }
                ,
                t.cycle = function (t) {
                    t || (this._isPaused = !1),
                        this._interval && (clearInterval(this._interval),
                            this._interval = null),
                        this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                }
                ,
                t.to = function (t) {
                    var e = this;
                    this._activeElement = this._element.querySelector(tt);
                    var n = this._getItemIndex(this._activeElement);
                    if (!(t > this._items.length - 1 || t < 0))
                        if (this._isSliding)
                            g(this._element).one(Q.SLID, function () {
                                return e.to(t)
                            });
                        else {
                            if (n === t)
                                return this.pause(),
                                    void this.cycle();
                            var i = n < t ? W : q;
                            this._slide(i, this._items[t])
                        }
                }
                ,
                t.dispose = function () {
                    g(this._element).off(H),
                        g.removeData(this._element, j),
                        this._items = null,
                        this._config = null,
                        this._element = null,
                        this._interval = null,
                        this._isPaused = null,
                        this._isSliding = null,
                        this._activeElement = null,
                        this._indicatorsElement = null
                }
                ,
                t._getConfig = function (t) {
                    return t = l({}, F, t),
                        _.typeCheckConfig(L, t, U),
                        t
                }
                ,
                t._handleSwipe = function () {
                    var t = Math.abs(this.touchDeltaX);
                    if (!(t <= 40)) {
                        var e = t / this.touchDeltaX;
                        0 < e && this.prev(),
                            e < 0 && this.next()
                    }
                }
                ,
                t._addEventListeners = function () {
                    var e = this;
                    this._config.keyboard && g(this._element).on(Q.KEYDOWN, function (t) {
                        return e._keydown(t)
                    }),
                        "hover" === this._config.pause && g(this._element).on(Q.MOUSEENTER, function (t) {
                            return e.pause(t)
                        }).on(Q.MOUSELEAVE, function (t) {
                            return e.cycle(t)
                        }),
                        this._config.touch && this._addTouchEventListeners()
                }
                ,
                t._addTouchEventListeners = function () {
                    var n = this;
                    if (this._touchSupported) {
                        var e = function (t) {
                            n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                        }
                            , i = function (t) {
                                n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX),
                                    n._handleSwipe(),
                                    "hover" === n._config.pause && (n.pause(),
                                        n.touchTimeout && clearTimeout(n.touchTimeout),
                                        n.touchTimeout = setTimeout(function (t) {
                                            return n.cycle(t)
                                        }, 500 + n._config.interval))
                            };
                        g(this._element.querySelectorAll(nt)).on(Q.DRAG_START, function (t) {
                            return t.preventDefault()
                        }),
                            this._pointerEvent ? (g(this._element).on(Q.POINTERDOWN, function (t) {
                                return e(t)
                            }),
                                g(this._element).on(Q.POINTERUP, function (t) {
                                    return i(t)
                                }),
                                this._element.classList.add(J)) : (g(this._element).on(Q.TOUCHSTART, function (t) {
                                    return e(t)
                                }),
                                    g(this._element).on(Q.TOUCHMOVE, function (t) {
                                        var e;
                                        (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                                    }),
                                    g(this._element).on(Q.TOUCHEND, function (t) {
                                        return i(t)
                                    }))
                    }
                }
                ,
                t._keydown = function (t) {
                    if (!/input|textarea/i.test(t.target.tagName))
                        switch (t.which) {
                            case 37:
                                t.preventDefault(),
                                    this.prev();
                                break;
                            case 39:
                                t.preventDefault(),
                                    this.next()
                        }
                }
                ,
                t._getItemIndex = function (t) {
                    return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(et)) : [],
                        this._items.indexOf(t)
                }
                ,
                t._getItemByDirection = function (t, e) {
                    var n = t === W
                        , i = t === q
                        , o = this._getItemIndex(e)
                        , r = this._items.length - 1;
                    if ((i && 0 === o || n && o === r) && !this._config.wrap)
                        return e;
                    var s = (o + (t === q ? -1 : 1)) % this._items.length;
                    return -1 === s ? this._items[this._items.length - 1] : this._items[s]
                }
                ,
                t._triggerSlideEvent = function (t, e) {
                    var n = this._getItemIndex(t)
                        , i = this._getItemIndex(this._element.querySelector(tt))
                        , o = g.Event(Q.SLIDE, {
                            relatedTarget: t,
                            direction: e,
                            from: i,
                            to: n
                        });
                    return g(this._element).trigger(o),
                        o
                }
                ,
                t._setActiveIndicatorElement = function (t) {
                    if (this._indicatorsElement) {
                        var e = [].slice.call(this._indicatorsElement.querySelectorAll(Z));
                        g(e).removeClass(V);
                        var n = this._indicatorsElement.children[this._getItemIndex(t)];
                        n && g(n).addClass(V)
                    }
                }
                ,
                t._slide = function (t, e) {
                    var n, i, o, r = this, s = this._element.querySelector(tt), a = this._getItemIndex(s), l = e || s && this._getItemByDirection(t, s), c = this._getItemIndex(l), h = Boolean(this._interval);
                    if (o = t === W ? (n = X,
                        i = $,
                        M) : (n = z,
                            i = G,
                            K),
                        l && g(l).hasClass(V))
                        this._isSliding = !1;
                    else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
                        this._isSliding = !0,
                            h && this.pause(),
                            this._setActiveIndicatorElement(l);
                        var u = g.Event(Q.SLID, {
                            relatedTarget: l,
                            direction: o,
                            from: a,
                            to: c
                        });
                        if (g(this._element).hasClass(Y)) {
                            g(l).addClass(i),
                                _.reflow(l),
                                g(s).addClass(n),
                                g(l).addClass(n);
                            var f = parseInt(l.getAttribute("data-interval"), 10);
                            this._config.interval = f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval,
                                f) : this._config.defaultInterval || this._config.interval;
                            var d = _.getTransitionDurationFromElement(s);
                            g(s).one(_.TRANSITION_END, function () {
                                g(l).removeClass(n + " " + i).addClass(V),
                                    g(s).removeClass(V + " " + i + " " + n),
                                    r._isSliding = !1,
                                    setTimeout(function () {
                                        return g(r._element).trigger(u)
                                    }, 0)
                            }).emulateTransitionEnd(d)
                        } else
                            g(s).removeClass(V),
                                g(l).addClass(V),
                                this._isSliding = !1,
                                g(this._element).trigger(u);
                        h && this.cycle()
                    }
                }
                ,
                r._jQueryInterface = function (i) {
                    return this.each(function () {
                        var t = g(this).data(j)
                            , e = l({}, F, g(this).data());
                        "object" == typeof i && (e = l({}, e, i));
                        var n = "string" == typeof i ? i : e.slide;
                        if (t || (t = new r(this, e),
                            g(this).data(j, t)),
                            "number" == typeof i)
                            t.to(i);
                        else if ("string" == typeof n) {
                            if ("undefined" == typeof t[n])
                                throw new TypeError('No method named "' + n + '"');
                            t[n]()
                        } else
                            e.interval && e.ride && (t.pause(),
                                t.cycle())
                    })
                }
                ,
                r._dataApiClickHandler = function (t) {
                    var e = _.getSelectorFromElement(this);
                    if (e) {
                        var n = g(e)[0];
                        if (n && g(n).hasClass(B)) {
                            var i = l({}, g(n).data(), g(this).data())
                                , o = this.getAttribute("data-slide-to");
                            o && (i.interval = !1),
                                r._jQueryInterface.call(g(n), i),
                                o && g(n).data(j).to(o),
                                t.preventDefault()
                        }
                    }
                }
                ,
                s(r, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return F
                    }
                }]),
                r
        }();
    g(document).on(Q.CLICK_DATA_API, rt, lt._dataApiClickHandler),
        g(window).on(Q.LOAD_DATA_API, function () {
            for (var t = [].slice.call(document.querySelectorAll(st)), e = 0, n = t.length; e < n; e++) {
                var i = g(t[e]);
                lt._jQueryInterface.call(i, i.data())
            }
        }),
        g.fn[L] = lt._jQueryInterface,
        g.fn[L].Constructor = lt,
        g.fn[L].noConflict = function () {
            return g.fn[L] = x,
                lt._jQueryInterface
        }
        ;
    var ct = "collapse"
        , ht = "bs.collapse"
        , ut = "." + ht
        , ft = g.fn[ct]
        , dt = {
            toggle: !0,
            parent: ""
        }
        , gt = {
            toggle: "boolean",
            parent: "(string|element)"
        }
        , _t = {
            SHOW: "show" + ut,
            SHOWN: "shown" + ut,
            HIDE: "hide" + ut,
            HIDDEN: "hidden" + ut,
            CLICK_DATA_API: "click" + ut + ".data-api"
        }
        , mt = "show"
        , pt = "collapse"
        , vt = "collapsing"
        , yt = "collapsed"
        , Et = "width"
        , Ct = "height"
        , Tt = ".show, .collapsing"
        , St = '[data-toggle="collapse"]'
        , bt = function () {
            function a(e, t) {
                this._isTransitioning = !1,
                    this._element = e,
                    this._config = this._getConfig(t),
                    this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(St)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i]
                        , s = _.getSelectorFromElement(r)
                        , a = [].slice.call(document.querySelectorAll(s)).filter(function (t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s,
                        this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null,
                    this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
                    this._config.toggle && this.toggle()
            }
            var t = a.prototype;
            return t.toggle = function () {
                g(this._element).hasClass(mt) ? this.hide() : this.show()
            }
                ,
                t.show = function () {
                    var t, e, n = this;
                    if (!this._isTransitioning && !g(this._element).hasClass(mt) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(Tt)).filter(function (t) {
                        return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(pt)
                    })).length && (t = null),
                        !(t && (e = g(t).not(this._selector).data(ht)) && e._isTransitioning))) {
                        var i = g.Event(_t.SHOW);
                        if (g(this._element).trigger(i),
                            !i.isDefaultPrevented()) {
                            t && (a._jQueryInterface.call(g(t).not(this._selector), "hide"),
                                e || g(t).data(ht, null));
                            var o = this._getDimension();
                            g(this._element).removeClass(pt).addClass(vt),
                                this._element.style[o] = 0,
                                this._triggerArray.length && g(this._triggerArray).removeClass(yt).attr("aria-expanded", !0),
                                this.setTransitioning(!0);
                            var r = "scroll" + (o[0].toUpperCase() + o.slice(1))
                                , s = _.getTransitionDurationFromElement(this._element);
                            g(this._element).one(_.TRANSITION_END, function () {
                                g(n._element).removeClass(vt).addClass(pt).addClass(mt),
                                    n._element.style[o] = "",
                                    n.setTransitioning(!1),
                                    g(n._element).trigger(_t.SHOWN)
                            }).emulateTransitionEnd(s),
                                this._element.style[o] = this._element[r] + "px"
                        }
                    }
                }
                ,
                t.hide = function () {
                    var t = this;
                    if (!this._isTransitioning && g(this._element).hasClass(mt)) {
                        var e = g.Event(_t.HIDE);
                        if (g(this._element).trigger(e),
                            !e.isDefaultPrevented()) {
                            var n = this._getDimension();
                            this._element.style[n] = this._element.getBoundingClientRect()[n] + "px",
                                _.reflow(this._element),
                                g(this._element).addClass(vt).removeClass(pt).removeClass(mt);
                            var i = this._triggerArray.length;
                            if (0 < i)
                                for (var o = 0; o < i; o++) {
                                    var r = this._triggerArray[o]
                                        , s = _.getSelectorFromElement(r);
                                    if (null !== s)
                                        g([].slice.call(document.querySelectorAll(s))).hasClass(mt) || g(r).addClass(yt).attr("aria-expanded", !1)
                                }
                            this.setTransitioning(!0);
                            this._element.style[n] = "";
                            var a = _.getTransitionDurationFromElement(this._element);
                            g(this._element).one(_.TRANSITION_END, function () {
                                t.setTransitioning(!1),
                                    g(t._element).removeClass(vt).addClass(pt).trigger(_t.HIDDEN)
                            }).emulateTransitionEnd(a)
                        }
                    }
                }
                ,
                t.setTransitioning = function (t) {
                    this._isTransitioning = t
                }
                ,
                t.dispose = function () {
                    g.removeData(this._element, ht),
                        this._config = null,
                        this._parent = null,
                        this._element = null,
                        this._triggerArray = null,
                        this._isTransitioning = null
                }
                ,
                t._getConfig = function (t) {
                    return (t = l({}, dt, t)).toggle = Boolean(t.toggle),
                        _.typeCheckConfig(ct, t, gt),
                        t
                }
                ,
                t._getDimension = function () {
                    return g(this._element).hasClass(Et) ? Et : Ct
                }
                ,
                t._getParent = function () {
                    var t, n = this;
                    _.isElement(this._config.parent) ? (t = this._config.parent,
                        "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                    var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]'
                        , i = [].slice.call(t.querySelectorAll(e));
                    return g(i).each(function (t, e) {
                        n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                    }),
                        t
                }
                ,
                t._addAriaAndCollapsedClass = function (t, e) {
                    var n = g(t).hasClass(mt);
                    e.length && g(e).toggleClass(yt, !n).attr("aria-expanded", n)
                }
                ,
                a._getTargetFromElement = function (t) {
                    var e = _.getSelectorFromElement(t);
                    return e ? document.querySelector(e) : null
                }
                ,
                a._jQueryInterface = function (i) {
                    return this.each(function () {
                        var t = g(this)
                            , e = t.data(ht)
                            , n = l({}, dt, t.data(), "object" == typeof i && i ? i : {});
                        if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
                            e || (e = new a(this, n),
                                t.data(ht, e)),
                            "string" == typeof i) {
                            if ("undefined" == typeof e[i])
                                throw new TypeError('No method named "' + i + '"');
                            e[i]()
                        }
                    })
                }
                ,
                s(a, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return dt
                    }
                }]),
                a
        }();
    g(document).on(_t.CLICK_DATA_API, St, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = g(this)
            , e = _.getSelectorFromElement(this)
            , i = [].slice.call(document.querySelectorAll(e));
        g(i).each(function () {
            var t = g(this)
                , e = t.data(ht) ? "toggle" : n.data();
            bt._jQueryInterface.call(t, e)
        })
    }),
        g.fn[ct] = bt._jQueryInterface,
        g.fn[ct].Constructor = bt,
        g.fn[ct].noConflict = function () {
            return g.fn[ct] = ft,
                bt._jQueryInterface
        }
        ;
    var It = "dropdown"
        , Dt = "bs.dropdown"
        , wt = "." + Dt
        , At = ".data-api"
        , Nt = g.fn[It]
        , Ot = new RegExp("38|40|27")
        , kt = {
            HIDE: "hide" + wt,
            HIDDEN: "hidden" + wt,
            SHOW: "show" + wt,
            SHOWN: "shown" + wt,
            CLICK: "click" + wt,
            CLICK_DATA_API: "click" + wt + At,
            KEYDOWN_DATA_API: "keydown" + wt + At,
            KEYUP_DATA_API: "keyup" + wt + At
        }
        , Pt = "disabled"
        , Lt = "show"
        , jt = "dropup"
        , Ht = "dropright"
        , Rt = "dropleft"
        , xt = "dropdown-menu-right"
        , Ft = "position-static"
        , Ut = '[data-toggle="dropdown"]'
        , Wt = ".dropdown form"
        , qt = ".dropdown-menu"
        , Mt = ".navbar-nav"
        , Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
        , Qt = "top-start"
        , Bt = "top-end"
        , Vt = "bottom-start"
        , Yt = "bottom-end"
        , zt = "right-start"
        , Xt = "left-start"
        , $t = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        }
        , Gt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }
        , Jt = function () {
            function c(t, e) {
                this._element = t,
                    this._popper = null,
                    this._config = this._getConfig(e),
                    this._menu = this._getMenuElement(),
                    this._inNavbar = this._detectNavbar(),
                    this._addEventListeners()
            }
            var t = c.prototype;
            return t.toggle = function () {
                if (!this._element.disabled && !g(this._element).hasClass(Pt)) {
                    var t = c._getParentFromElement(this._element)
                        , e = g(this._menu).hasClass(Lt);
                    if (c._clearMenus(),
                        !e) {
                        var n = {
                            relatedTarget: this._element
                        }
                            , i = g.Event(kt.SHOW, n);
                        if (g(t).trigger(i),
                            !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof u)
                                    throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var o = this._element;
                                "parent" === this._config.reference ? o = t : _.isElement(this._config.reference) && (o = this._config.reference,
                                    "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])),
                                    "scrollParent" !== this._config.boundary && g(t).addClass(Ft),
                                    this._popper = new u(o, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === g(t).closest(Mt).length && g(document.body).children().on("mouseover", null, g.noop),
                                this._element.focus(),
                                this._element.setAttribute("aria-expanded", !0),
                                g(this._menu).toggleClass(Lt),
                                g(t).toggleClass(Lt).trigger(g.Event(kt.SHOWN, n))
                        }
                    }
                }
            }
                ,
                t.show = function () {
                    if (!(this._element.disabled || g(this._element).hasClass(Pt) || g(this._menu).hasClass(Lt))) {
                        var t = {
                            relatedTarget: this._element
                        }
                            , e = g.Event(kt.SHOW, t)
                            , n = c._getParentFromElement(this._element);
                        g(n).trigger(e),
                            e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt),
                                g(n).toggleClass(Lt).trigger(g.Event(kt.SHOWN, t)))
                    }
                }
                ,
                t.hide = function () {
                    if (!this._element.disabled && !g(this._element).hasClass(Pt) && g(this._menu).hasClass(Lt)) {
                        var t = {
                            relatedTarget: this._element
                        }
                            , e = g.Event(kt.HIDE, t)
                            , n = c._getParentFromElement(this._element);
                        g(n).trigger(e),
                            e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt),
                                g(n).toggleClass(Lt).trigger(g.Event(kt.HIDDEN, t)))
                    }
                }
                ,
                t.dispose = function () {
                    g.removeData(this._element, Dt),
                        g(this._element).off(wt),
                        this._element = null,
                        (this._menu = null) !== this._popper && (this._popper.destroy(),
                            this._popper = null)
                }
                ,
                t.update = function () {
                    this._inNavbar = this._detectNavbar(),
                        null !== this._popper && this._popper.scheduleUpdate()
                }
                ,
                t._addEventListeners = function () {
                    var e = this;
                    g(this._element).on(kt.CLICK, function (t) {
                        t.preventDefault(),
                            t.stopPropagation(),
                            e.toggle()
                    })
                }
                ,
                t._getConfig = function (t) {
                    return t = l({}, this.constructor.Default, g(this._element).data(), t),
                        _.typeCheckConfig(It, t, this.constructor.DefaultType),
                        t
                }
                ,
                t._getMenuElement = function () {
                    if (!this._menu) {
                        var t = c._getParentFromElement(this._element);
                        t && (this._menu = t.querySelector(qt))
                    }
                    return this._menu
                }
                ,
                t._getPlacement = function () {
                    var t = g(this._element.parentNode)
                        , e = Vt;
                    return t.hasClass(jt) ? (e = Qt,
                        g(this._menu).hasClass(xt) && (e = Bt)) : t.hasClass(Ht) ? e = zt : t.hasClass(Rt) ? e = Xt : g(this._menu).hasClass(xt) && (e = Yt),
                        e
                }
                ,
                t._detectNavbar = function () {
                    return 0 < g(this._element).closest(".navbar").length
                }
                ,
                t._getOffset = function () {
                    var e = this
                        , t = {};
                    return "function" == typeof this._config.offset ? t.fn = function (t) {
                        return t.offsets = l({}, t.offsets, e._config.offset(t.offsets, e._element) || {}),
                            t
                    }
                        : t.offset = this._config.offset,
                        t
                }
                ,
                t._getPopperConfig = function () {
                    var t = {
                        placement: this._getPlacement(),
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                enabled: this._config.flip
                            },
                            preventOverflow: {
                                boundariesElement: this._config.boundary
                            }
                        }
                    };
                    return "static" === this._config.display && (t.modifiers.applyStyle = {
                        enabled: !1
                    }),
                        t
                }
                ,
                c._jQueryInterface = function (e) {
                    return this.each(function () {
                        var t = g(this).data(Dt);
                        if (t || (t = new c(this, "object" == typeof e ? e : null),
                            g(this).data(Dt, t)),
                            "string" == typeof e) {
                            if ("undefined" == typeof t[e])
                                throw new TypeError('No method named "' + e + '"');
                            t[e]()
                        }
                    })
                }
                ,
                c._clearMenus = function (t) {
                    if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                        for (var e = [].slice.call(document.querySelectorAll(Ut)), n = 0, i = e.length; n < i; n++) {
                            var o = c._getParentFromElement(e[n])
                                , r = g(e[n]).data(Dt)
                                , s = {
                                    relatedTarget: e[n]
                                };
                            if (t && "click" === t.type && (s.clickEvent = t),
                                r) {
                                var a = r._menu;
                                if (g(o).hasClass(Lt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && g.contains(o, t.target))) {
                                    var l = g.Event(kt.HIDE, s);
                                    g(o).trigger(l),
                                        l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop),
                                            e[n].setAttribute("aria-expanded", "false"),
                                            g(a).removeClass(Lt),
                                            g(o).removeClass(Lt).trigger(g.Event(kt.HIDDEN, s)))
                                }
                            }
                        }
                }
                ,
                c._getParentFromElement = function (t) {
                    var e, n = _.getSelectorFromElement(t);
                    return n && (e = document.querySelector(n)),
                        e || t.parentNode
                }
                ,
                c._dataApiKeydownHandler = function (t) {
                    if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || g(t.target).closest(qt).length)) : Ot.test(t.which)) && (t.preventDefault(),
                        t.stopPropagation(),
                        !this.disabled && !g(this).hasClass(Pt))) {
                        var e = c._getParentFromElement(this)
                            , n = g(e).hasClass(Lt);
                        if (n && (!n || 27 !== t.which && 32 !== t.which)) {
                            var i = [].slice.call(e.querySelectorAll(Kt));
                            if (0 !== i.length) {
                                var o = i.indexOf(t.target);
                                38 === t.which && 0 < o && o--,
                                    40 === t.which && o < i.length - 1 && o++,
                                    o < 0 && (o = 0),
                                    i[o].focus()
                            }
                        } else {
                            if (27 === t.which) {
                                var r = e.querySelector(Ut);
                                g(r).trigger("focus")
                            }
                            g(this).trigger("click")
                        }
                    }
                }
                ,
                s(c, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return $t
                    }
                }, {
                    key: "DefaultType",
                    get: function () {
                        return Gt
                    }
                }]),
                c
        }();
    g(document).on(kt.KEYDOWN_DATA_API, Ut, Jt._dataApiKeydownHandler).on(kt.KEYDOWN_DATA_API, qt, Jt._dataApiKeydownHandler).on(kt.CLICK_DATA_API + " " + kt.KEYUP_DATA_API, Jt._clearMenus).on(kt.CLICK_DATA_API, Ut, function (t) {
        t.preventDefault(),
            t.stopPropagation(),
            Jt._jQueryInterface.call(g(this), "toggle")
    }).on(kt.CLICK_DATA_API, Wt, function (t) {
        t.stopPropagation()
    }),
        g.fn[It] = Jt._jQueryInterface,
        g.fn[It].Constructor = Jt,
        g.fn[It].noConflict = function () {
            return g.fn[It] = Nt,
                Jt._jQueryInterface
        }
        ;
    var Zt = "modal"
        , te = "bs.modal"
        , ee = "." + te
        , ne = g.fn[Zt]
        , ie = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }
        , oe = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }
        , re = {
            HIDE: "hide" + ee,
            HIDDEN: "hidden" + ee,
            SHOW: "show" + ee,
            SHOWN: "shown" + ee,
            FOCUSIN: "focusin" + ee,
            RESIZE: "resize" + ee,
            CLICK_DISMISS: "click.dismiss" + ee,
            KEYDOWN_DISMISS: "keydown.dismiss" + ee,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
            CLICK_DATA_API: "click" + ee + ".data-api"
        }
        , se = "modal-dialog-scrollable"
        , ae = "modal-scrollbar-measure"
        , le = "modal-backdrop"
        , ce = "modal-open"
        , he = "fade"
        , ue = "show"
        , fe = ".modal-dialog"
        , de = ".modal-body"
        , ge = '[data-toggle="modal"]'
        , _e = '[data-dismiss="modal"]'
        , me = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
        , pe = ".sticky-top"
        , ve = function () {
            function o(t, e) {
                this._config = this._getConfig(e),
                    this._element = t,
                    this._dialog = t.querySelector(fe),
                    this._backdrop = null,
                    this._isShown = !1,
                    this._isBodyOverflowing = !1,
                    this._ignoreBackdropClick = !1,
                    this._isTransitioning = !1,
                    this._scrollbarWidth = 0
            }
            var t = o.prototype;
            return t.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }
                ,
                t.show = function (t) {
                    var e = this;
                    if (!this._isShown && !this._isTransitioning) {
                        g(this._element).hasClass(he) && (this._isTransitioning = !0);
                        var n = g.Event(re.SHOW, {
                            relatedTarget: t
                        });
                        g(this._element).trigger(n),
                            this._isShown || n.isDefaultPrevented() || (this._isShown = !0,
                                this._checkScrollbar(),
                                this._setScrollbar(),
                                this._adjustDialog(),
                                this._setEscapeEvent(),
                                this._setResizeEvent(),
                                g(this._element).on(re.CLICK_DISMISS, _e, function (t) {
                                    return e.hide(t)
                                }),
                                g(this._dialog).on(re.MOUSEDOWN_DISMISS, function () {
                                    g(e._element).one(re.MOUSEUP_DISMISS, function (t) {
                                        g(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                                    })
                                }),
                                this._showBackdrop(function () {
                                    return e._showElement(t)
                                }))
                    }
                }
                ,
                t.hide = function (t) {
                    var e = this;
                    if (t && t.preventDefault(),
                        this._isShown && !this._isTransitioning) {
                        var n = g.Event(re.HIDE);
                        if (g(this._element).trigger(n),
                            this._isShown && !n.isDefaultPrevented()) {
                            this._isShown = !1;
                            var i = g(this._element).hasClass(he);
                            if (i && (this._isTransitioning = !0),
                                this._setEscapeEvent(),
                                this._setResizeEvent(),
                                g(document).off(re.FOCUSIN),
                                g(this._element).removeClass(ue),
                                g(this._element).off(re.CLICK_DISMISS),
                                g(this._dialog).off(re.MOUSEDOWN_DISMISS),
                                i) {
                                var o = _.getTransitionDurationFromElement(this._element);
                                g(this._element).one(_.TRANSITION_END, function (t) {
                                    return e._hideModal(t)
                                }).emulateTransitionEnd(o)
                            } else
                                this._hideModal()
                        }
                    }
                }
                ,
                t.dispose = function () {
                    [window, this._element, this._dialog].forEach(function (t) {
                        return g(t).off(ee)
                    }),
                        g(document).off(re.FOCUSIN),
                        g.removeData(this._element, te),
                        this._config = null,
                        this._element = null,
                        this._dialog = null,
                        this._backdrop = null,
                        this._isShown = null,
                        this._isBodyOverflowing = null,
                        this._ignoreBackdropClick = null,
                        this._isTransitioning = null,
                        this._scrollbarWidth = null
                }
                ,
                t.handleUpdate = function () {
                    this._adjustDialog()
                }
                ,
                t._getConfig = function (t) {
                    return t = l({}, ie, t),
                        _.typeCheckConfig(Zt, t, oe),
                        t
                }
                ,
                t._showElement = function (t) {
                    var e = this
                        , n = g(this._element).hasClass(he);
                    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element),
                        this._element.style.display = "block",
                        this._element.removeAttribute("aria-hidden"),
                        this._element.setAttribute("aria-modal", !0),
                        g(this._dialog).hasClass(se) ? this._dialog.querySelector(de).scrollTop = 0 : this._element.scrollTop = 0,
                        n && _.reflow(this._element),
                        g(this._element).addClass(ue),
                        this._config.focus && this._enforceFocus();
                    var i = g.Event(re.SHOWN, {
                        relatedTarget: t
                    })
                        , o = function () {
                            e._config.focus && e._element.focus(),
                                e._isTransitioning = !1,
                                g(e._element).trigger(i)
                        };
                    if (n) {
                        var r = _.getTransitionDurationFromElement(this._dialog);
                        g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else
                        o()
                }
                ,
                t._enforceFocus = function () {
                    var e = this;
                    g(document).off(re.FOCUSIN).on(re.FOCUSIN, function (t) {
                        document !== t.target && e._element !== t.target && 0 === g(e._element).has(t.target).length && e._element.focus()
                    })
                }
                ,
                t._setEscapeEvent = function () {
                    var e = this;
                    this._isShown && this._config.keyboard ? g(this._element).on(re.KEYDOWN_DISMISS, function (t) {
                        27 === t.which && (t.preventDefault(),
                            e.hide())
                    }) : this._isShown || g(this._element).off(re.KEYDOWN_DISMISS)
                }
                ,
                t._setResizeEvent = function () {
                    var e = this;
                    this._isShown ? g(window).on(re.RESIZE, function (t) {
                        return e.handleUpdate(t)
                    }) : g(window).off(re.RESIZE)
                }
                ,
                t._hideModal = function () {
                    var t = this;
                    this._element.style.display = "none",
                        this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        this._isTransitioning = !1,
                        this._showBackdrop(function () {
                            g(document.body).removeClass(ce),
                                t._resetAdjustments(),
                                t._resetScrollbar(),
                                g(t._element).trigger(re.HIDDEN)
                        })
                }
                ,
                t._removeBackdrop = function () {
                    this._backdrop && (g(this._backdrop).remove(),
                        this._backdrop = null)
                }
                ,
                t._showBackdrop = function (t) {
                    var e = this
                        , n = g(this._element).hasClass(he) ? he : "";
                    if (this._isShown && this._config.backdrop) {
                        if (this._backdrop = document.createElement("div"),
                            this._backdrop.className = le,
                            n && this._backdrop.classList.add(n),
                            g(this._backdrop).appendTo(document.body),
                            g(this._element).on(re.CLICK_DISMISS, function (t) {
                                e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                            }),
                            n && _.reflow(this._backdrop),
                            g(this._backdrop).addClass(ue),
                            !t)
                            return;
                        if (!n)
                            return void t();
                        var i = _.getTransitionDurationFromElement(this._backdrop);
                        g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i)
                    } else if (!this._isShown && this._backdrop) {
                        g(this._backdrop).removeClass(ue);
                        var o = function () {
                            e._removeBackdrop(),
                                t && t()
                        };
                        if (g(this._element).hasClass(he)) {
                            var r = _.getTransitionDurationFromElement(this._backdrop);
                            g(this._backdrop).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                        } else
                            o()
                    } else
                        t && t()
                }
                ,
                t._adjustDialog = function () {
                    var t = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
                        this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                }
                ,
                t._resetAdjustments = function () {
                    this._element.style.paddingLeft = "",
                        this._element.style.paddingRight = ""
                }
                ,
                t._checkScrollbar = function () {
                    var t = document.body.getBoundingClientRect();
                    this._isBodyOverflowing = t.left + t.right < window.innerWidth,
                        this._scrollbarWidth = this._getScrollbarWidth()
                }
                ,
                t._setScrollbar = function () {
                    var o = this;
                    if (this._isBodyOverflowing) {
                        var t = [].slice.call(document.querySelectorAll(me))
                            , e = [].slice.call(document.querySelectorAll(pe));
                        g(t).each(function (t, e) {
                            var n = e.style.paddingRight
                                , i = g(e).css("padding-right");
                            g(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                        }),
                            g(e).each(function (t, e) {
                                var n = e.style.marginRight
                                    , i = g(e).css("margin-right");
                                g(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                            });
                        var n = document.body.style.paddingRight
                            , i = g(document.body).css("padding-right");
                        g(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                    }
                    g(document.body).addClass(ce)
                }
                ,
                t._resetScrollbar = function () {
                    var t = [].slice.call(document.querySelectorAll(me));
                    g(t).each(function (t, e) {
                        var n = g(e).data("padding-right");
                        g(e).removeData("padding-right"),
                            e.style.paddingRight = n || ""
                    });
                    var e = [].slice.call(document.querySelectorAll("" + pe));
                    g(e).each(function (t, e) {
                        var n = g(e).data("margin-right");
                        "undefined" != typeof n && g(e).css("margin-right", n).removeData("margin-right")
                    });
                    var n = g(document.body).data("padding-right");
                    g(document.body).removeData("padding-right"),
                        document.body.style.paddingRight = n || ""
                }
                ,
                t._getScrollbarWidth = function () {
                    var t = document.createElement("div");
                    t.className = ae,
                        document.body.appendChild(t);
                    var e = t.getBoundingClientRect().width - t.clientWidth;
                    return document.body.removeChild(t),
                        e
                }
                ,
                o._jQueryInterface = function (n, i) {
                    return this.each(function () {
                        var t = g(this).data(te)
                            , e = l({}, ie, g(this).data(), "object" == typeof n && n ? n : {});
                        if (t || (t = new o(this, e),
                            g(this).data(te, t)),
                            "string" == typeof n) {
                            if ("undefined" == typeof t[n])
                                throw new TypeError('No method named "' + n + '"');
                            t[n](i)
                        } else
                            e.show && t.show(i)
                    })
                }
                ,
                s(o, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return ie
                    }
                }]),
                o
        }();
    g(document).on(re.CLICK_DATA_API, ge, function (t) {
        var e, n = this, i = _.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = g(e).data(te) ? "toggle" : l({}, g(e).data(), g(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = g(e).one(re.SHOW, function (t) {
            t.isDefaultPrevented() || r.one(re.HIDDEN, function () {
                g(n).is(":visible") && n.focus()
            })
        });
        ve._jQueryInterface.call(g(e), o, this)
    }),
        g.fn[Zt] = ve._jQueryInterface,
        g.fn[Zt].Constructor = ve,
        g.fn[Zt].noConflict = function () {
            return g.fn[Zt] = ne,
                ve._jQueryInterface
        }
        ;
    var ye = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]
        , Ee = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }
        , Ce = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi
        , Te = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function Se(t, s, e) {
        if (0 === t.length)
            return t;
        if (e && "function" == typeof e)
            return e(t);
        for (var n = (new window.DOMParser).parseFromString(t, "text/html"), a = Object.keys(s), l = [].slice.call(n.body.querySelectorAll("*")), i = function (t, e) {
            var n = l[t]
                , i = n.nodeName.toLowerCase();
            if (-1 === a.indexOf(n.nodeName.toLowerCase()))
                return n.parentNode.removeChild(n),
                    "continue";
            var o = [].slice.call(n.attributes)
                , r = [].concat(s["*"] || [], s[i] || []);
            o.forEach(function (t) {
                (function (t, e) {
                    var n = t.nodeName.toLowerCase();
                    if (-1 !== e.indexOf(n))
                        return -1 === ye.indexOf(n) || Boolean(t.nodeValue.match(Ce) || t.nodeValue.match(Te));
                    for (var i = e.filter(function (t) {
                        return t instanceof RegExp
                    }), o = 0, r = i.length; o < r; o++)
                        if (n.match(i[o]))
                            return !0;
                    return !1
                }
                )(t, r) || n.removeAttribute(t.nodeName)
            })
        }, o = 0, r = l.length; o < r; o++)
            i(o);
        return n.body.innerHTML
    }
    var be = "tooltip"
        , Ie = "bs.tooltip"
        , De = "." + Ie
        , we = g.fn[be]
        , Ae = "bs-tooltip"
        , Ne = new RegExp("(^|\\s)" + Ae + "\\S+", "g")
        , Oe = ["sanitize", "whiteList", "sanitizeFn"]
        , ke = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        }
        , Pe = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        }
        , Le = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Ee
        }
        , je = "show"
        , He = "out"
        , Re = {
            HIDE: "hide" + De,
            HIDDEN: "hidden" + De,
            SHOW: "show" + De,
            SHOWN: "shown" + De,
            INSERTED: "inserted" + De,
            CLICK: "click" + De,
            FOCUSIN: "focusin" + De,
            FOCUSOUT: "focusout" + De,
            MOUSEENTER: "mouseenter" + De,
            MOUSELEAVE: "mouseleave" + De
        }
        , xe = "fade"
        , Fe = "show"
        , Ue = ".tooltip-inner"
        , We = ".arrow"
        , qe = "hover"
        , Me = "focus"
        , Ke = "click"
        , Qe = "manual"
        , Be = function () {
            function i(t, e) {
                if ("undefined" == typeof u)
                    throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0,
                    this._timeout = 0,
                    this._hoverState = "",
                    this._activeTrigger = {},
                    this._popper = null,
                    this.element = t,
                    this.config = this._getConfig(e),
                    this.tip = null,
                    this._setListeners()
            }
            var t = i.prototype;
            return t.enable = function () {
                this._isEnabled = !0
            }
                ,
                t.disable = function () {
                    this._isEnabled = !1
                }
                ,
                t.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled
                }
                ,
                t.toggle = function (t) {
                    if (this._isEnabled)
                        if (t) {
                            var e = this.constructor.DATA_KEY
                                , n = g(t.currentTarget).data(e);
                            n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()),
                                g(t.currentTarget).data(e, n)),
                                n._activeTrigger.click = !n._activeTrigger.click,
                                n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                        } else {
                            if (g(this.getTipElement()).hasClass(Fe))
                                return void this._leave(null, this);
                            this._enter(null, this)
                        }
                }
                ,
                t.dispose = function () {
                    clearTimeout(this._timeout),
                        g.removeData(this.element, this.constructor.DATA_KEY),
                        g(this.element).off(this.constructor.EVENT_KEY),
                        g(this.element).closest(".modal").off("hide.bs.modal"),
                        this.tip && g(this.tip).remove(),
                        this._isEnabled = null,
                        this._timeout = null,
                        this._hoverState = null,
                        (this._activeTrigger = null) !== this._popper && this._popper.destroy(),
                        this._popper = null,
                        this.element = null,
                        this.config = null,
                        this.tip = null
                }
                ,
                t.show = function () {
                    var e = this;
                    if ("none" === g(this.element).css("display"))
                        throw new Error("Please use show on visible elements");
                    var t = g.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        g(this.element).trigger(t);
                        var n = _.findShadowRoot(this.element)
                            , i = g.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                        if (t.isDefaultPrevented() || !i)
                            return;
                        var o = this.getTipElement()
                            , r = _.getUID(this.constructor.NAME);
                        o.setAttribute("id", r),
                            this.element.setAttribute("aria-describedby", r),
                            this.setContent(),
                            this.config.animation && g(o).addClass(xe);
                        var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement
                            , a = this._getAttachment(s);
                        this.addAttachmentClass(a);
                        var l = this._getContainer();
                        g(o).data(this.constructor.DATA_KEY, this),
                            g.contains(this.element.ownerDocument.documentElement, this.tip) || g(o).appendTo(l),
                            g(this.element).trigger(this.constructor.Event.INSERTED),
                            this._popper = new u(this.element, o, {
                                placement: a,
                                modifiers: {
                                    offset: this._getOffset(),
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: We
                                    },
                                    preventOverflow: {
                                        boundariesElement: this.config.boundary
                                    }
                                },
                                onCreate: function (t) {
                                    t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                                },
                                onUpdate: function (t) {
                                    return e._handlePopperPlacementChange(t)
                                }
                            }),
                            g(o).addClass(Fe),
                            "ontouchstart" in document.documentElement && g(document.body).children().on("mouseover", null, g.noop);
                        var c = function () {
                            e.config.animation && e._fixTransition();
                            var t = e._hoverState;
                            e._hoverState = null,
                                g(e.element).trigger(e.constructor.Event.SHOWN),
                                t === He && e._leave(null, e)
                        };
                        if (g(this.tip).hasClass(xe)) {
                            var h = _.getTransitionDurationFromElement(this.tip);
                            g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h)
                        } else
                            c()
                    }
                }
                ,
                t.hide = function (t) {
                    var e = this
                        , n = this.getTipElement()
                        , i = g.Event(this.constructor.Event.HIDE)
                        , o = function () {
                            e._hoverState !== je && n.parentNode && n.parentNode.removeChild(n),
                                e._cleanTipClass(),
                                e.element.removeAttribute("aria-describedby"),
                                g(e.element).trigger(e.constructor.Event.HIDDEN),
                                null !== e._popper && e._popper.destroy(),
                                t && t()
                        };
                    if (g(this.element).trigger(i),
                        !i.isDefaultPrevented()) {
                        if (g(n).removeClass(Fe),
                            "ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop),
                            this._activeTrigger[Ke] = !1,
                            this._activeTrigger[Me] = !1,
                            this._activeTrigger[qe] = !1,
                            g(this.tip).hasClass(xe)) {
                            var r = _.getTransitionDurationFromElement(n);
                            g(n).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                        } else
                            o();
                        this._hoverState = ""
                    }
                }
                ,
                t.update = function () {
                    null !== this._popper && this._popper.scheduleUpdate()
                }
                ,
                t.isWithContent = function () {
                    return Boolean(this.getTitle())
                }
                ,
                t.addAttachmentClass = function (t) {
                    g(this.getTipElement()).addClass(Ae + "-" + t)
                }
                ,
                t.getTipElement = function () {
                    return this.tip = this.tip || g(this.config.template)[0],
                        this.tip
                }
                ,
                t.setContent = function () {
                    var t = this.getTipElement();
                    this.setElementContent(g(t.querySelectorAll(Ue)), this.getTitle()),
                        g(t).removeClass(xe + " " + Fe)
                }
                ,
                t.setElementContent = function (t, e) {
                    "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Se(e, this.config.whiteList, this.config.sanitizeFn)),
                        t.html(e)) : t.text(e) : this.config.html ? g(e).parent().is(t) || t.empty().append(e) : t.text(g(e).text())
                }
                ,
                t.getTitle = function () {
                    var t = this.element.getAttribute("data-original-title");
                    return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title),
                        t
                }
                ,
                t._getOffset = function () {
                    var e = this
                        , t = {};
                    return "function" == typeof this.config.offset ? t.fn = function (t) {
                        return t.offsets = l({}, t.offsets, e.config.offset(t.offsets, e.element) || {}),
                            t
                    }
                        : t.offset = this.config.offset,
                        t
                }
                ,
                t._getContainer = function () {
                    return !1 === this.config.container ? document.body : _.isElement(this.config.container) ? g(this.config.container) : g(document).find(this.config.container)
                }
                ,
                t._getAttachment = function (t) {
                    return Pe[t.toUpperCase()]
                }
                ,
                t._setListeners = function () {
                    var i = this;
                    this.config.trigger.split(" ").forEach(function (t) {
                        if ("click" === t)
                            g(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (t) {
                                return i.toggle(t)
                            });
                        else if (t !== Qe) {
                            var e = t === qe ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN
                                , n = t === qe ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                            g(i.element).on(e, i.config.selector, function (t) {
                                return i._enter(t)
                            }).on(n, i.config.selector, function (t) {
                                return i._leave(t)
                            })
                        }
                    }),
                        g(this.element).closest(".modal").on("hide.bs.modal", function () {
                            i.element && i.hide()
                        }),
                        this.config.selector ? this.config = l({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                }
                ,
                t._fixTitle = function () {
                    var t = typeof this.element.getAttribute("data-original-title");
                    (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""),
                        this.element.setAttribute("title", ""))
                }
                ,
                t._enter = function (t, e) {
                    var n = this.constructor.DATA_KEY;
                    (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()),
                        g(t.currentTarget).data(n, e)),
                        t && (e._activeTrigger["focusin" === t.type ? Me : qe] = !0),
                        g(e.getTipElement()).hasClass(Fe) || e._hoverState === je ? e._hoverState = je : (clearTimeout(e._timeout),
                            e._hoverState = je,
                            e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
                                e._hoverState === je && e.show()
                            }, e.config.delay.show) : e.show())
                }
                ,
                t._leave = function (t, e) {
                    var n = this.constructor.DATA_KEY;
                    (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()),
                        g(t.currentTarget).data(n, e)),
                        t && (e._activeTrigger["focusout" === t.type ? Me : qe] = !1),
                        e._isWithActiveTrigger() || (clearTimeout(e._timeout),
                            e._hoverState = He,
                            e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
                                e._hoverState === He && e.hide()
                            }, e.config.delay.hide) : e.hide())
                }
                ,
                t._isWithActiveTrigger = function () {
                    for (var t in this._activeTrigger)
                        if (this._activeTrigger[t])
                            return !0;
                    return !1
                }
                ,
                t._getConfig = function (t) {
                    var e = g(this.element).data();
                    return Object.keys(e).forEach(function (t) {
                        -1 !== Oe.indexOf(t) && delete e[t]
                    }),
                        "number" == typeof (t = l({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                            show: t.delay,
                            hide: t.delay
                        }),
                        "number" == typeof t.title && (t.title = t.title.toString()),
                        "number" == typeof t.content && (t.content = t.content.toString()),
                        _.typeCheckConfig(be, t, this.constructor.DefaultType),
                        t.sanitize && (t.template = Se(t.template, t.whiteList, t.sanitizeFn)),
                        t
                }
                ,
                t._getDelegateConfig = function () {
                    var t = {};
                    if (this.config)
                        for (var e in this.config)
                            this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                    return t
                }
                ,
                t._cleanTipClass = function () {
                    var t = g(this.getTipElement())
                        , e = t.attr("class").match(Ne);
                    null !== e && e.length && t.removeClass(e.join(""))
                }
                ,
                t._handlePopperPlacementChange = function (t) {
                    var e = t.instance;
                    this.tip = e.popper,
                        this._cleanTipClass(),
                        this.addAttachmentClass(this._getAttachment(t.placement))
                }
                ,
                t._fixTransition = function () {
                    var t = this.getTipElement()
                        , e = this.config.animation;
                    null === t.getAttribute("x-placement") && (g(t).removeClass(xe),
                        this.config.animation = !1,
                        this.hide(),
                        this.show(),
                        this.config.animation = e)
                }
                ,
                i._jQueryInterface = function (n) {
                    return this.each(function () {
                        var t = g(this).data(Ie)
                            , e = "object" == typeof n && n;
                        if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e),
                            g(this).data(Ie, t)),
                            "string" == typeof n)) {
                            if ("undefined" == typeof t[n])
                                throw new TypeError('No method named "' + n + '"');
                            t[n]()
                        }
                    })
                }
                ,
                s(i, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return Le
                    }
                }, {
                    key: "NAME",
                    get: function () {
                        return be
                    }
                }, {
                    key: "DATA_KEY",
                    get: function () {
                        return Ie
                    }
                }, {
                    key: "Event",
                    get: function () {
                        return Re
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function () {
                        return De
                    }
                }, {
                    key: "DefaultType",
                    get: function () {
                        return ke
                    }
                }]),
                i
        }();
    g.fn[be] = Be._jQueryInterface,
        g.fn[be].Constructor = Be,
        g.fn[be].noConflict = function () {
            return g.fn[be] = we,
                Be._jQueryInterface
        }
        ;
    var Ve = "popover"
        , Ye = "bs.popover"
        , ze = "." + Ye
        , Xe = g.fn[Ve]
        , $e = "bs-popover"
        , Ge = new RegExp("(^|\\s)" + $e + "\\S+", "g")
        , Je = l({}, Be.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
        , Ze = l({}, Be.DefaultType, {
            content: "(string|element|function)"
        })
        , tn = "fade"
        , en = "show"
        , nn = ".popover-header"
        , on = ".popover-body"
        , rn = {
            HIDE: "hide" + ze,
            HIDDEN: "hidden" + ze,
            SHOW: "show" + ze,
            SHOWN: "shown" + ze,
            INSERTED: "inserted" + ze,
            CLICK: "click" + ze,
            FOCUSIN: "focusin" + ze,
            FOCUSOUT: "focusout" + ze,
            MOUSEENTER: "mouseenter" + ze,
            MOUSELEAVE: "mouseleave" + ze
        }
        , sn = function (t) {
            var e, n;
            function i() {
                return t.apply(this, arguments) || this
            }
            n = t,
                (e = i).prototype = Object.create(n.prototype),
                (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }
                ,
                o.addAttachmentClass = function (t) {
                    g(this.getTipElement()).addClass($e + "-" + t)
                }
                ,
                o.getTipElement = function () {
                    return this.tip = this.tip || g(this.config.template)[0],
                        this.tip
                }
                ,
                o.setContent = function () {
                    var t = g(this.getTipElement());
                    this.setElementContent(t.find(nn), this.getTitle());
                    var e = this._getContent();
                    "function" == typeof e && (e = e.call(this.element)),
                        this.setElementContent(t.find(on), e),
                        t.removeClass(tn + " " + en)
                }
                ,
                o._getContent = function () {
                    return this.element.getAttribute("data-content") || this.config.content
                }
                ,
                o._cleanTipClass = function () {
                    var t = g(this.getTipElement())
                        , e = t.attr("class").match(Ge);
                    null !== e && 0 < e.length && t.removeClass(e.join(""))
                }
                ,
                i._jQueryInterface = function (n) {
                    return this.each(function () {
                        var t = g(this).data(Ye)
                            , e = "object" == typeof n ? n : null;
                        if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e),
                            g(this).data(Ye, t)),
                            "string" == typeof n)) {
                            if ("undefined" == typeof t[n])
                                throw new TypeError('No method named "' + n + '"');
                            t[n]()
                        }
                    })
                }
                ,
                s(i, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return Je
                    }
                }, {
                    key: "NAME",
                    get: function () {
                        return Ve
                    }
                }, {
                    key: "DATA_KEY",
                    get: function () {
                        return Ye
                    }
                }, {
                    key: "Event",
                    get: function () {
                        return rn
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function () {
                        return ze
                    }
                }, {
                    key: "DefaultType",
                    get: function () {
                        return Ze
                    }
                }]),
                i
        }(Be);
    g.fn[Ve] = sn._jQueryInterface,
        g.fn[Ve].Constructor = sn,
        g.fn[Ve].noConflict = function () {
            return g.fn[Ve] = Xe,
                sn._jQueryInterface
        }
        ;
    var an = "scrollspy"
        , ln = "bs.scrollspy"
        , cn = "." + ln
        , hn = g.fn[an]
        , un = {
            offset: 10,
            method: "auto",
            target: ""
        }
        , fn = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }
        , dn = {
            ACTIVATE: "activate" + cn,
            SCROLL: "scroll" + cn,
            LOAD_DATA_API: "load" + cn + ".data-api"
        }
        , gn = "dropdown-item"
        , _n = "active"
        , mn = '[data-spy="scroll"]'
        , pn = ".nav, .list-group"
        , vn = ".nav-link"
        , yn = ".nav-item"
        , En = ".list-group-item"
        , Cn = ".dropdown"
        , Tn = ".dropdown-item"
        , Sn = ".dropdown-toggle"
        , bn = "offset"
        , In = "position"
        , Dn = function () {
            function n(t, e) {
                var n = this;
                this._element = t,
                    this._scrollElement = "BODY" === t.tagName ? window : t,
                    this._config = this._getConfig(e),
                    this._selector = this._config.target + " " + vn + "," + this._config.target + " " + En + "," + this._config.target + " " + Tn,
                    this._offsets = [],
                    this._targets = [],
                    this._activeTarget = null,
                    this._scrollHeight = 0,
                    g(this._scrollElement).on(dn.SCROLL, function (t) {
                        return n._process(t)
                    }),
                    this.refresh(),
                    this._process()
            }
            var t = n.prototype;
            return t.refresh = function () {
                var e = this
                    , t = this._scrollElement === this._scrollElement.window ? bn : In
                    , o = "auto" === this._config.method ? t : this._config.method
                    , r = o === In ? this._getScrollTop() : 0;
                this._offsets = [],
                    this._targets = [],
                    this._scrollHeight = this._getScrollHeight(),
                    [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                        var e, n = _.getSelectorFromElement(t);
                        if (n && (e = document.querySelector(n)),
                            e) {
                            var i = e.getBoundingClientRect();
                            if (i.width || i.height)
                                return [g(e)[o]().top + r, n]
                        }
                        return null
                    }).filter(function (t) {
                        return t
                    }).sort(function (t, e) {
                        return t[0] - e[0]
                    }).forEach(function (t) {
                        e._offsets.push(t[0]),
                            e._targets.push(t[1])
                    })
            }
                ,
                t.dispose = function () {
                    g.removeData(this._element, ln),
                        g(this._scrollElement).off(cn),
                        this._element = null,
                        this._scrollElement = null,
                        this._config = null,
                        this._selector = null,
                        this._offsets = null,
                        this._targets = null,
                        this._activeTarget = null,
                        this._scrollHeight = null
                }
                ,
                t._getConfig = function (t) {
                    if ("string" != typeof (t = l({}, un, "object" == typeof t && t ? t : {})).target) {
                        var e = g(t.target).attr("id");
                        e || (e = _.getUID(an),
                            g(t.target).attr("id", e)),
                            t.target = "#" + e
                    }
                    return _.typeCheckConfig(an, t, fn),
                        t
                }
                ,
                t._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                }
                ,
                t._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }
                ,
                t._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                }
                ,
                t._process = function () {
                    var t = this._getScrollTop() + this._config.offset
                        , e = this._getScrollHeight()
                        , n = this._config.offset + e - this._getOffsetHeight();
                    if (this._scrollHeight !== e && this.refresh(),
                        n <= t) {
                        var i = this._targets[this._targets.length - 1];
                        this._activeTarget !== i && this._activate(i)
                    } else {
                        if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0])
                            return this._activeTarget = null,
                                void this._clear();
                        for (var o = this._offsets.length; o--;) {
                            this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                        }
                    }
                }
                ,
                t._activate = function (e) {
                    this._activeTarget = e,
                        this._clear();
                    var t = this._selector.split(",").map(function (t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    })
                        , n = g([].slice.call(document.querySelectorAll(t.join(","))));
                    n.hasClass(gn) ? (n.closest(Cn).find(Sn).addClass(_n),
                        n.addClass(_n)) : (n.addClass(_n),
                            n.parents(pn).prev(vn + ", " + En).addClass(_n),
                            n.parents(pn).prev(yn).children(vn).addClass(_n)),
                        g(this._scrollElement).trigger(dn.ACTIVATE, {
                            relatedTarget: e
                        })
                }
                ,
                t._clear = function () {
                    [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
                        return t.classList.contains(_n)
                    }).forEach(function (t) {
                        return t.classList.remove(_n)
                    })
                }
                ,
                n._jQueryInterface = function (e) {
                    return this.each(function () {
                        var t = g(this).data(ln);
                        if (t || (t = new n(this, "object" == typeof e && e),
                            g(this).data(ln, t)),
                            "string" == typeof e) {
                            if ("undefined" == typeof t[e])
                                throw new TypeError('No method named "' + e + '"');
                            t[e]()
                        }
                    })
                }
                ,
                s(n, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return un
                    }
                }]),
                n
        }();
    g(window).on(dn.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll(mn)), e = t.length; e--;) {
            var n = g(t[e]);
            Dn._jQueryInterface.call(n, n.data())
        }
    }),
        g.fn[an] = Dn._jQueryInterface,
        g.fn[an].Constructor = Dn,
        g.fn[an].noConflict = function () {
            return g.fn[an] = hn,
                Dn._jQueryInterface
        }
        ;
    var wn = "bs.tab"
        , An = "." + wn
        , Nn = g.fn.tab
        , On = {
            HIDE: "hide" + An,
            HIDDEN: "hidden" + An,
            SHOW: "show" + An,
            SHOWN: "shown" + An,
            CLICK_DATA_API: "click" + An + ".data-api"
        }
        , kn = "dropdown-menu"
        , Pn = "active"
        , Ln = "disabled"
        , jn = "fade"
        , Hn = "show"
        , Rn = ".dropdown"
        , xn = ".nav, .list-group"
        , Fn = ".active"
        , Un = "> li > .active"
        , Wn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]'
        , qn = ".dropdown-toggle"
        , Mn = "> .dropdown-menu .active"
        , Kn = function () {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.show = function () {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g(this._element).hasClass(Pn) || g(this._element).hasClass(Ln))) {
                    var t, i, e = g(this._element).closest(xn)[0], o = _.getSelectorFromElement(this._element);
                    if (e) {
                        var r = "UL" === e.nodeName || "OL" === e.nodeName ? Un : Fn;
                        i = (i = g.makeArray(g(e).find(r)))[i.length - 1]
                    }
                    var s = g.Event(On.HIDE, {
                        relatedTarget: this._element
                    })
                        , a = g.Event(On.SHOW, {
                            relatedTarget: i
                        });
                    if (i && g(i).trigger(s),
                        g(this._element).trigger(a),
                        !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = document.querySelector(o)),
                            this._activate(this._element, e);
                        var l = function () {
                            var t = g.Event(On.HIDDEN, {
                                relatedTarget: n._element
                            })
                                , e = g.Event(On.SHOWN, {
                                    relatedTarget: i
                                });
                            g(i).trigger(t),
                                g(n._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }
                ,
                t.dispose = function () {
                    g.removeData(this._element, wn),
                        this._element = null
                }
                ,
                t._activate = function (t, e, n) {
                    var i = this
                        , o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? g(e).children(Fn) : g(e).find(Un))[0]
                        , r = n && o && g(o).hasClass(jn)
                        , s = function () {
                            return i._transitionComplete(t, o, n)
                        };
                    if (o && r) {
                        var a = _.getTransitionDurationFromElement(o);
                        g(o).removeClass(Hn).one(_.TRANSITION_END, s).emulateTransitionEnd(a)
                    } else
                        s()
                }
                ,
                t._transitionComplete = function (t, e, n) {
                    if (e) {
                        g(e).removeClass(Pn);
                        var i = g(e.parentNode).find(Mn)[0];
                        i && g(i).removeClass(Pn),
                            "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                    }
                    if (g(t).addClass(Pn),
                        "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
                        _.reflow(t),
                        t.classList.contains(jn) && t.classList.add(Hn),
                        t.parentNode && g(t.parentNode).hasClass(kn)) {
                        var o = g(t).closest(Rn)[0];
                        if (o) {
                            var r = [].slice.call(o.querySelectorAll(qn));
                            g(r).addClass(Pn)
                        }
                        t.setAttribute("aria-expanded", !0)
                    }
                    n && n()
                }
                ,
                i._jQueryInterface = function (n) {
                    return this.each(function () {
                        var t = g(this)
                            , e = t.data(wn);
                        if (e || (e = new i(this),
                            t.data(wn, e)),
                            "string" == typeof n) {
                            if ("undefined" == typeof e[n])
                                throw new TypeError('No method named "' + n + '"');
                            e[n]()
                        }
                    })
                }
                ,
                s(i, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }]),
                i
        }();
    g(document).on(On.CLICK_DATA_API, Wn, function (t) {
        t.preventDefault(),
            Kn._jQueryInterface.call(g(this), "show")
    }),
        g.fn.tab = Kn._jQueryInterface,
        g.fn.tab.Constructor = Kn,
        g.fn.tab.noConflict = function () {
            return g.fn.tab = Nn,
                Kn._jQueryInterface
        }
        ;
    var Qn = "toast"
        , Bn = "bs.toast"
        , Vn = "." + Bn
        , Yn = g.fn[Qn]
        , zn = {
            CLICK_DISMISS: "click.dismiss" + Vn,
            HIDE: "hide" + Vn,
            HIDDEN: "hidden" + Vn,
            SHOW: "show" + Vn,
            SHOWN: "shown" + Vn
        }
        , Xn = "fade"
        , $n = "hide"
        , Gn = "show"
        , Jn = "showing"
        , Zn = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        }
        , ti = {
            animation: !0,
            autohide: !0,
            delay: 500
        }
        , ei = '[data-dismiss="toast"]'
        , ni = function () {
            function i(t, e) {
                this._element = t,
                    this._config = this._getConfig(e),
                    this._timeout = null,
                    this._setListeners()
            }
            var t = i.prototype;
            return t.show = function () {
                var t = this;
                g(this._element).trigger(zn.SHOW),
                    this._config.animation && this._element.classList.add(Xn);
                var e = function () {
                    t._element.classList.remove(Jn),
                        t._element.classList.add(Gn),
                        g(t._element).trigger(zn.SHOWN),
                        t._config.autohide && t.hide()
                };
                if (this._element.classList.remove($n),
                    this._element.classList.add(Jn),
                    this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else
                    e()
            }
                ,
                t.hide = function (t) {
                    var e = this;
                    this._element.classList.contains(Gn) && (g(this._element).trigger(zn.HIDE),
                        t ? this._close() : this._timeout = setTimeout(function () {
                            e._close()
                        }, this._config.delay))
                }
                ,
                t.dispose = function () {
                    clearTimeout(this._timeout),
                        this._timeout = null,
                        this._element.classList.contains(Gn) && this._element.classList.remove(Gn),
                        g(this._element).off(zn.CLICK_DISMISS),
                        g.removeData(this._element, Bn),
                        this._element = null,
                        this._config = null
                }
                ,
                t._getConfig = function (t) {
                    return t = l({}, ti, g(this._element).data(), "object" == typeof t && t ? t : {}),
                        _.typeCheckConfig(Qn, t, this.constructor.DefaultType),
                        t
                }
                ,
                t._setListeners = function () {
                    var t = this;
                    g(this._element).on(zn.CLICK_DISMISS, ei, function () {
                        return t.hide(!0)
                    })
                }
                ,
                t._close = function () {
                    var t = this
                        , e = function () {
                            t._element.classList.add($n),
                                g(t._element).trigger(zn.HIDDEN)
                        };
                    if (this._element.classList.remove(Gn),
                        this._config.animation) {
                        var n = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                    } else
                        e()
                }
                ,
                i._jQueryInterface = function (n) {
                    return this.each(function () {
                        var t = g(this)
                            , e = t.data(Bn);
                        if (e || (e = new i(this, "object" == typeof n && n),
                            t.data(Bn, e)),
                            "string" == typeof n) {
                            if ("undefined" == typeof e[n])
                                throw new TypeError('No method named "' + n + '"');
                            e[n](this)
                        }
                    })
                }
                ,
                s(i, null, [{
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                }, {
                    key: "DefaultType",
                    get: function () {
                        return Zn
                    }
                }, {
                    key: "Default",
                    get: function () {
                        return ti
                    }
                }]),
                i
        }();
    g.fn[Qn] = ni._jQueryInterface,
        g.fn[Qn].Constructor = ni,
        g.fn[Qn].noConflict = function () {
            return g.fn[Qn] = Yn,
                ni._jQueryInterface
        }
        ,
        function () {
            if ("undefined" == typeof g)
                throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = g.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0])
                throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(),
        t.Util = _,
        t.Alert = p,
        t.Button = P,
        t.Carousel = lt,
        t.Collapse = bt,
        t.Dropdown = Jt,
        t.Modal = ve,
        t.Popover = sn,
        t.Scrollspy = Dn,
        t.Tab = Kn,
        t.Toast = ni,
        t.Tooltip = Be,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
});
!function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.Headroom = b()
}(this, function () {
    "use strict";
    function a(a) {
        this.callback = a,
            this.ticking = !1
    }
    function b(a) {
        return a && "undefined" != typeof window && (a === window || a.nodeType)
    }
    function c(a) {
        if (arguments.length <= 0)
            throw new Error("Missing arguments in extend function");
        var d, e, f = a || {};
        for (e = 1; e < arguments.length; e++) {
            var g = arguments[e] || {};
            for (d in g)
                "object" != typeof f[d] || b(f[d]) ? f[d] = f[d] || g[d] : f[d] = c(f[d], g[d])
        }
        return f
    }
    function d(a) {
        return a === Object(a) ? a : {
            down: a,
            up: a
        }
    }
    function e(a, b) {
        b = c(b, e.options),
            this.lastKnownScrollY = 0,
            this.elem = a,
            this.tolerance = d(b.tolerance),
            this.classes = b.classes,
            this.offset = b.offset,
            this.scroller = b.scroller,
            this.initialised = !1,
            this.onPin = b.onPin,
            this.onUnpin = b.onUnpin,
            this.onTop = b.onTop,
            this.onNotTop = b.onNotTop,
            this.onBottom = b.onBottom,
            this.onNotBottom = b.onNotBottom
    }
    var f = {
        bind: !!function () { }
            .bind,
        classList: "classList" in document.documentElement,
        rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
    };
    return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
        a.prototype = {
            constructor: a,
            update: function () {
                this.callback && this.callback(),
                    this.ticking = !1
            },
            requestTick: function () {
                this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))),
                    this.ticking = !0)
            },
            handleEvent: function () {
                this.requestTick()
            }
        },
        e.prototype = {
            constructor: e,
            init: function () {
                if (e.cutsTheMustard)
                    return this.debouncer = new a(this.update.bind(this)),
                        this.elem.classList.add(this.classes.initial),
                        setTimeout(this.attachEvent.bind(this), 100),
                        this
            },
            destroy: function () {
                var a = this.classes;
                this.initialised = !1;
                for (var b in a)
                    a.hasOwnProperty(b) && this.elem.classList.remove(a[b]);
                this.scroller.removeEventListener("scroll", this.debouncer, !1)
            },
            attachEvent: function () {
                this.initialised || (this.lastKnownScrollY = this.getScrollY(),
                    this.initialised = !0,
                    this.scroller.addEventListener("scroll", this.debouncer, !1),
                    this.debouncer.handleEvent())
            },
            unpin: function () {
                var a = this.elem.classList
                    , b = this.classes;
                !a.contains(b.pinned) && a.contains(b.unpinned) || (a.add(b.unpinned),
                    a.remove(b.pinned),
                    this.onUnpin && this.onUnpin.call(this))
            },
            pin: function () {
                var a = this.elem.classList
                    , b = this.classes;
                a.contains(b.unpinned) && (a.remove(b.unpinned),
                    a.add(b.pinned),
                    this.onPin && this.onPin.call(this))
            },
            top: function () {
                var a = this.elem.classList
                    , b = this.classes;
                a.contains(b.top) || (a.add(b.top),
                    a.remove(b.notTop),
                    this.onTop && this.onTop.call(this))
            },
            notTop: function () {
                var a = this.elem.classList
                    , b = this.classes;
                a.contains(b.notTop) || (a.add(b.notTop),
                    a.remove(b.top),
                    this.onNotTop && this.onNotTop.call(this))
            },
            bottom: function () {
                var a = this.elem.classList
                    , b = this.classes;
                a.contains(b.bottom) || (a.add(b.bottom),
                    a.remove(b.notBottom),
                    this.onBottom && this.onBottom.call(this))
            },
            notBottom: function () {
                var a = this.elem.classList
                    , b = this.classes;
                a.contains(b.notBottom) || (a.add(b.notBottom),
                    a.remove(b.bottom),
                    this.onNotBottom && this.onNotBottom.call(this))
            },
            getScrollY: function () {
                return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop
            },
            getViewportHeight: function () {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            },
            getElementPhysicalHeight: function (a) {
                return Math.max(a.offsetHeight, a.clientHeight)
            },
            getScrollerPhysicalHeight: function () {
                return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller)
            },
            getDocumentHeight: function () {
                var a = document.body
                    , b = document.documentElement;
                return Math.max(a.scrollHeight, b.scrollHeight, a.offsetHeight, b.offsetHeight, a.clientHeight, b.clientHeight)
            },
            getElementHeight: function (a) {
                return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
            },
            getScrollerHeight: function () {
                return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
            },
            isOutOfBounds: function (a) {
                var b = a < 0
                    , c = a + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
                return b || c
            },
            toleranceExceeded: function (a, b) {
                return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
            },
            shouldUnpin: function (a, b) {
                var c = a > this.lastKnownScrollY
                    , d = a >= this.offset;
                return c && d && b
            },
            shouldPin: function (a, b) {
                var c = a < this.lastKnownScrollY
                    , d = a <= this.offset;
                return c && b || d
            },
            update: function () {
                var a = this.getScrollY()
                    , b = a > this.lastKnownScrollY ? "down" : "up"
                    , c = this.toleranceExceeded(a, b);
                this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(),
                    a + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(),
                    this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(),
                    this.lastKnownScrollY = a)
            }
        },
        e.options = {
            tolerance: {
                up: 0,
                down: 0
            },
            offset: 0,
            scroller: window,
            classes: {
                pinned: "headroom--pinned",
                unpinned: "headroom--unpinned",
                top: "headroom--top",
                notTop: "headroom--not-top",
                bottom: "headroom--bottom",
                notBottom: "headroom--not-bottom",
                initial: "headroom"
            }
        },
        e.cutsTheMustard = "undefined" != typeof f && f.rAF && f.bind && f.classList,
        e
});
!function (o) {
    o && (o.fn.headroom = function (t) {
        return this.each(function () {
            var a = o(this)
                , e = a.data("headroom")
                , n = "object" == typeof t && t;
            n = o.extend(!0, {}, Headroom.options, n),
                e || ((e = new Headroom(this, n)).init(),
                    a.data("headroom", e)),
                "string" == typeof t && (e[t](),
                    "destroy" === t && a.removeData("headroom"))
        })
    }
        ,
        o("[data-headroom]").each(function () {
            var t = o(this);
            t.headroom(t.data())
        }))
}(window.Zepto || window.jQuery);
!function (a, b, c, d) {
    function e(b, c) {
        this.settings = null,
            this.options = a.extend({}, e.Defaults, c),
            this.$element = a(b),
            this._handlers = {},
            this._plugins = {},
            this._supress = {},
            this._current = null,
            this._speed = null,
            this._coordinates = [],
            this._breakpoint = null,
            this._width = null,
            this._items = [],
            this._clones = [],
            this._mergers = [],
            this._widths = [],
            this._invalidated = {},
            this._pipe = [],
            this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null
            },
            this._states = {
                current: {},
                tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"]
                }
            },
            a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
                this._handlers[c] = a.proxy(this[c], this)
            }, this)),
            a.each(e.Plugins, a.proxy(function (a, b) {
                this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
            }, this)),
            a.each(e.Workers, a.proxy(function (b, c) {
                this._pipe.push({
                    filter: c.filter,
                    run: a.proxy(c.run, this)
                })
            }, this)),
            this.setup(),
            this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    },
        e.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        },
        e.Type = {
            Event: "event",
            State: "state"
        },
        e.Plugins = {},
        e.Workers = [{
            filter: ["width", "settings"],
            run: function () {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                a.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function () {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                var b = this.settings.margin || ""
                    , c = !this.settings.autoWidth
                    , d = this.settings.rtl
                    , e = {
                        width: "auto",
                        "margin-left": d ? b : "",
                        "margin-right": d ? "" : b
                    };
                !c && this.$stage.children().css(e),
                    a.css = e
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin
                    , c = null
                    , d = this._items.length
                    , e = !this.settings.autoWidth
                    , f = [];
                for (a.items = {
                    merge: !1,
                    width: b
                }; d--;)
                    c = this._mergers[d],
                        c = this.settings.mergeFit && Math.min(c, this.settings.items) || c,
                        a.items.merge = c > 1 || a.items.merge,
                        f[d] = e ? b * c : this._items[d].width();
                this._widths = f
            }
        }, {
            filter: ["items", "settings"],
            run: function () {
                var b = []
                    , c = this._items
                    , d = this.settings
                    , e = Math.max(2 * d.items, 4)
                    , f = 2 * Math.ceil(c.length / 2)
                    , g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0
                    , h = ""
                    , i = "";
                for (g /= 2; g > 0;)
                    b.push(this.normalize(b.length / 2, !0)),
                        h += c[b[b.length - 1]][0].outerHTML,
                        b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
                        i = c[b[b.length - 1]][0].outerHTML + i,
                        g -= 1;
                this._clones = b,
                    a(h).addClass("cloned").appendTo(this.$stage),
                    a(i).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function () {
                for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;)
                    d = f[c - 1] || 0,
                        e = this._widths[this.relative(c)] + this.settings.margin,
                        f.push(d + e * a);
                this._coordinates = f
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function () {
                var a = this.settings.stagePadding
                    , b = this._coordinates
                    , c = {
                        width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                        "padding-left": a || "",
                        "padding-right": a || ""
                    };
                this.$stage.css(c)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                var b = this._coordinates.length
                    , c = !this.settings.autoWidth
                    , d = this.$stage.children();
                if (c && a.items.merge)
                    for (; b--;)
                        a.css.width = this._widths[this.relative(b)],
                            d.eq(b).css(a.css);
                else
                    c && (a.css.width = a.items.width,
                        d.css(a.css))
            }
        }, {
            filter: ["items"],
            run: function () {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                a.current = a.current ? this.$stage.children().index(a.current) : 0,
                    a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)),
                    this.reset(a.current)
            }
        }, {
            filter: ["position"],
            run: function () {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function () {
                var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
                for (c = 0,
                    d = this._coordinates.length; c < d; c++)
                    a = this._coordinates[c - 1] || 0,
                        b = Math.abs(this._coordinates[c]) + f * e,
                        (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
                this.$stage.children(".active").removeClass("active"),
                    this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"),
                    this.$stage.children(".center").removeClass("center"),
                    this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
            }
        }],
        e.prototype.initializeStage = function () {
            this.$stage = this.$element.find("." + this.settings.stageClass),
                this.$stage.length || (this.$element.addClass(this.options.loadingClass),
                    this.$stage = a("<" + this.settings.stageElement + ">", {
                        class: this.settings.stageClass
                    }).wrap(a("<div/>", {
                        class: this.settings.stageOuterClass
                    })),
                    this.$element.append(this.$stage.parent()))
        }
        ,
        e.prototype.initializeItems = function () {
            var b = this.$element.find(".owl-item");
            if (b.length)
                return this._items = b.get().map(function (b) {
                    return a(b)
                }),
                    this._mergers = this._items.map(function () {
                        return 1
                    }),
                    void this.refresh();
            this.replace(this.$element.children().not(this.$stage.parent())),
                this.isVisible() ? this.refresh() : this.invalidate("width"),
                this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
        }
        ,
        e.prototype.initialize = function () {
            if (this.enter("initializing"),
                this.trigger("initialize"),
                this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
                this.settings.autoWidth && !this.is("pre-loading")) {
                var a, b, c;
                a = this.$element.find("img"),
                    b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d,
                    c = this.$element.children(b).width(),
                    a.length && c <= 0 && this.preloadAutoWidthImages(a)
            }
            this.initializeStage(),
                this.initializeItems(),
                this.registerEventHandlers(),
                this.leave("initializing"),
                this.trigger("initialized")
        }
        ,
        e.prototype.isVisible = function () {
            return !this.settings.checkVisibility || this.$element.is(":visible")
        }
        ,
        e.prototype.setup = function () {
            var b = this.viewport()
                , c = this.options.responsive
                , d = -1
                , e = null;
            c ? (a.each(c, function (a) {
                a <= b && a > d && (d = Number(a))
            }),
                e = a.extend({}, this.options, c[d]),
                "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()),
                delete e.responsive,
                e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options),
                this.trigger("change", {
                    property: {
                        name: "settings",
                        value: e
                    }
                }),
                this._breakpoint = d,
                this.settings = e,
                this.invalidate("settings"),
                this.trigger("changed", {
                    property: {
                        name: "settings",
                        value: this.settings
                    }
                })
        }
        ,
        e.prototype.optionsLogic = function () {
            this.settings.autoWidth && (this.settings.stagePadding = !1,
                this.settings.merge = !1)
        }
        ,
        e.prototype.prepare = function (b) {
            var c = this.trigger("prepare", {
                content: b
            });
            return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)),
                this.trigger("prepared", {
                    content: c.data
                }),
                c.data
        }
        ,
        e.prototype.update = function () {
            for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
                return this[a]
            }, this._invalidated), e = {}; b < c;)
                (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e),
                    b++;
            this._invalidated = {},
                !this.is("valid") && this.enter("valid")
        }
        ,
        e.prototype.width = function (a) {
            switch (a = a || e.Width.Default) {
                case e.Width.Inner:
                case e.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }
        ,
        e.prototype.refresh = function () {
            this.enter("refreshing"),
                this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$element.addClass(this.options.refreshClass),
                this.update(),
                this.$element.removeClass(this.options.refreshClass),
                this.leave("refreshing"),
                this.trigger("refreshed")
        }
        ,
        e.prototype.onThrottledResize = function () {
            b.clearTimeout(this.resizeTimer),
                this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }
        ,
        e.prototype.onResize = function () {
            return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"),
                this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"),
                    !1) : (this.invalidate("width"),
                        this.refresh(),
                        this.leave("resizing"),
                        void this.trigger("resized")))))
        }
        ,
        e.prototype.registerEventHandlers = function () {
            a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
                !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize),
                this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass),
                    this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
                    this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                        return !1
                    })),
                this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)),
                    this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
        }
        ,
        e.prototype.onDragStart = function (b) {
            var d = null;
            3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","),
                d = {
                    x: d[16 === d.length ? 12 : 4],
                    y: d[16 === d.length ? 13 : 5]
                }) : (d = this.$stage.position(),
                    d = {
                        x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
                        y: d.top
                    }),
                this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
                    this.invalidate("position")),
                this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type),
                this.speed(0),
                this._drag.time = (new Date).getTime(),
                this._drag.target = a(b.target),
                this._drag.stage.start = d,
                this._drag.stage.current = d,
                this._drag.pointer = this.pointer(b),
                a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)),
                a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
                    var d = this.difference(this._drag.pointer, this.pointer(b));
                    a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)),
                        Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(),
                            this.enter("dragging"),
                            this.trigger("drag"))
                }, this)))
        }
        ,
        e.prototype.onDragMove = function (a) {
            var b = null
                , c = null
                , d = null
                , e = this.difference(this._drag.pointer, this.pointer(a))
                , f = this.difference(this._drag.stage.start, e);
            this.is("dragging") && (a.preventDefault(),
                this.settings.loop ? (b = this.coordinates(this.minimum()),
                    c = this.coordinates(this.maximum() + 1) - b,
                    f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
                        c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
                        d = this.settings.pullDrag ? -1 * e.x / 5 : 0,
                        f.x = Math.max(Math.min(f.x, b + d), c + d)),
                this._drag.stage.current = f,
                this.animate(f.x))
        }
        ,
        e.prototype.onDragEnd = function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b))
                , e = this._drag.stage.current
                , f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
            a(c).off(".owl.core"),
                this.$element.removeClass(this.options.grabClass),
                (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                    this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
                    this.invalidate("position"),
                    this.update(),
                    this._drag.direction = f,
                    (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
                        return !1
                    })),
                this.is("dragging") && (this.leave("dragging"),
                    this.trigger("dragged"))
        }
        ,
        e.prototype.closest = function (b, c) {
            var e = -1
                , f = 30
                , g = this.width()
                , h = this.coordinates();
            return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
                return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a),
                    -1 === e
            }, this)),
                this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
                e
        }
        ,
        e.prototype.animate = function (b) {
            var c = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(),
                c && (this.enter("animating"),
                    this.trigger("translate")),
                a.support.transform3d && a.support.transition ? this.$stage.css({
                    transform: "translate3d(" + b + "px,0px,0px)",
                    transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
                }) : c ? this.$stage.animate({
                    left: b + "px"
                }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
                    left: b + "px"
                })
        }
        ,
        e.prototype.is = function (a) {
            return this._states.current[a] && this._states.current[a] > 0
        }
        ,
        e.prototype.current = function (a) {
            if (a === d)
                return this._current;
            if (0 === this._items.length)
                return d;
            if (a = this.normalize(a),
                this._current !== a) {
                var b = this.trigger("change", {
                    property: {
                        name: "position",
                        value: a
                    }
                });
                b.data !== d && (a = this.normalize(b.data)),
                    this._current = a,
                    this.invalidate("position"),
                    this.trigger("changed", {
                        property: {
                            name: "position",
                            value: this._current
                        }
                    })
            }
            return this._current
        }
        ,
        e.prototype.invalidate = function (b) {
            return "string" === a.type(b) && (this._invalidated[b] = !0,
                this.is("valid") && this.leave("valid")),
                a.map(this._invalidated, function (a, b) {
                    return b
                })
        }
        ,
        e.prototype.reset = function (a) {
            (a = this.normalize(a)) !== d && (this._speed = 0,
                this._current = a,
                this.suppress(["translate", "translated"]),
                this.animate(this.coordinates(a)),
                this.release(["translate", "translated"]))
        }
        ,
        e.prototype.normalize = function (a, b) {
            var c = this._items.length
                , e = b ? 0 : this._clones.length;
            return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2),
                a
        }
        ,
        e.prototype.relative = function (a) {
            return a -= this._clones.length / 2,
                this.normalize(a, !0)
        }
        ,
        e.prototype.maximum = function (a) {
            var b, c, d, e = this.settings, f = this._coordinates.length;
            if (e.loop)
                f = this._clones.length / 2 + this._items.length - 1;
            else if (e.autoWidth || e.merge) {
                if (b = this._items.length)
                    for (c = this._items[--b].width(),
                        d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d);)
                        ;
                f = b + 1
            } else
                f = e.center ? this._items.length - 1 : this._items.length - e.items;
            return a && (f -= this._clones.length / 2),
                Math.max(f, 0)
        }
        ,
        e.prototype.minimum = function (a) {
            return a ? 0 : this._clones.length / 2
        }
        ,
        e.prototype.items = function (a) {
            return a === d ? this._items.slice() : (a = this.normalize(a, !0),
                this._items[a])
        }
        ,
        e.prototype.mergers = function (a) {
            return a === d ? this._mergers.slice() : (a = this.normalize(a, !0),
                this._mergers[a])
        }
        ,
        e.prototype.clones = function (b) {
            var c = this._clones.length / 2
                , e = c + this._items.length
                , f = function (a) {
                    return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
                };
            return b === d ? a.map(this._clones, function (a, b) {
                return f(b)
            }) : a.map(this._clones, function (a, c) {
                return a === b ? f(c) : null
            })
        }
        ,
        e.prototype.speed = function (a) {
            return a !== d && (this._speed = a),
                this._speed
        }
        ,
        e.prototype.coordinates = function (b) {
            var c, e = 1, f = b - 1;
            return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
                return this.coordinates(b)
            }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1,
                f = b + 1),
                c = this._coordinates[b],
                c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0,
                c = Math.ceil(c))
        }
        ,
        e.prototype.duration = function (a, b, c) {
            return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
        }
        ,
        e.prototype.to = function (a, b) {
            var c = this.current()
                , d = null
                , e = a - this.relative(c)
                , f = (e > 0) - (e < 0)
                , g = this._items.length
                , h = this.minimum()
                , i = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
                a = c + e,
                (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e,
                    a = d,
                    this.reset(c))) : this.settings.rewind ? (i += 1,
                        a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)),
                this.speed(this.duration(c, a, b)),
                this.current(a),
                this.isVisible() && this.update()
        }
        ,
        e.prototype.next = function (a) {
            a = a || !1,
                this.to(this.relative(this.current()) + 1, a)
        }
        ,
        e.prototype.prev = function (a) {
            a = a || !1,
                this.to(this.relative(this.current()) - 1, a)
        }
        ,
        e.prototype.onTransitionEnd = function (a) {
            if (a !== d && (a.stopPropagation(),
                (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)))
                return !1;
            this.leave("animating"),
                this.trigger("translated")
        }
        ,
        e.prototype.viewport = function () {
            var d;
            return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."),
                d
        }
        ,
        e.prototype.replace = function (b) {
            this.$stage.empty(),
                this._items = [],
                b && (b = b instanceof jQuery ? b : a(b)),
                this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
                b.filter(function () {
                    return 1 === this.nodeType
                }).each(a.proxy(function (a, b) {
                    b = this.prepare(b),
                        this.$stage.append(b),
                        this._items.push(b),
                        this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
                }, this)),
                this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                this.invalidate("items")
        }
        ,
        e.prototype.add = function (b, c) {
            var e = this.relative(this._current);
            c = c === d ? this._items.length : this.normalize(c, !0),
                b = b instanceof jQuery ? b : a(b),
                this.trigger("add", {
                    content: b,
                    position: c
                }),
                b = this.prepare(b),
                0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b),
                    0 !== this._items.length && this._items[c - 1].after(b),
                    this._items.push(b),
                    this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b),
                        this._items.splice(c, 0, b),
                        this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                this._items[e] && this.reset(this._items[e].index()),
                this.invalidate("items"),
                this.trigger("added", {
                    content: b,
                    position: c
                })
        }
        ,
        e.prototype.remove = function (a) {
            (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
                content: this._items[a],
                position: a
            }),
                this._items[a].remove(),
                this._items.splice(a, 1),
                this._mergers.splice(a, 1),
                this.invalidate("items"),
                this.trigger("removed", {
                    content: null,
                    position: a
                }))
        }
        ,
        e.prototype.preloadAutoWidthImages = function (b) {
            b.each(a.proxy(function (b, c) {
                this.enter("pre-loading"),
                    c = a(c),
                    a(new Image).one("load", a.proxy(function (a) {
                        c.attr("src", a.target.src),
                            c.css("opacity", 1),
                            this.leave("pre-loading"),
                            !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                    }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
            }, this))
        }
        ,
        e.prototype.destroy = function () {
            this.$element.off(".owl.core"),
                this.$stage.off(".owl.core"),
                a(c).off(".owl.core"),
                !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer),
                    this.off(b, "resize", this._handlers.onThrottledResize));
            for (var d in this._plugins)
                this._plugins[d].destroy();
            this.$stage.children(".cloned").remove(),
                this.$stage.unwrap(),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.remove(),
                this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
        }
        ,
        e.prototype.op = function (a, b, c) {
            var d = this.settings.rtl;
            switch (b) {
                case "<":
                    return d ? a > c : a < c;
                case ">":
                    return d ? a < c : a > c;
                case ">=":
                    return d ? a <= c : a >= c;
                case "<=":
                    return d ? a >= c : a <= c
            }
        }
        ,
        e.prototype.on = function (a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
        }
        ,
        e.prototype.off = function (a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
        }
        ,
        e.prototype.trigger = function (b, c, d, f, g) {
            var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            }
                , i = a.camelCase(a.grep(["on", b, d], function (a) {
                    return a
                }).join("-").toLowerCase())
                , j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                    relatedTarget: this
                }, h, c));
            return this._supress[b] || (a.each(this._plugins, function (a, b) {
                b.onTrigger && b.onTrigger(j)
            }),
                this.register({
                    type: e.Type.Event,
                    name: b
                }),
                this.$element.trigger(j),
                this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
                j
        }
        ,
        e.prototype.enter = function (b) {
            a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
                this._states.current[b] === d && (this._states.current[b] = 0),
                    this._states.current[b]++
            }, this))
        }
        ,
        e.prototype.leave = function (b) {
            a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
                this._states.current[b]--
            }, this))
        }
        ,
        e.prototype.register = function (b) {
            if (b.type === e.Type.Event) {
                if (a.event.special[b.name] || (a.event.special[b.name] = {}),
                    !a.event.special[b.name].owl) {
                    var c = a.event.special[b.name]._default;
                    a.event.special[b.name]._default = function (a) {
                        return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                    }
                        ,
                        a.event.special[b.name].owl = !0
                }
            } else
                b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags,
                    this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
                        return a.inArray(c, this._states.tags[b.name]) === d
                    }, this)))
        }
        ,
        e.prototype.suppress = function (b) {
            a.each(b, a.proxy(function (a, b) {
                this._supress[b] = !0
            }, this))
        }
        ,
        e.prototype.release = function (b) {
            a.each(b, a.proxy(function (a, b) {
                delete this._supress[b]
            }, this))
        }
        ,
        e.prototype.pointer = function (a) {
            var c = {
                x: null,
                y: null
            };
            return a = a.originalEvent || a || b.event,
                a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a,
                a.pageX ? (c.x = a.pageX,
                    c.y = a.pageY) : (c.x = a.clientX,
                        c.y = a.clientY),
                c
        }
        ,
        e.prototype.isNumeric = function (a) {
            return !isNaN(parseFloat(a))
        }
        ,
        e.prototype.difference = function (a, b) {
            return {
                x: a.x - b.x,
                y: a.y - b.y
            }
        }
        ,
        a.fn.owlCarousel = function (b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var d = a(this)
                    , f = d.data("owl.carousel");
                f || (f = new e(this, "object" == typeof b && b),
                    d.data("owl.carousel", f),
                    a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
                        f.register({
                            type: e.Type.Event,
                            name: c
                        }),
                            f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
                                a.namespace && a.relatedTarget !== this && (this.suppress([c]),
                                    f[c].apply(this, [].slice.call(arguments, 1)),
                                    this.release([c]))
                            }, f))
                    })),
                    "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
            })
        }
        ,
        a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._interval = null,
                this._visible = null,
                this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoRefresh && this.watch()
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        },
            e.prototype.watch = function () {
                this._interval || (this._visible = this._core.isVisible(),
                    this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
            }
            ,
            e.prototype.refresh = function () {
                this._core.isVisible() !== this._visible && (this._visible = !this._visible,
                    this._core.$element.toggleClass("owl-hidden", !this._visible),
                    this._visible && this._core.invalidate("width") && this._core.refresh())
            }
            ,
            e.prototype.destroy = function () {
                var a, c;
                b.clearInterval(this._interval);
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._loaded = [],
                this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
                        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                            var c = this._core.settings
                                , e = c.center && Math.ceil(c.items / 2) || c.items
                                , f = c.center && -1 * e || 0
                                , g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f
                                , h = this._core.clones().length
                                , i = a.proxy(function (a, b) {
                                    this.load(b)
                                }, this);
                            for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager,
                                c.loop && (g -= c.lazyLoadEager,
                                    e++)); f++ < e;)
                                this.load(h / 2 + this._core.relative(g)),
                                    h && a.each(this._core.clones(this._core.relative(g)), i),
                                    g++
                        }
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            lazyLoad: !1,
            lazyLoadEager: 0
        },
            e.prototype.load = function (c) {
                var d = this._core.$stage.children().eq(c)
                    , e = d && d.find(".owl-lazy");
                !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
                    var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
                    this._core.trigger("load", {
                        element: f,
                        url: g
                    }, "lazy"),
                        f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
                            f.css("opacity", 1),
                                this._core.trigger("loaded", {
                                    element: f,
                                    url: g
                                }, "lazy")
                        }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function () {
                            this._core.trigger("loaded", {
                                element: f,
                                url: g
                            }, "lazy")
                        }, this)).attr("srcset", g) : (e = new Image,
                            e.onload = a.proxy(function () {
                                f.css({
                                    "background-image": 'url("' + g + '")',
                                    opacity: "1"
                                }),
                                    this._core.trigger("loaded", {
                                        element: f,
                                        url: g
                                    }, "lazy")
                            }, this),
                            e.src = g)
                }, this)),
                    this._loaded.push(d.get(0)))
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this._core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Lazy = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (c) {
            this._core = c,
                this._previousHeight = null,
                this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && this.update()
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
                    }, this),
                    "loaded.owl.lazy": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers),
                this._intervalId = null;
            var d = this;
            a(b).on("load", function () {
                d._core.settings.autoHeight && d.update()
            }),
                a(b).resize(function () {
                    d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId),
                        d._intervalId = setTimeout(function () {
                            d.update()
                        }, 250))
                })
        };
        e.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        },
            e.prototype.update = function () {
                var b = this._core._current
                    , c = b + this._core.settings.items
                    , d = this._core.settings.lazyLoad
                    , e = this._core.$stage.children().toArray().slice(b, c)
                    , f = []
                    , g = 0;
                a.each(e, function (b, c) {
                    f.push(a(c).height())
                }),
                    g = Math.max.apply(null, f),
                    g <= 1 && d && this._previousHeight && (g = this._previousHeight),
                    this._previousHeight = g,
                    this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._videos = {},
                this._playing = null,
                this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.register({
                            type: "state",
                            name: "playing",
                            tags: ["interacting"]
                        })
                    }, this),
                    "resize.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" === a.property.name && this._playing && this.stop()
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content).find(".owl-video");
                            c.length && (c.css("display", "none"),
                                this.fetch(c, a(b.content)))
                        }
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers),
                this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
                    this.play(a)
                }, this))
        };
        e.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        },
            e.prototype.fetch = function (a, b) {
                var c = function () {
                    return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
                }()
                    , d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id")
                    , e = a.attr("data-width") || this._core.settings.videoWidth
                    , f = a.attr("data-height") || this._core.settings.videoHeight
                    , g = a.attr("href");
                if (!g)
                    throw new Error("Missing video URL.");
                if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
                    d[3].indexOf("youtu") > -1)
                    c = "youtube";
                else if (d[3].indexOf("vimeo") > -1)
                    c = "vimeo";
                else {
                    if (!(d[3].indexOf("vzaar") > -1))
                        throw new Error("Video URL not supported.");
                    c = "vzaar"
                }
                d = d[6],
                    this._videos[g] = {
                        type: c,
                        id: d,
                        width: e,
                        height: f
                    },
                    b.attr("data-video", g),
                    this.thumbnail(a, this._videos[g])
            }
            ,
            e.prototype.thumbnail = function (b, c) {
                var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function (c) {
                    e = '<div class="owl-video-play-icon"></div>',
                        d = k.lazyLoad ? a("<div/>", {
                            class: "owl-video-tn " + j,
                            srcType: c
                        }) : a("<div/>", {
                            class: "owl-video-tn",
                            style: "opacity:1;background-image:url(" + c + ")"
                        }),
                        b.after(d),
                        b.after(e)
                };
                if (b.wrap(a("<div/>", {
                    class: "owl-video-wrapper",
                    style: g
                })),
                    this._core.settings.lazyLoad && (i = "data-src",
                        j = "owl-lazy"),
                    h.length)
                    return l(h.attr(i)),
                        h.remove(),
                        !1;
                "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg",
                    l(f)) : "vimeo" === c.type ? a.ajax({
                        type: "GET",
                        url: "//vimeo.com/api/v2/video/" + c.id + ".json",
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function (a) {
                            f = a[0].thumbnail_large,
                                l(f)
                        }
                    }) : "vzaar" === c.type && a.ajax({
                        type: "GET",
                        url: "//vzaar.com/api/videos/" + c.id + ".json",
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function (a) {
                            f = a.framegrab_url,
                                l(f)
                        }
                    })
            }
            ,
            e.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    this._playing = null,
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video")
            }
            ,
            e.prototype.play = function (b) {
                var c, d = a(b.target), e = d.closest("." + this._core.settings.itemClass), f = this._videos[e.attr("data-video")], g = f.width || "100%", h = f.height || this._core.$stage.height();
                this._playing || (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    e = this._core.items(this._core.relative(e.index())),
                    this._core.reset(e.index()),
                    c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),
                    c.attr("height", h),
                    c.attr("width", g),
                    "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"),
                    a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),
                    this._playing = e.addClass("owl-video-playing"))
            }
            ,
            e.prototype.isInFullScreen = function () {
                var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
                return b && a(b).parent().hasClass("owl-video-frame")
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                this._core.$element.off("click.owl.video");
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Video = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this.core = b,
                this.core.options = a.extend({}, e.Defaults, this.core.options),
                this.swapping = !0,
                this.previous = d,
                this.next = d,
                this.handlers = {
                    "change.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" == a.property.name && (this.previous = this.core.current(),
                            this.next = a.property.value)
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                        a.namespace && (this.swapping = "translated" == a.type)
                    }, this),
                    "translate.owl.carousel": a.proxy(function (a) {
                        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                    }, this)
                },
                this.core.$element.on(this.handlers)
        };
        e.Defaults = {
            animateOut: !1,
            animateIn: !1
        },
            e.prototype.swap = function () {
                if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
                    this.core.speed(0);
                    var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
                    this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
                        d.one(a.support.animation.end, c).css({
                            left: b + "px"
                        }).addClass("animated owl-animated-out").addClass(g)),
                        f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
                }
            }
            ,
            e.prototype.clear = function (b) {
                a(b.target).css({
                    left: ""
                }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
                    this.core.onTransitionEnd()
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this.core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Animate = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._call = null,
                this._time = 0,
                this._timeout = 0,
                this._paused = !0,
                this._handlers = {
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoplay && this.play()
                    }, this),
                    "play.owl.autoplay": a.proxy(function (a, b, c) {
                        a.namespace && this.play(b, c)
                    }, this),
                    "stop.owl.autoplay": a.proxy(function (a) {
                        a.namespace && this.stop()
                    }, this),
                    "mouseover.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                    }, this),
                    "mouseleave.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                    }, this),
                    "touchstart.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                    }, this),
                    "touchend.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play()
                    }, this)
                },
                this._core.$element.on(this._handlers),
                this._core.options = a.extend({}, e.Defaults, this._core.options)
        };
        e.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        },
            e.prototype._next = function (d) {
                this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()),
                    this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
            }
            ,
            e.prototype.read = function () {
                return (new Date).getTime() - this._time
            }
            ,
            e.prototype.play = function (c, d) {
                var e;
                this._core.is("rotating") || this._core.enter("rotating"),
                    c = c || this._core.settings.autoplayTimeout,
                    e = Math.min(this._time % (this._timeout || c), c),
                    this._paused ? (this._time = this.read(),
                        this._paused = !1) : b.clearTimeout(this._call),
                    this._time += this.read() % c - e,
                    this._timeout = c,
                    this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
            }
            ,
            e.prototype.stop = function () {
                this._core.is("rotating") && (this._time = 0,
                    this._paused = !0,
                    b.clearTimeout(this._call),
                    this._core.leave("rotating"))
            }
            ,
            e.prototype.pause = function () {
                this._core.is("rotating") && !this._paused && (this._time = this.read(),
                    this._paused = !0,
                    b.clearTimeout(this._call))
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                this.stop();
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.autoplay = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        "use strict";
        var e = function (b) {
            this._core = b,
                this._initialized = !1,
                this._pages = [],
                this._controls = {},
                this._templates = [],
                this.$element = this._core.$element,
                this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to
                },
                this._handlers = {
                    "prepared.owl.carousel": a.proxy(function (b) {
                        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
                    }, this),
                    "added.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
                    }, this),
                    "remove.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" == a.property.name && this.draw()
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"),
                            this.initialize(),
                            this.update(),
                            this.draw(),
                            this._initialized = !0,
                            this._core.trigger("initialized", null, "navigation"))
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"),
                            this.update(),
                            this.draw(),
                            this._core.trigger("refreshed", null, "navigation"))
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this.$element.on(this._handlers)
        };
        e.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        },
            e.prototype.initialize = function () {
                var b, c = this._core.settings;
                this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),
                    this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
                        this.prev(c.navSpeed)
                    }, this)),
                    this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
                        this.next(c.navSpeed)
                    }, this)),
                    c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),
                    this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),
                    this._controls.$absolute.on("click", "button", a.proxy(function (b) {
                        var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
                        b.preventDefault(),
                            this.to(d, c.dotsSpeed)
                    }, this));
                for (b in this._overrides)
                    this._core[b] = a.proxy(this[b], this)
            }
            ,
            e.prototype.destroy = function () {
                var a, b, c, d, e;
                e = this._core.settings;
                for (a in this._handlers)
                    this.$element.off(a, this._handlers[a]);
                for (b in this._controls)
                    "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
                for (d in this.overides)
                    this._core[d] = this._overrides[d];
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null)
            }
            ,
            e.prototype.update = function () {
                var a, b, c, d = this._core.clones().length / 2, e = d + this._core.items().length, f = this._core.maximum(!0), g = this._core.settings, h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
                if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
                    g.dots || "page" == g.slideBy)
                    for (this._pages = [],
                        a = d,
                        b = 0,
                        c = 0; a < e; a++) {
                        if (b >= h || 0 === b) {
                            if (this._pages.push({
                                start: Math.min(f, a - d),
                                end: a - d + h - 1
                            }),
                                Math.min(f, a - d) === f)
                                break;
                            b = 0,
                                ++c
                        }
                        b += this._core.mergers(this._core.relative(a))
                    }
            }
            ,
            e.prototype.draw = function () {
                var b, c = this._core.settings, d = this._core.items().length <= c.items, e = this._core.relative(this._core.current()), f = c.loop || c.rewind;
                this._controls.$relative.toggleClass("disabled", !c.nav || d),
                    c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)),
                        this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !c.dots || d),
                    c.dots && (b = this._pages.length - this._controls.$absolute.children().length,
                        c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
            }
            ,
            e.prototype.onTrigger = function (b) {
                var c = this._core.settings;
                b.page = {
                    index: a.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
                }
            }
            ,
            e.prototype.current = function () {
                var b = this._core.relative(this._core.current());
                return a.grep(this._pages, a.proxy(function (a, c) {
                    return a.start <= b && a.end >= b
                }, this)).pop()
            }
            ,
            e.prototype.getPosition = function (b) {
                var c, d, e = this._core.settings;
                return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages),
                    d = this._pages.length,
                    b ? ++c : --c,
                    c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()),
                        d = this._core.items().length,
                        b ? c += e.slideBy : c -= e.slideBy),
                    c
            }
            ,
            e.prototype.next = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
            }
            ,
            e.prototype.prev = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
            }
            ,
            e.prototype.to = function (b, c, d) {
                var e;
                !d && this._pages.length ? (e = this._pages.length,
                    a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Navigation = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        "use strict";
        var e = function (c) {
            this._core = c,
                this._hashes = {},
                this.$element = this._core.$element,
                this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (c) {
                        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            if (!c)
                                return;
                            this._hashes[c] = b.content
                        }
                    }, this),
                    "changed.owl.carousel": a.proxy(function (c) {
                        if (c.namespace && "position" === c.property.name) {
                            var d = this._core.items(this._core.relative(this._core.current()))
                                , e = a.map(this._hashes, function (a, b) {
                                    return a === d ? b : null
                                }).join();
                            if (!e || b.location.hash.slice(1) === e)
                                return;
                            b.location.hash = e
                        }
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this.$element.on(this._handlers),
                a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
                    var c = b.location.hash.substring(1)
                        , e = this._core.$stage.children()
                        , f = this._hashes[c] && e.index(this._hashes[c]);
                    f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
                }, this))
        };
        e.Defaults = {
            URLhashListener: !1
        },
            e.prototype.destroy = function () {
                var c, d;
                a(b).off("hashchange.owl.navigation");
                for (c in this._handlers)
                    this._core.$element.off(c, this._handlers[c]);
                for (d in Object.getOwnPropertyNames(this))
                    "function" != typeof this[d] && (this[d] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Hash = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        function e(b, c) {
            var e = !1
                , f = b.charAt(0).toUpperCase() + b.slice(1);
            return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
                if (g[b] !== d)
                    return e = !c || b,
                        !1
            }),
                e
        }
        function f(a) {
            return e(a, !0)
        }
        var g = a("<support>").get(0).style
            , h = "Webkit Moz O ms".split(" ")
            , i = {
                transition: {
                    end: {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        transition: "transitionend"
                    }
                },
                animation: {
                    end: {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd",
                        animation: "animationend"
                    }
                }
            }
            , j = {
                csstransforms: function () {
                    return !!e("transform")
                },
                csstransforms3d: function () {
                    return !!e("perspective")
                },
                csstransitions: function () {
                    return !!e("transition")
                },
                cssanimations: function () {
                    return !!e("animation")
                }
            };
        j.csstransitions() && (a.support.transition = new String(f("transition")),
            a.support.transition.end = i.transition.end[a.support.transition]),
            j.cssanimations() && (a.support.animation = new String(f("animation")),
                a.support.animation.end = i.animation.end[a.support.animation]),
            j.csstransforms() && (a.support.transform = new String(f("transform")),
                a.support.transform3d = j.csstransforms3d())
    }(window.Zepto || window.jQuery, window, document);
if (!window['jQuery'])
    alert('The jQuery library must be included before the smoothscroll.js file.  The plugin will not work propery.');
; (function ($) {
    var h = $.scrollTo = function (a, b, c) {
        $(window).scrollTo(a, b, c)
    }
        ;
    h.defaults = {
        axis: 'xy',
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    h.window = function (a) {
        return $(window)._scrollable()
    }
        ;
    $.fn._scrollable = function () {
        return this.map(function () {
            var a = this
                , isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!isWin)
                return a;
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
        })
    }
        ;
    $.fn.scrollTo = function (e, f, g) {
        if (typeof f == 'object') {
            g = f;
            f = 0
        }
        if (typeof g == 'function')
            g = {
                onAfter: g
            };
        if (e == 'max')
            e = 9e9;
        g = $.extend({}, h.defaults, g);
        f = f || g.duration;
        g.queue = g.queue && g.axis.length > 1;
        if (g.queue)
            f /= 2;
        g.offset = both(g.offset);
        g.over = both(g.over);
        return this._scrollable().each(function () {
            if (e == null)
                return;
            var d = this, $elem = $(d), targ = e, toff, attr = {}, win = $elem.is('html,body');
            switch (typeof targ) {
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break
                    }
                    targ = $(targ, this);
                    if (!targ.length)
                        return;
                case 'object':
                    if (targ.is || targ.style)
                        toff = (targ = $(targ)).offset()
            }
            $.each(g.axis.split(''), function (i, a) {
                var b = a == 'x' ? 'Left' : 'Top'
                    , pos = b.toLowerCase()
                    , key = 'scroll' + b
                    , old = d[key]
                    , max = h.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (g.margin) {
                        attr[key] -= parseInt(targ.css('margin' + b)) || 0;
                        attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
                    }
                    attr[key] += g.offset[pos] || 0;
                    if (g.over[pos])
                        attr[key] += targ[a == 'x' ? 'width' : 'height']() * g.over[pos]
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c
                }
                if (g.limit && /^\d+$/.test(attr[key]))
                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                if (!i && g.queue) {
                    if (old != attr[key])
                        animate(g.onAfterFirst);
                    delete attr[key]
                }
            });
            animate(g.onAfter);
            function animate(a) {
                $elem.animate(attr, f, g.easing, a && function () {
                    a.call(this, e, g)
                }
                )
            }
        }).end()
    }
        ;
    h.max = function (a, b) {
        var c = b == 'x' ? 'Width' : 'Height'
            , scroll = 'scroll' + c;
        if (!$(a).is('html,body'))
            return a[scroll] - $(a)[c.toLowerCase()]();
        var d = 'client' + c
            , html = a.ownerDocument.documentElement
            , body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
    }
        ;
    function both(a) {
        return typeof a == 'object' ? a : {
            top: a,
            left: a
        }
    }
}
)(jQuery);
; (function (b) {
    function g(a, e, d) {
        var h = e.hash.slice(1)
            , f = document.getElementById(h) || document.getElementsByName(h)[0];
        if (f) {
            a && a.preventDefault();
            var c = b(d.target);
            if (!(d.lock && c.is(":animated") || d.onBefore && !1 === d.onBefore(a, f, c))) {
                d.stop && c._scrollable().stop(!0);
                if (d.hash) {
                    var a = f.id == h ? "id" : "name"
                        , g = b("<a> </a>").attr(a, h).css({
                            position: "absolute",
                            top: b(window).scrollTop(),
                            left: b(window).scrollLeft()
                        });
                    f[a] = "";
                    b("body").prepend(g);
                    location = e.hash;
                    g.remove();
                    f[a] = h
                }
                c.scrollTo(f, d).trigger("notify.serialScroll", [f])
            }
        }
    }
    var i = location.href.replace(/#.*/, "")
        , c = b.localScroll = function (a) {
            b("body").localScroll(a)
        }
        ;
    c.defaults = {
        duration: 1E3,
        axis: "y",
        event: "click",
        stop: !0,
        target: window,
        reset: !0
    };
    c.hash = function (a) {
        if (location.hash) {
            a = b.extend({}, c.defaults, a);
            a.hash = !1;
            if (a.reset) {
                var e = a.duration;
                delete a.duration;
                b(a.target).scrollTo(0, a);
                a.duration = e
            }
            g(0, location, a)
        }
    }
        ;
    b.fn.localScroll = function (a) {
        function e() {
            return !!this.href && !!this.hash && this.href.replace(this.hash, "") == i && (!a.filter || b(this).is(a.filter))
        }
        a = b.extend({}, c.defaults, a);
        return a.lazy ? this.bind(a.event, function (d) {
            var c = b([d.target, d.target.parentNode]).filter(e)[0];
            c && g(d, c, a)
        }) : this.find("a,area").filter(e).bind(a.event, function (b) {
            g(b, this, a)
        }).end().end()
    }
}
)(jQuery);
jQuery(function ($) {
    $.localScroll({
        filter: '.smoothScroll'
    });
});
!function (o) {
    "use strict";
    o(".color-mode").click(function () {
        o(".color-mode-icon").toggleClass("active"),
            o("body").toggleClass("dark-mode")
    }),
        o(".navbar").headroom(),
        o(".owl-carousel").owlCarousel({
            items: 1,
            loop: !0,
            margin: 10,
            nav: !0
        }),
        o(function () {
            o(".nav-link, .custom-btn-link").on("click", function (t) {
                var l = o(this);
                o("html, body").stop().animate({
                    scrollTop: o(l.attr("href")).offset().top - 49
                }, 1e3),
                    t.preventDefault()
            })
        }),
        o(".social-links a").tooltip()
}(jQuery);

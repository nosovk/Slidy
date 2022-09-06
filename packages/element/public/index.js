'use strict';
var Slidy = (() => {
    var W = Object.defineProperty;
    var Pt = Object.getOwnPropertyDescriptor;
    var qt = Object.getOwnPropertyNames;
    var Ut = Object.prototype.hasOwnProperty;
    var Ct = (t, n, e) =>
        n in t ? W(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (t[n] = e);
    var j = (t, n) => {
            for (var e in n) W(t, e, { get: n[e], enumerable: !0 });
        },
        Dt = (t, n, e, s) => {
            if ((n && typeof n == 'object') || typeof n == 'function')
                for (let i of qt(n))
                    !Ut.call(t, i) &&
                        i !== e &&
                        W(t, i, { get: () => n[i], enumerable: !(s = Pt(n, i)) || s.enumerable });
            return t;
        };
    var Xt = (t) => Dt(W({}, '__esModule', { value: !0 }), t);
    var et = (t, n, e) => (Ct(t, typeof n != 'symbol' ? n + '' : n, e), e);
    var Wt = {};
    j(Wt, { animation: () => Z, easing: () => G, element: () => P, media: () => B });
    function A(t, n, e) {
        return Math.min(e, Math.max(t, n));
    }
    function Y(t, n, e, s, i) {
        return e
            ? (a) => {
                  s || (t(a), (s = !0), clearTimeout(i), (i = setTimeout(() => (s = !1), n)));
              }
            : (a) => t(a);
    }
    function S(t, n) {
        for (let e = 0; e < t.length; e++) n(t[e], e);
        return t;
    }
    function st(t) {
        return new Promise((n, e) => {
            let s = 0,
                i = setInterval(() => {
                    s++,
                        s >= 69
                            ? (clearInterval(i), e('few slides'))
                            : t.children.length > 1 && (clearInterval(i), n(_t(t)));
                }, 16);
        });
    }
    function _t(t) {
        return S(t.children, (n, e) => (n.index = e));
    }
    function H(t, n, e) {
        let s = t.children.length;
        return n.loop ? (e + s) % s : A(0, e, s - 1);
    }
    function D(t, n) {
        if (t.type === 'wheel')
            return Math.abs(t.deltaX) >= Math.abs(t.deltaY)
                ? t.deltaX
                : t.shiftKey || n.axis === 'y'
                ? t.deltaY
                : 0;
        {
            let e = (s) => (s.touches && s.touches[0]) || s;
            return n.axis === 'y' ? e(t).pageY : e(t).pageX;
        }
    }
    function L(t, n, e) {
        t.dispatchEvent(new CustomEvent(n, { detail: e }));
    }
    function N(t, n, e = !0) {
        S(n, (s) => {
            let i = e ? 'addEventListener' : 'removeEventListener',
                [a, v, f] = s;
            t[i](a, v, f);
        });
    }
    function ot(t, n) {
        let e = [...t.children],
            s = e.length,
            i = [...Array(s).keys()],
            a = s - 1,
            v = Math.floor(s / 2),
            f = e[1].offsetTop - e[0].offsetTop,
            x = f ? 'offsetTop' : 'offsetLeft',
            m = f ? 'offsetHeight' : 'offsetWidth',
            r = Math.sign(e[a][x]),
            d = s > 1 ? e[a][x] * r - e[a - 1][x] * r - e[a - Math.max(r, 0)][m] : 0,
            k = T(r < 0 ? a : 0, 'start'),
            h = T(r < 0 ? 0 : a, 'end'),
            w = Math.abs(h - k) > d * 2,
            $ = n.loop
                ? !1
                : ((r < 0 ? n.index === a : !n.index) && n.direction <= 0 && n.position < k) ||
                  ((r < 0 ? !n.index : n.index === a) && n.direction > 0 && n.position > h);
        function T(c, b = n.snap) {
            let l = (I) => e.find((O) => O.index === I) || e[0],
                u = (I) => t[m] - l(I)[m],
                U = l(c)[m] + d * 2 < t[m] ? n.indent : u(c) / 2 / d || 0,
                X = z(c, b) <= z(r < 0 ? a : 0, 'start'),
                M = z(c, b) >= z(r < 0 ? 0 : a, 'end'),
                _ = X ? 'start' : M ? 'end' : n.snap;
            return z(c, n.snap && n.snap !== 'deck' && !n.loop ? _ : b);
            function z(I, O) {
                let K = O === 'start' ? 0 : O === 'end' ? 1 : 0.5,
                    R = O === 'start' ? -U : O === 'end' ? U : 0;
                return l(I)[x] - u(I) * K + d * R;
            }
        }
        return {
            end: h,
            start: k,
            edges: $,
            distance: T,
            scrollable: w,
            index(c) {
                let b = (l) => Math.abs(T(l) - c);
                return i.reduce((l, u) => (b(u) < b(l) ? u : l), 0);
            },
            position(c = n.loop) {
                if (c) {
                    let b = n.index,
                        l = e.slice(b - v).concat(e.slice(0, b - v));
                    t.replaceChildren(...l);
                }
                return w ? T(n.index) : 0;
            },
            swap(c) {
                let b = s % c ? Math.sign(-c) : c,
                    l = b > 0 ? 0 : a;
                return l ? t.prepend(e[l]) : t.append(e[l]), (e[l][m] + d) * (b * r);
            },
            animate() {
                S(e, (c, b) => {
                    (c.i = b),
                        (c.active = n.loop ? v : n.index),
                        (c.size = c[m] + d),
                        (c.dist = T(c.index)),
                        (c.track = n.position - c.dist),
                        (c.turn = A(-1, c.track / c.size, 1)),
                        (c.exp = A(0, (c.size - Math.abs(c.track)) / c.size, 1));
                    let l = n.snap === 'deck' ? c.dist : n.position,
                        u = f ? `translateY(${-l}px)` : `translateX(${-l}px)`,
                        q = n.animation
                            ? n.animation({
                                  node: t,
                                  child: c,
                                  options: Object.assign(n, { vertical: f, reverse: r }),
                                  translate: u,
                              })
                            : { transform: u };
                    Object.assign(c.style, q);
                });
            },
        };
    }
    function J(t, n) {
        let e = {
                index: 0,
                clamp: 0,
                indent: 1,
                sensity: 5,
                gravity: 1.2,
                duration: 375,
                animation: void 0,
                easing: void 0,
                snap: void 0,
                axis: void 0,
                loop: !1,
                ...n,
            },
            s = 0,
            i = 0,
            a = 0,
            v = 0,
            f = 0,
            x = !1,
            m,
            r = (s = e.index),
            d = e.position,
            k = e.duration / 2,
            h = e.sensity,
            w = e.gravity,
            $ = e.clamp,
            T = [
                ['touchmove', z, { passive: !1 }],
                ['mousemove', z],
                ['touchend', I],
                ['mouseup', I],
            ],
            c = [['wheel', K, { passive: !1, capture: !0 }]],
            b = [
                ['touchstart', _, { passive: !1 }],
                ['mousedown', _],
                ['keydown', R],
                ['contextmenu', () => M(r)],
                ['dragstart', (o) => o.preventDefault()],
            ],
            l = new ResizeObserver((o) => {
                M(r), (d = u().position(!1)), L(t, 'resize', { ROE: o });
            });
        function u() {
            return ot(t, e);
        }
        function q(o, p) {
            return e.axis === 'y' && o.type === 'touchmove' ? !u().edges : Math.abs(p) >= h;
        }
        st(t)
            .then(() => {
                (t.style.cssText +=
                    'outline:0;overflow:hidden;user-select:none;-webkit-user-select:none;'),
                    (t.onwheel = Y(O, k, $)),
                    (d = u().position()),
                    l.observe(t),
                    N(t, b),
                    N(window, c),
                    L(t, 'mount', { options: e });
            })
            .catch((o) => console.error('Slidy:', o));
        function U(o, p) {
            (e.direction = Math.sign(o)),
                (d += g(o)),
                (d = e.position = E(d)),
                (r = e.index = u().index(d)),
                (w = u().edges ? 1.8 : e.gravity),
                (h = 0),
                u().animate(),
                L(t, 'move', { index: r, position: d });
            function g(y) {
                return (
                    r - s &&
                        ((y -= e.loop ? u().swap(r - s) : 0), (s = r), L(t, 'index', { index: p })),
                    u().scrollable ? y : 0
                );
            }
            function E(y) {
                let F = A(u().start, y, u().end);
                return !e.snap && !e.loop ? F : y;
            }
        }
        function X(o, p) {
            let g = performance.now(),
                y = e.snap || e.loop || u().edges ? u().distance(o) : A(u().start, d + p, u().end),
                F = k * A(1, Math.abs(o - s), 2);
            (p = y - d),
                requestAnimationFrame(function V() {
                    let Ft = g - performance.now(),
                        tt = Math.exp(Ft / F),
                        St = e.easing ? e.easing(tt) : tt,
                        nt = p * St,
                        Nt = (e.loop ? u().distance(o) : y) - d - nt;
                    U(Nt, o),
                        Math.round(nt) ? (a = requestAnimationFrame(V)) : ((h = e.sensity), C());
                });
        }
        function M(o = 0) {
            C(), (o = H(t, e, o));
            let p = u().distance(o) - d;
            X(o, p);
        }
        function _(o) {
            C(),
                (h = e.sensity),
                (i = D(o, e)),
                (v = o.timeStamp),
                (f = 0),
                N(window, T),
                !u().edges && o.stopPropagation();
        }
        function z(o) {
            let p = (i - D(o, e)) * (2 - w),
                g = o.timeStamp - v,
                E = (1e3 * p) / (w + g);
            (v = o.timeStamp),
                (i = D(o, e)),
                (f = (2 - w) * E + (w - 1) * f),
                (window.onscroll = () => {
                    M(r), (w = 2);
                }),
                q(o, p) && (U(p, r), o.preventDefault());
        }
        function I() {
            C();
            let o = f * (2 - w),
                p = u().index(d + o);
            X(g(p, e), o);
            function g(E, y) {
                let F = $ * y.direction;
                return (E = $ && E - s ? r + F : E), H(t, y, E);
            }
        }
        function O(o) {
            C();
            let p = D(o, e) * (2 - w),
                g = r + Math.sign(p) * ($ || 1),
                E = $ || o.shiftKey,
                y = u().edges ? p / 5 : p,
                F = E ? g : r,
                V = E ? 0 : k / 2;
            !E && q(o, y) && U(y, r),
                (m = (e.snap || E) && q(o, y) ? setTimeout(() => M(F), V) : void 0),
                !u().edges && o.stopPropagation();
        }
        function K(o) {
            o.composedPath().includes(t) &&
                ((Math.abs(o.deltaX) >= Math.abs(o.deltaY) ||
                    o.shiftKey ||
                    (e.axis === 'y' && !u().edges)) &&
                    o.preventDefault(),
                o.shiftKey !== x && ((t.onwheel = Y(O, k, o.shiftKey)), (x = o.shiftKey)));
        }
        function R(o) {
            let p = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
                g = ((p.indexOf(o.key) % 2) - 1 || 1) * ($ || 1);
            p.indexOf(o.key) >= 0 && (M(r + g), o.preventDefault()), L(t, 'keys', o.key);
        }
        function C() {
            clearTimeout(m), cancelAnimationFrame(a), N(window, T, !1);
        }
        function zt(o) {
            S(Object.entries(o), ([p, g]) => {
                if (g !== e[p]) {
                    switch (p) {
                        case 'index':
                            (r = e[p] = H(t, e, g)), M(r);
                            break;
                        case 'gravity':
                            w = e[p] = A(0, g, 2);
                            break;
                        case 'duration':
                            (e[p] = g), (k = g / 2);
                            break;
                        case 'sensity':
                            h = e[p] = g;
                            break;
                        case 'clamp':
                            ($ = e[p] = g), (t.onwheel = Y(O, k, g));
                            break;
                        default:
                            (e[p] = g), (d = e.position = u().position(!1)), M(r);
                            break;
                    }
                    L(t, 'update', o);
                }
            });
        }
        function Lt() {
            C(), l.disconnect(), N(t, b, !1), N(window, c, !1), L(t, 'destroy', t);
        }
        return { update: zt, destroy: Lt, to: M };
    }
    function it(t) {
        return !isNaN(t) || ['true', 'false'].includes(t) ? JSON.parse(t) : t;
    }
    function rt(t) {
        return Function(`const fn = ${t}; return fn`)();
    }
    var Q = class extends HTMLElement {
            _slidy;
            _options;
            constructor() {
                super(), this.setUpAccessors(Q.observedAttributes);
            }
            set options(n) {
                this._options = n;
            }
            get options() {
                return this._options;
            }
            setUpAccessors(n) {
                n.forEach((e) => {
                    Object.defineProperty(this, e, {
                        set: (s) => this.setAttribute(e, s),
                        get: () => this.getAttribute(e),
                    });
                });
            }
            setUpOptions(n) {
                return n.reduce((e, s) => {
                    let i = this[s];
                    return (
                        s !== 'length' &&
                            i &&
                            (['animation', 'easing'].includes(s) ? (e[s] = rt(i)) : (e[s] = it(i))),
                        e
                    );
                }, {});
            }
            connectedCallback() {
                (this._options = this.setUpOptions(Q.observedAttributes)),
                    this.isConnected &&
                        (console.log(this.id, this.options), this.init(this._options));
            }
            attributeChangedCallback(n, e, s) {
                if (n !== 'length') {
                    let i = { [n]: s };
                    this.update(i);
                } else this.init(this._options);
            }
            init(n = {}) {
                this._slidy = J(this, n);
            }
            goto(n) {
                this._slidy?.to(n);
            }
            update(n) {
                this._slidy?.update(n);
            }
            destroy() {
                this._slidy?.destroy();
            }
        },
        P = Q;
    et(P, 'observedAttributes', [
        'index',
        'clamp',
        'indent',
        'sensity',
        'gravity',
        'duration',
        'animation',
        'easing',
        'snap',
        'axis',
        'loop',
        'length',
    ]);
    'customElements' in window && customElements.define('slidy-element', P);
    var Z = {};
    j(Z, {
        blur: () => ut,
        deck: () => xt,
        fade: () => at,
        flip: () => bt,
        matrix: () => gt,
        perspective: () => ft,
        rotate: () => mt,
        scale: () => pt,
        shade: () => ct,
        shuffle: () => dt,
        stairs: () => vt,
        translate: () => lt,
    });
    var at = ({ child: t, translate: n }) => ({ opacity: t.exp, transform: n }),
        ct = ({ child: t, translate: n }) => {
            let e = t.i === t.active,
                s = Math.abs(t.track) <= t.size,
                i = e ? 0 : 1,
                a = `${t.track / 0.5}px, 0`;
            return (
                t.index === 4 && console.log(t.index, s),
                { transform: e ? `${n} translate(${a})` : n, zIndex: i }
            );
        },
        ut = ({ child: t, translate: n }) => {
            let s = t.i === t.active ? t.active : t.i > t.active ? t.active - t.i : t.i - t.active;
            return { opacity: t.exp, filter: `blur(${1 - t.exp}ex`, transform: n, zIndex: s };
        },
        pt = ({ child: t, translate: n }) => ({ transform: `${n} scale(${t.exp})` }),
        mt = ({ child: t, options: n, translate: e }) => {
            let i = t.index === n.index ? 0 : -1;
            return { transform: `${e} rotate(${t.turn}turn)`, zIndex: i };
        },
        ft = ({ child: t, translate: n }) => ({ transform: `${n} perspective(${-t.turn}px)` }),
        dt = ({ node: t, child: n, options: e, translate: s }) => {
            let i = Math.sign(n.track),
                a = Math.abs(n.track) < n.size && n.i === n.active,
                f = Math.abs(n.track) < n.size / 2 ? -n.track : Math.abs(n.track) - n.size,
                x = e.vertical ? `0, ${-n.track}px` : `${f}px, ${i}px`,
                m =
                    n.i === n.active
                        ? n.active
                        : n.i > n.active
                        ? n.active - n.i
                        : -(n.i - n.active + t.children.length);
            return { transform: a ? `${s} translate(${x})` : `${s}`, zIndex: m };
        },
        lt = ({ translate: t }) => ({ transform: t }),
        gt = ({ node: t, child: n, options: e }) => {
            let s = n.index === e.index,
                i = n.exp,
                a = -n.turn,
                v = -n.turn,
                f = n.exp,
                x = -e.position,
                m = -n.turn,
                r = s
                    ? t.children.length - n.index
                    : n.index < e.index
                    ? n.index - t.children.length
                    : t.children.length - n.index - 1;
            return { transform: `matrix(${i}, ${a}, ${v}, ${f}, ${x}, ${m})`, zIndex: r };
        },
        vt = ({ node: t, child: n, options: e, translate: s }) => {
            t.style.perspective = `${t.offsetWidth}px`;
            let i = e.snap === 'deck',
                v =
                    n.i === n.active
                        ? n.active
                        : n.i > n.active
                        ? n.active - n.i
                        : n.i - t.children.length + 1,
                f = i ? `scale(${n.exp})` : `translateZ(${-Math.abs(n.track)}px)`;
            return { transform: s + f, zIndex: v };
        },
        bt = ({ node: t, child: n, options: e, translate: s }) => {
            t.style.perspective = `${t.offsetWidth}px`;
            let i = e.snap === 'deck',
                a = n.turn / (i ? -2 : -4),
                v = e.vertical ? `rotateX(${a}turn)` : `rotateY(${-a}turn)`,
                f = Math.abs(a) < 0.25;
            return { transform: s + v, zIndex: f ? 0 : -1, opacity: f || !i ? 1 : 0 };
        },
        xt = ({ node: t, child: n, options: e, translate: s }) => {
            t.style.perspective = `${t.offsetWidth}px`;
            let i = n.index === e.index,
                a = n.size / 10,
                v = Math.abs(n.track * 2) >= n.size / 2,
                f = i ? (v ? n.size + n.track : -n.track * 2) : -n.track / a,
                x = e.vertical ? 0 : f,
                m = e.vertical ? f : 0,
                r = -Math.abs(n.track) / (a / 2),
                d = i ? -n.track / a : -n.track / (a * 2),
                k = i ? (n.size - Math.abs(n.track / 2)) / n.size : 1,
                h = i ? n.active : n.i > n.active ? n.active - n.i : 1 - t.children.length - n.i;
            return {
                transform: s + `translate3d(${x}px, ${m}px, ${r}px) rotateZ(${d}deg) scale(${k})`,
                zIndex: h,
            };
        };
    var G = {};
    j(G, {
        back: () => It,
        bounce: () => Mt,
        circ: () => Tt,
        cubic: () => kt,
        elastic: () => $t,
        expo: () => At,
        linear: () => yt,
        quad: () => Et,
        quart: () => wt,
        quint: () => ht,
        sine: () => Ot,
    });
    var yt = (t) => t,
        Et = (t) => t * t,
        kt = (t) => t * t * t,
        wt = (t) => t * t * t * t,
        ht = (t) => t * t * t * t * t,
        Mt = (t) =>
            1 -
            ((e) =>
                e < 0.36363636363636365
                    ? 7.5625 * e * e
                    : e < 0.7272727272727273
                    ? 7.5625 * (e -= 0.5454545454545454) * e + 0.75
                    : e < 0.9090909090909091
                    ? 7.5625 * (e -= 0.8181818181818182) * e + 0.9375
                    : 7.5625 * (e -= 0.9545454545454546) * e + 0.984375)(1 - t),
        Ot = (t) => 1 - Math.cos((t * Math.PI) / 2),
        At = (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
        $t = (t) => {
            let n = (2 * Math.PI) / 3;
            return t === 0
                ? 0
                : t === 1
                ? 1
                : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * n);
        },
        Tt = (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
        It = (t) => 2.70158 * t * t * t - 1.70158 * t * t;
    function B({ queries: t, getter: n, cookie: e }) {
        let s = new Set(),
            i = {};
        if (typeof window == 'object')
            for (let m in t) {
                let r = window.matchMedia(t[m]);
                a(r, m), (r.onchange = (d) => a(d, m));
            }
        function a(m, r) {
            (i[r] = m.matches),
                v(i),
                n && n(i),
                e && (document.cookie = `media=${JSON.stringify(i)}`);
        }
        function v(m) {
            s.forEach((r) => r(m));
        }
        function f(m) {
            return m(i), s.add(m), () => x(m);
        }
        let x = (m) => s.delete(m);
        return { matches: i, subscribe: f };
    }
    return Xt(Wt);
})();
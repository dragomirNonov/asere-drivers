function om(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const l in r)
        if (l !== 'default' && !(l in e)) {
          const i = Object.getOwnPropertyDescriptor(r, l);
          i &&
            Object.defineProperty(
              e,
              l,
              i.get
                ? i
                : {
                    enumerable: !0,
                    get: () => r[l],
                  }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, {
      value: 'Module',
    })
  );
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver(l => {
    for (const i of l)
      if (i.type === 'childList')
        for (const o of i.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function n(l) {
    const i = {};
    return (
      l.integrity && (i.integrity = l.integrity),
      l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i);
  }
})();
function am(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var sc = { exports: {} },
  es = {},
  ic = { exports: {} },
  L = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cr = Symbol.for('react.element'),
  um = Symbol.for('react.portal'),
  cm = Symbol.for('react.fragment'),
  dm = Symbol.for('react.strict_mode'),
  fm = Symbol.for('react.profiler'),
  mm = Symbol.for('react.provider'),
  pm = Symbol.for('react.context'),
  hm = Symbol.for('react.forward_ref'),
  xm = Symbol.for('react.suspense'),
  gm = Symbol.for('react.memo'),
  vm = Symbol.for('react.lazy'),
  ya = Symbol.iterator;
function ym(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (ya && e[ya]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var oc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  ac = Object.assign,
  uc = {};
function Rn(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = uc), (this.updater = n || oc);
}
Rn.prototype.isReactComponent = {};
Rn.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
Rn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function cc() {}
cc.prototype = Rn.prototype;
function mo(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = uc), (this.updater = n || oc);
}
var po = (mo.prototype = new cc());
po.constructor = mo;
ac(po, Rn.prototype);
po.isPureReactComponent = !0;
var wa = Array.isArray,
  dc = Object.prototype.hasOwnProperty,
  ho = { current: null },
  fc = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0,
  };
function mc(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = '' + t.key), t))
      dc.call(t, r) && !fc.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), d = 0; d < a; d++) u[d] = arguments[d + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in ((a = e.defaultProps), a)) l[r] === void 0 && (l[r] = a[r]);
  return {
    $$typeof: Cr,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: ho.current,
  };
}
function wm(e, t) {
  return {
    $$typeof: Cr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function xo(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Cr;
}
function jm(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var ja = /\/+/g;
function Ts(e, t) {
  return typeof e == 'object' && e !== null && e.key != null ? jm('' + e.key) : t.toString(36);
}
function il(e, t, n, r, l) {
  var i = typeof e;
  (i === 'undefined' || i === 'boolean') && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (i) {
      case 'string':
      case 'number':
        o = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case Cr:
          case um:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (l = l(o)),
      (e = r === '' ? '.' + Ts(o, 0) : r),
      wa(l)
        ? ((n = ''),
          e != null && (n = e.replace(ja, '$&/') + '/'),
          il(l, t, n, '', function (d) {
            return d;
          }))
        : l != null &&
          (xo(l) &&
            (l = wm(
              l,
              n +
                (!l.key || (o && o.key === l.key) ? '' : ('' + l.key).replace(ja, '$&/') + '/') +
                e
            )),
          t.push(l)),
      1
    );
  if (((o = 0), (r = r === '' ? '.' : r + ':'), wa(e)))
    for (var a = 0; a < e.length; a++) {
      i = e[a];
      var u = r + Ts(i, a);
      o += il(i, t, n, u, l);
    }
  else if (((u = ym(e)), typeof u == 'function'))
    for (e = u.call(e), a = 0; !(i = e.next()).done; )
      (i = i.value), (u = r + Ts(i, a++)), (o += il(i, t, n, u, l));
  else if (i === 'object')
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
          '). If you meant to render a collection of children, use an array instead.'
      ))
    );
  return o;
}
function Mr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    il(e, r, '', '', function (i) {
      return t.call(n, i, l++);
    }),
    r
  );
}
function Nm(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var me = { current: null },
  ol = { transition: null },
  Sm = {
    ReactCurrentDispatcher: me,
    ReactCurrentBatchConfig: ol,
    ReactCurrentOwner: ho,
  };
L.Children = {
  map: Mr,
  forEach: function (e, t, n) {
    Mr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Mr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Mr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!xo(e))
      throw Error('React.Children.only expected to receive a single React element child.');
    return e;
  },
};
L.Component = Rn;
L.Fragment = cm;
L.Profiler = fm;
L.PureComponent = mo;
L.StrictMode = dm;
L.Suspense = xm;
L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sm;
L.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.'
    );
  var r = ac({}, e.props),
    l = e.key,
    i = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (o = ho.current)),
      t.key !== void 0 && (l = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (u in t)
      dc.call(t, u) &&
        !fc.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var d = 0; d < u; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return {
    $$typeof: Cr,
    type: e.type,
    key: l,
    ref: i,
    props: r,
    _owner: o,
  };
};
L.createContext = function (e) {
  return (
    (e = {
      $$typeof: pm,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = {
      $$typeof: mm,
      _context: e,
    }),
    (e.Consumer = e)
  );
};
L.createElement = mc;
L.createFactory = function (e) {
  var t = mc.bind(null, e);
  return (t.type = e), t;
};
L.createRef = function () {
  return { current: null };
};
L.forwardRef = function (e) {
  return { $$typeof: hm, render: e };
};
L.isValidElement = xo;
L.lazy = function (e) {
  return {
    $$typeof: vm,
    _payload: {
      _status: -1,
      _result: e,
    },
    _init: Nm,
  };
};
L.memo = function (e, t) {
  return {
    $$typeof: gm,
    type: e,
    compare: t === void 0 ? null : t,
  };
};
L.startTransition = function (e) {
  var t = ol.transition;
  ol.transition = {};
  try {
    e();
  } finally {
    ol.transition = t;
  }
};
L.unstable_act = function () {
  throw Error('act(...) is not supported in production builds of React.');
};
L.useCallback = function (e, t) {
  return me.current.useCallback(e, t);
};
L.useContext = function (e) {
  return me.current.useContext(e);
};
L.useDebugValue = function () {};
L.useDeferredValue = function (e) {
  return me.current.useDeferredValue(e);
};
L.useEffect = function (e, t) {
  return me.current.useEffect(e, t);
};
L.useId = function () {
  return me.current.useId();
};
L.useImperativeHandle = function (e, t, n) {
  return me.current.useImperativeHandle(e, t, n);
};
L.useInsertionEffect = function (e, t) {
  return me.current.useInsertionEffect(e, t);
};
L.useLayoutEffect = function (e, t) {
  return me.current.useLayoutEffect(e, t);
};
L.useMemo = function (e, t) {
  return me.current.useMemo(e, t);
};
L.useReducer = function (e, t, n) {
  return me.current.useReducer(e, t, n);
};
L.useRef = function (e) {
  return me.current.useRef(e);
};
L.useState = function (e) {
  return me.current.useState(e);
};
L.useSyncExternalStore = function (e, t, n) {
  return me.current.useSyncExternalStore(e, t, n);
};
L.useTransition = function () {
  return me.current.useTransition();
};
L.version = '18.2.0';
ic.exports = L;
var w = ic.exports;
const ue = am(w),
  km = om({ __proto__: null, default: ue }, [w]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Em = w,
  bm = Symbol.for('react.element'),
  Cm = Symbol.for('react.fragment'),
  Dm = Object.prototype.hasOwnProperty,
  Om = Em.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Pm = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0,
  };
function pc(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  n !== void 0 && (i = '' + n),
    t.key !== void 0 && (i = '' + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) Dm.call(t, r) && !Pm.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: bm,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: Om.current,
  };
}
es.Fragment = Cm;
es.jsx = pc;
es.jsxs = pc;
sc.exports = es;
var s = sc.exports,
  ai = {},
  hc = { exports: {} },
  be = {},
  xc = { exports: {} },
  gc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(C, _) {
    var R = C.length;
    C.push(_);
    e: for (; 0 < R; ) {
      var G = (R - 1) >>> 1,
        ee = C[G];
      if (0 < l(ee, _)) (C[G] = _), (C[R] = ee), (R = G);
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var _ = C[0],
      R = C.pop();
    if (R !== _) {
      C[0] = R;
      e: for (var G = 0, ee = C.length, $r = ee >>> 1; G < $r; ) {
        var $t = 2 * (G + 1) - 1,
          Ps = C[$t],
          zt = $t + 1,
          zr = C[zt];
        if (0 > l(Ps, R))
          zt < ee && 0 > l(zr, Ps)
            ? ((C[G] = zr), (C[zt] = R), (G = zt))
            : ((C[G] = Ps), (C[$t] = R), (G = $t));
        else if (zt < ee && 0 > l(zr, R)) (C[G] = zr), (C[zt] = R), (G = zt);
        else break e;
      }
    }
    return _;
  }
  function l(C, _) {
    var R = C.sortIndex - _.sortIndex;
    return R !== 0 ? R : C.id - _.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      a = o.now();
    e.unstable_now = function () {
      return o.now() - a;
    };
  }
  var u = [],
    d = [],
    c = 1,
    f = null,
    h = 3,
    y = !1,
    v = !1,
    x = !1,
    j = typeof setTimeout == 'function' ? setTimeout : null,
    p = typeof clearTimeout == 'function' ? clearTimeout : null,
    m = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(C) {
    for (var _ = n(d); _ !== null; ) {
      if (_.callback === null) r(d);
      else if (_.startTime <= C) r(d), (_.sortIndex = _.expirationTime), t(u, _);
      else break;
      _ = n(d);
    }
  }
  function N(C) {
    if (((x = !1), g(C), !v))
      if (n(u) !== null) (v = !0), Ds(E);
      else {
        var _ = n(d);
        _ !== null && Os(N, _.startTime - C);
      }
  }
  function E(C, _) {
    (v = !1), x && ((x = !1), p(T), (T = -1)), (y = !0);
    var R = h;
    try {
      for (g(_), f = n(u); f !== null && (!(f.expirationTime > _) || (C && !we())); ) {
        var G = f.callback;
        if (typeof G == 'function') {
          (f.callback = null), (h = f.priorityLevel);
          var ee = G(f.expirationTime <= _);
          (_ = e.unstable_now()),
            typeof ee == 'function' ? (f.callback = ee) : f === n(u) && r(u),
            g(_);
        } else r(u);
        f = n(u);
      }
      if (f !== null) var $r = !0;
      else {
        var $t = n(d);
        $t !== null && Os(N, $t.startTime - _), ($r = !1);
      }
      return $r;
    } finally {
      (f = null), (h = R), (y = !1);
    }
  }
  var D = !1,
    O = null,
    T = -1,
    H = 5,
    P = -1;
  function we() {
    return !(e.unstable_now() - P < H);
  }
  function Ye() {
    if (O !== null) {
      var C = e.unstable_now();
      P = C;
      var _ = !0;
      try {
        _ = O(!0, C);
      } finally {
        _ ? $n() : ((D = !1), (O = null));
      }
    } else D = !1;
  }
  var $n;
  if (typeof m == 'function')
    $n = function () {
      m(Ye);
    };
  else if (typeof MessageChannel < 'u') {
    var va = new MessageChannel(),
      im = va.port2;
    (va.port1.onmessage = Ye),
      ($n = function () {
        im.postMessage(null);
      });
  } else
    $n = function () {
      j(Ye, 0);
    };
  function Ds(C) {
    (O = C), D || ((D = !0), $n());
  }
  function Os(C, _) {
    T = j(function () {
      C(e.unstable_now());
    }, _);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (C) {
      C.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || y || ((v = !0), Ds(E));
    }),
    (e.unstable_forceFrameRate = function (C) {
      0 > C || 125 < C
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (H = 0 < C ? Math.floor(1e3 / C) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (C) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var _ = 3;
          break;
        default:
          _ = h;
      }
      var R = h;
      h = _;
      try {
        return C();
      } finally {
        h = R;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (C, _) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var R = h;
      h = C;
      try {
        return _();
      } finally {
        h = R;
      }
    }),
    (e.unstable_scheduleCallback = function (C, _, R) {
      var G = e.unstable_now();
      switch (
        (typeof R == 'object' && R !== null
          ? ((R = R.delay), (R = typeof R == 'number' && 0 < R ? G + R : G))
          : (R = G),
        C)
      ) {
        case 1:
          var ee = -1;
          break;
        case 2:
          ee = 250;
          break;
        case 5:
          ee = 1073741823;
          break;
        case 4:
          ee = 1e4;
          break;
        default:
          ee = 5e3;
      }
      return (
        (ee = R + ee),
        (C = {
          id: c++,
          callback: _,
          priorityLevel: C,
          startTime: R,
          expirationTime: ee,
          sortIndex: -1,
        }),
        R > G
          ? ((C.sortIndex = R),
            t(d, C),
            n(u) === null && C === n(d) && (x ? (p(T), (T = -1)) : (x = !0), Os(N, R - G)))
          : ((C.sortIndex = ee), t(u, C), v || y || ((v = !0), Ds(E))),
        C
      );
    }),
    (e.unstable_shouldYield = we),
    (e.unstable_wrapCallback = function (C) {
      var _ = h;
      return function () {
        var R = h;
        h = _;
        try {
          return C.apply(this, arguments);
        } finally {
          h = R;
        }
      };
    });
})(gc);
xc.exports = gc;
var Tm = xc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vc = w,
  Ee = Tm;
function k(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var yc = new Set(),
  or = {};
function Xt(e, t) {
  kn(e, t), kn(e + 'Capture', t);
}
function kn(e, t) {
  for (or[e] = t, e = 0; e < t.length; e++) yc.add(t[e]);
}
var lt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  ui = Object.prototype.hasOwnProperty,
  _m =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Na = {},
  Sa = {};
function Rm(e) {
  return ui.call(Sa, e) ? !0 : ui.call(Na, e) ? !1 : _m.test(e) ? (Sa[e] = !0) : ((Na[e] = !0), !1);
}
function Lm(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function Am(e, t, n, r) {
  if (t === null || typeof t > 'u' || Lm(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function pe(e, t, n, r, l, i, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o);
}
var se = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    se[e] = new pe(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  se[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  se[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
  se[e] = new pe(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    se[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  se[e] = new pe(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  se[e] = new pe(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  se[e] = new pe(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  se[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var go = /[\-:]([a-z])/g;
function vo(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(go, vo);
    se[t] = new pe(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(go, vo);
    se[t] = new pe(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(go, vo);
  se[t] = new pe(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  se[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
se.xlinkHref = new pe('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  se[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function yo(e, t, n, r) {
  var l = se.hasOwnProperty(t) ? se[t] : null;
  (l !== null
    ? l.type !== 0
    : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
    (Am(t, n, l, r) && (n = null),
    r || l === null
      ? Rm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ct = vc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Br = Symbol.for('react.element'),
  sn = Symbol.for('react.portal'),
  on = Symbol.for('react.fragment'),
  wo = Symbol.for('react.strict_mode'),
  ci = Symbol.for('react.profiler'),
  wc = Symbol.for('react.provider'),
  jc = Symbol.for('react.context'),
  jo = Symbol.for('react.forward_ref'),
  di = Symbol.for('react.suspense'),
  fi = Symbol.for('react.suspense_list'),
  No = Symbol.for('react.memo'),
  pt = Symbol.for('react.lazy'),
  Nc = Symbol.for('react.offscreen'),
  ka = Symbol.iterator;
function zn(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (ka && e[ka]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var Q = Object.assign,
  _s;
function Gn(e) {
  if (_s === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      _s = (t && t[1]) || '';
    }
  return (
    `
` +
    _s +
    e
  );
}
var Rs = !1;
function Ls(e, t) {
  if (!e || Rs) return '';
  Rs = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (d) {
          var r = d;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (d) {
          r = d;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == 'string') {
      for (
        var l = d.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          a = i.length - 1;
        1 <= o && 0 <= a && l[o] !== i[a];

      )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (l[o] !== i[a]) {
          if (o !== 1 || a !== 1)
            do
              if ((o--, a--, 0 > a || l[o] !== i[a])) {
                var u =
                  `
` + l[o].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    u.includes('<anonymous>') &&
                    (u = u.replace('<anonymous>', e.displayName)),
                  u
                );
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    (Rs = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : '') ? Gn(e) : '';
}
function Fm(e) {
  switch (e.tag) {
    case 5:
      return Gn(e.type);
    case 16:
      return Gn('Lazy');
    case 13:
      return Gn('Suspense');
    case 19:
      return Gn('SuspenseList');
    case 0:
    case 2:
    case 15:
      return (e = Ls(e.type, !1)), e;
    case 11:
      return (e = Ls(e.type.render, !1)), e;
    case 1:
      return (e = Ls(e.type, !0)), e;
    default:
      return '';
  }
}
function mi(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case on:
      return 'Fragment';
    case sn:
      return 'Portal';
    case ci:
      return 'Profiler';
    case wo:
      return 'StrictMode';
    case di:
      return 'Suspense';
    case fi:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case jc:
        return (e.displayName || 'Context') + '.Consumer';
      case wc:
        return (e._context.displayName || 'Context') + '.Provider';
      case jo:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case No:
        return (t = e.displayName || null), t !== null ? t : mi(e.type) || 'Memo';
      case pt:
        (t = e._payload), (e = e._init);
        try {
          return mi(e(t));
        } catch {}
    }
  return null;
}
function Im(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return mi(t);
    case 8:
      return t === wo ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function Tt(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function Sc(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
}
function $m(e) {
  var t = Sc(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          (r = '' + o), i.call(this, o);
        },
      }),
      Object.defineProperty(e, t, {
        enumerable: n.enumerable,
      }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = '' + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Ur(e) {
  e._valueTracker || (e._valueTracker = $m(e));
}
function kc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = Sc(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function kl(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function pi(e, t) {
  var n = t.checked;
  return Q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Ea(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Tt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
    });
}
function Ec(e, t) {
  (t = t.checked), t != null && yo(e, 'checked', t, !1);
}
function hi(e, t) {
  Ec(e, t);
  var n = Tt(t.value),
    r = t.type;
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  t.hasOwnProperty('value')
    ? xi(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && xi(e, t.type, Tt(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ba(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return;
    (t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n);
}
function xi(e, t, n) {
  (t !== 'number' || kl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var Jn = Array.isArray;
function vn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = '' + Tt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function gi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return Q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function Ca(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(k(92));
      if (Jn(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ''), (n = t);
  }
  e._wrapperState = {
    initialValue: Tt(n),
  };
}
function bc(e, t) {
  var n = Tt(t.value),
    r = Tt(t.defaultValue);
  n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r);
}
function Da(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function Cc(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function vi(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? Cc(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var Hr,
  Dc = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
    else {
      for (
        Hr = Hr || document.createElement('div'),
          Hr.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Hr.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function ar(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Xn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  zm = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Xn).forEach(function (e) {
  zm.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Xn[t] = Xn[e]);
  });
});
function Oc(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (Xn.hasOwnProperty(e) && Xn[e])
      ? ('' + t).trim()
      : t + 'px';
}
function Pc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        l = Oc(n, t[n], r);
      n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var Mm = Q(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function yi(e, t) {
  if (t) {
    if (Mm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (typeof t.dangerouslySetInnerHTML != 'object' || !('__html' in t.dangerouslySetInnerHTML))
        throw Error(k(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(k(62));
  }
}
function wi(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var ji = null;
function So(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Ni = null,
  yn = null,
  wn = null;
function Oa(e) {
  if ((e = Pr(e))) {
    if (typeof Ni != 'function') throw Error(k(280));
    var t = e.stateNode;
    t && ((t = ss(t)), Ni(e.stateNode, e.type, t));
  }
}
function Tc(e) {
  yn ? (wn ? wn.push(e) : (wn = [e])) : (yn = e);
}
function _c() {
  if (yn) {
    var e = yn,
      t = wn;
    if (((wn = yn = null), Oa(e), t)) for (e = 0; e < t.length; e++) Oa(t[e]);
  }
}
function Rc(e, t) {
  return e(t);
}
function Lc() {}
var As = !1;
function Ac(e, t, n) {
  if (As) return e(t, n);
  As = !0;
  try {
    return Rc(e, t, n);
  } finally {
    (As = !1), (yn !== null || wn !== null) && (Lc(), _c());
  }
}
function ur(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ss(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(k(231, t, typeof n));
  return n;
}
var Si = !1;
if (lt)
  try {
    var Mn = {};
    Object.defineProperty(Mn, 'passive', {
      get: function () {
        Si = !0;
      },
    }),
      window.addEventListener('test', Mn, Mn),
      window.removeEventListener('test', Mn, Mn);
  } catch {
    Si = !1;
  }
function Bm(e, t, n, r, l, i, o, a, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (c) {
    this.onError(c);
  }
}
var Zn = !1,
  El = null,
  bl = !1,
  ki = null,
  Um = {
    onError: function (e) {
      (Zn = !0), (El = e);
    },
  };
function Hm(e, t, n, r, l, i, o, a, u) {
  (Zn = !1), (El = null), Bm.apply(Um, arguments);
}
function Wm(e, t, n, r, l, i, o, a, u) {
  if ((Hm.apply(this, arguments), Zn)) {
    if (Zn) {
      var d = El;
      (Zn = !1), (El = null);
    } else throw Error(k(198));
    bl || ((bl = !0), (ki = d));
  }
}
function Zt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Fc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
      return t.dehydrated;
  }
  return null;
}
function Pa(e) {
  if (Zt(e) !== e) throw Error(k(188));
}
function Vm(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Zt(e)), t === null)) throw Error(k(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return Pa(l), e;
        if (i === r) return Pa(l), t;
        i = i.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return) (n = l), (r = i);
    else {
      for (var o = !1, a = l.child; a; ) {
        if (a === n) {
          (o = !0), (n = l), (r = i);
          break;
        }
        if (a === r) {
          (o = !0), (r = l), (n = i);
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            (o = !0), (n = i), (r = l);
            break;
          }
          if (a === r) {
            (o = !0), (r = i), (n = l);
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function Ic(e) {
  return (e = Vm(e)), e !== null ? $c(e) : null;
}
function $c(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = $c(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var zc = Ee.unstable_scheduleCallback,
  Ta = Ee.unstable_cancelCallback,
  Qm = Ee.unstable_shouldYield,
  Km = Ee.unstable_requestPaint,
  J = Ee.unstable_now,
  Gm = Ee.unstable_getCurrentPriorityLevel,
  ko = Ee.unstable_ImmediatePriority,
  Mc = Ee.unstable_UserBlockingPriority,
  Cl = Ee.unstable_NormalPriority,
  Jm = Ee.unstable_LowPriority,
  Bc = Ee.unstable_IdlePriority,
  ts = null,
  Ke = null;
function Ym(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == 'function')
    try {
      Ke.onCommitFiberRoot(ts, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Me = Math.clz32 ? Math.clz32 : Zm,
  qm = Math.log,
  Xm = Math.LN2;
function Zm(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((qm(e) / Xm) | 0)) | 0;
}
var Wr = 64,
  Vr = 4194304;
function Yn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Dl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? (r = Yn(a)) : ((i &= o), i !== 0 && (r = Yn(i)));
  } else (o = n & ~l), o !== 0 ? (r = Yn(o)) : i !== 0 && (r = Yn(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Me(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function ep(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function tp(e, t) {
  for (
    var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes;
    0 < i;

  ) {
    var o = 31 - Me(i),
      a = 1 << o,
      u = l[o];
    u === -1 ? (!(a & n) || a & r) && (l[o] = ep(a, t)) : u <= t && (e.expiredLanes |= a),
      (i &= ~a);
  }
}
function Ei(e) {
  return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Uc() {
  var e = Wr;
  return (Wr <<= 1), !(Wr & 4194240) && (Wr = 64), e;
}
function Fs(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Dr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Me(t)),
    (e[t] = n);
}
function np(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Me(n),
      i = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i);
  }
}
function Eo(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var $ = 0;
function Hc(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Wc,
  bo,
  Vc,
  Qc,
  Kc,
  bi = !1,
  Qr = [],
  Nt = null,
  St = null,
  kt = null,
  cr = new Map(),
  dr = new Map(),
  xt = [],
  rp =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function _a(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Nt = null;
      break;
    case 'dragenter':
    case 'dragleave':
      St = null;
      break;
    case 'mouseover':
    case 'mouseout':
      kt = null;
      break;
    case 'pointerover':
    case 'pointerout':
      cr.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      dr.delete(t.pointerId);
  }
}
function Bn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = Pr(t)), t !== null && bo(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function lp(e, t, n, r, l) {
  switch (t) {
    case 'focusin':
      return (Nt = Bn(Nt, e, t, n, r, l)), !0;
    case 'dragenter':
      return (St = Bn(St, e, t, n, r, l)), !0;
    case 'mouseover':
      return (kt = Bn(kt, e, t, n, r, l)), !0;
    case 'pointerover':
      var i = l.pointerId;
      return cr.set(i, Bn(cr.get(i) || null, e, t, n, r, l)), !0;
    case 'gotpointercapture':
      return (i = l.pointerId), dr.set(i, Bn(dr.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Gc(e) {
  var t = Ut(e.target);
  if (t !== null) {
    var n = Zt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Fc(n)), t !== null)) {
          (e.blockedOn = t),
            Kc(e.priority, function () {
              Vc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function al(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ci(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ji = r), n.target.dispatchEvent(r), (ji = null);
    } else return (t = Pr(n)), t !== null && bo(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Ra(e, t, n) {
  al(e) && n.delete(t);
}
function sp() {
  (bi = !1),
    Nt !== null && al(Nt) && (Nt = null),
    St !== null && al(St) && (St = null),
    kt !== null && al(kt) && (kt = null),
    cr.forEach(Ra),
    dr.forEach(Ra);
}
function Un(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    bi || ((bi = !0), Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, sp)));
}
function fr(e) {
  function t(l) {
    return Un(l, e);
  }
  if (0 < Qr.length) {
    Un(Qr[0], e);
    for (var n = 1; n < Qr.length; n++) {
      var r = Qr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Nt !== null && Un(Nt, e),
      St !== null && Un(St, e),
      kt !== null && Un(kt, e),
      cr.forEach(t),
      dr.forEach(t),
      n = 0;
    n < xt.length;
    n++
  )
    (r = xt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < xt.length && ((n = xt[0]), n.blockedOn === null); )
    Gc(n), n.blockedOn === null && xt.shift();
}
var jn = ct.ReactCurrentBatchConfig,
  Ol = !0;
function ip(e, t, n, r) {
  var l = $,
    i = jn.transition;
  jn.transition = null;
  try {
    ($ = 1), Co(e, t, n, r);
  } finally {
    ($ = l), (jn.transition = i);
  }
}
function op(e, t, n, r) {
  var l = $,
    i = jn.transition;
  jn.transition = null;
  try {
    ($ = 4), Co(e, t, n, r);
  } finally {
    ($ = l), (jn.transition = i);
  }
}
function Co(e, t, n, r) {
  if (Ol) {
    var l = Ci(e, t, n, r);
    if (l === null) Qs(e, t, r, Pl, n), _a(e, r);
    else if (lp(l, e, t, n, r)) r.stopPropagation();
    else if ((_a(e, r), t & 4 && -1 < rp.indexOf(e))) {
      for (; l !== null; ) {
        var i = Pr(l);
        if ((i !== null && Wc(i), (i = Ci(e, t, n, r)), i === null && Qs(e, t, r, Pl, n), i === l))
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Qs(e, t, r, null, n);
  }
}
var Pl = null;
function Ci(e, t, n, r) {
  if (((Pl = null), (e = So(r)), (e = Ut(e)), e !== null))
    if (((t = Zt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Fc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Pl = e), null;
}
function Jc(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (Gm()) {
        case ko:
          return 1;
        case Mc:
          return 4;
        case Cl:
        case Jm:
          return 16;
        case Bc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var yt = null,
  Do = null,
  ul = null;
function Yc() {
  if (ul) return ul;
  var e,
    t = Do,
    n = t.length,
    r,
    l = 'value' in yt ? yt.value : yt.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (ul = l.slice(e, 1 < r ? 1 - r : void 0));
}
function cl(e) {
  var t = e.keyCode;
  return (
    'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Kr() {
  return !0;
}
function La() {
  return !1;
}
function Ce(e) {
  function t(n, r, l, i, o) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null);
    for (var a in e) e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(i) : i[a]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Kr
        : La),
      (this.isPropagationStopped = La),
      this
    );
  }
  return (
    Q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = Kr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = Kr));
      },
      persist: function () {},
      isPersistent: Kr,
    }),
    t
  );
}
var Ln = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Oo = Ce(Ln),
  Or = Q({}, Ln, {
    view: 0,
    detail: 0,
  }),
  ap = Ce(Or),
  Is,
  $s,
  Hn,
  ns = Q({}, Or, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Po,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== Hn &&
            (Hn && e.type === 'mousemove'
              ? ((Is = e.screenX - Hn.screenX), ($s = e.screenY - Hn.screenY))
              : ($s = Is = 0),
            (Hn = e)),
          Is);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : $s;
    },
  }),
  Aa = Ce(ns),
  up = Q({}, ns, { dataTransfer: 0 }),
  cp = Ce(up),
  dp = Q({}, Or, { relatedTarget: 0 }),
  zs = Ce(dp),
  fp = Q({}, Ln, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0,
  }),
  mp = Ce(fp),
  pp = Q({}, Ln, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  hp = Ce(pp),
  xp = Q({}, Ln, { data: 0 }),
  Fa = Ce(xp),
  gp = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  vp = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  yp = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function wp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = yp[e]) ? !!t[e] : !1;
}
function Po() {
  return wp;
}
var jp = Q({}, Or, {
    key: function (e) {
      if (e.key) {
        var t = gp[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = cl(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? vp[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Po,
    charCode: function (e) {
      return e.type === 'keypress' ? cl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? cl(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
    },
  }),
  Np = Ce(jp),
  Sp = Q({}, ns, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ia = Ce(Sp),
  kp = Q({}, Or, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Po,
  }),
  Ep = Ce(kp),
  bp = Q({}, Ln, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0,
  }),
  Cp = Ce(bp),
  Dp = Q({}, ns, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Op = Ce(Dp),
  Pp = [9, 13, 27, 32],
  To = lt && 'CompositionEvent' in window,
  er = null;
lt && 'documentMode' in document && (er = document.documentMode);
var Tp = lt && 'TextEvent' in window && !er,
  qc = lt && (!To || (er && 8 < er && 11 >= er)),
  $a = ' ',
  za = !1;
function Xc(e, t) {
  switch (e) {
    case 'keyup':
      return Pp.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function Zc(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var an = !1;
function _p(e, t) {
  switch (e) {
    case 'compositionend':
      return Zc(t);
    case 'keypress':
      return t.which !== 32 ? null : ((za = !0), $a);
    case 'textInput':
      return (e = t.data), e === $a && za ? null : e;
    default:
      return null;
  }
}
function Rp(e, t) {
  if (an)
    return e === 'compositionend' || (!To && Xc(e, t))
      ? ((e = Yc()), (ul = Do = yt = null), (an = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return qc && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var Lp = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ma(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!Lp[e.type] : t === 'textarea';
}
function ed(e, t, n, r) {
  Tc(r),
    (t = Tl(t, 'onChange')),
    0 < t.length &&
      ((n = new Oo('onChange', 'change', null, n, r)),
      e.push({
        event: n,
        listeners: t,
      }));
}
var tr = null,
  mr = null;
function Ap(e) {
  dd(e, 0);
}
function rs(e) {
  var t = dn(e);
  if (kc(t)) return e;
}
function Fp(e, t) {
  if (e === 'change') return t;
}
var td = !1;
if (lt) {
  var Ms;
  if (lt) {
    var Bs = 'oninput' in document;
    if (!Bs) {
      var Ba = document.createElement('div');
      Ba.setAttribute('oninput', 'return;'), (Bs = typeof Ba.oninput == 'function');
    }
    Ms = Bs;
  } else Ms = !1;
  td = Ms && (!document.documentMode || 9 < document.documentMode);
}
function Ua() {
  tr && (tr.detachEvent('onpropertychange', nd), (mr = tr = null));
}
function nd(e) {
  if (e.propertyName === 'value' && rs(mr)) {
    var t = [];
    ed(t, mr, e, So(e)), Ac(Ap, t);
  }
}
function Ip(e, t, n) {
  e === 'focusin'
    ? (Ua(), (tr = t), (mr = n), tr.attachEvent('onpropertychange', nd))
    : e === 'focusout' && Ua();
}
function $p(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return rs(mr);
}
function zp(e, t) {
  if (e === 'click') return rs(t);
}
function Mp(e, t) {
  if (e === 'input' || e === 'change') return rs(t);
}
function Bp(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ue = typeof Object.is == 'function' ? Object.is : Bp;
function pr(e, t) {
  if (Ue(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ui.call(t, l) || !Ue(e[l], t[l])) return !1;
  }
  return !0;
}
function Ha(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Wa(e, t) {
  var n = Ha(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return {
          node: n,
          offset: t - e,
        };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ha(n);
  }
}
function rd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? rd(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function ld() {
  for (var e = window, t = kl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = kl(e.document);
  }
  return t;
}
function _o(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function Up(e) {
  var t = ld(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && rd(n.ownerDocument.documentElement, n)) {
    if (r !== null && _o(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        (r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Wa(n, i));
        var o = Wa(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({
          element: e,
          left: e.scrollLeft,
          top: e.scrollTop,
        });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
  }
}
var Hp = lt && 'documentMode' in document && 11 >= document.documentMode,
  un = null,
  Di = null,
  nr = null,
  Oi = !1;
function Va(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Oi ||
    un == null ||
    un !== kl(r) ||
    ((r = un),
    'selectionStart' in r && _o(r)
      ? (r = {
          start: r.selectionStart,
          end: r.selectionEnd,
        })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (nr && pr(nr, r)) ||
      ((nr = r),
      (r = Tl(Di, 'onSelect')),
      0 < r.length &&
        ((t = new Oo('onSelect', 'select', null, t, n)),
        e.push({
          event: t,
          listeners: r,
        }),
        (t.target = un))));
}
function Gr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var cn = {
    animationend: Gr('Animation', 'AnimationEnd'),
    animationiteration: Gr('Animation', 'AnimationIteration'),
    animationstart: Gr('Animation', 'AnimationStart'),
    transitionend: Gr('Transition', 'TransitionEnd'),
  },
  Us = {},
  sd = {};
lt &&
  ((sd = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete cn.animationend.animation,
    delete cn.animationiteration.animation,
    delete cn.animationstart.animation),
  'TransitionEvent' in window || delete cn.transitionend.transition);
function ls(e) {
  if (Us[e]) return Us[e];
  if (!cn[e]) return e;
  var t = cn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in sd) return (Us[e] = t[n]);
  return e;
}
var id = ls('animationend'),
  od = ls('animationiteration'),
  ad = ls('animationstart'),
  ud = ls('transitionend'),
  cd = new Map(),
  Qa =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function Lt(e, t) {
  cd.set(e, t), Xt(t, [e]);
}
for (var Hs = 0; Hs < Qa.length; Hs++) {
  var Ws = Qa[Hs],
    Wp = Ws.toLowerCase(),
    Vp = Ws[0].toUpperCase() + Ws.slice(1);
  Lt(Wp, 'on' + Vp);
}
Lt(id, 'onAnimationEnd');
Lt(od, 'onAnimationIteration');
Lt(ad, 'onAnimationStart');
Lt('dblclick', 'onDoubleClick');
Lt('focusin', 'onFocus');
Lt('focusout', 'onBlur');
Lt(ud, 'onTransitionEnd');
kn('onMouseEnter', ['mouseout', 'mouseover']);
kn('onMouseLeave', ['mouseout', 'mouseover']);
kn('onPointerEnter', ['pointerout', 'pointerover']);
kn('onPointerLeave', ['pointerout', 'pointerover']);
Xt('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '));
Xt(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' ')
);
Xt('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Xt('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '));
Xt('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '));
Xt('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '));
var qn =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  Qp = new Set('cancel close invalid load scroll toggle'.split(' ').concat(qn));
function Ka(e, t, n) {
  var r = e.type || 'unknown-event';
  (e.currentTarget = n), Wm(r, t, void 0, e), (e.currentTarget = null);
}
function dd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            u = a.instance,
            d = a.currentTarget;
          if (((a = a.listener), u !== i && l.isPropagationStopped())) break e;
          Ka(l, a, d), (i = u);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((a = r[o]),
            (u = a.instance),
            (d = a.currentTarget),
            (a = a.listener),
            u !== i && l.isPropagationStopped())
          )
            break e;
          Ka(l, a, d), (i = u);
        }
    }
  }
  if (bl) throw ((e = ki), (bl = !1), (ki = null), e);
}
function M(e, t) {
  var n = t[Li];
  n === void 0 && (n = t[Li] = new Set());
  var r = e + '__bubble';
  n.has(r) || (fd(t, e, 2, !1), n.add(r));
}
function Vs(e, t, n) {
  var r = 0;
  t && (r |= 4), fd(n, e, r, t);
}
var Jr = '_reactListening' + Math.random().toString(36).slice(2);
function hr(e) {
  if (!e[Jr]) {
    (e[Jr] = !0),
      yc.forEach(function (n) {
        n !== 'selectionchange' && (Qp.has(n) || Vs(n, !1, e), Vs(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Jr] || ((t[Jr] = !0), Vs('selectionchange', !1, t));
  }
}
function fd(e, t, n, r) {
  switch (Jc(t)) {
    case 1:
      var l = ip;
      break;
    case 4:
      l = op;
      break;
    default:
      l = Co;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !Si || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, {
            capture: !0,
            passive: l,
          })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, {
            passive: l,
          })
        : e.addEventListener(t, n, !1);
}
function Qs(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var a = r.stateNode.containerInfo;
        if (a === l || (a.nodeType === 8 && a.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var u = o.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = o.stateNode.containerInfo), u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            o = o.return;
          }
        for (; a !== null; ) {
          if (((o = Ut(a)), o === null)) return;
          if (((u = o.tag), u === 5 || u === 6)) {
            r = i = o;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  Ac(function () {
    var d = i,
      c = So(n),
      f = [];
    e: {
      var h = cd.get(e);
      if (h !== void 0) {
        var y = Oo,
          v = e;
        switch (e) {
          case 'keypress':
            if (cl(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            y = Np;
            break;
          case 'focusin':
            (v = 'focus'), (y = zs);
            break;
          case 'focusout':
            (v = 'blur'), (y = zs);
            break;
          case 'beforeblur':
          case 'afterblur':
            y = zs;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            y = Aa;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            y = cp;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            y = Ep;
            break;
          case id:
          case od:
          case ad:
            y = mp;
            break;
          case ud:
            y = Cp;
            break;
          case 'scroll':
            y = ap;
            break;
          case 'wheel':
            y = Op;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            y = hp;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            y = Ia;
        }
        var x = (t & 4) !== 0,
          j = !x && e === 'scroll',
          p = x ? (h !== null ? h + 'Capture' : null) : h;
        x = [];
        for (var m = d, g; m !== null; ) {
          g = m;
          var N = g.stateNode;
          if (
            (g.tag === 5 &&
              N !== null &&
              ((g = N), p !== null && ((N = ur(m, p)), N != null && x.push(xr(m, N, g)))),
            j)
          )
            break;
          m = m.return;
        }
        0 < x.length &&
          ((h = new y(h, v, null, n, c)),
          f.push({
            event: h,
            listeners: x,
          }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === 'mouseover' || e === 'pointerover'),
          (y = e === 'mouseout' || e === 'pointerout'),
          h && n !== ji && (v = n.relatedTarget || n.fromElement) && (Ut(v) || v[st]))
        )
          break e;
        if (
          (y || h) &&
          ((h =
            c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window),
          y
            ? ((v = n.relatedTarget || n.toElement),
              (y = d),
              (v = v ? Ut(v) : null),
              v !== null && ((j = Zt(v)), v !== j || (v.tag !== 5 && v.tag !== 6)) && (v = null))
            : ((y = null), (v = d)),
          y !== v)
        ) {
          if (
            ((x = Aa),
            (N = 'onMouseLeave'),
            (p = 'onMouseEnter'),
            (m = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((x = Ia), (N = 'onPointerLeave'), (p = 'onPointerEnter'), (m = 'pointer')),
            (j = y == null ? h : dn(y)),
            (g = v == null ? h : dn(v)),
            (h = new x(N, m + 'leave', y, n, c)),
            (h.target = j),
            (h.relatedTarget = g),
            (N = null),
            Ut(c) === d &&
              ((x = new x(p, m + 'enter', v, n, c)),
              (x.target = g),
              (x.relatedTarget = j),
              (N = x)),
            (j = N),
            y && v)
          )
            t: {
              for (x = y, p = v, m = 0, g = x; g; g = ln(g)) m++;
              for (g = 0, N = p; N; N = ln(N)) g++;
              for (; 0 < m - g; ) (x = ln(x)), m--;
              for (; 0 < g - m; ) (p = ln(p)), g--;
              for (; m--; ) {
                if (x === p || (p !== null && x === p.alternate)) break t;
                (x = ln(x)), (p = ln(p));
              }
              x = null;
            }
          else x = null;
          y !== null && Ga(f, h, y, x, !1), v !== null && j !== null && Ga(f, j, v, x, !0);
        }
      }
      e: {
        if (
          ((h = d ? dn(d) : window),
          (y = h.nodeName && h.nodeName.toLowerCase()),
          y === 'select' || (y === 'input' && h.type === 'file'))
        )
          var E = Fp;
        else if (Ma(h))
          if (td) E = Mp;
          else {
            E = $p;
            var D = Ip;
          }
        else
          (y = h.nodeName) &&
            y.toLowerCase() === 'input' &&
            (h.type === 'checkbox' || h.type === 'radio') &&
            (E = zp);
        if (E && (E = E(e, d))) {
          ed(f, E, n, c);
          break e;
        }
        D && D(e, h, d),
          e === 'focusout' &&
            (D = h._wrapperState) &&
            D.controlled &&
            h.type === 'number' &&
            xi(h, 'number', h.value);
      }
      switch (((D = d ? dn(d) : window), e)) {
        case 'focusin':
          (Ma(D) || D.contentEditable === 'true') && ((un = D), (Di = d), (nr = null));
          break;
        case 'focusout':
          nr = Di = un = null;
          break;
        case 'mousedown':
          Oi = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (Oi = !1), Va(f, n, c);
          break;
        case 'selectionchange':
          if (Hp) break;
        case 'keydown':
        case 'keyup':
          Va(f, n, c);
      }
      var O;
      if (To)
        e: {
          switch (e) {
            case 'compositionstart':
              var T = 'onCompositionStart';
              break e;
            case 'compositionend':
              T = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              T = 'onCompositionUpdate';
              break e;
          }
          T = void 0;
        }
      else
        an
          ? Xc(e, n) && (T = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (T = 'onCompositionStart');
      T &&
        (qc &&
          n.locale !== 'ko' &&
          (an || T !== 'onCompositionStart'
            ? T === 'onCompositionEnd' && an && (O = Yc())
            : ((yt = c), (Do = 'value' in yt ? yt.value : yt.textContent), (an = !0))),
        (D = Tl(d, T)),
        0 < D.length &&
          ((T = new Fa(T, e, null, n, c)),
          f.push({
            event: T,
            listeners: D,
          }),
          O ? (T.data = O) : ((O = Zc(n)), O !== null && (T.data = O)))),
        (O = Tp ? _p(e, n) : Rp(e, n)) &&
          ((d = Tl(d, 'onBeforeInput')),
          0 < d.length &&
            ((c = new Fa('onBeforeInput', 'beforeinput', null, n, c)),
            f.push({
              event: c,
              listeners: d,
            }),
            (c.data = O)));
    }
    dd(f, t);
  });
}
function xr(e, t, n) {
  return {
    instance: e,
    listener: t,
    currentTarget: n,
  };
}
function Tl(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = ur(e, n)),
      i != null && r.unshift(xr(e, i, l)),
      (i = ur(e, t)),
      i != null && r.push(xr(e, i, l))),
      (e = e.return);
  }
  return r;
}
function ln(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ga(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      d = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 &&
      d !== null &&
      ((a = d),
      l
        ? ((u = ur(n, i)), u != null && o.unshift(xr(n, u, a)))
        : l || ((u = ur(n, i)), u != null && o.push(xr(n, u, a)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Kp = /\r\n?/g,
  Gp = /\u0000|\uFFFD/g;
function Ja(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      Kp,
      `
`
    )
    .replace(Gp, '');
}
function Yr(e, t, n) {
  if (((t = Ja(t)), Ja(e) !== t && n)) throw Error(k(425));
}
function _l() {}
var Pi = null,
  Ti = null;
function _i(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ri = typeof setTimeout == 'function' ? setTimeout : void 0,
  Jp = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  Ya = typeof Promise == 'function' ? Promise : void 0,
  Yp =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof Ya < 'u'
        ? function (e) {
            return Ya.resolve(null).then(e).catch(qp);
          }
        : Ri;
function qp(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ks(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === '/$')) {
        if (r === 0) {
          e.removeChild(l), fr(t);
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = l;
  } while (n);
  fr(t);
}
function Et(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function qa(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var An = Math.random().toString(36).slice(2),
  Ve = '__reactFiber$' + An,
  gr = '__reactProps$' + An,
  st = '__reactContainer$' + An,
  Li = '__reactEvents$' + An,
  Xp = '__reactListeners$' + An,
  Zp = '__reactHandles$' + An;
function Ut(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[st] || n[Ve])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = qa(e); e !== null; ) {
          if ((n = e[Ve])) return n;
          e = qa(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Pr(e) {
  return (
    (e = e[Ve] || e[st]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function dn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function ss(e) {
  return e[gr] || null;
}
var Ai = [],
  fn = -1;
function At(e) {
  return { current: e };
}
function B(e) {
  0 > fn || ((e.current = Ai[fn]), (Ai[fn] = null), fn--);
}
function z(e, t) {
  fn++, (Ai[fn] = e.current), (e.current = t);
}
var _t = {},
  ce = At(_t),
  ge = At(!1),
  Kt = _t;
function En(e, t) {
  var n = e.type.contextTypes;
  if (!n) return _t;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ve(e) {
  return (e = e.childContextTypes), e != null;
}
function Rl() {
  B(ge), B(ce);
}
function Xa(e, t, n) {
  if (ce.current !== _t) throw Error(k(168));
  z(ce, t), z(ge, n);
}
function md(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(k(108, Im(e) || 'Unknown', l));
  return Q({}, n, r);
}
function Ll(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || _t),
    (Kt = ce.current),
    z(ce, e),
    z(ge, ge.current),
    !0
  );
}
function Za(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n
    ? ((e = md(e, t, Kt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      B(ge),
      B(ce),
      z(ce, e))
    : B(ge),
    z(ge, n);
}
var Ze = null,
  is = !1,
  Gs = !1;
function pd(e) {
  Ze === null ? (Ze = [e]) : Ze.push(e);
}
function eh(e) {
  (is = !0), pd(e);
}
function Ft() {
  if (!Gs && Ze !== null) {
    Gs = !0;
    var e = 0,
      t = $;
    try {
      var n = Ze;
      for ($ = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ze = null), (is = !1);
    } catch (l) {
      throw (Ze !== null && (Ze = Ze.slice(e + 1)), zc(ko, Ft), l);
    } finally {
      ($ = t), (Gs = !1);
    }
  }
  return null;
}
var mn = [],
  pn = 0,
  Al = null,
  Fl = 0,
  De = [],
  Oe = 0,
  Gt = null,
  et = 1,
  tt = '';
function Mt(e, t) {
  (mn[pn++] = Fl), (mn[pn++] = Al), (Al = e), (Fl = t);
}
function hd(e, t, n) {
  (De[Oe++] = et), (De[Oe++] = tt), (De[Oe++] = Gt), (Gt = e);
  var r = et;
  e = tt;
  var l = 32 - Me(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var i = 32 - Me(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    (i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (et = (1 << (32 - Me(t) + l)) | (n << l) | r),
      (tt = i + e);
  } else (et = (1 << i) | (n << l) | r), (tt = e);
}
function Ro(e) {
  e.return !== null && (Mt(e, 1), hd(e, 1, 0));
}
function Lo(e) {
  for (; e === Al; ) (Al = mn[--pn]), (mn[pn] = null), (Fl = mn[--pn]), (mn[pn] = null);
  for (; e === Gt; )
    (Gt = De[--Oe]),
      (De[Oe] = null),
      (tt = De[--Oe]),
      (De[Oe] = null),
      (et = De[--Oe]),
      (De[Oe] = null);
}
var ke = null,
  Ne = null,
  U = !1,
  $e = null;
function xd(e, t) {
  var n = Pe(5, null, null, 0);
  (n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function eu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (ke = e), (Ne = Et(t.firstChild)), !0) : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ke = e), (Ne = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n =
              Gt !== null
                ? {
                    id: et,
                    overflow: tt,
                  }
                : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Pe(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ke = e),
            (Ne = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Fi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ii(e) {
  if (U) {
    var t = Ne;
    if (t) {
      var n = t;
      if (!eu(e, t)) {
        if (Fi(e)) throw Error(k(418));
        t = Et(n.nextSibling);
        var r = ke;
        t && eu(e, t) ? xd(r, n) : ((e.flags = (e.flags & -4097) | 2), (U = !1), (ke = e));
      }
    } else {
      if (Fi(e)) throw Error(k(418));
      (e.flags = (e.flags & -4097) | 2), (U = !1), (ke = e);
    }
  }
}
function tu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function qr(e) {
  if (e !== ke) return !1;
  if (!U) return tu(e), (U = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== 'head' && t !== 'body' && !_i(e.type, e.memoizedProps))),
    t && (t = Ne))
  ) {
    if (Fi(e)) throw (gd(), Error(k(418)));
    for (; t; ) xd(e, t), (t = Et(t.nextSibling));
  }
  if ((tu(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              Ne = Et(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      Ne = null;
    }
  } else Ne = ke ? Et(e.stateNode.nextSibling) : null;
  return !0;
}
function gd() {
  for (var e = Ne; e; ) e = Et(e.nextSibling);
}
function bn() {
  (Ne = ke = null), (U = !1);
}
function Ao(e) {
  $e === null ? ($e = [e]) : $e.push(e);
}
var th = ct.ReactCurrentBatchConfig;
function Fe(e, t) {
  if (e && e.defaultProps) {
    (t = Q({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Il = At(null),
  $l = null,
  hn = null,
  Fo = null;
function Io() {
  Fo = hn = $l = null;
}
function $o(e) {
  var t = Il.current;
  B(Il), (e._currentValue = t);
}
function $i(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Nn(e, t) {
  ($l = e),
    (Fo = hn = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (xe = !0), (e.firstContext = null));
}
function Re(e) {
  var t = e._currentValue;
  if (Fo !== e)
    if (
      ((e = {
        context: e,
        memoizedValue: t,
        next: null,
      }),
      hn === null)
    ) {
      if ($l === null) throw Error(k(308));
      (hn = e),
        ($l.dependencies = {
          lanes: 0,
          firstContext: e,
        });
    } else hn = hn.next = e;
  return t;
}
var Ht = null;
function zo(e) {
  Ht === null ? (Ht = [e]) : Ht.push(e);
}
function vd(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), zo(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    it(e, r)
  );
}
function it(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var ht = !1;
function Mo(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: 0,
    },
    effects: null,
  };
}
function yd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function nt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function bt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), I & 2)) {
    var l = r.pending;
    return l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (r.pending = t), it(e, n);
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), zo(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    it(e, n)
  );
}
function dl(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Eo(e, n);
  }
}
function nu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (l = i = o) : (i = i.next = o), (n = n.next);
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function zl(e, t, n, r) {
  var l = e.updateQueue;
  ht = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a,
      d = u.next;
    (u.next = null), o === null ? (i = d) : (o.next = d), (o = u);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== o && (a === null ? (c.firstBaseUpdate = d) : (a.next = d), (c.lastBaseUpdate = u)));
  }
  if (i !== null) {
    var f = l.baseState;
    (o = 0), (c = d = u = null), (a = i);
    do {
      var h = a.lane,
        y = a.eventTime;
      if ((r & h) === h) {
        c !== null &&
          (c = c.next =
            {
              eventTime: y,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var v = e,
            x = a;
          switch (((h = t), (y = n), x.tag)) {
            case 1:
              if (((v = x.payload), typeof v == 'function')) {
                f = v.call(y, f, h);
                break e;
              }
              f = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (((v = x.payload), (h = typeof v == 'function' ? v.call(y, f, h) : v), h == null))
                break e;
              f = Q({}, f, h);
              break e;
            case 2:
              ht = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64), (h = l.effects), h === null ? (l.effects = [a]) : h.push(a));
      } else
        (y = {
          eventTime: y,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((d = c = y), (u = f)) : (c = c.next = y),
          (o |= h);
      if (((a = a.next), a === null)) {
        if (((a = l.shared.pending), a === null)) break;
        (h = a), (a = h.next), (h.next = null), (l.lastBaseUpdate = h), (l.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (u = f),
      (l.baseState = u),
      (l.firstBaseUpdate = d),
      (l.lastBaseUpdate = c),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (o |= l.lane), (l = l.next);
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    (Yt |= o), (e.lanes = o), (e.memoizedState = f);
  }
}
function ru(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != 'function')) throw Error(k(191, l));
        l.call(r);
      }
    }
}
var wd = new vc.Component().refs;
function zi(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var os = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Zt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = fe(),
      l = Dt(e),
      i = nt(r, l);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = bt(e, i, l)),
      t !== null && (Be(t, e, l, r), dl(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = fe(),
      l = Dt(e),
      i = nt(r, l);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = bt(e, i, l)),
      t !== null && (Be(t, e, l, r), dl(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = fe(),
      r = Dt(e),
      l = nt(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = bt(e, l, r)),
      t !== null && (Be(t, e, r, n), dl(t, e, r));
  },
};
function lu(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !pr(n, r) || !pr(l, i)
        : !0
  );
}
function jd(e, t, n) {
  var r = !1,
    l = _t,
    i = t.contextType;
  return (
    typeof i == 'object' && i !== null
      ? (i = Re(i))
      : ((l = ve(t) ? Kt : ce.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? En(e, l) : _t)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = os),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function su(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && os.enqueueReplaceState(t, t.state, null);
}
function Mi(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = wd), Mo(e);
  var i = t.contextType;
  typeof i == 'object' && i !== null
    ? (l.context = Re(i))
    : ((i = ve(t) ? Kt : ce.current), (l.context = En(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == 'function' && (zi(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof l.getSnapshotBeforeUpdate == 'function' ||
      (typeof l.UNSAFE_componentWillMount != 'function' &&
        typeof l.componentWillMount != 'function') ||
      ((t = l.state),
      typeof l.componentWillMount == 'function' && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == 'function' && l.UNSAFE_componentWillMount(),
      t !== l.state && os.enqueueReplaceState(l, l.state, null),
      zl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == 'function' && (e.flags |= 4194308);
}
function Wn(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var l = r,
        i = '' + e;
      return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === i
        ? t.ref
        : ((t = function (o) {
            var a = l.refs;
            a === wd && (a = l.refs = {}), o === null ? delete a[i] : (a[i] = o);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != 'string') throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function Xr(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      k(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e)
    ))
  );
}
function iu(e) {
  var t = e._init;
  return t(e._payload);
}
function Nd(e) {
  function t(p, m) {
    if (e) {
      var g = p.deletions;
      g === null ? ((p.deletions = [m]), (p.flags |= 16)) : g.push(m);
    }
  }
  function n(p, m) {
    if (!e) return null;
    for (; m !== null; ) t(p, m), (m = m.sibling);
    return null;
  }
  function r(p, m) {
    for (p = new Map(); m !== null; )
      m.key !== null ? p.set(m.key, m) : p.set(m.index, m), (m = m.sibling);
    return p;
  }
  function l(p, m) {
    return (p = Ot(p, m)), (p.index = 0), (p.sibling = null), p;
  }
  function i(p, m, g) {
    return (
      (p.index = g),
      e
        ? ((g = p.alternate),
          g !== null ? ((g = g.index), g < m ? ((p.flags |= 2), m) : g) : ((p.flags |= 2), m))
        : ((p.flags |= 1048576), m)
    );
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, m, g, N) {
    return m === null || m.tag !== 6
      ? ((m = ti(g, p.mode, N)), (m.return = p), m)
      : ((m = l(m, g)), (m.return = p), m);
  }
  function u(p, m, g, N) {
    var E = g.type;
    return E === on
      ? c(p, m, g.props.children, N, g.key)
      : m !== null &&
          (m.elementType === E ||
            (typeof E == 'object' && E !== null && E.$$typeof === pt && iu(E) === m.type))
        ? ((N = l(m, g.props)), (N.ref = Wn(p, m, g)), (N.return = p), N)
        : ((N = gl(g.type, g.key, g.props, null, p.mode, N)),
          (N.ref = Wn(p, m, g)),
          (N.return = p),
          N);
  }
  function d(p, m, g, N) {
    return m === null ||
      m.tag !== 4 ||
      m.stateNode.containerInfo !== g.containerInfo ||
      m.stateNode.implementation !== g.implementation
      ? ((m = ni(g, p.mode, N)), (m.return = p), m)
      : ((m = l(m, g.children || [])), (m.return = p), m);
  }
  function c(p, m, g, N, E) {
    return m === null || m.tag !== 7
      ? ((m = Qt(g, p.mode, N, E)), (m.return = p), m)
      : ((m = l(m, g)), (m.return = p), m);
  }
  function f(p, m, g) {
    if ((typeof m == 'string' && m !== '') || typeof m == 'number')
      return (m = ti('' + m, p.mode, g)), (m.return = p), m;
    if (typeof m == 'object' && m !== null) {
      switch (m.$$typeof) {
        case Br:
          return (
            (g = gl(m.type, m.key, m.props, null, p.mode, g)),
            (g.ref = Wn(p, null, m)),
            (g.return = p),
            g
          );
        case sn:
          return (m = ni(m, p.mode, g)), (m.return = p), m;
        case pt:
          var N = m._init;
          return f(p, N(m._payload), g);
      }
      if (Jn(m) || zn(m)) return (m = Qt(m, p.mode, g, null)), (m.return = p), m;
      Xr(p, m);
    }
    return null;
  }
  function h(p, m, g, N) {
    var E = m !== null ? m.key : null;
    if ((typeof g == 'string' && g !== '') || typeof g == 'number')
      return E !== null ? null : a(p, m, '' + g, N);
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case Br:
          return g.key === E ? u(p, m, g, N) : null;
        case sn:
          return g.key === E ? d(p, m, g, N) : null;
        case pt:
          return (E = g._init), h(p, m, E(g._payload), N);
      }
      if (Jn(g) || zn(g)) return E !== null ? null : c(p, m, g, N, null);
      Xr(p, g);
    }
    return null;
  }
  function y(p, m, g, N, E) {
    if ((typeof N == 'string' && N !== '') || typeof N == 'number')
      return (p = p.get(g) || null), a(m, p, '' + N, E);
    if (typeof N == 'object' && N !== null) {
      switch (N.$$typeof) {
        case Br:
          return (p = p.get(N.key === null ? g : N.key) || null), u(m, p, N, E);
        case sn:
          return (p = p.get(N.key === null ? g : N.key) || null), d(m, p, N, E);
        case pt:
          var D = N._init;
          return y(p, m, g, D(N._payload), E);
      }
      if (Jn(N) || zn(N)) return (p = p.get(g) || null), c(m, p, N, E, null);
      Xr(m, N);
    }
    return null;
  }
  function v(p, m, g, N) {
    for (var E = null, D = null, O = m, T = (m = 0), H = null; O !== null && T < g.length; T++) {
      O.index > T ? ((H = O), (O = null)) : (H = O.sibling);
      var P = h(p, O, g[T], N);
      if (P === null) {
        O === null && (O = H);
        break;
      }
      e && O && P.alternate === null && t(p, O),
        (m = i(P, m, T)),
        D === null ? (E = P) : (D.sibling = P),
        (D = P),
        (O = H);
    }
    if (T === g.length) return n(p, O), U && Mt(p, T), E;
    if (O === null) {
      for (; T < g.length; T++)
        (O = f(p, g[T], N)),
          O !== null && ((m = i(O, m, T)), D === null ? (E = O) : (D.sibling = O), (D = O));
      return U && Mt(p, T), E;
    }
    for (O = r(p, O); T < g.length; T++)
      (H = y(O, p, T, g[T], N)),
        H !== null &&
          (e && H.alternate !== null && O.delete(H.key === null ? T : H.key),
          (m = i(H, m, T)),
          D === null ? (E = H) : (D.sibling = H),
          (D = H));
    return (
      e &&
        O.forEach(function (we) {
          return t(p, we);
        }),
      U && Mt(p, T),
      E
    );
  }
  function x(p, m, g, N) {
    var E = zn(g);
    if (typeof E != 'function') throw Error(k(150));
    if (((g = E.call(g)), g == null)) throw Error(k(151));
    for (
      var D = (E = null), O = m, T = (m = 0), H = null, P = g.next();
      O !== null && !P.done;
      T++, P = g.next()
    ) {
      O.index > T ? ((H = O), (O = null)) : (H = O.sibling);
      var we = h(p, O, P.value, N);
      if (we === null) {
        O === null && (O = H);
        break;
      }
      e && O && we.alternate === null && t(p, O),
        (m = i(we, m, T)),
        D === null ? (E = we) : (D.sibling = we),
        (D = we),
        (O = H);
    }
    if (P.done) return n(p, O), U && Mt(p, T), E;
    if (O === null) {
      for (; !P.done; T++, P = g.next())
        (P = f(p, P.value, N)),
          P !== null && ((m = i(P, m, T)), D === null ? (E = P) : (D.sibling = P), (D = P));
      return U && Mt(p, T), E;
    }
    for (O = r(p, O); !P.done; T++, P = g.next())
      (P = y(O, p, T, P.value, N)),
        P !== null &&
          (e && P.alternate !== null && O.delete(P.key === null ? T : P.key),
          (m = i(P, m, T)),
          D === null ? (E = P) : (D.sibling = P),
          (D = P));
    return (
      e &&
        O.forEach(function (Ye) {
          return t(p, Ye);
        }),
      U && Mt(p, T),
      E
    );
  }
  function j(p, m, g, N) {
    if (
      (typeof g == 'object' &&
        g !== null &&
        g.type === on &&
        g.key === null &&
        (g = g.props.children),
      typeof g == 'object' && g !== null)
    ) {
      switch (g.$$typeof) {
        case Br:
          e: {
            for (var E = g.key, D = m; D !== null; ) {
              if (D.key === E) {
                if (((E = g.type), E === on)) {
                  if (D.tag === 7) {
                    n(p, D.sibling), (m = l(D, g.props.children)), (m.return = p), (p = m);
                    break e;
                  }
                } else if (
                  D.elementType === E ||
                  (typeof E == 'object' && E !== null && E.$$typeof === pt && iu(E) === D.type)
                ) {
                  n(p, D.sibling),
                    (m = l(D, g.props)),
                    (m.ref = Wn(p, D, g)),
                    (m.return = p),
                    (p = m);
                  break e;
                }
                n(p, D);
                break;
              } else t(p, D);
              D = D.sibling;
            }
            g.type === on
              ? ((m = Qt(g.props.children, p.mode, N, g.key)), (m.return = p), (p = m))
              : ((N = gl(g.type, g.key, g.props, null, p.mode, N)),
                (N.ref = Wn(p, m, g)),
                (N.return = p),
                (p = N));
          }
          return o(p);
        case sn:
          e: {
            for (D = g.key; m !== null; ) {
              if (m.key === D)
                if (
                  m.tag === 4 &&
                  m.stateNode.containerInfo === g.containerInfo &&
                  m.stateNode.implementation === g.implementation
                ) {
                  n(p, m.sibling), (m = l(m, g.children || [])), (m.return = p), (p = m);
                  break e;
                } else {
                  n(p, m);
                  break;
                }
              else t(p, m);
              m = m.sibling;
            }
            (m = ni(g, p.mode, N)), (m.return = p), (p = m);
          }
          return o(p);
        case pt:
          return (D = g._init), j(p, m, D(g._payload), N);
      }
      if (Jn(g)) return v(p, m, g, N);
      if (zn(g)) return x(p, m, g, N);
      Xr(p, g);
    }
    return (typeof g == 'string' && g !== '') || typeof g == 'number'
      ? ((g = '' + g),
        m !== null && m.tag === 6
          ? (n(p, m.sibling), (m = l(m, g)), (m.return = p), (p = m))
          : (n(p, m), (m = ti(g, p.mode, N)), (m.return = p), (p = m)),
        o(p))
      : n(p, m);
  }
  return j;
}
var Cn = Nd(!0),
  Sd = Nd(!1),
  Tr = {},
  Ge = At(Tr),
  vr = At(Tr),
  yr = At(Tr);
function Wt(e) {
  if (e === Tr) throw Error(k(174));
  return e;
}
function Bo(e, t) {
  switch ((z(yr, t), z(vr, e), z(Ge, Tr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : vi(null, '');
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = vi(t, e));
  }
  B(Ge), z(Ge, t);
}
function Dn() {
  B(Ge), B(vr), B(yr);
}
function kd(e) {
  Wt(yr.current);
  var t = Wt(Ge.current),
    n = vi(t, e.type);
  t !== n && (z(vr, e), z(Ge, n));
}
function Uo(e) {
  vr.current === e && (B(Ge), B(vr));
}
var W = At(0);
function Ml(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!'))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Js = [];
function Ho() {
  for (var e = 0; e < Js.length; e++) Js[e]._workInProgressVersionPrimary = null;
  Js.length = 0;
}
var fl = ct.ReactCurrentDispatcher,
  Ys = ct.ReactCurrentBatchConfig,
  Jt = 0,
  V = null,
  X = null,
  te = null,
  Bl = !1,
  rr = !1,
  wr = 0,
  nh = 0;
function ie() {
  throw Error(k(321));
}
function Wo(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ue(e[n], t[n])) return !1;
  return !0;
}
function Vo(e, t, n, r, l, i) {
  if (
    ((Jt = i),
    (V = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (fl.current = e === null || e.memoizedState === null ? ih : oh),
    (e = n(r, l)),
    rr)
  ) {
    i = 0;
    do {
      if (((rr = !1), (wr = 0), 25 <= i)) throw Error(k(301));
      (i += 1), (te = X = null), (t.updateQueue = null), (fl.current = ah), (e = n(r, l));
    } while (rr);
  }
  if (
    ((fl.current = Ul),
    (t = X !== null && X.next !== null),
    (Jt = 0),
    (te = X = V = null),
    (Bl = !1),
    t)
  )
    throw Error(k(300));
  return e;
}
function Qo() {
  var e = wr !== 0;
  return (wr = 0), e;
}
function We() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return te === null ? (V.memoizedState = te = e) : (te = te.next = e), te;
}
function Le() {
  if (X === null) {
    var e = V.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = X.next;
  var t = te === null ? V.memoizedState : te.next;
  if (t !== null) (te = t), (X = e);
  else {
    if (e === null) throw Error(k(310));
    (X = e),
      (e = {
        memoizedState: X.memoizedState,
        baseState: X.baseState,
        baseQueue: X.baseQueue,
        queue: X.queue,
        next: null,
      }),
      te === null ? (V.memoizedState = te = e) : (te = te.next = e);
  }
  return te;
}
function jr(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function qs(e) {
  var t = Le(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = X,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      (l.next = i.next), (i.next = o);
    }
    (r.baseQueue = l = i), (n.pending = null);
  }
  if (l !== null) {
    (i = l.next), (r = r.baseState);
    var a = (o = null),
      u = null,
      d = i;
    do {
      var c = d.lane;
      if ((Jt & c) === c)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (r = d.hasEagerState ? d.eagerState : e(r, d.action));
      else {
        var f = {
          lane: c,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        u === null ? ((a = u = f), (o = r)) : (u = u.next = f), (V.lanes |= c), (Yt |= c);
      }
      d = d.next;
    } while (d !== null && d !== i);
    u === null ? (o = r) : (u.next = a),
      Ue(r, t.memoizedState) || (xe = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (i = l.lane), (V.lanes |= i), (Yt |= i), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Xs(e) {
  var t = Le(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do (i = e(i, o.action)), (o = o.next);
    while (o !== l);
    Ue(i, t.memoizedState) || (xe = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function Ed() {}
function bd(e, t) {
  var n = V,
    r = Le(),
    l = t(),
    i = !Ue(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (xe = !0)),
    (r = r.queue),
    Ko(Od.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (te !== null && te.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), Nr(9, Dd.bind(null, n, r, l, t), void 0, null), ne === null))
      throw Error(k(349));
    Jt & 30 || Cd(n, t, l);
  }
  return l;
}
function Cd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = V.updateQueue),
    t === null
      ? ((t = {
          lastEffect: null,
          stores: null,
        }),
        (V.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Dd(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Pd(t) && Td(e);
}
function Od(e, t, n) {
  return n(function () {
    Pd(t) && Td(e);
  });
}
function Pd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ue(e, n);
  } catch {
    return !0;
  }
}
function Td(e) {
  var t = it(e, 1);
  t !== null && Be(t, e, 1, -1);
}
function ou(e) {
  var t = We();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = sh.bind(null, V, e)),
    [t.memoizedState, e]
  );
}
function Nr(e, t, n, r) {
  return (
    (e = {
      tag: e,
      create: t,
      destroy: n,
      deps: r,
      next: null,
    }),
    (t = V.updateQueue),
    t === null
      ? ((t = {
          lastEffect: null,
          stores: null,
        }),
        (V.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function _d() {
  return Le().memoizedState;
}
function ml(e, t, n, r) {
  var l = We();
  (V.flags |= e), (l.memoizedState = Nr(1 | t, n, void 0, r === void 0 ? null : r));
}
function as(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (((i = o.destroy), r !== null && Wo(r, o.deps))) {
      l.memoizedState = Nr(t, n, i, r);
      return;
    }
  }
  (V.flags |= e), (l.memoizedState = Nr(1 | t, n, i, r));
}
function au(e, t) {
  return ml(8390656, 8, e, t);
}
function Ko(e, t) {
  return as(2048, 8, e, t);
}
function Rd(e, t) {
  return as(4, 2, e, t);
}
function Ld(e, t) {
  return as(4, 4, e, t);
}
function Ad(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Fd(e, t, n) {
  return (n = n != null ? n.concat([e]) : null), as(4, 4, Ad.bind(null, t, e), n);
}
function Go() {}
function Id(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Wo(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function $d(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Wo(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function zd(e, t, n) {
  return Jt & 21
    ? (Ue(n, t) || ((n = Uc()), (V.lanes |= n), (Yt |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (xe = !0)), (e.memoizedState = n));
}
function rh(e, t) {
  var n = $;
  ($ = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Ys.transition;
  Ys.transition = {};
  try {
    e(!1), t();
  } finally {
    ($ = n), (Ys.transition = r);
  }
}
function Md() {
  return Le().memoizedState;
}
function lh(e, t, n) {
  var r = Dt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Bd(e))
  )
    Ud(t, n);
  else if (((n = vd(e, t, n, r)), n !== null)) {
    var l = fe();
    Be(n, e, r, l), Hd(n, t, r);
  }
}
function sh(e, t, n) {
  var r = Dt(e),
    l = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
  if (Bd(e)) Ud(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && ((i = t.lastRenderedReducer), i !== null))
      try {
        var o = t.lastRenderedState,
          a = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = a), Ue(a, o))) {
          var u = t.interleaved;
          u === null ? ((l.next = l), zo(t)) : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = vd(e, t, l, r)), n !== null && ((l = fe()), Be(n, e, r, l), Hd(n, t, r));
  }
}
function Bd(e) {
  var t = e.alternate;
  return e === V || (t !== null && t === V);
}
function Ud(e, t) {
  rr = Bl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
}
function Hd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Eo(e, n);
  }
}
var Ul = {
    readContext: Re,
    useCallback: ie,
    useContext: ie,
    useEffect: ie,
    useImperativeHandle: ie,
    useInsertionEffect: ie,
    useLayoutEffect: ie,
    useMemo: ie,
    useReducer: ie,
    useRef: ie,
    useState: ie,
    useDebugValue: ie,
    useDeferredValue: ie,
    useTransition: ie,
    useMutableSource: ie,
    useSyncExternalStore: ie,
    useId: ie,
    unstable_isNewReconciler: !1,
  },
  ih = {
    readContext: Re,
    useCallback: function (e, t) {
      return (We().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Re,
    useEffect: au,
    useImperativeHandle: function (e, t, n) {
      return (n = n != null ? n.concat([e]) : null), ml(4194308, 4, Ad.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return ml(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ml(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = We();
      return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
    },
    useReducer: function (e, t, n) {
      var r = We();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = lh.bind(null, V, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = We();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ou,
    useDebugValue: Go,
    useDeferredValue: function (e) {
      return (We().memoizedState = e);
    },
    useTransition: function () {
      var e = ou(!1),
        t = e[0];
      return (e = rh.bind(null, e[1])), (We().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = V,
        l = We();
      if (U) {
        if (n === void 0) throw Error(k(407));
        n = n();
      } else {
        if (((n = t()), ne === null)) throw Error(k(349));
        Jt & 30 || Cd(r, t, n);
      }
      l.memoizedState = n;
      var i = {
        value: n,
        getSnapshot: t,
      };
      return (
        (l.queue = i),
        au(Od.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Nr(9, Dd.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = We(),
        t = ne.identifierPrefix;
      if (U) {
        var n = tt,
          r = et;
        (n = (r & ~(1 << (32 - Me(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = wr++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':');
      } else (n = nh++), (t = ':' + t + 'r' + n.toString(32) + ':');
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  oh = {
    readContext: Re,
    useCallback: Id,
    useContext: Re,
    useEffect: Ko,
    useImperativeHandle: Fd,
    useInsertionEffect: Rd,
    useLayoutEffect: Ld,
    useMemo: $d,
    useReducer: qs,
    useRef: _d,
    useState: function () {
      return qs(jr);
    },
    useDebugValue: Go,
    useDeferredValue: function (e) {
      var t = Le();
      return zd(t, X.memoizedState, e);
    },
    useTransition: function () {
      var e = qs(jr)[0],
        t = Le().memoizedState;
      return [e, t];
    },
    useMutableSource: Ed,
    useSyncExternalStore: bd,
    useId: Md,
    unstable_isNewReconciler: !1,
  },
  ah = {
    readContext: Re,
    useCallback: Id,
    useContext: Re,
    useEffect: Ko,
    useImperativeHandle: Fd,
    useInsertionEffect: Rd,
    useLayoutEffect: Ld,
    useMemo: $d,
    useReducer: Xs,
    useRef: _d,
    useState: function () {
      return Xs(jr);
    },
    useDebugValue: Go,
    useDeferredValue: function (e) {
      var t = Le();
      return X === null ? (t.memoizedState = e) : zd(t, X.memoizedState, e);
    },
    useTransition: function () {
      var e = Xs(jr)[0],
        t = Le().memoizedState;
      return [e, t];
    },
    useMutableSource: Ed,
    useSyncExternalStore: bd,
    useId: Md,
    unstable_isNewReconciler: !1,
  };
function On(e, t) {
  try {
    var n = '',
      r = t;
    do (n += Fm(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return {
    value: e,
    source: t,
    stack: l,
    digest: null,
  };
}
function Zs(e, t, n) {
  return {
    value: e,
    source: null,
    stack: n ?? null,
    digest: t ?? null,
  };
}
function Bi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var uh = typeof WeakMap == 'function' ? WeakMap : Map;
function Wd(e, t, n) {
  (n = nt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Wl || ((Wl = !0), (qi = r)), Bi(e, t);
    }),
    n
  );
}
function Vd(e, t, n) {
  (n = nt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Bi(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == 'function' &&
      (n.callback = function () {
        Bi(e, t), typeof r != 'function' && (Ct === null ? (Ct = new Set([this])) : Ct.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : '',
        });
      }),
    n
  );
}
function uu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new uh();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = Sh.bind(null, e, t, n)), t.then(e, e));
}
function cu(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function du(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null ? (n.tag = 17) : ((t = nt(-1, 1)), (t.tag = 2), bt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var ch = ct.ReactCurrentOwner,
  xe = !1;
function de(e, t, n, r) {
  t.child = e === null ? Sd(t, null, n, r) : Cn(t, e.child, n, r);
}
function fu(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    Nn(t, l),
    (r = Vo(e, t, n, r, i, l)),
    (n = Qo()),
    e !== null && !xe
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), ot(e, t, l))
      : (U && n && Ro(t), (t.flags |= 1), de(e, t, r, l), t.child)
  );
}
function mu(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == 'function' &&
      !na(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Qd(e, t, i, r, l))
      : ((e = gl(n.type, null, r, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var o = i.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : pr), n(o, r) && e.ref === t.ref))
      return ot(e, t, l);
  }
  return (t.flags |= 1), (e = Ot(i, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
}
function Qd(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (pr(i, r) && e.ref === t.ref)
      if (((xe = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0)) e.flags & 131072 && (xe = !0);
      else return (t.lanes = e.lanes), ot(e, t, l);
  }
  return Ui(e, t, n, r, l);
}
function Kd(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      (t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null,
      }),
        z(gn, je),
        (je |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          z(gn, je),
          (je |= e),
          null
        );
      (t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null,
      }),
        (r = i !== null ? i.baseLanes : n),
        z(gn, je),
        (je |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n), z(gn, je), (je |= r);
  return de(e, t, l, n), t.child;
}
function Gd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ui(e, t, n, r, l) {
  var i = ve(n) ? Kt : ce.current;
  return (
    (i = En(t, i)),
    Nn(t, l),
    (n = Vo(e, t, n, r, i, l)),
    (r = Qo()),
    e !== null && !xe
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), ot(e, t, l))
      : (U && r && Ro(t), (t.flags |= 1), de(e, t, n, l), t.child)
  );
}
function pu(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    Ll(t);
  } else i = !1;
  if ((Nn(t, l), t.stateNode === null)) pl(e, t), jd(t, n, r), Mi(t, n, r, l), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      a = t.memoizedProps;
    o.props = a;
    var u = o.context,
      d = n.contextType;
    typeof d == 'object' && d !== null
      ? (d = Re(d))
      : ((d = ve(n) ? Kt : ce.current), (d = En(t, d)));
    var c = n.getDerivedStateFromProps,
      f = typeof c == 'function' || typeof o.getSnapshotBeforeUpdate == 'function';
    f ||
      (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof o.componentWillReceiveProps != 'function') ||
      ((a !== r || u !== d) && su(t, o, r, d)),
      (ht = !1);
    var h = t.memoizedState;
    (o.state = h),
      zl(t, r, o, l),
      (u = t.memoizedState),
      a !== r || h !== u || ge.current || ht
        ? (typeof c == 'function' && (zi(t, n, c, r), (u = t.memoizedState)),
          (a = ht || lu(t, n, a, r, h, u, d))
            ? (f ||
                (typeof o.UNSAFE_componentWillMount != 'function' &&
                  typeof o.componentWillMount != 'function') ||
                (typeof o.componentWillMount == 'function' && o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof o.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (o.props = r),
          (o.state = u),
          (o.context = d),
          (r = a))
        : (typeof o.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1));
  } else {
    (o = t.stateNode),
      yd(e, t),
      (a = t.memoizedProps),
      (d = t.type === t.elementType ? a : Fe(t.type, a)),
      (o.props = d),
      (f = t.pendingProps),
      (h = o.context),
      (u = n.contextType),
      typeof u == 'object' && u !== null
        ? (u = Re(u))
        : ((u = ve(n) ? Kt : ce.current), (u = En(t, u)));
    var y = n.getDerivedStateFromProps;
    (c = typeof y == 'function' || typeof o.getSnapshotBeforeUpdate == 'function') ||
      (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof o.componentWillReceiveProps != 'function') ||
      ((a !== f || h !== u) && su(t, o, r, u)),
      (ht = !1),
      (h = t.memoizedState),
      (o.state = h),
      zl(t, r, o, l);
    var v = t.memoizedState;
    a !== f || h !== v || ge.current || ht
      ? (typeof y == 'function' && (zi(t, n, y, r), (v = t.memoizedState)),
        (d = ht || lu(t, n, d, r, h, v, u) || !1)
          ? (c ||
              (typeof o.UNSAFE_componentWillUpdate != 'function' &&
                typeof o.componentWillUpdate != 'function') ||
              (typeof o.componentWillUpdate == 'function' && o.componentWillUpdate(r, v, u),
              typeof o.UNSAFE_componentWillUpdate == 'function' &&
                o.UNSAFE_componentWillUpdate(r, v, u)),
            typeof o.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (o.props = r),
        (o.state = v),
        (o.context = u),
        (r = d))
      : (typeof o.componentDidUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Hi(e, t, n, r, i, l);
}
function Hi(e, t, n, r, l, i) {
  Gd(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Za(t, n, !1), ot(e, t, i);
  (r = t.stateNode), (ch.current = t);
  var a = o && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = Cn(t, e.child, null, i)), (t.child = Cn(t, null, a, i)))
      : de(e, t, a, i),
    (t.memoizedState = r.state),
    l && Za(t, n, !0),
    t.child
  );
}
function Jd(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Xa(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Xa(e, t.context, !1),
    Bo(e, t.containerInfo);
}
function hu(e, t, n, r, l) {
  return bn(), Ao(l), (t.flags |= 256), de(e, t, n, r), t.child;
}
var Wi = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
};
function Vi(e) {
  return {
    baseLanes: e,
    cachePool: null,
    transitions: null,
  };
}
function Yd(e, t, n) {
  var r = t.pendingProps,
    l = W.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    a;
  if (
    ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a ? ((i = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
    z(W, l & 1),
    e === null)
  )
    return (
      Ii(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === '$!' ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (o = {
                mode: 'hidden',
                children: o,
              }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = ds(o, r, 0, null)),
              (e = Qt(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Vi(n)),
              (t.memoizedState = Wi),
              e)
            : Jo(t, o))
    );
  if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
    return dh(e, t, o, r, a, l, n);
  if (i) {
    (i = r.fallback), (o = t.mode), (l = e.child), (a = l.sibling);
    var u = {
      mode: 'hidden',
      children: r.children,
    };
    return (
      !(o & 1) && t.child !== l
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = u), (t.deletions = null))
        : ((r = Ot(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      a !== null ? (i = Ot(a, i)) : ((i = Qt(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? Vi(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Wi),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = Ot(i, {
      mode: 'visible',
      children: r.children,
    })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Jo(e, t) {
  return (t = ds({ mode: 'visible', children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
}
function Zr(e, t, n, r) {
  return (
    r !== null && Ao(r),
    Cn(t, e.child, null, n),
    (e = Jo(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function dh(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Zs(Error(k(422)))), Zr(e, t, o, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (l = t.mode),
          (r = ds(
            {
              mode: 'visible',
              children: r.children,
            },
            l,
            0,
            null
          )),
          (i = Qt(i, l, o, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && Cn(t, e.child, null, o),
          (t.child.memoizedState = Vi(o)),
          (t.memoizedState = Wi),
          i);
  if (!(t.mode & 1)) return Zr(e, t, o, null);
  if (l.data === '$!') {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (i = Error(k(419))), (r = Zs(i, r, void 0)), Zr(e, t, o, r);
  }
  if (((a = (o & e.childLanes) !== 0), xe || a)) {
    if (((r = ne), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | o) ? 0 : l),
        l !== 0 && l !== i.retryLane && ((i.retryLane = l), it(e, l), Be(r, e, l, -1));
    }
    return ta(), (r = Zs(Error(k(421)))), Zr(e, t, o, r);
  }
  return l.data === '$?'
    ? ((t.flags |= 128), (t.child = e.child), (t = kh.bind(null, e)), (l._reactRetry = t), null)
    : ((e = i.treeContext),
      (Ne = Et(l.nextSibling)),
      (ke = t),
      (U = !0),
      ($e = null),
      e !== null &&
        ((De[Oe++] = et),
        (De[Oe++] = tt),
        (De[Oe++] = Gt),
        (et = e.id),
        (tt = e.overflow),
        (Gt = t)),
      (t = Jo(t, r.children)),
      (t.flags |= 4096),
      t);
}
function xu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), $i(e.return, t, n);
}
function ei(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function qd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((de(e, t, r.children, n), (r = W.current), r & 2)) (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && xu(e, n, t);
        else if (e.tag === 19) xu(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((z(W, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case 'forwards':
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate), e !== null && Ml(e) === null && (l = n), (n = n.sibling);
        (n = l),
          n === null ? ((l = t.child), (t.child = null)) : ((l = n.sibling), (n.sibling = null)),
          ei(t, !1, l, n, i);
        break;
      case 'backwards':
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Ml(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        ei(t, !0, n, null, i);
        break;
      case 'together':
        ei(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function pl(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function ot(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Yt |= t.lanes), !(n & t.childLanes)))
    return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (e = t.child, n = Ot(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      (e = e.sibling), (n = n.sibling = Ot(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function fh(e, t, n) {
  switch (t.tag) {
    case 3:
      Jd(t), bn();
      break;
    case 5:
      kd(t);
      break;
    case 1:
      ve(t.type) && Ll(t);
      break;
    case 4:
      Bo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      z(Il, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (z(W, W.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Yd(e, t, n)
            : (z(W, W.current & 1), (e = ot(e, t, n)), e !== null ? e.sibling : null);
      z(W, W.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return qd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        z(W, W.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Kd(e, t, n);
  }
  return ot(e, t, n);
}
var Xd, Qi, Zd, ef;
Xd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Qi = function () {};
Zd = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Wt(Ge.current);
    var i = null;
    switch (n) {
      case 'input':
        (l = pi(e, l)), (r = pi(e, r)), (i = []);
        break;
      case 'select':
        (l = Q({}, l, {
          value: void 0,
        })),
          (r = Q({}, r, {
            value: void 0,
          })),
          (i = []);
        break;
      case 'textarea':
        (l = gi(e, l)), (r = gi(e, r)), (i = []);
        break;
      default:
        typeof l.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = _l);
    }
    yi(n, r);
    var o;
    n = null;
    for (d in l)
      if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null)
        if (d === 'style') {
          var a = l[d];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ''));
        } else
          d !== 'dangerouslySetInnerHTML' &&
            d !== 'children' &&
            d !== 'suppressContentEditableWarning' &&
            d !== 'suppressHydrationWarning' &&
            d !== 'autoFocus' &&
            (or.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
    for (d in r) {
      var u = r[d];
      if (
        ((a = l != null ? l[d] : void 0),
        r.hasOwnProperty(d) && u !== a && (u != null || a != null))
      )
        if (d === 'style')
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) || (u && u.hasOwnProperty(o)) || (n || (n = {}), (n[o] = ''));
            for (o in u) u.hasOwnProperty(o) && a[o] !== u[o] && (n || (n = {}), (n[o] = u[o]));
          } else n || (i || (i = []), i.push(d, n)), (n = u);
        else
          d === 'dangerouslySetInnerHTML'
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (i = i || []).push(d, u))
            : d === 'children'
              ? (typeof u != 'string' && typeof u != 'number') || (i = i || []).push(d, '' + u)
              : d !== 'suppressContentEditableWarning' &&
                d !== 'suppressHydrationWarning' &&
                (or.hasOwnProperty(d)
                  ? (u != null && d === 'onScroll' && M('scroll', e), i || a === u || (i = []))
                  : (i = i || []).push(d, u));
    }
    n && (i = i || []).push('style', n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
ef = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Vn(e, t) {
  if (!U)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function mh(e, t, n) {
  var r = t.pendingProps;
  switch ((Lo(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return oe(t), null;
    case 1:
      return ve(t.type) && Rl(), oe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Dn(),
        B(ge),
        B(ce),
        Ho(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (qr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), $e !== null && (eo($e), ($e = null)))),
        Qi(e, t),
        oe(t),
        null
      );
    case 5:
      Uo(t);
      var l = Wt(yr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Zd(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return oe(t), null;
        }
        if (((e = Wt(Ge.current)), qr(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[Ve] = t), (r[gr] = i), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              M('cancel', r), M('close', r);
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              M('load', r);
              break;
            case 'video':
            case 'audio':
              for (l = 0; l < qn.length; l++) M(qn[l], r);
              break;
            case 'source':
              M('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              M('error', r), M('load', r);
              break;
            case 'details':
              M('toggle', r);
              break;
            case 'input':
              Ea(r, i), M('invalid', r);
              break;
            case 'select':
              (r._wrapperState = {
                wasMultiple: !!i.multiple,
              }),
                M('invalid', r);
              break;
            case 'textarea':
              Ca(r, i), M('invalid', r);
          }
          yi(n, i), (l = null);
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var a = i[o];
              o === 'children'
                ? typeof a == 'string'
                  ? r.textContent !== a &&
                    (i.suppressHydrationWarning !== !0 && Yr(r.textContent, a, e),
                    (l = ['children', a]))
                  : typeof a == 'number' &&
                    r.textContent !== '' + a &&
                    (i.suppressHydrationWarning !== !0 && Yr(r.textContent, a, e),
                    (l = ['children', '' + a]))
                : or.hasOwnProperty(o) && a != null && o === 'onScroll' && M('scroll', r);
            }
          switch (n) {
            case 'input':
              Ur(r), ba(r, i, !0);
              break;
            case 'textarea':
              Ur(r), Da(r);
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof i.onClick == 'function' && (r.onclick = _l);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = l.nodeType === 9 ? l : l.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = Cc(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = o.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === 'select' &&
                      ((o = e), r.multiple ? (o.multiple = !0) : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[Ve] = t),
            (e[gr] = r),
            Xd(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = wi(n, r)), n)) {
              case 'dialog':
                M('cancel', e), M('close', e), (l = r);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                M('load', e), (l = r);
                break;
              case 'video':
              case 'audio':
                for (l = 0; l < qn.length; l++) M(qn[l], e);
                l = r;
                break;
              case 'source':
                M('error', e), (l = r);
                break;
              case 'img':
              case 'image':
              case 'link':
                M('error', e), M('load', e), (l = r);
                break;
              case 'details':
                M('toggle', e), (l = r);
                break;
              case 'input':
                Ea(e, r), (l = pi(e, r)), M('invalid', e);
                break;
              case 'option':
                l = r;
                break;
              case 'select':
                (e._wrapperState = {
                  wasMultiple: !!r.multiple,
                }),
                  (l = Q({}, r, {
                    value: void 0,
                  })),
                  M('invalid', e);
                break;
              case 'textarea':
                Ca(e, r), (l = gi(e, r)), M('invalid', e);
                break;
              default:
                l = r;
            }
            yi(n, l), (a = l);
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === 'style'
                  ? Pc(e, u)
                  : i === 'dangerouslySetInnerHTML'
                    ? ((u = u ? u.__html : void 0), u != null && Dc(e, u))
                    : i === 'children'
                      ? typeof u == 'string'
                        ? (n !== 'textarea' || u !== '') && ar(e, u)
                        : typeof u == 'number' && ar(e, '' + u)
                      : i !== 'suppressContentEditableWarning' &&
                        i !== 'suppressHydrationWarning' &&
                        i !== 'autoFocus' &&
                        (or.hasOwnProperty(i)
                          ? u != null && i === 'onScroll' && M('scroll', e)
                          : u != null && yo(e, i, u, o));
              }
            switch (n) {
              case 'input':
                Ur(e), ba(e, r, !1);
                break;
              case 'textarea':
                Ur(e), Da(e);
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + Tt(r.value));
                break;
              case 'select':
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? vn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null && vn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == 'function' && (e.onclick = _l);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return oe(t), null;
    case 6:
      if (e && t.stateNode != null) ef(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(k(166));
        if (((n = Wt(yr.current)), Wt(Ge.current), qr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ve] = t),
            (i = r.nodeValue !== n) && ((e = ke), e !== null))
          )
            switch (e.tag) {
              case 3:
                Yr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Yr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Ve] = t),
            (t.stateNode = r);
      }
      return oe(t), null;
    case 13:
      if (
        (B(W),
        (r = t.memoizedState),
        e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (U && Ne !== null && t.mode & 1 && !(t.flags & 128))
          gd(), bn(), (t.flags |= 98560), (i = !1);
        else if (((i = qr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(k(318));
            if (((i = t.memoizedState), (i = i !== null ? i.dehydrated : null), !i))
              throw Error(k(317));
            i[Ve] = t;
          } else bn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          oe(t), (i = !1);
        } else $e !== null && (eo($e), ($e = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 && (e === null || W.current & 1 ? Z === 0 && (Z = 3) : ta())),
          t.updateQueue !== null && (t.flags |= 4),
          oe(t),
          null);
    case 4:
      return Dn(), Qi(e, t), e === null && hr(t.stateNode.containerInfo), oe(t), null;
    case 10:
      return $o(t.type._context), oe(t), null;
    case 17:
      return ve(t.type) && Rl(), oe(t), null;
    case 19:
      if ((B(W), (i = t.memoizedState), i === null)) return oe(t), null;
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) Vn(i, !1);
        else {
          if (Z !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = Ml(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    Vn(i, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return z(W, (W.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            J() > Pn &&
            ((t.flags |= 128), (r = !0), Vn(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Ml(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Vn(i, !0),
              i.tail === null && i.tailMode === 'hidden' && !o.alternate && !U)
            )
              return oe(t), null;
          } else
            2 * J() - i.renderingStartTime > Pn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Vn(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last), n !== null ? (n.sibling = o) : (t.child = o), (i.last = o));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = J()),
          (t.sibling = null),
          (n = W.current),
          z(W, r ? (n & 1) | 2 : n & 1),
          t)
        : (oe(t), null);
    case 22:
    case 23:
      return (
        ea(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? je & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : oe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function ph(e, t) {
  switch ((Lo(t), t.tag)) {
    case 1:
      return (
        ve(t.type) && Rl(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Dn(),
        B(ge),
        B(ce),
        Ho(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Uo(t), null;
    case 13:
      if ((B(W), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(k(340));
        bn();
      }
      return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
    case 19:
      return B(W), null;
    case 4:
      return Dn(), null;
    case 10:
      return $o(t.type._context), null;
    case 22:
    case 23:
      return ea(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var el = !1,
  ae = !1,
  hh = typeof WeakSet == 'function' ? WeakSet : Set,
  b = null;
function xn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        K(e, t, r);
      }
    else n.current = null;
}
function Ki(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var gu = !1;
function xh(e, t) {
  if (((Pi = Ol), (e = ld()), _o(e))) {
    if ('selectionStart' in e)
      var n = {
        start: e.selectionStart,
        end: e.selectionEnd,
      };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            a = -1,
            u = -1,
            d = 0,
            c = 0,
            f = e,
            h = null;
          t: for (;;) {
            for (
              var y;
              f !== n || (l !== 0 && f.nodeType !== 3) || (a = o + l),
                f !== i || (r !== 0 && f.nodeType !== 3) || (u = o + r),
                f.nodeType === 3 && (o += f.nodeValue.length),
                (y = f.firstChild) !== null;

            )
              (h = f), (f = y);
            for (;;) {
              if (f === e) break t;
              if (
                (h === n && ++d === l && (a = o),
                h === i && ++c === r && (u = o),
                (y = f.nextSibling) !== null)
              )
                break;
              (f = h), (h = f.parentNode);
            }
            f = y;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (
    Ti = {
      focusedElem: e,
      selectionRange: n,
    },
      Ol = !1,
      b = t;
    b !== null;

  )
    if (((t = b), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (b = e);
    else
      for (; b !== null; ) {
        t = b;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var x = v.memoizedProps,
                    j = v.memoizedState,
                    p = t.stateNode,
                    m = p.getSnapshotBeforeUpdate(t.elementType === t.type ? x : Fe(t.type, x), j);
                  p.__reactInternalSnapshotBeforeUpdate = m;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = '')
                  : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(k(163));
            }
        } catch (N) {
          K(t, t.return, N);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (b = e);
          break;
        }
        b = t.return;
      }
  return (v = gu), (gu = !1), v;
}
function lr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        (l.destroy = void 0), i !== void 0 && Ki(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function us(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Gi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function tf(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), tf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null && (delete t[Ve], delete t[gr], delete t[Li], delete t[Xp], delete t[Zp])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function nf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function vu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || nf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ji(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = _l));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ji(e, t, n), e = e.sibling; e !== null; ) Ji(e, t, n), (e = e.sibling);
}
function Yi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Yi(e, t, n), e = e.sibling; e !== null; ) Yi(e, t, n), (e = e.sibling);
}
var re = null,
  Ie = !1;
function dt(e, t, n) {
  for (n = n.child; n !== null; ) rf(e, t, n), (n = n.sibling);
}
function rf(e, t, n) {
  if (Ke && typeof Ke.onCommitFiberUnmount == 'function')
    try {
      Ke.onCommitFiberUnmount(ts, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ae || xn(n, t);
    case 6:
      var r = re,
        l = Ie;
      (re = null),
        dt(e, t, n),
        (re = r),
        (Ie = l),
        re !== null &&
          (Ie
            ? ((e = re),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null &&
        (Ie
          ? ((e = re),
            (n = n.stateNode),
            e.nodeType === 8 ? Ks(e.parentNode, n) : e.nodeType === 1 && Ks(e, n),
            fr(e))
          : Ks(re, n.stateNode));
      break;
    case 4:
      (r = re),
        (l = Ie),
        (re = n.stateNode.containerInfo),
        (Ie = !0),
        dt(e, t, n),
        (re = r),
        (Ie = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ae && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          (i = i.tag), o !== void 0 && (i & 2 || i & 4) && Ki(n, t, o), (l = l.next);
        } while (l !== r);
      }
      dt(e, t, n);
      break;
    case 1:
      if (!ae && (xn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
        try {
          (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
        } catch (a) {
          K(n, t, a);
        }
      dt(e, t, n);
      break;
    case 21:
      dt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ae = (r = ae) || n.memoizedState !== null), dt(e, t, n), (ae = r))
        : dt(e, t, n);
      break;
    default:
      dt(e, t, n);
  }
}
function yu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new hh()),
      t.forEach(function (r) {
        var l = Eh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Ae(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          a = o;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (re = a.stateNode), (Ie = !1);
              break e;
            case 3:
              (re = a.stateNode.containerInfo), (Ie = !0);
              break e;
            case 4:
              (re = a.stateNode.containerInfo), (Ie = !0);
              break e;
          }
          a = a.return;
        }
        if (re === null) throw Error(k(160));
        rf(i, o, l), (re = null), (Ie = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (d) {
        K(l, t, d);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) lf(t, e), (t = t.sibling);
}
function lf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ae(t, e), He(e), r & 4)) {
        try {
          lr(3, e, e.return), us(3, e);
        } catch (x) {
          K(e, e.return, x);
        }
        try {
          lr(5, e, e.return);
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 1:
      Ae(t, e), He(e), r & 512 && n !== null && xn(n, n.return);
      break;
    case 5:
      if ((Ae(t, e), He(e), r & 512 && n !== null && xn(n, n.return), e.flags & 32)) {
        var l = e.stateNode;
        try {
          ar(l, '');
        } catch (x) {
          K(e, e.return, x);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            a === 'input' && i.type === 'radio' && i.name != null && Ec(l, i), wi(a, o);
            var d = wi(a, i);
            for (o = 0; o < u.length; o += 2) {
              var c = u[o],
                f = u[o + 1];
              c === 'style'
                ? Pc(l, f)
                : c === 'dangerouslySetInnerHTML'
                  ? Dc(l, f)
                  : c === 'children'
                    ? ar(l, f)
                    : yo(l, c, f, d);
            }
            switch (a) {
              case 'input':
                hi(l, i);
                break;
              case 'textarea':
                bc(l, i);
                break;
              case 'select':
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var y = i.value;
                y != null
                  ? vn(l, !!i.multiple, y, !1)
                  : h !== !!i.multiple &&
                    (i.defaultValue != null
                      ? vn(l, !!i.multiple, i.defaultValue, !0)
                      : vn(l, !!i.multiple, i.multiple ? [] : '', !1));
            }
            l[gr] = i;
          } catch (x) {
            K(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((Ae(t, e), He(e), r & 4)) {
        if (e.stateNode === null) throw Error(k(162));
        (l = e.stateNode), (i = e.memoizedProps);
        try {
          l.nodeValue = i;
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 3:
      if ((Ae(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          fr(t.containerInfo);
        } catch (x) {
          K(e, e.return, x);
        }
      break;
    case 4:
      Ae(t, e), He(e);
      break;
    case 13:
      Ae(t, e),
        He(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i || (l.alternate !== null && l.alternate.memoizedState !== null) || (Xo = J())),
        r & 4 && yu(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ae = (d = ae) || c), Ae(t, e), (ae = d)) : Ae(t, e),
        He(e),
        r & 8192)
      ) {
        if (((d = e.memoizedState !== null), (e.stateNode.isHidden = d) && !c && e.mode & 1))
          for (b = e, c = e.child; c !== null; ) {
            for (f = b = c; b !== null; ) {
              switch (((h = b), (y = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  lr(4, h, h.return);
                  break;
                case 1:
                  xn(h, h.return);
                  var v = h.stateNode;
                  if (typeof v.componentWillUnmount == 'function') {
                    (r = h), (n = h.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (x) {
                      K(r, n, x);
                    }
                  }
                  break;
                case 5:
                  xn(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    ju(f);
                    continue;
                  }
              }
              y !== null ? ((y.return = h), (b = y)) : ju(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (l = f.stateNode),
                  d
                    ? ((i = l.style),
                      typeof i.setProperty == 'function'
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none'))
                    : ((a = f.stateNode),
                      (u = f.memoizedProps.style),
                      (o = u != null && u.hasOwnProperty('display') ? u.display : null),
                      (a.style.display = Oc('display', o)));
              } catch (x) {
                K(e, e.return, x);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = d ? '' : f.memoizedProps;
              } catch (x) {
                K(e, e.return, x);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) || f.memoizedState === null || f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Ae(t, e), He(e), r & 4 && yu(e);
      break;
    case 21:
      break;
    default:
      Ae(t, e), He(e);
  }
}
function He(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (nf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (ar(l, ''), (r.flags &= -33));
          var i = vu(e);
          Yi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = vu(e);
          Ji(e, a, o);
          break;
        default:
          throw Error(k(161));
      }
    } catch (u) {
      K(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function gh(e, t, n) {
  (b = e), sf(e);
}
function sf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; b !== null; ) {
    var l = b,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || el;
      if (!o) {
        var a = l.alternate,
          u = (a !== null && a.memoizedState !== null) || ae;
        a = el;
        var d = ae;
        if (((el = o), (ae = u) && !d))
          for (b = l; b !== null; )
            (o = b),
              (u = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Nu(l)
                : u !== null
                  ? ((u.return = o), (b = u))
                  : Nu(l);
        for (; i !== null; ) (b = i), sf(i), (i = i.sibling);
        (b = l), (el = a), (ae = d);
      }
      wu(e);
    } else l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (b = i)) : wu(e);
  }
}
function wu(e) {
  for (; b !== null; ) {
    var t = b;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ae || us(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ae)
                if (n === null) r.componentDidMount();
                else {
                  var l = t.elementType === t.type ? n.memoizedProps : Fe(t.type, n.memoizedProps);
                  r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var i = t.updateQueue;
              i !== null && ru(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                ru(t, o, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    u.autoFocus && n.focus();
                    break;
                  case 'img':
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var d = t.alternate;
                if (d !== null) {
                  var c = d.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && fr(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(k(163));
          }
        ae || (t.flags & 512 && Gi(t));
      } catch (h) {
        K(t, t.return, h);
      }
    }
    if (t === e) {
      b = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (b = n);
      break;
    }
    b = t.return;
  }
}
function ju(e) {
  for (; b !== null; ) {
    var t = b;
    if (t === e) {
      b = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (b = n);
      break;
    }
    b = t.return;
  }
}
function Nu(e) {
  for (; b !== null; ) {
    var t = b;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            us(4, t);
          } catch (u) {
            K(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              K(t, l, u);
            }
          }
          var i = t.return;
          try {
            Gi(t);
          } catch (u) {
            K(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Gi(t);
          } catch (u) {
            K(t, o, u);
          }
      }
    } catch (u) {
      K(t, t.return, u);
    }
    if (t === e) {
      b = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (b = a);
      break;
    }
    b = t.return;
  }
}
var vh = Math.ceil,
  Hl = ct.ReactCurrentDispatcher,
  Yo = ct.ReactCurrentOwner,
  Te = ct.ReactCurrentBatchConfig,
  I = 0,
  ne = null,
  Y = null,
  le = 0,
  je = 0,
  gn = At(0),
  Z = 0,
  Sr = null,
  Yt = 0,
  cs = 0,
  qo = 0,
  sr = null,
  he = null,
  Xo = 0,
  Pn = 1 / 0,
  Xe = null,
  Wl = !1,
  qi = null,
  Ct = null,
  tl = !1,
  wt = null,
  Vl = 0,
  ir = 0,
  Xi = null,
  hl = -1,
  xl = 0;
function fe() {
  return I & 6 ? J() : hl !== -1 ? hl : (hl = J());
}
function Dt(e) {
  return e.mode & 1
    ? I & 2 && le !== 0
      ? le & -le
      : th.transition !== null
        ? (xl === 0 && (xl = Uc()), xl)
        : ((e = $), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Jc(e.type))), e)
    : 1;
}
function Be(e, t, n, r) {
  if (50 < ir) throw ((ir = 0), (Xi = null), Error(k(185)));
  Dr(e, n, r),
    (!(I & 2) || e !== ne) &&
      (e === ne && (!(I & 2) && (cs |= n), Z === 4 && gt(e, le)),
      ye(e, r),
      n === 1 && I === 0 && !(t.mode & 1) && ((Pn = J() + 500), is && Ft()));
}
function ye(e, t) {
  var n = e.callbackNode;
  tp(e, t);
  var r = Dl(e, e === ne ? le : 0);
  if (r === 0) n !== null && Ta(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ta(n), t === 1))
      e.tag === 0 ? eh(Su.bind(null, e)) : pd(Su.bind(null, e)),
        Yp(function () {
          !(I & 6) && Ft();
        }),
        (n = null);
    else {
      switch (Hc(r)) {
        case 1:
          n = ko;
          break;
        case 4:
          n = Mc;
          break;
        case 16:
          n = Cl;
          break;
        case 536870912:
          n = Bc;
          break;
        default:
          n = Cl;
      }
      n = pf(n, of.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function of(e, t) {
  if (((hl = -1), (xl = 0), I & 6)) throw Error(k(327));
  var n = e.callbackNode;
  if (Sn() && e.callbackNode !== n) return null;
  var r = Dl(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ql(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var i = uf();
    (ne !== e || le !== t) && ((Xe = null), (Pn = J() + 500), Vt(e, t));
    do
      try {
        jh();
        break;
      } catch (a) {
        af(e, a);
      }
    while (!0);
    Io(), (Hl.current = i), (I = l), Y !== null ? (t = 0) : ((ne = null), (le = 0), (t = Z));
  }
  if (t !== 0) {
    if ((t === 2 && ((l = Ei(e)), l !== 0 && ((r = l), (t = Zi(e, l)))), t === 1))
      throw ((n = Sr), Vt(e, 0), gt(e, r), ye(e, J()), n);
    if (t === 6) gt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !yh(l) &&
          ((t = Ql(e, r)), t === 2 && ((i = Ei(e)), i !== 0 && ((r = i), (t = Zi(e, i)))), t === 1))
      )
        throw ((n = Sr), Vt(e, 0), gt(e, r), ye(e, J()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          Bt(e, he, Xe);
          break;
        case 3:
          if ((gt(e, r), (r & 130023424) === r && ((t = Xo + 500 - J()), 10 < t))) {
            if (Dl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              fe(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Ri(Bt.bind(null, e, he, Xe), t);
            break;
          }
          Bt(e, he, Xe);
          break;
        case 4:
          if ((gt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Me(r);
            (i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i);
          }
          if (
            ((r = l),
            (r = J() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * vh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ri(Bt.bind(null, e, he, Xe), r);
            break;
          }
          Bt(e, he, Xe);
          break;
        case 5:
          Bt(e, he, Xe);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return ye(e, J()), e.callbackNode === n ? of.bind(null, e) : null;
}
function Zi(e, t) {
  var n = sr;
  return (
    e.current.memoizedState.isDehydrated && (Vt(e, t).flags |= 256),
    (e = Ql(e, t)),
    e !== 2 && ((t = he), (he = n), t !== null && eo(t)),
    e
  );
}
function eo(e) {
  he === null ? (he = e) : he.push.apply(he, e);
}
function yh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!Ue(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function gt(e, t) {
  for (
    t &= ~qo, t &= ~cs, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Me(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Su(e) {
  if (I & 6) throw Error(k(327));
  Sn();
  var t = Dl(e, 0);
  if (!(t & 1)) return ye(e, J()), null;
  var n = Ql(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ei(e);
    r !== 0 && ((t = r), (n = Zi(e, r)));
  }
  if (n === 1) throw ((n = Sr), Vt(e, 0), gt(e, t), ye(e, J()), n);
  if (n === 6) throw Error(k(345));
  return (
    (e.finishedWork = e.current.alternate), (e.finishedLanes = t), Bt(e, he, Xe), ye(e, J()), null
  );
}
function Zo(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    (I = n), I === 0 && ((Pn = J() + 500), is && Ft());
  }
}
function qt(e) {
  wt !== null && wt.tag === 0 && !(I & 6) && Sn();
  var t = I;
  I |= 1;
  var n = Te.transition,
    r = $;
  try {
    if (((Te.transition = null), ($ = 1), e)) return e();
  } finally {
    ($ = r), (Te.transition = n), (I = t), !(I & 6) && Ft();
  }
}
function ea() {
  (je = gn.current), B(gn);
}
function Vt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Jp(n)), Y !== null))
    for (n = Y.return; n !== null; ) {
      var r = n;
      switch ((Lo(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Rl();
          break;
        case 3:
          Dn(), B(ge), B(ce), Ho();
          break;
        case 5:
          Uo(r);
          break;
        case 4:
          Dn();
          break;
        case 13:
          B(W);
          break;
        case 19:
          B(W);
          break;
        case 10:
          $o(r.type._context);
          break;
        case 22:
        case 23:
          ea();
      }
      n = n.return;
    }
  if (
    ((ne = e),
    (Y = e = Ot(e.current, null)),
    (le = je = t),
    (Z = 0),
    (Sr = null),
    (qo = cs = Yt = 0),
    (he = sr = null),
    Ht !== null)
  ) {
    for (t = 0; t < Ht.length; t++)
      if (((n = Ht[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          (i.next = l), (r.next = o);
        }
        n.pending = r;
      }
    Ht = null;
  }
  return e;
}
function af(e, t) {
  do {
    var n = Y;
    try {
      if ((Io(), (fl.current = Ul), Bl)) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        Bl = !1;
      }
      if (
        ((Jt = 0),
        (te = X = V = null),
        (rr = !1),
        (wr = 0),
        (Yo.current = null),
        n === null || n.return === null)
      ) {
        (Z = 1), (Sr = t), (Y = null);
        break;
      }
      e: {
        var i = e,
          o = n.return,
          a = n,
          u = t;
        if (
          ((t = le),
          (a.flags |= 32768),
          u !== null && typeof u == 'object' && typeof u.then == 'function')
        ) {
          var d = u,
            c = a,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var h = c.alternate;
            h
              ? ((c.updateQueue = h.updateQueue),
                (c.memoizedState = h.memoizedState),
                (c.lanes = h.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var y = cu(o);
          if (y !== null) {
            (y.flags &= -257), du(y, o, a, i, t), y.mode & 1 && uu(i, d, t), (t = y), (u = d);
            var v = t.updateQueue;
            if (v === null) {
              var x = new Set();
              x.add(u), (t.updateQueue = x);
            } else v.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              uu(i, d, t), ta();
              break e;
            }
            u = Error(k(426));
          }
        } else if (U && a.mode & 1) {
          var j = cu(o);
          if (j !== null) {
            !(j.flags & 65536) && (j.flags |= 256), du(j, o, a, i, t), Ao(On(u, a));
            break e;
          }
        }
        (i = u = On(u, a)), Z !== 4 && (Z = 2), sr === null ? (sr = [i]) : sr.push(i), (i = o);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var p = Wd(i, u, t);
              nu(i, p);
              break e;
            case 1:
              a = u;
              var m = i.type,
                g = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof m.getDerivedStateFromError == 'function' ||
                  (g !== null &&
                    typeof g.componentDidCatch == 'function' &&
                    (Ct === null || !Ct.has(g))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var N = Vd(i, a, t);
                nu(i, N);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      df(n);
    } catch (E) {
      (t = E), Y === n && n !== null && (Y = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function uf() {
  var e = Hl.current;
  return (Hl.current = Ul), e === null ? Ul : e;
}
function ta() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4),
    ne === null || (!(Yt & 268435455) && !(cs & 268435455)) || gt(ne, le);
}
function Ql(e, t) {
  var n = I;
  I |= 2;
  var r = uf();
  (ne !== e || le !== t) && ((Xe = null), Vt(e, t));
  do
    try {
      wh();
      break;
    } catch (l) {
      af(e, l);
    }
  while (!0);
  if ((Io(), (I = n), (Hl.current = r), Y !== null)) throw Error(k(261));
  return (ne = null), (le = 0), Z;
}
function wh() {
  for (; Y !== null; ) cf(Y);
}
function jh() {
  for (; Y !== null && !Qm(); ) cf(Y);
}
function cf(e) {
  var t = mf(e.alternate, e, je);
  (e.memoizedProps = e.pendingProps), t === null ? df(e) : (Y = t), (Yo.current = null);
}
function df(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = ph(n, t)), n !== null)) {
        (n.flags &= 32767), (Y = n);
        return;
      }
      if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Z = 6), (Y = null);
        return;
      }
    } else if (((n = mh(n, t, je)), n !== null)) {
      Y = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Y = t;
      return;
    }
    Y = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function Bt(e, t, n) {
  var r = $,
    l = Te.transition;
  try {
    (Te.transition = null), ($ = 1), Nh(e, t, n, r);
  } finally {
    (Te.transition = l), ($ = r);
  }
  return null;
}
function Nh(e, t, n, r) {
  do Sn();
  while (wt !== null);
  if (I & 6) throw Error(k(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(k(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (np(e, i),
    e === ne && ((Y = ne = null), (le = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      tl ||
      ((tl = !0),
      pf(Cl, function () {
        return Sn(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = Te.transition), (Te.transition = null);
    var o = $;
    $ = 1;
    var a = I;
    (I |= 4),
      (Yo.current = null),
      xh(e, n),
      lf(n, e),
      Up(Ti),
      (Ol = !!Pi),
      (Ti = Pi = null),
      (e.current = n),
      gh(n),
      Km(),
      (I = a),
      ($ = o),
      (Te.transition = i);
  } else e.current = n;
  if (
    (tl && ((tl = !1), (wt = e), (Vl = l)),
    (i = e.pendingLanes),
    i === 0 && (Ct = null),
    Ym(n.stateNode),
    ye(e, J()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]),
        r(l.value, {
          componentStack: l.stack,
          digest: l.digest,
        });
  if (Wl) throw ((Wl = !1), (e = qi), (qi = null), e);
  return (
    Vl & 1 && e.tag !== 0 && Sn(),
    (i = e.pendingLanes),
    i & 1 ? (e === Xi ? ir++ : ((ir = 0), (Xi = e))) : (ir = 0),
    Ft(),
    null
  );
}
function Sn() {
  if (wt !== null) {
    var e = Hc(Vl),
      t = Te.transition,
      n = $;
    try {
      if (((Te.transition = null), ($ = 16 > e ? 16 : e), wt === null)) var r = !1;
      else {
        if (((e = wt), (wt = null), (Vl = 0), I & 6)) throw Error(k(331));
        var l = I;
        for (I |= 4, b = e.current; b !== null; ) {
          var i = b,
            o = i.child;
          if (b.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var d = a[u];
                for (b = d; b !== null; ) {
                  var c = b;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      lr(8, c, i);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (b = f);
                  else
                    for (; b !== null; ) {
                      c = b;
                      var h = c.sibling,
                        y = c.return;
                      if ((tf(c), c === d)) {
                        b = null;
                        break;
                      }
                      if (h !== null) {
                        (h.return = y), (b = h);
                        break;
                      }
                      b = y;
                    }
                }
              }
              var v = i.alternate;
              if (v !== null) {
                var x = v.child;
                if (x !== null) {
                  v.child = null;
                  do {
                    var j = x.sibling;
                    (x.sibling = null), (x = j);
                  } while (x !== null);
                }
              }
              b = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) (o.return = i), (b = o);
          else
            e: for (; b !== null; ) {
              if (((i = b), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    lr(9, i, i.return);
                }
              var p = i.sibling;
              if (p !== null) {
                (p.return = i.return), (b = p);
                break e;
              }
              b = i.return;
            }
        }
        var m = e.current;
        for (b = m; b !== null; ) {
          o = b;
          var g = o.child;
          if (o.subtreeFlags & 2064 && g !== null) (g.return = o), (b = g);
          else
            e: for (o = m; b !== null; ) {
              if (((a = b), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      us(9, a);
                  }
                } catch (E) {
                  K(a, a.return, E);
                }
              if (a === o) {
                b = null;
                break e;
              }
              var N = a.sibling;
              if (N !== null) {
                (N.return = a.return), (b = N);
                break e;
              }
              b = a.return;
            }
        }
        if (((I = l), Ft(), Ke && typeof Ke.onPostCommitFiberRoot == 'function'))
          try {
            Ke.onPostCommitFiberRoot(ts, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ($ = n), (Te.transition = t);
    }
  }
  return !1;
}
function ku(e, t, n) {
  (t = On(n, t)),
    (t = Wd(e, t, 1)),
    (e = bt(e, t, 1)),
    (t = fe()),
    e !== null && (Dr(e, 1, t), ye(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) ku(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ku(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' && (Ct === null || !Ct.has(r)))
        ) {
          (e = On(n, e)),
            (e = Vd(t, e, 1)),
            (t = bt(t, e, 1)),
            (e = fe()),
            t !== null && (Dr(t, 1, e), ye(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Sh(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = fe()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ne === e &&
      (le & n) === n &&
      (Z === 4 || (Z === 3 && (le & 130023424) === le && 500 > J() - Xo) ? Vt(e, 0) : (qo |= n)),
    ye(e, t);
}
function ff(e, t) {
  t === 0 && (e.mode & 1 ? ((t = Vr), (Vr <<= 1), !(Vr & 130023424) && (Vr = 4194304)) : (t = 1));
  var n = fe();
  (e = it(e, t)), e !== null && (Dr(e, t, n), ye(e, n));
}
function kh(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), ff(e, n);
}
function Eh(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(k(314));
  }
  r !== null && r.delete(t), ff(e, n);
}
var mf;
mf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ge.current) xe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (xe = !1), fh(e, t, n);
      xe = !!(e.flags & 131072);
    }
  else (xe = !1), U && t.flags & 1048576 && hd(t, Fl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      pl(e, t), (e = t.pendingProps);
      var l = En(t, ce.current);
      Nn(t, n), (l = Vo(null, t, r, e, l, n));
      var i = Qo();
      return (
        (t.flags |= 1),
        typeof l == 'object' && l !== null && typeof l.render == 'function' && l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ve(r) ? ((i = !0), Ll(t)) : (i = !1),
            (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
            Mo(t),
            (l.updater = os),
            (t.stateNode = l),
            (l._reactInternals = t),
            Mi(t, r, e, n),
            (t = Hi(null, t, r, !0, i, n)))
          : ((t.tag = 0), U && i && Ro(t), de(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (pl(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Ch(r)),
          (e = Fe(r, e)),
          l)
        ) {
          case 0:
            t = Ui(null, t, r, e, n);
            break e;
          case 1:
            t = pu(null, t, r, e, n);
            break e;
          case 11:
            t = fu(null, t, r, e, n);
            break e;
          case 14:
            t = mu(null, t, r, Fe(r.type, e), n);
            break e;
        }
        throw Error(k(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Fe(r, l)),
        Ui(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Fe(r, l)),
        pu(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Jd(t), e === null)) throw Error(k(387));
        (r = t.pendingProps), (i = t.memoizedState), (l = i.element), yd(e, t), zl(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (l = On(Error(k(423)), t)), (t = hu(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = On(Error(k(424)), t)), (t = hu(e, t, r, n, l));
            break e;
          } else
            for (
              Ne = Et(t.stateNode.containerInfo.firstChild),
                ke = t,
                U = !0,
                $e = null,
                n = Sd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((bn(), r === l)) {
            t = ot(e, t, n);
            break e;
          }
          de(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        kd(t),
        e === null && Ii(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (o = l.children),
        _i(r, l) ? (o = null) : i !== null && _i(r, i) && (t.flags |= 32),
        Gd(e, t),
        de(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && Ii(t), null;
    case 13:
      return Yd(e, t, n);
    case 4:
      return (
        Bo(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Cn(t, null, r, n)) : de(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Fe(r, l)),
        fu(e, t, r, l, n)
      );
    case 7:
      return de(e, t, t.pendingProps, n), t.child;
    case 8:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (o = l.value),
          z(Il, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (Ue(i.value, o)) {
            if (i.children === l.children && !ge.current) {
              t = ot(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var a = i.dependencies;
              if (a !== null) {
                o = i.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      (u = nt(-1, n & -n)), (u.tag = 2);
                      var d = i.updateQueue;
                      if (d !== null) {
                        d = d.shared;
                        var c = d.pending;
                        c === null ? (u.next = u) : ((u.next = c.next), (c.next = u)),
                          (d.pending = u);
                      }
                    }
                    (i.lanes |= n),
                      (u = i.alternate),
                      u !== null && (u.lanes |= n),
                      $i(i.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(k(341));
                (o.lanes |= n),
                  (a = o.alternate),
                  a !== null && (a.lanes |= n),
                  $i(o, n, t),
                  (o = i.sibling);
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    (i.return = o.return), (o = i);
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        de(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        Nn(t, n),
        (l = Re(l)),
        (r = r(l)),
        (t.flags |= 1),
        de(e, t, r, n),
        t.child
      );
    case 14:
      return (r = t.type), (l = Fe(r, t.pendingProps)), (l = Fe(r.type, l)), mu(e, t, r, l, n);
    case 15:
      return Qd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Fe(r, l)),
        pl(e, t),
        (t.tag = 1),
        ve(r) ? ((e = !0), Ll(t)) : (e = !1),
        Nn(t, n),
        jd(t, r, l),
        Mi(t, r, l, n),
        Hi(null, t, r, !0, e, n)
      );
    case 19:
      return qd(e, t, n);
    case 22:
      return Kd(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function pf(e, t) {
  return zc(e, t);
}
function bh(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Pe(e, t, n, r) {
  return new bh(e, t, n, r);
}
function na(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Ch(e) {
  if (typeof e == 'function') return na(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === jo)) return 11;
    if (e === No) return 14;
  }
  return 2;
}
function Ot(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Pe(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null
        ? null
        : {
            lanes: t.lanes,
            firstContext: t.firstContext,
          }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function gl(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e == 'function')) na(e) && (o = 1);
  else if (typeof e == 'string') o = 5;
  else
    e: switch (e) {
      case on:
        return Qt(n.children, l, i, t);
      case wo:
        (o = 8), (l |= 8);
        break;
      case ci:
        return (e = Pe(12, n, t, l | 2)), (e.elementType = ci), (e.lanes = i), e;
      case di:
        return (e = Pe(13, n, t, l)), (e.elementType = di), (e.lanes = i), e;
      case fi:
        return (e = Pe(19, n, t, l)), (e.elementType = fi), (e.lanes = i), e;
      case Nc:
        return ds(n, l, i, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case wc:
              o = 10;
              break e;
            case jc:
              o = 9;
              break e;
            case jo:
              o = 11;
              break e;
            case No:
              o = 14;
              break e;
            case pt:
              (o = 16), (r = null);
              break e;
          }
        throw Error(k(130, e == null ? e : typeof e, ''));
    }
  return (t = Pe(o, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = i), t;
}
function Qt(e, t, n, r) {
  return (e = Pe(7, e, r, t)), (e.lanes = n), e;
}
function ds(e, t, n, r) {
  return (
    (e = Pe(22, e, r, t)), (e.elementType = Nc), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e
  );
}
function ti(e, t, n) {
  return (e = Pe(6, e, null, t)), (e.lanes = n), e;
}
function ni(e, t, n) {
  return (
    (t = Pe(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Dh(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Fs(0)),
    (this.expirationTimes = Fs(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Fs(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function ra(e, t, n, r, l, i, o, a, u) {
  return (
    (e = new Dh(e, t, n, a, u)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Pe(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Mo(i),
    e
  );
}
function Oh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: sn,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function hf(e) {
  if (!e) return _t;
  e = e._reactInternals;
  e: {
    if (Zt(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return md(e, n, t);
  }
  return t;
}
function xf(e, t, n, r, l, i, o, a, u) {
  return (
    (e = ra(n, r, !0, e, l, i, o, a, u)),
    (e.context = hf(null)),
    (n = e.current),
    (r = fe()),
    (l = Dt(n)),
    (i = nt(r, l)),
    (i.callback = t ?? null),
    bt(n, i, l),
    (e.current.lanes = l),
    Dr(e, l, r),
    ye(e, r),
    e
  );
}
function fs(e, t, n, r) {
  var l = t.current,
    i = fe(),
    o = Dt(l);
  return (
    (n = hf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = nt(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = bt(l, t, o)),
    e !== null && (Be(e, l, o, i), dl(e, l, o)),
    o
  );
}
function Kl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Eu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function la(e, t) {
  Eu(e, t), (e = e.alternate) && Eu(e, t);
}
function Ph() {
  return null;
}
var gf =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function sa(e) {
  this._internalRoot = e;
}
ms.prototype.render = sa.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  fs(e, t, null, null);
};
ms.prototype.unmount = sa.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    qt(function () {
      fs(null, e, null, null);
    }),
      (t[st] = null);
  }
};
function ms(e) {
  this._internalRoot = e;
}
ms.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Qc();
    e = {
      blockedOn: null,
      target: e,
      priority: t,
    };
    for (var n = 0; n < xt.length && t !== 0 && t < xt[n].priority; n++);
    xt.splice(n, 0, e), n === 0 && Gc(e);
  }
};
function ia(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ps(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function bu() {}
function Th(e, t, n, r, l) {
  if (l) {
    if (typeof r == 'function') {
      var i = r;
      r = function () {
        var d = Kl(o);
        i.call(d);
      };
    }
    var o = xf(t, r, e, 0, null, !1, !1, '', bu);
    return (
      (e._reactRootContainer = o),
      (e[st] = o.current),
      hr(e.nodeType === 8 ? e.parentNode : e),
      qt(),
      o
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == 'function') {
    var a = r;
    r = function () {
      var d = Kl(u);
      a.call(d);
    };
  }
  var u = ra(e, 0, !1, null, null, !1, !1, '', bu);
  return (
    (e._reactRootContainer = u),
    (e[st] = u.current),
    hr(e.nodeType === 8 ? e.parentNode : e),
    qt(function () {
      fs(t, u, n, r);
    }),
    u
  );
}
function hs(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == 'function') {
      var a = l;
      l = function () {
        var u = Kl(o);
        a.call(u);
      };
    }
    fs(t, o, e, l);
  } else o = Th(n, t, e, l, r);
  return Kl(o);
}
Wc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Yn(t.pendingLanes);
        n !== 0 && (Eo(t, n | 1), ye(t, J()), !(I & 6) && ((Pn = J() + 500), Ft()));
      }
      break;
    case 13:
      qt(function () {
        var r = it(e, 1);
        if (r !== null) {
          var l = fe();
          Be(r, e, 1, l);
        }
      }),
        la(e, 1);
  }
};
bo = function (e) {
  if (e.tag === 13) {
    var t = it(e, 134217728);
    if (t !== null) {
      var n = fe();
      Be(t, e, 134217728, n);
    }
    la(e, 134217728);
  }
};
Vc = function (e) {
  if (e.tag === 13) {
    var t = Dt(e),
      n = it(e, t);
    if (n !== null) {
      var r = fe();
      Be(n, e, t, r);
    }
    la(e, t);
  }
};
Qc = function () {
  return $;
};
Kc = function (e, t) {
  var n = $;
  try {
    return ($ = e), t();
  } finally {
    $ = n;
  }
};
Ni = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((hi(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ss(r);
            if (!l) throw Error(k(90));
            kc(r), hi(r, l);
          }
        }
      }
      break;
    case 'textarea':
      bc(e, n);
      break;
    case 'select':
      (t = n.value), t != null && vn(e, !!n.multiple, t, !1);
  }
};
Rc = Zo;
Lc = qt;
var _h = {
    usingClientEntryPoint: !1,
    Events: [Pr, dn, ss, Tc, _c, Zo],
  },
  Qn = {
    findFiberByHostInstance: Ut,
    bundleType: 0,
    version: '18.2.0',
    rendererPackageName: 'react-dom',
  },
  Rh = {
    bundleType: Qn.bundleType,
    version: Qn.version,
    rendererPackageName: Qn.rendererPackageName,
    rendererConfig: Qn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ct.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Ic(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Qn.findFiberByHostInstance || Ph,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var nl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!nl.isDisabled && nl.supportsFiber)
    try {
      (ts = nl.inject(Rh)), (Ke = nl);
    } catch {}
}
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _h;
be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ia(t)) throw Error(k(200));
  return Oh(e, t, null, n);
};
be.createRoot = function (e, t) {
  if (!ia(e)) throw Error(k(299));
  var n = !1,
    r = '',
    l = gf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = ra(e, 1, !1, null, null, n, !1, r, l)),
    (e[st] = t.current),
    hr(e.nodeType === 8 ? e.parentNode : e),
    new sa(t)
  );
};
be.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(k(188))
      : ((e = Object.keys(e).join(',')), Error(k(268, e)));
  return (e = Ic(t)), (e = e === null ? null : e.stateNode), e;
};
be.flushSync = function (e) {
  return qt(e);
};
be.hydrate = function (e, t, n) {
  if (!ps(t)) throw Error(k(200));
  return hs(null, e, t, !0, n);
};
be.hydrateRoot = function (e, t, n) {
  if (!ia(e)) throw Error(k(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = '',
    o = gf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = xf(t, null, e, 1, n ?? null, l, !1, i, o)),
    (e[st] = t.current),
    hr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new ms(t);
};
be.render = function (e, t, n) {
  if (!ps(t)) throw Error(k(200));
  return hs(null, e, t, !1, n);
};
be.unmountComponentAtNode = function (e) {
  if (!ps(e)) throw Error(k(40));
  return e._reactRootContainer
    ? (qt(function () {
        hs(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[st] = null);
        });
      }),
      !0)
    : !1;
};
be.unstable_batchedUpdates = Zo;
be.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ps(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return hs(e, t, n, !1, r);
};
be.version = '18.2.0-next-9e3b772b8-20220608';
function vf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vf);
    } catch (e) {
      console.error(e);
    }
}
vf(), (hc.exports = be);
var Lh = hc.exports,
  Cu = Lh;
(ai.createRoot = Cu.createRoot), (ai.hydrateRoot = Cu.hydrateRoot);
/**
 * @remix-run/router v1.15.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function kr() {
  return (
    (kr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    kr.apply(this, arguments)
  );
}
var jt;
(function (e) {
  (e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE');
})(jt || (jt = {}));
const Du = 'popstate';
function Ah(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: i, search: o, hash: a } = r.location;
    return to(
      '',
      {
        pathname: i,
        search: o,
        hash: a,
      },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || 'default'
    );
  }
  function n(r, l) {
    return typeof l == 'string' ? l : Gl(l);
  }
  return Ih(t, n, null, e);
}
function q(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function yf(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Fh() {
  return Math.random().toString(36).substr(2, 8);
}
function Ou(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
  };
}
function to(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    kr(
      {
        pathname: typeof e == 'string' ? e : e.pathname,
        search: '',
        hash: '',
      },
      typeof t == 'string' ? Fn(t) : t,
      {
        state: n,
        key: (t && t.key) || r || Fh(),
      }
    )
  );
}
function Gl(e) {
  let { pathname: t = '/', search: n = '', hash: r = '' } = e;
  return (
    n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n),
    r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r),
    t
  );
}
function Fn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf('?');
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))), e && (t.pathname = e);
  }
  return t;
}
function Ih(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: i = !1 } = r,
    o = l.history,
    a = jt.Pop,
    u = null,
    d = c();
  d == null && ((d = 0), o.replaceState(kr({}, o.state, { idx: d }), ''));
  function c() {
    return (o.state || { idx: null }).idx;
  }
  function f() {
    a = jt.Pop;
    let j = c(),
      p = j == null ? null : j - d;
    (d = j),
      u &&
        u({
          action: a,
          location: x.location,
          delta: p,
        });
  }
  function h(j, p) {
    a = jt.Push;
    let m = to(x.location, j, p);
    n && n(m, j), (d = c() + 1);
    let g = Ou(m, d),
      N = x.createHref(m);
    try {
      o.pushState(g, '', N);
    } catch (E) {
      if (E instanceof DOMException && E.name === 'DataCloneError') throw E;
      l.location.assign(N);
    }
    i &&
      u &&
      u({
        action: a,
        location: x.location,
        delta: 1,
      });
  }
  function y(j, p) {
    a = jt.Replace;
    let m = to(x.location, j, p);
    n && n(m, j), (d = c());
    let g = Ou(m, d),
      N = x.createHref(m);
    o.replaceState(g, '', N),
      i &&
        u &&
        u({
          action: a,
          location: x.location,
          delta: 0,
        });
  }
  function v(j) {
    let p = l.location.origin !== 'null' ? l.location.origin : l.location.href,
      m = typeof j == 'string' ? j : Gl(j);
    return (
      (m = m.replace(/ $/, '%20')),
      q(p, 'No window.location.(origin|href) available to create URL for href: ' + m),
      new URL(m, p)
    );
  }
  let x = {
    get action() {
      return a;
    },
    get location() {
      return e(l, o);
    },
    listen(j) {
      if (u) throw new Error('A history only accepts one active listener');
      return (
        l.addEventListener(Du, f),
        (u = j),
        () => {
          l.removeEventListener(Du, f), (u = null);
        }
      );
    },
    createHref(j) {
      return t(l, j);
    },
    createURL: v,
    encodeLocation(j) {
      let p = v(j);
      return {
        pathname: p.pathname,
        search: p.search,
        hash: p.hash,
      };
    },
    push: h,
    replace: y,
    go(j) {
      return o.go(j);
    },
  };
  return x;
}
var Pu;
(function (e) {
  (e.data = 'data'), (e.deferred = 'deferred'), (e.redirect = 'redirect'), (e.error = 'error');
})(Pu || (Pu = {}));
function $h(e, t, n) {
  n === void 0 && (n = '/');
  let r = typeof t == 'string' ? Fn(t) : t,
    l = oa(r.pathname || '/', n);
  if (l == null) return null;
  let i = wf(e);
  zh(i);
  let o = null;
  for (let a = 0; o == null && a < i.length; ++a) {
    let u = qh(l);
    o = Gh(i[a], u);
  }
  return o;
}
function wf(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = '');
  let l = (i, o, a) => {
    let u = {
      relativePath: a === void 0 ? i.path || '' : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i,
    };
    u.relativePath.startsWith('/') &&
      (q(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let d = Pt([r, u.relativePath]),
      c = n.concat(u);
    i.children &&
      i.children.length > 0 &&
      (q(
        i.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + d + '".')
      ),
      wf(i.children, t, c, d)),
      !(i.path == null && !i.index) &&
        t.push({
          path: d,
          score: Qh(d, i.index),
          routesMeta: c,
        });
  };
  return (
    e.forEach((i, o) => {
      var a;
      if (i.path === '' || !((a = i.path) != null && a.includes('?'))) l(i, o);
      else for (let u of jf(i.path)) l(i, o, u);
    }),
    t
  );
}
function jf(e) {
  let t = e.split('/');
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith('?'),
    i = n.replace(/\?$/, '');
  if (r.length === 0) return l ? [i, ''] : [i];
  let o = jf(r.join('/')),
    a = [];
  return (
    a.push(...o.map(u => (u === '' ? i : [i, u].join('/')))),
    l && a.push(...o),
    a.map(u => (e.startsWith('/') && u === '' ? '/' : u))
  );
}
function zh(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Kh(
          t.routesMeta.map(r => r.childrenIndex),
          n.routesMeta.map(r => r.childrenIndex)
        )
  );
}
const Mh = /^:[\w-]+$/,
  Bh = 3,
  Uh = 2,
  Hh = 1,
  Wh = 10,
  Vh = -2,
  Tu = e => e === '*';
function Qh(e, t) {
  let n = e.split('/'),
    r = n.length;
  return (
    n.some(Tu) && (r += Vh),
    t && (r += Uh),
    n.filter(l => !Tu(l)).reduce((l, i) => l + (Mh.test(i) ? Bh : i === '' ? Hh : Wh), r)
  );
}
function Kh(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Gh(e, t) {
  let { routesMeta: n } = e,
    r = {},
    l = '/',
    i = [];
  for (let o = 0; o < n.length; ++o) {
    let a = n[o],
      u = o === n.length - 1,
      d = l === '/' ? t : t.slice(l.length) || '/',
      c = Jh(
        {
          path: a.relativePath,
          caseSensitive: a.caseSensitive,
          end: u,
        },
        d
      );
    if (!c) return null;
    Object.assign(r, c.params);
    let f = a.route;
    i.push({
      params: r,
      pathname: Pt([l, c.pathname]),
      pathnameBase: tx(Pt([l, c.pathnameBase])),
      route: f,
    }),
      c.pathnameBase !== '/' && (l = Pt([l, c.pathnameBase]));
  }
  return i;
}
function Jh(e, t) {
  typeof e == 'string' &&
    (e = {
      path: e,
      caseSensitive: !1,
      end: !0,
    });
  let [n, r] = Yh(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let i = l[0],
    o = i.replace(/(.)\/+$/, '$1'),
    a = l.slice(1);
  return {
    params: r.reduce((d, c, f) => {
      let { paramName: h, isOptional: y } = c;
      if (h === '*') {
        let x = a[f] || '';
        o = i.slice(0, i.length - x.length).replace(/(.)\/+$/, '$1');
      }
      const v = a[f];
      return y && !v ? (d[h] = void 0) : (d[h] = (v || '').replace(/%2F/g, '/')), d;
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e,
  };
}
function Yh(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    yf(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".')
    );
  let r = [],
    l =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, a, u) => (
            r.push({
              paramName: a,
              isOptional: u != null,
            }),
            u ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        );
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }), (l += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (l += '\\/*$')
        : e !== '' && e !== '/' && (l += '(?:(?=\\/|$))'),
    [new RegExp(l, t ? void 0 : 'i'), r]
  );
}
function qh(e) {
  try {
    return e
      .split('/')
      .map(t => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/');
  } catch (t) {
    return (
      yf(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + t + ').')
      ),
      e
    );
  }
}
function oa(e, t) {
  if (t === '/') return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== '/' ? null : e.slice(n) || '/';
}
function Xh(e, t) {
  t === void 0 && (t = '/');
  let { pathname: n, search: r = '', hash: l = '' } = typeof e == 'string' ? Fn(e) : e;
  return {
    pathname: n ? (n.startsWith('/') ? n : Zh(n, t)) : t,
    search: nx(r),
    hash: rx(l),
  };
}
function Zh(e, t) {
  let n = t.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach(l => {
      l === '..' ? n.length > 1 && n.pop() : l !== '.' && n.push(l);
    }),
    n.length > 1 ? n.join('/') : '/'
  );
}
function ri(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' + t + '` field [' + JSON.stringify(r) + '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function ex(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0));
}
function Nf(e, t) {
  let n = ex(e);
  return t
    ? n.map((r, l) => (l === e.length - 1 ? r.pathname : r.pathnameBase))
    : n.map(r => r.pathnameBase);
}
function Sf(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == 'string'
    ? (l = Fn(e))
    : ((l = kr({}, e)),
      q(!l.pathname || !l.pathname.includes('?'), ri('?', 'pathname', 'search', l)),
      q(!l.pathname || !l.pathname.includes('#'), ri('#', 'pathname', 'hash', l)),
      q(!l.search || !l.search.includes('#'), ri('#', 'search', 'hash', l)));
  let i = e === '' || l.pathname === '',
    o = i ? '/' : l.pathname,
    a;
  if (o == null) a = n;
  else {
    let f = t.length - 1;
    if (!r && o.startsWith('..')) {
      let h = o.split('/');
      for (; h[0] === '..'; ) h.shift(), (f -= 1);
      l.pathname = h.join('/');
    }
    a = f >= 0 ? t[f] : '/';
  }
  let u = Xh(l, a),
    d = o && o !== '/' && o.endsWith('/'),
    c = (i || o === '.') && n.endsWith('/');
  return !u.pathname.endsWith('/') && (d || c) && (u.pathname += '/'), u;
}
const Pt = e => e.join('/').replace(/\/\/+/g, '/'),
  tx = e => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  nx = e => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  rx = e => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e);
function lx(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  );
}
const kf = ['post', 'put', 'patch', 'delete'];
new Set(kf);
const sx = ['get', ...kf];
new Set(sx);
/**
 * React Router v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Er() {
  return (
    (Er = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Er.apply(this, arguments)
  );
}
const aa = w.createContext(null),
  ix = w.createContext(null),
  en = w.createContext(null),
  xs = w.createContext(null),
  tn = w.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1,
  }),
  Ef = w.createContext(null);
function ox(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  _r() || q(!1);
  let { basename: r, navigator: l } = w.useContext(en),
    { hash: i, pathname: o, search: a } = Df(e, { relative: n }),
    u = o;
  return (
    r !== '/' && (u = o === '/' ? r : Pt([r, o])),
    l.createHref({
      pathname: u,
      search: a,
      hash: i,
    })
  );
}
function _r() {
  return w.useContext(xs) != null;
}
function gs() {
  return _r() || q(!1), w.useContext(xs).location;
}
function bf(e) {
  w.useContext(en).static || w.useLayoutEffect(e);
}
function Cf() {
  let { isDataRoute: e } = w.useContext(tn);
  return e ? wx() : ax();
}
function ax() {
  _r() || q(!1);
  let e = w.useContext(aa),
    { basename: t, future: n, navigator: r } = w.useContext(en),
    { matches: l } = w.useContext(tn),
    { pathname: i } = gs(),
    o = JSON.stringify(Nf(l, n.v7_relativeSplatPath)),
    a = w.useRef(!1);
  return (
    bf(() => {
      a.current = !0;
    }),
    w.useCallback(
      function (d, c) {
        if ((c === void 0 && (c = {}), !a.current)) return;
        if (typeof d == 'number') {
          r.go(d);
          return;
        }
        let f = Sf(d, JSON.parse(o), i, c.relative === 'path');
        e == null && t !== '/' && (f.pathname = f.pathname === '/' ? t : Pt([t, f.pathname])),
          (c.replace ? r.replace : r.push)(f, c.state, c);
      },
      [t, r, o, i, e]
    )
  );
}
function Df(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = w.useContext(en),
    { matches: l } = w.useContext(tn),
    { pathname: i } = gs(),
    o = JSON.stringify(Nf(l, r.v7_relativeSplatPath));
  return w.useMemo(() => Sf(e, JSON.parse(o), i, n === 'path'), [e, o, i, n]);
}
function ux(e, t) {
  return cx(e, t);
}
function cx(e, t, n, r) {
  _r() || q(!1);
  let { navigator: l } = w.useContext(en),
    { matches: i } = w.useContext(tn),
    o = i[i.length - 1],
    a = o ? o.params : {};
  o && o.pathname;
  let u = o ? o.pathnameBase : '/';
  o && o.route;
  let d = gs(),
    c;
  if (t) {
    var f;
    let j = typeof t == 'string' ? Fn(t) : t;
    u === '/' || ((f = j.pathname) != null && f.startsWith(u)) || q(!1), (c = j);
  } else c = d;
  let h = c.pathname || '/',
    y = h;
  if (u !== '/') {
    let j = u.replace(/^\//, '').split('/');
    y = '/' + h.replace(/^\//, '').split('/').slice(j.length).join('/');
  }
  let v = $h(e, { pathname: y }),
    x = hx(
      v &&
        v.map(j =>
          Object.assign({}, j, {
            params: Object.assign({}, a, j.params),
            pathname: Pt([
              u,
              l.encodeLocation ? l.encodeLocation(j.pathname).pathname : j.pathname,
            ]),
            pathnameBase:
              j.pathnameBase === '/'
                ? u
                : Pt([
                    u,
                    l.encodeLocation ? l.encodeLocation(j.pathnameBase).pathname : j.pathnameBase,
                  ]),
          })
        ),
      i,
      n,
      r
    );
  return t && x
    ? w.createElement(
        xs.Provider,
        {
          value: {
            location: Er(
              {
                pathname: '/',
                search: '',
                hash: '',
                state: null,
                key: 'default',
              },
              c
            ),
            navigationType: jt.Pop,
          },
        },
        x
      )
    : x;
}
function dx() {
  let e = yx(),
    t = lx(e) ? e.status + ' ' + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = {
      padding: '0.5rem',
      backgroundColor: 'rgba(200,200,200, 0.5)',
    };
  return w.createElement(
    w.Fragment,
    null,
    w.createElement('h2', null, 'Unexpected Application Error!'),
    w.createElement(
      'h3',
      {
        style: { fontStyle: 'italic' },
      },
      t
    ),
    n ? w.createElement('pre', { style: l }, n) : null,
    null
  );
}
const fx = w.createElement(dx, null);
class mx extends w.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || (n.revalidation !== 'idle' && t.revalidation === 'idle')
      ? {
          error: t.error,
          location: t.location,
          revalidation: t.revalidation,
        }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error('React Router caught the following error during render', t, n);
  }
  render() {
    return this.state.error !== void 0
      ? w.createElement(
          tn.Provider,
          {
            value: this.props.routeContext,
          },
          w.createElement(Ef.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function px(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = w.useContext(aa);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    w.createElement(tn.Provider, { value: t }, r)
  );
}
function hx(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null)
  ) {
    var i;
    if ((i = n) != null && i.errors) e = n.matches;
    else return null;
  }
  let o = e,
    a = (l = n) == null ? void 0 : l.errors;
  if (a != null) {
    let c = o.findIndex(f => f.route.id && (a == null ? void 0 : a[f.route.id]));
    c >= 0 || q(!1), (o = o.slice(0, Math.min(o.length, c + 1)));
  }
  let u = !1,
    d = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < o.length; c++) {
      let f = o[c];
      if (((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (d = c), f.route.id)) {
        let { loaderData: h, errors: y } = n,
          v = f.route.loader && h[f.route.id] === void 0 && (!y || y[f.route.id] === void 0);
        if (f.route.lazy || v) {
          (u = !0), d >= 0 ? (o = o.slice(0, d + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((c, f, h) => {
    let y,
      v = !1,
      x = null,
      j = null;
    n &&
      ((y = a && f.route.id ? a[f.route.id] : void 0),
      (x = f.route.errorElement || fx),
      u &&
        (d < 0 && h === 0
          ? (jx('route-fallback', !1), (v = !0), (j = null))
          : d === h && ((v = !0), (j = f.route.hydrateFallbackElement || null))));
    let p = t.concat(o.slice(0, h + 1)),
      m = () => {
        let g;
        return (
          y
            ? (g = x)
            : v
              ? (g = j)
              : f.route.Component
                ? (g = w.createElement(f.route.Component, null))
                : f.route.element
                  ? (g = f.route.element)
                  : (g = c),
          w.createElement(px, {
            match: f,
            routeContext: {
              outlet: c,
              matches: p,
              isDataRoute: n != null,
            },
            children: g,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || h === 0)
      ? w.createElement(mx, {
          location: n.location,
          revalidation: n.revalidation,
          component: x,
          error: y,
          children: m(),
          routeContext: {
            outlet: null,
            matches: p,
            isDataRoute: !0,
          },
        })
      : m();
  }, null);
}
var Of = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    );
  })(Of || {}),
  Jl = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    );
  })(Jl || {});
function xx(e) {
  let t = w.useContext(aa);
  return t || q(!1), t;
}
function gx(e) {
  let t = w.useContext(ix);
  return t || q(!1), t;
}
function vx(e) {
  let t = w.useContext(tn);
  return t || q(!1), t;
}
function Pf(e) {
  let t = vx(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || q(!1), n.route.id;
}
function yx() {
  var e;
  let t = w.useContext(Ef),
    n = gx(Jl.UseRouteError),
    r = Pf(Jl.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function wx() {
  let { router: e } = xx(Of.UseNavigateStable),
    t = Pf(Jl.UseNavigateStable),
    n = w.useRef(!1);
  return (
    bf(() => {
      n.current = !0;
    }),
    w.useCallback(
      function (l, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof l == 'number' ? e.navigate(l) : e.navigate(l, Er({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
const _u = {};
function jx(e, t, n) {
  !t && !_u[e] && (_u[e] = !0);
}
function ze(e) {
  q(!1);
}
function Nx(e) {
  let {
    basename: t = '/',
    children: n = null,
    location: r,
    navigationType: l = jt.Pop,
    navigator: i,
    static: o = !1,
    future: a,
  } = e;
  _r() && q(!1);
  let u = t.replace(/^\/*/, '/'),
    d = w.useMemo(
      () => ({
        basename: u,
        navigator: i,
        static: o,
        future: Er({ v7_relativeSplatPath: !1 }, a),
      }),
      [u, a, i, o]
    );
  typeof r == 'string' && (r = Fn(r));
  let { pathname: c = '/', search: f = '', hash: h = '', state: y = null, key: v = 'default' } = r,
    x = w.useMemo(() => {
      let j = oa(c, u);
      return j == null
        ? null
        : {
            location: {
              pathname: j,
              search: f,
              hash: h,
              state: y,
              key: v,
            },
            navigationType: l,
          };
    }, [u, c, f, h, y, v, l]);
  return x == null
    ? null
    : w.createElement(
        en.Provider,
        { value: d },
        w.createElement(xs.Provider, {
          children: n,
          value: x,
        })
      );
}
function ua(e) {
  let { children: t, location: n } = e;
  return ux(no(t), n);
}
new Promise(() => {});
function no(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    w.Children.forEach(e, (r, l) => {
      if (!w.isValidElement(r)) return;
      let i = [...t, l];
      if (r.type === w.Fragment) {
        n.push.apply(n, no(r.props.children, i));
        return;
      }
      r.type !== ze && q(!1), !r.props.index || !r.props.children || q(!1);
      let o = {
        id: r.props.id || i.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (o.children = no(r.props.children, i)), n.push(o);
    }),
    n
  );
}
/**
 * React Router DOM v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ro() {
  return (
    (ro = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ro.apply(this, arguments)
  );
}
function Sx(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    i;
  for (i = 0; i < r.length; i++) (l = r[i]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function kx(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ex(e, t) {
  return e.button === 0 && (!t || t === '_self') && !kx(e);
}
const bx = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'unstable_viewTransition',
  ],
  Cx = '6';
try {
  window.__reactRouterVersion = Cx;
} catch {}
const Dx = 'startTransition',
  Ru = km[Dx];
function Ox(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    i = w.useRef();
  i.current == null &&
    (i.current = Ah({
      window: l,
      v5Compat: !0,
    }));
  let o = i.current,
    [a, u] = w.useState({
      action: o.action,
      location: o.location,
    }),
    { v7_startTransition: d } = r || {},
    c = w.useCallback(
      f => {
        d && Ru ? Ru(() => u(f)) : u(f);
      },
      [u, d]
    );
  return (
    w.useLayoutEffect(() => o.listen(c), [o, c]),
    w.createElement(Nx, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: o,
      future: r,
    })
  );
}
const Px =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  Tx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Tf = w.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: i,
        replace: o,
        state: a,
        target: u,
        to: d,
        preventScrollReset: c,
        unstable_viewTransition: f,
      } = t,
      h = Sx(t, bx),
      { basename: y } = w.useContext(en),
      v,
      x = !1;
    if (typeof d == 'string' && Tx.test(d) && ((v = d), Px))
      try {
        let g = new URL(window.location.href),
          N = d.startsWith('//') ? new URL(g.protocol + d) : new URL(d),
          E = oa(N.pathname, y);
        N.origin === g.origin && E != null ? (d = E + N.search + N.hash) : (x = !0);
      } catch {}
    let j = ox(d, { relative: l }),
      p = _x(d, {
        replace: o,
        state: a,
        target: u,
        preventScrollReset: c,
        relative: l,
        unstable_viewTransition: f,
      });
    function m(g) {
      r && r(g), g.defaultPrevented || p(g);
    }
    return w.createElement(
      'a',
      ro({}, h, {
        href: v || j,
        onClick: x || i ? r : m,
        ref: n,
        target: u,
      })
    );
  });
var Lu;
(function (e) {
  (e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState');
})(Lu || (Lu = {}));
var Au;
(function (e) {
  (e.UseFetcher = 'useFetcher'),
    (e.UseFetchers = 'useFetchers'),
    (e.UseScrollRestoration = 'useScrollRestoration');
})(Au || (Au = {}));
function _x(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: i,
      relative: o,
      unstable_viewTransition: a,
    } = t === void 0 ? {} : t,
    u = Cf(),
    d = gs(),
    c = Df(e, { relative: o });
  return w.useCallback(
    f => {
      if (Ex(f, n)) {
        f.preventDefault();
        let h = r !== void 0 ? r : Gl(d) === Gl(c);
        u(e, {
          replace: h,
          state: l,
          preventScrollReset: i,
          relative: o,
          unstable_viewTransition: a,
        });
      }
    },
    [d, u, c, r, l, n, e, i, o, a]
  );
}
const Rx = '/assets/truck-gvNkDIQ7.jpg',
  rl = ({ title: e, description: t, img: n, isLast: r }) => {
    const l = r ? '' : 'md:border-r border-black';
    return s.jsxs('div', {
      className: `md:bg-cayen-900 p-4 ${l}`,
      children: [
        s.jsx('img', {
          src: n,
          className: 'h-6 w-auto md:h-8 filter invert hue-rotate-180 saturate-150',
          alt: 'Logo',
        }),
        ' ',
        s.jsx('h2', {
          className: 'text-med md:text-lg text-yellow-500 font-semibold',
          children: e,
        }),
        s.jsx('p', {
          className: 'mt-1 text-sm md:mt-2 text-yellow-600',
          children: t,
        }),
      ],
    });
  },
  Lx = '/assets/contract-BwN3mKZE.png',
  Ax = '/assets/schedule-B1_PUfGe.png',
  Fx = '/assets/dictionary--bjx419J.png',
  Ix = '/assets/workschedule-P9IlwVY4.png',
  $x = () =>
    s.jsx('div', {
      className: 'flex justify-center bg-gray-800 p-6 ',
      children: s.jsxs('div', {
        className: 'flex flex-col md:flex-row ',
        children: [
          s.jsx(rl, {
            img: Lx,
            title: 'FMCSA Certified',
            description:
              ' Ensuring compliance with Federal Motor Carrier Safety Administration standards, guaranteeing safety and reliability.',
          }),
          s.jsx(rl, {
            img: Ax,
            title: 'Priority Scheduling',
            description:
              ' Offering expedited scheduling services to prioritize your needs and ensure efficient planning.',
          }),
          s.jsx(rl, {
            img: Fx,
            title: 'Bilingual Instructors',
            description:
              'Providing instructors fluent in multiple languages for enhanced accessibility and understanding.',
          }),
          s.jsx(rl, {
            img: Ix,
            title: 'Flexible Hours',
            description:
              'Offering adaptable scheduling options to accommodate diverse schedules and preferences.',
            isLast: !0,
          }),
        ],
      }),
    }),
  zx = '/assets/yard-CQu6ujRu.jpg',
  Mx = () =>
    s.jsxs('div', {
      className: 'md:flex p-4 w-auto h-100 bg-slate-100',
      id: 'aboutus',
      children: [
        s.jsx('div', {
          className: 'md:w-1/2 p-4 flex flex-col items-center ',
          children: s.jsxs('div', {
            className: 'md:w-4/6 flex flex-col items-center ',
            children: [
              s.jsx('h2', {
                className: 'text-2xl text-yellow-500 md:text-yellow-500 md:text-5xl font-bold pb-4',
                style: {
                  borderBottom: '1px solid',
                  borderImage:
                    'linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1',
                },
                children: 'About Us:',
              }),
              s.jsx('p', {
                className:
                  'text-sm text-yellow-600 md:text-yellow-600 md:text-xl pt-2 md:leading-[2] ',
                children:
                  "At ASERE Drivers, we're dedicated to delivering top-notch CDL Training services. With a focus on innovation and customer satisfaction, we strive to exceed expectations every time. Founded in 2008, we've quickly become a trusted industry provider, known for our excelent service and high graduation rate. Our team is passionate about providing the best training possible. From CLP to becoming your own boss, we're committed to providing exceptional results. Thank you for choosing Asere Drivers. We look forward to serving you!",
              }),
            ],
          }),
        }),
        s.jsx('div', {
          className: ' md:w-1/2 flex justify-center',
          children: s.jsx('img', {
            src: zx,
            className: 'flex w-4/6  m-4 rounded-lg ',
            alt: 'Truck',
          }),
        }),
      ],
    }),
  ft = ({ title: e, answer: t }) => {
    const [n, r] = w.useState(!1);
    return s.jsxs('div', {
      className: ' w-auto border accordion-item bg-white mb-4  p-2 md:p-4 rounded-lg',
      children: [
        s.jsxs('button', {
          onClick: () => r(!n),
          className: 'flex justify-between w-full',
          children: [
            s.jsx('span', {
              className: 'text-sm md:text-lg text-yellow-600 font-bold',
              children: e,
            }),
            s.jsxs('svg', {
              className: 'fill-yellow-600 shrink-0 ml-8',
              width: '16',
              height: '16',
              xmlns: 'http://www.w3.org/2000/svg',
              children: [
                s.jsx('rect', {
                  y: '7',
                  width: '16',
                  height: '2',
                  rx: '1',
                  className: `transform origin-center transition duration-200 ease-out ${n && '!rotate-180'}`,
                }),
                s.jsx('rect', {
                  y: '7',
                  width: '16',
                  height: '2',
                  rx: '1',
                  className: `transform origin-center rotate-90 transition duration-200 ease-out ${n && '!rotate-180'}`,
                }),
              ],
            }),
          ],
        }),
        s.jsx('div', {
          className: `grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${n ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`,
          children: s.jsx('div', {
            className: 'overflow-hidden text-yellow-800 font-bold',
            children: t,
          }),
        }),
      ],
    });
  },
  Bx = () =>
    s.jsxs('div', {
      className: 'bg-gray-800 flex  flex-col justify-center pt-8',
      id: 'faq',
      children: [
        s.jsx('h2', {
          className: 'text-2xl text-yellow-500 md:text-5xl flex justify-center  pb-4',
          style: {
            borderBottom: '1px solid',
            borderImage: 'linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1',
          },
          children: 'FAQs:',
        }),
        s.jsx('div', {
          className: 'accordion',
          id: 'faq',
          children: s.jsxs('div', {
            className: ' p-2 md:p-40 md:pt-16',
            children: [
              s.jsx(ft, {
                title: 'What would be the first step in getting my CDL?',
                answer: `A. First would be signing up with a credited FMSCA certified school. The school should show up on the FMSCA training provider registry link. \r
            There's thousands of schools find the one that best suits your needs.`,
              }),
              s.jsx(ft, {
                title: 'What does the cost of tuition cover?',
                answer: `A: The cost of tuition is $4,000 for Standard and $3000 for Automatic. The cost of the tuituon covers the study material for CLP, the required training, ELDT Certification, \r
            and the first rental of the truck. The study material is \r
            a 100% pass at the DPS. The rest of the tuition goes to the guaranteed Monday through Saturday practice hours. You pay a flat fee to drive everyday, at least 1 hour daily, \r
            6 days a week. Also covers the ELDT course you have to take in order to obtain your CDL license. Lastly, included in the cost, is the first rental of the truck to the DPS. \r
            Any time after is a separate rental fee.`,
              }),
              s.jsx(ft, {
                title: 'What is this new ELDT course I have to take?',
                answer: `ELDT stands for ENTRY- LEVEL- DRIVER- TRAINING. Its an online course you take before your required hours of training. We send you a direct link. \r
            You can take the course from the comfort of your home. It's a series of videos, reading material, and pop quizzes. It informs you of basic safety guidelines you should be aware of.\r
            Without the ELDT certification the DPS does not allow you to take the driving exam.`,
              }),
              s.jsx(ft, {
                title: 'I want to get started with ASERE Drivers. What documents do I need?',
                answer: `A. The sign up process is in person. We only require a valid Texas Driver's License. You sign an enrollment agreement and we only require a initial fee which goes \r
            towards your tuition. From there we give you the study material to take home and memorize.`,
              }),
              s.jsx(ft, {
                title: "I've studied all the material do I go to the office to take my test?",
                answer: `A. The DPS Is the only entity that can give you the CLP (commercial learner's permit) and the CDL (commercial drivers license) we are not a third party testing facility. \r
            In the study folder we give you we also provide all the necessary documents you need to take to the DPS in order to obtain your CLP. But you need to go to the DPS after you've \r
            studied and take your exams there.`,
              }),
              s.jsx(ft, {
                title: 'What is DOT Medical Card/ Exam and when do I need to have this done?',
                answer: `A: DEPARTMENT OF TRANSPORT medical card/medical exam. You can go to any clinic you choose. Certain GA's can administer a DOT medical exam. Most exams are like a \r
            general check up. They take your blood pressure, check your eyesight, and take a urine exam to check for any unprescribed drugs for example: cannabis or opioids. At the end of the \r
            exam if all is right you will receive a DOT med card. This card insures you are medically capable to drive a commercial truck. You need to have this exam done before you go to the \r
            DPS to take your theory tests in order to get your CLP. The DOT med card should be valid for 2 years. In some cases it is only valid for a certain amount of time. Depends on your \r
            health and the discretion of the physician.`,
              }),
              s.jsx(ft, {
                title: 'Is there any outside costs not included in the tuition?',
                answer: `A. Yes. You pay the DPS $25 to take the four exams you need to obtain your CLP. If you fail any of your four exams more than 3 times you have to repay the DPS $25 again \r
            until you pass. You also pay a fee to any outside clinic that administers your DOT Medical Exam. The cost ranges from $60~90. Also be aware, If you don't pass your driving test at \r
            the DPS the first time, and you choose to rent the truck from us, it's $200 any other time after the first. Lastly you must pay the DPS to take your road-test/driving exam. \r
            The cost is according to the digits of your drivers license. Ranges from $60~95. The DPS imposes these cost we have no control over the amount.`,
              }),
              s.jsx(ft, {
                title: 'What are your hours of operation?',
                answer:
                  'We operate Mon - Friday 8AM to 5PM and Saturday 9AM to 2PM. Once you commence your training hours you will be driving 1-3 hours a day',
              }),
            ],
          }),
        }),
      ],
    }),
  ll = ({ icon: e, title: t, content: n, contentline2: r }) =>
    s.jsxs('div', {
      className: 'pt-2 md:w-2/6 flex flex-col items-center ',
      children: [
        s.jsx('img', {
          src: e,
          className: 'h-10 w-10 md:h-20 md:w-20',
          alt: 'Logo',
        }),
        ' ',
        s.jsx('h2', {
          className: 'font-bold text-yellow-500 md:text-3xl mt-2',
          children: t,
        }),
        s.jsx('p', {
          className: ' md:text-xl text-yellow-700',
          children: n,
        }),
        s.jsx('p', {
          className: ' md:text-xl text-yellow-700',
          children: r,
        }),
      ],
    }),
  Ux = '/assets/location_6325110-DJsWIIjK.png',
  Hx = '/assets/telephone_8410788-Dq8V8cRe.png',
  Wx = '/assets/letter_11410308-tCVh1PkQ.png',
  Vx = '/assets/socials-DZrBEuFu.png',
  Qx = () =>
    s.jsxs('div', {
      className: 'md:p-4 bg-gray-800',
      id: 'contactus',
      children: [
        s.jsx('h2', {
          className: 'text-yellow-600 text-2xl md:text-5xl flex justify-center  pt-6 pb-4',
          style: {
            borderBottom: '1px solid',
            borderImage: 'linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1',
          },
          children: 'GET IN TOUCH:',
        }),
        s.jsxs('div', {
          className: 'flex flex-col items-center md:flex-row mt-2 md:mt-10 pb-11',
          children: [
            s.jsx(ll, {
              icon: Ux,
              title: 'Address:',
              content: '21115 I-45 Spring TX, 77388',
            }),
            s.jsx(ll, {
              icon: Hx,
              title: 'Phone:',
              content: '346-812-8390 ',
            }),
            s.jsx(ll, {
              icon: Wx,
              title: 'Email:',
              content: 'asere.drivers@gmail.com',
            }),
            s.jsx(ll, {
              icon: Vx,
              title: 'Socials:',
              content: 'Facebook: Asere Drivers',
              contentline2: 'Instagram: Asere Transport',
            }),
          ],
        }),
      ],
    }),
  Kx = () =>
    s.jsx('div', {
      className: 'map p-4 bg-slate-100',
      children: s.jsx('iframe', {
        className: 'googlemap',
        src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.7845017683335!2d-95.436683!3d30.071710999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8647354dc21686b3%3A0xdeee3cab600f8af7!2sAsere%20Drivers%20CDL!5e0!3m2!1sen!2sus!4v1712882092995!5m2!1sen!2sus',
        width: '100%',
        height: '550',
        style: { border: 0 },
        allowFullScreen: !0,
        loading: 'lazy',
        referrerPolicy: 'no-referrer-when-downgrade',
      }),
    }),
  Fu = ({ pic: e }) =>
    s.jsx('div', {
      className: 'p-2',
      children: s.jsx('img', {
        src: e,
        className: 'w-auto h-50',
        alt: 'pic',
      }),
    }),
  Gx = '/assets/PHOTO-2022-03-25-08-36-45-BAdTyn-r.jpg',
  Jx = '/assets/PHOTO-2022-04-13-10-34-23-DxMqoTet.jpg',
  Yx = '/assets/PHOTO-2022-04-14-10-20-46-C9DHb905.jpg',
  qx = '/assets/PHOTO-2022-04-14-15-16-58-DiKqRCPn.jpg',
  Xx = '/assets/PHOTO-2022-04-18-08-57-59-YK4uSoOT.jpg',
  Zx = '/assets/PHOTO-2022-04-18-10-12-58-BXbAbpBL.jpg',
  e0 = '/assets/PHOTO-2022-04-20-14-54-44-b3DEBjJ6.jpg',
  Iu = '/assets/PHOTO-2022-04-20-16-36-34-BKhkxusC.jpg',
  t0 = '/assets/PHOTO-2022-04-28-19-43-38-DEB9TNJt.jpg',
  n0 = '/assets/PHOTO-2022-04-28-19-44-40-tFPTaLuH.jpg',
  r0 = '/assets/PHOTO-2022-04-29-14-00-32-DgbAhgR7.jpg',
  l0 = '/assets/PHOTO-2022-04-29-14-33-00-DcS37lqA.jpg',
  s0 = '/assets/PHOTO-2022-05-02-13-42-52-Dq6KJTZE.jpg',
  i0 = '/assets/PHOTO-2022-05-02-14-13-52-fDPrNbif.jpg',
  o0 = '/assets/PHOTO-2022-05-03-15-53-59-BZBvhSh4.jpg',
  a0 = '/assets/PHOTO-2022-05-04-11-28-37-B6WH1Q2D.jpg',
  u0 = '/assets/PHOTO-2022-05-04-14-19-07-BpUjAAH7.jpg',
  $u = [Gx, Jx, Yx, qx, Xx, Zx, e0, Iu, t0, n0, r0, l0, s0, i0, o0, a0, u0, Iu],
  c0 = () =>
    s.jsxs('div', {
      id: 'gallery',
      className: ' bg-slate-100',
      children: [
        s.jsx('h2', {
          className: 'text-yellow-600  text-2xl md:text-5xl flex justify-center pb-4 pt-6',
          style: {
            borderBottom: '1px solid',
            borderImage: 'linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1',
          },
          children: 'GALLERY:',
        }),
        s.jsx('div', {
          className: 'flex',
          children: $u.slice(0, 8).map((e, t) => s.jsx(Fu, { pic: e }, t)),
        }),
        s.jsx('div', {
          className: 'flex',
          children: $u.slice(9, 17).map((e, t) => s.jsx(Fu, { pic: e }, t)),
        }),
      ],
    });
var _f = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  zu = ue.createContext && ue.createContext(_f),
  d0 = ['attr', 'size', 'title'];
function f0(e, t) {
  if (e == null) return {};
  var n = m0(e, t),
    r,
    l;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (l = 0; l < i.length; l++)
      (r = i[l]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function m0(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    i;
  for (i = 0; i < r.length; i++) (l = r[i]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function Yl() {
  return (
    (Yl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Yl.apply(this, arguments)
  );
}
function Mu(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (l) {
        return Object.getOwnPropertyDescriptor(e, l).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function ql(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Mu(Object(n), !0).forEach(function (r) {
          p0(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Mu(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function p0(e, t, n) {
  return (
    (t = h0(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function h0(e) {
  var t = x0(e, 'string');
  return typeof t == 'symbol' ? t : String(t);
}
function x0(e, t) {
  if (typeof e != 'object' || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || 'default');
    if (typeof r != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(e);
}
function Rf(e) {
  return e && e.map((t, n) => ue.createElement(t.tag, ql({ key: n }, t.attr), Rf(t.child)));
}
function Lf(e) {
  return t => ue.createElement(g0, Yl({ attr: ql({}, e.attr) }, t), Rf(e.child));
}
function g0(e) {
  var t = n => {
    var { attr: r, size: l, title: i } = e,
      o = f0(e, d0),
      a = l || n.size || '1em',
      u;
    return (
      n.className && (u = n.className),
      e.className && (u = (u ? u + ' ' : '') + e.className),
      ue.createElement(
        'svg',
        Yl(
          {
            stroke: 'currentColor',
            fill: 'currentColor',
            strokeWidth: '0',
          },
          n.attr,
          r,
          o,
          {
            className: u,
            style: ql(
              ql(
                {
                  color: e.color || n.color,
                },
                n.style
              ),
              e.style
            ),
            height: a,
            width: a,
            xmlns: 'http://www.w3.org/2000/svg',
          }
        ),
        i && ue.createElement('title', null, i),
        e.children
      )
    );
  };
  return zu !== void 0 ? ue.createElement(zu.Consumer, null, n => t(n)) : t(_f);
}
function vs(e) {
  return Lf({
    tag: 'svg',
    attr: { viewBox: '0 0 448 512' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z',
        },
        child: [],
      },
    ],
  })(e);
}
function ys(e) {
  return Lf({
    tag: 'svg',
    attr: { viewBox: '0 0 352 512' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z',
        },
        child: [],
      },
    ],
  })(e);
}
const ws = '/assets/logo-CIQA8vuT.png',
  Bu = [
    { title: 'Home', link: '/' },
    {
      title: 'About Us',
      link: '#aboutus',
    },
    { title: 'FAQs', link: '#faq' },
    {
      title: 'Gallery',
      link: '#gallery',
    },
    {
      title: 'Contact Us',
      link: '#contactus',
    },
  ],
  v0 = () => {
    const [e, t] = w.useState(!1),
      n = () => {
        t(r => !r);
      };
    return s.jsxs('div', {
      className: 'bg-gray-800 sticky top-0',
      children: [
        s.jsx('div', {
          className: 'mx-auto px-4 sm:px-6 lg:px-8',
          children: s.jsxs('div', {
            className: 'flex items-center justify-between h-16',
            children: [
              s.jsxs('div', {
                className: 'flex items-center ',
                children: [
                  s.jsx('img', {
                    src: ws,
                    className: 'h-12 w-auto',
                    alt: 'Logo',
                  }),
                  ' ',
                  s.jsx('a', {
                    href: '/',
                    className: 'text-yellow-500 ml-2 text-2xl',
                    children: 'Asere CDL',
                  }),
                ],
              }),
              s.jsx('div', {
                className: 'hidden md:block',
                children: s.jsxs('div', {
                  className: 'ml-10 flex items-baseline space-x-4 ',
                  children: [
                    Bu.map((r, l) =>
                      s.jsx(
                        'a',
                        {
                          className:
                            'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium',
                          href: r.link,
                          children: r.title,
                        },
                        l
                      )
                    ),
                    s.jsx('a', {
                      className:
                        'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium border',
                      href: '/login',
                      children: 'Login',
                    }),
                  ],
                }),
              }),
              s.jsx('div', {
                className: '-mr-2 flex md:hidden',
                children: s.jsxs('button', {
                  type: 'button',
                  onClick: n,
                  className:
                    'inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-gray-700 ',
                  children: [
                    s.jsx('span', {
                      className: 'sr-only',
                      children: 'Open Main Manu',
                    }),
                    e == !0 ? s.jsx(ys, {}) : s.jsx(vs, {}),
                  ],
                }),
              }),
            ],
          }),
        }),
        e
          ? s.jsx('div', {
              className: 'md:hidden',
              children: s.jsxs('div', {
                className: 'ox-2 pt-2 pb-3 space-y-1 sm:px-3',
                children: [
                  Bu.map((r, l) =>
                    s.jsx(
                      'a',
                      {
                        className:
                          'text-yellow-500 hover:bg-gray-700 flex justify-center px-3 py-2 rounded-md text-base font-medium',
                        href: r.link,
                        children: r.title,
                      },
                      l
                    )
                  ),
                  s.jsx('div', {
                    className: 'py-1 flex justify-center',
                    children: s.jsx('a', {
                      className:
                        'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium ',
                      href: '/login',
                      children: 'Login',
                    }),
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  Af = '/assets/arrow-BYp4F-0z.png';
function Ff(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: y0 } = Object.prototype,
  { getPrototypeOf: ca } = Object,
  js = (e => t => {
    const n = y0.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Je = e => ((e = e.toLowerCase()), t => js(t) === e),
  Ns = e => t => typeof t === e,
  { isArray: In } = Array,
  br = Ns('undefined');
function w0(e) {
  return (
    e !== null &&
    !br(e) &&
    e.constructor !== null &&
    !br(e.constructor) &&
    _e(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const If = Je('ArrayBuffer');
function j0(e) {
  let t;
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && If(e.buffer)),
    t
  );
}
const N0 = Ns('string'),
  _e = Ns('function'),
  $f = Ns('number'),
  Ss = e => e !== null && typeof e == 'object',
  S0 = e => e === !0 || e === !1,
  vl = e => {
    if (js(e) !== 'object') return !1;
    const t = ca(e);
    return (
      (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  k0 = Je('Date'),
  E0 = Je('File'),
  b0 = Je('Blob'),
  C0 = Je('FileList'),
  D0 = e => Ss(e) && _e(e.pipe),
  O0 = e => {
    let t;
    return (
      e &&
      ((typeof FormData == 'function' && e instanceof FormData) ||
        (_e(e.append) &&
          ((t = js(e)) === 'formdata' ||
            (t === 'object' && _e(e.toString) && e.toString() === '[object FormData]'))))
    );
  },
  P0 = Je('URLSearchParams'),
  T0 = e => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
function Rr(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > 'u') return;
  let r, l;
  if ((typeof e != 'object' && (e = [e]), In(e)))
    for (r = 0, l = e.length; r < l; r++) t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      o = i.length;
    let a;
    for (r = 0; r < o; r++) (a = i[r]), t.call(null, e[a], a, e);
  }
}
function zf(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    l;
  for (; r-- > 0; ) if (((l = n[r]), t === l.toLowerCase())) return l;
  return null;
}
const Mf =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : global,
  Bf = e => !br(e) && e !== Mf;
function lo() {
  const { caseless: e } = (Bf(this) && this) || {},
    t = {},
    n = (r, l) => {
      const i = (e && zf(t, l)) || l;
      vl(t[i]) && vl(r)
        ? (t[i] = lo(t[i], r))
        : vl(r)
          ? (t[i] = lo({}, r))
          : In(r)
            ? (t[i] = r.slice())
            : (t[i] = r);
    };
  for (let r = 0, l = arguments.length; r < l; r++) arguments[r] && Rr(arguments[r], n);
  return t;
}
const _0 = (e, t, n, { allOwnKeys: r } = {}) => (
    Rr(
      t,
      (l, i) => {
        n && _e(l) ? (e[i] = Ff(l, n)) : (e[i] = l);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  R0 = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  L0 = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, 'super', {
        value: t.prototype,
      }),
      n && Object.assign(e.prototype, n);
  },
  A0 = (e, t, n, r) => {
    let l, i, o;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (l = Object.getOwnPropertyNames(e), i = l.length; i-- > 0; )
        (o = l[i]), (!r || r(o, e, t)) && !a[o] && ((t[o] = e[o]), (a[o] = !0));
      e = n !== !1 && ca(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  F0 = (e, t, n) => {
    (e = String(e)), (n === void 0 || n > e.length) && (n = e.length), (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  I0 = e => {
    if (!e) return null;
    if (In(e)) return e;
    let t = e.length;
    if (!$f(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  $0 = (
    e => t =>
      e && t instanceof e
  )(typeof Uint8Array < 'u' && ca(Uint8Array)),
  z0 = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let l;
    for (; (l = r.next()) && !l.done; ) {
      const i = l.value;
      t.call(e, i[0], i[1]);
    }
  },
  M0 = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  B0 = Je('HTMLFormElement'),
  U0 = e =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, l) {
      return r.toUpperCase() + l;
    }),
  Uu = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  H0 = Je('RegExp'),
  Uf = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    Rr(n, (l, i) => {
      let o;
      (o = t(l, i, e)) !== !1 && (r[i] = o || l);
    }),
      Object.defineProperties(e, r);
  },
  W0 = e => {
    Uf(e, (t, n) => {
      if (_e(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1) return !1;
      const r = e[n];
      if (_e(r)) {
        if (((t.enumerable = !1), 'writable' in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  V0 = (e, t) => {
    const n = {},
      r = l => {
        l.forEach(i => {
          n[i] = !0;
        });
      };
    return In(e) ? r(e) : r(String(e).split(t)), n;
  },
  Q0 = () => {},
  K0 = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  li = 'abcdefghijklmnopqrstuvwxyz',
  Hu = '0123456789',
  Hf = {
    DIGIT: Hu,
    ALPHA: li,
    ALPHA_DIGIT: li + li.toUpperCase() + Hu,
  },
  G0 = (e = 16, t = Hf.ALPHA_DIGIT) => {
    let n = '';
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function J0(e) {
  return !!(e && _e(e.append) && e[Symbol.toStringTag] === 'FormData' && e[Symbol.iterator]);
}
const Y0 = e => {
    const t = new Array(10),
      n = (r, l) => {
        if (Ss(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!('toJSON' in r)) {
            t[l] = r;
            const i = In(r) ? [] : {};
            return (
              Rr(r, (o, a) => {
                const u = n(o, l + 1);
                !br(u) && (i[a] = u);
              }),
              (t[l] = void 0),
              i
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  q0 = Je('AsyncFunction'),
  X0 = e => e && (Ss(e) || _e(e)) && _e(e.then) && _e(e.catch),
  S = {
    isArray: In,
    isArrayBuffer: If,
    isBuffer: w0,
    isFormData: O0,
    isArrayBufferView: j0,
    isString: N0,
    isNumber: $f,
    isBoolean: S0,
    isObject: Ss,
    isPlainObject: vl,
    isUndefined: br,
    isDate: k0,
    isFile: E0,
    isBlob: b0,
    isRegExp: H0,
    isFunction: _e,
    isStream: D0,
    isURLSearchParams: P0,
    isTypedArray: $0,
    isFileList: C0,
    forEach: Rr,
    merge: lo,
    extend: _0,
    trim: T0,
    stripBOM: R0,
    inherits: L0,
    toFlatObject: A0,
    kindOf: js,
    kindOfTest: Je,
    endsWith: F0,
    toArray: I0,
    forEachEntry: z0,
    matchAll: M0,
    isHTMLForm: B0,
    hasOwnProperty: Uu,
    hasOwnProp: Uu,
    reduceDescriptors: Uf,
    freezeMethods: W0,
    toObjectSet: V0,
    toCamelCase: U0,
    noop: Q0,
    toFiniteNumber: K0,
    findKey: zf,
    global: Mf,
    isContextDefined: Bf,
    ALPHABET: Hf,
    generateString: G0,
    isSpecCompliantForm: J0,
    toJSONObject: Y0,
    isAsyncFn: q0,
    isThenable: X0,
  };
function A(e, t, n, r, l) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = 'AxiosError'),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    l && (this.response = l);
}
S.inherits(A, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: S.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null,
    };
  },
});
const Wf = A.prototype,
  Vf = {};
[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL',
].forEach(e => {
  Vf[e] = { value: e };
});
Object.defineProperties(A, Vf);
Object.defineProperty(Wf, 'isAxiosError', { value: !0 });
A.from = (e, t, n, r, l, i) => {
  const o = Object.create(Wf);
  return (
    S.toFlatObject(
      e,
      o,
      function (u) {
        return u !== Error.prototype;
      },
      a => a !== 'isAxiosError'
    ),
    A.call(o, e.message, t, n, r, l),
    (o.cause = e),
    (o.name = e.name),
    i && Object.assign(o, i),
    o
  );
};
const Z0 = null;
function so(e) {
  return S.isPlainObject(e) || S.isArray(e);
}
function Qf(e) {
  return S.endsWith(e, '[]') ? e.slice(0, -2) : e;
}
function Wu(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (l, i) {
          return (l = Qf(l)), !n && i ? '[' + l + ']' : l;
        })
        .join(n ? '.' : '')
    : t;
}
function eg(e) {
  return S.isArray(e) && !e.some(so);
}
const tg = S.toFlatObject(S, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function ks(e, t, n) {
  if (!S.isObject(e)) throw new TypeError('target must be an object');
  (t = t || new FormData()),
    (n = S.toFlatObject(
      n,
      {
        metaTokens: !0,
        dots: !1,
        indexes: !1,
      },
      !1,
      function (x, j) {
        return !S.isUndefined(j[x]);
      }
    ));
  const r = n.metaTokens,
    l = n.visitor || c,
    i = n.dots,
    o = n.indexes,
    u = (n.Blob || (typeof Blob < 'u' && Blob)) && S.isSpecCompliantForm(t);
  if (!S.isFunction(l)) throw new TypeError('visitor must be a function');
  function d(v) {
    if (v === null) return '';
    if (S.isDate(v)) return v.toISOString();
    if (!u && S.isBlob(v)) throw new A('Blob is not supported. Use a Buffer instead.');
    return S.isArrayBuffer(v) || S.isTypedArray(v)
      ? u && typeof Blob == 'function'
        ? new Blob([v])
        : Buffer.from(v)
      : v;
  }
  function c(v, x, j) {
    let p = v;
    if (v && !j && typeof v == 'object') {
      if (S.endsWith(x, '{}')) (x = r ? x : x.slice(0, -2)), (v = JSON.stringify(v));
      else if (
        (S.isArray(v) && eg(v)) ||
        ((S.isFileList(v) || S.endsWith(x, '[]')) && (p = S.toArray(v)))
      )
        return (
          (x = Qf(x)),
          p.forEach(function (g, N) {
            !(S.isUndefined(g) || g === null) &&
              t.append(o === !0 ? Wu([x], N, i) : o === null ? x : x + '[]', d(g));
          }),
          !1
        );
    }
    return so(v) ? !0 : (t.append(Wu(j, x, i), d(v)), !1);
  }
  const f = [],
    h = Object.assign(tg, {
      defaultVisitor: c,
      convertValue: d,
      isVisitable: so,
    });
  function y(v, x) {
    if (!S.isUndefined(v)) {
      if (f.indexOf(v) !== -1) throw Error('Circular reference detected in ' + x.join('.'));
      f.push(v),
        S.forEach(v, function (p, m) {
          (!(S.isUndefined(p) || p === null) &&
            l.call(t, p, S.isString(m) ? m.trim() : m, x, h)) === !0 && y(p, x ? x.concat(m) : [m]);
        }),
        f.pop();
    }
  }
  if (!S.isObject(e)) throw new TypeError('data must be an object');
  return y(e), t;
}
function Vu(e) {
  const t = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\0',
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function da(e, t) {
  (this._pairs = []), e && ks(e, this, t);
}
const Kf = da.prototype;
Kf.append = function (t, n) {
  this._pairs.push([t, n]);
};
Kf.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, Vu);
      }
    : Vu;
  return this._pairs
    .map(function (l) {
      return n(l[0]) + '=' + n(l[1]);
    }, '')
    .join('&');
};
function ng(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
function Gf(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || ng,
    l = n && n.serialize;
  let i;
  if (
    (l ? (i = l(t, n)) : (i = S.isURLSearchParams(t) ? t.toString() : new da(t, n).toString(r)), i)
  ) {
    const o = e.indexOf('#');
    o !== -1 && (e = e.slice(0, o)), (e += (e.indexOf('?') === -1 ? '?' : '&') + i);
  }
  return e;
}
class Qu {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    S.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const Jf = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  rg = typeof URLSearchParams < 'u' ? URLSearchParams : da,
  lg = typeof FormData < 'u' ? FormData : null,
  sg = typeof Blob < 'u' ? Blob : null,
  ig = {
    isBrowser: !0,
    classes: {
      URLSearchParams: rg,
      FormData: lg,
      Blob: sg,
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  },
  Yf = typeof window < 'u' && typeof document < 'u',
  og = (e => Yf && ['ReactNative', 'NativeScript', 'NS'].indexOf(e) < 0)(
    typeof navigator < 'u' && navigator.product
  ),
  ag =
    typeof WorkerGlobalScope < 'u' &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == 'function',
  ug = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Yf,
        hasStandardBrowserEnv: og,
        hasStandardBrowserWebWorkerEnv: ag,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Qe = { ...ug, ...ig };
function cg(e, t) {
  return ks(
    e,
    new Qe.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, l, i) {
          return Qe.isNode && S.isBuffer(n)
            ? (this.append(r, n.toString('base64')), !1)
            : i.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function dg(e) {
  return S.matchAll(/\w+|\[(\w*)]/g, e).map(t => (t[0] === '[]' ? '' : t[1] || t[0]));
}
function fg(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const l = n.length;
  let i;
  for (r = 0; r < l; r++) (i = n[r]), (t[i] = e[i]);
  return t;
}
function qf(e) {
  function t(n, r, l, i) {
    let o = n[i++];
    if (o === '__proto__') return !0;
    const a = Number.isFinite(+o),
      u = i >= n.length;
    return (
      (o = !o && S.isArray(l) ? l.length : o),
      u
        ? (S.hasOwnProp(l, o) ? (l[o] = [l[o], r]) : (l[o] = r), !a)
        : ((!l[o] || !S.isObject(l[o])) && (l[o] = []),
          t(n, r, l[o], i) && S.isArray(l[o]) && (l[o] = fg(l[o])),
          !a)
    );
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const n = {};
    return (
      S.forEachEntry(e, (r, l) => {
        t(dg(r), l, n, 0);
      }),
      n
    );
  }
  return null;
}
function mg(e, t, n) {
  if (S.isString(e))
    try {
      return (t || JSON.parse)(e), S.trim(e);
    } catch (r) {
      if (r.name !== 'SyntaxError') throw r;
    }
  return (n || JSON.stringify)(e);
}
const fa = {
  transitional: Jf,
  adapter: ['xhr', 'http'],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || '',
        l = r.indexOf('application/json') > -1,
        i = S.isObject(t);
      if ((i && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t)))
        return l ? JSON.stringify(qf(t)) : t;
      if (S.isArrayBuffer(t) || S.isBuffer(t) || S.isStream(t) || S.isFile(t) || S.isBlob(t))
        return t;
      if (S.isArrayBufferView(t)) return t.buffer;
      if (S.isURLSearchParams(t))
        return (
          n.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1), t.toString()
        );
      let a;
      if (i) {
        if (r.indexOf('application/x-www-form-urlencoded') > -1)
          return cg(t, this.formSerializer).toString();
        if ((a = S.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
          const u = this.env && this.env.FormData;
          return ks(a ? { 'files[]': t } : t, u && new u(), this.formSerializer);
        }
      }
      return i || l ? (n.setContentType('application/json', !1), mg(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || fa.transitional,
        r = n && n.forcedJSONParsing,
        l = this.responseType === 'json';
      if (t && S.isString(t) && ((r && !this.responseType) || l)) {
        const o = !(n && n.silentJSONParsing) && l;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (o)
            throw a.name === 'SyntaxError'
              ? A.from(a, A.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Qe.classes.FormData,
    Blob: Qe.classes.Blob,
  },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': void 0,
    },
  },
};
S.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], e => {
  fa.headers[e] = {};
});
const ma = fa,
  pg = S.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]),
  hg = e => {
    const t = {};
    let n, r, l;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (o) {
            (l = o.indexOf(':')),
              (n = o.substring(0, l).trim().toLowerCase()),
              (r = o.substring(l + 1).trim()),
              !(!n || (t[n] && pg[n])) &&
                (n === 'set-cookie'
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ', ' + r : r));
          }),
      t
    );
  },
  Ku = Symbol('internals');
function Kn(e) {
  return e && String(e).trim().toLowerCase();
}
function yl(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(yl) : String(e);
}
function xg(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const gg = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function si(e, t, n, r, l) {
  if (S.isFunction(r)) return r.call(this, t, n);
  if ((l && (t = n), !!S.isString(t))) {
    if (S.isString(r)) return t.indexOf(r) !== -1;
    if (S.isRegExp(r)) return r.test(t);
  }
}
function vg(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function yg(e, t) {
  const n = S.toCamelCase(' ' + t);
  ['get', 'set', 'has'].forEach(r => {
    Object.defineProperty(e, r + n, {
      value: function (l, i, o) {
        return this[r].call(this, t, l, i, o);
      },
      configurable: !0,
    });
  });
}
class Es {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const l = this;
    function i(a, u, d) {
      const c = Kn(u);
      if (!c) throw new Error('header name must be a non-empty string');
      const f = S.findKey(l, c);
      (!f || l[f] === void 0 || d === !0 || (d === void 0 && l[f] !== !1)) && (l[f || u] = yl(a));
    }
    const o = (a, u) => S.forEach(a, (d, c) => i(d, c, u));
    return (
      S.isPlainObject(t) || t instanceof this.constructor
        ? o(t, n)
        : S.isString(t) && (t = t.trim()) && !gg(t)
          ? o(hg(t), n)
          : t != null && i(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = Kn(t)), t)) {
      const r = S.findKey(this, t);
      if (r) {
        const l = this[r];
        if (!n) return l;
        if (n === !0) return xg(l);
        if (S.isFunction(n)) return n.call(this, l, r);
        if (S.isRegExp(n)) return n.exec(l);
        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }
  has(t, n) {
    if (((t = Kn(t)), t)) {
      const r = S.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || si(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let l = !1;
    function i(o) {
      if (((o = Kn(o)), o)) {
        const a = S.findKey(r, o);
        a && (!n || si(r, r[a], a, n)) && (delete r[a], (l = !0));
      }
    }
    return S.isArray(t) ? t.forEach(i) : i(t), l;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      l = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || si(this, this[i], i, t, !0)) && (delete this[i], (l = !0));
    }
    return l;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      S.forEach(this, (l, i) => {
        const o = S.findKey(r, i);
        if (o) {
          (n[o] = yl(l)), delete n[i];
          return;
        }
        const a = t ? vg(i) : String(i).trim();
        a !== i && delete n[i], (n[a] = yl(l)), (r[a] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      S.forEach(this, (r, l) => {
        r != null && r !== !1 && (n[l] = t && S.isArray(r) ? r.join(', ') : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach(l => r.set(l)), r;
  }
  static accessor(t) {
    const r = (this[Ku] = this[Ku] = { accessors: {} }).accessors,
      l = this.prototype;
    function i(o) {
      const a = Kn(o);
      r[a] || (yg(l, o), (r[a] = !0));
    }
    return S.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
Es.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]);
S.reduceDescriptors(Es.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
S.freezeMethods(Es);
const rt = Es;
function ii(e, t) {
  const n = this || ma,
    r = t || n,
    l = rt.from(r.headers);
  let i = r.data;
  return (
    S.forEach(e, function (a) {
      i = a.call(n, i, l.normalize(), t ? t.status : void 0);
    }),
    l.normalize(),
    i
  );
}
function Xf(e) {
  return !!(e && e.__CANCEL__);
}
function Lr(e, t, n) {
  A.call(this, e ?? 'canceled', A.ERR_CANCELED, t, n), (this.name = 'CanceledError');
}
S.inherits(Lr, A, { __CANCEL__: !0 });
function wg(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new A(
          'Request failed with status code ' + n.status,
          [A.ERR_BAD_REQUEST, A.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
          n.config,
          n.request,
          n
        )
      );
}
const jg = Qe.hasStandardBrowserEnv
  ? {
      write(e, t, n, r, l, i) {
        const o = [e + '=' + encodeURIComponent(t)];
        S.isNumber(n) && o.push('expires=' + new Date(n).toGMTString()),
          S.isString(r) && o.push('path=' + r),
          S.isString(l) && o.push('domain=' + l),
          i === !0 && o.push('secure'),
          (document.cookie = o.join('; '));
      },
      read(e) {
        const t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
        return t ? decodeURIComponent(t[3]) : null;
      },
      remove(e) {
        this.write(e, '', Date.now() - 864e5);
      },
    }
  : {
      write() {},
      read() {
        return null;
      },
      remove() {},
    };
function Ng(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Sg(e, t) {
  return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
}
function Zf(e, t) {
  return e && !Ng(t) ? Sg(e, t) : t;
}
const kg = Qe.hasStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement('a');
      let r;
      function l(i) {
        let o = i;
        return (
          t && (n.setAttribute('href', o), (o = n.href)),
          n.setAttribute('href', o),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, '') : '',
            hash: n.hash ? n.hash.replace(/^#/, '') : '',
            hostname: n.hostname,
            port: n.port,
            pathname: n.pathname.charAt(0) === '/' ? n.pathname : '/' + n.pathname,
          }
        );
      }
      return (
        (r = l(window.location.href)),
        function (o) {
          const a = S.isString(o) ? l(o) : o;
          return a.protocol === r.protocol && a.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function Eg(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || '';
}
function bg(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let l = 0,
    i = 0,
    o;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const d = Date.now(),
        c = r[i];
      o || (o = d), (n[l] = u), (r[l] = d);
      let f = i,
        h = 0;
      for (; f !== l; ) (h += n[f++]), (f = f % e);
      if (((l = (l + 1) % e), l === i && (i = (i + 1) % e), d - o < t)) return;
      const y = c && d - c;
      return y ? Math.round((h * 1e3) / y) : void 0;
    }
  );
}
function Gu(e, t) {
  let n = 0;
  const r = bg(50, 250);
  return l => {
    const i = l.loaded,
      o = l.lengthComputable ? l.total : void 0,
      a = i - n,
      u = r(a),
      d = i <= o;
    n = i;
    const c = {
      loaded: i,
      total: o,
      progress: o ? i / o : void 0,
      bytes: a,
      rate: u || void 0,
      estimated: u && o && d ? (o - i) / u : void 0,
      event: l,
    };
    (c[t ? 'download' : 'upload'] = !0), e(c);
  };
}
const Cg = typeof XMLHttpRequest < 'u',
  Dg =
    Cg &&
    function (e) {
      return new Promise(function (n, r) {
        let l = e.data;
        const i = rt.from(e.headers).normalize();
        let { responseType: o, withXSRFToken: a } = e,
          u;
        function d() {
          e.cancelToken && e.cancelToken.unsubscribe(u),
            e.signal && e.signal.removeEventListener('abort', u);
        }
        let c;
        if (S.isFormData(l)) {
          if (Qe.hasStandardBrowserEnv || Qe.hasStandardBrowserWebWorkerEnv) i.setContentType(!1);
          else if ((c = i.getContentType()) !== !1) {
            const [x, ...j] = c
              ? c
                  .split(';')
                  .map(p => p.trim())
                  .filter(Boolean)
              : [];
            i.setContentType([x || 'multipart/form-data', ...j].join('; '));
          }
        }
        let f = new XMLHttpRequest();
        if (e.auth) {
          const x = e.auth.username || '',
            j = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : '';
          i.set('Authorization', 'Basic ' + btoa(x + ':' + j));
        }
        const h = Zf(e.baseURL, e.url);
        f.open(e.method.toUpperCase(), Gf(h, e.params, e.paramsSerializer), !0),
          (f.timeout = e.timeout);
        function y() {
          if (!f) return;
          const x = rt.from('getAllResponseHeaders' in f && f.getAllResponseHeaders()),
            p = {
              data: !o || o === 'text' || o === 'json' ? f.responseText : f.response,
              status: f.status,
              statusText: f.statusText,
              headers: x,
              config: e,
              request: f,
            };
          wg(
            function (g) {
              n(g), d();
            },
            function (g) {
              r(g), d();
            },
            p
          ),
            (f = null);
        }
        if (
          ('onloadend' in f
            ? (f.onloadend = y)
            : (f.onreadystatechange = function () {
                !f ||
                  f.readyState !== 4 ||
                  (f.status === 0 && !(f.responseURL && f.responseURL.indexOf('file:') === 0)) ||
                  setTimeout(y);
              }),
          (f.onabort = function () {
            f && (r(new A('Request aborted', A.ECONNABORTED, e, f)), (f = null));
          }),
          (f.onerror = function () {
            r(new A('Network Error', A.ERR_NETWORK, e, f)), (f = null);
          }),
          (f.ontimeout = function () {
            let j = e.timeout ? 'timeout of ' + e.timeout + 'ms exceeded' : 'timeout exceeded';
            const p = e.transitional || Jf;
            e.timeoutErrorMessage && (j = e.timeoutErrorMessage),
              r(new A(j, p.clarifyTimeoutError ? A.ETIMEDOUT : A.ECONNABORTED, e, f)),
              (f = null);
          }),
          Qe.hasStandardBrowserEnv &&
            (a && S.isFunction(a) && (a = a(e)), a || (a !== !1 && kg(h))))
        ) {
          const x = e.xsrfHeaderName && e.xsrfCookieName && jg.read(e.xsrfCookieName);
          x && i.set(e.xsrfHeaderName, x);
        }
        l === void 0 && i.setContentType(null),
          'setRequestHeader' in f &&
            S.forEach(i.toJSON(), function (j, p) {
              f.setRequestHeader(p, j);
            }),
          S.isUndefined(e.withCredentials) || (f.withCredentials = !!e.withCredentials),
          o && o !== 'json' && (f.responseType = e.responseType),
          typeof e.onDownloadProgress == 'function' &&
            f.addEventListener('progress', Gu(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == 'function' &&
            f.upload &&
            f.upload.addEventListener('progress', Gu(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((u = x => {
              f && (r(!x || x.type ? new Lr(null, e, f) : x), f.abort(), (f = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(u),
            e.signal && (e.signal.aborted ? u() : e.signal.addEventListener('abort', u)));
        const v = Eg(h);
        if (v && Qe.protocols.indexOf(v) === -1) {
          r(new A('Unsupported protocol ' + v + ':', A.ERR_BAD_REQUEST, e));
          return;
        }
        f.send(l || null);
      });
    },
  io = { http: Z0, xhr: Dg };
S.forEach(io, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, 'name', {
        value: t,
      });
    } catch {}
    Object.defineProperty(e, 'adapterName', { value: t });
  }
});
const Ju = e => `- ${e}`,
  Og = e => S.isFunction(e) || e === null || e === !1,
  em = {
    getAdapter: e => {
      e = S.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const l = {};
      for (let i = 0; i < t; i++) {
        n = e[i];
        let o;
        if (((r = n), !Og(n) && ((r = io[(o = String(n)).toLowerCase()]), r === void 0)))
          throw new A(`Unknown adapter '${o}'`);
        if (r) break;
        l[o || '#' + i] = r;
      }
      if (!r) {
        const i = Object.entries(l).map(
          ([a, u]) =>
            `adapter ${a} ` +
            (u === !1 ? 'is not supported by the environment' : 'is not available in the build')
        );
        let o = t
          ? i.length > 1
            ? `since :
` +
              i.map(Ju).join(`
`)
            : ' ' + Ju(i[0])
          : 'as no adapter specified';
        throw new A('There is no suitable adapter to dispatch the request ' + o, 'ERR_NOT_SUPPORT');
      }
      return r;
    },
    adapters: io,
  };
function oi(e) {
  if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
    throw new Lr(null, e);
}
function Yu(e) {
  return (
    oi(e),
    (e.headers = rt.from(e.headers)),
    (e.data = ii.call(e, e.transformRequest)),
    ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
      e.headers.setContentType('application/x-www-form-urlencoded', !1),
    em
      .getAdapter(e.adapter || ma.adapter)(e)
      .then(
        function (r) {
          return (
            oi(e),
            (r.data = ii.call(e, e.transformResponse, r)),
            (r.headers = rt.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            Xf(r) ||
              (oi(e),
              r &&
                r.response &&
                ((r.response.data = ii.call(e, e.transformResponse, r.response)),
                (r.response.headers = rt.from(r.response.headers)))),
            Promise.reject(r)
          );
        }
      )
  );
}
const qu = e => (e instanceof rt ? { ...e } : e);
function Tn(e, t) {
  t = t || {};
  const n = {};
  function r(d, c, f) {
    return S.isPlainObject(d) && S.isPlainObject(c)
      ? S.merge.call({ caseless: f }, d, c)
      : S.isPlainObject(c)
        ? S.merge({}, c)
        : S.isArray(c)
          ? c.slice()
          : c;
  }
  function l(d, c, f) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(d)) return r(void 0, d, f);
    } else return r(d, c, f);
  }
  function i(d, c) {
    if (!S.isUndefined(c)) return r(void 0, c);
  }
  function o(d, c) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(d)) return r(void 0, d);
    } else return r(void 0, c);
  }
  function a(d, c, f) {
    if (f in t) return r(d, c);
    if (f in e) return r(void 0, d);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: a,
    headers: (d, c) => l(qu(d), qu(c), !0),
  };
  return (
    S.forEach(Object.keys(Object.assign({}, e, t)), function (c) {
      const f = u[c] || l,
        h = f(e[c], t[c], c);
      (S.isUndefined(h) && f !== a) || (n[c] = h);
    }),
    n
  );
}
const tm = '1.6.8',
  pa = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
  pa[e] = function (r) {
    return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
  };
});
const Xu = {};
pa.transitional = function (t, n, r) {
  function l(i, o) {
    return '[Axios v' + tm + "] Transitional option '" + i + "'" + o + (r ? '. ' + r : '');
  }
  return (i, o, a) => {
    if (t === !1) throw new A(l(o, ' has been removed' + (n ? ' in ' + n : '')), A.ERR_DEPRECATED);
    return (
      n &&
        !Xu[o] &&
        ((Xu[o] = !0),
        console.warn(
          l(o, ' has been deprecated since v' + n + ' and will be removed in the near future')
        )),
      t ? t(i, o, a) : !0
    );
  };
};
function Pg(e, t, n) {
  if (typeof e != 'object') throw new A('options must be an object', A.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let l = r.length;
  for (; l-- > 0; ) {
    const i = r[l],
      o = t[i];
    if (o) {
      const a = e[i],
        u = a === void 0 || o(a, i, e);
      if (u !== !0) throw new A('option ' + i + ' must be ' + u, A.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new A('Unknown option ' + i, A.ERR_BAD_OPTION);
  }
}
const oo = {
    assertOptions: Pg,
    validators: pa,
  },
  mt = oo.validators;
class Xl {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = {
        request: new Qu(),
        response: new Qu(),
      });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let l;
        Error.captureStackTrace ? Error.captureStackTrace((l = {})) : (l = new Error());
        const i = l.stack ? l.stack.replace(/^.+\n/, '') : '';
        r.stack
          ? i &&
            !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, '')) &&
            (r.stack +=
              `
` + i)
          : (r.stack = i);
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}), (n = Tn(this.defaults, n));
    const { transitional: r, paramsSerializer: l, headers: i } = n;
    r !== void 0 &&
      oo.assertOptions(
        r,
        {
          silentJSONParsing: mt.transitional(mt.boolean),
          forcedJSONParsing: mt.transitional(mt.boolean),
          clarifyTimeoutError: mt.transitional(mt.boolean),
        },
        !1
      ),
      l != null &&
        (S.isFunction(l)
          ? (n.paramsSerializer = {
              serialize: l,
            })
          : oo.assertOptions(
              l,
              {
                encode: mt.function,
                serialize: mt.function,
              },
              !0
            )),
      (n.method = (n.method || this.defaults.method || 'get').toLowerCase());
    let o = i && S.merge(i.common, i[n.method]);
    i &&
      S.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], v => {
        delete i[v];
      }),
      (n.headers = rt.concat(o, i));
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function (x) {
      (typeof x.runWhen == 'function' && x.runWhen(n) === !1) ||
        ((u = u && x.synchronous), a.unshift(x.fulfilled, x.rejected));
    });
    const d = [];
    this.interceptors.response.forEach(function (x) {
      d.push(x.fulfilled, x.rejected);
    });
    let c,
      f = 0,
      h;
    if (!u) {
      const v = [Yu.bind(this), void 0];
      for (v.unshift.apply(v, a), v.push.apply(v, d), h = v.length, c = Promise.resolve(n); f < h; )
        c = c.then(v[f++], v[f++]);
      return c;
    }
    h = a.length;
    let y = n;
    for (f = 0; f < h; ) {
      const v = a[f++],
        x = a[f++];
      try {
        y = v(y);
      } catch (j) {
        x.call(this, j);
        break;
      }
    }
    try {
      c = Yu.call(this, y);
    } catch (v) {
      return Promise.reject(v);
    }
    for (f = 0, h = d.length; f < h; ) c = c.then(d[f++], d[f++]);
    return c;
  }
  getUri(t) {
    t = Tn(this.defaults, t);
    const n = Zf(t.baseURL, t.url);
    return Gf(n, t.params, t.paramsSerializer);
  }
}
S.forEach(['delete', 'get', 'head', 'options'], function (t) {
  Xl.prototype[t] = function (n, r) {
    return this.request(
      Tn(r || {}, {
        method: t,
        url: n,
        data: (r || {}).data,
      })
    );
  };
});
S.forEach(['post', 'put', 'patch'], function (t) {
  function n(r) {
    return function (i, o, a) {
      return this.request(
        Tn(a || {}, {
          method: t,
          headers: r
            ? {
                'Content-Type': 'multipart/form-data',
              }
            : {},
          url: i,
          data: o,
        })
      );
    };
  }
  (Xl.prototype[t] = n()), (Xl.prototype[t + 'Form'] = n(!0));
});
const wl = Xl;
class ha {
  constructor(t) {
    if (typeof t != 'function') throw new TypeError('executor must be a function.');
    let n;
    this.promise = new Promise(function (i) {
      n = i;
    });
    const r = this;
    this.promise.then(l => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; ) r._listeners[i](l);
      r._listeners = null;
    }),
      (this.promise.then = l => {
        let i;
        const o = new Promise(a => {
          r.subscribe(a), (i = a);
        }).then(l);
        return (
          (o.cancel = function () {
            r.unsubscribe(i);
          }),
          o
        );
      }),
      t(function (i, o, a) {
        r.reason || ((r.reason = new Lr(i, o, a)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new ha(function (l) {
        t = l;
      }),
      cancel: t,
    };
  }
}
const Tg = ha;
function _g(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Rg(e) {
  return S.isObject(e) && e.isAxiosError === !0;
}
const ao = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(ao).forEach(([e, t]) => {
  ao[t] = e;
});
const Lg = ao;
function nm(e) {
  const t = new wl(e),
    n = Ff(wl.prototype.request, t);
  return (
    S.extend(n, wl.prototype, t, {
      allOwnKeys: !0,
    }),
    S.extend(n, t, null, {
      allOwnKeys: !0,
    }),
    (n.create = function (l) {
      return nm(Tn(e, l));
    }),
    n
  );
}
const F = nm(ma);
F.Axios = wl;
F.CanceledError = Lr;
F.CancelToken = Tg;
F.isCancel = Xf;
F.VERSION = tm;
F.toFormData = ks;
F.AxiosError = A;
F.Cancel = F.CanceledError;
F.all = function (t) {
  return Promise.all(t);
};
F.spread = _g;
F.isAxiosError = Rg;
F.mergeConfig = Tn;
F.AxiosHeaders = rt;
F.formToJSON = e => qf(S.isHTMLForm(e) ? new FormData(e) : e);
F.getAdapter = em.getAdapter;
F.HttpStatusCode = Lg;
F.default = F;
const nn = '/api',
  Ag = e => F.post(`${nn}/register`, e),
  Fg = e => F.post(`${nn}/login`, e),
  Ig = e => F.post(`${nn}/user`, { id: e }),
  $g = () =>
    F.get(`${nn}/students`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  zg = e =>
    F.put(`${nn}/editstudent`, e, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  Mg = e =>
    F.delete(`${nn}/deletestudent/${e}`, e, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  Bg = e =>
    F.post(`${nn}/addstudent`, e, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  at = {
    register: Ag,
    login: Fg,
    getUserById: Ig,
    getAllStudents: $g,
    editStudent: zg,
    deleteStudent: Mg,
    addStudent: Bg,
  },
  Ug = () => {
    const [e, t] = w.useState(''),
      [n, r] = w.useState(''),
      [l, i] = w.useState(''),
      o = Cf(),
      a = u => {
        u.preventDefault();
        const d = {
          phone: e,
          password: n,
        };
        at.login(d)
          .then(c => {
            if (c.status == 200) {
              localStorage.setItem('token', c.data.token);
              const y = (v => {
                try {
                  return JSON.parse(atob(v.split('.')[1]));
                } catch (x) {
                  return console.error('Error decoding token:', x), null;
                }
              })(c.data.token).role;
              o(
                y === 'Student'
                  ? '/studentui'
                  : y === 'Instructor'
                    ? '/instructorui/appointments'
                    : '/ui/appointments'
              );
            }
          })
          .catch(c => {
            i(c.response.data.message);
          });
      };
    return s.jsx('div', {
      className: 'bg-gray-700 flex flex-col items-center w-auto h-screen  ',
      children: s.jsxs('div', {
        className:
          'bg-gray-900 shadow-md rounded-md p-4 md:mt-20 flex flex-col items-center w-full h-screen md:h-max md:w-1/3',
        children: [
          s.jsx('h2', {
            className: 'text-white font-bold p-2 text-3xl',
            children: 'SIGN IN',
          }),
          s.jsxs('form', {
            onSubmit: a,
            className: ' w-full  p-2',
            children: [
              s.jsxs('div', {
                className: 'py-2 flex flex-col text-gray-500 ',
                children: [
                  s.jsx('label', {
                    children: 'Phone',
                  }),
                  s.jsx('input', {
                    type: 'text',
                    id: 'phone',
                    value: e,
                    onChange: u => t(u.target.value),
                    required: !0,
                    className: 'p-1 rounded-md bg-gray-500 text-white',
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'py-2 flex flex-col text-gray-500',
                children: [
                  s.jsx('label', {
                    children: 'Password',
                  }),
                  s.jsx('input', {
                    type: 'password',
                    id: 'password',
                    value: n,
                    onChange: u => r(u.target.value),
                    required: !0,
                    className: 'p-1 rounded-md bg-gray-500 text-white',
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'flex',
                children: [
                  s.jsx('p', {
                    className: 'text-gray-500 p-1',
                    children: 'Dont have an account? ',
                  }),
                  s.jsxs('a', {
                    href: '/register',
                    className: 'text-gray-500 ml-auto hover:text-white hover:rounded-md p-1',
                    children: ['Register', ' '],
                  }),
                ],
              }),
              s.jsx('button', {
                type: 'submit',
                className:
                  'text-white font-bold p-2 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg mt-4',
                children: 'Login',
              }),
            ],
          }),
          s.jsx('div', {
            className: 'text-red-500',
            children: l,
          }),
          s.jsx(Tf, {
            to: '/',
            children: s.jsx('img', {
              src: Af,
              className: 'w-10 mt-2 hover:p-3 p-2 rounded',
              alt: 'Arrow',
              id: 'home',
              style: {
                filter: 'invert(1)',
              },
            }),
          }),
        ],
      }),
    });
  },
  Hg = () => {
    const [e, t] = w.useState(''),
      [n, r] = w.useState(''),
      [l, i] = w.useState(''),
      [o, a] = w.useState(''),
      [u, d] = w.useState(''),
      [c, f] = w.useState(''),
      [h, y] = w.useState(''),
      [v, x] = w.useState(''),
      [j, p] = w.useState(''),
      [m, g] = w.useState(''),
      [N, E] = w.useState(''),
      [D, O] = w.useState(''),
      T = () => (n !== l ? (E('Passwords do not match'), !1) : (E(''), !0)),
      H = P => {
        if ((P.preventDefault(), !T())) return;
        const we = {
          firstName: o,
          lastName: u,
          phone: c,
          email: h,
          transmission: j,
          clas: m,
          DLnumber: e,
          password: n,
          DOB: v,
        };
        at.register(we)
          .then(Ye => {
            E(''), O(Ye.data.message);
          })
          .catch(Ye => {
            O(''), E(Ye.response.data.message);
          });
      };
    return s.jsx('div', {
      className: 'bg-gray-700 flex flex-col items-center w-full min-h-screen ',
      children: s.jsxs('div', {
        className:
          'bg-gray-900 shadow-md rounded-md p-4 md:mt-20 flex flex-col items-center w-full  mx-auto md:h-max md:w-2/6',
        children: [
          s.jsx('h2', {
            className: 'text-white font-bold p-2 text-3xl',
            children: 'SIGN UP',
          }),
          s.jsxs('form', {
            onSubmit: H,
            className: ' w-full  p-2',
            children: [
              s.jsxs('div', {
                className: 'md:flex md:flex-row',
                children: [
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500 ',
                    children: [
                      s.jsx('label', {
                        children: 'First Name ',
                      }),
                      s.jsx('input', {
                        type: 'text',
                        id: 'firstname',
                        value: o,
                        onChange: P => a(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500',
                    children: [
                      s.jsx('label', {
                        children: 'Last Name',
                      }),
                      s.jsx('input', {
                        type: 'text',
                        id: 'lastname',
                        value: u,
                        onChange: P => d(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'md:flex flex-row',
                children: [
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500 ',
                    children: [
                      s.jsx('label', {
                        children: 'Phone ',
                      }),
                      s.jsx('input', {
                        type: 'text',
                        id: 'phone',
                        value: c,
                        onChange: P => f(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500',
                    children: [
                      s.jsx('label', {
                        children: 'Email',
                      }),
                      s.jsx('input', {
                        type: 'email',
                        id: 'email',
                        value: h,
                        onChange: P => y(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'md:flex flex-row',
                children: [
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500',
                    children: [
                      s.jsx('label', {
                        children: 'Transmission',
                      }),
                      s.jsxs('select', {
                        id: 'transmission',
                        value: j,
                        onChange: P => p(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                        children: [
                          s.jsx('option', {
                            value: '',
                            disabled: !0,
                            children: 'Select transmission',
                          }),
                          s.jsx('option', {
                            value: 'Automatic',
                            children: 'Automatic',
                          }),
                          s.jsx('option', {
                            value: 'Standard',
                            children: 'Standard',
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500',
                    children: [
                      s.jsx('label', {
                        children: 'Class',
                      }),
                      s.jsxs('select', {
                        id: 'class',
                        value: m,
                        onChange: P => g(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                        children: [
                          s.jsx('option', {
                            value: '',
                            disabled: !0,
                            children: 'Select class',
                          }),
                          s.jsx('option', {
                            value: 'A',
                            children: 'A',
                          }),
                          s.jsx('option', {
                            value: 'B',
                            children: 'B',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'md:flex flex-row',
                children: [
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500 ',
                    children: [
                      s.jsx('label', {
                        children: "Driver's License # ",
                      }),
                      s.jsx('input', {
                        type: 'text',
                        id: 'username',
                        value: e,
                        onChange: P => t(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500',
                    children: [
                      s.jsx('label', {
                        children: 'Date of Birth',
                      }),
                      s.jsx('input', {
                        type: 'date',
                        id: 'DOB',
                        value: v,
                        onChange: P => x(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'md:flex flex-row',
                children: [
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500',
                    children: [
                      s.jsx('label', {
                        children: 'Password',
                      }),
                      s.jsx('input', {
                        type: 'password',
                        id: 'password',
                        value: n,
                        onChange: P => r(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'p-2 flex flex-col md:w-1/2 text-gray-500',
                    children: [
                      s.jsx('label', {
                        children: 'Confirm Password',
                      }),
                      s.jsx('input', {
                        type: 'password',
                        id: 'confirmPassword',
                        value: l,
                        onChange: P => i(P.target.value),
                        required: !0,
                        className: 'p-1 rounded-md bg-gray-500 text-white',
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'flex',
                children: [
                  s.jsx('p', {
                    className: 'text-gray-500 p-1',
                    children: 'Already have an account? ',
                  }),
                  s.jsxs('a', {
                    href: '/login',
                    className: 'text-gray-500 ml-auto hover:text-white hover:rounded-md p-1',
                    children: ['Login', ' '],
                  }),
                ],
              }),
              s.jsx('button', {
                type: 'submit',
                className:
                  'text-white font-bold p-2 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg mt-4',
                children: 'Register',
              }),
            ],
          }),
          s.jsx('div', {
            className: 'text-green-500',
            children: D,
          }),
          s.jsx('div', {
            className: 'text-red-500',
            children: N,
          }),
          s.jsx(Tf, {
            to: '/',
            children: s.jsx('img', {
              src: Af,
              className: 'w-10 mt-2 hover:p-3 p-2 rounded',
              alt: 'Arrow',
              id: 'home',
              style: {
                filter: 'invert(1)',
              },
            }),
          }),
        ],
      }),
    });
  },
  Wg = [
    {
      title: 'Students',
      link: 'students',
    },
    {
      title: 'Appointments',
      link: 'appointments',
    },
  ],
  Vg = () => {
    const [e, t] = w.useState(!1),
      [n, r] = w.useState('');
    w.useEffect(() => {
      const o = localStorage.getItem('token'),
        u = (d => {
          try {
            return JSON.parse(atob(d.split('.')[1]));
          } catch (c) {
            return console.error('Error decoding token:', c), null;
          }
        })(o);
      u && r(u.role);
    }, []);
    const l = () => {
        t(o => !o);
      },
      i = Wg.filter(o =>
        n === 'Student'
          ? o.title !== 'Students' && o.title !== 'Appointments'
          : n === 'Instructor'
            ? o.title !== 'Students'
            : !0
      );
    return s.jsxs('div', {
      className: 'bg-gray-800 ',
      children: [
        s.jsx('div', {
          className: 'mx-auto px-4 sm:px-6 lg:px-8',
          children: s.jsxs('div', {
            className: 'flex items-center justify-between h-16',
            children: [
              s.jsxs('div', {
                className: 'flex items-center',
                children: [
                  s.jsx('img', {
                    src: ws,
                    className: 'h-12 w-auto',
                    alt: 'Logo',
                  }),
                  ' ',
                  s.jsx('a', {
                    href: '/',
                    className: 'text-yellow-500 ml-2 text-2xl',
                    children: 'Asere CDL',
                  }),
                ],
              }),
              s.jsx('div', {
                className: 'hidden md:block',
                children: s.jsxs('div', {
                  className: 'ml-10 flex items-baseline space-x-4',
                  children: [
                    i.map((o, a) =>
                      s.jsx(
                        'a',
                        {
                          className:
                            'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium',
                          href: o.link,
                          children: o.title,
                        },
                        a
                      )
                    ),
                    s.jsx('a', {
                      className:
                        'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium border',
                      href: '/login',
                      children: 'Logout',
                    }),
                  ],
                }),
              }),
              s.jsx('div', {
                className: '-mr-2 flex md:hidden',
                children: s.jsxs('button', {
                  type: 'button',
                  onClick: l,
                  className:
                    'inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-gray-700 ',
                  children: [
                    s.jsx('span', {
                      className: 'sr-only',
                      children: 'Open Main Manu',
                    }),
                    e ? s.jsx(ys, {}) : s.jsx(vs, {}),
                  ],
                }),
              }),
            ],
          }),
        }),
        e
          ? s.jsx('div', {
              className: 'md:hidden',
              children: s.jsxs('div', {
                className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3',
                children: [
                  i.map((o, a) =>
                    s.jsx(
                      'a',
                      {
                        className:
                          'text-yellow-500 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium',
                        href: o.link,
                        children: o.title,
                      },
                      a
                    )
                  ),
                  s.jsx('div', {
                    className: 'px-2 py-2  flex justify-end',
                    children: s.jsx('a', {
                      className:
                        'text-yellow-600 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500  rounded-md text-md font-medium px-1',
                      href: '/login',
                      children: 'Logout',
                    }),
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  Ar = '/api',
  Qg = e =>
    F.post(`${Ar}/newappointment`, e, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  Kg = () =>
    F.get(`${Ar}/appointments`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(e => e.data)
      .catch(e => {
        throw new Error(`Failed to fetch all appointments: ${e}`);
      }),
  Gg = () =>
    F.get(`${Ar}/realappointments`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(e => e.data)
      .catch(e => {
        throw new Error(`Failed to fetch all appointments: ${e}`);
      }),
  Jg = e =>
    F.put(`${Ar}/editappointment`, e, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(t => t.data)
      .catch(t => {
        throw new Error(`Failed to edit appointment: ${t}`);
      }),
  Yg = e =>
    F.delete(`${Ar}/deleteappointment/${e}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(t => t.data)
      .catch(t => {
        throw new Error(`Failed to delete appointment: ${t}`);
      }),
  _n = {
    createNewAppt: Qg,
    getAllAppointments: Kg,
    editAppointment: Jg,
    deleteAppointment: Yg,
    getAllRealAppointments: Gg,
  },
  qg = e => {
    const [t, n] = ue.useState(!1),
      [r, l] = w.useState(''),
      [i, o] = w.useState(''),
      [a, u] = w.useState({
        firstName: e.student.firstName,
        lastName: e.student.lastName,
        phone: e.student.phone,
        date: '',
        location: '',
        truck: '',
        permitExpDate: e.student.permitExpiryDate,
        checkboxOption: '',
        time: '',
        DOB: e.student.DOB,
        email: e.student.email,
        DLnumber: e.student.DLnumber,
        transmission: e.student.transmission,
      }),
      d = v => {
        const { name: x, value: j } = v.target;
        u({ ...a, [x]: j });
      },
      c = async v => {
        v.preventDefault();
        try {
          const x = {
              firstName: a.firstName,
              lastName: a.lastName,
              DOB: a.DOB,
              DLnumber: a.DLnumber,
              phone: a.phone,
              email: a.email,
              location: a.location,
              date: a.date,
              time: a.time,
              truck: a.truck,
              transmission: a.transmission,
              permitExpDate: a.permitExpDate,
              checkboxOption: a.checkboxOption,
            },
            j = await _n.createNewAppt(x);
          f(j);
        } catch (x) {
          h(x);
        }
      },
      f = v => {
        l(''), o(v.data.message), y(), n(!1), e.toast();
      },
      h = v => {
        o(''), l(v.response.data.message);
      },
      y = () => {
        u({
          firstName: '',
          lastName: '',
          DOB: '',
          DLnumber: '',
          phone: '',
          email: '',
          location: '',
          date: '',
          time: '',
          truck: '',
          transmission: '',
          permitExpDate: '',
          checkboxOption: '',
        });
      };
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          className:
            'text-black font-bold px-2 bg-orange-500 hover:bg-orange-700 rounded-lg md:w-3/6 ',
          type: 'button',
          onClick: () => {
            l(''), o(''), n(!0);
          },
          children: 'Schedule For Exam',
        }),
        t
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative lg:w-2/6 my-6 mx-auto md:mt-60 w-full h-full max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Add Appointment',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => n(!1),
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-white  h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative p-6 flex-auto',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('form', {
                              className: 'p-4',
                              onSubmit: c,
                              children: [
                                s.jsx('div', {
                                  className: 'text-red-500 pb-6',
                                  children: r,
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'firstName',
                                          children: 'First Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'firstName',
                                          name: 'firstName',
                                          value: a.firstName,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'lastName',
                                          children: 'Last Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'lastName',
                                          name: 'lastName',
                                          value: a.lastName,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'date',
                                          children: 'DOB:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'DOB',
                                          name: 'DOB',
                                          value: a.DOB,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'licenseNumber',
                                          children: "Driver's License Number:",
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'DLnumber',
                                          name: 'DLnumber',
                                          value: a.DLnumber,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Phone:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'phone',
                                          name: 'phone',
                                          value: a.phone,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Email:',
                                        }),
                                        s.jsx('input', {
                                          type: 'email',
                                          id: 'email',
                                          name: 'email',
                                          value: a.email,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'mb-2 flex flex-col',
                                  children: [
                                    s.jsx('label', {
                                      className: 'text-lg',
                                      htmlFor: 'location',
                                      children: 'Location:',
                                    }),
                                    s.jsx('input', {
                                      type: 'text',
                                      id: 'location',
                                      name: 'location',
                                      value: a.location,
                                      onChange: d,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'date',
                                          children: 'Date:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'date',
                                          name: 'date',
                                          value: a.date,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'location',
                                          children: 'Time:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'time',
                                          name: 'time',
                                          value: a.time,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'truck',
                                          children: 'Truck:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'truck',
                                          name: 'truck',
                                          value: a.truck,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          children: 'Transmission',
                                        }),
                                        s.jsxs('select', {
                                          id: 'transmission',
                                          name: 'transmission',
                                          value: a.transmission,
                                          onChange: d,
                                          className: 'p-1 ',
                                          children: [
                                            s.jsx('option', {
                                              value: '',
                                              disabled: !0,
                                              children: 'Select transmission',
                                            }),
                                            s.jsx('option', {
                                              value: 'Automatic',
                                              children: 'Automatic',
                                            }),
                                            s.jsx('option', {
                                              value: 'Standard',
                                              children: 'Standard',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'mb-2 flex flex-col',
                                  children: [
                                    s.jsx('label', {
                                      className: 'text-lg',
                                      htmlFor: 'permitExpDate',
                                      children: 'Permit Expiry Date:',
                                    }),
                                    s.jsx('input', {
                                      type: 'date',
                                      id: 'permitExpDate',
                                      name: 'permitExpDate',
                                      value: a.permitExpDate,
                                      onChange: d,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsx('div', {
                                  className: 'mb-2 flex flex-col items-center',
                                  children: s.jsxs('div', {
                                    children: [
                                      s.jsxs('label', {
                                        className: 'text-lg p-2 font-bold text-green-700',
                                        children: [
                                          s.jsx('input', {
                                            type: 'checkbox',
                                            name: 'checkboxOption',
                                            value: 'placeholder',
                                            checked: a.checkboxOption === 'placeholder',
                                            onChange: d,
                                            className: 'mr-2 h-4 w-4',
                                          }),
                                          'Placeholder',
                                        ],
                                      }),
                                      s.jsxs('label', {
                                        className: 'text-lg p-2 font-bold text-yellow-600',
                                        children: [
                                          s.jsx('input', {
                                            type: 'checkbox',
                                            name: 'checkboxOption',
                                            value: 'real',
                                            checked: a.checkboxOption === 'real',
                                            onChange: d,
                                            className: 'mr-2 h-4 w-4',
                                          }),
                                          'Real',
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                                s.jsx('button', {
                                  className:
                                    'text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg my-4',
                                  type: 'submit',
                                  children: 'Submit',
                                }),
                                s.jsx('button', {
                                  className:
                                    'text-white font-bold p-4 bg-red-500 w-full  hover:bg-red-900 rounded-lg my-4 md:hidden',
                                  onClick: () => n(!1),
                                  children: 'Close',
                                }),
                                s.jsx('div', {
                                  className: 'text-green-500',
                                  children: i,
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  Xg = e => {
    const [t, n] = ue.useState(!1),
      r = u => {
        const { name: d, value: c } = u.target;
        a({ ...o, [d]: c });
      },
      l = async u => {
        u.preventDefault();
        try {
          console.log('Edited Info:', o), await at.editStudent(o), e.refresh(), n(!1);
        } catch (d) {
          console.error(`Failed to edit appointment: ${d.message}`);
        }
      },
      i = async () => {
        try {
          await at.deleteStudent(e.info._id), n(!1), e.refresh();
        } catch (u) {
          console.error(`Failed to delete appointment: ${u.message}`);
        }
      },
      [o, a] = w.useState({
        firstName: e.info.firstName,
        lastName: e.info.lastName,
        transmission: e.info.transmission,
        DOB: e.info.DOB,
        DLnumber: e.info.DLnumber,
        phone: e.info.phone,
        email: e.info.email,
        permitExpiryDate: e.info.permitExpiryDate,
        clas: e.info.clas,
        id: e.info._id,
      });
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          className:
            'bg-orange-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg hover:bg-orange-700 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all duration-150 md:w-1/6',
          type: 'button',
          onClick: () => n(!0),
          children: 'Edit',
        }),
        t
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative md:w-2/6 my-6 mx-auto max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Edit Student Info',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => n(!1),
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative p-6 flex-auto',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('form', {
                              onSubmit: l,
                              className: 'flex flex-col  mb-2',
                              children: [
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'First Name:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'firstName',
                                      value: o.firstName,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Last Name:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'lastName',
                                      value: o.lastName,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Transmission:',
                                    s.jsxs('select', {
                                      name: 'transmission',
                                      value: o.transmission,
                                      onChange: r,
                                      className: 'p-1',
                                      children: [
                                        s.jsx('option', {
                                          value: 'Automatic',
                                          children: 'Automatic',
                                        }),
                                        s.jsx('option', {
                                          value: 'Standard',
                                          children: 'Standard',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Class:',
                                    s.jsxs('select', {
                                      name: 'clas',
                                      value: o.clas,
                                      onChange: r,
                                      className: 'p-1',
                                      children: [
                                        s.jsx('option', {
                                          value: 'A',
                                          children: 'A',
                                        }),
                                        s.jsx('option', {
                                          value: 'B',
                                          children: 'B',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Date of Birth:',
                                    s.jsx('input', {
                                      type: 'date',
                                      name: 'DOB',
                                      value: o.DOB,
                                      onChange: r,
                                      className: 'p-1',
                                      htmlFor: 'date',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    "Driver's Liscense Num:",
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'DLnumber',
                                      value: o.DLnumber,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Phone:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'phone',
                                      value: o.phone,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Email:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'email',
                                      value: o.email,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Permit Expiry Date:',
                                    s.jsx('input', {
                                      type: 'date',
                                      name: 'permitExpiryDate',
                                      value: o.permitExpiryDate,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        s.jsxs('div', {
                          className:
                            'flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b',
                          children: [
                            s.jsx('button', {
                              className:
                                'bg-red-500 text-white active:bg-red-600 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-auto mb-1 ease-linear transition-all duration-150',
                              type: 'button',
                              onClick: i,
                              children: 'Delete',
                            }),
                            s.jsx('button', {
                              className:
                                'text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
                              type: 'button',
                              onClick: () => n(!1),
                              children: 'Close',
                            }),
                            s.jsx('button', {
                              className:
                                'bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
                              type: 'button',
                              onClick: l,
                              children: 'Save Changes',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  xa = '/api',
  Zg = e =>
    F.post(`${xa}/clock-in`, e, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  ev = e =>
    F.post(`${xa}/clock-out`, e, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  tv = e =>
    F.get(`${xa}/sessions/${e}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    }),
  bs = {
    createSession: Zg,
    endSession: ev,
    getSessionsByStudentId: tv,
  },
  nv = e => {
    const t = e.info._id,
      [n, r] = ue.useState(!1),
      [l, i] = w.useState([]);
    w.useEffect(() => {
      t &&
        bs
          .getSessionsByStudentId(t)
          .then(c => {
            const f = c.data.sort((h, y) => new Date(y.date) - new Date(h.date));
            i(f);
          })
          .catch(c => {
            console.error('Error fetching sessions:', c);
          });
    }, [t]);
    const o = c => {
        const f = new Date(c),
          h = f.getUTCFullYear(),
          y = String(f.getUTCMonth() + 1).padStart(2, '0'),
          v = String(f.getUTCDate()).padStart(2, '0');
        return `${y}/${v}/${h}`;
      },
      a = c => {
        const [f, h] = c.split(':');
        let y = '';
        return (
          parseInt(f, 10) === 0
            ? (y = `12:${h} `)
            : parseInt(f, 10) === 12
              ? (y = `12:${h} `)
              : parseInt(f, 10) > 12
                ? (y = `${parseInt(f, 10) - 12}:${h} `)
                : (y = `${f}:${h} `),
          y
        );
      },
      d = (() => {
        let c = 0,
          f = 0;
        l.forEach(y => {
          if (y.duration) {
            const v = parseFloat(y.duration);
            y.maneuver === 'Pre Trip'
              ? (c += v)
              : ['Straight Back', 'Off Set', 'Road'].includes(y.maneuver) && (f += v);
          }
        });
        const h = c + f;
        return {
          preTrip: c.toFixed(2),
          driving: f.toFixed(2),
          total: h.toFixed(2),
        };
      })();
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          className:
            'bg-orange-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-2 py-2 rounded-lg shadow hover:shadow-lg hover:bg-orange-700 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all duration-150 md:w-1/6',
          type: 'button',
          onClick: () => r(!0),
          children: 'Hours',
        }),
        n
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative md:w-2/6 my-6 mx-auto max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Student Hours',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => r(!1),
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative flex-auto overflow-y-auto max-h-[70vh]',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('div', {
                              className: 'p-5',
                              children: [
                                l.length === 0
                                  ? s.jsx('p', {
                                      children: 'No sessions found.',
                                    })
                                  : s.jsxs('div', {
                                      className: '',
                                      children: [
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Pre Trip',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Straight Back',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Off Set',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Road',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                s.jsxs('p', {
                                  children: [
                                    s.jsx('strong', {
                                      children: 'Pre Trip Hours:',
                                    }),
                                    ' ',
                                    d.preTrip,
                                  ],
                                }),
                                s.jsxs('p', {
                                  children: [
                                    s.jsx('strong', {
                                      children: 'Driving Hours:',
                                    }),
                                    ' ',
                                    d.driving,
                                  ],
                                }),
                                s.jsxs('p', {
                                  children: [
                                    s.jsx('strong', {
                                      children: 'Total Hours :',
                                    }),
                                    ' ',
                                    d.total,
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        s.jsx('div', {
                          className:
                            'flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b',
                          children: s.jsx('button', {
                            className:
                              'text-white bg-red-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-700',
                            type: 'button',
                            onClick: () => r(!1),
                            children: 'Close',
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  Zu = ({ student: e, toast: t, refresh: n }) => {
    const [r, l] = w.useState(!1),
      i = () => {
        const d = (new Date(e.permitExpiryDate) - new Date()) / (1e3 * 3600 * 24);
        return d < 0
          ? 'bg-red-600 w-max rounded-lg px-1'
          : d <= 7
            ? 'bg-orange-500 w-max rounded-lg px-1'
            : '';
      };
    return s.jsxs('div', {
      className: 'flex flex-col p-2 my-1 bg-green-500 rounded-lg',
      children: [
        s.jsxs('button', {
          onClick: () => {
            l(!r);
          },
          className: 'flex justify-between w-full',
          children: [
            s.jsx('span', {
              className: 'text-sm md:text-2xl text-black font-bold ',
              children:
                e.firstName + ' ' + e.lastName + ' | Class ' + e.clas + ' | ' + e.transmission,
            }),
            s.jsxs('svg', {
              className: 'fill-black shrink-0 ml-8',
              width: '16',
              height: '16',
              xmlns: 'http://www.w3.org/2000/svg',
              children: [
                s.jsx('rect', {
                  y: '7',
                  width: '16',
                  height: '2',
                  rx: '1',
                  className: `transform origin-center transition duration-200 ease-out ${r && '!rotate-180'}`,
                }),
                s.jsx('rect', {
                  y: '7',
                  width: '16',
                  height: '2',
                  rx: '1',
                  className: `transform origin-center rotate-90 transition duration-200 ease-out ${r && '!rotate-180'}`,
                }),
              ],
            }),
          ],
        }),
        s.jsx('div', {
          className: `grid overflow-hidden transition-all duration-300 ease-in-out ${r ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`,
          children: s.jsx('div', {
            className: 'overflow-hidden font-bold text-sm md:text-xl',
            children: s.jsxs('div', {
              className: 'flex flex-col mt-4',
              children: [
                s.jsxs('p', {
                  children: ['DOB: ', e.DOB],
                }),
                s.jsxs('p', {
                  children: ["Driver's License Number: ", e.DLnumber],
                }),
                s.jsxs('p', {
                  children: ['Phone: ', e.phone],
                }),
                s.jsxs('p', {
                  children: ['Email: ', e.email],
                }),
                s.jsxs('p', {
                  className: i(),
                  children: ['Permit Expiry Date: ', e.permitExpiryDate],
                }),
                s.jsxs('div', {
                  className: 'flex py-2',
                  children: [
                    s.jsx(qg, {
                      student: e,
                      toast: t,
                    }),
                    s.jsx(Xg, {
                      info: e,
                      refresh: n,
                    }),
                    s.jsx(nv, {
                      info: e,
                      refresh: n,
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  };
let rv = { data: '' },
  lv = e =>
    typeof window == 'object'
      ? (
          (e ? e.querySelector('#_goober') : window._goober) ||
          Object.assign((e || document.head).appendChild(document.createElement('style')), {
            innerHTML: ' ',
            id: '_goober',
          })
        ).firstChild
      : e || rv,
  sv = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
  iv = /\/\*[^]*?\*\/|  +/g,
  ec = /\n+/g,
  vt = (e, t) => {
    let n = '',
      r = '',
      l = '';
    for (let i in e) {
      let o = e[i];
      i[0] == '@'
        ? i[1] == 'i'
          ? (n = i + ' ' + o + ';')
          : (r += i[1] == 'f' ? vt(o, i) : i + '{' + vt(o, i[1] == 'k' ? '' : t) + '}')
        : typeof o == 'object'
          ? (r += vt(
              o,
              t
                ? t.replace(/([^,])+/g, a =>
                    i.replace(/(^:.*)|([^,])+/g, u =>
                      /&/.test(u) ? u.replace(/&/g, a) : a ? a + ' ' + u : u
                    )
                  )
                : i
            ))
          : o != null &&
            ((i = /^--/.test(i) ? i : i.replace(/[A-Z]/g, '-$&').toLowerCase()),
            (l += vt.p ? vt.p(i, o) : i + ':' + o + ';'));
    }
    return n + (t && l ? t + '{' + l + '}' : l) + r;
  },
  qe = {},
  rm = e => {
    if (typeof e == 'object') {
      let t = '';
      for (let n in e) t += n + rm(e[n]);
      return t;
    }
    return e;
  },
  ov = (e, t, n, r, l) => {
    let i = rm(e),
      o =
        qe[i] ||
        (qe[i] = (u => {
          let d = 0,
            c = 11;
          for (; d < u.length; ) c = (101 * c + u.charCodeAt(d++)) >>> 0;
          return 'go' + c;
        })(i));
    if (!qe[o]) {
      let u =
        i !== e
          ? e
          : (d => {
              let c,
                f,
                h = [{}];
              for (; (c = sv.exec(d.replace(iv, ''))); )
                c[4]
                  ? h.shift()
                  : c[3]
                    ? ((f = c[3].replace(ec, ' ').trim()), h.unshift((h[0][f] = h[0][f] || {})))
                    : (h[0][c[1]] = c[2].replace(ec, ' ').trim());
              return h[0];
            })(e);
      qe[o] = vt(l ? { ['@keyframes ' + o]: u } : u, n ? '' : '.' + o);
    }
    let a = n && qe.g ? qe.g : null;
    return (
      n && (qe.g = qe[o]),
      ((u, d, c, f) => {
        f
          ? (d.data = d.data.replace(f, u))
          : d.data.indexOf(u) === -1 && (d.data = c ? u + d.data : d.data + u);
      })(qe[o], t, r, a),
      o
    );
  },
  av = (e, t, n) =>
    e.reduce((r, l, i) => {
      let o = t[i];
      if (o && o.call) {
        let a = o(n),
          u = (a && a.props && a.props.className) || (/^go/.test(a) && a);
        o = u
          ? '.' + u
          : a && typeof a == 'object'
            ? a.props
              ? ''
              : vt(a, '')
            : a === !1
              ? ''
              : a;
      }
      return r + l + (o ?? '');
    }, '');
function Cs(e) {
  let t = this || {},
    n = e.call ? e(t.p) : e;
  return ov(
    n.unshift
      ? n.raw
        ? av(n, [].slice.call(arguments, 1), t.p)
        : n.reduce((r, l) => Object.assign(r, l && l.call ? l(t.p) : l), {})
      : n,
    lv(t.target),
    t.g,
    t.o,
    t.k
  );
}
let lm, uo, co;
Cs.bind({ g: 1 });
let ut = Cs.bind({ k: 1 });
function uv(e, t, n, r) {
  (vt.p = t), (lm = e), (uo = n), (co = r);
}
function It(e, t) {
  let n = this || {};
  return function () {
    let r = arguments;
    function l(i, o) {
      let a = Object.assign({}, i),
        u = a.className || l.className;
      (n.p = Object.assign({ theme: uo && uo() }, a)),
        (n.o = / *go\d+/.test(u)),
        (a.className = Cs.apply(n, r) + (u ? ' ' + u : '')),
        t && (a.ref = o);
      let d = e;
      return e[0] && ((d = a.as || e), delete a.as), co && d[0] && co(a), lm(d, a);
    }
    return t ? t(l) : l;
  };
}
var cv = e => typeof e == 'function',
  Zl = (e, t) => (cv(e) ? e(t) : e),
  dv = (() => {
    let e = 0;
    return () => (++e).toString();
  })(),
  sm = (() => {
    let e;
    return () => {
      if (e === void 0 && typeof window < 'u') {
        let t = matchMedia('(prefers-reduced-motion: reduce)');
        e = !t || t.matches;
      }
      return e;
    };
  })(),
  fv = 20,
  jl = new Map(),
  mv = 1e3,
  tc = e => {
    if (jl.has(e)) return;
    let t = setTimeout(() => {
      jl.delete(e), rn({ type: 4, toastId: e });
    }, mv);
    jl.set(e, t);
  },
  pv = e => {
    let t = jl.get(e);
    t && clearTimeout(t);
  },
  fo = (e, t) => {
    switch (t.type) {
      case 0:
        return {
          ...e,
          toasts: [t.toast, ...e.toasts].slice(0, fv),
        };
      case 1:
        return (
          t.toast.id && pv(t.toast.id),
          {
            ...e,
            toasts: e.toasts.map(i => (i.id === t.toast.id ? { ...i, ...t.toast } : i)),
          }
        );
      case 2:
        let { toast: n } = t;
        return e.toasts.find(i => i.id === n.id)
          ? fo(e, { type: 1, toast: n })
          : fo(e, {
              type: 0,
              toast: n,
            });
      case 3:
        let { toastId: r } = t;
        return (
          r
            ? tc(r)
            : e.toasts.forEach(i => {
                tc(i.id);
              }),
          {
            ...e,
            toasts: e.toasts.map(i => (i.id === r || r === void 0 ? { ...i, visible: !1 } : i)),
          }
        );
      case 4:
        return t.toastId === void 0
          ? { ...e, toasts: [] }
          : {
              ...e,
              toasts: e.toasts.filter(i => i.id !== t.toastId),
            };
      case 5:
        return {
          ...e,
          pausedAt: t.time,
        };
      case 6:
        let l = t.time - (e.pausedAt || 0);
        return {
          ...e,
          pausedAt: void 0,
          toasts: e.toasts.map(i => ({
            ...i,
            pauseDuration: i.pauseDuration + l,
          })),
        };
    }
  },
  Nl = [],
  Sl = { toasts: [], pausedAt: void 0 },
  rn = e => {
    (Sl = fo(Sl, e)),
      Nl.forEach(t => {
        t(Sl);
      });
  },
  hv = {
    blank: 4e3,
    error: 4e3,
    success: 2e3,
    loading: 1 / 0,
    custom: 4e3,
  },
  xv = (e = {}) => {
    let [t, n] = w.useState(Sl);
    w.useEffect(
      () => (
        Nl.push(n),
        () => {
          let l = Nl.indexOf(n);
          l > -1 && Nl.splice(l, 1);
        }
      ),
      [t]
    );
    let r = t.toasts.map(l => {
      var i, o;
      return {
        ...e,
        ...e[l.type],
        ...l,
        duration:
          l.duration ||
          ((i = e[l.type]) == null ? void 0 : i.duration) ||
          (e == null ? void 0 : e.duration) ||
          hv[l.type],
        style: {
          ...e.style,
          ...((o = e[l.type]) == null ? void 0 : o.style),
          ...l.style,
        },
      };
    });
    return { ...t, toasts: r };
  },
  gv = (e, t = 'blank', n) => ({
    createdAt: Date.now(),
    visible: !0,
    type: t,
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
    message: e,
    pauseDuration: 0,
    ...n,
    id: (n == null ? void 0 : n.id) || dv(),
  }),
  Fr = e => (t, n) => {
    let r = gv(t, e, n);
    return rn({ type: 2, toast: r }), r.id;
  },
  Se = (e, t) => Fr('blank')(e, t);
Se.error = Fr('error');
Se.success = Fr('success');
Se.loading = Fr('loading');
Se.custom = Fr('custom');
Se.dismiss = e => {
  rn({ type: 3, toastId: e });
};
Se.remove = e => rn({ type: 4, toastId: e });
Se.promise = (e, t, n) => {
  let r = Se.loading(t.loading, {
    ...n,
    ...(n == null ? void 0 : n.loading),
  });
  return (
    e
      .then(
        l => (
          Se.success(Zl(t.success, l), {
            id: r,
            ...n,
            ...(n == null ? void 0 : n.success),
          }),
          l
        )
      )
      .catch(l => {
        Se.error(Zl(t.error, l), {
          id: r,
          ...n,
          ...(n == null ? void 0 : n.error),
        });
      }),
    e
  );
};
var vv = (e, t) => {
    rn({
      type: 1,
      toast: { id: e, height: t },
    });
  },
  yv = () => {
    rn({ type: 5, time: Date.now() });
  },
  wv = e => {
    let { toasts: t, pausedAt: n } = xv(e);
    w.useEffect(() => {
      if (n) return;
      let i = Date.now(),
        o = t.map(a => {
          if (a.duration === 1 / 0) return;
          let u = (a.duration || 0) + a.pauseDuration - (i - a.createdAt);
          if (u < 0) {
            a.visible && Se.dismiss(a.id);
            return;
          }
          return setTimeout(() => Se.dismiss(a.id), u);
        });
      return () => {
        o.forEach(a => a && clearTimeout(a));
      };
    }, [t, n]);
    let r = w.useCallback(() => {
        n &&
          rn({
            type: 6,
            time: Date.now(),
          });
      }, [n]),
      l = w.useCallback(
        (i, o) => {
          let { reverseOrder: a = !1, gutter: u = 8, defaultPosition: d } = o || {},
            c = t.filter(y => (y.position || d) === (i.position || d) && y.height),
            f = c.findIndex(y => y.id === i.id),
            h = c.filter((y, v) => v < f && y.visible).length;
          return c
            .filter(y => y.visible)
            .slice(...(a ? [h + 1] : [0, h]))
            .reduce((y, v) => y + (v.height || 0) + u, 0);
        },
        [t]
      );
    return {
      toasts: t,
      handlers: {
        updateHeight: vv,
        startPause: yv,
        endPause: r,
        calculateOffset: l,
      },
    };
  },
  jv = ut`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,
  Nv = ut`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
  Sv = ut`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,
  kv = It('div')`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e => e.primary || '#ff4b4b'};
  position: relative;
  transform: rotate(45deg);

  animation: ${jv} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Nv} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e => e.secondary || '#fff'};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Sv} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,
  Ev = ut`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,
  bv = It('div')`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e => e.secondary || '#e0e0e0'};
  border-right-color: ${e => e.primary || '#616161'};
  animation: ${Ev} 1s linear infinite;
`,
  Cv = ut`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,
  Dv = ut`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,
  Ov = It('div')`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e => e.primary || '#61d345'};
  position: relative;
  transform: rotate(45deg);

  animation: ${Cv} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Dv} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e => e.secondary || '#fff'};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,
  Pv = It('div')`
  position: absolute;
`,
  Tv = It('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,
  _v = ut`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
  Rv = It('div')`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${_v} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,
  Lv = ({ toast: e }) => {
    let { icon: t, type: n, iconTheme: r } = e;
    return t !== void 0
      ? typeof t == 'string'
        ? w.createElement(Rv, null, t)
        : t
      : n === 'blank'
        ? null
        : w.createElement(
            Tv,
            null,
            w.createElement(bv, {
              ...r,
            }),
            n !== 'loading' &&
              w.createElement(
                Pv,
                null,
                n === 'error' ? w.createElement(kv, { ...r }) : w.createElement(Ov, { ...r })
              )
          );
  },
  Av = e => `
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,
  Fv = e => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`,
  Iv = '0%{opacity:0;} 100%{opacity:1;}',
  $v = '0%{opacity:1;} 100%{opacity:0;}',
  zv = It('div')`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,
  Mv = It('div')`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,
  Bv = (e, t) => {
    let n = e.includes('top') ? 1 : -1,
      [r, l] = sm() ? [Iv, $v] : [Av(n), Fv(n)];
    return {
      animation: t
        ? `${ut(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
        : `${ut(l)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
    };
  },
  Uv = w.memo(({ toast: e, position: t, style: n, children: r }) => {
    let l = e.height ? Bv(e.position || t || 'top-center', e.visible) : { opacity: 0 },
      i = w.createElement(Lv, {
        toast: e,
      }),
      o = w.createElement(Mv, { ...e.ariaProps }, Zl(e.message, e));
    return w.createElement(
      zv,
      {
        className: e.className,
        style: {
          ...l,
          ...n,
          ...e.style,
        },
      },
      typeof r == 'function' ? r({ icon: i, message: o }) : w.createElement(w.Fragment, null, i, o)
    );
  });
uv(w.createElement);
var Hv = ({ id: e, className: t, style: n, onHeightUpdate: r, children: l }) => {
    let i = w.useCallback(
      o => {
        if (o) {
          let a = () => {
            let u = o.getBoundingClientRect().height;
            r(e, u);
          };
          a(),
            new MutationObserver(a).observe(o, {
              subtree: !0,
              childList: !0,
              characterData: !0,
            });
        }
      },
      [e, r]
    );
    return w.createElement(
      'div',
      {
        ref: i,
        className: t,
        style: n,
      },
      l
    );
  },
  Wv = (e, t) => {
    let n = e.includes('top'),
      r = n ? { top: 0 } : { bottom: 0 },
      l = e.includes('center')
        ? { justifyContent: 'center' }
        : e.includes('right')
          ? {
              justifyContent: 'flex-end',
            }
          : {};
    return {
      left: 0,
      right: 0,
      display: 'flex',
      position: 'absolute',
      transition: sm() ? void 0 : 'all 230ms cubic-bezier(.21,1.02,.73,1)',
      transform: `translateY(${t * (n ? 1 : -1)}px)`,
      ...r,
      ...l,
    };
  },
  Vv = Cs`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,
  sl = 16,
  Ir = ({
    reverseOrder: e,
    position: t = 'top-center',
    toastOptions: n,
    gutter: r,
    children: l,
    containerStyle: i,
    containerClassName: o,
  }) => {
    let { toasts: a, handlers: u } = wv(n);
    return w.createElement(
      'div',
      {
        style: {
          position: 'fixed',
          zIndex: 9999,
          top: sl,
          left: sl,
          right: sl,
          bottom: sl,
          pointerEvents: 'none',
          ...i,
        },
        className: o,
        onMouseEnter: u.startPause,
        onMouseLeave: u.endPause,
      },
      a.map(d => {
        let c = d.position || t,
          f = u.calculateOffset(d, {
            reverseOrder: e,
            gutter: r,
            defaultPosition: t,
          }),
          h = Wv(c, f);
        return w.createElement(
          Hv,
          {
            id: d.id,
            key: d.id,
            onHeightUpdate: u.updateHeight,
            className: d.visible ? Vv : '',
            style: h,
          },
          d.type === 'custom'
            ? Zl(d.message, d)
            : l
              ? l(d)
              : w.createElement(Uv, {
                  toast: d,
                  position: c,
                })
        );
      })
    );
  },
  Rt = Se;
const Qv = e => {
    const [t, n] = ue.useState(!1),
      [r, l] = w.useState(''),
      [i, o] = w.useState(''),
      [a, u] = w.useState({
        firstName: '',
        lastName: '',
        phone: '',
        permitExpDate: '',
        DOB: '',
        email: '',
        DLnumber: '',
        transmission: 'Standard',
        clas: 'A',
      }),
      d = v => {
        const { name: x, value: j } = v.target;
        u({ ...a, [x]: j });
      },
      c = async v => {
        v.preventDefault();
        try {
          const x = {
            firstName: a.firstName,
            lastName: a.lastName,
            DOB: a.DOB,
            DLnumber: a.DLnumber,
            phone: a.phone,
            email: a.email,
            transmission: a.transmission,
            permitExpDate: a.permitExpDate,
            clas: a.clas,
          };
          console.log(x);
          const j = await at.addStudent(x);
          f(j);
        } catch (x) {
          h(x);
        }
      },
      f = () => {
        l(''), y(), n(!1), e.refresh(), e.toast();
      },
      h = v => {
        var j, p;
        o('');
        const x =
          ((p = (j = v.response) == null ? void 0 : j.data) == null ? void 0 : p.message) ||
          'Unknown error occurred';
        l(x);
      },
      y = () => {
        u({
          firstName: '',
          lastName: '',
          DOB: '',
          DLnumber: '',
          phone: '',
          email: '',
          transmission: 'Standard',
          permitExpDate: '',
          clas: 'A',
        });
      };
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          id: 'newAppButton',
          className:
            'text-white font-bold p-4 bg-teal-700 md:w-1/6 w-full hover:bg-teal-900 rounded-lg my-4',
          type: 'button',
          onClick: () => {
            l(''), o(''), n(!0);
          },
          children: 'Add a New Student',
        }),
        t
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative lg:w-2/6 my-6 md:mt-60 w-full h-full mx-auto max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Add Student',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => {
                                n(!1), y();
                              },
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-white  h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative p-6 flex-auto',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('form', {
                              className: 'p-4',
                              onSubmit: c,
                              children: [
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'firstName',
                                          children: 'First Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'firstName',
                                          name: 'firstName',
                                          value: a.firstName,
                                          onChange: d,
                                          className: 'p-1 uppercase',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'lastName',
                                          children: 'Last Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'lastName',
                                          name: 'lastName',
                                          value: a.lastName,
                                          onChange: d,
                                          className: 'p-1 uppercase',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'date',
                                          children: 'DOB:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'DOB',
                                          name: 'DOB',
                                          value: a.DOB,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'licenseNumber',
                                          children: "Driver's License Number:",
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'DLnumber',
                                          name: 'DLnumber',
                                          value: a.DLnumber,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Phone:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'phone',
                                          name: 'phone',
                                          value: a.phone,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Email:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'email',
                                          name: 'email',
                                          value: a.email,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          children: 'Transmission',
                                        }),
                                        s.jsxs('select', {
                                          id: 'transmission',
                                          name: 'transmission',
                                          value: a.transmission,
                                          onChange: d,
                                          className: 'p-1 ',
                                          children: [
                                            s.jsx('option', {
                                              value: '',
                                              disabled: !0,
                                              children: 'Select transmission',
                                            }),
                                            s.jsx('option', {
                                              value: 'Automatic',
                                              children: 'Automatic',
                                            }),
                                            s.jsx('option', {
                                              value: 'Standard',
                                              children: 'Standard',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          children: 'Class',
                                        }),
                                        s.jsxs('select', {
                                          id: 'clas',
                                          name: 'clas',
                                          value: a.clas,
                                          onChange: d,
                                          className: 'p-1 ',
                                          children: [
                                            s.jsx('option', {
                                              value: 'A',
                                              children: 'A',
                                            }),
                                            s.jsx('option', {
                                              value: 'B',
                                              children: 'B',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'permitExpDate',
                                          children: 'Permit Exp Date:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'permitExpDate',
                                          name: 'permitExpDate',
                                          value: a.permitExpDate,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsx('button', {
                                  className:
                                    'text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg my-4',
                                  type: 'submit',
                                  children: 'Submit',
                                }),
                                s.jsx('div', {
                                  className: 'text-green-500',
                                  children: i,
                                }),
                                s.jsx('div', {
                                  className: 'text-red-500',
                                  children: r,
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  Kv = () => {
    const [e, t] = w.useState([]),
      [n, r] = w.useState(''),
      l = () => Rt.success('Appointment Added Successfully'),
      i = () => Rt.success('Student Added Successfully');
    w.useEffect(() => {
      o();
    }, []);
    const o = () => {
        at.getAllStudents()
          .then(f => {
            t(f.data.students);
          })
          .catch(f => {
            console.error('Error fetching students:', f);
          });
      },
      a = f => {
        r(f.target.value);
      },
      u = e.filter(f => f.firstName && f.firstName.toLowerCase().includes(n.toLowerCase())),
      d = u
        .filter(f => f.transmission === 'Standard')
        .sort((f, h) => f.firstName.localeCompare(h.firstName)),
      c = u
        .filter(f => f.transmission === 'Automatic')
        .sort((f, h) => f.firstName.localeCompare(h.firstName));
    return s.jsxs('div', {
      className: 'flex flex-col items-center mt-4 h-screen',
      children: [
        s.jsx(Ir, {
          position: 'top-center',
          reverseOrder: !1,
        }),
        s.jsx('input', {
          type: 'text',
          placeholder: 'Search by student name...',
          value: n,
          onChange: a,
          className: 'my-4 p-2 md:w-1/6 w-full border border-gray-300 rounded-md',
        }),
        s.jsx(Qv, {
          refresh: o,
          toast: i,
        }),
        s.jsxs('div', {
          className: 'flex flex-col md:flex-row',
          children: [
            s.jsxs('div', {
              className: 'm-4',
              children: [
                s.jsx('h2', {
                  className: 'text-xl font-bold bg-gray-800 text-white p-1',
                  children: 'Standard Transmission Students',
                }),
                d.map(f =>
                  s.jsx(
                    Zu,
                    {
                      student: f,
                      toast: l,
                      refresh: o,
                    },
                    f._id
                  )
                ),
              ],
            }),
            s.jsxs('div', {
              className: 'm-4',
              children: [
                s.jsx('h2', {
                  className: 'text-xl font-bold  bg-gray-800 text-white p-1',
                  children: 'Automatic Transmission Students',
                }),
                c.map(f =>
                  s.jsx(
                    Zu,
                    {
                      student: f,
                      toast: l,
                      refresh: o,
                    },
                    f._id
                  )
                ),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Gv = e => {
    const [t, n] = ue.useState(!1),
      r = u => {
        const { name: d, value: c } = u.target;
        a({ ...o, [d]: c });
      },
      l = async u => {
        u.preventDefault();
        try {
          console.log('Edited Info:', o),
            await _n.editAppointment(o),
            e.info.refreshAppointments(),
            n(!1);
        } catch (d) {
          console.error(`Failed to edit appointment: ${d.message}`);
        }
      },
      i = async () => {
        try {
          await _n.deleteAppointment(e.info.id), e.info.refreshAppointments(), n(!1), e.deleteApp();
        } catch (u) {
          console.error(`Failed to delete appointment: ${u.message}`);
        }
      },
      [o, a] = w.useState({
        firstName: e.info.firstName,
        lastName: e.info.lastName,
        date: e.info.date,
        time: e.info.time,
        location: e.info.location,
        truck: e.info.truck,
        transmission: e.info.transmission,
        DOB: e.info.DOB,
        DLnumber: e.info.DLnumber,
        phone: e.info.phone,
        email: e.info.email,
        permitExpiryDate: e.info.permitExpiryDate,
        id: e.info.id,
        checkboxOption: e.info.pr,
      });
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          className:
            'bg-orange-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all duration-150 w-1/6',
          type: 'button',
          onClick: () => n(!0),
          children: 'Edit',
        }),
        t
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative md:w-2/6 md:mt-60 w-full h-full max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Edit Appointment',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => n(!1),
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative p-6 flex-auto',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('form', {
                              onSubmit: l,
                              className: 'flex flex-col  mb-2',
                              children: [
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'First Name:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'firstName',
                                      value: o.firstName,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Last Name:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'lastName',
                                      value: o.lastName,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Date:',
                                    s.jsx('input', {
                                      type: 'date',
                                      name: 'date',
                                      value: o.date,
                                      onChange: r,
                                      className: 'p-1 ',
                                      htmlFor: 'date',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Time:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'time',
                                      value: o.time,
                                      onChange: r,
                                      className: 'p-1',
                                      htmlFor: 'time',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Location:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'location',
                                      value: o.location,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Truck:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'truck',
                                      value: o.truck,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Transmission:',
                                    s.jsxs('select', {
                                      name: 'transmission',
                                      value: o.transmission,
                                      onChange: r,
                                      className: 'p-1',
                                      children: [
                                        s.jsx('option', {
                                          value: 'Automatic',
                                          children: 'Automatic',
                                        }),
                                        s.jsx('option', {
                                          value: 'Standard',
                                          children: 'Standard',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Date of Birth:',
                                    s.jsx('input', {
                                      type: 'date',
                                      name: 'DOB',
                                      value: o.DOB,
                                      onChange: r,
                                      className: 'p-1',
                                      htmlFor: 'date',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    "Driver's Liscense Num:",
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'DLnumber',
                                      value: o.DLnumber,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Phone:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'phone',
                                      value: o.phone,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Email:',
                                    s.jsx('input', {
                                      type: 'text',
                                      name: 'email',
                                      value: o.email,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('label', {
                                  className: 'p-1 flex justify-between',
                                  children: [
                                    'Permit Expiry Date:',
                                    s.jsx('input', {
                                      type: 'date',
                                      name: 'permitExpiryDate',
                                      value: o.permitExpiryDate,
                                      onChange: r,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  children: [
                                    s.jsxs('label', {
                                      className: 'text-lg p-2 font-bold text-green-600',
                                      children: [
                                        s.jsx('input', {
                                          type: 'checkbox',
                                          name: 'checkboxOption',
                                          value: 'placeholder',
                                          checked: o.checkboxOption === 'placeholder',
                                          onChange: r,
                                          className: 'mr-2 h-4 w-4',
                                        }),
                                        'Placeholder',
                                      ],
                                    }),
                                    s.jsxs('label', {
                                      className: 'text-lg p-2 font-bold text-yellow-600',
                                      children: [
                                        s.jsx('input', {
                                          type: 'checkbox',
                                          name: 'checkboxOption',
                                          value: 'real',
                                          checked: o.checkboxOption === 'real',
                                          onChange: r,
                                          className: 'mr-2 h-4 w-4',
                                        }),
                                        'Real',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        s.jsxs('div', {
                          className:
                            'flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b',
                          children: [
                            s.jsx('button', {
                              className:
                                'bg-red-500 text-white active:bg-red-600 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-auto mb-1 ease-linear transition-all duration-150',
                              type: 'button',
                              onClick: i,
                              children: 'Delete',
                            }),
                            s.jsx('button', {
                              className:
                                'text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
                              type: 'button',
                              onClick: () => n(!1),
                              children: 'Close',
                            }),
                            s.jsx('button', {
                              className:
                                'bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
                              type: 'button',
                              onClick: l,
                              children: 'Save Changes',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  Jv = e => {
    const [t, n] = w.useState(!1);
    return (
      w.useEffect(() => {
        const r = document.getElementById('hide');
        e.role === 'Instructor' && r && (r.style.display = 'none');
      }, []),
      s.jsxs('div', {
        id: 'placeholder',
        className: `flex  flex-col p-2 my-1 ${e.pr === 'real' ? 'bg-yellow-400' : e.pr === 'placeholder' ? 'bg-green-500' : e.pr === 'header' ? 'bg-slate-600' : ''}`,
        children: [
          s.jsxs('button', {
            onClick: () => {
              n(!t);
            },
            className: 'flex justify-between w-full',
            children: [
              s.jsx('span', {
                className: 'text-sm md:text-lg text-black font-bold',
                children:
                  e.firstName +
                  ' ' +
                  e.lastName +
                  '  | ' +
                  e.time +
                  ' | ' +
                  e.location +
                  ' | ' +
                  e.truck +
                  ' ' +
                  e.transmission,
              }),
              s.jsxs('svg', {
                className: 'fill-black shrink-0 ml-8',
                width: '16',
                height: '16',
                xmlns: 'http://www.w3.org/2000/svg',
                children: [
                  s.jsx('rect', {
                    y: '7',
                    width: '16',
                    height: '2',
                    rx: '1',
                    className: `transform origin-center transition duration-200 ease-out ${t && '!rotate-180'}`,
                  }),
                  s.jsx('rect', {
                    y: '7',
                    width: '16',
                    height: '2',
                    rx: '1',
                    className: `transform origin-center rotate-90 transition duration-200 ease-out ${t && '!rotate-180'}`,
                  }),
                ],
              }),
            ],
          }),
          s.jsx('div', {
            id: 'hide',
            className: ` grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${t ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`,
            children: s.jsx('div', {
              className: ' overflow-hidden text-black font-bold ',
              children: s.jsxs('div', {
                className: 'flex flex-col mt-4',
                children: [
                  s.jsxs('p', {
                    children: ['DOB: ', e.DOB],
                  }),
                  s.jsxs('p', {
                    children: ["Driver's License Number: ", e.DLnumber],
                  }),
                  s.jsxs('p', {
                    children: ['Phone: ', e.phone],
                  }),
                  s.jsxs('p', {
                    children: ['Email: ', e.email],
                  }),
                  s.jsxs('p', {
                    children: ['Permit Expiry Date: ', e.permitExpiryDate],
                  }),
                  s.jsx(Gv, {
                    info: e,
                    deleteApp: e.deleteApp,
                  }),
                ],
              }),
            }),
          }),
        ],
      })
    );
  },
  Yv = e => {
    const [t, n] = ue.useState(!1),
      [r, l] = w.useState(''),
      [i, o] = w.useState(''),
      [a, u] = w.useState({
        firstName: '',
        lastName: '',
        phone: '',
        date: '',
        location: '',
        truck: '',
        permitExpDate: '',
        checkboxOption: '',
        time: '',
        DOB: '',
        email: '',
        DLnumber: '',
        transmission: '',
      }),
      d = h => {
        const { name: y, value: v } = h.target;
        u({ ...a, [y]: v });
      },
      c = async h => {
        h.preventDefault();
        try {
          const y = {
            firstName: a.firstName,
            lastName: a.lastName,
            DOB: a.DOB,
            DLnumber: a.DLnumber,
            phone: a.phone,
            email: a.email,
            location: a.location,
            date: a.date,
            time: a.time,
            truck: a.truck,
            transmission: a.transmission,
            permitExpDate: a.permitExpDate,
            checkboxOption: a.checkboxOption,
          };
          await _n
            .createNewAppt(y)
            .then(() => {
              f(), n(!1), e.refresh(), e.toast();
            })
            .catch(v => {});
        } catch (y) {
          console.log(y);
        }
      },
      f = () => {
        u({
          firstName: '',
          lastName: '',
          DOB: '',
          DLnumber: '',
          phone: '',
          email: '',
          location: '',
          date: '',
          time: '',
          truck: '',
          transmission: '',
          permitExpDate: '',
          checkboxOption: '',
        });
      };
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          className: 'text-white font-bold p-4 bg-teal-700   hover:bg-teal-900 rounded-lg mt-4',
          type: 'button',
          onClick: () => {
            l(''), o(''), n(!0);
          },
          children: 'Make a New Appointment',
        }),
        t
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative md:w-2/6 md:mt-60 w-full h-full max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Add Appointment',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => n(!1),
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-white  h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative p-6 flex-auto',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('form', {
                              className: 'p-4',
                              onSubmit: c,
                              children: [
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'firstName',
                                          children: 'First Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'firstName',
                                          name: 'firstName',
                                          value: a.firstName,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'lastName',
                                          children: 'Last Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'lastName',
                                          name: 'lastName',
                                          value: a.lastName,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'date',
                                          children: 'DOB:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'DOB',
                                          name: 'DOB',
                                          value: a.DOB,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'licenseNumber',
                                          children: "Driver's License Number:",
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'DLnumber',
                                          name: 'DLnumber',
                                          value: a.DLnumber,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Phone:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'phone',
                                          name: 'phone',
                                          value: a.phone,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Email:',
                                        }),
                                        s.jsx('input', {
                                          type: 'email',
                                          id: 'email',
                                          name: 'email',
                                          value: a.email,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'mb-2 flex flex-col',
                                  children: [
                                    s.jsx('label', {
                                      className: 'text-lg',
                                      htmlFor: 'location',
                                      children: 'Location:',
                                    }),
                                    s.jsx('input', {
                                      type: 'text',
                                      id: 'location',
                                      name: 'location',
                                      value: a.location,
                                      onChange: d,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'date',
                                          children: 'Date:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'date',
                                          name: 'date',
                                          value: a.date,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'location',
                                          children: 'Time:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'time',
                                          name: 'time',
                                          value: a.time,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'truck',
                                          children: 'Truck:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'truck',
                                          name: 'truck',
                                          value: a.truck,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          children: 'Transmission',
                                        }),
                                        s.jsxs('select', {
                                          id: 'transmission',
                                          name: 'transmission',
                                          value: a.transmission,
                                          onChange: d,
                                          className: 'p-1 ',
                                          children: [
                                            s.jsx('option', {
                                              value: '',
                                              disabled: !0,
                                              children: 'Select transmission',
                                            }),
                                            s.jsx('option', {
                                              value: 'Automatic',
                                              children: 'Automatic',
                                            }),
                                            s.jsx('option', {
                                              value: 'Manual',
                                              children: 'Manual',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'mb-2 flex flex-col',
                                  children: [
                                    s.jsx('label', {
                                      className: 'text-lg',
                                      htmlFor: 'permitExpDate',
                                      children: 'Permit Expiry Date:',
                                    }),
                                    s.jsx('input', {
                                      type: 'date',
                                      id: 'permitExpDate',
                                      name: 'permitExpDate',
                                      value: a.permitExpDate,
                                      onChange: d,
                                      className: 'p-1',
                                    }),
                                  ],
                                }),
                                s.jsx('div', {
                                  className: 'mb-2 flex flex-col items-center',
                                  children: s.jsxs('div', {
                                    children: [
                                      s.jsxs('label', {
                                        className: 'text-lg p-2 font-bold text-green-700',
                                        children: [
                                          s.jsx('input', {
                                            type: 'checkbox',
                                            name: 'checkboxOption',
                                            value: 'placeholder',
                                            checked: a.checkboxOption === 'placeholder',
                                            onChange: d,
                                            className: 'mr-2 h-4 w-4',
                                          }),
                                          'Placeholder',
                                        ],
                                      }),
                                      s.jsxs('label', {
                                        className: 'text-lg p-2 font-bold text-yellow-600',
                                        children: [
                                          s.jsx('input', {
                                            type: 'checkbox',
                                            name: 'checkboxOption',
                                            value: 'real',
                                            checked: a.checkboxOption === 'real',
                                            onChange: d,
                                            className: 'mr-2 h-4 w-4',
                                          }),
                                          'Real',
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                                s.jsx('button', {
                                  className:
                                    'text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg my-4',
                                  type: 'submit',
                                  children: 'Submit',
                                }),
                                s.jsx('div', {
                                  className: 'text-green-500',
                                  children: i,
                                }),
                                s.jsx('div', {
                                  className: 'text-red-500',
                                  children: r,
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  qv = () => {
    const [e, t] = w.useState([]),
      [n, r] = w.useState(''),
      [l, i] = w.useState(!1),
      [o, a] = w.useState(''),
      u = () => Rt.success('Appointment Added Successfully'),
      d = () => Rt.error('Appointment Deleted Successfully');
    w.useEffect(() => {
      const x = localStorage.getItem('token'),
        p = (m => {
          try {
            return JSON.parse(atob(m.split('.')[1]));
          } catch (g) {
            return console.error('Error decoding token:', g), null;
          }
        })(x);
      if (p) {
        r(p.role);
        const m = document.getElementById('newAppButton'),
          g = document.getElementById('showAll');
        p.role === 'Instructor' &&
          (m && (m.style.display = 'none'), g && (g.style.display = 'none'));
      }
      c(p == null ? void 0 : p.role, l, o).then(m => {
        t(m);
      });
    }, [l, o]);
    const c = async (x, j, p) => {
        try {
          const m = await _n.getAllAppointments();
          console.log(m), new Date().setHours(0, 0, 0, 0);
          let N = m;
          return (
            j ||
              (N = m.filter(E => {
                const D = E.date,
                  O = new Date().toISOString().slice(0, 10);
                return D >= O;
              })),
            x === 'Instructor' && (N = N.filter(E => E.checkboxOption === 'real')),
            p &&
              (N = N.filter(E => new Date(E.date).toDateString() === new Date(p).toDateString())),
            N.sort((E, D) => new Date(E.date) - new Date(D.date))
          );
        } catch (m) {
          throw new Error(`Failed to fetch and sort appointments: ${m.message}`);
        }
      },
      f = () => {
        c(n, l, o).then(x => {
          t(x);
        });
      },
      h = x => {
        a(x.target.value);
      },
      y = {};
    e.forEach(x => {
      const j = x.date;
      y[j] || (y[j] = []), y[j].push(x);
    });
    const v = x => {
      const j = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        p = new Date(x);
      return j[p.getDay()];
    };
    return s.jsxs('div', {
      className: 'flex flex-col items-center mt-4 h-screen',
      children: [
        s.jsx('div', {
          className: 'mr-10',
          children: s.jsx(Ir, {
            position: 'top-center',
            reverseOrder: !1,
          }),
        }),
        s.jsx('div', {
          id: 'newAppButton',
          children: s.jsx(Yv, {
            refresh: f,
            toast: u,
          }),
        }),
        s.jsxs('div', {
          className: 'flex flex-col md:flex-row mt-2 ',
          children: [
            s.jsx('h2', {
              className: 'text-red-800 font-bold p-1',
              children: '*Appointments older than the current date are not shown.',
            }),
            s.jsx('button', {
              id: 'showAll',
              onClick: () => i(!l),
              className: 'bg-teal-700 hover:bg-teal-900 text-white rounded px-2 mx-2 p-2',
              children: l ? 'Hide Old' : 'Show All',
            }),
            s.jsx('input', {
              type: 'date',
              value: o,
              onChange: h,
              className: 'ml-2 rounded px-2 md:mr-auto m-1 md:w-auto md:p-1 p-2 mx-2',
            }),
          ],
        }),
        s.jsx('div', {
          className: 'flex flex-col md:w-4/6 w-full ',
          children: Object.entries(y).map(([x, j]) =>
            s.jsxs(
              'div',
              {
                children: [
                  s.jsxs('p', {
                    className: 'font-bold text-lg bg-slate-400 pl-3 mt-2',
                    children: ['Date: ', x, ' (', v(x), ')'],
                  }),
                  j.map((p, m) =>
                    s.jsx(
                      Jv,
                      {
                        firstName: p.firstName,
                        lastName: p.lastName,
                        DOB: p.DOB,
                        DLnumber: p.DLnumber,
                        phone: p.phone,
                        email: p.email,
                        location: p.location,
                        date: p.date,
                        time: p.time,
                        truck: p.truck,
                        transmission: p.transmission,
                        permitExpiryDate: p.permitExpiryDate,
                        pr: p.checkboxOption,
                        id: p._id,
                        refreshAppointments: f,
                        deleteApp: d,
                        role: n,
                      },
                      m
                    )
                  ),
                ],
              },
              x
            )
          ),
        }),
      ],
    });
  },
  ga = () => {
    const [e, t] = w.useState(null);
    w.useEffect(() => {
      const r = localStorage.getItem('token'),
        l = n(r);
      l &&
        l.userId &&
        at
          .getUserById(l.userId)
          .then(i => {
            t(i.data.user);
          })
          .catch(i => {
            console.error('Error fetching user:', i);
          });
    }, []);
    const n = r => {
      try {
        return JSON.parse(atob(r.split('.')[1]));
      } catch (l) {
        return console.error('Error decoding token:', l), null;
      }
    };
    return s.jsx('div', {
      children: e
        ? s.jsxs('div', {
            className: 'flex flex-col text-white font-bold p-2',
            children: [
              s.jsxs('div', {
                className: 'flex flex-row ',
                children: [
                  s.jsx('p', {
                    children: 'Welcome! ',
                  }),
                  s.jsx('p', {
                    className: 'px-1',
                    children: e.firstName,
                  }),
                  s.jsx('p', {
                    className: 'px-1',
                    children: e.lastName,
                  }),
                ],
              }),
              s.jsx('div', {
                className: '',
                children: s.jsxs('p', {
                  className: 'px-1',
                  children: ['Logged in as a : ', e.Role],
                }),
              }),
            ],
          })
        : s.jsx('p', {
            children: 'Loading user information...',
          }),
    });
  },
  Xv = () => {
    const [e, t] = w.useState(!1),
      n = () => {
        t(r => !r);
      };
    return s.jsxs('div', {
      className: 'bg-gray-800 ',
      children: [
        s.jsx('div', {
          className: 'mx-auto px-4 sm:px-6 lg:px-8',
          children: s.jsxs('div', {
            className: 'flex items-center justify-between h-16',
            children: [
              s.jsxs('div', {
                className: 'flex items-center',
                children: [
                  s.jsx('img', {
                    src: ws,
                    className: 'h-12 w-auto',
                    alt: 'Logo',
                  }),
                  ' ',
                  s.jsx('a', {
                    href: '/',
                    className: 'text-yellow-500 ml-2 text-2xl',
                    children: 'Asere CDL',
                  }),
                ],
              }),
              s.jsx('div', {
                className: 'hidden md:block',
                children: s.jsx('div', {
                  className: 'ml-10 flex items-baseline space-x-4',
                  children: s.jsx('a', {
                    className:
                      'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium border',
                    href: '/login',
                    children: 'Logout',
                  }),
                }),
              }),
              s.jsx('div', {
                className: '-mr-2 flex md:hidden',
                children: s.jsxs('button', {
                  type: 'button',
                  onClick: n,
                  className:
                    'inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-gray-700 ',
                  children: [
                    s.jsx('span', {
                      className: 'sr-only',
                      children: 'Open Main Manu',
                    }),
                    e ? s.jsx(ys, {}) : s.jsx(vs, {}),
                  ],
                }),
              }),
            ],
          }),
        }),
        e
          ? s.jsx('div', {
              className: 'md:hidden',
              children: s.jsx('div', {
                className: 'ox-2 pt-2 pb-3 space-y-1 sm:px-3',
                children: s.jsx('a', {
                  className:
                    'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium ',
                  href: '/login',
                  children: 'Logout',
                }),
              }),
            })
          : null,
      ],
    });
  },
  Zv = ({ formSubmitted: e, userId: t }) => {
    const [n, r] = w.useState([]);
    w.useEffect(() => {
      t &&
        bs
          .getSessionsByStudentId(t)
          .then(u => {
            const d = u.data.sort((c, f) => new Date(f.date) - new Date(c.date));
            r(d);
          })
          .catch(u => {
            console.error('Error fetching sessions:', u);
          });
    }, [t, e]);
    const l = u => {
        const d = new Date(u),
          c = d.getUTCFullYear(),
          f = String(d.getUTCMonth() + 1).padStart(2, '0'),
          h = String(d.getUTCDate()).padStart(2, '0');
        return `${f}/${h}/${c}`;
      },
      i = u => {
        const [d, c] = u.split(':');
        let f = '';
        return (
          parseInt(d, 10) === 0
            ? (f = `12:${c} `)
            : parseInt(d, 10) === 12
              ? (f = `12:${c} `)
              : parseInt(d, 10) > 12
                ? (f = `${parseInt(d, 10) - 12}:${c} `)
                : (f = `${d}:${c} `),
          f
        );
      },
      a = (() => {
        let u = 0,
          d = 0;
        n.forEach(f => {
          if (f.duration) {
            const h = parseFloat(f.duration);
            f.maneuver === 'Pre Trip'
              ? (u += h)
              : ['Straight Back', 'Off Set', 'Road'].includes(f.maneuver) && (d += h);
          }
        });
        const c = u + d;
        return {
          preTrip: u.toFixed(2),
          driving: d.toFixed(2),
          total: c.toFixed(2),
        };
      })();
    return s.jsxs('div', {
      className: 'p-5  ',
      children: [
        s.jsx('h1', {
          className: 'font-bold text-xl flex justify-center md:justify-start md:text-2xl md:mb-3',
          children: 'Student Hours',
        }),
        n.length === 0
          ? s.jsx('p', {
              children: 'No sessions found.',
            })
          : s.jsxs('div', {
              className: '',
              children: [
                s.jsxs('div', {
                  className: '',
                  children: [
                    s.jsx('p', {
                      className: 'text-xl font-bold',
                      children: 'Pre Trip',
                    }),
                    s.jsxs('div', {
                      className: 'flex flex-row ',
                      children: [
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Date: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Pre Trip')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: l(u.date),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Start: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Pre Trip')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedIn),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'End: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Pre Trip')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedOut),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Duration: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Pre Trip')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'text-sm md:text-lg font-bold',
                                      children: u.duration,
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: '',
                  children: [
                    s.jsx('p', {
                      className: 'text-xl font-bold',
                      children: 'Straight Back',
                    }),
                    s.jsxs('div', {
                      className: 'flex flex-row ',
                      children: [
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Date: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Straight Back')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: l(u.date),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Start: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Straight Back')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedIn),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'End: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Straight Back')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedOut),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Duration: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Straight Back')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'text-sm md:text-lg font-bold',
                                      children: u.duration,
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: '',
                  children: [
                    s.jsx('p', {
                      className: 'text-xl font-bold',
                      children: 'Off Set',
                    }),
                    s.jsxs('div', {
                      className: 'flex flex-row ',
                      children: [
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Date: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Off Set')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: l(u.date),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Start: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Off Set')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedIn),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'End: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Off Set')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedOut),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Duration: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Off Set')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'text-sm md:text-lg font-bold',
                                      children: u.duration,
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: '',
                  children: [
                    s.jsx('p', {
                      className: 'text-xl font-bold',
                      children: 'Road',
                    }),
                    s.jsxs('div', {
                      className: 'flex flex-row ',
                      children: [
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Date: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Road')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: l(u.date),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Start: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Road')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedIn),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'End: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Road')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'md:text-lg text-sm font-bold',
                                      children: i(u.clockedOut),
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                        s.jsx('div', {
                          className: 'm-2',
                          children: s.jsxs('ul', {
                            children: [
                              s.jsx('div', {
                                className: 'md:text-xl font-bold',
                                children: 'Duration: ',
                              }),
                              n
                                .filter(u => u.maneuver === 'Road')
                                .map(u =>
                                  s.jsx(
                                    'li',
                                    {
                                      className: 'text-sm md:text-lg font-bold',
                                      children: u.duration,
                                    },
                                    u._id
                                  )
                                ),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        s.jsxs('p', {
          className: 'mt-4 text-xl',
          children: [
            s.jsxs('p', {
              children: [
                s.jsx('strong', {
                  children: 'Pre Trip Hours:',
                }),
                ' ',
                a.preTrip,
              ],
            }),
            s.jsxs('p', {
              children: [
                s.jsx('strong', {
                  children: 'Driving Hours:',
                }),
                ' ',
                a.driving,
              ],
            }),
            s.jsxs('p', {
              children: [
                s.jsx('strong', {
                  children: 'Total Hours:',
                }),
                ' ',
                a.total,
              ],
            }),
          ],
        }),
      ],
    });
  },
  nc = ({ value: e, name: t, onChange: n }) => {
    const r = [],
      l = (i, o) => {
        const a = i > 12 ? i - 12 : i === 0 ? 12 : i,
          u = i >= 12 ? 'PM' : 'AM';
        return `${a}:${o.toString().padStart(2, '0')} ${u}`;
      };
    for (let i = 9; i <= 17; i++)
      for (let o = 0; o < 60 && !(i === 17 && o > 0); o += 30) {
        const a = `${i.toString().padStart(2, '0')}:${o.toString().padStart(2, '0')}`;
        r.push({
          display: l(i, o),
          value: a,
        });
      }
    return s.jsxs('select', {
      name: t,
      value: e,
      onChange: n,
      className: 'w-3/6 p-1',
      children: [
        s.jsx('option', {
          value: '',
          children: 'Time',
        }),
        ' ',
        r.map(i =>
          s.jsx(
            'option',
            {
              value: i.value,
              children: i.display,
            },
            i.value
          )
        ),
      ],
    });
  },
  ey = () => {
    const [e, t] = w.useState(null),
      [n, r] = w.useState(!1),
      l = () => Rt.success('You have Clocked-In'),
      i = {
        date: '',
        startTime: '',
        endTime: '',
        maneuver: '',
      },
      [o, a] = w.useState(i);
    w.useEffect(() => {
      const f = localStorage.getItem('token'),
        h = u(f);
      t(h);
    }, []);
    const u = f => {
        try {
          return JSON.parse(atob(f.split('.')[1]));
        } catch (h) {
          return console.error('Error decoding token:', h), null;
        }
      },
      d = f => {
        const { name: h, value: y } = f.target;
        a({ ...o, [h]: y });
      },
      c = f => {
        f.preventDefault(), console.log('Form Data Submitted:', o);
        const h = new Date(`${o.date}T${o.startTime}`),
          x = (new Date(`${o.date}T${o.endTime}`) - h) / 1e3 / 60 / 60,
          j = parseFloat(x.toFixed(2)),
          p = {
            userId: e == null ? void 0 : e.userId,
            date: o.date,
            startTime: o.startTime,
            endTime: o.endTime,
            maneuver: o.maneuver,
            duration: j,
          };
        bs.createSession(p).then(() => {
          l(), a(i), r(m => !m);
        }),
          console.log(`Duration: ${j} Hours`);
      };
    return s.jsxs('div', {
      className: 'flex flex-col ',
      children: [
        s.jsx('div', {
          className: 'mt-2  w-full md:w-1/6 md:m-auto md:mt-5 bg-slate-200 md:rounded-lg ',
          children: s.jsxs('form', {
            onSubmit: c,
            children: [
              s.jsx('div', {
                className: 'bg-slate-800 font-bold text-lg text-white md:rounded-lg p-1 px-3 mb-2',
                children: s.jsx('label', {
                  children: 'Time Form',
                }),
              }),
              s.jsx('div', {
                className: 'p-2 px-5 font-bold text-lg',
                children: s.jsxs('label', {
                  className: 'flex justify-between',
                  children: [
                    'Date:',
                    s.jsx('input', {
                      className: 'w-3/6 p-1',
                      type: 'date',
                      name: 'date',
                      value: o.date,
                      onChange: d,
                      required: !0,
                    }),
                  ],
                }),
              }),
              s.jsx('div', {
                className: 'p-2 px-5 font-bold text-lg',
                children: s.jsxs('label', {
                  className: 'flex justify-between',
                  children: [
                    'Start Time:',
                    s.jsx(nc, {
                      name: 'startTime',
                      value: o.startTime,
                      onChange: d,
                    }),
                  ],
                }),
              }),
              s.jsx('div', {
                className: 'p-2 px-5 font-bold text-lg',
                children: s.jsxs('label', {
                  className: 'flex justify-between',
                  children: [
                    'End Time:',
                    s.jsx(nc, {
                      name: 'endTime',
                      value: o.endTime,
                      onChange: d,
                    }),
                  ],
                }),
              }),
              s.jsx('div', {
                className: 'p-2 px-5 font-bold text-lg',
                children: s.jsxs('label', {
                  className: 'flex justify-between',
                  children: [
                    'Maneuver:',
                    s.jsxs('select', {
                      className: 'w-3/6 p-1',
                      name: 'maneuver',
                      value: o.maneuver || '',
                      onChange: d,
                      required: !0,
                      children: [
                        s.jsx('option', {
                          value: '',
                          disabled: !0,
                          children: 'Maneuver',
                        }),
                        s.jsx('option', {
                          value: 'Pre Trip',
                          children: 'Pre Trip',
                        }),
                        s.jsx('option', {
                          value: 'Straight Back',
                          children: 'Straight Back',
                        }),
                        s.jsx('option', {
                          value: 'Off Set',
                          children: 'Off set',
                        }),
                        s.jsx('option', {
                          value: 'Road',
                          children: 'Road',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsx('div', {
                className: 'w-full flex justify-center p-2',
                children: s.jsx('button', {
                  type: 'submit',
                  className:
                    'w-4/6 p-1 font-bold text-lg bg-blue-600 rounded-md text-white hover:bg-blue-800 ',
                  children: 'Submit',
                }),
              }),
            ],
          }),
        }),
        s.jsx(Ir, {
          position: 'top-center',
          reverseOrder: !1,
        }),
        e &&
          s.jsx(Zv, {
            userId: e.userId,
            formSubmitted: n,
          }),
      ],
    });
  },
  rc = [
    {
      title: 'Students',
      link: '/instructorui/students',
    },
    {
      title: 'Appointments',
      link: '/instructorui/appointments',
    },
  ],
  ty = () => {
    const [e, t] = w.useState(!1),
      n = () => {
        t(r => !r);
      };
    return s.jsxs('div', {
      className: 'bg-gray-800 ',
      children: [
        s.jsx('div', {
          className: 'mx-auto px-4 sm:px-6 lg:px-8',
          children: s.jsxs('div', {
            className: 'flex items-center justify-between h-16',
            children: [
              s.jsxs('div', {
                className: 'flex items-center',
                children: [
                  s.jsx('img', {
                    src: ws,
                    className: 'h-12 w-auto',
                    alt: 'Logo',
                  }),
                  ' ',
                  s.jsx('a', {
                    href: '/',
                    className: 'text-yellow-500 ml-2 text-2xl',
                    children: 'Asere CDL',
                  }),
                ],
              }),
              s.jsx('div', {
                className: 'hidden md:block',
                children: s.jsxs('div', {
                  className: 'ml-10 flex items-baseline space-x-4',
                  children: [
                    rc.map((r, l) =>
                      s.jsx(
                        'a',
                        {
                          className:
                            'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium',
                          href: r.link,
                          children: r.title,
                        },
                        l
                      )
                    ),
                    s.jsx('a', {
                      className:
                        'text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium border',
                      href: '/login',
                      children: 'Logout',
                    }),
                  ],
                }),
              }),
              s.jsx('div', {
                className: '-mr-2 flex md:hidden',
                children: s.jsxs('button', {
                  type: 'button',
                  onClick: n,
                  className:
                    'inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-gray-700 ',
                  children: [
                    s.jsx('span', {
                      className: 'sr-only',
                      children: 'Open Main Manu',
                    }),
                    e ? s.jsx(ys, {}) : s.jsx(vs, {}),
                  ],
                }),
              }),
            ],
          }),
        }),
        e
          ? s.jsx('div', {
              className: 'md:hidden',
              children: s.jsxs('div', {
                className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3 ',
                children: [
                  rc.map((r, l) =>
                    s.jsx(
                      'a',
                      {
                        className:
                          'text-yellow-500 hover:bg-gray-700 block px-3 py-2 rounded-md text-base  font-medium',
                        href: r.link,
                        children: r.title,
                      },
                      l
                    )
                  ),
                  s.jsx('div', {
                    className: 'px-2 py-2  flex justify-end',
                    children: s.jsx('a', {
                      className:
                        'text-yellow-600 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500  rounded-md text-md font-medium px-1 ',
                      href: '/login',
                      children: 'Logout',
                    }),
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  ny = e => {
    const t = e.info._id,
      [n, r] = ue.useState(!1),
      [l, i] = w.useState([]);
    w.useEffect(() => {
      t &&
        bs
          .getSessionsByStudentId(t)
          .then(c => {
            const f = c.data.sort((h, y) => new Date(y.date) - new Date(h.date));
            i(f);
          })
          .catch(c => {
            console.error('Error fetching sessions:', c);
          });
    }, [t]);
    const o = c => {
        const f = new Date(c),
          h = f.getUTCFullYear(),
          y = String(f.getUTCMonth() + 1).padStart(2, '0'),
          v = String(f.getUTCDate()).padStart(2, '0');
        return `${y}/${v}/${h}`;
      },
      a = c => {
        const [f, h] = c.split(':');
        let y = '';
        return (
          parseInt(f, 10) === 0
            ? (y = `12:${h} `)
            : parseInt(f, 10) === 12
              ? (y = `12:${h} `)
              : parseInt(f, 10) > 12
                ? (y = `${parseInt(f, 10) - 12}:${h} `)
                : (y = `${f}:${h} `),
          y
        );
      },
      d = (() => {
        let c = 0,
          f = 0;
        l.forEach(y => {
          if (y.duration) {
            const v = parseFloat(y.duration);
            y.maneuver === 'Pre Trip'
              ? (c += v)
              : ['Straight Back', 'Off Set', 'Road'].includes(y.maneuver) && (f += v);
          }
        });
        const h = c + f;
        return {
          preTrip: c.toFixed(2),
          driving: f.toFixed(2),
          total: h.toFixed(2),
        };
      })();
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          className:
            'bg-orange-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-2 py-2 rounded-lg shadow hover:shadow-lg hover:bg-orange-700 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all duration-150 md:w-1/6',
          type: 'button',
          onClick: () => r(!0),
          children: 'Hours',
        }),
        n
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative md:w-2/6 my-6 mx-auto max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Student Hours',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => r(!1),
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative flex-auto  overflow-y-auto max-h-[70vh]',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('div', {
                              className: 'p-5',
                              children: [
                                l.length === 0
                                  ? s.jsx('p', {
                                      children: 'No sessions found.',
                                    })
                                  : s.jsxs('div', {
                                      className: '',
                                      children: [
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Pre Trip',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Pre Trip')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Straight Back',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Straight Back')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Off Set',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Off Set')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: '',
                                          children: [
                                            s.jsx('p', {
                                              className: 'text-xl font-bold',
                                              children: 'Road',
                                            }),
                                            s.jsxs('div', {
                                              className: 'flex flex-row ',
                                              children: [
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Date:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: o(c.date),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Start:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedIn),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['End:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'md:text-lg text-sm font-bold',
                                                              children: a(c.clockedOut),
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                                s.jsx('div', {
                                                  className: 'm-2',
                                                  children: s.jsxs('ul', {
                                                    children: [
                                                      s.jsxs('div', {
                                                        className: 'md:text-xl font-bold',
                                                        children: ['Duration:', ' '],
                                                      }),
                                                      l
                                                        .filter(c => c.maneuver === 'Road')
                                                        .map(c =>
                                                          s.jsx(
                                                            'li',
                                                            {
                                                              className:
                                                                'text-sm md:text-lg font-bold',
                                                              children: c.duration,
                                                            },
                                                            c._id
                                                          )
                                                        ),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                s.jsxs('p', {
                                  children: [
                                    s.jsx('strong', {
                                      children: 'Pre Trip Hours:',
                                    }),
                                    ' ',
                                    d.preTrip,
                                  ],
                                }),
                                s.jsxs('p', {
                                  children: [
                                    s.jsx('strong', {
                                      children: 'Driving Hours:',
                                    }),
                                    ' ',
                                    d.driving,
                                  ],
                                }),
                                s.jsxs('p', {
                                  children: [
                                    s.jsx('strong', {
                                      children: 'Total Hours:',
                                    }),
                                    ' ',
                                    d.total,
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        s.jsx('div', {
                          className:
                            'flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b',
                          children: s.jsx('button', {
                            className:
                              'text-white bg-red-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-700',
                            type: 'button',
                            onClick: () => r(!1),
                            children: 'Close',
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  lc = ({ student: e, refresh: t }) => {
    const [n, r] = w.useState(!1),
      l = () => {
        const u = (new Date(e.permitExpiryDate) - new Date()) / (1e3 * 3600 * 24);
        return u < 0
          ? 'bg-red-600 w-max rounded-lg px-1'
          : u <= 7
            ? 'bg-orange-500 w-max rounded-lg px-1'
            : '';
      };
    return s.jsxs('div', {
      className: 'flex flex-col p-2 my-1 bg-green-500 rounded-lg',
      children: [
        s.jsxs('button', {
          onClick: () => {
            r(!n);
          },
          className: 'flex justify-between w-full',
          children: [
            s.jsx('span', {
              className: 'text-sm md:text-2xl text-black font-bold ',
              children:
                e.firstName + ' ' + e.lastName + ' | Class ' + e.clas + ' | ' + e.transmission,
            }),
            s.jsxs('svg', {
              className: 'fill-black shrink-0 ml-8',
              width: '16',
              height: '16',
              xmlns: 'http://www.w3.org/2000/svg',
              children: [
                s.jsx('rect', {
                  y: '7',
                  width: '16',
                  height: '2',
                  rx: '1',
                  className: `transform origin-center transition duration-200 ease-out ${n && '!rotate-180'}`,
                }),
                s.jsx('rect', {
                  y: '7',
                  width: '16',
                  height: '2',
                  rx: '1',
                  className: `transform origin-center rotate-90 transition duration-200 ease-out ${n && '!rotate-180'}`,
                }),
              ],
            }),
          ],
        }),
        s.jsx('div', {
          className: `grid overflow-hidden transition-all duration-300 ease-in-out ${n ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`,
          children: s.jsx('div', {
            className: 'overflow-hidden font-bold text-sm md:text-xl',
            children: s.jsxs('div', {
              className: 'flex flex-col mt-4',
              children: [
                s.jsxs('p', {
                  children: ['Phone: ', e.phone],
                }),
                s.jsxs('p', {
                  children: ['Email: ', e.email],
                }),
                s.jsxs('p', {
                  className: l(),
                  children: ['Permit Expiry Date: ', e.permitExpiryDate],
                }),
                s.jsx('div', {
                  className: 'flex py-2',
                  children: s.jsx(ny, {
                    info: e,
                    refresh: t,
                  }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  ry = e => {
    const [t, n] = ue.useState(!1),
      [r, l] = w.useState(''),
      [i, o] = w.useState(''),
      [a, u] = w.useState({
        firstName: '',
        lastName: '',
        phone: '',
        permitExpDate: '',
        DOB: '',
        email: '',
        DLnumber: '',
        transmission: 'Standard',
        clas: 'A',
      }),
      d = v => {
        const { name: x, value: j } = v.target;
        u({ ...a, [x]: j });
      },
      c = async v => {
        v.preventDefault();
        try {
          const x = {
            firstName: a.firstName,
            lastName: a.lastName,
            DOB: a.DOB,
            DLnumber: a.DLnumber,
            phone: a.phone,
            email: a.email,
            transmission: a.transmission,
            permitExpDate: a.permitExpDate,
            clas: a.clas,
          };
          console.log(x);
          const j = await at.addStudent(x);
          f(j);
        } catch (x) {
          h(x);
        }
      },
      f = () => {
        l(''), y(), n(!1), e.refresh(), e.toast();
      },
      h = v => {
        var j, p;
        o('');
        const x =
          ((p = (j = v.response) == null ? void 0 : j.data) == null ? void 0 : p.message) ||
          'Unknown error occurred';
        l(x);
      },
      y = () => {
        u({
          firstName: '',
          lastName: '',
          DOB: '',
          DLnumber: '',
          phone: '',
          email: '',
          transmission: 'Standard',
          permitExpDate: '',
          clas: 'A',
        });
      };
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx('button', {
          id: 'newAppButton',
          className:
            'text-white font-bold p-4 bg-teal-700 md:w-1/6 w-full hover:bg-teal-900 rounded-lg my-4',
          type: 'button',
          onClick: () => {
            l(''), o(''), n(!0);
          },
          children: 'Add a New Student',
        }),
        t
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx('div', {
                  className:
                    'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
                  children: s.jsx('div', {
                    className: 'relative lg:w-2/6 my-6 md:mt-60 w-full h-full mx-auto max-w-3xl',
                    children: s.jsxs('div', {
                      className:
                        'border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
                      children: [
                        s.jsxs('div', {
                          className:
                            'flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white',
                          children: [
                            s.jsx('h3', {
                              className: 'text-3xl font-semibold',
                              children: 'Add Student',
                            }),
                            s.jsx('button', {
                              className:
                                'p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none',
                              onClick: () => {
                                n(!1), y();
                              },
                              children: s.jsx('span', {
                                className:
                                  'bg-transparent text-white  h-6 w-6 text-2xl block outline-none focus:outline-none',
                                children: '×',
                              }),
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'relative p-6 flex-auto',
                          children: s.jsx('div', {
                            className: 'popup',
                            children: s.jsxs('form', {
                              className: 'p-4',
                              onSubmit: c,
                              children: [
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'firstName',
                                          children: 'First Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'firstName',
                                          name: 'firstName',
                                          value: a.firstName,
                                          onChange: d,
                                          className: 'p-1 uppercase',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'lastName',
                                          children: 'Last Name:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'lastName',
                                          name: 'lastName',
                                          value: a.lastName,
                                          onChange: d,
                                          className: 'p-1 uppercase',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'date',
                                          children: 'DOB:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'DOB',
                                          name: 'DOB',
                                          value: a.DOB,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'licenseNumber',
                                          children: "Driver's License Number:",
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'DLnumber',
                                          name: 'DLnumber',
                                          value: a.DLnumber,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex flex-col md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Phone:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'phone',
                                          name: 'phone',
                                          value: a.phone,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col md:w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'phone',
                                          children: 'Email:',
                                        }),
                                        s.jsx('input', {
                                          type: 'text',
                                          id: 'email',
                                          name: 'email',
                                          value: a.email,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'flex md:flex-row justify-between ',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          children: 'Transmission',
                                        }),
                                        s.jsxs('select', {
                                          id: 'transmission',
                                          name: 'transmission',
                                          value: a.transmission,
                                          onChange: d,
                                          className: 'p-1 ',
                                          children: [
                                            s.jsx('option', {
                                              value: '',
                                              disabled: !0,
                                              children: 'Select transmission',
                                            }),
                                            s.jsx('option', {
                                              value: 'Automatic',
                                              children: 'Automatic',
                                            }),
                                            s.jsx('option', {
                                              value: 'Standard',
                                              children: 'Standard',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          children: 'Class',
                                        }),
                                        s.jsxs('select', {
                                          id: 'clas',
                                          name: 'clas',
                                          value: a.clas,
                                          onChange: d,
                                          className: 'p-1 ',
                                          children: [
                                            s.jsx('option', {
                                              value: 'A',
                                              children: 'A',
                                            }),
                                            s.jsx('option', {
                                              value: 'B',
                                              children: 'B',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-2 flex flex-col w-3/6 p-1',
                                      children: [
                                        s.jsx('label', {
                                          className: 'text-lg',
                                          htmlFor: 'permitExpDate',
                                          children: 'Permit Exp Date:',
                                        }),
                                        s.jsx('input', {
                                          type: 'date',
                                          id: 'permitExpDate',
                                          name: 'permitExpDate',
                                          value: a.permitExpDate,
                                          onChange: d,
                                          className: 'p-1',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsx('button', {
                                  className:
                                    'text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg my-4',
                                  type: 'submit',
                                  children: 'Submit',
                                }),
                                s.jsx('div', {
                                  className: 'text-green-500',
                                  children: i,
                                }),
                                s.jsx('div', {
                                  className: 'text-red-500',
                                  children: r,
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                s.jsx('div', {
                  className: 'opacity-25 fixed inset-0 z-40 bg-black',
                }),
              ],
            })
          : null,
      ],
    });
  },
  ly = () => {
    const [e, t] = w.useState([]),
      [n, r] = w.useState(''),
      l = () => Rt.success('Appointment Added Successfully'),
      i = () => Rt.success('Student Added Successfully');
    w.useEffect(() => {
      o();
    }, []);
    const o = () => {
        at.getAllStudents()
          .then(f => {
            t(f.data.students);
          })
          .catch(f => {
            console.error('Error fetching students:', f);
          });
      },
      a = f => {
        r(f.target.value);
      },
      u = e.filter(f => f.firstName && f.firstName.toLowerCase().includes(n.toLowerCase())),
      d = u
        .filter(f => f.transmission === 'Standard')
        .sort((f, h) => f.firstName.localeCompare(h.firstName)),
      c = u
        .filter(f => f.transmission === 'Automatic')
        .sort((f, h) => f.firstName.localeCompare(h.firstName));
    return s.jsxs('div', {
      className: 'flex flex-col items-center mt-4 h-screen',
      children: [
        s.jsx(Ir, {
          position: 'top-center',
          reverseOrder: !1,
        }),
        s.jsx('input', {
          type: 'text',
          placeholder: 'Search by student name...',
          value: n,
          onChange: a,
          className: 'my-4 p-2 md:w-1/6 w-full border border-gray-300 rounded-md',
        }),
        s.jsx(ry, {
          refresh: o,
          toast: i,
        }),
        s.jsxs('div', {
          className: 'flex flex-col md:flex-row',
          children: [
            s.jsxs('div', {
              className: 'm-4',
              children: [
                s.jsx('h2', {
                  className: 'text-xl font-bold bg-gray-800 text-white p-1',
                  children: 'Standard Transmission Students',
                }),
                d.map(f =>
                  s.jsx(
                    lc,
                    {
                      student: f,
                      toast: l,
                      refresh: o,
                    },
                    f._id
                  )
                ),
              ],
            }),
            s.jsxs('div', {
              className: 'm-4',
              children: [
                s.jsx('h2', {
                  className: 'text-xl font-bold  bg-gray-800 text-white p-1',
                  children: 'Automatic Transmission Students',
                }),
                c.map(f =>
                  s.jsx(
                    lc,
                    {
                      student: f,
                      toast: l,
                      refresh: o,
                    },
                    f._id
                  )
                ),
              ],
            }),
          ],
        }),
      ],
    });
  },
  sy = e => {
    const [t, n] = w.useState(!1);
    return (
      w.useEffect(() => {
        const r = document.getElementById('hide');
        e.role === 'Instructor' && r && (r.style.display = 'none');
      }, []),
      s.jsxs('div', {
        id: 'placeholder',
        className: `flex  flex-col p-2 my-1 ${e.pr === 'real' ? 'bg-yellow-400' : e.pr === 'placeholder' ? 'bg-green-500' : e.pr === 'header' ? 'bg-slate-600' : ''}`,
        children: [
          s.jsxs('button', {
            onClick: () => {
              n(!t);
            },
            className: 'flex justify-between w-full',
            children: [
              s.jsx('span', {
                className: 'text-sm md:text-lg text-black font-bold',
                children:
                  e.firstName +
                  ' ' +
                  e.lastName +
                  '  | ' +
                  e.time +
                  ' | ' +
                  e.location +
                  ' | ' +
                  e.truck +
                  ' ' +
                  e.transmission,
              }),
              s.jsxs('svg', {
                className: 'fill-black shrink-0 ml-8',
                width: '16',
                height: '16',
                xmlns: 'http://www.w3.org/2000/svg',
                children: [
                  s.jsx('rect', {
                    y: '7',
                    width: '16',
                    height: '2',
                    rx: '1',
                    className: `transform origin-center transition duration-200 ease-out ${t && '!rotate-180'}`,
                  }),
                  s.jsx('rect', {
                    y: '7',
                    width: '16',
                    height: '2',
                    rx: '1',
                    className: `transform origin-center rotate-90 transition duration-200 ease-out ${t && '!rotate-180'}`,
                  }),
                ],
              }),
            ],
          }),
          s.jsx('div', {
            id: 'hide',
            className: ` grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${t ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`,
            children: s.jsx('div', {
              className: ' overflow-hidden text-black font-bold ',
              children: s.jsxs('div', {
                className: 'flex flex-col mt-4',
                children: [
                  s.jsxs('p', {
                    children: ['Phone: ', e.phone],
                  }),
                  s.jsxs('p', {
                    children: ['Permit Expiry Date: ', e.permitExpiryDate],
                  }),
                ],
              }),
            }),
          }),
        ],
      })
    );
  },
  iy = () => {
    const [e, t] = w.useState([]),
      [n, r] = w.useState(!1),
      [l, i] = w.useState(''),
      o = () => Rt.error('Appointment Deleted Successfully');
    w.useEffect(() => {
      a(n, l).then(y => {
        t(y);
      });
    }, [n, l]);
    const a = async (y, v) => {
        try {
          const x = await _n.getAllRealAppointments(),
            j = new Date().toISOString().slice(0, 10);
          let p = x;
          return (
            y || (p = x.filter(m => m.date >= j)),
            v &&
              (p = p.filter(m => new Date(m.date).toDateString() === new Date(v).toDateString())),
            p.sort((m, g) => new Date(m.date) - new Date(g.date))
          );
        } catch (x) {
          throw new Error(`Failed to fetch and sort appointments: ${x.message}`);
        }
      },
      u = () => {
        a(n, l).then(y => {
          t(y);
        });
      },
      d = y => {
        i(y.target.value);
      },
      c = () => {
        r(y => !y);
      },
      f = {};
    e.forEach(y => {
      const v = y.date;
      f[v] || (f[v] = []), f[v].push(y);
    });
    const h = y => {
      const v = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        x = new Date(y);
      return v[x.getDay()];
    };
    return s.jsxs('div', {
      className: 'flex flex-col items-center mt-4 h-screen',
      children: [
        s.jsx('div', {
          className: 'mr-10',
          children: s.jsx(Ir, {
            position: 'top-center',
            reverseOrder: !1,
          }),
        }),
        s.jsxs('div', {
          className: 'flex flex-col md:flex-row mt-2',
          children: [
            s.jsx('h2', {
              className: 'text-red-800 font-bold p-1',
              children: '*Appointments older than the current date are not shown.',
            }),
            s.jsx('input', {
              type: 'date',
              value: l,
              onChange: d,
              className: 'ml-2 rounded px-2 md:mr-auto m-1 md:w-auto md:p-1 p-2 mx-2',
            }),
            s.jsx('button', {
              onClick: c,
              className: 'bg-teal-700 hover:bg-teal-900 text-white rounded px-2 mx-2 p-2',
              children: n ? 'Hide Old' : 'Show All',
            }),
          ],
        }),
        s.jsx('div', {
          className: 'flex flex-col md:w-4/6 w-full ',
          children: Object.entries(f).map(([y, v]) =>
            s.jsxs(
              'div',
              {
                children: [
                  s.jsxs('p', {
                    className: 'font-bold text-lg bg-slate-400 pl-3 mt-2',
                    children: ['Date: ', y, ' (', h(y), ')'],
                  }),
                  v.map((x, j) =>
                    s.jsx(
                      sy,
                      {
                        firstName: x.firstName,
                        lastName: x.lastName,
                        DOB: x.DOB,
                        DLnumber: x.DLnumber,
                        phone: x.phone,
                        email: x.email,
                        location: x.location,
                        date: x.date,
                        time: x.time,
                        truck: x.truck,
                        transmission: x.transmission,
                        permitExpiryDate: x.permitExpiryDate,
                        pr: x.checkboxOption,
                        id: x._id,
                        refreshAppointments: u,
                        deleteApp: o,
                      },
                      j
                    )
                  ),
                ],
              },
              y
            )
          ),
        }),
      ],
    });
  };
function oy() {
  return s.jsxs('div', {
    children: [
      s.jsx(v0, {}),
      s.jsx('img', {
        src: Rx,
        className: 'w-auto h-100',
        alt: 'Truck',
        id: 'home',
      }),
      s.jsx($x, {}),
      s.jsx(Mx, {}),
      s.jsx(Bx, {}),
      s.jsx(c0, {}),
      s.jsx(Qx, {}),
      s.jsx(Kx, {}),
    ],
  });
}
function ay() {
  return s.jsxs('div', {
    className: 'bg-gray-500 pb-10  ',
    children: [
      s.jsx(Vg, {}),
      s.jsx(ga, {}),
      s.jsxs(ua, {
        children: [
          s.jsx(ze, {
            path: 'students',
            element: s.jsx(Kv, {}),
          }),
          s.jsx(ze, {
            path: 'appointments',
            element: s.jsx(qv, {}),
          }),
        ],
      }),
    ],
  });
}
function uy() {
  return s.jsxs('div', {
    className: 'bg-gray-500 pb-10  ',
    children: [s.jsx(Xv, {}), s.jsx(ga, {}), s.jsx(ey, {})],
  });
}
function cy() {
  return s.jsxs('div', {
    className: 'bg-gray-500 pb-10',
    children: [
      s.jsx(ty, {}),
      s.jsx(ga, {}),
      s.jsxs(ua, {
        children: [
          s.jsx(ze, {
            path: 'students',
            element: s.jsx(ly, {}),
          }),
          s.jsx(ze, {
            path: 'appointments',
            element: s.jsx(iy, {}),
          }),
        ],
      }),
    ],
  });
}
function dy() {
  return s.jsx(Ox, {
    children: s.jsx('div', {
      className: 'flex flex-col',
      children: s.jsxs(ua, {
        children: [
          s.jsx(ze, {
            path: '/',
            element: s.jsx(oy, {}),
          }),
          s.jsx(ze, {
            path: '/login',
            element: s.jsx(Ug, {}),
          }),
          s.jsx(ze, {
            path: '/register',
            element: s.jsx(Hg, {}),
          }),
          s.jsx(ze, {
            path: '/ui/*',
            element: s.jsx(ay, {}),
          }),
          s.jsx(ze, {
            path: '/studentui/*',
            element: s.jsx(uy, {}),
          }),
          s.jsx(ze, {
            path: '/instructorui/*',
            element: s.jsx(cy, {}),
          }),
        ],
      }),
    }),
  });
}
ai.createRoot(document.getElementById('root')).render(s.jsx(dy, {}));

var iScroll = function (an, Z) {
  function ah(f) {
    if ("" === am) {
      return f
    }
    f = f.charAt(0).toUpperCase() + f.substr(1);
    return am + f
  }

  var ao = Math, P = Z.createElement("div").style, am;
  a:{
    for (var aj = ["t", "webkitT", "MozT", "msT", "OT"], Y, X = 0, k = aj.length; X < k; X++) {
      if (Y = aj[X] + "ransform", Y in P) {
        am = aj[X].substr(0, aj[X].length - 1);
        break a
      }
    }
    am = !1
  }
  var ak = am ? "-" + am.toLowerCase() + "-" : "", ai = ah("transform"), g = ah("transitionProperty"), ad = ah("transitionDuration"), e = ah("transformOrigin"), d = ah("transitionTimingFunction"), i = ah("transitionDelay"), ag = /android/gi.test(navigator.appVersion), W = /iphone|ipad/gi.test(navigator.appVersion), aj = /hp-tablet/gi.test(navigator.appVersion), V = ah("perspective") in P, al = "ontouchstart" in an && !aj, T = !!am, c = ah("transition") in P, af = "onorientationchange" in an ? "orientationchange" : "resize", ac = al ? "touchstart" : "mousedown", U = al ? "touchmove" : "mousemove", S = al ? "touchend" : "mouseup", R = al ? "touchcancel" : "mouseup", ab = "Moz" == am ? "DOMMouseScroll" : "mousewheel", aa;
  aa = !1 === am ? !1 : {"": "transitionend", webkit: "webkitTransitionEnd", Moz: "transitionend", O: "oTransitionEnd", ms: "MSTransitionEnd"}[am];
  var b = an.requestAnimationFrame || an.webkitRequestAnimationFrame || an.mozRequestAnimationFrame || an.oRequestAnimationFrame || an.msRequestAnimationFrame || function (f) {
    return setTimeout(f, 1)
  }, Q = an.cancelRequestAnimationFrame || an.webkitCancelAnimationFrame || an.webkitCancelRequestAnimationFrame || an.mozCancelRequestAnimationFrame || an.oCancelRequestAnimationFrame || an.msCancelRequestAnimationFrame || clearTimeout, ae = V ? " translateZ(0)" : "", aj = function (f, h) {
    var l = this, j;
    l.wrapper = "object" == typeof f ? f : Z.getElementById(f);
    l.wrapper.style.overflow = "hidden";
    l.scroller = l.wrapper.children[0];
    l.options = {hScroll: !0, vScroll: !0, x: 0, y: 0, bounce: !0, bounceLock: !1, momentum: !0, lockDirection: !0, useTransform: !0, useTransition: !1, topOffset: 0, checkDOMChanges: !1, handleClick: !0, hScrollbar: false, vScrollbar: false, fixedScrollbar: ag, hideScrollbar: W, fadeScrollbar: W && V, scrollbarClass: "", zoom: !1, zoomMin: 1, zoomMax: 4, doubleTapZoom: 2, wheelAction: "scroll", snap: !1, snapThreshold: 1, onRefresh: null, onBeforeScrollStart: function (m) {
      m.preventDefault()
    }, onScrollStart: null, onBeforeScrollMove: null, onScrollMove: null, onBeforeScrollEnd: null, onScrollEnd: null, onTouchEnd: null, onDestroy: null, onZoomStart: null, onZoom: null, onZoomEnd: null};
    for (j in h) {
      l.options[j] = h[j]
    }
    l.x = l.options.x;
    l.y = l.options.y;
    l.options.useTransform = T && l.options.useTransform;
    l.options.hScrollbar = l.options.hScroll && l.options.hScrollbar;
    l.options.vScrollbar = l.options.vScroll && l.options.vScrollbar;
    l.options.zoom = l.options.useTransform && l.options.zoom;
    l.options.useTransition = c && l.options.useTransition;
    l.options.zoom && ag && (ae = "");
    l.scroller.style[g] = l.options.useTransform ? ak + "transform" : "top left";
    l.scroller.style[ad] = "0";
    l.scroller.style[e] = "0 0";
    l.options.useTransition && (l.scroller.style[d] = "cubic-bezier(0.33,0.66,0.66,1)");
    l.options.useTransform ? l.scroller.style[ai] = "translate(" + l.x + "px," + l.y + "px)" + ae : l.scroller.style.cssText += ";position:absolute;top:" + l.y + "px;left:" + l.x + "px";
    l.options.useTransition && (l.options.fixedScrollbar = !0);
    l.refresh();
    l._bind(af, an);
    l._bind(ac);
    al || (l._bind("mouseout", l.wrapper), "none" != l.options.wheelAction && l._bind(ab));
    l.options.checkDOMChanges && (l.checkDOMTime = setInterval(function () {
      l._checkDOMChanges()
    }, 500))
  };
  aj.prototype = {enabled: !0, x: 0, y: 0, steps: [], scale: 1, currPageX: 0, currPageY: 0, pagesX: [], pagesY: [], aniTime: null, wheelZoomCount: 0, handleEvent: function (f) {
    switch (f.type) {
      case ac:
        if (!al && 0 !== f.button) {
          break
        }
        this._start(f);
        break;
      case U:
        this._move(f);
        break;
      case S:
      case R:
        this._end(f);
        break;
      case af:
        this._resize();
        break;
      case ab:
        this._wheel(f);
        break;
      case"mouseout":
        this._mouseout(f);
        break;
      case aa:
        this._transitionEnd(f)
    }
  }, _checkDOMChanges: function () {
    !this.moved && (!this.zoomed && !(this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) && this.refresh()
  }, _scrollbar: function (f) {
    var h;
    this[f + "Scrollbar"] ? (this[f + "ScrollbarWrapper"] || (h = Z.createElement("div"), this.options.scrollbarClass ? h.className = this.options.scrollbarClass + f.toUpperCase() : h.style.cssText = "position:absolute;z-index:100;" + ("h" == f ? "height:7px;bottom:1px;left:2px;right:" + (this.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (this.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), h.style.cssText += ";pointer-events:none;" + ak + "transition-property:opacity;" + ak + "transition-duration:" + (this.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.hideScrollbar ? "0" : "1"), this.wrapper.appendChild(h), this[f + "ScrollbarWrapper"] = h, h = Z.createElement("div"), this.options.scrollbarClass || (h.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + ak + "background-clip:padding-box;" + ak + "box-sizing:border-box;" + ("h" == f ? "height:100%" : "width:100%") + ";" + ak + "border-radius:3px;border-radius:3px"), h.style.cssText += ";pointer-events:none;" + ak + "transition-property:" + ak + "transform;" + ak + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + ak + "transition-duration:0;" + ak + "transform: translate(0,0)" + ae, this.options.useTransition && (h.style.cssText += ";" + ak + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[f + "ScrollbarWrapper"].appendChild(h), this[f + "ScrollbarIndicator"] = h), "h" == f ? (this.hScrollbarSize = this.hScrollbarWrapper.clientWidth, this.hScrollbarIndicatorSize = ao.max(ao.round(this.hScrollbarSize * this.hScrollbarSize / this.scrollerW), 8), this.hScrollbarIndicator.style.width = this.hScrollbarIndicatorSize + "px", this.hScrollbarMaxScroll = this.hScrollbarSize - this.hScrollbarIndicatorSize, this.hScrollbarProp = this.hScrollbarMaxScroll / this.maxScrollX) : (this.vScrollbarSize = this.vScrollbarWrapper.clientHeight, this.vScrollbarIndicatorSize = ao.max(ao.round(this.vScrollbarSize * this.vScrollbarSize / this.scrollerH), 8), this.vScrollbarIndicator.style.height = this.vScrollbarIndicatorSize + "px", this.vScrollbarMaxScroll = this.vScrollbarSize - this.vScrollbarIndicatorSize, this.vScrollbarProp = this.vScrollbarMaxScroll / this.maxScrollY), this._scrollbarPos(f, !0)) : this[f + "ScrollbarWrapper"] && (T && (this[f + "ScrollbarIndicator"].style[ai] = ""), this[f + "ScrollbarWrapper"].parentNode.removeChild(this[f + "ScrollbarWrapper"]), this[f + "ScrollbarWrapper"] = null, this[f + "ScrollbarIndicator"] = null)
  }, _resize: function () {
    var f = this;
    setTimeout(function () {
      f.refresh()
    }, ag ? 200 : 0)
  }, _pos: function (f, h) {
    this.zoomed || (f = this.hScroll ? f : 0, h = this.vScroll ? h : 0, this.options.useTransform ? this.scroller.style[ai] = "translate(" + f + "px," + h + "px) scale(" + this.scale + ")" + ae : (f = ao.round(f), h = ao.round(h), this.scroller.style.left = f + "px", this.scroller.style.top = h + "px"), this.x = f, this.y = h, this._scrollbarPos("h"), this._scrollbarPos("v"))
  }, _scrollbarPos: function (f, h) {
    var j = "h" == f ? this.x : this.y;
    this[f + "Scrollbar"] && (j *= this[f + "ScrollbarProp"], 0 > j ? (this.options.fixedScrollbar || (j = this[f + "ScrollbarIndicatorSize"] + ao.round(3 * j), 8 > j && (j = 8), this[f + "ScrollbarIndicator"].style["h" == f ? "width" : "height"] = j + "px"), j = 0) : j > this[f + "ScrollbarMaxScroll"] && (this.options.fixedScrollbar ? j = this[f + "ScrollbarMaxScroll"] : (j = this[f + "ScrollbarIndicatorSize"] - ao.round(3 * (j - this[f + "ScrollbarMaxScroll"])), 8 > j && (j = 8), this[f + "ScrollbarIndicator"].style["h" == f ? "width" : "height"] = j + "px", j = this[f + "ScrollbarMaxScroll"] + (this[f + "ScrollbarIndicatorSize"] - j))), this[f + "ScrollbarWrapper"].style[i] = "0", this[f + "ScrollbarWrapper"].style.opacity = h && this.options.hideScrollbar ? "0" : "1", this[f + "ScrollbarIndicator"].style[ai] = "translate(" + ("h" == f ? j + "px,0)" : "0," + j + "px)") + ae)
  }, _start: function (f) {
    var h = al ? f.touches[0] : f, l, j;
    if (this.enabled) {
      this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, f);
      (this.options.useTransition || this.options.zoom) && this._transitionTime(0);
      this.zoomed = this.animating = this.moved = !1;
      this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0;
      this.options.zoom && (al && 1 < f.touches.length) && (j = ao.abs(f.touches[0].pageX - f.touches[1].pageX), l = ao.abs(f.touches[0].pageY - f.touches[1].pageY), this.touchesDistStart = ao.sqrt(j * j + l * l), this.originX = ao.abs(f.touches[0].pageX + f.touches[1].pageX - 2 * this.wrapperOffsetLeft) / 2 - this.x, this.originY = ao.abs(f.touches[0].pageY + f.touches[1].pageY - 2 * this.wrapperOffsetTop) / 2 - this.y, this.options.onZoomStart && this.options.onZoomStart.call(this, f));
      if (this.options.momentum && (this.options.useTransform ? (l = getComputedStyle(this.scroller, null)[ai].replace(/[^0-9\-.,]/g, "").split(","), j = 1 * l[4], l = 1 * l[5]) : (j = 1 * getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, ""), l = 1 * getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "")), j != this.x || l != this.y)) {
        this.options.useTransition ? this._unbind(aa) : Q(this.aniTime), this.steps = [], this._pos(j, l)
      }
      this.absStartX = this.x;
      this.absStartY = this.y;
      this.startX = this.x;
      this.startY = this.y;
      this.pointX = h.pageX;
      this.pointY = h.pageY;
      this.startTime = f.timeStamp || Date.now();
      this.options.onScrollStart && this.options.onScrollStart.call(this, f);
      this._bind(U);
      this._bind(S);
      this._bind(R)
    }
  }, _move: function (f) {
    var h = al ? f.touches[0] : f, o = h.pageX - this.pointX, n = h.pageY - this.pointY, m = this.x + o, l = this.y + n, j = f.timeStamp || Date.now();
    this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, f);
    if (this.options.zoom && al && 1 < f.touches.length) {
      m = ao.abs(f.touches[0].pageX - f.touches[1].pageX), l = ao.abs(f.touches[0].pageY - f.touches[1].pageY), this.touchesDist = ao.sqrt(m * m + l * l), this.zoomed = !0, h = 1 / this.touchesDistStart * this.touchesDist * this.scale, h < this.options.zoomMin ? h = 0.5 * this.options.zoomMin * Math.pow(2, h / this.options.zoomMin) : h > this.options.zoomMax && (h = 2 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / h)), this.lastScale = h / this.scale, m = this.originX - this.originX * this.lastScale + this.x, l = this.originY - this.originY * this.lastScale + this.y, this.scroller.style[ai] = "translate(" + m + "px," + l + "px) scale(" + h + ")" + ae, this.options.onZoom && this.options.onZoom.call(this, f)
    } else {
      this.pointX = h.pageX;
      this.pointY = h.pageY;
      if (0 < m || m < this.maxScrollX) {
        m = this.options.bounce ? this.x + o / 2 : 0 <= m || 0 <= this.maxScrollX ? 0 : this.maxScrollX
      }
      if (l > this.minScrollY || l < this.maxScrollY) {
        l = this.options.bounce ? this.y + n / 2 : l >= this.minScrollY || 0 <= this.maxScrollY ? this.minScrollY : this.maxScrollY
      }
      this.distX += o;
      this.distY += n;
      this.absDistX = ao.abs(this.distX);
      this.absDistY = ao.abs(this.distY);
      6 > this.absDistX && 6 > this.absDistY || (this.options.lockDirection && (this.absDistX > this.absDistY + 5 ? (l = this.y, n = 0) : this.absDistY > this.absDistX + 5 && (m = this.x, o = 0)), this.moved = !0, this._pos(m, l), this.dirX = 0 < o ? -1 : 0 > o ? 1 : 0, this.dirY = 0 < n ? -1 : 0 > n ? 1 : 0, 300 < j - this.startTime && (this.startTime = j, this.startX = this.x, this.startY = this.y), this.options.onScrollMove && this.options.onScrollMove.call(this, f))
    }
  }, _end: function (s) {
    if (!(al && 0 !== s.touches.length)) {
      var t = this, r = al ? s.changedTouches[0] : s, q, p, o = {dist: 0, time: 0}, m = {dist: 0, time: 0}, n = (s.timeStamp || Date.now()) - t.startTime, f = t.x, l = t.y;
      t._unbind(U);
      t._unbind(S);
      t._unbind(R);
      t.options.onBeforeScrollEnd && t.options.onBeforeScrollEnd.call(t, s);
      if (t.zoomed) {
        f = t.scale * t.lastScale, f = Math.max(t.options.zoomMin, f), f = Math.min(t.options.zoomMax, f), t.lastScale = f / t.scale, t.scale = f, t.x = t.originX - t.originX * t.lastScale + t.x, t.y = t.originY - t.originY * t.lastScale + t.y, t.scroller.style[ad] = "200ms", t.scroller.style[ai] = "translate(" + t.x + "px," + t.y + "px) scale(" + t.scale + ")" + ae, t.zoomed = !1, t.refresh(), t.options.onZoomEnd && t.options.onZoomEnd.call(t, s)
      } else {
        if (t.moved) {
          if (300 > n && t.options.momentum) {
            o = f ? t._momentum(f - t.startX, n, -t.x, t.scrollerW - t.wrapperW + t.x, t.options.bounce ? t.wrapperW : 0) : o;
            m = l ? t._momentum(l - t.startY, n, -t.y, 0 > t.maxScrollY ? t.scrollerH - t.wrapperH + t.y - t.minScrollY : 0, t.options.bounce ? t.wrapperH : 0) : m;
            f = t.x + o.dist;
            l = t.y + m.dist;
            if (0 < t.x && 0 < f || t.x < t.maxScrollX && f < t.maxScrollX) {
              o = {dist: 0, time: 0}
            }
            if (t.y > t.minScrollY && l > t.minScrollY || t.y < t.maxScrollY && l < t.maxScrollY) {
              m = {dist: 0, time: 0}
            }
          }
          o.dist || m.dist ? (o = ao.max(ao.max(o.time, m.time), 10), t.options.snap && (m = f - t.absStartX, n = l - t.absStartY, ao.abs(m) < t.options.snapThreshold && ao.abs(n) < t.options.snapThreshold ? t.scrollTo(t.absStartX, t.absStartY, 200) : (m = t._snap(f, l), f = m.x, l = m.y, o = ao.max(m.time, o))), t.scrollTo(ao.round(f), ao.round(l), o)) : t.options.snap ? (m = f - t.absStartX, n = l - t.absStartY, ao.abs(m) < t.options.snapThreshold && ao.abs(n) < t.options.snapThreshold ? t.scrollTo(t.absStartX, t.absStartY, 200) : (m = t._snap(t.x, t.y), (m.x != t.x || m.y != t.y) && t.scrollTo(m.x, m.y, m.time))) : t._resetPos(200)
        } else {
          al && (t.doubleTapTimer && t.options.zoom ? (clearTimeout(t.doubleTapTimer), t.doubleTapTimer = null, t.options.onZoomStart && t.options.onZoomStart.call(t, s), t.zoom(t.pointX, t.pointY, 1 == t.scale ? t.options.doubleTapZoom : 1), t.options.onZoomEnd && setTimeout(function () {
            t.options.onZoomEnd.call(t, s)
          }, 200)) : this.options.handleClick && (t.doubleTapTimer = setTimeout(function () {
            t.doubleTapTimer = null;
            for (q = r.target; 1 != q.nodeType;) {
              q = q.parentNode
            }
            "SELECT" != q.tagName && ("INPUT" != q.tagName && "TEXTAREA" != q.tagName) && (p = Z.createEvent("MouseEvents"), p.initMouseEvent("click", !0, !0, s.view, 1, r.screenX, r.screenY, r.clientX, r.clientY, s.ctrlKey, s.altKey, s.shiftKey, s.metaKey, 0, null), p._fake = !0, q.dispatchEvent(p))
          }, t.options.zoom ? 250 : 0))), t._resetPos(200)
        }
        t.options.onTouchEnd && t.options.onTouchEnd.call(t, s)
      }
    }
  }, _resetPos: function (f) {
    var h = 0 <= this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, j = this.y >= this.minScrollY || 0 < this.maxScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y;
    if (h == this.x && j == this.y) {
      if (this.moved && (this.moved = !1, this.options.onScrollEnd && this.options.onScrollEnd.call(this)), this.hScrollbar && this.options.hideScrollbar && ("webkit" == am && (this.hScrollbarWrapper.style[i] = "300ms"), this.hScrollbarWrapper.style.opacity = "0"), this.vScrollbar && this.options.hideScrollbar) {
        "webkit" == am && (this.vScrollbarWrapper.style[i] = "300ms"), this.vScrollbarWrapper.style.opacity = "0"
      }
    } else {
      this.scrollTo(h, j, f || 0)
    }
  }, _wheel: function (f) {
    var h = this, l, j;
    if ("wheelDeltaX" in f) {
      l = f.wheelDeltaX / 12, j = f.wheelDeltaY / 12
    } else {
      if ("wheelDelta" in f) {
        l = j = f.wheelDelta / 12
      } else {
        if ("detail" in f) {
          l = j = 3 * -f.detail
        } else {
          return
        }
      }
    }
    if ("zoom" == h.options.wheelAction) {
      if (j = h.scale * Math.pow(2, 1 / 3 * (j ? j / Math.abs(j) : 0)), j < h.options.zoomMin && (j = h.options.zoomMin), j > h.options.zoomMax && (j = h.options.zoomMax), j != h.scale) {
        !h.wheelZoomCount && h.options.onZoomStart && h.options.onZoomStart.call(h, f), h.wheelZoomCount++, h.zoom(f.pageX, f.pageY, j, 400), setTimeout(function () {
          h.wheelZoomCount--;
          !h.wheelZoomCount && h.options.onZoomEnd && h.options.onZoomEnd.call(h, f)
        }, 400)
      }
    } else {
      l = h.x + l, j = h.y + j, 0 < l ? l = 0 : l < h.maxScrollX && (l = h.maxScrollX), j > h.minScrollY ? j = h.minScrollY : j < h.maxScrollY && (j = h.maxScrollY), 0 > h.maxScrollY && h.scrollTo(l, j, 0)
    }
  }, _mouseout: function (f) {
    var h = f.relatedTarget;
    if (h) {
      for (; h = h.parentNode;) {
        if (h == this.wrapper) {
          return
        }
      }
    }
    this._end(f)
  }, _transitionEnd: function (f) {
    f.target == this.scroller && (this._unbind(aa), this._startAni())
  }, _startAni: function () {
    var f = this, h = f.x, o = f.y, n = Date.now(), m, l, j;
    f.animating || (f.steps.length ? (m = f.steps.shift(), m.x == h && m.y == o && (m.time = 0), f.animating = !0, f.moved = !0, f.options.useTransition) ? (f._transitionTime(m.time), f._pos(m.x, m.y), f.animating = !1, m.time ? f._bind(aa) : f._resetPos(0)) : (j = function () {
      var q = Date.now(), p;
      if (q >= n + m.time) {
        f._pos(m.x, m.y);
        f.animating = false;
        f.options.onAnimationEnd && f.options.onAnimationEnd.call(f);
        f._startAni()
      } else {
        q = (q - n) / m.time - 1;
        l = ao.sqrt(1 - q * q);
        q = (m.x - h) * l + h;
        p = (m.y - o) * l + o;
        f._pos(q, p);
        if (f.animating) {
          f.aniTime = b(j)
        }
      }
    }, j()) : f._resetPos(400))
  }, _transitionTime: function (f) {
    f += "ms";
    this.scroller.style[ad] = f;
    this.hScrollbar && (this.hScrollbarIndicator.style[ad] = f);
    this.vScrollbar && (this.vScrollbarIndicator.style[ad] = f)
  }, _momentum: function (f, h, n, m, l) {
    var h = ao.abs(f) / h, j = h * h / 0.0012;
    0 < f && j > n ? (n += l / (6 / (0.0006 * (j / h))), h = h * n / j, j = n) : 0 > f && j > m && (m += l / (6 / (0.0006 * (j / h))), h = h * m / j, j = m);
    return{dist: j * (0 > f ? -1 : 1), time: ao.round(h / 0.0006)}
  }, _offset: function (f) {
    for (var h = -f.offsetLeft, j = -f.offsetTop; f = f.offsetParent;) {
      h -= f.offsetLeft, j -= f.offsetTop
    }
    f != this.wrapper && (h *= this.scale, j *= this.scale);
    return{left: h, top: j}
  }, _snap: function (f, h) {
    var m, l, j;
    j = this.pagesX.length - 1;
    m = 0;
    for (l = this.pagesX.length; m < l; m++) {
      if (f >= this.pagesX[m]) {
        j = m;
        break
      }
    }
    j == this.currPageX && (0 < j && 0 > this.dirX) && j--;
    f = this.pagesX[j];
    l = (l = ao.abs(f - this.pagesX[this.currPageX])) ? 500 * (ao.abs(this.x - f) / l) : 0;
    this.currPageX = j;
    j = this.pagesY.length - 1;
    for (m = 0; m < j; m++) {
      if (h >= this.pagesY[m]) {
        j = m;
        break
      }
    }
    j == this.currPageY && (0 < j && 0 > this.dirY) && j--;
    h = this.pagesY[j];
    m = (m = ao.abs(h - this.pagesY[this.currPageY])) ? 500 * (ao.abs(this.y - h) / m) : 0;
    this.currPageY = j;
    j = ao.round(ao.max(l, m)) || 200;
    return{x: f, y: h, time: j}
  }, _bind: function (f, h, j) {
    (h || this.scroller).addEventListener(f, this, !!j)
  }, _unbind: function (f, h, j) {
    (h || this.scroller).removeEventListener(f, this, !!j)
  }, destroy: function () {
    this.scroller.style[ai] = "";
    this.vScrollbar = this.hScrollbar = !1;
    this._scrollbar("h");
    this._scrollbar("v");
    this._unbind(af, an);
    this._unbind(ac);
    this._unbind(U);
    this._unbind(S);
    this._unbind(R);
    this.options.hasTouch || (this._unbind("mouseout", this.wrapper), this._unbind(ab));
    this.options.useTransition && this._unbind(aa);
    this.options.checkDOMChanges && clearInterval(this.checkDOMTime);
    this.options.onDestroy && this.options.onDestroy.call(this)
  }, refresh: function () {
    var f, h, l, j = 0;
    h = 0;
    this.scale < this.options.zoomMin && (this.scale = this.options.zoomMin);
    this.wrapperW = this.wrapper.clientWidth || 1;
    this.wrapperH = this.wrapper.clientHeight || 1;
    this.minScrollY = -this.options.topOffset || 0;
    this.scrollerW = ao.round(this.scroller.offsetWidth * this.scale);
    this.scrollerH = ao.round((this.scroller.offsetHeight + this.minScrollY) * this.scale);
    this.maxScrollX = this.wrapperW - this.scrollerW;
    this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY;
    this.dirY = this.dirX = 0;
    this.options.onRefresh && this.options.onRefresh.call(this);
    this.hScroll = this.options.hScroll && 0 > this.maxScrollX;
    this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH);
    this.hScrollbar = this.hScroll && this.options.hScrollbar;
    this.vScrollbar = this.vScroll && this.options.vScrollbar && this.scrollerH > this.wrapperH;
    f = this._offset(this.wrapper);
    this.wrapperOffsetLeft = -f.left;
    this.wrapperOffsetTop = -f.top;
    if ("string" == typeof this.options.snap) {
      this.pagesX = [];
      this.pagesY = [];
      l = this.scroller.querySelectorAll(this.options.snap);
      f = 0;
      for (h = l.length; f < h; f++) {
        j = this._offset(l[f]), j.left += this.wrapperOffsetLeft, j.top += this.wrapperOffsetTop, this.pagesX[f] = j.left < this.maxScrollX ? this.maxScrollX : j.left * this.scale, this.pagesY[f] = j.top < this.maxScrollY ? this.maxScrollY : j.top * this.scale
      }
    } else {
      if (this.options.snap) {
        for (this.pagesX = []; j >= this.maxScrollX;) {
          this.pagesX[h] = j, j -= this.wrapperW, h++
        }
        this.maxScrollX % this.wrapperW && (this.pagesX[this.pagesX.length] = this.maxScrollX - this.pagesX[this.pagesX.length - 1] + this.pagesX[this.pagesX.length - 1]);
        h = j = 0;
        for (this.pagesY = []; j >= this.maxScrollY;) {
          this.pagesY[h] = j, j -= this.wrapperH, h++
        }
        this.maxScrollY % this.wrapperH && (this.pagesY[this.pagesY.length] = this.maxScrollY - this.pagesY[this.pagesY.length - 1] + this.pagesY[this.pagesY.length - 1])
      }
    }
    this._scrollbar("h");
    this._scrollbar("v");
    this.zoomed || (this.scroller.style[ad] = "0", this._resetPos(200))
  }, scrollTo: function (f, h, m, l) {
    var j = f;
    this.stop();
    j.length || (j = [
      {x: f, y: h, time: m, relative: l}
    ]);
    f = 0;
    for (h = j.length; f < h; f++) {
      j[f].relative && (j[f].x = this.x - j[f].x, j[f].y = this.y - j[f].y), this.steps.push({x: j[f].x, y: j[f].y, time: j[f].time || 0})
    }
    this._startAni()
  }, scrollToElement: function (f, h) {
    var j;
    if (f = f.nodeType ? f : this.scroller.querySelector(f)) {
      j = this._offset(f), j.left += this.wrapperOffsetLeft, j.top += this.wrapperOffsetTop, j.left = 0 < j.left ? 0 : j.left < this.maxScrollX ? this.maxScrollX : j.left, j.top = j.top > this.minScrollY ? this.minScrollY : j.top < this.maxScrollY ? this.maxScrollY : j.top, h = void 0 === h ? ao.max(2 * ao.abs(j.left), 2 * ao.abs(j.top)) : h, this.scrollTo(j.left, j.top, h)
    }
  }, scrollToPage: function (f, h, j) {
    j = void 0 === j ? 400 : j;
    this.options.onScrollStart && this.options.onScrollStart.call(this);
    if (this.options.snap) {
      f = "next" == f ? this.currPageX + 1 : "prev" == f ? this.currPageX - 1 : f, h = "next" == h ? this.currPageY + 1 : "prev" == h ? this.currPageY - 1 : h, f = 0 > f ? 0 : f > this.pagesX.length - 1 ? this.pagesX.length - 1 : f, h = 0 > h ? 0 : h > this.pagesY.length - 1 ? this.pagesY.length - 1 : h, this.currPageX = f, this.currPageY = h, f = this.pagesX[f], h = this.pagesY[h]
    } else {
      if (f *= -this.wrapperW, h *= -this.wrapperH, f < this.maxScrollX && (f = this.maxScrollX), h < this.maxScrollY) {
        h = this.maxScrollY
      }
    }
    this.scrollTo(f, h, j)
  }, disable: function () {
    this.stop();
    this._resetPos(0);
    this.enabled = !1;
    this._unbind(U);
    this._unbind(S);
    this._unbind(R)
  }, enable: function () {
    this.enabled = !0
  }, stop: function () {
    this.options.useTransition ? this._unbind(aa) : Q(this.aniTime);
    this.steps = [];
    this.animating = this.moved = !1
  }, zoom: function (f, h, m, l) {
    var j = m / this.scale;
    this.options.useTransform && (this.zoomed = !0, l = void 0 === l ? 200 : l, f = f - this.wrapperOffsetLeft - this.x, h = h - this.wrapperOffsetTop - this.y, this.x = f - f * j + this.x, this.y = h - h * j + this.y, this.scale = m, this.refresh(), this.x = 0 < this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, this.y = this.y > this.minScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y, this.scroller.style[ad] = l + "ms", this.scroller.style[ai] = "translate(" + this.x + "px," + this.y + "px) scale(" + m + ")" + ae, this.zoomed = !1)
  }, isReady: function () {
    return !this.moved && !this.zoomed && !this.animating
  }};
  P = null;
  return aj
}(window, document);
var Scrollable = function (h, g) {
  function b() {
    b._enableScrolling.apply(this, arguments)
  }

  b.node = function () {
    return b._getScrollableNode.apply(this, arguments)
  };
  b.infinite = function () {
    return b._enableInfiniteScrolling.apply(this, arguments)
  };
  if (h && h.fn) {
    h.extend(h.fn, {scrollable: function (i) {
      this.forEach(function (j) {
        b._enableScrolling(j, i)
      });
      return this
    }, scrollableNode: function () {
      return h(this.map(function () {
        return b._getScrollableNode(this)
      }))
    }, scrollableInfinite: function (j, k) {
      var i;
      this.forEach(function (m) {
        var l = b._enableInfiniteScrolling(m, j, k);
        if (!i) {
          i = l
        }
      });
      return i
    }});
    var d = h.fn.scrollTop, f = h.fn.scrollLeft;
    h.fn.scrollTop = function (k) {
      if (typeof k === "undefined") {
        var i = this[0], j = b._isDOMNode(i);
        if (j && i._scrollTop) {
          return i._scrollTop()
        } else {
          if (d) {
            return d.apply(this, arguments)
          } else {
            if (j) {
              return i.scrollTop
            } else {
              return null
            }
          }
        }
      }
      this.forEach(function (l) {
        var m = b._isDOMNode(l);
        if (m && l._scrollTop) {
          l._scrollTop(k)
        } else {
          if (d) {
            d.call(h(l), k)
          } else {
            if (m) {
              l.scrollTop = k
            }
          }
        }
      });
      return this
    };
    h.fn.scrollLeft = function (k) {
      if (typeof k === "undefined") {
        var i = this[0], j = b._isDOMNode(i);
        if (j && i._scrollLeft) {
          return i._scrollLeft()
        } else {
          if (d) {
            return f.apply(this, arguments)
          } else {
            if (j) {
              return i.scrollLeft
            } else {
              return null
            }
          }
        }
      }
      this.forEach(function (l) {
        var m = b._isDOMNode(l);
        if (m && l._scrollLeft) {
          l._scrollLeft(k)
        } else {
          if (f) {
            f.call(h(l), k)
          } else {
            if (m) {
              l.scrollLeft = k
            }
          }
        }
      });
      return this
    }
  }
  if (g && g.fn) {
    g.fn.scrollable = function (i) {
      this.each(function () {
        b._enableScrolling(this, i)
      });
      return this
    };
    g.fn.scrollableNode = function () {
      return g(this.map(function () {
        return b._getScrollableNode(this)
      }))
    };
    g.fn.scrollableInfinite = function (j, k) {
      var i;
      this.each(function () {
        var l = b._enableInfiniteScrolling(this, j, k);
        if (!i) {
          i = l
        }
      });
      return i
    };
    var c = g.fn.scrollTop, e = g.fn.scrollLeft;
    g.fn.scrollTop = function (j) {
      if (typeof j === "undefined") {
        var i = this[0];
        if (b._isDOMNode(i) && i._scrollTop) {
          return i._scrollTop()
        } else {
          return c.apply(this, arguments)
        }
      }
      this.each(function () {
        if (b._isDOMNode(this) && this._scrollTop) {
          this._scrollTop(j)
        } else {
          c.call(g(this), j)
        }
      });
      return this
    };
    g.fn.scrollLeft = function (j) {
      if (typeof j === "undefined") {
        var i = this[0];
        if (b._isDOMNode(i) && i._scrollLeft) {
          return i._scrollLeft()
        } else {
          return e.apply(this, arguments)
        }
      }
      this.each(function () {
        if (b._isDOMNode(this) && this._scrollLeft) {
          this._scrollLeft(j)
        } else {
          e.call(g(this), j)
        }
      });
      return this
    }
  }
  return b
}(window.Zepto, window.jQuery);
Scrollable._os = function (g, e) {
  var d, b, c;
  if (c = /\bCPU.*OS (\d+(_\d+)?)/i.exec(g)) {
    d = "ios";
    b = c[1].replace("_", ".")
  } else {
    if (c = /\bAndroid (\d+(\.\d+)?)/.exec(g)) {
      d = "android";
      b = c[1]
    }
  }
  var f = {name: d, version: b && e(b), mobile: !!d};
  f[d] = true;
  return f
}(navigator.userAgent, parseFloat);
Scrollable._isArray = function (b) {
  return function (c) {
    if (b) {
      return b(c)
    } else {
      return Object.prototype.toString.call(c) !== "[object Array]"
    }
  }
}(Array.isArray);
Scrollable._isDOMNode = function (b, c) {
  return function (e) {
    if (!e) {
      return false
    }
    try {
      return(e instanceof b) || (e instanceof c)
    } catch (d) {
    }
    if (typeof e !== "object") {
      return false
    }
    if (typeof e.nodeType !== "number") {
      return false
    }
    if (typeof e.nodeName !== "string") {
      return false
    }
    return true
  }
}(Node, HTMLElement);
Scrollable._isjQueryElem = function (b) {
  if (typeof b !== "object" || b === null) {
    return false
  } else {
    return(b.val && b.addClass && b.css && b.html && b.show)
  }
};
Scrollable._findInArray = function (b) {
  return function (d, f, g) {
    if (b) {
      return b.call(d, f, g)
    }
    for (var e = g || 0, c = d.length; e < c; e++) {
      if ((e in d) && (d[e] === f)) {
        return e
      }
    }
    return -1
  }
}(Array.prototype.indexOf);
Scrollable._forEachInArray = function (b) {
  return function (d, g, e) {
    if (b) {
      return b.call(d, g, e)
    }
    for (var f = 0, c = d.length; f < c; f++) {
      if (f in d) {
        g.call(e, d[f], f, d)
      }
    }
  }
}(Array.prototype.forEach);
Scrollable._onReady = function (c, d, i) {
  var h = [], g = false;
  e(f);
  return function (j) {
    if (g) {
      j()
    } else {
      h.push(j)
    }
  };
  function f() {
    if (g) {
      return
    }
    g = true;
    i(h, function (j) {
      setTimeout(j, 0)
    })
  }

  function b(k) {
    try {
      c.documentElement.doScroll("left")
    } catch (j) {
      setTimeout(function () {
        b(k)
      }, 1);
      return
    }
    k()
  }

  function e(l) {
    if (c.readyState === "complete") {
      setTimeout(l, 0);
      return
    }
    if (c.addEventListener) {
      c.addEventListener("DOMContentLoaded", l, false);
      d.addEventListener("load", l, false)
    } else {
      if (c.attachEvent) {
        c.attachEvent("onreadystatechange", l);
        d.attachEvent("onload", l);
        var j = false;
        try {
          j = (d.frameElement === null)
        } catch (k) {
        }
        if (c.documentElement.doScroll && j) {
          setTimeout(function () {
            b(l)
          }, 0)
        }
      }
    }
  }
}(document, window, Scrollable._forEachInArray);
Scrollable._scrollWatcher = function (b) {
  return c;
  function c(i) {
    var j = false, e = false, l = i.scrollTop;
    i.addEventListener("touchstart", h);
    i.addEventListener("touchmove", d);
    i.addEventListener("touchcancel", g);
    i.addEventListener("touchend", o);
    i.addEventListener("scroll", k);
    n();
    i._resetScrolling = f;
    return;
    function n() {
      i._isScrolling = (e || j)
    }

    function f() {
      e = false;
      j = false;
      n()
    }

    function m(r, q, p) {
      if ((r.touches.length <= q) && ((typeof p === "undefined") || (r.changedTouches.length <= p))) {
        return false
      }
      r.preventDefault();
      f();
      return true
    }

    function h(p) {
      if (m(p, 1)) {
        return
      }
      f()
    }

    function d(p) {
      if (m(p, 1)) {
        return
      }
      j = true;
      l = i.scrollTop;
      n()
    }

    function g(p) {
      if (m(p, 0, 1)) {
        return
      }
      f()
    }

    function o(p) {
      if (m(p, 0, 1)) {
        return
      }
      var q;
      if (j) {
        q = Math.abs(i.scrollTop - l);
        if (q > 5) {
          e = true
        }
        j = false;
        n()
      }
    }

    function k() {
      if (!j && e) {
        f()
      }
    }
  }
}(Scrollable._os);
Scrollable._enableScrolling = function (f, o, k, e, d, p, m, n) {
  var j = i();
  return q;
  function i() {
    if ((f.ios && (f.version >= 5)) || (f.android && (f.version >= 4))) {
      return true
    } else {
      return false
    }
  }

  function q(t, s) {
    if (!o(t)) {
      throw t + " is not a DOM element"
    }
    if (t._scrollable) {
      return
    }
    t._scrollable = true;
    var r;
    t._scrollTop = function (u, v) {
      if (typeof u === "undefined") {
        return r ? Math.max(parseInt(-r.y), 0) : t.scrollTop
      }
      if (!r && (!f.mobile || j)) {
        t.scrollTop = u;
        v && v();
        return
      }
      k(function () {
        r.scrollTo(r.x, Math.min(-u, 0), 1);
        v && v()
      })
    };
    t._scrollLeft = function (u) {
      if (typeof u === "undefined") {
        return r ? Math.max(parseInt(-r.x), 0) : t.scrollLeft
      }
      if (!r && (!f.mobile || j)) {
        t.scrollLeft = u;
        return
      }
      k(function () {
        r.scrollTo(Math.min(-u, 0), r.y, 1)
      })
    };
    t.style.overflow = "scroll";
    if (!s) {
      if (!f.mobile) {
        return
      }
      if (j) {
        t.style["-webkit-overflow-scrolling"] = "touch";
        if (f.ios) {
          d(t)
        }
        return
      }
    }
    c(t, function (u) {
      r = u
    })
  }

  function c(s, t) {
    s._iScroll = true;
    l(s);
    var r = g(s);
    k(function () {
      var u = new p(s, {checkDOMChanges: true, useTransform: true, useTransition: true, hScrollbar: false, vScrollbar: false, bounce: !!f.ios, onScrollMove: r, onBeforeScrollEnd: r, onScrollEnd: function () {
        s._iScrolling = false;
        r()
      }, onBeforeScrollStart: h, onScrollStart: function () {
        s._iScrolling = true
      }});
      s._iScroll = u;
      t(u)
    })
  }

  function l(s) {
    var t = n.createElement("div"), r = Array.prototype.slice.call(s.childNodes || []);
    e(r, function (v) {
      var u = s.removeChild(v);
      t.appendChild(u)
    });
    s.appendChild(t);
    s.style.position = "relative";
    t.style["min-height"] = "100%";
    t.style["min-width"] = "100%"
  }

  function g(s) {
    var r, t;
    return function () {
      var v = s._scrollTop(), u = s._scrollLeft();
      if ((v === r) && (u === t)) {
        return
      }
      r = v;
      t = u;
      b(s)
    }
  }

  function b(s) {
    if (s.dispatchEvent) {
      var r = n.createEvent("MouseEvents");
      r.initMouseEvent("scroll", false, false, m, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      s.dispatchEvent(r)
    }
  }

  function h(s) {
    var r = s.target;
    while (r.nodeType !== 1) {
      r = r.parentNode
    }
    if ((r.tagName !== "SELECT") && (r.tagName !== "INPUT") && (r.tagName !== "TEXTAREA")) {
      s.preventDefault()
    }
  }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._onReady, Scrollable._forEachInArray, Scrollable._scrollWatcher, iScroll, window, document);
Scrollable._getScrollableNode = function (b) {
  return function (c) {
    if (b(c) && c._iScroll) {
      return c.childNodes[0]
    } else {
      return c
    }
  }
}(Scrollable._isDOMNode);
Scrollable._enableInfiniteScrolling = function (g, l, f, h, i, m, d, n) {
  var e = 320;
  return j;
  function j(J, q, y) {
    if (f(J)) {
      if (J.length) {
        var E = J.length - 1;
        for (var F = 0; F < E; F++) {
          j(J[F], q, y)
        }
        return j(J[E], q, y)
      } else {
        return
      }
    }
    if (!l(J)) {
      throw J + " is not a DOM element"
    }
    if (!y && typeof q === "function") {
      y = q;
      q = {}
    }
    if (y) {
      if (q.downGenerator) {
        throw Error("Two downGenerator functions specified")
      }
      q.downGenerator = y
    }
    if ((typeof q !== "object") || (q === null)) {
      throw TypeError("options must be an object if defined, got " + q)
    }
    if (!q.downGenerator && !q.upGenerator) {
      throw Error("No generators specified. What are you even scrolling?")
    }
    if (typeof q.autoStart === "undefined") {
      q.autoStart = true
    }
    if (q.downGenerator && typeof q.downGenerator !== "function") {
      throw"downGenerator " + downGenerator + " is not a function"
    }
    if (q.upGenerator && typeof q.upGenerator !== "function") {
      throw"upGenerator " + upGenerator + " is not a function"
    }
    if (q.scroller && !l(q.scroller)) {
      throw TypeError("options.scroller must be a DOM node, got " + q.scroller)
    }
    var I = q.scroller || b(J), t = q.loading, s = q.triggerRadius, x = false, z = !q.upGenerator, G = !q.downGenerator, B = false, L = false, C, K, w;
    if (f(I)) {
      I = I[0]
    }
    if (f(t)) {
      t = t[0]
    }
    if (t === null) {
      t = undefined
    }
    if (typeof t !== "undefined") {
      if (q.downGenerator) {
        C = c([t])[0];
        if (q.downGenerator) {
          K = C.cloneNode(true)
        }
      } else {
        K = c([t])[0]
      }
    }
    if (s === null) {
      s = undefined
    }
    switch (typeof s) {
      case"undefined":
        s = e;
      case"number":
        break;
      default:
        throw TypeError("trigger radius must be a number if defined, got " + s)
    }
    if (!I) {
      m(J);
      I = J
    }
    if (C) {
      d(J).appendChild(C)
    }
    D();
    if (q.autoStart) {
      A()
    }
    var H = {layout: A, forceLayout: v, isEnabled: M, enable: D, disable: u, destroy: p};
    if (!I._infinites) {
      I._infinites = []
    }
    I._infinites.push(H);
    return H;
    function M() {
      return x
    }

    function D() {
      if (x) {
        return
      }
      if (B) {
        throw Error("cannot enable infinite scroller that has been destroyed")
      }
      x = true;
      I.addEventListener("scroll", A, false)
    }

    function u() {
      if (!x) {
        return
      }
      x = false;
      I.removeEventListener("scroll", A)
    }

    function A() {
      if (!x || L || B) {
        return
      }
      var O = o(I, s);
      if (!O) {
        return
      }
      var N = (O === "up");
      if (N && (J._isScrolling || J._iScrolling)) {
        if (w) {
          clearTimeout(w)
        }
        w = setTimeout(function () {
          A()
        }, 100);
        return
      }
      L = true;
      r(N, function (P) {
        L = false;
        if (P) {
          A()
        } else {
          p(N)
        }
      })
    }

    function v(N) {
      if (!x || B || L) {
        return
      }
      L = true;
      if (typeof N === "undefined") {
        N = !q.downGenerator
      }
      r(N, function (O) {
        L = false;
        if (O) {
          A()
        } else {
          p(N)
        }
      })
    }

    function r(Q, S) {
      var R = Q ? q.upGenerator : q.downGenerator;
      var N = R(O);
      if (typeof N !== "undefined") {
        O(N)
      }
      function O(U, X) {
        if (B || (z && Q) || (G && !Q)) {
          return
        }
        var aa = Q ? K : C;
        var T = U && U.length && !X;
        if (U) {
          if (!h(U) && !f(U)) {
            U = [U]
          }
          U = c(U);
          var Y = d(J);
          var W = I.scrollHeight;
          i(U, function (ab) {
            P(Y, ab)
          });
          if (aa) {
            P(Y, aa)
          }
          var V = I.scrollHeight;
          if (Q) {
            var Z = V - W;
            I._scrollTop(I._scrollTop() + Z, function () {
              if (!!g.ios && !I._iScroll) {
                k(U)
              }
              S(T)
            })
          } else {
            S(T)
          }
        } else {
          S(T)
        }
      }

      function P(U, T) {
        if (Q) {
          U.insertBefore(T, U.firstChild)
        } else {
          U.appendChild(T)
        }
      }
    }

    function p(N) {
      if (B) {
        return
      }
      if (N) {
        z = true;
        if (K && K.parentNode) {
          K.parentNode.removeChild(K)
        }
      } else {
        G = true;
        if (C && C.parentNode) {
          C.parentNode.removeChild(C)
        }
      }
      B = (G || !q.downGenerator) && (z || !q.upGenerator);
      if (B) {
        u()
      }
    }

    function o(O, N) {
      var R = O;
      while (R !== document.documentElement) {
        if (R.parentNode) {
          R = R.parentNode
        } else {
          return false
        }
      }
      var P = O.clientHeight, S = (O._scrollTop ? O._scrollTop() : O.scrollTop), Q = O.scrollHeight;
      if (!G && Q - S - P <= N) {
        return"down"
      } else {
        if (!z && S < N) {
          return"up"
        } else {
          return false
        }
      }
    }
  }

  function b(o) {
    do {
      if (o._scrollable) {
        return o
      }
      o = o.parentNode
    } while (o)
  }

  function c(o) {
    var p = [];
    i(o, function (q) {
      switch (typeof q) {
        case"undefined":
          return;
        case"string":
          var r = document.createElement("div");
          r.innerHTML = q;
          if (r.childNodes) {
            i(c(r.childNodes), function (s) {
              p.push(s)
            })
          }
          return;
        case"object":
          if (q === null) {
            return
          } else {
            if (l(q)) {
              p.push(q);
              return
            } else {
              if (f(q)) {
                i(q, function (s) {
                  p.push(s)
                });
                return
              }
            }
          }
        default:
          throw TypeError("expected an element, got " + q)
      }
    });
    return p
  }

  function k(o) {
    i(o, function (q) {
      var p = q.style.webkitTransform;
      q.style.webkitTransform = "translate3d(0,0,0)";
      setTimeout(function () {
        q.style.webkitTransform = p
      }, 0)
    })
  }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._isjQueryElem, Scrollable._isArray, Scrollable._forEachInArray, Scrollable._enableScrolling, Scrollable._getScrollableNode, window.jQuery);

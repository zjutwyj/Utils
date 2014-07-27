/**
 * @description promise
 * @namespace promise
 * @author yongjin on 2014/7/23
 */

//javascript异步编程之:世界上最短的Promise库
var Promise = function () {
    this.thens = [];
};
Promise.prototype = {
    resolve: function () {
        var t = this.thens.shift(), n;
        t && (n = t.apply(null, arguments), n instanceof Promise && (n.thens = this.thens));
    },
    then: function (n) {
        return this.thens.push(n), this;
    }
}


// 实用方式
function f1() {
    var promise = new Promise();
    setTimeout(function () {

        alert(1);
        promise.resolve();
    }, 1500)

    return promise;
}

function f2() {
    var promise = new Promise();
    setTimeout(function () {

        alert(2);
        promise.resolve();
    }, 1500)

    return promise;
}

function f3() {
    var promise = new Promise();
    setTimeout(function () {

        alert(3);
        promise.resolve();
    }, 1500)

    return promise;

}

function f4() {
    alert(4);
}

f1().then(f2).then(f3).then(f4)




// ====================================================================================
function Deferred() {
    var callbacks = [], // list of callbacks
        errbacks = [], // list of errbacks
        value, // the fulfill arguments or undefined until they're available
        reason; // the error arguments or undefined until they're available
    this.fulfill = function() {
        if (reason || value) return false; // can't change state
        value = arguments; // settle the result
        for (var c;c=callbacks.shift();)
            c.apply(null, value);
        errbacks.length = 0; // clear stored errbacks
    });
    this.reject = function() {
        if (value || reason) return false; // can't change state
        reason = arguments; // settle the errror
        for (var c;c=errbacks.shift();)
            c.apply(null, reason);
        callbacks.length = 0; // clear stored callbacks
    });
    this.promise = new Promise(function add(c) {
        if (reason) return; // nothing to do
        if (value)
            c.apply(null, value);
        else
            callbacks.push(c);
    }, function add(c) {
        if (value) return; // nothing to do
        if (reason)
            c.apply(null, reason);
        else
            errbacks.push(c);
    });
}
function Promise(addC, addE) {
    this.addCallback = addC;
    this.addErrback = addE;
}
Promise.prototype.then = function(fn, err) {
    var dfd = new Deferred();
    this.addCallback(function() { // when `this` is fulfilled…
        try {
            var result = fn.apply(null, arguments);
            if (result instanceof Promise) {
                result.addCallback(dfd.fulfill);
                result.addErrback(dfd.reject);
            } else
                dfd.fulfill(result);
        } catch(e) { // when an exception was thrown
            dfd.reject(e);
        }
    });
    this.addErrback(err ? function() { // when `this` is rejected…
        try {
            var result = err.apply(null, arguments);
            if (result instanceof Promise) {
                result.addCallback(dfd.fulfill);
                result.addErrback(dfd.reject);
            } else
                dfd.fulfill(result);
        } catch(e) { // when an exception was re-thrown
            dfd.reject(e);
        }
    } : dfd.reject); // when no `err` handler is passed then just propagate
    return dfd.promise;
};
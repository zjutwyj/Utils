/**
 * @description 自定义方法
 * @class custom
 * @author yongjin<zjut_wyj@163.com> 2015/4/15
 */
App._Custom = function (window, document, Clickable, Scrollable, App, Utils, Events, Metrics, Scroll) {
  var STACK_KEY = '__APP_JS_STACK__' + window.location.pathname,
    STACK_TIME = '__APP_JS_TIME__' + window.location.pathname;

  App.initClick = function (page) {
    Utils.forEach(
      page.querySelectorAll('.app-btn'),
      function (button) {
        if (button.getAttribute('data-no-click') !== null) {
          return;
        }
        if (button.getAttribute('data-clickable') !== '1') {
          Clickable(button);
          $(button).off().on('click', function () {
            //debugger
            var target = button.getAttribute('data-target'),
              targetArgs = button.getAttribute('data-target-args'),
              back = (button.getAttribute('data-back') !== null),
              manualBack = (button.getAttribute('data-manual-back') !== null),
              args;

            try {
              args = JSON.parse(targetArgs);
            } catch (err) {
              debug(err);
            }
            if ((typeof args !== 'object') || (args === null)) {
              args = {};
            }
            if (!back && !target) return;
            if (back && manualBack) return;
            var clickableClass = button.getAttribute('data-clickable-class');
            if (clickableClass) {
              button.disabled = true;
              button.classList.add(clickableClass);
            }
            if (back) App.back(finish);
            else if (target) {
              App.load(target, args, {}, finish);
            }

            function finish() {
              if (clickableClass) {
                button.disabled = false;
                button.classList.remove(clickableClass);
              }
            }
          }, false);
        }
        button.setAttribute('data-clickable', '1');
      }
    );
  };

  App.getBeforeStackItem = function () {
    var page = null;
    //debugger
    if (App._CustomStack && App._CustomStack.length > 0) {
      page = App._CustomStack.pop();
    }
    else if (App._Stack.size() > 0) {
      page = App._Stack.get()[App._Stack.size() - 2];
      //App._Stack.pop();
    }
    return page;
  }
  App.pickStackItem = function (pageName) {
    var item = null;
    Est.each(App._Stack.get(), function (stack) {
      if (stack[0] === pageName) {
        item = stack;
        return false;
      }
    });
    return item;
  }
  App.getRestoreStacks = function (options) {
    try {
      return JSON.parse(localStorage[STACK_KEY]);
    } catch (e) {
      return [];
    }
  }
  App.back = App.inject(App.back, function (pageName, callback) {
    var item = null;
    try {
      if (typeof pageName === 'undefined' || typeof pageName === 'function') {
        item = App.getBeforeStackItem();
        if (item) pageName = item[0];
        else{
          App.goToRootPage();
          return;
        }
      }
      var _item = App.pickStackItem(pageName);
      if (typeof pageName !== 'function' && _item) {
        App.addHash('#/' + pageName);
        App.addLoading();
      }
      App._CustomStack = App._CustomStack || [];
      if (App._Stack.size() === 0 && App._CustomStack.length === 0) {
        App.goToRootPage();
        return;
      } else if (App._Stack.size() === 0 && App._CustomStack.length > 0) {
        App.load(pageName);
        return;
      }
      else if (Est.typeOf(pageName) === 'array'){
        App.load(pageName[0][0], pageName[0][1]);
        return;
      }
      else if (typeof pageName === 'string') {
        if (!_item) {
          App.load(item[0], item[1]);
          return;
          /*item = App.getBeforeStackItem();
          pageName = item ? item[0] : 'home';
          App.addHash('#/' + pageName);*/
        }
      }
      else if (typeof pageName === 'undefined' || typeof pageName === 'function') {
        item = App.getBeforeStackItem();
        if (item) {
          App.back(item[0]);
        } else {
          App.pageOut = true;
          App.goToRootPage();
        }
        return;
      }
    } catch (e) {
      debug('【Error】App.back' + e);
      App.load('home');
    }
    return new App.setArguments(arguments, pageName);
  }, function (pageName, callback, append) {
    var args = Array.prototype.slice.call(arguments, 1);
    setTimeout(function(){
      App.trigger(args[args.length - 1] + '_render');
    }, 0);
  });
  App._IScroll = iScroll;
  App.Scrollable = Scrollable;
}(window, document, Clickable, Scrollable, App, App._Utils, App._Events, App._Metrics, App._Scroll);
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
      page = App._CustomStack[App._CustomStack.length - 1];
      App._CustomStack.pop();
    }
    if (App._Stack.size() > 0) {
      page = App._Stack.get()[App._Stack.size() - 2];
      //App._Stack.pop();
    }
    return page;
  }
  App.pickStackItem = function (pageName) {
    var item = null;
    Application.each(App._Stack.get(), function (stack) {
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
    //debugger
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
      if (typeof pageName !== 'function') {
        App.addHash('#/' + pageName);
        App.addLoading();// [custom]
      }
      App._CustomStack = App._CustomStack || [];
      if (App._Stack.size() === 0 && App._CustomStack.length === 0) {
        App.goToRootPage();
        return;
      } else if (App._Stack.size() === 0 && App._CustomStack.length > 0) {
        App.load(pageName);
        return;
      }
      else if (typeof pageName === 'string') {
        item = App.pickStackItem(pageName);
        if (!item) {
          item = App.getBeforeStackItem();
          pageName = item ? item[0] : 'home';
          App.addHash('#/' + pageName);
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
      alert(e);
      App.load('home');
    }
    return new App.setArguments(arguments);
  }, function () {
  });

}(window, document, Clickable, Scrollable, App, App._Utils, App._Events, App._Metrics, App._Scroll);
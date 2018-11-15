// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/airboard/boardConfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var config = {
  proxyadress: "https://cors-anywhere.herokuapp.com/",
  url: "https://api.rasp.yandex.net/v3.0/schedule/",
  apiKey: "a04dfd50-625a-4b8a-9ae6-acab7339ee2d",
  mskAirId: "s9600213"
};
exports.config = config;
},{}],"src/airboard/apiservice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApiUrl = getApiUrl;
exports.getData = getData;

var _boardConfig = require("./boardConfig");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getApiUrl(queryParams) {
  var apiUrl = '';

  if (_boardConfig.config.proxyadress) {
    apiUrl += _boardConfig.config.proxyadress;
  }

  if (_boardConfig.config.url) {
    apiUrl += _boardConfig.config.url;
  }

  queryParams = queryParams || {};
  var qs = Object.entries(queryParams).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return "".concat(key, "=").concat(value);
  }).join('&');
  return "".concat(apiUrl, "?apikey=").concat(_boardConfig.config.apiKey, "&station=").concat(_boardConfig.config.mskAirId, "&").concat(qs);
}

function getData(_ref3) {
  var event = _ref3.event;
  return fetch(getApiUrl({
    event: event
  })).then(function (response) {
    return response.json();
  }).catch(alert);
}
},{"./boardConfig":"src/airboard/boardConfig.js"}],"src/common/components/tabs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsComponent = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * config:
 * {
 *  tabs: [
 *      { id: '1', name: 'tab 1', order: 1},
 *      { id: '2', name: 'tab 2', order: 2},
 *  ],
 *  active: 2 //id табы активной
 * }
 */
var TabsComponent =
/*#__PURE__*/
function () {
  function TabsComponent(config) {
    _classCallCheck(this, TabsComponent);

    this.config = config || {};
    this._elements = this._createElements(this.config);

    this._renderHeader(this._elements.tabsHeader);
  }

  _createClass(TabsComponent, [{
    key: "_createElements",
    value: function _createElements(config) {
      var tabs = document.createElement('div');
      tabs.classList.add('tabs');
      var tabsHeader = document.createElement('div');
      tabsHeader.classList.add('tabs-header');
      var tabsContent = document.createElement('div');
      tabsContent.classList.add('tabs-content');
      tabs.appendChild(tabsHeader);
      tabs.appendChild(tabsContent);
      return {
        tabs: tabs,
        tabsContent: tabsContent,
        tabsHeader: tabsHeader
      };
    }
  }, {
    key: "_renderHeader",
    value: function _renderHeader(headerEl) {
      var _this = this;

      if (!headerEl) {
        return;
      }

      var tabs = (this.config.tabs || []).sort(function (a, b) {
        return a.order - b.order;
      });

      if (this.config.active === undefined) {
        this.config.active = tabs[0].id;
      }

      tabs.forEach(function (tab) {
        var tabEl = document.createElement('div');
        tabEl.classList.add('tabs-tab');

        if (tab.id === _this.config.active) {
          tabEl.classList.add('active');
          _this.activeTab = tab;
        }

        tabEl.innerText = tab.name;
        tabEl.dataset.tab = tab;
        tabEl.addEventListener('click', function (e) {
          _this._changeActive(tabEl);

          var handlers = _this.eventHandlers || {};
          var subscribers = handlers['tabClick'] || [];
          subscribers.forEach(function (sub) {
            sub(tab);
          });
        });
        headerEl.appendChild(tabEl);
      });
    }
  }, {
    key: "_changeActive",
    value: function _changeActive(tabEl) {
      var tabs = this._elements.tabsHeader.querySelectorAll('.tabs-tab');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tab = _step.value;
          tab.classList.remove('active');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      tabEl.classList.add('active');
    }
  }, {
    key: "on",
    value: function on(eventName, cb) {
      if (typeof cb !== 'function') {
        return;
      }

      this.eventHandlers = this.eventHandlers || {};
      this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
      this.eventHandlers[eventName].push(cb);
    }
  }, {
    key: "renderContent",
    value: function renderContent(contentHTML) {
      this._elements.tabsContent.innerHTML = contentHTML;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this._elements.tabs;
    }
  }]);

  return TabsComponent;
}();

exports.TabsComponent = TabsComponent;
},{}],"src/common/components/searchBox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBox = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SearchBox =
/*#__PURE__*/
function () {
  function SearchBox(lineName, buttonName) {
    _classCallCheck(this, SearchBox);

    this.linePlaceholder = lineName || '';
    this.buttonName = buttonName || 'search';
    this.element = this._createElement(this.linePlaceholder, this.buttonName);

    this._renderSearchBox();
  }

  _createClass(SearchBox, [{
    key: "_createElement",
    value: function _createElement(lineName, buttonName) {
      var searchbox = document.createElement('div');
      searchbox.classList.add('searchbox');
      var line = document.createElement('input');
      line.classList.add('searchbox-line');
      line.placeholder = lineName;
      var button = document.createElement('button');
      button.classList.add('searchline-button');
      button.innerText = buttonName;
      searchbox.appendChild(line);
      searchbox.appendChild(button);
      return {
        searchbox: searchbox,
        line: line,
        button: button
      };
    }
  }, {
    key: "removeActive",
    value: function removeActive() {
      this.element.line.classList.remove('active');
    }
  }, {
    key: "_renderSearchBox",
    value: function _renderSearchBox() {
      var _this = this;

      this.element.line.addEventListener('click', function (e) {
        _this.element.line.classList.add('active');

        var handlers = _this.eventHandlers || {};
        var subscribers = handlers['lineClick'] || [];
        subscribers.forEach(function (sub) {
          sub(_this.element.line);
        });
      });
      this.element.line.addEventListener('input', function (e) {
        var handlers = _this.eventHandlers || {};
        var subscribers = handlers['lineInput'] || [];
        subscribers.forEach(function (sub) {
          sub(_this.element.line);
        });
      });
      this.element.button.addEventListener('click', function (e) {
        var handlers = _this.eventHandlers || {};
        var subscribers = handlers['clickButton'] || [];
        subscribers.forEach(function (sub) {
          sub(_this.element);
        });
      });
    }
  }, {
    key: "on",
    value: function on(eventName, cb) {
      if (typeof cb !== 'function') {
        return;
      }

      this.eventHandlers = this.eventHandlers || {};
      this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
      this.eventHandlers[eventName].push(cb);
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.element.searchbox;
    }
  }]);

  return SearchBox;
}();

exports.SearchBox = SearchBox;
},{}],"src/common/components/tableWork.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableData = tableData;
exports.createTableHTML = createTableHTML;
exports.saveTableData = saveTableData;
exports.searchInTable = searchInTable;
var tableData = {};
exports.tableData = tableData;

function tableData() {
  return tableData;
}

;

function createTableHTML(data) {
  if (!data) return;
  var html = '<table>';
  var time = !data.schedule[0].departure ? 'arrival' : 'departure';
  data.schedule.forEach(function (el) {
    html += "<tr><td>".concat(el[time], "</td>\n            <td>").concat(el.thread.title, "</td>\n            <td>").concat(el.thread.number, "</td>\n            <td>").concat(el.days, "</td>\n        </tr>");
  });
  html += '</table>';
  return html;
}

;

function saveTableData(data) {
  if (!data) return {};
  exports.tableData = tableData = data;
  return tableData;
}

function searchInTable(str) {
  if (!tableData) return {};
  str = ' ' + str;
  var result = {
    tableData: tableData
  };
  result.schedule = [];
  tableData.schedule.forEach(function (el) {
    if (el.thread.number.includes(str)) result.schedule.push(el);
  });
  return result;
}
},{}],"src/airboard/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = app;

var _apiservice = require("./apiservice");

var _tabs = require("../common/components/tabs");

var _searchBox = require("../common/components/searchBox");

var _tableWork = require("../common/components/tableWork");

function app() {
  var tabs = new _tabs.TabsComponent({
    tabs: [{
      id: 1,
      name: 'Вылет',
      order: 1,
      data: {
        event: 'departure'
      }
    }, {
      id: 2,
      name: 'Прилет',
      order: 2,
      data: {
        event: 'arrival'
      }
    }],
    active: 1
  });
  var searchBox = new _searchBox.SearchBox('Номер рейса', 'Сбросить фильтр');
  tabs.on('tabClick', function (e) {
    // get data
    tabs.renderContent('<p>Загрузка данных...</p>');
    (0, _apiservice.getData)({
      event: e.data.event
    }).then(function (data) {
      tabs.renderContent((0, _tableWork.createTableHTML)(data));
    });
  });
  searchBox.on('lineInput', function (e) {
    tabs.renderContent('');
    tabs.renderContent((0, _tableWork.createTableHTML)((0, _tableWork.searchInTable)(e.value)));
  });
  searchBox.on('clickButton', function (e) {
    tabs.renderContent('');
    e.line.value = '';
    searchBox.removeActive();
    tabs.renderContent((0, _tableWork.createTableHTML)(_tableWork.tableData));
  });
  var airboard = document.getElementById('airboard');
  airboard.innerHTML = '';
  searchBox.getElement().firstChild.type = 'number';
  tabs.getElement().firstChild.appendChild(searchBox.getElement());
  airboard.appendChild(tabs.getElement());
  var activeTab;
  tabs.config.tabs.forEach(function (t) {
    if (t.id == tabs.config.active) activeTab = t;
  });
  tabs.renderContent('<p>Загрузка данных...</p>');
  (0, _apiservice.getData)({
    event: activeTab.data.event
  }).then(function (data) {
    tabs.renderContent((0, _tableWork.createTableHTML)(data));
    (0, _tableWork.saveTableData)(data);
  });
}

;
},{"./apiservice":"src/airboard/apiservice.js","../common/components/tabs":"src/common/components/tabs.js","../common/components/searchBox":"src/common/components/searchBox.js","../common/components/tableWork":"src/common/components/tableWork.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _app = require("./airboard/app");

(0, _app.app)();
},{"./airboard/app":"src/airboard/app.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56101" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.map
/* begin: ../../../blocks/common/page/__init/page__init.js */
(function() {
    var initTime = Date.now();

    setTimeout(function() {
        // Загрузить бандлы ember, jquery, leaflet
        modules.require(['loader', 'config'], function(loader, config) {
            loader([config.bundle.jquery, config.bundle.ember], 'ember');
            loader(config.bundle.leaflet, 'leaflet');
        });

        modules.require(['app', 'storage'], function(app, storage) {
            storage.fixTime('init-time', initTime);
            app.init();
        });
    }, 0);
}).call(this);

/* end: ../../../blocks/common/page/__init/page__init.js */
/* begin: ../../../blocks/common/core/__ender/core__ender.js */
/*!
  * =============================================================
  * Ender: open module JavaScript framework (https://enderjs.com)
  * Build: ender build scriptjs jar ym q --output blocks/common/core/__ender/core__ender
  * Packages: ender-core@2.0.0 ender-commonjs@1.0.7 scriptjs@2.5.7 es5-basic@0.2.1 jar@0.3.4 ym@0.1.0 q@1.0.1
  * =============================================================
  */

(function () {

  /*!
    * Ender: open module JavaScript framework (client-lib)
    * http://enderjs.com
    * License MIT
    */
  
  /**
   * @constructor
   * @param  {*=}      item      selector|node|collection|callback|anything
   * @param  {Object=} root      node(s) from which to base selector queries
   */
  function Ender(item, root) {
    var i
    this.length = 0 // Ensure that instance owns length
  
    if (typeof item == 'string')
      // start with strings so the result parlays into the other checks
      // the .selector prop only applies to strings
      item = ender._select(this['selector'] = item, root)
  
    if (null == item) return this // Do not wrap null|undefined
  
    if (typeof item == 'function') ender._closure(item, root)
  
    // DOM node | scalar | not array-like
    else if (typeof item != 'object' || item.nodeType || (i = item.length) !== +i || item == item.window)
      this[this.length++] = item
  
    // array-like - bitwise ensures integer length
    else for (this.length = i = (i > 0 ? ~~i : 0); i--;)
      this[i] = item[i]
  }
  
  /**
   * @param  {*=}      item   selector|node|collection|callback|anything
   * @param  {Object=} root   node(s) from which to base selector queries
   * @return {Ender}
   */
  function ender(item, root) {
    return new Ender(item, root)
  }
  
  
  /**
   * @expose
   * sync the prototypes for jQuery compatibility
   */
  ender.fn = ender.prototype = Ender.prototype
  
  /**
   * @enum {number}  protects local symbols from being overwritten
   */
  ender._reserved = {
    reserved: 1,
    ender: 1,
    expose: 1,
    noConflict: 1,
    fn: 1
  }
  
  /**
   * @expose
   * handy reference to self
   */
  Ender.prototype.$ = ender
  
  /**
   * @expose
   * make webkit dev tools pretty-print ender instances like arrays
   */
  Ender.prototype.splice = function () { throw new Error('Not implemented') }
  
  /**
   * @expose
   * @param   {function(*, number, Ender)}  fn
   * @param   {object=}                     scope
   * @return  {Ender}
   */
  Ender.prototype.forEach = function (fn, scope) {
    var i, l
    // opt out of native forEach so we can intentionally call our own scope
    // defaulting to the current item and be able to return self
    for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
    // return self for chaining
    return this
  }
  
  /**
   * @expose
   * @param {object|function} o
   * @param {boolean=}        chain
   */
  ender.ender = function (o, chain) {
    var o2 = chain ? Ender.prototype : ender
    for (var k in o) !(k in ender._reserved) && (o2[k] = o[k])
    return o2
  }
  
  /**
   * @expose
   * @param {string}  s
   * @param {Node=}   r
   */
  ender._select = function (s, r) {
    return s ? (r || document).querySelectorAll(s) : []
  }
  
  /**
   * @expose
   * @param {function} fn
   */
  ender._closure = function (fn) {
    fn.call(document, ender)
  }
  
  if (typeof module !== 'undefined' && module['exports']) module['exports'] = ender
  var $ = ender
  
  /**
   * @expose
   * @param {string} name
   * @param {*}      value
   */
  ender.expose = function (name, value) {
    ender.expose.old[name] = window[name]
    window[name] = value
  }
  
  /**
   * @expose
   */
  ender.expose.old = {}
  
  /**
   * @expose
   * @param {boolean} all   restore only $ or all ender globals
   */
  ender.noConflict = function (all) {
    window['$'] = ender.expose.old['$']
    if (all) for (var k in ender.expose.old) window[k] = ender.expose.old[k]
    return this
  }
  
  ender.expose('$', ender)
  ender.expose('ender', ender); // uglify needs this semi-colon between concating files
  
  /*!
    * Ender: open module JavaScript framework (module-lib)
    * http://enderjs.com
    * License MIT
    */
  
  var global = this
  
  /**
   * @param  {string}  id   module id to load
   * @return {object}
   */
  function require(id) {
    if ('$' + id in require._cache)
      return require._cache['$' + id]
    if ('$' + id in require._modules)
      return (require._cache['$' + id] = require._modules['$' + id]._load())
    if (id in window)
      return window[id]
  
    throw new Error('Requested module "' + id + '" has not been defined.')
  }
  
  /**
   * @param  {string}  id       module id to provide to require calls
   * @param  {object}  exports  the exports object to be returned
   */
  function provide(id, exports) {
    return (require._cache['$' + id] = exports)
  }
  
  /**
   * @expose
   * @dict
   */
  require._cache = {}
  
  /**
   * @expose
   * @dict
   */
  require._modules = {}
  
  /**
   * @constructor
   * @param  {string}                                          id   module id for this module
   * @param  {function(Module, object, function(id), object)}  fn   module definition
   */
  function Module(id, fn) {
    this.id = id
    this.fn = fn
    require._modules['$' + id] = this
  }
  
  /**
   * @expose
   * @param  {string}  id   module id to load from the local module context
   * @return {object}
   */
  Module.prototype.require = function (id) {
    var parts, i
  
    if (id.charAt(0) == '.') {
      parts = (this.id.replace(/\/.*?$/, '/') + id.replace(/\.js$/, '')).split('/')
  
      while (~(i = parts.indexOf('.')))
        parts.splice(i, 1)
  
      while ((i = parts.lastIndexOf('..')) > 0)
        parts.splice(i - 1, 2)
  
      id = parts.join('/')
    }
  
    return require(id)
  }
  
  /**
   * @expose
   * @return {object}
   */
  Module.prototype._load = function () {
    var m = this
  
    if (!m._loaded) {
      m._loaded = true
  
      /**
       * @expose
       */
      m.exports = {}
      m.fn.call(global, m, m.exports, function (id) { return m.require(id) }, global)
    }
  
    return m.exports
  }
  
  /**
   * @expose
   * @param  {string}                     id        main module id
   * @param  {Object.<string, function>}  modules   mapping of module ids to definitions
   * @param  {string}                     main      the id of the main module
   */
  Module.createPackage = function (id, modules, main) {
    var path, m
  
    for (path in modules) {
      new Module(id + '/' + path, modules[path])
      if (m = path.match(/^(.+)\/index$/)) new Module(id + '/' + m[1], modules[path])
    }
  
    if (main) require._modules['$' + id] = require._modules['$' + id + '/' + main]
  }
  
  if (ender && ender.expose) {
    /*global global,require,provide,Module */
    ender.expose('global', global)
    ender.expose('require', require)
    ender.expose('provide', provide)
    ender.expose('Module', Module)
  }
  
  Module.createPackage('scriptjs', {
    'dist/script': function (module, exports, require, global) {
      /*!
        * $script.js JS loader & dependency manager
        * https://github.com/ded/script.js
        * (c) Dustin Diaz 2014 | License MIT
        */
      
      (function (name, definition) {
        if (typeof module != 'undefined' && module.exports) module.exports = definition()
        else if (typeof define == 'function' && define.amd) define(definition)
        else this[name] = definition()
      })('$script', function () {
        var doc = document
          , head = doc.getElementsByTagName('head')[0]
          , s = 'string'
          , f = false
          , push = 'push'
          , readyState = 'readyState'
          , onreadystatechange = 'onreadystatechange'
          , list = {}
          , ids = {}
          , delay = {}
          , scripts = {}
          , scriptpath
          , urlArgs
      
        function every(ar, fn) {
          for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
          return 1
        }
        function each(ar, fn) {
          every(ar, function (el) {
            return !fn(el)
          })
        }
      
        function $script(paths, idOrDone, optDone) {
          paths = paths[push] ? paths : [paths]
          var idOrDoneIsDone = idOrDone && idOrDone.call
            , done = idOrDoneIsDone ? idOrDone : optDone
            , id = idOrDoneIsDone ? paths.join('') : idOrDone
            , queue = paths.length
          function loopFn(item) {
            return item.call ? item() : list[item]
          }
          function callback() {
            if (!--queue) {
              list[id] = 1
              done && done()
              for (var dset in delay) {
                every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
              }
            }
          }
          setTimeout(function () {
            each(paths, function loading(path, force) {
              if (path === null) return callback()
              path = !force && path.indexOf('.js') === -1 && !/^https?:\/\//.test(path) && scriptpath ? scriptpath + path + '.js' : path
              if (scripts[path]) {
                if (id) ids[id] = 1
                return (scripts[path] == 2) ? callback() : setTimeout(function () { loading(path, true) }, 0)
              }
      
              scripts[path] = 1
              if (id) ids[id] = 1
              create(path, callback)
            })
          }, 0)
          return $script
        }
      
        function create(path, fn) {
          var el = doc.createElement('script'), loaded
          el.onload = el.onerror = el[onreadystatechange] = function () {
            if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
            el.onload = el[onreadystatechange] = null
            loaded = 1
            scripts[path] = 2
            fn()
          }
          el.async = 1
          el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
          head.insertBefore(el, head.lastChild)
        }
      
        $script.get = create
      
        $script.order = function (scripts, id, done) {
          (function callback(s) {
            s = scripts.shift()
            !scripts.length ? $script(s, id, done) : $script(s, callback)
          }())
        }
      
        $script.path = function (p) {
          scriptpath = p
        }
        $script.urlArgs = function (str) {
          urlArgs = str;
        }
        $script.ready = function (deps, ready, req) {
          deps = deps[push] ? deps : [deps]
          var missing = [];
          !each(deps, function (dep) {
            list[dep] || missing[push](dep);
          }) && every(deps, function (dep) {return list[dep]}) ?
            ready() : !function (key) {
            delay[key] = delay[key] || []
            delay[key][push](ready)
            req && req(missing)
          }(deps.join('|'))
          return $script
        }
      
        $script.done = function (idOrDone) {
          $script([null], idOrDone)
        }
      
        return $script
      });
      
    },
    'src/ender': function (module, exports, require, global) {
      var s = require('scriptjs')
      ender.ender({
          script: s
        , require: s
        , ready: s.ready
        , getScript: s.get
      });
      
    }
  }, 'dist/script');

  Module.createPackage('es5-basic', {
    'lib/es5-basic': function (module, exports, require, global) {
      var __hasProp = Object.prototype.hasOwnProperty;
      
      if (!Function.prototype.bind) {
        Function.prototype.bind = function(that) {
          var Bound, args, target;
          target = this;
          if (typeof target.apply !== "function" || typeof target.call !== "function") {
            return new TypeError();
          }
          args = Array.prototype.slice.call(arguments);
          Bound = (function() {
      
            function Bound() {
              var Type, self;
              if (this instanceof Bound) {
                self = new (Type = (function() {
      
                  function Type() {}
      
                  Type.prototype = target.prototype;
      
                  return Type;
      
                })());
                target.apply(self, args.concat(Array.prototype.slice.call(arguments)));
                return self;
              } else {
                return target.call.apply(target, args.concat(Array.prototype.slice.call(arguments)));
              }
            }
      
            Bound.prototype.length = (typeof target === "function" ? Math.max(target.length - args.length, 0) : 0);
      
            return Bound;
      
          })();
          return Bound;
        };
      }
      
      if (!Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      
      if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fn, that) {
          var i, val, _len;
          for (i = 0, _len = this.length; i < _len; i++) {
            val = this[i];
            if (i in this) fn.call(that, val, i, this);
          }
        };
      }
      
      if (!Array.prototype.map) {
        Array.prototype.map = function(fn, that) {
          var i, val, _len, _results;
          _results = [];
          for (i = 0, _len = this.length; i < _len; i++) {
            val = this[i];
            if (i in this) _results.push(fn.call(that, val, i, this));
          }
          return _results;
        };
      }
      
      if (!Array.prototype.filter) {
        Array.prototype.filter = function(fn, that) {
          var i, val, _len, _results;
          _results = [];
          for (i = 0, _len = this.length; i < _len; i++) {
            val = this[i];
            if (i in this && fn.call(that, val, i, this)) _results.push(val);
          }
          return _results;
        };
      }
      
      if (!Array.prototype.some) {
        Array.prototype.some = function(fn, that) {
          var i, val, _len;
          for (i = 0, _len = this.length; i < _len; i++) {
            val = this[i];
            if (i in this) if (fn.call(that, val, i, this)) return true;
          }
          return false;
        };
      }
      
      if (!Array.prototype.every) {
        Array.prototype.every = function(fn, that) {
          var i, val, _len;
          for (i = 0, _len = this.length; i < _len; i++) {
            val = this[i];
            if (i in this) if (!fn.call(that, val, i, this)) return false;
          }
          return true;
        };
      }
      
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(fn) {
          var i, result;
          i = 0;
          if (arguments.length > 1) {
            result = arguments[1];
          } else if (this.length) {
            result = this[i++];
          } else {
            throw new TypeError('Reduce of empty array with no initial value');
          }
          while (i < this.length) {
            if (i in this) result = fn.call(null, result, this[i], i, this);
            i++;
          }
          return result;
        };
      }
      
      if (!Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function(fn) {
          var i, result;
          i = this.length - 1;
          if (arguments.length > 1) {
            result = arguments[1];
          } else if (this.length) {
            result = this[i--];
          } else {
            throw new TypeError('Reduce of empty array with no initial value');
          }
          while (i >= 0) {
            if (i in this) result = fn.call(null, result, this[i], i, this);
            i--;
          }
          return result;
        };
      }
      
      if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(value) {
          var i, _ref;
          i = (_ref = arguments[1]) != null ? _ref : 0;
          if (i < 0) i += length;
          i = Math.max(i, 0);
          while (i < this.length) {
            if (i in this) if (this[i] === value) return i;
            i++;
          }
          return -1;
        };
      }
      
      if (!Array.prototype.lastIndexOf) {
        Array.prototype.lastIndexOf = function(value) {
          var i;
          i = arguments[1] || this.length;
          if (i < 0) i += length;
          i = Math.min(i, this.length - 1);
          while (i >= 0) {
            if (i in this) if (this[i] === value) return i;
            i--;
          }
          return -1;
        };
      }
      
      if (!Object.keys) {
        Object.keys = function(obj) {
          var key, _results;
          _results = [];
          for (key in obj) {
            if (!__hasProp.call(obj, key)) continue;
            _results.push(key);
          }
          return _results;
        };
      }
      
      if (!Date.now) {
        Date.now = function() {
          return new Date().getTime();
        };
      }
      
      if (!Date.prototype.toISOString) {
        Date.prototype.toISOString = function() {
          return ("" + (this.getUTCFullYear()) + "-" + (this.getUTCMonth() + 1) + "-" + (this.getUTCDate()) + "T") + ("" + (this.getUTCHours()) + ":" + (this.getUTCMinutes()) + ":" + (this.getUTCSeconds()) + "Z");
        };
      }
      
      if (!Date.prototype.toJSON) {
        Date.prototype.toJSON = function() {
          return this.toISOString();
        };
      }
      
      if (!String.prototype.trim) {
        String.prototype.trim = function() {
          return String(this).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        };
      }
      
    }
  }, 'lib/es5-basic');

  Module.createPackage('jar', {
    'lib/index': function (module, exports, require, global) {
      // Generated by CoffeeScript 1.3.3
      var jar;
      
      jar = typeof exports !== "undefined" && exports !== null ? exports : (this['jar'] = {});
      
      jar.Cookie = (function() {
      
        function Cookie(name, value, options) {
          var date, _base;
          this.name = name;
          this.value = value;
          this.options = options;
          if (this.value === null) {
            this.value = '';
            this.options.expires = -(60 * 60 * 24);
          }
          if (this.options.expires) {
            if (typeof this.options.expires === 'number') {
              date = new Date();
              date.setTime(date.getTime() + (this.options.expires * 1000));
              this.options.expires = date;
            }
            if (this.options.expires instanceof Date) {
              this.options.expires = this.options.expires.toUTCString();
            }
          }
          (_base = this.options).path || (_base.path = '/');
        }
      
        Cookie.prototype.toString = function() {
          var domain, expires, path, secure;
          path = "; path=" + this.options.path;
          expires = (this.options.expires ? "; expires=" + this.options.expires : '');
          domain = (this.options.domain ? "; domain=" + this.options.domain : '');
          secure = (this.options.secure ? '; secure' : '');
          return [this.name, '=', this.value, expires, path, domain, secure].join('');
        };
      
        return Cookie;
      
      })();
      
      jar.Jar = (function() {
      
        function Jar() {}
      
        Jar.prototype.parse = function() {
          var cookie, m, _i, _len, _ref;
          this.cookies = {};
          _ref = this._getCookies().split(/;\s/g);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cookie = _ref[_i];
            m = cookie.match(/([^=]+)=(.*)/);
            if (Array.isArray(m)) {
              this.cookies[m[1]] = m[2];
            }
          }
        };
      
        Jar.prototype.encode = function(value) {
          return encodeURIComponent(JSON.stringify(value));
        };
      
        Jar.prototype.decode = function(value) {
          return JSON.parse(decodeURIComponent(value));
        };
      
        Jar.prototype.get = function(name, options) {
          var value;
          if (options == null) {
            options = {};
          }
          value = this.cookies[name];
          if (!('raw' in options) || !options.raw) {
            try {
              value = this.decode(value);
            } catch (e) {
              return;
            }
          }
          return value;
        };
      
        Jar.prototype.set = function(name, value, options) {
          var cookie;
          if (options == null) {
            options = {};
          }
          if (!('raw' in options) || !options.raw) {
            value = this.encode(value);
          }
          cookie = new jar.Cookie(name, value, options);
          this._setCookie(cookie);
          this.cookies[name] = value;
        };
      
        return Jar;
      
      })();
      
      if (typeof process !== "undefined" && process !== null ? process.pid : void 0) {
        require('./node');
      }
      
    },
    'lib/ender': function (module, exports, require, global) {
      // Generated by CoffeeScript 1.3.3
      var __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      (function($) {
        var jar;
        jar = require('jar');
        jar.Jar = (function(_super) {
      
          __extends(Jar, _super);
      
          function Jar() {
            return Jar.__super__.constructor.apply(this, arguments);
          }
      
          Jar.prototype._getCookies = function() {
            return document.cookie;
          };
      
          Jar.prototype._setCookie = function(cookie) {
            document.cookie = cookie.toString();
          };
      
          Jar.prototype.get = function() {
            this.parse();
            return Jar.__super__.get.apply(this, arguments);
          };
      
          Jar.prototype.set = function() {
            this.parse();
            return Jar.__super__.set.apply(this, arguments);
          };
      
          return Jar;
      
        })(jar.Jar);
        return $.ender({
          jar: new jar.Jar,
          cookie: function(name, value, options) {
            if (value != null) {
              return $.jar.set(name, value, options);
            } else {
              return $.jar.get(name);
            }
          }
        });
      })(ender);
      
    }
  }, 'lib/index');

  Module.createPackage('ym', {
    'modules': function (module, exports, require, global) {
      /**
       * Modules
       *
       * Copyright (c) 2013 Filatov Dmitry (dfilatov@yandex-team.ru)
       * Dual licensed under the MIT and GPL licenses:
       * http://www.opensource.org/licenses/mit-license.php
       * http://www.gnu.org/licenses/gpl.html
       *
       * @version 0.1.0
       */
      
      (function(global) {
      
      var undef,
      
          DECL_STATES = {
              NOT_RESOLVED : 'NOT_RESOLVED',
              IN_RESOLVING : 'IN_RESOLVING',
              RESOLVED     : 'RESOLVED'
          },
      
          /**
           * Creates a new instance of modular system
           * @returns {Object}
           */
          create = function() {
              var curOptions = {
                      trackCircularDependencies : true,
                      allowMultipleDeclarations : true
                  },
      
                  modulesStorage = {},
                  waitForNextTick = false,
                  pendingRequires = [],
      
                  /**
                   * Defines module
                   * @param {String} name
                   * @param {String[]} [deps]
                   * @param {Function} declFn
                   */
                  define = function(name, deps, declFn) {
                      if(!declFn) {
                          declFn = deps;
                          deps = [];
                      }
      
                      var module = modulesStorage[name];
                      if(!module) {
                          module = modulesStorage[name] = {
                              name : name,
                              decl : undef
                          };
                      }
      
                      module.decl = {
                          name       : name,
                          prev       : module.decl,
                          fn         : declFn,
                          state      : DECL_STATES.NOT_RESOLVED,
                          deps       : deps,
                          dependents : [],
                          exports    : undef
                      };
                  },
      
                  /**
                   * Requires modules
                   * @param {String|String[]} modules
                   * @param {Function} cb
                   * @param {Function} [errorCb]
                   */
                  require = function(modules, cb, errorCb) {
                      if(typeof modules === 'string') {
                          modules = [modules];
                      }
      
                      if(!waitForNextTick) {
                          waitForNextTick = true;
                          nextTick(onNextTick);
                      }
      
                      pendingRequires.push({
                          deps : modules,
                          cb   : function(exports, error) {
                              error?
                                  (errorCb || onError)(error) :
                                  cb.apply(global, exports);
                          }
                      });
                  },
      
                  /**
                   * Returns state of module
                   * @param {String} name
                   * @returns {String} state, possible values are NOT_DEFINED, NOT_RESOLVED, IN_RESOLVING, RESOLVED
                   */
                  getState = function(name) {
                      var module = modulesStorage[name];
                      return module?
                          DECL_STATES[module.decl.state] :
                          'NOT_DEFINED';
                  },
      
                  /**
                   * Returns whether the module is defined
                   * @param {String} name
                   * @returns {Boolean}
                   */
                  isDefined = function(name) {
                      return !!modulesStorage[name];
                  },
      
                  /**
                   * Sets options
                   * @param {Object} options
                   */
                  setOptions = function(options) {
                      for(var name in options) {
                          if(options.hasOwnProperty(name)) {
                              curOptions[name] = options[name];
                          }
                      }
                  },
      
                  onNextTick = function() {
                      waitForNextTick = false;
                      applyRequires();
                  },
      
                  applyRequires = function() {
                      var requiresToProcess = pendingRequires,
                          i = 0, require;
      
                      pendingRequires = [];
      
                      while(require = requiresToProcess[i++]) {
                          requireDeps(null, require.deps, [], require.cb);
                      }
                  },
      
                  requireDeps = function(fromDecl, deps, path, cb) {
                      var unresolvedDepsCnt = deps.length;
                      if(!unresolvedDepsCnt) {
                          cb([]);
                      }
      
                      var decls = [],
                          i = 0, len = unresolvedDepsCnt,
                          dep, decl;
      
                      while(i < len) {
                          dep = deps[i++];
                          if(typeof dep === 'string') {
                              if(!modulesStorage[dep]) {
                                  cb(null, buildModuleNotFoundError(dep, fromDecl));
                                  return;
                              }
      
                              decl = modulesStorage[dep].decl;
                          }
                          else {
                              decl = dep;
                          }
      
                          if(decl.state === DECL_STATES.IN_RESOLVING &&
                                  curOptions.trackCircularDependencies &&
                                  isDependenceCircular(decl, path)) {
                              cb(null, buildCircularDependenceError(decl, path));
                              return;
                          }
      
                          decls.push(decl);
      
                          startDeclResolving(
                              decl,
                              path,
                              function(_, error) {
                                  if(error) {
                                      cb(null, error);
                                      return;
                                  }
      
                                  if(!--unresolvedDepsCnt) {
                                      var exports = [],
                                          i = 0, decl;
                                      while(decl = decls[i++]) {
                                          exports.push(decl.exports);
                                      }
                                      cb(exports);
                                  }
                              });
                      }
                  },
      
                  startDeclResolving = function(decl, path, cb) {
                      if(decl.state === DECL_STATES.RESOLVED) {
                          cb(decl.exports);
                          return;
                      }
                      else {
                          decl.dependents.push(cb);
                      }
      
                      if(decl.state === DECL_STATES.IN_RESOLVING) {
                          return;
                      }
      
                      if(decl.prev && !curOptions.allowMultipleDeclarations) {
                          provideError(decl, buildMultipleDeclarationError(decl));
                          return;
                      }
      
                      curOptions.trackCircularDependencies && (path = path.slice()).push(decl);
      
                      var isProvided = false,
                          deps = decl.prev? decl.deps.concat([decl.prev]) : decl.deps;
      
                      decl.state = DECL_STATES.IN_RESOLVING;
                      requireDeps(
                          decl,
                          deps,
                          path,
                          function(depDeclsExports, error) {
                              if(error) {
                                  provideError(decl, error);
                                  return;
                              }
      
                              depDeclsExports.unshift(function(exports, error) {
                                  if(isProvided) {
                                      cb(null, buildDeclAreadyProvidedError(decl));
                                      return;
                                  }
      
                                  isProvided = true;
                                  error?
                                      provideError(decl, error) :
                                      provideDecl(decl, exports);
                              });
      
                              decl.fn.apply(
                                  {
                                      name   : decl.name,
                                      deps   : decl.deps,
                                      global : global
                                  },
                                  depDeclsExports);
                          });
                  },
      
                  provideDecl = function(decl, exports) {
                      decl.exports = exports;
                      decl.state = DECL_STATES.RESOLVED;
      
                      var i = 0, dependent;
                      while(dependent = decl.dependents[i++]) {
                          dependent(exports);
                      }
      
                      decl.dependents = undef;
                  },
      
                  provideError = function(decl, error) {
                      decl.state = DECL_STATES.NOT_RESOLVED;
      
                      var i = 0, dependent;
                      while(dependent = decl.dependents[i++]) {
                          dependent(null, error);
                      }
      
                      decl.dependents = [];
                  };
      
              return {
                  create     : create,
                  define     : define,
                  require    : require,
                  getState   : getState,
                  isDefined  : isDefined,
                  setOptions : setOptions
              };
          },
      
          onError = function(e) {
              nextTick(function() {
                  throw e;
              });
          },
      
          buildModuleNotFoundError = function(name, decl) {
              return Error(decl?
                  'Module "' + decl.name + '": can\'t resolve dependence "' + name + '"' :
                  'Required module "' + name + '" can\'t be resolved');
          },
      
          buildCircularDependenceError = function(decl, path) {
              var strPath = [],
                  i = 0, pathDecl;
              while(pathDecl = path[i++]) {
                  strPath.push(pathDecl.name);
              }
              strPath.push(decl.name);
      
              return Error('Circular dependence has been detected: "' + strPath.join(' -> ') + '"');
          },
      
          buildDeclAreadyProvidedError = function(decl) {
              return Error('Declaration of module "' + decl.name + '" has already been provided');
          },
      
          buildMultipleDeclarationError = function(decl) {
              return Error('Multiple declarations of module "' + decl.name + '" have been detected');
          },
      
          isDependenceCircular = function(decl, path) {
              var i = 0, pathDecl;
              while(pathDecl = path[i++]) {
                  if(decl === pathDecl) {
                      return true;
                  }
              }
              return false;
          },
      
          nextTick = (function() {
              var fns = [],
                  enqueueFn = function(fn) {
                      return fns.push(fn) === 1;
                  },
                  callFns = function() {
                      var fnsToCall = fns, i = 0, len = fns.length;
                      fns = [];
                      while(i < len) {
                          fnsToCall[i++]();
                      }
                  };
      
              if(typeof process === 'object' && process.nextTick) { // nodejs
                  return function(fn) {
                      enqueueFn(fn) && process.nextTick(callFns);
                  };
              }
      
              if(global.setImmediate) { // ie10
                  return function(fn) {
                      enqueueFn(fn) && global.setImmediate(callFns);
                  };
              }
      
              if(global.postMessage && !global.opera) { // modern browsers
                  var isPostMessageAsync = true;
                  if(global.attachEvent) {
                      var checkAsync = function() {
                              isPostMessageAsync = false;
                          };
                      global.attachEvent('onmessage', checkAsync);
                      global.postMessage('__checkAsync', '*');
                      global.detachEvent('onmessage', checkAsync);
                  }
      
                  if(isPostMessageAsync) {
                      var msg = '__modules' + (+new Date()),
                          onMessage = function(e) {
                              if(e.data === msg) {
                                  e.stopPropagation && e.stopPropagation();
                                  callFns();
                              }
                          };
      
                      global.addEventListener?
                          global.addEventListener('message', onMessage, true) :
                          global.attachEvent('onmessage', onMessage);
      
                      return function(fn) {
                          enqueueFn(fn) && global.postMessage(msg, '*');
                      };
                  }
              }
      
              var doc = global.document;
              if('onreadystatechange' in doc.createElement('script')) { // ie6-ie8
                  var head = doc.getElementsByTagName('head')[0],
                      createScript = function() {
                          var script = doc.createElement('script');
                          script.onreadystatechange = function() {
                              script.parentNode.removeChild(script);
                              script = script.onreadystatechange = null;
                              callFns();
                          };
                          head.appendChild(script);
                      };
      
                  return function(fn) {
                      enqueueFn(fn) && createScript();
                  };
              }
      
              return function(fn) { // old browsers
                  enqueueFn(fn) && setTimeout(callFns, 0);
              };
          })();
      
      if(typeof exports === 'object') {
          module.exports = create();
      }
      else {
          global.modules = create();
      }
      
      })(this);
      
    }
  }, 'modules');

  Module.createPackage('q', {
    'q': function (module, exports, require, global) {
      // vim:ts=4:sts=4:sw=4:
      /*!
       *
       * Copyright 2009-2012 Kris Kowal under the terms of the MIT
       * license found at http://github.com/kriskowal/q/raw/master/LICENSE
       *
       * With parts by Tyler Close
       * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
       * at http://www.opensource.org/licenses/mit-license.html
       * Forked at ref_send.js version: 2009-05-11
       *
       * With parts by Mark Miller
       * Copyright (C) 2011 Google Inc.
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       * http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       *
       */
      
      (function (definition) {
          // Turn off strict mode for this function so we can assign to global.Q
          /* jshint strict: false */
      
          // This file will function properly as a <script> tag, or a module
          // using CommonJS and NodeJS or RequireJS module formats.  In
          // Common/Node/RequireJS, the module exports the Q API and when
          // executed as a simple <script>, it creates a Q global instead.
      
          // Montage Require
          if (typeof bootstrap === "function") {
              bootstrap("promise", definition);
      
          // CommonJS
          } else if (typeof exports === "object") {
              module.exports = definition();
      
          // RequireJS
          } else if (typeof define === "function" && define.amd) {
              define(definition);
      
          // SES (Secure EcmaScript)
          } else if (typeof ses !== "undefined") {
              if (!ses.ok()) {
                  return;
              } else {
                  ses.makeQ = definition;
              }
      
          // <script>
          } else {
              Q = definition();
          }
      
      })(function () {
      "use strict";
      
      var hasStacks = false;
      try {
          throw new Error();
      } catch (e) {
          hasStacks = !!e.stack;
      }
      
      // All code after this point will be filtered from stack traces reported
      // by Q.
      var qStartingLine = captureLine();
      var qFileName;
      
      // shims
      
      // used for fallback in "allResolved"
      var noop = function () {};
      
      // Use the fastest possible means to execute a task in a future turn
      // of the event loop.
      var nextTick =(function () {
          // linked list of tasks (single, with head node)
          var head = {task: void 0, next: null};
          var tail = head;
          var flushing = false;
          var requestTick = void 0;
          var isNodeJS = false;
      
          function flush() {
              /* jshint loopfunc: true */
      
              while (head.next) {
                  head = head.next;
                  var task = head.task;
                  head.task = void 0;
                  var domain = head.domain;
      
                  if (domain) {
                      head.domain = void 0;
                      domain.enter();
                  }
      
                  try {
                      task();
      
                  } catch (e) {
                      if (isNodeJS) {
                          // In node, uncaught exceptions are considered fatal errors.
                          // Re-throw them synchronously to interrupt flushing!
      
                          // Ensure continuation if the uncaught exception is suppressed
                          // listening "uncaughtException" events (as domains does).
                          // Continue in next event to avoid tick recursion.
                          if (domain) {
                              domain.exit();
                          }
                          setTimeout(flush, 0);
                          if (domain) {
                              domain.enter();
                          }
      
                          throw e;
      
                      } else {
                          // In browsers, uncaught exceptions are not fatal.
                          // Re-throw them asynchronously to avoid slow-downs.
                          setTimeout(function() {
                             throw e;
                          }, 0);
                      }
                  }
      
                  if (domain) {
                      domain.exit();
                  }
              }
      
              flushing = false;
          }
      
          nextTick = function (task) {
              tail = tail.next = {
                  task: task,
                  domain: isNodeJS && process.domain,
                  next: null
              };
      
              if (!flushing) {
                  flushing = true;
                  requestTick();
              }
          };
      
          if (typeof process !== "undefined" && process.nextTick) {
              // Node.js before 0.9. Note that some fake-Node environments, like the
              // Mocha test runner, introduce a `process` global without a `nextTick`.
              isNodeJS = true;
      
              requestTick = function () {
                  process.nextTick(flush);
              };
      
          } else if (typeof setImmediate === "function") {
              // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
              if (typeof window !== "undefined") {
                  requestTick = setImmediate.bind(window, flush);
              } else {
                  requestTick = function () {
                      setImmediate(flush);
                  };
              }
      
          } else if (typeof MessageChannel !== "undefined") {
              // modern browsers
              // http://www.nonblocking.io/2011/06/windownexttick.html
              var channel = new MessageChannel();
              // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
              // working message ports the first time a page loads.
              channel.port1.onmessage = function () {
                  requestTick = requestPortTick;
                  channel.port1.onmessage = flush;
                  flush();
              };
              var requestPortTick = function () {
                  // Opera requires us to provide a message payload, regardless of
                  // whether we use it.
                  channel.port2.postMessage(0);
              };
              requestTick = function () {
                  setTimeout(flush, 0);
                  requestPortTick();
              };
      
          } else {
              // old browsers
              requestTick = function () {
                  setTimeout(flush, 0);
              };
          }
      
          return nextTick;
      })();
      
      // Attempt to make generics safe in the face of downstream
      // modifications.
      // There is no situation where this is necessary.
      // If you need a security guarantee, these primordials need to be
      // deeply frozen anyway, and if you don’t need a security guarantee,
      // this is just plain paranoid.
      // However, this **might** have the nice side-effect of reducing the size of
      // the minified code by reducing x.call() to merely x()
      // See Mark Miller’s explanation of what this does.
      // http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
      var call = Function.call;
      function uncurryThis(f) {
          return function () {
              return call.apply(f, arguments);
          };
      }
      // This is equivalent, but slower:
      // uncurryThis = Function_bind.bind(Function_bind.call);
      // http://jsperf.com/uncurrythis
      
      var array_slice = uncurryThis(Array.prototype.slice);
      
      var array_reduce = uncurryThis(
          Array.prototype.reduce || function (callback, basis) {
              var index = 0,
                  length = this.length;
              // concerning the initial value, if one is not provided
              if (arguments.length === 1) {
                  // seek to the first value in the array, accounting
                  // for the possibility that is is a sparse array
                  do {
                      if (index in this) {
                          basis = this[index++];
                          break;
                      }
                      if (++index >= length) {
                          throw new TypeError();
                      }
                  } while (1);
              }
              // reduce
              for (; index < length; index++) {
                  // account for the possibility that the array is sparse
                  if (index in this) {
                      basis = callback(basis, this[index], index);
                  }
              }
              return basis;
          }
      );
      
      var array_indexOf = uncurryThis(
          Array.prototype.indexOf || function (value) {
              // not a very good shim, but good enough for our one use of it
              for (var i = 0; i < this.length; i++) {
                  if (this[i] === value) {
                      return i;
                  }
              }
              return -1;
          }
      );
      
      var array_map = uncurryThis(
          Array.prototype.map || function (callback, thisp) {
              var self = this;
              var collect = [];
              array_reduce(self, function (undefined, value, index) {
                  collect.push(callback.call(thisp, value, index, self));
              }, void 0);
              return collect;
          }
      );
      
      var object_create = Object.create || function (prototype) {
          function Type() { }
          Type.prototype = prototype;
          return new Type();
      };
      
      var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
      
      var object_keys = Object.keys || function (object) {
          var keys = [];
          for (var key in object) {
              if (object_hasOwnProperty(object, key)) {
                  keys.push(key);
              }
          }
          return keys;
      };
      
      var object_toString = uncurryThis(Object.prototype.toString);
      
      function isObject(value) {
          return value === Object(value);
      }
      
      // generator related shims
      
      // FIXME: Remove this function once ES6 generators are in SpiderMonkey.
      function isStopIteration(exception) {
          return (
              object_toString(exception) === "[object StopIteration]" ||
              exception instanceof QReturnValue
          );
      }
      
      // FIXME: Remove this helper and Q.return once ES6 generators are in
      // SpiderMonkey.
      var QReturnValue;
      if (typeof ReturnValue !== "undefined") {
          QReturnValue = ReturnValue;
      } else {
          QReturnValue = function (value) {
              this.value = value;
          };
      }
      
      // long stack traces
      
      var STACK_JUMP_SEPARATOR = "From previous event:";
      
      function makeStackTraceLong(error, promise) {
          // If possible, transform the error stack trace by removing Node and Q
          // cruft, then concatenating with the stack trace of `promise`. See #57.
          if (hasStacks &&
              promise.stack &&
              typeof error === "object" &&
              error !== null &&
              error.stack &&
              error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
          ) {
              var stacks = [];
              for (var p = promise; !!p; p = p.source) {
                  if (p.stack) {
                      stacks.unshift(p.stack);
                  }
              }
              stacks.unshift(error.stack);
      
              var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
              error.stack = filterStackString(concatedStacks);
          }
      }
      
      function filterStackString(stackString) {
          var lines = stackString.split("\n");
          var desiredLines = [];
          for (var i = 0; i < lines.length; ++i) {
              var line = lines[i];
      
              if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
                  desiredLines.push(line);
              }
          }
          return desiredLines.join("\n");
      }
      
      function isNodeFrame(stackLine) {
          return stackLine.indexOf("(module.js:") !== -1 ||
                 stackLine.indexOf("(node.js:") !== -1;
      }
      
      function getFileNameAndLineNumber(stackLine) {
          // Named functions: "at functionName (filename:lineNumber:columnNumber)"
          // In IE10 function name can have spaces ("Anonymous function") O_o
          var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
          if (attempt1) {
              return [attempt1[1], Number(attempt1[2])];
          }
      
          // Anonymous functions: "at filename:lineNumber:columnNumber"
          var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
          if (attempt2) {
              return [attempt2[1], Number(attempt2[2])];
          }
      
          // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
          var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
          if (attempt3) {
              return [attempt3[1], Number(attempt3[2])];
          }
      }
      
      function isInternalFrame(stackLine) {
          var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
      
          if (!fileNameAndLineNumber) {
              return false;
          }
      
          var fileName = fileNameAndLineNumber[0];
          var lineNumber = fileNameAndLineNumber[1];
      
          return fileName === qFileName &&
              lineNumber >= qStartingLine &&
              lineNumber <= qEndingLine;
      }
      
      // discover own file name and line number range for filtering stack
      // traces
      function captureLine() {
          if (!hasStacks) {
              return;
          }
      
          try {
              throw new Error();
          } catch (e) {
              var lines = e.stack.split("\n");
              var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
              var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
              if (!fileNameAndLineNumber) {
                  return;
              }
      
              qFileName = fileNameAndLineNumber[0];
              return fileNameAndLineNumber[1];
          }
      }
      
      function deprecate(callback, name, alternative) {
          return function () {
              if (typeof console !== "undefined" &&
                  typeof console.warn === "function") {
                  console.warn(name + " is deprecated, use " + alternative +
                               " instead.", new Error("").stack);
              }
              return callback.apply(callback, arguments);
          };
      }
      
      // end of shims
      // beginning of real work
      
      /**
       * Constructs a promise for an immediate reference, passes promises through, or
       * coerces promises from different systems.
       * @param value immediate reference or promise
       */
      function Q(value) {
          // If the object is already a Promise, return it directly.  This enables
          // the resolve function to both be used to created references from objects,
          // but to tolerably coerce non-promises to promises.
          if (isPromise(value)) {
              return value;
          }
      
          // assimilate thenables
          if (isPromiseAlike(value)) {
              return coerce(value);
          } else {
              return fulfill(value);
          }
      }
      Q.resolve = Q;
      
      /**
       * Performs a task in a future turn of the event loop.
       * @param {Function} task
       */
      Q.nextTick = nextTick;
      
      /**
       * Controls whether or not long stack traces will be on
       */
      Q.longStackSupport = false;
      
      /**
       * Constructs a {promise, resolve, reject} object.
       *
       * `resolve` is a callback to invoke with a more resolved value for the
       * promise. To fulfill the promise, invoke `resolve` with any value that is
       * not a thenable. To reject the promise, invoke `resolve` with a rejected
       * thenable, or invoke `reject` with the reason directly. To resolve the
       * promise to another thenable, thus putting it in the same state, invoke
       * `resolve` with that other thenable.
       */
      Q.defer = defer;
      function defer() {
          // if "messages" is an "Array", that indicates that the promise has not yet
          // been resolved.  If it is "undefined", it has been resolved.  Each
          // element of the messages array is itself an array of complete arguments to
          // forward to the resolved promise.  We coerce the resolution value to a
          // promise using the `resolve` function because it handles both fully
          // non-thenable values and other thenables gracefully.
          var messages = [], progressListeners = [], resolvedPromise;
      
          var deferred = object_create(defer.prototype);
          var promise = object_create(Promise.prototype);
      
          promise.promiseDispatch = function (resolve, op, operands) {
              var args = array_slice(arguments);
              if (messages) {
                  messages.push(args);
                  if (op === "when" && operands[1]) { // progress operand
                      progressListeners.push(operands[1]);
                  }
              } else {
                  nextTick(function () {
                      resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
                  });
              }
          };
      
          // XXX deprecated
          promise.valueOf = function () {
              if (messages) {
                  return promise;
              }
              var nearerValue = nearer(resolvedPromise);
              if (isPromise(nearerValue)) {
                  resolvedPromise = nearerValue; // shorten chain
              }
              return nearerValue;
          };
      
          promise.inspect = function () {
              if (!resolvedPromise) {
                  return { state: "pending" };
              }
              return resolvedPromise.inspect();
          };
      
          if (Q.longStackSupport && hasStacks) {
              try {
                  throw new Error();
              } catch (e) {
                  // NOTE: don't try to use `Error.captureStackTrace` or transfer the
                  // accessor around; that causes memory leaks as per GH-111. Just
                  // reify the stack trace as a string ASAP.
                  //
                  // At the same time, cut off the first line; it's always just
                  // "[object Promise]\n", as per the `toString`.
                  promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
              }
          }
      
          // NOTE: we do the checks for `resolvedPromise` in each method, instead of
          // consolidating them into `become`, since otherwise we'd create new
          // promises with the lines `become(whatever(value))`. See e.g. GH-252.
      
          function become(newPromise) {
              resolvedPromise = newPromise;
              promise.source = newPromise;
      
              array_reduce(messages, function (undefined, message) {
                  nextTick(function () {
                      newPromise.promiseDispatch.apply(newPromise, message);
                  });
              }, void 0);
      
              messages = void 0;
              progressListeners = void 0;
          }
      
          deferred.promise = promise;
          deferred.resolve = function (value) {
              if (resolvedPromise) {
                  return;
              }
      
              become(Q(value));
          };
      
          deferred.fulfill = function (value) {
              if (resolvedPromise) {
                  return;
              }
      
              become(fulfill(value));
          };
          deferred.reject = function (reason) {
              if (resolvedPromise) {
                  return;
              }
      
              become(reject(reason));
          };
          deferred.notify = function (progress) {
              if (resolvedPromise) {
                  return;
              }
      
              array_reduce(progressListeners, function (undefined, progressListener) {
                  nextTick(function () {
                      progressListener(progress);
                  });
              }, void 0);
          };
      
          return deferred;
      }
      
      /**
       * Creates a Node-style callback that will resolve or reject the deferred
       * promise.
       * @returns a nodeback
       */
      defer.prototype.makeNodeResolver = function () {
          var self = this;
          return function (error, value) {
              if (error) {
                  self.reject(error);
              } else if (arguments.length > 2) {
                  self.resolve(array_slice(arguments, 1));
              } else {
                  self.resolve(value);
              }
          };
      };
      
      /**
       * @param resolver {Function} a function that returns nothing and accepts
       * the resolve, reject, and notify functions for a deferred.
       * @returns a promise that may be resolved with the given resolve and reject
       * functions, or rejected by a thrown exception in resolver
       */
      Q.Promise = promise; // ES6
      Q.promise = promise;
      function promise(resolver) {
          if (typeof resolver !== "function") {
              throw new TypeError("resolver must be a function.");
          }
          var deferred = defer();
          try {
              resolver(deferred.resolve, deferred.reject, deferred.notify);
          } catch (reason) {
              deferred.reject(reason);
          }
          return deferred.promise;
      }
      
      promise.race = race; // ES6
      promise.all = all; // ES6
      promise.reject = reject; // ES6
      promise.resolve = Q; // ES6
      
      // XXX experimental.  This method is a way to denote that a local value is
      // serializable and should be immediately dispatched to a remote upon request,
      // instead of passing a reference.
      Q.passByCopy = function (object) {
          //freeze(object);
          //passByCopies.set(object, true);
          return object;
      };
      
      Promise.prototype.passByCopy = function () {
          //freeze(object);
          //passByCopies.set(object, true);
          return this;
      };
      
      /**
       * If two promises eventually fulfill to the same value, promises that value,
       * but otherwise rejects.
       * @param x {Any*}
       * @param y {Any*}
       * @returns {Any*} a promise for x and y if they are the same, but a rejection
       * otherwise.
       *
       */
      Q.join = function (x, y) {
          return Q(x).join(y);
      };
      
      Promise.prototype.join = function (that) {
          return Q([this, that]).spread(function (x, y) {
              if (x === y) {
                  // TODO: "===" should be Object.is or equiv
                  return x;
              } else {
                  throw new Error("Can't join: not the same: " + x + " " + y);
              }
          });
      };
      
      /**
       * Returns a promise for the first of an array of promises to become fulfilled.
       * @param answers {Array[Any*]} promises to race
       * @returns {Any*} the first promise to be fulfilled
       */
      Q.race = race;
      function race(answerPs) {
          return promise(function(resolve, reject) {
              // Switch to this once we can assume at least ES5
              // answerPs.forEach(function(answerP) {
              //     Q(answerP).then(resolve, reject);
              // });
              // Use this in the meantime
              for (var i = 0, len = answerPs.length; i < len; i++) {
                  Q(answerPs[i]).then(resolve, reject);
              }
          });
      }
      
      Promise.prototype.race = function () {
          return this.then(Q.race);
      };
      
      /**
       * Constructs a Promise with a promise descriptor object and optional fallback
       * function.  The descriptor contains methods like when(rejected), get(name),
       * set(name, value), post(name, args), and delete(name), which all
       * return either a value, a promise for a value, or a rejection.  The fallback
       * accepts the operation name, a resolver, and any further arguments that would
       * have been forwarded to the appropriate method above had a method been
       * provided with the proper name.  The API makes no guarantees about the nature
       * of the returned object, apart from that it is usable whereever promises are
       * bought and sold.
       */
      Q.makePromise = Promise;
      function Promise(descriptor, fallback, inspect) {
          if (fallback === void 0) {
              fallback = function (op) {
                  return reject(new Error(
                      "Promise does not support operation: " + op
                  ));
              };
          }
          if (inspect === void 0) {
              inspect = function () {
                  return {state: "unknown"};
              };
          }
      
          var promise = object_create(Promise.prototype);
      
          promise.promiseDispatch = function (resolve, op, args) {
              var result;
              try {
                  if (descriptor[op]) {
                      result = descriptor[op].apply(promise, args);
                  } else {
                      result = fallback.call(promise, op, args);
                  }
              } catch (exception) {
                  result = reject(exception);
              }
              if (resolve) {
                  resolve(result);
              }
          };
      
          promise.inspect = inspect;
      
          // XXX deprecated `valueOf` and `exception` support
          if (inspect) {
              var inspected = inspect();
              if (inspected.state === "rejected") {
                  promise.exception = inspected.reason;
              }
      
              promise.valueOf = function () {
                  var inspected = inspect();
                  if (inspected.state === "pending" ||
                      inspected.state === "rejected") {
                      return promise;
                  }
                  return inspected.value;
              };
          }
      
          return promise;
      }
      
      Promise.prototype.toString = function () {
          return "[object Promise]";
      };
      
      Promise.prototype.then = function (fulfilled, rejected, progressed) {
          var self = this;
          var deferred = defer();
          var done = false;   // ensure the untrusted promise makes at most a
                              // single call to one of the callbacks
      
          function _fulfilled(value) {
              try {
                  return typeof fulfilled === "function" ? fulfilled(value) : value;
              } catch (exception) {
                  return reject(exception);
              }
          }
      
          function _rejected(exception) {
              if (typeof rejected === "function") {
                  makeStackTraceLong(exception, self);
                  try {
                      return rejected(exception);
                  } catch (newException) {
                      return reject(newException);
                  }
              }
              return reject(exception);
          }
      
          function _progressed(value) {
              return typeof progressed === "function" ? progressed(value) : value;
          }
      
          nextTick(function () {
              self.promiseDispatch(function (value) {
                  if (done) {
                      return;
                  }
                  done = true;
      
                  deferred.resolve(_fulfilled(value));
              }, "when", [function (exception) {
                  if (done) {
                      return;
                  }
                  done = true;
      
                  deferred.resolve(_rejected(exception));
              }]);
          });
      
          // Progress propagator need to be attached in the current tick.
          self.promiseDispatch(void 0, "when", [void 0, function (value) {
              var newValue;
              var threw = false;
              try {
                  newValue = _progressed(value);
              } catch (e) {
                  threw = true;
                  if (Q.onerror) {
                      Q.onerror(e);
                  } else {
                      throw e;
                  }
              }
      
              if (!threw) {
                  deferred.notify(newValue);
              }
          }]);
      
          return deferred.promise;
      };
      
      /**
       * Registers an observer on a promise.
       *
       * Guarantees:
       *
       * 1. that fulfilled and rejected will be called only once.
       * 2. that either the fulfilled callback or the rejected callback will be
       *    called, but not both.
       * 3. that fulfilled and rejected will not be called in this turn.
       *
       * @param value      promise or immediate reference to observe
       * @param fulfilled  function to be called with the fulfilled value
       * @param rejected   function to be called with the rejection exception
       * @param progressed function to be called on any progress notifications
       * @return promise for the return value from the invoked callback
       */
      Q.when = when;
      function when(value, fulfilled, rejected, progressed) {
          return Q(value).then(fulfilled, rejected, progressed);
      }
      
      Promise.prototype.thenResolve = function (value) {
          return this.then(function () { return value; });
      };
      
      Q.thenResolve = function (promise, value) {
          return Q(promise).thenResolve(value);
      };
      
      Promise.prototype.thenReject = function (reason) {
          return this.then(function () { throw reason; });
      };
      
      Q.thenReject = function (promise, reason) {
          return Q(promise).thenReject(reason);
      };
      
      /**
       * If an object is not a promise, it is as "near" as possible.
       * If a promise is rejected, it is as "near" as possible too.
       * If it’s a fulfilled promise, the fulfillment value is nearer.
       * If it’s a deferred promise and the deferred has been resolved, the
       * resolution is "nearer".
       * @param object
       * @returns most resolved (nearest) form of the object
       */
      
      // XXX should we re-do this?
      Q.nearer = nearer;
      function nearer(value) {
          if (isPromise(value)) {
              var inspected = value.inspect();
              if (inspected.state === "fulfilled") {
                  return inspected.value;
              }
          }
          return value;
      }
      
      /**
       * @returns whether the given object is a promise.
       * Otherwise it is a fulfilled value.
       */
      Q.isPromise = isPromise;
      function isPromise(object) {
          return isObject(object) &&
              typeof object.promiseDispatch === "function" &&
              typeof object.inspect === "function";
      }
      
      Q.isPromiseAlike = isPromiseAlike;
      function isPromiseAlike(object) {
          return isObject(object) && typeof object.then === "function";
      }
      
      /**
       * @returns whether the given object is a pending promise, meaning not
       * fulfilled or rejected.
       */
      Q.isPending = isPending;
      function isPending(object) {
          return isPromise(object) && object.inspect().state === "pending";
      }
      
      Promise.prototype.isPending = function () {
          return this.inspect().state === "pending";
      };
      
      /**
       * @returns whether the given object is a value or fulfilled
       * promise.
       */
      Q.isFulfilled = isFulfilled;
      function isFulfilled(object) {
          return !isPromise(object) || object.inspect().state === "fulfilled";
      }
      
      Promise.prototype.isFulfilled = function () {
          return this.inspect().state === "fulfilled";
      };
      
      /**
       * @returns whether the given object is a rejected promise.
       */
      Q.isRejected = isRejected;
      function isRejected(object) {
          return isPromise(object) && object.inspect().state === "rejected";
      }
      
      Promise.prototype.isRejected = function () {
          return this.inspect().state === "rejected";
      };
      
      //// BEGIN UNHANDLED REJECTION TRACKING
      
      // This promise library consumes exceptions thrown in handlers so they can be
      // handled by a subsequent promise.  The exceptions get added to this array when
      // they are created, and removed when they are handled.  Note that in ES6 or
      // shimmed environments, this would naturally be a `Set`.
      var unhandledReasons = [];
      var unhandledRejections = [];
      var trackUnhandledRejections = true;
      
      function resetUnhandledRejections() {
          unhandledReasons.length = 0;
          unhandledRejections.length = 0;
      
          if (!trackUnhandledRejections) {
              trackUnhandledRejections = true;
          }
      }
      
      function trackRejection(promise, reason) {
          if (!trackUnhandledRejections) {
              return;
          }
      
          unhandledRejections.push(promise);
          if (reason && typeof reason.stack !== "undefined") {
              unhandledReasons.push(reason.stack);
          } else {
              unhandledReasons.push("(no stack) " + reason);
          }
      }
      
      function untrackRejection(promise) {
          if (!trackUnhandledRejections) {
              return;
          }
      
          var at = array_indexOf(unhandledRejections, promise);
          if (at !== -1) {
              unhandledRejections.splice(at, 1);
              unhandledReasons.splice(at, 1);
          }
      }
      
      Q.resetUnhandledRejections = resetUnhandledRejections;
      
      Q.getUnhandledReasons = function () {
          // Make a copy so that consumers can't interfere with our internal state.
          return unhandledReasons.slice();
      };
      
      Q.stopUnhandledRejectionTracking = function () {
          resetUnhandledRejections();
          trackUnhandledRejections = false;
      };
      
      resetUnhandledRejections();
      
      //// END UNHANDLED REJECTION TRACKING
      
      /**
       * Constructs a rejected promise.
       * @param reason value describing the failure
       */
      Q.reject = reject;
      function reject(reason) {
          var rejection = Promise({
              "when": function (rejected) {
                  // note that the error has been handled
                  if (rejected) {
                      untrackRejection(this);
                  }
                  return rejected ? rejected(reason) : this;
              }
          }, function fallback() {
              return this;
          }, function inspect() {
              return { state: "rejected", reason: reason };
          });
      
          // Note that the reason has not been handled.
          trackRejection(rejection, reason);
      
          return rejection;
      }
      
      /**
       * Constructs a fulfilled promise for an immediate reference.
       * @param value immediate reference
       */
      Q.fulfill = fulfill;
      function fulfill(value) {
          return Promise({
              "when": function () {
                  return value;
              },
              "get": function (name) {
                  return value[name];
              },
              "set": function (name, rhs) {
                  value[name] = rhs;
              },
              "delete": function (name) {
                  delete value[name];
              },
              "post": function (name, args) {
                  // Mark Miller proposes that post with no name should apply a
                  // promised function.
                  if (name === null || name === void 0) {
                      return value.apply(void 0, args);
                  } else {
                      return value[name].apply(value, args);
                  }
              },
              "apply": function (thisp, args) {
                  return value.apply(thisp, args);
              },
              "keys": function () {
                  return object_keys(value);
              }
          }, void 0, function inspect() {
              return { state: "fulfilled", value: value };
          });
      }
      
      /**
       * Converts thenables to Q promises.
       * @param promise thenable promise
       * @returns a Q promise
       */
      function coerce(promise) {
          var deferred = defer();
          nextTick(function () {
              try {
                  promise.then(deferred.resolve, deferred.reject, deferred.notify);
              } catch (exception) {
                  deferred.reject(exception);
              }
          });
          return deferred.promise;
      }
      
      /**
       * Annotates an object such that it will never be
       * transferred away from this process over any promise
       * communication channel.
       * @param object
       * @returns promise a wrapping of that object that
       * additionally responds to the "isDef" message
       * without a rejection.
       */
      Q.master = master;
      function master(object) {
          return Promise({
              "isDef": function () {}
          }, function fallback(op, args) {
              return dispatch(object, op, args);
          }, function () {
              return Q(object).inspect();
          });
      }
      
      /**
       * Spreads the values of a promised array of arguments into the
       * fulfillment callback.
       * @param fulfilled callback that receives variadic arguments from the
       * promised array
       * @param rejected callback that receives the exception if the promise
       * is rejected.
       * @returns a promise for the return value or thrown exception of
       * either callback.
       */
      Q.spread = spread;
      function spread(value, fulfilled, rejected) {
          return Q(value).spread(fulfilled, rejected);
      }
      
      Promise.prototype.spread = function (fulfilled, rejected) {
          return this.all().then(function (array) {
              return fulfilled.apply(void 0, array);
          }, rejected);
      };
      
      /**
       * The async function is a decorator for generator functions, turning
       * them into asynchronous generators.  Although generators are only part
       * of the newest ECMAScript 6 drafts, this code does not cause syntax
       * errors in older engines.  This code should continue to work and will
       * in fact improve over time as the language improves.
       *
       * ES6 generators are currently part of V8 version 3.19 with the
       * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
       * for longer, but under an older Python-inspired form.  This function
       * works on both kinds of generators.
       *
       * Decorates a generator function such that:
       *  - it may yield promises
       *  - execution will continue when that promise is fulfilled
       *  - the value of the yield expression will be the fulfilled value
       *  - it returns a promise for the return value (when the generator
       *    stops iterating)
       *  - the decorated function returns a promise for the return value
       *    of the generator or the first rejected promise among those
       *    yielded.
       *  - if an error is thrown in the generator, it propagates through
       *    every following yield until it is caught, or until it escapes
       *    the generator function altogether, and is translated into a
       *    rejection for the promise returned by the decorated generator.
       */
      Q.async = async;
      function async(makeGenerator) {
          return function () {
              // when verb is "send", arg is a value
              // when verb is "throw", arg is an exception
              function continuer(verb, arg) {
                  var result;
      
                  // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
                  // engine that has a deployed base of browsers that support generators.
                  // However, SM's generators use the Python-inspired semantics of
                  // outdated ES6 drafts.  We would like to support ES6, but we'd also
                  // like to make it possible to use generators in deployed browsers, so
                  // we also support Python-style generators.  At some point we can remove
                  // this block.
      
                  if (typeof StopIteration === "undefined") {
                      // ES6 Generators
                      try {
                          result = generator[verb](arg);
                      } catch (exception) {
                          return reject(exception);
                      }
                      if (result.done) {
                          return result.value;
                      } else {
                          return when(result.value, callback, errback);
                      }
                  } else {
                      // SpiderMonkey Generators
                      // FIXME: Remove this case when SM does ES6 generators.
                      try {
                          result = generator[verb](arg);
                      } catch (exception) {
                          if (isStopIteration(exception)) {
                              return exception.value;
                          } else {
                              return reject(exception);
                          }
                      }
                      return when(result, callback, errback);
                  }
              }
              var generator = makeGenerator.apply(this, arguments);
              var callback = continuer.bind(continuer, "next");
              var errback = continuer.bind(continuer, "throw");
              return callback();
          };
      }
      
      /**
       * The spawn function is a small wrapper around async that immediately
       * calls the generator and also ends the promise chain, so that any
       * unhandled errors are thrown instead of forwarded to the error
       * handler. This is useful because it's extremely common to run
       * generators at the top-level to work with libraries.
       */
      Q.spawn = spawn;
      function spawn(makeGenerator) {
          Q.done(Q.async(makeGenerator)());
      }
      
      // FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
      /**
       * Throws a ReturnValue exception to stop an asynchronous generator.
       *
       * This interface is a stop-gap measure to support generator return
       * values in older Firefox/SpiderMonkey.  In browsers that support ES6
       * generators like Chromium 29, just use "return" in your generator
       * functions.
       *
       * @param value the return value for the surrounding generator
       * @throws ReturnValue exception with the value.
       * @example
       * // ES6 style
       * Q.async(function* () {
       *      var foo = yield getFooPromise();
       *      var bar = yield getBarPromise();
       *      return foo + bar;
       * })
       * // Older SpiderMonkey style
       * Q.async(function () {
       *      var foo = yield getFooPromise();
       *      var bar = yield getBarPromise();
       *      Q.return(foo + bar);
       * })
       */
      Q["return"] = _return;
      function _return(value) {
          throw new QReturnValue(value);
      }
      
      /**
       * The promised function decorator ensures that any promise arguments
       * are settled and passed as values (`this` is also settled and passed
       * as a value).  It will also ensure that the result of a function is
       * always a promise.
       *
       * @example
       * var add = Q.promised(function (a, b) {
       *     return a + b;
       * });
       * add(Q(a), Q(B));
       *
       * @param {function} callback The function to decorate
       * @returns {function} a function that has been decorated.
       */
      Q.promised = promised;
      function promised(callback) {
          return function () {
              return spread([this, all(arguments)], function (self, args) {
                  return callback.apply(self, args);
              });
          };
      }
      
      /**
       * sends a message to a value in a future turn
       * @param object* the recipient
       * @param op the name of the message operation, e.g., "when",
       * @param args further arguments to be forwarded to the operation
       * @returns result {Promise} a promise for the result of the operation
       */
      Q.dispatch = dispatch;
      function dispatch(object, op, args) {
          return Q(object).dispatch(op, args);
      }
      
      Promise.prototype.dispatch = function (op, args) {
          var self = this;
          var deferred = defer();
          nextTick(function () {
              self.promiseDispatch(deferred.resolve, op, args);
          });
          return deferred.promise;
      };
      
      /**
       * Gets the value of a property in a future turn.
       * @param object    promise or immediate reference for target object
       * @param name      name of property to get
       * @return promise for the property value
       */
      Q.get = function (object, key) {
          return Q(object).dispatch("get", [key]);
      };
      
      Promise.prototype.get = function (key) {
          return this.dispatch("get", [key]);
      };
      
      /**
       * Sets the value of a property in a future turn.
       * @param object    promise or immediate reference for object object
       * @param name      name of property to set
       * @param value     new value of property
       * @return promise for the return value
       */
      Q.set = function (object, key, value) {
          return Q(object).dispatch("set", [key, value]);
      };
      
      Promise.prototype.set = function (key, value) {
          return this.dispatch("set", [key, value]);
      };
      
      /**
       * Deletes a property in a future turn.
       * @param object    promise or immediate reference for target object
       * @param name      name of property to delete
       * @return promise for the return value
       */
      Q.del = // XXX legacy
      Q["delete"] = function (object, key) {
          return Q(object).dispatch("delete", [key]);
      };
      
      Promise.prototype.del = // XXX legacy
      Promise.prototype["delete"] = function (key) {
          return this.dispatch("delete", [key]);
      };
      
      /**
       * Invokes a method in a future turn.
       * @param object    promise or immediate reference for target object
       * @param name      name of method to invoke
       * @param value     a value to post, typically an array of
       *                  invocation arguments for promises that
       *                  are ultimately backed with `resolve` values,
       *                  as opposed to those backed with URLs
       *                  wherein the posted value can be any
       *                  JSON serializable object.
       * @return promise for the return value
       */
      // bound locally because it is used by other methods
      Q.mapply = // XXX As proposed by "Redsandro"
      Q.post = function (object, name, args) {
          return Q(object).dispatch("post", [name, args]);
      };
      
      Promise.prototype.mapply = // XXX As proposed by "Redsandro"
      Promise.prototype.post = function (name, args) {
          return this.dispatch("post", [name, args]);
      };
      
      /**
       * Invokes a method in a future turn.
       * @param object    promise or immediate reference for target object
       * @param name      name of method to invoke
       * @param ...args   array of invocation arguments
       * @return promise for the return value
       */
      Q.send = // XXX Mark Miller's proposed parlance
      Q.mcall = // XXX As proposed by "Redsandro"
      Q.invoke = function (object, name /*...args*/) {
          return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
      };
      
      Promise.prototype.send = // XXX Mark Miller's proposed parlance
      Promise.prototype.mcall = // XXX As proposed by "Redsandro"
      Promise.prototype.invoke = function (name /*...args*/) {
          return this.dispatch("post", [name, array_slice(arguments, 1)]);
      };
      
      /**
       * Applies the promised function in a future turn.
       * @param object    promise or immediate reference for target function
       * @param args      array of application arguments
       */
      Q.fapply = function (object, args) {
          return Q(object).dispatch("apply", [void 0, args]);
      };
      
      Promise.prototype.fapply = function (args) {
          return this.dispatch("apply", [void 0, args]);
      };
      
      /**
       * Calls the promised function in a future turn.
       * @param object    promise or immediate reference for target function
       * @param ...args   array of application arguments
       */
      Q["try"] =
      Q.fcall = function (object /* ...args*/) {
          return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
      };
      
      Promise.prototype.fcall = function (/*...args*/) {
          return this.dispatch("apply", [void 0, array_slice(arguments)]);
      };
      
      /**
       * Binds the promised function, transforming return values into a fulfilled
       * promise and thrown errors into a rejected one.
       * @param object    promise or immediate reference for target function
       * @param ...args   array of application arguments
       */
      Q.fbind = function (object /*...args*/) {
          var promise = Q(object);
          var args = array_slice(arguments, 1);
          return function fbound() {
              return promise.dispatch("apply", [
                  this,
                  args.concat(array_slice(arguments))
              ]);
          };
      };
      Promise.prototype.fbind = function (/*...args*/) {
          var promise = this;
          var args = array_slice(arguments);
          return function fbound() {
              return promise.dispatch("apply", [
                  this,
                  args.concat(array_slice(arguments))
              ]);
          };
      };
      
      /**
       * Requests the names of the owned properties of a promised
       * object in a future turn.
       * @param object    promise or immediate reference for target object
       * @return promise for the keys of the eventually settled object
       */
      Q.keys = function (object) {
          return Q(object).dispatch("keys", []);
      };
      
      Promise.prototype.keys = function () {
          return this.dispatch("keys", []);
      };
      
      /**
       * Turns an array of promises into a promise for an array.  If any of
       * the promises gets rejected, the whole array is rejected immediately.
       * @param {Array*} an array (or promise for an array) of values (or
       * promises for values)
       * @returns a promise for an array of the corresponding values
       */
      // By Mark Miller
      // http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
      Q.all = all;
      function all(promises) {
          return when(promises, function (promises) {
              var countDown = 0;
              var deferred = defer();
              array_reduce(promises, function (undefined, promise, index) {
                  var snapshot;
                  if (
                      isPromise(promise) &&
                      (snapshot = promise.inspect()).state === "fulfilled"
                  ) {
                      promises[index] = snapshot.value;
                  } else {
                      ++countDown;
                      when(
                          promise,
                          function (value) {
                              promises[index] = value;
                              if (--countDown === 0) {
                                  deferred.resolve(promises);
                              }
                          },
                          deferred.reject,
                          function (progress) {
                              deferred.notify({ index: index, value: progress });
                          }
                      );
                  }
              }, void 0);
              if (countDown === 0) {
                  deferred.resolve(promises);
              }
              return deferred.promise;
          });
      }
      
      Promise.prototype.all = function () {
          return all(this);
      };
      
      /**
       * Waits for all promises to be settled, either fulfilled or
       * rejected.  This is distinct from `all` since that would stop
       * waiting at the first rejection.  The promise returned by
       * `allResolved` will never be rejected.
       * @param promises a promise for an array (or an array) of promises
       * (or values)
       * @return a promise for an array of promises
       */
      Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
      function allResolved(promises) {
          return when(promises, function (promises) {
              promises = array_map(promises, Q);
              return when(all(array_map(promises, function (promise) {
                  return when(promise, noop, noop);
              })), function () {
                  return promises;
              });
          });
      }
      
      Promise.prototype.allResolved = function () {
          return allResolved(this);
      };
      
      /**
       * @see Promise#allSettled
       */
      Q.allSettled = allSettled;
      function allSettled(promises) {
          return Q(promises).allSettled();
      }
      
      /**
       * Turns an array of promises into a promise for an array of their states (as
       * returned by `inspect`) when they have all settled.
       * @param {Array[Any*]} values an array (or promise for an array) of values (or
       * promises for values)
       * @returns {Array[State]} an array of states for the respective values.
       */
      Promise.prototype.allSettled = function () {
          return this.then(function (promises) {
              return all(array_map(promises, function (promise) {
                  promise = Q(promise);
                  function regardless() {
                      return promise.inspect();
                  }
                  return promise.then(regardless, regardless);
              }));
          });
      };
      
      /**
       * Captures the failure of a promise, giving an oportunity to recover
       * with a callback.  If the given promise is fulfilled, the returned
       * promise is fulfilled.
       * @param {Any*} promise for something
       * @param {Function} callback to fulfill the returned promise if the
       * given promise is rejected
       * @returns a promise for the return value of the callback
       */
      Q.fail = // XXX legacy
      Q["catch"] = function (object, rejected) {
          return Q(object).then(void 0, rejected);
      };
      
      Promise.prototype.fail = // XXX legacy
      Promise.prototype["catch"] = function (rejected) {
          return this.then(void 0, rejected);
      };
      
      /**
       * Attaches a listener that can respond to progress notifications from a
       * promise's originating deferred. This listener receives the exact arguments
       * passed to ``deferred.notify``.
       * @param {Any*} promise for something
       * @param {Function} callback to receive any progress notifications
       * @returns the given promise, unchanged
       */
      Q.progress = progress;
      function progress(object, progressed) {
          return Q(object).then(void 0, void 0, progressed);
      }
      
      Promise.prototype.progress = function (progressed) {
          return this.then(void 0, void 0, progressed);
      };
      
      /**
       * Provides an opportunity to observe the settling of a promise,
       * regardless of whether the promise is fulfilled or rejected.  Forwards
       * the resolution to the returned promise when the callback is done.
       * The callback can return a promise to defer completion.
       * @param {Any*} promise
       * @param {Function} callback to observe the resolution of the given
       * promise, takes no arguments.
       * @returns a promise for the resolution of the given promise when
       * ``fin`` is done.
       */
      Q.fin = // XXX legacy
      Q["finally"] = function (object, callback) {
          return Q(object)["finally"](callback);
      };
      
      Promise.prototype.fin = // XXX legacy
      Promise.prototype["finally"] = function (callback) {
          callback = Q(callback);
          return this.then(function (value) {
              return callback.fcall().then(function () {
                  return value;
              });
          }, function (reason) {
              // TODO attempt to recycle the rejection with "this".
              return callback.fcall().then(function () {
                  throw reason;
              });
          });
      };
      
      /**
       * Terminates a chain of promises, forcing rejections to be
       * thrown as exceptions.
       * @param {Any*} promise at the end of a chain of promises
       * @returns nothing
       */
      Q.done = function (object, fulfilled, rejected, progress) {
          return Q(object).done(fulfilled, rejected, progress);
      };
      
      Promise.prototype.done = function (fulfilled, rejected, progress) {
          var onUnhandledError = function (error) {
              // forward to a future turn so that ``when``
              // does not catch it and turn it into a rejection.
              nextTick(function () {
                  makeStackTraceLong(error, promise);
                  if (Q.onerror) {
                      Q.onerror(error);
                  } else {
                      throw error;
                  }
              });
          };
      
          // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
          var promise = fulfilled || rejected || progress ?
              this.then(fulfilled, rejected, progress) :
              this;
      
          if (typeof process === "object" && process && process.domain) {
              onUnhandledError = process.domain.bind(onUnhandledError);
          }
      
          promise.then(void 0, onUnhandledError);
      };
      
      /**
       * Causes a promise to be rejected if it does not get fulfilled before
       * some milliseconds time out.
       * @param {Any*} promise
       * @param {Number} milliseconds timeout
       * @param {String} custom error message (optional)
       * @returns a promise for the resolution of the given promise if it is
       * fulfilled before the timeout, otherwise rejected.
       */
      Q.timeout = function (object, ms, message) {
          return Q(object).timeout(ms, message);
      };
      
      Promise.prototype.timeout = function (ms, message) {
          var deferred = defer();
          var timeoutId = setTimeout(function () {
              deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
          }, ms);
      
          this.then(function (value) {
              clearTimeout(timeoutId);
              deferred.resolve(value);
          }, function (exception) {
              clearTimeout(timeoutId);
              deferred.reject(exception);
          }, deferred.notify);
      
          return deferred.promise;
      };
      
      /**
       * Returns a promise for the given value (or promised value), some
       * milliseconds after it resolved. Passes rejections immediately.
       * @param {Any*} promise
       * @param {Number} milliseconds
       * @returns a promise for the resolution of the given promise after milliseconds
       * time has elapsed since the resolution of the given promise.
       * If the given promise rejects, that is passed immediately.
       */
      Q.delay = function (object, timeout) {
          if (timeout === void 0) {
              timeout = object;
              object = void 0;
          }
          return Q(object).delay(timeout);
      };
      
      Promise.prototype.delay = function (timeout) {
          return this.then(function (value) {
              var deferred = defer();
              setTimeout(function () {
                  deferred.resolve(value);
              }, timeout);
              return deferred.promise;
          });
      };
      
      /**
       * Passes a continuation to a Node function, which is called with the given
       * arguments provided as an array, and returns a promise.
       *
       *      Q.nfapply(FS.readFile, [__filename])
       *      .then(function (content) {
       *      })
       *
       */
      Q.nfapply = function (callback, args) {
          return Q(callback).nfapply(args);
      };
      
      Promise.prototype.nfapply = function (args) {
          var deferred = defer();
          var nodeArgs = array_slice(args);
          nodeArgs.push(deferred.makeNodeResolver());
          this.fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
      };
      
      /**
       * Passes a continuation to a Node function, which is called with the given
       * arguments provided individually, and returns a promise.
       * @example
       * Q.nfcall(FS.readFile, __filename)
       * .then(function (content) {
       * })
       *
       */
      Q.nfcall = function (callback /*...args*/) {
          var args = array_slice(arguments, 1);
          return Q(callback).nfapply(args);
      };
      
      Promise.prototype.nfcall = function (/*...args*/) {
          var nodeArgs = array_slice(arguments);
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          this.fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
      };
      
      /**
       * Wraps a NodeJS continuation passing function and returns an equivalent
       * version that returns a promise.
       * @example
       * Q.nfbind(FS.readFile, __filename)("utf-8")
       * .then(console.log)
       * .done()
       */
      Q.nfbind =
      Q.denodeify = function (callback /*...args*/) {
          var baseArgs = array_slice(arguments, 1);
          return function () {
              var nodeArgs = baseArgs.concat(array_slice(arguments));
              var deferred = defer();
              nodeArgs.push(deferred.makeNodeResolver());
              Q(callback).fapply(nodeArgs).fail(deferred.reject);
              return deferred.promise;
          };
      };
      
      Promise.prototype.nfbind =
      Promise.prototype.denodeify = function (/*...args*/) {
          var args = array_slice(arguments);
          args.unshift(this);
          return Q.denodeify.apply(void 0, args);
      };
      
      Q.nbind = function (callback, thisp /*...args*/) {
          var baseArgs = array_slice(arguments, 2);
          return function () {
              var nodeArgs = baseArgs.concat(array_slice(arguments));
              var deferred = defer();
              nodeArgs.push(deferred.makeNodeResolver());
              function bound() {
                  return callback.apply(thisp, arguments);
              }
              Q(bound).fapply(nodeArgs).fail(deferred.reject);
              return deferred.promise;
          };
      };
      
      Promise.prototype.nbind = function (/*thisp, ...args*/) {
          var args = array_slice(arguments, 0);
          args.unshift(this);
          return Q.nbind.apply(void 0, args);
      };
      
      /**
       * Calls a method of a Node-style object that accepts a Node-style
       * callback with a given array of arguments, plus a provided callback.
       * @param object an object that has the named method
       * @param {String} name name of the method of object
       * @param {Array} args arguments to pass to the method; the callback
       * will be provided by Q and appended to these arguments.
       * @returns a promise for the value or error
       */
      Q.nmapply = // XXX As proposed by "Redsandro"
      Q.npost = function (object, name, args) {
          return Q(object).npost(name, args);
      };
      
      Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
      Promise.prototype.npost = function (name, args) {
          var nodeArgs = array_slice(args || []);
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
          return deferred.promise;
      };
      
      /**
       * Calls a method of a Node-style object that accepts a Node-style
       * callback, forwarding the given variadic arguments, plus a provided
       * callback argument.
       * @param object an object that has the named method
       * @param {String} name name of the method of object
       * @param ...args arguments to pass to the method; the callback will
       * be provided by Q and appended to these arguments.
       * @returns a promise for the value or error
       */
      Q.nsend = // XXX Based on Mark Miller's proposed "send"
      Q.nmcall = // XXX Based on "Redsandro's" proposal
      Q.ninvoke = function (object, name /*...args*/) {
          var nodeArgs = array_slice(arguments, 2);
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
          return deferred.promise;
      };
      
      Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
      Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
      Promise.prototype.ninvoke = function (name /*...args*/) {
          var nodeArgs = array_slice(arguments, 1);
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
          return deferred.promise;
      };
      
      /**
       * If a function would like to support both Node continuation-passing-style and
       * promise-returning-style, it can end its internal promise chain with
       * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
       * elects to use a nodeback, the result will be sent there.  If they do not
       * pass a nodeback, they will receive the result promise.
       * @param object a result (or a promise for a result)
       * @param {Function} nodeback a Node.js-style callback
       * @returns either the promise or nothing
       */
      Q.nodeify = nodeify;
      function nodeify(object, nodeback) {
          return Q(object).nodeify(nodeback);
      }
      
      Promise.prototype.nodeify = function (nodeback) {
          if (nodeback) {
              this.then(function (value) {
                  nextTick(function () {
                      nodeback(null, value);
                  });
              }, function (error) {
                  nextTick(function () {
                      nodeback(error);
                  });
              });
          } else {
              return this;
          }
      };
      
      // All code before this point will be filtered from stack traces.
      var qEndingLine = captureLine();
      
      return Q;
      
      });
      
    }
  }, 'q');

  require('scriptjs');
  require('scriptjs/src/ender');
  require('es5-basic');
  require('jar');
  require('jar/lib/ender');
  require('ym');
  require('q');

}.call(window));
//# sourceMappingURL=blocks/common/core/__ender/core__ender.js.map

/* end: ../../../blocks/common/core/__ender/core__ender.js */
/* begin: ../../../blocks/common/core/__ym/core__ym.js */
var modules = require('ym');
/* end: ../../../blocks/common/core/__ym/core__ym.js */
/* begin: ../../../blocks/common/core/__check-auth/core__check-auth.js */
modules.define('check-auth'
    , ['cookie', 'config', 'q']
    , function (provide, cookie, config, Q) {

        provide(function (url) {
            var promise,
                xhr;

            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xhr = false;
                }
            }
            if (!xhr && typeof XMLHttpRequest != 'undefined') {
                xhr = new XMLHttpRequest();
            }

            promise = Q.Promise(function (resolve, reject) {
                xhr.open('POST', config.checkAuth.rootPath, true);
                xhr.setRequestHeader("Content-type", 'application/json');
                xhr.setRequestHeader("Accept", 'application/json');
                xhr.setRequestHeader("x-xsrf-token", cookie.get('XSRF-TOKEN', { raw: true }));
                xhr.onreadystatechange = function () {
                    var statusCode;
                    if (xhr.readyState == 4) {
                        try {
                            statusCode = JSON.parse(xhr.responseText).statusCode;
                        } catch (e) {
                            statusCode = 500;
                        }
                        // 404 или 200 - авторизован, 403 - не авторизован, 500 - прочие ошибки
                        if (statusCode === 403) {
                            reject(new Error('forbidden'));
                        } else {
                            resolve(statusCode);
                        }
                    }
                };
                xhr.send(JSON.stringify({ url: url.replace(/^ws/, 'http') }));
            });

            return promise.timeout(config.checkAuth.timeout, new Error('timeout'));
        });
    });

/* end: ../../../blocks/common/core/__check-auth/core__check-auth.js */
/* begin: ../../../blocks/common/core/__cookie/core__cookie.js */
modules.define('cookie', function(provide, cookie){
    var Jar = require('jar').Jar;
    provide(new Jar());
});

/* end: ../../../blocks/common/core/__cookie/core__cookie.js */
/* begin: ../../../blocks/common/core/__loader/core__loader.js */
modules.define('loader',function(provide){
    provide(require('scriptjs'));
});

/* end: ../../../blocks/common/core/__loader/core__loader.js */
/* begin: ../../../blocks/common/core/__q/core__q.js */
modules.define('q', function(provide){
    provide(require('q'));
});

/* end: ../../../blocks/common/core/__q/core__q.js */
/* begin: ../../../blocks/common/core/__storage/core__storage.js */
modules.define('storage', ['cookie'], function(provide, cookie){

    var storage = {},
        jar;

    // Нативная поддержка WebStorage API или полифил на основе куки.
    if (sessionStorage) {
        storage.get = sessionStorage.getItem.bind(sessionStorage);
        storage.set = sessionStorage.setItem.bind(sessionStorage);
    } else {
        storage.get = cookie.get;
        storage.set = cookie.set;
    }

    /**
     * Фиксирует текущее время.
     * @param {String} [tag] Название ключа, в которым сохраняется время.
     */
    storage.fixTime = function(tag) {
        tag = tag || 'fix-time';
        storage.set(tag, Date.now());
    };

    /**
     * Возвращает зафиксироанное либо текущее время.
     * @param {String} [tag] Название ключа, из которого берется время.
     * @returns {Number} Timestamp.
     */
    storage.getTime = function(tag) {
        var ts = parseInt(storage.get(tag || 'fix-time'), 10);
        return  isNaN(ts) ? 0 : ts;
    };

    provide(storage);
});

/* end: ../../../blocks/common/core/__storage/core__storage.js */
/* begin: ../../../blocks/common/websocket/websocket.js */
modules.define('websocket'
        , ['loader', 'config']
        , function(provide, loader, params) {

    if ('function' === typeof WebSocket) {
        provide(WebSocket);
    } else if ('function' === typeof MozWebSocket) {
        provide(MozWebSocket);
    } else {
        loader(params.bundle.websocket, function () {
            WEB_SOCKET_SWF_LOCATION = params.bundle.websocketSwf;
            provide(WebSocket);
        })
    }
});

/* end: ../../../blocks/common/websocket/websocket.js */
/* begin: ../../../blocks/common/websocket/__alive/websocket__alive.js */
modules.define('websocket'
    , ['config', 'check-auth', 'q', 'config']
    , function (provide, config, checkAuth, Q, config, WebSocket) {

        /**
         * Конструкутор обертки над сокетом. Создает сокет и подключает обработчики.
         * Вместо обертки возвращается промис, заполняемый оберткой в будущем.
         *
         * @param {String} url Адрес ws-сервера.
         * @returns {Promise} Промис, который заполняется по готовности сокета
         *   или отвергается при невозможности соединения.
         * @constructor
         */
        function WS(url) {
            if (!(this instanceof WS)) return new WS(url);

            this._timeout = config.websocket.timeout;
            this._attemptDelay = config.websocket.attemptDelay;
            this._attemptId = 0;
            this._payload = undefined;
            this._socket = undefined;
            this._defer = undefined;
            this._timer = undefined;
            this.error = undefined;
            this.readyState = undefined;
            return this._open(url);
        }
        WS.prototype = {
            CONNECTING: 0,
            OPEN: 1,
            CLOSING: 2,
            CLOSED: 3,
            /**
             * Открывает соединение с указанным урлом. Если запрошенный URL
             * открыт, возвращает промис с текущей оберткой.
             * @param {String} url URL ws-сервера.
             * @returns {Promise}
             */
            open: function (url) {
                return this._url === url && this.readyState <= this.OPEN ?
                    Q.resolve(this)
                    : this._open(url);
            },
            /**
             * Останавливает попытки соединения, закрывает сокет, уведомляет
             * внешний код через событие и через промис.
             * @param {Error} [e] Причина закрытия.
             * @private
             */
            close: function (e) {
                if (this.readyState === this.CLOSED) return;

                this.readyState = this.CLOSED;
                clearTimeout(this._timer);
                this._closeSocket();

                if (e instanceof Error) {
                    this.error = e;
                    this._propogate('onerror', e);
                }
                this._propogate('onclose', 'close');
                if (this._defer) {
                    this._defer.reject(this);
                }
            },
            /**
             * Отправляет данные. Если сокет закрыт,
             * кеширует данные и переоткрывает сокет.
             * @param {*} data Произвольные данные.
             */
            send: function (data) {
                if (this.readyState === this.OPEN) {
                    this._socket.send(data);
                } else {
                    this._payload = data;
                    if (this.readyState !== this.CONNECTING) {
                        this._open(this._url);
                    }
                }
            },
            /**
             * Обработчик готовности сокета. Заполняет промис
             * и отправляет кешированные данные.
             * @param e
             * @private
             * @event
             */
            _onopen: function (e) {
                this.readyState = this.OPEN;
                if (this._payload) {
                    this.send(this._payload);
                    this._payload = undefined;
                }
                this._propogate('onopen', e);
                this._defer.resolve(this);
                clearTimeout(this._timer);
            },
            /**
             * Поддерживает открытый сокет. Делает паузу между попытками подключения.
             * Проверяет авторизацию после первой неудачной попытки. При отказе
             * в авторизации закрывает сокет.
             * @event
             */
            _onclose: function () {
                // Различаются два случая: неудачная попытка подключения
                // и потеря связи после успешного подключения. Во втором
                // случае таймер заводится вновь.
                if (this.readyState === this.OPEN) {
                    this._setTimer();
                }
                var auth = this._attemptId++ ?
                    Q.delay(this._attemptDelay) // не первая попытка подключения
                    : checkAuth(this._url);     // первая попытка - поверить авторизацию

                auth.done(this._openSocket.bind(this), this.close.bind(this));
            },
            /**
             * Проксирует события `onmessage` от сокета во внешний код.
             * @param e
             * @event
             */
            _onmessage: function (e) {
                this._propogate('onmessage', e);
            },
            /**
             * Ничего не делает, поскольку ошибки обрабатываются в `onclose`.
             * @event
             */
            _onerror: function (e) {
                if ('development' === config.env) {
                    console.log('Socket error:');
                    console.log(e);
                }
            },
            /**
             * Завтоди таймер, который по истечению срока закрывает сокет с ошибкой.
             * @private
             */
            _setTimer: function() {
                this._attemptId = 0;
                clearTimeout(this._timer);
                this._timer = setTimeout(function () {
                    this.close(new Error('timeout'));
                }.bind(this), this._timeout);
            },
            /**
             * Открывает сокет по требованию внешнего кода.
             * @param {String} url URL ws-сервера.
             * @returns {Promise} Промис, заполняемый по готовности сокета, отвергаемый
             *   по ошибкам и по таймауту. Заполняется ссылкой на текущий объект-обертку.
             * @private
             */
            _open: function (url) {
                this.readyState = this.CONNECTING;
                this._url = url;
                if (this._defer) {
                    this._defer.reject(this);
                }
                this._defer = Q.defer();
                this._setTimer();
                this._openSocket();
                return this._defer.promise;
            },
            /**
             * Создает сокет, подключает обработчики. Вызывается из `_open`
             * и может многократно вызываться для восстановления подключение.
             * При первой попытке заводит таймер.
             * @private
             */
            _openSocket: function () {
                if (this.readyState === this.CLOSED) return;
                this._closeSocket();
                this.readyState = this.CONNECTING;
                try {
                    this._socket = new WebSocket(this._url);
                    this._handlers(true);
                } catch (e) {
                    this.close(e);
                }
            },
            /**
             * Закрывает сокет, отключает обработчики.
             * @private
             */
            _closeSocket: function () {
                if (this._socket) {
                    this._handlers(false);
                    this._socket.close();
                }
            },
            /**
             * Подключает/отключает обработчики на сокете.
             * @param {Boolean} act Значении true - подключить, false - отключить.
             */
            _handlers: function (act) {
                var hrs = ['onopen', 'onmessage', 'onerror', 'onclose'];
                hrs.forEach(function (name) {
                    this._socket[name] = act ?
                        this['_' + name].bind(this)
                        : undefined;
                }, this);
            },
            /**
             * Вызывает обработчик, назначенный внешним кодом.
             * @param {String} name Имя обработчика.
             * @param {*} data Данные для обработчика.
             * @private
             */
            _propogate: function (name, data) {
                if ('function' === typeof this[name]) {
                    this[name].call(this, data);
                }
            }
        };
        provide(WS);
    });

/* end: ../../../blocks/common/websocket/__alive/websocket__alive.js */
/* begin: ../../../blocks/common/app/app.js */
modules.define('app'
    , ['loader', 'config', 'storage', 'websocket']
    , function (provide, loader, config, storage, WebSocket) {
        provide({
            init: function () {
                var isRefresh = storage.getTime('stop-time') + config.refreshTimeout > Date.now(),
                    query = {
                        username: storage.get('username'),
                        password: storage.get('password')
                    };

                // Открыть сокет пока грузятся бандлы или создать пустой сокет,
                // если пользователь не был авторизован или разорвал соединение
                config._sockPromise = isRefresh && query.username && query.password ?
                    new WebSocket(config.websocket.url(query))
                    : new WebSocket();

                loader.ready('ember', function () {
                    modules.require(['ember', 'hbs', 'router']
                        , function (Ember, hbs, router) {

                            var isDev = config.env === 'development',
                                options = {
                                    LOG_TRANSITIONS: isDev,
                                    LOG_BINDINGS: isDev,
                                    LOG_VERSION: isDev
                                };

                            hbs.init();
                            router.init(Ember.Application.create(options))
                                .application()
                                .index()
                                .login()
                                .map();
                        });
                });
            }
        });
    }
);

/* end: ../../../blocks/common/app/app.js */
/* begin: ../../../blocks/common/app/__gps/app__gps.js */
modules.define('gps', ['q', 'config'], function (provide, Q, config) {

    /**
     * Возвращает предустановленные кооринаты.
     * TODO: Вместо этого можно делать запрос к геолокационному сервису,
     * TODO: чтобы определять примерное положение по IP подсети.
     * @returns {{lat: number, lon: number}}
     */
    function fallback () {
        return { lat: 55.373703, lon: 37.474764 };
    }

    provide({
        getPos: function () {
            var defer = Q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    if (pos.coords.latitude && pos.coords.longitude) {
                        defer.resolve({
                            lat: pos.coords.latitude,
                            lon: pos.coords.longitude
                        })
                    } else {
                        defer.reject();
                    }
                });
            } else {
                defer.reject();
            }
            return defer.promise.timeout(config.gpsTimeout)
                .fail(function (e) {
                    return fallback();
                })
                .then(function (pos) {
                    return JSON.stringify(pos);
                });
        }
    });
});

/* end: ../../../blocks/common/app/__gps/app__gps.js */
/* begin: ../../../blocks/common/app/_router/app_router.js */
modules.define('router', function(provide) {

    provide({
        init: function (app) {
            this.app = app;
            app.Router.map(function () {
                this.route("login");
                this.route("map");
            });
            app.Router.reopen({ location: 'history' });
            return this;
        }
    })
});

/* end: ../../../blocks/common/app/_router/app_router.js */
/* begin: ../../../blocks/common/app/_router/app_router_application.js */
modules.define('router'
    , ['jquery', 'ember', 'config', 'storage']
    , function (provide, $, Ember, config, storage, router) {

        router.application = function () {
            // Route
            this.app.ApplicationRoute = Ember.Route.extend({
                setupController: function (controller, model, e) {
                    if (!controller.get('initialRoute')) {
                        controller.set('initialRoute', e.targetName);
                    }
                    this.transitionTo('index');

                    // Сохранить время завершения приложения
                    $(window).unload(function () {
                        controller.get('socket').close();
                        storage.fixTime('stop-time');
                    });
                }
            });
            // Controller
            this.app.ApplicationController = Ember.Controller.extend({

                isLoggedIn: false,
                isConnectionLost: false,
                userName: undefined,
                password: undefined,
                location: undefined,
                socket: undefined,
                data: undefined,

                /**
                 * Подключает обработчики к сокету
                 */
                socketHandlers: function () {
                    var socket = this.get('socket');

                    /**
                     * Отправляет координаты при установке соединения.
                     * @event
                     */
                    socket.onopen = function () {
                        this.set('isConnectionLost', false);
                        this.get('sendLocation').call(this);
                    }.bind(this);

                    /**
                     * Принимает данные и реализует проверку соединения
                     * @event
                     */
                    socket.onmessage = function (e) {
                        this.set('data', e.data);
                        this.set('isConnectionLost', false);
                        clearTimeout(this.get('_timer'));
                        this.set('_timer', setTimeout(function() {
                                this.set('isConnectionLost', true)
                            }.bind(this)
                            , config.heartBitInterval)
                        );
                    }.bind(this);
                }.observes('socket'),

                /**
                 * Посылает координаты на сервер при периодическом поступлении из контроллера `map`.
                 */
                sendLocation: function () {
                    var location = JSON.stringify(this.get('location'));
                    if (location && this.get('isLoggedIn')) {
                        this.get('socket').send(location);
                    }
                }.observes('location')
            });
            return this;
        };
        provide(router);
    });

/* end: ../../../blocks/common/app/_router/app_router_application.js */
/* begin: ../../../blocks/common/app/_router/app_router_index.js */
modules.define('router'
    , ['ember', 'q', 'config', 'storage']
    , function (provide, Ember, Q, config, storage, router) {

        router.index = function () {
            // Route
            this.app.IndexRoute = Ember.Route.extend({
                /**
                 * Ждет сокет (открыт или отказ), сохраняет его в контроллере приложения.
                 * Если сокет открыт сохраняет статус авторизации и имя пользователя.
                 */
                setupController: function (controller) {
                    controller.set('_preventTransition', true);

                    config._sockPromise
                        .then(function (socket) {
                            controller.set('socket', socket);
                            controller.set('isLoggedIn', true);
                            controller.set('userName', storage.get('username'));
                            controller.set('password', storage.get('password'));
                            return socket;
                        }
                        , function (socket) {
                            controller.set('socket', socket);
                            return socket;
                        })
                        .finally(function () {
                            // Как только сокет готов (fulfilled) разрешаем переходить на страницу,
                            // но автоматический переход только после паузы, чтобы не мелькал спин
                            controller.set('_preventTransition', false);
                            return Q.delay(storage.getTime('init-time') + config.spinMinTime - Date.now());
                        })
                        .done(function (socket) {
                            if (!controller.get('_preventTransition')) {
                                if (socket.readyState !== socket.OPEN
                                    || controller.get('initialRoute') === 'login') {
                                    controller.transitionToRoute('login');
                                } else {
                                    controller.transitionToRoute('map');
                                }
                            }
                        });
                },
                actions: {
                    willTransition: function (transition) {
                        if (this.controller.get('_preventTransition')) {
                            transition.abort();
                        } else {
                            this.controller.set('_preventTransition', true);
                            $('.preinit').removeClass('active');
                        }
                    }
                }
            });

            // Controller
            this.app.IndexController = Ember.Controller.extend({
                needs: ['application'],
                isLoggedIn: Ember.computed.alias('controllers.application.isLoggedIn'),
                userName: Ember.computed.alias('controllers.application.userName'),
                password: Ember.computed.alias('controllers.application.password'),
                socket: Ember.computed.alias('controllers.application.socket'),
                initialRoute: Ember.computed.readOnly('controllers.application.initialRoute'),
                _preventTransition: false
            });
            return this;
        };
        provide(router);
    });

/* end: ../../../blocks/common/app/_router/app_router_index.js */
/* begin: ../../../blocks/common/app/_router/app_router_login.js */
modules.define('router'
    , ['jquery', 'ember', 'q', 'config', 'storage']
    , function (provide, $, Ember, Q, config, storage, router) {

        router.login = function () {

            // Controller
            this.app.LoginController = Ember.Controller.extend({
                needs: ['application'],

                isLogging: false,
                isLoggingError: false,
                loggingErrorMsg: '',
                isLoggedIn: Ember.computed.alias('controllers.application.isLoggedIn'),
                socket: Ember.computed.alias('controllers.application.socket'),
                userName: Ember.computed.alias('controllers.application.userName'),
                password: Ember.computed.alias('controllers.application.password'),
                isConnectionLost: Ember.computed.alias('controllers.application.isConnectionLost'),
                _userName: Ember.computed.reads('userName'),
                _password: Ember.computed.reads('password'),

                showValidationMsg: false,
                isValid: function () {
                    return !this.get('isWrongUserName') && !this.get('isWrongPassword');
                }.property('isWrongUserName', 'isWrongPassword'),

                isWrongUserName: Ember.computed.notEmpty('userNameMsg'),
                showUserNameMsg: Ember.computed.and('showValidationMsg', 'isWrongUserName'),
                userNameMsg: function () {
                    var userName = $.trim(this.get('_userName'));
                    if (!userName) {
                        return 'No username specified';
                    } else if (userName.length > 20) {
                        return 'Length of 20 characters';
                    } else if (/\s/.test(userName)) {
                        return 'There should be no spaces';
                    } else if (userName.replace(/[\w\d_]/g, '').length) {
                        return 'Only letters, numbers and _ is allowed'
                    }
                }.property('_userName'),

                isWrongPassword: Ember.computed.notEmpty('passwordMsg'),
                showPasswordMsg: Ember.computed.and('showValidationMsg', 'isWrongPassword'),
                passwordMsg: function () {
                    var password = $.trim(this.get('_password'));
                    if (!password) {
                        return 'No password specified';
                    } else if (password.length > 20) {
                        return 'Length of 20 characters';
                    } else if (/\s/.test(password)) {
                        return 'There should be no spaces';
                    }
                }.property('_password'),

                actions: {
                    disconnect: function () {
                        this.get('socket').close();
                        this.set('isLoggedIn', false);
                        this.set('isConnectionLost', false);
                        storage.set('username', '');
                        storage.set('password', '');
                    },
                    connect: function () {
                        var controller = this;

                        this.set('isLoggingError', false);
                        this.set('loggingErrorMsg', '');

                        if (this.get('isValid')) {
                            this.set('isLogging', true);
                            this.set('showValidationMsg', false);
                            this.get('socket')
                                .open(config.websocket.url({
                                    username: this.get('_userName'),
                                    password: this.get('_password')
                                }))
                                .fin(function () {
                                    controller.set('isLogging', false);
                                })
                                .then(function () {
                                    var username = controller.get('_userName'),
                                        password = controller.get('_password')
                                    storage.set('username', username);
                                    storage.set('password', password);
                                    controller.set('userName', username);
                                    controller.set('password', password);
                                    controller.set('isLoggedIn', true);
                                    controller.transitionToRoute('map');
                                }
                                , function (socket) {
                                    controller.set('loggingErrorMsg', socket.error.message === 'forbidden' ?
                                        'The username or password you entered is incorrect. ' +
                                        'Check to make sure your Caps Lock is off, ' +
                                        'and that you are using the correct username and password.'
                                        : 'Unable to connect to the server. Please try again later.'
                                    );
                                    controller.set('isLoggingError', true);
                                });
                        } else {
                            this.set('showValidationMsg', true);
                        }
                    }
                }
            });
            return this;
        };
        provide(router);
        return this;
    });

/* end: ../../../blocks/common/app/_router/app_router_login.js */
/* begin: ../../../blocks/common/app/_router/app_router_map.js */
modules.define('router'
    , ['jquery', 'ember', 'q', 'leaflet', 'config']
    , function (provide, $, Ember, Q, leaflet, config, router) {

        router.map = function () {

            // Route
            this.app.MapRoute = Ember.Route.extend({
                setupController: function (controller) {

                    if (controller.get('isLoggedIn')) {
                        Ember.run.scheduleOnce('afterRender', this, function () {

                            Q(leaflet($('#map'))).then(function (map) {
                                controller.set('map', map);

                                // Периодически определять местоположение
                                setInterval(function () {
                                    map.locate({ setView: false });
                                }, config.locationInterval);

                                // Исходное позиционирование карты и обработчики поступления координат
                                map.locate({ setView: true, maxZoom: 13 })
                                    .on('locationfound'
                                        , controller.get('onLocationFound')
                                        , controller)
                                    .on('locationerror'
                                        , controller.get('onLocationError')
                                        , controller);
                            }
                            // TODO не удалось создать карту
                            , function () {});
                        });
                    }
                },
                actions: {
                    willTransition: function () {
                        var map = this.controller.get('map');
                        if ('object' === typeof map) {
                            map.remove();
                            this.controller.set('map', undefined);
                        }
                    }
                }
            });

            // Controller
            this.app.MapController = Ember.Controller.extend({
                needs: ['application'],

                isLoggedIn: Ember.computed.readOnly('controllers.application.isLoggedIn'),
                isConnectionLost: Ember.computed.alias('controllers.application.isConnectionLost'),
                location: Ember.computed.alias('controllers.application.location'),

                map: undefined,
                // Поступившие данные
                data: Ember.computed.readOnly('controllers.application.data'),
                // Маркеры, созданные на основе данных
                markers: {},

                /**
                 * Сохраняет текущую позицию, полученую от leaflet.
                 * @param location
                 */
                onLocationFound: function (location) {
                    this.set('location', {
                        lat: location.latitude,
                        lon: location.longitude
                    });
                },
                /**
                 * Устанавливает в качестве позиции координаты центра карты, а если она
                 * не позиционирована (начальное состояние), - дефолтные координаты.
                 */
                onLocationError: function () {
                    var map = this.get('map'),
                        location;
                    try {
                        location = this.get('map').getCenter();
                        this.set('location', { lat: location.lat, lon: location.lng });
                    } catch (e) {
                        map.setView(config.defaultLocation, map.getZoom() || 11);
                        this.set('location', config.defaultLocation);
                    }
                },
                /**
                 * Отрисовывает данные на карте
                 */
                onData: function() {
                    var map = this.get('map'),
                        markers = this.get('markers'),
                        marker,
                        data;

                    if (!map) return;
                    try {
                        data = JSON.parse(this.get('data'));
                    } catch (e) {
                        data = [];
                    }
                    if (markers) {
                        map.removeLayer(markers);
                    }
                    markers = new L.FeatureGroup();
                    data.forEach(function (item) {
                        marker = L.marker(item, {
                            clickable: false,
                            keyboard: false,
                            title: item.id
                        });
                        markers.addLayer(marker);
                    });
                    map.addLayer(markers);
                    this.set('markers', markers);

                }.observes('data')
            });

            return this;
        };
        provide(router);
        return this;
    });
/* end: ../../../blocks/common/app/_router/app_router_map.js */
/* begin: ../../../blocks/common/config/config.js */
modules.define('config', function(provide){
    provide({
        // Интервал времени от завершения до нового старта приложения
        // который не считается разлогиниванием. Считается, что при таком
        // быстром перезапуске пользователь просто обновил страницу.
        refreshTimeout: 5000,

        // Минимальное время от начала инициализации до запуска приложения.
        // В течение этого времени показывается спин. Если выключить его
        // быстрее, возникает мелькание.
        spinMinTime: 2000,

        // Интервал повторения запросов на определение местоположения
        // С каждым определнием происходит отправка координат на сервер
        locationInterval: 20000,

        // Максимальное время ожидания очередного сообщения от сервера.
        heartBitInterval: 10000,

        // Дефолтное местоположение
        defaultLocation: [55.755768, 37.617671],

        // Пути к бандлам
        bundle: {
            ember: '/bundle/_ember.js',
            jquery: '/bundle/_jquery.2.1.1.js',
            websocket: '/bundle/_websocket.js',
            websocketSwf: '/bundle/WebSocketMain.swf',
            leaflet: 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js'
        },

        // Параметры вебсокетов
        websocket: {
            server: "ws://mini-mdt.wheely.com:80",
            timeout: 5000,
            attemptDelay: 1000,
            /**
             * Возвращает url ws-сервера.
             * @param {Object} query Параметры запроса.
             * @returns {String} URL.
             */
            url: function url(query) {
                var sign = ~this.server.indexOf('?') ? '&' : '?';
                query = Object.keys(query).map(function(arg) {
                    return arg + '=' + query[arg]
                }).join('&');
                return [this.server, query].join(sign);
            }
        },

        // Параметры провеки авторизации
        checkAuth: {
            rootPath: '/hit',
            timeout: 1000
        }
    });
});

/* end: ../../../blocks/common/config/config.js */
/* begin: ../../../blocks/development/config/config.js */
modules.define('config', function(provide, config){

    config.env = 'development';

    provide(config);
});

/* end: ../../../blocks/development/config/config.js */
/* begin: ../../../blocks/common/leaflet/leaflet.js */
modules.define('leaflet', ['loader'], function (provide, loader) {

    loader.ready('leaflet', function () {
        /**
         * Инициализирует карту на указанном элементе
         * @param {jQuery} node Дом-нода в jQuery-обертке.
         */
        provide(function (elem) {
            var map;
            if (elem.length) {
                map = L.map(elem[0]);
                L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://toolserver.org">toolserver</a>',
                    maxZoom: 18
                }).addTo(map);
            }
            if (map) {
                return map;
            } else {
                throw new Error();
            }
        });
    });
});

/* end: ../../../blocks/common/leaflet/leaflet.js */


modules.define('hbs', ['jquery', 'ember'], function(provide, $, Ember) {

var init = function () {

Ember.TEMPLATES['application'] = Ember.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<i class=\"icon ui user\"></i>");
  stack1 = helpers['if'].call(depth0, "isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "userName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program4(depth0,data) {
  
  
  data.buffer.push("Login");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("<i class=\"icon ui map\"></i>Map");
  }

  data.buffer.push("<div class=\"grid ui one column page\"><div class=\"grid__row ui row\"><div class=\"menu ui inverted\">");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("ui item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "login", options) : helperMissing.call(depth0, "link-to", "login", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("ui item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "map", options) : helperMissing.call(depth0, "link-to", "map", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<div class=\"menu ui inverted right\"><div class=\"menu__item ui item\"></div></div></div></div>");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>");
  return buffer;
  });

Ember.TEMPLATES['login'] = Ember.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"grid ui page one column\"><div class=\"grid__column ui column center aligned\"><div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":form :form_type_login :ui :segment isLogging:loading isLoggingError:error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("><div class=\"message ui error\"><div class=\"message__header header\">LOG IN TO YOUR ACCOUNT</div><p class=\"para\">");
  stack1 = helpers._triageMustache.call(depth0, "loggingErrorMsg", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p></div><div class=\"field ui\"><label class=\"field__label\">User name</label><div class=\"input ui left icon\">");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'name': ("username"),
    'value': ("_userName"),
    'disabled': ("isLoggedIn"),
    'action': ("connect"),
    'on': ("enter"),
    'maxLength': ("20"),
    'placeholder': ("starts with 'a'")
  },hashTypes:{'name': "STRING",'value': "ID",'disabled': "ID",'action': "STRING",'on': "STRING",'maxLength': "STRING",'placeholder': "STRING"},hashContexts:{'name': depth0,'value': depth0,'disabled': depth0,'action': depth0,'on': depth0,'maxLength': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<i class=\"icon ui user\"></i><div class=\"label ui corner\"><i class=\"icon ui asterisk\"></i></div></div><div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":label :ui :red :pointing :above showUserNameMsg::hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "userNameMsg", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div></div><div class=\"field ui\"><label class=\"field__label\">Password</label><div class=\"input ui left icon\">");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'name': ("password"),
    'value': ("_password"),
    'disabled': ("isLoggedIn"),
    'action': ("connect"),
    'on': ("enter"),
    'type': ("password"),
    'maxLength': ("20"),
    'placeholder': ("starts with 'a'")
  },hashTypes:{'name': "STRING",'value': "ID",'disabled': "ID",'action': "STRING",'on': "STRING",'type': "STRING",'maxLength': "STRING",'placeholder': "STRING"},hashContexts:{'name': depth0,'value': depth0,'disabled': depth0,'action': depth0,'on': depth0,'type': depth0,'maxLength': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<i class=\"icon ui lock\"></i><div class=\"label ui corner\"><i class=\"icon ui asterisk\"></i></div></div><div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":label :ui :hidden :red :pointing :above showPasswordMsg::hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "passwordMsg", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div></div><button role=\"button\" type=\"button\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":button :ui :small :black isLoggedIn:hidden:visible")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "connect", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Connect</button><button role=\"button\" type=\"button\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":button :ui :small :black isLoggedIn:visible:hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "disconnect", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Disconnect</button></div></div></div>");
  return buffer;
  });

Ember.TEMPLATES['map'] = Ember.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"grid__column ui column one\"><div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":message :ui isLoggedIn:hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("><div class=\"message__header header\">YOU MUST BE LOGGED IN</div><p class=\"para\">Please enter your user name and password on the Login page to view the map.</p></div></div><div class=\"leaflet\"><div class=\"leaflet__container\" id=\"map\"></div></div><div class=\"grid__column ui column center aligned\"><div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":message :message_type_abort :ui :error isConnectionLost::hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("><div class=\"message__header header\">CONNECTION IS LOST</div><p class=\"para\">The server is not responding. Trying to reconnect ...</p></div></div>");
  return buffer;
  });

};

provide({ init: init });

});
(function() {
  var $;

  $ = jQuery;

  $.extend(REPLIT, {
    Init: function() {
      var _this = this;
      this.jsrepl = new JSREPL({
        input: $.proxy(this.InputCallback, this),
        output: $.proxy(this.OutputCallback, this),
        result: $.proxy(this.ResultCallback, this),
        error: $.proxy(this.ErrorCallback, this),
        progress: $.proxy(this.OnProgress, this),
        timeout: {
          time: 12000,
          callback: function() {
            var a, code;
            if (a = confirm('The program is taking too long to finish. Do you want to stop it?')) {
              code = _this.editor.getSession().getValue();
              _this.LoadLanguage(_this.current_lang.system_name, function() {
                return _this.editor.getSession().setValue(code);
              });
            }
            return a;
          }
        }
      });
      this.jqconsole = this.$consoleContainer.jqconsole('', '   ', '.. ');
      this.$console = this.$consoleContainer.find('.jqconsole');
      this.$editor = this.$editorContainer.find('#editor-widget');
      if (!this.ISMOBILE) {
        this.editor = ace.edit('editor-widget');
        this.editor.setTheme('ace/theme/textmate');
        this.editor.renderer.setHScrollBarAlwaysVisible(false);
        this.$run.click(function() {
          if (_this.jqconsole.state === 2) {
            _this.jqconsole.AbortPrompt();
            return _this.Evaluate(REPLIT.editor.getSession().getValue());
          }
        });
        this.editor.commands.addCommand({
          name: 'run',
          bindKey: {
            win: 'Ctrl-Return',
            mac: 'Command-Return',
            sebder: 'editor'
          },
          exec: function() {
            _this.$run.click();
            return setTimeout((function() {
              return _this.editor.focus();
            }), 0);
          }
        });
      }
      this.current_lang = null;
      this.current_lang_name = null;
      return this.inited = true;
    },
    LoadLanguage: function(lang_name, callback) {
      var EditSession, UndoManager, ace_mode, ace_mode_ajax, close, index, open, session, textMode, _i, _len, _ref, _ref1,
        _this = this;
      if (callback == null) {
        callback = $.noop;
      }
      this.$this.trigger('language_loading', [lang_name]);
      this.current_lang = this.jsrepl.getLangConfig(lang_name.toLowerCase());
      this.current_lang.system_name = lang_name;
      if (!this.ISMOBILE) {
        EditSession = require("ace/edit_session").EditSession;
        UndoManager = require("ace/undomanager").UndoManager;
        session = new EditSession('');
        session.setUndoManager(new UndoManager);
        ace_mode = this.Languages[lang_name.toLowerCase()].ace_mode;
        if (ace_mode != null) {
          ace_mode_ajax = $.getScript(ace_mode.script, function() {
            var mode;
            mode = require(ace_mode.module).Mode;
            session.setMode(new mode);
            session.setUseWrapMode(true);
            return _this.editor.setSession(session);
          });
        } else {
          ace_mode_ajax = jQuery.Deferred().resolve();
          textMode = require("ace/mode/text").Mode;
          session.setMode(new textMode);
          this.editor.setSession(session);
        }
      }
      this.jqconsole.Reset();
      _ref = this.current_lang.matchings;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        _ref1 = _ref[index], open = _ref1[0], close = _ref1[1];
        this.jqconsole.RegisterMatching(open, close, 'matching-' + index);
      }
      this.jqconsole.RegisterShortcut('Z', function() {
        _this.jqconsole.AbortPrompt();
        return _this.StartPrompt();
      });
      this.jqconsole.RegisterShortcut('L', function() {
        return _this.OpenPage('languages');
      });
      this.jqconsole.RegisterShortcut('G', function() {
        return _this.OpenPage('examples');
      });
      this.jqconsole.RegisterShortcut('H', function() {
        return _this.OpenPage('help');
      });
      this.jqconsole.RegisterShortcut('S', function() {
        return $('#button-save').click();
      });
      this.jqconsole.RegisterShortcut('A', function() {
        return _this.jqconsole.MoveToStart();
      });
      this.jqconsole.RegisterShortcut('E', function() {
        return _this.jqconsole.MoveToEnd();
      });
      return this.jsrepl.loadLanguage(lang_name.toLowerCase(), function() {
        return $.when(ace_mode_ajax).then(function() {
          _this.StartPrompt();
          _this.$this.trigger('language_loaded', [lang_name]);
          _this.jqconsole.Write(_this.Languages[lang_name.toLowerCase()].header + '\n');
          return callback();
        });
      });
    },
    ResultCallback: function(result) {
      if (result) {
        if (result[-1] !== '\n') {
          result = result + '\n';
        }
        this.jqconsole.Write('=> ' + result, 'result');
      }
      this.StartPrompt();
      return this.$this.trigger('result', [result]);
    },
    ErrorCallback: function(error) {
      if (typeof error === 'object') {
        error = error.message;
      }
      if (error[-1] !== '\n') {
        error = error + '\n';
      }
      this.jqconsole.Write(String(error), 'error');
      this.StartPrompt();
      return this.$this.trigger('error', [error]);
    },
    OutputCallback: function(output, cls) {
      if (output) {
        this.jqconsole.Write(output, cls);
        this.$this.trigger('output', [output]);
        return void 0;
      }
    },
    InputCallback: function(callback) {
      var _this = this;
      this.jqconsole.Input(function(result) {
        try {
          callback(result);
          return _this.$this.trigger('input', [result]);
        } catch (e) {
          return _this.ErrorCallback(e);
        }
      });
      this.$this.trigger('input_request', [callback]);
      return void 0;
    },
    Evaluate: function(command) {
      if (command) {
        this.jsrepl["eval"](command);
        return this.$this.trigger('eval', [command]);
      } else {
        return this.StartPrompt();
      }
    },
    StartPrompt: function() {
      return this.jqconsole.Prompt(true, $.proxy(this.Evaluate, this), this.jsrepl.checkLineEnd, true);
    }
  });

  $(function() {
    return REPLIT.Init();
  });

}).call(this);

(function() {
  var $, ANIMATION_DURATION, CONSOLE_HIDDEN, DEFAULT_CONTENT_PADDING, DEFAULT_SPLIT, EDITOR_HIDDEN, FOOTER_HEIGHT, HEADER_HEIGHT, MAX_PROGRESS_DURATION, MIN_PROGRESS_DURATION, PROGRESS_ANIMATION_DURATION, RESIZER_WIDTH, SNAP_THRESHOLD;

  DEFAULT_CONTENT_PADDING = 100;

  FOOTER_HEIGHT = 30;

  HEADER_HEIGHT = 61;

  RESIZER_WIDTH = 8;

  DEFAULT_SPLIT = 0.5;

  CONSOLE_HIDDEN = 1;

  EDITOR_HIDDEN = 0;

  SNAP_THRESHOLD = 0.05;

  ANIMATION_DURATION = 700;

  MIN_PROGRESS_DURATION = 1;

  MAX_PROGRESS_DURATION = 1500;

  PROGRESS_ANIMATION_DURATION = 2000;

  $ = jQuery;

  $.fn.disableSelection = function() {
    return this.each(function() {
      var $this;
      $this = $(this);
      $this.attr('unselectable', 'on');
      $this.css({
        '-moz-user-select': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none'
      });
      return $this.each(function() {
        return this.onselectstart = function() {
          return false;
        };
      });
    });
  };

  $.fn.enableSelection = function() {
    return this.each(function() {
      var $this;
      $this = $(this);
      $this.attr('unselectable', '');
      $this.css({
        '-moz-user-select': '',
        '-webkit-user-select': '',
        'user-select': ''
      });
      return $this.each(function() {
        return this.onselectstart = null;
      });
    });
  };

  $.extend(REPLIT, {
    RESIZER_WIDTH: RESIZER_WIDTH,
    CONSOLE_HIDDEN: CONSOLE_HIDDEN,
    EDITOR_HIDDEN: EDITOR_HIDDEN,
    DEFAULT_CONTENT_PADDING: DEFAULT_CONTENT_PADDING,
    split_ratio: REPLIT.ISMOBILE ? EDITOR_HIDDEN : DEFAULT_SPLIT,
    min_content_width: 500,
    max_content_width: 3000,
    content_padding: DEFAULT_CONTENT_PADDING,
    last_progress_ratio: 0,
    InitDOM: function() {
      var mobile_timer,
        _this = this;
      this.$doc_elem = $('html');
      this.$container = $('#main');
      this.$editorContainer = $('#editor');
      this.$consoleContainer = $('#console');
      this.$resizer = {
        l: $('#resize-left'),
        c: $('#resize-center'),
        r: $('#resize-right')
      };
      this.$progress = $('#progress');
      this.$progressFill = $('#progress-fill');
      this.$unhider = {
        editor: $('#unhide-right'),
        console: $('#unhide-left')
      };
      this.$run = $('#editor-run');
      this.$editorContainer.mouseleave(function() {
        return _this.$run.fadeIn('fast');
      });
      this.$editorContainer.mousemove(function() {
        if (_this.$run.is(':hidden')) {
          return _this.$run.fadeIn('fast');
        }
      });
      this.$editorContainer.keydown(function() {
        return _this.$run.fadeOut('fast');
      });
      this.InitSideResizers();
      this.InitCenterResizer();
      this.InitUnhider();
      this.OnResize();
      mobile_timer = null;
      return $(window).bind('resize', function() {
        var cb;
        if (_this.ISMOBILE) {
          mobile_timer = clearTimeout(mobile_timer);
          cb = function() {
            var width;
            width = document.documentElement.clientWidth;
            REPLIT.min_content_width = width - 2 * RESIZER_WIDTH;
            return _this.OnResize();
          };
          return mobile_timer = setTimeout((function() {
            return _this.OnResize();
          }), 300);
        } else {
          return _this.OnResize();
        }
      });
    },
    InitSideResizers: function() {
      var $body, $elem, resizer_lr_release, _, _ref,
        _this = this;
      $body = $('body');
      _ref = this.$resizer;
      for (_ in _ref) {
        $elem = _ref[_];
        $elem.mousedown(function(e) {
          if (e.button !== 0) {
            return e.stopImmediatePropagation();
          } else {
            return $body.disableSelection();
          }
        });
      }
      this.$resizer.l.mousedown(function(e) {
        return $body.bind('mousemove.side_resizer', function(e) {
          _this.content_padding = (e.pageX - (RESIZER_WIDTH / 2)) * 2;
          if (_this.content_padding / $body.width() < SNAP_THRESHOLD) {
            _this.content_padding = 0;
          }
          return _this.OnResize();
        });
      });
      this.$resizer.r.mousedown(function(e) {
        return $body.bind('mousemove.side_resizer', function(e) {
          _this.content_padding = ($body.width() - e.pageX - (RESIZER_WIDTH / 2)) * 2;
          if (_this.content_padding / $body.width() < SNAP_THRESHOLD) {
            _this.content_padding = 0;
          }
          return _this.OnResize();
        });
      });
      resizer_lr_release = function() {
        $body.enableSelection();
        return $body.unbind('mousemove.side_resizer');
      };
      this.$resizer.l.mouseup(resizer_lr_release);
      this.$resizer.r.mouseup(resizer_lr_release);
      return $body.mouseup(resizer_lr_release);
    },
    InitCenterResizer: function() {
      var resizer_c_release,
        _this = this;
      resizer_c_release = function() {
        _this.$container.enableSelection();
        return _this.$container.unbind('mousemove.center_resizer');
      };
      this.$resizer.c.mousedown(function(e) {
        return _this.$container.bind('mousemove.center_resizer', function(e) {
          var left;
          left = e.pageX - (_this.content_padding / 2) + (RESIZER_WIDTH / 2);
          _this.split_ratio = left / _this.$container.width();
          if (_this.split_ratio > CONSOLE_HIDDEN - SNAP_THRESHOLD) {
            _this.split_ratio = CONSOLE_HIDDEN;
            resizer_c_release();
          } else if (_this.split_ratio < EDITOR_HIDDEN + SNAP_THRESHOLD) {
            _this.split_ratio = EDITOR_HIDDEN;
            resizer_c_release();
          }
          return _this.OnResize();
        });
      });
      this.$resizer.c.mouseup(resizer_c_release);
      this.$container.mouseup(resizer_c_release);
      return this.$container.mouseleave(resizer_c_release);
    },
    InitUnhider: function() {
      var bindUnhiderClick, getUnhider,
        _this = this;
      getUnhider = function() {
        var side, _ref;
        if ((_ref = _this.split_ratio) !== CONSOLE_HIDDEN && _ref !== EDITOR_HIDDEN) {
          return $([]);
        }
        side = _this.split_ratio === CONSOLE_HIDDEN ? 'console' : 'editor';
        return _this.$unhider[side];
      };
      $('body').mousemove(function() {
        var unhider;
        unhider = getUnhider();
        if (unhider.is(':hidden')) {
          return unhider.fadeIn('fast');
        }
      });
      this.$container.keydown(function() {
        var unhider;
        unhider = getUnhider();
        if (unhider.is(':visible')) {
          return unhider.fadeOut('fast');
        }
      });
      bindUnhiderClick = function($elem, $elemtoShow) {
        return $elem.click(function(e) {
          $elem.hide();
          _this.split_ratio = DEFAULT_SPLIT;
          $elemtoShow.show();
          _this.$resizer.c.show();
          return _this.OnResize();
        });
      };
      bindUnhiderClick(this.$unhider.editor, this.$editorContainer);
      return bindUnhiderClick(this.$unhider.console, this.$consoleContainer);
    },
    OnProgress: function(percentage) {
      var duration, fill, ratio;
      ratio = percentage / 100.0;
      if (ratio < this.last_progress_ratio) {
        return;
      }
      duration = (ratio - this.last_progress_ratio) * PROGRESS_ANIMATION_DURATION;
      this.last_progress_ratio = ratio;
      duration = Math.max(duration, MIN_PROGRESS_DURATION);
      duration = Math.min(duration, MAX_PROGRESS_DURATION);
      fill = this.$progressFill;
      return fill.animate({
        width: percentage + '%'
      }, {
        duration: Math.abs(duration),
        easing: 'linear',
        step: function(now, fx) {
          var blue_bottom, blue_top, bottom, green_bottom, green_top, red_bottom, red_top, top;
          ratio = now / 100.0;
          red_top = Math.round(ratio < 0.75 ? 250 : 250 + (199 - 250) * ((ratio - 0.75) / 0.25));
          red_bottom = Math.round(ratio < 0.75 ? 242 : 250 + (136 - 250) * ((ratio - 0.75) / 0.25));
          green_top = Math.round(ratio < 0.25 ? 110 + (181 - 110) * (ratio / 0.25) : 181 + (250 - 181) * ((ratio - 0.25) / 0.75));
          green_bottom = Math.round(34 + (242 - 34) * ratio);
          blue_top = 67;
          blue_bottom = 12;
          top = "rgb(" + red_top + ", " + green_top + ", " + blue_top + ")";
          bottom = "rgb(" + red_bottom + ", " + green_bottom + ", " + blue_bottom + ")";
          if ($.browser.webkit) {
            fill.css({
              'background-image': "url('/images/progress.png'), -webkit-gradient(linear, left top, left bottom, from(" + top + "), to(" + bottom + "))"
            });
          } else if ($.browser.mozilla) {
            fill.css({
              'background-image': "url('/images/progress.png'), -moz-linear-gradient(top, " + top + ", " + bottom + ")"
            });
          } else if ($.browser.opera) {
            fill.css({
              'background-image': "url('/images/progress.png'), -o-linear-gradient(top, " + top + ", " + bottom + ")"
            });
          }
          return fill.css({
            'background-image': "url('/images/progress.png'), linear-gradient(top, " + top + ", " + bottom + ")"
          });
        }
      });
    },
    OnResize: function() {
      var documentHeight, documentWidth, height, innerWidth, width;
      documentWidth = document.documentElement.clientWidth;
      documentHeight = document.documentElement.clientHeight;
      height = documentHeight - HEADER_HEIGHT - FOOTER_HEIGHT;
      width = documentWidth - this.content_padding;
      innerWidth = width - 2 * RESIZER_WIDTH;
      if (innerWidth < this.min_content_width) {
        innerWidth = this.min_content_width;
      } else if (innerWidth > this.max_content_width) {
        innerWidth = this.max_content_width;
      }
      width = innerWidth + 2 * RESIZER_WIDTH;
      this.$container.css({
        width: width
      });
      if (this.ISMOBILE && !$('.page:visible').is('#content-workspace')) {
        this.$container.css('height', 'auto');
      } else {
        this.$container.css('height', height);
      }
      $('.page:visible').css({
        width: innerWidth
      });
      if ($('.page:visible').is('#content-workspace')) {
        return this.ResizeWorkspace(innerWidth, height);
      }
    },
    ResizeWorkspace: function(innerWidth, height) {
      var console_hpadding, console_vpadding, console_width, editor_hpadding, editor_vpadding, editor_width, _ref;
      editor_width = Math.floor(this.split_ratio * innerWidth);
      console_width = innerWidth - editor_width;
      if ((_ref = this.split_ratio) !== CONSOLE_HIDDEN && _ref !== EDITOR_HIDDEN) {
        editor_width -= RESIZER_WIDTH / 2;
        console_width -= RESIZER_WIDTH / 2;
      }
      this.$resizer.c.css({
        left: editor_width
      });
      this.$editorContainer.css({
        width: editor_width,
        height: height
      });
      this.$consoleContainer.css({
        width: console_width,
        height: height
      });
      if (this.split_ratio === CONSOLE_HIDDEN) {
        this.$consoleContainer.hide();
        this.$resizer.c.hide();
        this.$unhider.console.show();
      } else if (this.split_ratio === EDITOR_HIDDEN) {
        this.$editorContainer.hide();
        this.$resizer.c.hide();
        this.$unhider.editor.show();
      }
      console_hpadding = this.$console.innerWidth() - this.$console.width();
      console_vpadding = this.$console.innerHeight() - this.$console.height();
      editor_hpadding = this.$editor.innerWidth() - this.$editor.width();
      editor_vpadding = this.$editor.innerHeight() - this.$editor.height();
      this.$console.css('width', this.$consoleContainer.width() - console_hpadding);
      this.$console.css('height', this.$consoleContainer.height() - console_vpadding);
      this.$editor.css('width', this.$editorContainer.innerWidth() - editor_hpadding);
      this.$editor.css('height', this.$editorContainer.innerHeight() - editor_vpadding);
      if (!this.ISMOBILE) {
        return this.editor.resize();
      }
    }
  });

  $(function() {
    var check_orientation;
    if (REPLIT.ISIOS) {
      $('html, body').css('overflow', 'hidden');
    }
    REPLIT.$this.bind('language_loading', function(_, system_name) {
      var $about, $engine, $links, lang;
      REPLIT.$progress.animate({
        opacity: 1
      }, 'fast');
      REPLIT.$progressFill.css({
        width: 0
      });
      REPLIT.last_progress_ratio = 0;
      lang = REPLIT.Languages[system_name.toLowerCase()];
      $about = $('#language-about-link');
      $engine = $('#language-engine-link');
      $links = $('#language-engine-link, #language-about-link');
      return $links.animate({
        opacity: 0
      }, 'fast', function() {
        $about.text('about ' + system_name.toLowerCase());
        $about.attr({
          href: lang.about_link
        });
        $engine.text(system_name.toLowerCase() + ' engine');
        $engine.attr({
          href: lang.engine_link
        });
        return $links.animate({
          opacity: 1
        }, 'fast');
      });
    });
    REPLIT.$this.bind('language_loaded', function() {
      REPLIT.OnProgress(100);
      return REPLIT.$progress.animate({
        opacity: 0
      }, 'fast');
    });
    check_orientation = function() {
      var cb;
      cb = function() {
        var width;
        width = document.documentElement.clientWidth;
        REPLIT.min_content_width = width - 2 * RESIZER_WIDTH;
        REPLIT.OnResize();
        return $(window).scrollLeft(0);
      };
      return setTimeout(cb, 300);
    };
    $(window).bind('orientationchange', check_orientation);
    if (REPLIT.ISMOBILE) {
      check_orientation();
    }
    REPLIT.InitDOM();
  });

}).call(this);

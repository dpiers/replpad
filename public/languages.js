replit_languages = {
    qbasic: {
      name: 'QBasic',
      tagline: 'Structured programming for beginners.',
      shortcut: 'Q',
      about_link: 'http://en.wikipedia.org/wiki/QBasic',
      engine_link: 'https://github.com/replit/jsrepl/tree/master/extern/qb.js',
      examples: {
        editor: '/langs/qbasic/examples-editor.html',
        console: '/langs/qbasic/examples-console.html'
      },
      header: 'QBasic (qb.js)\nCopyright (c) 2010 Steve Hanov'
    },
    forth: {
      name: 'Forth',
      tagline: 'An interactive stack-oriented language.',
      shortcut: 'h',
      about_link: 'http://en.wikipedia.org/wiki/Forth_(programming_language)',
      engine_link: 'https://github.com/replit/jsrepl/blob/master/extern/jsforth/jsforth.js',
      examples: {
        editor: '/langs/forth/examples-editor.html',
        console: '/langs/forth/examples-console.html'
      },
      header: 'JS-Forth 0.5200804171342\nhttp://www.forthfreak.net/jsforth.html\nThis program is published under the GPL.'
    },
    lolcode: {
      name: 'LOLCODE',
      tagline: 'The basic language of lolcats.',
      shortcut: 'O',
      about_link: 'http://lolcode.com/specs/1.2',
      engine_link: 'https://github.com/replit/lol-coffee',
      examples: {
        editor: '/langs/lolcode/examples-editor.html',
        console: '/langs/lolcode/examples-console.html'
      },
      header: 'LOLCODE v1.2 (lol-coffee)\nCopyright (c) 2011 Max Shawabkeh'
    },
    brainfuck: {
      name: 'Brainfuck',
      tagline: 'A pure Turing machine controller.',
      shortcut: 'f',
      about_link: 'http://en.wikipedia.org/wiki/Brainfuck',
      engine_link: 'https://github.com/replit/bfjs',
      examples: {
        editor: '/langs/brainfuck/examples-editor.html',
        console: '/langs/brainfuck/examples-console.html'
      },
      header: 'Brainfuck, bfjs\nCopyright (c) 2011 Amjad Masad'
    },
    emoticon: {
      name: 'Emoticon',
      tagline: 'Programming with an extra dose of smile.',
      shortcut: 'E',
      about_link: 'http://www.teuton.org/~stranger/code/emoticon/manual.php',
      engine_link: 'https://github.com/replit/emoticoffee',
      examples: {
        editor: '/langs/emoticon/examples-editor.html',
        console: '/langs/emoticon/examples-console.html'
      },
      header: 'Emoticon v1.5 (emoticoffee)\nCopyright (c) 2011 Amjad Masad'
    },
    bloop: {
      name: 'Bloop',
      tagline: 'Nothing but bounded loops.',
      shortcut: 'B',
      about_link: 'http://en.wikipedia.org/wiki/BlooP_and_FlooP',
      engine_link: 'https://github.com/replit/jsrepl/blob/master/extern/bloop/bloop.js',
      examples: {
        editor: '/langs/bloop/examples-editor.html',
        console: '/langs/bloop/examples-console.html'
      },
      header: 'BlooPjs\nCopyright (c) 2005 Tim Cameron Ryan\nBased on Perl code by John Cowan, 1994'
    },
    unlambda: {
      name: 'Unlambda',
      tagline: 'Functional purity given form.',
      shortcut: 'U',
      about_link: 'http://en.wikipedia.org/wiki/Unlambda',
      engine_link: 'https://github.com/replit/unlambda-coffee',
      examples: {
        editor: '/langs/unlambda/examples-editor.html',
        console: '/langs/unlambda/examples-console.html'
      },
      header: 'Unlambda v2.0 (unlambda-coffee)\nCopyright (c) 2011 Max Shawabkeh'
    },
    javascript: {
      name: 'JavaScript',
      tagline: 'The de facto language of the Web.',
      shortcut: 'J',
      about_link: 'http://en.wikipedia.org/wiki/Javascript',
      engine_link: 'http://en.wikipedia.org/wiki/JavaScript_engine#JavaScript_engines',
      examples: {
        editor: '/langs/javascript/examples-editor.html',
        console: '/langs/javascript/examples-console.html'
      },
      ace_mode: {
        script: '/lib/ace/mode-javascript.js',
        module: 'ace/mode/javascript'
      },
      header: "Native " + ($.browser.webkit ? navigator.userAgent.match(/Android/) ? 'Android' : navigator.userAgent.match(/Chrome/) ? 'Chrome' : 'WebKit' : $.browser.opera ? 'Opera' : $.browser.msie ? 'Internet Explorer' : $.browser.mozilla ? 'Mozilla Firefox' : 'Browser') + " JavaScript.\nCopyright (c) 2011 " + ((typeof navigator !== "undefined" && navigator !== null ? (_ref = navigator.vendor) != null ? _ref.replace(/\.$/, '') : void 0 : void 0) || ($.browser.webkit ? 'Apple Inc' : $.browser.opera ? 'Opera Software ASA' : $.browser.msie ? 'Microsoft' : $.browser.mozilla ? 'Mozilla Foundation' : 'Browser Vendor'))
    },
    traceur: {
      name: 'Javascript.next',
      tagline: 'The JavaScript of tomorrow.',
      shortcut: 'n',
      about_link: 'http://wiki.ecmascript.org/doku.php?id=harmony:harmony',
      engine_link: 'http://code.google.com/p/traceur-compiler/',
      examples: {
        editor: '/langs/traceur/examples-editor.html',
        console: '/langs/traceur/examples-console.html'
      },
      header: 'Traceur Compiler v0.10\nCopyright (c) 2011 Google Inc.'
    },
    coffeescript: {
      name: 'CoffeeScript',
      tagline: 'Unfancy JavaScript.',
      shortcut: 'C',
      about_link: 'http://jashkenas.github.com/coffee-script/',
      engine_link: 'https://github.com/jashkenas/coffee-script/',
      examples: {
        editor: '/langs/coffee-script/examples-editor.html',
        console: '/langs/coffee-script/examples-console.html'
      },
      ace_mode: {
        script: '/lib/ace/mode-coffee.js',
        module: 'ace/mode/coffee'
      },
      header: 'CoffeeScript v1.3.1\nCopyright (c) 2011, Jeremy Ashkenas'
    },
    kaffeine: {
      name: 'Kaffeine',
      tagline: 'Extended JavaScript for pros.',
      shortcut: 'K',
      about_link: 'http://weepy.github.com/kaffeine/',
      engine_link: 'https://github.com/weepy/kaffeine',
      examples: {
        editor: '/langs/kaffeine/examples-editor.html',
        console: '/langs/kaffeine/examples-console.html'
      },
      header: '| |/ /__ _ / _|/ _|___(_)_ _  ___\n| \' </ _` |  _|  _/ -_) | \' \\/ -_)\n|_|\\_\\__,_|_| |_| \\___|_|_||_\\___|\nVersion 0.0.4, Copyright (c) 2010 Jonah Fox'
    },
    move: {
      name: 'Move',
      tagline: 'The easy way to program the web.',
      shortcut: 'M',
      about_link: 'http://movelang.org/',
      engine_link: 'https://github.com/rsms/move',
      examples: {
        editor: '/langs/move/examples-editor.html',
        console: '/langs/move/examples-console.html'
      },
      header: 'Move v0.4.3\nCopyright (c) 2011 Rasmus Andersson'
    },
    scheme: {
      name: 'Scheme',
      tagline: 'An elegant dynamic dialect of Lisp.',
      shortcut: 'S',
      about_link: 'http://en.wikipedia.org/wiki/Scheme_(programming_language)',
      engine_link: 'https://github.com/yhara/biwascheme',
      examples: {
        editor: '/langs/scheme/examples-editor.html',
        console: '/langs/scheme/examples-console.html'
      },
      ace_mode: {
        script: '/lib/ace/mode-scheme.js',
        module: 'ace/mode/scheme'
      },
      header: 'BiwaScheme Interpreter version 0.5.7\nCopyright (C) 2007-2010 Yutaka HARA and the BiwaScheme team'
    },
    lua: {
      name: 'Lua',
      tagline: 'A lightweight multi-paradigm scripting language.',
      shortcut: 'L',
      about_link: 'http://en.wikipedia.org/wiki/Lua_(programming_language)',
      engine_link: 'https://github.com/replit/jsrepl/tree/master/extern/lua',
      examples: {
        editor: '/langs/lua/examples-editor.html',
        console: '/langs/lua/examples-console.html'
      },
      ace_mode: {
        script: '/lib/ace/mode-lua.js',
        module: 'ace/mode/lua'
      },
      header: 'Lua 5.1  Copyright (C) 1994-2006 Lua.org, PUC-Rio\n[GCC 4.2.1 (LLVM, Emscripten 1.5)] on linux2'
    },
    python: {
      name: 'Python',
      tagline: 'A dynamic language emphasizing readability.',
      shortcut: 'P',
      about_link: 'http://en.wikipedia.org/wiki/Python_(programming_language)',
      engine_link: 'https://github.com/replit/empythoned',
      examples: {
        editor: '/langs/python/examples-editor.html',
        console: '/langs/python/examples-console.html'
      },
      ace_mode: {
        script: '/lib/ace/mode-python.js',
        module: 'ace/mode/python'
      },
      header: 'Python 2.7.2 (default, Jul 20 2011, 02:32:18)\n[GCC 4.2.1 (LLVM, Emscripten 1.5, Empythoned)] on linux2'
    },
    ruby: {
      name: 'Ruby (beta)',
      tagline: 'A natural dynamic object-oriented language.',
      shortcut: 'R',
      about_link: 'http://en.wikipedia.org/wiki/Ruby_(programming_language)',
      engine_link: 'https://github.com/replit/emscripted-ruby',
      examples: {
        editor: '/langs/ruby/examples-editor.html',
        console: '/langs/ruby/examples-console.html'
      },
      ace_mode: {
        script: '/lib/ace/mode-ruby.js',
        module: 'ace/mode/ruby'
      },
      header: 'Ruby 1.8.7 (2008-05-31 patchlevel 0) [x86-linux]\n[GCC 4.2.1 (LLVM, Emscripten 1.5, Emscripted-Ruby)]'
    },
    roy: {
      name: 'Roy',
      tagline: 'Small functional language that compiles to JavaScript.',
      shortcut: 'y',
      about_link: 'http://roy.brianmckenna.org/',
      engine_link: 'https://github.com/pufuwozu/roy',
      examples: {
        editor: '/langs/roy/examples-editor.html',
        console: '/langs/roy/examples-console.html'
      },
      header: 'Roy 0.1.3\nCopyright (C) 2011 Brian McKenna'
    }
};
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(o){"object"==typeof exports&&"object"==typeof module?o(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],o):o(CodeMirror)}(function(o){"use strict";o.registerHelper("lint","yaml",function(e){var r=[];if(!window.jsyaml)return window.console&&window.console.error("Error: window.jsyaml not defined, CodeMirror YAML linting cannot run."),r;try{jsyaml.loadAll(e)}catch(l){var n=l.mark,i=n?o.Pos(n.line,n.column):o.Pos(0,0),t=i;r.push({from:i,to:t,message:l.message})}return r})});
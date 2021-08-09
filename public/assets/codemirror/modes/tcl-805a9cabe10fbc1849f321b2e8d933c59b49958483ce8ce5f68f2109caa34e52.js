// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("tcl",function(){function e(e){for(var r={},t=e.split(" "),n=0;n<t.length;++n)r[t[n]]=!0;return r}function r(e,r,t){return r.tokenize=t,t(e,r)}function t(e,t){var c=t.beforeParams;t.beforeParams=!1;var u=e.next();if('"'!=u&&"'"!=u||!t.inParams){if(/[\[\]{}\(\),;\.]/.test(u))return"("==u&&c?t.inParams=!0:")"==u&&(t.inParams=!1),null;if(/\d/.test(u))return e.eatWhile(/[\w\.]/),"number";if("#"==u)return e.eat("*")?r(e,t,o):"#"==u&&e.match(/ *\[ *\[/)?r(e,t,a):(e.skipToEnd(),"comment");if('"'==u)return e.skipTo(/"/),"comment";if("$"==u)return e.eatWhile(/[$_a-z0-9A-Z\.{:]/),e.eatWhile(/}/),t.beforeParams=!0,"builtin";if(l.test(u))return e.eatWhile(l),"comment";e.eatWhile(/[\w\$_{}\xa1-\uffff]/);var s=e.current().toLowerCase();return i&&i.propertyIsEnumerable(s)?"keyword":f&&f.propertyIsEnumerable(s)?(t.beforeParams=!0,"keyword"):null}return r(e,t,n(u))}function n(e){return function(r,n){for(var o,a=!1,i=!1;null!=(o=r.next());){if(o==e&&!a){i=!0;break}a=!a&&"\\"==o}return i&&(n.tokenize=t),"string"}}function o(e,r){for(var n,o=!1;n=e.next();){if("#"==n&&o){r.tokenize=t;break}o="*"==n}return"comment"}function a(e,r){for(var n,o=0;n=e.next();){if("#"==n&&2==o){r.tokenize=t;break}"]"==n?o++:" "!=n&&(o=0)}return"meta"}var i=e("Tcl safe after append array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd close concat continue dde eof encoding error eval exec exit expr fblocked fconfigure fcopy file fileevent filename filename flush for foreach format gets glob global history http if incr info interp join lappend lindex linsert list llength load lrange lreplace lsearch lset lsort memory msgcat namespace open package parray pid pkg::create pkg_mkIndex proc puts pwd re_syntax read regex regexp registry regsub rename resource return scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_wordBreakAfter tcl_startOfPreviousWord tcl_wordBreakBefore tcltest tclvars tell time trace unknown unset update uplevel upvar variable vwait"),f=e("if elseif else and not or eq ne in ni for foreach while switch"),l=/[+\-*&%=<>!?^\/\|]/;return{startState:function(){return{tokenize:t,beforeParams:!1,inParams:!1}},token:function(e,r){return e.eatSpace()?null:r.tokenize(e,r)}}}),e.defineMIME("text/x-tcl","tcl")});
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("pascal",function(){function e(e){for(var r={},t=e.split(" "),n=0;n<t.length;++n)r[t[n]]=!0;return r}function r(e,r){var c=e.next();if("#"==c&&r.startOfLine)return e.skipToEnd(),"meta";if('"'==c||"'"==c)return r.tokenize=t(c),r.tokenize(e,r);if("("==c&&e.eat("*"))return r.tokenize=n,n(e,r);if("{"==c)return r.tokenize=i,i(e,r);if(/[\[\]\(\),;\:\.]/.test(c))return null;if(/\d/.test(c))return e.eatWhile(/[\w\.]/),"number";if("/"==c&&e.eat("/"))return e.skipToEnd(),"comment";if(l.test(c))return e.eatWhile(l),"operator";e.eatWhile(/[\w\$_]/);var u=e.current();return a.propertyIsEnumerable(u)?"keyword":o.propertyIsEnumerable(u)?"atom":"variable"}function t(e){return function(r,t){for(var n,i=!1,a=!1;null!=(n=r.next());){if(n==e&&!i){a=!0;break}i=!i&&"\\"==n}return!a&&i||(t.tokenize=null),"string"}}function n(e,r){for(var t,n=!1;t=e.next();){if(")"==t&&n){r.tokenize=null;break}n="*"==t}return"comment"}function i(e,r){for(var t;t=e.next();)if("}"==t){r.tokenize=null;break}return"comment"}var a=e("absolute and array asm begin case const constructor destructor div do downto else end file for function goto if implementation in inherited inline interface label mod nil not object of operator or packed procedure program record reintroduce repeat self set shl shr string then to type unit until uses var while with xor as class dispinterface except exports finalization finally initialization inline is library on out packed property raise resourcestring threadvar try absolute abstract alias assembler bitpacked break cdecl continue cppdecl cvar default deprecated dynamic enumerator experimental export external far far16 forward generic helper implements index interrupt iocheck local message name near nodefault noreturn nostackframe oldfpccall otherwise overload override pascal platform private protected public published read register reintroduce result safecall saveregisters softfloat specialize static stdcall stored strict unaligned unimplemented varargs virtual write"),o={"null":!0},l=/[+\-*&%=<>!?|\/]/;return{startState:function(){return{tokenize:null}},token:function(e,t){if(e.eatSpace())return null;var n=(t.tokenize||r)(e,t);return n},electricChars:"{}"}}),e.defineMIME("text/x-pascal","pascal")});
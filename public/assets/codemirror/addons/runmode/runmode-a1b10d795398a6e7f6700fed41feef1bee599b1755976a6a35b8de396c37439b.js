// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.runMode=function(t,n,r,o){var a=e.getMode(e.defaults,n),d=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||document.documentMode<9);if(r.appendChild){var i=o&&o.tabSize||e.defaults.tabSize,c=r,l=0;c.innerHTML="",r=function(e,t){if("\n"==e)return c.appendChild(document.createTextNode(d?"\r":e)),void(l=0);for(var n="",r=0;;){var o=e.indexOf("\t",r);if(-1==o){n+=e.slice(r),l+=e.length-r;break}l+=o-r,n+=e.slice(r,o);var a=i-l%i;l+=a;for(var u=0;u<a;++u)n+=" ";r=o+1}if(t){var f=c.appendChild(document.createElement("span"));f.className="cm-"+t.replace(/ +/g," cm-"),f.appendChild(document.createTextNode(n))}else c.appendChild(document.createTextNode(n))}}for(var u=e.splitLines(t),f=o&&o.state||e.startState(a),s=0,p=u.length;s<p;++s){s&&r("\n");var m=new e.StringStream(u[s]);for(!m.string&&a.blankLine&&a.blankLine(f);!m.eol();){var v=a.token(m,f);r(m.current(),v,s,m.start,f),m.start=m.pos}}}});
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),"cjs"):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],function(o){e(o,"amd")}):e(CodeMirror,"plain")}(function(e,o){function r(e,o){var r=o;return function(){0==--r&&e()}}function n(o,n,t){var i=e.modes[o],d=i&&i.dependencies;if(!d)return n();for(var a=[],f=0;f<d.length;++f)e.modes.hasOwnProperty(d[f])||a.push(d[f]);if(!a.length)return n();var u=r(n,a.length);for(f=0;f<a.length;++f)e.requireMode(a[f],u,t)}e.modeURL||(e.modeURL="../mode/%N/%N.js");var t={};e.requireMode=function(r,i,d){if("string"!=typeof r&&(r=r.name),e.modes.hasOwnProperty(r))return n(r,i,d);if(t.hasOwnProperty(r))return t[r].push(i);var a=d&&d.path?d.path(r):e.modeURL.replace(/%N/g,r);if(d&&d.loadMode)d.loadMode(a,function(){n(r,i,d)});else if("plain"==o){var f=document.createElement("script");f.src=a;var u=document.getElementsByTagName("script")[0],c=t[r]=[i];e.on(f,"load",function(){n(r,function(){for(var e=0;e<c.length;++e)c[e]()},d)}),u.parentNode.insertBefore(f,u)}else"cjs"==o?(require(a),i()):"amd"==o&&requirejs([a],i)},e.autoLoadMode=function(o,r,n){e.modes.hasOwnProperty(r)||e.requireMode(r,function(){o.setOption("mode",o.getOption("mode"))},n)}});
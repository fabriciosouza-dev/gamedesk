// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(n){"object"==typeof exports&&"object"==typeof module?n(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],n):n(CodeMirror)}(function(n){"use strict";function e(e,t,i,f){function l(n){var o=d(e,t);if(!o||o.to.line-o.from.line<u)return null;if("fold"===f)return o;for(var r=e.findMarksAt(o.from),i=0;i<r.length;++i)if(r[i].__isFold){if(!n)return null;o.cleared=!0,r[i].clear()}return o}if(i&&i.call){var d=i;i=null}else d=r(e,i,"rangeFinder");"number"==typeof t&&(t=n.Pos(t,0));var u=r(e,i,"minFoldSize"),a=l(!0);if(r(e,i,"scanUp"))for(;!a&&t.line>e.firstLine();)t=n.Pos(t.line-1,0),a=l(!1);if(a&&!a.cleared&&"unfold"!==f){var c=o(e,i,a);n.on(c,"mousedown",function(e){s.clear(),n.e_preventDefault(e)});var s=e.markText(a.from,a.to,{replacedWith:c,clearOnEnter:r(e,i,"clearOnEnter"),__isFold:!0});s.on("clear",function(o,r){n.signal(e,"unfold",e,o,r)}),n.signal(e,"fold",e,a.from,a.to)}}function o(n,e,o){var t=r(n,e,"widget");if("function"==typeof t&&(t=t(o.from,o.to)),"string"==typeof t){var i=document.createTextNode(t);(t=document.createElement("span")).appendChild(i),t.className="CodeMirror-foldmarker"}else t&&(t=t.cloneNode(!0));return t}function r(n,e,o){if(e&&e[o]!==undefined)return e[o];var r=n.options.foldOptions;return r&&r[o]!==undefined?r[o]:t[o]}n.newFoldFunction=function(n,o){return function(r,t){e(r,t,{rangeFinder:n,widget:o})}},n.defineExtension("foldCode",function(n,o,r){e(this,n,o,r)}),n.defineExtension("isFolded",function(n){for(var e=this.findMarksAt(n),o=0;o<e.length;++o)if(e[o].__isFold)return!0}),n.commands.toggleFold=function(n){n.foldCode(n.getCursor())},n.commands.fold=function(n){n.foldCode(n.getCursor(),null,"fold")},n.commands.unfold=function(n){n.foldCode(n.getCursor(),{scanUp:!1},"unfold")},n.commands.foldAll=function(e){e.operation(function(){for(var o=e.firstLine(),r=e.lastLine();o<=r;o++)e.foldCode(n.Pos(o,0),{scanUp:!1},"fold")})},n.commands.unfoldAll=function(e){e.operation(function(){for(var o=e.firstLine(),r=e.lastLine();o<=r;o++)e.foldCode(n.Pos(o,0),{scanUp:!1},"unfold")})},n.registerHelper("fold","combine",function(){var n=Array.prototype.slice.call(arguments,0);return function(e,o){for(var r=0;r<n.length;++r){var t=n[r](e,o);if(t)return t}}}),n.registerHelper("fold","auto",function(n,e){for(var o=n.getHelpers(e,"fold"),r=0;r<o.length;r++){var t=o[r](n,e);if(t)return t}});var t={rangeFinder:n.fold.auto,widget:"\u2194",minFoldSize:0,scanUp:!1,clearOnEnter:!0};n.defineOption("foldOptions",null),n.defineExtension("foldOption",function(n,e){return r(this,n,e)})});
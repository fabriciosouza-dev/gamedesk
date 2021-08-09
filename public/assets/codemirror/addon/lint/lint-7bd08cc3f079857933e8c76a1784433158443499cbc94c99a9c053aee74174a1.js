// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";function e(e,n,o){function i(e){if(!r.parentNode)return t.off(document,"mousemove",i);r.style.top=Math.max(0,e.clientY-r.offsetHeight-5)+"px",r.style.left=e.clientX+5+"px"}var r=document.createElement("div");return r.className="CodeMirror-lint-tooltip cm-s-"+e.options.theme,r.appendChild(o.cloneNode(!0)),e.state.lint.options.selfContain?e.getWrapperElement().appendChild(r):document.body.appendChild(r),t.on(document,"mousemove",i),i(n),null!=r.style.opacity&&(r.style.opacity=1),r}function n(t){t.parentNode&&t.parentNode.removeChild(t)}function o(t){t.parentNode&&(null==t.style.opacity&&n(t),t.style.opacity=0,setTimeout(function(){n(t)},600))}function i(n,i,r,a){function s(){t.off(a,"mouseout",s),l&&(o(l),l=null)}var l=e(n,i,r),u=setInterval(function(){if(l)for(var t=a;;t=t.parentNode){if(t&&11==t.nodeType&&(t=t.host),t==document.body)return;if(!t){s();break}}if(!l)return clearInterval(u)},400);t.on(a,"mouseout",s)}function r(t,e,n){this.marked=[],e instanceof Function&&(e={getAnnotations:e}),e&&!0!==e||(e={}),this.options={},this.linterOptions=e.options||{};for(var o in M)this.options[o]=M[o];for(var o in e)M.hasOwnProperty(o)?null!=e[o]&&(this.options[o]=e[o]):e.options||(this.linterOptions[o]=e[o]);this.timeout=null,this.hasGutter=n,this.onMouseOver=function(e){v(t,e)},this.waitingFor=0}function a(t){var e=t.state.lint;e.hasGutter&&t.clearGutter(C),e.options.highlightLines&&s(t);for(var n=0;n<e.marked.length;++n)e.marked[n].clear();e.marked.length=0}function s(t){t.eachLine(function(e){var n=e.wrapClass&&/\bCodeMirror-lint-line-\w+\b/.exec(e.wrapClass);n&&t.removeLineClass(e,"wrap",n[0])})}function l(e,n,o,r,a){var s=document.createElement("div"),l=s;return s.className="CodeMirror-lint-marker CodeMirror-lint-marker-"+o,r&&((l=s.appendChild(document.createElement("div"))).className="CodeMirror-lint-marker CodeMirror-lint-marker-multiple"),0!=a&&t.on(l,"mouseover",function(t){i(e,t,n,l)}),s}function u(t,e){return"error"==t?t:e}function f(t){for(var e=[],n=0;n<t.length;++n){var o=t[n],i=o.from.line;(e[i]||(e[i]=[])).push(o)}return e}function c(t){var e=t.severity;e||(e="error");var n=document.createElement("div");return n.className="CodeMirror-lint-message CodeMirror-lint-message-"+e,"undefined"!=typeof t.messageHTML?n.innerHTML=t.messageHTML:n.appendChild(document.createTextNode(t.message)),n}function m(e,n){function o(){r=-1,e.off("change",o)}var i=e.state.lint,r=++i.waitingFor;e.on("change",o),n(e.getValue(),function(n,a){e.off("change",o),i.waitingFor==r&&(a&&n instanceof t&&(n=a),e.operation(function(){d(e,n)}))},i.linterOptions,e)}function p(e){var n=e.state.lint;if(n){var o=n.options,i=o.getAnnotations||e.getHelper(t.Pos(0,0),"lint");if(i)if(o.async||i.async)m(e,i);else{var r=i(e.getValue(),n.linterOptions,e);if(!r)return;r.then?r.then(function(t){e.operation(function(){d(e,t)})}):e.operation(function(){d(e,r)})}}}function d(t,e){var n=t.state.lint;if(n){var o=n.options;a(t);for(var i=f(e),r=0;r<i.length;++r){var s=i[r];if(s){var m=[];s=s.filter(function(t){return!(m.indexOf(t.message)>-1)&&m.push(t.message)});for(var p=null,d=n.hasGutter&&document.createDocumentFragment(),h=0;h<s.length;++h){var g=s[h],v=g.severity;v||(v="error"),p=u(p,v),o.formatAnnotation&&(g=o.formatAnnotation(g)),n.hasGutter&&d.appendChild(c(g)),g.to&&n.marked.push(t.markText(g.from,g.to,{className:"CodeMirror-lint-mark CodeMirror-lint-mark-"+v,__annotation:g}))}n.hasGutter&&t.setGutterMarker(r,C,l(t,d,p,i[r].length>1,o.tooltips)),o.highlightLines&&t.addLineClass(r,"wrap",y+p)}}o.onUpdateLinting&&o.onUpdateLinting(e,i,t)}}function h(t){var e=t.state.lint;e&&(clearTimeout(e.timeout),e.timeout=setTimeout(function(){p(t)},e.options.delay))}function g(t,e,n){for(var o=n.target||n.srcElement,r=document.createDocumentFragment(),a=0;a<e.length;a++){var s=e[a];r.appendChild(c(s))}i(t,n,r,o)}function v(t,e){var n=e.target||e.srcElement;if(/\bCodeMirror-lint-mark-/.test(n.className)){for(var o=n.getBoundingClientRect(),i=(o.left+o.right)/2,r=(o.top+o.bottom)/2,a=t.findMarksAt(t.coordsChar({left:i,top:r},"client")),s=[],l=0;l<a.length;++l){var u=a[l].__annotation;u&&s.push(u)}s.length&&g(t,s,e)}}var C="CodeMirror-lint-markers",y="CodeMirror-lint-line-",M={highlightLines:!1,tooltips:!0,delay:500,lintOnChange:!0,getAnnotations:null,async:!1,selfContain:null,formatAnnotation:null,onUpdateLinting:null};t.defineOption("lint",!1,function(e,n,o){if(o&&o!=t.Init&&(a(e),!1!==e.state.lint.options.lintOnChange&&e.off("change",h),t.off(e.getWrapperElement(),"mouseover",e.state.lint.onMouseOver),clearTimeout(e.state.lint.timeout),delete e.state.lint),n){for(var i=e.getOption("gutters"),s=!1,l=0;l<i.length;++l)i[l]==C&&(s=!0);var u=e.state.lint=new r(e,n,s);u.options.lintOnChange&&e.on("change",h),0!=u.options.tooltips&&"gutter"!=u.options.tooltips&&t.on(e.getWrapperElement(),"mouseover",u.onMouseOver),p(e)}}),t.defineExtension("performLint",function(){p(this)})});
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","diff_match_patch"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t){this.mv=e,this.type=t,this.classes="left"==t?{chunk:"CodeMirror-merge-l-chunk",start:"CodeMirror-merge-l-chunk-start",end:"CodeMirror-merge-l-chunk-end",insert:"CodeMirror-merge-l-inserted",del:"CodeMirror-merge-l-deleted",connect:"CodeMirror-merge-l-connect"}:{chunk:"CodeMirror-merge-r-chunk",start:"CodeMirror-merge-r-chunk-start",end:"CodeMirror-merge-r-chunk-end",insert:"CodeMirror-merge-r-inserted",del:"CodeMirror-merge-r-deleted",connect:"CodeMirror-merge-r-connect"}}function i(t){t.diffOutOfDate&&(t.diff=S(t.orig.getValue(),t.edit.getValue(),t.mv.options.ignoreWhitespace),t.chunks=M(t.diff),t.diffOutOfDate=!1,e.signal(t.edit,"updateDiff",t.diff))}function r(t){function r(e){J=!0,m=!1,"full"==e&&(t.svg&&N(t.svg),t.copyButtons&&N(t.copyButtons),c(t.edit,g.marked,t.classes),c(t.orig,u.marked,t.classes),g.from=g.to=u.from=u.to=0),i(t),t.showDifferences&&(h(t.edit,t.diff,g,DIFF_INSERT,t.classes),h(t.orig,t.diff,u,DIFF_DELETE,t.classes)),"align"==t.mv.options.connect&&k(t),d(t),null!=t.needsScrollSync&&o(t,t.needsScrollSync),J=!1}function n(e){J||(t.dealigned=!0,l(e))}function l(e){J||m||(clearTimeout(f),!0===e&&(m=!0),f=setTimeout(r,!0===e?20:250))}function a(e,i){t.diffOutOfDate||(t.diffOutOfDate=!0,g.from=g.to=u.from=u.to=0),n(i.text.length-1!=i.to.line-i.from.line)}function s(){t.diffOutOfDate=!0,t.dealigned=!0,r("full")}var f,g={from:0,to:0,marked:[]},u={from:0,to:0,marked:[]},m=!1;return t.edit.on("change",a),t.orig.on("change",a),t.edit.on("swapDoc",s),t.orig.on("swapDoc",s),"align"==t.mv.options.connect&&(e.on(t.edit.state.trackAlignable,"realign",n),e.on(t.orig.state.trackAlignable,"realign",n)),t.edit.on("viewportChange",function(){l(!1)}),t.orig.on("viewportChange",function(){l(!1)}),r(),r}function n(e,t){e.edit.on("scroll",function(){o(e,!0)&&d(e)}),e.orig.on("scroll",function(){o(e,!1)&&d(e),t&&o(t,!0)&&d(t)})}function o(e,t){if(e.diffOutOfDate)return e.lockScroll&&null==e.needsScrollSync&&(e.needsScrollSync=t),!1;if(e.needsScrollSync=null,!e.lockScroll)return!0;var i,r,n=+new Date;if(t?(i=e.edit,r=e.orig):(i=e.orig,r=e.edit),i.state.scrollSetBy==e&&(i.state.scrollSetAt||0)+250>n)return!1;var o=i.getScrollInfo();if("align"==e.mv.options.connect)v=o.top;else{var a,s,c=.5*o.clientHeight,h=o.top+c,f=i.lineAtHeight(h,"local"),g=A(e.chunks,f,t),d=l(i,t?g.edit:g.orig),u=l(r,t?g.orig:g.edit),m=(h-d.top)/(d.bot-d.top),v=u.top-c+m*(u.bot-u.top);if(v>o.top&&(s=o.top/c)<1)v=v*s+o.top*(1-s);else if((a=o.height-o.clientHeight-o.top)<c){var p=r.getScrollInfo();p.height-p.clientHeight-v>a&&(s=a/c)<1&&(v=v*s+(p.height-p.clientHeight-a)*(1-s))}}return r.scrollTo(o.left,v),r.state.scrollSetAt=n,r.state.scrollSetBy=e,!0}function l(e,t){var i=t.after;return null==i&&(i=e.lastLine()+1),{top:e.heightAtLine(t.before||0,"local"),bot:e.heightAtLine(i,"local")}}function a(t,i,r){t.lockScroll=i,i&&0!=r&&o(t,DIFF_INSERT)&&d(t),(i?e.addClass:e.rmClass)(t.lockButton,"CodeMirror-merge-scrolllock-enabled")}function s(e,t,i){for(var r=i.classLocation,n=0;n<r.length;n++)e.removeLineClass(t,r[n],i.chunk),e.removeLineClass(t,r[n],i.start),e.removeLineClass(t,r[n],i.end)}function c(t,i,r){for(var n=0;n<i.length;++n){var o=i[n];o instanceof e.TextMarker?o.clear():o.parent&&s(t,o,r)}i.length=0}function h(e,t,i,r,n){var o=e.getViewport();e.operation(function(){i.from==i.to||o.from-i.to>20||i.from-o.to>20?(c(e,i.marked,n),g(e,t,r,i.marked,o.from,o.to,n),i.from=o.from,i.to=o.to):(o.from<i.from&&(g(e,t,r,i.marked,o.from,i.from,n),i.from=o.from),o.to>i.to&&(g(e,t,r,i.marked,i.to,o.to,n),i.to=o.to))})}function f(e,t,i,r,n,o){for(var l=i.classLocation,a=e.getLineHandle(t),s=0;s<l.length;s++)r&&e.addLineClass(a,l[s],i.chunk),n&&e.addLineClass(a,l[s],i.start),o&&e.addLineClass(a,l[s],i.end);return a}function g(e,t,i,r,n,o,l){function a(t,i){for(var a=Math.max(n,t),s=Math.min(o,i),c=a;c<s;++c)r.push(f(e,c,l,!0,c==t,c==i-1));t==i&&a==i&&s==i&&(a?r.push(f(e,a-1,l,!1,!1,!0)):r.push(f(e,a,l,!1,!0,!1)))}for(var s=q(0,0),c=q(n,0),h=e.clipPos(q(o-1)),g=i==DIFF_DELETE?l.del:l.insert,d=0,u=!1,m=0;m<t.length;++m){var v=t[m],p=v[0],k=v[1];if(p==DIFF_EQUAL){var C=s.line+(D(t,m)?0:1);V(s,k);var b=s.line+(L(t,m)?1:0);b>C&&(u&&(a(d,C),u=!1),d=b)}else if(u=!0,p==i){var w=V(s,k,!0),T=P(c,s),y=H(h,w);j(T,y)||r.push(e.markText(T,y,{className:g})),s=w}}u&&a(d,s.line+1)}function d(e){if(e.showDifferences){if(e.svg){N(e.svg);var t=e.gap.offsetWidth;R(e.svg,"width",t,"height",e.gap.offsetHeight)}e.copyButtons&&N(e.copyButtons);for(var i=e.edit.getViewport(),r=e.orig.getViewport(),n=e.mv.wrap.getBoundingClientRect().top,o=n-e.edit.getScrollerElement().getBoundingClientRect().top+e.edit.getScrollInfo().top,l=n-e.orig.getScrollerElement().getBoundingClientRect().top+e.orig.getScrollInfo().top,a=0;a<e.chunks.length;a++){var s=e.chunks[a];s.editFrom<=i.to&&s.editTo>=i.from&&s.origFrom<=r.to&&s.origTo>=r.from&&w(e,s,l,o,t)}}}function u(e,t){for(var i=0,r=0,n=0;n<t.length;n++){var o=t[n];if(o.editTo>e&&o.editFrom<=e)return null;if(o.editFrom>e)break;i=o.editTo,r=o.origTo}return r+(e-i)}function m(e,t,i){for(var r=e.state.trackAlignable,n=e.firstLine(),o=0,l=[],a=0;;a++){for(var s=t[a],c=s?i?s.origFrom:s.editFrom:1e9;o<r.alignable.length;o+=2){var h=r.alignable[o]+1;if(!(h<=n)){if(!(h<=c))break;l.push(h)}}if(!s)break;l.push(n=i?s.origTo:s.editTo)}return l}function v(e,t,i,r){var n=0,o=0,l=0,a=0;e:for(;;n++){var s=e[n],c=t[o];if(!s&&null==c)break;for(var h=s?s[0]:1e9,f=null==c?1e9:c;l<i.length;){var g=i[l];if(g.origFrom<=f&&g.origTo>f){o++,n--;continue e}if(g.editTo>h){if(g.editFrom<=h)continue e;break}a+=g.origTo-g.origFrom-(g.editTo-g.editFrom),l++}if(h==f-a)s[r]=f,o++;else if(h<f-a)s[r]=h+a;else{var d=[f-a,null,null];d[r]=f,e.splice(n,0,d),o++}}}function p(e,t){var i=m(e.edit,e.chunks,!1),r=[];if(t)for(var n=0,o=0;n<t.chunks.length;n++){for(var l=t.chunks[n].editTo;o<i.length&&i[o]<l;)o++;o!=i.length&&i[o]==l||i.splice(o++,0,l)}for(n=0;n<i.length;n++)r.push([i[n],null,null]);return v(r,m(e.orig,e.chunks,!0),e.chunks,1),t&&v(r,m(t.orig,t.chunks,!0),t.chunks,2),r}function k(e,t){if(e.dealigned||t){if(!e.orig.curOp)return e.orig.operation(function(){k(e,t)});e.dealigned=!1;var r=e.mv.left==e?e.mv.right:e.mv.left;r&&(i(r),r.dealigned=!1);for(var n=p(e,r),o=e.mv.aligners,l=0;l<o.length;l++)o[l].clear();o.length=0;var a=[e.edit,e.orig],s=[],c=[];r&&a.push(r.orig);for(l=0;l<a.length;l++)s.push(a[l].getScrollInfo().top),c.push(-a[l].getScrollerElement().getBoundingClientRect().top);(c[0]!=c[1]||3==a.length&&c[1]!=c[2])&&C(a,c,[0,0,0],o);for(var h=0;h<n.length;h++)C(a,c,n[h],o);for(l=0;l<a.length;l++)a[l].scrollTo(null,s[l])}}function C(e,t,i,r){for(var n=-1e8,o=[],l=0;l<e.length;l++)if(null!=i[l]){var a=e[l].heightAtLine(i[l],"local")-t[l];o[l]=a,n=Math.max(n,a)}for(l=0;l<e.length;l++)if(null!=i[l]){var s=n-o[l];s>1&&r.push(b(e[l],i[l],s))}}function b(e,t,i){var r=!0;t>e.lastLine()&&(t--,r=!1);var n=document.createElement("div");return n.className="CodeMirror-merge-spacer",n.style.height=i+"px",n.style.minWidth="1px",e.addLineWidget(t,n,{height:i,above:r,mergeSpacer:!0,handleMouseEvents:!0})}function w(e,t,i,r,n){var o="left"==e.type,l=e.orig.heightAtLine(t.origFrom,"local",!0)-i;if(e.svg){var a=l,s=e.edit.heightAtLine(t.editFrom,"local",!0)-r;if(o){var c=a;a=s,s=c}var h=e.orig.heightAtLine(t.origTo,"local",!0)-i,f=e.edit.heightAtLine(t.editTo,"local",!0)-r;if(o){c=h;h=f,f=c}var g=" C "+n/2+" "+s+" "+n/2+" "+a+" "+(n+2)+" "+a,d=" C "+n/2+" "+h+" "+n/2+" "+f+" -1 "+f;R(e.svg.appendChild(document.createElementNS(G,"path")),"d","M -1 "+s+g+" L "+(n+2)+" "+h+d+" z","class",e.classes.connect)}if(e.copyButtons){var u=e.copyButtons.appendChild(I("div","left"==e.type?"\u21dd":"\u21dc","CodeMirror-merge-copy")),m=e.mv.options.allowEditingOriginals;if(u.title=e.edit.phrase(m?"Push to left":"Revert chunk"),u.chunk=t,u.style.top=(t.origTo>t.origFrom?l:e.edit.heightAtLine(t.editFrom,"local")-r)+"px",m){var v=e.edit.heightAtLine(t.editFrom,"local")-r,p=e.copyButtons.appendChild(I("div","right"==e.type?"\u21dd":"\u21dc","CodeMirror-merge-copy-reverse"));p.title="Push to right",p.chunk={editFrom:t.origFrom,editTo:t.origTo,origFrom:t.editFrom,origTo:t.editTo},p.style.top=v+"px","right"==e.type?p.style.left="2px":p.style.right="2px"}}}function T(e,t,i,r){if(!e.diffOutOfDate){var n=r.origTo>i.lastLine()?q(r.origFrom-1):q(r.origFrom,0),o=q(r.origTo,0),l=r.editTo>t.lastLine()?q(r.editFrom-1):q(r.editFrom,0),a=q(r.editTo,0),s=e.mv.options.revertChunk;s?s(e.mv,i,n,o,t,l,a):t.replaceRange(i.getRange(n,o),l,a)}}function y(t){var i=t.lockButton=I("div",null,"CodeMirror-merge-scrolllock"),r=I("div",[i],"CodeMirror-merge-scrolllock-wrap");e.on(i,"click",function(){a(t,!t.lockScroll)});var n=[r];if(!1!==t.mv.options.revertButtons&&(t.copyButtons=I("div",null,"CodeMirror-merge-copybuttons-"+t.type),e.on(t.copyButtons,"click",function(e){var i=e.target||e.srcElement;i.chunk&&("CodeMirror-merge-copy-reverse"!=i.className?T(t,t.edit,t.orig,i.chunk):T(t,t.orig,t.edit,i.chunk))}),n.unshift(t.copyButtons)),"align"!=t.mv.options.connect){var o=document.createElementNS&&document.createElementNS(G,"svg");o&&!o.createSVGRect&&(o=null),t.svg=o,o&&n.push(o)}return t.gap=I("div",n,"CodeMirror-merge-gap")}function F(e){return"string"==typeof e?e:e.getValue()}function S(e,t,i){X||(X=new diff_match_patch);for(var r=X.diff_main(e,t),n=0;n<r.length;++n){var o=r[n];(i?/[^ \t]/.test(o[1]):o[1])?n&&r[n-1][0]==o[0]&&(r.splice(n--,1),r[n][1]+=o[1]):r.splice(n--,1)}return r}function M(e){var t=[];if(!e.length)return t;for(var i=0,r=0,n=q(0,0),o=q(0,0),l=0;l<e.length;++l){var a=e[l],s=a[0];if(s==DIFF_EQUAL){var c=!D(e,l)||n.line<i||o.line<r?1:0,h=n.line+c,f=o.line+c;V(n,a[1],null,o);var g=L(e,l)?1:0,d=n.line+g,u=o.line+g;d>h&&(l&&t.push({origFrom:r,origTo:f,editFrom:i,editTo:h}),i=d,r=u)}else V(s==DIFF_INSERT?n:o,a[1])}return(i<=n.line||r<=o.line)&&t.push({origFrom:r,origTo:o.line+1,editFrom:i,editTo:n.line+1}),t}function L(e,t){if(t==e.length-1)return!0;var i=e[t+1][1];return!(1==i.length&&t<e.length-2||10!=i.charCodeAt(0))&&(t==e.length-2||((i=e[t+2][1]).length>1||t==e.length-3)&&10==i.charCodeAt(0))}function D(e,t){if(0==t)return!0;var i=e[t-1][1];return 10==i.charCodeAt(i.length-1)&&(1==t||10==(i=e[t-2][1]).charCodeAt(i.length-1))}function A(e,t,i){for(var r,n,o,l,a=0;a<e.length;a++){var s=e[a],c=i?s.editFrom:s.origFrom,h=i?s.editTo:s.origTo;null==n&&(c>t?(n=s.editFrom,l=s.origFrom):h>t&&(n=s.editTo,l=s.origTo)),h<=t?(r=s.editTo,o=s.origTo):c<=t&&(r=s.editFrom,o=s.origFrom)}return{edit:{before:r,after:n},orig:{before:o,after:l}}}function E(t,i,r){function n(){l.clear(),t.removeLineClass(i,"wrap","CodeMirror-merge-collapsed-line")}t.addLineClass(i,"wrap","CodeMirror-merge-collapsed-line");var o=document.createElement("span");o.className="CodeMirror-merge-collapsed-widget",o.title=t.phrase("Identical text collapsed. Click to expand.");var l=t.markText(q(i,0),q(r-1),{inclusiveLeft:!0,inclusiveRight:!0,replacedWith:o,clearOnEnter:!0});return l.explicitlyCleared&&n(),e.on(o,"click",n),l.on("clear",n),e.on(o,"click",n),{mark:l,clear:n}}function O(e,t){function i(){for(var e=0;e<r.length;e++)r[e].clear()}for(var r=[],n=0;n<t.length;n++){var o=t[n],l=E(o.cm,o.line,o.line+e);r.push(l),l.mark.on("clear",i)}return r[0].mark}function B(e,t,i,r){for(var n=0;n<e.chunks.length;n++)for(var o=e.chunks[n],l=o.editFrom-t;l<o.editTo+t;l++){var a=l+i;a>=0&&a<r.length&&(r[a]=!1)}}function x(e,t){"number"!=typeof t&&(t=2);for(var i=[],r=e.editor(),n=r.firstLine(),o=n,l=r.lastLine();o<=l;o++)i.push(!0);e.left&&B(e.left,t,n,i),e.right&&B(e.right,t,n,i);for(var a=0;a<i.length;a++)if(i[a]){for(var s=a+n,c=1;a<i.length-1&&i[a+1];a++,c++);if(c>t){var h=[{line:s,cm:r}];e.left&&h.push({line:u(s,e.left.chunks),cm:e.left.orig}),e.right&&h.push({line:u(s,e.right.chunks),cm:e.right.orig});var f=O(c,h);e.options.onCollapse&&e.options.onCollapse(e,s,c,f)}}}function I(e,t,i,r){var n=document.createElement(e);if(i&&(n.className=i),r&&(n.style.cssText=r),"string"==typeof t)n.appendChild(document.createTextNode(t));else if(t)for(var o=0;o<t.length;++o)n.appendChild(t[o]);return n}function N(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild)}function R(e){for(var t=1;t<arguments.length;t+=2)e.setAttribute(arguments[t],arguments[t+1])}function W(e,t){t||(t={});for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}function V(e,t,i,r){for(var n=i?q(e.line,e.ch):e,o=0;;){var l=t.indexOf("\n",o);if(-1==l)break;++n.line,r&&++r.line,o=l+1}return n.ch=(o?0:n.ch)+(t.length-o),r&&(r.ch=(o?0:r.ch)+(t.length-o)),n}function _(e){this.cm=e,this.alignable=[],this.height=e.doc.height;var t=this;e.on("markerAdded",function(e,i){if(i.collapsed){var r=i.find(1);null!=r&&t.set(r.line,$)}}),e.on("markerCleared",function(e,i,r,n){null!=n&&i.collapsed&&t.check(n,$,t.hasMarker)}),e.on("markerChanged",this.signal.bind(this)),e.on("lineWidgetAdded",function(e,i,r){i.mergeSpacer||(i.above?t.set(r-1,Z):t.set(r,Y))}),e.on("lineWidgetCleared",function(e,i,r){i.mergeSpacer||(i.above?t.check(r-1,Z,t.hasWidgetBelow):t.check(r,Y,t.hasWidget))}),e.on("lineWidgetChanged",this.signal.bind(this)),e.on("change",function(e,i){var r=i.from.line,n=i.to.line-i.from.line,o=i.text.length-1,l=r+o;(n||o)&&t.map(r,n,o),t.check(l,$,t.hasMarker),(n||o)&&t.check(i.from.line,$,t.hasMarker)}),e.on("viewportChange",function(){t.cm.doc.height!=t.height&&t.signal()})}function H(e,t){return(e.line-t.line||e.ch-t.ch)<0?e:t}function P(e,t){return(e.line-t.line||e.ch-t.ch)>0?e:t}function j(e,t){return e.line==t.line&&e.ch==t.ch}function U(e,t,i){for(var r=e.length-1;r>=0;r--){var n=e[r],o=(i?n.origTo:n.editTo)-1;if(o<t)return o}}function z(e,t,i){for(var r=0;r<e.length;r++){var n=e[r],o=i?n.origFrom:n.editFrom;if(o>t)return o}}function Q(t,r){var n=null,o=t.state.diffViews,l=t.getCursor().line;if(o)for(var a=0;a<o.length;a++){var s=o[a],c=t==s.orig;i(s);var h=r<0?U(s.chunks,l,c):z(s.chunks,l,c);null==h||null!=n&&!(r<0?h>n:h<n)||(n=h)}if(null==n)return e.Pass;t.setCursor(n,0)}var q=e.Pos,G="http://www.w3.org/2000/svg";t.prototype={constructor:t,init:function(t,i,r){this.edit=this.mv.edit,(this.edit.state.diffViews||(this.edit.state.diffViews=[])).push(this),this.orig=e(t,W({value:i,readOnly:!this.mv.options.allowEditingOriginals},W(r))),"align"==this.mv.options.connect&&(this.edit.state.trackAlignable||(this.edit.state.trackAlignable=new _(this.edit)),this.orig.state.trackAlignable=new _(this.orig)),this.lockButton.title=this.edit.phrase("Toggle locked scrolling"),this.orig.state.diffViews=[this];var n=r.chunkClassLocation||"background";"[object Array]"!=Object.prototype.toString.call(n)&&(n=[n]),this.classes.classLocation=n,this.diff=S(F(i),F(r.value),this.mv.options.ignoreWhitespace),this.chunks=M(this.diff),this.diffOutOfDate=this.dealigned=!1,this.needsScrollSync=null,this.showDifferences=!1!==r.showDifferences},registerEvents:function(e){this.forceUpdate=r(this),a(this,!0,!1),n(this,e)},setShowDifferences:function(e){(e=!1!==e)!=this.showDifferences&&(this.showDifferences=e,this.forceUpdate("full"))}};var J=!1,K=e.MergeView=function(i,r){if(!(this instanceof K))return new K(i,r);this.options=r;var n=r.origLeft,o=null==r.origRight?r.orig:r.origRight,l=null!=n,a=null!=o,s=1+(l?1:0)+(a?1:0),c=[],h=this.left=null,f=this.right=null,g=this;if(l){h=this.left=new t(this,"left");var u=I("div",null,"CodeMirror-merge-pane CodeMirror-merge-left");c.push(u),c.push(y(h))}var m=I("div",null,"CodeMirror-merge-pane CodeMirror-merge-editor");if(c.push(m),a){f=this.right=new t(this,"right"),c.push(y(f));var v=I("div",null,"CodeMirror-merge-pane CodeMirror-merge-right");c.push(v)}(a?v:m).className+=" CodeMirror-merge-pane-rightmost",c.push(I("div",null,null,"height: 0; clear: both;"));var p=this.wrap=i.appendChild(I("div",c,"CodeMirror-merge CodeMirror-merge-"+s+"pane"));this.edit=e(m,W(r)),h&&h.init(u,n,r),f&&f.init(v,o,r),r.collapseIdentical&&this.editor().operation(function(){x(g,r.collapseIdentical)}),"align"==r.connect&&(this.aligners=[],k(this.left||this.right,!0)),h&&h.registerEvents(f),f&&f.registerEvents(h);var C=function(){h&&d(h),f&&d(f)};e.on(window,"resize",C);var b=setInterval(function(){for(var t=p.parentNode;t&&t!=document.body;t=t.parentNode);t||(clearInterval(b),e.off(window,"resize",C))},5e3)};K.prototype={constructor:K,editor:function(){return this.edit},rightOriginal:function(){return this.right&&this.right.orig},leftOriginal:function(){return this.left&&this.left.orig},setShowDifferences:function(e){this.right&&this.right.setShowDifferences(e),this.left&&this.left.setShowDifferences(e)},rightChunks:function(){if(this.right)return i(this.right),this.right.chunks},leftChunks:function(){if(this.left)return i(this.left),this.left.chunks}};var X,Y=1,Z=2,$=4;_.prototype={signal:function(){e.signal(this,"realign"),this.height=this.cm.doc.height},set:function(e,t){for(var i=-1;i<this.alignable.length;i+=2){var r=this.alignable[i]-e;if(0==r){if((this.alignable[i+1]&t)==t)return;return this.alignable[i+1]|=t,void this.signal()}if(r>0)break}this.signal(),this.alignable.splice(i,0,e,t)},find:function(e){for(var t=0;t<this.alignable.length;t+=2)if(this.alignable[t]==e)return t;return-1},check:function(e,t,i){var r=this.find(e);if(-1!=r&&this.alignable[r+1]&t&&!i.call(this,e)){this.signal();var n=this.alignable[r+1]&~t;n?this.alignable[r+1]=n:this.alignable.splice(r,2)}},hasMarker:function(e){var t=this.cm.getLineHandle(e);if(t.markedSpans)for(var i=0;i<t.markedSpans.length;i++)if(t.markedSpans[i].marker.collapsed&&null!=t.markedSpans[i].to)return!0;return!1},hasWidget:function(e){var t=this.cm.getLineHandle(e);if(t.widgets)for(var i=0;i<t.widgets.length;i++)if(!t.widgets[i].above&&!t.widgets[i].mergeSpacer)return!0;return!1},hasWidgetBelow:function(e){if(e==this.cm.lastLine())return!1;var t=this.cm.getLineHandle(e+1);if(t.widgets)for(var i=0;i<t.widgets.length;i++)if(t.widgets[i].above&&!t.widgets[i].mergeSpacer)return!0;return!1},map:function(e,t,i){for(var r=i-t,n=e+t,o=-1,l=-1,a=0;a<this.alignable.length;a+=2){var s=this.alignable[a];s==e&&this.alignable[a+1]&Z&&(o=a),s==n&&this.alignable[a+1]&Z&&(l=a),s<=e||(s<n?this.alignable.splice(a--,2):this.alignable[a]+=r)}if(o>-1){var c=this.alignable[o+1];c==Z?this.alignable.splice(o,2):this.alignable[o+1]=c&~Z}l>-1&&i&&this.set(e+i,Z)}},e.commands.goNextDiff=function(e){return Q(e,1)},e.commands.goPrevDiff=function(e){return Q(e,-1)}});
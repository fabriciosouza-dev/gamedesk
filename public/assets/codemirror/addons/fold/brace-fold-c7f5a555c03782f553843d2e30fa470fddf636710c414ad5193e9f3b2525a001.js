// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.registerHelper("fold","brace",function(n,r){function t(t){for(var f=r.ch,s=0;;){var u=f<=0?-1:l.lastIndexOf(t,f-1);if(-1!=u){if(1==s&&u<r.ch)break;if(i=n.getTokenTypeAt(e.Pos(o,u+1)),!/^(comment|string)/.test(i))return u+1;f=u-1}else{if(1==s)break;s=1,f=l.length}}}var i,o=r.line,l=n.getLine(o),f="{",s="}",u=t("{");if(null==u&&(f="[",s="]",u=t("[")),null!=u){var a,d,c=1,g=n.lastLine();e:for(var v=o;v<=g;++v)for(var p=n.getLine(v),m=v==o?u:0;;){var P=p.indexOf(f,m),k=p.indexOf(s,m);if(P<0&&(P=p.length),k<0&&(k=p.length),(m=Math.min(P,k))==p.length)break;if(n.getTokenTypeAt(e.Pos(v,m+1))==i)if(m==P)++c;else if(!--c){a=v,d=m;break e}++m}if(null!=a&&(o!=a||d!=u))return{from:e.Pos(o,u),to:e.Pos(a,d)}}}),e.registerHelper("fold","import",function(n,r){function t(r){if(r<n.firstLine()||r>n.lastLine())return null;var t=n.getTokenAt(e.Pos(r,1));if(/\S/.test(t.string)||(t=n.getTokenAt(e.Pos(r,t.end+1))),"keyword"!=t.type||"import"!=t.string)return null;for(var i=r,o=Math.min(n.lastLine(),r+10);i<=o;++i){var l=n.getLine(i).indexOf(";");if(-1!=l)return{startCh:t.end,end:e.Pos(i,l)}}}var i,o=r.line,l=t(o);if(!l||t(o-1)||(i=t(o-2))&&i.end.line==o-1)return null;for(var f=l.end;;){var s=t(f.line+1);if(null==s)break;f=s.end}return{from:n.clipPos(e.Pos(o,l.startCh+1)),to:f}}),e.registerHelper("fold","include",function(n,r){function t(r){if(r<n.firstLine()||r>n.lastLine())return null;var t=n.getTokenAt(e.Pos(r,1));return/\S/.test(t.string)||(t=n.getTokenAt(e.Pos(r,t.end+1))),"meta"==t.type&&"#include"==t.string.slice(0,8)?t.start+8:void 0}var i=r.line,o=t(i);if(null==o||null!=t(i-1))return null;for(var l=i;;){if(null==t(l+1))break;++l}return{from:e.Pos(i,o+1),to:n.clipPos(e.Pos(l))}})});
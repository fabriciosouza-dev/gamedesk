// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.registerGlobalHelper("fold","comment",function(e){return e.blockCommentStart&&e.blockCommentEnd},function(t,n){var o=t.getModeAt(n),r=o.blockCommentStart,i=o.blockCommentEnd;if(r&&i){for(var f,l=n.line,c=t.getLine(l),m=n.ch,a=0;;){var d=m<=0?-1:c.lastIndexOf(r,m-1);if(-1!=d){if(1==a&&d<n.ch)return;if(/comment/.test(t.getTokenTypeAt(e.Pos(l,d+1)))&&(0==d||c.slice(d-i.length,d)==i||!/comment/.test(t.getTokenTypeAt(e.Pos(l,d))))){f=d+r.length;break}m=d-1}else{if(1==a)return;a=1,m=c.length}}var s,u,b=1,g=t.lastLine();e:for(var h=l;h<=g;++h)for(var k=t.getLine(h),p=h==l?f:0;;){var v=k.indexOf(r,p),y=k.indexOf(i,p);if(v<0&&(v=k.length),y<0&&(y=k.length),(p=Math.min(v,y))==k.length)break;if(p==v)++b;else if(!--b){s=h,u=p;break e}++p}if(null!=s&&(l!=s||u!=f))return{from:e.Pos(l,f),to:e.Pos(s,u)}}})});
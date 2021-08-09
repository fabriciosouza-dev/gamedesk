// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("crystal",function(e){function t(e,t){return new RegExp((t?"":"^")+"(?:"+e.join("|")+")"+(t?"$":"\\b"))}function n(e,t,n){return n.tokenize.push(e),e(t,n)}function r(e,t){if(e.eatSpace())return null;if("\\"!=t.lastToken&&e.match("{%",!1))return n(u("%","%"),e,t);if("\\"!=t.lastToken&&e.match("{{",!1))return n(u("{","}"),e,t);if("#"==e.peek())return e.skipToEnd(),"comment";var r;if(e.match(d))return e.eat(/[?!]/),r=e.current(),e.eat(":")?"atom":"."==t.lastToken?"property":F.test(r)?(_.test(r)?"fun"==r&&t.blocks.indexOf("lib")>=0||"def"==r&&"abstract"==t.lastToken||(t.blocks.push(r),t.currentIndent+=1):"operator"!=t.lastStyle&&t.lastStyle||!b.test(r)?"end"==r&&(t.blocks.pop(),t.currentIndent-=1):(t.blocks.push(r),t.currentIndent+=1),w.hasOwnProperty(r)&&t.tokenize.push(w[r]),"keyword"):z.test(r)?"atom":"variable";if(e.eat("@"))return"["==e.peek()?n(a("[","]","meta"),e,t):(e.eat("@"),e.match(d)||e.match(k),"variable-2");if(e.match(k))return"tag";if(e.eat(":"))return e.eat('"')?n(s('"',"atom",!1),e,t):e.match(d)||e.match(k)||e.match(l)||e.match(m)||e.match(h)?"atom":(e.eat(":"),"operator");if(e.eat('"'))return n(s('"',"string",!0),e,t);if("%"==e.peek()){var i,o="string",c=!0;if(e.match("%r"))o="string-2",i=e.next();else if(e.match("%w"))c=!1,i=e.next();else if(e.match("%q"))c=!1,i=e.next();else if(i=e.match(/^%([^\w\s=])/))i=i[1];else{if(e.match(/^%[a-zA-Z_\u009F-\uFFFF][\w\u009F-\uFFFF]*/))return"meta";if(e.eat("%"))return"operator"}return v.hasOwnProperty(i)&&(i=v[i]),n(s(i,o,c),e,t)}return(r=e.match(/^<<-('?)([A-Z]\w*)\1/))?n(f(r[2],!r[1]),e,t):e.eat("'")?(e.match(/^(?:[^']|\\(?:[befnrtv0'"]|[0-7]{3}|u(?:[0-9a-fA-F]{4}|\{[0-9a-fA-F]{1,6}\})))/),e.eat("'"),"atom"):e.eat("0")?(e.eat("x")?e.match(/^[0-9a-fA-F_]+/):e.eat("o")?e.match(/^[0-7_]+/):e.eat("b")&&e.match(/^[01_]+/),"number"):e.eat(/^\d/)?(e.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?/),"number"):e.match(l)?(e.eat("="),"operator"):e.match(m)||e.match(p)?"operator":(r=e.match(/[({[]/,!1))?n(a(r=r[0],v[r],null),e,t):e.eat("\\")?(e.next(),"meta"):(e.next(),null)}function a(e,t,n,u){return function(i,o){if(!u&&i.match(e))return o.tokenize[o.tokenize.length-1]=a(e,t,n,!0),o.currentIndent+=1,n;var c=r(i,o);return i.current()===t&&(o.tokenize.pop(),o.currentIndent-=1,c=n),c}}function u(e,t,n){return function(a,i){return!n&&a.match("{"+e)?(i.currentIndent+=1,i.tokenize[i.tokenize.length-1]=u(e,t,!0),"meta"):a.match(t+"}")?(i.currentIndent-=1,i.tokenize.pop(),"meta"):r(a,i)}}function i(e,t){if(e.eatSpace())return null;var n;if(n=e.match(d)){if("def"==n)return"keyword";e.eat(/[?!]/)}return t.tokenize.pop(),"def"}function o(e,t){return e.eatSpace()?null:(e.match(d)?e.eat(/[!?]/):e.match(l)||e.match(m)||e.match(h),t.tokenize.pop(),"def")}function c(e,t){return e.eatSpace()?null:(e.match(k),t.tokenize.pop(),"def")}function s(e,t,n){return function(r,i){for(var o=!1;r.peek();)if(o)r.next(),o=!1;else{if(r.match("{%",!1))return i.tokenize.push(u("%","%")),t;if(r.match("{{",!1))return i.tokenize.push(u("{","}")),t;if(n&&r.match("#{",!1))return i.tokenize.push(a("#{","}","meta")),t;var c=r.next();if(c==e)return i.tokenize.pop(),t;o=n&&"\\"==c}return t}}function f(e,t){return function(n,r){if(n.sol()&&(n.eatSpace(),n.match(e)))return r.tokenize.pop(),"string";for(var i=!1;n.peek();)if(i)n.next(),i=!1;else{if(n.match("{%",!1))return r.tokenize.push(u("%","%")),"string";if(n.match("{{",!1))return r.tokenize.push(u("{","}")),"string";if(t&&n.match("#{",!1))return r.tokenize.push(a("#{","}","meta")),"string";i=t&&"\\"==n.next()}return"string"}}var l=/^(?:[-+/%|&^]|\*\*?|[<>]{2})/,m=/^(?:[=!]~|===|<=>|[<>=!]=?|[|&]{2}|~)/,h=/^(?:\[\][?=]?)/,p=/^(?:\.(?:\.{2})?|->|[?:])/,d=/^[a-z_\u009F-\uFFFF][a-zA-Z0-9_\u009F-\uFFFF]*/,k=/^[A-Z_\u009F-\uFFFF][a-zA-Z0-9_\u009F-\uFFFF]*/,F=t(["abstract","alias","as","asm","begin","break","case","class","def","do","else","elsif","end","ensure","enum","extend","for","fun","if","include","instance_sizeof","lib","macro","module","next","of","out","pointerof","private","protected","rescue","return","require","select","sizeof","struct","super","then","type","typeof","uninitialized","union","unless","until","when","while","with","yield","__DIR__","__END_LINE__","__FILE__","__LINE__"]),z=t(["true","false","nil","self"]),_=t(["def","fun","macro","class","module","struct","lib","enum","union","do","for"]),b=t(["if","unless","case","while","until","begin","then"]),x=["end","else","elsif","rescue","ensure"],y=t(x),g=["\\)","\\}","\\]"],I=new RegExp("^(?:"+g.join("|")+")$"),w={def:o,fun:o,macro:i,"class":c,module:c,struct:c,lib:c,"enum":c,union:c},v={"[":"]","{":"}","(":")","<":">"};return{startState:function(){return{tokenize:[r],currentIndent:0,lastToken:null,lastStyle:null,blocks:[]}},token:function(e,t){var n=t.tokenize[t.tokenize.length-1](e,t),r=e.current();return n&&"comment"!=n&&(t.lastToken=r,t.lastStyle=n),n},indent:function(t,n){return n=n.replace(/^\s*(?:\{%)?\s*|\s*(?:%\})?\s*$/g,""),y.test(n)||I.test(n)?e.indentUnit*(t.currentIndent-1):e.indentUnit*t.currentIndent},fold:"indent",electricInput:t(g.concat(x),!0),lineComment:"#"}}),e.defineMIME("text/x-crystal","crystal")});
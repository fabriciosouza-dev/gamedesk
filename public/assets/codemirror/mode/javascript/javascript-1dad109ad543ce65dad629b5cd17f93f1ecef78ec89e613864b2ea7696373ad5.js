// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("javascript",function(t,r){function n(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function a(e,t,r){return He=e,De=r,t}function i(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=o(r),t.tokenize(e,t);if("."==r&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return a("number","number");if("."==r&&e.match(".."))return a("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return a(r);if("="==r&&e.eat(">"))return a("=>","operator");if("0"==r&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return a("number","number");if(/\d/.test(r))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),a("number","number");if("/"==r)return e.eat("*")?(t.tokenize=c,c(e,t)):e.eat("/")?(e.skipToEnd(),a("comment","comment")):Fe(e,t,1)?(n(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),a("regexp","string-2")):(e.eat("="),a("operator","operator",e.current()));if("`"==r)return t.tokenize=u,u(e,t);if("#"==r&&"!"==e.peek())return e.skipToEnd(),a("meta","meta");if("#"==r&&e.eatWhile(Xe))return a("variable","property");if("<"==r&&e.match("!--")||"-"==r&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start)))return e.skipToEnd(),a("comment","comment");if(Ze.test(r))return">"==r&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=r&&"="!=r||e.eat("="):/[<>*+\-|&?]/.test(r)&&(e.eat(r),">"==r&&e.eat(r))),"?"==r&&e.eat(".")?a("."):a("operator","operator",e.current());if(Xe.test(r)){e.eatWhile(Xe);var i=e.current();if("."!=t.lastType){if(Ye.propertyIsEnumerable(i)){var s=Ye[i];return a(s.type,s.style,i)}if("async"==i&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return a("async","keyword",i)}return a("variable","variable",i)}}function o(e){return function(t,r){var n,o=!1;if(Ke&&"@"==t.peek()&&t.match(et))return r.tokenize=i,a("jsonld-keyword","meta");for(;null!=(n=t.next())&&(n!=e||o);)o=!o&&"\\"==n;return o||(r.tokenize=i),a("string","string")}}function c(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=i;break}n="*"==r}return a("comment","comment")}function u(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=i;break}n=!n&&"\\"==r}return a("quasi","string-2",e.current())}function s(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(Re){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var a=0,i=!1,o=r-1;o>=0;--o){var c=e.string.charAt(o),u=tt.indexOf(c);if(u>=0&&u<3){if(!a){++o;break}if(0==--a){"("==c&&(i=!0);break}}else if(u>=3&&u<6)++a;else if(Xe.test(c))i=!0;else if(/["'\/`]/.test(c))for(;;--o){if(0==o)return;if(e.string.charAt(o-1)==c&&"\\"!=e.string.charAt(o-2)){o--;break}}else if(i&&!a){++o;break}}i&&!a&&(t.fatArrowAt=o)}}function f(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function l(e,t){if(!Qe)return!1;for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}function d(e,t,r,n,a){var i=e.cc;for(nt.state=e,nt.stream=a,nt.marked=null,nt.cc=i,nt.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;){if((i.length?i.pop():Le?I:E)(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return nt.marked?nt.marked:"variable"==r&&l(e,n)?"variable-2":t}}}function p(){for(var e=arguments.length-1;e>=0;e--)nt.cc.push(arguments[e])}function m(){return p.apply(null,arguments),!0}function k(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function v(e){var t=nt.state;if(nt.marked="def",Qe){if(t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var n=y(e,t.context);if(null!=n)return void(t.context=n)}else if(!k(e,t.localVars))return void(t.localVars=new x(e,t.localVars));r.globalVars&&!k(e,t.globalVars)&&(t.globalVars=new x(e,t.globalVars))}}function y(e,t){if(t){if(t.block){var r=y(e,t.prev);return r?r==t.prev?t:new b(r,t.vars,!0):null}return k(e,t.vars)?t:new b(t.prev,new x(e,t.vars),!1)}return null}function w(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function b(e,t,r){this.prev=e,this.vars=t,this.block=r}function x(e,t){this.name=e,this.next=t}function h(){nt.state.context=new b(nt.state.context,nt.state.localVars,!1),nt.state.localVars=at}function g(){nt.state.context=new b(nt.state.context,nt.state.localVars,!0),nt.state.localVars=null}function j(){nt.state.localVars=nt.state.context.vars,nt.state.context=nt.state.context.prev}function M(e,t){var r=function(){var r=nt.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new f(n,nt.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function A(){var e=nt.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function V(e){function t(r){return r==e?m():";"==e||"}"==r||")"==r||"]"==r?p():m(t)}return t}function E(e,t){return"var"==e?m(M("vardef",t),de,V(";"),A):"keyword a"==e?m(M("form"),$,E,A):"keyword b"==e?m(M("form"),E,A):"keyword d"==e?nt.stream.match(/^\s*$/,!1)?m():m(M("stat"),C,V(";"),A):"debugger"==e?m(V(";")):"{"==e?m(M("}"),g,R,A,j):";"==e?m():"if"==e?("else"==nt.state.lexical.info&&nt.state.cc[nt.state.cc.length-1]==A&&nt.state.cc.pop()(),m(M("form"),$,E,A,we)):"function"==e?m(ge):"for"==e?m(M("form"),g,be,E,j,A):"class"==e||Re&&"interface"==t?(nt.marked="keyword",m(M("form","class"==e?e:t),Ee,A)):"variable"==e?Re&&"declare"==t?(nt.marked="keyword",m(E)):Re&&("module"==t||"enum"==t||"type"==t)&&nt.stream.match(/^\s*\w/,!1)?(nt.marked="keyword","enum"==t?m(Ue):"type"==t?m(Me,V("operator"),te,V(";")):m(M("form"),pe,V("{"),M("}"),R,A,A)):Re&&"namespace"==t?(nt.marked="keyword",m(M("form"),I,E,A)):Re&&"abstract"==t?(nt.marked="keyword",m(E)):m(M("stat"),H):"switch"==e?m(M("form"),$,V("{"),M("}","switch"),g,R,A,A,j):"case"==e?m(I,V(":")):"default"==e?m(V(":")):"catch"==e?m(M("form"),h,z,E,A,j):"export"==e?m(M("stat"),$e,A):"import"==e?m(M("stat"),Ce,A):"async"==e?m(E):"@"==t?m(I,E):p(M("stat"),I,V(";"),A)}function z(e){if("("==e)return m(Ae,V(")"))}function I(e,t){return q(e,t,!1)}function T(e,t){return q(e,t,!0)}function $(e){return"("!=e?p():m(M(")"),C,V(")"),A)}function q(e,t,r){if(nt.state.fatArrowAt==nt.stream.start){var n=r?U:N;if("("==e)return m(h,M(")"),L(Ae,")"),A,V("=>"),n,j);if("variable"==e)return p(h,pe,V("=>"),n,j)}var a=r?_:S;return rt.hasOwnProperty(e)?m(a):"function"==e?m(ge,a):"class"==e||Re&&"interface"==t?(nt.marked="keyword",m(M("form"),Ve,A)):"keyword c"==e||"async"==e?m(r?T:I):"("==e?m(M(")"),C,V(")"),A,a):"operator"==e||"spread"==e?m(r?T:I):"["==e?m(M("]"),Ne,A,a):"{"==e?Q(G,"}",null,a):"quasi"==e?p(O,a):"new"==e?m(W(r)):m()}function C(e){return e.match(/[;\}\)\],]/)?p():p(I)}function S(e,t){return","==e?m(C):_(e,t,!1)}function _(e,t,r){var n=0==r?S:_,a=0==r?I:T;return"=>"==e?m(h,r?U:N,j):"operator"==e?/\+\+|--/.test(t)||Re&&"!"==t?m(n):Re&&"<"==t&&nt.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1)?m(M(">"),L(te,">"),A,n):"?"==t?m(I,V(":"),a):m(a):"quasi"==e?p(O,n):";"!=e?"("==e?Q(T,")","call",n):"."==e?m(D,n):"["==e?m(M("]"),C,V("]"),A,n):Re&&"as"==t?(nt.marked="keyword",m(te,n)):"regexp"==e?(nt.state.lastType=nt.marked="operator",nt.stream.backUp(nt.stream.pos-nt.stream.start-1),m(a)):void 0:void 0}function O(e,t){return"quasi"!=e?p():"${"!=t.slice(t.length-2)?m(O):m(C,P)}function P(e){if("}"==e)return nt.marked="string-2",nt.state.tokenize=u,m(O)}function N(e){return s(nt.stream,nt.state),p("{"==e?E:I)}function U(e){return s(nt.stream,nt.state),p("{"==e?E:T)}function W(e){return function(t){return"."==t?m(e?F:B):"variable"==t&&Re?m(se,e?_:S):p(e?T:I)}}function B(e,t){if("target"==t)return nt.marked="keyword",m(S)}function F(e,t){if("target"==t)return nt.marked="keyword",m(_)}function H(e){return":"==e?m(A,E):p(S,V(";"),A)}function D(e){if("variable"==e)return nt.marked="property",m()}function G(e,t){if("async"==e)return nt.marked="property",m(G);if("variable"==e||"keyword"==nt.style){if(nt.marked="property","get"==t||"set"==t)return m(J);var r;return Re&&nt.state.fatArrowAt==nt.stream.start&&(r=nt.stream.match(/^\s*:\s*/,!1))&&(nt.state.fatArrowAt=nt.stream.pos+r[0].length),m(K)}return"number"==e||"string"==e?(nt.marked=Ke?"property":nt.style+" property",m(K)):"jsonld-keyword"==e?m(K):Re&&w(t)?(nt.marked="keyword",m(G)):"["==e?m(I,X,V("]"),K):"spread"==e?m(T,K):"*"==t?(nt.marked="keyword",m(G)):":"==e?p(K):void 0}function J(e){return"variable"!=e?p(K):(nt.marked="property",m(ge))}function K(e){return":"==e?m(T):"("==e?p(ge):void 0}function L(e,t,r){function n(a,i){if(r?r.indexOf(a)>-1:","==a){var o=nt.state.lexical;return"call"==o.info&&(o.pos=(o.pos||0)+1),m(function(r,n){return r==t||n==t?p():p(e)},n)}return a==t||i==t?m():r&&r.indexOf(";")>-1?p(e):m(V(t))}return function(r,a){return r==t||a==t?m():p(e,n)}}function Q(e,t,r){for(var n=3;n<arguments.length;n++)nt.cc.push(arguments[n]);return m(M(t,r),L(e,t),A)}function R(e){return"}"==e?m():p(E,R)}function X(e,t){if(Re){if(":"==e)return m(te);if("?"==t)return m(X)}}function Y(e,t){if(Re&&(":"==e||"in"==t))return m(te)}function Z(e){if(Re&&":"==e)return nt.stream.match(/^\s*\w+\s+is\b/,!1)?m(I,ee,te):m(te)}function ee(e,t){if("is"==t)return nt.marked="keyword",m()}function te(e,t){return"keyof"==t||"typeof"==t||"infer"==t||"readonly"==t?(nt.marked="keyword",m("typeof"==t?T:te)):"variable"==e||"void"==t?(nt.marked="type",m(ue)):"|"==t||"&"==t?m(te):"string"==e||"number"==e||"atom"==e?m(ue):"["==e?m(M("]"),L(te,"]",","),A,ue):"{"==e?m(M("}"),ne,A,ue):"("==e?m(L(ce,")"),re,ue):"<"==e?m(L(te,">"),te):"quasi"==e?p(ie,ue):void 0}function re(e){if("=>"==e)return m(te)}function ne(e){return e.match(/[\}\)\]]/)?m():","==e||";"==e?m(ne):p(ae,ne)}function ae(e,t){return"variable"==e||"keyword"==nt.style?(nt.marked="property",m(ae)):"?"==t||"number"==e||"string"==e?m(ae):":"==e?m(te):"["==e?m(V("variable"),Y,V("]"),ae):"("==e?p(je,ae):e.match(/[;\}\)\],]/)?void 0:m()}function ie(e,t){return"quasi"!=e?p():"${"!=t.slice(t.length-2)?m(ie):m(te,oe)}function oe(e){if("}"==e)return nt.marked="string-2",nt.state.tokenize=u,m(ie)}function ce(e,t){return"variable"==e&&nt.stream.match(/^\s*[?:]/,!1)||"?"==t?m(ce):":"==e?m(te):"spread"==e?m(ce):p(te)}function ue(e,t){return"<"==t?m(M(">"),L(te,">"),A,ue):"|"==t||"."==e||"&"==t?m(te):"["==e?m(te,V("]"),ue):"extends"==t||"implements"==t?(nt.marked="keyword",m(te)):"?"==t?m(te,V(":"),te):void 0}function se(e,t){if("<"==t)return m(M(">"),L(te,">"),A,ue)}function fe(){return p(te,le)}function le(e,t){if("="==t)return m(te)}function de(e,t){return"enum"==t?(nt.marked="keyword",m(Ue)):p(pe,X,ve,ye)}function pe(e,t){return Re&&w(t)?(nt.marked="keyword",m(pe)):"variable"==e?(v(t),m()):"spread"==e?m(pe):"["==e?Q(ke,"]"):"{"==e?Q(me,"}"):void 0}function me(e,t){return"variable"!=e||nt.stream.match(/^\s*:/,!1)?("variable"==e&&(nt.marked="property"),"spread"==e?m(pe):"}"==e?p():"["==e?m(I,V("]"),V(":"),me):m(V(":"),pe,ve)):(v(t),m(ve))}function ke(){return p(pe,ve)}function ve(e,t){if("="==t)return m(T)}function ye(e){if(","==e)return m(de)}function we(e,t){if("keyword b"==e&&"else"==t)return m(M("form","else"),E,A)}function be(e,t){return"await"==t?m(be):"("==e?m(M(")"),xe,A):void 0}function xe(e){return"var"==e?m(de,he):"variable"==e?m(he):p(he)}function he(e,t){return")"==e?m():";"==e?m(he):"in"==t||"of"==t?(nt.marked="keyword",m(I,he)):p(I,he)}function ge(e,t){return"*"==t?(nt.marked="keyword",m(ge)):"variable"==e?(v(t),m(ge)):"("==e?m(h,M(")"),L(Ae,")"),A,Z,E,j):Re&&"<"==t?m(M(">"),L(fe,">"),A,ge):void 0}function je(e,t){return"*"==t?(nt.marked="keyword",m(je)):"variable"==e?(v(t),m(je)):"("==e?m(h,M(")"),L(Ae,")"),A,Z,j):Re&&"<"==t?m(M(">"),L(fe,">"),A,je):void 0}function Me(e,t){return"keyword"==e||"variable"==e?(nt.marked="type",m(Me)):"<"==t?m(M(">"),L(fe,">"),A):void 0}function Ae(e,t){return"@"==t&&m(I,Ae),"spread"==e?m(Ae):Re&&w(t)?(nt.marked="keyword",m(Ae)):Re&&"this"==e?m(X,ve):p(pe,X,ve)}function Ve(e,t){return"variable"==e?Ee(e,t):ze(e,t)}function Ee(e,t){if("variable"==e)return v(t),m(ze)}function ze(e,t){return"<"==t?m(M(">"),L(fe,">"),A,ze):"extends"==t||"implements"==t||Re&&","==e?("implements"==t&&(nt.marked="keyword"),m(Re?te:I,ze)):"{"==e?m(M("}"),Ie,A):void 0}function Ie(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||Re&&w(t))&&nt.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(nt.marked="keyword",m(Ie)):"variable"==e||"keyword"==nt.style?(nt.marked="property",m(Te,Ie)):"number"==e||"string"==e?m(Te,Ie):"["==e?m(I,X,V("]"),Te,Ie):"*"==t?(nt.marked="keyword",m(Ie)):Re&&"("==e?p(je,Ie):";"==e||","==e?m(Ie):"}"==e?m():"@"==t?m(I,Ie):void 0}function Te(e,t){if("!"==t)return m(Te);if("?"==t)return m(Te);if(":"==e)return m(te,ve);if("="==t)return m(T);var r=nt.state.lexical.prev;return p(r&&"interface"==r.info?je:ge)}function $e(e,t){return"*"==t?(nt.marked="keyword",m(Pe,V(";"))):"default"==t?(nt.marked="keyword",m(I,V(";"))):"{"==e?m(L(qe,"}"),Pe,V(";")):p(E)}function qe(e,t){return"as"==t?(nt.marked="keyword",m(V("variable"))):"variable"==e?p(T,qe):void 0}function Ce(e){return"string"==e?m():"("==e?p(I):"."==e?p(S):p(Se,_e,Pe)}function Se(e,t){return"{"==e?Q(Se,"}"):("variable"==e&&v(t),"*"==t&&(nt.marked="keyword"),m(Oe))}function _e(e){if(","==e)return m(Se,_e)}function Oe(e,t){if("as"==t)return nt.marked="keyword",m(Se)}function Pe(e,t){if("from"==t)return nt.marked="keyword",m(I)}function Ne(e){return"]"==e?m():p(L(T,"]"))}function Ue(){return p(M("form"),pe,V("{"),M("}"),L(We,"}"),A,A)}function We(){return p(pe,ve)}function Be(e,t){return"operator"==e.lastType||","==e.lastType||Ze.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}function Fe(e,t,r){return t.tokenize==i&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}var He,De,Ge=t.indentUnit,Je=r.statementIndent,Ke=r.jsonld,Le=r.json||Ke,Qe=!1!==r.trackScope,Re=r.typescript,Xe=r.wordCharacters||/[\w$\xa1-\uffff]/,Ye=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("keyword d"),i=e("operator"),o={type:"atom",style:"atom"};return{"if":e("if"),"while":t,"with":t,"else":r,"do":r,"try":r,"finally":r,"return":a,"break":a,"continue":a,"new":e("new"),"delete":n,"void":n,"throw":n,"debugger":e("debugger"),"var":e("var"),"const":e("var"),"let":e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":i,"typeof":i,"instanceof":i,"true":o,"false":o,"null":o,undefined:o,NaN:o,Infinity:o,"this":e("this"),"class":e("class"),"super":e("atom"),yield:n,"export":e("export"),"import":e("import"),"extends":n,await:n}}(),Ze=/[+\-*&%=<>!?|~^@]/,et=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,tt="([{}])",rt={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"import":!0,"jsonld-keyword":!0},nt={state:null,column:null,marked:null,cc:null},at=new x("this",new x("arguments",null));return j.lex=!0,A.lex=!0,{startState:function(e){var t={tokenize:i,lastType:"sof",cc:[],lexical:new f((e||0)-Ge,0,"block",!1),localVars:r.localVars,context:r.localVars&&new b(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),s(e,t)),t.tokenize!=c&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==He?r:(t.lastType="operator"!=He||"++"!=De&&"--"!=De?He:"incdec",d(t,r,He,De,e))},indent:function(t,n){if(t.tokenize==c||t.tokenize==u)return e.Pass;if(t.tokenize!=i)return 0;var a,o=n&&n.charAt(0),s=t.lexical;if(!/^\s*else\b/.test(n))for(var f=t.cc.length-1;f>=0;--f){var l=t.cc[f];if(l==A)s=s.prev;else if(l!=we&&l!=j)break}for(;("stat"==s.type||"form"==s.type)&&("}"==o||(a=t.cc[t.cc.length-1])&&(a==S||a==_)&&!/^[,\.=+\-*:?[\(]/.test(n));)s=s.prev;Je&&")"==s.type&&"stat"==s.prev.type&&(s=s.prev);var d=s.type,p=o==d;return"vardef"==d?s.indented+("operator"==t.lastType||","==t.lastType?s.info.length+1:0):"form"==d&&"{"==o?s.indented:"form"==d?s.indented+Ge:"stat"==d?s.indented+(Be(t,n)?Je||Ge:0):"switch"!=s.info||p||0==r.doubleIndentSwitch?s.align?s.column+(p?0:1):s.indented+(p?0:Ge):s.indented+(/^(?:case|default)\b/.test(n)?Ge:2*Ge)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:Le?null:"/*",blockCommentEnd:Le?null:"*/",blockCommentContinue:Le?null:" * ",lineComment:Le?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:Le?"json":"javascript",jsonldMode:Ke,jsonMode:Le,expressionAllowed:Fe,skipExpression:function(t){d(t,"atom","atom","true",new e.StringStream("",2,null))}}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/manifest+json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})});
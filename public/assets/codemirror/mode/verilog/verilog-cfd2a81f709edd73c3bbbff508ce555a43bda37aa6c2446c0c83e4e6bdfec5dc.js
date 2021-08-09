// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t,n){var i=t/a;return"tlv-"+e.tlvIndentationStyle[i]+"-"+n}function n(e){var t;return(t=e.match(l,!1))&&t[2].length>0}e.defineMode("verilog",function(t,n){function i(e){for(var t={},n=e.split(" "),i=0;i<n.length;++i)t[n[i]]=!0;return t}function r(e,t){var n,i=e.peek();if(w[i]&&0!=(n=w[i](e,t)))return n;if(w.tokenBase&&0!=(n=w.tokenBase(e,t)))return n;if(/[,;:\.]/.test(i))return f=e.next(),null;if(I.test(i))return f=e.next(),"bracket";if("`"==i){if(e.next(),e.eatWhile(/[\w\$_]/)){var r=e.current();if(p=r,r.startsWith("`uvm_")&&r.endsWith("_begin")){var l=p.substr(0,p.length-5)+"end";D[r]=l,f="newblock"}else{e.eatSpace(),"("==e.peek()&&(f="newmacro");var s=e.current();e.backUp(s.length-r.length)}return"def"}return null}if("$"==i)return e.next(),e.eatWhile(/[\w\$_]/)?"meta":null;if("#"==i)return e.next(),e.eatWhile(/[\d_.]/),"def";if("@"==i)return e.next(),e.eatWhile(/[@]/),"def";if('"'==i)return e.next(),t.tokenize=a(i),t.tokenize(e,t);if("/"==i){if(e.next(),e.eat("*"))return t.tokenize=o,o(e,t);if(e.eat("/"))return e.skipToEnd(),"comment";e.backUp(1)}if(e.match(M)||e.match(z)||e.match(S)||e.match(j)||e.match(E)||e.match(C)||e.match(M))return"number";if(e.eatWhile(x))return f=e.current(),"meta";if(e.eatWhile(/[\w\$_]/)){r=e.current();return _[r]?(D[r]&&(f="newblock","fork"===r&&(e.eatSpace(),";"==e.peek()&&(f="newstatement"),e.backUp(e.current().length-r.length))),O[r]&&(f="newstatement"),p=r,"keyword"):"variable"}return e.next(),null}function a(e){return function(t,n){for(var i,a=!1,o=!1;null!=(i=t.next());){if(i==e&&!a){o=!0;break}a=!a&&"\\"==i}return(o||!a&&!b)&&(n.tokenize=r),"string"}}function o(e,t){for(var n,i=!1;n=e.next();){if("/"==n&&i){t.tokenize=r;break}i="*"==n}return"comment"}function l(e,t,n,i,r,a){this.indented=e,this.column=t,this.type=n,this.scopekind=i,this.align=r,this.prev=a}function s(e,t,n,i){var r=new l(e.indented,t,n,i||"",null,e.context);return e.context=r}function c(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}function d(e,t){if(e==t)return!0;var n=t.split(";");for(var i in n)if(e==n[i])return!0;return!1}function m(e,t){return null!=e&&(e.scopekind===t||m(e.prev,t))}function u(){var e=[];for(var t in D)if(D[t]){var n=D[t].split(";");for(var i in n)e.push(n[i])}return new RegExp("[{}()\\[\\]]|("+e.join("|")+")$")}var f,p,v=t.indentUnit,g=n.statementIndentUnit||v,h=n.dontAlignCalls,y=n.compilerDirectivesUseRegularIndentation,k=n.noIndentKeywords||[],b=n.multiLineStrings,w=n.hooks||{},_=i("accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 null or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor"),x=/[\+\-\*\/!~&|^%=?:<>]/,I=/[\[\]{}()]/,C=/\d[0-9_]*/,z=/\d*\s*'s?d\s*\d[0-9_]*/i,S=/\d*\s*'s?b\s*[xz01][xz01_]*/i,j=/\d*\s*'s?o\s*[xz0-7][xz0-7_]*/i,E=/\d*\s*'s?h\s*[0-9a-fxz?][0-9a-fxz?_]*/i,M=/(\d[\d_]*(\.\d[\d_]*)?E-?[\d_]+)|(\d[\d_]*\.\d[\d_]*)/i,$=/^((`?\w+)|[)}\]])/,q=/[)}\]]/,A=new RegExp("^(`(?:ifdef|ifndef|elsif|else|endif|undef|undefineall|define|include|begin_keywords|celldefine|default|nettype|end_keywords|endcelldefine|line|nounconnected_drive|pragma|resetall|timescale|unconnected_drive))\\b"),B=/^(`(?:ifdef|ifndef|elsif|else))\b/,W=/^(`(?:elsif|else|endif))\b/,U=i("case checker class clocking config function generate interface module package primitive program property specify sequence table task"),D={};for(var L in U)D[L]="end"+L;D.begin="end",D.casex="endcase",D.casez="endcase",D["do"]="while",D.fork="join;join_any;join_none",D.covergroup="endgroup",D.macro_begin="macro_end";for(var T in k){L=k[T];D[L]&&(D[L]=undefined)}var O=i("always always_comb always_ff always_latch assert assign assume else export for foreach forever if import initial repeat while extern typedef");return{electricInput:u(),startState:function(e){var t={tokenize:null,context:new l((e||0)-v,0,"top","top",!1),indented:0,compilerDirectiveIndented:0,startOfLine:!0};return w.startState&&w.startState(t),t},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),w.token){if((i=w.token(e,t))!==undefined)return i}if(e.eatSpace())return null;f=null,p=null;var i;if("comment"==(i=(t.tokenize||r)(e,t))||"meta"==i||"variable"==i)return"="!==f&&"<="!==f||m(n,"assignment")||(s(t,e.column()+f.length,"assignment","assignment"),null==n.align&&(n.align=!0)),i;null==n.align&&(n.align=!0);var a="assignment"==n.type&&q.test(f)&&n.prev&&n.prev.type===f;if(f==n.type||a){if(a&&(n=c(t)),n=c(t),")"==f){if(n&&"macro"===n.type)for(n=c(t);n&&("statement"==n.type||"assignment"==n.type);)n=c(t)}else if("}"==f&&n&&"statement"===n.type)for(;n&&"statement"==n.type;)n=c(t)}else if((";"==f||","==f)&&("statement"==n.type||"assignment"==n.type)||n.type&&d(p,n.type))for(n=c(t);n&&("statement"==n.type||"assignment"==n.type);)n=c(t);else if("{"==f)s(t,e.column(),"}");else if("["==f)s(t,e.column(),"]");else if("("==f)s(t,e.column(),")");else if(n&&"endcase"==n.type&&":"==f)s(t,e.column(),"statement","case");else if("newstatement"==f)s(t,e.column(),"statement",p);else if("newblock"==f)if("function"!=p||!n||"statement"!=n.type&&"endgroup"!=n.type)if("task"==p&&n&&"statement"==n.type);else if("class"==p&&n&&"statement"==n.type);else{var o=D[p];s(t,e.column(),o,p)}else;else("newmacro"==f||p&&p.match(A))&&("newmacro"==f&&s(t,e.column(),"macro","macro"),p.match(W)&&(t.compilerDirectiveIndented-=g),p.match(B)&&(t.compilerDirectiveIndented+=g));return t.startOfLine=!1,i},indent:function(t,n){if(t.tokenize!=r&&null!=t.tokenize)return e.Pass;if(w.indent){var i=w.indent(t);if(i>=0)return i}var a=t.context,o=n&&n.charAt(0);"statement"==a.type&&"}"==o&&(a=a.prev);var l=!1,s=n.match($);return s&&(l=d(s[0],a.type)),!y&&n.match(A)?n.match(W)?t.compilerDirectiveIndented-g:t.compilerDirectiveIndented:"statement"==a.type?a.indented+("{"==o?0:g):!q.test(a.type)&&"assignment"!=a.type||!a.align||h?")"!=a.type||l?a.indented+(l?0:v):a.indented+g:a.column+(l?0:1)},blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"indent"}}),e.defineMIME("text/x-verilog",{name:"verilog"}),e.defineMIME("text/x-systemverilog",{name:"verilog"});var i={"|":"link",">":"property",$:"variable",$$:"variable","?$":"qualifier","?*":"qualifier","-":"hr","/":"property","/-":"property","@":"variable-3","@-":"variable-3","@++":"variable-3","@+=":"variable-3","@+=-":"variable-3","@--":"variable-3","@-=":"variable-3","%+":"tag","%-":"tag","%":"tag",">>":"tag","<<":"tag","<>":"tag","#":"tag","^":"attribute","^^":"attribute","^!":"attribute","*":"variable-2","**":"variable-2","\\":"keyword",'"':"comment"},r={"/":"beh-hier",">":"beh-hier","-":"phys-hier","|":"pipe","?":"when","@":"stage","\\":"keyword"},a=3,o=!1,l=/^([~!@#\$%\^&\*-\+=\?\/\\\|'"<>]+)([\d\w_]*)/,s=/^[! ]  /,c=/^[! ] */,d=/^\/[\/\*]/;e.defineMIME("text/x-tlv",{name:"verilog",hooks:{electricInput:!1,token:function(e,m){var u=undefined;if(e.sol()&&!m.tlvInBlockComment){"\\"==e.peek()&&(u="def",e.skipToEnd(),e.string.match(/\\SV/)?m.tlvCodeActive=!1:e.string.match(/\\TLV/)&&(m.tlvCodeActive=!0)),m.tlvCodeActive&&0==e.pos&&0==m.indented&&(b=e.match(c,!1))&&(m.indented=b[0].length);var f=m.indented,p=f/a;if(p<=m.tlvIndentationStyle.length){var v=e.string.length==f,g=p*a;if(g<e.string.length){var h=e.string.slice(g),y=h[0];r[y]&&(b=h.match(l))&&i[b[1]]&&(f+=a,"\\"==y&&g>0||(m.tlvIndentationStyle[p]=r[y],o&&(m.statementComment=!1),p++))}if(!v)for(;m.tlvIndentationStyle.length>p;)m.tlvIndentationStyle.pop()}m.tlvNextIndent=f}if(m.tlvCodeActive){var k=!1;o&&(k=" "!=e.peek()&&u===undefined&&!m.tlvInBlockComment&&
//!stream.match(tlvCommentMatch, false) && // not comment start
e.column()==m.tlvIndentationStyle.length*a)&&(m.statementComment&&(k=!1),m.statementComment=e.match(d,!1));var b;if(u!==undefined)u+=" "+t(m,0,"scope-ident");else if(e.pos/a<m.tlvIndentationStyle.length&&(b=e.match(e.sol()?s:/^   /)))u="tlv-indent-"+(e.pos%2==0?"even":"odd")+" "+t(m,e.pos-a,"indent"),"!"==b[0].charAt(0)&&(u+=" tlv-alert-line-prefix"),n(e)&&(u+=" "+t(m,e.pos,"before-scope-ident"));else if(m.tlvInBlockComment)e.match(/^.*?\*\//)?(m.tlvInBlockComment=!1,o&&!e.eol()&&(m.statementComment=!1)):e.skipToEnd(),u="comment";else if((b=e.match(d))&&!m.tlvInBlockComment)"//"==b[0]?e.skipToEnd():m.tlvInBlockComment=!0,u="comment";else if(b=e.match(l)){var w=b[1],_=b[2];i.hasOwnProperty(w)&&(_.length>0||e.eol())?(u=i[w],e.column()==m.indented&&(u+=" "+t(m,e.column(),"scope-ident"))):(e.backUp(e.current().length-1),u="tlv-default")}else e.match(/^\t+/)?u="tlv-tab":e.match(/^[\[\]{}\(\);\:]+/)?u="meta":(b=e.match(/^[mM]4([\+_])?[\w\d_]*/))?u="+"==b[1]?"tlv-m4-plus":"tlv-m4":e.match(/^ +/)?u=e.eol()?"error":"tlv-default":e.match(/^[\w\d_]+/)?u="number":(e.next(),u="tlv-default");k&&(u+=" tlv-statement")}else e.match(/^[mM]4([\w\d_]*)/)&&(u="tlv-m4");return u},indent:function(e){return 1==e.tlvCodeActive?e.tlvNextIndent:-1},startState:function(e){e.tlvIndentationStyle=[],e.tlvCodeActive=!0,e.tlvNextIndent=-1,e.tlvInBlockComment=!1,o&&(e.statementComment=!1)}}})});
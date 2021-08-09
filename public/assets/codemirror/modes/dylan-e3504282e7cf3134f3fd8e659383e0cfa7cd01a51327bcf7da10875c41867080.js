// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("dylan",function(){function e(e,n,t){return n.tokenize=t,t(e,n)}function n(n,r){var o=n.peek();if("'"==o||'"'==o)return n.next(),e(n,r,i(o,"string"));if("/"==o){if(n.next(),n.eat("*"))return e(n,r,t);if(n.eat("/"))return n.skipToEnd(),"comment";n.backUp(1)}else if(/[+\-\d\.]/.test(o)){if(n.match(/^[+-]?[0-9]*\.[0-9]*([esdx][+-]?[0-9]+)?/i)||n.match(/^[+-]?[0-9]+([esdx][+-]?[0-9]+)/i)||n.match(/^[+-]?\d+/))return"number"}else{if("#"==o)return n.next(),'"'==(o=n.peek())?(n.next(),e(n,r,i('"',"string"))):"b"==o?(n.next(),n.eatWhile(/[01]/),"number"):"x"==o?(n.next(),n.eatWhile(/[\da-f]/i),"number"):"o"==o?(n.next(),n.eatWhile(/[0-7]/),"number"):"#"==o?(n.next(),"punctuation"):"["==o||"("==o?(n.next(),"bracket"):n.match(/f|t|all-keys|include|key|next|rest/i)?"atom":(n.eatWhile(/[-a-zA-Z]/),"error");if("~"==o)return n.next(),"="==(o=n.peek())?(n.next(),"="==(o=n.peek())?(n.next(),"operator"):"operator"):"operator";if(":"==o){if(n.next(),"="==(o=n.peek()))return n.next(),"operator";if(":"==o)return n.next(),"punctuation"}else{if(-1!="[](){}".indexOf(o))return n.next(),"bracket";if(-1!=".,".indexOf(o))return n.next(),"punctuation";if(n.match("end"))return"keyword"}}for(var c in f)if(f.hasOwnProperty(c)){var s=f[c];if(s instanceof Array&&s.some(function(e){return n.match(e)})||n.match(s))return l[c]}return/[+\-*\/^=<>&|]/.test(o)?(n.next(),"operator"):n.match("define")?"def":(n.eatWhile(/[\w\-]/),u[n.current()]?m[n.current()]:n.current().match(a)?"variable":(n.next(),"variable-2"))}function t(e,t){for(var i,r=!1,o=!1,a=0;i=e.next();){if("/"==i&&r){if(!(a>0)){t.tokenize=n;break}a--}else"*"==i&&o&&a++;r="*"==i,o="/"==i}return"comment"}function i(e,t){return function(i,r){for(var o,a=!1,f=!1;null!=(o=i.next());){if(o==e&&!a){f=!0;break}a=!a&&"\\"==o}return!f&&a||(r.tokenize=n),t}}var r={unnamedDefinition:["interface"],namedDefinition:["module","library","macro","C-struct","C-union","C-function","C-callable-wrapper"],typeParameterizedDefinition:["class","C-subtype","C-mapped-subtype"],otherParameterizedDefinition:["method","function","C-variable","C-address"],constantSimpleDefinition:["constant"],variableSimpleDefinition:["variable"],otherSimpleDefinition:["generic","domain","C-pointer-type","table"],statement:["if","block","begin","method","case","for","select","when","unless","until","while","iterate","profiling","dynamic-bind"],separator:["finally","exception","cleanup","else","elseif","afterwards"],other:["above","below","by","from","handler","in","instance","let","local","otherwise","slot","subclass","then","to","keyed-by","virtual"],signalingCalls:["signal","error","cerror","break","check-type","abort"]};r.otherDefinition=r.unnamedDefinition.concat(r.namedDefinition).concat(r.otherParameterizedDefinition),r.definition=r.typeParameterizedDefinition.concat(r.otherDefinition),r.parameterizedDefinition=r.typeParameterizedDefinition.concat(r.otherParameterizedDefinition),r.simpleDefinition=r.constantSimpleDefinition.concat(r.variableSimpleDefinition).concat(r.otherSimpleDefinition),r.keyword=r.statement.concat(r.separator).concat(r.other);var o="[-_a-zA-Z?!*@<>$%]+",a=new RegExp("^"+o),f={symbolKeyword:o+":",symbolClass:"<"+o+">",symbolGlobal:"\\*"+o+"\\*",symbolConstant:"\\$"+o},l={symbolKeyword:"atom",symbolClass:"tag",symbolGlobal:"variable-2",symbolConstant:"variable-3"};for(var c in f)f.hasOwnProperty(c)&&(f[c]=new RegExp("^"+f[c]));f.keyword=[/^with(?:out)?-[-_a-zA-Z?!*@<>$%]+/];var s={};s.keyword="keyword",s.definition="def",s.simpleDefinition="def",s.signalingCalls="builtin";var u={},m={};return["keyword","definition","simpleDefinition","signalingCalls"].forEach(function(e){r[e].forEach(function(n){u[n]=e,m[n]=s[e]})}),{startState:function(){return{tokenize:n,currentIndent:0}},token:function(e,n){if(e.eatSpace())return null;return n.tokenize(e,n)},blockCommentStart:"/*",blockCommentEnd:"*/"}}),e.defineMIME("text/x-dylan","dylan")});
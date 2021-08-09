// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Mathematica mode copyright (c) 2015 by Calin Barbat
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("mathematica",function(){function e(e,n){var r;return'"'===(r=e.next())?(n.tokenize=t,n.tokenize(e,n)):"("===r&&e.eat("*")?(n.commentLevel++,n.tokenize=a,n.tokenize(e,n)):(e.backUp(1),e.match(m,!0,!1)?"number":e.match(c,!0,!1)?"number":e.match(/(?:In|Out)\[[0-9]*\]/,!0,!1)?"atom":e.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::usage)/,!0,!1)?"meta":e.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::[a-zA-Z\$][a-zA-Z0-9\$]*):?/,!0,!1)?"string-2":e.match(/([a-zA-Z\$][a-zA-Z0-9\$]*\s*:)(?:(?:[a-zA-Z\$][a-zA-Z0-9\$]*)|(?:[^:=>~@\^\&\*\)\[\]'\?,\|])).*/,!0,!1)?"variable-2":e.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+[a-zA-Z\$][a-zA-Z0-9\$]*/,!0,!1)?"variable-2":e.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+/,!0,!1)?"variable-2":e.match(/_+[a-zA-Z\$][a-zA-Z0-9\$]*/,!0,!1)?"variable-2":e.match(/\\\[[a-zA-Z\$][a-zA-Z0-9\$]*\]/,!0,!1)?"variable-3":e.match(/(?:\[|\]|{|}|\(|\))/,!0,!1)?"bracket":e.match(/(?:#[a-zA-Z\$][a-zA-Z0-9\$]*|#+[0-9]?)/,!0,!1)?"variable-2":e.match(i,!0,!1)?"keyword":e.match(/(?:\\|\+|\-|\*|\/|,|;|\.|:|@|~|=|>|<|&|\||_|`|'|\^|\?|!|%)/,!0,!1)?"operator":(e.next(),"error"))}function t(t,a){for(var n,r=!1,o=!1;null!=(n=t.next());){if('"'===n&&!o){r=!0;break}o=!o&&"\\"===n}return r&&!o&&(a.tokenize=e),"string"}function a(t,a){for(var n,r;a.commentLevel>0&&null!=(r=t.next());)"("===n&&"*"===r&&a.commentLevel++,"*"===n&&")"===r&&a.commentLevel--,n=r;return a.commentLevel<=0&&(a.tokenize=e),"comment"}var n="[a-zA-Z\\$][a-zA-Z0-9\\$]*",r="(?:\\.\\d+|\\d+\\.\\d*|\\d+)",o="(?:`(?:`?"+r+")?)",m=new RegExp("(?:"+"(?:\\d+)"+"(?:\\^\\^"+"(?:\\.\\w+|\\w+\\.\\w*|\\w+)"+o+"?(?:\\*\\^[+-]?\\d+)?))"),c=new RegExp("(?:"+r+o+"?(?:\\*\\^[+-]?\\d+)?)"),i=new RegExp("(?:`?)(?:"+n+")(?:`(?:"+n+"))*(?:`?)");return{startState:function(){return{tokenize:e,commentLevel:0}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)},blockCommentStart:"(*",blockCommentEnd:"*)"}}),e.defineMIME("text/x-mathematica",{name:"mathematica"})});
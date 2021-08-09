// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function n(n){if(n.getOption("disableInput"))return e.Pass;for(var o,i=n.listSelections(),r=[],l=0;l<i.length;l++){var m=i[l].head,s=n.getTokenAt(m);if("comment"!=s.type)return e.Pass;var c=e.innerMode(n.getMode(),s.state).mode;if(o){if(o!=c)return e.Pass}else o=c;var f=null;if(o.blockCommentStart&&o.blockCommentContinue){var a=s.string.indexOf(o.blockCommentEnd),u=n.getRange(e.Pos(m.line,0),e.Pos(m.line,s.end));if(-1!=a&&a==s.string.length-o.blockCommentEnd.length&&m.ch>=a);else if(0==s.string.indexOf(o.blockCommentStart)){if(f=u.slice(0,s.start),!/^\s*$/.test(f)){f="";for(var d=0;d<s.start;++d)f+=" "}}else-1!=(C=u.indexOf(o.blockCommentContinue))&&C+o.blockCommentContinue.length>s.start&&/^\s*$/.test(u.slice(0,C))&&(f=u.slice(0,C));null!=f&&(f+=o.blockCommentContinue)}if(null==f&&o.lineComment&&t(n)){var C,g=n.getLine(m.line);(C=g.indexOf(o.lineComment))>-1&&(f=g.slice(0,C),/\S/.test(f)?f=null:f+=o.lineComment+g.slice(C+o.lineComment.length).match(/^\s*/)[0])}if(null==f)return e.Pass;r[l]="\n"+f}n.operation(function(){for(var e=i.length-1;e>=0;e--)n.replaceRange(r[e],i[e].from(),i[e].to(),"+insert")})}function t(e){var n=e.getOption("continueComments");return!n||"object"!=typeof n||!1!==n.continueLineComment}for(var o=["clike","css","javascript"],i=0;i<o.length;++i)e.extendMode(o[i],{blockCommentContinue:" * "});e.defineOption("continueComments",null,function(t,o,i){if(i&&i!=e.Init&&t.removeKeyMap("continueComment"),o){var r="Enter";"string"==typeof o?r=o:"object"==typeof o&&o.key&&(r=o.key);var l={name:"continueComment"};l[r]=n,t.addKeyMap(l)}})});
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed"],t):t(CodeMirror)}(function(t){"use strict";var e={noEndTag:!0,soyState:"param-def"},a={alias:{noEndTag:!0},delpackage:{noEndTag:!0},namespace:{noEndTag:!0,soyState:"namespace-def"},"@attribute":e,"@attribute?":e,"@param":e,"@param?":e,"@inject":e,"@inject?":e,"@state":e,template:{soyState:"templ-def",variableScope:!0},extern:{soyState:"param-def"},"export":{soyState:"export"},literal:{},msg:{},fallbackmsg:{noEndTag:!0,reduceIndent:!0},select:{},plural:{},"let":{soyState:"var-def"},"if":{},javaimpl:{},jsimpl:{},elseif:{noEndTag:!0,reduceIndent:!0},"else":{noEndTag:!0,reduceIndent:!0},"switch":{},"case":{noEndTag:!0,reduceIndent:!0},"default":{noEndTag:!0,reduceIndent:!0},foreach:{variableScope:!0,soyState:"for-loop"},ifempty:{noEndTag:!0,reduceIndent:!0},"for":{variableScope:!0,soyState:"for-loop"},call:{soyState:"templ-ref"},param:{soyState:"param-ref"},print:{noEndTag:!0},deltemplate:{soyState:"templ-def",variableScope:!0},delcall:{soyState:"templ-ref"},log:{},element:{variableScope:!0},velog:{},"const":{soyState:"const-def"}},n=Object.keys(a).filter(function(t){return!a[t].noEndTag||a[t].reduceIndent});t.defineMode("soy",function(e){function r(t){return t[t.length-1]}function o(t,e,a){if(t.sol()){for(var n=0;n<e.indent&&t.eat(/\s/);n++);if(n)return null}var o=t.string,s=a.exec(o.substr(t.pos));s&&(t.string=o.substr(0,t.pos+s.index));var l=t.hideFirstChars(e.indent,function(){var a=r(e.localStates);return a.mode.token(t,a.state)});return t.string=o,l}function s(t,e){for(;t;){if(t.element===e)return!0;t=t.next}return!1}function l(t,e){return{element:e,next:t}}function i(t){t.context&&(t.context.scope&&(t.variables=t.context.scope),t.context=t.context.previousContext)}function p(t,e,a){return s(t,e)?"variable-2":a?"variable":"variable-2 error"}function c(t,e,a){this.previousContext=t,this.tag=e,this.kind=null,this.scope=a}function u(t,e){var a;return t.match(/[[]/)?(e.soyState.push("list-literal"),e.context=new c(e.context,"list-literal",e.variables),e.lookupVariables=!1,null):t.match(/map\b/)?(e.soyState.push("map-literal"),"keyword"):t.match(/record\b/)?(e.soyState.push("record-literal"),"keyword"):t.match(/([\w]+)(?=\()/)?"variable callee":(a=t.match(/^["']/))?(e.soyState.push("string"),e.quoteKind=a[0],"string"):t.match(/^[(]/)?(e.soyState.push("open-parentheses"),null):t.match(/(null|true|false)(?!\w)/)||t.match(/0x([0-9a-fA-F]{2,})/)||t.match(/-?([0-9]*[.])?[0-9]+(e[0-9]*)?/)?"atom":t.match(/(\||[+\-*\/%]|[=!]=|\?:|[<>]=?)/)?"operator":(a=t.match(/^\$([\w]+)/))?p(e.variables,a[1],!e.lookupVariables):(a=t.match(/^\w+/))?/^(?:as|and|or|not|in|if)$/.test(a[0])?"keyword":null:(t.next(),null)}var m=t.getMode(e,"text/plain"),d={html:t.getMode(e,{name:"text/html",multilineTagIndentFactor:2,multilineTagIndentPastTag:!1,allowMissingTagName:!0}),attributes:m,text:m,uri:m,trusted_resource_uri:m,css:t.getMode(e,"text/css"),js:t.getMode(e,{name:"text/javascript",statementIndent:2*e.indentUnit})};return{startState:function(){return{soyState:[],variables:l(null,"ij"),scopes:null,indent:0,quoteKind:null,context:null,lookupVariables:!0,localStates:[{mode:d.html,state:t.startState(d.html)}]}},copyState:function(e){return{tag:e.tag,soyState:e.soyState.concat([]),variables:e.variables,context:e.context,indent:e.indent,quoteKind:e.quoteKind,lookupVariables:e.lookupVariables,localStates:e.localStates.map(function(e){return{mode:e.mode,state:t.copyState(e.mode,e.state)}})}},token:function(s,m){switch(r(m.soyState)){case"comment":if(s.match(/^.*?\*\//)?m.soyState.pop():s.skipToEnd(),!m.context||!m.context.scope)for(var y=/@param\??\s+(\S+)/g,h=s.current();f=y.exec(h);)m.variables=l(m.variables,f[1]);return"comment";case"string":var f;return(f=s.match(/^.*?(["']|\\[\s\S])/))?f[1]==m.quoteKind&&(m.quoteKind=null,m.soyState.pop()):s.skipToEnd(),"string"}if(!m.soyState.length||"literal"!=r(m.soyState)){if(s.match(/^\/\*/))return m.soyState.push("comment"),"comment";if(s.match(s.sol()?/^\s*\/\/.*/:/^\s+\/\/.*/))return"comment"}switch(r(m.soyState)){case"templ-def":return(f=s.match(/^\.?([\w]+(?!\.[\w]+)*)/))?(m.soyState.pop(),"def"):(s.next(),null);case"templ-ref":return(f=s.match(/(\.?[a-zA-Z_][a-zA-Z_0-9]+)+/))?(m.soyState.pop(),"."==f[0][0]?"variable-2":"variable"):(f=s.match(/^\$([\w]+)/))?(m.soyState.pop(),p(m.variables,f[1],!m.lookupVariables)):(s.next(),null);case"namespace-def":return(f=s.match(/^\.?([\w\.]+)/))?(m.soyState.pop(),"variable"):(s.next(),null);case"param-def":return(f=s.match(/^\*/))?(m.soyState.pop(),m.soyState.push("param-type"),"type"):(f=s.match(/^\w+/))?(m.variables=l(m.variables,f[0]),m.soyState.pop(),m.soyState.push("param-type"),"def"):(s.next(),null);case"param-ref":return(f=s.match(/^\w+/))?(m.soyState.pop(),"property"):(s.next(),null);case"open-parentheses":return s.match(/[)]/)?(m.soyState.pop(),null):u(s,m);case"param-type":var S=s.peek();return-1!="}]=>,".indexOf(S)?(m.soyState.pop(),null):"["==S?(m.soyState.push("param-type-record"),null):"("==S?(m.soyState.push("param-type-template"),null):"<"==S?(m.soyState.push("param-type-parameter"),null):(f=s.match(/^([\w]+|[?])/))?"type":(s.next(),null);case"param-type-record":return"]"==(S=s.peek())?(m.soyState.pop(),null):s.match(/^\w+/)?(m.soyState.push("param-type"),"property"):(s.next(),null);case"param-type-parameter":return s.match(/^[>]/)?(m.soyState.pop(),null):s.match(/^[<,]/)?(m.soyState.push("param-type"),null):(s.next(),null);case"param-type-template":return s.match(/[>]/)?(m.soyState.pop(),m.soyState.push("param-type"),null):s.match(/^\w+/)?(m.soyState.push("param-type"),"def"):(s.next(),null);case"var-def":return(f=s.match(/^\$([\w]+)/))?(m.variables=l(m.variables,f[1]),m.soyState.pop(),"def"):(s.next(),null);case"for-loop":return s.match(/\bin\b/)?(m.soyState.pop(),"keyword"):"$"==s.peek()?(m.soyState.push("var-def"),null):(s.next(),null);case"record-literal":return s.match(/^[)]/)?(m.soyState.pop(),null):s.match(/[(,]/)?(m.soyState.push("map-value"),m.soyState.push("record-key"),null):(s.next(),null);case"map-literal":return s.match(/^[)]/)?(m.soyState.pop(),null):s.match(/[(,]/)?(m.soyState.push("map-value"),m.soyState.push("map-value"),null):(s.next(),null);case"list-literal":return s.match("]")?(m.soyState.pop(),m.lookupVariables=!0,i(m),null):s.match(/\bfor\b/)?(m.lookupVariables=!0,m.soyState.push("for-loop"),"keyword"):u(s,m);case"record-key":return s.match(/[\w]+/)?"property":s.match(/^[:]/)?(m.soyState.pop(),null):(s.next(),null);case"map-value":return")"==s.peek()||","==s.peek()||s.match(/^[:)]/)?(m.soyState.pop(),null):u(s,m);case"import":return s.eat(";")?(m.soyState.pop(),m.indent-=2*e.indentUnit,null):s.match(/\w+(?=\s+as)/)?"variable":(f=s.match(/\w+/))?/(from|as)/.test(f[0])?"keyword":"def":(f=s.match(/^["']/))?(m.soyState.push("string"),m.quoteKind=f[0],"string"):(s.next(),null);case"tag":m.tag===undefined?(k=!0,E=""):E=(k="/"==m.tag[0])?m.tag.substring(1):m.tag;var x=a[E];if(s.match(/^\/?}/)){var g="/}"==s.current();return g&&!k&&i(m),"/template"==m.tag||"/deltemplate"==m.tag?(m.variables=l(null,"ij"),m.indent=0):m.indent-=e.indentUnit*(g||-1==n.indexOf(m.tag)?2:1),m.soyState.pop(),"keyword"}if(s.match(/^([\w?]+)(?==)/)){if(m.context&&m.context.tag==E&&"kind"==s.current()&&(f=s.match(/^="([^"]+)/,!1))){var b=f[1];m.context.kind=b;var v=d[b]||d.html;(j=r(m.localStates)).mode.indent&&(m.indent+=j.mode.indent(j.state,"","")),m.localStates.push({mode:v,state:t.startState(v)})}return"attribute"}return u(s,m);case"template-call-expression":return s.match(/^([\w-?]+)(?==)/)?"attribute":s.eat(">")?(m.soyState.pop(),"keyword"):s.eat("/>")?(m.soyState.pop(),"keyword"):u(s,m);case"literal":return s.match("{/literal}",!1)?(m.soyState.pop(),this.token(s,m)):o(s,m,/\{\/literal}/);case"export":if(f=s.match(/\w+/)){if(m.soyState.pop(),"const"==f)return m.soyState.push("const-def"),"keyword";if("extern"==f)return m.soyState.push("param-def"),"keyword"}else s.next();return null;case"const-def":return s.match(/^\w+/)?(m.soyState.pop(),"def"):(s.next(),null)}if(s.match("{literal}"))return m.indent+=e.indentUnit,m.soyState.push("literal"),m.context=new c(m.context,"literal",m.variables),"keyword";if(f=s.match(/^\{([/@\\]?\w+\??)(?=$|[\s}]|\/[/*])/)){var w=m.tag;m.tag=f[1];var k="/"==m.tag[0],T=!!a[m.tag],E=k?m.tag.substring(1):m.tag;x=a[E];"/switch"!=m.tag&&(m.indent+=((k||x&&x.reduceIndent)&&"switch"!=w?1:2)*e.indentUnit),m.soyState.push("tag");var I=!1;if(x)if(k||x.soyState&&m.soyState.push(x.soyState),x.noEndTag||!T&&k){if(k){var U="extern"==E&&m.context&&"export"==m.context.tag;if(!m.context||m.context.tag!=E&&!U)I=!0;else if(m.context){if(m.context.kind){m.localStates.pop();var j;(j=r(m.localStates)).mode.indent&&(m.indent-=j.mode.indent(j.state,"",""))}i(m)}}}else m.context=new c(m.context,m.tag,x.variableScope?m.variables:null);else k&&(I=!0);return(I?"error ":"")+"keyword"}return s.eat("{")?(m.tag="print",m.indent+=2*e.indentUnit,m.soyState.push("tag"),"keyword"):!m.context&&s.match(/\bimport\b/)?(m.soyState.push("import"),m.indent+=2*e.indentUnit,"keyword"):(f=s.match("<{"))?(m.soyState.push("template-call-expression"),m.indent+=2*e.indentUnit,m.soyState.push("tag"),"keyword"):(f=s.match("</>"))?(m.indent-=1*e.indentUnit,"keyword"):o(s,m,/\{|\s+\/\/|\/\*/)},indent:function(a,n,o){var s=a.indent,l=r(a.soyState);if("comment"==l)return t.Pass;if("literal"==l)/^\{\/literal}/.test(n)&&(s-=e.indentUnit);else{if(/^\s*\{\/(template|deltemplate)\b/.test(n))return 0;/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(n)&&(s-=e.indentUnit),"switch"!=a.tag&&/^\{(case|default)\b/.test(n)&&(s-=e.indentUnit),/^\{\/switch\b/.test(n)&&(s-=e.indentUnit)}var i=r(a.localStates);return s&&i.mode.indent&&(s+=i.mode.indent(i.state,n,o)),s},innerMode:function(t){return t.soyState.length&&"literal"!=r(t.soyState)?null:r(t.localStates)},electricInput:/^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",useInnerComments:!1,fold:"indent"}},"htmlmixed"),t.registerHelper("wordChars","soy",/[\w$]/),t.registerHelper("hintWords","soy",Object.keys(a).concat(["css","debugger"])),t.defineMIME("text/x-soy","soy")});
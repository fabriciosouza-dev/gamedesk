import{countColumn}from"./misc.js";class StringStream{constructor(t,s,i){this.pos=this.start=0,this.string=t,this.tabSize=s||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=i}eol(){return this.pos>=this.string.length}sol(){return this.pos==this.lineStart}peek(){return this.string.charAt(this.pos)||undefined}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(t){let s,i=this.string.charAt(this.pos);if(s="string"==typeof t?i==t:i&&(t.test?t.test(i):t(i)))return++this.pos,i}eatWhile(t){let s=this.pos;for(;this.eat(t););return this.pos>s}eatSpace(){let t=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t}skipToEnd(){this.pos=this.string.length}skipTo(t){let s=this.string.indexOf(t,this.pos);if(s>-1)return this.pos=s,!0}backUp(t){this.pos-=t}column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=countColumn(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?countColumn(this.string,this.lineStart,this.tabSize):0)}indentation(){return countColumn(this.string,null,this.tabSize)-(this.lineStart?countColumn(this.string,this.lineStart,this.tabSize):0)}match(t,s,i){if("string"!=typeof t){let i=this.string.slice(this.pos).match(t);return i&&i.index>0?null:(i&&!1!==s&&(this.pos+=i[0].length),i)}{let e=t=>i?t.toLowerCase():t;if(e(this.string.substr(this.pos,t.length))==e(t))return!1!==s&&(this.pos+=t.length),!0}}current(){return this.string.slice(this.start,this.pos)}hideFirstChars(t,s){this.lineStart+=t;try{return s()}finally{this.lineStart-=t}}lookAhead(t){let s=this.lineOracle;return s&&s.lookAhead(t)}baseToken(){let t=this.lineOracle;return t&&t.baseToken(this.pos)}}export default StringStream;
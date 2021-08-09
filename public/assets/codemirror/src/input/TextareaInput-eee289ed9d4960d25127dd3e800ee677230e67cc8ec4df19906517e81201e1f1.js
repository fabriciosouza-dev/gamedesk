import{operation,runInOp}from"../display/operations.js";import{prepareSelection}from"../display/selection.js";import{applyTextInput,copyableRanges,handlePaste,hiddenTextarea,setLastCopied}from"./input.js";import{cursorCoords,posFromMouse}from"../measurement/position_measurement.js";import{eventInWidget}from"../measurement/widgets.js";import{simpleSelection}from"../model/selection.js";import{selectAll,setSelection}from"../model/selection_updates.js";import{captureRightClick,ie,ie_version,ios,mac,mobile,presto,webkit}from"../util/browser.js";import{activeElt,removeChildrenAndAdd,selectInput}from"../util/dom.js";import{e_preventDefault,e_stop,off,on,signalDOMEvent}from"../util/event.js";import{hasSelection}from"../util/feature_detection.js";import{Delayed,sel_dontScroll}from"../util/misc.js";export default class TextareaInput{constructor(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new Delayed,this.hasSelection=!1,this.composing=null}init(e){function t(e){if(!signalDOMEvent(o,e)){if(o.somethingSelected())setLastCopied({lineWise:!1,text:o.getSelections()});else{if(!o.options.lineWiseCopyCut)return;{let t=copyableRanges(o);setLastCopied({lineWise:!0,text:t.text}),"cut"==e.type?o.setSelections(t.ranges,null,sel_dontScroll):(i.prevInput="",s.value=t.text.join("\n"),selectInput(s))}}"cut"==e.type&&(o.state.cutIncoming=+new Date)}}let i=this,o=this.cm;this.createField(e);const s=this.textarea;e.wrapper.insertBefore(this.wrapper,e.wrapper.firstChild),ios&&(s.style.width="0px"),on(s,"input",()=>{ie&&ie_version>=9&&this.hasSelection&&(this.hasSelection=null),i.poll()}),on(s,"paste",e=>{signalDOMEvent(o,e)||handlePaste(e,o)||(o.state.pasteIncoming=+new Date,i.fastPoll())}),on(s,"cut",t),on(s,"copy",t),on(e.scroller,"paste",t=>{if(eventInWidget(e,t)||signalDOMEvent(o,t))return;if(!s.dispatchEvent)return o.state.pasteIncoming=+new Date,void i.focus();const n=new Event("paste");n.clipboardData=t.clipboardData,s.dispatchEvent(n)}),on(e.lineSpace,"selectstart",t=>{eventInWidget(e,t)||e_preventDefault(t)}),on(s,"compositionstart",()=>{let e=o.getCursor("from");i.composing&&i.composing.range.clear(),i.composing={start:e,range:o.markText(e,o.getCursor("to"),{className:"CodeMirror-composing"})}}),on(s,"compositionend",()=>{i.composing&&(i.poll(),i.composing.range.clear(),i.composing=null)})}createField(e){this.wrapper=hiddenTextarea(),this.textarea=this.wrapper.firstChild}screenReaderLabelChanged(e){e?this.textarea.setAttribute("aria-label",e):this.textarea.removeAttribute("aria-label")}prepareSelection(){let e=this.cm,t=e.display,i=e.doc,o=prepareSelection(e);if(e.options.moveInputWithCursor){let s=cursorCoords(e,i.sel.primary().head,"div"),n=t.wrapper.getBoundingClientRect(),l=t.lineDiv.getBoundingClientRect();o.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,s.top+l.top-n.top)),o.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,s.left+l.left-n.left))}return o}showSelection(e){let t=this.cm.display;removeChildrenAndAdd(t.cursorDiv,e.cursors),removeChildrenAndAdd(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")}reset(e){if(this.contextMenuPending||this.composing)return;let t=this.cm;if(t.somethingSelected()){this.prevInput="";let e=t.getSelection();this.textarea.value=e,t.state.focused&&selectInput(this.textarea),ie&&ie_version>=9&&(this.hasSelection=e)}else e||(this.prevInput=this.textarea.value="",ie&&ie_version>=9&&(this.hasSelection=null))}getField(){return this.textarea}supportsTouch(){return!1}focus(){if("nocursor"!=this.cm.options.readOnly&&(!mobile||activeElt()!=this.textarea))try{this.textarea.focus()}catch(e){}}blur(){this.textarea.blur()}resetPosition(){this.wrapper.style.top=this.wrapper.style.left=0}receivedFocus(){this.slowPoll()}slowPoll(){this.pollingFast||this.polling.set(this.cm.options.pollInterval,()=>{this.poll(),this.cm.state.focused&&this.slowPoll()})}fastPoll(){function e(){i.poll()||t?(i.pollingFast=!1,i.slowPoll()):(t=!0,i.polling.set(60,e))}let t=!1,i=this;i.pollingFast=!0,i.polling.set(20,e)}poll(){let e=this.cm,t=this.textarea,i=this.prevInput;if(this.contextMenuPending||!e.state.focused||hasSelection(t)&&!i&&!this.composing||e.isReadOnly()||e.options.disableInput||e.state.keySeq)return!1;let o=t.value;if(o==i&&!e.somethingSelected())return!1;if(ie&&ie_version>=9&&this.hasSelection===o||mac&&/[\uf700-\uf7ff]/.test(o))return e.display.input.reset(),!1;if(e.doc.sel==e.display.selForContextMenu){let e=o.charCodeAt(0);if(8203!=e||i||(i="\u200b"),8666==e)return this.reset(),this.cm.execCommand("undo")}let s=0,n=Math.min(i.length,o.length);for(;s<n&&i.charCodeAt(s)==o.charCodeAt(s);)++s;return runInOp(e,()=>{applyTextInput(e,o.slice(s),i.length-s,null,this.composing?"*compose":null),o.length>1e3||o.indexOf("\n")>-1?t.value=this.prevInput="":this.prevInput=o,this.composing&&(this.composing.range.clear(),this.composing.range=e.markText(this.composing.start,e.getCursor("to"),{className:"CodeMirror-composing"}))}),!0}ensurePolled(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)}onKeyPress(){ie&&ie_version>=9&&(this.hasSelection=null),this.fastPoll()}onContextMenu(e){function t(){if(null!=l.selectionStart){let e=s.somethingSelected(),t="\u200b"+(e?l.value:"");l.value="\u21da",l.value=t,o.prevInput=e?"":"\u200b",l.selectionStart=1,l.selectionEnd=t.length,n.selForContextMenu=s.doc.sel}}function i(){if(o.contextMenuPending==i&&(o.contextMenuPending=!1,o.wrapper.style.cssText=c,l.style.cssText=p,ie&&ie_version<9&&n.scrollbars.setScrollTop(n.scroller.scrollTop=a),null!=l.selectionStart)){(!ie||ie&&ie_version<9)&&t();let e=0,i=()=>{n.selForContextMenu==s.doc.sel&&0==l.selectionStart&&l.selectionEnd>0&&"\u200b"==o.prevInput?operation(s,selectAll)(s):e++<10?n.detectingSelectAll=setTimeout(i,500):(n.selForContextMenu=null,n.input.reset())};n.detectingSelectAll=setTimeout(i,200)}}let o=this,s=o.cm,n=s.display,l=o.textarea;o.contextMenuPending&&o.contextMenuPending();let r=posFromMouse(s,e),a=n.scroller.scrollTop;if(!r||presto)return;s.options.resetSelectionOnContextMenu&&-1==s.doc.sel.contains(r)&&operation(s,setSelection)(s.doc,simpleSelection(r),sel_dontScroll);let p=l.style.cssText,c=o.wrapper.style.cssText,u=o.wrapper.offsetParent.getBoundingClientRect();o.wrapper.style.cssText="position: static",l.style.cssText=`position: absolute; width: 30px; height: 30px;\n      top: ${e.clientY-u.top-5}px; left: ${e.clientX-u.left-5}px;\n      z-index: 1000; background: ${ie?"rgba(255, 255, 255, .05)":"transparent"};\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;let h;if(webkit&&(h=window.scrollY),n.input.focus(),webkit&&window.scrollTo(null,h),n.input.reset(),s.somethingSelected()||(l.value=o.prevInput=" "),o.contextMenuPending=i,n.selForContextMenu=s.doc.sel,clearTimeout(n.detectingSelectAll),ie&&ie_version>=9&&t(),captureRightClick){e_stop(e);let t=()=>{off(window,"mouseup",t),setTimeout(i,20)};on(window,"mouseup",t)}else setTimeout(i,50)}readOnlyChanged(e){e||this.reset(),this.textarea.disabled="nocursor"==e,this.textarea.readOnly=!!e}setUneditable(){}};TextareaInput.prototype.needsContentAttribute=!1;
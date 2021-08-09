function filterSelectionChange(e,n,t){let i={ranges:n.ranges,update:function(n){this.ranges=[];for(let t=0;t<n.length;t++)this.ranges[t]=new Range(clipPos(e,n[t].anchor),clipPos(e,n[t].head))},origin:t&&t.origin};return signal(e,"beforeSelectionChange",e,i),e.cm&&signal(e.cm,"beforeSelectionChange",e.cm,i),i.ranges!=n.ranges?normalizeSelection(e.cm,i.ranges,i.ranges.length-1):n}function setSelectionInner(e,n){n.equals(e.sel)||(e.sel=n,e.cm&&(e.cm.curOp.updateInput=1,e.cm.curOp.selectionChanged=!0,signalCursorActivity(e.cm)),signalLater(e,"cursorActivity",e))}function skipAtomicInSelection(e,n,t,i){let l;for(let o=0;o<n.ranges.length;o++){let r=n.ranges[o],s=n.ranges.length==e.sel.ranges.length&&e.sel.ranges[o],c=skipAtomic(e,r.anchor,s&&s.anchor,t,i),a=skipAtomic(e,r.head,s&&s.head,t,i);(l||c!=r.anchor||a!=r.head)&&(l||(l=n.ranges.slice(0,o)),l[o]=new Range(c,a))}return l?normalizeSelection(e.cm,l,n.primIndex):n}function skipAtomicInner(e,n,t,i,l){let o=getLine(e,n.line);if(o.markedSpans)for(let r=0;r<o.markedSpans.length;++r){let s=o.markedSpans[r],c=s.marker,a="selectLeft"in c?!c.selectLeft:c.inclusiveLeft,m="selectRight"in c?!c.selectRight:c.inclusiveRight;if((null==s.from||(a?s.from<=n.ch:s.from<n.ch))&&(null==s.to||(m?s.to>=n.ch:s.to>n.ch))){if(l&&(signal(c,"beforeCursorEnter"),c.explicitlyCleared)){if(o.markedSpans){--r;continue}break}if(!c.atomic)continue;if(t){let r,s=c.find(i<0?1:-1);if((i<0?m:a)&&(s=movePos(e,s,-i,s&&s.line==n.line?o:null)),s&&s.line==n.line&&(r=cmp(s,t))&&(i<0?r<0:r>0))return skipAtomicInner(e,s,n,i,l)}let s=c.find(i<0?-1:1);return(i<0?a:m)&&(s=movePos(e,s,i,s.line==n.line?o:null)),s?skipAtomicInner(e,s,n,i,l):null}}return n}function movePos(e,n,t,i){return t<0&&0==n.ch?n.line>e.first?clipPos(e,Pos(n.line-1)):null:t>0&&n.ch==(i||getLine(e,n.line)).text.length?n.line<e.first+e.size-1?Pos(n.line+1,0):null:new Pos(n.line,n.ch+t)}import{signalLater}from"../util/operation_group.js";import{ensureCursorVisible}from"../display/scrolling.js";import{clipPos,cmp,Pos}from"../line/pos.js";import{getLine}from"../line/utils_line.js";import{hasHandler,signal,signalCursorActivity}from"../util/event.js";import{lst,sel_dontScroll}from"../util/misc.js";import{addSelectionToHistory}from"./history.js";import{normalizeSelection,Range,Selection,simpleSelection}from"./selection.js";export function extendRange(e,n,t,i){if(i){let i=e.anchor;if(t){let e=cmp(n,i)<0;e!=cmp(t,i)<0?(i=n,n=t):e!=cmp(n,t)<0&&(n=t)}return new Range(i,n)}return new Range(t||n,n)};export function extendSelection(e,n,t,i,l){null==l&&(l=e.cm&&(e.cm.display.shift||e.extend)),setSelection(e,new Selection([extendRange(e.sel.primary(),n,t,l)],0),i)};export function extendSelections(e,n,t){let i=[],l=e.cm&&(e.cm.display.shift||e.extend);for(let t=0;t<e.sel.ranges.length;t++)i[t]=extendRange(e.sel.ranges[t],n[t],null,l);setSelection(e,normalizeSelection(e.cm,i,e.sel.primIndex),t)};export function replaceOneSelection(e,n,t,i){let l=e.sel.ranges.slice(0);l[n]=t,setSelection(e,normalizeSelection(e.cm,l,e.sel.primIndex),i)};export function setSimpleSelection(e,n,t,i){setSelection(e,simpleSelection(n,t),i)};export function setSelectionReplaceHistory(e,n,t){let i=e.history.done,l=lst(i);l&&l.ranges?(i[i.length-1]=n,setSelectionNoUndo(e,n,t)):setSelection(e,n,t)};export function setSelection(e,n,t){setSelectionNoUndo(e,n,t),addSelectionToHistory(e,e.sel,e.cm?e.cm.curOp.id:NaN,t)};export function setSelectionNoUndo(e,n,t){(hasHandler(e,"beforeSelectionChange")||e.cm&&hasHandler(e.cm,"beforeSelectionChange"))&&(n=filterSelectionChange(e,n,t));setSelectionInner(e,skipAtomicInSelection(e,n,t&&t.bias||(cmp(n.primary().head,e.sel.primary().head)<0?-1:1),!0)),t&&!1===t.scroll||!e.cm||"nocursor"==e.cm.getOption("readOnly")||ensureCursorVisible(e.cm)};export function reCheckSelection(e){setSelectionInner(e,skipAtomicInSelection(e,e.sel,null,!1))};export function skipAtomic(e,n,t,i,l){let o=i||1,r=skipAtomicInner(e,n,t,o,l)||!l&&skipAtomicInner(e,n,t,o,!0)||skipAtomicInner(e,n,t,-o,l)||!l&&skipAtomicInner(e,n,t,-o,!0);return r||(e.cantEdit=!0,Pos(e.first,0))};export function selectAll(e){e.setSelection(Pos(e.firstLine(),0),Pos(e.lastLine()),sel_dontScroll)};
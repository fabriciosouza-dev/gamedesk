function adjustForChange(e,n){if(cmp(e,n.from)<0)return e;if(cmp(e,n.to)<=0)return changeEnd(n);let t=e.line+n.text.length-(n.to.line-n.from.line)-1,o=e.ch;return e.line==n.to.line&&(o+=changeEnd(n).ch-n.to.ch),Pos(t,o)}function offsetPos(e,n,t){return e.line==n.line?Pos(t.line,e.ch-n.ch+t.ch):Pos(t.line+(e.line-n.line),e.ch)}import{cmp,Pos}from"../line/pos.js";import{lst}from"../util/misc.js";import{normalizeSelection,Range,Selection}from"./selection.js";export function changeEnd(e){return e.text?Pos(e.from.line+e.text.length-1,lst(e.text).length+(1==e.text.length?e.from.ch:0)):e.to};export function computeSelAfterChange(e,n){let t=[];for(let o=0;o<e.sel.ranges.length;o++){let l=e.sel.ranges[o];t.push(new Range(adjustForChange(l.anchor,n),adjustForChange(l.head,n)))}return normalizeSelection(e.cm,t,e.sel.primIndex)};export function computeReplacedSel(e,n,t){let o=[],l=Pos(e.first,0),r=l;for(let i=0;i<n.length;i++){let s=n[i],c=offsetPos(s.from,l,r),h=offsetPos(changeEnd(s),l,r);if(l=s.to,r=h,"around"==t){let n=e.sel.ranges[i],t=cmp(n.head,n.anchor)<0;o[i]=new Range(t?h:c,t?c:h)}else o[i]=new Range(c,c)}return new Selection(o,e.sel.primIndex)};
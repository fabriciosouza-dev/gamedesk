import{elt,removeChildren}from"../util/dom.js";import{regChange}from"./view_tracking.js";import{alignHorizontally}from"./line_numbers.js";import{updateGutterSpace}from"./update_display.js";export function getGutters(e,t){let r=[],l=!1;for(let n=0;n<e.length;n++){let i=e[n],s=null;if("string"!=typeof i&&(s=i.style,i=i.className),"CodeMirror-linenumbers"==i){if(!t)continue;l=!0}r.push({className:i,style:s})}return t&&!l&&r.push({className:"CodeMirror-linenumbers",style:null}),r};export function renderGutters(e){let t=e.gutters,r=e.gutterSpecs;removeChildren(t),e.lineGutter=null;for(let l=0;l<r.length;++l){let{className:n,style:i}=r[l],s=t.appendChild(elt("div",null,"CodeMirror-gutter "+n));i&&(s.style.cssText=i),"CodeMirror-linenumbers"==n&&(e.lineGutter=s,s.style.width=(e.lineNumWidth||1)+"px")}t.style.display=r.length?"":"none",updateGutterSpace(e)};export function updateGutters(e){renderGutters(e.display),regChange(e),alignHorizontally(e)};
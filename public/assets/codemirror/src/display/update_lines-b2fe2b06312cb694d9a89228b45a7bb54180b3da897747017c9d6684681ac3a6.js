function updateWidgetHeight(e){if(e.widgets)for(let t=0;t<e.widgets.length;++t){let i=e.widgets[t],n=i.node.parentNode;n&&(i.height=n.offsetHeight)}}import{heightAtLine}from"../line/spans.js";import{getLine,lineAtHeight,updateLineHeight}from"../line/utils_line.js";import{paddingTop,charWidth}from"../measurement/position_measurement.js";import{ie,ie_version}from"../util/browser.js";export function updateHeightsInViewport(e){let t=e.display,i=t.lineDiv.offsetTop;for(let n=0;n<t.view.length;n++){let l,o=t.view[n],r=e.options.lineWrapping,h=0;if(o.hidden)continue;if(ie&&ie_version<8){let e=o.node.offsetTop+o.node.offsetHeight;l=e-i,i=e}else{let e=o.node.getBoundingClientRect();l=e.bottom-e.top,!r&&o.text.firstChild&&(h=o.text.firstChild.getBoundingClientRect().right-e.left-1)}let g=o.line.height-l;if((g>.005||g<-.005)&&(updateLineHeight(o.line,l),updateWidgetHeight(o.line),o.rest))for(let e=0;e<o.rest.length;e++)updateWidgetHeight(o.rest[e]);if(h>e.display.sizerWidth){let t=Math.ceil(h/charWidth(e.display));t>e.display.maxLineLength&&(e.display.maxLineLength=t,e.display.maxLine=o.line,e.display.maxLineChanged=!0)}}};export function visibleLines(e,t,i){let n=i&&null!=i.top?Math.max(0,i.top):e.scroller.scrollTop;n=Math.floor(n-paddingTop(e));let l=i&&null!=i.bottom?i.bottom:n+e.wrapper.clientHeight,o=lineAtHeight(t,n),r=lineAtHeight(t,l);if(i&&i.ensure){let n=i.ensure.from.line,l=i.ensure.to.line;n<o?(o=n,r=lineAtHeight(t,heightAtLine(getLine(t,n))+e.wrapper.clientHeight)):Math.min(l,t.lastLine())>=r&&(o=lineAtHeight(t,heightAtLine(getLine(t,l))-e.wrapper.clientHeight),r=l)}return{from:o,to:Math.max(r,o+1)}};
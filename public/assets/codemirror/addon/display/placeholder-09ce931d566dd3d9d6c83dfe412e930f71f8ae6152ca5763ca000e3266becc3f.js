// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function o(e){e.state.placeholder&&(e.state.placeholder.parentNode.removeChild(e.state.placeholder),e.state.placeholder=null)}function t(e){o(e);var t=e.state.placeholder=document.createElement("pre");t.style.cssText="height: 0; overflow: visible",t.style.direction=e.getOption("direction"),t.className="CodeMirror-placeholder CodeMirror-line-like";var r=e.getOption("placeholder");"string"==typeof r&&(r=document.createTextNode(r)),t.appendChild(r),e.display.lineSpace.insertBefore(t,e.display.lineSpace.firstChild)}function r(e){setTimeout(function(){var r=!1;if(1==e.lineCount()){var n=e.getInputField();r="TEXTAREA"==n.nodeName?!e.getLine(0).length:!/[^\u200b]/.test(n.querySelector(".CodeMirror-line").textContent)}r?t(e):o(e)},20)}function n(e){l(e)&&t(e)}function i(e){var r=e.getWrapperElement(),n=l(e);r.className=r.className.replace(" CodeMirror-empty","")+(n?" CodeMirror-empty":""),n?t(e):o(e)}function l(e){return 1===e.lineCount()&&""===e.getLine(0)}e.defineOption("placeholder","",function(t,l,a){var c=a&&a!=e.Init;if(l&&!c)t.on("blur",n),t.on("change",i),t.on("swapDoc",i),e.on(t.getInputField(),"compositionupdate",t.state.placeholderCompose=function(){r(t)}),i(t);else if(!l&&c){t.off("blur",n),t.off("change",i),t.off("swapDoc",i),e.off(t.getInputField(),"compositionupdate",t.state.placeholderCompose),o(t);var p=t.getWrapperElement();p.className=p.className.replace(" CodeMirror-empty","")}l&&!t.hasFocus()&&n(t)})});
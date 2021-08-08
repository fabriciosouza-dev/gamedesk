"use strict";!function(t,s,o){t.fn.fireModal=function(s){s=t.extend({size:"modal-md",center:!1,animation:!0,title:"Modal Title",closeButton:!0,header:!0,bodyClass:"",footerClass:"",body:"",buttons:[],autoFocus:!0,created:function(){},appended:function(){},onFormSubmit:function(){},modal:{}},s);this.each(function(){var i="fire-modal-"+ ++o,e="trigger--"+i;t("."+e);t(this).addClass(e);let n=s.body;if("object"==typeof n)if(n.length){let t=n;n=n.removeAttr("id").clone().removeClass("modal-part"),t.remove()}else n='<div class="text-danger">Modal part element not found!</div>';var a,d='   <div class="modal'+(1==s.animation?" fade":"")+'" tabindex="-1" role="dialog" id="'+i+'">       <div class="modal-dialog '+s.size+(s.center?" modal-dialog-centered":"")+'" role="document">         <div class="modal-content">  '+(1==s.header?'         <div class="modal-header">             <h5 class="modal-title">'+s.title+"</h5>  "+(1==s.closeButton?'           <button type="button" class="close" data-dismiss="modal" aria-label="Close">               <span aria-hidden="true">&times;</span>             </button>  ':"")+"         </div>  ":"")+'         <div class="modal-body">           </div>  '+(s.buttons.length>0?'         <div class="modal-footer">           </div>  ':"")+"       </div>       </div>    </div>  ";d=t(d);s.buttons.forEach(function(s){let o="id"in s?s.id:"";a='<button type="'+("submit"in s&&1==s.submit?"submit":"button")+'" class="'+s["class"]+'" id="'+o+'">'+s.text+"</button>",a=t(a).off("click").on("click",function(){s.handler.call(this,d)}),t(d).find(".modal-footer").append(a)}),t(d).find(".modal-body").append(n),s.bodyClass&&t(d).find(".modal-body").addClass(s.bodyClass),s.footerClass&&t(d).find(".modal-footer").addClass(s.footerClass),s.created.call(this,d,s);let c=t(d).find(".modal-body form"),l=d.find("button[type=submit]");if(t("body").append(d),s.appended.call(this,t("#"+i),c,s),c.length){s.autoFocus&&t(d).on("shown.bs.modal",function(){"boolean"==typeof s.autoFocus?c.find("input:eq(0)").focus():"string"==typeof s.autoFocus&&c.find(s.autoFocus).length&&c.find(s.autoFocus).focus()});let o={startProgress:function(){d.addClass("modal-progress")},stopProgress:function(){d.removeClass("modal-progress")}};c.find("button").length||t(c).append('<button class="d-none" id="'+i+'-submit"></button>'),l.click(function(){c.submit()}),c.submit(function(t){o.startProgress(),s.onFormSubmit.call(this,d,t,o)})}t(document).on("click","."+e,function(){return t("#"+i).modal(s.modal),!1})})},t.destroyModal=function(t){t.modal("hide"),t.on("hidden.bs.modal",function(){})},t.cardProgress=function(s,o){o=t.extend({dismiss:!1,dismissText:"Cancel",spinner:!0,onDismiss:function(){}},o);var i=t(s);if(i.addClass("card-progress"),0==o.spinner&&i.addClass("remove-spinner"),1==o.dismiss){var e='<a class="btn btn-danger card-progress-dismiss">'+o.dismissText+"</a>";e=t(e).off("click").on("click",function(){i.removeClass("card-progress"),i.find(".card-progress-dismiss").remove(),o.onDismiss.call(this,i)}),i.append(e)}return{dismiss:function(s){t.cardProgressDismiss(i,s)}}},t.cardProgressDismiss=function(s,o){var i=t(s);i.removeClass("card-progress"),i.find(".card-progress-dismiss").remove(),o&&o.call(this,i)},t.chatCtrl=function(s,o){o=t.extend({position:"chat-right",text:"",time:moment((new Date).toISOString()).format("hh:mm"),picture:"",type:"text",timeout:0,onShow:function(){}},o);var i=t(s),e=(s='<div class="chat-item '+o.position+'" style="display:none"><img src="'+o.picture+'"><div class="chat-details"><div class="chat-text">'+o.text+'</div><div class="chat-time">'+o.time+"</div></div></div>",'<div class="chat-item chat-left chat-typing" style="display:none"><img src="'+o.picture+'"><div class="chat-details"><div class="chat-text"></div></div></div>'),n=s;"typing"==o.type&&(n=e),o.timeout>0?setTimeout(function(){i.find(".chat-content").append(t(n).fadeIn())},o.timeout):i.find(".chat-content").append(t(n).fadeIn());var a=0;i.find(".chat-content .chat-item").each(function(){a+=t(this).outerHeight()}),setTimeout(function(){i.find(".chat-content").scrollTop(a,-1)},100),o.onShow.call(this,n)}}(jQuery,0,0);
var conact =new Object()
 conact.str=undefined;
 conact.pm="";
conact.dialog_clic=function ()
{ 
var po;
var h;
if (this.str.tagName!=="DIV") {
 po=$(this.str).parent().parent();
h=$("#name_file").val()+$("#exp").val();
}
else{
	po=this.str;
	h=this.pm;
	}
po=$(po).children(".main_area").children("div:first");	
	if(h==''){
		}
		else
	{
	var le=$(po).find("li").length+1;
	var obj='<li><a href="#fragment-'+le+'"><span>'+h+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
	
	$(po).children("ul").append(obj);
	obj='<div id="fragment-'+le+'"><div class="kod" contenteditable="true" onKeyUp="Syntex(event.keyCode,this,true)"></div></div>';
	$(po).append(obj);
	$(po).tabs( "refresh" );
	}
	$.unblockUI();
	
	}
	conact.connect_p2p=function(param)
{
	this.pm=param;				//добавление новых вкладок или выделение существующих
	var usr =document.getElementById('tabs-'+param.user_id);
	
	if(usr != null)
	{
		usr.focus();
	}else{
var po='<div id="container" class="window"><div class="menu-window "><span class="ui-icon ui-icon-circle-close button " title="выход"></span></div><div class="main_area"><div id="tabs-'+param.user_id+'"><ul><li><a href="#'+param.user_name+'"><span>'+param.user_name+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li></ul><div id="'+param.user_name+'"><div class="kod" contenteditable="true" onKeyUp="Syntex(event.keyCode,this,true)"></div></div></div></div></div>';
	$(".body").append(po);
	$("body>#container").draggable({ containment:"window",scroll: false, stack:"body>#container",handle:".menu-window"});
	 var tabs= $("#tabs-"+param.user_id).tabs();
	 tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
	}
}

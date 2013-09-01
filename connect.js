//////////////////////////////////////////////////////////////////////////////////////
// раота с добавлением соеденений и вкладок
// соброныев функции для пользовательского окна 
// и меню
//////////////////////////////////////////////////////////////////////////////////////
var connact =new Object()
 connact.str=undefined;
 connact.pm="";
connact.dialog_clic=function ()
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
	obj='<div id="fragment-'+le+'"><div class="kod" id="'+h+'" contenteditable="true" onKeyUp="focus_in(event.keyCode,this,true)" onKeyPress="focus_uot()" onMouseUp="focus_in(40,this,true)" onMouseDown="focus_uot()"><div class="stroka activ_string"></div></div></div>';
	$(po).append(obj);
	$(po).tabs( "refresh" );
	
	}
	$.unblockUI();
	if(out_socet==undefined){
			out_socet= new Socet();
			out_socet.connect($("#url").val());
		}
	}
	connact.connect_p2p=function(param)
{
	this.pm=param;				//добавление новых вкладок или выделение существующих
	var usr =document.getElementById('tabs-'+param.user_id);
	
	if(usr != null)
	{
		usr.focus();
	}else{
				
var po='<div id="container" class="window"><div class="menu-window "><span class="ui-icon ui-icon-circle-close button " title="выход"></span></div><div class="main_area"><div id="tabs-'+param.user_id+'"><ul><li><a href="#'+param.user_name+'"><span>'+param.user_name+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li></ul><div  id="'+param.user_name+'" class="kod" ></div></div></div></div>';
	$(".body").append(po);
	$("body>#container").draggable({ containment:"window",scroll: false, stack:"body>#container",handle:".menu-window"});
	 var tabs= $("#tabs-"+param.user_id).tabs();
	 tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
	in_socet[param.user_name]= new Socet();
	in_socet[param.user_name].ws.onmessage= function(e)
	{
		$(param.user_name).text(e);
	}
		in_socet["param.user_name"].connect("ws://"+param.url+":9002");
	}
}

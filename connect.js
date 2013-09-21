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
	obj='<div id="fragment-'+le+'"><div class="kod" id="'+h+'" contenteditable="true" onKeyUp="focus_in(event.keyCode,this)"  onKeyUp="focus_in(event.keyCode,this)" onKeyPress="focus_uot()" onMouseUp="focus_in(40,this,true)" onMouseDown="focus_uot()""><div class="stroka activ_string"></div></div></div>';
	$(po).append(obj);
	$(po).tabs( "refresh" );
	
	var XHRcon= $.ajax({
		url:"http://localhost/sayter/php_script/files.php?file="+h+"&user_name="+login.name,
		 type:"GET",
		 });
	}
	if(out_socet==undefined){
			out_socet= Socet($("#url").val());
			out_socet.onopen=function(e)
			{
				this.send("<type>out<file>"+h+"<user>"+login.name);
			}
		
	}
	
	$.unblockUI();
	
	
	}
	connact.connect_p2p=function(param)
{
	this.pm=param;				//добавление новых вкладок или выделение существующих
	var usr =document.getElementById('tabs-'+param.user_id);
	
	if(usr != null)
	{
		usr.focus();
	}else{
		var li="";
		var div="";
		in_socet[param.user_name]=  Socet("ws://"+param.url+":9002");
	
	in_socet[param.user_name].onmessage= function(e)
	{
		
		$("#"+param.user_name);
		if(e.search(/<user>/)==0&&
		e.search(/<numbe>/)>0&&
		e.search(/<lenght>/)>0&&
		e.search(/<file>/)>0&&
		e.search(/<date>/)>0&&
		e.search(/<user>/)<e.search(/<numbe>/)&&
		e.search(/<numbe>/)<e.search(/<lenght>/)&&
		e.search(/<lenght>/)<e.search(/<file>/)&&
		e.search(/<file>/)<e.search(/<date>/)
		)
		{
			mas_date = e.split(/<user>|<date>|<numbe>|<lenght>|<file>/);
			var div=$("#"+mas_date[0]+">#"+mas_date[3]).children("div");
			if(div.length<mas_date[2]);
			for(var i=0;i<div.length-mas_date[2]; i++)
			{
			$("#"+mas_date[0]+">#"+mas_date[3]).append("<div></div>");
			}
			div[mas_date[1]]=mas_date[4];
		}
	}
	var XHRcon= $.ajax({
		url:"http://localhost/sayter/php_script/get_files_name.php?name="+param.user_name,
		 type:"GET",
		 async:false,
		 success: function(date){
			 $(date).find("file").each(function(index, element) {
				 in_socet[param.user_name].send("<type>in<file>"+$(this).text()+"<user>"+param.user_name);
				 var kl=$(this).text();
				li+='<li><a href="#'+$(this).text()+'"><span>'+$(this).text()+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
				div+='<div  id="'+$(this).text()+'" class="kod" ></div>';
				
            });
			 }
		 });	
				
var po='<div id="container" class="window"><div class="menu-window "><span class="ui-icon ui-icon-circle-close button " title="выход"></span></div><div class="main_area"><div id="'+param.user_name+'"><ul>'+li+'</ul>'+div+'</div></div></div>';
	$(".menu").after(po);
	
	$("body>#container").draggable({ containment:"window",scroll: false, stack:"body>#container",handle:".menu-window"});
	 var tabs= $("#"+param.user_name).tabs();
	 tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelI ).remove();
      tabs.tabs( "refresh" );
    });
	
	}
}

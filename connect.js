//////////////////////////////////////////////////////////////////////////////////////
// работа с добавлением соеденений и вкладок
// соброныев функции для пользовательского окна 
// и меню
//////////////////////////////////////////////////////////////////////////////////////
len_tabs = 0;
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
var id = h.replace(/\./g,"_");
}
else{
	po=this.str;
	h=this.pm;
	}
po=$(po).children(".main_area").children("div:first");
	
	if(h==''||$("#"+id).length!=0){
		$.unblockUI();
		}
		else
	{
		len_tabs++;
	var le=len_tabs;
	var obj='<li><a href="#fragment-'+le+'"><span>'+h+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
	
	$(po).children("ul").append(obj);
	obj='<div id="fragment-'+le+'"><div class="kod" id="'+id+'" contenteditable="true" onKeyUp="focus_in(event.keyCode,this)"  onKeyUp="focus_in(event.keyCode,this)" onKeyPress="focus_uot()" onMouseUp="focus_in(40,this,true)" onMouseDown="focus_uot()""></div></div>';
	$(po).append(obj);
	$(po).tabs( "refresh" );
	
	
	 var tabs= $(po).tabs();												// удаление вкладок
	 tabs.delegate( "span.ui-icon-close", "click", function() {
	  var name_file = $( this ).closest( "li" ).children("a").children("span").text();
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  
	  out_socet.send("<type>close<file>"+name_file+"<user>"+login.name);
	  var XHRcon= $.ajax({
		url:"php_script/files.php?file="+name_file.replace(/\./g,"_")+"&user_name="+login.name+"&close=true",
		 type:"GET",
		 });
		 $( "#" + panelI ).remove();
      	 tabs.tabs( "refresh" );
    });
	
		
 	var XHRcon= $.ajax({
		url:"php_script/files.php?file="+id+"&user_name="+login.name,
		 type:"GET",
		 });
	}
	if(out_socet==undefined||out_socet.readyState==3){
			out_socet= Socet($("#url").val());
			out_socet.onopen=function(e)
			{
				this.send("<type>out<file>"+h+"<user>"+login.name);
			$("#connect_status").removeClass("connect_status_off").addClass("connect_status_on").text("соеденение активно");
			}
			out_socet.onclose = function(e)
			{
				$("#connect_status").removeClass("connect_status_on").addClass("connect_status_off").text("соеденение разорвано");
			}
		
	}
	else
	{
		out_socet.send("<type>out<file>"+h+"<user>"+login.name);
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
	
	in_socet[param.user_name].onclose = function(e)
	{
		$("#"+param.user_name).parent().remove();
		delete in_socet[param.user_name];
	}
	
	in_socet[param.user_name].onopen = function(e)
	{
		var XHRcon= $.ajax({
		url:"php_script/get_files_name.php?name="+param.user_name,
		 type:"GET",
		 async:false,
		 success: function(date){
			 if ( $(date).find("file").length>0)
			 {
			 $(date).find("file").each(function(index, element) {
				 
				 in_socet[param.user_name].send("<type>in<file>"+$(this).text()+"<user>"+param.user_name);
				 var kl=$(this).text();
				li+='<li><a href="#'+$(this).text()+param.user_name+'"><span>'+$(this).text().replace(/_/,".")+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
				div+='<div  id="'+$(this).text()+param.user_name+'" ><div class="frame"></div></div>';
				
            });
		 var po='<div id="container" class="window"><div class="menu-window "><span class="ui-icon ui-icon-circle-close button " title="выход"></span></div><div id="'+param.user_name+'"><ul>'+li+'</ul>'+div+'</div>';
	$(".menu").after(po);
	
	$("body>#container").draggable({ containment:"window",scroll: false, stack:"body>#container",handle:".menu-window"});
	 var tabs= $("#"+param.user_name).tabs();												// удаление вкладок
	 tabs.delegate( "span.ui-icon-close", "click", function() {
       $( this ).closest( "li" ).remove();
      //$( "#" + panelI ).remove();
      tabs.tabs( "refresh" );
    });	
			 }
			 
		 }
		 });
		 
		
	}
	
	
	
	in_socet[param.user_name].onmessage= function(e)
	{
		
	
		s =e.data;
		if((s.search(/<user>/)==0)&&
		(s.search(/<numbe>/)>0)&&
		(s.search(/<length>/)>0)&&
		(s.search(/<file>/)>0)&&
		(s.search(/<date>/)>0)&&
		(s.search(/<user>/)<s.search(/<numbe>/))&&
		(s.search(/<numbe>/)<s.search(/<length>/))&&
		(s.search(/<length>/)<s.search(/<file>/))&&
		(s.search(/<file>/)<s.search(/<date>/))
		)
		{
			
			var mas_date = s.split(/<user>|<date>|<numbe>|<length>|<file>/);
			
			var div=$("#"+mas_date[4]+mas_date[1]).children(".fram");
			if(div.children("div").length!=mas_date[3])
			{
				
			for(var i=0;i<mas_date[3]-div.length; i++)
			{
				
				$("#"+mas_date[4]+mas_date[1]).children(".frame").append("<div></div>");
			
			}
			}
			var y=$("#"+mas_date[4]+mas_date[1]).children(".frame").children("div:eq("+mas_date[2]+")");
			y.text(mas_date[5]);
	
		}
		else if(s.search("<type>")==0&&
             s.search("<file>")>0&&
             s.search("<user>")>0&&
             s.search("<type>")<s.search("<file>")&&
             s.search("<file>")<s.search("<user>"))
				{
					var mas_date = s.split(/<type>|<file>|<user>/);
					if(mas_date[1]=="out")
					{
				
				
							var obj='<li><a href="#'+mas_date[2].replace(/\./g,"_")+mas_date[3]+'"><span>'+mas_date[2]+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
	
							$("#"+mas_date[3]).children("ul").append(obj);
							obj='<div  id="'+mas_date[2].replace(/\./g,"_")+mas_date[3]+'" class="frame"></div>';
							$("#"+mas_date[3]).append(obj);
							$("#"+mas_date[3]).tabs( "refresh" );
	
						
					}
					else if(mas_date[1]=="close")
					{
						delete in_socet[mas_date[3]];
						$("a[href='#"+mas_date[2].replace(/\./,"_")+mas_date[3]+"']").closest( "li" ).remove();
						$("#"+mas_date[2].replace(/\./,"_")+mas_date[3]).remove();
					}
				}
						
				
	
	}			

	
	}
}

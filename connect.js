//////////////////////////////////////////////////////////////////////////////////////
// работа с добавлением соеденений и вкладок
// соброныев функции для пользовательского окна 
// и меню
//////////////////////////////////////////////////////////////////////////////////////
len_tabs = 0;
var herf={};
var index_massiv={};
var compilin_file =new Array(".cpp")
var connact =new Object()
 connact.str=undefined;
 connact.pm="";
function compile(editor,aotput,typ)
{
	
		var lins =editor.getSession().toString() ;
		
		$(aotput).remove(".debag-area");
		$.post("./compilin/index.php",{file:lins,user_name:login.name,password:login.sek_key,file:lins,type:typ}, function(e){
			
				$(aotput).remove(".debag-area");
				var elem = document.createElement("div");
				$(elem).addClass("debag-area").html(e);
				$(aotput).append(elem);
				});
}


connact.dialog_clic=function ()
{ 
var po;
var h;
$("#url").attr("disabled","disabled");
if (this.str.tagName!=="DIV") {
 po=$(this.str).parent().parent();
h=$("#name_file").val()+$("#exp :selected").text();
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
	if(compilin_file.indexOf($("#exp :selected").text())>=0)
	{
	obj='<div id="fragment-'+le+'"><div class="kod" id="'+id+'"></div><div class="debag-area"><div class="button"><span class="ui-icon ui-icon-play icon-compilin"></span><span class="lol">compilin</span><div class="none"><div></div></div>';
	}else
	{
		obj='<div id="fragment-'+le+'"><div class="kod" id="'+id+'"></div></div></div>';
	}
	
				
	$(po).append(obj);
	$(po).tabs( "refresh" );
////////////////////////////////////подключение подсветки ace//////////////////////
var ed = ace.edit(id);
	ed.name=id;
    ed.setTheme("ace/theme/eclipse");
	var str ="ace/mode/"+$("#exp :selected").val();
    ed.getSession().setMode(str);
	ed.on("change",function(e,edit){
		var re =e.data;
		var lins =edit.getSession().getDocument().getAllLines();
		
		if(("action" in re)&&re.action=="removeLines")
		{
				for(var i=0;i<re.lines.length;i++)
				{
					var link={};
			link["numbe"]=i;
			link["len"]=lins.length;
			link["text"]=lins[i];
			link["id"]=edit.name;
			send(link);
				}
		}
		else if(("action" in re)&&re.action=="insertLines")
		{
			for(var i=0;i<re.lines.length;i++)
				{
					var link={};
			link["numbe"]=re.range.start.row+i;
			link["len"]=lins.length;
			link["text"]=lins[re.range.start.row+i];
			link["id"]=edit.name;
			send(link);
				}
		}	
		else if(("action" in re)&&(re.action=="insertText")||(re.action=="removeText"))
		{
			var link={};
			link["numbe"]=re.range.start.row;
			link["len"]=lins.length;
			link["text"]=lins[re.range.start.row];
			link["id"]=edit.name;
			send(link);
		}
		
		});
		herf[$("#text").val()]=ed;
		$(".tbutton").bind("click",compile(herf[$("#text").val()],$("#fragment-"+le),$("#exp :selected").text()));			
///////////////////////////////////////////////////////////////////////////////////
		
	 var tabs= $(po).tabs();												// удаление вкладок
	 tabs.delegate( "span.ui-icon-close", "click", function() {
	  var name_file = $( this ).closest( "li" ).children("a").children("span").text();
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  
  		var eve={
			type:"close",
			file:name_file,
			user:login.name
			};
  		var str= JSON.stringify(eve);
		out_socet.send(str);
		

	  var XHRcon= $.ajax({
		url:"php_script/files.php?file="+name_file.replace(/\./g,"_")+"&user_name="+login.name+
		"&close=true",
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
				var eve={
					type:"out",
					file:h,
					user:login.name,
					password:login.secrid_code
				};
  				var str= JSON.stringify(eve);
				this.send(str);
			$("#connect_status").removeClass("connect_status_off").addClass("connect_status_on").text("connection is active");
			}
			out_socet.onclose = function(e)
			{
				$("#connect_status").removeClass("connect_status_on").addClass("connect_status_off").text("connection is broken");
			}
		
	}
	else
	{
		var eve={
			type:"out",
			file:h,			//разобраться с экранированием 
			user:login.name
			};
  		var str= JSON.stringify(eve);
		out_socet.send(str);
		//out_socet.send("<type>out<file>"+h+"<user>"+login.name);
	}
	$.unblockUI();
	
	
	}
	
	
	
	
	connact.connect_p2p=function(param)
{
	this.pm=param;				//добавление новых вкладок или выделение существующих
	var usr =document.getElementById('tabs-'+param.user_name);
	
	if(usr != null)
	{
		usr.focus();
	}else{
		var li="";
		var div="";
	
	var eve ={
	from_user:getCookie("name"),
	fo_user:param.user_name,
	ask:'get_connect'
	};
	var str= JSON.stringify(eve);
	menu_socet.send(str);
	}



	
	connact.add_new_users =function(param)
	{
	acsses_key[param.from_user]=param.acsses_key;		
		if(!(param.from_user in in_socet))
		in_socet[param.from_user]=  Socet(param.adres);
	
	in_socet[param.from_user].onclose = function(e)
	{
		$("#"+param.from_user).parent().remove();
		delete in_socet[param.from_user];
	}
	
	
	in_socet[param.from_user].onopen = function(e)
	{
		var eve ={
	type:"in",
	user:param.from_user,
	password:acsses_key[param.from_user]
	};
	var str= JSON.stringify(eve);
	in_socet[param.from_user].send(str);
		//in_socet[param.from_user].send("<type>in<file><user>"+param.from_user);
		for(var i=0; i<param.table.length;i++){
				 
				 var kl=param.table[i];
				li+='<li><a href="#'+param.table[i].replace(/\./,"_")+param.from_user+'"><span>'+param.table[i].replace(/_/,".")+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
				div+='<div  id="'+param.table[i].replace(/\./,"_")+param.from_user+'" ><div class="frame"></div></div>';
				
		}
		 var po='<div id="container" class="window"><div class="menu-window "><span class="ui-icon ui-icon-circle-close button " title="выход"></span></div><div id="'+param.from_user+'"><ul>'+li+'</ul>'+div+'</div>';
	$(".menu").after(po);
	
	$("body>#container").draggable({ containment:"window",scroll: false, stack:"body>#container",handle:".menu-window"});
	 var tabs= $("#"+param.from_user).tabs();												// удаление вкладок
	 tabs.delegate( "span.ui-icon-close", "click", function() {
       $( this ).closest( "li" ).remove();
      tabs.tabs( "refresh" );
	 });
			
	}
	
	
	
	
	in_socet[param.from_user].onmessage= function(e)
	{
		
		
			var s =e.data;
					
			var mas_date = JSON.parse(s);   //.split(/<user>|<date>|<numbe>|<length>|<file>/);
			if('date' in mas_date){			
			var div=$("#"+mas_date.file+mas_date.user).children(".fram");
			if(div.children("div").length!=mas_date.len)
			{
				
				for(var i=0;i<mas_date.len-div.length; i++)
				{
					var tr=$("#"+mas_date.file+mas_date.user).children(".frame");
					$("#"+mas_date.file+mas_date.user).children(".frame").append("<div></div>");
			
				}
			}
			var y=$("#"+mas_date.file+mas_date.user).children(".frame").children("div:eq("+mas_date.numbe+")");
			y.text(mas_date.date);
			} else if('type' in mas_date){
					//var mas_date = s.split(/<type>|<file>|<user>/);
					if(mas_date.type=="out")
					{
				
				
							var obj='<li><a href="#'+mas_date.file.replace(/\./g,"_")+mas_date.user+'"><span>'+mas_date.file+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
	
							$("#"+mas_date.user).children("ul").append(obj);
							obj='<div  id="'+mas_date.file.replace(/\./g,"_")+mas_date.user+'" ><div class="frame"></div></div>';
							$("#"+mas_date.user).append(obj);
							$("#"+mas_date.user).tabs( "refresh" );
	
						
					}
					else if(mas_date.type=="close")
					{
						//delete in_socet[mas_date[3]];
						var yu="a[href='#"+mas_date.file.replace(/\./,"_")+mas_date.user+"']";
						$("a[href='#"+mas_date.file.replace(/\./,"_")+mas_date.user+"']").closest( "li" ).remove();
						$("#"+mas_date.file.replace(/\./,"_")+mas_date.user).remove();
					}
				}
						

	
	}
	}
}

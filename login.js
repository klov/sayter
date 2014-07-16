// JavaScript Document
adres_name='ws://151.248.115.227:9003';
var login ={}
login.name='';
acsses_key=[];
var menu_socet;

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

login.in = function()
{
	
	var us_name =$("#login_name").val();
	$("#my_name").text(us_name);
	$("#container").show();
	$("#login").val("");
	var XHRcon= $.ajax({
		url:"php_script/user_chek.php?name="+us_name+"&ip="+$("#url").val(),
		 type:"GET",
	success:function (date)
	{
		var val =$(date).find("ansver");
		val=val.text();
		if (val!=0)
		{
			var date = new Date;
			
			date.setYear(3040);
		document.cookie="name="+us_name+";expires="+date.toUTCString();
	document.cookie="key="+val+";expires="+date.toUTCString();
			document.cookie="key="+val+"; expires="+date.toUTCString();
			
			menu_socet = Socet(adres_name);
			menu_socet.onerror = function(error) {

  alert("error " + error.message);

};

			menu_socet.onclose =function(e)
			{
			//	$.blockUI({ message: $('#login') });
			obd_tim=setInterval("apdate()",1000);
			}
			menu_socet.onopen = function(e)
			{
				var eve ={
				name:getCookie("name")
				};
				var str= JSON.stringify(eve);
				menu_socet.send(str);
			}
			menu_socet.onmessage = login.begin;
			
		} else
		{
			alert("a user already exists");
		}
	}
	});
	
}
	
	
login.begin=function(e)
{
	console.log(e.data);
var cat =JSON.parse(e.data);
						var k =cat.key;
						var s=cat.salte;
						var tyu=getCookie("key");
						var koj=md5(tyu+s);
						var hash =md5(md5(getCookie("key")+s)+k);
						
						var eve ={
						name:getCookie("name"),
						password:md5(md5(getCookie("key")+s)+k)
						};
						var str= JSON.stringify(eve);
						
							menu_socet.onmessage = function(e)
							{
							var cat =JSON.parse(e.data);
							console.log(cat);
							if(('result' in cat)&&(cat.result=='true'))
							{
								//$.unblockUI();
								$("#my_name").val(cat.user).css("visibility","visible");
								$("#my_name").text(getCookie("name"));
								$("#container").show();
			login.name= getCookie("name");
			login.sek_key=cat.password;
			
			menu_socet.onmessage = function(e){ 
			finel_state_socet(e);
			}
								
							}
							
							}
							menu_socet.send(str);		
					
			}
			
function finel_state_socet(e)
{
			var cat =JSON.parse(e.data);
			if(('type' in cat)&&(cat.type=="chat_message")){
				var name=cat.from_user;
				
				if($("#chat").length==0){
					var ob ={chat:{}};
					ob.chat["chat"+name]=name
					
					var divo =chat_tools(name);
						$("body").createtabs(ob,{frame:"text",wind:"wind"},divo);
					
					}
				if($("#chat"+name).length==0){
				var divo =chat_tools(name);
				var key={};
				key["chat"+name]=name;
				$("#chat").addtabs(key,divo);
				var tag = $("#chat"+name+"  .text_area");
					tag.append('<div><b>'+name+'</b> : '+cat.date+'<div>');
				}else{
					var tag = $("#chat"+name+"  .text_area");
					tag.append('<div><b>'+name+'</b> : '+cat.date+'<div>');
				}
			
			
				}else
			if(('result' in cat)&&(cat.result==true))
					{
						$("#my_name").val(cat.user).css("visibility","visible");
					}
			else if('name' in cat)
					{
						apdate();
					}
						
			else if(('ask' in cat)&&(cat.ask=='get_connect'))
					{
						if($("div.kod").length==0){										// oтвет при аустом проекте
							var eve ={
							from_user:getCookie("name"),
							fo_user:cat.from_user,
							ask:'not_file'
						};
						var str= JSON.stringify(eve);
						
							}
							else{
						$("#requezt_user").text("user "+cat.from_user+" wants to connect ");
						$.blockUI({ message: $('#dialog_requezt') });
						$("#requezt_ok").bind("click",function(e){
						var date= new Array();
						$("div.kod").each(function(index, element) {
                        date.push($(this).attr("id").replace(/_/g,"."));
                        });
						var eve ={
							from_user:getCookie("name"),
							fo_user:cat.from_user,
							ask:'yes_give',
							table:date,
							adres:$("#url").val(),
							acsses_key:login.secrid_code
						};
						var str= JSON.stringify(eve);
						menu_socet.send(str);
						$.unblockUI();
						});
						$("#requezt_none").bind("click",function(e){
						var eve ={
						from_user:getCookie("name"),
						fo_user:cat.from_user,
						ask:'not_give'
						};
						var str= JSON.stringify(eve);
									menu_socet.send(str);
									$.unblockUI();
									});	
							}
			}
			else if(('ask' in cat)&&(cat.ask=='yes_give'))
					{
						connact.add_new_users(cat);
					}
			else if(('ask' in cat)&&(cat.ask=='not_give'))
			{
				alert("user "+cat.from_user+" rejected the proposal");
			}else if(('ask' in cat)&&(cat.ask=='not_file'))
			{
				alert(cat.from_user+" user has no active files");
			}
							
}
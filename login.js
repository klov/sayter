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
							if(('result' in cat)&&(cat.result=='true'))
							{
								$.unblockUI();
								$("#my_name").val(cat.user).css("visibility","visible");
								$("#my_name").text(getCookie("name"));
								$("#container").show();
			login.name= getCookie("name");
			login.sek_key=cat.password;
			menu_socet.onmessage = finel_state_socet;
								
							}
							
							}
							menu_socet.send(str);		
					
			}
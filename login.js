// JavaScript Document
var login ={}
login.name='';
login.in = function()
{
	
	var us_name =$("#login_name").val();
	$("#my_name").text(us_name);
	$("#login").val("");
	var XHRcon= $.ajax({
		url:"http://localhost/sayter/php_script/user_chek.php?name="+us_name+"&ip=192.168.2.33",
		 type:"GET",
	success:function (date)
	{
		var val =$(date).find("ansver");
		val=val.text();
		if (val==1)
		{
			
			login.name= us_name;
			$.unblockUI();
		} else
		{
			alert("такой пользователь уже есть");
		}
	}
	});
	
}
	
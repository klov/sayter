//////////////////////////////////////////////////////////////////////////
//добавление  пользователей в меню
//////////////////////////////////////////////////////////////////////////
function apdate(){
	if(timer==null){
	var XHRcon= $.ajax({
		url:"U_and_G.php",
		 type:"POST",
		 error:function(jqXHR, textStatus, errorThrown)
		 {
			 var y="";
			},
	success:function (date)
	{
var dbdate=[];
$(date).find("user").each(function(index, element) {
   dbdate[dbdate.length]="user"+$(this).find("id").text();
});
$("#conntent1>div").each(function(index, element) {
    var s=$(this).attr("id");
	var flag= false;
		for(var i=0;i<dbdate.length;i++)
		{
			if(s==dbdate[i])
			flag=true;
		}
		if(!flag){
		if($("#conntent1").height()>0){
						$(this).toggle("10");
						}
		$(this).remove();
		}
});

		
		$(date).find("user").each(function(index, element) {
			var kl=$(this).find("id").text();
		var uid=$("#user"+kl);
		if(!uid.length&&$(this).find("name").text()!=login.name){
    var html='<div class="konteyner" id="user'+$(this).find("id").text()+'" name="'+$(this).find("name").text()+'"><a  href="#"class="lol">'+$(this).find("name").text()+'</a><div><img class="button" src="img/amblem.gif" title="join" onClick="connact.connect_p2p({user_id:\''+$(this).find("id").text()+'\',url:\''+$(this).find("URL").text()+'\',user_name:\''+$(this).find("name").text()+'\'})"><span class=" ui-icon-locked ui-icon button" title="ignore"  onClick="ignor(this)"></span><span class=" ui-icon-arrow-4-diag ui-icon button" onClick="clos(this)" title="close"></span><span class=" ui-icon-comment ui-icon button"   ></span></div></div>';
	$("#conntent1").append(html);
	var name=$(this).find("name").text();
	
	$('#user'+$(this).find("id").text()+' .ui-icon-comment').on("click",function(){
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
				
				}
		});
								
						
		}
    });
	
	
}
	});
	}
}

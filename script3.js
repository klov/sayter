
function apdate(){
	if(timer==null){
	var XHRcon= $.ajax({
		url:"http://localhost/siter/U_and_G.php",
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
var dbdate=[];
$(date).find("group").each(function(index, element) {
   dbdate[dbdate.length]="group"+$(this).find("id").text();
});
$("#conntent2>div").each(function(index, element) {
    var s=$(this).attr("id");
	var flag= false;
		for(var i=0;i<dbdate.length;i++)
		{
			if(s==dbdate[i])
			flag=true;
		}
		if(!flag){
		if($("#conntent2").height()>0){
						$(this).toggle("10");
						}
		$(this).remove();
		}
});
$(date).find("group").each(function(index, element) {
			var kl=$(this).find("id").text();
		var uid=$("#group"+kl);
		if(!uid.length){
    var html='<div class="konteyner" id="group'+$(this).find("id").text()+'"><span class="lol">'+$(this).find("name").text()+'</span><img class="button" src="img/amblem.gif" onClick="connect()" title="присоеденится"</div>';
				$("#conntent2").append(html);
				if($("#conntent2").height()>0){
						$("#group"+$(this).find("id").text()).toggle("100");
										//добавление групп
						}
												
		}
    });
		
		$(date).find("user").each(function(index, element) {
			var kl=$(this).find("id").text();
		var uid=$("#user"+kl);
		if(!uid.length){
    var html='<div class="konteyner" id="user'+$(this).find("id").text()+'"><a  href="#"class="lol">'+$(this).find("name").text()+'</a><div><img class="button" src="img/amblem.gif" title="присоеденится" onClick="connact.connect_p2p({user_id:\''+$(this).find("id").text()+'\',url:\''+$(this).find("URL").text()+'\',user_name:\'dfg.cpp\'})"><span class=" ui-icon-locked ui-icon button" title="игнорировать"  onClick="ignor(this)"></span><span class=" ui-icon-arrow-4-diag ui-icon button" onClick="clos(this)" title="закрыть"></span></div></div>';
	$("#conntent1").append(html);
				if($("#conntent1").height()>0){
						$("#user"+$(this).find("id").text()).toggle("100");									//добавление пользователей
						}
						
						
						
		}
    });
	
	
}
	});
	}
}

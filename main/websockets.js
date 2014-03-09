var stak_ws=-1;
var out_socet;
var in_socet =[];
var interval_send=-1;

function on_send()
		{
			var tag = $(catch_tag).parent(".kod");
			var lop = tag.attr("id");
			var ety=$(tag).children(".stroka").length;
			if(	tag.attr("id")!=undefined&&	tag.attr("id") in index_massiv)
	if(index_massiv[lop].len!=ety)
	{
	
	index_massiv[lop].len=ety;
	var link={};
	$(tag).children(".stroka").each(function(index, element) {
				link['tag']=this;
				link['numbe']=i;
				link['id']=lop;
				link['len']=$(html_tag).children().length;
				 i++;
				send(link); 
            });
	}
	else {		
		var link={};
		
		var tags=$(tag).children();
		var catcht =tag.children(".activ_string");
		for(var i=0;i<tags.length;i++)
		{
			
			if ($(tags[i]).hasClass('activ_string'))
			{
				link['id']=tag.attr("id");
				link['tag']=catcht;
				link['numbe']=i;
				link['len']=tags.length;
				break;
			}
		}
		send(link); 
		}
		}

	function send(e)
	{
        var eve ={
			user:login.name,
			numbe:e.numbe,
			len:e.len,
			file:e.id,
			date:e.text
			};
		
		
		var t= JSON.stringify(eve);
	
		if(!(e.id in index_massiv))
		{
			index_massiv[e.id]={};
			index_massiv[e.id].date=[];
			index_massiv[e.id].len=-1;
		}
		if(out_socet === undefined || out_socet.readyState != 1)
		{
			index_massiv[e.id].date.push(e);
				if(stak_ws==-1)												//добавление строк на отправку 
				stak_ws =setInterval(send_date,1000);
		}
		else																		
				{
					
					out_socet.send(t);
					
				}
		
		
	}
 function Socet(url) {
      var ws = new WebSocket(url);
	return ws;
}


function send_date()
{
	var flag = true;
	var i = index_massiv.length;

	for(obj in index_massiv)
	{
		if(out_socet === undefined || out_socet.readyState == 3)
		{
			var url =out_socet.url; 
			out_socet.close();
			
			out_socet=Socet(url);
			out_socet.onopen=function(e)
			{
				var eve ={
				type:"out",
				file:obj,
				user:login.name,
				password:login.secrid_code
				};
				var str= JSON.stringify(eve);
				this.send(str);
				
			$("#connect_status").removeClass("connect_status_off").addClass("connect_status_on").text("соеденение активно");
			}
			out_socet.onclose = function(e)
			{
			$("#connect_status").removeClass("connect_status_on").addClass("connect_status_off").text("соеденение разорвано");
			}
		}
		else
		{ 
			var len =index_massiv[obj].date.length;
			if (len>0)
				{
					flag =false;
				}
			for(var i=0;i<len;i++)
				{
					var s=obj.date.pop();
					if(!obj.soc.send(s))
						{
							obj.date.push(s);
							break;
						}
				}
		}
	
	}
	if(flag)
		{
			clearInterval(stak_ws);
			stak_ws=-1;
		}
}
// конечноесотояние соеденения ьеню сокета
// работает с приходящими сообщениями
function finel_state_socet(e)
{
			var cat =JSON.parse(e.data);
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
			else if(('ask' in cat)&&(cat.ask=='yes_give'))
					{
						connact.add_new_users(cat);
					}
			else if(('ask' in cat)&&(cat.ask=='not_give'))
			{
				alert("user "+cat.from_user+" rejected the proposal");
			}
							
}

var stak_ws=-1;
var out_socet;
var in_socet =[];
	function send(e)
	{

		
		var t ="<user>"+login.name+"<numbe>"+e.numbe+"<lenght>"+e.length+"<file>"+e.id+"<date>"+e.tag.innerHTML;
	
		if(!(e.id in index_massiv))
		{
			index_massiv[e.id]={};
			index_massiv[e.id].date=[];
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
    
    ws.onopen = function(e) {
        console.log("Client: A connection to "+this.ws.URL+" has been opened.<br />");
        };
    
    ws.onerror = function(e) {
        console.log(e);
    };
    
    ws.onclose = function(e) {
        consol.log( "Client: The connection to "+url+" was closed");
    };
    
    ws.onmessage = function(e) {
        consol.log("Server: "+e.data);
    };
	return ws;
}


function send_date()
{
	var flag = true;
	var i = index_massiv.length;
	out_socet
	for(obj in index_massiv)
	{
		if(out_socet === undefined || out_socet.readyState != 1)
		{
			out_socet.connect($("#url").val());
		}
		else
		{ 
			var len =index_massiv[obj].date.length();
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

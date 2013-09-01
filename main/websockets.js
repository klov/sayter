var out_socet;
var in_socet ={};
	function Socet() {
	
	}

Socet.prototype.connect = function(url) {
    this.url = url;
    console.log(url);
    
    if ("WebSocket" in window) {
        this.ws = new WebSocket(url);
    } else if ("MozWebSocket" in window) {
        this.ws = new MozWebSocket(url);
    } else {
         return false;
    }
    Socet.ws.onopen = function(e) {
        console.log("Client: A connection to "+this.ws.URL+" has been opened.<br />");
        
      
    };
    
    Socet.ws.onerror = function(e) {
        console.log(e);
    };
    
    Socet.ws.onclose = function(e) {
        consol.log( "Client: The connection to "+url+" was closed");
    };
    
    Socet.ws.onmessage = function(e) {
        consol.log("Server: "+e.data);
    };
}

Socet.prototype.disconnect=function () {
    this.ws.close();
	this.ws=undefin;
}

Socet.prototype.toggle_connect=function()  {
  
}

Socet.prototype.send=function (date) {
    if (this.ws === undefined || this.ws.readyState != 1) {
          consol.log("Error: socet not set");
		  return false;
    }
	var rt=$(date.tag).text();
    this.ws.send(rt);
}

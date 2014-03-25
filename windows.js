// JavaScript Document
(function($){
	$.fn.addtabs=function(id_tag,tag_html){
		for(key in mass){
	var obj='<li><a href="#'+key.replace(/\./g,"_")+'"><span>'+mass[key]+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
	
							this.children("ul").append(obj);
							obj='<div  id="'+id_tag.replace(/\./g,"_")+'" ></div>';
							this.append(obj);
							this.tabs( "refresh" );
	var yui =$(this+" .ui-icon-close");
	$(this+" .ui-icon-close").on("click",function(){
		var id=$(this).parent().children("a").attr("href")
		$(this).parent().remove();
		$(id).remove();
		});
		$(id_tag.replace(/\./g,"_")).css("margin",0);
		$(id_tag.replace(/\./g,"_")).css("padding",0);
		if (tag_html!=undefin)
		{
			$(id_tag.replace(/\./g,"_")).append(tag_html);
		}
		}
			};
	$.fn.createtabs=polymorph(
	function(name){
		
		for(key in name){
		  
		var buff=name[key];
		
		var li="";
		var div="";
		for(keyz in buff)
			{
				li+='<li><a href="#'+keyz.replace(/\./g,"_")+'"><span>'+buff[keyz]+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
							div+='<div  id="'+keyz.replace(/\./g,"_")+'" ><div ></div></div>';
							}
						}
		
		var str='<div  name="'+key+'" ><div class="menu-window "><span class="ui-icon  ui-icon-circle-close  button" ></span></div><div id="'+key+'"><ul>'+li+'</ul>'+div+'</div></div>';
		$(this).prepend(str);
		var yui=$("div[name='"+key+"'] .ui-icon-circle-close");
		$("div[name='"+key+"'] .ui-icon-circle-close").on("click",function(){
			$(this).parent().parent().remove();
			});
			$("div[name='"+key+"'] .ui-icon-close").on("click",function(){
								var id=$(this).parent().children("a").attr("href")
								$(this).parent().remove();
								$(id).remove();
								});
		var tab = $("#"+key).tabs();
		$("div[name='"+key+"']").draggable({ containment:"window",scroll: false, stack:"body>#container,body>#obraz",handle:".menu-window"});
		return $("div[name='"+key+"']");
		},
		
		
		
	function(name,clas){
		
		for(key in name){
		  
		var buff=name[key];
		
		var li="";
		var div="";
		for(keyz in buff)
			{
				li+='<li><a href="#'+keyz.replace(/\./g,"_")+'"><span>'+buff[keyz]+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
							div+='<div  id="'+keyz.replace(/\./g,"_")+'" class="'+clas.frame+'"></div>';
							
							
	
				}
				
		}
		
		var str='<div  class="'+clas.wind+'" name="'+key+'" ><div class="menu-window "><span class="ui-icon  ui-icon-circle-close  button" ></span></div><div id="'+key+'"><ul>'+li+'</ul>'+div+'</div></div>';
		$(this).prepend(str);
		var yui=$("div[name='"+key+"'] .ui-icon-circle-close");
		$("div[name='"+key+"'] .ui-icon-circle-close").on("click",function(){
			$(this).parent().parent().remove();
			});
			$("div[name='"+key+"'] .ui-icon-close").on("click",function(){
								var id=$(this).parent().children("a").attr("href")
								$(this).parent().remove();
								$(id).remove();
								});
		var tab = $("#"+key).tabs();
		$("div[name='"+key+"']").draggable({ containment:"window",scroll: false, stack:"body>#container,body>#obraz",handle:".menu-window"});
		return $("div[name='"+key+"']");
		},
		
		
function(name,clas,tags){
		for(key in name){
		  
		var buff=name[key];
		
		var li="";
		var div="";
		for(keyz in buff)
			{
				li+='<li><a href="#'+keyz.replace(/\./g,"_")+'"><span>'+buff[keyz]+'</span></a><span class="ui-icon ui-icon-close krest" role="presentation"></span></li>';
							div+='<div  id="'+keyz.replace(/\./g,"_")+'"><div></div></div>';
							
					}
		
		
		}
		
		var str='<div  class="'+clas.wind+'" name="'+key+'" ><div class="menu-window "><span class="ui-icon  ui-icon-circle-close " ></span></div><div id="'+key+'"><ul>'+li+'</ul>'+div+'</div></div>';
		$(this).prepend(str);
		
				
		$("div[name='"+key+"'] .ui-icon-circle-close").on("click",function(){
			$(this).parent().parent().remove();
			});
			$("div[name='"+key+"'] .ui-icon-close").on("click",function(){
								var id=$(this).parent().children("a").attr("href");
								$(this).parent().remove();
								$(id).remove();
								});
		var tab = $("#"+key).tabs();
		
		for(key in name){
		  
		var buff=name[key];
			for(keyz in buff){
			$("#"+keyz.replace(/\./g,"_")).css("margin",0);
			$("#"+keyz.replace(/\./g,"_")).css("padding",0);
			$("#"+keyz.replace(/\./g,"_")).children().append(tags);
			}
		}
		$("div[name='"+key+"']").draggable({ containment:"window",scroll: false, stack:"body>#container,body>#obraz",handle:".menu-window"});
		return $("div[name='"+key+"']");
		}	
		
	);
})(jQuery);

function polymorph() {
  var len2func = [];
  for(var i=0; i<arguments.length; i++)
    if(typeof(arguments[i]) == "function")
      len2func[arguments[i].length] = arguments[i];
  return function() {
    return len2func[arguments.length].apply(this, arguments);
  }
}
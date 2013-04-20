/////////////////////////////////////////////////////////////////////////////////////////
//работа анимации меню ,закрытие вкладок,анимация диалога
/////////////////////////////////////////////////////////////////////////////////////////

var Tmat,i;
var timer=null;

function Onanimation(mat,obj)
{
	timer=1;
var yoi=document.getElementById(mat);
var Tdiv=yoi.getElementsByClassName('konteyner');
	if($("#"+mat).attr("state")==1){
   $("#"+mat+">div").each(function(index, element) {
    var u=$(this).css("display");
	if(u=="block")
	$(this).toggle("100");
}); 
	$("#"+mat).attr("state","0");
	}
   else{
  $("#"+mat+">div").each(function(index, element) {
    var u=$(this).css("display");
	if(u=="none")
	$(this).toggle("100");
  });
   $("#"+mat).attr("state","1");
   }
timer=null;
}

//////////////////////CONNECT//////////////////////////////////////////////////////////

	
function option_clic(){
	$.unblockUI() ;
	
}
function close_tab(id_name)
{
	var y=$(id_name).tabs( "option", "collapsible" );
	$(id_name).tabs({ collapsible: true });
}
function clos(Obj)
{
$(Obj).parent().parent().toggle("100");
} 

function ignor(Obj)
{
if (Obj.className.search("ui-icon-locked")!=-1)
{
$(Obj).removeClass("ui-icon-locked");
$(Obj).addClass("ui-icon-unlocked");
}
else
{
$(Obj).addClass("ui-icon-locked");
$(Obj).removeClass("ui-icon-unlocked");
}
} 
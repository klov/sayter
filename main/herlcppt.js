 // JavaScript Document
catch_tag='';
var index_massiv={};
function preg_quote( str ) {   
    return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}
var Koment =new Array("/*","*/");
var Slova  = new Array("asm","auto","break","case","catch","char","class","const","const_cast","continue","default","delete","do","double","dynamic_cast","else", "enum","explicit","export","extern","float","for","friend","goto","if","inline","int","long,mutable","namespace","new","operator","private","protected","public","register","reinterpret_cast","return","short","signed","sizeof","static","static_cast","struct","switch","template","this","throw","try","typedef","typeid"," typename","union","unsigned","using","virtual","void","volatile","wchar_t","while","then");
var myRegExp = "\\b("+Slova[0];
			for(var i=1;i<Slova.length;i++)
			{
				myRegExp = myRegExp+"|"+Slova[i];
			}
			myRegExp = myRegExp+")\\b";
				var myRegExp = new RegExp(myRegExp,"gim") ;			//регулярка служебных
	granica=/((\s)+|>|<|&nbsp;|&harr;|\/\*|\*\/|[(]|[)]|[{]|[}])/gim;




function focus_in(par,html_tag,flag)
{	

	if (par==13||par==86)
{
/////////////////////////////////////////////////////////////////////////
	$('#yakor').remove();
	
	var yakor=document.createElement('span');
				yakor.setAttribute("name","koretka");
				yakor.id="yakor"; 
	///////////////////////////////////////////////////////////////////////////
	  if (document.getSelection) 
	{	
	var  sel=document.getSelection().getRangeAt(0);
    	  sel.insertNode(yakor);
		
	}
	else  if (document.selection)
	{
	Gavno = true;
	var selectedText=document.createRange();
	selectedText.pasteHTML(yakor);
	selectedText.anchorNode;
	}
	///////////////////////////////////////////////////////////////////////////
																					//добавление в массив на отправление
	///////////////////////////////////////////////////////////////////////////
	var txt=$(html_tag).html();
	txt=txt.replace(/(<span id="yakor" name="koretka"><\/span>|<span name="koretka" id="yakor"><\/span>)/gim,"&harr;");
	txt=txt.replace(/(<div class="stroka">|<font color="#0000ff">|<\/font>)/gim,'');
	txt=txt.replace(/(<\/div>)/gim,'<br>');											//устанавливаю якорь для коретки
	var reg =new RegExp("(<br>)","m");
	var msslov = txt.split(reg);
	txt="";
	for(var i=0;i<msslov.length;i++)
			{
				if(msslov[i]!="<br>")
				{
					if(msslov[i].length==0)
					{
						txt=txt+'<div class="stroka">&nbsp;&nbsp;</div>';
					}else
					
				txt=txt+'<div class="stroka">'+msslov[i]+'</div>';
				}
			}
			txt=txt.replace(/&harr;/gmi,'<span id="yakor" name="koretka"><\/span>');
			$(html_tag).html("");
			$(html_tag).html(txt);
			var mas =document.getElementsByClassName("stroka");
			
			if(par==86)													//нажатие интера
			$("div.kod div").each(function(index, element) {
                backlight(this);
            });
				var koretka = document.getElementsByName("koretka")[0];
		if(koretka!=undefined)
		if ( document.createRange ) {
		    rng = document.createRange();
    		rng.selectNode(koretka);
    		sel = document.getSelection();
    		sel.removeAllRanges();
    		sel.addRange( rng );
  			} else {
    		var rng = document.body.createTextRange();
    		rng.moveToElementText(koretka);
    		rng.select();
			}
		
}
		/////////////////////////////////////////////////////////////////////////////////
if(par==40|par==38)
{ 
//////////////////////////////////////////////////////////////
  if (document.getSelection) 
	{
	$(".kod>span").remove();	
	$(catch_tag).removeClass("activ_string");	
	var  range=document.getSelection().getRangeAt(0);
	var tag=html_tag;
											
	if(flag)
	{
		html_tag=document.getSelection().anchorNode;
		do
			{
				if(html_tag.tagName=="DIV")
				break;
			html_tag=html_tag.parentElement;
			}	
			while(html_tag.tagName!="DIV");
	}
	
	$(html_tag).addClass("activ_string") ;
	if(html_tag.classList.contains('stroka'))
	{
		
		/////////////////////////////////////////////////////////////////////////////////////
		var link={};
		var tags=$(tag).children();
		for(var i=0;i<tags.length;i++)
		{
			if (tags[i]==html_tag)
			{
				link['tag']=html_tag;
				link['numbe']=i;
				break;
			}
		}
	if(tag.id in index_massiv)
	{																						//добавление строк на отправку
		index_massiv[tag.id].push(link);
	} else
	{
		index_massiv[tag.id]=[html_tag];
	}
	/////////////////////////////////////////////////////////////////////////////////////	
		var content=$(html_tag).text();
		$(html_tag).text(content);
		content =$(catch_tag).text();
	
	//////////////////////////////////////////////////
	var masslov = content.split(granica);
	var txt="";
			 for(var i=0;i<masslov.length;i++)
			 {
				 if (masslov[i]==undefined)
			 {masslov[i]="";}
			 if(masslov[i].length!=0){	
			 		if(masslov[i].search(myRegExp)!=-1)
						{																			//разбиение текста по дивам
							txt=txt+'<span class="oper">'+masslov[i]+'</span>';
						}
						else
						{
							txt+='<span>'+masslov[i]+'</span>';
						}
			}
			}	
		$(catch_tag).html(txt);
	//////////////////////////////////////////////////
	}
	
	//////////////////////////////////////////////////
																			
	}
	
///////////////////////////
  			}
			
}
function focus_uot()
{
	
	var  range=document.getSelection().getRangeAt(0);											
	
		html_tag=document.getSelection().anchorNode;
		do
			{
				if(html_tag.tagName=="DIV")
				break;
			html_tag=html_tag.parentElement;
			}	
			while(html_tag.tagName!="DIV");
	
	
	if(html_tag.classList.contains('stroka'))
	{
	catch_tag=html_tag;
	}
}


	
function backlight(html_tag)
{
	$('#yakor').remove();
	var yakor=document.createElement('span');
	yakor.setAttribute("name","koretka");
	yakor.id="yakor"; 
//////////////////////////////////////////////////////////////
  if (document.getSelection) 
	{	
		  var  range=document.getSelection().getRangeAt(0);											
	   	  range.insertNode(yakor);								
	}
	else  if (document.selection)
	{
	Gavno = true;
	var selectedText=document.createRange();
	selectedText.pasteHTML(yakor);
	selectedText.anchorNode;
	}
//////////////////////////////////////////////////////////////
	var tag_elem=html_tag;
	
		var NachKoment = false;
$(html_tag).each(function(index, element) {
   

////////////////////////////////////////////////////
    var MyText = $(this).html();
	MyText=MyText.replace(/(<span id="yakor" name="koretka"><\/span>|<span name="koretka" id="yakor"><\/span>)/gim,'&harr;');				//якорь
	MyText=MyText.replace(/(<span class="koment">|<\/span>|<span class="oper">|<span>|<div onkeyup="Syntex(event.keyCode,this)|<\/div>">|<font color="#0000ff">|<\/font>)/gi,'');
	var masslov = MyText.split(granica);
	var txt="";
			 for(var i=0;i<masslov.length;i++)
			 {
				 if (masslov[i]==undefined)
			 {masslov[i]="";}
			 if(masslov[i].length!=0){	
			 		if(masslov[i].search(myRegExp)!=-1)
						{																			//разбиение текста по дивам
							txt=txt+'<span class="oper">'+masslov[i]+'</span>';
						}
						else
						{
							txt+='<span>'+masslov[i]+'</span>';
						}
			}
			 }
			txt=txt.replace(/&harr;/gi,'<span id="yakor" name="koretka"><\/span>');
			$(this).html(txt);																	//возврат коретки
			koment();
			
});
			var koretka = document.getElementsByName("koretka")[0];
		if(koretka!=undefined)
		if ( document.createRange ) {
		    rng = document.createRange();
    		rng.selectNode(koretka);
    		sel = document.getSelection();
    		sel.removeAllRanges();
    		sel.addRange(rng);
  			} else {
    		var rng = document.body.createTextRange();
    		rng.moveToElementText(koretka);
    		rng.select();
  			}				
}



function koment()
{
	Koment_state=false;
	$("span").each(function(index, element) {
		
        if($(this).text().search(new RegExp(preg_quote(Koment[0])))!=-1)
		{
		Koment_state=true;
		$(this).addClass("koment");
		}
			else
		if($(this).text().search(new RegExp(preg_quote(Koment[1])))!=-1)
		{
		Koment_state=false;
		$(this).addClass("koment");
		}else
		if(Koment_state){
			$(this).addClass("koment");
		}else{
			$(this).removeClass("koment");
			}
    });
}


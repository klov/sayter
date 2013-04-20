 // JavaScript Document
var on=false;
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
	granica=/((\s)+|\/\*|\*\/|[(]|[)]|[{]|[}])/gim;
function Syntex(par,html_tag,flag)
{	
//////////////////////////////////////////////////////////////////////////////
	var browser = $.browser.mozilla; 
	$('#yakor').remove();
	var yakor=document.createElement('span');
				yakor.setAttribute("name","koretka");
				yakor.id="yakor"; 
  
//////////////////////////////////////////////////////////////////////////////

	

	if (par==13||par==86)
{
	///////////////////////////////////////////////////////////////////////////
	  if (document.getSelection) 
	{	
	var  sel=document.getSelection().getRangeAt(0);
			if(browser)
			{
    	  sel.insertNode(yakor);
			}
			else
			{
			 var rangeObj = document.createDocumentFragment();
       		rangeObj.appendChild(yakor);
			sel.isertNode(rangeObj);
			}
	}
	else  if (document.selection)
	{
	Gavno = true;
	var selectedText=document.createRange();
	selectedText.pasteHTML(yakor);
	selectedText.anchorNode;
	}
	///////////////////////////////////////////////////////////////////////////
	var txt=$(html_tag).html();
	txt=txt.replace(/<span id="yakor" name="koretka"><\/span>/gim,"&harr;");
	txt=txt.replace(/(<div name="stroka">)/gim,'');
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
						txt=txt+'<div name="stroka">&nbsp;&nbsp;</div>';
					}else
				txt=txt+'<div name="stroka">'+msslov[i]+'</div>';
				}
			}
			txt=txt.replace(/&harr;/gmi,'<span id="yakor" name="koretka"><\/span>');
			$(html_tag).html("");
			$(html_tag).html(txt);
			if(par==86)													//нажатие интера
			$("div.kod div").each(function(index, element) {
                Syntex(32,$(this),false)
            });

}

if (par==32|par==57|par==59|par==37|par==40|par==38|par==191|par==56|par==39)
{
//////////////////////////////////////////////////////////////
  if (document.getSelection) 
	{	
	var  sel=document.getSelection().getRangeAt(0);											
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
	///////////////////////////////////////////////////
			if(browser)
			{
    	  sel.insertNode(yakor);
			}																			//помещение якоря
			else
			{
			 var rangeObj = document.createDocumentFragment();
       		rangeObj.appendChild(yakor);
			sel.isertNode(rangeObj);
			}
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
   
	///////////////////////////////////////////////////
			
////////////////////////////////////////////////////
    var MyText = $(this).html();
	MyText=MyText.replace(/<span id="yakor" name="koretka"><\/span>/gi,'&harr;');				//якорь
	MyText=MyText.replace(/(<span class="koment">|<\/span>|<span class="oper">|<span>|<div onkeyup="Syntex(event.keyCode,this)|<\/div>">)/gi,'');
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

		}	
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




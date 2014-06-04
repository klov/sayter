  ﻿<?php

$mas_type =array();
include_once("../php_script/connect_db.php");
		$name = strip_tags($_POST["user_name"]);
		$name = htmlspecialchars($name);
		$name = mysql_escape_string($name);

		$pas = strip_tags($_POST["password"]);
		$pas = htmlspecialchars($pas); 
		$pas = mysql_escape_string($pas);
		if(!preg_match("\,|\s",$_POST["type"]))
		{
		$qure ="SELECT * FROM user_online WHERE name LIKE '".$name."' AND password LIKE '".$pas."'";
	
		$result = mysql_query($qure,$db) or die("error select");
		if(mysql_num_rows($result)>0)
		{
			$dir_name="./".uniqid("");
			
			if(mkdir($dir_name,0777,true))
			{
				for($i=0;$i<count($_POST["file_name"]);$i++)
					{	
						$fp = fopen($dir_name."/".$_POST['file_name'][$i],"w+");
						fwrite($fp,$_POST['file_content'][$i]);
						fclose($fp);
					}
							
								$qure=creator($_POST["type"],$_POST['file_name'],$dir_name);
							
								exec($qure,$output,$ret_val);
							if($ret_val)
							{	
								foreach($output as $val)
								$ansver.=str_replace($name_file," ",$val)."<br>";
								echo $ansver;
							} else
							{
								echo "compilation is successful";
							}
			}
if(is_dir($dir_name))
		{
		
		remove_dir($dir_name);
				
		}
		}
		
		}
		
		
function remove_dir($path)
{
	if(file_exists($path) && is_dir($path))
	{
		$dirHandle = opendir($path);
		while (false !== ($file = readdir($dirHandle))) 
		{
			if ($file!='.' && $file!='..') 
			{
				$tmpPath=$path.'/'.$file;
				chmod($tmpPath, 0777);
				
				if (is_dir($tmpPath))
	  			{  
					remove_dir($tmpPath);
			   	} 
	  			else 
	  			{ 
	  				if(file_exists($tmpPath))
					{
						unlink($tmpPath);
					}
	  			}
			}
		}
		closedir($dirHandle);
		if(file_exists($path))
		{
			rmdir($path);
		}
	}
	
} 

function creator($type,$name_files,$dr)
{
	
	if($type==".cpp")
	{

		$qure="gcc ";
	for($i=0;$i<count($name_files);$i++)
	$qure.=$dr."/".$name_files[$i]." ";
	$qure .="  -lstdc++ -o ".$dr."/out  2>&1";
	}
	return $qure;
}
?>

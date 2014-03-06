  ﻿<?php

$mas_type =array();
include_once("../php_script/connect_db.php");
		$name = strip_tags($_GET["user_name"]);
		$name = htmlspecialchars($name);
		$name = mysql_escape_string($name);

		$pas = strip_tags($_GET["password"]);
		$pas = htmlspecialchars($pas); 
		$pas = mysql_escape_string($pas);
		if(!preg_match("\,|\s",$_GET["type"]))
		{
		$qure ="SELECT * FROM user_online WHERE name LIKE '".$name."' AND password LIKE '".$pas."'";
	
		$result = mysql_query($qure,$db) or die("error select");
	
		if(mysql_num_rows($result)>0)
		{
		
			$name_file=uniqid("").$_GET["type"];

			$name_file="./".$name."/".$name_file;
			$dir_name="./".$name;
			
			if(mkdir($dir_name,0777,true))
			{
			$fp = fopen($name_file,"w+");
			if(fwrite($fp,$_GET["file"]))
			{
			$qure = "gcc ".$name_file."  -lstdc++ -o ".$dir_name."/out  2>&1";
			exec($qure,$output,$ret_val);
			if($ret_val)
				{	
					
					$ansver = json_encode($output);
					echo $ansver;
				} else
				{
					
					echo "{\"resul\":\"compilation is successful\"}";
					
				}
		}else{
		echo "{\"error\":\"error write \"}";
		}
		fclose($fp);

if(is_dir($dir_name))
		{

		remove_dir($dir_name);
				
		}
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
?>

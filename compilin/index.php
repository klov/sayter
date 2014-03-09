  ﻿<?php


include_once("./connect_db.php");
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
		
			$name_file=uniqid("").$_POST["type"];

			$name_file="./".$name."/".$name_file;
			$dir_name="./".$name;
			
			if(mkdir($dir_name,0777,true))
			{
			$fp = fopen($name_file,"w+");
			if(fwrite($fp,$_POST["file"])&&($_POST["type"]==".cpp"))
			{
			$qure = "gcc ".$name_file." -Wall -lstdc++ -o ".$dir_name."/out  2>&1";
			exec($qure,$output,$ret_val);
			if($ret_val)
				{	
					foreach($output as $val)
					$ansver.=$val."<br>";
					
					echo $ansver;
				} else
				{
					
					echo "compilation is successful";
					
				}
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

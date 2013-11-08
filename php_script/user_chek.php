<?php

include_once("connect_db.php"); 


if(isset($_GET["out"]))
	{
		
		$input_text = strip_tags($_GET["name"]);
		$input_text = htmlspecialchars($input_text);
		$input_text = mysql_escape_string($input_text);
		
		$qure = "SELECT * FROM  user where name like '".$input_text."'";
			
			
			
		$result = mysql_query($qure,$db) or die("error select");
		if(mysql_num_rows($result)>0)
		{
			$myrow=mysql_fetch_array($result);
			do
			{
			$qure = 'DELETE FROM files WHERE id_private='.$myrow['id']; 
					$result = mysql_query($qure,$db) or die("error eror");
			}
			while ($myrow=mysql_fetch_array($result));
			
			$input_text = strip_tags($_GET["name"]);
			$input_text = htmlspecialchars($input_text);
			$input_text = mysql_escape_string($input_text);
			
			mysql_query("DELETE FROM user WHERE name LIKE '".$input_text."'",$db) or die("error remmove");
		}
	}
	else
	{
		
header ('Content-Type: application/xml; charset=UTF-8');
		if(isset($_GET["name"]))
		{
			$input_text = strip_tags($_GET["name"]);
			$input_text = htmlspecialchars($input_text);
			$input_text = mysql_escape_string($input_text);
			
			$qure ="SELECT * FROM  user WHERE name LIKE '".$input_text."'";
	
			$result = mysql_query($qure,$db) or die("error select");
			if (mysql_num_rows($result)>0)
				{
					$answer="<ansver>0</ansver>";
					echo $answer;
				}
				else
				{	
				
				
				$input_name = strip_tags($_GET["name"]);
				$input_text = htmlspecialchars($input_name);
				$input_text = mysql_escape_string($input_name);
		
				$input_ip = strip_tags($_GET["name"]);
				$input_ip = htmlspecialchars($input_ip);
				$input_ip = mysql_escape_string($input_ip);
				
					$qure = 'INSERT INTO user(name,URL_adres) VALUES ("'.$input_name.'","'.$input_ip.'")';
		
					$result = mysql_query($qure,$db) or die("error insert");
					$answer="<ansver>1</ansver>";
					echo $answer;
				}
		}
	}

{
}
?>
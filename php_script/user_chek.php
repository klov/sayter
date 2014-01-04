<?php

include_once("connect_db.php"); 
		
header ('Content-Type: application/xml; charset=UTF-8');
		if(isset($_GET["name"])&&($_GET["name"]!=""))
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
		
				$input_ip = strip_tags($_GET["ip"]);
				$input_ip = htmlspecialchars($input_ip);
				$input_ip = mysql_escape_string($input_ip);
					$key=uniqid("");
					$salt=uniqid("");
			
					$h_key  =md5($key.$salt); 		
				
					$qure = 'INSERT INTO user(name,URL_adres,key_h,salt) VALUES ("'.$input_name.'","'.$input_ip.'","'.$h_key.'","'.$salt.'")';
					
					$result = mysql_query($qure,$db) or die("error insert");
					$answer="<ansver>".$key."</ansver>";
					
					echo $answer;
				}
		}


{
}
?>

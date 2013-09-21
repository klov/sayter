<?php

include_once("connect_db.php"); 


if(isset($_GET["out"]))
	{
		$qure = "SELECT * FROM  user where name like '".$_GET["name"]."'";
			
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
			mysql_query("DELETE FROM user WHERE name LIKE '".$_GET["name"]."'",$db) or die("error remmove");
		}
	}
	else
	{
		
header ('Content-Type: application/xml; charset=UTF-8');
		if(isset($_GET["name"]))
		{
			$qure ="SELECT * FROM  user WHERE name LIKE '".$_GET["name"]."'";
	
			$result = mysql_query($qure,$db) or die("error select");
			if (mysql_num_rows($result)>0)
				{
					$answer="<ansver>0</ansver>";
					echo $answer;
				}
				else
				{	
					$qure = 'INSERT INTO user(name,URL_adres) VALUES ("'.$_GET["name"].'","'.$_GET["ip"].'")';
		
					$result = mysql_query($qure,$db) or die("error insert");
					$answer="<ansver>1</ansver>";
					echo $answer;
				}
		}
	}

{
}
?>
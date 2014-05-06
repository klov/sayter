<?php
include_once("connect_db.php");
if(isset($_GET['close'])&&isset($_GET['file'])&&isset($_GET['user_name']))
{
		$input_text = strip_tags($_GET["user_name"]);
		$input_text = htmlspecialchars($input_text);
		$input_text = mysql_escape_string($input_text);
		
		$qure ="SELECT id FROM user_online WHERE name LIKE '".$input_text."'";
	
		$result = mysql_query($qure,$db) or die("error select");
		
		if(mysql_num_rows($result)>0)
		{
			$myrow=mysql_fetch_array($result);
			
			
			$input_text = strip_tags($_GET["file"]);
			$input_text = htmlspecialchars($input_text);
			$input_text = mysql_escape_string($input_text);
			
			$qure = "DELETE FROM files WHERE id_private=".$myrow['id']." AND name LIKE '".$input_text."'"; 
			$result = mysql_query($qure,$db);
		}
			
}
else if(isset($_GET['file'])&&isset($_GET['user_name']))
{		

		$input = strip_tags($_GET["user_name"]);
		$input = htmlspecialchars($input_text);
		$input = mysql_escape_string($input_text);

		$qure ="SELECT id FROM user WHERE name LIKE '".$input."'";
	
		$result = mysql_query($qure,$db) or die("error select");
		if(mysql_num_rows($result)>0)
		{
			$myrow=mysql_fetch_array($result);
			
				$answer="<ansver>0</ansver>";
				echo $answer;
				$input_text = strip_tags($_GET["file"]);
				$input_text = htmlspecialchars($input_text);
				$input_text = mysql_escape_string($input_text);
			
			$qure = 'INSERT INTO files(name,id_private) VALUES ("'.$input_text.'","'.$myrow['id'].'")';
		
					$result = mysql_query($qure,$db) or die("error insert");

		
		}
}
?>
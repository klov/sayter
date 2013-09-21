<?php
include_once("connect_db.php"); 
if(isset($_GET['file'])&&isset($_GET['user_name']))
{		
		$qure ="SELECT id FROM user WHERE name LIKE '".$_GET['user_name']."'";
	
		$result = mysql_query($qure,$db) or die("error select");
		if(mysql_num_rows($result)>0)
		{
			$myrow=mysql_fetch_array($result);
			
				$answer="<ansver>0</ansver>";
				echo $answer;
			$qure = 'INSERT INTO files(name,id_private) VALUES ("'.$_GET["file"].'","'.$myrow['id'].'")';
		
					$result = mysql_query($qure,$db) or die("error insert");

		
		}
}
?>
<?php 
include_once("connect_db.php"); 
error_reporting( E_ERROR );
header ('Content-Type: application/xml; charset=UTF-8');
$answer ="<files>";
if (isset($_GET['name']))
{
	$qure ="SELECT id FROM user WHERE name LIKE '".$_GET['name']."'";
	$result = mysql_query($qure,$db) or die("error select");
	$myrow=mysql_fetch_array($result);
	$result = mysql_query("SELECT * FROM files WHERE id_private=".$myrow['id'],$db) or die('ERROR');
	
	if(mysql_num_rows($result)>0){
		$myrow=mysql_fetch_array($result);
		do
			{
				$answer.="<file>".$myrow["name"]."</file>";
			}
		while ($myrow=mysql_fetch_array($result));
		}

$answer.="</files>";
echo $answer;
}
?>
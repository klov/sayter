<?php 
//  подлючение к базе даннных
include_once("php_script/connect_db.php"); 
header ('Content-Type: application/xml; charset=UTF-8');
$answer ='<?xml version="1.0" ?>';
$answer ="<users>";
$result = mysql_query("SELECT name,id FROM user_online",$db) or die('ERROR');
if(mysql_num_rows($result)>0){
$myrow=mysql_fetch_array($result);
do
{
$answer.="<user><name>".$myrow["name"]."</name><id>".$myrow['id']."</id></user>";
}
while ($myrow=mysql_fetch_array($result));
}else
{
}

$answer.="</users>";
echo $answer;

?>
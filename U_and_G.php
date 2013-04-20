<?php 
//  подлючение к базе даннных
include_once("php_script/connect_db.php"); 
header ('Content-Type: application/xml; charset=UTF-8');
$answer ='<?xml version="1.0" ?>';
$answer ="<users>";
$result = mysql_query("SELECT name,URL_adres,id FROM user",$db) or die('ERROR');
if(mysql_num_rows($result)>0){
$myrow=mysql_fetch_array($result);
do
{
$answer.="<user><name>".$myrow["name"]."</name><URL>".$myrow["URL_adres"]."</URL><id>".$myrow['id']."</id></user>";
}
while ($myrow=mysql_fetch_array($result));
}else
{
}
$result = mysql_query("SELECT * FROM `group`",$db) or die('ERROR2');
$myrow=mysql_fetch_array($result);
if(mysql_num_rows($result)>0){
do
{
$answer.='<group><name>'.$myrow['name'].'</name><id>'.$myrow['id'].'</id></group>';	
}
while ($myrow=mysql_fetch_array($result));
}else{
	}
$answer.="</users>";
echo $answer;

?>
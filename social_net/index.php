<html>
<head>
<?php
include_once("git_hub.php");
include_once("../php_script/connect_db.php");
$auth =array('client_id'=>'5eaf0b6264a9d816909a','client_secret'=>'bf642471035e6d32c2931e9f9e4c47b1e2bf4d99');
$g_h= new git_hub();
$user=$g_h->login($auth); 

	$qure ="SELECT * FROM  user WHERE hub_id LIKE '".$user['id']."'";
	
			$result = mysql_query($qure,$db) or die("error select");
			if (mysql_num_rows($result)==0)
			{
			
	$qure = 'INSERT INTO user(token,hub_id) VALUES ("'.$user['access_token'].'","'.$user['id'].'")';
	
	$result = mysql_query($qure,$db) or die("error insert");
			}
	$str='Location: login.html?id='.$user['id'];
	//echo $str;
	echo '<meta http-equiv="refresh" content="0;url=http://codestream.us/social_net/login.html?id='.$user['id'].'" />';

?>
</html>
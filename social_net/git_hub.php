
<?php

class git_hub
	{
	
	public function login($auth)
		{
		
		 $HOST = ''; 
  $default_port = 80;
 
   if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=='on')) {
    $HOST .= 'https://';
    $default_port = 443;
  } else {
     $HOST .= 'http://';
  }
   $HOST .= $_SERVER['SERVER_NAME'];
   if ($_SERVER['SERVER_PORT'] != $default_port) {
  
    $HOST .= ':'.$_SERVER['SERVER_PORT'];
  }
  $HOST .= $_SERVER['REQUEST_URI'];	
  			
	if (isset($_GET['code'])) {
		
		$heder =array("Accept:application/json");

    $curl = curl_init('https://github.com/login/oauth/access_token');
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
	curl_setopt($curl, CURLOPT_POST, 1);
	
	curl_setopt($curl,CURLOPT_HTTPHEADER,$heder);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, 'code='. $_GET['code'].'&redirect_uri='.urlencode($HOST).'&client_id=' . $auth['client_id'] . '&client_secret=' . $auth['client_secret']);
	$s = curl_exec($curl);
	curl_close($curl);
	
	$au = json_decode($s,true);
	$str='https://api.github.com/user?access_token=' . $au['access_token'].'&client_id=' . $auth['client_id'] . '&client_secret=' . $auth['client_secret'];
	
	$heder =array('User-Agent:Mozilla/1.22 (compatible; MSIE 5.01; PalmOS 3.0) EudoraWeb 2');
	$c = curl_init( $str);
	curl_setopt($c, CURLOPT_FOLLOWLOCATION, 0);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_HEADER, 0);
    curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($c, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
	curl_setopt($c,CURLOPT_HTTPHEADER,$heder);
					
	$p = curl_exec($c);			
	curl_close($curl);			
											
	$user = json_decode($p, true);
	$user['access_token']=$au['access_token'];
	return $user;

} else{   header('Location: https://github.com/login/oauth/authorize?client_id='.$auth['client_id'].'&scope=user,repo,gist&state='.uniqid("").'&redirect_uri='.urlencode($HOST));
}
	} 
		
	
	
}

?>

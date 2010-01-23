<?PHP

$shell['title1'] = "jQuery longUrl";
$shell['link1']  = "http://benalman.com/projects/jquery-longurl-plugin/";

ob_start();
?>
  <a href="http://benalman.com/projects/jquery-longurl-plugin/">Project Home</a>,
  <a href="http://benalman.com/code/projects/jquery-longurl/docs/">Documentation</a>,
  <a href="http://github.com/cowboy/jquery-longurl/">Source</a>
<?
$shell['h3'] = ob_get_contents();
ob_end_clean();

$shell['jquery'] = 'jquery-1.4.js';
//$shell['jquery'] = 'jquery-1.3.2.js';

$shell['shBrush'] = array( 'JScript' );

?>

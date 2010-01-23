<?PHP

include "../index.php";

$shell['title3'] = "Long Url";

$shell['h2'] = 'Uniform Resource Elongator: The little blue pill for all your "URL ills".';

// ========================================================================== //
// SCRIPT
// ========================================================================== //

ob_start();
?>
$(function(){
  
  // Select some A elements.
  $('#test a')
    
    // Set a default title attribute for these links.
    .attr( 'data-title', 'Not processed!' )
    
    // By default, $('a').longUrl(); will updated the href and title attributes
    // for each selected A element, as long as its href was a short URL that
    // could be lengthened. In this example, we get a little more custom, in
    // order to show how flexible the plugin can be...
    .longUrl({
      
      // Set the data-title HTML5 attribute as well as a class for each element
      // or group of elements that share the same href.
      callback: function( href, long_url ) {
        if ( long_url ) {
          this.attr({ 'data-title': 'Lengthened: ' + long_url }).addClass( 'expanded' );
        } else {
          this.attr({ 'data-title': 'Not lengthened: ' + href }).addClass( 'not-expanded' );
        }
      },
      
      // When all fetching and processing is done, set the '#info' text to
      // something interesting.
      complete: function( result ) {
        var num_elements = this.length,
          num_unique = 0,
          num_lengthened = 0,
          num_not_lengthened = 0,
          text;
        
        $.each( result, function( href, long_url ){
          num_unique++;
          long_url ? num_lengthened++ : num_not_lengthened++;
        });
        
        text = 'Of ' + num_elements + ' elements, there were ' + num_unique
          + ' unique absolute links, ' + num_lengthened
          + ' of which could be lengthened, and ' + num_not_lengthened
          + ' of which could not.';
        
        $('#info').text( text );
      }
    })
    
    // Show the title attribute on hover.
    .live( 'mouseover', function(e){
      var title = $(this).attr( 'data-title' );
      $('#info').text( title );
    });
});
<?
$shell['script'] = ob_get_contents();
ob_end_clean();

// ========================================================================== //
// HTML HEAD ADDITIONAL
// ========================================================================== //

ob_start();
?>
<script type="text/javascript" src="../../jquery.ba-longurl.js"></script>
<script type="text/javascript" language="javascript">

<?= $shell['script']; ?>

$(function(){
  
  // Syntax highlighter.
  SyntaxHighlighter.highlight();
  
});

</script>
<style type="text/css" title="text/css">

/*
bg: #FDEBDC
bg1: #FFD6AF
bg2: #FFAB59
orange: #FF7F00
brown: #913D00
lt. brown: #C4884F
*/

#page {
  width: 700px;
}

#test {
  line-height: 2em;
}

#test a,
#info {
  padding: 0.2em 0.4em;
}

#test a {
  color: blue;
  border: 2px solid #aaa;
  white-space: pre-wrap;
  line-height: 2.2em;
}

#test a:hover {
  background: #eee;
}

#test a:visited {
  color: purple;
}

#test .expanded {
  border-color: #0a0;
}

#test .expanded:hover {
  background: #cfc;
}

#test .not-expanded {
  border-color: #f00;
}

#test .not-expanded:hover {
  background: #fdd;
}

#info {
  color: #913D00;
  border: 1px solid #913D00;
  background: #FDEBDC;
}

</style>
<?
$shell['html_head'] = ob_get_contents();
ob_end_clean();

// ========================================================================== //
// HTML BODY
// ========================================================================== //

ob_start();
?>
<?= $shell['donate'] ?>

<p>
  <a href="http://benalman.com/projects/jquery-longurl-plugin/">jQuery Long Url</a> uses the <a href="http://www.longurlplease.com/">longurlplease.com</a> short URL lengthening API to expand short URLs
  from at least 80 services, including bit.ly, is.gd, tinyurl.com and more!
</p>
<p>
  And not only has jQuery Long Url been written to take advantage of the longurlplease.com API
  "batch" ability, where up to ten URLs can be lengthened per request, but it can optionally use any
  lengthening service, supporting any URL-per-request "batch" limitations, which minimizes the number
  of external requests made for faster performance.
</p>

<h3>Link info</h3>

<div id="info">
  &nbsp;
</div>

<div id="test">
  <h3>These links' title should be lengthened, just hover over them (green border):</h3>
  
  <p>
    <a href="http://bit.ly/Uu2VH">http://bit.ly/Uu2VH</a>
    <a href="http://url.ie/4qns">http://url.ie/4qns</a>
    <a href="http://kl.am/NUl">http://kl.am/NUl</a>
    <a href="http://bacn.me/olo">http://bacn.me/olo</a>
    <a href="http://lost.in/rE">http://lost.in/rE</a>
    <a href="http://kl.am/6wjT">http://kl.am/6wjT</a>
    <a href="http://su.pr/A5aJ2t">http://su.pr/A5aJ2t</a>
    <a href="http://j.mp/56unIk">http://j.mp/56unIk</a>
    <a href="http://tinyurl.com/ye5sqjy">http://tinyurl.com/ye5sqjy</a>
    <a href="http://tinyurl.com/d2b3do">http://tinyurl.com/d2b3do</a>
    <a href="http://bit.ly/JQcVw">http://bit.ly/JQcVw</a>
    <a href="http://bit.ly/ERIjj">http://bit.ly/ERIjj</a>
    <a href="http://url.ie/1ql1">http://url.ie/1ql1</a>
    <a href="http://url.ie/1ql2">http://url.ie/1ql2</a>
    <a href="http://lost.in/rE">http://lost.in/rE</a>
    <a href="http://twurl.cc/14oo">http://twurl.cc/14oo</a>
    <a href="http://is.gd/14q66">http://is.gd/14q66</a>
    <a href="http://tinyurl.com/d2b3do">http://tinyurl.com/d2b3do</a>
    <a href="http://redir.ec/oL22">http://redir.ec/oL22</a>
    <a href="http://bit.ly/3zakxp">http://bit.ly/3zakxp</a>
    <a href="http://bit.ly/405U87">http://bit.ly/405U87</a>
    <a href="http://bit.ly/ltzbx">http://bit.ly/ltzbx</a>
    <a href="http://reallytinyurl.com/1600">http://reallytinyurl.com/1600</a>
    <a href="http://twurl.cc/14oo">http://twurl.cc/14oo</a>
    <a href="http://kl.am/NUl">http://kl.am/NUl</a>
    <a href="http://is.gd/14q66">http://is.gd/14q66</a>
    <a href="http://twurl.cc/14oo">http://twurl.cc/14oo</a>
    <a href="http://redir.ec/oL22">http://redir.ec/oL22</a>
    <a href="http://kl.am/6wjT">http://kl.am/6wjT</a>
    <a href="http://bit.ly/3zakxp">http://bit.ly/3zakxp</a>
    <a href="http://bacn.me/olo">http://bacn.me/olo</a>
    <a href="http://url.ie/1ql1">http://url.ie/1ql1</a>
    <a href="http://url.ie/1ql2">http://url.ie/1ql2</a>
    <a href="http://lost.in/rE">http://lost.in/rE</a>
    <a href="http://twurl.cc/14oo">http://twurl.cc/14oo</a>
    <a href="http://url.ie/1ql2">http://url.ie/1ql2</a>
    <a href="http://reallytinyurl.com/1600">http://reallytinyurl.com/1600</a>
  </p>
  
  <h3>These aren't short urls (red border):</h3>
  
  <p>
    <a href="http://benalman.com/">http://benalman.com/</a>
    <a href="http://google.com">http://google.com</a>
    <a href="http://lmgtfy.com">http://lmgtfy.com</a>
    <a href="http://jquery.com/">http://jquery.com/</a>
    <a href="http://cowboyscripts.org/">http://cowboyscripts.org</a>
    <a href="http://paulirish.com">http://paulirish.com</a>
    <a href="http://www.ajpiano.com">http://www.ajpiano.com</a>
    <a href="http://www.longurlplease.com/">http://www.longurlplease.com/</a>
    <a href="http://jqueryui.com/">http://jqueryui.com/</a>
  </p>
  
  <h3>These are relative, and should be skipped (grey border):</h3>
  <p>
    <a href="./">current directory</a>
    <a href="../">parent directory</a>
    <a href="/">root directory</a>
  </p>
  
</div>

<h3>The code</h3>

<div class="clear"></div>

<pre class="brush:js">
<?= htmlspecialchars( $shell['script'] ); ?>
</pre>

<?
$shell['html_body'] = ob_get_contents();
ob_end_clean();

// ========================================================================== //
// DRAW SHELL
// ========================================================================== //

draw_shell();

?>

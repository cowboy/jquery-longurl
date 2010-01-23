// Not sure why this isn't set by default in qunit.js..
QUnit.jsDump.HTML = false;

$(function(){ // START CLOSURE

var s = [
    'http://bacn.me/olo',
    'http://bit.ly/3zakxp',
    'http://bit.ly/405U87',
    'http://bit.ly/ERIjj',
    'http://bit.ly/JQcVw',
    'http://jquery.com/',
    'http://cowboyscripts.org/',
    'http://is.gd/14q66',
    'http://j.mp/56unIk',
    'http://kl.am/6wjT',
    'http://kl.am/NUl',
    'http://lost.in/rE',
    'http://reallytinyurl.com/1600',
    'http://benalman.com/',
    'http://google.com/'
  ],
  e = [
    'http://redir.ec/oL22',
    'http://su.pr/A5aJ2t',
    'http://tinyurl.com/d2b3do',
    'http://tinyurl.com/ye5sqjy',
    'http://twurl.cc/14oo',
    'http://url.ie/1ql1',
    'http://url.ie/1ql2',
    'http://url.ie/4qns',
    'http://lmgtfy.com/',
    'http://paulirish.com/',
    'http://bit.ly/ltzbx',
    'http://bit.ly/Uu2VH',
    'http://www.ajpiano.com/',
    'http://www.longurlplease.com/',
    'http://jqueryui.com/'
  ],
  lookup = {
    'http://bacn.me/olo': 'http://blog.jquery.com/2010/01/10/the-official-jquery-podcast-episode-6-ben-alman/',
    'http://bit.ly/3zakxp': 'http://groups.google.com/group/jquery-dev/browse_thread/thread/6e31ae96b2238375',
    'http://bit.ly/405U87': 'http://d.hatena.ne.jp/monjudoh/20090608/1244483056',
    'http://bit.ly/ERIjj': 'http://benalman.com/news/2009/06/change-bbedit-invisibles-color/',
    'http://bit.ly/JQcVw': 'http://benalman.com/photo/taken-on/2009/06/11/',
    'http://bit.ly/Uu2VH': 'http://benalman.com/projects/jquery-starwipe-plugin/',
    'http://bit.ly/ltzbx': 'http://blog.jquery.com/2009/06/07/this-week-in-jquery-vol-7/',
    'http://is.gd/14q66': 'http://www.json.org/js.html',
    'http://j.mp/56unIk': 'http://miketaylr.com/',
    'http://kl.am/6wjT': 'http://www.flickr.com/photos/rj3',
    'http://kl.am/NUl': 'http://ajpiano.com/blog/20090507/index-power',
    'http://lost.in/rE': 'http://paulirish.com/',
    'http://reallytinyurl.com/1600': 'http://cowboyscripts.org/flash/spirograph.html',
    'http://redir.ec/oL22': 'http://freelancebishops.com/',
    'http://su.pr/A5aJ2t': 'http://jquery.com/',
    'http://tinyurl.com/d2b3do': 'http://benalman.com/',
    'http://tinyurl.com/ye5sqjy': 'http://alexsexton.com/',
    'http://twurl.cc/14oo': 'http://www.apple.com/macbookpro/',
    'http://url.ie/1ql1': 'http://benalman.com/photo/3333155579/',
    'http://url.ie/1ql2': 'http://benalman.com/about/',
    'http://url.ie/4qns': 'http://twitter.com/cowboy/',
    'http://benalman.com/': null,
    'http://google.com/': null,
    'http://lmgtfy.com/': null,
    'http://jquery.com/': null,
    'http://cowboyscripts.org/': null,
    'http://paulirish.com/': null,
    'http://www.ajpiano.com/': null,
    'http://www.longurlplease.com/': null,
    'http://jqueryui.com/': null
  };

function get_obj( arr ) {
  var obj = {};
  $.each( arr, function(i,v){ obj[v] = lookup[v]; } );
  return obj;
};

test( '$.longUrl', function() {
  expect( 14 );
  
  function next(){
    var test = tests.shift();
    test ? test() : start();
  };
  
  function get_uncached( num ) {
    return s.slice( idx, idx += num );
  };
  
  var idx = 0,
    tests = [
      function(){
        var cached = false, urls = get_uncached(1);
        $.longUrl( urls[0], function(data){
          same( data, get_obj(urls), "1 url should be fetched" );
          cached = true;
          next();
        });
        equals( cached, false, "callback executed asynchronously, url not cached" );
      },
      function(){
        var cached = false, urls = s.slice(0,1);
        $.longUrl( urls[0], function(data){
          same( data, get_obj(urls), "1 url should be pulled from cache" );
          cached = true;
          next();
        });
        equals( cached, true, "callback executed synchronously, url cached" );
      },
      function(){
        var cached = false, urls = get_uncached(2);
        $.longUrl( urls, function(data){
          same( data, get_obj(urls), "2 urls should be fetched" );
          cached = true;
          next();
        });
        equals( cached, false, "callback executed asynchronously, urls not cached" );
      },
      function(){
        var cached = false, urls = s.slice(0,3);
        $.longUrl( urls, function(data){
          same( data, get_obj(urls), "3 urls should be pulled from cache" );
          cached = true;
          next();
        });
        equals( cached, true, "callback executed synchronously, urls cached" );
      },
      function(){
        var cached = false, urls = get_uncached(11);
        $.longUrl( urls, function(data){
          same( data, get_obj(urls), "11 urls should be fetched" );
          cached = true;
          next();
        });
        equals( cached, false, "callback executed asynchronously, urls not cached" );
      },
      function(){
        var cached = false, urls = get_uncached(1).concat( s.slice(0,14) );
        $.longUrl( urls, function(data){
          same( data, get_obj(urls), "14 urls should be pulled from cache, 1 fetched" );
          cached = true;
          next();
        });
        equals( cached, false, "callback executed asynchronously, urls not cached" );
      },
      function(){
        var cached = false, urls = s.slice(0,15);
        $.longUrl( urls, function(data){
          same( data, get_obj(urls), "15 urls should be pulled from cache" );
          cached = true;
          next();
        });
        equals( cached, true, "callback executed synchronously, urls cached" );
      }
    ];
  
  stop();
  next();
});

test( '$.fn.longUrl', function() {
  expect( 63 );
  
  function next(){
    var test = tests.shift();
    test ? test() : start();
  };
  
  function get_uncached_elems( num ) {
    return get_elems( idx, idx += num );
  };
  
  function get_elems( a, b ) {
    var arr = e.slice( a, b ),
      elems = $([]);
    
    $.each( arr, function(i,v){ elems = elems.add('<a href="' + v + '">' + v + '<\/a>'); } );
    return elems;
  };
  
  function get_elems_obj( elems ) {
    var arr = [];
    elems.each(function(){
      arr.push( $(this).text() );
    });
    return get_obj( arr );
  };
  
  function test_elems( elems ) {
    elems.each(function(){
      var short_url = $(this).text(),
        long_url = $(this).attr('href');
      
      if ( long_url === short_url ) {
        long_url = null;
      }
      equals( lookup[short_url], long_url, "href attribute should be set correctly." );
    });
  };
  
  function callback_custom( url, long_url ){
    this.text( long_url || 'FAIL' );
  };
  
  function get_elems_obj_custom( elems ) {
    var arr = [];
    elems.each(function(){
      arr.push( $(this).attr('href') );
    });
    return get_obj( arr );
  };
  
  function test_elems_custom( elems ) {
    elems.each(function(){
      var short_url = $(this).attr('href'),
        long_url = $(this).text();
      
      if ( long_url === 'FAIL' ) {
        long_url = null;
      }
      equals( lookup[short_url], long_url, "text should be set correctly." );
    });
  };
  
  var idx = 0,
    tests = [
      function(){
        var cached = false, elems = get_uncached_elems(1);
        elems.longUrl({
          complete: function(data){
            equals( this, elems, "`this` context is the initial jQuery collection" );
            same( data, get_elems_obj(elems), "1 url should be fetched" );
            test_elems(elems);
            cached = true;
            next();
          }
        });
        equals( cached, false, "callback executed asynchronously, url not cached" );
      },
      function(){
        var cached = false, elems = get_elems(0,1);
        elems.longUrl({
          complete: function(data){
            same( data, get_elems_obj(elems), "1 url should be pulled from cache" );
            test_elems(elems);
            cached = true;
            next();
          }
        });
        equals( cached, true, "callback executed synchronously, url cached" );
      },
      function(){
        var cached = false, elems = get_uncached_elems(2);
        elems.longUrl({
          complete: function(data){
            same( data, get_elems_obj(elems), "2 urls should be fetched" );
            test_elems(elems);
            cached = true;
            next();
          }
        });
        equals( cached, false, "callback executed asynchronously, urls not cached" );
      },
      function(){
        var cached = false, elems = get_elems(0,3);
        elems.longUrl({
          callback: callback_custom,
          complete: function(data){
            same( data, get_elems_obj_custom(elems), "3 urls should be pulled from cache" );
            test_elems_custom(elems);
            cached = true;
            next();
          }
        });
        equals( cached, true, "callback executed synchronously, urls cached" );
      },
      function(){
        var cached = false, elems = get_uncached_elems(11);
        elems.longUrl({
          callback: callback_custom,
          complete: function(data){
            same( data, get_elems_obj_custom(elems), "11 urls should be fetched" );
            test_elems_custom(elems);
            cached = true;
            next();
          }
        });
        equals( cached, false, "callback executed asynchronously, urls not cached" );
      },
      function(){
        var cached = false, elems = get_uncached_elems(1).add( get_elems(0,14) );
        elems.longUrl({
          callback: callback_custom,
          complete: function(data){
            same( data, get_elems_obj_custom(elems), "14 urls should be pulled from cache, 1 fetched" );
            test_elems_custom(elems);
            cached = true;
            next();
          }
        });
        equals( cached, false, "callback executed asynchronously, urls not cached" );
      },
      function(){
        var cached = false, elems = get_elems(0,15);
        elems.longUrl({
          complete: function(data){
            same( data, get_elems_obj(elems), "15 urls should be pulled from cache" );
            test_elems(elems);
            cached = true;
            next();
          }
        });
        equals( cached, true, "callback executed synchronously, urls cached" );
      }
    ];
  
  stop();
  next();
});

}); // END CLOSURE
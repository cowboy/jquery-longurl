/*!
 * jQuery longUrl - v1.0 - 1/23/2010
 * http://benalman.com/projects/jquery-longurl-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery longUrl: Uniform Resource Elongator
//
// *Version: 1.0, Last updated: 1/23/2010*
// 
// Project Home - http://benalman.com/projects/jquery-longurl-plugin/
// GitHub       - http://github.com/cowboy/jquery-longurl/
// Source       - http://github.com/cowboy/jquery-longurl/raw/master/jquery.ba-longurl.js
// (Minified)   - http://github.com/cowboy/jquery-longurl/raw/master/jquery.ba-longurl.min.js (1.2kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// longurl - http://benalman.com/code/projects/jquery-longurl/examples/longurl/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-longurl/unit/
// 
// About: Release History
// 
// 1.0 - (1/23/2010) Initial release

(function($,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Internal URL cache.
  var cache = {},
    
    // Internal method reference.
    jq_longUrl,
    
    // Options and defaults.
    options,
    defaults = {
      
      // This function is invoked for each set of `batch` URLs to be lengthened.
      // `urls` is an array of URLs (never longer than `batch` in length), and
      // `callback` is a function that, upon fetch success, is called with one
      //  argument: an object containing short URL keys to long URL values.
      fetch: function( urls, callback ) {
        $.ajax({
          dataType: 'jsonp',
          traditional: 1, // required for longurlplease.com in jQuery 1.4
          url: 'http://www.longurlplease.com/api/v1.1',
          data: { q: urls },
          success: callback
        });
      },
      
      // The maximum number of URLs that can be lengthened per request. The
      // longurlplease.com API allows 10 URLs per request, which is awesome!
      batch: 10
    };
  
  // Method: jQuery.longUrl
  // 
  // Lengthen one or more "short URLs" using a third-party lengthening service
  // (defaults to longurlplease.com). Note that only absolute URLs will be
  // lengthened.
  // 
  // Usage:
  // 
  // > jQuery.longUrl( urls, callback );
  // 
  // Arguments:
  // 
  //  urls - (String) A single "short URL" to lengthen.
  //  urls - (Array) An array of "short URLs" to lengthen.
  //  callback - (Function) This function, invoked after all passed URLs have
  //    either been fetched from the internal cache or lengthening service, is
  //    passed a single argument: an object containing short URL keys to long
  //    URL values.
  // 
  // Returns:
  // 
  //  Nothing.
  
  // Method: jQuery.longUrl
  // 
  // Override the default lengthening service options with custom settings.
  // 
  // Usage:
  // 
  // > jQuery.longUrl( options );
  // 
  // Arguments:
  // 
  //  options - (Object) An object containing lengthening service options.
  // 
  // Options:
  // 
  //   fetch - (Function) This function is invoked for each set of `batch` URLs
  //     to be lengthened, receiving two arguments: an array of URLs (no longer
  //     than `batch` in length), and a callback that, upon fetch success, shall
  //     be called with one argument: an object containing short URL keys to
  //     long URL values.
  //   batch - (Number) The maximum number of URLs that can be lengthened per
  //     request. While the longurlplease.com API allows 10 URLs per request,
  //     different services may vary.
  // 
  // Returns:
  // 
  //  Nothing.
  
  $.longUrl = jq_longUrl = function( urls, callback ) {
    // Store short URL to log URL here. When all URLs have been fetched, this
    // will be passed to `callback`.
    var result = {},
      
      // Keep track of the last processed `urls` item.
      i = 0;
    
    // Override defaults with new options.
    if ( Object.prototype.toString.call( urls ) === '[object Object]' ) {
      options = $.extend( {}, defaults, urls );
      return;
    }
    
    // If urls is passed in as a string, convert it to an array.
    urls = typeof urls === 'string' ? [ urls ] : urls;
    
    // This named function expression is invoked immediately and also referenced
    // internally. Each execution of `loopy` grabs the next `batch` number of
    // items from `urls` for retrieval, filtering out duplicates and leveraging
    // the internal URL cache whenever possible. When all `urls` have been
    // fetched, the callback is executed.
    (function loopy() {
      // The current queue of URLs to be processed.
      var queue = [],
        url;
      
      // Get up to `batch` number of URLs.
      while ( i < urls.length && queue.length < options.batch ) {
        url = urls[ i++ ];
        
        // Skip any URLs that are not absolute.
        if ( !url || !/^https?:\/\//i.test( url ) ) { continue; }
        
        if ( cache[ url ] !== undefined ) {
          // URL is cached already, no need to fetch it.
          result[ url ] = cache[ url ];
          
        } else if ( $.inArray( url, queue ) === -1 ) {
          // URL isn't cached and isn't already in the queue.
          queue.push( url );
        }
      };
      
      if ( queue.length ) {
        // There are URLs to be fetched, so fetch them now using the `fetch`
        // callback defined in `options`.
        options.fetch( queue, function(data){
          // Add each fetched URL not only to the result, but also to the cache.
          $.each( data, function( url, long_url ){
            result[ url ] = cache[ url ] = long_url;
          });
          
          // This request is done, process the next request.
          loopy();
        });
        
      } else {
        // No more URLs to fetch, return the result.
        callback( result );
      }
    })();
    
  };
  
  // Initialize options from defaults.
  jq_longUrl({});
  
  // Method: jQuery.fn.longUrl
  // 
  // Lengthen one or more "short URLs" in A elements, using a third-party
  // lengthening service (defaults to longurlplease.com). Note that only
  // absolute URLs will be lengthened.
  // 
  // Usage:
  // 
  // > jQuery('selector').longUrl( [ options ] );
  // 
  // Arguments:
  // 
  //  options - (Object) An optional configuration object.
  // 
  // Options:
  // 
  //   callback - (Function) This function, called after all passed URLs have
  //     either been fetched from the internal cache or lengthening service, is
  //     called once for each element (or group of elements sharing the same
  //     short URL), and passed two arguments: the original short URL, followed
  //     by the long URL.
  //     Because multiple elements sharing the same short URL href will be
  //     operated on together, for efficiency, `this` refers to a jQuery object
  //     containing references to one or more A elements. If not specified, the
  //     default behavior is to set the title and href attributes of each link
  //     to their retrieved long URL. This can be set to `false` to disable any
  //     per-element callback.
  //     Note that, since changing A elements' href attribute in IE may also
  //     change their innerHTML, in the default callback, the old value is
  //     stored and tested after the href is updated. A user-specified callback
  //     should take this into consideration. See this for more information:
  //     http://stackoverflow.com/questions/1790698/
  //   complete - (Function) This optional function, called after all `callback`
  //     executions, is passed a single argument: an object containing short URL
  //     keys to long URL values. In this function, `this` refers to the initial
  //     jQuery collection of elements.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  $.fn.longUrl = function( options ) {
    var that = this,
      elems = {},
      urls = [],
      defaults = {
        /*
        complete: null,
        */
        callback: function( href, long_url ) {
          if ( long_url ) {
            // Note that `this` is a jQuery object that may contain multiple
            // elements, if they share the same short URL. Also, since changing
            // A elements' href attribute in IE may also change their innerHTML,
            // the old value is stored and tested after the href is updated. See
            // this for details: http://stackoverflow.com/questions/1790698/
            this.each(function(){
              var that = $(this),
                orig_html = that.html();
              
              that.attr({ title: long_url, href: long_url });
              
              if ( that.html() !== orig_html ) {
                that.html( orig_html );
              }
            });
          }
        }
      };
    
    options = $.extend( defaults, options );
    
    this.each(function(){
      var that = $(this),
        href = that.attr( 'href' );
      
      if ( href ) {
        elems[ href ] = elems[ href ] ? elems[ href ].add( this ) : that;
        urls.push( href );
      }
    });
    
    jq_longUrl( urls, function( result ) {
      options.callback && $.each( result, function( url, long_url ) {
        if ( elems[ url ] ) {
          options.callback.call( elems[ url ], url, long_url );
          delete elems[ url ];
        }
      });
      elems = null;
      options.complete && options.complete.call( that, result );
    });
    
    return this;
  };
  
})(jQuery);

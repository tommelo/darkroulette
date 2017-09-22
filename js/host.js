'use strict';

(function(window, $) {

  function Host() {

  }

  Host.lookup = function(url, callback) {
    $.ajax({
      url: url,
      type: 'HEAD',
      processData: false,
      success: function() { return callback({ url: url, success: true }); },
      error:   function() { return callback({ url: url, success: false }); }
    });
  }

  window.Host = Host;

})(window, jQuery);
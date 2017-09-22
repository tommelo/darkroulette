'use strict';

(function(window, document, $, Onion) {

  var onion = new Onion();

  function getAjaxLoaderComponent() {
    return '<div style="text-align:center; margin-top:20%"><img src="./img/ajax-loader.gif"></div>';
  }

  function getUriComponent(uri) {    
    var id = uri.substring(7, 23);  
    var a = '<a href="' + uri + '" target="_blank">'+ uri +' </a>';
    var loader = '<span class="badge"><img src="./img/ajax-loader.gif" id="' + id + '"></span>';
    
    return '<div class="col-md-3">' + a + loader + '</div>';
  }

  function onHostLookup(data) {
    var id = data.url.substring(7, 23);
    var src = data.success 
        ? './img/ok.png'
        : './img/nok.png';
    
    $('#' + id).attr('src', src);
  }

  function onOnionGenerated(domains) {
    $('#domain-panel-body').html(null);

    for(var index in domains) {
      var domain = domains[index];
      $('#domain-panel-body').append(getUriComponent(domain));
      Host.lookup(domain, onHostLookup);
    }
  }

  function onClick() {
    $('#error-container').html(null);

    var prefix  = $('#prefix').val().trim();
    var suffix  = $('#suffix').val().trim();
    var count   = $('#domains').val().trim();

    if ((prefix.length + suffix.length) > (onion.getDomainMaxLength() - 1)) {      
      $('#error-container').html('A .onion domain has 16 characters only, check your prefix and suffix.');
      return;
    }

    if (isNaN(count) || !count) {      
      $('#error-container').html('Invalid number of domains.');
      return;
    }

    $('#domain-panel-body').html(null);
    $('#domain-panel-body').append(getAjaxLoaderComponent());   

    onion.generate(prefix, suffix, count, onOnionGenerated);    
  }

  $(document).ready(function() {      
    $('#play').click(onClick);
  });

})(window, document, jQuery, Onion);

'use strict';

(function(window) {

  var DOMAIN_LEN = 16;
  var MIN_RANGE  = 0;
  var MAX_RANGE  = 15;
  var CHARS      = '234567abcdefghijklmnopqrstuvwxyz';

  function Onion() { 

  }

  Onion.prototype.randomize = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Onion.prototype.calculateUriLength = function(suffix, prefix) {
    return (DOMAIN_LEN - (suffix.length + prefix.length));
  }

  Onion.prototype.getDomainMaxLength = function() {
    return DOMAIN_LEN;
  }

  Onion.prototype.generate = function(prefix, suffix, count, callback) {
    var domains = [];    
    var uriSize = this.calculateUriLength(prefix, suffix);

    for (var x = 0; x < count; x ++) {
      var random = '';
      
      for (var y = 0; y < uriSize; y++) {
        var position = this.randomize(MIN_RANGE, MAX_RANGE);        
        random = random.concat(CHARS[position]);
      }

      var uri = 'http://'
        .concat(prefix)
        .concat(random)
        .concat(suffix)
        .concat('.onion');

      domains.push(uri);
    }

    return callback(domains);
  }

  window.Onion = Onion;

})(window);

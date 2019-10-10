/*! lg-links - v1.0.0 - 2019-10-08
* http://sachinchoolur.github.io/lightGallery
* Licensed GPLv3 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(['jquery'], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

(function() {

    'use strict';

    var defaults = {
        dataSrcTags: [],
		buttonIcon: '',
		linkFnc: (data, plugin, elem)=>{},
		linkId: ''
    };

    var Links = function(element) {

        this.core = $(element).data('lightGallery');
		
		if (this.core.s.links && this.core.s.links.length > 0) {
			this.core.s.links = this.core.s.links.map(x => $.extend({}, defaults, x));
			this.init();
		}

        return this;
    };

    Links.prototype.init = function() {
        var _this = this;
		
		_this.core.s.links.forEach( x => {
			var id = x.linkId || 'lg-' + Math.random().toString(36).substring(2, 12);
			var html = '<span id="' + id + '" class="lg-icon ' + x.buttonIcon + '"></span>';
			this.core.$outer.find('.lg-toolbar').append(html);
			
			$('#'+id).on('click.lg', function() {
				var it = _this.core.$items.eq(_this.core.index);
				
				x.linkFnc(x.dataSrcTags.map(y => it.attr(y)), _this, this);
			});
		
		});
    };

    Links.prototype.destroy = function() {

    };

    $.fn.lightGallery.modules.links = Links;

})();



}));

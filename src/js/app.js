(function ($) {

  // Initialize foundation.
  $(document).foundation();

  // START - Extending jQuery functions.
  $.fn.extend({
    deBounce: function debounce(func, wait, immediate) {
      // Delay function calls.
      var timeout;
      return function () {
        var context = this, args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  });
  // END - Extending jQuery functions.

})(jQuery);
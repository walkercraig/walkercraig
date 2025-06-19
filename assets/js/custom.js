/**
 * Main JS file for theme behaviours
 */



(function ($) {
  "use strict";

  var $window = $(window),
      $body = $('body'),
      $menuToggle = $('#menu-toggle'),
      $toTop = $('#back-to-top'),
      mobile = false;

  $(document).ready(function(){

    // Detect mobile
    isMobile();

    // Responsive video embeds
    $('.post-content').fitVids();

    // Menu on small screens
    $menuToggle.on('click', function(e){
      $body.toggleClass('menu--opened');
      $menuToggle.blur();
      e.preventDefault();
    });
    $window.on('resize orientationchange', function() {
      isMobile();
      if (mobile === false) {
        $body.removeClass('menu--opened');
      }
    });

    // Back to top button
    if (mobile === true) {
      $toTop.initCanvas();
    }
    $toTop.on('click', function(e) {
      $('html, body').animate({'scrollTop': 0});
      e.preventDefault();
    });
    $window.on('resize scroll', function () {
      if (mobile === true) {
        $toTop.initCanvas();
      } else {
        $toTop.hide();
        $toTop.find('canvas').remove();
      }
    });

  });

  function isMobile() {
    if ( $menuToggle.is(':hidden') ) {
      mobile = false;
    } else {
      mobile = true;
    }
  }

  function calcScrollPct() {
    var top = $window.scrollTop(),
        docH = $(document).height(),
        winH = $window.height(),
        pct = Math.ceil((top / (docH - winH)) * 10000) / 10000;
    return pct;
  }

  $.fn.initCanvas = function() {
    var _this = $(this),
        canvas = document.createElement('canvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d'),
          options = {
            lineWidth: 2,
            rotate: 0,
            size: _this.height(),
            colorProgress: '#1e73be',
            colorBackground: '#eee'
          },
          perc = calcScrollPct();
      _this.find('canvas').remove();
      if (perc < 0.1 && _this.css('opacity') !== 0) {
        _this.stop().fadeOut(300);
      } else if (perc >= 0.1) {
        _this.stop().fadeIn(600);
        _this.append(canvas);
        canvas.width = canvas.height = options.size;
        ctx.translate(options.size / 2, options.size / 2);
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
        drawCircle(options.colorProgress, options.colorBackground, options.lineWidth);
      }
    }

    function drawCircle(colorProgress, colorBackground, lineWidth) {
      ctx.clearRect(-(options.size) / 2, -(options.size) / 2, options.size, options.size);
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      // Background circle
      ctx.beginPath();
      ctx.arc(0, 0, (options.size - lineWidth) / 2, 0, Math.PI * 2, false);
      ctx.strokeStyle = colorBackground;
      ctx.stroke();
      ctx.closePath();
      // Progress circle
      ctx.beginPath();
      ctx.arc(0, 0, (options.size - lineWidth) / 2, 0, (Math.PI * 2) * perc, false);
      ctx.strokeStyle = colorProgress;
      ctx.stroke();
      ctx.closePath();
    }

    // Theme Toggle with system preference and localStorage
(function() {
  const iconSpan = document.getElementById("theme-toggle-icon");
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  // Returns "light" or "dark"
  function getPreferredTheme() {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    iconSpan.textContent = theme === "dark" ? "🌙" : "🌞";
  }

  // On page load, set the theme
  setTheme(getPreferredTheme());

  // Toggle on click
  toggleBtn.addEventListener("click", function() {
    const currentTheme = getPreferredTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  // Listen to system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) { // Only auto-update if user hasn't set preference
      setTheme(e.matches ? "dark" : "light");
    }
  });
})();
  };

}(jQuery));

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile nav sheet */
  var toggle = document.getElementById("navToggle");
  var sheet = document.getElementById("navSheet");

  if (toggle && sheet) {
    toggle.addEventListener("click", function () {
      var open = sheet.getAttribute("data-open") === "true";
      sheet.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    sheet.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        sheet.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Balance counter */
  var counter = document.querySelector("[data-counter]");
  if (counter) {
    var target = parseFloat(counter.getAttribute("data-target"));
    var run = function () {
      if (reduceMotion) {
        counter.textContent = "$" + target.toFixed(2);
        return;
      }
      var start = null;
      var duration = 1400;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        counter.textContent = "$" + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      var counterIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run();
            counterIo.disconnect();
          }
        });
      }, { threshold: 0.4 });
      counterIo.observe(counter);
    } else {
      run();
    }
  }
})();

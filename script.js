/* ===== PTHS — Play To High School | site interactions ===== */
(function () {
  "use strict";

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu after clicking a link (mobile)
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Catalog data ---- */
  var catalog = [
    { icon: "👕", title: "Shirts & Blouses", desc: "Wrinkle-resistant, breathable cotton blends in your school colors.", price: "8", unit: "per piece", tag: "Bestseller", grad: "linear-gradient(135deg,#2f6bff,#16336e)" },
    { icon: "👖", title: "Trousers & Skirts", desc: "Durable, easy-wash bottoms with adjustable waistbands for kids.", price: "12", unit: "per piece", tag: "Popular", grad: "linear-gradient(135deg,#0f2350,#2f6bff)" },
    { icon: "🧥", title: "Blazers & Coats", desc: "Tailored blazers with custom crest embroidery and lining.", price: "28", unit: "per piece", tag: "Custom", grad: "linear-gradient(135deg,#b23a48,#7a1f2b)" },
    { icon: "👟", title: "Sports Kits", desc: "Moisture-wicking jerseys, shorts and track sets for PE and teams.", price: "15", unit: "per set", tag: "Active", grad: "linear-gradient(135deg,#1fae67,#0f7a49)" },
    { icon: "👔", title: "Ties, Belts & Badges", desc: "Finishing touches — house ties, belts, socks and name badges.", price: "5", unit: "per set", tag: "Accessories", grad: "linear-gradient(135deg,#f6b93b,#e59b1f)" },
    { icon: "👞", title: "Footwear", desc: "Comfortable, school-approved formal and sports shoes.", price: "18", unit: "per pair", tag: "New", grad: "linear-gradient(135deg,#16336e,#0b1b3d)" }
  ];

  var grid = document.getElementById("catalogGrid");
  if (grid) {
    var html = catalog.map(function (c) {
      return (
        '<article class="cat-card">' +
          '<div class="cat-thumb" style="background:' + c.grad + '">' + c.icon + '</div>' +
          '<div class="cat-body">' +
            '<h3>' + c.title + '</h3>' +
            '<p>' + c.desc + '</p>' +
            '<div class="cat-meta">' +
              '<span class="cat-price">$' + c.price + ' <small>' + c.unit + '</small></span>' +
              '<span class="cat-tag">' + c.tag + '</span>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    grid.innerHTML = html;
  }

  /* ---- Order form validation & submit ---- */
  var form = document.getElementById("orderForm");
  var success = document.getElementById("formSuccess");
  var successMsg = document.getElementById("successMsg");

  function showError(name, msg) {
    var input = form.querySelector('[name="' + name + '"]');
    var errEl = form.querySelector('.err[data-for="' + name + '"]');
    if (input) input.classList.add("invalid");
    if (errEl) errEl.textContent = msg;
  }
  function clearError(name) {
    var input = form.querySelector('[name="' + name + '"]');
    var errEl = form.querySelector('.err[data-for="' + name + '"]');
    if (input) input.classList.remove("invalid");
    if (errEl) errEl.textContent = "";
  }

  if (form) {
    // Clear errors as the user types
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("input", function () { clearError(el.name); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var data = {
        school: form.school.value.trim(),
        contactName: form.contactName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        quantity: form.quantity.value.trim()
      };

      if (!data.school) { showError("school", "Please enter your institution name."); valid = false; }
      if (!data.contactName) { showError("contactName", "Please enter a contact person."); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showError("email", "Enter a valid email address."); valid = false; }
      if (!/^[+\d][\d\s\-()]{6,}$/.test(data.phone)) { showError("phone", "Enter a valid phone number."); valid = false; }
      var qty = parseInt(data.quantity, 10);
      if (isNaN(qty) || qty < 50) { showError("quantity", "Minimum order is 50 sets."); valid = false; }

      if (!valid) {
        var firstErr = form.querySelector(".invalid");
        if (firstErr) firstErr.focus();
        return;
      }

      // Collect selected items
      var items = Array.prototype.map.call(
        form.querySelectorAll('input[name="items"]:checked'),
        function (c) { return c.value; }
      );

      // Simulate submission (static site — no backend)
      if (success && successMsg) {
        successMsg.textContent =
          "Thanks, " + data.contactName + "! We've logged your request for " +
          data.school + " (" + qty + " sets" +
          (items.length ? ", items: " + items.join(", ") : "") +
          "). Our team will reach out within one business day.";
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  /* ---- Reveal-on-scroll animation ---- */
  var revealTargets = document.querySelectorAll(
    ".step, .cat-card, .quote, .partners-panel, .about-block, .section-head"
  );
  if ("IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity .5s ease, transform .5s ease";
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { obs.observe(el); });
  }
})();

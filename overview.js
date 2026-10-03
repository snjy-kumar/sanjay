(function () {
  var nav = document.querySelector("nav[aria-label='Overview']");
  if (!nav) return;

  var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
  var sections = [];
  for (var i = 0; i < links.length; i++) {
    var id = links[i].getAttribute("href").slice(1);
    var section = document.getElementById(id);
    if (section) sections.push(section);
  }
  if (!sections.length) return;

  function mark(id) {
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var on = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-current", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
  }

  function activeId() {
    var marker = 128;
    var current = sections[0].id;
    for (var i = 0; i < sections.length; i++) {
      var heading = sections[i].querySelector("h2") || sections[i];
      if (heading.getBoundingClientRect().top <= marker) current = sections[i].id;
    }
    return current;
  }

  function sync() {
    mark(activeId());
  }

  for (var j = 0; j < links.length; j++) {
    links[j].addEventListener("click", function () {
      mark(this.getAttribute("href").slice(1));
    });
  }

  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  window.addEventListener("hashchange", sync);
  window.addEventListener("load", sync);
  sync();
})();

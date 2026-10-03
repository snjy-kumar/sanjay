(function () {
  var clock = document.getElementById("clock");
  if (!clock) return;
  function tick() {
    var time = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: "Asia/Kolkata"
    }).format(new Date());
    clock.textContent = "· " + time;
  }
  tick();
  setInterval(tick, 30000);
})();

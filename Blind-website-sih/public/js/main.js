function youtube() {
  // Get the snackbar DIV
  var x = document.querySelector(".youtube");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
    var url = "/";
    window.location = url;
  }, 12000);
}

function google() {
  // Get the snackbar DIV
  var x = document.querySelector(".google");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
    var url = "/";
    window.location = url;
  }, 12000);
}

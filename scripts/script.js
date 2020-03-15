const app = {};

app.animate = function() {
  // antlers expand on load
  $(".logo2").addClass("expand");
  setTimeout(() => {
      $(".logo3").addClass("expand");
  }, 1000);
  // bars expand on load
  setTimeout(() => {
    $(".bar").addClass("expand");
  }, 1200)
}

app.init = function() {
  app.animate();

}

$(() => {
  app.init();
})
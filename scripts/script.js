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
  }, 1200);
};

app.listeners = function() {
  // hovers and focus over logo
  $(".logo").focus(function() {

      $(".logo1 img").attr("src", "assets/hover/2.png");
      $(".logo2 img").attr("src", "assets/hover/3.png");
      $(".logo3 img").attr("src", "assets/hover/4.png");

  });

  $(".logo").blur(function() {
    $(".logo1 img").attr("src", "assets/2.png");
    $(".logo2 img").attr("src", "assets/3.png");
    $(".logo3 img").attr("src", "assets/4.png");
  });

  $(".logo").mouseover(function() {

      $(".logo1 img").attr("src", "assets/hover/2.png");
      $(".logo2 img").attr("src", "assets/hover/3.png");
      $(".logo3 img").attr("src", "assets/hover/4.png");
 
  });

  $(".logo").mouseleave(function() {
    $(".logo1 img").attr("src", "assets/2.png");
    $(".logo2 img").attr("src", "assets/3.png");
    $(".logo3 img").attr("src", "assets/4.png");
  });


};

app.init = function() {
  app.animate();
  app.listeners();
};

$(() => {
  app.init();
});

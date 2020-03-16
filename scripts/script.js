const app = {};

app.isDropped = false;

/****************************************************************/
/*****************          SETTERS           *******************/
/****************************************************************/
app.animate = function() {
  // antlers expand on load
  $(".logo2").addClass("expand");
  setTimeout(() => {
    $(".logo3").addClass("expand");
  }, 1000);

  // bars expand on load
  setTimeout(() => {
    $(".bar").addClass("expand");
    $("button.dropMenu").addClass("expand");
    $(".drop button").attr("disabled", true);
  }, 1200);
};

/****************************************************************/
/*****************          HANDLERS          *******************/
/****************************************************************/

app.handleMenu = function() {
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
    $(".logo").blur();
  });

  // menu icon
  $(".dropMenu").on("click", function() {
    $(".drop").toggleClass("expand");
    $(this).blur();
    $(".bar").toggleClass("expand");
    $(".dropBar").toggleClass("expand");
    if (app.isDropped) {
      $(".drop button").attr("disabled", true);
    } else {
      $(".drop button").attr("disabled", false);
    }
    app.isDropped = !app.isDropped;
  });

  // menu items
  $(".drop li button").on("click", function() {
    $(this).blur();
    const id = $(this).attr("id");
    setTimeout(() => {
      app.scrollToElem(id.toLowerCase());
    }, 300);
  });
};

/****************************************************************/
/*****************           HELPERS          *******************/
/****************************************************************/

// scrolls to the element with the given id
app.scrollToElem = function(id) {
  $("html, body").animate(
    {
      scrollTop: $(`#${id}`).offset().top
    },
    1000
  );
};

app.listeners = function() {
  app.handleMenu();
};

app.init = function() {
  app.animate();
  app.listeners();
};

$(() => {
  app.init();
});

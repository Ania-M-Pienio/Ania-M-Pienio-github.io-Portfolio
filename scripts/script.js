const app = {};

app.isDropped = false;
app.sections = {
  overview: {
    el: $("#overview"),
    run: function() {
      $("section.overview").addClass("expand");
      $(".gallery.pic2 .galleryBar").addClass("expand");
    }
  }
  // skills: { el: $("#skills"), run: app.skills },
  // about: { el: $("#about"), run: app.about },
  // quote: { el: $("#quote"), run: app.quote },
  // projects: { el: $("#projects"), run: app.projects },
  // education: { el: $("#education"), run: app.education },
  // blog: { el: $("#blog"), run: app.blog },
  // contact: { el: $("#contact"), run: app.contact }
};
app.logo = $("#navLogo");
app.allWaypoints = $(".waypoint");
app.currentWaypoint = app.sections.$logo;

app.skills = function() {
  console.log("skills");
};

app.about = function() {
  console.log("about");
};

app.quote = function() {
  console.log("quote");
};

app.projects = function() {
  console.log("projects");
};

app.education = function() {
  console.log("education");
};

app.blog = function() {
  console.log("blog");
};

app.contact = function() {
  console.log("contact");
};

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

app.resetAll = function($except) {
  // scroll to top - resets all expands for all sections except for $except
  app.allWaypoints.removeClass("expand");
};

/****************************************************************/
/*****************          HANDLERS          *******************/
/****************************************************************/

// listeners manifest
app.listeners = function() {
  app.handleMenu();
  app.handleWaypoints();
};

app.handleWaypoints = function() {
  // SECTION WAYPOINTS

  for (let section in app.sections) {
    const $el = app.sections[section].el;
    $el.waypoint(
      function() {
        console.log("waypoint hit");
        app.sections[section].run();
      },
      { offset: "90%" }
    );
  }

  // START WAYPOINT
  app.logo.waypoint(
    function(direction) {
      direction === "up" ? app.resetAll() : "";
    },
    { offset: "5%" }
  );
};

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

/****************************************************************/
/*****************           SETUP           ********************/
/****************************************************************/
app.init = function() {
  app.resetAll();
  app.animate();
  app.listeners();
};

$(() => {
  app.init();
});

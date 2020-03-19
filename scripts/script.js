const app = {};

app.isDropped = false;
app.sections = {
  overview: {
    el: $("#overview"),
    offset: 50,
    delay: 1500,
    run: function() {
      $("section.overview").addClass("expand");
      $(".gallery.pic2 .galleryBar").addClass("expand");
    }
  },
  skills: {
    el: $("#skills"),
    offset: 130,
    delay: 1500,
    run: function() {
      $(".skills.wrapper").addClass("expand");
    }
  },
  about: {
    el: $("#about"),
    offset: 200,
    delay: 1500,
    run: function() {
      // console.log("about is not defined");
    }
  },
  quote: {
    el: $("#quote"),
    offset: 0,
    delay: 0,
    run: function() {
      app.animateLogo("quoteLogo");
    }
  },
  projects: {
    el: $("#projects"),
    offset: -1000,
    delay: 1000,
    run: function() {
      $(".projectGallery .galleryPic").addClass("expand");
      $(".projects .bar.projectBar").addClass("expand");
      $(".projectGallery").addClass("expand");
    }
  }
  // education: { el: $("#education"), run: app.education },
  // blog: { el: $("#blog"), run: app.blog },
  // contact: { el: $("#contact"), run: app.contact }
};

app.logo = $("#navLogo");
app.currentWaypoint = app.sections.$logo;

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
/*****************          ANIMATORS         *******************/
/****************************************************************/
app.animateLogo = function(location) {
  // logo antlers expand
  $(`#${location} .logo2`).addClass("expand");
  setTimeout(() => {
    $(`#${location} .logo3`).addClass("expand");
  }, 1000);
  // logo bars expand
  setTimeout(() => {
    $(`#${location} .bar`).addClass("expand");
  }, 1200);
};

app.animateMenu = function() {
  // bars expand on load
  setTimeout(() => {
    $("button.dropMenu").addClass("expand");
    $(".drop button").attr("disabled", true);
  }, 1200);
};

app.resetAll = function() {
  $("main *").removeClass("expand");
};

/****************************************************************/
/*****************          HANDLERS          *******************/
/****************************************************************/

// listeners manifest
app.listeners = function() {
  app.handleLogo();
  app.handleMenu();
  app.handleWaypoints();
  app.handleProjects();
};

app.handleWaypoints = function() {
  // ALL WAYPOINTS
  for (let section in app.sections) {
    const $el = app.sections[section].el;
    $el.waypoint(
      function() {
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
    { offset: "0%" }
  );
};

app.handleLogo = function() {
  // hovers and focus over logo
  $(".logo").focus(function() {
    const id = $(this).attr("id");
    $(`#${id} .logo1 img`).attr("src", "assets/hover/2.png");
    $(`#${id} .logo2 img`).attr("src", "assets/hover/3.png");
    $(`#${id} .logo3 img`).attr("src", "assets/hover/4.png");
  });

  $(".logo").blur(function() {
    console.log("location id is: ", $(this).attr("id"));
    const id = $(this).attr("id");
    const folder = id === "n" ? "nav" : "quote";
    $(`#${id} .logo1 img`).attr("src", `assets/${folder}/2.png`);
    $(`#${id} .logo2 img`).attr("src", `assets/${folder}/3.png`);
    $(`#${id} .logo3 img`).attr("src", `assets/${folder}/4.png`);
  });

  $(".logo").mouseover(function() {
    const id = $(this).attr("id");
    $(`#${id} .logo1 img`).attr("src", "assets/hover/2.png");
    $(`#${id} .logo2 img`).attr("src", "assets/hover/3.png");
    $(`#${id} .logo3 img`).attr("src", "assets/hover/4.png");
  });

  $(".logo").mouseleave(function() {
    console.log("location id is: ", $(this).attr("id"));
    const id = $(this).attr("id");
    const folder = id === "n" ? "nav" : "quote";
    $(`#${id} .logo1 img`).attr("src", `assets/${folder}/2.png`);
    $(`#${id} .logo2 img`).attr("src", `assets/${folder}/3.png`);
    $(`#${id} .logo3 img`).attr("src", `assets/${folder}/4.png`);
    $(".logo").blur();
  });
};

app.handleProjects = function() {
  $(".galleryPic a").mouseover(function() {
    const id = $(this).children()[0].id;
    const img = id.charAt(1);
    $(`img#${id}`).attr("src", `assets/projects/hover/${img}.png`);
  });
  $(".galleryPic a").focus(function() {
    const id = $(this).children()[0].id;
    const img = id.charAt(1);
    $(`img#${id}`).attr("src", `assets/projects/hover/${img}.png`);
  });

  $(".galleryPic a").blur(function() {
    const id = $(this).children()[0].id;
    const img = id.charAt(1);
    $(`img#${id}`).attr("src", `assets/projects/${img}.png`);
  });
  $(".galleryPic a").mouseleave(function() {
    const id = $(this).children()[0].id;
    const img = id.charAt(1);
    $(`img#${id}`).attr("src", `assets/projects/${img}.png`);
    $(".galleryPic a").blur();
  });
};

app.handleMenu = function() {
  // menu icon
  $(".dropMenu").on("click", function() {
    $(".drop").toggleClass("expand");
    $(this).blur();
    $("#navLogo .bar").toggleClass("expand");
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
      scrollTop: $(`#${id}`).offset().top - app.sections[id].offset
    },
    app.sections[id].delay
  );
};

/****************************************************************/
/*****************           SETUP           ********************/
/****************************************************************/
app.init = function() {
  app.resetAll();
  app.animateLogo("navLogo");
  app.animateMenu();
  app.listeners();
};

$(() => {
  app.init();
});

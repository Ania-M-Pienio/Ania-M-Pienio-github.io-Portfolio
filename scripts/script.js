const app = {};

app.isDropped = false;

app.sections = {
  home: {
    el: $("#home"),
    offset: 0,
    delay: 1000,
    trigger: "90%",
    run: function() {
      // no animation
    }
  },
  overview: {
    el: $("#overview"),
    offset: 50,
    delay: 1500,
    trigger: "80%",
    run: function() {
      $("section.overview").addClass("expand");
      $(".gallery.pic2 .galleryBar").addClass("expand");
      $(".scrollTop").css("visibility", "visible");
    }
  },
  skills: {
    el: $("#skills"),
    offset: 30,
    delay: 1500,
    trigger: "90%",
    run: function() {
      $(".skills.wrapper").addClass("expand");
    }
  },
  about: {
    el: $("#about"),
    offset: 10,
    delay: 1500,
    trigger: "90%",
    run: function() {
      // no animation
    }
  },
  quote: {
    el: $("#quote"),
    offset: 0,
    delay: 0,
    trigger: "90%",
    run: function() {
      app.animateLogo("quoteLogo");
    }
  },
  projects: {
    el: $("#projects"),
    offset: 300,
    delay: 400,
    trigger: "90%",
    run: function() {
      $(".projectContainer").addClass("expand");
    }
  },
  blog: {
    el: $("#blog"),
    offset: 300,
    delay: 500,
    trigger: "90%",
    run: function() {
      $(".blogBar").addClass("expand");
    }
  },
  contact: {
    el: $("#contact"),
    offset: -50,
    delay: 2000,
    trigger: "100%",
    run: function() {
      app.animateLogo("contactLogo");
    }
  }
};

app.logo = $("#navLogo");
app.currentWaypoint = app.sections.$logo;

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
  $("footer *").removeClass("expand");
  $(".scrollTop").css("visibility", "hidden");
};

/****************************************************************/
/*****************          HANDLERS          *******************/
/****************************************************************/

// listeners manifest
app.listeners = function() {
  app.handleLogo();
  app.handleMenu();
  app.handleWaypoints();
  app.handleContacts();
};

app.handleWaypoints = function() {
  // ALL WAYPOINTS
  for (let section in app.sections) {
    const $el = app.sections[section].el;
    $el.waypoint(
      function() {
        app.sections[section].run();
      },
      { offset: app.sections[section].trigger }
    );
  }

  // START WAYPOINT
  app.logo.waypoint(
    function(direction) {
      direction === "up" ? app.resetAll() : "";
    },
    { offset: "2%" }
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
    const id = $(this).attr("id");
    const folder = id === "n" ? "nav" : "quote";
    $(`#${id} .logo1 img`).attr("src", `assets/${folder}/2.png`);
    $(`#${id} .logo2 img`).attr("src", `assets/${folder}/3.png`);
    $(`#${id} .logo3 img`).attr("src", `assets/${folder}/4.png`);
    $(".logo").blur();
  });

  $(".mainLogo button, .scrollTop button").on("click", function() {
    $(this).blur();
    setTimeout(() => {
      app.scrollToElem("home");
    }, 200);
  });
};

app.handleMenu = function() {
  // menu icon
  $(".dropMenu").on("click", function() {
    $(".drop").toggleClass("expand");
    $(this).blur();
    $("#navLogo .bar").toggleClass("expand");
    $(".dropBar").toggleClass("expand");
    $(".navMenuLogo").toggleClass("expand");
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

  // contact menu
  $(".menuContainer li button").on("click", function() {
    $(this).blur();
    let id = $(this).attr("id");
    id = id.substring(2, id.length).toLowerCase();
    setTimeout(() => {
      app.scrollToElem(id);
    }, 300);
  });

  // overview menu
  $(".overBtn").on("click", function() {
    $(this).blur();
    let id = $(this).attr("id");
    id = id.substring(2, id.length).toLowerCase();
    setTimeout(() => {
      app.scrollToElem(id);
    }, 300);
  });

  // defocuses all anchors after click
  $(".socialContainer a").on("click", function() {
    $(this).blur();
  });
}; // end of menu handlers

app.handleContacts = function() {
  // process the request to copy email
  $(".emailCopy").on("click", async function() {
    app.copyEmail();
    app.showMessage("copied");
  });

  /****************************************************************/
  /*****************           HELPERS          *******************/
  /****************************************************************/

  // receives the message, shows it, and then removes it
  app.showMessage = function(message) {
    $(".mssg h4").html(message);
    app.expand($(".mssg"), 300).then(() => {
      setTimeout(() => {
        $(".mssg").removeClass("expand");
      }, 1500);
    });
  };

  // 'expands' the given element after a delay period returns promise once completed
  app.expand = function($el, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve($el.addClass("expand"));
      }, delay);
    });
  };

  // scrolls to the element with the given id
  app.scrollToElem = function(id) {
    $("html, body").animate(
      {
        scrollTop: $(`#${id}`).offset().top - app.sections[id].offset
      },
      app.sections[id].delay
    );
  };

  // copy email to user's cliboard
  app.copyEmail = function() {
    const copyEmail = document.getElementById("email");
    copyEmail.select();
    copyEmail.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };
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

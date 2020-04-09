const app = {};

app.isDropped = false;

// cached jQuery for the Message Form
app.form = {};
app.form.$name = $("#name");
app.form.$email = $("#replyTo");
app.form.$message = $("#theMessage");
app.form.$reply = $("#expectReply");

// section scroll behavior and animations
app.sections = {
  home: {
    el: $("#home"),
    offset: 0,
    delay: 200,
    trigger: "80%",
    run: function () {
      // no animation
    },
  },
  overview: {
    el: $("#overview"),
    offset: 0,
    delay: 200,
    trigger: "80%",
    run: function () {
      $("section.overview").addClass("expand");
      $(".gallery.pic2 .galleryBar").addClass("expand");
      $(".scrollTop").css("visibility", "visible");
    },
  },
  skills: {
    el: $("#skills"),
    offset: 100,
    delay: 200,
    trigger: "100%",
    run: function () {
      $(".skills.wrapper").addClass("expand");
    },
  },
  about: {
    el: $("#about"),
    offset: 0,
    delay: 0,
    trigger: "100%",
    run: function () {
      app.animateLogo("quoteLogo");
    },
  },
  projects: {
    el: $("#projects"),
    offset: 500,
    delay: 200,
    trigger: "100%",
    run: function () {
      $(".projectContainer").addClass("expand");
    },
  },
  blog: {
    el: $("#blog"),
    offset: 500,
    delay: 200,
    trigger: "100%",
    run: function () {
      $(".blogBar").addClass("expand");
    },
  },
  contact: {
    el: $("#contact"),
    offset: 500,
    delay: 200,
    trigger: "100%",
    run: function () {
      app.animateLogo("contactLogo");
    },
  },
  privacy: {
    el: $("#privacy"),
    offset: 0,
    delay: 200,
    trigger: "100%",
    run: function () {
      //no animations
    },
  },
};

app.logo = $("#navLogo");
app.currentWaypoint = app.sections.$logo;

/****************************************************************/
/*****************          ANIMATORS         *******************/
/****************************************************************/

// scrolls to the element with the given id
app.scrollToElem = function (id) {
  $("html, body").animate(
    {
      scrollTop: $(`#${id}`).offset().top - app.sections[id].offset,
    },
    app.sections[id].delay
  );
};

// animates a logo at a specific given location
app.animateLogo = function (location) {
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

app.animateMenu = function () {
  // bars expand on load
  setTimeout(() => {
    $("button.dropMenuButton").addClass("expand");
    $(".drop button").attr("disabled", true);
  }, 1200);
};

app.resetAll = function () {
  $("main *").removeClass("expand");
  $("footer *").removeClass("expand");
  $(".scrollTop:not(.scrollTop.privacy)").css("visibility", "hidden");
};

/****************************************************************/
/*****************          HANDLERS          *******************/
/****************************************************************/

// listener categories
app.listeners = function () {
  app.handleLogo();
  app.handleMenu();
  app.handleWaypoints();
  app.handleContacts();
};

app.handleWaypoints = function () {
  // ALL WAYPOINTS
  for (let section in app.sections) {
    const $el = app.sections[section].el;
    $el.waypoint(
      function () {
        app.sections[section].run();
      },
      { offset: app.sections[section].trigger }
    );
  }

  // START WAYPOINT
  app.logo.waypoint(
    function (direction) {
      direction === "up" ? app.resetAll() : "";
    },
    { offset: "2%" }
  );
};

app.handleLogo = function () {
  // main logo on click
  $(".mainLogo button, .scrollTop button").on("click", function () {
    $(this).blur();
    setTimeout(() => {
      app.scrollToElem("home");
    }, 200);
  });
};

app.handleMenu = function () {
  // menu icon
  $(".dropMenuButton").on("click", function () {
    $(this).blur();
    if (app.isDropped) {
      setTimeout(() => {
        $(".drop").toggleClass("expand");
        $("#navLogo .bar").toggleClass("expand");
        $(".dropBar").toggleClass("expand");
        $(".navMenuLogo").toggleClass("expand");
      }, 500);
      $(".drop button").attr("disabled", true);
      $(".drop").css("display", "none");
    } else {
      $(".drop").css("display", "block");
      $(".drop button").attr("disabled", false);
      setTimeout(() => {
        $(".drop").toggleClass("expand");
        $("#navLogo .bar").toggleClass("expand");
        $(".dropBar").toggleClass("expand");
        $(".navMenuLogo").toggleClass("expand");
      }, 500);
    }
    app.isDropped = !app.isDropped;
  });

  // menu items
  $(".drop li button").on("click", function () {
    $(this).blur();
    const id = $(this).attr("id");
    setTimeout(() => {
      app.scrollToElem(id.toLowerCase());
    }, 300);
  });

  // contact menu
  $(".menuContainer li button").on("click", function () {
    $(this).blur();
    let id = $(this).attr("id");
    id = id.substring(2, id.length).toLowerCase();
    setTimeout(() => {
      app.scrollToElem(id);
    }, 300);
  });

  // overview menu
  $(".overBtn").on("click", function () {
    $(this).blur();
    let id = $(this).attr("id");
    id = id.substring(2, id.length).toLowerCase();
    setTimeout(() => {
      app.scrollToElem(id);
    }, 300);
  });

  // defocuses all anchors after click
  $(".container a").on("click", function () {
    $(this).blur();
  });
}; // end of menu handlers

app.handleContacts = function () {
  // process the request to copy email
  $(".emailCopy").on("click", async function () {
    app.copyEmail();
    Swal.fire({
      title: "COPIED TO YOUR CLIPBOARD",
      imageUrl: "https://cdn140.picsart.com/309655410116201.jpg",
      imageWidth: 550,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  });

  // do form validation
  $("form").validate({
    // validation rules
    rules: {
      name: {
        required: true,
        pattern: true,
      },
      _replyto: {
        email: true,
        required: {
          depends: function (elem) {
            return app.form.$reply.is(":checked");
          },
        },
      },
      message: {
        required: true,
        pattern: true,
      },
    },
    // messages to appear when invalid
    messages: {
      name: {
        required: "Please provide your name",
      },
      _replyto: {
        email: "This is not a valid email address",
        required: "Please provide email to receive a reply",
      },
      message: {
        required: "Please write a message",
      },
    },
    // submits once all validation clears
    submitHandler: function () {
      app.sendMessage();
    },
  });

  // reset message form
  $("#resetMssg").on("click", function () {
    app.resetForm();
  });

  // whenever the "would like a reply" checkbox is changed
  $("#expectReply").on("change", function () {
    if (app.form.$reply.is(":checked")) {
      app.form.$email.prev().append("<span>*</span>");
      $("ion-icon[name=checkbox]").css("opacity", "1");
    } else {
      app.form.$email.prev().html("Email");
      $(this).removeClass("error");
      $(this).val("");
      $("label#replyTo-error").css("display", "none");
      $("ion-icon[name=checkbox]").css("opacity", "0");
    }
  });
};

/****************************************************************/
/*****************           HELPERS          *******************/
/****************************************************************/

// validate for empty spaces
$.validator.addMethod(
  "pattern", // name
  function (value, element, param) {
    if (value.trim()) {
      return true;
    } else {
      $(`#${element.id}`).val("");
      return false;
    }
    // return value.trim() ? true : false;
  },
  "please provide valid text"
);

// copy email to user's cliboard
app.copyEmail = function () {
  const copyEmail = document.getElementById("email");
  copyEmail.select();
  copyEmail.setSelectionRange(0, 99999);
  document.execCommand("copy");
};

// runs when form is submitted
app.sendMessage = function () {
  app.resetForm();
  $.ajax({
    url: "https://formspree.io/xqkdpjpb",
    method: "POST",
    data: {
      name: app.form.$name.val(),
      _replyto: app.form.$email.val(),
      message: app.form.$message.val(),
    },
    dataType: "json",
  }).then((res) => {
    app.resetForm();
    Swal.fire({
      title: "YOUR MESSAGE WAS SENT  THANK YOU!",
      imageUrl:
        "https://66.media.tumblr.com/c43191acd5f7cf1e54afb360df49e6ce/tumblr_nsb0llVRSl1qdt6e2o7_1280.jpg",
      imageWidth: 280,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  });
};

// clears the message form
app.resetForm = function () {
  // clears out errors
  $("label.error").css("display", "none");
  $(".error").removeClass("error");
  // unchecks the reply options
  app.form.$reply.prop("checked", false);
  $("ion-icon[name=checkbox]").css("opacity", "0");
  // empties out the inputs
  app.form.$email.val("");
  app.form.$name.val("");
  app.form.$message.val("");
};

/****************************************************************/
/*****************           SETUP           ********************/
/****************************************************************/
app.init = function () {
  app.resetAll();
  app.animateLogo("navLogo");
  app.animateMenu();
  app.listeners();
};

$(() => {
  app.init();
});

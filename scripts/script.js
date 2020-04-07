const app = {};

app.isDropped = false;

app.form = {};
app.form.$name = $("#name");
app.form.$email = $("#replyTo");
app.form.$message = $("#theMessage");
app.form.$reply = $("#expectReply");

app.sections = {
  home: {
    el: $("#home"),
    offset: 0,
    delay: 1000,
    trigger: "90%",
    run: function () {
      // no animation
    },
  },
  overview: {
    el: $("#overview"),
    offset: 50,
    delay: 1500,
    trigger: "80%",
    run: function () {
      $("section.overview").addClass("expand");
      $(".gallery.pic2 .galleryBar").addClass("expand");
      $(".scrollTop").css("visibility", "visible");
    },
  },
  skills: {
    el: $("#skills"),
    offset: 30,
    delay: 1500,
    trigger: "90%",
    run: function () {
      $(".skills.wrapper").addClass("expand");
    },
  },
  about: {
    el: $("#about"),
    offset: 10,
    delay: 1500,
    trigger: "90%",
    run: function () {
      // no animation
    },
  },
  quote: {
    el: $("#quote"),
    offset: 0,
    delay: 0,
    trigger: "90%",
    run: function () {
      app.animateLogo("quoteLogo");
    },
  },
  projects: {
    el: $("#projects"),
    offset: 300,
    delay: 400,
    trigger: "90%",
    run: function () {
      $(".projectContainer").addClass("expand");
    },
  },
  blog: {
    el: $("#blog"),
    offset: 300,
    delay: 500,
    trigger: "90%",
    run: function () {
      $(".blogBar").addClass("expand");
    },
  },
  contact: {
    el: $("#contact"),
    offset: 0,
    delay: 2000,
    trigger: "100%",
    run: function () {
      app.animateLogo("contactLogo");
    },
  },
};

app.logo = $("#navLogo");
app.currentWaypoint = app.sections.$logo;

/****************************************************************/
/*****************          ANIMATORS         *******************/
/****************************************************************/

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
    $("button.dropMenu").addClass("expand");
    $(".drop button").attr("disabled", true);
  }, 1200);
};

app.resetAll = function () {
  $("main *").removeClass("expand");
  $("footer *").removeClass("expand");
  $(".scrollTop").css("visibility", "hidden");
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
  $(".mainLogo button, .scrollTop button").on("click", function () {
    $(this).blur();
    setTimeout(() => {
      app.scrollToElem("home");
    }, 200);
  });
};

app.handleMenu = function () {
  // menu icon
  $(".dropMenu").on("click", function () {
    $(this).blur();
    $(".drop").toggleClass("expand");
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
  $(".socialContainer a").on("click", function () {
    $(this).blur();
  });
}; // end of menu handlers

app.handleContacts = function () {
  // process the request to copy email
  $(".emailCopy").on("click", async function () {
    app.copyEmail();
    app.showMessage("copied");
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
      _replyto: "Please provide a valid email address to receive a reply",
      message: {
        required: "Please write a message",
      },
    },
    // submits once all validation clears
    submitHandler: function () {
      const name = app.form.$name.val().trim();
      const message = app.form.$message.val().trim();

      // if only blank spaces were typed for name
      if (!name) {
        app.form.$name.val("");
      }

      // if only blank spaces were typed for message
      if (!message) {
        app.form.$message.val("");
      }

      // if there is still text after trim on both then ok to send message
      if (name && message) {
        app.sendMessage();
      }
    },
  });

  $("#resetMssg").on("click", function (e) {
    e.preventDefault();
    app.resetForm();
  });

  // whenever the "would like a reply" checkbox is changed
  $("#expectReply").on('change', function() {
    if (app.form.$reply.is(":checked")) {
      app.form.$email.prev().append("<span>*</span>");
      $("ion-icon[name=checkbox]").css("opacity", "1");
      console.log($("ion-icon[name=checkbox]"));
    } else {
      app.form.$email.prev().html("Email");
      $(this).removeClass("error");  
      $(this).val("");
      $("label#replyTo-error").css("display", "none");
      $("ion-icon[name=checkbox]").css("opacity", "0");       
    }
  });
};

$.validator.addMethod(
  "pattern", // name
  function (value, element, param) {  
    return value.trim() ? true : false;
  },
  "Cannot be blank spaces"
);

/****************************************************************/
/*****************           HELPERS          *******************/
/****************************************************************/

// runs when form is submitted
app.sendMessage = function () {
  console.log("submit");
  // $.ajax({
  //   url: "https://formspree.io/xqkdpjpb",
  //   method: "POST",
  //   data: {
  //     name: app.form.$name,
  //     _replyto: app.form.$email,
  //     message: app.form.$message,
  //   },
  //   dataType: "json",
  // }).then((res) => {
  //   console.log(res);
  // });
};

// clears the errors from the message form
app.resetForm = function () {
  $("label.error").css("display", "none");
  $(".error").removeClass("error");
  app.form.$reply.prop("checked", false);
};

// receives the message, shows it, and then removes it
app.showMessage = function (message) {
  $(".mssg h4").html(message);
  app.delayedExpand($(".mssg"), 300).then(() => {
    setTimeout(() => {
      $(".mssg").removeClass("expand");
    }, 1500);
  });
};

// 'expands' the given element after a delay period returns promise once completed
app.delayedExpand = function ($el, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve($el.addClass("expand"));
    }, delay);
  });
};

// scrolls to the element with the given id
app.scrollToElem = function (id) {
  $("html, body").animate(
    {
      scrollTop: $(`#${id}`).offset().top - app.sections[id].offset,
    },
    app.sections[id].delay
  );
};

// copy email to user's cliboard
app.copyEmail = function () {
  const copyEmail = document.getElementById("email");
  copyEmail.select();
  copyEmail.setSelectionRange(0, 99999);
  document.execCommand("copy");
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

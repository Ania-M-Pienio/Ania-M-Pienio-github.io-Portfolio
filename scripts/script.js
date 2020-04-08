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
    offset: 0,
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
};

app.logo = $("#navLogo");
app.currentWaypoint = app.sections.$logo;

/****************************************************************/
/*****************          ANIMATORS         *******************/
/****************************************************************/

// scrolls to the element with the given id
app.scrollToElem = function (id) {
  $("html, body").animate({
      scrollTop: $(`#${id}`).offset().top - app.sections[id].offset,
    }, app.sections[id].delay
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
      _replyto: { email: "This is not a valid email address", required: "Please provide email to receive a reply"},
      message: {
        required: "Please write a message",
      },
    },
    // submits once all validation clears
    submitHandler: function () {
        app.sendMessage();
    },
  });

  $("#resetMssg").on("click", function () {
    app.resetForm();
  });

  // whenever the "would like a reply" checkbox is changed
  $("#expectReply").on('change', function() {
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

/****************************************************************/
/*****************           HELPERS          *******************/
/****************************************************************/

// runs when form is submitted
app.sendMessage = function () {
  console.log("submit");
  // app.resetForm();
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
    console.log(res);
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

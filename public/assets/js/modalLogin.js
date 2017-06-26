$(function() {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    // $("form").submit(function () {
    //     switch(this.id) {
    //         case "login-form":
    //             var $lg_username=$('#login_email').val();
    //             var $lg_password=$('#login_password').val();
    //             if ($lg_username == "ERROR") {
    //                 msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
    //             } else {
    //                 msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
    //             }
    //             return false;
    //             break;
    //         case "lost-form":
    //             var $ls_email=$('#lost_email').val();
    //             if ($ls_email == "ERROR") {
    //                 msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
    //             } else {
    //                 msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
    //             }
    //             return false;
    //             break;
    //         case "register-form":
    //             var $rg_username=$('#register_firstName').val();
    //             var $rg_username=$('#register_lastName').val();
    //             var $rg_email=$('#register_email').val();
    //             var $rg_password=$('#register_password').val();
    //             if ($rg_username == "ERROR") {
    //                 msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
    //             } else {
    //                 msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
    //             }
    //             return false;
    //             break;
    //         default:
    //             return false;
    //     }
    //     return false;
    // });

    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });

    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
      }, $msgShowTime);
    }

  $("#login").click(function() {

    var loginEmail = $("#login_email").val();
    var loginPass = $("#login_password").val();
    $.ajax({
      url: "/authenticate",
      method:"POST",
      data: {email: loginEmail, pass:loginPass}
    })
    .done(function(result){
      if(result === "OK") {
        window.location = "/profile";
      }
    })
    .fail(function(e) {
        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
      });
  });

    $("#register").click(function() {
      var email    = $("#register_email").val();
      var pass     = $("#register_password").val();
      var fName    = $("#register_firstName").val();
      var lName    = $("#register_lastName").val();
      var img      = $("#ProfilePic").val();
      var city     = $("#city").val();
      var username = $("#register_userName").val();
      if(!img || !pass || !fName || !lName || !img || !city || !username) {
        // append warning here
        console.log("Need to fill all data in");
      }
      else {
        $.ajax({
          url: "/adduser",
          method:"POST",
          data: {email: email, pass:pass, firstName:fName, lastName:lName, img: img, city:city, userName:username}
        })
        .done(function() {
          modalAnimate($formRegister, $formLogin);
        })
        .fail(function(e) {
          console.log(e);
        });
    }
  });
});

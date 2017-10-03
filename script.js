$(document).ready(function() {
  var players = [
    "freecodecamp",
    "habathcx",
    "noobs2ninjas",
    "cretetion",
    "OgamingSC2",
    "ESL_SC2",
    "comster404",
    "RobotCaleb",
    "brunofin"
  ];

  function getStatus(user) {
    var flag = true;
    var urlStream =
      "https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?";
    var urlUser =
      "https://wind-bow.gomix.me/twitch-api/users/" + user + "?callback=?";
    var ind = (players.indexOf(user) + 1).toString();
    $.ajax({
      url: urlUser,
      type: "GET",
      async: false,
      dataType: "json",
      success: function(data, status) {
        var statusPly = data.status;
        if (statusPly === 422 || statusPly === 404) {
          flag = false;
        }
      }
    });

    $.ajax({
      url: urlStream,
      type: "GET",
      async: false,
      dataType: "json",
      success: function(data, status, jqXHR) {
        if (flag) {
          var stream = data.stream;
          if (stream === null) {
            $(".box" + ind + " h4").css(
              "background-color",
              "rgba(145, 24, 42, 0.37)"
            );
            $(".box" + ind + " p").text("Offline");
            $(".box" + ind)
              .css("visibility", "initial");
              
              
          } else {
            var str = stream.game;
            $(".box" + ind + " h4").css(
              "background-color",
              "rgba(69, 183, 51,0.37)"
            );
            if(str.length>14){
              $(".box" + ind + " p").text("Streaming: " + str.slice(0,10)+"...");
            }else {
              $(".box" + ind + " p").text("Streaming: " + stream.game);
            }
            
            $(".box" + ind)
              .css("visibility", "initial")
              .addClass("animated tada")
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("animated tada");
                }
              );
          }
        } else {
          $(".box" + ind)
            .css("visibility", "initial")
            .addClass("animated flash")
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function() {
                $(this).removeClass("animated flash");
                $(this).css("opacity", "0.4");
                $(this);
              }
            );
          $(".box" + ind).css(
            "background",
            "url('https://s25.postimg.org/cfg35ymf3/ghost.png') no-repeat center"
          );
          $(".box" + ind + " h4").css(
            "background-color",
            "rgba(108, 96, 150,0.37)"
          );
          $(".box" + ind + " p").text("User N/A");
        }
      }
    });
  }

  $(".box1").on("click", function() {
    window.open("https://www.twitch.tv/freecodecamp");
  });
  
  $(".box2").on("click", function() {
    window.open("https://www.twitch.tv/habathcx");
  });
  
  $(".box3").on("click", function() {
    window.open("https://www.twitch.tv/noobs2ninjas");
  });
  
  $(".box4").on("click", function() {
    window.open("https://www.twitch.tv/cretetion");
  });
  
  $(".box5").on("click", function() {
    window.open("https://www.twitch.tv/ogamingsc2");
  });
  
  $(".box6").on("click", function() {
    window.open("https://www.twitch.tv/esl_sc2");
  });
  
  $(".box8").on("click", function() {
    window.open("https://www.twitch.tv/robotcaleb");
  });

  
  // for (var i = 0; i < players.length; i++) {
  //   var currentID = i;
  //   getStatus(players[currentID]);
  // }
  
  players.forEach(function(player,index){
    getStatus(player);
  });
  
});

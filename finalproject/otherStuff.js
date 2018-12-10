

$("#secondGraphic img").mouseover(function() {
    $("circle").css({fill: "darkred"});
});

$("#secondGraphic img").mouseleave(function() {
    $("circle").css({fill: "white"});
});

let lightsOn = true;
$("#thirdGraphic .button").click(function() {
    if(lightsOn) {
        $("#thirdGraphic img").css({filter: "brightness(30%)"});
        $("#thirdGraphic object").css({filter: "brightness(30%)"});
        lightsOn = false;
    }
    else {
        $("#thirdGraphic img").css({filter: "brightness(100%)"});
        $("#thirdGraphic object").css({filter: "brightness(100%)"});
        lightsOn = true;
    }

});
'use strict';
let articleDis = "article0.txt";
let clickCount = 0;

$( document ).ready(function() { //hide onload
    $(".list").hide();
});

$(".top").click(function () { 
    $(this).next(".list").slideToggle("fast");
});

$("article").load(articleDis);

$(":radio").change(function () {
    articleDis = $(this).val();
    $("article").load(articleDis);
    console.log("hello?");
});

$("#click").click(function () {
    clickCount++;
    $("#clickcount").text(clickCount);
    console.log(clickCount);
})
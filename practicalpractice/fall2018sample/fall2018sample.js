/* Don't use <script> tags in a linked js file! */
'use strict';
let file = ("content1.txt");

$( document ).ready(function() { //hide onload
    $(".submenu").hide();
});

$(".menuitem").click(function () { 
    $(this).next(".submenu").slideToggle("slow");
});

$("#content-menu").val(file);
$("#content").load(file);

$("#choose-content").change(function () {
    file = $(this).val();
    $("#content").load(file);
});
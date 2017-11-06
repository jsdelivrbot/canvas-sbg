var loadScript = function(script){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = script;
    $("head").append(s);
}

$(function() { loadScript("https://rawgit.com/coshx/canvas-sbg/master/sbg.js") });

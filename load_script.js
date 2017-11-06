var loadScript = function(script){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = script;
    $("head").append(s);
}

$(function() {
  [
   "https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js",
   "https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.2/Rx.min.js",
   "https://cdnjs.cloudflare.com/ajax/libs/rxjs-dom/7.0.3/rx.dom.min.js",
   "https://rawgit.com/coshx/canvas-sbg/master/sbg.js"
  ].forEach(loadScript)
    

});

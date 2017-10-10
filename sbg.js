$(function() {
  console.log("In sbg.js");
  var match = location.href.match(/\/courses\/(\d+)\/gradebook#tab-outcome/);
  if (match) {
    var course_id = match[1];
    console.log("course_id: " + course_id);
    $.get("/api/v1/courses/"+course_id+"/outcome_results")
      .done(function(data) {
        console.log("Got data for course: " + course_id);
        console.dir(data);
      })
      .error(function(err) {
        console.log("An error occurred trying to get outcome results for course: " + course_id);
        console.dir(err);
      });
  } else {
    console.log("not on gradebook outcome mastery tab");
  }
});

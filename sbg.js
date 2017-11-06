$(function() {
  console.log("In sbg.js");
  
  var matchOutcome = location.href.match(/\/courses\/(\d+)\/gradebook#tab-outcome/);
  var matchAssignment = location.href.match(/\/courses\/(\d+)\/gradebook#tab-assignment/);

  if (matchOutcome) {

	  [
	   "https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js",
	   "https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.2/Rx.min.js",
	   "https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.0/axios.min.js"
	  ].forEach(loadScript)


    var course_id = matchOutcome[1];
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
  } else if(matchAssignment) {

	  [
	   "https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js",
	   "https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.2/Rx.min.js",
	   "https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.0/axios.min.js"
	  ].forEach(loadScript)

    var course_id = matchAssignment[1];
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

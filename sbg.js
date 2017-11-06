var loadSbg = function(){

  Rx.Observable.fromPromise(axios.get(`/api/v1/courses/${course_id}/outcome_results`))
    .do(console.log)
    .subscribe();

  // $.get("/api/v1/courses/"+course_id+"/outcome_results")
  //   .done(function(data) {
  //     console.log("Got data for course: " + course_id);
  //     console.dir(data);
  //   })
  //   .error(function(err) {
  //     console.log("An error occurred trying to get outcome results for course: " + course_id);
  //     console.dir(err);
  //   });
  // console.log("not on gradebook outcome mastery tab");

}

$(function() {
  console.log("In sbg.js");
  
  var matchOutcome = location.href.match(/\/courses\/(\d+)\/gradebook#tab-outcome/);
  var matchAssignment = location.href.match(/\/courses\/(\d+)\/gradebook#tab-assignment/);

  if (matchAssignment) {

  	var course_id = matchAssignment[1];
    console.log("course_id: " + course_id);

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js", function(){
    	loadScript("https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.2/Rx.min.js", function(){
    		loadScript("https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.0/axios.min.js", function(){
          loadSbg()
    		})
    	})
    })

  }

});

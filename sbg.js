var colorColumns = function(){
	Rx.Observable.from($('.custom_column')).do(cellEl => { 
	  percentScore = Number($(cellEl).text().replace('%', ''))
	  if(percentScore > 60){
	    $(cellEl).css('background-color', 'rgba(106, 132, 63, 0.5)')
	  } else if(percentScore > 30){
	    $(cellEl).css('background-color', 'rgba(138, 172, 83, 0.5)')
	  } else {
	    // noop
	  }
	}).subscribe()
}

var addOutcomeResultToColumn = function(course_id, columns, outcomes, outcomeResult){

  learningOutcomeId = R.pathOr(null, ['links', 'learning_outcome'], outcomeResult)

	learningOutcome = R.find(R.pathEq(['id'], Number(learningOutcomeId)), outcomes)

	column = R.find(R.pathEq(['title'], learningOutcome.title), columns) 

	column_id = column.id

	user_id = R.pathOr(null, ['links', 'user'], outcomeResult)

	console.log(course_id, column_id, user_id, outcomeResult)

  // TODO use/fix axios?
	$.ajax({
	  type: "PUT",
	  url: `/api/v1/courses/${course_id}/custom_gradebook_columns/${column_id}/data/${user_id}`,
	  data: {
	    column_data: {
	      content: `${100 * outcomeResult.percent}%`
	    }
	  },
	  success: function(){},
	  dataType: function(){}
	});
}

var populateOutcomeColumns = function(course_id, outcomes){
	Rx.Observable.fromPromise(axios.get(`/api/v1/courses/${course_id}/outcome_results`))
    .map(R.pathOr({}, ['data', 'outcome_results']))
    .flatMap(outcomeResults => {
      return Rx.Observable.fromPromise(axios.get(`/api/v1/courses/${course_id}/custom_gradebook_columns`))
        .map(R.pathOr({}, ['data']))
        .flatMap(columns => {
        	return Rx.Observable.from(outcomeResults)
        	  .do(outcomeResult => addOutcomeResultToColumn(course_id, columns, outcomes, outcomeResult))
        })
    })
    .subscribe();
} 

var createColumn = function(course_id, title){
	// Rx.Observable.fromPromise(axios.post(`/api/v1/courses/${course_id}/custom_gradebook_columns`, { column: { title } }))
	//   .subscribe()

	$.ajax({
	  type: "POST",
	  url: `/api/v1/courses/${course_id}/custom_gradebook_columns`,
	  data: {
	    column: {
	      title: title
	    }
	  },
	  success: function(){},
	  dataType: function(){}
	});
}

var findOrCreateOutcomeColumns = function(course_id, outcomes){
	Rx.Observable.from(outcomes)
	  .flatMap(outcome => {
	  	return Rx.Observable.fromPromise(axios.get(`/api/v1/courses/${course_id}/custom_gradebook_columns`))
	  	  .map(R.pathOr({}, ['data']))
	  	  .map(R.map(R.path(['title'])))
	  	  .map(columnTitles => R.contains(outcome.title, columnTitles))
	  	  .do(columnExists => {
	  	  	if(columnExists){
            // found...
	  	  	} else {
            createColumn(course_id, outcome.title)
	  	  	}
	  	  })
	  })
	  .subscribe()
}

var loadSbg = function(course_id){

  Rx.Observable.fromPromise(axios.get(`/api/v1/courses/${course_id}/root_outcome_group`))
    .map(R.pathOr({}, ['data', 'outcomes_url']))
    .flatMap(outcomes_url => Rx.Observable.fromPromise(axios.get(outcomes_url)))
    .map(R.pathOr({}, ['data']))
    .map(R.map(R.path(['outcome'])))
    .flatMap(outcomes => {
    	findOrCreateOutcomeColumns(course_id, outcomes)
    	populateOutcomeColumns(course_id, outcomes)
    	colorColumns()
    	return Rx.Observable.of({})
    })
    .subscribe()

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
          loadSbg(course_id)
    		})
    	})
    })

  }

});

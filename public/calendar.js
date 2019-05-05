/* Global variable that indicates what schedule of allSchedules is to be shown */
var indx = 0;


/* Updates events on calendar */
function updateEvents(indx) {
	var events = [];
	var colors = ['#e6194B', '#f58231', '#800000', '#000075', '#3cb44b', '#42d4f4', '#4363d8', '#911eb4', '#f032e6', '#000000', '#9A6324', '#469990'];
	var courses = allSchedules[indx];
	for (var j=0; j<courses.length; j++) {
		var course = courses[j];
		var times = course.times;
		var online = false;
		/* If online class set class to show on Monday */
		if (times['T'] == 'TBD') {
			times = {
				'M': '12:00am-12:00pm'
			};
			online = true;
		}

		/* Create event to display for each day and time */
		for (day in times) {
			var start = createDate(day, times[day].split("-")[0]).getTime();
			var end = createDate(day, times[day].split("-")[1]).getTime();
			var content = createContent(course);
			events.push(createEvent(course.subject + " " + course.number, start, end, colors[j], content, online));
		}
	}
	return events;
}


/* Creates string for popover to display course info */
function createContent(course) {
	var res = course.title + ' - <b>Instructor:</b> ' + course.instructor + '<br /><b>Type:</b> ' + course.type + '<br /><b>Method:</b> ' + course.method + '<br /><b>Section:</b> ' + course.section + '<br /><b>Building:</b> ' + course.building + '<br /><b>Room:</b> ' + course.room + '<br /><b>CRN:</b> ' + course.crn + '<br /><b>Enroll:</b> ' + course.enroll + '/' + course.max_enroll + '<br /><b>Credits:</b> ' + course.credits;
	return res;
}


/* Creates JSON object of course information */
function createEvent(title, start, end, color, content, online) {
	if (online) {
		return {
			title: title,
			start: start,
			color: color,
			description: content,
			allDay: true
		}
	}
	var event = {
		title: title,
		start: start,
		end: end,
		color: color,
		description: content,
		allDay: false
	};
	return event
}


/* Creates date for calendar to display properly */
function createDate(day, time) {
	var event = new Date();
	time = convertTime(time);
	switch(day) {
		case "M":
			event.setFullYear(2017, 0, 2);
			break;
		case "T":
			event.setFullYear(2017, 0, 3);
			break;
		case "W":
			event.setFullYear(2017, 0, 4);
			break;
		case "R":
			event.setFullYear(2017, 0, 5);
			break;
		case "F":
			event.setFullYear(2017, 0, 6);
			break;
		case "S":
			event.setFullYear(2017, 0, 7);
			break;
	}
	event.setHours(time.substring(0,2));
	event.setMinutes(time.substring(2));
	event.setSeconds(0);
	event.setMilliseconds(0);
	return event;
}


/* Converts time from normal format HH:MM AM/PM to military time HH:MM */
function convertTime(time) {
	var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s?([AaPp][Mm]?)$/)[1];
    var pm = ['P', 'p', 'PM', 'pM', 'pm', 'Pm'];
    var am = ['A', 'a', 'AM', 'aM', 'am', 'Am'];

	if (pm.indexOf(AMPM) >= 0 && hours < 12) hours = hours + 12;
	if (am.indexOf(AMPM) >= 0 && hours == 12) hours = hours - 12;

    var sHours = hours.toString();
    var sMinutes = minutes.toString();

	if (hours < 10) sHours = "0" + sHours;
	if (minutes < 10) sMinutes = "0" + sMinutes;
    return (sHours + sMinutes);
}


/* Updates title (div with id scheduleNum) depending upon indx */
function updateTitle(indx) {
	$("#scheduleNum").html("<center><h1>Schedule " + String(indx+1) + " / " + String(allSchedules.length) + "</h1></center>");
}


/* On click of "Get CRNs" button modifies datalist to show and list all CRNs */
function getCRN() {
	$("#crnArea").val("");
	$("#crnArea").toggle();
	var schedule = allSchedules[indx];
	for (var j=0; j<schedule.length-1; j++) {
		var course = schedule[j];
		$("#crnArea").val($("#crnArea").val() + course.crn + ",\n");	
	}
	$("#crnArea").val($("#crnArea").val() + allSchedules[indx][allSchedules[indx].length-1].crn);
	$(function() {
	    $('textarea').each(function() {
	        $(this).height($(this).prop('scrollHeight'));
	    });
	});
}


$(document).ready(function() {
	$("#content").toggle();
	indx = 0;
	
	/* Change to next schedule */
	$('.next').click(function() {
		if (indx < (allSchedules.length - 1)) {
			indx++;
			$("#crnArea").hide();
			/* Reset and update events and title in calendar */
			$('#calendar').fullCalendar('removeEvents');
			$('#calendar').fullCalendar('addEventSource', updateEvents(indx));
			updateTitle(indx);
		}
	});
	
	/* Change to previous schedule */
	$('.previous').click(function() {
		if (indx > 0) {
			indx--;
			$("#crnArea").hide();
			/* Reset and update events and title in calendar */
			$('#calendar').fullCalendar('removeEvents');
			$('#calendar').fullCalendar('addEventSource', updateEvents(indx));
			updateTitle(indx);
		}
	});
	updateTitle(indx);

	/* Calendar Object */
	$('#calendar').fullCalendar({
		header: {
			left: '',
			center: '',
			right: '',
		},
		defaultDate: '2017-01-01',
		defaultView: 'agendaWeek',
		allDayText: 'Online',
		allDaySlot: true,
		columnHeaderFormat: 'ddd',
		minTime: '7:00',
		maxTime: '23:00',
		events: updateEvents(indx),
		timezone: 'local',
		eventRender: function(eventObj, $el) {
			$el.popover({
			title: eventObj.description.split(' - ')[0],
			content: eventObj.description.split(' - ')[1],
			html: true,
			trigger: 'hover',
			placement: 'top',
			container: 'body'
			});
		}
	});

	/* Copies crn content when clicked */
	$("#crnArea").click(function(){
	    $("#crnArea").select();
	    document.execCommand('copy');
	});

});


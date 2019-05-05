function parseDbEvent(dbEntry) {

	let allEvents = [];

	let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

	if ("gender" in dbEntry) {
		if (dbEntry["gender"].toLowerCase().includes("family")) {
			calCategory = "family";
		} else if (dbEntry["gender"].toLowerCase().includes("women")) {
			calCategory = "women";
		} else if (dbEntry["gender"].toLowerCase().includes("men")) {
			calCategory = "men"
		} else {
			calCategory = null;
		}
	} else {
		if (dbEntry["snap"].toLowerCase() == "yes") {
			calCategory = "snap";
		} else if (dbEntry["fmnp"].toLowerCase() == "yes") {
			calCategory = "fmnp";
		} else if (dbEntry["bucks"].toLowerCase() == "yes") {
			calCategory = "bucks";
		}
	}

	for (day in days) {
		if (day in dbEntry) {
			let temp = parseDay(dbEntry, day);
			var event = {
		      'summary': 'Google I/O 2015',
		      'location': dbEntry.address + " " + dbEntry.city + " " + dbEntry.state + " " + db.zip,
		      'description': dbEntry.name,
		      'start': {
		        'dateTime': res[0],
		        'timeZone': 'America/New_York',
		      },
		      'end': {
		        'dateTime': res[1],
		        'timeZone': 'America/New_York',
		      },
		      'recurrence': [
		        'RRULE:FREQ=DAILY;COUNT=2'
		      ]
		    };
			allEvents.push(event)
		}
	}
	return allEvents;

}


function parseDay(dbEntry, day) {
	let daytime = "";
	let res = [];
	switch(day) {
		case "monday":
			daytime = "2019-04-29T";
			break;
		case "tuesday":
			daytime = "2019-04-30T";
			break;
		case "wednesday":
			daytime = "2019-05-01T";
			break;
		case "thursday":
			daytime = "2019-05-02T";
			break;
		case "friday":
			daytime = "2019-05-03T";
			break;
		case "saturday":
			daytime = "2019-05-04T";
			break;
		case "sunday":
			daytime = "2019-05-05";
			break;
	}

	res[0] = daytime;
	res[1] = daytime;

	if (dbEntry[day] != "") {
		let times = dbEntry[day].split("-");
		res[0] += ":" + times[0];
		if (parseInt(times[0].split(":")[0]) > parseInt(times[1].split(":")[0])) {
			res[1] += "-23:59";
		} else {
			res[1] += "-" + times[1];
		}
	}
	return res;
}
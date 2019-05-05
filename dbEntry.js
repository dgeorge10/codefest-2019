// var temp = JSON.parse('{"id":2,"name":"Face to Face Germantown","address":"109 E. Price St","city":"Philadelphia","state":"PA","zip":19114,"snap":"","fmnp":"","bucks":"","monday":"12:30-13:45","tuesday":"","wednesday":"","thursday":"","friday":"12:30-13:45","saturday":"12:30-13:45","sunday":"12:30-13:45","createdAt":null,"updatedAt":null}');
// console.log(temp);
// console.log(parseDbEvent(temp));


function parseDbEvent(dbEntry) {

	let allEvents = [];

	let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
	let calCategory = "";

	for (day in days) {
		if (days[day] in dbEntry) {
			console.log("day");
			let res = parseDay(dbEntry, days[day]);
			var event = {
		      'summary': getType(dbEntry),
		      'location': dbEntry.address + " " + dbEntry.city + " " + dbEntry.state + " " + dbEntry.zip,
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

function getType(dbEntry) {
	if ("gender" in dbEntry) {
		if (dbEntry["gender"].toLowerCase().includes("family")) {
			return "family";
		} else if (dbEntry["gender"].toLowerCase().includes("women")) {
			return "women";
		} else if (dbEntry["gender"].toLowerCase().includes("men")) {
			return "men";
		} else {
			return "shelter";
		}
	} else {
		if (dbEntry["snap"].toLowerCase() == "yes") {
			return "snap";
		} else if (dbEntry["fmnp"].toLowerCase() == "yes") {
			return "fmnp";
		} else if (dbEntry["bucks"].toLowerCase() == "yes") {
			return "bucks";
		} else {
			return "food";
		}
	}
}
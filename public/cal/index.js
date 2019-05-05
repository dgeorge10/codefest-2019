const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  var eventsList = [];
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        eventsList.push(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
  return eventsList;
}

function addEv(event) {

      calendar.events.insert({
        auth: auth,
        calendarId: event.summary,
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event created: %s', event.htmlLink);
      });
}

  exports.addEvent = function(events) {

    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      var eventsList = authorize(JSON.parse(content), listEvents);

      events.forEach(event => {
      if (!eventsList.includes(event.start.dateTime + ' - ' + event.summary)) {
        authorize(JSON.parse(content), addEv(event));
      } 
    });
    });
}

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


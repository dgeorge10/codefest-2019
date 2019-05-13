


function parseJSON(text) {
    let food = [];
    food = JSON.parse(text);
    let allEvents = [];
    for (obj in food[0]) {
        if (obj != null) {
            allEvents.push.apply(allEvents, parseObjToEvent(food[0][obj]));
        }
    }
    for (obj in food[1]) {
        if (obj != null) {
            allEvents.push.apply(allEvents, parseObjToEvent(food[1][obj]));
        }
    }
    return allEvents;
}


function parseObjToEvent(obj) {
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let events = [];
    for (day in days) {
        if (days[day] in obj) {
            if (obj[days[day]] != "" && obj[days[day]].includes("-")) {
                let times = obj[days[day]].split("-");
                let dow = [];
                dow.push(parseInt(day));
                let addy = obj["address"] + ", " + obj["city"] + ", " + obj["state"] + " " + obj["zip"];
                let cat = getCategory(obj);
                let newEvent = createEvent(obj["name"], times[0], times[1], dow, addy, cat);
                events.push(newEvent);
            }
        }
    }
    return events;
}

function getCategory(obj) {
    if ("gender" in obj) {
        if (obj["gender"].toLowerCase().includes("family")) {
            return 3;
        } else if (obj["gender"].toLowerCase().includes("women")) {
            return 2;
        } else if (obj["gender"].toLowerCase().includes("men")) {
            return 1;
        } else {
            return 4;
        }
    } else {
        if (obj["snap"].toLowerCase() == "yes") {
            return -1;
        } else if (obj["fmnp"].toLowerCase() == "yes") {
            return -2;
        } else if (obj["bucks"].toLowerCase() == "yes") {
            return -3;
        } else {
            return -4;
        }
    }	
}


function createEvent(title, start, end, daysOfWeek, content, cat) {
    var event = {
        title: title,
        start: start,
        end: end,
        dow: daysOfWeek,
        description: content,
        category: cat,
        allDay: false
    };
    return event
}



module.exports = {
    parseJSON
}
$(document).ready(function() {
    $('select').change( function() {
        if ($('option:selected').val() == "male") {
            $('#cal').html('<iframe src="https://calendar.google.com/calendar/b/2/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=bmFnaTd1czk4MG5ncW83MzV2ajM3MmJxcm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23009688&amp;showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=1&amp;showTabs=1&amp;showCalendars=0&amp;showTz=0" style="border-width:0" width="600" height="400" frameborder="0" scrolling="no"></iframe>');
        } else if ($('option:selected').val() == "female") {
            $('#cal').html('<iframe src="https://calendar.google.com/calendar/b/2/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=1&amp;showTabs=1&amp;showCalendars=0&amp;showTz=0&amp;src=dmpiZnRmbm03ajNnbWEwc2hsYnRudHIwMHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23F4511E" style="border-width:0" width="600" height="400" frameborder="0" scrolling="no"></iframe>');
        } else if ($('option:selected').val() == "family") {
            $('#cal').html('<iframe src="https://calendar.google.com/calendar/b/2/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=1&amp;showTabs=1&amp;showCalendars=0&amp;showTz=0&amp;src=aXFqb2cydmhqcjB0ajZsbXRhZzgxNWFoNzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%234285F4" style="border:solid 1px #777" width="600" height="400" frameborder="0" scrolling="no"></iframe>');
        } else if ($('option:selected').val() == "food") {
            $('#cal').html('<iframe src="https://calendar.google.com/calendar/b/2/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=1&amp;showTabs=1&amp;showCalendars=0&amp;showTz=0&amp;src=a2VsZzZidmZ0cTBvYm9ydnNvazA1Njk1b2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%237CB342" style="border:solid 1px #777" width="600" height="400" frameborder="0" scrolling="no"></iframe>');
        } else {
            $('#cal').html('<iframe src="https://calendar.google.com/calendar/b/2/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=1&amp;showTabs=1&amp;showCalendars=0&amp;showTz=0" style="border:solid 1px #777" width="600" height="400" frameborder="0" scrolling="no"></iframe>');
        }
    });
});
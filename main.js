$(document).ready(function() {
    // an interval sets up a function to run 10 times a second
    // so it's constantly checking the time of the movie and
    // using that time to decide which subtitle to display.
    setInterval(printTime, 100);
});

// Access the current timestamp of the movie
// and display it on the page.
function printTime() {
    var movie = $("video")[0];
    var time = movie.currentTime;
    $("#time").text(time);
    // pass the current time to the displaySubtitle function
    displaySubtitle(time);
}

// This function should accept time as a paramter
// and update the DOM to make the proper subtitle appear over the movie.
function displaySubtitle(time) {
    lineToDisplay = findSubtitle(time);
    $('#line1').text(lineToDisplay.line1);
    $('#line2').text(lineToDisplay.line2);
}

// This function should take time as a parameter and
// search through a list of subtitles to find and return the
// one subtitle that should be displayed.
// If no subtitle should be shown, then this function
// should return a dummy subtitle object that looks like:
// {line1: "", line2: ""} with two empty strings
// so the function looks like it's returning an
// empty subtitle (and not null) and it won't crash our
// program.
function findSubtitle(time) {
    for (i = 0; i < SUBTITLES.length; i++) {
        if (isTimeInDuration(time, SUBTITLES[i])) {
            return SUBTITLES[i];
        } else {
            blankLines = {
                line1: "",
                line2: ""
            };
        }
    }
    return blankLines;
}

// This function should accept a current time, and one subtitle
// object and return true or false depending on if the subtitle
// should appear on the screen at the given time.
function isTimeInDuration(time, subtitleObject) {
    durationList = subtitleObject.duration.split(' ');
    startDuration = timestampToSeconds(durationList[0]);
    endDuration = timestampToSeconds(durationList[2]);
    if (time > startDuration && time < endDuration) {
        return true;
    } else {
        return false;
    }
}

// This function should accept a timestamp string and turn it into
// a number that can be used elsewhere. For instance,
// timestampToSeconds("00:00:05,580") should return 5.580
function timestampToSeconds(timestamp) {
    timeChunks = timestamp.split(',');
    milliseconds = parseInt(timeChunks[1], 10);
    hms = timeChunks[0].split(':');
    hours = parseInt(hms[0], 10);
    minutes = parseInt(hms[1], 10);
    seconds = parseInt(hms[2], 10);
    totalseconds = (hours * 3600) + (minutes * 60) + seconds + (milliseconds / 1000);
    return totalseconds;
}

// This is a test to see if the findSubtitle function returns the correct
// subtitle for the movie at 82 seconds into the film. The correct subtitle
// is
// { duration: "00:01:21,540 --> 00:01:25,180",
//   line1: "Can I ask your name?", line2: "-Margarethe Lorenz." }
console.log(findSubtitle(82));

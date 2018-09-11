class Timer {
    
    // the constructor gets the start time as a reference
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.start = Date.now();
    }


    getSeconds() {
        return this.seconds;
    }

    getMinutes() {
        return this.minutes;
    }

    getHours() {
        return this.hours;
    }

    // a function that refreshes the timer approx every second
    // and rounds the time units to closest integer
    nextSecond() {
            let interval = Date.now() - this.start;
            let tempSeconds = interval / 1000;
            let tempMinutes = 0;
            let tempHours = 0;
            if (tempSeconds > 60) {
                if (tempMinutes == 59) {
                    tempHours++;
                    tempMinutes = 0;
                } else {
                    tempMinutes++;
                }
                tempSeconds = 0;
            }

            //the time units are rounded to the closest integer
            tempSeconds = Math.round(tempSeconds);
            tempMinutes = Math.round(tempMinutes);
            tempHours = Math.round(tempHours);
            
            this.seconds = tempSeconds;
            this.minutes = tempMinutes;
            this.hours = tempHours;

            console.log("h: " + tempHours + " m: " + tempMinutes + " s: " + tempSeconds);
    }
}


// A pomodoro class that uses the timer class to count down the time
class Pomodoro {

    // constructor gets the wanted length as an input and creates a new timer
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.timer = new Timer(hours, minutes, seconds);
    }

    // the function calculates the time left in the cycle
    timeLeft() {
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                if(this.hours == 0) {
                    return false;
                } else {
                    this.minutes = 59;
                }
            } else {
                this.minutes--;
            }
            this.seconds  = 59;
        } else {
            this.seconds--;
        }

        console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
    }

    // the function refreshes the timer
    refresh() {
        setInterval(() => {
            let timeLeftString;
            if(this.timeLeft() != false) {
                this.timer.nextSecond();
                timeLeftString = `${this.hours}:${this.minutes}:${this.seconds}`;

            } else {
                clearInterval();
                timeLeftString = "Time's up!";
            }
            updatePage(timeLeftString);
        }, 1000)
    }
}

let pomodoro = new Pomodoro(0, 0, 10);
pomodoro.refresh();

const updatePage = (timeLeftString) => {
    document.getElementById("clock").innerHTML = timeLeftString;
}
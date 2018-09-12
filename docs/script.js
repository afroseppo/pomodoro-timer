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
        this.state = true;
        this.reset = false;
        this.cycleHours = hours;
        this.cycleMinutes = minutes;
        this.cycleSeconds = seconds;
    }

    changeCycle() {
        this.hours = this.cycleHours;
        this.minutes = this.cycleMinutes;
        this.seconds = this.cycleSeconds;
    }

    getState() {
        return this.state;
    }

    getReset() {
        return this.reset;
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

    updateClock() {
        let hourString;
        let minuteString;
        let secondString;

        if(this.hours < 10) {
            hourString = "0" + this.hours;
        } else {
            hourString = this.hours;
        }

        if(this.minutes < 10 ) {
            minuteString = "0" + this.minutes;
        } else {
            minuteString = this.minutes;
        }

        if(this.seconds < 10) {
            secondString = "0" + this.seconds;
        } else {
            secondString = this.seconds;
        }
        let timeLeftString = `${hourString}:${minuteString}:${secondString}`;

        return timeLeftString;
    }

    // the function refreshes the timer
    refresh() {
        let refreshInterval = setInterval(() => {
            if(this.state == true) {
                let timeLeftString;
                if(this.timeLeft() != false) {
                    this.timer.nextSecond();
                    timeLeftString = this.updateClock();
                } else {
                    clearInterval();
                    timeLeftString = "Time's up!";
                    this.changeCycle();
                }
                updatePage(timeLeftString);
            } else {
                let timeLeftString = this.updateClock();
                updatePage(timeLeftString);
            }

            if(this.reset) {
                clearInterval(refreshInterval);
            }

        }, 1000)
    }

    pauseTimer() {
        if(this.state) {
            this.state = false;
        } else {
            this.state = true;
        }
        console.log("pause");
    }

    setReset() {
        console.log("123");
        this.reset = true;
    }
}

const form = document.getElementsByTagName("form");
let pomodoro;
let cycles = 0;

// what to do when the submit button is clicked
const buttonClick = () => {

    let hours = (document.forms[0].elements[0].value.trim == "") ? 0 : document.forms[0].elements[0].value;
    minutes = (document.forms[0].elements[1].value.trim == "") ? 0 : document.forms[0].elements[1].value;
    seconds = (document.forms[0].elements[2].value.trim == "") ? 0 : document.forms[0].elements[2].value;
    console.log("asdf");

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
        alert("Incorrect input, please check the inputted time!")
    } else {
        pomodoro = new Pomodoro(hours, minutes, seconds);
        pomodoro.refresh();
        //pomodoroCycles(hours, minutes, seconds);
    }
}

const updatePage = (timeLeftString) => {
    document.getElementById("clock").innerHTML = timeLeftString;
}

const buttonClickStop = () => {
    if(pomodoro != null || pomodoro != undefined) {
        pomodoro.pauseTimer();
    }
}

const resetPomodoro = () => {
    if (pomodoro != undefined || pomodoro != null) {
        pomodoro.setReset();
    }
    pomodoro = undefined;
    updatePage("Nothing yet");
}

const nextCycle = () => {
    if(cycles != 0 && cycles % 4 == 0) {
        document.getElementById("cycleCounter").innerHTML = "Time to take a longer break!"
        return true;
    } else {
        document.getElementById("cycleCounter").innerHTML = "Cycles: " + cycles;
        cycles++;
        return false;
    }
}
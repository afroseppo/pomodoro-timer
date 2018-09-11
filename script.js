class Timer {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.start = Date.now();
    }

    refresh() {
        setInterval((hours, minutes, seconds) => {
            let interval = Date.now() - this.start;
            let tempSeconds = interval / 1000;
            let tempMinutes = 0;
            let tempHours = 0;
            if (tempSeconds == 60) {
                if (tempMinutes == 59) {
                    tempHours++;
                    tempMinutes = 0;
                } else {
                    tempMinutes++;
                }
                tempSeconds = 0;
            }

            tempSeconds = Math.round(tempSeconds);
            tempMinutes = Math.round(tempMinutes);
            tempHours = Math.round(tempHours);

            console.log("h: " + tempHours + " m: " + tempMinutes + " s: " + tempSeconds);
        }, 1000);
    }
}

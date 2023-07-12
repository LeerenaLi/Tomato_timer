class Timer {
    constructor(timerId = '', timerName = '', count = 0) {
        this.timerId = timerId;
        this.timerName = timerName;
        this.count = count;
    }

    increaseCount() {
        return this.count += 1;
    }

    setName(newName) {
        this.timerName = newName;
        return this;
    }
}

export const timerOne = new Timer('1', 'timerOne', 0);

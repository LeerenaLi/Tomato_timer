export class Task {
    constructor(taskId, taskName = '', count = 0) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.count = count;
    }

    increaseCount() {
        return this.count += 1;
    }

    setName(newName) {
        this.taskName = newName;
        return this;
    }
}

// export const taskOne = new Task(1, 'timerOne', 0);

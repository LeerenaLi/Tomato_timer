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

    getTaskName() {
        return this.taskName;
    }

    getTaskId() {
        return this.taskId();
    }

    getCount() {
        return this.count;
    }

    getImportance() {
        throw new Error('Not implemented');
    }
}

export class ImportantTask extends Task {
    constructor(taskId, taskName, count, importance = 'important') {
        super(taskId, taskName, count);
        this.importance = importance;
    }

    getImportance() {
        return this.importance;
    }
}

export class StandartTask extends Task {
    constructor(taskId, taskName, count, importance = 'so-so') {
        super(taskId, taskName, count);
        this.importance = importance;
    }

    getImportance() {
        return this.importance;
    }
}

export class NoImportantTask extends Task {
    constructor(taskId, taskName, count, importance = 'default') {
        super(taskId, taskName, count);
        this.importance = importance;
    }

    getImportance() {
        return this.importance;
    }
}



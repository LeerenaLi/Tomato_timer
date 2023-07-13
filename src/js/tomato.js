import {Task} from './task';

export class Tomato {
    constructor(taskTime = 25, pauseTime = 5, bigPauseTime = 25, tasks = []) {
        this.taskTime = taskTime;
        this.pauseTime = pauseTime;
        this.bigPauseTime = bigPauseTime;
        this.tasks = tasks;
        this.activeTask = null;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    activateTask(id) {
        this.tasks.map(item => {
            if (item.taskId = id) {
                this.activeTask = item;
            }
        });
    }

    startTask() {
        const timeSeconds = this.taskTime * 60;
        const pauseSeconds = this.pauseTime * 1000 * 60;
        const bigPauseSeconds = this.bigPauseTime * 1000 * 60;
        let time = 0;
        const activeTask = this.activeTask;
        const id = activeTask.taskId;
        activeTask.increaseCount();
        if (activeTask !== null) {
            let timerId = setInterval(function run() {
                if (time >= timeSeconds) {
                    clearInterval(timerId);
                    activeTask.increaseCount();
                    time = 0;
                    if (activeTask.count % 3 === 0) {
                        setTimeout(() => {
                            timerId = setInterval(run, 1000);
                        }, bigPauseSeconds);
                    } else {
                        setTimeout(() => {
                            timerId = setInterval(run, 1000);
                        }, pauseSeconds);
                    }
                }
                time += 1;
            }, 1000);
        } else {
            console.log('Error');
            return;
        }
    }

    increaseTaskCount(id) {
        if (this.activateTask.taskId === id) {
            this.activateTask.increaseCount();
        }
        // this.tasks.map(item => {
        //     if (item.taskId = id) {
        //         item.increaseCount();
        //     }
        // });
    }
}

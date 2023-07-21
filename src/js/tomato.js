import {Task} from './task';

import { tomato } from '..';
import { ConrollerTomato } from './conrollerTomato';
import {RenderTomato} from './renderTomato';
import { ImportantTask, NoImportantTask, StandartTask } from './task';

export class Tomato {
    constructor(tasks = []) {
        if (Tomato._instance) {
            return Tomato._instance;
        }
        this.taskTime = 25;
        this.pauseTime = 5;
        this.bigPauseTime = 5;
        this.tasks = tasks;
        this.activeTask = null;

        Tomato._instance = this;
    }

    renderPage() {
        const {btnStart, btnStop, btnImportance, btnSubmit, form, tasksList, panelTitle, panelTask, timerText,
            modalOverlay,
            modalCloseBtn,
            modal,
            deleteBtn,
            cancelBtn,} = RenderTomato.initElements();
        ConrollerTomato.addFormControl(form, tomato);
        ConrollerTomato.btnImportanceControl(btnImportance);
        ConrollerTomato.taskActiveControl(tasksList, tomato, panelTitle, panelTask);
        ConrollerTomato.modalControl(modalOverlay, modalCloseBtn, cancelBtn);
        ConrollerTomato.startTaskControl(btnStart, tomato);
        ConrollerTomato.stopTaskControl(btnStop, tomato);
    }

    addTask(task) {
        const imp = document.querySelector('.button-importance').value;
        const importance = imp;
        const Command = importance === 'important' ?
            ImportantTask : importance === 'so-so' ?
            StandartTask : importance === 'default' ?
            NoImportantTask : NoImportantTask;

        const id = this.tasks.length + 1;
        const name = document.querySelector('.input-primary').value;

        const command = new Command(id, name, 0, imp);
        if (command) {
            this.tasks.push(command);
        }

        const {taskList, li, btnTaskText, btnTaskPopup, popupMenu, btnPopupEdit, btnPopupDelete} = RenderTomato.renderTask(id, name, 0, imp);
        ConrollerTomato.taskRedact(taskList, tomato, li, btnTaskPopup, popupMenu, btnPopupDelete);
    }

    deleteTask(id) {
        this.tasks.map(item => {
            if (item.taskId === id) {
                this.tasks.splice(item, 1);
            }
        });
    }

    activateTask(id) {
        this.tasks.map(item => {
            if (item.taskId === id) {
                this.activeTask = item;
                console.log('this.activeTask: ', this.activeTask);
            }
        });
    }

    startTask() {
        const timeSeconds = this.taskTime * 60;
        const pauseSeconds = this.pauseTime * 1000 * 60;
        const bigPauseSeconds = this.bigPauseTime * 1000 * 60;
        let time = 0;
        const activeTask = this.activeTask;
        console.log('activeTask: ', activeTask);
        activeTask.increaseCount();
        if (activeTask !== null) {
            let timerId = setInterval(function run() {
                console.log('time: ', time);
                if (time >= timeSeconds) {
                    clearInterval(timerId);
                    activeTask.increaseCount();
                    time = 0;
                    if (activeTask.count % 3 === 0) {
                        setTimeout(() => {
                            timerId = setInterval(run, 1000);
                            alert(`Перерыв, отдыхайте 25 минут`);
                        }, bigPauseSeconds);
                    } else {
                        setTimeout(() => {
                            timerId = setInterval(run, 1000);
                            alert(`Перерыв, отдыхайте 5 минут`);
                        }, pauseSeconds);
                    }
                }
                time += 1;
            }, 1000);
            this.timerId = timerId;
        } else {
            console.log('Error');
            alert('Выберите задачу');
            return;
        }
    }

    stopTask() {
        clearInterval(this.timerId);
        console.log('this.timerId: ', this.timerId);
    }

    increaseTaskCount(id) {
        if (this.activateTask.taskId === id) {
            this.activateTask.increaseCount();
        }
    }
}



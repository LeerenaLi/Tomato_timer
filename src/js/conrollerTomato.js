import { tomato } from '../index.js';
import { Tomato } from "./tomato";


export class ConrollerTomato {
    static btnImportanceControl(btnImportance) {
        let count = 0;
        const imp = ['default', 'important', 'so-so'];

        btnImportance.addEventListener('click', ({target}) => {
            count += 1;
            if (count >= imp.length) {
                count = 0;
            }

            for (let i = 0; i < imp.length; i++) {
                if (count === i) {
                    target.classList.add(imp[i]);
                    target.value = imp[i];
                } else {
                    target.classList.remove(imp[i]);
                }
            }
        });
    }

    static taskActiveControl(tasksList, tomato, panelTitle, panelTask) {
        tasksList.addEventListener('click', ({target}) => {
            if (target.closest('.pomodoro-tasks__task-text')) {
                this.clearActiveTasksControl();

                target.classList.toggle('pomodoro-tasks__task-text_active');
                const id = +target.dataset.id;
                const title = target.textContent;
                panelTitle.textContent = title;
                panelTask.textContent = `Томат ${id}`;
                tomato.activateTask(id);
                console.log('tomato: ', tomato);
            }
        });
    }

    static clearActiveTasksControl() {
        const taskButtons = document.querySelectorAll('.pomodoro-tasks__task-text');
        taskButtons.forEach(item => {
            item.classList.remove('pomodoro-tasks__task-text_active');
        });
    }

    static addFormControl(form, tomato) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            tomato.addTask();
            form.reset();
        });
    }

    static modalControl(modalOverlay, modalCloseBtn, cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });

        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
    }

    static taskRedact(taskList, tomato, btnTaskPopup) {
        const modalOverlay = document.querySelector('.modal-overlay');

        btnTaskPopup.addEventListener('click', ({target}) => {
            const popups = document.querySelectorAll('.burger-popup');
            const buttonsPopupDelete = document.querySelectorAll('.burger-popup__delete-button');

            if (target.closest('.pomodoro-tasks__list-task')) {
                const row = target.closest('.pomodoro-tasks__list-task');
                const rowId = +row.dataset.task;

                let popupMenu;
                popups.forEach(item => {
                    if (+item.dataset.popup === rowId) {
                        item.classList.toggle('burger-popup_active');
                        console.log(item);
                        popupMenu = item;
                        if (popupMenu.classList.contains('burger-popup_active')) {
                            buttonsPopupDelete.forEach(item => {
                                if (+item.dataset.del === rowId) {
                                    item.addEventListener('click', ({target}) => {
                                        modalOverlay.style.display = 'block';
                                    });
                                }
                            });
                        }
                    }
                });

                if (modalOverlay.style.display === 'block') {
                    const deleteBtn = document.querySelector('.modal-delete__delete-button');
                    deleteBtn.addEventListener('click', () => {
                        tomato.deleteTask(rowId);
                        row.remove();
                    });
                }
            }
        });
    }

    static startTaskControl(btnStart, tomato) {
        btnStart.addEventListener('click', () => {
            tomato.startTask();
        });
    }

    static stopTaskControl(btnStop, tomato) {
        btnStop.addEventListener('click', () => {
            tomato.stopTask();
        });
    }
}

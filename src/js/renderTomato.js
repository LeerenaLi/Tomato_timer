import {el, mount} from 'redom';


export class RenderTomato {
    static initElements() {
        const header = el('header',
            el('section', {className: 'header'},
                el('div', {className: 'container header__container'},
                    el('div', {className: 'header__logo'}),
                    el('h1', {className: 'header__title'}, 'Tomato timer'),
                )),
        );

        const btnStart = el('button', {className: 'button button-primary', id: 'btnStart'}, 'Старт');
        const btnStop = el('button', {className: 'button button-secondary', id: 'btnStop'}, 'Стоп');
        const btnImportance = el('button', {className: 'button button-importance default', type: 'button', ariaLabel: 'Указать важность', value: 'default', id: 'btnImportance'});
        const btnSubmit = el('button', {className: 'button button-primary task-form__add-button', type: 'submit'}, 'Добавить');
        const form = el('form', {className: 'task-form', action: 'submit'},
            el('input', {className: 'task-name input-primary', type: 'text', name: 'task-name', id: 'task-name', placeholder: 'название задачи', required: 'required'}),
            btnImportance, btnSubmit);
        const tasksList = el('ul', {className: 'pomodoro-tasks__quest-tasks'});

        const panelTitle = el('p', {className: 'window__panel-title'}, '');
        const panelTask = el('p', {className: 'window__panel-task-text'}, '');
        const timerText = el('p', {className: 'window__timer-text'}, '25:00');

        const main = el('main',
            el('section', {className: 'main'},
                el('div', {className: 'container main__container'},
                    el('div', {className: 'pomodoro-form window'},
                        el('div', {className: 'window__panel'},
                            panelTitle, panelTask),
                        el('div', {className: 'window__body'},
                            timerText,
                            el('div', {className: 'window__buttons'},
                                btnStart, btnStop)),
                        form,
                    ),
                    el('div', {className: 'pomodoro-tasks'},
                        el('p', {className: 'pomodoro-tasks__header-title'}, 'Инструкция:'),
                        el('ul', {className: 'pomodoro-tasks__quest-list'},
                            el('li', {className: 'pomodoro-tasks__list-item'}, 'Напишите название задачи чтобы её добавить'),
                            el('li', {className: 'pomodoro-tasks__list-item'}, 'Чтобы задачу активировать, выберите её из списка'),
                            el('li', {className: 'pomodoro-tasks__list-item'}, 'Запустите таймер'),
                            el('li', {className: 'pomodoro-tasks__list-item'}, 'Работайте пока таймер не прозвонит'),
                            el('li', {className: 'pomodoro-tasks__list-item'}, 'Сделайте короткий перерыв (5 минут)'),
                            el('li', {className: 'pomodoro-tasks__list-item'}, 'Продолжайте работать, пока задача не будет выполнена.'),
                            el('li', {className: 'pomodoro-tasks__list-item'}, 'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).'),
                        ),
                        tasksList,
                        el('p', {className: 'pomodoro-tasks__deadline-timer'}, '1 час 30 мин'),
                    ),
                ),
            ),
        );

        const modalOverlay = el('div', {className: 'modal-overlay'});

        const modalCloseBtn = el('button', {className: 'modal-delete__close-button'});
        const deleteBtn = el('button', {className: 'modal-delete__delete-button button-primary'}, 'Удалить'); 
        const cancelBtn = el('button', {className: 'modal-delete__cancel-button'}, 'Отмена');
        const modal = el('div', {className: 'modal-delete'},
            el('p', {className: 'modal-delete__title'}, 'Удалить задачу?'),
            modalCloseBtn, deleteBtn, cancelBtn);

        modalOverlay.append(modal);


        mount(document.body, header);
        mount(document.body, main);
        mount(document.body, modalOverlay);

        return {btnStart,
            btnStop,
            btnImportance,
            btnSubmit,
            form,
            tasksList,
            panelTitle,
            panelTask,
            timerText,
            modalOverlay,
            modalCloseBtn,
            modal,
            deleteBtn,
            cancelBtn,
        };
    }

    static renderTask(taskId, taskName, count, importance) {
        const taskList = document.querySelector('.pomodoro-tasks__quest-tasks');

        const btnTaskText = el('button', {className: 'pomodoro-tasks__task-text'}, `${taskName}`);
        btnTaskText.dataset.id = `${taskId}`;

        const btnTaskPopup = el('button', {className: 'pomodoro-tasks__task-button'});

        const popupMenu = el('div', {className: 'burger-popup'});
        popupMenu.dataset.popup = `${taskId}`;
        const btnPopupEdit = el('button', {className: 'popup-button burger-popup__edit-button'}, 'Редактировать');
        const btnPopupDelete = el('button', {className: 'popup-button burger-popup__delete-button'}, 'Удалить');
        btnPopupDelete.dataset.del = `${taskId}`;

        popupMenu.append(btnPopupEdit, btnPopupDelete);

        const li = el('li', {className: `pomodoro-tasks__list-task ${importance}`},
            el('span', {className: 'count-number'}, `${taskId}`),
            btnTaskText, btnTaskPopup, popupMenu);
        li.dataset.task = `${taskId}`;

        taskList.append(li);

        return {taskList, li, btnTaskText, btnTaskPopup, popupMenu, btnPopupEdit, btnPopupDelete};
    }
}


import './scss/index.scss';
import {Task} from './js/task';

// убрать при build!! только для разработки
import './index.html';
import {Tomato} from './js/tomato';


let count = 0;
const imp = ['default', 'important', 'so-so'];

document.querySelector('.button-importance').addEventListener('click', ({target}) => {
    count += 1;
    if (count >= imp.length) {
        count = 0;
    }

    for (let i = 0; i < imp.length; i++) {
        if (count === i) {
            target.classList.add(imp[i]);
        } else {
            target.classList.remove(imp[i]);
        }
    }
});


const taskOne = new Task(1, 'timerOne', 0);
taskOne.setName('task-1');

const tomato = new Tomato();

tomato.addTask(taskOne);
tomato.activateTask(taskOne.taskId);

tomato.startTask();
console.log('tomato: ', tomato);

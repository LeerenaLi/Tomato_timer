import './scss/index.scss';
// убрать при build!! только для разработки
import './index.html';

import {Task} from './js/task';
import {Tomato} from './js/tomato';

export const tomato = new Tomato();
tomato.renderPage();


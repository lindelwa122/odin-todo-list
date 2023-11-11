import 'normalize.css';
import './style/style.css';
import displayController from './modules/displayController';
import { domManager } from 'dom-wizard';
import root from './routes/root';

domManager.create(root);
displayController.startApp();

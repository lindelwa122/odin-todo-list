import todo from './modules/todo';
import 'normalize.css';
import './style/style.css';

const task = todo(
  'The Todo List Project',
  'A project about creating todo',
  new Date('11/9/2023'),
  2,
  ['project', 'theodinproject'],
);

console.log('task completed', task.taskCompleted());

task.toggleCompleted();

console.log('task completed', task.taskCompleted());

console.log('creation data', task.getTodoCreationDate());
console.log('due dat', task.getDueDate());
console.log('id', task.getID());

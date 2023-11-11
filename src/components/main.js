import plusLg from 'bootstrap-icons/icons/plus-lg.svg';
import todoForm from './todoForm';

const main = () => {
  const heading = { tagName: 'h1', options: { className: 'heading' } };
  const tasks = { options: { className: 'tasks' } };
  const newTasks = {
    options: {
      className: 'new-task',
      onclick: todoForm.show,
    },
    children: [
      {
        tagName: 'img',
        options: { src: plusLg, alt: 'Icon' },
      },
      {
        tagName: 'span',
        options: { textContent: 'Add task' },
      },
    ],
  };

  return {
    tagName: 'main',
    children: [heading, tasks, newTasks],
  };
};

export default main();

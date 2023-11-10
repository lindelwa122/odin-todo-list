import plusLg from 'bootstrap-icons/icons/plus-lg.svg';

const main = () => {
  const heading = { tagName: 'h1', options: { className: 'heading' } };
  const tasks = { options: { className: 'tasks' } };
  const newTasks = {
    options: { className: 'new-task' },
    children: [
      {
        tagName: 'img',
        options: { src: plusLg, alt: 'Icon' }
      },
      {
        tagName: 'span',
        options: { textContent: 'Add task' }
      }
    ]
  };

  return {
    tagName: 'main', 
    children: [heading, tasks, newTasks]
  };
}

export default main();

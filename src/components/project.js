import boxes from 'bootstrap-icons/icons/boxes.svg';
import userInterfaceAPI from '../modules/userInterfaceAPI';
import { store } from 'dom-wizard';
import displayController from '../modules/displayController';

const project = (projectInstance) => {
  const icon = {
    tagName: 'img',
    options: { src: boxes, alt: 'icon' },
  }

  const text = {
    tagName: 'span',
    text: projectInstance.getTitle(),
  };

  return {
    before: (el) => {
      el.dataset.id = projectInstance.getID();
    },
    options: {
      className: 'project-item',
      title: projectInstance.getDescr(),
      onclick: (e) => {
        store.updateState('currentProject', projectInstance);
        const todos = userInterfaceAPI.getTodos(projectInstance.getID());
        
        displayController.displayTodos(todos, projectInstance.getTitle());
        document.querySelectorAll('.group > div:not(.heading)').forEach(el => {
          el.classList.remove('active');
        });
        e.target.closest('.project-item').classList.add('active');
      }
    },
    children: [icon, text],
  };
}

export default project;

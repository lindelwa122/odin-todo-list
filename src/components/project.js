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
      onclick: () => {
        store.updateState('currentProject', projectInstance);
        const todos = userInterfaceAPI.getTodos(projectInstance.getID());
        displayController.displayTodos(todos, projectInstance.getTitle());
      }
    },
    children: [icon, text],
  };
}

export default project;

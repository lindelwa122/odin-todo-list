import userInterfaceAPI from './userInterfaceAPI';
import projectElement from '../components/project';
import todoElement from '../components/todo';
import { domManager, store } from 'dom-wizard';

const displayController = () => {
  const displayTodos = (todos, projectName) => {
    domManager.update({
      selector: 'main > .heading',
      action: 'update',
      textContent: projectName,
    });

    // Clear tasks
    domManager.update({
      selector: 'main > .tasks',
      action: 'update',
      innerHTML: '',
    });

    todos.forEach((instance) => {
      domManager.create(todoElement(instance), 'main > .tasks', true);
    });
  };

  const displayProjects = () => {
    const projects = userInterfaceAPI.getAllProjects();

    // Clear list
    const children = [];
    domManager.read('#project-list', 'childNodes').forEach((el) => {
      children.push(el);
    });

    children.forEach((child) => {
      if (child.classList.contains('project-item')) {
        child.remove();
      }
    });

    projects.forEach((instance) => {
      domManager.create(projectElement(instance), '#project-list', true);
    });
  };

  const _createDefaultProject = () => {
    const projects = userInterfaceAPI.getAllProjects();

    let defaultProjectID;
    if (projects.length === 0) {
      defaultProjectID = userInterfaceAPI.createProject(
        'Personal',
        'Where your personal goals belong',
      );
    } else {
      defaultProjectID = userInterfaceAPI.getDefaultProjectID();
    }

    displayProjects();

    domManager.update({
      selector: '.project-item',
      action: 'toggle',
      className: 'active',
    });

    const todos = userInterfaceAPI.getTodos(defaultProjectID);
    displayTodos(todos, 'Personal');

    projects.forEach((project) => {
      if (project.getID() === defaultProjectID) {
        store.updateState('currentProject', project);
      }
    });
  };

  const startApp = () => _createDefaultProject();

  return { displayTodos, displayProjects, startApp };
};

export default displayController();

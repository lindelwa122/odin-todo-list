import userInterfaceAPI from './userInterfaceAPI';
import projectElement from '../components/project';
import todoElement from '../components/todo';

const displayController = () => {
  const _openTodoForm = () => {
    document.querySelector('.new-task').addEventListener('click', () => {
      document.querySelector('#todo-form-dialog').showModal();
    });
  };

  const _openProjectForm = () => {
    document.querySelectorAll('.open-project-form').forEach((x) => {
      x.addEventListener('click', () => {
        document.querySelector('#project-form-dialog').showModal();
      });
    });
  };

  /**
   *  
   * @param {string} selector 
   */
  const _removeNodes = (selector) => {
    const nodes = document.querySelectorAll(selector);

    for (const node of nodes) {
      node.remove();
    }
  };

  const _renderTodos = (projectID, projectName) => {
    const todos = userInterfaceAPI.getTodos(projectID);

    const main = document.querySelector('main');
    const addTask = document.querySelector('.new-task');

    const heading = main.querySelector('.heading > h1');
    heading.textContent = projectName;

    todos.forEach((todo) => {
      const todoEle = todoElement(todo);
      main.insertBefore(addTask, todoEle);
    });
  }

  const _renderProjects = () => {
    const projects = userInterfaceAPI.getAllProjects();

    const container = document.querySelector('#project-list');
    _removeNodes('.project-item');
    projects.forEach((project) => {
      const projectEle = projectElement(project);
      projectEle.addEventListener('click', () => {
        _renderTodos(project.getID(), project.getTitle());
      })
      container.append(projectEle);
    });
  };

  const _renderPageContents = () => {
    _renderProjects();
  };

  const _closeModal = () => {
    const clicked = document.querySelectorAll('.close-modal');
    clicked.forEach((x) => {
      x.addEventListener('click', () => {
        const dialog = x.closest('dialog');
        dialog.close();
      });
    });
  };

  const _submitProjectForm = () => {
    const form = document.querySelector('#project-form');
    form.addEventListener('submit', () => {
      const title = form.querySelector('input');
      const description = form.querySelector('textarea');
      userInterfaceAPI.createProject(title.value, description.value);

      // clear form
      title.value = '';
      description.value = '';

      _renderPageContents();
    });
  };

  const startApp = () => {
    _openProjectForm();
    _openTodoForm();
    _closeModal();
    _submitProjectForm();
  };

  return { startApp };
};

export default displayController().startApp;

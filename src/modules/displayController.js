import userInterfaceAPI from './userInterfaceAPI';
import projectElement from '../components/project';
import todoElement from '../components/todo';

const displayController = () => {
  let _currentProject;

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

  const _completedToggleHandler = () => {
    const handler = (x) => {
      const task = x.closest('.task');
      const todoID = task.dataset.id;
      const projectID = _currentProject.getID();
      userInterfaceAPI.updateTodo(projectID, todoID, 'completed');
      _renderTodos(projectID, _currentProject.getTitle());
    }

    const throwError = (message) => {
      throw new Error(message)
    }

    const getTasks =  () => {
      const completeToggles = document.querySelectorAll('.complete-toggle');

      if (!completeToggles) {
        throwError('No tasks (or todos) found');
      };

      return completeToggles;
    }

    const completeToggles = getTasks();
    completeToggles.forEach(x => {
      x.addEventListener('click', () => handler(x));
    });
  }

  const _renderTodos = (projectID, projectName) => {
    // Remove todos
    _removeNodes('.task');

    const todos = userInterfaceAPI.getTodos(projectID);

    const main = document.querySelector('main');
    const addTask = document.querySelector('.new-task');

    const heading = main.querySelector('.heading > h1');
    heading.textContent = projectName;

    todos.forEach((todo) => {
      const todoEle = todoElement(todo);
      main.insertBefore(todoEle, addTask);
    });

    _completedToggleHandler();
  };

  const _renderProjects = () => {
    const projects = userInterfaceAPI.getAllProjects();

    const container = document.querySelector('#project-list');
    _removeNodes('.project-item');
    projects.forEach((project) => {
      const projectEle = projectElement(project);
      projectEle.addEventListener('click', () => {
        _currentProject = project;
        _renderTodos(project.getID(), project.getTitle());
      });
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

  const _submitTodoForm = () => {
    const form = document.querySelector('#todo-form');

    // validate duedate
    const duedate = form.querySelector('#duedate');
    const d = new Date();
    duedate.min = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    form.addEventListener('submit', () => {
      const title = form.querySelector('#title');
      const description = form.querySelector('#description');
      const priority = form.querySelector('#priority');
      const labels = form.querySelector('#labels');

      userInterfaceAPI.createTodo(
        title.value,
        description.value,
        new Date(duedate.value),
        +priority.value,
        labels.value,
        _currentProject.getID(),
      );

      _renderTodos(_currentProject.getID(), _currentProject.getTitle());

      // clear form
      title.value = '';
      description.value = '';
      duedate.value = '';
      priority.value = '';
      labels.value = '';
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
    _submitTodoForm();
  };

  return { startApp };
};

export default displayController().startApp;

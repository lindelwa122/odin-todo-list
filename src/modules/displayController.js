import userInterfaceAPI from './userInterfaceAPI';
import projectElement from '../components/project';
import todoElement from '../components/todo';

const displayController = () => {
  let _currentProject;

  const _openTodoForm = () => {
    document.querySelector('.new-task').addEventListener('click', () => {
      const dialog = document.querySelector('#todo-form-dialog');
      dialog.showModal();

      // update submit value
      dialog.querySelector('button').textContent = 'Add New Task';
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
      userInterfaceAPI.updateTodo(todoID, 'completed');
      _renderTodos(projectID, _currentProject.getTitle());
    };

    const throwError = (message) => {
      throw new Error(message);
    };

    const getTasks = () => {
      const completeToggles = document.querySelectorAll('.complete-toggle');

      if (!completeToggles) {
        throwError('No tasks (or todos) found');
      }

      return completeToggles;
    };

    const completeToggles = getTasks();
    completeToggles.forEach((x) => {
      x.addEventListener('click', () => handler(x));
    });
  };

  const _editTodo = () => {
    const getTodoInfo = (element) => {
      const task = element.closest('.task');
      const todoID = task.dataset.id;
      return userInterfaceAPI.getTodoInfo(todoID);
    };

    const updateFormValues = (btn) => {
      const { title, description, dueDate, priority, labels } =
        getTodoInfo(btn);

      const form = document.querySelector('#todo-form');

      const titleInput = form.querySelector('#title');
      titleInput.value = title;

      const descriptionInput = form.querySelector('#description');
      descriptionInput.value = description;

      const duedateInput = form.querySelector('#duedate');
      duedateInput.value = `${dueDate.getFullYear()}-${
        dueDate.getMonth() + 1
      }-${dueDate.getDate()}`;

      const priorityInput = form.querySelector('#priority');
      priorityInput.value = priority;

      const labelsInput = form.querySelector('#labels');
      labelsInput.value = labels.join(' ');
    };

    const editBtns = document.querySelectorAll('.edit-todo');
    editBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const dialog = document.querySelector('#todo-form-dialog');
        dialog.showModal();
        updateFormValues(btn);

        const task = btn.closest('.task');
        const todoID = task.dataset.id;
        document.querySelector('#todo-id').value = todoID;

        // update submit value
        dialog.querySelector('button').textContent = 'Update Task';
      });
    });
  };

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
    _editTodo();
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

        // clear form
        const formFields = dialog.querySelectorAll('form > *:not(label)');
        formFields.forEach((field) => {
          field.value = '';
        });
      });
    });
  };

  const _updateTodo = (
    todoID,
    title,
    description,
    duedate,
    priority,
    labels,
  ) => {
    userInterfaceAPI.updateTodo(todoID, 'title', title);
    userInterfaceAPI.updateTodo(todoID, 'description', description);
    userInterfaceAPI.updateTodo(todoID, 'duedate', duedate);
    userInterfaceAPI.updateTodo(todoID, 'priority', priority);
    userInterfaceAPI.updateTodo(todoID, 'label', labels.split(' '));
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

      const todoID = document.querySelector('#todo-id').value;
      if (todoID) {
        _updateTodo(
          todoID,
          title.value,
          description.value,
          new Date(duedate.value),
          +priority.value,
          labels.value,
        );
      } else {
        userInterfaceAPI.createTodo(
          title.value,
          description.value,
          new Date(duedate.value),
          +priority.value,
          labels.value,
          _currentProject.getID(),
        );
      }

      _renderTodos(_currentProject.getID(), _currentProject.getTitle());

      // clear form
      title.value = '';
      description.value = '';
      duedate.value = '';
      priority.value = '';
      labels.value = '';
      document.querySelector('#todo-id').value = '';
    });
  };

  const _showTodayView = () => {
    document.querySelector('#today-view').addEventListener('click', () => {
      _removeNodes('.task');

      const todos = userInterfaceAPI.getTodosDueToday();

      const main = document.querySelector('main');
      const addTask = document.querySelector('.new-task');

      const heading = main.querySelector('.heading > h1');
      heading.textContent = 'Today';

      todos.forEach((todo) => {
        const todoEle = todoElement(todo);
        main.insertBefore(todoEle, addTask);
      });
    });
  }

  const _showUpcomingView = () => {
    document.querySelector('#upcoming-view').addEventListener('click', () => {
      _removeNodes('.task');

      const todos = userInterfaceAPI.getTodosDueInTheFuture();

      const main = document.querySelector('main');
      const addTask = document.querySelector('.new-task');

      const heading = main.querySelector('.heading > h1');
      heading.textContent = 'Upcoming';

      todos.forEach((todo) => {
        const todoEle = todoElement(todo);
        main.insertBefore(todoEle, addTask);
      });
    });
  }

  const _showCompletedView = () => {
    document.querySelector('#completed-view').addEventListener('click', () => {
      _removeNodes('.task');

      const todos = userInterfaceAPI.getCompletedTodos();

      const main = document.querySelector('main');
      const addTask = document.querySelector('.new-task');

      const heading = main.querySelector('.heading > h1');
      heading.textContent = 'Completed';

      todos.forEach((todo) => {
        const todoEle = todoElement(todo);
        main.insertBefore(todoEle, addTask);
      });
    });
  }

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
    _showTodayView();
    _showUpcomingView();
    _showCompletedView();
    _openProjectForm();
    _openTodoForm();
    _closeModal();
    _submitProjectForm();
    _submitTodoForm();
  };

  return { startApp };
};

export default displayController().startApp;

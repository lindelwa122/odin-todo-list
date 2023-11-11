import userInterfaceAPI from './userInterfaceAPI';
import projectElement from '../components/project';
import todoElement from '../components/todo';
import { domManager, store } from 'dom-wizard';

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
      const todos = userInterfaceAPI.getTodos(projectID);
      displayTodos(todos, _currentProject.getTitle());
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

      const titleInput = document.querySelector('#todo-form > #title');
      titleInput.value = title;

      const descriptionInput = document.querySelector('#todo-form > #description');
      descriptionInput.value = description;

      const duedateInput = document.querySelector('#todo-form > #duedate');
      duedateInput.value = `${dueDate.getFullYear()}-${
        dueDate.getMonth() + 1
      }-${dueDate.getDate()}`;

      const priorityInput = document.querySelector('#todo-form > #priority');
      priorityInput.value = priority;

      const labelsInput = document.querySelector('#todo-form > #labels');
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

  const _deleteTodo = () => {
    const delBtns = document.querySelectorAll('.delete-todo');

    delBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const task = btn.closest('.task');
        const taskID = task.dataset.id;

        if (confirm('Are you sure you want to delete this todo?')) {
          userInterfaceAPI.deleteTodo(_currentProject.getID(), taskID);
        }

        const todos = userInterfaceAPI.getTodos(_currentProject.getID());
        displayTodos(todos, _currentProject.getTitle());
      });
    });
  }

  const displayTodos = (todos, projectName) => {
    domManager.update({
      selector: 'main > .heading',
      action: 'update',
      textContent: projectName
    });

    // Clear tasks
    domManager.update({ 
      selector: 'main > .tasks', 
      action: 'update', 
      innerHTML: ''
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

  const _renderPageContents = () => {
    displayProjects();
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

      const todos = userInterfaceAPI.getTodos(_currentProject.getID());
      displayTodos(todos, _currentProject.getTitle());

      // clear form
      title.value = '';
      description.value = '';
      duedate.value = '';
      priority.value = '';
      labels.value = '';
      document.querySelector('#todo-id').value = '';
    });
  };

  const _hideEditBtns = () => {
    document.querySelectorAll('.pencil-container').forEach((el) => {
      el.style.display = 'none';
    });

    // show add task
    document.querySelector('.new-task').style.display = 'none';
  };

  const _showTodayView = () => {
    document.querySelector('#today-view').addEventListener('click', () => {
      const todos = userInterfaceAPI.getTodosDueToday();
      displayTodos(todos, 'Today');
      _hideEditBtns();
    });
  };

  const _showUpcomingView = () => {
    document.querySelector('#upcoming-view').addEventListener('click', () => {
      const todos = userInterfaceAPI.getTodosDueInTheFuture();
      displayTodos(todos, 'Upcoming');
      _hideEditBtns();
    });
  };

  const _showCompletedView = () => {
    document.querySelector('#completed-view').addEventListener('click', () => {
      const todos = userInterfaceAPI.getCompletedTodos();
      displayTodos(todos, 'Completed');
      _hideEditBtns();
    });
  };

  const _showHighPriorityView = () => {
    document.querySelector('#high-view').addEventListener('click', () => {
      const todos = userInterfaceAPI.getTodosBasedOnPriority(0);
      displayTodos(todos, 'Very Important');
      _hideEditBtns();
    });
  };

  const _showMediumPriorityView = () => {
    document.querySelector('#med-view').addEventListener('click', () => {
      const todos = userInterfaceAPI.getTodosBasedOnPriority(1);
      displayTodos(todos, 'Somewhat Important');
      _hideEditBtns();
    });
  };

  const _showLowPriorityView = () => {
    document.querySelector('#low-view').addEventListener('click', () => {
      const todos = userInterfaceAPI.getTodosBasedOnPriority(2);
      displayTodos(todos, 'Not So Important');
      _hideEditBtns();
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
      className: 'active'
    });


    const todos = userInterfaceAPI.getTodos(defaultProjectID);
    displayTodos(todos, 'Personal');

    projects.forEach((project) => {
      if (project.getID() === defaultProjectID) {
        store.updateState('currentProject', project);
      }
    });
  }
  
  const startApp = () => {
    // _showTodayView();
    // _showUpcomingView();
    // _showCompletedView();
    // _showHighPriorityView();
    // _showMediumPriorityView();
    // _showLowPriorityView();
    // _openProjectForm();
    // _openTodoForm();
    // _closeModal();
    // _submitProjectForm();
    // _submitTodoForm();

    _createDefaultProject();
  };

  return { displayTodos, displayProjects, startApp };
};

export default displayController();

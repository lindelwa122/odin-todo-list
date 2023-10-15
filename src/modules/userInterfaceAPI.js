import todo from './todo';
import project from './project';
import { isFuture, isToday } from 'date-fns';

/**
 * Handles user interactions.
 */
const userInterfaceAPI = () => {
  const _projects = [];

  /**
   * Creates a todo and adds it to an appropriate project.
   * @param {string} title - The title of the todo
   * @param {string} descr - The description of the todo
   * @param {Date} dueDate - The due date of the todo
   * @param {0 | 1 | 2} priority - How important is the todo?
   * @param {string} labels - Labels associated with the todo
   * @param {string} projectID -ID of the project associated with tod
   * @returns
   */
  const createTodo = (title, descr, dueDate, priority, labels, projectID) => {
    const labelList = labels.split(' ');
    const newTodo = todo(title, descr, dueDate, priority, labelList);

    for (const project of _projects) {
      if (project.getID() === projectID) {
        project.addTodo(newTodo);
        return;
      }
    }

    throw new Error(`Project with ${projectID} is not found.`);
  };

  /**
   * Creates a project
   * @param {string} name - The name of the project
   * @param {string} descr - The description of the project
   */
  const createProject = (name, descr) => {
    for (const project of _projects) {
      if (project.getTitle().toLowerCase() === name.toLowerCase()) {
        alert(`A project with the name ${name} already exists.`);
        return false;
      }
    }

    const newProject = project(name, descr);
    _projects.push(newProject);
    return newProject.getID();
  };

  const _getAllTodos = () => {
    const todos = [];

    for (const project of _projects) {
      todos.push(...project.getAll());
    }

    return todos;
  };

  const _filter = (arr, predicate) => {
    return arr.filter(predicate);
  };

  const getAllProjects = () => _projects;

  const getCompletedTodos = () => {
    const todos = _getAllTodos();
    const func = (item) => item.taskCompleted() === true;
    return _filter(todos, func);
  };

  /**
   * Retrieves all todos of the specified project
   * @param {string} projectID - An ID of the project
   * @returns {Array} - An array of todos that belong to the specified project. If projectID doesn't match any project, an empty array is returned instead.
   */
  const getTodos = (projectID) => {
    const project = _projects.find((project) => project.getID() === projectID);

    if (!project) return [];

    return project.getAll();
  };

  /**
   * Retrieves todos that have a priority that matches the one specified.
   * @param {0 | 1 | 2} priority
   * A number between 0 and 2. Where 0 represents the highest priority and 2 represents the lowest priority
   */
  const getTodosBasedOnPriority = (priority) => {
    const filter = (priority) => {
      const todos = _getAllTodos();
      const func = (item) => !item.taskCompleted() && item.getPriority() === priority;
      return _filter(todos, func);
    };
    return filter(priority);
  };

  /**
   * Retrieves todos whose deadline is in the future.
   * @returns todos with due dates (deadline) in the future
   */
  const getTodosDueInTheFuture = () => {
    const todos = _getAllTodos();
    const todosDueInTheFuture = [];

    for (const todo of todos) {
      if (!todo.taskCompleted() && isFuture(todo.getDueDate())) {
        todosDueInTheFuture.push(todo);
      }
    }

    return todosDueInTheFuture;
  };

  /**
   *
   * @returns todos whose deadline is today
   */
  const getTodosDueToday = () => {
    const todos = _getAllTodos();
    const todosDueToday = [];

    for (const todo of todos) {
      if (!todo.taskCompleted() && isToday(todo.getDueDate())) {
        todosDueToday.push(todo);
      }
    }

    return todosDueToday;
  };

  /**
   * Retrieves information about the specified todo
   * @param {string} todoID - The ID of the todo to get information on
   * @returns information about the specified todo
   */
  const getTodoInfo = (todoID) => {
    let todo = undefined;
    for (const project of _projects) {
      for (const instance of project.getAll()) {
        if (instance.getID() === todoID) {
          todo = instance;
        }
      }
    }

    if (!todo) {
      throw new Error(`Todo with an ID of ${todoID} is not found.`);
    }

    const title = todo.getTitle();
    const description = todo.getDescr();
    const dueDate = todo.getDueDate();
    const priority = todo.getPriority();
    const labels = todo.getLabels();

    return { title, description, dueDate, priority, labels };
  }

  /**
   *
   * @param {Array} todos
   * @returns
   */
  const _orderbyPriority = (todos) => {
    return todos.sort((a, b) => {
      if (a.getPriority() < b.getPriority()) {
        return -1;
      } else if (a.getPriority() === b.getPriority()) {
        return 0;
      } else {
        return 1;
      }
    });
  };

  /**
   *
   * @param {Array} todos
   * @returns
   */
  const _orderbyTitleAsc = (todos) => {
    return todos.sort((a, b) => {
      if (a.getTitle() < b.getTitle()) {
        return -1;
      } else if (a.getTitle() === b.getTitle()) {
        return 0;
      } else {
        return 1;
      }
    });
  };

  /**
   *
   * @param {Array} todos
   * @returns
   */
  const _orderbyTitleDesc = (todos) => {
    return todos.sort((a, b) => {
      if (a.getTitle() < b.getTitle()) {
        return 1;
      } else if (a.getTitle() === b.getTitle()) {
        return 0;
      } else {
        return -1;
      }
    });
  };

  /**
   *
   * @param {Array} todos
   * @returns
   */
  const _orderbyDueDate = (todos) => {
    return todos.sort((a, b) => compareAsc(a.getDueDate(), b.getDueDate()));
  };

  /**
   *
   * @param {Array} todos
   * @returns
   */
  const _orderbyDateCreated = (todos) => {
    return todos.sort((a, b) =>
      compareAsc(a.getTodoCreationDate(), b.getTodoCreationDate()),
    );
  };

  /**
   * Returns an ordered array of todos depending on orderby.
   * @param {"ascending" | "descending" | "priority" | "created" | "duedate"} orderby - Instruction on how the todos must be ordered
   * @param {string} projectID - ID of the project
   * @returns ordered todos
   */
  const orderTodos = (orderby, projectID) => {
    let project;
    for (const proj of _projects) {
      if (proj.getID() === projectID) {
        project = proj;
      }
    }

    const todos = project.getAll();

    switch (orderby) {
      case 'ascending':
        return _orderbyTitleAsc(todos);

      case 'descending':
        return _orderbyTitleDesc(todos);

      case 'priority':
        return _orderbyPriority(todos);

      case 'created':
        return _orderbyDateCreated(todos);

      case 'duedate':
        return _orderbyDueDate(todos);
    }
  };

  /**
   * Updates todo 
   * @param {string} todoID - The ID of the todo to be updated
   * @param {'completed' | 'description' | 'duedate' | 'priority' | 'title'} about - Information to be updated
   * @param {*} newInfo - New information
   * @returns true if the todo was updated successfully, otherwise false
   */
  const updateTodo = (todoID, about, newInfo) => {
    let todo = undefined;
    for (const project of _projects) {
      for (const instance of project.getAll()) {
        if (instance.getID() === todoID) {
          todo = instance;
        }
      }
    }

    if (!todo) {
      throw new Error(`Todo with ID (${todoID}) is not found.`);
    }

    let updated = false;
    switch (about) {
      case 'completed':
        updated = todo.toggleCompleted();
        break;

      case 'description':
        updated = todo.updateDescr(newInfo);
        break;

      case 'duedate':
        updated = todo.updateDueDate(newInfo);
        break;

      case 'priority':
        updated = todo.updatePriority(newInfo);
        break;

      case 'title':
        updated = todo.updateTitle(newInfo);
        break;

      case 'label':
        const currentLabels = todo.getLabels();
        const tobeRemoved = currentLabels.filter((label) => !newInfo.includes(label));
        const tobeAdded = newInfo.filter((label) => !currentLabels.includes(label));

        tobeRemoved.forEach((label) => todo.removeLabel(label));
        tobeAdded.forEach((label) => todo.addLabel(label));
    }

    return updated;
  }

  return {
    createTodo,
    createProject,
    getAllProjects,
    getCompletedTodos,
    getTodos,
    getTodosBasedOnPriority,
    getTodosDueInTheFuture,
    getTodosDueToday,
    getTodoInfo,
    orderTodos,
    updateTodo,
  };
};

export default userInterfaceAPI();

import { nanoid } from 'nanoid';

/**
 * Represents a group of todos
 * @param {string} title - The title of the project
 * @param {string} descr - The description of the project
 * @return {object} public methods of project
 */
const project = (title, descr) => {
  const _id = nanoid();
  const _todos = [];

  const getAll = () => _todos;
  const getID = () => _id;
  const getTitle = () => title;
  const getDescr = () => descr;

  /**
   * Adds a new todo
   * @param {object} todo  - A todo instance
   */
  const addTodo = (todo) => {
    _todos.push(todo);
  };

  /**
   * Removes a todo and if successfuly returns true; otherwise false.
   * @param {string} id
   * @return {Boolean} true if todo is removed successfully; otherwise false
   */
  const removeTodo = (id) => {
    const index = _todos.findIndex((todo) => todo.getID() === id);
    if (index === -1) return false;
    _todos.splice(index, 1);
    return true;
  };

  return { addTodo, getAll, getDescr, getID, getTitle, removeTodo };
};

export default project;

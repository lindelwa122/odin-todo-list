import { nanoid } from 'nanoid';
import { compareAsc } from 'date-fns';

const validateTodo = (title, descr, dueDate, priority, labels) => {
  if (title.length < 3 || title.length > 50) {
    throw new Error('Title must have between 3 and 50 characters.');
  }

  if (descr.length < 10 || descr.length > 250) {
    throw new Error('Description must have between 10 and 250 characters.');
  }

  const result = compareAsc(new Date(), dueDate);
  if (result == 1) {
    throw new Error('The due date is in invalid.');
  }

  if (priority !== 0 && priority !== 1 && priority !== 2) {
    throw new Error('Priority can only be 0, 1 or 2.');
  }

  if (!Array.isArray(labels)) {
    throw new Error('Label must be an array');
  }
};

/**
 * Represents a todo
 * @param {string} title - The title of the todo
 * @param {string} descr - The description of the todo
 * @param {Date} dueDate - The due date of when the todo must completed
 * @param {number} priority - The number representing how important the todo is
 * @param {Array} labels - The labels associated with the todo
 * @returns
 */
const todo = (title, descr, dueDate, priority, labels) => {
  validateTodo(title, descr, dueDate, priority, labels);

  const _id = nanoid();
  const _created = new Date();

  let _completed = false;
  let _title = title;
  let _descr = descr;
  let _dueDate = dueDate;
  let _priority = priority;
  const _labels = labels;

  console.log(priority);

  const getID = () => _id;
  const getTitle = () => _title;
  const getDescr = () => _descr;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;
  const getLabels = () => _labels;
  const getTodoCreationDate = () => _created;
  const taskCompleted = () => _completed;

  /**
   * Returns true if the title was updated successfully; otherwise false.
   * @param {string} newTitle
   */
  const updateTitle = (newTitle) => {
    if (newTitle.length < 3 || newTitle.length > 50) {
      return false;
    }
    _title = newTitle;
    return true;
  };
  /**
   * Returns true if the description was updated successfully; otherwise false.
   * @param {string} newDescr
   */
  const updateDescr = (newDescr) => {
    if (newDescr.length < 10 || newDescr.length > 250) {
      return false;
    }
    _descr = newDescr;
    return true;
  };

  /**
   * Returns true if the due date was updated successfully, otherwise false.
   * @param {Date} newDueDate
   * must be bigger than the current date.
   */
  const updateDueDate = (newDueDate) => {
    const result = compareAsc(new Date(), newDueDate);
    if (result == 1) {
      return false;
    }
    _dueDate = newDueDate;
    return true;
  };

  /**
   * Returns true if priority was updated successfully; otherwise false.
   * @param {0 | 1 | 2} newPriority
   * A number between 0 and 2. Where 0 represents the highest priority and 2 represents the lowest priority
   */
  const updatePriority = (newPriority) => {
    if (newPriority !== 0 && newPriority !== 1 && newPriority !== 2) {
      return false;
    }
    _priority = newPriority;
    return true;
  };

  const toggleCompleted = () => (_completed = !_completed);

  /**
   * Returns true if a label was added successfully; otherwise false.
   * @param {string} label
   */
  const addLabel = (label) => {
    if (label.length < 1 || label.length > 50 || _labels.includes(label)) {
      return false;
    }

    _labels.push(label);
    return true;
  };

  /**
   * Returns true if a label was found and removed; otherwise false.
   * @param {string} label
   * @returns
   */
  const removeLabel = (label) => {
    const index = _labels.findIndex((item) => item === label);
    if (index === -1) return false;
    _labels.splice(index, 1);
    return true;
  };

  return {
    addLabel,
    getDescr,
    getDueDate,
    getID,
    getLabels,
    getPriority,
    getTitle,
    getTodoCreationDate,
    taskCompleted,
    toggleCompleted,
    removeLabel,
    updateDescr,
    updateDueDate,
    updatePriority,
    updateTitle,
  };
};

export default todo;

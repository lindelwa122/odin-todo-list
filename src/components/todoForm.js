{
  /* <form action="">
  <label for="title">Title</label>
  <input type="text" id="title" name="title" placeholder="Hey! What are you up to?" minlength="3" maxlength="50" required>
  <label for="description">Describe your task</label>
  <textarea name="description" id="description" cols="30" rows="10" minlength="10" maxlength="250"></textarea>
  <label for="duedate">Deadline</label>
  <input type="date" name="duedate" id="duedate" required>
  <label for="priority">How important is this task?</label>
  <select name="priority" id="priority" required>
      <option value="0">High Priority</option>
      <option value="1">Medium Priority</option>
      <option value="2">Low Priority</option>
  </select>
  <label for="labels">Labels</label>
  <input type="text" id="labels" name="labels" placeholder="Seperate by space"></input>
  <button>Add A New Task</button>
</form> */
}

const todoForm = () => {
  /**
   *
   * @param {{}} options
   */
  const _createElement = (tagName, options) => {
    const input = document.createElement(tagName);
    for (const [attr, val] of Object.entries(options)) {
      input[attr] = val;
    }
    return input;
  };

  const createForm = () => {};
};

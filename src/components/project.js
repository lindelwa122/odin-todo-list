/**
 * Creates a project element to be isplayed in a list
 * @param {string} id - The ID of the project
 * @param {string} name - The name of the project
 * @param {string} description - The description of the project
 * @returns An HTMLDIVElement that contains the icon and project's name
 */
const project = (id, name, description) => {
  const container = document.createElement('div');
  container.dataset.id = id;
  container.title = description;

  const icon = document.createElement('i');
  icon.classList = 'bi bi-boxes';

  const text = document.createElement('span');
  text.textContent = name;

  container.append(icon, text);

  return container;
};

export default project;

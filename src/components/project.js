/**
 * Creates a project element to be isplayed in a list
 * @param {string} id - The ID of the project
 * @param {string} name - The name of the project
 * @param {string} description - The description of the project
 * @returns An HTMLDIVElement that contains the icon and project's name
 */
const project = (projectInstance) => {
  const container = document.createElement('div');
  container.className = 'project-item';
  container.dataset.id = projectInstance.getID();
  container.title = projectInstance.getDescr();

  const icon = document.createElement('i');
  icon.classList = 'bi bi-boxes';

  const text = document.createElement('span');
  text.textContent = projectInstance.getTitle();

  container.append(icon, text);

  return container;
};

export default project;

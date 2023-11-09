/**
 * Creates a project element to be displayed in a list
 * @param {InstanceType} projectInstance - Project
 * @return {HTMLDivElement} An HTMLDIVElement that contains the icon and project's name
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

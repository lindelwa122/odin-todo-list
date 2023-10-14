import userInterfaceAPI from './userInterfaceAPI';
import projectElement from '../components/project';

const displayController = () => {
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
  const _emptyContainer = (selector) => {
    const container = document.querySelector(selector);

    // Convert HTML Collection to an Array instance
    // This allow us to remove a child from the DOM without the array updating
    const children = [];
    for (const child of container.children) children.push(child);

    for (const child of children) {
      if (!child.classList.contains('heading')) {
        child.remove();
      }
    }
  };

  const _renderProjects = () => {
    const projects = userInterfaceAPI.getAllProjects();

    const container = document.querySelector('#project-list');
    _emptyContainer('#project-list');
    projects.forEach((project) => {
      const id = project.getID();
      const title = project.getTitle();
      const description = project.getDescr();
      const projectEle = projectElement(id, title, description);
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
    _closeModal();
    _submitProjectForm();
  };

  return { startApp };
};

export default displayController().startApp;

import userInterfaceAPI from './userInterfaceAPI';

const displayController = () => {
  const _openProjectForm = () => {
    document.querySelectorAll('.open-project-form').forEach((x) => {
      x.addEventListener('click', () => {
        document.querySelector('#project-form-dialog').showModal();
      });
    });
  };

  const _renderProjects = () => {
    const projects = userInterfaceAPI.getAllProjects();

    const projectElement = (id, name, description) => {
      const container = document.createElement('div');
      container.dataset.id = id;
      container.title = description;

      const icon = document.createElement('i');
      icon.classList = ['bi'];

      const text = document.createElement('span');
      text.textContent = name;

      container.append(icon, text);

      return container;
    }

    const emptyContainer = () => {
      const container = document.querySelector('#project-list');

      // Convert HTML Collection to an Array instance
      // This allow us to remove a child from the DOM without the array updating
      const children = [];
      for (const child of container.children) children.push(child);

      for (const child of children) {
        if (!child.classList.contains('heading')) {
          child.remove();
        }
      }
    }

    const container = document.querySelector('#project-list');
    emptyContainer();
    projects.forEach((project) => {
      const id = project.getID();
      const title = project.getTitle();
      const description = project.getDescr();
      const projectEle = projectElement(id, title, description)
      container.append(projectEle);
    })
  }

  const _renderPageContents = () => {
    _renderProjects();
  }

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

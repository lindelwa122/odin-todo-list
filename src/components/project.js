import boxes from 'bootstrap-icons/icons/boxes.svg';

const project = (projectInstance) => {
  const icon = {
    tagName: 'img',
    options: { src: boxes, alt: 'icon' },
  }

  const text = {
    tagName: 'span',
    text: projectInstance.getTitle(),
  };

  return {
    before: (el) => {
      el.dataset.id = projectInstance.getID();
    },
    options: {
      className: 'project-item',
      title: projectInstance.getDescr(),
    },
    children: [icon, text],
  };
}

export default project;

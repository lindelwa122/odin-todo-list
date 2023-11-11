import plusCircle from 'bootstrap-icons/icons/plus-circle.svg';
import projectForm from './projectForm';

const nav = () => {
  const leftDiv = { text: 'LoadingTasks' };

  const rightDiv = {
    options: {
      className: 'open-project-form',
      onclick: projectForm.show,
    },
    children: [
      { tagName: 'span', text: 'Project' },
      { tagName: 'img', options: { src: plusCircle, alt: 'Icon' } },
    ],
  };

  return {
    tagName: 'nav',
    children: [leftDiv, rightDiv],
  };
};

export default nav();

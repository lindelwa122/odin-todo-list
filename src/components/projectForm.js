import xLg from 'bootstrap-icons/icons/x-lg.svg';
import userInterfaceAPI from '../modules/userInterfaceAPI';
import displayController from '../modules/displayController';

const projectForm = () => {
  const show = () => {
    const dialog = document.querySelector('#project-form-dialog');
    dialog.showModal();
  }

  const close = () => {
    const dialog = document.querySelector('#project-form-dialog');
    dialog.close();
  }

  const content = () => {
    const closeBtn = {
      children: [{
        tagName: 'img',
        options: { 
          className: 'close-modal', 
          src: xLg, 
          alt: 'Icon',
          onclick: close,
        }
      }]
    }
  
    const form = () => {
      const getFormData = (form) => {
        const formData = {};
    
        for (const field of form) {
          formData[field.name] = field.value;
        }
    
        return formData;
      }
    
      const submitHandler = (e) => {
        const { title, description } = getFormData(e.target);
        userInterfaceAPI.createProject(title, description);
        displayController.displayProjects();
      }

      const formField = (tag, options) => ({
        tagName: tag,
        options: options
      });
  
      return {
        tagName: 'form',
        options: { 
          id: 'project-form', 
          method: 'dialog',
          onsubmit: submitHandler,
        },
        children: [
          formField('label', { for: 'project-title', textContent: 'Project Title' }),
          formField('input', { 
            id: 'project-title',
            name: 'title',
            placeholder: 'What name do you have in mind?',
            minLength: 3,
            maxLength: 20,
            required: true
          }),
          formField('label', { for: 'project-description', textContent: 'Description' }),
          formField('textarea', { 
            id: 'project-description',
            name: 'description',
            minLength: 10,
            maxLength: 250,
            cols: 30,
            rows: 10
          }),
          { tagName: 'button', text: 'Add A New Project' }
        ]
      }
    }
  
    return {
      tagName: 'dialog',
      options: { id: 'project-form-dialog' },
      children: [closeBtn, form()]
    }
  }

  return { show, close, content };
}

export default projectForm();

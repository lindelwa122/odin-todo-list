import xLg from 'bootstrap-icons/icons/x-lg.svg';
import userInterfaceAPI from '../modules/userInterfaceAPI';
import displayController from '../modules/displayController';
import { clearForm, getFormData } from '../utils/utils';
import { domManager } from 'dom-wizard';

const projectForm = () => {
  const show = () => {
    const dialog = document.querySelector('#project-form-dialog');
    dialog.showModal();
  }

  const close = () => {
    const dialog = document.querySelector('#project-form-dialog');
    dialog.close();
    clearForm(domManager.read('#todo-form', 'childNodes'));
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
      const submitHandler = (e) => {
        const { title, description } = getFormData(e.target);
        userInterfaceAPI.createProject(title, description);
        displayController.displayProjects();
        clearForm(domManager.read('#todo-form', 'childNodes'));
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

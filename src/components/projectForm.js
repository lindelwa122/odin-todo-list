import xLg from 'bootstrap-icons/icons/x-lg.svg';

const projectForm = () => {
  const closeBtn = {
    children: [{
      tagName: 'img',
      options: { 
        className: 'close-modal', 
        src: xLg, 
        alt: 'Icon' 
      }
    }]
  }

  const form = () => {
    const formField = (tag, options) => ({
      tagName: tag,
      options: options
    });

    return {
      tagName: 'form',
      options: { id: 'project-form', method: 'dialog' },
      children: [
        formField('label', { for: 'project-title', textContent: 'Project Title' }),
        formField('input', { 
          id: 'project-title',
          name: 'project-title',
          placeholder: 'What name do you have in mind?',
          minLength: 3,
          maxLength: 20,
          required: true
        }),
        formField('label', { for: 'project-description', textContent: 'Description' }),
        formField('textarea', { 
          id: 'project-description',
          name: 'project-description',
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

export default projectForm();

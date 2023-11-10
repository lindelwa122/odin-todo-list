const todoForm = () => {
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
      options: { id: 'todo-form', method: 'dialog' },
      children: [
        formField('input', { type: 'hidden', value: '', id: 'todo-id' }),
        formField('label', { for: 'title', textContent: 'Title' }),
        formField('input', { 
          id: 'title',
          name: 'title',
          placeholder: 'Hey! What are you up to?',
          minLength: 3,
          maxLength: 50,
          required: true
        }),
        formField('label', { for: 'description', textContent: 'Describe your task' }),
        formField('textarea', { 
          id: 'description',
          name: 'description',
          minLength: 10,
          maxLength: 250,
          cols: 30,
          rows: 10
        }),
        formField('label', { for: 'duedate', textContent: 'Deadline' }),
        formField('input', { 
          id: 'duedate',
          name: 'duedate',
          type: 'date',
          required: true
        }),
        formField('label', { for: 'priority', textContent: 'How important is this task?' }),
        formField('select', { 
          name: 'priority', 
          id: 'priority', 
          required: true 
        }).children = [
          formField('option', { value: 0, textContent: 'High Priority' }),
          formField('option', { value: 1, textContent: 'Medium Priority' }),
          formField('option', { value: 2, textContent: 'Low Priority' })
        ],
        formField('label', { for: 'labels', textContent: 'Labels' }),
        formField('input', { 
          id: 'labels',
          name: 'labels',
          placeholder: 'Seperate by space',
        }),
        { tagName: 'button', text: 'Add a New Task'}
      ]
    }
  }

  return {
    tagName: 'dialog',
    options: { id: 'todo-form-dialog' },
    children: [closeBtn, form()]
  }
}

export default todoForm();

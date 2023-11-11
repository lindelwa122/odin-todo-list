import xLg from 'bootstrap-icons/icons/x-lg.svg';
import userInterfaceAPI from '../modules/userInterfaceAPI';
import { domManager, store } from 'dom-wizard';
import displayController from '../modules/displayController';
import { clearForm } from '../utils/utils';

const todoForm = () => {
  const show = () => {
    const dialog = document.querySelector('#todo-form-dialog');
    dialog.showModal();

    // Clear options
    domManager.update({ 
      selector: '#todo-form-dialog select#project', 
      action: 'update', 
      innerHTML: ''
    });

    // Add options in the select form field
    const projects = userInterfaceAPI.getAllProjects();
    projects.forEach((project) => {
      domManager.create({
        tagName: 'option',
        text: project.getTitle(),
        options: { value: project.getID() }
      }, '#todo-form-dialog select#project', true);
    });

    // Clear value
    domManager.update({ 
      selector: '#todo-form-dialog select#project', 
      action: 'update', 
      value: ''
    });
  }

  const close = () => {
    const dialog = document.querySelector('#todo-form-dialog');
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
          onclick: close
        }
      }]
    }
  
    const form = () => {
      const formField = (tag, options) => ({
        tagName: tag,
        options: options
      });

      const getFormData = (form) => {
        const formData = {};

        for (const field of form) {
          formData[field.name] = field.value;
        }

        return formData;
      }

      const submitHandler = (e) => {
        const { id, title, description, priority, duedate, labels, project } = getFormData(e.target);

        if (userInterfaceAPI.todoExists(id)) {
          userInterfaceAPI.updateTodo(id, 'title', title);
          userInterfaceAPI.updateTodo(id, 'description', description);
          userInterfaceAPI.updateTodo(id, 'priority', +priority);
          userInterfaceAPI.updateTodo(id, 'duedate', new Date(duedate));
          userInterfaceAPI.updateTodo(id, 'label', labels.split(' '));
          userInterfaceAPI.updateTodo(id, 'project', { todoID: id, projectID: project });
        } else {
          userInterfaceAPI.createTodo(
            title, 
            description, 
            new Date(duedate), 
            +priority, 
            labels,
            project
          );
        }
        
        const currentProject = store.getState('currentProject');
        if (currentProject && currentProject.getID() === project) {
          const todos = userInterfaceAPI.getTodos(currentProject.getID());
          displayController.displayTodos(todos, currentProject.getTitle());
        }

        clearForm(domManager.read('#todo-form', 'childNodes'));
      }
  
      return {
        tagName: 'form',
        options: { 
          id: 'todo-form', 
          method: 'dialog',
          onsubmit: submitHandler,
        },
        children: [
          formField('input', { type: 'hidden', value: '', id: 'id', name: 'id' }),
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
          { 
            tagName: 'select', 
            options: {
              id: 'priority',
              name: 'priority',
              required: true
            },
            children: [
              formField('option', { value: 0, textContent: 'High Priority' }),
              formField('option', { value: 1, textContent: 'Medium Priority' }),
              formField('option', { value: 2, textContent: 'Low Priority' })
            ]
          },
          formField('label', { for: 'project', textContent: 'Where does this task belong?' }),
          formField('select', {
            id: 'project',
            name: 'project',
            required: true,
          }),
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

  return { show, close, content };
}

export default todoForm();

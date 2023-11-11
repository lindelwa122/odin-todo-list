import { format, isToday, isTomorrow } from 'date-fns';
import pencilFill from 'bootstrap-icons/icons/pencil-fill.svg';
import trash3 from 'bootstrap-icons/icons/trash3.svg';
import clock from 'bootstrap-icons/icons/clock.svg';
import userInterfaceAPI from '../modules/userInterfaceAPI';
import { fillForm } from '../utils/utils';
import todoForm from './todoForm';
import { domManager } from 'dom-wizard';

const todo = (todoInstance) => {
  const radio = {
    options: { 
      classList: ['radio', 'complete-toggle'],
      onclick: (e) => {
        userInterfaceAPI.updateTodo(todoInstance.getID(), 'completed');
        const container = e.target.closest('.task');
        container.querySelector('.disk').classList.toggle('active');
      }
    },
    children: [{
      options: { classList: ['disk', todoInstance.taskCompleted() ? 'active' : ''] },
    }]
  };

  const title = () => {
    let priority;
    switch (todoInstance.getPriority()) {
      case 0:
        priority = 'high-priority';
        break;

      case 1:
        priority = 'medium-priority';
        break;

      case 2:
        priority = 'low-priority';
        break;
    }

    return {
      children: [
        { 
          tagName: 'span', 
          text: todoInstance.getTitle(), 
          options: { className: 'title' } 
        },
        { tagName: 'span', options: { className: priority } },
      ]
    }
  }

  const interactions = {
    children: [
      { 
        tagName: 'img', 
        options: { 
          src: pencilFill, 
          alt: 'Icon', 
          className: 'edit-todo',
          onclick: () => {
            const project = userInterfaceAPI.getProject(todoInstance.getID());

            fillForm(
              '#todo-form', 
              Object.assign(
                {}, 
                userInterfaceAPI.getTodoInfo(todoInstance.getID()), 
                { 
                  labels: userInterfaceAPI.getTodoInfo(todoInstance.getID()).labels.join(' '), 
                  project: project.getID() 
                }
              )
            );

            domManager.update({
              selector: '#todo-form > input#id',
              action: 'update',
              value: todoInstance.getID()
            });

            todoForm.show();
          }
        }
      },
      { 
        tagName: 'img', 
        options: { 
          src: trash3, 
          alt: 'Icon', 
          className: 'delete-todo',
          onclick: (e) => {
            if (confirm('Are you sure you want to delete this todo?')) {
              userInterfaceAPI.deleteTodo(todoInstance.getID());
              e.target.closest('.task').remove();
            }
          }
        }
      }
    ]
  }

  const deadline = () => {
    const dueDate = todoInstance.getDueDate();
    let dateDisplay;
    if (isToday(dueDate)) {
      dateDisplay = 'Today';
    } else if (isTomorrow(dueDate)) {
      dateDisplay = 'Tomorrow';
    } else {
      dateDisplay = `on ${format(todoInstance.getDueDate(), 'PPPP')}`;
    }

    return {
      options: { className: 'deadline-container' },
      children: [
        { tagName: 'span', text: `Due on ${dateDisplay}` }, 
        { tagName: 'img', options: { src: clock, alt: 'Icon' } }
      ]
    }
  }

  const labels = () => {
    const label = (text) => ({ text });

    const container = {
      options: { className: 'labels' },
      children: [],
    };

    if (todoInstance.getLabels().length > 0) {
      todoInstance.getLabels().forEach((item) => {
        container.children.push(label(item));
      });
    }

    return container;
  }

  return {
    before: (el) => {
      el.dataset.id = todoInstance.getID();
    },
    options: {
      className: 'task',
      title: todoInstance.getDescr(),
    },
    children: [radio, title(), interactions, deadline(), labels()]
  }
}

export default todo;

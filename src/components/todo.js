import { format, isToday, isTomorrow } from 'date-fns';
import pencilFill from 'bootstrap-icons/icons/pencil-fill.svg';
import trash3 from 'bootstrap-icons/icons/trash3.svg';
import clock from 'bootstrap-icons/icons/clock.svg';

const todo = (todoInstance) => {
  const radio = {
    options: { classList: ['radio', 'complete-toggle'] },
    children: [{
      options: { classList: ['disk', todoInstance.taskCompleted() ? 'active' : ''] }
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
        options: { src: pencilFill, alt: 'Icon', className: 'edit-todo' }
      },
      { 
        tagName: 'img', 
        options: { src: trash3, alt: 'Icon', className: 'delete-todo' }
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

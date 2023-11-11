import calendar2Date from 'bootstrap-icons/icons/calendar2-date.svg';
import calendar2Week from 'bootstrap-icons/icons/calendar2-week.svg';
import check2Circle from 'bootstrap-icons/icons/check2-circle.svg';
import projectForm from './projectForm';
import displayController from '../modules/displayController';
import userInterfaceAPI from '../modules/userInterfaceAPI';
import { store } from 'dom-wizard';

const sidebar = () => {
  const option = (
    id,
    title,
    getTodosMethod,
    imgSrc = undefined,
    iClass = undefined,
    ...args
  ) => {
    const icon = imgSrc
      ? { tagName: 'img', options: { src: imgSrc, icon: 'icon' } }
      : { tagName: 'i', options: { classList: ['bi', iClass] } };

    const clickHandler = (e) => {
      store.updateState('currentProject', undefined);
      const todos = getTodosMethod(...args);
      displayController.displayTodos(todos, title);

      document.querySelectorAll('.group > div:not(.heading)').forEach((el) => {
        el.classList.remove('active');
      });

      e.target.closest(`#${id}`).classList.add('active');
    };

    return {
      options: { id: id, onclick: clickHandler },
      children: [icon, { tagName: 'span', text: title }],
    };
  };

  const {
    getTodosDueToday,
    getTodosDueInTheFuture,
    getCompletedTodos,
    getTodosBasedOnPriority,
  } = userInterfaceAPI;

  const group = {
    options: { className: 'group' },
    children: [
      option('today-view', 'Today', getTodosDueToday, calendar2Date),
      option(
        'upcoming-view',
        'Upcoming',
        getTodosDueInTheFuture,
        calendar2Week,
      ),
      option('completed-view', 'Completed', getCompletedTodos, check2Circle),
      option(
        'high-view',
        'High Priority',
        getTodosBasedOnPriority,
        null,
        'high-priority',
        0,
      ),
      option(
        'med-view',
        'Medium Priority',
        getTodosBasedOnPriority,
        null,
        'medium-priority',
        1,
      ),
      option(
        'low-view',
        'Low Priority',
        getTodosBasedOnPriority,
        null,
        'low-priority',
        2,
      ),
    ],
  };

  const projectList = {
    options: {
      id: 'project-list',
      classList: ['group', 'project'],
    },
    children: [
      {
        options: {
          onclick: projectForm.show,
          classList: ['heading', 'open-project-form'],
        },
        text: 'Project',
      },
    ],
  };

  return {
    options: { id: 'sidebar' },
    children: [group, projectList],
  };
};

export default sidebar();

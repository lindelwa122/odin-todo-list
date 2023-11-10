import calendar2Date from 'bootstrap-icons/icons/calendar2-date.svg';
import calendar2Week from 'bootstrap-icons/icons/calendar2-week.svg';
import check2Circle from 'bootstrap-icons/icons/check2-circle.svg';
import projectForm from './projectForm';

const sidebar = () => {
  const option = (id, title, imgSrc=undefined, iClass=undefined) => {
    const icon = imgSrc 
      ? { tagName: 'img', options: { src: imgSrc, icon: 'icon' }}
      : { tagName: 'i', options: { classList: ['bi', iClass] }}; 

    return {
      options: { id: id },
      children: [icon, { tagName: 'span', text: title }],
    }
  };

  const group = {
    options: { className: 'group' },
    children: [
      option('today-view', 'Today', calendar2Date),
      option('upcoming-view', 'Upcoming', calendar2Week),
      option('completed-view', 'Completed', check2Circle),
      option('high-view', 'High Priority', undefined, 'high-priority'),
      option('med-view', 'Medium Priority', undefined, 'medium-priority'),
      option('low-view', 'Low Priority', undefined, 'low-priority'),
    ],
  };

  const projectList = {
    options: {
      id: 'project-list',
      classList: ['group', 'project'],
    },
    children: [{ 
      options: { 
        onclick: projectForm.show,
        classList: ['heading', 'open-project-form']}, 
        text: 'Project' 
      }
    ]
  }

  return {
    options: { id: 'sidebar' },
    children: [group, projectList],
  }
}

export default sidebar();

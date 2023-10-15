import { format, isToday, isTomorrow } from 'date-fns';

const todo = (todoInstance) => {
  const container = document.createElement('div');
  container.className = 'task';
  container.dataset.id = todoInstance.getID();
  container.title = todoInstance.getDescr();

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

  const completed = todoInstance.taskCompleted() ? 'active' : '';
  const title = todoInstance.getTitle();

  const dueDate = todoInstance.getDueDate();
  let dateDisplay;
  if (isToday(dueDate)) {
    dateDisplay = 'Today';
  } else if (isTomorrow(dueDate)) {
    dateDisplay = 'Tomorrow';
  } else {
    dateDisplay = `on ${format(todoInstance.getDueDate(), 'PPPP')}`;
  }

  container.innerHTML = `
    <div class="radio complete-toggle">
      <div class="disk ${completed}"></div>
    </div>
    <div>
      <span class="title">${title}</span>
      <span class="${priority}"></span>
    </div>
    <div class="pencil-container">
      <i class="bi bi-pencil-fill edit-todo"></i>
    </div>
    <div class="deadline-container">
      <span>Due ${dateDisplay}</span>
      <i class="bi bi-clock"></i>
    </div>
  `;

  if (todoInstance.getLabels()[0]) {
    const labels = todoInstance.getLabels().map((label) => {
      const div = document.createElement('div');
      div.textContent = label;
      return div;
    });

    const labelsContainer = document.createElement('div');
    labelsContainer.className = 'labels';

    labels.forEach((label) => labelsContainer.appendChild(label));

    container.appendChild(labelsContainer);
  }

  return container;
};

export default todo;

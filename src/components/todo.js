const todo = (todoInstance) => {
  const container = document.createElement('div');
  container.className = 'task';
  container.dataset.id = todoInstance.getID();
  container.title = todoInstance.getDescr();


  container.innerHTML = `
    <div class="radio">
      <div class="disk"></div>
    </div>
    <div>
      <span class="title">Title</span>
      <span class="high-priority"></span>
    </div>
    <div class="pencil-container">
      <i class="bi bi-pencil-fill"></i>
    </div>
    <div class="deadline-container">
      <span>07:30</span>
      <i class="bi bi-clock"></i>
    </div>
  `

  return container;
}

export default todo;
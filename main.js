
const addTaskInput = document.getElementById('add-task-input');
const addBtn = document.getElementById('add-task-button');
const toDoItemsListElm = document.getElementById('to-do-items-list');
const removeTaskBtns = document.querySelectorAll('.remove-task-btn');

let toDoList = [];
if(localStorage.getItem('todolist')) {
  toDoList = JSON.parse(localStorage.getItem('todolist'));
  console.log(typeof toDoList);
  if(toDoList.length >= 1){
  toDoList.forEach((toDoItem) => {
    addTaskOnSite(toDoItem.taskName, toDoItem.taskID, toDoItem.isTaskDone);
  })
}
}

function addTaskOnSite(taskName, taskID, isTaskDone) {
  toDoItemsListElm.innerHTML += `<section id="to-do-item-${taskID}">
        <input type="checkbox" id="to-do-item-checkbox-${taskID}" ${(isTaskDone ? 'checked' : '')}>
        <label for="to-do-item-checkbox-${taskID}" id="checkbox-label-${taskID}" class="${(isTaskDone ? 'done-task' : '')}">${taskName}</label>
        <button id="to-do-item-remove-btn-${taskID}" class="remove-task-btn">Usuń zadanie</button>
      </section>`;
}

addTaskInput.addEventListener('keydown', e => {
  if(e.key === "Enter"){
    addTask();
  }
});

addBtn.addEventListener('click', addTask);

function addTask(){
  if(addTaskInput.value){
    let taskName = addTaskInput.value;
    addTaskInput.value = '';
    let taskID = toDoList.length + 1;
    let isTaskDone = false;
    toDoList.push({taskName, taskID, isTaskDone});
    console.log(toDoList);
    localStorage.setItem('todolist', JSON.stringify(toDoList));
    addTaskOnSite(taskName, taskID);
  } else {
    alert("Podaj nazwę zadania");
  }
}

toDoItemsListElm.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-task-btn')) {
    let sectionElm = event.target.parentElement;
    const sectionID = sectionElm.id;

    const taskID = parseInt(sectionID.replace('to-do-item-', ''));

    sectionElm.remove();

    toDoList = toDoList.filter(task => task.taskID !== taskID);
    localStorage.setItem('todolist', JSON.stringify(toDoList));
  }
});


toDoItemsListElm.addEventListener('click', (e) => {
  if(e.target.type === "checkbox"){
    const checkboxElm = e.target;
    const checkboxId = checkboxElm.id;

    const taskID = parseInt(checkboxId.replace('to-do-item-checkbox-', ''));

    const checkboxLabel = document.getElementById(`checkbox-label-${taskID}`);

    if(checkboxLabel.classList.contains('done-task')){
      checkboxLabel.classList.remove('done-task');
      //ids start from 1, indexes start from 0
      toDoList[taskID - 1].isTaskDone = false; 
      localStorage.setItem('todolist', JSON.stringify(toDoList));
    } else {
      checkboxLabel.classList.add('done-task');
      toDoList[taskID - 1].isTaskDone = true;
      localStorage.setItem('todolist', JSON.stringify(toDoList));
    }
  }
});

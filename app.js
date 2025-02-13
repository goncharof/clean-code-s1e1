//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.querySelector(".todo__button_type_add");//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

//New task list item
const createNewTaskElement = function(taskString){
  const listItem = document.createElement("li");
  listItem.className = 'todo__list-item';
  
  //input (checkbox)
  const checkBox = document.createElement("input");//checkbx
  checkBox.className = 'todo__checkbox';
  //label
  const label = document.createElement("label");//label
  //input (text)
  const editInput = document.createElement("input");//text
  //button.edit
  const editButton = document.createElement("button");//edit button
  editButton.className = "todo__button todo__button_type_edit";
  
  //button.delete
  const deleteButton = document.createElement("button");//delete button
  const deleteButtonImg = document.createElement("img");//delete button image
  
  label.innerText = taskString;
  label.className = 'todo__task-label';
  
  //Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "todo__input-text todo__input-text_type_task";
  
  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "todo__button todo__button_type_edit";
  
  deleteButton.className = "todo__button todo__button_type_delete";
  deleteButtonImg.className = "todo__button-icon";
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);
  
  
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask = function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";
  
}

//Edit an existing task.

const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  
  
  const listItem = this.parentNode;
  
  const editInput = listItem.querySelector('.todo__input-text');
  const label = listItem.querySelector(".todo__task-label");
  const editBtn = listItem.querySelector(".todo__button_type_edit");
  const containsClass = listItem.classList.contains("todo__list-item_state_edit-mode");
  //If class of the parent is .edit-mode
  if(containsClass){
    
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  
  //toggle .edit-mode on the parent.
  listItem.classList.toggle("todo__list-item_state_edit-mode");
};


//Delete task.
const deleteTask = function(){
  console.log("Delete Task...");
  
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function(){
  console.log("Complete Task...");
  
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
  
}

const taskIncomplete = function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector(".todo__checkbox");
  const editButton = taskListItem.querySelector(".todo__button_type_edit");
  const deleteButton = taskListItem.querySelector(".todo__button_type_delete");
  
  
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){
  
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
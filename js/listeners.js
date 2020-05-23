const LISTENERS = {};

LISTENERS.logout = function(e){
  localStorage.removeItem('USER');
  window.location.pathname = '/index.html';
}

LISTENERS.login = function(e) { 
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const errors = new Errors();

  errors.checkIfLength(name.value, 4, 'The name must be at least 4 chars long');
  errors.checkIfEmail(email.value)
  errors.checkIfLength(password.value, 4, 'The password must be at least 4 chars long');

  if(errors.values.length) { 
    let output = document.querySelector('.errors');
    //outputs the errors into the dom
    errors.outputErrors(output)
    //clears the values array and sets the output to an empty string
    errors.clearErrors(output);

  } else {
    USER.name = name.value;
    USER.email = email.value;
    USER.password = password.value;

    localStorage.setItem('USER', JSON.stringify(USER));
    window.location.pathname = '/pages/tasks.html';
  }

}

LISTENERS.addTask = function(e) {
      
  e.preventDefault();

  const taskName = document.getElementById('task-name');
  const taskDuration = document.getElementById('task-duration');
  const taskDescription = document.getElementById('task-description');
  const taskDate = document.getElementById('task-date');
  const errors = new Errors();

  errors.checkIfLength(taskName.value, 4, 'Name must have at least 4 chars');
  errors.checkIfDuration(taskDuration.value, 'Duration must be expressed as 12h34m || 34m || 2h');
  errors.checkIfLength(taskDescription.value, 4, 'Description must have at least 4 chars');
  errors.checkIfEmpty(taskDate.value, 'You must select a date');

  if(errors.values.length) {
    let output = document.querySelector('.errors');
    //outputs the errors into the dom
    errors.outputErrors(output)
    //clears the values array and sets the output to an empty string
    errors.clearErrors(output);
  } else {
    const newTask = new Task(taskName.value, taskDuration.value, taskDescription.value, taskDate.value, USER.email);
    //saves the task to the data array in local object;
    newTask.save();

    taskName.value = '';
    taskDuration.value = '';
    taskDescription.value = '';
    taskDate.value = '';

    const actions = document.getElementById('actions');
    //outputs a message on the screen for 3 seconds
    newTask.outputMessage(actions, 'Task Added');
  }

}
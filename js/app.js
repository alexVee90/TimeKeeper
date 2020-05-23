//GLOBAL VARS = USER : {}
//              LISTENERS: {}

if (window.location.pathname === '/index.html') { 

  if(Object.keys(USER).length) window.location.pathname = '/pages/alreadyLoggedIn.html';
  
  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', LISTENERS.login);

} else if (window.location.pathname === "/pages/tasks.html") { 

  if(!Object.keys(USER).length) window.location.pathname = './pages/notLoggedIn.html';

    //adds the name of the user to the navbar
    const { name } = USER;
    const clientName = document.getElementById('client-name');
    clientName.innerText = `Welcome ${name}`;

    const addTaskBtn = document.getElementById('add-task');

    addTaskBtn.addEventListener('click', function(e) {
      
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
        console.log(newTask);

      }

    });


} else if (window.location.pathname === '/pages/alreadyLoggedIn.html') { 
  const logout = document.getElementById('logout');
  console.log(logout);
  logout.addEventListener('click', LISTENERS.logout)
}








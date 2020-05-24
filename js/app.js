//GLOBAL VARS = USER : {}
//              LISTENERS: {}
//              TASK: {}

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


    //adds a task to local storage
    const addTaskBtn = document.getElementById('add-task');
    addTaskBtn.addEventListener('click', LISTENERS.addTask);


    //displays all the tasks on the page
    const tasksShowcase = document.querySelector('.tasks-showcase');  
    const tasks = Task.getTasks().filter(task => task.belongsTo === USER.email);
    Task.renderInList(tasksShowcase, tasks)


    //delete task
    const deleteBtns = document.getElementsByClassName('delete-btns');
    Array.from(deleteBtns).forEach(btn => {
      btn.addEventListener('click', function(e) { 
        const taskId = e.target.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.value;
        Task.removeTask(taskId);
        location.reload();
      });
    });


    //edit Task
    const editBtns = document.getElementsByClassName('edit-btns');
    Array.from(editBtns).forEach(btn => {
      btn.addEventListener('click', function(e) {
        const taskId = e.target.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.value;
        const parentElement = e.target.parentElement.parentElement;

        //renders an edit form in the li
        Task.renderEditForm(taskId, parentElement);

        //updates the task with the new data
        const updateBtn = document.getElementById('update-btn');
        updateBtn.addEventListener('click', LISTENERS.updateTask);

      });
    });


    //get total
    const totalElement = document.getElementById('total');
    const result = Task.getTotal(USER.email);
    totalElement.innerText = `Total time worked today: ${result}`

} else if (window.location.pathname === '/pages/alreadyLoggedIn.html') { 
  const logout = document.getElementById('logout');
  console.log(logout);
  logout.addEventListener('click', LISTENERS.logout)
}









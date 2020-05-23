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



} else if (window.location.pathname === '/pages/alreadyLoggedIn.html') { 
  const logout = document.getElementById('logout');
  console.log(logout);
  logout.addEventListener('click', LISTENERS.logout)
}








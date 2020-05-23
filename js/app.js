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

    //adds a task to local storage
    const addTaskBtn = document.getElementById('add-task');
    addTaskBtn.addEventListener('click', LISTENERS.addTask);

    //displays all the tasks on the page
    const tasksShowcase = document.querySelector('.tasks-showcase');  
    const tasks = Task.getTasks();
    tasks.forEach(item => {
      tasksShowcase.innerHTML += `<li class="task-item">
      <section class="item-info">
        <ul class="item-info-header">
          <li class="item-info-name">
            Name: ${item.name}
          </li>
          <li class="item-info-duration">
            Duration: ${item.duration}
          </li>
          <li class="item-info-date">
            Date: ${item.date}
          </li>
          <li class="item-info-difficulty">
          </li>
        </ul>
        <div class="item-info-main">
          ${item.description}
        </div>
      </section>
      <section class="item-actions">
        <i id="delete-btn" class="fas fa-trash"></i>
        <i id="edit-btn" class="fas fa-edit"></i>
      </section>
    </li>`
    })



} else if (window.location.pathname === '/pages/alreadyLoggedIn.html') { 
  const logout = document.getElementById('logout');
  console.log(logout);
  logout.addEventListener('click', LISTENERS.logout)
}








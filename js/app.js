//GLOBAL VARS = USER : {}
//              LISTENERS: {}
//              TASK: class
//              ERRORS: class
 

if (window.location.pathname === '/index.html') { 

  //redirects if the user is not logged in;
  if(Object.keys(USER).length) window.location.pathname = '/pages/alreadyLoggedIn.html';
  
  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', LISTENERS.login);

} else if (window.location.pathname === "/pages/tasks.html") { 

  //redirects if the user is not logged in;
  if(!Object.keys(USER).length) window.location.pathname = './pages/notLoggedIn.html';


    //adds the name of the user to the navbar
    const { name } = USER;
    const clientName = document.getElementById('client-name');
    clientName.innerText = `Welcome ${name}`;

    

    //gets the initial value for the selected day from local storage or the current day if non-existent
    let selectedValue = localStorage.getItem('selectedValue') || Task.getCurrentDay();

    //render unique dates in the select tag
    const selectElement = document.getElementById('period');
    const uniqueSelectVals = Task.getUniqueDates(USER.email);
    uniqueSelectVals.forEach(item => {
      if(item === selectedValue) {
        return selectElement.innerHTML += `<option value=${item} selected=${true}>${item}</option>`
      } else {
        return selectElement.innerHTML += `<option value=${item}>${item}</option>`
      }
      
    });

    //get selected date
    const periodBtn = document.getElementById('period-btn');
    periodBtn.addEventListener('click', function(e) {
      e.preventDefault();
      selectedValue = selectElement.value;
      localStorage.setItem('selectedValue', selectedValue)
      location.reload();
    });



    //adds a task to local storage
    const addTaskBtn = document.getElementById('add-task');
    addTaskBtn.addEventListener('click', LISTENERS.addTask);


    //displays all the tasks on the page
    const tasksShowcase = document.querySelector('.tasks-showcase');  
    const filteredTasksByDateAndEmail = Task.getTasksByDate(selectedValue, USER.email);
    Task.renderInList(tasksShowcase, filteredTasksByDateAndEmail);


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
    const result = Task.getTotal(USER.email, selectedValue);
    totalElement.innerText = `Total time worked: ${result}`;

} else if (window.location.pathname === '/pages/alreadyLoggedIn.html') { 

  const logout = document.getElementById('logout');
  logout.addEventListener('click', LISTENERS.logout);

}









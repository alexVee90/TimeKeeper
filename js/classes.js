class Errors {
  constructor() {
    this.values = []
  }

  //@desc adds an error message to the values array
  //@params string
  addError(msg) {
    this.values.push(msg)
  }

  //@desc outputs a div with the values of each array element
  //@params html element in which the divs should added
  outputErrors(output) {
    this.values.forEach(msg => {
      output.innerHTML += `<div>${msg}</div>`
    });
  }

  //@desc clears the errors array after 3seconds and sets the html element to an empty string
  //@params html element in which the divs should added
  clearErrors(output) { 
    setTimeout(() => {
      this.values = [];
      output.innerHTML = '';
    }, 3000)
  }

  //@desc checks if a values length meets a certain criteria and adds a message to the values array
  //@params string | num | string : value to be checked | criteria to be met | custom message 
  checkIfLength(input, num, msg) {
    if(input.length < num) this.addError(msg);
  }

  //@desc checks if a value is not an empty string
  //@params string | msg        :     string : value to be checked | custom message 
  checkIfEmpty(input, msg) {
    if(!input) this.addError(msg);
  }

  //@desc checks if the input is of the correct format 3m
  //@params string 
  //@returns boolean 
  checkIfMinutes(input) {
    const minuteCheck = /^[0-9][0-9]?m$/i
    return minuteCheck.test(input)
  }

  //@desc checks if the input is of the correct format 12h
  //@params string 
  //@returns boolean 
  checkIfHours(input) {
    const hourCheck = /^[0-9][0-9]?h$/i;
    return hourCheck.test(input);
  }

  //@desc checks if a value is of the correct format (12h3m || 3m || 3h)
  //@params string | msg        :     string : value to be checked | custom message 
  checkIfDuration(input, msg) {
    const fullDateCheck = /^[0-9][0-9]?h[0-9][0-9]?m$/i;
    if(!this.checkIfHours(input) && !this.checkIfMinutes(input) && !fullDateCheck.test(input)) this.addError(msg);
  }

  //@desc checks if a value is of type email 
  //@params string : value to be checked
  checkIfEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(input).toLowerCase())) this.addError('Email must be of type email');
  }

}

class Task {
  constructor(name, duration, description, date, user) {
    this.name = name;
    this.duration = duration;
    this.description = description;
    this.date = date;
    this.belongsTo = user;
    this.id = Math.floor(Math.random() * 10000);
  }



  //@desc pushes the newly created task into the data array from local storage
  save() { 
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.push(this);
    localStorage.setItem('data', JSON.stringify(data));
  }



  //@desc STATIC METHOD  -  gets all the tasks from local storage
  //@returns an array of tasks 
  static getTasks() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    return data;
  }



  //@desc retrieves a task with the provided id
  //@returns the task;
  static getTask(id) {
    const data = this.getTasks();
    const task = data.find(item => Number(id) === Number(item.id));
    return task;
  }



  //@desc STATIC METHOD  -  removes a task with a given id
  //@params number 
  //@returns an array of tasks 
  static removeTask(id) {
    const tasks = this.getTasks();
    const newTasks = tasks.filter(item => Number(item.id) !== Number(id));
    localStorage.setItem('data', JSON.stringify(newTasks));
  }



  //@desc STATIC METHOD  -  updated a task from the array
  //@params object - task of type Task
  static updateTask(task) {
    const tasks = this.getTasks();
    const newTasks = tasks.map(item => Number(item.id) === Number(task.id) ? task : item);
    localStorage.setItem('data', JSON.stringify(newTasks));
  }



  static getTotal() {

    let total = new Date(Date.now());
    total.setHours(0);
    total.setMinutes(0);
    total.setSeconds(0);

    const tasks = this.getTasks();

    tasks.forEach(item => {
      const duration = item.duration.replace(/[hm]/ig, ':');
      const itemDate = new Date(`${item.date} ${duration}`);

      const itemHours = itemDate.getHours();
      total.setHours(total.getHours() + itemHours);
      
      const itemMinutes = itemDate.getMinutes();
      total.setMinutes(total.getMinutes() + itemMinutes);
    });

    const totalHours = total.getHours();
    const totalMinutes = total.getMinutes();

    const result = `${totalHours}h${totalMinutes}m`;

    return result;

  }



  //@desc STATIC METHOD  -  outputs to a provided element all the tasks from local storage
  //@params html element | array 
  static renderInList(ul, tasks) {
    tasks.forEach(item => {
      ul.innerHTML += `<li class="task-item">
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
          <input type="hidden" name="id" value=${item.id}>
        </ul>
        <div class="item-info-main">
          ${item.description}
        </div>
      </section>
      <section class="item-actions">
        <i class="fas fa-trash delete-btns"></i>
        <i class="fas fa-edit edit-btns"></i>
      </section>
    </li>`
    });
  }



  //@desc STATIC METHOD  -  outputs to a provided element an edit form
  //@params String | html element 
  static renderEditForm(id, element) {
    const task = this.getTask(id);

    task.name = task.name.split(' ').join('');
    task.description = task.description.split(' ').join('');

    element.innerHTML = `

      <form class="edit-form">
        <section class="item-info">
          <div className="item-info-header">
            <input type="text" name="update-name" id="update-name" value=${task.name} />
            <input type="text" name="update-duration" id="update-duration" value=${task.duration} />
            <input type="date" name="update-date" id="update-date" value=${task.date} />
            <input type="hidden" name="update-id" id="update-id" value=${task.id} />
          </div>
          <div className="item-info-main">
            <textarea name="update-description" id="update-description" cols="30" rows="10" placeholder=${task.description}></textarea>
          </div>
      </section>
      <button id="update-btn" class="btn">Submit</button>
    </form>`
  }

}

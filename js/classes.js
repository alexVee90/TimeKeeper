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


  //@desc checks if a value is of the correct format (12h3m || 3m || 3h)
  //@params string | msg        :     string : value to be checked | custom message 
  checkIfDuration(input, msg) {
    const hourCheck = /^[0-9][0-9]?h$/i;
    const minuteCheck = /^[0-9][0-9]?m$/i;
    const fullDateCheck = /^[0-9][0-9]?h[0-9][0-9]?m$/i;

    if(!hourCheck.test(input) && !minuteCheck.test(input) && !fullDateCheck.test(input)) this.addError(msg);
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
  //@returns the task;
  save() { 
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.push(this);
    localStorage.setItem('data', JSON.stringify(data));
    return this;
  }

  //@desc outputs a message to the screen and clears after 3seconds
  //@params html element | string 
  outputMessage(element, msg) {
    element.innerText = msg;
    setTimeout(() => {
      element.innerText = '';
    }, 3000);
  }

  //@desc STATIC METHOD  -  gets all the tasks from local storage
  //@returns an array of tasks 
  static getTasks() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    return data;
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
    });
  }

}
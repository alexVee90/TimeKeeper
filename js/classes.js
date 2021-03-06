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
    const minuteCheck = /^[0-5]?[0-9]m$/i;
    return minuteCheck.test(input);
  }

  //@desc checks if the input is of the correct format 12h
  //@params string 
  //@returns boolean 
  checkIfHours(input) {
    const hourCheck = /^[0-9][0-9]?h$/i;
    const h = input.substr(0, input.length - 1);
    if(Number(h) > 23) return false;
    return hourCheck.test(input);
  }

  //@desc checks if the input is of the correct format 12h:30m
  //@params string 
  //@returns boolean 
  checkIfFullDate(input) {
    const fullDateCheck = /^[0-9]?[0-9]h[0-5]?[0-9]m$/i;
     if(fullDateCheck.test(input)) {
       const h = input.split('h')[0];
       return this.checkIfHours(`${h}h`);
     }
  }

  //@desc checks if a value is of the correct format (12h3m || 3m || 3h)
  //@params string | msg        :     string : value to be checked | custom message 
  checkIfDuration(input, msg) {
    if(!this.checkIfHours(input) && !this.checkIfMinutes(input) && !this.checkIfFullDate(input)) this.addError(msg);
  }

  //@desc checks if a value is of type email 
  //@params string : value to be checked
  checkIfEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(input).toLowerCase())) this.addError('Email must be of type email');
  }


}








class Task {
  constructor(name, duration, description, difficulty, date, user) {
    this.name = name;
    this.duration = duration;
    this.description = description;
    this.difficulty = difficulty;
    this.date = date;
    this.belongsTo = user;
    this.id = Math.floor(Math.random() * 10000);
  }



  //@desc pushes the newly created task into the data array from local storage
  static save(task) { 
    const data = JSON.parse(localStorage.getItem('data')) || [];

    const errors = this.checkIfOverFullDay(task, USER);

    if(errors.values.length) {
      const errorDiv = document.querySelector('.errors');
      errors.outputErrors(errorDiv);
      errors.clearErrors(errorDiv);
      return false;
    } else {
      data.push(task);
      localStorage.setItem('data', JSON.stringify(data));
      return true;
    }

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



  //@desc gets the tasks that corespond to the period specified and belong to a certain user
  //@params string | string
  static getTasksByDate(date, email) {
    const tasks = this.getTasks().filter(item => item.belongsTo === email);
    const returnedTasks = tasks.filter(item => item.date === date);
    return returnedTasks;
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
      const errors = this.checkIfOverFullDay(task, USER, true);

     if(errors.values.length) {
       return false
     } else {
      const tasks = this.getTasks();
      const newTasks = tasks.map(item => Number(item.id) === Number(task.id) ? task : item);
      localStorage.setItem('data', JSON.stringify(newTasks));
      return true
     }
  }


  
  static checkIfOverFullDay(task, user, isNew = false) {
    const errors = new Errors();

    const taskTotalHoursInMinutes = this.turnDurationToMinutes(task.duration);

     //checks if there is we are in edit mode and returns either totalh or totalh - the updated task
    let totalh = isNew ? this.getTotal(user.email, task.date, task) : this.getTotal(user.email, task.date);

    const totalHoursInMinutes = this.turnDurationToMinutes(totalh);

    if((totalHoursInMinutes + taskTotalHoursInMinutes) >= 1440) {
      errors.addError('Nobody can work for more than 24h per day');
    }
    return errors;
  }




  static turnDurationToMinutes(duration) {
    const customDate = this.createDate('2020-01-01', duration);
    return (customDate.getHours() * 60) + customDate.getMinutes();
  }




  //@desc takes in the date(d/m/y) and time spent string (which is parsed as per requirements)
  //@params string | string 
  //@returns a date object 
  static createDate(date, duration) {

    const adjDuration = duration.replace(/[hm]/ig, ':');
    const itemDate = new Date(`${date} ${adjDuration}`);

    return itemDate;
  }




  //@desc STATIC METHOD  -  gets the total number of hours worked 
  //@returns a string with the total number of hours and minutes worked
  static getTotal(email, date, task = null) {

    let total = new Date(Date.now());
    total.setHours(0);
    total.setMinutes(0);
    total.setSeconds(0);

    const tasksforProvidedEmail = this.getTasks().filter(item => item.belongsTo === email);
    let tasksforCurrentDay = tasksforProvidedEmail.filter(item => item.date === date);

    //checks if there is we are in edit mode and removes the task from the list
    if(task) {
      tasksforCurrentDay = tasksforCurrentDay.filter(item => Number(item.id) !== Number(task.id));
    }

    if(tasksforCurrentDay.length) {

      tasksforCurrentDay.forEach(item => {
        //returns the tasks date as a date obj
        const itemDate = this.createDate(item.date, item.duration);

        const itemHours = itemDate.getHours();
        total.setHours(total.getHours() + itemHours);
        
        const itemMinutes = itemDate.getMinutes();
        total.setMinutes(total.getMinutes() + itemMinutes);
      });

    }

    const totalHours = total.getHours();
    const totalMinutes = total.getMinutes();

    const result = `${totalHours}h${totalMinutes}m`;

    return result;

  }



  //@returns the current date in format yyyy-mm-dd
  static getCurrentDay() {
    const dummyDate = new Date(Date.now());
    const year = dummyDate.getFullYear();
    const month = dummyDate.getMonth() + 1;
    const day = dummyDate.getUTCDate();

    let newMonth = String(month);
    let newDay = String(day);

    if(newMonth.length < 2) {
      newMonth = `0${month}`
    }

    if(newDay.length < 2) {
      newDay = `0${day}`
    }

    const current = `${year}-${newMonth}-${newDay}`

    return current;
  }



 //@returns an array of the unique dates for a certain user 
  static getUniqueDates(email) {
   const tasks = Task.getTasks().filter(item => item.belongsTo === email)
                                .map(item => item.date)
                                .filter((item, i, arr) => arr.indexOf(item) === i);
    return tasks;
  }

  //@desc STATIC METHOD  -  computes the difficulty based on the duration
  //@params obj | string
  //@returns a string 
  static computeDifficulty(date, duration) {

    const td = this.createDate(date, duration);
    const h = td.getHours() * 60;
    const total =  h + td.getMinutes();
    
    if(total > 0 && total < 90) return 'green';
    if(total >= 90 && total < 180) return 'yellow';
    if(total >= 180) return 'red';

  }

  




  //@desc STATIC METHOD  -  outputs to a provided element all the tasks from local storage
  //@params html element | array 
  static renderInList(ul, tasks) {

    if(tasks.length) {

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
              <p>Difficulty:</p> <span class=${item.difficulty}></span>
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

    } else {
      ul.innerHTML = `<p class="main-header">No more items for this day, try selecting an available date from the dropdown and hitting the select button. If there are no more available dates, try adding another task</p>`
    }

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
          <div class="item-info-header">
            <div class="form-group">
              <label for="update-name">Name</label>
              <input type="text" name="update-name" id="update-name" value=${task.name} />
            </div>
            <div class="form-group">
              <label for="update-duration">Duration</label>
              <input type="text" name="update-duration" id="update-duration" value=${task.duration} />
            </div>
            <div class="form-group">
              <label for="update-date">Date</label>
              <input type="date" name="update-date" id="update-date" value=${task.date} />
            </div>
            <input type="hidden" name="update-id" id="update-id" value=${task.id} />
          </div>
          <div class="item-info-main">
            <textarea name="update-description" id="update-description" cols="30" rows="10" placeholder=${task.description}></textarea>
          </div>
      </section>
      <button id="update-btn" class="btn">Submit</button>
    </form>`
  }

}


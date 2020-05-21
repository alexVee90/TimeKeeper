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

  //@desc checks if a value is of type email 
  //@params string : value to be checked
  checkIfEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(input).toLowerCase())) this.addError('Email must be of type email');
  }

}
class Errors {
  constructor() {
    this.values = []
  }

  addError(msg) {
    this.values.push(msg)
  }

  outputErrors(output) {
    this.values.forEach(msg => {
      output.innerHTML += `<div>${msg}</div>`
    });
  }

  clearErrors(output) { 
    setTimeout(() => {
      this.values = [];
      output.innerHTML = '';
    }, 3000)
  }

  checkIfLength(input, num, msg) {
    if(input.length < num) this.addError(msg);
  }

  checkIfEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(input).toLowerCase())) this.addError('Email must be of type email');
  }

}
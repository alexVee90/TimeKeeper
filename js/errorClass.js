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
}
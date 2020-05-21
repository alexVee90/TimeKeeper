const LISTENERS = {};

LISTENERS.logout = function(e){
  localStorage.removeItem('USER');
  window.location.pathname = '/index.html';
}

LISTENERS.login = function(e) { 
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const errors = new Errors();

  errors.checkIfLength(name.value, 4, 'The name must be at least 4 chars long');
  errors.checkIfEmail(email.value)
  errors.checkIfLength(password.value, 4, 'The password must be at least 4 chars long');

  if(errors.values.length) { 
    let output = document.getElementById('errors');
    //outputs the errors into the dom
    errors.outputErrors(output)
    //clears the values array and sets the output to an empty string
    errors.clearErrors(output);

  } else {
    USER.name = name.value;
    USER.email = email.value;
    USER.password = password.value;

    localStorage.setItem('USER', JSON.stringify(USER));
    window.location.pathname = '/pages/tasks.html';
  }

}
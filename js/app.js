let user = JSON.parse(localStorage.getItem('user')) || {};

if (window.location.pathname === '/index.html') { 

  if(Object.keys(user).length) window.location.pathname = '/pages/alreadyLoggedIn.html';
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  let errors = new Errors();
  
  loginBtn.addEventListener('click', function(e) { 
    e.preventDefault();
    user.name = name.value;
    errors.checkIfLength(name.value, 4, 'The name must be at least 4 chars long');

    user.email = email.value;
    errors.checkIfEmail(email.value)

    user.password = password.value;
    errors.checkIfLength(password.value, 4, 'The password must be at least 4 chars long');

    if(errors.values.length) { 
      let output = document.getElementById('errors');

      //outputs the errors into the dom
      errors.outputErrors(output)
      //clears the values array and sets the output to an empty string
      errors.clearErrors(output);

    } else {
      window.location.pathname = '/pages/tasks.html';
      localStorage.setItem('user', JSON.stringify(user));
    }
  });

} else if (window.location.pathname === "/pages/tasks.html") { 

  if(!Object.keys(user).length) window.location.pathname = './pages/notLoggedIn.html';

    const { name, email, password } = user;
    const clientName = document.getElementById('client-name');
    clientName.innerText = `Welcome ${name}`;


} else if (window.location.pathname === '/pages/alreadyLoggedIn.html') { 
  const logout = document.getElementById('logout');
  logout.addEventListener('click', function(e){
    localStorage.removeItem('user');
    window.location.pathname = '/index.html';
  })
}










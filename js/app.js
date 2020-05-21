//

let user = JSON.parse(localStorage.getItem('user')) || {};

if (window.location.pathname === '/index.html') { 

  if(Object.keys(user).length) window.location.pathname = './pages/alreadyLoggedIn.html';
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  let errors = [];
  
  loginBtn.addEventListener('click', function(e) { 
    e.preventDefault();
    user.name = name.value;
    if(name.value.length < 4) errors.push('The Name must be at least 4 characters long');

    user.email = email.value;
    if(email.value.length < 4) errors.push('The Email must be at least 4 characters long');

    user.password = password.value;
    if(password.value.length < 4) errors.push('The Passsword must be at least 4 characters long');

    if(errors.length) { 
      let output = document.getElementById('errors');

      errors.forEach(msg => {
        output.innerHTML += `<div>${msg}</div>`
      });

      setTimeout(() => {
        errors = [];
        output.innerHTML = '';
      }, 3000)

    } else {
      window.location.pathname = './pages/tasks.html';
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






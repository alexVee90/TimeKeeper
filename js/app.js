//GLOBAL VARS = USER : {}
//              LISTENERS: {}

if (window.location.pathname === '/index.html') { 

  if(Object.keys(USER).length) window.location.pathname = '/pages/alreadyLoggedIn.html';
  
  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', LISTENERS.login);

} else if (window.location.pathname === "/pages/tasks.html") { 

  if(!Object.keys(USER).length) window.location.pathname = './pages/notLoggedIn.html';

    const { name, email, password } = USER;
    const clientName = document.getElementById('client-name');
    clientName.innerText = `Welcome ${name}`;


} else if (window.location.pathname === '/pages/alreadyLoggedIn.html') { 
  const logout = document.getElementById('logout');
  console.log(logout);
  logout.addEventListener('click', LISTENERS.logout)
}








const USER = JSON.parse(localStorage.getItem('USER')) || {};
const URL = window.location.pathname.split('/');

const createRoute = route => {
  let newUrl = URL.slice(0, URL.length - 1)
  if(newUrl[newUrl.length - 1] === 'pages') newUrl.pop();
  newUrl.push(route);
  return newUrl.join('/');
}
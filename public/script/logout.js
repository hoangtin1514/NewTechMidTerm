function logout()
{
  //prevent back and forward button after logout
  history.pushState(null, null, '/login');
  window.addEventListener('popstate', function () {
  history.pushState(null, null, '/login');
});


}

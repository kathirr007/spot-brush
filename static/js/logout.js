function logout(){
    if(cognitoUser != null) {
       cognitoUser.signOut();	  
    }
}

$('#logout').on('click', function(){
  logout();
  window.location.href = '/login.html';
});
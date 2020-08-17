var email;
var password;
var firstname;
var lastname;
var poolData;

function registerButton() {
  firstname =  document.getElementById("firstname").value;
  lastname =  document.getElementById("lastname").value;	
  email = document.getElementById("email").value;
  password =  document.getElementById("new_password").value;
  
  poolData = {
      UserPoolId : _config.cognito.userPoolId, // Your user pool id here
      ClientId : _config.cognito.clientId // Your client id here
    };		
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var attributeList = [];
  
  var attrFirstname = {
    Name : 'given_name', 
    Value : firstname, //get from form field
  };
  
  var attrLastname = {
    Name : 'family_name', 
    Value : lastname, //get from form field
  };

  var attributeFirstname = new AmazonCognitoIdentity.CognitoUserAttribute(attrFirstname);
  var attributeLastname = new AmazonCognitoIdentity.CognitoUserAttribute(attrLastname);
  
  
  attributeList.push(attributeFirstname);
  attributeList.push(attributeLastname);

  userPool.signUp(email, password, attributeList, null, function(err, result){
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    cognitoUser = result.user;
    document.getElementById("titleheader").innerHTML = "<strong>Check your email for a verification link</strong>";
    //change elements of page
    // alert('success');
  });
}

$('#signup_form').on('click', function(){
  registerButton();
});
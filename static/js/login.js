jQuery.validator.addMethod("alphanumeric", function(value, element) {
  return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
}, "Password must contain at least one numeric and one alphabetic character.");

$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='signin']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      password: {
        required: true
      }
    },
    // Specify validation error messages
    messages: {
      password: {
        required: "Please enter a password",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      // form.submit();
    }
  });
  $("form[name='signup']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      new_password: {
        required: true,
        minlength: 8,
        alphanumeric: true
      },
      confirm_password: {
        required: true,
        minlength: 8,
        equalTo: "#new_password"
      }
    },
    // Specify validation error messages
    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      email: "Please enter a valid email address",
      new_password: {
        required: "Please enter a new password",
        minlength: "Your password must be at least 8 characters long"
      },
      confirm_password: {
        required: "Please confirm the password",
        equalTo: "Password does not match"
      }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      $('#signup_form').on('click', function(){
        // form.submit();
      });
    }
  });
});


function signInButton() {
    var authenticationData = {
        Username : document.getElementById("emailSignin").value,
        Password : document.getElementById("password").value
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
	  var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId, // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
        Username : document.getElementById("emailSignin").value,
        Pool : userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        window.location.href = '/index-old.html';
        return;
      },

      onFailure: function(err) {
        return alert(err.message || JSON.stringify(err));
      }
    });
}

$('#signin_form').on('click', function(){
  signInButton();
});




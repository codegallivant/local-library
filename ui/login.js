function loadLoginForm() {
        var loginHTML=`
       <h3>Login</h3>
        <form onsubmit="return false;">
            <input type="text" id="login_username" placeholder="Username" class="username"/>
            <br><br>
            <input type="password" placeholder="Password" id="login_password" class="password"/>
            <br><br>
            <input value="Login" type="submit" id="login_btn" class="btn btn-primary" onclick="validate('login')"/>
        </form>
        <br>
        <button id="forgotPwd" onclick="resetpwd();" style="background:none; border:none;">Forgot password?</button>
        `;
        document.getElementById("login_area").innerHTML=loginHTML;
        document.getElementById('login_area_head').innerHTML = "Librarian Login";
  }

var loginF1 = function () {
    //Create a request object
    var submit=document.getElementById('login_btn');
    submit.value="Loading...";
    submit.disabled=true;
	var request = new XMLHttpRequest();
    //Capture the response and store it in a variable
     request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                    window.location.reload();               
               } else if(request.status===403 || request.status===400 ) {
                   alert('Username/Password invalid.');
                   submit.disabled=false;
                  submit.value="Login";
               } else if (request.status===500) {
                   alert('Something went wrong on the server.(ERROR 500)');
                   submit.disabled=false;
                  submit.value="Login";
               } else{
                   alert('Something went wrong on the server.');
                   submit.disabled=false;
                  submit.value="Login";
               }
               loadLogin();
            }
        };

        var username=document.getElementById('login_username').value;
        var password = document.getElementById('login_password').value;
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
    };

// var loginF2 = function() {
//     var register = document.getElementById("register_btn");
//     register.value = "Loading...";
//     register.disabled = true;
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function() {
//         if (request.readyState === XMLHttpRequest.DONE) {
//             if (request.status === 200) {
//                 register.disabled = false;
//                 register.value = "Register";
//             } else if (request.status === 403 || request.status === 400) {
//                 alert('Username/Password invalid');
//                 register.disabled = false;
//                 submit.value = "Register";
//             } else if (request.status === 500) {
//                 alert('Something went wrong on the server.(ERROR 500)');
//                 register.disabled = false;
//                 register.value = "Register";
//             } else {
//                 alert('Something went wrong on the server.');
//                 register.disabled = false;
//                 register.value = "Register";
//             }
//             loadLogin();
//         }
//     };

//     var username = document.getElementById('register_username').value;
//     var password = document.getElementById('register_password').value;
//     request.open('POST', '/login', true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify({
//         username: username,
//         password: password
//     }));

// };
var registerF = function() {
    //Create a request object
    var register = document.getElementById("register_btn");
    register.value = "Loading";
    register.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                alert('Account created successfully.');
                register.value = 'Register';
                register.disabled = false;
                // loginF2();
            } else if (request.status === 403) {
                alert('The username or email given is already in use. Please select another.');
                register.value = 'Register';
                register.disabled = false;

            } else if (request.status === 500) {
                alert('The username or email given is already in use. Please select another.');
                register.value = 'Register';
                register.disabled = false;

                register.value = 'Register';
                register.disabled = false;
            } else {
                alert('Oops... We couldn\'t register you... (ERROR ' + request.status + ')');
            }
        }
    };

    var username = document.getElementById('register_username').value;
    var password = document.getElementById('register_password').value;
    var email = document.getElementById('register_email').value;
    request.open('POST', '/create-user', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        username: username,
        password: password,
        email: email
    }));

};

var validate = function(type) {
    var request = new XMLHttpRequest();
    var btn = document.getElementById(type + '_btn');
    btn.disabled = true;
    //Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take some action
            if (request.status === 200) {
                var resp = this.response;
                if (resp === 'Success') {
                    if (type === 'register') {
                        btn.value = 'Loading...';
                        registerF();
                    } else if (type === 'login') {
                        btn.value = 'Loading...';
                        loginF1();
                    } else if(type === 'updateCred') {
                        updateCred2();
                    } else {
                        alert('Wrong type... Something went wrong on the server.');
                    }
                } else if (resp === 'email') {
                    btn.disabled = false;
                    alert('Invalid Email. Please type your email in the correct format.');
                } else if (resp === 'username') {
                    btn.disabled = false;
                    alert('Invalid Username. Your username should be more than 4 characters.');
                } else if (resp === 'password') {
                    btn.disabled = false;
                    alert('Invalid password. Your password should be more than 4 characters.');
                } else if (resp === 'Failure') {
                    btn.disabled = false;
                    alert('Invalid credentials. Your password and username should be more than 4 characters. Please type your email in the correct format');
                } else if (resp === 'usernamepassword') {
                    btn.disabled = false;
                    alert('Invalid password and username. Your password and username should be more than 4 characters.');
                } else if (resp === 'passwordemail') {
                    btn.disabled = false;
                    alert('Invalid password and email. Your password should be more than 4 characters. Please type your email in the correct format.');
                } else if (resp === 'usernameemail') {
                    btn.disabled = false;
                    alert('Invalid email and username. Your username should be more than 4 characters. Please type your email in the correct format.');
                } else {
                    alert('Something went wrong while processing your credentials.');
                }
            } else {
                alert('Something went wrong on the server.');
            }
        }
    };
    if (type === "register") {
        var username = document.getElementById('register_username').value;
        var password = document.getElementById('register_password').value;
        var email = document.getElementById("register_email").value;
    }
    if (type === "login") {
        var username = document.getElementById('login_username').value;
        var password = document.getElementById('login_password').value;
    }
    if (type === "updateCred") {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
    }

    if (type === "register") {
        request.open('GET', '/' + type + '-validate-input?username=' + username + '&password=' + password + '&email=' + email, true);
    }
    if (type === "login") {
        request.open('GET', '/' + type + '-validate-input?username=' + username + '&password=' + password, true);
    }
    if (type === "updateCred") {
        request.open('GET', '/' + type + '-validate-input?username=' + username + '&password=' + password + '&email=' + email, true);
    }
    request.send(null);
};

function loadLoggedInUser(login, username, password, email) {
    if(document.getElementById('login_area')) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3><i> ${username} </i></h3>
        <br>
        <form onsubmit="return false;">
        <P id="login_area_p">
        Username:<br>
        <input type="text" class='username' id="username" value='${username}' class = 'cred' disabled>
        <br><br>
        Email:<br>
        <input type="email" id='email' value='${email}' class = 'cred email' disabled>
        </P>
        <br>
        <button id="updateCred_btn" onclick="updateCred1();" class="btn btn-warning">Edit Credentials</button>
        </form>
        <br>
        <button class="btn btn-primary"  onclick="$.post('/logout'); window.location.reload();">Logout</button>
        <br><br>
        <button class="btn btn-info" onclick="register_modal();">Register new librarian</button>


        <!--<button class="customButton" onclick="$.post('/delete-account');">Delete Account</button>-->
        <script src='/ui/update_cred.js'></script>
    `;
    var loginAreaHead = document.getElementById('login_area_head');
    loginAreaHead.innerHTML = "Librarian Profile";
    }
};

var register_modal = function() {
    var content = `        
        <form onsubmit="return false;">
            <p id="register_area_p">
                Username: <br>
                <input type="text" class='username' id="register_username">
                <br><br>
                Password:<br>
                <input type="text" class="password" id="register_password">
                <br><br>
                Email:<br>
                <input type="email" id='register_email' class="email">
            </p>
        </form>`
    var registerModal = newModal("Register new librarian",content,`<button id="register_btn" onclick="validate('register');" class="btn btn-primary">Register</button>`,"lg");
    registerModal.toggle();
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var output = JSON.parse(this.response);
                loadLoggedInUser(output, output[0], output[1], output[2]);
            } else {
                loadLoginForm();
            }
        }
    };

    request.open('POST', '/check-login', true);
    request.send();
}


loadLogin();


var resetpwd = function () {
    console.log("reset");
    var resPWD = document.getElementById("forgotPwd");
    //Create a request object
    var request = new XMLHttpRequest();
    //Capture the response and store it in a variable
    resPWD.disabled=true;
    resPWD.value='Requesting server... ';
    request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
               if(request.status===403 || request.status===400 ) {
                   alert('This username does not exist.');
                   resPWD.disabled=false;
                  resPWD.value="Submit";
               } else{
                   alert('Your new password has been sent to the email you had provided when registering.');
                   resPWD.disabled=false;
                   resPWD.value="Submit";
               }
               
            }
        };
        var username=document.getElementById('login_username').value;
        request.open('POST', '/send-password_email', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username}));
};


// function loadUpdateForm() {
//     console.log(window.location.href);
//         var loginHTML=`
//             <h4>Update credentials</h4>
//             <div>
//                 <form>
//                 <input type="password" placeholder="Password" id="password"/>
//                 <br><br>
//                 <input value="Update Credentials" type="submit" id="updateCred_btn"/>
//                 </form>
//             </div>
//         `;
// };




var updateCred1 = function () {
    //Create a request object
    var submit = document.getElementById("updateCred_btn");
    document.getElementById('login_area_p').innerHTML += `<br><br>Password:<br><input type="password" class='password' id="password" value='' class = 'cred'>`
    document.getElementById('username').disabled = false;
    document.getElementById('email').disabled = false;
    submit.innerHTML="Update Credentials";
    submit.setAttribute( "onclick", "validate('updateCred');" );
};

var updateCred2 = function() {
    var submit = document.getElementById("updateCred_btn");
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var request = new XMLHttpRequest();
     request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                    loadLogin();
               } else if(request.status===403 || request.status===400 ) {
                   alert('Username/Password invalid');
                   submit.disabled=false;
                  submit.value="Update Credentials";
               } else if (request.status===500) {
                   alert('Something went wrong on the server.');
                   submit.disabled=false;
                  submit.value="Update Credentials";
               } else{
                   alert('Something went wrong on the server.');
                   submit.disabled=false;
                  submit.value="Update Credentials";
               }
      
            }
        };
        request.open('POST', '/credentials_update', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password, email: email}));
    };
function loadLoginForm() {
      //console.log(window.location.href);
      var loginHTML = `
      <H3>Login</H3>
     <div>
		<form>
          <input type="text" id="username" placeholder="username"/>
          <input type="password" id="password"/>
          <br>
          <input type="submit" id="login_btn"/>
		</form>
      </div>
      `;


}
function hideButton() {
	var parentButton1 = document.getElementById('AdvSidebarButton1');
	var parentButton2 = document.getElementById('AdvSidebarButton2');
	   	parentButton1.style.display="block";
    parentButton2.style.display="none";
	
}
function loadLoggedInUser(login, username, password, email) {
    var parentButton1 = document.getElementById('AdvSidebarButton');
	var parentButton2 = document.getElementById('AdvSidebarButton2');
	if(document.getElementById('login_area')) {
	var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3><i> ${username} </i></h3>
		<br>
		<form>
		<P>
		Username:
		<input type="text" id='username' value='${username}' class = 'cred' disabled>
		<br><br>
		Password:
		<input type="email" id='email' value='${email}' class = 'cred' disabled>
		</P>
		<br><br>
		<a href="/settings"><button style='font-size: 0.8em; height: 30px;'>Edit</button></a>
		</form>
	<br><br><br>
        <a href="/logout"><button>Logout</button></a>
        
        <a href="/delete-account"><button>Delete Account</button></a>
		<script src='/ui/update_cred.js'></script>
    `;
	}
   	parentButton1.style.display="none";
    parentButton2.style.display="block";
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
                //loadLoginForm();
				hideButton();
            }
        }
    };
    
    request.open('POST', '/check-login', true);
	request.send(null);
}


loadLogin();
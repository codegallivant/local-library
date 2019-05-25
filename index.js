var express = require('express');
var morgan = require('morgan');
var path = require('path');
var mysql=require('mysql');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer=require('nodemailer');
var generator = require('generate-password');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var config = require('./config');

var pool = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'Book Library App',
    port: '3306',
    password: process.env.DATABASE_PASSWORD
});

var transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS
  }
});

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'SomeRandomSecretValue',
    cookie: { maxAge: 1000*60*35 }//maxAge: 35 minutes
}));

var dir = {
  'settings': {
		heading: 'Settings',
		content: `
    <br>
		<center>
			<div>
				<h4>Update password credentials</h4>
			<div>
				<form>
        <div class="input-group">
          <button class="btn form-control" disabled><span class="input-group-addon"><i class="octicon octicon-lock"><img src="/node_modules/octicons/build/svg/lock.svg"></i></span></button>
          <input type="password" placeholder="Password" id="password" class="form-control"> &nbsp &nbsp
        </div>
        <button onclick="javascript:document.forms[0].submit();" value="Update Credentials" type="button" class="btn btn-primary" id="updateCred_btn">Submit</button>
				</form>
			</div>
			</div>
      <div>
      <br><br>
      <h4>Set icon</h4>
      <div>
      <form action="userPicUpload" method="post" enctype="multipart/form-data">
      <input type="file" class="btn btn-info" name="filetoupload"> &nbsp &nbsp
      <button class="btn btn-primary" onclick="javascript:document.forms[0].submit();">Submit</button>
      </form>
      </div>
      </div>
      <br>
      <hr>
      <br>
      <a href="/logout"><button class="btn btn-warning">Logout</button></a>
      <button class="btn btn-danger" title="Delete Account - Danger" data-toggle="popover" data-trigger="focus" data-html="true" data-content="<p>Are you sure? This <code>cannot</code> be undone</p><a href='/delete-account'>Delete Account?</a>">
      Delete Account
      </button>
		</center>
			<script src="/ui/update_cred.js"></script>
      <script src="/ui/check-login.js"></script>
		`
	},
	'home': {
		heading: 'Home',
		content: `

    `
	},
	'register': {
		heading: '',
		content: `
		<center>
			<div id="login_area" class="fadeIn wow">
				<h3>Sign Up</h3>
			<div>
				<form onsubmit="return false;">
				<input type="text" id="username" placeholder="Username"/>
				<br><br>
				<input type="password" placeholder="Password" id="password"/>
				<br><br>
				<input type="email" placeholder="username@host.com" id="email"/>
				<br><br>
				<input value="Sign Up" type="submit" id="register_btn" onclick="validate('register')"/>
				</form>
			</div>
			</div>
		</center>
			<script src="/ui/register.js"></script>
			<script src="ui/common.js"></script>

			`
			},
	'login': {
    heading:'',
    content:`
<center>
    <div id="login_area" class="fadeIn wow">
        <h3>Login</h3>
    <div>
		<form onsubmit="return false;">
        <input type="text" id="username" placeholder="Username"/>
        <br><br>
		<input type="password" placeholder="Password" id="password"/>
		<br><br>
        <input value="Login" type="submit" id="login_btn" onclick="validate('login')"/>
		</form>
		<br>
		<a id="forgotPwd" href="/dir-forgot_password">Forgot password?</a>
    </div>
    </div>
</center>
    <script src="/ui/login.js"></script>
    <script src="ui/common.js"></script>
    `
  }

}
var classified= {
	//Remember to check classified name if it works!
  'classes': {
    heading:'Classes',
    content:`
    <div id="classListDiv">
    <center>Loading...</center>
    </div>

	<script src="/ui/get-subclasses.js"></script>
    <script src="/ui/get-classes.js"></script>
    `
	  //The person can see borrowers and all data and can give inputs like borrowing after he clicks on a class
	  /*Things he/she can do:
	  *Borrow book
	  *Return Book
	  *Find Book
	  *Pay Fine
	  *Nullify Fine
	  *Delete Student
	  *See borrowers
	  */
  },
	'books': {
	//Things a guy can do here
		/*
		*Find Books
		*See book's status(borrowed or not?)
		*/
	},
	'use_book': {
		heading: 'Borrow or Return Book',
		content:`
			<div style="margin-left: 15%;">
			<br>
        <div class="card">
        <div class="card-body">
        <form onsubmit="return false;">
        <h4>Borrow Book:</h4>
        <p><b>Student Id:</b>
        <input type="text" id="borrowStudentId" maxlength="5">
        <br>
        <b>Book Id:</b>
        &nbsp &nbsp &nbsp &nbsp<input type="number" id="borrowBookId">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="submit" class="btn btn-success"></p>
        </form>
        </div>
      </div>

        <br>

      <div class="card">
      <div class="card-body">

			<h4>Return book:</h4>
			<form onsubmit="return false;">
			<p><b>Student Id:</b>
			<input type="text" maxlength="5" id="returnStudentId">
			<br>
			<b>Book Id:</b>
			&nbsp &nbsp &nbsp &nbsp<input type="number" id="returnBookId">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
			<input type="submit" class="btn btn-success"></p>
			</form>
			</div>
      </div>
      </div>
			<script src="/ui/useBook.js"></script>


		`
	}
}


function createTemplate(data) {
var heading= data.heading;
var title= "TLISK Library | " + heading;
var content= data.content;
var titleBar=
`
<html>
    <head>
		<link rel="icon" href="/ui/favicon.ico" type="image/png" />
        <title>${title}</title>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<link href="/ui/animate.css" rel="stylesheet">
        <link href="/ui/style.css" rel="stylesheet"/>


    </head>
    <body>
    <body id='body'>
      <DIV id="titlebar" style="text-align:center;" >
        <br><br><br>
        <div class="card" id="titlecard">
          <div class="card-body" >
          <h1 style="text-align:center; font-size: 6em;">Want books? You're looking for us!</h1>
          </div>
        </div>
          <br><br><br>
          <button type="button" class="btn btn-primary"><h1>Explore Your Library Facilities</h1></button>
			<!--
          <a href="/home"><button class="dropbtn" id="Home">Home</button></a>

          <div id="login_buttons">
          <a href="/register"><button class="dropbtn specialB" id="SignUpB"">Sign Up</button></a>
          <a href="/login"><button class="dropbtn specialB" id="LoginB">Login</button></a>
			-->


        <!--<p id="name">Janak Shah- <span id="username">LightninTh5426@EpicThunder</span></p>-->

      </DIV>

      <!--
		<div class="sidebar" id="leftSidebar">
			<nav class="AdvSidebar" id="LAdvSidebar">
				<u><h3 style="color: white;">Direct Links</h3></u>
				<ul><br>
				<li>Home</li>
				<li>Profile</li>
				<li>Classes</li>
				<li>Borrow book</li>
				<li>Return Book</li>
				</ul>
				<br>
				<button class="AdvNormalButton2" onclick="document.getElementById('LAdvSidebar').style.display='none';">↑</button>
			</nav>
			<button class="AdvSidebarButton2" id="AdvSidebarButton1" onclick="document.getElementById('LAdvSidebar').style.display='block';"> ↓ </button>

		</div>
		<div class="sidebar" id="rightSidebar">
		<nav class="AdvSidebar" id="RAdvSidebar">
				<u><h3 style="color: white;">Direct Links</h3></u>
				<ul><br>
				<li>Home</li>
				<li>Login</li>
				<li>Register Librarian</li>
				</ul>
				<br>
				<button class="AdvNormalButton2" onclick="document.getElementById('RAdvSidebar').style.display='none';">→</button>
			</nav>
			<button class="AdvSidebarButton" id="AdvSidebarButton2" onclick="document.getElementById('RAdvSidebar').style.display='block';"> ← </button>
-->
		</div>

		<script src="/ui/wow.min.js"></script>
		  <script>
			   wow = new WOW(
					  {
					  boxClass:     'wow',      // default
					  animateClass: 'animated', // default
					  offset:       0,          // default
					  mobile:       false,       // default
					  live:         true        // default
					});
				wow.init();
		  </script>
`;
var body=`
<div class="full-size" id="area1">
<div class="card" style="background-color:green; color: #A2C563; overflow:auto; opacity: 0.5">
  <div class="card-body">
  <h1 style="font-size: 8em;">Welcome! You'll love it.</h1>
  <br>
  <h2>Just what you want, all free!</h2>
  </div>
</div>
<div class="card bg-success text-white" style="margin: 5%;">
<div class="card-body">
<p>
The Lexicon Group of Institutes was established in the year 1999 by Shri S D Sharma with the sole aim of imparting high quality education in the field of management education, preprimary, primary and secondary education. The various educational institutions under the aegis of the brand name Lexicon is today synonymous for quality, visionary and progressive education. In a very short span of time the group has established a business school, top CBSE Schools, preschools(Lexicon Kids) and Junior college in Pune. Various surveys over the years have ranked the Lexicon schools as the best CBSE schools. The preschools have also been awarded for their progressive curriculum. The Lexicon group believes in student centric education and building confidence in children is at the heart of the schooling process. Lexicon provides ample opportunities of confidence building to its strong base of 6000+ students.
<br>
Education is derived from a Latin word that means to bring out. Our philosophy on Education is very simple- to draw out of the child the gift of intelligence- by creating an atmosphere where inquiry and interest can be stimulated by instilling confidence in a child to believe in himself or herself. Developing intellectual curiosity, awareness and harmony, enhancing creative and critical intelligence and thinking and helping children to be valued citizens of tomorrow’s world – this is the motivation that guides The Lexicon Schools.
<br>
The Lexicon group of Institutes is forging ahead and has plans of opening branches in selected cities across India.
</p>
</div>
</div>
</div>

<div class="full-size" id="area2" style="overflow: hidden;">
<div class="card" style="background-color:#3B0020; color: #B42172; opacity: 0.8">
  <div class="card-body">
  <h1 style="font-size: 8em;">Lets start by Logging in!</h1>
  <br>
  <h2>You can sign up too!</h2>
  </div>
</div>
<div class="card QH-size" style="text-align: center; overflow: auto;">
<div class="card-body">
<div id="login_area" class="fadeIn wow">
<div class="row">
<div class="col">
  <div class="card">
    <div class="card-body">
        <h3>Login</h3>
        <form onsubmit="return false;">
          <input type="text" id="login_username" placeholder="Username" class="username"/>
          <br><br>
          <input type="password" placeholder="Password" id="login_password" class="password"/>
          <br><br>
          <input value="Login" type="submit" id="login_btn" onclick="validate('login')"/>
        </form>
        <br>
        <a id="forgotPwd" href="/dir-forgot_password">Forgot password?</a>
    </div>
  </div>
    <script src="/ui/login.js"></script>
    <script src="ui/common.js"></script>
</div>
<div class="col">
  <div class="card">
    <div class="card-body">
      <h3>Sign Up</h3>
      <form onsubmit="return false;">
        <input type="text" id="register_username" placeholder="Username" class="username"/>
        <br><br>
        <input type="password" placeholder="Password" id="register_password" class="password"/>
        <br><br>
        <input type="email" placeholder="username@host.com" id="email"/>
        <br><br>
        <input value="Sign Up" type="submit" id="register_btn" onclick="validate('register')"/>
      </form>
    </div>
  </div>
    <script src="/ui/register.js"></script>
    <script src="ui/common.js"></script>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="full-size" id="area3" style="">
<div class="card" style="color:yellow; background-color: orange; opacity: 0.8;">
  <div class="card-body">
  <h1 style="font-size: 8em;">Explore our books!</h1>
  <br>
  <h2>You can borrow them too!</h2>
  </div>
</div>
<div class="card" style=" opacity:0.9;  overflow: auto; height: 80%;">
  <div class="card-body bg-dark">
    <table class="table table-dark">
      <thead>
        <tr>
          <th>Book ID <input type="number" id="bookIdBox"></th>
          <th>Book Name <input type="text" id="bookNameBox"></th>
          <th>Issued</th>
          <th>Total Quantity</th>
          <th>Quantity Left</th>
        </tr>
      </thead>
      <tbody id="book-display">
      </tbody>
    </table>
    </div>
    <button class="btn btn-warning">Borrow a Book</button>
    <button class="btn btn-warning">Return a Book</button>
</div>
</div>
<script src="/ui/get-books.js"></script>
<!--
<div class="full-size" id="area4" style="overflow: hidden;">
<div class="card" style="color:yellow; background-color: orange; overflow:auto; opacity: 0.8">
  <div class="card-body">
  <h1 style="font-size: 8em;">Want to borrow a book?</h1>
  <br>
  <h2>Make sure to return them later!</h2>
  </div>
</div>
<div class="card bg-warning" style="opacity: 0.8">
<div class="card-body">
<br>
  <div class="card bg-primary text-warning" style="opacity: 0.999">
  <div class="card-body">
  <form onsubmit="return false;">
  <h4>Borrow Book:</h4>
  <p><b>Student Id:</b>
  <input type="text" id="borrowStudentId" maxlength="5">
  <br>
  <b>Book Id:</b>
  <input type="number" id="borrowBookId">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</p>
  <button class="btn btn-warning useBookButtons">Submit</button>
  </form>
  </div>
</div>

  <br>

<div class="card bg-primary text-warning" style="opacity: 0.999">
<div class="card-body">
<h4>Return book:</h4>
<form onsubmit="return false;">
<p><b>Student Id:</b>
<input type="text" maxlength="5" id="returnStudentId">
<br>
<b>Book Id:</b>
<input type="number" id="returnBookId">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</p>
<button class="btn btn-warning useBookButtons">Submit</button>
</form>
</div>
</div>
</div>
<script src="/ui/useBook.js"></script>
</div>
-->
</div>
<script src="/ui/get-subclasses.js"></script>
<div class="full-size" id="area5">
<div class="card" style="background-color:red; color: orange; overflow:auto; opacity: 0.888">
  <div class="card-body">
  <h1 style="font-size: 7em;">Search</h1>
  <br>
  <h2>Keep a check!</h2>
  </div>
</div>
<div class="card bg-primary text-white" style="margin: 5%;"">
<div class="card-body" >
  <form onsubmit="return false;">
  <input type="text" placeholder="Student ID" id="idsearchbox">
  <input type="text" placeholder="Student Name" id="namesearchbox">
  <button id="search" class="btn btn-info">Search</button>
  <script>
    document.getElementById("search").addEventListener("click", function(){
      loadFine();
      loadStudent(document.getElementById("idsearchbox").value);
    });
    document.getElementById("namesearchbox").addEventListener("input", function(){
      loadFine();
      loadStudent("",document.getElementById("namesearchbox").value);
    });
  </script>
  <!--name, fine, book borrowed, borrowing date, returning date-->
  </form>
  <div id="studentInfo"></div>


</div>
</div>
</div>


<!--
<h3 id="heading">${heading}</h3>

  <div id="content">
      ${content}
  </div>
-->
  </body>
    <script src="/ui/check-login.js"></script>

	<script>console.log(document.getElementById('body'));</script>
</html>
`;
var HTMLtemplate=titleBar+body;
return HTMLtemplate;
}

app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});




function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
var rLimit=4;
var lLimit=4;
app.get('/register-validate-input', function(req, res) {
	var user=req.query.username;
	var pwd=req.query.password;
	var email=req.query.email;
	var cred = [user, pwd, email];
	if(user.length>rLimit && pwd.length>rLimit && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		res.send('Success');
	} else {
		res.send('Failure');
	}
});

app.get('/login-validate-input', function(req, res) {
	var user=req.query.username;
	var pwd=req.query.password;
	var cred = [user, pwd];
	if(user.length>lLimit && pwd.length>lLimit) {
		res.send('Success');
	} else if(user.length<=lLimit && pwd.length>lLimit){
		res.send('username');
	} else if(user.length>lLimit && pwd.length<=lLimit) {
		res.send('password');
	} else if(user.length<=lLimit && pwd.length<=lLimit) {
		res.send('usernamepassword');
	} else {
		res.send('Something went wrong on the server.');
	}
});

app.get('/hash/:input', function(req,res) {
    var hashedString=hash(req.params.input, 'random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res) {
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString=hash(req.body.password, salt);
    pool.query("INSERT INTO `librarians`(`username`,`password`,`email`) VALUES ('"+req.body.username+"','"+dbString+"', '"+req.body.email+"')", function(err, field, result) {
        if(err) {
            res.status(500).send(err.toString());
        }
        else {
            res.send('User successfully created' + req.body.username);
        }
    });
});

app.post('/login', function(req, res) {
    pool.query("SELECT * FROM `librarians` WHERE `username` = '"+req.body.username+"' ", function(err, result, field) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            if(result.length === 0) {
                res.status(400).send('Username/Password is invalid');
            }
            else{
				var password=req.body.password;
                 var dbString = result[0].password;
                 var salt = dbString.split('$')[2];
                 var hashedPassword = hash(password, salt);
                 if(hashedPassword === dbString) {
                     req.session.auth = {"userId": result[0].username, "userIdNumber":result[0].id};
                     userPicArray=[];
                     fs.readdirSync('./ui/UserPics/').forEach(file => {
                         userPicArray.push(file);
                     })
                     for(i=0;i<=userPicArray.length;i++) {
                       if(userPicArray[i]===req.session.auth.userIdNumber+'.jpg') {
                         var userPicName=userPicArray[i];
                         console.log(userPicName);
                       } else {

                       }
                     }
                       req.session.auth = {"userId": result[0].username, "userIdNumber":result[0].id, "userPicName":userPicName};
                       console.log(req.session.auth);
                       res.send('Credentials correct');
                     } else{
                       res.status(403).send('Username/Password is invalid');
                     }
                   }
                   }

                   });
                   });
app.get('/current-user-pic', function(req, res) {
  if(req.session && req.session.auth && req.session.auth.userId && req.session.auth.userIdNumber) {
    userPicArray=[];
    fs.readdirSync('./ui/UserPics/').forEach(file => {
        userPicArray.push(file);
    })
    for(i=0;i<=userPicArray.length;i++) {
      if(userPicArray[i]===req.session.auth.userIdNumber+'.jpg') {
        var userPicName=userPicArray[i];
        console.log(userPicName);
      } else {

      }
    }
    if(userPicName) {
      res.sendFile(path.join(__dirname, 'ui/UserPics/', userPicName));
    }
  } else {
    res.send('You are not logged in');
  }
});
app.get('/current-user-pic-name', function(req, res) {
  if(req.session && req.session.auth && req.session.auth.userId && req.session.auth.userIdNumber) {
    userPicArray=[];
    fs.readdirSync('./ui/UserPics/').forEach(file => {
        userPicArray.push(file);
    })
    for(i=0;i<=userPicArray.length;i++) {
      if(userPicArray[i]===req.session.auth.userIdNumber+'.jpg') {
        var userPicName=userPicArray[i];
        console.log(userPicName);
      } else {

      }
    }
    if(userPicName) {
      res.send(userPicName);
    }
  } else {
    res.send('You are not logged in');
  }
});
app.post('/userPicUpload', function(req, res) {
  //set the pic as the username(unique)
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/rekhasha/Desktop/Janak_HTML_Programs/Book_Library-WebApp/ui/UserPics/' +req.session.auth.userIdNumber+'.jpg' ;
      fs.rename(oldpath, newpath, function (err) {
        if(err) {console.log(err);}

      });
    });
 });

app.post('/credentials_update', function(req, res) {
	pool.query("SELECT * FROM `librarians` WHERE `username` = '"+req.session.auth.userId+"' ", function(err, result, field) {
		if(err) {
			res.status(500).send(err.toString());
        }
		else {
            if(result.length === 0) {
                res.status(400).send('Username is invalid');
            }
            else{
				var dbString = result[0].password;
				var salt = dbString.split('$')[2];
				var hashedPassword = hash(req.body.password, salt);
				pool.query("UPDATE `librarians` SET `password` = ? WHERE `username` = ?",[hashedPassword,req.session.auth.userId], function(err, result, field) {
					if(err) {
						res.send(err);
					} else {
						res.send(result);
					}
				});
			}
		}
	});
});

app.post('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       pool.query("SELECT * FROM `librarians` WHERE `username`='"+req.session.auth.userId+"'", function(err, result, field) {
		  if (err) {
			  res.send(err);
		  }  else {
			  var cred=[result[0].username, result[0].password, result[0].email];
			  res.send(cred);
		  }
	   });
   } else {
       res.status(400).send('You are not logged in.');
   }
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       pool.query("SELECT * FROM `librarians` WHERE `username`='"+req.session.auth.userId+"'", function(err, result, field) {
		  if (err) {
			  res.send(err);
		  }  else {
			  var cred=[result[0].username, result[0].password, result[0].email];
			  res.send(cred);
		  }
	   });
   } else {
       res.status(400).send('You are not logged in.');
   }
});
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
app.post('/check-fine', function(req, res) {
    pool.query("SELECT `id`, `borrowing_date`, `returning_date` FROM `borrowers`", function(err, result, field) {
      if(err) {
        res.send(err);
      } else {
        console.log(result);
        var ids=[];
        var diffDays = []
        for(i=0;i<result.length;i++) {
          ids[i]=result[i].id;
          console.log(ids)
          var date1 = new Date();
          console.log(date1);
          var date2 = new Date(result[i].returning_date);
          console.log(date2);

          diffDays[i]=dateDiffInDays(date2, date1);;
          //var diffDays = date2.getDate() - date1.getDate();
          console.log(diffDays);
          if(diffDays[i]>0) {
            pool.query("UPDATE `borrowers` SET `fine_pending`=? WHERE `id`=?",[diffDays[i],ids[i]], function(err, result) {
              if(err) {
                res.send(err);
                console.log("ERROR:");
                console.log(err);
              } else {
                res.send();
                console.log("Fine updated");
              }
            });
          }
        }
    }
    });
});

app.post('/borrow-book', function(req, res) {
	var studentId=(req.body.studentId).toString();
	var bookId=(req.body.bookId);
	console.log(bookId);
	console.log(studentId);
  /*
	pool.query("SELECT `id` FROM `students` WHERE `id`=?",studentId, function(err, field, result) {
		if(err) {
			res.send(err);
			console.log("375");
			console.log(err);
		} else {
			console.log("378");
			console.log(JSON.stringify(result));

			if(result.length===0) {

				res.status(403).send("Student Id invalid");
			} else {
			pool.query("SELECT `id` FROM `books` WHERE `id`=?",bookId, function(err, field, result) {
				if(err) {
					res.send(err);
					console.log("386");
					console.log(err);
				} else {
					console.log(JSON.stringify(result));

					if(result.length===0) {
						res.status(403).send("Book Id invalid");
					} else {
          */
					pool.query("INSERT INTO `borrowers`(`student_id`, `book_id`) VALUES(?,?)",[req.body.studentId,req.body.bookId], function(err, field, result) {
            if(err) {
                res.status(500).send(err.toString());
                console.log("ERROR:");
                console.log(err.toString());
            }
            else {
              res.status(200).send("Book successfully borrowed");
							console.log("Book successfully borrowed");
						}
					});
          /*
				}
      }
			});
			}
		}
	});*/
});

app.post('/return-book', function(req, res) {
	pool.query("SELECT * FROM `borrowers` WHERE `student_id`=? AND `book_id`=?",[req.body.studentId, req.body.bookId], function(err, field, result) {
		if(err) {
			res.send(err);
      console.log("ERROR:");
      console.log(err);
    } else if(field==="[]") {
      res.status(200).send("Invalid IDs");
		} else {
  			pool.query("DELETE FROM `borrowers` WHERE `student_id`=? AND `book_id`=?",[req.body.studentId, req.body.bookId], function(err, field, result) {
  				if(err) {
  					res.send(err);
  					console.log("ERROR:");
  					console.log(err);
  				} else {
  					res.status(200).send("Book successfully returned");
  					console.log("Book successfully returned");
  				}
  			});
	    }
  });
});

app.post('/get-classes', function(req, res) {
  pool.query("SELECT `class` FROM `classes`", function(err, result, field) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.post('/get-student', function(req, res, JSON) {
  var name='%'+req.body.name+'%';
  pool.query("SELECT students.`id`,students.`student_name`,students.`grade`,students.`section`,students.`roll_no`,borrowers.`book_id`,books.`BookName`,borrowers.`Fine_pending`,borrowers.`borrowing_date`,borrowers.`returning_date` FROM `students` LEFT JOIN `borrowers` ON students.`id`=borrowers.`student_id` LEFT JOIN `books` ON borrowers.`book_id`=books.`id` WHERE students.`id`=? OR students.`student_name` LIKE ?", [req.body.id, name], function(err, result, field) {
    if(err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post('/get-students', function(req, res, JSON) {
	pool.query("SELECT * FROM `students` WHERE `grade`=?", req.body.class, function(err, result, field) {
		if(err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/get-books', function(req, res) {
  if(req.body.identityName==="" && req.body.identityId==="") {
    pool.query("SELECT * FROM `books`", function(err, result, field) {
  		if(err) {
  		  res.send(err);
  		} else {
  		  res.send(result);
  		}
    });
  } else {
    var bookidentity='%'+req.body.identityName+'%';
  	pool.query("SELECT * FROM `books` WHERE `id` = ? OR `BookName` LIKE ?", [req.body.identityId, bookidentity] , function(err, result, field) {
  		if(err) {
  		  res.send(err);
  		} else {
  		  res.send(result);
  		}
    });
  }
});



app.get('/logout', function(req, res) {
    delete req.session.auth;
    res.send('You have logged out.<br><a href="/">Home</a>');
});

app.get('/delete-account', function(req,res) {
    console.log(req.session.auth.userId);
    pool.query('DELETE FROM `librarians` WHERE `username` = ?', [req.session.auth.userId], function (err, fields, result) {
    if (err) {
        res.send('Error');
    } else{
    delete req.session.auth;
    res.send(`Your account has been deleted and you have logged out.<br><a href="/">Home</a>`);
	}
	});
});
app.get('/:dirName',function (req, res) {
  var dirName = req.params.dirName;
		if(dir[dirName]) {
			res.send(createTemplate(dir[dirName]));
		} else {
			res.send('<h1 style="font-family:monospace;">ERROR 404 - Not Found</h1>')
		}
});
app.get('/loggedIn/:classifiedName',function (req, res) {
if (req.session && req.session.auth && req.session.auth.userId) {
  var classifiedName = req.params.classifiedName;
		if(classified[classifiedName]) {
			res.send(createTemplate(classified[classifiedName]));
		} else {
			res.send('<h1 style="font-family:monospace;">ERROR 404 - Not Found</h1>')
		}
} else {
	res.send("Librarian, please log in first to access library information.");
}
});
app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

pool.connect(function(err, result) {
  if (err) {
      console.log('Error in connecting to MySQL Database.');
      console.log(result);
  } else{
  console.log("Connected!");
  console.log(result);
  }
});

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log('App listening at http://localhost:%s', port);

});

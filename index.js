var express = require('express');
var morgan = require('morgan');
var path = require('path');
var mysql=require('mysql');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer=require('nodemailer');
var generator = require('generate-password');
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
	'home': {
		heading: 'Home',
		content: `
      <div class="HomeSection">
        <div class="imgGroup">
          <img src="https://thumbs.dreamstime.com/b/students-reading-books-library-people-knowledge-education-literature-school-concept-preparing-to-exams-53149641.jpg" alt="img">
          <h1>Over 1000 books</h1>
        </div>
        <br><br><br><br><br><br>
        <h2>Just what you want, all free!</h2>
        <h3>Want a book? You're looking for us!</h3>
      </div>
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
			<div style="margin-left: 15%">
			<br>
			<h4>Borrow Book:</h4>
			<form onsubmit="return false;">
			<p><b>Student Id:</b>
			<input type="text" id="borrowStudentId" maxlength="5">
			<br>
			<b>Book Id:</b>
			&nbsp &nbsp &nbsp &nbsp<input type="number" id="borrowBookId">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
			<input type="submit" class="useBookButtons"></p>
			</form>
			<br>
			<h4>Return book:</h4>
			<form onsubmit="return false;">
			<p><b>Student Id:</b>
			<input type="text" maxlength="5" id="returnStudentId">
			<br>
			<b>Book Id:</b>
			&nbsp &nbsp &nbsp &nbsp<input type="number" id="returnBookId">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
			<input type="submit" class="useBookButtons"></p>
			</form>
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
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<link href="/ui/animate.css" rel="stylesheet">
        <link href="/ui/style.css" rel="stylesheet"/>


    </head>
    <body>
    <body id='body'>
      <DIV id="titlebar">
        <br>
        <a href="/home"><img id="logo" src="/ui/LOGO.png" alt="Logo"></a>
		<div style="text-align:center;">
		<h1 style="position: relative; bottom: 100px;">LIBRARY</H1>
		</div>
			<br style="line-height:15%">
			<!--
          <a href="/home"><button class="dropbtn" id="Home">Home</button></a>

          <div id="login_buttons">
          <a href="/register"><button class="dropbtn specialB" id="SignUpB"">Sign Up</button></a>
          <a href="/login"><button class="dropbtn specialB" id="LoginB">Login</button></a>
			-->


        <!--<p id="name">Janak Shah- <span id="username">LightninTh5426@EpicThunder</span></p>-->

      </DIV>
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
      <br><br>
`;
var body=`
<div class="container">
  <center><h3 id="heading">${heading}</h3></center>

  <div id="content">
      ${content}
  </div>
  </div>
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
                     req.session.auth = {userId: result[0].username};
                     res.send('Credentials correct');
                   } else{
                     res.status(403).send('Username/Password is invalid');
                   }
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

app.post('/check-fine', function(req, res) {

});

app.post('/borrow-book', function(req, res) {
	var studentId=(req.body.studentId).toString();
	var bookId=(req.body.bookId);
	console.log(bookId);
	console.log(studentId);
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
					pool.query("INSERT INTO `borrowers`(`student_id`, `book_id`) VALUES(?,?)",[req.body.studentId,req.body.bookId], function(err, field, result) {
						if(err) {
							res.send(err);
							console.log("ERROR:");
							console.log(err);
						} else {
							res.send("Book successfully borrowed");
							console.log("Book successfully borrowed");
						}
					});
				}
				}
			});
			}
		}
	});
});

app.post('/return-book', function(req, res) {
	pool.query("SELECT * FROM `borrowers` WHERE `id`=?",req.body.studentId, function(err, field, result) {
		if(err) {
			res.status(403).send(err.toString());
		} else {
			pool.query("DELETE FROM `borrowers` WHERE `student_id`=? AND `book_id`=?",[req.body.studentId, req.body.bookId], function(err, field, result) {
				if(err) {
					res.send(err);
					console.log("ERROR:");
					console.log(err);
				} else {
					res.send(result);
					console.log("RESULT:");
					console.log(result);
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
	pool.query("SELECT * FROM `books`", function(err, result, field) {
		if(err) {
		  res.send(err);
		} else {
		  res.send(result);
		}
  });
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

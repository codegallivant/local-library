var express = require('express');
var morgan = require('morgan');
var path = require('path');
var mysql = require('mysql');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
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
    cookie: {
        maxAge: 1000 * 60 * 10
    } //maxAge: 10 minutes
}));

var loggedIn = function(req) {
    return req.session && req.session.auth && req.session.auth.userId;
}

var dir = {
    'library': {
        heading: 'Home',
        content: ``
    }
}

function createTemplate(data,loggedIn) {
    // var heading = data.heading;
    // var title = "Central Library | " + heading;
    // var content = data.content;
    var titleBar;
    try {
        var header = fs.readFileSync('./ui/header.html', 'utf8')
        var defaultarea = fs.readFileSync('./ui/default.html', 'utf8')
        var areas = "";
        var footer = fs.readFileSync('./ui/footer.html','utf8')
        if(loggedIn) {
            areas = fs.readFileSync('./ui/areas.html','utf8');
        }
        var template = header+defaultarea+areas+footer;
        return template;
    } catch (err) {
      console.error(err)
    }
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
var limit = 4;
app.get('/register-validate-input', function(req, res) {
    var user = req.query.username;
    var pwd = req.query.password;
    var email = req.query.email;
    var cred = [user, pwd, email];
    if (user.length > limit && pwd.length > limit && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res.send('Success');
    } else {
        res.send('Failure');
    }
});

app.get('/login-validate-input', function(req, res) {
    var user = req.query.username;
    var pwd = req.query.password;
    var cred = [user, pwd];
    if (user.length > limit && pwd.length > limit) {
        res.send('Success');
    } else if (user.length <= limit && pwd.length > limit) {
        res.send('username');
    } else if (user.length > limit && pwd.length <= limit) {
        res.send('password');
    } else if (user.length <= limit && pwd.length <= limit) {
        res.send('usernamepassword');
    } else {
        res.send('Something went wrong on the server.');
    }
});

app.get('/updateCred-validate-input', function(req, res) {
    var user = req.query.username;
    var pwd = req.query.password;
    var email = req.query.email;
    var cred = [user, pwd, email];
    if (user.length > limit && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && (pwd.length>limit || pwd==="")) {
        res.send('Success');
    } else {
        res.send('Failure');
    }
});

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(req.body.password, salt);
    pool.query("INSERT INTO `librarians`(`username`,`password`,`email`) VALUES ('" + req.body.username + "','" + dbString + "', '" + req.body.email + "')", function(err, field, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User successfully created' + req.body.username);
        }
    });
});

app.post('/login', function(req, res) {
    pool.query("SELECT * FROM `librarians` WHERE `username` = '" + req.body.username + "' ", function(err, result, field) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.length === 0) {
                res.status(400).send('Username/Password is invalid');
            } else {
                var password = req.body.password;
                var dbString = result[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if (hashedPassword === dbString) {
                    req.session.auth = {
                        "userId": result[0].username,
                        "userIdNumber": result[0].id
                    };
                    userPicArray = [];
                    fs.readdirSync('./ui/UserPics/').forEach(file => {
                        userPicArray.push(file);
                    })
                    for (i = 0; i <= userPicArray.length; i++) {
                        if (userPicArray[i] === req.session.auth.userIdNumber + '.jpg') {
                            var userPicName = userPicArray[i];
                            console.log(userPicName);
                        } else {

                        }
                    }
                    req.session.auth = {
                        "userId": result[0].username,
                        "userIdNumber": result[0].id,
                        "userPicName": userPicName
                    };
                    console.log(req.session.auth);
                    res.send('Credentials correct');
                } else {
                    res.status(403).send('Username/Password is invalid');
                }
            }
        }
    });
});

app.get('/current-user-pic', function(req, res) {
    if (req.session && req.session.auth && req.session.auth.userId && req.session.auth.userIdNumber) {
        userPicArray = [];
        fs.readdirSync('./ui/UserPics/').forEach(file => {
            userPicArray.push(file);
        })
        for (i = 0; i <= userPicArray.length; i++) {
            if (userPicArray[i] === req.session.auth.userIdNumber + '.jpg') {
                var userPicName = userPicArray[i];
                console.log(userPicName);
            } else {

            }
        }
        if (userPicName) {
            res.sendFile(path.join(__dirname, 'ui/UserPics/', userPicName));
        }
    } else {
        res.send('You are not logged in');
    }
});

app.get('/current-user-pic-name', function(req, res) {
    if (req.session && req.session.auth && req.session.auth.userId && req.session.auth.userIdNumber) {
        userPicArray = [];
        fs.readdirSync('./ui/UserPics/').forEach(file => {
            userPicArray.push(file);
        })
        for (i = 0; i <= userPicArray.length; i++) {
            if (userPicArray[i] === req.session.auth.userIdNumber + '.jpg') {
                var userPicName = userPicArray[i];
                console.log(userPicName);
            } else {

            }
        }
        if (userPicName) {
            res.send(userPicName);
        }
    } else {
        res.send('You are not logged in');
    }
});

app.post('/userPicUpload', function(req, res) {
    //set the pic as the username(unique)
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/rekhasha/Desktop/Janak_HTML_Programs/Book_Library-WebApp/ui/UserPics/' + req.session.auth.userIdNumber + '.jpg';
        fs.rename(oldpath, newpath, function(err) {
            if (err) {
                console.log(err);
            }

        });
    });
});

app.post('/send-password_email', function(req, res) {
    pool.query("SELECT * FROM `librarians` WHERE `username` = '"+req.body.username+"' ", function(err, result, field) {
        if(err) {
            res.status(500).send(err.toString());
        }
        else {
            if(result.length === 0) {
                res.status(400).send('Username is invalid');
            }
            else{
                var email=result[0].email;
                var dbString = result[0].password;
                var salt = dbString.split('$')[2];
                var password = generator.generate({
                    length: 10,
                    numbers: true
                });
                var hashedPassword=hash(password, salt);
                var mailOptions = {
                  from: process.env.EMAIL_AUTH_USER,
                  to: email.toString(),
                  subject: 'Your password',
                  text: "Following is the new password for your account '"+req.body.username+"': '"+password+"' "
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });

                pool.query("UPDATE `librarians` SET password = '"+hashedPassword+"' WHERE username = '"+req.body.username+"'", function(err, result, field) {
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


app.post('/credentials_update', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query("SELECT * FROM `librarians` WHERE `id` = '" + req.session.auth.userIdNumber + "' ", function(err, result, field) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.length === 0) {
                res.status(400).send('Username is invalid');
            } else {
                if(result[0].password==="") {
                    pool.query("UPDATE `librarians` SET `username`=?, `email`=? WHERE `id` = ?", [req.body.username, req.body.email, req.session.auth.userIdNumber], function(err, result, field) {
                        if (err) {
                            res.send(err);
                        } else {
                            req.session.auth.userId=req.body.username;
                            res.send(result);
                        }
                    });
                } else {
                    var dbString = result[0].password;
                    var salt = dbString.split('$')[2];
                    var hashedPassword = hash(req.body.password, salt);
                    pool.query("UPDATE `librarians` SET `password` = ? , `username`=?, `email`=? WHERE `id` = ?", [hashedPassword, req.body.username, req.body.email, req.session.auth.userIdNumber], function(err, result, field) {
                        if (err) {
                            res.send(err);
                        } else {
                            req.session.auth.userId=req.body.username;
                            res.send(result);
                        }
                    });
                }
            }
        }
    });
});

app.post('/check-login', function(req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
        pool.query("SELECT * FROM `librarians` WHERE `username`='" + req.session.auth.userId + "'", function(err, result, field) {
            if (err) {
                res.send(err);
            } else {
                var cred = [result[0].username, result[0].password, result[0].email];
                res.send(cred);
            }
        });
    } else {
        res.status(403).send('You are not logged in.');
    }
});

app.post('/borrow-book', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    var memberId = (req.body.memberId).toString();
    var bookId = (req.body.bookId);
    pool.query("INSERT INTO `borrowers`(`member_id`, `book_id`) VALUES(?,?)", [req.body.memberId, req.body.bookId], function(err, field, result) {
        if (err) {
            res.status(500).send(err.toString());
            console.log("ERROR:");
            console.log(err.toString());
        } else {
            res.status(200).send("Book successfully borrowed");
            console.log("Book successfully borrowed");
        }
    });
});

app.post('/return-book', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query("SELECT * FROM `borrowers` WHERE `member_id`=? AND `book_id`=?", [req.body.memberId, req.body.bookId], function(err, field, result) {
        if (err) {
            res.send(err);
            console.log("ERROR:");
            console.log(err);
        } else if (field === "[]") {
            res.status(200).send("Invalid IDs");
        } else {
            pool.query("DELETE FROM `borrowers` WHERE `member_id`=? AND `book_id`=?", [req.body.memberId, req.body.bookId], function(err, field, result) {
                if (err) {
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

// app.post('/get-classes', function(req, res) {
//     pool.query("SELECT `class` FROM `classes`", function(err, result, field) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

app.post('/create-member', function(req,res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query("INSERT INTO `members` ('member_name') VALUES (?)",[req.body.name], function(err,result,field) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/delete-member', function(req,res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query("DELETE FROM `members` WHERE `id`=?",[req.body.id], function(err,result,field) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create-book', function(req,res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query("INSERT INTO `books` ('book_name', 'TotalQuantity')", [req.body.name,req.body.quantity], function(err,result,field) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/delete-book', function(req,res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query("DELETE FROM `books` WHERE `id`=?",[req.body.identityId], function(err,result,field) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/get-member', function(req, res, JSON) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    var name = req.body.name + '%';
    pool.query("SELECT members.`id`,members.`member_name`,borrowers.`book_id`,books.`BookName`,borrowers.`borrowing_date` FROM `members` LEFT JOIN `borrowers` ON members.`id`=borrowers.`Member_id` LEFT JOIN `books` ON borrowers.`book_id`=books.`id` WHERE members.`id`=? OR members.`member_name` LIKE ? ORDER BY members.`member_name` ASC", [req.body.id, name], function(err, result, field) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/get-books', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    if (req.body.identityName === "" && req.body.identityId === "") {
        pool.query("SELECT * FROM `books` ORDER BY `BookName` ASC", function(err, result, field) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    } else {
        var bookidentity = '%' + req.body.identityName + '%';
        pool.query("SELECT * FROM `books` WHERE `id` = ? OR `BookName` LIKE ?", [req.body.identityId, bookidentity], function(err, result, field) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }
});

app.post('/get-book', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query("SELECT * FROM `borrowers` WHERE `book_id` = ?", [req.body.identityId], function(err, result, field) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});



app.post('/logout', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    delete req.session.auth;
    res.status(200).send()
});

app.post('/delete-account', function(req, res) {
    if(!loggedIn(req)) {
        res.status(403).send();
        return
    }
    pool.query('DELETE FROM `librarians` WHERE `username` = ?', [req.session.auth.userId], function(err, fields, result) {
        if (err) {
            res.send('Error');
        } else {
            delete req.session.auth;
            res.send("window.location.reload();");
        }
    });
    console.log("Deleted user: " + (req.session.auth.userId).toString());
});

app.get('/:dirName', function(req, res) {
    var dirName = req.params.dirName;
    if (dir[dirName]) {
        res.send(createTemplate(dir[dirName],loggedIn(req)));
    } else {
        res.send('<h1 style="font-family:monospace;">ERROR 404 - Not Found</h1>')
    }
});
// app.get('/loggedIn/:classifiedName', function(req, res) {
//     if (req.session && req.session.auth && req.session.auth.userId) {
//         var classifiedName = req.params.classifiedName;
//         if (classified[classifiedName]) {
//             res.send(createTemplate(classified[classifiedName]));
//         } else {
//             res.send('<h1 style="font-family:monospace;">ERROR 404 - Not Found</h1>')
//         }
//     } else {
//         res.status(403).send("Librarian, please log in first to access library information.");
//     }
// });



app.get('/ui/:fileName', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

pool.connect(function(err, result) {
    if (err) {
        console.log('Error in connecting to MySQL Database.');
        console.log(result);
    } else {
        console.log("Connected!");
        console.log(result);
    }
});

app.get('/ui/pace/pace-1.0.2/:fileName', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui/pace/pace-1.0.2/', req.params.fileName));
});

app.get('/ui/pace/pace-1.0.2/themes/:colorName/:fileName', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui/pace/pace-1.0.2/themes/', req.params.colorName, '/', req.params.fileName));
});

var server = app.listen(8080, function() {
    var port = server.address().port;
    console.log('App listening at http://localhost:%s', port);

});
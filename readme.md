# local-library

A library management system.

### Setup
- Node.js
- Node Modules
	- express
	- morgan 
	- path
	- mysql
	- crypto
	- bodyParser
	- session
	- nodemailer
	- generator 
	- http
	- formidable
	- fs
- config.js file
	```javascript
	process.env.DATABASE_PASSWORD = "";
	process.env.DATABASE_USER = ""
	process.env.DATABASE_HOST = "127.0.0.1"
	process.env.DATABASE_NAME = "local-library"
	process.env.DATABASE_HOST_PORT = 3306


	process.env.SESSION_SECRET = "";

	process.env.EMAIL_AUTH_USER = "";
	process.env.EMAIL_PASS = "";
	```

### Run
- Run `node index.js`
- Visit `localhost:3000`

# local-library
## v0.9.8
<!-- For check mark emoji->  :white_check_mark: -->
### Information
A library management system. Run on localhost.
### Pending features(essential only):
- Add books from GUI
- Add members from GUI

### Online Imports: 
- Bootstrap

### Prerequisites
- Node.JS
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

### How to setup config.js file:
- Create a file named config.js in the project folder
- Go inside it
- Put this code in it:
	```javascript
	process.env.DATABASE_PASSWORD='<database_password>';
	process.env.EMAIL_SERVICE='<email_service(Eg: rediffmail)>';
 	process.env.EMAIL_AUTH_USER='<email_address>';
 	process.env.EMAIL_AUTH_PASS='<email_password>';
	```
- Fill each code line with their respective values.

### Running the program
- Enter `node index.js` in the terminal to get the server running
- Go to `localhost:8080` in your browser

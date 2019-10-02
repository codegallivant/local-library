# online-library
## :warning: Bugs need to be fixed. Cannot be used yet.
<!-- For check mark emoji->  :white_check_mark: -->
### Information
This is a library app which can be used at school on a localhost server. The user interface is meant for a librarian, so do not misunderstand this as a normal online library app.

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
-You're done!

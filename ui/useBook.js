(document.getElementsByClassName("useBookButtons")[0]).onclick=function() {
	    var submit=document.getElementsByClassName("useBookButtons")[0];
	var request = new XMLHttpRequest();
    submit.value="Processing...";
    submit.disabled=true;
    //Capture the response and store it in a variable
     request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.disabled=false;
                  submit.value="Submit";
                  alert('Success!');
               } else if(request.status===403) {
                   alert('These IDs do not exist. Please enter the correct ID of the book and the student.');
                   submit.disabled=false;
                  submit.value="Submit";
               } else if (request.status===500) {
                   alert('ERROR 500');
                   submit.disabled=false;
                  submit.value="Submit";
               } else{
                   alert('Something went wrong on the server.');
                   submit.disabled=false;
                  submit.value="Submit";
               }

            }
        };

        var studentId=document.getElementById('borrowStudentId').value;
		console.log(studentId);
        var bookId = document.getElementById('borrowBookId').value;
        request.open('POST', '/borrow-book', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({studentId: studentId, bookId: bookId}));
    };

(document.getElementsByClassName("useBookButtons")[1]).onclick=function() {
	 var submit=document.getElementsByClassName("useBookButtons")[1];
	var request = new XMLHttpRequest();
    submit.value="Processing...";
    submit.disabled=true;
    //Capture the response and store it in a variable
     request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.disabled=false;
                  submit.value="Submit";
                  alert('Success!');
               } else if(request.status===403) {
                   alert('These IDs do not exist. Please enter the correct ID of the book and the student.');
                   submit.disabled=false;
                  submit.value="Submit";
               } else if (request.status===500) {
                   alert('ERROR 500');
                   submit.disabled=false;
                  submit.value="Submit";
               } else{
                   alert('Something went wrong on the server.');
                   submit.disabled=false;
                  submit.value="Submit";
               }

            }
        };

        var studentId=document.getElementById('returnStudentId').value; 
        var bookId = document.getElementById('returnBookId').value;
        request.open('POST', '/return-book', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({studentId: studentId, bookId: bookId}));
    };
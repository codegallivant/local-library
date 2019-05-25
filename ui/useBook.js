/*(document.getElementsByClassName("useBookButtons")[0]).onclick=function() {
	    var submit=document.getElementsByClassName("useBookButtons")[0];
	var request = new XMLHttpRequest();
    submit.textContent="Processing...";
    submit.disabled=true;
    //Capture the response and store it in a variable
     request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
									if(this.responseText==="Book successfully borrowed") {
											submit.disabled=false;
											submit.textContent="Submit";
											alert('Success!');
									} else if(JSON.parse(this.responseText)) {
										var borrowData = JSON.parse(this.responseText);
										if(borrowData.errno===1452 || borrowData.errno===1366) {
											submit.disabled=false;
											submit.textContent="Submit";
											alert('These IDs do not exist. Please enter the correct ID of the book and the student.');
										} else if(borrowData.sqlState==="45000") {
											submit.disabled=false;
											submit.textContent="Submit";
											alert('Oops! The book is too popular! No books are left.');
										} else {
											submit.disabled=false;
											submit.textContent="Submit";
											alert("The database cannot accept this data.");
										}
									} else {
										submit.disabled=false;
										submit.textContent="Submit";
										alert("The database cannot accept this data.");
									}
               } else if (request.status===500) {
                   alert('ERROR 500');
                   submit.disabled=false;
                  submit.textContent="Submit";
               } else{
                   alert('Something went wrong on the server.');
                   submit.disabled=false;
                  submit.textContent="Submit";
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
	 var submit2=document.getElementsByClassName("useBookButtons")[1];
	var request = new XMLHttpRequest();
    submit2.textContent="Processing...";
    submit2.disabled=true;
    //Capture the response and store it in a variable
     request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
							if (request.status === 200) {
									if(this.responseText==="Book successfully returned") {
											submit2.disabled=false;
											submit2.textContent="Submit";
											alert('Success!');
									} else if(this.responseText==="Invalid IDs") {
											var returnData = JSON.parse(this.responseText);
											submit2.disabled=false;
											submit2.textContent="Submit";
											alert('These IDs do not exist. Please enter the correct ID of the book and the student.');
											/*
										} else if(borrowData.errno===1644) {
											submit.disabled=false;
											submit.textContent="Submit";
											alert('Oops! The book is too popular! No books are left.');
											*/
											/*
										} else {
											submit2.disabled=false;
											submit2.textContent="Submit";
											alert("The database cannot accept this data.");
										}
               } else if(request.status===403) {
								 	alert("The database cannot accept this data.");
                  submit2.disabled=false;
                  submit2.textContent="Submit";
               } else if (request.status===500) {
                   alert('ERROR 500');
                   submit2.disabled=false;
                  submit2.textContent="Submit";
               } else{
                   alert('Something went wrong on the server.');
                   submit2.disabled=false;
                  submit2.textContent="Submit";
               }

            }
        };

        var studentId=document.getElementById('returnStudentId').value;
        var bookId = document.getElementById('returnBookId').value;
        request.open('POST', '/return-book', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({studentId: studentId, bookId: bookId}));
    };
*/

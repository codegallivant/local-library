<<<<<<< HEAD
var borrowb = function(memberId, bookId, borrowButtonID) {
    var request = new XMLHttpRequest();
    var borrowButton = document.getElementsByClassName("borrowButton")[borrowButtonID];
    borrowButton.innerHTML = "Processing..."
    borrowButton.disabled = true;
    request.onreadystatechange = function() {
        console.log("readystatechange borrow func entered");
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                if (this.responseText === "Book successfully borrowed") {
                    alert("Book borrowed");
                } else {
                    alert("Request status: 200. \nSomething went wrong.")
                }
            } else if (request.status === 500) {
                if (this.responseText === "Error: ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: Incorrect integer value: '' for column 'book_id' at row 1") {
                    alert("Please enter a value.");
                } else if (this.responseText === "Error: ER_SIGNAL_EXCEPTION: Unhandled user-defined exception condition") {
                    alert("All specimens of this book have already been borrowed.");
                } else {
                    alert("A book with this ID does not exist.");
                }
            } else if(request.status===403) {
                alert("403 - Forbidden");
            } else {
                alert("Something went wrong.");
            }
        }
        borrowButton.innerHTML = "Borrow";
        borrowButton.disabled = false;

    };
    request.open('POST', '/borrow-book', false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        memberId: memberId,
        bookId: bookId
    }));

    loadBooks();
    loadMember(memberId);
};

var returnb = function(memberId, bookId, returnButtonID) {
    var request = new XMLHttpRequest();
    var returnButton = document.getElementsByClassName("returnButton")[returnButtonID];
    returnButton.innerHTML = "Processing..."
    returnButton.disabled = true;
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                if (this.responseText === "Book successfully returned") {
                    alert("Book returned");
                } else {
                    alert("The database cannot accept this data.");
                }
            } else if(request.status===403) {
                alert("403 - Forbidden");
            }  else {
                alert("The database cannot accept this data.");
            }
        }
        returnButton.innerHTML = "Borrow";
        returnButton.disabled = false;

    };
    request.open('POST', '/return-book', false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        memberId: memberId,
        bookId: bookId
    }));

    loadBooks();
    loadMember(memberId);
};


var deleteMember = function(id, name) {
    var contentDiv = document.getElementById('MemberInfo');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState===XMLHttpRequest.DONE) {
            if(request.status===200) {
                var response = JSON.parse(this.responseText);
                if (response.errno === 1451 && response.sqlState==="23000") { 
                    alert("This member has borrowed a book. Record can only be deleted once the book is returned.");
                } else {
                    contentDiv.innerHTML=`Member ${id} - ${name} - has been deleted.`;
                }
            } else if(request.status===403) {
                alert("403 - Forbidden");
            }  else {
                alert(`Something went wrong. Response Text: ${this.responseText}`);
            }
        }
    }
    request.open('POST', '/delete-member', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        id: id
    }));
};

var loadFine = function(borrowing_date) {
    var date1 = new Date();
    var date2 = new Date(borrowing_date);
    var diffTime = Math.abs(date1 - date2);
    var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays - 7 < 0) {
        return 0;
    } else {
        return diffDays - 7;
    }
};

var loadMember = function(id, name) {
    var contentDiv = document.getElementById('MemberInfo');
    if ((id === "" && name === "") || (id === null && name === null)) {
        contentDiv.innerHTML = "";
        document.getElementById("search").disabled = false;
        document.getElementById("search").innerHTML = "Search";
        return;
    }
    document.getElementById("search").disabled = true;
    document.getElementById("search").innerHTML = "Processing...";

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var subcontent =
                    `
						<table class="table table-striped bg-light" >
                            <thead>
    							<tr>
                                    <th></th>
    								<th>ID</th>
    								<th>Name</th>
    <!--								<th>Grade</th>
    								<th>Section</th>
    								<th>Roll no.</th> 
    								-->
    								<th>Name of borrowed book</th>
    								<th>ID of borrowed book</th>
    								<th>Days due</th>
    								<th>Borrowing Date</th>
    								<!--<th>Returning Date</th>-->
    								<th></th>
    								<!--<th></th>-->
    							</tr>
                            </thead>
					`;
                var result = JSON.parse(this.responseText);
                if (result === [] || result[0] === undefined) {
                    subcontent = ``;
                    subcontent = "No such ID exists / No name starts with these characters.";
                    contentDiv.innerHTML = subcontent;
                    document.getElementById("search").innerHTML = "Search";
                    document.getElementById("search").disabled = false;
                    return;
                }

                var borrowed;
                var daysdue;
                var bb = -1;
                var rb = -1;
                for (i = 0; i < result.length; i++) {

                    if (result[i].book_id === null) {
                        result[i].BookName = "---";
                        result[i].book_id = "---";
                        result[i].borrowing_date = "---";
                        //result[i].returning_date="---";
                        //result[i].Fine_pending=0;
                        daysdue = "---";
                        borrowed = false;
                        bb++;
                    } else {
                        borrowed = true;
                        rb++;
                        daysdue = loadFine(result[i].borrowing_date);
                    }

                    subcontent += `
							<tr>
                                <td>
                                    <button type="button" onclick="deleteMember(${result[i].id},'${result[i].member_name}')" class="btn-close" aria-label="Delete member" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete member"></button>
                                </td>
								<td id="memberId">${result[i].id}</td>
								<td>${result[i].member_name}</td>
								<!-- <td>${result[i].grade}</td>
								 <td>${result[i].section}</td>
								 <td>${result[i].roll_no}</td> -->
								<td>${result[i].BookName}</td>
								<td>${result[i].book_id}</td>
								<td>${daysdue}</td>
								<td>${result[i].borrowing_date}</td>
								<!--<td></td>-->
								
=======
var borrowb = function(studentId, bookId) {
	console.log("Borrow function entered");
	var request=new XMLHttpRequest();
	var button=document.getElementById("borrowButton");
	borrowButton.innerHTML="Processing..."
	borrowButton.disabled=true;
	request.onreadystatechange = function() {
		console.log("readystatechange borrow func entered");
		if(request.readyState === XMLHttpRequest.DONE) {
			if(request.status===200) {
				if(this.responseText==="Book successfully borrowed") {
					alert("Book borrowed");
				} else if(borrowData.sqlState==="45000") {
					alert("All specimens of this book have already been borrowed.");
				} else {
					alert("These IDs do not exist.");
				}
			} else if(request.status===500){
					alert("All specimens of this book have already been borrowed.");
			} else {

			}
		}
		borrowButton.innerHTML="Borrow";
		borrowButton.disabled=false;
	};
	request.open('POST', '/borrow-book', false);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({studentId: studentId, bookId: bookId}));
};

var returnb = function(studentId,bookId) {
	console.log("return function entered");
	var request=new XMLHttpRequest();
	var button=document.getElementById("returnButton");
	returnButton.innerHTML="Processing..."
	returnButton.disabled=true;
	request.onreadystatechange = function() {
		console.log("readystatechange borrow func entered");
		if(request.readyState === XMLHttpRequest.DONE) {
			if(request.status===200) {
				if(this.responseText==="Book successfully returned") {
					alert("Book returned");
				} else {
					alert("The database cannot accept this data.");
				}
			} else {
				alert("The database cannot accept this data.");
			}
		}
		returnButton.innerHTML="Borrow";
		borrowButton.disabled=false;
	};
	request.open('POST', '/return-book', false);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({studentId: studentId, bookId: bookId}));
};

var loadSubClasses =function(grade) {
			console.log('subclass function entered');
			var request=new XMLHttpRequest();
			var contentDiv = document.getElementById('classListDiv');
			request.onreadystatechange = function () {
			console.log('readystatechange subclass func entered');
			if (request.readyState === XMLHttpRequest.DONE) {

				if (request.status === 200) {
					var subcontent=`
						<a href="loggedIn/borrow-book"><button>Borrow Book</button></a>
						<a href="loggedIn/return-book"><button>Return Book</button></a>
						<table>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Grade</th>
								<th>Section</th>
								<th>Roll no.</th>
							</tr>

					`
					;
					var result=JSON.parse(this.responseText);
					console.log(result);
					for(var j=0; j<result.length;j++) {
						subcontent+=`
						<tr>
							<td>${result[j].id}</td>
							<td>${result[j].student_name}</td>
							<td>${result[j].grade}</td>
							<td>${result[j].section}</td>
							<td>${result[j].roll_no}</td>
						</tr>


						`;

					}
					subcontent=subcontent+`</table>`;
					console.log(subcontent);
					contentDiv.innerHTML=subcontent;
				} else {
					contentDiv.innerHTML="Oops! Could not load all information.";
				}
			}
			};
			request.open('POST', '/get-students', true);
    		request.setRequestHeader('Content-Type', 'application/json');
    		request.send(JSON.stringify({class:grade}));
};


var loadFine =function() {
			console.log("fine function entered");
			var request=new XMLHttpRequest();
			request.onreadystatechange = function () {
			console.log('readystatechange subclass func entered');
			if (request.readyState === XMLHttpRequest.DONE) {
				if (request.status === 200) {
					console.log("200");
					document.getElementById("search").disabled=true;
					document.getElementById("search").innerHTML="Processing...";
				} else {
					document.getElementById('studentInfo').innerHTML="Oops! Could not load all information.";
				}
			}
			};
			request.open('POST', '/check-fine', false)
    	request.setRequestHeader('Content-Type', 'application/json');
    	request.send(null);
};

var loadStudent =function(id, name) {
	if(id.length===0 && name.length===0) {
		document.getElementById("search").disabled=false;
		document.getElementById("search").innerHTML="Search";
		return;
	}
			document.getElementById("search").disabled=true;
			document.getElementById("search").innerHTML="Processing...";
			console.log("function entered");
			var contentDiv = document.getElementById('studentInfo');
			var request=new XMLHttpRequest();
			request.onreadystatechange = function () {
			console.log('readystatechange subclass func entered');
			if (request.readyState === XMLHttpRequest.DONE) {
				if (request.status === 200) {
					var subcontent=
					`
						<table class="table table-striped bg-warning">
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Grade</th>
								<th>Section</th>
								<th>Roll no.</th>
								<th>Name of borrowed book</th>
								<th>ID of borrowed book</th>
								<th>Borrowing Date</th>
								<th>Returning Date</th>
								<th>Fine Pending</th>
								<th></th>
								<th></th>
							</tr>
					`
					;
					var result=JSON.parse(this.responseText);
					console.log(result);
					if(result===[] || result[0]===undefined) {
						subcontent=``;
						contentDiv.innerHTML=subcontent;
						alert("This ID or Name does not exist...");
						document.getElementById("search").innerHTML="Search";
						document.getElementById("search").disabled=false;
						return;
					}

					var borrowed;
					var bb=1-2;
					var rb=1-2;
					for(i=0;i<result.length;i++) {

						if(result[i].book_id===null) {
							result[i].BookName="---";
							result[i].book_id="---";
							result[i].borrowing_date="---";
							result[i].returning_date="---";
							result[i].Fine_pending=0;
							borrowed=false;
							bb++;
						} else {
							borrowed=true;
							rb++;
						}

							subcontent+=`
							<tr>
								<td id="studentId">${result[i].id}</td>
								<td>${result[i].student_name}</td>
								<td>${result[i].grade}</td>
								<td>${result[i].section}</td>
								<td>${result[i].roll_no}</td>
								<td>${result[i].BookName}</td>
								<td>${result[i].book_id}</td>
								<td>${result[i].borrowing_date}</td>
								<td>${result[i].returning_date}</td>
								<td>Rs. ${result[i].Fine_pending}</td>
>>>>>>> f05836a67c278646085fa9c873dab62e09cb7554


							`;

<<<<<<< HEAD
                    if (borrowed === false) {
                        subcontent += `
									<td><center>
									<input type="number" placeholder="Book ID" class="bookID" style="width:83px;">
									<button class=" btn btn-outline-secondary borrowButton" onclick="borrowb('${result[i].id}',document.getElementsByClassName('bookID')[${bb}].value, ${bb})">Borrow</button>
									</center></td>
									</tr>
								`;
                    } else {
                        subcontent += `
								
								<td><center><button class="btn btn-outline-secondary returnButton" onclick="returnb('${result[i].id}',${result[i].book_id}, ${rb})">Return</button></center></td>

								<!--<td><button class="btn btn-secondary" onclick="alert('Replace the book and click Return.');">Book Lost/Damaged?</button></td>-->
								</tr>
								`;
                    }
                    contentDiv.innerHTML = subcontent;
                }
            }

            subcontent += `</table>`;
            contentDiv.innerHTML = subcontent;
            document.getElementById("search").innerHTML = "Search";
            document.getElementById("search").disabled = false;
        }else if(request.status===403) {
            alert("403 - Forbidden");
        } else {
            contentDiv.innerHTML = "Oops! Could not load all information.";
        }
    }

    request.open('POST', '/get-member', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        id: id,
        name: name
    }));
};


// var loadSubClasses = function(grade) {
//     var request = new XMLHttpRequest();
//     var contentDiv = document.getElementById('classListDiv');
//     request.onreadystatechange = function() {
//         if (request.readyState === XMLHttpRequest.DONE) {

//             if (request.status === 200) {
//                 var subcontent = `
//                         <a href="loggedIn/borrow-book"><button>Borrow Book</button></a>
//                         <a href="loggedIn/return-book"><button>Return Book</button></a>
//                         <table>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Grade</th>
//                                 <th>Section</th>
//                                 <th>Roll no.</th>
//                             </tr>

//                     `;
//                 var result = JSON.parse(this.responseText);
//                 for (var j = 0; j < result.length; j++) {
//                     subcontent += `
//                         <tr>
//                             <td>${result[j].id}</td>
//                             <td>${result[j].member_name}</td>
//                             <td>${result[j].grade}</td>
//                             <td>${result[j].section}</td>
//                             <td>${result[j].roll_no}</td>
//                         </tr>
//                         `;

//                 }
//                 subcontent = subcontent + `</table>`;
//                 contentDiv.innerHTML = subcontent;
//             } else {
//                 contentDiv.innerHTML = "Oops! Could not load all information.";
//             }
//         }
//     };
//     request.open('POST', '/get-members', true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify({
//         class: grade
//     }));
// };
=======
							console.log(borrowed);
							if(borrowed===false) {
								console.log(result);
								subcontent+=`
									<td>Book Id:<input type="number" class="bookID"></td>
									<td><button class="btn btn-warning borrowButton">Borrow</button></td>
									</tr>
								`;
							} else {
								subcontent+=`
								<td><button class="btn btn-warning returnButton">Return Book</button></td>
								<td><button class="btn btn-danger" onclick="alert('Ask the person to buy and return a new copy of the book and pay the fine(If pending).');">Book Lost/Damaged?</button></td>
								</tr>
								`;
							}
							console.log(subcontent);
							contentDiv.innerHTML=subcontent;
							console.log(bb);
							console.log(rb);
							console.log(document.getElementsByClassName("borrowButton")[bb]);
							console.log(document.getElementsByClassName("returnButton")[rb]);
							if(document.contains(document.getElementsByClassName("borrowButton")[bb])) {
								console.log("condition entered");
								(document.getElementsByClassName("borrowButton")[bb]).addEventListener("click", function() {
									console.log("event entered borrow");
									borrowb(result[i].id, document.getElementsByClassName("bookID")[bb].value);
									loadBooks("","");
									loadStudent(id);
								});
							}
							if(document.contains(document.getElementsByClassName("returnButton")[rb])) {
								(document.getElementsByClassName("returnButton")[rb]).addEventListener("click", function(){
									returnb(result[i].id,result[i].book_id);
									loadBooks("","");
									loadStudent(id);
								});
							}
						}

						subcontent+=`</table><button class="btn btn-warning" id="RecalcFine">Recalculate Fine</button>`;
						contentDiv.innerHTML=subcontent;
						document.getElementById("RecalcFine").addEventListener("click", function() {
							loadFine();
							loadStudent(id);
						});
						document.getElementById("search").innerHTML="Search";
						document.getElementById("search").disabled=false;
				} else {
					contentDiv.innerHTML="Oops! Could not load all information.";
				}
			}
			};
			request.open('POST', '/get-student', true);
			request.setRequestHeader('Content-Type', 'application/json');
		//	request.open('POST', '/check-fine', true)
    	//request.setRequestHeader('Content-Type', 'application/json');
    	request.send(JSON.stringify({id:id, name:name}));
};
>>>>>>> f05836a67c278646085fa9c873dab62e09cb7554

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


							`;

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

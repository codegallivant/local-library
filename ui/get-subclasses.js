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
								


							`;

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

var addMember = function(memberName) {
    request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.status == 200) {
            alert("Member added.");
        } else if(request.status == 403) {
            alert("403 - Forbidden");
        } else {
            alert("Member could not be added.");
        }
    }
    request.open('POST', '/create-member', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify( {
        name: memberName
    }))
    loadMember(null,"");
}


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
function loadBooks(identityId, identityName, checkEmpty) {
    "use strict";
    var request = new XMLHttpRequest();
<<<<<<< HEAD
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (identityId === "" && identityName === "") {
                checkEmpty = false;
            } else {
                checkEmpty = true;
            }
            if (document.getElementById("bookIdBox").value.length === 0 && document.getElementById("bookNameBox").value.length === 0 && checkEmpty !== false) {
                loadBooks("", "");
=======
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if(identityId==="" && identityName==="") {
              checkEmpty=false;
            } else {
              checkEmpty=true;
            }
            if(document.getElementById("bookIdBox").value.length===0 && document.getElementById("bookNameBox").value.length===0 && checkEmpty!==false) {
              loadBooks("", "");
>>>>>>> f05836a67c278646085fa9c873dab62e09cb7554
            }
            var books = document.getElementById('book-display');
            if (request.status === 200) {
                var content = ` `;
                var status;
                var bookData = JSON.parse(this.responseText);
<<<<<<< HEAD
                for (var i = 0; i < bookData.length; i++) {
                    if (bookData[i].QuantityLeft === 0) {
                        status = "danger";
                    } else if (bookData[i].Issued !== 0) {
                        status = "warning";
                    } else {
                        status = "success";
                    }
                    content += `

                      <tr class="bg-${status}" >
=======
                for (var i=0; i< bookData.length; i++) {
                    if(bookData[i].QuantityLeft===0) {
                      status="danger";
                    } else if(bookData[i].Issued!==0) {
                      status="warning";
                    } else {
                      status="success";
                    }
                    content += `
                      <tr class="bg-${status}">
>>>>>>> f05836a67c278646085fa9c873dab62e09cb7554
                        <td>${bookData[i].id}</td>
                        <td>${bookData[i].BookName}</td>
                        <td>${bookData[i].Issued}</td>
                        <td>${bookData[i].TotalQuantity}</td>
                        <td>${bookData[i].QuantityLeft}</td>
<<<<<<< HEAD
                        <td><button class = "btn btn-outline-light" onclick = "bookInfo(${bookData[i].id}, '${bookData[i].BookName}', ${bookData[i].Issued}, ${bookData[i].TotalQuantity}, ${bookData[i].QuantityLeft},'${status}');">View details</td>
                      </tr>


                    `;
                }
                books.innerHTML = content;
            } else if(request.status===403) {
                alert("403 - Forbidden");
            } else {
                books.innerHTML = 'Oops! Could not load all books!';
            }
        }
    };
    request.open('POST', '/get-books', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        identityId: identityId,
        identityName: identityName
    }));
};

document.getElementById("bookIdBox").addEventListener("input", function() {
    loadBooks(document.getElementById("bookIdBox").value);
});
document.getElementById("bookNameBox").addEventListener("input", function() {
    loadBooks("", document.getElementById("bookNameBox").value);
});
if (document.getElementById("bookIdBox").value.length === 0 && document.getElementById("bookNameBox").value.length === 0) {
    loadBooks("", "");
}



var bookInfo = function(bookID, bookName, Issued, TotalQuantity, QuantityLeft, status) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var content = ``;
                var bookData = JSON.parse(this.responseText);
                content += `
<table class = "table table-striped table-bordered border-${status} rounded" >
<thead>
  <tr>
    <th>Book ID</th>
    <th>Book Name </th>
    <th>Issued</th>
    <th>Total Quantity</th>
    <th>Quantity Left</th>
  </tr>
</thead>
<tbody>
<tr>
  <td>${bookID}</td>
  <td>${bookName}</td>
  <td>${Issued}</td>
  <td>${TotalQuantity}</td>
  <td>${QuantityLeft}</td>
  </tr>
</tbody>
</table>

<p><b>Lent to:</b> </p>
`;

                if (this.responseText === "[]") {
                    content += "Nobody has borrowed this book.";
                } else {
                    content += `


<table class="table table-striped " >
<thead>
<tr>
<th>Borrow ID</th>
<th>Member ID</th> 
<th>Days due:</th>
<th>Borrowing Date</th>  
<!--<th>Returning Date</th>-->
</tr>
</thead>
`;

                    for (var i = 0; i < bookData.length; i++) {
                        content += `
                <tr>
                  <td>${bookData[i].id}</td>
                  <td>${bookData[i].member_id}</td>
                  <td>${loadFine(bookData[i].borrowing_date)}</td>
                  <td>${bookData[i].borrowing_date}</td>
                  <!--<td></td>-->
                </tr>
              `;

                    }
                    content += `</table>`;
                }
                var bookModal = newModal(`Book Details (ID - ${bookID})`, content, `<button class="btn btn-primary">Edit</button>`, "xl");
                bookModal.toggle();
            }  else if(request.status===403) {
                alert("403 - Forbidden");
            }  else {
                alert("Something went wrong");
            }
        }
    }
    request.open('POST', '/get-book', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        identityId: bookID
    }));
}
=======
                      </tr>

                    `;
                }
   /* <HR>

                        <div class="commentBoxPar" id="${programData[i].tag}_CommentBoxPar">
                            <TEXTAREA id="${programData[i].tag}_commentBox" style="overflow:auto; width: 70%; height: 100%; max-width: 70%; max-height: 100%; min-width: 70%; min-height: 100%;" class="commentBox"> </TEXTAREA>
                        </div>

                        <div class="commentDiv" id="${programData[i].tag}_CommentDiv">
                        <div class="commentB" id="${programData[i].tag}_CommentB"><button>Comment</button></div>
                        <div class="ShowCom" id="${programData[i].tag}_ShowCom"><button>Show All Comments</button></div>
                        </div>
                        </div>*/
                console.log(content);
                books.innerHTML = content;
            } else {
                books.innerHTML='Oops! Could not load all books!';
            }
        }
    };
    console.log(document.getElementById("bookIdBox", '').value);
    request.open('POST', '/get-books', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({identityId:identityId ,identityName:identityName}));
};

document.getElementById("bookIdBox").addEventListener("input", function() {
  loadBooks(document.getElementById("bookIdBox").value);
});
document.getElementById("bookNameBox").addEventListener("input", function() {
  loadBooks("", document.getElementById("bookNameBox").value);
});
if(document.getElementById("bookIdBox").value.length===0 && document.getElementById("bookNameBox").value.length===0) {
  loadBooks("", "");
}
>>>>>>> f05836a67c278646085fa9c873dab62e09cb7554

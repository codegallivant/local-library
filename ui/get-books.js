function loadBooks(identityId, identityName, checkEmpty) {
    "use strict";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if(identityId==="" && identityName==="") {
              checkEmpty=false;
            } else {
              checkEmpty=true;
            }
            if(document.getElementById("bookIdBox").value.length===0 && document.getElementById("bookNameBox").value.length===0 && checkEmpty!==false) {
              loadBooks("", "");
            }
            var books = document.getElementById('book-display');
            if (request.status === 200) {
                var content = ` `;
                var status;
                var bookData = JSON.parse(this.responseText);
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
                        <td>${bookData[i].id}</td>
                        <td>${bookData[i].BookName}</td>
                        <td>${bookData[i].Issued}</td>
                        <td>${bookData[i].TotalQuantity}</td>
                        <td>${bookData[i].QuantityLeft}</td>
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

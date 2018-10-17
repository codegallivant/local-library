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
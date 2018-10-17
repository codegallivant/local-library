

function loadClasses() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var classListDiv = document.getElementById('classListDiv');
            if (request.status === 200) {
                var content = ` `;
                var classNames = JSON.parse(this.responseText);
                console.log(classNames);
                console.log(this.responseText);
                for (var i=0; i< classNames.length; i++) {

                    content += `
                    <button class="gotProgram" onclick="loadSubClasses(${classNames[i].class});">Class ${classNames[i].class}</button>
					
					`	
					
                }
                console.log(content);
                classListDiv.innerHTML = content;
            } else {
                classListDiv.innerHTML='Oops! Could not load all classes!';
            }
        }
    };

    request.open('POST', '/get-classes', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(null);
}

loadClasses();

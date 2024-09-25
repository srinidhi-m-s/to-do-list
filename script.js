const inputField =document.getElementById("input-field");
const description =document.getElementById("description");
const listContainer =document.getElementById("list-container");
function addTask(){
    if(inputField.value === ''){
        alert("Enter something!");
    }
    else{
        let li = document.createElement("li");
        if(description.value){
            li.innerHTML = inputField.value +" - "+description.value;
        }
        else{
            li.innerHTML = inputField.value;
        }
        listContainer.appendChild(li);
        let span= document.createElement("span");
        span.innerHTML = "x";
        li.appendChild(span);
    }
    inputField.value="";
    description.value="";
    saveData()
}
listContainer.addEventListener("click", (e)=>{
    const listItem = e.target.closest("li");
    const rect = listItem.getBoundingClientRect();
    const isClickOnPseudo = (
        e.clientX >= rect.left + 12 &&
        e.clientX <= rect.left + 40 && 
        e.clientY >= rect.top + 10 &&
        e.clientY <= rect.top + 38 
    );
    if (isClickOnPseudo) {
        listItem.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "LI" || e.target.classList.contains("text") ) {
        const input = document.createElement("input");
        input.value = listItem.firstChild.textContent.trim();
        listItem.firstChild.replaceWith(input);
        input.focus();

        input.addEventListener("blur", () => saveEdit(input,listItem));
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") saveEdit(input,listItem);
        });
    }
    else if(e.target.tagName === "SPAN" ){        
        e.target.parentElement.remove();
        saveData();        
    }
    
    
},false);

function saveEdit(input, listItem) {
    const newText = input.value.trim();
    const li = document.createElement("li"); 

    li.innerHTML = newText || "Task removed"; 

    const span = document.createElement("span");
    span.innerHTML = "x";
    li.appendChild(span);

    listContainer.replaceChild(li, listItem); 

    saveData(); 
}


function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showData(){ 
    
    listContainer.innerHTML=localStorage.getItem("data");
}

showData();
let checkBtn = document.getElementById('checkIcon')
let inputField = document.getElementById('inputField');
let editBtn = document.getElementById('editBtn');
let deleteBtn = document.getElementById('deleteBtn');
let toDoList = document.querySelector('.toDoContainer');
let addBtn = document.getElementById('addBtn');

let toDoItem = document.getElementById('item');


// função para adicionar item a lista
function addToDo() {
    if (inputField.value === '') {
        return;
    }
    let toDo = inputField.value;
    const item = `
            <div id="item">
                <img id="checkIcon" src="check.png">
                <p id="text">${toDo}</p>
                <img id="editBtn" src="editBtn.png">
                <img src="trash.jpg" class="show" id="deleteBtn">

            </div>
                 `;
    const position = 'afterbegin'
    toDoList.insertAdjacentHTML(position, item);
    inputField.value = "";
    updateLocalStorage();
}
// função para identifcar remove e editar 
function identifyItems(event) {
    const targetBtn = event.target;
    const itemBG = targetBtn.parentNode;
    var textItem = targetBtn.parentNode;


    console.log(toDoList.childre);
    if (targetBtn.id === "checkIcon") {
        itemBG.className = 'greenbg';
        textItem.style.textDecoration = "line-through"
    } else if (targetBtn.id === "deleteBtn") {
        if (textItem.style.textDecoration !== "line-through") {
            window.alert("Você não selecionou o item como completo clicando ao lado do texto");
        } else if (textItem.style.textDecoration === "line-through") {
            targetBtn.parentNode.parentNode.removeChild(targetBtn.parentNode);
            updateLocalStorage();
        }




    } // editar se clicando no editBtn
    if (targetBtn.id === "editBtn") {
        inputField.value = targetBtn.parentNode.children[1].innerText;
        updateLocalStorage()
        targetBtn.parentNode.parentNode.removeChild(targetBtn.parentNode);






    }
}



// função para desaparecer e aparecer deleteBtn
function deleteEnableDisable(action) {
    deleteBtn.className = `${action}`
}


function updateLocalStorage() {
    localStorage.setItem("toDo", toDoList.innerHTML);
}

function getLocalStorageData() {
    if (localStorage.getItem("toDo")) {
        toDoList.insertAdjacentHTML("afterbegin", localStorage.getItem("toDo"))
    }
}









addBtn.addEventListener('click', () => {
    addToDo();
})
window.addEventListener('load', () => {
    getLocalStorageData();
})
toDoList.addEventListener('click', identifyItems)

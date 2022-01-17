let tasks = [];
let todoList = document.getElementById('todo');
let doneList = document.getElementById('done');
/* localStorage.clear() */

//Recupera o array de tasks e cria os elementos <li>
onload = function(){
    let oldTasks = JSON.parse(localStorage.getItem('tasks'));
    if (oldTasks != null){
        tasks = oldTasks;
    }
    tasks.forEach(function(objeto){
        let input = objeto.task;
        let checked = objeto.checked
        addTask(input, checked);
    })
    refreshId();
}

function filterData(){
    let input = document.getElementById('input').value;
    console.log(input)
    if(input == ''){
        alert('Nova tarefa não pode ser vazia');
        return;
    }else if(tasks.map(function(n){return n.task}).includes(input)){
        alert('Essa tarefa já existe na sua lista');
        //Sugestão: adicionar uma pequena animação realçando a task repetida
        return;
    }
    tasks.push({task: input, checked: false});
    addTask(input);
    refreshId();
}

function addTask(input, checked){
    let newLi = document.createElement('li');
    let liContent = newLi.appendChild(document.createElement('span'));
    checked ? doneList.insertBefore(newLi, doneList.firstChild) : todoList.insertBefore(newLi, todoList.firstChild);
    liContent.textContent = input;
    newLi.innerHTML = '<input type="checkbox" class="taskCheckbox" onclick="refreshChecked(this)">' + newLi.innerHTML + '<button class="taskButton" onclick="removeTask(this)"><span class="material-icons md-18">delete_outline</span></button>';
}

function removeTask(n){
    tasks.splice(n.id,1);
    n.parentElement.remove();
    refreshId();
}

function refreshChecked(n){
    if (n.checked){
        doneList.insertBefore(n.parentElement, doneList.firstChild);
        tasks[n.id].checked = true;
        console.log(tasks[n.id])
    }else{
        todoList.insertBefore(n.parentElement, todoList.firstChild);
        tasks[n.id].checked = false;
        console.log(tasks[n.id])
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function refreshId(){
    tasks.forEach(function(item, index){
        let button = document.getElementsByClassName('taskButton')[index];
        let checkbox = document.getElementsByClassName('taskCheckbox')[index];
        let parentContent = button.parentElement.textContent.slice(0, -14);
        let parentIndex = tasks.map(function(n){return n.task}).indexOf(parentContent);
        checkbox.id = parentIndex;
        button.id = parentIndex;
        if (tasks[parentIndex].checked){
            checkbox.checked = true;
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
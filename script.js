let userToDo = [];
let id;

function getUserToDo() {
    userToDo = JSON.parse(localStorage.getItem("userToDo")) || [];
    id = (userToDo.length > 0 ? userToDo[userToDo.length - 1].id + 1 : 1);
    console.log('id: ', id);

    let addToListDiv = document.getElementById('appendData');
    if (userToDo.length > 0) {
        userToDo.forEach(value => {
            addToListDiv.appendChild(createToDoElement(value));
        });
    } else {
        addToListDiv.innerHTML = `<a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">No To Do Found</h5>
                    </div>
                </a>`;
    }
}

function createToDoElement(value) {
    const item = document.createElement('a');
    item.href = "#";
    item.classList.add('list-group-item', 'list-group-item-action');
    if (value.completed) {
        item.classList.add('bg-secondary', 'text-white');
    }

    const content = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${value.heading}</h5>
                    <small class="ml-auto">3 days ago</small>
                    <div class="ml-2">
                        <button type="button" data-id="${value.id}" class="btn btn-warning" onclick="editToDo(event)">Edit</button>
                        <button type="button" data-id="${value.id}" class="btn btn-danger" onclick="deleteToDo(${value.id},event)">Delete</button>
                        <button type="button" data-id="${value.id}" onclick="markDone(${value.id},event)" class="btn btn-success ${value.completed ? 'disabled' : ''}">${value.completed ? 'Completed' : 'Mark As Done'}</button>
                    </div>
                </div>
                <p class="mb-1">${value.content}</p>
            `;

    item.innerHTML = content;
    return item;
}

function addNewToDo() {
    const headingInput = document.getElementById('heading');
    const contentInput = document.getElementById('content');

    const heading = headingInput.value.trim();
    const content = contentInput.value.trim();

    const headingError = document.getElementById('heading-error');
    const contentError = document.getElementById('content-error');

    if (heading === '') {
        headingError.innerHTML = "Please Enter Heading";
    } else {
        headingError.innerHTML = "";
    }

    if (content === '') {
        contentError.innerHTML = "Please Enter Content";
    } else {
        contentError.innerHTML = "";
    }

    if (heading === '' || content === '') {
        return false;
    }

    const addToListDiv = document.getElementById('appendData');
    const objectToStore = {
        id: id,
        heading: heading,
        content: content,
        completed: false,
        createdAt: moment().format('DD-MM-yyyy hh:mm:ss')
    };

    const newItem = createToDoElement(objectToStore);
    addToListDiv.appendChild(newItem);

    userToDo.push(objectToStore);
    localStorage.setItem("userToDo", JSON.stringify(userToDo));
    id++;
    $('.modal').modal('hide');
}

function deleteToDo(toDoId, event) {
    event.target.closest('a').remove();
    const index = userToDo.findIndex(item => item.id === toDoId);
    userToDo.splice(index, 1);
    localStorage.setItem("userToDo", JSON.stringify(userToDo));
}

function markDone(toDoId, event) {
    event.target.innerHTML = "Completed";
    event.target.classList.add('disabled');
    event.target.closest('a').classList.add('bg-secondary', 'text-white');
    const index = userToDo.findIndex(item => item.id === toDoId);
    userToDo[index].completed = true;
    localStorage.setItem("userToDo", JSON.stringify(userToDo));
}

function editToDo(e){
    let heading = e.target.closest('div').parentElement.firstElementChild.innerHTML;
    let content = e.target.closest('div').parentElement.nextElementSibling.innerHTML;
    document.getElementById('edit-heading').value = heading;
    document.getElementById('edit-content').value = content;
    $('#staticBackdrop2').modal('show');
}

function submitEditToDo(e){
    
}

getUserToDo();
// get reference to HTML elements
const taskInput = document.getElementById( "taskInput" );
const addTask = document.getElementById( "addTask" );
const taskList = document.getElementById( "taskList" );
const showAllButton = document.getElementById( "showAll" );
const showActiveButton = document.getElementById( "showActive" );
const showCompletedButton = document.getElementById( "showCompleted" );

// add click event listener to the Add Task button
addTask.addEventListener( "click", () => addNewTask() );

// add click event listener to the Show All button
showAllButton.addEventListener( "click", () => renderFilteredTasks( "all") );

// add click event listener to the Show Active button
showActiveButton.addEventListener( "click", () => renderFilteredTasks( "active") );

// add click event listener to the Show Completed button
showCompletedButton.addEventListener( "click", () => renderFilteredTasks( "completed") );

const tasks = [];

// add new task to the tasks array
function addNewTask() {
    let taskName = taskInput.value.trim();

    if( taskName === "" ) return;

    const newTask = {
        taskTitle: taskName,
        completed: false,
        deleted: false
    }
    tasks.push( newTask )

    taskInput.value = "";

    renderFilteredTasks( "all" );
}

function renderTasks( filteredTasks ) {
    console.log( tasks )
    // reset the task list
   taskList.innerHTML = "" 

    // iterate over the tasks array
    filteredTasks.forEach( task => {
        const { taskTitle, completed, deleted } = task

            // create li element, add checkbox, taskTitle, button
            let taskItem = document.createElement( "li" )
            taskItem.innerHTML = `
                <input type = "checkbox" ${completed ? "checked" : ""}>
                <span class = "task ${completed ? "completed" : ""}">${taskTitle}</span>
                <button class = "delete">DELETE</button>
            `
            // add eventListeners
            const deleteButton = taskItem.querySelector( ".delete" )
            deleteButton.addEventListener( "click", () => deleteTask( tasks.indexOf( task ) ) )

            const checkbox = taskItem.querySelector( "input[type = 'checkbox']" )
            checkbox.addEventListener( "change", () => toggleCompleted( tasks.indexOf( task ) ) )

            // add to the list
            taskList.appendChild( taskItem )
    });
}

// delete task
function deleteTask( index ) {
    tasks[index].deleted = true
    renderFilteredTasks( "all" );
}

// toggle completed task
function toggleCompleted( index ) {
    tasks[index].completed = !tasks[index].completed
    renderFilteredTasks( "all" );
}

// filter tasks based on the filterType and set the active button color
function filterTasks( filterType ) {
    resetActiveButton();

    switch( filterType ) {
        case "all":
            showAllButton.style.backgroundColor = "#2d3033"
            return tasks.filter( task => !task.deleted );
        case "active":
            showActiveButton.style.backgroundColor = "#2d3033"
            return tasks.filter( task => !task.completed && !task.deleted );
        case "completed":
            showCompletedButton.style.backgroundColor = "#2d3033"
            return tasks.filter( task => task.completed && !task.deleted );
        default:
            return [];
    }
}

// render filtered tasks based on the filterType
function renderFilteredTasks( filterType ) {
    const filteredTasks = filterTasks( filterType );
    renderTasks( filteredTasks );
}

// reset the active button to default color
function resetActiveButton() {
    showAllButton.style.backgroundColor = "#007BFF"
    showActiveButton.style.backgroundColor = "#007BFF"
    showCompletedButton.style.backgroundColor = "#007BFF"
}

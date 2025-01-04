// get reference to HTML elements
const taskInput = document.getElementById( "taskInput" );
const addTask = document.getElementById( "addTask" );
const taskList = document.getElementById( "taskList" );
const showAllButton = document.getElementById( "showAll" );
const showActiveButton = document.getElementById( "showActive" );
const showCompletedButton = document.getElementById( "showCompleted" );
const addTaskForm = document.getElementById( "addTaskForm" );

// get tasks from the localStorage
const tasks = localStorage.getItem( "tasks" ) ? JSON.parse( localStorage.getItem( "tasks" ) ) : [];


// add click event listener to the Add Task button
addTask.addEventListener( "click", () => {
    addTaskForm.style.display === "none" ? addTaskForm.style.display = "" : addTaskForm.style.display = "none";
} );

addTaskForm.addEventListener( "submit", ( event ) => {
    event.preventDefault();

    const { taskName, taskDesc, taskDueDateAndTime } = getTaskFormVAlues();

    addNewTask( { taskName, taskDesc, taskDueDateAndTime } );

    addTaskForm.reset();

    addTaskForm.style.display = "none";
} );

// add click event listener to the Show All button
showAllButton.addEventListener( "click", () => renderFilteredTasks( "all") );

// add click event listener to the Show Active button
showActiveButton.addEventListener( "click", () => renderFilteredTasks( "active") );

// add click event listener to the Show Completed button
showCompletedButton.addEventListener( "click", () => renderFilteredTasks( "completed") );


// add new task to the tasks array in the localStorage
function addNewTask( { taskName, taskDesc, taskDueDateAndTime }) {
    if( taskName === "" ) return;

    const newTask = {
        taskName,
        taskDesc,
        taskDueDateAndTime,
        completed: false,
        deleted: false
    }

    tasks.push( newTask );
    saveTasksToLocalStorage( tasks );

    renderFilteredTasks( "all" );
}

// render tasks
function renderTasks( filteredTasks ) {
    console.log( tasks )
    // reset the task list
   taskList.innerHTML = "" 

    // iterate over the tasks array
    filteredTasks.forEach( task => {
        const { taskName, taskDesc, taskDueDateAndTime, completed, deleted } = task

            // create li element, add checkbox, taskTitle, button
            let taskItem = document.createElement( "tr" );
            taskItem.className = `task ${completed ? "completed" : ""}`;
            taskItem.innerHTML = `
                <td><input type = "checkbox" ${completed ? "checked" : ""}></td>
                <td>${taskName}</td>
                <td>${taskDesc}</td>
                <td>${taskDueDateAndTime}</td>
                <td><button class = "delete">DELETE</button></td>
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
    tasks[index].deleted = true;
    saveTasksToLocalStorage( tasks );
    renderFilteredTasks( "all" );
}

// toggle completed task
function toggleCompleted( index ) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage( tasks );
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

// get the values from the task form
function getTaskFormVAlues() {
    const taskName = document.getElementById( "taskName" ).value.trim();
    const taskDesc = document.getElementById( "taskDesc" ).value.trim();
    const taskDueDate = document.getElementById( "taskDueDate" ).value.trim();
    const taskDueTime = document.getElementById( "taskDueTime" ).value.trim();

    const taskDueDateAndTime = new Date( taskDueDate + "T" + taskDueTime ).toLocaleString();

    return { taskName, taskDesc, taskDueDateAndTime };
}

// save tasks to the localStorage
function saveTasksToLocalStorage( tasks ) {
    localStorage.setItem( "tasks", JSON.stringify( tasks ) );
}
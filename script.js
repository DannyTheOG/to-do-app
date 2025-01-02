// get reference to HTML elements
const taskInput = document.getElementById( "taskInput" );
const addTask = document.getElementById( "addTask" );
const taskList = document.getElementById( "taskList" );
const showAllButton = document.getElementById( "showAll" );
const showActiveButton = document.getElementById( "showActive" );
const showCompletedButton = document.getElementById( "showCompleted" );


addTask.addEventListener( "click", addNewTask );

const tasks = [];

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

function deleteTask( index ) {
    tasks[index].deleted = true
    renderFilteredTasks( "all" );
}

function toggleCompleted( index ) {
    tasks[index].completed = !tasks[index].completed
    renderFilteredTasks( "all" );
}

function filterTasks( filterType ) {
    switch( filterType ) {
        case "all":
            return tasks.filter( task => !task.deleted );
        case "active":
            return tasks.filter( task => !task.completed && !task.deleted );
        case "completed":
            return tasks.filter( task => task.completed && !task.deleted );
        default:
            return [];
    }
}

function renderFilteredTasks( filterType ) {
    const filteredTasks = filterTasks( filterType );
    renderTasks( filteredTasks );
}
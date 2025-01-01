// get reference to HTML elements
const taskInput = document.getElementById( "taskInput" );
const addTask = document.getElementById( "addTask" );
const taskList = document.getElementById( "taskList" );
const showCompletedCheckbox = document.getElementById( "showCompleted" );


addTask.addEventListener( "click", addNewTask );

// render tasks when user clicks on the checkbox
showCompletedCheckbox.addEventListener( "change", () => renderTasks() );

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

    renderTasks()
}

function renderTasks() {
    console.log( tasks )
    // reset the task list
   taskList.innerHTML = "" 

   // get the value of showCompletedCheckbox
   const showCompleted = showCompletedCheckbox.checked

    // iterate over the tasks array
    for ( const [index, task] of tasks.entries() ) {
        const { taskTitle, completed, deleted } = task

        // not deleted, if show completed display all, else display not completed
        if( !deleted && ( showCompleted || !completed ) ) { 
            // create li
            // add checkbox, taskTitle, button
            let taskItem = document.createElement( "li" )
            taskItem.innerHTML = `
                <input type = "checkbox" ${completed ? "checked" : ""}>
                <span class = "task ${completed ? "completed" : ""}">${taskTitle}</span>
                <button class = "delete">DELETE</button>
            `
            // add eventListeners
            const deleteButton = taskItem.querySelector( ".delete" )
            deleteButton.addEventListener( "click", () => deleteTask( index ) )

            const checkbox = taskItem.querySelector( "input[type = 'checkbox']" )
            checkbox.addEventListener( "change", () => toggleCompleted( index ) )

            // add to the list
            taskList.appendChild( taskItem )
        }
    }
}

function deleteTask( index ) {
    tasks[index].deleted = true
    renderTasks()
}

function toggleCompleted( index ) {
    tasks[index].completed = !tasks[index].completed
    renderTasks()
}

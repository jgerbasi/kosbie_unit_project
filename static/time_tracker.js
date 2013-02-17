


///////////
// AJAX request functions
///////////


// globals
var tasks;
var categories;

///////////
// Helper functions
///////////

// task_id is index of task in array
// completed is either true or false
function set_completed(task_id, completed)
{
  edit_task(task_id, undefined, undefined, undefined, undefined, undefined, completed);
}

function get_tasks_by_category_id(category_id)
{
  var tasks_array = [];
  
  for (var task in tasks)
  {
    if (task.category_id === category_id)
      tasks_array.push(task);
  }
  return tasks_array;
}

function get_category_name(category_id)
{
  return categories[category_id].name;
}



///////////
// AJAX requests for Tasks
///////////


function get_tasks() {
  $.ajax({
    type: "get",
    url: "/tasks",
    success: function(data) {
      tasks = data.tasks;
    }
  });
}


function add_task(name, category_id, time_estimate, time_spent, time_chunks, completed) {
  $.ajax({
    type: "post",
    data: {"name": name,
           "category_id": category_id,
           "time_estimate": time_estimate,
           "time_spent": time_spent,
           "time_chunks": time_chunks,
           "completed": completed},
    url: "/tasks",
    success: function(data) { 
      if (data.task !== undefined)
      {
        tasks.push(data.task);
        refreshDOM();
      }
    }
  });
}


function edit_task(id, name, category_id, time_estimate, time_spent, time_chunks, completed) {
  $.ajax({
    type: "put",
    data: {"name": name,
           "category_id": category_id,
           "time_estimate": time_estimate,
           "time_spent": time_spent,
           "time_chunks": time_chunks,
           "completed": completed},
    url: "/tasks/" + id,
    success: function(data) {
      if (data.task !== undefined)
      {
        tasks[id] = data.task;
        refreshDOM();
      }
      
    }
  });
}


// We don't support deleting now...

// function del(id) {
//   $.ajax({
//     type: "delete",
//     url: "/listings/" + id,
//     success: function(data) { 
//       //console.log(data);
//     }
//   });
// }



///////////
// AJAX requests for Categories
///////////

function get_categories() {
  $.ajax({
    type: "get",
    url: "/categories",
    success: function(data) {
      categories = data.categories;
    }
  });
}


function add_category(name) {
  $.ajax({
    type: "post",
    data: {"name": name},
    url: "/categories",
    success: function(data) { 
      if (data.category !== undefined)
      {
        categories.push(data.category);
        refreshDOM();
      }
    }
  });
}


function edit_category(id, name) {
  $.ajax({
    type: "put",
    data: {"name": name},
    url: "/categories/" + id,
    success: function(data) {
      if (data.category !== undefined)
      {
        categories[id] = data.category;
        refreshDOM();
      }
    }
  });
}



$(document).ready(function() {
  get_categories();
  get_tasks();
  refreshDOM();
});
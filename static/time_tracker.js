


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

// returns top 5 tasks in terms of time_spent within a
// given category
function get_top_tasks_in_category(category_id)
{
  var category_tasks = get_tasks_by_category_id(category_id);
  // sort array (high to low)
  category_tasks.sort(function(a,b) {
    return b.time_spent - a.time_spent;
    });
  category_tasks.splice(5);
  return category_tasks;
}


// returns array of top categories
// in format : [[1, 400], [4, 200], [3, 100]]
// category id is idx 0, total minutes is idx 1
function get_top_categories()
{
  // key will be category id, value will be summation of time_spent for the category
  var category_time_map = {};
  for (var i = 0; i < tasks.length; i++)
  {
    var thisCategoryId = tasks_copy[i].category_id;
    var thisTimeSpent = tasks_copy[i].time_spent;
    var summedTime = category_time_map[thisCategoryId];
    if (summedTime === undefined)
      summedTime = 0;
    summedTime += thisTimeSpent;
    
  }
  
  // let's insert the key, value pairs from object into an array
  // like so:
  // {3:405, 4:500} => [[3,405], [4,500]]
  category_time_arr = [];
  for (var key in category_time_map)
  {
    var thisPair = [key, category_time_map[key]];
    category_time_arr.push(thisPair);
  }
  
  // now let's sort the array (high to low)
  category_time_arr.sort(function(a,b) {
    return b[1] - a[1];
    });
  category_time_arr.splice(5);
  return category_time_arr;

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
      drawTasks();
      
    }
  });
}


function add_task(name, category_id, description, time_estimate, time_spent, time_chunks, completed) {
  $.ajax({
    type: "post",
    data: {"name": name,
           "category_id": category_id,
           "description": description,
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


function edit_task(id, name, category_id, description, time_estimate, time_spent, time_chunks, completed) {
  $.ajax({
    type: "put",
    data: {"name": name,
           "category_id": category_id,
           "description": description,
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
      drawCategories();
      
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
        drawCategories();
        $('#cat-dropdown').val(categories.length - 1);
        //refreshDOM();
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
  //refreshDOM();
});
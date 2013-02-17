


///////////
// AJAX request functions
///////////


// globals
var tasks;
var categories;




///////////
// AJAX requests for Tasks
///////////


function get_tasks() {
  $.ajax({
    type: "get",
    url: "/tasks",
    success: function(data) {
      tasks = data.tasks;

      refreshDOM();
    }
  });
}


var task = {"name": request.body.name,
            "category_id": request.body.category_id,
            "time_estimate": request.body.time_estimate,
            "time_spent": 0,
            "time_chunks": [] // store time chunks in seconds
            "completed": false };


// Implement the add(desc, author, price) function
function add(name, category_id, time_estimate, time_spent, time_chunks, completed) {
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
      if (data.item !== undefined)
      {
        listings.push(data.item);
        refreshDOM();
      }
    }
  });
}

function edit(id, desc, author, price, sold) {
  $.ajax({
    type: "put",
    data: {desc: desc, author: author, price: price, sold: sold},
    url: "/listings/" + id,
    success: function(data) { }
  });
}

function del(id) {
  $.ajax({
    type: "delete",
    url: "/listings/" + id,
    success: function(data) { 
      //console.log(data);
    }
  });
}

function delAll() {
  $.ajax({
    type: "delete",
    url: "/listings",
    success: function(data) { }
  });
}

$(document).ready(function() {
  get();
});
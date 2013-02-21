
var task1 = {name: "hello world"};
var task2 = {name: "how big are you?"};
var task3 = {name: "how are you?"};
var task4 = {name: "goodbye world"};

var tasks = [task1,task2,task3,task4];

var graph_tasks = []; //an array that stores the task ids to be graphed


// task_ids = [0,1,3,6,7]
function buildSelectElement(task_ids)
{
  var select_element = $("#select_element");
  
  for (var i = 0; i < task_ids.length; i++)
  {
    var task_id = task_ids[i];
    // var append_string = '<option value="' + task_id + '">' + tasks[task_id].name + '</option>';
    // console.log(append_string);
    // select_element.append(append_string);
    
    select_element.append($('<option>', { value : task_id })
                  .text(tasks[task_id].name));
  }
  
}

function addTaskToGraph(task_id)
{
  task_id = parseInt(task_id);
  
  // only do stuff if task not already in list
  if (graph_tasks.indexOf(task_id) === -1)
  {
    //add it to graph_tasks
    graph_tasks.push(task_id);
  
    //add it to graph_tasks ul on page
    var ul = $("#graph_tasks");
  
    var li = $('<li>', { value : task_id })
      .text(tasks[task_id].name + " ");
    
    var del_button = $('<a>').attr("task_id", task_id).html("Delete").addClass("delete_button");
    
    //register remove button click events
    del_button.click(function()
    {
      var this_remove = $(this)
      var task_id = this_remove.attr("task_id");
      removeTaskFromGraph(task_id);
    })
    
    li.append(del_button);
    ul.append(li);
  
    // TODO call function here to refresh graph view.
  }
}


function removeTaskFromGraph(task_id)
{
  task_id = parseInt(task_id);
  $('li[value=' + task_id + ']').remove();
  
  var idx = graph_tasks.indexOf(task_id);
  graph_tasks.splice(idx, 1);
  
  // TODO call function here to refresh graph view.
}


$('document').ready(function()
  {
    // console.log();
    buildSelectElement([0,1,3]);
    
    //register click event for add button

    $('#add_button').click(function()
    {
      var task_id_added = $("#select_element").val()
      addTaskToGraph(task_id_added);
      
    })


    //register click event for top_5_tasks button
    $('#top_5_tasks').click(function()
    {
      //wipe out graph_tasks
      $("#graph_tasks").empty();      
      graph_tasks = [];
      
      //get top 5 (simulate for now)
      var new_top = [1,2,3];
      
      for (var i = 0; i < new_top.length; i++)
      {
        addTaskToGraph(new_top[i]);
      }
    })

  });
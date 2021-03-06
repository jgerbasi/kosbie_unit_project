var maxTaskTime = 0;


function drawGraph() {

  //Graph Axis
  ctx.fillStyle = "black";
  ctx.fillRect(canvas.width * .1, canvas.height * .15, 10, canvas.height * .65); // time
  ctx.fillRect(canvas.width * .1, canvas.height * .8, canvas.width * .8, 10); // task

  //Tasks 
  ctx.fillStyle = "black";
  ctx.font = canvas.width*.03 +"px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Tasks", canvas.width * .5, canvas.height * .98);

  // Time 
  ctx.save();
  ctx.rotate(-Math.PI/2);
  ctx.font = canvas.width*.02 +"px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Time (min)", -canvas.width *.2, canvas.height *.05);
  ctx.restore();
 
  // Bar Graphs values and names

  // Increments on y-axis
  ctx.font = canvas.width * .02 + "px Arial";
  ctx.textAlign = "right";
  if (maxTaskTime !== 0){
    ctx.fillText(Math.round(maxTaskTime*10 )/10  + " -", canvas.width * .1,canvas.height * .15 + 4); // max
    ctx.fillText(Math.round(maxTaskTime*10 *.8 )/10  +" -", canvas.width *.1, canvas.height * .29);
    ctx.fillText(Math.round(maxTaskTime*10* .6 )/10   +" -", canvas.width *.1, canvas.height * .43);
    ctx.fillText(Math.round(maxTaskTime*10 * .4)/10   +" -", canvas.width *.1, canvas.height * .57);
    ctx.fillText(Math.round(maxTaskTime* .2 * 10 )/10   +" -", canvas.width *.1, canvas.height * .71);
  }
  ctx.fillText("0 -",canvas.width * .1,canvas.height * .8 + 2); // 0
 }

 function graphTasks() {
  var leftcanvas = canvas.width * .1 ;
  var rightcanvas = canvas.width * .8 ;
  var topcanvas = canvas.height * .15;
  var downcanvas = canvas.height * .8;

  if (graph_tasks.length !== 0){
      for (i = 0; i < graph_tasks.length; i++) {
        var this_task = tasks[graph_tasks[i]];
        console.log(this_task);
        ctx.fillStyle = "Blue";
        var x_offset = ((leftcanvas + 10) + ((rightcanvas)/(graph_tasks.length))*(i));
        var bar_width = ((rightcanvas)/(5) -10);
        var time_min = (this_task.time_spent/60)/maxTaskTime;
        ctx.fillRect(x_offset, (downcanvas), bar_width, ((time_min) * (topcanvas - downcanvas)));
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.font = canvas.width * .015 + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this_task.name,(x_offset + bar_width/2), (canvas.height * .9));
        ctx.textAlign = "left";
        
      }
  }
 
 }
 
 
function calculateMax() {
  if (graph_tasks.length !== 0) {
    for (i = 0; i < graph_tasks.length; i++) {
      var this_task = tasks[graph_tasks[i]];
      var time_min = this_task.time_spent/60;
      
      console.log(time_min);
      
      if (time_min > maxTaskTime) {
        maxTaskTime = time_min;
      }
    }
  }
  else
    maxTaskTime = 0;
}
 
  
function sizeCanvas(){       // canvas can be resized at any point in game

  redrawGraph();
} 

function redrawGraph() {
  ctx.clearRect(0,0, canvas.width, canvas.height)
  calculateMax();
  drawGraph();
  graphTasks();
}
 
function run() {
  
  buildSelectElement();
  
  //register click event for add button

  $('#add_element').click(function()
  {
    var task_id_added = $("#select_element").val()
    addTaskToGraph(task_id_added);
    
  });


  //register click event for top_5_tasks button
  $('#top_5_tasks').click(function()
  {
    //wipe out graph_tasks
    $("#graph_tasks").empty();      
    graph_tasks = [];
    
    
    var top_tasks = get_top_tasks();
    var top_tasks_indexes = [];
    for (var i = 0; i < top_tasks.length; i++)
    {
      var this_task = top_tasks[i];
      var task_idx = tasks.indexOf(this_task);
      top_tasks_indexes.push(task_idx);
    }
    
    for (var i = 0; i < top_tasks_indexes.length; i++)
    {
      addTaskToGraph(top_tasks_indexes[i]);
    }
  });
  

  canvas = document.getElementById("graphCanvas");
  ctx = canvas.getContext("2d");

  // make canvas focusable, then give it focus!
  ctx.canvas.width  = 570;
  ctx.canvas.height = 250; //sets ratio
  
  canvas.setAttribute('tabindex','0');
  redrawGraph();
  
}

// Prepopulat the dropdown
// var task1 = {name: "hello world", time_spent: 800 };
// var task2 = {name: "how big are you?", time_spent: 600 };
// var task3 = {name: "how are you?", time_spent: 400 };
// var task4 = {name: "goodbye world", time_spent: 200 };
// 
// var tasks = [task1,task2,task3,task4];
var graph_tasks = []; //an array that stores the task ids to be graphed


// task_ids = [0,1,3,6,7]
function buildSelectElement()
{
  // var count = 0;
  // var task_array = [];
  // if (task_ids === undefined)
  //   count = tasks.length;
  //   task_array
  // else
  //   count = tasks_ids.length;
    
    
  var select_element = $("#select_element");
  
  for (var i = 0; i < tasks.length; i++)
  {
    var this_task = tasks[i];
    // var append_string = '<option value="' + task_id + '">' + tasks[task_id].name + '</option>';
    // console.log(append_string);
    // select_element.append(append_string);
    
    select_element.append($('<option>', { value : i })
                  .text(this_task.name));
  }
  
}

function addTaskToGraph(task_id)
{
  task_id = parseInt(task_id);
  
  // only do stuff if task not already in list
  if (graph_tasks.indexOf(task_id) === -1 && graph_tasks.length <= 4)
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
    // tt.push(tasks[task_id]);
    redrawGraph();
  
    // TODO call function here to refresh graph view.
  }
}


function removeTaskFromGraph(task_id)
{
  task_id = parseInt(task_id);
  $('li[value=' + task_id + ']').remove();
  
  var idx = graph_tasks.indexOf(task_id);
  graph_tasks.splice(idx, 1);
  maxTaskTime = 0;
  redrawGraph();
  
  // TODO call function here to refresh graph view.
}


$('document').ready(function()
  {
      // get_categories(drawCategoriesFor);
    get_tasks(run);
      //refreshDOM();
    // run();
    // console.log();

  });
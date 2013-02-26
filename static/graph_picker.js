function drawGraph() {
  //Graph Title
  ctx.fillStyle = "black";
  ctx.font = (canvas.width *.05)+"px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Graph Title", canvas.width/2, canvas.height * .1);

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
  ctx.fillText("Time (min)", -canvas.width *.3, canvas.height *.05);
  ctx.restore();
 
  // Bar Graphs values and names

  // Increments on y-axis
  ctx.font = canvas.width * .02 + "px Arial";
  ctx.textAlign = "right";
  ctx.fillText(maxTime + " -", canvas.width * .1,canvas.height * .15); // max
  ctx.fillText(maxTime * .8 +" -", canvas.width *.1, canvas.height * .29);
  ctx.fillText(maxTime * .6 +" -", canvas.width *.1, canvas.height * .43);
  ctx.fillText(maxTime * .4 +" -", canvas.width *.1, canvas.height * .57);
  ctx.fillText(maxTime * .2 +" -", canvas.width *.1, canvas.height * .71);
  ctx.fillText("0 -",canvas.width * .1,canvas.height * .8); // 0

  graphTasks();
 }
 
 function graphTasks() {
  for (i = 0; i < tasks.length; i++) {
    // console.log("tasks " + tasks);
    ctx.fillStyle = "Blue";
    ctx.fillRect(((canvas.width * .1 + 10) + ((canvas.width * .8)/(tasks.length))*(i)), (canvas.height * .8), ((canvas.width * .8)/(tasks.length+1) -5), ((tasks[i].time_spent/maxTime) * (canvas.height *.17 - canvas.height*.8) -10));
    // console.log("(tasks[i].time_spent) *.2) = " + (tasks[i].time_spent));
    // console.log("canvas.height *.17 = " + canvas.height * .17);
    // console.log("canvas.height *.8 = " + canvas.height *.8);
    // console.log(canvas.height *.8 - canvas.height * .17)
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.font = canvas.width * .015 + "px Arial";
    ctx.fillText(tasks[i].name,((canvas.width * .1 + 10) + ((canvas.width * .8)/(tasks.length))*(i)) , (canvas.height * .9))
  }
 
 }
 
 
function findMax() {
  for (i = 0; i < tasks.length; i++)
  {
    // console.log(tasks[i].time_spent);
    if (tasks[i].time_spent > maxTime)
      maxTime = tasks[i].time_spent;
      // console.log("max time is " + maxTime);
  }

}
 
  
function sizeCanvas(){       // canvas can be resized at any point in game
  ctx.canvas.width  = window.innerWidth * .5;
  ctx.canvas.height = Math.round(ctx.canvas.width * .6); //sets ratio
  drawGraph();
}

 
function run() {

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  item = 0;
  selected = 3;
  maxTime = 0;
  to_graph = [];
  // make canvas focusable, then give it focus!
  window.addEventListener('resize', sizeCanvas);
    canvas.setAttribute('tabindex','0');
  canvas.focus();
  findMax();
  // updateTasks();
  drawGraph();
  sizeCanvas();
    // intervalId = setInterval(draw, timerDelay);
  
}


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

    run();
    // console.log();
    buildSelectElement([0,1,3]);
    
    //register click event for add button

    $('#add_button').click(function()
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
      
      //get top 5 (simulate for now)
      var new_top = [1,2,3];
      
      for (var i = 0; i < new_top.length; i++)
      {
        addTaskToGraph(new_top[i]);
      }
    });

  });
var current_task = -1;

function drawTasksDropDown()
{
  var t = $("#task-dropdown");
  t.html("");
  

  $('<option />', {value: -1, text: 'Select a task ...'}).appendTo(t);

  for(var val in tasks) {
    if(!tasks[val].completed) {
      $('<option />', {value: val, text: tasks[val].name}).appendTo(t);
    }
  }
}

function displayAllTasks()
{
  var container = $("#task-list-table");
  container.html("");
  var header_tr = $('<tr>');

  var name_head = $('<th>');
  name_head.html("Name");
  header_tr.append(name_head);

  var category_head = $('<th>');
  category_head.html("Category");
  header_tr.append(category_head);

  var est_head = $('<th>');
  est_head.html("Est. Time");
  header_tr.append(est_head);

  var actual_head = $('<th>');
  actual_head.html("Actual Time");
  header_tr.append(actual_head);

  container.append(header_tr);

  console.log(container);
  for(var task_index in tasks) {
    task = tasks[task_index];
    var new_tr = $('<tr>');

    var name_td = $('<td>');
    name_td.html(task.name);
    new_tr.append(name_td);

    var category_td = $('<td>');
    category_td.html(categories[task.category_id].name);
    new_tr.append(category_td);

    var est_td = $('<td>');
    est_td.html(displayTime(task.time_estimate));
    new_tr.append(est_td);

    var actual_td = $('<td>');
    actual_td.html(displayTime(task.time_spent));
    new_tr.append(actual_td);

    container.append(new_tr);
  }
}

function display() {

}


$(document).ready(function() {
    $('#start').click(function() {
       $(this).val() === "start" ? start_timer() : stop_timer(false);
    });
    $('#add').click(function(event) {        
      if ($('#dim-overlay').is(":visible") && ($('#taskname').val() !== "")) {
        $('#dim-overlay').hide();
        $('#overlay').hide();
      } else {
        $('#overlay').show();
        $('#dim-overlay').show()
      }
      if ($(this).val() === "New Task") {
        $(this).val("Submit");
        $(this).css("background-color", "#00C6C5");
      } else {
        process_task();
      }
    });
    
    $('#cat-dropdown').change(function() {
      var this_dropdown = $(this);
      var this_value = this_dropdown.val();
      var input = $('#new_category');

      if (this_value === "new")
      {
        input.css("visibility", "visible");
      }
      else
      {
        input.css("visibility", "hidden");
      }
    });


    $('#new_category').keydown(function(event) {
      if (event.which === 13) //user hit enter!
      {
        // add category to backend
        var new_category = $('#new_category').val();
        add_category(new_category);

        $('#new_category').val("");
        $('#new_category').css("visibility", "hidden");
      }
    });

    // $(document).mouseup(function (e) {
    //   var container = $("#overlay");
    //   if (container.has(e.target).length === 0)
    //   {
    //     container.hide();
    //     $("#dim-overlay").hide();
    //   }
    // });

    $('#completed').click(function() {
       stop_timer(true);
       drawTasksDropDown();
       alert("You have completed task: " + current_task.name);
    });

    $('#completed').hide();

    $('#close').click(function() {
      $('#dim-overlay').hide();
      $('#overlay').hide();
      $("#add").val("New Task");
      $("#add").css("background-color", "#C0C0C0");
    });
  
});

function start_timer() {
    if ($('#task-dropdown').val() !== "-1") {
      $('#start').val("stop");
      $('#start').css("background-color", "#D23439");
      $('#task-dropdown').hide();
      $('#current-task').show();
      $('#completed').show();
      current_task = tasks[$('#task-dropdown').val()];
      $('#current-task').html("Current Task ->\t" + "<span>" + current_task.name + "</span> </br> Previous Time Spent ->\t" + "<span>" + current_task.time_spent + " s </span> </br> Sessions ->\t" + "<span>" + (current_task.time_chunks.length + 1)+ "</span>");
      startClock();
    }
    // do start
}

function stop_timer(completed) {
    $('#start').val("start");
    $('#start').css("background-color", "#00C6C5");
    // do stop
    $('#current-task').hide();
    $('#completed').hide();
    $('#task-dropdown').show();
    var time = parseInt(stopClock());
    // console.log(typeof(time));
    // console.log("hello!");
    
    // console.log("time spent =" + current_task.time_spent);
    // console.log("time spent type =" + typeof(current_task.time_spent));
    current_task.time_spent = parseInt(current_task.time_spent) + time;
    current_task.completed = completed;
    current_task.time_chunks.push(time);
    // console.log(current_task.time_chunks);
    // console.log("time type: "+ typeof(current_task.time_chunks[0]));
    
    edit_task($('#task-dropdown').val(), current_task.name, current_task.category_id, current_task.description, current_task.time_estimate, current_task.time_spent, current_task.time_chunks, current_task.completed);
}


//TODO check to make sure fields valid/ not blank
function process_task() {
  var name = $("#taskname").val();
  if (name !== "") {
    var category_id = $("#cat-dropdown").val();
    var description = $("#desc").val();
    var hour;
    
    if ($("#hour").val() === "" || $("#hour").val() === undefined)
      hour = 0;
    else
      hour = parseInt($("#hour").val());
    
    
    var min = parseInt($("#min").val());
    if (isNaN(min)) {
      min = 0;
    }
    if (isNaN(hour)) {
      hour = 0;
    }

    var time_estimate = ((hour * 60 * 60) + min * 60);
    var time_spent = 0;
    var time_chunks = [];
    var completed = false;
    add_task(name, category_id, description, time_estimate, time_spent, time_chunks, completed);
    $("#add").val("New Task");
    $("#add").css("background-color", "#C0C0C0");
    
    $("#hour").val("")
    $("#min").val("")
    $("#taskname").val("");
    $("#cat-dropdown").val("-1");
    $("#desc").val("");
  }
}

function drawCategories()
{
  var c = $("#cat-dropdown");
  c.html("");

  for(var val in categories) {
      $('<option />', {value: val, text: categories[val].name}).appendTo(c);
  }
  $('<option />', {value: "new", text: "New category..."}).appendTo(c);
  
}

function displayTime(second) {
  var disp = "";
  var tmp = 0;
  //HH
  tmp = ((((second - (second % 3600)) / 3600) - (((second - (second % 3600)) / 3600) % 10)) / 10) % 10;
  disp += tmp;
  tmp = ((second - (second % 3600)) / 3600) % 10;
  disp += tmp + ":";
  //MM
  tmp = ((((second - (second % 60)) / 60) - (((second - (second % 60)) / 60) % 10)) / 10) % 6;
  disp += tmp;
  tmp = ((second - (second % 60)) / 60) % 10;
  disp += tmp + ":"
  //SS
  tmp = ((second % 60) - (second % 10)) / 10;
  disp += tmp;
  tmp = second % 10;
  disp += tmp;
  return disp;
}

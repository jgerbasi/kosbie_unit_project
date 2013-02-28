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
  var container = $("#tasks_container");
  for(var task_index in tasks) {
    var new_div = $("<div>").html(tasks[task_index].name)
    container.append(new_div);
  }
  

}


$(document).ready(function() {
    $('#start').click(function() {
       $(this).val() === "start" ? start_timer() : stop_timer(false);
    });
    $('#add').click(function(event) {        
      if ($('#dim-overlay').is(":visible")) {
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
      // alert('Handler for .change() called.');
      var this_dropdown = $(this);
      // console.log(this_dropdown.val());
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
  
});

function start_timer() {
    if ($('#task-dropdown').val() !== "-1") {
      $('#start').val("stop");
      $('#start').css("background-color", "#D23439");
      $('#task-dropdown').hide();
      $('#current-task').show();
      $('#completed').show();
      current_task = tasks[$('#task-dropdown').val()];
      $('#current-task').html("Current Task ->\t" + "<span>" + current_task.name + "</span> </br> Previous Time Spent ->\t" + "<span>" + current_task.time_spent + " s </span> </br> Sessions ->\t" + "<span>" + current_task.time_chunks.length + "</span>");
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
    var time = stopClock();

    current_task.time_spent += time;
    current_task.completed = completed;
    current_task.time_chunks.push(time);
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
  
  $('<option />', {value: -1, text: 'Select a category ...'}).appendTo(c);

  for(var val in categories) {
      $('<option />', {value: val, text: categories[val].name}).appendTo(c);
  }
  $('<option />', {value: "new", text: "New category..."}).appendTo(c);
  
}

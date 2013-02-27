function drawTasksDropDown()
{
  var t = $("#task-dropdown");
  t.html("");
  

  $('<option />', {value: -1, text: 'Select a task ...'}).appendTo(t);

  for(var val in tasks) {
      $('<option />', {value: val, text: tasks[val].name}).appendTo(t);
  }
}

function displayAllTasks()
{
  var container = $("#tasks_container");
  console.log(tasks);
  for(var task_index in tasks) {
    var new_div = $("<div>").html(tasks[task_index].name)
    container.append(new_div);
  }
  

}


$(document).ready(function() {
    $('#start').click(function() {
       $(this).val() === "start" ? start_timer() : stop_timer();
    });
    $('#add').click(function(event) {        
      if ($('#dim-overlay').is(":visible")) {
        $('#dim-overlay').hide();
        $('#overlay').hide();
      } else {
        $('#overlay').show();
        $('#dim-overlay').show()
      }
      $(this).val() === "Add Task" ? $(this).val("Submit") : process_task();
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
  
});

function start_timer() {
    $('#start').val("stop");
    $('#start').css("background-color", "#D23439");
    // do start
}

function stop_timer() {
    $('#start').val("start");
    $('#start').css("background-color", "#00C6C5");
    // do stop
}


//TODO check to make sure fields valid/ not blank
function process_task() {
  var this_form = $("#task-form");
  var name = $("#taskname").val();
  var category_id = $("#cat-dropdown").val();
  var description = $("#desc").val();
  var hour;
  
  if ($("#hour").val() === "" || $("#hour").val() === undefined)
    hour = 0;
  else
    hour = parseInt($("#hour").val());
  
  
  var min = parseInt($("#min-dropdown").val());
  var time_estimate = (hour * 60) + min;
  // console.log("time est: " + time_estimate);
  var time_spent = undefined;
  var time_chunks = undefined;
  var completed = false;
  add_task(name, category_id, description, time_estimate, time_spent, time_chunks, completed);
  $("#add").val("Add Task");
  
  $("#hour").val("")
  $("#min-dropdown").val("")
  $("#taskname").val("");
  $("#cat-dropdown").val("-1");
  $("#desc").val("");
  
}

function drawCategories()
{
  var c = $("#cat-dropdown");
  c.html("");
  
  $('<option />', {value: -1, text: 'Select a category ...'}).appendTo(c);

  for(var val in categories) {
      console.log(val);
      $('<option />', {value: val, text: categories[val].name}).appendTo(c);
  }
  $('<option />', {value: "new", text: "New category..."}).appendTo(c);
  
}

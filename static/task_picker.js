function drawTasks()
{
  var t = $("#task-dropdown");

  $('<option />', {value: -1, text: 'Select a task ...'}).appendTo(t);

  for(var val in tasks) {
      $('<option />', {value: val, text: tasks[val].name}).appendTo(t);
  }
}


$(document).ready(function() {
    $('#start').click(function() {
       $(this).val() === "start" ? start_timer() : stop_timer();
    });
    $('#add').click(function(event) {        
         $('#overlay').toggle('show');
         $(this).val() === "Add Task" ? $(this).val("Submit") : $(this).val("Add Task");
    });
});

function start_timer() {
    $('#start').val("stop");
    $('#start').css("background-color", "red");
    // do start
}

function stop_timer() {
    $('#start').val("start");
    $('#start').css("background-color", "#0F0");
    // do stop
}


//

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
  // if (event.which == 13) {
  //    event.preventDefault();
  //  }
  //  xTriggered++;
  //  var msg = 'Handler for .keydown() called ' + xTriggered + ' time(s).';
  // $.print(msg, 'html');
  // $.print(event);
});


function drawCategories()
{
  var c = $("#cat-dropdown");
  $("#cat-dropdown").html("");
  console.log(tasks);
  console.log(tasks);
  console.log(tasks);
  console.log(tasks);
  console.log(tasks);
  console.log(categories);
  
  $('<option />', {value: -1, text: 'Select a category ...'}).appendTo(c);

  for(var val in categories) {
      console.log(val);
      $('<option />', {value: val, text: categories[val].name}).appendTo(c);
  }
  $('<option />', {value: "new", text: "New category..."}).appendTo(c);
  
}

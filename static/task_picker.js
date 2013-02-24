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
       $(this).val() == "start" ? start_timer() : stop_timer();
    });
    $('#add').click(function(event) {        
         $('#overlay').toggle('show');
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

function drawCategories()
{
  var c = $("#cat-dropdown");
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
  
}


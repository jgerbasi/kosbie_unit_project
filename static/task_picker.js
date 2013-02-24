var s = $("#dropdown");

$('<option />', {value: -1, text: 'Select a task ...'}).appendTo(s);

for(var val in tasks) {
    console.log(tasks);
    $('<option />', {value: val, text: tasks[val].name}).appendTo(s);
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
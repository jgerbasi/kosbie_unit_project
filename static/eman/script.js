var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var item = 0;
var selected = 3;
var maxTime = 0;
var to_graph = [];

var task1 = {name: "hello world",time_spent: 800};
var task2 = {name: "how big are you?",time_spent: 400};
var task3 = {name: "how are you?",time_spent: 200};
var task4 = {name: "goodbye world",time_spent: 600};
var task5 = {name: "goodbye world",time_spent: 600};
var tasks = [task1,task2,task3,task4, task5];



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

run();







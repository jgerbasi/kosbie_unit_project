var express = require("express"); // imports express
var app = express();        // create a new instance of express

// imports the fs module (reading and writing to a text file)
var fs = require("fs");

// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());

// globals
var tasks;
var categories;

// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}


// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}


///////////
// Handle Task requests
///////////

// get all tasks
app.get("/tasks", function(request, response){
  response.send({
    tasks: tasks,
    success: true
  });
});


// update one task
app.put("/tasks/:id", function(request, response){
  // change listing at index, to the new listing
  var id = request.params.id;
  var oldTask = tasks[id];
               
  var newTask = {"name": request.body.name,
                 "category_id": request.body.category_id, // id is index into categories array
                 "time_estimate": request.body.time_estimate,
                 "time_spent": request.body.time_spent,
                 "time_chunks": JSON.parse(request.body.time_chunks) // store time chunks in seconds
                 "completed": JSON.parse(request.body.completed) 
                 };
                 
  newTask.name = (newTask.name !== undefined) ? newTask.name : oldTask.name;
  newTask.category_id = (newTask.category_id !== undefined) ? newTask.category_id : oldTask.category_id;
  newTask.time_estimate = (newTask.time_estimate !== undefined) ? newTask.time_estimate : oldTask.time_estimate;
  newTask.time_spent = (newTask.time_spent !== undefined) ? newTask.time_spent : oldTask.time_spent;
  newTask.time_chunks = (newTask.time_chunks !== undefined) ? newTask.time_chunks : oldTask.time_chunks;
  newTask.completed = (newTask.completed !== undefined) ? newTask.completed : oldTask.completed;

  // update the tasks list
  tasks[id] = newTask;

  response.send({
    task: newTask,
    success: true
  });
});


// get one task
app.get("/tasks/:id", function(request, response){
  var id = request.params.id;
  var task = tasks[id];
  response.send({
    tasks: task,
    success: (task !== undefined)
  });
});


// create new task
app.post("/tasks", function(request, response) {
  // console.log(request.body);
  var task = {"name": request.body.name,
              "category_id": request.body.category_id,
              "time_estimate": request.body.time_estimate,
              "time_spent": 0,
              "time_chunks": [] // store time chunks in seconds
              "completed": false };
              
  tasks.push(task);
  // do server side validation here if want...

  writeFile("tasks.txt", JSON.stringify(tasks));
  response.send({ 
    task: task,
    success: task !== undefined
  });
});



///////////
// Handle Category requests
///////////


// get all categories
app.get("/categories", function(request, response){
  response.send({
    categories: categories,
    success: true
  });
});


// update one category
app.put("/categories/:id", function(request, response){
  // change listing at index, to the new listing
  var id = request.params.id;
  var oldCategory = categories[id];
  
  var newCategory = {"name": request.body.name};
  
  newCategory.name = (newCategory.name !== undefined) ? newCategory.name : oldCategory.name;
  
  // update the categories list
  categories[id] = newCategory;
  
  response.send({
    category: newCategory,
    success: true
  });               
});


// get one category
app.get("/categories/:id", function(request, response){
  var id = request.params.id;
  var category = categories[id];
  response.send({
    category: category,
    success: (category !== undefined)
  });
});


// create new task
app.post("/categories", function(request, response) {
  // console.log(request.body);
  var category = {"name": request.body.name};
              
  categories.push(category);
  // do server side validation here if want...

  writeFile("categories.txt", JSON.stringify(categories));
  response.send({ 
    category: category,
    success: (category !== undefined)
  });
});


// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});


function initServer() {
  //load the categories and tasks
  var defaultList = "[]";
  
  readFile("categories.txt", defaultList, function(err, data) {
    categories = JSON.parse(data);
  });

  readFile("tasks.txt", defaultList, function(err, data) {
    tasks = JSON.parse(data);
  });
}

// Initialize server
initServer();
app.listen(8889);

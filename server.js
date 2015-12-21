var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

var shortid = require('shortid');
// shortid.generate()

var hide = require('./git_ignore/hide.js')
var db = require('orchestrate')(hide.dbkey);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// db.post('todo-users', {
//   "user": "test",
//   "password": "password"
// })
// .then(function(result) {
//   console.log(result)
// })
// .fail(function(error) {
//   console.log(err); 
// })


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})


app.post('/login', function(req, res) {

  var loginUser = req.body.username.toLowerCase(); 
  var loginPassword = req.body.password.toLowerCase(); 

  db.search('todo-users', 'value.user: ' + ("" + loginUser) )
  .then(function (result) {

    var dbUser = result.body.results[0].value.user.toLowerCase(); 
    var dbPassword = result.body.results[0].value.password.toLowerCase(); 

    if (loginUser == dbUser) {
      if (loginPassword == dbPassword) {
        res.send(true);
      }
      else {
        res.send("incorrect password" );
      }
    }
    else {
      res.send("no record");
    }
  });

});  


// app.get('/collection', function(req, res) {

//   console.log('get collection request');
//   console.log(req.body);
//   res.send(true)
// })

app.get('/collection/:id', function(req, res) {

  console.log('get collection/:id request: ' + req.params.id);  
  var todoUser = req.params.id;   

  db.search('todo-tasks', 'value.user: ' + ("" + todoUser) )
  .then(function (result) {
    console.log('orchestrate search tasks: ' + result.body.results ); 
    
    var taskCollection = result.body.results; 
    var finalTasks = []; 

    for (var i = 0; i < taskCollection.length; i++) {
      finalTasks.push(taskCollection[i].value); 
    }

    res.send(finalTasks); 

  });  

}); 


/*=============================================
=           Upload New Task          =
=============================================*/  
app.post('/task', function(req, res) { 
  /*----------  
    - Generates id for each task, using SHORTID plugin module
    - Adds id to task model 
  ----------*/  
  var key = shortid.generate(); 
  req.body.id = key; 
  console.log("new task body is: " + req.body);
  console.log('new key is: ' + req.body.id)

  /*----------  
    - Upload task to server
    - Sends back model in response to model.save request
  ----------*/   
  db.put('todo-tasks', key, req.body)
    .then(function (result) {
      res.send(req.body); 
    })
    .fail(function (err) {
      res.send(false); 
    }); 

})
/*======================*/


/*=============================================
=           Save Model       =
=============================================*/  
app.put('/task/:id', function(req, res) {

  console.log('task put request; model ID is: ' + req.params.id);
  console.log("task put request body is: " + req.body); 
  var key = req.params.id;   

  db.put('todo-tasks', key, req.body)
  .then(function (result) {
    res.send(req.body);
  })
  .fail(function (err) {
    res.send(false); 
  });   

})
/*======================*/


/*=============================================
=           Run Server       =
=============================================*/ 
app.listen(3000, function () {
    console.log("server started");
});

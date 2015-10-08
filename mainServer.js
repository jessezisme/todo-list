var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//Nate's
var db = require('orchestrate')('ccbb65c6-d9ab-4d26-9691-c38d21fe2fc6');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));


app.put('/login', function (req, res) {
  var loginUser = req.body.name;
  var loginPassword = req.body.password;
  console.log(loginUser);

  db.search('todoUser', 'value.name: ' + ("" + loginUser) )
  .then(function (result) {
    var dbPassword = result.body.results[0].value.password;
    var dbUser = result.body.results[0].value.name;
    if (loginUser == dbUser) {
      if (loginPassword == dbPassword) {
        console.log('match');
        res.send(true);
      }
      else {
        res.send("incorrect password");
      }
    }
    else {
      res.send("no record of user");
    }
  });
});


//     console.log(result.body.results.length);
//     console.log(result.body.results[0].value.password);
//     var dbPassword = result.body.results[0].value.password;
//     if (loginPassword == dbPassword) {
//       console.log("match");
//
//       res.send(true);
//
//       // db.search('todoTask', loginUser)
//       // .then(function (result) {
//       //   res.send(result.body.results);
//       //   console.log(result.body.results);
//       // });
//     }
//     else {
//       res.send(false);
//     }
//   })
//   .fail(function (err) {
//     console.log("ERROR ERROR ");
//   });
// });

app.get('/tasks', function (req, res) {
    console.log("app.get/tasks");

    db.list('tasks')
    .then(function (result){
      var tasks = [];
      var resultBody = result.body.results;
      resultBody.map(function(element, index, array) {
        tasks.push(element.value);
      });
      res.send(tasks);
    });
});


// app.get('/tasks/:id', function (req, res) {
//     console.log("counter has been requested");
//     console.log(tasks);
//     res.send(tasks);
// });



// //------------------*Done*----------------------
// app.get('/tasks', function (req, res) {
//     console.log("app.get/tasks");
//
//     db.list('tasks')
//     .then(function (result){
//       var tasks = [];
//       var resultBody = result.body.results;
//       resultBody.map(function(element, index, array) {
//         tasks.push(element.value);
//       });
//       res.send(tasks);
//     });
// });
//
// //------------------*Done*----------------------
// app.put('/tasks/:id', function (req, res) {
//   console.log("this is a put request to /tasks/:id");
//   var object = req.body;
//   // object.id = Date();
//   console.log(object);
//   db.put('tasks', object.id, object)
//   .then(function (result) {
//     res.send(object);
//   })
//   .fail(function (err) {
//     console.log(err);
//   });
// });
//
//
//
// app.patch('/tasks/:id', function (req,res) {
//   console.log("this is a patch request");
//   var id = req.params.id;
//   res.send({id: id});
//   console.log(tasks);
// });
//
//
//
// app.post('/tasks', function(req,res) {
//   console.log('app.post /task');
//   var object = req.body;
//   object.id = Date();
//   db.put('tasks', object.id, object)
//   .then(function (result) {
//     res.send(object);
//   })
//   .fail(function (err) {
//     console.log("failed");
//   });
// });
//
//
// app.post('/users', function(req,res) {
//   var newArr = [];
//
//   console.log("this is app.post/users");
//
//   db.post('users', {
//     'username': req.body.username,
//   })
//   .then(function (result) {
//     db.list('users')
//     .then(function (result) {
//       result.body.results.forEach(function(element, index, array){
//       newArr.push(element.value);
//     }).fail(function(error){console.log(error);});
//     });
//
//   });
//
// });
//
// app.get('/users', function(req,res){
//   var arr = [];
//   db.list('users').then(function(result){
//     console.log("list is running:");
//     var resultBody = result.body.results;
//     resultBody.map(function(element, index, array){
//     console.log(element.value);
//     arr.push(element.value);
//     });
//     res.send(arr);
//   });
// });
// // app.put('/tasks', function (req, res) {
// //
// // });
// //
// // app.put('/counter/1', function (req, res) {
// //     console.log(req.body);
// //     counter1 = req.body.value;
// //     res.send({id: '1'});
// // });
// //
// // app.get('/counter/2', function (req, res) {
// //     console.log("counter has been requested");
// //     res.send("hello");
// // });
// //
// // app.put('/counter/2', function (req, res) {
// //     console.log(req.body);
// //     counter1 = req.body.value;
// //     res.send({id: '2'});
// // });
app.listen(3000, function () {

    console.log("server started");
});

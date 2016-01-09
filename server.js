var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

var shortid = require('shortid');
// shortid.generate()

if (process.env.HEROKU === 'true') {
  hide = {};
  hide.dbkey = process.env.dbkey
}
else {
  hide = require('./git_ignore/hide.js');
}

var db = require('orchestrate')(hide.dbkey);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.set('port', (process.env.PORT || 3000));

/*=============================================
=        Send static index.html file       =
=============================================*/
app.get('/', function(req, res) {

  res.sendFile(__dirname + '/app/index.html');

})
/*======================*/


/*=============================================
=            User Login          =
=============================================*/
app.post('/login', function(req, res) {

  var loginUser = req.body.username.toLowerCase();
  var loginPassword = req.body.password.toLowerCase();

  db.search('todo-users', 'value.user: ' + ("" + loginUser) )
  .then(function (result) {

    var dbUser = result.body.results[0].value.user.toLowerCase();
    var dbPassword = result.body.results[0].value.password.toLowerCase();
    /*----------
      Checks:
        - Whether login user and password matches;
        - Also checks whether user exits, but password doesn't match
    ----------*/
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
  /*--------------------*/
});
/*======================*/

/*=============================================
=            FETCH: Task Collection         =
=============================================*/
app.get('/collection/:id', function(req, res) {
  /*----------
    URL includes USER NAME, which is used to fetch correct user's tasks
  ----------*/
  var todoUser = req.params.id;
  var finalTasks = [];
  var counter = 0;
  var nextPageVerify = false;

/*----------
  Orchestrate caps each query at 100 results, requiring a return to the database
  to retrieve the remainder;
  This function will keep querying the database, compiling all the results, and return them
  all at once;
----------*/

  function fetchData(nextPageResults) {
    var nextPage = nextPageResults;

    if (counter === 0) {
      db.newSearchBuilder()
      .collection('todo-tasks')
      .limit(100)
      .query( 'value.user: ' + ("" + todoUser) )
      .then(function (result) {

        counter += 1;
        var taskCollection = result.body.results;

        for (var i = 0; i < taskCollection.length; i++) {
          finalTasks.push(taskCollection[i].value);
        }
        if (result.links) {
          nextPageVerify = true;
          fetchData(result.links.next)
        }
        else {
          res.send(finalTasks)
        }
      });
    }
    else if ( (counter != 0) && (nextPageVerify != false) ) {
      nextPage.get().then(function(result) {

        var taskCollection = result.body.results;

        for (var i = 0; i < taskCollection.length; i++) {
          finalTasks.push(taskCollection[i].value);
        }
        if (result.links.next) {
          nextPageVerify = true;
          fetchData(result.links.next)
        }
        else {
          res.send(finalTasks);
        }
      })
    }
    else {
      res.send(finalTasks);
    }
  }

  fetchData();
});
/*======================*/

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
=           Delete Model       =
=============================================*/
app.delete('/task/:id', function(req, res) {
  var key = req.params.id;

  var deleteResponse = {
    message: "Model successfully deleted"
  }

  db.remove('todo-tasks', key, true)
  .then(function (result) {
    res.send(deleteResponse);
  })
  .fail(function (err) {
    res.send(false);
  });

})


/*=============================================
=           Run Server       =
=============================================*/
app.listen(app.get('port'), function () {
});



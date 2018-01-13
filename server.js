var express = require("express");
var app = express();
var pg = require("pg");

var bodyParser = require("body-parser");
var validator = require("express-validator");
var port = 5000;
var pug = require("pug");
app.set("view engine", "pug");
app.use(express.static(__dirname));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(validator());

//Blog home page
app.get("/", function(request, response) {
  response.render("blog");
});
//Blog home page
app.get("/addpost", function(request, response) {
  response.render("addpost");
});
app.post("/post", function(request, response) {
  request.checkBody("title", "Title cannot be empty.").notEmpty();
  request.checkBody("bodymessage", "Body cannot be empty").notEmpty();
  const errors = request.validationErrors();
  if (errors) {
    response.render("errors", {
      errors
    });
  } else {
    Insert.sync().then(function() {
      Insert.create({
        title: request.body.title,
        body: request.body.bodymessage
      });
      response.redirect("/");
    });
  }
});

app.listen(port, function() {
  console.log("Listening on port", port);
});

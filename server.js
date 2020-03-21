var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();

// Content from public directory
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes & give server access
var routes = require("./controllers/burger-controller.js");

app.use(routes);

// Start server to listen to client requests
app.listen(PORT, function () {
  // Log server-side
  console.log("Server listening on: http://localhost:" + PORT);
});
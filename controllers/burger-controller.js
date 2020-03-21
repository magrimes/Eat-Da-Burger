// import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

var express = require("express");

var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    //   below is saying render the response from hbsObject--burger data (defined above) to index
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(["burger_name", "devoured"], 
  [req.body.burger_name, req.body.devoured], function(result) {
    
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;












// var express = require("express");
// var router = express.Router();

// // Import model burger.js
// var burger = require("../models/burger.js");

// //Get route for burger data
// router.get("/", function (req, res) {
//     burger.select(function (data) {
//         var hbsObject = {
//             burgers: data
//         };
//         res.render("index", hbsObject);
//     });
// });
// // Burger is posted to page
// router.post("/api/burgers", function (req, res) {
//     burger.insertOne(["burger_name", "devoured"],
//         [req.body.burger_name, req.body.devoured], function (result) {
//             res.json({ id: result.insertId });
//         });
// });

// //Burger is updated from other side of page
// router.put("/api/burgers/:id", function (req, res) {
//     var id = req.params.id;
//     var devoured = req.body.devoured;

//     burger.updateOne({
//         devoured: req.body.devoured
//     }, id, function (result) {
//             if (result.changedRows == 0) {
//                 return res.status(404).end();
//             } else {
//                 res.status(200).end();
//             }
//         });
// });

// module.exports = router;
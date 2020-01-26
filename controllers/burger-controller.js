var express = require("express");
var router = express.Router();

// Import model burger.js
var burger = require("../models/burger");

//Get route for burger data
router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});
// Burger is posted to page
router.post("/api/burgers", function (req, res) {
    burger.create(
        req.body.name,
     function (result) {
        res.json({ id: result.insertId });
    });
});
//Burger is updated from other side of page
router.put("/api/burgers/:id", function (req, res) {
    var id = req.params.id;
    var devoured = req.body.devoured;

    burger.update(
        devoured,
        id, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
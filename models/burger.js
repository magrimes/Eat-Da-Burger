var orm = require("../config/orm.js");

// call ORM functions using burger specific input for the ORM

// SELECT ALL WORKING
var burger = {
    selectAll: function(cb) {
      orm.selectAll("burgers", function(res) {
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    insertOne: function(cols, vals, cb) {
      orm.insertOne("burgers", cols, vals, function(res) {
        cb(res);
      });
    },
    updateOne: function(objColVals, condition, cb) {
      orm.updateOne("burgers", objColVals, condition, function(res) {
        cb(res);
      });
    }    
  };

  // Export the database functions for the controller (burgersController.js).
module.exports = burger;













// var orm = require("../config/orm")

// module.exports = {
//     all: function (cb) {
//         orm.selectAll("burgers", cb);
//     },

//     create: function (burgerName, cb) {
//         orm.insertOne(burgerName, cb);
//     },

//     update: function (devoured, id, cb) {
//         orm.updateOne(
//             devoured, id, cb);
//     }
// }
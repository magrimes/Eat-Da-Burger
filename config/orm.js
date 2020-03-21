const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Bacon Cheeseburger'} => ["name='Bacon Cheeseburger'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM burgers";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            // console.log("here:" + JSON.stringify(result));
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },

      // An example of objColVals would be {name: mushroom swiss, devoured: true}
      updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
      delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
    };

    module.exports = orm;











// var connection = require("./connection.js");

// // Object Relational Mapper (ORM)

// var orm = {
//     selectAll: function (tableInput, cb) {
//         var queryString = "SELECT * FROM ?? ";
//         connection.query(queryString, [tableInput], function (err, result) {
//             if (err) throw err;
//             cb(result);
//         });
//     },

//     insertOne: function (burgerName, cb) {
//         var queryString = "INSERT INTO burgers (burger_name) VALUES (?)";
//         connection.query(queryString, [burgerName], function (err, result) {
//             if (err) throw err;
//             cb(result);
//         });
//     },

//     updateOne: function (devoured, burgerId, cb) {
//         var queryString = "UPDATE burgers SET devoured = ? WHERE id = ?";
//         connection.query(queryString, [devoured, burgerId], function (err, result) {
//             if (err) throw err;
//             cb(result);
//         });
//     },
// };

// module.exports = orm;
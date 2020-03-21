// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newDevoured = $(this).data("newDevoured");
  
      var newDevouredState = {
        devoured: 1
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(
        function() {
          console.log("changed devoured to", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
      console.log("update", newDevouredState);
    });
  
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#bu").val().trim(),
        // devoured: false
       // don't think i need the checked part--for radio buttons, I think
      };
      console.log("click" + newBurger.burger_name);
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
    







// $(function () {
//     $(".change-devoured").on("click", function (event) {
//         var id = $(this).data("id");
//         var newDevoured = $(this).data("newDevoured");

//         var newDevouredState = {
//             devoured: 1
//         };

//         // Send PUT request
//         $.ajax("/api/burgers/" + id, {
//             type: "PUT",
//             data: newDevouredState
//         }).then(
//             function () {
//                 location.reload();
//             }
//         );
//     });

//     // Function for button
//     $(".create-form").on("submit", function (event) {
//         event.preventDefault();

//         var newBurger = {
//             burger_name: $("#burgerName").val().trim(),

//         };

//         // Send the POST request
//         $.ajax("/api/burgers", {
//             type: "POST",
//             data: newBurger
//         }).then(
//             function () {
//                 console.log("created new burger");
//                 // Reload the page
//                 location.reload();
//             }
//         );
//     });
// });
$(document).ready(function() {

    // already 3 buttons on page load
    var search = ["mushroom","donut","cheeseburger"];
    for (var i = 0; i < search.length; i++) {
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=RC5qajcnW04a0dwjbL8h2nVGrofeeFqg&q=" + search[i];
        var newButton = $("<button class='item'>").text(search[i]);
        newButton.attr("data-food", search[i]);
        $("#searchButtons").append(newButton);
    }
    
    // for user input
    // var userQuery = "https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=RC5qajcnW04a0dwjbL8h2nVGrofeeFqg&q=";

    $("#submit").on("click", function(event) {
        event.preventDefault();
        var userSearch = $("#add").val().trim().toLowerCase();
        $("#add").val("");
        var newButton = $("<button class='item'>").text(userSearch);
        newButton.attr("data-food", userSearch);
        $("#searchButtons").append(newButton);           
    })

    // BUG: only works for first item button
    // FIX: CHANGE FROM ID TO CLASS b/c technically only supposed to have 1 id so it was hooking onto first 1
    // event delegation to get it to watch things added after initial html load (dynamically added)
    // so target element on page that wraps around it that is there from load
    $("#searchButtons").on("click", ".item", function(event) {
        var food = $(this).attr("data-food");
        var userQuery = "https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=RC5qajcnW04a0dwjbL8h2nVGrofeeFqg&q=" + food;
        console.log(food);
        $.ajax({url: userQuery, method: "GET"})
         .then(function(response) {
           console.log(response);
         })
    })

})
$(document).ready(function() {

    // already 5 food buttons on page load
    var search = ["mushroom","donut","cheeseburger","pizza","sushi"];
    for (var i = 0; i < search.length; i++) {
        var newButton = $("<button class='item'>").text(search[i]);
        newButton.attr("data-food", search[i]);
        $("#search-buttons").append(newButton);
    }

    // click event for submit button: save user input, clear field, add new button if the field wasn't blank
    $("#submit").on("click", function(event) {
        event.preventDefault();
        var userSearch = $("#add").val().trim().toLowerCase();
        $("#add").val("");
        if (userSearch != "") {
            var newButton = $("<button class='item'>").text(userSearch);
            newButton.attr("data-food", userSearch);
            $("#search-buttons").append(newButton);  
        }    
    })

    // click event for food buttons: save button food, create query URL, call ajax, create new div to hold rating and gif image, create p for rating, img for gif image, give img still and animated (gif) values, add to page
    $("#search-buttons").on("click", ".item", function(event) {
        var food = $(this).attr("data-food");
        var userQuery = "https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=RC5qajcnW04a0dwjbL8h2nVGrofeeFqg&q=" + food;

        $.ajax({url: userQuery, method: "GET"})
         .then(function(response) {
            var results = response.data;
            for (var i = 0; i < 10; i++) {
                var foodDiv = $("<div class='food-div'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var foodGif = $("<img>").attr("src", results[i].images.fixed_height.url).attr("data-gif", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-state", "gif");

                foodDiv.append(p, foodGif);
                $("#search-results").prepend(foodDiv);
            }

            // click event for individual gifs: new variable to store current data-state, change source to either still or gif state depending on current state
            $(".food-div").on("click", "img", function(event) {
                var state = $(this).attr("data-state");
                if (state == "gif") {
                    $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
                } else {
                    $(this).attr("src", $(this).attr("data-gif")).attr("data-state", "gif");
                }
            }) 
        })
    })

})
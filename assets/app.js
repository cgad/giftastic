$(document).ready(function() {
    // for saves
    var numFavs = 0;

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
                var p = $("<p class='rating'>").text("rating: " + results[i].rating);
                var foodGif = $("<img>").attr("src", results[i].images.fixed_height.url).attr("data-gif", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-state", "gif");
                // var favorite = $("<p class='fav'>").text("favorite").attr("fav", "no");

                // work in progress: local storage of favorites
                var favorite = $("<p class='fav'>").text("favorite").attr("data-fav", "no").attr("data-favurl", results[i].images.fixed_height.url);

                foodDiv.append(p, foodGif, favorite);
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

            $(".food-div").on("click", ".fav", function(event) {
                var fav = $(this).attr("data-fav");
                var savedArray = [];

                if (fav == "no") {
                    var favImg = $("<img>").attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6WsIXigOo3FMZE4J9F-DZ8mU05K8Fgyn_daXjblQk9QNo_eeR").addClass("imgSize");
                    $(this).append(favImg).attr("data-fav", "yes");
                    numFavs++;
                    $("#saved").append("<img class='small' src=" + $(this).attr("data-favurl") + ">");
                } else {
                    $(this).text("favorite").attr("data-fav", "no");
                    numFavs--;
                }
                $("#numFavs").text(numFavs);

                // push OBJECT to saved array, url and unique identifier (from giphy object?)
                // for loop to print out images
                // edit array, then go through for loop for deletions
                // can i find an object in an array by a particular key
                // 
                // on click of big image favorite, grab attribute of name of little image, to unfavorite, grab value, find indexof(favorited image) in that array, splice to remove that index, then clear favorites div and reloop through
                //
                // var newSave;
                // if (fav == "no") {
                //     var favImg = $("<img>").attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6WsIXigOo3FMZE4J9F-DZ8mU05K8Fgyn_daXjblQk9QNo_eeR").addClass("imgSize");
                //     $(this).append(favImg).attr("data-fav", "yes");
                //     numFavs++;
                    

                //     // newSave = "<img class='small' src=" + $(this).attr("favurl") + ">";
                //     newSave = $(this).attr("data-favurl");
                //     savedArray.push(newSave);
                //     console.log(savedArray);
                //     // $("#saved").prepend("<img class='small' src=" + $(this).attr("favurl") + ">");
                // } else {
                //     $(this).text("favorite").attr("data-fav", "no");
                //     numFavs--;
                // }

            });

        })
    })

})
$(document).ready(function() {
    // for number of saved gifs
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
            console.log(response);
            for (var i = 0; i < 10; i++) {
                var foodDiv = $("<div class='food-div'>");
                var p = $("<p class='rating'>").text("rating: " + results[i].rating);
                var foodGif = $("<img class='largeGif'>").attr("src", results[i].images.fixed_height.url).attr("data-gif", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-state", "gif");

                // reference these attributes later for favorite storage
                var favorite = $("<p class='fav'>").text("favorite").attr("data-fav", "no").attr("data-favurl", results[i].images.fixed_height.url);

                foodDiv.append(p, foodGif, favorite);
                $("#search-results").prepend(foodDiv);
            }
        })
    })

    // click event for pausing gifs: new variable to store current data-state, change source to either still or gif state depending on current state
    // NEED document because class .largeGif is dynamically created
    $(document).on("click", ".largeGif", function(event) {
        var state = $(this).attr("data-state");
        if (state == "gif") {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        } else {
            $(this).attr("src", $(this).attr("data-gif")).attr("data-state", "gif");
        }
    }) 

    // empty array for favorited gifs
    var savedArray = [];

    // click event for favorites: if not saved yet, add to array and add images in array to favorites section. if already saved, remove from array, re-add array to favorites section. update number of favs. click a mini gif to open in new window. use savedArray for both link url and img src
    $(document).on("click", ".fav", function(event) {
        var favValue = $(this).attr("data-fav");
        var favURL = $(this).attr("data-favurl");
        var num = 0;

        if (favValue == "no") {
            var favImg = $("<img>").attr("src", "assets/images/heart.png").addClass("imgSize");
            $(this).append(favImg).attr("data-fav", "yes");
            numFavs++;
            savedArray.push(favURL);

            $("#saved").text("");
            for (var i = 0; i < savedArray.length; i++) {
                $("#saved").append("<a target=_blank href=" + savedArray[i] + "><img class='small' src=" + savedArray[i] + "></a>")
            }
        } else {
            $(this).text("favorite").attr("data-fav", "no");
            savedArray.splice(savedArray.indexOf(favURL), 1);
            numFavs--;
            $("#saved").text("");
            for (var i = 0; i < savedArray.length; i++) {
                $("#saved").append("<a target=_blank href=" + savedArray[i] + "><img class='small' src=" + savedArray[i] + "></a>")
            }
        }
        $("#numFavs").text(numFavs);
    })

})
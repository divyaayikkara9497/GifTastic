$(document).ready(function(){

var topics = ["Harry Potter" , "Ron Weasley" , "Hermione Weasley" , "Luna Lovegood" , "Ginny Weasley" , "Neville Longbottom" , "Albus Dumbledore" , "Sirius Black", "Lily Potter"];


function displayGif() {
	$("#displayImages").empty();
	var input = $(this).attr("data-name");
	//var limit = 10;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=30&api_key=rrDJESjwmjV9unpaBxu4sPqAkAK2Tyh5";
	//console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		
		//console.log(response);
		var results = response.data;
		for(var i = 0; i < results.length; i++){
			var gifDiv = $("<div>");
			var rating = $("<p class='rating'>").text("Rating: " + results[i].rating);
			var title = $("<p class='title'>").text("Title: " + results[i].title); 
			var image = $("<img>");

			title.addClass("title-text");
			rating.addClass("rating-text");
			image.addClass("image-gif");
			image.attr("src", results[i].images.fixed_height_still.url); 
            image.attr("data-still", results[i].images.fixed_height_still.url); 
            image.attr("data-animate",results[i].images.fixed_height.url); 
            image.attr("data-state", "still"); 
            image.attr("data-position", i);
            gifDiv.append(title);
            gifDiv.append(rating);
            gifDiv.append(image);
            gifDiv.addClass("individual-gifs");

            $("#displayImages").prepend(gifDiv);
		}
	});
}

function makeButton(){
	$("#displayButtons").empty();

	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.attr("class" , "btn btn-default");
		newButton.attr("id", "input");
		newButton.attr("data-name" , topics[i]);
		newButton.text(topics[i]);
		$("#displayButtons").append(newButton);

	}
}

function gifChange() {
	var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
}

$("#submitButton").on("click", function() {
	var input = $("#userInput").val().trim();
	form.reset();
	topics.push(input);
	makeButton();
	return false;
})

makeButton();
$(document).on("click" , "#input" , displayGif);
$(document).on("click" , ".image-gif" , gifChange);
});







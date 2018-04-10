$(document).ready(function(){

var topics = ["Harry Potter" , "Ron Weasley" , "Hermione Weasley" , "Luna Lovegood" , "Ginny Weasley" , "Neville Longbottom" , "Albus Dumbledore" , "Sirius Black"];


function displayGif() {
	$("#displayImages").empty();
	var input = $(this).attr("data-name");
	//var limit = 10;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=20&api_key=rrDJESjwmjV9unpaBxu4sPqAkAK2Tyh5";
	//console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		
		//console.log(response);
		var results = response.data;
		for(var i = 0; i < results.length; i++){
			var gifDiv = $("<div>");
			var image = $("<img>");
			image.attr("src", results[i].images.fixed_height_still.url); 
            image.attr("data-still", results[i].images.fixed_height_still.url); 
            image.attr("data-animate",results[i].images.fixed_height.url); 
            image.attr("data-state", "still"); 
            image.attr("class" , "gif");
            image.addClass("imageHolder");
            gifDiv.append(image);

            var title = $("<p>").text("Title: " + results[i].title); 
			var rating = $("<p>").text("Rating: " + results[i].rating);
			gifDiv.append(title);
			gifDiv.append(rating);

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
$(document).on("click" , ".gif" , gifChange);
});







$(document).ready(function(){

var topics = ["Harry Potter" , "Hermione Granger" , "Ron Weasley" , "Luna Lovegood" , "Ginny Weasley" , "Neville Longbottom"];



$("#submitButton").on("click", function() {
	var input = $("#userInput").val().trim();
	topics.push(input);
	makeButton();
	return false;
})

function displayGif() {
	$("#displayImages").empty();
	var input = $(this).attr("data-name");
	//var limit = 10;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=10&api_key=rrDJESjwmjV9unpaBxu4sPqAkAK2Tyh5";
	//console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		for(var i = 0; i < response.length; i++){
			console.log(response);

		}
	});
}

function makeButton(){
	$("#displayButtons").empty();

	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn btn-default");
		newButton.attr("data-name" , topics[i]);
		newButton.text(topics[i]);
		$("#displayButtons").append(newButton);

	}
}





makeButton();

displayGif();


})







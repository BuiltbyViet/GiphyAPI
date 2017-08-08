
//array
var topic =["Mario", "Luigi", "Link","Samus","Yoshi","Kirby","Fox McCloud","Little Mac","Pit(Icarus)","Donkey Kong","Marth","Ice Climbers","Bowser","Ness","Princess Peach"]

function playPauseGif (){
	var state = $(this).attr("data-state");
if (state === "still") {
	var nintendoAnimateURL = $(this).attr("data-animate");
        $(this).attr("src", nintendoAnimateURL);
        $(this).attr("data-state", "animate");
      } else {
      var nintendoStillURL = $(this).attr("data-still");
        $(this).attr("src", nintendoStillURL);
        $(this).attr("data-state", "still");
      }
    };



function displayNintendoCharInfo(){
var charNameStill = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+charNameStill+"&api_key=47344ce4668c4391a1724e13caf6fddf&limit=10";


$.ajax({
	url: queryURL,
	method: "GET"
})

.done(function(response){
	
	console.log(response);	

	
	
//click on Char name button
var results = response.data;

//$(".ninChar").on("click", function() {
for (var i = 0; i < results.length; i++) {
var charDiv = $("<div>");
var p = $("<p>").text("Rating: +" + results[i].rating);
var charImage = $("<img>");
charImage.attr("src", results[i].images.downsized_still.url);
charImage.attr("data-still", results[i].images.downsized_still.url);
charImage.attr("data-state", "still");
charImage.attr("data-animate", results[i].images.downsized_large.url);
charImage.addClass("gif");
charDiv.append(p);
charDiv.append(charImage);
$("#gifsHere").prepend(charDiv);
};
});
};


//create new buttons
function createNintendoTabs(){
	$("#nintendoTabs").html("");
for (var j=0; j<topic.length;j++){
	var createButton = $("<button class=btn btn-primary>");
	createButton.addClass("ninChar");
	createButton.attr("data-name", topic[j]);
	createButton.text(topic[j]);
	$("#nintendoTabs").append(createButton);
}
};
createNintendoTabs();

//adding new nintendo character names into array when clicking Submit
$("#addChar").on("click", function(event){
event.preventDefault();
var inputCharName = $("#typeHere").val().trim();
topic.push(inputCharName);
createNintendoTabs();

});

$(document).on("click", ".ninChar", displayNintendoCharInfo);


$(document).on("click",".gif", playPauseGif);






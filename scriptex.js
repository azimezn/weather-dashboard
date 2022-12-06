// Inital array for movies
var movies = ["Rush Hour", "Friday Night Lights", "Shawshank Redemption", "Pineapple Express"];


// function to display movie content
function displayMovieInfo() {

$('#movies-view').empty();

var movie = $(this).attr('data-name');
var queryURL = `https://www.omdbapi.com/?t=${movie}&apikey=trilogy`;


// create a call to my api targeting the specifc movie adding it to the URL and displaying the movie data
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(res) {
console.log(res)

// create a new div to hold the movie
var movieDiv = $("<div class='movie'>")

var mTitle = res.Title;

var hOne = $("<h1>").text(`${mTitle}`);

movieDiv.append(hOne)

// get the rating from the movie
var rating = res.Rated;
// console.log(rating)
// print out rating to my page
var pOne = $("<p>").text(`This movie is rated ${rating}`)

// append to the page
movieDiv.append(pOne)

var released = res.Released;

console.log(released)

var pTwo = $("<p>").text(`This movie is rated ${released}`)

movieDiv.append(pTwo)

var mPlot = res.Plot;

var plotEl= $("<p>").text(`${mPlot}`)

movieDiv.append(plotEl)





$('#movies-view').prepend(movieDiv);







})



}



// Function to display buttons after adding a new movie or pulled from our array of movies
function renderButtons() {

    $('#buttons-view').empty();

    // clearing my movies view
    $('#movies-view').empty();

    // Looping through the array for movies stored
    for (var i = 0; i < movies.length; i++) {

        // dynamicaly generate buttons for each movie in our array
        // $("") <----- multiple document.something
        var a = $("<button>")
        // adding a class of movie-btn to the button
        a.addClass("movie-btn");
        // add a data-attribute
        a.attr('data-name', movies[i])
        // providint text for the button
        a.text(movies[i]);
        // adding the button to the BUTTONS-VIIW DIV
        $("#buttons-view").append(a);
    }
}

// create a function that handles my event to add a movie button
$('#add-movie').on('click', function(e) {
    e.preventDefault();
    // create a variable to grab the user VALUE from the input box
    var movie = $("#movie-input").val().trim();
    // add a movie to my array
    movies.push(movie);
    // every time we add a movie to the array we want to rerender the buttons
    renderButtons();
});


// adding an event listener on the ENTIRE page to listen to all elemnts with a specific class
$(document).on('click', '.movie-btn', displayMovieInfo)

// \call renderButtons function to initialize the buttons
renderButtons();
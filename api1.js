var APIKey = "cPMwVOzEb0RReABo0SIDMV1p0GCvlbH1";

// Here we are building the URL we need to query the database
var queryURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=" + APIKey;

// Here we run = AJAX call to the NewYorkTimes API
$.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

         // Log the resulting object
         console.log(response);

         // Log the test for title within object
         console.log(response.results[0].title);

        // Created a variable to hold the title
        var title = response.results[0].title

        // Transfer content to HTML
        $(".news").html("<h1>" + title + "</h1>");
    })

var APIKey = "Qm6AdGgl5qsYFDCGGzHkRahy4MUt6MHt";

// Here we are building the URL we need to query the database
var queryURL2 = "https://api.nytimes.com/svc/topstories/v2/us.json?api-key=" + APIKey;

// Here we run = AJAX call to the NewYorkTimes API
$.ajax({
    url: queryURL2,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response2) {

        // Log the queryURL
        console.log(queryURL2);

         // Log the resulting object
         console.log(response2);

         // Log the test for abstract within object
         console.log(response2.results[0].abstract);

        // Created a variable to hold the abstract
        var abstract = response2.results[0].abstract

        // Transfer content to HTML
        $(".topArt").html("<h2>" + abstract + "</h2>");
    })
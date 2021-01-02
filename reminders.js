 
var names =  JSON.parse(localStorage.getItem('contacts'));
names.forEach(function(key){
console.log(names);

$("#result").append(key.fullName + ":" + "  " + key.phone + '<br>' + "<br>");

})


function createCard(index) {
  $('#cards').empty();

var par1 =  $("<h3></h3>").text(names[index].fullName);
var par2 =  $("<p></p>").text("Telephone : "+ names[index].phone);
var par3 =  $("<p></p>").text("Email : "+ names[index].email);
var par4 =  $("<p></p>").text("Pets : "+ names[index].pets);
var par5 =  $("<p></p>").text("Likes : "+ names[index].likes);
var par6 =  $("<p></p>").text("Dislikes : "+ names[index].dislikes);
var par7 =  $("<p></p>").text("Birthday : "+ names[index].birthday);
var par8 =  $("<p></p>").text("Last spoke on : "+ names[index].latestconvo);
var par9 =  $("<p></p>").text("Notes : "+ names[index].notes);
  //$("#cards").append(names[index].firstName + "  " + names[index].lastName +  "<br>" +"  Telephone: " + names[index].phone + '<br>' + "Likes:  " + names[index].likes + "<br>" + "Dislikes:" + names[index].dislikes + "<br>" +  + "Pets: " + names[index].pets + "<br>" + "Birthday: " + names[index].birthday  +  "<br>" + "Notes" + names[index].notes + "<br>" + "Last Spoke on:" +  names[index].latestconvo);
  $("#cards").append(par1, par2, par3, par4, par5, par6, par7, par8, par9, );

}


$('#generate').click(function() {

  $('#cassa').empty();
    var values = names;
 
    var select = $('<select>').prop('id', 'myPPs')
                    .prop('name', 'myPPs');
 
    $(values).each(function(index) {
      console.log(index);
      console.log(this.fullName);
      select.append($("<option>")
        .prop('value', this.fullName)
        .text(this.fullName.toUpperCase()).attr("data-index", index));
    });
 
    var label = $("<label>").prop('for', 'myPPs')
                   .text("Select Your Contact: ");
 
    var br = $("<br>");
 
    $('#cassa').append(label).append(select).append(br);

    $("#myPPs").change(function() {
      var index = $("#myPPs option:selected").attr("data-index");
      
      console.log(index);
      createCard(index);
          
  });
  
  });


  checkreminders();

function checkreminders() {

  let dataInLocalStorage = localStorage.getItem("reminders");

  if (dataInLocalStorage == null) {
    reminders = [];
  } else {
    reminders = JSON.parse(dataInLocalStorage);
  }
  let html = "";
  reminders.forEach((reminder, index) => {
    html += `<div class='card' onclick='removereminder(${index});'>${reminder}</div>`;
  });
  $(".incomplete").empty().append(html);
}

$("input").on("keypress", (e) => {
  if (e.which === 13 && $("input").val() !== "") {
    reminder = $("input").val();
    let remindersData = localStorage.getItem("reminders");
    if (remindersData == null) {
      reminders = [];
    } else {
      reminders = JSON.parse(remindersData);
    }
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    $("input").val("");
    checkreminders();
  }
});


let removereminder = (index) => {
  let remindersData = localStorage.getItem("reminders");
  reminders = JSON.parse(remindersData);
  reminders.splice(index, 1);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  checkreminders();
};

  
function sendMail() {
  var link = 'mailto:hello@domain.com?subject=Message from '
           +document.getElementById('email_address').value
           +'&body='+document.getElementById('email_address').value;
  window.location.href = link;
}

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
        $(".news").html( "<h4>" + "Today in the World:  "+title + "</h4>");
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
        $(".topArt").html("<h4>" + "Today in the US News: "+ abstract + "</h4>");
    })
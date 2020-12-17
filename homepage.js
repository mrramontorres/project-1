function toggleSidebar(ref){
    document.getElementById("sidebar").classList.toggle('active');
  }


let currentDay = document.getElementById("currentDay");
let DateTime = luxon.DateTime;
let today = DateTime.local();
currentDay.textContent = today.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);

var myPeople = [];

function makeButtons() {
$("#buttons-view").empty();

for (var i = 0; i < myPeople.length; i++){
    var persona = $("<button>");
    persona.addClass("person");
    persona.attr("data-name", myPeople[i]);
    persona.text("Dont forget to check on " + myPeople[i]);
    $("#buttons-view").append(persona);
}

}
$("#add-person").on("click", function(event){
    event.preventDefault();
    var person = $("#friendsFamily-input").val().trim();
    myPeople.push(person);
    console.log(myPeople);
    makeButtons();

});
makeButtons();




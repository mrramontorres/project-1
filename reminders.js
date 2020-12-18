 
var names =  JSON.parse(localStorage.getItem('contacts'));
names.forEach(function(key){
    console.log(names);
console.log(key.firstName);
console.log(key.lastName);
console.log(key.phone)

})


var options = names;
console.log (options);
var nameArray = options.map (function(el){ return el.firstName;});
console.log(nameArray);

$('#generate').click(function() {
    var values = nameArray;
 
    var select = $('<select>').prop('id', 'myPPs')
                    .prop('name', 'myPPs');
 
    $(values).each(function() {
      select.append($("<option>")
        .prop('value', this)
        .text(this.charAt(0).toUpperCase() + this.slice(1)));
    });
 
    var label = $("<label>").prop('for', 'myPPs')
                   .text("Select Your Contact: ");
 
    var br = $("<br>");
 
    $('#cassa').append(label).append(select).append(br);
  });
  $("#myPPs").change(function() {
    var text = $("#myPPs option:selected").text();
    console.log(text);
        
});




function sendMail() {
  var link = 'mailto:hello@domain.com?subject=Message from '
           +document.getElementById('email_address').value
           +'&body='+document.getElementById('email_address').value;
  window.location.href = link;
}



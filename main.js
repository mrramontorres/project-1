

$(document).ready(init);

var contacts = [];
var editing = false;

function init(){
  loadFromStorage();
  updateList();
  clickHandler();
}

function clickHandler(){
  $("#newContact").submit(addContact);
  $("tbody").on("click", ".trashButton", deleteContact);
  $("tbody").on("click", ".edit", editContact);
  $(".sortable").click(sortContacts);
  $("#typeOfContact").change(filterContacts);
}



function saveToStorage() {
  localStorage.contacts = JSON.stringify(contacts);
}

function loadFromStorage() {
  if(!localStorage.contacts) {
    localStorage.contacts = '[]';
  }
  contacts = JSON.parse(localStorage.contacts);
}

function addContact(event){
  console.log('running');
  event.preventDefault();
  if (editing){
    return;
  }
  var types = [];
  $("input:checkbox[name=contactType]:checked").each(function(){
    types.push($(this).val());
  });
  
  var contact = {};
  contact["fullName"] = $('#fullName').val();
  contact["email"] = $('#email').val();
  contact["phone"] = $('#phone').val();
  contact["pets"] = $('#pets').val();
  contact["likes"] = $('#likes').val();
  contact["dislikes"] = $('#dislikes').val();
  contact["birthday"] = $('#birthday').val();
  contact["latestconvo"] = $('#latestconvo').val();
  contact["notes"] = $('#notes').val();
   contact["types"] = types;

  contacts.push(contact);
  saveToStorage();
  updateList();
  $("#newContact").trigger("reset");
}

function updateList() {
  var $tableBody = $('#contacts');
  $tableBody.children().remove();

  var $contacts = contacts.map(function(contact) {
    var $contactRow = $('<tr></tr>')
    $contactRow.removeAttr("id");

    var types = contact["types"];
    for (var i = 0; i < types.length; i++){
      $contactRow.addClass(types[i]);
    }
    $contactRow.append("<td>" + contact["fullName"] + "</td>");
    $contactRow.append("<td>" + contact["phone"] + "</td>");
    $contactRow.append("<td>" + contact["email"] + "</td>");
    $contactRow.append("<td>" + contact["birthday"] + "</td>");
    $contactRow.append("<td>" + contact["pets"] + "</td>");
    $contactRow.append("<td>" + contact["likes"] + "</td>");
    $contactRow.append("<td>" + contact["dislikes"] + "</td>");
    $contactRow.append("<td>" + contact["latestconvo"] + "</td>");
    $contactRow.append("<td>" + contact["notes"] + "</td>");
    $contactRow.append("<td><a class='edit'>Edit</a></td>")
    $contactRow.append(`<td class="deleteTransaction">
    <button type="button" class="btn-sm trashButton">
      <span class="glyphicon glyphicon-trash"></span>
    </button>
  </td>`);
    return $contactRow;
  });



  $tableBody.append($contacts);
}

function editContact(){
  editing = true;
  //event.preventDefault();

  var index = $(this).closest("tr").index();
  var editObj = contacts[index -1];

  
  $('#fullName').val(editObj["fullName"]);
  $('#phone').val(editObj["phone"]);
  $('#email').val(editObj["email"]);
  $('#birthday').val(editObj["birthday"]);
  $('#likes').val(editObj["likes"]);
  $('#dislikes').val(editObj["dislikes"]);
  $('#pets').val(editObj["pets"]);
  $('#latestconvo').val(editObj["latestconvo"]);
  $('#notes').val(editObj["notes"]);
  $('h2').text("Edit Contact:");
  $('#addContact').hide();
  $('#editContact').show();
  $("#editContact").click(makeEdits);

  function makeEdits(){
    
    editObj["#fullName"] = $('#fullName').val();
    editObj["phone"] = $('#phone').val();
    editObj["email"] = $('#email').val();
    editObj["likes"] = $('#likes').val();
    editObj["dislikes"] = $('#dislikes').val();
    editObj["pets"] = $('#pets').val();
    editObj["birthday"] = $('#birthday').val();
    editObj["latestconvo"] = $('#latestconvo').val();
    editObj["notes"] = $('#notes').val();
    updateList();
    saveToStorage();
    location.reload();
  }
}

function deleteContact(){
  var index = $(this).closest("tr").index();
  spliceContact(index - 1);
  updateList();
  saveToStorage();
}

function spliceContact(index){
  contacts.splice(index, 1);
}

function filterContacts(){
  var contactType = $(this).val();
  $("#contacts tr").hide();

  switch(contactType){
    case "family":
      $(".family").show();
      break;
    case "friend":
      $('.friend').show();
      break;
    case "colleague":
      $('.colleague').show();
      break;
    case "other":
      $('.other').show();
      break;
    default:
      $('#contacts tr').not("#template").show();
      break;
  }
}

function sortContacts(){
  var sortby = $(this).data("sort")
  contacts = _.sortBy(contacts, sortby);
  updateList();
  saveToStorage();
}
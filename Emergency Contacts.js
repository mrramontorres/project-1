$(document).ready(init);

var contactsEmg = [];
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
 // $(".sortable").click(sortcontactsEmg);
//  $("#typeOfContact").change(filtercontactsEmg);
}



function saveToStorage() {
    localStorage.contactsEmg = JSON.stringify(contactsEmg);
  }
  
  function loadFromStorage() {
    if(!localStorage.contactsEmg) {
      localStorage.contactsEmg = '[]';
    }
    contactsEmg = JSON.parse(localStorage.contactsEmg);
  }
  
  function addContact(event){
    event.preventDefault();
    if (editing){
      return;
    }

    var contact = {};
  contact["firstName"] = $('#firstName').val();
  contact["lastName"] = $('#lastName').val();
  contact["phone"] = $('#phone').val();
  contact["email"] = $('#email').val();
  contact["description"] = $('#description').val();

  contactsEmg.push(contact);
  saveToStorage();
  updateList();
  $("#newContact").trigger("reset");
}

function updateList() {
    var $tableBody = $('#contactsEmg');
    $tableBody.children().not("#template").remove();
  
    var $contactsEmg = contactsEmg.map(function(contact) {
      var $contactRow = $("#template").clone();
      $contactRow.removeAttr("id");
  
      $contactRow.children(".firstName").text(contact["firstName"]);
      $contactRow.children(".lastName").text(contact["lastName"]);
      $contactRow.children(".phone").text(contact["phone"]);
      $contactRow.children(".email").text(contact["email"]);
      $contactRow.children(".description").text(contact["description"]);
      return $contactRow;
    });
    $tableBody.append($contactsEmg);
  }

  function editContact(){
    editing = true;
    //event.preventDefault();
  
    var index = $(this).closest("tr").index();
    var editObj = contactsEmg[index -1];
  
    $('#firstName').val(editObj["firstName"]);
    $('#lastName').val(editObj["lastName"]);
    $('#phone').val(editObj["phone"]);
    $('#email').val(editObj["email"]);
    $('#description').val(editObj["description"]);

    $('h2').text("Edit Contact:");
  $('#addContact').hide();
  $('#editContact').show();
  $("#editContact").click(makeEdits);

  function makeEdits(){
    editObj["firstName"] = $('#firstName').val();
    editObj["lastName"] = $('#lastName').val();
    editObj["phone"] = $('#phone').val();
    editObj["email"] = $('#email').val();
    editObj["description"] = $('#description').val();
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
    contactsEmg.splice(index, 1);
  }
  
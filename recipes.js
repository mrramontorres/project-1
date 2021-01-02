

$(document).ready(init);

var recipes = [];
var editing = false;
console.log(recipes);

function init(){
  loadFromStorage();
  updateList();
  clickHandler();
}

function clickHandler(){
  $("#newRecipe").submit(addRecipe);
  $("tbody").on("click", ".trashButton", deleteRecipe);
  $("tbody").on("click", ".edit", editRecipe);
  $("tbody").on("click", ".fullRecipe", showRecipe);
}



function saveToStorage() {
  localStorage.recipes = JSON.stringify(recipes);
}

function loadFromStorage() {
  if(!localStorage.recipes) {
    localStorage.recipes = '[]';
  }
  recipes = JSON.parse(localStorage.recipes);
}

function addRecipe(event){
  console.log('running');
  event.preventDefault();
  if (editing){
    return;
  }

  
  var recipe = {};
  recipe["recipeName"] = $('#recipeName').val();
  recipe["ingredients"] = $('#ingredients').val();
  recipe["recipeSteps"] = $('#recipeSteps').val();

  console.log(recipe);

  recipes.push(recipe);
  saveToStorage();
  updateList();
  $("#newRecipe").trigger("reset");
}

function updateList() {
  var $tableBody = $('#recipes');
  $tableBody.children().remove();

  var $recipes = recipes.map(function(recipe) {
    var $recipeRow = $('<tr></tr>')
    $recipeRow.removeAttr("id");

 
    $recipeRow.append("<td>" + recipe["recipeName"] + "</td>");
   // $recipeRow.append("<td>" + recipe["ingredients"] + "</td>");
   // $recipeRow.append("<td>" + recipe["recipeSteps"] + "</td>");
    $recipeRow.append("<td><a class='fullRecipe'>Full Recipe</a></td>");
    $recipeRow.append("<td><a class='edit'>Edit</a></td>")
    $recipeRow.append(`<td class="deleteTransaction">
    <button type="button" class="btn-sm trashButton">
      <span class="glyphicon glyphicon-trash"></span>
    </button>
  </td>`);
    return $recipeRow;
  });



  $tableBody.append($recipes);
}

function editRecipe(){
  editing = true;
  //event.preventDefault();

  var index = $(this).closest("tr").index();
  var editObj = recipes[index -1];

  
  $('#recipeName').val(editObj["recipeName"]);
  $('#ingredients').val(editObj["ingredients"]);
  $('#recipeSteps').val(editObj["recipeSteps"]);
  
  $('#addRecipe').hide();
  $('#editRecipe').show();
  $("#editRecipe").click(makeEdits);

  function makeEdits(){
    
    editObj["#recipeName"] = $('#recipeName').val();
    editObj["ingredients"] = $('#ingredients').val();
    editObj["recipeSteps"] = $('#recipeSteps').val();
   
    updateList();
    saveToStorage();
    location.reload();
  }
}

function deleteRecipe(){
  var index = $(this).closest("tr").index();
  spliceRecipe(index - 1);
  updateList();
  saveToStorage();
}

function spliceRecipe(index){
  recipes.splice(index, 1);
}


function showRecipe(){
    var index = $(this).closest("tr").index();
    $('#fullRecipe').empty();
    
    var par1 =  $("<h1></h1>").text( recipes[index].recipeName);
    var title1 =$("<h3></h3>").text( "You will need: ");
    var par2 =  $("<p></p>").text(recipes[index].ingredients);
    var title2 =$("<h3></h3>").text( "Recipe : ");
    var par3 =  $("<p></p>").text(recipes[index].recipeSteps);
  
     
      $("#fullRecipe").append(par1, title1, par2, title2, par3,  );
    
    
    
    }
    
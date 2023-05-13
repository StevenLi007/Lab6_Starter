// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes foundd in localStorage
 */
function getRecipesFromStorage() {
  // A9. Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.

  const recipes = localStorage.getItem('recipes');

  if (recipes) {
    const recipeArray = JSON.parse(recipes);
    return recipeArray;
  }

  const emptyArray = [];
  return emptyArray;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to the <main> element
  // A11. Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>

  let mainEl = document.querySelector('main');
  
  recipes.forEach(function(recipe) {
    let recipeCardEl = document.createElement('recipe-card');
    recipeCardEl.data = recipe;
    mainEl.append(recipeCardEl);
  })
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.

  let recipeString = JSON.stringify(recipes);
  localStorage.setItem('recipes', recipeString);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  let formEl = document.querySelector('form');

  formEl.addEventListener('submit', function(event) {
    let formData = new FormData(formEl);
    const ratingOptions = document.querySelectorAll('input[type="radio"]');
    let rating;
    for (const option of ratingOptions) {
      if (option.checked) {
        rating = option.value;
        break;
      }
    }
    let recipeObject = {
      "imgSrc": formData.get('imgSrc'),
      "imgAlt": formData.get('imgAlt'),
      "titleLnk": formData.get('titleLnk'),
      "titleTxt": formData.get('titleTxt'),
      "organization": formData.get('organization'),
      "rating": rating,
      "numRatings": formData.get('numRatings'),
      "lengthTime": formData.get('lengthTime'),
      "ingredients": formData.get('ingredients')
    };

    let recipeCardEl = document.createElement('recipe-card');
    recipeCardEl.data = recipeObject;

    let mainEl = document.querySelector('main');
    mainEl.appendChild(recipeCardEl);
    
    recipeArray = getRecipesFromStorage();
    recipeArray.push(recipeObject);
    saveRecipesToStorage(recipeArray);
  });

  const clr = document.querySelector('.danger');

  clr.addEventListener('click', function(event) {
    localStorage.clear();
    const mainEl = document.querySelector('main');
    mainEl.innerHTML = '';
  });

  // B2. Get a reference to the <form> element
  
  // B3. Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked

  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. Create a new FormData object from the <form> element reference above
  // B5. Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
  // B6. Create a new <recipe-card> element
  // B7. Add the recipeObject data to <recipe-card> using element.data
  // B8. Append this new <recipe-card> to <main>
  // B9. Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage

  // B10. Get a reference to the "Clear Local Storage" button
  // B11. Add a click event listener to clear local storage button
  
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. Clear the local storage
  // B13. Delete the contents of <main>
}
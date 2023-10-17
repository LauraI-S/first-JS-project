//!TO DO: Combine fetches
//! RADIO BUTTONS instead of checkboxes
//! or: combined filters on the checkboxes!

//! Define an array to store fetched recipes
let fetchResults = [];
//!fetch recipes by given URL & populate the results
function searchFetch(url) {
  //!use fetch API to make a network request
  fetch(url)
    .then((response) => {
      return response.json(); //!parse response in json
    })
    .then((result) => {
      //this is important! here we extract the recipes from the result
      const recipes = result.results;
      //store recipes in array
      console.log("result in fetch", result);
      fetchResults = recipes;
      // Create and display recipe elements
      createElements(recipes);
      // Add click event handlers to the recipe cards
      addClickEvents(recipes);
    })
    .catch((err) => {
      console.error(err);
    });
}
//!function for static content
function fetchData(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //!this is important! here we define the recipes!
      const recipes = result.recipes;
      console.log("result in fetch", result);
      fetchResults = recipes;
      createElements(recipes);
      addClickEvents(recipes);
    })
    .catch((err) => {
      console.error(err);
    });
}
console.log("recipes:>> ", recipes);

// Function to create and display recipe elements in the DOM
function createElements(data) {
  const resultContainer = document.getElementById("recipes-container");
  //!Clears out the resultContainer so we could pass in new elements everytime
  resultContainer.innerHTML = "";
  console.log("data in create elements function:>> ", data);
  // Loop through recipe data and create individual recipe cards
  data.forEach((recipe, i) => {
    // Create HTML elements for the card
    const myCard = document.createElement("div");
    myCard.setAttribute("class", "card");
    myCard.setAttribute("id", i);

    const myImg = document.createElement("img");
    myImg.setAttribute("src", recipe.image);
    myImg.setAttribute("style", "width:100%");

    const myH1 = document.createElement("h1");
    myH1.innerText = recipe.title;

    const myP = document.createElement("p");
    myP.setAttribute("class", "ready-in-minutes-details");
    myP.innerText = `Ready in ${recipe.readyInMinutes} minutes`;

    const myButton = document.createElement("button");
    myButton.innerText = "show more";

    // Append elements to the container
    myCard.appendChild(myImg);
    myCard.appendChild(myH1);
    myCard.appendChild(myP);
    myCard.appendChild(myButton);

    //* the container contains the card
    resultContainer.appendChild(myCard);
  });
}

// Function to create and display a detailed view of a recipe
function createDetailedElement(recipe) {
  const resultContainer = document.getElementById("recipes-container");
  //! Clear the resultContainer so we could pass in new elements
  resultContainer.innerHTML = "";

  const detailedCard = document.createElement("div");
  //! setting attributes so we can style the created div in css
  detailedCard.setAttribute("class", "detailed-card");

  const detailedImg = document.createElement("img");
  detailedImg.setAttribute("src", recipe.image);
  detailedImg.setAttribute("class", "image-details");

  const detailedTitle = document.createElement("h1");
  detailedTitle.setAttribute("class", "title-details");
  detailedTitle.innerText = recipe.title;

  const detailedReady = document.createElement("p");
  detailedReady.setAttribute("class", "ready-in-minutes-details");
  detailedReady.innerText = `Ready in ${recipe.readyInMinutes} minutes`;

  const detailedSummary = document.createElement("p");
  detailedSummary.setAttribute("class", "summary-details");
  detailedSummary.innerText = recipe.summary;

  const detailedIngredients = document.createElement("ul");
  detailedIngredients.setAttribute("class", "extended-ingredients-details");
  recipe.extendedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.innerText = ingredient.original;
    detailedIngredients.appendChild(ingredientItem);
  });

  const detailedInstructions = document.createElement("p");
  detailedInstructions.setAttribute("class", "instruction-details");
  detailedInstructions.innerText = recipe.instructions;

  detailedCard.appendChild(detailedImg);
  detailedCard.appendChild(detailedTitle);
  detailedCard.appendChild(detailedReady);
  detailedCard.appendChild(detailedSummary);
  detailedCard.appendChild(detailedIngredients);
  detailedCard.appendChild(detailedInstructions);

  resultContainer.appendChild(detailedCard);
}
// Handle changes in the checkbox filters
function handleCheckboxChange(event) {
  console.log("fetchResults :>> ", fetchResults);
  const myRecipes = recipes.recipes;

  const isChosen = event.target.checked;
  const chosenDiet = event.target.value;

  console.log("chosenDiet :>> ", chosenDiet);
  console.log("isChosen :>> ", isChosen);

  if (event.target.checked) {
    console.log(chosenDiet, "is checked");
    //! FILTERING THE RECIPES
    const filteredRecipes = myRecipes.filter((recipe) => {
      if (recipe[chosenDiet] == true) {
        return recipe;
      }
    });
    console.log("filteredRecipes :>> ", filteredRecipes);
    createElements(filteredRecipes);
    addClickEvents(filteredRecipes);

  } else {
    if (fetchResults.length > 0) {
      createElements(fetchResults);
      addClickEvents(fetchResults);
    } else {
      createElements(myRecipes);
      addClickEvents(myRecipes);
    }
  }
}
// Handle user input in the search bar
function handleInput(event) {
  // this function gets invoked when our 'event' triggers. because we are listening for 'keydown', and attaching this function
  const keyPress = event.key;
  const value = event.target.value;
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=5c8d5c4799534b758b1811eac51e1c6c&query=${value}`

  console.log("keyPress :>> ", keyPress);
  if (keyPress == "Enter") {
    console.log("enter was pressed");
    searchFetch(apiUrl);
  }
}

// Attach click event handlers to recipe cards
function addClickEvents(recipes) {
  const allCards = document.querySelectorAll(".card");
  console.warn("allCards :>> ", allCards);

  allCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const clickedTarget = e.currentTarget; // current target is getting us the div parent, instead of the nested tag or element we click on
      const clickedTargetId = clickedTarget.id;
      const chosenRecipe = recipes[clickedTargetId];
      createDetailedElement(chosenRecipe);
    });
  });
}

// Attach click event handlers to recipe cards
function initialisePage() {
  const myCheckboxes = document.querySelectorAll(".checkbox");
  console.log("myCheckboxes :>> ", myCheckboxes);

  const veganCheck = document.getElementById("vegan-checkbox");
  veganCheck.addEventListener("change", handleCheckboxChange);
  console.log("veganCheck :>> ", veganCheck);

  const vegetarianCheck = document.getElementById("vegetarian-checkbox");
  vegetarianCheck.addEventListener("change", handleCheckboxChange);
  console.log("vegetarianCheck :>> ", vegetarianCheck);

  const glutenFreeCheck = document.getElementById("glutenfree-checkbox");
  glutenFreeCheck.addEventListener("change", handleCheckboxChange);
  console.log("glutenfreeCheck: :>>", glutenFreeCheck);

  const veryHealthyCheck = document.getElementById("veryhealthy-checkbox");
  veryHealthyCheck.addEventListener("change", handleCheckboxChange);
  console.log("veryHealthyCheck:>>", veryHealthyCheck);

  const mySearchBar = document.getElementById("search");
  mySearchBar.addEventListener("keydown", handleInput);
}

// Constants for API URLs and other elements
const myContainer = document.getElementById("recipes-container");
const myUrl =
  "https://api.spoonacular.com/recipes/random?apiKey=5c8d5c4799534b758b1811eac51e1c6c&number=150&tag=glutenFree,vegan,vegetarian,omnivore,preparationMinutes,cookingMinutes";

// Functions to control the fetch process when the page loads
 function liveFetchController() {
  initialisePage();
  fetchData(myUrl);
}

function staticFetchController() {
  initialisePage();
  createElements(recipes.recipes);
  addClickEvents(recipes.recipes);
} 
// Entry point: Wait for the DOM to load and then initialize the page
document.addEventListener("DOMContentLoaded", (e) => {
  //staticFetchController();
  liveFetchController();
});
//! we can switch between static and live data here

//*HERE WE RUN THE ONCLICK - Event- activate later on
const article = document.querySelector("#content");
const button = document.querySelector("#myBtn");

function showMore() {
  if (article.className == "open") {
    //read less
    article.className = " ";
    button.innerHTML = "Show more";
  } else {
    //read more
    article.className = "open";
    button.innerHTML = "Show less";
  }
  button.addEventListener("click", showMore);
}
showMore();
//openDetails();

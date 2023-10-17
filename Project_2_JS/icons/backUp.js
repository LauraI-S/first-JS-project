//!9.10.23;

let fetchResults = [];

function fetchData(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //!this is important! here we define the recipes!
      const recipes = result.recipes;
      // console.log('result in fetch',result);
      fetchResults = recipes;
      createElements(recipes);
      addClickEvents(recipes);
      //? maybe add event listener
    })
    .catch((err) => {
      console.error(err);
    });
}
console.log('recipes:>> ', recipes );

function createElements(data) {
  const resultContainer = document.getElementById("recipes-container");
  resultContainer.innerHTML = "";
  console.log("data in create elements function:>> ", data);

  data.forEach((recipe, i) => {
    const myCard = document.createElement("div");
    // myCard.setAttribute("class", "recipe-card");
    myCard.setAttribute("class", "card");
    myCard.setAttribute("id", i);

    const myImg = document.createElement("img");
    myImg.setAttribute("src", recipe.image);
    myImg.setAttribute("style", "width:100%");

    const myH1 = document.createElement("h1");
    myH1.innerText = recipe.title;

    const myP = document.createElement("p");
    myP.setAttribute("class", "price");
    myP.innerText = recipe.dishTypes;

    //? maybe change the above given items shown on the cards
    const myText = document.createElement("p");
    myText.innerText = recipe.sourceName;

    const myButton = document.createElement("button");
    myButton.innerText = "show more";

    //* the CARD contains the list item AND the img....
    myCard.appendChild(myImg);
    myCard.appendChild(myH1);
    myCard.appendChild(myP);
    myCard.appendChild(myText);
    myCard.appendChild(myButton);

    //* the container contains the card
    resultContainer.appendChild(myCard);
  });
}

function createDetailedElement(recipe) {
  console.log("recipe :>> ", recipe);
  const resultContainer = document.getElementById("recipes-container");
  resultContainer.innerHTML = "";

  //! DOM detailed card creation here

  const detailedCard = document.createElement("div");
  detailedCard.setAttribute("class", "detailed-card");

  const detailedImg = document.createElement("img");
  detailedImg.setAttribute("class", "image-details");
  detailedImg.setAttribute("src", recipe.image);

  const detailedTitle = document.createElement("h1");
  detailedTitle.setAttribute("class", "title-details");
  detailedTitle.innerText = recipe.title;

  const detailedSummary = document.createElement("p");
  detailedSummary.setAttribute("class", "summary-details");
  detailedSummary.innerText = recipe.summary;

  const detailedIngredients = document.getElementByClassName(
    "extended-ingredients-details"
  );
  detailedIngredients.setAttribute("class", "extended-ingredients-details");
  detailedIngredients.innerText = recipe.summary;

  const detailedInstructions = document.getElementByClassName(
    "instruction-details"
  );
  const detailedReady = document.getElementByClassName(
    "ready-in-minutes-details"
  );

  //!MOVE ON HERE:
  detailedCard.appendChild(detailedCard);
  detailedCard.appendChild(detailedImg);
  detailedCard.appendChild(detailedTitle);
  detailedCard.appendChild(detailedSummary);
  detailedCard.appendChild(detailedIngredients);
  detailedCard.appendChild(detailedInstructions);
  detailedCard.appendChild(detailedReady);

  resultContainer.appendChild(myCard);
}
//! works with get element and not create element

function createDetailedElement(recipe) {
  console.log('Inside createDetailedElement function');
  const detailedImg = document.querySelector(".image-details");
  const detailedTitle = document.querySelector(".title-details");
  const detailedSummary = document.querySelector(".summary-details");
  const detailedIngredients = document.querySelector(".extended-ingredients-details");
  const detailedInstructions = document.querySelector(".instruction-details");
  const detailedReady = document.querySelector(".ready-in-minutes-details");

  console.log("recipe working", recipe);
  console.log("Setting Image Source:", recipe.image);
  console.log("Setting Title:", recipe.title);
  console.log("Setting Summary:", recipe.summary);

  detailedImg.setAttribute("src", recipe.image);
  detailedTitle.innerText = recipe.title;
  detailedSummary.innerText = recipe.summary;

  detailedIngredients.innerHTML = "";
  recipe.extendedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("p");
    ingredientItem.innerText = ingredient.original;
    detailedIngredients.appendChild(ingredientItem);
  });

  detailedInstructions.innerText = recipe.instructions;
  detailedReady.innerText = `Ready in ${recipe.readyInMinutes} minutes`;
}

const detailedElements = createDetailedElement();
console.log('detailed elements :>> ', detailedElements);

function handleChange(event) {
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

    // filter here, or call a separate function to do it. use filterMethod
    // THEN, once you have the filtered data, you call createElements, with the result
  } else {
    if (fetchResults.length > 0) {
      createElements(fetchResults);
    } else {
      createElements(myRecipes);
    }
  }
}

//! HERE I TRY TO CREATE THE EVENTS FOR THE CARDS TO REACT TO THE CLICKEVENT
function addClickEvents(recipes) {
  const allCards = document.querySelectorAll(".card");
  console.warn("allCards :>> ", allCards);

  allCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const clickedTarget = e.currentTarget; // current target is getting us the div parent, instead of the nested tag or elementn we click on
      // console.log("clickedTarget :>> ", clickedTarget);
      const clickedTargetId = clickedTarget.id;
      // console.log("clickedTargetId :>> ", clickedTargetId);
      const chosenRecipe = recipes[clickedTargetId];
      // console.log("chosenRecipe :>> ", chosenRecipe);
      createDetailedElement(chosenRecipe);
    });
  });
}

//!creating the checkboxes
function initialisePage() {
  const myCheckboxes = document.querySelectorAll(".checkbox");
  console.log("myCheckboxes :>> ", myCheckboxes);
  const veganCheck = document.getElementById("vegan-checkbox");
  //! USING EVENTLISTENERS ON CHECKBOXES with the change-property(?)
  veganCheck.addEventListener("change", handleChange);
  console.log("veganCheck :>> ", veganCheck);

  const vegetarianCheck = document.getElementById("vegetarian-checkbox");
  vegetarianCheck.addEventListener("change", handleChange);
  console.log("vegetarianCheck :>> ", vegetarianCheck);

  const glutenFreeCheck = document.getElementById("glutenfree-checkbox");
  glutenFreeCheck.addEventListener("change", handleChange);
  console.log("glutenfreeCheck: :>>", glutenFreeCheck);

  const veryHealthyCheck = document.getElementById("veryhealthy-checkbox");
  veryHealthyCheck.addEventListener("change", handleChange);
  console.log("veryHealthyCheck:>>", veryHealthyCheck);
}

/* const myContainer = document.getElementById("recipes-container");
const myUrl =
  "https://api.spoonacular.com/recipes/random?apiKey=5c8d5c4799534b758b1811eac51e1c6c&number=150&tag=glutenFree,vegan,vegetarian,omnivore,preparationMinutes,cookingMinutes";

function liveFetchController() {
  initialisePage();
  fetchData(myUrl);
}

function staticFetchController() {
  initialisePage();
  createElements(recipes.recipes);
  addClickEvents(recipes.recipes);
}

// liveFetchController();
staticFetchController(); */

// ! 1) create the detailed recipe card
// ! 2) decide what info would be useful to return from a dynamic fetch (we cover the process on monday)
// ! 3) optional: search bar (this could be for dynamic fetch if the API allows it, or it could be filtering our existing data if not)

// * ------------------------

// openDetails();

//!HERE I HAVE TO LINK TO MY FETCHED DATA,RIGHT?

//?DO A NEW FETCH FOR THE RECIPE DETAILS OR CANT I USE MY PREVIOUS DATA????:

//*HERE WE RUN THE ONCLICK - Event
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
}

/* function createDetailedElement(recipe) {
  console.log("recipe :>> ", recipe);
  const resultContainer = document.getElementById("recipes-container");
  resultContainer.innerHTML = "";

  //! DOM detailed card creation here

  const detailedCard = document.createElement("div");
  detailedCard.setAttribute("class", "detailed-card");

  const detailedImg = document.createElement("img");
  detailedImg.setAttribute("class", "image-details");
  detailedImg.setAttribute("src", recipe.image);

  const detailedTitle = document.createElement("h1");
  detailedTitle.setAttribute("class", "title-details");
  detailedTitle.innerText = recipe.title;

  const detailedSummary = document.createElement("p");
  detailedSummary.setAttribute("class", "summary-details");
  detailedSummary.innerText = recipe.summary;

  const detailedIngredients = document.getElementByClassName(
    "extended-ingredients-details"
  );
  detailedIngredients.setAttribute("class", "extended-ingredients-details");
  detailedIngredients.innerText = recipe.summary;

  const detailedInstructions = document.getElementByClassName(
    "instruction-details"
  );
  const detailedReady = document.getElementByClassName(
    "ready-in-minutes-details"
  );

  //!MOVE ON HERE:
  detailedCard.appendChild(detailedCard);
  detailedCard.appendChild(detailedImg);
  detailedCard.appendChild(detailedTitle);
  detailedCard.appendChild(detailedSummary);
  detailedCard.appendChild(detailedIngredients);
  detailedCard.appendChild(detailedInstructions);
  detailedCard.appendChild(detailedReady);

  resultContainer.appendChild(myCard);
}
//! works with get element and not create element
 */

11.10.23:
let fetchResults = [];
/* let recipes = []; */

function fetchData(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //!this is important! here we define the recipes!
      const recipes = result.recipes;
      // console.log('result in fetch',result);
      fetchResults = recipes;
      createElements(recipes);
      addClickEvents(recipes);
      //? maybe add event listener
    })
    .catch((err) => {
      console.error(err);
    });
}
console.log('recipes:>> ', recipes );



function createElements(data) {
  const resultContainer = document.getElementById("recipes-container");
  //!Clears out the resultContainer so we could pass in new elements everytime
  resultContainer.innerHTML = "";
  console.log("data in create elements function:>> ", data);

  data.forEach((recipe, i) => {
    const myCard = document.createElement("div");
    // myCard.setAttribute("class", "recipe-card");
    myCard.setAttribute("class", "card");
    myCard.setAttribute("id", i);

    const myImg = document.createElement("img");
    myImg.setAttribute("src", recipe.image);
    myImg.setAttribute("style", "width:100%");

    const myH1 = document.createElement("h1");
    myH1.innerText = recipe.title;

    const myP = document.createElement("p");
    myP.setAttribute("class", "price");
    myP.innerText = recipe.dishTypes;

    //? maybe change the above given items shown on the cards
    const myText = document.createElement("p");
    myText.innerText = recipe.sourceName;

    const myButton = document.createElement("button");
    myButton.innerText = "show more";

    //* the CARD contains the list item AND the img....
    myCard.appendChild(myImg);
    myCard.appendChild(myH1);
    myCard.appendChild(myP);
    myCard.appendChild(myText);
    myCard.appendChild(myButton);

    //* the container contains the card
    resultContainer.appendChild(myCard);
  });
}

function createDetailedElement(recipe) {
  const resultContainer = document.getElementById("recipes-container");
  //! Clear ot the resultContainer so we could pass in new elements
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

  const detailedReady = document.createElement("p");
  detailedReady.setAttribute("class", "ready-in-minutes-details");
  detailedReady.innerText = `Ready in ${recipe.readyInMinutes} minutes`;

  detailedCard.appendChild(detailedImg);
  detailedCard.appendChild(detailedTitle);
  detailedCard.appendChild(detailedSummary);
  detailedCard.appendChild(detailedIngredients);
  detailedCard.appendChild(detailedInstructions);
  detailedCard.appendChild(detailedReady);

  resultContainer.appendChild(detailedCard);
}


//! handleChange
function handleChange(event) {
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



    // filter here, or call a separate function to do it. use filterMethod
    // THEN, once you have the filtered data, you call createElements, with the result
  } else {
    if (fetchResults.length > 0) {
      createElements(fetchResults);
    } else {
      createElements(myRecipes);
    }
  }
}

function handleInput (event){
  // this function gets invoked when our 'event' triggers. because we are listening for 'keydown', and attaching this function
  // ! purpose: to get the values from the input field. 
  // ! create a url that includes these values (see your api for how to formulate this endpoint)
// ! use this url to fetch again
  const inputValues = event.target.value;
  // const keyPress = event.key;
}

//! HERE I TRY TO CREATE THE EVENTS FOR THE CARDS TO REACT TO THE CLICKEVENT
function addClickEvents(recipes) {
  const allCards = document.querySelectorAll(".card");
  console.warn("allCards :>> ", allCards);

  allCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const clickedTarget = e.currentTarget; // current target is getting us the div parent, instead of the nested tag or elementn we click on
      // console.log("clickedTarget :>> ", clickedTarget);
      const clickedTargetId = clickedTarget.id;
      // console.log("clickedTargetId :>> ", clickedTargetId);
      const chosenRecipe = recipes[clickedTargetId];
      // console.log("chosenRecipe :>> ", chosenRecipe);
      createDetailedElement(chosenRecipe);
    });
  });
}

//!creating the checkboxes
function initialisePage() {
  const myCheckboxes = document.querySelectorAll(".checkbox");
  console.log("myCheckboxes :>> ", myCheckboxes);
  const veganCheck = document.getElementById("vegan-checkbox");
  //! USING EVENTLISTENERS ON CHECKBOXES with the change-property(?)
  veganCheck.addEventListener("change",handleChange);
  console.log("veganCheck :>> ", veganCheck);

  const vegetarianCheck = document.getElementById("vegetarian-checkbox");
  vegetarianCheck.addEventListener("change", handleChange);
  console.log("vegetarianCheck :>> ", vegetarianCheck);

  const glutenFreeCheck = document.getElementById("glutenfree-checkbox");
  glutenFreeCheck.addEventListener("change", handleChange);
  console.log("glutenfreeCheck: :>>", glutenFreeCheck);

  const veryHealthyCheck = document.getElementById("veryhealthy-checkbox");
  veryHealthyCheck.addEventListener("change", handleChange);
  console.log("veryHealthyCheck:>>", veryHealthyCheck);
}

const myContainer = document.getElementById("recipes-container");
const myUrl =
  "https://api.spoonacular.com/recipes/random?apiKey=5c8d5c4799534b758b1811eac51e1c6c&number=150&tag=glutenFree,vegan,vegetarian,omnivore,preparationMinutes,cookingMinutes";

/* function liveFetchController() {
  initialisePage();
  fetchData(myUrl);
}
 */
function staticFetchController() {
  initialisePage();
  createElements(recipes.recipes);
  addClickEvents(recipes.recipes);
}

// liveFetchController();
staticFetchController();

function search(e) {
  const searchBar = document.querySelector("#searchBar");
  let searchValue = searchBar.value;
  console.log('searchValue :>> ', searchValue);
  if (e.key ==="Enter"){
    let myNewUrl= constructUrl(searchValue);
    fetchData(newUrl);
    searchBar.setAttribute("placeholder",searchValue)
  }
}

//console.log('search(e) :>> ', search(e));




// ! 1) create the detailed recipe card
// ! 2) decide what info would be useful to return from a dynamic fetch (we cover the process on monday)
// ! 3) optional: search bar (this could be for dynamic fetch if the API allows it, or it could be filtering our existing data if not)

// * ------------------------


//*HERE WE RUN THE ONCLICK - Event- activate later on
/*!const article = document.querySelector("#content");
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
  button.addEventListener("click",showMore);
}
showMore();
// openDetails(); */

//!HERE I HAVE TO LINK TO MY FETCHED DATA,RIGHT?

//?DO A NEW FETCH FOR THE RECIPE DETAILS OR CANT I USE MY PREVIOUS DATA????:




 //!_________________________________________________________________________
 //!CREATING MY SEARCHBAR WITH DYNAMIC FETCHING


 //THIS URL IS FOR DROPDOWN
 //const myNewUrl= `https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=24&query=${query}&intolerances=${intolerances}&diet=${diet}&maxReadyTime=${maxReadyTime}&cuisine=${cuisine}&addRecipeInformation=true&fillIngredients=true&apiKey=${newApiKey}`

//! SEARCHBAAAAAR
const apiKey = '5c8d5c4799534b758b1811eac51e1c6c';
const searchResults = document.getElementById("search");

function fetchRecipesBySearchQuery(query) {
const endpoint = 'recipes/search';
const apiUrl = `https://api.spoonacular.com/${endpoint}?apiKey=${apiKey}&query=${query}`;

console.log("before fetch request");
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    console.log(response);
  })
  .then((data) => {
    updateExistingCards("API-response data", data);
    console.log(data);
    // Handle the API response data here
    
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
}
//console.log('after fetch request :>> ', after fetch request);

//! FUNCTION TO UPDATE THE EXISTING CARDS with the fetched data
function updateExistingCards(data){
  console.log('updateExistingCards function is called'); 
  const updateRecipeCards = document.querySelectorAll('.card'); //!<<<check if this works!!
  //LOOP THROUGH THE EXISTING RECIPE-Cards
  updateRecipeCard.forEach((recipeCard, index) => {
    const titleElement = updateRecipeCard.querySelector("h1");
    titleElement.innerText = data.recipes[index].title;
    const imageElement = updateRecipeCards.querySelector("img");
    imageElement.src = data.recipes[index].image;
    const pElement= updateExistingCards.querySelector(".price");
    pElement.innerText = data.recipes[index].dishtypes;

  });
  const searchInput = document.getElementById("search");  //!<<check this!
  searchInput.addEventListener("input",() =>{
    console.log('Input event listener is working');
    const query = searchInput.value;
    fetchRecipesBySearchQuery(query);
})
};

/* // Assuming you have a search input element with id 'search-input'
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  // Call the function to fetch recipes based on the user's search query
  fetchRecipesBySearchQuery(query);
});

 */
/* 
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('recipeSearchForm');
  const searchInput = document.getElementById('searchInput');
  const recipeResults = document.getElementById('recipeResults');

  form.addEventListener('submit', function (e) {
      e.preventDefault();

      const query = searchInput.value;
      const apiKey = 'YOUR_API_KEY'; // Replace with your Spoonacular API key

      if (query) {
          const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?number=24&query=${query}&apiKey=${apiKey}`;

          fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                  // Handle and display the data here
                  displayResults(data);
              })
              .catch(error => {
                  console.error('Error fetching data:', error);
              });
      }
  });
 */
  function displayResults(data) {
      // You can format and display the results here
      // For example, iterate through the data and display recipe titles and images.
      recipeResults.innerHTML = ''; // Clear previous results

      if (data.results && data.results.length > 0) {
          data.results.forEach(recipe => {
              const recipeDiv = document.createElement('div');
              recipeDiv.innerHTML = `<h2>${recipe.title}</h2><img src="${recipe.image}" alt="${recipe.title}">`;
              recipeResults.appendChild(recipeDiv);
          });
      } else {
          recipeResults.innerHTML = 'No recipes found.';
      }
  };





// function handleInput(event) {
//   // this function gets invoked when our 'event' triggers. because we are listening for 'keydown', and attaching this function
//   // ! purpose: to get the values from the input field.
//   // ! create a url that includes these values (see your api for how to formulate this endpoint)
//   // ! use this url to fetch again
//   // const keyPress = event.key
//   // console.log("keyPress :>> ", keyPress);

// if (keyPress == "Enter") {

//     console.log("enter was pressed");
//     console.log('value in the searchbar:>> ', value);
//     console.log('apiUrl :>> ', apiUrl);
//     //console.log("before fetch request");

//   fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       updateExistingCards("API-response data", data);
//       console.log(data);
//       // Handle the API response data here
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });

//   }
// //const keyPress = event.key;
// }
// handleInput();
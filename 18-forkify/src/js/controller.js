import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// const { async } = require("regenerator-runtime");

// if (module.hot) { // from Parcel
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1 loading recipe
    // async fn (loadRecipe) will return Promise, so we should use here await
    await model.loadRecipe(id);
    // const {recipe} = model.state;
    
    // 2 rendering recipe
    // const recipeView = new recipeView(model.state.recipe);
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

// new controller
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1 get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2 load search results
    await model.loadSearchResults(query);  // 'pizza'

    // 3 render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage()); // start page 1 by default

    // 4 render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1 render NEW results    
    resultsView.render(model.getSearchResultsPage(goToPage)); 

  // 2 render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.render(model.state.recipe);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);  
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

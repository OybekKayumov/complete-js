import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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

    // 0 update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    
    // 1 loading recipe
    bookmarksView.update(model.state.bookmarks);

    // 2 loading recipe
    await model.loadRecipe(id);
    
    // 3 rendering recipe
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

    // 2 load search results    // 'pizza'
    await model.loadSearchResults(query); 

    // 3 render results    // start page 1 by default
    resultsView.render(model.getSearchResultsPage());

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
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  // 1 add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);

  // model.addBookmark(model.state.recipe);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back();

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);         // 2.5    

  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings); 
  recipeView.addHandlerAddBookmark(controlAddBookmark); 
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

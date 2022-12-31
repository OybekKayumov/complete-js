import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const { async } = require("regenerator-runtime");

if (module.hot) { // from Parcel
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log('id: ', id);

    if(!id) return;
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
  }
}

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
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

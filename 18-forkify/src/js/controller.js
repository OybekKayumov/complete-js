import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

const { async } = require("regenerator-runtime");

// const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2
/*
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
*/
///////////////////////////////////////
// console.log('Test: ', );

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
    // 1 get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2 load search results
    await model.loadSearchResults(query);  // 'pizza'

    // 3 render results
    console.log('state.search.results: ', model.state.search.results);
  } catch (err) {
    console.log(': ', err);
  }
}
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
}
init();

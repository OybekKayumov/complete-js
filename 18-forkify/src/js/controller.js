import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

const { async } = require("regenerator-runtime");

const recipeContainer = document.querySelector('.recipe');
/*
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
*/
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('Test: ', );

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log('id: ', id);

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
    alert(err)
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));

// showRecipe();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
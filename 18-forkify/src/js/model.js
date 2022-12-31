import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helper.js";

export const state = {
  recipe: {},
}

export const loadRecipe = async function (id) {
  try {    
    const data = await getJSON(`${API_URL}/${id}`)
    
    console.log('res, data: ', res, data);
    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    
    console.log('state.recipe: ', state.recipe);
  } catch (err) {
    // temporary error handling
    console.log('err: ',`${err} 💥💥💥💥`);
    throw err;
  }
}
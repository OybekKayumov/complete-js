import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helper.js";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  }
}

export const loadRecipe = async function (id) {
  try {    
    const data = await getJSON(`${API_URL}${id}`)
    
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

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log('data: ', data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    })
    console.log('state.search.results: ', state.search.results);
  } catch (err) {
    console.log('err: ',`${err} 💥💥💥💥`);
    throw err;
  }
}

loadSearchResults('pizza')
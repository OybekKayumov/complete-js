import View from './View.js';

// import icons from '../img/icons.svg' // Parcel 1
import icons from 'url:../../img/icons.svg' // Parcel 2
// console.log(': ', icons);
import {Fraction} from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = "We could't find that recipe. Please try another one!";
  _message = "";

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
  }

  _generateMarkup() {
    // const markup = `
    return `
        <figure__ class="recipe__fig">
              <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
              <h1 class="recipe__title"_
                <span>${this._data.title}</span>
              </h1>
            </figure__
            <div class="recipe__details">
              <div_ class="reci_e__info">
                <svg class="recipe__info-icon">
                  <us_ href="${icons}#icon-clock"></us_>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cooking_time}</span>
                <span class="recipe__info-text">minutes</span>
              </div_
              <div _lass="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <sp_n class="recipe__info-data recipe__info-data--people">${this._data.servings}</sp_n>
                <span class="recipe__info-text">servings</span>_
                <div class="recipe__info-buttons"_
                  <button class="btn--tiny btn--increase-servings">
                    <svg_>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg_
                  </button>
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated">
               
              </div>
              <button class="btn--round">
                <svg class="">
                  <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">

                ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
                </div>

                <div class="recipe__directions">
                  <h2 class="heading--2">How to cook it</h2>
                  <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${
                      this._data.publisher
                    }</span>. Please check out
                    directions at their website.
                  </p>
                  <a
                    class="btn--small recipe__btn"
                    href="${this._data.sourceUrl}"
                    target="_blank"
                  >
                    <span>Directions</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                  </a>
            </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">
          ${ing.quantity // NaN, if no data -> ''
            ? new Fraction(
              ing.quantity 
              ).toString()
            : ''
          }
        </div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `
  } 
}

export default new RecipeView();

import {elements} from './base';

// get input value...
export const getInput = () => elements.searchInput.value;

// clear input value..
export const clearInput = () => {
    elements.searchInput.value = "";
};

// clear display results...
export const clearResult = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

// hight the recipe which selected
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

// set limit for recipe title...
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length < limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0)
        return `${newTitle.join(' ')} ...`
    }
    return title;
};

// Display recipes on screen...
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link " href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};


// display buttins
const displayBtns = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type == 'prev' ? page - 1 : page + 1}>
            <span>Page ${type == 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `

// render btns on screen
const renderButtons = (page, numRes, resPerPage) => {
    const pages = Math.ceil(numRes/resPerPage);  //get no of pages

    let button;
    if(page === 1 && pages > 1){
        // display only next btn
        button = displayBtns(page, 'next')
    }else if(page < pages){
        // display both next and previous btn
        button = `
            ${displayBtns(page, 'next')}
            ${displayBtns(page, 'prev')}
        `
    }else if(page === pages && pages > 1){
        // display only previous btn
        button = displayBtns(page, 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}




// loop over all recipes and apply renderRecipe function
export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    // render search results
    const start = (page - 1) * resPerPage;
    const end = (page * resPerPage);
    recipes.slice(start, end).forEach(renderRecipe); // automatically pass current element in renderRecipe function

    // render result pagination buttons
    renderButtons(page, recipes.length, resPerPage)
}













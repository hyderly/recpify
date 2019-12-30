
// import all javascrip files and npm packest

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as seacrhView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';



/* Global state of application
*- Search object
*- Current recipe object
*- Shopping object 
*- Liked recipes
**/
const state = {}

// for testing
window.state = state;

/*
*- Search Control
**/

const controlSearch = async () => {

    // 1- Get query...
    const query = seacrhView.getInput();

    if(query){

        // 2- Create new instance base on query and add to state...
        state.search = new Search(query);

        // 3- Prepare UI for results...
        seacrhView.clearInput(); // clear input...
        seacrhView.clearResult(); // clear results...
        renderLoader(elements.searchRes);

        try{
            // 4- Search for recipes...
            await state.search.getRecipes();  // search for recipes...

            // 5- Render results on UI...
            clearLoader();
            seacrhView.renderResult(state.search.result); // get recipes...
        }catch(error){
            alert('Recipes seacrh error');
            clearLoader();
        }
    }
}


// Get form and add event listener...
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();  // page not load on form submition...
    controlSearch();    // call function on form submition...
})

// add event listener to the buttons...
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        seacrhView.clearResult();
        const gotoPage = parseInt(btn.dataset.goto, 10);
        seacrhView.renderResult(state.search.result, gotoPage);
    }
    
})


 
/*
*- Recipe Control
**/

const controlRecipe = async () => {
    // get id from url...
    const id = window.location.hash.replace('#', '');

    if(id){
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlighted selected recipe
        if(state.seacrh) seacrhView.highlightSelected(id);
        
        // Create new recipe object
        state.recipe = new Recipe(id);

        try{
            // seacrh for recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Call the serving and time methods
            state.recipe.calcTime();
            state.recipe.calcServing();
            

            // Render recipes on UI
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

            
            

        }catch(error){
            alert('Recipe processing error')
        }

    }
}

// add event listener on hashchange and page load
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



/*
*- List Control
**/



const controlList = () => {
    // create new list object
    if(!state.list) state.list = new List();

    // Add item in the item array and display in user interface
    state.recipe.ingredients.forEach(el => {
        const newItem = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderList(newItem);
    });

};




/*
*- Likes Control
**/

const controlLikes = () => {
    // if like object is not created then create one...
    if(!state.likes) state.likes = new Likes();

    // get id of currnt recipe...
    const currentId = state.recipe.id;

    // recipe is has NOT liked YET ...
    if(!state.likes.isLiked(currentId)){
        // add item into likes array
        const newItem = state.likes.addLikes(currentId, state.recipe.title, state.recipe.author, state.recipe.image);

        // togol like button
        likesView.likeBtnToggle(true);

        // render liked recipe o menu in user interface
        likesView.renderLikes(newItem);

    // recipe HAS liked...
    }else{
        // delete item from the likes array
        state.likes.deleteLikes(currentId);
        
        // togol like button
        likesView.likeBtnToggle(false);

        // delete liked recipe from menu on user interface
        likesView.deleteIike(currentId);
    }

    // menu toggle btn
    likesView.likesMenuToggle(state.likes.getNumLikes())
}

// on page load
window.addEventListener('load', () => {

    //////////// Likes data ///////////////
    // create like object when page load (initial is empty)
    state.likes = new Likes();

    // restore likes
    state.likes.readStorage();

    // toggle menu button
    likesView.likesMenuToggle(state.likes.getNumLikes());

    // render likes on user interface
    state.likes.likes.forEach(like => likesView.renderLikes(like));

    //////////// shopping data ///////////////

    // create list object
    state.list = new List();

    // restore data
    state.list.readStorage();

    // render on UI
    state.list.item.forEach(item => listView.renderList(item));
})

 // add event listener on serving/ingredient inc/dec buttons
elements.recipe.addEventListener('click', e => {
    // ingredient decrease btn
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateRecipe('dec');
            recipeView.updateIngredients(state.recipe);
        }
    // ingredient increase btn
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateRecipe('inc');
        recipeView.updateIngredients(state.recipe);
    // add to shooping list btn
    }else if(e.target.matches('.recipe-btn--add, .recipe-btn--add *')){
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }
})


elements.shopping.addEventListener('click', e => {
    // get specific item id from user interface
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // delete item from the state 
        state.list.deleteItem(id);

        // delete item from user interface
        listView.deleteItem(id);

    // Handle update event
    }else if(e.target.matches('.shopping__count-value')){
        const val = parseInt(e.target.value, 10);
        state.list.updateItem(id, val);
    }
})





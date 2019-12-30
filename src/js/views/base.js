
// create elemenst object for storing all webapp element in one place...
export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchRes : document.querySelector('.results'),
    searchResList : document.querySelector('.results__list'),
    searchResPages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    shopping : document.querySelector('.shopping__list'),
    likesItem : document.querySelector('.likes__list'),
    likesMenu : document.querySelector('.likes__field'),
    clearList : document.querySelector('.clear-list'),
    shoppingSection : document.querySelector('.shopping'),
}

export const elementStrings = {
    loader : 'loader'
}


// display loader on screen with specific parent...
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `

    parent.insertAdjacentHTML('afterbegin', loader)
}


// clear loader from thre screen...
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}






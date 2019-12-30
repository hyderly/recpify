import {elements} from './base';


// create function for toggle likes button on user interface
export const likeBtnToggle = isLiked => {
    // get icon type based on isLiked OR NOT
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    //Set icon
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}


// create function for menu bar on user interface
export const likesMenuToggle = likesNum => {
    elements.likesMenu.style.visibility = likesNum > 0 ? 'visible' : 'hidden';
}


// render like recipe in menu on user interface
export const renderLikes = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `

    elements.likesItem.insertAdjacentHTML('beforeend', markup);
}


// delete recipe for user interface
export const deleteIike = id => {
    const item = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    item.parentElement.removeChild(item);
}



























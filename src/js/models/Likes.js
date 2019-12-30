
// create and export likes class (object)
export default class Likes{
    constructor(){
        this.likes = [];
    }

    // create add likes method
    addLikes(id, title, author, img){
        const like = {
            id,
            title,
            author,
            img,
        }
        this.likes.push(like);

        // presist data in localStorage
        this.presistData();

        return like;
    }

    // create delete likes method
    deleteLikes(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // presist data in localStorage
        this.presistData();
    }

    // create is liked? method
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    

    // get number of likes method
    getNumLikes(){
        return this.likes.length;
    }

    // presist out likes data
    presistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // read out likes data from local storage
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));

        // restore likes data from local storage
        if(storage) this.likes = storage;
    }
}





























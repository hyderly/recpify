// import axios for http request...
import axios from 'axios';

// create and export search class...
export default class Search{
    constructor(query){
        this.query = query;
    }

    // get recipe list method
    async getRecipes(){
        try{
            const response = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = response.data.recipes;
        }catch(error){
            alert(error)
        }
    }
}


































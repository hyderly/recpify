
// import axios for http call
import axios from 'axios';

// create recipe class and export it
export default class Recipe{
    constructor(id){
        this.id = id;
    }

    // create get recipe method 
    async getRecipe(){
        try{
            const response = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.image = response.data.recipe.image_url;
            this.title = response.data.recipe.title;
            this.author = response.data.recipe.publisher;
            this.source = response.data.recipe.source_url;
            this.ingredients = response.data.recipe.ingredients;

        }catch(error){
            alert('Something get wrong :( please try again');
        }
    }

    // per 3 ingredients take 15 mints...
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    // calculate servings
    calcServing(){
        this.servings = 4;
    }


    // parrse the ingredients into count, unit and ingredient itself...
    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map(el => {

            // 1- uniform units...
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            })

            // 2- Remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");


            // 3- Parse ingredients into counts, unit and ingredient...

            const arrIng = ingredient.split(' ');        // split each ingredient into array 
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));        // save index of unit in ingredient

            let objIng;
            if(unitIndex > -1){
                // there is a unit

                // Ex 4 1/5 unit, arrCount = [4, 1/5]
                // Ex 4 unit, arrCount = [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'))
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' '),
                }

            }else if(parseInt(arrIng[0], 10)){
                // there is no unit, but a but first element is a number
                objIng = {
                    count: (arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' '),
                }

            }else if(unitIndex === -1){
                // there is no unit and first element is not a number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient,
                }
            }

            return objIng; // return objIng as ingredient
        })

        this.ingredients = newIngredients;

    }

    updateRecipe(type) {
        // update servings
        const newServings = type === 'dec'? this.servings - 1 : this.servings + 1;

        //update ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings/this.servings);
        })

        this.servings = newServings;
    }

    

}



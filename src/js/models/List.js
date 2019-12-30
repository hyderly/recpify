
// import uniqid package for create unique id's
import uniqid from 'uniqid'

//create object for shopping list
export default class List{
    constructor(){
        this.item = [];
    }

    // add items
    addItem(count, unit, ingredient){

        const item = {
            id: uniqid(),  // create unique id every time
            count,
            unit,
            ingredient,
        }

        this.item.push(item);

        // presist our list 
        this.presistData();

        return item;
    }

    // delete items
    deleteItem(id){
        const index = this.item.findIndex(el => el.id === id);
        this.item.splice(index, 1);

        // presist our list 
        this.presistData();
    }

    clearList(){
        this.item.splice(0, this.item.length);

        // presist our list 
        this.presistData();
    }

    // update items
    updateItem(id, newCount){
        this.item.find(el => el.id === id).count = newCount;

        // presist our list 
        this.presistData();
    }

    presistData(){
        localStorage.setItem('shopping', JSON.stringify(this.item));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('shopping'));

        // restore list data
        if(storage) this.item = storage;
    }

}





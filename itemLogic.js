const items = require('./fakeDb');

class Item { 
    constructor(name, price){
        this.name = name;
        this,price = price;

        items.push(this);
    }

    static getAllItems(){
        return items
    }

    static UpdateItem(name, data){
        let curItem = Item.find(name);
        if(curItem === undefined){
            throw {message: 'Not found', status: 404}
        }
        curItem.name = data.name;
        curItem.price = data.pricel

        return curItem;
    }

    static findItem(name) {
        const item = items.find(i => i.name === name);
        if(item === undefined){
            throw {message: 'Not found', status: 404}
        }
        return item;
    }

    static removeItem(name) {
        let remItem = items.findIndex(i => i.name === name);
        if(remItem === -1){
            throw {message: 'Not found',status: 404}
        }
        items.splice(remItem, 1);
    }
}

module.exports = Item;
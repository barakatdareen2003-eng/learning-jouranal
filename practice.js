//performing a task
function  greet (name , lastName){
    console.log("Hello" + name +"  "+ lastName);
}

greet("Sara" , "Ahmed");
//calculating a value 
function square (namber){

    return number *number ;

console.log(square(2));//4

}

function inventoryValue(price, quantity) {
    return price * quantity;
}

function stockAfterSale(currentStock) {
    if (currentStock > 0) {
        return currentStock - 1;
    } else {
        return 0;
    }
}
console.log(stockAfterSale(4));//3
console.log(stockAfterSale(1));//0
console.log(stockAfterSale(0));//0


let productName = "Notebook";
let price = 6;
let stock = 4; 

console.log("Product:", productName);
console.log("Initial Inventory Value:", inventoryValue(price, stock));

if (stock > 0) {
    console.log("Sold one");
} else {
    console.log("Out of stock");
}

stock = stockAfterSale(stock);

console.log("Updated Stock:", stock);
console.log("New Inventory Value:", inventoryValue(price, stock));


function testInventory(productName, price, initialStock) {
    let stock = initialStock;

    console.log("\nProduct:", productName);
    console.log("Initial Inventory Value:", inventoryValue(price, stock));

    if (stock > 0) {
        console.log("Sold one");
    } else {
        console.log("Out of stock");
    }

    stock = stockAfterSale(stock);

    console.log("Updated Stock:", stock);
    console.log("New Inventory Value:", inventoryValue(price, stock));
}

testInventory("Notebook", 6, 4);
testInventory("Notebook", 6, 1);
testInventory("Notebook", 6, 0);
testInventory("Eraser", 2, 5); 
  

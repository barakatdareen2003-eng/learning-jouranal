



const productName = "Sticker";
const price = 7;
let stock = 3;

console.log("Product:", productName);

let inventoryValue = price * stock;
console.log("Initial Inventory Value:", inventoryValue);

if (stock > 0) {
    stock = stock - 1;
    console.log("Sold one");
} else {
    console.log("Out of stock");
}

inventoryValue = price * stock;

console.log("Updated Stock:", stock);
console.log("New Inventory Value:", inventoryValue);

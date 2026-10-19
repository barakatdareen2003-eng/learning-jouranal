// Product Variables
const productName = "Badge";
const price = 9;
let stock = 2;

// Initial Inventory Value
console.log("Product:", productName);

let inventoryValue = price * stock;
console.log("Initial Inventory Value:", inventoryValue);

// Sell One Item
if (stock > 0) {
    stock = stock - 1;
    console.log("Sold one");
} else {
    console.log("Out of stock");
}

// Updated Inventory
console.log("Updated Stock:", stock);

inventoryValue = price * stock;
console.log("New Inventory Value:", inventoryValue);
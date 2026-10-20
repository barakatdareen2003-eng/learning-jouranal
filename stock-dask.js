function inventoryValue(price, quantity) {
    return price * quantity;
}

function canSell(stock, quantity) {
    return quantity > 0 && quantity <= stock;
}

function stockAfterRestock(stock, quantity) {
    if (quantity > 0) {
        return stock + quantity;
    } else {
        return stock;
    }
}

function canReturn(netUnitsSold, quantity) {
    return quantity > 0 && quantity <= netUnitsSold;
}

// Test the functions
console.log("Inventory value:", inventoryValue(6, 5));

console.log("Can sell 2 from stock 5:", canSell(5, 2));
console.log("Can sell 6 from stock 5:", canSell(5, 6));

console.log("Stock after restocking 4:", stockAfterRestock(5, 4));
console.log("Stock after restocking 0:", stockAfterRestock(5, 0));

console.log("Can return 2 from 3 sold:", canReturn(3, 2));
console.log("Can return 4 from 3 sold:", canReturn(3, 4));

console.log("----- Notebook Stock Desk -----");

let productName = "Notebook";
let price = 6;
let stock = 5;
let netUnitsSold = 0;
let netSalesValue = 0;

// Sell 2 notebooks
let saleQuantity = 2;

console.log("Operation: Sell", saleQuantity);

if (canSell(stock, saleQuantity)) {
    stock = stock - saleQuantity;
    netUnitsSold = netUnitsSold + saleQuantity;
    netSalesValue = netSalesValue + inventoryValue(price, saleQuantity);
    console.log("Result: Accepted");
} else {
    console.log("Result: Rejected");
}

console.log("Stock:", stock);
console.log("Net units sold:", netUnitsSold);
console.log("Net sales value:", netSalesValue);
console.log("Inventory value:", inventoryValue(price, stock));
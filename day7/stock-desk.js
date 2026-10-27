function square(number) {
    return number * number;
}


console.log("--- Square Test ---");
console.log("square(2) ->", square(2));
console.log("square(0) ->", square(0));
console.log("square(-3) ->", square(-3));

function inventoryValue(price, quantity) {
    return price * quantity;
}

function canSell(stock, quantity) {
    return quantity > 0 && quantity <= stock;
}

function stockAfterRestock(stock, quantity) {
    if (quantity > 0) {
        return stock + quantity;
    }
    return stock;
}

function canReturn(netUnitsSold, quantity) {
    return quantity > 0 && quantity <= netUnitsSold;
}

console.log("\n--- Notebook Shift ---");
let price = 6;
let stock = 5;
let netSold = 0;
let netSales = 0;
let restocked = 0;

function printStep(step, op, status, currentStock, currentSold, currentSales, currentRestocked) {
    let invVal = inventoryValue(price, currentStock);
    console.log("Step " + step + " | " + op + " | " + status + " | Stock: " + currentStock + " | Sold: " + currentSold + " | Sales: " + currentSales + " | Restocked: " + currentRestocked + " | Inv: " + invVal);
}
if (canSell(stock, 2)) {
    stock -= 2;
    netSold += 2;
    netSales += inventoryValue(price, 2);
    printStep(1, "Sell 2", "Accept", stock, netSold, netSales, restocked);
} else {
    printStep(1, "Sell 2", "Reject", stock, netSold, netSales, restocked);
}
if (canSell(stock, 4)) {
    stock -= 4;
    netSold += 4;
    netSales += inventoryValue(price, 4);
    printStep(2, "Sell 4", "Accept", stock, netSold, netSales, restocked);
} else {
    printStep(2, "Sell 4", "Reject", stock, netSold, netSales, restocked);
}

let oldStock = stock;
stock = stockAfterRestock(stock, 4);
if (stock > oldStock) {
    restocked += (stock - oldStock);
}
printStep(3, "Restock 4", "Accept", stock, netSold, netSales, restocked);

if (canSell(stock, 7)) {
    stock -= 7;
    netSold += 7;
    netSales += inventoryValue(price, 7);
    printStep(4, "Sell 7", "Accept", stock, netSold, netSales, restocked);
} else {
    printStep(4, "Sell 7", "Reject", stock, netSold, netSales, restocked);
}

if (canSell(stock, 1)) {
    stock -= 1;
    netSold += 1;
    netSales += inventoryValue(price, 1);
    printStep(5, "Sell 1", "Accept", stock, netSold, netSales, restocked);
} else {
    printStep(5, "Sell 1", "Reject", stock, netSold, netSales, restocked);
}
if (canReturn(netSold, 3)) {
    stock += 3;
    netSold -= 3;
    netSales -= inventoryValue(price, 3);
    printStep(6, "Return 3", "Accept", stock, netSold, netSales, restocked);
} else {
    printStep(6, "Return 3", "Reject", stock, netSold, netSales, restocked);
}

if (canReturn(netSold, 7)) {
    stock += 7;
    netSold -= 7;
    netSales -= inventoryValue(price, 7);
    printStep(7, "Return 7", "Accept", stock, netSold, netSales, restocked);
} else {
    printStep(7, "Return 7", "Reject", stock, netSold, netSales, restocked);
}

if (canReturn(netSold, 6)) {
    stock += 6;
    netSold -= 6;
    netSales -= inventoryValue(price, 6);
    printStep(8, "Return 6", "Accept", stock, netSold, netSales, restocked);
} else {
    printStep(8, "Return 6", "Reject", stock, netSold, netSales, restocked);
}

if (canReturn(netSold, 1)) {
    stock += 1;
    netSold -= 1;}

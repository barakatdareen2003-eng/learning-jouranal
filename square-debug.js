function square(input) {
  return input * input;
}

console.log("Block 1: Square Tests");
console.log("square(2) ->", square(2));   
console.log("square(0) ->", square(0));  

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


console.log("\n--- Block 2: Helper Checks ---");
console.log("inventoryValue(6, 5) =", inventoryValue(6, 5)); // 30
console.log("canSell(5, 2) =", canSell(5, 2));             // true
console.log("canSell(5, 10) =", canSell(5, 10));          // false
console.log("stockAfterRestock(5, 4) =", stockAfterRestock(5, 4)); // 9
console.log("canReturn(2, 1) =", canReturn(2, 1));        // true
console.log("canReturn(2, 5) =", canReturn(2, 5));        // false
console.log("\n--- Block 3: Notebook Shift ---");

let price = 6;
let stock = 5;
let netSold = 0;
let netSales = 0;

function printStep(step, op, status) {
    let invVal = inventoryValue(price, stock);
    console.log("Step " + step + " | " + op + " | " + status + " | Stock: " + stock + " | Sold: " + netSold + " | Sales: " + netSales + " | Inv: " + invVal);
}
if (canSell(stock, 2)) {
    stock -= 2; netSold += 2; netSales += inventoryValue(price, 2);
    printStep(1, "Sell 2", "Accept");
} else { printStep(1, "Sell 2", "Reject"); }
if (canSell(stock, 4)) {
    stock -= 4; netSold += 4; netSales += inventoryValue(price, 4);
    printStep(2, "Sell 4", "Accept");
} else { printStep(2, "Sell 4", "Reject"); }
stock = stockAfterRestock(stock, 4);
printStep(3, "Restock 4", "Accept");
if (canSell(stock, 7)) {
    stock -= 7; netSold += 7; netSales += inventoryValue(price, 7);
    printStep(4, "Sell 7", "Accept");
} else { printStep(4, "Sell 7", "Reject"); }
if (canSell(stock, 1)) {
    stock -= 1; netSold += 1; netSales += inventoryValue(price, 1);
    printStep(5, "Sell 1", "Accept");
} else { printStep(5, "Sell 1", "Reject"); }
if (canReturn(netSold, 3)) {
    stock += 3; netSold -= 3; netSales -= inventoryValue(price, 3);
    printStep(6, "Return 3", "Accept");
} else { printStep(6, "Return 3", "Reject"); }
if (canReturn(netSold, 7)) {
    stock += 7; netSold -= 7; netSales -= inventoryValue(price, 7);
    printStep(7, "Return 7", "Accept");
} else { printStep(7, "Return 7", "Reject"); }
if (canReturn(netSold, 6)) {
    stock += 6; netSold -= 6; netSales -= inventoryValue(price, 6);
    printStep(8, "Return 6", "Accept");
} else { printStep(8, "Return 6", "Reject"); }

if (canReturn(netSold, 1)) {
    stock += 1; netSold -= 1; netSales -= inventoryValue(price, 1);
    printStep(9, "Return 1", "Accept");
} else { printStep(9, "Return 1", "Reject"); }

console.log("\n Block 4: Rejection & Eraser ");

let testStock = 3;
let testSold = 2;

console.log("Sell 0:", canSell(testStock, 0) ? "Accepted" : "Rejected");
console.log("Sell -1:", canSell(testStock, -1) ? "Accepted" : "Rejected");
console.log("Restock 0:", stockAfterRestock(testStock, 0));
console.log("Restock -1:", stockAfterRestock(testStock, -1));
console.log("Return 0:", canReturn(testSold, 0) ? "Accepted" : "Rejected");
console.log("Return -1:", canReturn(testSold, -1) ? "Accepted" : "Rejected");

// Eraser Transfer
let ePrice = 2;
let eStock = 3;
let eSold = 0;
let eSales = 0;

eStock -= 2; eSold += 2; eSales += inventoryValue(ePrice, 2);
console.log("Eraser Sell 2 -> Stock:", eStock, "Sold:", eSold, "Sales:", eSales);

eStock += 1; eSold -= 1; eSales -= inventoryValue(ePrice, 1);
console.log("Eraser Return 1 -> Stock:", eStock, "Sold:", eSold, "Sales:", eSales);

eStock = stockAfterRestock(eStock, 2);
console.log("Eraser Restock 2 -> Stock:", eStock, "Sold:", eSold, "Sales:", eSales);

console.log("\n--- Block 5: Closing Report & Reconciliation ---");

function showSummary(productName, pPrice, pStock, pNetSold, pNetSales) {
    let invVal = inventoryValue(pPrice, pStock);
    console.log("=== Product Summary: " + productName + " ===");
    console.log("Price: " + pPrice + " | Stock: " + pStock + " | Sold: " + pNetSold + " | Sales: " + pNetSales + " | Inv Value: " + invVal);
}

function runReconciliation(productName, openingStock, restockedUnits, currentStock, netSold, currentSalesValue, pPrice) {
    let leftSide = currentStock + netSold;
    let rightSide = openingStock + restockedUnits;
    let expectedSales = pPrice * netSold;

    console.log("Reconciliation " + productName + " -> Units (" + leftSide + " === " + rightSide + "): " + (leftSide === rightSide ? "MATCH" : "MISMATCH"));
    console.log("Reconciliation " + productName + " -> Sales (" + currentSalesValue + " === " + expectedSales + "): " + (currentSalesValue === expectedSales ? "MATCH" : "MISMATCH"));
}

showSummary("Notebook", price, stock, netSold, netSales);
runReconciliation("Notebook", 5, 4, stock, netSold, netSales, price);

showSummary("Eraser", ePrice, eStock, eSold, eSales);
runReconciliation("Eraser", 3, 2, eStock, eSold, eSales, ePrice);

console.log("\nBlock 3");
let mPrice = 3;
let mStock = 4;
let mNetSold = 0;
let mNetSales = 0;

if (canSell(mStock, 3)) {
    mStock -= 3; mNetSold += 3; mNetSales += inventoryValue(mPrice, 3);
}

mStock = stockAfterRestock(mStock, 2);

if (canReturn(mNetSold, 1)) {
    mStock += 1; mNetSold -= 1; mNetSales -= inventoryValue(mPrice, 1);
}

if (canSell(mStock, 4)) {
    mStock -= 4; mNetSold += 4; mNetSales += inventoryValue(mPrice, 4);
}

showSummary("Marker", mPrice, mStock, mNetSold, mNetSales);
runReconciliation("Marker", 4, 2, mStock, mNetSold, mNetSales, mPrice)

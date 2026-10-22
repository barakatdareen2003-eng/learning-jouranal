
function square(input) {
  return input * input;
}

console.log("=== Block 1: Square Tests ===");
console.log("square(2) ->", square(2));   
console.log("square(0) ->", square(0));   
console.log("square(-3) ->", square(-3)); 

// 2. Helper Functions
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


console.log("\n=== Block 2: Helper Boundaries ===");
console.log("inventoryValue(6, 5) =", inventoryValue(6, 5)); 
console.log("canSell(5, 2) =", canSell(5, 2));             
console.log("canSell(5, 0) =", canSell(5, 0));             
console.log("canSell(5, -1) =", canSell(5, -1));          
console.log("stockAfterRestock(5, 4) =", stockAfterRestock(5, 4)); 
console.log("canReturn(2, 1) =", canReturn(2, 1));        
console.log("canReturn(2, 0) =", canReturn(2, 0));        



console.log("\n=== Notebook Sequence ===");
let price = 6;
let stock = 5;
let netSold = 0;
let netSales = 0;
let restockedNotebook = 4; 

function printStep(step, op, status) {
    let invVal = inventoryValue(price, stock);
    console.log("Step " + step + " | " + op + " | " + status + " | Stock: " + stock + " | Sold: " + netSold + " | Sales: " + netSales + " | Inv: " + invVal);
}

if (canSell(stock, 2)) { stock -= 2; netSold += 2; netSales += inventoryValue(price, 2); printStep(1, "Sell 2", "Accept"); }
else { printStep(1, "Sell 2", "Reject"); }

if (canSell(stock, 4)) { stock -= 4; netSold += 4; netSales += inventoryValue(price, 4); printStep(2, "Sell 4", "Accept"); }
else { printStep(2, "Sell 4", "Reject"); }

stock = stockAfterRestock(stock, 4);
printStep(3, "Restock 4", "Accept");

if (canSell(stock, 7)) { stock -= 7; netSold += 7; netSales += inventoryValue(price, 7); printStep(4, "Sell 7", "Accept"); }
else { printStep(4, "Sell 7", "Reject"); }

if (canSell(stock, 1)) { stock -= 1; netSold += 1; netSales += inventoryValue(price, 1); printStep(5, "Sell 1", "Accept"); }
else { printStep(5, "Sell 1", "Reject"); }

if (canReturn(netSold, 3)) { stock += 3; netSold -= 3; netSales -= inventoryValue(price, 3); printStep(6, "Return 3", "Accept"); }
else { printStep(6, "Return 3", "Reject"); }

if (canReturn(netSold, 7)) { stock += 7; netSold -= 7; netSales -= inventoryValue(price, 7); printStep(7, "Return 7", "Accept"); }
else { printStep(7, "Return 7", "Reject"); }

if (canReturn(netSold, 6)) { stock += 6; netSold -= 6; netSales -= inventoryValue(price, 6); printStep(8, "Return 6", "Accept"); }
else { printStep(8, "Return 8", "Reject"); }

if (canReturn(netSold, 1)) { stock += 1; netSold -= 1; netSales -= inventoryValue(price, 1); printStep(9, "Return 1", "Accept"); }
else { printStep(9, "Return 1", "Reject"); }



console.log("\n=== Six Integrated Rejections Test ===");
let baseStock = 3, baseSold = 2, baseSales = 12;

function testRejection(opName, actionFn) {
    let before = "Stock: " + baseStock + ", Sold: " + baseSold + ", Sales: " + baseSales;
    actionFn();
    let after = "Stock: " + baseStock + ", Sold: " + baseSold + ", Sales: " + baseSales;
    console.log(opName + " -> Before [" + before + "] | After [" + after + "] | Unchanged: " + (before === after));
}

testRejection("Sell 0", function() { if(canSell(baseStock, 0)) baseStock--; });
testRejection("Sell -1", function() { if(canSell(baseStock, -1)) baseStock--; });
testRejection("Restock 0", function() { baseStock = stockAfterRestock(baseStock, 0); });
testRejection("Restock -1", function() { baseStock = stockAfterRestock(baseStock, -1); });
testRejection("Return 0", function() { if(canReturn(baseSold, 0)) baseSold--; });
testRejection("Return -1", function() { if(canReturn(baseSold, -1)) baseSold--; });



console.log("\n=== Eraser Shift ===");
let ePrice = 2, eStock = 3, eSold = 0, eSales = 0, restockedEraser = 2;
eStock -= 2; eSold += 2; eSales += inventoryValue(ePrice, 2);
eStock += 1; eSold -= 1; eSales -= inventoryValue(ePrice, 1);
eStock = stockAfterRestock(eStock, 2);



console.log("\n=== Closing Report & Reconciliation ===");

function showSummary(productName, pPrice, pStock, pNetSold, pNetSales) {
    let invVal = inventoryValue(pPrice, pStock);
    console.log("--- " + productName + " Summary ---");
    console.log("Price: " + pPrice + " | Stock: " + pStock + " | Sold: " + pNetSold + " | Sales: " + pNetSales + " | Inv Value: " + invVal);
}

function unitsMatch(stock, netUnitsSold, openingStock, restockedUnits) {
    return (stock + netUnitsSold) === (openingStock + restockedUnits);
}

function salesMatch(price, netUnitsSold, netSalesValue) {
    return (price * netUnitsSold) === netSalesValue;
}

function runReconciliation(productName, openingStock, restockedUnits, currentStock, netSold, currentSalesValue, pPrice) {
    let uMatch = unitsMatch(currentStock, netSold, openingStock, restockedUnits);
    let sMatch = salesMatch(pPrice, netSold, currentSalesValue);
    console.log("Reconciliation " + productName + " -> Units Match: " + uMatch + " | Sales Match: " + sMatch);
}

showSummary("Notebook", price, stock, netSold, netSales);
runReconciliation("Notebook", 5, restockedNotebook, stock, netSold, netSales, price);

showSummary("Eraser", ePrice, eStock, eSold, eSales);
runReconciliation("Eraser", 3, restockedEraser, eStock, eSold, eSales, ePrice);
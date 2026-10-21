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
// 1. Function Tests
console.log("--- Function Tests ---");
console.log("Inventory value:", inventoryValue(6, 5));
console.log("Can sell 2 from stock 5:", canSell(5, 2));
console.log("Can sell 6 from stock 5:", canSell(5, 6));
console.log("Stock after restocking 4:", stockAfterRestock(5, 4));
console.log("Stock after restocking 0:", stockAfterRestock(5, 0));
console.log("Can return 2 from 3 sold:", canReturn(3, 2));
console.log("Can return 4 from 3 sold:", canReturn(3, 4));
// 2. Notebook 
console.log("\n Notebook Sequence ");
let price = 6, stock = 5, netUnitsSold = 0, netSalesValue = 0;
function show() { console.log(stock + " / " + netUnitsSold + " / " + netSalesValue + " / " + inventoryValue(price, stock)); }
// Sell 2
if (canSell(stock, 2)) { stock -= 2; netUnitsSold += 2; netSalesValue += inventoryValue(price, 2); }
show(); // 3 / 2 / 12 / 18

if (!canSell(stock, 4)) { console.log("Rejected:"); }
show(); // 3 / 2 / 12 / 18

// Restock 4
stock = stockAfterRestock(stock, 4);
show(); // 7 / 2 / 12 / 42
// Sell 7
if (canSell(stock, 7)) { stock -= 7; netUnitsSold += 7; netSalesValue += inventoryValue(price, 7); }
show(); // 0 / 9 / 54 / 0
// Try selling 1 (Rejected)
if (!canSell(stock, 1)) { console.log("Rejected:"); }
show(); // 0 / 9 / 54 / 0
// Return 3
if (canReturn(netUnitsSold, 3)) { stock += 3; netUnitsSold -= 3; netSalesValue -= inventoryValue(price, 3); }
show(); // 3 / 6 / 36 / 18
// Try returning 7 (Rejected)
if (!canReturn(netUnitsSold, 7)) { console.log("Rejected:"); }
show(); // 3 / 6 / 36 / 18
// Return 6
if (canReturn(netUnitsSold, 6)) { stock += 6; netUnitsSold -= 6; netSalesValue -= inventoryValue(price, 6); }
show(); // 9 / 0 / 0 / 54
// Try returning 1 (Rejected)
if (!canReturn(netUnitsSold, 1)) { console.log("Rejected:"); }
show(); // 9 / 0 / 0 / 54
// 3. Eraser
console.log("\n--- Eraser Sequence ---");
let ePrice = 2, eStock = 3, eSold = 0, eSalesVal = 0;
function showEraser() { console.log(eStock + " / " + eSold + " / " + eSalesVal + " / " + inventoryValue(ePrice, eStock)); }
// Sell 2
if (canSell(eStock, 2)) { eStock -= 2; eSold += 2; eSalesVal += inventoryValue(ePrice, 2); }
showEraser(); // 1 / 2 / 4 / 2
// Return 1
if (canReturn(eSold, 1)) { eStock += 1; eSold -= 1; eSalesVal -= inventoryValue(ePrice, 1); }
showEraser(); // 2 / 1 / 2 / 4
// Restock 2
eStock = stockAfterRestock(eStock, 2);
showEraser(); // 4 / 1 / 2 / 8



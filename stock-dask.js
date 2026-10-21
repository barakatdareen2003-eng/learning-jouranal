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
console.log("--- Function Tests ---");
console.log("Inventory value:", inventoryValue(6, 5));
console.log("Can sell 2 from stock 5:", canSell(5, 2));
console.log("Can sell 6 from stock 5:", canSell(5, 6));
console.log("Stock after restocking 4:", stockAfterRestock(5, 4));
console.log("Stock after restocking 0:", stockAfterRestock(5, 0));
console.log("Can return 2 from 3 sold:", canReturn(3, 2));
console.log("Can return 4 from 3 sold:", canReturn(3, 4));
console.log("\n Notebook Sequence ");
let price = 6, stock = 5, netUnitsSold = 0, netSalesValue = 0;
function show() { console.log(stock + " / " + netUnitsSold + " / " + netSalesValue + " / " + inventoryValue(price, stock)); }

if (canSell(stock, 2)) { stock -= 2; netUnitsSold += 2; netSalesValue += inventoryValue(price, 2); }
show(); 

if (!canSell(stock, 4)) { console.log("Rejected:"); }
show();
stock = stockAfterRestock(stock, 4);
show();
if (canSell(stock, 7)) { stock -= 7; netUnitsSold += 7; netSalesValue += inventoryValue(price, 7); }
show(); 
if (!canSell(stock, 1)) { console.log("Rejected:"); }
show(); 
if (canReturn(netUnitsSold, 3)) { stock += 3; netUnitsSold -= 3; netSalesValue -= inventoryValue(price, 3); }
show(); 
if (!canReturn(netUnitsSold, 7)) { console.log("Rejected:"); }
show(); 
if (canReturn(netUnitsSold, 6)) { stock += 6; netUnitsSold -= 6; netSalesValue -= inventoryValue(price, 6); }
show(); 
if (!canReturn(netUnitsSold, 1)) { console.log("Rejected:"); }
show(); 
console.log("\n--- Eraser Sequence ---");
let ePrice = 2, eStock = 3, eSold = 0, eSalesVal = 0;
function showEraser() { console.log(eStock + " / " + eSold + " / " + eSalesVal + " / " + inventoryValue(ePrice, eStock)); }
if (canSell(eStock, 2)) { eStock -= 2; eSold += 2; eSalesVal += inventoryValue(ePrice, 2); }
showEraser(); 
if (canReturn(eSold, 1)) { eStock += 1; eSold -= 1; eSalesVal -= inventoryValue(ePrice, 1); }
showEraser(); 
eStock = stockAfterRestock(eStock, 2);
showEraser(); // 4 / 1 / 2 / 8



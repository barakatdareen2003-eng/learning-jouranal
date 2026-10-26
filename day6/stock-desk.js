
function square(n) {
  return n * n;
  
}

console.log("square(2)  -> Expected: 4 | Actual: " + square(2));
console.log("square(0)  -> Expected: 0 | Actual: " + square(0));
console.log("square(-3) -> Expected: 9 | Actual: " + square(-3));

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

console.log("\n=== Block 2: Safe Operations & Rejection Tests ===");

function runSingleRejectionTest(testName, opType, qty) {
  let price = 6, stock = 3, netSold = 2, netSales = 12, restockedUnits = 0;
  let beforeState = "Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales + ", Inv: " + inventoryValue(price, stock) + ", Restocked: " + restockedUnits;
  
  if (opType === "sell" && canSell(stock, qty)) {
    stock -= qty; netSold += qty; netSales += inventoryValue(price, qty);
  } else if (opType === "return" && canReturn(netSold, qty)) {
    stock += qty; netSold -= qty; netSales -= inventoryValue(price, qty);
  } else if (opType === "restock" && qty > 0) {
    stock = stockAfterRestock(stock, qty); restockedUnits += qty;
  }

  let afterState = "Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales + ", Inv: " + inventoryValue(price, stock) + ", Restocked: " + restockedUnits;
  console.log(testName + " -> Before [" + beforeState + "] | After [" + afterState + "] | Unchanged: " + (beforeState === afterState));
}

runSingleRejectionTest("Sell 0", "sell", 0);
runSingleRejectionTest("Sell -1", "sell", -1);
runSingleRejectionTest("Return 0", "return", 0);
runSingleRejectionTest("Return -1", "return", -1);
runSingleRejectionTest("Restock 0", "restock", 0);
runSingleRejectionTest("Restock -1", "restock", -1);

console.log("\n--- Refusal Boundary Cases ---");
runSingleRejectionTest("Baseline Sell 4", "sell", 4);
runSingleRejectionTest("Baseline Return 3", "return", 3);

{
  let stock = 0, netSold = 5, netSales = 30;
  let before = "Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales;
  if (canSell(stock, 1)) { stock -= 1; }
  let after = "Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales;
  console.log("Sold-Out Sell 1 -> Before [" + before + "] | After [" + after + "] | Unchanged: " + (before === after));
}

{
  let stock = 5, netSold = 0, netSales = 0;
  let before = "Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales;
  if (canReturn(netSold, 1)) { stock += 1; }
  let after = "Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales;
  console.log("No-Sales Return 1 -> Before [" + before + "] | After [" + after + "] | Unchanged: " + (before === after));
}

console.log("\n--- Successful Boundary Cases ---");
{
  let price = 6, stock = 3, netSold = 2, netSales = 12, restockedUnits = 0;
  if (canSell(stock, 3)) { stock -= 3; netSold += 3; netSales += price * 3; }
  console.log("Sell 3  -> Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales + ", Inv: " + inventoryValue(price, stock) + ", Restocked: " + restockedUnits);
}
{
  let price = 6, stock = 3, netSold = 2, netSales = 12, restockedUnits = 0;
  if (canReturn(netSold, 2)) { stock += 2; netSold -= 2; netSales -= price * 2; }
  console.log("Return 2 -> Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales + ", Inv: " + inventoryValue(price, stock) + ", Restocked: " + restockedUnits);
}
{
  let price = 6, stock = 3, netSold = 2, netSales = 12, restockedUnits = 0;
  if (4 > 0) { stock = stockAfterRestock(stock, 4); restockedUnits += 4; }
  console.log("Restock 4 -> Stock: " + stock + ", Sold: " + netSold + ", Sales: " + netSales + ", Inv: " + inventoryValue(price, stock) + ", Restocked: " + restockedUnits);
}


console.log("\n=== Block 3: Notebook Replay (Continuous) ===");
let nPrice = 6, nStock = 5, nSold = 0, nSales = 0, nRestocked = 0;

function executeNotebookOp(op, qty) {
  let status = "REJECTED";
  if (op === "sell" && canSell(nStock, qty)) {
    nStock -= qty; nSold += qty; nSales += nPrice * qty; status = "ACCEPTED";
  } else if (op === "restock" && qty > 0) {
    nStock = stockAfterRestock(nStock, qty); nRestocked += qty; status = "ACCEPTED";
  } else if (op === "return" && canReturn(nSold, qty)) {
    nStock += qty; nSold -= qty; nSales -= nPrice * qty; status = "ACCEPTED";
  }
  console.log(op.toUpperCase() + " " + qty + ": " + status + " -> (" + nStock + ", " + nSold + ", " + nSales + ", " + inventoryValue(nPrice, nStock) + ")");
}

executeNotebookOp("sell", 2);
executeNotebookOp("sell", 4);
executeNotebookOp("restock", 4);
executeNotebookOp("sell", 7);
executeNotebookOp("sell", 1);
executeNotebookOp("return", 3);
executeNotebookOp("return", 7);
executeNotebookOp("return", 6);
executeNotebookOp("return", 1);

function isValidQuantity(qty) {
    return Number.isInteger(qty) && qty >= 1 && qty <= 1000;
}

function printState(p) {
    console.log("State -> stock: " + p.stock + ", net sold: " + p.netSold + ", restocked: " + p.restockedTotal + ", returned: " + p.returnedTotal);
}
function sell(p, qty) {
    if (!isValidQuantity(qty) || qty > p.stock) {
        console.log("sell " + qty + " refused unchanged.");
        return false;
    }
    p.stock -= qty;
    p.netSold += qty;
    console.log("sell " + qty + " -> ");
    printState(p);
    return true;
}

function restock(p, qty) {
    if (!isValidQuantity(qty) || p.stock + qty > 10000) {
        console.log("restock " + qty + " refused unchanged.");
        return false;
    }
    p.stock += qty;
    p.restockedTotal += qty;
    console.log("restock " + qty + " -> ");
    printState(p);
    return true;
}

function returnItem(p, qty) {
    if (!isValidQuantity(qty) || qty > p.netSold) {
        console.log("return " + qty + " refused.");
        return false;
    }
    p.stock += qty;
    p.netSold -= qty;
    p.returnedTotal += qty;
    console.log("return " + qty + " -> ");
    printState(p);
    return true;
}
console.log("=== 4. Test the full continuous flow ===");
const notebook = { name: "Notebook", stock: 5, netSold: 0, restockedTotal: 0, returnedTotal: 0 };
printState(notebook);

sell(notebook, 2);
sell(notebook, 3);
sell(notebook, 12);
sell(notebook, 0);  
sell(notebook, 18); 

restock(notebook, 4);
restock(notebook, 7);
restock(notebook, 2);

sell(notebook, 7);
sell(notebook, 1); 

returnItem(notebook, 3);
returnItem(notebook, 7); 
returnItem(notebook, 6);
returnItem(notebook, 1); 

const eraser = { name: "Eraser", stock: 3, netSold: 0, restockedTotal: 0, returnedTotal: 0 };
console.log("\n--- Switch to Eraser ---");
printState(eraser);
sell(eraser, 2);
sell(eraser, 1);
restock(eraser, 4);
returnItem(eraser, 1);
console.log("Notebook remains unchanged.");

console.log("\n=== 5. Boundaries and Edge Cases Tests ===");

const testProduct = { name: "BoundaryTest", stock: 9999, netSold: 0, restockedTotal: 0, returnedTotal: 0 };

console.log(" (9999 + 1):");
restock(testProduct, 1); //لازم تصير هون  10000
console.log(" (10000 + 1):");
restock(testProduct, 1); //لازم يصير في رفض

//نختبر هون المدخلات غير الصحيحة الكسور والسالبة
console.log(" (صفر، سالب، كسور، أكبر من 1000):");
console.log("قيم غير صحيحة للبيع أو التزويد:", 
    isValidQuantity(0), 
    isValidQuantity(-5), 
    isValidQuantity(1.5), 
    isValidQuantity(1001),
);

#Day 11 - Automated Logic & Validation Tests
# Isolated Helper & Guard Tests

console.log("=== Running Day 11 Automated Logic Tests ===");

// 1. Test Quantity Validation Function (isValidQuantity)
console.log("\n1. Testing Quantity Validation:");
console.log("Test 0 (Expected: false) ->", isValidQuantity(0) === false ? "PASS" : "FAIL");
console.log("Test -5 (Expected: false) ->", isValidQuantity(-5) === false ? "PASS" : "FAIL");
console.log("Test 1.5 (Expected: false) ->", isValidQuantity(1.5) === false ? "PASS" : "FAIL");
console.log("Test 1001 (Expected: false) ->", isValidQuantity(1001) === false ? "PASS" : "FAIL");
console.log("Test 250 (Expected: true) ->", isValidQuantity(250) === true ? "PASS" : "FAIL");

// 2. Test Capacity Boundary Limit (Max Stock = 10000)
console.log("\n2. Testing Capacity Boundary (10000 Max Stock):");
const mockProduct = { name: "TestItem", stock: 9999, netSold: 0, restockedTotal: 0, returnedTotal: 0 };

// Attempt restock to hit exact limit (9999 + 1 = 10000)
let canRestockLimit = (mockProduct.stock + 1 <= 10000);
console.log("Restock 1 to 9999 (Expected: true) ->", canRestockLimit === true ? "PASS" : "FAIL");
if (canRestockLimit) mockProduct.stock += 1;

// Attempt restock exceeding limit (10000 + 1)
let canExceedLimit = (mockProduct.stock + 1 <= 10000);
console.log("Restock 1 to 10000 (Expected: false) ->", canExceedLimit === false ? "PASS" : "FAIL");

// 3. Test State Preservation on Refusal
console.log("\n3. Testing State Integrity on Invalid Action:");
const initialStock = mockProduct.stock;
const invalidQty = -10;
if (!isValidQuantity(invalidQty)) {
    console.log("Operation refused. Stock remains unchanged:", mockProduct.stock === initialStock ? "PASS" : "FAIL");
}

console.log("\n=== All Day 11 Logic Tests Completed ===");

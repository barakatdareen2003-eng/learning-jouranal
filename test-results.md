// ==========================================
// Day 10 - Unit Testing & Boundary Validation
// ==========================================

console.log("=== Running Validation and Boundary Tests ===");

// 1. نختبر هون قيم الحدود (Bounds Check)
console.log("Test quantity 0 (Expected false):", isValidQuantity(0));
console.log("Test quantity -10 (Expected false):", isValidQuantity(-10));
console.log("Test quantity 1.5 (Expected false):", isValidQuantity(1.5));
console.log("Test quantity 1001 (Expected false):", isValidQuantity(1001));
console.log("Test quantity 500 (Expected true):", isValidQuantity(500));

// 2. نعمل اختبار  حدود السعة القصوى للمخزون
const sampleItem = { name: "Sample", stock: 9999, netSold: 0, restockedTotal: 0, returnedTotal: 0 };
console.log("Restock 1 unit to 9999 stock (Expected true):", restock(sampleItem, 1));
console.log("Attempt to restock beyond 10000 limit (Expected false):", restock(sampleItem, 1));
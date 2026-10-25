# Day 5 Test Results

## 1. Helper Boundaries & Square Tests
- square(2) -> Expected: 4 | Actual: 4 (Passed)
- square(0) -> Expected: 0 | Actual: 0 (Passed)
- square(-3) -> Expected: 9 | Actual: 9 (Passed)
- inventoryValue(6, 5) -> Actual: 30 (Passed)
- canSell(5, 0) -> Expected: false | Actual: false (Passed)
- canSell(5, -1) -> Expected: false | Actual: false (Passed)

## 2. Six Integrated Rejections Test (Zero Mutation)
Tested invalid quantities (0 and -1) for sell, restock, and return operations:
- *Sell 0 & -1*: Inventory and sales remained unchanged (Unchanged: true).
- *Restock 0 & -1*: Inventory and sales remained unchanged (Unchanged: true).
- *Return 0 & -1*: Inventory and sales remained unchanged (Unchanged: true).

## 3. Notebook Sequence & Reconciliation
- Executed the 9-step sequence for the Notebook.
- *Reconciliation Check*: 
  - Units Match: true
  - Sales Match: true

## 4. Eraser Shift & Reconciliation
- Executed the workflow for the Eraser.
- *Reconciliation Check*: 
  - Units Match: true
  - Sales Match: true

# Day 6 Test Results Report

## 1. Helper Boundaries & Foundation Checks
- square(2) -> Expected: 4 | Actual: 4 (Passed)
- square(0) -> Expected: 0 | Actual: 0 (Passed)
- square(-3) -> Expected: 9 | Actual: 9 (Passed)
- *Unreachable Code Explanation*: Any statement placed after a return keyword is unreachable because return immediately terminates function execution.

## 2. Six Integrated Rejection Tests (Zero Mutation Proof)
Baseline for all rejection tests: Price: 6, Stock: 3, Net Sold: 2, Net Sales: 12, Inventory: 18, Restocked: 0.
- *Sell 0*: Rejected | State Unchanged: true
- *Sell -1*: Rejected | State Unchanged: true
- *Return 0*: Rejected | State Unchanged: true
- *Return -1*: Rejected | State Unchanged: true
- *Restock 0*: Rejected | State Unchanged: true
- *Restock -1*: Rejected | State Unchanged: true

## 3. Four Refusal Boundary Cases
- *Baseline Sell 4*: Rejected | State Unchanged: true
- *Baseline Return 3*: Rejected | State Unchanged: true
- *Sold-Out State Sell 1* (Stock 0): Rejected | State Unchanged: true
- *No-Sales State Return 1* (Net Sold 0): Rejected | State Unchanged: true

## 4. Successful Boundary Cases
- *Sell 3*: Stock: 0, Net Sold: 5, Net Sales: 30, Inventory: 0
- *Return 2*: Stock: 5, Net Sold: 0, Net Sales: 0, Inventory: 30
- *Restock 4*: Stock: 7, Net Sold: 2, Net Sales: 12, Inventory: 42

## 5. Multi-Product Continuous Sequence Outputs
- *Notebook Replay*: Tested sequence of 9 continuous requests.
- *Eraser Replay*: Verified guarded operations and preserves state on refusals.
- *Marker Shift*: Executed sequence and verified that return limits are bounded by netUnitsSold rather than opening stock.

## 6. Reconciliation Checks
- unitsMatch(4, 1, 3, 2) -> Expected: true | Actual: true
- unitsMatch(5, 1, 3, 2) -> Expected: false | Actual: false
- salesMatch(2, 1, 2) -> Expected: true | Actual: true
- salesMatch(2, 1, 3) -> Expected: false | Actual: false

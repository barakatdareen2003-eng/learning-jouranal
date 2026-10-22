Day 4 Test Results Log

# 1. Helper Function Boundary Tests
- square(-3) -> Actual: 9 | Match: Yes
- inventoryValue(6, 5) -> Actual: 30 | Match: Yes
- canSell(5, 2) -> Actual: true | Match: Yes
- canSell(5, 0) -> Actual: false | Match: Yes
- stockAfterRestock(5, 4) -> Actual: 9 | Match: Yes
- canReturn(2, 1) -> Actual: true | Match: Yes

# 2. Notebook Shift Sequence
- Initial State: Price = 6 | Stock = 5 | Net Sold = 0 | Net Sales = 0
- Step 1 (Sell 2): ACCEPTED | Stock: 3 | Sold: 2 | Sales: 12 | Inv Value: 18
- Step 2 (Sell 4): REJECTED | Stock: 3 | Sold: 2 | Sales: 12 | Inv Value: 18
- Step 3 (Restock 4): ACCEPTED | Stock: 7 | Sold: 2 | Sales: 12 | Inv Value: 42
- Step 4 (Sell 7): ACCEPTED | Stock: 0 | Sold: 9 | Sales: 54 | Inv Value: 0
- Step 5 (Sell 1): REJECTED | Stock: 0 | Sold: 9 | Sales: 54 | Inv Value: 0
- Step 6 (Return 3): ACCEPTED | Stock: 3 | Sold: 6 | Sales: 36 | Inv Value: 18
- Step 7 (Return 7): REJECTED | Stock: 3 | Sold: 6 | Sales: 36 | Inv Value: 18
- Step 8 (Return 6): ACCEPTED | Stock: 9 | Sold: 0 | Sales: 0 | Inv Value: 54
- Step 9 (Return 1): REJECTED | Stock: 9 | Sold: 0 | Sales: 0 | Inv Value: 54

# 3. Six Integrated Rejection Tests
- Tested Sell 0, Sell -1, Restock 0, Restock -1, Return 0, and Return -1 against baseline state (Stock: 3, Sold: 2, Sales: 12).
- Outcome: All 6 rejected operations produced identical "Before" and "After" state strings, proving zero state mutation on failure.

## 4. Closing Reconciliation Results
- *Netobook Reconciliation*: Units Match = true | Sales Match = true
- *Eraser Reconciliation*: Units Match = true | Sales Match = true

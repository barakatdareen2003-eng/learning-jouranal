# Test Results - Day 8 UI

| Test Case ID | Operation | Input Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-01 | Restock | Notebook, Qty: 5 | Stock increases by 5, restocked counter updates | Stock and counter updated successfully | Passed |
| TC-02 | Sell | Notebook, Qty: 2 | Stock decreases by 2, net sold increases by 2 | Stock and net sales calculated correctly | Passed |
| TC-03 | Return | Notebook, Qty: 1 | Stock increases by 1, net sold decreases by 1 | Inventory adjusted correctly | Passed |
| TC-04 | Validation | Eraser, Qty: -3 | Show error message for invalid quantity | Error message displayed, operation blocked | Passed |
| TC-05 | Over-sale | Eraser, Qty: 10 | Refuse sale due to insufficient stock | Error refuting message displayed | Passed |

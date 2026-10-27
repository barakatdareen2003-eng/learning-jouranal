# Test Results - Day 7 Stock Desk

| Scenario | Fresh/Continuous | Starting State | Request | Prediction | Expected | Actual | Pass/Fail | Explanation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Sell 2 | Continuous | Stock: 5, Sold: 0 | Sell 2 | Accept | Stock: 3, Sold: 2 | Stock: 3, Sold: 2 | PASS | Valid quantity within available stock. |
| Sell 4 | Continuous | Stock: 3, Sold: 2 | Sell 4 | Reject | Stock: 3, Sold: 2 | Stock: 3, Sold: 2 | PASS | Rejected because requested quantity exceeds stock (Guard clause works). |
| Restock 4 | Continuous | Stock: 3, Sold: 2 | Restock 4 | Accept | Stock: 7, Restocked: 4 | Stock: 7, Restocked: 4 | PASS | Positive restock quantity successfully added to stock. |
| Return 3 | Continuous | Stock: 0, Sold: 5 | Return 3 | Accept | Stock: 3, Sold: 2 | Stock: 3, Sold: 2 | PASS | Valid return within net sold units. |

# Day 13: Inventory Management System - Test Documentation

## 1. Test Scenarios & Expected Results

| Test Case | Starting Fixture | Action | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| *Stock Cap Refusal* | Stock: 10,000, Net Sold: 1 | Return 1 unit | Refuse; protect business values and prevent overflow | Blocked operation & displayed error message | *Passed* |
| *Successful Return* | Stock: 9,999, Net Sold: 1 | Return 1 unit | Accept; stock reaches exactly 10,000 | Stock updated to 10,000 successfully | *Passed* |

---

## 2. Demo Video & Test Proof

You can watch the live demonstration of the stock limit validation and error handling via the link below:

[Watch Demo Video](https://streamable.com/rlwefk)

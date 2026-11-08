
# Day 13: Debugging & Troubleshooting Log

## 1. Overview
This document logs the debugging steps, edge cases handled, and console verification techniques used during the development and testing of the Inventory Management System (Day 13).

---

## 2. Encountered Issues & Resolutions

| Issue / Challenge | Root Cause | Resolution & Fix | Status |
| :--- | :--- | :--- | :--- |
| *Stock Cap Overflow* | Potential for inventory units to exceed the 10,000 unit limit during bulk returns or restocks. | Implemented strict boundary validation before any mutation, capping the resulting stock rigidly between 0 and 10,000 units. | *Resolved* |
| *Data Integrity on Refusal* | Partial state updates affecting revenue or net sold counters when an operation is refused. | Ensured that validation checks run completely before modifying any business metrics, preserving totals on failure. | *Resolved* |
| *Console Testing Restrictions* | Browser security blocks direct pasting of multi-line JavaScript code snippets in DevTools. | Followed browser instruction by typing allow pasting in the Console to execute test states (9999 and 10000 units) successfully. | *Resolved* |

---

## 3. Console Test Commands Reference

Used the following snippets in the browser console to simulate edge cases and verify UI responses:

* *Testing Accept Scenario (Reaching 10,000 cap):*
  ```javascript
  shopState.products.notebook.stock = 9999;
  shopState.products.notebook.netSold = 1;
  render();
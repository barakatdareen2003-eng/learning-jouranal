# Day 11 Debugging & Integration Notes

## Overview
This document records integration testing results, boundary validations, accessibility checks, and observations during the browser integration phase for Day 11.

---

## 1. Browser Integration & UI Test Scenarios

| Test Case | Input / Action | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| *Product Switch* | Switch from Notebook to Eraser | View updates to show Eraser stock (3) without resetting state | UI rendered correct Eraser state | *PASS* |
| *Valid Sale* | Notebook -> Sell Qty: 2 | Stock drops from 5 to 3, Net Sold becomes 2, action logged | State updated correctly and logged to History | *PASS* |
| **Invalid Quantity**| Qty: -5 or 0 | Form sets aria-invalid="true", shows error message, no stock change | Error displayed, stock remained unchanged | **PASS** |
| *Float Quantity*  | Qty: 2.5 | Form rejects non-integer input with clear error message | Error displayed, rejected properly | *PASS* |
| *Capacity Cap*    | Restock Qty: 1000 when stock is near 10,000 | Refused if new stock exceeds 10,000 cap | Refusal triggered, business data preserved | *PASS* |
| *Keyboard Nav*    | Tab through fields & press Enter on button | Form submits predictably without mouse interaction | Smooth keyboard navigation verified | *PASS* |

---

## 2. Accessibility (ARIA) Verification
- *Input Error States*: Verified that aria-invalid changes from "false" to "true" immediately upon entering invalid data (e.g., negative numbers, letters, floats).
- *Error Description*: The error message element <span id="errorMsg"> is linked to the quantity input using aria-describedby, ensuring screen readers announce error reasons accurately.
- *Color Contrast*: Main button #00a8e8 against white background and dark text #2b2d42 against #f4f9fc background satisfy standard contrast ratios (at least 4.5:1).

---

## 3. History Log Behavior
- *Accepted Actions Only*: History records accepted SELL, RESTOCK, and RETURN operations.
- *Refusal Handling*: Failed attempts (e.g., selling more than available stock) trigger error notifications on the input field without adding invalid entries to the history log or modifying product objects.
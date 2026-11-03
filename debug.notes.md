# Debugging and Investigation Notes - Day 10
## Investigation 1: Boundary Limit Enforcement
- *Input & State:* Initial stock set to 9999 units. Attempted to restock 1 unit (reaching 10,000 capacity limit) followed by another 1 unit restock.
- *Expected vs Actual:* The system successfully accepted the first restock to reach the hard cap of 10000, and correctly refused any subsequent restocks exceeding the 10000 threshold without altering previous states.
- *Cause & Fix:* Ensured the strict guard condition p.stock + qty > 10000 is evaluated before any mathematical stock mutation occurs.

## Investigation 2: Input Sanitization & Guard Conditions
- *Input & State:* Tested edge-case inputs including zero, negative integers, floating-point numbers (e.g., 1.5), and out-of-range values (>1000).
- *Expected vs Actual:* The isValidQuantity function successfully blocked invalid inputs using Number.isInteger() and range checks, preserving transaction integrity.
- *Retest & Neighbours:* Verified across both Notebook and Eraser objects; multi-product state isolation was maintained successfully without unwanted resets.
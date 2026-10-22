# Day 4 Debug Notes & Explanations

# Fault Investigation
- *Read-Only Reporting*: Verified that showSummary() and reconciliation helpers perform purely read-only operations and do not modify global state variables.
- *Syntax Fixes*: Avoided template literal expressions (${}) to guarantee smooth execution without environment-specific syntax issues.

# Teach-back Explanations

1. *Why do state changes belong strictly inside acceptance branches?*
   State changes must only occur when a transaction passes all guards. If variables are updated outside guarded condition checks, rejected operations will corrupt inventory counts and financial records.

2. *Why does net units sold limit returns?*
   A store cannot accept a return for more items than were actually sold during that shift (netUnitsSold). Allowing returns beyond this limit creates negative sales and fake stock.

3. **Why must reporting functions (showSummary) avoid mutating state?**
   Reporting functions are designed strictly for inspection and auditing. Modifying system state inside a summary report introduces side effects and unpredictable bugs.

4. *Why don't matching final reconciliation totals prove every single transaction was correct?*
   Matching totals only prove overall balance. Two equal and opposite errors in separate transactions can cancel each other out, yielding correct final totals despite invalid intermediate operations

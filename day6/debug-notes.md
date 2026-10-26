# Day 6 Debugging Investigation Report

## Investigation 1: Sale Update Outside Guard
- *Observed Fault*: Moving state update logic outside canSell guard allowed stock to drop below 0 (stock: -1).
- *Causal Line*: stock -= qty; executed unconditionally before guard evaluation.
- *Fix*: Encapsulated state modifications strictly inside the accepted branch of if (canSell(stock, qty)).
- *Retest Result*: Invalid sale request was properly rejected without modifying state (Unchanged: true).

## Investigation 2: Omitted Stock Increase on Accepted Return
- *Observed Fault*: Omitting stock += qty during return operations reduced netUnitsSold without updating inventory stock.
- *Causal Line*: Missing inventory balance increment inside the return logic.
- *Fix*: Restored stock += qty alongside net units and sales adjustments inside the return block.
- *Retest Result*: Returned units increment stock correctly and satisfy unitsMatch reconciliation checks.

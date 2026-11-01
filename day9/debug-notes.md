# Debugging Notes - Day 9

## Investigation 1: Oversized Number Validation
- *Starting Point:* Fresh Notebook state.
- *Prediction & Failure:* Expected rejection for values outside the 1–1000 range or unsafe integers. Unvalidated inputs allowed precision loss.
- *Fault & Cause:* Missing strict check using Number.isSafeInteger().
- *Smallest Repair:* Added validateQuantity checking safe integers and boundaries.
- *Actual Retest:* Inputting oversized numbers correctly triggers refusal and preserves state.

## Investigation 2: DOM Synchronization
- *Starting Point:* Internal state updates successfully, but table cells remain static.
- *Prediction & Failure:* Table should reflect state immediately.
- *Fault & Cause:* Lack of targeted row IDs and class selectors in renderTable().
- *Smallest Repair:* Added explicit IDs (row-Notebook) and targeted cell classes to update text content.
- *Actual Retest:* Actions immediately update the table cells in the browser
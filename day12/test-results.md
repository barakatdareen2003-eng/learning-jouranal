# Aurora Stationery Shop - Test Plan & Verification

## Overview
This document records the verification steps and expected test cases for Day 12 Inventory Management challenge, ensuring full compliance with the business logic, UI state persistence, and error handling.

## Test Scenarios & Execution

### 1. Eraser Product Test Sequence (Price / Factor: 2, Opening Stock: 3)
* *Sell 2 Units*: Expected Stock: 1 | Net Sold: 2 | Revenue: 4[span_0](start_span)[span_0](end_span).
* *Return 1 Unit*: Expected Stock: 2 | Net Sold: 1 | Revenue: 2[span_1](start_span)[span_1](end_span).
* *Restock 2 Units*: Expected Stock: 4 | Net Sold: 1 | Revenue: 2[span_2](start_span)[span_2](end_span).
* *Page Refresh*: Verified that data synchronizes and persists correctly via localStorage[span_3](start_span)[span_3](end_span).

### 2. Notebook Product Test Sequence (Price / Factor: 6, Opening Stock: 5)
* *Sell 2 Units*: Expected Stock: 3 | Net Sold: 2 | Revenue: 12 | Inventory Total: 18.
* *Restock 4 Units*: Expected Stock: 7 | Net Sold: 2 | Revenue: 12 | Inventory Total: 42.
* *Product Switching*: Switched between Notebook and Eraser without resetting; confirmed isolated state persistence.

### 3. Error Handling & Validation Tests
* *Invalid Inputs*: Tested blank entries, zero, negative numbers, decimals, and out-of-range values (e.g., 1001)[span_4](start_span)[span_4](end_span).
* *Behavior*: System successfully rejects invalid inputs, triggers visual indicators (aria-invalid), displays clear error messages, and preserves the prior business state[span_5](start_span)[span_5](end_span).

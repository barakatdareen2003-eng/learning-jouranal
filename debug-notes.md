
# Aurora Stationery Shop - Debugging & Validation Notes 

## Overview
This log documents the debugging phases, validation checkpoints, and edge-case testing performed during the development of the Aurora Stationery Shop inventory system (Day 12 challenge).

## Debugging Checkpoints & Fixes

### 1. State Isolation & Product Switching
* *Issue Observed*: Ensuring that switching between Notebook and Eraser does not overwrite or bleed computational states.
* *Fix Applied*: Implemented independent product objects within the centralized shopState structure. Selection state (aria-pressed) toggles UI focus without modifying underlying storage objects unless an explicit operation (Sell, Restock, Return) is submitted.

### 2. Input Validation & Bounds Security
* *Issue Observed*: Preventing invalid numerical inputs (such as negative numbers, zero, blank inputs, decimals, or numbers exceeding the 1000 limit) from breaking the inventory logic.
* *Fix Applied*: Created parseValidQuantity() to strictly enforce integer bounds (1 to 1000). Added aria-invalid attribute toggles to dynamically highlight input errors in red and trigger instant refusal message banners.

### 3. Local Storage Persistence & Refresh Integrity
* *Issue Observed*: Ensuring data integrity across browser refreshes and preventing duplicate activity logs on startup.
* *Fix Applied*: Wrapped localStorage read/write operations in robust try...catch blocks. Verified that page refreshes maintain exact cumulative stock, net sold units, and history logs without state corruption.

### 4. Code Cleanliness & Syntax Standards
* *Requirement*: Complete removal of all template literals (backticks for string interpolation) and financial currency symbols to prevent logic errors.
* *Fix Applied*: Refactored all dynamic string outputs in app.js to rely exclusively on standard string concatenation (+), securing full environmental compatibility
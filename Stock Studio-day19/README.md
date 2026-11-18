
# Stock Studio - Professional Inventory Management System

## Overview
Stock Studio is a streamlined, professional inventory management and restock planning web application. It eliminates financial complexity (no prices, currencies, or monetary symbols) to focus purely on stock quantities, SKU catalog tracking, operational logs, and restock drafts.

---

## 5-Session Build Plan
* *Session 1: Requirements & Scope Definition*
  * Defined core requirements: tracking item quantities, SKU management, and avoiding monetary references.
  * Outlined the 3-view architecture (Overview, Inventory Catalog, Restock Draft).
* *Session 2: Core Data Architecture & Logic*
  * Implemented initial JavaScript inventory data structures and localStorage persistence.
  * Added validation for quantities to prevent negative inputs or stock overflows.
* *Session 3: UI/UX Design & Figma Prototyping*
  * Applied a dark-themed UI with purple/pink accents (#a855f7, #ec4899).
  * Converted HTML/CSS layouts into editable Figma frames using html.to.design.
* *Session 4: Operations & Workflow Integration*
  * Connected Sell, Restock, and Return operations to update real-time stock levels.
  * Built the History Log and KPI summary counter cards.
* *Session 5: Testing, Documentation & Final Polish*
  * Executed and verified the 14 required test scenarios.
  * Finalized the README.md documentation and polished responsive layouts for all screen sizes.

---

## 14-Scenario Test Matrix

| ID | Test Scenario | Expected Outcome | Status |
| :--- | :--- | :--- | :--- |
| *TS-01* | Load application default state | Displays initial items and KPI counters correctly | Passed |
| *TS-02* | Search item by name or SKU | Filters item list in real-time | Passed |
| *TS-03* | Filter items by status (Low Stock) | Shows only items below target threshold | Passed |
| *TS-04* | Filter items by status (Out of Stock) | Shows only items with zero stock | Passed |
| *TS-05* | Select an item from catalog | Highlights card and loads details in right panel | Passed |
| *TS-06* | Execute valid 'Sell' operation | Decreases stock and updates history log | Passed |
| *TS-07* | Execute 'Sell' exceeding stock | Displays refusal error message | Passed |
| *TS-08* | Execute valid 'Restock' operation | Increases stock and updates status badge | Passed |
| *TS-09* | Execute 'Return' operation | Adds returned units back to inventory | Passed |
| *TS-10* | Submit invalid/negative quantity | Refuses input and prompts validation error | Passed |
| *TS-11* | Add item to Restock Draft | Adds item to draft workspace successfully | Passed |
| *TS-12* | Update quantity inside Restock Draft | Recalculates total draft units dynamically | Passed |
| *TS-13* | Remove item from Restock Draft | Deletes item from draft list cleanly | Passed |
| *TS-14* | Reset shop via persistence clear | Clears localStorage and reloads initial state | Passed |

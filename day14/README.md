ً# Day 14: Finalizing & Proving the Inventory Management System

## Overview
This project concludes the Aurora Stationery Shop application, focusing on robust data validation, bulletproof storage recovery, and comprehensive testing of the two-product flow (Notebook and Eraser).

## System Specifications
- *Preview Command / URL:* Local development server (http://localhost:5500 or via VS Code Live Server).
- *Storage Key:* dareen-shop-day13-v1
- *Schema Version:* Version 1 (Strict validation of products, quantities, and history array).
- *Browser & Version:* Google Chrome (Latest version)
- *Viewport Tested:* Desktop view and responsive 375px mobile view.

## Reset & Recovery Steps
1. *Normal Startup:* The app reads from localStorage, validates the schema, and safely renders the state. If storage is empty, it initializes a fresh state safely.
2. *Reset Shop:* Click the "Reset this shop" button to clear the storage key and restore default values.

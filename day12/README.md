# Aurora Stationery Shop - Day 12 Inventory Management

An advanced, luxury-themed inventory management web application designed with a sophisticated Burgundy and Light Pink aesthetic. Developed with robust vanilla JavaScript and clean architecture principles.

## Features
* *Dual Product Management*: Track inventory, net sold units, output factor values, and total inventory for *Notebook* and *Eraser*.
* *Operations*: Supports Sell, Restock, and Return operations with strict bounds validation (1 to 1000 units)[span_6](start_span)[span_6](end_span).
* *Persistence*: Fully synchronized with browser localStorage ensuring data retention across page refreshes[span_7](start_span)[span_7](end_span).
* *Luxury UI/UX*: Custom CSS variables, responsive card selection (aria-pressed), and elegant notification banners.
* *Error Prevention*: Complete removal of legacy financial symbols and strict input sanitization.

## Project Structure
* index.html: Main application interface containing embedded luxury styling and layout.
* app.js: Core inventory logic, state management, validation functions, and event listeners.

## How to Run
1. Clone or download the project files (index.html and app.js).
2. Open index.html in any modern web browser.
3. Select a product card, choose an operation type, input the quantity units, and click *Submit Action*.

# Inventory Management System - Day 11 Interface

## Project Overview
This project presents an accessible, interactive browser-based interface for the Inventory Management System built for Day 11. It transitions the console-based business logic from Day 10 into a clean, functional web application with accessibility (ARIA) support and an in-memory operation history log.

---

## Key Features & Accessibility Standards
1. *Interactive Product Management*:
   - Seamlessly switch between products (Notebook and Eraser) while maintaining isolated state variables (Stock, Net Sold, Returned).
2. *Form & Guard Condition Validation*:
   - Enforces valid integer inputs between 1 and 1000.
   - Refuses transactions that exceed maximum capacity limits (capped at 10,000 units) or attempt invalid returns.
3. *Accessibility & ARIA Features*:
   - aria-invalid="true/false" dynamically managed based on input validity.
   - Associated error messages linked via aria-describedby="errorMsg".
   - Semantic HTML layout with accessible focus states and proper label associations.
4. *In-Memory Operation History*:
   - Records all accepted transactions (SELL, RESTOCK, RETURN) showing transaction details and stock transitions (Before ➔ After).
   - Purely state-driven without altering core stock calculations independently.

---


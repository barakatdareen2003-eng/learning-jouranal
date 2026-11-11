# Aurora Stationery Shop - Day 17: Low-Stock Dashboard & Filter

## Project Overview
This repository contains the Day 17 implementation for the Aurora Stationery Shop inventory management system. Day 17 introduces a *Low-Stock Dashboard* and a **Dynamic Filter system (All / Low stock)**, while fully preserving all business logic, local persistence, state validation, and recovery guards developed in Day 16.

---

## Workspace Setup & Context
- *Base Commit:* b2fbac507b4ebd32f3ceb797942f48f5fc6e4cf1
- *Preview Command:* Standard local HTTP server (e.g., python -m http.server 8000 or VS Code Live Server)
- *Preview URL:* http://127.0.0.1:8000/day17/index.html
- *Storage Key:* dareen-shop-day17-v1
- *Page Title:* Aurora Stationery Shop - Day 17

---

## Feature Specifications & Business Rules

### 1. Low-Stock Threshold
- *Threshold Rule:* A fixed named threshold constant LOW_STOCK_THRESHOLD = 2.
- *Classification:*
  - Stock 0: Status badge displays **Out of stock**.
  - Stock 1 or 2: Status badge displays **Low stock**.
  - Stock 3 or higher: Status badge displays **In stock**.
- Status is communicated via explicit text labels alongside color styling.

### 2. Shop Dashboard Panel
- Displays live aggregate stats for the whole shop at all times (independent of active filter):
  - *Total Products:* Always 2 (Notebook and Eraser).
  - *Total Units in Stock:* Sum of current stock of all products (nb.stock + er.stock).
  - *Low-Stock Count:* Number of products currently meeting the low-stock predicate ($\le 2$).

### 3. All / Low Stock Filters
- **All Filter:** Displays all product cards (Notebook & Eraser).
- **Low stock Filter:** Displays only product cards with stock $\le 2$.
- *Empty Filter State:* Shows "No products are low on stock" when no products qualify under the low-stock filter.
- *Filter Immutability Rule:* Filtering alters *visible cards only*. It does not mutate stock levels, delete products, create history entries, or affect saved state in localStorage.
- *Default State:* Always defaults to All on initial page load and after a confirmed shop reset.

### 4. Selected Product Persistence
- Product selection (shopState.selected) remains active even if its visual card is hidden by the active filter.
- An indicator label displays the selected product name and explicitly states if the selected product card is currently hidden by the active filter (e.g., "Selected product: Notebook (Hidden by this filter, but operations still apply)").
- Operations (Sell, Restock, Return) continue to apply directly to the selected product.

---

## Technical Architecture & State Flow
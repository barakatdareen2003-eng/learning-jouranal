# Test Scenarios Suite - Aurora Stationery Shop (Day 18)

## Overview
This document tracks the 9 strict test scenarios (TO1–TO9) executed in a continuous sequence to verify state persistence, filtering logic, stock adjustments, and error refusal handling for the Aurora Stationery Shop dashboard.

## Test Matrix

| Case ID | Action / Operation | Expected N / E Stock | Expected Units / Low / History | Visible Result & Behavior |
| :--- | :--- | :--- | :--- | :--- |
| *TO1* | Fresh state; toggle All then Low filters | Notebook: 5<br>Eraser: 3 | 8 / 0 / 0 | Both products visible on All; empty list on Low filter. |
| *TO2* | Select All, Sell 3 Notebook; switch to Low | Notebook: 2<br>Eraser: 3 | 5 / 1 / 1 | Notebook visible with low-stock badge; Eraser hidden. |
| *TO3* | Keep Low filter, Restock Notebook by 1 | Notebook: 3<br>Eraser: 3 | 6 / 0 / 2 | Empty list under Low; Notebook remains selected and named. |
| *TO4* | Keep hidden, Sell 1 Notebook | Notebook: 2<br>Eraser: 3 | 5 / 1 / 3 | Notebook automatically reappears and remains selected. |
| *TO5* | Return 1 Notebook | Notebook: 3<br>Eraser: 3 | 6 / 0 / 4 | Notebook hides again from Low filter as stock returns to 3. |
| *TO6* | Switch to All, Sell 3 Eraser; switch to Low | Notebook: 3<br>Eraser: 0 | 3 / 1 / 5 | Eraser appears in Low list marked as Out of stock. |
| *TO7* | Try to Sell 1 Eraser (Refusal Test) | Notebook: 3<br>Eraser: 0 | 3 / 1 / 5 | Refused with error message; raw saved state remains unchanged. |
| *TO8* | Switch to All, Sell 1 Notebook; switch to Low | Notebook: 2<br>Eraser: 0 | 2 / 2 / 6 | Both products (Notebook and Eraser) appear in low-stock list. |
| *TO9* | Toggle filters repeatedly, then Refresh browser | Notebook: 2<br>Eraser: 0 | 2 / 2 / 6 | State fully recovered from localStorage (dareen-shop-day18-v1) with no duplicate history entries. |

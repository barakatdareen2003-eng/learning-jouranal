# Day 17 Focused Test Log & Validation Suite

## Summary
All tests (TO1 through TO9) were executed sequentially starting from a confirmed fresh state.

---

## Execution Log (TO1 - TO9)

| Test ID | Starting State | Action / Operation | Expected Result | Actual Result / Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| *TO1* | Fresh state ($N=5, E=3$) | Initial Load & Filter check | Units=8, Low=0, History=0. Filter All shows both products. Filter Low stock shows empty state ("No products are low on stock"). | *PASS* - Units: 8, Low: 0, History: 0. Empty notice displayed on Low stock filter. | Screenshot #1 |
| *TO2* | Filter All, $N=5, E=3$ | Select Notebook, Sell 3 | $N=2, E=3$; Units=5; Low=1; History=1. Notebook badge becomes "Low stock". Low stock filter shows only Notebook. | *PASS* - Notebook stock=2. Low stock count=1. Filter Low stock isolates Notebook. | Screenshot #2 |
| *TO3* | Filter Low stock, $N=2, E=3$ | Select Notebook, Restock 1 | $N=3, E=3$; Units=6; Low=0; History=2. Notebook card hides (Low stock list empty). Operation panel displays "Selected product: Notebook (Hidden)". | *PASS* - Stock=3. Low count=0. Card hidden gracefully, selection label updated. | Screenshot #3 |
| *TO4* | Filter Low stock, $N=3, E=3$ | Sell 1 (Notebook selected & hidden) | $N=2, E=3$; Units=5; Low=1; History=3. Notebook stock drops to 2, reappears immediately in Low stock view with pressed state. | *PASS* - Notebook stock=2, card reappeared dynamically under Low stock filter. | Screenshot #4 |
| *TO5* | Filter Low stock, $N=2, E=3$ | Return 1 (Notebook) | $N=3, E=3$; Units=6; Low=0; History=4. Notebook stock becomes 3 and disappears from Low stock filter again. Proves Return updates dashboard & filter. | *PASS* - Stock=3. Notebook hidden again from Low stock view. | Screenshot #5 |
| *TO6* | Switch to All, $N=3, E=3$ | Select Eraser, Sell 3 | $N=3, E=0$; Units=3; Low=1; History=5. Eraser badge shows "Out of stock". Low stock filter includes Eraser. | *PASS* - Eraser stock=0. Badge updated to "Out of stock". Low stock count=1. | Screenshot #6 |
| *TO7* | Filter All, $N=3, E=0$ | Select Eraser, Sell 1 | Action Refused (Insufficient stock). $N=3, E=0$; Units=3; Low=1; History=5. Business state & history remain unchanged. | *PASS* - Refused message shown. Counts, history, and storage remain identical. | Screenshot #7 |
| *TO8* | Switch to All, $N=3, E=0$ | Select Notebook, Sell 1 | $N=2, E=0$; Units=2; Low=2; History=6. Both Notebook and Eraser now show under Low stock filter. | *PASS* - Both products visible under Low stock filter. Low count=2. | Screenshot #8 |
| *TO9* | $N=2, E=0$ | Toggle filters repeatedly, then Refresh browser | $N=2, E=0$; Units=2; Low=2; History=6. Page loads with All filter selected. No duplicate actions or startup entries. | *PASS* - State fully restored from localStorage upon reload. Filter defaults to All. | Screenshot #9 |

---

## Data Safety Bounded Check Log

| Check | Input / Action | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| *Safety Guard* | Inject fixtures/history-null.json into dareen-shop-day17-v1 & Reload | Warning "Saved data could not be used; recovery required" appears. UI does not crash. Writes blocked until reset. | Recovery warning shown, fallback state active, write operations blocked. | *PASS* |
| *Confirmed Reset* | Click "Reset this shop" | Storage key cleared, fresh state loaded ($N=5, E=3$), Filter resets to All, Dashboard shows 2 / 8 / 0. | Storage reset successfully, fresh state restored. | *PASS* |

# Day 16 Test Log & Validation Suite

## 1. Recovery Lifecycle Tests (RO1)

| Test ID | Fixture / Input State | Action Executed | Expected Decision | Observed Browser Result & State Impact | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- | :--- |
| *RO1-A* | history: [null] (Invalid) | Page Load | Reject & Warn | Storage status shows recovery required. Fresh in-memory fallback rendered. Raw storage untouched[span_9](start_span)[span_9](end_span). | PASS |
| *RO1-B* | Recovery Active | Click Reset -> Cancel | Leave Untouched | Confirmation prompt cancelled. Storage key text remains byte-for-byte identical[span_10](start_span)[span_10](end_span)[span_11](start_span)[span_11](end_span). | PASS |
| *RO1-C* | Recovery Active | Attempt Sell 1 (Notebook) | Refuse Operation | UI displays error message: "Saved data could not be used; recovery required." Storage save blocked[span_12](start_span)[span_12](end_span). | PASS |
| *RO1-D* | Recovery Active | Attempt Restock 1 / Return 1 | Refuse Operation | Both operations blocked prior to state mutation. Activity log remains empty[span_13](start_span)[span_13](end_span)[span_14](start_span)[span_14](end_span). | PASS |
| *RO1-E* | Recovery Active | Confirmed Reset | Clear & Unlock | localStorage.removeItem() succeeds. Fresh state loaded, recovery gate unlocked[span_15](start_span)[span_15](end_span)[span_16](start_span)[span_16](end_span). | PASS |

---

## 2. Two-Product Shift Execution Table

| Product & Action | Decision | Expected Tuple (Stock / NetSold / Revenue / Restocked / Inventory) | Total Accepted Entries | Result |
| :--- | :--- | :--- | :--- | :--- |
| Notebook: Sell 2 | Accept | 3 / 2 / 12 / 0 / 18[span_17](start_span)[span_17](end_span) | 1[span_18](start_span)[span_18](end_span) | PASS |
| Notebook: Sell 4 | Refuse | 3 / 2 / 12 / 0 / 18[span_19](start_span)[span_19](end_span) | 1[span_20](start_span)[span_20](end_span) | PASS |
| Notebook: Restock 4 | Accept | 7 / 2 / 12 / 4 / 42[span_21](start_span)[span_21](end_span) | 2[span_22](start_span)[span_22](end_span) | PASS |
| Notebook: Sell 7 | Accept | 0 / 9 / 54 / 4 / 0[span_23](start_span)[span_23](end_span) | 3[span_24](start_span)[span_24](end_span) | PASS |
| Notebook: Sell 1 | Refuse | 0 / 9 / 54 / 4 / 0[span_25](start_span)[span_25](end_span) | 3[span_26](start_span)[span_26](end_span) | PASS |
| Notebook: Return 3 | Accept | 3 / 6 / 36 / 4 / 18[span_27](start_span)[span_27](end_span) | 4[span_28](start_span)[span_28](end_span) | PASS |
| Notebook: Return 7 | Refuse | 3 / 6 / 36 / 4 / 18[span_29](start_span)[span_29](end_span) | 4[span_30](start_span)[span_30](end_span) | PASS |
| Notebook: Return 6 | Accept | 9 / 0 / 0 / 4 / 54[span_31](start_span)[span_31](end_span) | 5[span_32](start_span)[span_32](end_span) | PASS |
| Notebook: Return 1 | Refuse | 9 / 0 / 0 / 4 / 54[span_33](start_span)[span_33](end_span) | 5[span_34](start_span)[span_34](end_span) | PASS |
| Eraser: Sell 2 | Accept | 1 / 2 / 4 / 0 / 2[span_35](start_span)[span_35](end_span) | 6[span_36](start_span)[span_36](end_span) | PASS |
| Eraser: Return 1 | Accept | 2 / 1 / 2 / 0 / 4[span_37](start_span)[span_37](end_span) | 7[span_38](start_span)[span_38](end_span) | PASS |
| Eraser: Restock 2 | Accept | 4 / 1 / 2 / 2 / 8[span_39](start_span)[span_39](end_span) | 8[span_40](start_span)[span_40](end_span) | PASS |

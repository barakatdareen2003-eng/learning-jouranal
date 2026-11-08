# Day 14: Debugging Stories & Reflections

## Story 1: Saved-State & History Validation
1. *Exact Starting Fixture and Steps:* 
   - Manipulated localStorage directly via DevTools to inject an invalid history value (setting it to null instead of an array).
   - Refreshed the browser page to trigger loadFromStorage().
2. *Expected vs. Actual Behavior Before Fix:* 
   - Expected: The application should detect the anomaly and fall back safely.
   - Actual (Before Validator): The app threw a TypeError: shopState.history.forEach is not a function and crashed the rendering engine completely.
3. *Faulty Assumption:* Assumed that any JSON found in localStorage would automatically match the expected data shape (Array for history).
4. *The Fix:* Implemented a strict validateState() function that verifies Array.isArray(candidate.history) and validates product properties before merging them into live state.
5. *Retest Result:* Upon refreshing with corrupted storage, the app successfully caught the validation failure, logged a warning, and safely initialized the fresh state without crashing.

---

## Story 2: Return Boundary & Stock Cap Protection
1. *Exact Starting Fixture and Steps:* 
   - Notebook stock at maximum capacity (10,000), with netSold at 1.
   - Attempted to process a Return action for 1 unit through the UI.
2. *Expected vs. Actual Behavior Before Fix:* 
   - Expected: The system should block the return to prevent exceeding the 10,000 stock limit.
   - Actual: Previously, without pre-mutation checks, return operations could overflow the inventory bounds.
3. *Faulty Assumption:* Assuming returns only decrease inventory without calculating the resulting addition against the strict 10,000 cap.
4. *The Fix:* Added explicit conditional checks (p.stock + qty > 10000) before mutating any business values.
5. *Retest Result:* Operation was safely refused, displaying an error message while preserving existing totals accurately

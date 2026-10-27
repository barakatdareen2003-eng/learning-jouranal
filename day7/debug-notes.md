# Debugging Notes - Day 7
## Investigation 1: Square Function Parameter Mismatch
- *Starting State:* Original practice.js file with parameter namber and operation using number.
- *Expected Result:* square(2) -> 4, square(0) -> 0, square(-3) -> 9.
- *Actual Before-Fix:* Reference error due to parameter name mismatch and unreachable code after return.
- *Root Cause:* Typo in parameter naming and placing console.log inside the function after the return statement.
- *Smallest Repair:* Unified parameter name to number and moved all print statements outside the function scope.
- *After-Fix Output:* Correct mathematical squares computed and printed successfully.

## Investigation 2: Boundary Guard Verification
- *Test Case:* Testing canSell(stock, 0) and canSell(stock, -1).
- *Reason:* Ensuring zero or negative numbers do not mutate the inventory state.
- *Result:* Successfully rejected and zero state mutations observed

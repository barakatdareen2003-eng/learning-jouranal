# Debug Notes - Day 5

## Issue: Variable Redclaration Error
- *What happened*: When I added the Notebook sequence code, the terminal showed an error because I used let for variables (stock, price, etc.) that were already declared earlier in the file.
- *How I fixed it*: Removed the extra let keywords and used direct variable assignment since the variables were already defined in the script scope.

## Observations on Guard Validation
- *Check*: Guard functions (canSell, canReturn, stockAfterRestock) successfully caught invalid inputs (0 and negative numbers).
- *Result*: Confirmed that the system prevents any data changes during rejected transactions, which satisfies the Zero Mutation requirement.

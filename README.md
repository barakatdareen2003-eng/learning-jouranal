Day 3
A JavaScript console-based inventory management system designed to track products (Notebook, Eraser, Marker), handle stock operations (sales, restocks, returns), validate constraints, and perform automated closing reconciliations.
Input Assumptions
 All supplied inputs are numbers and whole numbers.
 Starting stock and net units sold are non-negative.
 Prices remain fixed throughout the shift.
 Edge cases like text, decimals, discounts, and external payment processing are out of scope.
How to Run
 Ensure Node.js is installed on your machine.
 Open your terminal or command prompt.
   Run the following command from the repository root:
    Debug Notes  Day 3 Stock Desk
Square Function Investigation
Issue: The original trial function used an undeclared variable (value * value) instead of the parameter (input * input), and included an unreachable console.log statement after the return.
  Resolution:Corrected the parameter usage to input * input and moved test calls outside the function definition to ensure proper execution.
Key Learnings
  All state-changing operations (sales, returns, restocks) must strictly occur inside accepted conditional branches to prevent unauthorized inventory leakage.
  Return quantities cannot exceed net units sold, guarded safely by canReturn.

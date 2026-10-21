Day 3
*A JavaScript console-based inventory management system designed to track products (Notebook, Eraser, Marker), handle stock operations (sales, restocks, returns), validate constraints, and perform automated closing reconciliations.

*Input Assumptions
 1-All supplied inputs are numbers and whole numbers.
 2-Starting stock and net units sold are non-negative.
3- Prices remain fixed throughout the shift.
 4-Edge cases like text, decimals, discounts, and external payment processing are out of scope.
 
*How to Run
 1-Ensure Node.js is installed on your machine.
 2-Open your terminal or command prompt.
   Run the following command from the repository root:
    Debug Notes  Day 3 Stock Desk
Square Function Investigation

*Issue: The original trial function used an undeclared variable (value * value) instead of the parameter (input * input), and included an unreachable console.log statement after the return.
  Resolution:Corrected the parameter usage to input * input and moved test calls outside the function definition to ensure proper execution.
*Key Learnings

  1-All state-changing operations (sales, returns, restocks) must strictly occur inside accepted conditional branches to prevent unauthorized inventory leakage.
  2-Return quantities cannot exceed net units sold, guarded safely by canReturn.

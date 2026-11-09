# Day 15: Test Documentation & Results

## 1. Test Execution Record (Expected vs. Actual)

| Test ID | Test Group | Starting Fixture / State | Exact Action / Input | Expected Result | Actual Result | Status | Evidence Reference |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *H00* | Envelope | Valid fresh snapshot | Load app with valid storage | Fresh values loaded successfully without warnings | Loaded safely with default values | *Pass* | Console Inspection |
| *H01* | History | fresh.history = [null] | Refresh page with null history entry | Reject null entry safely, display warning, prevent crash | Caught validation failure, logged warning, safe state loaded | *Pass* | Console Inspection |
| *TC-01* | Return Cap | Stock: 10,000, Net Sold: 1 | Select Return, Quantity: 1, Submit | Refuse operation; protect 10k stock cap | Blocked successfully, red error message displayed | *Pass* |
| *TC-02* | Return Cap | Stock: 9,999, Net Sold: 1 | Select Return, Quantity: 1, Submit | Accept operation; stock reaches 10,000 | Stock updated to 10,000, summary updated | *Pass* | 

# Day 14: Comprehensive Test Documentation

## 1. Test Execution Record (Expected vs. Actual)

| Test ID | Starting State | Exact Action / Input | Expected Result | Actual Result | Status | Evidence Reference |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *TC-01* | Stock: 10,000, Net Sold: 1 | Select Return, Quantity: 1, Submit | Refuse operation; protect 10k stock cap | Blocked successfully, red error message displayed | *Pass* | [Demo Video](https://streamable.com/rlwefk) |
| *TC-02* | Stock: 9,999, Net Sold: 1 | Select Return, Quantity: 1, Submit | Accept operation; stock reaches 10,000 | Stock updated to 10,000, summary updated | *Pass* | [Demo Video](https://streamable.com/rlwefk) |
| *TC-03* | Corrupted Storage (null history) | Refresh page with malformed JSON/null array | Fallback to safe fresh state without crashing | App loaded safely with default values & warning log | *Pass* | Console Inspection |
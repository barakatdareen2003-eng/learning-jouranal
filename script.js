// State Management
const products = {
    Notebook: { price: 6, openingStock: 5, stock: 5, sold: 0, sales: 0, restocked: 0 },
    Eraser: { price: 2, openingStock: 3, stock: 3, sold: 0, sales: 0, restocked: 0 }
};

function validateQuantity(qtyInput) {
    if (qtyInput === undefined || qtyInput === null || String(qtyInput).trim() === "") {
        return { valid: false, reason: "Quantity cannot be blank." };
    }

    const trimmed = String(qtyInput).trim();
    const num = Number(trimmed);

    if (!Number.isFinite(num) || !Number.isSafeInteger(num)) {
        return { valid: false, reason: "Must be a valid whole number." };
    }

    if (num < 1 || num > 1000) {
        return { valid: false, reason: "Quantity must be between 1 and 1000." };
    }

    return { valid: true, value: num };
}
function executeSell(productName, qty) {
    const prod = products[productName];
    if (!prod) return { accepted: false, reason: "Product not found." };

    const validation = validateQuantity(qty);
    if (!validation.valid) return { accepted: false, reason: validation.reason };

    const amount = validation.value;
    
    if (amount > prod.stock) {
        return { accepted: false, reason: "Insufficient stock for this sale." };
    }

    prod.stock -= amount;
    prod.sold += amount;
    prod.sales = prod.sold * prod.price;

    return { accepted: true };
}

function executeRestock(productName, qty) {
    const prod = products[productName];
    if (!prod) return { accepted: false, reason: "Product not found." };

    const validation = validateQuantity(qty);
    if (!validation.valid) return { accepted: false, reason: validation.reason };

    const amount = validation.value;
    
    if (prod.stock + amount > 10000) {
        return { accepted: false, reason: "Stock exceeds maximum capacity of 10000." };
    }

    prod.stock += amount;
    prod.restocked += amount;

    return { accepted: true };
}

function executeReturn(productName, qty) {
    const prod = products[productName];
    if (!prod) return { accepted: false, reason: "Product not found." };

    const validation = validateQuantity(qty);
    if (!validation.valid) return { accepted: false, reason: validation.reason };

    const amount = validation.value;
    
    if (amount > prod.sold) {
        return { accepted: false, reason: "Cannot return more than sold units." };
    }

    prod.stock += amount;
    prod.sold -= amount;
    prod.sales = prod.sold * prod.price;

    return { accepted: true };
}
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("productSelect");
    const quantityInput = document.getElementById("quantityInput");
    const messageBox = document.getElementById("messageBox");

    function renderTable() {
        const notebookRow = document.getElementById("row-Notebook");
        if (notebookRow) {
            notebookRow.querySelector(".col-price").textContent = products.Notebook.price;
            notebookRow.querySelector(".col-stock").textContent = products.Notebook.stock;
            notebookRow.querySelector(".col-sold").textContent = products.Notebook.sold;
            notebookRow.querySelector(".col-sales").textContent = products.Notebook.sales;
            notebookRow.querySelector(".col-restocked").textContent = products.Notebook.restocked;
            notebookRow.querySelector(".col-inventory").textContent = products.Notebook.stock * products.Notebook.price;
        }

        const eraserRow = document.getElementById("row-Eraser");
        if (eraserRow) {
            eraserRow.querySelector(".col-price").textContent = products.Eraser.price;
            eraserRow.querySelector(".col-stock").textContent = products.Eraser.stock;
            eraserRow.querySelector(".col-sold").textContent = products.Eraser.sold;
            eraserRow.querySelector(".col-sales").textContent = products.Eraser.sales;
            eraserRow.querySelector(".col-restocked").textContent = products.Eraser.restocked;
            eraserRow.querySelector(".col-inventory").textContent = products.Eraser.stock * products.Eraser.price;
        }
    }

    function showMessage(text, isError = false) {
        messageBox.textContent = text;
        messageBox.className = "message-box " + (isError ? "error" : "success");
        quantityInput.setAttribute("aria-invalid", isError ? "true" : "false");
    }

    document.getElementById("sellBtn").addEventListener("click", () => {
        const result = executeSell(productSelect.value, quantityInput.value);
        if (result.accepted) {
            showMessage("Sale processed successfully.", false);
            renderTable();
        } else {
            showMessage(result.reason, true);
        }
    });

    document.getElementById("restockBtn").addEventListener("click", () => {
        const result = executeRestock(productSelect.value, quantityInput.value);
        if (result.accepted) {
            showMessage("Restock processed successfully.", false);
            renderTable();
        } else {
            showMessage(result.reason, true);
        }
    });

    document.getElementById("returnBtn").addEventListener("click", () => {
        const result = executeReturn(productSelect.value, quantityInput.value);
        if (result.accepted) {
            showMessage("Return processed successfully.", false);
            renderTable();
        } else {
            showMessage(result.reason, true);
        }
    });

    renderTable();
});
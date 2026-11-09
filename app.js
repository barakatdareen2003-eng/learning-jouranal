const STORAGE_KEY = "dareen-shop-day15-v1";

function getFreshState() {
    return {
        version: 1,
        selected: "notebook",
        products: {
            notebook: { name: "Notebook", factor: 6, openingStock: 5, stock: 5, netSold: 0, restockedCount: 0, returnedCount: 0, totalOutput: 0, inventoryTotal: 30 },
            eraser: { name: "Eraser", factor: 2, openingStock: 3, stock: 3, netSold: 0, restockedCount: 0, returnedCount: 0, totalOutput: 0, inventoryTotal: 6 }
        },
        history: []
    };
}

let shopState = getFreshState();

function validateState(candidate) {
    if (!candidate || typeof candidate !== "object") return false;
    if (!candidate.products || typeof candidate.products !== "object") return false;
    if (!Array.isArray(candidate.history)) return false;

    // فحص عناصر الـ history لضمان عدم وجود قيم null أو كائنات غير صالحة (H01 check)
    for (const entry of candidate.history) {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
            return false;
        }
    }

    const reqKeys = ["notebook", "eraser"];
    for (const key of reqKeys) {
        const p = candidate.products[key];
        if (!p || typeof p !== "object") return false;
        if (typeof p.stock !== "number" || p.stock < 0 || p.stock > 10000) return false;
        if (typeof p.netSold !== "number" || p.netSold < 0) return false;
        if (typeof p.factor !== "number" || p.factor <= 0) return false;
    }
    return true;
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (validateState(parsed)) {
                shopState = parsed;
                document.getElementById("storageStatus").textContent = "Storage: Validated & Loaded from localStorage";
            } else {
                console.warn("Invalid or corrupt data structure detected. Recovering to fresh state.");
                shopState = getFreshState();
                document.getElementById("storageStatus").textContent = "Storage: Warning - Invalid saved state recovered to safe default";
            }
        } else {
            shopState = getFreshState();
            document.getElementById("storageStatus").textContent = "Storage: Fresh state ready";
        }
    } catch (e) {
        console.error("Error parsing JSON storage, using fresh safe state.", e);
        shopState = getFreshState();
        document.getElementById("storageStatus").textContent = "Storage: Recovered from unreadable JSON";
    }
}

function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shopState));
        document.getElementById("storageStatus").textContent = "Storage: Synchronized with localStorage";
    } catch (e) {
        console.error("Error saving to storage.", e);
        document.getElementById("storageStatus").textContent = "Storage: Not saved due to write error";
    }
}

function resetShop() {
    if (confirm("Are you sure you want to reset this shop to fresh state?")) {
        try {
            localStorage.removeItem(STORAGE_KEY);
            shopState = getFreshState();
            render();
            showMessage("Shop has been reset to fresh state.", "success");
            document.getElementById("storageStatus").textContent = "Storage: Reset successful";
        } catch (e) {
            showMessage("Error: Failed to reset shop key.", "error");
        }
    }
}

function parseValidQuantity(rawVal) {
    if (rawVal === "" || rawVal === null) return null;
    const num = Number(rawVal);
    if (!Number.isInteger(num) || num < 1 || num > 1000) {
        return null;
    }
    return num;
}

function selectProduct(productKey) {
    if (shopState.products[productKey]) {
        shopState.selected = productKey;
        render();
    }
}

function executeOperation() {
    const operationType = document.getElementById("operationSelect").value;
    const qtyInput = document.getElementById("quantityInput");
    const rawVal = qtyInput.value;

    const qty = parseValidQuantity(rawVal);
    if (qty === null) {
        qtyInput.setAttribute("aria-invalid", "true");
        showMessage("Error: Please enter a valid integer between 1 and 1000.", "error");
        return;
    }

    qtyInput.setAttribute("aria-invalid", "false");
    const p = shopState.products[shopState.selected];
    let success = false;
    let refusalReason = "";

    if (operationType === 'sell') {
        if (p.stock >= qty) {
            p.stock -= qty;
            p.netSold += qty;
            p.totalOutput = p.netSold * p.factor;
            p.inventoryTotal = p.stock * p.factor;
            success = true;
        } else {
            refusalReason = "Refused: Insufficient stock!";
        }
    } else if (operationType === 'restock') {
        if (p.stock + qty <= 10000) {
            p.stock += qty;
            p.restockedCount += qty;
            p.inventoryTotal = p.stock * p.factor;
            success = true;
        } else {
            refusalReason = "Refused: Exceeds 10,000 maximum stock capacity!";
        }
    } else if (operationType === 'return') {
        if (qty > p.netSold) {
            refusalReason = "Refused: Cannot return more than net sold units!";
        } else if (p.stock + qty > 10000) {
            refusalReason = "Refused: Return would push stock above 10,000 maximum capacity!";
        } else {
            p.stock += qty;
            p.netSold -= qty;
            p.returnedCount = (p.returnedCount || 0) + qty;
            p.totalOutput = p.netSold * p.factor;
            p.inventoryTotal = p.stock * p.factor;
            success = true;
        }
    }

    if (success) {
        shopState.history.unshift({
            product: p.name,
            action: operationType.toUpperCase(),
            qty: qty,
            newStock: p.stock
        });
        saveToStorage();
        render();
        qtyInput.value = "";
        showMessage("Success: " + operationType.toUpperCase() + " " + qty + " for " + p.name + ".", "success");
    } else {
        showMessage(refusalReason, "error");
    }
}

function showMessage(text, type) {
    const box = document.getElementById("messageBox");
    box.textContent = text;
    box.className = "message-box " + type;
}

function render() {
    const nb = shopState.products.notebook;
    const er = shopState.products.eraser;

    document.getElementById("card-notebook-info").textContent = "Stock: " + nb.stock + " | Factor: " + nb.factor;
    document.getElementById("card-eraser-info").textContent = "Stock: " + er.stock + " | Factor: " + er.factor;

    const isNotebook = shopState.selected === 'notebook';
    document.getElementById("card-notebook").setAttribute("aria-pressed", isNotebook ? "true" : "false");
    document.getElementById("card-eraser").setAttribute("aria-pressed", !isNotebook ? "true" : "false");

    const summaryBox = document.getElementById("summaryBox");
    summaryBox.innerHTML = 
        "<strong>Shop Summary Report:</strong><br>" +
        "- <strong>Notebook:</strong> Stock: " + nb.stock + " | Net Sold: " + nb.netSold + " | Total Output: " + nb.totalOutput + " | Inventory Total: " + nb.inventoryTotal + "<br>" +
        "- <strong>Eraser:</strong> Stock: " + er.stock + " | Net Sold: " + er.netSold + " | Total Output: " + er.totalOutput + " | Inventory Total: " + er.inventoryTotal;

    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    shopState.history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = "[" + item.product + "] Action: " + item.action + " | Qty: " + item.qty + " | New Stock: " + item.newStock;
        historyList.appendChild(li);
    });
}

document.getElementById("submitBtn").addEventListener("click", executeOperation);
document.getElementById("resetBtn").addEventListener("click", resetShop);

window.onload = function() {
    loadFromStorage();
    render();
};
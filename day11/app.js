const products = {
    notebook: { name: "Notebook", stock: 5, netSold: 0, restockedTotal: 0, returnedTotal: 0 },
    eraser: { name: "Eraser", stock: 3, netSold: 0, restockedTotal: 0, returnedTotal: 0 }
};

let historyLog = [];
function isValidQuantity(qty) {
    return Number.isInteger(qty) && qty >= 1 && qty <= 1000;
}

function updateUI() {
    const selectedKey = document.getElementById("productSelect").value;
    const p = products[selectedKey];

    document.getElementById("currentStock").innerText = p.stock;
    document.getElementById("currentNetSold").innerText = p.netSold;
    document.getElementById("currentReturned").innerText = p.returnedTotal;

    const historyBox = document.getElementById("historyBox");
    if (historyLog.length === 0) {
        historyBox.innerHTML = "No transactions recorded yet.";
    } else {
        historyBox.innerHTML = historyLog.map(h => 
            `<div class="history-item">
                <strong>[${h.product}]</strong> - Action: <span>${h.action.toUpperCase()}</span> (Qty: ${h.qty}) | 
                Stock: ${h.beforeStock} ➔ ${h.afterStock}
            </div>`
        ).join('');
    }
}
document.getElementById("executeBtn").addEventListener("click", function() {
    const selectedKey = document.getElementById("productSelect").value;
    const action = document.getElementById("actionType").value;
    const qtyInput = document.getElementById("quantityInput");
    const errorMsg = document.getElementById("errorMsg");
    
    const qty = parseInt(qtyInput.value);
    if (!isValidQuantity(qty)) {
        qtyInput.setAttribute("aria-invalid", "true");
        errorMsg.innerText = "Error: Please enter a valid integer between 1 and 1000.";
        return;
    }

    const p = products[selectedKey];
    const beforeStock = p.stock;
    let success = false;

    if (action === "sell") {
        if (qty <= p.stock) {
            p.stock -= qty;
            p.netSold += qty;
            success = true;
        }
    } else if (action === "restock") {
        if (p.stock + qty <= 10000) { 
            p.stock += qty;
            p.restockedTotal += qty;
            success = true;
        }
    } else if (action === "return") {
        if (qty <= p.netSold) {
            p.stock += qty;
            p.netSold -= qty;
            p.returnedTotal += qty;
            success = true;
        }
    }

    if (success) {
        qtyInput.setAttribute("aria-invalid", "false");
        errorMsg.innerText = "";
        historyLog.push({
            product: p.name,
            action: action,
            qty: qty,
            beforeStock: beforeStock,
            afterStock: p.stock
        });

        updateUI();
        qtyInput.value = ""; 
    } else {
        qtyInput.setAttribute("aria-invalid", "true");
        errorMsg.innerText = "Action Refused: Violates stock limits or return rules.";
    }
});
document.getElementById("productSelect").addEventListener("change", updateUI);
updateUI();


const STORAGE_KEY = "dareen-shop-day17-v1";
const LOW_STOCK_THRESHOLD = 2; // الحد المعتمد للمخزون المنخفض (0, 1, 2)

let currentFilter = "all"; // الفلتر الافتراضي عند التحميل أو إعادة التعيين

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
let isRecoveryNeeded = false;

function validateState(candidate) {
    if (!candidate || typeof candidate !== "object") return false;
    if (!candidate.products || typeof candidate.products !== "object") return false;
    if (!Array.isArray(candidate.history)) return false;

    for (const entry of candidate.history) {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
        if (!entry.product || !entry.action || typeof entry.qty !== "number" || typeof entry.newStock !== "number") return false;
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
        if (saved !== null) {
            const parsed = JSON.parse(saved);
            if (validateState(parsed)) {
                shopState = parsed;
                isRecoveryNeeded = false;
                document.getElementById("storageStatus").textContent = "Storage: Validated & Loaded successfully";
            } else {
                isRecoveryNeeded = true;
                shopState = getFreshState();
                document.getElementById("storageStatus").textContent = "Storage: Saved data could not be used; recovery required";
            }
        } else {
            shopState = getFreshState();
            isRecoveryNeeded = false;
            document.getElementById("storageStatus").textContent = "Storage: Fresh state ready";
        }
    } catch (e) {
        isRecoveryNeeded = true;
        shopState = getFreshState();
        document.getElementById("storageStatus").textContent = "Storage: Recovered from unreadable JSON";
    }
}

function saveToStorage() {
    if (isRecoveryNeeded) {
        document.getElementById("storageStatus").textContent = "Storage: Not saved; recovery required";
        return;
    }
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shopState));
        document.getElementById("storageStatus").textContent = "Storage: Synchronized with localStorage";
    } catch (e) {
        document.getElementById("storageStatus").textContent = "Storage: Not saved due to write error";
    }
}

function resetShop() {
    if (confirm("Are you sure you want to reset this shop to fresh state?")) {
        try {
            localStorage.removeItem(STORAGE_KEY);
            isRecoveryNeeded = false;
            shopState = getFreshState();
            currentFilter = "all"; // إعادة الفلتر إلى All عند إعادة التعيين
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
    if (!Number.isInteger(num) || num < 1 || num > 1000) return null;
    return num;
}

function selectProduct(productKey) {
    if (shopState.products[productKey]) {
        shopState.selected = productKey;
        render();
    }
}

function setFilter(filterType) {
    currentFilter = filterType;
    render();
}

function executeOperation() {
    if (isRecoveryNeeded) {
        showMessage("Error: Saved data could not be used; recovery required. Please reset first.", "error");
        return;
    }

    const operationType = document.getElementById("operationSelect").value;
    const qtyInput = document.getElementById("quantityInput");
    const qty = parseValidQuantity(qtyInput.value);

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

function getStockStatusText(stock) {
    if (stock === 0) return "Out of stock";
    if (stock <= LOW_STOCK_THRESHOLD) return "Low stock";
    return "In stock";
}

function render() {
    const nb = shopState.products.notebook;
    const er = shopState.products.eraser;

    // حساب إحصائيات لوحة التحكم الخاصة بالمتجر بأكمله
    const totalProducts = 2;
    const totalUnits = nb.stock + er.stock;
    let lowStockCount = 0;
    if (nb.stock <= LOW_STOCK_THRESHOLD) lowStockCount++;
    if (er.stock <= LOW_STOCK_THRESHOLD) lowStockCount++;

    document.getElementById("statTotalProducts").textContent = totalProducts;
    document.getElementById("statTotalUnits").textContent = totalUnits;
    document.getElementById("statLowStockCount").textContent = lowStockCount;

    // تحديث الشارات النصية للمنتجات
    document.getElementById("card-notebook-info").textContent = "Stock: " + nb.stock + " | Factor: " + nb.factor;
    document.getElementById("badge-notebook").textContent = getStockStatusText(nb.stock);

    document.getElementById("card-eraser-info").textContent = "Stock: " + er.stock + " | Factor: " + er.factor;
    document.getElementById("badge-eraser").textContent = getStockStatusText(er.stock);

    // تطبيق الفلتر على البطاقات المرئية فقط
    const nbCard = document.getElementById("card-notebook");
    const erCard = document.getElementById("card-eraser");
    const filterNotice = document.getElementById("filterNotice");

    const nbIsLow = nb.stock <= LOW_STOCK_THRESHOLD;
    const erIsLow = er.stock <= LOW_STOCK_THRESHOLD;

    if (currentFilter === "low") {
        document.getElementById("filterAllBtn").classList.remove("active");
        document.getElementById("filterLowBtn").classList.add("active");

        nbCard.style.display = nbIsLow ? "block" : "none";
        erCard.style.display = erIsLow ? "block" : "none";

        if (lowStockCount === 0) {
            filterNotice.style.display = "block";
            filterNotice.textContent = "No products are low on stock";
        } else {
            filterNotice.style.display = "none";
        }
    } else {
        document.getElementById("filterAllBtn").classList.add("active");
        document.getElementById("filterLowBtn").classList.remove("active");

        nbCard.style.display = "block";
        erCard.style.display = "block";
        filterNotice.style.display = "none";
    }

    // تحديد حالة الـ aria-pressed والمنتج المحدد
    const isNotebook = shopState.selected === 'notebook';
    nbCard.setAttribute("aria-pressed", isNotebook ? "true" : "false");
    erCard.setAttribute("aria-pressed", !isNotebook ? "true" : "false");

    const selectedProdObj = shopState.products[shopState.selected];
    const isSelectedHidden = (currentFilter === "low" && selectedProdObj.stock > LOW_STOCK_THRESHOLD);
    
    const indicator = document.getElementById("selectedProductIndicator");
    if (isSelectedHidden) {
        indicator.textContent = "Selected product: " + selectedProdObj.name + " (Hidden by this filter, but operations still apply)";
    } else {
        indicator.textContent = "Selected product: " + selectedProdObj.name;
    }

    // تقرير الملخص
    const summaryBox = document.getElementById("summaryBox");
    summaryBox.innerHTML = 
        "<strong>Shop Summary Report:</strong><br>" +
        "- <strong>Notebook:</strong> Stock: " + nb.stock + " | Net Sold: " + nb.netSold + " | Total Output: " + nb.totalOutput + " | Inventory Total: " + nb.inventoryTotal + "<br>" +
        "- <strong>Eraser:</strong> Stock: " + er.stock + " | Net Sold: " + er.netSold + " | Total Output: " + er.totalOutput + " | Inventory Total: " + er.inventoryTotal;

    // الأرشيف
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

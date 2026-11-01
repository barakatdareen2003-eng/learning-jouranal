document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("productSelect");
    const quantityInput = document.getElementById("quantityInput");
    const messageBox = document.getElementById("messageBox");

    let data = {
        Notebook: { stock: 5, sold: 0, sales: 0, restocked: 0, inventory: 30 },
        Eraser: { stock: 3, sold: 0, sales: 0, restocked: 0, inventory: 6 }
    };

    function updateUI() {
       
        document.getElementById("stock-Notebook").textContent = data.Notebook.stock;
        document.getElementById("sold-Notebook").textContent = data.Notebook.sold;
        document.getElementById("sales-Notebook").textContent = data.Notebook.sales;
        document.getElementById("restocked-Notebook").textContent = data.Notebook.restocked;
        document.getElementById("inventory-Notebook").textContent = data.Notebook.inventory;

        document.getElementById("stock-Eraser").textContent = data.Eraser.stock;
        document.getElementById("sold-Eraser").textContent = data.Eraser.sold;
        document.getElementById("sales-Eraser").textContent = data.Eraser.sales;
        document.getElementById("restocked-Eraser").textContent = data.Eraser.restocked;
        document.getElementById("inventory-Eraser").textContent = data.Eraser.inventory;
    }

    function showMessage(text, isError = false) {
        messageBox.textContent = text;
        messageBox.className = "message-box " + (isError ? "error" : "success");
        messageBox.style.display = "block";
    }


    document.getElementById("sellBtn").addEventListener("click", () => {
        let qty = Number(quantityInput.value);
        let prodName = productSelect.value;

        if (isNaN(qty) || qty < 1 || qty > 1000) {
            showMessage("Quantity must be between 1 and 1000.", true);
            return;
        }

        if (qty > data[prodName].stock) {
            showMessage("Not enough stock available.", true);
            return;
        }

        data[prodName].stock -= qty;
        data[prodName].sold += qty;
        data[prodName].sales += qty;
        data[prodName].inventory = data[prodName].stock * (prodName === "Notebook" ? 6 : 2);

        updateUI();
        showMessage("Sale processed successfully.", false);
    });

    document.getElementById("restockBtn").addEventListener("click", () => {
        let qty = Number(quantityInput.value);
        let prodName = productSelect.value;

        if (isNaN(qty) || qty < 1 || qty > 1000) {
            showMessage("Quantity must be between 1 and 1000.", true);
            return;
        }

        data[prodName].stock += qty;
        data[prodName].restocked += qty;
        data[prodName].inventory = data[prodName].stock * (prodName === "Notebook" ? 6 : 2);

        updateUI();
        showMessage("Restock processed successfully.", false);
    });

    document.getElementById("returnBtn").addEventListener("click", () => {
        let qty = Number(quantityInput.value);
        let prodName = productSelect.value;

        if (isNaN(qty) || qty < 1 || qty > 1000) {
            showMessage("Quantity must be between 1 and 1000.", true);
            return;
        }

        if (qty > data[prodName].sold) {
            showMessage("Cannot return more than sold amount.", true);
            return;
        }

        data[prodName].stock += qty;
        data[prodName].sold -= qty;
        data[prodName].sales -= qty;
        data[prodName].inventory = data[prodName].stock * (prodName === "Notebook" ? 6 : 2);

        updateUI();
        showMessage("Return processed successfully.", false);
    });

    updateUI();
});

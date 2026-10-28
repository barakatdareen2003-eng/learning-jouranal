// Data state for products
const products = {
  Notebook: {
    name: "Notebook",
    price: 6,
    openingStock: 5,
    stock: 5,
    netSold: 0,
    netSales: 0,
    restockedUnits: 0
  },
  Eraser: {
    name: "Eraser",
    price: 2,
    openingStock: 3,
    stock: 3,
    netSold: 0,
    netSales: 0,
    restockedUnits: 0
  }
};

// DOM Elements
const productSelect = document.getElementById("product-select");
const quantityInput = document.getElementById("quantity-input");
const sellBtn = document.getElementById("sell-btn");
const restockBtn = document.getElementById("restock-btn");
const returnBtn = document.getElementById("return-btn");
const resultBox = document.getElementById("result");
const inventoryTbody = document.getElementById("inventory-tbody");

// Render table function
function renderTable() {
  inventoryTbody.innerHTML = "";
  
  for (let key in products) {
    const p = products[key];
    const inventoryValue = p.stock * p.price;
    
    const row = document.createElement("tr");
    row.innerHTML = 
      "<td>" + p.name + "</td>" +
      "<td>" + p.price + "</td>" +
      "<td>" + p.stock + "</td>" +
      "<td>" + p.netSold + "</td>" +
      "<td>" + p.netSales + "</td>" +
      "<td>" + p.restockedUnits + "</td>" +
      "<td>" + inventoryValue + "</td>";
    inventoryTbody.appendChild(row);
  }
}

// Initial render
renderTable();

// Helper to show message
function showMessage(text, type) {
  resultBox.textContent = text;
  resultBox.className = "message-box " + (type || "");
}

// Sell operation
sellBtn.addEventListener("click", function() {
  const productName = productSelect.value;
  const product = products[productName];
  const qty = Number(quantityInput.value);

  if (!quantityInput.value.trim() || !Number.isInteger(qty) || qty <= 0) {
    showMessage("Please enter a valid positive whole number for quantity.", "error");
    return;
  }

  if (qty > product.stock) {
    showMessage("Refused: Not enough stock to sell " + qty + " " + productName + "(s). Current stock is " + product.stock + ".", "error");
    return;
  }

  // Execute sale
  product.stock -= qty;
  product.netSold += qty;
  product.netSales = product.netSold * product.price;

  renderTable();
  showMessage("Success: Sold " + qty + " " + productName + "(s).", "success");
});

// Restock operation
restockBtn.addEventListener("click", function() {
  const productName = productSelect.value;
  const product = products[productName];
  const qty = Number(quantityInput.value);

  if (!quantityInput.value.trim() || !Number.isInteger(qty) || qty <= 0) {
    showMessage("Please enter a valid positive whole number for quantity.", "error");
    return;
  }

  product.stock += qty;
  product.restockedUnits += qty;

  renderTable();
  showMessage("Success: Restocked " + qty + " " + productName + "(s).", "success");
});

// Return operation
returnBtn.addEventListener("click", function() {
  const productName = productSelect.value;
  const product = products[productName];
  const qty = Number(quantityInput.value);

  if (!quantityInput.value.trim() || !Number.isInteger(qty) || qty <= 0) {
    showMessage("Please enter a valid positive whole number for quantity.", "error");
    return;
  }

  if (qty > product.netSold) {
    showMessage("Refused: Cannot return " + qty + " " + productName + "(s). Net sold is only " + product.netSold + ".", "error");
    return;
  }
  // Execute return
  product.stock += qty;
  product.netSold -= qty;
  product.netSales = product.netSold * product.price;

  renderTable();
  showMessage("Success: Returned " + qty + " " + productName + "(s).", "success");
});

const API_URL = "https://localhost:7233/api/Products";
const $ = id => document.getElementById(id);

const productContainer = $("products");
const searchNameInput = $("searchName");
const searchPriceInput = $("searchPrice");

let products = [];
let originalProduct = null;

// Helper functions
const getFormData = () => ({
  id: parseInt($("prodId").value),
  name: $("prodName").value,
  description: $("prodDesc").value || "no description",
  price: parseFloat($("prodPrice").value),
  sku: $("prodSku").value || `SKU-${$("prodId").value}`,
  isAvailable: $("prodAvailable").checked,
  categoryId: parseInt($("prodCategory").value) || null
});

const setFormData = p => {
  $("prodName").value = p.name || p.Name || "";
  $("prodDesc").value = p.description || p.Description || "";
  $("prodPrice").value = p.price ?? p.Price ?? 0;
  $("prodSku").value = p.sku || "";
  $("prodAvailable").checked = p.isAvailable ?? true;
  $("prodCategory").value = p.categoryId ?? 0;
};

const normalizeProduct = p => ({
  id: p.id,
  sku: p.sku || `SKU-${p.id}`,
  name: p.name || p.Name || "Unnamed",
  description: p.description || p.Description || "No description",
  price: p.price ?? p.Price ?? 0,
  isAvailable: p.isAvailable ?? true,
  categoryId: p.categoryId ?? 0
});

async function fetchProducts() {
  productContainer.innerHTML = "Loading products...";
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API not reachable");
    const data = await res.json();
    products = (data.value || data).map(normalizeProduct);
    displayProducts(products);
  } catch (error) {
    productContainer.innerHTML = `<p style="color:red;">Cannot connect to API</p>`;
    console.error(error);
  }
}

async function getProductById() {
  const id = $("prodId").value;
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(await res.text());
    const p = await res.json();
    setFormData(p);
    originalProduct = normalizeProduct(p);
    displayProducts([normalizeProduct(p)]);
  } catch (err) {
    alert("Error fetching product: " + err.message);
    console.error(err);
  }
}

async function deleteProduct() {
  const id = $("prodId").value;
  try {
    let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      res = await fetch(`${API_URL}/Delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(id) })
      });
    }
    fetchProducts();
  } catch (err) {
    console.error(err);
  }
}

async function updateProduct() {
  if (!originalProduct) {
    alert("Please click 'Get by ID' first to load the product");
    return;
  }

  const product = getFormData();
  if (!product.name) {
    alert("Name field is required");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (!res.ok) throw new Error(await res.text());

    alert("Product updated successfully!");
    originalProduct = null;
    fetchProducts();
  } catch (err) {
    alert("Error updating product: " + err.message);
    console.error(err);
  }
}

async function createProduct() {
  const { id, name, price } = getFormData();

  if (!id || !name || !price) {
    alert("Please fill in ID, Name, and Price fields");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getFormData())
    });

    if (!res.ok) throw new Error(await res.text());

    alert("Product created successfully!");
    fetchProducts();
  } catch (err) {
    alert("Error creating product: " + err.message);
    console.error(err);
  }
}

function displayProducts(items) {
  if (!items || items.length === 0) {
    productContainer.innerHTML = "No products found.";
    return;
  }

  productContainer.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>ID: ${product.id}</strong>
      <p>SKU: ${product.sku}</p>
      <h3>${product.name}</h3>
      <p>Category: ${product.categoryId}</p>
      <p>${product.description}</p>
      <p>Available: ${product.isAvailable}</p>
      <strong>$${product.price}</strong>
    `;
    productContainer.appendChild(card);
  });
}

function applyFilters() {
  const nameFilter = searchNameInput.value.toLowerCase();
  const priceFilter = searchPriceInput.value;

  const filtered = products.filter(p => {
    const matchName = !nameFilter || p.name.toLowerCase().includes(nameFilter);
    const matchPrice = !priceFilter || p.price.toString().includes(priceFilter);
    return matchName && matchPrice;
  });

  displayProducts(filtered);
}

searchNameInput.addEventListener("input", applyFilters);
searchPriceInput.addEventListener("input", applyFilters);

fetchProducts();

---------- Forwarded message ---------
From: Umana Medara-abasi <medaraabasi10904@bazeuniversity.edu.ng>
Date: Thu, 2 Apr 2026, 22:08
Subject: Fwd: assignment
To: Agu Munachisom <munachisom11345@bazeuniversity.edu.ng>




---------- Forwarded message ---------
From: Umana Medara-abasi <medaraabasi10904@bazeuniversity.edu.ng>
Date: Thu, Apr 2, 2026 at 3:05 PM
Subject: Fwd: assignment
To: <smosisuga@gmail.com>


const API_URL = "https://localhost:7233/api/Products";
const $ = id => document.getElementById(id);

const productContainer = $("products");
const searchNameInput = $("searchName");
const searchPriceInput = $("searchPrice");

let products = [];
let originalProduct = null;

// Helper functions
const getFormData = () => ({
  id: parseInt($("prodId").value),
  name: $("prodName").value,
  description: $("prodDesc").value || "no description",
  price: parseFloat($("prodPrice").value),
  sku: $("prodSku").value || `SKU-${$("prodId").value}`,
  isAvailable: $("prodAvailable").checked,
  categoryId: parseInt($("prodCategory").value) || null
});

const setFormData = p => {
  $("prodName").value = p.name || p.Name || "";
  $("prodDesc").value = p.description || p.Description || "";
  $("prodPrice").value = p.price ?? p.Price ?? 0;
  $("prodSku").value = p.sku || "";
  $("prodAvailable").checked = p.isAvailable ?? true;
  $("prodCategory").value = p.categoryId ?? 0;
};

const normalizeProduct = p => ({
  id: p.id,
  sku: p.sku || `SKU-${p.id}`,
  name: p.name || p.Name || "Unnamed",
  description: p.description || p.Description || "No description",
  price: p.price ?? p.Price ?? 0,
  isAvailable: p.isAvailable ?? true,
  categoryId: p.categoryId ?? 0
});

async function fetchProducts() {
  productContainer.innerHTML = "Loading products...";
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API not reachable");
    const data = await res.json();
    products = (data.value || data).map(normalizeProduct);
    displayProducts(products);
  } catch (error) {
    productContainer.innerHTML = `<p style="color:red;">Cannot connect to API</p>`;
    console.error(error);
  }
}

async function getProductById() {
  const id = $("prodId").value;
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(await res.text());
    const p = await res.json();
    setFormData(p);
    originalProduct = normalizeProduct(p);
    displayProducts([normalizeProduct(p)]);
  } catch (err) {
    alert("Error fetching product: " + err.message);
    console.error(err);
  }
}

async function deleteProduct() {
  const id = $("prodId").value;
  try {
    let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      res = await fetch(`${API_URL}/Delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(id) })
      });
    }
    fetchProducts();
  } catch (err) {
    console.error(err);
  }
}

async function updateProduct() {
  if (!originalProduct) {
    alert("Please click 'Get by ID' first to load the product");
    return;
  }

  const product = getFormData();
  if (!product.name) {
    alert("Name field is required");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (!res.ok) throw new Error(await res.text());

    alert("Product updated successfully!");
    originalProduct = null;
    fetchProducts();
  } catch (err) {
    alert("Error updating product: " + err.message);
    console.error(err);
  }
}

async function createProduct() {
  const { id, name, price } = getFormData();

  if (!id || !name || !price) {
    alert("Please fill in ID, Name, and Price fields");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getFormData())
    });

    if (!res.ok) throw new Error(await res.text());

    alert("Product created successfully!");
    fetchProducts();
  } catch (err) {
    alert("Error creating product: " + err.message);
    console.error(err);
  }
}

function displayProducts(items) {
  if (!items || items.length === 0) {
    productContainer.innerHTML = "No products found.";
    return;
  }

  productContainer.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>ID: ${product.id}</strong>
      <p>SKU: ${product.sku}</p>
      <h3>${product.name}</h3>
      <p>Category: ${product.categoryId}</p>
      <p>${product.description}</p>
      <p>Available: ${product.isAvailable}</p>
      <strong>$${product.price}</strong>
    `;
    productContainer.appendChild(card);
  });
}

function applyFilters() {
  const nameFilter = searchNameInput.value.toLowerCase();
  const priceFilter = searchPriceInput.value;

  const filtered = products.filter(p => {
    const matchName = !nameFilter || p.name.toLowerCase().includes(nameFilter);
    const matchPrice = !priceFilter || p.price.toString().includes(priceFilter);
    return matchName && matchPrice;
  });

  displayProducts(filtered);
}

searchNameInput.addEventListener("input", applyFilters);
searchPriceInput.addEventListener("input", applyFilters);

fetchProducts();
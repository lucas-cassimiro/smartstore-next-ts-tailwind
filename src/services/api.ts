export async function getProducts() {
  const request = await fetch(
    "https://smartshop-api-foy4.onrender.com/products"
  );
  return await request.json();
}

export async function getStocks() {
  const request = await fetch("https://smartshop-api-foy4.onrender.com/stocks");
  return await request.json();
}

export async function getOrders() {
  const request = await fetch("https://smartshop-api-foy4.onrender.com/orders");
  return await request.json();
}

export async function getColors() {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/colors`
  );

  const data = await response.json();
  return data;
}

export async function getStorages() {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/storages`
  );

  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/categories`
  );

  const data = await response.json();
  return data;
}

export async function getBlackfridayProducts() {
  const response = await fetch(
    "https://smartshop-api-foy4.onrender.com/products/blackfriday"
  );
  return await response.json();
}

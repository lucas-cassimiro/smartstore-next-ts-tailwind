export async function getProducts() {
  const request = await fetch("http://localhost:3333/products");
  return await request.json();
}

export async function getStocks() {
  const request = await fetch("http://localhost:3333/stocks");
  return await request.json();
}

export async function getOrders() {
  const request = await fetch("http://localhost:3333/orders");
  return await request.json();
}

export async function getColors() {
  const response = await fetch(`http://localhost:3333/colors`);

  const data = await response.json();
  return data;
}

export async function getStorages() {
  const response = await fetch(`http://localhost:3333/storages`);

  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch(`http://localhost:3333/categories`);

  const data = await response.json();
  return data;
}

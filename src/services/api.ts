export async function getProducts() {
  const response = await fetch(
    "https://smartshop-api-foy4.onrender.com/products"
  );
  return await response.json();
}

export async function getStocks() {
  const response = await fetch(
    "https://smartshop-api-foy4.onrender.com/stocks"
  );
  return await response.json();
}

export async function getOrders() {
  const response = await fetch(
    "https://smartshop-api-foy4.onrender.com/orders"
  );
  return await response.json();
}

export async function getColors() {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/colors`
  );

  return await response.json();
}

export async function getStorages() {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/storages`
  );

  return await response.json();
}

export async function getCategories() {
  const response = await fetch(
    `https://smartshop-api-foy4.onrender.com/categories`
  );

  return await response.json();
}

export async function getBlackfridayProducts() {
  const response = await fetch(
    "https://smartshop-api-foy4.onrender.com/products/blackfriday"
  );
  return await response.json();
}

export async function getBlackFridayOfferProducts() {
  const response = await fetch(
    "https://smartshop-api-foy4.onrender.com/blackfriday"
  );
  return await response.json();
}

export async function getNewsProducts() {
  const response = await fetch("https://smartshop-api-foy4.onrender.com/news/");
  return await response.json();
}

export async function getAddress(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return await response.json();
}
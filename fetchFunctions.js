import { renderProducts } from "./renderProducts.js";

export function getFakeStore() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fel vid hämtning av produkter");
      }
      return res.json();
    })
    .then((data) => renderProducts(data))
    .catch(() => {
      document.getElementById("addElementsHere").innerHTML = `
        <div class="alert alert-danger" role="alert">
          Kunde inte hämta produkter.
        </div>
      `;
    });
}

export function getAllCategories() {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((categories) => {
      const categoryList = document.getElementById("CategoryList");
      categoryList.innerHTML = "";
      categories.forEach((category) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.className = "dropdown-item";
        link.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        link.addEventListener("click", () => getByCategory(category));
        item.appendChild(link);
        categoryList.appendChild(item);
      });
    });
}

export function getByCategory(category) {
  fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fel vid hämtning av kategori");
      }
      return res.json();
    })
    .then((data) => renderProducts(data))
    .catch(() => {
      document.getElementById("addElementsHere").innerHTML = `
        <div class="alert alert-danger" role="alert">
          Kunde inte hämta produkter för vald kategori.
        </div>
      `;
    });
}

export function fetchProductData(productId) {
  // elementet där vi visar information om produkten som ska köpas
  const itemToPurchaseField = document.getElementById("itemToPurchase");
  // sätt initialt värde att tjänsten tänker.
  itemToPurchaseField.innerHTML =
    "<div class='alert alert-warning' role='alert'>Thinking...</div>";

  // returnera produkt eller felmeddelande
  return fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      itemToPurchaseField.innerHTML = `
  <div class="d-flex align-items-start gap-3 border rounded p-3 bg-light">
    <div class="flex-shrink-0">
      <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="rounded border object-fit-contain bg-white"
        style="width: 90px; height: 90px;"
      >
    </div>

    <div class="flex-grow-1">
      <h5 class="mb-1">${product.title}</h5>
      <p class="mb-2 fw-semibold text-primary">${product.price} USD</p>
      <p class="mb-0 text-muted small">
        ${product.description}
      </p>
    </div>
  </div>
`;
    })
    .catch((error) => {
      itemToPurchaseField.innerHTML =
        "<div class='alert alert-danger' role='alert'>Kunde inte hämta produktdata.</div>";
    });
}

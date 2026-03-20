export function renderProducts(products) {
  const container = document.getElementById("addElementsHere");

  container.innerHTML = products
    .map(
      (item) => `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div class="shop-card shadow-sm border rounded p-3">
            <img
              src="${item.image}"
              alt="${item.title}"
              class="shop-card__image"
            />

            <div class="shop-card__content">
              <h2 class="shop-card__title">${item.title}</h2>

              <p class="shop-card__text text-muted small mb-0">
                ${item.description ?? ""}
              </p>
            </div>

            <p class="shop-card__price mb-2 pt-2">
              $${item.price.toFixed(2)}
            </p>

            <button
              class="btn btn-primary button-buy"
              data-id="${item.id}"
            >
              Buy Now
            </button>
          </div>
        </div>
      `
    )
    .join("");
}
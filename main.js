import { renderProducts } from "./renderProducts.js";

let orderModal;
let fields = [];

function getFakeStore() {
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

function getAllCategories() {
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

function getByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
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


// Nedan är all for modal-relaterad kod, som är fristående från resten av sidan, och endast används i modalen som öppnas


//Väntar tills order-modal är skapat innan den försöker göra functionerna nedan.
customElements.whenDefined("order-modal").then(() => {
  
orderModal = document.querySelector("order-modal");
// vårat orderformulär i modalen
const orderForm = orderModal.querySelector("#orderForm");

// alla fält i orderformuläret som vi vill validera
fields = orderModal.querySelectorAll(".form-control");

// validera enskilt fält
function validateField(field) {
  if (field.checkValidity()) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
  }
}

// skapa eventlisteners för varje fält från orderformuläret
fields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
});


});

function manuallyValidateForm() {
  let formIsValid = true;
  fields.forEach((field) => {
    if (!field.checkValidity()) {
      formIsValid = false;
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
    } else {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    }
  });
  return formIsValid;
}

function submitOrder(e) {
  e.preventDefault();
  const modalForm = orderModal.querySelector("#orderFormModal");
  const orderFormModal = bootstrap.Modal.getInstance(modalForm);

  // validera hela formuläret manuellt, och om det är giltigt, visa bekräftelsemodalen med en bekräftelsemeddelande som innehåller kundens email. Stäng sedan bekräftelsemodalen efter 3 sekunder.
  if (manuallyValidateForm()) {
    console.log("Successfully submitted order data to server");
    orderFormModal.hide();

    const checkoutOrderModal = document.getElementById("orderConfirmationModal")
    const orderConfirmationModal = bootstrap.Modal.getOrCreateInstance(checkoutOrderModal);
    const orderConfirmationMessage = document.getElementById(
    "orderConfirmationMessage",
  );
  const email = document.querySelector('input[type="email"]').value;
    orderConfirmationMessage.innerHTML = `
  <div class="text-center py-3">
    <h4 class="mb-3">Tack för din beställning!</h4>
    <p class="mb-2">Vi har tagit emot din order och börjat behandla den.</p>
    <p class="mb-0 text-muted">En orderbekräftelse har skickats till <strong>${email}</strong>.</p>
  </div>
`;
    orderConfirmationModal.show();
    setTimeout(() => {
      orderConfirmationModal.hide();
    }, 3000);
  }
}



function fetchProductData(productId) {
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



function goHome() {
  document.getElementById("addElementsHere").innerHTML = "";
  getFakeStore();
}

function init() {
  getFakeStore();
  getAllCategories();

  const homeBtn = document.getElementById("home-btn");
  if (homeBtn) {
    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goHome();
    });
  }

  const storeBtn = document.getElementById("store-btn");
  if (storeBtn) {
    storeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goHome();
    });
  }
}


document.addEventListener("DOMContentLoaded", init);

document.addEventListener("click", (e) => {
 if (e.target.matches(".btn-primary")){
    const id = e.target.dataset.id;
    fetchProductData(id);

    const modal = new bootstrap.Modal(document.getElementById("orderFormModal"));
    modal.show();
  }
});
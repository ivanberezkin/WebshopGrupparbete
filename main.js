import {
  getFakeStore,
  getAllCategories,
  fetchProductData,
} from "./fetchFunctions.js";

let orderModal;
let fields = [];

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

  if (orderForm) {
    orderForm.addEventListener("submit", submitOrder);
  }
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
    const email = orderModal.querySelector('input[type="email"]').value;
    console.log("Successfully submitted order data to server");
    orderFormModal.hide();
    //Tar bort text från form
    if (orderForm) {
      orderForm.reset();
    }
    //Tar bort highlight på korrekt/inkorrekt
    fields.forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });

    const checkoutOrderModal = document.getElementById(
      "orderConfirmationModal",
    );
    const orderConfirmationModal =
      bootstrap.Modal.getOrCreateInstance(checkoutOrderModal);
    const orderConfirmationMessage = document.getElementById(
      "orderConfirmationMessage",
    );

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

function goHome() {
  document.getElementById("addElementsHere").innerHTML = "";
  getFakeStore();
}

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
function init() {
  getFakeStore();
  getAllCategories();
}

document.addEventListener("DOMContentLoaded", init);

document.addEventListener("click", (e) => {
  if (e.target.matches(".button-buy")) {
    const id = e.target.dataset.id;
    fetchProductData(id);

    const modal = new bootstrap.Modal(
      document.getElementById("orderFormModal"),
    );

    modal.show();
  }
});

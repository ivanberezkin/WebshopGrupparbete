// vårat orderformulär i modalen
const orderForm = document.getElementById("orderForm");

// alla fält i orderformuläret som vi vill validera
const fields = orderForm.querySelectorAll(".form-control");

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

// elementet där vi visar information om produkten som ska köpas
const itemToPurchaseField = document.getElementById("itemToPurchase");

function fetchProductData(productId) {
  // sätt initialt värde att tjänsten tänker.
  itemToPurchaseField.innerHTML =
    "</div><div class='alert alert-warning' role='alert'>Thinking...</div>";

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

function submitOrder(e) {
  e.preventDefault();
  const orderFormModal = bootstrap.Modal.getInstance(
    document.getElementById("orderFormModal"),
  );
  const orderConfirmationModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("orderConfirmationModal"),
  );
  const orderConfirmationMessage = document.getElementById(
    "orderConfirmationMessage",
  );
  const email = document.querySelector('input[type="email"]').value;

  // validera hela formuläret manuellt, och om det är giltigt, visa bekräftelsemodalen med en bekräftelsemeddelande som innehåller kundens email. Stäng sedan bekräftelsemodalen efter 3 sekunder.
  if (manuallyValidateForm()) {
    console.log("Successfully submitted order data to server");
    orderFormModal.hide();
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

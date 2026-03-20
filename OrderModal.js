class OrderModal extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
    <div class="modal fade" id="orderFormModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Slutför din beställning</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div id="itemToPurchase">
              Här visas information om den produkt som ska köpas, t.ex. namn,
              pris. Denna information kan hämtas från servern när modalen
              öppnas, baserat på det produkt-ID som skickas med i
              onclick-funktionen för knappen som öppnar modalen.
            </div>
            <form id="orderForm" novalidate>
              <div class="mb-3">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    minlength="2"
                    maxlength="50"
                    class="form-control"
                    id="name"
                    name="Firstname"
                    placeholder="Förnamn"
                    required
                  />
                  <label for="name">Förnamn</label>
                  <div class="invalid-feedback">
                    Vänligen ange ditt förnamn (minst 2 tecken, max 50 tecken).
                  </div>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    minlength="2"
                    maxlength="50"
                    class="form-control"
                    id="lastname"
                    name="Lastname"
                    placeholder="Efternamn"
                    required
                  />
                  <label for="lastname">Efternamn</label>
                  <div class="invalid-feedback">
                    Vänligen ange ditt efternamn (minst 2 tecken, max 50 tecken).
                  </div>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="Email"
                    placeholder="Email"
                    required
                  />
                  <label for="email">Email</label>
                  <div class="invalid-feedback">
                    Vänligen ange en giltig emailadress.
                  </div>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    minlength="2"
                    maxlength="50"
                    id="address"
                    name="Address"
                    placeholder="Adress"
                    required
                  />
                  <label for="address">Adress</label>
                  <div class="invalid-feedback">Vänligen ange din adress.</div>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    pattern="[0-9]{5}|[0-9]{3}\s[0-9]{2}"
                    id="postalcode"
                    name="PostalCode"
                    placeholder="Postnummer"
                    required
                  />
                  <label for="postalcode">Postnummer</label>
                  <div class="invalid-feedback">
                    Vänligen ange ett giltigt postnummer (5 siffror).
                  </div>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    minlength="2"
                    maxlength="20"
                    class="form-control"
                    id="city"
                    name="City"
                    placeholder="Ort"
                    required
                  />
                  <label for="city">Ort</label>
                  <div class="invalid-feedback">
                    Vänligen ange din ort (minst 2 tecken, max 20 tecken).
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Stäng
                </button>
                <button type="submit" class="btn btn-primary">
                  Lägg beställning
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        `
    }
}
customElements.define('order-modal', OrderModal);
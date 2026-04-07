class CheckoutOrderModal extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="modal fade" id="orderConfirmationModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Orderbekräftelse</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div id="orderConfirmationMessage">
                Här visas en bekräftelse på att ordern har lagts, eller ett
                felmeddelande om något gick fel.
              </div>
            </div>
          </div>
        </div>
      </div>
        ` 
    }
}
customElements.define("checkout-order-modal",CheckoutOrderModal)
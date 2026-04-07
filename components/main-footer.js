class MainFooter extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
          <footer class="py-5 bg-dark">
        <div class="container">
          <p class="m-0 text-center text-white">
            Copyright &copy; Grupp 1 Frontend JAVAD25 2026
          </p>
        </div>
      </footer>
    </div>
        `
    }
}
customElements.define("main-footer", MainFooter)
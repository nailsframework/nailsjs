export class NavbarComponent {
  constructor(state) {
    this.state = state;
    this.selector = 'nailsnav'
  }

  render() {
    /*html*/
    return `
        <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a href="#" class="navbar-brand">
            <!-- Logo Image -->
            <img src="assets/logo.png" width="45" alt="" class="d-inline-block align-middle mr-2">
            <!-- Logo Text -->
            <span class="text-uppercase font-weight-bold">{{whoami}}</span>
          </a>
      
          <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>
      
          <div id="navbarSupportedContent" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active"><a href="#" class="nav-link">Home <span class="sr-only">(current)</span></a></li>
              <li class="nav-item"><a href="#/login" class="nav-link">Login</a></li>
              <li class="nav-item"><a href="#/showcase" class="nav-link">Other Routing</a></li>
            </ul>
          </div>
        </div>
      </nav>
      `
  }
}
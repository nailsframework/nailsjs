import { LoginComponent } from './components/login.component.js';
import { Router } from './nails/coreComponents/router.component.js';


var loginComponent = new LoginComponent();
var routings = [{
    component: loginComponent,
    route: 'login'
}]
var router = new Router(routings);

window.nails = new Nails({
  el: "body", //Start with # to specify id
  data: {
    title: "Your Nails App",
    whoami: "NailsJS",
  },
  methods: {
    onInit() {
      // This method is called during early construction of the State. As a result, there no state supplied as an argument.
      // You may use this, to trigger your own scripts. Beware, that the dom is not rendert at this time, so use OnMounted for any DOM operations.
    },
    onMounted(currentState) {
      currentState.data.headers = [{ 'Test': 'Value' }];
      router.addEngine(currentState.componentEngine);
    },
  },
  components: [
    loginComponent,router
  ]
});

router.navigate('')


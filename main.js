import { LoginComponent } from './components/login.component.js/index.js';
var nails = new Nails({
  el: "body", //Start with # to specify id
  data: {
    title: "Your Nails App",
    arr: [1,2,3,4],
    whoami: "NailsJS",
  },
  methods: {
    onInit() {
      // This method is called during early construction of the State. As a result, there no state supplied as an argument.
      // You may use this, to trigger your own scripts. Beware, that the dom is not rendert at this time, so use OnMounted for any DOM operations.
    },
    onMounted(currentState) {
      currentState.data.headers = [{ 'Test': 'Value' }];
    },
  },
  components: [
    new LoginComponent(),
  ]
});
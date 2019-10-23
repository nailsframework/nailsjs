import { LoginComponent } from './components/login.component.js';
import { Router } from './nails/coreComponents/router.component.js';
import { Nails } from './nails/nails.js'



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
        },
    },
    components: [
        LoginComponent, Router
    ],
    routings: [{
        component: LoginComponent,
        route: 'login'
    }]
});




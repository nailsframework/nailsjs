import { LoginComponent } from './components/login.component.js';
import { Router } from './nails/coreComponents/router.component.js';
import { Nails } from './nails/nails.js'
import { Greeter } from './modules/injectme.module.js';
import { ShowcaseComponent } from './components/showcase.component.js';
import { NavbarComponent } from './components/navbar.component.js';


var guard = function () {
    return localStorage.getItem('jwt') !== null;
}

window.nails = new Nails({
    el: "body", //Start with # to specify id
    data: {
        title: "Your Nails App",
        whoami: "NailsJS",
        sample: [
            { name: "Jill", lastname: "smith" },
            { name: "Ingo", lastname: "Meyers" },
        ]
    },
    methods: {
        onInit() {
            // This method is called during early construction of the State. As a result, there no state supplied as an argument.
            // You may use this, to trigger your own scripts. Beware, that the dom is not rendered at this time, so use OnMounted for any DOM operations.
        },
        onMounted(currentState) {
            currentState.data.headers = [{ 'Test': 'Value' }];
        },
    },
    components: [
        LoginComponent, Router, ShowcaseComponent, NavbarComponent
    ],
    routings: [{
        component: LoginComponent,
        route: 'login',
    },
    {
        component: LoginComponent,
        route: 'lappe',
        guard: guard
    },
    {
        component: ShowcaseComponent,
        route: 'showcase',
    }],
    declarations: [
        Greeter
    ]
});




export class Router {
    constructor(state) {
        this.state = state;
        var that = this;
        this.selector = 'yield';
        this.hashRoute = window.location.hash.replace('#/', '');

        window.onhashchange = function () {
            if (typeof that.engine === 'undefined') {
                return;
            }


            if(typeof that.engine  === 'undefined') return;
            that.hashRoute = window.location.hash.replace('#/', '');

            that.engine.recreateComponentsByName('yield'); // TODO: Find better way
        }

    }
    addRoutings(routings) {
        this.routings = routings;
    }

    getComponent() {
        if (typeof this.routings === 'undefined') return '<div></div>'
        for (var route of this.routings) {
            if (route.route === this.hashRoute) {
                var instance = new route.component();
                return instance.selector;
            }
        }
    }

    addEngine(engine) {

        this.engine = engine;
    }

    navigate(where) {
        window.location.hash = "/" + where.replace('/', '');
    }

    render() {
        return `
            <${this.getComponent()}></${this.getComponent()}>
        `
    }
}
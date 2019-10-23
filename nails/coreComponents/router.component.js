export class Router {
    constructor(routings) {
        console.log('Creating router')
        this.routings = routings;
        var that = this;
        this.hashRoute = window.location.hash.replace('#/', '');
        window.onhashchange = function(){
            if(typeof that.engine === 'undefined'){
                this.console.log('url has changes, but engine was not defined');
                return;
            }


            that.hashRoute = window.location.hash.replace('#/', '');
            this.console.log(that.hashRoute);
            that.engine.recreateComponentsByName('yield'); // TODO: Find better way
        }
        this.selector = 'yield';
        
    }

    getComponent(){
        console.log(this.hashRoute);

        for(var route of this.routings){
            if(route.route === this.hashRoute){
                console.log('found')
                return route.component.selector;
            }
        }
    }

    addEngine(engine){
        this.engine = engine;
    }

    render() {
        console.log('rendering')
        return `
            <${this.getComponent()}></${this.getComponent()}>
        `
    }
}
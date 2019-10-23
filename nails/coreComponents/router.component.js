export class Router {
    constructor(routings) {
        this.routings = routings;
        var that = this;
        this.hashRoute = window.location.hash.replace('#/', '');
        if(typeof routings === 'undefined'){
            return;
        }
        window.onhashchange = function(){
            if(typeof that.engine === 'undefined'){
                return;
            }


            that.hashRoute = window.location.hash.replace('#/', '');
            that.engine.recreateComponentsByName('yield'); // TODO: Find better way
        }
        this.selector = 'yield';
        
    }

    getComponent(){
        for(var route of this.routings){
            if(route.route === this.hashRoute){
                return route.component.selector;
            }
        }
    }

    addEngine(engine){
        this.engine = engine;
    }

    navigate(where){
        window.location.hash = "/" + where.replace('/', '');
    }

    render() {
        return `
            <${this.getComponent()}></${this.getComponent()}>
        `
    }
}
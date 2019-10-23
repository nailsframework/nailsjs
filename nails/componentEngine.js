class ComponentEngine {
    constructor(state, engine, nails) {
        this.state = state;
        this.engine = engine;
        this.instance = this;
        this.nails = nails;
    }

    getInstance() {
        return this.instance;
    }


    renderComponents() {
        if (typeof this.state.components !== 'undefined' && this.state.components !== null) {
            for (let i = 0; i < 300; i++) {
                let html = document.body.innerHTML;

                let newHtml;
                for (var component of this.state.components) {
                    var elements = document.getElementsByTagName(component.selector);
                    if (elements.length === 0) {
                        continue;
                    }
                    for (var element of elements) {
                        if (element.childNodes.length > 0) {
                            continue;
                        }
                        var componentHTML = component.render();
                        if (componentHTML.includes('<' + component.selector + '>')) {
                            continue;
                        }
                        element.innerHTML = componentHTML;
                        this.engine.executeInerpolationsOnElement(element)
                    }
                    newHtml = document.body.innerHTML;

                }
                if(html == newHtml){
                    break;
                
            }
        }
    }
}

    recreateComponentsByName(name) {
        if (typeof this.state.components !== 'undefined' && this.state.components !== null) {
            var component = null;
            for (var c of this.state.components) {
                if (c.selector === name) {
                    component = c;
                }
            }
            if (this.state.components[name] === null) {
                return;
            }
            var elements = document.getElementsByTagName(name);
            for (var element of elements) {
                var componentHTML = component.render();
                if (componentHTML.includes('<' + component.selector + '>')) {
                    console.error('component ' + component.selector + ' has a recursion with no exit condition');
                    continue;
                }
                element.innerHTML = componentHTML;
                this.renderComponents();
            }
        }
    }


    recreateAllComponents() {
        this.renderComponents();
    }
}
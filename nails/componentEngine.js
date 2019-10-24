import { Router } from './coreComponents/router.component.js';
import { type } from 'os';

export class ComponentEngine {
    constructor(state, engine, nails, routings) {
        this.state = state;
        this.engine = engine;
        this.instance = this;
        this.nails = nails;
        this.routings = routings;
    }

    getInstance() {
        return this.instance;
    }

    injectComponents() {
        if(Array.isArray(this.state.mountedComponents)) return;
        this.state.mountedComponents = [];

        for (var component of this.state.components) {
            console.log('state is ' + typeof this.state)
            var instance = new component(this.state);
            if (instance instanceof Router) {
                this.state.router = instance;
                instance.addRoutings(this.routings);
                instance.navigate('');
            }

            this.state.mountedComponents.push(instance);
        }
    }

    renderComponents() {
        this.injectComponents();
        if (typeof this.state.mountedComponents !== 'undefined' && this.state.mountedComponents !== null && this.state.mountedComponents.length > 0) {
            for (let i = 0; i < 300; i++) {
                let html = document.body.innerHTML;

                let newHtml;
                for (var component of this.state.mountedComponents) {
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
                if (html == newHtml) {
                    break;

                }
            }
        }
    }

    recreateComponentsByName(name) {
        if (typeof this.state.mountedComponents !== 'undefined' && this.state.mountedComponents !== null) {
            var component = null;
            for (var c of this.state.mountedComponents) {
                if (c.selector === name) {
                    component = c;
                }
            }
            if(component === null){
                return;
            }
            if (this.state.mountedComponents[name] === null) {
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
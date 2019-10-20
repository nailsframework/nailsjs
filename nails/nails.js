'use strict';

class Nails {
    constructor(object) {
        if(typeof object.methods.onInit !== 'undefined'){
            object.methods.onInit();
        }
        this.state = new State();
        console.log("NailsJS Created with constructor object: " + JSON.stringify(object));
        if (object.hasOwnProperty('el')) {
            this.state.element = object.el;
        } else {
            console.error("NailsJS cannot be initalized, because no element was specified");
        }
        if (object.hasOwnProperty('data')) {
            this.state.data = object.data;
        }
        if(object.hasOwnProperty('methods')){
            this.state.methods = object.methods;
        }

        this.engine = new RenderingEngine(this.state);
        this.setUpProxy();
        this.indexDOM();
        this.engine.setTitle();
        this.state.methods.getState = function(){
            return  this.state;
        }
        if(typeof this.state.methods.onMounted !== 'undefined'){
            this.state.methods.onMounted(this.state);
            
        }
    }

    notifyDOM(target, prop, value) {
        var ref = this.state.findElementsByObject(target, prop);
        if (ref === [] || ref.length === 0) {
            return;
        };
        
        ref = this.state.getHtmlReferenceOfStateElement(ref);
        this.engine.updateInterpolatedElement(ref[0], ref[2]);
        this.engine.executeDirectivesOnElement(ref);
        return true;
    };
    indexDOM() {
        if (typeof this.state.element !== 'undefined') {
            var element = null;
            if (this.state.element.startsWith('#')) {
                var selector = this.state.element.substr(1);
                element = document.getElementById(selector);
            } else {
                element = document.getElementsByTagName(this.state.element);
            }

            if (typeof element === 'undefined' || element === null) {
                console.error('No element with selector: ' + this.state.element + ' has been found');
                return;
            }
            if (element instanceof HTMLCollection && element.length > 1) {
                console.error('Multiple choices, try using id if the element tag is not unique. Your Selector was: ' + this.state.element);
                return;
            }
            if (element instanceof HTMLCollection && element.length === 0) {
                console.error('No element with selector: ' + this.state.element + ' has been found');
                return;
            }
            if (element instanceof HTMLCollection) {
                element = element[0];
            }


            //From now on, we need to loop through all elements
            var activeElements = this.engine.indexElement(element);
            //Execute Directives

            //TODO: Manage the activeElements here and not in interpolations
            for (var el of activeElements) {
                this.engine.executeDirectivesOnElement(el);
            }
            this.engine.executeInerpolationsOnElement(element);
        }
    }
    setUpProxy() {
        var handler = {
            state: this.state,
            notifyDom: this.notifyDOM,
            engine: this.engine,

            get: function (target, prop, receiver) {
                return target[prop];

            },
            set(target, prop, value) {
                target[prop] = value;
                this.notifyDom(target, prop);
                return true;
            }
        };

        var proxy = new Proxy(this.state.data, handler);
        this.state.data = proxy;
    };



}
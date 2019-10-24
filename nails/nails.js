'use strict';
import { State } from './state.js';
import { RenderingEngine } from './engine.js'
import { ComponentEngine } from './componentEngine.js'
import { Injector } from './core/injector';

export class Nails {

    constructor(object) {

        if (typeof object.methods.onInit !== 'undefined') {
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
        if (object.hasOwnProperty('methods')) {
            this.state.methods = object.methods;
        }
        this.state.components = object.components;

        this.engine = new RenderingEngine(this.state);
        this.componentEngine = new ComponentEngine(this.state, this.engine, this, object.routings);
        this.setUpProxy();
        this.injector = new Injector(this.state);
        this.prepareInjector(object.declarations);
        this.state.addInjector(this.injector);
        this.componentEngine.renderComponents();
        this.engine.indexDOM();
        this.engine.setTitle();
        window.injector = this.injector;

        this.state.methods.getState = function () {
            return this.state;
        }
        if (typeof this.state.methods.onMounted !== 'undefined') {
            this.state.methods.onMounted(this.state);

        }
    }



    prepareInjector(arr){
        if(!Array.isArray(arr)){
            console.warn('Cannot iterate over declarations, since they are not an array');
            return;
        }
        for(var d of arr){
            let instance = new d();
            this.injector.insert(instance);
        }
    }
    notifyDOM(target, prop, value) {

        var refs = this.state.findElementsByObject(target, prop);
        if (refs === [] || refs.length === 0) {
            return;
        };
        for (var ref of refs) {
            if (ref.hasOwnProperty('key')) {
                this.engine.executeDirectivesOnElement(ref.element, false);
            } else {
                this.engine.updateInterpolatedElement(ref[0], ref[2]);
                this.engine.executeDirectivesOnElement(ref, false);
            }

        }

        return true;
    };

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
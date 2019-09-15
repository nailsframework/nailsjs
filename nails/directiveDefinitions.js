'use strict';

class NailsDirectives {

    directives;

    constructor() {
        this.directives = ['if', 'form', 'for']
    }
    /*
        A directive exists of an element (string) in the @directives array and a function declaration 
        below.
        directive and function need to have the same name 
        sample body:
        sample(element, statement, state){

        }
        where element is the element where the directive is added and statemenet
        what has been declaired.
        sample arguments
        element = h1 reference
        statement = let object of objects
        state = current state

        For reactivness, only use elements in the data object within the state, as these
        are actively monitored. 

        DONT PREFIX YOUR DIRECTIVE AND FUNCTIONS WITH AN N
    */

    form = function (element, statemenet, state) {
        if (element.getAttribute('type') === 'text') {
            state.data[statemenet] = element.value;
        }
        element.addEventListener("input", () => {
            state.data[statemenet] = element.value;
        });

    }

    for = function (element, statemenet, state) {
        let engine = new RenderingEngine(state);
        element.style.display = "none";
        function interpolateCustomElement(element, object, descriptor){
            //Performancewise, we render the whole html element.
            let html = element.innerHTML; 
            var interpolations = engine.getInterpolationsFortextContent(html);
            console.error(interpolations);
            for(var interpolation of interpolations){
                var stripped = engine.stripAndTrimInterpolation(interpolation);
                console.error(stripped)
                if(object.hasOwnProperty(stripped.split('.')[1])){
                    html = html.replace(interpolation, object[stripped.split('.')[1]]);
                }
            }
            element.innerHTML = html;
            
        }
        console.error(statemenet);
        let descriptor = statemenet.split(' ')[1];
        let arr = statemenet.split(' ')[3];
        let refArray = eval("state.data." +arr);
        if(typeof refArray === 'undefined' || refArray === null) return;
        
        let parent = element.parentNode;
        console.error(refArray);
        for(let i of refArray){
            let child = document.createElement(element.nodeName);
            child.innerHTML = element.innerHTML;
            interpolateCustomElement(child, i, descriptor);
            parent.appendChild(child);
        }
        
    }
    if = function (element, statement, state) {
        let reversed = false;
        if (statement[0] === '!') {
            statement = statement.substring(1);
            reversed = true;
        }
        if (state.data.hasOwnProperty(statement)) {
            if (reversed) {
                if (!eval(state.data[statement])) {
                    element.style.display = 'block';
                } else {

                    element.style.display = 'none';
                }
            } else {
                if (eval(state.data[statement])) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';

                }
            }

        } else {
            console.warn('statement: ' + statement + ' not found in context')
        }
    }

}
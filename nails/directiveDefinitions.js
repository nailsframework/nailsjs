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
        // As n-for uses deeper integration in the rendering engine, code has been outsourced to the engine.
        // Only nessesairy steps are done here. Normal plugins should _not_ change the rendering engine if not absolutly mandatory.
        element.style.display = 'none';
        let engine = new RenderingEngine(state);
        let refArray = statemenet.split(' ').pop();
        let refInterpolation = statemenet.split(' ')[1];
        let useDot = true;
        refArray = eval('state.data.' + refArray);
        if (typeof refArray === 'undefined') return;
        let parent = element.parentNode;
        for (let i of refArray) {
            let node = document.createElement(element.nodeName);
            node.textContent = element.textContent;


            var interpolations = engine.getNForInterpolations(node.textContent);


            if (interpolations.length === 0) {
                //Try normal interpolations
                useDot = false;
                interpolations = engine.getInterpolationsForInnerText(node.textContent);
            }

            for (const interpolation of interpolations) {



                if (useDot) {
                    node.textContent = node.textContent.replace(interpolation, i[engine.stripAndTrimNForInterpolation(interpolation).split('.')[1]]);
                } else {
                    // let stripped = engine.stripAndTrimInterpolation(interpolation);
                    node.textContent = node.textContent.replace(interpolation, i);
                }


            }
            parent.appendChild(node);

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
class NailsDirectives{
    directives = ['if'];
    constructor(){

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

    if = function(element, statement, state){
        //this can be called with for example <h1 n-if="true"></h1>
        let reversed = false;
        if(statement[0] === '!'){
            //User tries to reverse the statement.
            statement = statement.substring(1);
            reversed = true;
        }
        if (state.data.hasOwnProperty(statement)) {
            if (reversed) {
                if (!eval(state.data[statement])) {
                    console.log('showing');
                    element.style.display = 'block';
                }else{
                    element.style.display = 'none';    
                }
            } else {
                if (eval(state.data[statement])) {
                    element.style.display = 'block';
                } else {
                    console.log('hiding');

                }
            }
           
        } else {
            console.warn('statement: ' + statement + ' not found in context')
        }
    }
    
}
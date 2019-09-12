Want to contribute? Great!

To create new directives simply add your function definition in directiveDefinitions.js and make sure that you added your definition in the directives array aswell.

Do not prefix your function and your array entry with an n, as this is done by the NailsJS Library.

Below is a sample function body.

sample(element, statement, state){

}
element: The HTML element, which has added your directive. statement: The code in the directive. For example, if the directive declaration on the element is n-if="formIsActive" then statement would be formIsActive state: This is the current state, which represents NailsJS. To access user Data, you need to query state.data. Do not store Data outside of this object, as it's not actively monitored and a change in this data will not result in any DOM changes.

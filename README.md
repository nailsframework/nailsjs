# NailsFramework

NailsFramework or short NailsJS is a newcorner Javascript library.

```Beware: WORK IN PROCESS. Use at your OWN risk. Changes may occur without further notice, stuff will certainly break``` 

# New Features!

  - Reactive DOM. Change values in the console and see the magic happen.
  - String interpolation
  - Directives
  - Intelligent DOM Rendering, does not re-render whole DOM but only the parts, which 
    have changed. This improves stability and performance.
  - Build from Ground up for Reactivness. No setState or other method calls required
### Installation

NailsJS / Nailsframework has no dependencies. 

You may clone the Nails Project direct into your Project or use a CDN.
Insert follwing code into your HTML head.
```
<script src="nails/directiveDefinitions.js"></script>
<script src="nails/state.js"></script>
<script src="nails/functions.js"></script>
<script src="nails/nails.js"></script>
```

Create a new Nails instance with:

```
let nails = new Nails({
        el: "body",
        data: {
            title: "Your Nails App",
        }
});
````

```el```: The Element which nailsjs uses as entry point. You may specify an ID with an preceeding # or directly specify an HTML element. Beware, that if nails finds more than one element, it refuses to bootstrap itself.
```data```: Here you can specify your inital Data. This step is not mandatory. 
```data.title```: The title attribute will specify the title of your document.

### Directives

Hell, yeah. NailsJS supports directives. If you want to add your custom ones, please refer to the section ```Developement```.

You can add a directive to your element like following:

```
    <h1 n-if="boolValue">This is some Data</h1>
```
```n-if```: This is the directive.
```boolValue```: This is the Value passed to the directive.

All Directives:

```n-if```: Shows or hides the Element, based on the boolean attribute passed in.
```n-if```: Generates a field with the name specified in the ```directive``` and updates all elements accordingly.


... more are following soon.
### Development

Want to contribute? Great!

To create new directives simply add your function definition in ```directiveDefinitions.js``` and make sure
that you added your definition in the ```directives``` array aswell.

Do not prefix your function and your array entry with an n, as this is done by the NailsJS Library.

Below is a sample function body.
```
sample(element, statement, state){

}
```
```element```: The HTML element, which has added your directive.
```statement```: The code in the directive. For example, if the directive declaration on the element is 
```n-if="formIsActive"``` then statement would be ```formIsActive```
```state```: This is the current state, which represents NailsJS. To access user Data, you need to query 
```state.data```. Do not store Data outside of this object, as it's not actively monitored and a change in this data will not result in any DOM changes.
### License

MIT


**Free Software, Hell Yeah!**

 * Author: Dominic Järmann


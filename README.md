# NailsFramework

NailsFramework or short NailsJS is a new Javascript library.

```I'm proud to announce that NailsJS enters the first stable state. You can safely use it. Please take a look at our branches to see, what version best suits you``` 

To see whats possible, take a look into the index.html.

# Why should i use NailsJS?

Nails has been created out of one reason. Frustration.
Mostly every JS Framework doesn't really scale down for small size project, instead they are horribly 
slow and space intensive. I don't want to use 300MB disk space for a hello world program just because
those nasty dependencies.

And exactly here comes nailsJS into place. It just nails it for small size projects but also perfectly scales up to enterprise solutions,
although it's still in development. The Codebase is about 50KB and thats all. No dependencies, nothing. It just works.

Also there is no learning curve, because to create a wonderful, reactive WebApp you don't need to learn some complicated stuff.
NailsJS is designed to be intuitive and easy. 

Thats it.

# Features
  - Reusable Components
  - Dependency Injection
  - Reactive DOM. Change values in the console and see the magic happen.
  - String interpolation
  - Directives
  - Intelligent DOM Rendering, does not re-render whole DOM but only the parts, which 
    have changed. This improves stability and performance.
  - Build from Ground up for Reactivity. No setState or other method calls required
### Installation

NailsJS / NailsFramework has no dependencies. 

You may clone the Nails Project direct into your Project or use a CDN.
Insert following code into your HTML head.
```html
 <script src="nails/directiveDefinitions.js"></script>
  <script src="nails/state.js"></script>
  <script src="nails/engine.js"></script>
  <script src="nails/nails.js"></script>
  <script src="nails/api.js"></script>

```

for the CDN:

```html
 <script src="https://rawcdn.githack.com/nailsframework/nails/6b06383993ed0910d53322a82d3edd54f36056cd/nails/nails.min.js"></script>

```
Create a new Nails instance with:

```js
let nails = new Nails({
        el: "body",
        data: {
            title: "Your Nails App",
        },
        methods: {
            onInit() {

            },
            onMounted()  {

            }
        }
});
```

```el```: The Element which NailsJS uses as entry point. You may specify an ID with an preceding # or directly specify an HTML element. Beware, that if nails finds more than one element, it refuses to bootstrap itself.
```data```: Here you can specify your initial Data. This step is not mandatory. 
```data.title```: The title attribute will specify the title of your document.
```methods```: Here you need to define two Methods. First onInit and secondly onMounted. OnInit is called as soon NailsJS is about to bootstrap itself. Here you might define scripts, who need to have a clean DOM and do not rely on the State.
OnMounted is called after the DOM is fully rendered and the State object has been crafted. Mostly you need to use OnMounted. However, you MUST define both methods.

### Directives

Hell, yeah. NailsJS supports directives. If you want to add your custom ones, please refer to the section ```Development```.

You can add a directive to your element like following:

```
    <h1 n-if="boolValue">This is some Data</h1>
```
```n-if```: This is the directive.
```boolValue```: This is the Value passed to the directive.

All Directives:

```n-if```: Shows or hides the Element, based on the boolean attribute passed in.
```n-for```: Generates a field with the name specified in the ```directive``` and updates all elements accordingly.
```n-form```: Generates a field in the state which updates when the elements "Text-Node" updates. Then you can use for example
              <input n-form="username" type="text"> creates state.data.username.
              
### Components

Implement a Component like this:
```js
export class LoginComponent{
    constructor(state){
        this.state = state;
        this.selector = 'login'
    }
    

    render(){
        return  `
        <div>
          <input type="text" placeholder="Username ">
          <input type="text" placeholder="Username">
        </div>
      `
    }
}
```

In your Nails constructor add this object:

```js
components: [
    new LoginComponent()
  ]
```

And import your Component like this:

```js
import { LoginComponent } from './login.component.js';
```

In your HTML use your Component like this:

```html
<login></login>
```

Note: login is the selector we defined earlier in the Component.

### Branches




| Branch        | What to expect  |
| ------------- |:-------------:  |
| master      | The most stable version|
| develop     | Not really unstable, but bugs may occur.      |
| feature/* | For your own safety, and for the safety of your project, don't touch any of these.     |


### Development

Want to contribute? Great!

To create new directives simply add your function definition in ```directiveDefinitions.js``` and make sure
that you added your definition in the ```directives``` array as well.

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

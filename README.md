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

Please refer to the doucumentation in the wiki pages.

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

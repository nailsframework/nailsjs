import { Greeter } from "../modules/injectme.module";

export class LoginComponent{
    constructor(state){
        this.state = state;
        this.selector = 'login'
        this.i = 0;
        this.greeter = this.state.injector.resolve(Greeter)
    }
    incrementCounter(){
      this.i++;
      return this.i;
    }

    render(){
        return  `
        <div>
          <input type="text" placeholder="Username ">
          <input type="text" placeholder="Username">
          ${this.greeter.greet('Dominic')}
        </div>
      `
    }
}
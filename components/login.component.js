export class LoginComponent{
    constructor(state){
        this.state = state;
        this.selector = 'login'
        this.i = 0;
    }
    incrementCounter(){
      this.i++;
      return this.i;
    }

    render(){
      console.log('render in login')
        return  `
        <div>
          <input type="text" placeholder="Username ">
          <input type="text" placeholder="Username">
          {{whoami}} ${this.incrementCounter()}
        </div>
      `
    }
}
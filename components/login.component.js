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
          {{whoami}}
        </div>
      `
    }
}
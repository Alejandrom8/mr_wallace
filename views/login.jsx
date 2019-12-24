import React, { Component } from 'react';
import DefaultLayout from './layouts/default';

class Login extends Component{
    // constructor(props){
    //     super(props);
    //     // this.handleSubmit = this.handleSubmit.bind(this);
    // }

    // handleSubmit(e){
    //     e.preventDefault();
    //     alert(`The value is`);
    // }

    // render(){
    //     return(
    //         <DefaultLayout title='login' links={[
    //             {'rel': 'stylesheet', 'href': '/stylesheets/login.css'}
    //         ]}>
    //             <section className="margen">
    //                 <div id="form-login" className='p-5'>
    //                     <form className="form" onSubmit={this.handleSubmit}>
    //                         <h4 className='mr-wallace-font text-center mt-4 mb-5'>Mr Wallace</h4>
    //                         <div className='form-group'>
    //                             <label  htmlFor='nickname'>nickname</label>
    //                             <input type='text' 
    //                                    className="form-control"
    //                                    id='nickname'
    //                                    name='nickname' 
    //                                    maxLength='100' 
    //                                    placeholder='Introduce tu nickname'
    //                                    ref={ (input) => this.input = input } 
    //                                    required/>
    //                         </div>
    //                         <div className='form-group'>
    //                             <label  htmlFor='password'>contraseña</label>
    //                             <input type='password' className="form-control" id='password' name='password' maxLength='100' placeholder='Introduce tu contraseña' required/>
    //                         </div>
    //                         <button type='submit' className='btn btn-primary btn-block my-4'> entrar</button>
    //                     </form>
    //                 </div>
    //             </section>
    //         </DefaultLayout>
    //     );
    // }

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    
    render() {
        return (
            <form>
                <label>
                    Name:
                    <input type="text" />
                </label>
                <input type="submit" value="Submit" onKeyDown={ () => alert('hola') }/>
            </form>
        );
    }
}

export default Login;

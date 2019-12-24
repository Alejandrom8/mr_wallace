import React from 'react';
import DefaultLayout from './layouts/default';

function SignUp (props){
    const  links = [
        {rel:'stylesheet', href:'/stylesheets/signup.css'}
    ];

    return (
        <DefaultLayout title='signup' links={links}>
            <div className="row pt-2 m-0" id='content'>
                 <div className='col-lg-12 text-center p-4 bg-dark text-light'>
                    <h1 className='mr-wallace-font text-center'>Mr Wallace</h1>
                </div>
                <div className="col-lg-6 p-0">
                    <form className='form p-5 bg-light'  action='/sign_up'  method='POST'  id='sign-up-form'>
                        <h1 className='mb-2'>Registro</h1>
                        <hr/>
                        <div className='form-group mt-5'>
                             <label htmlFor='name'>Nombre completo</label>
                             <input type='text'  name='name'  id='name'  className='form-control'  placeholder='Introduce tu nombre completo'  maxLength='100'   required/>
                        </div>
                        <div className='form-group'>
                             <label htmlFor='nickname'>Nickname</label>
                             <input type='text'  name='nickname'  id='nickname'  className='form-control'  placeholder='Introduce un nombre loco'  maxLength='15'   required/> 
                        </div>
                        <div className='form-group'>
                             <label htmlFor='email'>Correo electrónico</label>
                             <input type='email'  name='email'  id='email'  className='form-control'  placeholder='Introduce tu email'  maxLength='100'   required/> 
                        </div>
                        <div className='form-group mt-5'> 
                             <label htmlFor='password'>Contraseña</label>
                             <input type='password'  name='password'  id='password'  className='form-control'  placeholder='Introduce tu contraseña'  maxLength='100'   required/> 
                        </div>
                        <div className='form-group'>
                             <label htmlFor='password-re'>Repite tu contraseña</label>
                             <input type='password'  name='password-re'  id='password-re'  className='form-control'  placeholder='Repite tu contraseña'  maxLength='100'   required/> 
                        </div>
                        <button type='submit'  className='btn btn-primary btn-block mt-5'>registrar</button>
                    </form>
                </div>
                <div className="col-lg-6 p-2"  id='planet'> 
                    <img src='/images/planeta1.png'  width='100%'  className='img-fluid px-5 py-2'/>
                </div> 
            </div>
        </DefaultLayout>
    );
}

export default SignUp;
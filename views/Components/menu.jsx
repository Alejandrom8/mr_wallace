import React from 'react';

function Menu(params) {
    return(
        <nav id="menu"  className="navbar navbar-expand-lg py-2">
            <a className="navbar-brand"  id="brand"  href="#">FIDU</a>
            <button className="navbar-toggler" 
                type="button"  
                data-toggle="collapse" 
                data-target="#navbarNav"  
                aria-controls="navbarNav"  
                aria-expanded="false"  
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse"  id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link"  href="/">
                            Home  
                            <span className="sr-only">current</span> 
                        </a> 
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  href="#">Pricing</a>
                    </li>
                </ul>
            </div>
            <div className="form-inline my-2 my-lg-0 ml-auto">
                <a href="/login"  className="btn btn-outline-primary mr-sm-2">
                    Log in
                    <i className="fas fa-sign-in-alt"></i>
                </a>  
                <a href="/sign_up"  className="btn btn-outline-success my-2 my-sm-0">Sign up</a>
            </div>
        </nav>
    );
} 

export default Menu;
import React from 'react';
import DefaultLayout from './layouts/default';

function HelloMessage(props) {
  return (
    <DefaultLayout title={props.title}>
        <section id="banner" className="container">
            <div className="title row pt-5">
            <h1 className="col-md-12 mt-5 mb-2">Mr Wallace</h1>
            <div className="col-md-12 text-center mt-3 px-5">
                <button id="play_now" className="btn btn-primary awesome mr-sm-5">
                    <i className="fas fa-play fa-sm mr-2"></i>
                    play now
                </button>
                <button id="play_now" className="btn btn-secondary awesome">Sign up free</button>
            </div>
            <img src="/images/asteroid.png" className="col-md-12 mt-5"/>
            </div>
        </section>
        <section id="columns" className="container">
            <div className="row mx-0 p-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body d-flex justify-content-center">
                            <img src="/images/wallace.png" className="img-fluid" width="200px" height="200px"/>
                        </div>
                    </div> 
                </div> 
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body d-flex justify-content-center">
                            <img src="/images/enemy.png" className="img-fluid" width="295px"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <p>Hola compa</p>
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    </DefaultLayout>
  );
}

export default HelloMessage;
import React, { Component } from 'react'

export default class Defaults extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-uppercase text-title pt-5">
                        <h1 className="display-3">404</h1>
                        <h1>error</h1>
                        <h1>Page Not Found</h1>
                        <h3>
                            the requested url <span className="text-danger">{this.props.location.pathname}</span>{""}
                             was not found
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import LoginForm from "./LoginForm";


class LoginComponent extends Component {
    render() {
        return (
            <div className="registration">
                <div className="container">
                    <h2 className="h h_center">Войдите в свой аккаунт</h2>
                    <div className="row row_justify_center">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
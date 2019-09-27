import React, { Component } from 'react'
import RegistrationForm from "./RegistrationForm";


class RegistrationComponent extends Component {
    render() {
        return (
            <div className="registration">
                <div className="container">
                    <h2 className="h h_center">Зарегистрируйте свой аккаунт</h2>
                    <div className="row row_justify_center">
                        <RegistrationForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationComponent;
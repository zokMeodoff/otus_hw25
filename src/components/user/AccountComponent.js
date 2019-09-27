import React, { Component } from 'react'
import AccountForm from "./AccountForm";


class AccountComponent extends Component {
    render() {
        return (
            <div className="account">
                <div className="container">
                    <h2 className="h h_center">Мой профиль</h2>
                    <div className="row row_justify_center">
                        <AccountForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountComponent;
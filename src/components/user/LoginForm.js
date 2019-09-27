import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import './Form.css'
import Form from './Form'

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            errors: []
        }

        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleDoLogin = this.handleDoLogin.bind(this);
    }

    handleUsernameChanged = (event) => {
        this.setState({username: event.target.value});
    };

    handlePasswordChanged = (event) => {
        this.setState({password: event.target.value});
    };

    handleDoLogin = (event) => {
        event.preventDefault();
        axios.post('/api/login/', {
            "username": this.state.username,
            "password": this.state.password
        }).then(response => {
                    this.setState({loggedIn: true})
                }
            ).catch(errors => {
                if (errors.response) {
                    this.setState({errors: errors.response.data['errors']})
                    alert(errors.response.data['errors']);
                }
            }
        )
    };

    render() {
        if (!this.state.loggedIn) {
            return(
                <Form className="form">
                    <div className="row row_justify_center">
                        <div className="form__field">
                            <label htmlFor="id_username">Имя пользователя</label>
                            <input
                                type="text"
                                name="username"
                                maxLength="150"
                                autoFocus
                                required
                                id="id_username"
                                value={this.state.username}
                                onChange={this.handleUsernameChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <div className="form__field">
                            <label htmlFor="id_password">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                required
                                id="id_password"
                                value={this.state.password}
                                onChange={this.handlePasswordChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <input
                            type="submit"
                            value="Войти"
                            className="form__button"
                            onClick={this.handleDoLogin}
                        />
                    </div>
                </Form>
            )
        } else {
            return (
                <Redirect to="/account"/>
            )
        }
    }
}

export default LoginForm;

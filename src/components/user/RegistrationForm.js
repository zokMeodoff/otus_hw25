import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import './Form.css'
import Form from './Form'

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmed: '',
            registeredSuccess: false,
            errors: []
        }

        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
        this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handlePasswordConfirmedChanged = this.handlePasswordConfirmedChanged.bind(this);
        this.handleDoRegister = this.handleDoRegister.bind(this);
    }

    handleUsernameChanged = (event) => {
        this.setState({username: event.target.value});
    };

    handleFirstNameChanged = (event) => {
        this.setState({firstName: event.target.value});
    };

    handleLastNameChanged = (event) => {
        this.setState({lastName: event.target.value});
    };

    handleEmailChanged = (event) => {
        this.setState({email: event.target.value});
    };

    handlePasswordChanged = (event) => {
        this.setState({password: event.target.value});
    };

    handlePasswordConfirmedChanged = (event) => {
        this.setState({passwordConfirmed: event.target.value});
    };

    handleDoRegister = (event) => {
        event.preventDefault();

        if (this.state.password !== this.state.passwordConfirmed) {
            alert('Неверно введено подтверждение пароля!');
        } else {
            axios.post('/api/register/', {
                "username": this.state.username,
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "password": this.state.password,
            }).then(response => {
                    this.setState({registeredSuccess: true});
                    alert('Вы успешно зарегистировались!');
                }
            ).catch(errors => {
                    if (errors.response) {
                        this.setState({errors: errors.response.data['errors']});
                        alert(errors.response.data['errors']);
                    }
                }
            )
        }
    };

    render() {
        if (!this.state.registeredSuccess) {
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
                                value={this.props.username}
                                onChange={this.handleUsernameChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <div className="form__field">
                            <label htmlFor="first_name">Имя</label>
                            <input
                                type="text"
                                name="first_name"
                                maxLength="150"
                                id="id_first_name"
                                value={this.props.firstName}
                                onChange={this.handleFirstNameChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <div className="form__field">
                            <label htmlFor="last_name">Фамилия</label>
                            <input
                                type="text"
                                name="last_name"
                                maxLength="150"
                                id="id_last_name"
                                value={this.props.lastName}
                                onChange={this.handleLastNameChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <div className="form__field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                maxLength="150"
                                id="id_email"
                                value={this.props.email}
                                onChange={this.handleEmailChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <div className="form__field">
                            <label htmlFor="password1">Пароль</label>
                            <input
                                type="password"
                                name="password1"
                                maxLength="150"
                                required
                                id="id_password1"
                                value={this.props.password}
                                onChange={this.handlePasswordChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <div className="form__field">
                            <label htmlFor="password2">Подтверждение пароля</label>
                            <input
                                type="password"
                                name="password2"
                                maxLength="150"
                                required
                                id="id_password2"
                                value={this.props.passwordConfirmed}
                                onChange={this.handlePasswordConfirmedChanged}
                                className="form__input"
                            />
                        </div>
                    </div>
                    <div className="row row_justify_center">
                        <input
                            type="submit"
                            value="Зарегистрироваться"
                            className="form__button"
                            onClick={this.handleDoRegister}
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

export default RegistrationForm;

import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import './Form.css'
import Form from './Form'
import {format} from 'date-fns';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class AccountForm extends Component {
	constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
			birthday: '',
			loaded: false,
			errors: []
        }

        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
        this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handleBirthdayChanged = this.handleBirthdayChanged.bind(this);
        this.handleUpdateUserData = this.handleUpdateUserData.bind(this);
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

    handleBirthdayChanged = (event) => {
        this.setState({birthday: format(event.target.value, 'yyyy-MM-dd')});
    };

    handleUpdateUserData = (event) => {
    	event.preventDefault();
        axios.post('/api/account/', {
        	"username": this.state.username,
            "firstName": this.state.firstName,
			"lastName": this.state.lastName,
			"email": this.state.email,
			"birthday": this.state.birthday
		}).then(response => {
					this.setState({loaded: true})
                    alert('Данные профиля были успешно обновлены!');
                }
			).catch(errors => {
				if (errors.response) {
					this.setState({loaded: true, errors: errors.response.data['errors']})
					alert(errors.response.data['errors']);
				}
			}
		)
    };

	async componentDidMount() {
        try {
            let response = await axios.get('/api/account/');
            if (response.status === 200) {
                this.setState({username: response.data['username'],
						firstName: response.data['firstName'],
						secondName: response.data['secondName'],
						email: response.data['email'],
                        birthday: response.data['birthday'],
                        loaded: true
                    }
                )
            }
        } catch (errors) {
        	this.setState({errors: errors.response.data['errors']})
            alert(errors.response.data['errors']);
        }
    }

	render() {
		if (this.state.loaded){
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
								id="id_username"
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
							<label htmlFor="birthday">Дата рождения</label>
							<DatePicker
								name="birthday"
								maxDate={new Date()}
								yearDropdownItemNumber={100}
								value={this.props.birthday}
								onChange={this.handleBirthdayChanged}
								className='form__input'
							/>
						</div>
					</div>
					<div className="row row_justify_center">
						<input
							type="submit"
							value="Сохранить"
							className="form__button"
							onClick={this.handleUpdateUserData}
						/>
					</div>
				</Form>
			)
		}
		else {
			return(
				<div className="container">
                    <div className="row row_justify_space-between">
                        <h2>Загрузка данных профиля...</h2>
                    </div>
                </div>
			)
		}

	}
}

export default AccountForm;
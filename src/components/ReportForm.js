import React, { Component } from 'react';
import axios from "axios";

const emailRegex = RegExp(/^[^\s@#!]+@[^\s@.#!]+\.[^\s@.]+$/);

class ReportForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            phoneNumber: '',
            email: '',
            message: '',
            errors: {
                firstName: '',
                phoneNumber: '',
                email: '',
                message: ''
            }
        };
    }

    // "is required" error message
    validationReqMessage = (field) => {
        return `${field} is required`
    }

    // validate all fields from the form
    validationErrors = (field, value) => {
        let errors = this.state.errors;
        switch (field) {
            case 'firstName':
                errors.firstName = value.length === 0 ? this.validationReqMessage('First Name') : '';
                break;
            case 'phoneNumber':
                errors.phoneNumber = value.length === 0 ? this.validationReqMessage('Phone Number') : '';
                break;
            case 'email':
                errors.email = value.length === 0 ? this.validationReqMessage('Email') : emailRegex.test(value) ? '' : 'Invalid Email';
                break;
            case 'message':
                errors.message = value.length === 0 ? this.validationReqMessage('Message') : '';
                break;
            default:
                break;
        }
    }

    // check if form is valid
    isValid = ({ errors, ...rest }) => {
        let valid = true
        // validate fields and add error messaging
        Object.keys(rest).forEach(field => {
            this.validationErrors(field, rest[field]);
        });

        // check for errors and validate form
        Object.values(errors).forEach(val => {
            if (val.length > 0) {
                valid = false;
            }
        })
        
        this.setState({ errors });
        return valid;
    }

    clearForm = () => {
        this.setState({
            firstName: '',
            phoneNumber: '',
            email: '',
            message: '',
            errors: {
                firstName: '',
                phoneNumber: '',
                email: '',
                message: ''
            }
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            // first check if form is valid
            if (this.isValid(this.state)) {
                console.log(`
                    SUBMIT VALUES:
                    First Name: ${this.state.firstName}
                    Phone Number: ${this.state.phoneNumber}
                    Email: ${this.state.email}
                    Message: ${this.state.message}
                `);
                // send the data to the /send_report api endpoint
                await axios.post('/send_report', {
                    firstName: this.state.firstName,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    message: this.state.message
                });
                this.clearForm();
            }
        } catch(err) {
            // we should log an error here and show "something went wrong please try again" message
            this.clearForm();
            console.log(err);
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;

        // check errors on change
        this.validationErrors(name, value);
        this.setState({errors, [name]: value});
    }

	render() {
        const {errors} = this.state;

		return (
            <div className="form">
                <div className="form-wrapper">
                    <h1>Report a Problem</h1>
                    <form className="form-report" onSubmit={this.handleSubmit} noValidate>
                        <div>
                            <label htmlFor="firstName">Your Name</label>
                            <input
                                type="text"
                                className="form-input"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            />
                            {errors.firstName.length > 0 && (
                                <span className="error">{errors.firstName}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                className="form-input"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                            />
                            {errors.phoneNumber.length > 0 && (
                                <span className="error">{errors.phoneNumber}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            {errors.email.length > 0 && (
                                <span className="error">{errors.email}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea 
                                className="form-input"
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                            />
                            {errors.message.length > 0 && (
                                <span className="error">{errors.message}</span>
                            )}
                        </div>
                        <div className="submit-button">
                            <input className="form-input" type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReportForm;
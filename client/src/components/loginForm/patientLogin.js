import React, { Component } from 'react';
import Input from '../../Assets/Input/Input';
import './login.css';

class PatientLogin extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    pattern: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password!'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    };

    checkValidity(value, rules) {
        let isValid = true;
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (rules.required) {
            isValid = value.trim() !== ' ' && isValid;
        }

        if (rules.pattern) {
            isValid = value.match(pattern) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }


        this.setState({ loginForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.loginForm) {
            formElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        let form = (
            <form onSubmit={e =>
                this.props.onLogin(e, {
                    email: this.state.loginForm.email.value,
                    password: this.state.loginForm.password.value
                })}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}

                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <button type="submit" disabled={!this.state.formIsValid}>SUBMIT</button>
            </form>
        );
        return (
            <div className="Login">
               

                <div className="FormP">
                    <h1>Login as a Patient!</h1>
                    {form}
                </div>

                <img src="https://i.pinimg.com/564x/54/98/60/549860c0b63c45f3223e997f81b04df7.jpg" alt="pat" className="Imgg" />
            </div>
        );
    }
}

export default PatientLogin;

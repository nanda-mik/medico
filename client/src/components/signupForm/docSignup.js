import React, { Component } from 'react';
import Input from '../../Assets/Input/Input';
import { Redirect } from 'react-router';
import "./signupForm.css";

class DocSignup extends Component {
    constructor(props){
        super(props);
        this.state = {
            signupForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
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
                        placeholder: 'Create your password!'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                confPassword: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Confirm your password!'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false,
            login: false
        };
    }
   

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
            ...this.state.signupForm
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


        this.setState({ signupForm: updatedOrderForm, formIsValid: formIsValid });
    }

    GotoLogin() {
        this.setState({ login: true });
    }

    render() {
        const formElementArray = [];
        const formElementArr = [];
        for (let key in this.state.signupForm) {
            formElementArray.push({
                id: key,
                config: this.state.signupForm[key]
            });
        }
        for (let key in this.state.signupForm) {
            formElementArr.push({
                id: key,
                config: this.state.signupForm[key]
            });
        }
        let form = (
            <form onSubmit={e => this.props.onSignup(e, this.state)}>
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

        let redirect = null;
        if (this.state.login) {
            redirect = <Redirect to="/login" />
        }
        return (
            <div className="Signin">
                <div className="Pic">
                    <img src="https://i.pinimg.com/564x/b9/5c/28/b95c288806619d56980b441b91a435f8.jpg" alt="patient" />
                </div>
                <div className="Form">
                    <h1>Are u a Doctor?? Sign-in here!!!</h1>
                    {form}
                    <h3>Already have an account ??? <button type="submit" onClick={() => this.GotoLogin()}>Login here</button></h3>
                    {redirect}
                </div>
            </div>
        );
    }
}

export default DocSignup;

import { Component } from "react"
import Head from "next/head"

import login from "../api/admin-user/login.js"
import authUser from "../api/admin-user/auth.js"
import removeAdminUserCookie from "../api/admin-user/removeAdminUserCookie.js"

// The page consists of both an email address and password input field, along with a submit button
// When the submit button is clicked, a request is sent to the admin REST API that attempts to login the user
// If the email and password match what's stored in the database, the login will be deemed a success
// and you will be redirected to the homepage. If not, the login attempt will fail and error message will be displayed

export default class extends Component {
    static async getInitialProps({ req, res }) {
        const authResult = await authUser(req)

        if (authResult.success) {
            res.writeHead(302, { Location: "/" })
            res.end()
        }

        return {}
    }

    // A React constructor() function that initialises the component's local state by assigning an object to this.state.
    // loading: signifies if the login request is in progress or not.
    // credentialError: signifies if there was an incorrect email address/password credential error when submitting the login request
    // passwordRequiredError: signifies if the password input was empty when the login request was submitted
    // emailRequiredError: signifies if the email address input was empty when the login request was submitted
    // emailInputValue: the string input value for the email address form element
    // passwordInputValue: the string input value for the password form element

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            credentialError: false,
            emailInputValue: "",
            emailRequiredError: false,
            passwordInputValue: "",
            passwordRequiredError: false
        }
    }

    componentDidMount() {
        removeAdminUserCookie()
    }

    // The updateEmailInputValue and updatePasswordInputValue functions
    // control the values in the email address and password form elements. 
    // When values are typed into a form input field, these functions will
    // update the this.state object.

    updateEmailInputValue = (event) => {
        this.setState({
            emailInputValue: event.target.value,
            emailRequiredError: false
        })
    }

    updatePasswordInputValue = (event) => {
        this.setState({
            passwordInputValue: event.target.value,
            passwordRequiredError: false
        })
    }

    // This function is called when the "Login" button is clicked on the page.
    // If either the email or password input value is empty, 
    // an error will be thrown before a request is made to the REST API.
    // While the request is being made, the this.state.loading value will be turned true.
    // The request to the REST API is made with the login() function call.
    submitLoginRequest = () => {
        if (!this.state.emailInputValue || !this.state.passwordInputValue) {
            if (!this.state.emailInputValue) this.setState({ emailRequiredError: true })
            if (!this.state.passwordInputValue) this.setState({ passwordRequiredError: true })
        } else {
            this.setState({ loading: true })

            const self = this

            login(this.state.emailInputValue, this.state.passwordInputValue, function (apiResponse) {
                if (!apiResponse.success) {
                    self.setState({
                        loading: false,
                        credentialError: true,
                        emailRequiredError: false,
                        passwordRequiredError: false
                    })
                } else {
                    window.location.href = "/"
                }
            })
        }
    }

    render() {
        return (
            <div className="layout-wrapper">
                <Head>
                    <title>Login | Admin</title>
                </Head>
                <div className="login-wrapper">
                    <div className="login-content-container">
                        <div className="login-form-container">
                            {
                                this.state.credentialError ?
                                    <div className="login-form-error-block">
                                        <span>Email address and/or password is incorrect.</span>
                                    </div> : null
                            }
                            <div className="login-form-top-header">
                                <span>Admin Login</span>
                            </div>
                            <div className="login-form-field">
                                <input
                                    onChange={this.updateEmailInputValue}
                                    value={this.state.emailInputValue}
                                    type="email"
                                    autoComplete="new-password"
                                    placeholder="Email Address"
                                    className={this.state.credentialError || this.state.emailRequiredError ? "error" : null}
                                />
                                {
                                    this.state.emailRequiredError ?
                                        <div className="login-form-error-msg">
                                            <span>Email field is required.</span>
                                        </div> : null
                                }
                            </div>
                            <div className="login-form-field">
                                <input
                                    onChange={this.updatePasswordInputValue}
                                    value={this.state.passwordInputValue}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    className={this.state.credentialError || this.state.passwordRequiredError ? "error" : null}
                                />
                                {
                                    this.state.passwordRequiredError ?
                                        <div className="login-form-error-msg">
                                            <span>Password field is required.</span>
                                        </div> : null
                                }
                            </div>
                            <div className="login-form-submit-btn-container">
                                {
                                    !this.state.loading ?
                                        <div onClick={() => this.submitLoginRequest()} className="login-form-submit-btn">
                                            <span>Login</span>
                                        </div> :
                                        <div className="login-form-submit-btn loading">
                                            <span>Loading</span>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
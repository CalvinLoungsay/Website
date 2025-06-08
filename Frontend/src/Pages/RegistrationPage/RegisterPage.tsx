import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateEmail, checkExisting, registerUser, handleRedirect } from '../../Components/AuthComponents';
import "../../CSS/AuthPage.css";

export function RegisterPage() {
    /* Use states for variables needed for register */
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    /* Navigator function object */
    const navigate = useNavigate();

    /* Attempts to register user when all fields are filled and valid */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        /* Checks if any field is empty */
        if (email === "" || username === "" || password === "" || password2 === "") {
            const errorElement = document.getElementById("errorMessage");
            if (errorElement) {
                errorElement.textContent = "Please fill in all fields";
                /* Do a shake animation to show user's login failed */
                errorElement.classList.add("shake");

                /* Remove the shake animation */
                setTimeout(() => {
                    errorElement.classList.remove("shake");
                }, 300);
            }
            return;
        }

        /* Checks if a valid email is set in the email field */
        if (!validateEmail(email)) {
            const errorElement = document.getElementById("errorMessage");
            if (errorElement) {
                errorElement.textContent = "Please enter a valid email";
                /* Do a shake animation to show user's login failed */
                errorElement.classList.add("shake");

                /* Remove the shake animation */
                setTimeout(() => {
                    errorElement.classList.remove("shake");
                }, 300);
            }
            return;
        }

        /* Checks if the user reentered the same password */
        if (password != password2) {
            const errorElement = document.getElementById("errorMessage");
            if (errorElement) {
                errorElement.textContent = "Passwords do not match";
                /* Do a shake animation to show user's login failed */
                errorElement.classList.add("shake");

                /* Remove the shake animation */
                setTimeout(() => {
                    errorElement.classList.remove("shake");
                }, 300);
            }
            return;
        }

        /* Checks if the user already exists in the database */
        const userExists = await checkExisting(email);
        if (userExists) {
            const errorElement = document.getElementById("errorMessage");
            if (errorElement) {
                errorElement.textContent = "Email has an account associated with it already";
                /* Do a shake animation to show user's login failed */
                errorElement.classList.add("shake");

                /* Remove the shake animation */
                setTimeout(() => {
                    errorElement.classList.remove("shake");
                }, 300);
            }
            return;
        }

        const success = await registerUser(email, password, username);
        /* If user successfully registered and logged in redirect to previous page before login */
        if (success) {
            handleRedirect(navigate);
        } else {

            const errorElement = document.getElementById("errorMessage");
            if (errorElement) {
                errorElement.textContent = "Error with registering";
                /* Do a shake animation to show user's login failed */
                errorElement.classList.add("shake");

                /* Remove the shake animation */
                setTimeout(() => {
                    errorElement.classList.remove("shake");
                }, 300);
            }
        }
    }

    return (<>
        <Form onSubmit={handleSubmit} className="new-item-form justify-content-center d-flex">
            <Col className="loginCol">
                <Row className="d-flex justify-content-center">
                    <h2 className="d-flex justify-content-center titleText"> User Register </h2>
                </Row>
                <Row className="d-flex justify-content-center">
                    {/* Value - Email to be used for register
                        onChange - On change of text field set email variable to value*/}
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        id="emailField"
                        placeholder="Enter Email"
                        className="emailField"
                        bsPrefix="emailField"
                    />
                </Row>
                <Row className="d-flex justify-content-center">
                    {/* Value - Username to be used for register
                        onChange - On change of text field set username variable to value*/}
                    <Form.Control
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        id="nameField"
                        placeholder="Enter Username"
                        className="emailField"
                        bsPrefix="emailField"
                    />
                </Row>
                <Row className="d-flex justify-content-center">
                    {/* Value - Password to be used for register
                        onChange - On change of text field set password variable to value*/}
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        id="passField"
                        placeholder="Enter Password"
                        className="emailField"
                        bsPrefix="emailField"
                    />
                </Row>
                <Row className="d-flex justify-content-center">
                    {/* Value - Password to be used for verifying user entered their correct password
                        onChange - On change of text field set password2 variable to value*/}
                    <Form.Control
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        type="password"
                        id="passField"
                        placeholder="Reenter Password"
                        className="passField"
                        bsPrefix="passField"
                    />
                </Row>
                {/* Hidden error message container for when user fails register */}
                <Row>
                    <h5 id="errorMessage" className="errorMessage d-flex justify-content-center"></h5 >
                </Row>
                <Row className="d-flex justify-content-center authBtnContainer">
                    <Button type="submit" className="loginBtn" bsPrefix="loginBtn">
                        <h5 className="authBtnText"> Register </h5>
                    </Button>
                </Row>
                <Row className="d-flex justify-content-center authBtnContainer">
                    <Button onClick={() => { navigate('/login'); }} className="registerBtn" bsPrefix="registerBtn">
                        <h5 className="authBtnText"> Back to Login </h5>
                    </Button>
                </Row>
            </Col>
        </Form >
    </>
    )
}

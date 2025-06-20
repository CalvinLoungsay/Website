import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, handleRedirect } from '../../Components/AuthComponents';
import "../../CSS/AuthPage.css";

/* Login Page Component */
export function LoginPage() {
    /* Use states for variables needed for login */
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    /* Navigator Function object */
    const navigate = useNavigate()

    /* Calls login user when submit is clicked and fields are not empty */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        /* If either field is empty return */
        if (email === "" || password === "") {
            return
        }

        const success = await loginUser(email, password);
        /* If the login was a success redirect to previous page */
        if (success) {
            handleRedirect(navigate);
            /* Login failed so show an error message */
        } else {

            const errorElement = document.getElementById("errorMessage");
            if (errorElement) {
                errorElement.textContent = "Login failed, please check your credentials again.";
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
                    <h2 className="d-flex justify-content-center titleText"> User Login </h2>
                </Row>
                <Row className="d-flex justify-content-center">
                    {/* Value - Email to be used for login
                        onChange - On change of field set it to email variable */}
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
                    {/* Value - Password to be used for login
                        onChange - On change of field set it to password variable */}
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        id="passField"
                        placeholder="Enter Password"
                        className="passField"
                        bsPrefix="passField"
                    />
                </Row>
                {/* Hidden error message container for when user fails login */}
                <Row>
                    <h5 id="errorMessage" className="errorMessage d-flex justify-content-center"></h5 >
                </Row>
                <Row className="d-flex justify-content-center authBtnContainer">
                    <Button type="submit" className="loginBtn" bsPrefix="loginBtn">
                        <h5 className="authBtnText"> Login </h5>
                    </Button>
                </Row>
                <Row className="d-flex justify-content-center authBtnContainer">
                    <Button onClick={() => { navigate('/register'); }} className="registerBtn" bsPrefix="registerBtn">
                        <h5 className="authBtnText"> Register </h5>
                    </Button>
                </Row>
            </Col>
        </Form >
    </>
    )
}
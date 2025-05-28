import { Container, Row, Col } from 'react-bootstrap';
import "../CSS/Footer.css";

export const FooterComp = () => (
    <footer className="footer mt-auto">
        <Container fluid>
            <Row className="justify-content-center text-center">
                <Col md={12} lg="auto">
                    <p className="footerText">
                        Useful Links — &nbsp;
                        <a href="https://www.linkedin.com/in/calvin-loungsay-5b16691b7" className="footerText" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        &emsp;
                        <a href="https://github.com/CalvinLoungsay" className="footerText" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </p>
                </Col>
                <Col md={12} lg="auto">
                    <p className="footerText">
                        Contact — <a href="mailto:Calvin.Loungsay@gmail.com" className="footerText">Calvin.Loungsay@gmail.com</a>
                    </p>
                </Col>
            </Row>
        </Container>
    </footer>
);
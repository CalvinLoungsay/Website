import { Container, Row, Col, Button } from 'react-bootstrap';

export function HomePage() {
    return (<>
        <h1>homepage</h1>
        <h1>12e</h1>
        <Button variant = "danger">
            Danger
        </Button>
        <Container>
            <Row>
                <Col>
                Hellow World!
                </Col>
            </Row>
        </Container>
    </>
    )
}
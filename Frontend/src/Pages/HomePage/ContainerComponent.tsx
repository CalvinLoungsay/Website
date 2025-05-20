import { Row, Col, Form } from 'react-bootstrap'
import "../../CSS/Home.css"
import TruncateMarkup from 'react-truncate-markup'

interface ContainerProps {
    s: number
    lg: number
    title: string
    desc: string
    date: string
    clName: string
}

/* Todo Component */
export const ContainerComp = (props: ContainerProps) => {

    return (<>
        <Col s={props.s} lg={props.lg} className={props.clName}>
            <Row className="title"><text className="title">{props.title}</text></Row>
            <Row>
                <TruncateMarkup lines={15}>
                    <text className="desc">{props.desc}</text>
                </TruncateMarkup>
            </Row>
        </Col>
    </>
    )
}
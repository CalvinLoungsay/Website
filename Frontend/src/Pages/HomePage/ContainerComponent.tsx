import { Row, Col } from 'react-bootstrap'
import "../../CSS/Home.css"
import TextTruncate from 'react-text-truncate'

interface ContainerProps {
    xs: number
    md: number
    title: string
    desc: string
    date: string
    clName: string
}

/* Container Component mainly to hold text with a title and desc */
export const ContainerComp = (props: ContainerProps) => {

    return (<>
        <Col xs={props.xs} md={props.md} className={props.clName}>
            <Row className="title"><h1 className="title">{props.title} </h1>
                <h5 className="date">{props.date}</h5>
            </Row>
            <Row>
                <div className="desc">
                    <TextTruncate
                    line={15}
                    element="h2"
                    truncateText="..."
                    text={props.desc}
                />
                </div>
            </Row>
        </Col>
    </>
    )
}
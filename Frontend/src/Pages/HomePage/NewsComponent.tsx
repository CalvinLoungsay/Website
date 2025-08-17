import { Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../CSS/Home.css"
import type { News } from '../../Components/Interfaces';

/* Props form news page */
interface ContainerProps {
    news: News
    isAdmin: boolean
}

/* Container Component mainly to hold text with a title and desc */
export const NewsComp = (props: ContainerProps) => {
    /* Use states */
    const [title, setTitle] = useState(props.news.title);
    const [desc, setDesc] = useState(props.news.desc);
    /* Navigate object */
    const navigate = useNavigate();

    /* Function to move to the details page of a news */
    const showDetails = () => {
        navigate('/news/' + props.news._id, { state: { props } });
    }

    /* Create date from string found in API */
    const date = new Date(props.news.createdAt);
    /* Edit date from string found in API */
    const editDate = new Date(props.news.updatedAt);
     /* Formats the date to Canadian format */
    const formattedDate = `${date.getDate()} ${date.toLocaleString("en-CA", { month: "long" })} ${date.getFullYear()}`;
    const formattedEditDate = `${editDate.getDate()} ${editDate.toLocaleString("en-CA", { month: "long" })} ${editDate.getFullYear()}`;

    return (<>
        <div className="d-flex newsItemContainer">
            <Col className="newsItem">
                {/* Title */}
                <Row className="title d-flex ">
                    <Col xs={10} sm={10} lg={10} className="d-flex">
                        {
                            <h1 className="title" onClick={showDetails}>{title}</h1>
                        }
                    </Col>
                </Row>
                {/* Date created and editted */}
                <Row>
                    {props.news.createdAt === props.news.updatedAt ? (
                        <h5 className="date">{formattedDate}</h5>
                    ) : (
                        <h5 className="date">{formattedDate}  | Last Updated On - {formattedEditDate}</h5>
                    )}
                </Row>
                {/* Description */}
                <Row>
                    <div className="desc">
                        <span>{desc}</span>
                    </div>
                </Row>
            </Col>
        </div>
    </>
    )
}
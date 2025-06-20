import { Row, Col, Button, Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import "../../CSS/Home.css"
import TextTruncate from 'react-text-truncate'
import { editNews } from '../../Components/NewsFunction';
import { News } from './HomePage.tsx'

interface newsDetailsProps {
    xs: number
    md: number
    news: News
    clName: string
    isAdmin: boolean
}

/* Container Component mainly to hold text with a title and desc */
export const NewsDetailsPage = (props: newsDetailsProps) => {
    const [isEditing, isEditingState] = useState<boolean>(false);
    const [title, setTitle] = useState(props.news.title);
    const [desc, setDesc] = useState(props.news.desc);

    const handleSubmit = () => {
        editNews(title, desc, props.news._id);
        isEditingState(false); // Exit edit mode
    };

    const date = new Date(props.news.createdAt);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("en-CA", { month: "long" })} ${date.getFullYear()}`;
    const editDate = new Date(props.news.updatedAt);
    const formattedEditDate = `${editDate.getDate()} ${editDate.toLocaleString("en-CA", { month: "long" })} ${editDate.getFullYear()}`;

    return (<>
        <Container className="d-flex">
            <Col xs={props.xs} md={props.md} className={props.clName}>
                <Row className="title">
                    <Col xs={10} sm={10} lg={10} className="d-flex">
                        {!isEditing ? (
                            <h1 className="title">{title}</h1>
                        ) : (
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="title-edit"
                            />
                        )}

                    </Col>
                    <Col xs={2} sm={2} lg={2} className="d-flex justify-content-end">
                        {props.isAdmin && !isEditing && (
                            <Button onClick={() => isEditingState(true)} className="adminBtn" bsPrefix="adminBtn">Edit</Button>
                        )}
                        {props.isAdmin && isEditing && (
                            <Button onClick={handleSubmit} className="adminBtn" bsPrefix="adminBtn">Finish</Button>
                        )}
                    </Col>

                </Row>
                <Row>
                    {props.news.createdAt === props.news.updatedAt ? (
                        <h5 className="date">{formattedDate}</h5>
                    ) : (
                        <h5 className="date">{formattedDate}  |  Editted On {formattedEditDate}</h5>
                    )}
                </Row>
                <Row>
                    <div className="desc">
                        {!isEditing ? (
                            <TextTruncate
                                line={15}
                                element="h2"
                                truncateText="..."
                                text={desc}
                            />
                        ) : (
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="desc-edit"
                            />
                        )}
                    </div>
                </Row>
            </Col>
        </Container>
    </>
    )
}
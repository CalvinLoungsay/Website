import { Row, Col, Button, Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import "../../CSS/Home.css"
import TextTruncate from 'react-text-truncate'
import { editNews } from '../../Components/NewsFunction';
import type { News } from '../../Components/Interfaces.ts';
import { useLocation, useParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFound/NotFoundPage.tsx';
import { getSingleNews } from '../../Components/NewsFunction';
import { isAdmin } from '../../Components/AuthComponents.ts';

/* Container Component mainly to hold text with a title and desc */
export const NewsDetailsPage = () => {

    /* Location object */
    const location = useLocation();
    /* Gets id from params and props from the previous state */
    const prevState = location.state?.props;
    const { newsId } = useParams();

    /* Use States */
    const [newsItem, setNewsItem] = useState<News>(prevState?.news);
    const [isAdminProp, setIsAdminProp] = useState<boolean>(prevState?.isAdmin ?? false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(prevState?.news?.title ?? '');
    const [desc, setDesc] = useState<string>(prevState?.news?.desc ?? '');

    /* Use Effects */

    /* If previous state does not exist and news id does get news data from api */
    useEffect(() => {
        if (!prevState && newsId) {
            const fetchNewsItem = async () => {
                const news = await getSingleNews(newsId);
                const check = await isAdmin();
                console.log(check);
                if (check) {
                    setIsAdminProp(true);
                }
                setNewsItem(news);
            };
            fetchNewsItem();
        }
        console.log(prevState);
    }, [newsId, prevState, newsItem]);

    /* If previous state exists get news data from previous state */
    useEffect(() => {
        if (newsItem) {
            setTitle(newsItem.title);
            setDesc(newsItem.desc);
        }
    }, [newsItem]);

    /* If news Item does not exist return not found page */
    if (!newsItem) return <NotFoundPage />;

    /* Handles finish editting click */
    const handleSubmit = () => {
        editNews(title, desc, prevState.news._id);
        setIsEditing(false); // Exit edit mode
    };
    /* Create date from string found in API */
    const date = new Date(newsItem.createdAt);
    /* Edit date from string found in API */
    const editDate = new Date(newsItem.updatedAt);
    /* Formats the date to Canadian format */
    const formattedDate = `${date.getDate()} ${date.toLocaleString("en-CA", { month: "long" })} ${date.getFullYear()}`;
    const formattedEditDate = `${editDate.getDate()} ${editDate.toLocaleString("en-CA", { month: "long" })} ${editDate.getFullYear()}`;


    return (<>
        <Container className="d-flex">
            <Col xs={12} md={12} className="newsItem">
                <Row className="title d-flex">
                    {/* Title if isEditting then make the title a textbox */}
                    <Col xs={10} sm={10} lg={10} className="d-flex">
                        {!isEditing ? (
                            <h1 className="title d-flex">{title}</h1>
                        ) : (
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="titleEdit"
                                bsPrefix="titleEdit"
                            />
                        )}

                    </Col>
                    {/* Edit button that only shows up if they're an admin */}
                    <Col xs={2} sm={2} lg={2} className="d-flex justify-content-end">
                        {isAdminProp && !isEditing && (
                            <Button onClick={() => setIsEditing(true)} className="adminBtn" bsPrefix="adminBtn">Edit</Button>
                        )}
                        {isAdminProp && isEditing && (
                            <Button onClick={handleSubmit} className="adminBtn" bsPrefix="adminBtn">Finish</Button>
                        )}
                    </Col>
                </Row>
                {/* Date created and last editted */}
                <Row><h5 className="date">Posted On : {formattedDate}</h5>
                    {newsItem.createdAt != newsItem.updatedAt && (
                        <h5 className="date">Last Updated : {formattedEditDate}</h5>
                    )}
                </Row>
                {/* Description that changes to a textbox when isEditting */}
                <Row>
                    <div className="desc">
                        {!isEditing ? (
                            <TextTruncate
                                line={15}
                                element="span"
                                truncateText="..."
                                text={desc}
                            />
                        ) : (
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="descEdit"
                                bsPrefix="descEdit"
                            />
                        )}
                    </div>
                </Row>
            </Col>
        </Container>
    </>
    )
}
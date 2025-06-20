import { Container, Row, Col } from 'react-bootstrap';
import { NewsComp } from './NewsComponent';
import TextTruncate from 'react-text-truncate';
import "../../CSS/Home.css";
import { useState, useEffect } from 'react';
import { getNews } from '../../Components/NewsFunction';
import { isAdmin } from '../../Components/AuthComponents';

export interface News {
    _id: string
    title: string,
    desc: string,
    createdAt: Date,
    updatedAt: Date
}

/* Home/news page */
export function HomePage() {

    /* Use states */
    const [newsItems, setNewsItems] = useState<News[]>([]);
    const [isAdminState, setIsAdminState] = useState<boolean>(false);

    /* Use Effects */

    /* Checks whether user is an admin or not */
    useEffect(() => {
        const fetchAdminStatus = async () => {
            const admin = await isAdmin();
            setIsAdminState(admin);
        };

        fetchAdminStatus();
    }, []);

    /* Gets all the news items in reverse order for displaying */
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const news = await getNews();
                setNewsItems(news.reverse());
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    return (
        <Container fluid className="homeContainer">
            <Row className="rowContainer">
                {/* News Section */}
                <Col xs={12} md={8} lg={7} className="newsContainer">
                    <h2 className="newsHeader">News</h2>
                    {newsItems.map(news => (
                        <NewsComp news={news} isAdmin={isAdminState} key={news._id}></NewsComp>
                    ))}
                </Col>

                {/* Changelog Section */}
                <Col xs={12} md={4} lg={3} className="changelogContainer">
                    <Col xs={12} md={12} className="changelogItem">
                        <h3 className="changeTitle">Change log</h3>

                        <div key="change1">
                            <a href="/about">
                                <h1 className="newChangeTitle">Change 1</h1>
                            </a>
                            <div className="newChangeDesc">
                                <TextTruncate
                                    line={5}
                                    element="p"
                                    truncateText="..."
                                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                />
                            </div>

                        </div>
                        <div key="change2">
                            <a href="/about">
                                <h1 className="newChangeTitle">Change 2</h1>
                            </a>
                            <div className="newChangeDesc">
                                <TextTruncate
                                    line={5}
                                    element="p"
                                    truncateText="..."
                                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                />
                            </div>

                        </div>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}
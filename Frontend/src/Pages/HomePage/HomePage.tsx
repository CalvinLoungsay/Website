import { Container, Row, Col } from 'react-bootstrap';
import { ContainerComp } from './ContainerComponent';
import TextTruncate from 'react-text-truncate';
import "../../CSS/Home.css";
import { useState, useEffect } from 'react';

interface News {
    title: string,
    desc: string,
    date: string,
}

/* Home/news page */
export function HomePage() {
    const [newsItems, setNewsItems] = useState<News[]>([]);

    useEffect(() => {
        /* Sample Test Data */
        setNewsItems([
            { title: "News Item 1", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", date: "May 5th 2025" },
            { title: "News Item 2", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", date: "May 5th 2025" },
            { title: "News Item 3", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", date: "May 5th 2025" }
        ]);
    }, []);

    return (
        <Container fluid className="homeContainer">
            <Row className="rowContainer">
                {/* News Section */}
                <Col xs={12} md={7} className="newsContainer">
                    <h2 className="newsHeader">News</h2>
                    {newsItems.map(news => (
                        <ContainerComp xs={12} md={12} title={news.title} desc={news.desc} date={news.date} clName="newsItem" key={news.title + news.date}></ContainerComp>
                    ))}
                </Col>

                {/* Changelog Section */}
                <Col xs={12} md={5} lg={4} className="changelogContainer">
                    <Col xs={12} md={12} className="changelogItem">
                        <h3 className="changeTitle">Change log</h3>

                        <div key="change1">
                            <a href="/about">
                                <h1 className="newChangeTitle">Change 1</h1>
                            </a>
                            <div className="newChangeDesc">
                                <TextTruncate
                                    line={6}
                                    element="h2"
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
                                    line={6}
                                    element="h2"
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
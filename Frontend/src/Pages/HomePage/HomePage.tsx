import { Container, Row, Col } from 'react-bootstrap';
import { NewsComp } from './NewsComponent';
import "../../CSS/Home.css";
import { useState, useEffect } from 'react';
import { getNews } from '../../Components/NewsFunction';
import { isAdmin } from '../../Components/AuthComponents';
import type { News } from '../../Components/Interfaces';

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
                            <h1 className="newChangeTitle">Initial release of website</h1>
                            <p className="newChangeTitle">17th August, 2025</p>
                            <div className="newChangeDesc">
                                <p>"Recipe App added, hosting, and testing."</p>
                            </div>

                        </div>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}
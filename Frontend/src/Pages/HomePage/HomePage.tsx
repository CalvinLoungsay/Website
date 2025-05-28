import { Container, Row, Col } from 'react-bootstrap';
import { ContainerComp } from './ContainerComponent'
import TruncateMarkup from 'react-truncate-markup';
import "../../CSS/Home.css"

export function HomePage() {
    return (<>
        <Container fluid className="homeContainer">
            <Row className="rowContainer">
                <Col s={11} md={7} className="newsContainer">
                    <h2 className="newsHeader">News</h2>
                    <ContainerComp s={11} md={12} title="News Item 1" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." date="May 5th 2025" clName="newsItem"></ContainerComp>
                    <ContainerComp s={11} md={12} title="News Item 2" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." date="May 5th 2025" clName="newsItem"></ContainerComp>
                    <ContainerComp s={11} md={12} title="News Item 3" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." date="May 5th 2025" clName="newsItem"></ContainerComp>
                </Col>
                <Col fluid s={11} md={3} className="changelogContainer">
                    <Col s={11} md={12} className="changelogItem">
                        <h3 className="changeTitle">Change log</h3>
                        <a href="/about"><text className="newChangeTitle">Change 1</text></a>
                        <TruncateMarkup lines={3}>
                            <text className="newChangeDesc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</text>
                        </TruncateMarkup>
                        <a href="/about"><text className="newChangeTitle">Change 2</text></a>
                        <TruncateMarkup lines={3}>
                            <text className="newChangeDesc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</text>
                        </TruncateMarkup>
                    </Col>
                </Col>
            </Row>
        </Container>
    </>
    )
}
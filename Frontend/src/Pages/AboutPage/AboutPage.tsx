import { Container, Row, Col } from 'react-bootstrap';
import "../../CSS/About.css"
import CalvinImage from '../../assets/Calvin.jpg';
/* About page Component */
export function AboutPage() {
    return (<>
        <Container fluid className="homeContainer">
            <Row className="rowContainer d-flex justify-content-center">
                <Col s={11} md={10}>
                    <Container className="aboutContainer">
                        <h1></h1>
                        <h1 className="aboutTitle d-flex justify-content-center">About Me</h1>
                        <Col className="d-flex justify-content-center">
                            <img src={CalvinImage} className="selfImage"></img>
                        </Col>
                        <h1 className="info d-flex justify-content-center">LinkedIn - https://www.linkedin.com/in/calvin-loungsay-5b16691b7</h1>
                        <h1 className="info d-flex justify-content-center">Github - https://github.com/CalvinLoungsay</h1>
                        <h1 className="info d-flex justify-content-center">Email - Calvin.Loungsay@gmail.com</h1>
                        <p className="aboutDesc">&emsp;&emsp;&emsp;
                            Hello, my name is Calvin Loungsay a graduate from British Columbia's Institute of Technology.
                            During my time at BCIT I finished two programs which include the Computer Systems Technology (CST) diploma, with the web and mobile dev option
                            and aswell as the Bachelor of Technology (BTECH) with a game development focus. Using what I learned
                            from BCIT I continue to learn more about development both on the web and in game dev.
                        </p>
                        <p className="aboutDesc">&emsp;&emsp;&emsp;
                            In the CST program I've worked with many languages that include Java, Javascript, Python, PHP and C#.
                            Many of the skills I learned from the web and mobile courses, is used in the creation of this
                            website and the web apps found within. I've also worked with Docker, .NET, SQL, and done many
                            restful api's for coursework and client sponsored projects. To compliment these skills
                            I have experience using Microsoft Azure, Firebase, and Heroku to hold data or host websites.
                            I've also done multiple courses that include coding for Android apps using Android Studio,
                            and briefly in Swift for ios apps. No matter what language I am confident I am able to
                            learn quickly and use effectively, espescially if its a web technology and would love to
                            prove it.
                        </p>
                        <p className="aboutDesc">&emsp;&emsp;&emsp;
                            In my bachelors I pursued one of my passions in gaming as I work to create games, as well as hone
                            additional coding skills in artificial intelligence and algorithms. I primarily used Unity for creation of
                            games, where I focused more on game balance and the map of the game for my teams. For my final project
                            I created a chess game in Godot that utilized voxel models that I created myself, and was able to be played
                            on lan and online when a server is purchased. It was my first time doing online play and it was working
                            with a new game engine in Godot.
                        </p>
                    </Container>
                </Col>
            </Row>
        </Container>
    </>
    )
}
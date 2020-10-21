import React from "react";
import './bookmark2.css';
import text1 from '../Bookmark2/jame.png'
import text2 from './text2.png'
import jame from './jame.png'
import yoda from './yoda.png'
import { Container, Card, CardImg, CardBody, CardTitle, CardDeck} from 'reactstrap';

const Bookmark2 = () => {
    return (
        <div>
            <div className="bodyBook">
                <h1 id="headerBook">Bookmark</h1>
                <Container className="BookmarkPet">
                    <CardDeck className="BookmarkPet">
                        <Card className="card">
                            <CardImg src={text1} alt=""/>
                            <CardBody className="cardBody">
                                <CardTitle className="cardTitle">PetName</CardTitle>
                            </CardBody>
                        </Card>
                        <Card className="card">
                            <CardImg src={jame} alt=""/>
                            <CardBody className="cardBody">
                                <CardTitle className="cardTitle">PetName</CardTitle>
                            </CardBody>
                        </Card>
                        <Card className="card">
                            <CardImg src={yoda} alt=""/>
                            <CardBody className="cardBody">
                                <CardTitle className="cardTitle">PetName</CardTitle>
                            </CardBody>
                        </Card>
                        <Card className="card">
                            <CardImg src={text2} alt=""/>
                            <CardBody className="cardBody">
                                <CardTitle className="cardTitle">PetName</CardTitle>
                            </CardBody>
                        </Card>
                    </CardDeck>
                </Container>
            </div>
        </div>
    )
}

export default Bookmark2;
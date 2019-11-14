import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import CounterToWappu from './CounterToWappu';
import SkewedContainer from 'sc-react';

class Header extends Component {
    render() {
        return (
            <div>
                <SkewedContainer className="header-class" bottom="left">
                    <Jumbotron fluid>
                        <Container>
                            <h1 className="text-center">TURUN TEEKKARIWAPPU</h1>
                            <CounterToWappu />
                            <p className="text-center medium-font">
                                <i>#turunwappu</i>
                            </p>
                            <p className="text-center medium-font">
                                Presented by<br />
                                <b><a href="https://digit.fi">Digit</a></b> & <b><a href="https://www.nucleus.fi">Nucleus</a></b><br />
                                <span className="menossa-mukana">
                                    Menossa mukana myös <b><a href="http://teekkarikomissio.utu.fi/fi/index.html">Teekkarikomissio</a></b> & <b><a href="https://www.asteriski.fi">Asteriski</a></b>
                                </span>
                            </p>
                        </Container>
                    </Jumbotron>
                </SkewedContainer>
            </div>
        );
    }
}

export default Header;

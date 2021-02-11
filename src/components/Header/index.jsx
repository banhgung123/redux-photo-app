import PropTypes from 'prop-types';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <header className="header">
            <Container>
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <a
                            className="header__link header__title"
                            href="https://www.youtube.com/lamvlog"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lam Vlog    
                        </a>
                    </Col>
                    <Col xs="auto">
                        <NavLink
                            exact
                            className="header__link"
                            to="/photos"
                            activeClassName="header__link--active"
                        >
                            Redux Project
                            </NavLink>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
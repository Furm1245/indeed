import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';


const MainNavigation = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [expanded, setExpanded] = useState(false);

    const onLogOut = () => {
        auth.logout()
        navigate('/')
    }

    return (
        <Navbar collapseOnSelect expand="md" variant='dark' bg="dark" expanded={expanded} >
            <Container>
                <Navbar.Brand as={Link} to='/' className="justify-content-start">React Indeed</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to='/' onClick={() => setExpanded(false)} >Home</Nav.Link>
                        {!auth.isLoggedIn && (
                            <Nav.Link as={Link} to='/auth' onClick={() => setExpanded(false)}>SignUp/Login</Nav.Link>
                        )}
                        {auth.isLoggedIn && (
                            <Nav.Link as={Link} to='/new' onClick={() => setExpanded(false)}>Post Job</Nav.Link>
                        )}
                        {auth.isLoggedIn && (
                            <Button onClick={onLogOut} variant="outline-light">LOGOUT</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );;
}
export default MainNavigation
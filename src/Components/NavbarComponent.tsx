import { useLocation } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import "../CSS/Navbar.css"


export function NavbarComponent() {

    let location = useLocation()

    return (<>
        <Navbar expand="lg" className="navColour py-0">
            <Navbar.Brand className="navBrand" href="/"><h4 className = "navBrandText">Calvin Loungsay</h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3 collapseBtn" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 navComponent" activeKey = {location.pathname}>
                    <Nav.Link href="/" className="NavLinkContainer"><h5 className="navLinkItem">Home</h5></Nav.Link>
                    <Nav.Link href="/todoList"><h5 className="navLinkItem">Todo List</h5></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
    )
}
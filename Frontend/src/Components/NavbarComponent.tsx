import { useLocation } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import "../CSS/Navbar.css"


export function NavbarComp() {

    let location = useLocation()

    return (<>
        <Navbar sticky="top" expand="md" className="navColour py-0">
            <Navbar.Brand className="navBrand" href="/"><h5 className="navBrandText">Calvin Loungsay</h5></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mx-2 collapseBtn" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 navComponent" activeKey={location.pathname}>
                    <Nav.Link href="/" className="NavLinkContainer"><h5 className="navLinkItem">Home</h5></Nav.Link>
                    <Nav.Link href="/todoList"><h5 className="navLinkItem">Todo List</h5></Nav.Link>
                    <Nav.Link href="/about"><h5 className="navLinkItem">About</h5></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <div className="fixOffset"></div>
    </>
    )
}
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../CSS/Navbar.css";
import { checkLogin, signout } from "./AuthComponents";

/* Navbar component */
export function NavbarComp() {

    /* Location function object */
    let location = useLocation();
    /* Boolean of whether user is logged in or not */
    const isLoggedIn = checkLogin();
    /* Navigator function */
    const navigate = useNavigate();

    /* Handles nav item click*/
    function navClick(newPage: string) {
        localStorage.setItem("previousPage", location.pathname);
        navigate(newPage, { state: { from: location } });
    }

    return (<>
        <Navbar sticky="top" expand="md" className="navColour py-0">
            <Navbar.Brand className="navBrand" href="/"><h5 className="navBrandText">Calvin Loungsay</h5></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mx-2 collapseBtn" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* Navbar links to other pages */}
                <Nav className="justify-content-end flex-grow-1 navComponent" activeKey={location.pathname}>
                    <Nav.Link onClick={() => navClick("/")
                    }>
                        <h5 className="navLinkItem">Home</h5>
                    </Nav.Link>
                    <Nav.Link onClick={() => navClick("/todoList")
                    }>
                        <h5 className="navLinkItem">Todo List</h5>
                    </Nav.Link>
                    <Nav.Link onClick={() => navClick("/about")}>
                        <h5 className="navLinkItem">About</h5>
                    </Nav.Link>
                    <Nav.Link onClick={() => navClick("/recipe")}>
                        <h5 className="navLinkItem">Recipe App</h5>
                    </Nav.Link>

                    {/* if user is logged in show signout */
                        isLoggedIn && (
                            <Nav.Link href="#!" className="navLinkContainer" onClick={() => {
                                localStorage.setItem("previousPage", location.pathname);
                                signout(navigate);
                            }}>
                                <h5 className="navLinkItem">Signout</h5>
                            </Nav.Link>
                        )}
                    {/* If user is not signed in show login */
                        !isLoggedIn && (
                            <Nav.Link onClick={() => navClick("/login")
                            }>
                                <h5 className="navLinkItem">Login</h5>
                            </Nav.Link>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar >

        {/* Fixes offset caused by navbar being fixed at top of screen*/}
        <div className="fixOffset"></div>
    </>
    )
}
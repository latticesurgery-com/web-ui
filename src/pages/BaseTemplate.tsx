/** @jsxImportSource @emotion/react */
import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import "./BaseTemplate.css"
import { css } from "@emotion/react"
import UploadCircuitPage from "./UploadCircuitPage"

import { AppState } from "../appState"

const BaseTemplate = (): JSX.Element => {
    // This section handles the state of the web application, either in circuit upload or in lattice view.
    // TODO handle with Redux
    const [appState, setAppState] = React.useState(new AppState())

    return (
        <>
            <div
                css={css`
                    background-color: black;
                `}
            >
                <h1
                    className="aquire"
                    css={css`
                        color: #f0f0f0;
                        text-align: center;
                    `}
                    id="title"
                >
                    Lattice Surgery Quantum Error Correction Compiler
                </h1>

                <div
                    className="container p-0"
                    css={css`
                        background-color: white;
                    `}
                >
                    <Navbar bg="dark" variant="dark" expand="lg" className="the-navbar">
                        <Container>
                            <Navbar.Brand href="#title">LSC</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#get-started">Get Started</Nav.Link>
                                    <Nav.Link href="#about">About</Nav.Link>
                                    <Nav.Link href="#surface-codes">
                                        Surface Codes and Lattice Surgery
                                    </Nav.Link>
                                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
                                    {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
                                    {/* <NavDropdown.Divider /> */}
                                    {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                    {/* </NavDropdown> */}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <div className="px-3">
                        <UploadCircuitPage appState={appState} setAppState={setAppState} />
                    </div>
                    <div className="px-0">
                        <footer
                            className="foot-bg"
                            css={css`
                                padding: 0px;
                            `}
                        >
                            <div className="container">
                                <div className="flex-container justify-content-center">
                                    <div>
                                        <a href="https://github.com/latticesurgery-com/lattice-surgery-compiler/">
                                            <i className="fab fa-github fa-3x" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BaseTemplate

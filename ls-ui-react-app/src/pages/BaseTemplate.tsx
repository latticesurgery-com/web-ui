/** @jsxImportSource @emotion/react */
import React, {useEffect} from 'react'
import $ from 'jquery'
import './BaseTemplate.css'
import './LatticeViewPage.css'
import {css} from '@emotion/react';
import UploadCircuitPage from "./UploadCircuitPage";

import {AppState} from "../appState";

const anchor_position_shift = (window: Window) =>
{
    // @ts-ignore
    if ($(window).width() > 991)
    {
        const anchor_elements = $(".anchor-mob");
        anchor_elements.toggleClass("anchor-mob anchor-pc");
    } else
    {
        const anchor_elements = $(".anchor-pc");
        anchor_elements.toggleClass("anchor-pc anchor-mob")
    }
};

const BaseTemplate = () =>
{
    // This section handles the state of the web application, either in circuit upload or in lattice view.
    // TODO handle with Redux
    const [appState , setAppState] = React.useState( new AppState() )

    // Script that runs after render (like adding to a $(document).read() in <script> tag)
    // In this case it does to things: handle nav bar collapsing set a window on scroll event
    useEffect(() =>
    {
        // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
        // Collapse Mobile Navbar after link click
        $('.navbar-collapse a').click(function ()
        {
            // Can't find collapse method, looks like might be injectetby jquery ui. Got to find out how (TODO)
            // The page seems to be fine wthout it though
            //$(".navbar-collapse").collapse('hide');
        });

        window.onscroll = () =>
        {
            anchor_position_shift(window)
        };
    })

    return <>
        <div css={css`background-color: black; padding:10px`}>
            <h1 className='aquire' css={css`color:#f0f0f0;text-align: center;`}>Lattice Surgery Quantum Error Correction
                Compiler</h1>
        </div>
        <div css={css`background-color: black`}>
            <div className="container" css={css`background-color: white;min-height:500px;`}>
                <div className="sticky-top" css={css`margin:-12px`}>
                    <nav id="the-navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#get-started">Get Started</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#about">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#surface-codes">Surface Codes and Lattice
                                            Surgery</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <UploadCircuitPage appState={appState} setAppState={setAppState} />
                <footer className="foot-bg" css={css`margin:-12px;`}>
                    <div className="container">
                        <div className="flex-container justify-content-center">
                            <div>
                                <a href="https://github.com/latticesurgery-com/lattice-surgery-compiler/">
                                    <i className="fab fa-github fa-3x"/></a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    </>;
}
export default BaseTemplate;

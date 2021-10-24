import React, {useEffect} from 'react'
import $ from 'jquery'
import {css} from '@emotion/react';

const anchor_position_shift = (window: Window) =>
{
    // TODO fix typescript/jquery problems. Use react refs instead?
    var anchor_elements: any;
    // @ts-ignore
    if ($(window).width() > 991)
    {
        anchor_elements = $(".anchor-mob");
        // @ts-ignore
        anchor_elements.switchClass("anchor-mob", "anchor-pc");
    } else
    {
        anchor_elements = $(".anchor-pc");
        // @ts-ignore
        anchor_elements.switchClass("anchor-pc", "anchor-mob")
    }
};

const BaseTemplate = () =>
{

    useEffect(() =>
    {
        // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
        // Collapse Mobile Navbar after link click
        $('.navbar-collapse a').click(function ()
        {
            // @ts-ignore
            $(".navbar-collapse").collapse('hide');
        });
        // When mobile navbar is enabled,

        window.onscroll = () =>
        {
            anchor_position_shift(window)
        };
    })

    return <>
        <div css={css`background-color: black; padding:10px`}>
            <h1 className='aquire' css={css`color:#E0E0E0;text-align: center;`}>Lattice Surgery Quantum Error Correction
                Compiler</h1>
        </div>
        <div css={css`background-color: black`}>
            <div className="container" css={`background-color: white;min-height:500px;`}>
                <div className="sticky-top" css={`margin:-12px`}>
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
                [Body]
                <footer className="foot-bg" css={`margin:-12px;`}>
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

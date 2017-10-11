import React from 'react';
import { Navbar, Glyphicon } from 'react-bootstrap';

function NavBar() {
    /**
     * @description diplay the navbar for the website
     */
    return (
        <Navbar fluid={true} inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/"><Glyphicon glyph="book" /> Readable</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        </Navbar>
    )
}

export default NavBar;
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = (props) => {
	return (
		<Navbar collapseOnSelect className="alienroom-navbar" expand="lg" bg="alien-primary" variant="alien-primary">
			<Navbar.Brand href="/">
				<img alt="alienroom-logo" src="./logos/alienroom.png" height={45} width="auto" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link href="#home">HOME</Nav.Link>
					<Nav.Link href="#about">ABOUT</Nav.Link>
					<Nav.Link href="#goals">GOALS</Nav.Link>
					<Nav.Link href="#leadership">LEADERSHIP</Nav.Link>
					{/* <Nav.Link href="#projects">PROJECTS</Nav.Link> */}
					<Nav.Link href="#alienBoard">ALIEN BOARD</Nav.Link>
					{/* <Nav.Link href="#shop">SHOP</Nav.Link> */}
					<Nav.Link href="#contact">CONTACT</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarComponent;

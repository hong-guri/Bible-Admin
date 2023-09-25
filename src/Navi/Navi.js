import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Navi = ({ onDarkModeToggle, darkMode }) => {
  useEffect(() => {
    console.log(onDarkModeToggle);
    console.log(darkMode);
  });
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/Home">
          <img
            src="img/koreans.png"
            width="120"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home">
              홈
            </Nav.Link>
            <NavDropdown title="도구" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/MainChart">
                이미지 업로드
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/others">
                Others
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="프로젝트" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/cyclean">
                CyClean
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/bibliever">
                Bibliever
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/MainChart">
                Chart
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/others">
                Others
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={onDarkModeToggle}>로그 아웃</Nav.Link>
            <Nav.Link onClick={onDarkModeToggle}>
              {!darkMode ? "다크" : "라이트"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;

import React from "react";

import { DiCssdeck } from "react-icons/di";
import { FaBars } from "react-icons/fa";

import styled, { useTheme } from "styled-components";

import { Link } from "react-router-dom";

import {
  ButtonContainer,

  MobileIcon,
  MobileMenu,

  MobileMenuLink,
  Nav,
  NavItems,
  NavLink,
  NavLogo,
  NavbarContainer,
  Span,
} from "./NavbarStyledComponent";

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <a
            href=" "
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              marginBottom: "20px",
              cursor: "pointer",
              textDecoration: "none",
            }}>
            <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
          </a>
        </NavLogo>
        <MobileIcon>
          <FaBars
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavItems>
        <ButtonContainer>
          <Link className="btns btn-gradient-border btn-glow" to={"/Login"}>
            Admin
          </Link>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileMenuLink href="#about" onClick={() => setIsOpen(!isOpen)}>
              About
            </MobileMenuLink>
            <MobileMenuLink href="#skills" onClick={() => setIsOpen(!isOpen)}>
              Skills
            </MobileMenuLink>
            <MobileMenuLink
              href="#experience"
              onClick={() => setIsOpen(!isOpen)}>
              Experience
            </MobileMenuLink>
            <MobileMenuLink href="#projects" onClick={() => setIsOpen(!isOpen)}>
              Projects
            </MobileMenuLink>
            <MobileMenuLink
              href="#education"
              onClick={() => setIsOpen(!isOpen)}>
              Education
            </MobileMenuLink>
            <MobileMenuLink href="#contact" onClick={() => setIsOpen(!isOpen)}>
              Contact
            </MobileMenuLink>
            <StyledLink  className="" to={"/Login"}>
              Admin
            </StyledLink>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;

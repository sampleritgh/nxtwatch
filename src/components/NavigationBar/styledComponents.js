import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Navigation Bar Container
export const NavBar = styled.div`
  display: flex;
`;

// Large Navigation Container
export const NavigationLgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 92%;
  position: fixed;
  top: 60px;
  background-color: ${props => props.bgColor};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Navigation Options
export const NavOptions = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  list-style-type: none;
  padding: 0;
  margin-top: 0;
`;

// Styled Link
export const NavLink = styled(Link)`
  text-decoration: none;
`;

// Navigation Link Container
export const NavLinkContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 25px;
  background-color: ${props => props.bgColor};
  padding-left: 20px;
`;

// Navigation Text
export const NavText = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
  margin-left: 15px;
`;

// Contact Information Container
export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

// Contact Heading
export const ContactHeading = styled.p`
  font-family: 'Roboto';
  font-size: 25px;
  font-weight: bold;
  color: ${props => props.color};
`;

// Contact Icons Container
export const ContactIcons = styled.div`
  display: flex;
  align-items: center;
`;

// Contact Image
export const ContactImage = styled.img`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 10px;
`;

// Contact Note
export const ContactNote = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
  color: ${props => props.color};
`;

// Small Navigation Container
export const NavigationSmallContainer = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  padding: 10px;
  background-color: ${props => props.bgColor};
  position: fixed;
  bottom: 0;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
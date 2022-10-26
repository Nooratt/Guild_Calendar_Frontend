
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
height: 60px;
display: flex;
color:white;
justify-content: space-between;
`;

export const NavLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #000000;
}
`;


export const NavMenu = styled.div`
display: flex;
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;

`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #9b59b6;
padding: 10px 22px;
color: white;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

`;

/*background: #CF9FFF;*/
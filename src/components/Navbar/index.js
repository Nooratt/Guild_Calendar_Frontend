import React from 'react';
import {
Nav,
NavLink,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavBar';
import './NavStyles.css'

const Navbar = () => {
	
	return (
		<>
		<Nav>
				<NavLink to='/' >
					<h1>WhatsTheHaps?</h1>
				</NavLink>
				<div className='viewButtons'> 
				<NavBtn >
					<NavBtnLink to='/'>Day view</NavBtnLink>
				</NavBtn>
				<NavBtn >
					<NavBtnLink to='/week'>Week view</NavBtnLink>
				</NavBtn>
				<NavBtn >
					<NavBtnLink to='/month'>Month view</NavBtnLink>
				</NavBtn>
				</div>
					<div className="dropdown">
					<button className="dropbtn">Menu
						<i className="arrow down"></i>
					</button>
					<div className="dropdown-content">		
						<NavLink to='/about'>
							About us
						</NavLink>		
						<NavLink to='/terms'>
							Terms and conditions
						</NavLink>
					</div>
				</div>	
				

		</Nav>
		</>
	);
};

export default Navbar;

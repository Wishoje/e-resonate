import React from 'react';
import '../styles/App.scss';
import search from '../assets/images/search.svg'

const Header = () => {
	return (
		<header>
            <div className="header-wrapper">
                <div className="header-circle-wrapper">
                    <span className="header-circle-icon"></span>
                </div>
                <div className="header-circle-search">
                    <img src={search} alt="search"/>
                </div>
            </div>
		</header>
	)
}

export default Header;
import React from 'react';
import '../styles/App.scss';
import instagram from '../assets/images/instagram.svg'
import linkedin from '../assets/images/linkedin.svg'
import twitter from '../assets/images/twitter.svg'

const Footer = () => {
	return (
		<footer>
			<div className="footer-wrapper">
				<div className="footer-social-icons">
					<a href="/">
						<img src={twitter} alt="twitter"/>
					</a>
					<a href="/">
						<img src={linkedin} alt="linkedin"/>
					</a>
					<a href="/">
						<img src={instagram} alt="instagram"/>
					</a>
				</div>
				<div className="footer-links">
					<div>
						<a className="footer-link" href="/">Claim Your Venue</a>
						<a href="/">Venue Log in</a>
					</div>
					<div>
						<a className="footer-link opacity-low" href="/">Terms and Condition</a>
						<a className="opacity-low" href="/">Privacy Policy</a>
					</div>
					<div className="button-wrapper">
						<button className="form-input footer-button" type="button">Report a Problem</button>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
// LandingPage.jsx

import styles from './LandingPage.module.css';

const LandingPage = () => {
	return (
		<div className={styles.landingPage}>
			<div className={styles.backgroundImage}></div>

			<div className={styles.content}>
				<h1>Bienvenido a Henry Videogames</h1>

				<Link to='/home'>
					<button className={styles.button}>Ingresar</button>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;

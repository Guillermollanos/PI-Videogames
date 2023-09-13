import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; // Importa el archivo CSS

const NavBar = () => {
	return (
		<div className={styles.navbar}>
			<Link className={styles.link} to='/home'>
				<h2 className={styles.title}>HOME</h2>
			</Link>
			<Link className={styles.link} to='/create'>
				<h2 className={styles.title}>FORM</h2>
			</Link>
		</div>
	);
};

export default NavBar;

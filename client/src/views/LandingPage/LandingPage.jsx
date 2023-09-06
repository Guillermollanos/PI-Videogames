// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Si estás usando React Router para la navegación
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className='landing-page'>
			<div className='background-image'></div>
			<div className='content'>
				<h1>Bienvenido a Henry Videogames</h1>
				<Link to='/home'>
					{' '}
					{/* Asegúrate de que "/home" coincida con tu ruta real */}
					<button>Ingresar</button>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;

import React from 'react';
import './Card.css';

const Card = (props) => {
	return (
		<div className='card'>
			<div className='image-container'>
				<img src={props.background_image} alt={props.name} />
			</div>
			<p>Name: {props.name}</p>
			<p>Genres: {props.genres}</p>
		</div>
	);
};

export default Card;

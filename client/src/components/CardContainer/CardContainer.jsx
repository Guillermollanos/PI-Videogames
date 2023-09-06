import React from 'react';
import Card from '../Card/Card';
import './CardContainer.css';

const CardContainer = ({ searchResults, selectedGenre }) => {
	console.log('Selected genre:', selectedGenre);
	const filteredGames = searchResults.filter((result) => {
		console.log('Filtering games...');

		// Convierte los géneros del juego a minúsculas antes de comparar
		const gameGenres = result.genres.map((genre) => genre.toLowerCase());
		console.log('Game genres:', gameGenres);
		const selected = selectedGenre ? selectedGenre.toLowerCase() : null;
		console.log('Searching for:', selected);

		return !selected || gameGenres.includes(selected);
	});
	console.log('Filtered games:', filteredGames);
	return (
		<div className='card-container'>
			{filteredGames.map((result) => (
				<Card
					key={result.id}
					background_image={result.background_image}
					name={result.name}
					genres={result.genres ? result.genres : []}
				/>
			))}
		</div>
	);
};

export default CardContainer;

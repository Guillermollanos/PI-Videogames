import React from 'react';
import { useState } from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import Pagination from '../pagination/pagination';
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

	const cardsPerPage = 15;
	const [page, setPage] = useState(1); // Declarar 'page' antes de usarlo

	const startIndex = (page - 1) * cardsPerPage;
	const endIndex = startIndex + cardsPerPage;
	const visibleCards = filteredGames.slice(startIndex, endIndex);

	const pagesNumber = Math.ceil(filteredGames.length / cardsPerPage);
	const pagesArray = Array.from(
		{ length: pagesNumber },
		(_, index) => index + 1
	);
	return (
		<div className='card-container'>
			{visibleCards.map((result) => (
				<Link key={result.id} to={`/detail/${result.id}`}>
					{/* Envuelve la Card con Link y pasa el id en la URL */}

					<Card
						background_image={result.background_image}
						name={result.name}
						genres={result.genres ? result.genres : []}
					/>
				</Link>
			))}
			<Pagination
				page={page}
				setPage={setPage}
				pagesArray={pagesArray}
				pagesNumber={pagesNumber}
			/>
		</div>
	);
};

export default CardContainer;

import React, { useState } from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import styles from './CardContainer.module.css';

const CardContainer = ({ searchResults, selectedGenre }) => {
	const filteredGames = searchResults.filter((result) => {
		const gameGenres = result.genres.map((genre) => genre.toLowerCase());

		const selected = selectedGenre ? selectedGenre.toLowerCase() : null;

		return !selected || gameGenres.includes(selected);
	});

	console.log('Filtered games:', filteredGames);

	const cardsPerPage = 15;
	const [page, setPage] = useState(1);

	const startIndex = (page - 1) * cardsPerPage;
	const endIndex = startIndex + cardsPerPage;
	const visibleCards = filteredGames.slice(startIndex, endIndex);

	const pagesNumber = Math.ceil(filteredGames.length / cardsPerPage);
	const pagesArray = Array.from(
		{ length: pagesNumber },
		(_, index) => index + 1
	);

	return (
		<div className={styles.container}>
			{visibleCards.map((result) => (
				<Link
					key={result.id}
					to={`/detail/${result.id}`}
					className={styles.cardLink}
				>
					<Card
						background_image={result.background_image}
						name={result.name}
						genres={result.genres ? result.genres : []}
						selectedGenre={selectedGenre}
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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterCards,
	orderAlphabetical,
	orderRating,
} from '../../redux/actions';
import styles from './FilterOptions.module.css'; // Importa el archivo CSS Modules

const FilterOptions = () => {
	const dispatch = useDispatch();
	const sortOrder = useSelector((state) => state.sortOrder);

	const handleFilterChange = (genre) => {
		const capitalizedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
		dispatch(filterCards(capitalizedGenre));
	};

	const handleAlphabeticalOrder = () => {
		dispatch(orderAlphabetical());
	};

	const handleRatingOrder = () => {
		dispatch(orderRating());
	};

	const genres = ['Action', 'Adventure', 'RPG', 'Shooter'];

	return (
		<div className={styles.filterOptions}>
			{genres.map((genre) => (
				<button
					key={genre}
					className={styles.filterButton}
					onClick={() => handleFilterChange(genre)}
				>
					{`Filtrar por ${genre}`}
				</button>
			))}
			<button
				className={styles.filterButton}
				onClick={() => handleAlphabeticalOrder()}
			>
				Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
			</button>
			<button
				className={styles.filterButton}
				onClick={() => handleRatingOrder()}
			>
				Ordenar por Rating
			</button>
		</div>
	);
};

export default FilterOptions;

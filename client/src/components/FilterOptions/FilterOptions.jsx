import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterCards,
	orderAlphabetical,
	orderRating,
	filterApiGames, // Nueva acción para filtrar juegos de la API
	filterFormGames, // Nueva acción para filtrar juegos creados a través del formulario
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

	// Nuevo manejador para filtrar juegos de la API
	const handleApiGamesFilter = () => {
		dispatch(filterApiGames());
	};

	// Nuevo manejador para filtrar juegos creados a través del formulario
	const handleFormGamesFilter = () => {
		dispatch(filterFormGames());
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
			{/* Nuevo botón para filtrar juegos de la API */}
			<button
				className={styles.filterButton}
				onClick={() => handleApiGamesFilter()}
			>
				Filtrar por Juegos de API
			</button>
			{/* Nuevo botón para filtrar juegos creados a través del formulario */}
			<button
				className={styles.filterButton}
				onClick={() => handleFormGamesFilter()}
			>
				Filtrar por Juegos Creados (Formulario)
			</button>
		</div>
	);
};

export default FilterOptions;

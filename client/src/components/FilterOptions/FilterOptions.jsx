import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterCards,
	orderAlphabetical,
	orderRating,
	filteredBySource, // Nueva acción para filtrar juegos de la API
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

	// Nuevo manejador para filtrar juegos creados a través del formulario
	const handleFilterBySource = (event) => {
		dispatch(filteredBySource(event.target.value));
		console.log(event.target.value); // Pasar el valor seleccionado
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

			{/* Nuevo botón para filtrar juegos creados a través del formulario */}
			<select
				className={styles.filterButton}
				onChange={(event) => handleFilterBySource(event)}
			>
				<option value='all'>Show All</option>
				<option value='API videogames'>API Videogames</option>
				<option value='Created videogames'>Created Videogames</option>
			</select>
		</div>
	);
};

export default FilterOptions;

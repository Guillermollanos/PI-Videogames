import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importa useSelector
import {
	filterCards,
	orderAlphabetical,
	orderRating,
} from '../../redux/actions';

const FilterOptions = () => {
	const dispatch = useDispatch();

	const sortOrder = useSelector((state) => state.sortOrder); // Obtén el estado del orden actual

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

	const genres = ['Action', 'Adventure', 'RPG', 'Shooter']; // Agrega todos los géneros que tengas

	return (
		<div>
			{genres.map((genre) => (
				<button key={genre} onClick={() => handleFilterChange(genre)}>
					{`Filtrar por ${genre}`}
				</button>
			))}
			<button onClick={() => handleAlphabeticalOrder()}>
				Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}{' '}
			</button>
			<button onClick={() => handleRatingOrder()}>Ordenar por Rating</button>
		</div>
	);
};

export default FilterOptions;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, filterCards, orderCards } from '../../redux/actions'; // Importa las acciones necesarias
import SearchBar from '../../components/SearchBar/SearchBar';
import CardContainer from '../../components/CardContainer/CardContainer';

import './HomePage.css';

const Home = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.filteredUsers); // Usa el estado filtrado en lugar de los usuarios sin filtrar

	const [searchResults, setSearchResults] = useState([]);

	const [selectedGenre, setSelectedGenre] = useState(null);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleSearchResultsChange = (results) => {
		setSearchResults(results);
	};

	const handleFilterChange = (genre) => {
		console.log('Selected Genre:', genre);
		// Capitaliza la primera letra y luego despacha la acción
		const capitalizedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
		dispatch(filterCards(capitalizedGenre));
		setSelectedGenre(capitalizedGenre); // Despacha la acción de filtro
	};

	const handleOrderChange = (order) => {
		dispatch(orderCards(order)); // Despacha la acción de orden
	};

	return (
		<>
			<SearchBar onSearchResultsChange={handleSearchResultsChange} />
			<button onClick={() => handleFilterChange('action')}>
				Filtrar por Acción
			</button>
			<button onClick={() => handleFilterChange('adventure')}>
				Filtrar por Aventura
			</button>
			{/* Agrega más botones para otros géneros si es necesario */}
			<button onClick={() => handleOrderChange('asc')}>Ordenar A-Z</button>
			<button onClick={() => handleOrderChange('desc')}>Ordenar Z-A</button>
			<CardContainer
				searchResults={searchResults.length > 0 ? searchResults : users}
				selectedGenre={selectedGenre} // Pasa selectedGenre como una prop
			/>
		</>
	);
};

export default Home;

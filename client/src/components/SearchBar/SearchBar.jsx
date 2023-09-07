import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ onSearchResultsChange }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSearch = async () => {
		try {
			// Realiza una solicitud al backend para buscar videojuegos por nombre
			const response = await axios.get(
				`http://localhost:3001/videogames/name?search=${searchTerm}`
			);
			console.log(response.data);

			// Los resultados de la búsqueda se encuentran en response.data
			const searchResults = response.data;

			// Actualiza el estado local en Home con los resultados de la búsqueda
			onSearchResultsChange(searchResults);
			console.log(searchResults);
		} catch (error) {
			// Maneja cualquier error que pueda ocurrir durante la solicitud.
			console.error('Error en la búsqueda:', error);
		}
	};

	return (
		<div className='search-bar'>
			<input
				type='text'
				placeholder='Buscar por nombre de videojuego'
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<button onClick={handleSearch}>Buscar</button>
		</div>
	);
};

export default SearchBar;

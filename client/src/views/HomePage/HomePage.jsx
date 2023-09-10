import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions'; // Importa la acción getUsers
import SearchBar from '../../components/SearchBar/SearchBar';
import CardContainer from '../../components/CardContainer/CardContainer';
import FilterOptions from '../../components/FilterOptions/FilterOptions'; // Importa el componente FilterOptions

import './HomePage.css';

const Home = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.filteredUsers); // Usa el estado filtrado en lugar de los usuarios sin filtrar

	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleSearchResultsChange = (results) => {
		setSearchResults(results);
	};

	return (
		<>
			<SearchBar onSearchResultsChange={handleSearchResultsChange} />
			<FilterOptions /> {/* Renderiza el componente FilterOptions */}
			<CardContainer
				searchResults={searchResults.length > 0 ? searchResults : users}
			/>
		</>
	);
};

export default Home;

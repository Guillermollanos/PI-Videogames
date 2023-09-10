// reducer.js

import {
	GET_USERS,
	FILTER_CARDS,
	ORDER_ALPHABETICAL,
	ORDER_RATING,
} from './actions';

const initialState = {
	users: [],
	filteredUsers: [], // Nuevo estado para almacenar los usuarios filtrados
	sortOrder: 'asc', // Puedes establecer un valor predeterminado para el orden
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload, filteredUsers: action.payload };

		case FILTER_CARDS:
			// Filtra los usuarios según el género y actualiza el estado
			const filteredUsers = state.users.filter((user) =>
				user.genres.includes(action.payload)
			);
			return {
				...state,
				filteredUsers,
			};

		case ORDER_ALPHABETICAL:
			const alphabeticalUsers = state.filteredUsers.slice(); // Clona los usuarios filtrados

			if (state.sortOrder === 'asc') {
				alphabeticalUsers.sort((a, b) => (a.name > b.name ? 1 : -1)); // Ordena A-Z
			} else {
				alphabeticalUsers.sort((a, b) => (a.name < b.name ? 1 : -1)); // Ordena Z-A
			}

			return {
				...state,
				filteredUsers: alphabeticalUsers,
				sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc', // Invierte el orden
			};

		case ORDER_RATING:
			const ratingUsers = state.filteredUsers.slice(); // Clona los usuarios filtrados

			ratingUsers.sort((a, b) => (a.rating < b.rating ? 1 : -1)); // Ordena por rating (puedes ajustar la lógica según necesites)

			return {
				...state,
				filteredUsers: ratingUsers,
				sortOrder: 'desc', // Establece el orden descendente
			};

		default:
			return { ...state };
	}
};

export default rootReducer;

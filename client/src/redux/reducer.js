// reducer.js

import { GET_USERS, FILTER_CARDS, ORDER } from './actions';

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
			const filteredUsers = state.users.filter(
				(user) => user.genre === action.payload
			);
			return {
				...state,
				filteredUsers,
			};

		case ORDER:
			// Ordena los usuarios en función de la acción de orden
			const sortedUsers = state.filteredUsers.slice(); // Clona los usuarios filtrados

			if (action.payload === 'asc') {
				sortedUsers.sort((a, b) => (a.name > b.name ? 1 : -1));
			} else if (action.payload === 'desc') {
				sortedUsers.sort((a, b) => (a.name < b.name ? 1 : -1));
			}

			return {
				...state,
				filteredUsers: sortedUsers,
				sortOrder: action.payload,
			};

		default:
			return { ...state };
	}
};

export default rootReducer;

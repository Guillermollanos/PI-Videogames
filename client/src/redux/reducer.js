import {
	GET_USERS,
	FILTER_CARDS,
	ORDER_ALPHABETICAL,
	ORDER_RATING,
	FILTER_API_GAMES, // Importa la nueva acción de filtrado de la API
	FILTER_FORM_GAMES, // Importa la nueva acción de filtrado de juegos del formulario
} from './actions';

const initialState = {
	users: [],
	filteredUsers: [],
	sortOrder: 'asc',
	filterOrigin: '', // Agrega un estado para el filtro de origen
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload, filteredUsers: action.payload };

		case FILTER_CARDS:
			const filteredUsers = state.users.filter(
				(user) =>
					user.genres.includes(action.payload) &&
					(state.filterOrigin === '' || user.origin === state.filterOrigin)
			);
			return {
				...state,
				filteredUsers,
			};

		case ORDER_ALPHABETICAL:
			const alphabeticalUsers = state.filteredUsers.slice();

			if (state.sortOrder === 'asc') {
				alphabeticalUsers.sort((a, b) => (a.name > b.name ? 1 : -1));
			} else {
				alphabeticalUsers.sort((a, b) => (a.name < b.name ? 1 : -1));
			}

			return {
				...state,
				filteredUsers: alphabeticalUsers,
				sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
			};

		case ORDER_RATING:
			const ratingUsers = state.filteredUsers.slice();

			ratingUsers.sort((a, b) => (a.rating < b.rating ? 1 : -1));

			return {
				...state,
				filteredUsers: ratingUsers,
				sortOrder: 'desc',
			};

		case FILTER_API_GAMES: // Reducer para filtrar juegos de la API
			const apiGames = state.users.filter((user) => user.origin === 'API');
			return {
				...state,
				filteredUsers: apiGames,
				filterOrigin: 'API', // Establece el filtro de origen en 'API'
			};

		case FILTER_FORM_GAMES: // Reducer para filtrar juegos creados a través del formulario
			const formGames = state.users.filter(
				(user) => user.origin === 'Formulario'
			);
			return {
				...state,
				filteredUsers: formGames,
				filterOrigin: 'Formulario', // Establece el filtro de origen en 'Formulario'
			};

		default:
			return { ...state };
	}
};

export default rootReducer;

import {
	GET_USERS,
	FILTER_CARDS,
	ORDER_ALPHABETICAL,
	ORDER_RATING,
	FILTER_BY_SOURCE, // Importa la nueva acción de filtrado
} from './actions';

const initialState = {
	users: [],
	filteredUsers: [],
	sortOrder: 'asc',
	filterOrigin: '', // Agrega un estado para el filtro de origen
	videogames: [], // Agrega un estado para los videojuegos con un valor inicial vacío
	filtersApplied: [], // Asegúrate de tener este estado si lo estás usando en otro lugar
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

		case FILTER_BY_SOURCE:
			const orderBySource = [...state.users];
			console.log(orderBySource);
			const filteredBySource =
				action.payload === 'Created videogames'
					? orderBySource.filter((user) => user.origin === true)
					: action.payload === 'API videogames'
					? orderBySource.filter((user) => user.origin === false)
					: orderBySource;
			return {
				...state,
				videogames: filteredBySource,
				filtersApplied: action.payload === 'all' ? [] : [action.payload],
			};

		default:
			return { ...state };
	}
};

export default rootReducer;

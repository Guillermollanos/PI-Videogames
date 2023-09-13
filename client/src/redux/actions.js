import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const FILTER_CARDS = 'FILTER_CARDS';
export const FILTER_API_GAMES = 'FILTER_API_GAMES'; // Nueva acción para filtrar juegos de la API
export const FILTER_FORM_GAMES = 'FILTER_FORM_GAMES'; // Nueva acción para filtrar juegos creados a través del formulario

export const ORDER_ALPHABETICAL = 'ORDER_ALPHABETICAL';
export const ORDER_RATING = 'ORDER_RATING';
const URL = 'http://localhost:3001/videogames';

// Define tu acción como una función asíncrona
export const getUsers = () => {
	return async function (dispatch) {
		try {
			// Intenta realizar la solicitud a la API
			const apiData = await axios.get(URL);

			// Si la solicitud es exitosa, obtén los usuarios y envíalos a tu store
			const users = apiData.data;
			dispatch({ type: GET_USERS, payload: users });
		} catch (error) {
			console.error('Error al obtener usuarios:', error);
			// Si ocurre un error, puedes manejarlo aquí
			alert('Error al obtener usuarios: ' + error.message);

			// Puedes despachar una acción de error si lo deseas
			// dispatch({ type: GET_USERS_ERROR, payload: error.message });
		}
	};
};

export const getUser = (id) => {
	return async function (dispatch) {
		const apiData = await axios.get(`${URL}/{id}`);
		const user = apiData.data;
		dispatch({ type: GET_USER, payload: user });
	};
};

export const filterCards = (genre) => {
	return {
		type: FILTER_CARDS,
		payload: genre,
	};
};

export const orderAlphabetical = () => {
	return {
		type: ORDER_ALPHABETICAL,
	};
};

export const orderRating = () => {
	return {
		type: ORDER_RATING,
	};
};
// Nueva acción para filtrar juegos de la API
export const filterApiGames = () => {
	return {
		type: FILTER_API_GAMES,
	};
};

// Nueva acción para filtrar juegos creados a través del formulario
export const filterFormGames = () => {
	return {
		type: FILTER_FORM_GAMES,
	};
};

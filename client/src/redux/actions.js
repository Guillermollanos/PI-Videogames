import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const FILTER_CARDS = 'FILTER_CARDS';
export const ORDER = 'ORDER';
const URL = 'http://localhost:3001/videogames';

export const getUsers = () => {
	return async function (dispatch) {
		const apiData = await axios.get(URL);
		const users = apiData.data;
		dispatch({ type: GET_USERS, payload: users });
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

export const orderCards = (order) => {
	return {
		type: ORDER,
		payload: order,
	};
};

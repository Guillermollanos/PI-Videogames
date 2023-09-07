const { Videogame, Genre } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require('sequelize');
const {
	transformApiData,
	transformApiDataId,
	transformDbData,
	transformDbDataId,
} = require('../../utils/transformData.js');

// Funciones de transformación de datos

const getApiVideogamesPaginated = async () => {
	const apiVideogames = [];

	for (let i = 1; i <= 5; i++) {
		try {
			const { data } = await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
			);

			if (data.results && Array.isArray(data.results)) {
				const games = data.results.map((game) => transformApiData(game)); // Agrega el resultado de transformApiData(game)
				apiVideogames.push(...games);
			} else {
				console.error('API response is not as expected:', data);
			}
		} catch (error) {
			console.error('Error making API request:', error);
		}
	}

	return apiVideogames;
};

const getDbVideogames = async () => {
	let dbVideogames = await Videogame.findAll({
		include: {
			model: Genre,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});

	return dbVideogames.map((dbVideogame) => transformApiData(dbVideogame));
};

const getApiVideogames = async () => {
	const { data } = await axios.get(
		`https://api.rawg.io/api/games?key=${API_KEY}`
	);

	return data.results.map((apiVideogame) => transformApiData(apiVideogame));
};

const getDbVideogameByName = async (search) => {
	let dbVideogames = await Videogame.findAll(
		{
			where: { name: { [Op.iLike]: `%${search}%` } },
			include: {
				model: Genre,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		},
		{ limit: 15 }
	);

	return dbVideogames.map((dbVideogame) => transformDbData(dbVideogame));
};

const getApiVideogamesByName = async (search) => {
	const { data } = await axios.get(
		`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`
	);

	return data.results.map((apiVideogame) => transformApiData(apiVideogame));
};

const getVideogameById = async (idVideogame) => {
	if (isNaN(idVideogame)) {
		const data = await Videogame.findByPk(idVideogame, {
			include: {
				model: Genre,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		});
		return transformDbDataId(data);
	} else {
		const { data } = await axios.get(
			`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
		);
		return transformApiDataId(data);
	}
};

const createpostVideogames = async (
	name,
	description,
	platforms,
	background_image,
	released,
	rating,
	genres
) => {
	console.log(genres);
	const newGame = await Videogame.create({
		name,
		description,
		platforms,
		background_image,
		released,
		rating,
	});

	await newGame.addGenres(genres);

	return newGame;
};

module.exports = {
	getDbVideogames,
	getApiVideogames,
	getDbVideogameByName,
	getApiVideogamesByName,
	getVideogameById,
	createpostVideogames,
	getApiVideogamesPaginated,
};

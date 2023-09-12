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

	return dbVideogames.map((dbVideogame) => transformDbData(dbVideogame));
};

const getApiVideogames = async () => {
	//Getting videogames from API (120 first results)
	let results = [];
	for (let i = 1; i <= 3; i++)
		results = [
			...results,
			...(
				await axios.get(
					`https://api.rawg.io/api/games?page=${i}&page_size=40&key=${API_KEY}`
				)
			).data.results,
		];
	//Desctructuring and getting needed information and returning
	return results.map((apiVideogame) => transformApiData(apiVideogame));
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
};

const { Videogame, Genre } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require('sequelize');

const transformGameData = (data) => {
	const { id, name, platforms, background_image, released, rating, genres } =
		data;
	console.log(genres);
	const formattedPlatforms = platforms.map((plat) => plat.platform.name);
	const formattedGenres = genres.map((gen) => gen.name);

	return {
		id,
		name,
		platforms: formattedPlatforms,
		background_image,
		released,
		rating,
		genres: formattedGenres,
	};
};

const getApiVideogamesPaginated = async () => {
	const apiVideogames = [];

	for (let i = 1; i <= 5; i++) {
		try {
			const { data } = await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
			);

			if (data.results && Array.isArray(data.results)) {
				const games = data.results.map((game) => transformGameData(game));
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

	return dbVideogames.map((dbVideogame) => {
		transformGameData(dbVideogame.dataValues);
	});
};

const getApiVideogames = async () => {
	const { data } = await axios.get(
		`https://api.rawg.io/api/games?key=${API_KEY}`
	);

	return data.results.map((apiVideogame) => transformGameData(apiVideogame));
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

	return dbVideogames.map((dbVideogame) => transformGameData(dbVideogame));
};

const getApiVideogamesByName = async (search) => {
	const { data } = await axios.get(
		`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`
	);

	return data.results.map((apiVideogame) => transformGameData(apiVideogame));
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
		return transformGameData(data);
	} else {
		const { data } = await axios.get(
			`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
		);
		return transformGameData(data);
	}
};

const createpostVideogames = async (
	id,
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
		id,
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

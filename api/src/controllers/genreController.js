const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../db');

const getGenres = async () => {
	try {
		// Realiza la solicitud a la API externa
		const { data } = await axios.get(
			`https://api.rawg.io/api/genres?key=${API_KEY}`
		);

		// Mapea los resultados para obtener los géneros
		const genres = data.results.map((result) => {
			const { id, name } = result;
			return { id, name };
		});

		// Crea registros en la tabla de géneros si no existen
		for (let i = 0; i < genres.length; i++) {
			await Genre.findOrCreate({
				where: { id: genres[i].id },
				defaults: { name: genres[i].name },
			});
		}

		// Retorna el arreglo de géneros
		return genres;
	} catch (error) {
		// Maneja errores de solicitud a la API
		throw new Error('No se pudieron obtener los géneros desde la API');
	}
};

module.exports = { getGenres };

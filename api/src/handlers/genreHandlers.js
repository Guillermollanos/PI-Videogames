const { getGenres } = require('..//controllers/genreController');

const getGenreshandlers = async (req, res) => {
	try {
		const genres = await getGenres();
		// 3. Responder con los géneros
		res.json(genres);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getGenreshandlers;

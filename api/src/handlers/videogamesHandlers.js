const {
	getDbVideogames,
	getDbVideogameByName,
	getApiVideogamesByName,
	getVideogameById,
	createpostVideogames,
	getApiVideogamesPaginated,
} = require('../controllers/videogamesController');

const getVideogamesHandler = async (req, res) => {
	try {
		//Getting videogames from database
		const dbVideogames = await getDbVideogames();

		//Getting videogames from API
		const apiVideogames = await getApiVideogamesPaginated();
		console.log(apiVideogames.length);

		//Joining information from database and API
		const allVideogames = [...dbVideogames, ...apiVideogames];

		//Response
		res.status(200).json(allVideogames);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getVideogameByNameHandler = async (req, res) => {
	//Getting information from query
	const { search } = req.query;
	try {
		//Getting videogames information from database
		const dbVideogames = await getDbVideogameByName(search);

		//If there isn't enough videogames finded in the database, search in the API the rest
		if (dbVideogames.length < 15) {
			const apiVideogames = await getApiVideogamesByName(search);

			//Limiting total number of elements to 15.
			const allVideogames = [...dbVideogames, ...apiVideogames].slice(0, 15);

			//Returning first 15 games found from database and API
			return res.status(200).json(allVideogames);
		}
		//Returning games found in database if number of element was 15
		res.status(200).json(dbVideogames);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getVideogameByIdHandler = async (req, res) => {
	//Getting idVideogame from params
	const { idVideogame } = req.params;

	try {
		//Requering data from DB/API
		const videogame = await getVideogameById(idVideogame);
		res.status(200).json(videogame);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getVideogamepostHandlers = async (req, res) => {
	//Getting information from body
	const {
		id,
		name,
		description,
		platforms,
		background_image,
		released,
		rating,
		genres,
	} = req.body;

	try {
		//Sending information to controller to create the game
		const newGame = await createpostVideogames(
			id,
			name,
			description,
			platforms,
			background_image,
			released,
			rating,
			genres
		);
		res.status(201).json(newGame);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// creo un juego asignandole generos de la tabla genero, clase ORM jorge

module.exports = {
	getVideogamesHandler,
	getVideogameByNameHandler,
	getVideogameByIdHandler,
	getVideogamepostHandlers,
};

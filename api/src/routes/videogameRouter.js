require('dotenv').config();
const { Router } = require('express');
const {
	getVideogamesHandler,
	getVideogameByNameHandler,
	getVideogameByIdHandler,
	getVideogamepostHandlers,
} = require('../handlers/videogamesHandlers');

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesHandler);

videogamesRouter.get('/name', getVideogameByNameHandler);

videogamesRouter.get('/:idVideogame', getVideogameByIdHandler);

videogamesRouter.post('/', getVideogamepostHandlers);

module.exports = videogamesRouter;

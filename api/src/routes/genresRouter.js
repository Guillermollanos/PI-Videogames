const { Router } = require('express');
const getGenreshandlers = require('../handlers/genreHandlers');

// Enrutador de géneros
const genresRouter = Router();

genresRouter.get('/', getGenreshandlers);

module.exports = genresRouter;

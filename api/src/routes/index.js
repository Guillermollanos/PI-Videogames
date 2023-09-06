const { Router } = require('express');
const genresRouter = require('./genresRouter');
const videogameRouter = require('./videogameRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogameRouter);

router.use('/genres', genresRouter);

module.exports = router;

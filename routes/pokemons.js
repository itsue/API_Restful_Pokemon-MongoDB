const express = require('express');
const router = express.Router();
const {
    pokemonsGet,
    pokemonsPost,
    pokemonsPatch,
    pokemonsPut,
    pokemonsDelete
} = require('../controllers/pokemons');

const { validarJWT } = require('../helpers/validar-jwt');

router.get('/', validarJWT, pokemonsGet);
router.post('/', validarJWT, pokemonsPost);
router.patch('/:id', validarJWT, pokemonsPatch);
router.put('/:id', validarJWT, pokemonsPut);
router.delete('/:id', validarJWT, pokemonsDelete);

module.exports = router;

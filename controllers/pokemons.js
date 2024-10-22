const { response } = require('express');
const Pokemon = require('../models/pokemon');

const pokemonsGet = async (req, res = response) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener pokemons', error });
    }
};

const pokemonsPost = async (req, res = response) => {
    const { id, nombre, tipo, imgurl } = req.body;
    try {
        const nuevoPokemon = new Pokemon({ id, nombre, tipo, imgurl });
        await nuevoPokemon.save();
        res.json({ msg: `El pokemon ${nombre} se ha creado`, pokemon: nuevoPokemon });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el pokemon', error });
    }
};

const pokemonsPatch = async (req, res = response) => {
    const { id } = req.params;
    const { imgurl } = req.body;
    try {
        const updatedPokemon = await Pokemon.findOneAndUpdate(
            { id: parseInt(id) },
            { imgurl },
            { new: true }
        );
        if (!updatedPokemon) {
            return res.status(404).json({ msg: 'Pokemon no encontrado' });
        }
        res.json(updatedPokemon);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el pokemon', error });
    }
};

const pokemonsPut = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, tipo, imgurl } = req.body;
    try {
        const updatedPokemon = await Pokemon.findOneAndUpdate(
            { id: parseInt(id) },
            { nombre, tipo, imgurl },
            { new: true }
        );
        if (!updatedPokemon) {
            return res.status(404).json({ msg: 'Pokemon no encontrado' });
        }
        res.json({ msg: `El pokemon con ID ${id} ha sido actualizado`, pokemon: updatedPokemon });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el pokemon', error });
    }
};

const pokemonsDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const deletedPokemon = await Pokemon.findOneAndDelete({ id: parseInt(id) });
        if (!deletedPokemon) {
            return res.status(404).json({ msg: 'Pokemon no encontrado' });
        }
        res.json({ msg: `El pokemon con ID ${id} ha sido eliminado`, pokemon: deletedPokemon });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el pokemon', error });
    }
};

module.exports = {
    pokemonsGet,
    pokemonsPost,
    pokemonsPatch,
    pokemonsPut,
    pokemonsDelete
};

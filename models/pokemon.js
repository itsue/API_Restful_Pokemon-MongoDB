const { Schema, model } = require('mongoose');

const PokemonSchema = Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    }
});

module.exports = model('Pokemon', PokemonSchema);
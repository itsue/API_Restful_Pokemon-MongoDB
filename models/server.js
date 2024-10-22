const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/usuario');

class Server {
    constructor() {
        this.app = express();
        this.port = 3033;
        this.mongoDBURI = 'mongodb://localhost:27017/pokemonsDB';
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB() {
        try {
            await mongoose.connect(this.mongoDBURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Conectado a MongoDB');
            await this.initializeDatabase();
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
        }
    }

    //Se registra usuario para realizar el login
    async initializeDatabase() {
        const defaultUser = {
            email: "admin@gmail.com",
            password: "5e884898da28047151d0e56f8dc6292773603d0d5a302c4c3f194fe3c6e7a4f7"
        };
        const userExists = await User.findOne({ email: defaultUser.email });
        if (!userExists) {
            await User.create(defaultUser);
            console.log('Usuario admin registrado en la base de datos.');
        } else {
            console.log('Usuario admin ya existe en la base de datos.');
        }
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(require('cors')());
    }

    routes() {
        this.app.use('/api/pokemons', require('../routes/pokemons'));
        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en puerto ${this.port}`);
        });
    }
}

module.exports = Server;

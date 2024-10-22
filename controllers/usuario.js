const { response } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({
                msg: 'Correo o contraseña incorrectos'
            });
        }

        if (password !== usuario.password) {
            return res.status(401).json({
                msg: 'Correo o contraseña incorrectos'
            });
        }

        const token = await generarJWT(usuario.id);

        res.header('x-token', token).json({
            message: 'Login exitoso.',
            usuario: {
                id: usuario.id,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

module.exports = {
    login
};

const { Router } = require('express');
const { login } = require('../controllers/usuario');

const router = Router();

router.post('/login', login);

module.exports = router; 

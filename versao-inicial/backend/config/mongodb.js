const mongoose = require('mongoose');
const {mongoUrl} = require('../.env');

mongoose.connect(mongoUrl.url)
    .then(() => console.log("Mongo conectado!"))
    .catch(e => {
        const msg = '[ERROR] Não foi possível com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })
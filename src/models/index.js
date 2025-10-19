const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb+srv://victor:Dq23PbHt@cluster0.iyqbg9l.mongodb.net/dbtareas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => console.log('db connected'))
    .catch(error => console.log(error));

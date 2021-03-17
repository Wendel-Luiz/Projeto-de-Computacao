const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispositivoSchema = new Schema({
    nome:{
        type: String,
        required: true,
        unique: true
    },
    fatorK:{
        type: Number,
        required: true
    },
    leitura:[{
        type: Schema.Types.ObjectId,
        ref: 'leitura'
    }]
});

const Dispositivo = mongoose.model('dispositivo', dispositivoSchema);
module.exports = Dispositivo;
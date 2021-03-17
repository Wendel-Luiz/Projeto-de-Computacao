const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leituraSchema = new Schema({
    pulsos:{
        type: Number,
        required: true
    },
    data:{
        type: Date,
        default: Date.now
    },
    dispositivo:{
        type: Schema.Types.ObjectId,
        ref: 'dispositivo'
    }
});

const Leitura = mongoose.model('leitura', leituraSchema);
module.exports = Leitura;
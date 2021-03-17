const Disp = require('../models/dispositivo');
const Leitura = require('../models/leitura');

module.exports = {
    index: async (req, res, next) => {
        const newDisp = new Disp(req.body);
        const disp = await newDisp.save();
        res.status(201).json(disp);
    },

    postDados: async (req, res, next) => {
        const { id } = req.params;
        const leit = new Leitura(req.body);
        const disp = await Disp.findById(id);

        if(!disp){
            res.status(400).json({message: 'Dispositivo não encontrado'});
            return;
        }
        
        leit.dispositivo = disp;
        const newLeitura = await leit.save();
        
        disp.leitura.push(newLeitura);
        await disp.save();

        res.status(201).json({ message: 'Tudo certo' });
    },

    getDados: async (req, res, next) => {
        const { id } = req.params;
        const disp = await Disp.findById(id);

        if(!disp){
            res.status(400).json({message: 'Dispositivo não encontrado'});
            return;
        }

        const leituras = await disp.leitura;
        const array = await Leitura.find({_id: {$in: leituras}});

        let data = [];

        array.forEach((element) => {
            let obj = {pulsos: element['pulsos'], data: element['data'], k: disp.fatorK};
            data.push(obj);
        })
        
        res.status(200).json(data);
    },
};
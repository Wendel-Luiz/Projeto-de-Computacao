const Dispositivo = require('../models/dispositivo');
const Leitura = require('../models/leitura');
const jwt = require('jsonwebtoken');

module.exports = {
    setCookie: async (req, res, next) => {
        const codigo = req.body.codigo;
        const disp = await Dispositivo.findOne({nome:codigo});
        if(!disp){
            res.redirect('/user/login')
            //ToDo: Dizer no front que o código é inválido
        }
        const dispID = JSON.stringify(disp.get('_id'))
        console.log(dispID)
        const accessToken = jwt.sign(dispID, process.env.ACCESS_TOKEN_SECRET)
        res.cookie('session_id', accessToken);
        res.redirect('/user/home')
    },

    validAuth: async (req, res, next) => {
        const { session_id } = req.cookies
        const token = session_id && session_id.split('')[1]

        if (token == null) return res.redirect('/user/login')

        jwt.verify(session_id, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.redirect('/user/login')
            next();
        })
    },

    userGetDados: async (req, res, next) => {
        const { session_id } = req.cookies
        const token = session_id && session_id.split('')[1]
        if (token == null) return res.redirect('/user/home')
        
        jwt.verify(session_id, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.redirect('/user/home')
            let url = String('/disp/' + user)
            url = url.replace('"','')
            url = url.replace('"','')
            console.log(url)
            res.redirect(url)
        })
    }
};
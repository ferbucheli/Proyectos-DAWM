var express = require('express');
var router = express.Router();
const axios = require('axios');
const User = require('../config/config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secret12345';

let url = `https://proyectotienda-b3360-default-rtdb.firebaseio.com/usuarios.json`
/* GET home page. */
router.get('/', async function(req, res, next) {  
    await User.get()
    .then(query=>{
        let data = query.docs.map(doc=>{
            let x = doc.data()
                x['_id']=doc.id;
                return x;
        })
        res.status(200).json(data);
    }).catch(error => res.status(400).send(error));
});

router.post('/register', async function(req, res, next) {
    let newUser = {
        id: 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: { pais: 'Ecuador', calle: 'Pto. Azul', ciudad: "Guayaquil"},
        correo: req.body.correo,
        clave: bcrypt.hashSync(req.body.clave),
        usuario: req.body.usuario,
        img_url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
    }
    await User.where('correo', '==', newUser.correo)
    .get()
    .then(async querySnapshot => {
        if(querySnapshot.empty) {
            await User.add(newUser)
            const expiresIn = 60 * 60 * 60
            const accessToken = jwt.sign({ correo: newUser.correo },
                SECRET_KEY, {
                    expiresIn: expiresIn
                });
            const usuario = {
                nombre: newUser.nombre,
                correo: newUser.correo,
                apellido: newUser.apellido,
                direccion: newUser.direccion,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            res.send(usuario);
        } else {
            res.status(409).send('User already exists')
        }
    }).catch(error => res.status(400).send(error));
    //axios.post(url, req.body)
    //wt.sign({id: requestAnimationFrame.body.id}, 'secretKey')

});

router.post('/login', async function(req, res, next) {
    let userData = {
        correo: req.body.correo,
        clave: req.body.clave
    }
    console.log(typeof userData.correo)
    await User.where('correo', '==', userData.correo)
    .get()
    .then(querySnapshot => {
        if(!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data()
            const resultPassword = userData.clave
            if(resultPassword === user.clave){
                const expiresIn = 60 * 60 * 60
                const accessToken = jwt.sign({ correo: user.correo },
                    SECRET_KEY, {
                        expiresIn: expiresIn
                    });
                const usuario = {
                    nombre: user.nombre,
                    correo: user.correo,
                    apellido: user.apellido,
                    direccion: user.direccion,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.status(200).send(usuario);
            } else {
                res.status(400).send('Algo ha salido mal')
            }
        }
      }).catch(error => res.status(400).send(error));
    //axios.post(url, req.body)
    //wt.sign({id: requestAnimationFrame.body.id}, 'secretKey')

});



module.exports = router;
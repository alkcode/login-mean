const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req,res= response)=>{
   
    const { email, name, password } = req.body;
    // console.log(email, name, password);

    try {
        
        //Verificar correo
        const usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe'
            });
        }

        //Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        //Hash contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt );

        //Generar JWT

        const token = await generarJWT(dbUser.id, name);



        //Crear usuario DB

        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            msg: 'Usuario creado',
            uid: dbUser.id,
            name,
            email,
            password,
            token
        });

        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor comuniquese con el admin'
        });
        
    }

}

const loginUsuario = async(req, res = response) =>{
 
    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({email});
        if(!dbUser){
            return res.status(400).json({
                ok:false,
                msg:'El correo no existe'
            });
        }

        //Confrmar si paswwrod hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'La contraseña no existe'
            });
        }

        //Generar JWT 
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del servicio
        return res.json({
            ok:true,
            uid:dbUser.id,
            name:dbUser.name,
            email:dbUser.email,
            token
        })


        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor comuniquese con el admin'
        });
        
    }

}

const revalidarToken = async(req,res) =>{

    const { uid } = req;

    //Leer DB para obtener email

    const dbUser = await Usuario.findById(uid);

    //Generar JWT 
    const token = await generarJWT(uid, dbUser.name);



    return res.json({
        ok:true,
        uid,
        name:dbUser.name,
        email:dbUser.email,
        token
    });
}







module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
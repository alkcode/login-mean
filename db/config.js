const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        
        // await mongoose.connect( process.env.BD_CNN, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        // mongoose.set('useFindAndModify',false);
        // mongoose.Promise=global.Promise;
        await mongoose.connect(process.env.BD_CNN, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log('La conexion es exitosa!');

        //Crear servidor y escuchar peticiones HTTP
            app.listen(process.env.PORT,()=>{
            console.log('Servidor corriendo');
        });

    });


        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializad DB');
    }



}


module.exports = {
    dbConnection
}
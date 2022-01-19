const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        
        // await mongoose.connect( process.env.BD_CNN, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        await connectionMongo().then( ()=> {
            // Para estar escuchando cualquier información que venga del puerto 4000
            app.listen( process.env.PORT, () => {
                console.log(`Servidor run en el puerto ${ process.env.PORT }`);
            });
        }).catch((e) => {
            console.log(e);
        })

        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializad DB');
    }



}


module.exports = {
    dbConnection
}
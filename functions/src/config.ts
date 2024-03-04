import mongoose from 'mongoose';

// Define una función para conectar y desconectar con la base de datos
const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://Rf9suobng6:Rf9suobng6@cluster0.knj1mbl.mongodb.net/iqjobs", {
          //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexión exitosa a la base de datos");
    } catch (error:any) {
        console.error('Error al conectar con la base de datos:', error.message);
    }
};

const closeDatabaseConnection = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log("Conexión a la base de datos cerrada");
};

// Exporta los modelos y las funciones de conexión
export { connectToDatabase, closeDatabaseConnection };
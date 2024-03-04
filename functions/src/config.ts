export const dbConfig = {
  uri: 'mongodb://localhost:27017',
  serverApi: {
    strict: true,
    deprecationErrors: true,
  }
};

import mongoose from 'mongoose';

// URL de conexión a tu base de datos MongoDB
const mongoURI = 'mongodb://localhost:27017';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a MongoDB');
    } catch (err) {
        console.error('Error al conectar a MongoDB:', err);
    }
};

export default connectDB;

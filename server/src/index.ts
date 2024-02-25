import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { dbConfig } from './config';
import { User } from './models/User';
import { Profile } from './models/Profile';
const app: Express = express();
const port = process.env.PORT || 3000;
console.log(dbConfig)
// Configura la conexión a MongoDB Atlas utilizando la configuración de dbConfig
mongoose.connect(dbConfig.uri)
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB Atlas:', err);
  });
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  const newUser = new User.UserClass();
  const newProfile =  new Profile.ProfileClass();
 // newUser.profile = 'asd';
  console.log(newUser.profile);

});

app.delete('/asdadsa', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  const newUser = new User.UserClass();
  const newProfile =  new Profile.ProfileClass();
  // newUser.profile = 'asd';
  console.log(newUser.profile);

});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

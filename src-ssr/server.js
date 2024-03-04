const express = require('express');
const app = express();
const path = require('path');

// Servir los archivos estáticos generados por Quasar
app.use(express.static(path.join(__dirname, 'nombre-de-tu-proyecto/dist/spa')));

// Ruta para enviar todas las solicitudes a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'nombre-de-tu-proyecto/dist/spa/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

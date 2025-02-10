// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes');
require('dotenv').config();


const app = express();
const PORT = 4000;

// Разрешаем CORS для всех источников
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

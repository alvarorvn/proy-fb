const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');

const user_routes = require('../routes/users.js');
const page_routes = require('../routes/page.js');

app.set('port', 3000 || process.env.PORT);

// Middlewares

//comunicar con otro servidor
app.use(cors());
// servidor capaz de entender datos en formato JSON
app.use(express.json()); 
// servidor capaz de entender datos enviados desde un formulario, true para indicar que permite todo tipo de datos
app.use(express.urlencoded({ extended: true })); 
// para subir archivos
app.use(fileUpload());

// Routes
app.use('/',user_routes);
app.use('/page',page_routes);

// Start server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})
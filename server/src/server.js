const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");

const user_routes = require("../routes/users");
const posts_routes = require("../routes/posts");
const biografia_routes = require("../routes/biografia");
const markeplace_routes = require("../routes/marketplace");
const eventos_routes = require('../routes/eventos');

app.set("port", 3000 || process.env.PORT);

// Middlewares
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "../faces"));
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  }
});

app.use(multer({ storage: storage, dest: path.join(__dirname, '../faces') }).array('file'));

//comunicar con otro servidor
app.use(cors());
// servidor capaz de entender datos en formato JSON
app.use(express.json());
// servidor capaz de entender datos enviados desde un formulario, true para indicar que permite todo tipo de datos
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", user_routes);
app.use("/", posts_routes);
app.use("/:iduser/biografia", biografia_routes);
app.use("/marketplace", markeplace_routes);

app.use('/:iduser/eventos', eventos_routes);


// Start server
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});

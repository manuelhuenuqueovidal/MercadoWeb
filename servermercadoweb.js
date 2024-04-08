//Conexión a servidor.
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

//Middleware de error.
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('!Se ha producido un error! 🙀');
});

//Bienvenida.
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

//Método motor Handlebars.
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes/",
  })
);

//Método para seleccionar carpeta pública y módulos.
app.use(express.static(__dirname + "/assets/img"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use('/bootstrap', express.static(__dirname + "/node_modules/bootstrap/dist/css"));


//Objeto, array y ruta para mostrar imágenes.
app.get("/:image", function (req, res) {
  const { image } = req.params;
  const alimentos = {
    "banana.png": "Banana",
    "cebollas.png": "Cebollas",
    "lechuga.png": "Lechuga",
    "papas.png": "Papas",
    "pimenton.png": "Pimiento",
    "tomate.png": "Tomate",
  };
  res.render("Inicio", {
    layout: "Inicio",
    images: [
      "banana.png",
      "cebollas.png",
      "pimenton.png",
      "papas.png",
      "lechuga.png",
      "tomate.png",
    ],
    image: image,
    alimentos: alimentos,
  });
});


app.get("/", function(req, res) {
  const productos = [
    { nombreProducto: "Banana" },
    { nombreProducto: "Cebollas" },
    { nombreProducto: "Pimenton" },
    { nombreProducto: "Papas" },
    { nombreProducto: "Lechuga" },
    { nombreProducto: "Tomate" },
  ];

  res.render("inicio", {
    productos: productos
  });
});


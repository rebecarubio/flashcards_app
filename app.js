const express = require('express'); //traes los paquetes de EXPRESS
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();  //llamas a la función express que te trae la aplicación

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());


//pug
app.set('view engine', 'pug');

//importar rutas de index.js
const Mainroutes= require('./routes');
const cardRoutes= require('./routes/cards');

app.use(Mainroutes);
app.use('/cards', cardRoutes);

//Middleware ej.
app.use((req, res, next)=>{
    console.log("HEllo")
    const err= new Error('Oh, noes!');
    next(err);
});

app.use((req, res, next)=>{
    console.log(req.message);
    next();
});


//middleware for errors:
app.use((req, res, next) => {
    const err= new Error('Not found');
    err.status= 404;
    next(err);

});
app.use((err, req, res, next)=>{
    res.locals.error= err;
    res.render('error');
});

app.listen(3000, ()=>{
    console.log('The application is running on localhost:3000!')
}); //servidor y puerto 3000. También puede tener una función de callback como parametro

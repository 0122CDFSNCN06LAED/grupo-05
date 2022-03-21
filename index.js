const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

/*Middelware*/
app.use(express.static('public'));//sirve para establecer donde estan ubicados los archivos estaticos de nuestra aplicacion

/* ROuting*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
})
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
})
/*SErver */
app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}\n http://localhost:${port}` ));

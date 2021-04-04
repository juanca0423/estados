/**
 * @file index.js es el archivo de arranque
 * @author Juan Carlos Perez
 */
/**                                               * @requires dotenv variables de entorno
 */
require('dotenv').config();
/**
 * @requires module:Servidor
 */
const app = require('./server');
/**
 * @requires module:Base de Datos
 */
require('./config/database');

app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto: ', app.get('port'));
});

require('dotenv').config();
const app = require('./server');
require('./config/database');
//servidor escuch
app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto: ', app.get('port'));
});

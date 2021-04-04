/**
 * Definiendo las bases de datos- Lea mas {@tutorial database-tutorial}
 * @module Base de Datos*/

/**
 *   mongoose
 *   @constant
 *   @name mongoose
 *   @type {object}
 *   @require
 */
const mongoose  = require('mongoose');

const {mongodb} = require('./keys');

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(db => console.log('La base de datos esta conectada'))
.catch(err => console.log(err));

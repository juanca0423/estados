/**
 * Mi servidor - Lea mas {@tutorial servidor-tutorial}
 * @module Servidor
 */

const express        = require('express');
const exphbs         = require('express-handlebars');
const path           = require('path');
const methodOverride = require('method-override');
const session        = require('express-session');
const flash          = require('connect-flash');
const passport       = require('passport');

// Inicialisacion
/**
 * app constante
 * @const {object}
 */
const app = express();
require('./config/passport');

// settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routers/index.router'));
app.use(require('./routers/users.router'));
app.use(require('./routers/notes.router'));
app.use(require('./routers/estados.router'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

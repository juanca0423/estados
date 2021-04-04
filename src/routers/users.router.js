/**
 * Enrutador de Usuarios
 * @module Rutas Usuarios
 */

const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controler/users.controler");

// Routes


/**
 * Get dar de alta usuarios (formulario de Usuarios)
 * @name Agregar Usuarios
 * @path {GET}/users/signup
 */
router.get("/users/signup", renderSignUpForm);


/**
 * Post users/signup (procesar Usuarios)
 * @name Proceso Agregar usuario
 * @path {POST}/users/signup
 */
router.post("/users/signup", singup);


/**
 * Get ingresar usuarios (formulario Logueo Usuarios)
 * @name Logueo Usuarios
 * @path {GET}/users/signin
 */
router.get("/users/signin", renderSigninForm);


/**
 * Post Procesar Logueo Usuarios (Procesar Logueo Usuarios)
 * @name Proceso Logueo Usuarios
 * @path {POST}/users/signin
 */
router.post("/users/signin", signin);


/**
 * Get deslogueo usuarios (desloguear usuario)
 * @name Deslogueo Usuarios
 * @path {GET}/users/logout
 */
router.get("/users/logout", logout);

module.exports = router;

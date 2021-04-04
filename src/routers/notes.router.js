/**
 * Enrutador de Notas
 * @module Rutas Notas
 */

const express = require("express");
const router = express.Router();

// Controller

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controler/notes.controler");

// Helpers

const { isAuthenticated } = require("../helpers/auth");

// New Note

/**
 * Get notes/add (formulario de notas)
 * @name Agregar Nota
 * @path {GET}/notes/add
 */
router.get("/notes/add", isAuthenticated, renderNoteForm);

/**
 * POST Crear Notas (prosesar los datos del formulario)
 * @name inicio
 * @path {POST}/notes/new-note
 */
router.post("/notes/new-note", isAuthenticated, createNewNote);

// Get All Notes

/**
 * Get Notas (Todas las Notas)
 * @name Lista de Notas
 * @path {GET}/notes/
 */
router.get("/notes", isAuthenticated, renderNotes);

// Edit Notes

/**
 * Get editar notas (formulario de editar notas)
 * @name Editar Nota
 * @path {GET}/notes/edit:id
 */
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

/**
 * Put notes editar notas (Procesar Formulario)
 * @name Editar Nota por Id
 * @path {PUT}/note/edit-nite=:id
 */
router.put("/note/edit-note/:id", isAuthenticated, updateNote);

// Delete Notes

/**
 * Delete Eliminar Nota  (eliminar nota)
 * @name Eliminar Nota
 * @path {DELETE}/note/delete/:id
 */
router.delete("/note/delete/:id", isAuthenticated, deleteNote);

module.exports = router;

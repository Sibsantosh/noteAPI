const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const noteRouter = express.Router();
const auth = require("../middleware/auth");

noteRouter.post("/getNotes",auth,getNotes);
noteRouter.post("/addNote",auth,createNote);
noteRouter.delete("/:id",auth,deleteNote);
noteRouter.put("/:id",auth,updateNote);


module.exports = noteRouter;
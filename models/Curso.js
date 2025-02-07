const mongoose = require("mongoose");

const CursoSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    endereco: String,
    lat: Number,
    lon: Number
});

module.exports = mongoose.model("Curso", CursoSchema);

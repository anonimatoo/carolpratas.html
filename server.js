const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Curso = require("./models/Curso");

app.post("/cursos", async (req, res) => {
    const { nome, descricao, endereco, lat, lon } = req.body;
    const novoCurso = new Curso({ nome, descricao, endereco, lat, lon });
    await novoCurso.save();
    res.send("Curso cadastrado!");
});

app.get("/cursos", async (req, res) => {
    const cursos = await Curso.find();
    res.json(cursos);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

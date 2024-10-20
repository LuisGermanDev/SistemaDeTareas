const router = require("express").Router();
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const Tarea = require("../models/tareas");

const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!password) {
      return res.status(400).send("Password Obligatorio");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
    });
    await nuevoUsuario.save();
    res.status(201).send("Usuario registrado");
  } catch (error) {
    res.status(400).send("Error en el registro:" + error.message);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(400).send("Usuario no encontrado");
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) return res.status(400).send("Contraseña incorrecta");

    const token = jwt.sign({ id: usuario._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Error al inicio de sesion" + error.message);
  }
});
router.get("/Tarea", authMiddleware, async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.status(200).send(tareas);
  } catch (error) {
    res.status(500).send("Error al obtener usuarios" + error.message);
  }
});
router.post("/Tarea", authMiddleware, async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    const tareaguardado = await nuevaTarea.save();
    res.status(200).send(tareaguardado);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/Tarea", authMiddleware, async (req, res) => {
  try {
    const tareasActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!tareasActualizada) return res.status(404).send("tarea no encontrada");
    res.status(200).send(tareasActualizada);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/Tarea", authMiddleware, async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!tareaEliminada)
      return res.status(400).send("la tarea no se encuentra");
    res.status(200).send(tareaEliminada);
  } catch (error) {
    res.status(500).send(error);
  }                                                         
});
module.exports = router;

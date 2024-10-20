const mongoose = require("mongoose");
const usuario = require('./Usuario');

const tareaSchema = new mongoose.Schema(
  {
    usuario:{type:mongoose.Schema.Types.ObjectId,ref:"usuario",require:true},
    titulo:{type:String, required:true},
    descripcion:{type:String},
    fechaVencimiento:{type:Date},
    estado:{type:Boolean,default:false}
  }
);
const Tarea = mongoose.model("Tarea", tareaSchema);
module.exports = Tarea;

const mongoose = require('mongoose')
const { model , Schema } = require('mongoose')

const publicacion = new Schema({ 
    ID: String,
    usuario: String,
    usuario_image: String,
    comentario: String,
    comentarios: Array,
    like: {type: Number, default:0},
    fecha: {type: Date, default: Date.now()},
    image: {type: String, required:true},

})
module.exports = model('Publicacion',publicacion)
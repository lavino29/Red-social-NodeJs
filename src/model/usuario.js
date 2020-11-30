const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
const bcrypt = require('bcrypt')
const usuarioSchema = new Schema({
  email: { type: String, required: true , unique:true },
  password: { type: String, required: true },
  nombre: { type: String},
  amigos: { type: Array },
  solicitud: { type: Array },
  image: { type:String }
});

usuarioSchema.pre("save", function (next) {
    let usuario = this;
    if (!usuario.isModified("password")) {
      return next();
    }
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return err;
      bcrypt.hash(usuario.password, salt, (err, hash) => {
        usuario.password = hash;
        next();
      });
    });
  });
 usuarioSchema.methods.comparaPass = function(password,cb){
      bcrypt.compare(password, this.password, (err, iguales)=>{
          if(err){
            return cb(err)}
         return cb(null, iguales)
      })
  }    

module.exports = model("Usuario", usuarioSchema);

const Publicacion = require("../model/publicaciones");
const Usuario = require("../model/usuario");
const mongoose = require("mongoose");
const express = require("express");
const { format } = require("timeago.js");

exports.addNotas = async (req, res, next) => {
  
  const publicacion = new Publicacion({
    comentario: req.body.comentario,
    image: "/upload/" + req.file.filename,
    ID: req.user._id,
    usuario: req.user.nombre,
    usuario_image: req.user.image,
  });
  await publicacion.save();
  next();
};

exports.buscar = async (req, res, next) => {
  const usuario = await Usuario.findById({ _id: req.user._id });
  let result = [];
  await Publicacion.find({ ID: req.user._id }, (err, ress) => {
    ress.forEach((info) => {
      result.push(info);
    });
  });
  if (usuario.amigos.length > 0) {
    for (let i = 0; i < usuario.amigos.length; i++) {
      const publicacion = await Publicacion.find(
        { ID: usuario.amigos[i].id },
        (err, ress1) => {
          let bandera = 0;
          ress1.forEach((info) => {
            result.push(info);
          });
        }
      );
    }

    await res.render("home", { resultado: result ,amigos: usuario.amigos});
  } else {
    await res.render("home", { resultado: result,amigos: usuario.amigos});
  }
};

exports.addLike = async(req,res,next)=>{
  let contador = 0
  console.log(req.body)
 const result =  await Publicacion.findById({_id: req.body.id})
  console.log(req.body.id)
contador = result.like || 0
contador++
result.like = contador;
await result.save()
}
const Usuario = require("../model/usuario");
const express = require("express");
const passport = require("passport");
//---------------------------------------------------------------
/* ------------- LOGICA DE AGREGAR Y LOGUEAR USUARIOS ----------*/
//---------------------------------------------------------------
exports.newUsuario = async (req, res, next) => {
 
  const usuario = new Usuario({
    image: req.body.image,
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
  });
  const result = await Usuario.findOne({ email: req.body.email });
  if (result) {
    return res.status(400).send(result);
  } else {
    await usuario.save();
    req.logIn(usuario, (err) => {
      if (err) return err;

      res.redirect("/");
    });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, usuario, info) => {
    if (err) {
      next(err);
    }
    if (!usuario) {
      return res.render("entrar", { err: "usuario no existe" });
    }
    req.logIn(usuario, (err) => {
      if (err) {
        next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};
//-----------------------------------------------------
/* ------------- LOGICA DE AGREGAR AMIGOS ----------*/
//-----------------------------------------------------

exports.amigos = async (req, res, next) => {
  const result2 = await Usuario.findById({ _id: req.user._id });
  const result = await Usuario.find({ nombre: req.body.buscar });

  if (result2 || result) {
    res.render("buscador", { result, result_amigos: result2.solicitud });
  }
};
exports.addAmigos = async (req, res, next) => {
  const result = await Usuario.findById({ _id: req.params.id });
  if (result) {
    await Usuario.updateOne(
      { email: result.email },
      {
        $push: {
          solicitud: [
            {
              id: req.user._id,
              nombre: req.user.nombre,
              image: req.user.image,
            },
          ],
        },
      }
    );

    res.redirect("/");
  }
};

exports.aceptarAmigos = async (req, res, next) => {
  const result = await Usuario.findById({ _id: req.user._id });
  let amigo;

  result.solicitud.forEach((element) => {
    if (element.id == req.params.id_solicitud) {
      Usuario.updateOne(
        { email: req.user.email },
        {
          $pull: { solicitud: { id: element.id } },
          $push: { amigos: [element] },
        },
        { multi: true }
      ).then((result) => {
        Usuario.updateOne(
          { _id: req.params.id_solicitud },
          {
            $pull: { solicitud: { id: req.user._id } },
            $push: {
              amigos: [
                {
                  id: req.user._id,
                  nombre: req.user.nombre,
                  image: req.user.image,
                },
              ],
            },
          }
        ).then((i) => res.redirect("/"));
      });
    }
  });
};

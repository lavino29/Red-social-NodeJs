const express = require("express");
const { Router } = require("express");
const path = require("path");
const router = Router();
const img = require("../config/multer");
const confiPublicacion = require("../controladores/publicacion");
const configUsuario = require("../controladores/usuarios");
router.get("/login", (req, res) => {
    res.render("entrar");
});
router.get('/registrar',(req, res) => {
    res.render("registrar");
});
router.get('/logout',configUsuario.logout)
router.get("/", confiPublicacion.buscar, (req,res)=>{
    res.render('home')
});
router.post("/registrar", configUsuario.newUsuario);
router.post("/login", configUsuario.login);
router.post("/upload", img, confiPublicacion.addNotas, (req, res) => {
  
  res.redirect("/");
});

/* AGREGAR USUARIOS */ 

router.post('/buscar',configUsuario.amigos)
router.get('/buscar',configUsuario.amigos,(req,res)=>{
    res.render('buscador')
})
router.get('/add/:id',configUsuario.addAmigos)
router.get('/aceptar/:id_solicitud',configUsuario.aceptarAmigos)
module.exports = router;

/* LIKES DE FOTOS */ 
router.post('/like', confiPublicacion.addLike)
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../model/usuario");


passport.serializeUser((usuario, done) => {
  return done(null, usuario._id);
});
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario);
    });
  });
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      Usuario.findOne({ email }, (err, usuario) => {
      
        if (!usuario) {
          return done(null, false, {
            message: "error usuario no encontrado  ",
          });
        } else {
            usuario.comparaPass(password,(err,iguales)=>{
                if(iguales){ return done(null, usuario);}
                return done(null,false, {message: ' clave erronea'})

            })
     
        }
      });
    }
  )
);
exports.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).render('login')
  };
  
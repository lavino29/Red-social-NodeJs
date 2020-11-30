const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost:27017/red-social',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
    
})
mongoose.connection.once('open',()=>console.log('conectado a la BD'))


mongoose.connection.on('error',e=>console.log(e))
module.exports = db
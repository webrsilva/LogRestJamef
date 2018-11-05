const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.port || 3500

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

app.post('/post', function (req,res){
    
    const dados = req.body
    
    console.log(dados)

    res.send(dados)

})


app.listen(PORT , function (){
    console.log(`Ouvindo a porta : ${PORT}`)    
})
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.port || 3000

const MongoClient = require('mongodb').MongoClient
const urlBd = 'mongodb://localhost:27017'
const dbName = 'banco'

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/api', function (req, res) {

    let dados = req.body

    dados = trataDados(dados)

    enviaDados(dados)

    res.send(dados)

})

app.get('/banco', function (req, res) {

    MongoClient.connect(urlBd, { useNewUrlParser: true }, function (err, client) {

        if (err) {
            console.log('Erro2', err)
        } else {

            const db = client.db(dbName)

            db.collection('logs').find({}).toArray(function (err, registros) {

                //console.log(registros)
                client.close()

                res.render('index', { 'registros': registros })
            })
        }
    })



})


function enviaDados(dados) {

    console.log(dados.url)

    axios.post('http://' + dados.url, dados.body)
        .then(function (response) {

            salvarMongo(dados, response)

            //console.log(response)
        })
        .catch(function (error) {

            console.log(error);

        })
}


function salvarMongo(dados, response) {

    MongoClient.connect(urlBd, { useNewUrlParser: true }, function (err, client) {

        if (err) {

            console.log('Erro1', err)

        } else {

            const db = client.db(dbName)

            insertMongo(db, dados, response, function () {

                client.close()

            })

        }
    })

}

function trataDados(dDados) {

    if (typeof (dDados.body) == 'object') {

        dDados.body = JSON.stringify(dDados.body)
    }


    return (dDados)
}


const insertMongo = function (db, dados, response, callback) {

    db.collection('logs').insertOne({
                                        url: dados.url,
                                        body: dados.body,
                                        resposta: response.status,
                                        datetime: new Date()
                                    }, function (err, result) {
        if (err) {
            console.log(err)
        }

        callback(result)
    });
}


app.listen(PORT, function () {
    console.log(`Ouvindo a porta : ${PORT}`)
})
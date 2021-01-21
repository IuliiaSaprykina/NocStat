const express= require('express')
const config = require("./knexfile")[process.env.NODE_ENV || "development"]
const knex = require('knex')
const bodyParser = require("body-parser");
const database = knex(config)

const app=express()
app.use(bodyParser.json());
module.exports = knex(config)


const getAllPatients = (request, response) => {
    database("patients").select()
    .then(patients => {
        response.json({ patients })
    })
}



app.get('/patients', getAllPatients)


app.listen(3000)
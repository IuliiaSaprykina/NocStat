const express= require('express')
const config = require("./knexfile")[process.env.NODE_ENV || "development"]
const knex = require('knex')
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const database = knex(config)

const app=express()
app.use(bodyParser.json());
module.exports = knex(config)

const createPatient = (request, response) => {
    response.json({patient: 1})
    //this should look somthing similar, try to play with it
//     const { email, password, first_name, last_name, address, phone_number, care_level, patient_type, age, gender } = request.body
    
//     database("patients")
//     .select()
//     .where({ email })
//     .first()
//     .then(patients => {
//         if (!patients) {
//             return bcrypt.hash(password, 12)
//                 .then(hashedPassword => {
//                     return database("patients").insert({
//                         email, password_digest: hashedPassword, first_name, last_name, address, phone_number, care_level, patient_type, age, gender 
//                     }).returning("*")
//                 })
//                 .then(patients => {
//                     const secret = "HERESYOURTOKEN"
//                     jwt.sign(users[0], secret, (error, token) => {
//                     response.json({ token, patient: patients[0] })
//                     })
//                 })
//         }
//             response.send("Please choose another username")
//     })
    
}



const getAllPatients = (request, response) => {
    database("patients").select()
    .then(patients => {
        response.json({ patients })
    })
}

const getAllCareGivers = (request, response) => {
    database("care_givers").select()
    .then(care_givers => {
        response.json({ care_givers })
    })
}

app.get('/care_givers', getAllCareGivers)
app.get('/patients', getAllPatients)
app.post('/patients', createPatient)


app.listen(3000)
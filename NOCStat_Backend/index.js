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
       const { patient } = request.body 
       bcrypt.hash(patient.password, 12)
        .then(hashedPassword => {
            return database("patients")
            .insert({
                id: patient.id,
                email: patient.email, 
                password_hash: hashedPassword, 
                // first_name: patient.first_name, 
                // last_name: patient.last_name, 
                // address: patient.address, 
                // phone_number: patient.phone_number, 
                // care_level: patient.care_level, 
                // patient_type: patient.patient_type, 
                // age: patient.age, 
                // gender: patient.gender,
                // account_img: patient.account_img,
                // patient_img: patient.patient_img         
            }).returning("*")
        }).then(patients => {
            const patient = patients[0]

            response.json({ patient })
            }).catch(error => {
                response.json({ error: error.message })
            })
}


const createPatientAccount = (request, response) => {
    
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

const loginPatient = (request, response) => {
    const { patient } = request.body
    database("patients")
        .select()
        .where({ email: patient.email })
        .first()
        .then(retrievePatient => {
            if (!retrievePatient.id) throw new Error("No user")
            
            return bcrypt.compare(patient.password, retrievePatient.password_hash)
        }).then(arePasswordsSame => {
            if (!arePasswordsSame) throw new Error("Wrong password")

            response.json({ message: "It's a match"})
        }).catch(error => {
            response.json(error.message)
        })

}

app.get('/care_givers', getAllCareGivers)
app.get('/patients', getAllPatients)
app.post('/patients', createPatient)
app.post('/acc_patients', createPatientAccount)
app.post('/patient_login', loginPatient)

app.listen(3000)
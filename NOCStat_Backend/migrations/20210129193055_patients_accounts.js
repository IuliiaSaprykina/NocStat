exports.up = function(knex) {
    return knex.schema.createTable("patients_accounts", table => {
        table.increments()
        table.references('id').inTable('patients');
        table.string("first_name")
        table.string("last_name")
        table.text("account_img")
        table.text("patient_img")
        table.string("address")
        table.string("phone_number")
        table.string("care_level")
        table.string("patient_type")
        table.integer("age")
        table.string("gender")
    })
};

// {
//     "patient": {
//         "id": "1", 
//         "email": "iii.ss@com", 
//         "password": "123", 
//         "first_name": "Iuliia", 
//         "last_name": "Saprykina", 
//         "address": "Bla", 
//         "phone_number": "123435666", 
//         "care_level": "0", 
//         "account_img": "sdlfkld",
//         "patient_img": "dffg",
//         "patient_type": "my_self", 
//         "age": "65", 
//         "gender": "F"
//     }
// }

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("patients_accounts")
};

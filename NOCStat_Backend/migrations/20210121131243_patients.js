
exports.up = function(knex) {
    return knex.schema.createTable("patients", table => {
        table.increments()
        table.string("email")
        table.string("password_digest")
        table.string("first_name")
        table.string("address")
        table.string("phone_number")
        table.string("care_level")
        table.string("patient_type")
        table.integer("age")
        table.string("gender")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("patients")
};

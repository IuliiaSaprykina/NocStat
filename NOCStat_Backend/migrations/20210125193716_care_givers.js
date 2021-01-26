
exports.up = function(knex) {
    return knex.schema.createTable("care_givers", table => {
        table.increments()
        table.string("email")
        table.string("password_digest")
        table.string("first_name")
        table.string("last_name")
        table.string("address")
        table.string("phone_number")
        table.text("bio")
        table.boolean("is_nurse")
        table.string("nurse_level")
        table.boolean("is_doctor")
        table.string("medical_license_type")
        table.integer("rating")
        table.string("resume")
        table.string("license")
        table.boolean("is_bc_checked")
        table.string("care_level")
        table.text("personality_profile")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("care_givers")
};

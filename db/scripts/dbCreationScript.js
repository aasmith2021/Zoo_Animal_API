const fs = require('fs');

const dbCreationScript = async (db, animalData) => {
    try {
        await createAnimalTable(db);
        await populateAnimalTable(db, animalData);
    } catch (e) {
        return `Error: ${e}`;
    }
}

const createAnimalTable = async (db) => {
    try {
        await db.one(
            'DROP TABLE IF EXISTS animals; ' +
            'CREATE TABLE animals (' +
                'id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, ' +
                'name VARCHAR(120), ' +
                'latin_name VARCHAR(360), ' +
                'animal_type VARCHAR(10), ' +
                'active_time VARCHAR(30), ' +
                'length_min DOUBLE PRECISION, ' +
                'length_max DOUBLE PRECISION, ' +
                'weight_min DOUBLE PRECISION, ' +
                'weight_max DOUBLE PRECISION, ' +
                'lifespan INT, ' +
                'habitat VARCHAR(360), ' +
                'diet VARCHAR(120), ' +
                'geo_range VARCHAR(200), ' +
                'image_link VARCHAR(600)' +
            ');'
        );
    } catch (e) {
        return `Error: ${e}`;
    }

}

const populateAnimalTable = async (db, animalData) => {
    try {
        await db.one(
            'INSERT INTO animals (name, latin_name, animal_type, active_time, length_min, length_max, weight_min, weight_max, lifespan, habitat, diet, geo_range, image_link) ' +
            'SELECT name, latin_name, animal_type, active_time, length_min, length_max, weight_min, weight_max, lifespan, habitat, diet, geo_range, image_link ' +
            'FROM json_populate_recordset (NULL:: animals, $1)', JSON.stringify(animalData)
        );
    } catch (e) {
        return `Error: ${e}`;
    }
};

module.exports = {
    dbCreationScript,
}
const pgp = require('pg-promise')();
const { databaseConfig } = require('./databaseConfig.js');
const { getAnimalData } = require('../data/getAnimalData.js');
const { dbCreationScript } = require('./scripts/dbCreationScript.js');

const db = pgp(databaseConfig);
const animalData = getAnimalData();
dbCreationScript(db, animalData);

const getRandomIndex = (upperBound) => {
    return Math.floor(Math.random() * upperBound);
}

const testConnection = async () => {
    const c = await db.connect(); // try to connect
    c.done(); // success, release connection
    console.log(c.client.serverVersion); // return server version
}

const getAllAnimals = async () => {
    try {
        const allAnimals = await db.many('SELECT * FROM animals');
        return allAnimals;
    } catch (e) {
        return `Error: ${e}`;
    }
}

const getNumberOfAnimals = async (numberOfAnimals) => {
    try {
        const animals = await db.any('SELECT * FROM animals LIMIT $1', numberOfAnimals);
        return animals;
    } catch(e){
        return `Error: ${e}`;
    }
}

const getRandomAnimal = async () => {
    try {
        const countOfAnimalsInDatabase = await db.one('SELECT COUNT(*) FROM animals');
        const numberOfAnimalsInDatabase = countOfAnimalsInDatabase.count;
        const randomIndexOfAnimal = getRandomIndex(numberOfAnimalsInDatabase);
        const randomAnimal = await db.one('SELECT * FROM animals LIMIT 1 OFFSET $1', randomIndexOfAnimal);
        return randomAnimal;
    } catch (e) {
        return `Error: ${e}`;
    }
}

const getRandomAnimals = async (numberOfAnimals) => {
    try {
        let randomIndexOfAnimal = -1;
        const indexesOfAnimalsSelected = [];
        const randomAnimals = [];
        const countOfAnimalsInDatabase = await db.one('SELECT COUNT(*) FROM animals');
        const numberOfAnimalsInDatabase = countOfAnimalsInDatabase.count;
        let tempAnimal = {};
        
        while (randomAnimals.length < numberOfAnimals) {
            randomIndexOfAnimal = getRandomIndex(numberOfAnimalsInDatabase);
            while (indexesOfAnimalsSelected.includes(randomIndexOfAnimal)) {
                randomIndexOfAnimal = getRandomIndex(numberOfAnimalsInDatabase);
            }

            tempAnimal = await db.one('SELECT * FROM animals LIMIT 1 OFFSET $1', randomIndexOfAnimal);
            randomAnimals.push(tempAnimal);
            indexesOfAnimalsSelected.push(randomIndexOfAnimal);
        }
        
        return randomAnimals;
    } catch (e) {
        return `Error: ${e}`;
    }
}

const getAnimalCountFromDatabase = async () => {
    try {
        const countOfAnimalsInDatabase = await db.one('SELECT COUNT(*) FROM animals');
        const numberOfAnimalsInDatabase = countOfAnimalsInDatabase.count;
        return numberOfAnimalsInDatabase;
    } catch (e) {
        return `Error: ${e}`;
    }
}

module.exports = {
    db,
    testConnection,
    getAllAnimals,
    getNumberOfAnimals,
    getRandomAnimal,
    getRandomAnimals,
    getAnimalCountFromDatabase,
};
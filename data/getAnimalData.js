const fs = require('fs');
const path = require('path');

const getAnimalData = () => {
    const rawData = fs.readFileSync(path.resolve(__dirname, './animalData.json'));
    const animalData = JSON.parse(rawData);

    return animalData;
};

module.exports = {
    getAnimalData,
};
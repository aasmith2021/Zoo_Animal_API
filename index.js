const express = require('express');
const cors = require('cors');
const dbService = require('./db/dbService.js');
const { checkNumberParameter } = require('./db/numberParameterVerification.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/animals', async (req, res) => {
    const allAnimals = await dbService.getAllAnimals();
    res.send(allAnimals);
});

app.get('/animals/num/:number', async (req, res) => {
    const userParameter = req.params.number;

    try {
        const userParameterNumber = await checkNumberParameter(userParameter);
        const numberOfAnimals = [userParameterNumber];
        const animals = await dbService.getNumberOfAnimals(numberOfAnimals);
        res.send(animals);
    }
    catch (e) {
        res.status(400).send(e);
    }   
});

app.get('/animals/random', async (req, res) => {
    const randomAnimal = await dbService.getRandomAnimal();
    res.send(randomAnimal);
});

app.get('/animals/random/:number', async (req, res) => {
    const userParameter = req.params.number;

    try {
        const userParameterNumber = await checkNumberParameter(userParameter);
        const numberOfAnimals = [userParameterNumber];
        const randomAnimals = await dbService.getRandomAnimals(numberOfAnimals);
        res.send(randomAnimals);
    }
    catch (e) {
        res.status(400).send(e);
    }   

});

app.listen(port, () => {
    console.log(`The Zoo Animal API is listening on port ${port}!`);
});

// Handle requests for a route that does not exist
app.use(function (req, res, next) {
    res.status(404).send("Error: We're unable to find the information you are looking for. Please try again.");
  });
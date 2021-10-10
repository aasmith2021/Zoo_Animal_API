const dbService = require('./dbService.js');

const checkNumberParameter = async (userParameter) => {
    const userParameterNumber = Number(userParameter);
    
    if (!userParameterNumber || userParameterNumber < 1) {
        throw 'Error: Query parameter must be a non-zero positive integer';
    }
    
    const numberOfAnimalsInDatabase = await dbService.getAnimalCountFromDatabase();
    
    if (userParameterNumber > numberOfAnimalsInDatabase || userParameterNumber > 50) {
        throw 'Error: Unable to fulfill request';
    }

    return userParameterNumber;
}


module.exports = {
    checkNumberParameter,
}
# transaction fee calculator

Basic node.js app to calculate fee for cash in and cash out operations

The application accepts a path to the input file, maps through the data and calculates fees for operation and logs them into console

Command to install dependencies:
    npm install

Command to run the project: 
    node app.js input.json

You can change the content of input.json file or add other .json file with the same structure as in input.json and run the project with this command
    node app.js [inputFileName].json

There are basic unit tests inside __tests__ folder
Command to run unit tests:
    npm run test


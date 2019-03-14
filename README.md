Completion: 
Node.js server is configured along with restAPI routes 
Tests are written, using Mocha testing framework 
Both versions (0.4 and ^0.5) of smart contracts were written 

Guide: 

Use YOUR OWN wallet mnemonic, creating a .env file in project root, and write in: 
WALLET = "YOUR OWN MNEMONIC FROM METAMASK";
The contract compiles and deploys, using: 
node bin/dev or node deploy.js
By looking in the terminal, a message about deployment along with ABI and interface data will appear.
Server is ran, using command: 
node index.js
To test different routes, you can use Postman, while server is running
Tests are ran using command mocha or npm run tests

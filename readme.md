Completion: <br>
Node.js server is configured along with restAPI routes <br>
Tests are written, using Mocha testing framework <br>
Both versions (0.4 and ^0.5) of smart contracts were written <br>

Guide: <br>
- First things first: run **npm install**
- Use YOUR OWN wallet mnemonic, creating a .env file in project root, and write in: <br> 
WALLET = "YOUR OWN MNEMONIC FROM METAMASK"
- In the same .env file, on a new line add YOUR OWN rpcURL Infura API KEY, writing: <br>
API_KEY = "YOUR API KEY"
- The contract compiles and deploys, using: <br>
**node bin/dev** or **node deploy.js**<br> 
By looking in the terminal, a message about deployment along with ABI and interface data will appear.
- Server is ran, using command: <br>
**node index.js**
- To test different routes, you can use Postman, while server is running
- Tests are ran using command **mocha** or **npm run tests**
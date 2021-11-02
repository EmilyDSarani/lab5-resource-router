const http = require('http');
const app = require('./lib/app');

const PORT = process.env.PORT || 7890; //this is basically saying "if there is a env.PORT use that or use the 7890 if you cant find it"

const server = http.createServer(app); //this is creating the server
 
server.listen(PORT, () => {  //the server is listening for which port to launch on
  console.log(`Server running on port http://localhost:${PORT}`); //this is just a console log to tell us which port the server is running on
});

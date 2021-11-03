//we will have to get the const for the singersRouter
//then we need to call the singersRouter
//we will have to set the app to a async function that will take in req and res
//then with the a split, we will split the url at the /
// the try catch will essentially read "try doing this code if the user puts in the correct pathing. if they do not, then bring up an error" 

//we will create this in singers.js
const singersRouter = require('./singers');

//we want to connect routes to singers and the singersRouter
const routes = {
  singers: singersRouter,
};

// here we making it so the split will...split at the / and deliberatly putting that to the empty and the resource. If there is something we don't care about, we can put it to an empty , and name what we do care about. then we are calling the routes adn the resource to that specific route.
const app = async (req, res) => {
  const [, resource] = req.url.split('/');
  const route = routes[resource];

  // using the specific route, we are saying "if this route is used then await it. If it is not, use error message 500. Else, use status 400."
  if(route){
    try{
      const routeHandler = route[req.method.toLowerCase()];
      await routeHandler(req, res);
    } catch(err){
      console.error(err);
      res.statusCode = 500;
      res.end(err.message);
    }
  } else {
    res.statusCode = 400;
    res.end('Not Found');
  }
    
};

module.exports = app;

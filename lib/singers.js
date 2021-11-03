// call the parseBody from the parse body js and the SimpleDB from the simple db js
// set the simple db to a new simpledb and link it to the store folder
//create a singersRouter that will take in the POST, GETID, GETALL, DElETE, and PUT
const parseBody = require('./parse-body');
const SimpleDb = require('./simple-db');

const db = new SimpleDb(`${__dirname}/store`);

//Post
const singersRouter = {
  async post(req, res){
    const singer = await parseBody(req);
    await db.save(singer);
    // const saveSinger = await db.get(singer.id);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(singer));
  },
  
  async get(req, res){
    const[, , id] = req.url.split('/');
    //Get Id
    if(id){
      const singer = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(singer));
      //Get All
    } else {
      const singers = await db.getAll();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(singers));
    }
  }
};

module.exports = singersRouter;



//Delete

//Put 


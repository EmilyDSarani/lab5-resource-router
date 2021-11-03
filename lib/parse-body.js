//We will need to call in a VALID here and set it to Post, Put, and Patch 
//The Valid will essentially say "if this is not a valid method being used for ParsedBody, then return null"
//When we return the new Promise, we can use the resolve and reject thing here (the new thing we learned)
//then we can have an if statement here. Which will say "If the conent is not JSON, reject it..if it is, then return the data chunks and resolve the parse. We can use a try catch that can reject the bad JSON on the catch"
//'end' and 'data' are important key words that will be used here. 


const VALID = ['POST', 'PUT', 'PATCH']; //here we are setting VALID to these 3 things so that we can easily grab them in Valid and use it

const parseBody = async (req) => {
  if (!VALID.includes(req.method)) return null;  //if Valid does not include one the methods we want, then return null
 
  return new Promise((resolve, reject) => {   
    if(req.headers['content-type'] !== 'application.json'){   //if application is not json, reject it. 
      reject('Content-Type must be application/json');
      return;
    }
    let data = '';          //if application is json, return the chunk of data and then end it by resolving the parse. catch errors and reject with Bad JSON

    req.on('data', (chunk) => {
      data += chunk;
    }
    );
    req.on('end', async () => {
      try {
        resolve(JSON.parse(data));
      } catch (err){
        reject('Bad JSON');
      }
    });
  });
};

module.exports = parseBody; 

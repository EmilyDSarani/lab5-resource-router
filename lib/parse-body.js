//We will need to call in a VALID here and set it to Post, Put, and Patch 
//The Valid will essentially say "if this is not a valid method being used for ParsedBody, then return null"
//When we return the new Promise, we can use the resolve and reject thing here (the new thing we learned)
//then we can have an if statement here. Which will say "If the conent is not JSON, reject it..if it is, then return the data chunks and resolve the parse. We can use a try catch that can reject the bad JSON on the catch"
//'end' and 'data' are important key words that will be used here. 


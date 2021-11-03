const EventEmitter = require('events');
//An event emitter is a pattern that listens to a named event, fires a callback, then emits that event with a value. Sometimes this is referred to as a “pub/sub” model, or listener. It's referring to the same thing.

const parseBody = require('../lib/parse-body.js');

it('returns null if method is not POST, PUT, or PATCH', async () => {
  expect(await parseBody({ method: 'GET' })).toBe(null);
  expect(await parseBody({ method: 'DELETE' })).toBe(null);
});
it('throws if content-type is not application/json', async () => {
  const req = {
    method: 'POST',
    headers:{
      'content-type' : 'text/plain',
    },
  };
  expect.assertions(1);
  try{
    await parseBody(req);
  } catch(e) {
    expect(e).toEqual('Content-Type must be application/json');
  }
    
});

//This is where the EventEmitter is being used

it('throws if failure happens in deserialization', async () => {
  const req = new EventEmitter();
  req.headers = { 'content-type': 'application/json' };
  req.method = 'POST';
  const promise = parseBody(req);
  req.emit('data', '{"bad json"}');
  req.emit('end');
  
  expect.assertions(1);
  try {
    await promise;
  } catch (e) {
    expect(e).toEqual('Bad JSON');
  }
});

//should probably write each of these tests first

//beforeEach, and afterAll- deletes and creates fresh store folders. This is so when we do our getAll, we are getting the EXACT number of items we expect instead of a ton of different things that were created. 

//this is like the setup crew
const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
const SimpleDb = require('../lib/simple-db');
// const SimpleDb = require('../lib/simple-db');


const rootDir = `${__dirname}/store`;
//${__dirname}/../__tests__/store


describe('singer CRUD API', () => {
  beforeEach(() => { //this is like the setup crew
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  afterAll(() => { //this is like the cleanup crew
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  it('POST creating the new singer and returning it', async () => {

    const singer = { name: 'Brandon Urie', age: 34, genre: 'pop punk' };
    const res = await request(app).post('/singers').send(singer);
   
    expect(res.body).toEqual({ ...singer, id: expect.any(String) });
  });

  it('GET ID by getting one singer by its id', async () => {
    const singer = { name: 'Brandon Urie', age: 34, genre: 'pop punk' };
    const db = new SimpleDb(rootDir);
    await db.save(singer);
    
    const res = await request(app).get(`/singers/${singer.id}`);
    
    expect(res.body).toEqual(singer);

  });
//   it('GET ALL getting all the singers', async () => {
//     const urie = { name: 'Brandon Urie', age: 34, genre: 'pop punk' };
//     const atkins = { name: 'Rodney Atkins', age: 52, genre: 'country' };
//     const sheeran = { name: 'Ed Sheeran', age: 30, genre: 'pop folk' };
    
//     const db = new SimpleDb(rootDir);
//     Promise.all([db.save(urie), db.save(atkins), db.save(sheeran)]);
//     const res = await request(app).get('/singers');

//     expect(res.body).toEqual(expect.arrayContaining([urie,atkins,sheeran]));

//   });
});


